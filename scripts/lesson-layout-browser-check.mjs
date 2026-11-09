import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import { registerMember, dashboardFor } from '../src/lib/school-service.ts';
import * as notes from '../src/lib/note-service.ts';

// Lesson layout check: the contents rail collapses and the notes panel resizes. Mocked sign-in,
// the real note service over an in-memory database.
// Run with TEST_BASE_URL=http://127.0.0.1:3006 node --experimental-strip-types scripts/lesson-layout-browser-check.mjs
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3006';
const shots = 'documents/qa/lesson-layout';
await mkdir(shots, { recursive: true });

const raw = new DatabaseSync(':memory:');
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
  { role: 'instructor', displayName: 'Coach', instructorInvitePassword: 'qa', schoolCommunityId: 'ppchs' },
  'qa',
);
const student = (
  await registerMember(
    db,
    identity('amy'),
    { role: 'student', displayName: 'Amy Chen', division: 'C', schoolPassword: teacher.credentials.joiningPassword },
    'qa',
  )
).profile;

async function api(route, profile) {
  const request = route.request();
  const url = new URL(request.url());
  const method = request.method();
  const body = method === 'POST' ? request.postDataJSON() : {};
  const notesApi = async () => {
    if (method === 'POST') {
      const actions = {
        createNotebook: () => notes.createNotebook(db, profile, body),
        updateNotebook: () => notes.updateNotebook(db, profile, body),
        deleteNotebook: () => notes.deleteNotebook(db, profile, body.id),
        createNote: () => notes.createNote(db, profile, body),
        updateNote: () => notes.updateNote(db, profile, body),
        trashNote: () => notes.trashNote(db, profile, body.id),
        restoreNote: () => notes.trashNote(db, profile, body.id, true),
        deleteNote: () => notes.deleteNote(db, profile, body.id),
        emptyTrash: () => notes.emptyTrash(db, profile),
        image: () => notes.saveImage(db, profile, body),
        context: () => notes.contextNote(db, profile, body),
        lessonDraft: () => notes.lessonDraft(profile, body),
        generate: () => notes.generateEventNotebook(db, profile, body),
      };
      return actions[body.action]();
    }
    const p = url.searchParams;
    if (p.has('id')) return notes.readNote(db, profile, p.get('id'));
    if (p.has('images')) return notes.readImages(db, profile, p.get('images'));
    if (p.has('q')) return notes.searchNotes(db, profile, p.get('q'));
    return notes.listNotes(db, profile);
  };
  const handlers = {
    '/api/auth/profile': () => profile,
    '/api/dashboard': () => dashboardFor(db, profile),
    '/api/notes': notesApi,
    '/api/lessons/progress': () => ({ answers: [], parts: [] }),
  };
  try {
    return route.fulfill({ json: (await handlers[url.pathname]?.()) ?? [] });
  } catch (error) {
    return route.fulfill({ status: error.status ?? 500, json: { error: error.message } });
  }
}

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const page = await context.newPage();
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
  if (m.type() === 'error' && !/Failed to load resource|hydrat/i.test(m.text())) errors.push(m.text());
});
const part = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
const token = `${part({ alg: 'none' })}.${part({
  sub: student.id,
  user_id: student.id,
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 3600,
  aud: 'qa',
  iss: 'https://securetoken.google.com/qa',
  firebase: { sign_in_provider: 'password' },
})}.signature`;
const user = { localId: student.id, email: 'qa@example.test' };
await page.route('https://identitytoolkit.googleapis.com/**', (route) =>
  route.fulfill({
    json: route.request().url().includes('signInWithPassword')
      ? { ...user, idToken: token, refreshToken: 'qa-refresh', expiresIn: '3600', registered: true }
      : { users: [{ ...user, emailVerified: true, providerUserInfo: [{ providerId: 'password', email: user.email, federatedId: user.email }] }] },
  }),
);
await page.route('**/api/**', (route) => api(route, student));

