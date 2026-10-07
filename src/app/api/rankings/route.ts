import { json, failure } from '@/lib/api';
import { getDb, initializeDatabase } from '@/lib/db';
export async function GET() {
  try {
    await initializeDatabase();
    const rows = await getDb().all(`SELECT u.id,u.division,s.name AS school,SUM(p.points) AS points
      FROM users u JOIN schools s ON s.id=u.school_id JOIN points_ledger p ON p.student_id=u.id
      WHERE u.role='student' GROUP BY u.id,u.division,s.name HAVING SUM(p.points)>0
      ORDER BY points DESC,u.id LIMIT 500`);
    return json(
      rows.map((row: { id: string; division: string; school: string; points: number }) => ({
        id: row.id,
        handle: `Learner-${row.id.slice(0, 8)}`,
        division: row.division,
        school: row.school,
        points: Number(row.points),
      })),
    );
  } catch (error) {
    return failure(error);
  }
}
