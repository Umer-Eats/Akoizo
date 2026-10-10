'use client';
import { useEffect, useRef, useState } from 'react';
import { BookOpen, Check, ChevronLeft, ChevronRight, FlaskConical, RotateCcw } from 'lucide-react';
import type { EventLessons, Lesson, LessonSim } from '@/lib/lessons';
import { calculateModel, modelControls, modelDefaults } from '@/lib/lesson-models';
import {
  lessonStorageKey,
  practiceComplete,
  readAttempt,
  scorePractice,
  type LessonAttempt,
} from '@/lib/lesson-practice';
import { ChoiceOptions } from './choice-options';
import { ModelDiagram } from './lesson-diagrams';
import { LessonSectionVisuals } from './lesson-atlas';
import { EvidenceWorkbench } from './evidence-workbench';
import { ExperimentControls, TrialComparison, type LabTrial } from './lesson-experiments';
import { SubjectExplorer } from './subject-explorer';
import { LessonReferenceFigure } from './lesson-reference-figure';
import { lessonReferenceFigures } from '@/lib/lesson-reference-figures';
import { slotForEvent } from '@/lib/event-slots';
import './lessons.css';

function ModelLab({ sim }: { sim: Extract<LessonSim, { kind: 'model' }> }) {
  const [values, setValues] = useState(() => modelDefaults(sim.model));
  const [trials, setTrials] = useState<LabTrial[]>([]);
  const [experimentKey, setExperimentKey] = useState(0);
  const result = calculateModel(sim.model, values);
  const maxBar = Math.max(1, ...result.bars.map((bar) => bar.value));
  const format = (value: number) =>
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 3 }).format(value);
  return (
    <>
      <div className="lab-challenge">
        <strong>Investigate</strong>
        <p>{sim.challenge}</p>
      </div>
      <div className="lab-workbench">
        <ModelDiagram model={sim.model} values={values} />
        <div className="lab-controls">
          {modelControls[sim.model].map((control) => (
            <label key={control.key}>
              <span>{control.label}</span>
              <output>
                {format(values[control.key])} {control.unit}
              </output>
              <input
                type="range"
                min={control.min}
                max={control.max}
                step={control.step}
                value={values[control.key]}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [control.key]: Number(event.target.value),
                  }))
                }
                aria-label={control.label}
              />
            </label>
          ))}
        </div>
        <div className="lab-readout" aria-live="polite" aria-atomic="true">
          <div className="lab-metrics">
            {result.metrics.map((metric) => (
              <div key={metric.label}>
                <span>{metric.label}</span>
                <strong>
                  {format(metric.value)} <small>{metric.unit}</small>
                </strong>
              </div>
            ))}
          </div>
          <div className="lab-bars" aria-label="Output comparison">
            {result.bars.map((bar) => (
              <div key={bar.label}>
                <span>
                  {bar.label}: {format(bar.value)}
                </span>
                <div className="lab-bar-track">
                  <div style={{ width: `${(bar.value / maxBar) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ExperimentControls
        key={experimentKey}
        model={sim.model}
        values={values}
        setValues={setValues}
      />
      <p className="lab-equation">{result.equation}</p>
      <p className="lab-assumptions">
        <strong>What the model means:</strong> {result.interpretation}
      </p>
      <div className="lesson-actions">
        <button
          className="button button-small button-glass"
          disabled={trials.length >= 6}
          onClick={() =>
            setTrials((current) => [
              ...current,
              {
                settings: modelControls[sim.model]
                  .map((c) => `${c.label}: ${format(values[c.key])} ${c.unit}`)
                  .join('; '),
                result: result.metrics
                  .map((m) => `${m.label}: ${format(m.value)} ${m.unit}`)
                  .join('; '),
                metrics: result.metrics,
              },
            ])
          }
        >
          Record trial ({trials.length}/6)
        </button>
        <button
          className="button button-small button-glass"
          onClick={() => {
            setValues(modelDefaults(sim.model));
            setTrials([]);
            setExperimentKey((current) => current + 1);
          }}
        >
          <RotateCcw size={15} aria-hidden="true" /> Reset experiment
        </button>
      </div>
      {trials.length > 0 && (
        <div className="lab-notebook">
          <TrialComparison trials={trials} model={sim.model} />
          <h4>Trial notebook</h4>
          <p>Compare your trials while this lesson is open.</p>
          <ol>
            {trials.map((trial, i) => (
              <li key={i}>
                <strong>Trial {i + 1}</strong>
                <p>{trial.settings}</p>
                <p>{trial.result}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
      <details className="lesson-disclosure">
        <summary>Explain the result</summary>
        <p>{sim.takeaway}</p>
      </details>
    </>
  );
}

function InvestigationLab({
  sim,
  lessonId,
}: {
  sim: Extract<LessonSim, { kind: 'investigation' }>;
  lessonId: string;
}) {
  const [observed, setObserved] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [restartKey, setRestartKey] = useState(0);
  return (
    <>
      <EvidenceWorkbench
        key={restartKey}
        lessonId={lessonId}
        sim={sim}
        observed={observed}
        onObserve={(i) =>
          setObserved((current) => (current.includes(i) ? current : [...current, i]))
        }
      />
      <p className="lab-observation-count">
        {observed.length} of {sim.observations.length} observations collected
      </p>
      <fieldset className="lab-conclusion" disabled={observed.length !== sim.observations.length}>
        <legend>{sim.question}</legend>
        {observed.length !== sim.observations.length && (
          <p>Collect all observations to make your conclusion.</p>
        )}
        <div className="sim-options">
          {sim.options.map((option, i) => (
            <button
              key={option}
              className="sim-option"
              aria-pressed={picked === i}
              onClick={() => setPicked(i)}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>
      {picked !== null && (
        <div className="sim-feedback" role="status">
          <strong>
            {picked === sim.correct ? 'Supported by the evidence.' : 'Revisit the evidence.'}
          </strong>
          <p>{sim.explanation}</p>
        </div>
      )}
      <button
        className="button button-small button-glass"
        onClick={() => {
          setObserved([]);
          setPicked(null);
          setRestartKey((current) => current + 1);
        }}
      >
        <RotateCcw size={15} aria-hidden="true" /> Restart investigation
      </button>
    </>
  );
}

function SimView({ sim, lessonId }: { sim: LessonSim; lessonId: string }) {
  return (
    <section id="lesson-lab" className="lesson-sim" aria-labelledby="lesson-lab-title">
      <p className="eyebrow">
        <FlaskConical size={16} aria-hidden="true" /> INTERACTIVE LAB
      </p>
      <h3 id="lesson-lab-title">{sim.title}</h3>
      <p>{sim.instructions}</p>
      {sim.kind === 'model' ? (
        <ModelLab sim={sim} />
      ) : sim.kind === 'investigation' ? (
        <InvestigationLab sim={sim} lessonId={lessonId} />
      ) : (
        <SubjectExplorer sim={sim} />
      )}
    </section>
  );
}

function QuizView({
  lesson,
  attempt,
  onChange,
}: {
  lesson: Lesson;
  attempt: LessonAttempt;
  onChange: (attempt: LessonAttempt) => void;
}) {
  const resultRef = useRef<HTMLDivElement>(null);
  const score = scorePractice(lesson.practice, attempt.answers);
  const complete = practiceComplete(attempt, lesson.practice);
  const updateAnswer = (id: string, answer: string) =>
    onChange({ ...attempt, answers: { ...attempt.answers, [id]: answer } });
  return (
    <section id="lesson-practice" className="lesson-quiz" aria-labelledby="lesson-practice-title">
      <p className="eyebrow">APPLY WHAT YOU LEARNED</p>
      <h3 id="lesson-practice-title">Practice assignment</h3>
      <p>
        Answer all {lesson.practice.length} questions. Multiple-choice responses are checked
        automatically. For written responses, compare your reasoning with the model answer, then
        mark each review complete.
      </p>
      {lesson.practice.map((q, index) => (
        <div key={q.id} className="quiz-question">
          <fieldset disabled={attempt.submitted}>
            <legend>
              <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
              {q.prompt}
              <small>
                {q.type === 'short'
                  ? 'Written · self-review'
                  : `${q.points ?? 1} ${(q.points ?? 1) === 1 ? 'point' : 'points'}`}
              </small>
            </legend>
            {q.type === 'mcq' && q.options ? (
              <ChoiceOptions
                name={q.id}
                label={q.prompt}
                options={q.options.map((option) => ({ id: option, text: option }))}
                value={attempt.answers[q.id] ?? ''}
                correctOptions={attempt.submitted ? [q.answer] : []}
                onChange={(answer) => updateAnswer(q.id, answer)}
              />
            ) : (
              <label className="quiz-written">
                <span>Your answer</span>
                <textarea
                  rows={4}
                  maxLength={10000}
                  value={attempt.answers[q.id] ?? ''}
                  onChange={(event) => updateAnswer(q.id, event.target.value)}
                  placeholder="Explain the mechanism, show calculations, and include units where needed."
                />
              </label>
            )}
          </fieldset>
          {attempt.submitted && (
            <div className="quiz-review">
              {q.type === 'mcq' && (
                <strong className="quiz-verdict">
                  {attempt.answers[q.id] === q.answer ? 'Correct' : 'Review this answer'}
                </strong>
              )}
              <p>
                <strong>Model answer:</strong> {q.answer}
              </p>
              <p>{q.explanation}</p>
              {q.type === 'short' && (
                <label className="quiz-self-review">
                  <input
                    type="checkbox"
                    checked={attempt.reviewed.includes(q.id)}
                    onChange={(event) =>
                      onChange({
                        ...attempt,
                        reviewed: event.target.checked
                          ? [...attempt.reviewed, q.id]
                          : attempt.reviewed.filter((id) => id !== q.id),
                      })
                    }
                  />
                  I compared my reasoning with this model answer.
                </label>
              )}
            </div>
          )}
        </div>
      ))}
      {!attempt.submitted ? (
        <div className="lesson-actions">
          <button
            className="button button-primary"
            disabled={score.answered !== lesson.practice.length}
            onClick={() => {
              onChange({ ...attempt, submitted: true });
              requestAnimationFrame(() => resultRef.current?.focus());
            }}
          >
            Check my answers
          </button>
          <span aria-live="polite">
            {score.answered}/{lesson.practice.length} answered
          </span>
        </div>
      ) : (
        <div ref={resultRef} className="quiz-result" role="status" tabIndex={-1}>
          <strong>
            Multiple choice: {score.earned} / {score.possible} points
          </strong>
          <p>
            Written responses reviewed: {attempt.reviewed.length} / {score.written}.{' '}
            {complete
              ? 'Practice complete. Revisit any answer you want to strengthen.'
              : 'Compare and review every written response above to complete this practice.'}
          </p>
          <button
            className="button button-small button-glass"
            onClick={() => onChange({ ...attempt, submitted: false, reviewed: [] })}
          >
            Revise answers
          </button>
        </div>
      )}
    </section>
  );
}

function LessonDetail({
  lesson,
  attempt,
  onChange,
}: {
  lesson: Lesson;
  attempt: LessonAttempt;
  onChange: (attempt: LessonAttempt) => void;
}) {
  return (
    <article className="lesson-detail" aria-labelledby="current-lesson-title">
      <header className="lesson-title-block">
        <p className="eyebrow">
          <BookOpen size={16} aria-hidden="true" /> TEXT LESSON · {lesson.durationMin} MIN
          {lesson.extension ? ' · EXTENSION' : ''}
        </p>
        <h2 id="current-lesson-title" tabIndex={-1}>
          {lesson.title}
        </h2>
        <nav className="lesson-jumps" aria-label="Jump within this lesson">
          <a href="#lesson-reading">Read</a>
          <a href="#lesson-example">Worked example</a>
          <a href="#lesson-lab">Interactive lab</a>
          <a href="#lesson-practice">Practice assignment</a>
        </nav>
      </header>
      <section className="lesson-objectives">
        <h3>By the end of this lesson</h3>
        <ul>
          {lesson.objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </section>
      <div id="lesson-reading" className="lesson-reading">
        {lesson.sections.map((section, index) => (
          <section key={section.heading} className="lesson-section">
            <p className="lesson-section-number">{String(index + 1).padStart(2, '0')}</p>
            <h3>{section.heading}</h3>
            {section.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <LessonSectionVisuals lesson={lesson} index={index} />
            {(
              lesson.referenceFigures ??
              lessonReferenceFigures.filter((figure) => figure.lessonId === lesson.id)
            )
              .filter((figure) => figure.section === index)
              .map((figure) => (
                <LessonReferenceFigure key={figure.src} figure={figure} />
              ))}
            {index === 3 && lesson.simulation.kind === 'explorer' && (
              <SubjectExplorer sim={lesson.simulation} preview />
            )}
          </section>
        ))}
      </div>
      {lesson.workedExample && (
        <section id="lesson-example" className="lesson-example">
          <p className="eyebrow">WORKED EXAMPLE</p>
          <h3>{lesson.workedExample.title}</h3>
          <p>{lesson.workedExample.problem}</p>
          <details className="lesson-disclosure">
            <summary>Show the step-by-step solution</summary>
            <ol>
              {lesson.workedExample.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="example-conclusion">{lesson.workedExample.conclusion}</p>
          </details>
        </section>
      )}
      <details className="lesson-terms lesson-disclosure">
        <summary>Key terms · {lesson.keyTerms.length}</summary>
        <dl>
          {lesson.keyTerms.map((term) => (
            <div key={term.term}>
              <dt>{term.term}</dt>
              <dd>{term.definition}</dd>
            </div>
          ))}
        </dl>
      </details>
      <SimView sim={lesson.simulation} lessonId={lesson.id} />
      <QuizView lesson={lesson} attempt={attempt} onChange={onChange} />
    </article>
  );
}

const emptyAttempt: LessonAttempt = { answers: {}, submitted: false, reviewed: [] };
export function LessonsView({ course, studentId }: { course: EventLessons; studentId: string }) {
  const ordered = course.units
    .flatMap((unit) => unit.lessonIds)
    .map((id) => course.lessons.find((lesson) => lesson.id === id)!);
  const [lessonId, setLessonId] = useState(ordered[0].id);
  const [attempts, setAttempts] = useState<Record<string, LessonAttempt>>({});
  const [loaded, setLoaded] = useState(false);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const storageKey = lessonStorageKey(studentId, course.eventId);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved && typeof saved === 'object') {
          if (course.lessons.some((lesson) => lesson.id === saved.lessonId))
            setLessonId(saved.lessonId);
          setAttempts(
            Object.fromEntries(
              course.lessons.map((lesson) => [
                lesson.id,
                readAttempt(saved.attempts?.[lesson.id], lesson.practice),
              ]),
            ),
          );
        }
      }
    } catch {
      setStorageUnavailable(true);
    }
    setLoaded(true);
  }, [course, storageKey]);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ lessonId, attempts }));
    } catch {
      setStorageUnavailable(true);
    }
  }, [loaded, storageKey, lessonId, attempts]);
  const lesson = course.lessons.find((item) => item.id === lessonId) ?? ordered[0];
  const unit = course.units.find((item) => item.id === lesson.unitId)!;
  const currentIndex = ordered.findIndex((item) => item.id === lesson.id);
  const completed = course.lessons.filter((item) =>
    practiceComplete(attempts[item.id], item.practice),
  ).length;
  function selectLesson(id: string, focus = false) {
    setLessonId(id);
    if (focus)
      requestAnimationFrame(() => {
        const heading = document.getElementById('current-lesson-title');
        heading?.focus({ preventScroll: true });
        heading?.scrollIntoView({ block: 'start', behavior: 'instant' });
      });
  }
  return (
    <section
      className="lessons-workspace"
      data-lesson-slot={slotForEvent(course.eventId)?.color}
      aria-label={`${course.eventName} lessons`}
    >
      <div className="lessons-intro">
        <p className="eyebrow">
          <span className="lesson-slot-dot" /> DIVISION C ·{' '}
          {slotForEvent(course.eventId)?.label.toUpperCase()} TIMESLOT
        </p>
        <h2>{course.eventName}</h2>
        <p>{course.intro}</p>
        <div className="course-facts">
          <span>{course.units.length} units</span>
          <span>{course.lessons.length} in-depth lessons</span>
          <span>Interactive labs + practice</span>
        </div>
        <div className="course-progress">
          <label htmlFor="course-progress">
            {completed} of {course.lessons.length} practices complete
          </label>
          <progress id="course-progress" value={completed} max={course.lessons.length} />
        </div>
        <p className="lesson-save-note" role="status">
          {storageUnavailable
            ? 'Browser storage is unavailable. You can keep studying, but this session’s progress may not survive a reload.'
            : 'Answers and progress are saved for your account in this browser.'}
        </p>
      </div>
      {!loaded ? (
        <p role="status">Loading your lesson progress…</p>
      ) : (
        <>
          <div className="lessons-navigation">
            <div className="lessons-nav-label">
              <h3>Choose a unit</h3>
              <span>{course.units.length} sections</span>
            </div>
            <div className="lessons-units" role="group" aria-label="Unit sections">
              {course.units.map((item, i) => {
                const count = item.lessonIds.filter((id) =>
                  practiceComplete(attempts[id], course.lessons.find((l) => l.id === id)!.practice),
                ).length;
                return (
                  <button
                    key={item.id}
                    className="unit-button"
                    aria-pressed={unit.id === item.id}
                    onClick={() => selectLesson(item.lessonIds[0])}
                  >
                    <span className="unit-number">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      {item.title.replace(/^Unit \d+:\s*/, '')}
                      <small>
                        {count}/{item.lessonIds.length} practices complete
                      </small>
                    </span>
                    {count === item.lessonIds.length && <Check size={16} aria-label="Complete" />}
                  </button>
                );
              })}
            </div>
          </div>
          <section className="lessons-unit-detail" aria-label="Selected unit">
            <p className="eyebrow">YOUR CURRENT UNIT</p>
            <h3>{unit.title}</h3>
            <p>{unit.description}</p>
            <div className="lessons-list" role="group" aria-label="Lessons in this unit">
              {unit.lessonIds.map((id, i) => {
                const item = course.lessons.find((candidate) => candidate.id === id)!;
                const done = practiceComplete(attempts[id], item.practice);
                return (
                  <button
                    key={id}
                    className="lesson-button"
                    aria-pressed={lesson.id === id}
                    onClick={() => selectLesson(id, true)}
                  >
                    <span className="lesson-index">
                      {done ? (
                        <Check size={18} aria-label="Practice complete" />
                      ) : (
                        String(i + 1).padStart(2, '0')
                      )}
                    </span>
                    <span>
                      {item.title}
                      <small>
                        {item.durationMin} min · Text + interactive lab · {item.practice.length}{' '}
                        questions{item.extension ? ' · Extension' : ''}
                      </small>
                    </span>
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </section>
          <LessonDetail
            key={lesson.id}
            lesson={lesson}
            attempt={attempts[lesson.id] ?? emptyAttempt}
            onChange={(attempt) => setAttempts((current) => ({ ...current, [lesson.id]: attempt }))}
          />
          <nav className="lesson-pagination" aria-label="Course lesson navigation">
            <button
              className="button button-glass"
              disabled={currentIndex === 0}
              onClick={() => selectLesson(ordered[currentIndex - 1].id, true)}
            >
              <ChevronLeft size={16} aria-hidden="true" /> Previous lesson
            </button>
            <span>
              Lesson {currentIndex + 1} of {ordered.length}
            </span>
            <button
              className="button button-primary"
              disabled={currentIndex === ordered.length - 1}
              onClick={() => selectLesson(ordered[currentIndex + 1].id, true)}
            >
              Next lesson <ChevronRight size={16} aria-hidden="true" />
            </button>
          </nav>
        </>
      )}
      <details className="lesson-disclosure course-sources">
        <summary>Course sources and scope</summary>
        <p>
          Organized from the supplied {course.syllabus}. Expanded explanations, worked examples, and
          virtual exercises support that syllabus. This course follows those topics; consult the
          current tournament rules for competition scope.
        </p>
        <ul>
          {course.references.map((reference) => (
            <li key={reference.url}>
              <a href={reference.url} target="_blank" rel="noreferrer">
                {reference.title} ↗
              </a>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
