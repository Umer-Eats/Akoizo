import { schoolCommunities } from './school-communities.ts';
import { campusPassword, hashSchoolPassword } from './school-password.ts';
import type { Database } from './school-service.ts';

export async function migrateHighSchoolPassword(db: Database) {
  const migration = 'ppchs-password-v2';
  if (await db.get('SELECT id FROM app_migrations WHERE id=?', migration)) return;
  await db.batch(
    [
      {
        sql: `UPDATE schools SET password_hash=? WHERE id IN (
          SELECT school_id FROM school_communities WHERE community_id='ppchs')
          AND id NOT IN (SELECT school_id FROM closed_communities)
          AND NOT EXISTS (SELECT 1 FROM app_migrations WHERE id=?)`,
        args: [hashSchoolPassword(campusPassword('ppchs')!), migration],
      },
      { sql: 'INSERT OR IGNORE INTO app_migrations (id) VALUES (?)', args: [migration] },
    ],
    'immediate',
  );
}

/** Merge active instructor groups once, keeping IDs, assignments and learning records intact. */
export async function migrateCampusRosters(db: Database) {
  const migration = 'shared-campus-rosters-v1';
  if (await db.get('SELECT id FROM app_migrations WHERE id=?', migration)) return;
  const statements: Parameters<Database['batch']>[0] = [];
  for (const campus of schoolCommunities) {
    const active = `SELECT s.id FROM schools s JOIN school_communities sc ON sc.school_id=s.id
      WHERE sc.community_id=? AND s.id NOT IN (SELECT school_id FROM closed_communities)`;
    const canonical = `${active} ORDER BY s.created_at,s.id LIMIT 1`;
    const pending = 'NOT EXISTS (SELECT 1 FROM app_migrations WHERE id=?)';
    statements.push(
      {
        sql: `UPDATE users SET school_id=(${canonical}) WHERE school_id IN (${active}) AND ${pending}`,
        args: [campus.id, campus.id, migration],
      },
      {
        sql: `UPDATE schools SET password_hash=? WHERE id=(${canonical}) AND ${pending}`,
        args: [hashSchoolPassword(campusPassword(campus.id)!), campus.id, migration],
      },
      {
        sql: `INSERT OR IGNORE INTO closed_communities (school_id)
          SELECT id FROM schools WHERE id IN (${active}) AND id<>(${canonical}) AND ${pending}`,
        args: [campus.id, campus.id, migration],
      },
    );
  }
  statements.push({
    sql: 'INSERT OR IGNORE INTO app_migrations (id) VALUES (?)',
    args: [migration],
  });
  await db.batch(statements, 'immediate');
}
