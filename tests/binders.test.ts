import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { schema } from '../src/lib/schema.ts';
import type { Database } from '../src/lib/school-service.ts';
import type { Profile } from '../src/lib/domain.ts';
import {
  binderContentPages,
  binderEvents,
  binderEventsByDivision,
  binderRecommendations,
  binderTocPages,
  binderTopics,
  mergeBinderTopics,
  parseBinderInput,
  parseBinderOutline,
  parseBinderPage,
} from '../src/lib/binders.ts';
import {
  createBinder,
  advanceBinder,
  readBinder,
  listBinders,
  publishBinder,
  cancelBinder,
} from '../src/lib/binder-service.ts';
import { binderDiagramSvg, binderDocument } from '../src/lib/binder-document.ts';
import { outlineBinder, writeBinderPages } from '../src/lib/binder-ai.ts';
import { findBinderPhoto } from '../src/lib/binder-images.ts';
import type { BinderInput, BinderPage, BinderPlan } from '../src/lib/binder-types.ts';

const profile: Profile = {
  id: 'student',
  role: 'student',
  division: 'C',
  displayName: 'Ada',
  schoolId: 'one',
  schoolName: 'First School',
  schoolCommunityId: null,
  schoolCommunityName: null,
};
const other: Profile = {
  ...profile,
  id: 'other',
  schoolId: 'two',
  schoolName: 'Other School',
  division: 'B',
};
const input: BinderInput = {
  eventId: 'dynamic-planet',
  division: 'C',
  title: 'Freshwater study binder',
  pageCount: 10,
  level: 'national',
  notes: '',
  uploads: [],
};
const outline: BinderPlan = {
  sections: ['Hydrology', 'Rivers', 'Groundwater'].map((title) => ({
    title,
    focus: `${title} rule areas`,
    pages: 3,
    topics: [],
  })),
};
const plan: BinderPlan = {
  sections: outline.sections.map((s, n) => ({
    ...s,
    topics: Array.from({ length: 3 }, (_, i) => `${s.title} topic ${n * 3 + i + 1}`),
  })),
};
const prose =
  'A water budget relates changes in storage to inflows and outflows. Preserve units when comparing precipitation, discharge, and evaporation across a drainage basin. ';
function page(heading: string): BinderPage {
  return {
    heading,
    paragraphs: Array.from({ length: 4 }, () => prose.repeat(3).trim()),
    takeaways: ['Storage change equals inflow minus outflow.', 'Keep units consistent.'],
    table: { headers: [], rows: [] },
    diagram: {
      kind: 'flow',
      title: 'Water budget',
      caption: 'Follow the water from input to storage.',
      items: [
        { label: 'Precipitation', detail: 'Water enters the basin.' },
        { label: 'Storage', detail: 'Soil and aquifers hold water.' },
        { label: 'Discharge', detail: 'Streams carry water out.' },
      ],
      xLabel: '',
      yLabel: '',
      series: [],
    },
    imageIndex: -1,
    imageCaption: '',
    photoQuery: '',
    photo: null,
    sources: ['2027 Dynamic Planet C, section 3.a'],
  };
}
const ai = {
  outline: async () => outline,
  topics: async (_: BinderInput, p: BinderPlan, index: number) => ({
    topics: plan.sections[index].topics.slice(p.sections[index].topics.length),
  }),
  pages: async (_: BinderInput, p: BinderPlan, offset: number) =>
    binderTopics(p)
      .slice(offset, offset + 4)
      .map(page),
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
const gemini = (value: unknown) =>
  new Response(
    JSON.stringify({
      candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify(value) }] } }],
    }),
  );
const commons = (files: { title: string; license: string; index: number }[]) =>
  new Response(
    JSON.stringify({
      query: {
        pages: Object.fromEntries(
          files.map((f, i) => [
            i,
            {
              index: f.index,
              title: `File:${f.title}.jpg`,
              imageinfo: [
                {
                  thumburl: `https://upload.wikimedia.org/thumb/${i}.jpg`,
                  descriptionurl: `https://commons.wikimedia.org/wiki/File:${i}.jpg`,
                  mime: 'image/jpeg',
                  width: 1200,
                  height: 900,
                  extmetadata: {
                    LicenseShortName: { value: f.license },
                    Artist: { value: '<a href="//x">Ansel <b>Adams</b></a>' },
                  },
                },
              ],
            },
          ]),
        ),
      },
    }),
  );

