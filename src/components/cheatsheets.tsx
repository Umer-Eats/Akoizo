'use client';
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import {
  Download,
  FileText,
  Globe2,
  LoaderCircle,
  Plus,
  Printer,
  RefreshCw,
  Sparkles,
  Upload,
  X,
} from 'lucide-react';
import { useAuth, authMessage } from './auth-context';
import { sheetEventsByDivision } from '@/lib/cheatsheets';
import { fitSheetDocument, sheetDocument } from '@/lib/cheatsheet-document';
import { exportPreview, saveFile, type ExportFormat } from '@/lib/document-export';
import type { CheatSheet, SheetCard, SheetLevel, SheetUpload } from '@/lib/cheatsheet-types';
import './cheatsheets.css';

type Library = { sheets: SheetCard[]; drafts?: SheetCard[]; nextCursor: string | null };

async function readUpload(file: File): Promise<SheetUpload> {
  const mime =
    file.type ||
    (/\.csv$/i.test(file.name) ? 'text/csv' : /\.txt$/i.test(file.name) ? 'text/plain' : '');
  if (
    ![
      'image/png',
      'image/jpeg',
      'image/webp',
      'application/pdf',
      'text/plain',
      'text/csv',
      'application/vnd.ms-excel',
    ].includes(mime)
  )
    throw new Error('Choose a PNG, JPEG, WebP, PDF, TXT or CSV file.');
  if (
    file.size > 900_000 ||
    ((mime.startsWith('text/') || mime === 'application/vnd.ms-excel') && file.size > 100_000)
  )
    throw new Error(
      `${file.name} is too large. Images and PDFs must be under 900 KB; text and CSV under 100 KB.`,
    );
  const data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
    reader.readAsDataURL(file);
  });
  return {
    name: file.name.slice(0, 120),
    mime: mime === 'application/vnd.ms-excel' ? 'text/csv' : mime,
    data,
  };
}

