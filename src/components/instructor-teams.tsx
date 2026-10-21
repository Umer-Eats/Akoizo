'use client';
import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Trash2, TriangleAlert, Users } from 'lucide-react';
import { eventSlots, slotForEvent } from '@/lib/event-slots';
import { eventsForDivision, type Division, type ScienceEvent } from '@/lib/events';
import type { Student } from '@/lib/domain';
import { partnerLimit, rosterDivision, TEAM_SIZE, type TeamSheet } from '@/lib/teams';
import { useAuth, authMessage } from './auth-context';
import './teams.css';

const initials = (name: string) => name.slice(0, 2).toUpperCase();
const seatedIn = (team: TeamSheet, studentId: string) =>
  Object.entries(team.slots)
    .filter(([, seats]) => seats.includes(studentId))
    .map(([eventId]) => eventId);
/** Events one student holds in the same timeslot: they cannot compete in both. */
function clashes(team: TeamSheet, studentId: string, events: ScienceEvent[]) {
  const mine = seatedIn(team, studentId);
  return eventSlots.flatMap((slot) => {
    const held = mine.filter((id) => (slot.events as readonly string[]).includes(id));
    return held.length > 1
      ? [
          {
            slot,
            events: held,
            label: `${slot.label}: ${held.map((id) => events.find((e) => e.id === id)?.name ?? id).join(' + ')}`,
          },
        ]
      : [];
  });
}

