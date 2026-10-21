import { check, phet, sort, type EventExtras } from '../lesson-extras.ts';
import {
  choice,
  ellipse,
  goal,
  line,
  near,
  rect,
  slider,
  text,
  toggle,
  type Shape,
  type TopicLab,
} from '../topic-lab-kit.ts';

// Teaching summary of the listed solids: water solubility, HCl result, iodine result.
const solids: [name: string, water: string, acid: string, iodine: string][] = [
  ['Sodium acetate', 'dissolves', 'vinegar odor', 'brown'],
  ['Yeast', 'disperses', 'no reaction', 'brown'],
  ['Vitamin C', 'dissolves', 'no reaction', 'colorless'],
  ['Calcium carbonate', 'insoluble', 'fizzes', 'brown'],
  ['Table salt', 'dissolves', 'no reaction', 'brown'],
  ['Sugar', 'dissolves', 'no reaction', 'brown'],
  ['Flour', 'insoluble', 'no reaction', 'blue-black'],
  ['Gypsum', 'insoluble', 'no reaction', 'brown'],
  ['Cornstarch', 'insoluble', 'no reaction', 'blue-black'],
  ['Baking soda', 'dissolves', 'fizzes', 'brown'],
  ['Gelatin', 'swells', 'no reaction', 'brown'],
  ['Alka-Seltzer', 'fizzes', 'fizzes', 'brown'],
  ['Sand', 'insoluble', 'no reaction', 'brown'],
];
const powder: TopicLab = {
  id: 'cb-powder',
  title: 'Narrowing down a white powder',
  lead: 'Choose an unknown, then switch on tests one at a time. Each result rules out solids that would behave differently. How few tests can identify it?',
  controls: [
    choice(
      'unknown',
      'Unknown evidence',
      solids.map(([name]) => `Sample of ${name.toLowerCase()}`),
      8,
    ),
    toggle('water', 'Water solubility test'),
    toggle('acid', 'HCl test'),
    toggle('iodine', 'Iodine test'),
  ],
  run: (v) => {
    const target = solids[v.unknown];
    const left = solids.filter(
      (s) =>
        (!v.water || s[1] === target[1]) &&
        (!v.acid || s[2] === target[2]) &&
        (!v.iodine || s[3] === target[3]),
    );
    const tests = v.water + v.acid + v.iodine;
    const results = [
      v.water ? `water: ${target[1]}` : '',
      v.acid ? `HCl: ${target[2]}` : '',
      v.iodine ? `iodine: ${target[3]}` : '',
    ].filter(Boolean);
    const scene: Shape[] = [];
    left.forEach(([name], i) => {
      const x = 30 + (i % 4) * 150,
        y = 40 + Math.floor(i / 4) * 60;
      scene.push(rect(x, y, 140, 44, name === target[0] ? 'accent' : 'muted', true, 0.25, 8));
      scene.push(text(x + 70, y + 27, name, 'middle', 'ink', 12));
    });
    scene.push(text(320, 320, results.join(' · ') || 'No tests run yet', 'middle', 'muted'));
    return {
      o: { left: left.length, tests },
      metrics: [
        { label: 'Solids still possible', value: left.length },
        { label: 'Tests used', value: tests },
        { label: 'Results so far', value: results.join('; ') || 'None' },
      ],
      sceneLabel: `${left.length} solids remain consistent with ${tests} test results`,
      scene,
    };
  },
  missions: [
    goal(
      'Narrow the cornstarch sample down to two possible solids or fewer.',
      'Starch gives a distinctive iodine colour; one other listed solid does too.',
      { unknown: 8, iodine: 1 },
      (o, v) => v.unknown === 8 && o.left <= 2,
    ),
    goal(
      'Identify the calcium carbonate sample with certainty using only two tests.',
      'It fizzes with acid but, unlike baking soda, does not dissolve in water.',
      { unknown: 3, water: 1, acid: 1 },
      (o, v) => v.unknown === 3 && o.left === 1 && o.tests === 2,
    ),
    goal(
      'Show that one iodine test alone identifies vitamin C.',
      'Vitamin C is a reducing agent and decolorizes iodine.',
      { unknown: 2, iodine: 1 },
      (o, v) => v.unknown === 2 && o.left === 1 && o.tests === 1,
    ),
  ],
  predict: {
    q: 'An insoluble white powder fizzes strongly with HCl. Which listed solid is it?',
    options: ['Calcium carbonate', 'Baking soda', 'Cornstarch', 'Table salt'],
    correct: 0,
    why: 'Fizzing shows a carbonate; baking soda dissolves in water, so the insoluble carbonate is calcium carbonate.',
  },
  model:
    'A simplified teaching table of typical results for the 13 listed solids. Real samples can give weaker or mixed results, so confirm with appearance and a second test before deciding.',
};

