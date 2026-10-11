import type { EventExtras, LessonExtras } from '../lesson-extras.ts';
import type { TopicLab } from '../topic-lab-kit.ts';
import { astronomyExtras } from './astronomy.ts';
import { chemistryLabExtras } from './chemistry-lab.ts';
import { circuitLabExtras } from './circuit-lab.ts';
import { designerGenesExtras } from './designer-genes.ts';
import { thermodynamicsExtras } from './thermodynamics.ts';

export const eventExtras: EventExtras[] = [
  astronomyExtras,
  chemistryLabExtras,
  circuitLabExtras,
  designerGenesExtras,
  thermodynamicsExtras,
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
