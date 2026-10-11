import { check, phet, sort, type EventExtras } from '../lesson-extras.ts';
import {
  choice,
  circle,
  ellipse,
  goal,
  near,
  rect,
  slider,
  text,
  type TopicLab,
} from '../topic-lab-kit.ts';

const elements: [name: string, light: number, heavy: number, natural: number, a: string, b: string][] = [
  ['Chlorine', 34.969, 36.966, 35.45, 'Cl-35', 'Cl-37'],
  ['Boron', 10.013, 11.009, 10.81, 'B-10', 'B-11'],
  ['Copper', 62.93, 64.928, 63.55, 'Cu-63', 'Cu-65'],
  ['Bromine', 78.918, 80.916, 79.9, 'Br-79', 'Br-81'],
];
const isotopes: TopicLab = {
  id: 'chem-isotopes',
  title: 'Isotope mixtures and average atomic mass',
  lead: 'The atomic mass on the periodic table is a weighted average. Mix two isotopes until the average matches the tabulated value.',
  controls: [
    choice('el', 'Element', elements.map((e) => `${e[0]} (${e[4]} / ${e[5]})`), 0),
    slider('ab', 'Abundance of the lighter isotope', 0, 100, 1, 50, '%'),
  ],
  run: (v) => {
    const [name, light, heavy, natural, a, b] = elements[v.el];
    const avg = (light * v.ab + heavy * (100 - v.ab)) / 100,
      count = Math.round(v.ab / 5);
    return {
      o: { avg, off: avg - natural },
      metrics: [
        { label: 'Average atomic mass of this mixture', value: Number(avg.toFixed(3)), unit: 'u' },
        { label: `Tabulated value for ${name.toLowerCase()}`, value: natural, unit: 'u' },
        { label: 'Difference', value: Number((avg - natural).toFixed(3)), unit: 'u' },
      ],
      sceneLabel: `Sample of 20 ${name.toLowerCase()} atoms: ${count} of ${a} and ${20 - count} of ${b}`,
      scene: [
        text(40, 40, `A sample of 20 atoms · ${a} filled, ${b} outlined`),
        ...Array.from({ length: 20 }, (_, i) =>
          circle(90 + (i % 10) * 52, 100 + Math.floor(i / 10) * 60, 19, i < count ? 'accent' : 'warm', i < count),
        ),
        rect(60, 250, 520, 14, 'muted', false, 1, 7),
        rect(60, 250, (520 * v.ab) / 100, 14, 'accent', true, 0.8, 7),
        text(60, 290, `${a}: ${v.ab}%`),
        text(580, 290, `${b}: ${100 - v.ab}%`, 'end'),
        text(320, 322, `weighted average = ${avg.toFixed(3)} u`, 'middle', 'slot'),
      ],
    };
  },
  missions: [
    goal('Reproduce chlorine’s tabulated atomic mass of 35.45 u.', 'The average sits much closer to 35 than to 37, so Cl-35 dominates — about three atoms in four.', { ab: 76 }, (o, v) => v.el === 0 && near(o.avg, 35.45, 0.02)),
    goal('Reproduce boron’s atomic mass of 10.81 u.', '10.81 is close to 11: the lighter isotope is the minor one, near one atom in five.', { el: 1, ab: 20 }, (o, v) => v.el === 1 && near(o.avg, 10.81, 0.02)),
    goal('Reproduce bromine’s atomic mass of 79.90 u.', 'Bromine’s two isotopes are almost equally abundant.', { el: 3, ab: 51 }, (o, v) => v.el === 3 && near(o.avg, 79.9, 0.02)),
  ],
  predict: {
    q: 'Chlorine’s atomic mass is 35.45 u and its isotopes have masses near 35 u and 37 u. Which is more abundant?',
    options: ['Cl-35, by roughly three to one', 'Cl-37, by roughly three to one', 'They are equally abundant', 'It cannot be determined from the average'],
    correct: 0,
    why: 'A weighted average lies closer to the more abundant value. 35.45 is about a quarter of the way from 35 to 37.',
  },
  model:
    'Average mass = Σ (isotopic mass × fractional abundance) for two stable isotopes, using isotopic masses rounded to three decimals. Natural abundances vary slightly between sources, which is why tabulated values carry uncertainty.',
};

