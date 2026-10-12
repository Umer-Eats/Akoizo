import { randomUUID } from 'node:crypto';
import { AppError, dateInZone, eventKey, isDivision, type Profile } from './domain.ts';
import { eventsForDivision, type Division } from './events.ts';
import { gradePractice, validateAnswers } from './practice-grading.ts';
import { gradeWrittenWithGemini, type PracticeAIConfig } from './practice-ai.ts';
import { applyReviewScores } from './practice-service.ts';
import type { Answers, PracticeResult } from './practice-types.ts';
import {
  buildRankedPaper,
  gradablePaper,
  type RankedBuildConfig,
  type RankedPaper,
} from './ranked-builder.ts';
import {
  RANKED_MINUTES,
  RANKED_QUESTIONS,
  type InstructorRankedDetail,
  type InstructorRankedTest,
  type RankedAttempt,
  type RankedSource,
  type RankedSummary,
  type StudentRankedDetail,
  type StudentRankedTest,
} from './ranked-types.ts';
import type { Database } from './school-service.ts';

type Row = Record<string, string | number | null>;
const active = 'NOT EXISTS (SELECT 1 FROM departed_members d WHERE d.user_id=u.id)';
// A late submission is graded from the last saved draft, not from what the browser sends.
const GRACE_MS = 90_000;
const testColumns = `t.id AS test_id,t.event_id,t.title,t.minutes,t.question_count,t.max_score,t.created_at,e.name AS event_name`;
const attemptColumns = `a.id AS assignment_id,a.student_id,a.due_date,a.started_at,a.submitted_at,a.released_at,a.violations,
  json_extract(a.result_json,'$.score') AS score, json_extract(a.result_json,'$.maxScore') AS result_max,
  json_extract(a.result_json,'$.percentage') AS percentage, json_extract(a.result_json,'$.pendingPoints') AS pending,
  json_extract(a.result_json,'$.automaticGrading') AS grading`;

function requireInstructor(profile: Profile) {
  if (profile.role !== 'instructor') throw new AppError(403, 'Instructor access is required.');
}
function requireStudent(profile: Profile) {
  if (profile.role !== 'student') throw new AppError(403, 'A student account is required.');
}
const bareEvent = (key: unknown) => String(key).split(':').slice(2).join(':');
const divisionOf = (key: unknown) => String(key).split(':')[1] as Division;
/** Ranked points follow the percentage score, so every test is worth up to 100. */
const pointsFor = (result: PracticeResult) =>
  Math.max(0, Math.min(100, Math.round(result.percentage)));

function summaryOf(row: Row): RankedSummary {
  return {
    id: String(row.test_id),
    eventId: bareEvent(row.event_id),
    eventName: String(row.event_name),
    division: divisionOf(row.event_id),
    title: String(row.title),
    minutes: Number(row.minutes),
    questionCount: Number(row.question_count),
    maxScore: Number(row.max_score),
    createdAt: String(row.created_at),
  };
}
function deadlineOf(row: Row) {
  return row.started_at
    ? new Date(Date.parse(String(row.started_at)) + Number(row.minutes) * 60_000).toISOString()
    : null;
}
function attemptOf(row: Row): RankedAttempt {
  return {
    assignmentId: String(row.assignment_id),
    due: String(row.due_date),
    status: row.released_at
      ? 'released'
      : row.submitted_at
        ? 'submitted'
        : row.started_at
          ? 'in-progress'
          : 'assigned',
    startedAt: row.started_at ? String(row.started_at) : null,
    deadline: deadlineOf(row),
    submittedAt: row.submitted_at ? String(row.submitted_at) : null,
    violations: Number(row.violations || 0),
    score: row.submitted_at
      ? {
          score: Number(row.score || 0),
          maxScore: Number(row.result_max || row.max_score),
          percentage: Number(row.percentage || 0),
          pendingPoints: Number(row.pending || 0),
          grading: row.grading === 'unavailable' ? 'pending' : 'complete',
        }
      : null,
  };
}
async function testFor(db: Database, instructor: Profile, id: unknown) {
  requireInstructor(instructor);
  const row =
    typeof id === 'string'
      ? await db.get(
          `SELECT ${testColumns},t.sources_json,t.paper_json FROM ranked_tests t JOIN events e ON e.id=t.event_id
           WHERE t.id=? AND t.school_id=?`,
          id,
          instructor.schoolId,
        )
      : undefined;
  if (!row) throw new AppError(404, 'Ranked test not found in your school.');
  return row;
}
/** One student's assignment, joined to its test. Scoped to the school on both sides. */
async function attemptFor(db: Database, schoolId: string, where: string, ...args: string[]) {
  return db.get(
    `SELECT ${testColumns},${attemptColumns},t.sources_json,t.paper_json,a.draft_json,a.result_json
     FROM ranked_assignments a JOIN ranked_tests t ON t.id=a.test_id JOIN events e ON e.id=t.event_id
     JOIN users u ON u.id=a.student_id
     WHERE t.school_id=? AND u.school_id=t.school_id AND ${active} AND ${where}`,
    schoolId,
    ...args,
  );
}
function whole(value: unknown, range: { min: number; max: number }, message: string) {
  if (
    typeof value !== 'number' ||
    !Number.isInteger(value) ||
    value < range.min ||
    value > range.max
  )
    throw new AppError(400, message);
  return value;
}

