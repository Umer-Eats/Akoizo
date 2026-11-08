import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { schema } from '../src/lib/schema.ts';
import type { Database } from '../src/lib/school-service.ts';
import type { Profile } from '../src/lib/domain.ts';
import { blankCourse } from '../src/lib/build-events.ts';
import { saveCourse, listCourses, readCourse } from '../src/lib/course-service.ts';
import { courseDocument } from '../src/lib/course-document.ts';

const student: Profile = {
  id: 'course-student',
  role: 'student',
  division: 'C',
  displayName: 'Ada',
  schoolId: 'one',
  schoolName: 'First School',
  schoolCommunityId: null,
  schoolCommunityName: null,
};
function fixture() {
  const raw = new DatabaseSync(':memory:');
  for (const sql of schema) raw.exec(sql);
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
        const results = statements.map(({ sql, args }) => ({
          rowsAffected: Number(raw.prepare(sql).run(...args).changes),
          rows: [],
        }));
        raw.exec('COMMIT');
        return results;
      } catch (e) {
        raw.exec('ROLLBACK');
        throw e;
      }
    },
  };
  return { db, raw };
}
function completeCourse() {
  const course = blankCourse('C', 'electric-vehicle');
  course.parameters = Object.fromEntries(
    Object.keys(course.parameters).map((k) => [k, 'Fixture setup value']),
  );
  course.setup = ['Measure the course from the start.'];
  course.ruleReferences = ['2027 event rules: course setup'];
  course.diagram.nodes = [
    { label: 'Start', x: 10, y: 50 },
    { label: 'Target', x: 90, y: 50 },
  ];
  course.diagram.edges = [{ from: 0, to: 1, label: '6.00 m' }];
  return course;
}
test('courses persist across members, deduplicate retries, and save edits as separate snapshots', async () => {
  const { db, raw } = fixture();
  try {
    const course = completeCourse(),
      first = await saveCourse(db, student, course);
    assert.equal((await saveCourse(db, student, course)).id, first.id);
    assert.equal(first.schoolName, 'First School');
    const coach = { ...student, id: 'coach', role: 'instructor' as const, division: null };
    assert.deepEqual((await readCourse(db, coach, first.id)).course, course);
    assert.equal((await listCourses(db, coach, null, null, null)).courses.length, 1);
    assert.equal((await listCourses(db, student, null, 'B', null)).courses.length, 0);
    assert.equal((await listCourses(db, student, 'boomilever', 'C', null)).courses.length, 0);
    const changed = await saveCourse(db, student, { ...course, title: 'Changed course' });
    assert.notEqual(changed.id, first.id);
    assert.equal((await readCourse(db, student, first.id)).title, course.title);
    await assert.rejects(saveCourse(db, coach, course), { status: 403 });
    await assert.rejects(saveCourse(db, { ...student, division: 'B' }, course), { status: 400 });
    await assert.rejects(saveCourse(db, student, blankCourse('C', 'electric-vehicle')), {
      status: 400,
    });
    await assert.rejects(readCourse(db, student, 'missing'), { status: 404 });
  } finally {
    raw.close();
  }
});
test('course library pagination and division/event filters never repeat or omit records', async () => {
  const { db, raw } = fixture();
  try {
    for (let i = 0; i < 27; i++)
      await saveCourse(db, student, { ...completeCourse(), title: `Course ${i}` });
    const first = await listCourses(db, student, 'electric-vehicle', 'C', null);
    assert.equal(first.courses.length, 24);
    assert.ok(first.nextCursor);
    const second = await listCourses(db, student, 'electric-vehicle', 'C', first.nextCursor);
    assert.equal(second.courses.length, 3);
    assert.equal(second.nextCursor, null);
    assert.equal(new Set([...first.courses, ...second.courses].map((c) => c.id)).size, 27);
    await assert.rejects(listCourses(db, student, null, 'A', null), { status: 400 });
    await assert.rejects(listCourses(db, student, null, null, 'bad cursor'), { status: 400 });
  } finally {
    raw.close();
  }
});
test('printable course includes all geometry keys, dimensions, parameters, setup and rule sources safely', () => {
  const course = completeCourse();
  course.title = '<script>unsafe</script>';
  course.notes = 'Check units.';
  const html = courseDocument(course);
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&lt;script&gt;'));
  for (const text of [
    ...Object.keys(course.parameters),
    ...course.setup,
    ...course.ruleReferences,
    '6.00 m',
    'Check units.',
  ])
    assert.ok(html.includes(text));
  assert.ok(html.includes('course-queue') && html.includes('class="page"'));
});
