import { failure, json, memberFor } from '@/lib/api';
import { AppError } from '@/lib/domain';
import { saveCourse } from '@/lib/course-service';
import type { BuildCourse } from '@/lib/build-events';
import { buildEvent, MAX_VIDEO_BYTES, VIDEO_MIMES, parseCourse } from '@/lib/build-events';
import {
  GEMINI_ROOT,
  provider,
  readBuildTicket,
  runBuildAI,
  signBuildTicket,
} from '@/lib/build-ai';

export const runtime = 'nodejs';
export const maxDuration = 150;
const CHUNK = 2 * 1024 * 1024;
async function boundedBody(request: Request, limit: number) {
  const reader = request.body?.getReader();
  if (!reader) throw new AppError(400, 'The upload is empty.');
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      throw new AppError(413, 'This upload is too large.');
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}
function validFile(name: unknown): name is string {
  return typeof name === 'string' && /^files\/[a-zA-Z0-9_-]{1,160}$/.test(name);
}
function validUploadUrl(value: string) {
  const url = new URL(value);
  return url.origin === GEMINI_ROOT && url.pathname.startsWith('/upload/');
}
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'student');
    const division = profile.division;
    if (division !== 'B' && division !== 'C')
      throw new AppError(403, 'Build tools are available to Division B and C students.');
    // Binary chunks stay below hosting request limits. Upload URLs never reach the browser.
    if (request.headers.has('x-build-upload')) {
      const ticket = readBuildTicket(request.headers.get('x-build-upload'), profile.id);
      const offset = Number(request.headers.get('x-build-offset'));
      if (
        !ticket.url ||
        !validUploadUrl(ticket.url) ||
        !ticket.size ||
        !Number.isInteger(offset) ||
        offset < 0 ||
        offset % CHUNK !== 0 ||
        offset >= ticket.size
      )
        throw new AppError(400, 'Invalid video upload chunk.');
      const bytes = await boundedBody(request, CHUNK);
      if (bytes.length !== Math.min(CHUNK, ticket.size - offset))
        throw new AppError(400, 'The video chunk was incomplete. Upload the video again.');
      const final = offset + bytes.length === ticket.size;
      let response: Response;
      try {
        response = await fetch(ticket.url, {
          method: 'POST',
          redirect: 'error',
          signal: AbortSignal.timeout(60_000),
          headers: {
            'Content-Type': ticket.mime!,
            'X-Goog-Upload-Offset': String(offset),
            'X-Goog-Upload-Command': final ? 'upload, finalize' : 'upload',
          },
          body: new Uint8Array(bytes),
        });
      } catch {
        throw new AppError(503, 'The video upload was interrupted. Please upload it again.');
      }
      if (!response.ok)
        throw new AppError(503, 'The video upload was interrupted. Please upload it again.');
      if (!final) return json({ received: offset + bytes.length });
      const file = (await response.json()).file;
      if (!validFile(file?.name)) throw new AppError(503, 'The video could not be processed.');
      return json({
        ticket: signBuildTicket({ owner: profile.id, name: file.name, mime: ticket.mime }),
      });
    }
    const body = JSON.parse((await boundedBody(request, 3_000_000)).toString('utf8'));
    if (!body || typeof body !== 'object') throw new AppError(400, 'Enter your build details.');
    if (['status', 'delete'].includes(body.action)) {
      const ticket = readBuildTicket(body.ticket, profile.id);
      if (!validFile(ticket.name)) throw new AppError(400, 'Choose your uploaded video.');
      if (body.action === 'delete') {
        await provider(`/v1beta/${ticket.name}`, { method: 'DELETE' });
        return json({ deleted: true });
      }
      const file = await (await provider(`/v1beta/${ticket.name}`)).json();
      if (file.state === 'FAILED')
        throw new AppError(422, 'Gemini could not read this video. Try an MP4 or WebM recording.');
      return json({ ready: file.state === 'ACTIVE' });
    }
    if (typeof body.eventId !== 'string') throw new AppError(400, 'Choose a build event.');
    try {
      buildEvent(division, body.eventId);
    } catch {
      throw new AppError(400, 'Choose a build event available in your division.');
    }
    if (body.action === 'upload') {
      if (
        !VIDEO_MIMES.includes(body.mime) ||
        !Number.isInteger(body.size) ||
        body.size <= 0 ||
        body.size > MAX_VIDEO_BYTES
      )
        throw new AppError(400, 'Choose an MP4, WebM, MOV or MPEG video up to 100 MB.');
      const response = await provider('/upload/v1beta/files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Upload-Protocol': 'resumable',
          'X-Goog-Upload-Command': 'start',
          'X-Goog-Upload-Header-Content-Length': String(body.size),
          'X-Goog-Upload-Header-Content-Type': body.mime,
        },
        body: JSON.stringify({ file: { display_name: 'Akoizo practice run' } }),
      });
      const url = response.headers.get('x-goog-upload-url');
      if (!url || !validUploadUrl(url))
        throw new AppError(503, 'Video uploads are temporarily unavailable.');
      return json({
        ticket: signBuildTicket({ owner: profile.id, url, size: body.size, mime: body.mime }),
      });
    }
    let course;
    try {
      course = parseCourse(body.course, division, body.eventId);
    } catch (e) {
      throw new AppError(400, (e as Error).message);
    }
    if (body.action === 'course') {
      const generated = (await runBuildAI(course, 'course')) as BuildCourse;
      try {
        const saved = await saveCourse(db, profile, generated);
        return json({ course: generated, savedCourseId: saved.id });
      } catch {
        // Preserve a successful model response even if storage needs a retry.
        return json({ course: generated, saveError: 'Course generated; saving needs a retry.' });
      }
    }
    if (body.action !== 'grade') throw new AppError(400, 'Choose a build tool action.');
    if (Object.values(course.parameters).some((v) => !v.trim()))
      throw new AppError(400, 'Complete every setup field. Use “not applicable” where needed.');
    const ticket = readBuildTicket(body.ticket, profile.id);
    if (!validFile(ticket.name) || !VIDEO_MIMES.includes(ticket.mime!))
      throw new AppError(400, 'Upload your video first.');
    const media: object[] = [];
    if (body.map) {
      const map = body.map;
      if (
        !['image/png', 'image/jpeg', 'image/webp', 'application/pdf'].includes(map.mime) ||
        typeof map.data !== 'string' ||
        map.data.length > 1_400_000 ||
        !/^[A-Za-z0-9+/]*={0,2}$/.test(map.data)
      )
        throw new AppError(400, 'Choose a course map image or PDF up to 1 MB.');
      media.push(
        { text: 'Student-provided course map (supplementary data):' },
        { inlineData: { mimeType: map.mime, data: map.data } },
      );
    }
    const file = await (await provider(`/v1beta/${ticket.name}`)).json();
    if (file.state !== 'ACTIVE')
      throw new AppError(409, 'The video is still processing. Please try again shortly.');
    // Derive URI from the authenticated, server-issued file name, never a user URL.
    media.push({
      videoMetadata: {
        fps: [
          'electric-vehicle',
          'scrambler',
          'hovercraft',
          'ping-pong-parachute',
          'roller-coaster',
        ].includes(course.eventId)
          ? 10
          : ['wright-stuff', 'elastic-launched-gliders', 'mission-possible'].includes(
                course.eventId,
              )
            ? 5
            : 1,
      },
      fileData: { mimeType: ticket.mime, fileUri: `${GEMINI_ROOT}/v1beta/${ticket.name}` },
    });
    try {
      return json({ grade: await runBuildAI(course, 'grade', media) });
    } finally {
      await provider(`/v1beta/${ticket.name}`, { method: 'DELETE' }).catch(() => undefined);
    }
  } catch (error) {
    return failure(error);
  }
}
