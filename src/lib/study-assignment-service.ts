import { randomUUID } from 'node:crypto';
import { dueDate, eventRecipients } from './assignment-recipients.ts';
import { labsForEvent, phetActivities } from './division-c-labs.ts';
import { AppError, PHET_LAB, eventKey, isDivision, type Profile } from './domain.ts';
import { eventsForDivision, type Division } from './events.ts';
import type { EventLessons } from './lessons.ts';
import { lessonsForEvent } from './lessons-registry.ts';
import { findPracticeTest } from './practice-catalog.ts';
import { practiceTitle } from './practice-types.ts';
import type { Database } from './school-service.ts';

const kinds = ['Practice', 'Lesson', 'Unit', 'Lab'] as const;
type WorkKind = (typeof kinds)[number];

/** The title of one assignable item, or an error when the event does not offer it. */
function titleOf(division: Division, eventId: string, kind: WorkKind, targetId: string) {
  if (kind === 'Practice') {
    const test = findPracticeTest(division, targetId);
    if (test.eventId !== eventId)
      throw new AppError(400, 'That converted test is not in this event.');
    return practiceTitle(test);
  }
  if (kind === 'Lab') {
    const title =
      targetId === PHET_LAB && division === 'C'
        ? phetActivities[eventId] && `PhET: ${phetActivities[eventId].title}`
        : labsForEvent(division, eventId).find((lab) => lab.id === targetId)?.title;
    if (!title) throw new AppError(404, 'That lab simulation is not in this event.');
    return title;
  }
  const course = lessonsForEvent(eventId, division);
  const title =
    kind === 'Unit'
      ? course?.units.find((unit) => unit.id === targetId)?.title
      : course?.lessons.find((lesson) => lesson.id === targetId)?.title;
  if (!title)
    throw new AppError(404, `That ${kind === 'Unit' ? 'unit' : 'lesson'} is not in this event.`);
  return title;
}

/** Complete the pending lesson and unit assignments that these students' lesson progress covers. */
async function settleLessons(db: Database, key: string, course: EventLessons, students: string[]) {
  const marks = students.map(() => '?').join(',');
  const pending = await db.all(
    `SELECT id,student_id,kind,target_id FROM study_assignments
     WHERE event_id=? AND kind IN ('Lesson','Unit') AND completed_at IS NULL AND student_id IN (${marks})`,
    key,
    ...students,
  );
  if (!pending.length) return;
  const done = new Set(
    (
      await db.all(
        `SELECT student_id,lesson_id FROM lesson_progress WHERE event_id=? AND student_id IN (${marks})`,
        key,
        ...students,
      )
    ).map((row) => `${row.student_id}/${row.lesson_id}`),
  );
  const finished = pending.filter((row) => {
    const lessons =
      row.kind === 'Unit'
        ? (course.units.find((unit) => unit.id === row.target_id)?.lessonIds ?? [])
        : [String(row.target_id)];
    return lessons.length > 0 && lessons.every((id) => done.has(`${row.student_id}/${id}`));
  });
  if (!finished.length) return;
  const now = new Date().toISOString();
  await db.batch(
    finished.map((row) => ({
      sql: 'UPDATE study_assignments SET completed_at=? WHERE id=? AND completed_at IS NULL',
      args: [now, String(row.id)],
    })),
    'immediate',
  );
}

/**
 * Assign one practice test, lesson, unit or lab simulation of an event. Recipients follow the
 * ranked-test rule: everyone seated in the event across all teams, or named students with their
 * event partners.
 */
