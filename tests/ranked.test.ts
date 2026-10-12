import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import {
  registerMember,
  dashboardFor,
  leaveCommunity,
  type Database,
} from '../src/lib/school-service.ts';
import type { Profile } from '../src/lib/domain.ts';
import { createTeam, deleteTeam, listTeams, updateTeam } from '../src/lib/team-service.ts';
import {
  buildRankedPaper,
  rankedPoolSummary,
  rankedQuestionPool,
} from '../src/lib/ranked-builder.ts';
import {
  assignRanked,
  collectRanked,
  createRankedTest,
  deleteRankedTest,
  removeRankedQuestion,
  listRankedForInstructor,
  listRankedForStudent,
  rankedForInstructor,
  rankedForStudent,
  releaseRanked,
  reviewRanked,
  saveRankedDraft,
  startRanked,
  submitRanked,
  unassignRanked,
} from '../src/lib/ranked-service.ts';

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
        const result = statements.map(({ sql, args }) => {
          const result = raw.prepare(sql).run(...args);
          return { rowsAffected: Number(result.changes), rows: [] };
        });
        raw.exec('COMMIT');
        return result;
      } catch (error) {
        raw.exec('ROLLBACK');
        throw error;
      }
    },
  };
  return { db, raw };
}
const identity = (uid: string) => ({ uid, email: `${uid}@example.test` });
async function school(db: Database, uid: string, community: string, students: string[]) {
  const teacher = await registerMember(
    db,
    identity(uid),
    {
      role: 'instructor',
      displayName: uid,
      instructorInvitePassword: 'invite',
      schoolCommunityId: community,
    },
    'invite',
  );
  const members: Profile[] = [];
  for (const name of students)
    members.push(
      (
        await registerMember(
          db,
          identity(name),
          {
            role: 'student',
            displayName: name,
            division: name.startsWith('b-') ? 'B' : 'C',
            schoolPassword: teacher.credentials!.joiningPassword,
          },
          'invite',
        )
      ).profile,
    );
  return { teacher: teacher.profile, members };
}

type Reply = (payload: Record<string, unknown>) => unknown;
/** A Gemini stand-in: `choose` answers the test builder, `grade` the written-answer pass. */
function gemini(choose: Reply, grade?: Reply) {
  const calls = { build: 0, grade: 0 };
  const fetcher = (async (_url: unknown, init?: RequestInit) => {
    const payload = JSON.parse(JSON.parse(String(init!.body)).contents[0].parts[0].text);
    const text = payload.candidates
      ? (calls.build++, choose(payload))
      : (calls.grade++, grade!(payload));
    return new Response(
      JSON.stringify({
        candidates: [
          { finishReason: 'STOP', content: { parts: [{ text: JSON.stringify(text) }] } },
        ],
      }),
    );
  }) as typeof fetch;
  // A fixed sequence keeps candidate sampling, and so the whole test, repeatable.
  let seed = 7;
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return { calls, config: { apiKey: 'test-key', model: 'gemini-test', fetcher, random } };
}
type Listed = { id: string; source: string; type: string };
/** Take questions evenly from every source and both question types, the way the prompt asks. */
const balanced: Reply = (payload) => {
  const candidates = payload.candidates as Listed[];
  const count = Number(payload.questionCount);
  const bySource = [...new Set(candidates.map((c) => c.source))].map((source) => {
    const mine = candidates.filter((c) => c.source === source);
    const mcq = mine.filter((c) => c.type === 'mcq');
    const frq = mine.filter((c) => c.type !== 'mcq');
    return mine.map((_, i) => (i % 2 ? frq : mcq).shift() ?? mcq.shift() ?? frq.shift()!);
  });
  const ids: string[] = [];
  for (let round = 0; ids.length < count && round < candidates.length; round++)
    for (const list of bySource) if (list[round] && ids.length < count) ids.push(list[round].id);
  return { questionIds: ids };
};

