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
  swatch,
  text,
  toggle,
  type Shape,
  type Tone,
  type TopicLab,
} from '../topic-lab-kit.ts';

const search: TopicLab = {
  id: 'for-search',
  title: 'Planning a scene search',
  lead: 'A search pattern is a promise that every part of the scene was looked at. Lane spacing and pattern decide how much ground each searcher covers — and how long it takes.',
  controls: [
    slider('len', 'Scene length', 5, 60, 1, 20, 'm'),
    slider('wid', 'Scene width', 5, 60, 1, 10, 'm'),
    slider('lane', 'Spacing between lanes', 0.5, 3, 0.25, 1, 'm'),
    choice('pattern', 'Search pattern', ['Line (strip)', 'Grid', 'Spiral', 'Zone (quadrants)'], 0),
    slider('people', 'Searchers', 1, 8, 1, 1, ''),
  ],
  run: (v) => {
    const strip = (v.wid / v.lane) * v.len,
      distance = v.pattern === 1 ? strip + (v.len / v.lane) * v.wid : strip,
      time = distance / (v.people * 15),
      lanes = Math.min(30, Math.round(v.wid / v.lane));
    return {
      o: { distance, time },
      metrics: [
        { label: 'Total distance walked', value: distance, unit: 'm' },
        { label: 'Time at a careful pace', value: time, unit: 'min' },
        {
          label: 'Each point is passed',
          value: v.pattern === 1 ? 'Twice, from two directions' : 'Once',
        },
        {
          label: 'Best suited to',
          value: [
            'Large open areas',
            'Small evidence in an open area — most thorough',
            'A single searcher with no physical barriers',
            'Rooms and scenes with natural divisions',
          ][v.pattern],
        },
      ],
      sceneLabel: `Plan view of a ${v.len} by ${v.wid} metre scene searched with a ${['line', 'grid', 'spiral', 'zone'][v.pattern]} pattern`,
      scene: [
        rect(120, 60, 400, 200, 'ink', false, 1),
        ...(v.pattern === 2
          ? [1, 2, 3, 4].map((i) =>
              rect(120 + i * 36, 60 + i * 20, 400 - i * 72, 200 - i * 40, 'slot', false, 1),
            )
          : Array.from({ length: lanes }, (_, i) =>
              line(
                120,
                60 + ((i + 0.5) * 200) / lanes,
                520,
                60 + ((i + 0.5) * 200) / lanes,
                'slot',
                1.2,
              ),
            )),
        ...(v.pattern === 1
          ? Array.from({ length: 12 }, (_, i) =>
              line(
                120 + ((i + 0.5) * 400) / 12,
                60,
                120 + ((i + 0.5) * 400) / 12,
                260,
                'accent',
                1.2,
              ),
            )
          : []),
        ...(v.pattern === 3
          ? [line(320, 60, 320, 260, 'gold', 3), line(120, 160, 520, 160, 'gold', 3)]
          : []),
        text(320, 290, `${v.len} m × ${v.wid} m · lanes ${v.lane} m apart`, 'middle', 'muted'),
      ],
    };
  },
  missions: [
    goal(
      'Switch to the pattern that covers every point twice, and compare its walking distance with the line search.',
      'A grid is two line searches at right angles.',
      { pattern: 1 },
      (o, v) => v.pattern === 1,
    ),
    goal(
      'Complete a line search of the starting 20 m × 10 m scene in under five minutes.',
      'Add searchers walking in parallel.',
      { people: 3 },
      (o, v) =>
        v.pattern === 0 && v.len === 20 && v.wid === 10 && near(v.lane, 1, 1e-9) && o.time < 5,
    ),
    goal(
      'Halve the lane spacing for a line search and read the new walking distance.',
      'Closer lanes find smaller evidence but take longer.',
      { lane: 0.5 },
      (o, v) => v.pattern === 0 && near(v.lane, 0.5, 1e-9),
    ),
  ],
  predict: {
    q: 'Compared with a line search of the same scene at the same lane spacing, a grid search…',
    options: [
      'Covers about twice the distance and views every point from two directions',
      'Covers half the distance',
      'Covers the same distance in less time',
      'Skips the corners',
    ],
    correct: 0,
    why: 'A grid search repeats the strip search at right angles. The second pass costs time but finds items hidden from the first direction of view.',
  },
  model:
    'Distance = (width ÷ lane spacing) × length for one pass, doubled for a grid; time assumes 15 m per minute per searcher. Spiral and zone searches cover a similar total distance to a line search. Real scenes add obstacles, terrain, and time for documenting each find.',
};

const controlsLab: TopicLab = {
  id: 'for-controls',
  title: 'Can this test result be trusted?',
  lead: 'A presumptive test is run beside a known positive and a known blank. Their behaviour — not the sample’s — decides whether the run means anything.',
  controls: [
    toggle('sample', 'The evidence sample reacts', 1),
    toggle('pos', 'The positive control (known substance) reacts', 1),
    toggle('neg', 'The negative control (blank) reacts'),
  ],
  run: (v) => {
    const code = v.neg ? 3 : !v.pos ? 2 : v.sample ? 1 : 0;
    const tube = (x: number, label: string, on: number): Shape[] => [
      path(`M${x - 22} 70V220Q${x} 250 ${x + 22} 220V70`, 'ink', false, 2.5),
      rect(x - 20, 140, 40, 84, on ? 'slot' : 'muted', true, on ? 0.7 : 0.15, 6),
      text(x, 276, label, 'middle', 'ink', 12),
      text(x, 294, on ? 'reacts' : 'no reaction', 'middle', on ? 'slot' : 'muted', 11),
    ];
    return {
      o: { code },
      metrics: [
        {
          label: 'Verdict',
          value: [
            'Valid negative result',
            'Valid positive result (presumptive)',
            'INVALID — the reagent or procedure failed',
            'INVALID — contamination or an interfering substance',
          ][code],
        },
        {
          label: 'What to do next',
          value: [
            'Report as negative with the controls documented',
            'Proceed to a confirmatory test',
            'Replace the reagent and repeat with fresh controls',
            'Find the source of contamination, then repeat',
          ][code],
        },
      ],
      sceneLabel: `Three tubes: evidence ${v.sample ? 'reacts' : 'does not react'}, positive control ${v.pos ? 'reacts' : 'does not react'}, blank ${v.neg ? 'reacts' : 'does not react'}`,
      scene: [
        ...tube(180, 'Evidence', v.sample),
        ...tube(320, 'Positive control', v.pos),
        ...tube(460, 'Blank', v.neg),
      ],
    };
  },
  missions: [
    goal(
      'Produce a negative result that you could report with confidence.',
      'Both controls must behave as expected.',
      { sample: 0 },
      (o) => o.code === 0,
    ),
    goal(
      'Produce a run that is invalid because of contamination.',
      'A blank should never react.',
      { neg: 1 },
      (o) => o.code === 3,
    ),
    goal(
      'Produce a negative-looking result that cannot be trusted.',
      'If the known positive fails, a negative sample tells you nothing.',
      { sample: 0, pos: 0 },
      (o, v) => v.sample === 0 && o.code === 2,
    ),
  ],
  predict: {
    q: 'A sample tests negative, but the positive control run alongside it also fails to react. The sample result is…',
    options: [
      'Uninterpretable — the test may not be working',
      'A reliable negative',
      'A weak positive',
      'Proof that the substance is absent',
    ],
    correct: 0,
    why: 'The positive control shows that the reagent can respond. If it does not, a negative sample cannot be distinguished from a dead reagent.',
  },
  model:
    'Logic of a qualitative test with one positive and one negative control. A valid positive presumptive test still requires confirmation by a second, more specific method. Real quality systems also track reagent lot, expiry, and analyst.',
};

const powders: { name: string; sol: boolean; fizz: boolean; iodine: boolean; ph: number }[] = [
  { name: 'Sodium chloride', sol: true, fizz: false, iodine: false, ph: 2 },
  { name: 'Sodium bicarbonate', sol: true, fizz: true, iodine: false, ph: 3 },
  { name: 'Sodium carbonate', sol: true, fizz: true, iodine: false, ph: 4 },
  { name: 'Calcium carbonate', sol: false, fizz: true, iodine: false, ph: 2 },
  { name: 'Calcium sulfate', sol: false, fizz: false, iodine: false, ph: 2 },
  { name: 'Cornstarch', sol: false, fizz: false, iodine: true, ph: 2 },
  { name: 'Sucrose', sol: true, fizz: false, iodine: false, ph: 2 },
  { name: 'Boric acid', sol: true, fizz: false, iodine: false, ph: 1 },
];
const powder: TopicLab = {
  id: 'for-powder',
  title: 'White-powder decision scheme',
  lead: 'Eight white powders look alike. Each observation you record removes the ones it contradicts — the same logic as a flowchart, but you choose the order.',
  controls: [
    choice('sol', 'In water', ['Not tested', 'Dissolves', 'Does not dissolve'], 0),
    choice('fizz', 'With dilute HCl', ['Not tested', 'Fizzes', 'No reaction'], 0),
    choice('iodine', 'With iodine solution', ['Not tested', 'Turns blue-black', 'No change'], 0),
    choice(
      'ph',
      'pH of the solution or slurry',
      ['Not tested', 'Acidic', 'Neutral', 'Mildly basic', 'Strongly basic'],
      0,
    ),
  ],
  run: (v) => {
    const keep = powders.map(
      (p) =>
        (v.sol === 0 || p.sol === (v.sol === 1)) &&
        (v.fizz === 0 || p.fizz === (v.fizz === 1)) &&
        (v.iodine === 0 || p.iodine === (v.iodine === 1)) &&
        (v.ph === 0 || p.ph === v.ph),
    );
    const count = keep.filter(Boolean).length,
      tests = [v.sol, v.fizz, v.iodine, v.ph].filter((x) => x > 0).length;
    return {
      o: { count, tests, only: count === 1 ? keep.indexOf(true) : -1 },
      metrics: [
        { label: 'Candidates remaining', value: count },
        { label: 'Tests recorded', value: tests },
        {
          label: 'Status',
          value:
            count === 1
              ? `Consistent with ${powders[keep.indexOf(true)].name.toLowerCase()} only`
              : count === 0
                ? 'No powder fits — recheck an observation or suspect a mixture'
                : count === 2 && tests === 4
                  ? 'Two remain: these four tests cannot separate them — add a flame or Benedict test'
                  : 'Keep testing',
        },
      ],
      sceneLabel: `Powders still consistent: ${
        powders
          .filter((_, i) => keep[i])
          .map((p) => p.name)
          .join(', ') || 'none'
      }`,
      scene: [
        text(40, 34, 'Candidate powders — eliminated ones are faded and struck through'),
        ...powders.flatMap((p, i): Shape[] => {
          const x = 60 + (i % 2) * 290,
            y = 76 + Math.floor(i / 2) * 58;
          return keep[i]
            ? [
                rect(x, y - 22, 250, 36, 'slot', false, 1, 6),
                text(x + 16, y + 2, p.name, 'start', 'ink', 15),
              ]
            : [
                rect(x, y - 22, 250, 36, 'muted', false, 0.4, 6),
                text(x + 16, y + 2, p.name, 'start', 'muted', 15),
                line(x + 12, y - 3, x + 170, y - 3, 'muted', 1.5),
              ];
        }),
      ],
    };
  },
  missions: [
    goal(
      'Identify one powder with a single test.',
      'Only one of the eight is a polysaccharide that reacts with iodine.',
      { iodine: 1 },
      (o) => o.count === 1 && o.tests === 1,
    ),
    goal(
      'Isolate calcium carbonate with two observations.',
      'It does not dissolve in water, yet it reacts with acid.',
      { sol: 2, fizz: 1 },
      (o) => o.only === 3,
    ),
    goal(
      'Separate baking soda (sodium bicarbonate) from washing soda (sodium carbonate).',
      'Both fizz, but their solutions differ in how basic they are.',
      { fizz: 1, ph: 3 },
      (o) => o.only === 1,
    ),
    goal(
      'Find two powders that all four tests cannot tell apart.',
      'Both dissolve, neither fizzes or reacts with iodine, and both are neutral.',
      { sol: 1, fizz: 2, iodine: 2, ph: 2 },
      (o) => o.count === 2 && o.tests === 4,
    ),
  ],
  predict: {
    q: 'A white powder fizzes with dilute HCl. This shows that it probably contains…',
    options: ['A carbonate or bicarbonate', 'Starch', 'A chloride', 'A reducing sugar'],
    correct: 0,
    why: 'Acid releases carbon dioxide gas from carbonates and bicarbonates. Further tests — solubility and pH — are needed to say which one.',
  },
  model:
    'Idealised yes/no properties for eight common white powders. Real samples can be mixtures, hydrates, or contaminated, and slight solubility (as with calcium sulfate) is easy to misjudge. Sodium chloride and sucrose need an additional test such as conductivity or flame colour.',
};

