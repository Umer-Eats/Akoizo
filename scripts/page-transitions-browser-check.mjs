import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

// Drives real navigations with motion on and records each browser view transition:
// which kind html[data-nav] chose and which keyframes ran on the old and new screens.
// Sign-in and the API are mocked, so nothing touches live accounts or the database.
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3006';
const out = 'documents/qa/page-transitions';
await mkdir(out, { recursive: true });

const profile = {
  id: 'qa-student',
  role: 'student',
  displayName: 'Ada Chen',
  schoolId: 'school',
  schoolName: 'School',
  schoolCommunityId: null,
  schoolCommunityName: null,
  division: 'C',
};

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const errors = [];
process.on('exit', (code) => code && errors.length && console.error('Page errors:', errors));
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
  if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text());
  else if (/view.transition/i.test(m.text())) errors.push(m.text());
});

await page.addInitScript(() => {
  window.__vt = [];
  const start = document.startViewTransition?.bind(document);
  if (!start) return;
  document.startViewTransition = (arg) => {
    const transition = start(arg);
    const record = { from: location.pathname };
    window.__vt.push(record);
    transition.ready
      .then(() => {
        const chrome = [
          'root',
          'site-nav',
          'nav-glide',
          'ako',
          'notes-dock',
          'notes-dock-tab',
          'nav-progress',
        ];
        const animations = document.getAnimations().filter((a) => a.effect?.pseudoElement);
        const parse = (a) => a.effect.pseudoElement.match(/^::view-transition-([a-z-]+)\((.+)\)$/);
        record.nav = document.documentElement.dataset.nav;
        // The page layers are the old/new images with React's generated names.
        record.animations = animations
          .map((a) => [parse(a), a.animationName])
          .filter(([m]) => m && ['old', 'new'].includes(m[1]) && !chrome.includes(m[2]))
          // The login card and art have their own layers; label them by name.
          .map(([m, name]) => `${m[1]}${m[2].startsWith('auth-') ? `(${m[2]})` : ''} ${name}`);
        record.names = animations.map((a) => parse(a)?.[2]);
      })
      .catch((e) => (record.error = String(e)));
    transition.finished.then(() => (record.finished = true)).catch(() => {});
    return transition;
  };
});