test('team sheets seat partners per event and stay inside one school', async () => {
  const { db, raw } = fixture();
  const home = await school(db, 't1', 'ppchs', ['amy', 'ben', 'cal', 'b-dee']);
  const away = await school(db, 't2', 'ppcms-central', ['zed']);
  const [amy, ben, cal, dee] = home.members;
  const { id } = await createTeam(db, home.teacher, { name: ' Grain of Sand ', division: 'C' });
  await assert.rejects(createTeam(db, home.teacher, { name: '', division: 'C' }), { status: 400 });
  await assert.rejects(createTeam(db, amy, { name: 'Mine', division: 'C' }), { status: 403 });
  const seat = (eventId: string, slot: number, studentId: string | null) =>
    updateTeam(db, home.teacher, { teamId: id, eventId, slot, studentId });
  await seat('forensics', 0, amy.id);
  let [team] = await seat('forensics', 1, ben.id);
  assert.equal(team.name, 'Grain of Sand');
  assert.deepEqual(team.slots.forensics, [amy.id, ben.id]);
  assert.equal(team.slots.codebusters.length, 3);
  // Choosing a seated student again moves them rather than duplicating them.
  [team] = await seat('forensics', 1, amy.id);
  assert.deepEqual(team.slots.forensics, [null, amy.id]);
  [team] = await seat('forensics', 1, null);
  assert.deepEqual(team.slots.forensics, [null, null]);
  await assert.rejects(seat('forensics', 2, cal.id), { status: 400 });
  await assert.rejects(seat('heredity', 0, cal.id), { status: 400 });
  await assert.rejects(seat('forensics', 0, dee.id), { status: 409 });
  await assert.rejects(seat('forensics', 0, away.members[0].id), { status: 404 });
  await assert.rejects(
    updateTeam(db, away.teacher, { teamId: id, eventId: 'forensics', slot: 0, studentId: null }),
    { status: 404 },
  );
  assert.deepEqual(await listTeams(db, away.teacher), []);
  [team] = await updateTeam(db, home.teacher, { teamId: id, name: 'Varsity' });
  assert.equal(team.name, 'Varsity');
  await seat('forensics', 0, cal.id);
  await assert.rejects(deleteTeam(db, away.teacher, id), { status: 404 });
  assert.deepEqual(await deleteTeam(db, home.teacher, id), []);
  assert.equal(raw.prepare('SELECT COUNT(*) AS n FROM team_slots').get()!.n, 0);
  raw.close();
});

