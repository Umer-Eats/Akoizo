import { AppError, eventKey, type Profile } from './domain.ts';
import type { Division } from './events.ts';
import type { AnalyticsActivity, SchoolAnalytics } from './analytics.ts';
import type { Database } from './school-service.ts';
import { communityTeams } from './team-service.ts';
import { lessonsForEvent } from './lessons-registry.ts';

const active = 'NOT EXISTS (SELECT 1 FROM departed_members d WHERE d.user_id=u.id)';
const roster = `u.school_id=? AND u.role='student' AND ${active}`;
const bareEvent = (key: unknown) => String(key).split(':').slice(2).join(':');
const divisionOf = (key: unknown) => String(key).split(':')[1] as Division;
// Practice and ranked attempts share one graded-result shape. Multiple-choice questions carry no
// rubric criteria, so the criteria count separates them from written answers inside SQLite.
const result = 'COALESCE(p.result_json,r.result_json)';
const questionSum = (field: string, kind: '=' | '>') =>
  `(SELECT COALESCE(SUM(json_extract(q.value,'$.${field}')),0) FROM json_each(${result},'$.questions') q
    WHERE json_array_length(q.value,'$.criteria')${kind}0)`;

/** Every score, point and assignment for one school's roster, for the instructor's analytics. */
export async function schoolAnalytics(db: Database, instructor: Profile): Promise<SchoolAnalytics> {
  if (instructor.role !== 'instructor') throw new AppError(403, 'Instructor access is required.');
  return communityAnalytics(db, instructor);
}

