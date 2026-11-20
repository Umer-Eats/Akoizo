// Run with: node --import ./tests/enrollment-env.mjs --experimental-strip-types scripts/presentations-browser-check.mjs
// The presentation API is answered by the real presentation service over an in-memory database,
// so solo grading, hosting, joining, answering, revealing and ending are all exercised end to end.
import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import { registerMember } from '../src/lib/school-service.ts';
import { AppError } from '../src/lib/domain.ts';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';
import { deckFor } from '../src/lib/presentations.ts';
import { isGraded } from '../src/lib/presentation-types.ts';
import * as service from '../src/lib/presentation-service.ts';
import { mockLessonApi } from './lib-mock-session.mjs';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3005';
const shots = process.env.SHOTS_DIR || 'documents/qa/presentations';
await mkdir(shots, { recursive: true });
const course = lessonsForEvent('remote-sensing', 'C');

const raw = new DatabaseSync(':memory:');
raw.exec('PRAGMA foreign_keys=ON');
for (const sql of schema) raw.exec(sql);
for (const seed of eventSeeds) raw.prepare(seed.sql).run(...seed.args);
const db = {
  async get(sql, ...args) {
    return raw.prepare(sql).get(...args);
  },
  async all(sql, ...args) {
    return raw.prepare(sql).all(...args);
  },
  async batch(statements) {
    raw.exec('BEGIN IMMEDIATE');
    try {
      const out = statements.map(({ sql, args }) => ({ rowsAffected: Number(raw.prepare(sql).run(...args).changes), rows: [] }));
      raw.exec('COMMIT');
      return out;
    } catch (error) {
      raw.exec('ROLLBACK');
      throw error;
    }
  },
};
const teacher = await registerMember(
  db,
  { uid: 'teacher', email: 'teacher@example.test' },
  { role: 'instructor', displayName: 'Ms. Rivera', instructorInvitePassword: 'invite', schoolCommunityId: 'ppchs' },
  'invite',
);
const student = async (name) =>
  (
    await registerMember(
      db,
      { uid: name, email: `${name}@example.test` },
      { role: 'student', displayName: name, division: 'C', schoolPassword: teacher.credentials.joiningPassword },
      'invite',
    )
  ).profile;
const amy = await student('Amy');
const ben = await student('Ben');

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];

async function api(profile, url, request) {
  const method = request.method();
  const body = method === 'GET' ? {} : JSON.parse(request.postData() || '{}');
  if (url.pathname === '/api/presentations/live') return service.sessionState(db, profile, url.searchParams.get('id'));
  if (method === 'GET') {
    const eventId = url.searchParams.get('eventId');
    return {
      results: await service.presentationResults(db, profile, eventId),
      sessions: await service.liveSessions(db, profile, eventId),
    };
  }
  const actions = {
    finish: service.finishSolo,
    host: service.hostSession,
    join: service.joinSession,
    answer: service.answerSlide,
    control: service.controlSession,
    end: service.controlSession,
  };
  return actions[body.action](db, profile, body);
}

async function openAs(profile) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  page.on('pageerror', (error) => errors.push(`${profile.displayName}: ${error.message}`));
  page.on('dialog', (dialog) => dialog.accept());
  await page.addInitScript(() =>
    localStorage.setItem('ako-preferences', JSON.stringify({ visible: false, muted: true })),
  );
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({ sub: profile.id, user_id: profile.id, iat: now, exp: now + 3600, aud: 'qa', iss: 'https://securetoken.google.com/qa', firebase: { sign_in_provider: 'password' } }),
  ).toString('base64url');
  const token = Buffer.from('{"alg":"none"}').toString('base64url') + '.' + payload + '.signature';
  const email = `${profile.displayName}@example.test`;
  await page.route('https://identitytoolkit.googleapis.com/**', (route) =>
    route.fulfill({
      json: route.request().url().includes('signInWithPassword')
        ? { localId: profile.id, email, idToken: token, refreshToken: 'qa', expiresIn: '3600', registered: true }
        : { users: [{ localId: profile.id, email, emailVerified: true, providerUserInfo: [{ providerId: 'password', email, federatedId: email }] }] },
    }),
  );
  const shown = { schoolName: 'Science Team', schoolCommunityName: 'Science Team', schoolCommunityId: 'ppchs', ...profile };
  const lessonAnswers = [];
  await page.route('**/api/**', async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname === '/api/auth/profile') return route.fulfill({ json: shown });
    if (url.pathname === '/api/dashboard')
      return route.fulfill({ json: { profile: shown, students: [], stats: { lessons: 0, practice: 0, ranked: 0, points: 0 }, assignments: [], progress: {} } });
    if (url.pathname === '/api/event-selections') return route.fulfill({ json: ['remote-sensing'] });
    if (url.pathname.startsWith('/api/lessons/'))
      return route.fulfill({ json: mockLessonApi(url, route.request(), 'C', lessonAnswers) });
    if (url.pathname.startsWith('/api/presentations')) {
      try {
        return route.fulfill({ json: await api(profile, url, route.request()) });
      } catch (error) {
        const status = error instanceof AppError ? error.status : 500;
        console.log('API error', profile.displayName, url.pathname, status, error.message);
        return route.fulfill({ status, json: { error: error.message } });
      }
    }
    return route.fulfill({ json: [] });
  });
  await page.goto(base + '/login/student');
  await page.getByLabel('Email address', { exact: true }).fill(email);
  await page.getByLabel('Password', { exact: true }).fill('qa-test-password');
  await page.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page).toHaveURL(/dashboard\/student$/);
  return page;
}

