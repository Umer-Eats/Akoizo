import { memberFor, json, failure } from '@/lib/api';
import { limitEnrollment, rotateSchoolPassword } from '@/lib/school-service';
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'instructor');
    await limitEnrollment(db, `rotate:${profile.id}`);
    return json(await rotateSchoolPassword(db, profile));
  } catch (error) {
    return failure(error);
  }
}
