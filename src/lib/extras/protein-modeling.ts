import { check, phet, sort, type EventExtras } from '../lesson-extras.ts';
import {
  choice,
  circle,
  ellipse,
  goal,
  line,
  near,
  path,
  rect,
  slider,
  text,
  toggle,
  type Shape,
  type Tone,
  type TopicLab,
} from '../topic-lab-kit.ts';

const resolution: TopicLab = {
  id: 'prot-resolution',
  title: 'What a structure’s resolution lets you see',
  lead: 'Every deposited structure reports a resolution in ångströms. It tells you which features of the model are measured and which are inferred.',
  controls: [slider('res', 'Reported resolution', 1, 6, 0.1, 3.5, 'Å')],
  run: (v) => {
    const level = v.res <= 1.5 ? 4 : v.res <= 2.5 ? 3 : v.res <= 3.5 ? 2 : v.res <= 5 ? 1 : 0;
    const zig = Array.from({ length: 9 }, (_, i) => [120 + i * 50, 170 + (i % 2 ? -34 : 34)]);
    const shapes: Shape[] =
      level === 0
        ? [ellipse(320, 170, 230, 70, 'accent', true, 0.3)]
        : level === 1
          ? [rect(100, 135, 440, 70, 'accent', true, 0.35, 35)]
          : [
              path(
                `M${zig.map(([x, y]) => `${x},${y}`).join('L')}`,
                'accent',
                false,
                level === 2 ? 16 : 5,
                level === 2 ? 0.5 : 1,
              ),
              ...(level >= 3
                ? zig.flatMap(([x, y], i) => [
                    line(x, y, x, y + (i % 2 ? -42 : 42), 'slot', 3),
                    circle(
                      x,
                      y + (i % 2 ? -46 : 46),
                      level === 4 ? 6 : 10,
                      'slot',
                      true,
                      level === 4 ? 1 : 0.5,
                    ),
                  ])
                : []),
              ...(level === 4 ? zig.map(([x, y]) => circle(x, y, 6, 'gold')) : []),
            ];
    return {
      o: { level },
      metrics: [
        {
          label: 'Detail you can interpret',
          value: [
            'Overall molecular envelope only',
            'Helices as rods and sheets as slabs',
            'Main-chain trace and bulky side chains',
            'Side-chain conformations and ordered waters',
            'Individual atoms and hydrogen-bond geometry',
          ][level],
        },
        {
          label: 'Side-chain positions',
          value:
            level >= 3
              ? 'Supported by the data'
              : level === 2
                ? 'Partly modelled from expectation'
                : 'Not determined by the data',
        },
        {
          label: 'Suitable for',
          value:
            level >= 3
              ? 'Annotating specific contacts'
              : level >= 1
                ? 'Fold and secondary-structure claims'
                : 'Shape and assembly claims only',
        },
      ],
      sceneLabel: `Schematic of interpretable detail in a helix at ${v.res} ångström resolution`,
      scene: [
        ...shapes,
        text(320, 40, `${v.res} Å`, 'middle', 'slot', 18),
        text(
          320,
          310,
          'Schematic of one stretch of chain as the map would let you interpret it',
          'middle',
          'muted',
          11,
        ),
      ],
    };
  },
  missions: [
    goal(
      'Find the coarsest resolution at which side-chain conformations are still supported by the data.',
      'Around two and a half ångströms individual side chains become distinct.',
      { res: 2.5 },
      (o, v) => near(v.res, 2.5, 1e-9),
    ),
    goal(
      'Find a resolution at which helices appear only as rods, with no chain trace.',
      'Coarser than about 3.5 Å but not beyond 5 Å.',
      { res: 4.5 },
      (o) => o.level === 1,
    ),
    goal(
      'Reach atomic resolution, where individual atoms are distinct.',
      'Individual atoms separate at about 1.5 Å or better.',
      { res: 1.2 },
      (o) => o.level === 4,
    ),
  ],
  predict: {
    q: 'One structure is reported at 1.5 Å and another at 3.5 Å. The 1.5 Å structure…',
    options: [
      'Resolves finer detail',
      'Is of a larger protein',
      'Was solved more recently',
      'Has fewer atoms in the model',
    ],
    correct: 0,
    why: 'Resolution is the smallest spacing the data distinguish, so a smaller number means more detail. It says nothing about protein size or date.',
  },
  model:
    'Rule-of-thumb thresholds for interpreting electron-density or cryo-EM maps; they vary with data quality and local order. Even in a high-resolution structure, flexible loops can be poorly defined — check per-residue quality indicators as well as the headline number.',
};

