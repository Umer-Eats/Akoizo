// Lessons show one stage at a time (Learn, Practice, Labs, Checkpoint). QA scripts open the
// stage that holds the element they test.
export async function openStage(page, stage) {
  const tab = page.locator(`#lesson-tab-${stage}`);
  await tab.click();
  await page.locator(`#lesson-stage-${stage}`).waitFor({ state: 'visible' });
}
