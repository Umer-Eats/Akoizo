import { memberFor, json, failure } from '@/lib/api';
import { schoolAnalytics } from '@/lib/analytics-service';

export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'instructor');
    return json(await schoolAnalytics(db, profile));
  } catch (error) {
    return failure(error);
  }
}
