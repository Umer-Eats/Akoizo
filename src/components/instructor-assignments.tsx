'use client';
import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, FileText, Search, Users } from 'lucide-react';
import { eventSlots, slotForEvent } from '@/lib/event-slots';
import {
  eventsForDivision,
  type Division,
  type ScienceEvent,
} from '@/lib/events';
import {
  competitionLevels,
  practiceDifficulties,
  practiceTitle,
  matchesPracticeFilters,
  type PracticeSummary,
} from '@/lib/practice-types';
import { dateInZone, type Assignment, type Student } from '@/lib/domain';
import { useAuth, authMessage } from './auth-context';

function eventDisplayName(eventId: string): string {
  for (const division of ['A', 'B', 'C'] as const) {
    const found = eventsForDivision(division).find((event) => event.id === eventId);
    if (found) return found.name;
  }
  return eventId
    .split('-')
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(' ');
}

export function InstructorEventCatalog({
  division,
  onDivision,
  onSelect,
}: {
  division: Division;
  onDivision: (division: Division) => void;
  onSelect: (event: ScienceEvent) => void;
}) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const [slotFilter, setSlotFilter] = useState('All');
  const events = eventsForDivision(division);
  const matches = events.filter(
    (event) =>
      `${event.name} ${event.category}`.toLowerCase().includes(query.toLowerCase()) &&
      (type === 'All' || event.type === type) &&
      (slotFilter === 'All' || slotForEvent(event.id)?.color === slotFilter),
  );
  return (
    <>
      <div className="dashboard-section-title">
        <h2>Choose an event to assign.</h2>
        <span className="tag">
          {division === 'A' ? 'FLORIDA · 15 EVENTS + 2 SPECIAL' : '2027 SEASON · 23 EVENTS'}
        </span>
      </div>
      <div className="event-toolbar">
        <label className="search-field">
          <span className="sr-only">Search events</span>
          <Search size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find an event or subject"
          />
        </label>
        <label className="division-control">
          Division
          <select
            aria-label="Assignment division"
            value={division}
            onChange={(e) => onDivision(e.target.value as Division)}
          >
            {(['A', 'B', 'C'] as const).map((value) => (
              <option key={value} value={value}>
                Division {value}
              </option>
            ))}
          </select>
        </label>
        <label className="event-type-filter">
          Event type
          <select aria-label="Event type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="All">All types</option>
            {['Study', 'Build', 'Lab', 'Skill'].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="slot-legend" role="group" aria-label="Filter by timeslot">
        <button
          className="slot-chip"
          data-slot="unassigned"
          aria-pressed={slotFilter === 'All'}
          onClick={() => setSlotFilter('All')}
        >
          All timeslots
        </button>
        {eventSlots.map((slot) => (
          <button
            className="slot-chip"
            data-slot={slot.color}
            key={slot.color}
            aria-pressed={slotFilter === slot.color}
            onClick={() => setSlotFilter(slotFilter === slot.color ? 'All' : slot.color)}
          >
            {slot.label} timeslot
          </button>
        ))}
      </div>
      <div className="event-grid">
        {matches.map((event) => {
          const slot = slotForEvent(event.id);
          return (
            <article
              className="event-card selectable-event"
              data-slot={slot?.color ?? 'unassigned'}
              key={event.id}
            >
              <button className="event-card-link" onClick={() => onSelect(event)}>
                <span className="eyebrow">{event.category.toUpperCase()}</span>
                <h3>{event.name}</h3>
                <span className="sr-only">
                  {slot ? `${slot.label} timeslot` : 'Timeslot not assigned'}
                </span>
                <div className="event-card-footer">
                  <span>
                    DIVISION {division} · {event.type.toUpperCase()}
                    {event.special ? ' · SPECIAL' : ''}
                  </span>
                  <span aria-hidden="true">↗</span>
                </div>
              </button>
            </article>
          );
        })}
      </div>
      {!matches.length && (
        <div className="empty-state">
          <h3>No matching events.</h3>
          <button
            className="text-link"
            onClick={() => {
              setQuery('');
              setType('All');
              setSlotFilter('All');
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}

function InstructorTestList({
  division,
  event,
  onAssign,
}: {
  division: Division;
  event: ScienceEvent;
  onAssign: (test: PracticeSummary) => void;
}) {
  const { request } = useAuth();
  const [tests, setTests] = useState<PracticeSummary[] | null>(null);
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('');
  const [year, setYear] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    setTests(null);
    setError('');
    request<{ tests: PracticeSummary[] }>(
      `/api/practice?division=${division}&eventId=${encodeURIComponent(event.id)}`,
    )
      .then((data) => {
        if (active) setTests(data.tests);
      })
      .catch((error) => {
        if (active) setError(authMessage(error));
      });
    return () => {
      active = false;
    };
  }, [request, division, event.id, retry]);

  const filters = { query, level, year, topic, difficulty };
  const matches = tests?.filter((test) => matchesPracticeFilters(test, filters)) ?? [];
  const availableTopics = [...new Set((tests ?? []).flatMap((test) => test.topics))].sort();

  return (
    <section aria-label={`Converted tests for ${event.name}`}>
      <div className="event-toolbar">
        <label className="search-field">
          <span className="sr-only">Search converted tests</span>
          <Search size={16} />
          <input
            aria-label="Search converted tests"
            placeholder="Search competition, year, or topic…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <div className="practice-filters">
        <label>
          Level
          <select aria-label="Level" value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="">All levels</option>
            {competitionLevels.map((value) => (
              <option key={value}>{value}</option>
            ))}
            <option value="unreported">Level not reported</option>
          </select>
        </label>
        <label>
          Year
          <select aria-label="Year" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">All years</option>
            {[...new Set((tests ?? []).map((t) => t.year))]
              .sort((a, b) => b - a)
              .map((value) => (
                <option key={value}>{value}</option>
              ))}
          </select>
        </label>
        {availableTopics.length > 0 && (
          <label>
            Topic
            <select aria-label="Topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="">All topics</option>
              {availableTopics.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
        )}
        <label>
          Difficulty
          <select
            aria-label="Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">All difficulties</option>
            {practiceDifficulties.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        {(query || level || year || topic || difficulty) && (
          <button
            className="text-link"
            onClick={() => {
              setQuery('');
              setLevel('');
              setYear('');
              setTopic('');
              setDifficulty('');
            }}
          >
            Clear filters
          </button>
        )}
      </div>
      {error ? (
        <div className="practice-empty">
          <p role="alert">{error}</p>
          <button className="button button-secondary" onClick={() => setRetry((n) => n + 1)}>
            Try again
          </button>
        </div>
      ) : !tests ? (
        <p role="status">Loading converted tests…</p>
      ) : (
        <>
          <p className="practice-count" aria-live="polite">
            {matches.length} {matches.length === 1 ? 'test' : 'tests'} ready to assign
          </p>
          {matches.length ? (
            <ul className="practice-test-list instructor-test-list">
              {matches.map((test) => (
                <li key={test.id}>
                  <div className="instructor-test-card">
                    <span className="practice-test-icon">
                      <FileText size={22} />
                    </span>
                    <div className="instructor-test-body">
                      <h2>{practiceTitle(test)}</h2>
                      <span
                        className={`practice-difficulty practice-difficulty-${test.difficulty.toLowerCase()}`}
                      >
                        {test.difficulty}
                      </span>
                      <p>{test.topics.join(' · ')}</p>
                      <span>
                        {test.questionCount} answer fields <b>·</b> {test.maxScore} points
                      </span>
                    </div>
                    <button
                      className="assign-pill"
                      onClick={() => onAssign(test)}
                      aria-label={`Assign test ${practiceTitle(test)}`}
                    >
                      Assign test
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="practice-empty">
              <FileText size={30} />
              <h2>
                {tests.length ? 'No tests match your search.' : 'No converted tests for this event yet.'}
              </h2>
              <p>
                {tests.length
                  ? 'Try a different competition, year, level, topic, or difficulty.'
                  : 'Tests appear here after the original questions are converted.'}
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function AssignTestModal({
  division,
  event,
  test,
  students,
  selections,
  assignments,
  onClose,
  onAssigned,
}: {
  division: Division;
  event: ScienceEvent;
  test: PracticeSummary;
  students: Student[];
  selections: Record<string, string[]>;
  assignments: Assignment[];
  onClose: () => void;
  onAssigned: () => Promise<void>;
}) {
  const { request } = useAuth();
  const [search, setSearch] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('All');
  const [eventFilter, setEventFilter] = useState('All');
  const [checked, setChecked] = useState<string[]>([]);
  const [due, setDue] = useState(() => {
    const next = new Date();
    next.setDate(next.getDate() + 7);
    return next.toISOString().slice(0, 10);
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const eventOptions = useMemo(() => {
    const ids = new Set<string>();
    for (const list of Object.values(selections)) for (const id of list) ids.add(id);
    ids.add(event.id);
    return [...ids].sort((a, b) => eventDisplayName(a).localeCompare(eventDisplayName(b)));
  }, [selections, event.id]);

  const visible = students.filter((student) => {
    const haystack = `${student.displayName}`.toLowerCase();
    if (search.trim() && !haystack.includes(search.trim().toLowerCase())) return false;
    if (divisionFilter !== 'All' && student.division !== divisionFilter) return false;
    if (eventFilter !== 'All') {
      const list = selections[student.id] ?? [];
      if (!list.includes(eventFilter)) return false;
    }
    return true;
  });

  const assignedTestIds = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const assignment of assignments) {
      if (assignment.completedAt || !assignment.testId) continue;
      if (!map.has(assignment.studentId)) map.set(assignment.studentId, new Set());
      map.get(assignment.studentId)!.add(assignment.testId);
    }
    return map;
  }, [assignments]);

  function toggle(id: string) {
    setChecked((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  }

  async function submit() {
    if (!checked.length || busy) return;
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await request('/api/assignments', {
        method: 'POST',
        body: JSON.stringify({
          studentIds: checked,
          eventId: event.id,
          division,
          type: 'Practice',
          due,
          timeZone,
          testId: test.id,
        }),
      });
      setNotice(
        `Assigned “${practiceTitle(test)}” to ${checked.length} ${checked.length === 1 ? 'student' : 'students'}.`,
      );
      setChecked([]);
      await onAssigned();
    } catch (error) {
      setError(authMessage(error));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="assign-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="assign-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Assign ${practiceTitle(test)}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="assign-modal-heading">
          <div>
            <p className="eyebrow">
              {event.name.toUpperCase()} · DIVISION {division}
            </p>
            <h2>Assign {practiceTitle(test)}</h2>
            <p>
              {test.questionCount} answer fields · {test.maxScore} points · Due{' '}
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
        <div className="event-toolbar">
          <label className="search-field">
            <span className="sr-only">Search students</span>
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students by name"
            />
          </label>
          <label className="division-control">
            Division
            <select
              aria-label="Filter students by division"
              value={divisionFilter}
              onChange={(e) => setDivisionFilter(e.target.value)}
            >
              <option value="All">All divisions</option>
              {(['A', 'B', 'C'] as const).map((value) => (
                <option key={value} value={value}>
                  Division {value}
                </option>
              ))}
            </select>
          </label>
          <label className="event-type-filter">
            Student event
            <select
              aria-label="Filter students by event"
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
            >
              <option value="All">All events</option>
              {eventOptions.map((id) => (
                <option key={id} value={id}>
                  {eventDisplayName(id)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="selection-summary" role="status">
          {visible.length} {visible.length === 1 ? 'student' : 'students'} · {checked.length}{' '}
          selected · Events shown come from each student’s event picks.
        </p>
        <div className="assign-student-list" role="group" aria-label="Select students">
          {visible.map((student) => {
            const list = selections[student.id] ?? [];
            const already = assignedTestIds.get(student.id)?.has(test.id);
            const isChecked = checked.includes(student.id);
            return (
              <label
                key={student.id}
                className="assign-student-row"
                data-checked={isChecked}
                data-division={student.division}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(student.id)}
                  aria-label={`Assign to ${student.displayName}`}
                />
                <span className="student-avatar">
                  {student.displayName.slice(0, 2).toUpperCase()}
                </span>
                <span className="assign-student-main">
                  <strong>
                    {student.displayName}
                    {already && <span className="tag">ASSIGNED</span>}
                  </strong>
                  <small className="assign-student-events">
                    {list.length ? (
                      list.map((id) => (
                        <span key={id} className="assign-event-chip">
                          {eventDisplayName(id)}
                        </span>
                      ))
                    ) : (
                      <span className="assign-event-chip assign-event-empty">
                        No events picked yet
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
            <h3>No students match these filters.</h3>
            <button
              className="text-link"
              onClick={() => {
                setSearch('');
                setDivisionFilter('All');
                setEventFilter('All');
              }}
            >
              Clear student filters
            </button>
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
            {checked.length} selected · Students see this as a Practice assignment due {due || '—'}.
          </span>
          <button
            className="button button-primary"
            disabled={busy || !checked.length || !due}
            onClick={submit}
          >
            {busy ? 'Assigning…' : `Assign test to ${checked.length || ''}`.trim()}
          </button>
        </div>
      </div>
    </div>
  );
}

export function InstructorAssignments({
  students,
  selections,
  assignments,
  onAssigned,
}: {
  students: Student[];
  selections: Record<string, string[]>;
  assignments: Assignment[];
  onAssigned: () => Promise<void>;
}) {
  const [division, setDivision] = useState<Division>('C');
  const [activeEvent, setActiveEvent] = useState<ScienceEvent | null>(null);
  const [activeTest, setActiveTest] = useState<PracticeSummary | null>(null);

  useEffect(() => {
    setActiveEvent(null);
    setActiveTest(null);
  }, [division]);

  if (!students.length) {
    return (
      <div className="empty-state">
        <Users size={32} />
        <h2>Your team starts here.</h2>
        <p>
          Share your school password. Students will appear here after they create an account and
          join your school.
        </p>
      </div>
    );
  }

  if (!activeEvent) {
    return (
      <InstructorEventCatalog
        division={division}
        onDivision={setDivision}
        onSelect={setActiveEvent}
      />
    );
  }

  return (
    <>
      <button className="back-link" onClick={() => setActiveEvent(null)}>
        <ChevronLeft size={16} /> All Division {division} events
      </button>
      <div className="dashboard-section-title">
        <h2>{activeEvent.name} tests.</h2>
        <span className="tag">DIVISION {division} · CONVERTED TESTS</span>
      </div>
      <InstructorTestList
        division={division}
        event={activeEvent}
        onAssign={setActiveTest}
      />
      {activeTest && (
        <AssignTestModal
          division={division}
          event={activeEvent}
          test={activeTest}
          students={students}
          selections={selections}
          assignments={assignments}
          onClose={() => setActiveTest(null)}
          onAssigned={onAssigned}
        />
      )}
    </>
  );
}
