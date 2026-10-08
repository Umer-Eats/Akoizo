'use client';
import { useMemo, useState } from 'react';
import type { EventLessons, Lesson, LessonSim } from '@/lib/lessons';
import './lessons.css';

function SimView({ sim }: { sim: LessonSim }) {
  const [slider, setSlider] = useState('slider' in sim && sim.kind === 'slider' ? sim.defaultValue : 0);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState<string[]>([]);

  if (sim.kind === 'slider') {
    const active =
      [...sim.scenarios].sort((a, b) => Math.abs(a.value - slider) - Math.abs(b.value - slider))[0];
    return (
      <div className="lesson-sim">
        <h4>{sim.title}</h4>
        <p>{sim.instructions}</p>
        <label className="sim-slider">
          <span>
            {slider} {sim.unit}
          </span>
          <input
            type="range"
            min={sim.min}
            max={sim.max}
            step={sim.step}
            value={slider}
            onChange={(e) => setSlider(Number(e.target.value))}
            aria-label={sim.title}
          />
        </label>
        <div className="sim-outcome" role="status">
          <strong>{active.label}</strong>
          <p>{active.outcome}</p>
        </div>
      </div>
    );
  }
  if (sim.kind === 'flashcards') {
    return (
      <div className="lesson-sim">
        <h4>{sim.title}</h4>
        <p>{sim.instructions}</p>
        <div className="sim-cards">
          {sim.cards.map((c, i) => (
            <button
              key={i}
              className="sim-card"
              data-flipped={flipped === i}
              onClick={() => setFlipped(flipped === i ? null : i)}
            >
              <span>{flipped === i ? c.back : c.front}</span>
              <small>{flipped === i ? 'Answer — click to hide' : 'Prompt — click to reveal'}</small>
            </button>
          ))}
        </div>
      </div>
    );
  }
  if (sim.kind === 'scenario') {
    const step = sim.steps[Math.min(stepIdx, sim.steps.length - 1)];
    return (
      <div className="lesson-sim">
        <h4>{sim.title}</h4>
        <p>
          {sim.instructions} Step {stepIdx + 1} of {sim.steps.length}.
        </p>
        <p className="sim-prompt">{step.prompt}</p>
        <div className="sim-options">
          {step.options.map((opt, i) => (
            <button
              key={i}
              className="sim-option"
              data-picked={picked === i}
              data-correct={picked !== null && i === step.correct}
              onClick={() => setPicked(i)}
            >
              {opt}
            </button>
          ))}
        </div>
        {picked !== null && (
          <p className="sim-feedback" role="status">
            {picked === step.correct ? 'Correct. ' : 'Review. '}
            {step.feedback}
          </p>
        )}
        <div className="sim-nav">
          <button
            className="button button-small button-glass"
            disabled={stepIdx === 0}
            onClick={() => {
              setStepIdx((v) => Math.max(0, v - 1));
              setPicked(null);
            }}
          >
            Back
          </button>
          <button
            className="button button-small button-primary"
            disabled={stepIdx >= sim.steps.length - 1}
            onClick={() => {
              setStepIdx((v) => Math.min(sim.steps.length - 1, v + 1));
              setPicked(null);
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="lesson-sim">
      <h4>{sim.title}</h4>
      <p>{sim.instructions}</p>
      <ul className="sim-checklist">
        {sim.items.map((item) => (
          <li key={item.label}>
            <label>
              <input
                type="checkbox"
                checked={checked.includes(item.label)}
                onChange={() =>
                  setChecked((c) =>
                    c.includes(item.label) ? c.filter((x) => x !== item.label) : [...c, item.label],
                  )
                }
              />
              <span>
                <strong>{item.label}</strong>
                <small>{item.detail}</small>
              </span>
            </label>
          </li>
        ))}
      </ul>
      <p className="sim-progress" role="status">
        {checked.length} of {sim.items.length} completed
      </p>
    </div>
  );
}

function QuizView({ lesson }: { lesson: Lesson }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const storageKey = `akoizo-lesson-quiz:${lesson.id}`;
  const score = useMemo(() => {
    let earned = 0;
    lesson.practice.forEach((q) => {
      const given = (answers[q.id] ?? '').trim().toLowerCase();
      if (!given) return;
      if (q.type === 'mcq') {
        if (given === q.answer.trim().toLowerCase()) earned += 1;
      } else if (given.length > 2) {
        const keywords = q.answer.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 4);
        const hits = keywords.filter((w) => given.includes(w)).length;
        if (hits >= Math.min(2, keywords.length) || given.includes(q.answer.toLowerCase().slice(0, 12))) earned += 1;
      }
    });
    return earned;
  }, [answers, lesson]);

  return (
    <section className="lesson-quiz" aria-label={`Practice assignment for ${lesson.title}`}>
      <h3>Practice assignment — {lesson.title}</h3>
      <p>
        Answer every question, then submit to check your work. Explanations appear after
        submission. Short answers are self-checked by keyword match; compare yours to the
        model answer.
      </p>
      {lesson.practice.map((q, idx) => (
        <fieldset key={q.id} className="quiz-question" disabled={submitted}>
          <legend>
            Q{idx + 1}. {q.prompt}
          </legend>
          {q.type === 'mcq' && q.options ? (
            <div className="quiz-options">
              {q.options.map((opt) => (
                <label key={opt} className="quiz-option" data-selected={answers[q.id] === opt}>
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          ) : (
            <label className="quiz-written">
              <span>Your answer</span>
              <textarea
                rows={3}
                value={answers[q.id] ?? ''}
                onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                placeholder="Type your answer…"
              />
            </label>
          )}
          {submitted && (
            <div className="quiz-review">
              <p>
                <strong>Model answer:</strong> {q.answer}
              </p>
              <p>{q.explanation}</p>
            </div>
          )}
        </fieldset>
      ))}
      {!submitted ? (
        <button
          className="button button-primary"
          onClick={() => {
            setSubmitted(true);
            try {
              localStorage.setItem(storageKey, JSON.stringify({ answers, at: Date.now() }));
            } catch {
              /* progress is best-effort */
            }
          }}
        >
          Submit practice ({Object.keys(answers).length}/{lesson.practice.length} answered)
        </button>
      ) : (
        <div className="quiz-result" role="status" tabIndex={-1}>
          <p>
            <strong>
              Score: {score} / {lesson.practice.length}
            </strong>{' '}
            — review each explanation above.
          </p>
          <button
            className="button button-small button-glass"
            onClick={() => {
              setSubmitted(false);
              setAnswers({});
            }}
          >
            Try again
          </button>
        </div>
      )}
    </section>
  );
}

function LessonDetail({ lesson }: { lesson: Lesson }) {
  const [tab, setTab] = useState<'read' | 'video'>('read');
  return (
    <article className="lesson-detail">
      <div className="lesson-tabs" role="tablist" aria-label="Lesson format">
        <button aria-pressed={tab === 'read'} onClick={() => setTab('read')}>
          Text lesson
        </button>
        <button aria-pressed={tab === 'video'} onClick={() => setTab('video')}>
          Video lesson
        </button>
      </div>
      {tab === 'video' ? (
        lesson.videoUrl ? (
          <div className="lesson-video">
            <iframe src={lesson.videoUrl} title={`${lesson.title} video`} allowFullScreen />
          </div>
        ) : (
          <div className="lesson-video-placeholder">
            <h4>Video version — follow along with the text</h4>
            <p>
              No video link is attached to this lesson yet. Press play in your head: read each
              section below aloud, pause at every bold structure, and redraw the diagram from
              memory. When your instructor posts a walkthrough, it will embed here without
              changing the text, simulation, or practice below.
            </p>
          </div>
        )
      ) : null}
      <div className="lesson-objectives">
        <h3>What you will be able to do</h3>
        <ul>
          {lesson.objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </div>
      {lesson.sections.map((s) => (
        <section key={s.heading} className="lesson-section">
          <h3>{s.heading}</h3>
          {s.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      ))}
      <section className="lesson-terms">
        <h3>Key terms</h3>
        <dl>
          {lesson.keyTerms.map((k) => (
            <div key={k.term}>
              <dt>{k.term}</dt>
              <dd>{k.definition}</dd>
            </div>
          ))}
        </dl>
      </section>
      <SimView sim={lesson.simulation} />
      <QuizView lesson={lesson} />
    </article>
  );
}

export function LessonsView({ course }: { course: EventLessons }) {
  const [unitId, setUnitId] = useState(course.units[0]?.id ?? '');
  const [lessonId, setLessonId] = useState(course.units[0]?.lessonIds[0] ?? '');
  const unit = course.units.find((u) => u.id === unitId) ?? course.units[0];
  const lesson = course.lessons.find((l) => l.id === lessonId) ?? course.lessons[0];
  return (
    <section className="lessons-workspace" aria-label={`${course.eventName} lessons`}>
      <div className="lessons-intro">
        <p className="eyebrow">DIVISION C · PINK TIMESLOT · {course.instructor.toUpperCase()}</p>
        <h2>{course.eventName} lessons</h2>
        <p>{course.intro}</p>
      </div>
      <div className="lessons-units" role="group" aria-label="Unit sections">
        {course.units.map((u) => (
          <button
            key={u.id}
            className="unit-button"
            aria-pressed={unitId === u.id}
            onClick={() => {
              setUnitId(u.id);
              setLessonId(u.lessonIds[0]);
            }}
          >
            {u.title}
          </button>
        ))}
      </div>
      {unit && (
        <div className="lessons-unit-detail">
          <h3>{unit.title}</h3>
          <p>{unit.description}</p>
          <div className="lessons-list" role="group" aria-label="Lessons in this unit">
            {unit.lessonIds.map((id) => {
              const l = course.lessons.find((x) => x.id === id)!;
              return (
                <button
                  key={id}
                  className="lesson-button"
                  aria-pressed={lessonId === id}
                  onClick={() => setLessonId(id)}
                >
                  <span>{l.title}</span>
                  <small>
                    {l.durationMin} min · {l.kind} · simulation + practice
                  </small>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {lesson && <LessonDetail key={lesson.id} lesson={lesson} />}
    </section>
  );
}
