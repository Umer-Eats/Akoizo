import type { Deck } from './presentation-types.ts';
import { decks as divisionCDecks } from './presentations-rocks-and-minerals.ts';

// Rocks and Minerals (Division B) presentations, one per lesson. Every Division B lesson keeps the
// Division C lesson's id and sections unchanged (lessons-b-adaptations.ts), so each B lesson is
// taught by the Division C deck written for that same lesson; a B lesson that diverges from C
// needs its own deck here, which the presentations test enforces by section coverage.
export const decks: Deck[] = divisionCDecks;
