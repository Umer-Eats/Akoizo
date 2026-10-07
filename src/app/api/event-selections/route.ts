import { memberFor, json, failure } from '@/lib/api';
import { AppError, isDivision } from '@/lib/domain';
import { selectedEvents, selectEvent } from '@/lib/event-selections';

export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'student');
    const division = new URL(request.url).searchParams.get('division');
    if (!isDivision(division)) throw new AppError(400, 'Choose a valid division.');
    return json(await selectedEvents(db, profile, division));
  } catch (error) {
    return failure(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'student');
    return json(await selectEvent(db, profile, (await request.json()) ?? {}));
  } catch (error) {
    return failure(error);
  }
}
