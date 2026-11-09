import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { eventsForDivision } from '../src/lib/events.ts';
import { eventToolIds } from '../src/lib/event-rules.ts';
import {
  practiceTests,
  archivedPracticeTests,
  findPracticeTest,
  listPracticeTests,
  publicPracticePaper,
} from '../src/lib/practice-catalog.ts';
import { gradePractice } from '../src/lib/practice-grading.ts';

test('every B/C event exposes at least five complete practice papers, including build and skill events', () => {
  for (const division of ['B', 'C'] as const)
    for (const event of eventsForDivision(division)) {
      assert.ok(
        eventToolIds(division, event).includes('practice-tests'),
        `${division}/${event.id}`,
      );
      const ready = listPracticeTests(division, event.id);
      assert.ok(ready.length >= 5, `${division}/${event.id}: ${ready.length}`);
      assert.equal(new Set(ready.map((p) => p.id)).size, ready.length);
    }
  assert.equal(practiceTests.filter((p) => p.origin === 'original').length, 164);
});

test('new forms contain distinct questions, their own complete keys and no guessed competition provenance', () => {
  const fingerprints = new Set<string>();
  for (const p of practiceTests.filter((p) => p.origin === 'original')) {
    assert.equal(p.level, null);
    assert.equal(p.levelEvidence, null);
    assert.match(p.competition, /Akoizo Original Practice/);
    assert.ok(p.questionCount >= 15);
    assert.ok(!p.sourceId);
    assert.equal(p.gradingMode, 'published-key');
    const bodies = p.questions.map((q) => JSON.stringify([q.prompt, q.context, q.options]));
    assert.equal(new Set(bodies).size, bodies.length, p.id);
    // Shared B/C subjects may legitimately share foundational questions; forms
    // must be distinct within the student's event and division.
    const fingerprint =
      `${p.division}/${p.eventId}/` + createHash('sha256').update(bodies.join('\n')).digest('hex');
    assert.ok(!fingerprints.has(fingerprint), p.id);
    fingerprints.add(fingerprint);
    assert.equal('keys' in publicPracticePaper(p), false);
    assert.equal('keyUrl' in publicPracticePaper(p), false);
    for (const q of p.questions) {
      assert.ok(
        q.prompt && q.prompt.trim().length > 5 && !/^Question \d+$/.test(q.prompt),
        `${p.id}/${q.id}`,
      );
      assert.ok(q.points > 0);
      if (q.type === 'mcq') {
        assert.ok(q.options!.some((o) => o.id === p.keys[q.id].correctOption));
        assert.equal(new Set(q.options!.map((o) => o.text)).size, q.options!.length);
      } else assert.ok(p.keys[q.id].criteria!.every((c) => c.answer.trim()));
    }
  }
});

test('repaired editions supersede library cards while preserving original IDs and scoring for saved attempts', () => {
  const repairs = practiceTests.filter((p) => p.origin === 'adapted');
  assert.ok(repairs.length > 0);
  for (const repaired of repairs) {
    const original = findPracticeTest(repaired.division, repaired.supersedesTestId!);
    assert.equal(
      original,
      archivedPracticeTests.find((p) => p.id === repaired.supersedesTestId),
    );
    assert.ok(
      !listPracticeTests(original.division, original.eventId).some((p) => p.id === original.id),
    );
    assert.ok(
      listPracticeTests(original.division, original.eventId).some((p) => p.id === repaired.id),
    );
    assert.match(repaired.scoringBasis, /authored replacement/i);
    assert.notEqual(repaired.paperUrl, original.paperUrl);
    assert.notEqual(repaired.keyUrl, original.keyUrl);
  }
});

test('unscored active items are intentional tiebreakers or exclusions, not unresolved source defects', () => {
  for (const p of practiceTests)
    for (const q of p.questions.filter((q) => q.points === 0)) {
      const intentional =
        /^(tb|extra)/i.test(q.id) ||
        /duplicate/i.test(q.prompt ?? '') ||
        (p.id === 'scioly-utchox7hycm-c' && ['50', '51', '52', '53'].includes(q.id)) ||
        (p.supersedesTestId === 'scioly-veyv8odzxa8-b' && ['q60', 'q64'].includes(q.id));
      assert.ok(intentional, `${p.id}/${q.id} still needs repair`);
    }
});

test('targeted source repairs grade the corrected quantities and restore the absent cipher puzzle', () => {
  const food = findPracticeTest('B', 'scioly-tj8pj0wzt-s-b-repaired');
  assert.equal(
    gradePractice(food, { '8': '0.55 g/cm^3' }).questions.find((q) => q.id === '8')!.earned,
    1,
  );
  const mass = findPracticeTest('C', 'scioly-t-bhel1zl1m-c-repaired');
  assert.equal(gradePractice(mass, { 'mass-1': '31', 'mass-2': '46 Da' }).score, 2);
  const silver = findPracticeTest('B', 'scioly-p6s6szpywts-b-repaired');
  assert.equal(
    gradePractice(silver, { '32': String(16.5 * (230 * 942 + 88000)) }).questions.find(
      (q) => q.id === '32',
    )!.earned,
    3,
  );
  const cipher = findPracticeTest('B', 'scioly-os4feum0a2o-b-repaired');
  assert.equal(
    gradePractice(cipher, { '2': 'MEASURE EACH SYMBOL' }).questions.find((q) => q.id === '2')!
      .earned,
    200,
  );
});

test('every generated student and answer PDF matches its verified asset manifest', () => {
  const manifest = JSON.parse(
    readFileSync(new URL('../documents/practice-completion-assets.json', import.meta.url), 'utf8'),
  ) as {
    id: string;
    assets: { role: string; sha256: string; pages: number }[];
  }[];
  for (const entry of manifest) {
    const p = practiceTests.find((p) => p.id === entry.id)!;
    assert.ok(p);
    for (const asset of entry.assets) {
      const url = asset.role === 'test' ? p.paperUrl : p.keyUrl!;
      const bytes = readFileSync(new URL('../public' + url, import.meta.url));
      assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
      assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256);
      if (asset.role === 'test') assert.ok(p.questions.every((q) => q.page <= asset.pages));
    }
  }
});