test('the builder combines standalone questions from several tests and repairs model output', async () => {
  const pool = rankedQuestionPool('C', 'water-quality');
  assert.ok(new Set(pool.map((c) => c.test.id)).size >= 3);
  assert.ok(pool.every((c) => c.question.points > 0 && c.question.prompt!.trim().length >= 12));
  assert.ok(rankedPoolSummary('C').some((event) => event.eventId === 'water-quality'));
  // Division C Disease Detectives has only letter-coded answer fields, which need the paper.
  assert.equal(rankedQuestionPool('C', 'disease-detectives').length, 0);

  const paper = await buildRankedPaper('C', 'water-quality', 20, gemini(balanced).config);
  assert.equal(paper.questions.length, 20);
  assert.ok(paper.sources.length >= 3, 'questions come from different tests');
  assert.equal(
    paper.sources.reduce((sum, source) => sum + source.questions, 0),
    20,
  );
  assert.deepEqual(
    paper.questions.map((q) => q.id),
    Array.from({ length: 20 }, (_, i) => `r${i + 1}`),
  );
  assert.equal(
    paper.maxScore,
    Math.round(paper.questions.reduce((sum, q) => sum + q.points, 0) * 100) / 100,
  );
  for (const question of paper.questions) {
    const origin = paper.origins[question.id];
    const source = pool.find(
      (c) => c.test.id === origin.testId && c.question.id === origin.questionId,
    )!;
    // Questions and keys are copied from the source paper, never rewritten.
    assert.equal(question.prompt, source.question.prompt);
    assert.deepEqual(paper.keys[question.id], source.test.keys[source.question.id]);
  }
  const firstWritten = paper.questions.findIndex((q) => q.type === 'frq');
  assert.ok(paper.questions.slice(firstWritten).every((q) => firstWritten < 0 || q.type === 'frq'));

  // Invented, repeated, and one-sided picks are dropped, capped, and topped up from other tests.
  const lopsided = await buildRankedPaper(
    'C',
    'water-quality',
    10,
    gemini((payload) => {
      const candidates = payload.candidates as Listed[];
      const one = candidates.filter((c) => c.source === candidates[0].source).map((c) => c.id);
      return { questionIds: ['c99999', 'drop table', one[0], ...one.slice(0, 10)] };
    }).config,
  );
  assert.equal(lopsided.questions.length, 10);
  assert.ok(Math.max(...lopsided.sources.map((source) => source.questions)) <= 7);
  assert.ok(lopsided.sources.length >= 2);

  const down = {
    apiKey: 'k',
    fetcher: (async () => new Response('', { status: 500 })) as typeof fetch,
  };
  await assert.rejects(buildRankedPaper('C', 'water-quality', 10, down), { status: 503 });
  await assert.rejects(buildRankedPaper('C', 'water-quality', 10, { apiKey: '' }), { status: 503 });
  await assert.rejects(buildRankedPaper('C', 'disease-detectives', 10, gemini(balanced).config), {
    status: 409,
  });
});

