import { randomUUID } from 'node:crypto';
import { dueDate, eventRecipients } from './assignment-recipients.ts';
import { calculateLab } from './division-c-lab-models.ts';
import { labsForEvent, phetActivities } from './division-c-labs.ts';
import {
  AppError,
  PHET_LAB,
  eventKey,
  isDivision,
  type Profile,
  type WorkRecord,
} from './domain.ts';
import { scorePractice } from './lesson-practice.ts';
import { eventsForDivision, type Division } from './events.ts';
import type { EventLessons } from './lessons.ts';
import { lessonsForEvent } from './lessons-registry.ts';
import { deckFor } from './presentations.ts';
import { findPracticeTest, allPracticeTests } from './practice-catalog.ts';
import { practiceTitle } from './practice-types.ts';
import type { Database } from './school-service.ts';

const kinds = ['Practice', 'Lesson', 'Unit', 'Lab', 'Presentation'] as const;
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
      // The PhET companion appears only beside an event's own virtual labs.
      targetId === PHET_LAB && labsForEvent(division, eventId).length > 0
        ? phetActivities[eventId] && `PhET: ${phetActivities[eventId].title}`
        : labsForEvent(division, eventId).find((lab) => lab.id === targetId)?.title;
    if (!title) throw new AppError(404, 'That lab simulation is not in this event.');
    return title;
  }
  const course = lessonsForEvent(eventId, division);
  if (kind === 'Presentation') {
    const lesson = course?.lessons.find((item) => item.id === targetId);
    if (!lesson || !deckFor(division, eventId, targetId))
      throw new AppError(404, 'That presentation is not in this event.');
    return lesson.title;
  }
  const title =
    kind === 'Unit'
      ? course?.units.find((unit) => unit.id === targetId)?.title
      : course?.lessons.find((lesson) => lesson.id === targetId)?.title;
  if (!title)
    throw new AppError(404, `That ${kind === 'Unit' ? 'unit' : 'lesson'} is not in this event.`);
  return title;
}

/** Complete the pending presentation assignments these students have already finished. */
export async function settlePresentations(db: Database, key: string, students: string[]) {
  if (!students.length) return;
  const marks = students.map(() => '?').join(',');
  await db.batch(
    [
      {
        sql: `UPDATE study_assignments SET completed_at=? WHERE event_id=? AND kind='Presentation'
          AND completed_at IS NULL AND student_id IN (${marks})
          AND EXISTS (SELECT 1 FROM presentation_results r WHERE r.student_id=study_assignments.student_id
            AND r.event_id=study_assignments.event_id AND r.lesson_id=study_assignments.target_id)`,
        args: [new Date().toISOString(), key, ...students],
      },
    ],
    'immediate',
  );
}

