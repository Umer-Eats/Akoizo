import type { Division } from './events.ts';
import type { Deck } from './presentation-types.ts';
import { remoteSensingDecks } from './presentations-remote-sensing.ts';
import { anatomyDecks } from './presentations-anatomy.ts';
import { decks as botany } from './presentations-botany.ts';
import { decks as designerGenes } from './presentations-designer-genes.ts';
import { decks as diseaseDetectives } from './presentations-disease-detectives.ts';
import { decks as waterQuality } from './presentations-water-quality.ts';
import { decks as astronomy } from './presentations-astronomy.ts';
import { decks as dynamicPlanet } from './presentations-dynamic-planet.ts';
import { decks as rocksAndMinerals } from './presentations-rocks-and-minerals.ts';
import { decks as chemistryLab } from './presentations-chemistry-lab.ts';
import { decks as circuitLab } from './presentations-circuit-lab.ts';
import { decks as forensics } from './presentations-forensics.ts';
import { decks as hovercraft } from './presentations-hovercraft.ts';
import { decks as proteinModeling } from './presentations-protein-modeling.ts';
import { decks as thermodynamics } from './presentations-thermodynamics.ts';
import { decks as boomilever } from './presentations-boomilever.ts';
import { decks as electricVehicle } from './presentations-electric-vehicle.ts';
import { decks as missionPossible } from './presentations-mission-possible.ts';
import { decks as wrightStuff } from './presentations-wright-stuff.ts';
import { decks as codebusters } from './presentations-codebusters.ts';
import { decks as experimentalDesign } from './presentations-experimental-design.ts';
import { decks as pingPongParachute } from './presentations-ping-pong-parachute.ts';

// Authored Division C decks by event. Each deck teaches the same lesson as the Lessons tab,
// section by section, so a student can learn one lesson in either format.
const divisionC: Record<string, Deck[]> = {
  'remote-sensing': remoteSensingDecks,
  'anatomy-and-physiology': anatomyDecks,
  botany,
  'designer-genes': designerGenes,
  'disease-detectives': diseaseDetectives,
  'water-quality': waterQuality,
  astronomy,
  'dynamic-planet': dynamicPlanet,
  'rocks-and-minerals': rocksAndMinerals,
  'chemistry-lab': chemistryLab,
  'circuit-lab': circuitLab,
  forensics,
  hovercraft,
  'protein-modeling': proteinModeling,
  thermodynamics,
  boomilever,
  'electric-vehicle': electricVehicle,
  'mission-possible': missionPossible,
  'wright-stuff': wrightStuff,
  codebusters,
  'experimental-design': experimentalDesign,
  'ping-pong-parachute': pingPongParachute,
};

// Decks by `division/eventId`, then lesson id.
const decks: Record<string, Record<string, Deck>> = Object.fromEntries(
  Object.entries(divisionC).map(([eventId, list]) => [
    `C/${eventId}`,
    Object.fromEntries(list.map((deck) => [deck.lessonId, deck])),
  ]),
);

export function deckFor(division: Division, eventId: string, lessonId: string): Deck | null {
  return decks[`${division}/${eventId}`]?.[lessonId] ?? null;
}

/** The lesson ids of an event that have a presentation. */
export function presentedLessons(division: Division, eventId: string): string[] {
  return Object.keys(decks[`${division}/${eventId}`] ?? {});
}

/** Division C events with at least one presentation. */
export function presentedEventsC(): string[] {
  return Object.keys(divisionC).filter((eventId) => divisionC[eventId].length > 0);
}
