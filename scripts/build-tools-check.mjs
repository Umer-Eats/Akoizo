import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import { blankCourse, buildFields, parseCourse } from '../src/lib/build-events.ts';
import { eventsForDivision } from '../src/lib/events.ts';
import { eventToolIds } from '../src/lib/event-rules.ts';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3006';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
await mkdir('tmp/build-tools/browser', { recursive: true });
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
let courseInput,
  gradeInput,
  uploadOffsets = [],
  processingPolls = 0,
  rejectGeneration = false;
let course;
try {
  course = JSON.parse(await readFile('tmp/build-tools/live-C-electric-vehicle.json', 'utf8'));
} catch {
  course = blankCourse('C', 'electric-vehicle');
}
course = {
  ...blankCourse('C', 'electric-vehicle'),
  ...course,
  parameters: {
    ...Object.fromEntries(
      buildFields['electric-vehicle'].map((k) => [k, 'Not applicable for this UI fixture']),
    ),
    ...course.parameters,
  },
};
course.diagram = {
  view: 'Practice schematic — not to scale',
  nodes: [
    { label: 'Start', x: 10, y: 50 },
    { label: 'Target', x: 90, y: 50 },
  ],
  edges: [{ from: 0, to: 1, label: '6.00 m' }],
};
course.setup = ['Measure the target distance and mark the start and target.'];
course.ruleReferences = ['Course setup'];
const review = {
  summary: 'The finish ruler is obscured.',
  score: null,
  scoreLabel: 'Run score',
  direction: 'Lower wins',
  formula: 'Official event formula',
  calculation: 'Finish distance is unknown.',
  tier: 'Unverified',
  criteria: [
    {
      name: 'Finish distance',
      rule: 'Scoring',
      evidence: 'Ruler not readable',
      timestamp: '00:05',
      value: 'Unknown',
      status: 'unverifiable',
    },
  ],
  penalties: [],
  missing: ['Readable finish ruler'],
  improvements: ['Record the finish measurement.'],
};
await p.route('**/api/**', async (route) => {
  const req = route.request(),
    path = new URL(req.url()).pathname;
  if (path === '/api/auth/profile') return route.fulfill({ json: profile });
  if (path === '/api/dashboard')
    return route.fulfill({
      json: {
        profile,
        students: [],
        stats: { lessons: 0, practice: 0, ranked: 0, points: 0 },
        assignments: [],
        progress: {},
      },
    });
  if (path === '/api/event-selections') return route.fulfill({ json: [] });
  if (path === '/api/build-tools') {
    if (req.headers()['x-build-upload']) {
      const offset = Number(req.headers()['x-build-offset']);
      uploadOffsets.push(offset);
      assert.equal(req.postDataBuffer().length, offset === 0 ? 2 * 1024 * 1024 : 100);
      return route.fulfill({
        json: offset === 0 ? { received: 2 * 1024 * 1024 } : { ticket: 'file-ticket' },
      });
    }
    const body = req.postDataJSON();
    if (body.action === 'course') {
      courseInput = body;
      if (rejectGeneration)
        return route.fulfill({
          status: 503,
          json: { error: 'Gemini could not generate a complete course. Please try again.' },
        });
      return route.fulfill({ json: { course } });
    }
    if (body.action === 'upload') return route.fulfill({ json: { ticket: 'upload-ticket' } });
    if (body.action === 'status') return route.fulfill({ json: { ready: ++processingPolls > 1 } });
    if (body.action === 'grade') {
      gradeInput = body;
      return route.fulfill({ json: { grade: review } });
    }
    if (body.action === 'delete') return route.fulfill({ json: { deleted: true } });
  }
  return route.fulfill({ json: [] });
});
try {
  await p.goto(base + '/login/student');
  await p.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await p.getByLabel('Password', { exact: true }).fill('qa-test-password');
  await p.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(p).toHaveURL(/\/dashboard\/student$/, { timeout: 30000 });
  // Coverage: every advertised build tool in each division renders a real form.
  let combinations = 0;
  for (const division of ['C', 'B']) {
    profile = { ...profile, division };
    await p.reload();
    for (const event of eventsForDivision(division)) {
      if (!eventToolIds(division, event).includes('video-grader')) continue;
      combinations++;
      for (const mode of ['course-generator', 'video-grader']) {
        await p.goto(`${base}/dashboard/student/events/${event.id}/${mode}`);
        await expect(
          p.getByRole('heading', { name: 'Event parameters', exact: true }),
        ).toBeVisible();
        await expect(p.getByLabel(buildFields[event.id][0], { exact: true })).toBeVisible();
        await expect(p.locator('.tool-placeholder')).toHaveCount(0);
      }
    }
  }
  assert.equal(combinations, 17);
  profile = { ...profile, division: 'C' };
  await p.reload();
  await p.goto(base + '/dashboard/student/events/electric-vehicle/course-generator');
  await p.getByRole('button', { name: 'Generate course', exact: true }).click();
  await expect(p.getByRole('button', { name: 'Use in Video Grader', exact: true })).toBeVisible();
  assert.equal(courseInput.course.division, 'C');
  const download = p.waitForEvent('download');
  await p.getByRole('button', { name: 'Export course', exact: true }).click();
  await (await download).saveAs('tmp/build-tools/browser/exported-course.json');
  assert.deepEqual(
    parseCourse(
      JSON.parse(await readFile('tmp/build-tools/browser/exported-course.json', 'utf8')),
      'C',
      'electric-vehicle',
    ),
    course,
  );
  for (const theme of ['light', 'dark'])
    for (const width of [1440, 390, 320]) {
      await p.evaluate((theme) => (document.documentElement.dataset.theme = theme), theme);
      await p.setViewportSize({ width, height: 1000 });
      assert.equal(
        await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        `${theme}/${width}: overflow`,
      );
      if (width !== 320)
        await p.screenshot({
          path: `tmp/build-tools/browser/course-${theme}-${width}.png`,
          fullPage: true,
        });
      const contrast = await p.getByLabel('Target time (s)', { exact: true }).evaluate((el) => ({
        bg: getComputedStyle(el).backgroundColor,
        color: getComputedStyle(el).color,
      }));
      assert.notEqual(contrast.bg, contrast.color);
    }
  await p.setViewportSize({ width: 1440, height: 1000 });
  await p.getByRole('button', { name: 'Use in Video Grader', exact: true }).click();
  await expect(p).toHaveURL(/\/video-grader$/);
  await expect(p.getByLabel('Target time (s)', { exact: true })).toHaveValue(
    course.parameters['Target time (s)'],
  );
  await expect(p.locator('.build-diagram')).toBeVisible();
  await p.locator('input[type=file][accept*="video/mp4"]').setInputFiles({
    name: 'practice.webm',
    mimeType: 'video/webm',
    buffer: Buffer.alloc(2 * 1024 * 1024 + 100),
  });
  await p.getByRole('button', { name: 'Grade video', exact: true }).click();
  await expect(p.getByRole('heading', { name: 'More evidence needed', exact: true })).toBeVisible();
  assert.deepEqual(uploadOffsets, [0, 2 * 1024 * 1024]);
  assert.deepEqual(gradeInput.course, course);
  await p.screenshot({ path: 'tmp/build-tools/browser/grader-results.png', fullPage: true });
  // Imported courses from another division cannot replace the active course.
  await p.locator('input[accept=".json,application/json"]').setInputFiles({
    name: 'wrong-division.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({ ...course, division: 'B' })),
  });
  await expect(p.locator('.build-error')).toContainText('different event, division, or season');
  await p
    .locator('input[accept=".json,application/json"]')
    .setInputFiles('tmp/build-tools/browser/exported-course.json');
  await expect(
    p.getByText('Course imported with its parameters and diagram.', { exact: true }),
  ).toBeVisible();
  await p.getByLabel('Target time (s)', { exact: true }).fill('15.0');
  await expect(p.locator('.build-diagram')).toHaveCount(0);
  await p.goto(base + '/dashboard/student/events/electric-vehicle/course-generator');
  await expect(p.getByLabel('Target time (s)', { exact: true })).toHaveValue('15.0');
  rejectGeneration = true;
  await p.getByRole('button', { name: 'Generate course', exact: true }).click();
  await expect(p.locator('.build-error')).toContainText('Please try again.');
  await expect(p.getByRole('button', { name: 'Generate course', exact: true })).toBeEnabled();
  assert.deepEqual(errors, []);
  console.log(
    'Passed: all 34 B/C tabs, generation, export/import, direct handoff, chunked upload, missing-evidence review, stale diagram invalidation, retry, and mobile/light/dark layouts.',
  );
} finally {
  await browser.close();
}
