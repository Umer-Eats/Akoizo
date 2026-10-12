import { AppError, type Profile, type Role } from './domain.ts';
import type { Division } from './events.ts';
import type { Database } from './school-service.ts';
import type { CommunityData } from './community.ts';
import { communityAnalytics } from './analytics-service.ts';

/** No caller-selected school, credentials, contact details, or mutation operations. */
export async function communityFor(db: Database, member: Profile): Promise<CommunityData> {
  const current = await db.get(
    `SELECT u.id FROM users u WHERE u.id=? AND u.school_id=?
     AND NOT EXISTS (SELECT 1 FROM departed_members d WHERE d.user_id=u.id)
     AND NOT EXISTS (SELECT 1 FROM closed_communities c WHERE c.school_id=u.school_id)`,
    member.id,
    member.schoolId,
  );
  if (!current) throw new AppError(403, 'Active community membership is required.');
  const rows = await db.all(
    `SELECT u.id,u.display_name,u.role,u.division FROM users u WHERE u.school_id=?
     AND NOT EXISTS (SELECT 1 FROM departed_members d WHERE d.user_id=u.id)
     ORDER BY u.display_name,u.id`,
    member.schoolId,
  );
  return {
    name: member.schoolCommunityName || member.schoolName,
    analytics: await communityAnalytics(db, member),
    members: rows.map((row) => ({
      id: String(row.id),
      name: String(row.display_name || 'Learner'),
      role: row.role as Role,
      division: row.division as Division | null,
    })),
    updatedAt: new Date().toISOString(),
  };
}