const translation: TopicLab = {
  id: 'prot-translation',
  title: 'Chain length, mass, and time on the ribosome',
  lead: 'A polypeptide is built one residue at a time. Its length sets its mass, the size of its message, and how long the ribosome works.',
  controls: [
    slider('n', 'Amino-acid residues', 50, 2000, 1, 300, ''),
    slider('rate', 'Elongation rate', 2, 20, 1, 5, 'residues/s'),
  ],
  run: (v) => ({
    o: { time: v.n / v.rate, mass: (v.n * 110) / 1000 },
    metrics: [
      { label: 'Time to synthesise one chain', value: v.n / v.rate, unit: 's' },
      { label: 'Approximate mass', value: (v.n * 110) / 1000, unit: 'kDa' },
      { label: 'Coding nucleotides including the stop codon', value: 3 * v.n + 3 },
      { label: 'Length if entirely α-helix', value: v.n * 0.15, unit: 'nm' },
      { label: 'Length if fully extended', value: v.n * 0.34, unit: 'nm' },
    ],
    plot: {
      title: 'Synthesis time at this elongation rate',
      x: [50, 2000, 'Residues'],
      y: [0, 1000, 'Time (s)'],
      curves: [{ f: (n) => n / v.rate }],
      points: [{ x: v.n, y: v.n / v.rate, label: `${(v.n / v.rate).toFixed(0)} s` }],
    },
  }),
  missions: [
    goal(
      'The hemagglutinin precursor has 566 residues. Find how long a eukaryotic ribosome at 5 residues per second needs to make it.',
      'Time = residues ÷ rate.',
      { n: 566 },
      (o, v) => v.n === 566 && v.rate === 5,
    ),
    goal(
      'Find the chain length whose mass is about 55 kDa.',
      'An average residue contributes about 110 Da.',
      { n: 500 },
      (o) => near(o.mass, 55, 0.3),
    ),
    goal(
      'Synthesise the starting 300-residue protein in 15 seconds.',
      'That is a bacterial elongation rate.',
      { rate: 20 },
      (o, v) => v.n === 300 && near(o.time, 15, 1e-9),
    ),
  ],
  predict: {
    q: 'A coding region of 900 nucleotides, not counting the stop codon, specifies how many amino acids?',
    options: ['300', '900', '2,700', '450'],
    correct: 0,
    why: 'Codons are read three nucleotides at a time without overlap, so 900 ÷ 3 = 300 residues.',
  },
  model:
    'Average residue mass 110 Da; 0.15 nm rise per residue in an α-helix and about 0.34 nm per residue for an extended strand. Elongation rates of roughly 5 residues/s (eukaryotes) to 20 residues/s (bacteria) are typical averages; initiation, pausing, and folding time are not included.',
};

const rx = (phi: number) => 140 + ((phi + 180) / 360) * 360,
  ry = (psi: number) => 300 - ((psi + 180) / 360) * 260;
const ramachandran: TopicLab = {
  id: 'prot-ramachandran',
  title: 'Backbone angles on a Ramachandran plot',
  lead: 'Two rotatable bonds per residue, φ and ψ, define the backbone’s path. Only some combinations avoid atoms colliding — and those correspond to secondary structures.',
  controls: [
    slider('phi', 'φ (phi)', -180, 180, 5, 0, '°'),
    slider('psi', 'ψ (psi)', -180, 180, 5, 0, '°'),
  ],
  run: (v) => {
    const region =
      v.phi >= -100 && v.phi <= -45 && v.psi >= -70 && v.psi <= -20
        ? 1
        : v.phi >= -160 && v.phi <= -60 && v.psi >= 100 && v.psi <= 180
          ? 2
          : v.phi >= 45 && v.phi <= 90 && v.psi >= 20 && v.psi <= 80
            ? 3
            : 0;
    const box = (
      p1: number,
      p2: number,
      s1: number,
      s2: number,
      tone: Tone,
      label: string,
    ): Shape[] => [
      rect(rx(p1), ry(s2), rx(p2) - rx(p1), ry(s1) - ry(s2), tone, true, 0.3, 4),
      text((rx(p1) + rx(p2)) / 2, ry(s2) - 6, label, 'middle', tone, 11),
    ];
    return {
      o: { region },
      metrics: [
        {
          label: 'Conformation',
          value: [
            'Sterically strained for most residues',
            'Right-handed α-helix',
            'β-strand',
            'Left-handed helix',
          ][region],
        },
        {
          label: 'Typically found in',
          value: [
            'Rarely — except glycine, which has no side chain',
            'Helices; about 3.6 residues per turn',
            'Sheets; an extended, pleated chain',
            'Tight turns; mostly glycine',
          ][region],
        },
      ],
      sceneLabel: `Ramachandran plot with the residue at phi ${v.phi} and psi ${v.psi} degrees`,
      scene: [
        rect(rx(-180), ry(180), 360, 260, 'muted', false),
        line(rx(0), ry(-180), rx(0), ry(180), 'muted', 1, true),
        line(rx(-180), ry(0), rx(180), ry(0), 'muted', 1, true),
        ...box(-160, -60, 100, 180, 'cool', 'β-strand'),
        ...box(-100, -45, -70, -20, 'warm', 'α-helix'),
        ...box(45, 90, 20, 80, 'green', 'left-handed'),
        ...[-180, -90, 0, 90, 180].flatMap((a) => [
          text(rx(a), 318, `${a}`, 'middle', 'muted', 11),
          text(132, ry(a) + 4, `${a}`, 'end', 'muted', 11),
        ]),
        text(320, 336, 'φ (degrees)', 'middle'),
        text(60, 174, 'ψ (degrees)'),
        circle(rx(v.phi), ry(v.psi), 8, 'slot'),
      ],
    };
  },
  missions: [
    goal(
      'Place the residue in the right-handed α-helix region.',
      'Both angles negative: about φ = −60°, ψ = −45°.',
      { phi: -60, psi: -45 },
      (o) => o.region === 1,
    ),
    goal(
      'Place the residue in the β-strand region.',
      'φ negative and ψ strongly positive: about −120°, +130°.',
      { phi: -120, psi: 130 },
      (o) => o.region === 2,
    ),
    goal(
      'Place the residue in the left-handed helix region.',
      'Mirror the α-helix: both angles positive.',
      { phi: 60, psi: 45 },
      (o) => o.region === 3,
    ),
  ],
  predict: {
    q: 'Which amino acid is most often found with a positive φ angle, in regions other residues avoid?',
    options: ['Glycine', 'Proline', 'Tryptophan', 'Valine'],
    correct: 0,
    why: 'Glycine’s side chain is a single hydrogen, so conformations that would make a β-carbon clash with the backbone are open to it.',
  },
  model:
    'Simplified rectangular “allowed” regions. Measured distributions are irregular, broader for glycine and narrower for proline, and include a polyproline II region near the β area. φ and ψ describe one residue; a secondary structure needs several consecutive residues in the same region.',
};

