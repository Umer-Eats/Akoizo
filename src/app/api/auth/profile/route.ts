import { identityFor, memberFor, json, failure } from '@/lib/api';
import { getDb, initializeDatabase } from '@/lib/db';
import { profileForUid, updateDivision } from '@/lib/school-service';
export async function GET(request: Request) {
  try {
    const identity = await identityFor(request);
    await initializeDatabase();
    const profile = await profileForUid(getDb(), identity.uid);
    return profile
      ? json(profile)
      : json({ error: 'Finish your school enrollment to continue.' }, 404);
  } catch (error) {
    return failure(error);
  }
}
export async function PATCH(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'student');
    const body = await request.json();
    return json(await updateDivision(db, profile, body?.division));
  } catch (error) {
    return failure(error);
  }
}
