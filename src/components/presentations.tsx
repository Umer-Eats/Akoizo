'use client';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Expand,
  LogIn,
  Presentation as PresentationIcon,
  Radio,
  User,
  Users,
} from 'lucide-react';
import type { Division } from '@/lib/events';
import type { EventLessons, Lesson } from '@/lib/lessons';
import { lessonLabel, unitLabel } from '@/lib/lesson-labels';
import { deckFor } from '@/lib/presentations';
import { scoreDeck } from '@/lib/presentation-grading';
import {
  isActivity,
  isGraded,
  type ActivitySlide,
  type Deck,
  type SlideAnswer,
} from '@/lib/presentation-types';
import type {
  LiveState,
  LiveSummary,
  PresentationProgress,
  PresentationResult,
} from '@/lib/presentation-service';
import { useAuth, authMessage } from './auth-context';
import { useStudyLayer } from './notes-store';
import {
  ActivityBody,
  InfoSlideBody,
  SlideFrame,
  SoloActivity,
  answerDraft,
  draftAnswer,
  initialDraft,
  type Draft,
} from './presentation-player';
import { animateInPlace } from './page-transitions';
import './presentations.css';

type View =
  | { kind: 'list' }
  | { kind: 'choose'; lessonId: string }
  | { kind: 'solo'; lessonId: string }
  | { kind: 'live'; sessionId: string };

const POLL_MS = 2000;

const deckStats = (deck: Deck) => ({
  slides: deck.slides.length,
  activities: deck.slides.filter(isActivity).length,
});

type SoloScore = { earned: number; possible: number; total: PresentationProgress | null };

/** The student's best-of-every-session total, shown after a solo run or a live session. */
function TotalStanding({ total }: { total: PresentationProgress | null }) {
  if (!total) return null;
  return (
    <p className="presentation-total">
      <strong>Your total: {standing(total)}.</strong>{' '}
      {total.answered < total.possible
        ? 'Your best score on each activity is kept across every run and live session, so you can finish the rest another day.'
        : 'Your best score on each activity is kept across every run and live session and saved for your instructor.'}
    </p>
  );
}

const percentOf = (progress: { earned: number; possible: number }) =>
  progress.possible ? Math.round((progress.earned / progress.possible) * 100) : 100;
const points = (value: number) => value.toFixed(value % 1 ? 1 : 0);

/** "6 of 9 points (67%) · 8 of 9 activities answered", from the best score on each slide. */
const standing = (progress: PresentationProgress) =>
  `${points(progress.earned)} of ${progress.possible} points (${percentOf(progress)}%)` +
  (progress.answered < progress.possible
    ? ` · ${progress.answered} of ${progress.possible} activities answered`
    : '');

type ViewProps = { course: EventLessons; division: Division };

/** One pane that holds whichever view is showing, so switching views animates as one layer. */
export function PresentationsView(props: ViewProps) {
  return (
    <div className="presentations-pane">
      <PresentationsViews {...props} />
    </div>
  );
}