const stability: TopicLab = {
  id: 'prot-stability',
  title: 'Thermal denaturation curve',
  lead: 'Heat a protein and it unfolds over a narrow range of temperature. The midpoint and the steepness both carry information about what holds it together.',
  controls: [
    slider('dh', 'Enthalpy of unfolding', 100, 600, 20, 300, 'kJ/mol'),
    slider('tm', 'Melting temperature', 30, 90, 1, 60, '°C'),
    slider('t', 'Sample temperature', 0, 100, 1, 25, '°C'),
  ],
  run: (v) => {
    const folded = (t: number) => {
      const kelvin = t + 273.15,
        dg = v.dh * (1 - kelvin / (v.tm + 273.15));
      return 1 / (1 + Math.exp(-dg / (0.008314 * kelvin)));
    };
    const dg = v.dh * (1 - (v.t + 273.15) / (v.tm + 273.15));
    return {
      o: { folded: folded(v.t), dg },
      metrics: [
        { label: 'Fraction folded', value: folded(v.t) * 100, unit: '%' },
        { label: 'Free energy of unfolding', value: dg, unit: 'kJ/mol' },
        {
          label: 'State',
          value:
            folded(v.t) > 0.9
              ? 'Predominantly native'
              : folded(v.t) < 0.1
                ? 'Predominantly unfolded'
                : 'In the transition',
        },
      ],
      plot: {
        title: 'Two-state unfolding',
        x: [0, 100, 'Temperature (°C)'],
        y: [0, 1, 'Fraction folded'],
        curves: [{ f: folded }],
        vlines: [{ x: v.tm, label: 'Tm' }],
        points: [{ x: v.t, y: folded(v.t), label: `${(folded(v.t) * 100).toFixed(0)}%` }],
      },
    };
  },
  missions: [
    goal(
      'Find the temperature at which exactly half of the molecules are folded.',
      'That is the definition of the melting temperature.',
      { t: 60 },
      (o) => near(o.folded, 0.5, 0.01),
    ),
    goal(
      'Make the transition sharp enough that the protein is at least 90% unfolded within 5 °C above its Tm.',
      'A larger unfolding enthalpy means more cooperative unfolding.',
      { dh: 600, t: 65 },
      (o, v) => v.t > v.tm && v.t - v.tm <= 5 && o.folded < 0.1,
    ),
    goal(
      'Design a heat-stable protein that is still at least 95% folded at 80 °C.',
      'Raise the Tm, and make the transition steep enough.',
      { tm: 90, t: 80, dh: 400 },
      (o, v) => v.t === 80 && o.folded >= 0.95,
    ),
  ],
  predict: {
    q: 'Two proteins have the same Tm, but one has a much larger enthalpy of unfolding. Its melting curve is…',
    options: [
      'Steeper — unfolding is more cooperative',
      'Shallower',
      'Shifted to a higher temperature',
      'Identical',
    ],
    correct: 0,
    why: 'ΔH sets how rapidly the folded–unfolded equilibrium changes with temperature near Tm, so a larger ΔH gives a sharper all-or-none transition.',
  },
  model:
    'Two-state model with ΔG_unfold = ΔH(1 − T/Tm) and fraction folded = 1/(1 + e^(−ΔG/RT)). The heat-capacity change on unfolding is ignored, so cold denaturation and curvature of ΔG are not reproduced. Aggregation makes many real unfolding transitions irreversible.',
};

