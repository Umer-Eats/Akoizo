'use client';
// Client side of the notebook: the page-context store that lessons, tests and labs write to,
// the image cache, image compression and a per-page save queue.
import { useEffect, useSyncExternalStore } from 'react';
import type { NoteSourceKind } from '@/lib/note-types';

// ---------- What the student has open (read by the notes dock) ----------
export type StudyContext = {
  eventId: string;
  eventName: string;
  kind: Exclude<NoteSourceKind, 'event' | 'unit'>;
  refId: string;
  label: string;
};
const layers = new Map<number, StudyContext>();
const listeners = new Set<() => void>();
let current: StudyContext | null = null;
function publish() {
  const top = Math.max(-1, ...layers.keys());
  current = layers.get(top) ?? null;
  listeners.forEach((listener) => listener());
}
/** Pages set their study context; a higher level (a lesson) wins over a lower one (its event). */
export function setStudyContext(level: number, context: StudyContext | null) {
  const before = layers.get(level);
  if (
    context &&
    before &&
    before.eventId === context.eventId &&
    before.kind === context.kind &&
    before.refId === context.refId &&
    before.label === context.label
  )
    return;
  if (!context && !before) return;
  if (context) layers.set(level, context);
  else layers.delete(level);
  publish();
}
/** Marks what this page is studying while it is mounted, so the notes dock can keep a page for it. */
export function useStudyLayer(level: number, context: StudyContext | null) {
  const key = context ? JSON.stringify(context) : '';
  useEffect(() => {
    setStudyContext(level, key ? (JSON.parse(key) as StudyContext) : null);
  }, [level, key]);
  useEffect(() => () => setStudyContext(level, null), [level]);
}
export function useStudyContext() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => current,
    () => null,
  );
}

// ---------- Images ----------
type Request = <T>(path: string, options?: RequestInit) => Promise<T>;
export const imageCache = new Map<string, string>();
const pending = new Map<string, Promise<void>>();

/** Fills in every notebook image inside `root` from the cache, fetching what is missing. */
export async function hydrateImages(root: HTMLElement, request: Request) {
  const images = [...root.querySelectorAll<HTMLImageElement>('img[data-img]')];
  const missing = [
    ...new Set(images.map((img) => img.dataset.img!).filter((id) => !imageCache.has(id))),
  ];
  const fresh = missing.filter((id) => !pending.has(id));
  for (let i = 0; i < fresh.length; i += 40) {
    const ids = fresh.slice(i, i + 40);
    const load = request<{ images: Record<string, string> }>(`/api/notes?images=${ids.join(',')}`)
      .then(({ images: found }) => {
        for (const [id, data] of Object.entries(found)) imageCache.set(id, data);
      })
      .catch(() => {})
      .finally(() => ids.forEach((id) => pending.delete(id)));
    ids.forEach((id) => pending.set(id, load));
  }
  const waits = [...new Set(missing.map((id) => pending.get(id)).filter(Boolean))];
  const fill = (final: boolean) =>
    images.forEach((img) => {
      const data = imageCache.get(img.dataset.img!);
      if (data && img.getAttribute('src') !== data) img.src = data;
      if (data) delete img.dataset.missing;
      else if (final) img.dataset.missing = 'true';
    });
  fill(false);
  await Promise.all(waits);
  fill(true);
}

/** Shrinks a pasted or dropped image to a web-sized data URL (under ~1 MB). */
export async function compressImage(blob: Blob) {
  const bitmap = await createImageBitmap(blob);
  let longest = 1600;
  let quality = 0.86;
  try {
    for (let attempt = 0; attempt < 4; attempt++) {
      const scale = Math.min(1, longest / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      let url = canvas.toDataURL('image/webp', quality);
      if (!url.startsWith('data:image/webp')) url = canvas.toDataURL('image/jpeg', quality);
      if (url.length < 1_400_000) return url;
      longest = Math.round(longest * 0.75);
      quality -= 0.12;
    }
  } finally {
    bitmap.close();
  }
  throw new Error('That image is too large to paste. Try a smaller one.');
}

// ---------- Saving ----------
export type SaveState = 'saved' | 'saving' | 'error';
type Patch = Record<string, unknown>;

/**
 * Sends page changes one at a time per page, merging changes that arrive while a save is in
 * flight, so a fast typist never sends overlapping saves.
 */
export function createSaver<T>(
  request: Request,
  onState: (state: SaveState, message?: string) => void,
  onSaved: (id: string, result: T) => void,
) {
  const queued = new Map<string, Patch>();
  const flying = new Set<string>();
  const retries = new Map<string, number>();
  const send = async (id: string) => {
    if (flying.has(id) || !queued.has(id)) return;
    const patch = queued.get(id)!;
    queued.delete(id);
    flying.add(id);
    onState('saving');
    try {
      const result = await request<T>('/api/notes', {
        method: 'POST',
        body: JSON.stringify({ action: 'updateNote', id, ...patch }),
      });
      onSaved(id, result);
      flying.delete(id);
      if (!queued.size && !flying.size) onState('saved');
    } catch (error) {
      flying.delete(id);
      // Keep the newest change and retry it with the next edit or in a few seconds.
      queued.set(id, { ...patch, ...queued.get(id) });
      onState('error', error instanceof Error ? error.message : 'Could not save.');
      window.clearTimeout(retries.get(id));
      retries.set(
        id,
        window.setTimeout(() => send(id), 5000),
      );
      return;
    }
    if (queued.has(id)) send(id);
  };
  return {
    save(id: string, patch: Patch) {
      queued.set(id, { ...queued.get(id), ...patch });
      send(id);
    },
    get busy() {
      return queued.size > 0 || flying.size > 0;
    },
  };
}
