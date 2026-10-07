import { randomBytes, randomUUID, createHash } from 'node:crypto';
import {
  AppError,
  eventKey,
  dateInZone,
  isDivision,
  requireSchoolStudent,
  validateAssignment,
  type Profile,
  type Enrollment,
  type Role,
  type DashboardData,
  type Stats,
  type Student,
  type Assignment,
} from './domain.ts';
import { type Division } from './events.ts';
import {
  equalSecret,
  hashSchoolPassword,
  makeSchoolPassword,
  schoolIdFromPassword,
  verifySchoolPassword,
} from './school-password.ts';

type Row = Record<string, string | number | null>;
export type Database = {
  get: (sql: string, ...args: (string | number | null)[]) => Promise<Row | undefined>;
  all: (sql: string, ...args: (string | number | null)[]) => Promise<Row[]>;
  batch: (
    statements: { sql: string; args: (string | number | null)[] }[],
    mode: string,
  ) => Promise<{ rowsAffected: number; rows: Row[] }[]>;
};
const profileColumns =
  'u.id, u.role, u.display_name, u.school_id, u.division, s.name AS school_name';
function asProfile(row: Row): Profile {
  return {
    id: String(row.id),
    role: row.role as Role,
    displayName: String(row.display_name || 'Learner'),
    schoolId: String(row.school_id),
    schoolName: String(row.school_name),
    division: row.division as Division | null,
  };
}
export async function profileForUid(db: Database, uid: string) {
  const row = await db.get(
    `SELECT ${profileColumns} FROM users u JOIN schools s ON s.id=u.school_id WHERE u.firebase_uid=?`,
    uid,
  );
  return row ? asProfile(row) : null;
}
export async function limitEnrollment(db: Database, identity: string) {
  const now = Date.now();
  const key = createHash('sha256').update(identity).digest('hex');
  const result = await db.batch(
    [
      { sql: 'DELETE FROM enrollment_limits WHERE expires_at < ?', args: [now] },
      {
        sql: 'INSERT INTO enrollment_limits (key,attempts,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET attempts=attempts+1',
        args: [key, now + 15 * 60_000],
      },
      { sql: 'SELECT attempts FROM enrollment_limits WHERE key=?', args: [key] },
    ],
    'immediate',
  );
  if (Number(result[2].rows[0].attempts) > 20)
    throw new AppError(429, 'Too many enrollment attempts. Try again in 15 minutes.');
}
export async function checkEnrollment(db: Database, data: Enrollment, invite: string | undefined) {
  if (data.role === 'instructor') {
    if (!invite) throw new AppError(503, 'Instructor registration is not configured yet.');
    if (!equalSecret(data.instructorInvitePassword || '', invite))
      throw new AppError(403, 'The instructor invitation password is incorrect.');
    return null;
  }
  const password = data.schoolPassword?.trim() || '';
  const id = schoolIdFromPassword(password);
  const school = id
    ? await db.get('SELECT id,name,password_hash FROM schools WHERE id=?', id)
    : undefined;
  if (!school || !verifySchoolPassword(password, String(school.password_hash)))
    throw new AppError(
      403,
      'The school password is incorrect. Ask your instructor for the current password.',
    );
  return school;
}
export async function registerMember(
  db: Database,
  identity: { uid: string; email: string },
  data: Enrollment,
  invite: string | undefined,
) {
  const existing = await profileForUid(db, identity.uid);
  if (existing) {
    if (existing.role !== data.role)
      throw new AppError(
        409,
        `This account is already registered as an ${existing.role}. Use that login instead.`,
      );
    return { profile: existing };
  }
  const school = await checkEnrollment(db, data, invite);
  const id = randomUUID();
  if (data.role === 'instructor') {
    const schoolId = randomUUID();
    const schoolName = `School-${randomBytes(5).toString('hex').toUpperCase()}`;
    const joiningPassword = makeSchoolPassword(schoolId);
    await db.batch(
      [
        {
          sql: 'INSERT INTO schools (id,name,password_hash) VALUES (?,?,?)',
          args: [schoolId, schoolName, hashSchoolPassword(joiningPassword)],
        },
        {
          sql: 'INSERT INTO users (id,firebase_uid,email,display_name,role,school_id,division) VALUES (?,?,?,?,?,?,NULL)',
          args: [id, identity.uid, identity.email, data.displayName, 'instructor', schoolId],
        },
      ],
      'immediate',
    );
    return {
      profile: (await profileForUid(db, identity.uid))!,
      credentials: { schoolName, joiningPassword },
    };
  }
  const result = await db.batch(
    [
      {
        sql: `INSERT INTO users (id,firebase_uid,email,display_name,role,school_id,division)
      SELECT ?,?,?,?,'student',id,? FROM schools WHERE id=? AND password_hash=?`,
        args: [
          id,
          identity.uid,
          identity.email,
          data.displayName,
          data.division!,
          String(school!.id),
          String(school!.password_hash),
        ],
      },
    ],
    'immediate',
  );
  if (!result[0].rowsAffected)
    throw new AppError(
      409,
      'The school password changed. Ask your instructor for the new password.',
    );
  return { profile: (await profileForUid(db, identity.uid))! };
}

