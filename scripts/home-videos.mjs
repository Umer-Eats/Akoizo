import { chromium, expect } from '@playwright/test';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { mockSession, profiles, signIn } from './lib-mock-session.mjs';

// Records the short clips shown on the landing pages from a signed-in demo student account.
// Sign-in and every API call are mocked in the browser (see lib-mock-session.mjs).
// Usage: TEST_BASE_URL=http://127.0.0.1:3006 node scripts/home-videos.mjs [clip ...]
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3005';
const out = process.env.HOME_VIDEOS_DIR || 'public/home/videos';
const ffmpeg =
  process.env.FFMPEG ||
  'akoizo-promo/node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe';
const size = { width: 1440, height: 900 };
await mkdir(out, { recursive: true });

// Playwright videos have no pointer, so draw one that follows the mouse and pulses on click.
const cursorScript = () => {
  const add = () => {
    if (document.getElementById('qa-cursor')) return;
    const c = document.createElement('div');
    c.id = 'qa-cursor';
    c.style.cssText =
      'position:fixed;left:0;top:0;width:22px;height:22px;z-index:2147483647;pointer-events:none;' +
      'transform:translate(-100px,-100px);transition:transform 40ms linear';
    c.innerHTML =
      '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 2l15 9-6.5 1.6L9.6 19z" fill="#fff" stroke="#000" stroke-width="1.4" stroke-linejoin="round"/></svg>' +
      '<span style="position:absolute;left:-9px;top:-9px;width:22px;height:22px;border-radius:50%;border:2px solid #4d7cff;opacity:0;transition:opacity .2s,transform .35s"></span>';
    document.body.appendChild(c);
    const ring = c.querySelector('span');
    addEventListener('mousemove', (e) => (c.style.transform = `translate(${e.clientX}px,${e.clientY}px)`), true);
    addEventListener('mousedown', () => {
      ring.style.transition = 'none';
      ring.style.opacity = '1';
      ring.style.transform = 'scale(.6)';
      requestAnimationFrame(() => {
        ring.style.transition = 'opacity .45s, transform .45s';
        ring.style.opacity = '0';
        ring.style.transform = 'scale(2.2)';
      });
    }, true);
  };
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', add);
  else add();
};

// Glides the pointer to an element, then clicks it.
async function glide(page, locator, { click = true } = {}) {
  await locator.scrollIntoViewIfNeeded();
  const box = await locator.boundingBox();
  if (!box) return;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 24 });
  await page.waitForTimeout(250);
  if (click) await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
}

async function scrollBy(page, distance, ms = 1400) {
  const steps = Math.round(ms / 16);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, distance / steps);
    await page.waitForTimeout(16);
  }
}

