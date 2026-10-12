import { json, failure } from '@/lib/api';
import { getDb, initializeDatabase } from '@/lib/db';
import { publicRankings } from '@/lib/school-service';
export async function GET() {
  try {
    await initializeDatabase();
    return json(await publicRankings(getDb()));
  } catch (error) {
    return failure(error);
  }
}
