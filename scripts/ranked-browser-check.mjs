import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import { registerMember, dashboardFor } from '../src/lib/school-service.ts';
import { createTeam, deleteTeam, listTeams, updateTeam } from '../src/lib/team-service.ts';
import { rankedPoolSummary } from '../src/lib/ranked-builder.ts';
import * as ranked from '../src/lib/ranked-service.ts';

// Browser-only account mocks over an in-memory database. The real services run unchanged, and no
// live account, school record, or Gemini request is involved.
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3005';
const shots = 'documents/qa/ranked';
await mkdir(shots, { recursive: true });

const raw = new DatabaseSync(':memory:');
raw.exec('PRAGMA foreign_keys=ON');
for (const sql of schema) raw.exec(sql);
for (const seed of eventSeeds) raw.prepare(seed.sql).run(...seed.args);
const db = {
  get: async (sql, ...args) => raw.prepare(sql).get(...args),
  all: async (sql, ...args) => raw.prepare(sql).all(...args),
  async batch(statements) {
    raw.exec('BEGIN IMMEDIATE');
    try {
      const result = statements.map(({ sql, args }) => ({
        rowsAffected: Number(raw.prepare(sql).run(...args).changes),
        rows: [],
      }));
      raw.exec('COMMIT');
      return result;
    } catch (error) {
      raw.exec('ROLLBACK');
      throw error;
    }
  },
};
const identity = (uid) => ({ uid, email: `${uid}@example.test` });
const teacher = await registerMember(
  db,
  identity('teacher'),
  {
    role: 'instructor',
    displayName: 'Coach Rivera',
    instructorInvitePassword: 'qa',
    schoolCommunityId: 'ppchs',
  },
  'qa',
);
const students = {};
for (const name of ['Amy Chen', 'Ben Ortiz', 'Cal Reyes', 'Dee Park', 'Eli Stone'])
  students[name] = (
    await registerMember(
      db,
      identity(name),
      {
        role: 'student',
        displayName: name,
        division: 'C',
        schoolPassword: teacher.credentials.joiningPassword,
      },
      'qa',
    )
  ).profile;

// Gemini stand-in: spread picks over every source test; give written answers full credit.
const reply = (payload) => {
  if (payload.candidates) {
    const bySource = [...new Set(payload.candidates.map((c) => c.source))].map((source) =>
      payload.candidates.filter((c) => c.source === source),
    );
    const ids = [];
    for (let round = 0; ids.length < payload.questionCount && round < 300; round++)
      for (const list of bySource)
        if (list[round] && ids.length < payload.questionCount) ids.push(list[round].id);
    return { questionIds: ids };
  }
  return {
    grades: payload.criteria.map((item) => ({
      questionId: item.questionId,
      criterionId: item.criterionId,
      earned: item.rubric.points,
      feedback: 'Matches the rubric.',
      needsReview: false,
    })),
  };
};
const ai = {
  apiKey: 'qa',
  model: 'gemini-qa',
  fetcher: async (_url, init) =>
    new Response(
      JSON.stringify({
        candidates: [
          {
            finishReason: 'STOP',
            content: {
              parts: [
                {
                  text: JSON.stringify(
                    reply(JSON.parse(JSON.parse(init.body).contents[0].parts[0].text)),
                  ),
                },
              ],
            },
          },
        ],
      }),
    ),
};

