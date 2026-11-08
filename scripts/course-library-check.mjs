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

const out = 'tmp/competition-qa';
await mkdir(out, { recursive: true });
const course = {
  ...blankCourse('C', 'electric-vehicle'),
  title: 'Saved electric vehicle course',
  parameters: Object.fromEntries(
    buildFields['electric-vehicle'].map((k) => [k, 'Fixture value with units']),
  ),
  setup: ['Measure the distance and mark the start and target.'],
  ruleReferences: ['2027 course setup'],
  diagram: {
    view: 'Schematic, not to scale',
    nodes: [
      { label: 'Start', x: 10, y: 50 },
      { label: 'Target', x: 90, y: 50 },
    ],
    edges: [{ from: 0, to: 1, label: '6.00 m' }],
  },
};
const saved = {
  id: '00000000-0000-4000-8000-000000000001',
  eventId: course.eventId,
  division: 'C',
  title: course.title,
  level: course.level,
  schoolName: 'Science Team',
  createdAt: '2026-11-08T12:00:00.000Z',
  course,
};
let savedInLibrary = false,
  saveAttempts = 0,
  failSave = true;
await p.route('**/api/**', async (route) => {
  const req = route.request(),
    url = new URL(req.url());
  if (url.pathname === '/api/auth/profile') return route.fulfill({ json: profile });
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
  if (url.pathname === '/api/event-selections') return route.fulfill({ json: [] });
  if (url.pathname === '/api/build-tools') return route.fulfill({ json: { course } });
  if (url.pathname === '/api/courses') {
    if (req.method() === 'POST') {
      saveAttempts++;
      if (failSave)
        return route.fulfill({ status: 503, json: { error: 'Storage temporarily unavailable' } });
      savedInLibrary = true;
      assert.deepEqual(req.postDataJSON().course, course);
      return route.fulfill({ json: saved });
    }
    if (url.searchParams.has('id')) return route.fulfill({ json: saved });
    return route.fulfill({ json: { courses: savedInLibrary ? [saved] : [], nextCursor: null } });
  }
  if (url.pathname === '/api/cheatsheets')
    return route.fulfill({ json: { sheets: [], drafts: [], nextCursor: null } });
  if (url.pathname === '/api/binders')
    return route.fulfill({ json: { binders: [], jobs: [], nextCursor: null } });
  return route.fulfill({ json: [] });
});
try {
  await p.goto(base + '/login/student');
  await p.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await p.getByLabel('Password', { exact: true }).fill('qa-test-password');
  await p.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(p).toHaveURL(/\/dashboard\/student$/, { timeout: 30000 });
  await p.goto(base + '/dashboard/student/events/electric-vehicle/course-generator');
  await p.getByRole('button', { name: 'Generate course', exact: true }).click();
  await expect(p.locator('.build-error')).toContainText('saving failed');
  await expect(p.locator('.build-diagram')).toBeVisible();
  failSave = false;
  await p.getByRole('button', { name: 'Save & share course', exact: true }).click();
  await expect(p.getByRole('button', { name: 'Saved to library', exact: true })).toBeDisabled();
  await expect(p.locator('.build-error')).toHaveCount(0);
  assert.equal(saveAttempts, 2);
  await p.goto(base + '/dashboard/courses');
  await expect(p.getByRole('heading', { name: 'The course library.', exact: true })).toBeVisible();
  await p.getByRole('button', { name: 'Open & export', exact: true }).click();
  await expect(p.getByRole('button', { name: 'Download HTML', exact: true })).toBeEnabled();
  for (const format of ['html', 'pdf', 'png', 'docx']) {
    await p.getByLabel('Course export format', { exact: true }).selectOption(format);
    const downloaded = p.waitForEvent('download', { timeout: 60000 });
    await p.getByRole('button', { name: 'Download ' + format.toUpperCase(), exact: true }).click();
    const file = await downloaded;
    await file.saveAs(out + '/' + file.suggestedFilename());
    const bytes = await readFile(out + '/' + file.suggestedFilename());
    assert.ok(bytes.length > 1000, format + ' export is empty');
    if (format === 'html') {
      assert.ok(bytes.toString().includes('6.00 m'));
      assert.ok(!bytes.toString().includes('class="course-queue"'));
    }
    if (format === 'pdf') assert.equal(bytes.subarray(0, 4).toString(), '%PDF');
    if (format === 'png' || format === 'docx') {
      const JSZip = (await import('jszip')).default;
      const zip = await JSZip.loadAsync(bytes);
      if (format === 'png')
        assert.ok(Object.keys(zip.files).filter((n) => n.endsWith('.png')).length >= 2);
      else {
        assert.ok((await zip.file('word/document.xml').async('string')).includes('6.00 m'));
        assert.ok(
          Object.keys(zip.files).some((n) => n.startsWith('word/media/') && !zip.files[n].dir),
          'Word export must include the diagram',
        );
      }
    }
  }
  for (const width of [1440, 1280, 390, 320]) {
    await p.setViewportSize({ width, height: 1000 });
    assert.equal(
      await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
      'Library overflow ' + width,
    );
  }
  await p.setViewportSize({ width: 1440, height: 1000 });
  await p.screenshot({ path: out + '/course-library.png', fullPage: true });
  await p.getByRole('link', { name: 'Use this course', exact: true }).click();
  await expect(p.getByLabel('Setup name', { exact: true })).toHaveValue(course.title);
  await expect(p.getByRole('button', { name: 'Saved to library', exact: true })).toBeDisabled();
  await p.reload();
  await expect(p.getByLabel('Setup name', { exact: true })).toHaveValue(course.title);
  await p.goto(base + '/dashboard/cheatsheets');
  await expect(
    p.getByRole('heading', { name: 'The cheat sheet library.', exact: true }),
  ).toBeVisible();
  await expect(
    p.getByRole('heading', { name: 'The Division C sheet library', exact: true }),
  ).toBeVisible();
  await expect(
    p
      .getByRole('navigation', { name: 'Reference libraries' })
      .getByRole('link', { name: 'Cheat sheets', exact: true }),
  ).toHaveAttribute('aria-current', 'page');
  await p
    .getByRole('navigation', { name: 'Reference libraries' })
    .getByRole('link', { name: 'Binders', exact: true })
    .click();
  await expect(p.getByRole('heading', { name: 'The binder library.', exact: true })).toBeVisible();
  assert.deepEqual(errors, []);
  console.log(
    'Passed: course save failure/retry, shared library, all four document exports (including Word diagram), saved-course reopening/reload, library tabs and mobile layout.',
  );
} finally {
  await browser.close();
}
