import { json, failure } from '@/lib/api';
import { getDb, initializeDatabase } from '@/lib/db';
import { readEnrollment } from '@/lib/domain';
import { checkEnrollment, limitEnrollment } from '@/lib/school-service';
export async function POST(request: Request) {
  try {
    const data = readEnrollment(await request.json());
    await initializeDatabase();
    const db = getDb();
    // Vercel overwrites this header; never trust arbitrary x-forwarded-for values.
    const ip = process.env.VERCEL
      ? request.headers.get('x-vercel-forwarded-for') || 'unknown'
      : 'local';
    await limitEnrollment(db, `preflight:${ip}`);
    await checkEnrollment(db, data, process.env.INSTRUCTOR_INVITE_PASSWORD);
    return json({ valid: true });
  } catch (error) {
    return failure(error);
  }
}
