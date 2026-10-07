import { memberFor, json, failure } from '@/lib/api';
import { dashboardFor } from '@/lib/school-service';
export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request);
    return json(await dashboardFor(db, profile));
  } catch (error) {
    return failure(error);
  }
}
