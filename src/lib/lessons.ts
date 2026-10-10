// Shared lesson model for the supported Division C timeslots.
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
      kind: 'explorer';
      lab:
        | 'cipher'
        | 'remote'
        | 'epidemiology'
        | 'astronomy'
        | 'botany'
        | 'experiment'
        | 'chemistry'
        | 'minerals'
        | 'circuits'
        | 'water'
        | 'protein'
        | 'genetics'
        | 'hydrology'
        | 'thermodynamics';
      topic: number;
      title: string;
      instructions: string;
      challenge: string;
      takeaway: string;
    }
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
      diagram?: 'tissue-section' | 'str' | 'glass';
      title: string;
      instructions: string;
      observations: { label: string; result: string }[];
      question: string;
      options: string[];
      correct: number;
      explanation: string;
    };

export type LessonReferenceFigure = {
  fallbackSrc?: string;
  title: string;
  src: string;
  source: string;
  alt: string;
  prompt: string;
  author: string;
  license: string;
  licenseUrl: string;
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
  referenceFigures?: (LessonReferenceFigure & { section: number })[];
  visual?: {
    section: number;
    title: string;
    steps: { label: string; detail: string }[];
    contrasts: { label: string; mechanism: string; limit: string }[];
  };
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
