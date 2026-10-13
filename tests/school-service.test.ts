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
  publicName,
  publicRankings,
  type Database,
} from '../src/lib/school-service.ts';
import { hashSchoolPassword, verifySchoolPassword } from '../src/lib/school-password.ts';
import { eventKey, type Profile } from '../src/lib/domain.ts';
import {
  migrateCampusRosters,
  migrateHighSchoolPassword,
  migrateCommunityDirectory,
  syncCommunityPasswords,
} from '../src/lib/campus-migration.ts';
import { schoolCommunities } from '../src/lib/school-communities.ts';
import communityPasswords from '../communitypasswords.json' with { type: 'json' };
import { publicCommunityDirectory } from '../scripts/sync-communities.mjs';
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
  schoolCommunityId: 'ppchs',
};
const identity = (uid: string) => ({ uid, email: `${uid}@example.test` });

test('a configuration entry creates a working community without additional enrollment or schema edits', async () => {
  const { db, raw } = fixture();
  await migrateCommunityDirectory(db);
  const added = {
    id: 'test-new-high',
    name: 'Test New High School',
    studentPassword: { env: 'TEST_NEW_STUDENT_PASSWORD' },
    instructorPassword: { env: 'TEST_NEW_INSTRUCTOR_PASSWORD' },
  };
  const directory = schoolCommunities as unknown as { id: string; name: string }[];
  communityPasswords.push(added);
  directory.push(publicCommunityDirectory([added])[0]);
  process.env.TEST_NEW_STUDENT_PASSWORD = 'fake-new-student';
  process.env.TEST_NEW_INSTRUCTOR_PASSWORD = 'fake-new-instructor';
  try {
    const teacher = await registerMember(
      db,
      identity('new-teacher'),
      {
        ...teacherData,
        schoolCommunityId: added.id,
        instructorInvitePassword: 'fake-new-instructor',
      },
      undefined,
    );
    assert.equal(teacher.profile.schoolCommunityName, added.name);
    assert.equal(teacher.credentials!.joiningPassword, 'fake-new-student');
    const colleague = await registerMember(
      db,
      identity('new-colleague'),
      {
        ...teacherData,
        schoolCommunityId: added.id,
        instructorInvitePassword: 'fake-new-instructor',
      },
      undefined,
    );
    assert.equal(colleague.profile.schoolId, teacher.profile.schoolId);
    const student = await registerMember(
      db,
      identity('new-student'),
      {
        role: 'student',
        displayName: 'New Student',
        division: 'C',
        schoolPassword: 'fake-new-student',
      },
      undefined,
    );
    assert.equal(student.profile.schoolId, teacher.profile.schoolId);
    const existing = await registerMember(
      db,
      identity('existing-campus-teacher'),
      teacherData,
      'test-invitation',
    );
    assert.equal((await dashboardFor(db, existing.profile)).students.length, 0);
    process.env.TEST_NEW_STUDENT_PASSWORD = 'fake-replacement-student';
    await syncCommunityPasswords(db);
    await assert.rejects(
      registerMember(
        db,
        identity('old-password-student'),
        {
          role: 'student',
          displayName: 'Student',
          division: 'C',
          schoolPassword: 'fake-new-student',
        },
        undefined,
      ),
      { status: 403 },
    );
    const next = await registerMember(
      db,
      identity('new-password-student'),
      {
        role: 'student',
        displayName: 'Student',
        division: 'C',
        schoolPassword: 'fake-replacement-student',
      },
      undefined,
    );
    assert.equal(next.profile.schoolId, teacher.profile.schoolId);
    assert.ok(await profileForUid(db, 'new-student'));
  } finally {
    communityPasswords.pop();
    directory.pop();
    delete process.env.TEST_NEW_STUDENT_PASSWORD;
    delete process.env.TEST_NEW_INSTRUCTOR_PASSWORD;
    raw.close();
  }
});

