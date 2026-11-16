'use client';
import { useEffect, useMemo, useState } from 'react';
import { Search, Users } from 'lucide-react';
import type { Division } from '@/lib/events';
import { dateInZone, type Student } from '@/lib/domain';
import type { TeamSheet } from '@/lib/teams';
import { seatedTeams } from './assign-event-modal';
import { useAuth, authMessage } from './auth-context';
import './ranked.css';

const count = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** The already-assigned work whose students are being changed. */
export type AssignedWorkTarget = {
  division: Division;
  eventId: string;
  eventName: string;
  kind: 'Practice' | 'Lesson' | 'Unit' | 'Lab';
  /** The lesson, unit, lab or test id; empty for "any practice test in this event". */
  targetId: string;
  title: string;
  /** Students with an unfinished copy now. */
  pending: string[];
  /** Students who finished it; their record always stays. */
  finished: string[];
  /** The due date new students get unless the instructor picks another. */
  due: string;
};

/**
 * Choose exactly which students have a piece of work. Ticking a student adds it for them;
 * unticking takes away their unfinished copy. Partners are shown but never added automatically.
 */
export function AssignedStudentsModal({
  target,
  students,
  teams,
  onClose,
  onSaved,
}: {
  target: AssignedWorkTarget;
  students: Student[];
  teams: TeamSheet[] | null;
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const { request } = useAuth();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = dateInZone(timeZone);
  const [due, setDue] = useState(target.due < today ? today : target.due);
  const [checked, setChecked] = useState(() => new Set(target.pending));
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const finished = useMemo(() => new Set(target.finished), [target.finished]);
  const names = useMemo(() => new Map(students.map((s) => [s.id, s.displayName])), [students]);
  const eligible = students.filter((student) => student.division === target.division);
  const seated = seatedTeams(target.division, target.eventId, teams ?? [])
    .map((entry) => ({ ...entry, ids: entry.ids.filter((id) => names.has(id)) }))
    .filter((entry) => entry.ids.length);
  const seatedIds = new Set(seated.flatMap((entry) => entry.ids));
  const partnersOf = (id: string) =>
    seated
      .filter((entry) => entry.ids.includes(id))
      .flatMap((entry) => entry.ids.filter((p) => p !== id));
  const visible = eligible.filter((student) =>
    student.displayName.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const added = [...checked].filter((id) => !target.pending.includes(id));
  const removed = target.pending.filter((id) => !checked.has(id));
  const changed = added.length + removed.length > 0;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busy) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, busy]);

  function toggle(id: string) {
    setChecked((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function save() {
    setBusy(true);
    setError('');
    try {
      await request('/api/assignments', {
        method: 'PATCH',
        body: JSON.stringify({
          action: 'students',
          division: target.division,
          eventId: target.eventId,
          kind: target.kind,
          targetId: target.targetId,
          studentIds: [...checked],
          due,
          timeZone,
        }),
      });
      await onSaved();
    } catch (error) {
      setError(authMessage(error));
      setBusy(false);
    }
  }

  return (
    <div className="assign-modal-overlay" onClick={() => !busy && onClose()} role="presentation">
      <div
        className="assign-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Students assigned ${target.title}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="assign-modal-heading">
          <div>
            <p className="eyebrow">
              {target.eventName.toUpperCase()} · DIVISION {target.division} ·{' '}
              {target.kind.toUpperCase()}
            </p>
            <h2>Students assigned {target.title}</h2>
            <p>
              Tick students to give them this work, untick to take it away. Students who finished it
              keep their record. New students are due{' '}
              <input
                type="date"
                aria-label="Due date for added students"
                value={due}
                min={today}
                onChange={(e) => setDue(e.target.value)}
              />
            </p>
          </div>
          <button className="button button-small button-glass" disabled={busy} onClick={onClose}>
            Close
          </button>
        </div>
        <div className="event-toolbar">
          <label className="search-field">
            <span className="sr-only">Search students</span>
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find a student by name"
            />
          </label>
          {seatedIds.size > 0 && (
            <button
              className="text-link"
              onClick={() =>
                setChecked(
                  (current) =>
                    new Set([...current, ...[...seatedIds].filter((id) => !finished.has(id))]),
                )
              }
            >
              Add everyone seated in {target.eventName}
            </button>
          )}
          {checked.size > 0 && (
            <button className="text-link" onClick={() => setChecked(new Set())}>
              Untick all
            </button>
          )}
        </div>
        <p className="selection-summary" role="status">
          {count(checked.size, 'student')} will have it
          {finished.size ? ` · ${finished.size} finished` : ''}
          {added.length ? ` · ${added.length} to add` : ''}
          {removed.length ? ` · ${removed.length} to remove` : ''}
        </p>
        <div className="assign-student-list" role="group" aria-label="Assigned students">
          {visible.map((student) => {
            const done = finished.has(student.id);
            const isChecked = done || checked.has(student.id);
            const had = target.pending.includes(student.id);
            const partners = partnersOf(student.id);
            const unassignedPartner = partners.some((id) => !checked.has(id) && !finished.has(id));
            return (
              <label key={student.id} className="assign-student-row" data-checked={isChecked}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={done || busy}
                  onChange={() => toggle(student.id)}
                  aria-label={`${student.displayName} has this work`}
                />
                <span className="student-avatar">
                  {student.displayName.slice(0, 2).toUpperCase()}
                </span>
                <span className="assign-student-main">
                  <strong>
                    {student.displayName}
                    {done ? (
                      <span className="tag">COMPLETED</span>
                    ) : had && !checked.has(student.id) ? (
                      <span className="tag">REMOVING</span>
                    ) : !had && checked.has(student.id) ? (
                      <span className="tag">ADDING</span>
                    ) : null}
                  </strong>
                  <small className="assign-student-events">
                    {partners.length ? (
                      <span className="assign-event-chip">
                        Partner: {partners.map((id) => names.get(id)).join(', ')}
                        {isChecked && unassignedPartner ? ' (not assigned)' : ''}
                      </span>
                    ) : (
                      <span className="assign-event-chip assign-event-empty">
                        {seatedIds.has(student.id)
                          ? 'No partner seated yet'
                          : 'Not seated in this event'}
                      </span>
                    )}
                  </small>
                </span>
                <span className="tag">DIV {student.division}</span>
              </label>
            );
          })}
        </div>
        {!visible.length && (
          <div className="empty-state">
            <Users size={26} />
            <h3>
              {eligible.length
                ? 'No students match that name.'
                : `No Division ${target.division} students on your roster yet.`}
            </h3>
          </div>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="assign-modal-footer">
          <span>
            {removed.length
              ? `Unticked students lose their unfinished copy (${removed.length}). This can’t be undone.`
              : 'Partners are not added automatically here.'}
          </span>
          <button
            className="button button-primary"
            disabled={busy || !changed || (added.length > 0 && !due)}
            onClick={save}
          >
            {busy ? 'Saving…' : 'Save students'}
          </button>
        </div>
      </div>
    </div>
  );
}
