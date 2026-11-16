import test from 'node:test';
import assert from 'node:assert/strict';
import { attendanceFixture, workshopInput } from './helpers/attendance-db.ts';
import {
  attendanceFor,
  attendanceLimit,
  checkIn,
  createWorkshop,
  manageWorkshop,
  deleteWorkshop,
} from '../src/lib/attendance-service.ts';
import {
  ATTENDANCE_ACCURACY_ALLOWANCE_METERS,
  ATTENDANCE_RADIUS_METERS,
  distanceMeters,
  withinAttendanceRange,
  workshopStatus,
} from '../src/lib/attendance.ts';

async function setup() {
  const f = attendanceFixture();
  const { id } = await createWorkshop(f.db, f.teacher, workshopInput());
  const code = String(
    f.raw.prepare('SELECT code FROM attendance_workshops WHERE id=?').get(id)!.code,
  );
  return {
    ...f,
    id,
    code,
    body: () => ({
      workshopId: id,
      code,
      latitude: 26,
      longitude: -80,
      accuracy: 10,
      timestamp: Date.now(),
    }),
  };
}
test('each workshop has its own code, roster, time window and school-scoped student view', async () => {
  const f = await setup();
  await createWorkshop(f.db, f.teacher, { ...workshopInput(), title: 'Next workshop' });
  const report = await attendanceFor(f.db, f.teacher);
  assert.equal(report.workshops.length, 2);
  assert.notEqual(report.workshops[0].code, report.workshops[1].code);
  assert.deepEqual(report.workshops[0].audienceIds?.sort(), ['absent', 'student']);
  const student = await attendanceFor(f.db, f.student);
  assert.equal(student.workshops.length, 2);
  assert.equal(student.workshops[0].code, undefined);
  assert.deepEqual(student.members, []);
  assert.deepEqual(student.records, []);
  assert.equal((await attendanceFor(f.db, f.outsider)).workshops.length, 0);
  f.raw.close();
});
test('teachers can mark rostered students present and undo only their own marks', async () => {
  const f = await setup();
  const mark = (studentId: string, present: boolean, profile = f.teacher) =>
    manageWorkshop(f.db, profile, { id: f.id, action: 'mark', studentId, present });
  assert.deepEqual(await mark('absent', true), { ok: true, present: true });
  // Marking again is harmless.
  assert.deepEqual(await mark('absent', true), { ok: true, present: true });
  let data = await attendanceFor(f.db, f.teacher);
  assert.equal(data.workshops[0].present, 1);
  assert.deepEqual(
    data.records.map((r) => [r.studentId, r.markedByTeacher]),
    [['absent', true]],
  );
  // The student sees themselves as checked in and does not need to check in again.
  const absent = { ...f.student, id: 'absent' };
  assert.ok((await attendanceFor(f.db, absent)).workshops[0].checkedInAt);
  assert.equal((await checkIn(f.db, absent, f.body())).alreadyRecorded, true);
  // Undo removes a teacher mark.
  assert.deepEqual(await mark('absent', false), { ok: true, present: false });
  assert.equal((await attendanceFor(f.db, f.teacher)).workshops[0].present, 0);
  // A student's own check-in is never removed by undo, and marking it keeps it as is.
  await checkIn(f.db, f.student, f.body());
  await mark('student', true);
  data = await attendanceFor(f.db, f.teacher);
  assert.equal(data.records.find((r) => r.studentId === 'student')?.markedByTeacher, false);
  await assert.rejects(mark('student', false), /checked in themselves/);
  // Works after the window closes; rejects non-roster students, other schools, students and bad input.
  f.raw
    .prepare('UPDATE attendance_workshops SET opens_at=?,closes_at=? WHERE id=?')
    .run(
      new Date(Date.now() - 7200000).toISOString(),
      new Date(Date.now() - 3600000).toISOString(),
      f.id,
    );
  assert.deepEqual(await mark('absent', true), { ok: true, present: true });
  await assert.rejects(mark('outsider', true), /not on this event/);
  await assert.rejects(
    mark('absent', true, { ...f.teacher, schoolId: 'other' }),
    /not on this event/,
  );
  await assert.rejects(mark('absent', true, f.student), /Only teachers/);
  await assert.rejects(
    manageWorkshop(f.db, f.teacher, {
      id: f.id,
      action: 'mark',
      studentId: 'absent',
      present: 'yes',
    }),
    /present or not/,
  );
  f.raw.prepare('UPDATE attendance_workshops SET cancelled=1 WHERE id=?').run(f.id);
  await assert.rejects(mark('absent', false), /cancelled/);
  f.raw.close();
});
test('editing an event keeps its code, roster and existing check-ins', async () => {
  const f = await setup();
  await checkIn(f.db, f.student, f.body());
  const before = f.raw.prepare('SELECT * FROM attendance_records').all();
  const moved = {
    ...workshopInput(),
    id: f.id,
    action: 'edit',
    title: 'Build lab (moved)',
    locationName: 'Gym',
    latitude: 27,
    longitude: -81,
    opensAt: new Date(Date.now() + 86400000).toISOString(),
    closesAt: new Date(Date.now() + 90000000).toISOString(),
  };
  assert.deepEqual(await manageWorkshop(f.db, f.teacher, moved), { ok: true });
  const w = (await attendanceFor(f.db, f.teacher)).workshops[0];
  assert.equal(w.id, f.id);
  assert.equal(w.title, 'Build lab (moved)');
  assert.equal(w.locationName, 'Gym');
  assert.equal(w.latitude, 27);
  assert.equal(w.code, f.code);
  assert.equal(w.present, 1);
  assert.deepEqual(w.audienceIds?.sort(), ['absent', 'student']);
  assert.deepEqual(f.raw.prepare('SELECT * FROM attendance_records').all(), before);
  // The student still shows as checked in, even though the event moved and has not opened yet.
  assert.ok((await attendanceFor(f.db, f.student)).workshops[0].checkedInAt);
  // Past events can be corrected; invalid windows, other schools and students are rejected.
  await manageWorkshop(f.db, f.teacher, {
    ...moved,
    opensAt: new Date(Date.now() - 7200000).toISOString(),
    closesAt: new Date(Date.now() - 3600000).toISOString(),
  });
  await assert.rejects(
    manageWorkshop(f.db, f.teacher, { ...moved, closesAt: moved.opensAt }),
    /closing time after opening/,
  );
  await assert.rejects(manageWorkshop(f.db, f.teacher, { ...moved, title: ' ' }), /event title/);
  await assert.rejects(
    manageWorkshop(f.db, { ...f.teacher, schoolId: 'other' }, moved),
    /not found/,
  );
  await assert.rejects(manageWorkshop(f.db, f.student, moved), /Only teachers/);
  f.raw.prepare('UPDATE attendance_workshops SET cancelled=1 WHERE id=?').run(f.id);
  await assert.rejects(manageWorkshop(f.db, f.teacher, moved), /cancelled/);
  f.raw.close();
});
test('valid check-in is persisted exactly once and does not retain exact coordinates', async () => {
  const f = await setup();
  assert.equal((await checkIn(f.db, f.student, f.body())).alreadyRecorded, false);
  assert.equal((await checkIn(f.db, f.student, f.body())).alreadyRecorded, true);
  const rows = f.raw.prepare('SELECT * FROM attendance_records').all();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].latitude, undefined);
  assert.equal(rows[0].longitude, undefined);
  assert.ok((await attendanceFor(f.db, f.student)).workshops[0].checkedInAt);
  f.raw.close();
});
test('teachers can delete an event and its check-ins from all views without affecting other events', async () => {
  const f = await setup();
  await checkIn(f.db, f.student, f.body());
  const other = await createWorkshop(f.db, f.teacher, {
    ...workshopInput(),
    title: 'Keep this event',
  });
  await assert.rejects(deleteWorkshop(f.db, f.student, f.id), /Only teachers/);
  await assert.rejects(
    deleteWorkshop(f.db, { ...f.teacher, schoolId: 'other' }, f.id),
    /not found/,
  );
  assert.equal(f.raw.prepare('SELECT COUNT(*) AS n FROM attendance_records').get()!.n, 1);
  assert.equal((await attendanceFor(f.db, f.student)).workshops.length, 2);
  await deleteWorkshop(f.db, f.teacher, f.id);
  assert.equal(f.raw.prepare('SELECT COUNT(*) AS n FROM attendance_records').get()!.n, 0);
  assert.equal(
    f.raw.prepare('SELECT COUNT(*) AS n FROM attendance_audience WHERE workshop_id=?').get(f.id)!.n,
    0,
  );
  const teacher = await attendanceFor(f.db, f.teacher);
  assert.deepEqual(
    teacher.workshops.map((w) => w.id),
    [other.id],
  );
  assert.deepEqual(teacher.records, []);
  assert.deepEqual(
    (await attendanceFor(f.db, f.student)).workshops.map((w) => w.id),
    [other.id],
  );
  await assert.rejects(checkIn(f.db, f.student, f.body()), /code did not match/);
  await assert.rejects(deleteWorkshop(f.db, f.teacher, f.id), /not found/);
  f.raw.close();
});
test('past and cancelled events can be deleted and no longer affect attendance analytics', async () => {
  const f = await setup();
  await checkIn(f.db, f.student, f.body());
  f.raw
    .prepare('UPDATE attendance_workshops SET closes_at=? WHERE id=?')
    .run(new Date(Date.now() - 1000).toISOString(), f.id);
  assert.equal(
    (await attendanceFor(f.db, f.teacher)).members.find((m) => m.id === 'student')?.expected,
    1,
  );
  await deleteWorkshop(f.db, f.teacher, f.id);
  assert.equal(
    (await attendanceFor(f.db, f.teacher)).members.find((m) => m.id === 'student')?.rate,
    null,
  );
  const cancelled = await createWorkshop(f.db, f.teacher, workshopInput());
  await manageWorkshop(f.db, f.teacher, { id: cancelled.id, action: 'cancel' });
  await deleteWorkshop(f.db, f.teacher, cancelled.id);
  assert.deepEqual((await attendanceFor(f.db, f.teacher)).workshops, []);
  f.raw.close();
});
test('check-in rejects wrong codes, other communities, teachers and non-rostered students', async () => {
  const f = await setup();
  await assert.rejects(
    checkIn(f.db, f.student, { ...f.body(), code: 'BADCODE1' }),
    /code did not match/,
  );
  await assert.rejects(checkIn(f.db, f.outsider, f.body()), /code did not match/);
  await assert.rejects(checkIn(f.db, f.teacher, f.body()), /Only students/);
  f.raw.prepare('DELETE FROM attendance_audience WHERE student_id=?').run(f.student.id);
  await assert.rejects(checkIn(f.db, f.student, f.body()), /not on its roster/);
  f.raw.close();
});
test('server rejects early, late and cancelled check-ins', async () => {
  const f = await setup();
  f.raw
    .prepare('UPDATE attendance_workshops SET opens_at=? WHERE id=?')
    .run(new Date(Date.now() + 60000).toISOString(), f.id);
  await assert.rejects(checkIn(f.db, f.student, f.body()), /outside/);
  f.raw
    .prepare('UPDATE attendance_workshops SET opens_at=?,closes_at=? WHERE id=?')
    .run(
      new Date(Date.now() - 120000).toISOString(),
      new Date(Date.now() - 60000).toISOString(),
      f.id,
    );
  await assert.rejects(checkIn(f.db, f.student, f.body()), /outside/);
  f.raw
    .prepare('UPDATE attendance_workshops SET closes_at=?,cancelled=1 WHERE id=?')
    .run(new Date(Date.now() + 60000).toISOString(), f.id);
  await assert.rejects(checkIn(f.db, f.student, f.body()), /outside/);
  f.raw.close();
});
test('half-mile geofence accepts approximate positions and rejects far, stale or invalid ones', async () => {
  const f = await setup();
  await assert.rejects(checkIn(f.db, f.student, { ...f.body(), latitude: 27 }), /0.5 mile/);
  // ~1.67 km away: too far with a precise fix, but within reach of a rough Wi-Fi fix.
  await assert.rejects(
    checkIn(f.db, f.student, { ...f.body(), latitude: 26.015, accuracy: 100 }),
    /0.5 mile/,
  );
  // Huge reported uncertainty only earns the capped allowance.
  await assert.rejects(
    checkIn(f.db, f.student, { ...f.body(), latitude: 26.3, accuracy: 50000 }),
    /about 20\.7 miles away \(accuracy ±31\.1 miles\)/,
  );
  await assert.rejects(
    checkIn(f.db, f.student, { ...f.body(), accuracy: -1 }),
    /could not be read/,
  );
  await assert.rejects(
    checkIn(f.db, f.student, { ...f.body(), accuracy: '5' }),
    /could not be read/,
  );
  await assert.rejects(checkIn(f.db, f.student, { ...f.body(), latitude: '26' }), /valid map/);
  await assert.rejects(checkIn(f.db, f.student, { ...f.body(), longitude: NaN }), /valid map/);
  await assert.rejects(
    checkIn(f.db, f.student, { ...f.body(), timestamp: Date.now() - 180000 }),
    /expired/,
  );
  await assert.rejects(checkIn(f.db, f.student, { ...f.body(), timestamp: NaN }), /expired/);
  await assert.rejects(checkIn(f.db, f.student, { ...f.body(), ageMs: 180000 }), /expired/);
  await assert.rejects(checkIn(f.db, f.student, { ...f.body(), ageMs: -5 }), /expired/);
  // Device age wins over a skewed device clock (Chromebook clock 10 minutes off).
  const skewed = await checkIn(f.db, f.student, {
    ...f.body(),
    latitude: 26.015,
    accuracy: 1500,
    timestamp: Date.now() - 600000,
    ageMs: 2000,
  });
  assert.equal(skewed.alreadyRecorded, false);
  assert.equal(distanceMeters(26, -80, 26, -80), 0);
  assert.ok(distanceMeters(26, -80, 26.007, -80) < ATTENDANCE_RADIUS_METERS);
  assert.ok(withinAttendanceRange(ATTENDANCE_RADIUS_METERS, 0));
  assert.ok(!withinAttendanceRange(ATTENDANCE_RADIUS_METERS + 1, 0));
  assert.ok(withinAttendanceRange(2000, 1500));
  // Chromebook IP-based fix: ~9 km off with 5 km reported uncertainty still counts.
  assert.ok(withinAttendanceRange(distanceMeters(26, -80, 26.08, -80), 5000));
  // A GPS-grade fix 1.7 km away does not.
  assert.ok(!withinAttendanceRange(distanceMeters(26, -80, 26.015, -80), 20));
  assert.ok(
    !withinAttendanceRange(
      ATTENDANCE_RADIUS_METERS + ATTENDANCE_ACCURACY_ALLOWANCE_METERS + 1,
      1e6,
    ),
  );
  f.raw.close();
});
test('code rotation invalidates old codes and cross-school management is denied', async () => {
  const f = await setup();
  await assert.rejects(
    manageWorkshop(f.db, { ...f.teacher, schoolId: 'other' }, { id: f.id, action: 'cancel' }),
    /not found/,
  );
  await manageWorkshop(f.db, f.teacher, { id: f.id, action: 'rotate' });
  await assert.rejects(checkIn(f.db, f.student, f.body()), /code did not match/);
  const code = String(
    f.raw.prepare('SELECT code FROM attendance_workshops WHERE id=?').get(f.id)!.code,
  );
  await checkIn(f.db, f.student, { ...f.body(), code });
  await manageWorkshop(f.db, f.teacher, { id: f.id, action: 'cancel' });
  await assert.rejects(checkIn(f.db, f.student, { ...f.body(), code }), /outside/);
  f.raw.close();
});
test('analytics count only completed rostered workshops and exclude cancellations and future days', async () => {
  const f = await setup();
  await checkIn(f.db, f.student, f.body());
  f.raw
    .prepare('UPDATE attendance_workshops SET closes_at=? WHERE id=?')
    .run(new Date(Date.now() - 1000).toISOString(), f.id);
  await createWorkshop(f.db, f.teacher, {
    ...workshopInput(),
    opensAt: new Date(Date.now() + 60000).toISOString(),
  });
  const cancelled = await createWorkshop(f.db, f.teacher, workshopInput());
  await manageWorkshop(f.db, f.teacher, { id: cancelled.id, action: 'cancel' });
  const data = await attendanceFor(f.db, f.teacher);
  assert.equal(data.members.find((m) => m.id === 'student')?.rate, 100);
  assert.equal(data.members.find((m) => m.id === 'student')?.expected, 1);
  assert.equal(data.members.find((m) => m.id === 'absent')?.rate, 0);
  assert.equal(data.workshops.length, 3);
  f.raw.close();
});
test('presence expires after 90 seconds and stays within the teacher community', async () => {
  const f = await setup();
  f.raw
    .prepare('INSERT INTO member_presence (user_id,last_seen) VALUES (?,?),(?,?),(?,?)')
    .run('student', Date.now(), 'absent', Date.now() - 100000, 'outsider', Date.now());
  const data = await attendanceFor(f.db, f.teacher);
  assert.equal(data.members.find((m) => m.id === 'student')?.online, true);
  assert.equal(data.members.find((m) => m.id === 'absent')?.online, false);
  assert.equal(
    data.members.find((m) => m.id === 'outsider'),
    undefined,
  );
  f.raw.close();
});
test('attendance attempts are rate limited with a database-backed counter', async () => {
  const f = await setup();
  for (let i = 0; i < 12; i++) await attendanceLimit(f.db, 'test', 12);
  await assert.rejects(attendanceLimit(f.db, 'test', 12), /Too many attempts/);
  f.raw.close();
});
test('workshop validation rejects students, invalid dates, expired windows, invalid time zones and bad coordinates', async () => {
  const f = await setup();
  await assert.rejects(createWorkshop(f.db, f.student, workshopInput()), /Only teachers/);
  for (const bad of [
    { title: '' },
    { opensAt: 'no-date' },
    { closesAt: new Date(Date.now() - 60000).toISOString() },
    { timezone: 'Moon/Crater' },
    { latitude: 100 },
    { longitude: Infinity },
    { closesAt: new Date(Date.now() + 48 * 3600000).toISOString() },
  ])
    await assert.rejects(createWorkshop(f.db, f.teacher, { ...workshopInput(), ...bad }));
  assert.equal(workshopStatus({ ...workshopInput(), cancelled: true }), 'Cancelled');
  f.raw.close();
});
