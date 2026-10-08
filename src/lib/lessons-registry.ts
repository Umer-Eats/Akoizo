import type { EventLessons } from './lessons';
import { anatomyLessons } from './lessons-anatomy';
import { forensicsLessons } from './lessons-forensics';

const registry: Record<string, EventLessons> = {
  'anatomy-and-physiology': anatomyLessons,
  forensics: forensicsLessons,
};

export function lessonsForEvent(eventId: string): EventLessons | null {
  return registry[eventId] ?? null;
}