function wavelengthColour(nm: number) {
  // Approximate display colour for a visible wavelength.
  let r = 0,
    g = 0,
    b = 0;
  if (nm < 440) [r, b] = [(440 - nm) / 60, 1];
  else if (nm < 490) [g, b] = [(nm - 440) / 50, 1];
  else if (nm < 510) [g, b] = [1, (510 - nm) / 20];
  else if (nm < 580) [r, g] = [(nm - 510) / 70, 1];
  else if (nm < 645) [r, g] = [1, (645 - nm) / 65];
  else r = 1;
  const fade =
    nm < 420 ? 0.3 + (0.7 * (nm - 380)) / 40 : nm > 700 ? 0.3 + (0.7 * (780 - nm)) / 80 : 1;
  const level = (x: number) => Math.round(255 * Math.max(0, Math.min(1, x * fade)));
  return `rgb(${level(r)},${level(g)},${level(b)})`;
}
const metals: [string, number, string][] = [
  ['Lithium', 671, 'crimson'],
  ['Sodium', 589, 'intense yellow'],
  ['Potassium', 766, 'lilac'],
  ['Calcium', 622, 'orange-red'],
  ['Strontium', 650, 'red'],
  ['Barium', 554, 'pale green'],
  ['Copper', 510, 'blue-green'],
];
const flame: TopicLab = {
  id: 'for-flame',
  title: 'Flame-test emission lines',
  lead: 'Heated metal ions emit light at characteristic wavelengths. Tune a wavelength, see its colour, and find which metal it points to — with and without cobalt glass.',
  controls: [
    slider('wave', 'Emission wavelength', 400, 780, 1, 500, 'nm'),
    toggle('cobalt', 'View through cobalt-blue glass'),
  ],
  run: (v) => {
    const match = metals.findIndex(([, line]) => Math.abs(line - v.wave) <= 8),
      visible = !v.cobalt || v.wave < 500 || v.wave > 690 ? 1 : 0;
    return {
      o: { match, visible },
      metrics: [
        {
          label: 'Closest listed metal',
          value: match < 0 ? 'None within 8 nm' : `${metals[match][0]} — ${metals[match][2]} flame`,
        },
        {
          label: 'Seen through the filter?',
          value: v.cobalt
            ? visible
              ? 'Yes — transmitted'
              : 'No — absorbed by cobalt glass'
            : 'No filter in use',
        },
      ],
      sceneLabel: `Flame colour at ${v.wave} nanometres${match >= 0 ? `, matching ${metals[match][0]}` : ''}`,
      scene: [
        ...Array.from({ length: 76 }, (_, i) =>
          swatch(70 + i * 6.6, 230, 7, 26, wavelengthColour(400 + i * 5)),
        ),
        ...metals.flatMap(([name, lineAt]): Shape[] => [
          line(
            70 + ((lineAt - 400) / 380) * 500,
            222,
            70 + ((lineAt - 400) / 380) * 500,
            262,
            'ink',
            1.5,
          ),
          text(
            70 + ((lineAt - 400) / 380) * 500,
            280 + (lineAt === 650 || lineAt === 589 ? 14 : 0),
            name.slice(0, 2),
            'middle',
            'muted',
            10,
          ),
        ]),
        line(
          70 + ((v.wave - 400) / 380) * 500,
          206,
          70 + ((v.wave - 400) / 380) * 500,
          262,
          'slot',
          3,
        ),
        path('M320 190Q270 130 320 50Q370 130 320 190Z', 'muted', false, 1.5),
        swatch(296, 96, 48, 86, visible ? wavelengthColour(v.wave) : 'rgb(20,20,40)', 24),
        text(320, 36, `${v.wave} nm`, 'middle', 'slot', 16),
        text(
          320,
          320,
          'Spectrum 400–780 nm with the principal flame lines marked',
          'middle',
          'muted',
          11,
        ),
      ],
    };
  },
  missions: [
    goal(
      'Tune the wavelength to sodium’s emission line.',
      'The familiar street-lamp yellow, near 589 nm.',
      { wave: 589 },
      (o, v) => o.match === 1 && v.cobalt === 0,
    ),
    goal(
      'Tune to barium’s pale green line.',
      'Look in the green, near 554 nm.',
      { wave: 554 },
      (o) => o.match === 5,
    ),
    goal(
      'Show that cobalt glass blocks sodium’s yellow light.',
      'Keep the sodium wavelength and add the filter.',
      { wave: 589, cobalt: 1 },
      (o) => o.match === 1 && o.visible === 0,
    ),
    goal(
      'Show potassium’s line passing through cobalt glass.',
      'Potassium emits in the deep red, near 766 nm.',
      { wave: 766, cobalt: 1 },
      (o, v) => o.match === 2 && v.cobalt === 1 && o.visible === 1,
    ),
  ],
  predict: {
    q: 'A flame test is viewed through cobalt-blue glass mainly in order to…',
    options: [
      'Filter out sodium’s bright yellow so a potassium flame can be seen',
      'Make every flame look blue',
      'Protect the eyes from heat',
      'Make sodium easier to see',
    ],
    correct: 0,
    why: 'Traces of sodium are almost always present and its yellow swamps weaker colours. Cobalt glass absorbs yellow and transmits potassium’s violet and deep-red light.',
  },
  model:
    'One principal emission wavelength per metal (several have additional lines and molecular bands); a match is within 8 nm. The colour swatch is an approximate rendering, and the cobalt filter is idealised as blocking 500–690 nm.',
};

const plastics: [string, number, boolean][] = [
  ['Polypropylene (PP, code 5)', 0.9, false],
  ['High-density polyethylene (HDPE, code 2)', 0.95, false],
  ['Polystyrene (PS, code 6)', 1.05, false],
  ['Polyethylene terephthalate (PETE, code 1)', 1.38, false],
  ['Low-density polyethylene (LDPE, code 4)', 0.92, false],
  ['Polyvinyl chloride (PVC, code 3)', 1.4, true],
];
const liquids: [string, number][] = [
  ['Alcohol–water mix, 0.91 g/mL', 0.91],
  ['Alcohol–water mix, 0.94 g/mL', 0.94],
  ['Water, 1.00 g/mL', 1],
  ['Salt water, 1.07 g/mL', 1.07],
  ['Saturated salt water, 1.20 g/mL', 1.2],
];
const plasticId: TopicLab = {
  id: 'for-plastic',
  title: 'Identify an unknown plastic',
  lead: 'Six plastic chips, six candidate polymers. Float each chip in a series of liquids to bracket its density, add a chlorine test where needed, then commit to an identification.',
  controls: [
    choice(
      'unknown',
      'Unknown chip',
      ['Chip A', 'Chip B', 'Chip C', 'Chip D', 'Chip E', 'Chip F'],
      0,
    ),
    choice(
      'test',
      'Test performed',
      [...liquids.map(([name]) => `Place in ${name}`), 'Beilstein copper-wire flame test'],
      2,
    ),
    choice('verdict', 'Your identification', ['Undecided', ...plastics.map(([name]) => name)], 0),
  ],
  run: (v) => {
    const [, density, chlorine] = plastics[v.unknown],
      beilstein = v.test === 5,
      floats = !beilstein && density < liquids[v.test][1] ? 1 : 0,
      correct = v.verdict === v.unknown + 1 ? 1 : 0;
    return {
      o: { floats, correct, green: beilstein && chlorine ? 1 : 0 },
      metrics: [
        {
          label: 'Observation',
          value: beilstein
            ? chlorine
              ? 'Green flame — chlorine is present'
              : 'No green flame'
            : floats
              ? 'The chip floats'
              : 'The chip sinks',
        },
        {
          label: 'What that tells you',
          value: beilstein
            ? chlorine
              ? 'The polymer contains chlorine'
              : 'No chlorine detected'
            : `Density is ${floats ? 'less' : 'greater'} than ${liquids[v.test][1]} g/mL`,
        },
        {
          label: 'Your identification',
          value:
            v.verdict === 0
              ? 'Bracket the density before deciding'
              : correct
                ? 'Consistent with every test'
                : 'Conflicts with at least one test — keep testing',
        },
      ],
      sceneLabel: beilstein
        ? `Copper wire flame test: ${chlorine ? 'green flame' : 'no green flame'}`
        : `Plastic chip ${floats ? 'floating' : 'sunk'} in ${liquids[v.test][0]}`,
      scene: beilstein
        ? [
            line(200, 230, 330, 150, 'gold', 4),
            path(
              'M330 150Q300 110 340 60Q380 110 350 150Z',
              chlorine ? 'green' : 'warm',
              true,
              1,
              0.75,
            ),
            text(
              320,
              280,
              chlorine ? 'Green flame: copper halide formed' : 'Ordinary flame colour',
              'middle',
            ),
          ]
        : [
            path('M220 60V280H420V60', 'ink', false, 3),
            rect(223, 110, 194, 167, 'cool', true, 0.3),
            rect(290, floats ? 100 : 255, 60, 16, 'slot', true, 1, 3),
            text(320, 310, liquids[v.test][0], 'middle', 'muted'),
          ],
    };
  },
  missions: [
    goal(
      'Identify Chip A from its float-and-sink results.',
      'If it floats even in the lightest liquid, only one candidate is that light.',
      { unknown: 0, verdict: 1 },
      (o, v) => v.unknown === 0 && o.correct === 1,
    ),
    goal(
      'Identify Chip C from its float-and-sink results.',
      'It sinks in water but floats in salt water.',
      { unknown: 2, verdict: 3 },
      (o, v) => v.unknown === 2 && o.correct === 1,
    ),
    goal(
      'Identify Chip F, using a chlorine test if density alone is not enough.',
      'Two dense plastics sink in everything; only one of them contains chlorine.',
      { unknown: 5, verdict: 6 },
      (o, v) => v.unknown === 5 && o.correct === 1,
    ),
  ],
  predict: {
    q: 'A plastic chip sinks in water but floats in a salt solution of density 1.07 g/mL. Its density is…',
    options: [
      'Between 1.00 and 1.07 g/mL',
      'Less than 1.00 g/mL',
      'Greater than 1.07 g/mL',
      'Exactly 1.00 g/mL',
    ],
    correct: 0,
    why: 'An object sinks in a liquid less dense than itself and floats in one that is denser. The two results bracket the density from below and above.',
  },
  model:
    'Typical densities: PP 0.90, LDPE 0.92, HDPE 0.95, PS 1.05, PETE 1.38, PVC about 1.40 g/mL. Real plastics vary with fillers, foaming, and trapped air; expanded polystyrene floats. The Beilstein test indicates a halogen and should be performed only with supervision and ventilation.',
};

