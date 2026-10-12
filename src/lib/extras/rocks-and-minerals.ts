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
  type Shape,
  type TopicLab,
} from '../topic-lab-kit.ts';

const unknowns = [2, 3, 4, 6, 7, 8];
const tools: [string, number][] = [
  ['Fingernail', 2.5],
  ['Copper coin', 3.5],
  ['Steel knife', 5.5],
  ['Streak plate', 6.5],
  ['Quartz crystal', 7],
];
const sx = (h: number) => 60 + ((h - 1) / 9) * 520;
const hardness: TopicLab = {
  id: 'rock-hardness',
  title: 'Bracketing hardness with scratch tests',
  lead: 'You are not told the specimen’s hardness. Test it against common tools, see which scratches which, and narrow the range.',
  controls: [
    choice(
      'spec',
      'Unknown specimen',
      ['Specimen A', 'Specimen B', 'Specimen C', 'Specimen D', 'Specimen E', 'Specimen F'],
      0,
    ),
    choice(
      'tool',
      'Scratch test with',
      tools.map(([name, h]) => `${name} (hardness ${h})`),
      0,
    ),
    slider('est', 'Your hardness estimate', 1, 10, 0.5, 5, ''),
  ],
  run: (v) => {
    const h = unknowns[v.spec],
      [name, th] = tools[v.tool],
      outcome = th > h ? 1 : th < h ? -1 : 0;
    return {
      o: { outcome, est: v.est, tool: th },
      metrics: [
        {
          label: 'Result of this test',
          value:
            outcome > 0
              ? `The ${name.toLowerCase()} scratches the specimen`
              : outcome < 0
                ? `The specimen scratches the ${name.toLowerCase()}`
                : 'Neither clearly scratches the other',
        },
        {
          label: 'So the specimen’s hardness is',
          value:
            outcome > 0 ? `Less than ${th}` : outcome < 0 ? `Greater than ${th}` : `About ${th}`,
        },
        { label: 'Your current estimate', value: v.est },
      ],
      sceneLabel: `Mohs scale from 1 to 10 with scratch tools marked; current test with ${name}`,
      scene: [
        line(60, 170, 580, 170, 'muted', 3),
        ...Array.from({ length: 10 }, (_, i) => [
          line(sx(i + 1), 162, sx(i + 1), 178, 'muted', 2),
          text(sx(i + 1), 200, `${i + 1}`, 'middle', 'muted'),
        ]).flat(),
        ...tools.flatMap(([toolName, t], i) => [
          line(sx(t), 120, sx(t), 168, i === v.tool ? 'slot' : 'gold', i === v.tool ? 3 : 1.5),
          text(sx(t), 108 - (i % 2) * 18, toolName, 'middle', i === v.tool ? 'slot' : 'gold', 11),
        ]),
        ...(outcome !== 0
          ? arrow(sx(th), 240, sx(th) + (outcome > 0 ? -70 : 70), 240, 'slot', 3)
          : []),
        text(
          sx(th),
          264,
          outcome > 0 ? 'specimen is softer' : outcome < 0 ? 'specimen is harder' : 'about equal',
          'middle',
          'slot',
        ),
        circle(sx(v.est), 170, 7, 'accent'),
        text(sx(v.est), 152, 'estimate', 'middle', 'accent', 11),
        text(
          320,
          316,
          'Try several tools: each test rules out part of the scale.',
          'middle',
          'muted',
        ),
      ],
    };
  },
  missions: [
    goal(
      'Bracket Specimen B between two tools, then set your estimate inside that bracket.',
      'The fingernail fails but the copper coin succeeds.',
      { spec: 1, est: 3 },
      (o, v) => v.spec === 1 && v.est === 3,
    ),
    goal(
      'Bracket Specimen D and set your estimate.',
      'It resists the steel knife but the streak plate scratches it.',
      { spec: 3, est: 6 },
      (o, v) => v.spec === 3 && v.est === 6,
    ),
    goal(
      'Show that Specimen F is harder than every tool, and set an estimate consistent with that.',
      'If it scratches quartz, it is above 7.',
      { spec: 5, tool: 4, est: 8 },
      (o, v) => v.spec === 5 && v.tool === 4 && v.est > 7,
    ),
  ],
  predict: {
    q: 'A mineral scratches a copper coin but is scratched by a steel knife. Its Mohs hardness is…',
    options: ['Between 3.5 and 5.5', 'Below 2.5', 'Above 6.5', 'Exactly 3.5'],
    correct: 0,
    why: 'Each test gives an inequality. Harder than copper (3.5) and softer than steel (5.5) brackets the value; it does not pin down a single number.',
  },
  model:
    'Mohs hardness is an ordinal ranking: a harder material scratches a softer one. Tool values are typical (steel and glass vary), and a true scratch must be distinguished from powder left by the softer material. Hardness can also differ with crystal direction.',
};

const lengths = ['a = b = c', 'a = b ≠ c', 'a ≠ b ≠ c'],
  angles = ['All three angles 90°', 'One angle not 90°', 'No angle 90°', 'Two 90°, one 120°'];
