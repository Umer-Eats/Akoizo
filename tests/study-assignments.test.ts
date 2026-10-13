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
import { createTeam, updateTeam } from '../src/lib/team-service.ts';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';
import { labsForEvent } from '../src/lib/division-c-labs.ts';
import { calculateLab, initialLabValues } from '../src/lib/division-c-lab-models.ts';
import { listPracticeTests } from '../src/lib/practice-catalog.ts';
import {
  assignWork,
  recordLab,
  removeStudyAssignment,
  studentWork,
  submitLab,
  submitLesson,
} from '../src/lib/study-assignment-service.ts';

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
  return db;
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
/** Two teams seat amy+ben and cal in Forensics; dee is on the roster without a seat. */
async function seated(db: Database) {
  const home = await school(db, 't1', 'ppchs', ['amy', 'ben', 'cal', 'dee', 'b-eve']);
  const [amy, ben, cal, dee, eve] = home.members;
  for (const [name, ids] of [
    ['Varsity', [amy.id, ben.id]],
    ['JV', [cal.id]],
  ] as const) {
    const team = await createTeam(db, home.teacher, { name, division: 'C' });
    for (const [slot, studentId] of ids.entries())
      await updateTeam(db, home.teacher, {
        teamId: team.id,
        eventId: 'forensics',
        slot,
        studentId,
      });
  }
  return { ...home, amy, ben, cal, dee, eve };
}
const course = lessonsForEvent('forensics', 'C')!;
const week = { due: '2999-01-01', timeZone: 'UTC' };
const forensics = { action: 'assign', division: 'C', eventId: 'forensics', ...week };
const mine = async (db: Database, student: Profile) =>
  (await dashboardFor(db, student)).assignments;

test('lessons reach everyone seated in the event, or chosen students and their partners', async () => {
  const db = fixture();
  const { teacher, amy, ben, cal, dee } = await seated(db);
  const lesson = course.lessons[0];
  const body = { ...forensics, kind: 'Lesson', targetId: lesson.id };

  assert.deepEqual(await assignWork(db, teacher, { ...body, everyone: true }), {
    assigned: 3,
    alreadyAssigned: 0,
  });
  assert.equal((await mine(db, dee)).length, 0);
  const [assigned] = await mine(db, amy);
  assert.equal(assigned.type, 'Lesson');
  assert.deepEqual(assigned.study, { kind: 'Lesson', targetId: lesson.id, title: lesson.title });

  // Naming one partner brings the other; a student without a seat is assigned alone.
  const unit = course.units[0];
  assert.deepEqual(
    await assignWork(db, teacher, {
      ...forensics,
      kind: 'Unit',
      targetId: unit.id,
      studentIds: [ben.id, dee.id],
    }),
    { assigned: 3, alreadyAssigned: 0 },
  );
  assert.equal((await mine(db, amy)).length, 2);
  assert.equal((await mine(db, cal)).length, 1);
  assert.equal((await mine(db, dee))[0].study?.kind, 'Unit');

  // Assigning the same lesson again changes nothing.
  assert.deepEqual(await assignWork(db, teacher, { ...body, everyone: true }), {
    assigned: 0,
    alreadyAssigned: 3,
  });
});

test('assignments reject work outside the event, division, or school', async () => {
  const db = fixture();
  const { teacher, amy, eve } = await seated(db);
  const other = await school(db, 't2', 'ppcms-central', ['zed']);
  const lesson = course.lessons[0].id;
  const body = { ...forensics, kind: 'Lesson', targetId: lesson, studentIds: [amy.id] };
  await assert.rejects(assignWork(db, amy, body), /Instructor access/);
  await assert.rejects(assignWork(db, teacher, { ...body, targetId: 'nope' }), /not in this event/);
  await assert.rejects(assignWork(db, teacher, { ...body, kind: 'Essay' }), /Choose a practice/);
  await assert.rejects(assignWork(db, teacher, { ...body, due: '2000-01-01' }), /due date/);
  await assert.rejects(assignWork(db, teacher, { ...body, studentIds: [eve.id] }), /Division C/);
  await assert.rejects(
    assignWork(db, teacher, { ...body, studentIds: [other.members[0].id] }),
    /not in Division C at your school/,
  );
  await assert.rejects(
    assignWork(db, teacher, { ...body, eventId: 'anatomy-and-physiology' }),
    /not in this event/,
  );
  // An event nobody is seated in needs named students.
  await assert.rejects(
    assignWork(db, teacher, {
      ...forensics,
      eventId: 'anatomy-and-physiology',
      kind: 'Lesson',
      targetId: lessonsForEvent('anatomy-and-physiology', 'C')!.lessons[0].id,
      everyone: true,
    }),
    /No students are seated/,
  );
  // Division B has no lessons yet.
  await assert.rejects(
    assignWork(db, teacher, {
      ...body,
      division: 'B',
      eventId: 'anatomy-and-physiology',
      studentIds: [eve.id],
    }),
    /not in this event/,
  );
});

