import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { practiceTests, publicPracticePaper } from '../src/lib/practice-catalog.ts';

// Captures the logged-in screens shown on the home page into public/home.
// Browser-only account mocks. The app and its server authorization are unchanged.
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3005';
const out = process.env.HOME_SHOTS_DIR || 'public/home';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
await mkdir(out, { recursive: true });
const profile = {
  id: 'qa-student',
  role: 'student',
  displayName: 'Ada',
  schoolId: 'qa-school',
  schoolName: 'Science Team',
  schoolCommunityName: 'Science Team',
  schoolCommunityId: 'ppchs',
  division: 'C',
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

async function capture(theme) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const p = await context.newPage();
  await p.addInitScript((theme) => {
    localStorage.setItem('ako-preferences', JSON.stringify({ visible: false, muted: true }));
    localStorage.setItem('akoizo-theme', theme);
  }, theme);
  await p.route('https://identitytoolkit.googleapis.com/**', (route) =>
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
  await p.route('**/api/**', (route) => {
    const url = new URL(route.request().url());
    if (url.pathname === '/api/auth/profile') return route.fulfill({ json: profile });
    if (url.pathname === '/api/dashboard')
      return route.fulfill({
        json: {
          profile,
          students: [],
          stats: { lessons: 0, practice: 0, ranked: 0, points: 0 },
          assignments: [],
          progress: {},
        },
      });
    if (url.pathname === '/api/practice' && url.searchParams.get('testId')) {
      const test = practiceTests.find((t) => t.id === url.searchParams.get('testId'));
      return route.fulfill({ json: { test: publicPracticePaper(test), attempts: [] } });
    }
    return route.fulfill({ json: [] });
  });
  // Frames a viewport-sized shot with the given element just below the site header.
  const shot = async (name, selector) => {
    await p.evaluate((theme) => (document.documentElement.dataset.theme = theme), theme);
    await p.evaluate(
      (selector) =>
        scrollTo(
          0,
          selector
            ? document.querySelector(selector).getBoundingClientRect().top + scrollY - 96
            : 0,
        ),
      selector,
    );
    // Lets the embedded paper and lazy figures finish painting.
    await p.waitForTimeout(2500);
    await p.screenshot({ path: `${out}/${name}-${theme}.png` });
  };

  await p.goto(base + '/login/student');
  await p.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await p.getByLabel('Password', { exact: true }).fill('qa-browser-only-password');
  await p.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(p).toHaveURL(/dashboard\/student$/);

  // Testing format: a converted competition paper beside its answer sheet.
  await p.goto(`${base}/dashboard/student/events/astronomy/practice-tests/bullso-2026-astronomy-c`);
  await expect(p.locator('.practice-question').first()).toBeVisible();
  for (const [name, value] of [
    ['1', 'B'],
    ['2', 'C'],
    ['3', 'A'],
  ])
    await p.locator(`input[name="${name}"][value="${value}"]`).check();
  await shot('test-overview');
  await shot('test-paper', '.practice-paper');

  // Lab format: an archive lab with live readings and recorded measurements.
  await p.goto(`${base}/dashboard/student/events/chemistry-lab/lab-practice`);
  await p.getByRole('button', { name: /Follow a fading dye/ }).click();
  await p
    .getByLabel('Your hypothesis', { exact: true })
    .fill('Absorbance falls exponentially, so ln(A) against time is a straight line.');
  const slider = p.locator('.archive-controls input[type=range]').first();
  await slider.focus();
  for (let n = 0; n < 3; n++) {
    await slider.press('ArrowRight');
    await p.getByRole('button', { name: 'Record measurement', exact: true }).click();
  }
  await shot('lab-workbench', '.archive-workbench');
  await shot('lab-overview');

  // Lesson format: a course of units, illustrated reading, and an interactive model.
  await p.goto(`${base}/dashboard/student/events/anatomy-and-physiology/lessons`);
  await p.locator('.unit-button').nth(2).click();
  await expect(p.locator('.lesson-reading')).toBeVisible();
  await shot('lesson-course');
  await shot('lesson-reading', '.lesson-title-block');
  await shot('lesson-model', '.lesson-sim');
  await context.close();
}
try {
  for (const theme of ['dark', 'light']) await capture(theme);
  console.log(`Home screenshots written to ${out}.`);
} finally {
  await browser.close();
}
