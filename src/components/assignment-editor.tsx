'use client';
import { useEffect, useState } from 'react';
import { PHET_LAB, dateInZone, type StudyKind } from '@/lib/domain';
import type { Division } from '@/lib/events';
import { lessonsForEvent } from '@/lib/lessons-registry';
import { labsForEvent, phetActivities } from '@/lib/division-c-labs';
import { lessonLabel, unitLabel } from '@/lib/lesson-labels';
import { practiceTitle, type PracticeSummary } from '@/lib/practice-types';
import { useAuth, authMessage } from './auth-context';

/** The pending work being edited: one student's assignment, or the same work for many. */
export type EditTarget = {
  ids: string[];
  division: Division;
  eventId: string;
  eventName: string;
  due: string;
  study?: { kind: StudyKind; targetId: string; title: string };
  testId?: string | null;
};

type Group = { label: string; options: { value: string; label: string }[] };

/** The choices for an event's lessons, units and labs, organized by unit and numbered. */
export function studyChoices(division: Division, eventId: string): Group[] {
  const groups: Group[] = [];
  const course = lessonsForEvent(eventId, division);
  if (course) {
    for (const unit of course.units) {
      const title = unitLabel(course, unit.id)!;
      groups.push({
        label: title,
        options: [
          { value: `Unit:${unit.id}`, label: `Whole ${title}` },
          ...unit.lessonIds.map((id) => ({
            value: `Lesson:${id}`,
            label: lessonLabel(course, id) ?? id,
          })),
        ],
      });
    }
    const loose = course.lessons.filter(
      (lesson) => !course.units.some((unit) => unit.lessonIds.includes(lesson.id)),
    );
    if (loose.length)
      groups.push({
        label: 'Other lessons',
        options: loose.map((lesson) => ({ value: `Lesson:${lesson.id}`, label: lesson.title })),
      });
  }
  const labs = labsForEvent(division, eventId).map((lab) => ({
    value: `Lab:${lab.id}`,
    label: lab.title,
  }));
  const phet = labs.length ? phetActivities[eventId] : undefined;
  if (phet) labs.push({ value: `Lab:${PHET_LAB}`, label: `PhET: ${phet.title}` });
  if (labs.length) groups.push({ label: 'Lab simulations', options: labs });
  return groups;
}

/**
 * Change pending work's due date and what it asks for, within the same event. With several ids
 * the change is saved for every one of those students at once.
 */
export function AssignmentEditor({
  target,
  onSaved,
  onCancel,
}: {
  target: EditTarget;
  onSaved: () => Promise<void>;
  onCancel: () => void;
}) {
  const { request } = useAuth();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = dateInZone(timeZone);
  const { study, division, eventId } = target;
  const bulk = target.ids.length > 1;
  const [due, setDue] = useState(target.due < today ? today : target.due);
  const [choice, setChoice] = useState(
    study ? `${study.kind}:${study.targetId}` : `Practice:${target.testId ?? ''}`,
  );
  const [tests, setTests] = useState<PracticeSummary[] | null>(study ? [] : null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (study) return;
    let active = true;
    request<{ tests: PracticeSummary[] }>(
      `/api/practice?division=${division}&eventId=${encodeURIComponent(eventId)}`,
    )
      .then((data) => {
        if (active) setTests(data.tests);
      })
      .catch((error) => {
        if (!active) return;
        setTests([]);
        setError(authMessage(error));
      });
    return () => {
      active = false;
    };
  }, [request, study, division, eventId]);

  let groups: Group[];
  if (study) {
    groups = studyChoices(division, eventId);
    // Keep the current item listed even if the catalog no longer offers it.
    if (!groups.some((group) => group.options.some((option) => option.value === choice)))
      groups.unshift({ label: 'Current', options: [{ value: choice, label: study.title }] });
  } else {
    const options = [{ value: 'Practice:', label: 'Any practice test in this event' }];
    for (const test of tests ?? [])
      options.push({ value: `Practice:${test.id}`, label: practiceTitle(test) });
    if (!options.some((option) => option.value === choice))
      options.push({ value: choice, label: target.testId ?? 'Current test' });
    groups = [{ label: 'Practice tests', options }];
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    const split = choice.indexOf(':');
    setSaving(true);
    setError('');
    try {
      await request('/api/assignments', {
        method: 'PATCH',
        body: JSON.stringify({
          ...(bulk ? { ids: target.ids } : { id: target.ids[0] }),
          due,
          timeZone,
          kind: choice.slice(0, split),
          targetId: choice.slice(split + 1),
        }),
      });
      await onSaved();
    } catch (error) {
      setError(authMessage(error));
      setSaving(false);
    }
  }

  return (
    <form
      className="assignment-editor"
      onSubmit={save}
      aria-label={`Edit ${target.eventName} assignment`}
    >
      <label>
        Due date
        <input
          type="date"
          required
          min={today}
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
      </label>
      <label>
        Assigned work
        <select
          value={choice}
          disabled={!tests}
          onChange={(e) => setChoice(e.target.value)}
          aria-busy={!tests}
        >
          {groups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>
      <div className="assignment-editor-actions">
        <button
          className="button button-primary button-small"
          type="submit"
          disabled={saving || !tests}
        >
          {saving ? 'Saving…' : bulk ? `Save for ${target.ids.length} students` : 'Save changes'}
        </button>
        <button
          className="button button-small button-glass"
          type="button"
          disabled={saving}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