const charge: TopicLab = {
  id: 'prot-charge',
  title: 'Net charge of a peptide as pH changes',
  lead: 'Ionisable side chains gain and lose protons at characteristic pH values. Their sum decides the peptide’s net charge and its isoelectric point.',
  controls: [
    slider('ph', 'Solution pH', 0, 14, 0.1, 7, ''),
    slider('acid', 'Asp + Glu residues', 0, 10, 1, 3, ''),
    slider('his', 'His residues', 0, 5, 1, 1, ''),
    slider('base', 'Lys + Arg residues', 0, 10, 1, 2, ''),
  ],
  run: (v) => {
    const q = (ph: number) =>
      1 / (1 + 10 ** (ph - 9)) -
      1 / (1 + 10 ** (2 - ph)) -
      v.acid / (1 + 10 ** (4 - ph)) +
      v.his / (1 + 10 ** (ph - 6)) +
      v.base / (1 + 10 ** (ph - 10.8));
    let lo = 0,
      hi = 14;
    for (let i = 0; i < 50; i++) {
      const mid = (lo + hi) / 2;
      if (q(mid) > 0) lo = mid;
      else hi = mid;
    }
    return {
      o: { charge: q(v.ph), pi: (lo + hi) / 2, hisCharge: v.his / (1 + 10 ** (v.ph - 6)) },
      metrics: [
        { label: 'Net charge at this pH', value: Number(q(v.ph).toFixed(2)) },
        { label: 'Isoelectric point (pI)', value: Number(((lo + hi) / 2).toFixed(2)) },
        {
          label: 'Charge carried by the histidines',
          value: Number((v.his / (1 + 10 ** (v.ph - 6))).toFixed(2)),
        },
      ],
      plot: {
        title: 'Titration of the whole peptide',
        x: [0, 14, 'pH'],
        y: [-12, 12, 'Net charge'],
        curves: [{ f: q }],
        hlines: [{ y: 0, label: 'neutral' }],
        points: [{ x: v.ph, y: q(v.ph), label: q(v.ph).toFixed(2) }],
      },
    };
  },
  missions: [
    goal(
      'Find the pH at which the starting peptide carries no net charge.',
      'It has more acidic than basic groups, so its pI lies below 7.',
      { ph: 5.3 },
      (o, v) => v.acid === 3 && v.his === 1 && v.base === 2 && near(o.charge, 0, 0.06),
    ),
    goal(
      'Redesign the peptide so that it carries a net charge of at least +2 at pH 7.',
      'Add lysine or arginine until the basic groups clearly outnumber the acidic ones.',
      { base: 5 },
      (o, v) => near(v.ph, 7, 1e-9) && o.charge >= 2,
    ),
    goal(
      'Set the pH at which each histidine is exactly half protonated.',
      'That pH equals histidine’s side-chain pKa, close to 6.',
      { ph: 6 },
      (o, v) => v.his >= 1 && near(o.hisCharge, v.his / 2, 0.01),
    ),
  ],
  predict: {
    q: 'At a pH above its isoelectric point, a protein carries a net…',
    options: [
      'Negative charge',
      'Positive charge',
      'Zero charge',
      'Charge that depends only on its size',
    ],
    correct: 0,
    why: 'Raising the pH removes protons: acidic groups are fully ionised (−) and basic groups progressively lose their positive charge.',
  },
  model:
    'Henderson–Hasselbalch for each group with typical pKa values: C-terminus 2.0, Asp/Glu 4.0, His 6.0, N-terminus 9.0, Lys/Arg 10.8 (a single averaged basic value). Real pKa values shift by up to several units inside a folded protein; Cys and Tyr are omitted.',
};

const binding: TopicLab = {
  id: 'prot-binding',
  title: 'Antibody binding and escape mutations',
  lead: 'Occupancy of an epitope depends on antibody concentration relative to the dissociation constant. A single mutation can weaken binding a hundredfold.',
  controls: [
    slider('logkd', 'Dissociation constant, log₁₀ (nM)', -1, 3, 0.1, 0, ''),
    slider('logab', 'Antibody concentration, log₁₀ (nM)', -1, 3, 0.1, 1, ''),
    slider('fold', 'Epitope mutation weakens binding by 10^', 0, 3, 0.5, 0, ''),
  ],
  run: (v) => {
    const kd = 10 ** (v.logkd + v.fold),
      bound = (logab: number, k: number) => 10 ** logab / (10 ** logab + k);
    return {
      o: { bound: bound(v.logab, kd), kd },
      metrics: [
        { label: 'Effective Kd', value: kd, unit: 'nM' },
        { label: 'Antibody concentration', value: 10 ** v.logab, unit: 'nM' },
        { label: 'Epitopes occupied', value: bound(v.logab, kd) * 100, unit: '%' },
      ],
      plot: {
        title: 'Binding curves',
        x: [-1, 3, 'log₁₀ antibody concentration (nM)'],
        y: [0, 1, 'Fraction of epitopes bound'],
        curves: [
          { f: (x) => bound(x, kd), label: v.fold > 0 ? 'mutant epitope' : 'this epitope' },
          {
            f: (x) => bound(x, 10 ** v.logkd),
            label: 'original epitope',
            dash: true,
            tone: 'muted',
          },
        ],
        hlines: [{ y: 0.5, label: 'half occupied' }],
        points: [
          { x: v.logab, y: bound(v.logab, kd), label: `${(bound(v.logab, kd) * 100).toFixed(0)}%` },
        ],
      },
    };
  },
  missions: [
    goal(
      'With no mutation, find the antibody concentration at which exactly half the epitopes are occupied.',
      'Half occupancy occurs when the concentration equals Kd.',
      { logab: 0 },
      (o, v) => v.fold === 0 && near(o.bound, 0.5, 0.005),
    ),
    goal(
      'At 10 nM antibody, introduce a mutation that drops occupancy below 10%.',
      'The effective Kd must rise above about 90 nM.',
      { fold: 2 },
      (o, v) => near(v.logab, 1, 1e-9) && o.bound < 0.1,
    ),
    goal(
      'Against that hundredfold-weakened mutant, find the antibody concentration that restores half occupancy.',
      'The new Kd is 100 nM.',
      { fold: 2, logab: 2 },
      (o, v) => v.fold === 2 && near(o.bound, 0.5, 0.005),
    ),
  ],
  predict: {
    q: 'Compared with an antibody of Kd = 100 nM, one with Kd = 1 nM…',
    options: [
      'Binds more tightly, reaching half occupancy at a lower concentration',
      'Binds more weakly',
      'Binds at the same concentration but more slowly',
      'Cannot dissociate',
    ],
    correct: 0,
    why: 'Kd is the concentration giving half occupancy, so a smaller Kd means tighter binding. It is an equilibrium property and does not specify speed.',
  },
  model:
    'Single-site equilibrium binding, fraction bound = [Ab] / ([Ab] + Kd), with antibody in excess over epitope. Real antibodies are bivalent (avidity), sera are polyclonal, and escape usually requires several epitope changes — which is why antigenic drift is gradual.',
};