const systems: Record<string, string> = {
  '0-0': 'Isometric (cubic)',
  '0-2': 'Trigonal (rhombohedral)',
  '1-0': 'Tetragonal',
  '1-3': 'Hexagonal',
  '2-0': 'Orthorhombic',
  '2-1': 'Monoclinic',
  '2-2': 'Triclinic',
};
const examples: Record<string, string> = {
  '0-0': 'halite, pyrite, garnet, galena',
  '0-2': 'calcite, quartz (low), dolomite',
  '1-0': 'zircon, rutile, chalcopyrite',
  '1-3': 'beryl, apatite',
  '2-0': 'olivine, barite, topaz',
  '2-1': 'gypsum, orthoclase, augite',
  '2-2': 'plagioclase, kyanite, turquoise',
};
const crystal: TopicLab = {
  id: 'rock-crystal',
  title: 'Building the crystal systems',
  lead: 'Every crystal system is defined by how three axes compare in length and the angles between them. Combine the two and name the result.',
  controls: [
    choice('len', 'Axis lengths', lengths, 2),
    choice('ang', 'Angles between axes', angles, 0),
  ],
  run: (v) => {
    const key = `${v.len}-${v.ang}`,
      name = systems[key] ?? 'Not a conventional crystal system';
    const a = 120,
      b = v.len === 2 ? 80 : 120,
      c = v.len === 0 ? 120 : v.len === 1 ? 175 : 150;
    const tilt = v.ang === 1 || v.ang === 2 ? 0.3 : 0,
      depth = v.ang === 3 ? 2.2 : v.ang === 2 ? 1.0 : 0.6;
    const A = [a, 0],
      B = [b * 0.55 * Math.cos(depth), -b * 0.55 * Math.sin(depth)],
      C = [c * Math.sin(tilt), -c * Math.cos(tilt)];
    const p = (i: number, j: number, k: number) => [
      250 + i * A[0] + j * B[0] + k * C[0],
      270 + i * A[1] + j * B[1] + k * C[1],
    ];
    const edge = (p1: number[], p2: number[], back = false): Shape =>
      line(p1[0], p1[1], p2[0], p2[1], back ? 'muted' : 'accent', back ? 1.2 : 2.5, back);
    return {
      o: { valid: systems[key] ? 1 : 0, id: v.len * 10 + v.ang },
      metrics: [
        { label: 'Crystal system', value: name },
        { label: 'Example minerals', value: examples[key] ?? 'Try a different combination' },
        { label: 'Axes', value: lengths[v.len] },
        { label: 'Angles', value: angles[v.ang] },
      ],
      sceneLabel: `Unit cell sketch with ${lengths[v.len]} and ${angles[v.ang].toLowerCase()}: ${name}`,
      scene: [
        edge(p(0, 0, 0), p(1, 0, 0)),
        edge(p(0, 0, 0), p(0, 0, 1)),
        edge(p(1, 0, 0), p(1, 0, 1)),
        edge(p(0, 0, 1), p(1, 0, 1)),
        edge(p(0, 0, 0), p(0, 1, 0), true),
        edge(p(0, 1, 0), p(1, 1, 0), true),
        edge(p(0, 1, 0), p(0, 1, 1), true),
        edge(p(1, 0, 0), p(1, 1, 0)),
        edge(p(1, 1, 0), p(1, 1, 1)),
        edge(p(0, 0, 1), p(0, 1, 1)),
        edge(p(1, 0, 1), p(1, 1, 1)),
        edge(p(0, 1, 1), p(1, 1, 1)),
        text(250 + a / 2, 292, 'a', 'middle'),
        text(p(1, 0.5, 0)[0] + 12, p(1, 0.5, 0)[1] + 6, 'b'),
        text(p(0, 0, 0.5)[0] - 14, p(0, 0, 0.5)[1], 'c', 'end'),
        text(320, 40, name, 'middle', 'slot', 16),
        text(
          320,
          326,
          'Schematic unit cell in oblique projection — not to scale',
          'middle',
          'muted',
          11,
        ),
      ],
    };
  },
  missions: [
    goal(
      'Build the isometric (cubic) system.',
      'Maximum symmetry: all axes equal and mutually perpendicular.',
      { len: 0 },
      (o, v) => v.len === 0 && v.ang === 0,
    ),
    goal(
      'Build the hexagonal system.',
      'Two equal axes at 120° to each other with a different third axis at right angles.',
      { len: 1, ang: 3 },
      (o, v) => v.len === 1 && v.ang === 3,
    ),
    goal(
      'Build the least symmetric system, the one plagioclase feldspar belongs to.',
      'Nothing is equal and nothing is at 90°.',
      { len: 2, ang: 2 },
      (o, v) => v.len === 2 && v.ang === 2,
    ),
  ],
  predict: {
    q: 'A mineral has three mutually perpendicular axes, two of equal length and a third that differs. Its crystal system is…',
    options: ['Tetragonal', 'Isometric', 'Orthorhombic', 'Monoclinic'],
    correct: 0,
    why: 'All right angles with a = b ≠ c defines tetragonal. Isometric needs all three equal; orthorhombic has all three different.',
  },
  model:
    'Crystal systems as conventionally defined by unit-cell edge lengths and interaxial angles. The trigonal system is shown in its rhombohedral setting. External crystal shape (habit) can differ greatly from the unit cell, and symmetry — not shape — is the formal criterion.',
};

const silicates = [
  {
    name: 'Nesosilicate — isolated tetrahedra',
    shared: 0,
    unit: '(SiO₄)⁴⁻',
    ratio: '1 : 4',
    eg: 'olivine, garnet',
  },
  {
    name: 'Sorosilicate — paired tetrahedra',
    shared: 1,
    unit: '(Si₂O₇)⁶⁻',
    ratio: '2 : 7',
    eg: 'epidote',
  },
  {
    name: 'Inosilicate — single chain',
    shared: 2,
    unit: '(SiO₃)²⁻',
    ratio: '1 : 3',
    eg: 'pyroxenes such as augite',
  },
  {
    name: 'Inosilicate — double chain',
    shared: 2.5,
    unit: '(Si₄O₁₁)⁶⁻',
    ratio: '4 : 11',
    eg: 'amphiboles such as hornblende',
  },
  {
    name: 'Phyllosilicate — sheet',
    shared: 3,
    unit: '(Si₂O₅)²⁻',
    ratio: '2 : 5',
    eg: 'micas, clay minerals, talc',
  },
  {
    name: 'Tectosilicate — framework',
    shared: 4,
    unit: 'SiO₂',
    ratio: '1 : 2',
    eg: 'quartz, feldspars',
  },
];
const tri = (x: number, y: number, up: boolean): Shape =>
  path(
    up
      ? `M${x - 22} ${y + 14}L${x + 22} ${y + 14}L${x} ${y - 24}Z`
      : `M${x - 22} ${y - 14}L${x + 22} ${y - 14}L${x} ${y + 24}Z`,
    'accent',
    true,
    1,
    0.55,
  );
