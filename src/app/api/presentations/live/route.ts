import { failure, json, memberFor } from '@/lib/api';
import { sessionState } from '@/lib/presentation-service';

/** One poll of a live presentation the member hosts or joined. */
export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'learner');
    return json(await sessionState(db, profile, new URL(request.url).searchParams.get('id')));
  } catch (error) {
    return failure(error);
  }
}
