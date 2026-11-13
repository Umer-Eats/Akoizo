import type { LessonQuizQuestion } from './lessons';

/** How one checkpoint answer was marked: by the answer key, by AI, or by the student. */
export type CheckResult = {
  correct: boolean;
  by: 'key' | 'ai' | 'self';
  /** AI feedback on a written answer: what it got right or missed. */
  feedback?: string;
};
/** A checkpoint in progress. Each question is checked on its own and stays locked once checked. */
export type LessonAttempt = {
  answers: Record<string, string>;
  checks: Record<string, CheckResult>;
  /** The question the student was last on, so an unfinished checkpoint resumes there. */
  at?: string;
};
export const emptyAttempt: LessonAttempt = { answers: {}, checks: {} };

/** Multiple-choice score only; written answers are graded separately. */
export function scorePractice(questions: LessonQuizQuestion[], answers: Record<string, string>) {
  const graded = questions.filter((question) => question.type === 'mcq');
  return {
    earned: graded.reduce((sum, q) => sum + (answers[q.id] === q.answer ? (q.points ?? 1) : 0), 0),
    possible: graded.reduce((sum, q) => sum + (q.points ?? 1), 0),
    answered: questions.filter((q) => answers[q.id]?.trim()).length,
    written: questions.filter((q) => q.type === 'short').length,
  };
}

/** A multiple-choice answer is checked against the key, never against stored claims. */
export function checkChoice(question: LessonQuizQuestion, answer: string): CheckResult {
  return { correct: answer === question.answer, by: 'key' };
}

// Storage is untrusted and scoped to a student, division, event, and content version.
export function lessonStorageKey(studentId: string, eventId: string, division: 'B' | 'C' = 'C') {
  return `akoizo:lessons:v2:${encodeURIComponent(studentId)}:${division}:${eventId}`;
}

export function readAttempt(value: unknown, questions: LessonQuizQuestion[]): LessonAttempt {
  const raw =
    value && typeof value === 'object'
      ? (value as {
          answers?: Record<string, unknown>;
          checks?: Record<string, unknown>;
          at?: unknown;
        })
      : {};
  const answers: Record<string, string> = {};
  const checks: Record<string, CheckResult> = {};
  for (const q of questions) {
    const answer = raw.answers?.[q.id];
    if (typeof answer !== 'string' || (q.type === 'mcq' && !q.options?.includes(answer))) continue;
    answers[q.id] = answer.slice(0, 10000);
    const check = raw.checks?.[q.id] as Partial<CheckResult> | undefined;
    if (!answer.trim() || !check || typeof check !== 'object') continue;
    if (q.type === 'mcq') checks[q.id] = checkChoice(q, answer);
    else if (typeof check.correct === 'boolean' && (check.by === 'ai' || check.by === 'self'))
      checks[q.id] = {
        correct: check.correct,
        by: check.by,
        ...(typeof check.feedback === 'string' ? { feedback: check.feedback.slice(0, 1500) } : {}),
      };
  }
  const at = questions.find((q) => q.id === raw.at)?.id;
  return at ? { answers, checks, at } : { answers, checks };
}

/** Whether a checkpoint has been started (an answer chosen, typed or checked) but not finished. */
export function checkpointInProgress(
  attempt: LessonAttempt | undefined,
  questions: LessonQuizQuestion[],
) {
  if (!attempt || checkpointProgress(attempt, questions).complete) return false;
  return questions.some((q) => attempt.checks[q.id] || attempt.answers[q.id]?.trim());
}

/** The question to reopen: where the student last was, else the first one not yet checked. */
export function resumeQuestion(
  attempt: LessonAttempt | undefined,
  questions: LessonQuizQuestion[],
) {
  const at = questions.findIndex((q) => q.id === attempt?.at);
  const isOpen = (q: LessonQuizQuestion) => !attempt?.checks[q.id];
  if (at >= 0 && isOpen(questions[at])) return at;
  // The last question was already checked: carry on with the next one still open.
  const after = questions.findIndex((q, i) => i > at && isOpen(q));
  if (after >= 0) return after;
  const open = questions.findIndex(isOpen);
  return open >= 0 ? open : Math.max(at, 0);
}

/** How far through the checkpoint a student is, and how accurately. */
export function checkpointProgress(
  attempt: LessonAttempt | undefined,
  questions: LessonQuizQuestion[],
) {
  const checked = questions.filter((q) => attempt?.checks[q.id]);
  const correct = checked.filter((q) => attempt!.checks[q.id].correct).length;
  return {
    checked: checked.length,
    correct,
    total: questions.length,
    complete: questions.length > 0 && checked.length === questions.length,
  };
}
