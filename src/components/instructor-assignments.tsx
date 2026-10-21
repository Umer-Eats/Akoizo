'use client';
import { useCallback, useEffect, useState } from 'react';
import { BookOpen, ChevronLeft, FileText, FlaskConical, Search, Users } from 'lucide-react';
import { eventSlots, slotForEvent } from '@/lib/event-slots';
import { eventsForDivision, type Division, type ScienceEvent } from '@/lib/events';
import {
  competitionLevels,
  practiceDifficulties,
  practiceTitle,
  matchesPracticeFilters,
  type PracticeSummary,
} from '@/lib/practice-types';
import { PHET_LAB, type Assignment, type Student, type StudyKind } from '@/lib/domain';
import { lessonsForEvent } from '@/lib/lessons-registry';
import { labsForEvent, phetActivities } from '@/lib/division-c-labs';
import { rosterDivision, type TeamSheet } from '@/lib/teams';
import { AssignEventModal, type AssignResult } from './assign-event-modal';
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
  const [activeEvent, setActiveEvent] = useState<ScienceEvent | null>(null);
  const [work, setWork] = useState<Work | null>(null);
  const [tab, setTab] = useState<'Practice' | 'Lesson' | 'Lab'>('Practice');
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
  if (!activeEvent)
    return (
      <InstructorEventCatalog
        division={division}
        onDivision={chooseDivision}
        onSelect={(event) => {
          setActiveEvent(event);
          setUnitId('');
          setTab('Practice');
        }}
      />
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
        {(['Practice', 'Lesson', 'Lab'] as const).map((kind) => (
          <button key={kind} aria-pressed={tab === kind} onClick={() => setTab(kind)}>
            {kind === 'Practice'
              ? 'Practice tests'
              : kind === 'Lesson'
                ? 'Lessons by unit'
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
                    {unit.title}
                  </option>
                ))}
              </select>
            </label>
            {units.map((unit) => (
              <section key={unit.id} className="ranked-create">
                <div className="dashboard-section-title">
                  <h3>{unit.title}</h3>
                  {choose({
                    kind: 'Unit',
                    id: unit.id,
                    title: unit.title,
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
                      title: lesson.title,
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