const fibers: { name: string; burn: number; odour: number; residue: number; micro: number }[] = [
  { name: 'Cotton', burn: 1, odour: 1, residue: 1, micro: 1 },
  { name: 'Wool', burn: 2, odour: 2, residue: 2, micro: 2 },
  { name: 'Silk', burn: 2, odour: 2, residue: 2, micro: 3 },
  { name: 'Nylon', burn: 3, odour: 3, residue: 3, micro: 3 },
  { name: 'Polyester', burn: 3, odour: 3, residue: 3, micro: 3 },
];
const fiber: TopicLab = {
  id: 'for-fiber',
  title: 'Sorting fibres by burn test and microscopy',
  lead: 'Five common fibres, four kinds of observation. Record what you see and watch the candidates narrow — and notice where this set of tests runs out.',
  controls: [
    choice(
      'burn',
      'In the flame',
      [
        'Not tested',
        'Burns steadily with an afterglow',
        'Burns slowly and goes out by itself',
        'Melts and shrinks away',
      ],
      0,
    ),
    choice(
      'odour',
      'Odour',
      ['Not tested', 'Burning paper', 'Burning hair', 'Chemical or sweet'],
      0,
    ),
    choice(
      'residue',
      'Residue',
      ['Not tested', 'Fine grey ash', 'Dark bead that crushes', 'Hard round bead'],
      0,
    ),
    choice(
      'micro',
      'Under the microscope',
      ['Not tested', 'Flat, twisted ribbon', 'Overlapping surface scales', 'Smooth, uniform rod'],
      0,
    ),
  ],
  run: (v) => {
    const keep = fibers.map(
      (f) =>
        (v.burn === 0 || f.burn === v.burn) &&
        (v.odour === 0 || f.odour === v.odour) &&
        (v.residue === 0 || f.residue === v.residue) &&
        (v.micro === 0 || f.micro === v.micro),
    );
    const count = keep.filter(Boolean).length,
      tests = [v.burn, v.odour, v.residue, v.micro].filter((x) => x > 0).length;
    return {
      o: { count, tests, only: count === 1 ? keep.indexOf(true) : -1 },
      metrics: [
        {
          label: 'Fibres still consistent',
          value:
            fibers
              .filter((_, i) => keep[i])
              .map((f) => f.name)
              .join(', ') || 'None — recheck an observation',
        },
        { label: 'Tests recorded', value: tests },
        {
          label: 'Fibre class',
          value:
            count === 0
              ? '—'
              : keep[0] && count === 1
                ? 'Natural, plant (cellulose)'
                : (keep[1] || keep[2]) && !keep[0] && !keep[3]
                  ? 'Natural, animal (protein)'
                  : (keep[3] || keep[4]) && !keep[0] && !keep[1]
                    ? 'Synthetic polymer'
                    : 'Not yet narrowed to one class',
        },
      ],
      bars: {
        title: 'Candidates remaining',
        max: 5,
        items: [
          {
            label: 'Fibres consistent with every observation',
            value: count,
            tone: count === 1 ? 'green' : 'slot',
          },
        ],
      },
    };
  },
  missions: [
    goal(
      'Identify cotton with a single observation.',
      'Cellulose burns like paper.',
      { odour: 1 },
      (o) => o.only === 0 && o.tests === 1,
    ),
    goal(
      'Separate wool from silk using two observations.',
      'Both are protein and smell of burning hair; look at the fibre’s surface.',
      { odour: 2, micro: 2 },
      (o) => o.only === 1,
    ),
    goal(
      'Find two fibres that these observations cannot tell apart, using at least two tests.',
      'Both melt to a hard bead and look like smooth rods.',
      { burn: 3, residue: 3 },
      (o) => o.count === 2 && o.tests >= 2,
    ),
  ],
  predict: {
    q: 'A fibre burns with the smell of burning hair and leaves a dark bead that crushes easily. It is most likely…',
    options: ['A protein fibre such as wool or silk', 'Cotton', 'Polyester', 'Glass fibre'],
    correct: 0,
    why: 'Hair, wool, and silk are all proteins and give the same sulfurous odour. Cellulose smells of paper; synthetics melt to a hard bead.',
  },
  model:
    'Idealised burn-test and microscopic characteristics for five fibres. Blends, dyes, and finishes change real behaviour, and nylon and polyester need solubility or melting-point tests to separate. A burn test destroys evidence and is used only when material can be spared.',
};

const hair: TopicLab = {
  id: 'for-hair',
  title: 'Medullary index and scale pattern',
  lead: 'Two microscopic features help decide whether a hair could be human: how much of its width the medulla occupies, and the pattern of its cuticle scales.',
  controls: [
    slider('hair', 'Hair shaft diameter', 40, 150, 5, 80, 'µm'),
    slider('med', 'Medulla diameter', 0, 120, 5, 30, 'µm'),
    choice(
      'scale',
      'Cuticle scale pattern',
      ['Imbricate (flattened, overlapping)', 'Coronal (crown-like)', 'Spinous (petal-like)'],
      0,
    ),
  ],
  run: (v) => {
    const medulla = Math.min(v.med, v.hair),
      index = medulla / v.hair,
      code = v.scale !== 0 || index >= 0.5 ? 2 : index < 1 / 3 ? 0 : 1;
    return {
      o: { index, code },
      metrics: [
        { label: 'Medullary index', value: Number(index.toFixed(2)) },
        {
          label: 'Interpretation',
          value: [
            'Consistent with human hair',
            'Indeterminate — in between the usual ranges',
            'Consistent with animal hair',
          ][code],
        },
        {
          label: 'Basis',
          value:
            v.scale !== 0
              ? 'Scale pattern not typical of humans'
              : index >= 0.5
                ? 'Medulla is at least half the shaft width'
                : index < 1 / 3
                  ? 'Medulla under one third of the width, with imbricate scales'
                  : 'Index between one third and one half',
        },
      ],
      sceneLabel: `Hair cross-section ${v.hair} micrometres across with a ${medulla} micrometre medulla`,
      scene: [
        circle(200, 160, v.hair * 0.75, 'gold', true, 0.45),
        circle(200, 160, v.hair * 0.75, 'ink', false),
        circle(200, 160, medulla * 0.75, 'ink', true, 0.6),
        text(200, 300, 'cross-section', 'middle', 'muted'),
        rect(360, 160 - v.hair * 0.4, 220, v.hair * 0.8, 'gold', true, 0.45),
        rect(360, 160 - medulla * 0.4, 220, medulla * 0.8, 'ink', true, 0.6),
        text(470, 300, 'side view: cortex with central medulla', 'middle', 'muted'),
      ],
    };
  },
  missions: [
    goal(
      'Set a medulla that makes the hair consistent with human origin.',
      'In human hair the medulla is usually less than one third of the shaft width.',
      { med: 20 },
      (o) => o.code === 0,
    ),
    goal(
      'Set a medulla wide enough to indicate an animal hair by index alone.',
      'An index of one half or more.',
      { med: 50 },
      (o, v) => v.scale === 0 && o.index >= 0.5,
    ),
    goal(
      'Show a narrow-medulla hair that is still classed as animal.',
      'The scale pattern can decide it.',
      { med: 20, scale: 1 },
      (o) => o.index < 1 / 3 && o.code === 2,
    ),
  ],
  predict: {
    q: 'A hair has a shaft diameter of 90 µm and a medulla 60 µm wide. Its medullary index and likely origin are…',
    options: ['0.67 — animal', '0.67 — human', '1.5 — human', '0.33 — animal'],
    correct: 0,
    why: 'Index = medulla ÷ shaft = 60 ÷ 90 ≈ 0.67. Values of one half or more are typical of animal hair; human values are usually under one third.',
  },
  model:
    'Medullary index = medulla diameter ÷ shaft diameter, with the customary guide values (human below about 0.33, most animals 0.5 or more). Human hairs often have a fragmented or absent medulla. Hair comparison is class evidence; only nuclear DNA from a root can individualise.',
};

const dyes = [2, 5, 8];
const pens = [
  [0, 1],
  [0, 2],
  [1, 2],
];
const tlc: TopicLab = {
  id: 'for-tlc',
  title: 'Comparing inks on one TLC plate',
  lead: 'An ink from a questioned note is run beside three reference pens. Whether you can tell them apart depends on choosing a solvent that actually separates the dyes.',
  controls: [
    slider('s', 'Solvent polarity', 0, 10, 0.5, 0, ''),
    choice(
      'verdict',
      'The questioned ink is consistent with',
      ['Undecided', 'Pen A', 'Pen B', 'Pen C'],
      0,
    ),
  ],
  run: (v) => {
    const rf = dyes.map((p) => 1 / (1 + Math.exp(0.9 * (p - v.s)))),
      gap = Math.min(rf[0] - rf[1], rf[1] - rf[2]),
      resolved = gap >= 0.15 ? 1 : 0,
      tones: Tone[] = ['warm', 'cool', 'green'],
      lanes: [string, number[]][] = [
        ['Questioned', pens[1]],
        ['Pen A', pens[0]],
        ['Pen B', pens[1]],
        ['Pen C', pens[2]],
      ];
    return {
      o: { gap, resolved, top: rf[0], low: rf[2], correct: v.verdict === 2 ? 1 : 0 },
      metrics: [
        { label: 'Rf of the three dyes', value: rf.map((x) => x.toFixed(2)).join(', ') },
        { label: 'Smallest separation between dyes', value: Number(gap.toFixed(2)) },
        {
          label: 'Plate quality',
          value: resolved
            ? 'Resolved — lanes can be compared'
            : rf[2] > 0.85
              ? 'Too polar: everything ran with the solvent front'
              : rf[0] < 0.2
                ? 'Not polar enough: everything stayed near the baseline'
                : 'Partly resolved',
        },
        {
          label: 'Your comparison',
          value:
            v.verdict === 0
              ? 'Resolve the plate before deciding'
              : !resolved
                ? 'Not defensible on an unresolved plate'
                : v.verdict === 2
                  ? 'Same pattern as the questioned ink'
                  : 'Pattern differs from the questioned ink',
        },
      ],
      sceneLabel: `TLC plate with four lanes; dye Rf values ${rf.map((x) => x.toFixed(2)).join(', ')}`,
      scene: [
        rect(170, 30, 300, 270, 'ink', false, 1, 4),
        line(170, 270, 470, 270, 'muted', 1.5, true),
        line(170, 60, 470, 60, 'muted', 1.5, true),
        text(480, 64, 'solvent front', 'start', 'muted', 10),
        text(480, 274, 'baseline', 'start', 'muted', 10),
        ...lanes.flatMap(([name, set], i): Shape[] => [
          text(205 + i * 75, 320, name, 'middle', i === 0 ? 'slot' : 'muted', 11),
          ...set.map((d) => ellipse(205 + i * 75, 270 - rf[d] * 210, 13, 8, tones[d], true, 0.85)),
        ]),
      ],
    };
  },
  missions: [
    goal(
      'Choose a solvent that separates all three dyes by at least 0.25 in Rf.',
      'A mid-polarity solvent spreads the dyes across the plate.',
      { s: 5 },
      (o) => o.gap >= 0.25,
    ),
    goal(
      'Show a solvent so polar that every dye runs near the solvent front.',
      'When everything has an Rf above 0.85, nothing is separated.',
      { s: 10 },
      (o) => o.low > 0.85,
    ),
    goal(
      'On a resolved plate, decide which pen is consistent with the questioned ink.',
      'Match both the number of spots and their positions.',
      { s: 5, verdict: 2 },
      (o) => o.resolved === 1 && o.correct === 1,
    ),
  ],
  predict: {
    q: 'On a silica TLC plate, switching to a more polar solvent generally makes the spots…',
    options: [
      'Travel farther up the plate',
      'Stay closer to the baseline',
      'Disappear',
      'Travel the same distance',
    ],
    correct: 0,
    why: 'A polar solvent competes more strongly with the polar silica for the dye molecules, so they spend more time moving with the solvent.',
  },
  model:
    'Three dyes of different polarity on a polar stationary phase, with Rf following a logistic function of solvent polarity. An illustrative model: real separations depend on the specific dyes and solvent mixture. A shared pattern shows the inks are consistent, not that they came from one pen.',
};

