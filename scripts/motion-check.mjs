import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

await mkdir('output/theme-qa', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3002';
const style = (selector, property, pseudo = null) =>
  page
    .locator(selector)
    .first()
    .evaluate((el, args) => getComputedStyle(el, args.pseudo).getPropertyValue(args.property), {
      property,
      pseudo,
    });
try {
  await page.goto(base);
  await expect(page.locator('.title-glyph')).toHaveCount(6);
  await expect(page.getByRole('heading', { name: 'Akoizo', exact: true })).toBeVisible();
  await expect(page.locator('.hero-brand')).toHaveAttribute('data-art-visible', 'true');
  await expect.poll(() => style('.title-glyph', 'animation-name')).toContain('glyph-arrive');
  const frame = await style('.vector-stack i', 'translate');
  await expect.poll(() => style('.vector-stack i', 'translate')).not.toBe(frame);
  await page.waitForTimeout(1600);
  const letters = await page
    .locator('.title-glyph')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().toJSON()));
  assert.ok(
    letters[1].left - letters[0].right > 20,
    'The desktop title has generous space between letters',
  );
  await page.screenshot({ path: 'output/theme-qa/animated-hero-dark.png' });
  await page.locator('.lesson-diagram').scrollIntoViewIfNeeded();
  await expect(page.locator('.hero-brand')).toHaveAttribute('data-art-visible', 'false');
  assert.match(await style('.title-glyph', 'animation-play-state'), /paused/);
  await expect(page.locator('.lesson-art')).toHaveAttribute('data-art-visible', 'true');
  const bar = await style('.diagram-bars i', 'transform');
  await expect.poll(() => style('.diagram-bars i', 'transform')).not.toBe(bar);
  await page.getByRole('button', { name: 'Motion on', exact: true }).click();
  assert.equal(await style('.title-glyph', 'animation-name'), 'none');
  assert.equal(await style('.diagram-bars i', 'animation-name'), 'none');
  assert.equal(await style('.specimen-scan', 'display'), 'none');
  await page.getByRole('button', { name: 'Motion off', exact: true }).click();
  for (const route of ['/mission', '/login/student', '/rankings', '/login/instructor']) {
    await page.goto(base + route);
    const scene =
      route === '/mission'
        ? '.mission-hero'
        : route.includes('login')
          ? '.auth-card'
          : route === '/rankings'
            ? '.page-heading'
            : '.dashboard-heading';
    await expect(page.locator(scene)).toHaveAttribute('data-art-visible', 'true');
    assert.equal(await style(scene, 'animation-name', '::after'), 'border-transmit');
  }
  await page.goto(base);
  for (const mode of ['dark', 'light']) {
    await page.evaluate((value) => (document.documentElement.dataset.theme = value), mode);
    for (const width of [1440, 1024, 768, 680, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        `${mode} overflow at ${width}`,
      );
      assert.ok(
        await page
          .locator('.title-glyph')
          .last()
          .evaluate((el) => el.getBoundingClientRect().right <= innerWidth),
        `Title fits at ${width}`,
      );
      if (width === 390 || (mode === 'light' && width === 1440)) {
        await page.screenshot({ path: `output/theme-qa/animated-hero-${mode}-${width}.png` });
      }
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await style('.title-glyph', 'animation-name'), 'none');
  assert.equal(await style('.vector-stack i', 'animation-name'), 'none');
  assert.equal(await style('.specimen-scan', 'display'), 'none');
  assert.deepEqual(errors, []);
  console.log(
    'PASS: spread title, live artwork motion, offscreen pause, page navigation, motion toggle, reduced motion, two themes and six responsive widths.',
  );
} finally {
  await browser.close();
}
