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
import { decks as bAnatomyAndPhysiology } from './presentations-b-anatomy-and-physiology.ts';
import { decks as bBotany } from './presentations-b-botany.ts';
import { decks as bDiseaseDetectives } from './presentations-b-disease-detectives.ts';
import { decks as bHeredity } from './presentations-b-heredity.ts';
import { decks as bWaterQuality } from './presentations-b-water-quality.ts';
import { decks as bDynamicPlanet } from './presentations-b-dynamic-planet.ts';
import { decks as bMeteorology } from './presentations-b-meteorology.ts';
import { decks as bRemoteSensing } from './presentations-b-remote-sensing.ts';
import { decks as bRocksAndMinerals } from './presentations-b-rocks-and-minerals.ts';
import { decks as bSolarSystem } from './presentations-b-solar-system.ts';
import { decks as bCircuitLab } from './presentations-b-circuit-lab.ts';
import { decks as bCrimeBusters } from './presentations-b-crime-busters.ts';
import { decks as bFoodScience } from './presentations-b-food-science.ts';
import { decks as bHovercraft } from './presentations-b-hovercraft.ts';
import { decks as bThermodynamics } from './presentations-b-thermodynamics.ts';
import { decks as bBoomilever } from './presentations-b-boomilever.ts';
import { decks as bElasticLaunchedGliders } from './presentations-b-elastic-launched-gliders.ts';
import { decks as bRollerCoaster } from './presentations-b-roller-coaster.ts';
import { decks as bScrambler } from './presentations-b-scrambler.ts';
import { decks as bCodebusters } from './presentations-b-codebusters.ts';
import { decks as bExperimentalDesign } from './presentations-b-experimental-design.ts';
import { decks as bPingPongParachute } from './presentations-b-ping-pong-parachute.ts';

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

// Authored Division B decks by event, written for Division B's own lessons.
const divisionB: Record<string, Deck[]> = {
  'anatomy-and-physiology': bAnatomyAndPhysiology,
  botany: bBotany,
  'disease-detectives': bDiseaseDetectives,
  heredity: bHeredity,
  'water-quality': bWaterQuality,
  'dynamic-planet': bDynamicPlanet,
  meteorology: bMeteorology,
  'remote-sensing': bRemoteSensing,
  'rocks-and-minerals': bRocksAndMinerals,
  'solar-system': bSolarSystem,
  'circuit-lab': bCircuitLab,
  'crime-busters': bCrimeBusters,
  'food-science': bFoodScience,
  hovercraft: bHovercraft,
  thermodynamics: bThermodynamics,
  boomilever: bBoomilever,
  'elastic-launched-gliders': bElasticLaunchedGliders,
  'roller-coaster': bRollerCoaster,
  scrambler: bScrambler,
  codebusters: bCodebusters,
  'experimental-design': bExperimentalDesign,
  'ping-pong-parachute': bPingPongParachute,
};

const byDivision: Partial<Record<Division, Record<string, Deck[]>>> = {
  B: divisionB,
  C: divisionC,
};

// Decks by `division/eventId`, then lesson id.
const decks: Record<string, Record<string, Deck>> = Object.fromEntries(
  Object.entries(byDivision).flatMap(([division, events]) =>
    Object.entries(events!).map(([eventId, list]) => [
      `${division}/${eventId}`,
      Object.fromEntries(list.map((deck) => [deck.lessonId, deck])),
    ]),
  ),
);

export function deckFor(division: Division, eventId: string, lessonId: string): Deck | null {
  return decks[`${division}/${eventId}`]?.[lessonId] ?? null;
}

/** The lesson ids of an event that have a presentation. */
export function presentedLessons(division: Division, eventId: string): string[] {
  return Object.keys(decks[`${division}/${eventId}`] ?? {});
}

/** The events of a division with at least one presentation. */
export function presentedEvents(division: Division): string[] {
  const events = byDivision[division] ?? {};
  return Object.keys(events).filter((eventId) => events[eventId].length > 0);
}
