import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import {
  practiceTests,
  listPracticeTests,
  publicPracticePaper,
} from '../src/lib/practice-catalog.ts';
import { gradePractice, validateAnswers } from '../src/lib/practice-grading.ts';

// Browser-only account mocks. The app and its server authorization are unchanged.
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3002';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
const attempts = [];
await mkdir('documents/qa', { recursive: true });
async function account(role) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  const profile = {
    id: `qa-${role}`,
    role,
    displayName: 'Practice Learner',
    schoolId: 'qa-school',
    schoolName: 'School-QA',
    schoolCommunityId: 'ppchs',
    schoolCommunityName: 'Test school',
    division: role === 'student' ? 'B' : null,
  };
  const token =
    Buffer.from('{"alg":"none"}').toString('base64url') +
    '.' +
    Buffer.from(
      JSON.stringify({
        sub: profile.id,
        user_id: profile.id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        aud: 'qa',
        iss: 'https://securetoken.google.com/qa',
        firebase: { sign_in_provider: 'password' },
      }),
    ).toString('base64url') +
    '.signature';
  await page.route('https://identitytoolkit.googleapis.com/**', (route) =>
    route.fulfill({
      json: route.request().url().includes('signInWithPassword')
        ? {
            localId: profile.id,
            email: 'qa@example.test',
            idToken: token,
            refreshToken: 'qa-refresh',
            expiresIn: '3600',
            registered: true,
          }
        : {
            users: [
              {
                localId: profile.id,
                email: 'qa@example.test',
                emailVerified: true,
                providerUserInfo: [
                  {
                    providerId: 'password',
                    email: 'qa@example.test',
                    federatedId: 'qa@example.test',
                  },
                ],
              },
            ],
          },
    }),
  );
  let failSubmit = true;
  await page.route('**/api/**', async (route) => {
    const url = new URL(route.request().url());
    const method = route.request().method();
    if (url.pathname === '/api/auth/profile') return route.fulfill({ json: profile });
    if (url.pathname === '/api/dashboard')
      return route.fulfill({
        json: {
          profile,
          students: [],
          stats: { lessons: 0, practice: attempts.length, ranked: 0, points: 0 },
          progress: {},
          assignments: [],
        },
      });
    if (url.pathname === '/api/event-selections') return route.fulfill({ json: [] });
    if (url.pathname === '/api/school/password')
      return route.fulfill({
        json: { schoolName: 'School-QA', joiningPassword: 'QA-NOT-A-REAL-PASSWORD' },
      });
    if (url.pathname === '/api/practice/review') {
      if (method === 'POST') {
        const body = route.request().postDataJSON();
        const result = attempts.find((a) => a.id === body.id);
        for (const q of result.questions)
          for (const c of q.criteria)
            if (c.needsReview) {
              c.earned = body.scores[`${q.id}/${c.id}`];
              c.needsReview = false;
              q.earned = c.earned;
            }
        result.score = result.questions.reduce((n, q) => n + q.earned, 0);
        result.percentage = Math.round((result.score / result.maxScore) * 10000) / 100;
        result.pendingPoints = 0;
        return route.fulfill({ json: result });
      }
      return route.fulfill({
        json: attempts
          .filter((a) => a.pendingPoints)
          .map((result) => ({
            studentName: 'Practice Learner',
            title: 'UT Austin · Regionals · 2014',
            result,
            questions: practiceTests.find((t) => t.id === result.testId).questions,
          })),
      });
    }
    if (url.pathname === '/api/practice') {
      if (method === 'POST') {
        if (failSubmit) {
          failSubmit = false;
          return route.fulfill({
            status: 503,
            json: { error: 'Temporary save failure. Please try again.' },
          });
        }
        const body = route.request().postDataJSON();
        const paper = practiceTests.find((t) => t.id === body.testId);
        const result = {
          ...gradePractice(paper, validateAnswers(paper, body.answers)),
          id: crypto.randomUUID(),
          completedAt: new Date().toISOString(),
        };
        attempts.unshift(result);
        return route.fulfill({ status: 201, json: result });
      }
      const id = url.searchParams.get('testId');
      if (id) {
        const test = practiceTests.find((t) => t.id === id);
        return route.fulfill({
          json: {
            test: publicPracticePaper(test),
            attempts: attempts.filter((a) => a.testId === id),
          },
        });
      }
      return route.fulfill({
        json: { tests: listPracticeTests(profile.division, url.searchParams.get('eventId')) },
      });
    }
    return route.fulfill({ json: [] });
  });
  await page.goto(base + '/login/' + role);
  await page.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await page.getByLabel('Password', { exact: true }).fill('qa-browser-only-password');
  await page.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page).toHaveURL(new RegExp('/dashboard/' + role + '$'));
  return { page, context };
}
async function layout(page, name) {
  for (const theme of ['dark', 'light']) {
    await page.evaluate((theme) => (document.documentElement.dataset.theme = theme), theme);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        `${name} ${theme} ${width}: overflow`,
      );
      if (width !== 320)
        await page.screenshot({ path: `documents/qa/practice-${name}-${theme}-${width}.png` });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
}
try {
  const auth = await browser.newPage();
  for (const path of ['/api/practice?eventId=heredity', '/api/practice/review'])
    assert.equal((await auth.request.get(base + path)).status(), 401);
  for (const path of ['/api/practice', '/api/practice/review'])
    assert.equal((await auth.request.post(base + path, { data: {} })).status(), 401);
  await auth.goto(
    base + '/dashboard/student/events/heredity/practice-tests/ut-austin-2014-heredity-b',
  );
  await expect(auth).toHaveURL(/\/login\/student$/);
  await auth.close();
  const { page } = await account('student');
  await page.goto(base + '/dashboard/student/events/heredity/practice-tests');
  await expect(page.locator('.practice-test-list li')).toHaveCount(3);
  await page.getByLabel('Search practice tests').fill('BullSO');
  await expect(page.locator('.practice-test-list li')).toHaveCount(1);
  await page.getByRole('button', { name: 'Clear search' }).click();
  await page.getByLabel('Level', { exact: true }).selectOption('Regionals');
  await expect(page.locator('.practice-test-list li')).toHaveCount(1);
  await page.getByLabel('Year', { exact: true }).selectOption('2026');
  await expect(page.getByRole('heading', { name: 'No tests match your search.' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await layout(page, 'library');
  await page.getByRole('link', { name: /UT Austin · Regionals · 2014/ }).click();
  await expect(page.locator('.practice-question')).toHaveCount(29);
  await expect(page.locator('iframe[title^="Complete test:"]')).toHaveAttribute(
    'src',
    /Heredity_Test/,
  );
  const question = (id) =>
    page.locator('.practice-question').filter({ has: page.locator(`input[name="${id}"]`) });
  await question('1').getByRole('radio', { name: 'A', exact: true }).check();
  const written = page.getByRole('textbox', { name: 'Your answer', exact: true });
  const original = 'My own reasoning\n  with spaces intact.  ';
  await written.nth(0).fill(original);
  await written.nth(2).fill('  AUTOSOMAL   dominant\n');
  await page.reload();
  await expect(written.nth(0)).toHaveValue(original);
  await expect(question('1').getByRole('radio', { name: /A/ })).toBeChecked();
  await page.getByRole('button', { name: 'Submit test', exact: true }).click();
  await expect(page.locator('.practice-answer-sheet').getByRole('alert')).toHaveText(
    'Temporary save failure. Please try again.',
  );
  await expect(written.nth(0)).toHaveValue(original);
  await page.getByRole('button', { name: 'Submit test', exact: true }).click();
  await expect(page.getByRole('region', { name: 'Test results' })).toContainText('5 / 80 points');
  await expect(page.getByRole('region', { name: 'Test results' })).toContainText('6.25%');
  await expect(written.nth(0)).toHaveValue(original);
  await expect(question('1').locator('.practice-option.correct')).toContainText('E');
  await expect(question('1').locator('.practice-option.selected')).toContainText('A');
  await expect(page.locator('.practice-rubric').first()).toContainText('Rubric answer');
  for (const [theme, green, red] of [
    ['dark', 'rgb(99, 228, 160)', 'rgb(255, 151, 151)'],
    ['light', 'rgb(23, 101, 54)', 'rgb(181, 34, 50)'],
  ]) {
    await page.evaluate((theme) => (document.documentElement.dataset.theme = theme), theme);
    await expect(question('1').locator('.practice-option.correct')).toHaveCSS('color', green);
    await expect(page.locator('.practice-rubric p').first()).toHaveCSS('color', red);
  }
  await question('1').screenshot({ path: 'documents/qa/practice-mcq-review.png' });
  await page
    .locator('.practice-question')
    .filter({ has: written.nth(0) })
    .first()
    .screenshot({ path: 'documents/qa/practice-frq-review.png' });
  await layout(page, 'result');
  await page.getByRole('button', { name: 'Try again', exact: true }).click();
  await written.nth(0).fill('New draft');
  await page.getByText('Previous submissions (1)', { exact: true }).click();
  await page.locator('.practice-history button').click();
  await expect(written.nth(0)).toHaveValue(original);
  await page.getByRole('button', { name: 'Return to your draft' }).click();
  await expect(written.nth(0)).toHaveValue('New draft');
  await page.goto(base + '/dashboard/student/events/meteorology/practice-tests');
  await expect(
    page.getByRole('heading', { name: 'No verified tests for this event yet.' }),
  ).toBeVisible();
  const { page: instructor } = await account('instructor');
  await instructor.getByText(/Practice Learner · UT Austin/).click();
  await expect(instructor.locator('.practice-original-answer')).toHaveText(original);
  await instructor.getByRole('spinbutton').fill('3');
  await instructor.getByRole('button', { name: 'Save rubric scores' }).click();
  await expect(instructor.getByText('No written answers awaiting review.')).toBeVisible();
  await page.goto(
    base + '/dashboard/student/events/heredity/practice-tests/ut-austin-2014-heredity-b',
  );
  await page.getByText('Previous submissions (1)', { exact: true }).click();
  await page.locator('.practice-history button').click();
  await expect(page.getByRole('region', { name: 'Test results' })).toContainText('8 / 80 points');
  await expect(page.getByRole('region', { name: 'Test results' })).toContainText('10%');
  assert.deepEqual(errors, []);
  console.log(
    'Practice browser checks passed: search, filters, drafts, retry, grading colors, history, instructor review, mobile layouts, unauthenticated APIs.',
  );
} finally {
  await browser.close();
}
