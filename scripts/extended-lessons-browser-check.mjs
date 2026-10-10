import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3005';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
await mkdir('documents/qa/lessons', { recursive: true });
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
  const { blueGreenOrangeCourses } = await import('../src/lib/lessons-blue-green-orange.ts');
  await mkdir('documents/qa/extended-lessons', { recursive: true });
  for (const course of blueGreenOrangeCourses) {
    await p.goto(`${base}/dashboard/student/events/${course.eventId}/lessons`);
    await expect(p.locator('.lessons-workspace')).toHaveAttribute(
      'data-lesson-slot',
      ['chemistry-lab', 'rocks-and-minerals'].includes(course.eventId)
        ? 'blue'
        : ['circuit-lab', 'water-quality', 'protein-modeling'].includes(course.eventId)
          ? 'green'
          : 'orange',
    );
    await expect(p.locator('.unit-button')).toHaveCount(course.units.length);
    for (const [i, lesson] of course.lessons.entries()) {
      await p.locator('.unit-button').nth(i).click();
      await expect(p.locator('#current-lesson-title')).toHaveText(lesson.title);
      await expect(p.locator('.lesson-reading .process-atlas')).toHaveCount(1);
      await expect(p.locator('.lesson-reading .comparison-atlas tbody tr')).toHaveCount(3);
      await expect(p.locator('.lesson-reading .subject-preview')).toHaveCount(1);
      await expect(p.locator('.quiz-question')).toHaveCount(7);
      await expect(p.locator('.online-reference')).toHaveCount(
        lesson.referenceFigures?.length ?? 0,
      );
      for (const figure of await p.locator('.online-reference').all()) {
        await figure.scrollIntoViewIfNeeded();
        await expect
          .poll(
            () =>
              figure
                .locator('img')
                .first()
                .evaluate((n) => n.complete && n.naturalWidth > 0)
                .catch(() => false),
            { timeout: 20000 },
          )
          .toBe(true);
        await figure.getByRole('button', { name: /^Enlarge / }).click();
        await expect(figure.getByRole('dialog')).toBeVisible();
        await figure.getByRole('slider', { name: 'Image zoom', exact: true }).fill('200');
        await p.setViewportSize({ width: 390, height: 900 });
        assert.equal(
          await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
          false,
        );
        await figure
          .getByRole('dialog')
          .screenshot({ path: `documents/qa/extended-lessons/${lesson.id}-figure.png` });
        await p.setViewportSize({ width: 1440, height: 1000 });
        await figure.getByRole('dialog').press('Escape');
        await expect(figure.getByRole('dialog')).not.toBeVisible();
      }
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
    const setSlider = async (name, value) =>
      lab.getByRole('slider', { name, exact: true }).fill(String(value));
    const select = async (name, value) => lab.getByLabel(name, { exact: true }).selectOption(value);
    const metrics = lab.locator('.subject-metrics');
    if (course.eventId === 'chemistry-lab') {
      await select('Chemistry investigation', 'Strong-acid titration');
      await setSlider('Added base volume', 25);
      await expect(metrics).toContainText('pH 7;');
      await setSlider('Added base volume', 30);
      await expect(metrics).toContainText('11.959');
      await select('Chemistry investigation', 'Enzyme saturation');
      await expect(metrics).toContainText('Rate 5');
      await select('Chemistry investigation', 'Gas paths');
      await setSlider('Final volume ratio', 3);
      await lab
        .getByLabel('Your prediction and reason', { exact: true })
        .fill('Isothermal expansion does positive work.');
      await lab.getByRole('button', { name: 'Record trial (0/6)', exact: true }).click();
      await expect(lab.locator('.subject-notebook')).toContainText('volume ratio 3');
      await lab.getByRole('button', { name: 'Clear trial notebook', exact: true }).click();
    } else if (course.eventId === 'rocks-and-minerals') {
      await expect(
        lab.getByRole('button', { name: 'Check mineral identification', exact: true }),
      ).toBeDisabled();
      for (const name of ['hardness', 'streak', 'breakage'])
        await lab.getByRole('button', { name: `Reveal ${name}`, exact: true }).click();
      await select('Mineral candidate', 'Calcite');
      await lab.getByRole('button', { name: 'Check mineral identification', exact: true }).click();
      await expect(lab.getByRole('status')).toContainText(
        'Supported. This case represents Calcite',
      );
    } else if (course.eventId === 'circuit-lab') {
      await expect(metrics).toContainText('Req 400 Ω; source 15 mA');
      await lab.getByLabel('Parallel branches', { exact: true }).check();
      await expect(metrics).toContainText('Req 75 Ω; source 80 mA');
      await lab.screenshot({ path: 'documents/qa/extended-lessons/circuit-parallel.png' });
      await lab.getByLabel('Closed switch', { exact: true }).uncheck();
      await expect(metrics).toContainText('source 0 mA');
      await select('Circuit investigation', 'LED current limit');
      await lab.getByLabel('Closed switch', { exact: true }).check();
      await setSlider('Source voltage', 5);
      await setSlider('Resistance R1', 300);
      await expect(metrics).toContainText('LED current 10 mA');
      await lab.screenshot({ path: 'documents/qa/extended-lessons/circuit-led.png' });
      await lab.getByLabel('Reverse LED', { exact: true }).check();
      await expect(metrics).toContainText('LED current 0 mA');
      await select('Circuit investigation', 'Boolean logic');
      await select('Logic gate', 'XOR');
      await lab.getByLabel('Input A', { exact: true }).check();
      await lab.getByLabel('Input B', { exact: true }).check();
      await expect(metrics).toContainText('XOR(1,1) = 0');
      await lab.getByLabel('Input B', { exact: true }).uncheck();
      await expect(metrics).toContainText('XOR(1,0) = 1');
    } else if (course.eventId === 'water-quality') {
      await expect(metrics).toContainText('21 units');
      await expect(metrics).toContainText('6.4 mg/L');
      await setSlider('Oxygen demand rate', 2);
      await setSlider('Budget duration', 8);
      await expect(metrics).toContainText('0 mg/L');
    } else if (course.eventId === 'protein-modeling') {
      const contacts = await metrics.locator('strong').first().innerText();
      await setSlider('Protein view rotation', 180);
      await expect(metrics.locator('strong').first()).toHaveText(contacts);
      await setSlider('Selected residue', 12);
      await expect(metrics).toContainText('Residue 12 category');
    } else if (course.eventId === 'designer-genes') {
      await expect(metrics).toContainText('0.25');
      await expect(metrics).toContainText('0.5');
      await select('First parent genotype', 'AA');
      await select('Second parent genotype', 'aa');
      await expect(metrics).toContainText('Aa 1');
      await setSlider('Population allele A frequency', 0.7);
      await expect(lab.locator('.subject-plot').last()).toHaveAccessibleName(/0.49, 0.42, 0.09/);
    } else if (course.eventId === 'dynamic-planet') {
      await expect(metrics).toContainText('12,000 m³');
      await expect(metrics).toContainText('peak 1.67');
      await setSlider('Event duration', 8);
      await expect(metrics).toContainText('peak 0.833');
      await select('Hydrology investigation', 'Darcy groundwater');
      await expect(metrics).toContainText('0.0002 m³/s');
    } else {
      await expect(metrics).toContainText('1,728.8 J');
      await select('Gas process', 'adiabatic');
      await expect(metrics.locator('div').filter({ hasText: 'Heat into gas' })).toContainText(
        '0 J',
      );
      await select('Thermodynamics investigation', 'Heating and phases');
      await setSlider('Energy per mass', 209);
      await expect(metrics).toContainText('50%');
      await lab.screenshot({ path: 'documents/qa/extended-lessons/thermo-heating.png' });
      await select('Thermodynamics investigation', 'Carnot limits');
      await expect(metrics).toContainText('50%');
      await lab.screenshot({ path: 'documents/qa/extended-lessons/thermo-carnot.png' });
    }
    // Every available mode renders finite diagrams and responds to its controls.
    for (const select of await lab.locator('select').all()) {
      for (const option of await select.locator('option').all()) {
        await select.selectOption(
          (await option.getAttribute('value')) ?? (await option.innerText()),
        );
        for (const plot of await lab.locator('.subject-plot').all())
          assert(!/NaN|Infinity/.test(await plot.innerHTML()));
      }
    }
    for (const slider of await lab.getByRole('slider').all()) {
      await slider.fill(await slider.getAttribute('max'));
      for (const plot of await lab.locator('.subject-plot').all())
        assert(!/NaN|Infinity/.test(await plot.innerHTML()));
      await slider.fill(await slider.getAttribute('min'));
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
    await lab.screenshot({ path: `documents/qa/extended-lessons/${course.eventId}-desktop.png` });
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
            path: `documents/qa/extended-lessons/${course.eventId}-${theme}-390.png`,
          });
      }
    }
    await p.setViewportSize({ width: 1440, height: 1000 });
  }
  profile.division = 'B';
  for (const course of blueGreenOrangeCourses) {
    await p.goto(`${base}/dashboard/student/events/${course.eventId}/lessons`);
    await expect(p.locator('.lessons-workspace')).toHaveCount(0);
  }
  assert.deepEqual(errors, []);
  console.log(
    'PASS: all 74 blue/green/orange Division C lessons; eight subject labs, every mode and slider limits; trial/reset behavior; 518-question catalog and practice persistence; both themes at 320/390; diagram keyboard scrolling; Division B excluded.',
  );
} finally {
  await browser.close();
}
