// Server only: personal notebooks. Every query is scoped to the signed-in owner.
import { randomUUID } from 'node:crypto';
import type { Database } from './school-service.ts';
import { AppError, type Profile } from './domain.ts';
import { eventsForDivision, type Division } from './events.ts';
import { slotForEvent } from './event-slots.ts';
import { lessonsForEvent } from './lessons-registry.ts';
import {
  isImageId,
  noteLinks,
  noteTags,
  noteText,
  renameLinks,
  sanitizeNoteHtml,
  wordCount,
} from './note-html.ts';
import { eventNotePages, lessonNoteHtml } from './note-generator.ts';
import {
  noteLimits,
  notebookColors,
  type Note,
  type NoteContext,
  type NoteSearchHit,
  type NoteSource,
  type NoteSourceKind,
  type NoteSummary,
  type Notebook,
  type NotebookColor,
  type NotesIndex,
} from './note-types.ts';

type Row = Record<string, string | number | null>;
const now = () => new Date().toISOString();
const parse = <T,>(value: unknown, fallback: T): T => {
  try {
    return value ? (JSON.parse(String(value)) as T) : fallback;
  } catch {
    return fallback;
  }
};
/** One line of plain text: no markup, no control characters. */
export const plainLabel = (value: unknown, max: number) =>
  String(value ?? '')
    .replace(/[\u0000-\u001f\u007f<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
const slug = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,120}$/;
const TRASH_DAYS = 30;

function asNotebook(row: Row): Notebook {
  return {
    id: String(row.id),
    title: String(row.title),
    eventId: row.event_id ? String(row.event_id) : null,
    division: (row.division as Notebook['division']) ?? null,
    color: (notebookColors as readonly string[]).includes(String(row.color))
      ? (row.color as NotebookColor)
      : 'blue',
    sections: parse<string[]>(row.sections_json, []),
    position: Number(row.position),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}
const summaryColumns =
  'id,notebook_id,section,title,tags_json,links_json,pinned,source_json,words,substr(text,1,200) AS excerpt,position,created_at,updated_at,trashed_at';
function asSummary(row: Row): NoteSummary {
  return {
    id: String(row.id),
    notebookId: String(row.notebook_id),
    section: String(row.section ?? ''),
    title: String(row.title),
    tags: parse<string[]>(row.tags_json, []),
    links: parse<string[]>(row.links_json, []),
    pinned: Boolean(row.pinned),
    source: parse<NoteSource | null>(row.source_json, null),
    words: Number(row.words),
    excerpt: String(row.excerpt ?? '').replace(/\s+/g, ' '),
    position: Number(row.position),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    trashedAt: row.trashed_at ? String(row.trashed_at) : null,
  };
}
const asNote = (row: Row): Note => ({ ...asSummary(row), html: String(row.html) });

function derived(html: unknown) {
  const clean = sanitizeNoteHtml(String(html ?? ''));
  if (clean.length > noteLimits.html)
    throw new AppError(413, 'This page is too long. Split it into two pages.');
  const text = noteText(clean);
  return { html: clean, text, tags: noteTags(text), links: noteLinks(clean), words: wordCount(text) };
}

async function notebookRow(db: Database, profile: Profile, id: unknown) {
  if (typeof id !== 'string' || !slug.test(id)) throw new AppError(400, 'Choose a notebook.');
  const row = await db.get('SELECT * FROM notebooks WHERE id=? AND owner_id=?', id, profile.id);
  if (!row) throw new AppError(404, 'That notebook was not found.');
  return row as Row;
}
async function noteRow(db: Database, profile: Profile, id: unknown) {
  if (typeof id !== 'string' || !slug.test(id)) throw new AppError(400, 'Choose a page.');
  const row = await db.get(
    `SELECT ${summaryColumns},html FROM notes WHERE id=? AND owner_id=?`,
    id,
    profile.id,
  );
  if (!row) throw new AppError(404, 'That page was not found.');
  return row as Row;
}
export async function readNote(db: Database, profile: Profile, id: unknown) {
  return asNote(await noteRow(db, profile, id));
}
async function summary(db: Database, profile: Profile, id: string) {
  return asSummary(
    (await db.get(
      `SELECT ${summaryColumns} FROM notes WHERE id=? AND owner_id=?`,
      id,
      profile.id,
    )) as Row,
  );
}
async function count(db: Database, sql: string, ...args: (string | number)[]) {
  return Number((await db.get(sql, ...args))?.n ?? 0);
}
async function nextPosition(db: Database, table: 'notes' | 'notebooks', profile: Profile, notebookId?: string) {
  const row = await db.get(
    table === 'notes'
      ? 'SELECT MAX(position) AS p FROM notes WHERE owner_id=? AND notebook_id=?'
      : 'SELECT MAX(position) AS p FROM notebooks WHERE owner_id=?',
    profile.id,
    ...(notebookId ? [notebookId] : []),
  );
  return Number(row?.p ?? 0) + 1;
}

function lessonEvents(division: Division | null) {
  if (!division) return [];
  return eventsForDivision(division)
    .filter((event) => lessonsForEvent(event.id, division))
    .map((event) => ({ id: event.id, name: event.name }));
}

export async function listNotes(db: Database, profile: Profile): Promise<NotesIndex> {
  const cutoff = new Date(Date.now() - TRASH_DAYS * 86_400_000).toISOString();
  await db.batch(
    [
      {
        sql: 'DELETE FROM note_images WHERE owner_id=? AND note_id IN (SELECT id FROM notes WHERE owner_id=? AND trashed_at IS NOT NULL AND trashed_at<?)',
        args: [profile.id, profile.id, cutoff],
      },
      {
        sql: 'DELETE FROM notes WHERE owner_id=? AND trashed_at IS NOT NULL AND trashed_at<?',
        args: [profile.id, cutoff],
      },
    ],
    'write',
  );
  const [notebooks, notes] = await Promise.all([
    db.all('SELECT * FROM notebooks WHERE owner_id=? ORDER BY position,created_at', profile.id),
    db.all(
      `SELECT ${summaryColumns} FROM notes WHERE owner_id=? ORDER BY position,created_at`,
      profile.id,
    ),
  ]);
  return {
    notebooks: (notebooks as Row[]).map(asNotebook),
    notes: (notes as Row[]).map(asSummary),
    lessonEvents: lessonEvents(profile.division),
  };
}

export async function searchNotes(db: Database, profile: Profile, query: unknown) {
  const q = plainLabel(query, 80);
  if (q.length < 2) return [] as NoteSearchHit[];
  const like = `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
  const rows = (await db.all(
    `SELECT id,title,text FROM notes WHERE owner_id=? AND trashed_at IS NULL
      AND (title LIKE ? ESCAPE '\\' OR text LIKE ? ESCAPE '\\') ORDER BY updated_at DESC LIMIT 40`,
    profile.id,
    like,
    like,
  )) as Row[];
  return rows.map((row): NoteSearchHit => {
    const text = String(row.text).replace(/\s+/g, ' ');
    const at = text.toLowerCase().indexOf(q.toLowerCase());
    const start = Math.max(0, at - 60);
    const snippet =
      at === -1
        ? text.slice(0, 140)
        : `${start ? '…' : ''}${text.slice(start, at + q.length + 80)}${at + q.length + 80 < text.length ? '…' : ''}`;
    return { id: String(row.id), snippet };
  });
}

function color(value: unknown): NotebookColor {
  return (notebookColors as readonly string[]).includes(String(value))
    ? (value as NotebookColor)
    : 'blue';
}

export async function createNotebook(db: Database, profile: Profile, body: Record<string, unknown>) {
  const title = plainLabel(body.title, 60);
  if (!title) throw new AppError(400, 'Name your notebook.');
  if ((await count(db, 'SELECT COUNT(*) AS n FROM notebooks WHERE owner_id=?', profile.id)) >= noteLimits.notebooks)
    throw new AppError(409, `You can keep up to ${noteLimits.notebooks} notebooks.`);
  const id = randomUUID();
  const at = now();
  await db.batch(
    [
      {
        sql: 'INSERT INTO notebooks (id,owner_id,title,event_id,division,color,sections_json,position,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)',
        args: [id, profile.id, title, null, null, color(body.color), '[]', await nextPosition(db, 'notebooks', profile), at, at],
      },
    ],
    'write',
  );
  return asNotebook((await notebookRow(db, profile, id)) as Row);
}

const cleanSections = (sections: string[]) => {
  const kept: string[] = [];
  for (const section of sections) {
    const name = plainLabel(section, noteLimits.section);
    if (name && !kept.some((s) => s.toLowerCase() === name.toLowerCase())) kept.push(name);
  }
  return kept.slice(0, noteLimits.sections);
};

export async function updateNotebook(db: Database, profile: Profile, body: Record<string, unknown>) {
  const row = await notebookRow(db, profile, body.id);
  const notebook = asNotebook(row);
  let sections = notebook.sections;
  const statements: { sql: string; args: (string | number | null)[] }[] = [];
  const title = body.title === undefined ? notebook.title : plainLabel(body.title, 60);
  if (!title) throw new AppError(400, 'Name your notebook.');
  if (body.addSection !== undefined) {
    const name = plainLabel(body.addSection, noteLimits.section);
    if (!name) throw new AppError(400, 'Name the section.');
    sections = cleanSections([...sections, name]);
  }
  if (body.renameSection && typeof body.renameSection === 'object') {
    const { from, to } = body.renameSection as { from?: unknown; to?: unknown };
    const old = plainLabel(from, noteLimits.section);
    const next = plainLabel(to, noteLimits.section);
    if (!next) throw new AppError(400, 'Name the section.');
    sections = cleanSections(sections.map((s) => (s === old ? next : s)));
    statements.push({
      sql: 'UPDATE notes SET section=? WHERE owner_id=? AND notebook_id=? AND section=?',
      args: [next, profile.id, notebook.id, old],
    });
  }
  if (body.removeSection !== undefined) {
    const old = plainLabel(body.removeSection, noteLimits.section);
    sections = sections.filter((s) => s !== old);
    statements.push({
      sql: "UPDATE notes SET section='' WHERE owner_id=? AND notebook_id=? AND section=?",
      args: [profile.id, notebook.id, old],
    });
  }
  if (Array.isArray(body.sectionOrder)) {
    const order = cleanSections(body.sectionOrder.map(String)).filter((s) => sections.includes(s));
    sections = [...order, ...sections.filter((s) => !order.includes(s))];
  }
  const position = typeof body.position === 'number' && Number.isFinite(body.position) ? body.position : notebook.position;
  statements.push({
    sql: 'UPDATE notebooks SET title=?,color=?,sections_json=?,position=?,updated_at=? WHERE id=? AND owner_id=?',
    args: [
      title,
      body.color === undefined ? notebook.color : color(body.color),
      JSON.stringify(sections),
      position,
      now(),
      notebook.id,
      profile.id,
    ],
  });
  await db.batch(statements, 'write');
  return asNotebook(await notebookRow(db, profile, notebook.id));
}

export async function deleteNotebook(db: Database, profile: Profile, id: unknown) {
  const notebook = asNotebook(await notebookRow(db, profile, id));
  const at = now();
  await db.batch(
    [
      {
        sql: 'UPDATE notes SET trashed_at=COALESCE(trashed_at,?) WHERE owner_id=? AND notebook_id=?',
        args: [at, profile.id, notebook.id],
      },
      { sql: 'DELETE FROM notebooks WHERE id=? AND owner_id=?', args: [notebook.id, profile.id] },
    ],
    'write',
  );
  return { ok: true };
}

type Insert = {
  notebookId: string;
  section: string;
  title: string;
  html: string;
  position: number;
  sourceKey?: string | null;
  source?: NoteSource | null;
};
function insertNote(profile: Profile, input: Insert) {
  const id = randomUUID();
  const at = now();
  const page = derived(input.html);
  return {
    id,
    statement: {
      sql: `INSERT INTO notes (id,owner_id,notebook_id,section,title,html,text,tags_json,links_json,pinned,source_key,source_json,words,position,created_at,updated_at,trashed_at)
        VALUES (?,?,?,?,?,?,?,?,?,0,?,?,?,?,?,?,NULL)`,
      args: [
        id,
        profile.id,
        input.notebookId,
        input.section,
        input.title,
        page.html,
        page.text,
        JSON.stringify(page.tags),
        JSON.stringify(page.links),
        input.sourceKey ?? null,
        input.source ? JSON.stringify(input.source) : null,
        page.words,
        input.position,
        at,
        at,
      ] as (string | number | null)[],
    },
  };
}
async function roomFor(db: Database, profile: Profile, pages: number) {
  if ((await count(db, 'SELECT COUNT(*) AS n FROM notes WHERE owner_id=?', profile.id)) + pages > noteLimits.notes)
    throw new AppError(409, `You can keep up to ${noteLimits.notes} pages. Empty the trash to make room.`);
}

export async function createNote(db: Database, profile: Profile, body: Record<string, unknown>) {
  const notebook = asNotebook(await notebookRow(db, profile, body.notebookId));
  await roomFor(db, profile, 1);
  const section = plainLabel(body.section, noteLimits.section);
  const title = plainLabel(body.title, noteLimits.title) || 'Untitled';
  const { id, statement } = insertNote(profile, {
    notebookId: notebook.id,
    section,
    title,
    html: String(body.html ?? '<p><br></p>'),
    position: await nextPosition(db, 'notes', profile, notebook.id),
  });
  const statements = [statement];
  if (section && !notebook.sections.includes(section))
    statements.push({
      sql: 'UPDATE notebooks SET sections_json=?,updated_at=? WHERE id=? AND owner_id=?',
      args: [JSON.stringify(cleanSections([...notebook.sections, section])), now(), notebook.id, profile.id],
    });
  await db.batch(statements, 'write');
  return readNote(db, profile, id);
}

export async function updateNote(db: Database, profile: Profile, body: Record<string, unknown>) {
  const current = asNote(await noteRow(db, profile, body.id));
  const sets: string[] = [];
  const args: (string | number | null)[] = [];
  const statements: { sql: string; args: (string | number | null)[] }[] = [];
  if (body.html !== undefined) {
    const page = derived(body.html);
    sets.push('html=?', 'text=?', 'tags_json=?', 'links_json=?', 'words=?');
    args.push(page.html, page.text, JSON.stringify(page.tags), JSON.stringify(page.links), page.words);
  }
  if (body.title !== undefined) {
    const title = plainLabel(body.title, noteLimits.title) || 'Untitled';
    sets.push('title=?');
    args.push(title);
    if (title !== current.title) {
      // Keep [[links]] to this page working after a rename.
      const linking = (await db.all(
        'SELECT id,html FROM notes WHERE owner_id=? AND id<>? AND instr(lower(links_json),lower(?))>0 LIMIT 300',
        profile.id,
        current.id,
        current.title,
      )) as Row[];
      for (const row of linking) {
        const html = renameLinks(String(row.html), current.title, title);
        if (html === row.html) continue;
        const page = derived(html);
        statements.push({
          sql: 'UPDATE notes SET html=?,text=?,links_json=? WHERE id=? AND owner_id=?',
          args: [page.html, page.text, JSON.stringify(page.links), String(row.id), profile.id],
        });
      }
    }
  }
  if (body.pinned !== undefined) {
    sets.push('pinned=?');
    args.push(body.pinned ? 1 : 0);
  }
  if (body.notebookId !== undefined || body.section !== undefined) {
    const notebook = asNotebook(await notebookRow(db, profile, body.notebookId ?? current.notebookId));
    const section = plainLabel(body.section ?? (notebook.id === current.notebookId ? current.section : ''), noteLimits.section);
    sets.push('notebook_id=?', 'section=?');
    args.push(notebook.id, section);
    if (section && !notebook.sections.includes(section))
      statements.push({
        sql: 'UPDATE notebooks SET sections_json=? WHERE id=? AND owner_id=?',
        args: [JSON.stringify(cleanSections([...notebook.sections, section])), notebook.id, profile.id],
      });
  }
  if (typeof body.position === 'number' && Number.isFinite(body.position)) {
    sets.push('position=?');
    args.push(body.position);
  }
  if (!sets.length) return summary(db, profile, current.id);
  sets.push('updated_at=?');
  args.push(now());
  statements.unshift({
    sql: `UPDATE notes SET ${sets.join(',')} WHERE id=? AND owner_id=?`,
    args: [...args, current.id, profile.id],
  });
  await db.batch(statements, 'write');
  return summary(db, profile, current.id);
}

async function restoreTarget(db: Database, profile: Profile, notebookId: string) {
  const row = await db.get('SELECT id FROM notebooks WHERE id=? AND owner_id=?', notebookId, profile.id);
  if (row) return notebookId;
  const existing = await db.get(
    "SELECT id FROM notebooks WHERE owner_id=? AND title='Restored pages' AND event_id IS NULL",
    profile.id,
  );
  if (existing) return String(existing.id);
  return (await createNotebook(db, profile, { title: 'Restored pages', color: 'unassigned' })).id;
}

export async function trashNote(db: Database, profile: Profile, id: unknown, restore = false) {
  const note = asNote(await noteRow(db, profile, id));
  if (restore) {
    const notebookId = await restoreTarget(db, profile, note.notebookId);
    await db.batch(
      [
        {
          sql: 'UPDATE notes SET trashed_at=NULL,notebook_id=?,updated_at=? WHERE id=? AND owner_id=?',
          args: [notebookId, now(), note.id, profile.id],
        },
      ],
      'write',
    );
  } else
    await db.batch(
      [{ sql: 'UPDATE notes SET trashed_at=? WHERE id=? AND owner_id=?', args: [now(), note.id, profile.id] }],
      'write',
    );
  return summary(db, profile, note.id);
}

export async function deleteNote(db: Database, profile: Profile, id: unknown) {
  const note = asNote(await noteRow(db, profile, id));
  await db.batch(
    [
      { sql: 'DELETE FROM note_images WHERE owner_id=? AND note_id=?', args: [profile.id, note.id] },
      { sql: 'DELETE FROM notes WHERE id=? AND owner_id=?', args: [note.id, profile.id] },
    ],
    'write',
  );
  return { ok: true };
}

export async function emptyTrash(db: Database, profile: Profile) {
  await db.batch(
    [
      {
        sql: 'DELETE FROM note_images WHERE owner_id=? AND note_id IN (SELECT id FROM notes WHERE owner_id=? AND trashed_at IS NOT NULL)',
        args: [profile.id, profile.id],
      },
      { sql: 'DELETE FROM notes WHERE owner_id=? AND trashed_at IS NOT NULL', args: [profile.id] },
    ],
    'write',
  );
  return { ok: true };
}

const imageData = /^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+=*$/;
export async function saveImage(db: Database, profile: Profile, body: Record<string, unknown>) {
  const id = String(body.imageId ?? '');
  const data = String(body.data ?? '');
  if (!isImageId(id)) throw new AppError(400, 'That image could not be read.');
  if (data.length > noteLimits.imageData) throw new AppError(413, 'That image is too large. Try a smaller one.');
  if (!imageData.test(data)) throw new AppError(400, 'Paste a PNG, JPEG, WebP or GIF image.');
  const note = asNote(await noteRow(db, profile, body.id));
  if ((await count(db, 'SELECT COUNT(*) AS n FROM note_images WHERE owner_id=?', profile.id)) >= noteLimits.images)
    throw new AppError(409, `You can keep up to ${noteLimits.images} images across your notes.`);
  await db.batch(
    [
      {
        sql: 'INSERT OR IGNORE INTO note_images (id,owner_id,note_id,data,bytes,created_at) VALUES (?,?,?,?,?,?)',
        args: [id, profile.id, note.id, data, Math.round((data.length * 3) / 4), now()],
      },
    ],
    'write',
  );
  return { ok: true };
}

export async function readImages(db: Database, profile: Profile, list: string | null) {
  const ids = (list ?? '').split(',').filter(isImageId).slice(0, 40);
  if (!ids.length) return { images: {} };
  const rows = (await db.all(
    `SELECT id,data FROM note_images WHERE owner_id=? AND id IN (${ids.map(() => '?').join(',')})`,
    profile.id,
    ...ids,
  )) as Row[];
  return { images: Object.fromEntries(rows.map((row) => [String(row.id), String(row.data)])) };
}

// ---------- Pages tied to an event ----------

function requireDivision(profile: Profile) {
  if (!profile.division) throw new AppError(403, 'Choose your division to keep event notes.');
  return profile.division;
}
function eventFor(division: Division, eventId: unknown) {
  const event = eventsForDivision(division).find((item) => item.id === eventId);
  if (!event) throw new AppError(404, 'That event is not in your division.');
  return event;
}
export function sourceHref(kind: NoteSourceKind, eventId: string, refId: string) {
  const base = `/dashboard/student/events/${encodeURIComponent(eventId)}`;
  if (kind === 'event') return `${base}/lessons`;
  if (kind === 'unit') return `${base}/lessons?unit=${encodeURIComponent(refId)}`;
  if (kind === 'lesson') return `${base}/lessons?lesson=${encodeURIComponent(refId)}`;
  if (kind === 'practice') return `${base}/practice-tests/${encodeURIComponent(refId)}`;
  return `${base}/${encodeURIComponent(refId)}`;
}
const sourceKey = (division: Division, eventId: string, kind: NoteSourceKind, refId: string) =>
  `${division}:${eventId}:${kind}:${refId}`;

async function eventNotebook(db: Database, profile: Profile, division: Division, event: { id: string; name: string }) {
  const find = () =>
    db.get('SELECT * FROM notebooks WHERE owner_id=? AND division=? AND event_id=?', profile.id, division, event.id);
  const found = await find();
  if (found) return asNotebook(found as Row);
  const at = now();
  await db.batch(
    [
      {
        sql: 'INSERT OR IGNORE INTO notebooks (id,owner_id,title,event_id,division,color,sections_json,position,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)',
        args: [
          randomUUID(),
          profile.id,
          event.name,
          event.id,
          division,
          slotForEvent(event.id)?.color ?? 'unassigned',
          '[]',
          await nextPosition(db, 'notebooks', profile),
          at,
          at,
        ],
      },
    ],
    'write',
  );
  return asNotebook((await find()) as Row);
}

const starters: Partial<Record<NoteSourceKind, string>> = {
  practice:
    '<h2>Questions I missed</h2><ul data-checklist="true"><li data-checked="false"><br></li></ul><h2>Topics to review</h2><ul><li><br></li></ul><h2>Next time</h2><p><br></p>',
  lab: '<h2>Question</h2><p><br></p><h2>Hypothesis</h2><p><br></p><h2>Observations</h2><ul><li><br></li></ul><h2>Conclusion</h2><p><br></p>',
};

/** Finds or creates the page for what the student is studying, in that event's notebook. */
export async function contextNote(db: Database, profile: Profile, body: Record<string, unknown>): Promise<NoteContext> {
  const division = requireDivision(profile);
  const event = eventFor(division, body.eventId);
  const kind = body.kind as NoteSourceKind;
  if (!['lesson', 'practice', 'lab', 'tool'].includes(kind)) throw new AppError(400, 'Choose what these notes are for.');
  const refId = String(body.refId ?? '');
  if (!slug.test(refId)) throw new AppError(400, 'Choose what these notes are for.');
  let label = plainLabel(body.label, noteLimits.title) || event.name;
  let section = kind === 'practice' ? 'Practice tests' : kind === 'lab' ? 'Labs' : label;
  if (kind === 'lesson') {
    const course = lessonsForEvent(event.id, division);
    const lesson = course?.lessons.find((item) => item.id === refId);
    if (!course || !lesson) throw new AppError(404, 'That lesson was not found.');
    label = lesson.title;
    section = course.units.find((unit) => unit.id === lesson.unitId)?.title ?? 'Lessons';
  }
  const notebook = await eventNotebook(db, profile, division, event);
  const key = sourceKey(division, event.id, kind, refId);
  let row = (await db.get(
    `SELECT ${summaryColumns},html FROM notes WHERE owner_id=? AND source_key=?`,
    profile.id,
    key,
  )) as Row | undefined;
  if (row?.trashed_at) {
    await trashNote(db, profile, String(row.id), true);
    row = (await noteRow(db, profile, String(row.id))) as Row;
  }
  if (!row) {
    await roomFor(db, profile, 1);
    const source: NoteSource = {
      eventId: event.id,
      eventName: event.name,
      kind,
      refId,
      label,
      href: sourceHref(kind, event.id, refId),
    };
    const { id, statement } = insertNote(profile, {
      notebookId: notebook.id,
      section: plainLabel(section, noteLimits.section),
      title: label,
      html: starters[kind] ?? '<p><br></p>',
      position: await nextPosition(db, 'notes', profile, notebook.id),
      sourceKey: key,
      source,
    });
    const statements = [statement];
    if (!notebook.sections.includes(section))
      statements.push({
        sql: 'UPDATE notebooks SET sections_json=? WHERE id=? AND owner_id=?',
        args: [JSON.stringify(cleanSections([...notebook.sections, section])), notebook.id, profile.id],
      });
    try {
      await db.batch(statements, 'write');
    } catch (error) {
      // Opened twice at once: the other request made the page.
      if (!(error instanceof Error) || !/UNIQUE/i.test(error.message)) throw error;
    }
    row = (await db.get(
      `SELECT ${summaryColumns},html FROM notes WHERE owner_id=? AND source_key=?`,
      profile.id,
      key,
    )) as Row;
  }
  const note = asNote(row);
  const fresh = asNotebook(await notebookRow(db, profile, note.notebookId));
  const pages = (
    (await db.all(
      `SELECT ${summaryColumns} FROM notes WHERE owner_id=? AND notebook_id=? AND trashed_at IS NULL ORDER BY position,created_at`,
      profile.id,
      fresh.id,
    )) as Row[]
  ).map(asSummary);
  return { note, notebook: fresh, pages };
}

/** Study notes for one lesson, built from the lesson itself. */
export function lessonDraft(profile: Profile, body: Record<string, unknown>) {
  const division = requireDivision(profile);
  const event = eventFor(division, body.eventId);
  const course = lessonsForEvent(event.id, division);
  const lesson = course?.lessons.find((item) => item.id === body.lessonId);
  if (!course || !lesson) throw new AppError(404, 'That lesson was not found.');
  return { html: lessonNoteHtml(course, lesson) };
}

/** Builds a whole notebook for an event: overview, units, lessons and a glossary. */
export async function generateEventNotebook(db: Database, profile: Profile, body: Record<string, unknown>) {
  const division = requireDivision(profile);
  const event = eventFor(division, body.eventId);
  const course = lessonsForEvent(event.id, division);
  if (!course) throw new AppError(404, `${event.name} has no lessons to build notes from yet.`);
  const notebook = await eventNotebook(db, profile, division, event);
  const pages = eventNotePages(course);
  const existing = new Map(
    (
      (await db.all(
        "SELECT id,source_key,words,trashed_at FROM notes WHERE owner_id=? AND source_key LIKE ? ESCAPE '\\'",
        profile.id,
        `${division}:${event.id.replace(/[\\%_]/g, (c) => `\\${c}`)}:%`,
      )) as Row[]
    ).map((row) => [String(row.source_key), row]),
  );
  const missing = pages.filter((page) => !existing.has(sourceKey(division, event.id, page.kind, page.refId)));
  await roomFor(db, profile, missing.length);
  const statements: { sql: string; args: (string | number | null)[] }[] = [];
  let created = 0;
  let filled = 0;
  const base = await nextPosition(db, 'notes', profile, notebook.id);
  for (const [index, page] of pages.entries()) {
    const key = sourceKey(division, event.id, page.kind, page.refId);
    const found = existing.get(key);
    if (found) {
      // A page opened beside a lesson but never written in gets the lesson's notes.
      if (Number(found.words) < 3 && !found.trashed_at) {
        const filledPage = derived(page.html);
        statements.push({
          sql: 'UPDATE notes SET html=?,text=?,tags_json=?,links_json=?,words=?,updated_at=? WHERE id=? AND owner_id=?',
          args: [filledPage.html, filledPage.text, JSON.stringify(filledPage.tags), JSON.stringify(filledPage.links), filledPage.words, now(), String(found.id), profile.id],
        });
        filled++;
      }
      continue;
    }
    statements.push(
      insertNote(profile, {
        notebookId: notebook.id,
        section: plainLabel(page.section, noteLimits.section),
        title: page.title,
        html: page.html,
        position: base + index,
        sourceKey: key,
        source: {
          eventId: event.id,
          eventName: event.name,
          kind: page.kind,
          refId: page.refId,
          label: page.label,
          href: sourceHref(page.kind, event.id, page.refId),
        },
      }).statement,
    );
    created++;
  }
  const unitSections = course.units.map((unit) => unit.title);
  statements.push({
    sql: 'UPDATE notebooks SET sections_json=?,updated_at=? WHERE id=? AND owner_id=?',
    args: [JSON.stringify(cleanSections([...unitSections, ...notebook.sections])), now(), notebook.id, profile.id],
  });
  await db.batch(statements, 'write');
  return { notebook: asNotebook(await notebookRow(db, profile, notebook.id)), created, filled };
}
