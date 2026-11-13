import type { Division } from './events';
import type { Answers, PracticeQuestion, PracticeResult } from './practice-types';

export type RankedSource = { testId: string; title: string; questions: number };
/** "Mixed" spreads questions across levels; the others lean on sources and questions at that level. */
export const RANKED_DIFFICULTIES = ['Mixed', 'Easy', 'Medium', 'Hard'] as const;
export type RankedDifficulty = (typeof RANKED_DIFFICULTIES)[number];
export const isRankedDifficulty = (value: unknown): value is RankedDifficulty =>
  RANKED_DIFFICULTIES.includes(value as RankedDifficulty);
/** The tournament a ranked test is pitched at: how deep and specialised its questions run. */
export const RANKED_LEVELS = ['Regional', 'State', 'National'] as const;
export type RankedLevel = (typeof RANKED_LEVELS)[number];
export const isRankedLevel = (value: unknown): value is RankedLevel =>
  RANKED_LEVELS.includes(value as RankedLevel);
/**
 * The source papers behind a ranked test, shown beside it so questions that lean on a diagram,
 * chart, or table can still be answered. One entry per converted test the questions came from.
 */
export type RankedReferenceSource = {
  key: string;
  label: string;
  title: string;
  topics: string[];
  paperUrl: string;
  supplementUrl?: string;
};
export type RankedReferences = {
  sources: RankedReferenceSource[];
  /** Ranked question id → the source it came from, its page there, and any extracted figure. */
  questions: Record<string, { source: string; page: number; figure?: PracticeQuestion['figure'] }>;
};
export type RankedStatus = 'assigned' | 'in-progress' | 'submitted' | 'released';
export type RankedScore = {
  score: number;
  maxScore: number;
  percentage: number;
  pendingPoints: number;
  /** 'pending' until the written-answer pass has run. */
  grading: 'complete' | 'pending';
};
export type RankedSummary = {
  id: string;
  eventId: string;
  eventName: string;
  division: Division;
  title: string;
  minutes: number;
  questionCount: number;
  maxScore: number;
  difficulty: RankedDifficulty;
  /** Null for tests built before a tournament level could be chosen. */
  level: RankedLevel | null;
  createdAt: string;
};
export type RankedAttempt = {
  assignmentId: string;
  due: string;
  status: RankedStatus;
  startedAt: string | null;
  deadline: string | null;
  submittedAt: string | null;
  /** Times the student left full screen or the test tab. */
  violations: number;
  /** The attempt was submitted because the student left full screen; the instructor may reopen it. */
  closedByExit: boolean;
  score: RankedScore | null;
};
export type StudentRankedTest = RankedSummary & RankedAttempt;
export type StudentRankedDetail = {
  test: StudentRankedTest;
  /** Server clock, so the countdown does not depend on the device clock. */
  now: string;
  paper?: { questions: PracticeQuestion[]; answers: Answers; references: RankedReferences };
  // Present only after the instructor releases results.
  review?: {
    questions: PracticeQuestion[];
    result: PracticeResult;
    sources: RankedSource[];
    references: RankedReferences;
  };
};
export type InstructorRankedRow = RankedAttempt & { studentId: string; studentName: string };
export type InstructorRankedTest = RankedSummary & {
  sources: RankedSource[];
  assignments: InstructorRankedRow[];
};
export type InstructorRankedDetail = {
  test: InstructorRankedTest;
  questions: PracticeQuestion[];
  /** A blank graded sheet that carries the correct options and rubric answers. */
  answerKey: PracticeResult;
  /** Question id → the converted test it came from. */
  origins: Record<string, string>;
  references: RankedReferences;
  /** Assignment id → graded result. */
  results: Record<string, PracticeResult>;
};

/** How many standalone questions, from how many converted tests, an event can draw on. */
export type RankedPool = { eventId: string; questions: number; sources: number };

export const RANKED_QUESTIONS = { min: 5, max: 60, default: 30 };
export const RANKED_MINUTES = { min: 5, max: 180, default: 50 };
