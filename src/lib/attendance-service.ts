import { randomBytes, randomUUID } from 'node:crypto';
import { AppError, type Profile } from './domain.ts';
import type { Database } from './school-service.ts';
import {
  ATTENDANCE_LOCATION_MAX_AGE_MS,
  distanceMeters,
  withinAttendanceRange,
  type AttendanceData,
  type Workshop,
} from './attendance.ts';

export async function attendanceLimit(db: Database, key: string, limit: number, seconds = 600) {
  const now = Date.now();
  const result = await db.batch(
    [
      { sql: 'DELETE FROM enrollment_limits WHERE expires_at < ?', args: [now] },
      {
        sql: 'INSERT INTO enrollment_limits (key,attempts,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET attempts=attempts+1',
        args: [`attendance:${key}`, now + seconds * 1000],
      },
      { sql: 'SELECT attempts FROM enrollment_limits WHERE key=?', args: [`attendance:${key}`] },
    ],
    'immediate',
  );
  if (Number(result[2]?.rows[0]?.attempts) > limit)
    throw new AppError(429, 'Too many attempts. Please try again later.');
}
function text(value: unknown, max: number, label: string) {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max)
    throw new AppError(400, `Enter a valid ${label}.`);
  return value.trim();
}
function coordinate(value: unknown, max: number) {
  if (typeof value !== 'number' || !Number.isFinite(value) || Math.abs(value) > max)
    throw new AppError(400, 'Choose a valid map location.');
  return value;
}
// Stored in accuracy_meters for check-ins a teacher records by hand. Student check-ins always
// carry a non-negative accuracy, so this value marks the row as a teacher mark.
const TEACHER_MARK_ACCURACY = -1;
function teacher(profile: Profile) {
  if (profile.role !== 'instructor') throw new AppError(403, 'Only teachers can manage events.');
}
// Shared validation for new and edited events. Edits may keep a past window so teachers can fix
// details of events that already happened.
function workshopFields(body: Record<string, unknown>, requireFuture: boolean) {
  const title = text(body.title, 100, 'event title');
  const location = text(body.locationName, 500, 'location name');
  const lat = coordinate(body.latitude, 90),
    lon = coordinate(body.longitude, 180);
  const opens = Date.parse(text(body.opensAt, 40, 'opening time')),
    closes = Date.parse(text(body.closesAt, 40, 'closing time'));
  if (
    !Number.isFinite(opens) ||
    !Number.isFinite(closes) ||
    closes <= opens ||
    (requireFuture && closes <= Date.now()) ||
    closes - opens > 86400000
  )
    throw new AppError(
      400,
      requireFuture
        ? 'Choose a future closing time after opening, within 24 hours.'
        : 'Choose a closing time after opening, within 24 hours.',
    );
  const timezone = text(body.timezone, 100, 'time zone');
  try {
    new Intl.DateTimeFormat('en', { timeZone: timezone }).format();
  } catch {
    throw new AppError(400, 'Choose a valid time zone.');
  }
  return {
    title,
    location,
    lat,
    lon,
    opensAt: new Date(opens).toISOString(),
    closesAt: new Date(closes).toISOString(),
    timezone,
  };
}
export async function createWorkshop(
  db: Database,
  profile: Profile,
  body: Record<string, unknown>,
) {
  teacher(profile);
  const { title, location, lat, lon, opensAt, closesAt, timezone } = workshopFields(body, true);
  const id = randomUUID(),
    code = randomBytes(4).toString('hex').toUpperCase();
  await db.batch(
    [
      {
        sql: 'INSERT INTO attendance_workshops (id,school_id,instructor_id,title,opens_at,closes_at,timezone,location_name,latitude,longitude,code,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
        args: [
          id,
          profile.schoolId,
          profile.id,
          title,
          opensAt,
          closesAt,
          timezone,
          location,
          lat,
          lon,
          code,
          new Date().toISOString(),
        ],
      },
      {
        sql: `INSERT INTO attendance_audience (workshop_id,student_id) SELECT ?,u.id FROM users u WHERE u.school_id=? AND u.role='student' AND NOT EXISTS (SELECT 1 FROM departed_members d WHERE d.user_id=u.id)`,
        args: [id, profile.schoolId],
      },
    ],
    'immediate',
  );
  return { id };
}
export async function manageWorkshop(
  db: Database,
  profile: Profile,
  body: Record<string, unknown>,
) {
  teacher(profile);
  const id = text(body.id, 100, 'event');
  if (body.action === 'mark') {
    const studentId = text(body.studentId, 100, 'student');
    if (typeof body.present !== 'boolean') throw new AppError(400, 'Choose present or not.');
    const now = new Date().toISOString();
    const result = await db.batch(
      [
        body.present
          ? {
              // Teacher marks need no code, location or open window; the student must be on the
              // event roster. INSERT OR IGNORE keeps an existing student check-in unchanged.
              sql: `INSERT OR IGNORE INTO attendance_records (workshop_id,student_id,checked_in_at,distance_meters,accuracy_meters)
              SELECT w.id,a.student_id,?,0,? FROM attendance_workshops w JOIN attendance_audience a ON a.workshop_id=w.id AND a.student_id=?
              WHERE w.id=? AND w.school_id=? AND w.cancelled=0`,
              args: [now, TEACHER_MARK_ACCURACY, studentId, id, profile.schoolId],
            }
          : {
              // Undo only removes a teacher's own mark, never a student's real check-in.
              sql: `DELETE FROM attendance_records WHERE workshop_id=? AND student_id=? AND accuracy_meters=?
              AND workshop_id IN (SELECT id FROM attendance_workshops WHERE school_id=? AND cancelled=0)`,
              args: [id, studentId, TEACHER_MARK_ACCURACY, profile.schoolId],
            },
        {
          sql: `SELECT r.accuracy_meters FROM attendance_records r JOIN attendance_workshops w ON w.id=r.workshop_id
          WHERE r.workshop_id=? AND r.student_id=? AND w.school_id=?`,
          args: [id, studentId, profile.schoolId],
        },
        {
          sql: `SELECT 1 FROM attendance_audience a JOIN attendance_workshops w ON w.id=a.workshop_id
          WHERE a.workshop_id=? AND a.student_id=? AND w.school_id=? AND w.cancelled=0`,
          args: [id, studentId, profile.schoolId],
        },
      ],
      'immediate',
    );
    if (!result[2]?.rows.length)
      throw new AppError(
        404,
        'That student is not on this event’s roster, or the event was cancelled.',
      );
    const row = result[1]?.rows[0];
    if (!body.present && row)
      throw new AppError(409, 'This student checked in themselves, so their check-in was kept.');
    return { ok: true, present: !!row };
  }
  if (body.action === 'edit') {
    const f = workshopFields(body, false);
    // Update in place: id, code, roster and attendance_records are untouched, so students who
    // already checked in stay checked in.
    const edited = await db.batch(
      [
        {
          sql: 'UPDATE attendance_workshops SET title=?,opens_at=?,closes_at=?,timezone=?,location_name=?,latitude=?,longitude=? WHERE id=? AND school_id=? AND cancelled=0',
          args: [
            f.title,
            f.opensAt,
            f.closesAt,
            f.timezone,
            f.location,
            f.lat,
            f.lon,
            id,
            profile.schoolId,
          ],
        },
      ],
      'immediate',
    );
    if (!edited[0]?.rowsAffected)
      throw new AppError(404, 'Event not found in your community, or it was cancelled.');
    return { ok: true };
  }
  if (body.action !== 'cancel' && body.action !== 'rotate')
    throw new AppError(400, 'Choose an event action.');
  const result = await db.batch(
    [
      {
        sql:
          body.action === 'cancel'
            ? 'UPDATE attendance_workshops SET cancelled=1 WHERE id=? AND school_id=? AND cancelled=0 AND closes_at>?'
            : 'UPDATE attendance_workshops SET code=? WHERE id=? AND school_id=? AND cancelled=0 AND closes_at>?',
        args: [
          ...(body.action === 'rotate' ? [randomBytes(4).toString('hex').toUpperCase()] : []),
          id,
          profile.schoolId,
          new Date().toISOString(),
        ],
      },
    ],
    'immediate',
  );
  if (!result[0]?.rowsAffected)
    throw new AppError(404, 'Active event not found in your community.');
  return { ok: true };
}
export async function deleteWorkshop(db: Database, profile: Profile, value: unknown) {
  teacher(profile);
  const id = text(value, 100, 'event');
  // Scope every deletion to this community and remove dependent rows in one transaction.
  const result = await db.batch(
    [
      {
        sql: 'DELETE FROM attendance_records WHERE workshop_id IN (SELECT id FROM attendance_workshops WHERE id=? AND school_id=?)',
        args: [id, profile.schoolId],
      },
      {
        sql: 'DELETE FROM attendance_audience WHERE workshop_id IN (SELECT id FROM attendance_workshops WHERE id=? AND school_id=?)',
        args: [id, profile.schoolId],
      },
      {
        sql: 'DELETE FROM attendance_workshops WHERE id=? AND school_id=?',
        args: [id, profile.schoolId],
      },
    ],
    'immediate',
  );
  if (!result[2]?.rowsAffected) throw new AppError(404, 'Event not found in your community.');
  return { ok: true };
}
export async function checkIn(db: Database, profile: Profile, body: Record<string, unknown>) {
  if (profile.role !== 'student') throw new AppError(403, 'Only students can check in.');
  await attendanceLimit(db, profile.id, 12);
  const id = text(body.workshopId, 100, 'event');
  const code = text(body.code, 16, 'attendance code').toUpperCase();
  const w = await db.get(
    'SELECT * FROM attendance_workshops WHERE id=? AND school_id=?',
    id,
    profile.schoolId,
  );
  if (!w || w.code !== code)
    throw new AppError(
      400,
      'That event code did not match. Ask your teacher for the current code.',
    );
  if (
    w.cancelled ||
    Date.now() < Date.parse(String(w.opens_at)) ||
    Date.now() >= Date.parse(String(w.closes_at))
  )
    throw new AppError(409, 'Check-in is outside the teacher’s attendance window.');
  const lat = coordinate(body.latitude, 90),
    lon = coordinate(body.longitude, 180);
  // Accuracy is required but any finite value is accepted; withinAttendanceRange caps its credit.
  const accuracy =
    typeof body.accuracy === 'number' && Number.isFinite(body.accuracy) && body.accuracy >= 0
      ? body.accuracy
      : null;
  if (accuracy === null)
    throw new AppError(400, 'Your location could not be read. Please try checking in again.');
  // Prefer ageMs (measured on the device, immune to clock skew); older clients send a timestamp.
  const age =
    typeof body.ageMs === 'number' && Number.isFinite(body.ageMs)
      ? body.ageMs
      : typeof body.timestamp === 'number' && Number.isFinite(body.timestamp)
        ? Math.abs(Date.now() - body.timestamp)
        : NaN;
  if (!(age >= 0 && age <= ATTENDANCE_LOCATION_MAX_AGE_MS))
    throw new AppError(400, 'Your location has expired. Please try checking in again.');
  const distance = distanceMeters(lat, lon, Number(w.latitude), Number(w.longitude));
  if (!withinAttendanceRange(distance, accuracy)) {
    // Report what the device measured so students and teachers can see how far off it was.
    const miles = (m: number) => (m / 1609.344).toFixed(1);
    throw new AppError(
      403,
      `We could not confirm you are within 0.5 mile of the event. Your device placed you about ${miles(distance)} miles away (accuracy ±${miles(accuracy)} miles). Make sure location is on, then try again, or ask your teacher to check the event pin.`,
    );
  }
  // Recheck time, code, cancellation and membership in the same atomic statement as the insert.
  const now = new Date().toISOString();
  const result = await db.batch(
    [
      {
        sql: `INSERT OR IGNORE INTO attendance_records (workshop_id,student_id,checked_in_at,distance_meters,accuracy_meters)
      SELECT w.id,?,?,?,? FROM attendance_workshops w JOIN attendance_audience a ON a.workshop_id=w.id AND a.student_id=?
      WHERE w.id=? AND w.school_id=? AND w.code=? AND w.cancelled=0 AND w.opens_at<=? AND w.closes_at>?`,
        args: [
          profile.id,
          now,
          distance,
          accuracy,
          profile.id,
          id,
          profile.schoolId,
          code,
          now,
          now,
        ],
      },
    ],
    'immediate',
  );
  const record = await db.get(
    'SELECT checked_in_at FROM attendance_records WHERE workshop_id=? AND student_id=?',
    id,
    profile.id,
  );
  if (!record)
    throw new AppError(
      409,
      'This event is unavailable or you are not on its roster. Ask your teacher.',
    );
  return { checkedInAt: String(record.checked_in_at), alreadyRecorded: !result[0]?.rowsAffected };
}
export async function attendanceFor(db: Database, profile: Profile): Promise<AttendanceData> {
  const instructor = profile.role === 'instructor';
  const rows = await db.all(
    `SELECT w.id,w.title,w.opens_at,w.closes_at,w.timezone,w.location_name,w.latitude,w.longitude,w.cancelled${instructor ? ',w.code' : ''},
    (SELECT COUNT(*) FROM attendance_audience a WHERE a.workshop_id=w.id) AS expected,
    (SELECT COUNT(*) FROM attendance_records r WHERE r.workshop_id=w.id) AS present,
    (SELECT checked_in_at FROM attendance_records r WHERE r.workshop_id=w.id AND r.student_id=?) AS checked_in_at
    FROM attendance_workshops w WHERE w.school_id=? ${instructor ? '' : 'AND EXISTS (SELECT 1 FROM attendance_audience a WHERE a.workshop_id=w.id AND a.student_id=?)'} ORDER BY w.opens_at DESC`,
    profile.id,
    profile.schoolId,
    ...(instructor ? [] : [profile.id]),
  );
  const workshops: Workshop[] = rows.map((w) => ({
    id: String(w.id),
    title: String(w.title),
    opensAt: String(w.opens_at),
    closesAt: String(w.closes_at),
    timezone: String(w.timezone),
    locationName: String(w.location_name),
    latitude: Number(w.latitude),
    longitude: Number(w.longitude),
    cancelled: !!w.cancelled,
    ...(instructor ? { code: String(w.code) } : {}),
    expected: Number(w.expected),
    present: instructor ? Number(w.present) : w.checked_in_at ? 1 : 0,
    checkedInAt: w.checked_in_at ? String(w.checked_in_at) : null,
  }));
  if (!instructor)
    return { workshops, members: [], records: [], serverTime: new Date().toISOString() };
  const audience = await db.all(
    'SELECT a.workshop_id,a.student_id FROM attendance_audience a JOIN attendance_workshops w ON w.id=a.workshop_id WHERE w.school_id=?',
    profile.schoolId,
  );
  for (const w of workshops)
    w.audienceIds = audience.filter((a) => a.workshop_id === w.id).map((a) => String(a.student_id));
  const now = new Date().toISOString();
  const members = await db.all(
    `SELECT u.id,u.display_name,u.role,p.last_seen,
    (SELECT COUNT(*) FROM attendance_audience a JOIN attendance_workshops w ON w.id=a.workshop_id WHERE a.student_id=u.id AND w.school_id=u.school_id AND w.cancelled=0 AND w.closes_at<=?) AS expected,
    (SELECT COUNT(*) FROM attendance_records r JOIN attendance_workshops w ON w.id=r.workshop_id WHERE r.student_id=u.id AND w.school_id=u.school_id AND w.cancelled=0 AND w.closes_at<=?) AS attended
    FROM users u LEFT JOIN member_presence p ON p.user_id=u.id WHERE u.school_id=? AND NOT EXISTS (SELECT 1 FROM departed_members d WHERE d.user_id=u.id) ORDER BY u.display_name,u.id`,
    now,
    now,
    profile.schoolId,
  );
  const records = await db.all(
    'SELECT r.workshop_id,r.student_id,r.checked_in_at,r.accuracy_meters FROM attendance_records r JOIN attendance_workshops w ON w.id=r.workshop_id WHERE w.school_id=?',
    profile.schoolId,
  );
  return {
    workshops,
    members: members.map((m) => ({
      id: String(m.id),
      name: String(m.display_name || 'Community member'),
      role: String(m.role),
      online: Number(m.last_seen) > Date.now() - 90000,
      attended: Number(m.attended),
      expected: Number(m.expected),
      rate: Number(m.expected) ? Math.round((Number(m.attended) / Number(m.expected)) * 100) : null,
    })),
    records: records.map((r) => ({
      workshopId: String(r.workshop_id),
      studentId: String(r.student_id),
      checkedInAt: String(r.checked_in_at),
      markedByTeacher: Number(r.accuracy_meters) === TEACHER_MARK_ACCURACY,
    })),
    serverTime: now,
  };
}
