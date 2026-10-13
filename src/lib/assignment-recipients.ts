import { AppError, dateInZone, type Profile } from './domain.ts';
import type { Division } from './events.ts';
import type { Database } from './school-service.ts';

const active = 'NOT EXISTS (SELECT 1 FROM departed_members d WHERE d.user_id=u.id)';

/** A due date on or after today in the instructor's time zone. */
export function dueDate(body: Record<string, unknown>) {
  const today = dateInZone(typeof body.timeZone === 'string' ? body.timeZone : 'UTC');
  const due = body.due;
  if (typeof due !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(due) || due < today)
    throw new AppError(400, 'Choose a due date on or after today.');
  return due;
}

/**
 * The students of one school who receive work in one event. `everyone` reaches every student
 * seated in the event on any team. Named students bring their event partners with them.
 */
export async function eventRecipients(
  db: Database,
  instructor: Profile,
  division: Division,
  eventKey: string,
  body: Record<string, unknown>,
) {
  const named: string[] = Array.isArray(body.studentIds) ? body.studentIds : [];
  if (named.length > 200 || named.some((id) => typeof id !== 'string' || !id))
    throw new AppError(400, 'Choose valid students.');
  const roster = new Set(
    (
      await db.all(
        `SELECT u.id FROM users u WHERE u.school_id=? AND u.role='student' AND u.division=? AND ${active}`,
        instructor.schoolId,
        division,
      )
    ).map((row) => String(row.id)),
  );
  if (named.some((id) => !roster.has(id)))
    throw new AppError(404, `A selected student is not in Division ${division} at your school.`);
  const seats = (
    await db.all(
      `SELECT ts.team_id,ts.student_id FROM team_slots ts JOIN teams t ON t.id=ts.team_id
       WHERE t.school_id=? AND ts.event_id=?`,
      instructor.schoolId,
      eventKey,
    )
  ).filter((seat) => roster.has(String(seat.student_id)));
  const recipients = new Set(named);
  const partnerTeams = new Set(
    seats.filter((seat) => recipients.has(String(seat.student_id))).map((seat) => seat.team_id),
  );
  for (const seat of seats)
    if (body.everyone === true || partnerTeams.has(seat.team_id))
      recipients.add(String(seat.student_id));
  if (!recipients.size)
    throw new AppError(
      400,
      'No students are seated in this event yet. Add them in Teams, or choose students.',
    );
  return [...recipients];
}
