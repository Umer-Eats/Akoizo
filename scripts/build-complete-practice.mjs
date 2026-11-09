// Build independently answerable curriculum forms and explicit repaired editions.
// This reads local authored lessons and archived catalogs; it makes no provider calls.
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { eventsForDivision } from '../src/lib/events.ts';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';
import { skillForm } from './practice-skill-forms.mjs';
import { sourceRepair } from './practice-source-repairs.mjs';

const baseline = (
  await Promise.all(
    ['practice-tests', 'imported-practice-tests', 'batch-converter-practice-tests'].map(
      async (name) => JSON.parse(await fs.readFile(`src/data/${name}.json`, 'utf8')),
    ),
  )
).flat();
const originals = [],
  repairs = [],
  audit = [];
const date = '2026-11-08';
const normalize = (value) => value.normalize('NFKC').replace(/\s+/g, ' ').trim();
const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex');

function bank(event, division) {
  const course = lessonsForEvent(event.id, division);
  if (!course) return [];
  const buckets = course.lessons
    .filter((l) => !l.extension)
    .map((lesson) => {
      const evidence =
        lesson.simulation.kind === 'investigation'
          ? lesson.simulation.observations.map((o) => `${o.label}: ${o.result}`).join('\n')
          : '';
      const context =
        `Unit: ${lesson.title}.\nWorked-case data: ${lesson.workedExample.problem}` +
        (evidence ? `\nSeparate investigation observations:\n${evidence}` : '');
      const entries = lesson.practice
        .filter(
          (q) =>
            !/\b(image|figure|diagram|pictured|photo|graph|chart)\b/i.test(q.prompt) &&
            !/\b(previous question|question \d|above|below|the simulation|the explorer)\b/i.test(
              q.prompt,
            ) &&
            q.answer.trim() &&
            (q.type !== 'mcq' || q.options?.includes(q.answer)),
        )
        .map((q) => ({
          kind: q.type === 'mcq' ? 'choice' : 'written',
          prompt: q.prompt,
          answer: q.answer,
          explanation: q.explanation,
          options: q.options,
          points: q.type === 'mcq' ? 2 : 4,
          context:
            !/\d/.test(q.prompt) &&
            (q.prompt.length < 65 ||
              /\b(this|these|those|that|case|example|supporting your answer|data)\b/i.test(
                q.prompt,
              ))
              ? context
              : undefined,
          unit: lesson.title,
          sourceQuestionId: q.id,
          sourceLessonId: lesson.id,
        }));
      if (
        !/\b(shown|pictured|above|below|figure|diagram|image)\b/i.test(lesson.workedExample.problem)
      )
        entries.push({
          kind: 'worked',
          prompt: `Solve this case and explain your reasoning: ${lesson.workedExample.problem}`,
          answer: lesson.workedExample.conclusion,
          method: lesson.workedExample.steps.join('\n'),
          points: 6,
          unit: lesson.title,
          sourceLessonId: lesson.id,
        });
      if (lesson.simulation.kind === 'investigation') {
        const s = lesson.simulation;
        if (
          !s.diagram &&
          !/\b(pictured|shown|above|below|image|figure|diagram)\b/i.test(s.question)
        )
          entries.push({
            kind: 'choice',
            prompt: s.question,
            answer: s.options[s.correct],
            options: s.options,
            explanation: s.explanation,
            points: 2,
            context: `Supplied synthetic observations:\n${evidence}`,
            unit: lesson.title,
            sourceLessonId: lesson.id,
          });
      }
      for (const term of lesson.keyTerms)
        entries.push({
          kind: 'written',
          prompt: `Define “${term.term}” in the context of ${event.name}.`,
          answer: term.definition,
          points: 2,
          unit: lesson.title,
          sourceLessonId: lesson.id,
        });
      return entries;
    });
  // Interleave units so each form samples the subject, rather than filling up with one unit.
  const pool = [],
    seen = new Set();
  for (let i = 0; buckets.some((b) => b[i]); i++)
    for (const b of buckets)
      if (b[i]) {
        const q = b[i],
          fingerprint = normalize(q.prompt).toLowerCase();
        if (!seen.has(fingerprint)) {
          pool.push(q);
          seen.add(fingerprint);
        }
      }
  return pool;
}

