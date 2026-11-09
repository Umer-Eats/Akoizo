// Notebook pages are stored as a small, allowlisted subset of HTML. The same sanitizer runs in
// the editor (on paste and before saving) and on the server (before storing), so a page can
// only ever hold the tags and attributes below. It needs no DOM, so it works in both places.

export const highlightColors = ['yellow', 'green', 'blue', 'pink', 'orange'] as const;
export type HighlightColor = (typeof highlightColors)[number];
export const calloutKinds = ['key', 'tip', 'warn', 'question'] as const;
export const imageSizes = ['s', 'm', 'l', 'full'] as const;

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
export const isImageId = (id: string) => uuid.test(id);

// Tags kept as written, or renamed to the one form the notebook uses.
const rename: Record<string, string> = {
  p: 'p',
  div: 'p',
  br: 'br',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h3',
  h5: 'h3',
  h6: 'h3',
  strong: 'strong',
  b: 'strong',
  em: 'em',
  i: 'em',
  u: 'u',
  s: 's',
  strike: 's',
  del: 's',
  mark: 'mark',
  code: 'code',
  pre: 'pre',
  blockquote: 'blockquote',
  ul: 'ul',
  ol: 'ol',
  li: 'li',
  a: 'a',
  img: 'img',
  hr: 'hr',
  sub: 'sub',
  sup: 'sup',
  table: 'table',
  thead: 'thead',
  tbody: 'tbody',
  tr: 'tr',
  th: 'th',
  td: 'td',
};
const voids = new Set(['br', 'img', 'hr']);
// Elements whose content is code, styling or embedded documents: dropped whole.
const dropWithContent = new Set([
  'script',
  'style',
  'iframe',
  'object',
  'embed',
  'template',
  'noscript',
  'textarea',
  'title',
  'head',
  'svg',
  'math',
  'select',
  'xmp',
  'noembed',
  'noframes',
  'frameset',
  'video',
  'audio',
  'canvas',
]);

const safeChar = (code: number) =>
  code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff)
    ? String.fromCodePoint(code)
    : '';
