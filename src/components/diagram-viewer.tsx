'use client';
import { useRef, useState, type ReactNode } from 'react';
import { Maximize2, Minus, Plus, X } from 'lucide-react';
import './diagram-viewer.css';

/**
 * Shared frame for lesson and lab diagrams. Inline, the diagram fits its column; "Enlarge"
 * opens a full-screen viewer with zoom so small labels stay readable on any screen.
 */
export function DiagramViewer({ label, children }: { label: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const close = () => dialog.current?.close();
  return (
    <div className="diagram-inspector">
      <div className="diagram-frame">
        <div className="diagram-inspector-canvas">{children}</div>
        <button
          type="button"
          className="diagram-expand"
          aria-label={`Enlarge diagram: ${label}`}
          onClick={() => {
            setZoom(100);
            setOpen(true);
            dialog.current?.showModal();
          }}
        >
          <Maximize2 size={14} aria-hidden="true" /> <span>Enlarge</span>
        </button>
      </div>
      <dialog
        ref={dialog}
        className="diagram-dialog"
        aria-label={label}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="diagram-toolbar" role="group" aria-label={`${label} zoom controls`}>
          <strong>{label}</strong>
          <button
            type="button"
            disabled={zoom === 100}
            aria-label="Zoom diagram out"
            onClick={() => setZoom((z) => Math.max(100, z - 25))}
          >
            <Minus size={15} aria-hidden="true" />
          </button>
          <output aria-live="polite">{zoom}%</output>
          <button
            type="button"
            disabled={zoom === 250}
            aria-label="Zoom diagram in"
            onClick={() => setZoom((z) => Math.min(250, z + 25))}
          >
            <Plus size={15} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Close enlarged diagram" onClick={close}>
            <X size={15} aria-hidden="true" />
          </button>
        </div>
        <div
          className="diagram-inspector-scroll"
          role="region"
          tabIndex={0}
          aria-label={`${label} enlarged diagram`}
        >
          {open && (
            <div className="diagram-dialog-canvas" style={{ width: `${zoom}%` }}>
              {children}
            </div>
          )}
        </div>
        <p className="diagram-inspector-hint">
          Zoom in to read small labels; scroll or use the arrow keys to move around. Press Escape to
          close.
        </p>
      </dialog>
    </div>
  );
}
