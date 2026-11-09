import type { Division } from './events';
import type { TeamSheet } from './teams';

/** Points earned out of points that could be graded. Accuracy is earned ÷ possible. */
export type Tally = { earned: number; possible: number };
export type AnalyticsAttempt = {
  studentId: string;
  division: Division;
  eventId: string;
  type: 'Practice' | 'Ranked';
  completedAt: string;
  // Written answers still waiting for review are left out of `possible`, not counted as wrong.
  overall: Tally;
  multipleChoice: Tally;
  written: Tally;
};
/** The four stages of every lesson, in the order a student meets them. */
export const lessonStages = ['learn', 'practice', 'labs', 'checkpoint'] as const;
export type LessonStageId = (typeof lessonStages)[number];
export type LessonStageCounts = Record<LessonStageId, number>;
const noStages = (): LessonStageCounts => ({ learn: 0, practice: 0, labs: 0, checkpoint: 0 });

/** What one student has done in one event, apart from test scores. */
export type AnalyticsActivity = {
  studentId: string;
  division: Division;
  eventId: string;
  /** Lessons completed (checkpoint finished). */
  lessons: number;
  /** Lessons the event's course has; 0 when the event has no course. */
  lessonTotal: number;
  /** Lessons with each stage finished. */
  stages: LessonStageCounts;
  /** Checkpoint answers marked right out of answers checked. */
  checkpoint: Tally;
  /** First-try accuracy in practice activities, and lab goals plus first-try answers. */
  lessonPractice: Tally;
  lessonLabs: Tally;
  points: number;
  assigned: number;
  completed: number;
};
export type AnalyticsStudent = { id: string; name: string; division: Division; points: number };
export type SchoolAnalytics = {
  teams: TeamSheet[];
  students: AnalyticsStudent[];
  attempts: AnalyticsAttempt[];
  activity: AnalyticsActivity[];
};

/** A team, or the students of one division who are not seated on any team. */
export type AnalyticsGroup = {
  id: string;
  name: string;
  division: Division;
  isTeam: boolean;
  memberIds: string[];
  /** Event id → the students seated in it. Empty for students without a team. */
  seats: Record<string, string[]>;
};
export type AnalyticsSummary = {
  overall: Tally;
  multipleChoice: Tally;
  written: Tally;
  practice: Tally;
  ranked: Tally;
  practiceTests: number;
  rankedTests: number;
  lessons: number;
  lessonTotal: number;
  stages: LessonStageCounts;
  checkpoint: Tally;
  lessonPractice: Tally;
  lessonLabs: Tally;
  points: number;
  assigned: number;
  completed: number;
};

const add = (total: Tally, part: Tally) => {
  total.earned += part.earned;
  total.possible += part.possible;
};
/** Percent accuracy to one decimal place, or null when nothing has been graded. */
export const accuracy = (tally: Tally) =>
  tally.possible > 0 ? Math.round((tally.earned / tally.possible) * 1000) / 10 : null;
export const completion = (summary: Pick<AnalyticsSummary, 'assigned' | 'completed'>) =>
  summary.assigned > 0 ? Math.round((summary.completed / summary.assigned) * 1000) / 10 : null;
const share = (part: number, whole: number) =>
  whole > 0 ? Math.round((part / whole) * 1000) / 10 : null;
/** Lessons completed out of the lessons in the events the students take part in. */
export const lessonCompletion = (summary: Pick<AnalyticsSummary, 'lessons' | 'lessonTotal'>) =>
  share(summary.lessons, summary.lessonTotal);
/** Share of lessons with one stage finished. */
export const stageCompletion = (
  summary: Pick<AnalyticsSummary, 'stages' | 'lessonTotal'>,
  stage: LessonStageId,
) => share(summary.stages[stage], summary.lessonTotal);
/** Accuracy across everything graded inside lessons: checkpoint, practice, and labs. */
export const lessonAccuracy = (
  summary: Pick<AnalyticsSummary, 'checkpoint' | 'lessonPractice' | 'lessonLabs'>,
) => {
  const total = { earned: 0, possible: 0 };
  for (const part of [summary.checkpoint, summary.lessonPractice, summary.lessonLabs])
    add(total, part);
  return accuracy(total);
};

