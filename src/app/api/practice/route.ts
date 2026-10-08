import { failure, json, memberFor } from '@/lib/api';
import { AppError } from '@/lib/domain';
import {
  findPracticeTest,
  listPracticeTests,
  listArchiveSources,
  publicPracticePaper,
} from '@/lib/practice-catalog';
import { practiceHistory, submitPractice } from '@/lib/practice-service';

export const maxDuration = 60;

export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request);
    const params = new URL(request.url).searchParams;
    const requestedDivision = params.get('division');
    const division =
      profile.role === 'instructor'
        ? requestedDivision && ['A', 'B', 'C'].includes(requestedDivision)
          ? (requestedDivision as 'A' | 'B' | 'C')
          : null
        : profile.division;
    if (!division) {
      if (profile.role === 'instructor')
        throw new AppError(400, 'Choose Division A, B, or C to browse tests.');
      throw new AppError(400, 'Choose your division first.');
    }
    const testId = params.get('testId');
    if (testId) {
      if (profile.role === 'instructor')
        return json({ test: publicPracticePaper(findPracticeTest(division, testId)) });
      return json({
        test: publicPracticePaper(findPracticeTest(division, testId)),
        attempts: await practiceHistory(db, profile, testId),
      });
    }
    const eventId = params.get('eventId') ?? '';
    return json({
      tests: listPracticeTests(division, eventId),
      archive: listArchiveSources(division, eventId),
    });
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
