import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import {
  practiceTests,
  publicPracticePaper,
  validatePracticeCatalog,
} from '../src/lib/practice-catalog.ts';
import { gradePractice } from '../src/lib/practice-grading.ts';
import { gradeWrittenWithGemini } from '../src/lib/practice-ai.ts';
import { rankedQuestionPool } from '../src/lib/ranked-builder.ts';

const papers = practiceTests.filter((p) => p.id.startsWith('akoizo-2027-rotation-'));
const read = (p: string) => readFileSync(new URL('../' + p, import.meta.url));
const hash = (b: Uint8Array) => createHash('sha256').update(b).digest('hex');
const manifest = JSON.parse(read('documents/practice-rotation-2027-assets.json').toString());
const audit = JSON.parse(read('documents/practice-rotation-2027-audit.json').toString());

test('all44 rotation papers retain original IDs and add12 figure-dependent questions with complete keys', () => {
  assert.equal(papers.length, 44);
  for (const p of papers) {
    assert.ok(
      rankedQuestionPool(p.division, p.eventId)
        .filter((c) => c.question.figure)
        .every((c) => c.usesPaper && c.test.paperUrl),
      'Figure-dependent items enter ranked tests only with their source paper beside them.',
    );
    assert.equal(p.questionCount, 32, p.id);
    assert.deepEqual(
      p.questions.map((q) => q.id),
      Array.from({ length: 32 }, (_, i) => String(i + 1)),
    );
    const visuals = p.questions.slice(20);
    assert.equal(visuals.length, 12);
    assert.equal(new Set(visuals.map((q) => q.figure?.url)).size, 4);
    for (const q of visuals) {
      assert.ok(q.figure?.description && q.figure.alt && q.figure.caption);
      assert.match(q.prompt!, /^Use Figure F[1-4]\./);
      assert.equal('keys' in publicPracticePaper(p), false);
      assert.ok(p.keys[q.id].criteria?.every((c) => c.answer && c.points > 0));
    }
  }
});

test('every embedded figure has verified original SVG and high-resolution PNG assets', () => {
  let count = 0;
  for (const p of papers) {
    const entry = manifest.find((m: { id: string }) => m.id === p.id);
    assert.equal(entry.figures.length, 4);
    for (const figure of entry.figures) {
      const data = read('public' + figure.url),
        svg = read('public' + figure.url.replace('.png', '.svg'));
      assert.equal(data.subarray(1, 4).toString(), 'PNG');
      assert.equal(data.readUInt32BE(16), 1440);
      assert.equal(data.readUInt32BE(20), 800);
      assert.equal(hash(data), figure.sha256);
      assert.equal(hash(svg), figure.sourceSha256);
      assert.doesNotMatch(svg.toString(), /<script|https?:\/\/[^w]|<image\b/i);
      assert.ok(svg.toString().includes('<title>'));
      count++;
    }
  }
  assert.equal(count, 176);
});

test('adding visual stations preserves required section point weightings', () => {
  for (const p of papers) {
    const fields = audit.find((a: { id: string }) => a.id === p.id).fields;
    const points = (section: string) =>
      p.questions
        .filter((q) => fields.find((f: { id: string }) => f.id === q.id).section === section)
        .reduce((s, q) => s + q.points, 0);
    if (p.eventId === 'chemistry-lab')
      assert.deepEqual([points('gases'), points('kinetics')], [p.maxScore / 2, p.maxScore / 2]);
    if (p.eventId === 'water-quality')
      assert.deepEqual(
        ['ecology', 'organisms', 'monitoring', 'salinometer'].map((s) => points(s) / p.maxScore),
        [0.3, 0.3, 0.3, 0.1],
      );
    if (p.eventId === 'remote-sensing' && p.division === 'C')
      assert.deepEqual(
        ['instrumentation', 'interpretation', 'climate', 'energy'].map(
          (s) => points(s) / p.maxScore,
        ),
        [0.25, 0.35, 0.2, 0.2],
      );
    if (p.eventId === 'remote-sensing' && p.division === 'B')
      assert.ok(points('concepts') / p.maxScore >= 0.25 && points('concepts') / p.maxScore <= 0.35);
  }
});

test('new checkerboard diagrams include every row and column label and independently decode all messages', () => {
  for (const p of papers.filter((p) => p.eventId === 'codebusters')) {
    const src = read(`public/practice/${p.id}/figures/F1.svg`).toString();
    const texts = [...src.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]);
    // Extract the actual displayed key cells: 6x6 table, skipping row/column headings.
    const cells = texts.slice(1, 37),
      grid = Array.from({ length: 5 }, (_, r) =>
        cells.slice((r + 1) * 6 + 1, (r + 1) * 6 + 6).join(''),
      ).join('');
    assert.equal(new Set(grid).size, 25);
    for (let i = 0; i < 3; i++) {
      const q = p.questions[20 + i],
        desc = q.figure!.description;
      const encrypted = desc
        .match(new RegExp(`${i + 1}:([A-EV-Z ]+)[;.]`))![1]
        .trim()
        .split(/\s+/);
      const start = texts.indexOf(`Message ${i + 1}`) + 1;
      const end = i < 2 ? texts.indexOf(`Message ${i + 2}`) : texts.length;
      assert.deepEqual(
        texts.slice(start, end).join(' ').trim().split(/\s+/),
        encrypted,
        'The visible figure must retain every ciphertext pair.',
      );
      assert.ok([...'ABCDE'].every((c) => encrypted.some((pair) => pair[0] === c)));
      assert.ok([...'VWXYZ'].every((c) => encrypted.some((pair) => pair[1] === c)));
      const plain = encrypted
        .map((pair) => grid['ABCDE'.indexOf(pair[0]) * 5 + 'VWXYZ'.indexOf(pair[1])])
        .join('');
      assert.equal(plain, p.keys[q.id].criteria![0].cipher!.solution.replaceAll(' ', ''));
    }
  }
});

test('diagram-dependent explanations supply figure observations to Auto Grade', async () => {
  const paper = papers.find((p) => p.eventId === 'circuit-lab')!,
    q = paper.questions.find((q) => q.id === '29')!;
  const initial = gradePractice(paper, {
    [q.id]: 'The result follows from canceling the inversions.',
  });
  let seen = false;
  await gradeWrittenWithGemini(paper, initial, {
    apiKey: 'test-only-key',
    model: 'gemini-test',
    fetcher: async (_url, options) => {
      const request = JSON.parse(String(options?.body));
      assert.ok(JSON.stringify(request).includes(q.figure!.description));
      seen = true;
      return new Response('{}', { status: 429 });
    },
  });
  assert.ok(seen);
});

test('catalog rejects unsafe or incomplete figure references', () => {
  const p = structuredClone(papers[0]);
  p.questions[20].figure!.url = 'https://example.com/pixel.png';
  assert.throws(() => validatePracticeCatalog([p]));
  p.questions[20].figure!.url = `/practice/${p.id}/figures/F1.png`;
  p.questions[20].figure!.description = '';
  assert.throws(() => validatePracticeCatalog([p]));
});
