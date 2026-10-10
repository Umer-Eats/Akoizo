'use client';
import { useRef, useState } from 'react';
import type { LessonReferenceFigure as Figure } from '@/lib/lessons';
import './lesson-atlas.css';

export function LessonReferenceFigure({ figure }: { figure: Figure }) {
  const dialog = useRef<HTMLDialogElement>(null),
    [zoom, setZoom] = useState(100),
    [failed, setFailed] = useState(false),
    [usingFallback, setUsingFallback] = useState(false);
  const src = usingFallback ? figure.fallbackSrc! : figure.src;
  const handleError = () => {
    if (figure.fallbackSrc && !usingFallback) setUsingFallback(true);
    else setFailed(true);
  };
  return (
    <figure className="lesson-visual source-image online-reference">
      <figcaption>
        <span className="eyebrow">INSPECT THE REFERENCE FIGURE</span>
        <strong>{figure.title}</strong>
      </figcaption>
      {failed ? (
        <p role="status">
          The reference image could not load.{' '}
          <a href={figure.source} target="_blank" rel="noreferrer">
            View it on the source page ↗
          </a>
        </p>
      ) : (
        <button
          className="atlas-image-button"
          aria-label={`Enlarge ${figure.title}`}
          onClick={() => {
            setZoom(100);
            dialog.current?.showModal();
          }}
        >
          {/* Uncropped remote educational figure with a source fallback. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={figure.alt} loading="lazy" onError={handleError} />
          <span>Enlarge and inspect labels ↗</span>
        </button>
      )}
      {usingFallback ? (
        <p className="atlas-credit">
          Original teaching schematic.{' '}
          <a href={figure.source} target="_blank" rel="noreferrer">
            Explore the related reference figure by {figure.author} ↗
          </a>
        </p>
      ) : (
        <p className="atlas-credit">
          <a href={figure.source} target="_blank" rel="noreferrer">
            {figure.author} · source
          </a>{' '}
          ·{' '}
          <a href={figure.licenseUrl} target="_blank" rel="noreferrer">
            {figure.license}
          </a>{' '}
          · Unmodified
        </p>
      )}
      <p>
        <strong>Read the figure:</strong> {figure.prompt}
      </p>
      <dialog
        ref={dialog}
        aria-label={figure.title}
        className="atlas-image-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="atlas-dialog-toolbar">
          <strong>{figure.title}</strong>
          <button
            className="button button-small button-glass"
            onClick={() => dialog.current?.close()}
          >
            Close image
          </button>
        </div>
        <label className="atlas-zoom">
          Image zoom <output>{zoom}%</output>
          <input
            aria-label="Image zoom"
            type="range"
            min={100}
            max={250}
            step={25}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </label>
        <p>Scroll to inspect labels. Press Escape to close.</p>
        <div
          className="atlas-enlarged-scroll"
          tabIndex={0}
          role="region"
          aria-label="Enlarged reference figure viewer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={figure.alt} style={{ width: `${zoom}%` }} />
        </div>
        <p>
          <a href={figure.source} target="_blank" rel="noreferrer">
            Open original source ↗
          </a>
        </p>
      </dialog>
    </figure>
  );
}
