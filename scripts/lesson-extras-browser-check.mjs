// Browser coverage for lesson-specific labs, PhET investigations, and activities.
// Uses mocked authentication/API responses; creates no accounts and loads no PhET content
// unless a launch button is clicked. Limit the run with EVENTS=astronomy,botany.
import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { eventExtras, topicLabs } from '../src/lib/extras/index.ts';
import { phetUrl, solutionSequence, termRounds } from '../src/lib/lesson-extras.ts';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3005';
const only = process.env.EVENTS?.split(',');
const shots = process.env.SHOTS === '1';
const out = 'documents/qa/lesson-extras';
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

let labsSeen = 0,
  phetSeen = 0,
  sortsSeen = 0,
  checksSeen = 0;
try {
  await p.goto(base + '/login/student');
  await p.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await p.getByLabel('Password', { exact: true }).fill('qa-test-password');
  await p.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(p).toHaveURL(/dashboard\/student$/);
  for (const event of eventExtras) {
    if (only && !only.includes(event.eventId)) continue;
    const course = lessonsForEvent(event.eventId, 'C');
    await p.goto(`${base}/dashboard/student/events/${event.eventId}/lessons`);
    await expect(p.locator('.lessons-workspace')).toBeVisible();
    for (const [unitIndex, unit] of course.units.entries())
      for (const lessonId of unit.lessonIds) {
        const lesson = course.lessons.find((l) => l.id === lessonId);
        const extras = event.lessons[lessonId] ?? {};
        await p.locator('.unit-button').nth(unitIndex).click();
        await p.locator('.lesson-button', { hasText: lesson.title }).first().click();
        await expect(p.locator('#current-lesson-title')).toHaveText(lesson.title);

        const activities = p.locator('#lesson-activities');
        await expect(activities).toBeVisible();
        if (termRounds(lesson).length)
          await expect(activities.locator('.la-terms > li')).toHaveCount(termRounds(lesson).length);
        const sequence = solutionSequence(lesson);
        if (sequence) {
          await expect(activities.locator('.la-order > li')).toHaveCount(sequence.answer.length);
          await activities.getByRole('button', { name: 'Check order' }).click();
          await expect(activities.locator('.la-order > li[data-state]')).toHaveCount(
            sequence.answer.length,
          );
        }
        if (extras.sort) {
          sortsSeen++;
          const board = activities.locator('.la-card', { hasText: extras.sort.title });
          await expect(board.locator('.la-sort > li')).toHaveCount(extras.sort.items.length);
          for (const [text, bin] of extras.sort.items)
            await board
              .locator('.la-sort > li', { hasText: text })
              .first()
              .getByRole('button', { name: extras.sort.bins[bin], exact: true })
              .click();
          await board.getByRole('button', { name: 'Check classification' }).click();
          await expect(board.locator('.la-sort > li[data-state="right"]')).toHaveCount(
            extras.sort.items.length,
          );
        }
        for (const check of extras.checks ?? []) {
          checksSeen++;
          const card = p.locator('.lesson-reading .la-check', { hasText: check.q });
          await expect(card).toHaveCount(1);
          await card.locator('.tl-option').nth(check.correct).click();
          await expect(card.locator('.tl-feedback')).toHaveAttribute('data-correct', 'true');
        }
        for (const id of extras.labs ?? []) {
          labsSeen++;
          const lab = topicLabs[id];
          const view = p.locator(`#topic-lab-${id}`);
          await expect(view).toBeVisible();
          await expect(view.locator('.tl-missions li')).toHaveCount(lab.missions.length);
          for (const control of lab.controls.filter((c) => !c.options && !c.toggle)) {
            const input = view.getByLabel(control.label, { exact: true });
            for (const value of [control.min, control.max, control.initial]) {
              await input.fill(String(value));
              assert(
                !/NaN|Infinity|undefined/.test(await view.locator('.tl-bench').innerHTML()),
                `${id} ${control.key}=${value}`,
              );
              assert(
                !/NaN|Infinity/.test(await view.locator('.tl-metrics').innerText()),
                `${id} metrics`,
              );
            }
          }
          await view.locator('.tl-predict .tl-option').nth(lab.predict.correct).click();
          await view.getByRole('button', { name: 'Check my prediction' }).click();
          await expect(view.locator('.tl-feedback')).toHaveAttribute('data-correct', 'true');
          await view.getByRole('button', { name: /Record data row/ }).click();
          await expect(view.locator('.tl-table tbody tr')).toHaveCount(1);
          await view.getByRole('button', { name: 'Reset lab' }).click();
          await expect(view.locator('.tl-table')).toHaveCount(0);
          if (extras.labs[0] === id)
            await expect(p.locator('.lesson-reading .tl-preview')).toHaveCount(1);
        }
        for (const embed of extras.phet ?? []) {
          phetSeen++;
          const sim = p.locator(`#phet-${lessonId}-${embed.sim}`);
          await expect(sim).toBeVisible();
          await expect(sim.locator('.phet-tasks label')).toHaveCount(embed.tasks.length);
          await expect(sim.locator('iframe')).toHaveCount(0);
          await sim.locator('.phet-launch').click();
          await expect(sim.locator('iframe')).toHaveAttribute('src', phetUrl(embed.sim));
          await sim.getByRole('button', { name: 'Close simulation' }).click();
          await expect(sim.locator('iframe')).toHaveCount(0);
          await expect(sim.locator('.phet-credit')).toContainText(
            'PhET Interactive Simulations, University of Colorado Boulder',
          );
        }
        // The page must never scroll sideways, at desktop or phone width.
        for (const width of [1440, 390]) {
          await p.setViewportSize({ width, height: 900 });
          const overflow = await p.evaluate(
            () => document.documentElement.scrollWidth - window.innerWidth,
          );
          assert(overflow <= 1, `${lessonId} overflows by ${overflow}px at ${width}`);
        }
        await p.setViewportSize({ width: 1440, height: 1000 });
        if (shots && unitIndex < 3) {
          for (const sel of ['#lesson-topic-labs', '#lesson-activities']) {
            const target = p.locator(sel);
            if (await target.count())
              await target.screenshot({ path: `${out}/${lessonId}-${sel.slice(8)}.png` });
          }
        }
      }
  }
  assert.deepEqual(errors, []);
  console.log(
    `Lesson extras verified: ${labsSeen} lab placements, ${phetSeen} PhET investigations, ${sortsSeen} classification boards, ${checksSeen} inline checks.`,
  );
} finally {
  await browser.close();
}
