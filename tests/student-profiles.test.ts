import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import type { Database } from '../src/lib/school-service.ts';
import type { Profile } from '../src/lib/domain.ts';
import {
  studentDirectory,
  studentRankedProfile,
  publicStudentRanks,
} from '../src/lib/student-profile-service.ts';

function fixture() {
  const raw = new DatabaseSync(':memory:');
  for (const sql of schema) raw.exec(sql);
  for (const seed of eventSeeds) raw.prepare(seed.sql).run(...seed.args);
  for (const id of ['one', 'two'])
    raw.prepare('INSERT INTO schools(id,name,password_hash) VALUES (?,?,?)').run(id, id, 'private');
  for (const [id, school, role, name] of [
    ['a', 'one', 'student', 'Amy Chen'],
    ['b', 'two', 'student', 'Ben Ortiz'],
    ['teacher', 'two', 'instructor', 'Coach Rivera'],
  ])
    raw
      .prepare(
        'INSERT INTO users(id,firebase_uid,email,display_name,role,school_id,division) VALUES (?,?,?,?,?,?,?)',
      )
      .run(id, id, `${id}@private.test`, name, role, school, 'C');
  const db = {
    all: async (sql: string, ...args: string[]) => raw.prepare(sql).all(...args),
    get: async (sql: string, ...args: string[]) => raw.prepare(sql).get(...args),
  } as Database;
  const member: Profile = {
    id: 'a',
    role: 'student',
    displayName: 'Amy Chen',
    schoolId: 'one',
    schoolName: 'one',
    schoolCommunityId: null,
    schoolCommunityName: null,
    division: 'C',
  };
  const eventId = eventSeeds.find((s) => s.args[2] === 'C')!.args[0];
  function attempt(id: string, studentId: string, points: number, type = 'Ranked') {
    raw
      .prepare(
        'INSERT INTO test_attempts(id,student_id,event_id,type,score,max_score,points_awarded,started_at,completed_at) VALUES (?,?,?,?,?,?,?,?,?)',
      )
      .run(
        id,
        studentId,
        eventId,
        type,
        points,
        100,
        points,
        '2026-10-01T00:00:00Z',
        `2026-10-${id.replace(/\D/g, '').padStart(2, '0') || '01'}T01:00:00Z`,
      );
  }
  function assigned(id: string, result: object, released: string | null) {
    raw
      .prepare(
        'INSERT OR IGNORE INTO ranked_tests(id,school_id,instructor_id,event_id,title,minutes,question_count,max_score,sources_json,paper_json,created_at) VALUES (?,?,?,?,?,50,5,100,?,?,?)',
      )
      .run('paper', 'two', 'teacher', eventId, 'Private paper', '[]', '{}', '2026-10-01');
    raw
      .prepare(
        'INSERT INTO ranked_assignments(id,test_id,student_id,due_date,assigned_at,submitted_at,result_json,released_at) VALUES (?,?,?,?,?,?,?,?)',
      )
      .run(
        id,
        'paper',
        'b',
        '2026-10-30',
        '2026-10-01',
        '2026-10-02',
        JSON.stringify(result),
        released,
      );
  }
  return { raw, db, member, attempt, assigned };
}
test('members can browse another community, unranked students, and safe statistics', async () => {
  const { raw, db, member, attempt } = fixture();
  for (let i = 1; i <= 6; i++) attempt(`b${i}`, 'b', 80);
  attempt('p7', 'b', 100, 'Practice');
  const directory = await studentDirectory(db, member, new URLSearchParams());
  assert.equal(directory.total, 2);
  const profile = await studentRankedProfile(db, member, 'b');
  assert.equal(profile.name, 'Ben O.');
  assert.equal(profile.tests, 6);
  assert.equal(profile.points, 480);
  assert.equal(profile.accuracy, 80);
  assert.equal(profile.events[0].tests, 6);
  const ranks = await publicStudentRanks(db);
  assert.deepEqual(ranks.b, {
    name: profile.rank.name,
    tier: profile.rank.tier,
    rr: profile.rank.rr,
    placements: 5,
  });
  assert.deepEqual(Object.keys(ranks.b).sort(), ['name', 'placements', 'rr', 'tier']);
  assert.deepEqual(ranks.a, { name: 'Unranked', tier: null, rr: 0, placements: 0 });
  assert.equal(profile.passRate, 100);
  assert.equal((await studentRankedProfile(db, member, 'a')).rank.name, 'Unranked');
  assert.equal(
    (await studentDirectory(db, member, new URLSearchParams({ school: 'two', q: 'Ben' }))).total,
    1,
  );
  const encoded = JSON.stringify(profile);
  for (const privateField of [
    '@private.test',
    'Ortiz',
    'password_hash',
    'result_json',
    'mmr',
    'paper_json',
  ])
    assert.ok(!encoded.includes(privateField));
  raw.close();
});
test('unreleased and pending scores stay hidden; releasing, correcting and reopening recalculates', async () => {
  const { raw, db, member, attempt, assigned } = fixture();
  attempt('r1', 'b', 80);
  assigned('r1', { pendingPoints: 0, automaticGrading: 'complete' }, null);
  assert.equal((await studentRankedProfile(db, member, 'b')).tests, 0);
  raw.prepare('UPDATE ranked_assignments SET released_at=?').run('2026-10-03');
  assert.equal((await studentRankedProfile(db, member, 'b')).points, 80);
  raw.prepare('UPDATE test_attempts SET points_awarded=40,score=40').run();
  assert.equal((await studentRankedProfile(db, member, 'b')).points, 40);
  raw
    .prepare('UPDATE ranked_assignments SET result_json=?')
    .run(JSON.stringify({ pendingPoints: 10 }));
  assert.equal((await studentRankedProfile(db, member, 'b')).tests, 0);
  raw.prepare('UPDATE ranked_assignments SET released_at=NULL,submitted_at=NULL').run();
  assert.equal((await studentRankedProfile(db, member, 'b')).tests, 0);
  raw.close();
});
test('departed students, closed communities and instructors have no student profiles', async () => {
  const { raw, db, member } = fixture();
  await assert.rejects(studentRankedProfile(db, member, 'teacher'), { status: 404 });
  raw.prepare('INSERT INTO departed_members(user_id) VALUES (?)').run('b');
  await assert.rejects(studentRankedProfile(db, member, 'b'), { status: 404 });
  raw.prepare('DELETE FROM departed_members').run();
  raw.prepare('INSERT INTO closed_communities(school_id) VALUES (?)').run('two');
  assert.equal((await studentDirectory(db, member, new URLSearchParams())).total, 1);
  await assert.rejects(studentRankedProfile(db, member, 'b'), { status: 404 });
  raw.prepare('INSERT INTO departed_members(user_id) VALUES (?)').run('a');
  await assert.rejects(studentDirectory(db, member, new URLSearchParams()), { status: 403 });
  raw.close();
});
