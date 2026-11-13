import { AppError, eventKey, type Profile } from './domain.ts';
import { gradeLessonAnswer, type LessonAIConfig } from './lesson-ai.ts';
import { checkChoice, type CheckResult } from './lesson-practice.ts';
import { lessonsForEvent } from './lessons-registry.ts';
import type { Database } from './school-service.ts';
import {
  learnerEvent,
  saveResult,
  settleLessons,
  studentEvent,
} from './study-assignment-service.ts';

export type LessonPart = 'learn' | 'practice' | 'labs' | 'checkpoint';
export const lessonParts: LessonPart[] = ['learn', 'practice', 'labs', 'checkpoint'];
export type CheckedAnswer = CheckResult & { lessonId: string; questionId: string; answer: string };
export type LessonPartRecord = {
  lessonId: string;
  part: LessonPart;
  score: number | null;
  maxScore: number | null;
  completedAt: string;
};
export type DraftAnswer = {
  lessonId: string;
  questionId: string;
  answer: string;
  updatedAt: string;
};
export type LessonSummary = { score: number; maxScore: number };
export type CheckResponse =
  | { status: 'checked'; result: CheckResult; lesson?: LessonSummary }
  // AI grading is unavailable: the student compares with the model answer and marks it.
  | { status: 'self-mark' };

function lessonFor(student: Profile, body: Record<string, unknown>) {
  const { division, eventId } = studentEvent(student, body.eventId);
  const course = lessonsForEvent(eventId, division);
  const lesson = course?.lessons.find((candidate) => candidate.id === body.lessonId);
  if (!course || !lesson) throw new AppError(404, 'That lesson is not in this event.');
  return { course, lesson, key: eventKey(division, eventId) };
}

const asCheck = (row: Record<string, unknown>): CheckResult => ({
  correct: Number(row.correct) === 1,
  by: row.graded_by as CheckResult['by'],
  ...(row.feedback ? { feedback: String(row.feedback) } : {}),
});

/**
 * Check one checkpoint answer. Multiple choice is marked by the key; a written answer is marked
 * by AI. If AI is unavailable the student's own mark against the model answer is accepted, but a
 * self-mark never replaces an AI grade. A checked answer stays locked until the student retakes.
 * When the last question is checked the lesson is completed and its accuracy recorded.
 */
export async function checkLessonAnswer(
  db: Database,
  student: Profile,
  body: Record<string, unknown>,
  ai: LessonAIConfig = {},
): Promise<CheckResponse> {
  const { course, lesson, key } = lessonFor(student, body);
  const question = lesson.practice.find((q) => q.id === body.questionId);
  if (!question) throw new AppError(404, 'That question is not in this lesson.');
  const answer = typeof body.answer === 'string' ? body.answer : '';
  if (!answer.trim() || answer.length > 4000)
    throw new AppError(400, 'Write an answer before checking it.');
  if (question.type === 'mcq' && !question.options?.includes(answer))
    throw new AppError(400, 'Choose one of the answer options.');
  const existing = await db.get(
    'SELECT correct,graded_by,feedback FROM lesson_answers WHERE student_id=? AND event_id=? AND lesson_id=? AND question_id=?',
    student.id,
    key,
    lesson.id,
    question.id,
  );
  if (existing) return { status: 'checked', result: asCheck(existing) };

  let result: CheckResult;
  if (question.type === 'mcq') result = checkChoice(question, answer);
  else {
    const grade = await gradeLessonAnswer(course.eventName, question, answer, ai);
    if (grade) result = { correct: grade.correct, by: 'ai', feedback: grade.feedback };
    else if (typeof body.selfMark === 'boolean') result = { correct: body.selfMark, by: 'self' };
    else return { status: 'self-mark' };
  }
  const now = new Date().toISOString();
  await db.batch(
    [
      {
        sql: `INSERT OR IGNORE INTO lesson_answers (student_id,event_id,lesson_id,question_id,answer,correct,graded_by,feedback,checked_at)
          VALUES (?,?,?,?,?,?,?,?,?)`,
        args: [
          student.id,
          key,
          lesson.id,
          question.id,
          answer,
          result.correct ? 1 : 0,
          result.by,
          result.feedback ?? null,
          now,
        ],
      },
      {
        sql: 'DELETE FROM lesson_drafts WHERE student_id=? AND event_id=? AND lesson_id=? AND question_id=?',
        args: [student.id, key, lesson.id, question.id],
      },
    ],
    'immediate',
  );
  const rows = await db.all(
    'SELECT question_id,correct FROM lesson_answers WHERE student_id=? AND event_id=? AND lesson_id=?',
    student.id,
    key,
    lesson.id,
  );
  const checked = new Map(rows.map((row) => [String(row.question_id), Number(row.correct) === 1]));
  if (!lesson.practice.every((q) => checked.has(q.id))) return { status: 'checked', result };
  const score = lesson.practice.filter((q) => checked.get(q.id)).length;
  const maxScore = lesson.practice.length;
  await db.batch(
    [
      {
        sql: 'INSERT OR IGNORE INTO lesson_progress (student_id,event_id,lesson_id,completed_at) VALUES (?,?,?,?)',
        args: [student.id, key, lesson.id, now],
      },
      saveResult(student, key, 'Lesson', lesson.id, score, maxScore, now),
      {
        sql: `INSERT INTO lesson_parts (student_id,event_id,lesson_id,part,score,max_score,completed_at) VALUES (?,?,?,'checkpoint',?,?,?)
          ON CONFLICT(student_id,event_id,lesson_id,part) DO UPDATE SET score=excluded.score,max_score=excluded.max_score,completed_at=excluded.completed_at`,
        args: [student.id, key, lesson.id, score, maxScore, now],
      },
    ],
    'immediate',
  );
  await settleLessons(db, key, course, [student.id]);
  return { status: 'checked', result, lesson: { score, maxScore } };
}

