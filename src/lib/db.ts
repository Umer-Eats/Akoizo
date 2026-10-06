import { connect } from '@tursodatabase/serverless';

let db: ReturnType<typeof connect> | null = null;

export function getDb() {
  if (!db) {
    const url = process.env.TURSO_DATABASE_URL;
    const token = process.env.TURSO_AUTH_TOKEN;
    
    if (!url || !token) {
      throw new Error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set');
    }
    
    db = connect({ url, authToken: token });
  }
  
  return db;
}

export async function initializeDatabase() {
  const db = getDb();
  
  await db.batch([
    `CREATE TABLE IF NOT EXISTS schools (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      firebase_uid TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL,
      display_name TEXT,
      role TEXT NOT NULL CHECK (role IN ('student', 'instructor')),
      school_id TEXT REFERENCES schools(id),
      division TEXT CHECK (division IN ('A', 'B', 'C')),
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    
    `CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      division TEXT NOT NULL CHECK (division IN ('A', 'B', 'C')),
      category TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('Study', 'Build', 'Lab')),
      season TEXT NOT NULL
    )`,
    
    `CREATE TABLE IF NOT EXISTS assignments (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL REFERENCES users(id),
      instructor_id TEXT NOT NULL REFERENCES users(id),
      event_id TEXT NOT NULL REFERENCES events(id),
      type TEXT NOT NULL CHECK (type IN ('Practice', 'Ranked')),
      due_date TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      completed_at TEXT
    )`,
    
    `CREATE TABLE IF NOT EXISTS test_attempts (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL REFERENCES users(id),
      event_id TEXT NOT NULL REFERENCES events(id),
      type TEXT NOT NULL CHECK (type IN ('Practice', 'Ranked')),
      score INTEGER NOT NULL,
      max_score INTEGER NOT NULL,
      points_awarded INTEGER NOT NULL DEFAULT 0,
      started_at TEXT NOT NULL,
      completed_at TEXT NOT NULL
    )`,
    
    `CREATE TABLE IF NOT EXISTS points_ledger (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL REFERENCES users(id),
      event_id TEXT REFERENCES events(id),
      test_attempt_id TEXT REFERENCES test_attempts(id),
      points INTEGER NOT NULL,
      reason TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    
    `CREATE INDEX IF NOT EXISTS idx_users_school ON users(school_id)`,
    `CREATE INDEX IF NOT EXISTS idx_assignments_student ON assignments(student_id)`,
    `CREATE INDEX IF NOT EXISTS idx_test_attempts_student ON test_attempts(student_id)`,
    `CREATE INDEX IF NOT EXISTS idx_points_ledger_student ON points_ledger(student_id)`,
  ]);
}