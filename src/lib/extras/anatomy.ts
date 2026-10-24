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
  toggle,
  type Shape,
  type Tone,
  type TopicLab,
} from '../topic-lab-kit.ts';

const sections: [string, string[]][] = [
  ['Midsagittal', ['Trachea', 'Heart', 'Liver (left lobe)']],
  ['Parasagittal through the right lung', ['Right lung', 'Liver']],
  ['Frontal (coronal) through mid-thorax', ['Trachea', 'Heart', 'Right lung', 'Liver', 'Stomach']],
  ['Transverse at T6 (mid-thorax)', ['Heart', 'Right lung']],
  ['Transverse at L1 (upper abdomen)', ['Liver', 'Stomach', 'Left kidney']],
];
const planes: TopicLab = {
  id: 'anat-planes',
  title: 'What does each section cut through?',
  lead: 'Pick a plane and predict which organs a slice in that plane would contain. Imaging questions are won by picturing the cut before reading the image.',
  controls: [
    choice(
      'plane',
      'Plane of section',
      sections.map(([name]) => name),
      2,
    ),
  ],
  run: (v) => {
    const seen = sections[v.plane][1],
      has = (name: string) => (seen.some((s) => s.startsWith(name)) ? 1 : 0);
    return {
      o: {
        plane: v.plane,
        heart: has('Heart'),
        lung: has('Right lung'),
        liver: has('Liver'),
        stomach: has('Stomach'),
        kidney: has('Left kidney'),
      },
      metrics: [
        { label: 'Plane', value: sections[v.plane][0] },
        {
          label: 'Divides the body into',
          value:
            v.plane <= 1
              ? 'Left and right portions'
              : v.plane === 2
                ? 'Anterior and posterior portions'
                : 'Superior and inferior portions',
        },
        { label: 'Structures in the section', value: seen.join(', ') },
      ],
      sceneLabel: `Front view of the torso showing a ${sections[v.plane][0].toLowerCase()} plane`,
      scene: [
        path(
          'M291 42L278 55Q238 57 224 94L210 177L226 185L244 123L245 290H395L396 123L414 185L430 177L416 94Q402 57 362 55L349 42Z',
          'muted',
          true,
          1,
          0.08,
        ),
        path(
          'M291 42L278 55Q238 57 224 94L210 177L226 185L244 123L245 290H395L396 123L414 185L430 177L416 94Q402 57 362 55L349 42',
          'muted',
          false,
          1.5,
        ),
        circle(320, 24, 20, 'muted', false),
        path(
          'M306 72C280 63 255 94 253 135Q249 160 261 166Q286 171 308 151Z',
          'cool',
          true,
          1,
          has('Right lung') ? 0.65 : 0.2,
        ),
        path(
          'M334 72C360 63 385 94 387 135Q391 160 379 166Q355 171 333 151Q346 129 333 117Z',
          'cool',
          true,
          1,
          0.2,
        ),
        path(
          'M320 54V110M320 104L285 136M320 104L355 136M286 135L269 151M286 135L293 159M354 135L371 151M354 135L347 159',
          'warm',
          false,
          4,
        ),
        ...Array.from({ length: 6 }, (_, i) => line(315, 62 + i * 6, 325, 62 + i * 6, 'ink', 0.7)),
        path(
          'M315 118C300 99 283 124 300 142L331 164Q360 137 347 119Q333 109 325 122Z',
          'warm',
          true,
          1,
          has('Heart') ? 0.7 : 0.15,
        ),
        path(
          'M250 176Q281 160 335 176L354 184Q318 207 259 201Z',
          'gold',
          true,
          1,
          has('Liver') ? 0.65 : 0.15,
        ),
        path(
          'M353 171V185Q384 176 384 197Q382 218 358 213L343 201Q361 203 363 193L343 183V171',
          'green',
          true,
          1,
          has('Stomach') ? 0.65 : 0.15,
        ),
        path(
          'M272 219C251 207 251 251 268 251Q280 249 270 238Q262 232 272 219Z',
          'warm',
          true,
          1,
          0.2,
        ),
        path(
          'M367 219C388 207 388 251 371 251Q359 249 369 238Q377 232 367 219Z',
          'warm',
          true,
          1,
          has('Left kidney') ? 0.65 : 0.15,
        ),
        path('M248 167Q320 143 392 167', 'muted', false, 1.5),
        line(262, 101, 178, 101, 'cool', 1),
        text(168, 105, 'Right lung', 'end', 'cool', 12),
        line(300, 135, 178, 139, 'warm', 1),
        text(168, 143, 'Heart', 'end', 'warm', 12),
        line(269, 185, 178, 192, 'gold', 1),
        text(168, 196, 'Liver', 'end', 'gold', 12),
        line(380, 189, 456, 189, 'green', 1),
        text(467, 193, 'Stomach', 'start', 'green', 12),
        line(376, 236, 456, 236, 'warm', 1),
        text(467, 240, 'Left kidney', 'start', 'warm', 12),
        ...(v.plane === 0
          ? [line(320, 8, 320, 295, 'slot', 2, true)]
          : v.plane === 1
            ? [line(277, 8, 277, 295, 'slot', 2, true)]
            : v.plane === 2
              ? [rect(238, 50, 164, 242, 'slot', false, 1, 14)]
              : [
                  rect(230, v.plane === 3 ? 115 : 187, 180, 8, 'slot', true, 0.35),
                  line(
                    200,
                    v.plane === 3 ? 119 : 191,
                    440,
                    v.plane === 3 ? 119 : 191,
                    'slot',
                    2,
                    true,
                  ),
                ]),
        text(320, 318, 'Anterior view · patient’s right is on your left', 'middle', 'muted', 11),
        text(
          320,
          335,
          'Bright organs intersect the selected plane; positions are schematic.',
          'middle',
          'muted',
          10,
        ),
      ],
    };
  },
  missions: [
    goal(
      'Choose the plane that divides the body into equal left and right halves.',
      'Only one sagittal plane lies exactly on the midline.',
      { plane: 0 },
      (o) => o.plane === 0,
    ),
    goal(
      'Choose a section that shows the heart and right lung but none of the abdominal organs.',
      'A horizontal cut through the middle of the chest.',
      { plane: 3 },
      (o) => o.heart === 1 && o.lung === 1 && o.liver === 0 && o.stomach === 0,
    ),
    goal(
      'Choose a section that contains the liver, stomach, and left kidney together.',
      'A horizontal cut just below the diaphragm.',
      { plane: 4 },
      (o) => o.liver === 1 && o.stomach === 1 && o.kidney === 1,
    ),
  ],
  predict: {
    q: 'On a transverse CT image viewed in the standard way, the patient’s liver appears…',
    options: [
      'On the left side of the image',
      'On the right side of the image',
      'At the top of the image',
      'In the centre',
    ],
    correct: 0,
    why: 'Axial images are displayed as if you were looking up from the patient’s feet, so the patient’s right side — where the liver lies — is on the viewer’s left.',
  },
  model:
    'A schematic lookup of major thoracic and upper-abdominal organs for five standard planes in an average adult. Organ position varies with body build, breathing, and posture; vertebral levels are approximate landmarks.',
};

const airways: TopicLab = {
  id: 'anat-airways',
  title: 'Branching of the airway tree',
  lead: 'Each airway divides in two, about 23 times. Individual tubes shrink, but there are so many that the total cross-section grows enormously.',
  controls: [
    slider('gen', 'Airway generation (0 = trachea)', 0, 23, 1, 0, ''),
    slider('flow', 'Inspiratory flow', 0.25, 3, 0.25, 1, 'L/s'),
  ],
  run: (v) => {
    const diameter = (n: number) => Math.max(0.45, 18 * 2 ** (-n / 3)),
      area = (n: number) => 2 ** n * Math.PI * (diameter(n) / 20) ** 2,
      velocity = (v.flow * 1000) / area(v.gen);
    return {
      o: { area: area(v.gen), velocity, count: 2 ** v.gen },
      metrics: [
        {
          label: 'Zone',
          value:
            v.gen <= 16
              ? 'Conducting zone (no gas exchange)'
              : v.gen <= 19
                ? 'Respiratory bronchioles'
                : v.gen <= 22
                  ? 'Alveolar ducts'
                  : 'Alveolar sacs',
        },
        { label: 'Airways in this generation', value: 2 ** v.gen },
        { label: 'Diameter of each', value: diameter(v.gen), unit: 'mm' },
        { label: 'Total cross-sectional area', value: area(v.gen), unit: 'cm²' },
        { label: 'Air velocity', value: velocity, unit: 'cm/s' },
      ],
      sceneLabel: 'Branching airway tree and a schematic cross-section at the selected generation',
      scene: [
        text(40, 27, 'CONDUCTING TREE', 'start', 'ink', 12),
        path('M190 45V110M190 105L114 170M190 105L266 170', 'warm', false, 12),
        ...Array.from({ length: 7 }, (_, i) => line(182, 52 + i * 7, 198, 52 + i * 7, 'ink', 1)),
        path('M114 170L75 221M114 170L140 232M266 170L240 232M266 170L305 221', 'warm', false, 6),
        path(
          'M75 221L53 263M75 221L87 268M140 232L125 278M140 232L163 271M240 232L220 274M240 232L258 280M305 221L290 267M305 221L330 263',
          'warm',
          false,
          2.5,
        ),
        ...[53, 87, 125, 163, 220, 258, 290, 330].flatMap((x, i) => [
          circle(x, 277 + (i % 2) * 6, 12, 'cool', true, 0.25),
          circle(x + 7, 286 + (i % 2) * 6, 8, 'cool', false),
        ]),
        line(377, 45, 377, 295, 'muted', 1, true),
        text(497, 43, 'SELECTED GENERATION', 'middle', 'ink', 12),
        text(497, 70, String(v.gen), 'middle', 'accent', 20),
        circle(497, 173, 20 + diameter(v.gen) * 3, 'warm', true, 0.3),
        circle(497, 173, 14 + diameter(v.gen) * 3, 'cool', true, 0.3),
        line(497, 173, 511 + diameter(v.gen) * 3, 173, 'ink', 1),
        text(497, 267, diameter(v.gen).toPrecision(3) + ' mm diameter', 'middle', 'ink', 12),
        text(
          497,
          293,
          (2 ** v.gen).toLocaleString('en-US') + ' parallel airways',
          'middle',
          'accent',
          12,
        ),
        text(
          320,
          325,
          'Branching and cross-section are schematic, not to scale.',
          'middle',
          'muted',
          11,
        ),
      ],
      plot: {
        title: 'Total cross-section rises steeply in the small airways',
        x: [0, 23, 'Generation'],
        y: [0, 4.5, 'log₁₀ (total area / cm²)'],
        curves: [{ f: (n) => Math.log10(area(Math.round(n))) }],
        vlines: [{ x: 16, label: 'end of conducting zone' }],
        points: [
          { x: v.gen, y: Math.log10(area(v.gen)), label: `${area(v.gen).toPrecision(3)} cm²` },
        ],
      },
    };
  },
  missions: [
    goal(
      'Find the last generation of the conducting zone.',
      'Terminal bronchioles are about generation 16; respiratory bronchioles follow.',
      { gen: 16 },
      (o, v) => v.gen === 16,
    ),
    goal(
      'At a flow of 1 L/s, find the first generation where air moves slower than 1 cm/s.',
      'So far down, diffusion rather than bulk flow moves the gas.',
      { gen: 20 },
      (o, v) => v.flow === 1 && o.velocity < 1 && v.gen <= 20,
    ),
    goal(
      'Find a generation whose total cross-section is more than a thousand times the trachea’s.',
      'The trachea is about 2.5 cm² in area.',
      { gen: 21 },
      (o) => o.area > 2540,
    ),
  ],
  predict: {
    q: 'Airflow resistance in a healthy lung is greatest in the…',
    options: [
      'Medium-sized bronchi, not the smallest bronchioles',
      'Smallest bronchioles, because each is so narrow',
      'Alveoli',
      'Nose only',
    ],
    correct: 0,
    why: 'Although each bronchiole is narrow, there are so many in parallel that their combined resistance is small. This is why small-airway disease can be advanced before symptoms appear.',
  },
  model:
    'Symmetric dichotomous branching (a Weibel-type model): 2ⁿ airways per generation with diameter scaled by 2^(−1/3) per generation in the conducting zone and held near 0.45 mm beyond. Real lungs branch asymmetrically; values are order-of-magnitude.',
};

