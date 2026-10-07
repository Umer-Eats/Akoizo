import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://127.0.0.1:3000');
  const title = page.locator('.hero-title');
  await expect(title).toHaveCSS('animation-name', 'title-reveal');
  const sweep = () => title.evaluate(el => { const s = getComputedStyle(el, '::after'); return { name: s.animationName, position: s.backgroundPosition }; });
  assert.equal((await sweep()).name, 'title-sweep');
  await page.waitForTimeout(2800);
  const before = (await sweep()).position;
  await page.waitForTimeout(500);
  assert.notEqual((await sweep()).position, before);
  await page.screenshot({ path: 'output/theme-qa/sharp-home-dark.png' });
  await page.getByRole('button', { name: 'Switch color theme' }).click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'output/theme-qa/sharp-home-light.png' });
  await page.getByRole('button', { name: 'Motion on', exact: true }).click();
  await expect(title).toHaveCSS('animation-name', 'none');
  assert.equal((await sweep()).name, 'none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => document.documentElement.dataset.motion = 'on');
  await expect(title).toHaveCSS('animation-name', 'none');
  assert.equal((await sweep()).name, 'none');
  assert.equal(await page.locator('.specimen-core, .specimen-orbit, .holo-orb, .community-orbit').count(), 0);
  console.log('PASS: title reveal and moving light sweep; motion-off and reduced-motion stop both; bubble graphics removed.');
} finally { await browser.close(); }
