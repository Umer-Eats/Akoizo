'use client';
// A notes panel that opens beside lessons, practice tests, labs and other event tools. It keeps
// one page per thing being studied (made on first open) in that event's notebook, and lets the
// student clip selected text from the page into their notes with a highlight.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Highlighter, NotebookPen, Plus, WandSparkles, X } from 'lucide-react';
import { useAuth } from './auth-context';
import { NoteEditor, type EditorHandle } from './note-editor';
import { createSaver, useStudyContext, type SaveState } from './notes-store';
import { escapeHtml, noteText, wordCount } from '@/lib/note-html';
import type { Note, NoteContext, NoteSummary } from '@/lib/note-types';
import './notes.css';

const storeKey = 'akoizo-notes-dock';
const widthKey = 'akoizo-notes-dock-width';
const minWidth = 300;
const maxWidth = () => Math.max(minWidth, Math.min(900, Math.round(window.innerWidth * 0.7)));
const clampWidth = (width: number) => Math.round(Math.min(maxWidth(), Math.max(minWidth, width)));

/** Sets the dock width for the whole page (the page also pads itself by this amount). */
function applyWidth(width: number | null) {
  const root = document.documentElement;
  if (width === null) root.style.removeProperty('--nb-dock-w');
  else root.style.setProperty('--nb-dock-w', `${width}px`);
}

/** The dock's left edge: drag it (or use the arrow keys) to make the panel wider or narrower. */
function DockResizer() {
  const [width, setWidth] = useState<number | null>(null);
  const set = useCallback((next: number | null, remember = true) => {
    const value = next === null ? null : clampWidth(next);
    setWidth(value);
    applyWidth(value);
    if (!remember) return;
    try {
      if (value === null) localStorage.removeItem(widthKey);
      else localStorage.setItem(widthKey, String(value));
    } catch {}
  }, []);
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(widthKey);
    } catch {}
    if (saved && Number(saved) > 0) set(Number(saved), false);
  }, [set]);
  const current = () =>
    width ?? document.querySelector<HTMLElement>('.nb-dock')?.offsetWidth ?? 420;
  return (
    <div
      className="nb-dock-resize"
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize notes panel"
      aria-valuemin={minWidth}
      aria-valuemax={900}
      aria-valuenow={width ?? undefined}
      tabIndex={0}
      title="Drag to resize · double-click to reset"
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        event.preventDefault();
        const handle = event.currentTarget;
        handle.setPointerCapture(event.pointerId);
        document.documentElement.dataset.notesResizing = '';
        const move = (e: PointerEvent) => set(window.innerWidth - e.clientX, false);
        const end = (e: PointerEvent) => {
          handle.removeEventListener('pointermove', move);
          handle.removeEventListener('pointerup', end);
          handle.removeEventListener('pointercancel', end);
          delete document.documentElement.dataset.notesResizing;
          set(window.innerWidth - e.clientX);
        };
        handle.addEventListener('pointermove', move);
        handle.addEventListener('pointerup', end);
        handle.addEventListener('pointercancel', end);
      }}
      onDoubleClick={() => set(null)}
      onKeyDown={(event) => {
        const step = event.shiftKey ? 80 : 20;
        if (event.key === 'ArrowLeft') set(current() + step);
        else if (event.key === 'ArrowRight') set(current() - step);
        else if (event.key === 'Home') set(maxWidth());
        else if (event.key === 'End') set(minWidth);
        else return;
        event.preventDefault();
      }}
    />
  );
}
type Clip = { text: string; x: number; y: number; range: Range };

