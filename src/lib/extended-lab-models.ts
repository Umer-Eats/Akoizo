export const gasR = 8.314;
export type GasPath = 'isothermal' | 'isobaric' | 'isochoric' | 'adiabatic';
export function gasProcess(path: GasPath, ratio: number, temperatureRatio = 1.5) {
  const t1 = 300,
    v1 = 0.01,
    gamma = 5 / 3,
    cv = 1.5 * gasR;
  const v2 = path === 'isochoric' ? v1 : v1 * ratio;
  const t2 =
    path === 'isothermal'
      ? t1
      : path === 'isobaric'
        ? t1 * ratio
        : path === 'isochoric'
          ? t1 * temperatureRatio
          : t1 * ratio ** (1 - gamma);
  const du = cv * (t2 - t1);
  const work =
    path === 'isothermal'
      ? gasR * t1 * Math.log(ratio)
      : path === 'isobaric'
        ? gasR * (t2 - t1)
        : path === 'isochoric'
          ? 0
          : -du;
  const heat = du + work;
  const entropy = cv * Math.log(t2 / t1) + gasR * Math.log(v2 / v1);
  return { t1, t2, v1, v2, p1: (gasR * t1) / v1, p2: (gasR * t2) / v2, du, work, heat, entropy };
}
export function waterHeating(mass: number, energyKJ: number) {
  // One-atmosphere teaching values; start with ice at -20 C.
  const e = energyKJ / mass;
  if (e < 42) return { temperature: -20 + e / 2.1, phase: 'Ice warming', fraction: null };
  if (e <= 376) return { temperature: 0, phase: 'Melting: ice + liquid', fraction: (e - 42) / 334 };
  if (e < 794) return { temperature: (e - 376) / 4.18, phase: 'Liquid warming', fraction: null };
  if (e <= 3054)
    return { temperature: 100, phase: 'Boiling: liquid + vapor', fraction: (e - 794) / 2260 };
  return { temperature: 100 + (e - 3054) / 2, phase: 'Vapor warming', fraction: null };
}
export function strongTitration(baseML: number, baseM: number) {
  const volumeL = (25 + baseML) / 1000;
  const excess = (0.0025 - (baseM * baseML) / 1000) / volumeL;
  const kw = 1e-14,
    root = Math.sqrt(excess * excess + 4 * kw);
  // Stable quadratic root in the base-excess region avoids cancellation.
  const h = excess >= 0 ? (excess + root) / 2 : (2 * kw) / (root - excess);
  return { ph: -Math.log10(h), equivalenceML: 2.5 / baseM, excess, volumeL };
}
export function resistorNetwork(
  v: number,
  r1: number,
  r2: number,
  parallel: boolean,
  closed = true,
) {
  const resistance = parallel ? 1 / (1 / r1 + 1 / r2) : r1 + r2;
  const current = closed ? v / resistance : 0;
  const i1 = closed ? (parallel ? v / r1 : current) : 0,
    i2 = closed ? (parallel ? v / r2 : current) : 0;
  return { resistance, current, i1, i2, v1: i1 * r1, v2: i2 * r2, power: v * current };
}
export type Gate = 'AND' | 'OR' | 'XOR' | 'NAND' | 'NOR';
export function gateOutput(g: Gate, a: boolean, b: boolean) {
  return g === 'AND'
    ? a && b
    : g === 'OR'
      ? a || b
      : g === 'XOR'
        ? a !== b
        : g === 'NAND'
          ? !(a && b)
          : !(a || b);
}
export function cross(parent1: string, parent2: string) {
  const cells = [...parent1].flatMap((a) => [...parent2].map((b) => [a, b].sort().join('')));
  return {
    cells,
    AA: cells.filter((g) => g === 'AA').length / 4,
    Aa: cells.filter((g) => g === 'Aa').length / 4,
    aa: cells.filter((g) => g === 'aa').length / 4,
  };
}
export function runoff(rainMM: number, areaKM2: number, fraction: number, durationHours: number) {
  const volume = rainMM * areaKM2 * 1000 * fraction;
  return { volume, peak: (2 * volume) / (durationHours * 3600) };
}
export function darcy(k: number, area: number, drop: number, length: number) {
  return { gradient: drop / length, flow: (k * area * drop) / length };
}
export function chainCoordinates(compaction: number) {
  return Array.from({ length: 24 }, (_, i) => {
    const t = i * 0.8;
    return {
      x: (i - 11.5) * (1 - compaction / 125) * 0.5,
      y: Math.sin(t) * (1 + compaction / 50),
      z: Math.cos(t) * (1 + compaction / 50),
    };
  });
}
export function chainContacts(points: ReturnType<typeof chainCoordinates>, cutoff: number) {
  let n = 0;
  for (let i = 0; i < points.length; i++)
    for (let j = i + 3; j < points.length; j++) {
      const a = points[i],
        b = points[j];
      if (Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) < cutoff) n++;
    }
  return n;
}
