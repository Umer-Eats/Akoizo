import { eventsForDivision } from './events.ts';
import { eventKey } from './domain.ts';
import { schoolCommunities } from './school-communities.ts';

export const schema = [
  `CREATE TABLE IF NOT EXISTS departed_members (user_id TEXT PRIMARY KEY, departed_at TEXT NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS closed_communities (school_id TEXT PRIMARY KEY, closed_at TEXT NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS schools (id TEXT PRIMARY KEY, name TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS school_communities (
    school_id TEXT PRIMARY KEY REFERENCES schools(id) ON DELETE CASCADE,
    community_id TEXT NOT NULL CHECK(community_id IN (${schoolCommunities.map((community) => `'${community.id}'`).join(',')})))`,
  `CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, firebase_uid TEXT NOT NULL UNIQUE, email TEXT NOT NULL,
    display_name TEXT, role TEXT NOT NULL CHECK(role IN ('student','instructor')),
    school_id TEXT NOT NULL REFERENCES schools(id), division TEXT CHECK(division IN ('A','B','C')),
    created_at TEXT NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS events (id TEXT PRIMARY KEY, name TEXT NOT NULL, division TEXT NOT NULL CHECK(division IN ('A','B','C')),
    category TEXT NOT NULL, type TEXT NOT NULL, season TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS assignments (id TEXT PRIMARY KEY, student_id TEXT NOT NULL REFERENCES users(id),
    instructor_id TEXT NOT NULL REFERENCES users(id), event_id TEXT NOT NULL REFERENCES events(id),
    type TEXT NOT NULL CHECK(type IN ('Practice','Ranked')), due_date TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')), completed_at TEXT)`,
  `CREATE TABLE IF NOT EXISTS test_attempts (id TEXT PRIMARY KEY, student_id TEXT NOT NULL REFERENCES users(id), event_id TEXT NOT NULL REFERENCES events(id),
    type TEXT NOT NULL CHECK(type IN ('Practice','Ranked')), score INTEGER NOT NULL, max_score INTEGER NOT NULL,
    points_awarded INTEGER NOT NULL DEFAULT 0, started_at TEXT NOT NULL, completed_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS points_ledger (id TEXT PRIMARY KEY, student_id TEXT NOT NULL REFERENCES users(id), event_id TEXT REFERENCES events(id),
    test_attempt_id TEXT REFERENCES test_attempts(id), points INTEGER NOT NULL, reason TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS practice_submissions (
    id TEXT PRIMARY KEY REFERENCES test_attempts(id), student_id TEXT NOT NULL REFERENCES users(id),
    test_id TEXT NOT NULL, result_json TEXT NOT NULL, created_at TEXT NOT NULL)`,
  'CREATE INDEX IF NOT EXISTS idx_practice_student_test ON practice_submissions(student_id,test_id,created_at)',
  `CREATE TABLE IF NOT EXISTS lesson_progress (student_id TEXT NOT NULL REFERENCES users(id), event_id TEXT NOT NULL REFERENCES events(id),
    lesson_id TEXT NOT NULL, completed_at TEXT NOT NULL, PRIMARY KEY(student_id, event_id, lesson_id))`,
  `CREATE TABLE IF NOT EXISTS event_selections (student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    division TEXT NOT NULL CHECK(division IN ('A','B','C')), event_id TEXT NOT NULL REFERENCES events(id),
    PRIMARY KEY(student_id, division, event_id))`,
  `CREATE TABLE IF NOT EXISTS enrollment_limits (key TEXT PRIMARY KEY, attempts INTEGER NOT NULL, expires_at INTEGER NOT NULL)`,
  'CREATE INDEX IF NOT EXISTS idx_users_school ON users(school_id)',
  'CREATE INDEX IF NOT EXISTS idx_assignments_student ON assignments(student_id)',
  'CREATE INDEX IF NOT EXISTS idx_test_attempts_student ON test_attempts(student_id)',
  'CREATE INDEX IF NOT EXISTS idx_points_ledger_student ON points_ledger(student_id)',
  'CREATE UNIQUE INDEX IF NOT EXISTS idx_pending_assignment ON assignments(student_id,event_id,type,due_date) WHERE completed_at IS NULL',
];
export const eventSeeds = (['A', 'B', 'C'] as const).flatMap((division) =>
  eventsForDivision(division).map((event) => ({
    sql: 'INSERT OR IGNORE INTO events (id,name,division,category,type,season) VALUES (?,?,?,?,?,?)',
    args: [eventKey(division, event.id), event.name, division, event.category, event.type, '2027'],
  })),
);
