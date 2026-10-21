import { check, phet, sort, type EventExtras } from '../lesson-extras.ts';
import { choice, goal, slider, type TopicLab } from '../topic-lab-kit.ts';

const milks: [string, number][] = [
  ['Skim milk (0.1% fat)', 0.1],
  ['Reduced-fat milk (2% fat)', 2],
  ['Whole milk (3.25% fat)', 3.25],
];
const curdAt = (fat: number, vinegar: number, drain: number) => {
  const precip = Math.min(1, vinegar / 2);
  const water = (1 + 0.6 * Math.exp(-drain / 10)) / (1 + 0.6 * Math.exp(-1.5));
  return precip * (8.5 + fat * 1.6) * water;
};
const curd: TopicLab = {
  id: 'food-curd',
  title: 'Acid, milk fat, and percent curd',
  lead: 'Add vinegar to 120 mL of milk and drain the curds. Percent curd depends on how much casein clumps, how much fat is trapped, and how much water drains away.',
  controls: [
    choice(
      'milk',
      'Milk',
      milks.map(([name]) => name),
      2,
    ),
    slider('vinegar', 'Vinegar added', 0, 6, 0.5, 0, 'mL'),
    slider('drain', 'Drain time', 5, 30, 5, 15, 'min'),
  ],
  run: (v) => {
    const fat = milks[v.milk][1];
    const precip = Math.min(1, v.vinegar / 2);
    const pct = curdAt(fat, v.vinegar, v.drain);
    const milkMass = 124;
    return {
      o: { precip, pct },
      metrics: [
        { label: 'Casein curdled', value: Math.round(precip * 100), unit: '%' },
        { label: 'Percent curd', value: Number(pct.toFixed(1)), unit: '%' },
        {
          label: 'Curd mass from 124 g of milk',
          value: Number(((pct / 100) * milkMass).toFixed(1)),
          unit: 'g',
        },
        {
          label: 'Whey',
          value: precip < 1 ? 'Cloudy: casein still dissolved' : 'Clear yellowish whey',
        },
      ],
      plot: {
        title: 'Percent curd as vinegar is added',
        x: [0, 6, 'Vinegar (mL)'],
        y: [0, 20, 'Percent curd'],
        curves: milks.map(([name, f], i) => ({
          f: (x: number) => curdAt(f, x, v.drain),
          label: name.split(' (')[0],
          tone: i === v.milk ? ('slot' as const) : ('muted' as const),
          dash: i !== v.milk,
        })),
        points: [{ x: v.vinegar, y: pct, label: `${pct.toFixed(1)}%` }],
      },
    };
  },
  missions: [
    goal(
      'Add just enough vinegar to curdle all of the casein in whole milk.',
      'In this model, 2 mL of vinegar lowers the pH to about 4.6.',
      { vinegar: 2 },
      (o, v) => v.milk === 2 && o.precip >= 1 && v.vinegar === 2,
    ),
    goal(
      'Fully curdle skim milk and show its percent curd stays below 10%.',
      'Skim milk has almost no fat to trap in the curd.',
      { milk: 0, vinegar: 2 },
      (o, v) => v.milk === 0 && o.precip >= 1 && o.pct < 10,
    ),
  ],
  predict: {
    q: 'Whole milk and skim milk are curdled with the same amount of vinegar. Which gives a greater percent curd?',
    options: ['Whole milk', 'Skim milk', 'They are equal', 'Neither forms curd'],
    correct: 0,
    why: 'Casein clumps similarly in both, but whole milk traps fat globules in the curd network, which adds mass.',
  },
  model:
    'Synthetic teaching model: casein fully curdles at 2 mL of vinegar per 120 mL; curd yield rises with milk fat and with retained water, which falls with drain time. Real yields depend on temperature, stirring, and the milk.',
};

const progressAt = (temp: number, t: number) =>
  1 - Math.exp((-Math.exp(-(((temp - 13) / 9) ** 2)) * t) / 2);
