// Browser check for instructor Student View, six-plus-one lesson checkpoints, ranked difficulty,
// and the source papers shown beside a ranked test. Firebase and Gemini are mocked; the real
// services run over an in-memory database, so no live account or school record is touched.
//   TEST_BASE_URL=http://127.0.0.1:3006 node --experimental-strip-types scripts/teacher-study-browser-check.mjs
import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import { registerMember, dashboardFor } from '../src/lib/school-service.ts';
import { isDivision } from '../src/lib/domain.ts';
import { rankedPoolSummary } from '../src/lib/ranked-builder.ts';
import * as ranked from '../src/lib/ranked-service.ts';
import {
  checkLessonAnswer,
  lessonProgress,
  previewLessonAnswer,
} from '../src/lib/lesson-checkpoint-service.ts';
import { listSheets } from '../src/lib/cheatsheet-service.ts';
import { listBinders } from '../src/lib/binder-service.ts';
import { studentWork } from '../src/lib/study-assignment-service.ts';
import {
  findPracticeTest,
  listArchiveSources,
  listPracticeTests,
  publicPracticePaper,
} from '../src/lib/practice-catalog.ts';
import { previewPractice } from '../src/lib/practice-service.ts';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3006';
const shots = 'documents/qa/teacher-study';
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
  { role: 'instructor', displayName: 'Coach Rivera', instructorInvitePassword: 'qa', schoolCommunityId: 'ppchs' },
  'qa',
);
const amy = (
  await registerMember(
    db,
    identity('amy'),
    { role: 'student', displayName: 'Amy Chen', division: 'C', schoolPassword: teacher.credentials.joiningPassword },
    'qa',
  )
).profile;

// Gemini stand-in: spread picks across every source test.
const prompts = [];
const ai = {
  apiKey: 'qa',
  model: 'gemini-qa',
  fetcher: async (_url, init) => {
    const payload = JSON.parse(JSON.parse(init.body).contents[0].parts[0].text);
    prompts.push(payload);
    const bySource = [...new Set(payload.candidates.map((c) => c.source))].map((source) =>
      payload.candidates.filter((c) => c.source === source),
    );
    const ids = [];
    for (let round = 0; ids.length < payload.questionCount && round < 300; round++)
      for (const list of bySource)
        if (list[round] && ids.length < payload.questionCount) ids.push(list[round].id);
    return new Response(
      JSON.stringify({
        candidates: [
          { finishReason: 'STOP', content: { parts: [{ text: JSON.stringify({ questionIds: ids }) }] } },
        ],
      }),
    );
  },
};