/** The same read-only analytics for members of the authenticated community. */
export async function communityAnalytics(db: Database, member: Profile): Promise<SchoolAnalytics> {
  const school = member.schoolId;
  const students = await db.all(
    `SELECT u.id,u.display_name,u.division,
      COALESCE((SELECT SUM(l.points) FROM points_ledger l WHERE l.student_id=u.id),0) AS points
     FROM users u WHERE ${roster} ORDER BY u.display_name,u.id`,
    school,
  );
  const attempts = await db.all(
    `SELECT t.student_id,t.event_id,t.type,t.score,t.max_score,t.completed_at,
      COALESCE(json_extract(${result},'$.pendingPoints'),0) AS pending,
      ${questionSum('earned', '=')} AS mcq_earned, ${questionSum('possible', '=')} AS mcq_possible,
      ${questionSum('earned', '>')} AS written_earned, ${questionSum('possible', '>')} AS written_possible
     FROM test_attempts t JOIN users u ON u.id=t.student_id
     LEFT JOIN practice_submissions p ON p.id=t.id LEFT JOIN ranked_assignments r ON r.id=t.id
     WHERE ${roster} ORDER BY t.completed_at,t.id`,
    school,
  );
  const studentIds = new Set(students.map((student) => String(student.id)));
  const activity = new Map<string, AnalyticsActivity>();
  const row = (studentId: unknown, event: unknown) => {
    const key = `${studentId}|${event}`;
    if (!activity.has(key))
      activity.set(key, {
        studentId: String(studentId),
        division: divisionOf(event),
        eventId: bareEvent(event),
        lessons: 0,
        lessonTotal: lessonsForEvent(bareEvent(event), divisionOf(event))?.lessons.length ?? 0,
        stages: { learn: 0, practice: 0, labs: 0, checkpoint: 0 },
        checkpoint: { earned: 0, possible: 0 },
        lessonPractice: { earned: 0, possible: 0 },
        lessonLabs: { earned: 0, possible: 0 },
        points: 0,
        assigned: 0,
        completed: 0,
      });
    return activity.get(key)!;
  };
  for (const lesson of await db.all(
    `SELECT l.student_id,l.event_id,COUNT(*) AS n FROM lesson_progress l JOIN users u ON u.id=l.student_id
     WHERE ${roster} GROUP BY l.student_id,l.event_id`,
    school,
  ))
    row(lesson.student_id, lesson.event_id).lessons = Number(lesson.n);
  // Finished lesson stages; practice and labs carry a first-try score.
  for (const part of await db.all(
    `SELECT l.student_id,l.event_id,l.part,COUNT(*) AS n,COALESCE(SUM(l.score),0) AS earned,
      COALESCE(SUM(l.max_score),0) AS possible
     FROM lesson_parts l JOIN users u ON u.id=l.student_id
     WHERE ${roster} GROUP BY l.student_id,l.event_id,l.part`,
    school,
  )) {
    const target = row(part.student_id, part.event_id);
    const stage = String(part.part) as keyof AnalyticsActivity['stages'];
    if (stage in target.stages) target.stages[stage] = Number(part.n);
    const tally = { earned: Number(part.earned), possible: Number(part.possible) };
    if (stage === 'practice') target.lessonPractice = tally;
    if (stage === 'labs') target.lessonLabs = tally;
  }
  // Checkpoint accuracy counts every checked answer, including lessons still in progress.
  for (const answers of await db.all(
    `SELECT l.student_id,l.event_id,SUM(l.correct) AS earned,COUNT(*) AS possible
     FROM lesson_answers l JOIN users u ON u.id=l.student_id
     WHERE ${roster} GROUP BY l.student_id,l.event_id`,
    school,
  ))
    row(answers.student_id, answers.event_id).checkpoint = {
      earned: Number(answers.earned),
      possible: Number(answers.possible),
    };
  // Events a student is seated in count toward their lesson total even before they start.
  const teams = await communityTeams(db, member);
  for (const team of teams)
    for (const [eventId, seats] of Object.entries(team.slots))
      for (const studentId of seats)
        if (studentId && studentIds.has(studentId))
          row(studentId, eventKey(team.division, eventId));
  for (const entry of await db.all(
    `SELECT l.student_id,l.event_id,SUM(l.points) AS n FROM points_ledger l JOIN users u ON u.id=l.student_id
     WHERE ${roster} AND l.event_id IS NOT NULL GROUP BY l.student_id,l.event_id`,
    school,
  ))
    row(entry.student_id, entry.event_id).points = Number(entry.n);
  // Ranked tests, lessons and labs are assigned in their own tables; all count as assigned work.
  for (const work of await db.all(
    `SELECT a.student_id,a.event_id,COUNT(*) AS assigned,COUNT(a.completed_at) AS completed
     FROM assignments a JOIN users u ON u.id=a.student_id WHERE ${roster} GROUP BY a.student_id,a.event_id
     UNION ALL
     SELECT a.student_id,t.event_id,COUNT(*),COUNT(a.submitted_at)
     FROM ranked_assignments a JOIN ranked_tests t ON t.id=a.test_id JOIN users u ON u.id=a.student_id
     WHERE ${roster} AND t.school_id=u.school_id GROUP BY a.student_id,t.event_id
     UNION ALL
     SELECT a.student_id,a.event_id,COUNT(*),COUNT(a.completed_at)
     FROM study_assignments a JOIN users u ON u.id=a.student_id WHERE ${roster} GROUP BY a.student_id,a.event_id`,
    school,
    school,
    school,
  )) {
    const target = row(work.student_id, work.event_id);
    target.assigned += Number(work.assigned);
    target.completed += Number(work.completed);
  }
  return {
    teams,
    students: students.map((student) => ({
      id: String(student.id),
      name: String(student.display_name || 'Learner'),
      division: student.division as Division,
      points: Number(student.points),
    })),
    attempts: attempts.map((attempt) => {
      const pending = Number(attempt.pending);
      return {
        studentId: String(attempt.student_id),
        division: divisionOf(attempt.event_id),
        eventId: bareEvent(attempt.event_id),
        type: attempt.type as 'Practice' | 'Ranked',
        completedAt: String(attempt.completed_at),
        overall: {
          earned: Number(attempt.score),
          possible: Math.max(0, Number(attempt.max_score) - pending),
        },
        multipleChoice: {
          earned: Number(attempt.mcq_earned),
          possible: Number(attempt.mcq_possible),
        },
        written: {
          earned: Number(attempt.written_earned),
          possible: Math.max(0, Number(attempt.written_possible) - pending),
        },
      };
    }),
    activity: [...activity.values()],
  };
}