const medulla: TopicLab = {
  id: 'cb-medulla',
  title: 'Medullary index: human or animal?',
  lead: 'Measure the hair and its central medulla under the microscope. The ratio of their widths separates most human hairs from animal hairs.',
  controls: [
    slider('hair', 'Hair width', 40, 120, 5, 80, 'µm'),
    slider('med', 'Medulla width', 0, 100, 5, 10, 'µm'),
  ],
  run: (v) => {
    const medW = Math.min(v.med, v.hair);
    const index = medW / v.hair;
    const verdict =
      index >= 0.5 ? 'Animal (dog or cat)' : index <= 1 / 3 ? 'Human' : 'Uncertain: check scales';
    return {
      o: { index },
      metrics: [
        { label: 'Medullary index', value: Number(index.toFixed(2)) },
        { label: 'Likely source', value: verdict },
      ],
      sceneLabel: `Hair ${v.hair} micrometers wide with a ${medW} micrometer medulla: index ${index.toFixed(2)}`,
      scene: [
        rect(60, 170 - v.hair, 520, v.hair * 2, 'gold', true, 0.35, v.hair),
        rect(60, 170 - medW, 520, medW * 2, 'ink', true, 0.55, medW),
        line(60, 170 - v.hair, 580, 170 - v.hair, 'ink', 1),
        line(60, 170 + v.hair, 580, 170 + v.hair, 'ink', 1),
        text(320, 320, verdict, 'middle', 'accent', 16),
      ],
    };
  },
  missions: [
    goal(
      'Make a hair with a medullary index of exactly 0.5, the lower limit for most animal hairs.',
      'Set the medulla to half of the hair width.',
      { hair: 80, med: 40 },
      (o) => near(o.index, 0.5, 1e-9),
    ),
    goal(
      'Show a typical human hair with no visible medulla.',
      'Many human hairs have an absent medulla.',
      { med: 0 },
      (o) => o.index === 0,
    ),
  ],
  predict: {
    q: 'A hair is 60 µm wide with a continuous 36 µm medulla. What is its most likely source?',
    options: ['An animal', 'A human', 'A synthetic fiber', 'A plant fiber'],
    correct: 0,
    why: 'The index is 36 ÷ 60 = 0.6, above one-half, which is typical of animal hairs; human medullas are under about one-third.',
  },
  model:
    'Index thresholds of about ⅓ (human) and ½ (animal) are common teaching guides, not strict rules. Scale pattern and medulla shape are needed to separate dog from cat.',
};

const plastics: [string, number][] = [
  ['PP (5)', 0.9],
  ['LDPE (4)', 0.92],
  ['HDPE (2)', 0.95],
  ['PS (6)', 1.05],
  ['PMMA (7)', 1.18],
  ['PVC (3)', 1.38],
  ['PETE (1)', 1.38],
];
const density: TopicLab = {
  id: 'cb-density',
  title: 'Sorting plastics by floating',
  lead: 'Drop a plastic fragment into a liquid of chosen density. It floats if it is less dense than the liquid and sinks if it is denser. Bracket each plastic between two liquids.',
  controls: [
    choice(
      'plastic',
      'Plastic fragment',
      plastics.map(([name]) => name),
      2,
    ),
    slider('liquid', 'Liquid density', 0.85, 1.45, 0.01, 1, 'g/cm³'),
  ],
  run: (v) => {
    const [name, d] = plastics[v.plastic];
    const floats = d < v.liquid ? 1 : 0;
    const y = floats ? 90 : 250;
    return {
      o: { floats, liquid: v.liquid },
      metrics: [
        { label: 'Fragment density', value: d, unit: 'g/cm³' },
        { label: 'Result', value: floats ? 'Floats' : 'Sinks' },
      ],
      sceneLabel: `${name} ${floats ? 'floats' : 'sinks'} in a liquid of density ${v.liquid.toFixed(2)}`,
      scene: [
        rect(200, 80, 240, 210, 'cool', true, 0.25, 6),
        line(200, 80, 200, 290, 'ink', 2),
        line(440, 80, 440, 290, 'ink', 2),
        line(200, 290, 440, 290, 'ink', 2),
        ellipse(320, y, 30, 12, 'accent', true, 0.8),
        text(
          320,
          320,
          `${name} · ${floats ? 'floats' : 'sinks'} at ${v.liquid.toFixed(2)} g/cm³`,
          'middle',
        ),
      ],
    };
  },
  missions: [
    goal(
      'Find a liquid in which HDPE sinks but would still let polypropylene float.',
      'Choose a density between 0.90 and 0.95 g/cm³.',
      { plastic: 2, liquid: 0.93 },
      (o, v) => v.plastic === 2 && o.floats === 0 && v.liquid > 0.9,
    ),
    goal(
      'Float polystyrene in a salt solution while PMMA would still sink.',
      'Choose a density between 1.05 and 1.18 g/cm³.',
      { plastic: 3, liquid: 1.1 },
      (o, v) => v.plastic === 3 && o.floats === 1 && v.liquid < 1.18,
    ),
  ],
  predict: {
    q: 'Which plastic fragment sinks in water but floats in a 1.10 g/cm³ solution?',
    options: ['Polystyrene', 'HDPE', 'PVC', 'Polypropylene'],
    correct: 0,
    why: 'Polystyrene is about 1.05 g/cm³: denser than water (1.00) but less dense than the 1.10 solution.',
  },
  model:
    'Typical densities of unfilled resins. Additives, colourants, and trapped air change real values, so remove bubbles and use several liquids to bracket each fragment.',
};

