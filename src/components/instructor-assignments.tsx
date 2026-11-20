'use client';
import { useCallback, useEffect, useState } from 'react';
import {
  BookOpen,
  ChevronLeft,
  Clock3,
  FileText,
  FlaskConical,
  Presentation,
  Search,
  Users,
} from 'lucide-react';
import { eventSlots, slotForEvent } from '@/lib/event-slots';
import { eventsForDivision, type Division, type ScienceEvent } from '@/lib/events';
import {
  competitionLevels,
  practiceDifficulties,
  practiceTitle,
  matchesPracticeFilters,
  type PracticeSummary,
} from '@/lib/practice-types';
import { PHET_LAB, dateInZone, type Assignment, type Student, type StudyKind } from '@/lib/domain';
import { lessonLabel, studyLabel, unitLabel } from '@/lib/lesson-labels';
import { lessonsForEvent } from '@/lib/lessons-registry';
import { deckFor } from '@/lib/presentations';
import { isActivity } from '@/lib/presentation-types';
import { labsForEvent, phetActivities } from '@/lib/division-c-labs';
import { rosterDivision, type TeamSheet } from '@/lib/teams';
import { AssignEventModal, type AssignResult } from './assign-event-modal';
import { AssignmentEditor } from './assignment-editor';
import { AssignedStudentsModal } from './assigned-students-modal';
import { useAuth, authMessage } from './auth-context';

