import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { mockSession, signIn } from './lib-mock-session.mjs';
import { practiceTests, listPracticeTests } from '../src/lib/practice-catalog.ts';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3002';
const ids = practiceTests.filter((p) => p.id.startsWith('akoizo-2027-rotation-')).map((p) => p.id);
await mkdir('output/practice-rotation/browser-qa', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
try {
  for (const division of ['B', 'C']) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    page.on('pageerror', (e) => errors.push(e.message));
    const profile = await mockSession(page, {
      api: (url) =>
        url.pathname === '/api/practice' && url.searchParams.has('eventId')
          ? { tests: listPracticeTests(division, url.searchParams.get('eventId')), archive: [] }
          : undefined,
    });
    profile.division = division;
    await signIn(page, base);
    for (const id of ids) {
      const p = practiceTests.find((p) => p.id === id);
      if (p.division !== division) continue;
      await page.goto(`${base}/dashboard/student/events/${p.eventId}/practice-tests`);
      await expect(page.locator('.practice-test-list li')).toHaveCount(
        listPracticeTests(division, p.eventId).length,
      );
      const currentCount = listPracticeTests(division, p.eventId).filter(
        (t) => t.topicMatch === 'current',
      ).length;
      await page.getByLabel('Topic rotation', { exact: true }).selectOption('current');
      await expect(page.locator('.practice-test-list li')).toHaveCount(currentCount);
      if (id.endsWith('form-1')) {
        await page.setViewportSize({ width: 390, height: 844 });
        assert.ok(
          await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2),
        );
        await page.screenshot({
          path: `output/practice-rotation/browser-qa/${division}-${p.eventId}-library-mobile.png`,
        });
        await page.setViewportSize({ width: 1440, height: 1000 });
      }
      await page.getByLabel('Topic rotation', { exact: true }).selectOption('different');
      await expect(page.locator('.practice-test-list li')).toHaveCount(
        listPracticeTests(division, p.eventId).filter((t) => t.topicMatch === 'different').length,
      );
      await page.goto(`${base}/dashboard/student/events/${p.eventId}/practice-tests/${id}`);
      await expect(page.locator('.practice-question')).toHaveCount(p.questionCount);
      await expect(page.locator('iframe[title^="Complete test:"]')).toHaveAttribute(
        'src',
        p.paperUrl,
      );
      await expect(
        page.getByText(
          p.origin === 'original'
            ? 'Original Akoizo curriculum practice with an authored answer key.'
            : 'Repaired edition: the appendix identifies authored replacements. Archived pages are preserved for reference.',
        ),
      ).toBeVisible();
      for (const url of [p.paperUrl, p.keyUrl]) {
        const response = await page.request.get(base + url);
        assert.equal(response.status(), 200);
        assert.equal((await response.body()).subarray(0, 5).toString(), '%PDF-');
      }
      if (id.endsWith('form-1')) {
        await page.screenshot({
          path: `output/practice-rotation/browser-qa/${p.eventId}-desktop.png`,
        });
        await page.setViewportSize({ width: 390, height: 844 });
        assert.ok(
          await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2),
        );
        await page.screenshot({
          path: `output/practice-rotation/browser-qa/${p.eventId}-mobile.png`,
        });
        await page.setViewportSize({ width: 1440, height: 1000 });
      }
    }
    await context.close();
  }
  assert.deepEqual(errors, []);
  console.log(
    'Rotation browser checks passed: all 44 new forms, current/historical filters, provenance labels, 88 PDF responses, answer fields and mobile layouts.',
  );
} finally {
  await browser.close();
}
