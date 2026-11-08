import { courseSvg, type BuildCourse } from './build-events.ts';

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );

/** Printable pages share the binder/cheat-sheet export pipeline. Model text is escaped. */
export function courseDocument(course: BuildCourse) {
  const svg = courseSvg(course);
  const top = Number(svg.match(/<rect x="30" y="([\d.]+)" width="840"/)?.[1] ?? 100);
  const map = svg.replace(/viewBox="0 0 900 [\d.]+"/, `viewBox="0 ${top} 900 420"`);
  const blocks: string[] = [];
  function section(title: string, entries: string[]) {
    entries.forEach((entry, i) =>
      blocks.push(
        `<section class="course-block">${i === 0 ? `<h2>${esc(title)}</h2>` : ''}<p>${entry}</p></section>`,
      ),
    );
  }
  section(
    'Course key',
    course.diagram.nodes.map((n, i) => `<strong>${i + 1}.</strong> ${esc(n.label)}`),
  );
  section(
    'Dimensions and connections',
    course.diagram.edges.map(
      (e) => `<strong>${e.from + 1} → ${e.to + 1}:</strong> ${esc(e.label || 'Connection')}`,
    ),
  );
  section(
    'Setup parameters',
    Object.entries(course.parameters).map(([k, v]) => `<strong>${esc(k)}:</strong> ${esc(v)}`),
  );
  section(
    'Set it up',
    course.setup.map((step, i) => `<strong>${i + 1}.</strong> ${esc(step)}`),
  );
  if (course.notes.trim())
    section(
      'Setup notes',
      (course.notes.match(/[\s\S]{1,1000}(?:\s|$)|[\s\S]{1,1000}/g) ?? []).map(esc),
    );
  section('Rule references', course.ruleReferences.map(esc));
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta http-equiv="Content-Security-Policy" content="default-src 'none';img-src data:;style-src 'unsafe-inline'"/><title>${esc(course.title)}</title><style>
*{box-sizing:border-box}body{margin:0;background:#e9edf2;color:#15253a;font:11pt/1.45 Arial,sans-serif}.page{position:relative;width:8.5in;height:11in;padding:.5in;margin:0 auto 18px;background:white;break-after:page}.page:last-of-type{break-after:auto}.page-content{height:9.55in;overflow-wrap:anywhere}header{font-size:9pt;color:#405d82;border-bottom:2px solid #5378bc;padding-bottom:8px;margin-bottom:18px}h1{font-size:22pt;line-height:1.15}h2{font-size:14pt;color:#305b9c;margin:14px 0 8px}p{margin:0 0 10px}.course-block{break-inside:avoid}figure{margin:0}figure svg{display:block;width:100%;height:auto}figcaption{font-size:10pt;color:#405d82;margin-top:14px}footer{position:absolute;bottom:.25in;left:.5in;right:.5in;font-size:9pt;border-top:1px solid #c5d2e4;padding-top:6px}.course-queue{display:none}@page{size:letter;margin:0}@media print{body{background:white}.page{margin:0;print-color-adjust:exact;-webkit-print-color-adjust:exact}}
</style></head><body><section class="page"><div class="page-content"><header>AKOIZO · Division ${course.division} · 2027 · ${esc(course.level)}</header><h1>${esc(course.title)}</h1><figure>${map}<figcaption>Practice schematic, not to scale. Match numbered markers to the course key and use the stated dimensions when building.</figcaption></figure></div><footer>Course diagram</footer></section><div class="course-queue">${blocks.join('')}</div></body></html>`;
}

/** Move complete blocks onto Letter pages at the measured, readable 11 pt font. */
export function fitCourseDocument(doc: Document): boolean {
  const queue = doc.querySelector('.course-queue');
  const header = doc.querySelector('header')?.textContent ?? 'Course setup';
  let content: HTMLElement | null = null;
  for (const block of Array.from(queue?.children ?? [])) {
    const addPage = () => {
      const page = doc.createElement('section');
      page.className = 'page';
      content = doc.createElement('div');
      content.className = 'page-content';
      const heading = doc.createElement('header');
      heading.textContent = header;
      content.append(heading);
      page.append(content);
      doc.body.insertBefore(page, queue);
    };
    if (!content) addPage();
    content!.append(block);
    if (content!.scrollHeight > content!.clientHeight + 1 && content!.children.length > 2) {
      addPage();
      content!.append(block);
    }
  }
  queue?.remove();
  const pages = Array.from(doc.querySelectorAll<HTMLElement>('.page'));
  pages.forEach((page, i) => {
    let footer = page.querySelector('footer');
    if (!footer) {
      footer = doc.createElement('footer');
      page.append(footer);
    }
    footer.textContent = `${i === 0 ? 'Course diagram' : 'Course setup'} · ${i + 1} / ${pages.length}`;
  });
  return Array.from(doc.querySelectorAll<HTMLElement>('.page-content')).every(
    (p) => p.scrollHeight <= p.clientHeight + 1 && p.scrollWidth <= p.clientWidth + 1,
  );
}
