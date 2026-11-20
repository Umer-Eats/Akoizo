import type { EventLessons } from './lessons.ts';

/** Some unit titles already start with "Unit 3:"; numbering is always taken from the unit order. */
const bareUnitTitle = (title: string) => title.replace(/^unit\s*\d+\s*[:.\-–—]\s*/i, '');

/** "Unit 3: Polymers", numbered by the unit's place in the course. */
export function unitLabel(course: EventLessons, unitId: string) {
  const index = course.units.findIndex((unit) => unit.id === unitId);
  if (index < 0) return null;
  return `Unit ${index + 1}: ${bareUnitTitle(course.units[index].title)}`;
}

/** "Lesson 3.2: Plastic ID", the second lesson of the third unit. */
export function lessonLabel(course: EventLessons, lessonId: string) {
  const lesson = course.lessons.find((item) => item.id === lessonId);
  if (!lesson) return null;
  for (const [unitIndex, unit] of course.units.entries()) {
    const lessonIndex = unit.lessonIds.indexOf(lessonId);
    if (lessonIndex >= 0) return `Lesson ${unitIndex + 1}.${lessonIndex + 1}: ${lesson.title}`;
  }
  return lesson.title;
}

/** The numbered title of an assigned lesson or unit, or the stored title for anything else. */
export function studyLabel(
  course: EventLessons | null | undefined,
  kind: string,
  targetId: string,
  fallback: string,
) {
  if (!course) return fallback;
  if (kind === 'Unit') return unitLabel(course, targetId) ?? fallback;
  if (kind === 'Lesson' || kind === 'Presentation') return lessonLabel(course, targetId) ?? fallback;
  return fallback;
}
