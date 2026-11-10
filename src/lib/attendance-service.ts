import { randomBytes, randomUUID } from 'node:crypto';
import { AppError, type Profile } from './domain.ts';
import type { Database } from './school-service.ts';
import {
  ATTENDANCE_RADIUS_METERS,
  distanceMeters,
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
function teacher(profile: Profile) {
  if (profile.role !== 'instructor') throw new AppError(403, 'Only teachers can manage workshops.');
}
export async function createWorkshop(
  db: Database,
  profile: Profile,
  body: Record<string, unknown>,
) {
  teacher(profile);
  const title = text(body.title, 100, 'workshop title');
  const location = text(body.locationName, 500, 'location name');
  const lat = coordinate(body.latitude, 90),
    lon = coordinate(body.longitude, 180);
  const opens = Date.parse(text(body.opensAt, 40, 'opening time')),
    closes = Date.parse(text(body.closesAt, 40, 'closing time'));
  if (
    !Number.isFinite(opens) ||
    !Number.isFinite(closes) ||
    closes <= opens ||
    closes <= Date.now() ||
    closes - opens > 86400000
  )
    throw new AppError(400, 'Choose a future closing time after opening, within 24 hours.');
  const timezone = text(body.timezone, 100, 'time zone');
  try {
    new Intl.DateTimeFormat('en', { timeZone: timezone }).format();
  } catch {
    throw new AppError(400, 'Choose a valid time zone.');
  }
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
          new Date(opens).toISOString(),
          new Date(closes).toISOString(),
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
  const id = text(body.id, 100, 'workshop');
  if (body.action !== 'cancel' && body.action !== 'rotate')
    throw new AppError(400, 'Choose a workshop action.');
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
    throw new AppError(404, 'Active workshop not found in your community.');
  return { ok: true };
}
export async function checkIn(db: Database, profile: Profile, body: Record<string, unknown>) {
  if (profile.role !== 'student') throw new AppError(403, 'Only students can check in.');
  await attendanceLimit(db, profile.id, 12);
  const id = text(body.workshopId, 100, 'workshop');
  const code = text(body.code, 16, 'attendance code').toUpperCase();
  const w = await db.get(
    'SELECT * FROM attendance_workshops WHERE id=? AND school_id=?',
    id,
    profile.schoolId,
  );
  if (!w || w.code !== code)
    throw new AppError(
      400,
      'That workshop code did not match. Ask your teacher for the current code.',
    );
  if (
    w.cancelled ||
    Date.now() < Date.parse(String(w.opens_at)) ||
    Date.now() >= Date.parse(String(w.closes_at))
  )
    throw new AppError(409, 'Check-in is outside the teacher’s attendance window.');
  const lat = coordinate(body.latitude, 90),
    lon = coordinate(body.longitude, 180);
  if (
    typeof body.accuracy !== 'number' ||
    !Number.isFinite(body.accuracy) ||
    body.accuracy < 0 ||
    body.accuracy > 200
  )
    throw new AppError(
      400,
      'Your location is too approximate. Enable precise location and try again.',
    );
  if (
    typeof body.timestamp !== 'number' ||
    !Number.isFinite(body.timestamp) ||
    Math.abs(Date.now() - body.timestamp) > 60000
  )
    throw new AppError(400, 'Your location has expired. Please try checking in again.');
  const distance = distanceMeters(lat, lon, Number(w.latitude), Number(w.longitude));
  if (distance + body.accuracy > ATTENDANCE_RADIUS_METERS)
    throw new AppError(
      403,
      'We could not confirm you are within 0.5 mile of the workshop. Move closer or enable precise location and try again.',
    );
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
          body.accuracy,
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
      'This workshop is unavailable or you are not on its roster. Ask your teacher.',
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
    'SELECT r.workshop_id,r.student_id,r.checked_in_at FROM attendance_records r JOIN attendance_workshops w ON w.id=r.workshop_id WHERE w.school_id=?',
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
    })),
    serverTime: now,
  };
}
