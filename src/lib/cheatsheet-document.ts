import { sheetFigure } from './cheatsheet-figures.ts';
import type { CheatSheet, SheetDiagram } from './cheatsheet-types.ts';

const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
function diagramSvg(d: SheetDiagram) {
  const e = escape;
  const labelLines = (label: string) => {
    const lines: string[] = [];
    for (const word of label.match(/.{1,12}(?:\s|$)|\S{1,12}/g) ?? [label]) lines.push(word.trim());
    return lines.slice(0, 3);
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" role="img" aria-label="${e(d.title)}">
    <defs><marker id="arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5" fill="#36546c"/></marker></defs>
    ${d.edges
      .map((edge) => {
        const a = d.nodes[edge.from],
          b = d.nodes[edge.to];
        const dx = (b.x - a.x) * 2.4,
          dy = (b.y - a.y) * 1.6;
        const len = Math.hypot(dx, dy) || 1;
        const trim = Math.min(20, len / 3);
        return `<line x1="${a.x * 2.4}" y1="${a.y * 1.6}" x2="${b.x * 2.4 - (dx / len) * trim}" y2="${b.y * 1.6 - (dy / len) * trim}" stroke="#36546c" marker-end="url(#arrow)"/><text x="${(a.x + b.x) * 1.2 + 3}" y="${(a.y + b.y) * 0.8 - 3}" font-size="10" fill="#111">${e(edge.label)}</text>`;
      })
      .join('')}
    ${d.nodes
      .map((n) => {
        const lines = labelLines(n.label),
          height = Math.max(22, lines.length * 11 + 4);
        return `<rect x="${n.x * 2.4 - 36}" y="${n.y * 1.6 - height / 2}" width="72" height="${height}" rx="3" fill="#eef5f8" stroke="#36546c"/><text text-anchor="middle" font-family="Arial" font-size="10.5" fill="#111">${lines.map((line, i) => `<tspan x="${n.x * 2.4}" y="${n.y * 1.6 - (lines.length - 1) * 5.5 + 3.5 + i * 11}">${e(line)}</tspan>`).join('')}</text>`;
      })
      .join('')}
  </svg>`;
}

// figureData maps catalog figure ids to image data URLs. A figure that could not be fetched is
// left out, so the sheet stays complete and exportable without it. Its width/height ratio fixes
// the printed height before the image decodes; the column fit measures blocks synchronously.
export function sheetDocument(
  sheet: CheatSheet,
  figureData: Record<string, { src: string; ratio: number }> = {},
): string {
  let blocks = '';
  sheet.content.sections.forEach((s) => {
    const parts: string[] = s.facts.map((f) => `<p>${escape(f)}</p>`);
    for (const id of s.figures ?? []) {
      const figure = sheetFigure(id),
        data = figureData[id];
      if (
        !figure ||
        !/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/.test(data?.src ?? '')
      )
        continue;
      parts.push(
        `<figure class="ref"><img alt="${escape(figure.alt)}" src="${data.src}" style="aspect-ratio:${Math.min(8, Math.max(0.5, Number(data.ratio) || 1.5))}"/><figcaption>${escape(figure.title)} <small>${escape(figure.credit)}</small></figcaption></figure>`,
      );
    }
    if (s.table.headers.length >= 4) {
      // Wide comparisons become compact labeled rows: narrow 4–5-cell tables
      // waste paper and split scientific terms into unreadable fragments.
      s.table.rows.forEach((row, i) =>
        parts.push(
          `${i === 0 ? `<p class="comparison-key"><b>${s.table.headers.map(escape).join(' · ')}</b></p>` : ''}<p class="comparison"><strong>${escape(row[0])}</strong> · ${row.slice(1).map(escape).join(' · ')}</p>`,
        ),
      );
    } else {
      for (let i = 0; i < s.table.rows.length; i += 5) {
        parts.push(
          `<table><thead><tr>${s.table.headers.map((h) => `<th>${escape(h)}</th>`).join('')}</tr></thead><tbody>${s.table.rows
            .slice(i, i + 5)
            .map((r) => `<tr>${r.map((c) => `<td>${escape(c)}</td>`).join('')}</tr>`)
            .join('')}</tbody></table>`,
        );
      }
    }
    s.diagrams.forEach((d) =>
      parts.push(
        `<figure><img alt="${escape(d.title)}" src="data:image/svg+xml,${encodeURIComponent(diagramSvg(d))}"/><figcaption>${escape(d.title)}</figcaption></figure>`,
      ),
    );
    parts.forEach((part, i) => {
      blocks += `<div class="block" data-heading="${escape(s.heading)}"${i === 0 ? ' data-first="true"' : ''}>${i === 0 ? `<h2>${escape(s.heading)}</h2>` : ''}${part}</div>`;
    });
  });
  sheet.images.forEach((u, i) => {
    blocks += `<div class="block" data-heading="Supplementary figure ${i + 1}" data-first="true"><figure class="upload"><img alt="Supplementary figure ${i + 1}" src="data:${u.mime};base64,${u.data}"/><figcaption>Supplementary figure ${i + 1}</figcaption></figure></div>`;
  });
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${escape(sheet.title)}</title>
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; style-src 'unsafe-inline'"/>
  <style>
    *{box-sizing:border-box}html,body{margin:0;padding:0;background:#e5e7eb;color:#101820;font-family:Arial,Helvetica,sans-serif}
    .page{width:8.5in;height:11in;padding:.25in;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.085in;background:white;margin:0 auto 16px;break-after:page;overflow:hidden}
    .page:last-of-type{break-after:auto;margin-bottom:0}.col{min-width:0;height:10.5in;border-right:.4px solid #c3cbd1;padding-right:.045in;font-size:7.5pt;line-height:1.1;overflow-wrap:anywhere}
    .col:last-child{border:0;padding-right:0}.block{padding:0 0 2px;break-inside:avoid}h2{font-size:1.07em;line-height:1.12;margin:2px 0 2px;padding:2px 3px;background:#dceaf3;border-top:1px solid #658ba4;text-transform:uppercase;letter-spacing:.02em}
    .continued{background:#f0f4f7}p{margin:0}.comparison{background:#f2f5f7;border-bottom:.4px solid #c3cbd1;padding:2px}table{width:100%;border-collapse:collapse;font:inherit;table-layout:fixed;margin:1px 0}th,td{border:.4px solid #aab5be;padding:1px 2px;vertical-align:top;text-align:left}th{background:#e9eef1;font-weight:700}tr:nth-child(even){background:#f6f8f9}
    figure{margin:2px 0}figure img{display:block;width:100%;height:calc(125px*var(--fig,1));object-fit:contain}figure.upload img{height:175px}figure.ref img{height:auto;max-height:calc(1.4in*var(--fig,1))}figcaption small{font-weight:400;font-size:.8em;color:#4a5560}figcaption{font-weight:700;font-size:.92em;margin-top:1px}
    @page{size:letter portrait;margin:0}@media print{html,body{background:white}.page{margin:0;box-shadow:none}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
  </style></head><body><main aria-label="Front and back of one sheet">${[0, 1].map((side) => `<section class="page" aria-label="${side ? 'Back' : 'Front'}">${Array.from({ length: 4 }, () => '<div class="col"></div>').join('')}</section>`).join('')}</main><template id="sheet-blocks">${blocks}</template></body></html>`;
}

// Runs against the sandboxed preview document. Export uses these exact measured pages.
// No content is clipped: a failed fit disables publication and export.
export function fitSheetDocument(doc: Document): { fits: boolean; fontSize: number; fill: number } {
  const template = doc.querySelector<HTMLTemplateElement>('#sheet-blocks');
  const columns = Array.from(doc.querySelectorAll<HTMLElement>('.col'));
  if (!template || columns.length !== 8) throw new Error('Invalid sheet document');
  const blocks = Array.from(template.content.children);
  function distribute(size: number, height: number): boolean {
    columns.forEach((c) => {
      c.replaceChildren();
      c.style.fontSize = `${size}pt`;
    });
    let index = 0;
    for (const source of blocks) {
      const block = source.cloneNode(true) as HTMLElement;
      let col = columns[index];
      const addHeading = () => {
        if (!col.children.length && !block.dataset.first) {
          const heading = doc.createElement('h2');
          heading.className = 'continued';
          heading.textContent = `${block.dataset.heading} (cont.)`;
          block.prepend(heading);
        }
      };
      addHeading();
      col.append(block);
      if (
        col.scrollHeight > height ||
        block.getBoundingClientRect().bottom - col.getBoundingClientRect().top > height
      ) {
        block.remove();
        block.querySelector('.continued')?.remove();
        index++;
        if (index >= columns.length) return false;
        col = columns[index];
        addHeading();
        col.append(block);
        if (block.getBoundingClientRect().bottom - col.getBoundingClientRect().top > height)
          return false;
      }
    }
    return true;
  }
  columns.forEach((c) => {
    c.style.height = '10.5in';
  });
  const maxHeight = columns[0].clientHeight - 2;
  // scrollHeight includes the column's fixed height; measure content via block bottoms.
  columns.forEach((c) => {
    c.style.height = 'auto';
    c.style.alignSelf = 'start';
  });
  // Prefer full-size figures with text of at least 6 pt. A crowded sheet first gives up figure
  // height, then the last half point of type, before it is reported as not fitting.
  let size = 0;
  for (const [figures, floor] of [
    [1, 6],
    [0.85, 6],
    [0.7, 6],
    [0.7, 5.5],
    [0.55, 5.5],
  ]) {
    doc.documentElement.style.setProperty('--fig', String(figures));
    size = 7.5;
    while (size >= floor && !distribute(size, maxHeight)) size = Math.round((size - 0.1) * 10) / 10;
    if (size >= floor) break;
    size = 0;
  }
  if (!size) return { fits: false, fontSize: 5.5, fill: 0 };
  // Balance both sides; keep every block and repeat headings at column boundaries.
  let low = maxHeight * 0.35,
    high = maxHeight;
  for (let i = 0; i < 9; i++) {
    const mid = (low + high) / 2;
    if (distribute(size, mid)) high = mid;
    else low = mid;
  }
  distribute(size, high + 1);
  return { fits: true, fontSize: size, fill: high / maxHeight };
}
