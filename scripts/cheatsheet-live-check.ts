// Opt-in local smoke test. Calls Gemini once and writes only local QA output; no school DB changes.
// Run: node --env-file=.env.local --experimental-strip-types scripts/cheatsheet-live-check.ts [eventId] [--reuse]
// --reuse lays out the previous tmp/cheatsheets/live-sheet.json again without calling Gemini.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { generateSheet } from '../src/lib/cheatsheet-ai.ts';
import { fitSheetDocument, sheetDocument } from '../src/lib/cheatsheet-document.ts';
import { sheetFigure } from '../src/lib/cheatsheet-figures.ts';
import type { CheatSheet, SheetInput } from '../src/lib/cheatsheet-types.ts';

const input: SheetInput = {
  eventId: process.argv[2] ?? 'anatomy-and-physiology',
  title: 'Live check',
  level: 'national',
  notes: '',
  exclusions: '',
  uploads: [],
};
const out = 'tmp/cheatsheets';
await mkdir(out, { recursive: true });
const content = process.argv.includes('--reuse')
  ? (JSON.parse(await readFile(`${out}/live-sheet.json`, 'utf8')) as CheatSheet).content
  : await generateSheet(input);
const ids = content.sections.flatMap((s) => s.figures ?? []);
const text = content.sections.reduce(
  (n, s) => n + s.facts.join(' ').length + s.table.rows.flat().join(' ').length,
  0,
);
console.log(`${content.sections.length} sections, ${text} characters, ${ids.length} figures`);
const figureData: Record<string, { src: string; ratio: number }> = {};
for (const id of ids) {
  const response = await fetch(sheetFigure(id)!.src, {
    headers: { 'User-Agent': 'Akoizo/1.0 (https://akoizo.app; study reference figures)' },
  });
  const type = response.headers.get('content-type')?.split(';')[0];
  if (response.ok && type?.startsWith('image/'))
    figureData[id] = {
      src: `data:${type};base64,${Buffer.from(await response.arrayBuffer()).toString('base64')}`,
      ratio: 0,
    };
  else console.log(`Figure unavailable: ${id} (${response.status})`);
}
const sheet: CheatSheet = {
  ...input,
  id: 'qa',
  createdAt: new Date().toISOString(),
  schoolName: 'QA School',
  hasExclusions: false,
  imageCount: 0,
  content,
  images: [],
  published: false,
};
await writeFile(`${out}/live-sheet.json`, JSON.stringify(sheet, null, 2));
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 816, height: 2128 } });
  for (const figure of Object.values(figureData))
    figure.ratio = await page.evaluate(async (src) => {
      const image = new Image();
      image.src = src;
      await image.decode();
      return image.naturalWidth / image.naturalHeight;
    }, figure.src);
  await page.setContent(sheetDocument(sheet, figureData));
  await page.waitForFunction(() => Array.from(document.images).every((i) => i.complete));
  const fit = await page.evaluate(`(${fitSheetDocument.toString()})(document)`);
  console.log('Fit:', fit);
  await writeFile(`${out}/live-sheet.html`, await page.content());
  await page.screenshot({ path: `${out}/live-sheet.png`, fullPage: true });
  await page.pdf({ path: `${out}/live-sheet.pdf`, format: 'Letter', printBackground: true });
} finally {
  await browser.close();
}
