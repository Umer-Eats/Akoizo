import type { Binder, BinderDiagram } from './binder-types.ts';
import { binderRecommendations, binderTocPages, binderTocRows } from './binders.ts';

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
// One colour per section tab; all are dark enough to carry white text and to print legibly.
export const binderPalette = [
  '#2563a6',
  '#167565',
  '#a24466',
  '#825b19',
  '#6652a3',
  '#a94e2b',
  '#0f6e8c',
  '#4d7a1f',
  '#8a3f8f',
  '#b0413e',
  '#3f4f9e',
  '#55636f',
];
const W = 600,
  H = 210,
  ink = '#1c2c3e',
  muted = '#52687b';
const tone = (base: number, i: number) => binderPalette[(base + i) % binderPalette.length];

// SVG has no text wrapping, so lines are broken by an average glyph width for the font size.
function wrap(text: string, width: number, size: number, max: number, bold = false) {
  const limit = Math.max(4, Math.floor(width / (size * (bold ? 0.58 : 0.52))));
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(' ')) {
    if (!line) line = word;
    else if (line.length + 1 + word.length <= limit) line += ` ${word}`;
    else (lines.push(line), (line = word));
  }
  if (line) lines.push(line);
  const kept = lines.slice(0, max).map((l) => (l.length > limit ? `${l.slice(0, limit - 1)}…` : l));
  if (lines.length > max) kept[max - 1] = `${kept[max - 1].slice(0, limit - 1).trimEnd()}…`;
  return kept;
}
function lines(
  text: string[],
  x: number,
  y: number,
  size: number,
  opts: { fill?: string; bold?: boolean; anchor?: 'middle' | 'end' } = {},
) {
  if (!text.length) return '';
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${opts.fill ?? ink}"${opts.bold ? ' font-weight="700"' : ''}${opts.anchor ? ` text-anchor="${opts.anchor}"` : ''}>${text.map((t, i) => `<tspan x="${x}" dy="${i ? size * 1.22 : 0}">${esc(t)}</tspan>`).join('')}</text>`;
}
function arrow(points: [number, number][], color: string) {
  const [x1, y1] = points[points.length - 2],
    [x2, y2] = points[points.length - 1];
  const a = Math.atan2(y2 - y1, x2 - x1),
    head = (d: number) => `${x2 - 8 * Math.cos(a + d)},${y2 - 8 * Math.sin(a + d)}`;
  return `<polyline points="${points.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="2"/><polygon points="${x2},${y2} ${head(0.45)} ${head(-0.45)}" fill="${color}"/>`;
}
// A labeled card: coloured title band over a tinted body holding the explanation.
function card(
  item: BinderDiagram['items'][number],
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  badge = '',
) {
  const inset = badge ? 24 : 8,
    title = wrap(item.label, w - inset - 8, 11.5, 2, true),
    band = title.length * 14 + 10,
    body = wrap(item.detail, w - 14, 10, Math.max(1, Math.floor((h - band - 8) / 12.2)));
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${color}" fill-opacity=".1" stroke="${color}" stroke-width="1.5"/><path d="M${x + 6} ${y}h${w - 12}a6 6 0 0 1 6 6v${band - 6}h${-w}v${6 - band}a6 6 0 0 1 6-6z" fill="${color}"/>${badge ? `<circle cx="${x + 14}" cy="${y + band / 2}" r="8.5" fill="#fff"/><text x="${x + 14}" y="${y + band / 2 + 3.8}" font-size="10.5" font-weight="700" text-anchor="middle" fill="${color}">${badge}</text>` : ''}${lines(title, x + inset + 4, y + 17, 11.5, { fill: '#fff', bold: true })}${lines(body, x + 7, y + band + 14, 10)}`;
}
function grid(d: BinderDiagram, base: number, flow: boolean) {
  const n = d.items.length,
    cols = n <= 4 ? n : 3,
    rows = Math.ceil(n / cols),
    gap = flow ? 26 : 12,
    w = (W - 8 - gap * (cols - 1)) / cols,
    h = rows === 1 ? 168 : 92,
    top = rows === 1 ? 20 : 4,
    at = (i: number) => ({
      x: 4 + (i % cols) * (w + gap),
      y: top + Math.floor(i / cols) * (h + 22),
    });
  return d.items
    .map((item, i) => {
      const { x, y } = at(i),
        color = flow ? tone(base, 0) : tone(base, i);
      let link = '';
      if (flow && i < n - 1) {
        const next = at(i + 1);
        link =
          next.y === y
            ? arrow(
                [
                  [x + w + 3, y + h / 2],
                  [next.x - 3, y + h / 2],
                ],
                muted,
              )
            : arrow(
                [
                  [x + w / 2, y + h + 2],
                  [x + w / 2, y + h + 11],
                  [next.x + w / 2, y + h + 11],
                  [next.x + w / 2, next.y - 3],
                ],
                muted,
              );
      }
      return card(item, x, y, w, h, color, flow ? String(i + 1) : '') + link;
    })
    .join('');
}
function cycle(d: BinderDiagram, base: number) {
  const n = d.items.length,
    w = n <= 4 ? 190 : n === 5 ? 168 : 150,
    h = n <= 4 ? 64 : 52,
    cx = W / 2,
    cy = H / 2,
    rx = 205,
    ry = 68,
    point = (deg: number) => {
      const a = (deg * Math.PI) / 180;
      return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)] as const;
    };
  let out = `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${muted}" stroke-width="2" stroke-dasharray="5 4"/>`;
  for (let i = 0; i < n; i++) {
    // Arrowheads sit on the ring midway between neighbouring stages, pointing clockwise.
    const mid = -90 + ((i + 0.5) * 360) / n,
      [x, y] = point(mid),
      [x0, y0] = point(mid - 4);
    out += arrow(
      [
        [x0, y0],
        [x, y],
      ],
      muted,
    ).replace(/<polyline[^>]+>/, '');
  }
  return (
    out +
    d.items
      .map((item, i) => {
        const [x, y] = point(-90 + (i * 360) / n);
        return `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" fill="#fff"/>${card(item, x - w / 2, y - h / 2, w, h, tone(base, i), String(i + 1))}`;
      })
      .join('')
  );
}
function layers(d: BinderDiagram, base: number) {
  const n = d.items.length,
    h = Math.min(62, (H - 8) / n),
    top = (H - h * n) / 2;
  return d.items
    .map((item, i) => {
      const y = top + i * h,
        color = tone(base, i),
        title = wrap(item.label, 172, 11.5, 2, true),
        body = wrap(item.detail, 386, 10.5, Math.max(1, Math.floor((h - 6) / 12.8)));
      return `<rect x="4" y="${y}" width="190" height="${h - 3}" fill="${color}"/><rect x="194" y="${y}" width="402" height="${h - 3}" fill="${color}" fill-opacity=".12"/>${lines(title, 14, y + (h - 3) / 2 - (title.length - 1) * 7 + 4, 11.5, { fill: '#fff', bold: true })}${lines(body, 204, y + (h - 3) / 2 - (body.length - 1) * 6.4 + 3.5, 10.5)}`;
    })
    .join('');
}
function scale(d: BinderDiagram, base: number) {
  const n = d.items.length,
    w = (W - 8) / n;
  return (
    arrow(
      [
        [8, 20],
        [W - 8, 20],
      ],
      muted,
    ) +
    lines([d.xLabel || 'Increasing →'], W / 2, 12, 10.5, {
      fill: muted,
      bold: true,
      anchor: 'middle',
    }) +
    d.items
      .map((item, i) => {
        const x = 4 + i * w,
          title = wrap(item.label, w - 10, 11, 2, true),
          body = wrap(item.detail, w - 10, 10, 9);
        return `<rect x="${x}" y="32" width="${w - 2}" height="42" fill="${tone(base, i)}"/>${lines(title, x + w / 2 - 1, 57 - (title.length - 1) * 6.5, 11, { fill: '#fff', bold: true, anchor: 'middle' })}<rect x="${x}" y="76" width="${w - 2}" height="${H - 80}" fill="${tone(base, i)}" fill-opacity=".1"/>${lines(body, x + 5, 92, 10)}`;
      })
      .join('')
  );
}
function plot(d: BinderDiagram, base: number) {
  const left = 70,
    right = W - 24,
    top = 24,
    bottom = H - 42,
    points = d.series.flatMap((s) => s.points);
  const axis = (values: number[], from: number, to: number) => {
    let lo = Math.min(...values),
      hi = Math.max(...values);
    // Quantities spanning several orders of magnitude (luminosity, discharge) read best on a log axis.
    const log = lo > 0 && hi / lo > 1000;
    if (log) [lo, hi] = [Math.floor(Math.log10(lo)), Math.ceil(Math.log10(hi))];
    else if (lo === hi) [lo, hi] = [lo - 1, hi + 1];
    else {
      const pad = (hi - lo) * 0.06;
      [lo, hi] = [lo >= 0 && lo - pad < 0 ? 0 : lo - pad, hi + pad];
    }
    const count = log ? Math.min(hi - lo, 6) : 4;
    return {
      at: (v: number) => from + (((log ? Math.log10(v) : v) - lo) / (hi - lo)) * (to - from),
      ticks: Array.from({ length: count + 1 }, (_, i) => {
        const v = lo + ((hi - lo) * i) / count;
        return {
          pos: from + ((v - lo) / (hi - lo)) * (to - from),
          label: log
            ? `10^${Math.round(v)}`
            : Math.abs(v) >= 10000 || (v !== 0 && Math.abs(v) < 0.01)
              ? v.toExponential(1)
              : String(Number(v.toPrecision(3))),
        };
      }),
    };
  };
  const x = axis(
      points.map((p) => p.x),
      left,
      right,
    ),
    y = axis(
      points.map((p) => p.y),
      bottom,
      top,
    );
  return (
    x.ticks
      .map(
        (t) =>
          `<line x1="${t.pos}" y1="${top}" x2="${t.pos}" y2="${bottom}" stroke="#dbe3ea"/>${lines([t.label], t.pos, bottom + 13, 9.5, { fill: muted, anchor: 'middle' })}`,
      )
      .join('') +
    y.ticks
      .map(
        (t) =>
          `<line x1="${left}" y1="${t.pos}" x2="${right}" y2="${t.pos}" stroke="#dbe3ea"/>${lines([t.label], left - 6, t.pos + 3.5, 9.5, { fill: muted, anchor: 'end' })}`,
      )
      .join('') +
    `<path d="M${left} ${top}V${bottom}H${right}" fill="none" stroke="${ink}" stroke-width="1.5"/>` +
    lines([d.xLabel], (left + right) / 2, H - 8, 10.5, { bold: true, anchor: 'middle' }) +
    `<text transform="translate(14 ${(top + bottom) / 2}) rotate(-90)" font-size="10.5" font-weight="700" text-anchor="middle" fill="${ink}">${esc(d.yLabel)}</text>` +
    d.series
      .map((s, i) => {
        const color = tone(base, i * 2),
          at = s.points.map((p) => [x.at(p.x), y.at(p.y)] as const);
        return `<polyline points="${at.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="2.2"/>${at.map(([px, py]) => `<circle cx="${px}" cy="${py}" r="3" fill="#fff" stroke="${color}" stroke-width="1.8"/>`).join('')}<rect x="${left + 8 + i * 172}" y="6" width="14" height="4" fill="${color}"/>${lines(wrap(s.name, 140, 10, 1), left + 27 + i * 172, 12, 10)}`;
      })
      .join('')
  );
}
// Diagrams are drawn by the app from validated labels and numbers; model text is only ever
// escaped text content, never markup.
export function binderDiagramSvg(d: BinderDiagram, base = 0) {
  const body =
    d.kind === 'plot'
      ? plot(d, base)
      : d.kind === 'cycle'
        ? cycle(d, base)
        : d.kind === 'layers'
          ? layers(d, base)
          : d.kind === 'scale'
            ? scale(d, base)
            : grid(d, base, d.kind === 'flow');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(d.title)}" font-family="Arial,Helvetica,sans-serif">${body}</svg>`;
}

