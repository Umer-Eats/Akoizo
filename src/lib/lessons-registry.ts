import type { EventLessons } from './lessons';
import { anatomyLessons } from './lessons-anatomy.ts';
import { forensicsLessons } from './lessons-forensics.ts';
import type { Division } from './events';

const registry: Record<string, EventLessons> = {
  'anatomy-and-physiology': anatomyLessons,
  forensics: forensicsLessons,
};

export function lessonsForEvent(eventId: string, division: Division): EventLessons | null {
  return division === 'C' ? (registry[eventId] ?? null) : null;
}
