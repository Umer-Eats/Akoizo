'use client';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { BookOpen, Check, ChevronLeft, ChevronRight, FlaskConical, RotateCcw } from 'lucide-react';
import type { EventLessons, Lesson, LessonSim } from '@/lib/lessons';
import type { WorkRecord } from '@/lib/domain';
import { calculateModel, modelControls, modelDefaults } from '@/lib/lesson-models';
import { modelGuides } from '@/lib/lesson-model-guides';
import {
  checkChoice,
  checkpointProgress,
  emptyAttempt,
  lessonStorageKey,
  readAttempt,
  type LessonAttempt,
} from '@/lib/lesson-practice';
import type {
  CheckedAnswer,
  CheckResponse,
  LessonPart,
  LessonPartRecord,
} from '@/lib/lesson-checkpoint-service';
import { useAuth, authMessage } from './auth-context';
import { CheckpointView, type CheckOutcome } from './lesson-checkpoint';
import { ModelDiagram } from './lesson-diagrams';
import { ComparisonAtlas, LessonSectionVisuals, lessonComparison } from './lesson-atlas';
import { EvidenceWorkbench } from './evidence-workbench';
import { ExperimentControls, TrialComparison, type LabTrial } from './lesson-experiments';
import { SubjectExplorer } from './subject-explorer';
import { LessonReferenceFigure } from './lesson-reference-figure';
import { lessonReferenceFigures } from '@/lib/lesson-reference-figures';
import { slotForEvent } from '@/lib/event-slots';
import { extrasFor, topicLabs } from '@/lib/extras';
import { LessonActivities, InlineCheck, practiceActivities } from './lesson-activities';
import { TopicLabView } from './topic-lab';
import {
  AkoReading,
  KeyTermsGrid,
  LessonToc,
  SectionContent,
  StageFooter,
  StageNav,
  WorkedExampleSteps,
  useScrollSpy,
  type LessonStage,
} from './lesson-format';
import { formatLesson, lessonBigIdea } from '@/lib/lesson-format';
import './lesson-format.css';
import { PhetSim } from './phet-sim';
import {
  LabGoals,
  LabReportProvider,
  LabStep,
  LabTask,
  useLabReport,
  useLatched,
  type LabStatus,
} from './lab-progress';
import './lessons.css';
import './lesson-motion.css';
import { akoLessonLines, akoLessonPlan } from '@/lib/ako-lesson';
import { askAkoAbout, setAkoStudy } from '@/lib/ako-study';
import { useSettings } from './providers';

