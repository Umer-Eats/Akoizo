import { check, phet, sort, type EventExtras } from '../lesson-extras.ts';
import {
  arrow,
  choice,
  circle,
  goal,
  line,
  near,
  path,
  rect,
  slider,
  text,
  trace,
  type TopicLab,
} from '../topic-lab-kit.ts';

const cooling: TopicLab = {
  id: 'therm-cooling',
  title: 'Approach to thermal equilibrium',
  lead: 'An object exchanges energy with its surroundings until no temperature difference is left to drive a net flow.',
  controls: [
    slider('t0', 'Object’s starting temperature', 0, 100, 5, 90, '°C'),
    slider('env', 'Surroundings temperature', 0, 40, 5, 20, '°C'),
    slider('k', 'Exchange constant', 0.01, 0.2, 0.01, 0.05, 'per min'),
    slider('t', 'Elapsed time', 0, 120, 1, 0, 'min'),
  ],
  run: (v) => {
    const temp = (t: number) => v.env + (v.t0 - v.env) * Math.exp(-v.k * t);
    const gap = temp(v.t) - v.env;
    return {
      o: { temp: temp(v.t), gap, half: Math.LN2 / v.k },
      metrics: [
        { label: 'Object temperature now', value: temp(v.t), unit: '°C' },
        { label: 'Difference from surroundings', value: gap, unit: 'K' },
        { label: 'Time for the difference to halve', value: Math.LN2 / v.k, unit: 'min' },
      ],
      plot: {
        title: 'The gap shrinks by the same fraction in equal times',
        x: [0, 120, 'Time (min)'],
        y: [0, 100, 'Temperature (°C)'],
        curves: [{ f: temp, label: 'object' }],
        hlines: [{ y: v.env, label: 'surroundings' }],
        points: [{ x: v.t, y: temp(v.t), label: `${temp(v.t).toFixed(1)} °C` }],
      },
    };
  },
  missions: [
    goal('Let the object come within 1 K of its surroundings.', 'Advance time; equilibrium is approached, never overshot.', { t: 120 }, (o, v) => v.t > 0 && Math.abs(o.gap) < 1),
    goal('With the starting settings, find the time at which the temperature difference has halved.', 'Half-time = ln 2 / k ≈ 0.693 / 0.05.', { t: 14 }, (o, v) => v.t0 === 90 && v.env === 20 && near(v.k, 0.05, 1e-6) && near(o.gap, 35, 1.2)),
    goal('Start the object colder than the room and watch which way energy flows.', 'Set the starting temperature below the surroundings, then advance time.', { t0: 5, env: 30, t: 20 }, (o, v) => v.t0 < v.env && v.t > 0),
  ],
  predict: {
    q: 'A cup cools from 60 K above room temperature to 30 K above in 14 minutes. Cooling from 30 K above to 15 K above takes about…',
    options: ['Another 14 minutes', '7 minutes', '28 minutes', 'It never gets that close'],
    correct: 0,
    why: 'When the exchange rate is proportional to the temperature difference, the difference decays exponentially: every halving takes the same time.',
  },
  model:
    'Newton’s law of cooling: T(t) = T_env + (T₀ − T_env)e^(−kt). Assumes a constant exchange coefficient, a uniform object temperature, and surroundings large enough not to change. Strong radiation or phase changes break the proportionality.',
};

const materials: [string, number][] = [
  ['Copper', 400],
  ['Aluminium', 237],
  ['Window glass', 0.8],
  ['Brick', 0.6],
  ['Wood', 0.12],
  ['Fibreglass batt', 0.04],
];
const conduction: TopicLab = {
  id: 'therm-conduction',
  title: 'Conduction through a wall',
  lead: 'Steady conduction depends on four things: what the wall is made of, its area, its thickness, and the temperature difference across it.',
  controls: [
    choice('mat', 'Wall material', materials.map(([name, k]) => `${name} · k = ${k} W/(m·K)`), 3),
    slider('area', 'Wall area', 0.5, 10, 0.5, 2, 'm²'),
    slider('thick', 'Thickness', 1, 30, 1, 10, 'cm'),
    slider('dt', 'Temperature difference', 5, 50, 5, 20, 'K'),
  ],
  run: (v) => {
    const k = materials[v.mat][1],
      power = (k * v.area * v.dt) / (v.thick / 100),
      w = 20 + v.thick * 6;
    return {
      o: { power, rvalue: v.thick / 100 / k },
      metrics: [
        { label: 'Heat flow rate', value: power, unit: 'W' },
        { label: 'Thermal resistance d/k', value: v.thick / 100 / k, unit: 'm²·K/W' },
        { label: 'Energy conducted in one hour', value: (power * 3600) / 1000, unit: 'kJ' },
      ],
      sceneLabel: `${materials[v.mat][0]} wall ${v.thick} centimetres thick conducting ${Math.round(power)} watts from the warm side to the cool side`,
      scene: [
        rect(40, 60, 230 - w / 2, 220, 'warm', true, 0.25),
        rect(270 + w / 2, 60, 330 - w / 2, 220, 'cool', true, 0.25),
        rect(270 - w / 2, 60, w, 220, 'muted', true, 0.55),
        text(60, 90, 'Warm side'),
        text(580, 90, 'Cool side', 'end'),
        text(270, 50, `${materials[v.mat][0]} · ${v.thick} cm`, 'middle'),
        ...arrow(120, 170, 420, 170, 'slot', Math.min(14, 1.5 + Math.log10(power + 1) * 2.2)),
        text(270, 310, `Arrow width tracks log(power): ${power.toPrecision(3)} W`, 'middle', 'muted'),
      ],
    };
  },
  missions: [
    goal('Starting from the brick wall, halve the heat flow by changing only the thickness.', 'Power is inversely proportional to thickness.', { thick: 20 }, (o, v) => v.mat === 3 && v.area === 2 && v.dt === 20 && near(o.power, 120, 1)),
    goal('Design a 2 m² wall that loses less than 10 W across a 20 K difference.', 'Choose the lowest-conductivity material and make it thick enough.', { mat: 5, thick: 17 }, (o, v) => v.area === 2 && v.dt === 20 && o.power < 10),
    goal('Show a metal wall conducting more than 100 kW.', 'Metals conduct hundreds of times better than masonry.', { mat: 0 }, (o) => o.power > 100000),
  ],
  predict: {
    q: 'A wall’s thickness is doubled; material, area, and both surface temperatures stay the same. The conducted power…',
    options: ['Halves', 'Doubles', 'Falls to one quarter', 'Is unchanged'],
    correct: 0,
    why: 'Fourier’s law: P = kAΔT/d. The temperature gradient ΔT/d halves, so the flow halves.',
  },
  model:
    'Fourier’s law for one-dimensional steady conduction, P = kAΔT/d, with room-temperature conductivities. Ignores surface air films, convection, radiation, moisture, and thermal bridges, which dominate real building losses.',
};

