import type { EventLessons } from './lessons';
import { boomileverLessonsB, boomileverLessonsC } from './lessons-boomilever.ts';
import { electricVehicleLessons } from './lessons-electric-vehicle.ts';
import { elasticGlidersLessons } from './lessons-elastic-gliders.ts';
import { hovercraftLessonsB, hovercraftLessonsC } from './lessons-hovercraft.ts';
import { missionPossibleLessons } from './lessons-mission-possible.ts';
import {
  pingPongParachuteLessonsB,
  pingPongParachuteLessonsC,
} from './lessons-ping-pong-parachute.ts';
import { rollerCoasterLessons } from './lessons-roller-coaster.ts';
import { scramblerLessons } from './lessons-scrambler.ts';
import { wrightStuffLessons } from './lessons-wright-stuff.ts';

// Build-event courses. Engineering CAD is intentionally not covered.
export const buildCoursesC: EventLessons[] = [
  boomileverLessonsC,
  electricVehicleLessons,
  hovercraftLessonsC,
  missionPossibleLessons,
  pingPongParachuteLessonsC,
  wrightStuffLessons,
];

export const buildCoursesB: EventLessons[] = [
  boomileverLessonsB,
  elasticGlidersLessons,
  hovercraftLessonsB,
  pingPongParachuteLessonsB,
  rollerCoasterLessons,
  scramblerLessons,
];
