import type { Lesson } from './lessons';

/** Stable reading units shared by the rendered lesson and the server tutor. */
export function akoLessonLines(lesson: Lesson) {
  const segmenter = new Intl.Segmenter('en', { granularity: 'sentence' });
  return lesson.sections.flatMap((section, sectionIndex) =>
    section.body.flatMap((paragraph, paragraphIndex) =>
      Array.from(segmenter.segment(paragraph), ({ segment }, sentenceIndex) => ({
        id: `${sectionIndex}:${paragraphIndex}:${sentenceIndex}`,
        label: `${section.heading} · ${paragraphIndex + 1}.${sentenceIndex + 1}`,
        heading: section.heading,
        sectionIndex,
        paragraphIndex,
        text: segment,
      })),
    ),
  );
}

/** Navigation is an explicit request or a successful check, never a model-chosen DOM target. */
export function shouldAdvanceAkoLesson(message: string, verdict: string, awaitingWhy: boolean) {
  return (
    (verdict === 'correct' && !awaitingWhy) ||
    /^(?:please\s+)?(?:continue|next(?:\s+(?:line|sentence|part))?|move on|let[’']?s (?:continue|move on)|i[’']?m ready|got it)(?:\s+please)?[.!?\s]*$/i.test(
      message.trim(),
    )
  );
}
