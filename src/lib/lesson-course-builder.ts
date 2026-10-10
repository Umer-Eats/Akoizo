import type { EventLessons, Lesson, LessonSim } from './lessons';
import { lessonReferenceFigures } from './lesson-reference-figures.ts';

// Authoring helper only: all scientific explanations and questions are supplied per unit.
export type UnitChapter = {
  title: string;
  description: string;
  objectives: string[];
  sections: [string, string][];
  terms: [string, string][];
  example: { problem: string; steps: string[]; conclusion: string };
  mcq: [string, string, string[], string][];
  written: [string, string][];
  flow: [string, string][];
  compare: [string, string, string][];
  challenge: string;
  takeaway: string;
  extension?: boolean;
};
export function buildCourse(config: {
  eventId: string;
  eventName: string;
  prefix: string;
  syllabus: string;
  intro: string;
  lab: Extract<LessonSim, { kind: 'explorer' }>['lab'];
  references: EventLessons['references'];
  chapters: UnitChapter[];
}): EventLessons {
  const lessons: Lesson[] = config.chapters.map((c, i) => {
    const id = `${config.prefix}-u${i + 1}-l1`;
    return {
      id,
      unitId: `${config.prefix}-u${i + 1}`,
      title: c.title,
      durationMin: 55,
      kind: 'text',
      objectives: c.objectives,
      sections: c.sections.map(([heading, body]) => ({ heading, body: body.split('\n\n') })),
      keyTerms: c.terms.map(([term, definition]) => ({ term, definition })),
      workedExample: { title: 'Apply the reasoning', ...c.example },
      simulation: {
        kind: 'explorer',
        lab: config.lab,
        topic: i + 1,
        title: `${config.eventName}: ${c.title} lab`,
        instructions:
          'Use the diagram and controls to test the lesson challenge. Predict first, change one factor at a time, and compare recorded trials. All data in this lab are synthetic teaching examples.',
        challenge: c.challenge,
        takeaway: c.takeaway,
      },
      visual: {
        section: 1,
        title: c.title,
        steps: c.flow.map(([label, detail]) => ({ label, detail })),
        contrasts: c.compare.map(([label, mechanism, limit]) => ({ label, mechanism, limit })),
      },
      practice: [
        ...c.mcq.map(([prompt, answer, alternatives, explanation]) => ({
          type: 'mcq' as const,
          prompt,
          answer,
          options: [answer, ...alternatives],
          explanation,
          points: 1,
        })),
        ...c.written.map(([prompt, answer]) => ({
          type: 'short' as const,
          prompt,
          answer,
          explanation:
            'Compare the mechanism, evidence, units, and limitations in your response with this model answer. Equivalent sound reasoning is acceptable.',
        })),
      ].map((q, n) => ({
        ...q,
        id: `${id}-q${n + 1}`,
        // Rotate authored answer positions to avoid a systematic first-option answer cue.
        ...('options' in q
          ? { options: q.options.map((_, j) => q.options[(j + i + n) % q.options.length]) }
          : {}),
      })),
      extension: c.extension,
      referenceFigures: lessonReferenceFigures.filter((figure) => figure.lessonId === id),
    };
  });
  return {
    eventId: config.eventId,
    eventName: config.eventName,
    division: 'C',
    syllabus: config.syllabus,
    intro: config.intro,
    references: config.references,
    lessons,
    units: config.chapters.map((c, i) => ({
      id: `${config.prefix}-u${i + 1}`,
      title: `Unit ${i + 1}: ${c.title}`,
      description: c.description,
      lessonIds: [lessons[i].id],
    })),
  };
}
