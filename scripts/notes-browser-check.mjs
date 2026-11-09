import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import { registerMember, dashboardFor } from '../src/lib/school-service.ts';
import * as notes from '../src/lib/note-service.ts';

// Notebook check: mocked sign-in, the real note service over an in-memory database.
// Run with TEST_BASE_URL=http://127.0.0.1:3006 node --experimental-strip-types scripts/notes-browser-check.mjs
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3006';
const shots = 'documents/qa/notes';
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

  // The Notes tab sits in the top bar.
  await page.locator('.lx-nav').getByRole('link', { name: 'Notes' }).click();
  await expect(page).toHaveURL(/\/notes/);
  await expect(page.getByRole('heading', { name: /Write it in your words/ })).toBeVisible();
  await page.screenshot({ path: `${shots}/welcome.png` });

  // Auto-build: Astronomy's lessons become a notebook.
  await page.getByRole('button', { name: 'Build notes from my lessons' }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('Astronomy').check();
  await dialog.getByRole('button', { name: /Build 1 notebook/ }).click();
  await expect(page.locator('.nb-notice')).toContainText(/Added \d+ pages/);
  const book = page.locator('.nb-book', { hasText: 'Astronomy' });
  await expect(book).toHaveAttribute('data-slot', 'purple');
  await book.locator('.nb-row', { hasText: 'Astronomy overview' }).click();
  // Tree rows stay compact (a row once inherited the page wrapper's full-screen height).
  assert.ok((await book.locator('.nb-row').first().boundingBox()).height < 40);
  await expect(page.locator('.nb-title')).toHaveValue('Astronomy overview');
  await expect(page.locator('.nb-content a[data-wikilink]').first()).toBeVisible();
  // Following a [[link]] opens the unit page; its backlinks list the overview.
  await page.locator('.nb-content a[data-wikilink]').first().click();
  await expect(page.locator('.nb-title')).toHaveValue(/\(unit\)$/);
  await expect(page.locator('.nb-backlinks')).toContainText('Astronomy overview');
  await page.locator('.nb-content a[data-wikilink]').nth(1).click();
  await expect(page.locator('.nb-content mark[data-color="yellow"]').first()).toBeVisible();
  await expect(page.locator('.nb-graph')).toBeVisible();
  await page.screenshot({ path: `${shots}/lesson-page.png` });
  const lessonTitle = await page.locator('.nb-title').inputValue();

  // A new page: title, markdown shortcuts, highlight, [[ autocomplete, an image pasted in.
  await book.locator('.nb-book-head').hover();
  await book.getByRole('button', { name: 'New page in Astronomy' }).click();
  await page.getByRole('menuitem', { name: /Blank page/ }).click();
  await expect(page.locator('.nb-title')).toHaveValue('Untitled');
  await page.locator('.nb-title').fill('My star notes');
  await page.locator('.nb-title').press('Enter');
  const editor = page.locator('.nb-main .nb-content');
  await editor.click();
  await page.keyboard.type('# Life of a star');
  await page.keyboard.press('Enter');
  await page.keyboard.type('- Mass decides the ending');
  await expect(editor.locator('h1')).toHaveText('Life of a star');
  await expect(editor.locator('ul li')).toHaveText('Mass decides the ending');
  // Highlight the word "Mass".
  await editor.locator('ul li').evaluate((li) => {
    const range = document.createRange();
    range.setStart(li.firstChild, 0);
    range.setEnd(li.firstChild, 4);
    getSelection().removeAllRanges();
    getSelection().addRange(range);
  });
  await page.keyboard.press('Control+Shift+H');
  await expect(editor.locator('mark[data-color="yellow"]')).toHaveText('Mass');
  await page.keyboard.press('End');
  await page.keyboard.press('Enter');
  await page.keyboard.type(`See [[${lessonTitle.slice(0, 6)}`);
  await expect(page.locator('.nb-suggest')).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(editor.locator('a[data-wikilink]')).toHaveText(lessonTitle);
  await page.keyboard.type('#review');
  // Paste a screenshot.
  await editor.evaluate(async (el) => {
    const canvas = Object.assign(document.createElement('canvas'), { width: 320, height: 180 });
    const g = canvas.getContext('2d');
    g.fillStyle = '#4d7cff';
    g.fillRect(0, 0, 320, 180);
    g.fillStyle = '#fff';
    g.font = '28px sans-serif';
    g.fillText('H–R diagram', 60, 100);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    const data = new DataTransfer();
    data.items.add(new File([blob], 'image.png', { type: 'image/png' }));
    el.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }));
  });
  await expect(editor.locator('img[data-img]')).toHaveAttribute('src', /^data:image\//);
  await expect(page.locator('.nb-status')).toContainText('Saved', { timeout: 8000 });
  await page.waitForTimeout(1200);
  const saved = raw.prepare("SELECT html, tags_json, links_json FROM notes WHERE title='My star notes'").get();
  assert.match(saved.html, /<h1>Life of a star<\/h1>/);
  assert.match(saved.html, /<mark data-color="yellow">Mass<\/mark>/);
  assert.match(saved.html, /data-img="[0-9a-f-]{36}"/);
  assert.doesNotMatch(saved.html, /src=/);
  assert.deepEqual(JSON.parse(saved.tags_json), ['review']);
  assert.deepEqual(JSON.parse(saved.links_json), [lessonTitle]);
  assert.equal(raw.prepare('SELECT COUNT(*) AS n FROM note_images').get().n, 1);
  await page.screenshot({ path: `${shots}/editing.png` });

  // Reload: the page, its image and its backlink on the lesson page come back from the database.
  await page.reload();
  await expect(page.locator('.nb-title')).toHaveValue('My star notes');
  await expect(page.locator('.nb-main .nb-content img[data-img]')).toHaveAttribute('src', /^data:image\//);
  await page.locator('.nb-main .nb-content a[data-wikilink]').click();
  await expect(page.locator('.nb-backlinks')).toContainText('My star notes');

  // Tag filter and full-text search.
  await page.locator('.nb-tags button', { hasText: '#review' }).click();
  await expect(page.locator('.nb-results')).toContainText('My star notes');
  await page.locator('.nb-results').getByRole('button', { name: 'Clear' }).click();
  await page.getByPlaceholder('Search notes').fill('decides the ending');
  await expect(page.locator('.nb-results .nb-result', { hasText: 'My star notes' })).toBeVisible();
  await page.getByPlaceholder('Search notes').fill('');

  // Trash and restore.
  await page.locator('.nb-tab', { hasText: 'My star notes' }).getByRole('tab').click();
  await page.getByRole('button', { name: 'Move page to trash' }).click();
  await page.getByRole('button', { name: /^Trash/ }).click();
  await expect(page.locator('.nb-trash-list')).toContainText('My star notes');
  await page.locator('.nb-trash-list li', { hasText: 'My star notes' }).getByRole('button', { name: 'Restore' }).click();
  await expect(page.locator('.nb-trash-list')).toHaveCount(0);
  await fits('notes');

  // Beside a lesson: the Notes tab opens the lesson's own page; selected text clips into it.
  await page.goto(`${base}/dashboard/student/events/astronomy/lessons`);
  await page.locator('.nb-dock-tab').click();
  const dock = page.locator('.nb-dock');
  await expect(dock.locator('.nb-dock-book')).toContainText('Astronomy');
  await expect(dock.locator('select')).toBeVisible();
  const before = await dock.locator('.nb-content blockquote').count();
  const clipped = await page.evaluate(() => {
    const paragraph = [...document.querySelectorAll('#main p')].find(
      (p) => !p.closest('.nb-dock') && p.textContent.trim().length > 60,
    );
    const range = document.createRange();
    range.selectNodeContents(paragraph);
    getSelection().removeAllRanges();
    getSelection().addRange(range);
    paragraph.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    return paragraph.textContent.replace(/\s+/g, ' ').trim().slice(0, 30);
  });
  await page.locator('.nb-clip').getByRole('button', { name: 'Add to notes' }).click();
  await expect(dock.locator('.nb-content blockquote')).toHaveCount(before + 1);
  await expect(dock.locator('.nb-content blockquote mark').last()).toContainText(clipped.slice(0, 20));
  await page.screenshot({ path: `${shots}/dock-lesson.png` });
  await expect(dock.locator('.nb-dock-foot')).toContainText('Saved', { timeout: 8000 });

  // Beside the practice tests list: a page for that tool.
  await page.goto(`${base}/dashboard/student/events/astronomy/practice-tests`);
  await expect(page.getByRole('heading', { name: 'Practice tests', level: 1 })).toBeVisible({ timeout: 30000 });
  await page.screenshot({ path: `${shots}/practice-tests.png` });
  await expect(page.locator('.nb-dock .nb-dock-book')).toContainText('Astronomy', { timeout: 15000 });
  await expect(page.locator('.nb-dock select')).toContainText('● Practice Tests');
  await page.setViewportSize({ width: 390, height: 860 });
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${shots}/dock-mobile.png` });

  assert.deepEqual(errors, []);
  console.log('Notes browser check passed. Screenshots in', shots);
} finally {
  await browser.close();
}