const statsColumns = `
  (SELECT COUNT(*) FROM lesson_progress l WHERE l.student_id=u.id) AS lessons,
  (SELECT COUNT(*) FROM test_attempts t WHERE t.student_id=u.id AND t.type='Practice') AS practice,
  (SELECT COUNT(*) FROM test_attempts t WHERE t.student_id=u.id AND t.type='Ranked') AS ranked,
  COALESCE((SELECT SUM(p.points) FROM points_ledger p WHERE p.student_id=u.id),0) AS points`;
function asStats(row: Row): Stats {
  return {
    lessons: Number(row.lessons || 0),
    practice: Number(row.practice || 0),
    ranked: Number(row.ranked || 0),
    points: Number(row.points || 0),
  };
}
export async function dashboardFor(db: Database, profile: Profile): Promise<DashboardData> {
  const instructor = profile.role === 'instructor';
  const rows = await db.all(
    `SELECT ${profileColumns}, ${statsColumns} FROM users u JOIN schools s ON s.id=u.school_id
    WHERE u.role='student' AND ${instructor ? 'u.school_id=?' : 'u.id=?'} ORDER BY u.display_name,u.id`,
    instructor ? profile.schoolId : profile.id,
  );
  const students = rows.map((row) => ({ ...asProfile(row), ...asStats(row) })) as Student[];
  const assignments = await db.all(
    `SELECT a.id,a.student_id,u.display_name,a.event_id,e.name,e.division,a.type,a.due_date,a.completed_at
    FROM assignments a JOIN users u ON u.id=a.student_id JOIN events e ON e.id=a.event_id
    WHERE ${instructor ? 'u.school_id=?' : 'u.id=?'} ORDER BY a.completed_at IS NOT NULL,a.due_date,a.created_at DESC`,
    instructor ? profile.schoolId : profile.id,
  );
  const progressRows = await db.all(
    `SELECT u.id AS student_id,e.id AS event_id,e.name,
    (SELECT COUNT(*) FROM lesson_progress l WHERE l.student_id=u.id AND l.event_id=e.id) AS lessons,
    (SELECT COUNT(*) FROM test_attempts t WHERE t.student_id=u.id AND t.event_id=e.id AND t.type='Practice') AS practice,
    (SELECT COUNT(*) FROM test_attempts t WHERE t.student_id=u.id AND t.event_id=e.id AND t.type='Ranked') AS ranked,
    COALESCE((SELECT SUM(p.points) FROM points_ledger p WHERE p.student_id=u.id AND p.event_id=e.id),0) AS points
    FROM users u JOIN events e ON e.division=u.division AND e.season='2027'
    WHERE u.role='student' AND ${instructor ? 'u.school_id=?' : 'u.id=?'} ORDER BY e.name`,
    instructor ? profile.schoolId : profile.id,
  );
  const progress: DashboardData['progress'] = {};
  for (const row of progressRows) {
    (progress[String(row.student_id)] ||= []).push({
      eventId: String(row.event_id).split(':').slice(2).join(':'),
      eventName: String(row.name),
      ...asStats(row),
    });
  }
  return {
    profile,
    students: instructor ? students : [],
    stats: instructor ? { lessons: 0, practice: 0, ranked: 0, points: 0 } : asStats(rows[0] || {}),
    progress,
    assignments: assignments.map((a) => ({
      id: String(a.id),
      studentId: String(a.student_id),
      studentName: String(a.display_name),
      eventId: String(a.event_id).split(':').slice(2).join(':'),
      eventName: String(a.name),
      division: a.division,
      type: a.type,
      due: String(a.due_date),
      completedAt: a.completed_at,
    })) as Assignment[],
  };
}
export async function createAssignment(
  db: Database,
  instructor: Profile,
  body: Record<string, unknown>,
) {
  const row =
    typeof body.studentId === 'string'
      ? await db.get(
          `SELECT ${profileColumns} FROM users u JOIN schools s ON s.id=u.school_id WHERE u.id=?`,
          body.studentId,
        )
      : undefined;
  const student = row ? asProfile(row) : null;
  requireSchoolStudent(instructor, student);
  const division = student!.division!;
  const { eventId, type, due } = validateAssignment(
    division,
    body.eventId,
    body.type,
    body.due,
    dateInZone(typeof body.timeZone === 'string' ? body.timeZone : 'UTC'),
  );
  const id = randomUUID();
  // Recheck school and division at the write boundary, including concurrent division changes.
  const results = await db.batch(
    [
      {
        sql: `INSERT INTO assignments (id,student_id,instructor_id,event_id,type,due_date)
    SELECT ?,u.id,?,?,?,? FROM users u WHERE u.id=? AND u.school_id=? AND u.division=? AND u.role='student'`,
        args: [
          id,
          instructor.id,
          eventKey(division, eventId),
          type,
          due,
          student!.id,
          instructor.schoolId,
          division,
        ],
      },
    ],
    'immediate',
  );
  if (!results[0].rowsAffected)
    throw new AppError(409, 'The student’s division changed. Refresh and try again.');
  return { id };
}
export async function removeAssignment(db: Database, instructor: Profile, id: string) {
  if (instructor.role !== 'instructor') throw new AppError(403, 'Instructor access is required.');
  const result = await db.batch(
    [
      {
        sql: `DELETE FROM assignments WHERE id=? AND completed_at IS NULL
    AND instructor_id=? AND student_id IN (SELECT id FROM users WHERE school_id=?)`,
        args: [id, instructor.id, instructor.schoolId],
      },
    ],
    'immediate',
  );
  if (!result[0].rowsAffected) throw new AppError(404, 'Pending assignment not found.');
}
export async function updateDivision(db: Database, profile: Profile, division: unknown) {
  if (profile.role !== 'student') throw new AppError(403, 'Only students can choose a division.');
  if (!isDivision(division)) throw new AppError(400, 'Choose Division A, B, or C.');
  await db.batch(
    [
      {
        sql: 'UPDATE users SET division=? WHERE id=? AND school_id=?',
        args: [division, profile.id, profile.schoolId],
      },
    ],
    'immediate',
  );
  return { ...profile, division };
}
export async function rotateSchoolPassword(db: Database, instructor: Profile) {
  if (instructor.role !== 'instructor') throw new AppError(403, 'Instructor access is required.');
  const joiningPassword = makeSchoolPassword(instructor.schoolId);
  await db.batch(
    [
      {
        sql: 'UPDATE schools SET password_hash=? WHERE id=?',
        args: [hashSchoolPassword(joiningPassword), instructor.schoolId],
      },
    ],
    'immediate',
  );
  return { schoolName: instructor.schoolName, joiningPassword };
}
