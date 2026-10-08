'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { eventSlots, slotForEvent } from '@/lib/event-slots';
import {
  BookOpen,
  FileText,
  Trophy,
  Layers,
  Zap,
  FolderOpen,
  Video,
  GraduationCap,
  FlaskConical,
  FileCheck2,
  ScrollText,
  Search,
  ChevronLeft,
  Clock3,
  Users,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react';
import {
  elementaryManualUrl,
  eventsForDivision,
  eventFocus,
  toolCatalog,
  type Division,
  type ScienceEvent,
} from '@/lib/events';
import { eventToolIds, rulesForEvent } from '@/lib/event-rules';
import {
  dateInZone,
  type Assignment,
  type DashboardData,
  type EventProgress,
  type Profile,
  type SchoolCredentials,
  type Stats,
  type Student,
} from '@/lib/domain';
import { useAuth, authMessage } from './auth-context';
import { PracticeLibrary } from './practice';
import { PracticeReviews } from './practice-reviews';
import { InstructorAssignments } from './instructor-assignments';
const icons = {
  book: BookOpen,
  file: FileText,
  trophy: Trophy,
  layers: Layers,
  bolt: Zap,
  folder: FolderOpen,
  video: Video,
  'graduation-cap': GraduationCap,
  flask: FlaskConical,
  'file-check': FileCheck2,
  scroll: ScrollText,
};

function useDashboard() {
  const { request, profile } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const version = useRef(0);
  const refresh = useCallback(async () => {
    const revision = ++version.current;
    setLoading(true);
    setError('');
    try {
      const next = await request<DashboardData>('/api/dashboard');
      if (version.current === revision) setData(next);
    } catch (error) {
      if (version.current === revision) setError(authMessage(error));
    } finally {
      if (version.current === revision) setLoading(false);
    }
  }, [request]);
  useEffect(() => {
    void refresh();
    return () => {
      version.current++;
    };
  }, [refresh, profile?.id, profile?.division]);
  useEffect(() => {
    const focus = () => {
      void refresh();
    };
    window.addEventListener('focus', focus);
    return () => window.removeEventListener('focus', focus);
  }, [refresh]);
  return {
    data:
      data?.profile.id === profile?.id && data?.profile.division === profile?.division
        ? data
        : null,
    error,
    loading,
    refresh,
  };
}
function LoadState({ error, retry }: { error: string; retry: () => void }) {
  return (
    <main id="main" className="page-container">
      <div className="empty-state">
        {error ? (
          <>
            <h1>Couldn’t load your dashboard.</h1>
            <p role="alert">{error}</p>
            <button className="button button-primary" onClick={retry}>
              Try again
            </button>
          </>
        ) : (
          <p role="status">Loading your school…</p>
        )}
      </div>
    </main>
  );
}
function StatsGrid({ stats }: { stats: Stats }) {
  return (
    <div className="stat-grid">
      {(
        [
          ['lessons', 'Lessons completed', 'Your learning progress'],
          ['practice', 'Practice tests', 'Completed tests'],
          ['ranked', 'Ranked tests', 'Completed tests'],
          ['points', 'Total points', 'Earned through ranked tests'],
        ] as const
      ).map(([key, name, hint]) => (
        <div className="stat-card" key={key}>
          <span>{name}</span>
          <strong>{stats[key].toLocaleString('en-US')}</strong>
          <small>{hint}</small>
        </div>
      ))}
    </div>
  );
}
function RefreshButton({ loading, refresh }: { loading: boolean; refresh: () => void }) {
  return (
    <button className="button button-small button-glass" onClick={refresh} disabled={loading}>
      <RefreshCw size={15} />
      {loading ? 'Refreshing…' : 'Refresh'}
    </button>
  );
}
function FeatureNavigation({
  division,
  event,
  activeTool,
}: {
  division: Division;
  event: ScienceEvent;
  activeTool?: string;
}) {
  const available = new Set(eventToolIds(division, event));
  return (
    <nav className="event-feature-nav" aria-label="Event features">
      {toolCatalog
        .filter((tool) => available.has(tool.id))
        .map((tool) => {
          const Icon = icons[tool.icon];
          return (
            <Link
              className="event-feature-link"
              aria-current={activeTool === tool.id ? 'page' : undefined}
              href={`/dashboard/student/events/${event.id}/${tool.id}`}
              key={tool.id}
            >
              <Icon strokeWidth={1.3} />
              <span>{tool.name}</span>
              <span className="feature-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          );
        })}
    </nav>
  );
}
function RulesPanel({ division, event }: { division: Division; event: ScienceEvent }) {
  const rules = rulesForEvent(division, event);
  return (
    <div className="rules-panel-content">
      <iframe
        className="rules-embed"
        src={`${rules.sectionUrl}#view=FitH`}
        title={`Division ${division} rules for ${event.name}`}
      />
      <div className="rules-links">
        <a className="text-link" href={rules.sectionUrl} target="_blank" rel="noreferrer">
          Open Event PDF
        </a>
        <a className="text-link" href={rules.sourceUrl} target="_blank" rel="noreferrer">
          Complete Division {division} Rulebook
        </a>
      </div>
    </div>
  );
}
function EventCatalog({ division }: { division: Division }) {
  const { request } = useAuth();
  const [selected, setSelected] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    setReady(false);
    request<string[]>(`/api/event-selections?division=${division}`)
      .then((ids) => {
        if (active) {
          setSelected(ids);
          setReady(true);
          setError('');
        }
      })
      .catch((error) => {
        if (active) setError(authMessage(error));
      });
    return () => {
      active = false;
    };
  }, [request, division, retry]);
  async function toggle(id: string, checked: boolean) {
    if (pending || !ready) return;
    setPending(true);
    setError('');
    try {
      setSelected(
        await request<string[]>('/api/event-selections', {
          method: 'PATCH',
          body: JSON.stringify({ division, eventId: id, selected: checked }),
        }),
      );
    } catch (error) {
      setError(authMessage(error));
    } finally {
      setPending(false);
    }
  }
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const [slotFilter, setSlotFilter] = useState('All');
  const events = eventsForDivision(division);
  const matches = events
    .filter(
      (event) =>
        `${event.name} ${event.category}`.toLowerCase().includes(query.toLowerCase()) &&
        (type === 'All' || event.type === type) &&
        (slotFilter === 'All' || slotForEvent(event.id)?.color === slotFilter),
    )
    .sort((a, b) => Number(selected.includes(b.id)) - Number(selected.includes(a.id)));
  return (
    <>
      <div className="dashboard-section-title">
        <h2>Find your event.</h2>
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
      <p className="selection-summary" role="status">
        {pending
          ? 'Saving your events…'
          : !ready
            ? 'Selections unavailable until loaded.'
            : `${selected.length} competition events selected · Your events appear first.`}
      </p>
      {error && (
        <p className="form-error" role="alert">
          {error}{' '}
          {!ready && (
            <button className="text-link" onClick={() => setRetry((value) => value + 1)}>
              Retry selections
            </button>
          )}
        </p>
      )}
      <div className="event-grid">
        {matches.map((event) => {
          const slot = slotForEvent(event.id);
          const checked = selected.includes(event.id);
          return (
            <article
              className="event-card selectable-event"
              data-slot={slot?.color ?? 'unassigned'}
              data-selected={checked}
              key={event.id}
            >
              <Link
                className="event-card-link"
                href={`/dashboard/student/events/${event.id}/lessons`}
              >
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
              </Link>
              <label className="event-selection">
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={!ready || pending}
                  onChange={(e) => void toggle(event.id, e.target.checked)}
                  aria-label={`Compete in ${event.name}`}
                />
              </label>
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
      <p className="source-note">
        {division === 'A' ? (
          <>
            Events follow your{' '}
            <a href={elementaryManualUrl} target="_blank" rel="noreferrer">
              2027 Florida Elementary manual
            </a>
            . Special event availability depends on your tournament.
          </>
        ) : (
          <>
            Events follow the{' '}
            <a
              href={`https://www.soinc.org/events/2027-division-${division.toLowerCase()}-events`}
              target="_blank"
              rel="noreferrer"
            >
              official 2027 Division {division} slate
            </a>
            .
          </>
        )}{' '}
        Every event has its own rules-aware tools; content is coming next.
      </p>
    </>
  );
}
function AssignmentList({
  assignments,
  division,
  remove,
  pending,
}: {
  assignments: Assignment[];
  division?: Division;
  remove?: (id: string) => void;
  pending?: string;
}) {
  const today = dateInZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  if (!assignments.length)
    return (
      <div className="empty-state">
        <Clock3 size={26} />
        <h3>No assignments yet.</h3>
        <p>
          {remove
            ? 'Open the Assignments tab, choose an event, then assign a converted test.'
            : 'Assignments from your instructor will appear here.'}
        </p>
      </div>
    );
  return (
    <div className="assignment-list">
      {assignments.map((assignment) => (
        <article className="assignment-row" key={assignment.id}>
          <Clock3 size={20} />
          <div>
            <h3>{assignment.eventName}</h3>
            <p>
              {remove ? `${assignment.studentName} · ` : ''}Division {assignment.division} ·
              {assignment.testId
                ? ' Assigned converted test · '
                : ` Complete any 1 ${assignment.type.toLowerCase()} test · `}
              Due <time dateTime={assignment.due}>{assignment.due}</time>
            </p>
            {assignment.testId && <small>Specific test ID: {assignment.testId}</small>}
            {division && division !== assignment.division && (
              <small>
                Assigned in Division {assignment.division}. Switch to that division to open this
                event.
              </small>
            )}
          </div>
          <span className="tag">
            {assignment.completedAt
              ? 'COMPLETED'
              : assignment.due < today
                ? 'OVERDUE'
                : assignment.type.toUpperCase()}
          </span>
          {remove && !assignment.completedAt ? (
            <button
              disabled={!!pending}
              onClick={() => remove(assignment.id)}
              aria-label={`Remove ${assignment.eventName} ${assignment.type.toLowerCase()} assignment`}
            >
              {pending === assignment.id ? 'Removing…' : 'Remove'}
            </button>
          ) : division === assignment.division && !assignment.completedAt ? (
            <Link
              className="text-link"
              href={`/dashboard/student/events/${assignment.eventId}/${assignment.type === 'Practice' ? 'practice-tests' : 'ranked-tests'}`}
            >
              Open event
            </Link>
          ) : null}
        </article>
      ))}
    </div>
  );
}
function ProgressTable({ progress }: { progress: EventProgress[] }) {
  return (
    <div className="table-wrap" role="region" aria-label="Event progress" tabIndex={0}>
      <table>
        <thead>
          <tr>
            <th scope="col">EVENT</th>
            <th scope="col">LESSONS COMPLETED</th>
            <th scope="col">PRACTICE TESTS</th>
            <th scope="col">RANKED TESTS</th>
            <th scope="col">POINTS</th>
          </tr>
        </thead>
        <tbody>
          {progress.map((event) => (
            <tr key={event.eventId}>
              <th scope="row">{event.eventName}</th>
              <td>{event.lessons}</td>
              <td>{event.practice}</td>
              <td>{event.ranked}</td>
              <td>{event.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function StudentDashboard() {
  const { profile, request, refreshProfile } = useAuth();
  const { data, error, loading, refresh } = useDashboard();
  const [tab, setTab] = useState('study');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  async function changeDivision(division: string) {
    setSaving(true);
    setSaveError('');
    try {
      await request<Profile>('/api/auth/profile', {
        method: 'PATCH',
        body: JSON.stringify({ division }),
      });
      await refreshProfile();
    } catch (error) {
      setSaveError(authMessage(error));
    } finally {
      setSaving(false);
    }
  }
  if (!data) return <LoadState error={error} retry={refresh} />;
  const division = profile!.division!;
  return (
    <main id="main" className="page-container live-dashboard">
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">STUDENT / {profile!.schoolCommunityName || profile!.schoolName}</p>
          <h1>Your space to grow, {profile!.displayName}.</h1>
          <p>A new question. A little practice. One step further.</p>
        </div>
        <div className="dashboard-actions">
          <label className="division-control">
            Your division
            <select
              aria-label="Your division"
              value={division}
              disabled={saving}
              onChange={(e) => changeDivision(e.target.value)}
            >
              {(['A', 'B', 'C'] as const).map((value) => (
                <option key={value} value={value}>
                  Division {value}
                </option>
              ))}
            </select>
          </label>
          <RefreshButton loading={loading} refresh={refresh} />
        </div>
      </div>
      {(error || saveError) && (
        <p className="form-error" role="alert">
          {error || saveError}
        </p>
      )}
      <StatsGrid stats={data.stats} />
      <div className="tabs dashboard-tabs" aria-label="Student dashboard view">
        {[
          ['study', 'Study space'],
          ['assignments', `Assignments (${data.assignments.filter((a) => !a.completedAt).length})`],
          ['progress', 'My progress'],
        ].map(([id, name]) => (
          <button key={id} aria-pressed={tab === id} onClick={() => setTab(id)}>
            {name}
          </button>
        ))}
      </div>
      {tab === 'study' && <EventCatalog key={`${profile!.id}:${division}`} division={division} />}
      {tab === 'assignments' && (
        <>
          <div className="dashboard-section-title">
            <h2>Your next steps.</h2>
            <span className="tag">FROM YOUR INSTRUCTOR</span>
          </div>
          <AssignmentList assignments={data.assignments} division={division} />
          <p className="source-note">
            Test pages are ready for future content. Assignment completion will be recorded when the
            test tools launch.
          </p>
        </>
      )}
      {tab === 'progress' && (
        <>
          <div className="dashboard-section-title">
            <h2>Every step counts.</h2>
            <span className="tag">DIVISION {division}</span>
          </div>
          <ProgressTable progress={data.progress[profile!.id] || []} />
          <p className="source-note">
            Completed lessons, tests, and points will appear here when the study tools launch.
          </p>
        </>
      )}
    </main>
  );
}
export function SchoolPanel() {
  const { profile, credentials: initial, clearCredentials, request } = useAuth();
  const [credentials, setCredentials] = useState<SchoolCredentials | null>(initial);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  async function rotate() {
    setBusy(true);
    setError('');
    setCopied(false);
    try {
      setCredentials(await request<SchoolCredentials>('/api/school/password', { method: 'POST' }));
      clearCredentials();
    } catch (error) {
      setError(authMessage(error));
    } finally {
      setBusy(false);
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(credentials!.joiningPassword);
      setCopied(true);
    } catch {
      setError('Select and copy the password from the field below.');
    }
  }
  return (
    <section className="school-panel">
      <div>
        <span className="eyebrow">YOUR SCHOOL</span>
        <h2>{profile!.schoolCommunityName || profile!.schoolName}</h2>
        {profile!.schoolCommunityName && (
          <p className="source-note">Study group: {profile!.schoolName}</p>
        )}
        <p>Share your school password with students so they can join your roster.</p>
      </div>
      <div className="school-invite">
        {credentials ? (
          <>
            <label>
              Student joining password
              <textarea readOnly value={credentials.joiningPassword} rows={2} />
            </label>
            <p className="source-note">Save this password now. It is only shown in this session.</p>
            <div className="account-actions">
              <button className="button button-small button-primary" onClick={copy}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Copied' : 'Copy password'}
              </button>
              <button
                className="text-link"
                onClick={() => {
                  setCredentials(null);
                  clearCredentials();
                }}
              >
                I’ve saved it
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="button button-glass" disabled={busy} onClick={rotate}>
              {busy ? 'Creating…' : 'Create new joining password'}
            </button>
            <p className="source-note">
              Replaces the previous joining password. Existing students stay enrolled.
            </p>
          </>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
export function InstructorDashboard() {
  const { profile, request } = useAuth();
  const { data, error, loading, refresh } = useDashboard();
  const [tab, setTab] = useState<'school' | 'assignments' | 'progress'>('assignments');
  const [studentId, setStudentId] = useState('');
  const [pending, setPending] = useState('');
  const [removeError, setRemoveError] = useState('');
  async function remove(id: string) {
    setPending(id);
    setRemoveError('');
    try {
      await request(`/api/assignments?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      await refresh();
    } catch (error) {
      setRemoveError(authMessage(error));
    } finally {
      setPending('');
    }
  }
  if (!data) return <LoadState error={error} retry={refresh} />;
  const student = data.students.find((s) => s.id === studentId) || data.students[0];
  const selections = data.selections ?? {};
  return (
    <main id="main" className="page-container live-dashboard instructor-dashboard">
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">
            INSTRUCTOR / {profile!.schoolCommunityName || profile!.schoolName}
          </p>
          <h1>Help your team take flight.</h1>
          <p>Welcome, {profile!.displayName}. A closer look at every student’s next step.</p>
        </div>
        <div className="dashboard-actions">
          <span className="tag">{data.students.length} STUDENTS</span>
          <RefreshButton loading={loading} refresh={refresh} />
        </div>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <div className="event-workspace-grid instructor-workspace">
        <aside className="event-sidebar" aria-labelledby="instructor-toolkit-title">
          <h2 id="instructor-toolkit-title">Instructor toolkit</h2>
          <nav className="event-feature-nav" aria-label="Instructor sections">
            {(
              [
                ['school', 'School Code', Copy],
                ['assignments', 'Assignments', FileText],
                ['progress', 'Student Progress', Users],
              ] as const
            ).map(([id, label, Icon]) => (
              <button
                key={id}
                className="event-feature-link"
                aria-current={tab === id ? 'page' : undefined}
                onClick={() => setTab(id)}
              >
                <Icon strokeWidth={1.6} />
                <span>{label}</span>
                <span className="feature-arrow" aria-hidden="true">
                  ↗
                </span>
              </button>
            ))}
          </nav>
          <p className="event-sidebar-note">
            {tab === 'school' && 'Share this password so students join your roster.'}
            {tab === 'assignments' &&
              'Pick an event, open a converted test, and assign it to students.'}
            {tab === 'progress' && 'Review each student’s next steps and event progress.'}
          </p>
        </aside>
        <div className="event-content instructor-content">
          {tab === 'school' && <SchoolPanel />}
          {tab === 'assignments' && (
            <InstructorAssignments
              students={data.students}
              selections={selections}
              assignments={data.assignments}
              onAssigned={refresh}
            />
          )}
          {tab === 'progress' && (
            <>
              <PracticeReviews />
              {!student ? (
                <div className="empty-state">
                  <Users size={32} />
                  <h2>Your team starts here.</h2>
                  <p>
                    Share your school password. Students will appear here after they create an
                    account and join your school.
                  </p>
                </div>
              ) : (
                <>
                  <div className="dashboard-section-title">
                    <h2>Your students.</h2>
                    <span className="tag">{data.students.length} ON ROSTER</span>
                  </div>
                  <div className="student-list">
                    {data.students.map((s) => (
                      <button
                        className="student-row"
                        key={s.id}
                        aria-pressed={s.id === student.id}
                        onClick={() => setStudentId(s.id)}
                      >
                        <span className="student-avatar">
                          {s.displayName.slice(0, 2).toUpperCase()}
                        </span>
                        <span>
                          {s.displayName}
                          <small>{s.points.toLocaleString('en-US')} points</small>
                        </span>
                        <span className="tag">DIV {s.division}</span>
                      </button>
                    ))}
                  </div>
                  <div className="dashboard-section-title">
                    <h2>{student.displayName}’s progress.</h2>
                  </div>
                  <StatsGrid stats={student} />
                  <div className="dashboard-section-title">
                    <h2>Assigned next steps.</h2>
                    <span className="tag">{student.displayName.toUpperCase()}</span>
                  </div>
                  {removeError && (
                    <p className="form-error" role="alert">
                      {removeError}
                    </p>
                  )}
                  <AssignmentList
                    assignments={data.assignments.filter((a) => a.studentId === student.id)}
                    remove={remove}
                    pending={pending}
                  />
                  <div className="dashboard-section-title">
                    <h2>Progress by event.</h2>
                    <span className="tag">DIVISION {student.division} ONLY</span>
                  </div>
                  <ProgressTable progress={data.progress[student.id] || []} />
                  <p className="source-note">
                    Activity starts at zero. Lessons and test completion will be recorded when
                    those tools launch.
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
export function EventView({ eventId, toolId }: { eventId: string; toolId?: string }) {
  const { profile } = useAuth();
  const division = profile!.division!;
  const event = eventsForDivision(division).find((event) => event.id === eventId);
  const availableToolIds = event ? eventToolIds(division, event) : [];
  const tool = toolCatalog.find((candidate) => candidate.id === toolId);
  const isAvailable =
    !toolId || availableToolIds.includes(toolId as (typeof availableToolIds)[number]);
  if (!event || (toolId && (!tool || !isAvailable))) {
    return (
      <main id="main" className="page-container">
        <div className="empty-state">
          <h1>That page isn’t in your division.</h1>
          <p>Choose an event from your Division {division} study space.</p>
          <Link className="button button-primary" href="/dashboard/student">
            Back to my events
          </Link>
        </div>
      </main>
    );
  }
  const rulePages = toolId === 'rules' ? rulesForEvent(division, event).pageRange : undefined;
  return (
    <main id="main" className="page-container event-workspace">
      <div className="event-workspace-grid">
        <aside className="event-sidebar" aria-labelledby="event-toolkit-title">
          <Link className="back-link" href="/dashboard/student">
            <ChevronLeft size={16} /> My events
          </Link>
          <h2 id="event-toolkit-title">Your toolkit</h2>
          <FeatureNavigation division={division} event={event} activeTool={toolId} />
          <p className="event-sidebar-note">More study content coming soon.</p>
        </aside>
        <div className="event-content" key={`${event.id}/${toolId ?? 'overview'}`}>
          <div className="event-feature-heading">
            <div className="event-feature-title">
              <h1>{tool ? tool.name : 'Your study space.'}</h1>
              {rulePages && (
                <span className="rules-page-range">
                  {rulePages[0] === rulePages[1]
                    ? `PDF Page ${rulePages[0]}`
                    : `PDF Pages ${rulePages[0]}–${rulePages[1]}`}
                </span>
              )}
            </div>
            <p>{tool ? tool.description : eventFocus[event.type].description}</p>
            <p className="event-feature-meta">
              DIVISION {division} / {event.category.toUpperCase()} / {event.type.toUpperCase()}
              {event.special ? ' / SPECIAL EVENT' : ''}
              {slotForEvent(event.id)
                ? ` / ${slotForEvent(event.id)!.label.toUpperCase()} TIMESLOT`
                : ''}
            </p>
          </div>
          {toolId === 'practice-tests' ? (
            <PracticeLibrary eventId={event.id} />
          ) : (
            <section
              className={`empty-state tool-placeholder${toolId === 'rules' ? ' rules-panel' : ''}`}
            >
              {tool ? (
                <>
                  {toolId === 'rules' ? (
                    <RulesPanel division={division} event={event} />
                  ) : (
                    <>
                      <span className="tag">COMING SOON</span>
                      <h2>A little room for what’s next.</h2>
                      <p>
                        This {tool.name.toLowerCase()} page is ready. Study content hasn’t been
                        added yet.
                      </p>
                      {toolId !== 'lessons' && (
                        <Link
                          className="text-link"
                          href={`/dashboard/student/events/${event.id}/lessons`}
                        >
                          Back to Lessons
                        </Link>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <BookOpen size={32} aria-hidden="true" />
                  <span className="tag">{eventFocus[event.type].title.toUpperCase()}</span>
                  <h2>Make room for your next discovery.</h2>
                  <p>
                    Choose a feature from your toolkit to explore your study space. Lessons,
                    practice, and more are coming soon.
                  </p>
                </>
              )}
            </section>
          )}
          <p className="source-note">
            These tools support your preparation. Follow your tournament’s rules for permitted notes
            and materials.
          </p>
        </div>
      </div>
    </main>
  );
}
