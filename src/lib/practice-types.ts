import type { Division } from './events';

export const PRACTICE_SEASON = 2027;
export const competitionLevels = ['Regionals', 'States', 'Nationals'] as const;
export type CompetitionLevel = (typeof competitionLevels)[number];
export type LevelEvidence = { sourceUrl: string; text: string; basis: string };
export type PracticeQuestion = {
  id: string;
  label: string;
  page: number;
  type: 'mcq' | 'frq';
  multiple?: boolean;
  points: number;
  prompt?: string;
  // Complete source context (including diagram/table descriptions) for AI grading.
  context?: string;
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
  level: CompetitionLevel | null;
  levelEvidence?: LevelEvidence | null;
  sourceId?: string;
  topicMatch?: 'current' | 'different' | 'unverified';
  year: number;
  season: number;
  topics: string[];
  alignment: string;
  questionCount: number;
  maxScore: number;
  minutes: number;
  scoringBasis: string;
  gradingMode?: 'published-key' | 'ai-generated';
};
export type PracticePaper = PracticeSummary & {
  sourceUrl: string;
  paperUrl: string;
  instructions: string;
  questions: PracticeQuestion[];
};
export type PracticeTest = PracticePaper & {
  keyUrl: string | null;
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
  attemptNumber?: number;
  completedAt: string;
  score: number;
  maxScore: number;
  percentage: number;
  pendingPoints: number;
  questions: QuestionResult[];
  keyUrl: string | null;
  reviewedAt?: string;
  autoGradedAt?: string;
  gradingBasis?: 'published-rubric' | 'ai-generated';
  automaticGrading?: 'complete' | 'unavailable';
};
export type PracticeReview = {
  studentName: string;
  title: string;
  result: PracticeResult;
  questions: PracticeQuestion[];
};
export const practiceTitle = (test: Pick<PracticeSummary, 'competition' | 'level' | 'year'>) =>
  `${test.competition} · ${test.level ?? 'Level not reported'} · ${test.year}`;

export type ArchiveSource = {
  sourceId: string;
  sourceUrl: string;
  event: string;
  divisions: string[];
  year: number;
  competition: string;
  level: CompetitionLevel | null;
  levelEvidence: LevelEvidence | null;
  topics: string[];
  status: string;
  files: { name: string; type: string; size: number; sha256: string }[];
};

export function matchesPracticeFilters(
  test: Pick<PracticeSummary, 'competition' | 'level' | 'year' | 'topics'>,
  filters: { query: string; level: string; year: string; topic: string },
) {
  return (
    (!filters.level || test.level === filters.level) &&
    (!filters.year || String(test.year) === filters.year) &&
    (!filters.topic || test.topics.includes(filters.topic)) &&
    `${practiceTitle(test)} ${test.topics.join(' ')}`
      .toLowerCase()
      .includes(filters.query.trim().toLowerCase())
  );
}
