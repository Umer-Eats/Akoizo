import { failure, json, memberFor } from '@/lib/api';
import { AppError } from '@/lib/domain';
import {
  checkLessonAnswer,
  previewLessonAnswer,
  resetCheckpoint,
  saveCheckpointDraft,
} from '@/lib/lesson-checkpoint-service';

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
    const { db, profile, preview } = await memberFor(request, 'learner');
    const body = await bodyOf(request);
    // Instructors previewing a lesson get the same marking, but nothing is recorded.
    if (preview) return json(await previewLessonAnswer(profile, body));
    return json(await checkLessonAnswer(db, profile, body));
  } catch (error) {
    return failure(error);
  }
}

/** Save an answer the student has started but not checked yet, so they can resume later. */
export async function PUT(request: Request) {
  try {
    const { db, profile, preview } = await memberFor(request, 'learner');
    const body = await bodyOf(request);
    // An instructor previewing lessons keeps drafts only in their own browser.
    if (preview) return json({ saved: false });
    return json(await saveCheckpointDraft(db, profile, body));
  } catch (error) {
    return failure(error);
  }
}

/** Retake a lesson's checkpoint: clears its checked answers. */
export async function DELETE(request: Request) {
  try {
    const { db, profile, preview } = await memberFor(request, 'learner');
    if (preview) return json({ reset: true });
    return json(await resetCheckpoint(db, profile, await bodyOf(request)));
  } catch (error) {
    return failure(error);
  }
}
