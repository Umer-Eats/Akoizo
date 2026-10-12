import type { Division } from './events';
import type { Answers, PracticeQuestion, PracticeResult } from './practice-types';

export type RankedSource = { testId: string; title: string; questions: number };
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
  paper?: { questions: PracticeQuestion[]; answers: Answers };
  // Present only after the instructor releases results.
  review?: { questions: PracticeQuestion[]; result: PracticeResult; sources: RankedSource[] };
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
  /** Assignment id → graded result. */
  results: Record<string, PracticeResult>;
};

/** How many standalone questions, from how many converted tests, an event can draw on. */
export type RankedPool = { eventId: string; questions: number; sources: number };

export const RANKED_QUESTIONS = { min: 5, max: 60, default: 30 };
export const RANKED_MINUTES = { min: 5, max: 180, default: 50 };
