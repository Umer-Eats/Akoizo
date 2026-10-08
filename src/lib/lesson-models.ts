import type { LessonSim } from './lessons';

export type ModelId = Extract<LessonSim, { kind: 'model' }>['model'];
type Control = {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  initial: number;
  unit: string;
};
type Metric = { label: string; value: number; unit: string };
export type ModelResult = {
  metrics: Metric[];
  bars: { label: string; value: number }[];
  equation: string;
  interpretation: string;
};
const control = (
  key: string,
  label: string,
  min: number,
  max: number,
  step: number,
  initial: number,
  unit: string,
): Control => ({ key, label, min, max, step, initial, unit });
export const modelControls: Record<ModelId, Control[]> = {
  feedback: [
    control('disturbance', 'Initial deviation from set point', -10, 10, 1, 8, 'units'),
    control('gain', 'Correction per step', 0, 1, 0.1, 0.3, 'fraction'),
    control('steps', 'Elapsed steps', 0, 12, 1, 4, 'steps'),
  ],
  airway: [
    control('radius', 'Airway radius relative to baseline', 30, 150, 5, 100, '%'),
    control('pressure', 'Driving pressure relative to baseline', 50, 200, 10, 100, '%'),
  ],
  ventilation: [
    control('tidal', 'Tidal volume', 150, 900, 50, 500, 'mL'),
    control('rate', 'Breathing rate', 6, 40, 1, 12, 'breaths/min'),
    control('dead', 'Dead space per breath', 100, 150, 10, 150, 'mL'),
  ],
  diffusion: [
    control('area', 'Exchange area', 10, 150, 10, 100, '% of baseline'),
    control('gradient', 'Pressure gradient', 10, 150, 10, 100, '% of baseline'),
    control('thickness', 'Membrane thickness', 50, 300, 10, 100, '% of baseline'),
  ],
  digestion: [
    control('load', 'Lactose entering the small intestine', 0, 50, 1, 20, 'g'),
    control('capacity', 'Lactose hydrolyzed during transit', 0, 50, 1, 12, 'g capacity'),
  ],
  immune: [
    control('day', 'Time since exposure', 0, 28, 1, 7, 'days'),
    control('memory', 'Memory to this antigen', 0, 1, 1, 0, '0 = absent; 1 = present'),
  ],
  density: [
    control('sample', 'Sample density', 0.85, 1.45, 0.01, 0.95, 'g/mL'),
    control('liquid', 'Liquid density', 0.8, 1.5, 0.01, 1, 'g/mL'),
  ],
  chromatography: [
    control('front', 'Solvent-front distance', 2, 10, 0.5, 8, 'cm'),
    control('rf', 'Spot migration as fraction of front', 0.05, 0.95, 0.05, 0.5, 'Rf'),
  ],
  bloodstain: [
    control('length', 'Major axis of ideal stain', 5, 20, 1, 10, 'mm'),
    control('ratio', 'Width / length ratio', 0.1, 1, 0.05, 0.5, 'ratio'),
  ],
  thermal: [
    control('temperature', 'Constant temperature', 6, 30, 1, 20, '°C'),
    control('base', 'Species development threshold', 4, 12, 1, 6, '°C'),
    control('hours', 'Time at this temperature', 0, 72, 1, 24, 'h'),
  ],
};

export function modelDefaults(id: ModelId) {
  return Object.fromEntries(modelControls[id].map((item) => [item.key, item.initial]));
}