const fits = async (name) => {
  for (const theme of ['dark', 'light']) {
    await page.evaluate((value) => (document.documentElement.dataset.theme = value), theme);
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(150);
      const wide = await page.evaluate(() =>
        document.documentElement.scrollWidth > innerWidth + 1
          ? [...document.querySelectorAll('body *')]
              .filter((e) => e.getBoundingClientRect().right > innerWidth + 1)
              .slice(0, 6)
              .map((e) => `${e.tagName}.${e.getAttribute('class')} ${Math.round(e.getBoundingClientRect().right)}`)
          : [],
      );
      assert.deepEqual(wide, [], `${name} ${theme} ${width}: horizontal overflow`);
      await page.screenshot({ path: `${shots}/${name}-${theme}-${width}.png` });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => (document.documentElement.dataset.theme = 'dark'));
};

try {
  await page.goto(`${base}/login/student`);
  await page.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await page.getByLabel('Password', { exact: true }).fill('qa-browser-only-password');
  await page.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard\/student$/);
  await page.goto(`${base}/dashboard/student/events/remote-sensing/lessons`);
  const learn = page.locator('#lesson-stage-learn');
  const main = learn.locator('.lf-learn-main');
  await expect(learn.locator('.lf-toc')).toBeVisible({ timeout: 20000 });
  const openWidth = (await main.boundingBox()).width;

  // The contents rail collapses to a button on the right; the reading column widens.
  await learn.getByRole('button', { name: 'Hide lesson contents' }).click();
  await expect(learn.locator('#lf-toc-list')).toBeHidden();
  const closedWidth = (await main.boundingBox()).width;
  assert.ok(closedWidth > openWidth + 150, `reading column grew ${openWidth} → ${closedWidth}`);
  await page.screenshot({ path: `${shots}/toc-collapsed.png` });
  await page.reload();
  await expect(learn.getByRole('button', { name: 'Show lesson contents' })).toBeVisible({ timeout: 20000 });
  await learn.getByRole('button', { name: 'Show lesson contents' }).click();
  await expect(learn.locator('#lf-toc-list')).toBeVisible();

  // The notes panel resizes from its left edge, and the page makes room for it.
  await page.locator('.nb-dock-tab').click();
  const dock = page.locator('.nb-dock');
  await expect(dock).toBeVisible();
  const start = (await dock.boundingBox()).width;
  const handle = dock.locator('.nb-dock-resize');
  const h = await handle.boundingBox();
  await page.mouse.move(h.x + h.width / 2, h.y + 300);
  await page.mouse.down();
  await page.mouse.move(h.x + h.width / 2 - 180, h.y + 300, { steps: 8 });
  await page.mouse.up();
  const wider = (await dock.boundingBox()).width;
  assert.ok(Math.abs(wider - (start + 180)) < 12, `drag widened dock ${start} → ${wider}`);
  const pad = await page.evaluate(() => parseFloat(getComputedStyle(document.body).paddingRight));
  assert.ok(Math.abs(pad - wider) < 2, `page padding ${pad} matches dock ${wider}`);
  await page.screenshot({ path: `${shots}/dock-wide.png` });
  await handle.focus();
  await page.keyboard.press('ArrowRight');
  assert.ok((await dock.boundingBox()).width < wider - 15, 'arrow key narrows dock');
  await handle.dblclick();
  assert.ok(Math.abs((await dock.boundingBox()).width - 420) < 2, 'double-click resets');
  const h2 = await handle.boundingBox();
  await page.mouse.move(h2.x + h2.width / 2, h2.y + 300);
  await page.mouse.down();
  await page.mouse.move(5, h2.y + 300, { steps: 6 });
  await page.mouse.up();
  const capped = (await dock.boundingBox()).width;
  assert.ok(capped <= 900 && capped > 850, `width is capped (${capped})`);
  await page.reload();
  await expect(page.locator('.nb-dock')).toBeVisible({ timeout: 20000 });
  assert.ok(Math.abs((await page.locator('.nb-dock').boundingBox()).width - capped) < 2, 'width is remembered');
  await page.screenshot({ path: `${shots}/dock-max.png` });
  assert.deepEqual(errors, []);
  console.log('lesson layout check passed', { openWidth, closedWidth, start, wider, capped });
} finally {
  await browser.close();
}
