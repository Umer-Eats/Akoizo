import { memberFor, json, failure } from '@/lib/api';
import { studentRankedProfile } from '@/lib/student-profile-service';
export async function GET(request: Request, context: { params: Promise<{ studentId: string }> }) {
  try {
    const { db, profile } = await memberFor(request);
    const { studentId } = await context.params;
    return json(await studentRankedProfile(db, profile, studentId));
  } catch (error) {
    return failure(error);
  }
}
