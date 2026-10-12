import { randomUUID } from 'node:crypto';
import { AppError, eventKey, isDivision, type Profile } from './domain.ts';
import { eventsForDivision, type Division } from './events.ts';
import { partnerLimit, type TeamSheet } from './teams.ts';
import type { Database } from './school-service.ts';

const active = 'NOT EXISTS (SELECT 1 FROM departed_members d WHERE d.user_id=u.id)';
function requireInstructor(profile: Profile) {
  if (profile.role !== 'instructor') throw new AppError(403, 'Instructor access is required.');
}
function teamName(value: unknown) {
  if (
    typeof value !== 'string' ||
    !value.trim() ||
    value.trim().length > 60 ||
    /[\u0000-\u001f]/.test(value)
  )
    throw new AppError(400, 'Enter a team name between 1 and 60 characters.');
  return value.trim();
}
async function teamFor(db: Database, instructor: Profile, id: unknown) {
  const team =
    typeof id === 'string'
      ? await db.get(
          'SELECT id,division FROM teams WHERE id=? AND school_id=?',
          id,
          instructor.schoolId,
        )
      : undefined;
  if (!team) throw new AppError(404, 'Team not found in your school.');
  return { id: String(team.id), division: team.division as Division };
}

export async function listTeams(db: Database, instructor: Profile): Promise<TeamSheet[]> {
  requireInstructor(instructor);
  const teams = await db.all(
    'SELECT id,name,division FROM teams WHERE school_id=? ORDER BY created_at,id',
    instructor.schoolId,
  );
  const seats = await db.all(
    `SELECT ts.team_id,ts.event_id,ts.slot,ts.student_id FROM team_slots ts
     JOIN teams t ON t.id=ts.team_id JOIN users u ON u.id=ts.student_id
     WHERE t.school_id=? AND u.school_id=t.school_id AND ${active}`,
    instructor.schoolId,
  );
  return teams.map((team) => {
    const division = team.division as Division;
    const slots: TeamSheet['slots'] = Object.fromEntries(
      eventsForDivision(division).map((event) => [
        event.id,
        Array.from({ length: partnerLimit(event.id) }, () => null),
      ]),
    );
    for (const seat of seats) {
      if (seat.team_id !== team.id) continue;
      const eventId = String(seat.event_id).split(':').slice(2).join(':');
      const index = Number(seat.slot);
      if (slots[eventId] && index < slots[eventId].length)
        slots[eventId][index] = String(seat.student_id);
    }
    return { id: String(team.id), name: String(team.name), division, slots };
  });
}

export async function createTeam(db: Database, instructor: Profile, body: Record<string, unknown>) {
  requireInstructor(instructor);
  const name = teamName(body.name);
  if (!isDivision(body.division)) throw new AppError(400, 'Choose Division A, B, or C.');
  const count = await db.get(
    'SELECT COUNT(*) AS n FROM teams WHERE school_id=?',
    instructor.schoolId,
  );
  if (Number(count?.n) >= 20) throw new AppError(409, 'Your school already has 20 teams.');
  const id = randomUUID();
  await db.batch(
    [
      {
        // Millisecond timestamps keep teams in the order they were made.
        sql: 'INSERT INTO teams (id,school_id,name,division,created_at) VALUES (?,?,?,?,?)',
        args: [id, instructor.schoolId, name, body.division, new Date().toISOString()],
      },
    ],
    'immediate',
  );
  return { id, teams: await listTeams(db, instructor) };
}

/** Rename a team, or seat (or clear) one student in one event. */
export async function updateTeam(db: Database, instructor: Profile, body: Record<string, unknown>) {
  requireInstructor(instructor);
  const team = await teamFor(db, instructor, body.teamId);
  if (body.name !== undefined) {
    await db.batch(
      [
        {
          sql: 'UPDATE teams SET name=? WHERE id=? AND school_id=?',
          args: [teamName(body.name), team.id, instructor.schoolId],
        },
      ],
      'immediate',
    );
    return listTeams(db, instructor);
  }
  const { eventId, slot, studentId } = body;
  if (
    typeof eventId !== 'string' ||
    !eventsForDivision(team.division).some((event) => event.id === eventId)
  )
    throw new AppError(400, `Choose a Division ${team.division} event.`);
  if (
    typeof slot !== 'number' ||
    !Number.isInteger(slot) ||
    slot < 0 ||
    slot >= partnerLimit(eventId)
  )
    throw new AppError(400, 'Choose a partner seat for this event.');
  const key = eventKey(team.division, eventId);
  const statements = [
    {
      sql: 'DELETE FROM team_slots WHERE team_id=? AND event_id=? AND slot=?',
      args: [team.id, key, slot] as (string | number)[],
    },
  ];
  if (studentId !== null && studentId !== undefined) {
    const student =
      typeof studentId === 'string'
        ? await db.get(
            `SELECT u.id,u.division FROM users u WHERE u.id=? AND u.school_id=? AND u.role='student' AND ${active}`,
            studentId,
            instructor.schoolId,
          )
        : undefined;
    if (!student) throw new AppError(404, 'Student not found in your school.');
    if (student.division !== team.division)
      throw new AppError(
        409,
        `That student is in Division ${student.division}. This is a Division ${team.division} team.`,
      );
    // Choosing a student who already has a seat in this event moves them.
    statements.push(
      {
        sql: 'DELETE FROM team_slots WHERE team_id=? AND event_id=? AND student_id=?',
        args: [team.id, key, String(student.id)],
      },
      {
        sql: 'INSERT INTO team_slots (team_id,event_id,slot,student_id) VALUES (?,?,?,?)',
        args: [team.id, key, slot, String(student.id)],
      },
    );
  }
  await db.batch(statements, 'immediate');
  return listTeams(db, instructor);
}

export async function deleteTeam(db: Database, instructor: Profile, id: unknown) {
  requireInstructor(instructor);
  const team = await teamFor(db, instructor, id);
  await db.batch(
    [
      { sql: 'DELETE FROM team_slots WHERE team_id=?', args: [team.id] },
      {
        sql: 'DELETE FROM teams WHERE id=? AND school_id=?',
        args: [team.id, instructor.schoolId],
      },
    ],
    'immediate',
  );
  return listTeams(db, instructor);
}
