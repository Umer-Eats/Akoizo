import { failure, json, memberFor } from '@/lib/api';
import { AppError } from '@/lib/domain';
import { findPracticeTest, listPracticeTests, publicPracticePaper } from '@/lib/practice-catalog';
import { practiceHistory, submitPractice } from '@/lib/practice-service';

export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'student');
    if (!profile.division) throw new AppError(400, 'Choose your division first.');
    const params = new URL(request.url).searchParams;
    const testId = params.get('testId');
    if (testId)
      return json({
        test: publicPracticePaper(findPracticeTest(profile.division, testId)),
        attempts: await practiceHistory(db, profile, testId),
      });
    return json({ tests: listPracticeTests(profile.division, params.get('eventId') ?? '') });
  } catch (error) {
    return failure(error);
  }
}
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'student');
    const raw = await request.text();
    if (raw.length > 500_000) throw new AppError(413, 'Your answers are too long.');
    const body = JSON.parse(raw);
    if (!body || typeof body !== 'object' || Array.isArray(body))
      throw new AppError(400, 'Enter your answers.');
    return json(await submitPractice(db, profile, body), 201);
  } catch (error) {
    return failure(error);
  }
}
