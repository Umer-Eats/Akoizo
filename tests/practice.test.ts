import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import {
  practiceTests,
  findPracticeTest,
  listPracticeTests,
  listArchiveSources,
  publicPracticePaper,
  validatePracticeCatalog,
} from '../src/lib/practice-catalog.ts';
import { gradePractice, validateAnswers } from '../src/lib/practice-grading.ts';
import { autoGradePracticeResult, gradeWrittenWithGemini } from '../src/lib/practice-ai.ts';
import {
  submitPractice,
  practiceHistory,
  pendingPracticeReviews,
  reviewPractice,
  autoGradePractice,
} from '../src/lib/practice-service.ts';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import {
  registerMember,
  createAssignment,
  dashboardFor,
  type Database,
} from '../src/lib/school-service.ts';
import type { Answers, PracticeTest, PracticeResult } from '../src/lib/practice-types.ts';
import { matchesPracticeFilters, practiceDifficulties } from '../src/lib/practice-types.ts';
import { reportedCompetitionLevel } from '../scripts/scioly-source.mjs';
import { eventsForDivision } from '../src/lib/events.ts';
import { eventToolIds } from '../src/lib/event-rules.ts';

test('every Division B and C event with a practice tab has a converted paper', () => {
  for (const division of ['B', 'C'] as const) {
    for (const event of eventsForDivision(division)) {
      if (!eventToolIds(division, event).includes('practice-tests')) continue;
      const papers = listPracticeTests(division, event.id);
      assert.ok(papers.length > 0, `${division}/${event.id} has an empty practice tab`);
      for (const paper of papers) {
        assert.ok(practiceDifficulties.includes(paper.difficulty));
        assert.ok(paper.difficultyReason.trim());
      }
    }
  }
});

test('Codebusters honors letter penalties, keyword exceptions, and preserves exact input', async () => {
  const paper = findPracticeTest('C', 'bullso-2026-codebusters-c');
  const timed = paper.keys.Timed.criteria![0].cipher!;
  const letters = timed.solution.replace(/[^A-Z0-9]/g, '');
  const resultFor = (value: string) => gradePractice(paper, { Timed: value });
  const answer = `  ${timed.solution.toLowerCase()}\n`;
  assert.equal(resultFor(answer).score, 292);
  assert.equal(resultFor(answer).questions.find((q) => q.id === 'Timed')!.answer, answer);
  assert.equal(resultFor('__' + letters.slice(2)).score, 292);
  assert.equal(resultFor('___' + letters.slice(3)).score, 192);
  assert.equal(resultFor('______' + letters.slice(6)).score, 0);
  assert.equal(resultFor('').score, 0);
  assert.equal(resultFor('   !!!').score, 0);
  assert.equal(gradePractice(paper, { '7': '_LASPHEMY' }).score, 269);
  assert.equal(gradePractice(paper, { '8': '_ALD BOY' }).score, 92);
  const partial = resultFor('___' + letters.slice(3));
  const reviewed = await gradeWrittenWithGemini(paper, partial, {
    apiKey: 'qa-only',
    reviewAll: true,
    fetcher: async () => {
      throw new Error('Cipher points must not be sent for semantic grading');
    },
  });
  assert.equal(reviewed.automaticGrading, 'complete');
  assert.equal(reviewed.score, 192);
  assert.equal(reviewed.pendingPoints, 0);
});