/**
 * Mark one checkpoint answer for an instructor viewing a lesson as students see it: the key marks
 * multiple choice, AI marks the written answer (or the instructor's own mark). Nothing is saved.
 */
export async function previewLessonAnswer(
  viewer: Profile,
  body: Record<string, unknown>,
  ai: LessonAIConfig = {},
): Promise<CheckResponse> {
  const { division, eventId } = learnerEvent(viewer, body.eventId);
  const course = lessonsForEvent(eventId, division);
  const lesson = course?.lessons.find((candidate) => candidate.id === body.lessonId);
  const question = lesson?.practice.find((q) => q.id === body.questionId);
  if (!course || !question) throw new AppError(404, 'That question is not in this lesson.');
  const answer = typeof body.answer === 'string' ? body.answer : '';
  if (!answer.trim() || answer.length > 4000)
    throw new AppError(400, 'Write an answer before checking it.');
  if (question.type === 'mcq') {
    if (!question.options?.includes(answer))
      throw new AppError(400, 'Choose one of the answer options.');
    return { status: 'checked', result: checkChoice(question, answer) };
  }
  const grade = await gradeLessonAnswer(course.eventName, question, answer, ai);
  if (grade)
    return {
      status: 'checked',
      result: { correct: grade.correct, by: 'ai', feedback: grade.feedback },
    };
  if (typeof body.selfMark === 'boolean')
    return { status: 'checked', result: { correct: body.selfMark, by: 'self' } };
  return { status: 'self-mark' };
}

/** Clear a lesson's checked answers so the student can retake it. Completion is kept. */
export async function resetCheckpoint(
  db: Database,
  student: Profile,
  body: Record<string, unknown>,
) {
  const { lesson, key } = lessonFor(student, body);
  await db.batch(
    [
      {
        sql: 'DELETE FROM lesson_answers WHERE student_id=? AND event_id=? AND lesson_id=?',
        args: [student.id, key, lesson.id],
      },
      {
        sql: 'DELETE FROM lesson_drafts WHERE student_id=? AND event_id=? AND lesson_id=?',
        args: [student.id, key, lesson.id],
      },
    ],
    'immediate',
  );
  return { reset: true };
}

/**
 * Save an answer the student has started but not checked, so an unfinished checkpoint resumes
 * where they left off. An empty answer clears the draft; a checked question keeps its answer.
 */
