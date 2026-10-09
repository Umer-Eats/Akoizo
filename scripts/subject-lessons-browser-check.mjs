import { anatomyLessons } from '../src/lib/lessons-anatomy.ts';
import { forensicsLessons } from '../src/lib/lessons-forensics.ts';
import { modelControls } from '../src/lib/lesson-models.ts';
import { lessonAtlas } from '../src/lib/lesson-atlas.ts';
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
  const { yellowPurpleCourses } = await import('../src/lib/lessons-yellow-purple.ts');
  await mkdir('documents/qa/subject-lessons', { recursive: true });
  for (const course of yellowPurpleCourses) {
    await p.goto(`${base}/dashboard/student/events/${course.eventId}/lessons`);
    await expect(p.locator('.lessons-workspace')).toHaveAttribute(
      'data-lesson-slot',
      course.eventId === 'codebusters' ||
        course.eventId === 'remote-sensing' ||
        course.eventId === 'disease-detectives'
        ? 'yellow'
        : 'purple',
    );
    await expect(p.locator('.unit-button')).toHaveCount(course.units.length);
    for (const [i, lesson] of course.lessons.entries()) {
      await p.locator('.unit-button').nth(i).click();
      await expect(p.locator('#current-lesson-title')).toHaveText(lesson.title);
      await expect(p.locator('.lesson-reading .process-atlas')).toHaveCount(1);
      await expect(p.locator('.lesson-reading .comparison-atlas tbody tr')).toHaveCount(3);
      await expect(p.locator('.lesson-reading .subject-preview')).toHaveCount(1);
      await expect(p.locator('.quiz-question')).toHaveCount(7);
      const lab = p.locator('#lesson-lab');
      await expect(lab.locator('.subject-explorer')).toHaveCount(1);
      const plots = lab.locator('.subject-plot');
      assert((await plots.count()) > 0);
      for (const plot of await plots.all()) assert(!/NaN|Infinity/.test(await plot.innerHTML()));
      assert(
        !/Benjamin Wang|Noella Lee|Instructor:/.test(
          await p.locator('.lesson-reading').innerText(),
        ),
      );
    }
    await p.locator('.unit-button').first().click();
    const lab = p.locator('#lesson-lab');
    if (course.eventId === 'codebusters') {
      await lab.getByRole('button', { name: 'Load CAT affine example', exact: true }).click();
      await expect(lab.locator('.cipher-result')).toContainText('SIZ');
      await lab.getByRole('button', { name: 'Reverse this result', exact: true }).click();
      await expect(lab.locator('.cipher-result')).toContainText('CAT');
      await lab.getByLabel('Cipher system', { exact: true }).selectOption('Baconian');
      await lab.getByLabel('Cipher message', { exact: true }).fill('ABE');
      await expect(lab.locator('.cipher-result')).toContainText('AAAAA AAAAB AABAA');
    } else if (course.eventId === 'remote-sensing') {
      await lab
        .getByRole('button', { name: 'Load half vegetation / half soil example', exact: true })
        .click();
      await expect(lab.locator('.subject-metrics>div').first()).toContainText('0.5');
      await lab.getByRole('slider', { name: 'Pixel side', exact: true }).fill('100');
      await expect(lab.locator('.subject-metrics')).toContainText('10000 m²');
    } else if (course.eventId === 'disease-detectives') {
      await expect(lab.locator('.subject-metrics')).toContainText('4');
      await lab
        .getByRole('button', { name: 'Load low-prevalence test example', exact: true })
        .click();
      await expect(lab.locator('.subject-metrics')).toContainText('0.0833');
      await lab.getByRole('button', { name: 'Load two-wave pattern', exact: true }).click();
      await expect(lab.locator('.subject-plot')).toHaveAccessibleName(/1, 8, 3, 1, 8, 3/);
    } else if (course.eventId === 'astronomy') {
      await lab.getByRole('slider', { name: 'Observer distance', exact: true }).fill('100');
      await expect(lab.locator('.subject-metrics>div').nth(1)).toContainText('0.01');
      await lab.getByRole('button', { name: 'Load cool giant', exact: true }).click();
      await expect(lab.locator('.subject-plot')).toHaveAccessibleName(/3500K/);
    } else if (course.eventId === 'botany') {
      await lab.getByRole('slider', { name: 'Stomatal opening', exact: true }).fill('0');
      for (const metric of await lab.locator('.subject-metrics strong').all())
        await expect(metric).toHaveText('0');
      await lab.getByRole('button', { name: 'Xylem', exact: true }).click();
      await expect(lab.locator('.subject-focus')).toContainText('hydraulic pathway');
    } else {
      await lab.getByRole('slider', { name: 'Random variation amplitude', exact: true }).fill('0');
      await expect(lab.locator('.subject-table tbody tr').first()).toContainText('14');
      await lab.getByRole('slider', { name: 'Instrument offset', exact: true }).fill('5');
      await expect(lab.locator('.subject-table tbody tr').first()).toContainText('19');
      await lab.getByRole('button', { name: 'Run a new synthetic dataset', exact: true }).click();
    }
    await lab
      .getByLabel('Your prediction and reason', { exact: true })
      .fill('Compare the changed input with the baseline using the stated model.');
    await lab.getByRole('button', { name: 'Record trial (0/6)', exact: true }).click();
    await expect(lab.locator('.subject-notebook li')).toHaveCount(1);
    await lab
      .getByLabel('Explain the evidence', { exact: true })
      .fill(
        'The output changes under the model assumptions; a real-world cause needs independent evidence.',
      );
    await lab.screenshot({ path: `documents/qa/subject-lessons/${course.eventId}-desktop.png` });
    await lab.getByRole('button', { name: 'Reset subject lab', exact: true }).click();
    await expect(lab.locator('.subject-notebook')).toHaveCount(0);
    await expect(lab.getByLabel('Explain the evidence', { exact: true })).toHaveValue('');
    const first = course.lessons[0];
    for (const [i, q] of first.practice.entries()) {
      const field = p.locator('.quiz-question').nth(i);
      if (q.type === 'mcq') await field.getByRole('radio', { name: q.answer, exact: true }).check();
      else await field.getByRole('textbox').fill(q.answer);
    }
    await p.getByRole('button', { name: 'Check my answers', exact: true }).click();
    await expect(p.locator('.quiz-result')).toContainText('3 / 3');
    for (const review of await p.locator('.quiz-self-review input').all()) await review.check();
    await expect(p.locator('.course-progress label')).toHaveText(
      `1 of ${course.lessons.length} practices complete`,
    );
    await p.reload();
    await expect(p.locator('.course-progress label')).toHaveText(
      `1 of ${course.lessons.length} practices complete`,
    );
    await expect(p.locator('.quiz-result')).toContainText('3 / 3');
    for (const theme of ['dark', 'light']) {
      await p.evaluate((t) => (document.documentElement.dataset.theme = t), theme);
      for (const width of [390, 320]) {
        await p.setViewportSize({ width, height: 1000 });
        assert.equal(
          await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
          false,
          `${course.eventId} overflow ${theme} ${width}`,
        );
        const viewer = p.locator('#lesson-lab .subject-plot-scroll').first();
        await viewer.focus();
        await viewer.press('ArrowRight');
        await expect.poll(() => viewer.evaluate((n) => n.scrollLeft)).toBeGreaterThan(0);
        await viewer.evaluate((n) => {
          n.scrollLeft = 0;
          n.blur();
        });
        if (width === 390)
          await p.locator('#lesson-lab').screenshot({
            path: `documents/qa/subject-lessons/${course.eventId}-${theme}-390.png`,
          });
      }
    }
    await p.setViewportSize({ width: 1440, height: 1000 });
  }
  profile.division = 'B';
  for (const course of yellowPurpleCourses) {
    await p.goto(`${base}/dashboard/student/events/${course.eventId}/lessons`);
    await expect(p.locator('.lessons-workspace')).toHaveCount(0);
  }
  assert.deepEqual(errors, []);
  console.log(
    'PASS: all 53 yellow/purple Division C lessons; six subject labs and worked calculations; trial/reset behavior; 371-question catalog and practice persistence; both themes at 320/390; diagram keyboard scrolling; Division B excluded.',
  );
} finally {
  await browser.close();
}
