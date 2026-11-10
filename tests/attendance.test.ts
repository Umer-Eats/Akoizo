import test from 'node:test';
import assert from 'node:assert/strict';
import { attendanceFixture, workshopInput } from './helpers/attendance-db.ts';
import {
  attendanceFor,
  attendanceLimit,
  checkIn,
  createWorkshop,
  manageWorkshop,
} from '../src/lib/attendance-service.ts';
import { ATTENDANCE_RADIUS_METERS, distanceMeters, workshopStatus } from '../src/lib/attendance.ts';

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
test('half-mile geofence accounts for accuracy and rejects stale, invalid or imprecise positions', async () => {
  const f = await setup();
  await assert.rejects(checkIn(f.db, f.student, { ...f.body(), latitude: 27 }), /0.5 mile/);
  await assert.rejects(
    checkIn(f.db, f.student, { ...f.body(), latitude: 26.007, accuracy: 100 }),
    /0.5 mile/,
  );
  await assert.rejects(checkIn(f.db, f.student, { ...f.body(), accuracy: 500 }), /too approximate/);
  await assert.rejects(checkIn(f.db, f.student, { ...f.body(), latitude: '26' }), /valid map/);
  await assert.rejects(checkIn(f.db, f.student, { ...f.body(), longitude: NaN }), /valid map/);
  await assert.rejects(
    checkIn(f.db, f.student, { ...f.body(), timestamp: Date.now() - 120000 }),
    /expired/,
  );
  await assert.rejects(checkIn(f.db, f.student, { ...f.body(), timestamp: NaN }), /expired/);
  assert.equal(distanceMeters(26, -80, 26, -80), 0);
  assert.ok(distanceMeters(26, -80, 26.007, -80) < ATTENDANCE_RADIUS_METERS);
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
