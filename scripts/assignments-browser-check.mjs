import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import { registerMember, dashboardFor } from '../src/lib/school-service.ts';
import { createTeam, listTeams, updateTeam } from '../src/lib/team-service.ts';
import { assignWork, recordLab, recordLessons } from '../src/lib/study-assignment-service.ts';
import { listPracticeTests } from '../src/lib/practice-catalog.ts';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';
import { lessonStorageKey } from '../src/lib/lesson-practice.ts';

// Browser-only account mocks over an in-memory database. The real services run unchanged, and no
// live account, school record, or Gemini request is involved.
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3005';
const shots = 'output/assignment-qa';
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

async function api(route, profile) {
  const request = route.request();
  const url = new URL(request.url());
  const body = request.method() === 'POST' ? request.postDataJSON() : {};
  const handlers = {
    '/api/auth/profile': () => profile,
    '/api/dashboard': () => dashboardFor(db, profile),
    '/api/teams': () => listTeams(db, profile),
    '/api/assignments': () => assignWork(db, profile, body),
    '/api/progress': () =>
      body.labId ? recordLab(db, profile, body) : recordLessons(db, profile, body),
    '/api/practice': () => ({
      tests: listPracticeTests(
        url.searchParams.get('division') || profile.division,
        url.searchParams.get('eventId'),
      ),
    }),
  };
  try {
    return route.fulfill({ json: await handlers[url.pathname]() });
  } catch (error) {
    return route.fulfill({ status: error.status ?? 500, json: { error: error.message } });
  }
}

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
async function account(profile) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    // MOTION=1 runs with entrance animations on, as most visitors see the site.
    reducedMotion: process.env.MOTION ? 'no-preference' : 'reduce',
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

