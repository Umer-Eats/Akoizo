'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import {
  BookOpen,
  Download,
  FileText,
  Globe2,
  LoaderCircle,
  Printer,
  Sparkles,
  Upload,
  X,
} from 'lucide-react';
import { useAuth, authMessage, RequestError } from './auth-context';
import { binderContentPages, binderEvents, binderRecommendations } from '@/lib/binders';
import { binderDocument, binderPalette, fitBinderDocument } from '@/lib/binder-document';
import type { Binder, BinderCard, BinderLibrary } from '@/lib/binder-types';
import type { SheetLevel, SheetUpload } from '@/lib/cheatsheet-types';
import './cheatsheets.css';
import './binders.css';

const fileTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];
async function uploadFile(file: File): Promise<SheetUpload> {
  const mime =
    file.type ||
    (/\.pdf$/i.test(file.name)
      ? 'application/pdf'
      : /\.png$/i.test(file.name)
        ? 'image/png'
        : /\.jpe?g$/i.test(file.name)
          ? 'image/jpeg'
          : /\.webp$/i.test(file.name)
            ? 'image/webp'
            : '');
  if (!fileTypes.includes(mime) || !file.size || file.size > 2_000_000)
    throw new Error('Choose PDFs, PNG, JPEG, or WebP images up to 2 MB each.');
  return { name: file.name.slice(0, 120), mime, data: (await dataUrl(file)).split(',')[1] };
}
function dataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not read a file.'));
    reader.readAsDataURL(blob);
  });
}
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function Binders({ eventId }: { eventId?: string }) {
  const { request, profile } = useAuth();
  const event = binderEvents.find((e) => e.id === eventId),
    recommendation = eventId ? binderRecommendations[eventId] : null;
  const [title, setTitle] = useState(''),
    [notes, setNotes] = useState(''),
    [level, setLevel] = useState<SheetLevel>('national');
  const [pageCount, setPageCount] = useState(recommendation?.suggested ?? 50);
  const [uploads, setUploads] = useState<SheetUpload[]>([]),
    [reading, setReading] = useState(false);
  const [filter, setFilter] = useState(eventId ?? '');
  const [library, setLibrary] = useState<BinderLibrary>({
    binders: [],
    jobs: [],
    nextCursor: null,
  });
  const [loading, setLoading] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [retrying, setRetrying] = useState(0);
  const [job, setJob] = useState<BinderCard | null>(null),
    [binder, setBinder] = useState<Binder | null>(null);
  const [html, setHtml] = useState(''),
    [ready, setReady] = useState(false),
    [opening, setOpening] = useState(''),
    [exporting, setExporting] = useState('');
  const [fitError, setFitError] = useState('');
  const frame = useRef<HTMLIFrameElement>(null),
    active = useRef(true),
    running = useRef(false),
    pause = useRef(false),
    sequence = useRef(0),
    selected = useRef('');
  const publishing = useRef(new Set<string>());
  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
      pause.current = true;
    };
  }, []);
  const refresh = useCallback(
    async (append = false, cursor?: string) => {
      const revision = ++sequence.current;
      setLoading(true);
      try {
        const params = new URLSearchParams({
          ...(filter ? { eventId: filter } : {}),
          ...(cursor ? { before: cursor } : {}),
        });
        const result = await request<BinderLibrary>(`/api/binders?${params}`);
        if (active.current && revision === sequence.current)
          setLibrary((old) => ({
            ...result,
            binders: append ? [...old.binders, ...result.binders] : result.binders,
          }));
      } catch (e) {
        if (active.current && revision === sequence.current) setError(authMessage(e));
      } finally {
        if (active.current && revision === sequence.current) setLoading(false);
      }
    },
    [filter, request],
  );
  useEffect(() => {
    void refresh();
    return () => {
      sequence.current++;
    };
  }, [refresh]);
  async function open(id: string) {
    selected.current = id;
    setOpening(id);
    setError('');
    try {
      const next = await request<Binder>(`/api/binders?id=${encodeURIComponent(id)}`);
      if (!active.current || selected.current !== id) return;
      setBinder(next);
      setReady(false);
      setFitError('');
      setHtml(binderDocument(next));
    } catch (e) {
      if (active.current) setError(authMessage(e));
    } finally {
      if (active.current) setOpening('');
    }
  }
  async function share(current: Binder) {
    if (publishing.current.has(current.id)) return;
    publishing.current.add(current.id);
    try {
      const result = await request<Binder>('/api/binders', {
        method: 'POST',
        body: JSON.stringify({ action: 'publish', id: current.id }),
      });
      if (active.current && selected.current === current.id) setBinder(result);
      if (active.current) {
        setJob(null);
        await refresh();
      }
    } catch (e) {
      if (active.current) setError(`Pages are ready, but sharing failed. ${authMessage(e)}`);
    } finally {
      publishing.current.delete(current.id);
    }
  }
  async function checkPages() {
    const doc = frame.current?.contentDocument,
      current = binder;
    if (!doc || !current) return;
    try {
      const fits = await fitBinderDocument(doc);
      if (!active.current || selected.current !== current.id) return;
      if (!fits)
        setFitError(
          'A few very dense pages run past the page edge when printed. Everything is readable on screen and in the HTML download.',
        );
      setReady(true);
      if (current.status === 'ready') void share(current);
    } catch {
      setFitError('The preview could not finish loading. Reopen the binder to retry.');
    }
  }
  async function run(current: BinderCard) {
    if (running.current) return;
    running.current = true;
    pause.current = false;
    setBusy(true);
    setError('');
    setJob(current);
    try {
      let next = current,
        failures = 0;
      while (next.status === 'generating' && !pause.current && active.current) {
        try {
          next = await request<BinderCard>('/api/binders', {
            method: 'POST',
            body: JSON.stringify({ action: 'advance', id: next.id }),
          });
          failures = 0;
          if (active.current) (setJob(next), setRetrying(0));
        } catch (e) {
          // A long binder is a hundred or more requests; one slow answer should not end the run.
          const status = e instanceof RequestError ? e.status : 0;
          if (![0, 502, 503, 504].includes(status) || ++failures > 4) throw e;
          if (active.current) setRetrying(failures);
          await sleep(2500 * failures);
        }
      }
      if (active.current && next.status === 'ready') await open(next.id);
    } catch (e) {
      if (active.current) setError(authMessage(e));
    } finally {
      running.current = false;
      if (active.current) {
        setBusy(false);
        setRetrying(0);
        await refresh();
      }
    }
  }
  async function generate(e: FormEvent) {
    e.preventDefault();
    if (running.current || busy || reading) return;
    setBusy(true);
    setError('');
    try {
      const next = await request<BinderCard>('/api/binders', {
        method: 'POST',
        body: JSON.stringify({
          action: 'create',
          eventId,
          title,
          notes,
          level,
          pageCount,
          uploads,
        }),
      });
      if (active.current) await run(next);
    } catch (e) {
      if (active.current) setError(authMessage(e));
    } finally {
      if (active.current) setBusy(false);
    }
  }
  async function addFiles(files: FileList | null) {
    if (!files) return;
    setReading(true);
    setError('');
    try {
      if (files.length + uploads.length > 6) throw new Error('Choose up to 6 files.');
      const next = [...uploads, ...(await Promise.all(Array.from(files).map(uploadFile)))];
      const bytes = next.reduce((n, u) => n + Math.floor(u.data.length * 0.75), 0);
      if (bytes > 3_000_000) throw new Error('Keep all uploads under 3 MB combined.');
      setUploads(next);
    } catch (e) {
      setError(authMessage(e));
    } finally {
      setReading(false);
    }
  }
  async function cancel(id: string) {
    setError('');
    try {
      await request('/api/binders', {
        method: 'POST',
        body: JSON.stringify({ action: 'cancel', id }),
      });
      if (job?.id === id) setJob(null);
      if (binder?.id === id) {
        selected.current = '';
        setBinder(null);
      }
      await refresh();
    } catch (e) {
      setError(authMessage(e));
    }
  }
  // Photos load lazily in the preview; a printout needs every one of them first.
  async function print() {
    const doc = frame.current?.contentDocument;
    if (!ready || !doc || exporting) return;
    setExporting('print');
    try {
      const images = Array.from(doc.images);
      for (const image of images) image.loading = 'eager';
      await Promise.race([
        Promise.allSettled(images.map((image) => image.decode())),
        sleep(30_000),
      ]);
      frame.current?.contentWindow?.print();
    } finally {
      if (active.current) setExporting('');
    }
  }
  // The download embeds the Commons photos so the file works offline at a tournament.
  async function download() {
    const doc = frame.current?.contentDocument;
    if (!ready || !doc || !binder || exporting) return;
    setExporting('download');
    try {
      const copy = doc.documentElement.cloneNode(true) as HTMLElement;
      const remote = Array.from(copy.querySelectorAll<HTMLImageElement>('img[src^="https:"]'));
      let next = 0;
      await Promise.all(
        Array.from({ length: 6 }, async () => {
          while (next < remote.length) {
            const image = remote[next++];
            try {
              const response = await fetch(image.src, { referrerPolicy: 'no-referrer' });
              if (response.ok) image.src = await dataUrl(await response.blob());
            } catch {
              // Keep the online link; the figure still loads whenever a connection exists.
            }
            image.removeAttribute('loading');
          }
        }),
      );
      const url = URL.createObjectURL(
        new Blob(['<!doctype html>' + copy.outerHTML], { type: 'text/html;charset=utf-8' }),
      );
      const a = document.createElement('a');
      a.href = url;
      a.download = `${binder.eventId}-binder.html`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } finally {
      if (active.current) setExporting('');
    }
  }
  const canCreate = profile?.role === 'student' && profile.division === 'C';
  const jobTotal = job ? binderContentPages(job.pageCount) : 0;
  return (
    <div className="cheatsheets binders">
      {event && recommendation && canCreate && (
        <section className="sheet-create">
          <div className="sheet-intro">
            <span className="sheet-icon">
              <BookOpen size={24} />
            </span>
            <div>
              <span className="eyebrow">A REFERENCE WORTH REACHING FOR</span>
              <h2>Your {event.name} study binder.</h2>
              <p>
                In-depth explanations, worked examples, a labeled diagram and a real photograph on
                nearly every page, and a full table of contents—written by Gemini around the 2027
                Division C rules.
              </p>
            </div>
          </div>
          <div className="binder-color-tabs" aria-hidden="true">
            {['Contents', 'Concepts', 'Diagrams', 'Calculations', 'Identification', 'Practice'].map(
              (t, i) => (
                <span key={t} style={{ background: binderPalette[i] }}>
                  {t}
                </span>
              ),
            )}
          </div>
          <div className="binder-recommendation">
            <strong>
              Recommended for {event.name}: {recommendation.min}–{recommendation.max} pages
            </strong>
            <p>{recommendation.reason}</p>
            <small>
              Study-length guidance, not an official page limit. {recommendation.resources}{' '}
              <a href={`/rules/2027/c/${event.id}.pdf`} target="_blank" rel="noreferrer">
                Read event rules
              </a>
            </small>
          </div>
          <form onSubmit={generate}>
            <fieldset disabled={busy || reading}>
              <div className="sheet-fields">
                <label>
                  Binder title <span>(optional)</span>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={100}
                    placeholder={`${event.name} study binder`}
                  />
                </label>
                <label>
                  Tournament level
                  <select value={level} onChange={(e) => setLevel(e.target.value as SheetLevel)}>
                    <option value="regional">Regional</option>
                    <option value="state">State</option>
                    <option value="national">National</option>
                  </select>
                </label>
              </div>
              <label>
                Number of pages
                <div className="binder-pages">
                  <input
                    type="number"
                    min={10}
                    max={400}
                    step={1}
                    required
                    value={Number.isNaN(pageCount) ? '' : pageCount}
                    onChange={(e) => setPageCount(e.target.valueAsNumber)}
                  />
                  {(
                    [
                      ['Compact', recommendation.min],
                      ['Recommended', recommendation.suggested],
                      ['In depth', recommendation.max],
                    ] as const
                  ).map(([label, pages]) => (
                    <button
                      type="button"
                      key={label}
                      className={pageCount === pages ? 'selected' : ''}
                      aria-pressed={pageCount === pages}
                      onClick={() => setPageCount(pages)}
                    >
                      {label} · {pages}
                    </button>
                  ))}
                </div>
                <small>
                  Any whole number from 10 to 400, including the table of contents. Longer binders
                  go deeper into each topic; a 400-page binder can take half an hour. Progress is
                  saved after every batch.
                </small>
              </label>
              <label>
                Topics or material to emphasize <span>(optional)</span>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={6000}
                  placeholder="Add concepts you find difficult, notes to incorporate, or areas where you want more worked examples."
                />
              </label>
              <div className="sheet-upload">
                <label>
                  <Upload size={18} /> Include your documents and images
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg,.webp"
                    onChange={(e) => {
                      void addFiles(e.target.files);
                      e.target.value = '';
                    }}
                  />
                </label>
                <p>
                  Up to 6 PDFs or images, 2 MB each and 3 MB total. Use readable, unlocked PDFs.
                  Gemini works their information into the matching sections and can place your
                  images on the page.
                </p>
              </div>
              {uploads.length > 0 && (
                <ul className="sheet-files">
                  {uploads.map((u, i) => (
                    <li key={`${i}-${u.name}`}>
                      <FileText size={15} />
                      <span>{u.name}</span>
                      <button
                        type="button"
                        aria-label={`Remove ${u.name}`}
                        onClick={() => setUploads(uploads.filter((_, j) => j !== i))}
                      >
                        <X size={15} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="sheet-sharing">
                <Globe2 size={18} /> Generated binders are shared with all signed-in members across
                every school. Notes and uploads go to Gemini; included content and images become
                part of the shared binder. Only upload material you can share.
              </p>
              <button className="button button-primary" type="submit">
                <Sparkles size={17} /> {busy ? 'Building your binder…' : 'Generate & share binder'}
              </button>
            </fieldset>
          </form>
          <Link className="text-link" href="/dashboard/binders">
            Browse every school’s binders →
          </Link>
        </section>
      )}
      {error && (
        <div role="alert" className="sheet-error">
          {error}
        </div>
      )}
      {job && (
        <section className="binder-progress" aria-live="polite">
          <div>
            <strong>{job.title}</strong>
            <p>
              {job.completedPages
                ? `${job.completedPages} of ${jobTotal} content pages written`
                : job.plannedPages
                  ? `Outlining topics: ${job.plannedPages} of ${jobTotal} pages planned`
                  : 'Planning the sections and table of contents'}{' '}
              ·{' '}
              {retrying
                ? `Gemini was slow to answer; retrying (${retrying} of 4)`
                : busy
                  ? 'Generating with Gemini'
                  : job.status === 'ready'
                    ? 'Ready for layout check'
                    : 'Paused; progress saved'}
            </p>
          </div>
          <progress
            aria-label="Binder generation progress"
            value={job.completedPages}
            max={jobTotal}
          />
          {busy && (
            <button
              className="button button-secondary"
              onClick={() => {
                pause.current = true;
              }}
            >
              Pause after this batch
            </button>
          )}
          <small>Keep this page open to continue. If you leave, return and choose Resume.</small>
        </section>
      )}
      {library.jobs.length > 0 && (
        <section className="sheet-library">
          <h2>Your saved work</h2>
          {library.jobs.map((j) => (
            <div className="binder-job" key={j.id}>
              <div>
                <strong>{j.title}</strong>
                <p>
                  {j.completedPages} / {binderContentPages(j.pageCount)} content pages saved
                </p>
              </div>
              <button
                className="button button-secondary"
                disabled={busy || Boolean(opening) || !canCreate}
                onClick={() => (j.status === 'ready' ? void open(j.id) : void run(j))}
              >
                {j.status === 'ready' ? 'Open & share' : 'Resume'}
              </button>
              <button className="sheet-close" disabled={busy} onClick={() => void cancel(j.id)}>
                Cancel draft
              </button>
            </div>
          ))}
        </section>
      )}
      {binder && (
        <section className="sheet-viewer">
          <div className="sheet-library-heading">
            <div>
              <span className="eyebrow">COLOR-CODED STUDY REFERENCE</span>
              <h2>{binder.title}</h2>
              <p>
                {binder.pageCount} pages · {binder.plan.sections.length} tabbed sections ·{' '}
                {binder.status === 'published'
                  ? 'Shared across all schools'
                  : ready
                    ? 'Ready to share'
                    : 'Checking page layout…'}
              </p>
            </div>
            <button
              className="sheet-close"
              aria-label="Close binder"
              onClick={() => {
                selected.current = '';
                setBinder(null);
              }}
            >
              <X size={21} />
            </button>
          </div>
          {fitError && (
            <p className="sheet-error" role="alert">
              {fitError}
            </p>
          )}
          <div className="sheet-actions">
            <button
              className="button button-primary"
              disabled={!ready || Boolean(exporting)}
              onClick={() => void print()}
            >
              <Printer size={17} /> {exporting === 'print' ? 'Loading images…' : 'Print / save PDF'}
            </button>
            <button
              className="button button-secondary"
              disabled={!ready || Boolean(exporting)}
              onClick={() => void download()}
            >
              <Download size={17} />{' '}
              {exporting === 'download' ? 'Embedding images…' : 'Download HTML'}
            </button>
            {ready && binder.status === 'ready' && (
              <button className="button button-secondary" onClick={() => void share(binder)}>
                Retry sharing
              </button>
            )}
          </div>
          <p className="sheet-print-note">
            Export a PDF using “Save as PDF” in the print dialog: Letter paper, 100% scale, headers
            and footers off, background graphics on for the colored tabs. The HTML download embeds
            every diagram and photograph for offline study.
          </p>
          <div className="binder-preview">
            <iframe
              ref={frame}
              title={`${binder.title} preview`}
              sandbox="allow-same-origin allow-modals"
              srcDoc={html}
              onLoad={() => void checkPages()}
            />
          </div>
        </section>
      )}
      <section className="sheet-library">
        <div className="sheet-library-heading">
          <div>
            <span className="eyebrow">KNOWLEDGE ACROSS COMMUNITIES</span>
            <h2>The shared binder library</h2>
            <p>Division C binders from every school. All signed-in members can read and export.</p>
          </div>
          <button
            className="button button-secondary"
            disabled={loading}
            onClick={() => void refresh()}
          >
            Refresh
          </button>
        </div>
        <label className="sheet-filter">
          Show event
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All binder events</option>
            {binderEvents.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </label>
        {loading && (
          <p role="status">
            <LoaderCircle size={16} className="sheet-spin" /> Loading binders…
          </p>
        )}
        {!loading && !library.binders.length && (
          <div className="sheet-empty">
            <BookOpen size={30} />
            <h3>A place for your next discovery.</h3>
            <p>
              Completed binders will appear here. Division C students can create one from an event’s
              Notes / Binder Generator tab.
            </p>
          </div>
        )}
        <div className="sheet-card-grid">
          {library.binders.map((b) => (
            <article className="sheet-card binder-card" key={b.id}>
              <div className="sheet-card-top">
                <BookOpen size={25} />
                <span>{b.pageCount} PAGES</span>
              </div>
              <p className="sheet-event-name">
                {binderEvents.find((e) => e.id === b.eventId)?.name}
              </p>
              <h3>{b.title}</h3>
              <p className="sheet-card-meta">{b.level} · 2027 rules · Illustrated</p>
              <p>
                Generated by <strong>{b.schoolName}</strong>
              </p>
              <p className="sheet-date">
                Generated{' '}
                <time dateTime={b.generatedAt!}>
                  {new Date(b.generatedAt!).toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </time>
              </p>
              <button
                className="button button-secondary"
                disabled={Boolean(opening)}
                onClick={() => void open(b.id)}
              >
                {opening === b.id ? 'Opening…' : 'Read & export'}
                <BookOpen size={16} />
              </button>
            </article>
          ))}
        </div>
        {library.nextCursor && (
          <button
            className="button button-secondary"
            disabled={loading}
            onClick={() => void refresh(true, library.nextCursor!)}
          >
            Load more binders
          </button>
        )}
      </section>
    </div>
  );
}
export function BinderLibraryPage() {
  const { loading, profile, sessionError } = useAuth();
  return (
    <main id="main" className="page-container">
      <section className="page-heading">
        <p className="eyebrow">AKOIZO / SHARED REFERENCES</p>
        <h1>The binder library.</h1>
        <p>Explore Division C study binders across every school community.</p>
      </section>
      {loading ? (
        <p role="status">Loading your account…</p>
      ) : profile ? (
        <Binders key={profile.id} />
      ) : (
        <div className="empty-state">
          <p>{sessionError || 'Sign in with your school account to read and export binders.'}</p>
          <Link className="button button-primary" href="/login/student">
            Student sign in
          </Link>{' '}
          <Link className="button button-secondary" href="/login/instructor">
            Instructor sign in
          </Link>
        </div>
      )}
    </main>
  );
}
