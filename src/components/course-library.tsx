'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth, authMessage } from './auth-context';
import { eventsForDivision } from '@/lib/events';
import { eventToolIds } from '@/lib/event-rules';
import type { CourseLibrary, SavedCourse } from '@/lib/course-types';
import { CoursePreview } from './course-preview';
import { ReferenceLibraryTabs } from './reference-library-tabs';
import { saveFile } from '@/lib/document-export';
import { courseSvg } from '@/lib/build-events';
import './cheatsheets.css';

const events = (['B', 'C'] as const).flatMap((division) =>
  eventsForDivision(division)
    .filter((e) => eventToolIds(division, e).includes('course-generator'))
    .map((e) => ({ ...e, division, key: `${division}:${e.id}` })),
);
export function CourseLibraryPage() {
  const { loading, profile, sessionError } = useAuth();
  return (
    <main id="main" className="page-container">
      <section className="page-heading">
        <p className="eyebrow">AKOIZO / SHARED REFERENCES</p>
        <h1>The course library.</h1>
        <p>
          Find saved Division B and C practice setups. Open, export, or use a course in your event.
        </p>
      </section>
      <ReferenceLibraryTabs current="courses" />
      {loading ? (
        <p role="status">Loading your account…</p>
      ) : profile ? (
        <Courses key={profile.id} />
      ) : (
        <div className="empty-state">
          <p>{sessionError || 'Sign in with your school account to browse saved courses.'}</p>
          <Link href="/login/student" className="button button-primary">
            Student sign in
          </Link>{' '}
          <Link href="/login/instructor" className="button button-secondary">
            Instructor sign in
          </Link>
        </div>
      )}
    </main>
  );
}
function Courses() {
  const { request, profile } = useAuth();
  const [filter, setFilter] = useState(''),
    [library, setLibrary] = useState<CourseLibrary>({ courses: [], nextCursor: null });
  const [loading, setLoading] = useState(false),
    [error, setError] = useState(''),
    [opening, setOpening] = useState('');
  const [selected, setSelected] = useState<SavedCourse | null>(null);
  const sequence = useRef(0);
  const query = useCallback(
    (before?: string) => {
      const [division, eventId] = filter.split(':');
      return (
        '/api/courses?' +
        new URLSearchParams({
          ...(filter ? { division, eventId } : {}),
          ...(before ? { before } : {}),
        })
      );
    },
    [filter],
  );
  const refresh = useCallback(async () => {
    const version = ++sequence.current;
    setLoading(true);
    try {
      const result = await request<CourseLibrary>(query());
      if (version === sequence.current) {
        setLibrary(result);
        setError('');
      }
    } catch (e) {
      if (version === sequence.current) setError(authMessage(e));
    } finally {
      if (version === sequence.current) setLoading(false);
    }
  }, [query, request]);
  useEffect(() => {
    void refresh();
    return () => {
      ++sequence.current;
    };
  }, [refresh]);
  async function open(id: string) {
    setOpening(id);
    setError('');
    try {
      setSelected(await request<SavedCourse>(`/api/courses?id=${encodeURIComponent(id)}`));
    } catch (e) {
      setError(authMessage(e));
    } finally {
      setOpening('');
    }
  }
  return (
    <div className="cheatsheets">
      <section className="sheet-library">
        <div className="sheet-library-heading">
          <h2>Saved practice courses</h2>
          <button
            className="button button-secondary"
            disabled={loading}
            onClick={() => void refresh()}
          >
            Refresh
          </button>
        </div>
        <label className="sheet-filter">
          Show event
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All Division B and C events</option>
            {events.map((e) => (
              <option key={e.key} value={e.key}>
                {e.name} · Division {e.division}
              </option>
            ))}
          </select>
        </label>
        {error && (
          <p role="alert" className="sheet-error">
            {error}
          </p>
        )}
        {loading ? (
          <p role="status">Loading saved courses…</p>
        ) : library.courses.length ? (
          <div className="sheet-card-grid">
            {library.courses.map((c) => (
              <article className="sheet-card" key={c.id}>
                <p className="sheet-event-name">
                  {events.find((e) => e.id === c.eventId && e.division === c.division)?.name} ·
                  Division {c.division}
                </p>
                <h3>{c.title}</h3>
                <p className="sheet-card-meta">{c.level} · 2027 rules</p>
                <p className="sheet-school">{c.schoolName}</p>
                <p className="sheet-date">
                  Saved{' '}
                  <time dateTime={c.createdAt}>{new Date(c.createdAt).toLocaleDateString()}</time>
                </p>
                <button
                  className="button button-secondary"
                  disabled={!!opening}
                  onClick={() => void open(c.id)}
                >
                  {opening === c.id ? 'Opening…' : 'Open & export'}
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="sheet-empty">
            <h3>No saved courses yet.</h3>
            <p>Generate a course in one of your events to add it to the shared library.</p>
          </div>
        )}
        {library.nextCursor && (
          <button
            className="button button-secondary"
            disabled={loading}
            onClick={async () => {
              const version = ++sequence.current;
              setLoading(true);
              try {
                const next = await request<CourseLibrary>(query(library.nextCursor!));
                if (version === sequence.current)
                  setLibrary((prev) => ({
                    courses: [...prev.courses, ...next.courses],
                    nextCursor: next.nextCursor,
                  }));
              } catch (e) {
                if (version === sequence.current) setError(authMessage(e));
              } finally {
                if (version === sequence.current) setLoading(false);
              }
            }}
          >
            Load more courses
          </button>
        )}
      </section>
      {selected && (
        <section className="sheet-viewer" aria-label="Saved course">
          <div className="sheet-library-heading">
            <div>
              <h2>{selected.title}</h2>
              <p>
                Division {selected.division} · {selected.level} · {selected.schoolName}
              </p>
            </div>
            <button className="button button-secondary" onClick={() => setSelected(null)}>
              Close preview
            </button>
          </div>
          <div className="sheet-actions">
            <button
              className="button button-secondary"
              onClick={() =>
                saveFile(
                  new Blob([JSON.stringify(selected.course, null, 2)], {
                    type: 'application/json',
                  }),
                  `${selected.eventId}-course.json`,
                )
              }
            >
              Download JSON
            </button>
            <button
              className="button button-secondary"
              onClick={() =>
                saveFile(
                  new Blob([courseSvg(selected.course)], { type: 'image/svg+xml' }),
                  `${selected.eventId}-course.svg`,
                )
              }
            >
              Download SVG
            </button>
            {profile?.role === 'student' && profile.division === selected.division && (
              <Link
                className="button button-primary"
                href={`/dashboard/student/events/${selected.eventId}/course-generator?course=${selected.id}`}
              >
                Use this course
              </Link>
            )}
          </div>
          <CoursePreview key={selected.id} course={selected.course} />
        </section>
      )}
    </div>
  );
}