export function analyticsGroups(data: SchoolAnalytics): AnalyticsGroup[] {
  const known = new Set(data.students.map((student) => student.id));
  const seated = new Set<string>();
  const groups: AnalyticsGroup[] = data.teams.map((team) => {
    const seats = Object.fromEntries(
      Object.entries(team.slots).map(([eventId, slots]) => [
        eventId,
        slots.filter((id): id is string => !!id && known.has(id)),
      ]),
    );
    const memberIds = [...new Set(Object.values(seats).flat())];
    for (const id of memberIds) seated.add(id);
    return {
      id: team.id,
      name: team.name,
      division: team.division,
      isTeam: true,
      memberIds,
      seats,
    };
  });
  for (const division of ['A', 'B', 'C'] as const) {
    const memberIds = data.students
      .filter((student) => student.division === division && !seated.has(student.id))
      .map((student) => student.id);
    if (memberIds.length)
      groups.push({
        id: `unassigned:${division}`,
        name: `Not on a team · Division ${division}`,
        division,
        isTeam: false,
        memberIds,
        seats: {},
      });
  }
  return groups;
}

/** Totals for some students in one division, optionally narrowed to one event. */
export function summarize(
  data: SchoolAnalytics,
  studentIds: Iterable<string>,
  division: Division,
  eventId?: string,
): AnalyticsSummary {
  const ids = new Set(studentIds);
  const tally = () => ({ earned: 0, possible: 0 });
  const summary: AnalyticsSummary = {
    overall: tally(),
    multipleChoice: tally(),
    written: tally(),
    practice: tally(),
    ranked: tally(),
    practiceTests: 0,
    rankedTests: 0,
    lessons: 0,
    lessonTotal: 0,
    stages: noStages(),
    checkpoint: tally(),
    lessonPractice: tally(),
    lessonLabs: tally(),
    points: 0,
    assigned: 0,
    completed: 0,
  };
  const wanted = (row: { studentId: string; division: Division; eventId: string }) =>
    ids.has(row.studentId) && row.division === division && (!eventId || row.eventId === eventId);
  for (const attempt of data.attempts) {
    if (!wanted(attempt)) continue;
    add(summary.overall, attempt.overall);
    add(summary.multipleChoice, attempt.multipleChoice);
    add(summary.written, attempt.written);
    add(attempt.type === 'Ranked' ? summary.ranked : summary.practice, attempt.overall);
    if (attempt.type === 'Ranked') summary.rankedTests++;
    else summary.practiceTests++;
  }
  for (const row of data.activity) {
    if (!wanted(row)) continue;
    summary.lessons += row.lessons;
    summary.lessonTotal += row.lessonTotal;
    for (const stage of lessonStages) summary.stages[stage] += row.stages[stage];
    add(summary.checkpoint, row.checkpoint);
    add(summary.lessonPractice, row.lessonPractice);
    add(summary.lessonLabs, row.lessonLabs);
    summary.points += row.points;
    summary.assigned += row.assigned;
    summary.completed += row.completed;
  }
  return summary;
}

/** Accuracy per week (weeks start on Monday, UTC), oldest first. */
export function weeklyAccuracy(
  attempts: AnalyticsAttempt[],
  studentIds: Iterable<string>,
  division: Division,
) {
  const ids = new Set(studentIds);
  const weeks = new Map<string, Tally>();
  for (const attempt of attempts) {
    if (!ids.has(attempt.studentId) || attempt.division !== division) continue;
    const day = new Date(attempt.completedAt);
    if (!Number.isFinite(day.getTime())) continue;
    day.setUTCHours(0, 0, 0, 0);
    day.setUTCDate(day.getUTCDate() - ((day.getUTCDay() + 6) % 7));
    const week = day.toISOString().slice(0, 10);
    if (!weeks.has(week)) weeks.set(week, { earned: 0, possible: 0 });
    add(weeks.get(week)!, attempt.overall);
  }
  return [...weeks]
    .sort(([a], [b]) => a.localeCompare(b))
    .flatMap(([week, tally]) => {
      const value = accuracy(tally);
      return value === null ? [] : [{ week, value }];
    });
}
