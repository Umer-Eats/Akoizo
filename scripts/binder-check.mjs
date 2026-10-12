// Auth, API, and Wikimedia fixtures exercise the real page; no real students, Gemini calls, or
// shared binders are created. Uses the last scripts/binder-live-check.ts output when present.
//   TEST_BASE_URL=http://127.0.0.1:3002 node --experimental-strip-types scripts/binder-check.mjs
import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import { binderDocument, fitBinderDocument } from '../src/lib/binder-document.ts';
import { binderContentPages, binderTocPages } from '../src/lib/binders.ts';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3006';
const out = 'tmp/binders';
await mkdir(out, { recursive: true });
const pixel = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);
const prose =
  'A water budget relates the change in storage to inflows and outflows across a drainage basin. Keep every term in the same units before comparing precipitation, evapotranspiration, and discharge. ';
function synthetic(pageCount) {
  const total = binderContentPages(pageCount),
    kinds = ['flow', 'cycle', 'layers', 'compare', 'scale', 'plot'],
    sizes = [Math.ceil(total / 3), Math.floor(total / 3), 0];
  sizes[2] = total - sizes[0] - sizes[1];
  const sections = ['Hydrologic cycle', 'Rivers and floods', 'Groundwater and lakes'].map(
    (title, s) => ({
      title,
      focus: '',
      pages: sizes[s],
      topics: Array.from({ length: sizes[s] }, (_, i) => `${title}: study topic ${i + 1}`),
    }),
  );
  const pages = sections
    .flatMap((s) => s.topics)
    .map((heading, i) => ({
      heading,
      paragraphs: Array.from({ length: 4 }, () => prose.repeat(3).trim()),
      takeaways: [
        'Storage change equals inflow minus outflow.',
        'Convert depths to volumes first.',
      ],
      table:
        i % 2
          ? { headers: [], rows: [] }
          : {
              headers: ['Reservoir', 'Residence time'],
              rows: [
                ['Atmosphere', 'About nine days'],
                ['Oceans', 'Thousands of years'],
              ],
            },
      diagram: {
        kind: kinds[i % kinds.length],
        title: 'How water moves',
        caption: 'Follow each stage in order.',
        items: ['Evaporation', 'Condensation', 'Precipitation', 'Runoff'].map((label) => ({
          label,
          detail: 'What happens at this stage and how to recognize it in data.',
        })),
        xLabel: 'Time (h)',
        yLabel: 'Discharge (m³/s)',
        series:
          kinds[i % kinds.length] === 'plot'
            ? [{ name: 'Storm hydrograph', points: [0, 2, 9, 6, 3, 1].map((y, x) => ({ x, y })) }]
            : [],
      },
      imageIndex: -1,
      imageCaption: '',
      photoQuery: 'oxbow lake',
      photo: {
        src: `https://upload.wikimedia.org/qa/${i}.png`,
        source: 'https://commons.wikimedia.org/wiki/File:Oxbow.png',
        title: 'Oxbow lake from the air',
        author: 'QA Photographer',
        license: 'CC BY-SA 4.0',
      },
      sources: ['2027 Dynamic Planet C, section 3'],
    }));
  return { eventId: 'dynamic-planet', level: 'national', pageCount, plan: { sections }, pages };
}
let live;
try {
  live = JSON.parse(await readFile(`${out}/live-dynamic-planet.json`, 'utf8'));
} catch {
  live = synthetic(10);
}
const shared = {
  ...live,
  id: '00000000-0000-4000-8000-000000000001',
  title: 'Freshwater systems reference',
  status: 'published',
  completedPages: live.pages.length,
  schoolName: 'North Science Academy',
  createdAt: '2026-10-12T15:00:00.000Z',
  generatedAt: '2026-10-12T16:00:00.000Z',
  images: [],
};
const { pages: _pages, plan: _plan, images: _images, ...sharedCard } = shared;

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 900, height: 1100 } });
  await context.route(/^https:\/\/(upload|thumb)\.wikimedia\.org\//, (route) =>
    route.fulfill({
      contentType: 'image/png',
      body: pixel,
      headers: { 'access-control-allow-origin': '*' },
    }),
  );
  // Paper: every page is exactly Letter, nothing is clipped, at the smallest and largest sizes.
  const paper = await context.newPage();
  for (const binder of [shared, { ...shared, ...synthetic(400), title: 'x'.repeat(100) }]) {
    await paper.setContent(binderDocument(binder));
    assert.equal(await paper.evaluate(`(${fitBinderDocument.toString()})(document)`), true);
    const report = await paper.evaluate(() => ({
      pages: document.querySelectorAll('.page').length,
      tabs: document.querySelectorAll('.tab').length,
      topics: document.querySelectorAll('.toc-topic').length,
      sizes: new Set(
        Array.from(document.querySelectorAll('.page'), (p) => `${p.offsetWidth}x${p.offsetHeight}`),
      ).size,
      clipped: Array.from(document.querySelectorAll('.page-body, .toc-body')).filter(
        (b) => b.scrollHeight > b.clientHeight + 1 || b.scrollWidth > b.clientWidth + 1,
      ).length,
      smallest: Math.min(
        ...Array.from(document.querySelectorAll('.page-body'), (b) =>
          Number(b.firstElementChild.style.zoom || 1),
        ),
      ),
      deadLinks: Array.from(document.querySelectorAll('a[href^="#"]')).filter(
        (a) => !document.querySelector(a.getAttribute('href')),
      ).length,
    }));
    const content = binderContentPages(binder.pageCount);
    assert.deepEqual(
      { ...report, smallest: undefined },
      {
        pages: binder.pageCount,
        tabs: content,
        topics: content,
        sizes: 1,
        clipped: 0,
        smallest: undefined,
        deadLinks: 0,
      },
    );
    assert.ok(report.smallest >= 0.7, `content scaled to ${report.smallest}`);
    console.log(
      `${binder.pageCount} pages: ${binderTocPages(binder.pageCount)} contents + ${content} content, smallest scale ${report.smallest}`,
    );
  }
  await paper.setContent(binderDocument(shared));
  await paper.evaluate(`(${fitBinderDocument.toString()})(document)`);
  await paper.pdf({ path: `${out}/check.pdf`, preferCSSPageSize: true, printBackground: true });
  await paper.close();

  const p = await context.newPage();
  await p.setViewportSize({ width: 1440, height: 1000 });
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  const profile = {
    id: 'qa-student',
    role: 'student',
    displayName: 'Ada',
    schoolId: 'qa-school',
    schoolName: 'South Science School',
    schoolCommunityName: 'South Science School',
    schoolCommunityId: 'ppchs',
    division: 'C',
  };
  const payload = Buffer.from(
    JSON.stringify({
      sub: 'qa-student',
      user_id: 'qa-student',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
      aud: 'qa',
      iss: 'https://securetoken.google.com/qa',
      firebase: { sign_in_provider: 'password' },
    }),
  ).toString('base64url');
  const token = Buffer.from('{"alg":"none"}').toString('base64url') + '.' + payload + '.signature';
  await p.route('https://identitytoolkit.googleapis.com/**', (route) =>
    route.fulfill({
      json: route.request().url().includes('signInWithPassword')
        ? {
            localId: 'qa-student',
            email: 'qa@example.test',
            idToken: token,
            refreshToken: 'qa-refresh',
            expiresIn: '3600',
            registered: true,
          }
        : {
            users: [
              {
                localId: 'qa-student',
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
  // A ten-page job: outline, topics, one provider failure, then three page batches.
  const mine = {
    ...shared,
    ...synthetic(10),
    id: '00000000-0000-4000-8000-000000000002',
    title: 'My freshwater binder',
    schoolName: 'South Science School',
    generatedAt: null,
  };
  const job = {
    id: mine.id,
    eventId: mine.eventId,
    title: mine.title,
    level: 'national',
    pageCount: 10,
    completedPages: 0,
    status: 'generating',
    schoolName: mine.schoolName,
    createdAt: mine.createdAt,
    generatedAt: null,
  };
  const steps = [{ plannedPages: 0 }, { plannedPages: 9 }, 'fail', 4, 8, 9];
  let created,
    published,
    advances = 0;
  await p.route('**/api/**', async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname === '/api/auth/profile') return route.fulfill({ json: profile });
    if (url.pathname === '/api/dashboard')
      return route.fulfill({
        json: {
          profile,
          students: [],
          stats: { lessons: 0, practice: 0, ranked: 0, points: 0 },
          assignments: [],
          progress: {},
        },
      });
    if (url.pathname === '/api/event-selections') return route.fulfill({ json: [] });
    if (url.pathname !== '/api/binders') return route.fulfill({ json: [] });
    if (route.request().method() === 'POST') {
      const body = route.request().postDataJSON();
      if (body.action === 'create') {
        created = body;
        return route.fulfill({ status: 201, json: job });
      }
      if (body.action === 'advance') {
        const step = steps[advances++];
        if (step === 'fail')
          return route.fulfill({ status: 502, json: { error: 'Gemini could not finish.' } });
        if (typeof step === 'number') {
          job.completedPages = step;
          if (step === 9) job.status = 'ready';
          return route.fulfill({ json: job });
        }
        return route.fulfill({ json: { ...job, ...step } });
      }
      if (body.action === 'publish') {
        published = '2026-10-12T18:30:00.000Z';
        return route.fulfill({ json: { ...mine, status: 'published', generatedAt: published } });
      }
    }
    if (url.searchParams.has('id'))
      return route.fulfill({
        json:
          url.searchParams.get('id') === shared.id
            ? shared
            : { ...mine, status: published ? 'published' : 'ready', generatedAt: published },
      });
    return route.fulfill({
      json: {
        binders: [
          ...(published ? [{ ...job, status: 'published', generatedAt: published }] : []),
          sharedCard,
        ],
        jobs: [],
        nextCursor: null,
      },
    });
  });
  await p.goto(base + '/login/student');
  await p.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await p.getByLabel('Password', { exact: true }).fill('qa-test-password');
  await p.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(p).toHaveURL(/\/dashboard\/student$/, { timeout: 30000 });
  await p.goto(base + '/dashboard/student/events/dynamic-planet/binder-generator');
  await expect(p.getByRole('heading', { name: 'Your Dynamic Planet study binder.' })).toBeVisible();
  await expect(p.getByText('Recommended for Dynamic Planet: 50–400 pages')).toBeVisible();
  // Another school's binder is listed with its school and generation date.
  const card = p.locator('.binder-card').filter({ hasText: 'Freshwater systems reference' });
  await expect(card.getByText('North Science Academy', { exact: true })).toBeVisible();
  await expect(card.locator('time')).toHaveAttribute('datetime', shared.generatedAt);

  const pages = p.getByLabel('Number of pages');
  await expect(pages).toHaveAttribute('max', '400');
  await p.getByRole('button', { name: 'In depth · 400' }).click();
  await expect(pages).toHaveValue('400');
  await pages.fill('10');
  await p.locator('input[type=file]').setInputFiles([
    { name: 'notes.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.7\nnotes') },
    { name: 'delta.png', mimeType: 'image/png', buffer: pixel },
  ]);
  await expect(p.locator('.sheet-files li')).toHaveCount(2);
  await p.getByRole('button', { name: 'Generate & share binder' }).click();
  await expect(p.getByText('Shared across all schools')).toBeVisible({ timeout: 30000 });
  assert.equal(advances, steps.length, 'the failed batch was retried automatically');
  assert.equal(created.pageCount, 10);
  assert.deepEqual(
    created.uploads.map((u) => u.mime),
    ['application/pdf', 'image/png'],
  );
  assert.ok(published);
  const own = p.locator('.binder-card').filter({ hasText: 'My freshwater binder' });
  await expect(own.getByText('South Science School', { exact: true })).toBeVisible();
  await expect(own.locator('time')).toHaveAttribute('datetime', published);

  // Reading and exporting someone else's binder.
  await card.getByRole('button', { name: 'Read & export' }).click();
  await expect(p.getByRole('button', { name: 'Print / save PDF' })).toBeEnabled();
  const frame = p.frameLocator('.binder-preview iframe');
  await expect(frame.locator('.page')).toHaveCount(shared.pageCount);
  await expect(frame.locator('nav a')).toHaveCount(shared.plan.sections.length + 1);
  await expect(frame.locator('.page svg').first()).toBeVisible();
  const body = await frame.locator('body').innerText();
  assert.ok(!body.includes('North Science Academy') && !/Oct(ober)? 12/.test(body));
  const download = p.waitForEvent('download');
  await p.getByRole('button', { name: 'Download HTML' }).click();
  await (await download).saveAs(`${out}/ui-export.html`);
  const exported = await readFile(`${out}/ui-export.html`, 'utf8');
  if (shared.pages.some((page) => page.photo)) {
    assert.ok(!/<img[^>]+src="https:/.test(exported), 'photos are embedded for offline use');
    assert.ok(exported.includes('data:image/png;base64'));
  }
  assert.ok(exported.includes('Table of contents'));

  for (const mode of ['dark', 'light']) {
    await p.evaluate((mode) => (document.documentElement.dataset.theme = mode), mode);
    for (const width of [1440, 390]) {
      await p.setViewportSize({ width, height: 1000 });
      await p.screenshot({ path: `${out}/page-${mode}-${width}.png`, fullPage: true });
      assert.equal(
        await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        `${mode}/${width} overflow`,
      );
    }
  }
  // The cross-school library page works for members who cannot generate.
  profile.role = 'instructor';
  await p.setViewportSize({ width: 1440, height: 1000 });
  await p.goto(base + '/dashboard/binders');
  await expect(p.getByRole('heading', { name: 'The binder library.' })).toBeVisible();
  await expect(p.locator('.binder-card')).toHaveCount(2);
  await expect(p.getByRole('button', { name: 'Generate & share binder' })).toHaveCount(0);
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log(
    'Page checks passed: guidance, page presets, uploads, resumable progress with auto-retry, auto-share, school/date cards, read & export, mobile/themes, library page.',
  );
} finally {
  await browser.close();
}
