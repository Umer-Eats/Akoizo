import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
const rulePages = JSON.parse(
  await readFile(new URL('../src/lib/event-rule-pages.json', import.meta.url), 'utf8'),
);
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3002';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
await mkdir('output/lab-qa', { recursive: true });
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
  const cases = [
    ['chemistry-lab', 'lab-practice', ['Follow a fading dye', 'Calibrate the spectrophotometer']],
    ['circuit-lab', 'lab-practice', ['Measure a resistor network', 'Balance a Wheatstone bridge']],
    ['forensics', 'lab-practice', ['Compare an ink trace']],
    ['water-quality', 'lab-practice', ['Calibrate a straw salinometer', 'Run a five-day BOD test']],
    ['experimental-design', 'lab-generator', ['Design an absorption experiment']],
  ];
  for (const [event, tool, labs] of cases) {
    await p.goto(`${base}/dashboard/student/events/${event}/${tool}`);
    await expect(p.locator('.archive-labs')).toBeVisible();
    for (const title of labs) {
      await p.getByRole('button', { name: new RegExp(title) }).click();
      await expect(p.getByRole('heading', { name: title, exact: true })).toBeVisible();
      await p
        .getByLabel('Your hypothesis', { exact: true })
        .fill('Changing one variable will change the reading.');
      const before = await p.locator('.archive-readings').innerText();
      const slider = p.locator('.archive-controls input[type=range]').first();
      await slider.focus();
      await slider.press('ArrowRight');
      assert.notEqual(
        await p.locator('.archive-readings').innerText(),
        before,
        `${title}: controls update readings`,
      );
      await p.getByRole('button', { name: 'Record measurement', exact: true }).click();
      await expect(p.locator('.archive-notebook tbody tr')).toHaveCount(1);
      await p.getByRole('button', { name: 'Check answer', exact: true }).click();
      await expect(p.locator('.archive-feedback')).toBeVisible();
      if (title === 'Follow a fading dye') {
        await p.getByLabel('Calculated answer (s⁻¹)', { exact: true }).fill('0.012');
        await p.getByRole('button', { name: 'Check answer', exact: true }).click();
        await expect(p.locator('.archive-feedback')).toContainText('Correct');
        await p.getByLabel('Plot transformation').selectOption('ln(A)');
        await expect(p.getByRole('img', { name: /ln\(A\) against/ })).toBeVisible();
      }
      if (title === 'Balance a Wheatstone bridge') {
        const r3 = p.getByRole('slider', { name: 'Upper right R₃', exact: true });
        await r3.focus();
        await r3.press('Home');
        for (let n = 0; n < 15; n++) await r3.press('ArrowRight');
        // First slider was raised from 6 to 7 V; the null is still at R3 = 100 ohms.
        await p.getByLabel('Calculated answer (Ω)', { exact: true }).fill('100');
        await p.getByRole('button', { name: 'Check answer', exact: true }).click();
        await expect(p.locator('.archive-feedback')).toContainText('Correct');
      }
      await p.getByRole('button', { name: 'Reset controls', exact: true }).click();
      await expect(p.locator('.archive-notebook tbody tr')).toHaveCount(1);
      const downloadPromise = p.waitForEvent('download');
      await p.getByRole('button', { name: 'Export notebook', exact: true }).click();
      const download = await downloadPromise;
      assert.match(download.suggestedFilename(), /-notebook.json$/);
    }
    await p.getByRole('button', { name: /PhET simulations/ }).click();
    await p.getByRole('button', { name: 'Launch PhET simulation', exact: true }).click();
    await expect(p.locator('.archive-phet iframe')).toHaveAttribute(
      'src',
      /https:\/\/phet.colorado.edu\/sims\/html\//,
    );
    const phetUrl = await p.locator('.archive-phet iframe').getAttribute('src');
    assert.equal(
      await p.getByRole('link', { name: 'Open in a new tab' }).getAttribute('href'),
      phetUrl,
    );
    await p.getByRole('button', { name: 'Archive labs', exact: true }).click();
    await expect(p.locator('.archive-notebook tbody tr')).toHaveCount(1);
    await p.reload();
    await expect(p.locator('.archive-notebook tbody tr')).toHaveCount(1);
    await expect(p.getByLabel('Your hypothesis', { exact: true })).toHaveValue(
      'Changing one variable will change the reading.',
    );
    for (const width of [1440, 390]) {
      await p.setViewportSize({ width, height: 1000 });
      assert.ok(
        await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
        `${event}: overflow at ${width}`,
      );
      await p.screenshot({ path: `output/lab-qa/${event}-${width}.png`, fullPage: true });
    }
    await p.setViewportSize({ width: 1440, height: 1000 });
  }
  profile.division = 'B';
  await p.goto(`${base}/dashboard/student/events/circuit-lab/lab-practice`);
  await expect(p.locator('.archive-overview')).toContainText('DIVISION B / VIRTUAL LABS');
  await expect(p.locator('.archive-lab-picker button')).toHaveCount(1);
  profile.division = 'A';
  await p.goto(`${base}/dashboard/student/events/crimebusters/lab-practice`);
  await expect(p.getByText('COMING SOON', { exact: true })).toBeVisible();
  await expect(p.locator('.archive-labs')).toHaveCount(0);
  assert.deepEqual(errors, []);
  console.log(
    'PASS: all 8 archive labs across 5 C tabs; live readings, calculation checks, reset, persistence, notebook export, PhET launch URLs, desktop/mobile layout, Division B labs, and Division A isolation. Auth/API mocked; PhET network content is external.',
  );
} catch (error) {
  await p.screenshot({ path: 'output/lab-qa/failure.png', fullPage: true });
  console.error('Browser errors:', errors);
  throw error;
} finally {
  await browser.close();
}