test('generated public community directory includes no password settings and rejects invalid entries', () => {
  const entry = communityPasswords[0];
  assert.deepEqual(publicCommunityDirectory([entry]), [{ id: entry.id, name: entry.name }]);
  assert.throws(() => publicCommunityDirectory([entry, entry]), /unique/);
  assert.throws(() => publicCommunityDirectory([{ ...entry, id: "bad'id" }]), /unique/);
  assert.throws(
    () => publicCommunityDirectory([{ ...entry, studentPassword: { env: 'NEXT_PUBLIC_SECRET' } }]),
    /private/,
  );
  assert.throws(
    () => publicCommunityDirectory([{ ...entry, instructorPassword: { env: '' } }]),
    /private/,
  );
});
test('RCSA instructor invitation is campus-specific and works without the default invitation setting', async () => {
  const { db, raw } = fixture();
  const rcsaData = {
    ...teacherData,
    schoolCommunityId: 'rcsa-high',
    instructorInvitePassword: 'test-rcsa-invite',
  };
  for (const password of ['test-invitation', 'test-rcsa-join', 'TEST-RCSA-INVITE', 'wrong']) {
    await assert.rejects(
      registerMember(
        db,
        identity(`wrong-${password}`),
        {
          ...rcsaData,
          instructorInvitePassword: password,
        },
        'test-invitation',
      ),
      { status: 403 },
    );
  }
  for (const campus of schoolCommunities.filter((c) => c.id !== 'rcsa-high')) {
    await assert.rejects(
      registerMember(
        db,
        identity(`wrong-${campus.id}`),
        {
          ...teacherData,
          schoolCommunityId: campus.id,
          instructorInvitePassword: 'test-rcsa-invite',
        },
        'test-invitation',
      ),
      { status: 403 },
    );
  }
  const instructor = await registerMember(db, identity('rcsa-teacher'), rcsaData, undefined);
  assert.equal(instructor.profile.schoolCommunityName, 'River City Science Academy High School');
  assert.equal(instructor.credentials!.joiningPassword, 'test-rcsa-join');
  const student = await registerMember(
    db,
    identity('rcsa-student'),
    {
      role: 'student',
      displayName: 'RCSA Student',
      division: 'C',
      schoolPassword: 'test-rcsa-join',
    },
    undefined,
  );
  assert.equal(student.profile.schoolId, instructor.profile.schoolId);
  await assert.rejects(
    registerMember(
      db,
      identity('wrong-student'),
      {
        role: 'student',
        displayName: 'Student',
        division: 'C',
        schoolPassword: 'test-rcsa-invite',
      },
      undefined,
    ),
    { status: 403 },
  );
  raw.close();
});

test('community directory migration expands the old CHECK constraint and preserves existing rosters', async () => {
  const { db, raw, first, students } = await setup();
  raw.exec(`ALTER TABLE school_communities RENAME TO old_directory;
    CREATE TABLE school_communities (
      school_id TEXT PRIMARY KEY REFERENCES schools(id) ON DELETE CASCADE,
      community_id TEXT NOT NULL CHECK(community_id IN ('ppchs','ppcms-central','ppcms-west','ppcms-academic-village')));
    INSERT INTO school_communities SELECT * FROM old_directory;
    DROP TABLE old_directory;`);
  await migrateCommunityDirectory(db);
  await migrateCommunityDirectory(db);
  assert.equal((await profileForUid(db, 't1'))!.schoolId, first.profile.schoolId);
  assert.equal((await profileForUid(db, 'a'))!.id, students[0].id);
  const instructor = await registerMember(
    db,
    identity('rcsa'),
    {
      ...teacherData,
      schoolCommunityId: 'rcsa-high',
      instructorInvitePassword: 'test-rcsa-invite',
    },
    undefined,
  );
  assert.equal(instructor.profile.schoolCommunityId, 'rcsa-high');
  assert.deepEqual(raw.prepare('PRAGMA foreign_key_check').all(), []);
  raw.close();
});

