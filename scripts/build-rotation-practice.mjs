import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { eventsForDivision } from '../src/lib/events.ts';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';
import { topicCases } from './rotation-2027-cases.mjs';
import { codebustersCases } from './rotation-2027-codebusters.mjs';
const normalize = (v) => v.normalize('NFKC').replace(/\s+/g, ' ').trim();
const digest = (v) => createHash('sha256').update(v).digest('hex');
function allowedLesson(event, l) {
  const unit = Number(l.id.match(/-u(\d+)/)?.[1]);
  if (event === 'circuit-lab') return unit >= 2 && unit <= 7;
  if (event === 'astronomy') return unit >= 2;
  if (event === 'protein-modeling') return unit >= 3;
  if (event === 'anatomy-and-physiology') return unit >= 2 && unit <= 9;
  return !l.extension;
}
function bank(event, division) {
  const course = lessonsForEvent(event.id, division);
  if (!course) return [];
  const buckets = course.lessons
    .filter((l) => allowedLesson(event.id, l))
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
          context,
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

const deficits = {
  B: {
    'water-quality': 3,
    'dynamic-planet': 1,
    meteorology: 2,
    'remote-sensing': 2,
    'solar-system': 1,
    'crime-busters': 1,
    'food-science': 2,
    'circuit-lab': 2,
  },
  C: {
    'anatomy-and-physiology': 2,
    'water-quality': 2,
    astronomy: 5,
    'dynamic-planet': 3,
    'remote-sensing': 4,
    'chemistry-lab': 4,
    'circuit-lab': 4,
    'protein-modeling': 2,
    codebusters: 4,
  },
};
const scopes = {
  'water-quality':
    'Marine and estuary ecology, coral-reef organisms, monitoring and salinometer design (30/30/30/10 written points)',
  'dynamic-planet':
    'Fresh waters: hydrologic budgets, streams, lakes, groundwater and human impacts',
  meteorology:
    'Severe weather and storms; at least half the fields interpret supplied tabulated observations',
  'remote-sensing':
    'B: Observable Earth (30% concepts, 70% interpretation); C: climate change (25% instrumentation, 35% interpretation, 20% climate, 20% energy)',
  'solar-system': 'Habitability and the listed Solar System bodies, missions and exoplanets',
  'crime-busters': 'Listed powders, polymers, fibers, chromatography and evidence interpretation',
  'food-science': 'Dairy chemistry, nutrition, curd, butter and ice cream tasks',
  'anatomy-and-physiology': 'Respiratory, digestive and immune systems',
  astronomy:
    'Stellar evolution in normal and starburst galaxies, quantitative methods and named 2027 objects',
  'chemistry-lab':
    'Gases and kinetics (equal written points); advanced rate-law work labeled State/National',
  'circuit-lab': 'DC circuits, listed devices, logic and written hands-on diagnostics',
  'protein-modeling':
    'Influenza hemagglutinin, structure/folding, JUDE, 3UBE chain A residues 153–252',
  codebusters:
    'Permitted C ciphers, K2 Patristocrat/Xenocrypt alphabets, supplied cribs/tables and current scoring',
};
const clauses = {
  'anatomy-and-physiology': '3.a–c',
  astronomy: '3.a–c',
  'dynamic-planet': '3.a–f',
  meteorology: '3.c',
  'solar-system': '3.a–d',
  'crime-busters': '3.Part I–III',
  'food-science': '3.b–c',
  'circuit-lab': '3.Part I.c, Part II',
  'protein-modeling': '3–4',
};
const tests = [],
  audit = [];
for (const [division, events] of Object.entries(deficits))
  for (const [eventId, count] of Object.entries(events)) {
    const event = eventsForDivision(division).find((e) => e.id === eventId),
      pool = bank(event, division);
    const rulesUrl = `/rules/2027/${division.toLowerCase()}/${eventId}.pdf`,
      rulesHash = digest(await fs.readFile('public' + rulesUrl));
    for (let f = 1; f <= count; f++) {
      const cases =
        eventId === 'codebusters' ? codebustersCases(f) : topicCases(eventId, f, division);
      const entries =
        cases.length === 20
          ? cases
          : [
              ...pool
                .filter((_, i) => i % count === f - 1)
                .slice(0, 10)
                .map((e) => ({ ...e, clause: clauses[eventId] })),
              ...cases,
            ];
      if (entries.length !== 20)
        throw Error(`Need 20 fields: ${division}/${eventId}/${f}: ${entries.length}`);
      const id = `akoizo-2027-rotation-${division.toLowerCase()}-${eventId}-form-${f}`,
        questions = [],
        keys = {};
      for (const [i, e] of entries.entries()) {
        if (
          e.clause?.includes('State/National') ||
          (division === 'B' &&
            eventId === 'circuit-lab' &&
            (e.sourceLessonId?.startsWith('circ-u6') || [14, 18].includes(i)))
        )
          e.prompt = '[State/National] ' + e.prompt;
        if (e.options) e.kind = 'choice';
        const { q, key } = convert(e, String(i + 1), f + i);
        if (e.solution)
          key.criteria[0].cipher = {
            solution: e.solution,
            freeErrors: e.freeErrors,
            penaltyPerError: 100,
          };
        for (const field of ['prompt', 'context'])
          if (q[field])
            q[field] = q[field].replace(/-?\d+\.\d{7,}/g, (v) =>
              String(Number(Number(v).toPrecision(7))),
            );
        questions.push(q);
        keys[q.id] = key;
      }
      tests.push({
        id,
        eventId,
        division,
        competition: `Akoizo Original Practice - 2027 Rotation Form ${f}`,
        origin: 'original',
        level: null,
        levelEvidence: null,
        year: 2026,
        season: 2027,
        reviewedOn: '2026-11-08',
        difficulty: 'Medium',
        difficultyReason:
          'Combines 2027-scoped concepts with fully supplied original data exercises. Advanced State/National material is identified where used.',
        topics: [scopes[eventId]],
        topicMatch: 'current',
        alignment: `Reviewed against the checked-in 2027 Division ${division} rules. ${scopes[eventId]}. Written exercises supplement practical work.`,
        questionCount: 20,
        maxScore: questions.reduce((s, q) => s + q.points, 0),
        minutes: 50,
        scoringBasis:
          'Original 2027-topic practice with authored answers. Numerical/cipher answers use explicit grading targets; explanations use the written rubric. Synthetic observations are supplied. This is not a historical tournament paper or an official Science Olympiad test.',
        gradingMode: 'published-key',
        sourceUrl: `/study-tools/division-${division.toLowerCase()}/${eventId}`,
        paperUrl: `/practice/${id}/test.pdf`,
        keyUrl: `/practice/${id}/key.pdf`,
        rulesUrl,
        instructions:
          'Use the supplied data and cipher tables. Show reasoning for written questions. Some conceptual questions are drawn from scoped Akoizo lessons; new case exercises use synthetic data. State/National extensions are identified. Practical tasks require separate hands-on preparation.',
        questions,
        keys,
      });
      audit.push({
        id,
        division,
        eventId,
        scope: scopes[eventId],
        rulesUrl,
        rulesSha256: rulesHash,
        questionFingerprint: digest(
          JSON.stringify(questions.map((q) => [q.prompt, q.context, q.options])),
        ),
        fields: entries.map((e, i) => ({
          id: String(i + 1),
          ruleClause: e.clause,
          lessonId: e.sourceLessonId,
          lessonQuestionId: e.sourceQuestionId,
          unit: e.unit,
          kind: e.sourceLessonId ? 'scoped-curriculum' : 'original-case',
        })),
      });
    }
  }
await fs.writeFile('src/data/rotation-practice-tests.json', JSON.stringify(tests, null, 2) + '\n');
await fs.writeFile(
  'documents/practice-rotation-2027-audit.json',
  JSON.stringify(audit, null, 2) + '\n',
);
console.log(
  `Built ${tests.length} rotation forms, ${tests.reduce((n, t) => n + t.questionCount, 0)} fields.`,
);
