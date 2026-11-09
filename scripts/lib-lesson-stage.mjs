// Lessons show one stage at a time (Learn, Practice, Labs, Checkpoint). QA scripts open the
// stage that holds the element they test.
export async function openStage(page, stage) {
  const tab = page.locator(`#lesson-tab-${stage}`);
  await tab.click();
  await page.locator(`#lesson-stage-${stage}`).waitFor({ state: 'visible' });
}

/**
 * Answer every checkpoint question through its numbered circle, checking each one as you go.
 * Questions listed in `wrong` get a wrong option (multiple choice) or a too-short written answer,
 * which the mock AI marks incorrect. Each circle must turn correct or incorrect once checked.
 */
export async function playCheckpoint(page, lesson, { wrong = [] } = {}) {
  const { expect } = await import('@playwright/test');
  const quiz = page.locator('#lesson-practice');
  for (const [i, q] of lesson.practice.entries()) {
    const dot = quiz.getByRole('button', { name: new RegExp(`^Question ${i + 1},`) });
    await dot.click();
    await expect(dot).toHaveAttribute('aria-current', 'step');
    const miss = wrong.includes(i);
    if (q.type === 'mcq') {
      const option = miss ? q.options.find((o) => o !== q.answer) : q.answer;
      await quiz.getByRole('radio', { name: option, exact: true }).check();
    } else {
      // The mock AI accepts six or more words, so pad a terse model answer.
      const full =
        q.answer.split(/\s+/).length >= 6 ? q.answer : `${q.answer}, which is the key idea`;
      await quiz.getByRole('textbox').fill(miss ? 'Not sure' : full);
    }
    await quiz.getByRole('button', { name: 'Check answer', exact: true }).click();
    await expect(dot).toHaveAttribute('data-state', miss ? 'incorrect' : 'correct');
    await expect(quiz.locator('.lc-verdict')).toHaveText(miss ? /^Not quite/ : /^Correct/);
    await expect(quiz.locator('.lc-feedback')).toContainText(q.explanation.slice(0, 40));
  }
  const total = lesson.practice.length;
  await expect(quiz.locator('.lc-summary')).toContainText(
    `${total - wrong.length} of ${total} correct`,
  );
  return quiz;
}
