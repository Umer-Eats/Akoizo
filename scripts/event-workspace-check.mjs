import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
const rulePages = JSON.parse(
  await readFile(new URL('../src/lib/event-rule-pages.json', import.meta.url), 'utf8'),
);
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3002';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
await mkdir('documents/qa/event-workspace', { recursive: true });
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
  await expect(p).toHaveURL(/\/anatomy-and-physiology\/lessons$/);
  await expect(p.getByRole('heading', { name: 'Lessons', exact: true })).toBeVisible();
  await expect(p.locator('.header-event-title')).toHaveText('Anatomy and Physiology');
  const names = [
    'Lessons',
    'Practice Tests',
    'Ranked Tests',
    'Practice Question Bank',
    'Vocab Rush',
    'Cheatsheet Generator',
    'Rules',
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
    await expect(p.locator('.event-feature-link')).toHaveCount(names.length);
  }
  await expect(p.locator('.event-feature-title')).toHaveText('RulesPDF Pages 8–10');
  await expect(p.getByText('Official event rules.', { exact: true })).toHaveCount(0);
  await expect(p.getByText('Competition resources', { exact: true })).toHaveCount(0);
  await expect(p.locator('.rules-embed')).toHaveAttribute(
    'src',
    '/rules/2027/c/anatomy-and-physiology.pdf#view=FitH',
  );
  const title = await p.getByRole('heading', { name: 'Rules', exact: true }).boundingBox();
  const pages = await p.locator('.rules-page-range').boundingBox();
  assert(pages.x > title.x + title.width, 'PDF page range is beside Rules');
  assert(Math.abs(pages.y - title.y) < title.height, 'PDF page range shares the title row');
  const pdf = await p.locator('.rules-embed').boundingBox();
  const heading = await p.locator('.event-feature-heading').boundingBox();
  assert(
    pdf.y - (heading.y + heading.height) < 40,
    'PDF follows the header without an introductory block',
  );
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
      assert(sidebar.x + sidebar.width <= content.x, 'sidebar remains on the left');
      assert.equal(
        await p.locator('.event-content').evaluate((el) => getComputedStyle(el).animationName),
        'none',
      );
      await p.screenshot({
        path: `documents/qa/event-workspace/${theme}-${width}.png`,
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
  await p.setViewportSize({ width: 1440, height: 1000 });
  for (const division of ['A', 'B', 'C']) {
    profile.division = division;
    await p.goto(base + '/dashboard/student');
    await expect(p.locator('.event-card-link')).toHaveCount(division === 'A' ? 17 : 23);
    for (const href of await p
      .locator('.event-card-link')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')))) {
      assert(href.endsWith('/lessons'), `Event card opens Lessons: ${href}`);
    }
    const eventId = division === 'A' ? 'professor-jensens-potions' : 'anatomy-and-physiology';
    await p
      .locator(`.event-card-link[href="/dashboard/student/events/${eventId}/lessons"]`)
      .click();
    await expect(p.getByRole('heading', { name: 'Lessons', exact: true })).toBeVisible();
    await expect(p.locator('.event-feature-link[aria-current="page"]')).toHaveAccessibleName(
      'Lessons',
    );
    await p
      .getByRole('navigation', { name: 'Event features' })
      .getByRole('link', { name: 'Rules', exact: true })
      .click();
    await expect(p.locator('.rules-embed')).toHaveAttribute(
      'src',
      `/rules/2027/${division.toLowerCase()}/${eventId}.pdf#view=FitH`,
    );
    for (const id of Object.keys(rulePages[division])) {
      const url = `/rules/2027/${division.toLowerCase()}/${id}.pdf`;
      const response = await p.request.get(base + url);
      assert.equal(response.status(), 200, url);
      assert.match(response.headers()['content-type'], /application\/pdf/);
      assert.equal(response.headers()['x-frame-options'], 'SAMEORIGIN');
      assert.equal((await response.body()).subarray(0, 5).toString(), '%PDF-');
    }
    const manual = await p.request.get(base + `/rules/2027/division-${division.toLowerCase()}.pdf`);
    assert.equal(manual.status(), 200);
    assert.match(manual.headers()['content-type'], /application\/pdf/);
  }
  await p.goto(base + '/dashboard/student/events/anatomy-and-physiology/bad-feature');
  await expect(p.getByRole('heading', { name: 'That page isn’t in your division.' })).toBeVisible();
  assert.deepEqual(errors, []);
  console.log(
    'PASS: 63 local event PDFs, 3 complete manuals, Lessons card destinations in all divisions, legacy redirect, compact Rules header, seven feature routes, dark/light layouts at 1440/768/390/320, reduced motion and invalid route. Authentication/API mocked.',
  );
} catch (error) {
  await p.screenshot({ path: 'documents/qa/event-workspace/failure.png', fullPage: true });
  console.error('Browser errors:', errors);
  throw error;
} finally {
  await browser.close();
}
