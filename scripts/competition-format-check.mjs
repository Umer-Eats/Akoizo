// Local layout regression check; no server, account changes or provider calls.
// node --experimental-strip-types scripts/competition-format-check.mjs
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { blankCourse, courseSvg } from '../src/lib/build-events.ts';
import { courseDocument, fitCourseDocument } from '../src/lib/course-document.ts';
import { binderDiagramSvg, binderDocument, fitBinderDocument } from '../src/lib/binder-document.ts';
const out = 'tmp/competition-qa';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 1200 } });
  await page.route('https://**/*', (route) => route.abort());
  const geometry = async () =>
    page.evaluate(() => {
      const problems = [];
      for (const svg of document.querySelectorAll('svg')) {
        const bounds = svg.viewBox.baseVal;
        const boxes = [...svg.querySelectorAll('text')].map((t) => ({
          text: t.textContent,
          box: t.getBBox(),
        }));
        boxes.forEach(({ text, box: b }, i) => {
          if (
            b.x < -1 ||
            b.y < -1 ||
            b.x + b.width > bounds.width + 1 ||
            b.y + b.height > bounds.height + 1
          )
            problems.push('Outside: ' + text);
          for (const { text: other, box: c } of boxes.slice(i + 1))
            if (
              b.x < c.x + c.width - 1 &&
              b.x + b.width > c.x + 1 &&
              b.y < c.y + c.height - 1 &&
              b.y + b.height > c.y + 1
            )
              problems.push('Overlap: ' + text + ' / ' + other);
        });
      }
      return problems;
    });
  const course = blankCourse('B', 'scrambler');
  course.title = 'Crowded course label regression';
  course.diagram.nodes = Array.from({ length: 20 }, (_, i) => ({
    label: `Station ${i + 1}: long apparatus label, exact dimension 5.00 m, reference position`,
    x: 50,
    y: 50,
  }));
  course.diagram.edges = Array.from({ length: 19 }, (_, i) => ({
    from: i,
    to: i + 1,
    label: 'Long dimension label, measured from the reference line, 5.00 m',
  }));
  course.title = 'W'.repeat(120);
  course.diagram.nodes[0].label = 'W'.repeat(90);
  const courses = [['crowded', course]];
  for (const key of ['C-electric-vehicle', 'B-scrambler']) {
    try {
      courses.push([key, JSON.parse(await readFile(`${out}/${key}.json`, 'utf8'))]);
    } catch {}
  }
  for (const [name, c] of courses) {
    await page.setContent(courseSvg(c));
    assert.deepEqual(await geometry(), [], name);
    await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
    const printable = {
      ...c,
      notes: 'Setup notes. '.repeat(450),
      setup: Array.from(
        { length: 30 },
        (_, i) => `${i + 1}. ` + 'Measure and verify the course dimensions. '.repeat(45),
      ),
      ruleReferences: ['Rules: course setup'],
    };
    await page.setContent(courseDocument(printable));
    assert.equal(
      await page.evaluate(`(${fitCourseDocument.toString()})(document)`),
      true,
      `${name} printable`,
    );
    assert.equal(
      await page.locator('.course-block').count(),
      c.diagram.nodes.length +
        c.diagram.edges.length +
        Object.keys(c.parameters).length +
        30 +
        Math.ceil(printable.notes.length / 1001) +
        1,
    );
    assert.ok((await page.locator('.page').count()) > 2);
    assert.equal(
      await page.evaluate(`(${fitCourseDocument.toString()})(document)`),
      true,
      'Repeat fitting is stable',
    );
  }
  for (let n = 3; n <= 6; n++) {
    const d = {
      kind: 'cycle',
      title: 'Long cycle labels',
      caption: 'Loop',
      items: Array.from({ length: n }, (_, i) => ({
        label: `Stage ${i + 1} environmental transport`,
        detail:
          'Diagnostic evidence and specific mechanism with units, exceptions and identification clues.',
      })),
      xLabel: '',
      yLabel: '',
      series: [],
    };
    for (const kind of ['cycle', 'flow', 'compare', 'layers', 'scale']) {
      await page.setContent(binderDiagramSvg({ ...d, kind }));
      assert.deepEqual(await geometry(), [], `${kind} ${n}`);
    }
  }
  let binder;
  try {
    binder = JSON.parse(await readFile(`${out}/binder.json`, 'utf8'));
  } catch {
    binder = JSON.parse(await readFile('tmp/binders/live-dynamic-planet.json', 'utf8'));
  }
  await page.setContent(binderDocument(binder));
  assert.equal(await page.evaluate(`(${fitBinderDocument.toString()})(document)`), true);
  const report = await page.evaluate(() =>
    [...document.querySelectorAll('.page-body')].map((b) => ({
      font: getComputedStyle(b).fontSize,
      zoom: b.firstElementChild.style.zoom || '1',
      clipped: b.scrollHeight > b.clientHeight + 1 || b.scrollWidth > b.clientWidth + 1,
    })),
  );
  assert.ok(report.every((p) => !p.clipped));
  assert.ok(
    report.every((p) => Number(p.zoom) >= 0.9),
    'Binder must remain readable without heavy shrinking',
  );
  await page
    .locator('.page')
    .nth(1)
    .screenshot({ path: `${out}/binder-page.png` });
  await writeFile(`${out}/layout-report.json`, JSON.stringify(report, null, 2));
  console.log(
    `Layout passed: ${courses.length} courses, cycles of 3–6 stages, ${report.length} binder pages. No overlapping SVG labels or page clipping.`,
  );
} finally {
  await browser.close();
}
