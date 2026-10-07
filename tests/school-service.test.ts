import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import {
  registerMember,
  profileForUid,
  dashboardFor,
  createAssignment,
  removeAssignment,
  updateDivision,
  rotateSchoolPassword,
  limitEnrollment,
  type Database,
} from '../src/lib/school-service.ts';
import { hashSchoolPassword, verifySchoolPassword } from '../src/lib/school-password.ts';
import { eventKey, type Profile } from '../src/lib/domain.ts';
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
          if (/^SELECT/i.test(sql.trim()))
            return {
              rowsAffected: 0,
              rows: raw.prepare(sql).all(...args) as Awaited<ReturnType<Database['all']>>,
            };
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
const teacherData = {
  role: 'instructor' as const,
  displayName: 'Teacher',
  instructorInvitePassword: 'test-invitation',
};
const identity = (uid: string) => ({ uid, email: `${uid}@example.test` });
async function setup() {
  const { db, raw } = fixture();
  const first = await registerMember(db, identity('t1'), teacherData, 'test-invitation');
  const second = await registerMember(db, identity('t2'), teacherData, 'test-invitation');
  const students: Profile[] = [];
  for (const [uid, division, password] of [
    ['a', 'A', first.credentials!.joiningPassword],
    ['b', 'B', first.credentials!.joiningPassword],
    ['c', 'C', first.credentials!.joiningPassword],
    ['outsider', 'C', second.credentials!.joiningPassword],
  ] as const) {
    students.push(
      (
        await registerMember(
          db,
          identity(uid),
          { role: 'student', displayName: uid, division, schoolPassword: password },
          'test-invitation',
        )
      ).profile,
    );
  }
  return { db, raw, first, second, students };
}
test('enrollment gates, hashing, duplicate recovery, and password rotation', async () => {
  const { db, raw } = fixture();
  await assert.rejects(registerMember(db, identity('wrong'), teacherData, undefined), {
    status: 503,
  });
  await assert.rejects(
    registerMember(
      db,
      identity('wrong'),
      { ...teacherData, instructorInvitePassword: 'wrong' },
      'test-invitation',
    ),
    { status: 403 },
  );
  assert.equal(raw.prepare('SELECT COUNT(*) AS n FROM users').get()!.n, 0);
  const instructor = await registerMember(db, identity('teacher'), teacherData, 'test-invitation');
  assert.ok(instructor.credentials?.schoolName.startsWith('School-'));
  const password = instructor.credentials!.joiningPassword;
  const hash = raw.prepare('SELECT password_hash FROM schools').get()!.password_hash as string;
  assert.notEqual(hash, password);
  assert.ok(verifySchoolPassword(password, hash));
  assert.notEqual(hashSchoolPassword(password), hashSchoolPassword(password));
  await assert.rejects(
    registerMember(
      db,
      identity('student'),
      { role: 'student', displayName: 'Student', division: 'B', schoolPassword: 'bad' },
      'test-invitation',
    ),
    { status: 403 },
  );
  assert.equal(await profileForUid(db, 'student'), null);
  const joined = await registerMember(
    db,
    identity('student'),
    { role: 'student', displayName: 'Student', division: 'B', schoolPassword: password },
    'test-invitation',
  );
  assert.equal(joined.profile.schoolId, instructor.profile.schoolId);
  assert.equal(
    (await registerMember(db, identity('teacher'), teacherData, 'test-invitation')).profile.id,
    instructor.profile.id,
  );
  assert.equal(raw.prepare('SELECT COUNT(*) AS n FROM schools').get()!.n, 1);
  await assert.rejects(registerMember(db, identity('student'), teacherData, 'test-invitation'), {
    status: 409,
  });
  const rotated = await rotateSchoolPassword(db, instructor.profile);
  assert.notEqual(rotated.joiningPassword, password);
  await assert.rejects(
    registerMember(
      db,
      identity('new-student'),
      { role: 'student', displayName: 'New', division: 'A', schoolPassword: password },
      'test-invitation',
    ),
    { status: 403 },
  );
  assert.ok(await profileForUid(db, 'student'));
  await assert.rejects(rotateSchoolPassword(db, joined.profile), { status: 403 });
  raw.close();
});
test('real assignments are scoped by school, role, and current student division', async () => {
  const {
    db,
    raw,
    first,
    second,
    students: [a, b, c, outsider],
  } = await setup();
  const body = {
    studentId: b.id,
    eventId: 'solar-system',
    type: 'Practice',
    due: '2099-01-01',
    timeZone: 'America/New_York',
  };
  await assert.rejects(createAssignment(db, first.profile, { ...body, studentId: outsider.id }), {
    status: 404,
  });
  await assert.rejects(createAssignment(db, c, body), { status: 403 });
  await assert.rejects(createAssignment(db, first.profile, { ...body, eventId: 'astronomy' }), {
    status: 400,
  });
  const saved = await createAssignment(db, first.profile, body);
  await assert.rejects(createAssignment(db, first.profile, body), /UNIQUE/);
  const ranked = await createAssignment(db, first.profile, { ...body, type: 'Ranked' });
  assert.ok(ranked.id);
  await createAssignment(db, first.profile, { ...body, studentId: a.id, eventId: 'progamers' });
  assert.equal((await dashboardFor(db, b)).assignments.length, 2);
  assert.equal((await dashboardFor(db, outsider)).assignments.length, 0);
  assert.equal((await dashboardFor(db, first.profile)).students.length, 3);
  assert.equal((await dashboardFor(db, second.profile)).students.length, 1);
  await assert.rejects(removeAssignment(db, second.profile, saved.id), { status: 404 });
  await assert.rejects(removeAssignment(db, b, saved.id), { status: 403 });
  await removeAssignment(db, first.profile, saved.id);
  assert.equal((await dashboardFor(db, b)).assignments.length, 1);
  await updateDivision(db, b, 'C');
  await assert.rejects(createAssignment(db, first.profile, body), { status: 400 });
  const refreshed = await profileForUid(db, 'b');
  assert.equal(refreshed!.division, 'C');
  const dashboard = await dashboardFor(db, first.profile);
  assert.ok(dashboard.progress[b.id].some((event) => event.eventId === 'astronomy'));
  assert.ok(!dashboard.progress[b.id].some((event) => event.eventId === 'solar-system'));
  assert.equal(
    dashboard.assignments.find((assignment) => assignment.id === ranked.id)!.division,
    'B',
  );
  raw.close();
});
test('progress totals reflect stored activity without multiplying joins or leaking another school', async () => {
  const {
    db,
    raw,
    first,
    students: [, b],
  } = await setup();
  const event = eventKey('B', 'solar-system');
  raw
    .prepare('INSERT INTO lesson_progress VALUES (?,?,?,?)')
    .run(b.id, event, 'lesson1', '2027-01-01');
  raw
    .prepare(
      'INSERT INTO test_attempts (id,student_id,event_id,type,score,max_score,started_at,completed_at) VALUES (?,?,?,?,?,?,?,?)',
    )
    .run('practice1', b.id, event, 'Practice', 8, 10, '2027-01-01', '2027-01-01');
  raw
    .prepare(
      'INSERT INTO test_attempts (id,student_id,event_id,type,score,max_score,started_at,completed_at) VALUES (?,?,?,?,?,?,?,?)',
    )
    .run('ranked1', b.id, event, 'Ranked', 9, 10, '2027-01-01', '2027-01-01');
  raw
    .prepare(
      'INSERT INTO points_ledger (id,student_id,event_id,test_attempt_id,points,reason) VALUES (?,?,?,?,?,?)',
    )
    .run('points1', b.id, event, 'ranked1', 90, 'ranked');
  assert.deepEqual((await dashboardFor(db, b)).stats, {
    lessons: 1,
    practice: 1,
    ranked: 1,
    points: 90,
  });
  const teacher = await dashboardFor(db, first.profile);
  assert.equal(teacher.students.find((s) => s.id === b.id)!.points, 90);
  assert.equal(teacher.progress[b.id].find((e) => e.eventId === 'solar-system')!.lessons, 1);
  for (let i = 0; i < 20; i++) await limitEnrollment(db, 'test-user');
  await assert.rejects(limitEnrollment(db, 'test-user'), { status: 429 });
  raw.close();
});
