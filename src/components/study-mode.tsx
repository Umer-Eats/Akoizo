'use client';
// Instructors open the same student tools their students use. They pick which division to view
// as; the choice lives in this browser, and nothing they do in the tools counts as student work.
import { useCallback, useSyncExternalStore, type ReactNode } from 'react';
import { StudyAs, useAuth } from './auth-context';
import type { Division } from '@/lib/events';
import './study-mode.css';

const KEY = 'akoizo:teacher-study-division';
const CHANGE = 'akoizo:teacher-study-division-change';
const DEFAULT: Division = 'C';

function read(): Division {
  try {
    const value = localStorage.getItem(KEY);
    return value === 'A' || value === 'B' || value === 'C' ? value : DEFAULT;
  } catch {
    return DEFAULT;
  }
}
function subscribe(notify: () => void) {
  window.addEventListener(CHANGE, notify);
  window.addEventListener('storage', notify);
  return () => {
    window.removeEventListener(CHANGE, notify);
    window.removeEventListener('storage', notify);
  };
}

/** The division an instructor is viewing student tools in. */
export function useTeacherDivision(): [Division, (division: Division) => void] {
  const division = useSyncExternalStore(subscribe, read, () => DEFAULT);
  const set = useCallback((next: Division) => {
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* Without storage the choice still applies until the page reloads. */
    }
    window.dispatchEvent(new Event(CHANGE));
  }, []);
  return [division, set];
}

/** True inside student tools when the viewer is an instructor. */
export function useTeacherPreview() {
  return useAuth().profile?.role === 'instructor';
}

/** Wrap student tools so an instructor sees them in their chosen division. */
export function TeacherStudy({ children }: { children: ReactNode }) {
  const [division] = useTeacherDivision();
  return <StudyAs division={division}>{children}</StudyAs>;
}

export function TeacherDivisionPicker({
  onChange,
  label = 'Viewing as',
}: {
  onChange?: (division: Division) => void;
  label?: string;
}) {
  const [division, setDivision] = useTeacherDivision();
  return (
    <label className="division-control">
      {label}
      <select
        aria-label="Student division to view"
        value={division}
        onChange={(e) => {
          const next = e.target.value as Division;
          setDivision(next);
          onChange?.(next);
        }}
      >
        {(['A', 'B', 'C'] as const).map((value) => (
          <option key={value} value={value}>
            Division {value} student
          </option>
        ))}
      </select>
    </label>
  );
}
