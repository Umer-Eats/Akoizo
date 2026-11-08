import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import { registerMember, type Database } from '../src/lib/school-service.ts';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';
import { assignWork, studentWork } from '../src/lib/study-assignment-service.ts';
import {
  checkLessonAnswer,
  lessonProgress,
  recordLessonPart,
  resetCheckpoint,
} from '../src/lib/lesson-checkpoint-service.ts';
import { gradeLessonAnswer } from '../src/lib/lesson-ai.ts';
import { checkpointProgress, readAttempt } from '../src/lib/lesson-practice.ts';
import { createTeam, updateTeam } from '../src/lib/team-service.ts';

function fixture() {
  const raw = new DatabaseSync(':memory:');
  raw.exec('PRAGMA foreign_keys=ON');
  for (const sql of schema) raw.exec(sql);
  for (const seed of eventSeeds) raw.prepare(seed.sql).run(...seed.args);
  const db: Database = {
    async get(sql, ...args) {
      return raw.prepare(sql).get(...args) as Awaited<ReturnType<Database['get']>>;
    },
    async all(sql, ...args) {
      return raw.prepare(sql).all(...args) as Awaited<ReturnType<Database['all']>>;
    },
    async batch(statements) {
      raw.exec('BEGIN IMMEDIATE');
      try {
        const result = statements.map(({ sql, args }) => ({
          rowsAffected: Number(raw.prepare(sql).run(...args).changes),
          rows: [],
        }));
        raw.exec('COMMIT');
        return result;
      } catch (error) {
        raw.exec('ROLLBACK');
        throw error;
      }
    },
  };
  return db;
}
async function people(db: Database) {
  const identity = (uid: string) => ({ uid, email: `${uid}@example.test` });
  const teacher = await registerMember(
    db,
    identity('t1'),
    {
      role: 'instructor',
      displayName: 't1',
      instructorInvitePassword: 'invite',
      schoolCommunityId: 'ppchs',
    },
    'invite',
  );
  const amy = (
    await registerMember(
      db,
      identity('amy'),
      {
        role: 'student',
        displayName: 'amy',
        division: 'C',
        schoolPassword: teacher.credentials!.joiningPassword,
      },
      'invite',
    )
  ).profile;
  const team = await createTeam(db, teacher.profile, { name: 'Varsity', division: 'C' });
  await updateTeam(db, teacher.profile, {
    teamId: team.id,
    eventId: 'forensics',
    slot: 0,
    studentId: amy.id,
  });
  return { teacher: teacher.profile, amy };
}

const course = lessonsForEvent('forensics', 'C')!;
const lesson = course.lessons[0];
const mcq = lesson.practice.filter((q) => q.type === 'mcq');
const written = lesson.practice.filter((q) => q.type === 'short');
const base = { eventId: 'forensics', lessonId: lesson.id };
/** A Gemini stand-in that marks every answer the given way, and records each request body. */
function gemini(correct: boolean, calls: string[] = []) {
  return {
    apiKey: 'test-key',
    fetcher: (async (_url: string, init: RequestInit) => {
      calls.push(String(init.body));
      return new Response(
        JSON.stringify({
          candidates: [
            {
              finishReason: 'STOP',
              content: {
                parts: [
                  {
                    text: JSON.stringify({
                      correct,
                      feedback: correct ? 'Names the key idea.' : 'Missing the mechanism.',
                    }),
                  },
                ],
              },
            },
          ],
        }),
      );
    }) as typeof fetch,
  };
}
const offline = { apiKey: '' };

test('multiple choice is marked by the key as each question is checked, then locked', async () => {
  const db = fixture();
  const { teacher, amy } = await people(db);
  const q = mcq[0];
  const wrong = q.options!.find((o) => o !== q.answer)!;
  await assert.rejects(
    checkLessonAnswer(db, teacher, { ...base, questionId: q.id, answer: q.answer }),
    /student account/,
  );
  await assert.rejects(
    checkLessonAnswer(db, amy, { ...base, questionId: q.id, answer: 'Not an option' }),
    /answer options/,
  );
  await assert.rejects(
    checkLessonAnswer(db, amy, { ...base, questionId: q.id, answer: '  ' }),
    /Write an answer/,
  );
  const first = await checkLessonAnswer(db, amy, { ...base, questionId: q.id, answer: wrong });
  assert.deepEqual(first, { status: 'checked', result: { correct: false, by: 'key' } });
  // Once checked, changing the answer cannot turn a red circle green.
  const again = await checkLessonAnswer(db, amy, { ...base, questionId: q.id, answer: q.answer });
  assert.deepEqual(again, first);
});

test('written answers are marked by AI, or by the student only when AI is unavailable', async () => {
  const db = fixture();
  const { amy } = await people(db);
  const [one, two, three] = written;
  const calls: string[] = [];
  const ai = await checkLessonAnswer(
    db,
    amy,
    { ...base, questionId: one.id, answer: 'My reasoning' },
    gemini(true, calls),
  );
  assert.deepEqual(ai, {
    status: 'checked',
    result: { correct: true, by: 'ai', feedback: 'Names the key idea.' },
  });
  // The grader sees the question, model answer and explanation, never who the student is.
  const sent = JSON.parse(JSON.parse(calls[0]).contents[0].parts[0].text);
  assert.equal(sent.modelAnswer, one.answer);
  assert.equal(sent.explanation, one.explanation);
  assert.equal(calls[0].includes(amy.id), false);

  // A self-mark sent while AI works is ignored: the AI grade wins.
  const overruled = await checkLessonAnswer(
    db,
    amy,
    { ...base, questionId: two.id, answer: 'Vague', selfMark: true },
    gemini(false),
  );
  assert.equal(overruled.status === 'checked' && overruled.result.correct, false);

  // With AI unavailable the student is asked to compare, and their mark is recorded.
  assert.deepEqual(
    await checkLessonAnswer(db, amy, { ...base, questionId: three.id, answer: 'Idea' }, offline),
    { status: 'self-mark' },
  );
  assert.deepEqual(
    await checkLessonAnswer(
      db,
      amy,
      { ...base, questionId: three.id, answer: 'Idea', selfMark: true },
      offline,
    ),
    { status: 'checked', result: { correct: true, by: 'self' } },
  );
});

