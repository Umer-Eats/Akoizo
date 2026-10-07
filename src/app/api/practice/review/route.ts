import { failure, json, memberFor } from '@/lib/api';
import { AppError } from '@/lib/domain';
import { pendingPracticeReviews, reviewPractice } from '@/lib/practice-service';
export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'instructor');
    return json(await pendingPracticeReviews(db, profile));
  } catch (error) {
    return failure(error);
  }
}
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'instructor');
    const text = await request.text();
    if (text.length > 100_000) throw new AppError(413, 'The review is too large.');
    const body = JSON.parse(text);
    if (!body || typeof body !== 'object' || Array.isArray(body))
      throw new AppError(400, 'Enter rubric scores.');
    return json(await reviewPractice(db, profile, body));
  } catch (error) {
    return failure(error);
  }
}
