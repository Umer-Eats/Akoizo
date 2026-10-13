'use client';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Search, Users } from 'lucide-react';
import type { Division } from '@/lib/events';
import { dateInZone, type Student } from '@/lib/domain';
import type { TeamSheet } from '@/lib/teams';
import { authMessage } from './auth-context';
import './ranked.css';

const count = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;
export type AssignTarget = { everyone: true } | { studentIds: string[] };
export type AssignResult = { assigned: number; alreadyAssigned: number };

/** Teams whose sheet seats students in one event, with those students. */
export function seatedTeams(division: Division, eventId: string, teams: TeamSheet[]) {
  return teams
    .filter((team) => team.division === division)
    .map((team) => ({
      team,
      ids: (team.slots[eventId] ?? []).filter((id): id is string => !!id),
    }))
    .filter((entry) => entry.ids.length);
}

/**
 * Assign one piece of work in one event: to everyone seated in the event across all teams, or to
 * chosen students, who bring their event partners with them.
 */
export function AssignEventModal({
  division,
  eventId,
  eventName,
  eyebrow,
  title,
  meta,
  noun,
  footer,
  already,
  students,
  teams,
  onClose,
  onAssign,
}: {
  division: Division;
  eventId: string;
  eventName: string;
  eyebrow: string;
  title: string;
  /** Facts about the work, shown before the due date. */
  meta: ReactNode;
  /** What partners share, such as "test" or "lesson". */
  noun: string;
  footer: string;
  /** Students who already have this work. */
  already: Set<string>;
  students: Student[];
  teams: TeamSheet[];
  onClose: () => void;
  onAssign: (body: AssignTarget & { due: string; timeZone: string }) => Promise<AssignResult>;
}) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [due, setDue] = useState(() => {
    const next = new Date();
    next.setDate(next.getDate() + 7);
    return dateInZone(timeZone, next);
  });
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const names = useMemo(() => new Map(students.map((s) => [s.id, s.displayName])), [students]);
  const eligible = students.filter((student) => student.division === division);
  const seated = seatedTeams(division, eventId, teams)
    .map((entry) => ({ ...entry, ids: entry.ids.filter((id) => names.has(id)) }))
    .filter((entry) => entry.ids.length);
  const everyone = new Set(seated.flatMap((entry) => entry.ids));
  const partnersOf = (id: string) =>
    seated
      .filter((entry) => entry.ids.includes(id))
      .flatMap((entry) => entry.ids.filter((p) => p !== id));
  const recipients = new Set(checked.flatMap((id) => [id, ...partnersOf(id)]));
  const visible = eligible.filter((student) =>
    student.displayName.toLowerCase().includes(search.trim().toLowerCase()),
  );
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  async function assign(body: AssignTarget) {
    if (busy) return;
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const result = await onAssign({ due, timeZone, ...body });
      setNotice(
        `Assigned to ${count(result.assigned, 'student')}.${result.alreadyAssigned ? ` ${count(result.alreadyAssigned, 'student')} already had this ${noun}.` : ''}`,
      );
      setChecked([]);
    } catch (error) {
      setError(authMessage(error));
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="assign-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="assign-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Assign ${title}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="assign-modal-heading">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2>Assign {title}</h2>
            <p>
              {meta} · Due{' '}
              <input
                type="date"
                aria-label="Due date"
                value={due}
                min={dateInZone(timeZone)}
                onChange={(e) => setDue(e.target.value)}
              />
            </p>
          </div>
          <button className="button button-small button-glass" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="ranked-everyone">
          <strong>Everyone in {eventName}, across all teams</strong>
          {seated.length ? (
            <ul>
              {seated.map(({ team, ids }) => (
                <li key={team.id}>
                  <strong>{team.name}:</strong> {ids.map((id) => names.get(id)).join(' + ')}
                </li>
              ))}
            </ul>
          ) : (
            <p className="ranked-test-meta">
              No students are seated in {eventName} yet. Seat them in the Teams tab, or choose
              students below.
            </p>
          )}
          <button
            className="button button-small button-primary"
            disabled={busy || !due || !everyone.size}
            onClick={() => assign({ everyone: true })}
          >
            {busy ? 'Assigning…' : `Assign to all ${count(everyone.size, 'student')}`}
          </button>
        </div>
        <div className="event-toolbar">
          <label className="search-field">
            <span className="sr-only">Search students</span>
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Or choose students by name"
            />
          </label>
        </div>
        <p className="selection-summary" role="status">
          {count(checked.length, 'student')} selected
          {recipients.size > checked.length
            ? ` · ${count(recipients.size, 'student')} with their event partners`
            : ''}{' '}
          · Partners always receive the same {noun}.
        </p>
        <div className="assign-student-list" role="group" aria-label="Select students">
          {visible.map((student) => {
            const partners = partnersOf(student.id);
            const isChecked = checked.includes(student.id);
            return (
              <label
                key={student.id}
                className="assign-student-row"
                data-checked={isChecked || recipients.has(student.id)}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() =>
                    setChecked((current) =>
                      isChecked
                        ? current.filter((id) => id !== student.id)
                        : [...current, student.id],
                    )
                  }
                  aria-label={`Assign to ${student.displayName}`}
                />
                <span className="student-avatar">
                  {student.displayName.slice(0, 2).toUpperCase()}
                </span>
                <span className="assign-student-main">
                  <strong>
                    {student.displayName}
                    {already.has(student.id) && <span className="tag">ASSIGNED</span>}
                  </strong>
                  <small className="assign-student-events">
                    {partners.length ? (
                      <span className="assign-event-chip">
                        Partner: {partners.map((id) => names.get(id)).join(', ')}
                      </span>
                    ) : (
                      <span className="assign-event-chip assign-event-empty">
                        {everyone.has(student.id)
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
                : `No Division ${division} students on your roster yet.`}
            </h3>
          </div>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {notice && (
          <p className="form-success" role="status">
            {notice}
          </p>
        )}
        <div className="assign-modal-footer">
          <span>
            {footer} Due {due || '—'}.
          </span>
          <button
            className="button button-primary"
            disabled={busy || !checked.length || !due}
            onClick={() => assign({ studentIds: checked })}
          >
            {busy ? 'Assigning…' : `Assign to ${count(recipients.size, 'selected student')}`}
          </button>
        </div>
      </div>
    </div>
  );
}
