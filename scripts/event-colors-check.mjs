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
  const astronomy = p.getByRole('checkbox', { name: 'Compete in Astronomy', exact: true });
  await expect(astronomy).toBeEnabled();
  await astronomy.click();
  await expect(p.locator('.event-card').first()).toContainText('Astronomy');
  await expect(astronomy).toBeChecked();
  await p.reload();
  await expect(astronomy).toBeChecked();
  await expect(p.locator('.event-card').first()).toContainText('Astronomy');
  await p.getByRole('textbox', { name: 'Search events' }).fill('Forensics');
  await expect(p.locator('.event-card')).toHaveCount(1);
  await p.getByRole('textbox', { name: 'Search events' }).fill('');
  failSave = true;
  await astronomy.click();
  await expect(p.locator('.form-error')).toContainText('Could not save');
  await expect(astronomy).toBeChecked();
  failSave = false;
  await astronomy.click();
  await expect(astronomy).not.toBeChecked();
  await astronomy.click();
  await expect(astronomy).toBeChecked();
  await p.getByLabel('Your division', { exact: true }).selectOption('B');
  await expect(p.locator('.selection-summary')).toContainText('0 competition events');
  await p.getByLabel('Your division', { exact: true }).selectOption('C');
  await expect(astronomy).toBeChecked();
  for (const theme of ['dark', 'light']) {
    await p.evaluate((theme) => (document.documentElement.dataset.theme = theme), theme);
    for (const width of [1440, 390, 320]) {
      await p.setViewportSize({ width, height: 1000 });
      assert.equal(
        await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
      );
      if (width !== 320)
        await p.screenshot({
          path: `output/colors-qa/dashboard-${theme}-${width}.png`,
          fullPage: true,
        });
    }
  }
  await p.setViewportSize({ width: 1440, height: 1000 });
  await p
    .locator('.event-card-link')
    .filter({ has: p.getByRole('heading', { name: 'Astronomy', exact: true }) })
    .click();
  await expect(p.locator('.event-heading')).toHaveAttribute('data-slot', 'purple');
  await expect(p.locator('.tool-card')).toHaveCount(7);
  await p.screenshot({ path: 'output/colors-qa/event-light.png', fullPage: true });
  for (const route of ['/', '/mission', '/login/student', '/rankings']) {
    await p.goto(base + route);
    await p.setViewportSize({ width: 390, height: 844 });
    assert.equal(
      await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
      route,
    );
  }
  assert.deepEqual(errors, []);
  console.log(
    'PASS: selected-first ordering, reload, filters, save failure, removal, division isolation, event navigation, two themes and mobile layouts. Authentication/API mocked; persistence covered by database tests.',
  );
} finally {
  await browser.close();
}