function ModelLab({ sim }: { sim: Extract<LessonSim, { kind: 'model' }> }) {
  const [values, setValues] = useState(() => modelDefaults(sim.model));
  const [trials, setTrials] = useState<LabTrial[]>([]);
  const [experimentKey, setExperimentKey] = useState(0);
  const [ran, setRan] = useState(false);
  // The first scenario prediction is what counts; a reset lets the student practise again.
  const [firstTry, setFirstTry] = useState<boolean | null>(null);
  const [explained, setExplained] = useState(false);
  const result = calculateModel(sim.model, values);
  const maxBar = Math.max(1, ...result.bars.map((bar) => bar.value));
  const format = (value: number) =>
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 3 }).format(value);
  const settings = modelControls[sim.model]
    .map((c) => `${c.label}: ${format(values[c.key])} ${c.unit}`)
    .join('; ');
  const [predicted, recorded, compared, understood] = useLatched(
    [ran, trials.length > 0, new Set(trials.map((t) => t.settings)).size > 1, explained],
    experimentKey,
  );
  const goals = [
    { label: 'Predict a scenario, then run it', done: predicted },
    { label: 'Record a baseline trial', done: recorded },
    { label: 'Change an input and record another trial', done: compared },
    { label: 'Compare your trials with the explanation', done: understood },
  ];
  useLabReport(goals, firstTry);
  return (
    <div className="lab-guided">
      <LabTask>{sim.challenge}</LabTask>
      <LabGoals goals={goals} />
      <LabStep
        n={1}
        title="Predict and run a scenario"
        hint="Pick a scenario, predict how the output will change, then run it. Your first prediction is recorded."
        done={predicted}
      >
        <ExperimentControls
          key={experimentKey}
          model={sim.model}
          values={values}
          setValues={setValues}
          onRun={(correct) => {
            setRan(true);
            setFirstTry((current) => current ?? correct);
          }}
        />
      </LabStep>
      <LabStep
        n={2}
        title="Experiment"
        hint="Record a baseline, then move one slider at a time and record each new trial."
        done={recorded && compared}
      >
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
        <div className="lab-actions">
          <button
            type="button"
            className="button button-small button-primary"
            disabled={trials.length >= 6 || trials.at(-1)?.settings === settings}
            onClick={() =>
              setTrials((current) => [
                ...current,
                {
                  settings,
                  result: result.metrics
                    .map((m) => `${m.label}: ${format(m.value)} ${m.unit}`)
                    .join('; '),
                  metrics: result.metrics,
                },
              ])
            }
          >
            {trials.length ? 'Record this trial' : 'Record baseline'} ({trials.length}/6)
          </button>
          <button
            type="button"
            className="button button-small button-glass"
            onClick={() => {
              setValues(modelDefaults(sim.model));
              setTrials([]);
              setRan(false);
              setExplained(false);
              setExperimentKey((current) => current + 1);
            }}
          >
            <RotateCcw size={15} aria-hidden="true" /> Reset experiment
          </button>
          {trials.at(-1)?.settings === settings && (
            <span>Change a slider before recording another trial.</span>
          )}
        </div>
        {trials.length > 0 && (
          <div className="lab-notebook">
            <TrialComparison trials={trials} model={sim.model} />
            <ol className="lab-trials">
              {trials.map((trial, i) => (
                <li key={i}>
                  <strong>{i ? `Trial ${i + 1}` : 'Trial 1 · baseline'}</strong>
                  <p>{trial.settings}</p>
                  <p>→ {trial.result}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </LabStep>
      <LabStep
        n={3}
        title="Explain"
        hint="Use your trials to say what changed and why, then compare with the model's explanation."
        done={understood}
      >
        <dl className="model-reading-guide">
          <div>
            <dt>Read the diagram</dt>
            <dd>{modelGuides[sim.model].observe}</dd>
          </div>
          <div>
            <dt>Design a comparison</dt>
            <dd>{modelGuides[sim.model].compare}</dd>
          </div>
          <div>
            <dt>Limits of this model</dt>
            <dd>{modelGuides[sim.model].limit}</dd>
          </div>
        </dl>
        <p className="lab-equation">{result.equation}</p>
        <div className="lab-actions">
          <button
            type="button"
            className="button button-small button-primary"
            disabled={explained || trials.length < 2}
            onClick={() => setExplained(true)}
          >
            Show the explanation
          </button>
          {!explained && trials.length < 2 && <span>Record at least two trials first.</span>}
        </div>
        {explained && (
          <div className="lab-reveal" role="status">
            <strong>What the model shows</strong>
            <p>{sim.takeaway}</p>
            <p>
              <strong>Model assumptions:</strong> {result.interpretation}
            </p>
          </div>
        )}
      </LabStep>
    </div>
  );
}

function InvestigationLab({
  sim,
  lessonId,
  pathway,
}: {
  sim: Extract<LessonSim, { kind: 'investigation' }>;
  lessonId: string;
  pathway?: Lesson['visual'];
}) {
  const [observed, setObserved] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [restartKey, setRestartKey] = useState(0);
  // The first conclusion chosen is what counts; later picks are for practice.
  const [firstTry, setFirstTry] = useState<boolean | null>(null);
  const allObserved = observed.length === sim.observations.length;
  const [collected, concluded] = useLatched([allObserved, picked !== null], restartKey);
  const goals = [
    { label: `Collect all ${sim.observations.length} observations`, done: collected },
    { label: 'Choose the conclusion the evidence supports', done: concluded },
  ];
  useLabReport(goals, firstTry);
  return (
    <div className="lab-guided">
      <LabTask>{sim.question}</LabTask>
      <LabGoals goals={goals} />
      <LabStep
        n={1}
        title="Observe"
        hint="Run each test or examine each sample. Every observation is logged below."
        done={collected}
      >
        <EvidenceWorkbench
          key={restartKey}
          lessonId={lessonId}
          sim={sim}
          reference={pathway}
          observed={observed}
          onObserve={(i) =>
            setObserved((current) => (current.includes(i) ? current : [...current, i]))
          }
        />
        <p className="lab-observation-count">
          {observed.length} of {sim.observations.length} observations collected
        </p>
      </LabStep>
      <LabStep
        n={2}
        title="Conclude"
        hint="Choose the conclusion your observations support. Your first choice is recorded."
        done={concluded}
      >
        <fieldset className="lab-conclusion" disabled={!allObserved}>
          <legend>{sim.question}</legend>
          {!allObserved && <p>Collect all observations to make your conclusion.</p>}
          <div className="sim-options">
            {sim.options.map((option, i) => (
              <button
                key={option}
                type="button"
                className="sim-option"
                aria-pressed={picked === i}
                onClick={() => {
                  setPicked(i);
                  setFirstTry((current) => current ?? i === sim.correct);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
        {picked !== null && (
          <div className="lab-reveal" role="status" data-correct={picked === sim.correct}>
            <strong>
              {picked === sim.correct ? 'Supported by the evidence.' : 'Revisit the evidence.'}
            </strong>
            <p>{sim.explanation}</p>
          </div>
        )}
        <div className="lab-actions">
          <button
            type="button"
            className="button button-small button-glass"
            onClick={() => {
              setObserved([]);
              setPicked(null);
              setRestartKey((current) => current + 1);
            }}
          >
            <RotateCcw size={15} aria-hidden="true" /> Restart investigation
          </button>
        </div>
      </LabStep>
    </div>
  );
}

function SimView({
  sim,
  lessonId,
  pathway,
}: {
  sim: LessonSim;
  lessonId: string;
  pathway?: Lesson['visual'];
}) {
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
        <InvestigationLab sim={sim} lessonId={lessonId} pathway={pathway} />
      ) : (
        <SubjectExplorer sim={sim} />
      )}
    </section>
  );
}

type LessonRecord = { score: number; maxScore: number };
type LabEntry = { id: string; kind: string; title: string; blurb: string; render: () => ReactNode };

function LabsStage({
  entries,
  selected,
  onSelect,
  onComplete,
}: {
  entries: LabEntry[];
  selected: string;
  onSelect: (id: string) => void;
  /** Called once every lab is complete, with goals reached plus first-try answers. */
  onComplete: (score: number, maxScore: number) => void;
}) {
  const [status, setStatus] = useState<Record<string, LabStatus>>({});
  const ids = entries.map((entry) => entry.id).join('|');
  const reporters = useMemo(
    () =>
      Object.fromEntries(
        ids.split('|').map((id) => [
          id,
          (next: LabStatus) =>
            setStatus((current) => {
              const old = current[id];
              return old &&
                old.score === next.score &&
                old.maxScore === next.maxScore &&
                old.done === next.done
                ? current
                : { ...current, [id]: next };
            }),
        ]),
      ),
    [ids],
  );
  const finished = entries.filter((entry) => status[entry.id]?.done).length;
  const complete = entries.length > 0 && finished === entries.length;
  const score = entries.reduce((sum, entry) => sum + (status[entry.id]?.score ?? 0), 0);
  const maxScore = entries.reduce((sum, entry) => sum + (status[entry.id]?.maxScore ?? 0), 0);
  const reported = useRef(false);
  useEffect(() => {
    if (!complete || reported.current) return;
    reported.current = true;
    onComplete(score, maxScore);
  }, [complete, score, maxScore, onComplete]);
  return (
    <div className="lf-labs">
      <div className="lf-labs-intro">
        <p className="eyebrow">
          <FlaskConical size={16} aria-hidden="true" /> {entries.length}{' '}
          {entries.length === 1 ? 'LAB' : 'LABS'} FOR THIS LESSON
        </p>
        <h3>Test the ideas</h3>
        <p>
          Each lab walks you through predicting, experimenting, and explaining. Reach every goal to
          finish it. Your goals and first-try predictions are saved for your instructor once every
          lab is complete.
        </p>
        <p className="la-progress" role="status">
          {complete
            ? `Labs complete · ${score}/${maxScore} goals and first-try answers`
            : `${finished} of ${entries.length} ${entries.length === 1 ? 'lab' : 'labs'} complete`}
        </p>
      </div>
      {entries.length > 1 && (
        <div className="lf-lab-picker" role="tablist" aria-label="Choose a lab">
          {entries.map((entry, i) => {
            const lab = status[entry.id];
            return (
              <button
                key={entry.id}
                id={`lab-tab-${entry.id}`}
                type="button"
                role="tab"
                aria-selected={selected === entry.id}
                aria-controls={`lab-panel-${entry.id}`}
                data-done={lab?.done || undefined}
                onClick={() => onSelect(entry.id)}
              >
                <span className="lf-lab-kind">
                  {i + 1} · {entry.kind}
                  <span className="lf-lab-status">
                    {lab?.done ? (
                      <>
                        <Check size={12} strokeWidth={3} aria-hidden="true" /> Complete
                      </>
                    ) : lab ? (
                      `${lab.score}/${lab.maxScore}`
                    ) : (
                      'Not started'
                    )}
                  </span>
                </span>
                <strong>{entry.title}</strong>
                <small>{entry.blurb}</small>
              </button>
            );
          })}
        </div>
      )}
      {entries.map((entry) => (
        <div
          key={entry.id}
          id={`lab-panel-${entry.id}`}
          className="lf-lab-panel"
          role={entries.length > 1 ? 'tabpanel' : undefined}
          aria-labelledby={entries.length > 1 ? `lab-tab-${entry.id}` : undefined}
          hidden={selected !== entry.id}
        >
          <LabReportProvider value={reporters[entry.id]}>{entry.render()}</LabReportProvider>
        </div>
      ))}
    </div>
  );
}

function LessonDetail({
  lesson,
  eventId,
  unitNumber,
  attempt,
  completed,
  parts,
  onAnswer,
  onCheck,
  onRetake,
  onPart,
}: {
  lesson: Lesson;
  eventId: string;
  unitNumber: number;
  attempt: LessonAttempt;
  /** Recorded as complete for the instructor (from any device). */
  completed: boolean;
  /** Stages already recorded for the instructor. */
  parts: LessonPart[];
  onAnswer: (questionId: string, answer: string) => void;
  onCheck: (questionId: string, answer: string, selfMark?: boolean) => Promise<CheckOutcome>;
  onRetake: () => Promise<void>;
  onPart: (part: Exclude<LessonPart, 'checkpoint'>, score?: number, maxScore?: number) => void;
}) {
  const { ako, updateAko } = useSettings();
  const [teachingLine, setTeachingLine] = useState('');
  const lastTeachingLine = useRef('');
  const stagesRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<LessonStage>('learn');
  const lines = useMemo(() => akoLessonLines(lesson), [lesson]);
  const plan = useMemo(() => akoLessonPlan(lesson), [lesson]);
  const formatted = useMemo(() => formatLesson(lesson, lines), [lesson, lines]);
  const activeStep = plan.find((step) => step.id === teachingLine);
  useEffect(() => {
    setAkoStudy({
      testId: `lesson:${eventId}:${lesson.id}`,
      title: lesson.title,
      questions: plan,
      answerFor: () => '',
      lesson: {
        eventId,
        lessonId: lesson.id,
        onLine: (id) => {
          lastTeachingLine.current = id;
          setTeachingLine(id);
          // Ako teaches from the reading, so bring it back into view.
          setStage('learn');
          requestAnimationFrame(() => {
            const sentence = document.getElementById(
              `ako-line-${plan.find((step) => step.id === id)?.anchorId}`,
            );
            const rect = sentence?.getBoundingClientRect();
            const panel = document.getElementById('ako-chat')?.getBoundingClientRect();
            const bottom =
              panel && rect && panel.left < rect.right ? panel.top - 20 : innerHeight - 40;
            if (rect && (rect.top < (innerWidth < 600 ? 175 : 235) || rect.bottom > bottom))
              sentence?.scrollIntoView({ block: 'center', behavior: 'instant' });
          });
        },
        onPause: () => setTeachingLine(''),
      },
    });
    return () => setAkoStudy(null);
  }, [eventId, lesson, plan]);
  const teachLine = (id: string) => {
    if (!ako.visible) updateAko({ visible: true });
    setStage('learn');
    setTeachingLine(id);
    askAkoAbout(id);
  };

  // The reading counts as done once its end has been on screen.
  const [readingDone, setReadingDone] = useState(false);
  useEffect(() => {
    const el = endRef.current;
    if (!el || readingDone || stage !== 'learn') return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setReadingDone(true);
      onPart('learn');
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [readingDone, stage, onPart]);

  const extras = extrasFor(lesson.id, lesson);
  const labs = (extras.labs ?? []).map((id) => topicLabs[id]).filter(Boolean);
  const phetSims = extras.phet ?? [];
  const sim = lesson.simulation;
  const labEntries: LabEntry[] = [
    {
      id: 'lesson-lab',
      kind: sim.kind === 'investigation' ? 'Investigation' : 'Lesson lab',
      title: sim.title.replace(/^[^:]*:\s*/, ''),
      blurb: sim.kind === 'investigation' ? sim.question : sim.challenge,
      render: () => <SimView sim={sim} lessonId={lesson.id} pathway={lesson.visual} />,
    },
    ...labs.map((lab) => ({
      id: `topic-lab-${lab.id}`,
      kind: 'Virtual lab',
      title: lab.title,
      blurb: lab.lead,
      render: () => <TopicLabView lab={lab} />,
    })),
    ...phetSims.map((embed) => ({
      id: `phet-${embed.sim}`,
      kind: 'PhET simulation',
      title: embed.title,
      blurb: embed.why,
      render: () => <PhetSim embed={embed} lessonId={lesson.id} />,
    })),
  ];
  const [selectedLab, setSelectedLab] = useState(labEntries[0].id);

  const goTo = (next: LessonStage, labId?: string) => {
    if (labId) setSelectedLab(labId);
    setStage(next);
    requestAnimationFrame(() => {
      const top = stagesRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0 || top > innerHeight * 0.6)
        stagesRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
  };
  const done: Record<LessonStage, boolean> = {
    learn: readingDone || parts.includes('learn'),
    practice: parts.includes('practice'),
    labs: parts.includes('labs'),
    checkpoint: completed || checkpointProgress(attempt, lesson.practice).complete,
  };
  const mcq = lesson.practice.filter((q) => q.type === 'mcq').length;
  const practiceCount = practiceActivities(lesson, extras.sort).length;
  const tocItems = [
    ...lesson.sections.map((section, i) => ({
      id: `lesson-section-${i}`,
      number: String(i + 1).padStart(2, '0'),
      label: section.heading,
    })),
    ...(lesson.workedExample ? [{ id: 'lesson-example', label: 'Worked example' }] : []),
    { id: 'lesson-review', label: 'Review: key terms' },
  ];
  const activeToc = useScrollSpy(
    tocItems.map((item) => item.id),
    stage === 'learn',
  );
  const bigIdea = lessonBigIdea(lesson);
  const comparison = lessonComparison(lesson);
  const figures =
    lesson.referenceFigures ??
    lessonReferenceFigures.filter((figure) => figure.lessonId === lesson.id);
  return (
    <article
      className={`lesson-detail lf-lesson${teachingLine ? ' is-ako-guided' : ''}`}
      aria-labelledby="current-lesson-title"
    >
      <header className="lesson-title-block lf-header">
        <p className="eyebrow">
          <BookOpen size={16} aria-hidden="true" /> UNIT {unitNumber} · {lesson.sections.length}{' '}
          TOPICS · ~{lesson.durationMin} MIN
          {lesson.extension ? ' · EXTENSION' : ''}
        </p>
        <h2 id="current-lesson-title" tabIndex={-1}>
          {lesson.title}
        </h2>
        {bigIdea && (
          <p className="lf-big-idea">
            <span>Big idea</span>
            {bigIdea}
          </p>
        )}
        <div className="lf-header-grid">
          <section className="lf-objectives" aria-labelledby="lf-objectives-title">
            <h3 id="lf-objectives-title">By the end, you can</h3>
            <ul>
              {lesson.objectives.map((objective) => (
                <li key={objective}>
                  <Check size={15} aria-hidden="true" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </section>
          <div className="lesson-ako-intro lf-ako">
            <strong>Learn with Ako</strong>
            <p>Ako walks you through each topic, gives an example, then checks you understood.</p>
            <button
              type="button"
              className="button button-small button-glass"
              onClick={() => teachLine(teachingLine || lastTeachingLine.current || plan[0].id)}
            >
              {teachingLine || lastTeachingLine.current
                ? 'Continue with Ako'
                : 'Teach me this lesson'}
            </button>
          </div>
        </div>
      </header>
      <div ref={stagesRef} className="lf-stages-anchor" />
      <StageNav
        stage={stage}
        onChange={(next) => goTo(next)}
        done={done}
        counts={{
          learn: `${lesson.sections.length} topics + example`,
          practice: `${practiceCount} ${practiceCount === 1 ? 'activity' : 'activities'}`,
          labs: `${labEntries.length} ${labEntries.length === 1 ? 'lab' : 'labs'}`,
          checkpoint: `${lesson.practice.length} questions`,
        }}
      />
      {teachingLine && (
        <nav className="lesson-ako-guide" aria-label="Ako reading guide">
          <strong>Ako is teaching</strong>
          <span>
            {activeStep?.kind === 'recap'
              ? 'Recap'
              : `Topic ${(activeStep?.topicIndex ?? 0) + 1} / ${lesson.sections.length}`}
          </span>
          <button
            type="button"
            disabled={teachingLine === plan[0].id}
            onClick={() =>
              teachLine(plan[plan.findIndex((line) => line.id === teachingLine) - 1].id)
            }
          >
            Back
          </button>
          <button
            type="button"
            disabled={teachingLine === plan.at(-1)?.id}
            onClick={() =>
              teachLine(plan[plan.findIndex((line) => line.id === teachingLine) + 1].id)
            }
          >
            Skip ahead
          </button>
        </nav>
      )}

      <div
        id="lesson-stage-learn"
        role="tabpanel"
        aria-labelledby="lesson-tab-learn"
        className="lf-stage lf-learn"
        hidden={stage !== 'learn'}
      >
        <div className="lf-learn-main">
          <AkoReading.Provider
            value={{
              anchorId: activeStep?.anchorId,
              highlightIds: activeStep?.highlightIds ?? [],
            }}
          >
            <div id="lesson-reading" className="lesson-reading">
              {lesson.sections.map((section, index) => (
                <section
                  key={section.heading}
                  id={`lesson-section-${index}`}
                  className="lesson-section lf-section"
                  aria-labelledby={`lesson-section-${index}-title`}
                >
                  <header className="lf-section-head">
                    <span className="lesson-section-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 id={`lesson-section-${index}-title`}>{section.heading}</h3>
                  </header>
                  <SectionContent section={formatted[index]} />
                  <LessonSectionVisuals lesson={lesson} index={index} />
                  {figures
                    .filter((figure) => figure.section === index)
                    .map((figure) => (
                      <LessonReferenceFigure key={figure.src} figure={figure} />
                    ))}
                  {(extras.checks ?? [])
                    .filter((item) => item.after === index)
                    .map((item) => (
                      <InlineCheck key={item.q} check={item} />
                    ))}
                </section>
              ))}
            </div>
          </AkoReading.Provider>
          {lesson.workedExample && <WorkedExampleSteps example={lesson.workedExample} />}
          <section id="lesson-review" className="lf-review" aria-labelledby="lf-review-title">
            <p className="eyebrow">REVIEW</p>
            <h3 id="lf-review-title">Key terms · {lesson.keyTerms.length}</h3>
            <KeyTermsGrid terms={lesson.keyTerms} />
            {comparison && <ComparisonAtlas entry={comparison} />}
          </section>
          <div ref={endRef} />
          <StageFooter
            label="Practice"
            detail="Next: quick recall activities to lock in the ideas before the labs."
            onNext={() => goTo('practice')}
          />
        </div>
        <aside className="lf-rail">
          <LessonToc items={tocItems} active={activeToc} />
        </aside>
      </div>

      <div
        id="lesson-stage-practice"
        role="tabpanel"
        aria-labelledby="lesson-tab-practice"
        className="lf-stage"
        hidden={stage !== 'practice'}
      >
        <LessonActivities
          lesson={lesson}
          sortActivity={extras.sort}
          onComplete={(score, maxScore) => onPart('practice', score, maxScore)}
        />
        <StageFooter
          label="Labs"
          detail={`Next: ${labEntries.length === 1 ? 'a lab' : `${labEntries.length} labs`} where you change the variables yourself.`}
          onNext={() => goTo('labs')}
        />
      </div>

      <div
        id="lesson-stage-labs"
        role="tabpanel"
        aria-labelledby="lesson-tab-labs"
        className="lf-stage"
        hidden={stage !== 'labs'}
      >
        <LabsStage
          entries={labEntries}
          selected={selectedLab}
          onSelect={setSelectedLab}
          onComplete={(score, maxScore) => onPart('labs', score, maxScore)}
        />
        <StageFooter
          label="Checkpoint"
          detail={`Next: ${lesson.practice.length} checkpoint questions (${mcq} multiple choice, ${lesson.practice.length - mcq} written).`}
          onNext={() => goTo('checkpoint')}
        />
      </div>

      <div
        id="lesson-stage-checkpoint"
        role="tabpanel"
        aria-labelledby="lesson-tab-checkpoint"
        className="lf-stage"
        hidden={stage !== 'checkpoint'}
      >
        <CheckpointView
          key={lesson.id}
          lesson={lesson}
          attempt={attempt}
          completed={completed}
          onAnswer={onAnswer}
          onCheck={onCheck}
          onRetake={onRetake}
        />
      </div>
    </article>
  );
}

type LessonProgress = { answers: CheckedAnswer[]; parts: LessonPartRecord[] };
export function LessonsView({ course, studentId }: { course: EventLessons; studentId: string }) {
  const { request } = useAuth();
  const [records, setRecords] = useState<Record<string, LessonRecord>>({});
  const [parts, setParts] = useState<Record<string, LessonPart[]>>({});
  const ordered = course.units
    .flatMap((unit) => unit.lessonIds)
    .map((id) => course.lessons.find((lesson) => lesson.id === id)!);
  const [lessonId, setLessonId] = useState(ordered[0].id);
  const [attempts, setAttempts] = useState<Record<string, LessonAttempt>>({});
  const [loaded, setLoaded] = useState(false);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const storageKey = lessonStorageKey(studentId, course.eventId, course.division);
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
    const params = new URLSearchParams(window.location.search);
    const requested =
      params.get('lesson') ??
      course.units.find((unit) => unit.id === params.get('unit'))?.lessonIds[0];
    if (course.lessons.some((lesson) => lesson.id === requested)) setLessonId(requested!);
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
  // A lesson is complete once its checkpoint is finished, on this device or recorded from another.
  const isComplete = (id: string) =>
    !!records[id] ||
    checkpointProgress(attempts[id], course.lessons.find((l) => l.id === id)!.practice).complete;
  const completed = course.lessons.filter((item) => isComplete(item.id)).length;
  // Lessons already completed from any browser; a failed read only hides those marks.
  useEffect(() => {
    let active = true;
    request<WorkRecord[]>('/api/progress')
      .then((work) => {
        if (active && Array.isArray(work))
          setRecords((current) => ({
            ...Object.fromEntries(
              work
                .filter((item) => item.type === 'Lesson' && item.eventId === course.eventId)
                .map((item) => [item.targetId, { score: item.score, maxScore: item.maxScore }]),
            ),
            ...current,
          }));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [request, course.eventId]);
  // Checked answers and finished stages from any device. The server's marks replace this
  // browser's, so a retake or check elsewhere shows here too; unchecked drafts are kept.
  useEffect(() => {
    let active = true;
    request<LessonProgress>(`/api/lessons/progress?eventId=${encodeURIComponent(course.eventId)}`)
      .then((progress) => {
        if (!active || !progress || !Array.isArray(progress.answers)) return;
        setAttempts((current) =>
          Object.fromEntries(
            course.lessons.map((item) => {
              const local = current[item.id] ?? emptyAttempt;
              const rows = progress.answers.filter((row) => row.lessonId === item.id);
              return [
                item.id,
                {
                  answers: {
                    ...local.answers,
                    ...Object.fromEntries(rows.map((row) => [row.questionId, row.answer])),
                  },
                  checks: Object.fromEntries(
                    rows.map((row) => [
                      row.questionId,
                      {
                        correct: row.correct,
                        by: row.by,
                        ...(row.feedback ? { feedback: row.feedback } : {}),
                      },
                    ]),
                  ),
                },
              ];
            }),
          ),
        );
        if (Array.isArray(progress.parts))
          setParts((current) => {
            const next = { ...current };
            for (const row of progress.parts)
              next[row.lessonId] = [...new Set([...(next[row.lessonId] ?? []), row.part])];
            return next;
          });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [request, course]);
  const updateAttempt = (id: string, update: (attempt: LessonAttempt) => LessonAttempt) =>
    setAttempts((current) => ({ ...current, [id]: update(current[id] ?? emptyAttempt) }));
  async function checkAnswer(
    id: string,
    questionId: string,
    answer: string,
    selfMark?: boolean,
  ): Promise<CheckOutcome> {
    try {
      const response = await request<CheckResponse>('/api/lessons/check', {
        method: 'POST',
        body: JSON.stringify({
          eventId: course.eventId,
          lessonId: id,
          questionId,
          answer,
          ...(selfMark === undefined ? {} : { selfMark }),
        }),
      });
      if (response?.status === 'self-mark') return response;
      if (response?.status !== 'checked') throw new Error('The answer could not be checked.');
      updateAttempt(id, (attempt) => ({
        answers: { ...attempt.answers, [questionId]: answer },
        checks: { ...attempt.checks, [questionId]: response.result },
      }));
      if (response.lesson) {
        const summary = response.lesson;
        setRecords((current) => ({ ...current, [id]: summary }));
        setParts((current) => ({
          ...current,
          [id]: [...new Set([...(current[id] ?? []), 'checkpoint' as const])],
        }));
      }
      return { status: 'checked', result: response.result };
    } catch (error) {
      return { status: 'error', message: authMessage(error) };
    }
  }
  async function retake(id: string) {
    await request('/api/lessons/check', {
      method: 'DELETE',
      body: JSON.stringify({ eventId: course.eventId, lessonId: id }),
    });
    updateAttempt(id, () => emptyAttempt);
  }
  // Stage completion is best effort: a failed save is retried the next time the stage finishes.
  const sentParts = useRef(new Set<string>());
  const recordPart = useCallback(
    (id: string, part: Exclude<LessonPart, 'checkpoint'>, score?: number, maxScore?: number) => {
      const key = `${id}:${part}`;
      if (sentParts.current.has(key)) return;
      sentParts.current.add(key);
      setParts((current) =>
        current[id]?.includes(part)
          ? current
          : { ...current, [id]: [...(current[id] ?? []), part] },
      );
      request('/api/lessons/progress', {
        method: 'POST',
        body: JSON.stringify({
          eventId: course.eventId,
          lessonId: id,
          part,
          ...(maxScore ? { score, maxScore } : {}),
        }),
      }).catch(() => sentParts.current.delete(key));
    },
    [request, course.eventId],
  );
  const onPart = useCallback(
    (part: Exclude<LessonPart, 'checkpoint'>, score?: number, maxScore?: number) =>
      recordPart(lessonId, part, score, maxScore),
    [recordPart, lessonId],
  );
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
          <span className="lesson-slot-dot" /> DIVISION {course.division}
          {slotForEvent(course.eventId)
            ? ` · ${slotForEvent(course.eventId)!.label.toUpperCase()} TIMESLOT`
            : ' · LESSONS'}
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
            {completed} of {course.lessons.length} lessons complete
          </label>
          <progress id="course-progress" value={completed} max={course.lessons.length} />
        </div>
        <p className="lesson-save-note" role="status">
          {storageUnavailable
            ? 'Browser storage is unavailable. You can keep studying, but this session’s progress may not survive a reload.'
            : 'Each checkpoint answer is marked as you check it and saved for your instructor. A lesson is complete once its checkpoint is finished.'}
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
                const count = item.lessonIds.filter(isComplete).length;
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
                        {count}/{item.lessonIds.length} lessons complete
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
                const done = isComplete(id);
                const record = records[id];
                return (
                  <button
                    key={id}
                    className="lesson-button"
                    aria-pressed={lesson.id === id}
                    onClick={() => selectLesson(id, true)}
                  >
                    <span className="lesson-index">
                      {done ? (
                        <Check size={18} aria-label="Lesson complete" />
                      ) : (
                        String(i + 1).padStart(2, '0')
                      )}
                    </span>
                    <span>
                      {item.title}
                      <small>
                        {item.durationMin} min · {item.practice.length} checkpoint questions
                        {item.extension ? ' · Extension' : ''}
                        {record ? ` · Complete · ${record.score}/${record.maxScore} correct` : ''}
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
            eventId={course.eventId}
            unitNumber={course.units.findIndex((item) => item.id === lesson.unitId) + 1}
            attempt={attempts[lesson.id] ?? emptyAttempt}
            completed={!!records[lesson.id]}
            parts={parts[lesson.id] ?? []}
            onAnswer={(questionId, answer) =>
              updateAttempt(lesson.id, (attempt) =>
                attempt.checks[questionId]
                  ? attempt
                  : { ...attempt, answers: { ...attempt.answers, [questionId]: answer } },
              )
            }
            onCheck={(questionId, answer, selfMark) =>
              checkAnswer(lesson.id, questionId, answer, selfMark)
            }
            onRetake={() => retake(lesson.id)}
            onPart={onPart}
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