export async function assignWork(db: Database, instructor: Profile, body: Record<string, unknown>) {
  if (instructor.role !== 'instructor') throw new AppError(403, 'Instructor access is required.');
  const division = body.division;
  if (!isDivision(division)) throw new AppError(400, 'Choose Division A, B, or C.');
  const event = eventsForDivision(division).find((candidate) => candidate.id === body.eventId);
  if (!event) throw new AppError(400, `Choose a Division ${division} event.`);
  const kind = kinds.find((value) => value === body.kind);
  if (!kind) throw new AppError(400, 'Choose a practice test, lesson, unit, or lab simulation.');
  const targetId = body.targetId;
  if (typeof targetId !== 'string' || !targetId || targetId.length > 160)
    throw new AppError(400, 'Choose what to assign.');
  const title = titleOf(division, event.id, kind, targetId);
  const due = dueDate(body);
  const key = eventKey(division, event.id);
  const recipients = await eventRecipients(db, instructor, division, key, body);
  const now = new Date().toISOString();
  const written = await db.batch(
    recipients.map((studentId) =>
      kind === 'Practice'
        ? {
            // One pending copy of a test per student; the table also allows one per event and due date.
            sql: `INSERT OR IGNORE INTO assignments (id,student_id,instructor_id,event_id,type,due_date,test_id)
              SELECT ?,?,?,?,'Practice',?,? WHERE NOT EXISTS (SELECT 1 FROM assignments
              WHERE student_id=? AND event_id=? AND test_id=? AND completed_at IS NULL)`,
            args: [
              randomUUID(),
              studentId,
              instructor.id,
              key,
              due,
              targetId,
              studentId,
              key,
              targetId,
            ],
          }
        : {
            sql: `INSERT OR IGNORE INTO study_assignments (id,student_id,instructor_id,event_id,kind,target_id,title,due_date,assigned_at)
              VALUES (?,?,?,?,?,?,?,?,?)`,
            args: [randomUUID(), studentId, instructor.id, key, kind, targetId, title, due, now],
          },
    ),
    'immediate',
  );
  // Lessons a student finished before the assignment count at once.
  const course = kind === 'Lesson' || kind === 'Unit' ? lessonsForEvent(event.id, division) : null;
  if (course) await settleLessons(db, key, course, recipients);
  const assigned = written.reduce((sum, result) => sum + result.rowsAffected, 0);
  return { assigned, alreadyAssigned: recipients.length - assigned };
}

/** Remove a pending lesson, unit or lab assignment. False when the id is not one of them. */
export async function removeStudyAssignment(db: Database, instructor: Profile, id: string) {
  if (instructor.role !== 'instructor') throw new AppError(403, 'Instructor access is required.');
  const result = await db.batch(
    [
      {
        sql: `DELETE FROM study_assignments WHERE id=? AND completed_at IS NULL
          AND student_id IN (SELECT id FROM users WHERE school_id=?)`,
        args: [id, instructor.schoolId],
      },
    ],
    'immediate',
  );
  return result[0].rowsAffected > 0;
}

function studentEvent(student: Profile, eventId: unknown) {
  if (student.role !== 'student' || !student.division)
    throw new AppError(403, 'A student account is required.');
  const event = eventsForDivision(student.division).find((candidate) => candidate.id === eventId);
  if (!event) throw new AppError(400, 'Choose an event from your division.');
  return { division: student.division, eventId: event.id };
}

/**
 * Record lessons whose practice a student has completed. Lesson answers live in the browser, so
 * the browser reports completion; repeating a report changes nothing.
 */
export async function recordLessons(db: Database, student: Profile, body: Record<string, unknown>) {
  const { division, eventId } = studentEvent(student, body.eventId);
  const course = lessonsForEvent(eventId, division);
  if (!course) throw new AppError(404, 'This event has no lessons in your division.');
  const ids: unknown[] = Array.isArray(body.lessonIds) ? body.lessonIds : [];
  const lessons = course.lessons.filter((lesson) => ids.includes(lesson.id));
  if (!lessons.length) throw new AppError(400, 'Choose a lesson from this event.');
  const key = eventKey(division, eventId);
  const now = new Date().toISOString();
  const written = await db.batch(
    lessons.map((lesson) => ({
      sql: 'INSERT OR IGNORE INTO lesson_progress (student_id,event_id,lesson_id,completed_at) VALUES (?,?,?,?)',
      args: [student.id, key, lesson.id, now],
    })),
    'immediate',
  );
  await settleLessons(db, key, course, [student.id]);
  return { recorded: written.reduce((sum, result) => sum + result.rowsAffected, 0) };
}

/** Complete a student's assignment of one lab simulation. Unassigned labs record nothing. */
export async function recordLab(db: Database, student: Profile, body: Record<string, unknown>) {
  const { division, eventId } = studentEvent(student, body.eventId);
  if (typeof body.labId !== 'string') throw new AppError(400, 'Choose a lab simulation.');
  titleOf(division, eventId, 'Lab', body.labId);
  const result = await db.batch(
    [
      {
        sql: `UPDATE study_assignments SET completed_at=? WHERE student_id=? AND event_id=? AND kind='Lab'
          AND target_id=? AND completed_at IS NULL`,
        args: [new Date().toISOString(), student.id, eventKey(division, eventId), body.labId],
      },
    ],
    'immediate',
  );
  return { completed: result[0].rowsAffected };
}