const atoms: [string, number][] = [
  ['H', 2.2],
  ['C', 2.55],
  ['N', 3.04],
  ['O', 3.44],
  ['F', 3.98],
  ['Cl', 3.16],
  ['S', 2.58],
  ['K', 0.82],
  ['Na', 0.93],
  ['Mg', 1.31],
];
const polarity: TopicLab = {
  id: 'chem-polarity',
  title: 'Electronegativity difference and bond character',
  lead: 'Choose two bonded atoms. The difference in electronegativity predicts how unevenly the bonding electrons are shared.',
  controls: [
    choice('a', 'Left atom', atoms.map(([s, en]) => `${s} · EN ${en}`), 0),
    choice('b', 'Right atom', atoms.map(([s, en]) => `${s} · EN ${en}`), 5),
  ],
  run: (v) => {
    const [sa, ea] = atoms[v.a],
      [sb, eb] = atoms[v.b],
      delta = Math.abs(ea - eb);
    const kind = delta < 0.5 ? 0 : delta < 1.8 ? 1 : 2,
      ionic = (1 - Math.exp(-(delta ** 2) / 4)) * 100,
      shift = Math.sign(eb - ea) * Math.min(70, delta * 26);
    return {
      o: { delta, kind, ionic, same: v.a === v.b ? 1 : 0 },
      metrics: [
        { label: 'Electronegativity difference', value: Number(delta.toFixed(2)) },
        { label: 'Bond description', value: ['Nonpolar covalent', 'Polar covalent', 'Ionic'][kind] },
        { label: 'Estimated ionic character', value: ionic, unit: '%' },
        { label: 'Electron density shifted toward', value: delta === 0 ? 'Neither atom' : ea > eb ? sa : sb },
      ],
      sceneLabel: `${sa}–${sb} bond with electronegativity difference ${delta.toFixed(2)}: ${['nonpolar covalent', 'polar covalent', 'ionic'][kind]}`,
      scene: [
        ellipse(320 + shift, 170, 150 - Math.min(60, delta * 20), 62, 'accent', true, 0.25),
        circle(230, 170, 38, 'warm', false),
        circle(410, 170, 38, 'cool', false),
        text(230, 177, sa, 'middle', 'ink', 20),
        text(410, 177, sb, 'middle', 'ink', 20),
        text(230, 100, delta < 0.05 ? '' : ea < eb ? (kind === 2 ? '+' : 'δ+') : kind === 2 ? '−' : 'δ−', 'middle', 'slot', 18),
        text(410, 100, delta < 0.05 ? '' : eb < ea ? (kind === 2 ? '+' : 'δ+') : kind === 2 ? '−' : 'δ−', 'middle', 'slot', 18),
        text(320, 280, 'Shaded region: where the bonding electron density is concentrated', 'middle', 'muted'),
        text(320, 304, `ΔEN = ${delta.toFixed(2)}`, 'middle'),
      ],
    };
  },
  missions: [
    goal('Find two different elements joined by an essentially nonpolar bond.', 'Carbon and hydrogen differ by only 0.35.', { a: 1, b: 0 }, (o) => o.same === 0 && o.kind === 0),
    goal('Find the most ionic pairing available.', 'Pair the least electronegative metal with the most electronegative non-metal.', { a: 7, b: 4 }, (o) => o.delta > 3.1),
    goal('Find a polar covalent bond whose electronegativity difference is between 1.2 and 1.3.', 'This is the bond that makes water polar.', { a: 0, b: 3 }, (o) => o.delta > 1.2 && o.delta < 1.3),
  ],
  predict: {
    q: 'In an H–Cl bond, the shared electrons spend more time near…',
    options: ['Chlorine, giving it a partial negative charge', 'Hydrogen, giving it a partial negative charge', 'Neither; they are shared equally', 'Hydrogen, giving chlorine a full +1 charge'],
    correct: 0,
    why: 'Chlorine (3.16) is more electronegative than hydrogen (2.20), so the bond is polar covalent with δ− on Cl.',
  },
  model:
    'Pauling electronegativities; guideline boundaries ΔEN < 0.5 nonpolar, 0.5–1.8 polar covalent, ≥ 1.8 ionic. Ionic character uses Pauling’s estimate 1 − e^(−ΔEN²/4). The boundaries are conventions, and molecular polarity also depends on shape.',
};

const limiting: TopicLab = {
  id: 'chem-limiting',
  title: 'Limiting reactant: 2 H₂ + O₂ → 2 H₂O',
  lead: 'Mix any amounts of hydrogen and oxygen. Whichever runs out first caps the product; the other is left over.',
  controls: [
    slider('h2', 'Hydrogen supplied', 0.5, 10, 0.5, 4, 'mol'),
    slider('o2', 'Oxygen supplied', 0.5, 10, 0.5, 4, 'mol'),
    slider('yield', 'Percent yield', 50, 100, 5, 100, '%'),
  ],
  run: (v) => {
    const theory = Math.min(v.h2, 2 * v.o2),
      actual = (theory * v.yield) / 100,
      lim = v.h2 < 2 * v.o2 ? 1 : v.h2 > 2 * v.o2 ? 2 : 0;
    return {
      o: { theory, actual, mass: actual * 18.015, lim, leftH: v.h2 - theory, leftO: v.o2 - theory / 2 },
      metrics: [
        { label: 'Limiting reactant', value: ['Neither — exact stoichiometric mix', 'Hydrogen', 'Oxygen'][lim] },
        { label: 'Theoretical water', value: theory, unit: 'mol' },
        { label: 'Water actually collected', value: actual * 18.015, unit: 'g' },
        { label: 'Hydrogen left over (at full conversion)', value: v.h2 - theory, unit: 'mol' },
        { label: 'Oxygen left over (at full conversion)', value: v.o2 - theory / 2, unit: 'mol' },
      ],
      bars: {
        title: 'Amounts in moles',
        max: 10,
        items: [
          { label: 'H₂ supplied', value: v.h2, tone: 'cool' },
          { label: 'O₂ supplied', value: v.o2, tone: 'warm' },
          { label: 'H₂O (theoretical)', value: theory, tone: 'accent' },
          { label: 'H₂O (actual)', value: actual, tone: 'slot' },
        ],
      },
    };
  },
  missions: [
    goal('Find a mixture with nothing left over.', 'The equation needs two moles of H₂ for every mole of O₂.', { h2: 8 }, (o) => o.leftH === 0 && o.leftO === 0),
    goal('Make oxygen the limiting reactant and produce exactly 3 mol of water at 100% yield.', 'Each mole of O₂ gives two moles of water.', { o2: 1.5, h2: 5 }, (o, v) => o.lim === 2 && v.yield === 100 && near(o.actual, 3, 1e-9)),
    goal('Collect 36.03 g of water (2.00 mol) at an 80% yield.', 'Theoretical yield must be 2.00 / 0.80 = 2.50 mol.', { h2: 2.5, yield: 80 }, (o, v) => v.yield === 80 && near(o.mass, 36.03, 0.05)),
  ],
  predict: {
    q: '4 mol of H₂ and 4 mol of O₂ are ignited. Which reactant limits the amount of water formed?',
    options: ['Hydrogen', 'Oxygen', 'Neither; equal moles react completely', 'Water'],
    correct: 0,
    why: '4 mol of O₂ could consume 8 mol of H₂, but only 4 mol is available. Equal moles are not the same as a stoichiometric ratio.',
  },
  model:
    'Mole ratios from the balanced equation; M(H₂O) = 18.015 g/mol. “Left over” assumes the reaction runs to completion; percent yield then scales the collected product without specifying where the loss occurred.',
};

