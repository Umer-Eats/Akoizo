import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import {
  practiceTests,
  findPracticeTest,
  listPracticeTests,
  publicPracticePaper,
  validatePracticeCatalog,
} from '../src/lib/practice-catalog.ts';
import { gradePractice, validateAnswers } from '../src/lib/practice-grading.ts';
import {
  submitPractice,
  practiceHistory,
  pendingPracticeReviews,
  reviewPractice,
} from '../src/lib/practice-service.ts';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import { registerMember, createAssignment, type Database } from '../src/lib/school-service.ts';
import type { Answers } from '../src/lib/practice-types.ts';

test('every archived paper has a complete rubric and coherent point total', () => {
  validatePracticeCatalog(practiceTests);
  for (const paper of practiceTests) {
    const answers: Answers = {};
    for (const q of paper.questions) {
      const key = paper.keys[q.id];
      if (q.type === 'mcq')
        answers[q.id] = q.multiple ? key.correctOptions!.join(',') : key.correctOption!;
      else {
        const c = key.criteria![0];
        answers[q.id] = c.numeric
          ? `${c.numeric.value}${c.numeric.unitRequired ? ' ' + c.numeric.units[0] : ''}`
          : (c.accepted?.[0] ?? 'Explanation for review');
      }
    }
    const result = gradePractice(paper, validateAnswers(paper, answers));
    assert.equal(result.score + result.pendingPoints, paper.maxScore, paper.id);
    assert.equal(gradePractice(paper, {}).score, 0);
    assert.equal(gradePractice(paper, {}).pendingPoints, 0);
    const publicPaper = publicPracticePaper(paper);
    assert.equal('keys' in publicPaper, false);
    assert.equal('keyUrl' in publicPaper, false);
    assert.equal(publicPaper.questions.length, paper.questionCount);
  }
  const broken = structuredClone(practiceTests);
  delete broken[0].keys[broken[0].questions[0].id];
  assert.throws(() => validatePracticeCatalog(broken), /Invalid practice catalog/);
});

test('catalog enforces the current season, event and student division', () => {
  assert.equal(listPracticeTests('B', 'heredity').length, 3);
  assert.equal(listPracticeTests('B', 'meteorology').length, 0);
  assert.throws(() => listPracticeTests('B', 'astronomy'), { status: 404 });
  assert.throws(() => findPracticeTest('B', 'columbia-2023-anatomy-c'), { status: 404 });
  assert.throws(() => findPracticeTest('C', 'invented'), { status: 404 });
  assert.ok(practiceTests.every((t) => t.season === 2027));
});

test('grading preserves exact text, awards only matched answers, and queues prose', () => {
  const paper = findPracticeTest('B', 'ut-austin-2014-heredity-b');
  const answers = validateAnswers(paper, {
    '1': 'E',
    '2': 'B',
    '26': 'No Y genes?\nMy explanation.  ',
    '28': '  AUTOSOMAL   dominant\n',
    '29': 'not maternal',
  });
  const result = gradePractice(paper, answers);
  assert.equal(result.score, 7.5);
  assert.equal(result.pendingPoints, 10);
  assert.equal(result.percentage, 9.38);
  assert.equal(
    result.questions.find((q) => q.id === '26')!.answer,
    'No Y genes?\nMy explanation.  ',
  );
  assert.equal(result.questions.find((q) => q.id === '28')!.answer, '  AUTOSOMAL   dominant\n');
  assert.equal(
    result.questions.find((q) => q.id === '29')!.earned,
    0,
    'negated key words must not earn credit',
  );
  assert.equal(result.questions[0].correctOption, 'E');
  assert.throws(() => validateAnswers(paper, { '1': 'F' }), { status: 400 });
  assert.throws(() => validateAnswers(paper, { 'made-up': 'E' }), { status: 400 });
  assert.throws(() => validateAnswers(paper, { '26': 'x'.repeat(10001) }), { status: 400 });
  assert.throws(() => validateAnswers(paper, []), { status: 400 });
  assert.throws(() => validateAnswers(paper, { '1': { correct: true } }), { status: 400 });
});

test('multi-select grades the complete selected set; fractions, units and ranges are respected', () => {
  const anatomy = findPracticeTest('C', 'columbia-2023-anatomy-c');
  const multi = anatomy.questions.find((q) => q.multiple)!;
  const key = anatomy.keys[multi.id].correctOptions!;
  const result = gradePractice(
    anatomy,
    validateAnswers(anatomy, { [multi.id]: [...key].reverse().join(',') }),
  );
  assert.equal(result.questions.find((q) => q.id === multi.id)!.earned, multi.points);
  assert.equal(gradePractice(anatomy, { [multi.id]: key[0] }).score, 0);
  assert.throws(() => validateAnswers(anatomy, { [multi.id]: `${key[0]},${key[0]}` }), {
    status: 400,
  });
  const genetics = findPracticeTest('B', 'berkeley-2026-heredity-b');
  assert.equal(gradePractice(genetics, { '3b': '1/16', '3c': '1/8' }).score, 2);
  assert.equal(gradePractice(genetics, { '3b': '1/0' }).score, 0);
  const water = findPracticeTest('C', 'beachwood-2023-dynamic-planet-c');
  assert.equal(
    gradePractice(water, { '51': '130 ft³/s', '58': '0.001 cm', '60': '48 m/km' }).score,
    3,
  );
  assert.equal(gradePractice(water, { '51': '130', '58': '0.002 cm', '60': '47.9 m/km' }).score, 0);
  assert.equal(
    gradePractice(water, { '51': 'Q = 130 ft³/s' }).pendingPoints,
    1,
    'unrecognized notation can receive instructor review',
  );
});

