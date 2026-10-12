import { failure, json, memberFor } from '@/lib/api';
import { AppError } from '@/lib/domain';
import {
  gradeRankedForStudent,
  saveRankedDraft,
  startRanked,
  submitRanked,
} from '@/lib/ranked-service';

export const maxDuration = 60;

/** A student's own ranked attempt: start, autosave, submit, and finish grading. */
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'student');
    const raw = await request.text();
    if (raw.length > 500_000) throw new AppError(413, 'Your answers are too long.');
    const body = JSON.parse(raw);
    if (!body || typeof body !== 'object' || Array.isArray(body))
      throw new AppError(400, 'Choose a ranked test.');
    switch (body.action) {
      case 'start':
        return json(await startRanked(db, profile, body.testId));
      case 'save':
        return json(await saveRankedDraft(db, profile, body));
      case 'submit':
        return json(await submitRanked(db, profile, body), 201);
      case 'grade':
        return json(await gradeRankedForStudent(db, profile, body.testId));
      default:
        throw new AppError(400, 'Choose a ranked test action.');
    }
  } catch (error) {
    return failure(error);
  }
}
