// Declarative kit for lesson-specific virtual labs.
// A lab is pure data plus a pure `run` function, so every model is unit-testable in Node and
// the same renderer draws all of them. Scenes use a fixed 640 × 340 coordinate space.
export type LabValues = Record<string, number>;
export type LabControl = {
  key: string;
  label: string;
  initial: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  // A select stores the option index; a toggle stores 0 or 1.
  options?: string[];
  toggle?: boolean;
};
export type Tone = 'ink' | 'accent' | 'slot' | 'warm' | 'cool' | 'green' | 'gold' | 'muted';
export type Shape =
  | { k: 'line'; x1: number; y1: number; x2: number; y2: number; tone: Tone; w: number; dash: boolean }
  | { k: 'rect'; x: number; y: number; w: number; h: number; tone: Tone; fill: boolean; o: number; rx: number }
  | { k: 'circle'; x: number; y: number; r: number; tone: Tone; fill: boolean; o: number }
  | { k: 'ellipse'; x: number; y: number; rx: number; ry: number; tone: Tone; fill: boolean; o: number }
  | { k: 'path'; d: string; tone: Tone; fill: boolean; w: number; o: number; dash: boolean }
  | { k: 'text'; x: number; y: number; s: string; anchor: 'start' | 'middle' | 'end'; tone: Tone; size: number };

export const line = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  tone: Tone = 'ink',
  w = 2,
  dash = false,
): Shape => ({ k: 'line', x1, y1, x2, y2, tone, w, dash });
export const rect = (
  x: number,
  y: number,
  w: number,
  h: number,
  tone: Tone = 'ink',
  fill = false,
  o = 1,
  rx = 0,
): Shape => ({ k: 'rect', x, y, w: Math.max(0, w), h: Math.max(0, h), tone, fill, o, rx });
export const circle = (
  x: number,
  y: number,
  r: number,
  tone: Tone = 'ink',
  fill = true,
  o = 1,
): Shape => ({ k: 'circle', x, y, r: Math.max(0, r), tone, fill, o });
export const ellipse = (
  x: number,
  y: number,
  rx: number,
  ry: number,
  tone: Tone = 'ink',
  fill = true,
  o = 1,
): Shape => ({ k: 'ellipse', x, y, rx: Math.max(0, rx), ry: Math.max(0, ry), tone, fill, o });
export const path = (
  d: string,
  tone: Tone = 'ink',
  fill = false,
  w = 2,
  o = 1,
  dash = false,
): Shape => ({ k: 'path', d, tone, fill, w, o, dash });
export const text = (
  x: number,
  y: number,
  s: string,
  anchor: 'start' | 'middle' | 'end' = 'start',
  tone: Tone = 'ink',
  size = 13,
): Shape => ({ k: 'text', x, y, s, anchor, tone, size });
export function arrow(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  tone: Tone = 'ink',
  w = 2,
): Shape[] {
  const a = Math.atan2(y2 - y1, x2 - x1),
    h = 9;
  const p = (t: number) => `${x2 - h * Math.cos(a + t)},${y2 - h * Math.sin(a + t)}`;
  return [line(x1, y1, x2, y2, tone, w), path(`M${p(0.45)}L${x2},${y2}L${p(-0.45)}Z`, tone, true, 1)];
}
// Sampled polyline for scenes that need a curve outside the standard plot.
export function trace(
  f: (t: number) => [number, number],
  from: number,
  to: number,
  tone: Tone = 'accent',
  n = 80,
  w = 2.5,
): Shape {
  const d = Array.from({ length: n + 1 }, (_, i) => {
    const [x, y] = f(from + ((to - from) * i) / n);
    return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join('');
  return path(d, tone, false, w);
}

export type LabPlot = {
  title?: string;
  x: [min: number, max: number, label: string];
  y: [min: number, max: number, label: string];
  curves: { f: (x: number) => number; label?: string; tone?: Tone; dash?: boolean }[];
  points?: { x: number; y: number; label?: string; tone?: Tone }[];
  vlines?: { x: number; label?: string }[];
  hlines?: { y: number; label?: string }[];
};
export type LabBars = {
  title?: string;
  max?: number;
  items: { label: string; value: number; tone?: Tone }[];
};
export type LabResult = {
  // Raw numeric outputs: used by missions, recorded trials, and tests.
  o: Record<string, number>;
  metrics: { label: string; value: number | string; unit?: string }[];
  scene?: Shape[];
  sceneLabel?: string;
  plot?: LabPlot;
  bars?: LabBars;
  note?: string;
};
export type LabMission = {
  goal: string;
  hint: string;
  // One setting (merged over the defaults) that reaches the goal; tests prove it does.
  at: LabValues;
  done: (o: Record<string, number>, v: LabValues) => boolean;
};
export const goal = (
  text: string,
  hint: string,
  at: LabValues,
  done: LabMission['done'],
): LabMission => ({ goal: text, hint, at, done });
export type LabPrediction = { q: string; options: string[]; correct: number; why: string };
export type TopicLab = {
  id: string;
  title: string;
  lead: string;
  controls: LabControl[];
  run: (v: LabValues) => LabResult;
  missions: LabMission[];
  predict: LabPrediction;
  model: string;
};

export const slider = (
  key: string,
  label: string,
  min: number,
  max: number,
  step: number,
  initial: number,
  unit = '',
): LabControl => ({ key, label, min, max, step, initial, unit });
export const choice = (key: string, label: string, options: string[], initial = 0): LabControl => ({
  key,
  label,
  options,
  initial,
});
export const toggle = (key: string, label: string, initial = 0): LabControl => ({
  key,
  label,
  toggle: true,
  initial,
});

export function labDefaults(lab: TopicLab): LabValues {
  return Object.fromEntries(lab.controls.map((c) => [c.key, c.initial]));
}
// Bound imported or programmatic values exactly as the rendered controls would.
export function clampValues(lab: TopicLab, input: LabValues): LabValues {
  return Object.fromEntries(
    lab.controls.map((c) => {
      const raw = Number.isFinite(input[c.key]) ? input[c.key] : c.initial;
      if (c.options) return [c.key, Math.min(c.options.length - 1, Math.max(0, Math.round(raw)))];
      if (c.toggle) return [c.key, raw >= 0.5 ? 1 : 0];
      return [c.key, Math.min(c.max ?? raw, Math.max(c.min ?? raw, raw))];
    }),
  );
}
export const runLab = (lab: TopicLab, input: LabValues) => lab.run(clampValues(lab, input));

export const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
export const near = (a: number, b: number, tolerance: number) => Math.abs(a - b) <= tolerance;
export const round = (n: number, digits = 2) => Number(n.toFixed(digits));
// Deterministic pseudo-random sequence so "sampling" labs are reproducible and testable.
export function seeded(seed: number) {
  let s = Math.floor(seed) % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
