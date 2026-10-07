import { AppError } from './domain.ts';
import type { Answers, Criterion, PracticeTest, PracticeResult } from './practice-types.ts';

function normalize(value: string, caseSensitive = false) {
  const text = value.normalize('NFKC').trim().replace(/\s+/g, ' ');
  return caseSensitive ? text : text.toLowerCase();
}
function numericMatch(answer: string, criterion: Criterion) {
  const rule = criterion.numeric!;
  const match = normalize(answer).match(
    /^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)(?:\s*\/\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+)))?\s*(.*?)$/,
  );
  if (!match) return null;
  const value = Number(match[1]) / (match[2] ? Number(match[2]) : 1);
  const unit = match[3];
  if (!Number.isFinite(value)) return false;
  if (rule.unitRequired && !unit) return false;
  // Unrecognized notation or equivalent units may still be valid: send them to rubric review.
  if (unit && !rule.units.some((candidate) => normalize(candidate) === unit)) return null;
  return (
    Math.abs(value - rule.value) <=
    rule.tolerance + Number.EPSILON * Math.max(1, Math.abs(rule.value))
  );
}
export function validateAnswers(test: PracticeTest, input: unknown): Answers {
  if (!input || typeof input !== 'object' || Array.isArray(input))
    throw new AppError(400, 'Your answers could not be read.');
  const questions = new Map(test.questions.map((q) => [q.id, q]));
  const answers: Answers = {};
  for (const [id, value] of Object.entries(input)) {
    const question = questions.get(id);
    if (!question || typeof value !== 'string' || value.length > 10000)
      throw new AppError(400, 'An answer is invalid or too long.');
    if (question.type === 'mcq' && value !== '') {
      const values = question.multiple ? value.split(',') : [value];
      if (
        new Set(values).size !== values.length ||
        values.some((v) => !question.options?.some((o) => o.id === v))
      )
        throw new AppError(400, 'Choose one of the listed answers.');
    }
    answers[id] = value; // Preserve the student's exact text, including whitespace and capitalization.
  }
  return answers;
}
export function gradePractice(
  test: PracticeTest,
  answers: Answers,
): Omit<PracticeResult, 'id' | 'completedAt'> {
  const questions = test.questions.map((question) => {
    const key = test.keys[question.id];
    const answer = answers[question.id] ?? '';
    if (question.type === 'mcq') {
      const correct = question.multiple
        ? [...key.correctOptions!].sort().join(',') === answer.split(',').sort().join(',')
        : (key.acceptedOptions ?? [key.correctOption]).includes(answer);
      return {
        id: question.id,
        answer,
        earned: correct ? question.points : 0,
        possible: question.points,
        correctOption: key.correctOption,
        correctOptions: key.correctOptions,
        acceptedOptions: key.acceptedOptions,
        criteria: [],
      };
    }
    const criteria = key.criteria!.map((criterion) => {
      const accepted = criterion.accepted;
      const matches = criterion.anyNonEmpty
        ? !!answer.trim()
        : criterion.numeric
          ? numericMatch(answer, criterion)
          : accepted?.some(
              (candidate) =>
                normalize(candidate, criterion.caseSensitive) ===
                normalize(answer, criterion.caseSensitive),
            );
      // Open explanations cannot safely be graded by keyword occurrence. Keep them pending.
      const needsReview =
        !!answer.trim() &&
        !matches &&
        (!criterion.numeric || matches === null) &&
        !criterion.anyNonEmpty;
      return {
        id: criterion.id,
        answer: criterion.answer,
        points: criterion.points,
        earned: matches ? criterion.points : 0,
        needsReview,
      };
    });
    return {
      id: question.id,
      answer,
      possible: question.points,
      earned: criteria.reduce((sum, c) => sum + c.earned, 0),
      criteria,
    };
  });
  const score = questions.reduce((sum, q) => sum + q.earned, 0);
  const pendingPoints = questions
    .flatMap((q) => q.criteria)
    .filter((c) => c.needsReview)
    .reduce((sum, c) => sum + c.points, 0);
  return {
    testId: test.id,
    score,
    maxScore: test.maxScore,
    percentage: Math.round((score / test.maxScore) * 10000) / 100,
    pendingPoints,
    questions,
    keyUrl: test.keyUrl,
  };
}