test('the last checked question completes the lesson and records its accuracy', async () => {
  const db = fixture();
  const { teacher, amy } = await people(db);
  await assignWork(db, teacher, {
    action: 'assign',
    division: 'C',
    eventId: 'forensics',
    kind: 'Lesson',
    targetId: lesson.id,
    everyone: true,
    due: '2999-01-01',
    timeZone: 'UTC',
  });
  let last;
  for (const [i, q] of lesson.practice.entries()) {
    const answer =
      q.type === 'mcq' ? (i === 0 ? q.options!.find((o) => o !== q.answer)! : q.answer) : 'Answer';
    last = await checkLessonAnswer(db, amy, { ...base, questionId: q.id, answer }, gemini(true));
    if (i < lesson.practice.length - 1)
      assert.equal('lesson' in last, false, 'not complete before the last question');
  }
  const total = lesson.practice.length;
  assert.equal(lesson.practice[0].type, 'mcq');
  assert.deepEqual(last && 'lesson' in last && last.lesson, { score: total - 1, maxScore: total });
  const work = await studentWork(db, teacher, amy.id);
  const record = work.find((item) => item.type === 'Lesson' && item.targetId === lesson.id)!;
  assert.equal(record.score, total - 1);
  assert.equal(record.maxScore, total);

  const progress = await lessonProgress(db, amy, 'forensics');
  assert.equal(progress.answers.length, total);
  assert.deepEqual(
    progress.parts.map((p) => [p.part, p.score, p.maxScore]),
    [['checkpoint', total - 1, total]],
  );

  // A retake clears the answers but the lesson stays complete for the instructor.
  await resetCheckpoint(db, amy, base);
  assert.equal((await lessonProgress(db, amy, 'forensics')).answers.length, 0);
  assert.equal(
    (await studentWork(db, teacher, amy.id)).some((item) => item.targetId === lesson.id),
    true,
  );
});

test('lesson stages keep their first completion and reject impossible scores', async () => {
  const db = fixture();
  const { amy } = await people(db);
  await recordLessonPart(db, amy, { ...base, part: 'learn' });
  await recordLessonPart(db, amy, { ...base, part: 'practice', score: 3, maxScore: 5 });
  await recordLessonPart(db, amy, { ...base, part: 'practice', score: 5, maxScore: 5 });
  await assert.rejects(recordLessonPart(db, amy, { ...base, part: 'checkpoint' }), /stage/);
  await assert.rejects(
    recordLessonPart(db, amy, { ...base, part: 'labs', score: 9, maxScore: 4 }),
    /not valid/,
  );
  const parts = (await lessonProgress(db, amy, 'forensics')).parts;
  assert.deepEqual(parts.map((p) => [p.part, p.score, p.maxScore]).sort(), [
    ['learn', null, null],
    ['practice', 3, 5],
  ]);
});

test('stored attempts are re-marked by the key and malformed checks are dropped', () => {
  const q = mcq[0];
  const wrong = q.options!.find((o) => o !== q.answer)!;
  const restored = readAttempt(
    {
      answers: { [q.id]: wrong, [written[0].id]: 'Answer', [written[1].id]: 'x' },
      checks: {
        [q.id]: { correct: true, by: 'key' },
        [written[0].id]: { correct: true, by: 'ai', feedback: 'Good' },
        [written[1].id]: { correct: 'yes', by: 'ai' },
      },
    },
    lesson.practice,
  );
  assert.deepEqual(restored.checks[q.id], { correct: false, by: 'key' });
  assert.equal(restored.checks[written[0].id].correct, true);
  assert.equal(restored.checks[written[1].id], undefined);
  assert.deepEqual(checkpointProgress(restored, lesson.practice), {
    checked: 2,
    correct: 1,
    total: lesson.practice.length,
    complete: false,
  });
});

test('the AI grader returns nothing for any unusable response', async () => {
  const q = written[0];
  const respond = (body: unknown, ok = true) => ({
    apiKey: 'k',
    fetcher: (async () =>
      new Response(JSON.stringify(body), { status: ok ? 200 : 500 })) as typeof fetch,
  });
  const wrap = (text: string, finishReason = 'STOP') => ({
    candidates: [{ finishReason, content: { parts: [{ text }] } }],
  });
  assert.equal(await gradeLessonAnswer('Forensics', q, 'a', { apiKey: '' }), null);
  assert.equal(await gradeLessonAnswer('Forensics', q, 'a', respond({}, false)), null);
  assert.equal(await gradeLessonAnswer('Forensics', q, 'a', respond(wrap('not json'))), null);
  assert.equal(
    await gradeLessonAnswer('Forensics', q, 'a', respond(wrap('{"correct":true}', 'MAX_TOKENS'))),
    null,
  );
  assert.equal(
    await gradeLessonAnswer(
      'Forensics',
      q,
      'a',
      respond(wrap(JSON.stringify({ correct: 'true', feedback: 'x' }))),
    ),
    null,
  );
  assert.deepEqual(
    await gradeLessonAnswer(
      'Forensics',
      q,
      'a',
      respond(wrap(JSON.stringify({ correct: false, feedback: ' Missing units. ' }))),
    ),
    { correct: false, feedback: 'Missing units.' },
  );
});
