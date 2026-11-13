import { chromium, expect } from '@playwright/test';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mockSession, signIn } from '../../scripts/lib-mock-session.mjs';
import { qaWorld } from '../../scripts/lib-qa-world.mjs';

// Records portrait (1080 × 1920) clips of the real app for the Instagram Reel.
// Sign-in and every API call are mocked over an in-memory demo school (lib-qa-world.mjs),
// so no live account or database is touched.
// Run from the Akoizo root: TEST_BASE_URL=http://127.0.0.1:3006 node akoizo-promo/scripts/reel-capture.mjs [clip ...]
const here = path.dirname(fileURLToPath(import.meta.url));
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3006';
const out = path.resolve(here, '../public/reel');
const ffmpeg = path.resolve(here, '../node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe');
const viewport = { width: 540, height: 960 };
await mkdir(out, { recursive: true });

// A phone-style touch indicator: a soft dot that follows the pointer and ripples on tap.
const touchScript = () => {
  const add = () => {
    if (document.getElementById('qa-touch')) return;
    const c = document.createElement('div');
    c.id = 'qa-touch';
    c.style.cssText =
      'position:fixed;left:0;top:0;width:40px;height:40px;margin:-20px 0 0 -20px;z-index:2147483647;' +
      'pointer-events:none;border-radius:50%;background:rgba(255,255,255,.55);border:2px solid #fff;' +
      'box-shadow:0 0 0 6px rgba(77,124,255,.35);transform:translate(-200px,-200px);opacity:.9;' +
      'transition:transform 30ms linear';
    const ring = document.createElement('div');
    ring.style.cssText =
      'position:absolute;inset:-14px;border-radius:50%;border:3px solid #7aa0ff;opacity:0';
    c.appendChild(ring);
    document.body.appendChild(c);
    addEventListener('mousemove', (e) => (c.style.transform = `translate(${e.clientX}px,${e.clientY}px)`), true);
    addEventListener('mousedown', () => {
      c.style.background = 'rgba(122,160,255,.75)';
      ring.style.transition = 'none';
      ring.style.opacity = '1';
      ring.style.transform = 'scale(.5)';
      requestAnimationFrame(() => {
        ring.style.transition = 'opacity .5s, transform .5s';
        ring.style.opacity = '0';
        ring.style.transform = 'scale(1.8)';
      });
    }, true);
    addEventListener('mouseup', () => (c.style.background = 'rgba(255,255,255,.55)'), true);
  };
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', add);
  else add();
};

async function tap(page, locator, { click = true, steps = 14 } = {}) {
  await locator.scrollIntoViewIfNeeded();
  const box = await locator.boundingBox();
  if (!box) return;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps });
  await page.waitForTimeout(140);
  if (click) await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
}

async function scrollBy(page, distance, ms = 1000) {
  const steps = Math.round(ms / 16);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, distance / steps);
    await page.waitForTimeout(16);
  }
}

const tryStep = async (label, fn) => {
  try {
    await fn();
  } catch (e) {
    console.log(`  step skipped (${label}): ${e.message.split('\n')[0]}`);
  }
};

