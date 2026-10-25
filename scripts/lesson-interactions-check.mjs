// New lesson interactions: drag/drop, keyboard alternatives, animation, zoom and responsive layout.
// Uses mocked auth/API responses. Run once with DIVISION=C and once with DIVISION=B.
import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { topicLabs, extrasFor } from '../src/lib/extras/index.ts';
import { solutionSequence, termRounds } from '../src/lib/lesson-extras.ts';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3005';
const division = process.env.DIVISION || 'C';
const out = 'output/lesson-interactions';
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
  const eventId = division === 'B' ? 'crime-busters' : 'anatomy-and-physiology';
  const course = lessonsForEvent(eventId, division);
  const lesson = course.lessons.find(
    (l) =>
      extrasFor(l.id, l).sort &&
      extrasFor(l.id, l).labs?.some((id) =>
        topicLabs[id].controls.some(
          (c) => !c.options && !c.toggle && c.min !== undefined && c.max !== undefined,
        ),
      ) &&
      solutionSequence(l),
  );
  assert(lesson, 'A lesson with all interaction types is available');
  const unitIndex = course.units.findIndex((u) => u.lessonIds.includes(lesson.id));
  await p.goto(`${base}/dashboard/student/events/${eventId}/lessons`);
  await p.locator('.unit-button').nth(unitIndex).click();
  await p.locator('.lesson-button', { hasText: lesson.title }).first().click();
  const sort = p.locator('.la-card').filter({ has: p.locator('.la-drop-bins') });
  const card = sort.locator('.la-sort > .la-sort-card').first();
  const cardText = await card.locator(':scope > span').first().innerText();
  await card.dragTo(sort.locator('.la-drop-bin').first());
  await expect(sort.locator('.la-drop-bin').first()).toContainText(cardText);
  // Keyboard/touch fallback can move an already placed card.
  await sort
    .locator('.la-drop-bin')
    .first()
    .locator('.la-sort-card', { hasText: cardText })
    .focus();
  await p.keyboard.press('Enter');
  await sort.locator('.la-bin-title').nth(1).focus();
  await p.keyboard.press('Enter');
  await expect(sort.locator('.la-drop-bin').nth(1)).toContainText(cardText);
  await expect(sort.locator('.la-drop-bin').first()).not.toContainText(cardText);
  await sort.getByRole('button', { name: 'Start over' }).click();
  await expect(sort.locator('.la-drop-bin .la-sort-card')).toHaveCount(0);
  // Sort cards carry only their text.
  await expect(sort.locator('.la-sort-card button')).toHaveCount(0);
  // The reading uses the full width of the lesson panel.
  const [readingWidth, panelWidth] = await p.evaluate(() => {
    const detail = document.querySelector('.lesson-detail');
    const style = getComputedStyle(detail);
    return [
      document.querySelector('.lesson-reading').getBoundingClientRect().width,
      detail.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight),
    ];
  });
  assert(Math.abs(readingWidth - panelWidth) < 2, `reading ${readingWidth}px of ${panelWidth}px`);
  // Vocabulary: term and definition columns side by side. A wrong pair is flagged; right pairs lock.
  const match = p.locator('.la-card').filter({ has: p.locator('.la-match') });
  const rounds = termRounds(lesson);
  const terms = match.locator('.la-terms > li');
  const openDef = (i) =>
    match
      .locator('.la-defs > li:not([data-state="right"])')
      .filter({ has: p.getByText(rounds[i].answer, { exact: true }) })
      .first();
  await expect(terms).toHaveCount(rounds.length);
  await expect(match.locator('.la-defs > li')).toHaveCount(rounds.length);
  const [termBox, defBox] = await Promise.all(
    ['.la-terms', '.la-defs'].map((c) => match.locator(c).boundingBox()),
  );
  assert(defBox.x > termBox.x + termBox.width - 1, 'definitions sit beside the terms');
  const wrong = rounds.findIndex((r) => r.answer !== rounds[0].answer);
  await terms.first().click();
  await openDef(wrong).click();
  await expect(terms.first()).toHaveAttribute('data-state', 'wrong');
  await terms.first().dragTo(openDef(0));
  await expect(terms.first()).toHaveAttribute('data-state', 'right');
  for (let i = 1; i < rounds.length; i++) {
    await openDef(i).focus();
    await p.keyboard.press('Enter');
    await terms.nth(i).focus();
    await p.keyboard.press('Enter');
    await expect(terms.nth(i)).toHaveAttribute('data-state', 'right');
  }
  await expect(match.locator('.la-match-item[data-state="right"]')).toHaveCount(rounds.length * 2);
  await expect(match).toContainText(`All ${rounds.length} matched with 1 miss.`);
  const steps = p.locator('.la-order > li');
  const initial = await steps.locator(':scope > span').allTextContents();
  await p.locator('.la-order').scrollIntoViewIfNeeded();
  await steps
    .first()
    .dragTo(steps.last(), { sourcePosition: { x: 12, y: 12 }, targetPosition: { x: 12, y: 12 } });
  await expect(steps.last().locator(':scope > span')).toHaveText(initial[0]);
  await p.getByRole('button', { name: 'Reset order', exact: true }).click();
  assert.deepEqual(await steps.locator(':scope > span').allTextContents(), initial);
  await p.getByRole('button', { name: 'Move step 1 down', exact: true }).click();
  await expect(steps.nth(1).locator(':scope > span')).toHaveText(initial[0]);
  // Drag feedback contains only the name, and edge scrolling continues while held still.
  await card.scrollIntoViewIfNeeded();
  await card.dispatchEvent('dragstart', {
    dataTransfer: await p.evaluateHandle(() => new DataTransfer()),
  });
  await expect(p.locator('.lesson-drag-preview')).toHaveText(cardText);
  await expect(p.locator('.lesson-drag-preview button')).toHaveCount(0);
  const startY = await p.evaluate(() => window.scrollY);
  await p.locator('body').dispatchEvent('dragover', { clientY: 1 });
  await expect.poll(() => p.evaluate(() => window.scrollY)).toBeLessThan(startY - 40);
  await card.dispatchEvent('dragend');
  await expect(p.locator('.lesson-drag-preview')).toHaveCount(0);
  const stoppedY = await p.evaluate(() => window.scrollY);
  await p.waitForTimeout(100);
  assert.equal(await p.evaluate(() => window.scrollY), stoppedY);

  const quiz = p.locator('#lesson-practice');
  const jump = quiz.getByLabel('Choose question');
  await expect(quiz.locator('.quiz-question')).toHaveCount(1);
  await expect(quiz.getByRole('button', { name: 'Previous question' })).toBeDisabled();
  for (let i = 0; i < lesson.practice.length; i++) {
    const question = lesson.practice[i];
    await jump.selectOption(String(i));
    if (question.type === 'mcq')
      await quiz.getByRole('radio', { name: question.answer, exact: true }).check();
    else await quiz.getByRole('textbox').fill(question.answer);
  }
  await expect(quiz.getByRole('button', { name: 'Next question' })).toBeDisabled();
  await quiz.getByRole('button', { name: 'Previous question' }).click();
  await expect(jump).toHaveValue(String(lesson.practice.length - 2));
  await quiz.getByRole('button', { name: 'Next question' }).click();
  await quiz.getByRole('button', { name: 'Check my answers' }).click();
  for (let i = 0; i < lesson.practice.length; i++) {
    await jump.selectOption(String(i));
    await expect(quiz.locator('.quiz-review')).toContainText(lesson.practice[i].answer);
    if (lesson.practice[i].type === 'short') {
      await expect(quiz.getByRole('textbox')).toHaveValue(lesson.practice[i].answer);
      await quiz.getByRole('checkbox').check();
    }
  }
  await expect(quiz.getByRole('button', { name: 'Submit lesson', exact: true })).toBeEnabled();
  await expect(quiz.locator('.quiz-result')).toContainText('Practice complete');
  for (const width of [1440, 390]) {
    await p.setViewportSize({ width, height: 1000 });
    await quiz.screenshot({ path: `${out}/${division}-${width}-slides.png` });
    assert(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  }
  await p.setViewportSize({ width: 1440, height: 1000 });
  const inspector = p.locator('.diagram-inspector').first();
  await inspector.getByRole('button', { name: 'Zoom diagram in' }).click();
  await expect(inspector.locator('output')).toHaveText('125%');
  await inspector.getByRole('button', { name: 'Reset zoom' }).click();
  await expect(inspector.locator('output')).toHaveText('100%');
  const process = p.locator('.process-atlas').first();
  if (await process.count()) {
    await process.getByRole('button', { name: 'Play walkthrough' }).click();
    await expect(process.locator('.process-focus')).toContainText('Step 2:', { timeout: 5000 });
    await process.getByRole('button', { name: 'Pause walkthrough' }).click();
    await process.getByRole('button', { name: 'Restart walkthrough' }).click();
    await expect(process.locator('.process-focus')).toContainText('Step 1:');
  }
  const lab = p
    .locator('.tl-lab')
    .filter({ has: p.locator('.tl-sweep') })
    .first();
  const variable = await lab.getByLabel('Variable to animate').inputValue();
  const labId = (await lab.getAttribute('id')).replace('topic-lab-', '');
  const control = topicLabs[labId].controls.find((c) => c.key === variable);
  const input = lab.getByLabel(control.label, { exact: true });
  await lab.getByRole('button', { name: 'Animate variable', exact: true }).click();
  await expect.poll(async () => Number(await input.inputValue())).toBeGreaterThan(control.min);
  await lab.getByRole('button', { name: 'Pause animation', exact: true }).click();
  const paused = await input.inputValue();
  await p.waitForTimeout(500);
  assert.equal(await input.inputValue(), paused, 'Pause freezes model input');
  await lab.getByRole('button', { name: 'Reset lab', exact: true }).click();
  await expect(input).toHaveValue(String(control.initial));
  await p.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  });
  await p.emulateMedia({ reducedMotion: 'no-preference' });
  await p.evaluate(() => (document.documentElement.dataset.motion = 'on'));
  const animatedShape = p
    .locator('.diagram-inspector svg :is(circle, ellipse, rect, line)')
    .first();
  assert(
    (await animatedShape.evaluate((el) => getComputedStyle(el).transitionDuration)).includes(
      '0.24s',
    ),
  );
  const lessonMotion = () =>
    p.locator('.lesson-detail').evaluate((el) => getComputedStyle(el).animationName);
  assert.equal(await lessonMotion(), 'lm-rise');
  await p.evaluate(() => (document.documentElement.dataset.motion = 'off'));
  assert.equal(await lessonMotion(), 'none');
  assert.equal(await animatedShape.evaluate((el) => getComputedStyle(el).transitionDuration), '0s');
  await p.emulateMedia({ reducedMotion: 'reduce' });
  for (const theme of ['dark', 'light']) {
    await p.evaluate((theme) => (document.documentElement.dataset.theme = theme), theme);
    for (const width of [1440, 390]) {
      await p.setViewportSize({ width, height: 1000 });
      assert(
        await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        `${division} ${theme} ${width}: page overflow`,
      );
      await lab.screenshot({ path: `${out}/${division}-${theme}-${width}-lab.png` });
      await sort.screenshot({ path: `${out}/${division}-${theme}-${width}-sort.png` });
      await match.screenshot({ path: `${out}/${division}-${theme}-${width}-match.png` });
    }
  }
  assert.deepEqual(errors, []);
  console.log(
    `Division ${division}: full-width reading, vocabulary matching, lesson motion, drag, keyboard placement, reorder/reset, diagram zoom, walkthrough and lab animation verified in both themes at desktop and mobile widths.`,
  );
} finally {
  await browser.close();
}
