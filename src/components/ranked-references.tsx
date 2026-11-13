'use client';
import { useState } from 'react';
import { BookOpen, ChartColumn, FileText } from 'lucide-react';
import type { RankedReferences } from '@/lib/ranked-types';
import './ranked-references.css';

/** Which source paper (and page), or the combined diagrams, the panel is showing. */
export type ReferenceView = { source: string; page: number } | 'figures';

const firstPage = (references: RankedReferences, key: string) =>
  Object.values(references.questions).find((q) => q.source === key)?.page ?? 1;
export function firstView(references?: RankedReferences): ReferenceView | null {
  if (!references?.sources.length) return null;
  const first = references.sources[0];
  return { source: first.key, page: firstPage(references, first.key) };
}
export function useReferenceView(references?: RankedReferences) {
  return useState<ReferenceView | null>(() => firstView(references));
}

// Local PDFs open at a page; Google Drive files embed through their preview page.
function embedUrl(url: string, page: number) {
  if (/drive\.google\.com/.test(url)) return url.replace(/\/view(?:\?.*)?$/, '/preview');
  return url.startsWith('/') && /\.pdf$/i.test(url) ? `${url}#page=${page}&view=FitH` : url;
}

/**
 * Every source paper behind a ranked test, beside it. A ranked test combines questions from
 * several converted tests, so each paper gets its own tab with its topics, and every diagram,
 * chart, and table extracted from those papers is gathered in one more tab.
 */
export function RankedReferencePanel({
  references,
  view,
  onView,
  locked = false,
  questionLabels,
}: {
  references: RankedReferences;
  view: ReferenceView | null;
  onView: (view: ReferenceView) => void;
  /** During a locked test, links that would leave full screen are hidden. */
  locked?: boolean;
  questionLabels: Record<string, string>;
}) {
  if (!references.sources.length) return null;
  const figures = Object.entries(references.questions).filter(([, q]) => q.figure);
  const current =
    view === 'figures'
      ? null
      : (references.sources.find((s) => s.key === view?.source) ?? references.sources[0]);
  const page =
    view && view !== 'figures' && view.source === current?.key
      ? view.page
      : current
        ? firstPage(references, current.key)
        : 1;
  const usedBy = (key: string) =>
    Object.entries(references.questions)
      .filter(([, q]) => q.source === key)
      .map(([id]) => questionLabels[id]?.replace(/^Question /, ''))
      .filter(Boolean);
  return (
    <aside className="ranked-reference" aria-label="Source papers, diagrams, and charts">
      <div className="ranked-reference-heading">
        <h2>
          <BookOpen size={16} aria-hidden="true" /> Source papers
        </h2>
        <p>
          This test combines topics from {references.sources.length}{' '}
          {references.sources.length === 1 ? 'paper' : 'different papers'}. Any diagram, chart, or
          table a question needs is in its paper.
        </p>
      </div>
      <div className="ranked-reference-tabs" role="tablist" aria-label="Source papers">
        {references.sources.map((source) => (
          <button
            key={source.key}
            type="button"
            role="tab"
            aria-selected={view !== 'figures' && current?.key === source.key}
            onClick={() => onView({ source: source.key, page: firstPage(references, source.key) })}
          >
            <FileText size={14} aria-hidden="true" />
            {source.label}
          </button>
        ))}
        {figures.length > 0 && (
          <button
            type="button"
            role="tab"
            aria-selected={view === 'figures'}
            onClick={() => onView('figures')}
          >
            <ChartColumn size={14} aria-hidden="true" />
            Diagrams & charts ({figures.length})
          </button>
        )}
      </div>
      {view === 'figures' ? (
        <div className="ranked-reference-figures" role="tabpanel">
          {figures.map(([id, q]) => (
            <figure className="practice-figure" key={id}>
              <img src={q.figure!.url} alt={q.figure!.alt} loading="lazy" />
              <figcaption>
                <strong>{questionLabels[id] ?? id}</strong> · {q.figure!.caption}
              </figcaption>
              <details>
                <summary>Text description</summary>
                <p>{q.figure!.description}</p>
              </details>
            </figure>
          ))}
        </div>
      ) : (
        current && (
          <div className="ranked-reference-paper" role="tabpanel">
            <p className="ranked-reference-title">
              <strong>{current.title}</strong>
              <span>
                Page {page} · Used by question{usedBy(current.key).length === 1 ? '' : 's'}{' '}
                {usedBy(current.key).join(', ')}
              </span>
            </p>
            {current.topics.length > 0 && (
              <ul className="ranked-reference-topics" aria-label={`${current.label} topics`}>
                {current.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            )}
            <iframe
              key={`${current.key}:${page}`}
              title={`${current.label}: ${current.title}`}
              src={embedUrl(current.paperUrl, page)}
            />
            {current.supplementUrl && (
              <details className="practice-supplement">
                <summary>Image sheet for {current.label}</summary>
                <iframe
                  title={`Image sheet: ${current.title}`}
                  src={embedUrl(current.supplementUrl, 1)}
                />
              </details>
            )}
            {!locked && (
              <a href={current.paperUrl} target="_blank" rel="noreferrer">
                Open {current.label} in a new tab
              </a>
            )}
          </div>
        )
      )}
    </aside>
  );
}

/** Under a question: which paper it came from, a jump to its page, and its figure if any. */
export function QuestionSource({
  references,
  questionId,
  onView,
}: {
  references?: RankedReferences;
  questionId: string;
  onView: (view: ReferenceView) => void;
}) {
  const placed = references?.questions[questionId];
  const source = placed && references!.sources.find((s) => s.key === placed.source);
  if (!placed || !source) return null;
  return (
    <>
      <p className="practice-question-reference ranked-question-source">
        <button type="button" onClick={() => onView({ source: source.key, page: placed.page })}>
          <FileText size={13} aria-hidden="true" /> {source.label}, page {placed.page}
        </button>
      </p>
      {placed.figure && (
        <figure className="practice-figure">
          <img src={placed.figure.url} alt={placed.figure.alt} loading="lazy" />
          <figcaption>{placed.figure.caption}</figcaption>
          <details>
            <summary>Text description of figure</summary>
            <p>{placed.figure.description}</p>
          </details>
        </figure>
      )}
    </>
  );
}
