// Division B parity check: lessons, virtual labs, cheat sheets, and binders render for a
// Division B student. Auth and every /api/** call are mocked; no school data is touched.
// Run: TEST_BASE_URL=http://127.0.0.1:3006 node scripts/division-b-browser-check.mjs
import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3002';
const out = 'documents/qa/division-b';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const p = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
});
const errors = [];
p.on('pageerror', (error) => errors.push(error.message));
const profile = {
  id: 'qa-student-b',
  role: 'student',
  displayName: 'Bea',
  schoolId: 'qa-school',
  schoolName: 'Science Team',
  schoolCommunityName: 'Science Team',
  schoolCommunityId: 'ppchs',
  division: 'B',
};
const payload = Buffer.from(
  JSON.stringify({
    sub: profile.id,
    user_id: profile.id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
    aud: 'qa',
    iss: 'https://securetoken.google.com/qa',
    firebase: { sign_in_provider: 'password' },
  }),
).toString('base64url');
const token = Buffer.from('{"alg":"none"}').toString('base64url') + '.' + payload + '.signature';
await p.route('https://identitytoolkit.googleapis.com/**', (route) =>
  route.fulfill({
    json: route.request().url().includes('signInWithPassword')
      ? {
          localId: profile.id,
          email: 'qa-b@example.test',
          idToken: token,
          refreshToken: 'qa-refresh',
          expiresIn: '3600',
          registered: true,
        }
      : {
          users: [
            {
              localId: profile.id,
              email: 'qa-b@example.test',
              emailVerified: true,
              providerUserInfo: [{ providerId: 'password', email: 'qa-b@example.test' }],
            },
          ],
        },
  }),
);
const requests = [];
await p.route('**/api/**', (route) => {
  const url = new URL(route.request().url());
  requests.push(url.pathname + url.search);
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
  if (url.pathname === '/api/cheatsheets')
    return route.fulfill({ json: { sheets: [], drafts: [], nextCursor: null } });
  if (url.pathname === '/api/binders')
    return route.fulfill({ json: { binders: [], jobs: [], nextCursor: null } });
  return route.fulfill({ json: [] });
});

try {
  await p.goto(base + '/login/student');
  await p.getByLabel('Email address', { exact: true }).fill('qa-b@example.test');
  await p.getByLabel('Password', { exact: true }).fill('qa-test-password');
  await p.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await p.waitForURL(/dashboard/);

  // A Division B-only course with its evidence investigation.
  await p.goto(base + '/dashboard/student/events/heredity/lessons');
  const lessons = p.locator('.lessons-workspace');
  await expect(lessons.getByRole('heading', { name: 'Heredity', exact: true })).toBeVisible();
  await expect(lessons.locator('.lessons-intro .eyebrow')).toContainText('DIVISION B · LESSONS');
  await expect(lessons.getByText('8 units')).toBeVisible();
  await p.locator('.lessons-intro').screenshot({ path: `${out}/heredity-intro.png` });
  const lab = p.locator('#lesson-lab');
  await lab.scrollIntoViewIfNeeded();
  for (const button of await lab.locator('.investigation-tests button').all()) await button.click();
  await lab.getByRole('button', { name: 'AaBb × AaBb', exact: true }).click();
  await expect(lab.getByText('Supported by the evidence.')).toBeVisible();
  await lab.screenshot({ path: `${out}/heredity-investigation.png` });
  await p.screenshot({ path: `${out}/heredity-lessons.png` });

  // A shared course carries the Division B note.
  await p.goto(base + '/dashboard/student/events/anatomy-and-physiology/lessons');
  await expect(p.locator('.lessons-intro')).toContainText('shared with Division C');
  await expect(p.locator('.lessons-intro .eyebrow')).toContainText('DIVISION B');

  // Meteorology unit 3 (LCL topic lab) through its unit link.
  await p.goto(base + '/dashboard/student/events/meteorology/lessons?unit=met-u3');
  await expect(p.locator('#current-lesson-title')).toContainText('Stüve');
  await p.screenshot({ path: `${out}/meteorology-lesson.png`, fullPage: false });

  // Virtual labs for Division B lab events.
  for (const [eventId, title] of [
    ['crime-busters', 'Match the ransom-note ink'],
    ['food-science', 'Curdle milk and find percent curd'],
    ['circuit-lab', 'Measure series and parallel resistors'],
  ]) {
    await p.goto(`${base}/dashboard/student/events/${eventId}/lab-practice`);
    await expect(p.locator('.archive-overview')).toContainText('DIVISION B / VIRTUAL LABS');
    await expect(p.getByRole('button', { name: new RegExp(title) })).toBeVisible();
    await p.screenshot({ path: `${out}/${eventId}-lab.png` });
    await p.locator('.archive-bench-diagram').screenshot({ path: `${out}/${eventId}-bench.png` });
  }

  // Cheat sheets and binders are open to Division B with the B library.
  await p.goto(base + '/dashboard/student/events/heredity/cheatsheet-generator');
  await expect(p.getByRole('heading', { name: 'The Division B sheet library' })).toBeVisible();
  await expect(
    p.getByText('grounded in the 2027 Division B rules', { exact: false }),
  ).toBeVisible();
  await p.screenshot({ path: `${out}/heredity-cheatsheet.png` });
  assert.ok(requests.some((r) => r.startsWith('/api/cheatsheets?eventId=heredity')));

  await p.goto(base + '/dashboard/student/events/meteorology/binder-generator');
  await expect(p.getByRole('heading', { name: 'Your Meteorology study binder.' })).toBeVisible();
  await expect(p.getByText('Division B binders from every school.')).toBeVisible();
  await p.screenshot({ path: `${out}/meteorology-binder.png` });
  assert.ok(
    requests.some(
      (r) =>
        r.includes('/api/binders?') &&
        r.includes('eventId=meteorology') &&
        r.includes('division=B'),
    ),
  );

  assert.deepEqual(errors, []);
  console.log('Division B browser check passed. Screenshots in', out);
} finally {
  await browser.close();
}
