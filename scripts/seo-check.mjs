import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3002';
const origin = 'https://akoizo.app';
const paths = ['/', '/study-tools', '/mission', '/rankings'];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage();
  const sitemapResponse = await page.request.get(`${base}/sitemap.xml`);
  assert.equal(sitemapResponse.status(), 200);
  assert.match(sitemapResponse.headers()['content-type'], /xml/);
  const xml = await sitemapResponse.text();
  const urls = await page.evaluate((xml) => {
    const document = new DOMParser().parseFromString(xml, 'application/xml');
    if (document.querySelector('parsererror')) throw new Error('Invalid sitemap XML');
    if (document.documentElement.namespaceURI !== 'http://www.sitemaps.org/schemas/sitemap/0.9') {
      throw new Error('Missing sitemap namespace');
    }
    return Array.from(document.querySelectorAll('url > loc'), (node) => node.textContent);
  }, xml);
  assert.deepEqual(urls.sort(), paths.map((path) => new URL(path, origin).href).sort());
  const robotsResponse = await page.request.get(`${base}/robots.txt`);
  assert.equal(robotsResponse.status(), 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /User-Agent: \*/i);
  assert.match(robots, /Allow: \/(?:\r?\n|$)/i);
  assert.match(robots, /Sitemap: https:\/\/akoizo\.app\/sitemap\.xml/i);

  const titles = new Set();
  const descriptions = new Set();
  for (const path of paths) {
    // Inspect original HTML too: metadata and study content must be server-rendered.
    const response = await page.request.get(`${base}${path}`);
    assert.equal(response.status(), 200, path);
    const html = await response.text();
    assert.match(html, /<title>[^<]*Science Olympiad/);
    assert.match(html, /<meta name="description"/);
    if (path === '/study-tools') {
      assert.match(html, /Free Science Olympiad study tools/);
      assert.match(html, /Anatomy and Physiology/);
    }
    await page.goto(`${base}${path}`, { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    assert.ok(title.includes('Akoizo'));
    assert.ok(description.includes('Science Olympiad'));
    assert.ok(!titles.has(title), `Duplicate title: ${path}`);
    assert.ok(!descriptions.has(description), `Duplicate description: ${path}`);
    titles.add(title);
    descriptions.add(description);
    assert.equal(
      new URL(await page.locator('link[rel="canonical"]').getAttribute('href')).href,
      new URL(path, origin).href,
    );
    assert.equal(
      new URL(await page.locator('meta[property="og:url"]').getAttribute('content')).href,
      new URL(path, origin).href,
    );
    assert.equal(await page.locator('h1').count(), 1);
    assert.ok(
      await page.evaluate(
        () =>
          !document
            .querySelector('meta[name="robots"]')
            ?.getAttribute('content')
            ?.includes('noindex'),
      ),
    );
    if (path === '/') {
      const data = JSON.parse(
        await page.locator('script[type="application/ld+json"]').textContent(),
      );
      assert.equal(data['@graph'][0]['@type'], 'WebSite');
      assert.equal(data['@graph'][0].url, `${origin}/`);
    }
    console.log(`Verified ${path}`);
  }
  for (const path of [
    '/login/student',
    '/login/instructor',
    '/dashboard/student',
    '/dashboard/instructor',
    '/settings/student',
    '/settings/instructor',
    '/dashboard/student/events/codebusters/lessons',
  ]) {
    const response = await page.request.get(`${base}${path}`);
    assert.equal(response.status(), 200, path);
    assert.match(await response.text(), /<meta name="robots" content="noindex[^\"]*"/);
  }
  assert.equal((await page.request.get(`${base}/login/invalid`)).status(), 404);
  assert.equal((await page.request.get(`${base}/not-a-real-page`)).status(), 404);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/study-tools`, { waitUntil: 'networkidle' });
  assert.ok(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    'Mobile horizontal overflow',
  );
  console.log(
    'SEO checks passed: sitemap XML, robots, metadata, public content, account noindex, 404s, and mobile width.',
  );
} finally {
  await browser.close();
}
