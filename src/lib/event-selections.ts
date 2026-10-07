import { AppError, eventKey, isDivision, type Profile } from './domain.ts';
import { eventsForDivision, type Division } from './events.ts';
import type { Database } from './school-service.ts';

export async function selectedEvents(db: Database, profile: Profile, division: Division) {
  const rows = await db.all(
    'SELECT event_id FROM event_selections WHERE student_id=? AND division=?',
    profile.id,
    division,
  );
  return rows.map((row) => String(row.event_id).replace(`2027:${division}:`, ''));
}

export async function selectEvent(db: Database, profile: Profile, body: Record<string, unknown>) {
  if (profile.role !== 'student') throw new AppError(403, 'Student access is required.');
  const { division, eventId, selected } = body;
  if (
    !isDivision(division) ||
    !eventsForDivision(division).some((event) => event.id === eventId) ||
    typeof selected !== 'boolean'
  )
    throw new AppError(400, 'Choose a valid event and selection.');
  await db.batch(
    [
      {
        sql: selected
          ? 'INSERT OR IGNORE INTO event_selections (student_id,division,event_id) VALUES (?,?,?)'
          : 'DELETE FROM event_selections WHERE student_id=? AND division=? AND event_id=?',
        args: [profile.id, division, eventKey(division, eventId as string)],
      },
    ],
    'immediate',
  );
  return selectedEvents(db, profile, division);
}