function halogenPattern(cl: number, br: number) {
  let pattern = [1];
  const multiply = (light: number, heavy: number) => {
    const next = Array<number>(pattern.length + 1).fill(0);
    pattern.forEach((p, i) => {
      next[i] += p * light;
      next[i + 1] += p * heavy;
    });
    pattern = next;
  };
  for (let i = 0; i < cl; i++) multiply(0.758, 0.242);
  for (let i = 0; i < br; i++) multiply(0.507, 0.493);
  return pattern.map((p) => (p / pattern[0]) * 100);
}
const isotope: TopicLab = {
  id: 'for-isotope',
  title: 'Halogen isotope patterns in a mass spectrum',
  lead: 'Chlorine and bromine each have two abundant isotopes two mass units apart. They stamp a recognisable cluster of peaks onto the molecular ion.',
  controls: [
    slider('cl', 'Chlorine atoms in the molecule', 0, 3, 1, 0, ''),
    slider('br', 'Bromine atoms in the molecule', 0, 2, 1, 0, ''),
  ],
  run: (v) => {
    const pattern = halogenPattern(v.cl, v.br);
    return {
      o: { m2: pattern[1] ?? 0, m4: pattern[2] ?? 0 },
      metrics: [
        {
          label: 'Relative peak heights (M = 100)',
          value: pattern
            .map((p, i) => `${i === 0 ? 'M' : `M+${2 * i}`}: ${p.toFixed(0)}`)
            .join(' · '),
        },
        { label: 'Number of peaks in the cluster', value: pattern.length },
        {
          label: 'Reading',
          value:
            v.cl + v.br === 0
              ? 'No halogen pattern — only small natural isotope peaks would appear'
              : 'Peaks two mass units apart signal chlorine or bromine',
        },
      ],
      bars: {
        title: 'Molecular-ion cluster, relative to M = 100',
        max: Math.max(100, ...pattern),
        items: pattern.map((p, i) => ({
          label: i === 0 ? 'M' : `M + ${2 * i}`,
          value: p,
          tone: i === 0 ? ('accent' as const) : ('slot' as const),
        })),
      },
    };
  },
  missions: [
    goal(
      'Show the pattern for one chlorine atom: an M + 2 peak about one third the height of M.',
      'Chlorine-37 is about a quarter of natural chlorine.',
      { cl: 1 },
      (o, v) => v.br === 0 && near(o.m2, 32, 1.5),
    ),
    goal(
      'Show the pattern for one bromine atom: M and M + 2 nearly equal.',
      'Bromine’s two isotopes are almost equally abundant.',
      { br: 1 },
      (o, v) => v.cl === 0 && near(o.m2, 97.2, 2),
    ),
    goal(
      'Show the roughly 9 : 6 : 1 pattern of two chlorine atoms.',
      'Three peaks: M, M + 2, and M + 4.',
      { cl: 2 },
      (o, v) => v.br === 0 && near(o.m2, 64, 2) && near(o.m4, 10.2, 1.5),
    ),
    goal(
      'Find a pattern in which M + 2 is taller than M.',
      'Two bromines give roughly 1 : 2 : 1.',
      { br: 2 },
      (o) => o.m2 > 100,
    ),
  ],
  predict: {
    q: 'A molecular ion shows two peaks of almost equal height, two mass units apart. The compound most likely contains…',
    options: ['One bromine atom', 'One chlorine atom', 'One fluorine atom', 'Two nitrogen atoms'],
    correct: 0,
    why: 'Bromine-79 and bromine-81 occur in a ratio close to 1 : 1. One chlorine would give about 3 : 1; fluorine has a single stable isotope.',
  },
  model:
    'Binomial combination of natural abundances: ³⁵Cl 75.8% / ³⁷Cl 24.2% and ⁷⁹Br 50.7% / ⁸¹Br 49.3%. Contributions from ¹³C and other elements, which add small M + 1 peaks, are not shown.',
};

const printPattern: TopicLab = {
  id: 'for-print',
  title: 'Classifying a fingerprint pattern',
  lead: 'Count the deltas first. The number of deltas, and for loops the direction of ridge flow relative to the hand, places a print in its pattern family.',
  controls: [
    slider('deltas', 'Number of deltas', 0, 2, 1, 1, ''),
    choice(
      'opens',
      'For a loop: ridges enter and leave on the side toward the',
      ['Little finger', 'Thumb'],
      0,
    ),
    choice('hand', 'Print taken from the', ['Right hand', 'Left hand'], 0),
  ],
  run: (v) => {
    const type = v.deltas === 0 ? 0 : v.deltas === 2 ? 3 : v.opens === 0 ? 1 : 2,
      right = (v.hand === 0) === (v.opens === 0),
      side = right ? 1 : -1;
    const ridges: Shape[] =
      type === 0
        ? [0, 1, 2, 3, 4, 5].map((i) =>
            path(
              `M200 ${250 - i * 22}Q320 ${150 - i * 26} 440 ${250 - i * 22}`,
              'accent',
              false,
              2.5,
            ),
          )
        : type === 3
          ? [
              [1, 2, 3, 4, 5].map((i) => circle(320, 165, i * 19, 'accent', false)),
              [circle(205, 262, 6, 'gold'), circle(435, 262, 6, 'gold')],
            ].flat()
          : [
              ...[1, 2, 3, 4, 5].map((i) =>
                path(
                  `M${320 + side * 130} ${165 - i * 15}H${320 - side * 20}A${i * 15} ${i * 15} 0 0 ${side > 0 ? 0 : 1} ${320 - side * 20} ${165 + i * 15}H${320 + side * 130}`,
                  'accent',
                  false,
                  2.5,
                ),
              ),
              circle(320 - side * 115, 262, 6, 'gold'),
            ];
    return {
      o: { type },
      metrics: [
        { label: 'Pattern', value: ['Arch', 'Ulnar loop', 'Radial loop', 'Whorl'][type] },
        {
          label: 'Approximate frequency',
          value: [
            'About 5% of prints',
            'Most common: loops are 60–65% of prints, nearly all ulnar',
            'Uncommon; seen mostly on the index finger',
            'About 30–35% of prints',
          ][type],
        },
        {
          label: 'On the impression, a loop opens toward the',
          value: type === 1 || type === 2 ? (right ? 'right' : 'left') : 'not applicable',
        },
      ],
      sceneLabel: `Schematic ${['arch', 'ulnar loop', 'radial loop', 'whorl'][type]} with ${v.deltas} delta${v.deltas === 1 ? '' : 's'}`,
      scene: [
        ...ridges,
        text(320, 316, 'Gold dots mark deltas. Schematic ridge flow only.', 'middle', 'muted', 11),
      ],
    };
  },
  missions: [
    goal(
      'Set the features that define a whorl pattern.',
      'A whorl has at least two deltas.',
      { deltas: 2 },
      (o) => o.type === 3,
    ),
    goal(
      'Set the features that define a plain arch.',
      'Ridges flow in one side and out the other with no delta.',
      { deltas: 0 },
      (o) => o.type === 0,
    ),
    goal(
      'Set up a radial loop on the left hand and note which way it opens on the impression.',
      'Radial means toward the thumb side of that hand.',
      { opens: 1, hand: 1 },
      (o, v) => o.type === 2 && v.hand === 1,
    ),
  ],
  predict: {
    q: 'A fingerprint has exactly one delta. It belongs to which pattern family?',
    options: ['Loop', 'Arch', 'Whorl', 'It cannot be classified'],
    correct: 0,
    why: 'Plain arches have no delta, loops have one, and whorls have two or more. Counting deltas is the quickest first step.',
  },
  model:
    'A simplified three-family scheme (tented arches and whorl sub-types are omitted). Loop direction is named relative to the bones of the forearm, so it depends on which hand the print came from. Pattern type is class evidence; identification rests on minutiae.',
};

const surfaces = [
  'Dry glass or metal',
  'Paper or cardboard',
  'Wet glass or metal',
  'Sticky side of tape',
  'Unfinished wood',
];
const methods: [string, string][] = [
  ['Fingerprint powder', 'adheres to moisture and oils left on the surface'],
  ['Cyanoacrylate (superglue) fuming', 'polymerises on the moisture and residue of the ridges'],
  ['Ninhydrin', 'reacts with amino acids to give a purple product'],
  ['Small-particle reagent', 'fine particles stick to fatty residues, even under water'],
  ['Gentian (crystal) violet', 'stains skin cells and oils held in adhesive'],
  ['Iodine fuming', 'is absorbed temporarily by oily residues'],
];
const suitability = [
  [2, 2, 0, 1, 0, 1],
  [0, 0, 2, 0, 0, 1],
  [0, 0, 0, 2, 0, 0],
  [0, 1, 0, 0, 2, 0],
  [0, 0, 2, 0, 0, 1],
];
const develop: TopicLab = {
  id: 'for-develop',
  title: 'Choosing a latent-print development method',
  lead: 'A latent print is mostly water, salts, amino acids, and oils. The right method depends on which of those survives on the surface in front of you.',
  controls: [
    choice('surface', 'Surface', surfaces, 0),
    choice(
      'method',
      'Development method',
      methods.map(([name]) => name),
      0,
    ),
  ],
  run: (v) => {
    const score = suitability[v.surface][v.method],
      best = methods.filter((_, i) => suitability[v.surface][i] === 2).map(([name]) => name);
    return {
      o: { score },
      metrics: [
        {
          label: 'Suitability on this surface',
          value: ['Poor choice', 'Usable, but not the first choice', 'Preferred method'][score],
        },
        { label: 'How this method works', value: `It ${methods[v.method][1]}` },
        { label: 'Preferred for this surface', value: best.join('; ') },
        {
          label: 'Surface type',
          value:
            v.surface === 1 || v.surface === 4
              ? 'Porous — residue soaks in'
              : v.surface === 3
                ? 'Adhesive'
                : 'Non-porous — residue sits on top',
        },
      ],
      bars: {
        title: `Suitability of each method on ${surfaces[v.surface].toLowerCase()}`,
        max: 2,
        items: methods.map(([name], i) => ({
          label: name,
          value: suitability[v.surface][i] + 0.05,
          tone: i === v.method ? ('slot' as const) : ('muted' as const),
        })),
      },
    };
  },
  missions: [
    goal(
      'Choose the preferred method for a print on paper.',
      'On porous surfaces the amino acids that soaked in are the target.',
      { surface: 1, method: 2 },
      (o, v) => v.surface === 1 && o.score === 2,
    ),
    goal(
      'Choose the preferred method for a wet, non-porous surface.',
      'Water-soluble residue is gone; the oils remain.',
      { surface: 2, method: 3 },
      (o, v) => v.surface === 2 && o.score === 2,
    ),
    goal(
      'Choose the preferred method for the sticky side of tape.',
      'A stain that colours material trapped in the adhesive.',
      { surface: 3, method: 4 },
      (o, v) => v.surface === 3 && o.score === 2,
    ),
    goal(
      'Show a mismatch: ninhydrin applied to dry glass.',
      'There is nothing porous for the reagent to work in.',
      { method: 2 },
      (o, v) => v.surface === 0 && v.method === 2 && o.score === 0,
    ),
  ],
  predict: {
    q: 'Ninhydrin is preferred for latent prints on paper because it reacts with…',
    options: [
      'Amino acids that have soaked into the fibres',
      'Water on the surface',
      'The paper’s cellulose',
      'Fingerprint powder',
    ],
    correct: 0,
    why: 'Amino acids from sweat bind to cellulose and persist for years. Ninhydrin turns them purple; powders work poorly once residue has been absorbed.',
  },
  model:
    'A simplified suitability table for six common techniques. Casework follows a sequence from least to most destructive and photographs prints at each stage; many other reagents (DFO, physical developer, silver nitrate) are used in practice.',
};

