import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { attendanceFixture, workshopInput } from '../tests/helpers/attendance-db.ts';
import {
  attendanceFor,
  checkIn,
  createWorkshop,
  manageWorkshop,
} from '../src/lib/attendance-service.ts';

// Mock authentication and external address lookup; exercise the real attendance service over SQLite.
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3006';
const out = 'output/attendance-qa';
await mkdir(out, { recursive: true });
const f = attendanceFixture();
const current = await createWorkshop(f.db, f.teacher, {
  ...workshopInput(),
  title: 'Saturday build workshop',
});
await createWorkshop(f.db, f.teacher, {
  ...workshopInput(),
  title: 'Astronomy field workshop',
  opensAt: new Date(Date.now() + 86400000).toISOString(),
  closesAt: new Date(Date.now() + 90000000).toISOString(),
});
const past = await createWorkshop(f.db, f.teacher, {
  ...workshopInput(),
  title: 'Team practice & preparation',
});
f.raw
  .prepare('UPDATE attendance_workshops SET opens_at=?,closes_at=? WHERE id=?')
  .run(
    new Date(Date.now() - 90000000).toISOString(),
    new Date(Date.now() - 86400000).toISOString(),
    past.id,
  );
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
async function session(profile) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
    permissions: ['geolocation'],
    geolocation: { latitude: 26, longitude: -80, accuracy: 10 },
  });
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  const part = (v) => Buffer.from(JSON.stringify(v)).toString('base64url');
  const token = `${part({ alg: 'none' })}.${part({ sub: profile.id, user_id: profile.id, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 3600, aud: 'qa', iss: 'https://securetoken.google.com/qa', firebase: { sign_in_provider: 'password' } })}.signature`;
  const user = { localId: profile.id, email: 'qa@example.test' };
  await page.route('https://identitytoolkit.googleapis.com/**', (route) =>
    route.fulfill({
      json: route.request().url().includes('signInWithPassword')
        ? {
            ...user,
            idToken: token,
            refreshToken: 'qa-refresh',
            expiresIn: '3600',
            registered: true,
          }
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
  await page.route('**/api/**', async (route) => {
    const path = new URL(route.request().url()).pathname,
      method = route.request().method();
    try {
      let json = {};
      if (path === '/api/auth/profile') json = profile;
      else if (path === '/api/event-selections') json = [];
      else if (path === '/api/presence') {
        f.raw
          .prepare('INSERT OR REPLACE INTO member_presence (user_id,last_seen) VALUES (?,?)')
          .run(profile.id, Date.now());
        json = { ok: true };
      } else if (path === '/api/dashboard')
        json = {
          profile,
          stats: { lessons: 0, practice: 0, ranked: 0, points: 0 },
          students: [],
          assignments: [],
          progress: [],
          selections: {},
          eventProgress: [],
        };
      else if (path === '/api/attendance/locations')
        json = {
          results: [{ name: 'Science Building, 123 School Lane', latitude: 26, longitude: -80 }],
        };
      else if (path === '/api/attendance') {
        const body = method === 'GET' ? null : route.request().postDataJSON();
        json =
          method === 'GET'
            ? await attendanceFor(f.db, profile)
            : method === 'PATCH'
              ? await manageWorkshop(f.db, profile, body)
              : profile.role === 'instructor'
                ? await createWorkshop(f.db, profile, body)
                : await checkIn(f.db, profile, body);
      }
      await route.fulfill({ json });
    } catch (e) {
      await route.fulfill({ status: e.status || 500, json: { error: e.message } });
    }
  });
  await page.goto(`${base}/login/${profile.role}`);
  await page.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await page.getByLabel('Password', { exact: true }).fill('qa-browser-only-password');
  await page.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`/dashboard/${profile.role}$`), { timeout: 30000 });
  await page.goto(`${base}/attendance`);
  await expect(page.getByRole('heading', { name: 'Show up. Move forward.' })).toBeVisible({
    timeout: 30000,
  });
  await expect(page.locator('.att-day')).toHaveCount(
    (await attendanceFor(f.db, profile)).workshops.length,
  );
  return { context, page };
}
async function fits(page, name) {
  for (const theme of ['dark', 'light']) {
    await page.evaluate((t) => (document.documentElement.dataset.theme = t), theme);
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > innerWidth + 1
          ? [...document.querySelectorAll('body *')]
              .filter((e) => e.getBoundingClientRect().right > innerWidth + 1)
              .slice(0, 12)
              .map(
                (e) =>
                  `${e.tagName}.${e.className}: ${Math.round(e.getBoundingClientRect().right)}`,
              )
          : [],
      );
      assert.deepEqual(overflow, [], `${name} ${theme} ${width} overflow`);
      if (width === 1440 || width === 390)
        await page.screenshot({ path: `${out}/${name}-${theme}-${width}.png`, fullPage: true });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
}
try {
  const teacher = await session(f.teacher);
  await fits(teacher.page, 'teacher-workshops');
  await teacher.page.getByRole('tab', { name: 'Student analytics' }).click();
  await expect(teacher.page.getByRole('cell', { name: /Sam Patel/ })).toBeVisible();
  await fits(teacher.page, 'teacher-analytics');
  const download = teacher.page.waitForEvent('download');
  await teacher.page.getByRole('button', { name: 'Export attendance' }).click();
  assert.equal((await download).suggestedFilename(), 'workshop-attendance.csv');
  await teacher.page.getByRole('tab', { name: 'Online now' }).click();
  await expect(teacher.page.locator('.att-online-person').getByText('Jordan Rivera')).toBeVisible();
  await teacher.page.getByRole('button', { name: 'New workshop', exact: true }).click();
  await teacher.page.getByLabel('Workshop name', { exact: true }).fill('Chemistry lab day');
  await teacher.page.getByRole('button', { name: 'Workshop location', exact: true }).click();
  await expect(teacher.page.locator('.leaflet-container')).toBeVisible();
  await teacher.page.getByLabel('Search workshop address').fill('123 School Lane');
  await teacher.page
    .locator('.att-address-search')
    .getByRole('button', { name: 'Search', exact: true })
    .click();
  await teacher.page.locator('.att-map-results').getByRole('button').click();
  await expect(teacher.page.getByLabel('Location name', { exact: true })).toHaveValue(
    'Science Building, 123 School Lane',
  );
  await teacher.page.setViewportSize({ width: 390, height: 900 });
  await teacher.page.screenshot({ path: `${out}/map-mobile.png`, fullPage: true });
  await teacher.page.getByRole('button', { name: 'Use this location' }).click();
  await teacher.page.getByRole('button', { name: 'Create workshop', exact: true }).click();
  await expect(teacher.page.locator('.att-dialog')).toHaveCount(0);
  await teacher.page.getByRole('tab', { name: 'Workshops', exact: true }).click();
  await expect(teacher.page.locator('.att-day')).toHaveCount(4);
  await teacher.page.setViewportSize({ width: 1440, height: 1000 });
  const student = await session(f.student);
  await fits(student.page, 'student-checkin');
  const code = String(
    f.raw.prepare('SELECT code FROM attendance_workshops WHERE id=?').get(current.id).code,
  );
  await student.page.getByLabel('Enter your workshop code').fill('WRONG123');
  await student.page.getByRole('button', { name: 'Check in with location' }).click();
  await expect(student.page.locator('.att-error')).toContainText('code did not match');
  await student.page.getByLabel('Enter your workshop code').fill(code);
  await student.context.setGeolocation({ latitude: 27, longitude: -80, accuracy: 10 });
  await student.page.getByRole('button', { name: 'Check in with location' }).click();
  await expect(student.page.locator('.att-error')).toContainText('0.5 mile');
  await student.context.setGeolocation({ latitude: 26, longitude: -80, accuracy: 10 });
  await student.page.getByRole('button', { name: 'Check in with location' }).click();
  await expect(student.page.getByRole('heading', { name: 'You showed up.' })).toBeVisible();
  await student.page.screenshot({ path: `${out}/student-checked-in.png`, fullPage: true });
  await teacher.page.goto(`${base}/dashboard/instructor`);
  await teacher.page
    .getByRole('navigation', { name: 'Instructor sections' })
    .getByRole('button', { name: 'Attendance' })
    .click();
  await expect(teacher.page.locator('.attendance-embedded')).toBeVisible();
  await fits(teacher.page, 'teacher-dashboard');
  await student.context.close();
  await teacher.context.close();
  assert.deepEqual(errors, []);
  console.log(
    'PASS: teacher/student attendance, real service persistence, address search and map popup, workshop creation, CSV export, presence, wrong-code rejection, browser geolocation, check-in, two themes and four viewport sizes.',
  );
} finally {
  await browser.close();
  f.raw.close();
}
