import { createHash } from 'node:crypto';
import { AppError, eventKey, type Profile } from './domain.ts';
import { findPracticeTest, practiceTests } from './practice-catalog.ts';
import { gradePractice, validateAnswers } from './practice-grading.ts';
import { practiceTitle, type PracticeResult, type PracticeReview } from './practice-types.ts';
import type { Database } from './school-service.ts';

export async function submitPractice(
  db: Database,
  profile: Profile,
  input: Record<string, unknown>,
) {
  if (profile.role !== 'student' || !profile.division)
    throw new AppError(403, 'A student account is required.');
  if (
    typeof input.testId !== 'string' ||
    typeof input.submissionId !== 'string' ||
    !/^[\da-f-]{36}$/i.test(input.submissionId)
  )
    throw new AppError(400, 'Choose a test and try again.');
  const test = findPracticeTest(profile.division, input.testId);
  const answers = validateAnswers(test, input.answers);
  // The same browser submission can be retried safely, even after a lost response.
  const id = createHash('sha256')
    .update(`${profile.id}:${test.id}:${input.submissionId}`)
    .digest('hex');
  const previous = await db.get(
    'SELECT result_json FROM practice_submissions WHERE id=? AND student_id=?',
    id,
    profile.id,
  );
  if (previous) return JSON.parse(String(previous.result_json)) as PracticeResult;
  const now = new Date().toISOString();
  const result: PracticeResult = { ...gradePractice(test, answers), id, completedAt: now };
  const eventId = eventKey(profile.division, test.eventId);
  await db.batch(
    [
      {
        sql: `INSERT OR IGNORE INTO test_attempts (id,student_id,event_id,type,score,max_score,points_awarded,started_at,completed_at) VALUES (?,?,?,'Practice',?,?,0,?,?)`,
        args: [id, profile.id, eventId, result.score, result.maxScore, now, now],
      },
      {
        sql: `INSERT OR IGNORE INTO practice_submissions (id,student_id,test_id,result_json,created_at) VALUES (?,?,?,?,?)`,
        args: [id, profile.id, test.id, JSON.stringify(result), now],
      },
      // changes() is connection-local and directly follows the submission insert. Retries cannot complete another assignment.
      {
        sql: `UPDATE assignments SET completed_at=? WHERE id=(SELECT id FROM assignments WHERE student_id=? AND event_id=? AND type='Practice' AND completed_at IS NULL ORDER BY due_date,created_at,id LIMIT 1) AND changes()=1`,
        args: [now, profile.id, eventId],
      },
    ],
    'immediate',
  );
  const stored = await db.get(
    'SELECT result_json FROM practice_submissions WHERE id=? AND student_id=?',
    id,
    profile.id,
  );
  if (!stored) throw new AppError(503, 'Your test could not be saved. Please submit again.');
  return JSON.parse(String(stored.result_json)) as PracticeResult;
}
export async function practiceHistory(db: Database, profile: Profile, testId: string) {
  if (profile.role !== 'student' || !profile.division)
    throw new AppError(403, 'A student account is required.');
  findPracticeTest(profile.division, testId);
  const rows = await db.all(
    'SELECT result_json FROM practice_submissions WHERE student_id=? AND test_id=? ORDER BY created_at DESC LIMIT 20',
    profile.id,
    testId,
  );
  return rows.map((row) => JSON.parse(String(row.result_json)) as PracticeResult);
}

export async function pendingPracticeReviews(
  db: Database,
  profile: Profile,
): Promise<PracticeReview[]> {
  if (profile.role !== 'instructor') throw new AppError(403, 'An instructor account is required.');
  const rows = await db.all(
    `SELECT p.result_json,u.display_name FROM practice_submissions p JOIN users u ON u.id=p.student_id
    WHERE u.school_id=? AND NOT EXISTS(SELECT 1 FROM departed_members d WHERE d.user_id=u.id)
    AND json_extract(p.result_json,'$.pendingPoints')>0 ORDER BY p.created_at LIMIT 100`,
    profile.schoolId,
  );
  return rows.flatMap((row) => {
    const result = JSON.parse(String(row.result_json)) as PracticeResult;
    const test = practiceTests.find((t) => t.id === result.testId);
    return test
      ? [
          {
            studentName: String(row.display_name || 'Learner'),
            title: practiceTitle(test),
            result,
            questions: test.questions,
          },
        ]
      : [];
  });
}
export async function reviewPractice(
  db: Database,
  profile: Profile,
  input: Record<string, unknown>,
) {
  if (profile.role !== 'instructor') throw new AppError(403, 'An instructor account is required.');
  if (
    typeof input.id !== 'string' ||
    !input.scores ||
    typeof input.scores !== 'object' ||
    Array.isArray(input.scores)
  )
    throw new AppError(400, 'Enter a score for each pending rubric item.');
  const row = await db.get(
    `SELECT p.result_json FROM practice_submissions p JOIN users u ON u.id=p.student_id WHERE p.id=? AND u.school_id=? AND NOT EXISTS(SELECT 1 FROM departed_members d WHERE d.user_id=u.id)`,
    input.id,
    profile.schoolId,
  );
  if (!row) throw new AppError(404, 'That submission is not in your school.');
  const result = JSON.parse(String(row.result_json)) as PracticeResult;
  if (!result.pendingPoints)
    throw new AppError(409, 'This submission has already been reviewed. Refresh the list.');
  const scores = input.scores as Record<string, unknown>;
  const pending = result.questions.flatMap((q) =>
    q.criteria.filter((c) => c.needsReview).map((c) => `${q.id}/${c.id}`),
  );
  if (
    Object.keys(scores).length !== pending.length ||
    Object.keys(scores).some((key) => !pending.includes(key))
  )
    throw new AppError(400, 'Review every pending rubric item.');
  for (const question of result.questions) {
    for (const criterion of question.criteria) {
      if (!criterion.needsReview) continue;
      const value = scores[`${question.id}/${criterion.id}`];
      if (
        typeof value !== 'number' ||
        !Number.isFinite(value) ||
        value < 0 ||
        value > criterion.points
      )
        throw new AppError(400, 'Scores must be between zero and the rubric maximum.');
      criterion.earned = value;
      criterion.needsReview = false;
    }
    if (question.criteria.length)
      question.earned = question.criteria.reduce((sum, c) => sum + c.earned, 0);
  }
  result.score = result.questions.reduce((sum, q) => sum + q.earned, 0);
  result.pendingPoints = 0;
  result.percentage = Math.round((result.score / result.maxScore) * 10000) / 100;
  result.reviewedAt = new Date().toISOString();
  const written = await db.batch(
    [
      {
        sql: 'UPDATE practice_submissions SET result_json=? WHERE id=? AND result_json=?',
        args: [JSON.stringify(result), result.id, String(row.result_json)],
      },
      {
        sql: 'UPDATE test_attempts SET score=? WHERE id=? AND changes()=1',
        args: [result.score, result.id],
      },
    ],
    'immediate',
  );
  if (!written[0].rowsAffected)
    throw new AppError(409, 'Another instructor updated this submission. Refresh the list.');
  return result;
}
