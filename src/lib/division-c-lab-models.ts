import type { LabActivity, LabModel } from './division-c-labs';

export type LabValues = Record<string, number>;
export type Reading = { label: string; value: number; unit: string };
export type LabResult = {
  readings: Reading[];
  answer: number;
  diagram: number[];
  ready: boolean;
  hint?: string;
};
export function initialLabValues(lab: LabActivity): LabValues {
  return Object.fromEntries(lab.controls.map((c) => [c.key, c.initial]));
}
const reading = (label: string, value: number, unit: string): Reading => ({ label, value, unit });
// Scenario indexes are bounded to keep every generated unknown measurable in the control ranges.
export function sampleNumber(scenario: number) {
  return ((Math.trunc(scenario) % 5) + 5) % 5;
}
export function absorptionMass(area: number, soak: number, replicate: number, scenario: number) {
  const capacity = 0.08 + sampleNumber(scenario) * 0.005;
  const variation = [-0.03, 0.01, 0.02, -0.015, 0.015][replicate - 1] ?? 0;
  return area * capacity * (1 - Math.exp(-soak / 15)) * (1 + variation);
}
export function calculateLab(model: LabModel, v: LabValues, scenario = 0): LabResult {
  const s = sampleNumber(scenario);
  switch (model) {
    case 'kinetics': {
      const k = (0.012 + s * 0.002) * Math.exp((35000 / 8.314) * (1 / 298 - 1 / v.temperature));
      const a0 = 0.01 * v.concentration,
        a = a0 * Math.exp(-k * v.time);
      return {
        readings: [
          reading('Absorbance A', a, 'AU'),
          reading('Initial absorbance A₀', a0, 'AU'),
          reading('Elapsed time', v.time, 's'),
        ],
        answer: k,
        diagram: [a, a0],
        ready: v.time > 0,
        hint: 'Choose a nonzero reaction time to estimate k.',
      };
    }
    case 'colorimetry': {
      const unknown = 30 + 10 * s,
        a = v.concentration * 0.01 * v.path,
        au = unknown * 0.01 * v.path;
      return {
        readings: [
          reading('Standard absorbance', a, 'AU'),
          reading('Unknown absorbance', au, 'AU'),
          reading('Path length', v.path, 'cm'),
        ],
        answer: unknown,
        diagram: [a, au],
        ready: true,
      };
    }
    case 'circuit': {
      const resistance = v.parallel ? (v.r1 * v.r2) / (v.r1 + v.r2) : v.r1 + v.r2;
      const current = v.closed ? v.voltage / resistance : 0;
      const voltage1 = v.closed ? (v.parallel ? v.voltage : current * v.r1) : 0;
      return {
        readings: [
          reading('Ammeter', current * 1000, 'mA'),
          reading('Voltmeter across R₁', voltage1, 'V'),
          reading('Battery power', v.voltage * current, 'W'),
        ],
        answer: resistance,
        diagram: [current, voltage1],
        ready: true,
      };
    }
    case 'bridge': {
      const rx = 100 + s * 50,
        left = (v.voltage * v.r2) / (v.r1 + v.r2),
        right = (v.voltage * rx) / (v.r3 + rx);
      return {
        readings: [
          reading('Detector: Vleft − Vright', left - right, 'V'),
          reading('Left midpoint', left, 'V'),
          reading('Right midpoint', right, 'V'),
        ],
        answer: rx,
        diagram: [left, right],
        ready: Math.abs(left - right) < 0.01,
        hint: 'Adjust R₃ until the detector is within 0.01 V of zero before checking Rx.',
      };
    }
    case 'chromatography': {
      const rf = [0.85, 0.7, 0.6, 0.75, 0.8][s];
      return {
        readings: [
          reading('Solvent front', v.front, 'cm'),
          reading('Upper trace spot', v.front * rf, 'cm'),
          reading('Lower trace spot', v.front * 0.3, 'cm'),
        ],
        answer: rf,
        diagram: [rf, 0.3, s % 2],
        ready: true,
      };
    }
    case 'salinometer': {
      const unknown = 10 + 5 * s,
        density = 0.9982 + 0.00075 * v.salinity;
      const depth = v.mass / (0.2 * density),
        unknownDepth = v.mass / (0.2 * (0.9982 + 0.00075 * unknown));
      return {
        readings: [
          reading('Standard immersion', depth, 'cm'),
          reading('Unknown immersion', unknownDepth, 'cm'),
          reading('Standard density', density, 'g/cm³'),
        ],
        answer: unknown,
        diagram: [depth, unknownDepth],
        ready: true,
      };
    }
    case 'bod': {
      const demand = 6 + s,
        final = v.initial - (demand * v.fraction * v.day) / 5;
      return {
        readings: [
          reading('Bottle dissolved oxygen', final, 'mg/L'),
          reading('Oxygen consumed', v.initial - final, 'mg/L'),
          reading('Elapsed incubation', v.day, 'days'),
        ],
        answer: demand,
        diagram: [final, v.initial],
        ready: v.day === 5,
        hint: 'Advance incubation to day 5 before calculating BOD₅.',
      };
    }
    case 'absorption': {
      const mass = absorptionMass(v.area, v.soak, v.replicate, scenario);
      const mean =
        [1, 2, 3].reduce((sum, r) => sum + absorptionMass(v.area, v.soak, r, scenario), 0) / 3;
      return {
        readings: [
          reading('Water absorbed', mass, 'g'),
          reading('Dry towel area', v.area, 'cm²'),
          reading('Replicate', v.replicate, ''),
        ],
        answer: mean,
        diagram: [mass, v.area],
        ready: true,
      };
    }
  }
}
export function checkLabAnswer(input: string, expected: number) {
  if (!input.trim()) return 'Enter a numerical answer first.';
  const value = Number(input);
  if (!Number.isFinite(value)) return 'Enter a finite number, using a decimal point if needed.';
  return Math.abs(value - expected) <= Math.max(Math.abs(expected) * 0.02, 0.0002)
    ? 'Correct within 2%. Use your recorded measurements to explain the result.'
    : 'Not yet. Check the units and calculation, then try again. A 2% rounding tolerance is allowed.';
}
export type LabPoint = { x: number; y: number };
export function labPlot(lab: LabActivity, v: LabValues, scenario: number, transform = 'A') {
  const key = lab.model === 'bridge' ? 'r3' : lab.model === 'bod' ? 'day' : lab.controls[0].key;
  const control = lab.controls.find((c) => c.key === key)!;
  const mapY = (values: LabValues) => {
    const value = calculateLab(lab.model, values, scenario).readings[
      lab.model === 'chromatography' ? 1 : 0
    ].value;
    return lab.model === 'kinetics'
      ? transform === 'ln(A)'
        ? Math.log(value)
        : transform === '1/A'
          ? 1 / value
          : value
      : value;
  };
  const points = Array.from({ length: 41 }, (_, i) => {
    const x = control.min + ((control.max - control.min) * i) / 40;
    return { x, y: mapY({ ...v, [key]: x }) };
  });
  const reading = calculateLab(lab.model, v, scenario).readings[
    lab.model === 'chromatography' ? 1 : 0
  ];
  return {
    points,
    current: { x: v[key], y: mapY(v) },
    xLabel: `${control.label} (${control.unit || 'setting'})`,
    yLabel:
      lab.model === 'kinetics'
        ? `${transform}${transform === 'A' ? ' (AU)' : ''}`
        : `${reading.label} (${reading.unit})`,
  };
}
