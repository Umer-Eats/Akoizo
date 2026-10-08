// Shared lesson model for Pink timeslot, Division C.
// Event -> Units -> Lessons -> Simulation + Practice assignment.
export type LessonQuizQuestion = {
  id: string;
  prompt: string;
  type: 'mcq' | 'short';
  options?: string[];
  answer: string;
  explanation: string;
  points?: number;
};

export type LessonSim =
  | {
      kind: 'slider';
      title: string;
      instructions: string;
      min: number;
      max: number;
      step: number;
      defaultValue: number;
      unit: string;
      scenarios: { value: number; label: string; outcome: string }[];
    }
  | {
      kind: 'flashcards';
      title: string;
      instructions: string;
      cards: { front: string; back: string }[];
    }
  | {
      kind: 'scenario';
      title: string;
      instructions: string;
      steps: { prompt: string; options: string[]; correct: number; feedback: string }[];
    }
  | {
      kind: 'checklist';
      title: string;
      instructions: string;
      items: { label: string; detail: string }[];
    };

export type Lesson = {
  id: string;
  unitId: string;
  title: string;
  durationMin: number;
  kind: 'text' | 'video';
  videoUrl?: string;
  objectives: string[];
  sections: { heading: string; body: string[] }[];
  keyTerms: { term: string; definition: string }[];
  simulation: LessonSim;
  practice: LessonQuizQuestion[];
};

export type LessonUnit = {
  id: string;
  title: string;
  description: string;
  lessonIds: string[];
};

export type EventLessons = {
  eventId: string;
  eventName: string;
  instructor: string;
  intro: string;
  units: LessonUnit[];
  lessons: Lesson[];
};
