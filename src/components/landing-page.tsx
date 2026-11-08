import type { CSSProperties, ReactNode } from 'react';

const delay = (d: number) => ({ '--d': d }) as CSSProperties;

// Shared introduction for public pages.
export function PageHero({
  label,
  title,
  lead,
  children,
}: {
  label: string;
  title: ReactNode;
  lead: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="lx-page-hero">
      <div className="lx-hero-grid lx-wrap">
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

// Shared content section for public pages.
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
    <section
      id={id}
      className="lx-sheet lx-wrap"
      aria-labelledby={title ? `${id}-title` : undefined}
      aria-label={title ? undefined : label}
    >
      <div className="lx-section-label">
        <span className="lx-mono">
          {String(num).padStart(2, '0')} / {label}
        </span>
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
