import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';
import { openStage } from './lib-lesson-stage.mjs';
import { mockLessonApi, mockSession, signIn } from './lib-mock-session.mjs';

// An unfinished checkpoint is saved as the student goes: it reopens on the checkpoint, at the
// question they were on, with unchecked answers kept, on this browser and on another device.
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3006';
const lesson = lessonsForEvent('forensics', 'C').lessons[0];
const url = `${base}/dashboard/student/events/forensics/lessons`;
const short = lesson.practice.findIndex((q) => q.type === 'short');
const [q1, q2] = lesson.practice;
const wrong2 = q2.options.find((o) => o !== q2.answer);
const draft = 'Fibers transfer on contact, so';
await mkdir('documents/qa/lessons', { recursive: true });

// One server-side store shared by both "devices".
const answers = [];
const drafts = [];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
async function device() {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(error.message));
  await mockSession(page, {
    api: (u, request) =>
      u.pathname.startsWith('/api/lessons/') && u.pathname !== '/api/lessons/ako'
        ? mockLessonApi(u, request, 'C', answers, drafts)
        : undefined,
  });
  await signIn(page, base);
  await page.goto(url);
  await expect(page.locator('#current-lesson-title')).toHaveText(lesson.title);
  return page;
}
const dot = (page, i) =>
  page.locator('#lesson-practice').getByRole('button', { name: new RegExp(`^Question ${i + 1},`) });
const draftFor = (i) => drafts.find((d) => d.questionId === lesson.practice[i].id)?.answer;

try {
  const a = await device();
  // A fresh lesson starts on the reading.
  await expect(a.locator('#lesson-stage-learn')).toBeVisible();
  await openStage(a, 'checkpoint');
  const quiz = a.locator('#lesson-practice');
  await quiz.getByRole('radio', { name: q1.answer, exact: true }).check();
  await quiz.getByRole('button', { name: 'Check answer', exact: true }).click();
  await expect(dot(a, 0)).toHaveAttribute('data-state', 'correct');
  // Choose an answer to question 2 without checking it, then start the written answer.
  await dot(a, 1).click();
  await quiz.getByRole('radio', { name: wrong2, exact: true }).check();
  await dot(a, short).click();
  await quiz.getByRole('textbox').fill(draft);
  await expect.poll(() => draftFor(short), { timeout: 5000 }).toBe(draft);
  assert.equal(draftFor(1), wrong2);
  assert.equal(draftFor(0), undefined, 'a checked question keeps no draft');

  // Same browser, after a reload: back on the checkpoint, at the written question.
  await a.reload();
  await expect(a.locator('#lesson-stage-checkpoint')).toBeVisible();
  await expect(dot(a, short)).toHaveAttribute('aria-current', 'step');
  await expect(a.locator('#lesson-practice textarea')).toHaveValue(draft);
  await expect(dot(a, 0)).toHaveAttribute('data-state', 'correct');
  await expect(dot(a, 1)).toHaveAttribute('data-state', 'answered');

  // Another device with empty browser storage picks up the same place from the server.
  const b = await device();
  await expect(b.locator('#lesson-stage-checkpoint')).toBeVisible();
  await expect(dot(b, short)).toHaveAttribute('aria-current', 'step');
  await expect(b.locator('#lesson-practice textarea')).toHaveValue(draft);
  await expect(dot(b, 1)).toHaveAttribute('data-state', 'answered');
  await b
    .locator('#lesson-practice')
    .screenshot({ path: 'documents/qa/lessons/checkpoint-resumed.png' });
  // Keep writing there; the first browser sees the newer answer when it comes back.
  const longer = `${draft} they move between people`;
  await b.locator('#lesson-practice textarea').fill(longer);
  await expect.poll(() => draftFor(short), { timeout: 5000 }).toBe(longer);
  await a.reload();
  await expect(a.locator('#lesson-practice textarea')).toHaveValue(longer);
  assert.deepEqual(errors, []);
  console.log(
    'PASS: an unfinished checkpoint reopens on the checkpoint stage at the last question, keeps unchecked answers after a reload and on another device, and the newest draft wins.',
  );
} finally {
  await browser.close();
}
