import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { eventsForDivision } from '../src/lib/events.ts';
import { eventToolIds } from '../src/lib/event-rules.ts';
import {
  blankCourse,
  buildEvent,
  parseCourse,
  parseGrade,
  courseSvg,
  type BuildGrade,
} from '../src/lib/build-events.ts';
import { runBuildAI, signBuildTicket, readBuildTicket } from '../src/lib/build-ai.ts';

const grade: BuildGrade = {
  summary: 'The finish measurement is obscured.',
  score: null,
  scoreLabel: 'Run score',
  direction: 'Lower wins',
  formula: 'Use the event formula',
  calculation: 'Cannot substitute an unknown distance',
  tier: 'Unverified',
  criteria: [
    {
      name: 'Finish distance',
      rule: 'Scoring',
      evidence: 'Not readable',
      timestamp: '00:05',
      value: 'Unknown',
      status: 'unverifiable',
    },
  ],
  penalties: [],
  missing: ['Finish distance'],
  improvements: ['Film the ruler at the finish.'],
};
test('every B/C event with either build tab has a division-bound course and a bundled rules PDF', () => {
  let count = 0;
  for (const division of ['B', 'C'] as const)
    for (const event of eventsForDivision(division)) {
      const tools = eventToolIds(division, event);
      if (!tools.includes('video-grader') && !tools.includes('course-generator')) continue;
      count++;
      const course = blankCourse(division, event.id);
      assert.deepEqual(parseCourse(JSON.parse(JSON.stringify(course)), division, event.id), course);
      assert.ok(existsSync(`public/rules/2027/${division.toLowerCase()}/${event.id}.pdf`));
    }
  assert.equal(count, 17);
  assert.throws(() => buildEvent('B', 'electric-vehicle'));
  assert.throws(() => buildEvent('C', 'scrambler'));
  assert.throws(() => buildEvent('C', 'astronomy'));
});
test('course imports reject cross-division, season, malformed geometry and unexpected parameter keys', () => {
  const course = blankCourse('C', 'electric-vehicle');
  for (const bad of [
    null,
    { ...course, division: 'B' },
    { ...course, season: 2026 },
    { ...course, parameters: { ...course.parameters, untrusted: 'override' } },
    {
      ...course,
      diagram: { view: 'bad', nodes: [{ label: 'bad', x: Infinity, y: 5 }], edges: [] },
    },
    { ...course, diagram: { view: 'bad', nodes: [], edges: [{ from: 0, to: 9, label: 'bad' }] } },
  ])
    assert.throws(() => parseCourse(bad, 'C', 'electric-vehicle'));
});
test('SVG export escapes imported labels and includes every setup parameter', () => {
  const course = blankCourse('B', 'boomilever');
  course.title = '<script>alert(1)</script>';
  course.diagram.nodes = [{ label: '<image onload="bad"/>', x: 10, y: 20 }];
  const svg = courseSvg(course);
  assert.ok(!svg.includes('<script>'));
  assert.ok(!svg.includes('<image '));
  assert.ok(svg.includes('&lt;script&gt;'));
  for (const label of Object.keys(course.parameters)) assert.ok(svg.includes(label));
});
test('crowded course points retain geometry and receive separated markers and a complete label key', () => {
  const course = blankCourse('B', 'scrambler');
  course.diagram.nodes = Array.from({ length: 20 }, (_, i) => ({
    label: `Station ${i + 1}: a long label with dimensions and apparatus details`,
    x: 50,
    y: 50,
  }));
  course.diagram.edges = Array.from({ length: 19 }, (_, i) => ({
    from: i,
    to: i + 1,
    label: 'Distance 5.00 m',
  }));
  const svg = courseSvg(course);
  const markers = [
    ...svg.matchAll(/data-course-marker="\d+"><circle cx="([\d.]+)" cy="([\d.]+)"/g),
  ].map((m) => ({ x: Number(m[1]), y: Number(m[2]) }));
  assert.equal(markers.length, 20);
  markers.forEach((m, i) =>
    markers.slice(i + 1).forEach((other) => {
      assert.ok(Math.hypot(m.x - other.x, m.y - other.y) >= 38);
    }),
  );
  for (let i = 1; i <= 20; i++) assert.ok(svg.includes(`${i}. Station ${i}:`));
  assert.equal((svg.match(/Distance 5.00 m/g) ?? []).length, 19);
  assert.ok(!svg.includes('NaN'));
});

