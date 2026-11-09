import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { schema } from '../src/lib/schema.ts';
import type { Database } from '../src/lib/school-service.ts';
import type { Profile } from '../src/lib/domain.ts';
import {
  noteHeadings,
  noteImageIds,
  noteLinks,
  noteTags,
  noteText,
  renameLinks,
  sanitizeNoteHtml,
  wordCount,
} from '../src/lib/note-html.ts';
import { eventNotePages, overviewTitle, unitPageTitle } from '../src/lib/note-generator.ts';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';
import {
  contextNote,
  createNote,
  createNotebook,
  deleteNotebook,
  generateEventNotebook,
  listNotes,
  readImages,
  readNote,
  saveImage,
  searchNotes,
  trashNote,
  updateNote,
  updateNotebook,
} from '../src/lib/note-service.ts';

const student: Profile = {
  id: 'alice',
  role: 'student',
  division: 'C',
  displayName: 'Alice',
  schoolId: 'one',
  schoolName: 'North School',
  schoolCommunityId: null,
  schoolCommunityName: null,
};
const other: Profile = { ...student, id: 'bob' };

function fixture() {
  const raw = new DatabaseSync(':memory:');
  for (const sql of schema) raw.exec(sql);
  const db: Database = {
    async get(sql, ...args) {
      return raw.prepare(sql).get(...args) as Awaited<ReturnType<Database['get']>>;
    },
    async all(sql, ...args) {
      return raw.prepare(sql).all(...args) as Awaited<ReturnType<Database['all']>>;
    },
    async batch(statements) {
      raw.exec('BEGIN IMMEDIATE');
      try {
        const result = statements.map(({ sql, args }) => ({
          rowsAffected: Number(raw.prepare(sql).run(...args).changes),
          rows: [],
        }));
        raw.exec('COMMIT');
        return result;
      } catch (e) {
        raw.exec('ROLLBACK');
        throw e;
      }
    },
  };
  return db;
}

const imageId = '0b6c2f8e-3f6a-4a51-9a3c-2a8f5e1d7c90';

test('the sanitizer keeps notebook formatting and strips anything that could run', () => {
  const kept = sanitizeNoteHtml(
    `<h2>Stars</h2><p><strong>Mass</strong> <mark data-color="green">matters</mark> <a data-wikilink="White dwarf">White dwarf</a></p>` +
      `<ul data-checklist="true"><li data-checked="true">done</li></ul><blockquote data-callout="key"><p>Key</p></blockquote>` +
      `<img data-img="${imageId}" data-size="m" alt="Diagram" src="data:image/png;base64,AAAA">`,
  );
  assert.match(kept, /<h2>Stars<\/h2>/);
  assert.match(kept, /<mark data-color="green">matters<\/mark>/);
  assert.match(kept, /<a data-wikilink="White dwarf">/);
  assert.match(kept, /<ul data-checklist="true"><li data-checked="true">/);
  assert.match(kept, /<blockquote data-callout="key">/);
  assert.match(kept, new RegExp(`<img data-img="${imageId}" data-size="m" alt="Diagram">`));
  assert.doesNotMatch(kept, /src=/, 'image data is stored separately, never in the page');

  const attacks = [
    '<script>alert(1)</script>',
    '<img src=x onerror=alert(1)>',
    `<img data-img="${imageId}" onerror="alert(1)">`,
    '<a href="javascript:alert(1)">x</a>',
    '<a href="java\nscript:alert(1)">x</a>',
    '<a href="&#106;avascript:alert(1)">x</a>',
    '<p style="background:url(javascript:alert(1))" onclick="x()">x</p>',
    '<svg><script>alert(1)</script></svg>',
    '<iframe src="https://evil.example"></iframe>',
    '<img alt="a>b" onerror=alert(1)>',
    '<mark data-color="red" onmouseover="x()">x</mark>',
    '<style>body{display:none}</style>',
    '<!-- <script>alert(1)</script> -->',
    '<scr<script>ipt>alert(1)</script>',
  ];
  for (const attack of attacks) {
    const clean = sanitizeNoteHtml(attack);
    // Attribute-looking text is harmless once outside a tag; only real tags and attributes matter.
    assert.doesNotMatch(
      clean,
      /<script|<[^>]*\son\w+=|href="javascript|<iframe|<svg|<style|style=/i,
      attack,
    );
  }
  assert.equal(
    sanitizeNoteHtml('<a href="https://example.com">x</a>'),
    '<a href="https://example.com" target="_blank" rel="noopener noreferrer">x</a>',
  );
  assert.equal(
    sanitizeNoteHtml('<mark data-color="red">x</mark>'),
    '<mark data-color="yellow">x</mark>',
  );
  assert.equal(
    sanitizeNoteHtml('<div><b>a</b><i>b</i></div>'),
    '<p><strong>a</strong><em>b</em></p>',
  );
  assert.equal(sanitizeNoteHtml('<span class="x">text</span> 1 < 2'), 'text 1 &lt; 2');
});

