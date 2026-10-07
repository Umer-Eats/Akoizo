// Tournament timeslot groups supplied by the school; these are not clock times.
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

export function slotForEvent(id: string) {
  return eventSlots.find((slot) => (slot.events as readonly string[]).includes(id));
}