const boyle: TopicLab = {
  id: 'anat-boyle',
  title: 'Boyle’s law in the chest',
  lead: 'Breathing muscles change the volume of the thorax. Pressure in the lungs responds first; air then flows down the pressure difference — if the airway is open.',
  controls: [
    slider('dv', 'Change in thoracic volume', -0.5, 1.5, 0.1, 0, 'L'),
    toggle('closed', 'Glottis closed (no air can move)'),
  ],
  run: (v) => {
    const pressure = (760 * 2.4) / (2.4 + v.dv) - 760,
      dp = pressure * 1.36,
      moved = v.closed ? 0 : v.dv,
      y = 230 + v.dv * 40;
    return {
      o: { dp: v.closed ? dp : 0, start: dp, moved },
      metrics: [
        { label: 'Alveolar pressure change before any air moves', value: dp, unit: 'cmH₂O' },
        {
          label: 'Air moved',
          value: v.closed
            ? 'None — the airway is closed'
            : v.dv > 0
              ? `${v.dv.toFixed(1)} L in`
              : v.dv < 0
                ? `${(-v.dv).toFixed(1)} L out`
                : 'None',
        },
        {
          label: 'Alveolar pressure once flow stops',
          value: v.closed ? dp : 0,
          unit: 'cmH₂O relative to atmosphere',
        },
      ],
      sceneLabel: `Thorax with volume changed by ${v.dv} litres and the glottis ${v.closed ? 'closed' : 'open'}`,
      scene: [
        path('M300 40V90 M340 40V90', 'ink', false, 3),
        ...(v.closed ? [line(292, 56, 348, 56, 'warm', 5)] : []),
        path(`M220 90H420V${y}Q320 ${y - 50} 220 ${y}Z`, 'cool', true, 2, 0.3),
        path(`M220 90H420V${y}Q320 ${y - 50} 220 ${y}Z`, 'ink', false, 2.5),
        text(320, 170, 'lungs', 'middle'),
        text(320, y + 24, 'diaphragm', 'middle', 'muted', 11),
        ...(moved > 0
          ? arrow(320, 6, 320, 36, 'slot', 3)
          : moved < 0
            ? arrow(320, 36, 320, 6, 'slot', 3)
            : []),
        text(460, 120, v.closed ? `P = ${dp.toFixed(0)} cmH₂O` : 'P returns to 0', 'start', 'slot'),
      ],
    };
  },
  missions: [
    goal(
      'Take a normal quiet breath in: move 0.5 L of air.',
      'Lower the diaphragm with the airway open.',
      { dv: 0.5 },
      (o) => near(o.moved, 0.5, 1e-9),
    ),
    goal(
      'With the glottis closed, expand the chest until alveolar pressure is more than 100 cmH₂O below atmospheric.',
      'With no air entering, the same gas occupies a larger volume.',
      { closed: 1, dv: 0.3 },
      (o) => o.dp < -100,
    ),
    goal(
      'With the glottis closed, generate a positive pressure — as in a cough before it is released.',
      'Compress the chest instead of expanding it.',
      { closed: 1, dv: -0.2 },
      (o) => o.dp > 0,
    ),
  ],
  predict: {
    q: 'During quiet inspiration, air enters the lungs because…',
    options: [
      'Thoracic volume increases, so alveolar pressure falls below atmospheric pressure',
      'The lungs actively pull air in with their own muscle',
      'Atmospheric pressure rises',
      'Oxygen is attracted to hemoglobin',
    ],
    correct: 0,
    why: 'The diaphragm and external intercostals enlarge the thorax. By Boyle’s law pressure falls, and air flows in until alveolar and atmospheric pressures are equal again.',
  },
  model:
    'Isothermal ideal gas, P₁V₁ = P₂V₂, starting from a functional residual capacity of 2.4 L at 760 mmHg. The closed-glottis values are an upper bound: real respiratory muscles cannot generate such large pressures, and gas temperature and water vapour are ignored.',
};

const spirometry: TopicLab = {
  id: 'anat-spirometry',
  title: 'Lung volumes, capacities, and patterns',
  lead: 'Four volumes that do not overlap add up to every capacity. Add the FEV₁/FVC ratio and you can sort obstructive from restrictive disease.',
  controls: [
    slider('tv', 'Tidal volume', 0.2, 1.5, 0.1, 0.5, 'L'),
    slider('irv', 'Inspiratory reserve volume', 0.5, 4, 0.1, 3, 'L'),
    slider('erv', 'Expiratory reserve volume', 0.3, 2, 0.1, 1.2, 'L'),
    slider('rv', 'Residual volume', 0.5, 4, 0.1, 1.2, 'L'),
    slider('ratio', 'FEV₁ / FVC', 30, 95, 1, 80, '%'),
  ],
  run: (v) => {
    const vc = v.tv + v.irv + v.erv,
      tlc = vc + v.rv,
      frc = v.erv + v.rv,
      pattern = v.ratio < 70 ? (tlc < 4.7 ? 3 : 1) : tlc < 4.7 ? 2 : 0;
    const parts: [string, number, Tone][] = [
      ['RV', v.rv, 'muted'],
      ['ERV', v.erv, 'cool'],
      ['TV', v.tv, 'slot'],
      ['IRV', v.irv, 'accent'],
    ];
    let y = 300;
    return {
      o: { vc, tlc, frc, pattern },
      metrics: [
        { label: 'Vital capacity (IRV + TV + ERV)', value: vc, unit: 'L' },
        { label: 'Functional residual capacity (ERV + RV)', value: frc, unit: 'L' },
        { label: 'Total lung capacity', value: tlc, unit: 'L' },
        {
          label: 'Pattern',
          value: ['Normal', 'Obstructive', 'Restrictive', 'Mixed obstructive and restrictive'][
            pattern
          ],
        },
      ],
      sceneLabel: `Stacked lung volumes totalling ${tlc.toFixed(1)} litres`,
      scene: [
        ...parts.flatMap(([name, value, tone]): Shape[] => {
          const h = value * 26;
          y -= h;
          return [
            rect(250, y, 120, h, tone, true, 0.45),
            text(310, y + h / 2 + 4, `${name} ${value.toFixed(1)} L`, 'middle', 'ink', 12),
          ];
        }),
        line(390, 300 - tlc * 26, 390, 300, 'gold', 2),
        text(398, 300 - (tlc * 26) / 2, `TLC ${tlc.toFixed(1)} L`, 'start', 'gold'),
        line(230, 300 - tlc * 26, 230, 300 - v.rv * 26, 'green', 2),
        text(222, 300 - v.rv * 26 - (vc * 26) / 2, `VC ${vc.toFixed(1)} L`, 'end', 'green'),
        line(200, 300, 420, 300, 'muted', 2),
      ],
    };
  },
  missions: [
    goal(
      'Build an obstructive pattern with air trapping: a low FEV₁/FVC ratio and a residual volume of at least 2 L.',
      'Obstruction slows expiration and leaves extra air behind.',
      { ratio: 55, rv: 2.5 },
      (o, v) => o.pattern === 1 && v.rv >= 2,
    ),
    goal(
      'Build a restrictive pattern: a normal ratio with total lung capacity below 4.7 L.',
      'Shrink every volume; airflow itself is not limited.',
      { irv: 1.8, erv: 0.8, rv: 0.9 },
      (o) => o.pattern === 2,
    ),
    goal(
      'Set a functional residual capacity of exactly 3.0 L.',
      'FRC is what remains in the lungs after a normal breath out.',
      { erv: 1.5, rv: 1.5 },
      (o) => near(o.frc, 3, 1e-6),
    ),
  ],
  predict: {
    q: 'Which volume cannot be measured by simple spirometry?',
    options: ['Residual volume', 'Tidal volume', 'Vital capacity', 'Expiratory reserve volume'],
    correct: 0,
    why: 'A spirometer records only air that moves in and out. Residual volume never leaves the lungs, so capacities that include it (FRC and TLC) need other methods.',
  },
  model:
    'Capacities as sums of four non-overlapping volumes. Classification uses FEV₁/FVC < 70% for obstruction and total lung capacity below 80% of a 5.9 L reference for restriction; clinical interpretation uses age-, sex-, and height-specific predicted values.',
};

