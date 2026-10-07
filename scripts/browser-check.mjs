import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3002';
const live = process.argv.includes('--live');
await mkdir('documents/qa', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
const contexts = [];
const emails = [];
let admin;
let db;
const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
const password = `Qa-${crypto.randomUUID()}-7a`;
async function newPage() {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  });
  contexts.push(context);
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(error.message));
  return page;
}
async function layout(page, name) {
  for (const mode of ['dark', 'light']) {
    await page.evaluate((mode) => (document.documentElement.dataset.theme = mode), mode);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        `${name}: overflow at ${width} in ${mode}`,
      );
      if (width !== 320)
        await page.screenshot({
          path: `documents/qa/live-${name}-${mode}-${width}.png`,
          fullPage: true,
          mask: [page.getByLabel('Student joining password')],
        });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
}
async function signUp(page, role, name, extra) {
  const email = `akoizo-qa-${stamp}-${name.toLowerCase()}@example.com`;
  emails.push(email);
  await page.goto(`${base}/login/${role}`);
  await page.getByRole('button', { name: 'Create account', exact: true }).click();
  await page.getByLabel('Display name', { exact: true }).fill(name);
  await page.getByLabel('Email address', { exact: true }).fill(email);
  await page.getByLabel('Password', { exact: true }).fill(password);
  await page.getByLabel('Confirm password', { exact: true }).fill(password);
  if (role === 'student') {
    await page.getByLabel('Your division', { exact: true }).selectOption(extra.division);
    await page.getByLabel('School password', { exact: true }).fill(extra.schoolPassword);
  } else
    await page.getByLabel('Instructor invitation password', { exact: true }).fill(extra.invite);
  await page.locator('form').getByRole('button', { name: 'Create account', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`/dashboard/${role}$`), { timeout: 30000 });
  await expect(page.locator('.dashboard-heading')).toBeVisible({ timeout: 30000 });
  return email;
}
try {
  const page = await newPage();
  for (const route of ['/', '/mission', '/rankings', '/login/student', '/login/instructor']) {
    await page.goto(base + route);
    if (route === '/rankings')
      await expect(
        page.getByRole('heading', { name: 'The first chapter is still to come.' }),
      ).toBeVisible({ timeout: 15000 });
    await expect(page.locator('main')).toHaveCount(1);
    assert.equal(await page.locator('a[href*="/preview/"]').count(), 0);
    await layout(page, route.slice(1).replaceAll('/', '-') || 'home');
  }
  for (const route of [
    '/dashboard/student',
    '/dashboard/instructor',
    '/dashboard/student/events/astronomy/lessons',
  ]) {
    await page.goto(base + route);
    await expect(page).toHaveURL(/\/login\/(student|instructor)$/, { timeout: 15000 });
  }
  for (const route of [
    '/preview/student',
    '/preview/instructor',
    '/preview/student/events/astronomy',
  ]) {
    const response = await page.goto(base + route);
    assert.equal(response.status(), 404);
  }
  for (const route of ['/api/auth/profile', '/api/dashboard'])
    assert.equal((await page.request.get(base + route)).status(), 401);
  assert.equal((await page.request.post(base + '/api/assignments', { data: {} })).status(), 401);
  assert.equal(
    (
      await page.request.get(base + '/api/dashboard', {
        headers: { Authorization: 'Bearer not-a-token' },
      })
    ).status(),
    401,
  );
  await page.goto(base + '/login/student');
  await page.getByRole('button', { name: 'Create account', exact: true }).click();
  await expect(page.getByLabel('School password', { exact: true })).toBeEnabled();
  assert.deepEqual(
    await page
      .getByLabel('Your division', { exact: true })
      .locator('option')
      .evaluateAll((els) => els.map((el) => el.value)),
    ['A', 'B', 'C'],
  );
  if (!live) {
    console.log(
      'PASS: public pages, enrollment forms, responsive themes, protected routes, removed previews, unauthenticated API rejection.',
    );
  } else {
    process.loadEnvFile('.env.local');
    const { initializeApp, cert } = await import('firebase-admin/app');
    const { getAuth } = await import('firebase-admin/auth');
    const { connect } = await import('@tursodatabase/serverless');
    admin = getAuth(
      initializeApp(
        {
          credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          }),
        },
        'browser-qa',
      ),
    );
    db = connect({ url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN });
    const teacher = await newPage();
    await signUp(teacher, 'instructor', 'Teacher', {
      invite: process.env.INSTRUCTOR_INVITE_PASSWORD,
    });
    const schoolPassword = await teacher.getByLabel('Student joining password').inputValue();
    assert.match(schoolPassword, /^AKO-/);
    await expect(teacher.getByRole('heading', { name: 'Your team starts here.' })).toBeVisible();
    await teacher.getByRole('button', { name: 'I’ve saved it', exact: true }).click();
    await layout(teacher, 'instructor-empty');
    const students = {};
    for (const division of ['A', 'B', 'C']) {
      const studentPage = await newPage();
      await signUp(studentPage, 'student', `Student${division}`, { division, schoolPassword });
      students[division] = studentPage;
      await expect(studentPage.locator('.event-card')).toHaveCount(division === 'A' ? 17 : 23);
      await expect(studentPage.locator('.stat-card strong')).toHaveText(['0', '0', '0', '0']);
    }
    await layout(students.A, 'division-a');
    await layout(students.B, 'division-b');
    await teacher.getByRole('button', { name: 'Refresh', exact: true }).click();
    await expect(teacher.locator('.student-row')).toHaveCount(3, { timeout: 15000 });
    await teacher.getByRole('button', { name: /StudentB/ }).click();
    const select = teacher.getByLabel('Event', { exact: true });
    await expect(select.locator('option')).toHaveCount(24);
    assert.equal(await select.locator('option').filter({ hasText: 'Astronomy' }).count(), 0);
    await select.selectOption('solar-system');
    await teacher.getByLabel('Due date', { exact: true }).fill('2099-01-01');
    await teacher.getByRole('button', { name: 'Assign test', exact: true }).click();
    await expect(teacher.locator('.assignment-row')).toHaveCount(1, { timeout: 15000 });
    await teacher.getByLabel('Test type', { exact: true }).selectOption('Ranked');
    await teacher.getByRole('button', { name: 'Assign test', exact: true }).click();
    await expect(teacher.locator('.assignment-row')).toHaveCount(2, { timeout: 15000 });
    await layout(teacher, 'instructor');
    const b = students.B;
    await b.reload();
    await b.getByRole('button', { name: 'Assignments (2)', exact: true }).click();
    await expect(b.locator('.assignment-row')).toHaveCount(2);
    await b.reload();
    await b.getByRole('button', { name: 'Assignments (2)', exact: true }).click();
    await expect(b.locator('.assignment-row')).toHaveCount(2);
    await b
      .locator('.assignment-row')
      .filter({ hasText: '1 practice test' })
      .getByRole('link', { name: 'Open event' })
      .click();
    await expect(b.getByRole('heading', { name: 'Practice tests', exact: true })).toBeVisible();
    await b.goto(base + '/dashboard/student/events/solar-system');
    await expect(b.locator('.tool-card')).toHaveCount(7);
    await layout(b, 'event-tools');
    const links = await b
      .locator('.tool-card')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href')));
    for (const link of links) {
      await b.goto(base + link);
      await expect(b.locator('.tool-placeholder')).toBeVisible();
    }
    await b.goto(base + '/dashboard/student/events/astronomy');
    await expect(
      b.getByRole('heading', { name: 'That page isn’t in your division.' }),
    ).toBeVisible();
    await b.goto(base + '/dashboard/student');
    await b.getByLabel('Your division', { exact: true }).selectOption('C');
    await expect(b.locator('.event-card').filter({ hasText: 'Astronomy' })).toHaveCount(1, {
      timeout: 15000,
    });
    await b.reload();
    await expect(b.getByLabel('Your division', { exact: true })).toHaveValue('C');
    await teacher.getByRole('button', { name: 'Refresh', exact: true }).click();
    await expect(
      teacher
        .getByLabel('Event', { exact: true })
        .locator('option')
        .filter({ hasText: 'Astronomy' }),
    ).toHaveCount(1, { timeout: 15000 });
    assert.equal(
      await teacher
        .getByLabel('Event', { exact: true })
        .locator('option')
        .filter({ hasText: 'Solar System' })
        .count(),
      0,
    );
    await teacher.getByRole('button', { name: /StudentA/ }).click();
    await expect(teacher.getByLabel('Event', { exact: true }).locator('option')).toHaveCount(18);
    await b.goto(base + '/dashboard/instructor');
    await expect(b).toHaveURL(/\/dashboard\/student$/);
    await b.getByRole('button', { name: 'Sign out', exact: true }).click();
    await expect(b).toHaveURL(/\/login\/student$/, { timeout: 15000 });
    assert.equal(await b.locator('.event-card').count(), 0);
    await b
      .getByLabel('Email address', { exact: true })
      .fill(emails.find((email) => email.endsWith('-studentb@example.com')));
    await b.getByLabel('Password', { exact: true }).fill(password);
    await b.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
    await expect(b).toHaveURL(/\/dashboard\/student$/, { timeout: 15000 });
    const recoveryEmail = `akoizo-qa-${stamp}-recovery@example.com`;
    emails.push(recoveryEmail);
    await admin.createUser({ email: recoveryEmail, password, displayName: 'Recovery' });
    const recovery = await newPage();
    let recoveryToken;
    recovery.on('request', (request) => {
      if (request.url().startsWith(base + '/api/'))
        recoveryToken = request.headers()['authorization'] || recoveryToken;
    });
    await recovery.goto(base + '/login/student');
    await recovery.getByLabel('Email address', { exact: true }).fill(recoveryEmail);
    await recovery.getByLabel('Password', { exact: true }).fill(password);
    await recovery.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
    await expect(
      recovery.getByRole('heading', { name: 'Finish joining your school.' }),
    ).toBeVisible({ timeout: 15000 });
    assert.ok(recoveryToken);
    assert.equal(
      (
        await recovery.request.get(base + '/api/dashboard', {
          headers: { Authorization: recoveryToken },
        })
      ).status(),
      403,
    );
    await recovery.getByLabel('School password', { exact: true }).fill('wrong-school-password');
    await recovery.getByRole('button', { name: 'Finish enrollment', exact: true }).click();
    await expect(
      recovery.getByRole('alert').filter({ hasText: 'school password is incorrect' }),
    ).toBeVisible();
    await recovery.getByLabel('School password', { exact: true }).fill(schoolPassword);
    await recovery.getByRole('button', { name: 'Finish enrollment', exact: true }).click();
    await expect(recovery).toHaveURL(/\/dashboard\/student$/, { timeout: 15000 });
    assert.equal(
      (
        await recovery.request.post(base + '/api/assignments', {
          headers: { Authorization: recoveryToken },
          data: {},
        })
      ).status(),
      403,
    );
    console.log(
      'PASS: live Firebase signup/login, school creation, A/B/C enrollment, saved assignments, seven feature routes, division changes, instructor filtering, role guards, incomplete-enrollment recovery, invalid passwords, logout, and desktop/mobile layouts.',
    );
  }
  assert.deepEqual(errors, []);
} catch (error) {
  console.error('Browser check failed:', error.message);
  process.exitCode = 1;
} finally {
  await browser.close();
  if (admin && db) {
    const users = [];
    for (const email of emails) {
      try {
        users.push(await admin.getUserByEmail(email));
      } catch (error) {
        if (error.code !== 'auth/user-not-found') throw error;
      }
    }
    if (users.length) {
      const ids = users.map((u) => u.uid);
      const placeholders = ids.map(() => '?').join(',');
      const schoolRows = await db.all(
        `SELECT school_id FROM users WHERE firebase_uid IN (${placeholders}) AND role='instructor'`,
        ...ids,
      );
      const statements = ['assignments', 'lesson_progress', 'points_ledger', 'test_attempts'].map(
        (table) => ({
          sql: `DELETE FROM ${table} WHERE student_id IN (SELECT id FROM users WHERE firebase_uid IN (${placeholders}))`,
          args: ids,
        }),
      );
      statements.push({
        sql: `DELETE FROM users WHERE firebase_uid IN (${placeholders})`,
        args: ids,
      });
      for (const school of schoolRows)
        statements.push({
          sql: 'DELETE FROM schools WHERE id=? AND NOT EXISTS (SELECT 1 FROM users WHERE school_id=?)',
          args: [school.school_id, school.school_id],
        });
      await db.batch(statements, 'immediate');
      for (const user of users) await admin.deleteUser(user.uid);
      console.log(`Removed ${users.length} temporary QA accounts and their school data.`);
    }
  }
}