const psat = (t: number) =>
  10 ** (t < 100 ? 8.07131 - 1730.63 / (233.426 + t) : 8.14019 - 1810.94 / (244.485 + t)) / 760;
const psub = (t: number) => 0.006 * Math.exp(6134 * (1 / 273.16 - 1 / (t + 273.15)));
const tmelt = (p: number) => 0.01 - 0.0074 * (p - 0.006);
function waterState(t: number, p: number) {
  if (t >= 374) return p >= 218 ? 3 : 2;
  if (p < 0.006) return t < 0.01 && p > psub(t) ? 0 : 2;
  if (t < tmelt(p)) return 0;
  return p > psat(t) ? 1 : 2;
}
const px = (t: number) => 70 + ((t + 60) / 480) * 520,
  py = (logp: number) => 300 - ((logp + 4) / 6.6) * 260;
const phase: TopicLab = {
  id: 'therm-phase',
  title: 'Water’s phase diagram explorer',
  lead: 'Move one state point across the diagram. Which phase is stable depends on temperature and pressure together.',
  controls: [
    slider('t', 'Temperature', -60, 420, 1, 25, '°C'),
    slider('logp', 'log₁₀ (pressure / atm)', -4, 2.6, 0.05, 0, ''),
  ],
  run: (v) => {
    const p = 10 ** v.logp,
      state = waterState(v.t, p),
      name = ['Solid (ice)', 'Liquid', 'Gas (vapour)', 'Supercritical fluid'][state];
    return {
      o: { state, p },
      metrics: [
        { label: 'Stable phase', value: name },
        { label: 'Pressure', value: p, unit: 'atm' },
        { label: 'Boiling point at this pressure', value: p >= 0.006 && p <= 218 ? boilingPoint(p) : 'None (outside liquid range)', unit: p >= 0.006 && p <= 218 ? '°C' : undefined },
      ],
      sceneLabel: `Water phase diagram with the state point at ${v.t} degrees Celsius and ${p.toPrecision(3)} atmospheres: ${name}`,
      scene: [
        path('M70 30V300H590', 'muted', false, 1.5),
        trace((t) => [px(t), py(Math.max(-4, Math.log10(psub(t))))], -60, 0.01, 'cool'),
        trace((t) => [px(t), py(Math.log10(psat(t)))], 0.01, 374, 'warm'),
        line(px(0.01), py(Math.log10(0.006)), px(tmelt(398)), py(2.6), 'green', 2.5),
        circle(px(0.01), py(Math.log10(0.006)), 4, 'gold'),
        circle(px(374), py(Math.log10(218)), 4, 'gold'),
        text(px(0.01) + 8, py(Math.log10(0.006)) + 16, 'triple point', 'start', 'gold', 11),
        text(px(374) - 8, py(Math.log10(218)) - 8, 'critical point', 'end', 'gold', 11),
        text(110, 110, 'SOLID', 'middle', 'muted'),
        text(300, 90, 'LIQUID', 'middle', 'muted'),
        text(420, 230, 'GAS', 'middle', 'muted'),
        ...[-4, -2, 0, 2].map((l) => text(62, py(l) + 4, `${l}`, 'end', 'muted', 11)),
        ...[0, 100, 200, 300, 400].map((t) => text(px(t), 316, `${t}`, 'middle', 'muted', 11)),
        text(330, 334, 'Temperature (°C)', 'middle'),
        text(70, 22, 'log₁₀ (P / atm)'),
        circle(px(v.t), py(v.logp), 8, 'slot'),
      ],
    };
  },
  missions: [
    goal('Boil water at exactly 70 °C by changing only the pressure.', 'Lower the pressure until the point drops below the liquid–gas curve (about 0.3 atm).', { t: 70, logp: -0.6 }, (o, v) => v.t === 70 && o.state === 2),
    goal('Find conditions where ice turns directly into vapour — no liquid in between.', 'Go below the triple-point pressure (0.006 atm) and stay under 0 °C.', { t: -20, logp: -3.5 }, (o, v) => o.state === 2 && v.t < 0),
    goal('Keep water liquid at 150 °C.', 'Raise the pressure above the vapour pressure at 150 °C (nearly 5 atm).', { t: 150, logp: 1 }, (o, v) => v.t === 150 && o.state === 1),
    goal('Pass beyond the critical point into the supercritical region.', 'You need more than 374 °C and more than 218 atm.', { t: 400, logp: 2.4 }, (o) => o.state === 3),
  ],
  predict: {
    q: 'Ice is warmed slowly at a pressure below water’s triple point. It will…',
    options: [
      'Sublime straight to vapour',
      'Melt, then boil, as usual',
      'Stay solid at any temperature',
      'Become a supercritical fluid',
    ],
    correct: 0,
    why: 'Below the triple-point pressure the liquid phase is never stable, so the solid–gas boundary is the only one the path crosses.',
  },
  model:
    'Vapour-pressure curve from the Antoine equation for water (two fitted ranges, ending at the critical point 374 °C, 218 atm); sublimation curve from an integrated Clausius–Clapeyron form; a nearly vertical melting line with water’s slight negative slope. High-pressure ice polymorphs are omitted.',
};
function boilingPoint(p: number) {
  let lo = 0.01,
    hi = 374;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (psat(mid) < p) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

const iceBath: TopicLab = {
  id: 'therm-ice',
  title: 'Ice-and-water calorimeter',
  lead: 'Ice at 0 °C is dropped into warm water in an insulated cup. Melting must be paid for before any of the meltwater can warm.',
  controls: [
    slider('ice', 'Ice added (at 0 °C)', 10, 200, 10, 50, 'g'),
    slider('water', 'Warm water', 100, 500, 50, 200, 'g'),
    slider('tw', 'Water starting temperature', 10, 90, 5, 40, '°C'),
  ],
  run: (v) => {
    const available = v.water * 4.18 * v.tw,
      needed = v.ice * 334,
      all = available >= needed;
    const final = all ? (available - needed) / ((v.water + v.ice) * 4.18) : 0,
      melted = all ? v.ice : available / 334;
    return {
      o: { final, melted, left: v.ice - melted, available, needed },
      metrics: [
        { label: 'Final temperature', value: final, unit: '°C' },
        { label: 'Ice melted', value: melted, unit: 'g' },
        { label: 'Ice remaining', value: v.ice - melted, unit: 'g' },
      ],
      note: all
        ? 'All the ice melts; the leftover energy sets a final temperature above 0 °C.'
        : 'The water reaches 0 °C before the ice is gone: the mixture stays at the melting point with ice left over.',
      bars: {
        title: 'Energy accounts (J)',
        items: [
          { label: 'Released if the water cooled to 0 °C', value: available, tone: 'warm' },
          { label: 'Needed to melt all the ice', value: needed, tone: 'cool' },
        ],
      },
    };
  },
  missions: [
    goal('Find a setup in which some ice is still left at the end.', 'Make the melting cost exceed what the water can supply on its way to 0 °C.', { ice: 200, water: 100 }, (o) => o.left > 0),
    goal('Melt 100 g of ice completely and finish between 9 and 11 °C.', 'Try 300 g of water; adjust its starting temperature.', { ice: 100, water: 300, tw: 40 }, (o, v) => v.ice === 100 && o.left === 0 && o.final >= 9 && o.final <= 11),
    goal('With 50 g of ice, reach a final temperature above 74 °C.', 'Use the most and hottest water available.', { water: 500, tw: 90 }, (o, v) => v.ice === 50 && o.final > 74),
  ],
  predict: {
    q: 'Which cools a warm drink more: 50 g of ice at 0 °C or 50 g of liquid water at 0 °C?',
    options: [
      'The ice — melting absorbs a large latent heat first',
      'They cool it equally; both start at 0 °C',
      'The liquid water, because it mixes faster',
      'Neither changes the temperature',
    ],
    correct: 0,
    why: 'Each gram of ice absorbs 334 J to melt with no temperature change — as much as warming that gram of water by 80 K.',
  },
  model:
    'Energy balance in an ideal calorimeter: c(water) = 4.18 J/(g·K), latent heat of fusion 334 J/g, ice initially at 0 °C. No heat capacity of the cup, no losses to the room, and equilibrium is assumed.',
};

const gases: [string, number][] = [
  ['H₂', 2.016],
  ['He', 4.003],
  ['N₂', 28.01],
  ['O₂', 32.0],
  ['CO₂', 44.01],
  ['Xe', 131.3],
];
const kmt: TopicLab = {
  id: 'therm-kmt',
  title: 'Molecular speed distribution',
  lead: 'Temperature fixes the average kinetic energy of the molecules. Their speeds also depend on how massive they are.',
  controls: [
    choice('gas', 'Gas', gases.map(([name, m]) => `${name} · ${m} g/mol`), 3),
    slider('temp', 'Temperature', 100, 1000, 25, 250, 'K'),
  ],
  run: (v) => {
    const m = gases[v.gas][1] / 1000,
      rt = 8.314 * v.temp;
    const f = (s: number) => 4 * Math.PI * (m / (2 * Math.PI * rt)) ** 1.5 * s * s * Math.exp((-m * s * s) / (2 * rt)) * 1000;
    const vrms = Math.sqrt((3 * rt) / m),
      vmp = Math.sqrt((2 * rt) / m);
    return {
      o: { vrms, vmp, ke: 1.5 * 1.380649e-23 * v.temp * 1e21 },
      metrics: [
        { label: 'Root-mean-square speed', value: vrms, unit: 'm/s' },
        { label: 'Most probable speed', value: vmp, unit: 'm/s' },
        { label: 'Mean speed', value: Math.sqrt((8 * rt) / (Math.PI * m)), unit: 'm/s' },
        { label: 'Mean translational KE per molecule', value: 1.5 * 1.380649e-23 * v.temp * 1e21, unit: '× 10⁻²¹ J' },
      ],
      plot: {
        title: `${gases[v.gas][0]} at ${v.temp} K`,
        x: [0, 3000, 'Molecular speed (m/s)'],
        y: [0, 4, 'Probability density (per km/s)'],
        curves: [{ f }],
        vlines: [{ x: Math.min(3000, vrms), label: 'v rms' }],
        points: [{ x: Math.min(3000, vmp), y: f(vmp), label: 'most probable' }],
      },
    };
  },
  missions: [
    goal('Find a gas whose rms speed exceeds 1,900 m/s at 300 K.', 'The lightest molecule moves fastest at a given temperature.', { gas: 0, temp: 300 }, (o, v) => v.temp === 300 && o.vrms > 1900),
    goal('Double the starting rms speed of O₂ by changing only the temperature.', 'Speed scales with √T, so the temperature must quadruple.', { temp: 1000 }, (o, v) => v.gas === 3 && near(o.vrms, 882.9, 5)),
    goal('Find the temperature at which helium atoms have that same rms speed of about 883 m/s.', 'T = M v² / 3R; helium is one eighth the mass of O₂.', { gas: 1, temp: 125 }, (o, v) => v.gas === 1 && near(o.vrms, 883, 6)),
  ],
  predict: {
    q: 'At the same temperature, H₂ molecules compared with O₂ molecules have…',
    options: [
      'The same average kinetic energy but a higher typical speed',
      'A higher average kinetic energy and a higher speed',
      'The same speed and the same kinetic energy',
      'A lower speed, because they are lighter',
    ],
    correct: 0,
    why: 'Mean translational kinetic energy is 3/2 kT for any ideal gas. With equal ½mv², the lighter molecule must move faster: v ∝ 1/√M.',
  },
  model:
    'Maxwell–Boltzmann speed distribution for an ideal gas; v_rms = √(3RT/M), v_mp = √(2RT/M), mean = √(8RT/πM). The plotted density is clipped at 4 per km/s for very cold, heavy gases. Rotational and vibrational energy are not shown.',
};

const firstLaw: TopicLab = {
  id: 'therm-first-law',
  title: 'First-law energy ledger',
  lead: 'Heat and work are two ways to move energy across the boundary. Internal energy is what the gas keeps.',
  controls: [
    slider('q', 'Heat added to the gas, Q', -600, 600, 50, 200, 'J'),
    slider('w', 'Work done by the gas, W', -600, 600, 50, 0, 'J'),
  ],
  run: (v) => {
    const du = v.q - v.w,
      dT = du / (1.5 * 8.314),
      top = 150 - Math.max(-60, Math.min(60, v.w / 10));
    return {
      o: { du, dT },
      metrics: [
        { label: 'Change in internal energy ΔU', value: du, unit: 'J' },
        { label: 'Temperature change (1 mol monatomic)', value: dT, unit: 'K' },
        { label: 'Process clue', value: v.q === 0 ? 'Adiabatic (Q = 0)' : du === 0 ? 'Isothermal for an ideal gas (ΔU = 0)' : v.w === 0 ? 'Constant volume (W = 0)' : 'General process' },
      ],
      sceneLabel: `Gas cylinder: heat ${v.q} joules in, work ${v.w} joules out, internal energy change ${du} joules`,
      scene: [
        path('M200 60V300H440V60', 'ink', false, 3),
        rect(203, top + 12, 234, 288 - top - 12, du > 0 ? 'warm' : du < 0 ? 'cool' : 'muted', true, 0.35),
        rect(203, top, 234, 12, 'ink', true),
        line(320, top, 320, top - 50, 'ink', 4),
        text(320, 250, `ΔU = ${du} J`, 'middle'),
        ...(v.q !== 0 ? arrow(v.q > 0 ? 70 : 190, 230, v.q > 0 ? 190 : 70, 230, 'warm', 3) : []),
        text(130, 215, `Q = ${v.q} J`, 'middle', 'warm'),
        ...(v.w !== 0 ? arrow(540, v.w > 0 ? 150 : 90, 540, v.w > 0 ? 90 : 150, 'green', 3) : []),
        text(540, 180, `W = ${v.w} J`, 'middle', 'green'),
        text(540, 200, v.w > 0 ? 'gas expands' : v.w < 0 ? 'gas is compressed' : 'no volume change', 'middle', 'muted', 11),
      ],
      bars: {
        max: 1200,
        items: [
          { label: 'Heat in, Q', value: v.q, tone: 'warm' },
          { label: 'Work out, W', value: v.w, tone: 'green' },
          { label: 'Stored, ΔU = Q − W', value: du, tone: 'slot' },
        ],
      },
    };
  },
  missions: [
    goal('Heat the gas without adding any heat.', 'Compress it adiabatically: Q = 0 and work done on the gas (negative W).', { q: 0, w: -300 }, (o, v) => v.q === 0 && o.du > 0),
    goal('Make the gas expand and do work while its temperature stays constant.', 'For an ideal gas ΔU = 0 means every joule of heat leaves as work.', { q: 300, w: 300 }, (o, v) => o.du === 0 && v.w > 0),
    goal('Cool the gas by at least 20 K even though it is absorbing heat.', 'Let it do far more work than the heat it takes in.', { q: 100, w: 400 }, (o, v) => v.q > 0 && o.dT <= -20),
  ],
  predict: {
    q: 'An ideal gas absorbs 200 J of heat while doing 200 J of work on a piston. Its temperature…',
    options: ['Stays the same', 'Rises', 'Falls', 'Cannot be determined without the pressure'],
    correct: 0,
    why: 'ΔU = Q − W = 0, and an ideal gas’s internal energy depends only on temperature.',
  },
  model:
    'ΔU = Q − W with W defined as work done by the gas (the physics convention; chemistry texts often use ΔU = Q + W with W done on the gas). Temperature change assumes one mole of monatomic ideal gas, ΔU = (3/2)nRΔT.',
};

const entropy: TopicLab = {
  id: 'therm-entropy',
  title: 'Entropy generated by heat flow',
  lead: 'The same joules leave the hot body and enter the cold one, yet the entropy books do not balance — and that imbalance sets the direction.',
  controls: [
    slider('q', 'Heat transferred', 100, 2000, 100, 1000, 'J'),
    slider('th', 'First reservoir (heat leaves)', 300, 900, 10, 600, 'K'),
    slider('tc', 'Second reservoir (heat enters)', 200, 600, 10, 300, 'K'),
  ],
  run: (v) => {
    const out = -v.q / v.th,
      into = v.q / v.tc,
      total = out + into;
    return {
      o: { out, into, total, lost: v.tc * total },
      metrics: [
        { label: 'ΔS of the reservoir losing heat', value: out, unit: 'J/K' },
        { label: 'ΔS of the reservoir gaining heat', value: into, unit: 'J/K' },
        { label: 'Total entropy change', value: total, unit: 'J/K' },
        { label: 'Work a reversible engine could have extracted', value: Math.max(0, v.q * (1 - v.tc / v.th)), unit: 'J' },
      ],
      note:
        total < 0
          ? 'Total entropy would decrease: heat does not flow this way by itself. A heat pump with work input is required.'
          : total < 0.2
            ? 'Nearly reversible: with almost no temperature difference, almost no entropy is generated.'
            : 'Spontaneous and irreversible: the total entropy rises.',
      bars: {
        items: [
          { label: 'Hot side ΔS (J/K)', value: out, tone: 'warm' },
          { label: 'Cold side ΔS (J/K)', value: into, tone: 'cool' },
          { label: 'Generated (J/K)', value: total, tone: 'slot' },
        ],
      },
    };
  },
  missions: [
    goal('Make the transfer nearly reversible: total entropy change positive but below 0.2 J/K.', 'Bring the two temperatures close together.', { th: 310, tc: 300 }, (o, v) => v.th > v.tc && o.total > 0 && o.total < 0.2),
    goal('Set up a transfer the second law forbids and read the sign of the total.', 'Send heat from the colder reservoir to the hotter one.', { th: 300, tc: 400 }, (o) => o.total < 0),
    goal('Generate more than 5 J/K in a single transfer.', 'Use a large Q and the widest temperature gap.', { q: 2000, th: 900, tc: 200 }, (o) => o.total > 5),
  ],
  predict: {
    q: '1,000 J flows from a 600 K reservoir to a 300 K reservoir. The hot reservoir’s entropy changes by −1.67 J/K. The cold reservoir’s changes by…',
    options: ['+3.33 J/K, so the total rises', '+1.67 J/K, so the total is zero', '−3.33 J/K', '+0.83 J/K'],
    correct: 0,
    why: 'ΔS = Q/T. The same heat divided by a lower temperature gives a larger entropy gain than the loss on the hot side.',
  },
  model:
    'Ideal reservoirs whose temperatures do not change: ΔS = −Q/T₁ + Q/T₂. The maximum work shown is the Carnot value Q(1 − T_c/T_h). Finite bodies would need an integral of dQ/T.',
};

const gammas = [1.4, 1.3, 5 / 3];
const otto: TopicLab = {
  id: 'therm-otto',
  title: 'Otto-cycle efficiency',
  lead: 'An idealised petrol engine: its efficiency depends on how much the gas is compressed and on the gas itself — not on how much fuel is burned.',
  controls: [
    slider('r', 'Compression ratio', 2, 20, 0.5, 8, ': 1'),
    choice('gamma', 'Working gas', ['Air, γ = 1.40', 'Hot fuel–air mixture, γ ≈ 1.30', 'Monatomic gas, γ = 1.67'], 0),
    slider('qh', 'Heat released per cycle', 500, 3000, 100, 1000, 'J'),
  ],
  run: (v) => {
    const g = gammas[v.gamma],
      eta = 1 - v.r ** (1 - g);
    return {
      o: { eta, work: eta * v.qh, qc: (1 - eta) * v.qh },
      metrics: [
        { label: 'Ideal efficiency', value: eta * 100, unit: '%' },
        { label: 'Work per cycle', value: eta * v.qh, unit: 'J' },
        { label: 'Heat rejected', value: (1 - eta) * v.qh, unit: 'J' },
      ],
      plot: {
        title: 'η = 1 − r^(1−γ)',
        x: [2, 20, 'Compression ratio'],
        y: [0, 1, 'Efficiency'],
        curves: [
          { f: (r) => 1 - r ** (1 - g), label: 'selected gas' },
          { f: (r) => 1 - r ** -0.4, label: 'air, γ = 1.40', dash: true, tone: 'muted' },
        ],
        points: [{ x: v.r, y: eta, label: `${(eta * 100).toFixed(1)}%` }],
      },
    };
  },
  missions: [
    goal('With air, find the smallest compression ratio that reaches 60% efficiency.', 'Solve r^(−0.4) = 0.4.', { r: 10 }, (o, v) => v.gamma === 0 && v.r === 10),
    goal('Keep that ratio of 10 and switch to the hot fuel–air mixture. Note the efficiency you lose.', 'A lower γ means less temperature change per compression.', { r: 10, gamma: 1 }, (o, v) => v.gamma === 1 && v.r === 10),
    goal('With air and 1,000 J released, reject less than 350 J.', 'You need more than 65% efficiency: a ratio of about 14.', { r: 14 }, (o, v) => v.gamma === 0 && v.qh === 1000 && o.qc < 350),
  ],
  predict: {
    q: 'As an ideal Otto engine’s compression ratio is raised from 4 to 8 to 16, its efficiency…',
    options: [
      'Keeps rising, but by smaller steps each time',
      'Rises by the same amount each time',
      'Is unchanged; only fuel matters',
      'Falls, because compression costs work',
    ],
    correct: 0,
    why: 'η = 1 − r^(1−γ): each doubling of r multiplies the rejected fraction by the same factor, so the gains shrink.',
  },
  model:
    'Air-standard Otto cycle: two adiabats and two constant-volume steps, η = 1 − r^(1−γ). Real engines lose more to friction, heat transfer, finite combustion time, and knock limits on r.',
};

const joule: TopicLab = {
  id: 'therm-joule',
  title: 'Joule’s paddle-wheel experiment',
  lead: 'A falling weight turns paddles in an insulated tank of water. Mechanical energy disappears; the water warms.',
  controls: [
    slider('m', 'Falling mass', 1, 20, 1, 10, 'kg'),
    slider('h', 'Drop height', 0.5, 3, 0.5, 2, 'm'),
    slider('n', 'Number of drops', 1, 50, 1, 10, ''),
    slider('water', 'Water in the tank', 0.2, 5, 0.1, 1, 'kg'),
  ],
  run: (v) => {
    const energy = v.n * v.m * 9.81 * v.h,
      dT = energy / (v.water * 4186);
    return {
      o: { energy, dT },
      metrics: [
        { label: 'Mechanical energy delivered', value: energy, unit: 'J' },
        { label: 'Temperature rise of the water', value: dT, unit: 'K' },
        { label: 'Equivalent in kilocalories', value: energy / 4186, unit: 'kcal' },
      ],
      sceneLabel: `Paddle-wheel apparatus: a ${v.m} kilogram mass falls ${v.h} metres ${v.n} times, warming ${v.water} kilograms of water by ${dT.toPrecision(3)} kelvin`,
      scene: [
        rect(90, 150, 230, 150, 'ink', false, 1, 6),
        rect(93, 190, 224, 107, 'cool', true, Math.min(0.9, 0.25 + dT / 4)),
        line(205, 90, 205, 280, 'ink', 4),
        line(150, 240, 260, 240, 'ink', 6),
        line(165, 215, 245, 265, 'ink', 4),
        circle(205, 90, 14, 'muted', false),
        circle(470, 70, 16, 'muted', false),
        line(219, 90, 454, 70, 'muted', 1.5),
        line(486, 70, 486, 120 + v.h * 40, 'muted', 1.5),
        rect(466, 120 + v.h * 40, 40, 16 + v.m * 2, 'slot', true),
        text(520, 140 + v.h * 40, `${v.m} kg`),
        ...arrow(540, 120, 540, 120 + v.h * 40, 'muted', 1.5),
        text(548, 115, `${v.h} m × ${v.n}`),
        text(205, 322, `water: +${dT.toPrecision(3)} K`, 'middle'),
      ],
    };
  },
  missions: [
    goal('Warm the 1 kg of water by at least 1.0 K.', 'About 4,186 J is needed; add drops, mass, or height.', { n: 25 }, (o, v) => near(v.water, 1, 1e-6) && o.dT >= 1),
    goal('Deliver almost exactly one kilocalorie (4,186 J) of mechanical work.', 'Try 17 kg falling 2.5 m ten times.', { m: 17, h: 2.5 }, (o) => near(o.energy, 4186, 60)),
    goal('Starting from the original settings, show that halving the water doubles the temperature rise.', 'Change only the water mass to 0.5 kg.', { water: 0.5 }, (o, v) => near(v.water, 0.5, 1e-6) && near(o.dT, 0.937, 0.02)),
  ],
  predict: {
    q: 'Joule needed many drops of a heavy weight to warm his water measurably because…',
    options: [
      'A great deal of mechanical work equals a small amount of heating: about 4,186 J per kg per kelvin',
      'Most of the weight’s energy was destroyed',
      'Water cannot be warmed by stirring',
      'Gravity delivers heat, not work',
    ],
    correct: 0,
    why: 'Energy is conserved; the conversion factor is simply large. Dropping 10 kg through 2 m ten times supplies under 2 kJ.',
  },
  model:
    'E = n·m·g·h with g = 9.81 m/s²; ΔT = E / (m_water × 4186 J/(kg·K)). Assumes all the work is dissipated in the water, with no kinetic energy left in the weight, no friction in the pulleys, and no heat capacity of the tank.',
};

export const thermodynamicsExtras: EventExtras = {
  eventId: 'thermodynamics',
  labs: [cooling, conduction, phase, iceBath, kmt, firstLaw, entropy, otto, joule],
  lessons: {
    'therm-u1-l1': {
      labs: ['therm-cooling'],
      sort: sort('State variable or process quantity?', ['State variable', 'Process (path) quantity'], [
        ['Temperature', 0],
        ['Pressure', 0],
        ['Heat transferred', 1],
        ['Work done', 1],
        ['Internal energy', 0],
        ['Volume', 0],
      ]),
      checks: [
        check(3, 'Thermometer A reads the same as body B, and A also reads the same as body C. Without touching B to C, you can conclude…', [
          'B and C are in thermal equilibrium with each other',
          'B and C contain the same amount of heat',
          'B and C have the same internal energy',
          'Nothing, until B and C are placed in contact',
        ], 'That is the zeroth law, and it is what makes a thermometer meaningful. Equal temperature does not imply equal energy content.'),
      ],
    },
    'therm-u2-l1': {
      labs: ['therm-conduction'],
      phet: [
        phet(
          'energy-forms-and-changes',
          'Energy Forms and Changes',
          'Compare how iron, brick, water, and olive oil respond to the same heater. Heat capacity is why equal energy inputs do not give equal temperature rises.',
          'On the Intro screen, heat the iron block and the brick for the same time. Which thermometer rises faster, and what does that say about heat capacity?',
          'Place a hot block in the water. Watch the energy symbols move and note when the transfer stops.',
          'Use the Link Heaters option to give water and olive oil identical energy. Explain the temperature difference using c = Q / (mΔT).',
        ),
      ],
      sort: sort('Which transfer mechanism dominates?', ['Conduction', 'Convection', 'Radiation'], [
        ['A metal spoon handle warming in hot soup', 0],
        ['Warm air rising above a radiator', 1],
        ['Sunlight warming your face through vacuum', 2],
        ['Heat crossing a solid window pane', 0],
        ['A sea breeze driven by land–ocean temperature contrast', 1],
        ['Glowing coals felt from across the room', 2],
      ]),
      checks: [
        check(3, 'Equal masses of water and iron absorb the same heat. The iron’s temperature rises far more because iron has…', ['A lower specific heat capacity', 'A higher thermal conductivity', 'A higher density', 'More internal energy'], 'ΔT = Q / (mc). With c about one ninth of water’s, the same energy produces roughly nine times the temperature rise.'),
      ],
    },
    'therm-u3-l1': {
      labs: ['therm-phase'],
      phet: [
        phet(
          'states-of-matter',
          'States of Matter',
          'See the molecular picture behind the phase diagram: what particles do as a solid melts, a liquid boils, and pressure changes the outcome.',
          'On the States screen choose water and step through solid, liquid, and gas. Describe spacing and motion in each.',
          'On the Phase Changes screen, add heat to neon while watching the phase-diagram marker. Which boundary does it cross first?',
          'Push the lid down to raise the pressure on a gas. Can you make it condense without removing heat?',
        ),
      ],
      sort: sort('Name the transition', ['Absorbs energy', 'Releases energy'], [
        ['Melting', 0],
        ['Vaporisation', 0],
        ['Sublimation', 0],
        ['Freezing', 1],
        ['Condensation', 1],
        ['Deposition', 1],
      ]),
      checks: [
        check(2, 'Above its critical temperature, a substance…', ['Cannot be liquefied by pressure alone', 'Must be a solid', 'Boils at a fixed pressure', 'Has three phases in equilibrium'], 'Beyond the critical point the liquid–gas boundary ends; compressing the fluid changes its density smoothly with no phase transition.'),
      ],
    },
    'therm-u4-l1': {
      labs: ['therm-ice'],
      sort: sort('Sensible or latent heat?', ['Temperature changes (sensible)', 'Phase changes at constant temperature (latent)'], [
        ['Warming liquid water from 20 °C to 80 °C', 0],
        ['Ice melting at 0 °C', 1],
        ['Water boiling at 100 °C', 1],
        ['Steam heating from 100 °C to 120 °C', 0],
        ['Sweat evaporating from skin', 1],
        ['An iron block cooling in air', 0],
      ]),
      checks: [
        check(2, 'On a heating curve for water at 1 atm, the boiling plateau is much longer than the melting plateau because…', ['The latent heat of vaporisation is far larger than that of fusion', 'Steam has a higher specific heat than ice', 'The heater slows down at 100 °C', 'Boiling happens at a higher temperature'], 'About 2,260 J/g is needed to vaporise water but only 334 J/g to melt ice, so at constant power boiling takes nearly seven times as long.'),
      ],
    },
    'therm-u5-l1': {
      labs: ['therm-kmt'],
      phet: [
        phet(
          'gases-intro',
          'Gases Intro',
          'Pump particles into a box and watch pressure emerge from collisions. Hold one variable fixed at a time to recover each gas law.',
          'Hold volume constant and heat the gas. Record pressure at three temperatures. Is P/T constant?',
          'Hold temperature constant and halve the width of the container. What happens to the pressure and to the collision rate?',
          'Add a second pump stroke of the same gas at fixed volume and temperature. Relate the change in pressure to the change in particle number.',
        ),
      ],
      sort: sort('Which variable is held constant?', ['Temperature (Boyle)', 'Pressure (Charles)', 'Volume (Gay-Lussac)'], [
        ['PV = constant', 0],
        ['V / T = constant', 1],
        ['P / T = constant', 2],
        ['A sealed rigid can heated in a fire', 2],
        ['A balloon shrinking in a freezer', 1],
        ['A syringe compressed slowly in a water bath', 0],
      ]),
      checks: [
        check(2, 'The absolute temperature of an ideal gas is doubled. The average translational kinetic energy per molecule…', ['Doubles', 'Quadruples', 'Increases by √2', 'Stays the same'], 'Mean KE = (3/2)kT, directly proportional to T. It is the rms speed that grows by √2.'),
      ],
    },
    'therm-u6-l1': {
      phet: [
        phet(
          'gas-properties',
          'Gas Properties',
          'Run each named process on real particles: choose which quantity to hold constant, then compress, heat, or let the gas expand.',
          'On the Ideal screen, hold temperature constant and compress the gas. This is an isothermal process — what must happen to heat for T to stay fixed?',
          'Hold pressure constant and heat the gas. Watch the lid: the gas does work as it expands (isobaric).',
          'Hold volume constant and heat again. Where does all of the added energy go now (isochoric)?',
          'On the Energy screen, compare the speed histograms before and after a rapid compression with no thermostat.',
        ),
      ],
      sort: sort('Identify the process', ['Isothermal', 'Isobaric', 'Isochoric', 'Adiabatic'], [
        ['ΔU = 0 for an ideal gas', 0],
        ['W = PΔV', 1],
        ['W = 0', 2],
        ['Q = 0', 3],
        ['A vertical line on a P–V diagram', 2],
        ['A horizontal line on a P–V diagram', 1],
        ['PV^γ = constant', 3],
      ]),
      checks: [
        check(4, 'A gas expands adiabatically and does 150 J of work. Its internal energy changes by…', ['−150 J', '+150 J', '0 J', 'It depends on the heat added'], 'Q = 0, so ΔU = Q − W = −150 J: the work is paid for out of internal energy and the gas cools.'),
      ],
    },
    'therm-u7-l1': {
      labs: ['therm-first-law'],
      sort: sort('Sign of the energy term (physics convention, W by the gas)', ['Positive', 'Negative', 'Zero'], [
        ['Q when the gas is heated by a flame', 0],
        ['W when the gas pushes a piston outward', 0],
        ['W when the gas is compressed', 1],
        ['Q when the gas warms the room', 1],
        ['ΔU for one complete cycle', 2],
        ['Q in an adiabatic step', 2],
      ]),
      checks: [
        check(2, 'A gas goes from state A to state B by two different paths. Which quantity must be the same for both?', ['The change in internal energy', 'The heat absorbed', 'The work done', 'Both heat and work'], 'Internal energy is a state function. Heat and work each depend on the path, but their difference Q − W does not.'),
      ],
    },
    'therm-u8-l1': {
      labs: ['therm-entropy'],
      phet: [
        phet(
          'diffusion',
          'Diffusion',
          'Remove a divider and watch two gases mix. Nothing forbids every particle from returning to its own side — it is just overwhelmingly improbable.',
          'Put 50 particles on each side with different colours and remove the divider. Does the system ever un-mix?',
          'Repeat with only 2 particles per side. How often are all particles back on their starting sides now?',
          'Connect the two runs to entropy: why does the number of particles decide whether “irreversible” is a good description?',
        ),
      ],
      sort: sort('Reversible ideal or irreversible in practice?', ['Reversible (idealised limit)', 'Irreversible'], [
        ['Quasi-static isothermal expansion against a matched pressure', 0],
        ['Heat flowing across a finite temperature difference', 1],
        ['Free expansion of a gas into vacuum', 1],
        ['Friction warming a brake disc', 1],
        ['Frictionless adiabatic compression done infinitely slowly', 0],
        ['Two gases mixing after a partition is removed', 1],
      ]),
      checks: [
        check(2, 'Heat Q leaves a hot reservoir at T_h and enters a cold one at T_c. The total entropy change is…', ['Q/T_c − Q/T_h, which is positive', 'Zero, because energy is conserved', 'Q/T_h − Q/T_c, which is negative', 'Q × (T_h − T_c)'], 'The cold reservoir gains more entropy than the hot one loses because the same Q is divided by a smaller temperature.'),
      ],
    },
    'therm-u9-l1': {
      labs: ['therm-otto'],
      sort: sort('Engine, refrigerator, or heat pump?', ['Heat engine', 'Refrigerator', 'Heat pump'], [
        ['Takes in heat at high temperature and delivers work', 0],
        ['Uses work to remove heat from a cold interior', 1],
        ['Uses work to deliver heat into a warm building', 2],
        ['Performance measured as W / Q_h', 0],
        ['Performance measured as Q_c / W', 1],
        ['Performance measured as Q_h / W', 2],
      ]),
      checks: [
        check(1, 'An engine runs between 500 K and 300 K. The largest efficiency any engine could have is…', ['40%', '60%', '100%', '67%'], 'Carnot limit: 1 − T_c/T_h = 1 − 300/500 = 0.40. Temperatures must be in kelvin.'),
      ],
    },
    'therm-u10-l1': {
      labs: ['therm-joule'],
      phet: [
        phet(
          'friction',
          'Friction',
          'Rub two surfaces together and watch the atoms jiggle faster. This is the microscopic version of what Rumford and Joule measured.',
          'Rub the books together and watch the thermometer. Where did the mechanical energy go?',
          'Keep rubbing until atoms break away. What does this say about heat as motion rather than as a fluid (“caloric”)?',
        ),
        phet(
          'blackbody-spectrum',
          'Blackbody Spectrum',
          'Planck’s law fits the curve classical physics could not. Change the temperature and track both the peak and the total.',
          'Record the peak wavelength at 3,000 K, 4,500 K, and 6,000 K. Does peak wavelength × temperature stay constant?',
          'Compare the area under the curve at 3,000 K and 6,000 K. By what factor does total emitted power change?',
        ),
      ],
      sort: sort('Who established what?', ['Joule', 'Clausius / Kelvin', 'Boltzmann / Maxwell', 'Planck'], [
        ['Mechanical equivalent of heat', 0],
        ['Statements of the second law', 1],
        ['Entropy from counting microstates', 2],
        ['Quantised energy to explain blackbody radiation', 3],
        ['Distribution of molecular speeds', 2],
        ['An absolute temperature scale', 1],
      ]),
      checks: [
        check(1, 'Joule’s paddle-wheel result was decisive evidence that heat is…', ['A form of energy transfer, interconvertible with work', 'A weightless fluid that flows from hot to cold', 'A property only of gases', 'Created in proportion to temperature'], 'A fixed amount of mechanical work always produced the same warming, which a conserved “caloric” fluid could not explain.'),
      ],
    },
  },
};
