// Server-side catalog: never import this module from a client component.
import catalog from '../data/practice-tests.json' with { type: 'json' };
import { AppError } from './domain.ts';
import { eventsForDivision, type Division } from './events.ts';
import {
  PRACTICE_SEASON,
  competitionLevels,
  type PracticeTest,
  type PracticeSummary,
  type PracticePaper,
} from './practice-types.ts';

// JSON infers a union of every key map. Validate it once before narrowing that union.
export function validatePracticeCatalog(input: unknown): asserts input is PracticeTest[] {
  const fail = () => {
    throw new Error(
      'Invalid practice catalog: check source metadata, question keys and point totals.',
    );
  };
  if (!Array.isArray(input)) return fail();
  const ids = new Set<string>();
  for (const test of input as PracticeTest[]) {
    if (
      !test ||
      typeof test.id !== 'string' ||
      ids.has(test.id) ||
      !['A', 'B', 'C'].includes(test.division) ||
      !eventsForDivision(test.division).some((e) => e.id === test.eventId) ||
      !competitionLevels.includes(test.level) ||
      test.season !== PRACTICE_SEASON ||
      !Number.isInteger(test.year) ||
      test.year < 1984 ||
      test.year > PRACTICE_SEASON ||
      !test.competition ||
      !test.alignment ||
      !test.scoringBasis ||
      !test.instructions ||
      !test.topics?.length ||
      ![test.paperUrl, test.keyUrl, test.sourceUrl].every(
        (url) => typeof url === 'string' && /^https:\/\//.test(url),
      ) ||
      !Array.isArray(test.questions) ||
      !test.questions.length ||
      !test.keys ||
      test.questionCount !== test.questions.length ||
      !Number.isFinite(test.maxScore) ||
      test.maxScore <= 0
    )
      return fail();
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
      const key = test.keys[question.id];
      if (!key) return fail();
      if (question.type === 'mcq') {
        const options = question.options?.map((o) => o.id);
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
const checkedCatalog: unknown = catalog;
validatePracticeCatalog(checkedCatalog);
export const practiceTests = checkedCatalog;
export function practiceSummary(test: PracticeTest): PracticeSummary {
  const {
    id,
    eventId,
    division,
    competition,
    level,
    year,
    season,
    topics,
    alignment,
    questionCount,
    maxScore,
    minutes,
    scoringBasis,
  } = test;
  return {
    id,
    eventId,
    division,
    competition,
    level,
    year,
    season,
    topics,
    alignment,
    questionCount,
    maxScore,
    minutes,
    scoringBasis,
  };
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
  const test = practiceTests.find(
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
    instructions: test.instructions,
    questions: test.questions,
  };
}
