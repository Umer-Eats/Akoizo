'use client';
import { useId, useState, type ReactNode } from 'react';
import './diagram-viewer.css';

/** Shared inspection controls keep small labels readable without widening the page. */
export function DiagramViewer({ label, children }: { label: string; children: ReactNode }) {
  const [zoom, setZoom] = useState(100);
  const hintId = useId();
  return (
    <div className="diagram-inspector">
      <div className="diagram-toolbar" role="group" aria-label={`${label} inspection controls`}>
        <span>Inspect the diagram</span>
        <button
          type="button"
          disabled={zoom === 100}
          aria-label="Zoom diagram out"
          onClick={() => setZoom((z) => Math.max(100, z - 25))}
        >
          −
        </button>
        <output aria-live="polite">{zoom}%</output>
        <button
          type="button"
          disabled={zoom === 200}
          aria-label="Zoom diagram in"
          onClick={() => setZoom((z) => Math.min(200, z + 25))}
        >
          +
        </button>
        <button type="button" disabled={zoom === 100} onClick={() => setZoom(100)}>
          Reset zoom
        </button>
      </div>
      <div
        className="diagram-inspector-scroll"
        role="region"
        tabIndex={0}
        aria-label={`${label} enlarged diagram`}
        aria-describedby={hintId}
      >
        <div className="diagram-inspector-canvas" style={{ width: `${zoom}%` }}>
          {children}
        </div>
      </div>
      <p id={hintId} className="diagram-inspector-hint">
        Zoom to read labels; scroll sideways or focus the diagram and use arrow keys to explore.
      </p>
    </div>
  );
}