function PresentationsViews({ course, division }: ViewProps) {
  const { request } = useAuth();
  const [view, setView] = useState<View>({ kind: 'list' });
  // The lesson last opened: its card in the list and the chooser's heading morph into each other.
  const [focus, setFocus] = useState('');
  /** Switch views with an animated view transition (see presentations.css). */
  const go = (next: View, kind: 'pres-open' | 'pres-start' | 'pres-back') =>
    animateInPlace(kind, () => {
      setView(next);
      if (next.kind === 'choose') setFocus(next.lessonId);
    });
  const [results, setResults] = useState<Record<string, PresentationResult>>({});
  const [sessions, setSessions] = useState<LiveSummary[]>([]);
  const [error, setError] = useState('');
  const lessonTitle = useCallback(
    (lessonId: string) => lessonLabel(course, lessonId) ?? lessonId,
    [course],
  );

  const refresh = useCallback(async () => {
    try {
      const data = await request<{ results: PresentationResult[]; sessions: LiveSummary[] }>(
        `/api/presentations?eventId=${encodeURIComponent(course.eventId)}`,
      );
      setResults(Object.fromEntries(data.results.map((result) => [result.lessonId, result])));
      setSessions(data.sessions);
      setError('');
    } catch (error) {
      setError(authMessage(error));
    }
  }, [request, course.eventId]);

  // An assignment link opens its lesson's choices directly.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('lesson');
    if (requested && deckFor(division, course.eventId, requested))
      setView({ kind: 'choose', lessonId: requested });
  }, [division, course.eventId]);

  // Keep finished marks and open sessions current while choosing.
  useEffect(() => {
    if (view.kind === 'solo' || view.kind === 'live') return;
    void refresh();
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') void refresh();
    }, 8000);
    return () => window.clearInterval(timer);
  }, [view.kind, refresh]);

  const back = () => {
    go({ kind: 'list' }, 'pres-back');
    void refresh();
  };

  // Coming back to the list, bring the card that was opened into view before the new view is drawn.
  useLayoutEffect(() => {
    if (view.kind !== 'list' || !focus) return;
    document
      .querySelector<HTMLElement>(`.presentation-lesson[data-lesson="${CSS.escape(focus)}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [view.kind, focus]);

  if (view.kind === 'solo')
    return (
      <SoloRunner
        course={course}
        deck={deckFor(division, course.eventId, view.lessonId)!}
        title={lessonTitle(view.lessonId)}
        onExit={back}
      />
    );
  if (view.kind === 'live')
    return (
      <LiveRunner course={course} division={division} sessionId={view.sessionId} onExit={back} />
    );
  if (view.kind === 'choose')
    return (
      <ModeChooser
        course={course}
        lessonId={view.lessonId}
        title={lessonTitle(view.lessonId)}
        deck={deckFor(division, course.eventId, view.lessonId)!}
        result={results[view.lessonId]}
        sessions={sessions.filter((session) => session.lessonId === view.lessonId)}
        onBack={back}
        onSolo={() => go({ kind: 'solo', lessonId: view.lessonId }, 'pres-start')}
        onLive={(sessionId) => go({ kind: 'live', sessionId }, 'pres-start')}
      />
    );

  const presented = course.lessons.filter((lesson) => deckFor(division, course.eventId, lesson.id));
  return (
    <section className="presentations" aria-label={`${course.eventName} presentations`}>
      <div className="presentations-intro">
        <p className="eyebrow">DIVISION {course.division} · PRESENTATIONS</p>
        <h2>Learn {course.eventName} as a presentation.</h2>
        <p>
          Every presentation teaches the same material as its lesson, slide by slide, with diagrams,
          matching, sorting, calculations and quick checks. Learn by yourself, host a live
          presentation for classmates, or join one that is running.
        </p>
        <div className="course-facts">
          <span>{presented.length} presentations</span>
          <span>
            {Object.values(results).filter((result) => result.completedAt).length} completed
          </span>
          <span>{sessions.length} live now</span>
        </div>
      </div>
      <JoinByCode onJoined={(id) => go({ kind: 'live', sessionId: id }, 'pres-start')} />
      {error && <p role="alert">{error}</p>}
      {course.units.map((unit) => (
        <section key={unit.id} className="presentation-unit" aria-label={unit.title}>
          <h3>{unitLabel(course, unit.id)}</h3>
          <p>{unit.description}</p>
          <ul className="presentation-lessons">
            {unit.lessonIds.map((id) => {
              const deck = deckFor(division, course.eventId, id);
              const result = results[id];
              const live = sessions.filter((session) => session.lessonId === id).length;
              const stats = deck && deckStats(deck);
              return (
                <li key={id}>
                  <button
                    className="presentation-lesson"
                    disabled={!deck}
                    data-lesson={id}
                    data-vt={id === focus ? 'card' : undefined}
                    onClick={(event) => {
                      // The clicked card, and only it, grows into the chooser.
                      document
                        .querySelectorAll<HTMLElement>('.presentation-lesson[data-vt]')
                        .forEach((card) => delete card.dataset.vt);
                      event.currentTarget.dataset.vt = 'card';
                      go({ kind: 'choose', lessonId: id }, 'pres-open');
                    }}
                  >
                    <PresentationIcon size={22} aria-hidden="true" />
                    <span className="presentation-lesson-body">
                      <strong>{lessonTitle(id)}</strong>
                      <small>
                        {stats
                          ? `${stats.slides} slides · ${stats.activities} activities`
                          : 'Presentation coming soon'}
                      </small>
                    </span>
                    {live > 0 && (
                      <span className="presentation-live-badge">
                        <Radio size={12} aria-hidden="true" /> {live} live
                      </span>
                    )}
                    {result &&
                      (result.completedAt ? (
                        <span className="presentation-done">
                          <Check size={14} aria-hidden="true" />
                          {percentOf(result)}%
                        </span>
                      ) : (
                        <span className="presentation-progress-badge">
                          {result.answered}/{result.possible} activities
                        </span>
                      ))}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </section>
  );
}

function JoinByCode({ onJoined, compact }: { onJoined: (id: string) => void; compact?: boolean }) {
  const { request } = useAuth();
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function join(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { id } = await request<{ id: string }>('/api/presentations', {
        method: 'POST',
        body: JSON.stringify({ action: 'join', code }),
      });
      onJoined(id);
    } catch (error) {
      setError(authMessage(error));
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className={`presentation-join${compact ? ' compact' : ''}`} onSubmit={join}>
      <label>
        {compact ? 'Have a code?' : 'Joining a classmate’s presentation? Enter its code'}
        <input
          value={code}
          maxLength={6}
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="ABC123"
          onChange={(event) => setCode(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
        />
      </label>
      <button className="button button-primary" disabled={busy || code.length < 6}>
        <LogIn size={16} /> {busy ? 'Joining…' : 'Join'}
      </button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}

function ModeChooser({
  course,
  lessonId,
  title,
  deck,
  result,
  sessions,
  onBack,
  onSolo,
  onLive,
}: {
  course: EventLessons;
  lessonId: string;
  title: string;
  deck: Deck;
  result?: PresentationResult;
  sessions: LiveSummary[];
  onBack: () => void;
  onSolo: () => void;
  onLive: (sessionId: string) => void;
}) {
  const { request } = useAuth();
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const stats = deckStats(deck);
  async function act(action: 'host' | 'join', extra: Record<string, unknown>) {
    setBusy(action === 'host' ? 'host' : String(extra.code));
    setError('');
    try {
      const { id } = await request<{ id: string }>('/api/presentations', {
        method: 'POST',
        body: JSON.stringify({ action, eventId: course.eventId, lessonId, ...extra }),
      });
      onLive(id);
    } catch (error) {
      setError(authMessage(error));
      setBusy('');
    }
  }
  return (
    <section className="presentation-chooser" aria-label={`${title} presentation`}>
      <button className="back-link" onClick={onBack}>
        <ChevronLeft size={16} /> All presentations
      </button>
      <div className="presentation-chooser-head" data-vt="card">
        <p className="eyebrow">PRESENTATION</p>
        <h2>{title}</h2>
        <p>
          {stats.slides} slides · {stats.activities} activities
          {result && ` · ${result.completedAt ? 'Completed' : 'In progress'}: ${standing(result)}`}
          {' · '}
          <Link
            className="text-link"
            href={`/dashboard/student/events/${course.eventId}/lessons?lesson=${encodeURIComponent(lessonId)}`}
          >
            Read this lesson instead
          </Link>
        </p>
      </div>
      {error && <p role="alert">{error}</p>}
      <div className="presentation-modes">
        <article className="presentation-mode">
          <User size={28} aria-hidden="true" />
          <h3>Learn by yourself</h3>
          <p>
            Go through every slide at your own pace. Activities are checked as you go, and your
            progress is saved on this device.
          </p>
          <button className="button button-primary" onClick={onSolo}>
            Start <ChevronRight size={16} />
          </button>
        </article>
        <article className="presentation-mode">
          <Users size={28} aria-hidden="true" />
          <h3>Join a presentation</h3>
          <p>Follow a classmate’s live presentation and answer each activity with the room.</p>
          {sessions.length ? (
            <ul className="presentation-sessions">
              {sessions.map((session) => (
                <li key={session.id}>
                  <span>
                    <strong>{session.hostName}</strong>
                    <small>
                      {session.members} in the room · code {session.code}
                    </small>
                  </span>
                  <button
                    className="button button-small"
                    disabled={!!busy}
                    onClick={() => act('join', { code: session.code })}
                  >
                    {busy === session.code ? 'Joining…' : 'Join'}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="presentation-muted">No one is presenting this lesson right now.</p>
          )}
          <JoinByCode compact onJoined={onLive} />
        </article>
        <article className="presentation-mode">
          <Radio size={28} aria-hidden="true" />
          <h3>Host a presentation</h3>
          <p>
            Lead the room: you control the slides, classmates join with your code, and you reveal
            answers together.
          </p>
          <button
            className="button button-primary"
            disabled={!!busy}
            onClick={() => act('host', {})}
          >
            {busy === 'host' ? 'Starting…' : 'Host now'}
          </button>
        </article>
      </div>
    </section>
  );
}

/** Arrow keys change slides unless the student is typing. */
function useSlideKeys(onPrev: () => void, onNext: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const handle = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onPrev, onNext, enabled]);
}

function FullscreenButton({ target }: { target: React.RefObject<HTMLElement | null> }) {
  return (
    <button
      className="presentation-icon-button"
      aria-label="Full screen"
      title="Full screen"
      onClick={() => {
        if (document.fullscreenElement) void document.exitFullscreen();
        else void target.current?.requestFullscreen?.();
      }}
    >
      <Expand size={16} />
    </button>
  );
}

function Progress({ index, total }: { index: number; total: number }) {
  return (
    <div className="presentation-progress" aria-hidden="true">
      <span style={{ width: `${((index + 1) / total) * 100}%` }} />
    </div>
  );
}

const lessonOf = (course: EventLessons, lessonId: string): Lesson | undefined =>
  course.lessons.find((lesson) => lesson.id === lessonId);

function SoloRunner({
  course,
  deck,
  title,
  onExit,
}: {
  course: EventLessons;
  deck: Deck;
  title: string;
  onExit: () => void;
}) {
  const { request, profile } = useAuth();
  const storageKey = `akoizo:presentation:${profile?.id}:${course.division}:${course.eventId}:${deck.lessonId}`;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, SlideAnswer>>({});
  const [loaded, setLoaded] = useState(false);
  const [finished, setFinished] = useState<SoloScore | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const stage = useRef<HTMLDivElement>(null);
  const lesson = lessonOf(course, deck.lessonId);
  useStudyLayer(2, {
    eventId: course.eventId,
    eventName: course.eventName,
    kind: 'lesson',
    refId: deck.lessonId,
    label: `${title} (presentation)`,
  });

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
      if (saved && typeof saved === 'object') {
        if (Number.isInteger(saved.index))
          setIndex(Math.min(Math.max(saved.index, 0), deck.slides.length - 1));
        if (saved.answers && typeof saved.answers === 'object') setAnswers(saved.answers);
      }
    } catch {
      // Progress then lasts only for this visit.
    }
    setLoaded(true);
  }, [storageKey, deck.slides.length]);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ index, answers }));
    } catch {
      // Storage may be unavailable; the presentation still works.
    }
  }, [loaded, storageKey, index, answers]);

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(
    () => setIndex((i) => Math.min(deck.slides.length - 1, i + 1)),
    [deck.slides.length],
  );
  useSlideKeys(prev, next, !finished);

  const graded = deck.slides.filter(isGraded);
  const unanswered = graded.filter((slide) => answers[slide.id] === undefined).length;
  const live = scoreDeck(deck, answers);

  async function finish() {
    setSaving(true);
    setError('');
    try {
      const score = await request<SoloScore>('/api/presentations', {
        method: 'POST',
        body: JSON.stringify({
          action: 'finish',
          eventId: course.eventId,
          lessonId: deck.lessonId,
          answers,
        }),
      });
      setFinished(score);
    } catch (error) {
      setError(authMessage(error));
    } finally {
      setSaving(false);
    }
  }

  if (!loaded) return <p role="status">Loading your presentation…</p>;
  if (finished)
    return (
      <section className="presentation-finished">
        <Check size={36} aria-hidden="true" />
        <h2>
          {!finished.total || finished.total.answered >= finished.total.possible
            ? 'Presentation complete!'
            : 'Progress saved!'}
        </h2>
        <p>
          This run: {points(finished.earned)} of {finished.possible} activity points (
          {percentOf(finished)}%).
        </p>
        <TotalStanding total={finished.total} />
        <div className="presentation-finished-actions">
          <button
            className="button button-secondary"
            onClick={() => {
              setAnswers({});
              setIndex(0);
              setFinished(null);
            }}
          >
            Go again
          </button>
          <button className="button button-primary" onClick={onExit}>
            Back to presentations
          </button>
        </div>
      </section>
    );

  const slide = deck.slides[index];
  const last = index === deck.slides.length - 1;
  return (
    <div className="presentation-stage" ref={stage}>
      <div className="presentation-toolbar">
        <button className="back-link" onClick={onExit}>
          <ChevronLeft size={16} /> Exit
        </button>
        <strong>{title}</strong>
        <span className="presentation-score">
          {live.earned.toFixed(live.earned % 1 ? 1 : 0)} / {live.possible} points
        </span>
        <FullscreenButton target={stage} />
      </div>
      <Progress index={index} total={deck.slides.length} />
      <SlideFrame slide={slide} lesson={lesson} index={index} total={deck.slides.length}>
        {isActivity(slide) ? (
          <SoloActivity
            key={slide.id}
            slide={slide}
            saved={answers[slide.id]}
            onAnswer={(answer) =>
              setAnswers((prev) => {
                const next = { ...prev };
                if (answer === null) delete next[slide.id];
                else next[slide.id] = answer;
                return next;
              })
            }
          />
        ) : (
          <InfoSlideBody key={slide.id} slide={slide} />
        )}
      </SlideFrame>
      <nav className="presentation-nav" aria-label="Slides">
        <button className="button button-secondary" disabled={index === 0} onClick={prev}>
          <ChevronLeft size={16} /> Back
        </button>
        <div className="presentation-dots">
          {deck.slides.map((item, i) => (
            <button
              key={item.id}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? 'step' : undefined}
              className={`dot${isActivity(item) ? ' activity' : ''}${answers[item.id] !== undefined ? ' done' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        {last ? (
          <button className="button button-primary" disabled={saving} onClick={finish}>
            {saving ? 'Saving…' : 'Finish presentation'}
          </button>
        ) : (
          <button className="button button-primary" onClick={next}>
            Next <ChevronRight size={16} />
          </button>
        )}
      </nav>
      {last && unanswered > 0 && (
        <p className="presentation-muted">
          {unanswered} activit{unanswered === 1 ? 'y is' : 'ies are'} still unanswered. You can
          finish now or use the dots to go back.
        </p>
      )}
      {error && <p role="alert">{error}</p>}
    </div>
  );
}

function LiveRunner({
  course,
  division,
  sessionId,
  onExit,
}: {
  course: EventLessons;
  division: Division;
  sessionId: string;
  onExit: () => void;
}) {
  const { request } = useAuth();
  const [state, setState] = useState<LiveState | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const deck = state ? deckFor(division, state.eventId, state.lessonId) : null;

  const poll = useCallback(async () => {
    try {
      setState(
        await request<LiveState>(`/api/presentations/live?id=${encodeURIComponent(sessionId)}`),
      );
      setError('');
    } catch (error) {
      setError(authMessage(error));
    }
  }, [request, sessionId]);
  useEffect(() => {
    void poll();
    if (state?.status === 'ended') return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') void poll();
    }, POLL_MS);
    return () => window.clearInterval(timer);
  }, [poll, state?.status]);

  const control = useCallback(
    async (body: Record<string, unknown>) => {
      setBusy(true);
      try {
        await request('/api/presentations', {
          method: 'POST',
          body: JSON.stringify({ action: 'control', id: sessionId, ...body }),
        });
        await poll();
      } catch (error) {
        setError(authMessage(error));
      } finally {
        setBusy(false);
      }
    },
    [request, sessionId, poll],
  );
  const isHost = !!state?.isHost;
  const total = deck?.slides.length ?? 0;
  const prev = useCallback(() => {
    if (isHost && state && state.slide > 0 && !busy) void control({ slide: state.slide - 1 });
  }, [isHost, state, busy, control]);
  const next = useCallback(() => {
    if (isHost && state && state.slide < total - 1 && !busy)
      void control({ slide: state.slide + 1 });
  }, [isHost, state, total, busy, control]);
  useSlideKeys(prev, next, isHost && state?.status === 'live');

  if (!state || !deck)
    return (
      <div className="presentation-stage">
        <button className="back-link" onClick={onExit}>
          <ChevronLeft size={16} /> Back
        </button>
        {error ? <p role="alert">{error}</p> : <p role="status">Connecting to the presentation…</p>}
      </div>
    );
  const title = lessonLabel(course, state.lessonId) ?? state.lessonId;
  if (state.status === 'ended')
    return (
      <section className="presentation-finished">
        <Check size={36} aria-hidden="true" />
        <h2>
          {isHost ? 'You ended the presentation.' : `${state.hostName} ended the presentation.`}
        </h2>
        <p>{title}</p>
        {state.score && (
          <p>
            This session: {points(state.score.earned)} of {state.score.possible} activity points (
            {percentOf(state.score)}%).
          </p>
        )}
        <TotalStanding total={state.total} />
        <button className="button button-primary" onClick={onExit}>
          Back to presentations
        </button>
      </section>
    );

  const slide = deck.slides[state.slide];
  const active = state.members.filter((member) => member.active);
  const lesson = lessonOf(course, state.lessonId);
  return (
    <div className="presentation-live" ref={stage}>
      <div className="presentation-stage">
        <div className="presentation-toolbar">
          <button className="back-link" onClick={onExit}>
            <ChevronLeft size={16} /> {isHost ? 'Leave (keeps running)' : 'Leave'}
          </button>
          <strong>{title}</strong>
          <span className="presentation-live-badge">
            <Radio size={12} aria-hidden="true" /> LIVE ·{' '}
            {isHost ? 'You are hosting' : `Hosted by ${state.hostName}`}
          </span>
          <FullscreenButton target={stage} />
        </div>
        <Progress index={state.slide} total={total} />
        <SlideFrame slide={slide} lesson={lesson} index={state.slide} total={total}>
          {isActivity(slide) ? (
            <LiveActivity
              key={slide.id}
              sessionId={state.id}
              slide={slide}
              saved={state.mine[slide.id]}
              revealed={state.revealed}
              tally={state.tally}
              isHost={isHost}
            />
          ) : (
            <InfoSlideBody key={slide.id} slide={slide} />
          )}
        </SlideFrame>
        {isHost ? (
          <nav className="presentation-nav" aria-label="Host controls">
            <button
              className="button button-secondary"
              disabled={busy || state.slide === 0}
              onClick={prev}
            >
              <ChevronLeft size={16} /> Back
            </button>
            {isActivity(slide) && (
              <button
                className="button button-secondary"
                disabled={busy}
                onClick={() => control({ revealed: !state.revealed })}
              >
                {state.revealed
                  ? 'Hide answers'
                  : `Reveal answers (${state.tally?.answered ?? 0}/${active.length})`}
              </button>
            )}
            {state.slide < total - 1 ? (
              <button className="button button-primary" disabled={busy} onClick={next}>
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button
                className="button button-primary"
                disabled={busy}
                onClick={() => {
                  if (
                    window.confirm('End the presentation for everyone? Answers are already saved.')
                  )
                    void control({ action: 'end' });
                }}
              >
                End presentation
              </button>
            )}
          </nav>
        ) : (
          <p className="presentation-muted presentation-follow">
            {state.hostName} controls the slides. Answer activities when they appear; answers are
            revealed by the host.
          </p>
        )}
        {error && <p role="alert">{error}</p>}
      </div>
      <aside className="presentation-room-panel" aria-label="Room">
        <p className="eyebrow">JOIN CODE</p>
        <p className="presentation-code">{state.code}</p>
        <p className="presentation-muted">
          Classmates open Presentation → this lesson → Join, or type the code.
        </p>
        <h3>
          In the room <span>({active.length})</span>
        </h3>
        <ul className="presentation-members">
          {state.members.map((member) => (
            <li key={member.id} className={member.active ? '' : 'away'}>
              <span>
                {member.name}
                {member.host && <small> · host</small>}
                {!member.active && <small> · away</small>}
              </span>
              {isActivity(slide) && member.answered && <Check size={14} aria-label="answered" />}
            </li>
          ))}
        </ul>
        {isHost && (
          <button
            className="text-link"
            disabled={busy}
            onClick={() => {
              if (window.confirm('End the presentation for everyone? Answers are already saved.'))
                void control({ action: 'end' });
            }}
          >
            End presentation now
          </button>
        )}
      </aside>
    </div>
  );
}

