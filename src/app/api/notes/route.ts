import { failure, json, memberFor } from '@/lib/api';
import { AppError } from '@/lib/domain';
import {
  contextNote,
  createNote,
  createNotebook,
  deleteNote,
  deleteNotebook,
  emptyTrash,
  generateEventNotebook,
  lessonDraft,
  listNotes,
  readImages,
  readNote,
  saveImage,
  searchNotes,
  trashNote,
  updateNote,
  updateNotebook,
} from '@/lib/note-service';

export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request);
    const params = new URL(request.url).searchParams;
    if (params.has('id')) return json(await readNote(db, profile, params.get('id')));
    if (params.has('images')) return json(await readImages(db, profile, params.get('images')));
    if (params.has('q')) return json(await searchNotes(db, profile, params.get('q')));
    return json(await listNotes(db, profile));
  } catch (error) {
    return failure(error);
  }
}

// Pages with images stay under ~2 MB; each image is sent on its own.
async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new AppError(400, 'The request could not be read.');
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 2_200_000) {
      await reader.cancel();
      throw new AppError(413, 'That is too large to save at once.');
    }
    chunks.push(value);
  }
  const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  if (!body || typeof body !== 'object') throw new AppError(400, 'The request could not be read.');
  return body as Record<string, unknown>;
}

export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request);
    const body = await readBody(request);
    switch (body.action) {
      case 'createNotebook':
        return json(await createNotebook(db, profile, body), 201);
      case 'updateNotebook':
        return json(await updateNotebook(db, profile, body));
      case 'deleteNotebook':
        return json(await deleteNotebook(db, profile, body.id));
      case 'createNote':
        return json(await createNote(db, profile, body), 201);
      case 'updateNote':
        return json(await updateNote(db, profile, body));
      case 'trashNote':
        return json(await trashNote(db, profile, body.id));
      case 'restoreNote':
        return json(await trashNote(db, profile, body.id, true));
      case 'deleteNote':
        return json(await deleteNote(db, profile, body.id));
      case 'emptyTrash':
        return json(await emptyTrash(db, profile));
      case 'image':
        return json(await saveImage(db, profile, body));
      case 'context':
        return json(await contextNote(db, profile, body));
      case 'lessonDraft':
        return json(lessonDraft(profile, body));
      case 'generate':
        return json(await generateEventNotebook(db, profile, body));
      default:
        throw new AppError(400, 'Unknown notebook action.');
    }
  } catch (error) {
    return failure(error);
  }
}
