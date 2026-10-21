import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { schema } from '../src/lib/schema.ts';
import type { Database } from '../src/lib/school-service.ts';
import type { Profile } from '../src/lib/domain.ts';
import type { SheetContent, SheetInput } from '../src/lib/cheatsheet-types.ts';
import {
  sheetEvents,
  sheetEventsByDivision,
  parseSheetInput,
  parseSheetContent,
} from '../src/lib/cheatsheets.ts';
import { createSheet, readSheet, publishSheet, listSheets } from '../src/lib/cheatsheet-service.ts';
import { generateSheet, sheetRuleText } from '../src/lib/cheatsheet-ai.ts';
import { sheetDocument } from '../src/lib/cheatsheet-document.ts';
import { sheetFigures } from '../src/lib/cheatsheet-figures.ts';

const input: SheetInput = {
  eventId: 'anatomy-and-physiology',
  division: 'C',
  title: 'Respiration reference',
  level: 'national',
  notes: '',
  exclusions: 'Basic definitions of inhalation',
  uploads: [],
};
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
const other: Profile = { ...student, id: 'bob', schoolId: 'two', schoolName: 'South School' };
export const content: SheetContent = {
  sections: Array.from({ length: 24 }, (_, i) => ({
    heading: `Respiratory analysis ${i + 1}`,
    facts: Array.from(
      { length: 4 },
      () =>
        'Alveolar ventilation VA=(VT−VD)×f; VT tidal volume; VD dead space; f breaths/min. Match volume units before calculating. Compare restrictive reductions in lung volume with obstruction affecting expiratory flow. Interpret measurements with reference ranges and clinical context.',
    ),
    table: { headers: [], rows: [] },
    diagrams:
      i < 2
        ? [
            {
              title: 'Gas transport pathway',
              nodes: [
                { label: 'Alveolus', x: 50, y: 15 },
                { label: 'Capillary', x: 50, y: 50 },
                { label: 'Tissue', x: 50, y: 85 },
              ],
              edges: [
                { from: 0, to: 1, label: 'diffusion' },
                { from: 1, to: 2, label: 'perfusion' },
              ],
            },
          ]
        : [],
  })),
};
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
  return { db, raw };
}
test('eight events per division qualify; input and upload bounds are enforced', () => {
  assert.equal(sheetEvents.length, 8);
  assert.equal(sheetEventsByDivision.B.length, 8);
  assert.deepEqual(parseSheetInput(input), input);
  // Each division accepts only its own sheet events, and every one has its own rule text.
  const heredity = { ...input, eventId: 'heredity', division: 'B' as const };
  assert.deepEqual(parseSheetInput(heredity, 'B'), heredity);
  assert.throws(() => parseSheetInput(heredity, 'C'));
  assert.throws(() => parseSheetInput({ ...input, eventId: 'forensics' }, 'B'));
  for (const division of ['B', 'C'] as const)
    for (const event of sheetEventsByDivision[division])
      assert.match(sheetRuleText(division, event.id) ?? '', new RegExp(`${division}\\b`), event.id);
  for (const patch of [
    { eventId: 'astronomy' },
    { eventId: '../../etc' },
    { level: 'all' },
    { exclusions: 'x'.repeat(4001) },
    { uploads: [{ name: 'bad.svg', mime: 'image/svg+xml', data: 'PHN2Zz4=' }] },
    { uploads: [{ name: 'fake.png', mime: 'image/png', data: 'PHN2Zz4=' }] },
  ])
    assert.throws(() => parseSheetInput({ ...input, ...patch }));
  assert.equal(parseSheetContent(content).sections.length, 24);
  assert.throws(() => parseSheetContent({ sections: content.sections.slice(0, 2) }));
});
test('drafts remain private, publication shares across schools and preserves school/date metadata', async () => {
  const { db, raw } = fixture();
  try {
    const draft = await createSheet(db, student, input, async () => content);
    assert.equal(draft.published, false);
    assert.equal((await listSheets(db, student, null, null)).drafts[0].id, draft.id);
    assert.equal((await listSheets(db, other, null, null)).drafts.length, 0);
    assert.equal((await listSheets(db, other, null, null)).sheets.length, 0);
    await assert.rejects(readSheet(db, other, draft.id), { status: 404 });
    await assert.rejects(publishSheet(db, other, draft.id), { status: 404 });
    await publishSheet(db, student, draft.id);
    await publishSheet(db, student, draft.id); // idempotent sharing retry
    const shared = await readSheet(db, other, draft.id);
    assert.equal(shared.schoolName, 'North School');
    assert.equal(shared.createdAt, draft.createdAt);
    assert.equal(shared.exclusions, input.exclusions);
    assert.equal((await listSheets(db, other, input.eventId, null)).sheets.length, 1);
    assert.equal((await listSheets(db, other, 'botany', null)).sheets.length, 0);
    // Division B has its own library: a Division C sheet is not part of it.
    await assert.rejects(readSheet(db, { ...other, division: 'B' }, draft.id), { status: 404 });
    assert.equal((await listSheets(db, { ...other, division: 'B' }, null, null)).sheets.length, 0);
    await assert.rejects(readSheet(db, { ...other, division: 'A' }, draft.id), { status: 403 });
    await assert.rejects(listSheets(db, { ...other, role: 'instructor' }, null, null), {
      status: 403,
    });
    const html = sheetDocument(shared);
    assert.equal((html.match(/class="page"/g) || []).length, 2);
    assert.ok(!html.includes(shared.createdAt));
    assert.ok(!html.includes(shared.schoolName));
    assert.ok(!html.includes(input.exclusions));
    assert.match(html, /size:letter portrait/);
  } finally {
    raw.close();
  }
});
test('reservations prevent parallel work, failed generations never enter the library, quota is persistent', async () => {
  const { db, raw } = fixture();
  try {
    let release!: () => void;
    const wait = new Promise<void>((resolve) => {
      release = resolve;
    });
    const pending = createSheet(db, student, input, async () => {
      await wait;
      return content;
    });
    await assert.rejects(
      createSheet(db, student, input, async () => content),
      { status: 429 },
    );
    release();
    await pending;
    await assert.rejects(
      createSheet(db, student, input, async () => {
        throw new Error('offline');
      }),
      /offline/,
    );
    await createSheet(db, student, input, async () => content);
    await assert.rejects(
      createSheet(db, student, input, async () => content),
      { status: 429 },
    );
    assert.equal((await listSheets(db, other, null, null)).sheets.length, 0);
  } finally {
    raw.close();
  }
});
test('Gemini receives the correct rulebook, exclusions and uploads; invalid drafts get one revision', async () => {
  const calls: Record<string, unknown>[] = [];
  const fetcher = (async (_url, options) => {
    calls.push(JSON.parse(String(options?.body)));
    return new Response(
      JSON.stringify({
        candidates: [
          {
            finishReason: 'STOP',
            content: {
              parts: [{ text: JSON.stringify(calls.length === 1 ? { sections: [] } : content) }],
            },
          },
        ],
      }),
    );
  }) as typeof fetch;
  const result = await generateSheet(
    {
      ...input,
      uploads: [
        {
          name: 'notes.csv',
          mime: 'text/csv',
          data: Buffer.from('volume,flow\n2,5').toString('base64'),
        },
      ],
    },
    { apiKey: 'test-key', fetcher },
  );
  assert.equal(calls.length, 2);
  assert.equal(result.sections.length, 24);
  const request = JSON.stringify(calls[0]);
  assert.match(request, /respiratory, digestive and immune/);
  assert.ok(request.includes(input.exclusions));
  assert.match(request, /volume,flow/);
  assert.match(request, /FRONT AND BACK/);
  const failed = (async () =>
    new Response(JSON.stringify({ candidates: [{ finishReason: 'MAX_TOKENS' }] }))) as typeof fetch;
  await assert.rejects(generateSheet(input, { apiKey: 'test-key', fetcher: failed }), {
    status: 502,
  });
});
test('Division B sheets use the Division B rulebook and a separate shared library', async () => {
  const { db, raw } = fixture();
  try {
    const bStudent: Profile = { ...student, id: 'cara', division: 'B' };
    const bOther: Profile = { ...other, id: 'dev', division: 'B' };
    const heredity: SheetInput = { ...input, eventId: 'heredity', division: 'B' };
    // A request cannot borrow another division's event or rules.
    await assert.rejects(
      createSheet(db, bStudent, input, async () => content),
      { status: 400 },
    );
    await assert.rejects(
      createSheet(db, student, heredity, async () => content),
      { status: 400 },
    );
    const draft = await createSheet(db, bStudent, heredity, async () => content);
    await publishSheet(db, bStudent, draft.id);
    assert.equal((await readSheet(db, bOther, draft.id)).eventId, 'heredity');
    assert.equal((await listSheets(db, bOther, 'heredity', null)).sheets.length, 1);
    assert.equal((await listSheets(db, other, null, null)).sheets.length, 0);
    await assert.rejects(readSheet(db, other, draft.id), { status: 404 });
    await assert.rejects(listSheets(db, bOther, 'designer-genes', null), { status: 400 });
  } finally {
    raw.close();
  }
  const calls: string[] = [];
  const fetcher = (async (_url, options) => {
    calls.push(String(options?.body));
    return new Response(
      JSON.stringify({
        candidates: [
          { finishReason: 'STOP', content: { parts: [{ text: JSON.stringify(content) }] } },
        ],
      }),
    );
  }) as typeof fetch;
  await generateSheet(
    { ...input, eventId: 'heredity', division: 'B' },
    { apiKey: 'test-key', fetcher },
  );
  const request = JSON.parse(calls[0]);
  const payload = JSON.parse(request.contents[0].parts[0].text);
  assert.equal(payload.division, 'B');
  assert.match(payload.ruleText, /HEREDITY B/);
  assert.match(payload.ruleText, /Hardy-Weinberg/);
  // Heredity draws on the reviewed genetics figures; events without a set get none.
  assert.ok(sheetFigures('heredity').length >= 5);
  assert.ok(sheetFigures('crime-busters').length >= 5);
  assert.deepEqual(sheetFigures('food-science'), []);
});
test('model text is escaped in standalone sheets; diagram edge references are validated', async () => {
  const malicious = structuredClone(content);
  malicious.sections[0].facts[0] = '<script>alert(1)</script><img src=x onerror=alert(2)>';
  const html = sheetDocument({
    id: 'test',
    eventId: input.eventId,
    title: '<script>bad</script>',
    level: 'national',
    createdAt: '',
    schoolName: 'School',
    hasExclusions: false,
    imageCount: 0,
    content: malicious,
    images: [],
    exclusions: '',
    published: true,
  });
  assert.ok(!html.includes('<script>'));
  assert.match(html, /&lt;script&gt;/);
  malicious.sections[0].diagrams[0].edges[0].to = 999;
  assert.throws(() => parseSheetContent(malicious), /edge/);
});
test('catalog figures: every event has choices, unknown ids are dropped, credits are printed', async () => {
  for (const event of sheetEvents) assert.ok(sheetFigures(event.id).length >= 5, event.id);
  const [first, second, third] = sheetFigures(input.eventId);
  const calls: Record<string, unknown>[] = [];
  const picked = structuredClone(content);
  picked.sections[0].figures = [first.id, 'https://evil.test/x.png', first.id, second.id, third.id];
  picked.sections[1].figures = [second.id, sheetFigures('botany')[0].id];
  const fetcher = (async (_url, options) => {
    calls.push(JSON.parse(String(options?.body)));
    return new Response(
      JSON.stringify({
        candidates: [
          { finishReason: 'STOP', content: { parts: [{ text: JSON.stringify(picked) }] } },
        ],
      }),
    );
  }) as typeof fetch;
  const result = await generateSheet(input, { apiKey: 'test-key', fetcher });
  assert.ok(JSON.stringify(calls[0]).includes(first.id));
  // Two per section, never repeated, and only this event's catalog.
  assert.deepEqual(result.sections[0].figures, [first.id, second.id]);
  assert.deepEqual(result.sections[1].figures, []);
  const sheet = {
    id: 'test',
    eventId: input.eventId,
    title: 'Figures',
    level: 'national' as const,
    createdAt: '',
    schoolName: 'School',
    hasExclusions: false,
    imageCount: 0,
    content: result,
    images: [],
    exclusions: '',
    published: true,
  };
  const html = sheetDocument(sheet, {
    [first.id]: { src: 'data:image/jpeg;base64,AAAA', ratio: 1.6 },
    [second.id]: { src: 'javascript:alert(1)', ratio: 1 },
  });
  assert.equal(html.match(/class="ref"/g)?.length, 1);
  assert.ok(html.includes('data:image/jpeg;base64,AAAA') && !html.includes('javascript:'));
  assert.ok(html.includes(first.credit.replace(/&/g, '&amp;')));
  // A sheet stays valid when no figure could be fetched, and older sheets have no figure list.
  assert.ok(!sheetDocument(sheet).includes('class="ref"'));
  assert.ok(sheetDocument({ ...sheet, content }).includes('sheet-blocks'));
});