test('page text, links, tags, headings and renames come from the HTML', () => {
  const html = `<h1>Stellar evolution</h1><p>Mass &amp; fusion #astro</p><ul><li>Ends as a <a data-wikilink="White dwarf">White dwarf</a></li><li>[[Supernova]] and [[white dwarf]]</li></ul><h2>Next</h2><img data-img="${imageId}">`;
  assert.equal(
    noteText(html),
    'Stellar evolution\nMass & fusion #astro\nEnds as a White dwarf\n[[Supernova]] and [[white dwarf]]\nNext',
  );
  assert.deepEqual(noteLinks(html), ['White dwarf', 'Supernova']);
  assert.deepEqual(noteTags(noteText(html)), ['astro']);
  assert.deepEqual(noteImageIds(html), [imageId]);
  assert.deepEqual(noteHeadings(html), [
    { level: 1, text: 'Stellar evolution' },
    { level: 2, text: 'Next' },
  ]);
  assert.equal(wordCount('Mass decides the whole life-story.'), 5);
  assert.equal(
    renameLinks(
      '<a data-wikilink="White dwarf">White dwarf</a> <a data-wikilink="White dwarf">WD</a>',
      'white dwarf',
      'Degenerate star',
    ),
    '<a data-wikilink="Degenerate star">Degenerate star</a> <a data-wikilink="Degenerate star">WD</a>',
  );
});

test('a course becomes linked pages: overview, units, lessons and a glossary', () => {
  const course = lessonsForEvent('astronomy', 'C')!;
  const pages = eventNotePages(course);
  const lessonCount = course.units.reduce((n, unit) => n + unit.lessonIds.length, 0);
  assert.equal(pages.length, 2 + course.units.length + lessonCount);
  assert.equal(pages[0].title, overviewTitle(course.eventName));
  const unitPage = pages.find((page) => page.kind === 'unit')!;
  assert.equal(unitPage.title, unitPageTitle(course.units[0].title));
  const lessonPage = pages.find((page) => page.kind === 'lesson')!;
  assert.ok(noteLinks(lessonPage.html).includes(unitPage.title), 'lessons link back to their unit');
  assert.match(lessonPage.html, /<mark data-color="yellow">/, 'key terms are highlighted');
  // Every link in the notebook points at a page that exists.
  const titles = new Set(pages.map((page) => page.title.toLowerCase()));
  for (const page of pages)
    for (const link of noteLinks(page.html))
      assert.ok(titles.has(link.toLowerCase()), `${page.title} → ${link}`);
});

