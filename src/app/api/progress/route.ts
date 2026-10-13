import { failure, json, memberFor } from '@/lib/api';
import { AppError } from '@/lib/domain';
import { recordLab, recordLessons } from '@/lib/study-assignment-service';

/** A student's browser reports completed lessons and lab simulations. */
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'student');
    const raw = await request.text();
    if (raw.length > 20_000) throw new AppError(413, 'The request is too large.');
    const body = JSON.parse(raw);
    if (!body || typeof body !== 'object' || Array.isArray(body))
      throw new AppError(400, 'Choose a lesson or lab simulation.');
    return json(
      'labId' in body ? await recordLab(db, profile, body) : await recordLessons(db, profile, body),
    );
  } catch (error) {
    return failure(error);
  }
}
