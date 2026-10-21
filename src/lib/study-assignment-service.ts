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
import { findPracticeTest, practiceTests } from './practice-catalog.ts';
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
      // The PhET companion appears only beside an event's own virtual labs.
      targetId === PHET_LAB && labsForEvent(division, eventId).length > 0
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

const saveResult = (
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
export async function submitLab(db: Database, student: Profile, body: Record<string, unknown>) {
  const { division, eventId } = studentEvent(student, body.eventId);
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
     ORDER BY completed_at DESC`,
    id,
    id,
  );
  return rows.map((row) => {
    const [, division, ...rest] = String(row.event_id).split(':') as [string, Division, string];
    const eventId = rest.join(':');
    const type = row.type as WorkRecord['type'];
    const targetId = String(row.target_id);
    const practice =
      type === 'Practice' ? practiceTests.find((test) => test.id === targetId) : undefined;
    const title =
      type === 'Lesson'
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
