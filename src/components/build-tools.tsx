'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Download, LoaderCircle, Shuffle, Upload, Video } from 'lucide-react';
import { useAuth } from './auth-context';
import {
  blankCourse,
  buildFields,
  courseSvg,
  MAX_VIDEO_BYTES,
  VIDEO_MIMES,
  parseCourse,
  type BuildCourse,
  type BuildDivision,
  type BuildGrade,
} from '@/lib/build-events';
import './build-tools.css';
import Link from 'next/link';
import { CoursePreview } from './course-preview';
import type { SavedCourse } from '@/lib/course-types';

type CourseMap = { name: string; mime: string; data: string };
function saveFile(name: string, data: string, type: string) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function readMap(file: File): Promise<CourseMap> {
  if (
    !['image/png', 'image/jpeg', 'image/webp', 'application/pdf'].includes(file.type) ||
    file.size > 1_000_000 ||
    !file.size
  )
    throw new Error('Choose a PNG, JPEG, WebP or PDF course map up to 1 MB.');
  const data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(new Error('The map could not be read.'));
    reader.readAsDataURL(file);
  });
  return { name: file.name, mime: file.type, data };
}
export function BuildTools({
  eventId,
  division,
  mode,
}: {
  eventId: string;
  division: BuildDivision;
  mode: 'course' | 'grade';
}) {
  const { request, profile } = useAuth();
  const router = useRouter();
  const [course, setCourse] = useState<BuildCourse>(() => blankCourse(division, eventId));
  const [map, setMap] = useState<CourseMap | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [grade, setGrade] = useState<{ result: BuildGrade; course: BuildCourse } | null>(null);
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedContent, setSavedContent] = useState('');
  const controller = useRef<AbortController | null>(null);
  const key = `akoizo:build:2027:${profile?.id}:${division}:${eventId}`;
  const svg = course.diagram.nodes.length ? courseSvg(course) : '';
  useEffect(() => {
    setGrade(null);
  }, [course, map, video]);
  useEffect(() => {
    let cancelled = false;
    const id = new URLSearchParams(window.location.search).get('course');
    if (id) {
      void request<SavedCourse>(`/api/courses?id=${encodeURIComponent(id)}`)
        .then((saved) => {
          if (cancelled) return;
          const next = parseCourse(saved.course, division, eventId);
          setCourse(next);
          setSavedContent(JSON.stringify(next));
          setLoaded(true);
        })
        .catch((e) => {
          if (!cancelled) {
            setError(e instanceof Error ? e.message : 'Could not open this saved course.');
            setLoaded(true);
          }
        });
      return () => {
        cancelled = true;
      };
    }
    try {
      const saved = localStorage.getItem(key);
      if (saved) setCourse(parseCourse(JSON.parse(saved), division, eventId));
    } catch {
      setNotice('Your saved setup could not be opened. You can start a new one.');
    }
    setLoaded(true);
  }, [key, division, eventId, request]);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(key, JSON.stringify(course));
    } catch {
      setNotice('This browser could not save the draft. Export the course to keep it.');
    }
  }, [course, key, loaded]);
  useEffect(() => {
    if (!video) {
      setPreview('');
      return;
    }
    const url = URL.createObjectURL(video);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [video]);
  useEffect(() => () => controller.current?.abort(), []);
  function editParameter(label: string, value: string) {
    setCourse((c) => ({
      ...c,
      parameters: { ...c.parameters, [label]: value },
      diagram: { view: 'Setup schematic — not to scale', nodes: [], edges: [] },
      setup: [],
      ruleReferences: [],
    }));
    setNotice(
      'Setup changed. Generate a diagram for these parameters, or attach your own course map in Video Grader.',
    );
  }
  async function importCourse(file: File) {
    setError('');
    setNotice('');
    try {
      if (file.size > 200_000) throw new Error('Choose an Akoizo course JSON file up to 200 KB.');
      const next = parseCourse(JSON.parse(await file.text()), division, eventId);
      setCourse(next);
      setMap(null);
      setNotice('Course imported with its parameters and diagram.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'This course could not be imported.');
    }
  }
  async function persist(next: BuildCourse) {
    setSaving(true);
    setError('');
    try {
      await request<SavedCourse>('/api/courses', {
        method: 'POST',
        body: JSON.stringify({ course: next }),
      });
      setSavedContent(JSON.stringify(next));
      setNotice('Course saved to the shared library. You can reopen it from any device.');
    } catch (e) {
      setError(
        `Your course is ready, but saving failed. Use Save & share to retry. ${e instanceof Error ? e.message : ''}`,
      );
    } finally {
      setSaving(false);
    }
  }
  async function generate() {
    setBusy(true);
    setError('');
    setNotice('');
    setStage('Reading event rules and generating your setup…');
    const abort = new AbortController();
    controller.current = abort;
    try {
      const result = await request<{ course: BuildCourse; savedCourseId?: string }>(
        '/api/build-tools',
        {
          method: 'POST',
          signal: abort.signal,
          body: JSON.stringify({ action: 'course', eventId, course }),
        },
      );
      const next = parseCourse(result.course, division, eventId);
      setCourse(next);
      setMap(null);
      setNotice(
        'Your course is ready. Review the dimensions and setup instructions before building.',
      );
      if (result.savedCourseId) {
        setSavedContent(JSON.stringify(next));
        setNotice('Course saved to the shared library. You can reopen it from any device.');
      } else await persist(next);
    } catch (e) {
      if (!abort.signal.aborted)
        setError(e instanceof Error ? e.message : 'Could not generate your course.');
    } finally {
      setBusy(false);
      setStage('');
      controller.current = null;
    }
  }
  async function gradeVideo(e: FormEvent) {
    e.preventDefault();
    if (!video) return;
    setError('');
    setNotice('');
    setBusy(true);
    setGrade(null);
    const abort = new AbortController();
    controller.current = abort;
    const post = <T,>(body: unknown) =>
      request<T>('/api/build-tools', {
        method: 'POST',
        signal: abort.signal,
        body: JSON.stringify(body),
      });
    let fileTicket = '';
    try {
      if (Object.values(course.parameters).some((v) => !v.trim()))
        throw new Error('Complete every setup field. Use “not applicable” where needed.');
      if (!course.diagram.nodes.length && !map && !course.notes.trim())
        throw new Error(
          'Attach a course map, describe the layout in setup notes, or generate a course first.',
        );
      setStage('Starting video upload…');
      const upload = await post<{ ticket: string }>({
        action: 'upload',
        eventId,
        size: video.size,
        mime: video.type,
      });
      const chunk = 2 * 1024 * 1024;
      for (let offset = 0; offset < video.size; offset += chunk) {
        setStage(`Uploading video · ${Math.round((offset / video.size) * 100)}%`);
        const result = await request<{ ticket?: string }>('/api/build-tools', {
          method: 'POST',
          signal: abort.signal,
          headers: { 'x-build-upload': upload.ticket, 'x-build-offset': String(offset) },
          body: await video.slice(offset, offset + chunk).arrayBuffer(),
        });
        if (result.ticket) fileTicket = result.ticket;
      }
      if (!fileTicket) throw new Error('The video upload did not complete. Please try again.');
      setStage('Gemini is processing the video…');
      let ready = false;
      for (let attempt = 0; attempt < 90; attempt++) {
        ready = (await post<{ ready: boolean }>({ action: 'status', ticket: fileTicket })).ready;
        if (ready) break;
        await new Promise<void>((resolve, reject) => {
          const onAbort = () => {
            clearTimeout(timer);
            reject(new DOMException('Cancelled', 'AbortError'));
          };
          const timer = setTimeout(() => {
            abort.signal.removeEventListener('abort', onAbort);
            resolve();
          }, 2000);
          if (abort.signal.aborted) onAbort();
          else abort.signal.addEventListener('abort', onAbort, { once: true });
        });
      }
      if (!ready)
        throw new Error('Video processing took too long. Try a shorter or compressed recording.');
      setStage('Checking the run against the event scoring rules…');
      const result = await post<{ grade: BuildGrade }>({
        action: 'grade',
        eventId,
        course,
        map,
        ticket: fileTicket,
      });
      setGrade({ result: result.grade, course: structuredClone(course) });
    } catch (e) {
      if (!abort.signal.aborted)
        setError(e instanceof Error ? e.message : 'Could not grade this video.');
      else setNotice('Grading cancelled.');
    } finally {
      if (fileTicket)
        void request('/api/build-tools', {
          method: 'POST',
          body: JSON.stringify({ action: 'delete', ticket: fileTicket }),
        }).catch(() => undefined);
      setBusy(false);
      setStage('');
      controller.current = null;
    }
  }
  function handoff() {
    try {
      localStorage.setItem(key, JSON.stringify(course));
      router.push(`/dashboard/student/events/${eventId}/video-grader`);
    } catch {
      setError('The course could not be transferred. Export it, then import it in Video Grader.');
    }
  }
  return (
    <div className="build-tools" aria-busy={busy}>
      <div className="build-intro">
        <span className="tag">2027 · DIVISION {division}</span>
        <h2>
          {mode === 'course'
            ? 'Set up your next practice run.'
            : 'Turn a practice run into a plan.'}
        </h2>
        <p>
          {mode === 'course'
            ? 'Generate an event-specific course or testing station, review the diagram, then take it straight to Video Grader.'
            : 'Add the event parameters and course map, then upload a complete recording. Gemini uses this division’s event rules to review your build.'}
        </p>
        <a
          className="text-link"
          href={`/rules/2027/${division.toLowerCase()}/${eventId}.pdf`}
          target="_blank"
          rel="noreferrer"
        >
          Open the event rules ↗
        </a>
      </div>
      {!loaded ? (
        <p role="status">Loading your setup…</p>
      ) : (
        <>
          <form
            onSubmit={
              mode === 'grade'
                ? gradeVideo
                : (e) => {
                    e.preventDefault();
                    void generate();
                  }
            }
          >
            <fieldset disabled={busy} className="build-fieldset">
              <section className="build-card">
                <div className="build-card-heading">
                  <div>
                    <span className="build-step">01 / THE SETUP</span>
                    <h3>Event parameters</h3>
                  </div>
                  <label className="build-file-button">
                    <Upload size={16} /> Import course
                    <input
                      type="file"
                      accept=".json,application/json"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) void importCourse(f);
                        e.target.value = '';
                      }}
                    />
                  </label>
                </div>
                <p className="build-muted">
                  Enter values with units. Use “not applicable” for fields your event format does
                  not use. Blank fields are chosen from the rules when generating a course.
                </p>
                <div className="build-fields">
                  <label>
                    Setup name
                    <input
                      maxLength={120}
                      required
                      value={course.title}
                      onChange={(e) => setCourse({ ...course, title: e.target.value })}
                    />
                  </label>
                  <label>
                    Tournament level
                    <select
                      value={course.level}
                      onChange={(e) =>
                        setCourse({
                          ...course,
                          level: e.target.value as BuildCourse['level'],
                          setup: [],
                          ruleReferences: [],
                          diagram: { view: 'Setup schematic — not to scale', nodes: [], edges: [] },
                        })
                      }
                    >
                      <option value="regional">Regional</option>
                      <option value="state">State</option>
                      <option value="national">National</option>
                    </select>
                  </label>
                  {buildFields[eventId].map((label) => (
                    <label key={label}>
                      {label}
                      <input
                        maxLength={1000}
                        required={mode === 'grade'}
                        value={course.parameters[label]}
                        placeholder={
                          mode === 'course'
                            ? 'Choose from rules, or enter a value'
                            : 'Enter value and units'
                        }
                        onChange={(e) => editParameter(label, e.target.value)}
                      />
                    </label>
                  ))}
                </div>
                <label className="build-notes">
                  Setup notes and measured build data
                  <textarea
                    rows={4}
                    maxLength={6000}
                    value={course.notes}
                    placeholder="Describe the course layout, available space, and any measurements such as device mass, load, temperatures or stopwatch times. Label measurements you took yourself."
                    onChange={(e) => setCourse({ ...course, notes: e.target.value })}
                  />
                </label>
              </section>
              {mode === 'course' ? (
                <div className="build-actions">
                  <button className="button button-primary" type="submit">
                    <Shuffle size={17} /> Generate course
                  </button>
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={() => {
                      setCourse(blankCourse(division, eventId));
                      setNotice(
                        'Fields cleared. Generate a new random setup from the event rules.',
                      );
                    }}
                  >
                    Reset parameters
                  </button>
                </div>
              ) : (
                <section className="build-card">
                  <span className="build-step">02 / THE RECORDING</span>
                  <h3>Show the full attempt</h3>
                  <p className="build-muted">
                    Record the setup, start, entire run, finish and readable measurement tools.
                    Include construction checks and logs when the rules require them. Videos are
                    sent to Google Gemini for analysis.
                  </p>
                  <label className="build-upload">
                    <Upload size={22} />
                    <strong>
                      {map?.name || 'Add a course map (optional with a generated diagram)'}
                    </strong>
                    <span>PNG, JPEG, WebP or PDF · up to 1 MB</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,application/pdf"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        e.target.value = '';
                        if (!f) return;
                        try {
                          setMap(await readMap(f));
                          setError('');
                        } catch (err) {
                          setError((err as Error).message);
                        }
                      }}
                    />
                  </label>
                  {map && (
                    <button type="button" className="text-link" onClick={() => setMap(null)}>
                      Remove course map
                    </button>
                  )}
                  <label className="build-upload">
                    <Video size={24} />
                    <strong>{video?.name || 'Choose your build video'}</strong>
                    <span>MP4, WebM, MOV or MPEG · up to 100 MB</span>
                    <input
                      type="file"
                      required={!video}
                      accept={VIDEO_MIMES.join(',')}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        if (
                          !VIDEO_MIMES.includes(f.type) ||
                          f.size > MAX_VIDEO_BYTES ||
                          f.size === 0
                        ) {
                          setError('Choose a supported video up to 100 MB.');
                          e.target.value = '';
                          setVideo(null);
                          return;
                        }
                        setVideo(f);
                        setError('');
                        setGrade(null);
                      }}
                    />
                  </label>
                  {preview && (
                    <video className="build-video" src={preview} controls preload="metadata" />
                  )}
                  <button className="button button-primary" type="submit" disabled={!video}>
                    <Video size={17} /> Grade video
                  </button>
                </section>
              )}
            </fieldset>
          </form>
          {busy && (
            <div className="build-progress" role="status">
              <LoaderCircle size={20} className="build-spinner" />
              <span>{stage}</span>
              <button
                type="button"
                className="text-link"
                onClick={() => controller.current?.abort()}
              >
                Cancel
              </button>
            </div>
          )}
          {error && (
            <p className="build-error" role="alert">
              {error}
            </p>
          )}
          {notice && (
            <p className="build-muted" role="status">
              {notice}
            </p>
          )}
          {svg && (
            <section className="build-card">
              <div className="build-card-heading">
                <div>
                  <span className="build-step">
                    {mode === 'grade' ? 'YOUR COURSE' : '02 / READY TO BUILD'}
                  </span>
                  <h3>{course.title}</h3>
                </div>
                <span className="tag">{course.level}</span>
              </div>
              {/* Only locally escaped SVG is embedded, never imported SVG or raw model markup. */}
              <img
                className="build-diagram"
                src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`}
                alt={`${course.title}: ${course.diagram.view}. Parameters and setup instructions follow.`}
              />
              <h4>Set it up</h4>
              <ol className="build-setup">
                {course.setup.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
              <details>
                <summary>Rules used for this setup</summary>
                <ul>
                  {course.ruleReferences.map((ref, i) => (
                    <li key={i}>{ref}</li>
                  ))}
                </ul>
              </details>
              <p className="build-muted">
                Practice schematic; use the labeled dimensions and event rules to lay out the
                course.
              </p>
              <div className="build-actions">
                {profile?.role === 'student' && (
                  <button
                    className="button button-secondary"
                    type="button"
                    disabled={saving || busy || savedContent === JSON.stringify(course)}
                    onClick={() => void persist(course)}
                  >
                    {saving
                      ? 'Saving…'
                      : savedContent === JSON.stringify(course)
                        ? 'Saved to library'
                        : 'Save & share course'}
                  </button>
                )}
                <Link className="button button-secondary" href="/dashboard/courses">
                  Course library
                </Link>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() =>
                    saveFile(
                      `${eventId}-division-${division}-course.json`,
                      JSON.stringify(course, null, 2),
                      'application/json',
                    )
                  }
                >
                  <Download size={16} /> Export course
                </button>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => saveFile(`${eventId}-course.svg`, svg, 'image/svg+xml')}
                >
                  <Download size={16} /> Export diagram + parameters
                </button>
                {mode === 'course' && (
                  <button
                    className="button button-primary"
                    type="button"
                    disabled={busy}
                    onClick={handoff}
                  >
                    Use in Video Grader <ArrowRight size={16} />
                  </button>
                )}
              </div>
              <CoursePreview key={JSON.stringify(course)} course={course} />
            </section>
          )}
          {!svg && mode === 'grade' && (
            <p className="build-muted">
              Need a practice setup?{' '}
              <a
                className="text-link"
                href={`/dashboard/student/events/${eventId}/course-generator`}
              >
                Open Course Generator
              </a>
            </p>
          )}
          {grade && (
            <section className="build-card build-results" aria-label="Video grading results">
              <span className="build-step">YOUR PRACTICE REVIEW</span>
              <h3>
                {grade.result.score === null
                  ? 'More evidence needed'
                  : `${grade.result.score} ${grade.result.scoreLabel}`}
              </h3>
              <p>{grade.result.summary}</p>
              <p className="build-muted">
                AI practice estimate · {grade.result.direction} · {grade.result.tier}
              </p>
              <h4>Scoring calculation</h4>
              <p className="build-calculation">{grade.result.formula}</p>
              <p className="build-calculation">{grade.result.calculation}</p>
              <div className="build-criteria">
                {grade.result.criteria.map((c, i) => (
                  <article key={i}>
                    <div>
                      <strong>{c.name}</strong>
                      <span className="tag">{c.status}</span>
                    </div>
                    <p>{c.value}</p>
                    <p>{c.evidence}</p>
                    <small>
                      Video: {c.timestamp || 'Not visible'} · Rule: {c.rule}
                    </small>
                  </article>
                ))}
              </div>
              {(['penalties', 'missing', 'improvements'] as const).map(
                (k) =>
                  grade.result[k].length > 0 && (
                    <div key={k}>
                      <h4>
                        {k === 'missing'
                          ? 'Evidence still needed'
                          : k === 'penalties'
                            ? 'Penalties and rule issues'
                            : 'What to improve next'}
                      </h4>
                      <ul>
                        {grade.result[k].map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ),
              )}
              <p className="build-muted">
                Based on “{grade.course.title}”, Division {division}, {grade.course.level}. Scores
                use the evidence available and do not replace an event supervisor’s judgment.
                Written components and unseen checks cannot be graded from a run video.
              </p>
              <button
                type="button"
                className="button button-secondary"
                onClick={() =>
                  saveFile(
                    `${eventId}-practice-review.json`,
                    JSON.stringify(
                      { season: 2027, course: grade.course, grade: grade.result },
                      null,
                      2,
                    ),
                    'application/json',
                  )
                }
              >
                <Download size={16} /> Export review
              </button>
            </section>
          )}
        </>
      )}
    </div>
  );
}