export function NotesDock() {
  const { profile, request } = useAuth();
  const path = usePathname();
  const context = useStudyContext();
  const [open, setOpenState] = useState(false);
  // Remembered only when the student opens or closes it, so it follows them between pages.
  const setOpen = useCallback((next: boolean | ((current: boolean) => boolean)) => {
    setOpenState((current) => {
      const value = typeof next === 'function' ? next(current) : next;
      try {
        localStorage.setItem(storeKey, value ? 'open' : 'closed');
      } catch {}
      return value;
    });
  }, []);
  const [data, setData] = useState<NoteContext | null>(null);
  const [page, setPage] = useState<Note | null>(null);
  const [error, setError] = useState('');
  const [save, setSave] = useState<SaveState>('saved');
  const [words, setWords] = useState(0);
  const [clip, setClip] = useState<Clip | null>(null);
  const [drafting, setDrafting] = useState(false);
  const editor = useRef<EditorHandle>(null);
  const pendingClip = useRef<string | null>(null);
  const hidden =
    !profile || !context || path.startsWith('/notes') || path.includes('/ranked-tests/');
  const contextKey = context ? `${context.eventId}:${context.kind}:${context.refId}` : '';

  const saver = useMemo(
    () =>
      createSaver<NoteSummary>(
        request,
        (state) => setSave(state),
        (id, summary) =>
          setData((current) =>
            current
              ? { ...current, pages: current.pages.map((p) => (p.id === id ? summary : p)) }
              : current,
          ),
      ),
    [request],
  );

  useEffect(() => {
    try {
      setOpenState(localStorage.getItem(storeKey) === 'open');
    } catch {}
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    if (open && !hidden) root.dataset.notesDock = 'open';
    else delete root.dataset.notesDock;
    return () => {
      delete root.dataset.notesDock;
    };
  }, [open, hidden]);

  // Alt+N opens and closes the panel.
  useEffect(() => {
    if (hidden) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && !e.ctrlKey && !e.metaKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hidden, setOpen]);

  // The page for what is open now, made the first time.
  useEffect(() => {
    if (!open || hidden || !context) return;
    let active = true;
    setError('');
    editor.current?.flush();
    request<NoteContext>('/api/notes', {
      method: 'POST',
      body: JSON.stringify({ action: 'context', ...context }),
    })
      .then((result) => {
        if (!active) return;
        setData(result);
        setPage(result.note);
        setWords(result.note.words);
      })
      .catch(
        (e) => active && setError(e instanceof Error ? e.message : 'Your notes could not open.'),
      );
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, hidden, contextKey, request]);

  // Clipping: select text on the page and an "Add to notes" button appears beside it.
  useEffect(() => {
    if (hidden) return;
    const onUp = (event: MouseEvent | KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest?.('.nb-dock, .nb-clip, input, textarea, [contenteditable="true"]')) return;
      window.setTimeout(() => {
        const sel = document.getSelection();
        const text = sel?.toString().replace(/\s+/g, ' ').trim() ?? '';
        if (
          !sel?.rangeCount ||
          text.length < 3 ||
          !document.getElementById('main')?.contains(sel.anchorNode)
        ) {
          setClip(null);
          return;
        }
        const range = sel.getRangeAt(0).cloneRange();
        const rect = range.getBoundingClientRect();
        setClip({
          text: text.slice(0, 4000),
          range,
          x: Math.min(window.innerWidth - 170, Math.max(8, rect.left + rect.width / 2 - 70)),
          y: rect.top > 60 ? rect.top - 44 : rect.bottom + 8,
        });
      }, 0);
    };
    const onScroll = () => setClip(null);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('keyup', onUp);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('keyup', onUp);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [hidden]);

  const clipHtml = (text: string) =>
    `<blockquote><p><mark data-color="yellow">${escapeHtml(text)}</mark></p></blockquote>`;
  const addClip = () => {
    if (!clip) return;
    // Keep the clipped passage marked on the page for this visit.
    try {
      const registry = (CSS as unknown as { highlights?: Map<string, unknown> }).highlights;
      const HighlightCtor = (
        window as unknown as { Highlight?: new (...r: Range[]) => { add: (r: Range) => void } }
      ).Highlight;
      if (registry && HighlightCtor) {
        const existing = registry.get('nb-clipped') as { add: (r: Range) => void } | undefined;
        if (existing) existing.add(clip.range);
        else registry.set('nb-clipped', new HighlightCtor(clip.range));
      }
    } catch {}
    document.getSelection()?.removeAllRanges();
    if (open && editor.current && page?.id === data?.note.id)
      editor.current.appendHtml(clipHtml(clip.text));
    else {
      pendingClip.current = clipHtml(clip.text);
      if (page && data && page.id !== data.note.id) setPage(data.note);
      setOpen(true);
    }
    setClip(null);
  };
  // A clip made while the panel was closed lands once the page is ready.
  useEffect(() => {
    if (!pendingClip.current || !page || !editor.current) return;
    const html = pendingClip.current;
    pendingClip.current = null;
    window.setTimeout(() => editor.current?.appendHtml(html), 50);
  }, [page]);

  const switchPage = useCallback(
    async (id: string) => {
      editor.current?.flush();
      try {
        setPage(await request<Note>(`/api/notes?id=${encodeURIComponent(id)}`));
      } catch (e) {
        setError(e instanceof Error ? e.message : 'That page could not open.');
      }
    },
    [request],
  );
  const newPage = async () => {
    if (!data) return;
    editor.current?.flush();
    try {
      const note = await request<Note>('/api/notes', {
        method: 'POST',
        body: JSON.stringify({
          action: 'createNote',
          notebookId: data.notebook.id,
          section: page?.section ?? '',
          title: 'Untitled',
        }),
      });
      setData({ ...data, pages: [...data.pages, note] });
      setPage(note);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'A page could not be made.');
    }
  };
  const draftFromLesson = async () => {
    if (!context || context.kind !== 'lesson') return;
    setDrafting(true);
    try {
      const { html } = await request<{ html: string }>('/api/notes', {
        method: 'POST',
        body: JSON.stringify({
          action: 'lessonDraft',
          eventId: context.eventId,
          lessonId: context.refId,
        }),
      });
      if (words < 3) editor.current?.replaceHtml(html);
      else editor.current?.appendHtml(html);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Notes could not be built.');
    } finally {
      setDrafting(false);
    }
  };

  if (hidden) return null;
  const titles = data?.pages.map((p) => p.title) ?? [];
  const isContextPage = page && data && page.id === data.note.id;

  return (
    <>
      {clip && (
        <div className="nb-clip" style={{ left: clip.x, top: clip.y }}>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={addClip}>
            <Highlighter size={14} aria-hidden="true" /> Add to notes
          </button>
          <button
            type="button"
            aria-label="Dismiss"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setClip(null)}
          >
            <X size={13} />
          </button>
        </div>
      )}
      {!open && (
        <button
          type="button"
          className="nb-dock-tab"
          onClick={() => setOpen(true)}
          title="Open notes (Alt+N)"
        >
          <NotebookPen size={16} aria-hidden="true" />
          <span>Notes</span>
        </button>
      )}
      {open && (
        <aside className="nb-dock" aria-label="Notes" data-slot={data?.notebook.color}>
          <DockResizer />
          <header className="nb-dock-head">
            <p className="nb-dock-book">
              <i aria-hidden="true" /> {data?.notebook.title ?? context!.eventName}
              <span>notes</span>
            </p>
            <Link
              className="nb-icon-btn"
              href={page ? `/notes?note=${page.id}` : '/notes'}
              title="Open in Notes"
              aria-label="Open in Notes"
            >
              <ArrowUpRight size={15} />
            </Link>
            <button
              type="button"
              className="nb-icon-btn"
              onClick={() => {
                editor.current?.flush();
                setOpen(false);
              }}
              aria-label="Close notes"
              title="Close (Alt+N)"
            >
              <X size={16} />
            </button>
          </header>
          {data && page ? (
            <>
              <div className="nb-dock-pages">
                <label className="sr-only" htmlFor="nb-dock-page">
                  Page
                </label>
                <select
                  id="nb-dock-page"
                  value={page.id}
                  onChange={(e) => switchPage(e.target.value)}
                >
                  {[
                    ...new Set([
                      '',
                      ...data.notebook.sections,
                      ...data.pages.map((p) => p.section),
                    ]),
                  ].map((section) => {
                    const inSection = data.pages.filter((p) => p.section === section);
                    if (!inSection.length) return null;
                    return (
                      <optgroup key={section || 'root'} label={section || data.notebook.title}>
                        {inSection.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.id === data.note.id ? `● ${p.title}` : p.title}
                          </option>
                        ))}
                      </optgroup>
                    );
                  })}
                </select>
                <button
                  type="button"
                  className="nb-icon-btn"
                  onClick={newPage}
                  aria-label="New page"
                  title="New page"
                >
                  <Plus size={15} />
                </button>
              </div>
              {!isContextPage && (
                <button type="button" className="nb-dock-back" onClick={() => setPage(data.note)}>
                  Back to notes for {context!.label}
                </button>
              )}
              {isContextPage && context!.kind === 'lesson' && (
                <button
                  type="button"
                  className="nb-dock-build"
                  onClick={draftFromLesson}
                  disabled={drafting}
                >
                  <WandSparkles size={14} aria-hidden="true" />
                  {drafting
                    ? 'Building notes…'
                    : words < 3
                      ? 'Build notes from this lesson'
                      : 'Add lesson notes below'}
                </button>
              )}
              <NoteEditor
                key={page.id}
                ref={editor}
                compact
                html={page.html}
                titles={titles}
                label={`Notes: ${page.title}`}
                placeholder="Jot notes here. Select text in the lesson and choose Add to notes to clip it."
                onChange={(html) => {
                  setWords(wordCount(noteText(html)));
                  saver.save(page.id, { html });
                }}
                onOpenLink={(title) => {
                  const target = data.pages.find(
                    (p) => p.title.toLowerCase() === title.toLowerCase(),
                  );
                  if (target) switchPage(target.id);
                  else window.location.assign(`/notes?note=${page.id}`);
                }}
                onImage={(imageId, image) =>
                  request('/api/notes', {
                    method: 'POST',
                    body: JSON.stringify({ action: 'image', id: page.id, imageId, data: image }),
                  }).catch((e) =>
                    setError(e instanceof Error ? e.message : 'The image did not save.'),
                  )
                }
                onError={setError}
              />
              <footer className="nb-dock-foot" role="status">
                <span data-state={save}>
                  <i />{' '}
                  {save === 'saving'
                    ? 'Saving…'
                    : save === 'error'
                      ? 'Not saved, retrying'
                      : 'Saved'}
                </span>
                {error ? (
                  <span className="nb-dock-error">{error}</span>
                ) : (
                  <span>{words} words</span>
                )}
              </footer>
            </>
          ) : (
            <p className="nb-dock-loading" role="status">
              {error || 'Opening your notes…'}
            </p>
          )}
        </aside>
      )}
    </>
  );
}