test('ranked tests reach every seated student, lock results until release, and award points once', async () => {
  const { db, raw } = fixture();
  const home = await school(db, 't1', 'ppchs', ['amy', 'ben', 'cal', 'dan', 'eve', 'b-fay']);
  const away = await school(db, 't2', 'ppcms-central', ['zed']);
  const [amy, ben, cal, dan, eve, fay] = home.members;
  const zed = away.members[0];
  const one = (await createTeam(db, home.teacher, { name: 'One', division: 'C' })).id;
  const two = (await createTeam(db, home.teacher, { name: 'Two', division: 'C' })).id;
  const awayTeam = (await createTeam(db, away.teacher, { name: 'Away', division: 'C' })).id;
  const seat = (
    teacher: Profile,
    teamId: string,
    slot: number,
    studentId: string,
    eventId = 'water-quality',
  ) => updateTeam(db, teacher, { teamId, eventId, slot, studentId });
  await seat(home.teacher, one, 0, amy.id);
  await seat(home.teacher, one, 1, ben.id);
  await seat(home.teacher, two, 0, cal.id);
  await seat(home.teacher, two, 0, dan.id, 'forensics');
  await seat(away.teacher, awayTeam, 0, zed.id);

  const ai = gemini(balanced, (payload) => ({
    grades: (
      payload.criteria as { questionId: string; criterionId: string; rubric: { points: number } }[]
    ).map((item) => ({
      questionId: item.questionId,
      criterionId: item.criterionId,
      earned: item.rubric.points,
      feedback: 'Matches the rubric.',
      needsReview: false,
    })),
  }));
  await assert.rejects(
    createRankedTest(db, amy, { division: 'C', eventId: 'water-quality' }, ai.config),
    { status: 403 },
  );
  await assert.rejects(
    createRankedTest(db, home.teacher, { division: 'C', eventId: 'heredity' }, ai.config),
    { status: 400 },
  );
  const { id: testId } = await createRankedTest(
    db,
    home.teacher,
    { division: 'C', eventId: 'water-quality', questionCount: 12, minutes: 30 },
    ai.config,
  );
  assert.equal(ai.calls.build, 1);
  const due = '2999-01-01';

  // A named student brings their event partner; nobody else is included.
  await assert.rejects(assignRanked(db, home.teacher, { testId, studentIds: [fay.id], due }), {
    status: 404,
  });
  await assert.rejects(assignRanked(db, home.teacher, { testId, studentIds: [zed.id], due }), {
    status: 404,
  });
  await assert.rejects(assignRanked(db, away.teacher, { testId, everyone: true, due }), {
    status: 404,
  });
  assert.deepEqual(await assignRanked(db, home.teacher, { testId, studentIds: [amy.id], due }), {
    assigned: 2,
    alreadyAssigned: 0,
  });
  // One action then covers the event across every team, and never another school.
  assert.deepEqual(
    await assignRanked(db, home.teacher, { testId, everyone: true, studentIds: [eve.id], due }),
    { assigned: 2, alreadyAssigned: 2 },
  );
  let [listed] = await listRankedForInstructor(db, home.teacher);
  assert.deepEqual(
    listed.assignments.map((row) => row.studentName),
    ['amy', 'ben', 'cal', 'eve'],
  );
  assert.ok(listed.sources.length >= 2);
  assert.deepEqual(await listRankedForInstructor(db, away.teacher), []);
  assert.deepEqual(await listRankedForStudent(db, zed), []);
  assert.deepEqual(await listRankedForStudent(db, dan), []);
  const eveRow = listed.assignments.find((row) => row.studentId === eve.id)!;
  await unassignRanked(db, home.teacher, eveRow.assignmentId);

  // Before starting, the student sees the assignment but none of the questions.
  const [waiting] = await listRankedForStudent(db, amy);
  assert.equal(waiting.status, 'assigned');
  assert.equal(waiting.questionCount, 12);
  let detail = await rankedForStudent(db, amy, testId);
  assert.equal(detail.paper, undefined);
  assert.ok(!JSON.stringify(detail).includes('correctOption'));
  await assert.rejects(rankedForStudent(db, dan, testId), { status: 404 });
  await assert.rejects(submitRanked(db, amy, { testId, answers: {} }, ai.config), { status: 409 });
  const assignments = (await dashboardFor(db, amy)).assignments;
  assert.equal(assignments.length, 1);
  assert.equal(assignments[0].type, 'Ranked');
  assert.equal(assignments[0].ranked, true);
  assert.equal(assignments[0].completedAt, null);

  detail = await startRanked(db, amy, testId);
  assert.equal(detail.test.status, 'in-progress');
  assert.equal(detail.paper!.questions.length, 12);
  assert.ok(!JSON.stringify(detail).includes('correctOption'), 'keys never reach a student');
  assert.equal(Date.parse(detail.test.deadline!) - Date.parse(detail.test.startedAt!), 30 * 60_000);
  const started = detail.test.startedAt;
  assert.equal((await startRanked(db, amy, testId)).test.startedAt, started);
  await assert.rejects(unassignRanked(db, home.teacher, detail.test.assignmentId), { status: 409 });
  await assert.rejects(deleteRankedTest(db, home.teacher, testId), { status: 409 });

  // Answer everything correctly from the instructor's key.
  const key = await rankedForInstructor(db, home.teacher, testId);
  await assert.rejects(rankedForInstructor(db, away.teacher, testId), { status: 404 });
  const answers: Record<string, string> = {};
  for (const question of key.questions) {
    const graded = key.answerKey.questions.find((q) => q.id === question.id)!;
    answers[question.id] =
      question.type === 'mcq'
        ? (graded.correctOptions?.join(',') ?? graded.acceptedOptions?.[0] ?? graded.correctOption!)
        : 'A complete written explanation.';
  }
  await assert.rejects(
    saveRankedDraft(db, amy, { testId, answers: { nope: 'x' }, violations: 0 }),
    { status: 400 },
  );
  await saveRankedDraft(db, amy, { testId, answers, violations: 2 });
  await saveRankedDraft(db, amy, { testId, answers, violations: 99 });
  detail = await rankedForStudent(db, amy, testId);
  assert.deepEqual(detail.paper!.answers, answers);
  assert.equal(detail.test.violations, 7);

  detail = await submitRanked(db, amy, { testId, answers }, ai.config);
  assert.equal(detail.test.status, 'submitted');
  assert.equal(detail.test.score!.score, key.test.maxScore);
  assert.equal(detail.test.score!.percentage, 100);
  assert.equal(detail.test.score!.grading, 'complete');
  // The score is visible, but the questions, answers, and rubric stay hidden until release.
  assert.equal(detail.paper, undefined);
  assert.equal(detail.review, undefined);
  assert.ok(!JSON.stringify(detail).includes('correctOption'));
  const again = await submitRanked(db, amy, { testId, answers: {} }, ai.config);
  assert.equal(again.test.score!.score, key.test.maxScore, 'a repeated submit changes nothing');
  await assert.rejects(startRanked(db, amy, testId), { status: 409 });
  await assert.rejects(saveRankedDraft(db, amy, { testId, answers }), { status: 409 });
  assert.equal(raw.prepare('SELECT COUNT(*) AS n FROM test_attempts').get()!.n, 1);
  assert.equal(raw.prepare('SELECT SUM(points) AS n FROM points_ledger').get()!.n, 100);
  const board = await dashboardFor(db, amy);
  assert.equal(board.stats.ranked, 1);
  assert.equal(board.stats.points, 100);
  assert.ok(board.assignments[0].completedAt);

  // Release is per student: Amy sees her review, Ben (not yet submitted) is unaffected.
  assert.deepEqual(
    await releaseRanked(db, home.teacher, { testId, studentIds: [amy.id, ben.id], released: true }),
    { updated: 1 },
  );
  detail = await rankedForStudent(db, amy, testId);
  assert.equal(detail.test.status, 'released');
  assert.equal(detail.review!.result.score, key.test.maxScore);
  assert.equal(detail.review!.questions.length, 12);
  assert.equal((await rankedForStudent(db, ben, testId)).test.status, 'assigned');
  await releaseRanked(db, home.teacher, { testId, released: false });
  assert.equal((await rankedForStudent(db, amy, testId)).review, undefined);
  await assert.rejects(releaseRanked(db, away.teacher, { testId, released: true }), {
    status: 404,
  });

  // When Gemini is down the attempt is still saved; written points wait for a retry or review.
  const offline = { apiKey: '' };
  await startRanked(db, ben, testId);
  const benDetail = await submitRanked(db, ben, { testId, answers }, offline);
  const written = key.questions.some((q) => q.type === 'frq');
  assert.equal(benDetail.test.score!.grading, written ? 'pending' : 'complete');
  if (written) {
    assert.ok(benDetail.test.score!.pendingPoints > 0);
    const benRow = (await rankedForInstructor(db, home.teacher, testId)).test.assignments.find(
      (row) => row.studentId === ben.id,
    )!;
    const result = (await rankedForInstructor(db, home.teacher, testId)).results[
      benRow.assignmentId
    ];
    const scores = Object.fromEntries(
      result.questions.flatMap((q) =>
        q.criteria.filter((c) => c.needsReview).map((c) => [`${q.id}/${c.id}`, 0]),
      ),
    );
    await assert.rejects(
      reviewRanked(db, away.teacher, { assignmentId: benRow.assignmentId, scores }),
      { status: 404 },
    );
    await reviewRanked(db, home.teacher, { assignmentId: benRow.assignmentId, scores });
    const reviewed = (await rankedForStudent(db, ben, testId)).test.score!;
    assert.equal(reviewed.pendingPoints, 0);
    assert.equal(reviewed.grading, 'complete');
    assert.equal(
      raw.prepare('SELECT points FROM points_ledger WHERE id=?').get(benRow.assignmentId)!.points,
      Math.round(reviewed.percentage),
    );
  }

  // Time that runs out is collected from the last autosave, never from a late browser payload.
  await startRanked(db, cal, testId);
  assert.equal(key.questions[0].type, 'mcq');
  const partial = { [key.questions[0].id]: answers[key.questions[0].id] };
  await saveRankedDraft(db, cal, { testId, answers: partial });
  [listed] = await listRankedForInstructor(db, home.teacher);
  const calRow = listed.assignments.find((row) => row.studentId === cal.id)!;
  await assert.rejects(collectRanked(db, home.teacher, calRow.assignmentId, offline), {
    status: 409,
  });
  raw
    .prepare('UPDATE ranked_assignments SET started_at=? WHERE id=?')
    .run(new Date(Date.now() - 3 * 3600_000).toISOString(), calRow.assignmentId);
  await assert.rejects(saveRankedDraft(db, cal, { testId, answers }), { status: 409 });
  const late = await submitRanked(db, cal, { testId, answers }, offline);
  assert.equal(late.test.score!.score, key.questions[0].points);

  // Leaving the school clears seats and unstarted work but keeps submitted attempts.
  await assignRanked(db, home.teacher, { testId, studentIds: [eve.id], due });
  await leaveCommunity(db, eve);
  await leaveCommunity(db, amy);
  [listed] = await listRankedForInstructor(db, home.teacher);
  assert.deepEqual(
    listed.assignments.map((row) => row.studentName),
    ['ben', 'cal'],
  );
  assert.deepEqual(
    (await listTeams(db, home.teacher)).find((team) => team.id === one)!.slots['water-quality'],
    [null, ben.id],
  );
  assert.equal(raw.prepare('SELECT COUNT(*) AS n FROM ranked_assignments').get()!.n, 3);

  const { id: unused } = await createRankedTest(
    db,
    home.teacher,
    { division: 'C', eventId: 'water-quality', questionCount: 5, title: 'Warm-up' },
    ai.config,
  );
  await assignRanked(db, home.teacher, { testId: unused, everyone: true, due });
  // An unstarted test can lose a question; totals follow, and a started test is locked.
  const smallest = await rankedForInstructor(db, home.teacher, unused);
  assert.equal(smallest.questions.length, 5);
  await assert.rejects(
    removeRankedQuestion(db, home.teacher, { testId: unused, questionId: 'r1' }),
    { status: 409 },
  );
  const { id: roomy } = await createRankedTest(
    db,
    home.teacher,
    { division: 'C', eventId: 'water-quality', questionCount: 6 },
    ai.config,
  );
  const six = await rankedForInstructor(db, home.teacher, roomy);
  await assert.rejects(
    removeRankedQuestion(db, away.teacher, { testId: roomy, questionId: 'r2' }),
    { status: 404 },
  );
  await removeRankedQuestion(db, home.teacher, { testId: roomy, questionId: 'r2' });
  const five = await rankedForInstructor(db, home.teacher, roomy);
  assert.deepEqual(
    five.questions.map((q) => [q.id, q.label]),
    ['r1', 'r3', 'r4', 'r5', 'r6'].map((id, i) => [id, `Question ${i + 1}`]),
  );
  assert.equal(
    five.test.maxScore,
    Math.round((six.test.maxScore - six.questions[1].points) * 100) / 100,
  );
  assert.equal(five.test.questionCount, 5);
  assert.equal(
    five.test.sources.reduce((sum, source) => sum + source.questions, 0),
    5,
  );
  await assert.rejects(removeRankedQuestion(db, home.teacher, { testId, questionId: 'r1' }), {
    status: 409,
  });
  await deleteRankedTest(db, home.teacher, roomy);
  await assert.rejects(deleteRankedTest(db, away.teacher, unused), { status: 404 });
  await deleteRankedTest(db, home.teacher, unused);
  assert.equal((await listRankedForInstructor(db, home.teacher)).length, 1);
  raw.close();
});
