import type { EventLessons } from '../lessons';
import { anat } from './anat.ts';
import { astronomy } from './astro.ts';
import { botany } from './bot.ts';
import { crimeBusters } from './cb.ts';
import { chemistry } from './chem.ts';
import { circuitLab } from './circ.ts';
import { codebusters } from './code.ts';
import { dynamicPlanet } from './dyn.ts';
import { diseaseDetectives } from './epi.ts';
import { experimentalDesign } from './exp.ts';
import { foodScience } from './food.ts';
import { forensics } from './for.ts';
import { designerGenes } from './gene.ts';
import { heredity } from './her.ts';
import { meteorology } from './met.ts';
import { proteinModeling } from './prot.ts';
import { remoteSensing } from './remote.ts';
import { rocksAndMinerals } from './rock.ts';
import { solarSystem } from './sol.ts';
import { thermodynamics } from './therm.ts';
import { waterQuality } from './water.ts';

/** Checkpoint explanations, keyed by question id. Ids are unique across every course. */
export const lessonExplanations: Record<string, string> = {
  ...anat,
  ...astronomy,
  ...botany,
  ...crimeBusters,
  ...chemistry,
  ...circuitLab,
  ...codebusters,
  ...dynamicPlanet,
  ...diseaseDetectives,
  ...experimentalDesign,
  ...foodScience,
  ...forensics,
  ...designerGenes,
  ...heredity,
  ...meteorology,
  ...proteinModeling,
  ...remoteSensing,
  ...rocksAndMinerals,
  ...solarSystem,
  ...thermodynamics,
  ...waterQuality,
};

/** Replaces each checkpoint question's explanation with its written explanation, if one exists. */
export function withExplanations(course: EventLessons): EventLessons {
  return {
    ...course,
    lessons: course.lessons.map((lesson) => ({
      ...lesson,
      practice: lesson.practice.map((question) => {
        const explanation = lessonExplanations[question.id];
        return explanation ? { ...question, explanation } : question;
      }),
    })),
  };
}