const clips = {
  // Find events by timeslot colour, then open one.
  async dashboard(page) {
    await page.goto(`${base}/dashboard/student`);
    await page.locator('.slot-chip').first().waitFor();
    await page.mouse.move(700, 300);
    await page.waitForTimeout(800);
    await scrollBy(page, 560, 1200);
    for (const name of ['Purple timeslot', 'Pink timeslot', 'Green timeslot', 'All timeslots']) {
      await glide(page, page.getByRole('button', { name, exact: true }));
      await page.waitForTimeout(900);
    }
    await glide(page, page.locator('a[href$="/events/astronomy/lessons"]').first());
    await page.waitForURL(/events\/astronomy\/lessons$/);
    await page.locator('.unit-button').first().waitFor();
    await page.waitForTimeout(1200);
    await glide(page, page.locator('.event-feature-link').nth(1));
    await page.waitForTimeout(1800);
  },
  // Open a unit, read it, and try the interactive model.
  async lessons(page) {
    await page.goto(`${base}/dashboard/student/events/anatomy-and-physiology/lessons`);
    await page.locator('.unit-button').first().waitFor();
    await page.mouse.move(700, 400);
    await page.waitForTimeout(700);
    await glide(page, page.locator('.unit-button').nth(2));
    await expect(page.locator('.lesson-reading')).toBeVisible();
    await page.waitForTimeout(900);
    await scrollBy(page, 900, 2200);
    await page.waitForTimeout(600);
    const slider = page.locator('.lesson-sim input[type=range]').first();
    if (await slider.count()) {
      await slider.scrollIntoViewIfNeeded();
      const box = await slider.boundingBox();
      await page.mouse.move(box.x + box.width * 0.3, box.y + box.height / 2, { steps: 20 });
      await page.mouse.down();
      await page.mouse.move(box.x + box.width * 0.85, box.y + box.height / 2, { steps: 40 });
      await page.mouse.move(box.x + box.width * 0.5, box.y + box.height / 2, { steps: 30 });
      await page.mouse.up();
      await page.waitForTimeout(1200);
    } else await scrollBy(page, 700, 1600);
  },
  // Answer questions on a real past paper beside the original test.
  async test(page) {
    await page.goto(
      `${base}/dashboard/student/events/astronomy/practice-tests/bullso-2026-astronomy-c`,
    );
    await page.locator('.practice-question').first().waitFor();
    await page.mouse.move(700, 400);
    await page.waitForTimeout(800);
    await scrollBy(page, 520, 1200);
    await page.waitForTimeout(1500);
    for (const [name, value] of [
      ['1', 'B'],
      ['2', 'C'],
      ['3', 'A'],
    ]) {
      await glide(page, page.locator(`input[name="${name}"][value="${value}"]`));
      await page.waitForTimeout(500);
    }
    await page.waitForTimeout(1200);
  },
  // Run an archive lab: hypothesis, controls, measurements.
  async lab(page) {
    await page.goto(`${base}/dashboard/student/events/chemistry-lab/lab-practice`);
    const lab = page.getByRole('button', { name: /Follow a fading dye/ });
    await lab.waitFor();
    await page.mouse.move(700, 400);
    await page.waitForTimeout(600);
    await glide(page, lab);
    const hypothesis = page.getByLabel('Your hypothesis', { exact: true });
    await glide(page, hypothesis);
    await hypothesis.pressSequentially('Absorbance falls exponentially, so ln(A) is linear in time.', {
      delay: 22,
    });
    const slider = page.locator('.archive-controls input[type=range]').first();
    await slider.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const record = page.getByRole('button', { name: 'Record measurement', exact: true });
    for (let n = 0; n < 3; n++) {
      // Point at the control, then step it with the keyboard so each trial differs.
      await glide(page, slider, { click: false });
      await slider.focus();
      for (let k = 0; k < 4; k++) {
        await slider.press('ArrowRight');
        await page.waitForTimeout(120);
      }
      await page.waitForTimeout(300);
      await glide(page, record);
      await page.waitForTimeout(500);
    }
    await page.waitForTimeout(1200);
  },
};

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const only = process.argv.slice(2);
try {
  for (const [name, run] of Object.entries(clips)) {
    if (only.length && !only.includes(name)) continue;
    const context = await browser.newContext({ viewport: size, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.addInitScript(cursorScript);
    // A demo student with a little progress, so the dashboard is not all zeros.
    await mockSession(page, {
      role: 'student',
      theme: 'dark',
      api: (url) =>
        url.pathname === '/api/dashboard'
          ? {
              profile: { ...profiles.student },
              students: [],
              stats: { lessons: 14, practice: 6, ranked: 2, points: 380 },
              assignments: [],
              progress: {},
            }
          : undefined,
    });
    await signIn(page, base);
    await page.waitForTimeout(500);

    // Record from Chrome's screencast so text stays sharp.
    const frames = [];
    const cdp = await context.newCDPSession(page);
    cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
      frames.push({ data, time: metadata.timestamp });
      await cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
    });
    await cdp.send('Page.startScreencast', {
      format: 'jpeg',
      quality: 92,
      maxWidth: size.width,
      maxHeight: size.height,
    });
    await run(page);
    await cdp.send('Page.stopScreencast');
    await context.close();

    // Each frame is held until the next one arrives, so idle moments keep their length.
    const dir = await mkdtemp(path.join(tmpdir(), `akoizo-${name}-`));
    const list = [];
    frames.forEach((frame, i) => {
      const next = frames[i + 1]?.time ?? frame.time + 1;
      list.push(`file 'f${i}.jpg'`, `duration ${Math.max(0.001, next - frame.time).toFixed(4)}`);
    });
    list.push(`file 'f${frames.length - 1}.jpg'`);
    await Promise.all(
      frames.map((frame, i) => writeFile(path.join(dir, `f${i}.jpg`), Buffer.from(frame.data, 'base64'))),
    );
    await writeFile(path.join(dir, 'list.txt'), list.join('\n'));
    const mp4 = path.resolve(out, `${name}.mp4`);
    execFileSync(ffmpeg, [
      '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(dir, 'list.txt'),
      '-vf', 'scale=1280:-2:flags=lanczos', '-r', '30', '-fps_mode', 'cfr', '-c:v', 'libx264', '-preset', 'slow',
      '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', mp4,
    ]);
    execFileSync(ffmpeg, [
      '-y', '-loglevel', 'error', '-sseof', '-0.5', '-i', mp4, '-frames:v', '1', '-q:v', '4',
      path.resolve(out, `${name}.jpg`),
    ]);
    await rm(dir, { recursive: true, force: true });
    console.log(`${name}: ${frames.length} frames → ${mp4}`);
  }
} finally {
  await browser.close();
}