function StudentPicker({
  team,
  event,
  seat,
  students,
  selections,
  teams,
  busy,
  onPick,
  onClose,
}: {
  team: TeamSheet;
  event: ScienceEvent;
  seat: number;
  students: Student[];
  selections: Record<string, string[]>;
  teams: TeamSheet[];
  busy: boolean;
  onPick: (studentId: string | null) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState('');
  const current = team.slots[event.id][seat];
  const slot = slotForEvent(event.id);
  const eligible = students.filter((student) => student.division === team.division);
  const hidden = students.length - eligible.length;
  const cards = eligible
    .filter((student) => student.displayName.toLowerCase().includes(search.trim().toLowerCase()))
    .map((student) => {
      const mine = seatedIn(team, student.id);
      return {
        student,
        count: mine.length,
        picked: (selections[student.id] ?? []).includes(event.id),
        here: team.slots[event.id].includes(student.id),
        clash: slot
          ? mine.find((id) => id !== event.id && (slot.events as readonly string[]).includes(id))
          : undefined,
        elsewhere: teams.filter(
          (other) => other.id !== team.id && seatedIn(other, student.id).length,
        ),
      };
    })
    .sort(
      (a, b) =>
        Number(b.picked) - Number(a.picked) ||
        a.count - b.count ||
        a.student.displayName.localeCompare(b.student.displayName),
    );
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="assign-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="assign-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Choose a student for ${event.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="assign-modal-heading">
          <div>
            <p className="eyebrow">
              {team.name.toUpperCase()} ·{' '}
              {slot ? `${slot.label.toUpperCase()} TIMESLOT` : 'NO TIMESLOT'}
            </p>
            <h2>
              {event.name} · Partner {seat + 1}
            </h2>
            <p>Select the student who competes in this event.</p>
          </div>
          <button className="button button-small button-glass" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="event-toolbar">
          <label className="search-field">
            <span className="sr-only">Search students</span>
            <Search size={16} />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students by name"
            />
          </label>
          {current && (
            <button className="text-link" disabled={busy} onClick={() => onPick(null)}>
              Clear this seat
            </button>
          )}
        </div>
        <div className="assign-student-list" role="group" aria-label="Students">
          {cards.map(({ student, count, picked, here, clash, elsewhere }) => (
            <button
              key={student.id}
              className="assign-student-row student-card"
              data-checked={student.id === current}
              disabled={busy}
              onClick={() => onPick(student.id)}
              aria-label={`Seat ${student.displayName} in ${event.name}`}
            >
              <span className="student-avatar">{initials(student.displayName)}</span>
              <span className="assign-student-main">
                <strong>
                  {student.displayName}
                  {student.id === current && <span className="tag">IN THIS SEAT</span>}
                  {here && student.id !== current && <span className="tag">MOVES HERE</span>}
                </strong>
                <small className="assign-student-events">
                  {picked && (
                    <span className="assign-event-chip student-card-picked">Picked this event</span>
                  )}
                  <span className="assign-event-chip">
                    {count} {count === 1 ? 'event' : 'events'} on this team
                  </span>
                  {clash && (
                    <span className="assign-event-chip student-card-clash">
                      Same timeslot as{' '}
                      {eventsForDivision(team.division).find((e) => e.id === clash)?.name}
                    </span>
                  )}
                  {elsewhere.map((other) => (
                    <span className="assign-event-chip" key={other.id}>
                      Also on {other.name}
                    </span>
                  ))}
                </small>
              </span>
              <span className="tag">DIV {student.division}</span>
            </button>
          ))}
        </div>
        {!cards.length && (
          <div className="empty-state">
            <Users size={26} />
            <h3>
              {eligible.length
                ? 'No students match that name.'
                : `No Division ${team.division} students on your roster yet.`}
            </h3>
          </div>
        )}
        {hidden > 0 && (
          <p className="selection-summary">
            {hidden}{' '}
            {hidden === 1 ? 'student in another division is' : 'students in other divisions are'}{' '}
            hidden. A team seats students from its own division.
          </p>
        )}
      </div>
    </div>
  );
}

function Sheet({
  team,
  teams,
  students,
  selections,
  onChange,
  onError,
}: {
  team: TeamSheet;
  teams: TeamSheet[];
  students: Student[];
  selections: Record<string, string[]>;
  onChange: (teams: TeamSheet[]) => void;
  onError: (message: string) => void;
}) {
  const { request } = useAuth();
  const [name, setName] = useState(team.name);
  const [busy, setBusy] = useState(false);
  const [picker, setPicker] = useState<{ event: ScienceEvent; seat: number } | null>(null);
  const events = useMemo(
    () => [...eventsForDivision(team.division)].sort((a, b) => a.name.localeCompare(b.name)),
    [team.division],
  );
  const byId = useMemo(() => new Map(students.map((s) => [s.id, s])), [students]);
  const roster = [...new Set(Object.values(team.slots).flat())]
    .flatMap((id) => (id && byId.has(id) ? [byId.get(id)!] : []))
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
  useEffect(() => setName(team.name), [team.name]);

  async function send(method: 'PATCH' | 'DELETE', body?: Record<string, unknown>) {
    setBusy(true);
    onError('');
    try {
      onChange(
        await request<TeamSheet[]>(
          method === 'DELETE' ? `/api/teams?id=${encodeURIComponent(team.id)}` : '/api/teams',
          { method, body: body ? JSON.stringify({ teamId: team.id, ...body }) : undefined },
        ),
      );
      return true;
    } catch (error) {
      onError(authMessage(error));
      return false;
    } finally {
      setBusy(false);
    }
  }
  async function rename() {
    if (name.trim() === team.name) return setName(team.name);
    if (!name.trim() || !(await send('PATCH', { name }))) setName(team.name);
  }
  return (
    <div className="team-sheet">
      <div className="team-sheet-title">
        <input
          aria-label="Team name"
          value={name}
          maxLength={60}
          disabled={busy}
          onChange={(e) => setName(e.target.value)}
          onBlur={rename}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur();
          }}
        />
        <span className="tag">DIVISION {team.division}</span>
        <span className="tag" data-over={roster.length > TEAM_SIZE}>
          {roster.length} / {TEAM_SIZE} STUDENTS
        </span>
        <button
          className="team-sheet-delete"
          disabled={busy}
          onClick={() => {
            if (window.confirm(`Delete ${team.name}? Its event seats are removed.`))
              void send('DELETE');
          }}
        >
          <Trash2 size={14} aria-hidden="true" /> Delete team
        </button>
      </div>
      <div className="team-grid-wrap" role="region" aria-label={`${team.name} roster`} tabIndex={0}>
        <table className="team-grid team-roster">
          <thead>
            <tr>
              <th scope="col">Student</th>
              <th scope="col">Events</th>
              <th scope="col">Timeslots</th>
            </tr>
          </thead>
          <tbody>
            {roster.map((student) => {
              const mine = seatedIn(team, student.id);
              const conflict = clashes(team, student.id, events);
              return (
                <tr key={student.id}>
                  <th scope="row">
                    <span className="team-card">
                      <span className="student-avatar">{initials(student.displayName)}</span>
                      {student.displayName}
                    </span>
                  </th>
                  <td className="team-count">{mine.length}</td>
                  <td>
                    <span className="team-dots">
                      {mine.map((id) => (
                        <span
                          key={id}
                          className="team-dot"
                          data-slot={slotForEvent(id)?.color ?? 'unassigned'}
                          title={events.find((e) => e.id === id)?.name}
                        />
                      ))}
                      {conflict.map((clash) => (
                        <span className="team-clash" key={clash.slot.color}>
                          <TriangleAlert size={13} aria-hidden="true" /> {clash.label}
                        </span>
                      ))}
                    </span>
                  </td>
                </tr>
              );
            })}
            {!roster.length && (
              <tr>
                <td colSpan={3} className="team-grid-empty">
                  Students appear here as you add them to events below.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="slot-legend" aria-label="Timeslot colors">
        {eventSlots.map((slot) => (
          <span className="slot-chip" data-slot={slot.color} key={slot.color}>
            {slot.label} timeslot
          </span>
        ))}
        <span className="slot-chip" data-slot="unassigned">
          No timeslot
        </span>
      </div>
      <div className="team-grid-wrap" role="region" aria-label={`${team.name} events`} tabIndex={0}>
        <table className="team-grid team-events">
          <thead>
            <tr>
              <th scope="col">Event</th>
              <th scope="col">Partner 1</th>
              <th scope="col">Partner 2</th>
              <th scope="col">Partner 3</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              const slot = slotForEvent(event.id);
              return (
                <tr key={event.id} data-slot={slot?.color ?? 'unassigned'}>
                  <th scope="row">
                    {event.name}
                    <span className="sr-only">
                      {slot ? `, ${slot.label} timeslot` : ', no timeslot'}
                    </span>
                  </th>
                  {[0, 1, 2].map((seat) => {
                    if (seat >= partnerLimit(event.id))
                      return <td key={seat} className="team-seat-none" aria-hidden="true" />;
                    const student = byId.get(team.slots[event.id]?.[seat] ?? '');
                    const clash =
                      student &&
                      clashes(team, student.id, events).find((c) => c.events.includes(event.id));
                    return (
                      <td key={seat}>
                        <button
                          className="team-seat"
                          data-empty={!student}
                          data-clash={!!clash}
                          disabled={busy}
                          title={clash ? `Timeslot clash — ${clash.label}` : undefined}
                          onClick={() => setPicker({ event, seat })}
                          aria-label={
                            student
                              ? `${event.name} partner ${seat + 1}: ${student.displayName}. Change`
                              : `Add a student to ${event.name} partner ${seat + 1}`
                          }
                        >
                          {student ? (
                            <>
                              <span className="student-avatar">
                                {initials(student.displayName)}
                              </span>
                              <span>{student.displayName}</span>
                              {clash && <TriangleAlert size={13} aria-hidden="true" />}
                            </>
                          ) : (
                            <>
                              <Plus size={13} aria-hidden="true" /> Add student
                            </>
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {picker && (
        <StudentPicker
          team={team}
          event={picker.event}
          seat={picker.seat}
          students={students}
          selections={selections}
          teams={teams}
          busy={busy}
          onClose={() => setPicker(null)}
          onPick={async (studentId) => {
            if (await send('PATCH', { eventId: picker.event.id, slot: picker.seat, studentId }))
              setPicker(null);
          }}
        />
      )}
    </div>
  );
}

/** Spreadsheet-style team builder: one sheet per team, one row per event, a seat per partner. */
export function InstructorTeams({
  students,
  selections,
}: {
  students: Student[];
  selections: Record<string, string[]>;
}) {
  const { request, profile } = useAuth();
  const [teams, setTeams] = useState<TeamSheet[] | null>(null);
  const [activeId, setActiveId] = useState('');
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);
  // Start new teams in the division most of the roster competes in.
  const [division, setDivision] = useState<Division>(() =>
    rosterDivision(students, profile?.schoolCommunityName ?? profile?.schoolName),
  );
  useEffect(() => {
    let active = true;
    request<TeamSheet[]>('/api/teams')
      .then((rows) => {
        if (active) {
          setTeams(rows);
          setError('');
        }
      })
      .catch((error) => {
        if (active) setError(authMessage(error));
      });
    return () => {
      active = false;
    };
  }, [request, retry]);
  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (creating || !name.trim()) return;
    setCreating(true);
    setError('');
    try {
      const created = await request<{ id: string; teams: TeamSheet[] }>('/api/teams', {
        method: 'POST',
        body: JSON.stringify({ name, division }),
      });
      setTeams(created.teams);
      setActiveId(created.id);
      setName('');
    } catch (error) {
      setError(authMessage(error));
    } finally {
      setCreating(false);
    }
  }
  if (!teams)
    return error ? (
      <div className="practice-empty">
        <p role="alert">{error}</p>
        <button className="button button-secondary" onClick={() => setRetry((n) => n + 1)}>
          Try again
        </button>
      </div>
    ) : (
      <p role="status">Loading your teams…</p>
    );
  const active = teams.find((team) => team.id === activeId) ?? teams[0];
  return (
    <section aria-label="Teams">
      <div className="dashboard-section-title">
        <h2>Build your teams.</h2>
        <span className="tag">
          {teams.length} {teams.length === 1 ? 'TEAM' : 'TEAMS'}
        </span>
      </div>
      <div className="team-tabs">
        <div className="tabs" role="tablist" aria-label="Teams">
          {teams.map((team) => (
            <button
              key={team.id}
              role="tab"
              aria-selected={team.id === active?.id}
              onClick={() => setActiveId(team.id)}
            >
              {team.name}
            </button>
          ))}
        </div>
        <form className="team-create" onSubmit={create}>
          <input
            aria-label="New team name"
            placeholder="New team name"
            value={name}
            maxLength={60}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            aria-label="New team division"
            value={division}
            onChange={(e) => setDivision(e.target.value as Division)}
          >
            {(['A', 'B', 'C'] as const).map((value) => (
              <option key={value} value={value}>
                Division {value}
              </option>
            ))}
          </select>
          <button className="assign-pill" type="submit" disabled={creating || !name.trim()}>
            <Plus size={14} aria-hidden="true" /> {creating ? 'Adding…' : 'Add team'}
          </button>
        </form>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {active ? (
        <Sheet
          key={active.id}
          team={active}
          teams={teams}
          students={students}
          selections={selections}
          onChange={setTeams}
          onError={setError}
        />
      ) : (
        <div className="empty-state">
          <Users size={32} />
          <h3>No teams yet.</h3>
          <p>
            Name your first team above. Then seat each student and their partner in their events.
            Ranked tests go to everyone seated in an event.
          </p>
        </div>
      )}
      <p className="source-note">
        Row colors follow each event’s tournament timeslot. A student seated in two events of the
        same color is flagged, because those events run at the same time. Partners in an event
        always receive the same ranked test.
      </p>
    </section>
  );
}