const rf: TopicLab = {
  id: 'cb-rf',
  title: 'Calculating Rf values',
  lead: 'Move the solvent front and a dye spot. Rf is the spot’s distance divided by the solvent front’s distance, both measured from the pencil starting line.',
  controls: [
    slider('front', 'Solvent front distance', 2, 10, 0.5, 8, 'cm'),
    slider('spot', 'Spot distance', 0, 10, 0.5, 2, 'cm'),
  ],
  run: (v) => {
    const spot = Math.min(v.spot, v.front);
    const value = spot / v.front;
    const px = (cm: number) => 300 - cm * 25;
    return {
      o: { rf: value },
      metrics: [
        { label: 'Rf', value: Number(value.toFixed(2)) },
        { label: 'Spot distance used', value: spot, unit: 'cm' },
      ],
      sceneLabel: `Chromatogram with Rf ${value.toFixed(2)}`,
      scene: [
        rect(250, 40, 140, 270, 'muted', false, 1, 4),
        line(250, px(0), 390, px(0), 'ink', 1, true),
        text(400, px(0) + 4, 'start (pencil)', 'start', 'muted'),
        line(250, px(v.front), 390, px(v.front), 'cool', 2, true),
        text(400, px(v.front) + 4, 'solvent front', 'start', 'muted'),
        ellipse(320, px(spot), 18, 9, 'accent', true, 0.8),
        text(240, px(spot) + 4, `${spot} cm`, 'end'),
      ],
    };
  },
  missions: [
    goal(
      'Make a spot with Rf = 0.50 when the solvent front is at 8 cm.',
      'The spot must travel half as far as the solvent.',
      { spot: 4 },
      (o, v) => v.front === 8 && near(o.rf, 0.5, 1e-9),
    ),
    goal(
      'Match a suspect’s dye with Rf = 0.75 on a run where the front reached 6 cm.',
      'Rf × front distance = spot distance.',
      { front: 6, spot: 4.5 },
      (o, v) => v.front === 6 && near(o.rf, 0.75, 1e-9),
    ),
  ],
  predict: {
    q: 'A spot travels 3.0 cm while the solvent front travels 6.0 cm. What is its Rf?',
    options: ['0.50', '2.0', '3.0', '0.30'],
    correct: 0,
    why: 'Rf = 3.0 cm ÷ 6.0 cm = 0.50. Rf has no units and can never be greater than 1.',
  },
  model:
    'Rf = spot distance ÷ solvent front distance from the starting line, with the spot measured at its centre. Spots cannot pass the solvent front, so values range from 0 to 1.',
};

