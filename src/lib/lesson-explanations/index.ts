import type { EventLessons } from '../lessons';
import { anat } from './anat.ts';
import { forensics } from './for.ts';

/** Checkpoint explanations, keyed by question id. Ids are unique across every course. */
export const lessonExplanations: Record<string, string> = {
  ...anat,
  ...forensics,
};

/** Replaces each checkpoint question's explanation with its written explanation, if one exists. */
export function withExplanations(course: EventLessons): EventLessons {
  return {
    ...course,
    lessons: course.lessons.map((lesson) => ({
      ...lesson,
      practice: lesson.practice.map((question) => {
        const explanation = lessonExplanations[question.id];
        return explanation ? { ...question, explanation } : question;
      }),
    })),
  };
}