const layouts: [number, number, boolean][][] = [
  [
    [200, 170, true],
    [320, 170, true],
    [440, 170, true],
  ],
  [
    [298, 170, true],
    [342, 170, false],
  ],
  [
    [210, 170, true],
    [254, 170, false],
    [298, 170, true],
    [342, 170, false],
    [386, 170, true],
    [430, 170, false],
  ],
  [
    [210, 140, true],
    [254, 140, false],
    [298, 140, true],
    [342, 140, false],
    [386, 140, true],
    [430, 140, false],
    [210, 206, false],
    [254, 206, true],
    [298, 206, false],
    [342, 206, true],
    [386, 206, false],
    [430, 206, true],
  ],
  [
    [276, 132, true],
    [320, 132, false],
    [364, 132, true],
    [276, 208, false],
    [320, 208, true],
    [364, 208, false],
    [232, 170, false],
    [408, 170, true],
  ],
  [
    [276, 132, true],
    [320, 132, false],
    [364, 132, true],
    [276, 208, false],
    [320, 208, true],
    [364, 208, false],
    [232, 170, false],
    [408, 170, true],
    [232, 94, true],
    [408, 246, false],
    [320, 60, true],
    [320, 280, false],
  ],
];
const silicate: TopicLab = {
  id: 'rock-silicate',
  title: 'Linking silica tetrahedra',
  lead: 'Every silicate is built from SiO₄ tetrahedra. The number of corner oxygens each one shares decides the structure, the formula, and much of the mineral’s behaviour.',
  controls: [
    choice(
      's',
      'Corner oxygens shared by each tetrahedron',
      silicates.map((item) => `${item.shared} shared`),
      0,
    ),
  ],
  run: (v) => {
    const item = silicates[v.s],
      oxygen = 4 - item.shared / 2;
    return {
      o: { shared: item.shared, oxygen, charge: 4 - 2 * oxygen },
      metrics: [
        { label: 'Structure', value: item.name },
        { label: 'Repeating unit', value: item.unit },
        { label: 'Si : O ratio', value: item.ratio },
        { label: 'Oxygens per silicon', value: oxygen },
        { label: 'Net charge per silicon to be balanced by cations', value: 4 - 2 * oxygen },
        { label: 'Examples', value: item.eg },
      ],
      sceneLabel: `${item.name}: tetrahedra drawn as triangles sharing ${item.shared} corners each`,
      scene: [
        ...layouts[v.s].map(([x, y, up]) => tri(x, y, up)),
        text(
          320,
          316,
          v.s === 5
            ? 'Framework: every corner is shared, continuing in three dimensions'
            : 'Each triangle is one SiO₄ tetrahedron viewed from above',
          'middle',
          'muted',
        ),
        text(320, 30, item.name, 'middle', 'slot', 15),
      ],
    };
  },
  missions: [
    goal(
      'Find the structure with exactly three oxygens per silicon.',
      'Sharing two corners each links tetrahedra into a single chain.',
      { s: 2 },
      (o) => o.oxygen === 3,
    ),
    goal(
      'Find the structure that explains why mica peels into sheets.',
      'Three shared corners build a flat layer with weak bonds between layers.',
      { s: 4 },
      (o) => o.shared === 3,
    ),
    goal(
      'Find the structure whose silica unit needs no other cations for charge balance.',
      'When all four corners are shared the formula reduces to SiO₂.',
      { s: 5 },
      (o) => o.charge === 0,
    ),
  ],
  predict: {
    q: 'As silica tetrahedra share more of their oxygens, the number of oxygens per silicon in the formula…',
    options: ['Decreases', 'Increases', 'Stays at four', 'Becomes zero'],
    correct: 0,
    why: 'A shared oxygen counts half toward each tetrahedron: oxygens per silicon = 4 − (shared ÷ 2), falling from 4 in olivine to 2 in quartz.',
  },
  model:
    'Idealised polymerisation series counting each shared oxygen as half per tetrahedron. Real minerals substitute aluminium for some silicon (as in feldspars), which changes the charge to be balanced. Triangles are a top-down schematic of tetrahedra.',
};

