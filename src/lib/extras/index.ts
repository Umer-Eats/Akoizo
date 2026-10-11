import type { EventExtras, LessonExtras } from '../lesson-extras.ts';
import type { TopicLab } from '../topic-lab-kit.ts';
import { astronomyExtras } from './astronomy.ts';
import { thermodynamicsExtras } from './thermodynamics.ts';

export const eventExtras: EventExtras[] = [
  astronomyExtras,
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
