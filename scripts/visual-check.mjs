import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('documents/qa', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
await page.evaluate(() => {
  document.documentElement.dataset.motion = 'off';
  document.querySelectorAll('.reveal-ready').forEach((e) => e.classList.add('revealed'));
});
await page.screenshot({ path: 'documents/qa/home-dark.png', fullPage: true });
await page.getByRole('button', { name: 'Switch color theme' }).click();
await page.screenshot({ path: 'documents/qa/home-light.png', fullPage: true });
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: 'documents/qa/home-mobile.png', fullPage: true });
console.log(
  JSON.stringify({
    errors,
    overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
  }),
);
await browser.close();
