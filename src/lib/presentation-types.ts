// Slide decks for the Presentation tool: a lesson taught as a paced, interactive presentation.
// The same deck runs self-paced, hosted live, or joined from another student's live session.

/** Real photographs, satellite images and published diagrams, with sources in lib/presentation-photos.ts. */
export type PhotoId = keyof typeof import('./presentation-photos.ts').presentationPhotos;

type Base = {
  id: string;
  /** The lesson section this slide teaches, by index, so the deck stays aligned with the lesson. */
  section?: number;
};

export type InfoSlide = Base &
  (
    | { kind: 'title'; title: string; subtitle: string; objectives: string[]; image?: PhotoId }
    | {
        kind: 'bullets';
        title: string;
        bullets: string[];
        /** An image shown beside the bullets. */
        image?: PhotoId;
        callout?: string;
      }
    /** A figure explained beside it: what to notice (caption), then supporting points. */
    | { kind: 'figure'; title: string; image: PhotoId; caption: string; bullets?: string[] }
    | {
        kind: 'compare';
        title: string;
        columns: [string, string, string];
        rows: [string, string, string][];
      }
    | { kind: 'flow'; title: string; steps: { label: string; detail: string }[] }
    | { kind: 'cards'; title: string; cards: { front: string; back: string }[] }
    | { kind: 'example'; title: string; problem: string; steps: string[]; conclusion: string }
    | { kind: 'summary'; title: string; points: string[] }
  );

export type ActivitySlide = Base &
  (
    | { kind: 'mcq'; prompt: string; options: string[]; answer: number; explanation: string }
    | {
        kind: 'multi';
        prompt: string;
        options: string[];
        answers: number[];
        explanation: string;
      }
    | { kind: 'match'; prompt: string; pairs: [string, string][]; explanation: string }
    | { kind: 'order'; prompt: string; items: string[]; explanation: string }
    | {
        kind: 'sort';
        prompt: string;
        bins: string[];
        items: [string, number][];
        explanation: string;
      }
    | {
        kind: 'numeric';
        prompt: string;
        answer: number;
        tolerance: number;
        unit?: string;
        explanation: string;
      }
    | {
        kind: 'fill';
        prompt: string;
        /** Text with blanks written as {0}, {1}, … */
        text: string;
        blanks: string[];
        /** Extra wrong words offered beside the blanks. */
        distractors: string[];
        explanation: string;
      }
    | { kind: 'poll'; prompt: string; options: string[] }
    | { kind: 'open'; prompt: string; model: string }
  );

export type Slide = InfoSlide | ActivitySlide;
export type ActivityKind = ActivitySlide['kind'];
export const activityKinds: ActivityKind[] = [
  'mcq',
  'multi',
  'match',
  'order',
  'sort',
  'numeric',
  'fill',
  'poll',
  'open',
];
export const isActivity = (slide: Slide): slide is ActivitySlide =>
  (activityKinds as string[]).includes(slide.kind);
/** Activities scored for completion; polls and open responses are discussed, not scored. */
export const isGraded = (slide: Slide) =>
  isActivity(slide) && slide.kind !== 'poll' && slide.kind !== 'open';

export type Deck = { lessonId: string; slides: Slide[] };

/** A slide as authored, before the deck numbers it. */
export type SlideDraft = Slide extends infer S ? (S extends Slide ? Omit<S, 'id'> : never) : never;

/** Number a lesson's slides `<lessonId>-<n>` in order. */
export const defineDeck = (lessonId: string, slides: SlideDraft[]): Deck => ({
  lessonId,
  slides: slides.map((slide, i) => ({ ...slide, id: `${lessonId}-${i + 1}` }) as Slide),
});

/**
 * One student's answer to an activity: an option index (mcq, poll), indices (multi), a choice per
 * item (match, order, sort), a number (numeric), words per blank (fill), or text (open).
 */
export type SlideAnswer = number | number[] | string | string[];
