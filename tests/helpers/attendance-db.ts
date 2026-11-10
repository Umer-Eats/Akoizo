import { DatabaseSync } from 'node:sqlite';
import { schema } from '../../src/lib/schema.ts';
import type { Database } from '../../src/lib/school-service.ts';
import type { Profile } from '../../src/lib/domain.ts';

export function attendanceFixture() {
  const raw = new DatabaseSync(':memory:');
  raw.exec('PRAGMA foreign_keys=ON');
  for (const sql of schema) raw.exec(sql);
  raw.exec(`INSERT INTO schools (id,name,password_hash) VALUES ('school','School','test'),('other','Other','test');
    INSERT INTO users (id,firebase_uid,email,display_name,role,school_id) VALUES
    ('teacher','teacher','teacher@example.test','Jordan Rivera','instructor','school'),
    ('student','student','student@example.test','Ada Chen','student','school'),
    ('absent','absent','absent@example.test','Sam Patel','student','school'),
    ('outsider','outsider','outsider@example.test','Other Student','student','other');`);
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
        const results = statements.map(({ sql, args }) => {
          const statement = raw.prepare(sql);
          if (statement.columns().length)
            return {
              rowsAffected: 0,
              rows: statement.all(...args) as Awaited<ReturnType<Database['all']>>,
            };
          return { rowsAffected: Number(statement.run(...args).changes), rows: [] };
        });
        raw.exec('COMMIT');
        return results;
      } catch (e) {
        raw.exec('ROLLBACK');
        throw e;
      }
    },
  };
  const student: Profile = {
    id: 'student',
    role: 'student',
    displayName: 'Ada Chen',
    schoolId: 'school',
    schoolName: 'School',
    schoolCommunityId: null,
    schoolCommunityName: null,
    division: 'C',
  };
  return {
    raw,
    db,
    student,
    teacher: {
      ...student,
      id: 'teacher',
      role: 'instructor',
      displayName: 'Jordan Rivera',
    } as Profile,
    outsider: { ...student, id: 'outsider', schoolId: 'other' },
  };
}
export const workshopInput = () => ({
  title: 'Build lab',
  opensAt: new Date(Date.now() - 60000).toISOString(),
  closesAt: new Date(Date.now() + 3600000).toISOString(),
  timezone: 'America/New_York',
  locationName: 'School science building',
  latitude: 26,
  longitude: -80,
});