export function binderDocument(binder: Binder) {
  const toc = binderTocPages(binder.pageCount),
    total = binder.pageCount;
  let start = toc + 1;
  const sections = binder.plan.sections.map((s, i) => {
    const result = { ...s, index: i, start, color: binderPalette[i % binderPalette.length] };
    start += s.pages;
    return result;
  });
  const sectionFor = (page: number) =>
    sections.find((s) => page >= s.start && page < s.start + s.pages) ?? sections[0];
  const tabHeight = Math.min(0.62, 10.2 / Math.max(1, sections.length));

  // Contents: one fixed-height row per topic so every page number is known before layout.
  type Row = { html: string; rows: number };
  const entries: Row[] = sections.flatMap((s) => [
    {
      rows: 2,
      html: `<a class="toc-section" style="--section:${s.color}" href="#page-${s.start}"><b>${s.index + 1}</b><span>${esc(s.title)}</span><i>${s.start}–${s.start + s.pages - 1}</i></a>`,
    },
    ...s.topics.map((topic, i) => ({
      rows: 1,
      html: `<a class="toc-topic" href="#page-${s.start + i}"><span>${esc(topic)}</span><i>${s.start + i}</i></a>`,
    })),
  ]);
  const columns: string[][] = Array.from({ length: toc * 2 }, () => []);
  let column = 0,
    used = 0;
  for (const entry of entries) {
    const room = () => (column < 2 ? binderTocRows.first : binderTocRows.rest) - used;
    if (room() < entry.rows && column < columns.length - 1) (column++, (used = 0));
    columns[column].push(entry.html);
    used += entry.rows;
  }
  const guide = binderRecommendations[binder.eventId];
  const tocPages = Array.from({ length: toc }, (_, page) => {
    const intro =
      page === 0
        ? `<p class="eyebrow">AKOIZO / DIVISION C / 2027</p><h1>${esc(binder.title)}</h1><p class="subtitle">${esc(binder.level)} study binder · ${total} pages · ${sections.length} color-coded sections</p><aside><p><strong>Using this binder.</strong> ${esc(guide.resources)} Each section has its own tab color on the page edge; section numbers and titles still work when printed without color.</p><p>AI-generated study material: verify details and tournament clarifications against the 2027 event rules. Diagrams are drawn from the text as labeled schematics. Photographs are unmodified Wikimedia Commons files credited beside each use.</p></aside><h2>Table of contents</h2>`
        : `<h2>Table of contents <small>continued</small></h2>`;
    return `<section class="page toc" id="page-${page + 1}"><div class="toc-body">${intro}<div class="toc-columns"><div>${columns[page * 2].join('')}</div><div>${columns[page * 2 + 1].join('')}</div></div></div><footer>CONTENTS<span>${page + 1} / ${total}</span></footer></section>`;
  }).join('');

  const pages = binder.pages
    .map((p, i) => {
      const number = toc + 1 + i,
        s = sectionFor(number),
        upload = p.imageIndex >= 0 ? binder.images[p.imageIndex] : null;
      const figure = upload
        ? `<figure><img src="data:${upload.mime};base64,${upload.data}" alt="${esc(p.imageCaption)}"/><figcaption>${esc(p.imageCaption)} <em>Uploaded by the binder’s author.</em></figcaption></figure>`
        : p.photo
          ? `<figure><img src="${esc(p.photo.src)}" alt="${esc(p.photo.title)}" loading="lazy" referrerpolicy="no-referrer"/><figcaption><strong>${esc(p.photo.title)}</strong> <em>${esc(p.photo.author)} · ${esc(p.photo.license)} · <a href="${esc(p.photo.source)}">Wikimedia Commons</a></em></figcaption></figure>`
          : '';
      const takeaways = p.takeaways.length
        ? `<aside class="takeaways"><strong>Know this cold</strong><ul>${p.takeaways.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></aside>`
        : '';
      const table = p.table.rows.length
        ? `<table><thead><tr>${p.table.headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${p.table.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`
        : '';
      return `<section class="page" id="page-${number}" style="--section:${s.color}"><div class="tab" style="top:${(0.4 + s.index * tabHeight).toFixed(2)}in;height:${tabHeight.toFixed(2)}in">${s.index + 1}</div><div class="page-body"><div class="fit"><header><span>${s.index + 1} · ${esc(s.title)}</span><a href="#page-1">Contents ↑</a></header><h2>${esc(p.heading)}</h2><div class="prose">${p.paragraphs.map((t) => `<p>${esc(t)}</p>`).join('')}</div>${table}<figure class="diagram">${binderDiagramSvg(p.diagram, s.index)}<figcaption><strong>${esc(p.diagram.title)}.</strong> ${esc(p.diagram.caption)}</figcaption></figure>${figure || takeaways ? `<div class="extras${figure && takeaways ? '' : ' solo'}">${figure}${takeaways}</div>` : ''}<p class="sources">Sources: ${p.sources.map(esc).join(' · ')}</p></div></div><footer>${esc(s.title)}<span>${number} / ${total}</span></footer></section>`;
    })
    .join('');
  const nav = `<nav aria-label="Color-coded sections"><a href="#page-1">Contents</a>${sections.map((s) => `<a style="--section:${s.color}" href="#page-${s.start}">${s.index + 1}. ${esc(s.title)}</a>`).join('')}</nav>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta http-equiv="Content-Security-Policy" content="default-src 'none';img-src data: https://upload.wikimedia.org https://thumb.wikimedia.org;style-src 'unsafe-inline'"/><title>${esc(binder.title)}</title><style>
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#e9edf2;color:${ink};font-family:Arial,Helvetica,sans-serif}
nav{display:flex;gap:6px;flex-wrap:wrap;max-width:8.5in;margin:16px auto;padding:0 12px}nav a{--section:#405266;background:var(--section);color:#fff;padding:8px 12px;border-radius:7px 7px 0 0;font-size:12px;font-weight:700;text-decoration:none}a:focus-visible{outline:3px solid #2563a6;outline-offset:3px}
.page{--section:#405266;position:relative;width:8.5in;height:11in;padding:.42in .62in .4in .5in;background:#fff;margin:0 auto 18px;border-right:.12in solid var(--section);break-after:page;contain:layout paint;overflow:hidden}.page:last-child{break-after:auto;margin-bottom:0}
.tab{position:absolute;right:0;width:.36in;display:grid;place-items:center;background:var(--section);color:#fff;font-weight:700;font-size:13pt;border-radius:8px 0 0 8px}
.page-body{height:9.72in;font-size:10pt;line-height:1.42;overflow-wrap:anywhere}
header{display:flex;justify-content:space-between;gap:16px;font-size:9pt;padding-bottom:7px;border-bottom:2.5px solid var(--section);color:var(--section);font-weight:700}header a{color:inherit;white-space:nowrap}
h1{font-size:26pt;line-height:1.1;margin:8px 0 8px;letter-spacing:-.5px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}h2{font-size:1.75em;line-height:1.15;margin:.7em 0 .55em;color:var(--section)}p{margin:0 0 .75em}
.prose{columns:2;column-gap:22px;text-align:left}.prose p{break-inside:avoid}
table{border-collapse:collapse;width:100%;table-layout:fixed;font-size:.88em;margin:.4em 0 .9em}th,td{padding:4px 6px;border:1px solid #cbd5df;vertical-align:top;text-align:left}th{background:var(--section);color:#fff}tr:nth-child(even){background:#f5f8fa}
figure{margin:0}figcaption{font-size:.8em;line-height:1.35;margin-top:5px;color:#33485c}figcaption em{color:${muted}}figcaption a{color:inherit}
.diagram{margin:.3em 0 .8em;border:1px solid #d5dde5;border-radius:6px;padding:8px 8px 6px;background:#fbfcfd}.diagram svg{display:block;width:100%;height:auto}
.extras{display:grid;grid-template-columns:2.7in 1fr;gap:16px;align-items:start;margin-bottom:.6em}.extras.solo,.extras:has(.missing){grid-template-columns:1fr}.extras.solo figure{display:grid;grid-template-columns:2.7in 1fr;gap:14px;align-items:center}.extras img{display:block;width:100%;height:1.6in;object-fit:contain;background:#f1f4f7;border-radius:5px}.missing{display:none!important}
.takeaways{border-left:5px solid var(--section);background:color-mix(in srgb,var(--section) 9%,#fff);padding:9px 12px;border-radius:0 6px 6px 0;font-size:.93em}.takeaways strong{color:var(--section);text-transform:uppercase;letter-spacing:.6px;font-size:.85em}.takeaways ul{margin:5px 0 0;padding-left:1.15em}.takeaways li{margin-bottom:3px}
.sources{font-size:.74em;color:${muted};margin:0}
footer{position:absolute;left:.5in;right:.62in;bottom:.22in;display:flex;justify-content:space-between;gap:20px;font-size:8pt;border-top:1px solid #cbd5df;padding-top:7px;color:${muted}}
.toc{border-right-color:#405266}.toc-body{height:9.72in;overflow:hidden}.toc h2{font-size:15pt;margin:10px 0 8px;color:${ink}}.toc h2 small{font-size:9pt;color:${muted};font-weight:400}.eyebrow{font-size:9pt;letter-spacing:2px;color:${muted};margin:0}.subtitle{color:${muted};text-transform:capitalize;margin:0 0 10px}
.toc aside{background:#f1f5f9;padding:10px 14px;font-size:8.2pt;line-height:1.45;border-radius:6px;columns:2;column-gap:20px}.toc aside p{margin:0 0 4px;break-inside:avoid}
.toc-columns{display:grid;grid-template-columns:1fr 1fr;gap:24px}.toc-columns a{display:flex;align-items:center;gap:8px;height:13pt;color:${ink};text-decoration:none;font-size:8.4pt;line-height:13pt}.toc-columns span{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.toc-columns i{font-style:normal;color:${muted};font-variant-numeric:tabular-nums}
.toc-columns .toc-section{height:26pt;padding-top:6pt;font-size:9.4pt;font-weight:700;color:var(--section);border-bottom:1.5px solid var(--section)}.toc-section b{display:grid;place-items:center;min-width:17pt;height:15pt;border-radius:4px;background:var(--section);color:#fff;font-size:8.5pt}.toc-section i{color:var(--section)}.toc-topic{padding-left:25pt;border-bottom:1px dotted #d5dde5}
@page{size:letter;margin:0}@media print{html{scroll-behavior:auto}body{background:#fff}nav{display:none}.page{margin:0;print-color-adjust:exact;-webkit-print-color-adjust:exact}a{color:inherit;text-decoration:none}}
</style></head><body>${nav}${tocPages}${pages}</body></html>`;
}

// Runs in the preview frame. Every page keeps its full content: text steps down in size first,
// then the page content is scaled as a whole, so nothing is clipped or dropped.
export async function fitBinderDocument(doc: Document): Promise<boolean> {
  for (const image of Array.from(doc.images)) {
    const drop = () => image.closest('figure')?.classList.add('missing');
    image.addEventListener('error', drop);
    if (image.src.startsWith('data:') && image.complete && !image.naturalWidth) drop();
  }
  let fits = true,
    count = 0;
  for (const body of Array.from(doc.querySelectorAll<HTMLElement>('.page-body'))) {
    const inner = body.firstElementChild as HTMLElement;
    const over = () => body.scrollHeight > body.clientHeight + 1;
    for (let size = 10; over() && size >= 8.6; size -= 0.35)
      body.style.fontSize = `${size.toFixed(2)}pt`;
    for (let zoom = 0.96; over() && zoom >= 0.5; zoom -= 0.04)
      inner.style.setProperty('zoom', zoom.toFixed(2));
    if (over()) fits = false;
    if (++count % 25 === 0) await new Promise((resolve) => setTimeout(resolve));
  }
  return fits;
}
