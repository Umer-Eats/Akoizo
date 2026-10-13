import { memberFor, json, failure } from '@/lib/api';
import { studentDirectory } from '@/lib/student-profile-service';
export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request);
    return json(await studentDirectory(db, profile, new URL(request.url).searchParams));
  } catch (error) {
    return failure(error);
  }
}
