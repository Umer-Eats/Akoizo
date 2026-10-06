import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
await mkdir('documents/qa', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const base = 'http://127.0.0.1:3000';
await page.goto(base, { waitUntil: 'networkidle' });
const ako = page.getByRole('button', { name: 'Say hello to Ako, the lab rat' });
const character = page.locator('.ako-rig');
await expect(character).toHaveAttribute('data-motion', 'running');
const frames = await character.evaluate(async (element) => {
  const joints = ['head', 'forearm', 'tail'];
  const samples = [];
  for (let i = 0; i < 20; i++) {
    await new Promise(requestAnimationFrame);
    samples.push(
      joints.map((name) => {
        const joint = element.querySelector('[data-joint="' + name + '"]');
        return joint.getAttribute(name === 'tail' ? 'd' : 'transform');
      }),
    );
  }
  return {
    samples,
    sources: Array.from(element.querySelectorAll('image')).map((image) =>
      image.getAttribute('href'),
    ),
  };
});
assert.ok(
  new Set(frames.samples.map((s) => s.join('|'))).size > 10,
  'Joints must interpolate between display frames',
);
assert.equal(new Set(frames.sources).size, 1, 'All parts retain the same source artwork');
await page.locator('.site-footer').scrollIntoViewIfNeeded();
await expect(character).toHaveAttribute('data-motion', 'paused');
const frozen = await character.locator('[data-joint="head"]').getAttribute('transform');
await page.waitForTimeout(100);
assert.equal(await character.locator('[data-joint="head"]').getAttribute('transform'), frozen);
await ako.scrollIntoViewIfNeeded();
await expect(character).toHaveAttribute('data-motion', 'running');
await ako.focus();
await ako.press('Enter');
await expect(page.locator('.mascot-wrap')).toHaveClass(/is-happy/);
await page
  .getByRole('status')
  .filter({ hasText: 'Stay curious, friend.' })
  .waitFor({ state: 'visible' });
await expect(page.locator('.mascot-wrap')).not.toHaveClass(/is-happy/);
await ako.click();
await expect(page.locator('.mascot-wrap')).toHaveClass(/is-happy/);
await page.getByRole('button', { name: 'A Force', exact: true }).click();
assert.match(await page.locator('.answer-feedback').textContent(), /SI unit of force/);
await page.getByRole('button', { name: 'B Energy', exact: true }).click();
assert.match(await page.locator('.answer-feedback').textContent(), /Try again/);
await page.getByRole('button', { name: 'Switch color theme' }).click();
await page.reload();
assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
await page.getByRole('button', { name: 'Motion on', exact: true }).click();
assert.equal(await page.locator('html').getAttribute('data-motion'), 'off');
await expect(character).toHaveAttribute('data-motion', 'still');
await page.goto(base + '/rankings');
await page.getByRole('button', { name: 'Division B', exact: true }).click();
assert.equal(await page.locator('tbody tr').count(), 3);
await page.getByRole('textbox', { name: 'Search members or schools' }).fill('cloudatlas');
assert.equal(await page.locator('tbody tr').count(), 1);
await page.getByRole('textbox', { name: 'Search members or schools' }).fill('nothing here');
await page.getByRole('heading', { name: 'No members found.' }).waitFor();
await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
await page.getByRole('button', { name: 'Next', exact: true }).click();
assert.equal(
  await page.getByRole('button', { name: '2', exact: true }).getAttribute('aria-current'),
  'page',
);
await page.screenshot({ path: 'documents/qa/rankings-light.png', fullPage: true });
await page.goto(base + '/login/student');
assert.ok(await page.getByLabel('Email address').isDisabled());
await page.getByRole('button', { name: 'Create account', exact: true }).click();
assert.ok(await page.getByLabel('School password', { exact: true }).isDisabled());
await page.getByRole('link', { name: 'Explore student preview', exact: true }).click();
await expect(page.locator('.event-card')).toHaveCount(23);
await page.getByLabel('Preview division').selectOption('B');
await expect(page.locator('.event-card')).toHaveCount(23);
await expect(page.locator('.event-card').filter({ hasText: 'Astronomy' })).toHaveCount(0);
await page.getByLabel('Preview division').selectOption('A');
await page.getByRole('heading', { name: 'Small beginnings. Big discoveries.' }).waitFor();
await page.goto(base + '/preview/instructor');
await page.getByRole('button', { name: /Drew Patel/ }).click();
assert.equal(
  await page
    .getByLabel('Event', { exact: true })
    .locator('option')
    .filter({ hasText: 'Astronomy' })
    .count(),
  0,
);
await page.getByLabel('Event', { exact: true }).selectOption('solar-system');
await page.getByLabel('Due date').fill('2027-12-20');
await page.getByRole('button', { name: 'Add preview assignment', exact: true }).click();
await page.locator('.assignment-row').filter({ hasText: 'Solar System' }).waitFor();
await page.reload();
await page.locator('.assignment-row').filter({ hasText: 'Solar System' }).waitFor();
await page.getByRole('button', { name: /Sky Reed/ }).click();
assert.equal(await page.getByLabel('Event', { exact: true }).count(), 0);
await page.getByRole('button', { name: /Alex Morgan/ }).click();
await page.getByLabel('Event', { exact: true }).selectOption('astronomy');
await page.getByLabel('Due date').fill('2027-12-21');
await page.getByRole('button', { name: 'Add preview assignment', exact: true }).click();
await page.screenshot({ path: 'documents/qa/instructor-light.png', fullPage: true });
await page.goto(base + '/preview/student');
await page.getByRole('button', { name: 'Assignments', exact: true }).click();
await page.locator('.assignment-row').filter({ hasText: 'Astronomy' }).waitFor();
assert.equal(await page.locator('.assignment-row').filter({ hasText: 'Solar System' }).count(), 0);
await page.getByRole('button', { name: 'My school', exact: true }).click();
assert.equal(await page.locator('tbody tr').count(), 2);
assert.equal(await page.locator('tbody').getByText('Northstar High').count(), 0);
await page.goto(base + '/preview/student/events/astronomy?division=C');
await page.getByRole('heading', { name: 'Astronomy', exact: true }).waitFor();
assert.equal(await page.locator('.tool-card').count(), 7);
await page.locator('.tool-card').first().click();
await page.getByRole('heading', { name: /Lessons/ }).waitFor();
await page.goto(base + '/preview/student/events/astronomy?division=B');
await page.getByRole('heading', { name: 'Out of orbit.' }).waitFor();
for (const mode of ['dark', 'light']) {
  await page.evaluate((m) => {
    localStorage.setItem('akoizo-theme', m);
    localStorage.setItem('akoizo-motion', 'off');
  }, mode);
  for (const route of [
    '/',
    '/rankings',
    '/mission',
    '/login/student',
    '/login/instructor',
    '/preview/student',
    '/preview/instructor',
  ]) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(base + route, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('main').count(), 1);
    assert.ok(
      await page
        .locator('h1, h2, h3, h1 span, h2 span, h3 span')
        .evaluateAll((elements) =>
          elements.every((el) => getComputedStyle(el).fontStyle === 'normal'),
        ),
      'Headings should not be italic',
    );
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
      `${route} desktop overflow`,
    );
    if (route === '/' || route === '/mission')
      await page.screenshot({
        path: `documents/qa/${route === '/' ? 'home' : 'mission'}-${mode}.png`,
        fullPage: true,
      });
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
      `${route} mobile overflow`,
    );
    if (route === '/' || route === '/mission')
      await page.screenshot({
        path: `documents/qa/${route === '/' ? 'home' : 'mission'}-${mode}-mobile.png`,
        fullPage: true,
      });
  }
}
await page.goto(base);
await page.getByRole('button', { name: 'Open navigation' }).click();
await page
  .getByRole('navigation', { name: 'Mobile navigation' })
  .getByRole('link', { name: 'Mission', exact: true })
  .click();
await expect(page).toHaveURL(/\/mission$/);
await context.close();
const reduced = await browser.newContext({ reducedMotion: 'reduce' });
const reducedPage = await reduced.newPage();
await reducedPage.goto(base);
assert.equal(await reducedPage.locator('html').getAttribute('data-motion'), 'off');
await expect(reducedPage.locator('.ako-rig')).toHaveAttribute('data-motion', 'still');
await reducedPage.getByRole('button', { name: 'Say hello to Ako, the lab rat' }).click();
await expect(reducedPage.locator('.ako-rig')).toHaveAttribute('data-motion', 'still');
await browser.close();
assert.deepEqual(errors, []);
console.log(
  'PASS: navigation, theme persistence, mascot interaction, reduced motion, sample quiz, ranking filters/pagination, division event lists, division-safe assignments, placeholders, desktop/mobile layouts. No browser errors.',
);
