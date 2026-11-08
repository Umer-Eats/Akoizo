import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
// Tiles <dir>/<clip>_<0..5>.jpg frames into one review image: node contact-sheet.mjs <dir> clip...
const [dir, ...clips] = process.argv.slice(2);
const html = `${dir}/sheet_${clips[0]}.html`;
await writeFile(html, `<body style="margin:0;background:#333;display:grid;grid-template-columns:repeat(6,270px);gap:2px">${clips.flatMap((c) => [0, 1, 2, 3, 4, 5].map((i) => `<img src="${c}_${i}.jpg">`)).join('')}</body>`);
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: 6 * 272, height: clips.length * 482 } });
await p.goto(pathToFileURL(html).href);
await p.waitForTimeout(400);
await p.screenshot({ path: `${dir}/sheet_${clips[0]}.png` });
await b.close();
