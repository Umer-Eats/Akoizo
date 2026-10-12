import { failure, json, memberFor } from '@/lib/api';
import { AppError } from '@/lib/domain';
import { allowAkoMessage } from '@/lib/ako-study';
import { askAko } from '@/lib/ako-tutor';
import { findPracticeTest } from '@/lib/practice-catalog';

export const maxDuration = 30;
const recent = new Map<string, number[]>();

export async function POST(request: Request) {
  try {
    const { profile } = await memberFor(request, 'student');
    if (!profile.division) throw new AppError(400, 'Choose your division first.');
    const text = await request.text();
    if (text.length > 40_000) throw new AppError(413, 'That message is too long for Ako.');
    const body = JSON.parse(text);
    if (!body || typeof body !== 'object' || Array.isArray(body) || typeof body.testId !== 'string')
      throw new AppError(400, 'Open a practice test to study with Ako.');
    const test = findPracticeTest(profile.division, body.testId);
    if (!allowAkoMessage(recent, profile.id, Date.now()))
      throw new AppError(429, 'Ako needs a short break. Try again in a few minutes.');
    return json(await askAko(test, body));
  } catch (error) {
    return failure(error);
  }
}
