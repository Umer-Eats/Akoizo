import { memberFor, json, failure } from '@/lib/api';
import { AppError, isDivision } from '@/lib/domain';
import { eventsForDivision } from '@/lib/events';
import { findPracticeTest } from '@/lib/practice-catalog';
import { createAssignment, removeAssignment } from '@/lib/school-service';
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'instructor');
    const body = await request.json();
    if (!body || typeof body !== 'object') throw new AppError(400, 'Enter assignment details.');
    const payload = body as Record<string, unknown>;
    if (
      typeof payload.testId === 'string' &&
      payload.testId.trim() &&
      typeof payload.eventId === 'string'
    ) {
      const divisions: ('A' | 'B' | 'C')[] = isDivision(payload.division)
        ? [payload.division]
        : ['A', 'B', 'C'];
      let matched = false;
      for (const division of divisions) {
        if (!eventsForDivision(division).some((event) => event.id === payload.eventId)) continue;
        try {
          const test = findPracticeTest(division, payload.testId.trim());
          if (test.eventId === payload.eventId) {
            matched = true;
            break;
          }
        } catch {
          continue;
        }
      }
      if (!matched) throw new AppError(400, 'That converted test is not in this event.');
    }
    return json(await createAssignment(db, profile, payload), 201);
  } catch (error) {
    return failure(error);
  }
}
export async function DELETE(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'instructor');
    const id = new URL(request.url).searchParams.get('id');
    if (!id) throw new AppError(400, 'Choose an assignment.');
    await removeAssignment(db, profile, id);
    return json({ removed: true });
  } catch (error) {
    return failure(error);
  }
}
