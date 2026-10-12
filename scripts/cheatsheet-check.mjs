// Auth and API fixtures exercise the real page; no real students or shared sheets are created.
import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { sheetDocument, fitSheetDocument } from '../src/lib/cheatsheet-document.ts';
import { sheetFigures } from '../src/lib/cheatsheet-figures.ts';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3006';
const out = 'tmp/cheatsheets';
await mkdir(out, { recursive: true });
let content;
try {
  content = JSON.parse(await readFile(`${out}/live-content.json`, 'utf8'));
} catch {
  content = {
    sections: Array.from({ length: 24 }, (_, i) => ({
      heading: `Respiratory reference ${i + 1}`,
      facts: Array.from(
        { length: 4 },
        () =>
          'Alveolar ventilation VA=(VT−VD)×f; VT tidal volume; VD dead space; f breaths/min. Match volume units before calculating. Compare restrictive reductions in lung volume with obstruction affecting expiratory flow. Interpret measurements with reference ranges and clinical context.',
      ),
      table: { headers: [], rows: [] },
      diagrams:
        i < 2
          ? [
              {
                title: 'Gas transport',
                nodes: [
                  { label: 'Alveolus', x: 50, y: 15 },
                  { label: 'Capillary', x: 50, y: 50 },
                  { label: 'Tissue', x: 50, y: 85 },
                ],
                edges: [
                  { from: 0, to: 1, label: 'diffusion' },
                  { from: 1, to: 2, label: 'perfusion' },
                ],
              },
            ]
          : [],
    })),
  };
}
// One catalog figure loads and one fails: the sheet must still fit, share and export.
const [goodFigure, lostFigure] = sheetFigures('anatomy-and-physiology');
content.sections[0].figures = [goodFigure.id];
content.sections[1].figures = [lostFigure.id];
const pixel = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAIAAABM5OhcAAABFklEQVR4nO3SQQkAMAzAwMqe/KoIg3KnII/Mg8D8DuAmY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFokFUgDjZK8MdukAAAAASUVORK5CYII=',
  'base64',
);
const sheet = {
  id: '00000000-0000-4000-8000-000000000001',
  eventId: 'anatomy-and-physiology',
  title: 'Anatomy competition reference',
  level: 'national',
  createdAt: '2026-10-12T16:00:00.000Z',
  schoolName: 'North Science Academy',
  hasExclusions: true,
  imageCount: 0,
  exclusions: 'Basic definitions of inhalation and exhalation.',
  images: [],
  content,
  published: true,
};
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const paper = await browser.newPage({ viewport: { width: 900, height: 1100 } });
  await paper.setContent(sheetDocument(sheet));
  const fit = await paper.evaluate(`(${fitSheetDocument.toString()})(document)`);
  assert.equal(fit.fits, true, JSON.stringify(fit));
  assert.equal(await paper.locator('.page').count(), 2);
  assert.equal(
    await paper.locator('.col .block').count(),
    await paper.locator('template').evaluate((t) => t.content.children.length),
  );
  await paper.evaluate(async () => Promise.all(Array.from(document.images).map((i) => i.decode())));
  assert.equal(
    await paper
      .locator('.col')
      .evaluateAll((cols) =>
        cols.some((c) => c.scrollWidth > c.clientWidth || c.getBoundingClientRect().height > 1008),
      ),
    false,
  );
  await paper.screenshot({ path: `${out}/print-preview.png`, fullPage: true });
  await paper.pdf({
    path: `${out}/two-sided-check.pdf`,
    preferCSSPageSize: true,
    printBackground: true,
  });
  const html = await paper.content();
  await writeFile(`${out}/two-sided-check.html`, html);
  console.log('Two-sided layout:', fit);
  // Deliberate overflow must never silently drop blocks or become exportable.
  await paper.setContent(
    sheetDocument({
      ...sheet,
      content: {
        sections: [
          ...content.sections,
          ...content.sections,
          ...content.sections,
          ...content.sections,
        ],
      },
    }),
  );
  assert.equal((await paper.evaluate(`(${fitSheetDocument.toString()})(document)`)).fits, false);

  const p = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  let profile = {
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
  let generated = false,
    published = false,
    generationInput;
  const draft = {
    ...sheet,
    id: '00000000-0000-4000-8000-000000000002',
    title: 'My custom sheet',
    schoolName: 'South Science School',
    published: false,
  };
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
    if (url.pathname === '/api/cheatsheets/figure')
      return url.searchParams.get('id') === goodFigure.id
        ? route.fulfill({ contentType: 'image/png', body: pixel })
        : route.fulfill({ status: 502, json: { error: 'That figure could not be loaded.' } });
    if (url.pathname === '/api/cheatsheets') {
      if (route.request().method() === 'POST') {
        const body = route.request().postDataJSON();
        if (body.action === 'publish') {
          published = true;
          return route.fulfill({ json: { ...draft, published: true } });
        }
        generationInput = body;
        generated = true;
        return route.fulfill({ json: draft });
      }
      if (url.searchParams.has('id'))
        return route.fulfill({
          json: url.searchParams.get('id') === sheet.id ? sheet : { ...draft, published },
        });
      return route.fulfill({
        json: {
          sheets: [sheet, ...(published ? [{ ...draft, published }] : [])],
          nextCursor: null,
        },
      });
    }
    return route.fulfill({ json: [] });
  });
  await p.goto(base + '/login/student');
  await p.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await p.getByLabel('Password', { exact: true }).fill('qa-test-password');
  await p.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(p).toHaveURL(/\/dashboard\/student$/, { timeout: 30000 });
  await p.goto(base + '/dashboard/student/events/anatomy-and-physiology/cheatsheet-generator');
  await expect(p.getByRole('heading', { name: 'Your event, condensed.' })).toBeVisible();
  await expect(p.getByText('North Science Academy', { exact: true })).toBeVisible();
  await expect(p.locator('time')).toHaveAttribute('datetime', sheet.createdAt);
  await p.getByRole('button', { name: 'Open & export' }).click();
  await expect(p.getByRole('button', { name: 'Print / save PDF' })).toBeEnabled();
  const printed = p.frameLocator('.sheet-preview iframe');
  await expect(printed.locator('.col figure.ref')).toHaveCount(1);
  await expect(printed.locator('.col figure.ref figcaption')).toContainText(goodFigure.credit);
  const download = p.waitForEvent('download');
  await p.getByRole('button', { name: 'Download sheet', exact: true }).click();
  await (await download).saveAs(`${out}/ui-export.html`);
  await p.getByLabel('Sheet title').fill('My custom sheet');
  await p
    .getByLabel('Leave out what I already know')
    .fill('Basic definitions of inhalation and exhalation.');
  await p.locator('input[type=file]').setInputFiles({
    name: 'data.csv',
    mimeType: 'text/csv',
    buffer: Buffer.from('volume,flow\n2,5'),
  });
  await p.getByRole('button', { name: 'Generate & share sheet' }).click();
  await expect(
    p.getByText('Your sheet is shared with Division C students across every community.'),
  ).toBeVisible();
  assert.ok(generated && published);
  assert.equal(generationInput.exclusions, draft.exclusions);
  assert.equal(generationInput.uploads[0].name, 'data.csv');
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
  await p.getByLabel('Show event').selectOption('');
  await expect(p.locator('.sheet-card')).toHaveCount(2);
  profile = { ...profile, division: 'B' };
  await p.reload();
  await expect(p.getByText('COMING SOON', { exact: true })).toBeVisible();
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log(
    'Page checks passed: upload, exclusions, auto-share, school/date cards, export, mobile/themes, Division B unchanged.',
  );
} finally {
  await browser.close();
}
