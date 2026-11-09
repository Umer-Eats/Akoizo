import { explanationsOf } from '../build-course-kit.ts';
import { buildCoursesB, buildCoursesC } from '../lessons-build.ts';

// Build-event courses carry their explanations inline; this exposes them by question id.
export const buildEvents = explanationsOf([...buildCoursesC, ...buildCoursesB]);
