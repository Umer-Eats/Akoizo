import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import { registerMember, leaveCommunity, type Database } from '../src/lib/school-service.ts';
import { createTeam, updateTeam, deleteTeam, listTeams } from '../src/lib/team-service.ts';
import { communityFor } from '../src/lib/community-service.ts';
import { schoolAnalytics } from '../src/lib/analytics-service.ts';
import { accuracy, analyticsGroups, summarize, weeklyAccuracy } from '../src/lib/analytics.ts';

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
      return statements.map(({ sql, args }) => ({
        rowsAffected: Number(raw.prepare(sql).run(...args).changes),
        rows: [],
      }));
    },
  };
  return { db, raw };
}
async function school(db: Database, uid: string, community: string, students: string[]) {
  const identity = (id: string) => ({ uid: id, email: `${id}@example.test` });
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
  const members = [];
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
const mcq = (earned: number, possible: number) => ({ earned, possible, criteria: [] });
const written = (earned: number, possible: number, needsReview = false) => ({
  earned,
  possible,
  criteria: [{ id: 'a', points: possible, earned, needsReview }],
});

test('community members can read live data from only their community and cannot edit teams', async () => {
  const { db, raw } = fixture();
  try {
    const home = await school(db, 'coach', 'ppchs', ['amy', 'ben']);
    const away = await school(db, 'other-coach', 'ppcms-central', ['zed']);
    const amy = home.members[0];
    const { id } = await createTeam(db, home.teacher, { name: 'Varsity', division: 'C' });
    await createTeam(db, away.teacher, { name: 'Other school', division: 'C' });
    await updateTeam(db, home.teacher, {
      teamId: id,
      eventId: 'forensics',
      slot: 0,
      studentId: amy.id,
    });
    const readOnlyDb = {
      ...db,
      batch: async () => {
        throw new Error('Reads must never write');
      },
    };
    const data = await communityFor(readOnlyDb, amy);
    assert.deepEqual(data.analytics, await schoolAnalytics(db, home.teacher));
    assert.deepEqual(
      data.members.map((m) => m.name),
      ['amy', 'ben', 'coach'],
    );
    assert.equal(data.analytics.teams[0].slots.forensics[0], amy.id);
    assert.equal(data.analytics.teams.length, 1);
    assert.equal(
      data.members.some((m) => m.id === away.teacher.id),
      false,
    );
    assert.deepEqual(Object.keys(data.members[0]).sort(), ['division', 'id', 'name', 'role']);
    await assert.rejects(createTeam(db, amy, { name: 'Unauthorized', division: 'C' }), {
      status: 403,
    });
    await assert.rejects(updateTeam(db, amy, { teamId: id, name: 'Unauthorized' }), {
      status: 403,
    });
    await assert.rejects(deleteTeam(db, amy, id), { status: 403 });
    await assert.rejects(listTeams(db, amy), { status: 403 });
    await assert.rejects(communityFor(db, { ...amy, schoolId: away.teacher.schoolId }), {
      status: 403,
    });
    await updateTeam(db, home.teacher, { teamId: id, name: 'Updated by teacher' });
    assert.equal((await communityFor(db, amy)).analytics.teams[0].name, 'Updated by teacher');
    await leaveCommunity(db, home.members[1]);
    assert.deepEqual(
      (await communityFor(db, amy)).members.map((m) => m.name),
      ['amy', 'coach'],
    );
    await assert.rejects(communityFor(db, home.members[1]), { status: 403 });
  } finally {
    raw.close();
  }
});

test('school analytics itemize accuracy, points and assigned work per student and event', async () => {
  const { db, raw } = fixture();
  const home = await school(db, 't1', 'ppchs', ['amy', 'ben', 'cal', 'b-dee']);
  const away = await school(db, 't2', 'ppcms-central', ['zed']);
  const [amy, ben, cal, dee] = home.members;
  const { id: teamId } = await createTeam(db, home.teacher, { name: 'Varsity', division: 'C' });
  for (const [slot, student] of [amy, ben].entries())
    await updateTeam(db, home.teacher, {
      teamId,
      eventId: 'forensics',
      slot,
      studentId: student.id,
    });
  const attempt = raw.prepare(
    `INSERT INTO test_attempts (id,student_id,event_id,type,score,max_score,points_awarded,started_at,completed_at) VALUES (?,?,?,?,?,?,?,?,?)`,
  );
  const practice = (
    id: string,
    studentId: string,
    event: string,
    at: string,
    questions: { earned: number; possible: number; criteria: { needsReview: boolean }[] }[],
    pendingPoints = 0,
  ) => {
    const score = questions.reduce((sum, q) => sum + q.earned, 0);
    const maxScore = questions.reduce((sum, q) => sum + q.possible, 0);
    attempt.run(id, studentId, event, 'Practice', score, maxScore, 0, at, at);
    raw
      .prepare(
        'INSERT INTO practice_submissions (id,student_id,test_id,result_json,created_at) VALUES (?,?,?,?,?)',
      )
      .run(id, studentId, `paper-${id}`, JSON.stringify({ pendingPoints, questions }), at);
  };
  // Amy: 2 of 4 multiple choice, 3 of 4 graded written points, and 2 written points pending.
  practice(
    'p1',
    amy.id,
    '2027:C:forensics',
    '2026-10-05T15:00:00.000Z',
    [mcq(2, 2), mcq(0, 2), written(3, 4), written(0, 2, true)],
    2,
  );
  practice('p2', amy.id, '2027:C:astronomy', '2026-10-14T15:00:00.000Z', [mcq(1, 4)]);
  practice('p3', away.members[0].id, '2027:C:forensics', '2026-10-05T15:00:00.000Z', [mcq(4, 4)]);
  practice('p4', dee.id, '2027:B:heredity', '2026-10-05T15:00:00.000Z', [mcq(3, 4)]);
  // Ben: a ranked forensics test worth 80 points, and one more that he has not opened.
  const paper = [mcq(4, 5), written(4, 5)];
  for (const id of ['r1', 'r2'])
    raw
      .prepare(
        `INSERT INTO ranked_tests (id,school_id,instructor_id,event_id,title,minutes,question_count,max_score,sources_json,paper_json,created_at)
         VALUES (?,?,?,'2027:C:forensics','Ranked',30,2,10,'[]','{}','2026-10-01')`,
      )
      .run(id, home.teacher.schoolId, home.teacher.id);
  const assign = raw.prepare(
    `INSERT INTO ranked_assignments (id,test_id,student_id,due_date,assigned_at,submitted_at,result_json) VALUES (?,?,?,'2026-11-01','2026-10-01',?,?)`,
  );
  assign.run(
    'a1',
    'r1',
    ben.id,
    '2026-10-07',
    JSON.stringify({ pendingPoints: 0, questions: paper }),
  );
  assign.run('a2', 'r2', ben.id, null, null);
  attempt.run('a1', ben.id, '2027:C:forensics', 'Ranked', 8, 10, 80, '2026-10-07', '2026-10-07');
  raw
    .prepare(
      `INSERT INTO points_ledger (id,student_id,event_id,test_attempt_id,points,reason) VALUES ('a1',?,'2027:C:forensics','a1',80,'Ranked test')`,
    )
    .run(ben.id);
  raw
    .prepare(
      `INSERT INTO assignments (id,student_id,instructor_id,event_id,type,due_date,completed_at) VALUES ('w1',?,?,'2027:C:forensics','Practice','2026-11-01','2026-10-05')`,
    )
    .run(amy.id, home.teacher.id);
  raw
    .prepare(
      `INSERT INTO lesson_progress (student_id,event_id,lesson_id,completed_at) VALUES (?,'2027:C:forensics','l1','2026-10-05')`,
    )
    .run(amy.id);

  await assert.rejects(schoolAnalytics(db, amy), { status: 403 });
  const data = await schoolAnalytics(db, home.teacher);
  assert.deepEqual(
    data.students.map((s) => [s.name, s.points]),
    [
      ['amy', 0],
      ['b-dee', 0],
      ['ben', 80],
      ['cal', 0],
    ],
  );
  assert.equal(data.attempts.length, 4, 'another school’s attempts are left out');
  const first = data.attempts.find((a) => a.studentId === amy.id && a.eventId === 'forensics')!;
  assert.deepEqual(first.overall, { earned: 5, possible: 8 });
  assert.deepEqual(first.multipleChoice, { earned: 2, possible: 4 });
  assert.deepEqual(first.written, { earned: 3, possible: 4 });

  const groups = analyticsGroups(data);
  assert.deepEqual(
    groups.map((g) => [g.name, g.memberIds.length]),
    [
      ['Varsity', 2],
      ['Not on a team · Division B', 1],
      ['Not on a team · Division C', 1],
    ],
  );
  const varsity = groups[0];
  assert.deepEqual(varsity.seats.forensics, [amy.id, ben.id]);
  const team = summarize(data, varsity.memberIds, 'C');
  assert.equal(accuracy(team.overall), 63.6); // 14 of 22
  assert.equal(accuracy(team.practice), 50);
  assert.equal(accuracy(team.ranked), 80);
  assert.deepEqual([team.practiceTests, team.rankedTests], [2, 1]);
  assert.deepEqual([team.lessons, team.points, team.assigned, team.completed], [1, 80, 3, 2]);
  const forensics = summarize(data, varsity.memberIds, 'C', 'forensics');
  assert.equal(accuracy(forensics.overall), 72.2); // 13 of 18
  assert.equal(accuracy(forensics.multipleChoice), 66.7);
  assert.equal(accuracy(forensics.written), 77.8);
  assert.equal(accuracy(summarize(data, [cal.id], 'C').overall), null);
  assert.equal(accuracy(summarize(data, [dee.id], 'B').overall), 75);
  assert.deepEqual(weeklyAccuracy(data.attempts, varsity.memberIds, 'C'), [
    { week: '2026-10-05', value: 72.2 },
    { week: '2026-10-12', value: 25 },
  ]);

  // A student who leaves the school leaves its analytics; the other school sees only its own.
  await leaveCommunity(db, ben);
  const later = await schoolAnalytics(db, home.teacher);
  assert.equal(later.attempts.length, 3);
  assert.deepEqual(analyticsGroups(later)[0].memberIds, [amy.id]);
  const other = await schoolAnalytics(db, away.teacher);
  assert.deepEqual([other.students.length, other.attempts.length, other.teams.length], [1, 1, 0]);
  raw.close();
});
