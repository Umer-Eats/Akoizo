import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3002';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
await mkdir('output/colors-qa', { recursive: true });
const p = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
});
const errors = [];
p.on('pageerror', (error) => errors.push(error.message));
let profile = {
  id: 'qa-student',
  role: 'student',
  displayName: 'Ada',
  schoolId: 'qa-school',
  schoolName: 'Science Team',
  schoolCommunityName: 'Science Team',
  schoolCommunityId: 'ppchs',
  division: 'C',
};
const payload = Buffer.from(
  JSON.stringify({
    sub: 'qa-student',
    user_id: 'qa-student',
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
          localId: 'qa-student',
          email: 'qa@example.test',
          idToken: token,
          refreshToken: 'qa-refresh',
          expiresIn: '3600',
          registered: true,
        }
      : {
          users: [
            {
              localId: 'qa-student',
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
const selections = { A: [], B: [], C: [] };
let failSave = false;
await p.route('**/api/**', async (route) => {
  const url = new URL(route.request().url()),
    method = route.request().method();
  if (url.pathname === '/api/auth/profile') {
    if (method === 'PATCH') profile.division = route.request().postDataJSON().division;
    return route.fulfill({ json: profile });
  }
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
  if (url.pathname === '/api/event-selections') {
    if (method === 'PATCH') {
      if (failSave)
        return route.fulfill({ status: 503, json: { error: 'Could not save. Try again.' } });
      const { division, eventId, selected } = route.request().postDataJSON();
      selections[division] = selections[division].filter((id) => id !== eventId);
      if (selected) selections[division].push(eventId);
      return route.fulfill({ json: selections[division] });
    }
    return route.fulfill({ json: selections[url.searchParams.get('division')] });
  }
  return route.fulfill({ json: [] });
});
try {
  await p.goto(base + '/login/student');
  await p.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await p.getByLabel('Password', { exact: true }).fill('qa-test-password');
  await p.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(
    p.getByRole('checkbox', { name: 'Compete in Astronomy', exact: true }),
  ).toBeEnabled();
  await p.goto(base + '/dashboard/student/events/anatomy-and-physiology');
  await expect(p.locator('.header-event-title')).toHaveText('Anatomy and Physiology');
  const names = [
    'Lessons',
    'Practice tests',
    'Ranked tests',
    'Practice question bank',
    'Vocab rush',
    'Notes / binder generator',
    'Cheatsheet generator',
  ];
  for (const name of names) {
    await p
      .getByRole('navigation', { name: 'Event features' })
      .getByRole('link', { name, exact: true })
      .click();
    await expect(p.getByRole('heading', { name, exact: true })).toBeVisible();
    await expect(p.locator('.event-feature-link[aria-current="page"]')).toHaveText(
      new RegExp(name.replace('/', '\\/')),
    );
    await expect(p.locator('.header-event-title')).toHaveText('Anatomy and Physiology');
    await expect(p.locator('.event-feature-link')).toHaveCount(7);
  }
  await mkdir('output/event-workspace-qa', { recursive: true });
  for (const theme of ['dark', 'light']) {
    await p.evaluate((theme) => (document.documentElement.dataset.theme = theme), theme);
    for (const width of [1440, 768, 390, 320]) {
      await p.setViewportSize({ width, height: 1000 });
      assert.equal(
        await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        `${theme} ${width}`,
      );
      const content = await p.locator('.event-content').boundingBox();
      const sidebar = await p.locator('.event-sidebar').boundingBox();
      assert(sidebar.x >= content.x + content.width, 'sidebar remains on the right');
      assert.equal(
        await p.locator('.event-content').evaluate((el) => getComputedStyle(el).animationName),
        'none',
      );
      await p.screenshot({
        path: `output/event-workspace-qa/${theme}-${width}.png`,
        fullPage: true,
      });
    }
  }
  await p.emulateMedia({ reducedMotion: 'no-preference' });
  await p.evaluate(() => (document.documentElement.dataset.motion = 'on'));
  assert.equal(
    await p.locator('.event-content').evaluate((el) => getComputedStyle(el).animationName),
    'event-content-enter',
  );
  await p.goto(base + '/dashboard/student/events/anatomy-and-physiology/bad-feature');
  await expect(p.getByRole('heading', { name: 'That page isn’t in your division.' })).toBeVisible();
  assert.deepEqual(errors, []);
  console.log(
    'PASS: all seven feature routes, persistent title/sidebar, active state, dark/light layouts at 1440/768/390/320, reduced motion and invalid route. Authentication/API mocked.',
  );
} finally {
  await browser.close();
}