export async function saveCheckpointDraft(
  db: Database,
  student: Profile,
  body: Record<string, unknown>,
) {
  const { lesson, key } = lessonFor(student, body);
  const question = lesson.practice.find((q) => q.id === body.questionId);
  if (!question) throw new AppError(404, 'That question is not in this lesson.');
  const answer = typeof body.answer === 'string' ? body.answer : '';
  if (answer.length > 4000) throw new AppError(400, 'That answer is too long.');
  if (question.type === 'mcq' && answer && !question.options?.includes(answer))
    throw new AppError(400, 'Choose one of the answer options.');
  const args = [student.id, key, lesson.id, question.id];
  if (!answer.trim()) {
    await db.batch(
      [
        {
          sql: 'DELETE FROM lesson_drafts WHERE student_id=? AND event_id=? AND lesson_id=? AND question_id=?',
          args,
        },
      ],
      'immediate',
    );
    return { saved: false };
  }
  const [{ rowsAffected }] = await db.batch(
    [
      {
        // Once a question is checked its answer is locked, so a late draft is ignored.
        sql: `INSERT INTO lesson_drafts (student_id,event_id,lesson_id,question_id,answer,updated_at)
          SELECT ?,?,?,?,?,? WHERE NOT EXISTS (SELECT 1 FROM lesson_answers WHERE student_id=? AND event_id=? AND lesson_id=? AND question_id=?)
          ON CONFLICT(student_id,event_id,lesson_id,question_id) DO UPDATE SET answer=excluded.answer,updated_at=excluded.updated_at`,
        args: [...args, answer, new Date().toISOString(), ...args],
      },
    ],
    'immediate',
  );
  return { saved: rowsAffected > 0 };
}

/**
 * Record a finished lesson stage. Practice and labs carry a first-try accuracy; the first
 * completion is kept so a retry cannot overwrite how the student first did.
 */
export async function recordLessonPart(
  db: Database,
  student: Profile,
  body: Record<string, unknown>,
) {
  const { lesson, key } = lessonFor(student, body);
  const part = body.part;
  if (part !== 'learn' && part !== 'practice' && part !== 'labs')
    throw new AppError(400, 'Choose a lesson stage.');
  const graded = typeof body.maxScore === 'number' && body.maxScore > 0;
  if (
    graded &&
    !(
      Number.isFinite(body.maxScore) &&
      (body.maxScore as number) <= 1000 &&
      typeof body.score === 'number' &&
      body.score >= 0 &&
      body.score <= (body.maxScore as number)
    )
  )
    throw new AppError(400, 'That stage score is not valid.');
  await db.batch(
    [
      {
        sql: `INSERT OR IGNORE INTO lesson_parts (student_id,event_id,lesson_id,part,score,max_score,completed_at)
          VALUES (?,?,?,?,?,?,?)`,
        args: [
          student.id,
          key,
          lesson.id,
          part,
          graded ? (body.score as number) : null,
          graded ? (body.maxScore as number) : null,
          new Date().toISOString(),
        ],
      },
    ],
    'immediate',
  );
  return { recorded: part };
}

/** A student's checked answers and finished stages for one event, to restore on any device. */
export async function lessonProgress(db: Database, student: Profile, eventId: unknown) {
  const { division, eventId: id } = studentEvent(student, eventId);
  const key = eventKey(division, id);
  const answers = await db.all(
    'SELECT lesson_id,question_id,answer,correct,graded_by,feedback FROM lesson_answers WHERE student_id=? AND event_id=?',
    student.id,
    key,
  );
  const parts = await db.all(
    'SELECT lesson_id,part,score,max_score,completed_at FROM lesson_parts WHERE student_id=? AND event_id=?',
    student.id,
    key,
  );
  const drafts = await db.all(
    'SELECT lesson_id,question_id,answer,updated_at FROM lesson_drafts WHERE student_id=? AND event_id=? ORDER BY updated_at',
    student.id,
    key,
  );
  return {
    drafts: drafts.map((row): DraftAnswer => ({
      lessonId: String(row.lesson_id),
      questionId: String(row.question_id),
      answer: String(row.answer),
      updatedAt: String(row.updated_at),
    })),
    answers: answers.map((row): CheckedAnswer => ({
      lessonId: String(row.lesson_id),
      questionId: String(row.question_id),
      answer: String(row.answer),
      ...asCheck(row),
    })),
    parts: parts.map((row): LessonPartRecord => ({
      lessonId: String(row.lesson_id),
      part: row.part as LessonPart,
      score: row.score === null ? null : Number(row.score),
      maxScore: row.max_score === null ? null : Number(row.max_score),
      completedAt: String(row.completed_at),
    })),
  };
}
