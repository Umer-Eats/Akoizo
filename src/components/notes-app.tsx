'use client';
// The Notes workspace: a vault-style window with notebooks and sections on the left, open pages
// as tabs, the editor in the middle and the page's outline, local graph and backlinks on the right.
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Clock3,
  Ellipsis,
  FilePlus2,
  FileText,
  Folder,
  FolderOpen,
  FolderPlus,
  Link2,
  ListTree,
  Network,
  PanelLeft,
  Pin,
  PinOff,
  Plus,
  RotateCcw,
  Search,
  Tag,
  Trash2,
  WandSparkles,
  X,
} from 'lucide-react';
import { useAuth } from './auth-context';
import { NoteEditor, type EditorHandle } from './note-editor';
import { noteTemplates } from './note-templates';
import { createSaver, type SaveState } from './notes-store';
import { noteHeadings, noteText, sameTitle, wordCount } from '@/lib/note-html';
import {
  notebookColors,
  type Note,
  type NoteSearchHit,
  type NoteSummary,
  type Notebook,
  type NotebookColor,
  type NotesIndex,
} from '@/lib/note-types';

const kindLabel: Record<string, string> = {
  event: 'Course',
  unit: 'Unit',
  lesson: 'Lesson',
  practice: 'Practice test',
  lab: 'Lab',
  tool: 'Event tool',
};