function LiveActivity({
  sessionId,
  slide,
  saved,
  revealed,
  tally,
  isHost,
}: {
  sessionId: string;
  slide: ActivitySlide;
  saved: unknown;
  revealed: boolean;
  tally: LiveState['tally'];
  isHost: boolean;
}) {
  const { request } = useAuth();
  const [draft, setDraft] = useState<Draft>(
    saved !== undefined ? answerDraft(slide, saved) : initialDraft(slide),
  );
  const [submitted, setSubmitted] = useState(saved !== undefined);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const ready = draftAnswer(slide, draft);
  // At the reveal, show what was actually submitted rather than an unsent edit.
  useEffect(() => {
    if (revealed && saved !== undefined) setDraft(answerDraft(slide, saved));
  }, [revealed, saved, slide]);
  const showTally = useMemo(
    () => revealed || (isHost && slide.kind !== 'open') || slide.kind === 'poll',
    [revealed, isHost, slide.kind],
  );
  async function submit() {
    if (ready === null) return;
    setSending(true);
    setError('');
    try {
      await request('/api/presentations', {
        method: 'POST',
        body: JSON.stringify({ action: 'answer', id: sessionId, slideId: slide.id, answer: ready }),
      });
      setSubmitted(true);
    } catch (error) {
      setError(authMessage(error));
    } finally {
      setSending(false);
    }
  }
  return (
    <>
      <ActivityBody
        slide={slide}
        draft={draft}
        setDraft={(value) => {
          setDraft(value);
          setSubmitted(false);
        }}
        locked={revealed}
        reveal={revealed}
        tally={showTally ? tally : undefined}
      />
      {!revealed && (
        <div className="presentation-activity-actions">
          <button
            className="button button-primary"
            disabled={ready === null || sending || submitted}
            onClick={submit}
          >
            {sending ? 'Sending…' : submitted ? 'Submitted' : 'Submit answer'}
          </button>
          {submitted && (
            <span className="presentation-muted">
              You can change your answer until the host reveals it.
            </span>
          )}
          {isHost && tally && <span className="presentation-muted">{tally.answered} answered</span>}
        </div>
      )}
      {revealed && saved === undefined && !submitted && (
        <p className="presentation-muted">You didn’t answer this one.</p>
      )}
      {error && <p role="alert">{error}</p>}
    </>
  );
}
