// Browser check for the student search and assignment editing on the instructor Student Progress tab. Firebase is mocked;
// the real services run over an in-memory database, so no live account or school record is touched.
//   TEST_BASE_URL=http://127.0.0.1:3006 node --experimental-strip-types --import ./tests/enrollment-env.mjs scripts/student-progress-browser-check.mjs
import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import { registerMember, dashboardFor } from '../src/lib/school-service.ts';
import {
  assignWork,
  editAssignment,
  removeAssignments,
  setAssignedStudents,
  studentWork,
} from '../src/lib/study-assignment-service.ts';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';
import { listPracticeTests } from '../src/lib/practice-catalog.ts';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3006';
const shots = 'documents/qa/student-progress';
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
    schoolCommunityId: 'ppchs',
  },
  'qa',
);
const names = ['Amy Chen', 'Ben Ortiz', 'Carla Diaz', 'Dev Patel', 'Ella Brooks', 'Finn Young'];
const students = [];
for (const [i, displayName] of names.entries())
  students[i] = await registerMember(
    db,
    identity(`s${i}`),
    {
      role: 'student',
      displayName,
      division: i % 2 ? 'B' : 'C',
      schoolPassword: teacher.credentials.joiningPassword,
    },
    'qa',
  );
// Amy (Division C) gets a Forensics lesson and practice test to edit.
const amy = students[0].profile;
const course = lessonsForEvent('forensics', 'C');
const [paper] = listPracticeTests('C', 'forensics');
const forensics = {
  division: 'C',
  eventId: 'forensics',
  due: '2999-01-01',
  timeZone: 'UTC',
  studentIds: [amy.id],
};
await assignWork(db, teacher.profile, {
  ...forensics,
  kind: 'Lesson',
  targetId: course.lessons[0].id,
});
await assignWork(db, teacher.profile, { ...forensics, kind: 'Practice', targetId: paper.id });
// Amy and Carla share the first unit, edited for both from the Assignments tab.
const carla = students[2].profile;
await assignWork(db, teacher.profile, {
  ...forensics,
  studentIds: [amy.id, carla.id],
  kind: 'Unit',
  targetId: course.units[0].id,
});