try {
  for (const [name, members] of [
    ['Varsity', ['Amy Chen', 'Ben Ortiz']],
    ['JV', ['Cal Reyes']],
  ]) {
    const team = await createTeam(db, teacher.profile, { name, division: 'C' });
    for (const [slot, name] of members.entries())
      await updateTeam(db, teacher.profile, {
        teamId: team.id,
        eventId: 'forensics',
        slot,
        studentId: students[name].id,
      });
  }
  const page = await account(teacher.profile);
  await page.getByRole('button', { name: 'Forensics', exact: false }).click();
  await page
    .getByRole('button', { name: /Assign test / })
    .first()
    .click();
  let modal = page.getByRole('dialog');
  await expect(modal.getByText('Everyone in Forensics, across all teams')).toBeVisible();
  await expect(modal.getByText('Amy Chen + Ben Ortiz')).toBeVisible();
  await modal.getByRole('button', { name: 'Assign to all 3 students', exact: true }).click();
  await expect(modal.getByText('Assigned to 3 students.', { exact: true })).toBeVisible();
  await modal.getByRole('button', { name: 'Assign to all 3 students', exact: true }).click();
  await expect(modal.getByText(/3 students already had this test/)).toBeVisible();
  await modal.getByRole('button', { name: 'Close', exact: true }).click();
  await page.getByRole('button', { name: 'Lessons by unit', exact: true }).click();
  await page.getByLabel('Filter lessons by unit').selectOption({ index: 1 });
  await page.getByRole('button', { name: /Assign Unit/ }).click();
  modal = page.getByRole('dialog');
  await modal.getByLabel('Assign to Amy Chen', { exact: true }).check();
  await expect(modal.getByText(/2 students with their event partners/)).toBeVisible();
  await modal.getByRole('button', { name: 'Assign to 2 selected students', exact: true }).click();
  await expect(modal.getByText('Assigned to 2 students.', { exact: true })).toBeVisible();
  await modal.getByRole('button', { name: 'Close', exact: true }).click();
  await page
    .getByRole('button', { name: /Assign / })
    .filter({ hasText: 'Assign lesson' })
    .first()
    .click();
  modal = page.getByRole('dialog');
  await modal.getByRole('button', { name: 'Assign to all 3 students', exact: true }).click();
  await expect(modal.getByText('Assigned to 3 students.', { exact: true })).toBeVisible();
  await modal.getByRole('button', { name: 'Close', exact: true }).click();
  await page.getByRole('button', { name: 'Lab simulations', exact: true }).click();
  await page.getByRole('button', { name: /Assign PhET:/ }).click();
  modal = page.getByRole('dialog');
  await modal.getByRole('button', { name: 'Assign to all 3 students', exact: true }).click();
  await expect(modal.getByText('Assigned to 3 students.', { exact: true })).toBeVisible();
  await modal.getByRole('button', { name: 'Close', exact: true }).click();
  await page
    .getByRole('button', { name: /Assign / })
    .filter({ hasText: 'Assign lab' })
    .first()
    .click();
  modal = page.getByRole('dialog');
  await modal.getByRole('button', { name: 'Assign to all 3 students', exact: true }).click();
  await expect(modal.getByText('Assigned to 3 students.', { exact: true })).toBeVisible();
  await page.screenshot({ path: shots + '/instructor-desktop.png', fullPage: true });
  await modal.getByRole('button', { name: 'Close', exact: true }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: shots + '/instructor-mobile.png', fullPage: true });
  assert.ok(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    'Instructor mobile overflow',
  );
  const student = await account(students['Amy Chen']);
  await student.getByRole('button', { name: /Assignments \(/ }).click();
  await expect(student.getByRole('link', { name: 'Open unit', exact: true })).toBeVisible();
  await expect(student.getByRole('link', { name: 'Open lesson', exact: true })).toBeVisible();
  await student.getByRole('link', { name: 'Open unit', exact: true }).click();
  await expect(
    student.getByRole('heading', {
      name: lessonsForEvent('forensics', 'C').units[0].title,
      exact: true,
    }),
  ).toBeVisible();
  const course = lessonsForEvent('forensics', 'C');
  const attempts = Object.fromEntries(
    course.lessons
      .filter((l) => course.units[0].lessonIds.includes(l.id))
      .map((l) => [
        l.id,
        {
          answers: Object.fromEntries(l.practice.map((q) => [q.id, q.answer])),
          submitted: true,
          reviewed: l.practice.filter((q) => q.type === 'short').map((q) => q.id),
        },
      ]),
  );
  await student.evaluate(
    ({ key, attempts }) => localStorage.setItem(key, JSON.stringify({ attempts })),
    { key: lessonStorageKey(students['Amy Chen'].id, 'forensics'), attempts },
  );
  await student.reload();
  await expect
    .poll(async () =>
      (await dashboardFor(db, students['Amy Chen'])).assignments
        .filter((a) => a.study && ['Lesson', 'Unit'].includes(a.study.kind))
        .every((a) => a.completedAt),
    )
    .toBe(true);
  await student.goto(base + '/dashboard/student');
  await student.getByRole('button', { name: /Assignments \(/ }).click();
  await student.locator('a[href$="lab-practice?lab=phet"]').click();
  await expect(
    student.getByRole('button', { name: 'PhET simulations', exact: false }),
  ).toHaveAttribute('aria-pressed', 'true');
  await student.getByRole('link', { name: 'Open in a new tab', exact: false }).click();
  await student.getByRole('button', { name: 'Mark lab complete', exact: true }).last().click();
  await expect(
    student.getByText('Completion saved. Any pending assignment for this lab is complete.'),
  ).toBeVisible();
  await student.screenshot({ path: shots + '/student-lab.png', fullPage: true });
  assert.equal(
    (await dashboardFor(db, students['Amy Chen'])).assignments.find(
      (a) => a.study?.targetId === 'phet',
    ).completedAt !== null,
    true,
  );
  await student.goto(base + '/dashboard/student');
  await student.getByRole('button', { name: /Assignments \(/ }).click();
  await student.getByRole('link', { name: 'Open lab', exact: true }).click();
  await expect(
    student.getByRole('button', { name: 'Mark lab complete', exact: true }),
  ).toBeDisabled();
  await student
    .getByLabel('Your hypothesis', { exact: true })
    .fill('The ink components separate at different rates.');
  await student.getByRole('button', { name: 'Record measurement', exact: true }).click();
  await student
    .getByLabel('Evidence and conclusion', { exact: true })
    .fill('The measured distances show the components have different affinities for the solvent.');
  await student.getByRole('button', { name: 'Mark lab complete', exact: true }).click();
  await expect(
    student.getByText('Completion saved. Any pending assignment for this lab is complete.'),
  ).toBeVisible();
  assert.ok(
    (await dashboardFor(db, students['Amy Chen'])).assignments
      .filter((a) => a.study?.kind === 'Lab')
      .every((a) => a.completedAt),
  );
  assert.deepEqual(errors, []);
  console.log(
    'Assignment browser checks passed: practice, units, lessons, labs, partners, duplicates, student links, completion, and mobile layout.',
  );
} finally {
  await browser.close();
}
