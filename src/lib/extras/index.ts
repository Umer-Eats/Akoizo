import type { EventExtras, LessonExtras } from '../lesson-extras.ts';
import type { Lesson } from '../lessons';
import { check } from '../lesson-extras.ts';
import type { TopicLab } from '../topic-lab-kit.ts';
import { anatomyExtras } from './anatomy.ts';
import { astronomyExtras } from './astronomy.ts';
import { botanyExtras } from './botany.ts';
import { chemistryLabExtras } from './chemistry-lab.ts';
import { circuitLabExtras } from './circuit-lab.ts';
import { codebustersExtras } from './codebusters.ts';
import { designerGenesExtras } from './designer-genes.ts';
import { diseaseDetectivesExtras } from './disease-detectives.ts';
import { dynamicPlanetExtras } from './dynamic-planet.ts';
import { experimentalDesignExtras } from './experimental-design.ts';
import { crimeBustersExtras } from './crime-busters.ts';
import { foodScienceExtras } from './food-science.ts';
import { forensicsExtras } from './forensics.ts';
import { heredityExtras } from './heredity.ts';
import { meteorologyExtras } from './meteorology.ts';
import { proteinModelingExtras } from './protein-modeling.ts';
import { remoteSensingExtras } from './remote-sensing.ts';
import { rocksAndMineralsExtras } from './rocks-and-minerals.ts';
import { solarSystemExtras } from './solar-system.ts';
import { thermodynamicsExtras } from './thermodynamics.ts';
import { waterQualityExtras } from './water-quality.ts';

export const eventExtras: EventExtras[] = [
  anatomyExtras,
  astronomyExtras,
  botanyExtras,
  chemistryLabExtras,
  circuitLabExtras,
  codebustersExtras,
  designerGenesExtras,
  diseaseDetectivesExtras,
  dynamicPlanetExtras,
  experimentalDesignExtras,
  forensicsExtras,
  heredityExtras,
  meteorologyExtras,
  crimeBustersExtras,
  foodScienceExtras,
  solarSystemExtras,
  proteinModelingExtras,
  remoteSensingExtras,
  rocksAndMineralsExtras,
  thermodynamicsExtras,
  waterQualityExtras,
];
export const topicLabs: Record<string, TopicLab> = Object.fromEntries(
  eventExtras.flatMap((event) => event.labs.map((lab) => [lab.id, lab])),
);
export const lessonExtras: Record<string, LessonExtras> = Object.assign(
  {},
  ...eventExtras.map((event) => event.lessons),
);
const none: LessonExtras = {};
export const extrasFor = (lessonId: string, lesson?: Lesson): LessonExtras => {
  if (lessonExtras[lessonId]) return lessonExtras[lessonId];
  if (!lesson || !lessonId.endsWith('-b')) return none;
  const quiz = lesson.practice.find((q) => q.type === 'mcq');
  return {
    checks: quiz?.options
      ? [
          check(
            lesson.sections.length - 1,
            quiz.prompt,
            [quiz.answer, ...quiz.options.filter((option) => option !== quiz.answer)],
            quiz.explanation,
          ),
        ]
      : [],
    sort: {
      title: 'Connect each idea to its meaning',
      bins: lesson.keyTerms.map((t) => t.term),
      items: lesson.keyTerms.map((t, i) => [t.definition, i]),
    },
  };
};