const gasMix: TopicLab = {
  id: 'chem-gas',
  title: 'Gas mixtures and partial pressure',
  lead: 'Two gases share one container. Each contributes pressure in proportion to its amount, as if the other were absent.',
  controls: [
    slider('na', 'Nitrogen', 0, 3, 0.1, 0.8, 'mol'),
    slider('nb', 'Oxygen', 0, 3, 0.1, 0.2, 'mol'),
    slider('t', 'Temperature', 200, 400, 1, 298, 'K'),
    slider('vol', 'Container volume', 5, 50, 0.2, 24.4, 'L'),
  ],
  run: (v) => {
    const n = v.na + v.nb,
      rt = (0.08206 * v.t) / v.vol,
      w = 120 + v.vol * 8;
    return {
      o: { p: n * rt, pa: v.na * rt, pb: v.nb * rt, n },
      metrics: [
        { label: 'Total pressure', value: n * rt, unit: 'atm' },
        { label: 'Partial pressure of N₂', value: v.na * rt, unit: 'atm' },
        { label: 'Partial pressure of O₂', value: v.nb * rt, unit: 'atm' },
        { label: 'Mole fraction of O₂', value: n ? v.nb / n : 0 },
      ],
      sceneLabel: `Container of ${v.vol} litres holding ${v.na} mole nitrogen and ${v.nb} mole oxygen at ${v.t} kelvin`,
      scene: [
        rect(320 - w / 2, 60, w, 200, 'ink', false, 1, 8),
        ...Array.from({ length: Math.round(v.na * 20) }, (_, i) =>
          circle(320 - w / 2 + 14 + ((i * 37) % (w - 28)), 76 + ((i * 53) % 170), 4, 'cool'),
        ),
        ...Array.from({ length: Math.round(v.nb * 20) }, (_, i) =>
          circle(320 - w / 2 + 14 + ((i * 61 + 17) % (w - 28)), 76 + ((i * 29 + 40) % 170), 4, 'warm'),
        ),
        text(320, 290, 'blue: N₂ · orange: O₂ · 20 dots per mole (schematic)', 'middle', 'muted'),
        text(320, 315, `P = nRT / V = ${(n * rt).toPrecision(3)} atm`, 'middle'),
      ],
    };
  },
  missions: [
    goal('Hold one mole of gas at 273 K and find the volume that gives 1.00 atm.', 'This is the molar volume at 0 °C.', { t: 273, vol: 22.4 }, (o, v) => v.t === 273 && near(o.n, 1, 1e-6) && near(o.p, 1, 0.005)),
    goal('At the starting temperature and volume, make the partial pressure of oxygen 0.50 atm while the total stays near 1.00 atm.', 'Keep one mole in total and make half of it oxygen.', { na: 0.5, nb: 0.5 }, (o, v) => v.t === 298 && near(o.pb, 0.5, 0.01) && near(o.p, 1, 0.01)),
    goal('Double the starting total pressure by adding gas only.', 'Pressure is proportional to total moles at fixed T and V.', { na: 1.6, nb: 0.4 }, (o, v) => v.t === 298 && near(v.vol, 24.4, 1e-6) && near(o.p, 2.004, 0.02)),
  ],
  predict: {
    q: 'A rigid container holds N₂ at 1.0 atm. O₂ is added at constant temperature until the total is 1.5 atm. The partial pressure of N₂ is now…',
    options: ['Still 1.0 atm', '0.75 atm', '1.5 atm', '0.5 atm'],
    correct: 0,
    why: 'Dalton’s law: each ideal gas exerts the pressure it would exert alone. Adding O₂ does not change the amount, temperature, or volume of N₂.',
  },
  model:
    'Ideal-gas law with R = 0.08206 L·atm/(mol·K); P_i = x_i · P_total. No intermolecular forces, reactions, or condensation. Dots are a schematic count, not positions of real molecules.',
};

