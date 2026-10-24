import { modelControls } from '../src/lib/lesson-models.ts';
// Scientific artwork: model bounds, legible labels, theme previews, anatomy and apparatus.
// Auth and API responses are mocked; no real accounts or notebooks are changed.
import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { topicLabs, extrasFor } from '../src/lib/extras/index.ts';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3005';
const division = process.env.DIVISION || 'C';
const out = 'output/scientific-art';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const p = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
});
const errors = [];
p.on('pageerror', (error) => errors.push(error.message));
p.on('console', (message) => {
  if (message.type() === 'error' && !/Failed to load resource|net::ERR/.test(message.text()))
    errors.push(message.text());
});
await p.addInitScript(() => {
  try {
    localStorage.setItem('ako-preferences', JSON.stringify({ visible: false, muted: true }));
  } catch {
    // Blocked sub-frames (aborted remote embeds) have no storage; the app itself is unaffected.
  }
});
const profile = {
  id: 'qa-student',
  role: 'student',
  displayName: 'Ada',
  schoolId: 'qa-school',
  schoolName: 'Science Team',
  schoolCommunityName: 'Science Team',
  schoolCommunityId: 'ppchs',
  division,
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
await p.route('**/api/**', async (route) => {
  const url = new URL(route.request().url());
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
  return route.fulfill({ json: [] });
});
// Remote figures and PhET content are not needed to verify structure; keep the run offline.
await p.route(
  /phet\.colorado\.edu|wikimedia\.org|openstax\.org|opentextbc\.ca|rcsb\.org|noaa\.gov|nasa\.gov|usgs\.gov|cdc\.gov|libretexts\.org/,
  (route) => route.abort(),
);
try {
  await p.goto(base + '/login/student');
  await p.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await p.getByLabel('Password', { exact: true }).fill('qa-test-password');
  await p.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await p.waitForURL(/dashboard\/student$/, { timeout: 30000 });
  const seen = new Set();
  for (const eventId of ['anatomy-and-physiology', 'forensics']) {
    const course = lessonsForEvent(eventId, 'C');
    await p.goto(`${base}/dashboard/student/events/${eventId}/lessons`);
    for (const lesson of course.lessons) {
      if (lesson.simulation.kind !== 'model' || seen.has(lesson.simulation.model)) continue;
      const model = lesson.simulation.model;
      await p
        .locator('.unit-button')
        .nth(course.units.findIndex((u) => u.lessonIds.includes(lesson.id)))
        .click();
      await p.locator('.lesson-button', { hasText: lesson.title }).first().click();
      const art = p.locator('.scientific-model');
      await expect(art).toBeVisible();
      for (const control of modelControls[model]) {
        const slider = p
          .locator('#lesson-lab')
          .getByRole('slider', { name: control.label, exact: true });
        for (const value of [control.min, control.max, control.initial]) {
          await slider.fill(String(value));
          assert(
            !/NaN|Infinity/.test(await art.locator('svg').innerHTML()),
            `${model}: finite geometry`,
          );
          const clipped = await art.locator('svg').evaluate((svg) =>
            [...svg.querySelectorAll('text')]
              .filter((el) => {
                const b = el.getBBox();
                return b.x < 0 || b.y < 0 || b.x + b.width > 760 || b.y + b.height > 430;
              })
              .map((el) => el.textContent),
          );
          assert.deepEqual(
            clipped,
            [],
            `${model}: all labels inside drawing at ${control.key}=${value}`,
          );
        }
      }
      for (const theme of ['light', 'dark']) {
        await p.evaluate((t) => (document.documentElement.dataset.theme = t), theme);
        await art.screenshot({ path: `${out}/${model}-${theme}.png` });
      }
      await p.setViewportSize({ width: 390, height: 900 });
      assert(
        await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        `${model}: mobile overflow`,
      );
      await p.setViewportSize({ width: 1440, height: 1000 });
      seen.add(model);
    }
  }
  assert.equal(seen.size, 10);
  for (const [d, eventId, labId] of [
    ['C', 'anatomy-and-physiology', 'anat-planes'],
    ['C', 'anatomy-and-physiology', 'anat-airways'],
    ['B', 'crime-busters', 'cb-medulla'],
  ]) {
    profile.division = d;
    const course = lessonsForEvent(eventId, d),
      lesson = course.lessons.find((l) => extrasFor(l.id, l).labs?.includes(labId));
    await p.goto(`${base}/dashboard/student/events/${eventId}/lessons`);
    await p
      .locator('.unit-button')
      .nth(course.units.findIndex((u) => u.lessonIds.includes(lesson.id)))
      .click();
    await p.locator('.lesson-button', { hasText: lesson.title }).first().click();
    const art = p.locator(`#topic-lab-${labId} .tl-stage .diagram-inspector`).first();
    await expect(art).toBeVisible();
    await art.screenshot({ path: `${out}/${labId}.png` });
  }
  profile.division = 'C';
  const proteinCourse = lessonsForEvent('protein-modeling', 'C');
  const proteinLesson = proteinCourse.lessons.find(
    (l) => l.simulation.kind === 'explorer' && l.simulation.lab === 'protein',
  );
  await p.goto(base + '/dashboard/student/events/protein-modeling/lessons');
  await p
    .locator('.unit-button')
    .nth(proteinCourse.units.findIndex((u) => u.lessonIds.includes(proteinLesson.id)))
    .click();
  await p.locator('.lesson-button', { hasText: proteinLesson.title }).first().click();
  const protein = p.locator('#lesson-lab .subject-figure').first();
  await expect(protein).toBeVisible();
  await protein.screenshot({ path: out + '/protein-chain.png' });
  for (const eventId of ['chemistry-lab', 'circuit-lab', 'water-quality', 'forensics']) {
    await p.goto(base + '/dashboard/student/events/' + eventId + '/lab-practice');
    const bench = p.locator('.archive-bench-diagram');
    await expect(bench).toBeVisible();
    await bench.screenshot({ path: out + '/' + eventId + '-apparatus.png' });
  }
  assert.deepEqual(errors, []);
  console.log(
    'Artwork verified: all 10 core models at control boundaries, no clipped labels, both themes and mobile width; detailed B microscopy and C anatomy scenes rendered.',
  );
} finally {
  await browser.close();
}