const str: TopicLab = {
  id: 'for-str',
  title: 'Reading STR peaks at one locus',
  lead: 'Each allele is a number of four-base repeats, and more repeats make a longer fragment. Build single-source and mixed profiles and count the peaks.',
  controls: [
    slider('a1', 'Person 1, first allele (repeats)', 5, 20, 1, 8, ''),
    slider('a2', 'Person 1, second allele (repeats)', 5, 20, 1, 12, ''),
    slider('mix', 'Share of DNA from a second person', 0, 50, 5, 0, '%'),
    slider('b1', 'Person 2, first allele (repeats)', 5, 20, 1, 10, ''),
    slider('b2', 'Person 2, second allele (repeats)', 5, 20, 1, 14, ''),
  ],
  run: (v) => {
    const heights = new Map<number, number>(),
      add = (allele: number, amount: number) =>
        heights.set(allele, (heights.get(allele) ?? 0) + amount);
    [v.a1, v.a2].forEach((a) => add(a, 1000 * (1 - v.mix / 100)));
    if (v.mix > 0) [v.b1, v.b2].forEach((a) => add(a, (1000 * v.mix) / 100));
    const peaks = [...heights].filter(([, h]) => h >= 50).sort((a, b) => a[0] - b[0]);
    return {
      o: { peaks: peaks.length, tallest: Math.max(...peaks.map(([, h]) => h)) },
      metrics: [
        { label: 'Alleles detected', value: peaks.map(([a]) => a).join(', ') },
        { label: 'Peak heights (RFU)', value: peaks.map(([, h]) => Math.round(h)).join(', ') },
        { label: 'Number of peaks', value: peaks.length },
        {
          label: 'Reading',
          value:
            peaks.length > 2
              ? 'More than two alleles: a mixture of at least two people'
              : peaks.length === 1
                ? 'One peak: a homozygote (or alleles masked)'
                : 'Two peaks: consistent with one heterozygous person',
        },
      ],
      plot: {
        title: 'Electropherogram at one locus',
        x: [116, 184, 'Fragment size (bp) = 100 + 4 × repeats'],
        y: [0, 2200, 'Signal (RFU)'],
        curves: [
          {
            f: (x) =>
              peaks.reduce(
                (sum, [a, h]) => sum + h * Math.exp(-(((x - 100 - 4 * a) / 0.7) ** 2)),
                0,
              ),
          },
        ],
        points: peaks.map(([a, h]) => ({ x: 100 + 4 * a, y: h, label: `${a}` })),
      },
    };
  },
  missions: [
    goal(
      'Make a single-source profile that is homozygous at this locus.',
      'Give person 1 the same allele twice.',
      { a2: 8 },
      (o, v) => v.mix === 0 && o.peaks === 1,
    ),
    goal(
      'Make a two-person mixture that shows four separate peaks.',
      'Both people must be heterozygous with no shared allele.',
      { mix: 30 },
      (o) => o.peaks === 4,
    ),
    goal(
      'Make a mixture in which a shared allele leaves only three peaks.',
      'Give the second person one allele that the first already has.',
      { mix: 30, b1: 12 },
      (o, v) => v.mix > 0 && o.peaks === 3,
    ),
  ],
  predict: {
    q: 'A single locus in an evidence profile shows three peaks. The most direct conclusion is that…',
    options: [
      'DNA from more than one person is present',
      'The donor has three copies of that chromosome',
      'The sample is degraded',
      'The test failed',
    ],
    correct: 0,
    why: 'One person carries at most two alleles at an autosomal locus. A third peak indicates a mixture (after ruling out known artefacts such as stutter).',
  },
  model:
    'Fragment size = 100 + 4 × repeats; each contributor’s alleles give equal signal in proportion to their share of the DNA, with a 50 RFU reporting threshold. Stutter, peak-height imbalance, allele drop-out, and degradation — all important in real mixtures — are omitted.',
};

const genotypes = ['AA', 'AO', 'BB', 'BO', 'AB', 'OO'];
const phenotype = (pair: string) =>
  pair.includes('A') && pair.includes('B')
    ? 'AB'
    : pair.includes('A')
      ? 'A'
      : pair.includes('B')
        ? 'B'
        : 'O';
const abo: TopicLab = {
  id: 'for-abo',
  title: 'ABO inheritance: who could be the parent?',
  lead: 'Blood type cannot identify a person, but it can exclude one. Cross two genotypes and see which blood types a child could — and could not — have.',
  controls: [
    choice('p1', 'First parent’s genotype', genotypes, 0),
    choice('p2', 'Second parent’s genotype', genotypes, 5),
  ],
  run: (v) => {
    const counts: Record<string, number> = { A: 0, B: 0, AB: 0, O: 0 };
    for (const a of genotypes[v.p1])
      for (const b of genotypes[v.p2]) counts[phenotype(a + b)] += 25;
    const possible = Object.values(counts).filter((n) => n > 0).length;
    return {
      o: { a: counts.A, b: counts.B, ab: counts.AB, o: counts.O, possible },
      metrics: [
        {
          label: 'Parents’ blood types',
          value: `${phenotype(genotypes[v.p1])} × ${phenotype(genotypes[v.p2])}`,
        },
        {
          label: 'Possible blood types for a child',
          value: Object.entries(counts)
            .filter(([, n]) => n > 0)
            .map(([type, n]) => `${type} (${n}%)`)
            .join(', '),
        },
        {
          label: 'Excluded blood types',
          value:
            Object.entries(counts)
              .filter(([, n]) => n === 0)
              .map(([type]) => type)
              .join(', ') || 'None',
        },
      ],
      bars: {
        title: 'Probability of each blood type in a child (%)',
        max: 100,
        items: ['A', 'B', 'AB', 'O'].map((type) => ({
          label: `Type ${type}`,
          value: counts[type],
          tone: counts[type] > 0 ? ('slot' as const) : ('muted' as const),
        })),
      },
    };
  },
  missions: [
    goal(
      'Find parents who could have a child of any of the four blood types.',
      'One parent must be able to give A or O, the other B or O.',
      { p1: 1, p2: 3 },
      (o) => o.possible === 4,
    ),
    goal(
      'Show that a type AB parent cannot have a type O child with a type O partner.',
      'An AB parent always passes on A or B.',
      { p1: 4 },
      (o, v) => v.p1 === 4 && v.p2 === 5 && o.o === 0,
    ),
    goal(
      'Show two type A parents who could have a type O child.',
      'Both must carry a hidden O allele.',
      { p1: 1, p2: 1 },
      (o, v) => v.p1 === 1 && v.p2 === 1 && o.o === 25,
    ),
  ],
  predict: {
    q: 'A child has blood type O. Which person is excluded as that child’s biological parent?',
    options: [
      'A person with type AB',
      'A person with type A',
      'A person with type B',
      'A person with type O',
    ],
    correct: 0,
    why: 'A type O child received an O allele from each parent. A type AB person has no O allele to give. Types A and B may be AO or BO.',
  },
  model:
    'Single-gene ABO inheritance with A and B codominant and O recessive, each allele transmitted with probability one half. Rare variants (such as cis-AB and the Bombay phenotype) break these rules. ABO typing is class evidence used for exclusion.',
};

const fragments = [1.474, 1.518, 1.523, 1.62];
const refraction: TopicLab = {
  id: 'for-refraction',
  title: 'Matching a glass fragment’s refractive index',
  lead: 'Immerse a glass chip in liquids of known refractive index. The closer the match, the fainter its outline — and at a perfect match it vanishes.',
  controls: [
    choice('frag', 'Glass fragment', ['Fragment A', 'Fragment B', 'Fragment C', 'Fragment D'], 0),
    slider('liquid', 'Refractive index of the immersion liquid', 1.4, 1.7, 0.001, 1.5, ''),
  ],
  run: (v) => {
    const glass = fragments[v.frag],
      diff = glass - v.liquid,
      relief = Math.abs(diff),
      matched = relief < 0.0015 ? 1 : 0;
    return {
      o: { diff, relief, matched },
      metrics: [
        {
          label: 'Visibility of the fragment’s edge',
          value: matched
            ? 'Vanished — indices match'
            : relief < 0.01
              ? 'Very faint'
              : relief < 0.05
                ? 'Clearly visible'
                : 'High relief, dark outline',
        },
        {
          label: 'Becke line, as the focus is raised',
          value: matched
            ? 'No Becke line'
            : diff > 0
              ? 'Moves into the glass (glass has the higher index)'
              : 'Moves into the liquid (liquid has the higher index)',
        },
        { label: 'Liquid index', value: v.liquid.toFixed(3) },
      ],
      sceneLabel: `Glass fragment in liquid of index ${v.liquid.toFixed(3)}; ${matched ? 'outline has vanished' : 'outline visible'}`,
      scene: [
        rect(120, 40, 400, 240, 'cool', true, 0.12, 8),
        path(
          'M260 110L360 90L400 170L340 240L250 210Z',
          'ink',
          false,
          1 + Math.min(6, relief * 60),
          Math.min(1, 0.04 + relief * 14),
        ),
        ...(matched
          ? []
          : [
              path(
                diff > 0
                  ? 'M272 122L352 106L384 170L336 226L264 202Z'
                  : 'M246 100L368 76L416 172L346 256L236 222Z',
                'gold',
                false,
                2,
                0.9,
              ),
            ]),
        text(
          320,
          304,
          matched
            ? 'Match point: the fragment is invisible'
            : 'Gold line: the Becke line, on the higher-index side',
          'middle',
          'muted',
          11,
        ),
      ],
    };
  },
  missions: [
    goal(
      'Find the liquid index at which Fragment A vanishes.',
      'Use the Becke line to decide whether to raise or lower the liquid’s index.',
      { liquid: 1.474 },
      (o, v) => v.frag === 0 && o.matched === 1,
    ),
    goal(
      'Find the match point for Fragment D.',
      'It has a much higher index than ordinary window glass.',
      { frag: 3, liquid: 1.62 },
      (o, v) => v.frag === 3 && o.matched === 1,
    ),
    goal(
      'Fragments B and C differ only slightly. Find a liquid in which the Becke line moves into C but would move out of B.',
      'The liquid’s index must lie between the two glasses.',
      { frag: 2, liquid: 1.52 },
      (o, v) => v.frag === 2 && v.liquid > 1.518 && v.liquid < 1.523,
    ),
  ],
  predict: {
    q: 'A glass fragment becomes invisible when immersed in a liquid. This shows that…',
    options: [
      'The glass and the liquid have the same refractive index',
      'The glass has dissolved',
      'The liquid is denser than the glass',
      'The glass is tempered',
    ],
    correct: 0,
    why: 'Light bends and reflects at a boundary only where the refractive index changes. With matched indices there is no optical boundary to see.',
  },
  model:
    'Relief is taken as proportional to the difference in refractive index, with a match within 0.0015. Laboratories vary the liquid’s index with temperature and measure to the fourth decimal place. Matching indices shows two fragments are consistent, not that they share a source.',
};

