import { failure, json, memberFor } from '@/lib/api';
import { AppError } from '@/lib/domain';
import { parseBinderInput } from '@/lib/binders';
import { advanceBinder, cancelBinder, createBinder, listBinders, publishBinder, readBinder } from '@/lib/binder-service';
export const maxDuration = 150;
export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request);
    const p = new URL(request.url).searchParams;
    return json(p.get('id') ? await readBinder(db, profile, p.get('id')!) : await listBinders(db, profile, p.get('eventId'), p.get('before')));
  } catch (e) { return failure(e); }
}
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request);
    const reader = request.body?.getReader();
    if (!reader) throw new AppError(400, 'Enter your binder details.');
    const chunks: Uint8Array[] = []; let size = 0;
    while (true) {
      const { value, done } = await reader.read(); if (done) break;
      size += value.byteLength;
      if (size > 4_100_000) { await reader.cancel(); throw new AppError(413, 'Keep uploads under 3 MB combined.'); }
      chunks.push(value);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (body?.action === 'create') return json(await createBinder(db, profile, parseBinderInput(body)), 201);
    if (!body || typeof body.id !== 'string' || !/^[a-f0-9-]{36}$/.test(body.id)) throw new AppError(400, 'Choose a binder.');
    if (body.action === 'advance') return json(await advanceBinder(db, profile, body.id));
    if (body.action === 'publish') return json(await publishBinder(db, profile, body.id));
    if (body.action === 'cancel') return json(await cancelBinder(db, profile, body.id));
    throw new AppError(400, 'Unknown binder action.');
  } catch (e) { return failure(e); }
}
