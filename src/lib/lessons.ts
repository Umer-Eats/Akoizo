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
      kind: 'model';
      model:
        | 'feedback'
        | 'airway'
        | 'ventilation'
        | 'diffusion'
        | 'digestion'
        | 'immune'
        | 'density'
        | 'chromatography'
        | 'bloodstain'
        | 'thermal';
      title: string;
      instructions: string;
      challenge: string;
      takeaway: string;
    }
  | {
      kind: 'investigation';
      title: string;
      instructions: string;
      observations: { label: string; result: string }[];
      question: string;
      options: string[];
      correct: number;
      explanation: string;
    };

export type Lesson = {
  id: string;
  unitId: string;
  title: string;
  durationMin: number;
  kind: 'text';
  objectives: string[];
  sections: { heading: string; body: string[] }[];
  keyTerms: { term: string; definition: string }[];
  simulation: LessonSim;
  practice: LessonQuizQuestion[];
  workedExample: { title: string; problem: string; steps: string[]; conclusion: string };
  extension?: boolean;
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
  division: 'C';
  syllabus: string;
  references: { title: string; url: string }[];
  intro: string;
  units: LessonUnit[];
  lessons: Lesson[];
};
