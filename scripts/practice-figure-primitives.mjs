// Original vector artwork for synthetic teaching cases. No external image assets.
export const esc = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
export const text = (x, y, s, size = 17, extra = '') =>
  `<text x="${x}" y="${y}" font-size="${size}" ${extra}>${esc(s)}</text>`;
export const line = (x1, y1, x2, y2, extra = '') =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${extra}/>`;
export const box = (x, y, w, h, fill = '#fff', extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
export const circle = (x, y, r, fill = '#fff', extra = '') =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
export const path = (d, extra = '') =>
  `<path d="${d}" ${/(?:^|\s)fill=/.test(extra) ? '' : 'fill="none"'} ${extra}/>`;
// Explicit arrowheads survive both browser SVG and the PDF rasterizer.
export const arrow = (x1, y1, x2, y2) => {
  const a = Math.atan2(y2 - y1, x2 - x1),
    bx = x2 - 12 * Math.cos(a),
    by = y2 - 12 * Math.sin(a);
  return (
    line(x1, y1, bx, by) +
    `<polygon points="${x2},${y2} ${bx + 5 * Math.sin(a)},${by - 5 * Math.cos(a)} ${bx - 5 * Math.sin(a)},${by + 5 * Math.cos(a)}" fill="#183946"/>`
  );
};
export function svg(title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="400" viewBox="0 0 720 400"><title>${esc(title)}</title><defs><marker id="arrow" markerWidth="9" markerHeight="9" refX="8" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#183946"/></marker></defs><rect width="720" height="400" fill="white"/><g font-family="Arial,sans-serif" fill="#142d38" stroke="#183946" stroke-width="2"><g stroke="none">${text(28, 30, title, 21, 'font-weight="bold"')}</g>${body}</g></svg>`;
}
export function label(x, y, s, size = 17) {
  return `<g stroke="none">${text(x, y, s, size)}</g>`;
}
export function chart({
  title,
  xLabel,
  yLabel,
  xMin = 0,
  xMax,
  yMin = 0,
  yMax,
  xTicks,
  yTicks,
  series,
  reverseX = false,
  logY = false,
}) {
  const scaleY = (y) => (logY ? Math.log10(y) : y);
  const X = (x) =>
      85 + (reverseX ? 1 - (x - xMin) / (xMax - xMin) : (x - xMin) / (xMax - xMin)) * 565,
    Y = (y) => 325 - ((scaleY(y) - scaleY(yMin)) / (scaleY(yMax) - scaleY(yMin))) * 245;
  let body = '';
  for (const x of xTicks)
    body += line(X(x), 80, X(x), 325, 'stroke="#d5dfe3"') + label(X(x) - 10, 348, x, 14);
  for (const y of yTicks)
    body += line(85, Y(y), 650, Y(y), 'stroke="#d5dfe3"') + label(28, Y(y) + 5, y, 14);
  body +=
    line(85, 80, 85, 325) +
    line(85, 325, 650, 325) +
    label(280, 382, xLabel, 16) +
    label(30, 58, yLabel, 16);
  const colors = ['#006c80', '#9b3f15', '#643da0'];
  series.forEach((s, i) => {
    if (!s.scatter && i === 1) {
      for (let j = 1; j < s.points.length; j++) {
        const [ax, ay] = s.points[j - 1],
          [bx, by] = s.points[j];
        const x1 = X(ax),
          y1 = Y(ay),
          dx = X(bx) - x1,
          dy = Y(by) - y1,
          length = Math.hypot(dx, dy);
        for (let at = 0; at < length; at += 13) {
          const end = Math.min(at + 8, length);
          body += line(
            x1 + (dx * at) / length,
            y1 + (dy * at) / length,
            x1 + (dx * end) / length,
            y1 + (dy * end) / length,
            `stroke="${colors[i % 3]}" stroke-width="3"`,
          );
        }
      }
    } else if (!s.scatter)
      body += path(
        s.points.map(([x, y], j) => `${j ? 'L' : 'M'}${X(x)} ${Y(y)}`).join(' '),
        `stroke="${colors[i % 3]}" stroke-width="3"`,
      );
    for (const [x, y, name] of s.points) {
      body += circle(X(x), Y(y), 4, colors[i % 3]);
      if (name) body += label(X(x) + 8, Y(y) - 9, name, 15);
    }
    body += label(420, 53 + i * 20, s.name, 15);
  });
  return svg(title, body);
}
export function table(title, headers, rows) {
  const x = 28,
    y = 65,
    w = 664,
    h = Math.min(48, 280 / (rows.length + 1)),
    cw = w / headers.length;
  let body = '';
  [headers, ...rows].forEach((row, r) =>
    row.forEach((cell, c) => {
      body +=
        box(x + c * cw, y + r * h, cw, h, r === 0 ? '#e5eff3' : 'white') +
        label(x + c * cw + 9, y + r * h + h * 0.65, cell, 16);
    }),
  );
  return svg(title, body);
}
export const written = (prompt, answer, clause, points = 2) => ({ prompt, answer, clause, points });
export const numeric = (prompt, value, units, clause, points = 2) => ({
  ...written(prompt, `${Number(value.toPrecision(8))} ${units}`.trim(), clause, points),
  numeric: {
    value,
    tolerance: Math.max(1e-10, Math.abs(value) * 0.003),
    units: units ? ['', units] : [''],
    unitRequired: false,
  },
});

export function figureBuilder(test) {
  const figures = [],
    entries = [];
  function add(title, art, description, questions) {
    const id = `F${figures.length + 1}`,
      url = `/practice/${test.id}/figures/${id}.png`;
    const figure = {
      url,
      caption: `${id}. ${title} (original synthetic teaching figure)`,
      alt: `${id}: ${title}. A text equivalent is available below.`,
      description,
    };
    figures.push({ id, url, svg: art, description });
    for (const q of questions)
      entries.push({ ...q, prompt: `Use Figure ${id}. ${q.prompt}`, figure });
  }
  return { add, figures, entries };
}