export async function createRankedTest(
  db: Database,
  instructor: Profile,
  body: Record<string, unknown>,
  config: RankedBuildConfig = {},
) {
  requireInstructor(instructor);
  const division = body.division;
  if (!isDivision(division)) throw new AppError(400, 'Choose Division A, B, or C.');
  const event = eventsForDivision(division).find((candidate) => candidate.id === body.eventId);
  if (!event) throw new AppError(400, `Choose a Division ${division} event.`);
  const questionCount = whole(
    body.questionCount ?? RANKED_QUESTIONS.default,
    RANKED_QUESTIONS,
    `Choose between ${RANKED_QUESTIONS.min} and ${RANKED_QUESTIONS.max} questions.`,
  );
  const minutes = whole(
    body.minutes ?? RANKED_MINUTES.default,
    RANKED_MINUTES,
    `Choose a time limit between ${RANKED_MINUTES.min} and ${RANKED_MINUTES.max} minutes.`,
  );
  const key = eventKey(division, event.id);
  const existing = await db.all(
    'SELECT event_id FROM ranked_tests WHERE school_id=?',
    instructor.schoolId,
  );
  if (existing.length >= 200)
    throw new AppError(409, 'Your school has 200 ranked tests. Delete unused tests first.');
  let title = `${event.name} Ranked Test ${existing.filter((row) => row.event_id === key).length + 1}`;
  if (body.title !== undefined && body.title !== '') {
    if (
      typeof body.title !== 'string' ||
      !body.title.trim() ||
      body.title.trim().length > 80 ||
      /[\u0000-\u001f]/.test(body.title)
    )
      throw new AppError(400, 'Enter a test name of up to 80 characters.');
    title = body.title.trim();
  }
  const paper = await buildRankedPaper(division, event.id, questionCount, config);
  const id = randomUUID();
  await db.batch(
    [
      {
        sql: `INSERT INTO ranked_tests (id,school_id,instructor_id,event_id,title,minutes,question_count,max_score,sources_json,paper_json,created_at)
          VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        args: [
          id,
          instructor.schoolId,
          instructor.id,
          key,
          title,
          minutes,
          paper.questions.length,
          paper.maxScore,
          JSON.stringify(paper.sources),
          JSON.stringify(paper),
          new Date().toISOString(),
        ],
      },
    ],
    'immediate',
  );
  return { id };
}

export async function listRankedForInstructor(
  db: Database,
  instructor: Profile,
): Promise<InstructorRankedTest[]> {
  requireInstructor(instructor);
  const tests = await db.all(
    `SELECT ${testColumns},t.sources_json FROM ranked_tests t JOIN events e ON e.id=t.event_id
     WHERE t.school_id=? ORDER BY t.created_at DESC,t.id`,
    instructor.schoolId,
  );
  const attempts = await db.all(
    `SELECT a.test_id,u.display_name,t.minutes,t.max_score,${attemptColumns}
     FROM ranked_assignments a JOIN ranked_tests t ON t.id=a.test_id JOIN users u ON u.id=a.student_id
     WHERE t.school_id=? AND u.school_id=t.school_id AND ${active} ORDER BY u.display_name,u.id`,
    instructor.schoolId,
  );
  return tests.map((test) => ({
    ...summaryOf(test),
    sources: JSON.parse(String(test.sources_json)) as RankedSource[],
    assignments: attempts
      .filter((row) => row.test_id === test.test_id)
      .map((row) => ({
        ...attemptOf(row),
        studentId: String(row.student_id),
        studentName: String(row.display_name || 'Learner'),
      })),
  }));
}

export async function rankedForInstructor(
  db: Database,
  instructor: Profile,
  testId: unknown,
): Promise<InstructorRankedDetail> {
  const row = await testFor(db, instructor, testId);
  const paper = JSON.parse(String(row.paper_json)) as RankedPaper;
  const test = (await listRankedForInstructor(db, instructor)).find((t) => t.id === row.test_id)!;
  const results = await db.all(
    `SELECT a.id,a.result_json FROM ranked_assignments a JOIN users u ON u.id=a.student_id
     WHERE a.test_id=? AND a.result_json IS NOT NULL AND u.school_id=? AND ${active}`,
    test.id,
    instructor.schoolId,
  );
  return {
    test,
    questions: paper.questions,
    answerKey: {
      ...gradePractice(gradablePaper(test.id, test.eventId, paper), {}),
      id: test.id,
      completedAt: test.createdAt,
    },
    origins: Object.fromEntries(
      Object.entries(paper.origins).map(([id, origin]) => [
        id,
        `${paper.sources.find((source) => source.testId === origin.testId)?.title ?? origin.testId}${origin.aiKey ? ' · AI reference answer' : ''}`,
      ]),
    ),
    results: Object.fromEntries(
      results.map((result) => [String(result.id), JSON.parse(String(result.result_json))]),
    ),
  };
}

/**
 * Assign one test to students of one school. `everyone` reaches every student seated in the
 * test's event on any team. Named students bring their event partners with them.
 */
export async function assignRanked(
  db: Database,
  instructor: Profile,
  body: Record<string, unknown>,
) {
  const test = await testFor(db, instructor, body.testId);
  const division = divisionOf(test.event_id);
  const today = dateInZone(typeof body.timeZone === 'string' ? body.timeZone : 'UTC');
  const due = body.due;
  if (typeof due !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(due) || due < today)
    throw new AppError(400, 'Choose a due date on or after today.');
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
      String(test.event_id),
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
  const now = new Date().toISOString();
  const written = await db.batch(
    [...recipients].map((studentId) => ({
      sql: 'INSERT OR IGNORE INTO ranked_assignments (id,test_id,student_id,due_date,assigned_at) VALUES (?,?,?,?,?)',
      args: [randomUUID(), String(test.test_id), studentId, due, now],
    })),
    'immediate',
  );
  const assigned = written.reduce((sum, result) => sum + result.rowsAffected, 0);
  return { assigned, alreadyAssigned: recipients.size - assigned };
}

export async function unassignRanked(db: Database, instructor: Profile, assignmentId: unknown) {
  requireInstructor(instructor);
  if (typeof assignmentId !== 'string') throw new AppError(400, 'Choose an assignment.');
  const result = await db.batch(
    [
      {
        sql: `DELETE FROM ranked_assignments WHERE id=? AND started_at IS NULL
          AND test_id IN (SELECT id FROM ranked_tests WHERE school_id=?)`,
        args: [assignmentId, instructor.schoolId],
      },
    ],
    'immediate',
  );
  if (!result[0].rowsAffected)
    throw new AppError(409, 'That student has already started this test.');
}

export async function deleteRankedTest(db: Database, instructor: Profile, testId: unknown) {
  const test = await testFor(db, instructor, testId);
  // One transaction: the test goes only if no attempt exists when the delete runs.
  const result = await db.batch(
    [
      {
        sql: `DELETE FROM ranked_assignments WHERE test_id=? AND NOT EXISTS
          (SELECT 1 FROM ranked_assignments s WHERE s.test_id=? AND s.started_at IS NOT NULL)`,
        args: [String(test.test_id), String(test.test_id)],
      },
      {
        sql: `DELETE FROM ranked_tests WHERE id=? AND school_id=? AND NOT EXISTS
          (SELECT 1 FROM ranked_assignments s WHERE s.test_id=?)`,
        args: [String(test.test_id), instructor.schoolId, String(test.test_id)],
      },
    ],
    'immediate',
  );
  if (!result[1].rowsAffected)
    throw new AppError(409, 'Students have started this test, so it cannot be deleted.');
}

/** Drop one question from a test nobody has started, such as one that needs a missing diagram. */
export async function removeRankedQuestion(
  db: Database,
  instructor: Profile,
  body: Record<string, unknown>,
) {
  const test = await testFor(db, instructor, body.testId);
  const paper = JSON.parse(String(test.paper_json)) as RankedPaper;
  const index = paper.questions.findIndex((question) => question.id === body.questionId);
  if (index < 0) throw new AppError(404, 'That question is not in this test.');
  if (paper.questions.length <= RANKED_QUESTIONS.min)
    throw new AppError(409, `A ranked test needs at least ${RANKED_QUESTIONS.min} questions.`);
  const [removed] = paper.questions.splice(index, 1);
  const origin = paper.origins[removed.id];
  delete paper.keys[removed.id];
  delete paper.origins[removed.id];
  paper.questions.forEach((question, i) => (question.label = `Question ${i + 1}`));
  paper.sources = paper.sources
    .map((source) =>
      source.testId === origin.testId ? { ...source, questions: source.questions - 1 } : source,
    )
    .filter((source) => source.questions > 0);
  paper.maxScore = Math.round(paper.questions.reduce((sum, q) => sum + q.points, 0) * 100) / 100;
  const result = await db.batch(
    [
      {
        sql: `UPDATE ranked_tests SET question_count=?,max_score=?,sources_json=?,paper_json=?
          WHERE id=? AND school_id=? AND paper_json=? AND NOT EXISTS
          (SELECT 1 FROM ranked_assignments s WHERE s.test_id=? AND s.started_at IS NOT NULL)`,
        args: [
          paper.questions.length,
          paper.maxScore,
          JSON.stringify(paper.sources),
          JSON.stringify(paper),
          String(test.test_id),
          instructor.schoolId,
          String(test.paper_json),
          String(test.test_id),
        ],
      },
    ],
    'immediate',
  );
  if (!result[0].rowsAffected)
    throw new AppError(409, 'Students have started this test, so its questions are locked.');
}

/** Show (or hide again) full results for some or all students who have submitted. */
export async function releaseRanked(
  db: Database,
  instructor: Profile,
  body: Record<string, unknown>,
) {
  const test = await testFor(db, instructor, body.testId);
  if (typeof body.released !== 'boolean') throw new AppError(400, 'Choose release or hide.');
  const ids = body.studentIds;
  if (
    ids !== undefined &&
    (!Array.isArray(ids) ||
      !ids.length ||
      ids.length > 200 ||
      ids.some((id) => typeof id !== 'string'))
  )
    throw new AppError(400, 'Choose valid students.');
  const result = await db.batch(
    [
      {
        sql: `UPDATE ranked_assignments SET released_at=? WHERE test_id=? AND submitted_at IS NOT NULL
          ${ids ? `AND student_id IN (${ids.map(() => '?').join(',')})` : ''}`,
        args: [
          body.released ? new Date().toISOString() : null,
          String(test.test_id),
          ...((ids as string[] | undefined) ?? []),
        ],
      },
    ],
    'immediate',
  );
  return { updated: result[0].rowsAffected };
}

function studentTest(row: Row): StudentRankedTest {
  return { ...summaryOf(row), ...attemptOf(row) };
}
export async function listRankedForStudent(
  db: Database,
  student: Profile,
): Promise<StudentRankedTest[]> {
  requireStudent(student);
  const rows = await db.all(
    `SELECT ${testColumns},${attemptColumns} FROM ranked_assignments a
     JOIN ranked_tests t ON t.id=a.test_id JOIN events e ON e.id=t.event_id
     WHERE a.student_id=? AND t.school_id=? ORDER BY a.submitted_at IS NOT NULL,a.due_date,a.assigned_at`,
    student.id,
    student.schoolId,
  );
  return rows.map(studentTest);
}

/** Questions reach the browser only after the test starts; answers and rubric only after release. */
export async function rankedForStudent(
  db: Database,
  student: Profile,
  testId: unknown,
): Promise<StudentRankedDetail> {
  requireStudent(student);
  const row =
    typeof testId === 'string'
      ? await attemptFor(db, student.schoolId, 'a.test_id=? AND a.student_id=?', testId, student.id)
      : undefined;
  if (!row) throw new AppError(404, 'This ranked test is not assigned to you.');
  const test = studentTest(row);
  const detail: StudentRankedDetail = { test, now: new Date().toISOString() };
  const paper = JSON.parse(String(row.paper_json)) as RankedPaper;
  if (test.status === 'in-progress')
    detail.paper = {
      questions: paper.questions,
      answers: row.draft_json ? (JSON.parse(String(row.draft_json)) as Answers) : {},
    };
  if (test.status === 'released')
    detail.review = {
      questions: paper.questions,
      result: JSON.parse(String(row.result_json)) as PracticeResult,
      sources: paper.sources,
    };
  return detail;
}

export async function startRanked(db: Database, student: Profile, testId: unknown) {
  const before = await rankedForStudent(db, student, testId);
  if (before.test.status !== 'assigned' && before.test.status !== 'in-progress')
    throw new AppError(409, 'You have already submitted this test.');
  await db.batch(
    [
      {
        sql: 'UPDATE ranked_assignments SET started_at=? WHERE id=? AND student_id=? AND started_at IS NULL',
        args: [new Date().toISOString(), before.test.assignmentId, student.id],
      },
    ],
    'immediate',
  );
  return rankedForStudent(db, student, testId);
}

/** Autosave. Also records how many times the student left full screen or the tab. */
export async function saveRankedDraft(
  db: Database,
  student: Profile,
  body: Record<string, unknown>,
) {
  requireStudent(student);
  const row =
    typeof body.testId === 'string'
      ? await attemptFor(
          db,
          student.schoolId,
          'a.test_id=? AND a.student_id=?',
          body.testId,
          student.id,
        )
      : undefined;
  if (!row || !row.started_at || row.submitted_at)
    throw new AppError(409, 'This test is not in progress.');
  if (Date.now() > Date.parse(deadlineOf(row)!) + GRACE_MS)
    throw new AppError(409, 'Time is up. Submit your test.');
  const paper = JSON.parse(String(row.paper_json)) as RankedPaper;
  const answers = validateAnswers(
    gradablePaper(String(row.test_id), bareEvent(row.event_id), paper),
    body.answers,
  );
  const violations =
    typeof body.violations === 'number' && Number.isInteger(body.violations)
      ? Math.max(0, Math.min(5, body.violations))
      : 0;
  await db.batch(
    [
      {
        sql: `UPDATE ranked_assignments SET draft_json=?,violations=violations+?
          WHERE id=? AND student_id=? AND submitted_at IS NULL`,
        args: [JSON.stringify(answers), violations, String(row.assignment_id), student.id],
      },
    ],
    'immediate',
  );
  return { saved: true };
}

/** Save the attempt with its objective score first, so a slow grading pass can never lose it. */
async function finalize(db: Database, row: Row, answers: Answers, config: PracticeAIConfig) {
  const id = String(row.assignment_id);
  const paper = JSON.parse(String(row.paper_json)) as RankedPaper;
  const gradable = gradablePaper(String(row.test_id), bareEvent(row.event_id), paper);
  const initial = gradePractice(gradable, answers);
  const now = new Date().toISOString();
  const result: PracticeResult = {
    ...initial,
    id,
    completedAt: now,
    // 'unavailable' marks written answers that still need the Gemini pass.
    automaticGrading: initial.pendingPoints ? 'unavailable' : 'complete',
  };
  const studentId = String(row.student_id);
  await db.batch(
    [
      {
        sql: 'UPDATE ranked_assignments SET submitted_at=?,draft_json=?,result_json=? WHERE id=? AND submitted_at IS NULL',
        args: [now, JSON.stringify(answers), JSON.stringify(result), id],
      },
      // changes() directly follows the submission, so a repeated submit completes nothing twice.
      {
        sql: `UPDATE assignments SET completed_at=? WHERE id=(SELECT id FROM assignments WHERE student_id=? AND event_id=?
          AND type='Ranked' AND completed_at IS NULL ORDER BY due_date,created_at,id LIMIT 1) AND changes()=1`,
        args: [now, studentId, String(row.event_id)],
      },
      {
        sql: `INSERT OR IGNORE INTO test_attempts (id,student_id,event_id,type,score,max_score,points_awarded,started_at,completed_at)
          VALUES (?,?,?,'Ranked',?,?,?,?,?)`,
        args: [
          id,
          studentId,
          String(row.event_id),
          result.score,
          result.maxScore,
          pointsFor(result),
          String(row.started_at),
          now,
        ],
      },
      {
        sql: `INSERT OR IGNORE INTO points_ledger (id,student_id,event_id,test_attempt_id,points,reason) VALUES (?,?,?,?,?,'Ranked test')`,
        args: [id, studentId, String(row.event_id), id, pointsFor(result)],
      },
    ],
    'immediate',
  );
  if (result.pendingPoints) await gradeRankedWritten(db, id, config);
}

async function saveResult(db: Database, id: string, result: PracticeResult, previous: string) {
  const written = await db.batch(
    [
      {
        sql: 'UPDATE ranked_assignments SET result_json=? WHERE id=? AND result_json=?',
        args: [JSON.stringify(result), id, previous],
      },
      {
        sql: 'UPDATE test_attempts SET score=?,points_awarded=? WHERE id=? AND changes()=1',
        args: [result.score, pointsFor(result), id],
      },
      {
        sql: 'UPDATE points_ledger SET points=? WHERE id=? AND changes()=1',
        args: [pointsFor(result), id],
      },
    ],
    'immediate',
  );
  return written[0].rowsAffected > 0;
}

/** Grade unresolved written answers against the rubric. Safe to repeat; a failure changes nothing. */
async function gradeRankedWritten(db: Database, id: string, config: PracticeAIConfig) {
  const row = await db.get(
    `SELECT a.result_json,t.id AS test_id,t.event_id,t.paper_json FROM ranked_assignments a
     JOIN ranked_tests t ON t.id=a.test_id WHERE a.id=? AND a.result_json IS NOT NULL`,
    id,
  );
  if (!row) return false;
  const previous = JSON.parse(String(row.result_json)) as PracticeResult;
  if (previous.automaticGrading !== 'unavailable' || previous.reviewedAt) return true;
  const paper = JSON.parse(String(row.paper_json)) as RankedPaper;
  const graded = await gradeWrittenWithGemini(
    gradablePaper(String(row.test_id), bareEvent(row.event_id), paper),
    previous,
    config,
  );
  if (graded.automaticGrading !== 'complete') return false;
  return saveResult(
    db,
    id,
    { ...previous, ...graded, autoGradedAt: new Date().toISOString() },
    String(row.result_json),
  );
}

export async function submitRanked(
  db: Database,
  student: Profile,
  body: Record<string, unknown>,
  config: PracticeAIConfig = {},
) {
  requireStudent(student);
  const row =
    typeof body.testId === 'string'
      ? await attemptFor(
          db,
          student.schoolId,
          'a.test_id=? AND a.student_id=?',
          body.testId,
          student.id,
        )
      : undefined;
  if (!row) throw new AppError(404, 'This ranked test is not assigned to you.');
  if (!row.started_at) throw new AppError(409, 'Start the test before submitting.');
  if (!row.submitted_at) {
    const paper = JSON.parse(String(row.paper_json)) as RankedPaper;
    const late = Date.now() > Date.parse(deadlineOf(row)!) + GRACE_MS;
    const answers = late
      ? row.draft_json
        ? (JSON.parse(String(row.draft_json)) as Answers)
        : {}
      : validateAnswers(
          gradablePaper(String(row.test_id), bareEvent(row.event_id), paper),
          body.answers,
        );
    await finalize(db, row, answers, config);
  }
  return rankedForStudent(db, student, body.testId);
}

/** A student may ask again for the written-answer pass when Gemini was unavailable at submit. */
export async function gradeRankedForStudent(
  db: Database,
  student: Profile,
  testId: unknown,
  config: PracticeAIConfig = {},
) {
  const detail = await rankedForStudent(db, student, testId);
  if (!detail.test.submittedAt) throw new AppError(409, 'Submit the test first.');
  if (!(await gradeRankedWritten(db, detail.test.assignmentId, config)))
    throw new AppError(
      503,
      'Written answers could not be graded just now. Your saved score is unchanged. Try again.',
    );
  return rankedForStudent(db, student, testId);
}

async function instructorAttempt(db: Database, instructor: Profile, assignmentId: unknown) {
  requireInstructor(instructor);
  const row =
    typeof assignmentId === 'string'
      ? await attemptFor(db, instructor.schoolId, 'a.id=?', assignmentId)
      : undefined;
  if (!row) throw new AppError(404, 'That attempt is not in your school.');
  return row;
}

/** Collect an attempt whose time ran out before the student submitted. */
export async function collectRanked(
  db: Database,
  instructor: Profile,
  assignmentId: unknown,
  config: PracticeAIConfig = {},
) {
  const row = await instructorAttempt(db, instructor, assignmentId);
  if (!row.started_at || row.submitted_at)
    throw new AppError(409, 'This attempt is not waiting to be collected.');
  if (Date.now() <= Date.parse(deadlineOf(row)!))
    throw new AppError(409, 'This student still has time left.');
  await finalize(
    db,
    row,
    row.draft_json ? (JSON.parse(String(row.draft_json)) as Answers) : {},
    config,
  );
}

export async function regradeRanked(
  db: Database,
  instructor: Profile,
  assignmentId: unknown,
  config: PracticeAIConfig = {},
) {
  const row = await instructorAttempt(db, instructor, assignmentId);
  if (!row.submitted_at) throw new AppError(409, 'This test has not been submitted.');
  if (!(await gradeRankedWritten(db, String(row.assignment_id), config)))
    throw new AppError(503, 'Written answers could not be graded just now. Try again.');
}

/** Instructor scores for written answers the automatic pass left for review. */
export async function reviewRanked(
  db: Database,
  instructor: Profile,
  body: Record<string, unknown>,
) {
  const row = await instructorAttempt(db, instructor, body.assignmentId);
  if (!row.result_json) throw new AppError(409, 'This test has not been submitted.');
  if (!body.scores || typeof body.scores !== 'object' || Array.isArray(body.scores))
    throw new AppError(400, 'Enter a score for each pending rubric item.');
  const result = JSON.parse(String(row.result_json)) as PracticeResult;
  if (!result.pendingPoints)
    throw new AppError(409, 'This attempt has no answers waiting for review.');
  applyReviewScores(result, body.scores as Record<string, unknown>);
  result.automaticGrading = 'complete';
  if (!(await saveResult(db, String(row.assignment_id), result, String(row.result_json))))
    throw new AppError(409, 'This attempt changed while you were reviewing. Refresh the results.');
}