const fusion: TopicLab = {
  id: 'prot-fusion',
  title: 'Acid-triggered hemagglutinin fusion',
  lead: 'After the virus is taken into an endosome, falling pH triggers hemagglutinin to refold and drive membrane fusion. Timing depends on how acid-stable the protein is.',
  controls: [
    slider('time', 'Time since uptake', 0, 20, 0.5, 0, 'min'),
    slider('ph50', 'pH at which half the HA has refolded', 4.8, 6.2, 0.1, 5.5, ''),
    toggle('block', 'Drug blocks endosome acidification'),
  ],
  run: (v) => {
    const ph = (t: number) => 7.4 - (v.block ? 0.9 : 2.4) * (1 - Math.exp(-t / 5)),
      triggered = (t: number) => 1 / (1 + 10 ** (4 * (ph(t) - v.ph50)));
    return {
      o: { ph: ph(v.time), triggered: triggered(v.time) },
      metrics: [
        { label: 'Endosomal pH now', value: Number(ph(v.time).toFixed(2)) },
        {
          label: 'Hemagglutinin in the fusion-active form',
          value: triggered(v.time) * 100,
          unit: '%',
        },
        {
          label: 'Outcome',
          value:
            triggered(v.time) > 0.5
              ? 'Fusion peptide deployed — viral genome can escape'
              : 'Still in the prefusion form',
        },
      ],
      plot: {
        title: 'Refolding follows the endosome’s falling pH',
        x: [0, 20, 'Time since uptake (min)'],
        y: [0, 1, 'Fraction refolded'],
        curves: [
          { f: triggered, label: 'HA refolded' },
          {
            f: (t) => (ph(t) - 4.5) / 3,
            label: 'endosomal pH (scaled 4.5–7.5)',
            dash: true,
            tone: 'muted',
          },
        ],
        points: [
          { x: v.time, y: triggered(v.time), label: `${(triggered(v.time) * 100).toFixed(0)}%` },
        ],
      },
    };
  },
  missions: [
    goal(
      'With the starting hemagglutinin, find the time at which about half of it has refolded.',
      'The endosome reaches pH 5.5 after roughly eight minutes.',
      { time: 8 },
      (o, v) => v.block === 0 && near(v.ph50, 5.5, 1e-9) && near(o.triggered, 0.5, 0.06),
    ),
    goal(
      'Show that a more acid-stable hemagglutinin (half-refolded at pH 5.0) is still under 10% refolded at eight minutes.',
      'It needs a more acidic, later endosome.',
      { time: 8, ph50: 5 },
      (o, v) => near(v.ph50, 5, 1e-9) && v.time === 8 && o.triggered < 0.1,
    ),
    goal(
      'Block acidification and confirm that fusion fails even after 20 minutes.',
      'Without the pH drop the trigger never arrives.',
      { block: 1, time: 20 },
      (o, v) => v.block === 1 && v.time === 20 && o.triggered < 0.01,
    ),
  ],
  predict: {
    q: 'Hemagglutinin’s fusion peptide is exposed when…',
    options: [
      'The endosome acidifies and triggers a large conformational change',
      'The virus first touches sialic acid at the cell surface',
      'Neuraminidase cleaves the receptor',
      'The viral RNA is replicated',
    ],
    correct: 0,
    why: 'Receptor binding only attaches the virus. Low pH releases the spring-loaded HA2 subunit, which inserts the fusion peptide into the endosomal membrane.',
  },
  model:
    'Endosomal pH relaxes exponentially from 7.4 toward 5.0 (or 6.5 with the blocker) with a five-minute time constant; refolding follows a steep sigmoid in pH. Values are illustrative — activation pH differs between strains and is one factor in host adaptation and stability.',
};

