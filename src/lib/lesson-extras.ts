// Lesson-specific interactive material layered on top of the authored course text:
// topic labs, PhET guided investigations, classification activities, and inline checks.
// Keyed by lesson ID so course objects (and their identity in the registry) stay untouched.
import type { Lesson } from './lessons';
import type { TopicLab } from './topic-lab-kit.ts';

export type PhetEmbed = { sim: string; title: string; why: string; tasks: string[] };
export type SortActivity = { title: string; bins: string[]; items: [text: string, bin: number][] };
export type QuickCheck = {
  after: number;
  q: string;
  options: string[];
  correct: number;
  why: string;
};
export type LessonExtras = {
  labs?: string[];
  phet?: PhetEmbed[];
  sort?: SortActivity;
  checks?: QuickCheck[];
};
export type EventExtras = {
  eventId: string;
  labs: TopicLab[];
  lessons: Record<string, LessonExtras>;
};

export const phet = (sim: string, title: string, why: string, ...tasks: string[]): PhetEmbed => ({
  sim,
  title,
  why,
  tasks,
});
export const sort = (
  title: string,
  bins: string[],
  items: [text: string, bin: number][],
): SortActivity => ({ title, bins, items });
// Authors list the correct option first; its displayed position is rotated deterministically
// so the answer position carries no cue.
export function check(after: number, q: string, options: string[], why: string): QuickCheck {
  const shift = [...q].reduce((n, ch) => n + ch.charCodeAt(0), 0) % options.length;
  return {
    after,
    q,
    options: options.map((_, i) => options[(i + options.length - shift) % options.length]),
    correct: shift,
    why,
  };
}

// PhET HTML5 simulations run from PhET's own servers inside an iframe; nothing is copied.
export const phetUrl = (sim: string) =>
  `https://phet.colorado.edu/sims/html/${sim}/latest/${sim}_en.html`;
export const phetPage = (sim: string) => `https://phet.colorado.edu/en/simulations/${sim}`;
export const phetPreview = (sim: string) =>
  `https://phet.colorado.edu/sims/html/${sim}/latest/${sim}-600.png`;
export const phetAttribution =
  'Simulation by PhET Interactive Simulations, University of Colorado Boulder, licensed under CC BY-NC 4.0 (https://phet.colorado.edu).';

// Stable order-preserving shuffle: the same lesson always presents the same arrangement,
// which keeps server and client renders identical.
export function stableShuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    h = (Math.imul(h, 1664525) + 1013904223) >>> 0;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  // A shuffle that leaves the order intact would give the activity away.
  if (out.length > 1 && out.every((item, i) => item === items[i])) out.push(out.shift()!);
  return out;
}

export type TermRound = { term: string; options: string[]; answer: string };
// Match each key term to its definition, using the lesson's other definitions as distractors.
export function termRounds(lesson: Pick<Lesson, 'id' | 'keyTerms'>, limit = 6): TermRound[] {
  const terms = lesson.keyTerms.slice(0, limit);
  if (terms.length < 3) return [];
  return terms.map((term, i) => {
    const others = stableShuffle(
      lesson.keyTerms.filter((t) => t.definition !== term.definition).map((t) => t.definition),
      `${lesson.id}:${i}`,
    ).slice(0, 2);
    return {
      term: term.term,
      answer: term.definition,
      options: stableShuffle([term.definition, ...others], `${lesson.id}:o${i}`),
    };
  });
}
// Rebuild the worked solution: the authored step order is the answer key.
export function solutionSequence(lesson: Pick<Lesson, 'id' | 'workedExample'>) {
  const steps = lesson.workedExample.steps;
  return steps.length < 3 ? null : { answer: steps, scrambled: stableShuffle(steps, lesson.id) };
}
