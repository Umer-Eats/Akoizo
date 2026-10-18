import type { Lesson } from './lessons';

/** Stable reading units shared by the rendered lesson and the server tutor. */
export function akoLessonLines(lesson: Lesson) {
  return lesson.sections.flatMap((section, sectionIndex) =>
    section.body.map((text, paragraphIndex) => ({
      id: `${sectionIndex}:${paragraphIndex}`,
      label: `${section.heading} · ${paragraphIndex + 1}`,
      heading: section.heading,
      text,
    })),
  );
}