// Catalog figures are fetched once per page, then downscaled to print resolution for one column
// (about 2 in wide) so an exported sheet stays small. A figure that fails to load is skipped.
const figureCache = new Map<string, Promise<{ src: string; ratio: number } | null>>();
function loadFigure(id: string) {
  let pending = figureCache.get(id);
  if (!pending) {
    pending = (async () => {
      try {
        const response = await fetch(`/api/cheatsheets/figure?id=${encodeURIComponent(id)}`);
        if (!response.ok) return null;
        const bitmap = await createImageBitmap(await response.blob());
        const ratio = Math.min(1, 720 / bitmap.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(bitmap.width * ratio);
        canvas.height = Math.round(bitmap.height * ratio);
        const context = canvas.getContext('2d')!;
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        return { src: canvas.toDataURL('image/jpeg', 0.85), ratio: canvas.width / canvas.height };
      } catch {
        return null;
      }
    })();
    figureCache.set(id, pending);
    void pending.then((data) => {
      if (!data) figureCache.delete(id);
    });
  }
  return pending;
}

export function CheatSheets({ eventId }: { eventId: string }) {
  const { request, profile } = useAuth();
  // Each division has its own rules and shared library; the server enforces the same split.
  const division = profile?.division === 'B' ? 'B' : 'C';
  const sheetEvents = sheetEventsByDivision[division];
  const [library, setLibrary] = useState<Library>({ sheets: [], nextCursor: null });
  const [filter, setFilter] = useState(eventId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [generating, setGenerating] = useState(false);
  const [reading, setReading] = useState(false);
  const [opening, setOpening] = useState('');
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState<SheetLevel>('national');
  const [notes, setNotes] = useState('');
  const [exclusions, setExclusions] = useState('');
  const [uploads, setUploads] = useState<SheetUpload[]>([]);
  const [sheet, setSheet] = useState<CheatSheet | null>(null);
  const [draftId, setDraftId] = useState('');
  const [html, setHtml] = useState('');
  const [ready, setReady] = useState(false);
  const [fitError, setFitError] = useState('');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('html');
  const [exporting, setExporting] = useState('');
  const [fontSize, setFontSize] = useState(0);
  const frame = useRef<HTMLIFrameElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const sequence = useRef(0);
  const selectedId = useRef('');
  const publishing = useRef(new Set<string>());
  const resumed = useRef(new Set<string>());
  const event = sheetEvents.find((e) => e.id === eventId)!;

  const refresh = useCallback(
    async (quiet = false) => {
      const current = ++sequence.current;
      if (!quiet) setLoading(true);
      try {
        const result = await request<Library>(
          `/api/cheatsheets${filter ? `?eventId=${encodeURIComponent(filter)}` : ''}`,
        );
        if (current === sequence.current) {
          setLibrary((previous) =>
            quiet && previous.sheets.length > 24
              ? {
                  ...result,
                  sheets: [
                    ...new Map(
                      [...result.sheets, ...previous.sheets].map((s) => [s.id, s]),
                    ).values(),
                  ].sort(
                    (a, b) => b.createdAt.localeCompare(a.createdAt) || b.id.localeCompare(a.id),
                  ),
                  nextCursor: previous.nextCursor,
                }
              : result,
          );
          if (!quiet) setError('');
        }
      } catch (e) {
        if (!quiet && current === sequence.current) setError(authMessage(e));
      } finally {
        if (current === sequence.current) setLoading(false);
      }
    },
    [filter, request],
  );
  useEffect(() => {
    void refresh();
    const poll = () => {
      if (document.visibilityState === 'visible') void refresh(true);
    };
    const timer = window.setInterval(poll, 20_000);
    window.addEventListener('focus', poll);
    return () => {
      ++sequence.current;
      clearInterval(timer);
      window.removeEventListener('focus', poll);
    };
  }, [refresh]);
  useEffect(() => {
    if (!sheet || !preview.current) return;
    const observer = new ResizeObserver(([entry]) =>
      setScale(Math.min(1, entry.contentRect.width / 816)),
    );
    observer.observe(preview.current);
    return () => observer.disconnect();
  }, [sheet]);
  useEffect(() => {
    if (sheet || generating) return;
    const draft = library.drafts?.find((d) => !resumed.current.has(d.id));
    if (!draft) return;
    resumed.current.add(draft.id);
    setDraftId(draft.id);
    let cancelled = false;
    request<CheatSheet>(`/api/cheatsheets?id=${encodeURIComponent(draft.id)}`)
      .then((next) => {
        if (!cancelled && !selectedId.current) show(next);
      })
      .catch((e) => {
        if (!cancelled) setError(authMessage(e));
      });
    return () => {
      cancelled = true;
    };
  }, [library.drafts, generating, sheet, request]);

  function show(next: CheatSheet) {
    resumed.current.add(next.id);
    selectedId.current = next.id;
    setSheet(next);
    setReady(false);
    setFitError('');
    setHtml('');
    const ids = next.content.sections.flatMap((s) => s.figures ?? []);
    void Promise.all(ids.map(loadFigure)).then((loaded) => {
      if (selectedId.current !== next.id) return;
      const figureData: Record<string, { src: string; ratio: number }> = {};
      ids.forEach((id, i) => {
        const figure = loaded[i];
        if (figure) figureData[id] = figure;
      });
      setHtml(sheetDocument(next, figureData));
    });
  }
  async function publish(next: CheatSheet) {
    if (publishing.current.has(next.id)) return;
    publishing.current.add(next.id);
    try {
      const saved = await request<CheatSheet>('/api/cheatsheets', {
        method: 'POST',
        body: JSON.stringify({ action: 'publish', id: next.id }),
      });
      if (selectedId.current === next.id) setSheet(saved);
      setDraftId('');
      setNotice(`Your sheet is shared with Division ${division} students across every community.`);
      await refresh(true);
    } catch (e) {
      setError(`Your sheet is ready, but sharing failed. ${authMessage(e)}`);
    } finally {
      publishing.current.delete(next.id);
    }
  }
  async function preparePreview() {
    const doc = frame.current?.contentDocument;
    if (!doc || !sheet || !doc.querySelector('#sheet-blocks')) return;
    const current = sheet;
    try {
      const result = fitSheetDocument(doc);
      if (!result.fits) {
        setFitError(
          'This draft has too much content for two readable sides. It has not been shared. Try again with fewer images or more known topics excluded.',
        );
        return;
      }
      // All figures must load before exporting the measured pages.
      await Promise.all(Array.from(doc.images).map((img) => img.decode()));
      if (selectedId.current !== current.id) return;
      setFontSize(result.fontSize);
      setReady(true);
      if (!current.published) void publish(current);
    } catch {
      setFitError(
        'A figure could not load. This sheet has not been exported. Reopen it or try generating again.',
      );
    }
  }
  async function generate(e: FormEvent) {
    e.preventDefault();
    if (generating || reading) return;
    setGenerating(true);
    setError('');
    setNotice('');
    try {
      const next = await request<CheatSheet>('/api/cheatsheets', {
        method: 'POST',
        body: JSON.stringify({ eventId, title, level, notes, exclusions, uploads }),
      });
      setDraftId(next.id);
      show(next);
    } catch (e) {
      setError(authMessage(e));
    } finally {
      setGenerating(false);
    }
  }
  async function open(id: string) {
    setOpening(id);
    setError('');
    try {
      show(await request<CheatSheet>(`/api/cheatsheets?id=${encodeURIComponent(id)}`));
    } catch (e) {
      setError(authMessage(e));
    } finally {
      setOpening('');
    }
  }
  async function addFiles(files: FileList | null) {
    if (!files) return;
    setReading(true);
    setError('');
    try {
      if (files.length + uploads.length > 4) throw new Error('Add up to 4 supplementary files.');
      const added = await Promise.all(Array.from(files).map(readUpload));
      const next = [...uploads, ...added];
      if (next.reduce((n, u) => n + u.data.length * 0.75, 0) > 2_000_000)
        throw new Error('Keep your combined uploads under 2 MB.');
      setUploads(next);
    } catch (e) {
      setError(authMessage(e));
    } finally {
      setReading(false);
    }
  }
  async function download() {
    const doc = frame.current?.contentDocument;
    if (!ready || !doc || !sheet || exporting) return;
    setExporting('Preparing…');
    setError('');
    try {
      if (exportFormat === 'html') {
        const clone = doc.documentElement.cloneNode(true) as HTMLElement;
        clone.querySelector('template')?.remove();
        saveFile(
          new Blob(['<!doctype html>' + clone.outerHTML], { type: 'text/html;charset=utf-8' }),
          `${sheet.eventId}-cheatsheet.html`,
        );
      } else {
        await exportPreview(
          doc,
          exportFormat,
          `${sheet.eventId}-cheatsheet`,
          sheet.title,
          (page, total) => setExporting(`Exporting page ${page} of ${total}…`),
        );
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'The export failed. Please try again.');
    } finally {
      setExporting('');
    }
  }

  return (
    <div className="cheatsheets">
      <section className="sheet-create" aria-labelledby="sheet-create-title">
        <div className="sheet-intro">
          <span className="sheet-icon">
            <Sparkles size={23} />
          </span>
          <div>
            <span className="eyebrow">ONE SHEET. BOTH SIDES.</span>
            <h2 id="sheet-create-title">Your event, condensed.</h2>
            <p>
              Build a dense {event.name} reference with Akoizo, grounded in the 2027 Division{' '}
              {division} rules.
            </p>
          </div>
        </div>
        <div className="sheet-spec">
          <span>8.5 × 11 in</span>
          <span>2 sides · 4 columns</span>
          <span>Figures, tables + diagrams</span>
        </div>
        <form onSubmit={generate}>
          <div className="sheet-fields">
            <label>
              Sheet title <span>(optional)</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                placeholder={`${event.name} reference`}
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
            What should it focus on? <span>(optional)</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={6000}
              rows={3}
              placeholder="Add priorities, observations, formulas, or data to include. Leave blank for complete event coverage."
            />
            <small>{notes.length.toLocaleString()} / 6,000</small>
          </label>
          <label className="sheet-exclusions">
            Leave out what I already know <span>(optional)</span>
            <textarea
              value={exclusions}
              onChange={(e) => setExclusions(e.target.value)}
              maxLength={4000}
              rows={3}
              placeholder="For example: basic definitions, parts of the microscope, or formulas I know by heart. Be specific about the topics to exclude."
            />
            <small>
              Akoizo will skip these topics and use the space for other material.{' '}
              {exclusions.length.toLocaleString()} / 4,000
            </small>
          </label>
          <div className="sheet-upload">
            <label>
              <Upload size={18} /> Add supplementary images or data
              <input
                type="file"
                multiple
                accept=".png,.jpg,.jpeg,.webp,.pdf,.txt,.csv"
                disabled={reading || generating}
                onChange={(e) => {
                  void addFiles(e.target.files);
                  e.target.value = '';
                }}
              />
            </label>
            <p>
              Up to 4 files, 2 MB total. Images/PDFs: 900 KB each. TXT/CSV: 100 KB each. Images
              appear on the sheet; Akoizo condenses PDF and text content.
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
                    disabled={generating}
                    onClick={() => setUploads(uploads.filter((_, j) => i !== j))}
                  >
                    <X size={15} />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="sheet-sharing">
            <Globe2 size={17} /> Every generated sheet is shared across Division {division}{' '}
            communities. Your school and generation date appear on the card. Notes and files go to
            Akoizo; included content and images are visible to other students.
          </p>
          <button type="submit" className="button button-primary" disabled={generating || reading}>
            {generating ? (
              <LoaderCircle className="sheet-spin" size={17} />
            ) : (
              <Sparkles size={17} />
            )}{' '}
            {generating ? 'Building your two-sided sheet…' : 'Generate & share sheet'}
          </button>
          {generating && (
            <p role="status">
              Akoizo is choosing high-value content, figures and diagrams. This can take about two
              minutes. Keep this page open for the two-page fit check.
            </p>
          )}
        </form>
      </section>
      {error && (
        <div className="sheet-error" role="alert">
          {error}
        </div>
      )}
      {notice && (
        <p className="sheet-notice" role="status">
          {notice}
        </p>
      )}
      {draftId && sheet?.id !== draftId && (
        <button className="button button-secondary" onClick={() => void open(draftId)}>
          Reopen generated draft
        </button>
      )}
      {sheet && (
        <section className="sheet-viewer" aria-label="Cheat sheet preview">
          <div className="sheet-library-heading">
            <div>
              <span className="eyebrow">FRONT + BACK</span>
              <h2>{sheet.title}</h2>
              <p>
                {ready
                  ? `Exactly 2 pages · ${fontSize.toFixed(1)} pt text · ${sheet.published ? `Shared with everyone in Division ${division}` : 'Sharing…'}`
                  : 'Loading figures and checking that all content fits on two sides…'}
              </p>
            </div>
            <button
              className="sheet-close"
              aria-label="Close preview"
              onClick={() => {
                selectedId.current = '';
                setSheet(null);
              }}
            >
              <X size={21} />
            </button>
          </div>
          {fitError && (
            <p role="alert" className="sheet-error">
              {fitError}
            </p>
          )}
          <div className="sheet-actions">
            <button
              className="button button-primary"
              disabled={!ready || Boolean(exporting)}
              onClick={() => frame.current?.contentWindow?.print()}
            >
              <Printer size={17} /> Print / save PDF
            </button>
            <label className="sheet-export-format">
              <span>Export format</span>
              <select
                value={exportFormat}
                disabled={!ready || Boolean(exporting)}
                onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
              >
                <option value="html">HTML</option>
                <option value="pdf">PDF</option>
                <option value="png">PNG pages (ZIP)</option>
                <option value="docx">DOCX</option>
              </select>
            </label>
            <button
              className="button button-secondary"
              disabled={!ready || Boolean(exporting)}
              onClick={() => void download()}
            >
              <Download size={17} /> {exporting || `Download ${exportFormat.toUpperCase()}`}
            </button>
            {ready && !sheet.published && (
              <button className="button button-secondary" onClick={() => void publish(sheet)}>
                Retry sharing
              </button>
            )}
          </div>
          <p className="sheet-print-note">
            Print pages 1–2 on <strong>one sheet, double-sided, flip on long edge</strong>. Use
            Letter paper, 100% scale, and turn off headers and footers. The PDF download contains
            both sides. PNG pages download together in a ZIP file. Your printer’s double-sided
            setting must be selected in the print dialog.
          </p>
          {sheet.exclusions && (
            <details className="sheet-omitted">
              <summary>Topics intentionally left out</summary>
              <p>{sheet.exclusions}</p>
            </details>
          )}
          <p className="sheet-review">
            AI-generated study reference. Check scientific details and your tournament’s latest
            rules before competing.
          </p>
          <div ref={preview} className="sheet-preview" style={{ height: 2128 * scale }}>
            <iframe
              key={sheet.id}
              ref={frame}
              title={`${sheet.title} — front and back`}
              sandbox="allow-same-origin allow-modals"
              srcDoc={html}
              onLoad={() => void preparePreview()}
              style={{ width: 816, height: 2128, transform: `scale(${scale})` }}
            />
          </div>
        </section>
      )}
      <section className="sheet-library" aria-labelledby="sheet-library-title">
        <div className="sheet-library-heading">
          <div>
            <span className="eyebrow">SHARED ACROSS COMMUNITIES</span>
            <h2 id="sheet-library-title">The Division {division} sheet library</h2>
            <p>Open, print, or export any sheet. New sheets appear automatically.</p>
          </div>
          <button
            className="button button-secondary"
            onClick={() => void refresh()}
            disabled={loading}
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
        <label className="sheet-filter">
          Show event
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All Division {division} events</option>
            {sheetEvents.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </label>
        {loading ? (
          <p role="status">Loading shared sheets…</p>
        ) : !library.sheets.length ? (
          <div className="sheet-empty">
            <FileText size={30} />
            <h3>Make the first reference.</h3>
            <p>Generate a sheet above to start this event’s shared collection.</p>
          </div>
        ) : (
          <div className="sheet-card-grid">
            {library.sheets.map((s) => (
              <article className="sheet-card" key={s.id}>
                <div className="sheet-card-top">
                  <FileText size={24} />
                  <span>2 SIDES</span>
                </div>
                <p className="sheet-event-name">
                  {sheetEvents.find((e) => e.id === s.eventId)?.name}
                </p>
                <h3>{s.title}</h3>
                <p className="sheet-card-meta">
                  {s.level} · 2027 rules
                  {s.imageCount > 0
                    ? ` · ${s.imageCount} uploaded image${s.imageCount === 1 ? '' : 's'}`
                    : ''}
                </p>
                {s.hasExclusions && (
                  <span className="sheet-customized">Some known topics omitted</span>
                )}
                <p className="sheet-school">
                  <Globe2 size={13} /> {s.schoolName}
                </p>
                <p className="sheet-date">
                  Generated{' '}
                  <time dateTime={s.createdAt}>
                    {new Date(s.createdAt).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </time>
                </p>
                <button
                  className="button button-secondary"
                  disabled={Boolean(opening)}
                  onClick={() => void open(s.id)}
                >
                  {opening === s.id ? 'Opening…' : 'Open & export'}
                  <Plus size={15} />
                </button>
              </article>
            ))}
          </div>
        )}
        {library.nextCursor && (
          <button
            className="button button-secondary"
            disabled={loading}
            onClick={async () => {
              const current = ++sequence.current;
              setLoading(true);
              try {
                const next = await request<Library>(
                  `/api/cheatsheets?${new URLSearchParams({ ...(filter ? { eventId: filter } : {}), before: library.nextCursor! })}`,
                );
                if (current === sequence.current)
                  setLibrary({
                    sheets: [...library.sheets, ...next.sheets],
                    nextCursor: next.nextCursor,
                  });
              } catch (e) {
                setError(authMessage(e));
              } finally {
                if (current === sequence.current) setLoading(false);
              }
            }}
          >
            Load more sheets
          </button>
        )}
      </section>
    </div>
  );
}
