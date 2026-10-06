'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  FileText,
  Trophy,
  Layers,
  Zap,
  FolderOpen,
  Search,
  ChevronLeft,
  Clock3,
  Telescope,
} from 'lucide-react';
import { eventsForDivision, tools, type Division } from '@/lib/events';
import { members, validateAssignment, type Assignment } from '@/lib/demo';
import { RankingTable } from './rankings';
import { useSettings } from './providers';
import { Moth } from './art';
const icons = {
  book: BookOpen,
  file: FileText,
  trophy: Trophy,
  layers: Layers,
  bolt: Zap,
  folder: FolderOpen,
};
export function DemoNotice() {
  return (
    <div className="notice">
      <span>
        <strong>DESIGN PREVIEW</strong> Fictional students and scores. No real accounts or points.
      </span>
      <Link href="/">Back to home</Link>
    </div>
  );
}
export function ToolsGrid({ division, eventId }: { division: Division; eventId?: string }) {
  return (
    <div className="dashboard-tools">
      {tools.map((t) => {
        const Icon = icons[t.icon];
        return (
          <Link
            className="tool-card"
            href={`/preview/student/tools/${t.id}?division=${division}${eventId ? `&event=${eventId}` : ''}`}
            key={t.id}
          >
            <Icon strokeWidth={1.3} />
            <h3>{t.name}</h3>
            <p>{t.description}</p>
            <span className="tag">COMING SOON</span>
          </Link>
        );
      })}
    </div>
  );
}
function AssignmentList({
  studentId,
  editable = false,
}: {
  studentId?: string;
  editable?: boolean;
}) {
  const { assignments, setAssignments } = useSettings();
  const rows = assignments.filter((a) => !studentId || a.studentId === studentId);
  return rows.length ? (
    <div className="assignment-list">
      {rows.map((a) => (
        <article className="assignment-row" key={a.id}>
          <Clock3 size={20} />
          <div>
            <h3>{a.eventName}</h3>
            <p>
              {members.find((m) => m.id === a.studentId)?.name} · Division {a.division} · Complete
              any 1 {a.type.toLowerCase()} test · Due {a.due}
            </p>
          </div>
          <span className="tag">{a.type.toUpperCase()}</span>
          {editable && (
            <button
              aria-label={`Remove ${a.eventName} assignment`}
              onClick={() => setAssignments(assignments.filter((item) => item.id !== a.id))}
            >
              Remove
            </button>
          )}
        </article>
      ))}
    </div>
  ) : (
    <div className="empty-state">
      <Clock3 size={25} />
      <h3>A little space to get started.</h3>
      <p>No preview assignments yet. Try assigning one from the instructor preview.</p>
      <Link className="text-link" href="/preview/instructor">
        Explore instructor preview
      </Link>
    </div>
  );
}
export function StudentDashboard() {
  const [division, setDivision] = useState<Division>('C');
  const [tab, setTab] = useState('study');
  const [query, setQuery] = useState('');
  const events = eventsForDivision(division);
  const student = members.find((m) => m.school === 'Cedar Academy' && m.division === division)!;
  return (
    <main id="main" className="page-container">
      <DemoNotice />
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">CEDAR ACADEMY / YOUR STUDY SPACE</p>
          <h1>Stay curious, {student.name.split(' ')[0]}.</h1>
          <p>A little progress today. A brighter possibility tomorrow.</p>
        </div>
        <label className="division-select">
          Preview division
          <select
            aria-label="Preview division"
            value={division}
            onChange={(e) => {
              setDivision(e.target.value as Division);
              setQuery('');
            }}
          >
            <option value="A">Division A</option>
            <option value="B">Division B</option>
            <option value="C">Division C</option>
          </select>
        </label>
      </div>
      <div className="stat-grid">
        <div className="stat-card">
          <span>Lesson progress</span>
          <strong>{student.lessons}%</strong>
          <div className="progress-track">
            <span style={{ width: `${student.lessons}%` }} />
          </div>
        </div>
        <div className="stat-card">
          <span>Practice tests</span>
          <strong>{student.practice}</strong>
          <small>Sample completions</small>
        </div>
        <div className="stat-card">
          <span>Ranked tests</span>
          <strong>{student.ranked}</strong>
          <small>Sample completions</small>
        </div>
        <div className="stat-card">
          <span>Total points</span>
          <strong>{student.points.toLocaleString('en-US')}</strong>
          <small>Sample score</small>
        </div>
      </div>
      <div className="tabs dashboard-tabs" aria-label="Student dashboard view">
        {[
          ['study', 'Study space'],
          ['assignments', 'Assignments'],
          ['school', 'My school'],
          ['global', 'Global rankings'],
        ].map(([id, name]) => (
          <button aria-pressed={tab === id} key={id} onClick={() => setTab(id)}>
            {name}
          </button>
        ))}
      </div>
      {tab === 'study' && (
        <>
          <div className="dashboard-section-title">
            <h2>Find your event.</h2>
            <span className="tag">
              {division === 'A' ? 'LOCAL EVENT LIST' : `2027 SEASON · ${events.length} EVENTS`}
            </span>
          </div>
          {division === 'A' ? (
            <div className="empty-state">
              <Telescope />
              <h3>Small beginnings. Big discoveries.</h3>
              <p>
                Division A events vary by local program. Your instructor will add your school’s
                event list here.
              </p>
            </div>
          ) : (
            <>
              <label className="search-field" style={{ display: 'block', marginBottom: 22 }}>
                <span className="sr-only">Search events</span>
                <Search size={16} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find an event or subject"
                />
              </label>
              <div className="event-grid">
                {events
                  .filter((e) =>
                    `${e.name} ${e.category}`.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((e) => (
                    <Link
                      className="event-card"
                      href={`/preview/student/events/${e.id}?division=${division}`}
                      key={e.id}
                    >
                      <span className="eyebrow">{e.category.toUpperCase()}</span>
                      <h3>{e.name}</h3>
                      <span>
                        DIVISION {division} · {e.type.toUpperCase()}
                      </span>
                    </Link>
                  ))}
              </div>
              {!events.some((e) =>
                `${e.name} ${e.category}`.toLowerCase().includes(query.toLowerCase()),
              ) && (
                <div className="empty-state">
                  <h3>No events found.</h3>
                  <button className="text-link" onClick={() => setQuery('')}>
                    Clear search
                  </button>
                </div>
              )}
              <p className="source-note">
                Event names follow the{' '}
                <a
                  href={`https://www.soinc.org/events/2027-division-${division.toLowerCase()}-events`}
                  target="_blank"
                  rel="noreferrer"
                >
                  official 2027 Division {division} list
                </a>
                . Study content is in development.
              </p>
            </>
          )}
          <div className="dashboard-section-title">
            <h2>Your study toolkit.</h2>
          </div>
          <ToolsGrid division={division} />
        </>
      )}
      {tab === 'assignments' && (
        <>
          <div className="dashboard-section-title">
            <h2>Your next steps.</h2>
            <span className="tag">THIS TAB’S PREVIEW ONLY</span>
          </div>
          <AssignmentList studentId={student.id} />
        </>
      )}
      {(tab === 'school' || tab === 'global') && (
        <>
          <div className="dashboard-section-title">
            <h2>{tab === 'school' ? 'Your school, your team.' : 'Curious minds, everywhere.'}</h2>
          </div>
          {tab === 'school' && (
            <p className="source-note" style={{ margin: '0 0 25px' }}>
              Fictional Cedar Academy members. In the live site, this view will be restricted to
              authenticated members of your school.
            </p>
          )}
          <RankingTable
            key={`${tab}-${division}`}
            initialDivision={division}
            school={tab === 'school' ? 'Cedar Academy' : undefined}
          />
        </>
      )}
    </main>
  );
}
export function InstructorDashboard() {
  const students = members.filter((m) => m.school === 'Cedar Academy');
  const [studentId, setStudentId] = useState(students[0].id);
  const student = students.find((s) => s.id === studentId)!;
  const events = eventsForDivision(student.division);
  const [eventId, setEventId] = useState('');
  const [type, setType] = useState<'Practice' | 'Ranked'>('Practice');
  const [due, setDue] = useState('');
  const [feedback, setFeedback] = useState('');
  const { assignments, setAssignments } = useSettings();
  function assign(e: React.FormEvent) {
    e.preventDefault();
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const error = validateAssignment(
      student,
      events.map((e) => e.id),
      eventId,
      due,
      today,
    );
    if (error) {
      setFeedback(error);
      return;
    }
    const event = events.find((e) => e.id === eventId)!;
    if (
      assignments.some(
        (a) =>
          a.studentId === student.id && a.eventId === eventId && a.type === type && a.due === due,
      )
    ) {
      setFeedback('This preview assignment already exists.');
      return;
    }
    const a: Assignment = {
      id: crypto.randomUUID(),
      studentId,
      division: student.division,
      eventId,
      eventName: event.name,
      type,
      due,
    };
    setAssignments([...assignments, a]);
    setFeedback(
      `Added to ${student.name.split(' ')[0]}’s preview assignments. It stays in this browser tab only.`,
    );
  }
  return (
    <main id="main" className="page-container">
      <DemoNotice />
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">INSTRUCTOR / CEDAR ACADEMY</p>
          <h1>Help your team take flight.</h1>
          <p>A closer look at every student’s next step.</p>
        </div>
        <span className="tag">4 SAMPLE STUDENTS</span>
      </div>
      <div className="instructor-layout">
        <section>
          <div className="dashboard-section-title" style={{ marginTop: 0 }}>
            <h2>Your students.</h2>
          </div>
          <div className="student-list">
            {students.map((s) => (
              <button
                className="student-row"
                key={s.id}
                aria-pressed={s.id === studentId}
                onClick={() => {
                  setStudentId(s.id);
                  setEventId('');
                  setFeedback('');
                }}
              >
                <span className="student-avatar">
                  {s.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
                <span>
                  {s.name}
                  <small>@{s.handle}</small>
                </span>
                <span className="tag">DIV {s.division}</span>
              </button>
            ))}
          </div>
          <div className="dashboard-section-title">
            <h2>{student.name.split(' ')[0]}’s progress.</h2>
          </div>
          <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
            <div className="stat-card">
              <span>Lesson progress</span>
              <strong>{student.lessons}%</strong>
            </div>
            <div className="stat-card">
              <span>Total points</span>
              <strong>{student.points.toLocaleString('en-US')}</strong>
            </div>
            <div className="stat-card">
              <span>Practice tests</span>
              <strong>{student.practice}</strong>
            </div>
            <div className="stat-card">
              <span>Ranked tests</span>
              <strong>{student.ranked}</strong>
            </div>
          </div>
        </section>
        <section className="assignment-panel">
          <span className="tag" style={{ marginBottom: 18 }}>
            DIVISION {student.division} ONLY
          </span>
          <h3>A little direction goes a long way.</h3>
          <p>
            Assign one test for an event. Your student can complete any test of that type for the
            assigned event.
          </p>
          {student.division === 'A' ? (
            <div className="empty-state" style={{ marginTop: 25, padding: 25 }}>
              <p>
                Add your school’s Division A event list before assigning tests. School setup will
                arrive with live accounts.
              </p>
            </div>
          ) : (
            <form onSubmit={assign}>
              <label>
                Student
                <input value={student.name} readOnly />
              </label>
              <label>
                Event
                <select
                  aria-label="Event"
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                  required
                >
                  <option value="">Choose a Division {student.division} event</option>
                  {events.map((e) => (
                    <option value={e.id} key={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Test type
                <select
                  aria-label="Test type"
                  value={type}
                  onChange={(e) => setType(e.target.value as 'Practice' | 'Ranked')}
                >
                  <option>Practice</option>
                  <option>Ranked</option>
                </select>
              </label>
              <label>
                Due date
                <input type="date" value={due} required onChange={(e) => setDue(e.target.value)} />
              </label>
              <button className="button button-primary" type="submit">
                Add preview assignment
              </button>
              <p className="form-feedback" role="status">
                {feedback}
              </p>
            </form>
          )}
        </section>
      </div>
      <div className="dashboard-section-title">
        <h2>Assigned next steps.</h2>
        <span className="tag">SAVED IN THIS TAB ONLY</span>
      </div>
      <AssignmentList editable />
      <div className="private-callout" style={{ marginTop: 35 }}>
        <div>
          <h3>Your school’s own little universe.</h3>
          <p>
            Live instructor signup will generate your school name and student joining password.
            <br />
            School creation and secure invitations will be connected with authentication.
          </p>
        </div>
      </div>
    </main>
  );
}
export function EventView({ division, eventId }: { division: Division; eventId: string }) {
  const event = eventsForDivision(division).find((e) => e.id === eventId)!;
  return (
    <main id="main" className="page-container">
      <DemoNotice />
      <Link className="back-link" href="/preview/student">
        <ChevronLeft size={16} /> Your study space
      </Link>
      <div className="page-heading">
        <p className="eyebrow">
          DIVISION {division} / {event.category.toUpperCase()}
        </p>
        <h1>{event.name}</h1>
        <p>Your event. Your pace. Choose a tool to explore what’s coming.</p>
        <span className="tag">{event.type.toUpperCase()} EVENT · 2027 SEASON</span>
      </div>
      <ToolsGrid division={division} eventId={eventId} />
    </main>
  );
}
export function ToolPlaceholder({
  toolId,
  division,
  eventId,
}: {
  toolId: string;
  division: Division;
  eventId?: string;
}) {
  const tool = tools.find((t) => t.id === toolId)!;
  const event = eventId ? eventsForDivision(division).find((e) => e.id === eventId) : undefined;
  return (
    <main id="main" className="page-container">
      <DemoNotice />
      <Link
        className="back-link"
        href={
          event ? `/preview/student/events/${event.id}?division=${division}` : '/preview/student'
        }
      >
        <ChevronLeft size={16} />
        {event ? event.name : 'Your study space'}
      </Link>
      <section className="placeholder-stage">
        <Moth />
        <span className="tag">COMING SOON · DIVISION {division}</span>
        <h1>
          {tool.name}
          {event && (
            <>
              <br />
              <span className="muted">{event.name}</span>
            </>
          )}
        </h1>
        <p>
          {tool.description} This study tool is still being prepared. There are no tests, generated
          notes, or real points available yet.
        </p>
        <Link className="button button-glass" href="/preview/student">
          Back to your study space
        </Link>
      </section>
    </main>
  );
}
