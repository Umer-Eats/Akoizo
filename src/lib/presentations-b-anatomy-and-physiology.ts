import type { Deck } from './presentation-types.ts';
import { anatomyDecks } from './presentations-anatomy.ts';

// Anatomy and Physiology (Division B) presentations. The Division B course keeps the Division C
// lessons unchanged (sharedDivisionBEvents in lessons-registry.ts: same lesson ids and sections),
// so the Division B decks are the Division C decks; editing a lesson updates both divisions.
export const decks: Deck[] = anatomyDecks;