/** A full set of answers to one lesson's practice, with the first `wrong` multiple-choice ones missed. */
function lessonAnswers(lessonId: string, wrong = 0) {
  const practice = course.lessons.find((item) => item.id === lessonId)?.practice ?? [];
  let missed = 0;
  return Object.fromEntries(
    practice.map((q) => [
      q.id,
      q.type === 'mcq' && missed++ < wrong ? q.options!.find((o) => o !== q.answer)! : q.answer,
    ]),
  );
}
const submit = (db: Database, student: Profile, lessonId: string, wrong = 0) =>
  submitLesson(db, student, {
    eventId: 'forensics',
    lessonId,
    answers: lessonAnswers(lessonId, wrong),
  });

test('submitted lessons are graded and complete lesson and unit assignments', async () => {
  const db = fixture();
  const { teacher, amy, ben } = await seated(db);
  const unit = course.units[0];
  const [first, ...rest] = unit.lessonIds;
  const points = course.lessons
    .find((lesson) => lesson.id === first)!
    .practice.filter((q) => q.type === 'mcq')
    .reduce((sum, q) => sum + (q.points ?? 1), 0);
  await assignWork(db, teacher, { ...forensics, kind: 'Unit', targetId: unit.id, everyone: true });
  await assignWork(db, teacher, { ...forensics, kind: 'Lesson', targetId: first, everyone: true });

  await assert.rejects(submit(db, teacher, first), /student account/);
  await assert.rejects(submit(db, amy, 'nope'), /not in this event/);
  await assert.rejects(
    submitLesson(db, amy, { eventId: 'forensics', lessonId: first, answers: {} }),
    /Answer every practice question/,
  );
  // One missed multiple-choice question lowers the score; the lesson still counts as completed.
  const graded = await submit(db, amy, first, 1);
  assert.equal(graded.maxScore, points);
  assert.equal(graded.score < points, true);
  let work = await mine(db, amy);
  assert.equal(work.find((a) => a.study?.kind === 'Lesson')?.completedAt !== null, true);
  assert.equal(work.find((a) => a.study?.kind === 'Unit')?.completedAt, null);
  assert.equal((await dashboardFor(db, amy)).stats.lessons, 1);

  // Submitting again keeps one record with the latest score.
  assert.deepEqual(await submit(db, amy, first), { score: points, maxScore: points });
  let records = await studentWork(db, teacher, amy.id);
  assert.equal(records.length, 1);
  assert.deepEqual(
    { ...records[0], completedAt: '' },
    {
      type: 'Lesson',
      eventId: 'forensics',
      eventName: 'Forensics',
      targetId: first,
      title: course.lessons.find((lesson) => lesson.id === first)!.title,
      score: points,
      maxScore: points,
      percentage: 100,
      completedAt: '',
    },
  );
  assert.equal((await dashboardFor(db, amy)).stats.lessons, 1);

  // The rest of the unit finishes it.
  for (const id of rest) await submit(db, amy, id);
  work = await mine(db, amy);
  assert.equal(
    work.every((a) => a.completedAt),
    true,
  );
  assert.equal(
    (await mine(db, ben)).some((a) => a.completedAt),
    false,
  );

  // A lesson finished before it is assigned counts at once.
  const later = course.units[1].lessonIds[0];
  await submit(db, amy, later);
  await assignWork(db, teacher, { ...forensics, kind: 'Lesson', targetId: later, everyone: true });
  assert.equal(
    (await mine(db, amy)).find((a) => a.study?.targetId === later)?.completedAt !== null,
    true,
  );
  assert.equal((await mine(db, ben)).find((a) => a.study?.targetId === later)?.completedAt, null);

  // Students read their own records; instructors only those of their own school.
  records = await studentWork(db, amy);
  assert.equal(records.length, unit.lessonIds.length + 1);
  assert.deepEqual(await studentWork(db, ben), []);
  const other = await school(db, 't2', 'ppcms-central', []);
  await assert.rejects(studentWork(db, other.teacher, amy.id), /not found in your school/);
});

