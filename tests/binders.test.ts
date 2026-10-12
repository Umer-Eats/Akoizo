import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { schema } from '../src/lib/schema.ts';
import type { Database } from '../src/lib/school-service.ts';
import type { Profile } from '../src/lib/domain.ts';
import { binderEvents, parseBinderInput, parseBinderPage, parseBinderPlan } from '../src/lib/binders.ts';
import { createBinder, advanceBinder, readBinder, listBinders, publishBinder, cancelBinder } from '../src/lib/binder-service.ts';
import { binderDocument } from '../src/lib/binder-document.ts';
import { planBinder, writeBinderPages } from '../src/lib/binder-ai.ts';
import type { BinderInput, BinderPage, BinderPlan } from '../src/lib/binder-types.ts';

const profile: Profile = { id: 'student', role: 'student', division: 'C', displayName: 'Ada', schoolId: 'one', schoolName: 'First School', schoolCommunityId: null, schoolCommunityName: null };
const other: Profile = { ...profile, id: 'other', schoolId: 'two', schoolName: 'Other School', division: 'B' };
const input: BinderInput = { eventId: 'dynamic-planet', title: 'Freshwater study binder', pageCount: 10, level: 'national', notes: '', uploads: [] };
const plan: BinderPlan = { sections: ['Hydrology', 'Rivers', 'Groundwater'].map((title, s) => ({ title, topics: Array.from({ length: 3 }, (_, i) => `${title} topic ${s * 3 + i + 1}`) })) };
function page(heading: string): BinderPage {
  return { heading, paragraphs: Array.from({ length: 4 }, () => 'A water budget relates changes in storage to inflows and outflows. Preserve units when comparing precipitation, discharge, and evaporation across a drainage basin. '.repeat(4)), table: { headers: [], rows: [] }, figure: { title: 'Water storage schematic', caption: 'Reservoirs and fluxes in a simplified watershed.', shapes: [{ kind: 'rect', x: 200, y: 60, w: 120, h: 70, color: 0 }, { kind: 'line', x: 100, y: 50, w: 100, h: 40, color: 1 }], labels: [{ text: 'Inflow', x: 40, y: 35, targetX: 150, targetY: 75 }, { text: 'Reservoir', x: 380, y: 160, targetX: 260, targetY: 100 }] }, imageIndex: -1, imageCaption: '', sources: ['2027 Dynamic Planet C, section 3.a', 'General scientific background'] };
}
const ai = { plan: async () => plan, pages: async (_: BinderInput, p: BinderPlan, offset: number) => p.sections.flatMap(s => s.topics).slice(offset, offset + 2).map(page) };
function fixture() {
  const raw = new DatabaseSync(':memory:'); for (const sql of schema) raw.exec(sql);
  const db: Database = {
    async get(sql, ...args) { return raw.prepare(sql).get(...args) as Awaited<ReturnType<Database['get']>>; },
    async all(sql, ...args) { return raw.prepare(sql).all(...args) as Awaited<ReturnType<Database['all']>>; },
    async batch(statements) { raw.exec('BEGIN IMMEDIATE'); try { const result = statements.map(({ sql, args }) => ({ rowsAffected: Number(raw.prepare(sql).run(...args).changes), rows: [] })); raw.exec('COMMIT'); return result; } catch (e) { raw.exec('ROLLBACK'); throw e; } },
  }; return { db, raw };
}
test('only the six existing C binder events; integer page cap and real file signatures', () => {
  assert.deepEqual(binderEvents.map(e => e.id).sort(), ['astronomy','circuit-lab','dynamic-planet','remote-sensing','rocks-and-minerals','thermodynamics'].sort());
  assert.equal(parseBinderInput({ ...input, pageCount: 400 }).pageCount, 400);
  for (const pageCount of [9, 401, 10.1, '50', NaN]) assert.throws(() => parseBinderInput({ ...input, pageCount }));
  assert.throws(() => parseBinderInput({ ...input, eventId: 'botany' }));
  assert.throws(() => parseBinderInput({ ...input, uploads: [{ name: 'bad.pdf', mime: 'application/pdf', data: Buffer.from('not a PDF').toString('base64') }] }));
  assert.equal(parseBinderInput({ ...input, uploads: [{ name: 'notes.pdf', mime: 'application/pdf', data: Buffer.from('%PDF-1.7\n').toString('base64') }] }).uploads.length, 1);
});
test('rejects padded outlines, sparse pages, unsafe coordinates, and arbitrary image references', () => {
  assert.deepEqual(parseBinderPlan(plan, 10), plan);
  assert.throws(() => parseBinderPlan(plan, 400));
  assert.throws(() => parseBinderPlan({ sections: [plan.sections[0], plan.sections[0], plan.sections[0]] }, 10));
  assert.equal(parseBinderPage(page('topic'), 0).heading, 'topic');
  assert.throws(() => parseBinderPage({ ...page('topic'), paragraphs: ['x','y','z'] }, 0));
  assert.throws(() => parseBinderPage({ ...page('topic'), imageIndex: 0 }, 0));
  const bad = page('topic'); bad.figure.shapes[0].x = Infinity;
  assert.throws(() => parseBinderPage(bad, 0));
});
test('resumable generation, school attribution, complete-only publish, global access and private uploads', async () => {
  const { db, raw } = fixture();
  try {
    await assert.rejects(createBinder(db, other, input), /Only Division C/);
    let job = await createBinder(db, profile, input);
    await assert.rejects(createBinder(db, profile, input), /Resume or cancel/);
    await assert.rejects(readBinder(db, other, job.id), /not available/);
    await assert.rejects(publishBinder(db, profile, job.id), /Finish every page/);
    await assert.rejects(advanceBinder(db, { ...profile, id: 'stranger' }, job.id, ai), /busy/);
    await advanceBinder(db, profile, job.id, ai);
    job = await advanceBinder(db, profile, job.id, ai);
    assert.equal(job.completedPages, 2);
    await assert.rejects(advanceBinder(db, profile, job.id, { ...ai, pages: async () => { throw new Error('provider offline'); } }), /provider offline/);
    assert.equal((await readBinder(db, profile, job.id)).pages.length, 2);
    for (let i = 0; i < 4; i++) job = await advanceBinder(db, profile, job.id, ai);
    assert.equal(job.status, 'ready'); assert.equal(job.completedPages, 9);
    const published = await publishBinder(db, profile, job.id);
    assert.equal(published.schoolName, 'First School'); assert.ok(published.generatedAt);
    assert.equal((await readBinder(db, other, job.id)).pages.length, 9);
    assert.equal((await listBinders(db, { ...other, role: 'instructor' }, null, null)).binders.length, 1);
    assert.equal((await listBinders(db, other, 'astronomy', null)).binders.length, 0);
    assert.equal(raw.prepare('SELECT input_json FROM binders WHERE id=?').get(job.id)?.input_json, '{}');
    const html = binderDocument(published);
    assert.equal((html.match(/class="page(?: toc)?"/g) ?? []).length, 10);
    assert.ok(html.includes('href="#page-5"')); assert.ok(!html.includes(published.generatedAt!)); assert.ok(!html.includes('First School'));
    assert.ok(binderDocument({ ...published, title: '<script>alert(1)</script>' }).includes('&lt;script&gt;'));
  } finally { raw.close(); }
});
test('atomic lease prevents duplicate batches; cancel invalidates in-flight results', async () => {
  const { db, raw } = fixture();
  try {
    const job = await createBinder(db, profile, input); await advanceBinder(db, profile, job.id, ai);
    let release!: () => void, started!: () => void;
    const pending = new Promise<void>(r => { release = r; }), ready = new Promise<void>(r => { started = r; });
    const work = advanceBinder(db, profile, job.id, { ...ai, pages: async (input, plan, offset) => { started(); await pending; return ai.pages(input, plan, offset); } });
    await ready;
    await assert.rejects(advanceBinder(db, profile, job.id, ai), /busy/);
    await cancelBinder(db, profile, job.id); release(); await work;
    assert.equal((await readBinder(db, profile, job.id)).pages.length, 0);
    assert.equal((await listBinders(db, profile, null, null)).jobs.length, 0);
    await createBinder(db, profile, input);
  } finally { raw.close(); }
});
test('Gemini receives rule scope, untrusted files, exact page tasks, and rejects truncation', async () => {
  let body: Record<string, unknown> = {};
  const fetcher: typeof fetch = async (_url, init) => { body = JSON.parse(String(init?.body)); return new Response(JSON.stringify({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify(plan) }] } }] })); };
  await planBinder(input, { apiKey: 'test', fetcher });
  assert.ok(JSON.stringify(body).includes('fresh waters'));
  assert.ok(JSON.stringify(body).includes('exactly 9'));
  const truncated: typeof fetch = async () => new Response(JSON.stringify({ candidates: [{ finishReason: 'MAX_TOKENS' }] }));
  await assert.rejects(planBinder(input, { apiKey: 'test', fetcher: truncated }), /could not finish/);
  const invalid: typeof fetch = async () => new Response(JSON.stringify({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify({ pages: [page('wrong topic')] }) }] } }] }));
  await assert.rejects(writeBinderPages(input, plan, 0, { apiKey: 'test', fetcher: invalid }), /content requirements/);
});
