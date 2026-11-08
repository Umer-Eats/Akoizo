import { failure, json, memberFor } from '@/lib/api';
import { AppError } from '@/lib/domain';
import { listCourses, readCourse, saveCourse } from '@/lib/course-service';

export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request);
    const p = new URL(request.url).searchParams;
    return json(
      p.get('id')
        ? await readCourse(db, profile, p.get('id')!)
        : await listCourses(db, profile, p.get('eventId'), p.get('division'), p.get('before')),
    );
  } catch (e) {
    return failure(e);
  }
}
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'student');
    const reader = request.body?.getReader();
    if (!reader) throw new AppError(400, 'Choose a course to save.');
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 250_000) {
        await reader.cancel();
        throw new AppError(413, 'This course is too large to save.');
      }
      chunks.push(value);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    return json(await saveCourse(db, profile, body?.course), 201);
  } catch (e) {
    return failure(e);
  }
}
