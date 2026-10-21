import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import { registerMember, dashboardFor } from '../src/lib/school-service.ts';
import { createTeam, listTeams, updateTeam } from '../src/lib/team-service.ts';
import {
  assignWork,
  recordLab,
  studentWork,
  submitLab,
  submitLesson,
} from '../src/lib/study-assignment-service.ts';
import { labsForEvent } from '../src/lib/division-c-labs.ts';
import { calculateLab, initialLabValues } from '../src/lib/division-c-lab-models.ts';
import { listPracticeTests } from '../src/lib/practice-catalog.ts';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';
import { lessonStorageKey } from '../src/lib/lesson-practice.ts';

// Division B version of assignments-browser-check: a middle-school coach whose roster is all
// Division B must land on Division B and reach their students. Browser-only account mocks over an in-memory database. The real services run unchanged, and no
// live account, school record, or Gemini request is involved.
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3005';
const shots = 'output/assignment-qa-b';
await mkdir(shots, { recursive: true });

const raw = new DatabaseSync(':memory:');
raw.exec('PRAGMA foreign_keys=ON');
for (const sql of schema) raw.exec(sql);
for (const seed of eventSeeds) raw.prepare(seed.sql).run(...seed.args);
const db = {
  get: async (sql, ...args) => raw.prepare(sql).get(...args),
  all: async (sql, ...args) => raw.prepare(sql).all(...args),
  async batch(statements) {
    raw.exec('BEGIN IMMEDIATE');
    try {
      const result = statements.map(({ sql, args }) => ({
        rowsAffected: Number(raw.prepare(sql).run(...args).changes),
        rows: [],
      }));
      raw.exec('COMMIT');
      return result;
    } catch (error) {
      raw.exec('ROLLBACK');
      throw error;
    }
  },
};
const identity = (uid) => ({ uid, email: `${uid}@example.test` });
const teacher = await registerMember(
  db,
  identity('teacher'),
  {
    role: 'instructor',
    displayName: 'Coach Rivera',
    instructorInvitePassword: 'qa',
    schoolCommunityId: 'ppcms-central',
  },
  'qa',
);
const students = {};
for (const name of ['Amy Chen', 'Ben Ortiz', 'Cal Reyes', 'Dee Park', 'Eli Stone'])
  students[name] = (
    await registerMember(
      db,
      identity(name),
      {
        role: 'student',
        displayName: name,
        division: 'B',
        schoolPassword: teacher.credentials.joiningPassword,
      },
      'qa',
    )
  ).profile;

async function api(route, profile) {
  const request = route.request();
  const url = new URL(request.url());
  const body = request.method() === 'POST' ? request.postDataJSON() : {};
  const handlers = {
    '/api/auth/profile': () => profile,
    '/api/dashboard': () => dashboardFor(db, profile),
    '/api/teams': () => listTeams(db, profile),
    '/api/assignments': () => assignWork(db, profile, body),
    '/api/progress': () =>
      request.method() !== 'POST'
        ? studentWork(db, profile, url.searchParams.get('studentId'))
        : !body.labId
          ? submitLesson(db, profile, body)
          : body.labId === 'phet'
            ? recordLab(db, profile, body)
            : submitLab(db, profile, body),
    '/api/practice': () => ({
      tests: listPracticeTests(
        url.searchParams.get('division') || profile.division,
        url.searchParams.get('eventId'),
      ),
    }),
  };
  try {
    return route.fulfill({ json: await handlers[url.pathname]() });
  } catch (error) {
    return route.fulfill({ status: error.status ?? 500, json: { error: error.message } });
  }
}

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
async function account(profile) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    // MOTION=1 runs with entrance animations on, as most visitors see the site.
    reducedMotion: process.env.MOTION ? 'no-preference' : 'reduce',
  });
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (message) => {
    if (message.type() === 'error' && !/Failed to load resource/.test(message.text()))
      errors.push(message.text());
  });
  const part = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
  const token = `${part({ alg: 'none' })}.${part({
    sub: profile.id,
    user_id: profile.id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
    aud: 'qa',
    iss: 'https://securetoken.google.com/qa',
    firebase: { sign_in_provider: 'password' },
  })}.signature`;
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
  await page.route('**/api/**', (route) => api(route, profile));
  await page.goto(`${base}/login/${profile.role}`);
  await page.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await page.getByLabel('Password', { exact: true }).fill('qa-browser-only-password');
  await page.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`/dashboard/${profile.role}$`));
  return page;
}

try {
  const team = await createTeam(db, teacher.profile, { name: 'Central B', division: 'B' });
  for (const [eventId, members] of [
    ['heredity', ['Amy Chen', 'Ben Ortiz']],
    ['crime-busters', ['Cal Reyes', 'Dee Park']],
  ])
    for (const [slot, name] of members.entries())
      await updateTeam(db, teacher.profile, {
        teamId: team.id,
        eventId,
        slot,
        studentId: students[name].id,
      });
  const page = await account(teacher.profile);
  // The catalog opens on the roster's division, not Division C.
  await expect(page.getByLabel('Assignment division')).toHaveValue('B');
  await page.getByRole('button', { name: 'Heredity', exact: false }).click();
  await expect(page.getByText('DIVISION B', { exact: true })).toBeVisible();
  await page
    .getByRole('button', { name: /Assign test / })
    .first()
    .click();
  let modal = page.getByRole('dialog');
  await expect(modal.getByText('Amy Chen + Ben Ortiz')).toBeVisible();
  await modal.getByRole('button', { name: 'Assign to all 2 students', exact: true }).click();
  await expect(modal.getByText('Assigned to 2 students.', { exact: true })).toBeVisible();
  await page.screenshot({ path: shots + '/heredity-test-modal.png' });
  await modal.getByRole('button', { name: 'Close', exact: true }).click();
  await page.getByRole('button', { name: 'Lessons by unit', exact: true }).click();
  await page.getByLabel('Filter lessons by unit').selectOption({ index: 1 });
  await page.getByRole('button', { name: /Assign Unit/ }).click();
  modal = page.getByRole('dialog');
  await modal.getByRole('button', { name: 'Assign to all 2 students', exact: true }).click();
  await expect(modal.getByText('Assigned to 2 students.', { exact: true })).toBeVisible();
  await modal.getByRole('button', { name: 'Close', exact: true }).click();
  await page.getByRole('button', { name: /All Division B events/ }).click();
  await page.getByRole('button', { name: 'Crime Busters', exact: false }).click();
  await page.getByRole('button', { name: 'Lab simulations', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Assign PhET: Density' })).toBeVisible();
  await page.getByRole('button', { name: 'Assign Match the ransom-note ink' }).click();
  modal = page.getByRole('dialog');
  await expect(modal.getByText('Cal Reyes + Dee Park')).toBeVisible();
  await modal.getByRole('button', { name: 'Assign to all 2 students', exact: true }).click();
  await expect(modal.getByText('Assigned to 2 students.', { exact: true })).toBeVisible();
  await page.screenshot({ path: shots + '/crime-busters-lab-modal.png' });
  assert.deepEqual(errors, []);
  console.log(
    'PASS: Division B coach lands on Division B; tests, units, and labs assign to seated B students.',
  );
} finally {
  await browser.close();
}
