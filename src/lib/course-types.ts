import type { BuildCourse, BuildDivision } from './build-events.ts';

export type CourseCard = {
  id: string;
  eventId: string;
  division: BuildDivision;
  title: string;
  level: BuildCourse['level'];
  schoolName: string;
  createdAt: string;
};
export type SavedCourse = CourseCard & { course: BuildCourse };
export type CourseLibrary = { courses: CourseCard[]; nextCursor: string | null };
