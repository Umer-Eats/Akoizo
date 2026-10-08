import { anatomyLessons } from '../src/lib/lessons-anatomy.ts';
import { forensicsLessons } from '../src/lib/lessons-forensics.ts';
import { modelControls } from '../src/lib/lesson-models.ts';
import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
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
  return route.fulfill({ json: [] });
});

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
        await expect(p.locator('.quiz-question')).toHaveCount(7);
        await expect(p.locator('.lesson-sim h3')).toHaveText(lesson.simulation.title);
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
        await expect(p.locator('.lesson-example')).toBeVisible();
        await expect(
          p.getByRole('button', { name: 'Check my answers', exact: true }),
        ).toBeDisabled();
      }
    }
    assert.equal(await p.getByRole('button', { name: 'Video lesson', exact: true }).count(), 0);
    assert(!/Yingling Yang/.test(await p.locator('.lessons-workspace').innerText()));
  }
  assert.equal(checkedModels.size, 10);
  await p.goto(`${base}/dashboard/student/events/anatomy-and-physiology/lessons`);
  await p.locator('.unit-button').first().click();
  const first = anatomyLessons.lessons[0];
  const conclusion = p.locator('.lab-conclusion button');
  await expect(conclusion.first()).toBeDisabled();
  for (const button of await p.locator('.investigation-tests button').all()) await button.click();
  await conclusion.first().click();
  await expect(p.locator('.sim-feedback')).toContainText('Supported by the evidence');
  await p.getByRole('button', { name: 'Restart investigation' }).click();
  await expect(conclusion.first()).toBeDisabled();
  const check = p.getByRole('button', { name: 'Check my answers', exact: true });
  const firstRadio = p.locator('.quiz-question input[type="radio"]').first();
  await firstRadio.focus();
  await firstRadio.press('ArrowDown');
  await expect(p.locator('.quiz-question input[type="radio"]').nth(1)).toBeChecked();
  await p
    .locator('.quiz-question')
    .first()
    .screenshot({ path: 'documents/qa/lessons/mcq-selected.png' });
  for (let i = 0; i < first.practice.length; i++) {
    const q = first.practice[i],
      field = p.locator('.quiz-question').nth(i);
    if (q.type === 'mcq') await field.getByRole('radio', { name: q.answer, exact: true }).check();
    else await field.getByRole('textbox').fill(q.answer);
  }
  const lastWritten = p.locator('.quiz-written textarea').last();
  await lastWritten.fill('   ');
  await expect(check).toBeDisabled();
  await lastWritten.fill(first.practice.at(-1).answer);
  await check.click();
  await expect(p.locator('.quiz-question .practice-option.correct')).toHaveCount(3);
  await expect(firstRadio).toBeDisabled();
  await p
    .locator('.quiz-question')
    .first()
    .screenshot({ path: 'documents/qa/lessons/mcq-reviewed.png' });
  await expect(p.locator('.quiz-result')).toContainText('Multiple choice: 3 / 3 points');
  await expect(p.locator('.course-progress label')).toHaveText('0 of 20 practices complete');
  for (const box of await p.locator('.quiz-self-review input').all()) await box.check();
  await expect(p.locator('.course-progress label')).toHaveText('1 of 20 practices complete');
  await p.getByRole('button', { name: 'Next lesson', exact: true }).click();
  await expect(p.locator('#current-lesson-title')).toHaveText(anatomyLessons.lessons[1].title);
  await p.reload();
  await expect(p.locator('#current-lesson-title')).toHaveText(anatomyLessons.lessons[1].title);
  await p.getByRole('button', { name: 'Previous lesson', exact: true }).click();
  await expect(p.locator('.quiz-result')).toContainText('Multiple choice: 3 / 3 points');
  await expect(p.locator('.course-progress label')).toHaveText('1 of 20 practices complete');
  await p.getByRole('button', { name: 'Revise answers', exact: true }).click();
  await expect(p.locator('.course-progress label')).toHaveText('0 of 20 practices complete');
  await expect(p.locator('.quiz-written textarea').first()).not.toHaveValue('');
  // Test calculated outputs and notebook with the respiratory unit.
  await p.locator('.unit-button').nth(2).click();
  await expect(p.locator('.lab-metrics')).toContainText('4.2');
  await p.getByRole('slider', { name: 'Tidal volume', exact: true }).fill('250');
  await p.getByRole('slider', { name: 'Breathing rate', exact: true }).fill('24');
  await expect(p.locator('.lab-metrics')).toContainText('2.4');
  await p.getByRole('button', { name: 'Record trial (0/6)', exact: true }).click();
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
        const viewer = p.locator('.lab-diagram-viewport');
        await expect(p.locator('.lab-diagram-scroll-hint')).toBeVisible();
        await viewer.focus();
        await viewer.press('ArrowRight');
        await expect.poll(() => viewer.evaluate((node) => node.scrollLeft)).toBeGreaterThan(0);
        await viewer.evaluate((node) => {
          node.scrollLeft = 0;
          node.blur();
        });
      }
      await p.evaluate(() => window.scrollTo(0, 0));
      if (width !== 320)
        await p.screenshot({ path: `documents/qa/lessons/course-${theme}-${width}.png` });
      if (width === 390)
        await p
          .locator('.lesson-sim')
          .screenshot({ path: `documents/qa/lessons/lab-${theme}-390.png` });
    }
  }
  await p.setViewportSize({ width: 1440, height: 1000 });
  profile.id = 'qa-student-two';
  await p.reload();
  await expect(p.locator('#current-lesson-title')).toHaveText(first.title);
  await expect(p.locator('.quiz-written textarea').first()).toHaveValue('');
  profile.id = 'qa-student';
  profile.division = 'B';
  await p.reload();
  await expect(p.locator('.lessons-workspace')).toHaveCount(0);
  profile.division = 'C';
  await p.goto(`${base}/dashboard/student/events/engineering-cad/lessons`);
  await expect(p.locator('.lessons-workspace')).toHaveCount(0);
  await p.goto(`${base}/dashboard/student/events/forensics/lessons`);
  await expect(p.locator('.unit-button')).toHaveCount(9);
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
    'PASS: 40 lessons with diagrams; all 10 numerical diagrams update at slider limits and restore; tissue/STR/glass reveals reset; compact aligned MCQs in 320/390/1440 layouts and both themes; keyboard answers and diagram scrolling; calculations; investigations; practice scoring/review; draft restoration; student isolation; Division C/CAD scope; corrupted/blocked storage.',
  );
} finally {
  await browser.close();
}