export function calculateModel(id: ModelId, input: Record<string, number>): ModelResult {
  // Bound imported/programmatic values as well as UI slider values.
  const v = Object.fromEntries(
    modelControls[id].map((c) => [
      c.key,
      Math.min(c.max, Math.max(c.min, Number.isFinite(input[c.key]) ? input[c.key] : c.initial)),
    ]),
  );
  const metric = (label: string, value: number, unit: string) => ({ label, value, unit });
  switch (id) {
    case 'feedback': {
      const remaining = v.disturbance * (1 - v.gain) ** v.steps;
      return {
        metrics: [
          metric('Remaining deviation', remaining, 'units'),
          metric('Deviation corrected', v.disturbance - remaining, 'units'),
        ],
        bars: [
          { label: 'Initial deviation (magnitude)', value: Math.abs(v.disturbance) },
          { label: 'Remaining deviation (magnitude)', value: Math.abs(remaining) },
        ],
        equation: 'error after n steps = initial error × (1 − correction fraction)ⁿ',
        interpretation:
          'A negative-feedback response reduces the deviation. This discrete model omits delays, saturation, changing set points, and interacting control loops; the units do not represent a clinical measurement.',
      };
    }
    case 'airway': {
      const resistance = (100 / v.radius) ** 4;
      const flow = v.pressure / 100 / resistance;
      return {
        metrics: [
          metric('Relative resistance', resistance, '× baseline'),
          metric('Relative airflow', flow, '× baseline'),
        ],
        bars: [
          { label: 'Baseline airflow', value: 1 },
          { label: 'Model airflow', value: flow },
        ],
        equation: 'R ∝ 1/r⁴; flow ∝ driving pressure / resistance',
        interpretation:
          'Poiseuille approximation: a rigid cylindrical tube, constant viscosity and length, steady laminar flow. Real branching airways are compliant and may have turbulent flow. Halving radius requires sixteen times the pressure to preserve flow in this model.',
      };
    }
    case 'ventilation': {
      const minute = (v.tidal * v.rate) / 1000;
      const alveolar = (Math.max(0, v.tidal - v.dead) * v.rate) / 1000;
      return {
        metrics: [
          metric('Minute ventilation', minute, 'L/min'),
          metric('Alveolar ventilation', alveolar, 'L/min'),
          metric('Dead-space ventilation', minute - alveolar, 'L/min'),
        ],
        bars: [
          { label: 'Minute ventilation', value: minute },
          { label: 'Alveolar ventilation', value: alveolar },
        ],
        equation: 'V̇E = VT × f; V̇A = (VT − VD) × f; divide mL by 1000 for L',
        interpretation:
          'Equal minute ventilation does not guarantee equal fresh air reaching gas-exchanging regions. The model assumes a fixed dead space per breath and does not calculate oxygen saturation or account for perfusion.',
      };
    }
    case 'diffusion': {
      const flux = (v.area * v.gradient) / v.thickness;
      return {
        metrics: [metric('Relative diffusion rate', flux, '% of baseline')],
        bars: [
          { label: 'Baseline transfer', value: 100 },
          { label: 'Model transfer', value: flux },
        ],
        equation: 'relative gas transfer = area × pressure gradient / thickness (normalized)',
        interpretation:
          'This is a normalized Fick-law model, holding gas diffusivity constant. It isolates membrane effects and does not model hemoglobin binding, capillary transit, perfusion, or a clinical oxygen level.',
      };
    }
    case 'digestion': {
      const digested = Math.min(v.load, v.capacity);
      return {
        metrics: [
          metric('Lactose hydrolyzed', digested, 'g'),
          metric('Lactose reaching colon', v.load - digested, 'g'),
        ],
        bars: [
          { label: 'Hydrolyzed in small intestine', value: digested },
          { label: 'Unhydrolyzed load', value: v.load - digested },
        ],
        equation: 'unhydrolyzed load = max(0, lactose intake − hydrolysis capacity)',
        interpretation:
          'A mass-balance teaching model: remaining lactose can retain water and be fermented. Capacity is a chosen assumption, not a measured lactase dose. Symptoms also depend on transit, microbiota, and sensitivity; this does not predict symptom severity or recommend an intake.',
      };
    }
    case 'immune': {
      const memory = v.memory >= 0.5;
      const lag = memory ? 1 : 4;
      const t = Math.max(0, v.day - lag);
      const response = (memory ? 2.5 : 1) * t ** 2 * Math.exp(-t / (memory ? 3 : 4));
      const primaryT = Math.max(0, v.day - 4);
      const primary = primaryT ** 2 * Math.exp(-primaryT / 4);
      return {
        metrics: [
          metric('Modeled antibody response', response, 'arbitrary units'),
          metric('Assumed activation lag', lag, 'days'),
        ],
        bars: [
          { label: 'Primary response at this day', value: primary },
          { label: 'Selected response at this day', value: response },
        ],
        equation: 'illustrative response = scale × t² × e^(−t/decay), t = max(0, day − lag)',
        interpretation:
          'A conceptual curve, not a fitted biological law. Memory produces an earlier, larger modeled response to the same antigen. Antigen type, vaccine, immunodeficiency, antibody class, and individual variation change actual responses.',
      };
    }
    case 'density': {
      const ratio = v.sample / v.liquid;
      return {
        metrics: [
          metric('Sample / liquid density', ratio, 'ratio'),
          metric('Submerged fraction if floating', Math.min(1, ratio) * 100, '%'),
        ],
        bars: [
          { label: 'Sample density', value: v.sample },
          { label: 'Liquid density', value: v.liquid },
        ],
        equation: 'for a floating object: submerged fraction = ρsample / ρliquid',
        interpretation:
          Math.abs(v.sample - v.liquid) < 0.0001
            ? 'Ideal neutral buoyancy: sample and liquid have equal density. Bubbles, fillers, temperature, and measurement error complicate a real identification.'
            : v.sample < v.liquid
              ? 'The ideal sample floats. A lower-density liquid may make it sink. Density brackets narrow candidates; they cannot identify a polymer alone.'
              : 'The ideal sample sinks. Increasing liquid density above the sample density makes it float. Shape and trapped air can mislead real flotation tests.',
      };
    }
    case 'chromatography': {
      const spot = v.front * v.rf;
      return {
        metrics: [
          metric('Spot distance from baseline', spot, 'cm'),
          metric('Retention factor', spot / v.front, '(unitless)'),
        ],
        bars: [
          { label: 'Solvent front from baseline', value: v.front },
          { label: 'Spot center from baseline', value: spot },
        ],
        equation: 'Rf = distance traveled by spot center / distance traveled by solvent front',
        interpretation:
          'Move the front while holding Rf constant to model one compound under unchanged conditions. Changing the Rf slider represents a different affinity or condition, not elapsed time. Compare samples on the same plate; an Rf agreement is not proof of identity.',
      };
    }
    case 'bloodstain': {
      const width = v.length * v.ratio;
      const angle = (Math.asin(v.ratio) * 180) / Math.PI;
      return {
        metrics: [
          metric('Minor axis', width, 'mm'),
          metric('Impact angle from surface', angle, 'degrees'),
        ],
        bars: [
          { label: 'Major axis', value: v.length },
          { label: 'Minor axis', value: width },
        ],
        equation: 'impact angle = arcsin(width / length); measure ellipse body, exclude tails',
        interpretation:
          'Ideal elliptical-stain geometry on a smooth, flat surface. A circle indicates a near-perpendicular impact; an elongated ellipse indicates a shallow impact. Surface texture, satellite stains, and measurement uncertainty limit inference. One stain does not reveal a complete trajectory.',
      };
    }
    case 'thermal': {
      const degreeHours = Math.max(0, v.temperature - v.base) * v.hours;
      return {
        metrics: [
          metric('Thermal accumulation', degreeHours, 'degree-hours'),
          metric(
            'Effective temperature',
            Math.max(0, v.temperature - v.base),
            '°C above threshold',
          ),
        ],
        bars: [
          { label: 'Current thermal accumulation', value: degreeHours },
          { label: 'Reference: 24 h at 20 °C, base 6 °C', value: 336 },
        ],
        equation: 'ADH = Σ max(0, temperature − developmental threshold) × hours',
        interpretation:
          'A simplified linear development model over the displayed range. Real species have upper limits and validated stage requirements. Insect age estimates time since colonization; delayed access means it does not automatically equal time since death.',
      };
    }
  }
}