const tab = `${base}/dashboard/student/events/remote-sensing/presentation`;
try {
  const a = await openAs(amy);
  await a.goto(tab);
  await expect(a.getByRole('heading', { name: /as a presentation/ })).toBeVisible({ timeout: 30000 });
  await expect(a.locator('.presentation-unit')).toHaveCount(course.units.length);
  await expect(a.locator('.presentation-lesson')).toHaveCount(course.lessons.length);
  await a.screenshot({ path: `${shots}/1-list.png`, fullPage: true });

  // Every slide of every deck renders without a page error, at the same 16:9 size, with its
  // content fitting on the page (no scrolling) and every photo loaded.
  const sizes = new Set();
  const fits = [];
  const shotKinds = new Set();
  for (const lesson of course.lessons) {
    const deck = deckFor('C', 'remote-sensing', lesson.id);
    await a.goto(`${tab}?lesson=${lesson.id}`);
    await a.getByRole('button', { name: /Start/ }).click();
    for (let i = 0; i < deck.slides.length; i++) {
      const slide = deck.slides[i];
      await a.getByRole('button', { name: `Go to slide ${i + 1}`, exact: true }).click();
      await expect(a.locator('.presentation-slide')).toHaveAttribute('aria-label', `Slide ${i + 1} of ${deck.slides.length}`);
      await a.locator('.presentation-slide img').evaluateAll((imgs) =>
        Promise.all(imgs.map((img) => img.complete || new Promise((done) => img.addEventListener('load', done, { once: true })))),
      );
      await a.waitForTimeout(60);
      const page = await a.evaluate(() => {
        const slide = document.querySelector('.presentation-slide');
        const body = slide.querySelector('.presentation-slide-body');
        return {
          size: `${slide.clientWidth}x${slide.clientHeight}`,
          fit: Number(getComputedStyle(slide).getPropertyValue('--fit')),
          scrolls: body.style.overflowY === 'auto',
          brokenImages: [...slide.querySelectorAll('img')].filter((img) => !img.naturalWidth).length,
        };
      });
      sizes.add(page.size);
      fits.push([slide.id, slide.kind, page.fit]);
      assert.equal(page.scrolls, false, `${slide.id} (${slide.kind}) fits without scrolling`);
      assert.equal(page.brokenImages, 0, `${slide.id} photos load`);
      const key = slide.image ? `${slide.kind}-photo` : slide.kind;
      if (!shotKinds.has(key)) {
        shotKinds.add(key);
        await a.locator('.presentation-viewport').screenshot({ path: `${shots}/slide-${key}.png` });
      }
    }
  }
  assert.equal(sizes.size, 1, `every slide is the same size: ${[...sizes]}`);
  const tight = fits.filter(([, , fit]) => fit < 0.8);
  console.log(`Slides: ${fits.length} at ${[...sizes]}; ${tight.length} shrunk below 80%:`, tight.map(([id, kind, fit]) => `${id}:${kind}:${fit.toFixed(2)}`).join(' '));
  assert.deepEqual(errors, [], 'no page errors while rendering every slide');

  // Learn by yourself: answer the multiple-choice activities and finish.
  const first = course.units[0].lessonIds[0];
  const deck = deckFor('C', 'remote-sensing', first);
  await a.evaluate(() => localStorage.clear());
  await a.goto(tab);
  await a.locator('.presentation-lesson').first().click();
  await expect(a.getByRole('heading', { level: 3 })).toHaveText(['Learn by yourself', 'Join a presentation', 'Host a presentation']);
  await a.screenshot({ path: `${shots}/2-chooser.png` });
  await a.getByRole('button', { name: /Start/ }).click();
  let mcqs = 0;
  for (let i = 0; i < deck.slides.length; i++) {
    const slide = deck.slides[i];
    await expect(a.locator('.presentation-slide')).toHaveAttribute('aria-label', `Slide ${i + 1} of ${deck.slides.length}`);
    if (slide.kind === 'mcq') {
      await a.locator('.presentation-option', { hasText: slide.options[slide.answer] }).first().click();
      await a.getByRole('button', { name: 'Check answer' }).click();
      await expect(a.getByText(/^Correct!/)).toBeVisible();
      mcqs++;
    }
    if (['diagram', 'explore', 'cards', 'match', 'sort'].includes(slide.kind) && i < 16)
      await a.screenshot({ path: `${shots}/3-solo-${String(i + 1).padStart(2, '0')}-${slide.kind}.png` });
    if (i < deck.slides.length - 1) await a.getByRole('button', { name: /^Next/ }).click();
  }
  await a.getByRole('button', { name: 'Finish presentation' }).click();
  const possible = deck.slides.filter(isGraded).length;
  await expect(a.getByRole('heading', { name: 'Progress saved!' })).toBeVisible();
  await expect(a.getByText(`This run: ${mcqs} of ${possible} activity points`)).toBeVisible();
  await expect(a.locator(".presentation-total")).toContainText(`Your total: ${mcqs} of ${possible} points`);
  await expect(a.locator(".presentation-total")).toContainText("finish the rest another day");
  await a.screenshot({ path: `${shots}/3-solo-finished.png` });
  assert.equal((await service.presentationResults(db, amy, 'remote-sensing'))[0].earned, mcqs);
  await a.getByRole('button', { name: 'Back to presentations' }).click();
  await expect(a.locator('.presentation-progress-badge').first()).toHaveText(`${mcqs}/${possible} activities`);

  // Host a presentation; Ben joins by code from the list page.
  const second = course.units[1].lessonIds[0];
  const liveDeck = deckFor('C', 'remote-sensing', second);
  await a.goto(`${tab}?lesson=${second}`);
  await a.getByRole('button', { name: 'Host now' }).click();
  const code = (await a.locator('.presentation-code').textContent()).trim();
  assert.match(code, /^[A-Z2-9]{6}$/);
  const b = await openAs(ben);
  await b.goto(tab);
  await expect(b.locator('.presentation-live-badge')).toHaveCount(1);
  await b.getByPlaceholder('ABC123').first().fill(code);
  await b.getByRole('button', { name: 'Join', exact: true }).first().click();
  await expect(b.getByText(/Hosted by Amy/)).toBeVisible();
  await expect(a.locator('.presentation-members li')).toHaveCount(2, { timeout: 8000 });

  const target = liveDeck.slides.findIndex((s) => s.kind === 'mcq');
  const mcq = liveDeck.slides[target];
  for (let i = 0; i < target; i++) {
    await a.getByRole('button', { name: /^Next/ }).click();
    await expect(a.locator('.presentation-slide')).toHaveAttribute('aria-label', `Slide ${i + 2} of ${liveDeck.slides.length}`);
  }
  await expect(b.locator('.presentation-slide')).toHaveAttribute('aria-label', `Slide ${target + 1} of ${liveDeck.slides.length}`, { timeout: 8000 });
  await b.locator('.presentation-option', { hasText: mcq.options[mcq.answer] }).first().click();
  await b.getByRole('button', { name: 'Submit answer' }).click();
  await expect(b.getByRole('button', { name: 'Submitted' })).toBeVisible();
  await expect(a.getByRole('button', { name: 'Reveal answers (1/2)' })).toBeVisible({ timeout: 8000 });
  await a.getByRole('button', { name: /Reveal answers/ }).click();
  await expect(b.getByText(/fully correct/)).toBeVisible({ timeout: 8000 });
  await a.screenshot({ path: `${shots}/4-host-revealed.png` });
  await b.screenshot({ path: `${shots}/5-joined-revealed.png` });

  await a.getByRole('button', { name: 'End presentation now' }).click();
  await expect(a.getByRole('heading', { name: 'You ended the presentation.' })).toBeVisible();
  await expect(b.getByRole('heading', { name: 'Amy ended the presentation.' })).toBeVisible({ timeout: 8000 });
  await expect(b.getByText(`This session: 1 of ${liveDeck.slides.filter(isGraded).length} activity points`)).toBeVisible();
  await expect(b.locator(".presentation-total")).toContainText(`Your total: 1 of ${liveDeck.slides.filter(isGraded).length} points`);
  await b.screenshot({ path: `${shots}/5-joined-ended.png` });
  const benResult = await service.presentationResults(db, ben, 'remote-sensing');
  assert.deepEqual(benResult.map((r) => [r.lessonId, r.earned, r.answered, r.completedAt]), [[second, 1, 1, null]]);

  // Narrow screens keep the slide readable.
  await b.setViewportSize({ width: 390, height: 844 });
  await b.goto(`${tab}?lesson=${first}`);
  await b.getByRole('button', { name: /Start/ }).click();
  const diagram = deck.slides.findIndex((s) => s.kind === 'diagram' || (s.kind === 'bullets' && s.diagram));
  await b.getByRole('button', { name: `Go to slide ${diagram + 1}`, exact: true }).click();
  assert.ok(await b.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), 'no sideways scroll on a phone');
  await b.screenshot({ path: `${shots}/6-mobile-diagram.png`, fullPage: true });

  assert.deepEqual(errors, []);
  console.log(`Presentation browser check passed: ${course.lessons.length} decks rendered, solo ${mcqs}/${possible}, live code ${code}.`);
} finally {
  await browser.close();
}
