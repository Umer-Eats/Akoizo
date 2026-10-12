import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import { registerMember, dashboardFor } from '../src/lib/school-service.ts';
import { createTeam, listTeams, updateTeam } from '../src/lib/team-service.ts';
import { schoolAnalytics } from '../src/lib/analytics-service.ts';
import { communityFor } from '../src/lib/community-service.ts';

// Browser-only account mocks over an in-memory database. The real analytics service runs
// unchanged, and no live account or school record is involved.
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3005';
const shots = 'documents/qa/analytics';
await mkdir(shots, { recursive: true });

const raw = new DatabaseSync(':memory:');
raw.exec('PRAGMA foreign_keys=ON');
for (const sql of schema) raw.exec(sql);
for (const seed of eventSeeds) raw.prepare(seed.sql).run(...seed.args);
const db = {
  get: async (sql, ...args) => raw.prepare(sql).get(...args),
  all: async (sql, ...args) => raw.prepare(sql).all(...args),
  batch: async (statements) =>
    statements.map(({ sql, args }) => ({
      rowsAffected: Number(raw.prepare(sql).run(...args).changes),
      rows: [],
    })),
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
const students = {};
for (const name of ['Amy Chen', 'Ben Ortiz', 'Cal Reyes', 'Dee Park', 'Eli Stone', 'Fay Wong'])
  students[name] = (
    await registerMember(
      db,
      identity(name),
      {
        role: 'student',
        displayName: name,
        division: 'C',
        schoolPassword: teacher.credentials.joiningPassword,
      },
      'qa',
    )
  ).profile;

const seats = {
  Varsity: { forensics: ['Amy Chen', 'Ben Ortiz'], 'water-quality': ['Amy Chen', 'Cal Reyes'] },
  'Junior Varsity': { forensics: ['Dee Park', 'Eli Stone'], astronomy: ['Dee Park'] },
};
for (const [name, events] of Object.entries(seats)) {
  const { id: teamId } = await createTeam(db, teacher.profile, { name, division: 'C' });
  for (const [eventId, names] of Object.entries(events))
    for (const [slot, student] of names.entries())
      await updateTeam(db, teacher.profile, {
        teamId,
        eventId,
        slot,
        studentId: students[student].id,
      });
}
// One graded test: [student, event, type, week, multiple choice earned of 10, written earned of 10].
const tests = [
  ['Amy Chen', 'forensics', 'Practice', 0, 6, 5],
  ['Amy Chen', 'forensics', 'Ranked', 2, 9, 8],
  ['Amy Chen', 'water-quality', 'Practice', 1, 8, 6],
  ['Ben Ortiz', 'forensics', 'Practice', 0, 4, 3],
  ['Ben Ortiz', 'forensics', 'Ranked', 2, 7, 6],
  ['Cal Reyes', 'water-quality', 'Practice', 1, 5, 7],
  ['Cal Reyes', 'water-quality', 'Practice', 3, 9, 9],
  ['Dee Park', 'forensics', 'Practice', 0, 3, 4],
  ['Dee Park', 'astronomy', 'Practice', 1, 5, 5],
  ['Dee Park', 'forensics', 'Ranked', 2, 6, 4],
  ['Eli Stone', 'forensics', 'Ranked', 2, 5, 5],
  ['Eli Stone', 'forensics', 'Practice', 3, 7, 6],
  ['Fay Wong', 'botany', 'Practice', 1, 8, 8],
];
for (const [index, [name, event, type, week, mcq, written]] of tests.entries()) {
  const id = `attempt-${index}`;
  const student = students[name].id;
  const key = `2027:C:${event}`;
  const at = new Date(Date.UTC(2026, 8, 15 + week * 7, 15)).toISOString();
  const result = JSON.stringify({
    pendingPoints: 0,
    questions: [
      { earned: mcq, possible: 10, criteria: [] },
      { earned: written, possible: 10, criteria: [{ id: 'a', points: 10, earned: written }] },
    ],
  });
  const points = type === 'Ranked' ? (mcq + written) * 5 : 0;
  raw
    .prepare(
      'INSERT INTO test_attempts (id,student_id,event_id,type,score,max_score,points_awarded,started_at,completed_at) VALUES (?,?,?,?,?,20,?,?,?)',
    )
    .run(id, student, key, type, mcq + written, points, at, at);
  if (type === 'Practice') {
    raw
      .prepare(
        'INSERT INTO practice_submissions (id,student_id,test_id,result_json,created_at) VALUES (?,?,?,?,?)',
      )
      .run(id, student, `paper-${index}`, result, at);
    raw
      .prepare(
        "INSERT INTO assignments (id,student_id,instructor_id,event_id,type,due_date,completed_at) VALUES (?,?,?,?,'Practice','2026-12-01',?)",
      )
      .run(id, student, teacher.profile.id, key, index % 3 ? at : null);
  } else {
    raw
      .prepare(
        "INSERT INTO ranked_tests (id,school_id,instructor_id,event_id,title,minutes,question_count,max_score,sources_json,paper_json,created_at) VALUES (?,?,?,?,'Ranked',30,2,20,'[]','{}',?)",
      )
      .run(`test-${index}`, teacher.profile.schoolId, teacher.profile.id, key, at);
    raw
      .prepare(
        "INSERT INTO ranked_assignments (id,test_id,student_id,due_date,assigned_at,submitted_at,result_json) VALUES (?,?,?,'2026-12-01',?,?,?)",
      )
      .run(id, `test-${index}`, student, at, at, result);
    raw
      .prepare(
        "INSERT INTO points_ledger (id,student_id,event_id,test_attempt_id,points,reason) VALUES (?,?,?,?,?,'Ranked test')",
      )
      .run(id, student, key, id, points);
  }
}

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
});
const page = await context.newPage();
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (message) => {
  if (message.type() === 'error' && !/Failed to load resource/.test(message.text()))
    errors.push(message.text());
});
const part = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
const token = `${part({ alg: 'none' })}.${part({
  sub: teacher.profile.id,
  user_id: teacher.profile.id,
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 3600,
  aud: 'qa',
  iss: 'https://securetoken.google.com/qa',
  firebase: { sign_in_provider: 'password' },
})}.signature`;
const user = { localId: teacher.profile.id, email: 'qa@example.test' };
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
const handlers = {
  '/api/auth/profile': () => teacher.profile,
  '/api/dashboard': () => dashboardFor(db, teacher.profile),
  '/api/teams': () => listTeams(db, teacher.profile),
  '/api/analytics': () => schoolAnalytics(db, teacher.profile),
  '/api/community': () => communityFor(db, students['Amy Chen']),
};
await page.route('**/api/**', async (route) =>
  route.fulfill({ json: (await handlers[new URL(route.request().url()).pathname]?.()) ?? [] }),
);
async function fits(name) {
  for (const theme of ['dark', 'light']) {
    await page.evaluate((value) => (document.documentElement.dataset.theme = value), theme);
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        `${name} ${theme} ${width}: horizontal overflow`,
      );
      await page.screenshot({ path: `${shots}/${name}-${theme}-${width}.png`, fullPage: true });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => (document.documentElement.dataset.theme = 'dark'));
}