const equilibrium: TopicLab = {
  id: 'chem-equilibrium',
  title: 'Reaction quotient versus K for A ⇌ 2 B',
  lead: 'Set the starting concentrations. Comparing Q with K tells you which way the system must move; the bars show where it ends up.',
  controls: [
    slider('k', 'Equilibrium constant K', 0.1, 10, 0.1, 1, ''),
    slider('a0', 'Starting [A]', 0.1, 2, 0.1, 1, 'M'),
    slider('b0', 'Starting [B]', 0, 2, 0.1, 0, 'M'),
  ],
  run: (v) => {
    const q = v.b0 ** 2 / v.a0,
      b = 4 * v.b0 + v.k,
      x = (-b + Math.sqrt(b * b - 16 * (v.b0 ** 2 - v.k * v.a0))) / 8;
    const aeq = v.a0 - x,
      beq = v.b0 + 2 * x,
      dir = Math.abs(q - v.k) < 1e-9 ? 0 : q < v.k ? 1 : -1;
    return {
      o: { q, aeq, beq, dir, x },
      metrics: [
        { label: 'Reaction quotient Q = [B]² / [A]', value: q },
        { label: 'Direction of net change', value: dir === 0 ? 'None — already at equilibrium' : dir > 0 ? 'Toward products (Q < K)' : 'Toward reactants (Q > K)' },
        { label: '[A] at equilibrium', value: aeq, unit: 'M' },
        { label: '[B] at equilibrium', value: beq, unit: 'M' },
        { label: 'Check: [B]² / [A] at equilibrium', value: beq ** 2 / aeq },
      ],
      bars: {
        title: 'Concentrations (M)',
        max: 4,
        items: [
          { label: '[A] start', value: v.a0, tone: 'muted' },
          { label: '[A] equilibrium', value: aeq, tone: 'cool' },
          { label: '[B] start', value: v.b0, tone: 'muted' },
          { label: '[B] equilibrium', value: beq, tone: 'warm' },
        ],
      },
    };
  },
  missions: [
    goal('Build a starting mixture that must shift toward reactants.', 'Add enough product that Q exceeds K.', { b0: 2 }, (o) => o.dir === -1),
    goal('With K = 1, start exactly at equilibrium while both species are present.', 'You need [B]² = [A].', { b0: 1 }, (o, v) => v.b0 > 0 && o.dir === 0),
    goal('Starting from 1.0 M of pure A, choose K so that exactly half of the A has reacted at equilibrium.', 'If [A] = 0.5 then [B] = 1.0; evaluate [B]² / [A].', { k: 2 }, (o, v) => v.b0 === 0 && v.a0 === 1 && near(o.aeq, 0.5, 0.002)),
  ],
  predict: {
    q: 'For a mixture in which Q is smaller than K, the reaction will proceed…',
    options: ['Toward products until Q equals K', 'Toward reactants until Q equals K', 'In neither direction', 'Until all reactant is used up'],
    correct: 0,
    why: 'Q < K means there is too little product relative to the equilibrium ratio, so the forward reaction outpaces the reverse.',
  },
  model:
    'Homogeneous equilibrium A ⇌ 2 B with K = [B]²/[A] at fixed temperature, solved exactly from the quadratic in the extent of reaction. Activities are approximated by concentrations; K itself changes only with temperature.',
};

const pairs: [string, number][] = [
  ['Acetic acid / acetate', 4.76],
  ['Carbonic acid / bicarbonate', 6.35],
  ['Dihydrogen phosphate / hydrogen phosphate', 7.21],
  ['Ammonium / ammonia', 9.25],
];
const buffer: TopicLab = {
  id: 'chem-buffer',
  title: 'Buffer capacity under attack',
  lead: 'One litre of buffer receives strong acid or strong base. Compare its pH response with pure water’s — and find where the buffer gives out.',
  controls: [
    choice('pair', 'Conjugate pair', pairs.map(([name, pka]) => `${name} · pKa ${pka}`), 0),
    slider('base', 'Conjugate base A⁻', 10, 500, 10, 100, 'mmol'),
    slider('acid', 'Weak acid HA', 10, 500, 10, 50, 'mmol'),
    slider('add', 'Strong acid added (negative = strong base)', -100, 100, 5, 0, 'mmol'),
  ],
  run: (v) => {
    const pka = pairs[v.pair][1];
    const ph = (x: number) => {
      const a = v.base - x,
        ha = v.acid + x;
      if (a <= 0) return a < 0 ? -Math.log10(-a / 1000) : 0.5 * (pka - Math.log10(ha / 1000));
      if (ha <= 0) return ha < 0 ? 14 + Math.log10(-ha / 1000) : 7 + 0.5 * (pka + Math.log10(a / 1000));
      return pka + Math.log10(a / ha);
    };
    const water = (x: number) => (x > 0 ? -Math.log10(x / 1000) : x < 0 ? 14 + Math.log10(-x / 1000) : 7);
    const exhausted = v.base - v.add <= 0 || v.acid + v.add <= 0 ? 1 : 0;
    return {
      o: { ph: ph(v.add), start: ph(0), change: ph(v.add) - ph(0), exhausted },
      metrics: [
        { label: 'Buffer pH', value: Number(ph(v.add).toFixed(2)) },
        { label: 'Change from the starting pH', value: Number((ph(v.add) - ph(0)).toFixed(2)) },
        { label: 'Same addition to pure water gives pH', value: Number(water(v.add).toFixed(2)) },
        { label: 'Buffer status', value: exhausted ? 'Exhausted — one partner is used up' : 'Working' },
      ],
      plot: {
        title: 'pH response to added strong acid or base',
        x: [-100, 100, 'Strong acid added (mmol)'],
        y: [0, 14, 'pH'],
        curves: [
          { f: ph, label: 'buffer' },
          { f: water, label: 'pure water', dash: true, tone: 'muted' },
        ],
        hlines: [{ y: pka, label: 'pKa' }],
        points: [{ x: v.add, y: ph(v.add), label: `pH ${ph(v.add).toFixed(2)}` }],
      },
    };
  },
  missions: [
    goal('Adjust the buffer so that its pH equals the pKa.', 'pH = pKa when the acid and its conjugate base are present in equal amounts.', { acid: 100 }, (o, v) => v.add === 0 && near(o.ph, pairs[v.pair][1], 0.005)),
    goal('Add 20 mmol of strong acid to the starting acetate buffer and confirm the pH moves by less than 0.3.', 'The acid converts 20 mmol of acetate to acetic acid; recompute the ratio.', { add: 20 }, (o, v) => v.pair === 0 && v.base === 100 && v.acid === 50 && v.add === 20),
    goal('Add enough strong acid to exhaust the buffer.', 'Once every A⁻ has been protonated, extra acid is free H⁺.', { add: 100 }, (o) => o.exhausted === 1),
  ],
  predict: {
    q: 'A buffer resists pH change most effectively when…',
    options: [
      'Its pH is close to the pKa, with comparable amounts of acid and conjugate base',
      'It contains only the weak acid',
      'It is as dilute as possible',
      'Its pH is far from the pKa',
    ],
    correct: 0,
    why: 'With both partners present in quantity, added H⁺ is absorbed by A⁻ and added OH⁻ by HA, so the ratio — and the pH — barely moves.',
  },
  model:
    'Henderson–Hasselbalch, pH = pKa + log([A⁻]/[HA]), with stoichiometric neutralisation of the added strong acid or base in exactly 1 L. Beyond exhaustion the excess strong reagent sets the pH. Activity effects and dilution are neglected.',
};

