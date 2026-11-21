import type { Division } from './events.ts';
import type { Deck } from './presentation-types.ts';
import { remoteSensingDecks } from './presentations-remote-sensing.ts';
import { anatomyDecks } from './presentations-anatomy.ts';

// Authored decks by `division/eventId`, then lesson id. Each deck teaches the same lesson as the
// Lessons tab, section by section, so a student can learn one lesson in either format.
const decks: Record<string, Record<string, Deck>> = {
  'C/remote-sensing': Object.fromEntries(remoteSensingDecks.map((deck) => [deck.lessonId, deck])),
  'C/anatomy-and-physiology': Object.fromEntries(anatomyDecks.map((deck) => [deck.lessonId, deck])),
};

export function deckFor(division: Division, eventId: string, lessonId: string): Deck | null {
  return decks[`${division}/${eventId}`]?.[lessonId] ?? null;
}

/** The lesson ids of an event that have a presentation. */
export function presentedLessons(division: Division, eventId: string): string[] {
  return Object.keys(decks[`${division}/${eventId}`] ?? {});
}