async function api(route, profile) {
  const request = route.request();
  const url = new URL(request.url());
  const method = request.method();
  const body = method === 'POST' || method === 'PATCH' ? request.postDataJSON() : {};
  const teacherActions = {
    create: () => ranked.createRankedTest(db, profile, body, ai),
    assign: () => ranked.assignRanked(db, profile, body),
    unassign: () => ranked.unassignRanked(db, profile, body.assignmentId),
    release: () => ranked.releaseRanked(db, profile, body),
    reopen: () => ranked.reopenRanked(db, profile, body.assignmentId),
    collect: () => ranked.collectRanked(db, profile, body.assignmentId, ai),
    regrade: () => ranked.regradeRanked(db, profile, body.assignmentId, ai),
    review: () => ranked.reviewRanked(db, profile, body),
    'remove-question': () => ranked.removeRankedQuestion(db, profile, body),
    delete: () => ranked.deleteRankedTest(db, profile, body.testId),
  };
  const studentActions = {
    start: () => ranked.startRanked(db, profile, body.testId),
    save: () => ranked.saveRankedDraft(db, profile, body),
    submit: () => ranked.submitRanked(db, profile, body, ai),
    grade: () => ranked.gradeRankedForStudent(db, profile, body.testId, ai),
  };
  const handlers = {
    '/api/auth/profile': () => profile,
    '/api/dashboard': () => dashboardFor(db, profile),
    '/api/teams': () =>
      method === 'POST'
        ? createTeam(db, profile, body)
        : method === 'PATCH'
          ? updateTeam(db, profile, body)
          : method === 'DELETE'
            ? deleteTeam(db, profile, url.searchParams.get('id'))
            : listTeams(db, profile),
    '/api/ranked': async () => {
      if (method === 'POST') return (await teacherActions[body.action]()) ?? { ok: true };
      const testId = url.searchParams.get('testId');
      if (url.searchParams.get('pool')) return rankedPoolSummary(url.searchParams.get('pool'));
      if (profile.role === 'instructor')
        return testId
          ? ranked.rankedForInstructor(db, profile, testId)
          : ranked.listRankedForInstructor(db, profile);
      return testId
        ? ranked.rankedForStudent(db, profile, testId)
        : ranked.listRankedForStudent(db, profile);
    },
    '/api/ranked/attempt': () => studentActions[body.action](),
  };
  try {
    return route.fulfill({ json: (await handlers[url.pathname]?.()) ?? [] });
  } catch (error) {
    return route.fulfill({ status: error.status ?? 500, json: { error: error.message } });
  }
}

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
async function account(profile) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (message) => {
    if (message.type() === 'error' && !/Failed to load resource/.test(message.text()))
      errors.push(message.text());
  });
  const part = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
  const token = `${part({ alg: 'none' })}.${part({
    sub: profile.id,
    user_id: profile.id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
    aud: 'qa',
    iss: 'https://securetoken.google.com/qa',
    firebase: { sign_in_provider: 'password' },
  })}.signature`;
  const user = { localId: profile.id, email: 'qa@example.test' };
  await page.route('https://identitytoolkit.googleapis.com/**', (route) =>
    route.fulfill({
      json: route.request().url().includes('signInWithPassword')
        ? {
            ...user,
            idToken: token,
            refreshToken: 'qa-refresh',
            expiresIn: '3600',
            registered: true,
          }
        : {
            users: [
              {
                ...user,
                emailVerified: true,
                providerUserInfo: [
                  { providerId: 'password', email: user.email, federatedId: user.email },
                ],
              },
            ],
          },
    }),
  );
  await page.route('**/api/**', (route) => api(route, profile));
  await page.goto(`${base}/login/${profile.role}`);
  await page.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await page.getByLabel('Password', { exact: true }).fill('qa-browser-only-password');
  await page.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`/dashboard/${profile.role}$`));
  return page;
}
async function fits(page, name) {
  for (const theme of ['dark', 'light']) {
    await page.evaluate((value) => (document.documentElement.dataset.theme = value), theme);
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        `${name} ${theme} ${width}: horizontal overflow`,
      );
      await page.screenshot({ path: `${shots}/${name}-${theme}-${width}.png` });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => (document.documentElement.dataset.theme = 'dark'));
}