/** Complete the pending lesson and unit assignments that these students' lesson progress covers. */
export async function settleLessons(
  db: Database,
  key: string,
  course: EventLessons,
  students: string[],
) {
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
  if (kind === 'Presentation') await settlePresentations(db, key, recipients);
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

const isConflict = (error: unknown) =>
  error instanceof Error && /UNIQUE constraint failed/i.test(error.message);

const eventOf = (key: string) => {
  const [, division, eventId] = key.split(':');
  if (!isDivision(division) || !eventId)
    throw new AppError(409, 'That event is no longer offered.');
  return { division, eventId };
};

/**
 * Change pending assignments after they were given: their due date and what they ask for. Pass
 * one `id`, or `ids` to change the same work for every student it went to; either every change
 * is saved or none is. The work stays in the same event and family: a practice test becomes
 * another practice test (or any test when `targetId` is empty), and a lesson, unit or lab becomes
 * another lesson, unit or lab. Ranked tests are managed from the Ranked Tests tab.
 */
export async function editAssignment(
  db: Database,
  instructor: Profile,
  body: Record<string, unknown>,
) {
  if (instructor.role !== 'instructor') throw new AppError(403, 'Instructor access is required.');
  const group = Array.isArray(body.ids);
  const ids: unknown[] = group ? (body.ids as unknown[]) : [body.id];
  if (!ids.length || ids.length > 200 || ids.some((id) => typeof id !== 'string' || !id))
    throw new AppError(400, 'Choose an assignment.');
  const due = dueDate(body);
  const targetId = body.targetId ?? '';
  if (typeof targetId !== 'string' || targetId.length > 160)
    throw new AppError(400, 'Choose what to assign.');
  const whose = (row: Record<string, unknown>) =>
    group ? String(row.display_name) : 'This student';

  const statements: { sql: string; args: (string | null)[] }[] = [];
  const settle: { key: string; division: Division; eventId: string; studentId: string }[] = [];
  const settleDecks: { key: string; studentId: string }[] = [];
  let result: Record<string, unknown> = {};
  for (const id of new Set(ids as string[])) {
    const study = await db.get(
      `SELECT a.id,a.student_id,a.event_id,a.kind,a.target_id,u.display_name FROM study_assignments a
       JOIN users u ON u.id=a.student_id
       WHERE a.id=? AND a.completed_at IS NULL AND u.school_id=?`,
      id,
      instructor.schoolId,
    );
    if (study) {
      const key = String(study.event_id);
      const { division, eventId } = eventOf(key);
      const kind = body.kind === undefined ? String(study.kind) : body.kind;
      if (kind !== 'Lesson' && kind !== 'Unit' && kind !== 'Lab' && kind !== 'Presentation')
        throw new AppError(400, 'Choose a lesson, unit, presentation, or lab simulation.');
      const target = targetId || String(study.target_id);
      const title = titleOf(division, eventId, kind, target);
      if (
        await db.get(
          `SELECT 1 FROM study_assignments WHERE student_id=? AND event_id=? AND kind=? AND target_id=? AND id<>?`,
          String(study.student_id),
          key,
          kind,
          target,
          id,
        )
      )
        throw new AppError(409, `${whose(study)} already has that item assigned in this event.`);
      statements.push({
        sql: `UPDATE study_assignments SET kind=?,target_id=?,title=?,due_date=?
          WHERE id=? AND completed_at IS NULL`,
        args: [kind, target, title, due, id],
      });
      if (kind === 'Presentation') settleDecks.push({ key, studentId: String(study.student_id) });
      else if (kind !== 'Lab')
        settle.push({ key, division, eventId, studentId: String(study.student_id) });
      result = { id, due, kind, targetId: target, title };
      continue;
    }

    const test = await db.get(
      `SELECT a.id,a.student_id,a.event_id,a.type,u.display_name FROM assignments a
       JOIN users u ON u.id=a.student_id
       WHERE a.id=? AND a.completed_at IS NULL AND a.instructor_id=? AND u.school_id=?`,
      id,
      instructor.id,
      instructor.schoolId,
    );
    if (!test)
      throw new AppError(
        404,
        group
          ? 'One of these assignments was completed or removed. Refresh and try again.'
          : 'Pending assignment not found.',
      );
    if (test.type !== 'Practice')
      throw new AppError(400, 'Edit ranked tests from the Ranked Tests tab.');
    if (body.kind !== undefined && body.kind !== 'Practice')
      throw new AppError(400, 'A practice test can only be changed to another practice test.');
    const key = String(test.event_id);
    const { division, eventId } = eventOf(key);
    if (targetId) titleOf(division, eventId, 'Practice', targetId);
    if (
      targetId &&
      (await db.get(
        `SELECT 1 FROM assignments WHERE student_id=? AND event_id=? AND test_id=? AND completed_at IS NULL AND id<>?`,
        String(test.student_id),
        key,
        targetId,
        id,
      ))
    )
      throw new AppError(409, `${whose(test)} already has that test assigned.`);
    statements.push({
      sql: 'UPDATE assignments SET due_date=?,test_id=? WHERE id=? AND completed_at IS NULL',
      args: [due, targetId || null, id],
    });
    result = { id, due, kind: 'Practice', targetId: targetId || null };
  }

  try {
    const written = await db.batch(statements, 'immediate');
    if (written.some((row) => !row.rowsAffected))
      throw new AppError(409, 'An assignment changed while saving. Refresh and try again.');
  } catch (error) {
    if (isConflict(error))
      throw new AppError(
        409,
        `${group ? 'A student' : 'This student'} already has a practice test in this event due that day. Pick another date.`,
      );
    throw error;
  }
  // Lessons a student already finished complete the edited assignment at once.
  for (const item of settle) {
    const course = lessonsForEvent(item.eventId, item.division);
    if (course) await settleLessons(db, item.key, course, [item.studentId]);
  }
  for (const item of settleDecks) await settlePresentations(db, item.key, [item.studentId]);
  return group ? { updated: statements.length, due } : result;
}

/**
 * Remove the same pending work from every student it went to. Either all of them are removed or
 * none is; finished work stays as a record. Ranked tests are managed from the Ranked Tests tab.
 */
export async function removeAssignments(db: Database, instructor: Profile, body: unknown) {
  if (instructor.role !== 'instructor') throw new AppError(403, 'Instructor access is required.');
  const ids: unknown = body && typeof body === 'object' ? (body as { ids?: unknown }).ids : null;
  if (
    !Array.isArray(ids) ||
    !ids.length ||
    ids.length > 200 ||
    ids.some((id) => typeof id !== 'string' || !id)
  )
    throw new AppError(400, 'Choose assignments to remove.');
  const statements: { sql: string; args: string[] }[] = [];
  for (const id of new Set(ids as string[])) {
    if (
      await db.get(
        `SELECT 1 FROM study_assignments a JOIN users u ON u.id=a.student_id
         WHERE a.id=? AND a.completed_at IS NULL AND u.school_id=?`,
        id,
        instructor.schoolId,
      )
    ) {
      statements.push({
        sql: 'DELETE FROM study_assignments WHERE id=? AND completed_at IS NULL',
        args: [id],
      });
      continue;
    }
    if (
      await db.get(
        `SELECT 1 FROM assignments a JOIN users u ON u.id=a.student_id
         WHERE a.id=? AND a.completed_at IS NULL AND a.type='Practice' AND a.instructor_id=? AND u.school_id=?`,
        id,
        instructor.id,
        instructor.schoolId,
      )
    ) {
      statements.push({
        sql: "DELETE FROM assignments WHERE id=? AND completed_at IS NULL AND type='Practice'",
        args: [id],
      });
      continue;
    }
    throw new AppError(
      404,
      'One of these assignments was completed or removed. Refresh and try again.',
    );
  }
  const written = await db.batch(statements, 'immediate');
  return { removed: written.reduce((sum, row) => sum + row.rowsAffected, 0) };
}

/**
 * Change who has one piece of already-assigned work. `studentIds` is the full list of students
 * who should have it pending: students left off lose their unfinished copy, and new students get
 * it due on `due`. Students who finished it keep their record. Everything is saved or nothing is.
 * Unlike a new assignment, partners are not added automatically: the list is used as given.
 */
export async function setAssignedStudents(
  db: Database,
  instructor: Profile,
  body: Record<string, unknown>,
) {
  if (instructor.role !== 'instructor') throw new AppError(403, 'Instructor access is required.');
  const division = body.division;
  if (!isDivision(division)) throw new AppError(400, 'Choose Division A, B, or C.');
  const event = eventsForDivision(division).find((candidate) => candidate.id === body.eventId);
  if (!event) throw new AppError(400, `Choose a Division ${division} event.`);
  const kind = kinds.find((value) => value === body.kind);
  if (!kind) throw new AppError(400, 'Choose a practice test, lesson, unit, or lab simulation.');
  const targetId = body.targetId ?? '';
  if (typeof targetId !== 'string' || targetId.length > 160 || (!targetId && kind !== 'Practice'))
    throw new AppError(400, 'Choose what to assign.');
  const title = targetId ? titleOf(division, event.id, kind, targetId) : '';
  const wanted: unknown = body.studentIds;
  if (
    !Array.isArray(wanted) ||
    wanted.length > 200 ||
    wanted.some((id) => typeof id !== 'string' || !id)
  )
    throw new AppError(400, 'Choose valid students.');
  const due = dueDate(body);
  const key = eventKey(division, event.id);
  const students = new Map(
    (
      await db.all(
        `SELECT u.id,u.display_name FROM users u WHERE u.school_id=? AND u.role='student' AND u.division=?
         AND NOT EXISTS (SELECT 1 FROM departed_members d WHERE d.user_id=u.id)`,
        instructor.schoolId,
        division,
      )
    ).map((row) => [String(row.id), String(row.display_name)]),
  );
  const keep = new Set(wanted as string[]);
  if ([...keep].some((id) => !students.has(id)))
    throw new AppError(404, `A selected student is not in Division ${division} at your school.`);

  // Everyone who has this work now, finished or not.
  const rows =
    kind === 'Practice'
      ? await db.all(
          `SELECT a.id,a.student_id,a.completed_at FROM assignments a JOIN users u ON u.id=a.student_id
           WHERE u.school_id=? AND a.event_id=? AND a.type='Practice' AND a.instructor_id=?
           AND ${targetId ? 'a.test_id=?' : 'a.test_id IS NULL'}`,
          ...[instructor.schoolId, key, instructor.id, ...(targetId ? [targetId] : [])],
        )
      : await db.all(
          `SELECT a.id,a.student_id,a.completed_at FROM study_assignments a JOIN users u ON u.id=a.student_id
           WHERE u.school_id=? AND a.event_id=? AND a.kind=? AND a.target_id=?`,
          instructor.schoolId,
          key,
          kind,
          targetId,
        );
  const pending = rows.filter((row) => !row.completed_at);
  const finished = new Set(
    rows.filter((row) => row.completed_at).map((row) => String(row.student_id)),
  );
  const has = new Set(pending.map((row) => String(row.student_id)));

  const statements: { sql: string; args: (string | null)[] }[] = [];
  let removed = 0;
  for (const row of pending)
    if (students.has(String(row.student_id)) && !keep.has(String(row.student_id))) {
      removed++;
      statements.push({
        sql:
          kind === 'Practice'
            ? 'DELETE FROM assignments WHERE id=? AND completed_at IS NULL'
            : 'DELETE FROM study_assignments WHERE id=? AND completed_at IS NULL',
        args: [String(row.id)],
      });
    }
  const added: string[] = [];
  const now = new Date().toISOString();
  for (const studentId of keep) {
    if (has.has(studentId)) continue;
    // A lesson, unit or lab is assigned once; a student who finished it keeps that record.
    if (kind !== 'Practice' && finished.has(studentId)) continue;
    if (
      kind === 'Practice' &&
      (await db.get(
        `SELECT 1 FROM assignments WHERE student_id=? AND event_id=? AND type='Practice' AND due_date=? AND completed_at IS NULL`,
        studentId,
        key,
        due,
      ))
    )
      throw new AppError(
        409,
        `${students.get(studentId)} already has a practice test in this event due ${due}. Pick another date.`,
      );
    added.push(studentId);
    statements.push(
      kind === 'Practice'
        ? {
            sql: `INSERT INTO assignments (id,student_id,instructor_id,event_id,type,due_date,test_id)
              VALUES (?,?,?,?,'Practice',?,?)`,
            args: [randomUUID(), studentId, instructor.id, key, due, targetId || null],
          }
        : {
            sql: `INSERT INTO study_assignments (id,student_id,instructor_id,event_id,kind,target_id,title,due_date,assigned_at)
              VALUES (?,?,?,?,?,?,?,?,?)`,
            args: [randomUUID(), studentId, instructor.id, key, kind, targetId, title, due, now],
          },
    );
  }
  if (statements.length) await db.batch(statements, 'immediate');
  // Lessons a new student already finished count at once.
  const course = kind === 'Lesson' || kind === 'Unit' ? lessonsForEvent(event.id, division) : null;
  if (course && added.length) await settleLessons(db, key, course, added);
  if (kind === 'Presentation') await settlePresentations(db, key, added);
  return { added: added.length, removed };
}

export function studentEvent(student: Profile, eventId: unknown) {
  if (student.role !== 'student' || !student.division)
    throw new AppError(403, 'A student account is required.');
  const event = eventsForDivision(student.division).find((candidate) => candidate.id === eventId);
  if (!event) throw new AppError(400, 'Choose an event from your division.');
  return { division: student.division, eventId: event.id };
}

export const saveResult = (
  student: Profile,
  key: string,
  kind: 'Lesson' | 'Lab',
  targetId: string,
  score: number,
  maxScore: number,
  now: string,
) => ({
  sql: `INSERT INTO study_results (student_id,event_id,kind,target_id,score,max_score,submitted_at) VALUES (?,?,?,?,?,?,?)
    ON CONFLICT(student_id,event_id,kind,target_id) DO UPDATE SET score=excluded.score,max_score=excluded.max_score,submitted_at=excluded.submitted_at`,
  args: [student.id, key, kind, targetId, score, maxScore, now],
});

/**
 * Submit one lesson's practice. Multiple-choice answers are graded here against the lesson's key;
 * written answers are self-reviewed by the student. The lesson then counts as completed.
 */
export async function submitLesson(db: Database, student: Profile, body: Record<string, unknown>) {
  const { division, eventId } = studentEvent(student, body.eventId);
  const course = lessonsForEvent(eventId, division);
  const lesson = course?.lessons.find((candidate) => candidate.id === body.lessonId);
  if (!course || !lesson) throw new AppError(404, 'That lesson is not in this event.');
  const given =
    body.answers && typeof body.answers === 'object' && !Array.isArray(body.answers)
      ? (body.answers as Record<string, unknown>)
      : {};
  const answers: Record<string, string> = {};
  for (const question of lesson.practice) {
    const answer = given[question.id];
    if (
      typeof answer !== 'string' ||
      !answer.trim() ||
      answer.length > 10000 ||
      (question.type === 'mcq' && !question.options?.includes(answer))
    )
      throw new AppError(400, 'Answer every practice question before submitting the lesson.');
    answers[question.id] = answer;
  }
  const { earned, possible } = scorePractice(lesson.practice, answers);
  const key = eventKey(division, eventId);
  const now = new Date().toISOString();
  await db.batch(
    [
      {
        sql: 'INSERT OR IGNORE INTO lesson_progress (student_id,event_id,lesson_id,completed_at) VALUES (?,?,?,?)',
        args: [student.id, key, lesson.id, now],
      },
      saveResult(student, key, 'Lesson', lesson.id, earned, possible, now),
    ],
    'immediate',
  );
  await settleLessons(db, key, course, [student.id]);
  return { score: earned, maxScore: possible };
}

const completeLab = (student: Profile, key: string, labId: string, now: string) => ({
  sql: `UPDATE study_assignments SET completed_at=? WHERE student_id=? AND event_id=? AND kind='Lab'
    AND target_id=? AND completed_at IS NULL`,
  args: [now, student.id, key, labId],
});

/**
 * Submit a lab simulation with the student's calculated answer for the setup they chose. The
 * accuracy is how close that answer is to the model's: 100 within the lab's 2% tolerance.
 */
/** Any member with a division: a student, or an instructor viewing student tools. */
export function learnerEvent(profile: Profile, eventId: unknown) {
  if (!profile.division) throw new AppError(403, 'Choose a division first.');
  const event = eventsForDivision(profile.division).find((candidate) => candidate.id === eventId);
  if (!event) throw new AppError(400, 'Choose an event from your division.');
  return { division: profile.division, eventId: event.id };
}

/** `record: false` grades an instructor's try without saving anything. */
export async function submitLab(
  db: Database,
  student: Profile,
  body: Record<string, unknown>,
  { record = true } = {},
) {
  const { division, eventId } = record
    ? studentEvent(student, body.eventId)
    : learnerEvent(student, body.eventId);
  const lab = labsForEvent(division, eventId).find((candidate) => candidate.id === body.labId);
  if (!lab) throw new AppError(404, 'That lab simulation is not in this event.');
  const given =
    body.values && typeof body.values === 'object' && !Array.isArray(body.values)
      ? (body.values as Record<string, unknown>)
      : {};
  const values: Record<string, number> = {};
  for (const control of lab.controls) {
    const value = given[control.key];
    if (typeof value !== 'number' || !(value >= control.min && value <= control.max))
      throw new AppError(400, 'Set every lab control before submitting.');
    values[control.key] = value;
  }
  const scenario = body.scenario;
  if (typeof scenario !== 'number' || !Number.isInteger(scenario) || scenario < 0 || scenario > 4)
    throw new AppError(400, 'Choose a lab sample.');
  const answer = typeof body.answer === 'string' ? Number(body.answer.trim() || NaN) : body.answer;
  if (typeof answer !== 'number' || !Number.isFinite(answer))
    throw new AppError(400, 'Enter your calculated answer as a number before submitting.');
  const model = calculateLab(lab.model, values, scenario);
  if (!model.ready) throw new AppError(409, model.hint || 'Complete the procedure first.');
  const off = Math.abs(answer - model.answer);
  const accuracy =
    off <= Math.max(Math.abs(model.answer) * 0.02, 0.0002)
      ? 100
      : Math.max(0, Math.round(100 * (1 - off / Math.max(Math.abs(model.answer), 0.0002))));
  if (!record) return { accuracy };
  const key = eventKey(division, eventId);
  const now = new Date().toISOString();
  await db.batch(
    [
      saveResult(student, key, 'Lab', lab.id, accuracy, 100, now),
      completeLab(student, key, lab.id, now),
    ],
    'immediate',
  );
  return { accuracy };
}

/** Complete a student's assignment of an ungraded simulation. Unassigned labs record nothing. */
export async function recordLab(db: Database, student: Profile, body: Record<string, unknown>) {
  const { division, eventId } = studentEvent(student, body.eventId);
  if (typeof body.labId !== 'string') throw new AppError(400, 'Choose a lab simulation.');
  titleOf(division, eventId, 'Lab', body.labId);
  const result = await db.batch(
    [completeLab(student, eventKey(division, eventId), body.labId, new Date().toISOString())],
    'immediate',
  );
  return { completed: result[0].rowsAffected };
}

/**
 * Every lesson, lab and practice test one student has submitted, newest first. A student reads
 * their own; an instructor reads a student of their school.
 */
export async function studentWork(
  db: Database,
  viewer: Profile,
  studentId?: unknown,
): Promise<WorkRecord[]> {
  let id = viewer.id;
  if (viewer.role === 'instructor') {
    const student =
      typeof studentId === 'string'
        ? await db.get(
            `SELECT u.id FROM users u WHERE u.id=? AND u.school_id=? AND u.role='student'
             AND NOT EXISTS (SELECT 1 FROM departed_members d WHERE d.user_id=u.id)`,
            studentId,
            viewer.schoolId,
          )
        : undefined;
    if (!student) throw new AppError(404, 'Student not found in your school.');
    id = String(student.id);
  }
  const rows = await db.all(
    `SELECT r.kind AS type,r.event_id,r.target_id,r.score,r.max_score,r.submitted_at AS completed_at
     FROM study_results r WHERE r.student_id=?
     UNION ALL
     SELECT 'Practice',t.event_id,p.test_id,t.score,t.max_score,t.completed_at
     FROM test_attempts t JOIN practice_submissions p ON p.id=t.id WHERE t.student_id=? AND t.type='Practice'
     UNION ALL
     SELECT 'Presentation',x.event_id,x.lesson_id,x.score,x.max_score,x.completed_at
     FROM presentation_results x WHERE x.student_id=?
     ORDER BY completed_at DESC`,
    id,
    id,
    id,
  );
  return rows.map((row) => {
    const [, division, ...rest] = String(row.event_id).split(':') as [string, Division, string];
    const eventId = rest.join(':');
    const type = row.type as WorkRecord['type'];
    const targetId = String(row.target_id);
    const practice =
      type === 'Practice' ? allPracticeTests.find((test) => test.id === targetId) : undefined;
    const title =
      type === 'Lesson' || type === 'Presentation'
        ? lessonsForEvent(eventId, division)?.lessons.find((lesson) => lesson.id === targetId)
            ?.title
        : type === 'Lab'
          ? labsForEvent(division, eventId).find((lab) => lab.id === targetId)?.title
          : practice && practiceTitle(practice);
    const score = Number(row.score);
    const maxScore = Number(row.max_score);
    return {
      type,
      eventId,
      eventName: eventsForDivision(division).find((event) => event.id === eventId)?.name ?? eventId,
      targetId,
      title: title ?? targetId,
      score,
      maxScore,
      percentage: maxScore > 0 ? Math.round((score / maxScore) * 100) : null,
      completedAt: String(row.completed_at),
    };
  });
}
