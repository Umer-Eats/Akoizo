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

export type AkoLessonStep = {
  id: string;
  label: string;
  kind: 'explain' | 'example' | 'check' | 'recap';
  topicIndex: number;
  heading: string;
  text: string;
  anchorId: string;
  highlightIds: string[];
};

/** A teacher's route: introduce a topic, make it concrete, then check understanding. */
export function akoLessonPlan(lesson: Lesson): AkoLessonStep[] {
  const lines = akoLessonLines(lesson);
  const steps: AkoLessonStep[] = lesson.sections.flatMap((section, topicIndex) => {
    const topic = lines.filter((line) => line.sectionIndex === topicIndex);
    if (!topic.length) return [];
    return (['explain', 'example', 'check'] as const).map((kind) => {
      const passage =
        kind === 'example'
          ? topic
              .filter((line) => line.paragraphIndex === (section.body.length > 1 ? 1 : 0))
              .slice(-3)
          : topic.slice(0, 3);
      return {
        id: `topic:${topicIndex}:${kind}`,
        label: `${section.heading} · ${kind === 'explain' ? 'The idea' : kind === 'example' ? 'Example' : 'Your turn'}`,
        kind,
        topicIndex,
        heading: section.heading,
        text: section.body.join('\n\n'),
        anchorId: passage[0].id,
        highlightIds: passage.map((line) => line.id),
      };
    });
  });
  const last = steps.at(-1);
  if (last)
    steps.push({
      ...last,
      id: 'lesson:recap',
      kind: 'recap',
      label: 'Lesson recap',
      heading: lesson.title,
    });
  return steps;
}

/** Give students time to read; an actual check always waits for their response. */
export function akoTeachingDelay(text: string, kind: AkoLessonStep['kind']) {
  return kind === 'check'
    ? 6000
    : Math.max(12000, Math.min(45000, text.trim().split(/\s+/).length * 360 + 3000));
}
