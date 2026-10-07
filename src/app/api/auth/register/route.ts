import { identityFor, json, failure } from '@/lib/api';
import { getDb, initializeDatabase } from '@/lib/db';
import { AppError, readEnrollment } from '@/lib/domain';
import { limitEnrollment, registerMember } from '@/lib/school-service';
export async function POST(request: Request) {
  try {
    const identity = await identityFor(request);
    if (!identity.email) throw new AppError(400, 'Use an account with an email address.');
    const data = readEnrollment(await request.json());
    await initializeDatabase();
    const db = getDb();
    await limitEnrollment(db, `uid:${identity.uid}`);
    return json(
      await registerMember(
        db,
        { uid: identity.uid, email: identity.email },
        data,
        process.env.INSTRUCTOR_INVITE_PASSWORD,
      ),
    );
  } catch (error) {
    return failure(error);
  }
}