const clips = {
  // The landing page constellation: every event, linked.
  async hero(page) {
    await page.goto(`${base}/`);
    await page.waitForTimeout(500);
    await page.mouse.move(270, 300);
    await page.waitForTimeout(2600);
    await page.mouse.move(380, 220, { steps: 30 });
    await page.waitForTimeout(900);
    await scrollBy(page, 380, 900);
    await page.waitForTimeout(700);
  },
  // The 2027 event catalog, filtered by timeslot colour.
  async catalog(page) {
    await page.goto(`${base}/dashboard/student`);
    await page.locator('.slot-chip').first().waitFor();
    await page.mouse.move(270, 500);
    await page.waitForTimeout(600);
    await scrollBy(page, 540, 700);
    await page.waitForTimeout(300);
    for (const name of ['Pink timeslot', 'Purple timeslot', 'Green timeslot', 'All timeslots'])
      await tryStep(name, async () => {
        await tap(page, page.getByRole('button', { name, exact: true }));
        await page.waitForTimeout(550);
      });
    await scrollBy(page, 1800, 1800);
    await page.waitForTimeout(400);
  },
  // Open a unit, read, and drag the interactive breathing model.
  async lesson(page) {
    await page.goto(`${base}/dashboard/student/events/anatomy-and-physiology/lessons`);
    await page.locator('.unit-button').first().waitFor();
    await page.mouse.move(270, 500);
    await page.waitForTimeout(400);
    await tap(page, page.locator('.unit-button').nth(2));
    await page.locator('.lesson-reading').waitFor();
    await page.waitForTimeout(600);
    await scrollBy(page, 700, 1100);
    const slider = page.locator('.lesson-sim input[type=range]').first();
    await tryStep('slider', async () => {
      await slider.scrollIntoViewIfNeeded();
      await page.evaluate(() => {
        const el = document.querySelector('.lesson-sim');
        if (el) window.scrollBy(0, el.getBoundingClientRect().top - 90);
      });
      await page.waitForTimeout(500);
      const box = await slider.boundingBox();
      await page.mouse.move(box.x + box.width * 0.4, box.y + box.height / 2, { steps: 12 });
      await page.mouse.down();
      await page.mouse.move(box.x + box.width * 0.95, box.y + box.height / 2, { steps: 30 });
      await page.mouse.move(box.x + box.width * 0.1, box.y + box.height / 2, { steps: 40 });
      await page.mouse.move(box.x + box.width * 0.6, box.y + box.height / 2, { steps: 24 });
      await page.mouse.up();
      await page.waitForTimeout(800);
    });
  },
  // A virtual chemistry lab: hypothesis, controls, recorded trials.
  async lab(page) {
    await page.goto(`${base}/dashboard/student/events/chemistry-lab/lab-practice`);
    const lab = page.getByRole('button', { name: /Follow a fading dye/ });
    await lab.waitFor();
    await page.mouse.move(270, 500);
    await page.waitForTimeout(400);
    await tap(page, lab);
    await tryStep('hypothesis', async () => {
      const hypothesis = page.getByLabel('Your hypothesis', { exact: true });
      await tap(page, hypothesis);
      await hypothesis.pressSequentially('Absorbance falls exponentially over time.', { delay: 18 });
    });
    await tryStep('trials', async () => {
      const slider = page.locator('.archive-controls input[type=range]').first();
      const record = page.getByRole('button', { name: 'Record measurement', exact: true });
      for (let n = 0; n < 3; n++) {
        await tap(page, slider, { click: false });
        await slider.focus();
        for (let k = 0; k < 4; k++) {
          await slider.press('ArrowRight');
          await page.waitForTimeout(90);
        }
        await tap(page, record);
        await page.waitForTimeout(350);
      }
      await scrollBy(page, 500, 800);
      await page.waitForTimeout(700);
    });
  },
  // A real past tournament paper: answer questions.
  async paper(page) {
    await page.goto(`${base}/dashboard/student/events/astronomy/practice-tests/bullso-2026-astronomy-c`);
    const first = page.locator('.practice-question').first();
    await first.waitFor();
    await page.mouse.move(270, 500);
    await page.evaluate(() => {
      const el = document.querySelector('.practice-question');
      window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - 120);
    });
    await page.waitForTimeout(700);
    for (const [name, value] of [
      ['1', 'B'],
      ['2', 'C'],
      ['3', 'A'],
      ['4', 'B'],
    ])
      await tryStep(`q${name}`, async () => {
        await tap(page, page.locator(`input[name="${name}"][value="${value}"]`));
        await page.waitForTimeout(380);
      });
    await page.waitForTimeout(600);
  },
  // The binder generator for a notes event.
  async binder(page) {
    await page.goto(`${base}/dashboard/student/events/astronomy/binder-generator`);
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.mouse.move(300, 500);
    await page.waitForTimeout(900);
    await scrollBy(page, 420, 900);
    await page.waitForTimeout(500);
    await scrollBy(page, 900, 1400);
    await page.waitForTimeout(600);
  },
  // Coaches: team sheets coloured by tournament timeslot.
  async teams(page) {
    await page.goto(`${base}/dashboard/instructor`);
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.mouse.move(270, 500);
    await page.waitForTimeout(500);
    await tryStep('teams tab', async () => {
      await tap(page, page.getByRole('button', { name: /Teams/ }).first());
      await page.waitForTimeout(900);
    });
    await scrollBy(page, 700, 1100);
    await page.waitForTimeout(500);
    await scrollBy(page, 900, 1200);
    await page.waitForTimeout(500);
  },
  // Coaches: reveal and copy the student joining password.
  async school(page) {
    await page.goto(`${base}/dashboard/instructor?tab=school`);
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.mouse.move(270, 500);
    await page.waitForTimeout(900);
    await tryStep('reveal', async () => {
      await tap(page, page.getByRole('button', { name: 'Show student joining password' }));
      await page.waitForTimeout(1200);
    });
    await tryStep('copy', async () => {
      await tap(page, page.getByRole('button', { name: /Copy password|Copied/ }));
      await page.waitForTimeout(1400);
    });
  },
  // Coaches: pick an event, choose a lesson, assign it to the seated students.
  async assign(page) {
    await page.goto(`${base}/dashboard/instructor?tab=assignments`);
    await page.locator('.event-card-link').first().waitFor();
    await page.mouse.move(270, 500);
    await page.waitForTimeout(700);
    await scrollBy(page, 420, 800);
    await tryStep('event', async () => {
      await tap(page, page.locator('.event-card-link', { hasText: 'Astronomy' }).first());
      await page.waitForTimeout(900);
    });
    await tryStep('lessons tab', async () => {
      await tap(page, page.getByRole('button', { name: 'Lessons by unit' }));
      await page.waitForTimeout(700);
    });
    await tryStep('work', async () => {
      await tap(page, page.locator('.assign-pill:not([disabled])').first());
      await page.waitForTimeout(800);
    });
    await tryStep('students', async () => {
      const boxes = page.locator('.assign-student-list input[type=checkbox]');
      const n = Math.min(3, await boxes.count());
      for (let i = 0; i < n; i++) {
        await tap(page, boxes.nth(i));
        await page.waitForTimeout(220);
      }
    });
    await tryStep('due', async () => {
      const due = page.getByLabel('Due date');
      if (!(await due.inputValue())) await due.fill('2026-12-05');
    });
    await tryStep('assign', async () => {
      await tap(page, page.locator('.assign-modal-footer .button-primary'));
      await page.waitForTimeout(1500);
    });
  },
  // Coaches: school analytics.
  async analytics(page) {
    await page.goto(`${base}/dashboard/instructor?tab=analytics`);
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.mouse.move(270, 500);
    await page.waitForTimeout(900);
    await scrollBy(page, 700, 1300);
    await page.waitForTimeout(500);
    await scrollBy(page, 800, 1300);
    await page.waitForTimeout(600);
  },
  // Coaches: each student's next steps.
  async progress(page) {
    await page.goto(`${base}/dashboard/instructor?tab=progress`);
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.mouse.move(270, 500);
    await page.waitForTimeout(900);
    await scrollBy(page, 600, 1100);
    await page.waitForTimeout(500);
    await scrollBy(page, 700, 1200);
    await page.waitForTimeout(600);
  },
  // Coaches: see lessons exactly as students do.
  async studyview(page) {
    await page.goto(`${base}/dashboard/instructor?tab=study`);
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.mouse.move(270, 500);
    await page.waitForTimeout(900);
    await scrollBy(page, 600, 1100);
    await page.waitForTimeout(500);
    await scrollBy(page, 700, 1200);
    await page.waitForTimeout(600);
  },
  // School community analytics.
  async community(page) {
    await page.goto(`${base}/community`);
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.mouse.move(270, 500);
    await page.waitForTimeout(700);
    await scrollBy(page, 900, 1300);
    await page.waitForTimeout(500);
    await scrollBy(page, 900, 1300);
    await page.waitForTimeout(500);
  },
};