const butter: TopicLab = {
  id: 'food-butter',
  title: 'Cream temperature and churning time',
  lead: 'Shake 150 mL of heavy cream in a closed container. Fat globules clump fastest when partly solid, near 13 °C; warm cream also loses fat to the buttermilk.',
  controls: [
    slider('temp', 'Cream temperature', 2, 30, 1, 4, '°C'),
    slider('minutes', 'Shaking time', 0, 20, 1, 5, 'min'),
  ],
  run: (v) => {
    const progress = progressAt(v.temp, v.minutes);
    const efficiency = 1 - 0.02 * Math.max(0, v.temp - 15);
    const recovered = progress * efficiency;
    const formed = progress >= 0.9 ? 1 : 0;
    const butterMass = (recovered * 53) / 0.8;
    return {
      o: { formed, recovered },
      metrics: [
        { label: 'Churning progress', value: Math.round(progress * 100), unit: '%' },
        { label: 'Butter formed', value: formed ? 'Yes: grains separated' : 'Not yet' },
        { label: 'Milk fat recovered', value: Math.round(recovered * 100), unit: '%' },
        { label: 'Butter mass (about 80% fat)', value: Number(butterMass.toFixed(1)), unit: 'g' },
      ],
      plot: {
        title: `Churning progress at ${v.temp} °C`,
        x: [0, 20, 'Shaking time (min)'],
        y: [0, 1, 'Fraction of fat clumped'],
        curves: [
          { f: (t) => progressAt(v.temp, t), label: 'this cream', tone: 'slot' },
          { f: (t) => progressAt(13, t), label: '13 °C', tone: 'muted', dash: true },
        ],
        hlines: [{ y: 0.9, label: 'butter separates' }],
        points: [{ x: v.minutes, y: progress }],
      },
    };
  },
  missions: [
    goal(
      'Get butter to separate in 8 minutes or less of shaking.',
      'Warm the cream to the temperature the rules recommend.',
      { temp: 13, minutes: 8 },
      (o, v) => o.formed === 1 && v.minutes <= 8,
    ),
    goal(
      'Show that warm cream (24 °C or more) recovers less than 80% of its fat after 20 minutes.',
      'Liquid fat leaks into the buttermilk instead of clumping.',
      { temp: 25, minutes: 20 },
      (o, v) => v.temp >= 24 && v.minutes === 20 && o.recovered < 0.8,
    ),
  ],
  predict: {
    q: 'Cream straight from the refrigerator (4 °C) is shaken for 5 minutes. What is most likely?',
    options: ['No butter yet', 'Butter forms quickly', 'The cream curdles', 'All fat is lost'],
    correct: 0,
    why: 'Very cold fat is too solid for globules to stick together quickly, so churning is slow until the cream warms.',
  },
  model:
    'Synthetic model: clumping rate peaks at 13 °C and falls off on either side; above 15 °C some fat stays in the buttermilk. Assumes 150 mL of 36% heavy cream (about 53 g of fat) and butter that is 80% fat.',
};

