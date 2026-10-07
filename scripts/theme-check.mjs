import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const out = 'output/theme-qa';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3002';
const routes = [
  '/',
  '/mission',
  '/rankings',
  '/login/student',
  '/login/instructor',
  '/dashboard/student',
  '/dashboard/instructor',
  '/dashboard/student/events/astronomy?division=C',
  '/dashboard/student/events/astronomy/lessons',
  '/not-a-page',
];
try {
  await page.goto(base);
  await page.getByRole('button', { name: 'Switch color theme' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Switch color theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('.ako-rig')).toHaveAttribute('data-motion', 'still');
  for (const mode of ['dark', 'light']) {
    await page.evaluate((value) => localStorage.setItem('akoizo-theme', value), mode);
    for (const route of routes) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await expect(page.locator('html')).toHaveAttribute('data-theme', mode);
      await expect(page.locator('main')).toHaveCount(1);
      await page.evaluate(() => document.fonts.ready);
      const name = route === '/' ? 'home' : route.split('?')[0].slice(1).replaceAll('/', '-');
      for (const width of [1440, 768, 390, 320]) {
        await page.setViewportSize({ width, height: width > 800 ? 1000 : 844 });
        assert.equal(
          await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
          false,
          `${route} ${mode} overflow at ${width}`,
        );
        if (width === 1440 || width === 390) {
          await page.screenshot({ path: `${out}/${name}-${mode}-${width}.png`, fullPage: true });
        }
      }
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Mission' })
    .click();
  await expect(page).toHaveURL(/\/mission$/);
  await page.goto(base);
  await page.getByRole('link', { name: '02 / PRACTICE Find your momentum.' }).click();
  await expect(page).toHaveURL(/#practice$/);
  await page.getByRole('button', { name: 'A Force', exact: true }).click();
  await expect(page.locator('.answer-feedback')).toContainText('SI unit of force');
  for (const role of ['student', 'instructor']) {
    await page.goto(`${base}/login/${role}`);
    await expect(page.getByLabel('Email address')).toBeVisible();
    await page.getByRole('button', { name: 'Create account', exact: true }).click();
    await expect(
      page.getByLabel(role === 'student' ? 'School password' : 'Instructor invitation password', {
        exact: true,
      }),
    ).toBeEnabled();
  }
  assert.deepEqual(errors, []);
  console.log(
    'PASS: public and guarded routes, 2 themes, 4 viewport sizes; persisted theme, reduced motion, mobile navigation, section navigation, quiz, and both enrollment forms. No browser errors.',
  );
} finally {
  await browser.close();
}