const world = await qaWorld();

// Six weeks of plausible practice, lessons and checkpoints so the coach analytics and progress
// clips show real charts. In-memory demo data only.
async function seedActivity() {
  const roster = {
    'qa-student': ['C', ['astronomy', 'anatomy-and-physiology', 'chemistry-lab']],
    'qa-ben': ['C', ['circuit-lab', 'forensics', 'codebusters']],
    'qa-cal': ['C', ['disease-detectives', 'botany']],
    'qa-dee': ['B', ['heredity', 'meteorology']],
    'qa-eli': ['B', ['water-quality']],
    'qa-fay': ['C', ['dynamic-planet', 'thermodynamics']],
  };
  const day = (n) => new Date(Date.UTC(2026, 10, 12) - n * 864e5).toISOString();
  const statements = [];
  let k = 0;
  for (const [uid, [division, events]] of Object.entries(roster)) {
    const id = world.profiles[uid].id;
    for (const [e, eventId] of events.entries()) {
      const event = `2027:${division}:${eventId}`;
      for (let w = 0; w < 6; w++) {
        const score = Math.round(42 + w * 7 + ((k * 13) % 17) - e * 3);
        const attempt = `qa-attempt-${k++}`;
        statements.push({
          sql: 'INSERT INTO test_attempts (id,student_id,event_id,type,score,max_score,points_awarded,started_at,completed_at) VALUES (?,?,?,?,?,?,?,?,?)',
          args: [attempt, id, event, w % 3 === 2 ? 'Ranked' : 'Practice', Math.min(98, score), 100, 20, day(42 - w * 7), day(42 - w * 7)],
        });
      }
      for (let l = 0; l < 4 + ((k + e) % 4); l++) {
        statements.push({
          sql: 'INSERT INTO lesson_progress (student_id,event_id,lesson_id,completed_at) VALUES (?,?,?,?)',
          args: [id, event, `qa-lesson-${l}`, day(30 - l * 4)],
        });
        for (const part of ['learn', 'practice', 'checkpoint'])
          statements.push({
            sql: 'INSERT INTO lesson_parts (student_id,event_id,lesson_id,part,score,max_score,completed_at) VALUES (?,?,?,?,?,?,?)',
            args: [id, event, `qa-lesson-${l}`, part, part === 'learn' ? null : 7 + (l % 3), part === 'learn' ? null : 10, day(30 - l * 4)],
          });
        for (let q = 0; q < 5; q++)
          statements.push({
            sql: 'INSERT INTO lesson_answers (student_id,event_id,lesson_id,question_id,answer,correct,graded_by,checked_at) VALUES (?,?,?,?,?,?,?,?)',
            args: [id, event, `qa-lesson-${l}`, `q${q}`, 'A', (q + l + e) % 4 ? 1 : 0, 'key', day(30 - l * 4)],
          });
      }
    }
  }
  await world.db.batch(statements);
}
await seedActivity().catch((e) => console.log(`  demo activity not seeded: ${e.message}`));
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const only = process.argv.slice(2);
try {
  for (const [name, run] of Object.entries(clips)) {
    if (only.length && !only.includes(name)) continue;
    const coachClips = ['teams', 'school', 'assign', 'analytics', 'progress', 'studyview'];
    const role = coachClips.includes(name) ? 'instructor' : 'student';
    const context = await browser.newContext({ viewport, deviceScaleFactor: 2 });
    const page = await context.newPage();
    await page.addInitScript(touchScript);
    const profile = world.profiles[role === 'student' ? 'student' : 'instructor'];
    await mockSession(page, {
      role,
      theme: 'dark',
      api: async (url, request) => {
        if (url.pathname === '/api/school/password')
          return { schoolName: profile.schoolName, joiningPassword: 'ORBIT-NOVA-4821' };
        if (url.pathname === '/api/assignments' && request.method() === 'POST')
          return { assigned: 3, alreadyAssigned: 0 };
        const json = await world.handle(url, request, profile);
        // A little progress, so the dashboard is not all zeros.
        if (url.pathname === '/api/dashboard' && role === 'student' && json)
          return { ...json, stats: { ...json.stats, lessons: 14, practice: 6, ranked: 3 } };
        return json;
      },
    });
    if (name !== 'hero') await signIn(page, base, role);
    await page.waitForTimeout(400);

    const frames = [];
    const cdp = await context.newCDPSession(page);
    cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
      frames.push({ data, time: metadata.timestamp });
      await cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
    });
    await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 94, maxWidth: 1080, maxHeight: 1920 });
    try {
      await run(page);
    } catch (e) {
      console.log(`  ${name} ended early: ${e.message.split('\n')[0]}`);
    }
    await cdp.send('Page.stopScreencast');
    await context.close();
    if (frames.length < 5) {
      console.log(`${name}: too few frames`);
      continue;
    }

    // Each frame is held until the next arrives, so idle moments keep their length.
    const dir = await mkdtemp(path.join(tmpdir(), `akoizo-reel-${name}-`));
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
    const mp4 = path.join(out, `${name}.mp4`);
    execFileSync(ffmpeg, [
      '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(dir, 'list.txt'),
      '-vf', 'scale=1080:1920:flags=lanczos', '-r', '30', '-fps_mode', 'cfr', '-c:v', 'libx264',
      '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', mp4,
    ]);
    await rm(dir, { recursive: true, force: true });
    console.log(`${name}: ${frames.length} frames → ${mp4}`);
  }
} finally {
  await browser.close();
}
