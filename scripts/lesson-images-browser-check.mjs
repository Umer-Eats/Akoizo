import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3005';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
await mkdir('documents/qa/lessons', { recursive: true });
const p = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
});
const errors = [];
p.on('pageerror', (error) => errors.push(error.message));
await p.addInitScript(() =>
  localStorage.setItem('ako-preferences', JSON.stringify({ visible: false, muted: true })),
);
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
  await expect(p).toHaveURL(/dashboard\/student$/);
  const { additionalLessonFigures } = await import('../src/lib/lesson-reference-expansion.ts');
  const { furtherLessonFigures } = await import('../src/lib/lesson-reference-further.ts');
  const figures =
    process.env.IMAGE_BATCH === 'further'
      ? furtherLessonFigures
      : [...additionalLessonFigures, ...furtherLessonFigures];
  const { yellowPurpleCourses } = await import('../src/lib/lessons-yellow-purple.ts');
  const { blueGreenOrangeCourses } = await import('../src/lib/lessons-blue-green-orange.ts');
  const { anatomyLessons } = await import('../src/lib/lessons-anatomy.ts');
  const { forensicsLessons } = await import('../src/lib/lessons-forensics.ts');
  const courses = [
    ...yellowPurpleCourses,
    ...blueGreenOrangeCourses,
    anatomyLessons,
    forensicsLessons,
  ];
  const failures = [];
  await mkdir('documents/qa/lesson-images', { recursive: true });
  for (const id of new Set(figures.map((f) => f.lessonId))) {
    const course = courses.find((c) => c.lessons.some((l) => l.id === id));
    const lesson = course.lessons.find((l) => l.id === id);
    const unit = course.units.findIndex((u) => u.lessonIds.includes(id));
    await p.goto(`${base}/dashboard/student/events/${course.eventId}/lessons`);
    await p.locator('.unit-button').nth(unit).click();
    await p.locator('.lesson-button').nth(course.units[unit].lessonIds.indexOf(id)).click();
    await expect(p.locator('#current-lesson-title')).toHaveText(lesson.title);
    for (const data of figures.filter((f) => f.lessonId === id)) {
      const figure = p
        .locator('.online-reference')
        .filter({ has: p.getByRole('button', { name: `Enlarge ${data.title}`, exact: true }) });
      try {
        await figure.scrollIntoViewIfNeeded();
        await expect
          .poll(
            () =>
              figure
                .locator('img')
                .first()
                .evaluate((n) => n.complete && n.naturalWidth > 0)
                .catch(() => false),
            { timeout: 25000 },
          )
          .toBe(true);
        const dimensions = await figure
          .locator('img')
          .first()
          .evaluate((n) => [n.naturalWidth, n.naturalHeight]);
        await expect(figure.locator('.atlas-credit')).toContainText(data.author);
        await expect(figure).toContainText(data.prompt);
        await figure.getByRole('button', { name: /^Enlarge / }).click();
        await expect(figure.getByRole('dialog')).toBeVisible();
        await figure.getByRole('slider').fill('200');
        for (const width of [390, 320]) {
          await p.setViewportSize({ width, height: 900 });
          assert.equal(
            await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
            false,
          );
        }
        for (const theme of ['light', 'dark']) {
          await p.evaluate((t) => (document.documentElement.dataset.theme = t), theme);
          assert.equal(
            await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
            false,
          );
        }
        await figure.getByRole('region', { name: 'Enlarged reference figure viewer' }).focus();
        await p.keyboard.press('ArrowRight');
        await p.keyboard.press('Escape');
        await expect(figure.getByRole('dialog')).not.toBeVisible();
        await p.setViewportSize({ width: 1100, height: 1000 });
        await figure.screenshot({
          path: `documents/qa/lesson-images/${id}-${figures.indexOf(data)}.png`,
        });
        console.log('PASS', id, data.title, dimensions.join('x'));
      } catch (e) {
        failures.push(`${id}: ${data.title}: ${e.message.slice(0, 180)}`);
        console.log('FAIL', failures.at(-1));
        await p.keyboard.press('Escape');
      }
      await p.setViewportSize({ width: 1440, height: 1000 });
    }
  }
  const blocked = figures[0];
  await p.route(blocked.src, (route) => route.abort());
  const blockedCourse = courses.find((c) => c.lessons.some((l) => l.id === blocked.lessonId));
  const blockedUnit = blockedCourse.units.findIndex((u) => u.lessonIds.includes(blocked.lessonId));
  await p.goto(`${base}/dashboard/student/events/${blockedCourse.eventId}/lessons`);
  await p.locator('.unit-button').nth(blockedUnit).click();
  await p
    .locator('.lesson-button')
    .nth(blockedCourse.units[blockedUnit].lessonIds.indexOf(blocked.lessonId))
    .click();
  const unavailable = p.locator('.online-reference').filter({ hasText: blocked.title });
  await unavailable.scrollIntoViewIfNeeded();
  await expect(unavailable.getByRole('status')).toContainText('could not load');
  await expect(
    unavailable.getByRole('link', { name: /View it on the source page/ }),
  ).toHaveAttribute('href', blocked.source);
  assert.deepEqual(errors, []);
  assert.deepEqual(failures, []);
  console.log(
    `PASS: ${figures.length} external figures, relevant lessons, credits, prompts, zoom, Escape, keyboard access, 320/390 layouts.`,
  );
} finally {
  await browser.close();
}
