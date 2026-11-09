import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import {
  findPracticeTest,
  listArchiveSources,
  publicPracticePaper,
} from '../src/lib/practice-catalog.ts';
import { gradePractice } from '../src/lib/practice-grading.ts';

const evidence = JSON.parse(
  readFileSync(new URL('../documents/practice-expansion-nov2026.json', import.meta.url), 'utf8'),
) as { id: string; assets: { role: string; sha256: string }[] }[];
// These source-transcription regressions still verify the immutable archived editions.
const paper = (id: string) => findPracticeTest(id.endsWith('-b') ? 'B' : 'C', id);

test('November expansion preserves eight source pairs and hides converted archive entries', () => {
  assert.equal(evidence.length, 8);
  let fields = 0;
  for (const item of evidence) {
    const p = paper(item.id);
    assert.ok(p);
    fields += p.questionCount;
    assert.equal('keys' in publicPracticePaper(p), false);
    assert.ok(!listArchiveSources(p.division, p.eventId).some((s) => s.sourceId === p.sourceId));
    for (const asset of item.assets) {
      const path = asset.role === 'test' ? p.paperUrl : p.keyUrl!;
      const bytes = readFileSync(new URL('../public' + path, import.meta.url));
      assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
      assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256);
    }
  }
  assert.equal(fields, 413);
});

test('Pembroke accepts both equivalent volt definitions and grades the written calculations', () => {
  const p = paper('scioly-dz8-ypn7zj8-b');
  assert.equal(gradePractice(p, { '33': 'B' }).score, 1);
  assert.equal(gradePractice(p, { '33': 'D' }).score, 1);
  assert.equal(gradePractice(p, { '1': '2 A', '3': '5.33 W', '4': '0.588 ohms' }).score, 6);
  assert.equal(p.questions.find((q) => q.id === '35')!.points, 0);
  assert.ok(!p.questions.some((q) => ['36', '37', '38', '39'].includes(q.id)));
});

test('Archimedean excludes the absent puzzle and scores published plaintext without AI', () => {
  const p = paper('scioly-os4feum0a2o-b');
  assert.ok(!p.questions.some((q) => q.id === '2'));
  const answers = Object.fromEntries(
    p.questions.map((q) => [q.id, p.keys[q.id].criteria![0].cipher!.solution]),
  );
  const result = gradePractice(p, answers);
  assert.equal(result.score, p.maxScore);
  assert.equal(result.pendingPoints, 0);
});

test('inconsistent source answers remain unscored rather than teaching the original errors', () => {
  for (const [id, questions] of [
    ['scioly-p6s6szpywts-b', ['24', '30', '32']],
    ['scioly-tj8pj0wzt-s-b', ['2', '6', '8']],
    ['scioly-fmnnyytasp0-c', ['9', '34', '63']],
    ['scioly-t-bhel1zl1m-c', ['chemistry-7', 'mass-1', 'mass-2']],
  ] as const) {
    const p = paper(id);
    for (const question of questions) {
      assert.equal(p.questions.find((q) => q.id === question)!.points, 0);
      assert.match(p.keys[question].criteria![0].answer, /Unscored/);
    }
  }
});
