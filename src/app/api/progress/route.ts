import { failure, json, memberFor } from '@/lib/api';
import { AppError, PHET_LAB } from '@/lib/domain';
import { recordLab, studentWork, submitLab, submitLesson } from '@/lib/study-assignment-service';

/** Graded lessons, labs and practice tests: a student's own, or one student of an instructor's school. */
export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request);
    return json(await studentWork(db, profile, new URL(request.url).searchParams.get('studentId')));
  } catch (error) {
    return failure(error);
  }
}
/** A student submits a lesson's practice or a lab simulation. */
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'student');
    const raw = await request.text();
    if (raw.length > 200_000) throw new AppError(413, 'The request is too large.');
    const body = JSON.parse(raw);
    if (!body || typeof body !== 'object' || Array.isArray(body))
      throw new AppError(400, 'Choose a lesson or lab simulation.');
    if (!('labId' in body)) return json(await submitLesson(db, profile, body));
    // PhET runs on its own site, so it is marked complete rather than graded.
    return json(
      body.labId === PHET_LAB
        ? await recordLab(db, profile, body)
        : await submitLab(db, profile, body),
    );
  } catch (error) {
    return failure(error);
  }
}
