import type { EventLessons } from './lessons';
import { anatomyLessons } from './lessons-anatomy.ts';
import { forensicsLessons } from './lessons-forensics.ts';
import type { Division } from './events';
import { yellowPurpleCourses } from './lessons-yellow-purple.ts';
import { blueGreenOrangeCourses } from './lessons-blue-green-orange.ts';
import { divisionBCourses } from './lessons-division-b.ts';

const registry: Record<string, EventLessons> = {
  'anatomy-and-physiology': anatomyLessons,
  forensics: forensicsLessons,
  ...Object.fromEntries(yellowPurpleCourses.map((course) => [course.eventId, course])),
  ...Object.fromEntries(blueGreenOrangeCourses.map((course) => [course.eventId, course])),
};

// Division B events that share an event with Division C use the same course. The 2027 B rules
// cover the same topics at a narrower depth, so the shared course says so up front.
export const sharedDivisionBEvents = [
  'anatomy-and-physiology',
  'botany',
  'circuit-lab',
  'codebusters',
  'disease-detectives',
  'dynamic-planet',
  'experimental-design',
  'remote-sensing',
  'rocks-and-minerals',
  'thermodynamics',
  'water-quality',
] as const;

const divisionBNote =
  ' Division B: this course is shared with Division C, so some units go deeper than the 2027 Division B rules. Use the Rules tab to confirm which topics apply at your tournament level.';

const divisionBRegistry: Record<string, EventLessons> = {
  ...Object.fromEntries(
    sharedDivisionBEvents.map((id) => {
      const course = registry[id];
      return [id, { ...course, division: 'B' as const, intro: course.intro + divisionBNote }];
    }),
  ),
  ...Object.fromEntries(divisionBCourses.map((course) => [course.eventId, course])),
};

export function lessonsForEvent(eventId: string, division: Division): EventLessons | null {
  if (division === 'C') return registry[eventId] ?? null;
  if (division === 'B') return divisionBRegistry[eventId] ?? null;
  return null;
}