export const decodeEntities = (value: string) =>
  value
    .replace(/&#(\d{1,7});/g, (_, n) => safeChar(Number(n)))
    .replace(/&#x([0-9a-f]{1,6});/gi, (_, n) => safeChar(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

function safeHref(raw: string) {
  // Browsers ignore tabs, newlines and control characters inside a scheme ("java\nscript:").
  const value = raw.replace(/[\u0000- \u007f-\u009f]/g, '');
  if (/^(https?:|mailto:)/i.test(value)) return value;
  if (/^\/(?!\/)/.test(value) || value.startsWith('#')) return value;
  return null;
}

function attributes(source: string) {
  const found: Record<string, string> = {};
  const pattern = /([^\s"'=<>`/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of source.matchAll(pattern)) {
    const name = match[1].toLowerCase();
    if (name in found) continue;
    found[name] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return found;
}

function keptAttributes(tag: string, raw: Record<string, string>) {
  const kept: [string, string][] = [];
  if (tag === 'a') {
    const title = raw['data-wikilink']?.replace(/\s+/g, ' ').trim().slice(0, 120);
    if (title) kept.push(['data-wikilink', title]);
    else {
      const href = raw.href ? safeHref(raw.href) : null;
      if (href) {
        kept.push(['href', href]);
        if (/^https?:/i.test(href)) {
          kept.push(['target', '_blank']);
          kept.push(['rel', 'noopener noreferrer']);
        }
      }
    }
  }
  if (tag === 'mark') {
    const color = raw['data-color'];
    kept.push([
      'data-color',
      (highlightColors as readonly string[]).includes(color) ? color : 'yellow',
    ]);
  }
  if (tag === 'img') {
    kept.push(['data-img', raw['data-img']]);
    const size = raw['data-size'];
    if ((imageSizes as readonly string[]).includes(size)) kept.push(['data-size', size]);
    if (raw.alt) kept.push(['alt', raw.alt.slice(0, 200)]);
  }
  if (tag === 'ul' && raw['data-checklist'] === 'true') kept.push(['data-checklist', 'true']);
  if (tag === 'li' && (raw['data-checked'] === 'true' || raw['data-checked'] === 'false'))
    kept.push(['data-checked', raw['data-checked']]);
  if (tag === 'blockquote' && (calloutKinds as readonly string[]).includes(raw['data-callout']))
    kept.push(['data-callout', raw['data-callout']]);
  if (tag === 'ol' && /^\d{1,4}$/.test(raw.start ?? '')) kept.push(['start', raw.start]);
  if ((tag === 'td' || tag === 'th') && /^\d{1,2}$/.test(raw.colspan ?? ''))
    kept.push(['colspan', raw.colspan]);
  if ((tag === 'td' || tag === 'th') && /^\d{1,2}$/.test(raw.rowspan ?? ''))
    kept.push(['rowspan', raw.rowspan]);
  return kept.map(([name, value]) => ` ${name}="${escapeHtml(value)}"`).join('');
}

/** Returns page HTML that holds only the notebook's own tags and attributes. */
export function sanitizeNoteHtml(html: string) {
  const source = String(html ?? '').replace(/\u0000/g, '');
  const tagPattern = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)([^>]*)>/y;
  let out = '';
  let i = 0;
  while (i < source.length) {
    const lt = source.indexOf('<', i);
    if (lt === -1) {
      out += source.slice(i);
      break;
    }
    out += source.slice(i, lt);
    if (source.startsWith('<!--', lt)) {
      const end = source.indexOf('-->', lt + 4);
      i = end === -1 ? source.length : end + 3;
      continue;
    }
    if (source[lt + 1] === '!' || source[lt + 1] === '?') {
      const end = source.indexOf('>', lt);
      i = end === -1 ? source.length : end + 1;
      continue;
    }
    tagPattern.lastIndex = lt;
    const match = tagPattern.exec(source);
    if (!match) {
      out += '&lt;';
      i = lt + 1;
      continue;
    }
    i = tagPattern.lastIndex;
    const closing = match[1] === '/';
    const name = match[2].toLowerCase();
    if (dropWithContent.has(name)) {
      if (closing || /\/\s*$/.test(match[3])) continue;
      const end = source.toLowerCase().indexOf(`</${name}`, i);
      if (end === -1) break;
      const close = source.indexOf('>', end);
      i = close === -1 ? source.length : close + 1;
      continue;
    }
    const tag = rename[name];
    if (!tag) continue;
    if (closing) {
      if (!voids.has(tag)) out += `</${tag}>`;
      continue;
    }
    const raw = attributes(match[3]);
    if (tag === 'img' && !isImageId(raw['data-img'] ?? '')) continue;
    out += `<${tag}${keptAttributes(tag, raw)}>`;
  }
  return out;
}

const blockEnd = /<\/(p|h1|h2|h3|li|blockquote|pre|tr)>|<br\s*\/?>|<hr\s*\/?>/gi;
/** Plain text of a page, one line per block, for search, word counts and excerpts. */
export function noteText(html: string) {
  return decodeEntities(
    String(html ?? '')
      .replace(blockEnd, '\n')
      .replace(/<\/t[dh]>/gi, ' ')
      .replace(/<[^>]*>/g, ''),
  )
    .replace(/ /g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n')
    .trim();
}

export const wordCount = (text: string) =>
  (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []).length;

const normal = (title: string) => title.replace(/\s+/g, ' ').trim().toLowerCase();
export const sameTitle = (a: string, b: string) => normal(a) === normal(b);

/** Titles this page links to with [[wikilinks]], in order of first appearance. */
export function noteLinks(html: string) {
  const titles: string[] = [];
  const add = (title: string) => {
    const clean = title.replace(/\s+/g, ' ').trim().slice(0, 120);
    if (clean && !titles.some((t) => sameTitle(t, clean))) titles.push(clean);
  };
  for (const match of String(html ?? '').matchAll(/data-wikilink="([^"]*)"/g))
    add(decodeEntities(match[1]));
  for (const match of noteText(html).matchAll(/\[\[([^[\]\n]{1,120})\]\]/g)) add(match[1]);
  return titles.slice(0, 100);
}

/** #tags written anywhere in the page text. */
export function noteTags(text: string) {
  const tags = new Set<string>();
  for (const match of text.matchAll(/(?:^|[\s(])#([a-z][\w-]{1,39})\b/gi))
    tags.add(match[1].toLowerCase());
  return [...tags].slice(0, 30);
}

/** Image ids a page shows, so their data can be fetched when it opens. */
export function noteImageIds(html: string) {
  const ids = new Set<string>();
  for (const match of String(html ?? '').matchAll(/data-img="([^"]+)"/g))
    if (isImageId(match[1])) ids.add(match[1]);
  return [...ids];
}

/** Headings in order, for the outline panel. */
export function noteHeadings(html: string) {
  return [...String(html ?? '').matchAll(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map((match) => ({ level: Number(match[1]), text: noteText(match[2]) }))
    .filter((heading) => heading.text);
}

/** Rewrites [[Old]] links to [[New]] after a page is renamed. */
export function renameLinks(html: string, from: string, to: string) {
  const target = escapeHtml(to);
  return String(html ?? '').replace(
    /<a data-wikilink="([^"]*)">([\s\S]*?)<\/a>/g,
    (whole, title: string, label: string) =>
      sameTitle(decodeEntities(title), from)
        ? `<a data-wikilink="${target}">${sameTitle(noteText(label), from) ? target : label}</a>`
        : whole,
  );
}
