import type { ModelId } from './lesson-models';
export type ExperimentPreset = { title: string; inputs: Record<string, number> };
export const experimentPresets: Record<ModelId, ExperimentPreset[]> = {
  feedback: [
    { title: 'No corrective response', inputs: { gain: 0, steps: 4 } },
    { title: 'Stronger corrective response', inputs: { gain: 0.5, steps: 4 } },
    { title: 'Reverse the disturbance', inputs: { disturbance: -8, gain: 0.3, steps: 4 } },
  ],
  airway: [
    { title: 'Narrow the radius by half', inputs: { radius: 50, pressure: 100 } },
    { title: 'Narrow airway, double pressure', inputs: { radius: 50, pressure: 200 } },
    { title: 'Wider airway, same pressure', inputs: { radius: 125, pressure: 100 } },
  ],
  ventilation: [
    { title: 'Rapid shallow breathing', inputs: { tidal: 250, rate: 24, dead: 150 } },
    { title: 'Slower deeper breathing', inputs: { tidal: 750, rate: 8, dead: 150 } },
    { title: 'Lower dead space', inputs: { tidal: 500, rate: 12, dead: 100 } },
  ],
  diffusion: [
    { title: 'Double barrier thickness', inputs: { thickness: 200, area: 100, gradient: 100 } },
    { title: 'Area loss plus thickening', inputs: { area: 50, thickness: 200, gradient: 100 } },
    {
      title: 'Compensate partly with gradient',
      inputs: { area: 100, thickness: 250, gradient: 150 },
    },
  ],
  digestion: [
    { title: 'Low hydrolysis capacity', inputs: { load: 20, capacity: 5 } },
    { title: 'Capacity covers the load', inputs: { load: 20, capacity: 20 } },
    { title: 'Greater load, same capacity', inputs: { load: 30, capacity: 12 } },
  ],
  immune: [
    { title: 'Early primary response', inputs: { day: 3, memory: 0 } },
    { title: 'Early memory response', inputs: { day: 3, memory: 1 } },
    { title: 'Later memory response', inputs: { day: 14, memory: 1 } },
  ],
  density: [
    { title: 'Same sample in a lighter liquid', inputs: { sample: 0.95, liquid: 0.9 } },
    { title: 'Same sample in water', inputs: { sample: 0.95, liquid: 1 } },
    { title: 'Match the sample density', inputs: { sample: 0.95, liquid: 0.95 } },
  ],
  chromatography: [
    { title: 'Shorter solvent migration', inputs: { front: 4, rf: 0.5 } },
    { title: 'Longer migration, same affinity', inputs: { front: 10, rf: 0.5 } },
    { title: 'Greater relative spot migration', inputs: { front: 8, rf: 0.75 } },
  ],
  bloodstain: [
    { title: 'Double size, preserve shape', inputs: { length: 20, ratio: 0.5 } },
    { title: 'Elongated stain', inputs: { length: 10, ratio: 0.25 } },
    { title: 'Circular stain', inputs: { length: 10, ratio: 1 } },
  ],
  thermal: [
    { title: 'Longer time, lower temperature', inputs: { temperature: 13, base: 6, hours: 48 } },
    { title: 'Below the threshold', inputs: { temperature: 6, base: 12, hours: 24 } },
    { title: 'Warmer, same duration', inputs: { temperature: 25, base: 6, hours: 24 } },
  ],
};
