import { failure, json, memberFor } from '@/lib/api';
import { AppError } from '@/lib/domain';
import { allowAkoMessage } from '@/lib/ako-study';
import { askAkoLesson } from '@/lib/ako-tutor';
import { lessonsForEvent } from '@/lib/lessons-registry';

export const maxDuration = 30;
const recent = new Map<string, number[]>();

export async function POST(request: Request) {
  try {
    const { profile } = await memberFor(request, 'student');
    if (!profile.division) throw new AppError(400, 'Choose your division first.');
    const text = await request.text();
    if (text.length > 40_000) throw new AppError(413, 'That message is too long for Ako.');
    const body = JSON.parse(text);
    if (
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body) ||
      typeof body.eventId !== 'string' ||
      typeof body.lessonId !== 'string'
    )
      throw new AppError(400, 'Open a lesson to learn with Ako.');
    const lesson = lessonsForEvent(body.eventId, profile.division)?.lessons.find(
      (lesson) => lesson.id === body.lessonId,
    );
    if (!lesson) throw new AppError(404, 'That lesson is not available in your division.');
    // A guided sentence can use both an explanation turn and a teach-back turn.
    if (!allowAkoMessage(recent, profile.id, Date.now(), 60))
      throw new AppError(429, 'Ako needs a short break. Try again in a few minutes.');
    return json(await askAkoLesson(lesson, body));
  } catch (error) {
    return failure(error);
  }
}
