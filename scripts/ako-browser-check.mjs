import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
try {
  await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:3000');
  const buddy = page.getByTestId('ako-companion');
  const body = page.locator('.ako-companion-body');
  await expect(buddy).toBeVisible();
  await expect(buddy).toHaveAttribute('data-action', 'walk', { timeout: 15000 });
  const startPosition = await body.boundingBox();
  await expect
    .poll(async () => {
      const position = await body.boundingBox();
      return Math.hypot(position.x - startPosition.x, position.y - startPosition.y);
    })
    .toBeGreaterThan(5);
  await body.click({ button: 'right' });
  await expect(buddy).toHaveAttribute('data-muted', 'true');
  await expect(page.locator('.ako-bubble')).toHaveCount(0);
  await page.reload();
  await expect(buddy).toHaveAttribute('data-muted', 'true');
  await body.click({ button: 'right' });
  await expect(buddy).toHaveAttribute('data-muted', 'false');
  await body.click();
  await expect(page.getByRole('region', { name: 'Ako controls' })).toBeVisible();
  await page.getByRole('button', { name: 'angry', exact: true }).click();
  await expect(buddy).toHaveAttribute('data-action', 'angry');
  await expect(body.locator('path[fill="#ef6976"]')).not.toHaveCount(0);
  await mkdir('documents/qa', { recursive: true });
  await page.screenshot({ path: 'documents/qa/ako-pixel-desktop.png' });
  await page.getByRole('button', { name: 'Close Ako controls' }).click();
  await page.mouse.click(440, 640, { clickCount: 3 });
  await expect(buddy).toHaveAttribute('data-action', 'run');
  await expect(page.getByRole('img', { name: 'Cheese for Ako' })).toBeVisible();
  await expect(buddy).toHaveAttribute('data-action', 'eat', { timeout: 12000 });
  await expect(buddy).toHaveAttribute('data-action', 'happy', { timeout: 4000 });
  await expect(page.getByRole('img', { name: 'Cheese for Ako' })).toHaveCount(0);
  await page.screenshot({ path: 'documents/qa/ako-pixel-happy.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await body.focus();
  await page.keyboard.press('f');
  await expect(buddy).toHaveAttribute('data-action', 'eat');
  const pos = await body.boundingBox();
  if (pos.x < 0 || pos.x + pos.width > 390 || pos.y < 0 || pos.y + pos.height > 844)
    throw Error('Character out of viewport');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('region', { name: 'Ako controls' })).toBeVisible();
  await page.getByRole('button', { name: 'thinking', exact: true }).click();
  await expect(buddy).toHaveAttribute('data-action', 'thinking');
  await page.screenshot({ path: 'documents/qa/ako-pixel-mobile.png' });
  for (const action of ['happy', 'sad', 'wave', 'sleep', 'surprised']) {
    await page.getByRole('button', { name: action, exact: true }).click();
    await expect(buddy).toHaveAttribute('data-action', action);
  }
  await page.getByRole('button', { name: 'Close Ako controls' }).click();
  await page.setViewportSize({ width: 320, height: 640 });
  await body.focus();
  await page.keyboard.press('Enter');
  const panel = await page.getByRole('region', { name: 'Ako controls' }).boundingBox();
  if (panel.x < 0 || panel.x + panel.width > 320 || panel.y + panel.height > 640)
    throw Error('Controls out of viewport');
  if (errors.length) throw Error(errors.join('\n'));
  console.log(
    'Ako browser checks passed: mute persistence, emotions, triple-click chase/eat/happy, mobile bounds, reduced motion, keyboard controls.',
  );
} finally {
  await browser.close();
}