test('every archived paper has a complete rubric and coherent point total', () => {
  validatePracticeCatalog(practiceTests);
  for (const paper of practiceTests) {
    const answers: Answers = {};
    for (const q of paper.questions) {
      const key = paper.keys[q.id];
      if (paper.gradingMode === 'ai-generated') {
        answers[q.id] = q.type === 'mcq' ? q.options![0].id : 'Response for Auto Grade';
        continue;
      }
      if (q.type === 'mcq')
        answers[q.id] = q.multiple ? key.correctOptions!.join(',') : key.correctOption!;
      else {
        const c = key.criteria![0];
        answers[q.id] = c.numeric
          ? `${c.numeric.value}${c.numeric.unitRequired ? ' ' + c.numeric.units[0] : ''}`
          : (c.cipher?.solution ?? c.accepted?.[0] ?? 'Explanation for review');
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

test('difficulty is assessed independently of competition level and combines with every filter', () => {
  const filters = { query: '', level: '', year: '', topic: '', difficulty: '' };
  const paper = findPracticeTest('B', 'berkeley-2026-heredity-b');
  assert.equal(paper.level, null);
  assert.equal(paper.difficulty, 'Hard');
  assert.equal(
    matchesPracticeFilters(paper, {
      ...filters,
      difficulty: 'Hard',
      level: 'unreported',
      year: '2026',
      topic: paper.topics[0],
      query: 'berkeley',
    }),
    true,
  );
  for (const mismatch of [
    { difficulty: 'Easy' },
    { level: 'Nationals' },
    { year: '2014' },
    { topic: 'unrelated' },
    { query: 'absent' },
  ])
    assert.equal(matchesPracticeFilters(paper, { ...filters, ...mismatch }), false);
  const source = { competition: 'Unconverted', level: null, year: 2026, topics: [] };
  assert.equal(matchesPracticeFilters(source, filters), true);
  assert.equal(matchesPracticeFilters(source, { ...filters, difficulty: 'Easy' }), false);
  for (const test of practiceTests) {
    assert.ok(practiceDifficulties.includes(test.difficulty));
    assert.ok(test.difficultyReason.trim().length > 20);
    const publicPaper = publicPracticePaper(test);
    assert.equal(publicPaper.difficulty, test.difficulty);
    assert.equal(publicPaper.difficultyReason, test.difficultyReason);
  }
  const invalid = structuredClone(paper) as unknown as Record<string, unknown>;
  invalid.difficulty = 'Nationals';
  assert.throws(() => validatePracticeCatalog([invalid]), /Invalid practice catalog/);
  invalid.difficulty = 'Hard';
  invalid.difficultyReason = '';
  assert.throws(() => validatePracticeCatalog([invalid]), /Invalid practice catalog/);
});

test('catalog enforces the current season, event and student division', () => {
  const heredity = listPracticeTests('B', 'heredity');
  assert.ok(heredity.length >= 5);
  assert.ok(heredity.every((paper) => paper.division === 'B' && paper.eventId === 'heredity'));
  assert.ok(heredity.some((paper) => paper.id === 'menomonie-2021-heredity-b'));
  assert.ok(heredity.some((paper) => paper.id === 'gopher-2019-heredity-b'));
  const waterQualityB = listPracticeTests('B', 'water-quality');
  assert.ok(
    waterQualityB.every((paper) => paper.division === 'B' && paper.eventId === 'water-quality'),
  );
  for (const id of [
    'greenbrier-2026-water-quality-b',
    'milpitas-2026-water-quality-b',
    'pembroke-2026-water-quality-b',
  ]) {
    assert.ok(waterQualityB.some((paper) => paper.id === id));
  }
  assert.ok(listPracticeTests('B', 'meteorology').length > 0);
  assert.throws(() => listPracticeTests('B', 'astronomy'), { status: 404 });
  assert.throws(() => findPracticeTest('B', 'columbia-2023-anatomy-c'), { status: 404 });
  assert.throws(() => findPracticeTest('C', 'invented'), { status: 404 });
  assert.ok(practiceTests.every((t) => t.season === 2027));
  assert.ok(
    practiceTests.every(
      (t) => t.level === null || ['Regionals', 'States', 'Nationals'].includes(t.level),
    ),
  );
  assert.ok(
    listArchiveSources('B', 'water-quality').every(
      (source) =>
        source.level === null || ['Regionals', 'States', 'Nationals'].includes(source.level),
    ),
  );
});

test('Scioly archive levels use only reported competition tiers', () => {
  assert.equal(reportedCompetitionLevel('Michigan Regions 1, 6 & 11'), 'Regionals');
  assert.equal(reportedCompetitionLevel('Florida State Tournament'), 'States');
  assert.equal(reportedCompetitionLevel('National Tournament'), 'Nationals');
  assert.equal(reportedCompetitionLevel('State University Invitational'), null);
  assert.equal(reportedCompetitionLevel('MIT Invitational'), null);
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

test('Gemini rubric responses are bounded, validated, and applied without student identity data', async () => {
  const paper = findPracticeTest('B', 'michigan-regions-2024-meteorology-b');
  const initial = gradePractice(paper, { '58': 'Get low and cover the head and neck.' });
  let received = '';
  const fetcher = async (_url: string, options: RequestInit) => {
    received = String(options.body);
    return new Response(
      JSON.stringify({
        candidates: [
          {
            finishReason: 'STOP',
            content: {
              parts: [
                {
                  text: JSON.stringify({
                    grades: [
                      {
                        questionId: '58',
                        criterionId: 'answer',
                        earned: 2,
                        feedback: 'Both safety components are present.',
                        needsReview: false,
                      },
                    ],
                  }),
                },
              ],
            },
          },
        ],
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  };
  const result = await gradeWrittenWithGemini(paper, initial, {
    apiKey: 'test-key',
    model: 'gemini-2.5-flash',
    fetcher: fetcher as typeof fetch,
  });
  assert.equal(result.automaticGrading, 'complete');
  assert.equal(result.pendingPoints, 0);
  assert.equal(result.score, 2);
  assert.match(received, /58/);
  assert.doesNotMatch(received, /studentName|studentId|profileId|schoolId/i);

  const malformed = await gradeWrittenWithGemini(paper, initial, {
    apiKey: 'test-key',
    model: 'gemini-2.5-flash',
    fetcher: (async () =>
      new Response(
        JSON.stringify({
          candidates: [{ finishReason: 'STOP', content: { parts: [{ text: '{"grades":[]}' }] } }],
        }),
        { status: 200 },
      )) as typeof fetch,
  });
  assert.equal(malformed.automaticGrading, 'unavailable');
  assert.equal(malformed.pendingPoints, 2);
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

function modelResponse(value: unknown) {
  return new Response(
    JSON.stringify({
      candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify(value) }] } }],
    }),
    { status: 200 },
  );
}

test('Auto Grade updates the owned saved attempt once without granting more credit', async () => {
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
    const original = 'My exact\nwritten answer.  ';
    const saved = await submitPractice(db, student, {
      testId: 'ut-austin-2014-heredity-b',
      submissionId: randomUUID(),
      answers: { '1': 'E', '26': original, '28': 'Autosomal dominant' },
    });
    const before = String(
      raw.prepare('SELECT result_json FROM practice_submissions WHERE id=?').get(saved.id)!
        .result_json,
    );
    const unavailable = {
      apiKey: 'test-key',
      fetcher: (async () => new Response('{}', { status: 429 })) as typeof fetch,
    };
    await assert.rejects(autoGradePractice(db, peer, { id: saved.id }, unavailable), {
      status: 404,
    });
    await assert.rejects(autoGradePractice(db, teacher, { id: saved.id }, unavailable), {
      status: 403,
    });
    await assert.rejects(autoGradePractice(db, student, { id: 'bad' }, unavailable), {
      status: 400,
    });
    await assert.rejects(autoGradePractice(db, student, { id: saved.id }, unavailable), {
      status: 503,
    });
    assert.equal(
      raw.prepare('SELECT result_json FROM practice_submissions WHERE id=?').get(saved.id)!
        .result_json,
      before,
    );
    let calls = 0;
    const config = {
      apiKey: 'test-key',
      fetcher: (async (_url: string, options: RequestInit) => {
        calls++;
        const payload = JSON.parse(String(options.body));
        const data = JSON.parse(payload.contents[0].parts[0].text);
        assert.equal(data.gradingBasis, 'published-rubric');
        assert.equal(
          data.criteria.find((q: { questionId: string }) => q.questionId === '26').studentAnswer,
          original,
        );
        assert.ok(
          data.criteria.some((q: { questionId: string }) => q.questionId === '28'),
          'Auto Grade rechecks written answers, including earlier exact matches',
        );
        assert.doesNotMatch(String(options.body), /studentId|studentName|schoolId|forged/);
        return modelResponse({
          grades: data.criteria.map(
            (q: { questionId: string; criterionId: string; rubric: { points: number } }) => ({
              questionId: q.questionId,
              criterionId: q.criterionId,
              earned: q.rubric.points,
              needsReview: false,
              feedback: 'Meets the rubric.',
            }),
          ),
        });
      }) as typeof fetch,
    };
    const graded = await autoGradePractice(
      db,
      student,
      { id: saved.id, score: 999, answers: { '26': 'forged' } },
      config,
    );
    assert.equal(graded.score, 12.5);
    assert.equal(graded.questions.find((q) => q.id === '26')!.answer, original);
    assert.ok(graded.autoGradedAt);
    assert.equal(graded.attemptNumber, 1);
    assert.equal(graded.id, saved.id);
    assert.equal(graded.completedAt, saved.completedAt);
    assert.deepEqual(await autoGradePractice(db, student, { id: saved.id }, config), graded);
    assert.equal(calls, 1);
    assert.equal(raw.prepare('SELECT count(*) n FROM test_attempts').get()!.n, 1);
    assert.equal(raw.prepare('SELECT score FROM test_attempts').get()!.score, 12.5);
    assert.equal(raw.prepare('SELECT points_awarded FROM test_attempts').get()!.points_awarded, 0);
    assert.equal(
      raw.prepare('SELECT count(*) n FROM assignments WHERE completed_at IS NOT NULL').get()!.n,
      1,
    );
    assert.equal((await dashboardFor(db, student)).stats.practice, 1);
    assert.deepEqual((await practiceHistory(db, student, saved.testId))[0], graded);
  } finally {
    raw.close();
  }
});

test('Auto Grade preserves instructor review that finishes during the AI request', async () => {
  const { raw, db, teacher, student } = await setup();
  try {
    const saved = await submitPractice(db, student, {
      testId: 'ut-austin-2014-heredity-b',
      submissionId: randomUUID(),
      answers: { '26': 'An explanation.' },
    });
    const config = {
      apiKey: 'test-key',
      fetcher: (async () => {
        await reviewPractice(db, teacher, { id: saved.id, scores: { '26/answer': 3 } });
        return modelResponse({
          grades: [
            {
              questionId: '26',
              criterionId: 'answer',
              earned: 5,
              feedback: 'Meets the rubric.',
              needsReview: false,
            },
          ],
        });
      }) as typeof fetch,
    };
    const graded = await autoGradePractice(db, student, { id: saved.id }, config);
    assert.equal(graded.score, 3);
    assert.ok(graded.reviewedAt);
    assert.equal(raw.prepare('SELECT score FROM test_attempts').get()!.score, 3);
    await assert.rejects(autoGradePractice(db, student, { id: saved.id }, config), { status: 409 });
  } finally {
    raw.close();
  }
});

function keylessPaper(): PracticeTest {
  return {
    ...structuredClone(findPracticeTest('B', 'ut-austin-2014-heredity-b')),
    id: 'qa-keyless',
    keyUrl: null,
    gradingMode: 'ai-generated',
    keys: {},
    questionCount: 3,
    maxScore: 5,
    questions: [
      {
        id: '1',
        label: 'Question 1',
        page: 1,
        type: 'mcq',
        points: 1,
        prompt: 'Which gas has the chemical formula O2?',
        options: [
          { id: 'A', text: 'Oxygen' },
          { id: 'B', text: 'Nitrogen' },
        ],
      },
      {
        id: '2',
        label: 'Question 2',
        page: 1,
        type: 'frq',
        points: 2,
        prompt: 'Explain how plants obtain energy during photosynthesis.',
      },
      {
        id: '3',
        label: 'Question 3',
        page: 1,
        type: 'frq',
        points: 2,
        prompt: 'Identify structure A in the diagram.',
        context: 'The required diagram has not been supplied.',
      },
    ],
  };
}

test('keyless Auto Grade solves independently, keeps uncertain items pending, and labels references', async () => {
  const paper = keylessPaper();
  validatePracticeCatalog([paper]);
  const incomplete = structuredClone(paper);
  incomplete.questions[0].prompt = 'Question 1';
  assert.throws(() => validatePracticeCatalog([incomplete]), /Invalid practice catalog/);
  const initial: PracticeResult = {
    ...gradePractice(paper, {
      '1': 'A',
      '2': 'MY_SAVED_RESPONSE\n  sunlight and sugar. ',
      '3': 'A chloroplast?',
    }),
    id: 'qa',
    completedAt: '2026-10-07T12:00:00Z',
  };
  assert.equal(initial.pendingPoints, 5);
  assert.equal(gradePractice(paper, {}).pendingPoints, 0);
  let calls = 0;
  const result = await autoGradePracticeResult(paper, initial, {
    apiKey: 'test-key',
    fetcher: (async (_url: string, options: RequestInit) => {
      calls++;
      const data = JSON.parse(JSON.parse(String(options.body)).contents[0].parts[0].text);
      if (calls === 1) {
        assert.doesNotMatch(String(options.body), /MY_SAVED_RESPONSE|studentAnswer/);
        assert.equal(data.questions[0].options[0].text, 'Oxygen');
        assert.match(data.questions[2].context, /not been supplied/);
        return modelResponse({
          references: [
            { questionId: '1', needsReview: false, correctOptions: ['A'], criteria: [] },
            {
              questionId: '2',
              needsReview: false,
              correctOptions: [],
              criteria: [
                { id: 'light', points: 1, answer: 'Absorb light energy.' },
                { id: 'sugar', points: 1, answer: 'Store energy as sugar.' },
              ],
            },
            { questionId: '3', needsReview: true, correctOptions: [], criteria: [] },
          ],
        });
      }
      assert.equal(data.gradingBasis, 'ai-generated');
      assert.equal(data.criteria.length, 2);
      return modelResponse({
        grades: [
          {
            questionId: '2',
            criterionId: 'light',
            earned: 1,
            needsReview: false,
            feedback: 'Identifies sunlight.',
          },
          {
            questionId: '2',
            criterionId: 'sugar',
            earned: 0.5,
            needsReview: false,
            feedback: 'Mentions sugar without energy storage.',
          },
        ],
      });
    }) as typeof fetch,
  });
  assert.equal(calls, 2);
  assert.equal(result.gradingBasis, 'ai-generated');
  assert.equal(result.keyUrl, null);
  assert.equal(result.questions[0].correctOption, 'A');
  assert.equal(result.questions[1].answer, initial.questions[1].answer);
  assert.equal(result.questions[1].criteria[0].answer, 'Absorb light energy.');
  assert.equal(result.score, 2.5);
  assert.equal(result.percentage, 50);
  assert.equal(result.pendingPoints, 2);
  assert.equal(initial.score, 0, 'The original saved score is not mutated');
  for (const references of [
    [],
    Array.from({ length: 3 }, () => ({
      questionId: '1',
      needsReview: false,
      correctOptions: ['A'],
      criteria: [],
    })),
    [
      { questionId: '1', needsReview: false, correctOptions: ['Z'], criteria: [] },
      { questionId: '2', needsReview: true, correctOptions: [], criteria: [] },
      { questionId: '3', needsReview: true, correctOptions: [], criteria: [] },
    ],
  ]) {
    const invalid = await autoGradePracticeResult(paper, initial, {
      apiKey: 'test-key',
      fetcher: (async () => modelResponse({ references })) as typeof fetch,
    });
    assert.equal(invalid.automaticGrading, 'unavailable');
    assert.deepEqual(invalid.questions, initial.questions);
    assert.equal(invalid.score, initial.score);
  }
});

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
    const repeat = await submitPractice(db, student, {
      ...input,
      submissionId: randomUUID(),
    });
    assert.equal(repeat.attemptNumber, 2);
    assert.equal((await practiceHistory(db, student, input.testId)).length, 2);
    assert.equal(
      raw.prepare('SELECT count(*) n FROM assignments WHERE completed_at IS NOT NULL').get()!.n,
      1,
    );
    assert.equal((await dashboardFor(db, student)).stats.practice, 1);
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