const solutes: [name: string, i: number, molarMass: number, gPerMl: number][] = [
  ['Table salt (NaCl)', 2, 58.44, 1.2],
  ['Sugar (sucrose)', 1, 342.3, 0.85],
];
const freezing: TopicLab = {
  id: 'food-fpd',
  title: 'How cold can a salted ice bath get?',
  lead: 'Stir a solute into an ice bath with about 300 g of meltwater. Freezing point depression, ΔT = i·Kf·m, sets how cold the bath can get — and whether ice cream firms up.',
  controls: [
    choice(
      'solute',
      'Solute',
      solutes.map(([name]) => name),
      0,
    ),
    slider('amount', 'Amount added', 0, 90, 5, 0, 'mL'),
  ],
  run: (v) => {
    const [, i, mm, density] = solutes[v.solute];
    const moles = (v.amount * density) / mm;
    const molality = moles / 0.3;
    const drop = i * 1.86 * molality;
    const bath = Math.max(-21.1, -drop);
    return {
      o: { bath, molality },
      metrics: [
        { label: 'Molality of meltwater', value: Number(molality.toFixed(2)), unit: 'mol/kg' },
        { label: 'Freezing point depression', value: Number(drop.toFixed(1)), unit: '°C' },
        { label: 'Bath temperature', value: Number(bath.toFixed(1)), unit: '°C' },
        { label: 'Ice cream', value: bath <= -8 ? 'Firms up' : 'Stays soft or slushy' },
      ],
      bars: {
        title: 'Bath temperature compared with targets (°C below zero)',
        max: 22,
        items: [
          { label: 'This bath', value: -bath, tone: bath <= -8 ? 'slot' : 'warm' },
          { label: 'Ice cream target', value: 8, tone: 'muted' },
          { label: 'Salt–ice limit', value: 21.1, tone: 'muted' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Use the least table salt that chills the bath to −8 °C or colder.',
      'Each 5 mL of salt lowers this bath by about 1.3 °C.',
      { solute: 0, amount: 35 },
      (o, v) => v.solute === 0 && v.amount === 35 && o.bath <= -8,
    ),
    goal(
      'Show that 90 mL of sugar barely cools the bath: it stays warmer than −5 °C.',
      'Sugar molecules are heavy and do not split into ions.',
      { solute: 1, amount: 90 },
      (o, v) => v.solute === 1 && v.amount === 90 && o.bath > -5,
    ),
  ],
  predict: {
    q: 'Equal moles of salt and sugar are dissolved in the same water. Which lowers the freezing point more?',
    options: [
      'Salt, about twice as much',
      'Sugar, about twice as much',
      'They are equal',
      'Neither changes it',
    ],
    correct: 0,
    why: 'NaCl splits into Na⁺ and Cl⁻ (i = 2) while sugar stays as one particle (i = 1), and freezing point depression counts particles.',
  },
  model:
    'Ideal ΔT = i·Kf·m with Kf = 1.86 °C·kg/mol and 300 g of meltwater; salt cannot cool below its −21.1 °C eutectic. Real baths warm as they absorb heat from the ice cream.',
};

const logsAt = (temp: number, seconds: number) => seconds / (3 * 10 ** ((72 - temp) / 5));
const pasteur: TopicLab = {
  id: 'food-pasteur',
  title: 'Time and temperature in pasteurization',
  lead: 'Pasteurization must cut a target microbe population by at least 5 log units (100,000-fold). Higher temperatures need far less time.',
  controls: [
    slider('temp', 'Holding temperature', 60, 80, 1, 60, '°C'),
    slider('seconds', 'Holding time', 0, 1800, 5, 5, 's'),
  ],
  run: (v) => {
    const logs = logsAt(v.temp, v.seconds);
    const d = 3 * 10 ** ((72 - v.temp) / 5);
    const xMax = Math.max(60, Math.min(1800, d * 8));
    return {
      o: { logs },
      metrics: [
        { label: 'Log reduction', value: Number(logs.toFixed(2)) },
        { label: 'Time for one log (D-value)', value: Number(d.toPrecision(3)), unit: 's' },
        { label: 'Result', value: logs >= 5 ? 'Meets the 5-log target' : 'Not yet safe' },
      ],
      plot: {
        title: `Surviving microbes at ${v.temp} °C`,
        x: [0, xMax, 'Time (s)'],
        y: [-6, 6, 'log₁₀(microbes per mL)'],
        curves: [{ f: (t) => 6 - t / d, label: 'survivors', tone: 'slot' }],
        hlines: [{ y: 1, label: '5-log target' }],
        points: [
          { x: Math.min(v.seconds, xMax), y: Math.max(-6, 6 - Math.min(v.seconds, xMax) / d) },
        ],
      },
    };
  },
  missions: [
    goal(
      'Reproduce HTST pasteurization: 72 °C for 15 seconds, and check it meets the target.',
      'Set the temperature to 72 °C and the time to 15 s.',
      { temp: 72, seconds: 15 },
      (o, v) => v.temp === 72 && v.seconds === 15 && o.logs >= 5,
    ),
    goal(
      'Reproduce vat pasteurization at 63 °C for 30 minutes and confirm it is also safe.',
      'Thirty minutes is 1,800 seconds.',
      { temp: 63, seconds: 1800 },
      (o, v) => v.temp === 63 && o.logs >= 5,
    ),
  ],
  predict: {
    q: 'Why can HTST pasteurization take only 15 seconds when vat pasteurization takes 30 minutes?',
    options: [
      'Microbes die far faster at higher temperature',
      'HTST milk has no microbes',
      'Vat milk is thicker',
      'HTST adds preservatives',
    ],
    correct: 0,
    why: 'Each few degrees hotter makes the killing rate many times faster, so a higher temperature reaches the same reduction in much less time.',
  },
  model:
    'Synthetic first-order kill model: D-value of 3 s at 72 °C with z = 5 °C. It shows the time–temperature trade-off, not regulatory process limits for any specific organism.',
};

const label: TopicLab = {
  id: 'food-label',
  title: 'Percent Daily Value for calcium',
  lead: 'The calcium Daily Value is 1,300 mg. Change the calcium in one serving and the servings eaten to see %DV per serving and for the day.',
  controls: [
    slider('ca', 'Calcium per serving', 0, 600, 10, 100, 'mg'),
    slider('servings', 'Servings eaten', 1, 4, 1, 1, ''),
  ],
  run: (v) => {
    const pct = (v.ca / 1300) * 100;
    const total = pct * v.servings;
    return {
      o: { pct, total },
      metrics: [
        { label: '%DV per serving', value: Math.round(pct), unit: '%' },
        { label: '%DV for the day', value: Math.round(total), unit: '%' },
        {
          label: 'Label claim per serving',
          value: pct >= 20 ? 'High in calcium' : pct <= 5 ? 'Low in calcium' : 'Moderate',
        },
      ],
      bars: {
        title: 'Percent Daily Value',
        max: Math.max(100, total),
        items: [
          { label: 'Low (5%)', value: 5, tone: 'muted' },
          { label: 'High (20%)', value: 20, tone: 'muted' },
          { label: 'One serving', value: pct, tone: 'slot' },
          { label: 'Whole day', value: total, tone: 'accent' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Find the least calcium per serving that earns a “high” label (20% DV).',
      '20% of 1,300 mg is 260 mg.',
      { ca: 260 },
      (o, v) => v.ca === 260 && o.pct >= 20,
    ),
    goal(
      'Reach at least 100% DV for the day with exactly three servings.',
      '1,300 mg ÷ 3 servings ≈ 434 mg each.',
      { ca: 440, servings: 3 },
      (o, v) => v.servings === 3 && o.total >= 100,
    ),
  ],
  predict: {
    q: 'One cup of milk has 300 mg of calcium. About what %DV is that?',
    options: ['23%', '30%', '13%', '3%'],
    correct: 0,
    why: '300 ÷ 1,300 × 100 ≈ 23%, which counts as high because it is 20% or more.',
  },
  model:
    'Uses the current U.S. calcium Daily Value of 1,300 mg for adults and children 4 years and older. Real labels round %DV to set increments.',
};

export const foodScienceExtras: EventExtras = {
  eventId: 'food-science',
  labs: [curd, butter, freezing, pasteur, label],
  lessons: {
    'food-u1-l1': {
      phet: [
        phet(
          'molecule-polarity',
          'Molecule Polarity',
          'Milk is a solution, a colloid, and an emulsion at once because its molecules differ in polarity. Exploring polarity shows why lactose dissolves while fat forms separate globules.',
          'Compare a polar and a nonpolar molecule in an electric field and describe how each responds.',
          'Use your observations to explain why long, nonpolar fat chains do not dissolve in water.',
        ),
      ],
      sort: sort(
        'Which macromolecule class is it?',
        ['Carbohydrate', 'Lipid', 'Protein'],
        [
          ['Lactose', 0],
          ['Triglyceride', 1],
          ['Casein', 2],
          ['Galactose', 0],
          ['Phospholipid in the globule membrane', 1],
          ['β-lactoglobulin (a whey protein)', 2],
        ],
      ),
      checks: [
        check(
          4,
          'At about what pH does casein clump into curd?',
          ['4.6', '6.7', '8.2'],
          'Casein’s isoelectric point is near pH 4.6, where the micelles lose their charge and stick together.',
        ),
      ],
    },
    'food-u2-l1': {
      labs: ['food-butter'],
      sort: sort(
        'Saturated or unsaturated?',
        ['Saturated', 'Unsaturated'],
        [
          ['Only single carbon–carbon bonds', 0],
          ['Has at least one C=C double bond', 1],
          ['Packs tightly and is solid at room temperature', 0],
          ['Kinked chains that stay liquid', 1],
          ['Most of the fat in butter', 0],
          ['Olive oil’s main fatty acid', 1],
        ],
      ),
      checks: [
        check(
          2,
          'How many water molecules are released when glycerol forms one triglyceride?',
          ['Three', 'One', 'Six'],
          'Each of the three ester bonds forms by condensation, releasing one water molecule.',
        ),
      ],
    },
    'food-u3-l1': {
      labs: ['food-curd'],
      sort: sort(
        'Does this change raise or lower measured curd mass?',
        ['Raises curd mass', 'Lowers curd mass'],
        [
          ['Using whole milk instead of skim milk', 0],
          ['Adding too little vinegar', 1],
          ['Squeezing the cheesecloth hard', 1],
          ['Draining for only 5 minutes', 0],
          ['Heating so whey proteins join the curd', 0],
          ['Stirring so hard the curd passes through the cloth', 1],
        ],
      ),
      checks: [
        check(
          3,
          'Milk mass is 124.0 g and curd mass is 18.6 g. What is the percent curd?',
          ['15.0%', '6.7%', '18.6%'],
          '18.6 ÷ 124.0 × 100 = 15.0%. Always divide curd mass by the milk mass.',
        ),
      ],
    },
    'food-u4-l1': {
      labs: ['food-fpd'],
      phet: [
        phet(
          'states-of-matter-basics',
          'States of Matter: Basics',
          'Freezing is molecules slowing and locking into a solid. Watching particles change phase helps explain why dissolved particles get in the way and lower the freezing point.',
          'Cool water from liquid to solid and describe how particle motion and arrangement change.',
          'Explain in particle terms why salt dissolved in meltwater makes it harder for ice to form.',
        ),
      ],
      sort: sort(
        'What happens to the ice cream?',
        ['Firmer and smoother', 'Softer or icier'],
        [
          ['Using cream instead of milk', 0],
          ['Adding more salt to the ice', 0],
          ['Adding much more sugar to the mix', 1],
          ['Shaking vigorously the whole time', 0],
          ['Letting it melt and refreeze', 1],
          ['Using very little salt in the ice', 1],
        ],
      ),
      checks: [
        check(
          0,
          'Why is freezing point depression called a colligative property?',
          [
            'It depends on the number of particles, not their type',
            'It only happens with salt',
            'It depends on the colour of the solute',
          ],
          'Any dissolved particles disrupt crystal formation; what matters is how many there are.',
        ),
      ],
    },
    'food-u5-l1': {
      labs: ['food-pasteur'],
      sort: sort(
        'Which preservation idea does it use?',
        ['Heat', 'Remove water', 'Lower pH', 'Cold'],
        [
          ['HTST pasteurization', 0],
          ['Powdered milk', 1],
          ['Yogurt fermentation', 2],
          ['Refrigerating at 4 °C', 3],
          ['UHT processing', 0],
          ['Sweetened condensed milk', 1],
        ],
      ),
      checks: [
        check(
          3,
          'Which reaction gives cooked dairy its browned, toasty flavour?',
          ['The Maillard reaction', 'Esterification', 'Freezing point depression'],
          'Reducing sugars such as lactose react with amino acids when heated, creating brown colour and flavour compounds.',
        ),
      ],
    },
    'food-u6-l1': {
      labs: ['food-label'],
      sort: sort(
        'Which nutrient’s deficiency causes this?',
        ['Calcium or vitamin D', 'Vitamin A', 'Vitamin B₁₂', 'Riboflavin'],
        [
          ['Rickets in children', 0],
          ['Night blindness', 1],
          ['A type of anemia', 2],
          ['Cracked lips and a sore throat', 3],
          ['Osteoporosis in adults', 0],
          ['Nerve damage over time', 2],
        ],
      ),
      checks: [
        check(
          4,
          'Fat-free milk must contain less than how much fat per serving?',
          ['0.5 g', '1 g', '3 g'],
          'U.S. labeling rules define fat-free as less than 0.5 g of fat per serving.',
        ),
      ],
    },
    'food-u7-l1': {
      labs: ['food-curd'],
      sort: sort(
        'Dairy reactions: intolerance or allergy?',
        ['Lactose intolerance', 'Milk allergy'],
        [
          ['Caused by too little lactase', 0],
          ['An immune reaction to casein or whey', 1],
          ['Bloating and cramps after drinking milk', 0],
          ['Hives within minutes of a tiny amount', 1],
          ['Lactose-free milk is a safe choice', 0],
          ['Can cause anaphylaxis', 1],
        ],
      ),
      checks: [
        check(
          5,
          'How many independent variables may each notebook experiment have?',
          ['One', 'Two', 'As many as needed'],
          'The rules require exactly one independent variable per experiment so results can be attributed to it.',
        ),
      ],
    },
  },
};
