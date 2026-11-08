import type { CSSProperties, ReactNode } from 'react';

const delay = (d: number) => ({ '--d': d }) as CSSProperties;

// The opening page of a sub-page: a ruled sheet with a margin label.
export function PageHero({
  lecture,
  label,
  title,
  lead,
  children,
}: {
  lecture: string;
  label: string;
  title: ReactNode;
  lead: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="lx-page-hero">
      <div className="lx-hero-grid lx-wrap">
        <div className="lx-hero-margin" data-enter>
          <span className="lx-mono" style={delay(0)}>
            {lecture}
          </span>
        </div>
        <div data-enter>
          <p className="lx-mono" style={delay(0)}>
            {label}
          </p>
          <h1 style={delay(1)}>{title}</h1>
          <p className="lx-lead" style={delay(2)}>
            {lead}
          </p>
          {children && (
            <div className="lx-actions" style={delay(3)}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// A numbered page of notes with its label in the margin.
export function Notes({
  id,
  num,
  label,
  title,
  lead,
  children,
}: {
  id: string;
  num: number;
  label: string;
  title?: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="lx-sheet lx-wrap" aria-labelledby={title ? `${id}-title` : undefined} aria-label={title ? undefined : label}>
      <div className="lx-margin">
        <div className="lx-margin-inner">
          <b aria-hidden="true">{String(num).padStart(2, '0')}</b>
          <span className="lx-mono">{label}</span>
        </div>
      </div>
      <div>
        {title && (
          <div className="lx-intro">
            <h2 id={`${id}-title`} className="lx-h2">
              {title}
            </h2>
            {lead && <div className="lx-lead">{lead}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