// Mirrors memberFor: an instructor's study-division header gives them a division and preview.
const headersSeen = [];
async function api(route, member) {
  const request = route.request();
  const url = new URL(request.url());
  const method = request.method();
  const body = ['POST', 'PATCH', 'DELETE'].includes(method) ? (request.postDataJSON() ?? {}) : {};
  const study = request.headers()['x-akoizo-study-division'];
  if (study) headersSeen.push(`${url.pathname}:${study}`);
  const profile =
    member.role === 'instructor' && isDivision(study) ? { ...member, division: study } : member;
  const preview = profile.role === 'instructor';
  const handlers = {
    '/api/auth/profile': () => member,
    '/api/dashboard': () => dashboardFor(db, member),
    '/api/ranked': async () => {
      if (method === 'POST') {
        if (body.action === 'create') return ranked.createRankedTest(db, profile, body, ai);
        return { ok: true };
      }
      const testId = url.searchParams.get('testId');
      if (url.searchParams.get('pool')) return rankedPoolSummary(url.searchParams.get('pool'));
      if (profile.role === 'instructor')
        return testId
          ? ranked.rankedForInstructor(db, profile, testId)
          : ranked.listRankedForInstructor(db, profile);
      return testId ? ranked.rankedForStudent(db, profile, testId) : ranked.listRankedForStudent(db, profile);
    },
    '/api/ranked/attempt': () =>
      ({
        start: () => ranked.startRanked(db, profile, body.testId),
        save: () => ranked.saveRankedDraft(db, profile, body),
      })[body.action]?.() ?? { ok: true },
    '/api/lessons/progress': () =>
      method === 'GET'
        ? preview
          ? { answers: [], parts: [] }
          : lessonProgress(db, profile, url.searchParams.get('eventId'))
        : { recorded: body.part },
    '/api/lessons/check': () =>
      method === 'DELETE'
        ? { reset: true }
        : preview
          ? previewLessonAnswer(profile, body, { apiKey: '' })
          : checkLessonAnswer(db, profile, body, { apiKey: '' }),
    '/api/progress': () =>
      method === 'GET' ? studentWork(db, member, url.searchParams.get('studentId')) : { completed: 0 },
    '/api/cheatsheets': () =>
      listSheets(db, profile, url.searchParams.get('eventId'), url.searchParams.get('before')),
    '/api/binders': () =>
      listBinders(db, profile, url.searchParams.get('eventId'), null, url.searchParams.get('division')),
    '/api/practice': () => {
      if (method === 'POST') return previewPractice(profile, body);
      const testId = url.searchParams.get('testId');
      if (testId)
        return { test: publicPracticePaper(findPracticeTest(profile.division, testId)), attempts: [] };
      const eventId = url.searchParams.get('eventId') ?? '';
      return {
        tests: listPracticeTests(profile.division, eventId),
        archive: listArchiveSources(profile.division, eventId),
      };
    },
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
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
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
        ? { ...user, idToken: token, refreshToken: 'qa-refresh', expiresIn: '3600', registered: true }
        : { users: [{ ...user, emailVerified: true, providerUserInfo: [{ providerId: 'password', email: user.email }] }] },
    }),
  );
  await page.addInitScript(() => {
    if (window.self !== window.top) return;
    localStorage.setItem('ako-preferences', JSON.stringify({ visible: false, muted: true }));
  });
  await page.route('**/api/**', (route) => api(route, profile));
  await page.goto(`${base}/login/${profile.role}`);
  await page.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await page.getByLabel('Password', { exact: true }).fill('qa-browser-only-password');
  await page.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`/dashboard/${profile.role}$`));
  return page;
}
const noOverflow = async (page, name) =>
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    false,
    `${name}: horizontal overflow`,
  );

