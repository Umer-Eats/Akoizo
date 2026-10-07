import { eventsForDivision, type Division } from './events.ts';

export type Role = 'student' | 'instructor';
export type Profile = {
  id: string;
  role: Role;
  displayName: string;
  schoolId: string;
  schoolName: string;
  division: Division | null;
};
export type SchoolCredentials = { schoolName: string; joiningPassword: string };
export type Stats = { lessons: number; practice: number; ranked: number; points: number };
export type Student = Profile & Stats & { division: Division };
export type Assignment = {
  id: string;
  studentId: string;
  studentName: string;
  eventId: string;
  eventName: string;
  division: Division;
  type: 'Practice' | 'Ranked';
  due: string;
  completedAt: string | null;
};
export type EventProgress = Stats & { eventId: string; eventName: string };
export type DashboardData = {
  profile: Profile;
  stats: Stats;
  students: Student[];
  assignments: Assignment[];
  progress: Record<string, EventProgress[]>;
};
export type Enrollment = {
  role: Role;
  displayName: string;
  division?: Division;
  schoolPassword?: string;
  instructorInvitePassword?: string;
};
export class AppError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
export function isDivision(value: unknown): value is Division {
  return value === 'A' || value === 'B' || value === 'C';
}
export function readEnrollment(value: unknown): Enrollment {
  if (!value || typeof value !== 'object') throw new AppError(400, 'Enter your account details.');
  const body = value as Record<string, unknown>;
  if (body.role !== 'student' && body.role !== 'instructor')
    throw new AppError(400, 'Choose an account type.');
  if (
    typeof body.displayName !== 'string' ||
    !body.displayName.trim() ||
    body.displayName.trim().length > 80
  ) {
    throw new AppError(400, 'Enter a name between 1 and 80 characters.');
  }
  if (body.role === 'student' && !isDivision(body.division))
    throw new AppError(400, 'Choose Division A, B, or C.');
  const key = body.role === 'student' ? 'schoolPassword' : 'instructorInvitePassword';
  if (typeof body[key] !== 'string' || !body[key] || (body[key] as string).length > 256) {
    throw new AppError(
      400,
      body.role === 'student'
        ? 'Enter your school password.'
        : 'Enter the instructor invitation password.',
    );
  }
  return {
    role: body.role,
    displayName: body.displayName.trim(),
    division: isDivision(body.division) ? body.division : undefined,
    [key]: body[key],
  };
}
export function validateAssignment(
  division: Division,
  eventId: unknown,
  type: unknown,
  due: unknown,
  today: string,
) {
  if (!eventsForDivision(division).some((event) => event.id === eventId)) {
    throw new AppError(400, `Choose an event from this student's Division ${division} list.`);
  }
  if (type !== 'Practice' && type !== 'Ranked')
    throw new AppError(400, 'Choose a practice or ranked test.');
  if (typeof due !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(due))
    throw new AppError(400, 'Choose a due date.');
  const date = new Date(`${due}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== due || due < today) {
    throw new AppError(400, 'Choose a valid due date on or after today.');
  }
  return { eventId: eventId as string, type, due } as const;
}
export function dateInZone(timeZone: string, date = new Date()) {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  } catch {
    throw new AppError(400, 'Your time zone is not supported.');
  }
}
export function requireSchoolStudent(instructor: Profile, student: Profile | null) {
  if (instructor.role !== 'instructor') throw new AppError(403, 'Instructor access is required.');
  if (!student || student.role !== 'student' || student.schoolId !== instructor.schoolId) {
    throw new AppError(404, 'Student not found in your school.');
  }
}
export const eventKey = (division: Division, id: string) => `2027:${division}:${id}`;