const gibbs: TopicLab = {
  id: 'chem-gibbs',
  title: 'Free energy: when is a process spontaneous?',
  lead: 'Enthalpy and entropy pull in the same or opposite directions. Temperature decides how much the entropy term weighs.',
  controls: [
    slider('dh', 'ΔH', -200, 200, 10, -50, 'kJ/mol'),
    slider('ds', 'ΔS', -300, 300, 10, -100, 'J/(mol·K)'),
    slider('t', 'Temperature', 100, 1500, 10, 300, 'K'),
  ],
  run: (v) => {
    const g = (t: number) => v.dh - (t * v.ds) / 1000,
      cross = v.ds !== 0 && v.dh / v.ds > 0 ? (v.dh / v.ds) * 1000 : 0;
    return {
      o: { dg: g(v.t), cross },
      metrics: [
        { label: 'ΔG at this temperature', value: g(v.t), unit: 'kJ/mol' },
        { label: 'Verdict', value: Math.abs(g(v.t)) < 1e-9 ? 'At equilibrium (ΔG = 0)' : g(v.t) < 0 ? 'Spontaneous as written' : 'Non-spontaneous as written' },
        { label: 'Crossover temperature ΔH / ΔS', value: cross ? cross : 'None — the sign of ΔG never changes', unit: cross ? 'K' : undefined },
      ],
      plot: {
        title: 'ΔG = ΔH − TΔS',
        x: [100, 1500, 'Temperature (K)'],
        y: [-400, 400, 'ΔG (kJ/mol)'],
        curves: [{ f: g }],
        hlines: [{ y: 0, label: 'ΔG = 0' }],
        points: [{ x: v.t, y: g(v.t), label: `${g(v.t).toFixed(0)} kJ/mol`, tone: g(v.t) < 0 ? 'green' : 'warm' }],
      },
    };
  },
  missions: [
    goal('Build an endothermic process that is nevertheless spontaneous.', 'It needs a positive ΔS and a temperature above ΔH / ΔS.', { dh: 50, ds: 100, t: 600 }, (o, v) => v.dh > 0 && o.dg < 0),
    goal('Build a process that is non-spontaneous at every temperature.', 'Make both terms unfavourable: positive ΔH and negative ΔS.', { dh: 50 }, (o, v) => v.dh > 0 && v.ds < 0),
    goal('For ΔH = −50 kJ/mol and ΔS = −100 J/(mol·K), find the temperature at which ΔG is exactly zero.', 'Set ΔH = TΔS and mind the kJ-to-J conversion.', { t: 500 }, (o, v) => v.dh === -50 && v.ds === -100 && near(o.dg, 0, 0.001)),
  ],
  predict: {
    q: 'Melting ice absorbs heat (ΔH > 0) and increases disorder (ΔS > 0). Melting is spontaneous…',
    options: ['Only above a threshold temperature', 'At every temperature', 'At no temperature', 'Only below a threshold temperature'],
    correct: 0,
    why: 'ΔG = ΔH − TΔS becomes negative once TΔS exceeds ΔH — for ice at 1 atm, above 273 K.',
  },
  model:
    'ΔG = ΔH − TΔS with ΔH and ΔS treated as independent of temperature. Spontaneity says nothing about rate: a process with ΔG < 0 can still be immeasurably slow.',
};

const arrhenius: TopicLab = {
  id: 'chem-arrhenius',
  title: 'Activation energy, temperature, and catalysts',
  lead: 'The rate constant depends exponentially on Eₐ/RT. Compare what a few kelvin and a few kilojoules can each do.',
  controls: [
    slider('ea', 'Activation energy', 20, 150, 1, 75, 'kJ/mol'),
    slider('t', 'Temperature', 250, 500, 1, 298, 'K'),
    slider('cat', 'Catalyst lowers Eₐ by', 0, 60, 1, 0, 'kJ/mol'),
  ],
  run: (v) => {
    const r = 0.008314,
      eff = Math.max(1, v.ea - v.cat);
    const ln = (t: number) => -eff / (r * t) + v.ea / (r * 298),
      ratio = Math.exp(ln(v.t));
    return {
      o: { ratio, eff, log: ln(v.t) / Math.LN10 },
      metrics: [
        { label: 'Rate constant relative to uncatalysed 298 K', value: ratio, unit: '×' },
        { label: 'Effective activation energy', value: eff, unit: 'kJ/mol' },
        { label: 'Fraction of collisions with E ≥ Eₐ', value: Math.exp(-eff / (r * v.t)) },
      ],
      plot: {
        title: 'log₁₀ of the relative rate constant',
        x: [250, 500, 'Temperature (K)'],
        y: [-6, 12, 'log₁₀ (k / k₂₉₈ uncatalysed)'],
        curves: [
          { f: (t) => ln(t) / Math.LN10, label: 'this pathway' },
          { f: (t) => (-v.ea / (r * t) + v.ea / (r * 298)) / Math.LN10, label: 'no catalyst', dash: true, tone: 'muted' },
        ],
        points: [{ x: v.t, y: ln(v.t) / Math.LN10, label: `× ${ratio.toPrecision(3)}` }],
      },
    };
  },
  missions: [
    goal('Find an activation energy for which warming from 298 K to 308 K doubles the rate.', 'The “rate doubles every 10 K” rule of thumb only holds near 50 kJ/mol.', { ea: 53, t: 308 }, (o, v) => v.t === 308 && v.cat === 0 && near(o.ratio, 2, 0.03)),
    goal('At 298 K, use a catalyst to speed the reaction about a thousandfold.', 'You need to cut Eₐ by RT ln(1000) ≈ 17 kJ/mol.', { cat: 17 }, (o, v) => v.t === 298 && o.ratio > 900 && o.ratio < 1500),
    goal('With Eₐ = 75 kJ/mol and no catalyst, find how warm the mixture must be for a hundredfold speed-up.', 'It takes roughly a 54 K rise.', { t: 352 }, (o, v) => v.ea === 75 && v.cat === 0 && o.ratio >= 100 && o.ratio < 130),
  ],
  predict: {
    q: 'A catalyst increases the rate of a reaction by…',
    options: [
      'Providing a pathway with a lower activation energy',
      'Making the reaction more exothermic',
      'Shifting the equilibrium toward products',
      'Raising the temperature of the mixture',
    ],
    correct: 0,
    why: 'Catalysts change the mechanism, not the thermodynamics: ΔH, ΔG, and K are unchanged, and forward and reverse rates rise together.',
  },
  model:
    'Arrhenius equation k = A·e^(−Eₐ/RT) with a temperature-independent pre-exponential factor, shown as a ratio so A cancels. The catalysed pathway is assumed to share the same A, which real catalysts need not.',
};