const pairs = [
  'Backbone N–H ··· O=C',
  'Lys NH₃⁺ ··· ⁻OOC Asp',
  'Leu CH₃ ··· CH₃ Val',
  'Cys S ··· S Cys',
];
const distance: TopicLab = {
  id: 'prot-distance',
  title: 'Classifying contacts from distance and angle',
  lead: 'A molecular viewer reports distances. Deciding what kind of interaction — if any — a pair of atoms makes also takes chemistry and geometry.',
  controls: [
    choice('pair', 'Atom pair selected', pairs, 0),
    slider('dist', 'Measured distance', 1.8, 6, 0.1, 4.5, 'Å'),
    slider('angle', 'Donor–H···acceptor angle', 90, 180, 5, 120, '°'),
  ],
  run: (v) => {
    const kind =
      v.pair === 0
        ? v.dist <= 3.5
          ? v.angle >= 130
            ? 1
            : 2
          : 0
        : v.pair === 1
          ? v.dist <= 4
            ? 3
            : 0
          : v.pair === 2
            ? v.dist < 3.3
              ? 5
              : v.dist <= 4.5
                ? 4
                : 0
            : v.dist <= 2.2
              ? 6
              : 0;
    const name = [
      'No specific interaction at this distance',
      'Hydrogen bond',
      'Close, but too bent to be a good hydrogen bond',
      'Salt bridge (ion pair)',
      'Van der Waals contact',
      'Steric clash — check the model',
      'Disulfide bond (covalent)',
    ][kind];
    const x2 = 200 + v.dist * 55,
      tone: Tone = kind === 0 || kind === 2 ? 'muted' : kind === 5 ? 'warm' : 'green';
    return {
      o: { kind },
      metrics: [
        { label: 'Interpretation', value: name },
        { label: 'Distance', value: v.dist, unit: 'Å' },
        {
          label: 'Angle matters here?',
          value:
            v.pair === 0 ? 'Yes — hydrogen bonds are directional' : 'Not for this type of contact',
        },
      ],
      sceneLabel: `${pairs[v.pair]} separated by ${v.dist} ångströms: ${name}`,
      scene: [
        circle(200, 170, 24, 'cool'),
        circle(x2, 170, 24, 'warm'),
        line(224, 170, x2 - 24, 170, tone, kind === 6 ? 5 : 2.5, kind !== 6),
        text(200, 220, pairs[v.pair].split(' ··· ')[0], 'middle'),
        text(x2, 220, pairs[v.pair].split(' ··· ')[1], 'middle'),
        text((200 + x2) / 2, 150, `${v.dist} Å`, 'middle', tone),
        text(320, 290, name, 'middle', tone, 15),
        ...(v.pair === 0
          ? [text(320, 60, `donor–H···acceptor angle: ${v.angle}°`, 'middle', 'muted')]
          : []),
      ],
    };
  },
  missions: [
    goal(
      'Set up a backbone hydrogen bond with good geometry.',
      'About 2.9 Å between N and O, and a nearly straight angle.',
      { dist: 2.9, angle: 165 },
      (o) => o.kind === 1,
    ),
    goal(
      'Keep that distance but break the hydrogen bond by geometry alone.',
      'Bend the donor–H···acceptor angle well below 130°.',
      { dist: 2.9, angle: 100 },
      (o, v) => v.dist <= 3.5 && o.kind === 2,
    ),
    goal(
      'Find a salt bridge between oppositely charged side chains.',
      'Select the charged pair and bring them within 4 Å.',
      { pair: 1, dist: 3.5 },
      (o) => o.kind === 3,
    ),
    goal(
      'Find the distance at which two cysteines form a disulfide bond.',
      'Two cysteine sulfurs bonded covalently are only about 2.05 Å apart.',
      { pair: 3, dist: 2.1 },
      (o) => o.kind === 6,
    ),
  ],
  predict: {
    q: 'Two polar atoms are measured at 3.0 Å apart. Before annotating a hydrogen bond you should also check…',
    options: [
      'That one is a donor and one an acceptor, and that the geometry is close to linear',
      'Only that both atoms are oxygen',
      'That the residues are adjacent in sequence',
      'Nothing more; distance alone is sufficient',
    ],
    correct: 0,
    why: 'Hydrogen bonds are directional and need a donor–acceptor pair. Two acceptors at 3.0 Å repel rather than bond.',
  },
  model:
    'Common annotation cut-offs: hydrogen bond ≤ 3.5 Å between heavy atoms with an angle ≥ 130°; salt bridge ≤ 4.0 Å between charged groups; van der Waals contact 3.3–4.5 Å; disulfide S–S ≈ 2.05 Å. Different programs use different thresholds, so record the criteria you applied.',
};