const spatter: TopicLab = {
  id: 'cb-spatter',
  title: 'Impact angle and stain shape',
  lead: 'A drop striking straight down leaves a round stain; striking at a low angle stretches it out, with the tail pointing the way it travelled.',
  controls: [
    slider('angle', 'Impact angle (from the surface)', 10, 90, 5, 30, '°'),
    choice('dir', 'Direction of travel', ['left to right', 'right to left'], 0),
  ],
  run: (v) => {
    const ratio = Math.sin((v.angle * Math.PI) / 180);
    const w = 30,
      l = w / ratio;
    const sign = v.dir === 0 ? 1 : -1;
    const shape = ratio > 0.97 ? 'Round' : ratio > 0.7 ? 'Slightly oval' : 'Elongated';
    return {
      o: { ratio, elong: l / w },
      metrics: [
        { label: 'Stain shape', value: shape },
        { label: 'Length ÷ width', value: Number((l / w).toFixed(2)) },
        { label: 'Tail points', value: v.dir === 0 ? 'Right' : 'Left' },
      ],
      sceneLabel: `${shape} stain from a ${v.angle} degree impact travelling ${v.dir === 0 ? 'left to right' : 'right to left'}`,
      scene: [
        ellipse(320, 170, l / 2, w / 2, 'warm', true, 0.8),
        ellipse(320 + sign * (l / 2 + 12), 170, 8, 4, 'warm', true, 0.8),
        text(320, 300, `${shape} · tail points ${v.dir === 0 ? 'right' : 'left'}`, 'middle'),
      ],
    };
  },
  missions: [
    goal(
      'Produce a perfectly round stain.',
      'The drop must hit the surface straight on.',
      { angle: 90 },
      (o) => o.ratio > 0.999,
    ),
    goal(
      'Produce a stain twice as long as it is wide, travelling right to left.',
      'Length ÷ width = 1 ÷ sin(angle); try 30°.',
      { angle: 30, dir: 1 },
      (o, v) => v.dir === 1 && near(o.elong, 2, 1e-6),
    ),
  ],
  predict: {
    q: 'An elongated stain has its narrow tail pointing toward a doorway. Where did the drop come from?',
    options: [
      'From the side away from the doorway',
      'From the doorway',
      'Straight above the stain',
      'It cannot be told',
    ],
    correct: 0,
    why: 'The tail forms as the drop keeps moving forward, so it points in the direction of travel; the source is on the opposite side.',
  },
  model:
    'Width ÷ length ≈ sin(impact angle), a standard approximation. Crime Busters asks for direction and shape only, without calculations; real surfaces and drop sizes add variation.',
};

