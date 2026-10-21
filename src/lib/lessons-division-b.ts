import type { EventLessons } from './lessons';
import { crimeBustersLessons } from './lessons-crime-busters.ts';
import { foodScienceLessons } from './lessons-food-science.ts';
import { heredityLessons } from './lessons-heredity.ts';
import { meteorologyLessons } from './lessons-meteorology.ts';
import { solarSystemLessons } from './lessons-solar-system.ts';

// Courses for Division B events that have no Division C counterpart.
export const divisionBCourses: EventLessons[] = [
  crimeBustersLessons,
  foodScienceLessons,
  heredityLessons,
  meteorologyLessons,
  solarSystemLessons,
];