test('grading cannot return a numeric score with missing evidence or invalid criterion status', () => {
  assert.deepEqual(parseGrade(grade), grade);
  assert.throws(() => parseGrade({ ...grade, score: 0 }));
  assert.throws(() => parseGrade({ ...grade, missing: [], score: NaN }));
  assert.throws(() =>
    parseGrade({ ...grade, criteria: [{ ...grade.criteria[0], status: 'guessed' }] }),
  );
});
test('upload tickets reject tampering, expiry and another student', () => {
  const previous = process.env.GEMINI_API_KEY;
  process.env.GEMINI_API_KEY = 'build-tools-test-key';
  try {
    const token = signBuildTicket({ owner: 'alice', name: 'files/abc', mime: 'video/webm' });
    assert.equal(readBuildTicket(token, 'alice').name, 'files/abc');
    assert.throws(() => readBuildTicket(token, 'bob'));
    assert.throws(() => readBuildTicket('x' + token, 'alice'));
    const original = Date.now;
    try {
      Date.now = () => original() + 61 * 60 * 1000;
      assert.throws(() => readBuildTicket(token, 'alice'));
    } finally {
      Date.now = original;
    }
  } finally {
    if (previous === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = previous;
  }
});
test('Gemini receives the server PDF for the right division and validates complete structured output', async () => {
  const previous = process.env.GEMINI_API_KEY;
  process.env.GEMINI_API_KEY = 'build-tools-test-key';
  try {
    const course = blankCourse('B', 'scrambler');
    const generated = {
      ...course,
      parameters: Object.fromEntries(
        Object.keys(course.parameters).map((k) => [k, 'Example fixture value']),
      ),
      setup: ['Use this practice setup.'],
      ruleReferences: ['Course setup section'],
      diagram: {
        view: 'Schematic, not to scale',
        nodes: [
          { label: 'Start', x: 10, y: 50 },
          { label: 'Target', x: 90, y: 50 },
        ],
        edges: [{ from: 0, to: 1, label: 'Distance' }],
      },
    };
    const fake = (result: unknown) => async (_url: unknown, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body));
      const parts = body.contents[0].parts;
      assert.equal(parts[1].inlineData.mimeType, 'application/pdf');
      assert.ok(
        Buffer.from(parts[1].inlineData.data, 'base64').subarray(0, 4).toString() === '%PDF',
      );
      assert.equal(JSON.parse(parts[2].text).course.division, 'B');
      assert.ok(body.generationConfig.responseJsonSchema);
      assert.ok(body.systemInstruction.parts[0].text.includes('untrusted data'));
      return new Response(
        JSON.stringify({
          candidates: [
            {
              finishReason: 'STOP',
              content: {
                parts: [{ thought: true, text: 'ignore' }, { text: JSON.stringify(result) }],
              },
            },
          ],
        }),
      );
    };
    assert.deepEqual(
      await runBuildAI(course, 'course', [], fake(generated) as typeof fetch),
      generated,
    );
    assert.deepEqual(
      await runBuildAI(
        course,
        'grade',
        [{ fileData: { mimeType: 'video/webm', fileUri: 'fixture' } }],
        fake(grade) as typeof fetch,
      ),
      grade,
    );
    await assert.rejects(
      runBuildAI(course, 'course', [], fake({ ...generated, division: 'C' }) as typeof fetch),
    );
    await assert.rejects(
      runBuildAI(
        course,
        'course',
        [],
        fake({
          ...generated,
          diagram: { ...generated.diagram, nodes: [], edges: [] },
        }) as typeof fetch,
      ),
    );
    await assert.rejects(
      runBuildAI(course, 'grade', [], fake({ ...grade, score: 100 }) as typeof fetch),
    );
    await assert.rejects(
      runBuildAI(
        course,
        'grade',
        [],
        (async () => new Response('{}', { status: 429 })) as typeof fetch,
      ),
    );
  } finally {
    if (previous === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = previous;
  }
});
