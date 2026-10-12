import { eventsForDivision } from './events.ts';
import { eventToolIds } from './event-rules.ts';
import { AppError, type Profile } from './domain.ts';
import type {
  BinderDiagram,
  BinderDiagramKind,
  BinderInput,
  BinderPage,
  BinderPlan,
} from './binder-types.ts';

export const binderEvents = eventsForDivision('C').filter((e) =>
  eventToolIds('C', e).includes('binder-generator'),
);
export const binderRecommendations: Record<
  string,
  { min: number; max: number; suggested: number; reason: string; resources: string }
> = {
  astronomy: {
    min: 50,
    max: 250,
    suggested: 100,
    reason:
      'Stellar evolution, galaxies, named objects, spectra, and worked calculations benefit from an extensive illustrated reference.',
    resources:
      'Two binders, two computers/tablets, or one of each; digital resources must work offline.',
  },
  'circuit-lab': {
    min: 10,
    max: 60,
    suggested: 40,
    reason:
      'A focused syllabus of circuit principles, components, equations, and hands-on measurement is suited to a compact reference.',
    resources: 'Paper notes and resources of any size; pages may be separated during the event.',
  },
  'dynamic-planet': {
    min: 50,
    max: 400,
    suggested: 150,
    reason:
      'The freshwater syllabus spans hydrology, watersheds, streams, lakes, groundwater, water quality, and data interpretation.',
    resources:
      'One binder of any size; keep materials attached during rotating laboratory stations.',
  },
  'remote-sensing': {
    min: 50,
    max: 250,
    suggested: 100,
    reason:
      'Sensor physics, specified instruments, climate processes, and image interpretation need worked examples and annotated figures.',
    resources:
      'One three-ring binder; keep materials attached during rotating laboratory stations.',
  },
  'rocks-and-minerals': {
    min: 50,
    max: 400,
    suggested: 180,
    reason:
      'The official specimen list, diagnostic comparisons, mineral properties, rock formation, and geologic interpretation require broad coverage.',
    resources:
      'One three-ring binder, a commercial field guide, and one annotated official list; samples are prohibited.',
  },
  thermodynamics: {
    min: 10,
    max: 60,
    suggested: 40,
    reason:
      'A compact handbook can cover thermal laws, calculations, heat transfer, device constraints, and experimental analysis.',
    resources: 'Paper notes and resources of any size; pages may be separated during the event.',
  },
};
export function binderEvent(id: unknown) {
  const event = binderEvents.find((e) => e.id === id);
  if (!event)
    throw new AppError(400, 'Choose a Division C event with a Notes / Binder Generator tab.');
  return event;
}
export function requireBinderStudent(profile: Profile) {
  if (profile.role !== 'student' || profile.division !== 'C')
    throw new AppError(
      403,
      'Only Division C students can generate binders. All signed-in members can read the library.',
    );
}
export function record(v: unknown): Record<string, unknown> {
  if (!v || typeof v !== 'object' || Array.isArray(v)) throw new Error('Invalid object');
  return v as Record<string, unknown>;
}
export function text(v: unknown, max: number, empty = false) {
  if (typeof v !== 'string' || v.length > max || (!empty && !v.trim()))
    throw new Error('Invalid text');
  return v.trim();
}
function array(v: unknown, min: number, max: number): unknown[] {
  if (!Array.isArray(v) || v.length < min || v.length > max) throw new Error('Invalid list');
  return v;
}
export function parseBinderInput(value: unknown): BinderInput {
  try {
    const v = record(value),
      event = binderEvent(v.eventId);
    if (!Number.isInteger(v.pageCount) || Number(v.pageCount) < 10 || Number(v.pageCount) > 400)
      throw new Error('Invalid page count');
    if (!['regional', 'state', 'national'].includes(String(v.level)))
      throw new Error('Invalid level');
    let total = 0;
    const uploads = array(v.uploads, 0, 6).map((item) => {
      const u = record(item),
        name = text(u.name, 120),
        mime = text(u.mime, 40),
        data = text(u.data, 2_700_000);
      if (
        !['image/png', 'image/jpeg', 'image/webp', 'application/pdf'].includes(mime) ||
        !/^[A-Za-z0-9+/]+={0,2}$/.test(data) ||
        data.length % 4
      )
        throw new Error('Invalid file');
      const bytes = Buffer.from(data, 'base64');
      total += bytes.length;
      if (!bytes.length || bytes.length > 2_000_000 || bytes.toString('base64') !== data)
        throw new Error('Invalid size');
      if (mime === 'application/pdf' && bytes.toString('ascii', 0, 5) !== '%PDF-')
        throw new Error('Invalid PDF');
      if (mime === 'image/png' && bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a')
        throw new Error('Invalid PNG');
      if (mime === 'image/jpeg' && bytes.subarray(0, 3).toString('hex') !== 'ffd8ff')
        throw new Error('Invalid JPEG');
      if (
        mime === 'image/webp' &&
        (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP')
      )
        throw new Error('Invalid WebP');
      return { name, mime, data };
    });
    if (total > 3_000_000) throw new Error('Files too large');
    return {
      eventId: event.id,
      title: text(v.title, 100, true) || `${event.name} study binder`,
      level: v.level as BinderInput['level'],
      pageCount: Number(v.pageCount),
      notes: text(v.notes, 6000, true),
      uploads,
    };
  } catch (e) {
    if (e instanceof AppError) throw e;
    throw new AppError(
      400,
      'Choose 10–400 whole pages. Use up to 6 PDFs, PNGs, JPEGs, or WebP images, 2 MB per file and 3 MB total.',
    );
  }
}

// The contents pages list every topic, so their number grows with the binder. Rows are counted
// for the worst case (a two-row heading per section, plus one row lost at a column break) so page
// numbers are fixed before the outline exists.
export const BINDER_BATCH = 4;
export const binderTocRows = { first: 28, rest: 49 };
export const binderSectionLimit = (contentPages: number) =>
  Math.min(16, Math.max(3, Math.round(contentPages / 6)));
export function binderTocPages(pageCount: number) {
  let pages = 1;
  while (
    2 * binderTocRows.first + 2 * binderTocRows.rest * (pages - 1) <
    pageCount - pages + 3 * binderSectionLimit(pageCount - pages)
  )
    pages++;
  return pages;
}
export const binderContentPages = (pageCount: number) => pageCount - binderTocPages(pageCount);
export const binderTopics = (plan: BinderPlan) => plan.sections.flatMap((s) => s.topics);
export const binderPlanReady = (plan: BinderPlan) =>
  plan.sections.length > 0 && plan.sections.every((s) => s.topics.length === s.pages);

// Model text is trimmed to fit rather than rejected: one long sentence should not cost a batch.
function clip(v: unknown, max: number) {
  if (typeof v !== 'string') return '';
  const s = v.replace(/\s+/g, ' ').trim();
  return s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s;
}
const list = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const fields = (v: unknown): Record<string, unknown> =>
  v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : {};

export function parseBinderOutline(value: unknown, count: number): BinderPlan {
  const seen = new Set<string>();
  const raw = list(fields(value).sections)
    .map((item) => {
      const s = fields(item);
      const weight = typeof s.pages === 'number' && s.pages > 0 ? s.pages : 1;
      return { title: clip(s.title, 65), focus: clip(s.focus, 300), weight };
    })
    .filter((s) => s.title && !seen.has(s.title.toLowerCase()) && seen.add(s.title.toLowerCase()))
    .slice(0, binderSectionLimit(count));
  if (raw.length < 3) throw new Error('Incomplete outline');
  // Share the pages by weight, at least one each, landing on exactly `count`.
  const total = raw.reduce((n, s) => n + s.weight, 0);
  const pages = raw.map((s) => Math.max(1, Math.floor((s.weight / total) * count)));
  const order = raw.map((_, i) => i).sort((a, b) => raw[b].weight - raw[a].weight);
  for (let i = 0, sum = pages.reduce((a, b) => a + b, 0); sum !== count; i++) {
    const target = order[i % order.length];
    if (sum < count) (pages[target]++, sum++);
    else if (pages[target] > 1) (pages[target]--, sum--);
  }
  return {
    sections: raw.map((s, i) => ({ title: s.title, focus: s.focus, pages: pages[i], topics: [] })),
  };
}
export function mergeBinderTopics(plan: BinderPlan, index: number, value: unknown) {
  const used = new Set(binderTopics(plan).map((t) => t.toLowerCase()));
  const section = plan.sections[index];
  const topics = [...section.topics];
  for (const item of list(fields(value).topics)) {
    const topic = clip(item, 110);
    if (topics.length === section.pages) break;
    if (!topic || used.has(topic.toLowerCase())) continue;
    used.add(topic.toLowerCase());
    topics.push(topic);
  }
  return {
    added: topics.length - section.topics.length,
    plan: { sections: plan.sections.map((s, i) => (i === index ? { ...s, topics } : s)) },
  };
}

export const binderDiagramKinds: BinderDiagramKind[] = [
  'flow',
  'cycle',
  'layers',
  'compare',
  'scale',
  'plot',
];
function parseDiagram(value: unknown): BinderDiagram {
  const d = fields(value);
  const items = list(d.items)
    .map((item) => ({
      label: clip(fields(item).label, 34),
      detail: clip(fields(item).detail, 110),
    }))
    .filter((item) => item.label)
    .slice(0, 6);
  const series = list(d.series)
    .map((item) => ({
      name: clip(fields(item).name, 30),
      points: list(fields(item).points)
        .map((p) => ({ x: Number(fields(p).x), y: Number(fields(p).y) }))
        .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y))
        .slice(0, 14),
    }))
    .filter((s) => s.points.length > 1)
    .slice(0, 3);
  let kind = binderDiagramKinds.includes(d.kind as BinderDiagramKind)
    ? (d.kind as BinderDiagramKind)
    : 'flow';
  // A plot without usable data, or a cycle of two, still has labels worth drawing.
  if (kind === 'plot' && !series.length) kind = 'flow';
  if (kind === 'cycle' && items.length < 3) kind = 'flow';
  if (kind !== 'plot' && items.length < 2) throw new Error('Diagram needs labels');
  return {
    kind,
    title: clip(d.title, 90) || 'Labeled diagram',
    caption: clip(d.caption, 220),
    items,
    xLabel: clip(d.xLabel, 50),
    yLabel: clip(d.yLabel, 50),
    series: kind === 'plot' ? series : [],
  };
}
export function parseBinderPage(value: unknown, heading: string, imageCount: number): BinderPage {
  const p = fields(value);
  const paragraphs = list(p.paragraphs)
    .map((v) => clip(v, 900))
    .filter(Boolean)
    .slice(0, 7);
  const length = () => paragraphs.reduce((n, t) => n + t.length, 0);
  while (paragraphs.length > 2 && length() > 3300) paragraphs.pop();
  if (paragraphs.length < 2 || length() < 1200) throw new Error('Page is too thin to study from');
  const table = fields(p.table);
  const headers = list(table.headers)
    .map((v) => clip(v, 45))
    .filter(Boolean)
    .slice(0, 4);
  const rows =
    headers.length < 2
      ? []
      : list(table.rows)
          .map((r) => headers.map((_, i) => clip(list(r)[i], 120)))
          .filter((r) => r.some(Boolean))
          .slice(0, 6);
  const imageIndex =
    Number.isInteger(p.imageIndex) && Number(p.imageIndex) >= 0 && Number(p.imageIndex) < imageCount
      ? Number(p.imageIndex)
      : -1;
  const sources = list(p.sources)
    .map((v) => clip(v, 160))
    .filter(Boolean)
    .slice(0, 4);
  return {
    heading,
    paragraphs,
    takeaways: list(p.takeaways)
      .map((v) => clip(v, 150))
      .filter(Boolean)
      .slice(0, 4),
    table: { headers: rows.length ? headers : [], rows },
    diagram: parseDiagram(p.diagram),
    imageIndex,
    imageCaption: imageIndex < 0 ? '' : clip(p.imageCaption, 180) || 'Uploaded reference image',
    photoQuery: clip(p.photoQuery, 80)
      .replace(/[^\p{L}\p{N} .,'()+-]/gu, ' ')
      .trim(),
    photo: null,
    sources: sources.length ? sources : ['General scientific background'],
  };
}