const part = (v) => Buffer.from(JSON.stringify(v)).toString('base64url');
const now = Math.floor(Date.now() / 1000);
const token = `${part({ alg: 'none' })}.${part({ sub: profile.id, user_id: profile.id, iat: now, exp: now + 3600, aud: 'qa', iss: 'https://securetoken.google.com/qa', firebase: { sign_in_provider: 'password' } })}.signature`;
const user = { localId: profile.id, email: 'qa@example.test' };
await page.route('https://identitytoolkit.googleapis.com/**', (route) =>
  route.fulfill({
    json: route.request().url().includes('signInWithPassword')
      ? { ...user, idToken: token, refreshToken: 'qa-refresh', expiresIn: '3600', registered: true }
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
await page.route('**/api/**', (route) => {
  const path = new URL(route.request().url()).pathname;
  let json = {};
  if (path === '/api/auth/profile') json = profile;
  else if (path === '/api/event-selections') json = [];
  else if (path === '/api/dashboard')
    json = {
      profile,
      stats: { lessons: 0, practice: 0, ranked: 0, points: 0 },
      students: [],
      assignments: [],
      progress: [],
      selections: {},
      eventProgress: [],
    };
  else if (path === '/api/attendance')
    json = { workshops: [], members: [], records: [], serverTime: new Date().toISOString() };
  return route.fulfill({ json });
});

/** Click, wait for the new route, and return the transition it produced. */
async function go(name, click, url, kind, frames) {
  const before = await page.evaluate(() => window.__vt.length);
  await click();
  await expect(page).toHaveURL(url, { timeout: 60000 });
  await page.waitForFunction((n) => window.__vt.length > n && window.__vt.at(-1).nav, before, {
    timeout: 15000,
  });
  // Mid-flight frame, for eyeballing the motion.
  await page.waitForTimeout(180);
  await page.screenshot({ path: `${out}/${name}-mid.png` });
  await page.waitForFunction(() => window.__vt.at(-1).finished, null, { timeout: 5000 });
  const record = await page.evaluate(() => window.__vt.at(-1));
  assert.equal(record.error, undefined, `${name}: ${record.error}`);
  assert.equal(record.nav, kind, `${name} kind`);
  for (const frame of frames)
    assert.ok(
      record.animations.includes(frame),
      `${name}: missing ${frame} in ${record.animations}`,
    );
  assert.ok(record.names.includes('site-nav'), `${name}: nav bar was not held in place`);
  await page.waitForFunction(() => !document.documentElement.dataset.nav, null, { timeout: 3000 });
  console.log(`ok  ${name.padEnd(24)} ${kind.padEnd(9)} ${record.animations.join(', ')}`);
  return record;
}

const nav = (label) => () =>
  page.locator('.lx-nav-links').getByRole('link', { name: label, exact: true }).click();

await page.goto(`${base}/`);
await page.waitForLoadState('networkidle');
await go('home-to-mission', nav('Mission'), /\/mission$/, 'next', [
  'old vt-slide-out-left',
  'new vt-slide-in-right',
]);
assert.equal(await page.locator('.lx-nav-links a[aria-current="page"] .lx-nav-glide').count(), 1);
const glide = await go('mission-to-study-tools', nav('Study tools'), /\/study-tools$/, 'prev', [
  'old vt-slide-out-right',
  'new vt-slide-in-left',
]);
assert.ok(glide.names.includes('nav-glide'), 'nav underline should glide between links');
await go(
  'study-tools-to-event',
  () => page.locator('main a[href^="/study-tools/"]').first().click(),
  /\/study-tools\/[^/]+\/[^/]+$/,
  'forward',
  ['old vt-sink', 'new vt-rise-in'],
);
await go('event-up-to-study-tools', nav('Study tools'), /\/study-tools$/, 'back', [
  'old vt-drop-out',
  'new vt-settle-in',
]);
// Browser back/forward: React commits popstate synchronously (so scroll restores), which
// skips the view transition. It must still navigate cleanly.
await page.goBack();
await expect(page).toHaveURL(/\/study-tools\/[^/]+\/[^/]+$/, { timeout: 30000 });
await page.goForward();
await expect(page).toHaveURL(/\/study-tools$/, { timeout: 30000 });
console.log('ok  browser back/forward     navigates');

// Login pages: the card floats in, flips between roles, and drops away.
const studentLogin = () =>
  page.locator('.lx-nav').getByRole('link', { name: 'Student login', exact: true }).click();
const switchRole = () => page.locator('.auth-footer a').click();
await go('study-tools-to-login', studentLogin, /\/login\/student$/, 'auth-in', [
  'old vt-sink',
  'new(auth-art) vt-rise-in',
  'new(auth-card) vt-card-float-in',
]);
await go('student-to-instructor', switchRole, /\/login\/instructor$/, 'role-next', [
  'old(auth-card) vt-fade-out',
  'new(auth-card) vt-card-refocus',
  'old(auth-art) vt-slide-out-left',
  'new(auth-art) vt-slide-in-right',
]);
await go('instructor-to-student', switchRole, /\/login\/student$/, 'role-prev', [
  'old(auth-art) vt-slide-out-right',
  'new(auth-art) vt-slide-in-left',
]);
await go('login-to-mission', nav('Mission'), /\/mission$/, 'auth-out', [
  'old(auth-card) vt-card-drop',
  'old(auth-art) vt-sink',
  'new vt-settle-in',
]);

// A direct visit plays the login page's own entrance.
await page.goto(`${base}/login/student`);
const entrance = await page.evaluate(() =>
  document
    .querySelector('.auth-card')
    .getAnimations()
    .map((a) => a.animationName),
);
assert.ok(entrance.includes('vt-card-float-in'), `login entrance: ${entrance}`);
console.log('ok  login direct visit       card floats in');

// Log in ↔ Create account: same page, animated in place.
async function swapMode(name, label, kind, nudge) {
  const before = await page.evaluate(() => window.__vt.length);
  await page.locator('.auth-card .tabs').getByRole('button', { name: label }).click();
  await page.waitForFunction((n) => window.__vt.at(n)?.names, before, { timeout: 10000 });
  const fields = await page.evaluate(() =>
    [...document.querySelectorAll('.auth-card .auth-fields > *')].flatMap((el) =>
      el.getAnimations().map((a) => a.animationName),
    ),
  );
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${out}/${name}-mid.png` });
  await page.waitForFunction(() => window.__vt.at(-1).finished, null, { timeout: 5000 });
  const record = await page.evaluate(() => window.__vt.at(-1));
  assert.equal(record.error, undefined, `${name}: ${record.error}`);
  assert.equal(record.nav, kind, `${name} kind`);
  for (const layer of ['auth-tab', 'auth-card'])
    assert.ok(record.names.includes(layer), `${name}: ${layer} did not animate`);
  assert.ok(fields.includes(nudge), `${name}: fields did not cascade (${fields})`);
  await page.waitForFunction(() => !document.documentElement.dataset.swap, null, {
    timeout: 3000,
  });
  console.log(`ok  ${name.padEnd(24)} ${kind.padEnd(9)} tab slides, card resizes, ${nudge}`);
}
await swapMode('login-to-create', 'Create account', 'mode-signup', 'vt-nudge-from-right');
await expect(page.getByLabel('Confirm password')).toBeVisible();
await swapMode('create-to-login', 'Log in', 'mode-login', 'vt-nudge-from-left');
await expect(page.getByLabel('Confirm password')).toHaveCount(0);

// Sign in (the card launches), then move around the workspace.
await page.getByLabel('Email address', { exact: true }).fill('qa@example.test');
await page.getByLabel('Password', { exact: true }).fill('qa-browser-only-password');
await page.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
await expect(page).toHaveURL(/\/dashboard\/student$/, { timeout: 60000 });
const zoneIn = await page.waitForFunction(
  () => window.__vt.find((r) => r.nav === 'zone-in' && r.finished),
  null,
  { timeout: 15000 },
);
const launch = (await zoneIn.jsonValue()).animations;
for (const frame of ['old(auth-card) vt-card-launch', 'new vt-zoom-in'])
  assert.ok(launch.includes(frame), `login-to-dashboard: missing ${frame} in ${launch}`);
console.log(`ok  ${'login-to-dashboard'.padEnd(24)} zone-in   ${launch.join(', ')}`);
await page.waitForLoadState('networkidle');

await go(
  'dashboard-to-attendance',
  () => page.locator('.lx-nav').getByRole('link', { name: 'Attendance' }).click(),
  /\/attendance$/,
  'next',
  ['old vt-slide-out-left', 'new vt-slide-in-right'],
);
await go(
  'attendance-to-home',
  () => page.locator('.lx-nav .lx-brand').click(),
  /:\d+\/$/,
  'zone-out',
  ['old vt-dissolve-down', 'new vt-zoom-out-in'],
);

// Motion off: React may still open a transition (the page wrapper stays mounted so
// toggling motion never resets the page), but nothing in it may move.
await page.evaluate(() => localStorage.setItem('akoizo-motion', 'off'));
await page.reload();
await page.waitForLoadState('networkidle');
await nav('Mission')();
await expect(page).toHaveURL(/\/mission$/, { timeout: 60000 });
await page.waitForTimeout(400);
// React's own zero-length helpers that hide the root layer are not motion.
const still = await page.evaluate(() =>
  window.__vt.filter((r) => r.names?.some((name) => name && name !== 'root')),
);
assert.deepEqual(still, [], 'motion off must not animate');
console.log('ok  motion off               nothing moves');

console.log(errors.length ? errors : 'no page errors');
assert.deepEqual(errors, []);
await browser.close();
console.log(`Page transitions passed. Mid-flight frames in ${out}/`);