function convert(entry, id, rotation = 0) {
  const q = {
    id,
    label: id,
    page: 1,
    type: entry.kind === 'choice' ? 'mcq' : 'frq',
    points: entry.points,
    prompt: entry.prompt,
  };
  if (entry.context) q.context = entry.context;
  let key;
  if (q.type === 'mcq') {
    const opts = [...new Set(entry.options)];
    const shifted = opts.map((_, i) => opts[(i + rotation) % opts.length]);
    q.options = shifted.map((text, i) => ({ id: String.fromCharCode(65 + i), text }));
    key = { correctOption: q.options.find((o) => o.text === entry.answer).id };
  } else if (entry.kind === 'worked') {
    key = {
      criteria: [
        { id: 'reasoning', points: 3, answer: entry.method, accepted: [] },
        { id: 'conclusion', points: 3, answer: entry.answer, accepted: [] },
      ],
    };
  } else {
    key = { criteria: [{ id: 'answer', points: q.points, answer: entry.answer, accepted: [] }] };
    if (entry.numeric) key.criteria[0].numeric = { ...entry.numeric, unitRequired: false };
  }
  return { q, key };
}

for (const division of ['B', 'C'])
  for (const event of eventsForDivision(division)) {
    const existing = baseline.filter((t) => t.division === division && t.eventId === event.id);
    const needed = Math.max(0, 5 - existing.length),
      pool = bank(event, division);
    for (let form = 0; form < needed; form++) {
      const id = `akoizo-2027-${division.toLowerCase()}-${event.id}-form-${form + 1}`;
      const special = ['engineering-cad', 'write-it-do-it'].includes(event.id);
      const entries = special
        ? skillForm(event.id, form)
        : pool.filter((_, i) => i % needed === form).slice(0, 18);
      if (entries.length < 15)
        throw Error(
          `Insufficient independent content: ${division}/${event.id}/${form + 1}: ${entries.length}`,
        );
      const questions = [],
        keys = {};
      for (const [i, entry] of entries.entries()) {
        const { q, key } = convert(entry, `${i + 1}`, form + i);
        questions.push(q);
        keys[q.id] = key;
      }
      const topics = [...new Set(entries.map((e) => e.unit).filter(Boolean))];
      const sourceUrl = `/study-tools/division-${division.toLowerCase()}/${event.id}`;
      const t = {
        id,
        eventId: event.id,
        division,
        competition: `Akoizo Original Practice - Form ${form + 1}`,
        origin: 'original',
        level: null,
        levelEvidence: null,
        year: 2026,
        season: 2027,
        reviewedOn: date,
        difficulty: 'Medium',
        difficultyReason:
          'Combines conceptual questions, written explanations and applied cases from the division-specific curriculum. This is not a tournament-tier rating.',
        topics: topics.length
          ? topics.slice(0, 6)
          : [
              event.id === 'engineering-cad'
                ? 'Dimensioned solids and assembly reasoning'
                : 'Spatial instructions and reconstruction',
            ],
        topicMatch: 'current',
        alignment: `Original written preparation for Division ${division} ${event.name}. Covers curriculum concepts; build, lab, CAD and communication performance must also be practiced with the real tools and materials.`,
        questionCount: questions.length,
        maxScore: questions.reduce((s, q) => s + q.points, 0),
        minutes: 50,
        scoringBasis:
          'Original curriculum practice with an authored answer key, not a historical competition paper. Multiple choice grades immediately; written reasoning uses the supplied rubric and may need Auto Grade or instructor review. All case data and required observations are supplied.',
        gradingMode: 'published-key',
        sourceUrl,
        paperUrl: `/practice/${id}/test.pdf`,
        keyUrl: `/practice/${id}/key.pdf`,
        rulesUrl: `/rules/2027/${division.toLowerCase()}/${event.id}.pdf`,
        instructions: special
          ? 'Use the complete written specification provided with each problem. These are parallel written practice forms, not a substitute for constructing a model or working in CAD.'
          : 'This form assembles distinct questions, worked cases and terminology from the existing division-specific Akoizo lessons. You may recognize material from lesson checkpoints. Required case information is repeated with each relevant question.',
        questions,
        keys,
      };
      originals.push(t);
      audit.push({
        id,
        origin: 'original',
        questionFingerprint: digest(questions.map((q) => [q.prompt, q.context, q.options])),
        curriculum: entries.map((e) => ({
          lessonId: e.sourceLessonId,
          questionId: e.sourceQuestionId,
          unit: e.unit,
        })),
        sourceUrl,
      });
    }
    // Incorrect or unavailable source items receive explicit authored substitutes, never guessed historical keys.
    for (const old of existing) {
      // A complete intentionally keyless paper uses its existing reference workflow.
      // Do not graft a partial authored key onto that incompatible grading mode.
      if (old.gradingMode === 'ai-generated') continue;
      const bad = old.questions.filter(
        (q) =>
          q.points === 0 &&
          !/^(tb|extra)/i.test(q.id) &&
          !/duplicate|tiebreaker; unscored/i.test(q.prompt ?? '') &&
          // These source items have valid keys and are intentionally unweighted,
          // rather than incomplete: four printed anatomy tiebreakers and two
          // meiosis images the publisher deliberately omitted from its total.
          !(old.id === 'scioly-utchox7hycm-c' && ['50', '51', '52', '53'].includes(q.id)) &&
          !(old.id === 'scioly-veyv8odzxa8-b' && ['q60', 'q64'].includes(q.id)),
      );
      const absentPuzzle = old.id === 'scioly-os4feum0a2o-b';
      const omission =
        /\b(missing|excluded|excludes|not supplied|absent|physical specimens?|hands-on)\b/i.test(
          old.scoringBasis,
        );
      if (!bad.length && !absentPuzzle && !omission) continue;
      if (!pool.length) throw Error(`Missing repair content for ${old.id}`);
      const repaired = structuredClone(old),
        id = `${old.id}-repaired`;
      repaired.id = id;
      repaired.origin = 'adapted';
      repaired.supersedesTestId = old.id;
      repaired.competition = `${old.competition} - Repaired practice edition`;
      repaired.reviewedOn = date;
      repaired.paperUrl = `/practice/${id}/test.pdf`;
      repaired.keyUrl = `/practice/${id}/key.pdf`;
      const added = [],
        changes = [];
      const used = new Set();
      function choose(prompt) {
        const words = new Set(
          normalize(prompt)
            .toLowerCase()
            .match(/[a-z]{4,}/g) ?? [],
        );
        const ranked = pool
          .map((e, i) => ({
            e,
            i,
            score: (e.prompt.toLowerCase().match(/[a-z]{4,}/g) ?? []).filter((w) => words.has(w))
              .length,
          }))
          .filter((x) => !used.has(x.i))
          .sort((a, b) => b.score - a.score || a.i - b.i);
        const choice = ranked[0];
        if (!choice) throw Error(`Repair bank exhausted: ${old.id}`);
        used.add(choice.i);
        return choice.e;
      }
      for (const original of bad) {
        const entry = sourceRepair(old, original) ?? choose(original.prompt ?? '');
        const { q, key } = convert(entry, original.id, changes.length);
        q.prompt = `Authored replacement for source item ${original.label}: ${q.prompt}`;
        repaired.questions[repaired.questions.findIndex((q) => q.id === original.id)] = q;
        repaired.keys[q.id] = key;
        added.push(q);
        changes.push({
          id: q.id,
          reason: (old.keys[q.id]?.criteria ?? []).map((c) => c.answer).join(' '),
          sourceLessonId: entry.sourceLessonId,
          sourceQuestionId: entry.sourceQuestionId,
        });
      }
      if (absentPuzzle) {
        const solution = 'MEASURE EACH SYMBOL';
        const ciphertext = solution.replace(/[A-Z]/g, (c) =>
          String.fromCharCode(((c.charCodeAt(0) - 65 + 3) % 26) + 65),
        );
        const q = {
          id: '2',
          label: '2',
          page: 1,
          type: 'frq',
          points: 200,
          prompt: `Authored replacement for absent puzzle 2. Decode this Caesar ciphertext with encryption shift +3: ${ciphertext}. Use A=0 through Z=25.`,
          context:
            'Encryption replaces each plaintext letter with the letter three positions later, wrapping after Z. Spaces are preserved.',
        };
        repaired.questions.splice(1, 0, q);
        repaired.keys['2'] = {
          criteria: [
            {
              id: 'plaintext',
              points: 200,
              answer: solution,
              cipher: { solution, freeErrors: 2, penaltyPerError: 100 },
            },
          ],
        };
        added.push(q);
        changes.push({
          id: '2',
          reason:
            'Puzzle 2 is absent from the student source. This is a newly authored replacement, not the missing original.',
        });
      }
      if (omission) {
        // One fully supplied case replaces the unavailable performance/context component as written practice.
        const entry = choose(old.scoringBasis),
          { q, key } = convert(entry, 'repair-case', 1);
        q.prompt = `Authored written substitute for unavailable source material: ${q.prompt}`;
        repaired.questions.push(q);
        repaired.keys[q.id] = key;
        added.push(q);
        changes.push({
          id: q.id,
          reason:
            'Unavailable physical or missing source material is replaced by a self-contained written exercise; original performance scoring is not claimed.',
          sourceLessonId: entry.sourceLessonId,
        });
      }
      repaired.questionCount = repaired.questions.length;
      repaired.maxScore = repaired.questions.reduce((s, q) => s + q.points, 0);
      repaired.scoringBasis = `Repaired practice edition. ${changes.length} clearly marked authored replacement/supplement item(s) address conflicting keys or unavailable source material. Use the appended repair pages for those items; the original archived pages are preserved. Replacement weights are practice weights; this total is not the historical tournament score. ${old.scoringBasis}`;
      repaired.instructions =
        'Source items marked as authored replacements are answered from the repair appendix, not from the superseded source wording or key. Original tiebreakers and intentionally excluded duplicate items retain their original treatment. ' +
        old.instructions;
      repairs.push(repaired);
      audit.push({
        id,
        origin: 'adapted',
        supersedesTestId: old.id,
        changes,
        sourcePaper: old.paperUrl,
        sourceKey: old.keyUrl,
        appendixQuestionIds: added.map((q) => q.id),
      });
    }
  }
await fs.mkdir('output/practice-completion', { recursive: true });
await fs.writeFile(
  'src/data/original-practice-tests.json',
  JSON.stringify(originals, null, 2) + '\n',
);
await fs.writeFile(
  'src/data/repaired-practice-tests.json',
  JSON.stringify(repairs, null, 2) + '\n',
);
await fs.writeFile(
  'documents/practice-completion-audit.json',
  JSON.stringify(audit, null, 2) + '\n',
);
console.log(
  JSON.stringify({
    originals: originals.length,
    repairs: repairs.length,
    authoredQuestions: originals.reduce((s, t) => s + t.questionCount, 0),
    repairedItems: audit.reduce((s, a) => s + (a.changes?.length ?? 0), 0),
    pdfs: (originals.length + repairs.length) * 2,
  }),
);
