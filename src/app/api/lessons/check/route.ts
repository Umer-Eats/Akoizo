import { failure, json, memberFor } from '@/lib/api';
import { AppError } from '@/lib/domain';
import { checkLessonAnswer, resetCheckpoint } from '@/lib/lesson-checkpoint-service';

export const maxDuration = 30;

async function bodyOf(request: Request) {
  const raw = await request.text();
  if (raw.length > 10_000) throw new AppError(413, 'The request is too large.');
  const body = JSON.parse(raw || '{}');
  if (!body || typeof body !== 'object' || Array.isArray(body))
    throw new AppError(400, 'Choose a lesson question.');
  return body as Record<string, unknown>;
}

/** Check one checkpoint answer as the student goes. */
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'student');
    return json(await checkLessonAnswer(db, profile, await bodyOf(request)));
  } catch (error) {
    return failure(error);
  }
}

/** Retake a lesson's checkpoint: clears its checked answers. */
export async function DELETE(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'student');
    return json(await resetCheckpoint(db, profile, await bodyOf(request)));
  } catch (error) {
    return failure(error);
  }
}