test('notebooks and pages are private, searchable, movable and renamed safely', async () => {
  const db = fixture();
  const book = await createNotebook(db, student, { title: 'Chemistry', color: 'green' });
  assert.equal(book.color, 'green');
  const a = await createNote(db, student, {
    notebookId: book.id,
    section: 'Acids',
    title: 'pH',
    html: '<p>Strong <script>x</script>acids #chem</p>',
  });
  assert.equal(a.html, '<p>Strong acids #chem</p>');
  assert.deepEqual(a.tags, ['chem']);
  const b = await createNote(db, student, {
    notebookId: book.id,
    title: 'Buffers',
    html: '<p>See <a data-wikilink="pH">pH</a></p>',
  });
  assert.deepEqual(b.links, ['pH']);
  assert.deepEqual((await listNotes(db, student)).notebooks[0].sections, ['Acids']);

  await assert.rejects(readNote(db, other, a.id), /not found/);
  await assert.rejects(updateNote(db, other, { id: a.id, title: 'Mine' }), /not found/);
  assert.equal((await listNotes(db, other)).notes.length, 0);

  assert.deepEqual(
    (await searchNotes(db, student, 'strong')).map((hit) => hit.id),
    [a.id],
  );
  assert.deepEqual(await searchNotes(db, student, '%%'), []);

  await updateNote(db, student, { id: a.id, title: 'Acidity (pH)' });
  const relinked = await readNote(db, student, b.id);
  assert.match(relinked.html, /data-wikilink="Acidity \(pH\)">Acidity \(pH\)</);
  assert.deepEqual(relinked.links, ['Acidity (pH)']);

  await updateNotebook(db, student, {
    id: book.id,
    renameSection: { from: 'Acids', to: 'Acids and bases' },
  });
  assert.equal((await readNote(db, student, a.id)).section, 'Acids and bases');
  const moved = await updateNote(db, student, {
    id: b.id,
    section: 'Acids and bases',
    pinned: true,
  });
  assert.equal(moved.section, 'Acids and bases');
  assert.equal(moved.pinned, true);

  await trashNote(db, student, a.id);
  assert.ok((await readNote(db, student, a.id)).trashedAt);
  await deleteNotebook(db, student, book.id);
  const restored = await trashNote(db, student, b.id, true);
  assert.equal(restored.trashedAt, null);
  const index = await listNotes(db, student);
  assert.equal(index.notebooks.find((n) => n.id === restored.notebookId)?.title, 'Restored pages');
});

test('images are owner-only and checked before they are stored', async () => {
  const db = fixture();
  const book = await createNotebook(db, student, { title: 'Bio' });
  const page = await createNote(db, student, { notebookId: book.id, title: 'Cells' });
  const data = 'data:image/png;base64,iVBORw0KGgo=';
  await saveImage(db, student, { id: page.id, imageId, data });
  assert.deepEqual((await readImages(db, student, imageId)).images, { [imageId]: data });
  assert.deepEqual((await readImages(db, other, imageId)).images, {});
  await assert.rejects(
    saveImage(db, student, { id: page.id, imageId, data: 'data:text/html;base64,PHNjcmlwdD4=' }),
    /PNG/,
  );
  await assert.rejects(
    saveImage(db, other, { id: page.id, imageId: '1b6c2f8e-3f6a-4a51-9a3c-2a8f5e1d7c90', data }),
    /not found/,
  );
});

test('study pages are found or made in the event notebook, and a course fills it', async () => {
  const db = fixture();
  const course = lessonsForEvent('astronomy', 'C')!;
  const lesson = course.lessons.find((item) => item.id === course.units[0].lessonIds[0])!;
  const first = await contextNote(db, student, {
    eventId: 'astronomy',
    kind: 'lesson',
    refId: lesson.id,
    label: 'ignored',
  });
  assert.equal(first.note.title, lesson.title);
  assert.equal(first.notebook.title, 'Astronomy');
  assert.equal(first.notebook.color, 'purple');
  assert.equal(
    first.note.source?.href,
    `/dashboard/student/events/astronomy/lessons?lesson=${lesson.id}`,
  );
  const again = await contextNote(db, student, {
    eventId: 'astronomy',
    kind: 'lesson',
    refId: lesson.id,
  });
  assert.equal(again.note.id, first.note.id);

  const paper = await contextNote(db, student, {
    eventId: 'astronomy',
    kind: 'practice',
    refId: 'mit-2025',
    label: 'MIT 2025',
  });
  assert.equal(paper.note.section, 'Practice tests');
  assert.match(paper.note.html, /Questions I missed/);
  await assert.rejects(
    contextNote(db, student, { eventId: 'not-an-event', kind: 'tool', refId: 'x' }),
    /not in your division/,
  );
  await assert.rejects(
    contextNote(db, student, { eventId: 'astronomy', kind: 'tool', refId: '../x' }),
    /Choose/,
  );

  const built = await generateEventNotebook(db, student, { eventId: 'astronomy' });
  assert.equal(built.notebook.id, first.notebook.id);
  assert.equal(built.filled, 1, 'the empty lesson page gets the lesson notes');
  assert.equal(built.created, eventNotePages(course).length - 1);
  assert.deepEqual(
    built.notebook.sections.slice(0, course.units.length),
    course.units.map((unit) => unit.title),
  );
  assert.ok((await readNote(db, student, first.note.id)).words > 20);
  const second = await generateEventNotebook(db, student, { eventId: 'astronomy' });
  assert.equal(second.created + second.filled, 0, 'building twice adds nothing');
});
