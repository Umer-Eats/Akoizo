import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { practiceTests, publicPracticePaper } from '../src/lib/practice-catalog.ts';
import { askAko } from '../src/lib/ako-tutor.ts';

// Browser-only account mocks. The real tutor service runs unchanged against a scripted model, so
// no live account, school record, or Gemini request is involved.
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3002';
const testId = 'ut-austin-2014-heredity-b';
const paper = practiceTests.find((test) => test.id === testId);
const question = paper.questions[0];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
const requests = [];
const scripted = {
  'What’s the answer?': { reply: 'It is the first one. Why?', mood: 'happy', askedWhy: true },
  'no idea': { reply: 'Hmph. Think about the alleles.', mood: 'idle', verdict: 'incorrect' },
  'each parent passes one allele': { reply: 'Yes! Exactly.', mood: 'happy', verdict: 'correct' },
};
const modelFor = (message) => async () => {
  if (message === 'break') return new Response('{}', { status: 500 });
  const reply = { verdict: 'none', askedWhy: true, ...scripted[message] };
  return new Response(
    JSON.stringify({
      candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify(reply) }] } }],
    }),
  );
};
await mkdir('documents/qa', { recursive: true });
try {
  const anonymous = await browser.newPage();
  assert.equal(
    (await anonymous.request.post(base + '/api/practice/ako', { data: {} })).status(),
    401,
  );
  await anonymous.close();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  const profile = {
    id: 'qa-student-B',
    role: 'student',
    displayName: 'Practice Learner',
    schoolId: 'qa-school',
    schoolName: 'School-QA',
    schoolCommunityId: 'ppchs',
    schoolCommunityName: 'Test school',
    division: 'B',
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
  await page.route('**/api/**', async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname === '/api/auth/profile') return route.fulfill({ json: profile });
    if (url.pathname === '/api/dashboard')
      return route.fulfill({
        json: {
          profile,
          students: [],
          stats: { lessons: 0, practice: 0, ranked: 0, points: 0 },
          progress: {},
          assignments: [],
        },
      });
    if (url.pathname === '/api/practice/ako') {
      const body = route.request().postDataJSON();
      requests.push(body);
      try {
        return route.fulfill({
          json: await askAko(paper, body, { apiKey: 'qa', fetcher: modelFor(body.message) }),
        });
      } catch (error) {
        return route.fulfill({ status: error.status ?? 500, json: { error: error.message } });
      }
    }
    if (url.pathname === '/api/practice')
      return route.fulfill({ json: { test: publicPracticePaper(paper), attempts: [] } });
    return route.fulfill({ json: [] });
  });
  await page.goto(base + '/login/student');
  await page.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await page.getByLabel('Password', { exact: true }).fill('qa-browser-only-password');
  await page.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard\/student$/);
  const buddy = page.getByTestId('ako-companion');
  const chat = page.getByRole('region', { name: 'Study with Ako' });
  // Away from a practice test Ako has nothing to read, so no study chat is offered.
  await page.locator('.ako-companion-body').click();
  await expect(page.getByRole('region', { name: 'Ako controls' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Study this test with Ako' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Close Ako controls' }).click();

  await page.goto(`${base}/dashboard/student/events/heredity/practice-tests/${testId}`);
  const options = page.locator('.practice-question').first().getByRole('radio');
  await options.first().check();
  await page.getByRole('button', { name: `Ask Ako about ${question.label}`, exact: true }).click();
  await expect(chat).toBeVisible();
  await expect(chat.getByRole('combobox')).toHaveValue(question.id);
  await chat.getByRole('button', { name: 'What’s the answer?' }).click();
  await expect(chat.getByText('It is the first one. Why?')).toBeVisible();
  await expect(chat.getByText('Ako is waiting for your why.')).toBeVisible();
  await expect(buddy).toHaveAttribute('data-action', 'happy');
  assert.deepEqual(requests[0], {
    testId,
    questionId: question.id,
    message: 'What’s the answer?',
    history: [],
    answer: question.options[0].id,
    pendingWhy: false,
    missedWhys: 0,
  });

  const box = chat.getByRole('textbox', { name: 'Explain why to Ako' });
  await box.fill('no idea');
  await box.press('Enter');
  await expect(chat.getByText('Hmph. Think about the alleles.')).toBeVisible();
  await expect(buddy).toHaveAttribute('data-action', 'angry');
  await expect(page.locator('.ako-companion-body path[fill="#ef6976"]')).not.toHaveCount(0);
  assert.equal(requests[1].pendingWhy, true);
  assert.equal(requests[1].history.length, 2);
  await page.screenshot({ path: 'documents/qa/ako-chat-angry.png' });
  // He stays mad, and stays put, until the explanation is right.
  const angryAt = await page.locator('.ako-companion-body').boundingBox();
  await page.waitForTimeout(6000);
  await expect(buddy).toHaveAttribute('data-action', 'angry');
  assert.deepEqual(await page.locator('.ako-companion-body').boundingBox(), angryAt);

  await box.fill('break');
  await box.press('Enter');
  await expect(chat.getByRole('alert')).toContainText('Ako is taking a nap');
  await expect(box).toHaveValue('break');
  await expect(buddy).toHaveAttribute('data-action', 'sad');
  await expect(chat.getByText('Ako is waiting for your why.')).toBeVisible();

  await box.fill('each parent passes one allele');
  await chat.getByRole('button', { name: 'Send' }).click();
  await expect(chat.getByText('Yes! Exactly.')).toBeVisible();
  await expect(buddy).toHaveAttribute('data-action', 'happy');
  await expect(chat.getByText('Ako is waiting for your why.')).toHaveCount(0);
  assert.equal(requests.at(-1).missedWhys, 1);
  await page.screenshot({ path: 'documents/qa/ako-chat-happy.png' });

  // Another question starts a fresh thread; closing and reopening keeps the current one.
  await chat.getByRole('combobox').selectOption('');
  await expect(chat.locator('.ako-chat-turn')).toHaveCount(0);
  await expect(chat.getByRole('button', { name: 'Quiz me on a topic' })).toBeVisible();
  await chat.getByRole('button', { name: 'Close Ako chat' }).click();
  await expect(chat).toHaveCount(0);
  await page.locator('.ako-companion-body').click();
  await page.getByRole('button', { name: 'Study this test with Ako' }).click();
  await expect(chat).toBeVisible();

  for (const [width, height] of [
    [390, 844],
    [320, 640],
  ]) {
    await page.setViewportSize({ width, height });
    const panel = await chat.boundingBox();
    assert.ok(
      panel.x >= 0 &&
        panel.x + panel.width <= width &&
        panel.y >= 0 &&
        panel.y + panel.height <= height,
      `chat fits a ${width}px screen`,
    );
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'documents/qa/ako-chat-mobile.png' });
  if (errors.length) throw Error(errors.join('\n'));
  console.log(
    'Ako chat checks passed: question focus, why routine, mad/happy/sad reactions, error recovery, fresh threads, mobile bounds.',
  );
} finally {
  await browser.close();
}
