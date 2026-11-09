import { anatomyLessons as anatomyRaw } from '../src/lib/lessons-anatomy.ts';
import { forensicsLessons as forensicsRaw } from '../src/lib/lessons-forensics.ts';
import { withExplanations } from '../src/lib/lesson-explanations/index.ts';
import { modelControls } from '../src/lib/lesson-models.ts';
import { lessonAtlas } from '../src/lib/lesson-atlas.ts';
import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { openStage, playCheckpoint } from './lib-lesson-stage.mjs';
import { mockLessonApi } from './lib-mock-session.mjs';

// The site shows each question with its written explanation, so the checks do too.
const anatomyLessons = withExplanations(anatomyRaw);
const forensicsLessons = withExplanations(forensicsRaw);
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3005';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
await mkdir('documents/qa/lessons', { recursive: true });
const checkedModels = new Set();
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
  // Checkpoint answers are kept per student, like the real lesson_answers table.
  if (url.pathname.startsWith('/api/lessons/'))
    return route.fulfill({
      json: mockLessonApi(
        url,
        route.request(),
        profile.division,
        (lessonAnswers[profile.id] ??= []),
      ),
    });
  return route.fulfill({ json: [] });
});
const lessonAnswers = {};

try {
  await p.goto(base + '/login/student');
  await p.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await p.getByLabel('Password', { exact: true }).fill('qa-test-password');
  await p.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(p).toHaveURL(/dashboard\/student$/);
  for (const course of [anatomyLessons, forensicsLessons]) {
    await p.goto(`${base}/dashboard/student/events/${course.eventId}/lessons`);
    await expect(p.locator('.unit-button')).toHaveCount(course.units.length);
    for (let u = 0; u < course.units.length; u++) {
      await p.locator('.unit-button').nth(u).click();
      await expect(p.locator('.unit-button').nth(u)).toHaveAttribute('aria-pressed', 'true');
      for (let l = 0; l < course.units[u].lessonIds.length; l++) {
        const lesson = course.lessons.find((x) => x.id === course.units[u].lessonIds[l]);
        await p.locator('.lesson-button').nth(l).click();
        await expect(p.locator('#current-lesson-title')).toHaveText(lesson.title);
        // One numbered circle per checkpoint question, no question drop-down.
        await expect(p.locator('#lesson-practice .lc-dot')).toHaveCount(lesson.practice.length);
        await expect(p.getByLabel('Choose question')).toHaveCount(0);
        await expect(p.locator('.lesson-sim h3')).toHaveText(lesson.simulation.title);
        await expect(p.locator('.lesson-reading .process-atlas')).toHaveCount(1);
        await expect(p.locator('#lesson-review .comparison-cards > div')).toHaveCount(3);
        const process = p.locator('.lesson-reading .process-atlas');
        await process.locator('.process-path button').last().click();
        await expect(process.locator('.process-focus strong')).toContainText('Step 3');
        if (lessonAtlas[lesson.id].image) {
          const figure = p.locator('.lesson-reading .source-image:not(.online-reference)');
          await figure.scrollIntoViewIfNeeded();
          await expect
            .poll(() =>
              figure
                .locator('.atlas-image-button img')
                .evaluate((image) => image.complete && image.naturalWidth > 0),
            )
            .toBe(true);
        }
        if (lesson.simulation.kind === 'model') {
          const chart = p.locator('.lesson-reading .relationship-chart');
          await expect(chart).toHaveCount(1);
          const initialLabel = await chart.locator('svg[role="img"]').getAttribute('aria-label');
          const slider = chart.getByRole('slider');
          await slider.fill(await slider.getAttribute('max'));
          assert.notEqual(
            await chart.locator('svg[role="img"]').getAttribute('aria-label'),
            initialLabel,
          );
          await slider.fill(await slider.getAttribute('min'));
        }
        await openStage(p, 'labs');
        await expect(p.locator('.lab-figure')).toHaveCount(1);
        await expect(p.locator('.lab-diagram')).toHaveAccessibleName(/.+/);
        if (lesson.simulation.kind === 'model' && !checkedModels.has(lesson.simulation.model)) {
          const model = lesson.simulation.model;
          const initial = await p.locator('.lab-diagram').innerHTML();
          for (const control of modelControls[model]) {
            const slider = p.getByRole('slider', { name: control.label, exact: true });
            for (const value of [control.min, control.max]) {
              await slider.fill(String(value));
              const diagram = await p.locator('.lab-diagram').innerHTML();
              if (value !== control.initial)
                assert.notEqual(diagram, initial, `${model}: ${control.key} updates diagram`);
              assert(!/NaN|Infinity/.test(diagram), `${model}: finite SVG geometry at boundaries`);
            }
            await slider.fill(String(control.initial));
          }
          assert.equal(
            await p.locator('.lab-diagram').innerHTML(),
            initial,
            `${model}: restores diagram`,
          );
          await p
            .locator('.lab-figure')
            .screenshot({ path: `documents/qa/lessons/diagram-${model}.png` });
          checkedModels.add(model);
        }
        if (lesson.simulation.kind === 'investigation' && lesson.simulation.diagram) {
          const initial = await p.locator('.lab-diagram').innerHTML();
          for (const button of await p.locator('.investigation-tests button').all())
            await button.click();
          assert.notEqual(await p.locator('.lab-diagram').innerHTML(), initial);
          await p
            .locator('.lab-figure')
            .screenshot({ path: `documents/qa/lessons/diagram-${lesson.simulation.diagram}.png` });
          await p.getByRole('button', { name: 'Restart investigation' }).click();
          assert.equal(await p.locator('.lab-diagram').innerHTML(), initial);
        }
        await openStage(p, 'learn');
        await expect(p.locator('.lesson-example')).toBeVisible();
        await openStage(p, 'checkpoint');
        await expect(p.getByRole('button', { name: 'Check answer', exact: true })).toBeDisabled();
      }
    }
    assert.equal(await p.getByRole('button', { name: 'Video lesson', exact: true }).count(), 0);
    assert(!/Yingling Yang/.test(await p.locator('.lessons-workspace').innerText()));
  }
  assert.equal(checkedModels.size, 10);
  // Local source images enlarge without external network requests, and close with Escape.
  await p.goto(`${base}/dashboard/student/events/anatomy-and-physiology/lessons`);
  await p.locator('.unit-button').nth(1).click();
  const imageFigure = p.locator('.lesson-reading .source-image:not(.online-reference)');
  await imageFigure.getByRole('button', { name: /^Enlarge/ }).click();
  await expect(imageFigure.locator('dialog')).toBeVisible();
  await imageFigure.getByRole('slider', { name: /Image zoom/ }).fill('200');
  await expect(imageFigure.locator('.atlas-enlarged-scroll img')).toHaveCSS('width', /.+px/);
  await p.keyboard.press('Escape');
  await expect(imageFigure.locator('dialog')).not.toBeVisible();
  // A scenario tests a prediction; a sweep can pause; reset clears its state and trials.
  await p.locator('.unit-button').nth(2).click();
  await openStage(p, 'labs');
  await p.getByLabel('Your prediction', { exact: true }).selectOption('decrease');
  await p.getByRole('button', { name: 'Run scenario', exact: true }).click();
  await expect(p.locator('.experiment-feedback')).toContainText('Prediction supported');
  await expect(p.locator('.lab-metrics')).toContainText('2.4');
  await p.getByRole('button', { name: 'Record baseline (0/6)', exact: true }).click();
  await expect(p.locator('.trial-chart')).toHaveAccessibleName(/2.4/);
  await p.getByRole('button', { name: 'Run variable sweep', exact: true }).click();
  await expect(p.getByRole('button', { name: 'Pause sweep', exact: true })).toBeVisible();
  await expect
    .poll(() => p.getByRole('slider', { name: 'Tidal volume', exact: true }).inputValue())
    .not.toBe('150');
  await p.getByRole('button', { name: 'Pause sweep', exact: true }).click();
  await p.getByRole('button', { name: 'Reset experiment', exact: true }).click();
  await expect(p.locator('.experiment-feedback')).toHaveCount(0);
  await expect(p.locator('.lab-notebook')).toHaveCount(0);
  // Specimen controls change the view; notes and findings reset with the investigation.
  await p.goto(`${base}/dashboard/student/events/forensics/lessons`);
  await p.locator('.unit-button').nth(3).click();
  await openStage(p, 'labs');
  await p.getByLabel('Working hypothesis', { exact: true }).selectOption({ index: 1 });
  await p.locator('.investigation-tests button').first().click();
  const specimenBefore = await p.locator('.specimen-drawing').innerHTML();
  await p.getByLabel('Reference comparison', { exact: true }).selectOption('2');
  assert.notEqual(await p.locator('.specimen-drawing').innerHTML(), specimenBefore);
  await p.getByRole('slider', { name: /Exhibit zoom/ }).fill('150');
  await p.getByRole('slider', { name: /Viewing focus/ }).fill('2');
  await p
    .getByLabel('Evidence notebook', { exact: true })
    .fill('Compare scales with the questioned ribbon and use the composition result.');
  await p.locator('.investigation-tests button').nth(1).click();
  await p.locator('.investigation-tests button').first().click();
  await expect(p.getByLabel('Evidence notebook', { exact: true })).toHaveValue(/Compare scales/);
  await p.getByRole('button', { name: 'Explore reference pathway', exact: true }).click();
  await expect(p.locator('.evidence-workbench .process-atlas')).toBeVisible();
  await p.getByRole('button', { name: 'Return to case exhibit', exact: true }).click();
  await p
    .locator('.evidence-workbench')
    .screenshot({ path: 'documents/qa/lessons/fiber-workbench.png' });
  await p.getByRole('button', { name: 'Restart investigation', exact: true }).click();
  await expect(p.getByLabel('Working hypothesis', { exact: true })).toHaveValue('');
  await expect(p.getByRole('slider', { name: /Exhibit zoom/ })).toHaveValue('100');
  await expect(p.getByLabel('Evidence notebook', { exact: true })).toHaveCount(0);
  await p.goto(`${base}/dashboard/student/events/anatomy-and-physiology/lessons`);
  await p.locator('.unit-button').first().click();
  const first = anatomyLessons.lessons[0];
  await openStage(p, 'labs');
  const conclusion = p.locator('.lab-conclusion button');
  await expect(conclusion.first()).toBeDisabled();
  for (const button of await p.locator('.investigation-tests button').all()) await button.click();
  await conclusion.first().click();
  await expect(p.locator('.lab-reveal')).toContainText('Supported by the evidence');
  await p.getByRole('button', { name: 'Restart investigation' }).click();
  await expect(conclusion.first()).toBeDisabled();
  await openStage(p, 'checkpoint');
  const quiz = p.locator('#lesson-practice');
  const check = quiz.getByRole('button', { name: 'Check answer', exact: true });
  await expect(check).toBeDisabled();
  // Radios keep keyboard selection.
  await p.getByRole('button', { name: /^Question 1,/ }).click();
  const firstRadio = quiz.locator('input[type="radio"]').first();
  if (first.practice[0].type === 'mcq') {
    await firstRadio.focus();
    await firstRadio.press('ArrowDown');
    await expect(quiz.locator('input[type="radio"]').nth(1)).toBeChecked();
    await expect(check).toBeEnabled();
    await quiz
      .locator('.quiz-question')
      .screenshot({ path: 'documents/qa/lessons/mcq-selected.png' });
  }
  // A blank written answer cannot be checked.
  const shortAt = first.practice.findIndex((q) => q.type === 'short');
  await p.getByRole('button', { name: new RegExp(`^Question ${shortAt + 1},`) }).click();
  await quiz.getByRole('textbox').fill('   ');
  await expect(check).toBeDisabled();
  // Check each question as you go; question 1 is answered wrong on purpose.
  await playCheckpoint(p, first, { wrong: [0] });
  const total = first.practice.length;
  await expect(quiz.locator('.lc-summary')).toContainText('Lesson complete');
  await expect(p.locator('.course-progress label')).toHaveText(
    new RegExp(`^1 of ${anatomyLessons.lessons.length} lessons complete`),
  );
  // A checked question is locked, shows the key, and its circle stays red.
  await p.getByRole('button', { name: 'Question 1, incorrect', exact: true }).click();
  await expect(quiz.locator('fieldset.lc-answer')).toHaveAttribute('disabled', '');
  if (first.practice[0].type === 'mcq') {
    await expect(quiz.locator('.practice-option.correct')).toHaveCount(1);
    await expect(quiz.locator('.lc-chosen')).toContainText(first.practice[0].answer);
  }
  await quiz
    .locator('.quiz-question')
    .screenshot({ path: 'documents/qa/lessons/mcq-reviewed.png' });
  // Results survive moving between lessons and a reload.
  await p.getByRole('button', { name: 'Next lesson', exact: true }).click();
  await expect(p.locator('#current-lesson-title')).toHaveText(anatomyLessons.lessons[1].title);
  await p.reload();
  await expect(p.locator('#current-lesson-title')).toHaveText(anatomyLessons.lessons[1].title);
  await p.getByRole('button', { name: 'Previous lesson', exact: true }).click();
  await openStage(p, 'checkpoint');
  await expect(quiz.locator('.lc-summary')).toContainText(`${total - 1} of ${total} correct`);
  await expect(quiz.locator('.lc-dot[data-state="incorrect"]')).toHaveCount(1);
  // A retake clears the answers and the circles.
  await quiz.getByRole('button', { name: 'Retake checkpoint', exact: true }).click();
  await expect(quiz.locator('.lc-summary')).toHaveCount(0);
  await expect(quiz.locator('.lc-dot[data-state="empty"]')).toHaveCount(total);
  // Test calculated outputs and notebook with the respiratory unit.
  await p.locator('.unit-button').nth(2).click();
  await openStage(p, 'labs');
  await expect(p.locator('.lab-metrics')).toContainText('4.2');
  await p.getByRole('slider', { name: 'Tidal volume', exact: true }).fill('250');
  await p.getByRole('slider', { name: 'Breathing rate', exact: true }).fill('24');
  await expect(p.locator('.lab-metrics')).toContainText('2.4');
  await p.getByRole('button', { name: 'Record baseline (0/6)', exact: true }).click();
  await expect(p.locator('.lab-notebook')).toContainText('2.4');
  await p.getByRole('button', { name: 'Reset experiment', exact: true }).click();
  await expect(p.locator('.lab-metrics')).toContainText('4.2');
  await expect(p.locator('.lab-notebook')).toHaveCount(0);
  await mkdir('documents/qa/lessons', { recursive: true });
  await p
    .locator('.lesson-sim')
    .screenshot({ path: 'documents/qa/lessons/ventilation-desktop.png' });
  for (const theme of ['dark', 'light']) {
    await p.evaluate((theme) => (document.documentElement.dataset.theme = theme), theme);
    for (const width of [1440, 390, 320]) {
      await p.setViewportSize({ width, height: 1000 });
      assert.equal(
        await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        `Overflow ${width} ${theme}`,
      );
      await openStage(p, 'checkpoint');
      for (const option of await p.locator('.quiz-question .practice-option').all()) {
        const bounds = await option.evaluate((node) => {
          const input = node.querySelector('input').getBoundingClientRect();
          const text = node.querySelector('span').getBoundingClientRect();
          const row = node.getBoundingClientRect();
          return {
            inputWidth: input.width,
            inputHeight: input.height,
            gap: text.left - input.right,
            contained: text.right <= row.right,
          };
        });
        assert.equal(bounds.inputWidth, 18, `Radio width ${width} ${theme}`);
        assert.equal(bounds.inputHeight, 18, `Radio height ${width} ${theme}`);
        assert.equal(bounds.gap, 8, `Answer sits beside radio ${width} ${theme}`);
        assert(bounds.contained, `Answer stays in row ${width} ${theme}`);
      }
      if (width === 390) {
        await p
          .locator('.quiz-question')
          .first()
          .screenshot({ path: `documents/qa/lessons/mcq-${theme}-390.png` });
        await openStage(p, 'labs');
      }
      await p.evaluate(() => window.scrollTo(0, 0));
      if (width !== 320)
        await p.screenshot({ path: `documents/qa/lessons/course-${theme}-${width}.png` });
      await openStage(p, 'labs');
      if (width === 390)
        await p
          .locator('.lesson-sim')
          .screenshot({ path: `documents/qa/lessons/lab-${theme}-390.png` });
    }
  }
  await p.setViewportSize({ width: 1440, height: 1000 });
  for (const theme of ['dark', 'light']) {
    for (const width of [320, 390]) {
      await p.setViewportSize({ width, height: 1000 });
      await p.goto(base + '/dashboard/student/events/forensics/lessons');
      await p.evaluate((t) => (document.documentElement.dataset.theme = t), theme);
      await p.locator('.unit-button').nth(3).click();
      await openStage(p, 'labs');
      await p.locator('.investigation-tests button').first().click();
      await p.getByRole('slider', { name: 'Exhibit zoom', exact: true }).fill('200');
      assert.equal(
        await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        `Specimen overflow ${theme} ${width}`,
      );
      if (width === 390)
        await p
          .locator('.evidence-workbench')
          .screenshot({ path: `documents/qa/lessons/specimen-${theme}-390.png` });
      await p.getByRole('button', { name: 'Explore reference pathway', exact: true }).click();
      assert.equal(
        await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        `Pathway overflow ${theme} ${width}`,
      );
      await p.goto(base + '/dashboard/student/events/anatomy-and-physiology/lessons');
      await p.locator('.unit-button').nth(1).click();
      const fig = p.locator('.lesson-reading .source-image:not(.online-reference)');
      await fig.getByRole('button', { name: /^Enlarge/ }).click();
      await fig.getByRole('slider', { name: 'Image zoom', exact: true }).fill('250');
      assert.equal(
        await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        `Image overflow ${theme} ${width}`,
      );
      await p.keyboard.press('Escape');
      await p.locator('.unit-button').nth(2).click();
      if (width === 390)
        await p
          .locator('.relationship-chart')
          .screenshot({ path: `documents/qa/lessons/chart-${theme}-390.png` });
    }
  }
  await p.setViewportSize({ width: 1440, height: 1000 });
  await p.goto(base + '/dashboard/student/events/anatomy-and-physiology/lessons');
  await p.locator('.unit-button').nth(2).click();
  await p.locator('.process-atlas').screenshot({ path: 'documents/qa/lessons/process-atlas.png' });
  await p
    .locator('.relationship-chart')
    .screenshot({ path: 'documents/qa/lessons/relationship-chart.png' });
  await p.goto(base + '/dashboard/student/events/forensics/lessons');
  await p.locator('.unit-button').nth(4).click();
  await p.locator('.lesson-button').nth(1).click();
  await openStage(p, 'labs');
  await p.locator('.investigation-tests button').first().click();
  await p.getByRole('button', { name: 'Inspect base peak m/z 91', exact: true }).press('Enter');
  await expect(p.locator('.specimen-drawing')).toContainText('Base peak');
  await p.goto(`${base}/dashboard/student/events/anatomy-and-physiology/lessons`);
  profile.id = 'qa-student-two';
  await p.reload();
  await expect(p.locator('#current-lesson-title')).toHaveText(first.title);
  // Another student on this browser starts with an empty checkpoint.
  await openStage(p, 'checkpoint');
  const shortIndex = first.practice.findIndex((q) => q.type === 'short');
  await p.getByRole('button', { name: new RegExp(`^Question ${shortIndex + 1},`) }).click();
  await expect(p.locator('.quiz-written textarea')).toHaveValue('');
  await expect(p.locator('#lesson-practice .lc-dot[data-state="correct"]')).toHaveCount(0);
  profile.id = 'qa-student';
  profile.division = 'B';
  await p.reload();
  await expect(p.locator('.lessons-intro')).toContainText('Division B study path');
  profile.division = 'C';
  await p.goto(`${base}/dashboard/student/events/engineering-cad/lessons`);
  await expect(p.locator('.lessons-workspace')).toHaveCount(0);
  await p.goto(`${base}/dashboard/student/events/forensics/lessons`);
  await expect(p.locator('.unit-button')).toHaveCount(9);
  // Let saved progress load first, so the page does not rewrite storage after it is corrupted.
  await p.waitForLoadState('networkidle');
  await p.evaluate(() =>
    localStorage.setItem('akoizo:lessons:v2:qa-student:C:forensics', '{broken'),
  );
  await p.reload();
  await expect(p.locator('#current-lesson-title')).toHaveText(forensicsLessons.lessons[0].title);
  // Browser storage failure should not block study or require authentication changes.
  await p.addInitScript(() => {
    const set = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key.startsWith('akoizo:lessons:'))
        throw new DOMException('Storage disabled', 'QuotaExceededError');
      return set.call(this, key, value);
    };
  });
  await p.reload();
  await expect(p.locator('.lesson-save-note')).toContainText('Browser storage is unavailable');
  await p.locator('.unit-button').nth(1).click();
  await expect(p.locator('#current-lesson-title')).toHaveText(forensicsLessons.lessons[2].title);
  assert.deepEqual(errors, []);
  console.log(
    'PASS: 40 lesson atlases, source image zoom, interactive charts, prediction scenarios, sweep playback, trial plots, specimen controls and notebooks, spectrum keyboard annotation, phone layouts; all 10 numerical diagrams update at slider limits and restore; tissue/STR/glass reveals reset; compact aligned MCQs in 320/390/1440 layouts and both themes; keyboard answers and diagram scrolling; calculations; investigations; check-as-you-go checkpoint with numbered circles, reload and retake; student isolation; Division B course; CAD scope; corrupted/blocked storage.',
  );
} finally {
  await browser.close();
}
