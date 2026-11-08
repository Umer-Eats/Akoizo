import { eventSlots } from '@/lib/event-slots';
import type { ScienceEvent } from '@/lib/events';

// Events are the only coloured things on the landing pages: each takes its tournament timeslot colour.
export type SlotGroup = { color: string; label: string; events: ScienceEvent[] };

export function groupBySlot(events: ScienceEvent[]): SlotGroup[] {
  const groups: SlotGroup[] = eventSlots.map((slot) => ({
    color: slot.color,
    label: `${slot.label} timeslot`,
    events: events.filter((event) => (slot.events as readonly string[]).includes(event.id)),
  }));
  const placed = new Set(groups.flatMap((group) => group.events.map((event) => event.id)));
  groups.push({
    color: 'unassigned',
    label: 'Builds and other events',
    events: events.filter((event) => !placed.has(event.id)),
  });
  return groups.filter((group) => group.events.length);
}

export function slotColor(id: string) {
  return eventSlots.find((slot) => (slot.events as readonly string[]).includes(id))?.color;
}