type Work = { kind: 'Practice' | StudyKind; id: string; title: string; meta: string };
const practiceWork = (test: PracticeSummary): Work => ({
  kind: 'Practice',
  id: test.id,
  title: practiceTitle(test),
  meta: `${test.questionCount} answer fields · ${test.maxScore} points`,
});

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
  disabled,
}: {
  division: Division;
  event: ScienceEvent;
  onAssign: (test: PracticeSummary) => void;
  disabled: boolean;
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
                      disabled={disabled}
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
                {tests.length
                  ? 'No tests match your search.'
                  : 'No converted tests for this event yet.'}
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

/** One piece of work as it was handed out: the same item in the same event, for many students. */
type AssignedGroup = {
  key: string;
  eventId: string;
  eventName: string;
  kind: 'Practice' | StudyKind;
  /** The lesson, unit, lab or test id; empty for "any practice test in this event". */
  targetId: string;
  title: string;
  members: Assignment[];
  pending: Assignment[];
};

function groupAssigned(assignments: Assignment[], division: Division) {
  const groups = new Map<string, AssignedGroup>();
  for (const a of assignments) {
    if (a.ranked || a.division !== division) continue;
    const kind = a.study?.kind ?? 'Practice';
    const target = a.study?.targetId ?? a.testId ?? '';
    const key = `${a.eventId}|${kind}|${target}`;
    let group = groups.get(key);
    if (!group) {
      const course = a.study ? lessonsForEvent(a.eventId, division) : null;
      group = {
        key,
        eventId: a.eventId,
        eventName: a.eventName,
        kind,
        targetId: target,
        title: a.study
          ? studyLabel(course, a.study.kind, a.study.targetId, a.study.title)
          : a.testId
            ? (a.testTitle ?? a.testId)
            : 'Any practice test in this event',
        members: [],
        pending: [],
      };
      groups.set(key, group);
    }
    group.members.push(a);
    if (!a.completedAt) group.pending.push(a);
  }
  return [...groups.values()].sort(
    (a, b) =>
      a.eventName.localeCompare(b.eventName) ||
      a.title.localeCompare(b.title, undefined, { numeric: true }),
  );
}

/** Everything already assigned in a division, grouped so one edit reaches every student. */
function AssignedWork({
  assignments,
  division,
  onDivision,
  onChanged,
  students,
  teams,
}: {
  assignments: Assignment[];
  division: Division;
  onDivision: (division: Division) => void;
  onChanged: () => Promise<void>;
  students: Student[];
  teams: TeamSheet[] | null;
}) {
  const [query, setQuery] = useState('');
  const { request } = useAuth();
  const [editing, setEditing] = useState('');
  const [picking, setPicking] = useState('');
  const [removing, setRemoving] = useState('');
  const [busy, setBusy] = useState(false);
  const [removeError, setRemoveError] = useState('');
  const today = dateInZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  async function removeAll(ids: string[]) {
    setBusy(true);
    setRemoveError('');
    try {
      await request('/api/assignments', { method: 'DELETE', body: JSON.stringify({ ids }) });
      await onChanged();
      setRemoving('');
    } catch (error) {
      setRemoveError(authMessage(error));
    } finally {
      setBusy(false);
    }
  }
  const needle = query.trim().toLowerCase();
  const groups = groupAssigned(assignments, division).filter(
    (group) =>
      !needle ||
      `${group.eventName} ${group.title} ${group.members.map((m) => m.studentName).join(' ')}`
        .toLowerCase()
        .includes(needle),
  );
  return (
    <section aria-label="Already assigned work">
      <div className="event-toolbar">
        <label className="search-field">
          <span className="sr-only">Search assigned work</span>
          <Search size={16} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by event, lesson, or student"
          />
        </label>
        <label className="division-control">
          Division
          <select
            aria-label="Assigned work division"
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
      </div>
      <p className="source-note">
        Each item is grouped across every student who received it. Editing or removing it changes it
        for every student who has not finished it yet; finished work stays on their record. Ranked
        tests are managed from the Ranked Tests tab.
      </p>
      {!groups.length ? (
        <div className="empty-state">
          <Clock3 size={26} />
          <h3>{needle ? 'Nothing assigned matches your search.' : 'Nothing assigned yet.'}</h3>
          <p>
            {needle
              ? 'Try an event, lesson, or student name.'
              : `Work you assign in Division ${division} appears here.`}
          </p>
        </div>
      ) : (
        <div className="assignment-list">
          {groups.map((group) => {
            const dues = [...new Set(group.pending.map((a) => a.due))].sort();
            const done = group.members.length - group.pending.length;
            const names = group.members.map((m) => m.studentName);
            return (
              <article className="assignment-row assigned-group" key={group.key}>
                <Clock3 size={20} />
                <div>
                  <h3>{group.title}</h3>
                  <p>
                    {group.eventName} · {group.kind} · {group.members.length}{' '}
                    {group.members.length === 1 ? 'student' : 'students'}
                    {done ? ` · ${done} completed` : ''}
                    {dues.length === 1 && (
                      <>
                        {' '}
                        · Due <time dateTime={dues[0]}>{dues[0]}</time>
                      </>
                    )}
                    {dues.length > 1 && ` · Due dates vary (${dues[0]} to ${dues.at(-1)})`}
                  </p>
                  <small>
                    {names.slice(0, 6).join(', ')}
                    {names.length > 6 ? ` and ${names.length - 6} more` : ''}
                  </small>
                </div>
                <span className="tag">
                  {!group.pending.length
                    ? 'COMPLETED'
                    : dues[0] < today
                      ? 'OVERDUE'
                      : group.kind.toUpperCase()}
                </span>
                {editing !== group.key && removing !== group.key && (
                  <button
                    disabled={busy}
                    onClick={() => {
                      setEditing('');
                      setRemoving('');
                      setPicking(group.key);
                    }}
                    aria-label={`Edit students assigned ${group.title}`}
                  >
                    Edit students
                  </button>
                )}
                {picking === group.key && (
                  <AssignedStudentsModal
                    target={{
                      division,
                      eventId: group.eventId,
                      eventName: group.eventName,
                      kind: group.kind,
                      targetId: group.targetId,
                      title: group.title,
                      pending: group.pending.map((a) => a.studentId),
                      finished: group.members.filter((a) => a.completedAt).map((a) => a.studentId),
                      due:
                        dues[0] ??
                        group.members
                          .map((a) => a.due)
                          .sort()
                          .at(-1) ??
                        today,
                    }}
                    students={students}
                    teams={teams}
                    onClose={() => setPicking('')}
                    onSaved={async () => {
                      await onChanged();
                      setPicking('');
                    }}
                  />
                )}
                {group.pending.length > 0 && editing !== group.key && removing !== group.key && (
                  <>
                    <button
                      disabled={busy}
                      onClick={() => {
                        setRemoving('');
                        setEditing(group.key);
                      }}
                      aria-label={`Edit ${group.title} for all students`}
                    >
                      Edit for all
                    </button>
                    <button
                      disabled={busy}
                      onClick={() => {
                        setEditing('');
                        setRemoveError('');
                        setRemoving(group.key);
                      }}
                      aria-label={`Remove ${group.title} from all students`}
                    >
                      Remove for all
                    </button>
                  </>
                )}
                {removing === group.key && (
                  <div className="assignment-editor" role="group" aria-label="Confirm removal">
                    <p className="assignment-confirm">
                      Remove this from {group.pending.length}{' '}
                      {group.pending.length === 1 ? 'student' : 'students'} who{' '}
                      {group.pending.length === 1 ? 'hasn’t' : 'haven’t'} finished it? This can’t be
                      undone.
                      {done
                        ? ` The ${done} completed ${done === 1 ? 'copy stays' : 'copies stay'}.`
                        : ''}
                    </p>
                    <div className="assignment-editor-actions">
                      <button
                        className="button button-primary button-small"
                        disabled={busy}
                        onClick={() => removeAll(group.pending.map((a) => a.id))}
                      >
                        {busy
                          ? 'Removing…'
                          : `Remove from ${group.pending.length} ${group.pending.length === 1 ? 'student' : 'students'}`}
                      </button>
                      <button
                        className="button button-small button-glass"
                        disabled={busy}
                        onClick={() => setRemoving('')}
                      >
                        Cancel
                      </button>
                    </div>
                    {removeError && (
                      <p className="form-error" role="alert">
                        {removeError}
                      </p>
                    )}
                  </div>
                )}
                {editing === group.key && (
                  <AssignmentEditor
                    target={{
                      ids: group.pending.map((a) => a.id),
                      division,
                      eventId: group.eventId,
                      eventName: group.eventName,
                      due: dues[0] ?? today,
                      study: group.pending[0].study,
                      testId: group.pending[0].testId,
                    }}
                    onCancel={() => setEditing('')}
                    onSaved={async () => {
                      await onChanged();
                      setEditing('');
                    }}
                  />
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export function InstructorAssignments({
  students,
  assignments,
  onAssigned,
}: {
  students: Student[];
  assignments: Assignment[];
  onAssigned: () => Promise<void>;
}) {
  const { request, profile } = useAuth();
  // Open on the roster's division, like Teams and Ranked, until the instructor picks another.
  const [pickedDivision, setDivision] = useState<Division | null>(null);
  const division =
    pickedDivision ?? rosterDivision(students, profile?.schoolCommunityName ?? profile?.schoolName);
  const [view, setView] = useState<'assign' | 'assigned'>('assign');
  const [activeEvent, setActiveEvent] = useState<ScienceEvent | null>(null);
  const [work, setWork] = useState<Work | null>(null);
  const [tab, setTab] = useState<'Practice' | 'Lesson' | 'Presentation' | 'Lab'>('Practice');
  const [unitId, setUnitId] = useState('');
  const [teams, setTeams] = useState<TeamSheet[] | null>(null);
  const [error, setError] = useState('');
  const loadTeams = useCallback(async () => {
    setError('');
    try {
      setTeams(await request<TeamSheet[]>('/api/teams'));
    } catch (error) {
      setError(authMessage(error));
    }
  }, [request]);
  useEffect(() => {
    void loadTeams();
  }, [loadTeams, students]);
  function chooseDivision(next: Division) {
    setDivision(next);
    setActiveEvent(null);
    setWork(null);
    setUnitId('');
  }
  if (!students.length)
    return (
      <div className="empty-state">
        <Users size={32} />
        <h2>Your team starts here.</h2>
        <p>Share your school password. Students appear here after joining your school.</p>
      </div>
    );
  const pendingGroups = groupAssigned(assignments, division).filter(
    (group) => group.pending.length,
  ).length;
  const switcher = (
    <div className="archive-view-switch" role="group" aria-label="Assignments view">
      <button aria-pressed={view === 'assign'} onClick={() => setView('assign')}>
        Assign new work
      </button>
      <button aria-pressed={view === 'assigned'} onClick={() => setView('assigned')}>
        Already assigned{pendingGroups ? ` (${pendingGroups})` : ''}
      </button>
    </div>
  );
  if (view === 'assigned')
    return (
      <>
        {switcher}
        <AssignedWork
          assignments={assignments}
          division={division}
          onDivision={chooseDivision}
          onChanged={onAssigned}
          students={students}
          teams={teams}
        />
      </>
    );
  if (!activeEvent)
    return (
      <>
        {switcher}
        <InstructorEventCatalog
          division={division}
          onDivision={chooseDivision}
          onSelect={(event) => {
            setActiveEvent(event);
            setUnitId('');
            setTab('Practice');
          }}
        />
      </>
    );
  const course = lessonsForEvent(activeEvent.id, division);
  const units = course?.units.filter((unit) => !unitId || unit.id === unitId) ?? [];
  const labs = labsForEvent(division, activeEvent.id).map((lab) => ({
    kind: 'Lab' as const,
    id: lab.id,
    title: lab.title,
    meta: `${lab.minutes} minutes · ${lab.summary}`,
  }));
  const phet = labs.length ? phetActivities[activeEvent.id] : undefined;
  if (phet) labs.push({ kind: 'Lab', id: PHET_LAB, title: `PhET: ${phet.title}`, meta: phet.task });
  const choose = (item: Work) => (
    <button
      className="assign-pill"
      disabled={!teams || !!error}
      aria-label={`Assign ${item.title}`}
      onClick={() => setWork(item)}
    >
      Assign {item.kind.toLowerCase()}
    </button>
  );
  return (
    <>
      {switcher}
      <button className="back-link" onClick={() => setActiveEvent(null)}>
        <ChevronLeft size={16} /> All Division {division} events
      </button>
      <div className="dashboard-section-title">
        <h2>{activeEvent.name} assignments.</h2>
        <span className="tag">DIVISION {division}</span>
      </div>
      <p>
        Assign to everyone seated in this event across your community’s teams, or choose students
        and their event partners.
      </p>
      {error && (
        <div>
          <p role="alert">{error}</p>
          <button className="text-link" onClick={loadTeams}>
            Reload teams
          </button>
        </div>
      )}
      {!teams && !error && <p role="status">Loading teams…</p>}
      <div className="archive-view-switch" role="group" aria-label="Assignment content">
        {(['Practice', 'Lesson', 'Presentation', 'Lab'] as const).map((kind) => (
          <button key={kind} aria-pressed={tab === kind} onClick={() => setTab(kind)}>
            {kind === 'Practice'
              ? 'Practice tests'
              : kind === 'Lesson'
                ? 'Lessons by unit'
                : kind === 'Presentation'
                  ? 'Presentations'
                  : 'Lab simulations'}
          </button>
        ))}
      </div>
      {tab === 'Practice' && (
        <InstructorTestList
          key={`${division}/${activeEvent.id}`}
          division={division}
          event={activeEvent}
          disabled={!teams || !!error}
          onAssign={(test) => {
            if (teams && !error) setWork(practiceWork(test));
          }}
        />
      )}
      {tab === 'Lesson' &&
        (course ? (
          <section aria-label="Assignable lessons">
            <label className="division-control">
              Unit{' '}
              <select
                aria-label="Filter lessons by unit"
                value={unitId}
                onChange={(e) => setUnitId(e.target.value)}
              >
                <option value="">All units</option>
                {course.units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unitLabel(course, unit.id)}
                  </option>
                ))}
              </select>
            </label>
            {units.map((unit) => (
              <section key={unit.id} className="ranked-create">
                <div className="dashboard-section-title">
                  <h3>{unitLabel(course, unit.id)}</h3>
                  {choose({
                    kind: 'Unit',
                    id: unit.id,
                    title: unitLabel(course, unit.id) ?? unit.title,
                    meta: `${unit.lessonIds.length} lessons`,
                  })}
                </div>
                <p>{unit.description}</p>
                <ul className="practice-test-list instructor-test-list">
                  {unit.lessonIds.map((id) => {
                    const lesson = course.lessons.find((item) => item.id === id)!;
                    const item: Work = {
                      kind: 'Lesson',
                      id,
                      title: lessonLabel(course, id) ?? lesson.title,
                      meta: `${lesson.durationMin} minutes · ${lesson.practice.length} practice questions`,
                    };
                    return (
                      <li key={id}>
                        <div className="instructor-test-card">
                          <BookOpen size={22} />
                          <div className="instructor-test-body">
                            <h3>{item.title}</h3>
                            <p>{item.meta}</p>
                          </div>
                          {choose(item)}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </section>
        ) : (
          <div className="practice-empty">
            <BookOpen size={30} />
            <h3>No lessons for this event yet.</h3>
            <p>Units and lessons will appear here when available for Division {division}.</p>
          </div>
        ))}
      {tab === 'Presentation' &&
        (course && course.lessons.some((lesson) => deckFor(division, activeEvent.id, lesson.id)) ? (
          <section aria-label="Assignable presentations">
            <p>
              Each presentation teaches the same material as its lesson with slides and interactive
              activities. Students finish it by themselves or in a live session, and their activity
              score is recorded.
            </p>
            {course.units.map((unit) => {
              const decks = unit.lessonIds.flatMap((id) => {
                const deck = deckFor(division, activeEvent.id, id);
                return deck ? [{ id, deck }] : [];
              });
              if (!decks.length) return null;
              return (
                <section key={unit.id} className="ranked-create">
                  <h3>{unitLabel(course, unit.id)}</h3>
                  <ul className="practice-test-list instructor-test-list">
                    {decks.map(({ id, deck }) => {
                      const lesson = course.lessons.find((item) => item.id === id)!;
                      const activities = deck.slides.filter(isActivity).length;
                      const item: Work = {
                        kind: 'Presentation',
                        id,
                        title: lessonLabel(course, id) ?? lesson.title,
                        meta: `${deck.slides.length} slides · ${activities} activities`,
                      };
                      return (
                        <li key={id}>
                          <div className="instructor-test-card">
                            <Presentation size={22} />
                            <div className="instructor-test-body">
                              <h3>{item.title}</h3>
                              <p>{item.meta}</p>
                            </div>
                            {choose(item)}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </section>
        ) : (
          <div className="practice-empty">
            <Presentation size={30} />
            <h3>No presentations for this event yet.</h3>
            <p>Presentations will appear here as they are added for Division {division}.</p>
          </div>
        ))}
      {tab === 'Lab' &&
        (labs.length ? (
          <ul className="practice-test-list instructor-test-list">
            {labs.map((item) => (
              <li key={item.id}>
                <div className="instructor-test-card">
                  <FlaskConical size={22} />
                  <div className="instructor-test-body">
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                  </div>
                  {choose(item)}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="practice-empty">
            <FlaskConical size={30} />
            <h3>No lab simulations for this event yet.</h3>
            <p>Available simulations will appear here for Division {division}.</p>
          </div>
        ))}
      {work && teams && (
        <AssignEventModal
          key={`${work.kind}/${work.id}`}
          division={division}
          eventId={activeEvent.id}
          eventName={activeEvent.name}
          eyebrow={`${activeEvent.name.toUpperCase()} · DIVISION ${division} · ${work.kind.toUpperCase()}`}
          title={work.title}
          meta={work.meta}
          noun={
            work.kind === 'Unit'
              ? 'unit'
              : work.kind === 'Practice'
                ? 'test'
                : work.kind.toLowerCase()
          }
          footer={
            work.kind === 'Unit'
              ? 'Complete every lesson practice in this unit.'
              : work.kind === 'Lesson'
                ? 'Complete the lesson practice.'
                : work.kind === 'Presentation'
                  ? 'Finish the presentation by yourself or in a live session.'
                : work.kind === 'Lab'
                  ? 'Complete the simulation and mark it finished.'
                  : 'Submit this practice test to complete the assignment.'
          }
          already={
            new Set(
              assignments
                .filter(
                  (a) =>
                    a.division === division &&
                    a.eventId === activeEvent.id &&
                    (work.kind === 'Practice'
                      ? a.testId === work.id && !a.ranked && !a.completedAt
                      : a.study?.kind === work.kind && a.study.targetId === work.id),
                )
                .map((a) => a.studentId),
            )
          }
          students={students}
          teams={teams}
          onClose={() => setWork(null)}
          onAssign={async (body) => {
            const result = await request<AssignResult>('/api/assignments', {
              method: 'POST',
              body: JSON.stringify({
                action: 'assign',
                division,
                eventId: activeEvent.id,
                kind: work.kind,
                targetId: work.id,
                ...body,
              }),
            });
            await onAssigned();
            return result;
          }}
        />
      )}
    </>
  );
}
