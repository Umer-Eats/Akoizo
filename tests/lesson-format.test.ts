import { test } from 'node:test';
import assert from 'node:assert/strict';
import { akoLessonLines } from '../src/lib/ako-lesson.ts';
import {
  formatLesson,
  formatSection,
  highlightTerms,
  mergeTerms,
  isCaution,
  isInstruction,
  termPatterns,
} from '../src/lib/lesson-format.ts';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';
import { eventsForDivision } from '../src/lib/events.ts';
import type { Lesson } from '../src/lib/lessons.ts';

const line = (n: number, text: string, paragraphIndex = 0) => ({
  id: `0:${paragraphIndex}:${n}`,
  sectionIndex: 0,
  paragraphIndex,
  text,
});

test('sentences are sorted into key idea, explanation, apply-it, limits and test tips', () => {
  const section = formatSection([
    line(0, 'Porosity is the fraction of void space. '),
    line(1, 'Permeability describes how a medium transmits fluid. '),
    line(2, 'High porosity does not guarantee high permeability. '),
    line(3, 'Identify the medium before predicting flow. '),
    line(4, 'Competition questions often pair clay with sand. '),
    line(5, 'Darcy flow: Q = K A dh/dl.'),
  ]);
  assert.equal(section.lead?.text, 'Porosity is the fraction of void space. ');
  assert.deepEqual(
    section.body.map((b) => b.kind),
    ['text', 'formula'],
  );
  assert.deepEqual(
    section.apply.map((l) => l.id),
    ['0:0:3'],
  );
  assert.deepEqual(
    section.cautions.map((l) => l.id),
    ['0:0:2'],
  );
  assert.deepEqual(
    section.exam.map((l) => l.id),
    ['0:0:4'],
  );
});

test('the key idea stays first even when it states a limit', () => {
  const section = formatSection([
    line(0, 'Fingerprint development is not one universal sequence. '),
    line(1, 'Surface porosity matters.'),
  ]);
  assert.equal(section.lead?.id, '0:0:0');
  assert.equal(section.cautions.length, 0);
});

test('instruction and caution detection', () => {
  assert.ok(isInstruction('Use a table of salinity range.'));
  assert.ok(!isInstruction('Uses of water vary.'));
  assert.ok(isCaution('Do not add a continuity correction.'));
  assert.ok(isCaution('These categories describe appearance rather than history.'));
  assert.ok(!isCaution('Alternate illumination can reveal features that were not visible.'));
});

test('key terms are marked once, at their first appearance', () => {
  const used = new Set<string>();
  const terms = [{ term: 'Flux', definition: 'Transfer per unit time.' }];
  const first = highlightTerms('A flux and another flux.', terms, used);
  assert.deepEqual(
    first.map((s) => s.term ?? null),
    [null, 'Flux', null],
  );
  assert.equal(first.map((s) => s.text).join(''), 'A flux and another flux.');
  assert.ok(highlightTerms('More fluxes.', terms, used).every((s) => !s.term));
  assert.deepEqual(termPatterns('RR (relative risk)'), [
    'RR (relative risk)',
    'RR',
    'relative risk',
  ]);
  assert.ok(
    highlightTerms('Do this.', [{ term: 'DO', definition: 'x' }], new Set()).every((s) => !s.term),
  );
});

test('every course keeps every sentence exactly once after formatting', () => {
  for (const division of ['B', 'C'] as const)
    for (const event of eventsForDivision(division)) {
      const course = lessonsForEvent(event.id, division);
      if (!course) continue;
      const glossary: Lesson['keyTerms'] = course.glossary ?? [];
      for (const lesson of course.lessons) {
        const lines = akoLessonLines(lesson);
        const placed = formatLesson(lesson, lines, glossary).flatMap((s) => [
          ...(s.lead ? [s.lead] : []),
          ...s.body.flatMap((b) => (b.kind === 'text' ? b.lines : [b.line])),
          ...s.apply,
          ...s.cautions,
          ...s.exam,
        ]);
        assert.deepEqual(
          placed.map((l) => l.id).sort(),
          lines.map((l) => l.id).sort(),
          `${course.eventId} ${lesson.id}`,
        );
        for (const l of placed)
          assert.equal(l.segments.map((s) => s.text).join(''), l.text, `${lesson.id} ${l.id}`);
      }
    }
});

test('event glossary terms are underlined in every section, including other word forms', () => {
  const glossary = [{ term: 'Buckling', definition: 'Sideways collapse.', aliases: ['buckled'] }];
  const lesson = {
    keyTerms: [{ term: 'Strut', definition: 'A member in compression.' }],
    sections: [
      { heading: 'A', body: [] },
      { heading: 'B', body: [] },
    ],
  };
  const lines = [
    { id: '0:0:0', sectionIndex: 0, paragraphIndex: 0, text: 'The strut buckled early.' },
    { id: '1:0:0', sectionIndex: 1, paragraphIndex: 0, text: 'Buckling ends a strut.' },
  ];
  const [first, second] = formatLesson(lesson, lines, glossary);
  const marked = (s: typeof first) => s.lead!.segments.filter((p) => p.term).map((p) => p.term);
  assert.deepEqual(marked(first), ['Strut', 'Buckling']);
  assert.deepEqual(marked(second), ['Buckling', 'Strut']);
});

test('merged terms keep the first definition and gain later word forms', () => {
  const merged = mergeTerms(
    [{ term: 'Glider', definition: 'Key term.' }],
    [{ term: 'glider', definition: 'Glossary.', aliases: ['gliders'] }],
  );
  assert.deepEqual(merged, [{ term: 'Glider', definition: 'Key term.', aliases: ['gliders'] }]);
});

test('every course ships a glossary larger than its key terms', () => {
  for (const division of ['B', 'C'] as const)
    for (const event of eventsForDivision(division)) {
      const course = lessonsForEvent(event.id, division);
      if (!course) continue;
      const keyTerms = new Set(
        course.lessons.flatMap((l) => l.keyTerms.map((t) => t.term.toLowerCase())),
      );
      assert.ok((course.glossary?.length ?? 0) > keyTerms.size, `${division} ${event.id}`);
      for (const t of course.glossary!) assert.ok(t.definition.length > 10, t.term);
    }
});