const dense: [string, number][] = [
  ['Quartz', 2.65],
  ['Calcite', 2.71],
  ['Fluorite', 3.18],
  ['Pyrite', 5.02],
  ['Magnetite', 5.18],
  ['Galena', 7.58],
  ['Gold', 19.3],
];
const gravity: TopicLab = {
  id: 'rock-sg',
  title: 'Specific gravity by weighing in water',
  lead: 'Weigh a specimen in air, then suspended in water. The apparent loss equals the weight of water it displaces — and that gives its specific gravity.',
  controls: [
    choice(
      'm',
      'Specimen',
      dense.map(([name]) => name),
      0,
    ),
    slider('vol', 'Specimen volume', 5, 50, 1, 10, 'cm³'),
  ],
  run: (v) => {
    const sg = dense[v.m][1],
      air = sg * v.vol,
      wet = air - v.vol;
    return {
      o: { air, wet, sg },
      metrics: [
        { label: 'Weight in air', value: air, unit: 'g' },
        { label: 'Apparent weight in water', value: wet, unit: 'g' },
        { label: 'Loss of weight', value: v.vol, unit: 'g' },
        { label: 'Specific gravity = air ÷ loss', value: air / v.vol },
      ],
      sceneLabel: `${dense[v.m][0]} specimen hanging in a beaker of water: ${air.toFixed(1)} grams in air, ${wet.toFixed(1)} grams in water`,
      scene: [
        line(200, 40, 440, 40, 'ink', 4),
        line(320, 40, 320, 150, 'muted', 1.5),
        path('M240 110V290H400V110', 'ink', false, 3),
        rect(243, 140, 154, 147, 'cool', true, 0.3),
        rect(320 - (8 + v.vol * 0.5), 180, 16 + v.vol, 16 + v.vol * 0.6, 'slot', true, 0.9, 4),
        text(320, 320, 'Buoyant force = weight of displaced water', 'middle', 'muted'),
        text(470, 80, `in air: ${air.toFixed(1)} g`),
        text(470, 104, `in water: ${wet.toFixed(1)} g`),
        text(470, 128, `SG = ${(air / v.vol).toFixed(2)}`, 'start', 'slot'),
      ],
      bars: {
        max: Math.max(100, air),
        items: [
          { label: 'Weight in air (g)', value: air, tone: 'accent' },
          { label: 'Apparent weight in water (g)', value: wet, tone: 'cool' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Find the common ore mineral whose 10 cm³ specimen weighs between 75 and 100 g in air.',
      'Lead sulfide is strikingly heavy for its size.',
      { m: 5 },
      (o, v) => v.vol === 10 && o.air > 75 && o.air < 100,
    ),
    goal(
      'Find a specimen with a specific gravity between 3.0 and 3.5.',
      'Heavier than quartz and calcite, but far lighter than the metallic ores.',
      { m: 2 },
      (o) => o.sg > 3 && o.sg < 3.5,
    ),
    goal(
      'Compare “fool’s gold” with the real thing: weigh 10 cm³ of gold.',
      'Gold is nearly four times as dense as pyrite.',
      { m: 6 },
      (o, v) => v.m === 6 && v.vol === 10,
    ),
  ],
  predict: {
    q: 'A specimen weighs 50 g in air and 40 g when suspended in water. Its specific gravity is…',
    options: ['5.0', '1.25', '0.8', '10'],
    correct: 0,
    why: 'SG = weight in air ÷ loss of weight in water = 50 ÷ (50 − 40) = 5.0.',
  },
  model:
    'Archimedes’ principle with water taken as 1.00 g/cm³; typical specific gravities for pure minerals. Natural specimens with pores, fractures, or intergrown minerals give lower or intermediate values, and a fine suspension thread is assumed to have negligible volume.',
};

const ore: TopicLab = {
  id: 'rock-ore',
  title: 'Ore grade and the rock that must be moved',
  lead: 'An ore body is rock that can be mined at a profit. Grade, recovery, and overburden together decide how much metal you get — and how much waste.',
  controls: [
    slider('grade', 'Ore grade', 0.1, 5, 0.1, 0.6, '% metal'),
    slider('ore', 'Ore mined', 1, 100, 1, 10, 'kilotonnes'),
    slider('rec', 'Mill recovery', 50, 95, 5, 85, '%'),
    slider('strip', 'Strip ratio (waste rock : ore)', 0, 10, 0.5, 3, ''),
  ],
  run: (v) => {
    const metal = v.ore * 1000 * (v.grade / 100) * (v.rec / 100),
      waste = v.ore * v.strip,
      per = ((v.ore + waste) * 1000) / metal;
    return {
      o: { metal, waste, per },
      metrics: [
        { label: 'Metal recovered', value: metal, unit: 't' },
        { label: 'Waste rock removed', value: waste, unit: 'kt' },
        { label: 'Tailings left after milling', value: v.ore - metal / 1000, unit: 'kt' },
        { label: 'Rock moved per tonne of metal', value: per, unit: 't' },
      ],
      bars: {
        title: 'Material in kilotonnes',
        items: [
          { label: 'Waste rock', value: waste, tone: 'muted' },
          { label: 'Ore milled', value: v.ore, tone: 'accent' },
          { label: 'Tailings', value: v.ore - metal / 1000, tone: 'warm' },
          { label: 'Metal recovered', value: metal / 1000, tone: 'slot' },
        ],
      },
    };
  },
  missions: [
    goal(
      'From 10 kt of ore at 85% recovery, find the lowest grade that yields at least 100 t of metal.',
      'Metal = ore × grade × recovery.',
      { grade: 1.2 },
      (o, v) => v.ore === 10 && v.rec === 85 && o.metal >= 100 && v.grade <= 1.2,
    ),
    goal(
      'Show an operation that must move more than 900 t of rock for each tonne of metal.',
      'Lower the grade to 0.5% with the starting strip ratio.',
      { grade: 0.5 },
      (o) => o.per > 900,
    ),
    goal(
      'Design an operation that moves less than 100 t of rock per tonne of metal.',
      'A rich ore body at the surface: high grade and no overburden.',
      { grade: 5, strip: 0 },
      (o) => o.per < 100,
    ),
  ],
  predict: {
    q: 'To obtain the same amount of metal from lower-grade ore, a mine generally produces…',
    options: ['More waste rock and tailings', 'Less waste', 'The same waste', 'No tailings'],
    correct: 0,
    why: 'Halving the grade means roughly twice the ore — and its associated overburden — must be mined and milled for each tonne of metal.',
  },
  model:
    'Simple mass accounting: metal = ore × grade × recovery; waste rock = ore × strip ratio. Economics (metal price, energy, water, and reclamation costs) decide the cut-off grade and are not modelled here.',
};

const bands = ['Ultramafic', 'Mafic', 'Intermediate', 'Felsic'],
  rocks = [
    ['Peridotite', 'Komatiite'],
    ['Gabbro', 'Basalt'],
    ['Diorite', 'Andesite'],
    ['Granite', 'Rhyolite'],
  ];
const series: [string, number, number, number, number][] = [
  ['Olivine', 1300, 1150, 150, 70],
  ['Pyroxene', 1200, 1000, 205, 120],
  ['Amphibole', 1000, 850, 255, 170],
  ['Biotite', 850, 700, 300, 220],
  ['K-feldspar', 800, 600, 320, 262],
  ['Muscovite', 750, 600, 320, 290],
  ['Quartz', 700, 550, 320, 318],
];
const bowen: TopicLab = {
  id: 'rock-bowen',
  title: 'Cooling magma through Bowen’s reaction series',
  lead: 'Lower the temperature of a basaltic melt and watch which minerals crystallise. Where crystallisation stops — and how fast — decides the rock.',
  controls: [
    slider('t', 'Magma temperature', 550, 1300, 10, 1250, '°C'),
    choice(
      'cool',
      'Cooling environment',
      ['Slow, at depth (plutonic)', 'Fast, at the surface (volcanic)'],
      0,
    ),
  ],
  run: (v) => {
    const band = v.t > 1100 ? 0 : v.t > 1000 ? 1 : v.t > 800 ? 2 : 3,
      an = Math.max(0, Math.min(100, ((v.t - 700) / 500) * 100));
    const active = series.filter(([, hi, lo]) => v.t <= hi && v.t >= lo).map(([name]) => name);
    if (v.t >= 700 && v.t <= 1200) active.push(`plagioclase (${Math.round(an)}% Ca end-member)`);
    const y = 60 + ((1300 - v.t) / 750) * 250;
    return {
      o: { band, an, slow: v.cool === 0 ? 1 : 0 },
      metrics: [
        { label: 'Minerals crystallising now', value: active.join(', ') || 'None — fully molten' },
        { label: 'Composition if crystallisation ended here', value: bands[band] },
        { label: 'Rock formed', value: rocks[band][v.cool] },
        {
          label: 'Texture',
          value: v.cool === 0 ? 'Coarse-grained (phaneritic)' : 'Fine-grained (aphanitic)',
        },
        { label: 'Plagioclase calcium content', value: an, unit: '% Ca end-member' },
      ],
      sceneLabel: `Bowen’s reaction series with the melt at ${v.t} degrees Celsius; forming ${rocks[band][v.cool]}`,
      scene: [
        text(150, 36, 'Discontinuous branch', 'middle', 'muted', 11),
        text(490, 36, 'Continuous branch', 'middle', 'muted', 11),
        ...series.flatMap(([name, hi, lo, x, ty]) => {
          const on = v.t <= hi && v.t >= lo;
          return [
            rect(
              x - 55 + (ty > 230 ? 0 : 0),
              ty - 15,
              110,
              26,
              on ? 'slot' : 'muted',
              on,
              on ? 0.35 : 1,
              5,
            ),
            text(x, ty + 3, name, 'middle', on ? 'ink' : 'muted', 12),
          ];
        }),
        path(
          'M430 70L520 70L560 220L470 220Z',
          v.t >= 700 && v.t <= 1200 ? 'slot' : 'muted',
          v.t >= 700 && v.t <= 1200,
          1.5,
          0.3,
        ),
        text(475, 88, 'Ca-rich plagioclase', 'middle', 'ink', 11),
        text(515, 212, 'Na-rich plagioclase', 'middle', 'ink', 11),
        line(40, y, 600, y, 'gold', 1.5, true),
        text(44, y - 6, `${v.t} °C`, 'start', 'gold', 12),
        text(40, 60, '1300 °C', 'start', 'muted', 10),
        text(40, 326, '550 °C', 'start', 'muted', 10),
      ],
    };
  },
  missions: [
    goal(
      'Stop crystallisation where the rock would be a gabbro.',
      'Mafic composition, cooled slowly: between 1,000 and 1,100 °C.',
      { t: 1050 },
      (o) => o.band === 1 && o.slow === 1,
    ),
    goal(
      'Choose the temperature and cooling environment that make a rhyolite.',
      'Felsic minerals crystallise last, and a volcanic rock cools quickly.',
      { t: 700, cool: 1 },
      (o) => o.band === 3 && o.slow === 0,
    ),
    goal(
      'Find the temperature at which plagioclase is about half calcium-rich and half sodium-rich.',
      'Calcium content falls steadily as the melt cools from 1,200 to 700 °C.',
      { t: 950 },
      (o) => near(o.an, 50, 2),
    ),
  ],
  predict: {
    q: 'Granite and rhyolite have the same chemical composition. They look different because…',
    options: [
      'Granite cooled slowly underground and grew large crystals; rhyolite cooled quickly at the surface',
      'Rhyolite contains more iron',
      'Granite formed from sediment',
      'Rhyolite is older',
    ],
    correct: 0,
    why: 'Composition sets the minerals; cooling rate sets the grain size. Slow cooling gives time for crystals to grow large enough to see.',
  },
  model:
    'A schematic of Bowen’s reaction series with approximate temperatures at low pressure. Real crystallisation paths depend on bulk composition, water content, and pressure, and minerals overlap more than the diagram suggests. Rock names assume the usual composition bands.',
};

const grain: TopicLab = {
  id: 'rock-grain',
  title: 'Sediment maturity with transport',
  lead: 'Follow sediment away from a granite highland. Grains shrink, round off, and lose their feldspar, and each stage would lithify into a different rock.',
  controls: [
    slider('d', 'Distance transported', 0, 1000, 10, 100, 'km'),
    choice(
      'energy',
      'Where it is deposited',
      ['High energy: river channel or beach', 'Low energy: lake floor or deep basin'],
      0,
    ),
  ],
  run: (v) => {
    const size =
        v.energy === 0 ? 0.25 + 64 * Math.exp(-v.d / 40) : 0.002 + 0.02 * Math.exp(-v.d / 300),
      rounding = 1 - Math.exp(-v.d / 80),
      feldspar = 45 * Math.exp(-v.d / 400);
    const kind =
      size > 2
        ? rounding < 0.4
          ? 0
          : 1
        : size > 0.0625
          ? feldspar > 25
            ? 2
            : feldspar < 5
              ? 4
              : 3
          : size > 0.004
            ? 5
            : 6;
    const name = [
      'Breccia',
      'Conglomerate',
      'Arkose (feldspar-rich sandstone)',
      'Sandstone',
      'Quartz sandstone',
      'Siltstone',
      'Shale',
    ][kind];
    const r = Math.max(3, Math.min(26, 12 + Math.log10(size) * 7));
    return {
      o: { size, rounding, feldspar, kind },
      metrics: [
        { label: 'Typical grain size', value: size, unit: 'mm' },
        { label: 'Rounding (0 angular – 1 well rounded)', value: rounding },
        { label: 'Feldspar remaining', value: feldspar, unit: '%' },
        { label: 'Rock this sediment would become', value: name },
      ],
      sceneLabel: `${name}: grains about ${size.toPrecision(2)} millimetres, rounding ${rounding.toFixed(2)}`,
      scene: [
        ...Array.from({ length: 18 }, (_, i) => {
          const x = 90 + (i % 6) * 92 + (Math.floor(i / 6) % 2) * 30,
            y = 90 + Math.floor(i / 6) * 76,
            tone = i % 3 === 0 && feldspar > 12 ? ('warm' as const) : ('gold' as const);
          return rounding < 0.4
            ? rect(x - r, y - r, r * 2, r * 2, tone, true, 0.75, r * rounding)
            : circle(x, y, r, tone, true, 0.75);
        }),
        text(
          320,
          316,
          'orange: feldspar · yellow: quartz and rock fragments · relative size is logarithmic',
          'middle',
          'muted',
          11,
        ),
        text(320, 36, name, 'middle', 'slot', 15),
      ],
    };
  },
  missions: [
    goal(
      'Find where the sediment would lithify into breccia.',
      'Coarse, angular fragments mean very little transport.',
      { d: 10 },
      (o) => o.kind === 0,
    ),
    goal(
      'Find where it would become arkose.',
      'Sand-sized, but still close enough to the source to keep over a quarter feldspar.',
      { d: 200 },
      (o) => o.kind === 2,
    ),
    goal(
      'Find where it would become a clean quartz sandstone.',
      'Long transport destroys nearly all the feldspar.',
      { d: 900 },
      (o) => o.kind === 4,
    ),
    goal(
      'Find the distance and setting that deposit shale.',
      'Only the finest particles reach a quiet, distant basin.',
      { d: 700, energy: 1 },
      (o) => o.kind === 6,
    ),
  ],
  predict: {
    q: 'A sandstone made almost entirely of well-rounded, well-sorted quartz grains most likely formed…',
    options: [
      'After long transport and reworking, far from its source',
      'At the foot of a steep mountain front',
      'From volcanic ash',
      'By chemical precipitation from sea water',
    ],
    correct: 0,
    why: 'Quartz is the most durable common mineral. High quartz content with good rounding and sorting signals prolonged abrasion and winnowing — a mature sediment.',
  },
  model:
    'Illustrative exponential trends for grain size, rounding, and feldspar loss with distance from a granitic source. Real sediments depend on climate, relief, source rock, and recycling of older sediment; distances are not calibrated to any river.',
};

const mx = (t: number) => 80 + ((t - 100) / 800) * 500,
  my = (p: number) => 290 - (p / 20) * 250;
const metamorphic: TopicLab = {
  id: 'rock-metamorphic',
  title: 'Pressure–temperature paths and metamorphic facies',
  lead: 'Bury and heat a mudstone. Its position in pressure–temperature space decides the facies, the texture, and which Al₂SiO₅ mineral is stable.',
  controls: [
    slider('t', 'Temperature', 100, 900, 10, 400, '°C'),
    slider('p', 'Pressure', 0, 20, 0.2, 4, 'kbar'),
  ],
  run: (v) => {
    const poly =
      v.t < 500
        ? v.p > 3.8 - (500 - v.t) * 0.0105
          ? 0
          : 1
        : v.p > 3.8 + (v.t - 500) * 0.02
          ? 0
          : v.p > 3.8 - (v.t - 500) * 0.011
            ? 2
            : 1;
    const facies =
      v.t >= 500 && v.p > 12
        ? 5
        : v.t < 500 && v.p > 5 && v.p > 0.018 * v.t
          ? 4
          : v.p < 2 && v.t > 300
            ? 6
            : v.t < 300
              ? 0
              : v.t < 500
                ? 1
                : v.t < 700
                  ? 2
                  : 3;
    const rock =
      v.t < 250
        ? 'Shale (unmetamorphosed)'
        : v.t < 350
          ? 'Slate'
          : v.t < 450
            ? 'Phyllite'
            : v.t < 650
              ? 'Schist'
              : v.t < 750
                ? 'Gneiss'
                : 'Migmatite (partial melting)';
    return {
      o: { poly, facies, depth: v.p * 3.5 },
      metrics: [
        {
          label: 'Metamorphic facies',
          value: [
            'Zeolite / very low grade',
            'Greenschist',
            'Amphibolite',
            'Granulite',
            'Blueschist',
            'Eclogite',
            'Hornfels (contact)',
          ][facies],
        },
        { label: 'Stable Al₂SiO₅ mineral', value: ['Kyanite', 'Andalusite', 'Sillimanite'][poly] },
        { label: 'Mudstone would now be', value: facies === 6 ? 'Hornfels' : rock },
        { label: 'Approximate burial depth', value: v.p * 3.5, unit: 'km' },
      ],
      sceneLabel: `Pressure–temperature diagram with the rock at ${v.t} degrees Celsius and ${v.p} kilobars`,
      scene: [
        path('M80 40V290H580', 'muted', false, 1.5),
        line(mx(500), my(3.8), mx(138), my(0), 'cool', 2),
        line(mx(500), my(3.8), mx(845), my(0), 'warm', 2),
        line(mx(500), my(3.8), mx(900), my(11.8), 'green', 2),
        circle(mx(500), my(3.8), 4, 'gold'),
        text(mx(330), my(7), 'KYANITE', 'middle', 'muted', 11),
        text(mx(430), my(0.9), 'ANDALUSITE', 'middle', 'muted', 11),
        text(mx(760), my(4.5), 'SILLIMANITE', 'middle', 'muted', 11),
        text(mx(260), my(14), 'blueschist', 'middle', 'cool', 11),
        text(mx(700), my(16), 'eclogite', 'middle', 'green', 11),
        ...[100, 300, 500, 700, 900].map((t) => text(mx(t), 308, `${t}`, 'middle', 'muted', 11)),
        ...[0, 5, 10, 15, 20].map((p) => text(72, my(p) + 4, `${p}`, 'end', 'muted', 11)),
        text(330, 330, 'Temperature (°C)', 'middle'),
        text(80, 30, 'Pressure (kbar)'),
        circle(mx(v.t), my(v.p), 8, 'slot'),
      ],
    };
  },
  missions: [
    goal(
      'Find amphibolite-facies conditions in which kyanite is stable — a classic mountain-belt path.',
      'Moderately hot and fairly deep: try 600 °C and 8 kbar.',
      { t: 600, p: 8 },
      (o) => o.facies === 2 && o.poly === 0,
    ),
    goal(
      'Find blueschist conditions, typical of a subduction zone.',
      'High pressure at low temperature.',
      { t: 300, p: 9 },
      (o) => o.facies === 4,
    ),
    goal(
      'Bake the rock beside an intrusion: hornfels with andalusite stable.',
      'High temperature at very low pressure.',
      { t: 600, p: 1 },
      (o) => o.facies === 6 && o.poly === 1,
    ),
    goal(
      'Locate the Al₂SiO₅ triple point, where all three minerals coexist.',
      'It lies near 500 °C and just under 4 kbar.',
      { t: 500, p: 3.8 },
      (o, v) => near(v.t, 500, 20) && near(v.p, 3.8, 0.3),
    ),
  ],
  predict: {
    q: 'A rock containing blueschist-facies minerals most likely formed…',
    options: [
      'In a subduction zone, where cold rock is carried to great depth',
      'Next to a shallow granite intrusion',
      'At the surface during weathering',
      'In the hot lower crust beneath a volcanic arc',
    ],
    correct: 0,
    why: 'Blueschist needs high pressure without much heating. Subducting slabs descend faster than they warm, producing exactly that combination.',
  },
  model:
    'Schematic facies fields and straight-line Al₂SiO₅ boundaries meeting near 500 °C and 3.8 kbar; depth from roughly 3.5 km per kilobar. Real boundaries are gradational, depend on rock composition and fluids, and are located differently by different experimental studies.',
};

const keyMinerals: {
  name: string;
  metallic: boolean;
  hard: boolean;
  cleavage: boolean;
  special: number[];
}[] = [
  { name: 'Quartz', metallic: false, hard: true, cleavage: false, special: [] },
  { name: 'Orthoclase', metallic: false, hard: true, cleavage: true, special: [] },
  { name: 'Calcite', metallic: false, hard: false, cleavage: true, special: [1] },
  { name: 'Halite', metallic: false, hard: false, cleavage: true, special: [6] },
  { name: 'Gypsum', metallic: false, hard: false, cleavage: true, special: [4] },
  { name: 'Talc', metallic: false, hard: false, cleavage: true, special: [3, 4] },
  { name: 'Muscovite', metallic: false, hard: false, cleavage: true, special: [5] },
  { name: 'Magnetite', metallic: true, hard: true, cleavage: false, special: [2] },
  { name: 'Galena', metallic: true, hard: false, cleavage: true, special: [6] },
  { name: 'Pyrite', metallic: true, hard: true, cleavage: false, special: [] },
];
const key: TopicLab = {
  id: 'rock-key',
  title: 'Narrowing candidates with a decision path',
  lead: 'Ten common minerals start as candidates. Each observation you record removes the ones it contradicts. Aim to finish with as few tests as possible.',
  controls: [
    choice('luster', 'Luster', ['Not tested', 'Metallic', 'Nonmetallic'], 0),
    choice(
      'hard',
      'Hardness against glass',
      ['Not tested', 'Scratches glass', 'Does not scratch glass'],
      0,
    ),
    choice('cleav', 'Breakage', ['Not tested', 'Shows cleavage', 'Fracture only'], 0),
    choice(
      'special',
      'Special property',
      [
        'Not tested',
        'Fizzes in dilute acid',
        'Strongly magnetic',
        'Greasy feel',
        'Scratched by a fingernail',
        'Peels into thin elastic sheets',
        'Cubic cleavage',
      ],
      0,
    ),
  ],
  run: (v) => {
    const keep = keyMinerals.map(
      (m) =>
        (v.luster === 0 || m.metallic === (v.luster === 1)) &&
        (v.hard === 0 || m.hard === (v.hard === 1)) &&
        (v.cleav === 0 || m.cleavage === (v.cleav === 1)) &&
        (v.special === 0 || m.special.includes(v.special)),
    );
    const count = keep.filter(Boolean).length,
      tests = [v.luster, v.hard, v.cleav, v.special].filter((x) => x > 0).length;
    return {
      o: { count, tests, only: count === 1 ? keep.indexOf(true) : -1 },
      metrics: [
        { label: 'Candidates remaining', value: count },
        { label: 'Tests recorded', value: tests },
        {
          label: 'Status',
          value:
            count === 1
              ? `Identified: ${keyMinerals[keep.indexOf(true)].name}`
              : count === 0
                ? 'No mineral in the set fits — recheck an observation'
                : 'Keep testing',
        },
      ],
      sceneLabel: `Candidate list: ${
        keyMinerals
          .filter((_, i) => keep[i])
          .map((m) => m.name)
          .join(', ') || 'none'
      } remain`,
      scene: [
        text(40, 36, 'Candidate minerals — eliminated ones are faded and struck through'),
        ...keyMinerals.flatMap((m, i) => {
          const x = 60 + (i % 2) * 290,
            y = 76 + Math.floor(i / 2) * 50;
          return keep[i]
            ? [
                rect(x, y - 22, 250, 36, 'slot', false, 1, 6),
                text(x + 16, y + 2, m.name, 'start', 'ink', 15),
              ]
            : [
                rect(x, y - 22, 250, 36, 'muted', false, 0.4, 6),
                text(x + 16, y + 2, m.name, 'start', 'muted', 15),
                line(x + 12, y - 3, x + 130, y - 3, 'muted', 1.5),
              ];
        }),
      ],
    };
  },
  missions: [
    goal(
      'Identify one mineral using a single test.',
      'One of the special properties belongs to only one mineral in the set — a carbonate.',
      { special: 1 },
      (o) => o.count === 1 && o.tests === 1,
    ),
    goal(
      'Two minerals share cubic cleavage. Add one more observation to isolate galena.',
      'One of the pair looks like metal; the other does not.',
      { special: 6, luster: 1 },
      (o, v) => v.special === 6 && o.only === 8,
    ),
    goal(
      'Identify quartz without using any special property.',
      'Nonmetallic, harder than glass, and it breaks without cleavage.',
      { luster: 2, hard: 1, cleav: 2 },
      (o, v) => v.special === 0 && o.only === 0,
    ),
  ],
  predict: {
    q: 'In a timed identification, which first test usually splits a mixed mineral tray most usefully?',
    options: [
      'Luster: metallic versus nonmetallic',
      'Exact colour',
      'Specimen size',
      'How shiny it looks under bright light',
    ],
    correct: 0,
    why: 'Luster is quick, needs no tools, and divides minerals into two groups with different follow-up tests. Colour varies widely within many species.',
  },
  model:
    'A ten-mineral teaching set with idealised yes/no properties. Real specimens can be weathered, impure, or fine-grained, so several properties should agree before a name is assigned. Never taste specimens, and use dilute acid only with supervision and eye protection.',
};

export const rocksAndMineralsExtras: EventExtras = {
  eventId: 'rocks-and-minerals',
  labs: [hardness, crystal, silicate, gravity, ore, bowen, grain, metamorphic, key],
  lessons: {
    'rock-u1-l1': {
      labs: ['rock-hardness'],
      sort: sort(
        'Mineral, or rock?',
        ['Mineral', 'Rock'],
        [
          ['Quartz', 0],
          ['Granite', 1],
          ['Calcite', 0],
          ['Limestone', 1],
          ['Biotite', 0],
          ['Basalt', 1],
        ],
      ),
      checks: [
        check(
          1,
          'Why is streak often more reliable than a specimen’s surface colour?',
          [
            'Powdering removes the effect of surface coatings and grain size',
            'Streak depends on the specimen’s shape',
            'Streak changes with lighting',
            'All minerals have a white streak',
          ],
          'Hematite can look silver, black, or red in hand specimen, yet its powder is consistently red-brown.',
        ),
      ],
    },
    'rock-u2-l1': {
      labs: ['rock-crystal'],
      sort: sort(
        'Which environment grew the crystals?',
        ['Cooling magma', 'Evaporating water', 'Hot fluids in veins'],
        [
          ['Olivine in basalt', 0],
          ['Halite beds in a dried lake', 1],
          ['Quartz crystals lining a fracture', 2],
          ['Feldspar in granite', 0],
          ['Gypsum in a desert basin', 1],
          ['Gold with quartz in a vein', 2],
        ],
      ),
      checks: [
        check(
          3,
          'A mineral’s habit differs from its crystal system because habit describes…',
          [
            'The external shape it commonly grows in',
            'The internal symmetry of its lattice',
            'Its chemical formula',
            'Its hardness',
          ],
          'Habit (cubic, bladed, fibrous, massive…) depends on growth conditions. The same crystal system can produce very different habits.',
        ),
      ],
    },
    'rock-u3-l1': {
      labs: ['rock-silicate'],
      phet: [
        phet(
          'molecule-shapes-basics',
          'Molecule Shapes: Basics',
          'The silica tetrahedron has its shape for the same reason methane does: four bonding pairs spread as far apart as they can.',
          'Build a central atom with two bonds, then three, then four. Record the geometry and bond angle each time.',
          'With four bonds, rotate the model. Why is a tetrahedron, not a flat square, the arrangement that keeps the bonds farthest apart?',
          'Relate the 109.5° angle to the SiO₄ unit: where would four oxygens sit around one silicon?',
        ),
      ],
      sort: sort(
        'Which silicate structure?',
        ['Isolated', 'Chain', 'Sheet', 'Framework'],
        [
          ['Olivine', 0],
          ['Pyroxene', 1],
          ['Muscovite mica', 2],
          ['Quartz', 3],
          ['Garnet', 0],
          ['Hornblende (amphibole)', 1],
          ['Clay minerals', 2],
          ['Feldspar', 3],
        ],
      ),
      checks: [
        check(
          3,
          'Micas split into thin flakes because their structure is built from…',
          [
            'Sheets of tetrahedra with weak bonding between sheets',
            'Isolated tetrahedra',
            'A three-dimensional framework',
            'Metallic bonds',
          ],
          'Strong bonds lie within each sheet; the layers are held together only weakly, giving one perfect cleavage direction.',
        ),
      ],
    },
    'rock-u4-l1': {
      labs: ['rock-sg', 'rock-ore'],
      phet: [
        phet(
          'buoyancy',
          'Buoyancy',
          'Specific gravity rests on Archimedes’ principle. Weigh objects in and out of fluid and connect the buoyant force to displaced volume.',
          'Submerge a block and compare the scale readings in air and in water. What does the difference equal?',
          'Change the fluid’s density. How does the buoyant force on the same block respond?',
          'Use the readings to compute a block’s density, then check it against the value shown.',
        ),
      ],
      sort: sort(
        'Which non-silicate group?',
        ['Carbonate', 'Oxide', 'Sulfide', 'Halide'],
        [
          ['Calcite', 0],
          ['Hematite', 1],
          ['Galena', 2],
          ['Halite', 3],
          ['Dolomite', 0],
          ['Magnetite', 1],
          ['Pyrite', 2],
          ['Fluorite', 3],
        ],
      ),
      checks: [
        check(
          1,
          'A drop of dilute hydrochloric acid fizzes vigorously on a specimen. The mineral is most likely…',
          ['Calcite', 'Quartz', 'Halite', 'Gypsum'],
          'Carbonates react with acid to release CO₂. Dolomite reacts weakly unless powdered; the others do not react.',
        ),
      ],
    },
    'rock-u5-l1': {
      labs: ['rock-bowen'],
      sort: sort(
        'Intrusive or extrusive?',
        ['Intrusive (plutonic)', 'Extrusive (volcanic)'],
        [
          ['Granite', 0],
          ['Rhyolite', 1],
          ['Gabbro', 0],
          ['Basalt', 1],
          ['Diorite', 0],
          ['Obsidian', 1],
          ['Pumice', 1],
        ],
      ),
      checks: [
        check(
          1,
          'An igneous rock shows large crystals set in a fine-grained groundmass. This porphyritic texture records…',
          [
            'Two stages of cooling: slow at depth, then rapid',
            'Very slow cooling throughout',
            'Instant quenching to glass',
            'Metamorphism after cooling',
          ],
          'The large phenocrysts grew while the magma sat at depth; eruption or shallow emplacement then chilled the remaining melt quickly.',
        ),
      ],
    },
    'rock-u6-l1': {
      labs: ['rock-grain'],
      sort: sort(
        'Clastic, chemical, or biochemical?',
        ['Clastic', 'Chemical', 'Biochemical / organic'],
        [
          ['Sandstone', 0],
          ['Rock salt', 1],
          ['Coquina', 2],
          ['Shale', 0],
          ['Rock gypsum', 1],
          ['Coal', 2],
          ['Conglomerate', 0],
        ],
      ),
      checks: [
        check(
          2,
          'What distinguishes a breccia from a conglomerate?',
          [
            'Breccia has angular fragments; conglomerate has rounded ones',
            'Breccia is finer grained',
            'Conglomerate is igneous',
            'Breccia contains fossils',
          ],
          'Both are coarse clastic rocks. Angular clasts mean little transport from the source; rounding indicates abrasion during transport.',
        ),
      ],
    },
    'rock-u7-l1': {
      labs: ['rock-metamorphic'],
      sort: sort(
        'Foliated or nonfoliated?',
        ['Foliated', 'Nonfoliated'],
        [
          ['Slate', 0],
          ['Marble', 1],
          ['Schist', 0],
          ['Quartzite', 1],
          ['Gneiss', 0],
          ['Hornfels', 1],
        ],
      ),
      checks: [
        check(
          2,
          'Foliation in a metamorphic rock develops mainly because of…',
          [
            'Directed stress aligning platy minerals',
            'Rapid cooling',
            'Chemical precipitation',
            'Uniform pressure from all sides',
          ],
          'Differential stress makes micas and other platy minerals grow or rotate perpendicular to the greatest compression, producing layering.',
        ),
      ],
    },
    'rock-u8-l1': {
      labs: ['rock-key'],
      sort: sort(
        'Diagnostic property, or unreliable alone?',
        ['Strongly diagnostic', 'Unreliable by itself'],
        [
          ['Reaction with dilute acid', 0],
          ['Colour of a transparent mineral', 1],
          ['Strong magnetism', 0],
          ['Specimen size', 1],
          ['Cleavage angles', 0],
          ['Overall shininess', 1],
        ],
      ),
      checks: [
        check(
          1,
          'A sound first step when identifying an unknown mineral in a timed event is to…',
          [
            'Sort by luster, then test hardness against glass',
            'Guess from its colour',
            'Look for its name on the tray',
            'Test every specimen with acid first',
          ],
          'A fixed decision path prevents skipped steps. Luster and a glass-scratch test together cut the candidates sharply in seconds.',
        ),
      ],
    },
  },
};
