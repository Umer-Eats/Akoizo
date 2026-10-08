import type { LessonQuizQuestion } from './lessons';

export type LessonAttempt = {
  answers: Record<string, string>;
  submitted: boolean;
  reviewed: string[];
};

export function scorePractice(questions: LessonQuizQuestion[], answers: Record<string, string>) {
  const graded = questions.filter((question) => question.type === 'mcq');
  return {
    earned: graded.reduce((sum, q) => sum + (answers[q.id] === q.answer ? (q.points ?? 1) : 0), 0),
    possible: graded.reduce((sum, q) => sum + (q.points ?? 1), 0),
    answered: questions.filter((q) => answers[q.id]?.trim()).length,
    written: questions.filter((q) => q.type === 'short').length,
  };
}

// Storage is untrusted and scoped to a student, division, event, and content version.
export function lessonStorageKey(studentId: string, eventId: string) {
  return `akoizo:lessons:v2:${encodeURIComponent(studentId)}:C:${eventId}`;
}

export function readAttempt(value: unknown, questions: LessonQuizQuestion[]): LessonAttempt {
  const raw = value && typeof value === 'object' ? (value as Partial<LessonAttempt>) : {};
  const answers: Record<string, string> = {};
  for (const q of questions) {
    const answer = raw.answers?.[q.id];
    if (typeof answer === 'string' && (q.type !== 'mcq' || q.options?.includes(answer))) {
      answers[q.id] = answer.slice(0, 10000);
    }
  }
  const submitted = raw.submitted === true && questions.every((q) => answers[q.id]?.trim());
  const reviewed =
    submitted && Array.isArray(raw.reviewed)
      ? questions.filter((q) => q.type === 'short' && raw.reviewed!.includes(q.id)).map((q) => q.id)
      : [];
  return { answers, submitted, reviewed };
}

export function practiceComplete(
  attempt: LessonAttempt | undefined,
  questions: LessonQuizQuestion[],
) {
  return (
    !!attempt?.submitted &&
    questions.every(
      (q) =>
        !!attempt.answers[q.id]?.trim() && (q.type === 'mcq' || attempt.reviewed.includes(q.id)),
    )
  );
}