function soilClass(sand: number, clay: number) {
  const silt = 100 - sand - clay;
  if (silt < 0) return 'Not possible — fractions exceed 100%';
  if (clay >= 40) return 'Clay';
  if (sand >= 85) return 'Sand';
  if (silt >= 80) return 'Silt';
  if (clay >= 27)
    return sand >= 45 ? 'Sandy clay loam' : sand < 20 ? 'Silty clay loam' : 'Clay loam';
  if (silt >= 50) return 'Silt loam';
  if (sand >= 70) return 'Loamy sand';
  if (sand >= 52) return 'Sandy loam';
  return 'Loam';
}
const soil: TopicLab = {
  id: 'for-soil',
  title: 'Soil texture from a settling jar',
  lead: 'Shake soil in water and it settles in layers: sand in a minute, silt in hours, clay in days. The proportions give a texture class that can be compared between samples.',
  controls: [
    slider('sand', 'Sand layer', 0, 100, 5, 60, '%'),
    slider('clay', 'Clay layer', 0, 100, 5, 10, '%'),
  ],
  run: (v) => {
    const silt = Math.max(0, 100 - v.sand - v.clay),
      name = soilClass(v.sand, v.clay),
      total = v.sand + silt + v.clay,
      h = (part: number) => (part / total) * 180;
    return {
      o: {
        silt,
        valid: v.sand + v.clay <= 100 ? 1 : 0,
        code: ['Clay', 'Silt loam', 'Loam', 'Sandy loam', 'Sand'].indexOf(name),
      },
      metrics: [
        { label: 'Silt (by difference)', value: silt, unit: '%' },
        { label: 'Texture class', value: name },
        {
          label: 'Feel',
          value:
            v.clay >= 40
              ? 'Sticky and plastic when wet'
              : v.sand >= 70
                ? 'Gritty; will not hold a shape'
                : silt >= 50
                  ? 'Smooth and floury'
                  : 'A balance of grit, smoothness, and stickiness',
        },
      ],
      sceneLabel: `Settling jar with ${v.sand} percent sand, ${silt} percent silt, and ${v.clay} percent clay: ${name}`,
      scene: [
        path('M250 40V290H390V40', 'ink', false, 3),
        rect(253, 290 - h(v.sand), 134, h(v.sand), 'gold', true, 0.7),
        rect(253, 290 - h(v.sand) - h(silt), 134, h(silt), 'warm', true, 0.5),
        rect(253, 290 - h(v.sand) - h(silt) - h(v.clay), 134, h(v.clay), 'muted', true, 0.6),
        rect(253, 60, 134, 290 - 180 - 60, 'cool', true, 0.2),
        text(400, 290 - h(v.sand) / 2, `sand ${v.sand}%`),
        text(400, 290 - h(v.sand) - h(silt) / 2, `silt ${silt}%`),
        text(400, 290 - h(v.sand) - h(silt) - h(v.clay) / 2, `clay ${v.clay}%`),
        text(320, 320, name, 'middle', 'slot', 15),
      ],
    };
  },
  missions: [
    goal(
      'Set the sand and clay fractions of a loam.',
      'Roughly 40% sand, 40% silt, and 20% clay.',
      { sand: 40, clay: 20 },
      (o) => o.code === 2,
    ),
    goal(
      'Set the fractions of a soil classed as clay.',
      'Clay must be at least 40% of the total.',
      { sand: 20, clay: 50 },
      (o) => o.code === 0,
    ),
    goal(
      'Set the fractions of a silt loam.',
      'Silt, found by difference, must be at least half.',
      { sand: 20, clay: 10 },
      (o) => o.code === 1,
    ),
  ],
  predict: {
    q: 'After a jar of soil and water is shaken and left to stand, which layer forms at the bottom first?',
    options: ['Sand', 'Clay', 'Silt', 'Organic matter'],
    correct: 0,
    why: 'Settling speed rises steeply with particle size. Sand grains fall within about a minute; clay can stay suspended for days.',
  },
  model:
    'A simplified version of the USDA texture triangle using percentages by volume from a settling jar. Laboratory texture uses mass fractions from sieving and hydrometer methods. Texture is class evidence; forensic soil comparison also uses colour, mineralogy, and biological content.',
};

const tracks: TopicLab = {
  id: 'for-tracks',
  title: 'What footprints say about height and speed',
  lead: 'A line of shoeprints records more than a tread pattern. Foot length scales with stature, and stride length relative to leg length separates walking from running.',
  controls: [
    slider('foot', 'Footprint length', 20, 34, 0.5, 26, 'cm'),
    slider('stride', 'Stride length (same foot to same foot)', 0.8, 4, 0.1, 1.4, 'm'),
  ],
  run: (v) => {
    const height = v.foot / 0.15,
      hip = (4 * v.foot) / 100,
      relative = v.stride / hip,
      gait = relative < 2 ? 0 : relative < 2.9 ? 1 : 2,
      speed = 0.25 * Math.sqrt(9.81) * v.stride ** 1.67 * hip ** -1.17;
    return {
      o: { height, relative, gait, speed },
      metrics: [
        { label: 'Estimated stature', value: height, unit: 'cm' },
        { label: 'Stride ÷ hip height', value: relative },
        { label: 'Gait', value: ['Walking', 'Jogging', 'Running'][gait] },
        { label: 'Estimated speed', value: speed, unit: 'm/s' },
      ],
      sceneLabel: `Trackway with ${v.foot} centimetre prints and a ${v.stride} metre stride: ${['walking', 'jogging', 'running'][gait]}`,
      scene: [
        ...Array.from({ length: 6 }, (_, i) => {
          const x = 70 + i * Math.min(100, v.stride * 28);
          return x < 600 ? [ellipse(x, i % 2 ? 150 : 200, v.foot * 0.9, 9, 'slot', true, 0.6)] : [];
        }).flat(),
        line(60, 250, 600, 250, 'muted', 1),
        text(320, 290, `stride ${v.stride} m · prints ${v.foot} cm`, 'middle', 'muted'),
      ],
    };
  },
  missions: [
    goal(
      'Find the footprint length that suggests a person about 180 cm tall.',
      'Foot length is roughly 15% of stature.',
      { foot: 27 },
      (o) => near(o.height, 180, 0.5),
    ),
    goal(
      'For the starting print length, find a stride that indicates jogging.',
      'A stride between 2 and 2.9 times hip height.',
      { stride: 2.5 },
      (o, v) => v.foot === 26 && o.gait === 1,
    ),
    goal(
      'Find a stride that indicates running.',
      'More than about 2.9 times hip height.',
      { stride: 3.2 },
      (o) => o.gait === 2,
    ),
  ],
  predict: {
    q: 'Two trails are left by people of the same height. Trail X has a much longer stride than trail Y. The person who made trail X was probably…',
    options: ['Moving faster', 'Carrying a heavier load', 'Shorter', 'Walking backwards'],
    correct: 0,
    why: 'For a given leg length, stride length increases with speed. Comparing stride with hip height removes the effect of body size.',
  },
  model:
    'Stature ≈ foot length ÷ 0.15; hip height ≈ 4 × foot length; speed from Alexander’s empirical relation v ≈ 0.25 g^0.5 · stride^1.67 · hip^−1.17. Shoe length exceeds foot length, and these ratios vary between people, so results are rough estimates for narrowing possibilities.',
};