try {
  // 1. Instructor Student View: pick a division, browse every event without competition boxes.
  const coach = await account(teacher.profile);
  const sidebar = coach.getByRole('navigation', { name: 'Instructor sections' });
  await sidebar.getByRole('button', { name: /Student View/ }).click();
  await expect(coach.getByRole('heading', { name: 'See what your students see.' })).toBeVisible();
  await coach.getByLabel('Student division to view').selectOption('C');
  await expect(coach.locator('.event-selection')).toHaveCount(0);
  await coach.screenshot({ path: `${shots}/student-view-tab.png` });

  // 2. Lessons in the student format, with a six-plus-one checkpoint graded but not saved.
  await coach.locator('.event-card-link', { hasText: 'Forensics' }).click();
  await expect(coach).toHaveURL(/\/dashboard\/student\/events\/forensics\/lessons$/);
  await expect(coach.getByRole('heading', { name: 'Student toolkit' })).toBeVisible();
  await expect(coach.locator('.lesson-button small').first()).toContainText('7 checkpoint questions');
  await coach.screenshot({ path: `${shots}/teacher-lessons.png` });
  await coach.locator('#lesson-tab-checkpoint').click();
  const stage = coach.locator('#lesson-stage-checkpoint');
  await expect(stage.locator('.lc-dot')).toHaveCount(7);
  await stage.locator('.lc-answer input').first().check();
  await stage.getByRole('button', { name: 'Check answer' }).click();
  await expect(stage.locator('.lc-verdict')).toBeVisible();
  await coach.screenshot({ path: `${shots}/teacher-checkpoint.png` });
  await noOverflow(coach, 'teacher lessons');

  // 3. Generators open for the instructor in the chosen division.
  // Each test event offers either a binder or a cheat sheet generator.
  for (const [eventId, tool, text] of [
    ['forensics', 'cheatsheet-generator', /Generate & share sheet/],
    ['astronomy', 'binder-generator', /binder/i],
    ['forensics', 'practice-tests', /practice/i],
  ]) {
    await coach.goto(`${base}/dashboard/student/events/${eventId}/${tool}`);
    await expect(coach.locator('.event-feature-heading h1')).toBeVisible();
    await expect(coach.getByText('That page isn’t in')).toHaveCount(0);
    await expect(coach.locator('.event-content')).toContainText(text);
    await coach.screenshot({ path: `${shots}/teacher-${tool}.png` });
  }
  await coach.goto(`${base}/dashboard/student/events/forensics/ranked-tests`);
  await expect(coach.getByText('Students see the ranked tests you assign here.')).toBeVisible();
  assert.ok(headersSeen.some((h) => h.startsWith('/api/cheatsheets:C')), 'study division header sent');

  // 4. Ranked difficulty: build a Hard test; the builder is asked for Hard.
  await coach.goto(`${base}/dashboard/instructor?tab=ranked`);
  await expect(coach.getByLabel('Difficulty')).toBeVisible();
  await coach.getByLabel('Division', { exact: true }).selectOption('C');
  const picker = coach.getByLabel('Event', { exact: true });
  await expect(picker.locator('option').nth(1)).toBeAttached();
  const eventId = await picker.evaluate(
    (select) => [...select.options].filter((o) => o.value && !/in 1 test/.test(o.text))[0].value,
  );
  await picker.selectOption(eventId);
  await coach.getByLabel('Questions', { exact: true }).fill('12');
  await coach.getByLabel('Difficulty').selectOption('Hard');
  await expect(coach.getByText(/Hard difficulty:/)).toBeVisible();
  await expect(coach.getByLabel('Tournament level')).toHaveValue('Regional');
  await coach.getByLabel('Tournament level').selectOption('National');
  await expect(coach.getByText(/National level:/)).toBeVisible();
  await coach.screenshot({ path: `${shots}/ranked-create-difficulty.png` });
  await coach.getByRole('button', { name: 'Build ranked test' }).click();
  await expect(coach.locator('.ranked-test-meta')).toContainText('National level · Hard difficulty · combined from', {
    timeout: 20_000,
  });
  // The preview shows the same source papers students get beside the test.
  await coach.getByText('Preview questions and answer key').click();
  await expect(coach.locator('.ranked-review-workspace .ranked-reference')).toBeVisible();
  await coach.screenshot({ path: `${shots}/ranked-instructor-preview.png` });
  assert.equal(prompts.at(-1).targetDifficulty, 'Hard');
  assert.equal(prompts.at(-1).tournamentLevel, 'National');
  const [test] = await ranked.listRankedForInstructor(db, teacher.profile);
  assert.equal(test.difficulty, 'Hard');
  assert.ok(test.sources.length >= 2, 'combines several source tests');
  await ranked.assignRanked(db, teacher.profile, { testId: test.id, studentIds: [amy.id], due: '2999-01-01' });

  // 5. The student takes it with every source paper beside the questions.
  const student = await account(amy);
  await student.goto(`${base}/dashboard/student/events/${eventId}/ranked-tests/${test.id}`);
  await student.getByRole('button', { name: 'Enter full screen and start' }).click();
  const panel = student.locator('.ranked-lock .ranked-reference');
  await expect(panel).toBeVisible();
  const tabs = panel.getByRole('tab');
  assert.ok((await tabs.count()) >= 2, 'one tab per source paper');
  await expect(panel.locator('iframe').first()).toHaveAttribute('src', /\.pdf#page=\d+|drive\.google/);
  await expect(panel.locator('.ranked-reference-topics li').first()).toBeVisible();
  await expect(panel.getByText(/Open .* in a new tab/)).toHaveCount(0);
  const jump = student.locator('.ranked-question-source button').last();
  const label = (await jump.textContent()).trim();
  await jump.click();
  await expect(panel.getByRole('tab', { selected: true })).toContainText(label.split(',')[0]);
  assert.equal(await student.evaluate(() => !!document.fullscreenElement), true, 'still full screen');
  await student.screenshot({ path: `${shots}/ranked-side-panel.png` });
  await student.setViewportSize({ width: 390, height: 900 });
  await noOverflow(student, 'ranked side panel phone');
  await student.screenshot({ path: `${shots}/ranked-side-panel-390.png` });

  const relevant = errors.filter((e) => !/hydrat|favicon|Download the React DevTools/i.test(e));
  assert.deepEqual(relevant, [], 'no page errors');
  console.log('Teacher study, checkpoint, difficulty, and ranked source checks passed.');
} finally {
  await browser.close();
}