async function setup() {
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
        const rows = statements.map(({ sql, args }) => ({
          rowsAffected: Number(raw.prepare(sql).run(...args).changes),
          rows: [],
        }));
        raw.exec('COMMIT');
        return rows;
      } catch (error) {
        raw.exec('ROLLBACK');
        throw error;
      }
    },
  };
  const teacherData = {
    role: 'instructor' as const,
    displayName: 'Teacher',
    instructorInvitePassword: 'invite',
    schoolCommunityId: 'ppchs',
  };
  const teacher = await registerMember(
    db,
    { uid: 'teacher', email: 'teacher@example.test' },
    teacherData,
    'invite',
  );
  const otherTeacher = await registerMember(
    db,
    { uid: 'other-teacher', email: 'other@example.test' },
    teacherData,
    'invite',
  );
  const student = await registerMember(
    db,
    { uid: 'student', email: 'student@example.test' },
    {
      role: 'student',
      displayName: 'Student',
      division: 'B',
      schoolPassword: teacher.credentials!.joiningPassword,
    },
    'invite',
  );
  const peer = await registerMember(
    db,
    { uid: 'peer', email: 'peer@example.test' },
    {
      role: 'student',
      displayName: 'Peer',
      division: 'B',
      schoolPassword: teacher.credentials!.joiningPassword,
    },
    'invite',
  );
  return {
    raw,
    db,
    teacher: teacher.profile,
    otherTeacher: otherTeacher.profile,
    student: student.profile,
    peer: peer.profile,
  };
}

test('submission saves once, rejects forged scores, completes one assignment, and scopes history', async () => {
  const { raw, db, teacher, student, peer } = await setup();
  try {
    for (const due of ['2099-01-01', '2099-01-02'])
      await createAssignment(db, teacher, {
        studentId: student.id,
        eventId: 'heredity',
        type: 'Practice',
        due,
        timeZone: 'America/New_York',
      });
    const input = {
      testId: 'ut-austin-2014-heredity-b',
      submissionId: randomUUID(),
      answers: { '1': 'E', '28': 'Autosomal dominant' },
      score: 80,
      maxScore: 80,
    };
    const [first, retry] = await Promise.all([
      submitPractice(db, student, input),
      submitPractice(db, student, input),
    ]);
    assert.deepEqual(first, retry);
    assert.equal(first.score, 7.5);
    assert.equal(raw.prepare('SELECT count(*) n FROM test_attempts').get()!.n, 1);
    assert.equal(
      raw.prepare('SELECT count(*) n FROM assignments WHERE completed_at IS NOT NULL').get()!.n,
      1,
    );
    assert.equal(raw.prepare('SELECT points_awarded FROM test_attempts').get()!.points_awarded, 0);
    assert.equal((await practiceHistory(db, student, input.testId)).length, 1);
    assert.equal((await practiceHistory(db, peer, input.testId)).length, 0);
    await assert.rejects(submitPractice(db, teacher, input), { status: 403 });
    await assert.rejects(
      submitPractice(db, student, { ...input, testId: 'columbia-2023-anatomy-c' }),
      { status: 404 },
    );
    await assert.rejects(submitPractice(db, student, { ...input, submissionId: 'bad' }), {
      status: 400,
    });
  } finally {
    raw.close();
  }
});

test('instructors can finalize only their own school rubric reviews with bounded scores', async () => {
  const { raw, db, teacher, otherTeacher, student } = await setup();
  try {
    const result = await submitPractice(db, student, {
      testId: 'ut-austin-2014-heredity-b',
      submissionId: randomUUID(),
      answers: { '1': 'E', '26': 'My exact\nreasoning  ' },
    });
    assert.equal(result.pendingPoints, 5);
    assert.equal((await pendingPracticeReviews(db, otherTeacher)).length, 0);
    const queue = await pendingPracticeReviews(db, teacher);
    assert.equal(queue.length, 1);
    assert.equal(
      queue[0].result.questions.find((q) => q.id === '26')!.answer,
      'My exact\nreasoning  ',
    );
    await assert.rejects(
      reviewPractice(db, otherTeacher, { id: result.id, scores: { '26/answer': 4 } }),
      { status: 404 },
    );
    await assert.rejects(
      reviewPractice(db, student, { id: result.id, scores: { '26/answer': 4 } }),
      { status: 403 },
    );
    await assert.rejects(
      reviewPractice(db, teacher, { id: result.id, scores: { '26/answer': 6 } }),
      { status: 400 },
    );
    await assert.rejects(reviewPractice(db, teacher, { id: result.id, scores: {} }), {
      status: 400,
    });
    const reviewed = await reviewPractice(db, teacher, {
      id: result.id,
      scores: { '26/answer': 3.5 },
    });
    assert.equal(reviewed.score, 6);
    assert.equal(reviewed.percentage, 7.5);
    assert.equal(reviewed.pendingPoints, 0);
    assert.equal(reviewed.questions.find((q) => q.id === '26')!.answer, 'My exact\nreasoning  ');
    assert.equal(raw.prepare('SELECT score FROM test_attempts').get()!.score, 6);
    assert.equal((await practiceHistory(db, student, result.testId))[0].score, 6);
    assert.equal((await pendingPracticeReviews(db, teacher)).length, 0);
    await assert.rejects(
      reviewPractice(db, teacher, { id: result.id, scores: { '26/answer': 3.5 } }),
      { status: 409 },
    );
  } finally {
    raw.close();
  }
});
