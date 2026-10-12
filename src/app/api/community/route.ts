import { memberFor, json, failure } from '@/lib/api';
import { communityFor } from '@/lib/community-service';

export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request);
    return json(await communityFor(db, profile));
  } catch (error) {
    return failure(error);
  }
}