const inhibition: TopicLab = {
  id: 'chem-inhibition',
  title: 'Enzyme inhibition on a saturation curve',
  lead: 'Add an inhibitor and see which kinetic parameter it attacks. The uninhibited curve stays dashed for comparison.',
  controls: [
    choice('type', 'Inhibitor', ['None', 'Competitive', 'Noncompetitive'], 0),
    slider('i', 'Inhibitor concentration, [I] / Kᵢ', 0, 5, 0.25, 1, ''),
    slider('s', 'Substrate concentration', 0, 50, 0.5, 5, 'mM'),
  ],
  run: (v) => {
    const km = v.type === 1 ? 5 * (1 + v.i) : 5,
      vmax = v.type === 2 ? 100 / (1 + v.i) : 100;
    const rate = (s: number) => (vmax * s) / (km + s);
    return {
      o: { rate: rate(v.s), km, vmax },
      metrics: [
        { label: 'Initial rate', value: rate(v.s), unit: '% of uninhibited Vmax' },
        { label: 'Apparent Km', value: km, unit: 'mM' },
        { label: 'Apparent Vmax', value: vmax, unit: '%' },
      ],
      plot: {
        title: 'Michaelis–Menten curves (Vmax = 100, Km = 5 mM)',
        x: [0, 50, 'Substrate (mM)'],
        y: [0, 100, 'Initial rate'],
        curves: [
          { f: rate, label: 'with inhibitor' },
          { f: (s) => (100 * s) / (5 + s), label: 'no inhibitor', dash: true, tone: 'muted' },
        ],
        hlines: [{ y: vmax / 2, label: '½ apparent Vmax' }],
        vlines: [{ x: km, label: 'apparent Km' }],
        points: [{ x: v.s, y: rate(v.s), label: rate(v.s).toFixed(1) }],
      },
    };
  },
  missions: [
    goal('With a competitive inhibitor at [I] = Kᵢ, find the substrate concentration that gives a rate of 50.', 'The apparent Km doubles, so half-maximal rate now needs twice the substrate.', { type: 1, s: 10 }, (o, v) => v.type === 1 && v.i === 1 && near(o.rate, 50, 0.5)),
    goal('Overcome that competitive inhibitor: push the rate above 80 with substrate alone.', 'Competitive inhibition can be out-competed.', { type: 1, s: 50 }, (o, v) => v.type === 1 && v.i >= 1 && o.rate > 80),
    goal('Switch to a noncompetitive inhibitor at [I] = Kᵢ and flood the enzyme with 50 mM substrate.', 'Watch the plateau: Vmax itself has been cut.', { type: 2, s: 50 }, (o, v) => v.type === 2 && v.i === 1 && v.s === 50),
  ],
  predict: {
    q: 'A purely competitive inhibitor changes which apparent kinetic parameter?',
    options: ['Km rises; Vmax is unchanged', 'Vmax falls; Km is unchanged', 'Both Km and Vmax fall', 'Neither changes'],
    correct: 0,
    why: 'The inhibitor competes for the active site, so more substrate is needed for half-saturation, but enough substrate still reaches the same Vmax.',
  },
  model:
    'Competitive: Km,app = Km(1 + [I]/Kᵢ). Pure noncompetitive: Vmax,app = Vmax / (1 + [I]/Kᵢ) with Km unchanged. Initial-rate, steady-state Michaelis–Menten assumptions; mixed and uncompetitive inhibition are not shown.',
};