const hemoglobin: TopicLab = {
  id: 'anat-hemoglobin',
  title: 'Oxygen–hemoglobin dissociation curve',
  lead: 'Hemoglobin loads oxygen in the lungs and unloads it in the tissues. Acid and heat — the signature of working muscle — push the curve to the right.',
  controls: [
    slider('po2', 'Partial pressure of oxygen', 0, 120, 1, 100, 'mmHg'),
    slider('ph', 'Blood pH', 7, 7.6, 0.05, 7.4, ''),
    slider('temp', 'Temperature', 33, 41, 0.5, 37, '°C'),
  ],
  run: (v) => {
    const p50 = 26.6 * 10 ** (0.48 * (7.4 - v.ph)) * 10 ** (0.024 * (v.temp - 37)),
      sat = (p: number, half: number) => (p <= 0 ? 0 : (100 * p ** 2.7) / (half ** 2.7 + p ** 2.7));
    return {
      o: { sat: sat(v.po2, p50), p50 },
      metrics: [
        { label: 'Hemoglobin saturation', value: sat(v.po2, p50), unit: '%' },
        { label: 'P₅₀ (pressure at half saturation)', value: p50, unit: 'mmHg' },
        {
          label: 'Curve position',
          value:
            p50 > 27.6
              ? 'Shifted right — oxygen released more readily'
              : p50 < 25.6
                ? 'Shifted left — oxygen held more tightly'
                : 'Standard',
        },
      ],
      plot: {
        title: 'Saturation against oxygen pressure',
        x: [0, 120, 'PO₂ (mmHg)'],
        y: [0, 100, 'Saturation (%)'],
        curves: [
          { f: (p) => sat(p, p50), label: 'these conditions' },
          { f: (p) => sat(p, 26.6), label: 'pH 7.4, 37 °C', dash: true, tone: 'muted' },
        ],
        points: [{ x: v.po2, y: sat(v.po2, p50), label: `${sat(v.po2, p50).toFixed(0)}%` }],
      },
    };
  },
  missions: [
    goal(
      'Under standard conditions, find the oxygen pressure at which hemoglobin is about 75% saturated, as in mixed venous blood.',
      'Venous blood at rest has a PO₂ near 40 mmHg.',
      { po2: 40 },
      (o, v) => near(v.ph, 7.4, 1e-9) && v.temp === 37 && near(o.sat, 75, 1.5),
    ),
    goal(
      'At a tissue PO₂ of 40 mmHg, reproduce working muscle: acidic and warm enough to drop saturation below 60%.',
      'Lower the pH and raise the temperature.',
      { po2: 40, ph: 7.2, temp: 39 },
      (o, v) => v.po2 === 40 && o.sat < 60,
    ),
    goal(
      'Under standard conditions, find the P₅₀.',
      'It is the oxygen pressure giving 50% saturation — a little under 27 mmHg.',
      { po2: 27 },
      (o, v) => near(v.ph, 7.4, 1e-9) && v.temp === 37 && near(o.sat, 50, 1.5),
    ),
  ],
  predict: {
    q: 'A rightward shift of the oxygen–hemoglobin dissociation curve means that, at a given PO₂, hemoglobin…',
    options: [
      'Holds less oxygen, so more is delivered to tissue',
      'Holds more oxygen',
      'Cannot bind oxygen at all',
      'Carries more carbon monoxide',
    ],
    correct: 0,
    why: 'Lower affinity favours unloading. Rising CO₂, acid (the Bohr effect), temperature, and 2,3-BPG all shift the curve right exactly where oxygen is most needed.',
  },
  model:
    'Hill equation with coefficient 2.7 and P₅₀ = 26.6 mmHg at pH 7.4 and 37 °C, shifted by a Bohr factor of 0.48 per pH unit and 0.024 per °C. A teaching approximation; the Hill form is inaccurate at the extremes, and 2,3-BPG and carbon monoxide are not included.',
};

const shunt: TopicLab = {
  id: 'anat-vq',
  title: 'Shunt and the limits of oxygen therapy',
  lead: 'Blood that passes fluid-filled or collapsed alveoli is never oxygenated. It then mixes with well-oxygenated blood — and no amount of inhaled oxygen can reach it.',
  controls: [
    slider('shunt', 'Fraction of blood flow that is shunted', 0, 60, 5, 0, '%'),
    slider('fio2', 'Inspired oxygen', 21, 100, 1, 21, '%'),
  ],
  run: (v) => {
    const sat = (f: number) =>
      (1 - v.shunt / 100) * (97.5 + (2.5 * (f - 21)) / 79) + (v.shunt / 100) * 70;
    return {
      o: { sat: sat(v.fio2), gain: sat(100) - sat(21) },
      metrics: [
        { label: 'Arterial oxygen saturation', value: sat(v.fio2), unit: '%' },
        {
          label: 'Most that 100% oxygen could add',
          value: sat(100) - sat(21),
          unit: 'percentage points',
        },
        {
          label: 'Saturation of blood leaving ventilated alveoli',
          value: 97.5 + (2.5 * (v.fio2 - 21)) / 79,
          unit: '%',
        },
      ],
      plot: {
        title: 'Response to supplemental oxygen',
        x: [21, 100, 'Inspired oxygen (%)'],
        y: [60, 100, 'Arterial saturation (%)'],
        curves: [{ f: sat }],
        hlines: [{ y: 90, label: '90%' }],
        points: [{ x: v.fio2, y: sat(v.fio2), label: `${sat(v.fio2).toFixed(1)}%` }],
      },
    };
  },
  missions: [
    goal(
      'On room air, find the smallest shunt that drops arterial saturation below 90%.',
      'Each 5% of shunted flow replaces well-oxygenated blood with venous blood.',
      { shunt: 30 },
      (o, v) => v.fio2 === 21 && o.sat < 90 && v.shunt <= 30,
    ),
    goal(
      'Give that patient 100% oxygen and see how little the saturation improves.',
      'Shunted blood never meets the extra oxygen.',
      { shunt: 30, fio2: 100 },
      (o, v) => v.shunt === 30 && v.fio2 === 100,
    ),
    goal(
      'On room air, find the largest shunt that still keeps saturation at 94% or above.',
      'A small shunt is normal; watch the threshold.',
      { shunt: 10 },
      (o, v) => v.fio2 === 21 && o.sat >= 94 && v.shunt >= 10,
    ),
  ],
  predict: {
    q: 'Hypoxemia caused by a true shunt responds poorly to supplemental oxygen because…',
    options: [
      'Shunted blood bypasses ventilated alveoli, and the remaining blood is already nearly saturated',
      'Oxygen cannot dissolve in plasma',
      'Hemoglobin is destroyed in a shunt',
      'The patient stops breathing',
    ],
    correct: 0,
    why: 'Extra oxygen can add very little to blood that is already about 98% saturated, and nothing to blood that never reaches an aerated alveolus.',
  },
  model:
    'Two-compartment mixing by saturation: ventilated units reach 97.5–100% depending on inspired oxygen, shunted blood stays at a mixed-venous 70%. Dissolved oxygen and changes in venous saturation are ignored, so real responses are slightly larger.',
};

const enzymeData: [string, number, number][] = [
  ['Pepsin (stomach)', 2, 1.2],
  ['Salivary amylase (mouth)', 6.8, 1.3],
  ['Trypsin (small intestine)', 8, 1.4],
];
const enzymes: TopicLab = {
  id: 'anat-enzymes',
  title: 'Digestive enzymes and pH',
  lead: 'Each digestive enzyme works in the compartment whose pH suits it. Move a meal from mouth to stomach to intestine and watch which enzymes switch on and off.',
  controls: [
    choice(
      'enzyme',
      'Enzyme followed',
      enzymeData.map(([name]) => name),
      1,
    ),
    slider('ph', 'pH of the surroundings', 1, 10, 0.1, 7, ''),
  ],
  run: (v) => {
    const activity = (i: number, ph: number) =>
      100 * Math.exp(-(((ph - enzymeData[i][1]) / enzymeData[i][2]) ** 2));
    return {
      o: {
        act: activity(v.enzyme, v.ph),
        pepsin: activity(0, v.ph),
        amylase: activity(1, v.ph),
        trypsin: activity(2, v.ph),
      },
      metrics: [
        {
          label: 'Activity of the enzyme followed',
          value: activity(v.enzyme, v.ph),
          unit: '% of maximum',
        },
        { label: 'Pepsin', value: activity(0, v.ph), unit: '%' },
        { label: 'Salivary amylase', value: activity(1, v.ph), unit: '%' },
        { label: 'Trypsin', value: activity(2, v.ph), unit: '%' },
      ],
      plot: {
        title: 'Relative activity against pH',
        x: [1, 10, 'pH'],
        y: [0, 100, 'Activity (% of maximum)'],
        curves: enzymeData.map(([name], i) => ({
          f: (ph: number) => activity(i, ph),
          label: name,
          tone: (['warm', 'green', 'cool'] as const)[i],
        })),
        points: [
          {
            x: v.ph,
            y: activity(v.enzyme, v.ph),
            label: `${activity(v.enzyme, v.ph).toFixed(0)}%`,
          },
        ],
      },
    };
  },
  missions: [
    goal(
      'Find conditions in which pepsin works at 95% or more of its maximum.',
      'Follow pepsin and set a strongly acidic pH.',
      { enzyme: 0, ph: 2 },
      (o, v) => v.enzyme === 0 && o.act >= 95,
    ),
    goal(
      'Show that salivary amylase is essentially inactive (under 5%) at the stomach’s pH of 2.',
      'Swallowed amylase stops working once acid reaches it.',
      { enzyme: 1, ph: 2 },
      (o, v) => v.enzyme === 1 && near(v.ph, 2, 1e-9) && o.act < 5,
    ),
    goal(
      'Find a pH at which trypsin is above 90% active while pepsin is below 1%.',
      'Bicarbonate from the pancreas makes the duodenum mildly alkaline.',
      { enzyme: 2, ph: 8 },
      (o) => o.trypsin > 90 && o.pepsin < 1,
    ),
  ],
  predict: {
    q: 'Pepsin secreted in the stomach stops digesting protein in the duodenum mainly because…',
    options: [
      'Pancreatic bicarbonate raises the pH far above pepsin’s optimum',
      'It is used up in the stomach',
      'Bile destroys all enzymes',
      'The duodenum contains no protein',
    ],
    correct: 0,
    why: 'Pepsin is active only in strong acid. Neutralising chyme protects the intestinal lining and provides the alkaline conditions pancreatic enzymes need.',
  },
  model:
    'Bell-shaped (Gaussian) activity curves around typical pH optima of about 2, 6.8, and 8. Real enzymes have asymmetric profiles and are also irreversibly denatured far from their optimum, which a reversible curve does not show.',
};

const surface: TopicLab = {
  id: 'anat-surface',
  title: 'Folding the small intestine’s surface',
  lead: 'A plain tube the size of the small intestine would absorb very little. Three levels of folding multiply its surface several hundredfold.',
  controls: [
    toggle('plicae', 'Circular folds (plicae circulares) — about × 3', 1),
    toggle('villi', 'Villi — about × 10', 1),
    toggle('micro', 'Microvilli (brush border) — about × 20'),
    slider('len', 'Length of small intestine', 2, 7, 0.5, 6, 'm'),
  ],
  run: (v) => {
    const factor = (v.plicae ? 3 : 1) * (v.villi ? 10 : 1) * (v.micro ? 20 : 1),
      tube = Math.PI * 0.025 * v.len;
    return {
      o: { factor, area: tube * factor },
      metrics: [
        { label: 'Surface of a smooth tube', value: tube, unit: 'm²' },
        { label: 'Amplification by folding', value: factor, unit: '×' },
        { label: 'Absorptive surface', value: tube * factor, unit: 'm²' },
      ],
      bars: {
        title: 'Surface area (m²)',
        max: 350,
        items: [
          { label: 'Smooth tube', value: tube, tone: 'muted' },
          { label: 'With the folding selected', value: tube * factor, tone: 'slot' },
          {
            label: 'Reference: 600 × a 6 m tube',
            value: Math.PI * 0.025 * 6 * 600,
            tone: 'accent',
          },
        ],
      },
    };
  },
  missions: [
    goal(
      'Reach the full 600-fold amplification.',
      'All three levels of folding multiply together.',
      { micro: 1 },
      (o) => o.factor === 600,
    ),
    goal(
      'Model villous atrophy, as in untreated coeliac disease: circular folds and microvilli present, villi lost.',
      'Removing one tenfold step leaves a 60-fold amplification.',
      { villi: 0, micro: 1 },
      (o) => o.factor === 60,
    ),
    goal(
      'Model short-bowel syndrome: full folding, but a total surface below 100 m².',
      'Shorten the intestine itself.',
      { micro: 1, len: 2 },
      (o) => o.factor === 600 && o.area < 100,
    ),
  ],
  predict: {
    q: 'Which structure contributes the largest single increase in the small intestine’s absorptive surface?',
    options: ['Microvilli', 'Villi', 'Circular folds', 'The length of the ileum'],
    correct: 0,
    why: 'The brush border of microvilli on each enterocyte adds roughly a twentyfold increase and also carries the final digestive enzymes.',
  },
  model:
    'A smooth tube 2.5 cm in diameter multiplied by textbook amplification factors of 3, 10, and 20. Published estimates of true mucosal area vary several-fold depending on method; the factors show relative contributions rather than exact areas.',
};

