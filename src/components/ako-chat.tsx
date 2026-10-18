'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { authMessage, useAuth } from './auth-context';
import type { AkoAction } from '@/lib/ako-motion';
import {
  AKO_LIMITS,
  akoReplyParagraphs,
  type AkoReply,
  type AkoStudy,
  type AkoTurn,
} from '@/lib/ako-study';

const questionName = (label: string) =>
  /^[\d.]+[a-z]?$/i.test(label) ? `Question ${label}` : label;
// How long Ako waits for the student's "why" before he loses his patience.
const PATIENCE_MS = 60000;

/** Shared practice tutor and guided lesson teacher. Closing the panel keeps its thread. */
export function AkoChat({
  open,
  study,
  focus,
  onFocus,
  onClose,
  react,
  style,
}: {
  open: boolean;
  study: AkoStudy;
  focus: string;
  onFocus: (questionId: string) => void;
  onClose: () => void;
  react: (action: AkoAction, duration?: number) => void;
  style: CSSProperties;
}) {
  const { request } = useAuth();
  const [turns, setTurns] = useState<AkoTurn[]>([]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [why, setWhy] = useState({ pending: false, missed: 0 });
  const session = useRef(0);
  const draftRef = useRef('');
  const reactRef = useRef(react);
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const sendRef = useRef<(text: string) => Promise<void>>(async () => {});
  const taught = useRef('');
  const lesson = study.lesson;
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const resizeDrag = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const advance = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [advancing, setAdvancing] = useState(false);
  const openRef = useRef(open);
  openRef.current = open;
  const cancelAdvance = () => {
    if (advance.current) clearTimeout(advance.current);
    advance.current = null;
    setAdvancing(false);
  };
  draftRef.current = draft;
  reactRef.current = react;
  // Keep the lesson conversation between lines, but cancel stale replies and reset the check.
  useEffect(() => {
    cancelAdvance();
    session.current++;
    if (!study.lesson) setTurns([]);
    setWhy({ pending: false, missed: 0 });
    setError('');
    setSending(false);
    setDraft('');
  }, [study.testId, focus]);
  useEffect(() => () => cancelAdvance(), [open]);
  useEffect(() => {
    const resize = () => setSize(null);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  useEffect(() => {
    setTurns([]);
    setDraft('');
    taught.current = '';
    return () => {
      session.current++;
    };
  }, [study.testId]);
  useEffect(() => {
    if (!open || !lesson || !focus) return;
    lesson.onLine(focus);
    const key = `${study.testId}/${focus}`;
    if (taught.current === key) return;
    const timer = setTimeout(() => {
      taught.current = key;
      void sendRef.current('Teach this line.');
    }, 0);
    return () => clearTimeout(timer);
  }, [open, focus, study.testId, lesson]);
  useEffect(() => {
    if (open) input.current?.focus();
  }, [open, focus]);
  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [turns, sending, open]);
  useEffect(() => {
    const element = log.current;
    if (!open || !element) return;
    const observer = new ResizeObserver(() => element.scrollTo({ top: element.scrollHeight }));
    observer.observe(element);
    return () => observer.disconnect();
  }, [open]);
  useEffect(() => {
    if (lesson || !open || !why.pending || sending) return;
    const timer = setTimeout(() => {
      if (draftRef.current.trim()) return;
      reactRef.current('angry', 120000);
      setTurns((current) => [
        ...current,
        { role: 'ako', text: 'I’m still waiting! Tell me why, in your own words.' },
      ]);
    }, PATIENCE_MS);
    return () => clearTimeout(timer);
  }, [why, sending, lesson, open]);
  async function send(text: string) {
    cancelAdvance();
    const message = text.trim().slice(0, AKO_LIMITS.message);
    if (!message || sending) return;
    const id = session.current;
    const history = turns.slice(-AKO_LIMITS.turns);
    setTurns((current) => [...current, { role: 'student', text: message }]);
    setDraft('');
    setSending(true);
    setError('');
    react('thinking', 60000);
    try {
      const reply = await request<AkoReply>(lesson ? '/api/lessons/ako' : '/api/practice/ako', {
        method: 'POST',
        body: JSON.stringify({
          ...(lesson
            ? { eventId: lesson.eventId, lessonId: lesson.lessonId }
            : { testId: study.testId }),
          questionId: focus || undefined,
          message,
          history,
          answer: !lesson && focus ? study.answerFor(focus).slice(0, AKO_LIMITS.answer) : undefined,
          pendingWhy: why.pending,
          missedWhys: why.missed,
        }),
      });
      if (id !== session.current) return;
      setTurns((current) => [...current, { role: 'ako', text: reply.reply }]);
      setWhy({ pending: reply.awaitingWhy, missed: reply.missedWhys });
      if (
        lesson &&
        reply.nextLineId &&
        study.questions.some((line) => line.id === reply.nextLineId)
      ) {
        setAdvancing(true);
        advance.current = setTimeout(
          () => {
            setAdvancing(false);
            if (openRef.current && id === session.current && !draftRef.current.trim())
              onFocus(reply.nextLineId!);
          },
          reply.verdict === 'correct'
            ? Math.max(4500, Math.min(18000, reply.reply.split(/\s+/).length * 280))
            : 1500,
        );
      }
      // He stays mad, or keeps waiting, until the student explains why.
      react(
        reply.mood,
        reply.mood === 'angry'
          ? 120000
          : reply.awaitingWhy && reply.mood === 'thinking'
            ? PATIENCE_MS
            : 7000,
      );
    } catch (failure) {
      if (id !== session.current) return;
      setTurns((current) => current.slice(0, -1));
      setDraft(message);
      setError(authMessage(failure));
      react('sad', 4000);
    } finally {
      if (id === session.current) setSending(false);
    }
  }
  sendRef.current = send;
  if (!open) return null;
  const lineIndex = study.questions.findIndex((line) => line.id === focus);
  const prompts = lesson
    ? [
        'Explain more simply',
        'Explain the key terms',
        'Give me an example',
        'Quiz me on this concept',
      ]
    : focus
      ? [
          'What’s the answer?',
          'Give me a hint',
          ...(study.answerFor(focus).trim() ? ['Is my answer right?'] : []),
        ]
      : ['What does this test cover?', 'Quiz me on a topic'];
  return (
    <section
      id="ako-chat"
      className={`ako-chat${lesson ? ' ako-chat-lesson' : ''}`}
      aria-label="Study with Ako"
      style={{
        ...style,
        ...(size
          ? {
              width: Math.min(size.width, innerWidth - 16),
              height: Math.min(size.height, innerHeight - 16),
              ...(lesson
                ? {}
                : {
                    left: Math.max(
                      8,
                      Math.min(
                        Number(style.left) || 8,
                        innerWidth - Math.min(size.width, innerWidth - 16) - 8,
                      ),
                    ),
                    top: Math.max(
                      8,
                      Math.min(
                        Number(style.top) || 8,
                        innerHeight - Math.min(size.height, innerHeight - 16) - 8,
                      ),
                    ),
                  }),
            }
          : {}),
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose();
      }}
    >
      <button
        type="button"
        className="ako-chat-resize"
        aria-label="Resize Ako chat"
        title="Drag to resize; use arrow keys for smaller adjustments"
        onPointerDown={(event) => {
          const rect = event.currentTarget.parentElement!.getBoundingClientRect();
          resizeDrag.current = {
            x: event.clientX,
            y: event.clientY,
            width: rect.width,
            height: rect.height,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const drag = resizeDrag.current;
          if (!drag) return;
          setSize({
            width: Math.min(innerWidth - 16, Math.max(280, drag.width + drag.x - event.clientX)),
            height: Math.min(innerHeight - 16, Math.max(320, drag.height + drag.y - event.clientY)),
          });
        }}
        onLostPointerCapture={() => {
          resizeDrag.current = null;
        }}
        onPointerUp={(event) => {
          resizeDrag.current = null;
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onKeyDown={(event) => {
          if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
          event.preventDefault();
          const rect = event.currentTarget.parentElement!.getBoundingClientRect();
          setSize({
            width: Math.min(
              innerWidth - 16,
              Math.max(
                280,
                rect.width +
                  (event.key === 'ArrowLeft' ? 24 : event.key === 'ArrowRight' ? -24 : 0),
              ),
            ),
            height: Math.min(
              innerHeight - 16,
              Math.max(
                320,
                rect.height + (event.key === 'ArrowUp' ? 24 : event.key === 'ArrowDown' ? -24 : 0),
              ),
            ),
          });
        }}
      >
        ⤢
      </button>
      <div className="ako-controls-title">
        <strong>Study with Ako</strong>
        <button type="button" aria-label="Close Ako chat" onClick={onClose}>
          ×
        </button>
      </div>
      <label className="ako-chat-focus">
        <span>Looking at</span>
        <select value={focus} onChange={(event) => onFocus(event.target.value)}>
          {!lesson && <option value="">The whole test</option>}
          {study.questions.map((question) => (
            <option key={question.id} value={question.id}>
              {lesson ? question.label : questionName(question.label)}
            </option>
          ))}
        </select>
      </label>
      {lesson && (
        <nav className="ako-chat-prompts" aria-label="Lesson teaching controls">
          <button
            type="button"
            disabled={lineIndex <= 0}
            onClick={() => onFocus(study.questions[lineIndex - 1].id)}
          >
            Back
          </button>
          <span className="ako-chat-hint">
            {lineIndex + 1} / {study.questions.length}
          </span>
          <button
            type="button"
            disabled={lineIndex >= study.questions.length - 1}
            onClick={() => onFocus(study.questions[lineIndex + 1].id)}
          >
            Continue
          </button>
          {lineIndex === study.questions.length - 1 && (
            <button
              type="button"
              disabled={sending}
              onClick={() => void send('Recap this lesson and ask me an application question.')}
            >
              Recap
            </button>
          )}
        </nav>
      )}
      <div
        className="ako-chat-log"
        ref={log}
        role="log"
        aria-live="polite"
        aria-label="Conversation"
      >
        {!turns.length && (
          <p className="ako-chat-hint">
            {lesson
              ? 'Let’s explore this line together. I’ll explain it, then give you a question to think about.'
              : focus
                ? 'I can see this question. Ask me about it. If I give you an answer, I’ll want to know why it’s right!'
                : `I’m looking at ${study.title}. Pick a question above, or press Ask Ako beside one.`}
          </p>
        )}
        {turns.map((turn, index) => (
          <div key={index} className={`ako-chat-turn ako-chat-${turn.role}`}>
            <span className="sr-only">{turn.role === 'ako' ? 'Ako: ' : 'You: '}</span>
            {turn.role === 'ako'
              ? akoReplyParagraphs(turn.text).map((paragraph, i) => <p key={i}>{paragraph}</p>)
              : turn.text}
          </div>
        ))}
        {sending && <p className="ako-chat-turn ako-chat-ako ako-chat-pending">Ako is thinking…</p>}
      </div>
      {(lesson || !turns.length) && !sending && (
        <details
          className="ako-chat-help"
          open={lesson ? undefined : true}
          onClick={(event) => {
            if (lesson && (event.target as HTMLElement).closest('button'))
              event.currentTarget.open = false;
          }}
        >
          {lesson && <summary>Examples, terms & more help</summary>}
          <div className="ako-chat-prompts">
            {prompts.map((prompt) => (
              <button type="button" key={prompt} onClick={() => void send(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
        </details>
      )}
      {why.pending && !sending && (
        <p className="ako-chat-why" role="status">
          {lesson
            ? 'Your turn — try an answer, or ask for another explanation.'
            : 'Ako is waiting for your why.'}
        </p>
      )}
      {advancing && (
        <div className="ako-chat-advance" role="status">
          Next sentence coming up.{' '}
          <button type="button" onClick={cancelAdvance}>
            Stay here
          </button>
        </div>
      )}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <form
        className="ako-chat-form"
        onSubmit={(event) => {
          event.preventDefault();
          void send(draft);
        }}
      >
        <textarea
          ref={input}
          rows={2}
          maxLength={AKO_LIMITS.message}
          aria-label={
            lesson ? 'Answer or ask Ako' : why.pending ? 'Explain why to Ako' : 'Message Ako'
          }
          placeholder={
            lesson ? 'Try an answer or ask for help…' : why.pending ? 'Explain why…' : 'Ask Ako…'
          }
          value={draft}
          onChange={(event) => {
            cancelAdvance();
            setDraft(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault();
              void send(draft);
            }
          }}
        />
        <button type="submit" disabled={sending || !draft.trim()}>
          Send
        </button>
      </form>
      <p className="ako-chat-note">
        Ako’s replies come from Akoizo and can be wrong. Don’t share personal information.
      </p>
    </section>
  );
}
