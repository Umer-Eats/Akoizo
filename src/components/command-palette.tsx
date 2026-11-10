'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CornerDownLeft, FileText, Hash, Search } from 'lucide-react';
import { eventsForDivision, type Division } from '@/lib/events';
import { eventPagePath } from '@/lib/seo';

type Item = { label: string; hint: string; href: string; kind: 'page' | 'event' };

const pages: Item[] = [
  {
    label: 'Attendance',
    hint: 'Workshop check-in and attendance records',
    href: '/attendance',
    kind: 'page',
  },
  { label: 'Binder library', hint: 'Shared references', href: '/dashboard/binders', kind: 'page' },
  {
    label: 'Course library',
    hint: 'Saved practice setups',
    href: '/dashboard/courses',
    kind: 'page',
  },
  {
    label: 'Cheat sheet library',
    hint: 'Two-sided references',
    href: '/dashboard/cheatsheets',
    kind: 'page',
  },
  { label: 'Home', hint: 'Page', href: '/', kind: 'page' },
  { label: 'Study tools', hint: 'Every event guide', href: '/study-tools', kind: 'page' },
  { label: 'Global rankings', hint: 'Page', href: '/rankings', kind: 'page' },
  { label: 'Mission', hint: 'Why Akoizo is free', href: '/mission', kind: 'page' },
  { label: 'Add your school', hint: 'Contact', href: '/contact', kind: 'page' },
  { label: 'Student login', hint: 'Open your study space', href: '/login/student', kind: 'page' },
  { label: 'Instructor login', hint: 'Coach tools', href: '/login/instructor', kind: 'page' },
];

const events: Item[] = (['C', 'B', 'A'] as Division[]).flatMap((division) =>
  eventsForDivision(division).map((event) => ({
    label: event.name,
    hint: `Division ${division} · ${event.category}`,
    href: eventPagePath(division, event.id),
    kind: 'event' as const,
  })),
);

export const openCommandPalette = () => window.dispatchEvent(new Event('akoizo:palette'));

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('akoizo:palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('akoizo:palette', onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActive(0);
    const previous = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => input.current?.focus());
    return () => previous?.focus();
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [...pages.slice(1, 5), ...events.slice(0, 6)];
    return (
      [...pages, ...events]
        .filter((item) => `${item.label} ${item.hint}`.toLowerCase().includes(q))
        // Name matches first, then matches on division or subject.
        .sort(
          (a, b) =>
            Number(!a.label.toLowerCase().includes(q)) - Number(!b.label.toLowerCase().includes(q)),
        )
        .slice(0, 12)
    );
  }, [query]);

  useEffect(() => {
    list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const go = (item?: Item) => {
    if (!item) return;
    setOpen(false);
    router.push(item.href);
  };

  return (
    <div className="vx-palette-backdrop" onMouseDown={() => setOpen(false)}>
      <div
        className="vx-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Search Akoizo"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((a) => Math.min(results.length - 1, a + 1));
          }
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((a) => Math.max(0, a - 1));
          }
          if (e.key === 'Enter') go(results[active]);
          if (e.key === 'Tab') e.preventDefault();
        }}
      >
        <label className="vx-palette-input">
          <Search size={17} aria-hidden="true" />
          <input
            ref={input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Search events and pages…"
            role="combobox"
            aria-expanded="true"
            aria-controls="vx-palette-list"
            aria-activedescendant={results[active] ? `vx-opt-${active}` : undefined}
            aria-label="Search events and pages"
          />
          <kbd>Esc</kbd>
        </label>
        <ul id="vx-palette-list" ref={list} role="listbox" aria-label="Results">
          {results.length ? (
            results.map((item, i) => (
              <li
                key={item.href}
                id={`vx-opt-${i}`}
                role="option"
                aria-selected={i === active}
                data-index={i}
                onMouseMove={() => setActive(i)}
                onClick={() => go(item)}
              >
                {item.kind === 'event' ? (
                  <FileText size={15} aria-hidden="true" />
                ) : (
                  <Hash size={15} aria-hidden="true" />
                )}
                <span>{item.label}</span>
                <small>{item.hint}</small>
                {i === active && <CornerDownLeft size={14} aria-hidden="true" />}
              </li>
            ))
          ) : (
            <li className="vx-palette-empty">Nothing matches “{query}”.</li>
          )}
        </ul>
        <p className="vx-palette-foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>↵</kbd> open
          </span>
          <span>{events.length} event guides</span>
        </p>
      </div>
    </div>
  );
}