test('six binder events per division; integer page cap and real file signatures', () => {
  assert.deepEqual(
    binderEventsByDivision.B.map((e) => e.id).sort(),
    [
      'circuit-lab',
      'dynamic-planet',
      'meteorology',
      'remote-sensing',
      'rocks-and-minerals',
      'thermodynamics',
    ].sort(),
  );
  assert.equal(parseBinderInput({ ...input, eventId: 'meteorology' }, 'B').division, 'B');
  assert.throws(() => parseBinderInput({ ...input, eventId: 'meteorology' }));
  assert.throws(() => parseBinderInput({ ...input, eventId: 'astronomy' }, 'B'));
  assert.deepEqual(
    binderEvents.map((e) => e.id).sort(),
    [
      'astronomy',
      'circuit-lab',
      'dynamic-planet',
      'remote-sensing',
      'rocks-and-minerals',
      'thermodynamics',
    ].sort(),
  );
  assert.equal(parseBinderInput({ ...input, pageCount: 400 }).pageCount, 400);
  for (const pageCount of [9, 401, 10.1, '50', NaN])
    assert.throws(() => parseBinderInput({ ...input, pageCount }));
  assert.throws(() => parseBinderInput({ ...input, eventId: 'botany' }));
  assert.throws(() =>
    parseBinderInput({
      ...input,
      uploads: [
        {
          name: 'bad.pdf',
          mime: 'application/pdf',
          data: Buffer.from('not a PDF').toString('base64'),
        },
      ],
    }),
  );
  assert.equal(
    parseBinderInput({
      ...input,
      uploads: [
        {
          name: 'notes.pdf',
          mime: 'application/pdf',
          data: Buffer.from('%PDF-1.7\n').toString('base64'),
        },
      ],
    }).uploads.length,
    1,
  );
});
test('page guidance separates compact events from large study events, all within 10–400', () => {
  for (const event of [...binderEventsByDivision.B, ...binderEventsByDivision.C]) {
    const r = binderRecommendations[event.id];
    assert.ok(r.min >= 10 && r.min <= r.suggested && r.suggested <= r.max && r.max <= 400);
  }
  for (const id of ['circuit-lab', 'thermodynamics'])
    assert.equal(binderRecommendations[id].max, 60);
  for (const id of ['dynamic-planet', 'rocks-and-minerals'])
    assert.equal(binderRecommendations[id].max, 400);
});
test('contents pages scale with the binder and leave the rest for content', () => {
  assert.equal(binderTocPages(10), 1);
  assert.equal(binderContentPages(10), 9);
  assert.equal(binderTocPages(60), 2);
  assert.equal(binderTocPages(400), 5);
  assert.equal(binderContentPages(400), 395);
});
test('outline shares pages exactly; topics merge without repeats or overflow', () => {
  const shared = parseBinderOutline(
    {
      sections: [
        { title: 'Minerals', focus: 'x', pages: 200 },
        { title: 'Igneous', focus: 'x', pages: 70 },
        { title: 'minerals', focus: 'duplicate title', pages: 50 },
        { title: 'Sedimentary', focus: 'x', pages: 0 },
        { title: 'Metamorphic', focus: 'x', pages: 30 },
      ],
    },
    395,
  );
  assert.deepEqual(
    shared.sections.map((s) => s.title),
    ['Minerals', 'Igneous', 'Sedimentary', 'Metamorphic'],
  );
  assert.equal(
    shared.sections.reduce((n, s) => n + s.pages, 0),
    395,
  );
  assert.ok(shared.sections.every((s) => s.pages >= 1));
  assert.throws(() => parseBinderOutline({ sections: [{ title: 'Only one', pages: 9 }] }, 9));
  const first = mergeBinderTopics(outline, 0, {
    topics: ['Water budgets', 'water budgets', 'Runoff'],
  });
  assert.equal(first.added, 2);
  const second = mergeBinderTopics(first.plan, 1, { topics: ['Runoff', 'Stream order'] });
  assert.deepEqual(second.plan.sections[1].topics, ['Stream order']);
  const full = mergeBinderTopics(second.plan, 0, { topics: ['A', 'B', 'C'] });
  assert.deepEqual(full.plan.sections[0].topics, ['Water budgets', 'Runoff', 'A']);
  assert.equal(mergeBinderTopics(full.plan, 0, { topics: ['D'] }).added, 0);
});
test('pages are trimmed to fit instead of rejected, but thin pages and label-free diagrams fail', () => {
  const parsed = parseBinderPage(
    {
      ...page('ignored'),
      paragraphs: [...page('x').paragraphs, 'x'.repeat(2000)],
      table: { headers: ['Only one'], rows: [['a']] },
      diagram: { ...page('x').diagram, kind: 'spiral', title: 't'.repeat(200) },
      imageIndex: 3,
      photoQuery: 'galena <crystal> "specimen"',
    },
    'Assigned topic',
    0,
  );
  assert.equal(parsed.heading, 'Assigned topic');
  assert.ok(parsed.paragraphs.every((p) => p.length <= 900));
  assert.deepEqual(parsed.table, { headers: [], rows: [] });
  assert.equal(parsed.diagram.kind, 'flow');
  assert.equal(parsed.diagram.title.length, 90);
  assert.equal(parsed.imageIndex, -1);
  assert.ok(!/[<>"]/.test(parsed.photoQuery));
  const plot = parseBinderPage(
    {
      ...page('x'),
      diagram: {
        ...page('x').diagram,
        kind: 'plot',
        items: [],
        series: [
          {
            name: 'Stage',
            points: [
              { x: 0, y: 1 },
              { x: 'bad', y: 2 },
              { x: 2, y: 5 },
            ],
          },
        ],
      },
    },
    'Hydrograph',
    0,
  );
  assert.equal(plot.diagram.series[0].points.length, 2);
  assert.throws(() => parseBinderPage({ ...page('x'), paragraphs: ['x', 'y', 'z'] }, 't', 0));
  assert.throws(() =>
    parseBinderPage({ ...page('x'), diagram: { ...page('x').diagram, items: [] } }, 't', 0),
  );
});
test('resumable generation, school attribution, complete-only publish, global access and private uploads', async () => {
  const { db, raw } = fixture();
  try {
    await assert.rejects(
      createBinder(db, { ...other, role: 'instructor' }, input),
      /Only Division B and C/,
    );
    let job = await createBinder(db, profile, input);
    await assert.rejects(createBinder(db, profile, input), /Resume or cancel/);
    await assert.rejects(readBinder(db, other, job.id), /not available/);
    await assert.rejects(publishBinder(db, profile, job.id), /Finish every page/);
    await assert.rejects(advanceBinder(db, { ...profile, id: 'stranger' }, job.id, ai), /busy/);
    job = await advanceBinder(db, profile, job.id, ai);
    assert.equal(job.plannedPages, 0);
    await assert.rejects(
      advanceBinder(db, profile, job.id, { ...ai, topics: async () => ({ topics: [] }) }),
      /already planned/,
    );
    job = await advanceBinder(db, profile, job.id, ai);
    assert.equal(job.plannedPages, 3);
    for (let i = 0; i < 2; i++) job = await advanceBinder(db, profile, job.id, ai);
    assert.equal(job.plannedPages, undefined);
    job = await advanceBinder(db, profile, job.id, ai);
    assert.equal(job.completedPages, 4);
    await assert.rejects(
      advanceBinder(db, profile, job.id, {
        ...ai,
        pages: async () => {
          throw new Error('provider offline');
        },
      }),
      /provider offline/,
    );
    assert.equal((await readBinder(db, profile, job.id)).pages.length, 4);
    for (let i = 0; i < 2; i++) job = await advanceBinder(db, profile, job.id, ai);
    assert.equal(job.status, 'ready');
    assert.equal(job.completedPages, 9);
    const published = await publishBinder(db, profile, job.id);
    assert.equal(published.schoolName, 'First School');
    assert.ok(published.generatedAt);
    assert.equal((await readBinder(db, other, job.id)).pages.length, 9);
    const library = await listBinders(db, { ...other, role: 'instructor' }, null, null);
    assert.equal(library.binders.length, 1);
    assert.equal(library.binders[0].schoolName, 'First School');
    assert.equal(library.binders[0].generatedAt, published.generatedAt);
    assert.equal((await listBinders(db, other, 'astronomy', null)).binders.length, 0);
    assert.equal(
      raw.prepare('SELECT input_json FROM binders WHERE id=?').get(job.id)?.input_json,
      '{}',
    );
    const html = binderDocument(published);
    assert.equal((html.match(/class="page(?: toc)?"/g) ?? []).length, 10);
    assert.equal((html.match(/class="tab"/g) ?? []).length, 9);
    assert.equal((html.match(/class="toc-topic"/g) ?? []).length, 9);
    assert.ok(html.includes('href="#page-5"') && html.includes('Table of contents'));
    assert.ok(!html.includes(published.generatedAt!) && !html.includes('First School'));
    assert.ok(
      binderDocument({ ...published, title: '<script>alert(1)</script>' }).includes(
        '&lt;script&gt;',
      ),
    );
  } finally {
    raw.close();
  }
});
test('Division B binders follow Division B rules and can be filtered by division', async () => {
  const { db, raw } = fixture();
  try {
    const meteorology = { ...input, eventId: 'meteorology', division: 'B' as const };
    await assert.rejects(createBinder(db, profile, meteorology), /Division C event/);
    const job = await createBinder(db, other, meteorology);
    assert.equal(job.division, 'B');
    assert.equal((await listBinders(db, other, 'meteorology', null, 'B')).jobs.length, 1);
    assert.equal((await listBinders(db, other, null, null, 'C')).jobs.length, 0);
    await assert.rejects(listBinders(db, other, 'astronomy', null, 'B'), /Division B event/);
    await assert.rejects(listBinders(db, other, null, null, 'A'), /Division B or C/);
  } finally {
    raw.close();
  }
  let body = '';
  await outlineBinder(
    { ...input, eventId: 'meteorology', division: 'B' },
    {
      apiKey: 'test',
      fetcher: async (_url, init) => {
        body = String(init?.body);
        return gemini(outline);
      },
    },
  );
  assert.ok(body.includes('METEOROLOGY B') && body.includes('Saffir-Simpson'));
  assert.ok(body.includes('\\"division\\":\\"B\\"'));
});
test('atomic lease prevents duplicate batches; cancel invalidates in-flight results', async () => {
  const { db, raw } = fixture();
  try {
    const job = await createBinder(db, profile, input);
    for (let i = 0; i < 4; i++) await advanceBinder(db, profile, job.id, ai);
    let release!: () => void, started!: () => void;
    const pending = new Promise<void>((r) => {
        release = r;
      }),
      ready = new Promise<void>((r) => {
        started = r;
      });
    const work = advanceBinder(db, profile, job.id, {
      ...ai,
      pages: async (input, plan, offset) => {
        started();
        await pending;
        return ai.pages(input, plan, offset);
      },
    });
    await ready;
    await assert.rejects(advanceBinder(db, profile, job.id, ai), /busy/);
    await cancelBinder(db, profile, job.id);
    release();
    await work;
    assert.equal((await readBinder(db, profile, job.id)).pages.length, 0);
    assert.equal((await listBinders(db, profile, null, null)).jobs.length, 0);
    await createBinder(db, profile, input);
  } finally {
    raw.close();
  }
});
test('Gemini receives rule scope and exact tasks; truncation fails; pages gain credited photos', async () => {
  let body = '';
  const outlined = await outlineBinder(input, {
    apiKey: 'test',
    fetcher: async (_url, init) => {
      body = String(init?.body);
      return gemini(outline);
    },
  });
  assert.ok(body.includes('fresh waters') && body.includes('9-page'));
  assert.equal(outlined.sections.length, 3);
  await assert.rejects(
    outlineBinder(input, {
      apiKey: 'test',
      fetcher: async () =>
        new Response(JSON.stringify({ candidates: [{ finishReason: 'MAX_TOKENS' }] })),
    }),
    /could not finish/,
  );
  const urls: string[] = [];
  const fetcher: typeof fetch = async (url) => {
    urls.push(String(url));
    if (String(url).includes('commons.wikimedia.org'))
      return commons([{ title: 'Oxbow lake aerial', license: 'CC BY-SA 4.0', index: 1 }]);
    return gemini({
      pages: binderTopics(plan)
        .slice(0, 4)
        .map((_, i) => ({ ...page('model heading'), photoQuery: i === 3 ? '' : 'oxbow lake' })),
    });
  };
  const pages = await writeBinderPages(input, plan, 0, { apiKey: 'test', fetcher });
  assert.deepEqual(
    pages.map((p) => p.heading),
    binderTopics(plan).slice(0, 4),
  );
  assert.equal(urls.filter((u) => u.includes('commons')).length, 3);
  // One file is never repeated within a batch, and a page without a query gets none.
  assert.deepEqual(
    pages.map((p) => p.photo?.title ?? null),
    ['Oxbow lake aerial', null, null, null],
  );
  assert.equal(pages[0].photo?.author, 'Ansel Adams');
  await assert.rejects(
    writeBinderPages(input, plan, 0, {
      apiKey: 'test',
      fetcher: async () => gemini({ pages: [page('only one')] }),
    }),
    /content requirements/,
  );
});
test('photo search keeps only reusable licences and falls back to the subject words', async () => {
  const queries: string[] = [];
  const fetcher: typeof fetch = async (url) => {
    const query = new URL(String(url)).searchParams.get('gsrsearch')!;
    queries.push(query);
    return query.startsWith('galena crystal specimen photo')
      ? commons([])
      : commons([
          { title: 'Lead mine', license: 'CC BY 4.0', index: 1 },
          { title: 'Galena press photo', license: 'Fair use', index: 2 },
          { title: 'Galena crystal', license: 'Public domain', index: 3 },
        ]);
  };
  const photo = await findBinderPhoto('galena crystal specimen photo', fetcher);
  assert.equal(queries.length, 2);
  assert.ok(queries[1].startsWith('galena crystal specimen filetype'));
  assert.equal(photo?.title, 'Galena crystal');
  assert.equal(photo?.license, 'Public domain');
  assert.ok(photo?.source.startsWith('https://commons.wikimedia.org/'));
  assert.equal(await findBinderPhoto('x', async () => new Response('nope', { status: 500 })), null);
  assert.equal(
    await findBinderPhoto('x', async () => {
      throw new Error('offline');
    }),
    null,
  );
});
test('every diagram kind renders escaped, labeled SVG', () => {
  const items = ['<b>Epilimnion</b>', 'Metalimnion', 'Hypolimnion', 'Sediment'].map((label) => ({
    label,
    detail: 'Warm, mixed, oxygen-rich surface water above the thermocline in summer.',
  }));
  for (const kind of ['flow', 'cycle', 'layers', 'compare', 'scale'] as const) {
    const svg = binderDiagramSvg({ ...page('x').diagram, kind, items });
    assert.ok(
      svg.startsWith('<svg') && svg.includes('&lt;b&gt;Epilimnion') && !svg.includes('<b>'),
    );
    assert.equal((svg.match(/Metalimnion/g) ?? []).length, 1);
  }
  const plot = binderDiagramSvg({
    ...page('x').diagram,
    kind: 'plot',
    xLabel: 'Temperature (K)',
    yLabel: 'Luminosity (L☉)',
    series: [
      {
        name: 'Main sequence',
        points: [
          { x: 3000, y: 0.001 },
          { x: 6000, y: 1 },
          { x: 30000, y: 100000 },
        ],
      },
    ],
  });
  assert.ok(plot.includes('Temperature (K)') && plot.includes('10⁵') && plot.includes('polyline'));
  assert.ok(!plot.includes('NaN'));
});