const bleed: TopicLab = {
  id: 'anat-bleed',
  title: 'Blood loss and the body’s response',
  lead: 'What matters in a bleed is the fraction of blood volume lost, not the millilitres. The classes of haemorrhage link that fraction to the signs you would expect.',
  controls: [
    slider('loss', 'Blood lost', 0, 2500, 50, 0, 'mL'),
    slider('weight', 'Body mass', 40, 110, 5, 70, 'kg'),
  ],
  run: (v) => {
    const volume = v.weight * 70,
      pct = (v.loss / volume) * 100,
      cls = pct < 15 ? 1 : pct < 30 ? 2 : pct < 40 ? 3 : 4;
    return {
      o: { pct, cls },
      metrics: [
        { label: 'Estimated blood volume', value: volume, unit: 'mL' },
        { label: 'Fraction lost', value: pct, unit: '%' },
        { label: 'Class of haemorrhage', value: ['I', 'II', 'III', 'IV'][cls - 1] },
        {
          label: 'Expected heart rate',
          value: ['Under 100 / min', '100–120 / min', '120–140 / min', 'Over 140 / min'][cls - 1],
        },
        {
          label: 'Expected blood pressure',
          value: [
            'Normal',
            'Normal, with narrowed pulse pressure',
            'Decreased',
            'Markedly decreased',
          ][cls - 1],
        },
      ],
      bars: {
        title: 'Blood volume (mL)',
        max: 7700,
        items: [
          { label: 'Remaining', value: Math.max(0, volume - v.loss), tone: 'accent' },
          { label: 'Lost', value: v.loss, tone: 'warm' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Produce a class II haemorrhage in a 70 kg adult.',
      'Class II is a loss of 15–30% of blood volume.',
      { loss: 1000 },
      (o, v) => v.weight === 70 && o.cls === 2,
    ),
    goal(
      'Show that the same 1,000 mL is a class III haemorrhage in a 40 kg person.',
      'Smaller people have less blood to lose.',
      { loss: 1000, weight: 40 },
      (o, v) => v.loss === 1000 && o.cls === 3,
    ),
    goal(
      'Produce a class IV haemorrhage in a 70 kg adult.',
      'More than 40% of blood volume.',
      { loss: 2000 },
      (o, v) => v.weight === 70 && o.cls === 4,
    ),
  ],
  predict: {
    q: 'In early haemorrhage (about 15–30% of blood volume), blood pressure is often still normal because…',
    options: [
      'Heart rate and vasoconstriction rise to compensate',
      'No significant blood has been lost',
      'The spleen replaces the lost volume instantly',
      'Blood pressure does not depend on blood volume',
    ],
    correct: 0,
    why: 'Baroreceptor reflexes increase heart rate and constrict vessels. Tachycardia and a narrowed pulse pressure appear before systolic pressure falls — which is why blood pressure alone is a late sign.',
  },
  model:
    'Adult blood volume estimated as 70 mL per kilogram, with the widely taught four-class scheme (under 15%, 15–30%, 30–40%, over 40%). Individual responses vary with age, medication, and fitness; this is a classification aid, not a clinical tool.',
};

const energy: TopicLab = {
  id: 'anat-energy',
  title: 'Energy balance and body mass',
  lead: 'Body mass changes when energy taken in differs from energy used. Even small daily differences add up over weeks.',
  controls: [
    slider('height', 'Height', 140, 200, 1, 170, 'cm'),
    slider('weight', 'Body mass', 40, 150, 1, 70, 'kg'),
    slider('intake', 'Energy intake', 1200, 4500, 50, 2400, 'kcal/day'),
    slider('spend', 'Energy expenditure', 1200, 4500, 50, 2400, 'kcal/day'),
  ],
  run: (v) => {
    const bmi = v.weight / (v.height / 100) ** 2,
      balance = v.intake - v.spend,
      weekly = (balance * 7) / 7700;
    return {
      o: { bmi, balance, weekly },
      metrics: [
        { label: 'Body mass index', value: Number(bmi.toFixed(1)), unit: 'kg/m²' },
        {
          label: 'BMI category',
          value:
            bmi < 18.5
              ? 'Underweight'
              : bmi < 25
                ? 'Healthy range'
                : bmi < 30
                  ? 'Overweight'
                  : 'Obesity',
        },
        { label: 'Daily energy balance', value: balance, unit: 'kcal' },
        {
          label: 'Predicted change in body mass',
          value: Number(weekly.toFixed(2)),
          unit: 'kg per week',
        },
      ],
      plot: {
        title: 'Predicted mass over twelve weeks',
        x: [0, 12, 'Weeks'],
        y: [30, 160, 'Body mass (kg)'],
        curves: [{ f: (w) => v.weight + weekly * w }],
        points: [
          { x: 12, y: v.weight + weekly * 12, label: `${(v.weight + weekly * 12).toFixed(1)} kg` },
        ],
      },
    };
  },
  missions: [
    goal(
      'For a person 175 cm tall, find a body mass that gives a BMI of about 25.',
      'BMI = mass ÷ height², with height in metres.',
      { height: 175, weight: 77 },
      (o, v) => v.height === 175 && near(o.bmi, 25, 0.2),
    ),
    goal(
      'Set an energy deficit that would lose about half a kilogram per week.',
      'About 7,700 kcal corresponds to one kilogram of body fat.',
      { intake: 1850 },
      (o) => near(o.weekly, -0.5, 0.03),
    ),
    goal(
      'Set a surplus that would add at least 0.9 kg per week.',
      'A surplus of about a thousand kilocalories a day.',
      { intake: 3400 },
      (o) => o.weekly >= 0.9,
    ),
  ],
  predict: {
    q: 'A person consistently eats 250 kcal per day more than they expend. Over one month, the model predicts a gain of about…',
    options: ['1 kg', '0.1 kg', '5 kg', '10 kg'],
    correct: 0,
    why: '250 kcal × 30 days = 7,500 kcal, close to the 7,700 kcal associated with a kilogram of fat. Small daily imbalances accumulate.',
  },
  model:
    'BMI = mass / height². Mass change assumes a fixed 7,700 kcal per kilogram and constant expenditure. In reality expenditure falls as mass is lost and the composition of the change varies, so long-term changes are smaller than this linear projection; BMI does not distinguish muscle from fat.',
};

const starling: TopicLab = {
  id: 'anat-starling',
  title: 'Starling forces and lymph formation',
  lead: 'Four pressures decide whether fluid leaves or re-enters a capillary. The small excess that filters out each day is what the lymphatic system must return.',
  controls: [
    slider('pc', 'Capillary hydrostatic pressure', 10, 45, 1, 35, 'mmHg'),
    slider('pi', 'Interstitial hydrostatic pressure', -5, 10, 1, 0, 'mmHg'),
    slider('oc', 'Plasma oncotic pressure', 10, 35, 1, 25, 'mmHg'),
    slider('oi', 'Interstitial oncotic pressure', 0, 15, 1, 1, 'mmHg'),
  ],
  run: (v) => {
    const net = v.pc - v.pi - (v.oc - v.oi),
      size = Math.min(60, Math.abs(net) * 3);
    return {
      o: { net },
      metrics: [
        { label: 'Net filtration pressure', value: net, unit: 'mmHg' },
        {
          label: 'Direction of fluid movement',
          value:
            net > 0
              ? 'Out of the capillary (filtration)'
              : net < 0
                ? 'Into the capillary (reabsorption)'
                : 'No net movement',
        },
        {
          label: 'Risk of oedema',
          value:
            net > 15
              ? 'High — filtration likely exceeds lymph drainage'
              : 'Low while lymphatics keep pace',
        },
      ],
      sceneLabel: `Capillary with a net filtration pressure of ${net} millimetres of mercury`,
      scene: [
        rect(120, 140, 400, 60, 'warm', true, 0.3, 30),
        rect(120, 140, 400, 60, 'ink', false, 1, 30),
        text(320, 176, 'capillary', 'middle'),
        text(320, 60, 'interstitial fluid', 'middle', 'muted'),
        ...(net > 0
          ? [
              ...arrow(260, 136, 260, 136 - size, 'slot', 3),
              ...arrow(380, 204, 380, 204 + size, 'slot', 3),
            ]
          : net < 0
            ? [
                ...arrow(260, 136 - size, 260, 136, 'cool', 3),
                ...arrow(380, 204 + size, 380, 204, 'cool', 3),
              ]
            : []),
        text(
          320,
          300,
          `(P_c − P_i) − (π_c − π_i) = (${v.pc} − ${v.pi}) − (${v.oc} − ${v.oi}) = ${net} mmHg`,
          'middle',
          'slot',
        ),
      ],
    };
  },
  missions: [
    goal(
      'Lower capillary hydrostatic pressure to model the venous end, with a net pressure of about −8 mmHg.',
      'Pressure falls along the capillary while oncotic pressure stays roughly constant.',
      { pc: 16 },
      (o) => near(o.net, -8, 0.5),
    ),
    goal(
      'Model low blood protein: reduce plasma oncotic pressure until net filtration reaches at least +20 mmHg.',
      'Less protein in plasma means less pull holding fluid in.',
      { oc: 15 },
      (o, v) => v.pc === 35 && o.net >= 20,
    ),
    goal(
      'Find a capillary pressure at which filtration and reabsorption exactly balance.',
      'Set the hydrostatic difference equal to the oncotic difference.',
      { pc: 24 },
      (o) => o.net === 0,
    ),
  ],
  predict: {
    q: 'Liver failure lowers the concentration of plasma albumin. The expected result is…',
    options: [
      'Oedema, because less fluid is drawn back into capillaries',
      'Dehydration of the tissues',
      'Higher blood pressure',
      'No change in fluid distribution',
    ],
    correct: 0,
    why: 'Albumin provides most of the plasma oncotic pressure that opposes filtration. With less of it, net filtration rises and fluid accumulates in tissues and body cavities.',
  },
  model:
    'Classic Starling relation with a reflection coefficient of 1: net pressure = (P_c − P_i) − (π_c − π_i). Current physiology recognises that the endothelial glycocalyx limits reabsorption, so most filtered fluid returns by lymph rather than at the venous end.',
};

const clonal: TopicLab = {
  id: 'anat-clonal',
  title: 'Clonal expansion of lymphocytes',
  lead: 'Only a handful of lymphocytes recognise any one antigen. An effective response needs millions — reached by repeated division of the selected clone.',
  controls: [
    slider('start', 'Antigen-specific cells at the start', 10, 1000, 10, 10, ''),
    slider('dt', 'Time for one division', 6, 24, 1, 8, 'h'),
    slider('days', 'Days since activation', 0, 10, 0.5, 0, ''),
  ],
  run: (v) => {
    const cells = (d: number) => v.start * 2 ** ((d * 24) / v.dt);
    return {
      o: { cells: cells(v.days), divisions: (v.days * 24) / v.dt },
      metrics: [
        {
          label: 'Cells in the clone',
          value: cells(v.days) < 1e6 ? Math.round(cells(v.days)) : cells(v.days).toExponential(2),
        },
        { label: 'Divisions completed', value: (v.days * 24) / v.dt },
        {
          label: 'Days to pass one million cells',
          value: Number(((Math.log2(1e6 / v.start) * v.dt) / 24).toFixed(1)),
        },
      ],
      plot: {
        title: 'Exponential growth on a logarithmic scale',
        x: [0, 10, 'Days since activation'],
        y: [0, 12, 'log₁₀ (cells)'],
        curves: [{ f: (d) => Math.log10(cells(d)) }],
        hlines: [{ y: 6, label: 'one million cells' }],
        points: [
          { x: v.days, y: Math.log10(cells(v.days)), label: cells(v.days).toExponential(1) },
        ],
      },
    };
  },
  missions: [
    goal(
      'Starting from 10 naive cells dividing every 8 hours, find the first half-day mark by which the clone exceeds a million.',
      'Three divisions a day: you need about 17 doublings.',
      { days: 6 },
      (o, v) => v.start === 10 && v.dt === 8 && o.cells >= 1e6 && v.days <= 6,
    ),
    goal(
      'Model a memory response: start with 1,000 specific cells and pass a million by day 3.5.',
      'A larger starting clone has a head start of several divisions.',
      { start: 1000, days: 3.5 },
      (o, v) => v.start === 1000 && o.cells >= 1e6 && v.days <= 3.5,
    ),
    goal(
      'Slow division to once every 24 hours and read the clone size after 10 days.',
      'Only ten doublings fit in ten days.',
      { dt: 24, days: 10 },
      (o, v) => v.dt === 24 && v.days === 10,
    ),
  ],
  predict: {
    q: 'A second exposure to the same antigen produces a faster response mainly because…',
    options: [
      'Many more antigen-specific memory cells already exist',
      'The antigen is weaker the second time',
      'Innate immunity has learned the antigen',
      'Antibodies from the first response never decline',
    ],
    correct: 0,
    why: 'Memory cells are far more numerous than the original naive precursors and are activated more easily, so the clone reaches effective size days sooner.',
  },
  model:
    'Unrestrained exponential doubling, N = N₀ · 2^(t / division time). Real expansion is limited by antigen, cytokines, and space, and is followed by contraction in which most effector cells die, leaving a memory population.',
};

const complement: TopicLab = {
  id: 'anat-complement',
  title: 'Complement pathways and what a deficiency removes',
  lead: 'Three triggers converge on one enzyme, the C3 convertase, and three effects follow. Remove one component and see which effects survive.',
  controls: [
    toggle('ab', 'Antibody is bound to the microbe (classical trigger)'),
    toggle('mbl', 'Mannose-binding lectin has bound (lectin trigger)'),
    toggle('alt', 'Surface lacks host regulators (alternative trigger)'),
    choice('def', 'Inherited deficiency', ['None', 'C1q', 'C3', 'C5–C9 (terminal components)'], 0),
  ],
  run: (v) => {
    const trigger = (v.ab && v.def !== 1) || v.mbl || v.alt ? 1 : 0,
      opson = trigger && v.def !== 2 ? 1 : 0,
      mac = opson && v.def !== 3 ? 1 : 0;
    const box = (x: number, y: number, label: string, on: number, w = 150): Shape[] => [
      rect(x, y, w, 34, on ? 'slot' : 'muted', !!on, on ? 0.35 : 1, 6),
      text(x + w / 2, y + 22, label, 'middle', on ? 'ink' : 'muted', 12),
    ];
    return {
      o: { trigger, opson, mac, ab: v.ab },
      metrics: [
        {
          label: 'C3 convertase formed',
          value: opson ? 'Yes' : trigger ? 'Triggered, but there is no C3 to cleave' : 'No',
        },
        { label: 'Opsonisation by C3b', value: opson ? 'Yes' : 'No' },
        { label: 'Inflammation from C3a and C5a', value: opson ? 'Yes' : 'No' },
        { label: 'Membrane attack complex', value: mac ? 'Yes' : 'No' },
      ],
      sceneLabel: `Complement cascade: opsonisation ${opson ? 'active' : 'absent'}, membrane attack complex ${mac ? 'formed' : 'absent'}`,
      scene: [
        ...box(40, 30, 'Classical (antibody)', v.ab && v.def !== 1 ? 1 : 0),
        ...box(245, 30, 'Lectin (MBL)', v.mbl),
        ...box(450, 30, 'Alternative', v.alt),
        ...arrow(115, 66, 300, 120, 'muted', 1.5),
        ...arrow(320, 66, 320, 120, 'muted', 1.5),
        ...arrow(525, 66, 340, 120, 'muted', 1.5),
        ...box(235, 124, 'C3 convertase → C3b + C3a', opson, 170),
        ...arrow(280, 160, 115, 230, 'muted', 1.5),
        ...arrow(320, 160, 320, 230, 'muted', 1.5),
        ...arrow(360, 160, 525, 230, 'muted', 1.5),
        ...box(40, 234, 'Opsonisation', opson),
        ...box(245, 234, 'Inflammation', opson),
        ...box(450, 234, 'Membrane attack', mac),
      ],
    };
  },
  missions: [
    goal(
      'Activate complement without any antibody.',
      'The lectin and alternative pathways belong to innate immunity.',
      { mbl: 1 },
      (o) => o.ab === 0 && o.opson === 1,
    ),
    goal(
      'Show that antibody alone cannot activate complement in a person lacking C1q.',
      'C1q is the classical pathway’s recognition molecule.',
      { ab: 1, def: 1 },
      (o, v) => v.def === 1 && v.ab === 1 && v.mbl === 0 && v.alt === 0 && o.opson === 0,
    ),
    goal(
      'Show that C3 deficiency abolishes every effect even with all three triggers present.',
      'All three pathways converge on C3.',
      { ab: 1, mbl: 1, alt: 1, def: 2 },
      (o, v) => v.def === 2 && v.ab === 1 && v.mbl === 1 && v.alt === 1 && o.opson === 0,
    ),
    goal(
      'Show a deficiency that leaves opsonisation intact but removes the membrane attack complex.',
      'The terminal components act after C3.',
      { ab: 1, def: 3 },
      (o) => o.opson === 1 && o.mac === 0,
    ),
  ],
  predict: {
    q: 'People who lack the terminal complement components (C5–C9) are especially prone to recurrent infection with…',
    options: ['Neisseria bacteria', 'All viruses', 'Fungi only', 'Intestinal worms'],
    correct: 0,
    why: 'Opsonisation still works, so most bacteria are cleared. Neisseria are unusually dependent on lysis by the membrane attack complex for control.',
  },
  model:
    'A logic-level summary of complement: three triggers, convergence on C3, and three outcome groups. Regulatory proteins, the amplification loop, and partial deficiencies are omitted; real cascades are graded, not on/off.',
};

const titer: TopicLab = {
  id: 'anat-titer',
  title: 'Reading antibody titres from serial dilutions',
  lead: 'Serum is diluted twofold again and again until it no longer gives a positive reaction. Comparing an early and a late sample shows whether an infection is recent.',
  controls: [
    slider('acute', 'Acute sample: last positive well', 1, 10, 1, 3, ''),
    slider('conv', 'Convalescent sample: last positive well', 1, 12, 1, 3, ''),
  ],
  run: (v) => {
    const fold = 2 ** (v.conv - v.acute),
      row = (y: number, last: number, tone: Tone): Shape[] =>
        Array.from({ length: 12 }, (_, i) =>
          circle(110 + i * 40, y, 14, i < last ? tone : 'muted', i < last, i < last ? 0.8 : 1),
        );
    return {
      o: { fold, steps: v.conv - v.acute },
      metrics: [
        { label: 'Acute titre', value: `1 : ${2 ** v.acute}` },
        { label: 'Convalescent titre', value: `1 : ${2 ** v.conv}` },
        { label: 'Change', value: fold >= 1 ? `${fold}-fold rise` : `${1 / fold}-fold fall` },
        {
          label: 'Interpretation',
          value:
            fold >= 4
              ? 'Significant rise — evidence of recent infection or immunisation'
              : 'Not significant — within the test’s one-dilution variability',
        },
      ],
      sceneLabel: `Two rows of twelve wells; acute sample positive to well ${v.acute}, convalescent to well ${v.conv}`,
      scene: [
        text(40, 104, 'acute', 'start', 'muted'),
        ...row(100, v.acute, 'accent'),
        text(40, 194, 'later', 'start', 'muted'),
        ...row(190, v.conv, 'slot'),
        ...Array.from({ length: 12 }, (_, i) =>
          text(110 + i * 40, 250, `1:${2 ** (i + 1)}`, 'middle', 'muted', 9),
        ),
        text(
          320,
          300,
          'Filled wells are positive; the titre is the last positive dilution',
          'middle',
          'muted',
          11,
        ),
      ],
    };
  },
  missions: [
    goal(
      'Show a twofold rise between the samples and read how it is interpreted.',
      'One more positive well doubles the titre.',
      { conv: 4 },
      (o) => o.steps === 1,
    ),
    goal(
      'Show the smallest rise that counts as significant.',
      'Two dilution steps make a fourfold change.',
      { conv: 5 },
      (o) => o.steps === 2,
    ),
    goal(
      'From an acute titre of 1:8, show a convalescent titre of 1:256.',
      '256 is 2⁸, so the eighth well must be the last positive one.',
      { conv: 8 },
      (o, v) => v.acute === 3 && v.conv === 8,
    ),
  ],
  predict: {
    q: 'Why is a fourfold rise in antibody titre, rather than a twofold rise, required as evidence of recent infection?',
    options: [
      'Twofold differences fall within the ordinary variability of a dilution assay',
      'Antibodies always double every day',
      'A twofold rise means the patient is immune',
      'Laboratories cannot make twofold dilutions',
    ],
    correct: 0,
    why: 'Repeating the same sample can differ by one dilution step. Requiring two steps guards against calling normal assay variation a real change.',
  },
  model:
    'Twofold serial dilutions starting at 1:2, with the titre defined as the highest dilution still positive. Paired sera are tested together in the same run to minimise variation. Real assays differ in starting dilution and end-point definition.',
};

function cd4(years: number, art: number, start: number) {
  const untreated = (t: number) =>
    t < 0.25
      ? 1000 - 2000 * t
      : t < 0.75
        ? 500 + 400 * (t - 0.25)
        : Math.max(20, 700 - 55 * (t - 0.75));
  if (!art || years <= start) return untreated(years);
  const base = untreated(start);
  return base + (800 - base) * (1 - Math.exp(-(years - start) / 2));
}
const hiv: TopicLab = {
  id: 'anat-cd4',
  title: 'CD4 count through untreated and treated HIV infection',
  lead: 'Follow helper T-cell numbers from infection onward. The count, not the calendar, marks the stages — and treatment changes the whole trajectory.',
  controls: [
    slider('years', 'Years since infection', 0, 12, 0.25, 0, ''),
    toggle('art', 'Antiretroviral therapy is started'),
    slider('start', 'Year therapy begins', 1, 10, 1, 3, ''),
  ],
  run: (v) => {
    const now = cd4(v.years, v.art, v.start);
    return {
      o: { cd4: now },
      metrics: [
        { label: 'CD4 T cells', value: Math.round(now), unit: 'per µL' },
        {
          label: 'Stage',
          value:
            v.years < 0.25
              ? 'Acute infection'
              : now >= 500
                ? 'Clinical latency (or immune recovery on therapy)'
                : now >= 200
                  ? 'Advancing immunodeficiency'
                  : 'AIDS-defining range (below 200)',
        },
        {
          label: 'Opportunistic infection risk',
          value: now < 200 ? 'High' : now < 500 ? 'Increasing' : 'Low',
        },
      ],
      plot: {
        title: 'Helper T-cell count over time',
        x: [0, 12, 'Years since infection'],
        y: [0, 1100, 'CD4 cells per µL'],
        curves: [
          { f: (t) => cd4(t, v.art, v.start), label: v.art ? 'with therapy' : 'untreated' },
          { f: (t) => cd4(t, 0, 0), label: 'untreated course', dash: true, tone: 'muted' },
        ],
        hlines: [{ y: 200, label: '200 per µL' }],
        points: [{ x: v.years, y: now, label: `${Math.round(now)}` }],
      },
    };
  },
  missions: [
    goal(
      'Without treatment, find when the CD4 count first falls below 200 per µL.',
      'After the acute phase the count declines by roughly 55 cells per µL each year.',
      { years: 10 },
      (o, v) => v.art === 0 && o.cd4 < 200 && v.years <= 10,
    ),
    goal(
      'Start therapy in year 3 and show a count above 600 by year 8.',
      'Immune recovery is gradual but substantial when treatment starts early.',
      { art: 1, years: 8 },
      (o, v) => v.art === 1 && v.start === 3 && o.cd4 > 600,
    ),
    goal(
      'Start therapy late, in year 10, and show that the count is still below 450 a year afterwards.',
      'Recovery from a very low count takes longer and may be incomplete.',
      { art: 1, start: 10, years: 11 },
      (o, v) => v.art === 1 && v.start === 10 && v.years === 11 && o.cd4 < 450,
    ),
  ],
  predict: {
    q: 'Loss of CD4 helper T cells weakens almost every part of adaptive immunity because these cells…',
    options: [
      'Coordinate B cells, cytotoxic T cells, and macrophages through cytokines',
      'Produce all antibodies themselves',
      'Engulf bacteria directly',
      'Form the skin barrier',
    ],
    correct: 0,
    why: 'Helper T cells are the organisers: without their signals, antibody class switching, cytotoxic T-cell responses, and macrophage activation all falter.',
  },
  model:
    'A schematic average course: an acute dip, partial recovery, then a steady decline of about 55 cells per µL per year, with therapy producing an exponential approach to 800. Individual courses vary enormously; this curve is for reasoning about stages, not for prediction.',
};

const conduction: TopicLab = {
  id: 'anat-conduction',
  title: 'Demyelination and nerve conduction',
  lead: 'Myelin lets an impulse jump between nodes. Strip it away, as in multiple sclerosis, and signals slow — or fail to arrive at all.',
  controls: [
    slider('diam', 'Axon diameter', 1, 20, 1, 10, 'µm'),
    slider('myelin', 'Myelin remaining', 0, 100, 5, 100, '%'),
    slider('len', 'Length of the pathway', 0.1, 1.2, 0.1, 1, 'm'),
  ],
  run: (v) => {
    const bare = 1.5 * Math.sqrt(v.diam),
      full = 6 * v.diam,
      blocked = v.myelin < 20 ? 1 : 0,
      speed = bare + (full - bare) * (v.myelin / 100) ** 2,
      latency = (v.len / speed) * 1000;
    return {
      o: { speed, latency, blocked },
      metrics: [
        { label: 'Conduction velocity', value: speed, unit: 'm/s' },
        { label: 'Time for a signal to travel the pathway', value: latency, unit: 'ms' },
        {
          label: 'Transmission',
          value: blocked
            ? 'Likely conduction block — impulses may fail'
            : speed < full * 0.6
              ? 'Slowed and less reliable'
              : 'Normal saltatory conduction',
        },
      ],
      plot: {
        title: 'Velocity as myelin is lost',
        x: [0, 100, 'Myelin remaining (%)'],
        y: [0, 130, 'Conduction velocity (m/s)'],
        curves: [{ f: (m) => bare + (full - bare) * (m / 100) ** 2 }],
        vlines: [{ x: 20, label: 'block likely below here' }],
        points: [{ x: v.myelin, y: speed, label: `${speed.toFixed(0)} m/s` }],
      },
    };
  },
  missions: [
    goal(
      'For the starting axon, remove enough myelin to roughly double the signal’s travel time.',
      'Travel time doubles when velocity halves.',
      { myelin: 70 },
      (o, v) => v.diam === 10 && near(v.len, 1, 1e-9) && near(o.latency, 33.3, 2.5),
    ),
    goal(
      'Demyelinate the axon far enough to produce conduction block.',
      'Below about a fifth of normal myelin, the impulse cannot reach the next node.',
      { myelin: 10 },
      (o) => o.blocked === 1,
    ),
    goal(
      'Show that a thin, fully myelinated 2 µm fibre takes more than 80 ms to cover one metre.',
      'Velocity is roughly proportional to diameter in myelinated fibres.',
      { diam: 2 },
      (o, v) => v.myelin === 100 && o.latency > 80,
    ),
  ],
  predict: {
    q: 'In multiple sclerosis, symptoms such as slowed movement and visual delay arise because demyelination…',
    options: [
      'Slows or blocks conduction along affected axons',
      'Destroys muscle fibres directly',
      'Increases neurotransmitter release',
      'Speeds impulses beyond what synapses can follow',
    ],
    correct: 0,
    why: 'Without myelin, current leaks and the impulse must be regenerated continuously or fails. Timing-dependent functions are affected first.',
  },
  model:
    'Rule-of-thumb velocities: about 6 m/s per µm of diameter for myelinated fibres and proportional to the square root of diameter for unmyelinated ones, blended by the square of the myelin remaining. The 20% block threshold is illustrative; real block also depends on temperature and firing rate.',
};

const abg: TopicLab = {
  id: 'anat-abg',
  title: 'Arterial blood gas interpreter',
  lead: 'Carbon dioxide is the respiratory acid; bicarbonate is the metabolic base. Their ratio sets the pH, and which one moved first names the disorder.',
  controls: [
    slider('pco2', 'PaCO₂', 15, 90, 1, 40, 'mmHg'),
    slider('hco3', 'Bicarbonate', 8, 45, 1, 24, 'mmol/L'),
  ],
  run: (v) => {
    const ph = (pco2: number) => 6.1 + Math.log10(v.hco3 / (0.03 * pco2)),
      now = ph(v.pco2),
      id =
        now < 7.35
          ? v.pco2 > 45 && v.hco3 >= 22
            ? 1
            : v.hco3 < 22 && v.pco2 <= 45
              ? 2
              : 5
          : now > 7.45
            ? v.pco2 < 35 && v.hco3 <= 26
              ? 3
              : v.hco3 > 26 && v.pco2 >= 35
                ? 4
                : 5
            : v.pco2 < 35 || v.pco2 > 45 || v.hco3 < 22 || v.hco3 > 26
              ? 6
              : 0,
      winters = 1.5 * v.hco3 + 8,
      comp = id === 2 && Math.abs(v.pco2 - winters) <= 2 ? 1 : 0;
    return {
      o: { ph: now, id, comp },
      metrics: [
        { label: 'pH', value: Number(now.toFixed(2)) },
        {
          label: 'Interpretation',
          value: [
            'Normal',
            'Respiratory acidosis',
            'Metabolic acidosis',
            'Respiratory alkalosis',
            'Metabolic alkalosis',
            'Combined disorder — both systems push the same way',
            'Compensated or mixed disorder — pH normal with abnormal values',
          ][id],
        },
        {
          label: 'Expected PaCO₂ if a metabolic acidosis is compensated',
          value:
            id === 2
              ? `${winters.toFixed(0)} ± 2 mmHg${comp ? ' — matched' : ''}`
              : 'Not applicable',
        },
      ],
      plot: {
        title: `pH against PaCO₂ at a bicarbonate of ${v.hco3} mmol/L`,
        x: [15, 90, 'PaCO₂ (mmHg)'],
        y: [6.9, 7.8, 'pH'],
        curves: [{ f: ph }],
        hlines: [
          { y: 7.45, label: '7.45' },
          { y: 7.35, label: '7.35' },
        ],
        points: [{ x: v.pco2, y: now, label: `pH ${now.toFixed(2)}` }],
      },
    };
  },
  missions: [
    goal(
      'Produce an acute respiratory acidosis.',
      'Raise PaCO₂ well above 45 mmHg while bicarbonate stays near normal.',
      { pco2: 60, hco3: 26 },
      (o) => o.id === 1,
    ),
    goal(
      'Produce a metabolic acidosis with appropriate respiratory compensation.',
      'Lower bicarbonate to 12, then set PaCO₂ to 1.5 × 12 + 8.',
      { pco2: 26, hco3: 12 },
      (o) => o.id === 2 && o.comp === 1,
    ),
    goal(
      'Produce a respiratory alkalosis, as in hyperventilation.',
      'Blow off CO₂: lower PaCO₂ below 35 mmHg.',
      { pco2: 25 },
      (o) => o.id === 3,
    ),
  ],
  predict: {
    q: 'A patient has pH 7.25, PaCO₂ 60 mmHg, and bicarbonate 26 mmol/L. The primary disturbance is…',
    options: [
      'Respiratory acidosis',
      'Metabolic acidosis',
      'Respiratory alkalosis',
      'Metabolic alkalosis',
    ],
    correct: 0,
    why: 'The pH is acidic and the PaCO₂ is high, which explains it. Bicarbonate is essentially normal, so the kidneys have not yet compensated — an acute process.',
  },
  model:
    'Henderson–Hasselbalch: pH = 6.1 + log₁₀([HCO₃⁻] / (0.03 × PaCO₂)). Classification uses normal ranges of pH 7.35–7.45, PaCO₂ 35–45 mmHg, and bicarbonate 22–26 mmol/L, with Winter’s formula for expected compensation. A learning aid only — not for clinical decisions.',
};

function retention(days: number, reviews: number, pattern: number) {
  const times = Array.from({ length: reviews }, (_, i) =>
    pattern === 0
      ? ((i + 1) * 3) / reviews
      : pattern === 1
        ? ((i + 1) * days) / (reviews + 1)
        : (days * (2 ** (i + 1) - 1)) / (2 ** (reviews + 1) - 1),
  );
  let stability = 3,
    last = 0;
  for (const t of times) {
    const recalled = Math.exp(-(t - last) / stability);
    stability *= recalled < 0.3 ? 1.3 : 1.4 + 1.8 * (1 - recalled);
    last = t;
  }
  return { final: Math.exp(-(days - last) / stability) * 100, stability, times };
}
const study: TopicLab = {
  id: 'anat-study',
  title: 'Spacing your review before a tournament',
  lead: 'Memory fades, and each successful recall slows the fading — most of all when the recall took some effort. Compare ways of scheduling the same number of reviews.',
  controls: [
    slider('days', 'Days until the tournament', 5, 60, 1, 30, ''),
    slider('reviews', 'Number of review sessions', 0, 6, 1, 1, ''),
    choice(
      'pattern',
      'How the sessions are scheduled',
      ['All within the first three days', 'Evenly spaced', 'Expanding intervals'],
      0,
    ),
  ],
  run: (v) => {
    const r = retention(v.days, v.reviews, v.pattern);
    return {
      o: { final: r.final, stability: r.stability },
      metrics: [
        { label: 'Predicted recall on tournament day', value: r.final, unit: '%' },
        {
          label: 'Review days',
          value: r.times.length ? r.times.map((t) => t.toFixed(1)).join(', ') : 'None',
        },
        { label: 'Memory stability by the end', value: r.stability, unit: 'days' },
      ],
      bars: {
        title: 'Predicted recall on tournament day (%) by schedule',
        max: 100,
        items: ['Massed early', 'Evenly spaced', 'Expanding'].map((name, i) => ({
          label: name,
          value: retention(v.days, v.reviews, i).final,
          tone: i === v.pattern ? ('slot' as const) : ('muted' as const),
        })),
      },
    };
  },
  missions: [
    goal(
      'With four review sessions and 30 days, find a schedule that keeps recall above 60%.',
      'Spread the sessions so that each one requires a little effort to recall.',
      { reviews: 4, pattern: 1 },
      (o, v) => v.days === 30 && v.reviews === 4 && o.final > 60,
    ),
    goal(
      'Show that six sessions crammed into the first three days still leave recall under 50% a month later.',
      'Reviewing what you still remember perfectly adds little.',
      { reviews: 6, pattern: 0 },
      (o, v) => v.days === 30 && v.reviews === 6 && v.pattern === 0 && o.final < 50,
    ),
    goal(
      'With no review at all, read the recall expected after 30 days.',
      'This is the baseline the other schedules must beat.',
      { reviews: 0 },
      (o, v) => v.reviews === 0 && v.days === 30,
    ),
  ],
  predict: {
    q: 'For the same total study time, which approach gives the best recall weeks later?',
    options: [
      'Several shorter sessions spread over time, each starting with recall from memory',
      'One long session the night before',
      'Rereading the notes three times in one day',
      'Highlighting the textbook',
    ],
    correct: 0,
    why: 'Spaced retrieval practice is among the most reliable findings in learning research: effortful recall after a delay strengthens memory far more than immediate repetition.',
  },
  model:
    'An illustrative forgetting-curve model: recall = e^(−t/stability), with each review multiplying stability by more when recall was harder. The constants are chosen to show the spacing effect qualitatively; they are not fitted to any individual and real memory depends on the material and the learner.',
};

export const anatomyExtras: EventExtras = {
  eventId: 'anatomy-and-physiology',
  labs: [
    planes,
    airways,
    boyle,
    spirometry,
    hemoglobin,
    shunt,
    enzymes,
    surface,
    bleed,
    energy,
    starling,
    clonal,
    complement,
    titer,
    hiv,
    conduction,
    abg,
    study,
  ],
  lessons: {
    'anat-u1-l1': {
      labs: ['anat-planes'],
      sort: sort(
        'Which directional term fits?',
        ['Superior / inferior', 'Anterior / posterior', 'Proximal / distal'],
        [
          ['The nose is ___ to the chin', 0],
          ['The sternum is ___ to the spine', 1],
          ['The elbow is ___ to the wrist', 2],
          ['The diaphragm is ___ to the lungs', 0],
          ['The heart is ___ to the vertebral column', 1],
          ['The knee is ___ to the ankle', 2],
        ],
      ),
      checks: [
        check(
          1,
          'A section that divides the body into anterior and posterior portions is…',
          ['Frontal (coronal)', 'Sagittal', 'Transverse', 'Oblique'],
          'A frontal plane runs side to side like a headband; a sagittal plane separates left from right, and a transverse plane separates top from bottom.',
        ),
      ],
    },
    'anat-u1-l2': {
      phet: [
        phet(
          'membrane-transport',
          'Membrane Transport',
          'Gradients drive most exchange in the body, but a gradient alone is not enough: the membrane must also let the solute through.',
          'Add a solute to one side with no transport proteins. Does it cross? Then add a channel and compare.',
          'Create a concentration gradient and watch the net movement. What happens once both sides are equal?',
          'Insert a pump and supply energy. Move solute against its gradient, then explain why this cannot be called diffusion.',
        ),
      ],
      sort: sort(
        'Negative or positive feedback?',
        ['Negative feedback', 'Positive feedback'],
        [
          ['Insulin release after a meal lowers blood glucose', 0],
          ['Oxytocin strengthens contractions during labour', 1],
          ['Sweating when body temperature rises', 0],
          ['Platelets recruiting more platelets to a clot', 1],
          ['Faster breathing when blood CO₂ rises', 0],
          ['Sodium channels opening during the upstroke of an action potential', 1],
        ],
      ),
      checks: [
        check(
          0,
          'In a feedback loop, the component that compares the measured value with the set point is the…',
          ['Integrator (control centre)', 'Receptor', 'Effector', 'Stimulus'],
          'Receptors detect, the integrator compares and decides, and effectors carry out the response.',
        ),
      ],
    },
    'anat-u2-l1': {
      labs: ['anat-airways'],
      sort: sort(
        'Conducting zone or respiratory zone?',
        ['Conducting zone', 'Respiratory zone'],
        [
          ['Trachea', 0],
          ['Alveolar ducts', 1],
          ['Primary bronchi', 0],
          ['Respiratory bronchioles', 1],
          ['Terminal bronchioles', 0],
          ['Alveolar sacs', 1],
        ],
      ),
      checks: [
        check(
          2,
          'The mucociliary escalator clears inhaled particles by…',
          [
            'Trapping them in mucus that cilia sweep toward the pharynx',
            'Dissolving them in surfactant',
            'Coughing alone',
            'Absorbing them into the blood',
          ],
          'Goblet cells and glands supply mucus; ciliated epithelium moves it upward. Smoking paralyses cilia, which is why clearance fails.',
        ),
      ],
    },
    'anat-u2-l2': {
      labs: ['anat-boyle'],
      sort: sort(
        'Inspiration or expiration?',
        ['Quiet inspiration', 'Quiet expiration', 'Forced expiration'],
        [
          ['Diaphragm contracts and flattens', 0],
          ['Elastic recoil of the lungs, with no muscle effort', 1],
          ['Internal intercostals and abdominal muscles contract', 2],
          ['External intercostals lift the ribs', 0],
          ['Diaphragm relaxes and domes upward', 1],
          ['Used when blowing out candles', 2],
        ],
      ),
      checks: [
        check(
          2,
          'If air enters the pleural cavity (a pneumothorax), the lung on that side…',
          [
            'Collapses, because the negative intrapleural pressure is lost',
            'Over-inflates',
            'Is unaffected',
            'Fills with blood',
          ],
          'Intrapleural pressure is normally below atmospheric and holds the lung against the chest wall. Remove that difference and elastic recoil collapses the lung.',
        ),
      ],
    },
    'anat-u3-l1': {
      labs: ['anat-spirometry'],
      sort: sort(
        'Volume or capacity?',
        ['Volume (a single compartment)', 'Capacity (a sum of volumes)'],
        [
          ['Tidal volume', 0],
          ['Vital capacity', 1],
          ['Residual volume', 0],
          ['Functional residual capacity', 1],
          ['Inspiratory reserve volume', 0],
          ['Total lung capacity', 1],
        ],
      ),
      checks: [
        check(
          1,
          'A person breathes 500 mL per breath, 12 times a minute, with 150 mL of dead space. Alveolar ventilation is…',
          ['4.2 L/min', '6.0 L/min', '1.8 L/min', '7.8 L/min'],
          '(500 − 150) mL × 12 = 4,200 mL/min. Minute ventilation (6.0 L/min) overstates the fresh air reaching the alveoli.',
        ),
      ],
    },
    'anat-u3-l2': {
      labs: ['anat-hemoglobin'],
      sort: sort(
        'How is the gas carried in blood?',
        ['Bound to hemoglobin', 'As bicarbonate', 'Dissolved in plasma'],
        [
          ['About 98% of oxygen', 0],
          ['About 70% of carbon dioxide', 1],
          ['About 1.5% of oxygen', 2],
          ['Carbaminohemoglobin', 0],
          ['Formed by carbonic anhydrase in red cells', 1],
          ['Sets the partial pressure measured in a blood gas', 2],
        ],
      ),
      checks: [
        check(
          1,
          'Hemoglobin’s oxygen curve is sigmoidal rather than a simple hyperbola because of…',
          [
            'Cooperative binding between its four subunits',
            'Its very high molecular mass',
            'The presence of iron',
            'Dissolved oxygen in plasma',
          ],
          'Binding of the first oxygen makes the next easier. The steep middle portion lets small drops in tissue PO₂ release large amounts of oxygen.',
        ),
      ],
    },
    'anat-u4-l1': {
      labs: ['anat-spirometry'],
      sort: sort(
        'Asthma or COPD?',
        ['More typical of asthma', 'More typical of COPD'],
        [
          ['Airflow limitation that reverses with a bronchodilator', 0],
          ['Long smoking history', 1],
          ['Onset often in childhood', 0],
          ['Destruction of alveolar walls (emphysema)', 1],
          ['Episodic symptoms triggered by allergens', 0],
          ['Progressive, largely irreversible obstruction', 1],
        ],
      ),
      checks: [
        check(
          0,
          'In obstructive lung disease the FEV₁/FVC ratio is reduced because…',
          [
            'Narrowed airways slow expiration more than they reduce total exhaled volume',
            'The lungs cannot expand',
            'The diaphragm is paralysed',
            'Residual volume is zero',
          ],
          'FEV₁ falls sharply while FVC is preserved or only slightly reduced. In restriction both fall together, so the ratio stays normal or rises.',
        ),
      ],
    },
    'anat-u4-l2': {
      labs: ['anat-vq'],
      sort: sort(
        'Obstructive or restrictive?',
        ['Obstructive', 'Restrictive'],
        [
          ['Emphysema', 0],
          ['Pulmonary fibrosis', 1],
          ['Chronic bronchitis', 0],
          ['Severe scoliosis limiting chest expansion', 1],
          ['Increased total lung capacity', 0],
          ['Reduced lung compliance', 1],
        ],
      ),
      checks: [
        check(
          0,
          'Lobar pneumonia causes hypoxemia chiefly because…',
          [
            'Alveoli fill with fluid and are perfused but not ventilated',
            'The trachea is blocked',
            'Hemoglobin is destroyed',
            'The diaphragm stops contracting',
          ],
          'Consolidated alveoli act as a shunt: blood passes them without picking up oxygen, lowering the saturation of the mixed arterial blood.',
        ),
      ],
    },
    'anat-u5-l1': {
      labs: ['anat-enzymes'],
      phet: [
        phet(
          'ph-scale',
          'pH Scale',
          'Gastric juice is about a million times more acidic than blood. See what that means on a logarithmic scale.',
          'Compare the H₃O⁺ concentrations of a liquid at pH 2 and one at pH 7. By what factor do they differ?',
          'Add water to an acid and note how slowly its pH rises. What does that imply about neutralising stomach acid with water alone?',
          'Find a liquid close to the pH of gastric juice and one close to the pH of pancreatic secretions.',
        ),
      ],
      sort: sort(
        'Which gastric cell secretes it?',
        ['Parietal cell', 'Chief cell', 'Mucous cell', 'G cell'],
        [
          ['Hydrochloric acid', 0],
          ['Pepsinogen', 1],
          ['Protective alkaline mucus', 2],
          ['Gastrin', 3],
          ['Intrinsic factor', 0],
          ['Gastric lipase', 1],
        ],
      ),
      checks: [
        check(
          2,
          'Pepsinogen is converted to active pepsin by…',
          [
            'Hydrochloric acid in the stomach lumen',
            'Bile salts',
            'Enterokinase in the duodenum',
            'Salivary amylase',
          ],
          'Secreting an inactive precursor protects the cells that make it. Acid unfolds pepsinogen so that it cleaves itself; pepsin then activates more.',
        ),
      ],
    },
    'anat-u5-l2': {
      labs: ['anat-surface'],
      sort: sort(
        'Where is it mainly absorbed?',
        ['Duodenum and jejunum', 'Ileum', 'Large intestine'],
        [
          ['Most monosaccharides and amino acids', 0],
          ['Vitamin B₁₂', 1],
          ['Bile salts (recycled)', 1],
          ['Iron', 0],
          ['Water and electrolytes from the remaining chyme', 2],
          ['Vitamin K made by bacteria', 2],
        ],
      ),
      checks: [
        check(
          1,
          'Bile helps fat digestion by…',
          [
            'Emulsifying fat into small droplets, increasing the surface for lipase',
            'Breaking triglycerides into fatty acids',
            'Neutralising all stomach acid',
            'Absorbing fat directly',
          ],
          'Bile salts are detergents, not enzymes. They do not break chemical bonds; they give pancreatic lipase far more surface to act on.',
        ),
      ],
    },
    'anat-u6-l1': {
      labs: ['anat-bleed'],
      sort: sort(
        'Upper or lower gastrointestinal bleeding?',
        ['Upper GI source', 'Lower GI source'],
        [
          ['Vomiting blood', 0],
          ['Black, tarry stools (melena)', 0],
          ['Bright red blood on the stool surface', 1],
          ['Bleeding duodenal ulcer', 0],
          ['Diverticular bleeding', 1],
          ['Haemorrhoids', 1],
        ],
      ),
      checks: [
        check(
          0,
          'Most peptic ulcers are associated with…',
          [
            'Helicobacter pylori infection or NSAID use',
            'Spicy food',
            'Stress alone',
            'Drinking too much water',
          ],
          'H. pylori damages the mucosal defence and NSAIDs block protective prostaglandins. Either tips the balance between acid and defence.',
        ),
      ],
    },
    'anat-u6-l2': {
      labs: ['anat-energy'],
      sort: sort(
        'Lactose intolerance or milk allergy?',
        ['Lactose intolerance', 'Cow’s-milk allergy'],
        [
          ['Lactase deficiency', 0],
          ['An immune response to milk proteins', 1],
          ['Bloating and diarrhoea from fermented sugar', 0],
          ['Hives or wheezing shortly after milk', 1],
          ['Small amounts are often tolerated', 0],
          ['Can cause anaphylaxis', 1],
        ],
      ),
      checks: [
        check(
          0,
          'In lactose intolerance, diarrhoea occurs mainly because undigested lactose…',
          [
            'Holds water in the gut by osmosis and is fermented by bacteria',
            'Is absorbed into the blood',
            'Destroys the villi',
            'Triggers histamine release',
          ],
          'Unabsorbed sugar is osmotically active, drawing water into the lumen, and colonic bacteria ferment it to gas and acids.',
        ),
      ],
    },
    'anat-u7-l1': {
      labs: ['anat-starling'],
      sort: sort(
        'Primary or secondary lymphoid organ?',
        ['Primary (lymphocytes develop)', 'Secondary (lymphocytes are activated)'],
        [
          ['Bone marrow', 0],
          ['Lymph nodes', 1],
          ['Thymus', 0],
          ['Spleen', 1],
          ['Peyer’s patches', 1],
          ['Tonsils', 1],
        ],
      ),
      checks: [
        check(
          2,
          'Lymph from the right arm and the right side of the head returns to the blood through the…',
          [
            'Right lymphatic duct',
            'Thoracic duct',
            'Hepatic portal vein',
            'Inferior vena cava directly',
          ],
          'The thoracic duct drains the rest of the body into the left subclavian vein; the much smaller right lymphatic duct drains the upper right quadrant.',
        ),
      ],
    },
    'anat-u7-l2': {
      labs: ['anat-clonal'],
      sort: sort(
        'Where does it happen?',
        ['Lymph node', 'Spleen', 'Skin and mucosa'],
        [
          ['Filters lymph draining from tissues', 0],
          ['Filters blood and removes old red cells', 1],
          ['Physical and chemical barrier to entry', 2],
          ['Germinal centres swell during a local infection', 0],
          ['White pulp surrounds central arterioles', 1],
          ['Mucus, lysozyme, and normal flora', 2],
        ],
      ),
      checks: [
        check(
          0,
          'In germinal centres, B cells that bind antigen more tightly are selected. This process is called…',
          ['Affinity maturation', 'Clonal deletion', 'Opsonisation', 'Class restriction'],
          'Somatic hypermutation creates variants, and those with higher affinity receive survival signals. Antibody quality improves over the course of a response.',
        ),
      ],
    },
    'anat-u8-l1': {
      labs: ['anat-complement'],
      sort: sort(
        'Innate or adaptive immunity?',
        ['Innate', 'Adaptive'],
        [
          ['Neutrophils', 0],
          ['Cytotoxic T cells', 1],
          ['Complement', 0],
          ['Memory B cells', 1],
          ['Natural killer cells', 0],
          ['Antibodies', 1],
        ],
      ),
      checks: [
        check(
          0,
          'Pattern-recognition receptors such as Toll-like receptors detect…',
          [
            'Molecular patterns shared by many microbes',
            'One specific antigen each',
            'Only the body’s own damaged cells',
            'Antibodies',
          ],
          'Innate receptors are germline-encoded and recognise conserved features such as lipopolysaccharide. Their breadth trades specificity for speed.',
        ),
      ],
    },
    'anat-u8-l2': {
      labs: ['anat-titer'],
      sort: sort(
        'Which antibody class?',
        ['IgM', 'IgG', 'IgA', 'IgE'],
        [
          ['First antibody made in a primary response', 0],
          ['Crosses the placenta', 1],
          ['Main antibody in secretions such as saliva and breast milk', 2],
          ['Triggers mast cells in allergy', 3],
          ['Most abundant in serum', 1],
          ['A pentamer that fixes complement efficiently', 0],
        ],
      ),
      checks: [
        check(
          2,
          'A type I hypersensitivity reaction (immediate allergy) is mediated by…',
          ['IgE on mast cells', 'IgG immune complexes', 'Cytotoxic T cells', 'Complement alone'],
          'Allergen cross-links IgE bound to mast cells, releasing histamine within minutes. Types II–IV involve other antibody classes or T cells.',
        ),
      ],
    },
    'anat-u9-l1': {
      labs: ['anat-cd4'],
      sort: sort(
        'Which arm of immunity is mainly impaired?',
        ['Mainly T-cell function', 'Mainly antibody production', 'Both'],
        [
          ['Advanced HIV infection', 0],
          ['Common variable immunodeficiency (CVID)', 1],
          ['Severe combined immunodeficiency (SCID)', 2],
          ['Low immunoglobulin levels with recurrent sinus and lung infections', 1],
          ['Opportunistic infections with a low CD4 count', 0],
          ['Life-threatening infections in the first months of life', 2],
        ],
      ),
      checks: [
        check(
          0,
          'HIV enters helper T cells by binding to…',
          [
            'CD4 and a chemokine co-receptor',
            'The T-cell receptor alone',
            'MHC class I',
            'Antibody Fc receptors',
          ],
          'The viral gp120 binds CD4 and then CCR5 or CXCR4. This is why CD4-bearing cells are the principal targets.',
        ),
      ],
    },
    'anat-u9-l2': {
      labs: ['anat-conduction'],
      sort: sort(
        'Allergy, autoimmunity, or immunodeficiency?',
        ['Allergy', 'Autoimmunity', 'Immunodeficiency'],
        [
          ['Anaphylaxis after a bee sting', 0],
          ['Rheumatoid arthritis', 1],
          ['SCID', 2],
          ['Multiple sclerosis', 1],
          ['Hay fever', 0],
          ['Recurrent infections from low antibody levels', 2],
        ],
      ),
      checks: [
        check(
          3,
          'The first-line emergency treatment for anaphylaxis is…',
          [
            'Intramuscular adrenaline (epinephrine)',
            'An oral antihistamine',
            'Antibiotics',
            'Waiting to see whether symptoms resolve',
          ],
          'Adrenaline reverses airway narrowing and the fall in blood pressure within minutes. Antihistamines act too slowly to be relied on alone.',
        ),
      ],
    },
    'anat-u10-l1': {
      labs: ['anat-abg'],
      sort: sort(
        'Acidosis or alkalosis, respiratory or metabolic?',
        [
          'Respiratory acidosis',
          'Metabolic acidosis',
          'Respiratory alkalosis',
          'Metabolic alkalosis',
        ],
        [
          ['Hypoventilation from an opioid overdose', 0],
          ['Diabetic ketoacidosis', 1],
          ['Anxiety-driven hyperventilation', 2],
          ['Prolonged vomiting', 3],
          ['Severe COPD with CO₂ retention', 0],
          ['Severe diarrhoea with bicarbonate loss', 1],
        ],
      ),
      checks: [
        check(
          1,
          'When reading a blood gas, the first value to examine is the…',
          [
            'pH, to decide between acidemia and alkalemia',
            'Oxygen saturation',
            'Bicarbonate',
            'Base excess',
          ],
          'A fixed order prevents errors: pH first, then PaCO₂ to see whether the respiratory system explains it, then bicarbonate and compensation.',
        ),
      ],
    },
    'anat-u10-l2': {
      labs: ['anat-study'],
      sort: sort(
        'Effective study technique, or low-value habit?',
        ['Effective', 'Low value'],
        [
          ['Recalling a diagram from memory, then checking it', 0],
          ['Rereading highlighted notes', 1],
          ['Spacing review over several weeks', 0],
          ['Studying one topic for hours in a single block', 1],
          ['Explaining a mechanism aloud to a teammate', 0],
          ['Copying the textbook word for word', 1],
        ],
      ),
      checks: [
        check(
          2,
          'At a timed station, the best first step with an unfamiliar diagram is to…',
          [
            'Establish orientation and identify one certain landmark',
            'Guess the label asked for immediately',
            'Skip every diagram question',
            'Describe its colours',
          ],
          'Orientation and one fixed reference turn the rest of the image into a series of relationships rather than isolated guesses.',
        ),
      ],
    },
  },
};