try {
  // Instructor: both new tabs sit in the blue sidebar.
  const coach = await account(teacher.profile);
  const sidebar = coach.getByRole('navigation', { name: 'Instructor sections' });
  for (const name of [/Ranked Tests/, /Teams/])
    await expect(sidebar.getByRole('button', { name })).toBeVisible();

  // Teams: a sheet per team, a color-coded row per event, students seated from their cards.
  await sidebar.getByRole('button', { name: /Teams/ }).click();
  await expect(coach.getByText('No teams yet.')).toBeVisible();
  await coach.getByLabel('New team name').fill('Grain of Sand');
  await coach.getByRole('button', { name: 'Add team' }).click();
  await expect(coach.getByLabel('Team name', { exact: true })).toHaveValue('Grain of Sand');
  await expect(coach.locator('.team-events tbody tr')).toHaveCount(23);
  await expect(
    coach.locator('.team-events tbody tr', { hasText: 'Water Quality' }),
  ).toHaveAttribute('data-slot', 'green');
  await expect(coach.locator('.team-events tbody tr', { hasText: 'Forensics' })).toHaveAttribute(
    'data-slot',
    'pink',
  );
  await expect(
    coach.locator('.team-events tbody tr', { hasText: 'Codebusters' }).locator('.team-seat'),
  ).toHaveCount(3);
  const seat = async (event, partner, name) => {
    await coach.getByRole('button', { name: new RegExp(`${event} partner ${partner}`) }).click();
    const picker = coach.getByRole('dialog', { name: `Choose a student for ${event}` });
    await picker.getByRole('button', { name: `Seat ${name} in ${event}` }).click();
    await expect(picker).toBeHidden();
  };
  await seat('Water Quality', 1, 'Amy Chen');
  await seat('Water Quality', 2, 'Ben Ortiz');
  await seat('Forensics', 1, 'Amy Chen');
  const amyRow = coach.locator('.team-roster tbody tr', { hasText: 'Amy Chen' });
  await expect(amyRow.locator('.team-count')).toHaveText('2');
  await expect(coach.getByText('2 / 15 STUDENTS')).toBeVisible();
  // Circuit Lab shares the green timeslot with Water Quality, so the sheet flags the clash.
  await coach.getByRole('button', { name: /Circuit Lab partner 1/ }).click();
  await expect(coach.locator('.student-card', { hasText: 'Amy Chen' })).toContainText(
    'Same timeslot as Water Quality',
  );
  await coach.getByRole('button', { name: 'Seat Amy Chen in Circuit Lab' }).click();
  await expect(amyRow.locator('.team-clash')).toContainText('Green: Water Quality + Circuit Lab');
  await fits(coach, 'teams');
  await coach.getByRole('button', { name: /Circuit Lab partner 1: Amy Chen/ }).click();
  await coach.getByRole('button', { name: 'Clear this seat' }).click();
  await expect(amyRow.locator('.team-clash')).toHaveCount(0);
  await coach.getByLabel('Team name', { exact: true }).fill('Varsity');
  await coach.getByLabel('Team name', { exact: true }).press('Enter');
  await expect(coach.getByRole('tab', { name: 'Varsity' })).toBeVisible();
  await coach.getByLabel('New team name').fill('Junior Varsity');
  await coach.getByRole('button', { name: 'Add team' }).click();
  await expect(coach.getByRole('tab', { name: 'Junior Varsity' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await seat('Water Quality', 1, 'Cal Reyes');

  // Ranked tests: Gemini builds one paper from several tests; one click reaches every team.
  await sidebar.getByRole('button', { name: /Ranked Tests/ }).click();
  await expect(coach.getByText('No ranked tests yet.')).toBeVisible();
  const eventPicker = coach.getByLabel('Event', { exact: true });
  await expect(eventPicker.locator('option', { hasText: 'Water Quality' })).toHaveCount(1);
  await expect(eventPicker.locator('option', { hasText: 'Boomilever' })).toHaveCount(0);
  await eventPicker.selectOption('water-quality');
  await coach.getByLabel('Questions', { exact: true }).fill('9');
  await coach.getByLabel('Minutes', { exact: true }).fill('20');
  await coach.getByRole('button', { name: 'Build ranked test' }).click();
  await expect(coach.getByRole('heading', { name: 'Water Quality Ranked Test 1' })).toBeVisible();
  await expect(coach.locator('.ranked-sources .assign-event-chip')).not.toHaveCount(1);
  await coach.getByText('Preview questions and answer key').click();
  await expect(coach.locator('.ranked-review .practice-question')).toHaveCount(9);
  // A question that does not suit the test can be dropped before anyone starts.
  await coach.getByRole('button', { name: 'Remove Question 9' }).click();
  await expect(coach.locator('.ranked-review .practice-question')).toHaveCount(8);
  await coach.getByRole('button', { name: 'Assign to students' }).click();
  const assign = coach.getByRole('dialog', { name: 'Assign Water Quality Ranked Test 1' });
  await expect(assign.locator('.ranked-everyone li')).toHaveText([
    'Varsity: Amy Chen + Ben Ortiz',
    'Junior Varsity: Cal Reyes',
  ]);
  await coach.screenshot({ path: `${shots}/assign-modal.png` });
  await assign.getByRole('button', { name: 'Assign to all 3 students' }).click();
  await expect(assign.getByText('Assigned to 3 students.')).toBeVisible();
  // A hand-picked student who has a partner in the event brings that partner along.
  await assign.getByLabel('Assign to Dee Park').check();
  await expect(assign.getByText('1 student selected')).toBeVisible();
  await assign.getByRole('button', { name: 'Assign to 1 selected student' }).click();
  await expect(assign.getByText('Assigned to 1 student.')).toBeVisible();
  await assign.getByRole('button', { name: 'Close' }).click();
  await expect(coach.locator('.ranked-results tbody tr')).toHaveCount(4);
  await expect(coach.locator('.ranked-results tbody tr', { hasText: 'Cal Reyes' })).toContainText(
    'Junior Varsity',
  );
  await coach
    .locator('.ranked-results tbody tr', { hasText: 'Dee Park' })
    .getByRole('button', { name: 'Remove' })
    .click();
  await expect(coach.locator('.ranked-results tbody tr')).toHaveCount(3);

  // Student: the placeholder is gone and the assigned test is listed.
  const amy = await account(students['Amy Chen']);
  await amy.goto(`${base}/dashboard/student/events/water-quality/ranked-tests`);
  await expect(amy.getByText('A little room for what’s next.')).toHaveCount(0);
  await expect(amy.locator('.practice-test-list li')).toHaveCount(1);
  await expect(amy.locator('.ranked-status')).toHaveText('NOT STARTED');
  await fits(amy, 'student-list');
  await amy.getByRole('link', { name: /Water Quality Ranked Test 1/ }).click();
  await expect(amy.getByText('This test locks your screen until you submit.')).toBeVisible();
  await expect(amy.locator('.practice-question')).toHaveCount(0);
  await amy.screenshot({ path: `${shots}/student-briefing.png` });

  // Starting enters full screen and covers the whole page, including the site header.
  await amy.getByRole('button', { name: 'Enter full screen and start' }).click();
  const lock = amy.locator('.ranked-lock');
  await expect(lock).toBeVisible();
  assert.equal(await amy.evaluate(() => !!document.fullscreenElement), true, 'full screen');
  await expect(lock.locator('.practice-question')).toHaveCount(8);
  await expect(amy.getByRole('timer', { name: 'Time left' })).toContainText(/(20:00|19:5\d)/);
  assert.equal(
    await amy.evaluate(() => {
      const header = document.querySelector('.site-header').getBoundingClientRect();
      return (
        document.elementFromPoint(header.left + 20, header.top + 10).closest('.ranked-lock') !==
        null
      );
    }),
    true,
    'the locked test covers the site header',
  );
  const detail = await ranked.rankedForInstructor(
    db,
    teacher.profile,
    (await ranked.listRankedForInstructor(db, teacher.profile))[0].id,
  );
  for (const [index, question] of detail.questions.entries()) {
    const key = detail.answerKey.questions.find((q) => q.id === question.id);
    const field = lock.locator('fieldset.practice-question').nth(index);
    if (question.type === 'mcq')
      for (const option of key.correctOptions ?? [key.acceptedOptions?.[0] ?? key.correctOption])
        await field.locator(`input[value="${option}"]`).check();
    else if (question.id !== detail.questions.at(-1).id)
      await field.locator('textarea').fill('A complete written explanation.');
  }
  await amy.screenshot({ path: `${shots}/student-locked.png` });

  // The back button cannot leave the test, and Submit asks before handing in.
  await amy.goBack();
  await expect(lock).toBeVisible();
  await expect(amy).toHaveURL(/\/ranked-tests\/[\da-f-]{36}$/);

  await lock.getByRole('button', { name: 'Submit test' }).first().click();
  const confirm = amy.getByRole('alertdialog', { name: 'Submit your test?' });
  await confirm.getByRole('button', { name: 'Keep working' }).click();
  await expect(confirm).toBeHidden();

  // Leaving full screen closes the test: it is submitted and graded at once, with no way back.
  await amy.evaluate(() => document.exitFullscreen());
  await expect(lock).toBeHidden();
  await expect(amy.getByText('because you left full screen')).toBeVisible();
  await expect(
    amy.getByRole('button', { name: /Return to the test|Enter full screen/ }),
  ).toHaveCount(0);
  assert.equal(await amy.evaluate(() => !!document.fullscreenElement), false);
  const closed = raw
    .prepare('SELECT violations,submitted_at FROM ranked_assignments WHERE started_at IS NOT NULL')
    .get();
  assert.ok(closed.submitted_at, 'leaving full screen submitted the attempt');
  assert.ok(closed.violations >= 1, 'the exit is recorded for the instructor');
  const score = amy.getByRole('region', { name: 'Your score' });
  await expect(score).toBeVisible();
  await expect(score).toContainText('stay locked until your instructor releases results');
  await expect(amy.locator('.practice-question')).toHaveCount(0);
  const last = detail.questions.at(-1);
  const expected = detail.test.maxScore - (last.type === 'frq' ? last.points : 0);
  await expect(score.locator('h2')).toContainText(String(expected));
  await fits(amy, 'student-score');

  // The instructor can reopen a test that closed on leaving full screen; answers and time carry on.
  await coach.getByRole('button', { name: 'Refresh' }).click();
  const amyResult = coach.locator('.ranked-results tbody tr', { hasText: 'Amy Chen' });
  await expect(amyResult).toContainText('Closed: left full screen');
  coach.once('dialog', (dialog) => dialog.accept());
  await amyResult.getByRole('button', { name: 'Reopen test' }).click();
  await expect(amyResult).toContainText('In progress');
  await expect(amyResult.getByRole('button', { name: 'Reopen test' })).toHaveCount(0);
  await amy.reload();
  await expect(amy.getByText('Your test is still running.')).toBeVisible();
  await amy.getByRole('button', { name: 'Return to the test' }).click();
  await expect(lock).toBeVisible();
  await expect(lock.locator('textarea').first()).toHaveValue('A complete written explanation.');
  await lock.getByRole('button', { name: 'Submit test' }).first().click();
  await confirm.getByRole('button', { name: 'Submit for grading' }).click();
  await expect(lock).toBeHidden();
  await expect(score.locator('h2')).toContainText(String(expected));
  await expect(amy.getByText('because you left full screen')).toHaveCount(0);

  // Instructor: sees the score and the exits, reviews the answers, and releases to one student.
  await coach.getByRole('button', { name: 'Refresh' }).click();
  await expect(amyResult).toContainText('Submitted');
  await expect(amyResult).toContainText(`${expected} / ${detail.test.maxScore}`);
  await expect(amyResult.locator('[data-flag="true"]')).toBeVisible();
  await amyResult.getByRole('button', { name: 'View answers' }).click();
  await expect(coach.locator('.ranked-review-panel .practice-question')).toHaveCount(8);
  await fits(coach, 'instructor-results');
  await amyResult.getByRole('button', { name: 'Release results' }).click();
  await expect(amyResult).toContainText('Results released');
  await expect(coach.locator('.ranked-results tbody tr', { hasText: 'Ben Ortiz' })).toContainText(
    'Not started',
  );

  await amy.reload();
  await expect(amy.getByRole('heading', { name: 'Answer review' })).toBeVisible();
  await expect(amy.locator('.ranked-review .practice-question')).toHaveCount(8);
  await expect(amy.locator('.practice-option.correct').first()).toBeVisible();
  await fits(amy, 'student-review');

  // The dashboard counts the ranked test and its points.
  await amy.goto(`${base}/dashboard/student`);
  const stat = (name) =>
    amy.locator('.stat-card', { has: amy.getByText(name, { exact: true }) }).locator('strong');
  await expect(stat('Ranked tests')).toHaveText('1');
  await expect(stat('Total points')).toHaveText(
    String(Math.round((expected / detail.test.maxScore) * 100)),
  );

  // A student who never opened the test cannot read its questions.
  const ben = await account(students['Ben Ortiz']);
  await ben.goto(`${base}/dashboard/student/events/water-quality/ranked-tests/${detail.test.id}`);
  await expect(ben.getByText('This test locks your screen until you submit.')).toBeVisible();
  await expect(ben.locator('.practice-question')).toHaveCount(0);

  assert.deepEqual(errors, []);
  console.log(
    'Ranked browser checks passed: sidebar tabs, team sheets with timeslot colors and clashes, student cards, Gemini-built test from several sources, all-team and partner assignment, full-screen lock, exit tracking, back-button trap, score without answers, per-student release, review, layouts.',
  );
} catch (error) {
  // Keep what each account was looking at when a check failed.
  for (const [index, context] of browser.contexts().entries())
    for (const page of context.pages())
      await page.screenshot({ path: `${shots}/failure-${index}.png` }).catch(() => {});
  throw error;
} finally {
  await browser.close();
  raw.close();
}
