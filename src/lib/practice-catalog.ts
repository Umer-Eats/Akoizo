// Server-side catalog: never import this module from a client component.
import catalog from '../data/practice-tests.json' with { type: 'json' };
import imported from '../data/imported-practice-tests.json' with { type: 'json' };
import batchConverter from '../data/batch-converter-practice-tests.json' with { type: 'json' };
import originals from '../data/original-practice-tests.json' with { type: 'json' };
import repaired from '../data/repaired-practice-tests.json' with { type: 'json' };
import rotation from '../data/rotation-practice-tests.json' with { type: 'json' };
import archive from '../data/scioly-archive.json' with { type: 'json' };
import { AppError } from './domain.ts';
import { eventsForDivision, slug, type Division } from './events.ts';
import {
  PRACTICE_SEASON,
  competitionLevels,
  practiceDifficulties,
  type PracticeTest,
  type PracticeSummary,
  type PracticePaper,
  type ArchiveSource,
} from './practice-types.ts';

// JSON infers a union of every key map. Validate it once before narrowing that union.
export function validatePracticeCatalog(input: unknown): asserts input is PracticeTest[] {
  const fail = () => {
    throw new Error(
      'Invalid practice catalog: check source metadata, question keys and point totals.',
    );
  };
  if (!Array.isArray(input)) return fail();
  const validSourceUrl = (url: unknown) => typeof url === 'string' && /^https:\/\//.test(url);
  const validAssetUrl = (url: unknown) =>
    typeof url === 'string' && (/^https:\/\//.test(url) || /^\/practice\//.test(url));
  const ids = new Set<string>();
  for (const test of input as PracticeTest[]) {
    if (
      !test ||
      typeof test.id !== 'string' ||
      ids.has(test.id) ||
      !['A', 'B', 'C'].includes(test.division) ||
      !eventsForDivision(test.division).some((e) => e.id === test.eventId) ||
      (test.level !== null && !competitionLevels.includes(test.level)) ||
      test.season !== PRACTICE_SEASON ||
      !Number.isInteger(test.year) ||
      test.year < 1984 ||
      test.year > PRACTICE_SEASON ||
      !test.competition ||
      !practiceDifficulties.includes(test.difficulty) ||
      typeof test.difficultyReason !== 'string' ||
      !test.difficultyReason.trim() ||
      !test.alignment ||
      !test.scoringBasis ||
      !test.instructions ||
      !test.topics?.length ||
      !validAssetUrl(test.paperUrl) ||
      (test.supplementUrl !== undefined && !validAssetUrl(test.supplementUrl)) ||
      (test.gradingMode !== undefined &&
        !['published-key', 'ai-generated'].includes(test.gradingMode)) ||
      (test.gradingMode === 'ai-generated' ? test.keyUrl !== null : !validAssetUrl(test.keyUrl)) ||
      (!validSourceUrl(test.sourceUrl) &&
        !(
          test.origin === 'original' &&
          test.sourceUrl === `/study-tools/division-${test.division.toLowerCase()}/${test.eventId}`
        )) ||
      (test.origin !== undefined && !['original', 'adapted'].includes(test.origin)) ||
      !Array.isArray(test.questions) ||
      !test.questions.length ||
      !test.keys ||
      test.questionCount !== test.questions.length ||
      !Number.isFinite(test.maxScore) ||
      test.maxScore <= 0
    )
      return fail();
    // An absent key must be intentional. Never silently switch a damaged published rubric to AI.
    if (test.gradingMode === 'ai-generated' && Object.keys(test.keys).length) return fail();
    ids.add(test.id);
    const questionIds = new Set<string>();
    for (const question of test.questions) {
      if (
        !question.id ||
        questionIds.has(question.id) ||
        !question.label ||
        !Number.isInteger(question.page) ||
        question.page < 1 ||
        !Number.isFinite(question.points) ||
        question.points < 0
      )
        return fail();
      questionIds.add(question.id);
      if (test.gradingMode === 'ai-generated') {
        if (
          typeof question.prompt !== 'string' ||
          !question.prompt.trim() ||
          /^Question\s+[\w.-]+$/i.test(question.prompt.trim()) ||
          question.prompt === question.label ||
          question.prompt.length > 20000 ||
          (question.context !== undefined &&
            (typeof question.context !== 'string' || question.context.length > 30000))
        )
          return fail();
        if (question.type === 'mcq') {
          const options = question.options;
          if (
            !options ||
            options.length < 2 ||
            new Set(options.map((o) => o.id)).size !== options.length ||
            options.some((o) => !o.id || typeof o.text !== 'string' || !o.text.trim())
          )
            return fail();
        } else if (question.type !== 'frq') return fail();
        continue;
      }
      const key = test.keys[question.id];
      if (!key) return fail();
      if (question.type === 'mcq') {
        const options = question.options?.map((o) => o.id);
        if (key.optionPoints) {
          if (
            Object.entries(key.optionPoints).some(
              ([id, points]) =>
                !options?.includes(id) ||
                !Number.isFinite(points) ||
                points <= 0 ||
                points > question.points,
            )
          )
            return fail();
          if (question.multiple) {
            if (
              !key.correctOptions ||
              Object.keys(key.optionPoints).length !== key.correctOptions.length ||
              Object.keys(key.optionPoints).some((id) => !key.correctOptions!.includes(id)) ||
              Math.abs(
                Object.values(key.optionPoints).reduce((sum, points) => sum + points, 0) -
                  question.points,
              ) > 1e-8
            )
              return fail();
          } else if (
            !key.correctOption ||
            key.optionPoints[key.correctOption] !== question.points ||
            key.acceptedOptions?.some((id) => key.optionPoints![id] !== question.points)
          )
            return fail();
        }
        const correct = question.multiple
          ? key.correctOptions
          : (key.acceptedOptions ?? [key.correctOption]);
        if (
          !options?.length ||
          new Set(options).size !== options.length ||
          !correct?.length ||
          correct.some((id) => !id || !options.includes(id))
        )
          return fail();
      } else if (question.type === 'frq') {
        if (
          !key.criteria?.length ||
          new Set(key.criteria.map((c) => c.id)).size !== key.criteria.length ||
          key.criteria.some(
            (c) =>
              !c.id ||
              !c.answer ||
              !Number.isFinite(c.points) ||
              c.points < 0 ||
              (c.cipher &&
                (typeof c.cipher.solution !== 'string' ||
                  !/[A-Za-z0-9]/.test(c.cipher.solution) ||
                  !Number.isInteger(c.cipher.freeErrors) ||
                  c.cipher.freeErrors < 0 ||
                  !Number.isFinite(c.cipher.penaltyPerError) ||
                  c.cipher.penaltyPerError <= 0)) ||
              (c.numeric &&
                (!Number.isFinite(c.numeric.value) ||
                  !Number.isFinite(c.numeric.tolerance) ||
                  c.numeric.tolerance < 0)),
          ) ||
          Math.abs(key.criteria.reduce((sum, c) => sum + c.points, 0) - question.points) > 1e-8
        )
          return fail();
      } else return fail();
    }
    if (
      Object.keys(test.keys).some((id) => !questionIds.has(id)) ||
      Math.abs(test.questions.reduce((sum, q) => sum + q.points, 0) - test.maxScore) > 1e-8
    )
      return fail();
  }
}
const archivedCatalog: unknown = [...catalog, ...imported, ...batchConverter];
validatePracticeCatalog(archivedCatalog);
export const archivedPracticeTests = archivedCatalog;
const superseded = new Set(repaired.map((t) => t.supersedesTestId));
const checkedCatalog: unknown = [
  ...archivedPracticeTests.filter((t) => !superseded.has(t.id)),
  ...originals,
  ...repaired,
  ...rotation,
];
validatePracticeCatalog(checkedCatalog);
// These older papers contain excluded capacitance/AC work. Keep their source
// questions intact while separating their mixed scope from the 2027 DC rotation.
const historicalCircuitPapers = new Set([
  'scioly-agtflowr5b8-c',
  'bullso-2026-circuit-lab-b-repaired',
  'scioly-dz8-ypn7zj8-b-repaired',
  'virginia-2013-circuit-lab-c-repaired',
  'scioly-kgvd6o10hou-c-repaired',
]);
export const practiceTests = checkedCatalog.map((test) =>
  historicalCircuitPapers.has(test.id)
    ? {
        ...test,
        topicMatch: 'different' as const,
        alignment:
          'Historical mixed-scope paper: includes capacitance or AC work excluded by the 2027 DC-circuit rules. Use 2027-topic forms for current rotation preparation.',
      }
    : test,
);
const activeIds = new Set(practiceTests.map((t) => t.id));
export const allPracticeTests = [
  ...practiceTests,
  ...archivedPracticeTests.filter((t) => !activeIds.has(t.id)),
];
export function practiceSummary(test: PracticeTest): PracticeSummary {
  const {
    id,
    origin,
    supersedesTestId,
    eventId,
    division,
    competition,
    difficulty,
    difficultyReason,
    level,
    year,
    season,
    topics,
    alignment,
    questionCount,
    maxScore,
    minutes,
    scoringBasis,
    levelEvidence,
    sourceId,
    topicMatch,
    gradingMode,
  } = test;
  return {
    id,
    origin,
    supersedesTestId,
    eventId,
    division,
    competition,
    difficulty,
    difficultyReason,
    level,
    year,
    season,
    topics,
    alignment,
    questionCount,
    maxScore,
    minutes,
    scoringBasis,
    levelEvidence,
    sourceId,
    topicMatch,
    gradingMode,
  };
}
export function listArchiveSources(division: Division, eventId: string): ArchiveSource[] {
  if (!eventsForDivision(division).some((event) => event.id === eventId))
    throw new AppError(404, 'Choose an event in your division.');
  const ready = new Set(
    [...practiceTests, ...archivedPracticeTests]
      .filter((t) => t.division === division)
      .map((t) => t.sourceId),
  );
  return (archive.tests as ArchiveSource[])
    .filter(
      (test) =>
        test.divisions.includes(division) &&
        slug(test.event) === eventId &&
        !ready.has(test.sourceId),
    )
    .sort((a, b) => b.year - a.year || a.competition.localeCompare(b.competition));
}
export function listPracticeTests(division: Division, eventId: string) {
  if (!eventsForDivision(division).some((event) => event.id === eventId))
    throw new AppError(404, 'Choose an event in your division.');
  return practiceTests
    .filter(
      (test) =>
        test.division === division && test.eventId === eventId && test.season === PRACTICE_SEASON,
    )
    .sort((a, b) => b.year - a.year || a.competition.localeCompare(b.competition))
    .map(practiceSummary);
}
export function findPracticeTest(division: Division, testId: string) {
  const test = allPracticeTests.find(
    (test) => test.id === testId && test.division === division && test.season === PRACTICE_SEASON,
  );
  if (!test) throw new AppError(404, 'This practice test is not available in your division.');
  return test;
}
export function publicPracticePaper(test: PracticeTest): PracticePaper {
  return {
    ...practiceSummary(test),
    sourceUrl: test.sourceUrl,
    paperUrl: test.paperUrl,
    supplementUrl: test.supplementUrl,
    instructions: test.instructions,
    questions: test.questions,
  };
}
