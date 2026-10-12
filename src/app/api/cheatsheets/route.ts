import { failure, json, memberFor } from '@/lib/api';
import { AppError } from '@/lib/domain';
import { parseSheetInput, requireSheetStudent } from '@/lib/cheatsheets';
import { createSheet, listSheets, publishSheet, readSheet } from '@/lib/cheatsheet-service';

export const maxDuration = 150;
export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'student');
    const params = new URL(request.url).searchParams;
    const id = params.get('id');
    return json(
      id
        ? await readSheet(db, profile, id)
        : await listSheets(db, profile, params.get('eventId'), params.get('before')),
    );
  } catch (error) {
    return failure(error);
  }
}
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'student');
    requireSheetStudent(profile);
    // Bound the stream before JSON parsing, including requests without a Content-Length header.
    const reader = request.body?.getReader();
    if (!reader) throw new AppError(400, 'Enter your sheet details.');
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 3_000_000) {
        await reader.cancel();
        throw new AppError(413, 'Your uploads are too large. Use at most 2 MB in total.');
      }
      chunks.push(value);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (body?.action === 'publish') {
      if (typeof body.id !== 'string' || body.id.length > 80)
        throw new AppError(400, 'Choose a draft to publish.');
      return json(await publishSheet(db, profile, body.id));
    }
    return json(await createSheet(db, profile, parseSheetInput(body)), 201);
  } catch (error) {
    return failure(error);
  }
}
