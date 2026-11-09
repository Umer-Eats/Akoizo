import type { Division } from './events';
import type { EventLessons } from './lessons';
import { buildCourse } from './lesson-course-builder.ts';

// Authoring shape for build-event units. Every checkpoint question carries its own explanation,
// so written answers get feedback as specific as the multiple-choice ones.
export type BuildUnit = {
  title: string;
  objectives: string[];
  sections: [heading: string, body: string][];
  terms: [term: string, definition: string][];
  example: [problem: string, steps: string[], conclusion: string];
  mcq: [prompt: string, answer: string, wrong: string[], explanation: string][];
  written: [prompt: string, modelAnswer: string, explanation: string][];
  flow: [label: string, detail: string][];
  compare: [label: string, mechanism: string, limit: string][];
  challenge: string;
  takeaway: string;
  evidence: {
    observations: [label: string, result: string][];
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
};

export function buildEventCourse(config: {
  eventId: string;
  eventName: string;
  prefix: string;
  division: Exclude<Division, 'A'>;
  intro: string;
  references: EventLessons['references'];
  units: BuildUnit[];
}): EventLessons {
  const { units, division, eventId, eventName } = config;
  const course = buildCourse({
    eventId,
    eventName,
    prefix: config.prefix,
    division,
    syllabus: `2027 Science Olympiad Division ${division} ${eventName} rules`,
    intro: config.intro,
    references: [
      {
        title: `2027 ${eventName} ${division} rules`,
        url: `/rules/2027/${division.toLowerCase()}/${eventId}.pdf`,
      },
      ...config.references,
    ],
    chapters: units.map((u) => ({
      title: u.title,
      description: u.objectives.join(' '),
      objectives: u.objectives,
      sections: u.sections,
      terms: u.terms,
      example: { problem: u.example[0], steps: u.example[1], conclusion: u.example[2] },
      mcq: u.mcq,
      written: u.written.map(([prompt, answer]) => [prompt, answer]),
      flow: u.flow,
      compare: u.compare,
      challenge: u.challenge,
      takeaway: u.takeaway,
      investigation: {
        ...u.evidence,
        observations: u.evidence.observations.map(([label, result]) => ({ label, result })),
      },
    })),
  });
  return {
    ...course,
    lessons: course.lessons.map((lesson, i) => ({
      ...lesson,
      // Practice lists the multiple-choice questions first, then the written ones.
      practice: lesson.practice.map((q, n) =>
        q.type === 'mcq' ? q : { ...q, explanation: units[i].written[n - units[i].mcq.length][2] },
      ),
    })),
  };
}

/** Checkpoint explanations for build courses, keyed by question id. */
export const explanationsOf = (courses: EventLessons[]): Record<string, string> =>
  Object.fromEntries(
    courses.flatMap((course) =>
      course.lessons.flatMap((lesson) => lesson.practice.map((q) => [q.id, q.explanation])),
    ),
  );
