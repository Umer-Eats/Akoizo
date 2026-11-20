import {
  isActivity,
  isGraded,
  type ActivitySlide,
  type Deck,
  type SlideAnswer,
} from './presentation-types.ts';

/** A stable shuffle of 0..n-1 for one slide, so every student in a live session sees one order. */
export function slideOrder(seed: string, n: number) {
  let h = 2166136261;
  for (const char of seed) h = Math.imul(h ^ char.charCodeAt(0), 16777619);
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909);
    const j = (h >>> 0) % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  // An ordering activity must never start already solved.
  if (n > 1 && order.every((value, i) => value === i)) order.push(order.shift()!);
  return order;
}

const normalWord = (word: string) =>
  word
    .trim()
    .toLowerCase()
    .replace(/[\s’']+/g, ' ');

const isIndexList = (value: unknown, n: number, max: number): value is number[] =>
  Array.isArray(value) &&
  value.length === n &&
  value.every((v) => Number.isInteger(v) && v >= 0 && v < max);

/** The answer in its expected shape for this activity, or null when it cannot be one. */
export function validAnswer(slide: ActivitySlide, raw: unknown): SlideAnswer | null {
  switch (slide.kind) {
    case 'mcq':
    case 'poll':
      return Number.isInteger(raw) && (raw as number) >= 0 && (raw as number) < slide.options.length
        ? (raw as number)
        : null;
    case 'multi': {
      if (!Array.isArray(raw) || raw.length > slide.options.length) return null;
      const picked = [...new Set(raw)];
      return picked.every((v) => Number.isInteger(v) && v >= 0 && v < slide.options.length)
        ? (picked as number[]).sort((a, b) => a - b)
        : null;
    }
    case 'match':
      return isIndexList(raw, slide.pairs.length, slide.pairs.length) ? raw : null;
    case 'order':
      return isIndexList(raw, slide.items.length, slide.items.length) &&
        new Set(raw).size === raw.length
        ? raw
        : null;
    case 'sort':
      return isIndexList(raw, slide.items.length, slide.bins.length) ? raw : null;
    case 'numeric':
      return typeof raw === 'number' && Number.isFinite(raw) ? raw : null;
    case 'fill':
      return Array.isArray(raw) &&
        raw.length === slide.blanks.length &&
        raw.every((v) => typeof v === 'string' && v.length <= 80)
        ? (raw as string[])
        : null;
    case 'open':
      return typeof raw === 'string' && raw.trim() && raw.length <= 2000 ? raw.trim() : null;
  }
}

/** Points earned on one activity, out of 1. Matching, ordering, sorting and blanks earn partial credit. */
export function gradeSlide(
  slide: ActivitySlide,
  answer: SlideAnswer,
): { earned: number; correct: boolean } {
  const share = (hits: number, total: number) => ({
    earned: total ? hits / total : 0,
    correct: hits === total,
  });
  switch (slide.kind) {
    case 'mcq':
      return share(answer === slide.answer ? 1 : 0, 1);
    case 'multi': {
      const picked = answer as number[];
      const key = [...slide.answers].sort((a, b) => a - b);
      return share(picked.length === key.length && key.every((v, i) => picked[i] === v) ? 1 : 0, 1);
    }
    case 'match':
    case 'order':
      return share(
        (answer as number[]).filter((v, i) => v === i).length,
        (answer as number[]).length,
      );
    case 'sort':
      return share(
        (answer as number[]).filter((bin, i) => bin === slide.items[i][1]).length,
        slide.items.length,
      );
    case 'numeric':
      return share(Math.abs((answer as number) - slide.answer) <= slide.tolerance ? 1 : 0, 1);
    case 'fill':
      return share(
        (answer as string[]).filter((word, i) => normalWord(word) === normalWord(slide.blanks[i]))
          .length,
        slide.blanks.length,
      );
    case 'poll':
    case 'open':
      return { earned: 0, correct: true };
  }
}

/** Score a whole deck from answers keyed by slide id; unanswered graded activities earn nothing. */
export function scoreDeck(deck: Deck, answers: Record<string, unknown>) {
  let earned = 0;
  let possible = 0;
  for (const slide of deck.slides) {
    if (!isActivity(slide) || !isGraded(slide)) continue;
    possible += 1;
    const answer = validAnswer(slide, answers[slide.id]);
    if (answer !== null) earned += gradeSlide(slide, answer).earned;
  }
  return { earned: Math.round(earned * 100) / 100, possible };
}
