import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const slug of ['beers-law-lab', 'circuit-construction-kit-dc', 'density', 'pendulum-lab']) {
    const page = await browser.newPage({ viewport: { width: 1000, height: 700 } });
    const url = `https://phet.colorado.edu/sims/html/${slug}/latest/${slug}_en.html`;
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    assert.equal(response.status(), 200, slug);
    await page
      .locator('#sim')
      .waitFor({ state: 'visible', timeout: 30000 })
      .catch(async (error) => {
        console.log(await page.locator('body').innerText());
        await page.screenshot({ path: `output/lab-qa/phet-${slug}-failure.png` });
        throw error;
      });
    await page.screenshot({ path: `output/lab-qa/phet-${slug}.png` });
    console.log(`PASS: live PhET ${slug} returned 200 and rendered its simulation.`);
    await page.close();
  }
} finally {
  await browser.close();
}
