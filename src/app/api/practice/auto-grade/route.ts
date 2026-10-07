import { failure, json, memberFor } from '@/lib/api';
import { AppError } from '@/lib/domain';
import { autoGradePractice } from '@/lib/practice-service';

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'student');
    const text = await request.text();
    if (text.length > 2000) throw new AppError(413, 'The request is too large.');
    const body = JSON.parse(text);
    if (!body || typeof body !== 'object' || Array.isArray(body))
      throw new AppError(400, 'Choose a saved submission to Auto Grade.');
    return json(await autoGradePractice(db, profile, body));
  } catch (error) {
    return failure(error);
  }
}
