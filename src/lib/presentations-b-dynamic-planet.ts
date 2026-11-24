import type { Deck } from './presentation-types.ts';
import { decks as divisionCDecks } from './presentations-dynamic-planet.ts';

// Dynamic Planet (Division B) presentations, one per lesson. All ten B lessons are the same
// lessons (same ids and text) as Division C, so they reuse the Division C decks, which already
// follow each lesson section by section.
export const decks: Deck[] = divisionCDecks;
