import { AppError, type Profile } from './domain.ts';
import { eventsForDivision } from './events.ts';
import { eventToolIds } from './event-rules.ts';
import type { SheetContent, SheetDivision, SheetInput, SheetUpload } from './cheatsheet-types.ts';

const eventsWithSheets = (division: SheetDivision) =>
  eventsForDivision(division).filter((e) =>
    eventToolIds(division, e).includes('cheatsheet-generator'),
  );
export const sheetEventsByDivision: Record<SheetDivision, ReturnType<typeof eventsWithSheets>> = {
  B: eventsWithSheets('B'),
  C: eventsWithSheets('C'),
};
export const sheetEvents = sheetEventsByDivision.C;
/** Cheat sheets are written per division: each division has its own rules and shared library. */
export function requireSheetStudent(profile: Profile): SheetDivision {
  if (profile.role !== 'student' || (profile.division !== 'B' && profile.division !== 'C'))
    throw new AppError(403, 'Cheat sheets are available to Division B and C students.');
  return profile.division;
}
export function sheetEvent(id: unknown, division: SheetDivision = 'C') {
  const event = sheetEventsByDivision[division].find((e) => e.id === id);
  if (!event)
    throw new AppError(400, `Choose a Division ${division} event with a cheat sheet generator.`);
  return event;
}
function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new Error('Invalid object');
  return value as Record<string, unknown>;
}
function text(value: unknown, limit: number, empty = false): string {
  if (typeof value !== 'string' || value.length > limit || (!empty && !value.trim()))
    throw new Error('Invalid text');
  return value.trim();
}
export function parseSheetInput(value: unknown, division: SheetDivision = 'C'): SheetInput {
  try {
    const v = record(value);
    const event = sheetEvent(v.eventId, division);
    if (!['regional', 'state', 'national'].includes(String(v.level)))
      throw new Error('Invalid level');
    if (!Array.isArray(v.uploads) || v.uploads.length > 4) throw new Error('Invalid uploads');
    let total = 0;
    const uploads: SheetUpload[] = v.uploads.map((item) => {
      const u = record(item);
      const name = text(u.name, 120);
      const mime = text(u.mime, 40);
      const data = text(u.data, 1_300_000);
      if (
        ![
          'image/png',
          'image/jpeg',
          'image/webp',
          'application/pdf',
          'text/plain',
          'text/csv',
        ].includes(mime)
      )
        throw new Error('Unsupported file');
      if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(data))
        throw new Error('Invalid file encoding');
      const bytes = Buffer.from(data, 'base64');
      total += bytes.length;
      if (bytes.length === 0 || bytes.length > (mime.startsWith('text/') ? 100_000 : 900_000))
        throw new Error('File too large');
      if (mime === 'image/png' && bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a')
        throw new Error('Invalid PNG');
      if (mime === 'image/jpeg' && bytes.subarray(0, 3).toString('hex') !== 'ffd8ff')
        throw new Error('Invalid JPEG');
      if (
        mime === 'image/webp' &&
        (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP')
      )
        throw new Error('Invalid WebP');
      if (mime === 'application/pdf' && bytes.toString('ascii', 0, 5) !== '%PDF-')
        throw new Error('Invalid PDF');
      return { name, mime, data };
    });
    if (total > 2_000_000) throw new Error('Uploads too large');
    return {
      eventId: event.id,
      division,
      title: text(v.title, 100, true) || `${event.name} reference`,
      level: v.level as SheetInput['level'],
      notes: text(v.notes, 6000, true),
      exclusions: text(v.exclusions, 4000, true),
      uploads,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      400,
      'Check your text and uploads. Use up to 4 PNG, JPEG, WebP, PDF, TXT or CSV files, under 900 KB each (100 KB for text) and 2 MB total.',
    );
  }
}

// Reconstruct the entire model result: no generated HTML, URLs, styles, or scripts are trusted.
// Figure ids are choices from a fixed catalog: unknown or repeated ids are dropped, not fatal.
export function parseSheetContent(
  value: unknown,
  figureIds: ReadonlySet<string> = new Set(),
): SheetContent {
  const v = record(value);
  const used = new Set<string>();
  if (!Array.isArray(v.sections) || v.sections.length < 12 || v.sections.length > 32)
    throw new Error('Expected 12–32 compact sections');
  const sections = v.sections.map((item) => {
    const s = record(item);
    if (!Array.isArray(s.facts) || s.facts.length > 20) throw new Error('Invalid facts');
    const table = record(s.table);
    if (
      !Array.isArray(table.headers) ||
      table.headers.length > 5 ||
      !Array.isArray(table.rows) ||
      table.rows.length > 20
    )
      throw new Error('Invalid table');
    const headers = table.headers.map((h) => text(h, 50));
    const rows = table.rows.map((row) => {
      if (!Array.isArray(row) || row.length !== headers.length || !row.length)
        throw new Error('Invalid row');
      return row.map((c) => text(c, 200, true));
    });
    if (!Array.isArray(s.diagrams) || s.diagrams.length > 1) throw new Error('Invalid diagram');
    const diagrams = s.diagrams.map((item) => {
      const d = record(item);
      if (
        !Array.isArray(d.nodes) ||
        d.nodes.length < 2 ||
        d.nodes.length > 10 ||
        !Array.isArray(d.edges) ||
        d.edges.length > 15
      )
        throw new Error('Invalid diagram nodes');
      const nodes = d.nodes.map((item) => {
        const n = record(item);
        if (
          typeof n.x !== 'number' ||
          typeof n.y !== 'number' ||
          !Number.isFinite(n.x) ||
          !Number.isFinite(n.y) ||
          n.x < 15 ||
          n.x > 85 ||
          n.y < 10 ||
          n.y > 90
        )
          throw new Error('Invalid diagram coordinates');
        return { label: text(n.label, 28), x: n.x, y: n.y };
      });
      const edges = d.edges.map((item) => {
        const e = record(item);
        if (
          !Number.isInteger(e.from) ||
          !Number.isInteger(e.to) ||
          Number(e.from) < 0 ||
          Number(e.to) < 0 ||
          Number(e.from) >= nodes.length ||
          Number(e.to) >= nodes.length
        )
          throw new Error('Invalid diagram edge');
        return { from: Number(e.from), to: Number(e.to), label: text(e.label, 20, true) };
      });
      return { title: text(d.title, 90), nodes, edges };
    });
    const facts = s.facts.map((f) => text(f, 800));
    const figures: string[] = [];
    for (const id of Array.isArray(s.figures) ? s.figures : []) {
      if (typeof id !== 'string' || !figureIds.has(id) || used.has(id)) continue;
      if (figures.length === 2 || used.size === 8) break;
      used.add(id);
      figures.push(id);
    }
    if (!facts.length && !rows.length && !diagrams.length && !figures.length)
      throw new Error('Empty section');
    return { heading: text(s.heading, 80), facts, table: { headers, rows }, diagrams, figures };
  });
  const length = sections.reduce(
    (n, s) => n + s.facts.join(' ').length + s.table.rows.flat().join(' ').length,
    0,
  );
  if (length < 8000 || length > 32000) throw new Error('Sheet density outside bounds');
  const diagrams = sections.reduce((n, s) => n + s.diagrams.length, 0);
  if (diagrams < 2 || diagrams > 6) throw new Error('Expected 2–6 diagrams');
  return { sections };
}