export const crimeBustersExtras: EventExtras = {
  eventId: 'crime-busters',
  labs: [powder, medulla, density, rf, spatter],
  lessons: {
    'cb-u1-l1': {
      labs: ['cb-powder'],
      sort: sort(
        'Which test result is distinctive for this solid?',
        [
          'Fizzes with HCl',
          'Blue-black with iodine',
          'Decolorizes iodine',
          'Fizzes in plain water',
        ],
        [
          ['Calcium carbonate', 0],
          ['Cornstarch', 1],
          ['Vitamin C', 2],
          ['Alka-Seltzer', 3],
          ['Flour', 1],
          ['Baking soda', 0],
        ],
      ),
      checks: [
        check(
          4,
          'Which two listed solids turn iodine blue-black?',
          ['Flour and cornstarch', 'Salt and sugar', 'Gypsum and sand'],
          'Both contain starch, which forms a dark blue-black complex with iodine.',
        ),
      ],
    },
    'cb-u2-l1': {
      phet: [
        phet(
          'ph-scale',
          'pH Scale',
          'Several Crime Busters liquids look like water, so pH is one of the fastest ways to split them into acids, neutral liquids, and bases before using odour to finish.',
          'Measure the pH of the household liquids offered, such as vinegar or soap, and sort them into acidic, neutral, and basic.',
          'Add water to an acidic liquid and explain why its pH moves toward 7 without ever passing it.',
        ),
      ],
      sort: sort(
        'Acidic, neutral, or basic?',
        ['Acidic', 'Near neutral', 'Basic'],
        [
          ['Vinegar', 0],
          ['Lemon juice', 0],
          ['Household ammonia', 2],
          ['Distilled water', 1],
          ['Rubbing alcohol', 1],
          ['Baking soda solution', 2],
        ],
      ),
      checks: [
        check(
          1,
          'Which listed metal is attracted to a magnet?',
          ['Iron', 'Copper', 'Aluminum', 'Zinc'],
          'Iron is ferromagnetic; none of the other listed metals is attracted to an ordinary magnet.',
        ),
      ],
    },
    'cb-u3-l1': {
      labs: ['cb-medulla'],
      sort: sort(
        'Classify the fiber from its burn result',
        ['Animal', 'Vegetable', 'Synthetic'],
        [
          ['Smells like burning hair and self-extinguishes', 0],
          ['Burns quickly with an afterglow and gray ash', 1],
          ['Melts, shrinks from the flame, leaves a hard bead', 2],
          ['Leaves a crushable black ash', 0],
          ['Smells like burning paper', 1],
          ['Drips while burning with a chemical smell', 2],
        ],
      ),
      checks: [
        check(
          2,
          'A hair has scales shaped like petals and a string-of-pearls medulla. Which animal?',
          ['Cat', 'Dog', 'Human'],
          'Pointed, spinous scales and a beaded medulla are typical of cat hair.',
        ),
      ],
    },
    'cb-u4-l1': {
      labs: ['cb-density'],
      phet: [
        phet(
          'density',
          'Density',
          'Plastic identification depends on comparing a fragment’s density with a liquid’s. Measuring mass and volume of blocks here builds the same float-or-sink reasoning.',
          'Measure the mass and volume of two mystery blocks and calculate each density.',
          'Predict which blocks would float in water, then test your prediction.',
        ),
      ],
      sort: sort(
        'Does it float or sink in water?',
        ['Floats', 'Sinks'],
        [
          ['Polypropylene (PP)', 0],
          ['Low-density polyethylene (LDPE)', 0],
          ['High-density polyethylene (HDPE)', 0],
          ['Polystyrene (PS)', 1],
          ['PVC', 1],
          ['PETE', 1],
          ['PMMA (acrylic)', 1],
        ],
      ),
      checks: [
        check(
          4,
          'Which plastic gives a green flame in a copper-wire (Beilstein) test?',
          ['PVC', 'PETE', 'HDPE'],
          'PVC contains chlorine, and copper chloride colours the flame green.',
        ),
      ],
    },
    'cb-u5-l1': {
      labs: ['cb-rf'],
      sort: sort(
        'Good chromatography technique or mistake?',
        ['Good technique', 'Mistake'],
        [
          ['Drawing the starting line in pencil', 0],
          ['Placing the spot below the solvent level', 1],
          ['Marking the solvent front as soon as the paper is removed', 0],
          ['Drawing the starting line in ink', 1],
          ['Covering the container while it develops', 0],
          ['Letting the solvent run off the top of the paper', 1],
        ],
      ),
      checks: [
        check(
          3,
          'Why must known and unknown inks be run side by side?',
          [
            'Rf depends on the paper, solvent, and conditions',
            'Ink only separates in pairs',
            'It makes the solvent faster',
          ],
          'Rf values are only comparable when every sample shares the same paper, solvent, and run.',
        ),
      ],
    },
    'cb-u6-l1': {
      labs: ['cb-spatter'],
      sort: sort(
        'Crime Busters scene evidence: class or individual?',
        ['Class evidence', 'Individual evidence'],
        [
          ['Shoe brand and size', 0],
          ['A complete fingerprint with matching minutiae', 1],
          ['Soil composition matching a garden', 0],
          ['A full DNA profile matching at every location', 1],
          ['Tire tread pattern of a common model', 0],
          ['A unique cut in a shoe sole matching the print', 1],
        ],
      ),
      checks: [
        check(
          0,
          'Which fingerprint pattern has two deltas?',
          ['Whorl', 'Loop', 'Arch'],
          'Whorls have circular ridges with two deltas; loops have one and arches have none.',
        ),
      ],
    },
    'cb-u7-l1': {
      labs: ['cb-powder'],
      sort: sort(
        'Does this sentence implicate or exclude the suspect?',
        ['Implicates', 'Excludes'],
        [
          ['The scene powder matches calcium carbonate found in the suspect’s garage', 0],
          ['The suspect’s print is an arch but the scene print is a whorl', 1],
          ['The note’s ink bands match the suspect’s pen at every Rf', 0],
          ['The suspect owns only a cat, but the hair found is from a dog', 1],
          ['Soil on the suspect’s shoes matches the scene soil', 0],
          ['The suspect’s DNA differs at two locations', 1],
        ],
      ),
      checks: [
        check(
          2,
          'Besides naming the culprit, what must the written analysis explain?',
          [
            'Why the other suspects were not chosen',
            'The price of each reagent',
            'How long each test took',
          ],
          'The rules require explaining which evidence implicates the culprit and why the other suspects were excluded.',
        ),
      ],
    },
  },
};