export const chemistryLabExtras: EventExtras = {
  eventId: 'chemistry-lab',
  labs: [isotopes, polarity, limiting, gasMix, equilibrium, buffer, gibbs, arrhenius, inhibition],
  lessons: {
    'chem-u1-l1': {
      labs: ['chem-isotopes'],
      phet: [
        phet(
          'build-an-atom',
          'Build an Atom',
          'Protons fix the element, neutrons the isotope, electrons the charge. Build atoms particle by particle and watch the symbol update.',
          'Build a neutral carbon-12 atom. Which particle count did you have to match to the atomic number?',
          'Add one neutron, then one electron. Which change made a new isotope and which made an ion?',
          'Use the Symbol screen to build an ion with mass number 23 and charge +1. Name it.',
        ),
        phet(
          'isotopes-and-atomic-mass',
          'Isotopes and Atomic Mass',
          'Mix isotopes by hand and compare your sample’s average mass with nature’s mix.',
          'On the Mixtures screen, add isotopes of an element until your average mass matches the periodic-table value.',
          'Switch to “Nature’s mix” and compare the percent composition with your own.',
        ),
      ],
      sort: sort('How many significant figures?', ['Two', 'Three', 'Four'], [
        ['0.0045 g', 0],
        ['1.20 mL', 1],
        ['6.022 × 10²³', 2],
        ['0.250 mol', 1],
        ['47 °C', 0],
        ['100.0 mL', 2],
      ]),
      checks: [
        check(0, 'An atom has 17 protons, 20 neutrons, and 18 electrons. It is…', ['A chloride ion, ³⁷Cl⁻', 'A neutral chlorine-37 atom', 'An argon atom', 'A potassium ion'], 'Seventeen protons make it chlorine; mass number 17 + 20 = 37; one extra electron gives a 1− charge.'),
      ],
    },
    'chem-u2-l1': {
      labs: ['chem-polarity'],
      phet: [
        phet(
          'molecule-shapes',
          'Molecule Shapes',
          'Electron domains repel into the arrangement that keeps them farthest apart. Build molecules bond by bond and lone pair by lone pair.',
          'On the Model screen, build a central atom with four single bonds. Read the electron geometry, molecular geometry, and bond angle.',
          'Replace one bond with a lone pair, then a second. How do the molecular-geometry name and the angles change?',
          'On the Real Molecules screen, compare H₂O, NH₃, and CH₄. Why do their bond angles differ slightly from the model’s?',
        ),
        phet(
          'molecule-polarity',
          'Molecule Polarity',
          'Polar bonds do not guarantee a polar molecule. Add bond dipoles as vectors and see when they cancel.',
          'On the Two Atoms screen, raise one atom’s electronegativity. Watch the bond dipole and the partial charges.',
          'On the Three Atoms screen, make both bonds polar and then change the bond angle to 180°. What happens to the molecular dipole?',
        ),
      ],
      sort: sort('Strongest intermolecular force present?', ['London dispersion only', 'Dipole–dipole', 'Hydrogen bonding'], [
        ['CH₄', 0],
        ['HCl', 1],
        ['H₂O', 2],
        ['CO₂', 0],
        ['NH₃', 2],
        ['SO₂', 1],
      ]),
      checks: [
        check(3, 'CO₂ contains two polar C=O bonds, yet the molecule is nonpolar because…', ['It is linear, so the two bond dipoles cancel', 'Carbon and oxygen have equal electronegativity', 'Double bonds cannot be polar', 'It has lone pairs on carbon'], 'Molecular polarity is the vector sum of bond dipoles. In a symmetric linear molecule the two equal dipoles point in opposite directions.'),
      ],
    },
    'chem-u3-l1': {
      labs: ['chem-limiting'],
      phet: [
        phet(
          'reactants-products-and-leftovers',
          'Reactants, Products and Leftovers',
          'The sandwich-shop analogy and real molecules side by side: change the starting amounts and predict what is left over.',
          'On the Molecules screen, make water from H₂ and O₂. Find a mixture with no leftovers.',
          'Double only the oxygen. Predict the leftovers before you look.',
          'Play the Game at level 2 until you can predict products and leftovers three times in a row.',
        ),
        phet(
          'balancing-chemical-equations',
          'Balancing Chemical Equations',
          'Atoms are conserved, so coefficients — never subscripts — must change. Use the balance scales to check each element.',
          'Balance the synthesis of ammonia. Which element did you balance first, and why?',
          'Balance the combustion of methane and count oxygen atoms on both sides.',
        ),
      ],
      sort: sort('Classify the reaction', ['Synthesis', 'Decomposition', 'Single replacement', 'Combustion'], [
        ['2 Mg + O₂ → 2 MgO', 0],
        ['2 H₂O₂ → 2 H₂O + O₂', 1],
        ['Zn + 2 HCl → ZnCl₂ + H₂', 2],
        ['CH₄ + 2 O₂ → CO₂ + 2 H₂O', 3],
        ['CaCO₃ → CaO + CO₂', 1],
        ['N₂ + 3 H₂ → 2 NH₃', 0],
      ]),
      checks: [
        check(3, 'In N₂ + 3 H₂ → 2 NH₃, 2 mol of N₂ is mixed with 3 mol of H₂. The limiting reactant is…', ['H₂', 'N₂', 'NH₃', 'Neither'], '2 mol of N₂ would need 6 mol of H₂; only 3 mol is available, so hydrogen runs out first.'),
      ],
    },
    'chem-u4-l1': {
      labs: ['chem-gas'],
      phet: [
        phet(
          'molecules-and-light',
          'Molecules and Light',
          'Ozone chemistry and the greenhouse effect are both about which molecules absorb which light. Test them one at a time.',
          'Shine infrared light on N₂, O₂, CO₂, and H₂O. Which absorb, and what do the molecules do?',
          'Shine ultraviolet light on O₃. Describe what happens and connect it to the ozone layer’s protective role.',
          'Explain why the two most abundant gases in air are not greenhouse gases.',
        ),
      ],
      sort: sort('Which gas law applies?', ['Boyle (P–V)', 'Charles (V–T)', 'Avogadro (V–n)', 'Dalton (partial pressures)'], [
        ['A syringe is squeezed at constant temperature', 0],
        ['A balloon expands when warmed at constant pressure', 1],
        ['Adding more gas inflates a balloon further', 2],
        ['Total pressure of air equals the sum from N₂, O₂, and Ar', 3],
        ['Gas collected over water includes water vapour pressure', 3],
        ['A bubble grows as it rises from the sea floor', 0],
      ]),
      checks: [
        check(1, 'A fixed amount of gas is heated from 300 K to 600 K at constant pressure. Its volume…', ['Doubles', 'Halves', 'Increases by 300 L', 'Is unchanged'], 'Charles’s law: V ∝ T when T is in kelvin. Doubling the absolute temperature doubles the volume.'),
      ],
    },
    'chem-u5-l1': {
      labs: ['chem-equilibrium'],
      sort: sort('Which way does the equilibrium N₂ + 3 H₂ ⇌ 2 NH₃ (exothermic) shift?', ['Toward products', 'Toward reactants', 'No shift'], [
        ['More N₂ is added', 0],
        ['NH₃ is removed as it forms', 0],
        ['The temperature is raised', 1],
        ['The total pressure is increased by compression', 0],
        ['A catalyst is added', 2],
        ['H₂ is removed', 1],
      ]),
      checks: [
        check(2, 'For a reaction mixture, Q is larger than K. The system will…', ['Form more reactants until Q falls to K', 'Form more products until Q rises to K', 'Stay as it is', 'Change K to match Q'], 'Q > K means the product-to-reactant ratio is too high. K is fixed at a given temperature; the concentrations move.'),
      ],
    },
    'chem-u6-l1': {
      labs: ['chem-buffer'],
      phet: [
        phet(
          'acid-base-solutions',
          'Acid–Base Solutions',
          'Strength is how completely an acid ionises; concentration is how much you dissolved. Separate the two with the molecule view.',
          'Compare a strong acid and a weak acid at the same concentration. How do the particle pictures and pH differ?',
          'On the My Solution screen, make a weak acid ten times more concentrated. Does pH change by a whole unit?',
          'Find a weak-acid setting and a strong-acid setting with the same pH. What is different about them?',
        ),
        phet(
          'ph-scale',
          'pH Scale',
          'A logarithmic scale hides large changes in concentration. Dilute real liquids and read H₃O⁺ and OH⁻ directly.',
          'On the Micro screen, dilute battery acid tenfold with water. By how much does the pH change?',
          'Find a liquid with ten times the H₃O⁺ concentration of coffee.',
        ),
      ],
      sort: sort('Classify the 0.1 M aqueous solution', ['Acidic', 'Neutral', 'Basic'], [
        ['HCl', 0],
        ['NaCl', 1],
        ['NH₃', 2],
        ['NH₄Cl', 0],
        ['CH₃COONa (sodium acetate)', 2],
        ['KNO₃', 1],
      ]),
      checks: [
        check(1, 'A 0.10 M solution of acid HA has pH 3.0. HA is…', ['A weak acid — only about 1% is ionised', 'A strong acid', 'A strong base', 'Not an acid at all'], 'A strong 0.10 M monoprotic acid would have pH 1.0. pH 3.0 means [H⁺] = 0.001 M, just 1% of the acid.'),
      ],
    },
    'chem-u7-l1': {
      labs: ['chem-gibbs'],
      sort: sort('Sign of the system’s entropy change?', ['ΔS > 0', 'ΔS < 0'], [
        ['Ice melts', 0],
        ['Water vapour condenses', 1],
        ['A solid dissolves and its ions disperse', 0],
        ['2 NO₂(g) → N₂O₄(g)', 1],
        ['CaCO₃(s) → CaO(s) + CO₂(g)', 0],
        ['A gas is compressed at constant temperature', 1],
      ]),
      checks: [
        check(1, 'In a coffee-cup calorimeter the solution warms when two solutions are mixed. The reaction is…', ['Exothermic: ΔH is negative', 'Endothermic: ΔH is positive', 'At equilibrium', 'Non-spontaneous'], 'The surroundings (the solution) gained heat, so the reacting system lost it: q_rxn = −q_solution.'),
      ],
    },
    'chem-u8-l1': {
      labs: ['chem-arrhenius'],
      sort: sort('Which reaction order fits the evidence?', ['Zero order', 'First order', 'Second order'], [
        ['Concentration falls linearly with time', 0],
        ['ln[A] against time is a straight line', 1],
        ['1/[A] against time is a straight line', 2],
        ['Half-life is constant', 1],
        ['Doubling [A] quadruples the rate', 2],
        ['Rate is unchanged when [A] doubles', 0],
      ]),
      checks: [
        check(1, 'Doubling [A] doubles the rate; doubling [B] has no effect. The rate law is…', ['rate = k[A]', 'rate = k[A][B]', 'rate = k[A]²', 'rate = k[B]'], 'Rate is first order in A and zero order in B. Orders come from experiment, not from the balanced equation.'),
      ],
    },
    'chem-u9-l1': {
      labs: ['chem-inhibition'],
      sort: sort('What does this change on a Michaelis–Menten plot?', ['Raises Vmax', 'Raises apparent Km', 'Lowers Vmax'], [
        ['Doubling the enzyme concentration', 0],
        ['Adding a competitive inhibitor', 1],
        ['Adding a noncompetitive inhibitor', 2],
        ['Denaturing half of the enzyme', 2],
        ['Adding more of a molecule that competes for the active site', 1],
        ['Tripling the amount of active enzyme', 0],
      ]),
      checks: [
        check(2, 'At a substrate concentration equal to Km, the reaction rate is…', ['Half of Vmax', 'Equal to Vmax', 'One quarter of Vmax', 'Zero'], 'v = Vmax[S]/(Km + [S]); when [S] = Km this is Vmax/2. That is the operational definition of Km.'),
      ],
    },
  },
};
