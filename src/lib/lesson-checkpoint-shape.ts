// Every lesson ends with the same checkpoint shape: six multiple-choice questions, then one
// written response. Authored lessons mostly carry three of each kind plus extra written prompts,
// so the extra written prompts become multiple choice. Their authored model answer is always the
// correct option; the wrong options come from a reviewed data file (written once by
// scripts/generate-checkpoint-choices.ts) or, when a question has none yet, from model answers
// elsewhere in the same course.
import choiceData from '../data/lesson-checkpoint-choices.json' with { type: 'json' };
import type { EventLessons, Lesson, LessonQuizQuestion } from './lessons';

export const CHECKPOINT_SHAPE = { mcq: 6, written: 1 } as const;
export const CHECKPOINT_LENGTH = CHECKPOINT_SHAPE.mcq + CHECKPOINT_SHAPE.written;

export type CheckpointChoices = {
  /** Question id → the authored model answer it was written for, and three wrong options. */
  distractors: Record<string, { answer: string; options: string[] }>;
  /** Lesson id → whole multiple-choice questions for lessons authored with too few questions. */
  extra: Record<string, LessonQuizQuestion[]>;
};
const choices = choiceData as CheckpointChoices;

// "Explain", "why" and "compare" prompts test reasoning best, so one of them stays written.
const reasoning =
  /^(explain|why|how|compare|contrast|describe|justify|predict|what would|suggest)/i;
const numeric = /^[\s\d.,/=×x*+\-–%()^·:]+[a-zµ°%/\s]*\.?$/i;

/** The one written question a lesson keeps: the reasoning prompt with the fullest model answer. */
export function keptWrittenQuestion(lesson: Pick<Lesson, 'practice'>) {
  const written = lesson.practice.filter((q) => q.type === 'short');
  if (!written.length) return undefined;
  const score = (q: LessonQuizQuestion) =>
    (reasoning.test(q.prompt.trim()) ? 1000 : 0) +
    (numeric.test(q.answer.trim()) ? -500 : 0) +
    Math.min(q.answer.length, 400);
  return written.reduce((best, q) => (score(q) > score(best) ? q : best));
}

/** Written questions a lesson turns into multiple choice, in authored order. */
export function convertedQuestions(lesson: Pick<Lesson, 'practice'>) {
  const kept = keptWrittenQuestion(lesson);
  const mcq = lesson.practice.filter((q) => q.type === 'mcq').length;
  return lesson.practice
    .filter((q) => q.type === 'short' && q !== kept)
    .slice(0, Math.max(0, CHECKPOINT_SHAPE.mcq - mcq));
}

/** How many brand-new multiple-choice questions a lesson needs to reach six. */
export function missingChoiceCount(lesson: Pick<Lesson, 'practice'>) {
  const mcq = lesson.practice.filter((q) => q.type === 'mcq').length;
  return Math.max(0, CHECKPOINT_SHAPE.mcq - mcq - convertedQuestions(lesson).length);
}

// A stable shuffle, so the correct option sits in a different place per question but never moves.
function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}
function placed(id: string, answer: string, wrong: string[]) {
  const options = [...wrong];
  options.splice(hash(id) % (wrong.length + 1), 0, answer);
  return options;
}
const clean = (text: string) => text.trim().replace(/\s+/g, ' ');

/** Turn one written question into multiple choice. The model answer is the correct option. */
export function asChoice(question: LessonQuizQuestion, fallback: string[]): LessonQuizQuestion {
  const reviewed = choices.distractors[question.id];
  const answer = clean(question.answer);
  const usable = (options: string[]) =>
    [...new Set(options.map(clean))].filter(
      (option) => option && option.toLowerCase() !== answer.toLowerCase(),
    );
  const wrong =
    reviewed && clean(reviewed.answer) === answer && usable(reviewed.options).length >= 3
      ? usable(reviewed.options).slice(0, 3)
      : usable(fallback).slice(0, 3);
  return {
    id: question.id,
    prompt: question.prompt,
    type: 'mcq',
    options: placed(question.id, answer, wrong),
    answer,
    explanation: question.explanation,
    points: 1,
  };
}

/** Same-course model answers that do not answer this question, nearest lessons first. */
function fallbackOptions(course: EventLessons, lesson: Lesson, question: LessonQuizQuestion) {
  const near = [
    ...course.lessons.filter((l) => l.unitId === lesson.unitId && l.id !== lesson.id),
    ...course.lessons.filter((l) => l.unitId !== lesson.unitId),
  ];
  const pool = near
    .flatMap((l) => l.practice)
    .filter((q) => q.type === 'short' && q.id !== question.id)
    .map((q) => clean(q.answer));
  // Similar-length answers give away less.
  const target = question.answer.length;
  return [...new Set(pool)]
    .map((text, index) => ({ text, rank: Math.abs(text.length - target) + index * 2 }))
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 6)
    .sort((a, b) => hash(question.id + a.text) - hash(question.id + b.text))
    .map((item) => item.text);
}

/** One lesson's checkpoint: six multiple-choice questions, then one written response. */
export function shapeCheckpoint(course: EventLessons, lesson: Lesson): LessonQuizQuestion[] {
  const kept = keptWrittenQuestion(lesson);
  const converted = new Set(convertedQuestions(lesson));
  const mcq: LessonQuizQuestion[] = [];
  for (const question of lesson.practice) {
    if (question.type === 'mcq') mcq.push(question);
    else if (converted.has(question))
      mcq.push(asChoice(question, fallbackOptions(course, lesson, question)));
  }
  for (const extra of choices.extra[lesson.id] ?? []) {
    if (mcq.length >= CHECKPOINT_SHAPE.mcq) break;
    if (extra.options?.includes(extra.answer)) mcq.push({ ...extra, type: 'mcq' });
  }
  if (mcq.length < CHECKPOINT_SHAPE.mcq) mcq.push(...termQuestions(course, lesson, mcq.length));
  return [...mcq.slice(0, CHECKPOINT_SHAPE.mcq), ...(kept ? [kept] : [])];
}

/** Last resort for short lessons: match a key term to its definition. */
function termQuestions(course: EventLessons, lesson: Lesson, have: number) {
  const terms = [...new Map(course.lessons.flatMap((l) => l.keyTerms).map((t) => [t.term, t]))];
  return lesson.keyTerms
    .slice(0, CHECKPOINT_SHAPE.mcq - have)
    .flatMap((term): LessonQuizQuestion[] => {
      const wrong = terms
        .map(([name]) => name)
        .filter((name) => name !== term.term)
        .sort((a, b) => hash(term.term + a) - hash(term.term + b))
        .slice(0, 3);
      if (wrong.length < 3) return [];
      const id = `${lesson.id}-term-${hash(term.term).toString(36)}`;
      return [
        {
          id,
          prompt: `Which term matches this description? ${clean(term.definition)}`,
          type: 'mcq',
          options: placed(id, term.term, wrong),
          answer: term.term,
          explanation: `This lesson defines ${term.term} as: ${clean(term.definition)} The other options are key terms from elsewhere in the course.`,
          points: 1,
        },
      ];
    });
}

/** Apply the six-plus-one checkpoint to every lesson of a course. */
export function withCheckpoints(course: EventLessons): EventLessons {
  return {
    ...course,
    lessons: course.lessons.map((lesson) => ({
      ...lesson,
      practice: shapeCheckpoint(course, lesson),
    })),
  };
}