try {
  await page.goto(`${base}/login/instructor`);
  await page.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await page.getByLabel('Password', { exact: true }).fill('qa-browser-only-password');
  await page.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard\/instructor$/);

  // The Analytics button sits in the blue sidebar with the other instructor sections.
  const button = page
    .getByRole('navigation', { name: 'Instructor sections' })
    .getByRole('button', { name: /Analytics/ });
  assert.equal(
    await button.evaluate((node) => getComputedStyle(node).backgroundColor),
    'rgb(36, 85, 245)',
  );
  await button.click();
  const overview = page.getByRole('region', { name: 'School analytics' });
  await expect(overview.getByText('2 TEAMS')).toBeVisible();
  const tile = (scope, name) =>
    scope.locator('.stat-card', { has: page.getByText(name, { exact: true }) }).locator('strong');
  await expect(tile(overview, 'Students')).toHaveText('6');
  await expect(tile(overview, 'Overall accuracy')).toHaveText('60.8%'); // 158 of 260
  await expect(tile(overview, 'Total points')).toHaveText('250');

  // Teams rank by the chosen measure; students without a team are still counted.
  const bars = overview.locator('.an-bars li');
  await expect(bars).toHaveText([/Not on a team.*80%/, /Varsity.*65.7%/, /Junior Varsity.*50%/]);
  await overview.getByRole('button', { name: 'Points', exact: true }).click();
  await expect(bars).toHaveText([/Varsity.*150/, /Junior Varsity.*100/, /Not on a team.*0/]);

  // The trend chart reads every team at the hovered week.
  const plot = overview.locator('.an-plot svg');
  await expect(plot.locator('.an-line')).toHaveCount(3);
  const box = await plot.boundingBox();
  await plot.hover({ position: { x: box.width - 150, y: 120 } });
  await expect(overview.locator('.an-tooltip')).toContainText('Week of Oct 5');
  await expect(overview.locator('.an-tooltip')).toContainText('Varsity90%');
  await page.screenshot({ path: `${shots}/trend-tooltip.png` });
  await page.mouse.move(0, 0);
  const heat = overview.getByRole('region', { name: 'Accuracy by event and team' });
  await expect(heat.locator('tbody tr', { hasText: 'Forensics' }).locator('td')).toHaveText([
    '60%',
    '50%',
    '—',
  ]);
  await fits('overview');

  // Opening a team shows its students, their points, and accuracy itemized by event.
  await heat.getByRole('button', { name: 'Open Varsity analytics' }).click();
  const team = page.getByRole('region', { name: 'Varsity analytics', exact: true });
  await expect(tile(team, 'Students')).toHaveText('3');
  await expect(tile(team, 'Overall accuracy')).toHaveText('65.7%');
  await expect(team.locator('.an-bars li')).toHaveText([
    /Amy Chen.*85/,
    /Ben Ortiz.*65/,
    /Cal Reyes.*0/,
  ]);
  const grid = team.getByRole('region', { name: 'Varsity accuracy by event and student' });
  const forensics = grid.locator('tbody tr', { hasText: 'Forensics' }).locator('td');
  await expect(forensics).toHaveText(['60%', /^70%/, /^50%/, '—']);
  await expect(forensics.nth(1)).toHaveAttribute('data-seated', 'true');
  await expect(forensics.nth(3)).toHaveAttribute('data-seated', 'false');
  const amy = team.locator('.an-breakdown tbody tr', { hasText: 'Amy Chen' }).locator('td');
  await expect(amy).toHaveText([
    '85',
    '70%',
    '76.7%',
    '63.3%',
    /62.5%2 taken/,
    /85%1 taken/,
    '0',
    /66.7%2 of 3/,
  ]);
  await grid.getByRole('button', { name: 'Show Water Quality breakdown' }).click();
  await expect(team.getByLabel('Breakdown event')).toHaveValue('water-quality');
  await expect(amy).toHaveText([
    '0',
    '70%',
    '80%',
    '60%',
    /70%1 taken/,
    /—0 taken/,
    '0',
    /100%1 of 1/,
  ]);
  await expect(
    team.locator('.an-breakdown tbody tr', { hasText: 'Ben Ortiz' }).locator('td').nth(1),
  ).toHaveText('—');
  await fits('team');
  await team.getByRole('button', { name: 'All teams' }).click();
  await expect(overview).toBeVisible();

  // A student sees the same live analytics, static team sheets and all members.
  handlers['/api/auth/profile'] = () => students['Amy Chen'];
  const mutations = [];
  page.on('request', (request) => {
    if (/\/api\/(community|teams|analytics)/.test(request.url()) && request.method() !== 'GET')
      mutations.push(request.method());
  });
  await page.clock.install();
  await page.goto(`${base}/community`);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    teacher.profile.schoolCommunityName,
  );
  await expect(page.getByRole('link', { name: 'Community', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(tile(page, 'Students')).toHaveText('6');
  await fits('community-analytics');
  await page.getByRole('tab', { name: 'Teams (2)' }).click();
  await expect(page.getByRole('region', { name: 'Varsity events' })).toContainText('Amy Chen');
  await expect(
    page.getByRole('button', { name: /Add student|Delete team|Create team/ }),
  ).toHaveCount(0);
  await expect(page.getByLabel('Team name', { exact: true })).toHaveCount(0);
  await fits('community-teams');
  await page.getByRole('tab', { name: 'Members (7)' }).click();
  await expect(page.getByRole('region', { name: 'Community members' })).toContainText(
    'Coach Rivera',
  );
  await page.getByRole('textbox', { name: 'Search members' }).fill('Fay');
  await expect(page.locator('#community-panel tbody tr')).toHaveCount(1);
  await expect(page.locator('#community-panel tbody tr')).toContainText('Fay Wong');
  await page.getByRole('textbox', { name: 'Search members' }).fill('');
  await fits('community-members');
  const newTeam = await createTeam(db, teacher.profile, { name: 'New live team', division: 'C' });
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  await expect(page.getByRole('tab', { name: 'Teams (3)' })).toBeVisible();
  await page.getByRole('tab', { name: 'Teams (3)' }).click();
  await expect(page.getByRole('button', { name: 'New live team · C' })).toBeVisible();
  await updateTeam(db, teacher.profile, { teamId: newTeam.id, name: 'Automatically updated' });
  await page.clock.fastForward(31_000);
  await expect(page.getByRole('button', { name: 'Automatically updated · C' })).toBeVisible();
  await updateTeam(db, teacher.profile, { teamId: newTeam.id, name: 'Manually refreshed' });
  await page.getByRole('button', { name: 'Refresh', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Manually refreshed · C' })).toBeVisible();
  assert.deepEqual(mutations, []);

  assert.deepEqual(errors, []);
  console.log(
    'Analytics and community browser checks passed: instructor analytics, student community analytics, read-only teams, searchable member directory, focus/automatic/manual refresh, no mutations, desktop/mobile layouts in both themes.',
  );
} catch (error) {
  await page.screenshot({ path: `${shots}/failure.png`, fullPage: true }).catch(() => {});
  throw error;
} finally {
  await browser.close();
  raw.close();
}
