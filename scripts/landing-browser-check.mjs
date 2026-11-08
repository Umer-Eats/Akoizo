import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3006';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(`${base}/study-tools`);
  const guides = await page
    .locator('.lx-event')
    .evaluateAll((links) => links.map((a) => a.pathname));
  for (const route of [
    '/',
    '/mission',
    '/contact',
    '/study-tools',
    '/rankings',
    '/login/student',
    '/login/instructor',
    ...new Set(guides),
  ]) {
    const response = await page.goto(base + route);
    assert.equal(response.status(), 200, route);
    await page.evaluate(() => document.fonts.ready);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const theme of ['dark', 'light']) {
        await page.evaluate((value) => (document.documentElement.dataset.theme = value), theme);
        assert.equal(
          await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
          false,
          `${route}: overflow at ${width}, ${theme}`,
        );
      }
    }
  }
  await page.close();

  // Capture canvas node positions at paint time to detect jumps and runaway motion.
  const motionPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  motionPage.on('pageerror', (error) => errors.push(error.message));
  await motionPage.addInitScript(() => {
    const clear = CanvasRenderingContext2D.prototype.clearRect;
    const arc = CanvasRenderingContext2D.prototype.arc;
    window.graphFrames = [];
    CanvasRenderingContext2D.prototype.clearRect = function (...args) {
      if (this.canvas.closest('.vx-graph')) {
        window.graphFrames.push({ time: performance.now(), nodes: [] });
        if (window.graphFrames.length > 600) window.graphFrames.shift();
      }
      return clear.apply(this, args);
    };
    CanvasRenderingContext2D.prototype.arc = function (x, y, radius, ...args) {
      if (this.canvas.closest('.vx-graph') && (radius === 3 || radius === 5)) {
        window.graphFrames.at(-1)?.nodes.push({ x, y });
      }
      return arc.call(this, x, y, radius, ...args);
    };
  });
  await motionPage.goto(base);
  await motionPage.waitForFunction(() => window.graphFrames.length > 90);
  await motionPage
    .locator('.vx-graph canvas')
    .dispatchEvent('pointermove', { clientX: 1250, clientY: 250 });
  await motionPage.waitForFunction(() => window.graphFrames.length > 180);
  const movement = await motionPage.evaluate(() => {
    const frames = window.graphFrames.filter((frame) => frame.nodes.length > 0).slice(3);
    let speed = 0;
    let travel = 0;
    frames.forEach((frame, i) =>
      frame.nodes.forEach((node, j) => {
        const start = frames[0].nodes[j];
        travel = Math.max(travel, Math.hypot(node.x - start.x, node.y - start.y));
        if (!i) return;
        const previous = frames[i - 1];
        const dt = Math.max(1, frame.time - previous.time) / 1000;
        speed = Math.max(
          speed,
          Math.hypot(node.x - previous.nodes[j].x, node.y - previous.nodes[j].y) / dt,
        );
      }),
    );
    return { speed, travel, count: frames[0].nodes.length };
  });
  assert.ok(movement.count > 20, 'Graph rendered its event nodes');
  assert.ok(
    movement.travel > 0.1 && movement.travel < 20,
    `Bounded drift: ${JSON.stringify(movement)}`,
  );
  assert.ok(movement.speed < 80, `No abrupt node jumps: ${JSON.stringify(movement)}`);
  await motionPage.emulateMedia({ reducedMotion: 'reduce' });
  const stopped = await motionPage.locator('.vx-graph canvas').evaluate((el) => el.toDataURL());
  await motionPage.waitForTimeout(250);
  assert.equal(
    await motionPage.locator('.vx-graph canvas').evaluate((el) => el.toDataURL()),
    stopped,
    'Reduced motion freezes graph',
  );
  await motionPage.emulateMedia({ reducedMotion: 'no-preference' });
  await motionPage.getByRole('button', { name: 'Motion on', exact: true }).click();
  const paused = await motionPage.locator('.vx-graph canvas').evaluate((el) => el.toDataURL());
  await motionPage.waitForTimeout(250);
  assert.equal(
    await motionPage.locator('.vx-graph canvas').evaluate((el) => el.toDataURL()),
    paused,
    'Motion toggle freezes graph',
  );
  assert.deepEqual(errors, []);
  console.log(
    `PASS: ${guides.length} event guides and public pages, five widths, both themes; smooth graph motion, reduced motion and pause.`,
    movement,
  );
} finally {
  await browser.close();
}
