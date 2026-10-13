import { json, failure } from '@/lib/api';
import { getDb, initializeDatabase } from '@/lib/db';
import { publicRankings } from '@/lib/school-service';
import { publicStudentRanks } from '@/lib/student-profile-service';
export async function GET() {
  try {
    await initializeDatabase();
    const db = getDb();
    const [data, ranks] = await Promise.all([publicRankings(db), publicStudentRanks(db)]);
    return json({
      ...data,
      rankings: data.rankings.map((student) => ({
        ...student,
        competitiveRank: ranks[student.id],
      })),
    });
  } catch (error) {
    return failure(error);
  }
}
