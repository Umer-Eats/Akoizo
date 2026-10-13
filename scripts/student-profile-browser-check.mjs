import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import { studentDirectory, studentRankedProfile } from '../src/lib/student-profile-service.ts';
import { communityFor } from '../src/lib/community-service.ts';
import { dashboardFor } from '../src/lib/school-service.ts';

// Isolated browser fixtures; no real accounts, student data, or database writes.
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3006';
const output = 'output/student-profile-qa';
await mkdir(output, { recursive: true });
const raw = new DatabaseSync(':memory:');
for (const sql of schema) raw.exec(sql);
for (const s of eventSeeds) raw.prepare(s.sql).run(...s.args);
for (const id of ['one', 'two'])
  raw
    .prepare('INSERT INTO schools(id,name,password_hash) VALUES (?,?,?)')
    .run(id, id === 'one' ? 'North Academy' : 'Orbit Academy', 'fixture');
for (let i = 0; i < 27; i++) {
  const id = `student-${i}`;
  raw
    .prepare(
      'INSERT INTO users(id,firebase_uid,email,display_name,role,school_id,division) VALUES (?,?,?,?,?,?,?)',
    )
    .run(
      id,
      id,
      `${id}@example.test`,
      i === 1 ? 'Maya Rivera' : `Student${i} Chen`,
      'student',
      i === 0 ? 'one' : 'two',
      'C',
    );
  const count = i === 0 ? 0 : i === 1 ? 50 : 8;
  for (let n = 0; n < count; n++) {
    const points = i === 1 ? 100 : Math.min(100, 10 + i * 4);
    raw
      .prepare(
        'INSERT INTO test_attempts(id,student_id,event_id,type,score,max_score,points_awarded,started_at,completed_at) VALUES (?,?,?,?,?,?,?,?,?)',
      )
      .run(
        `${id}-${n}`,
        id,
        eventSeeds.find((s) => s.args[2] === 'C').args[0],
        'Ranked',
        points,
        100,
        points,
        new Date(Date.now() - (count - n + 1) * 60000).toISOString(),
        new Date(Date.now() - (count - n) * 60000).toISOString(),
      );
  }
}
const db = {
  all: async (sql, ...args) => raw.prepare(sql).all(...args),
  get: async (sql, ...args) => raw.prepare(sql).get(...args),
};
const profile = {
  id: 'student-0',
  role: 'student',
  displayName: 'Student0 Chen',
  schoolId: 'one',
  schoolName: 'North Academy',
  schoolCommunityId: null,
  schoolCommunityName: null,
  division: 'C',
};
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  const part = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
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
    const url = new URL(route.request().url());
    try {
      let body;
      if (url.pathname === '/api/auth/profile') body = profile;
      else if (url.pathname === '/api/community') body = await communityFor(db, profile);
      else if (url.pathname === '/api/dashboard') body = await dashboardFor(db, profile);
      else if (url.pathname === '/api/students')
        body = await studentDirectory(db, profile, url.searchParams);
      else if (url.pathname.startsWith('/api/students/'))
        body = await studentRankedProfile(db, profile, url.pathname.split('/').at(-1));
      else body = [];
      await route.fulfill({ json: body });
    } catch (error) {
      await route.fulfill({ status: error.status || 500, json: { error: error.message } });
    }
  });
  await page.goto(`${base}/login/student`);
  await page.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await page.getByLabel('Password', { exact: true }).fill('qa-browser-only-password');
  await page.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard\/student$/);
  await page.goto(`${base}/community`);
  await page.getByRole('tab', { name: 'Across communities' }).click();
  await expect(page.locator('.ranked-student-card')).toHaveCount(24);
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.locator('.ranked-student-card')).toHaveCount(3);
  await page.getByRole('button', { name: 'Previous', exact: true }).click();
  await page.getByLabel('Search students or communities', { exact: true }).fill('Maya');
  await expect(page.locator('.ranked-student-card')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Maya R.' })).toBeVisible();
  async function fits(name) {
    for (const theme of ['dark', 'light']) {
      await page.evaluate((value) => (document.documentElement.dataset.theme = value), theme);
      for (const width of [1440, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        assert.equal(
          await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
          false,
          `${name}/${theme}/${width} overflows`,
        );
        await page.screenshot({ path: `${output}/${name}-${theme}-${width}.png`, fullPage: true });
      }
    }
  }
  await fits('directory');
  await page.locator('.ranked-student-card').click();
  await expect(page).toHaveURL(/\/students\/student-1$/);
  await expect(page.getByRole('heading', { name: 'Maya R.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Radiant', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Ranked rating', exact: true }).click();
  await expect(page.getByRole('img', { name: /Ranked rating over/ })).toBeVisible();
  await page.getByText('How Akoizo ranks work', { exact: true }).click();
  await expect(page.locator('.ranked-badge-gallery > div')).toHaveCount(9);
  await fits('profile');
  await page.goto(`${base}/students/student-0`);
  await expect(page.getByRole('heading', { name: 'Unranked', exact: true })).toBeVisible();
  await expect(page.getByText('No released ranked tests yet.', { exact: true })).toBeVisible();
  await fits('unranked');
  await page.goto(`${base}/students/missing`);
  await expect(page.getByRole('alert')).toHaveText('Student profile not found.');
  assert.deepEqual(errors, []);
  console.log(
    'PASS: cross-community cards, pagination, search, profile navigation, Radiant, chart controls, all nine badges, empty/error states, light/dark layout at 1440/390/320px; no browser errors.',
  );
} finally {
  await browser.close();
  raw.close();
}
