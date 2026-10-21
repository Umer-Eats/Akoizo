import type { EventExtras, LessonExtras } from '../lesson-extras.ts';
import type { TopicLab } from '../topic-lab-kit.ts';
import { anatomyExtras } from './anatomy.ts';
import { astronomyExtras } from './astronomy.ts';
import { botanyExtras } from './botany.ts';
import { chemistryLabExtras } from './chemistry-lab.ts';
import { circuitLabExtras } from './circuit-lab.ts';
import { codebustersExtras } from './codebusters.ts';
import { designerGenesExtras } from './designer-genes.ts';
import { diseaseDetectivesExtras } from './disease-detectives.ts';
import { dynamicPlanetExtras } from './dynamic-planet.ts';
import { experimentalDesignExtras } from './experimental-design.ts';
import { crimeBustersExtras } from './crime-busters.ts';
import { foodScienceExtras } from './food-science.ts';
import { forensicsExtras } from './forensics.ts';
import { heredityExtras } from './heredity.ts';
import { meteorologyExtras } from './meteorology.ts';
import { proteinModelingExtras } from './protein-modeling.ts';
import { remoteSensingExtras } from './remote-sensing.ts';
import { rocksAndMineralsExtras } from './rocks-and-minerals.ts';
import { solarSystemExtras } from './solar-system.ts';
import { thermodynamicsExtras } from './thermodynamics.ts';
import { waterQualityExtras } from './water-quality.ts';

export const eventExtras: EventExtras[] = [
  anatomyExtras,
  astronomyExtras,
  botanyExtras,
  chemistryLabExtras,
  circuitLabExtras,
  codebustersExtras,
  designerGenesExtras,
  diseaseDetectivesExtras,
  dynamicPlanetExtras,
  experimentalDesignExtras,
  forensicsExtras,
  heredityExtras,
  meteorologyExtras,
  crimeBustersExtras,
  foodScienceExtras,
  solarSystemExtras,
  proteinModelingExtras,
  remoteSensingExtras,
  rocksAndMineralsExtras,
  thermodynamicsExtras,
  waterQualityExtras,
];
export const topicLabs: Record<string, TopicLab> = Object.fromEntries(
  eventExtras.flatMap((event) => event.labs.map((lab) => [lab.id, lab])),
);
export const lessonExtras: Record<string, LessonExtras> = Object.assign(
  {},
  ...eventExtras.map((event) => event.lessons),
);
const none: LessonExtras = {};
export const extrasFor = (lessonId: string): LessonExtras => lessonExtras[lessonId] ?? none;
