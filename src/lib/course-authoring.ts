import type { UnitChapter } from './lesson-course-builder.ts';

// Compact authoring syntax. Every explanation, answer and visual relationship is authored.
export function chapter(
  title: string,
  objectives: string[],
  sections: [string, string][],
  terms: [string, string][],
  example: [string, string[], string],
  mcq: [string, string, string[], string][],
  written: [string, string][],
  flow: [string, string][],
  compare: [string, string, string][],
  challenge: string,
  takeaway: string,
  extension = false,
): UnitChapter {
  return {
    title,
    description: objectives.join(' '),
    objectives,
    sections,
    terms,
    example: { problem: example[0], steps: example[1], conclusion: example[2] },
    mcq,
    written,
    flow,
    compare,
    challenge,
    takeaway,
    extension,
  };
}

// Evidence investigation for a unit: observations are revealed one at a time before concluding.
export function evidence(
  observations: [label: string, result: string][],
  question: string,
  options: string[],
  correct: number,
  explanation: string,
): NonNullable<UnitChapter['investigation']> {
  return {
    observations: observations.map(([label, result]) => ({ label, result })),
    question,
    options,
    correct,
    explanation,
  };
}