test('high school password migration upgrades existing rosters once without changing other campuses', async () => {
  const { db, raw, first, second } = await setup();
  raw.prepare('INSERT INTO app_migrations (id) VALUES (?)').run('shared-campus-rosters-v1');
  raw
    .prepare('UPDATE schools SET password_hash=? WHERE id=?')
    .run(hashSchoolPassword('test-old-high-join'), first.profile.schoolId);
  const otherHash = raw
    .prepare('SELECT password_hash FROM schools WHERE id=?')
    .get(second.profile.schoolId)!.password_hash;
  await migrateCampusRosters(db);
  await migrateHighSchoolPassword(db);
  const hash = String(
    raw.prepare('SELECT password_hash FROM schools WHERE id=?').get(first.profile.schoolId)!
      .password_hash,
  );
  assert.ok(verifySchoolPassword('test-high-join', hash));
  assert.equal(verifySchoolPassword('test-old-high-join', hash), false);
  assert.equal(
    raw.prepare('SELECT password_hash FROM schools WHERE id=?').get(second.profile.schoolId)!
      .password_hash,
    otherHash,
  );
  await migrateHighSchoolPassword(db);
  assert.equal(
    raw.prepare('SELECT password_hash FROM schools WHERE id=?').get(first.profile.schoolId)!
      .password_hash,
    hash,
  );
  raw.close();
});
async function setup() {
  const { db, raw } = fixture();
  const first = await registerMember(db, identity('t1'), teacherData, 'test-invitation');
  const second = await registerMember(
    db,
    identity('t2'),
    { ...teacherData, schoolCommunityId: 'ppcms-central' },
    'test-invitation',
  );
  assert.notEqual(first.profile.schoolId, second.profile.schoolId);
  assert.notEqual(first.profile.schoolCommunityId, second.profile.schoolCommunityId);
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
test('enrollment gates, hashing, duplicate recovery, and fixed campus password reveal', async () => {
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
  assert.equal(instructor.profile.schoolCommunityId, 'ppchs');
  assert.equal(instructor.profile.schoolCommunityName, 'Pembroke Pines Charter High School');
  assert.equal((await profileForUid(db, 'teacher'))!.schoolCommunityId, 'ppchs');
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
  assert.equal(joined.profile.schoolCommunityId, instructor.profile.schoolCommunityId);
  assert.equal(
    (await registerMember(db, identity('teacher'), teacherData, 'test-invitation')).profile.id,
    instructor.profile.id,
  );
  assert.equal(raw.prepare('SELECT COUNT(*) AS n FROM schools').get()!.n, 1);
  await assert.rejects(registerMember(db, identity('student'), teacherData, 'test-invitation'), {
    status: 409,
  });
  const rotated = await rotateSchoolPassword(db, instructor.profile);
  assert.equal(rotated.joiningPassword, password);
  assert.equal(password, 'test-high-join');
  assert.equal(
    (
      await registerMember(
        db,
        identity('new-student'),
        { role: 'student', displayName: 'New', division: 'A', schoolPassword: password },
        'test-invitation',
      )
    ).profile.schoolId,
    instructor.profile.schoolId,
  );
  assert.ok(await profileForUid(db, 'student'));
  await assert.rejects(rotateSchoolPassword(db, joined.profile), { status: 403 });
  raw.close();
});

test('each campus password joins only its shared roster and instructors cannot access other campuses', async () => {
  const { db, raw } = fixture();
  const passwords = [
    'test-high-join',
    'test-central-join',
    'test-west-join',
    'test-avm-join',
    'test-rcsa-join',
  ];
  const instructors: Profile[] = [];
  const learners: Profile[] = [];
  for (const [index, campus] of schoolCommunities.entries()) {
    const data = {
      ...teacherData,
      schoolCommunityId: campus.id,
      instructorInvitePassword: campus.id === 'rcsa-high' ? 'test-rcsa-invite' : 'test-invitation',
    };
    const first = await registerMember(db, identity(`teacher-${index}`), data, 'test-invitation');
    const second = await registerMember(
      db,
      identity(`colleague-${index}`),
      data,
      'test-invitation',
    );
    assert.equal(first.credentials!.joiningPassword, passwords[index]);
    assert.equal(second.profile.schoolId, first.profile.schoolId);
    assert.equal(second.credentials!.schoolName, first.profile.schoolName);
    const learner = await registerMember(
      db,
      identity(`learner-${index}`),
      {
        role: 'student',
        displayName: 'Student',
        division: 'B',
        schoolPassword: passwords[index],
      },
      undefined,
    );
    assert.equal(learner.profile.schoolId, first.profile.schoolId);
    assert.equal(learner.profile.schoolCommunityId, campus.id);
    instructors.push(second.profile);
    learners.push(learner.profile);
  }
  const { renameMember } = await import('../src/lib/school-service.ts');
  for (const [index, instructor] of instructors.entries()) {
    assert.deepEqual(
      (await dashboardFor(db, instructor)).students.map((s) => s.id),
      [learners[index].id],
    );
    for (const [other, learner] of learners.entries()) {
      if (other === index) continue;
      await assert.rejects(renameMember(db, instructor, learner.id, 'Wrong campus'), {
        status: 404,
      });
      await assert.rejects(
        createAssignment(db, instructor, {
          studentId: learner.id,
          eventId: 'anatomy-and-physiology',
          type: 'Practice',
          due: '2099-01-01',
        }),
        { status: 404 },
      );
    }
  }
  raw.close();
});

test('existing campus groups merge once while preserving assignments, progress and closed memberships', async () => {
  const { db, raw, first, second, students } = await setup();
  raw
    .prepare('INSERT INTO schools (id,name,password_hash,created_at) VALUES (?,?,?,?)')
    .run('legacy-group', 'Legacy group', hashSchoolPassword('old-password'), '2099-01-01');
  raw.prepare('INSERT INTO school_communities VALUES (?,?)').run('legacy-group', 'ppchs');
  raw.prepare('UPDATE users SET school_id=? WHERE id=?').run('legacy-group', students[1].id);
  const event = raw.prepare("SELECT id FROM events WHERE division='B' LIMIT 1").get()!.id as string;
  raw
    .prepare('INSERT INTO lesson_progress VALUES (?,?,?,?)')
    .run(students[1].id, event, 'lesson', '2026-10-01');
  raw
    .prepare(
      'INSERT INTO assignments (id,student_id,instructor_id,event_id,type,due_date) VALUES (?,?,?,?,?,?)',
    )
    .run('preserved', students[1].id, first.profile.id, event, 'Practice', '2099-01-01');
  raw
    .prepare('INSERT INTO schools (id,name,password_hash) VALUES (?,?,?)')
    .run('closed-group', 'Closed group', hashSchoolPassword('closed'));
  raw.prepare('INSERT INTO school_communities VALUES (?,?)').run('closed-group', 'ppchs');
  raw.prepare('INSERT INTO closed_communities (school_id) VALUES (?)').run('closed-group');
  await migrateCampusRosters(db);
  assert.equal((await profileForUid(db, 'b'))!.schoolId, first.profile.schoolId);
  assert.equal((await profileForUid(db, 't2'))!.schoolId, second.profile.schoolId);
  assert.equal(
    raw.prepare('SELECT COUNT(*) AS n FROM assignments WHERE id=?').get('preserved')!.n,
    1,
  );
  assert.equal(raw.prepare('SELECT COUNT(*) AS n FROM lesson_progress').get()!.n, 1);
  assert.ok(
    raw.prepare('SELECT school_id FROM closed_communities WHERE school_id=?').get('legacy-group'),
  );
  assert.ok(
    raw.prepare('SELECT school_id FROM closed_communities WHERE school_id=?').get('closed-group'),
  );
  const hash = raw
    .prepare('SELECT password_hash FROM schools WHERE id=?')
    .get(first.profile.schoolId)!.password_hash;
  assert.ok(verifySchoolPassword('test-high-join', String(hash)));
  await migrateCampusRosters(db);
  assert.equal(
    raw.prepare('SELECT password_hash FROM schools WHERE id=?').get(first.profile.schoolId)!
      .password_hash,
    hash,
  );
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

test('settings names are validated and scoped to the current community', async () => {
  const { db, raw, first, second, students } = await setup();
  const { renameMember, leaveCommunity } = await import('../src/lib/school-service.ts');
  await renameMember(db, students[0], students[0].id, '  Ada Learner  ');
  assert.equal((await profileForUid(db, 'a'))!.displayName, 'Ada Learner');
  await renameMember(db, first.profile, students[0].id, 'Ada Student');
  assert.equal((await profileForUid(db, 'a'))!.displayName, 'Ada Student');
  assert.equal(
    (await dashboardFor(db, first.profile)).students.find((s) => s.id === students[0].id)!
      .displayName,
    'Ada Student',
  );
  await assert.rejects(renameMember(db, students[0], students[1].id, 'Wrong'), { status: 403 });
  await assert.rejects(renameMember(db, second.profile, students[0].id, 'Wrong'), { status: 404 });
  await assert.rejects(renameMember(db, students[0], students[0].id, '  '), { status: 400 });
  await assert.rejects(renameMember(db, students[0], students[0].id, 'a'.repeat(81)), {
    status: 400,
  });
  await leaveCommunity(db, students[0]);
  await assert.rejects(renameMember(db, first.profile, students[0].id, 'Wrong'), { status: 404 });
  raw.close();
});

test('leaving revokes membership, removes assignments, and preserves progress on re-enrollment', async () => {
  const { db, raw, first, second, students } = await setup();
  const { leaveCommunity } = await import('../src/lib/school-service.ts');
  const learner = students[0];
  const event = raw.prepare("SELECT id FROM events WHERE division='A' LIMIT 1").get()!.id as string;
  raw
    .prepare('INSERT INTO lesson_progress VALUES (?,?,?,?)')
    .run(learner.id, event, 'lesson-1', '2026-10-01');
  raw
    .prepare(
      'INSERT INTO assignments (id,student_id,instructor_id,event_id,type,due_date) VALUES (?,?,?,?,?,?)',
    )
    .run('leave-assignment', learner.id, first.profile.id, event, 'Practice', '2099-01-01');
  await leaveCommunity(db, learner);
  assert.equal(await profileForUid(db, 'a'), null);
  assert.equal(
    (await dashboardFor(db, first.profile)).students.some((s) => s.id === learner.id),
    false,
  );
  assert.equal(
    raw.prepare('SELECT COUNT(*) AS n FROM assignments WHERE student_id=?').get(learner.id)!.n,
    0,
  );
  assert.equal(
    raw.prepare('SELECT COUNT(*) AS n FROM lesson_progress WHERE student_id=?').get(learner.id)!.n,
    1,
  );
  const rejoined = await registerMember(
    db,
    identity('a'),
    {
      role: 'student',
      displayName: 'Ada',
      division: 'A',
      schoolPassword: second.credentials!.joiningPassword,
    },
    undefined,
  );
  assert.equal(rejoined.profile.id, learner.id);
  assert.equal(rejoined.profile.schoolId, second.profile.schoolId);
  assert.equal((await dashboardFor(db, rejoined.profile)).stats.lessons, 1);
  raw.close();
});

test('community deletion requires its instructor and confirmation and invalidates access/password', async () => {
  const { db, raw, first, second, students } = await setup();
  const { deleteCommunity } = await import('../src/lib/school-service.ts');
  await assert.rejects(deleteCommunity(db, students[0], first.profile.schoolName), { status: 403 });
  await assert.rejects(deleteCommunity(db, first.profile, 'wrong'), { status: 400 });
  await deleteCommunity(db, first.profile, first.profile.schoolName);
  for (const uid of ['t1', 'a', 'b', 'c']) assert.equal(await profileForUid(db, uid), null);
  assert.ok(await profileForUid(db, 't2'));
  assert.ok(await profileForUid(db, 'outsider'));
  await assert.rejects(
    registerMember(
      db,
      identity('new'),
      {
        role: 'student',
        displayName: 'New',
        division: 'A',
        schoolPassword: first.credentials!.joiningPassword,
      },
      undefined,
    ),
    { status: 403 },
  );
  const returning = await registerMember(db, identity('t1'), teacherData, 'test-invitation');
  assert.equal(returning.profile.id, first.profile.id);
  assert.notEqual(returning.profile.schoolId, first.profile.schoolId);
  assert.equal((await dashboardFor(db, second.profile)).students.length, 1);
  raw.close();
});
import { selectEvent, selectedEvents } from '../src/lib/event-selections.ts';
test('competition selections persist per student and division, validate input, and can be removed', async () => {
  const { db, raw, students, first } = await setup();
  const student = students[2];
  assert.deepEqual(
    await selectEvent(db, student, { division: 'C', eventId: 'astronomy', selected: true }),
    ['astronomy'],
  );
  await selectEvent(db, student, { division: 'C', eventId: 'astronomy', selected: true });
  assert.deepEqual(await selectedEvents(db, student, 'C'), ['astronomy']);
  assert.deepEqual(await selectedEvents(db, students[3], 'C'), []);
  assert.deepEqual(await selectedEvents(db, student, 'B'), []);
  await assert.rejects(
    selectEvent(db, student, { division: 'B', eventId: 'astronomy', selected: true }),
    { status: 400 },
  );
  await assert.rejects(
    selectEvent(db, student, { division: 'C', eventId: 'astronomy', selected: 'true' }),
    { status: 400 },
  );
  await assert.rejects(
    selectEvent(db, first.profile, { division: 'C', eventId: 'astronomy', selected: true }),
    { status: 403 },
  );
  assert.deepEqual(
    await selectEvent(db, student, { division: 'C', eventId: 'astronomy', selected: false }),
    [],
  );
  raw.close();
});

test('public rankings show first name, last initial, and the registered school', async () => {
  assert.equal(publicName('Umer Qureshi'), 'Umer Q.');
  assert.equal(publicName('  maria de la cruz '), 'maria C.');
  assert.equal(publicName('Cher'), 'Cher');
  assert.equal(publicName(''), 'Learner');
  const { db, raw, students, first, second } = await setup();
  const [, b, , outsider] = students;
  raw.prepare('UPDATE users SET display_name=? WHERE id=?').run('Umer Qureshi', b.id);
  raw.prepare('UPDATE users SET display_name=? WHERE id=?').run('Ada Lovelace', outsider.id);
  const award = raw.prepare(
    'INSERT INTO points_ledger (id,student_id,points,reason) VALUES (?,?,?,?)',
  );
  award.run('p1', b.id, 90, 'ranked');
  award.run('p2', outsider.id, 40, 'ranked');
  const result = await publicRankings(db);
  assert.deepEqual(result.rankings, [
    {
      id: b.id,
      name: 'Umer Q.',
      division: 'B',
      schoolId: first.profile.schoolId,
      school: 'Pembroke Pines Charter High School',
      points: 90,
    },
    {
      id: outsider.id,
      name: 'Ada L.',
      division: 'C',
      schoolId: second.profile.schoolId,
      school: 'Central Campus Pembroke Pines Charter Middle School',
      points: 40,
    },
  ]);
  assert.deepEqual(result.schools, [
    {
      id: second.profile.schoolId,
      name: 'Central Campus Pembroke Pines Charter Middle School',
    },
    { id: first.profile.schoolId, name: 'Pembroke Pines Charter High School' },
  ]);
  assert.ok(!JSON.stringify(result).includes('Qureshi'));
  raw.close();
});