async function api(route, member) {
  const request = route.request();
  const url = new URL(request.url());
  const method = request.method();
  const handlers = {
    '/api/auth/profile': () => member,
    '/api/dashboard': () => dashboardFor(db, member),
    '/api/progress': () => studentWork(db, member, url.searchParams.get('studentId')),
    '/api/practice': () => ({
      tests: listPracticeTests(url.searchParams.get('division'), url.searchParams.get('eventId')),
    }),
    '/api/assignments': () =>
      method === 'PATCH'
        ? request.postDataJSON().action === 'students'
          ? setAssignedStudents(db, member, request.postDataJSON())
          : editAssignment(db, member, request.postDataJSON())
        : method === 'DELETE'
          ? removeAssignments(db, member, request.postDataJSON())
          : { ok: true },
  };
  try {
    return route.fulfill({ json: (await handlers[url.pathname]?.()) ?? [] });
  } catch (error) {
    return route.fulfill({ status: error.status ?? 500, json: { error: error.message } });
  }
}

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  const profile = teacher.profile;
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
                providerUserInfo: [{ providerId: 'password', email: user.email }],
              },
            ],
          },
    }),
  );
  await page.addInitScript(() => {
    if (window.self !== window.top) return;
    localStorage.setItem('ako-preferences', JSON.stringify({ visible: false, muted: true }));
  });
  await page.route('**/api/**', (route) => api(route, profile));
  await page.goto(`${base}/login/instructor`);
  await page.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await page.getByLabel('Password', { exact: true }).fill('qa-browser-only-password');
  await page.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard\/instructor$/);

  await page.goto(`${base}/dashboard/instructor?tab=progress`);
  const rows = page.locator('.student-list .student-row');
  await expect(rows).toHaveCount(names.length);
  const search = page.getByLabel('Search students');
  await search.fill('dev');
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText('Dev Patel');
  await expect(page.locator('.event-toolbar .tag')).toHaveText(`1 OF ${names.length}`);
  await rows.first().click();
  await expect(page.getByRole('heading', { name: 'Dev Patel’s progress.' })).toBeVisible();
  await page.screenshot({ path: `${shots}/search-name.png` });

  await search.fill('s4@example');
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText('Ella Brooks');

  await search.fill('zzz');
  await expect(rows).toHaveCount(0);
  await expect(page.getByText('No students match “zzz”.')).toBeVisible();
  // The selected student's details stay open while the list is filtered.
  await expect(page.getByRole('heading', { name: 'Dev Patel’s progress.' })).toBeVisible();
  await page.screenshot({ path: `${shots}/search-empty.png` });

  await search.fill('');
  await expect(rows).toHaveCount(names.length);

  // Edit Amy's lesson: new due date and a different lesson.
  await search.fill('amy');
  await rows.first().click();
  await expect(page.getByRole('heading', { name: 'Amy Chen’s progress.' })).toBeVisible();
  const list = page.locator('.assignment-list');
  await expect(list.locator('.assignment-row')).toHaveCount(3);
  // Lessons show their unit and lesson number.
  await expect(list).toContainText(`Lesson: Lesson 1.1: ${course.lessons[0].title}`);
  const lessonRow = list.locator('.assignment-row', { hasText: course.lessons[0].title });
  await lessonRow.getByRole('button', { name: /^Edit Forensics lesson/ }).click();
  const editor = lessonRow.locator('form.assignment-editor');
  await editor.getByLabel('Due date').fill('2999-02-14');
  await editor.getByLabel('Assigned work').selectOption(`Lesson:${course.lessons[1].id}`);
  await page.screenshot({ path: `${shots}/edit-lesson-open.png` });
  await editor.getByRole('button', { name: 'Save changes' }).click();
  await expect(editor).toHaveCount(0);
  const edited = list.locator('.assignment-row', { hasText: course.lessons[1].title });
  await expect(edited).toContainText('Due 2999-02-14');

  // Edit the practice test to "any practice test in this event".
  const practiceRow = list.locator('.assignment-row', { hasText: 'Assigned converted test' });
  await practiceRow.getByRole('button', { name: /^Edit Forensics practice/ }).click();
  const testEditor = practiceRow.locator('form.assignment-editor');
  await expect(testEditor.getByLabel('Assigned work')).toBeEnabled();
  await testEditor.getByLabel('Assigned work').selectOption('Practice:');
  await testEditor.getByRole('button', { name: 'Save changes' }).click();
  await expect(
    list.locator('.assignment-row', { hasText: 'Complete any 1 practice test' }),
  ).toBeVisible();

  // Server errors show in the editor; past dates are refused.
  await edited.getByRole('button', { name: /^Edit Forensics lesson/ }).click();
  await edited.locator('form.assignment-editor').getByLabel('Due date').fill('2000-01-01');
  await edited
    .locator('form.assignment-editor')
    .evaluate((form) => form.setAttribute('novalidate', ''));
  await edited.getByRole('button', { name: 'Save changes' }).click();
  await expect(edited.locator('.assignment-editor [role="alert"]')).toContainText('due date');
  await page.screenshot({ path: `${shots}/edit-error.png` });
  await edited.getByRole('button', { name: 'Cancel' }).click();
  const lessonNow = (await dashboardFor(db, amy)).assignments.find(
    (a) => a.study?.kind === 'Lesson',
  );
  assert.equal(lessonNow.study.targetId, course.lessons[1].id);
  assert.equal(lessonNow.due, '2999-02-14');
  await search.fill('');

  // Assignments tab → Already assigned: the shared unit is one item for both students.
  await page
    .getByRole('navigation', { name: 'Instructor sections' })
    .getByRole('button', { name: /Assignments/ })
    .click();
  await page.getByRole('button', { name: /^Already assigned/ }).click();
  await page.getByLabel('Assigned work division').selectOption('C');
  const unitTitle = course.units[0].title.replace(/^unit\s*\d+\s*[:.\-–—]\s*/i, '');
  const group = page.locator('.assigned-group', { hasText: `Unit 1: ${unitTitle}` });
  await expect(group).toContainText('2 students');
  await expect(group).toContainText('Amy Chen, Carla Diaz');
  await group.getByRole('button', { name: /for all students/ }).click();
  const groupEditor = group.locator('form.assignment-editor');
  const select = groupEditor.getByLabel('Assigned work');
  // The dropdown is organized by unit, with numbered lessons.
  assert.equal(
    await select.locator('optgroup').first().getAttribute('label'),
    `Unit 1: ${unitTitle}`,
  );
  const nextLesson = course.units[1].lessonIds[0];
  await expect(select.locator(`option[value="Lesson:${nextLesson}"]`)).toHaveText(/^Lesson 2\.1: /);
  await select.selectOption(`Lesson:${nextLesson}`);
  await groupEditor.getByLabel('Due date').fill('2999-03-20');
  await page.screenshot({ path: `${shots}/assigned-group-edit.png` });
  await groupEditor.getByRole('button', { name: 'Save for 2 students' }).click();
  await expect(groupEditor).toHaveCount(0);
  const moved = page.locator('.assigned-group', { hasText: 'Lesson 2.1:' });
  await expect(moved).toContainText('2 students');
  await expect(moved).toContainText('Due 2999-03-20');
  for (const student of [amy, carla]) {
    const work = (await dashboardFor(db, student)).assignments.find(
      (a) => a.study?.targetId === nextLesson,
    );
    assert.equal(work?.due, '2999-03-20', `${student.displayName} updated`);
  }
  await page.screenshot({ path: `${shots}/assigned-list.png` });

  // Remove for all: a confirm step first, then the work leaves both students.
  await moved.getByRole('button', { name: /from all students/ }).click();
  await expect(moved.getByRole('group', { name: 'Confirm removal' })).toContainText(
    'Remove this from 2 students',
  );
  await page.screenshot({ path: `${shots}/remove-confirm.png` });
  await moved.getByRole('button', { name: 'Cancel' }).click();
  await expect(moved.getByRole('group', { name: 'Confirm removal' })).toHaveCount(0);
  await moved.getByRole('button', { name: /from all students/ }).click();
  await moved.getByRole('button', { name: 'Remove from 2 students' }).click();
  await expect(page.locator('.assigned-group', { hasText: 'Lesson 2.1:' })).toHaveCount(0);
  for (const student of [amy, carla])
    assert.equal(
      (await dashboardFor(db, student)).assignments.some((a) => a.study?.targetId === nextLesson),
      false,
      `${student.displayName} removed`,
    );

  // Edit students: swap Amy for Carla and Ella on Amy's lesson.
  const lessonGroup = page.locator('.assigned-group', { hasText: 'Lesson 1.2:' });
  await lessonGroup.getByRole('button', { name: /^Edit students assigned/ }).click();
  const picker = page.getByRole('dialog', { name: /^Students assigned Lesson 1\.2/ });
  await expect(picker.getByLabel('Amy Chen has this work')).toBeChecked();
  await expect(picker.getByLabel('Carla Diaz has this work')).not.toBeChecked();
  // Only Division C students are offered.
  await expect(picker.getByLabel('Ben Ortiz has this work')).toHaveCount(0);
  await picker.getByLabel('Amy Chen has this work').uncheck();
  await picker.getByLabel('Carla Diaz has this work').check();
  await picker.getByLabel('Ella Brooks has this work').check();
  await expect(picker.locator('.selection-summary')).toContainText(
    '2 students will have it · 2 to add · 1 to remove',
  );
  await picker.getByLabel('Due date for added students').fill('2999-04-01');
  await page.screenshot({ path: `${shots}/edit-students.png` });
  await picker.getByRole('button', { name: 'Save students' }).click();
  await expect(picker).toHaveCount(0);
  await expect(lessonGroup).toContainText('2 students');
  await expect(lessonGroup).toContainText('Carla Diaz, Ella Brooks');
  const ella = students[4].profile;
  const lessonOf = (list) => list.find((a) => a.study?.targetId === course.lessons[1].id);
  assert.equal(lessonOf((await dashboardFor(db, amy)).assignments), undefined, 'Amy removed');
  assert.equal(lessonOf((await dashboardFor(db, carla)).assignments)?.due, '2999-04-01');
  assert.equal(lessonOf((await dashboardFor(db, ella)).assignments)?.due, '2999-04-01');

  // The assign screen numbers units and lessons too.
  await page.getByRole('button', { name: 'Assign new work' }).click();
  await page.locator('.event-card-link', { hasText: 'Forensics' }).click();
  await page.getByRole('button', { name: 'Lessons by unit' }).click();
  await expect(page.getByRole('heading', { name: `Unit 1: ${unitTitle}` })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: `Lesson 1.1: ${course.lessons[0].title}` }),
  ).toBeVisible();
  await page.screenshot({ path: `${shots}/assign-numbered.png` });
  await page
    .getByRole('navigation', { name: 'Instructor sections' })
    .getByRole('button', { name: /Student Progress/ })
    .click();

  await page.setViewportSize({ width: 390, height: 900 });
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    false,
    'phone overflow',
  );
  await search.fill('a');
  await page.screenshot({ path: `${shots}/search-390.png`, fullPage: false });

  const relevant = errors.filter((e) => !/hydrat|favicon/i.test(e));
  assert.deepEqual(relevant, [], 'no page errors');
  console.log('Student search, assignment editing, and group editing checks passed.');
} finally {
  await browser.close();
}
