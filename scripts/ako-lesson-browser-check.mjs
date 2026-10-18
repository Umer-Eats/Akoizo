import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { anatomyLessons } from '../src/lib/lessons-anatomy.ts';
import { akoLessonLines, akoLessonPlan } from '../src/lib/ako-lesson.ts';
import { askAkoLesson } from '../src/lib/ako-tutor.ts';

// Browser-only account mocks. The real tutor service runs unchanged against a scripted model, so
// no live account, school record, or Gemini request is involved.
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3002';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
const requests = [];
await mkdir('documents/qa', { recursive: true });
try {
  const anonymous = await browser.newPage();
  assert.equal(
    (await anonymous.request.post(base + '/api/lessons/ako', { data: {} })).status(),
    401,
  );
  await anonymous.close();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  const profile = {
    id: 'qa-student-C',
    role: 'student',
    displayName: 'Practice Learner',
    schoolId: 'qa-school',
    schoolName: 'School-QA',
    schoolCommunityId: 'ppchs',
    schoolCommunityName: 'Test school',
    division: 'C',
  };
  const token =
    Buffer.from('{"alg":"none"}').toString('base64url') +
    '.' +
    Buffer.from(
      JSON.stringify({
        sub: profile.id,
        user_id: profile.id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        aud: 'qa',
        iss: 'https://securetoken.google.com/qa',
        firebase: { sign_in_provider: 'password' },
      }),
    ).toString('base64url') +
    '.signature';
  await page.route('https://identitytoolkit.googleapis.com/**', (route) =>
    route.fulfill({
      json: route.request().url().includes('signInWithPassword')
        ? {
            localId: profile.id,
            email: 'qa@example.test',
            idToken: token,
            refreshToken: 'qa-refresh',
            expiresIn: '3600',
            registered: true,
          }
        : {
            users: [
              {
                localId: profile.id,
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
  await page.route('**/api/**', async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname === '/api/auth/profile') return route.fulfill({ json: profile });
    if (url.pathname === '/api/dashboard')
      return route.fulfill({
        json: {
          profile,
          students: [],
          stats: { lessons: 0, practice: 0, ranked: 0, points: 0 },
          progress: {},
          assignments: [],
        },
      });
    if (url.pathname === '/api/lessons/ako') {
      const body = route.request().postDataJSON();
      requests.push(body);
      const lesson = anatomyLessons.lessons.find((item) => item.id === body.lessonId);
      const step = akoLessonPlan(lesson).find((item) => item.id === body.questionId);
      try {
        const reply = await askAkoLesson(lesson, body, {
          apiKey: 'qa',
          fetcher: async () => {
            if (body.message === 'break') return new Response('{}', { status: 500 });
            if (body.message === 'slow reply')
              await new Promise((resolve) => setTimeout(resolve, 900));
            return new Response(
              JSON.stringify({
                candidates: [
                  {
                    finishReason: 'STOP',
                    content: {
                      parts: [
                        {
                          text: JSON.stringify({
                            reply:
                              body.message === 'slow reply'
                                ? 'Stale reply must disappear'
                                : 'Teaching topic ' +
                                  body.questionId +
                                  '.\n\nYour turn: What do you predict?',
                            mood: 'thinking',
                            verdict: body.message === 'scientific reasoning' ? 'correct' : 'none',
                            askedWhy:
                              step.kind === 'check' && body.message !== 'scientific reasoning',
                          }),
                        },
                      ],
                    },
                  },
                ],
              }),
            );
          },
        });
        return route.fulfill({ json: reply });
      } catch (error) {
        return route.fulfill({ status: error.status ?? 500, json: { error: error.message } });
      }
    }
    return route.fulfill({ json: [] });
  });
  await page.goto(base + '/login/student');
  await page.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await page.getByLabel('Password', { exact: true }).fill('qa-browser-only-password');
  await page.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard\/student$/);
  const chat = page.getByRole('region', { name: 'Study with Ako' });
  await page.goto(base + '/dashboard/student/events/anatomy-and-physiology/lessons');
  const lesson = anatomyLessons.lessons[0];
  const plan = akoLessonPlan(lesson);
  const active = page.locator('.lesson-ako-sentence[aria-current=step]');
  const checkHighlightBoundaries = async () => {
    const rendered = await page.locator('[data-ako-sentence]').evaluateAll((sentences) =>
      sentences.map((sentence) => {
        const style = getComputedStyle(sentence);
        return {
          id: sentence.getAttribute('data-ako-sentence'),
          text: sentence.textContent,
          paragraph: sentence.parentElement.textContent,
          gap:
            sentence.nextSibling?.nodeType === Node.TEXT_NODE
              ? sentence.nextSibling.textContent
              : '',
          highlighted: sentence.classList.contains('is-teaching'),
          outline: style.outlineWidth,
          shadow: style.boxShadow,
          padding: style.padding,
          overflow: style.overflow,
        };
      }),
    );
    const source = akoLessonLines(lesson);
    assert.equal(rendered.length, source.length);
    for (const sentence of rendered) {
      const original = source.find((line) => line.id === sentence.id);
      assert.equal(sentence.text, original.text.trimEnd(), 'highlight contains the whole sentence');
      assert.equal(
        sentence.gap,
        original.text.slice(original.text.trimEnd().length),
        'sentence spacing stays outside the highlight',
      );
      assert.equal(
        sentence.paragraph,
        lesson.sections[original.sectionIndex].body[original.paragraphIndex],
        'no source text is clipped or lost',
      );
      if (sentence.highlighted) {
        assert.equal(sentence.outline, '0px');
        assert.equal(sentence.shadow, 'none');
        assert.equal(sentence.padding, '0px');
        assert.equal(sentence.overflow, 'visible');
      }
    }
  };
  await page.clock.install();
  await page.getByRole('button', { name: 'Teach me this lesson', exact: true }).click();
  await expect(chat).toBeVisible();
  await expect(chat.getByText('Teaching topic topic:0:explain.')).toBeVisible();
  await expect(active).toHaveAttribute('id', 'ako-line-' + plan[0].anchorId);
  await expect(page.locator('.lesson-ako-sentence[aria-current=step]').first()).toHaveCSS(
    'background-color',
    'rgb(255, 240, 0)',
  );
  await expect(page.locator('.ako-pixel')).toHaveCount(1);
  await checkHighlightBoundaries();
  await expect(page.getByRole('button', { name: 'Teach this line', exact: true })).toHaveCount(0);
  assert.equal(requests[0].lessonId, lesson.id);
  assert.equal(requests[0].testId, undefined);
  assert.equal(requests[0].pendingWhy, false);
  await expect(chat.getByText('Ako will keep teaching after reading time.')).toBeVisible();
  await chat.getByRole('button', { name: 'Close Ako chat', exact: true }).click();
  await page.clock.fastForward(60000);
  assert.equal(requests.length, 1, 'closed teaching makes no background requests');
  await page.getByRole('button', { name: 'Continue with Ako', exact: true }).click();
  await expect(chat).toBeVisible();
  await chat.getByRole('button', { name: 'Pause teaching', exact: true }).click();
  await page.clock.fastForward(60000);
  assert.equal(requests.length, 1, 'paused teaching makes no automatic requests');
  await chat.getByRole('button', { name: 'Resume teaching', exact: true }).click();
  const box = chat.getByRole('textbox');
  await box.fill('I have a question');
  await page.clock.fastForward(60000);
  assert.equal(requests.length, 1, 'typing holds the teacher at the current topic');
  await box.fill('');
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.clock.fastForward(60000);
  assert.equal(requests.length, 1, 'hidden tabs do not keep teaching');
  await page.evaluate(() => {
    delete document.hidden;
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.clock.fastForward(46000);
  await expect(chat.getByText('Teaching topic ' + plan[1].id + '.')).toBeVisible();
  assert.equal(requests.length, 2, 'the teacher introduces the example without Continue');
  await page.clock.fastForward(46000);
  await expect(chat.getByText('Teaching topic ' + plan[2].id + '.')).toBeVisible();
  await page.clock.fastForward(60000);
  assert.equal(requests.length, 3, 'a check waits for the student, however much time passes');
  await box.fill('scientific reasoning');
  await box.press('Enter');
  await expect.poll(() => requests.length).toBe(4);
  await expect(chat.getByText('Ako will keep teaching after reading time.')).toBeVisible();
  await page.clock.fastForward(10000);
  await expect(chat.getByText('Teaching topic ' + plan[3].id + '.')).toBeVisible();
  await expect(active).toHaveAttribute('id', 'ako-line-' + plan[3].anchorId);
  await chat.getByRole('button', { name: 'Pause teaching', exact: true }).click();
  await box.fill('break');
  await box.press('Enter');
  await expect(chat.getByRole('alert')).toContainText('Ako is taking a nap');
  await expect(box).toHaveValue('break');
  await box.fill('slow reply');
  await box.press('Enter');
  await chat.getByRole('button', { name: 'Skip ahead', exact: true }).click();
  await expect(chat.getByText('Teaching topic ' + plan[4].id + '.')).toBeVisible();
  await page.waitForTimeout(1100);
  await expect(chat.getByText('Stale reply must disappear')).toHaveCount(0);
  await chat.getByRole('combobox').selectOption(plan.at(-1).id);
  await expect(chat.getByText('Teaching topic ' + plan.at(-1).id + '.')).toBeVisible();
  await expect(chat.getByText(/Lesson walkthrough complete/)).toBeVisible();
  await expect(chat.getByRole('button', { name: 'Skip ahead', exact: true })).toBeDisabled();
  await expect(page.locator('.ako-pixel')).toHaveCount(1);
  const before = await chat.boundingBox();
  const handle = await chat.getByRole('button', { name: 'Resize Ako chat' }).boundingBox();
  await page.mouse.move(handle.x + 13, handle.y + 13);
  await page.mouse.down();
  await page.mouse.move(handle.x - 65, handle.y - 65, { steps: 8 });
  await page.mouse.up();
  const expanded = await chat.boundingBox();
  assert.ok(expanded.width > before.width + 50 && expanded.height > before.height + 50);
  await chat.getByRole('button', { name: 'Resize Ako chat' }).focus();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowDown');
  const compressed = await chat.boundingBox();
  assert.ok(compressed.width < expanded.width && compressed.height < expanded.height);
  await expect(page.locator('.ako-pixel')).toHaveCount(1);
  await page.screenshot({ path: 'documents/qa/ako-lesson-desktop.png' });
  for (const [width, height] of [
    [390, 844],
    [320, 640],
  ]) {
    await page.setViewportSize({ width, height });
    await checkHighlightBoundaries();
    await expect
      .poll(async () => {
        const rat = await page.locator('.ako-companion-body').boundingBox();
        const sentence = await page
          .locator('.lesson-ako-sentence[aria-current=step]')
          .evaluate((element) => ({
            top: element.getClientRects()[0].top,
            left: Math.min(...Array.from(element.getClientRects(), (rect) => rect.left)),
          }));
        const panel = await chat.boundingBox();
        return (
          sentence.top >= 115 &&
          sentence.top < panel.y &&
          rat.y + rat.height <= panel.y &&
          Math.abs(rat.x - Math.max(0, sentence.left - 76)) < 3 &&
          rat.x + rat.width <= sentence.left
        );
      })
      .toBe(true);
    const panel = await chat.boundingBox();
    assert.ok(
      panel.x >= 0 &&
        panel.x + panel.width <= width &&
        panel.y >= 0 &&
        panel.y + panel.height <= height,
    );
    const log = await chat.locator('.ako-chat-log').boundingBox();
    assert.ok(log.height >= 90, 'conversation remains readable');
    await expect
      .poll(() =>
        chat
          .locator('.ako-chat-log')
          .evaluate((element) =>
            Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop),
          ),
      )
      .toBeLessThan(2);
    const send = await chat.getByRole('button', { name: 'Send', exact: true }).boundingBox();
    assert.ok(send.y + send.height <= height, 'composer fits on screen');
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
    );
  }
  await page.screenshot({ path: 'documents/qa/ako-lesson-mobile.png' });
  await chat.getByRole('button', { name: 'Close Ako chat' }).click();
  await page.locator('.lesson-button').nth(1).click();
  await page.getByRole('button', { name: 'Teach me this lesson', exact: true }).click();
  await expect(chat.getByText('Teaching topic topic:0:explain.')).toBeVisible();
  assert.equal(requests.at(-1).history.length, 0);
  assert.equal(requests.at(-1).lessonId, anatomyLessons.units[0].lessonIds[1]);
  if (errors.length) throw Error(errors.join('\n'));
  console.log(
    'Ako lesson checks passed: automatic topic teaching, reading time, pause/resume, typing holds, understanding checks, vivid highlights, error recovery, resizing, one moving Ako, mobile bounds.',
  );
} finally {
  await browser.close();
}
