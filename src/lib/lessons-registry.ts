import type { EventLessons } from './lessons';
import { anatomyLessons } from './lessons-anatomy.ts';
import { forensicsLessons } from './lessons-forensics.ts';
import type { Division } from './events';
import { yellowPurpleCourses } from './lessons-yellow-purple.ts';
import { blueGreenOrangeCourses } from './lessons-blue-green-orange.ts';
import { divisionBCourses } from './lessons-division-b.ts';
import { adaptBCourse } from './lessons-b-adaptations.ts';
import { buildCoursesB, buildCoursesC } from './lessons-build.ts';
import { withExplanations } from './lesson-explanations/index.ts';
import { withGlossary } from './glossary/index.ts';

const registry: Record<string, EventLessons> = Object.fromEntries(
  [
    anatomyLessons,
    forensicsLessons,
    ...yellowPurpleCourses,
    ...blueGreenOrangeCourses,
    ...buildCoursesC,
  ].map((course) => [course.eventId, withGlossary(withExplanations(course))]),
);

// Shared subjects retain applicable content and receive B-specific scope and replacements.
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

const divisionBRegistry: Record<string, EventLessons> = {
  ...Object.fromEntries(
    sharedDivisionBEvents.map((id) => {
      const course = registry[id];
      return [id, withGlossary(withExplanations(adaptBCourse(course)))];
    }),
  ),
  ...Object.fromEntries(
    [...divisionBCourses, ...buildCoursesB].map((course) => [
      course.eventId,
      withGlossary(withExplanations(course)),
    ]),
  ),
};

export function lessonsForEvent(eventId: string, division: Division): EventLessons | null {
  if (division === 'C') return registry[eventId] ?? null;
  if (division === 'B') return divisionBRegistry[eventId] ?? null;
  return null;
}
