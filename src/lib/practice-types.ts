import type { Division } from './events';

export const PRACTICE_SEASON = 2027;
export const competitionLevels = ['Regionals', 'States', 'Nationals', 'Invitational'] as const;
export type CompetitionLevel = (typeof competitionLevels)[number];
export type PracticeQuestion = {
  id: string;
  label: string;
  page: number;
  type: 'mcq' | 'frq';
  multiple?: boolean;
  points: number;
  prompt?: string;
  options?: { id: string; text: string }[];
};
export type Criterion = {
  id: string;
  points: number;
  answer: string;
  accepted?: string[];
  anyNonEmpty?: boolean;
  caseSensitive?: boolean;
  numeric?: { value: number; tolerance: number; units: string[]; unitRequired: boolean };
};
export type QuestionKey = {
  correctOption?: string;
  correctOptions?: string[];
  acceptedOptions?: string[];
  criteria?: Criterion[];
};
export type PracticeSummary = {
  id: string;
  eventId: string;
  division: Division;
  competition: string;
  level: CompetitionLevel;
  year: number;
  season: number;
  topics: string[];
  alignment: string;
  questionCount: number;
  maxScore: number;
  minutes: number;
  scoringBasis: string;
};
export type PracticePaper = PracticeSummary & {
  sourceUrl: string;
  paperUrl: string;
  instructions: string;
  questions: PracticeQuestion[];
};
export type PracticeTest = PracticePaper & {
  keyUrl: string;
  reviewedOn: string;
  rulesUrl: string;
  keys: Record<string, QuestionKey>;
};
export type Answers = Record<string, string>;
export type CriterionResult = {
  id: string;
  answer: string;
  points: number;
  earned: number;
  needsReview: boolean;
  gradedBy?: 'gemini';
  feedback?: string;
};
export type QuestionResult = {
  id: string;
  answer: string;
  earned: number;
  possible: number;
  correctOption?: string;
  correctOptions?: string[];
  acceptedOptions?: string[];
  criteria: CriterionResult[];
};
export type PracticeResult = {
  id: string;
  testId: string;
  completedAt: string;
  score: number;
  maxScore: number;
  percentage: number;
  pendingPoints: number;
  questions: QuestionResult[];
  keyUrl: string;
  reviewedAt?: string;
  automaticGrading?: 'complete' | 'unavailable';
};
export type PracticeReview = {
  studentName: string;
  title: string;
  result: PracticeResult;
  questions: PracticeQuestion[];
};
export const practiceTitle = (test: Pick<PracticeSummary, 'competition' | 'level' | 'year'>) =>
  `${test.competition} · ${test.level} · ${test.year}`;