test('lab simulations are assigned by event and submitted for accuracy', async () => {
  const db = fixture();
  const { teacher, amy, ben, cal } = await seated(db);
  const lab = labsForEvent('C', 'forensics')[0];
  const body = { ...forensics, kind: 'Lab', targetId: lab.id };
  assert.equal((await assignWork(db, teacher, { ...body, studentIds: [amy.id] })).assigned, 2);
  assert.equal(
    (await assignWork(db, teacher, { ...body, targetId: 'phet', everyone: true })).assigned,
    3,
  );
  const [assigned] = (await mine(db, ben)).filter((a) => a.study?.targetId === lab.id);
  assert.equal(assigned.type, 'Lab');
  assert.equal(assigned.study?.title, lab.title);
  assert.match((await mine(db, cal))[0].study!.title, /^PhET: /);

  const values = initialLabValues(lab);
  const expected = calculateLab(lab.model, values, 0).answer;
  const attempt = { eventId: 'forensics', labId: lab.id, values, scenario: 0 };
  await assert.rejects(submitLab(db, amy, { ...attempt, labId: 'nope' }), /not in this/);
  await assert.rejects(submitLab(db, amy, { ...attempt, answer: 'abc' }), /as a number/);
  await assert.rejects(submitLab(db, amy, { ...attempt, values: {}, answer: 1 }), /lab control/);
  // Accuracy falls with the distance from the model answer and never goes below zero.
  assert.deepEqual(await submitLab(db, amy, { ...attempt, answer: expected * 1.25 }), {
    accuracy: 75,
  });
  assert.deepEqual(await submitLab(db, amy, { ...attempt, answer: expected * 9 }), { accuracy: 0 });
  assert.equal(
    (await mine(db, amy)).find((a) => a.study?.targetId === lab.id)?.completedAt !== null,
    true,
  );
  assert.deepEqual(await submitLab(db, amy, { ...attempt, answer: String(expected * 1.01) }), {
    accuracy: 100,
  });
  const records = await studentWork(db, teacher, amy.id);
  assert.equal(records.length, 1);
  assert.equal(records[0].type, 'Lab');
  assert.equal(records[0].title, lab.title);
  assert.equal(records[0].percentage, 100);

  // The PhET simulation is marked complete without a score.
  assert.deepEqual(await recordLab(db, amy, { eventId: 'forensics', labId: 'phet' }), {
    completed: 1,
  });
  assert.equal((await studentWork(db, amy)).length, 1);

  // Instructors remove pending work only, and only in their own school.
  const other = await school(db, 't2', 'ppcms-central', []);
  assert.equal(await removeStudyAssignment(db, other.teacher, assigned.id), false);
  assert.equal(await removeStudyAssignment(db, teacher, assigned.id), true);
  const done = (await mine(db, amy)).find((a) => a.study?.targetId === lab.id)!;
  assert.equal(await removeStudyAssignment(db, teacher, done.id), false);

  await leaveCommunity(db, cal);
  assert.equal(
    (await dashboardFor(db, teacher)).assignments.some((a) => a.studentId === cal.id),
    false,
  );
});

test('practice tests use the same recipients and are not assigned twice', async () => {
  const db = fixture();
  const { teacher, amy, dee } = await seated(db);
  const [paper, second] = listPracticeTests('C', 'forensics');
  const body = { ...forensics, kind: 'Practice', targetId: paper.id };
  assert.deepEqual(await assignWork(db, teacher, { ...body, everyone: true }), {
    assigned: 3,
    alreadyAssigned: 0,
  });
  assert.deepEqual(await assignWork(db, teacher, { ...body, studentIds: [amy.id, dee.id] }), {
    assigned: 1,
    alreadyAssigned: 2,
  });
  const [assigned] = await mine(db, amy);
  assert.equal(assigned.type, 'Practice');
  assert.equal(assigned.testId, paper.id);
  await assert.rejects(
    assignWork(db, teacher, { ...body, eventId: 'anatomy-and-physiology' }),
    /not in this event/,
  );
  if (second)
    assert.equal(
      (
        await assignWork(db, teacher, {
          ...body,
          targetId: second.id,
          due: '2999-02-02',
          everyone: true,
        })
      ).assigned,
      3,
    );
});