const uncertainty: TopicLab = {
  id: 'for-uncertainty',
  title: 'Propagating uncertainty into a density',
  lead: 'A density is only as good as the mass and volume behind it. See which measurement limits the result before deciding what a comparison can show.',
  controls: [
    slider('mass', 'Measured mass', 5, 100, 0.5, 25, 'g'),
    slider('dm', 'Uncertainty in mass', 0.01, 0.5, 0.01, 0.01, 'g'),
    slider('vol', 'Measured volume', 5, 100, 0.5, 10, 'mL'),
    slider('dv', 'Uncertainty in volume', 0.1, 2, 0.1, 0.5, 'mL'),
  ],
  run: (v) => {
    const density = v.mass / v.vol,
      relM = (v.dm / v.mass) * 100,
      relV = (v.dv / v.vol) * 100,
      rel = Math.sqrt(relM ** 2 + relV ** 2);
    return {
      o: { density, relM, relV, rel },
      metrics: [
        { label: 'Density', value: density, unit: 'g/mL' },
        { label: 'Combined relative uncertainty', value: rel, unit: '%' },
        {
          label: 'Reported as',
          value: `${density.toFixed(2)} ± ${((density * rel) / 100).toFixed(2)} g/mL`,
        },
        {
          label: 'Limiting measurement',
          value: relV > relM ? 'Volume' : relM > relV ? 'Mass' : 'Both equally',
        },
      ],
      bars: {
        title: 'Relative uncertainty (%)',
        items: [
          { label: 'From mass', value: relM, tone: 'cool' },
          { label: 'From volume', value: relV, tone: 'warm' },
          { label: 'Combined', value: rel, tone: 'slot' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Bring the combined relative uncertainty down to 1% or less.',
      'Attack the limiting measurement: a larger sample read on finer glassware.',
      { vol: 20, dv: 0.1 },
      (o) => o.rel <= 1,
    ),
    goal(
      'Create a measurement in which mass, not volume, limits the result.',
      'A small sample weighed on a coarse balance.',
      { mass: 5, dm: 0.5 },
      (o) => o.relM > o.relV,
    ),
    goal(
      'Double the sample to 50 g and 20 mL with the same instruments and show the relative uncertainty halves.',
      'The absolute uncertainties stay the same while the measured values double.',
      { mass: 50, vol: 20 },
      (o, v) => v.mass === 50 && v.vol === 20 && near(v.dv, 0.5, 1e-9) && near(o.rel, 2.5, 0.05),
    ),
  ],
  predict: {
    q: 'A density is found from a mass known to 0.1% and a volume known to 5%. The density’s relative uncertainty is about…',
    options: ['5%', '0.1%', '5.1% exactly, by simple addition', '0.5%'],
    correct: 0,
    why: 'Independent relative uncertainties add in quadrature: √(0.1² + 5²) ≈ 5.0%. The larger term dominates, so improving the balance would not help.',
  },
  model:
    'For a quotient of independent measurements, relative uncertainties combine as the square root of the sum of squares. Uncertainties are treated as standard uncertainties; systematic errors such as an uncalibrated balance are not reduced by this calculation.',
};

const suspects = ['Suspect 1', 'Suspect 2', 'Suspect 3', 'Suspect 4'];
const evidence: [string, string, boolean[]][] = [
  ['fiber', 'Blue wool fibres', [true, true, true, false]],
  ['blood', 'Type A blood', [true, true, false, true]],
  ['shoe', 'Size 10 shoeprint', [true, false, true, true]],
  ['hair', 'Brown head hair', [true, true, true, false]],
  ['dna', 'STR profile from the bloodstain', [true, false, false, false]],
];
const matrix: TopicLab = {
  id: 'for-matrix',
  title: 'Building an evidence matrix',
  lead: 'Four suspects, five kinds of evidence from one scene. Add evidence types one at a time and watch who remains — exclusions do the work, not a count of “matches”.',
  controls: evidence.map(([key, label]) => toggle(key, `Consider: ${label.toLowerCase()}`)),
  run: (v) => {
    const used = evidence.filter(([key]) => v[key]),
      remaining = suspects.filter((_, s) => used.every(([, , fits]) => fits[s]));
    return {
      o: { count: remaining.length, tests: used.length, dna: v.dna },
      metrics: [
        {
          label: 'Evidence considered',
          value: used.length ? used.map(([, label]) => label).join('; ') : 'None yet',
        },
        { label: 'Suspects not excluded', value: remaining.join(', ') || 'None' },
        {
          label: 'Strength of the conclusion',
          value:
            used.length === 0
              ? 'No evidence applied'
              : v.dna
                ? 'Includes individualising evidence'
                : 'Class evidence only: narrows the field but cannot identify',
        },
      ],
      sceneLabel: `Evidence matrix; suspects not excluded: ${remaining.join(', ') || 'none'}`,
      scene: [
        ...suspects.map((name, s) =>
          text(
            270 + s * 88,
            44,
            name.replace('Suspect ', 'S'),
            'middle',
            remaining.includes(name) ? 'slot' : 'muted',
            14,
          ),
        ),
        ...evidence.flatMap(([key, label, fits], row): Shape[] => [
          text(40, 84 + row * 46, label, 'start', v[key] ? 'ink' : 'muted', 12),
          ...fits.map((ok, s) =>
            rect(
              240 + s * 88,
              64 + row * 46,
              60,
              30,
              ok ? 'green' : 'warm',
              !!v[key],
              v[key] ? 0.55 : 1,
              5,
            ),
          ),
          ...fits.map((ok, s) =>
            text(
              270 + s * 88,
              84 + row * 46,
              ok ? 'fits' : 'excluded',
              'middle',
              v[key] ? 'ink' : 'muted',
              11,
            ),
          ),
        ]),
        text(
          320,
          320,
          'Filled rows are the evidence you have chosen to apply',
          'middle',
          'muted',
          11,
        ),
      ],
    };
  },
  missions: [
    goal(
      'Apply only the fibre and hair evidence and see how many suspects remain.',
      'Class evidence shared by several people excludes few of them.',
      { fiber: 1, hair: 1 },
      (o, v) => v.fiber === 1 && v.hair === 1 && o.tests === 2 && o.count === 3,
    ),
    goal(
      'Reduce the field to one suspect without using DNA.',
      'Combine class evidence that excludes different people.',
      { fiber: 1, blood: 1, shoe: 1 },
      (o) => o.dna === 0 && o.count === 1,
    ),
    goal(
      'Reduce the field to one suspect using a single type of evidence.',
      'Only one kind here is individualising.',
      { dna: 1 },
      (o) => o.tests === 1 && o.count === 1,
    ),
  ],
  predict: {
    q: 'Three kinds of class evidence are all consistent with a suspect. The most defensible statement is that the suspect…',
    options: [
      'Cannot be excluded, and the combination narrows the pool of possible sources',
      'Has been identified as the source',
      'Is guilty',
      'Is excluded',
    ],
    correct: 0,
    why: 'Class evidence places a person in a group. Several independent class characteristics shrink that group, but identification needs individualising evidence.',
  },
  model:
    'A fixed synthetic case. A suspect is excluded as soon as any applied evidence is inconsistent. Real evidence carries error rates and uncertainty, a “fit” is not proof of contact, and how evidence came to be at a scene is a separate question from whose it is.',
};

export const forensicsExtras: EventExtras = {
  eventId: 'forensics',
  labs: [
    search,
    controlsLab,
    powder,
    flame,
    plasticId,
    fiber,
    hair,
    tlc,
    isotope,
    printPattern,
    develop,
    str,
    abo,
    refraction,
    soil,
    tracks,
    uncertainty,
    matrix,
  ],
  lessons: {
    'for-u1-l1': {
      labs: ['for-search'],
      sort: sort(
        'Class or individual evidence?',
        ['Class evidence', 'Individual evidence'],
        [
          ['Blood type', 0],
          ['A fingerprint with sufficient minutiae', 1],
          ['Fibre colour and type', 0],
          ['A nuclear DNA profile', 1],
          ['Shoe size and tread design', 0],
          ['A torn edge that physically fits another piece', 1],
        ],
      ),
      checks: [
        check(
          1,
          'Locard’s exchange principle states that…',
          [
            'Contact between two objects results in a transfer of material',
            'Every criminal confesses eventually',
            'Evidence must be collected within one hour',
            'Only DNA can link a person to a scene',
          ],
          'Trace evidence exists because contact leaves and removes material. Finding a transfer still leaves open when and how it happened.',
        ),
      ],
    },
    'for-u1-l2': {
      labs: ['for-controls'],
      sort: sort(
        'Good laboratory practice, or a violation?',
        ['Good practice', 'Violation'],
        [
          ['Labelling every container before use', 0],
          ['Tasting an unknown powder', 1],
          ['Running a blank with each test', 0],
          ['Returning unused reagent to the stock bottle', 1],
          ['Recording observations as they are made', 0],
          ['Using one spatula for all samples', 1],
        ],
      ),
      checks: [
        check(
          3,
          'Using a fresh, clean spatula for every sample mainly prevents…',
          [
            'Cross-contamination between samples',
            'The spatula from rusting',
            'Reagents from expiring',
            'Fingerprints on the bench',
          ],
          'Carry-over of a trace of one powder into another can produce a false positive, and it destroys confidence in every later result.',
        ),
      ],
    },
    'for-u2-l1': {
      labs: ['for-powder'],
      sort: sort(
        'Which test detects it?',
        ['Dilute HCl', 'Iodine solution', 'pH paper'],
        [
          ['A carbonate (fizzing)', 0],
          ['Starch (blue-black colour)', 1],
          ['An acidic or basic solution', 2],
          ['Sodium bicarbonate, as bubbles of CO₂', 0],
          ['Cornstarch', 1],
          ['Boric acid versus sodium carbonate', 2],
        ],
      ),
      checks: [
        check(
          0,
          'In a powder flowchart, why is water solubility usually tested first?',
          [
            'It splits the powders into two groups and prepares a solution for later tests',
            'It is the most dangerous test',
            'It identifies every powder by itself',
            'It uses the most sample',
          ],
          'An early test should divide the candidates roughly in half and be non-destructive. The solution or slurry can then be used for pH and other tests.',
        ),
      ],
    },
    'for-u2-l2': {
      labs: ['for-flame'],
      sort: sort(
        'Positive result of which test?',
        ['Flame test', 'Iodine test', 'Benedict’s test'],
        [
          ['A lilac flame', 0],
          ['A blue-black colour', 1],
          ['A brick-red precipitate on heating', 2],
          ['A persistent yellow flame', 0],
          ['Indicates starch', 1],
          ['Indicates a reducing sugar such as glucose', 2],
        ],
      ),
      checks: [
        check(
          3,
          'Sucrose gives a negative Benedict’s test because it…',
          [
            'Is not a reducing sugar',
            'Is not a carbohydrate',
            'Does not dissolve in water',
            'Contains starch',
          ],
          'The glucose and fructose units in sucrose are joined through the groups that would otherwise reduce copper(II). Glucose alone gives a positive test.',
        ),
      ],
    },
    'for-u3-l1': {
      labs: ['for-plastic'],
      phet: [
        phet(
          'buoyancy-basics',
          'Buoyancy: Basics',
          'Whether a plastic chip floats depends on its density compared with the liquid’s — not on its size or shape.',
          'Compare blocks of the same material but different sizes. Does size change whether they float?',
          'Change the liquid’s density until a sinking block just begins to float. What does that tell you about the block’s density?',
          'Explain why a series of liquids of increasing density can bracket an unknown plastic.',
        ),
      ],
      sort: sort(
        'Match the plastic to its resin code',
        ['Code 1 · PETE', 'Code 2 · HDPE', 'Code 3 · PVC', 'Code 6 · PS'],
        [
          ['Clear drink bottles', 0],
          ['Milk jugs and detergent bottles', 1],
          ['Plumbing pipe', 2],
          ['Foam cups and packing', 3],
          ['Sinks in water; no chlorine', 0],
          ['Gives a green Beilstein flame', 2],
        ],
      ),
      checks: [
        check(
          0,
          'A polymer is best described as…',
          [
            'A large molecule built from many repeating units',
            'A mixture of small molecules',
            'A single atom',
            'A type of metal alloy',
          ],
          'Monomers join end to end into long chains. Chain length, branching, and side groups set the plastic’s density and behaviour.',
        ),
      ],
    },
    'for-u3-l2': {
      labs: ['for-plastic'],
      sort: sort(
        'Floats or sinks in water?',
        ['Floats (density below 1.00 g/mL)', 'Sinks (density above 1.00 g/mL)'],
        [
          ['Polypropylene', 0],
          ['PETE', 1],
          ['HDPE', 0],
          ['PVC', 1],
          ['LDPE', 0],
          ['Solid polystyrene', 1],
        ],
      ),
      checks: [
        check(
          2,
          'A positive Beilstein test (green flame from a hot copper wire) indicates that a plastic contains…',
          ['A halogen such as chlorine', 'Carbon', 'Oxygen', 'Nitrogen'],
          'Volatile copper halides colour the flame green. Among common plastics this points to PVC.',
        ),
      ],
    },
    'for-u4-l1': {
      labs: ['for-fiber'],
      sort: sort(
        'Natural or manufactured fibre?',
        ['Natural — plant', 'Natural — animal', 'Synthetic'],
        [
          ['Cotton', 0],
          ['Wool', 1],
          ['Nylon', 2],
          ['Linen', 0],
          ['Silk', 1],
          ['Polyester', 2],
        ],
      ),
      checks: [
        check(
          4,
          'Matching fibres on a suspect and a victim show that…',
          [
            'The two could have been in contact; other sources are possible',
            'The suspect committed the crime',
            'The fibres came from one unique garment',
            'No other person could be involved',
          ],
          'Mass-produced fibres are class evidence. Their significance depends on how common they are and whether the transfer can be otherwise explained.',
        ),
      ],
    },
    'for-u4-l2': {
      labs: ['for-hair'],
      sort: sort(
        'Which part of the hair?',
        ['Cuticle', 'Cortex', 'Medulla'],
        [
          ['Overlapping outer scales', 0],
          ['Contains the pigment granules', 1],
          ['Central canal, sometimes absent', 2],
          ['Pattern used to distinguish species', 0],
          ['Makes up most of the shaft', 1],
          ['Compared with shaft width to give an index', 2],
        ],
      ),
      checks: [
        check(
          3,
          'Nuclear DNA can be obtained from a hair only if…',
          [
            'The root with follicular tissue is attached',
            'The hair is at least 10 cm long',
            'The hair has been dyed',
            'The medulla is continuous',
          ],
          'The shaft itself is dead keratin and contains mainly mitochondrial DNA. Cells clinging to a pulled root carry nuclear DNA.',
        ),
      ],
    },
    'for-u5-l1': {
      labs: ['for-tlc'],
      sort: sort(
        'Stationary or mobile phase?',
        ['Stationary phase', 'Mobile phase'],
        [
          ['The paper in paper chromatography', 0],
          ['The solvent climbing the strip', 1],
          ['Silica gel on a TLC plate', 0],
          ['A water–alcohol mixture in the beaker', 1],
          ['What the ink is spotted onto', 0],
          ['What carries the dyes upward', 1],
        ],
      ),
      checks: [
        check(
          1,
          'A spot travels 3.0 cm while the solvent front travels 8.0 cm from the baseline. Its Rf is…',
          ['0.38', '2.67', '5.0', '0.27'],
          'Rf = distance moved by the spot ÷ distance moved by the solvent front = 3.0 ÷ 8.0 ≈ 0.38. It can never exceed 1.',
        ),
      ],
    },
    'for-u5-l2': {
      labs: ['for-isotope'],
      sort: sort(
        'Which instrument gives this information?',
        ['Mass spectrometry', 'Infrared spectroscopy', 'UV–visible spectroscopy'],
        [
          ['Molecular mass and fragment masses', 0],
          ['Which functional groups are present', 1],
          ['Concentration of a coloured compound', 2],
          ['Isotope patterns for chlorine and bromine', 0],
          ['A strong absorption near 1700 cm⁻¹ for C=O', 1],
          ['Absorbance following the Beer–Lambert law', 2],
        ],
      ),
      checks: [
        check(
          0,
          'On a mass spectrum, the horizontal axis shows…',
          ['Mass-to-charge ratio (m/z)', 'Wavelength', 'Time', 'Concentration'],
          'Ions are separated by m/z. The tallest signal is the base peak; the molecular ion gives the molecular mass when it survives.',
        ),
      ],
    },
    'for-u6-l1': {
      labs: ['for-print'],
      sort: sort(
        'Pattern family or minutia?',
        ['Pattern family (class)', 'Minutia (individualising detail)'],
        [
          ['Loop', 0],
          ['Bifurcation', 1],
          ['Whorl', 0],
          ['Ridge ending', 1],
          ['Arch', 0],
          ['Enclosure (island)', 1],
        ],
      ),
      checks: [
        check(
          2,
          'Two prints share the same pattern type. To say they came from the same finger, an examiner must compare…',
          [
            'The type, position, and relationship of their minutiae',
            'Only the pattern type',
            'The colour of the ink',
            'The size of the finger',
          ],
          'Pattern type only narrows the field. Agreement in the arrangement of ridge details, with no unexplained differences, supports an identification.',
        ),
      ],
    },
    'for-u6-l2': {
      labs: ['for-develop'],
      sort: sort(
        'What does the reagent react with?',
        ['Amino acids', 'Oils and fats', 'Moisture and general residue'],
        [
          ['Ninhydrin', 0],
          ['Iodine fumes', 1],
          ['Cyanoacrylate fumes', 2],
          ['DFO', 0],
          ['Small-particle reagent', 1],
          ['Fingerprint powder', 2],
        ],
      ),
      checks: [
        check(
          0,
          'Why are latent-print methods applied from least destructive to most destructive?',
          [
            'An early method must not ruin the chance of using a later one',
            'Destructive methods are cheaper',
            'It makes the print larger',
            'It is required only for paper',
          ],
          'Visual examination and photography come first; chemical treatments that alter the residue are reserved for later in the sequence.',
        ),
      ],
    },
    'for-u6-l3': {
      labs: ['for-develop'],
      sort: sort(
        'Which skin layer or structure?',
        ['Epidermis', 'Dermis', 'Sweat gland'],
        [
          ['Outer layer that carries the friction ridges', 0],
          ['Contains the dermal papillae that template the ridges', 1],
          ['Opens at pores along the ridge crests', 2],
          ['Source of most of a latent print’s water and salts', 2],
          ['Keratinised cells shed from the surface', 0],
          ['Damage here can leave a permanent scar in the print', 1],
        ],
      ),
      checks: [
        check(
          1,
          'Friction ridges on fingers and palms carry which type of gland?',
          [
            'Eccrine sweat glands only',
            'Sebaceous glands only',
            'Both sebaceous and apocrine glands',
            'No glands at all',
          ],
          'Palmar skin has no hair follicles or sebaceous glands. Oils in a fingerprint are picked up by touching the face or hair.',
        ),
      ],
    },
    'for-u7-l1': {
      labs: ['for-str'],
      sort: sort(
        'Nuclear or mitochondrial DNA?',
        ['Nuclear DNA', 'Mitochondrial DNA'],
        [
          ['Inherited from both parents', 0],
          ['Inherited through the maternal line', 1],
          ['Used for STR profiling', 0],
          ['Present in hundreds of copies per cell', 1],
          ['Can individualise a person', 0],
          ['Useful for old bones and hair shafts', 1],
        ],
      ),
      checks: [
        check(
          1,
          'At an STR locus, people differ in…',
          [
            'The number of times a short sequence is repeated',
            'The order of their chromosomes',
            'The colour of the DNA',
            'Whether they have the locus at all',
          ],
          'Alleles are named by repeat count. Because each locus has many alleles, combining a dozen or more loci gives enormous discriminating power.',
        ),
      ],
    },
    'for-u7-l2': {
      labs: ['for-abo'],
      sort: sort(
        'What does the bloodstain shape suggest?',
        ['Passive drop', 'Impact spatter', 'Transfer'],
        [
          ['A round stain beneath a stationary source', 0],
          ['Many small elongated stains radiating from one area', 1],
          ['A smear or a recognisable pattern such as a handprint', 2],
          ['A trail of drops with scalloped edges', 0],
          ['Fine mist-like staining', 1],
          ['A swipe across a wall', 2],
        ],
      ),
      checks: [
        check(
          2,
          'A bloodstain is 4.0 mm wide and 8.0 mm long. Its angle of impact is…',
          ['30°', '60°', '45°', '90°'],
          'sin(angle) = width ÷ length = 0.50, so the angle is 30°. A circular stain (ratio 1) corresponds to 90°.',
        ),
      ],
    },
    'for-u8-l1': {
      labs: ['for-refraction'],
      phet: [
        phet(
          'projectile-motion',
          'Projectile Motion',
          'A bullet is a projectile: its path depends on launch angle, speed, and gravity. Explore how those determine where it lands.',
          'Fire at 30°, 45°, and 60° with the same speed. Which two angles give the same range, and why does that complicate working backward?',
          'Hold the angle fixed and double the launch speed. By what factor does the range change?',
          'Turn on air resistance. How does the trajectory’s shape differ from the ideal parabola?',
        ),
      ],
      sort: sort(
        'Radial or concentric fracture?',
        ['Radial fractures', 'Concentric fractures'],
        [
          ['Run outward from the point of impact like spokes', 0],
          ['Form rings around the point of impact', 1],
          ['Form first, on the side opposite the force', 0],
          ['Form second, on the same side as the force', 1],
          ['Terminate at earlier cracks, revealing the order of shots', 0],
          ['Connect the radial cracks', 1],
        ],
      ),
      checks: [
        check(
          0,
          'A projectile passes through a window. The larger, cratered opening is found on the…',
          ['Exit side', 'Entry side', 'Side facing north', 'Both sides equally'],
          'Glass is pushed out as a cone in the direction of travel, so the hole is wider where the projectile left.',
        ),
      ],
    },
    'for-u8-l2': {
      labs: ['for-soil'],
      sort: sort(
        'Which insect stage or group arrives when?',
        ['Within hours', 'Days to weeks', 'Dry remains'],
        [
          ['Blow flies laying eggs', 0],
          ['Third-instar maggots feeding', 1],
          ['Dermestid (hide) beetles', 2],
          ['Flesh flies depositing larvae', 0],
          ['Pupae in nearby soil', 1],
          ['Clothes moths on hair and skin', 2],
        ],
      ),
      checks: [
        check(
          1,
          'Insect development on remains is faster when…',
          [
            'The temperature is higher, within the species’ tolerance',
            'The temperature is lower',
            'It is dark',
            'The remains are larger',
          ],
          'Insects are cold-blooded, so growth rate tracks temperature. This is why accumulated degree-hours, not days alone, are used.',
        ),
      ],
    },
    'for-u8-l3': {
      labs: ['for-tracks'],
      sort: sort(
        'Which kind of impression evidence?',
        ['Patent (visible)', 'Latent (hidden)', 'Plastic (three-dimensional)'],
        [
          ['A muddy shoeprint on a tile floor', 0],
          ['A dust print lifted with an electrostatic device', 1],
          ['A tyre track in soft soil', 2],
          ['A bloody footprint', 0],
          ['A shoeprint in snow', 2],
          ['A print revealed only by oblique lighting', 1],
        ],
      ),
      checks: [
        check(
          0,
          'Pollen recovered from a suspect’s clothing is useful mainly because…',
          [
            'Plant communities differ between places, so a pollen mix can point to a type of location',
            'Every pollen grain is unique to one plant',
            'Pollen decays within hours',
            'Pollen carries human DNA',
          ],
          'An assemblage of pollen types reflects the surrounding vegetation. It supports or weakens a link to a kind of place rather than proving a single spot.',
        ),
      ],
    },
    'for-u9-l1': {
      labs: ['for-uncertainty'],
      sort: sort(
        'Random scatter or a consistent bias?',
        ['Random error', 'Systematic error'],
        [
          ['Slightly different readings each time a ruler is read', 0],
          ['A balance that always reads 0.2 g high', 1],
          ['Variation in where the solvent front is marked', 0],
          ['A thermometer calibrated incorrectly', 1],
          ['Fluctuating air currents around a balance', 0],
          ['Always measuring spots from their top edge instead of the centre', 1],
        ],
      ),
      checks: [
        check(
          1,
          'A measured density is 2.4 g/mL; the accepted value is 2.5 g/mL. The percent error is…',
          ['4%', '0.1%', '40%', '96%'],
          '|2.4 − 2.5| ÷ 2.5 × 100 = 4%. Percent error compares the difference with the accepted value.',
        ),
      ],
    },
    'for-u9-l2': {
      labs: ['for-matrix'],
      sort: sort(
        'Supported by the evidence, or an overstatement?',
        ['Supported', 'Overstatement'],
        [
          ['The powder is consistent with sodium bicarbonate', 0],
          ['The suspect is guilty', 1],
          ['Suspect B is excluded by blood type', 0],
          ['The fibre came from this exact jacket', 1],
          ['The questioned ink is consistent with Pen 2', 0],
          ['No one else could have left the print', 1],
        ],
      ),
      checks: [
        check(
          1,
          'Two pieces of evidence point to different suspects. The best response in the written analysis is to…',
          [
            'State the conflict, weigh the type and strength of each item, and explain the conclusion',
            'Ignore the weaker item',
            'Choose the suspect with more matching items',
            'Leave the conclusion blank',
          ],
          'Scorers reward reasoning. An exclusion by individual evidence outweighs agreement in class evidence, and saying so shows understanding.',
        ),
      ],
    },
  },
};