export function ago(iso: string) {
  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 45) return 'just now';
  if (seconds < 3600) return `${Math.round(seconds / 60)} min ago`;
  if (seconds < 86_400) return `${Math.round(seconds / 3600)} h ago`;
  if (seconds < 86_400 * 7) return `${Math.round(seconds / 86_400)} d ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
const byPosition = (a: NoteSummary, b: NoteSummary) =>
  a.position - b.position || a.createdAt.localeCompare(b.createdAt);

type Menu =
  | { kind: 'page'; id: string }
  | { kind: 'notebook'; id: string }
  | { kind: 'section'; id: string; section: string }
  | { kind: 'new'; notebookId: string; section: string }
  | null;
type Editing =
  { kind: 'notebook'; id: string } | { kind: 'section'; id: string; section: string } | null;

export function LocalGraph({
  title,
  links,
  onOpen,
}: {
  title: string;
  links: { title: string; kind: 'out' | 'back' | 'both' | 'missing' }[];
  onOpen: (title: string) => void;
}) {
  const shown = links.slice(0, 10);
  const [cx, cy, r] = [130, 104, 76];
  const cut = (text: string) => (text.length > 16 ? `${text.slice(0, 15)}…` : text);
  return (
    <svg
      className="nb-graph"
      viewBox="0 0 260 210"
      role="img"
      aria-label={`${title} links to ${shown.length} pages`}
      data-active={shown.length > 0}
    >
      {shown.map((link, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / shown.length;
        return (
          <line
            key={`l${link.title}`}
            x1={cx}
            y1={cy}
            x2={cx + r * Math.cos(angle)}
            y2={cy + r * Math.sin(angle) * 0.82}
            pathLength={1}
            data-kind={link.kind}
            style={{ transitionDelay: `${i * 0.06}s` }}
          />
        );
      })}
      <g className="nb-graph-center">
        <circle cx={cx} cy={cy} r={7} />
        <text x={cx} y={cy + 22} textAnchor="middle">
          {cut(title)}
        </text>
      </g>
      {shown.map((link, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / shown.length;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle) * 0.82;
        return (
          <g
            key={`n${link.title}`}
            className="nb-graph-node"
            data-kind={link.kind}
            role="button"
            tabIndex={0}
            aria-label={`Open ${link.title}`}
            style={{ transitionDelay: `${0.15 + i * 0.06}s` }}
            onClick={() => onOpen(link.title)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(link.title)}
          >
            <circle cx={x} cy={y} r={4.5} />
            <text x={x} y={y + (y < cy ? -10 : 17)} textAnchor="middle">
              {cut(link.title)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function NotesApp() {
  const { request, profile } = useAuth();
  const [index, setIndex] = useState<NotesIndex | null>(null);
  const [loadError, setLoadError] = useState('');
  const [notice, setNotice] = useState('');
  const [opened, setOpened] = useState<Record<string, Note>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tabs, setTabs] = useState<string[]>([]);
  const [live, setLive] = useState<{ id: string; html: string } | null>(null);
  const [save, setSave] = useState<{ state: SaveState; message?: string }>({ state: 'saved' });
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<NoteSearchHit[]>([]);
  const [tag, setTag] = useState<string | null>(null);
  const [view, setView] = useState<'notes' | 'trash'>('notes');
  const [closed, setClosed] = useState<string[]>([]);
  const [menu, setMenu] = useState<Menu>(null);
  const [editing, setEditing] = useState<Editing>(null);
  const [building, setBuilding] = useState(false);
  const [moving, setMoving] = useState<string | null>(null);
  const [treeOpen, setTreeOpen] = useState(false);
  const [dropTarget, setDropTarget] = useState('');
  const editor = useRef<EditorHandle>(null);
  const titleTimer = useRef(0);
  const searchInput = useRef<HTMLInputElement>(null);
  const storeKey = `akoizo-notes:${profile?.id}`;

  const saver = useMemo(
    () =>
      createSaver<NoteSummary>(
        request,
        (state, message) => setSave({ state, message }),
        (id, summary) =>
          setIndex((current) =>
            current
              ? { ...current, notes: current.notes.map((n) => (n.id === id ? summary : n)) }
              : current,
          ),
      ),
    [request],
  );

  const flash = useCallback((message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice((m) => (m === message ? '' : m)), 4200);
  }, []);
  const fail = useCallback(
    (error: unknown) => flash(error instanceof Error ? error.message : 'Something went wrong.'),
    [flash],
  );

  const load = useCallback(async () => {
    try {
      setIndex(await request<NotesIndex>('/api/notes'));
      setLoadError('');
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Your notes could not be loaded.');
    }
  }, [request]);

  const open = useCallback(
    async (id: string) => {
      editor.current?.flush();
      setTabs((current) => (current.includes(id) ? current : [...current, id].slice(-8)));
      setActiveId(id);
      setTreeOpen(false);
      setView('notes');
      if (!opened[id])
        try {
          const note = await request<Note>(`/api/notes?id=${encodeURIComponent(id)}`);
          setOpened((current) => ({ ...current, [id]: note }));
        } catch (error) {
          fail(error);
          setTabs((current) => current.filter((t) => t !== id));
          setActiveId((current) => (current === id ? null : current));
        }
    },
    [opened, request, fail],
  );

  // First load: the index, saved tabs and the page in the address bar.
  useEffect(() => {
    load();
  }, [load]);
  const restored = useRef(false);
  useEffect(() => {
    if (!index || restored.current) return;
    restored.current = true;
    let saved: { tabs?: string[]; closed?: string[] } = {};
    try {
      saved = JSON.parse(localStorage.getItem(storeKey) ?? '{}');
    } catch {}
    const exists = (id: string) => index.notes.some((n) => n.id === id && !n.trashedAt);
    const fromUrl = new URLSearchParams(window.location.search).get('note');
    const keep = (saved.tabs ?? []).filter(exists);
    setTabs(keep);
    setClosed(saved.closed ?? []);
    const first = fromUrl && exists(fromUrl) ? fromUrl : keep.at(-1);
    if (first) open(first);
  }, [index, open, storeKey]);
  useEffect(() => {
    if (!restored.current) return;
    try {
      localStorage.setItem(storeKey, JSON.stringify({ tabs, closed }));
    } catch {}
  }, [tabs, closed, storeKey]);
  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeId) url.searchParams.set('note', activeId);
    else url.searchParams.delete('note');
    window.history.replaceState(null, '', url);
  }, [activeId]);

  // Content search runs on the server once two characters are typed.
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setHits([]);
      return;
    }
    const id = window.setTimeout(() => {
      request<NoteSearchHit[]>(`/api/notes?q=${encodeURIComponent(q)}`)
        .then(setHits)
        .catch(() => setHits([]));
    }, 250);
    return () => window.clearTimeout(id);
  }, [query, request]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest?.(
        'input,textarea,[contenteditable="true"]',
      );
      if (e.key === '/' && !typing) {
        e.preventDefault();
        searchInput.current?.focus();
      }
      if (e.key === 'Escape') setMenu(null);
    };
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.nb-menu, .nb-menu-btn')) setMenu(null);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, []);

  const notes = useMemo(() => (index?.notes ?? []).filter((n) => !n.trashedAt), [index]);
  const trash = useMemo(() => (index?.notes ?? []).filter((n) => n.trashedAt), [index]);
  const notebooks = useMemo(() => index?.notebooks ?? [], [index]);
  const titles = useMemo(() => notes.map((n) => n.title), [notes]);
  const active = notes.find((n) => n.id === activeId) ?? null;
  const activeNote = activeId ? opened[activeId] : undefined;
  const activeBook = notebooks.find((b) => b.id === active?.notebookId);
  const liveHtml = live?.id === activeId ? live.html : (activeNote?.html ?? '');
  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    notes.forEach((n) => n.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 24);
  }, [notes]);

  const resolve = useCallback(
    (title: string) =>
      notes.find((n) => sameTitle(n.title, title) && n.notebookId === active?.notebookId) ??
      notes.find((n) => sameTitle(n.title, title)),
    [notes, active?.notebookId],
  );
  const backlinks = useMemo(
    () =>
      active
        ? notes.filter((n) => n.id !== active.id && n.links.some((l) => sameTitle(l, active.title)))
        : [],
    [notes, active],
  );
  const graph = useMemo(() => {
    if (!active) return [];
    const items: { title: string; kind: 'out' | 'back' | 'both' | 'missing' }[] = [];
    for (const link of active.links) {
      const target = resolve(link);
      items.push({
        title: target?.title ?? link,
        kind: !target ? 'missing' : backlinks.some((b) => b.id === target.id) ? 'both' : 'out',
      });
    }
    for (const back of backlinks)
      if (!items.some((i) => sameTitle(i.title, back.title)))
        items.push({ title: back.title, kind: 'back' });
    return items;
  }, [active, backlinks, resolve]);

  async function createPage(
    notebookId: string,
    section: string,
    title = 'Untitled',
    html?: string,
  ) {
    setMenu(null);
    try {
      const note = await request<Note>('/api/notes', {
        method: 'POST',
        body: JSON.stringify({ action: 'createNote', notebookId, section, title, html }),
      });
      setOpened((current) => ({ ...current, [note.id]: note }));
      setIndex((current) =>
        current
          ? {
              ...current,
              notes: [...current.notes, note],
              notebooks: current.notebooks.map((b) =>
                b.id === notebookId && section && !b.sections.includes(section)
                  ? { ...b, sections: [...b.sections, section] }
                  : b,
              ),
            }
          : current,
      );
      setClosed((c) => c.filter((k) => k !== notebookId && k !== `${notebookId}/${section}`));
      await open(note.id);
      window.setTimeout(() => {
        const input = document.querySelector<HTMLInputElement>('.nb-title');
        if (title === 'Untitled') input?.select();
      }, 60);
    } catch (error) {
      fail(error);
    }
  }
  async function createNotebook() {
    try {
      const notebook = await request<Notebook>('/api/notes', {
        method: 'POST',
        body: JSON.stringify({
          action: 'createNotebook',
          title: 'New notebook',
          color: notebookColors[notebooks.length % 6],
        }),
      });
      setIndex((current) =>
        current ? { ...current, notebooks: [...current.notebooks, notebook] } : current,
      );
      setEditing({ kind: 'notebook', id: notebook.id });
    } catch (error) {
      fail(error);
    }
  }
  async function notebookAction(body: Record<string, unknown>) {
    setMenu(null);
    try {
      const notebook = await request<Notebook>('/api/notes', {
        method: 'POST',
        body: JSON.stringify({ action: 'updateNotebook', ...body }),
      });
      setIndex((current) =>
        current
          ? {
              ...current,
              notebooks: current.notebooks.map((b) => (b.id === notebook.id ? notebook : b)),
            }
          : current,
      );
      if (body.renameSection || body.removeSection !== undefined) await load();
      return notebook;
    } catch (error) {
      fail(error);
    }
  }
  async function deleteNotebook(book: Notebook) {
    setMenu(null);
    const count = notes.filter((n) => n.notebookId === book.id).length;
    if (
      !window.confirm(
        `Delete “${book.title}”? Its ${count} page${count === 1 ? '' : 's'} move to the trash for 30 days.`,
      )
    )
      return;
    try {
      await request('/api/notes', {
        method: 'POST',
        body: JSON.stringify({ action: 'deleteNotebook', id: book.id }),
      });
      const gone = new Set(notes.filter((n) => n.notebookId === book.id).map((n) => n.id));
      setTabs((t) => t.filter((id) => !gone.has(id)));
      if (activeId && gone.has(activeId)) setActiveId(null);
      await load();
    } catch (error) {
      fail(error);
    }
  }
  function patchSummary(id: string, patch: Partial<NoteSummary>) {
    setIndex((current) =>
      current
        ? { ...current, notes: current.notes.map((n) => (n.id === id ? { ...n, ...patch } : n)) }
        : current,
    );
  }
  async function updatePage(id: string, patch: Record<string, unknown>) {
    setMenu(null);
    try {
      const summary = await request<NoteSummary>('/api/notes', {
        method: 'POST',
        body: JSON.stringify({ action: 'updateNote', id, ...patch }),
      });
      setIndex((current) =>
        current
          ? {
              ...current,
              notes: current.notes.map((n) => (n.id === id ? summary : n)),
              notebooks: current.notebooks.map((b) =>
                b.id === summary.notebookId &&
                summary.section &&
                !b.sections.includes(summary.section)
                  ? { ...b, sections: [...b.sections, summary.section] }
                  : b,
              ),
            }
          : current,
      );
    } catch (error) {
      fail(error);
    }
  }
  async function trashPage(id: string, action: 'trashNote' | 'restoreNote' | 'deleteNote') {
    setMenu(null);
    if (
      action === 'deleteNote' &&
      !window.confirm('Delete this page for good? This cannot be undone.')
    )
      return;
    try {
      await request('/api/notes', { method: 'POST', body: JSON.stringify({ action, id }) });
      if (action !== 'restoreNote') {
        setTabs((t) => t.filter((x) => x !== id));
        if (activeId === id) setActiveId(tabs.filter((x) => x !== id).at(-1) ?? null);
      }
      if (action === 'trashNote')
        flash('Moved to the trash. Restore it from Trash within 30 days.');
      await load();
    } catch (error) {
      fail(error);
    }
  }
  async function emptyTrash() {
    if (
      !window.confirm(
        `Delete ${trash.length} page${trash.length === 1 ? '' : 's'} for good? This cannot be undone.`,
      )
    )
      return;
    try {
      await request('/api/notes', {
        method: 'POST',
        body: JSON.stringify({ action: 'emptyTrash' }),
      });
      await load();
    } catch (error) {
      fail(error);
    }
  }
  function openLink(title: string) {
    const target = resolve(title);
    if (target) open(target.id);
    else if (active) createPage(active.notebookId, active.section, title.slice(0, 120));
  }
  function closeTab(id: string) {
    editor.current?.flush();
    const rest = tabs.filter((t) => t !== id);
    setTabs(rest);
    if (activeId === id) setActiveId(rest.at(-1) ?? null);
  }

  // Drag a page onto a notebook, a section or another page (to sit just above it).
  function onDrop(event: DragEvent, notebookId: string, section: string, before?: NoteSummary) {
    event.preventDefault();
    setDropTarget('');
    const id = event.dataTransfer.getData('text/akoizo-note');
    const note = notes.find((n) => n.id === id);
    if (!note || note.id === before?.id) return;
    const siblings = notes
      .filter((n) => n.notebookId === notebookId && n.section === section && n.id !== id)
      .sort(byPosition);
    let position: number;
    if (before) {
      const at = siblings.findIndex((n) => n.id === before.id);
      const prev = siblings[at - 1];
      position = prev ? (prev.position + before.position) / 2 : before.position - 1;
    } else position = (siblings.at(-1)?.position ?? 0) + 1;
    patchSummary(id, { notebookId, section, position });
    updatePage(id, { notebookId, section, position });
  }
  const dropProps = (key: string, notebookId: string, section: string, before?: NoteSummary) => ({
    onDragOver: (e: DragEvent) => {
      if (!e.dataTransfer.types.includes('text/akoizo-note')) return;
      e.preventDefault();
      setDropTarget(key);
    },
    onDragLeave: () => setDropTarget((t) => (t === key ? '' : t)),
    onDrop: (e: DragEvent) => onDrop(e, notebookId, section, before),
    'data-drop': dropTarget === key || undefined,
  });

  function pageRow(note: NoteSummary) {
    return (
      <li key={note.id} {...dropProps(`p:${note.id}`, note.notebookId, note.section, note)}>
        <button
          type="button"
          className="nb-row"
          draggable
          data-on={note.id === activeId}
          onDragStart={(e) => {
            e.dataTransfer.setData('text/akoizo-note', note.id);
            e.dataTransfer.effectAllowed = 'move';
          }}
          onClick={() => open(note.id)}
          title={note.title}
        >
          <FileText size={13} aria-hidden="true" />
          <span>{note.title}</span>
          {note.pinned && <Pin size={11} aria-label="Pinned" />}
        </button>
        <button
          type="button"
          className="nb-menu-btn"
          aria-label={`Options for ${note.title}`}
          onClick={() =>
            setMenu(
              menu?.kind === 'page' && menu.id === note.id ? null : { kind: 'page', id: note.id },
            )
          }
        >
          <Ellipsis size={14} />
        </button>
        {menu?.kind === 'page' && menu.id === note.id && (
          <div className="nb-menu" role="menu">
            <button
              type="button"
              role="menuitem"
              onClick={() => updatePage(note.id, { pinned: !note.pinned })}
            >
              {note.pinned ? <PinOff size={14} /> : <Pin size={14} />}{' '}
              {note.pinned ? 'Unpin' : 'Pin to top'}
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenu(null);
                setMoving(note.id);
              }}
            >
              <FolderOpen size={14} /> Move to…
            </button>
            <button
              type="button"
              role="menuitem"
              className="nb-danger"
              onClick={() => trashPage(note.id, 'trashNote')}
            >
              <Trash2 size={14} /> Move to trash
            </button>
          </div>
        )}
      </li>
    );
  }

  function newPageMenu(notebookId: string, section: string) {
    return (
      <div className="nb-menu nb-menu-wide" role="menu">
        <p className="nb-menu-title">New page from</p>
        {noteTemplates.map((template) => (
          <button
            key={template.id}
            type="button"
            role="menuitem"
            onClick={() =>
              createPage(
                notebookId,
                section,
                template.id === 'blank' ? 'Untitled' : template.name,
                template.html,
              )
            }
          >
            <FilePlus2 size={14} />
            <span>
              {template.name}
              <small>{template.description}</small>
            </span>
          </button>
        ))}
      </div>
    );
  }

  function renderTree() {
    const q = query.trim().toLowerCase();
    if (q || tag) {
      const byTitle = notes.filter((n) =>
        tag ? n.tags.includes(tag) : n.title.toLowerCase().includes(q),
      );
      const byText = tag ? [] : hits.filter((h) => !byTitle.some((n) => n.id === h.id));
      return (
        <div className="nb-results" aria-live="polite">
          <p className="nb-side-title">
            {tag ? (
              <>
                <Tag size={12} /> #{tag}
              </>
            ) : (
              <>
                <Search size={12} /> Results
              </>
            )}
            <button
              type="button"
              className="nb-link-btn"
              onClick={() => {
                setQuery('');
                setTag(null);
              }}
            >
              Clear
            </button>
          </p>
          {!byTitle.length && !byText.length && <p className="nb-empty-line">No pages match.</p>}
          <ul className="nb-pages">
            {[
              ...byTitle.map((n) => ({ note: n, snippet: n.excerpt })),
              ...byText.flatMap((h) => {
                const note = notes.find((n) => n.id === h.id);
                return note ? [{ note, snippet: h.snippet }] : [];
              }),
            ].map(({ note, snippet }) => (
              <li key={note.id}>
                <button
                  type="button"
                  className="nb-result"
                  data-on={note.id === activeId}
                  onClick={() => open(note.id)}
                >
                  <b>{note.title}</b>
                  <small>
                    {notebooks.find((b) => b.id === note.notebookId)?.title}
                    {note.section ? ` / ${note.section}` : ''}
                  </small>
                  {snippet && <span>{snippet.slice(0, 140)}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    const pinned = notes.filter((n) => n.pinned);
    const recent = [...notes].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5);
    const toggle = (key: string) =>
      setClosed((c) => (c.includes(key) ? c.filter((k) => k !== key) : [...c, key]));
    return (
      <>
        {pinned.length > 0 && (
          <div className="nb-group">
            <p className="nb-side-title">
              <Pin size={12} /> Pinned
            </p>
            <ul className="nb-pages">{pinned.map(pageRow)}</ul>
          </div>
        )}
        {recent.length > 0 && (
          <div className="nb-group">
            <button
              type="button"
              className="nb-side-title nb-side-toggle"
              aria-expanded={!closed.includes('recent')}
              onClick={() => toggle('recent')}
            >
              <Clock3 size={12} /> Recent <ChevronDown size={12} />
            </button>
            {!closed.includes('recent') && (
              <ul className="nb-pages">
                {recent.map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      className="nb-row"
                      data-on={n.id === activeId}
                      onClick={() => open(n.id)}
                    >
                      <FileText size={13} aria-hidden="true" />
                      <span>{n.title}</span>
                      <small>{ago(n.updatedAt)}</small>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div className="nb-group">
          <p className="nb-side-title">
            <BookOpen size={12} /> Notebooks
            <button
              type="button"
              className="nb-icon-btn"
              aria-label="New notebook"
              title="New notebook"
              onClick={createNotebook}
            >
              <FolderPlus size={14} />
            </button>
          </p>
          {notebooks.map((book) => {
            const pages = notes.filter((n) => n.notebookId === book.id).sort(byPosition);
            const sections = [
              ...book.sections,
              ...[...new Set(pages.map((p) => p.section))].filter(
                (s) => s && !book.sections.includes(s),
              ),
            ];
            const isClosed = closed.includes(book.id);
            return (
              <div className="nb-book" key={book.id} data-slot={book.color}>
                <div className="nb-book-head" {...dropProps(`b:${book.id}`, book.id, '')}>
                  <button
                    type="button"
                    className="nb-book-toggle"
                    aria-expanded={!isClosed}
                    onClick={() => toggle(book.id)}
                  >
                    <ChevronDown size={13} aria-hidden="true" />
                    <i aria-hidden="true" />
                    {editing?.kind === 'notebook' && editing.id === book.id ? null : (
                      <span>{book.title}</span>
                    )}
                    {!(editing?.kind === 'notebook' && editing.id === book.id) && (
                      <small>{pages.length}</small>
                    )}
                  </button>
                  {editing?.kind === 'notebook' && editing.id === book.id && (
                    <input
                      className="nb-inline-input"
                      autoFocus
                      defaultValue={book.title}
                      aria-label="Notebook name"
                      onFocus={(e) => e.target.select()}
                      onBlur={(e) => {
                        setEditing(null);
                        if (e.target.value.trim() && e.target.value !== book.title)
                          notebookAction({ id: book.id, title: e.target.value });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                        if (e.key === 'Escape') setEditing(null);
                      }}
                    />
                  )}
                  <button
                    type="button"
                    className="nb-menu-btn"
                    aria-label={`New page in ${book.title}`}
                    title="New page"
                    onClick={() => setMenu({ kind: 'new', notebookId: book.id, section: '' })}
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    type="button"
                    className="nb-menu-btn"
                    aria-label={`Options for ${book.title}`}
                    onClick={() =>
                      setMenu(
                        menu?.kind === 'notebook' && menu.id === book.id
                          ? null
                          : { kind: 'notebook', id: book.id },
                      )
                    }
                  >
                    <Ellipsis size={14} />
                  </button>
                  {menu?.kind === 'new' &&
                    menu.notebookId === book.id &&
                    !menu.section &&
                    newPageMenu(book.id, '')}
                  {menu?.kind === 'notebook' && menu.id === book.id && (
                    <div className="nb-menu" role="menu">
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setMenu(null);
                          setEditing({ kind: 'notebook', id: book.id });
                        }}
                      >
                        Rename
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={async () => {
                          const name = window.prompt('Name the new section');
                          if (name?.trim()) await notebookAction({ id: book.id, addSection: name });
                        }}
                      >
                        <FolderPlus size={14} /> Add section
                      </button>
                      {book.eventId && index?.lessonEvents.some((e) => e.id === book.eventId) && (
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setMenu(null);
                            setBuilding(true);
                          }}
                        >
                          <WandSparkles size={14} /> Build notes from lessons
                        </button>
                      )}
                      <div className="nb-swatches" role="group" aria-label="Notebook colour">
                        {notebookColors.map((c) => (
                          <button
                            key={c}
                            type="button"
                            data-slot={c}
                            aria-label={`Colour ${c}`}
                            aria-pressed={book.color === c}
                            onClick={() =>
                              notebookAction({ id: book.id, color: c as NotebookColor })
                            }
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        role="menuitem"
                        className="nb-danger"
                        onClick={() => deleteNotebook(book)}
                      >
                        <Trash2 size={14} /> Delete notebook
                      </button>
                    </div>
                  )}
                </div>
                {!isClosed && (
                  <div className="nb-book-body">
                    <ul className="nb-pages">{pages.filter((p) => !p.section).map(pageRow)}</ul>
                    {sections.map((section) => {
                      const key = `${book.id}/${section}`;
                      const inSection = pages.filter((p) => p.section === section);
                      const sectionClosed = closed.includes(key);
                      const isEditing =
                        editing?.kind === 'section' &&
                        editing.id === book.id &&
                        editing.section === section;
                      return (
                        <div className="nb-section" key={key}>
                          <div
                            className="nb-section-head"
                            {...dropProps(`s:${key}`, book.id, section)}
                          >
                            {isEditing ? (
                              <input
                                className="nb-inline-input"
                                autoFocus
                                defaultValue={section}
                                aria-label="Section name"
                                onFocus={(e) => e.target.select()}
                                onBlur={(e) => {
                                  setEditing(null);
                                  if (e.target.value.trim() && e.target.value !== section)
                                    notebookAction({
                                      id: book.id,
                                      renameSection: { from: section, to: e.target.value },
                                    });
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                                  if (e.key === 'Escape') setEditing(null);
                                }}
                              />
                            ) : (
                              <button
                                type="button"
                                className="nb-section-toggle"
                                aria-expanded={!sectionClosed}
                                onClick={() => toggle(key)}
                                title={section}
                              >
                                <ChevronDown size={12} aria-hidden="true" />
                                {sectionClosed ? (
                                  <Folder size={13} aria-hidden="true" />
                                ) : (
                                  <FolderOpen size={13} aria-hidden="true" />
                                )}
                                <span>{section}</span>
                                <small>{inSection.length}</small>
                              </button>
                            )}
                            <button
                              type="button"
                              className="nb-menu-btn"
                              aria-label={`New page in ${section}`}
                              title="New page"
                              onClick={() => setMenu({ kind: 'new', notebookId: book.id, section })}
                            >
                              <Plus size={13} />
                            </button>
                            <button
                              type="button"
                              className="nb-menu-btn"
                              aria-label={`Options for ${section}`}
                              onClick={() =>
                                setMenu(
                                  menu?.kind === 'section' &&
                                    menu.section === section &&
                                    menu.id === book.id
                                    ? null
                                    : { kind: 'section', id: book.id, section },
                                )
                              }
                            >
                              <Ellipsis size={13} />
                            </button>
                            {menu?.kind === 'new' &&
                              menu.notebookId === book.id &&
                              menu.section === section &&
                              newPageMenu(book.id, section)}
                            {menu?.kind === 'section' &&
                              menu.id === book.id &&
                              menu.section === section && (
                                <div className="nb-menu" role="menu">
                                  <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() => {
                                      setMenu(null);
                                      setEditing({ kind: 'section', id: book.id, section });
                                    }}
                                  >
                                    Rename section
                                  </button>
                                  <button
                                    type="button"
                                    role="menuitem"
                                    className="nb-danger"
                                    onClick={() =>
                                      notebookAction({ id: book.id, removeSection: section })
                                    }
                                  >
                                    Remove section (keep pages)
                                  </button>
                                </div>
                              )}
                          </div>
                          {!sectionClosed && (
                            <ul className="nb-pages nb-pages-nested">
                              {inSection.map(pageRow)}
                              {!inSection.length && (
                                <li className="nb-empty-line">Drop pages here</li>
                              )}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                    {!pages.length && !sections.length && (
                      <p className="nb-empty-line">No pages yet.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {tags.length > 0 && (
          <div className="nb-group">
            <p className="nb-side-title">
              <Tag size={12} /> Tags
            </p>
            <div className="nb-tags">
              {tags.map(([t, n]) => (
                <button key={t} type="button" onClick={() => setTag(t)}>
                  #{t} <small>{n}</small>
                </button>
              ))}
            </div>
          </div>
        )}
        <button
          type="button"
          className="nb-trash-link"
          data-on={view === 'trash'}
          onClick={() => {
            setView('trash');
            setTreeOpen(false);
          }}
        >
          <Trash2 size={13} /> Trash <small>{trash.length}</small>
        </button>
      </>
    );
  }

  if (loadError)
    return (
      <main id="main" className="nb-page">
        <div className="nb-center">
          <h1>Your notes didn’t load.</h1>
          <p role="alert">{loadError}</p>
          <button type="button" className="vx-btn" onClick={load}>
            Try again
          </button>
        </div>
      </main>
    );
  if (!index)
    return (
      <main id="main" className="nb-page">
        <p className="nb-center" role="status">
          Opening your notebook…
        </p>
      </main>
    );

  const words = wordCount(noteText(liveHtml));
  const headings = noteHeadings(liveHtml);
  const builtEvents = new Set(notebooks.map((b) => b.eventId).filter(Boolean));

  return (
    <main id="main" className="nb-page">
      <div className="nb-app" data-tree={treeOpen}>
        <div className="nb-bar">
          <span className="vx-lights" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <button
            type="button"
            className="nb-icon-btn nb-tree-btn"
            aria-label="Show notebooks"
            aria-expanded={treeOpen}
            onClick={() => setTreeOpen(!treeOpen)}
          >
            <PanelLeft size={16} />
          </button>
          <div className="nb-tabs" role="tablist" aria-label="Open pages">
            {tabs.map((id) => {
              const note = notes.find((n) => n.id === id);
              if (!note) return null;
              return (
                <span
                  key={id}
                  className="nb-tab"
                  data-on={id === activeId && view === 'notes'}
                  role="presentation"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={id === activeId}
                    onClick={() => open(id)}
                    title={note.title}
                  >
                    <FileText size={12} aria-hidden="true" />
                    <span>{note.title}</span>
                  </button>
                  <button
                    type="button"
                    className="nb-tab-close"
                    aria-label={`Close ${note.title}`}
                    onClick={() => closeTab(id)}
                  >
                    <X size={12} />
                  </button>
                </span>
              );
            })}
          </div>
          <button
            type="button"
            className="nb-bar-action"
            onClick={() => setBuilding(true)}
            title="Build notebooks from your lessons"
          >
            <WandSparkles size={14} /> <span>Auto-build</span>
          </button>
        </div>

        <div className="nb-body">
          <aside className="nb-tree" aria-label="Notebooks">
            <label className="nb-search">
              <Search size={14} aria-hidden="true" />
              <span className="sr-only">Search notes</span>
              <input
                ref={searchInput}
                type="search"
                placeholder="Search notes"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setTag(null);
                }}
              />
              <kbd>/</kbd>
            </label>
            {renderTree()}
          </aside>

          <section className="nb-main" aria-label="Page">
            {view === 'trash' ? (
              <div className="nb-trash">
                <p className="vx-crumb">Notes / Trash</p>
                <h1 className="nb-heading">Trash</h1>
                <p className="nb-muted">
                  Pages stay here for 30 days, then they are deleted for good.
                </p>
                {trash.length ? (
                  <>
                    <ul className="nb-trash-list">
                      {trash.map((n) => (
                        <li key={n.id}>
                          <div>
                            <b>{n.title}</b>
                            <small>
                              Deleted {ago(n.trashedAt!)} · {n.words} words
                            </small>
                          </div>
                          <button
                            type="button"
                            className="nb-chip"
                            onClick={() => trashPage(n.id, 'restoreNote')}
                          >
                            <RotateCcw size={13} /> Restore
                          </button>
                          <button
                            type="button"
                            className="nb-chip nb-danger"
                            onClick={() => trashPage(n.id, 'deleteNote')}
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button type="button" className="nb-chip nb-danger" onClick={emptyTrash}>
                      Empty trash
                    </button>
                  </>
                ) : (
                  <p className="nb-empty-line">The trash is empty.</p>
                )}
              </div>
            ) : active && activeNote ? (
              <div className="nb-doc" key={active.id}>
                <div className="nb-doc-head">
                  <p className="vx-crumb">
                    {activeBook?.title ?? 'Notes'}
                    {active.section ? ` / ${active.section}` : ''} / {active.title}
                  </p>
                  <div className="nb-doc-actions">
                    <button
                      type="button"
                      className="nb-icon-btn"
                      aria-pressed={active.pinned}
                      title={active.pinned ? 'Unpin' : 'Pin to top'}
                      aria-label={active.pinned ? 'Unpin page' : 'Pin page'}
                      onClick={() => updatePage(active.id, { pinned: !active.pinned })}
                    >
                      {active.pinned ? <PinOff size={15} /> : <Pin size={15} />}
                    </button>
                    <button
                      type="button"
                      className="nb-icon-btn"
                      title="Move to…"
                      aria-label="Move page"
                      onClick={() => setMoving(active.id)}
                    >
                      <FolderOpen size={15} />
                    </button>
                    <button
                      type="button"
                      className="nb-icon-btn"
                      title="Move to trash"
                      aria-label="Move page to trash"
                      onClick={() => trashPage(active.id, 'trashNote')}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                <dl className="vx-props nb-props" data-slot={activeBook?.color}>
                  <div>
                    <dt>notebook</dt>
                    <dd>
                      <i /> {activeBook?.title}
                    </dd>
                  </div>
                  {active.source && (
                    <div>
                      <dt>source</dt>
                      <dd>
                        <Link className="nb-source" href={active.source.href}>
                          {kindLabel[active.source.kind]} · {active.source.label}{' '}
                          <ArrowUpRight size={12} />
                        </Link>
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt>updated</dt>
                    <dd>{ago(active.updatedAt)}</dd>
                  </div>
                  {active.tags.length > 0 && (
                    <div>
                      <dt>tags</dt>
                      <dd className="nb-tags-inline">
                        {active.tags.map((t) => (
                          <button key={t} type="button" onClick={() => setTag(t)}>
                            #{t}
                          </button>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
                <input
                  className="nb-title"
                  aria-label="Page title"
                  value={active.title}
                  maxLength={120}
                  onChange={(e) => {
                    const title = e.target.value;
                    patchSummary(active.id, { title });
                    window.clearTimeout(titleTimer.current);
                    titleTimer.current = window.setTimeout(() => {
                      saver.save(active.id, { title: title.trim() || 'Untitled' });
                      // Other pages' [[links]] are renamed on the server; read them fresh next time.
                      setOpened((current) => ({ [active.id]: current[active.id] }));
                    }, 700);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && editor.current?.focus()}
                />
                <NoteEditor
                  key={active.id}
                  ref={editor}
                  html={activeNote.html}
                  titles={titles}
                  label={`${active.title} page`}
                  onChange={(html) => {
                    setLive({ id: active.id, html });
                    setOpened((current) => ({
                      ...current,
                      [active.id]: { ...current[active.id], html },
                    }));
                    saver.save(active.id, { html });
                  }}
                  onOpenLink={openLink}
                  onImage={(imageId, data) =>
                    request('/api/notes', {
                      method: 'POST',
                      body: JSON.stringify({ action: 'image', id: active.id, imageId, data }),
                    }).catch(fail)
                  }
                  onError={flash}
                />
              </div>
            ) : (
              <Welcome
                hasNotes={notes.length > 0}
                recent={[...notes]
                  .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
                  .slice(0, 6)}
                onOpen={open}
                onBuild={() => setBuilding(true)}
                onNotebook={createNotebook}
                onPage={async () => {
                  let book = notebooks[0];
                  if (!book) {
                    try {
                      book = await request<Notebook>('/api/notes', {
                        method: 'POST',
                        body: JSON.stringify({ action: 'createNotebook', title: 'My notebook' }),
                      });
                      setIndex((current) =>
                        current ? { ...current, notebooks: [...current.notebooks, book] } : current,
                      );
                    } catch (error) {
                      return fail(error);
                    }
                  }
                  createPage(book.id, '');
                }}
                canBuild={!!index.lessonEvents.length}
                notebooks={notebooks}
              />
            )}
          </section>

          <aside className="nb-side" aria-label="Page links">
            {active && view === 'notes' ? (
              <>
                {headings.length > 0 && (
                  <>
                    <p className="nb-side-title">
                      <ListTree size={12} /> Outline
                    </p>
                    <ol className="nb-outline">
                      {headings.map((h, i) => (
                        <li key={i} data-level={h.level}>
                          <button
                            type="button"
                            onClick={() =>
                              document
                                .querySelectorAll('.nb-content h1, .nb-content h2, .nb-content h3')
                                [i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }
                          >
                            {h.text}
                          </button>
                        </li>
                      ))}
                    </ol>
                  </>
                )}
                <p className="nb-side-title">
                  <Network size={12} /> Local graph
                </p>
                {graph.length ? (
                  <LocalGraph title={active.title} links={graph} onOpen={openLink} />
                ) : (
                  <p className="nb-hint">
                    Type <kbd>[[</kbd> in the page to link another page. Links and backlinks appear
                    here.
                  </p>
                )}
                <p className="nb-side-title">
                  <Link2 size={12} /> Backlinks <small>{backlinks.length}</small>
                </p>
                {backlinks.length ? (
                  <ul className="nb-backlinks">
                    {backlinks.map((b) => (
                      <li key={b.id}>
                        <button type="button" onClick={() => open(b.id)}>
                          <span>{b.title}</span>
                          <small>{notebooks.find((x) => x.id === b.notebookId)?.title}</small>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="nb-hint">No other page links here yet.</p>
                )}
              </>
            ) : (
              <p className="nb-hint">Open a page to see its outline, links and backlinks.</p>
            )}
          </aside>
        </div>

        <div className="nb-status" role="status" aria-live="polite">
          <span data-state={save.state}>
            <i />{' '}
            {save.state === 'saving'
              ? 'Saving…'
              : save.state === 'error'
                ? `Not saved: ${save.message ?? 'retrying'}`
                : 'Saved'}
          </span>
          {notice && <span className="nb-notice">{notice}</span>}
          {active && view === 'notes' && <span>{words} words</span>}
          <span>{notes.length} pages</span>
        </div>
      </div>

      {building && (
        <BuildDialog
          events={index.lessonEvents}
          built={builtEvents as Set<string>}
          onClose={() => setBuilding(false)}
          onDone={async (message) => {
            await load();
            flash(message);
          }}
        />
      )}
      {moving && (
        <MoveDialog
          note={notes.find((n) => n.id === moving)!}
          notebooks={notebooks}
          onClose={() => setMoving(null)}
          onMove={(notebookId, section) => {
            setMoving(null);
            const last = notes
              .filter((n) => n.notebookId === notebookId && n.section === section)
              .reduce((max, n) => Math.max(max, n.position), 0);
            updatePage(moving, { notebookId, section, position: last + 1 });
          }}
        />
      )}
    </main>
  );
}

function Welcome({
  hasNotes,
  recent,
  onOpen,
  onBuild,
  onNotebook,
  onPage,
  canBuild,
  notebooks,
}: {
  hasNotes: boolean;
  recent: NoteSummary[];
  onOpen: (id: string) => void;
  onBuild: () => void;
  onNotebook: () => void;
  onPage: () => void;
  canBuild: boolean;
  notebooks: Notebook[];
}) {
  return (
    <div className="nb-welcome">
      <p className="vx-crumb">akoizo / notes</p>
      <h1 className="nb-heading">
        Write it in <em>your</em> words.
      </h1>
      <p className="nb-muted">
        Notebooks for every event, with sections and pages. Highlight, paste screenshots and
        diagrams, tick off checklists, and link ideas with <kbd>[[</kbd>. Open a lesson, practice
        test or lab and the Notes tab on the right keeps a page for it.
      </p>
      <div className="nb-welcome-actions">
        <button type="button" className="vx-btn" onClick={onPage}>
          <FilePlus2 size={16} /> New page
        </button>
        {canBuild && (
          <button type="button" className="vx-btn vx-btn-ghost" onClick={onBuild}>
            <WandSparkles size={16} /> Build notes from my lessons
          </button>
        )}
        <button type="button" className="vx-btn vx-btn-ghost" onClick={onNotebook}>
          <FolderPlus size={16} /> New notebook
        </button>
      </div>
      {hasNotes ? (
        <>
          <p className="nb-side-title">
            <Clock3 size={12} /> Pick up where you left off
          </p>
          <div className="nb-cards">
            {recent.map((n) => (
              <button
                key={n.id}
                type="button"
                className="nb-card"
                data-slot={notebooks.find((b) => b.id === n.notebookId)?.color}
                onClick={() => onOpen(n.id)}
              >
                <small>
                  <i /> {notebooks.find((b) => b.id === n.notebookId)?.title}
                </small>
                <b>{n.title}</b>
                <span>{n.excerpt || 'Empty page'}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <ul className="nb-tips">
          <li>
            <b>Auto-build</b> turns an event’s lessons into a notebook: one page per lesson with key
            ideas, highlighted terms and self-check questions.
          </li>
          <li>
            <b>Shortcuts</b>: <kbd>#</kbd> heading, <kbd>-</kbd> list, <kbd>[]</kbd> checklist,{' '}
            <kbd>&gt;</kbd> quote, <kbd>!</kbd> key idea, then a space.
          </li>
          <li>
            <b>Highlight</b> with <kbd>Ctrl Shift H</kbd>, and paste images straight from your
            clipboard.
          </li>
        </ul>
      )}
    </div>
  );
}

function BuildDialog({
  events,
  built,
  onClose,
  onDone,
}: {
  events: { id: string; name: string }[];
  built: Set<string>;
  onClose: () => void;
  onDone: (message: string) => Promise<void>;
}) {
  const { request } = useAuth();
  const [chosen, setChosen] = useState<string[]>(() =>
    events.filter((e) => built.has(e.id)).map((e) => e.id),
  );
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const run = async () => {
    setError('');
    let created = 0;
    let filled = 0;
    for (const [i, id] of chosen.entries()) {
      setProgress(
        `Building ${events.find((e) => e.id === id)?.name} (${i + 1} of ${chosen.length})…`,
      );
      try {
        const result = await request<{ created: number; filled: number }>('/api/notes', {
          method: 'POST',
          body: JSON.stringify({ action: 'generate', eventId: id }),
        });
        created += result.created;
        filled += result.filled;
      } catch (e) {
        setError(e instanceof Error ? e.message : 'A notebook could not be built.');
        setProgress('');
        return;
      }
    }
    setProgress('');
    await onDone(
      created || filled
        ? `Added ${created} page${created === 1 ? '' : 's'}${filled ? ` and filled ${filled}` : ''}.`
        : 'Those notebooks are already complete.',
    );
    onClose();
  };
  return (
    <div
      className="nb-dialog-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && !progress && onClose()}
    >
      <div className="nb-dialog" role="dialog" aria-modal="true" aria-labelledby="nb-build-title">
        <button
          type="button"
          className="nb-icon-btn nb-dialog-close"
          aria-label="Close"
          onClick={onClose}
          disabled={!!progress}
        >
          <X size={16} />
        </button>
        <p className="vx-crumb">
          <WandSparkles size={12} /> Auto-build
        </p>
        <h2 id="nb-build-title">Build notebooks from your lessons</h2>
        <p className="nb-muted">
          Each event gets a notebook with a section per unit, a page per lesson (key ideas,
          highlighted key terms, a worked example and self-check questions), unit pages that link it
          together and a glossary. Pages you have already written in are never changed.
        </p>
        <div className="nb-event-grid">
          {events.map((event) => (
            <label key={event.id} className="nb-event-option">
              <input
                type="checkbox"
                checked={chosen.includes(event.id)}
                onChange={(e) =>
                  setChosen((c) =>
                    e.target.checked ? [...c, event.id] : c.filter((x) => x !== event.id),
                  )
                }
              />
              <span>{event.name}</span>
              {built.has(event.id) && <small>has notebook</small>}
            </label>
          ))}
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="nb-dialog-actions">
          <span role="status">{progress}</span>
          <button
            type="button"
            className="vx-btn vx-btn-ghost"
            onClick={onClose}
            disabled={!!progress}
          >
            Cancel
          </button>
          <button
            type="button"
            className="vx-btn"
            onClick={run}
            disabled={!chosen.length || !!progress}
          >
            <WandSparkles size={15} /> Build {chosen.length || ''} notebook
            {chosen.length === 1 ? '' : 's'}
          </button>
        </div>
      </div>
    </div>
  );
}

function MoveDialog({
  note,
  notebooks,
  onClose,
  onMove,
}: {
  note: NoteSummary;
  notebooks: Notebook[];
  onClose: () => void;
  onMove: (notebookId: string, section: string) => void;
}) {
  const [target, setTarget] = useState(`${note.notebookId}|${note.section}`);
  return (
    <div
      className="nb-dialog-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        className="nb-dialog nb-dialog-small"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nb-move-title"
        onSubmit={(e) => {
          e.preventDefault();
          const [notebookId, ...rest] = target.split('|');
          onMove(notebookId, rest.join('|'));
        }}
      >
        <h2 id="nb-move-title">Move “{note.title}”</h2>
        <label className="nb-field">
          <span>Notebook and section</span>
          <select value={target} onChange={(e) => setTarget(e.target.value)} autoFocus>
            {notebooks.map((book) => (
              <optgroup key={book.id} label={book.title}>
                <option value={`${book.id}|`}>{book.title} (no section)</option>
                {book.sections.map((section) => (
                  <option key={section} value={`${book.id}|${section}`}>
                    {book.title} / {section}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <div className="nb-dialog-actions">
          <button type="button" className="vx-btn vx-btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="vx-btn">
            Move
          </button>
        </div>
      </form>
    </div>
  );
}
