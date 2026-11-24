import type { Division } from './events.ts';

// Existing school tournament groups.
export const eventSlots = [
  {
    color: 'pink',
    label: 'Pink',
    events: ['anatomy-and-physiology', 'engineering-cad', 'forensics'],
  },
  {
    color: 'yellow',
    label: 'Yellow',
    events: ['codebusters', 'remote-sensing', 'disease-detectives'],
  },
  { color: 'purple', label: 'Purple', events: ['astronomy', 'botany', 'experimental-design'] },
  { color: 'blue', label: 'Blue', events: ['chemistry-lab', 'rocks-and-minerals'] },
  { color: 'green', label: 'Green', events: ['circuit-lab', 'water-quality', 'protein-modeling'] },
  {
    color: 'orange',
    label: 'Orange',
    events: ['designer-genes', 'dynamic-planet', 'thermodynamics'],
  },
] as const;

// 2027 Division B Rules Manual, p. B74. Blocks are ordered by the teams 1–10 rotation.
const divisionBSlots = [
  {
    color: 'yellow',
    label: 'Yellow',
    events: ['codebusters', 'disease-detectives', 'remote-sensing'],
  },
  {
    color: 'orange',
    label: 'Orange',
    events: ['experimental-design', 'solar-system', 'water-quality'],
  },
  { color: 'purple', label: 'Purple', events: ['botany', 'meteorology'] },
  { color: 'green', label: 'Green', events: ['circuit-lab', 'dynamic-planet', 'food-science'] },
  { color: 'blue', label: 'Blue', events: ['heredity', 'rocks-and-minerals', 'thermodynamics'] },
  {
    color: 'pink',
    label: 'Pink',
    events: ['anatomy-and-physiology', 'crime-busters', 'write-it-do-it'],
  },
  {
    color: 'gray',
    label: 'Gray',
    events: [
      'boomilever',
      'elastic-launched-gliders',
      'hovercraft',
      'ping-pong-parachute',
      'roller-coaster',
      'scrambler',
    ],
  },
] as const;

type EventSlot = (typeof eventSlots | typeof divisionBSlots)[number];

export function slotsForDivision(division: Division): readonly EventSlot[] {
  return division === 'B' ? divisionBSlots : eventSlots;
}

export function slotForEvent(id: string, division: Division) {
  return slotsForDivision(division).find((slot) => (slot.events as readonly string[]).includes(id));
}

export function eventSlotLabel(slot: EventSlot) {
  return slot.color === 'gray' ? 'Self-scheduled builds' : `${slot.label} timeslot`;
}
