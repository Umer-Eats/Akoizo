import { failure, json, memberFor } from '@/lib/api';
import { AppError } from '@/lib/domain';
import { lessonProgress, recordLessonPart } from '@/lib/lesson-checkpoint-service';

/** The student's checked checkpoint answers and finished lesson stages for one event. */
export async function GET(request: Request) {
  try {
    const { db, profile, preview } = await memberFor(request, 'learner');
    // An instructor previewing lessons keeps progress only in their own browser.
    if (preview) return json({ answers: [], parts: [] });
    return json(
      await lessonProgress(db, profile, new URL(request.url).searchParams.get('eventId')),
    );
  } catch (error) {
    return failure(error);
  }
}

/** Record a finished lesson stage (reading, practice or labs) with its accuracy if graded. */
export async function POST(request: Request) {
  try {
    const { db, profile, preview } = await memberFor(request, 'learner');
    const raw = await request.text();
    if (raw.length > 2000) throw new AppError(413, 'The request is too large.');
    const body = JSON.parse(raw || '{}');
    if (!body || typeof body !== 'object' || Array.isArray(body))
      throw new AppError(400, 'Choose a lesson stage.');
    if (preview) return json({ recorded: body.part });
    return json(await recordLessonPart(db, profile, body));
  } catch (error) {
    return failure(error);
  }
}