const scale: TopicLab = {
  id: 'prot-scale',
  title: 'Planning a physical model to scale',
  lead: 'Before bending any material, budget its length. Helices, strands, and loops use the chain very differently in the real protein.',
  controls: [
    slider('helix', 'Residues in α-helices', 0, 60, 1, 12, ''),
    slider('strand', 'Residues in β-strands', 0, 40, 1, 0, ''),
    slider('loop', 'Residues in loops', 0, 40, 1, 6, ''),
    slider('scale', 'Model scale', 1, 3, 0.5, 2, 'cm per residue'),
  ],
  run: (v) => {
    const residues = v.helix + v.strand + v.loop;
    return {
      o: { residues, length: residues * v.scale, turns: v.helix / 3.6 },
      metrics: [
        { label: 'Residues modelled', value: residues },
        { label: 'Backbone material needed', value: residues * v.scale, unit: 'cm' },
        { label: 'Helical turns to form', value: Number((v.helix / 3.6).toFixed(2)) },
        { label: 'Real length of the helical residues', value: v.helix * 1.5, unit: 'Å' },
        { label: 'Real length of the strand residues', value: v.strand * 3.3, unit: 'Å' },
        {
          label: 'Magnification along the chain',
          value: Number(((v.scale / 3.8) * 100).toFixed(1)),
          unit: 'million ×',
        },
      ],
      bars: {
        title: 'End-to-end length in the real protein (Å)',
        max: 200,
        items: [
          { label: 'α-helix residues (1.5 Å each)', value: v.helix * 1.5, tone: 'warm' },
          { label: 'β-strand residues (3.3 Å each)', value: v.strand * 3.3, tone: 'cool' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Plan a helix with exactly five complete turns.',
      'An α-helix has 3.6 residues per turn.',
      { helix: 18 },
      (o) => near(o.turns, 5, 1e-9),
    ),
    goal(
      'Model 60 residues using no more than 100 cm of backbone material.',
      'Choose a smaller scale.',
      { helix: 36, strand: 14, loop: 10, scale: 1.5 },
      (o) => o.residues === 60 && o.length <= 100,
    ),
    goal(
      'Compare a 20-residue helix with a 20-residue strand in the real protein.',
      'Set both counts to 20 and read the two lengths.',
      { helix: 20, strand: 20 },
      (o, v) => v.helix === 20 && v.strand === 20,
    ),
  ],
  predict: {
    q: 'The same number of residues spans the greatest distance when it forms…',
    options: ['An extended β-strand', 'An α-helix', 'A tight turn', 'All span the same distance'],
    correct: 0,
    why: 'A strand advances about 3.3 Å per residue, more than twice the 1.5 Å rise per residue of a coiled α-helix.',
  },
  model:
    'α-helix: 3.6 residues per turn, 1.5 Å rise per residue; β-strand: about 3.3 Å per residue; consecutive α-carbons are 3.8 Å apart along the chain. The material estimate assumes one fixed length of backbone per residue regardless of secondary structure.',
};

export const proteinModelingExtras: EventExtras = {
  eventId: 'protein-modeling',
  labs: [
    resolution,
    translation,
    ramachandran,
    stability,
    charge,
    binding,
    fusion,
    distance,
    scale,
  ],
  lessons: {
    'prot-u1-l1': {
      labs: ['prot-resolution'],
      sort: sort(
        'Measured by the experiment, or added by the modeller?',
        ['Supported directly by data', 'Interpretation or annotation'],
        [
          ['Atomic coordinates in a high-resolution region', 0],
          ['A cartoon ribbon drawn through the chain', 1],
          ['The reported resolution', 0],
          ['Colours chosen for each domain', 1],
          ['A label saying “active site”', 1],
          ['The sequence of the crystallised protein', 0],
        ],
      ),
      checks: [
        check(
          2,
          'A four-character code such as 1RUZ identifies…',
          [
            'One deposited structure entry in the Protein Data Bank',
            'A single amino acid',
            'A gene on a chromosome',
            'A virus strain',
          ],
          'Each PDB entry has a unique ID tied to its coordinates, method, and resolution. Citing it makes a structural claim checkable.',
        ),
      ],
    },
    'prot-u2-l1': {
      labs: ['prot-translation'],
      sort: sort(
        'Which class of protein function?',
        ['Enzyme', 'Structural', 'Transport', 'Defence'],
        [
          ['DNA polymerase', 0],
          ['Collagen', 1],
          ['Hemoglobin', 2],
          ['Antibody', 3],
          ['Keratin', 1],
          ['Lysozyme', 0],
          ['Ion channel', 2],
        ],
      ),
      checks: [
        check(
          1,
          'A polypeptide is synthesised in which direction?',
          [
            'From the amino (N) terminus to the carboxyl (C) terminus',
            'From the C terminus to the N terminus',
            'From both ends toward the middle',
            'In random order',
          ],
          'The ribosome adds each new residue to the carboxyl end of the growing chain, reading the mRNA 5′ to 3′.',
        ),
      ],
    },
    'prot-u3-l1': {
      labs: ['prot-ramachandran', 'prot-stability'],
      sort: sort(
        'Which level of protein structure?',
        ['Primary', 'Secondary', 'Tertiary', 'Quaternary'],
        [
          ['The order of amino acids', 0],
          ['An α-helix held by backbone hydrogen bonds', 1],
          ['The overall fold of one chain', 2],
          ['Three HA chains assembled into a trimer', 3],
          ['A β-sheet', 1],
          ['A disulfide bridge linking distant parts of one chain', 2],
        ],
      ),
      checks: [
        check(
          4,
          'Heating a protein until it denatures normally disrupts everything except its…',
          [
            'Primary structure',
            'Secondary structure',
            'Tertiary structure',
            'Quaternary structure',
          ],
          'Denaturation breaks the weak interactions that hold the fold together. Peptide bonds are covalent and survive.',
        ),
      ],
    },
    'prot-u4-l1': {
      labs: ['prot-charge'],
      phet: [
        phet(
          'atomic-interactions',
          'Atomic Interactions',
          'Folding is the sum of many weak attractions and short-range repulsions. See how the energy between two atoms changes with their separation.',
          'Bring two atoms together slowly. Where is the potential energy lowest, and what happens if you push them closer?',
          'Compare a pair with a deep energy well and one with a shallow well. Which stays together when you add thermal motion?',
          'Relate the repulsive wall at short distance to a “steric clash” in a protein model.',
        ),
      ],
      sort: sort(
        'Classify the side chain',
        ['Nonpolar', 'Polar uncharged', 'Acidic (−)', 'Basic (+)'],
        [
          ['Leucine', 0],
          ['Serine', 1],
          ['Aspartate', 2],
          ['Lysine', 3],
          ['Valine', 0],
          ['Glutamate', 2],
          ['Arginine', 3],
          ['Threonine', 1],
        ],
      ),
      checks: [
        check(
          1,
          'In a water-soluble globular protein, nonpolar side chains are found mostly…',
          [
            'Buried in the core, away from water',
            'On the surface',
            'Only at the N terminus',
            'Bonded covalently to each other',
          ],
          'Burying hydrophobic groups frees ordered water molecules, increasing the solvent’s entropy — the hydrophobic effect that drives folding.',
        ),
      ],
    },
    'prot-u5-l1': {
      labs: ['prot-binding'],
      sort: sort(
        'Innate or adaptive immune response?',
        ['Innate', 'Adaptive'],
        [
          ['Interferon signalling in an infected cell', 0],
          ['Antibodies that bind one viral epitope', 1],
          ['Natural killer cells', 0],
          ['Memory B cells', 1],
          ['Cytotoxic T cells recognising a viral peptide', 1],
          ['Mucus and cilia trapping particles', 0],
        ],
      ),
      checks: [
        check(
          3,
          'The small region of an antigen that an antibody actually contacts is called…',
          ['An epitope', 'A paratope', 'A capsid', 'An envelope'],
          'The epitope is on the antigen; the paratope is the antibody’s matching binding surface. Mutations in epitopes drive immune escape.',
        ),
      ],
    },
    'prot-u6-l1': {
      labs: ['prot-fusion'],
      sort: sort(
        'Antigenic drift or antigenic shift?',
        ['Drift', 'Shift'],
        [
          ['Point mutations accumulate in HA epitopes', 0],
          ['Whole genome segments are swapped between strains', 1],
          ['Causes gradual change requiring annual vaccine updates', 0],
          ['Can produce a novel subtype with pandemic potential', 1],
          ['Arises from the polymerase’s lack of proofreading', 0],
          ['Requires co-infection of one cell by two viruses', 1],
        ],
      ),
      checks: [
        check(
          3,
          'Influenza hemagglutinin attaches the virus to a host cell by binding…',
          [
            'Sialic acid on cell-surface glycans',
            'DNA in the nucleus',
            'The ribosome',
            'Cholesterol in the membrane',
          ],
          'The receptor-binding site in the HA1 head recognises terminal sialic acids; the linkage type preferred helps determine host range.',
        ),
      ],
    },
    'prot-u7-l1': {
      labs: ['prot-distance'],
      sort: sort(
        'Which representation shows it best?',
        ['Cartoon / ribbon', 'Ball-and-stick', 'Space-filling / surface'],
        [
          ['The overall fold and secondary structure', 0],
          ['Bond geometry around an active-site residue', 1],
          ['Whether a ligand fits its pocket', 2],
          ['Which helices pack against a sheet', 0],
          ['A specific hydrogen bond', 1],
          ['Surface shape recognised by an antibody', 2],
        ],
      ),
      checks: [
        check(
          4,
          'For a viewing session to be reproducible, a team should record…',
          [
            'The structure ID, selections, and commands used',
            'Only a screenshot',
            'Only the final colours',
            'Nothing; any view is equivalent',
          ],
          'A script or command log lets anyone regenerate the same selection and orientation from the same coordinates.',
        ),
      ],
    },
    'prot-u8-l1': {
      labs: ['prot-scale'],
      sort: sort(
        'Good model practice, or something to fix?',
        ['Good practice', 'Needs fixing'],
        [
          ['A legend that explains every colour', 0],
          ['Side chains added with no functional reason', 1],
          ['N and C termini clearly marked', 0],
          ['Helices bent with an arbitrary number of turns', 1],
          ['Annotations tied to cited structural evidence', 0],
          ['Colour used as the only way to tell features apart', 1],
        ],
      ),
      checks: [
        check(
          1,
          'An α-helix contains 36 residues. About how many complete turns should the model show?',
          ['10', '36', '3.6', '18'],
          'With 3.6 residues per turn, 36 ÷ 3.6 = 10 turns.',
        ),
      ],
    },
  },
};
