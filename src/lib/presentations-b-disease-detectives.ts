import type { Deck } from './presentation-types.ts';
import { decks as divisionCDecks } from './presentations-disease-detectives.ts';

// Disease Detectives (Division B) presentations. Division B shares all ten lessons with
// Division C word for word (same ids and sections), so each B lesson is taught by the deck
// already written for it in presentations-disease-detectives.ts.
export const decks: Deck[] = divisionCDecks;
