import { defineDeck, type Deck } from './presentation-types.ts';
import { decks as divisionCDecks } from './presentations-water-quality.ts';

// Water Quality (Division B) presentations, one per lesson, following presentations-anatomy.ts.
// Eight of the nine B lessons are the same lessons (same ids and text) as Division C, so they
// reuse the Division C decks, which already follow those lessons section by section. Only the
// salinometer lesson is B-specific (water-u7-l1-b: 1–10% mass/volume hydrometer), written here.

const salinometer = defineDeck('water-u7-l1-b', [
  {
    kind: 'title',
    title: 'Calibrate a Division B salinometer',
    subtitle: 'Build a floating hydrometer, mark known standards, and read an unknown saltwater.',
    objectives: [
      'Use mass/volume percent correctly.',
      'Explain why a float rides higher in saltier water.',
      'Make calibration standards across the test range.',
      'Read an unknown to the nearest tenth of a percent.',
    ],
    image: 'b-wq-hydrometer',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: in which water does a person float more easily?',
    options: ['A freshwater lake', 'The very salty Dead Sea', 'They float the same', 'Not sure'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Use the right concentration',
    bullets: [
      'The B rules use saltwater from **1% to 10% mass/volume**.',
      '**1% m/v** means ==1 g of salt per 100 mL of final solution==.',
      'It is **not** grams per 100 mL of the starting water.',
      'It is also not the same as grams per kilogram (g/kg) of solution.',
    ],
    callout: 'The key word is **final**: measure the volume ==after== the salt has dissolved.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'What does a 3% mass/volume salt solution contain?',
    options: [
      '3 g of salt per 100 mL of final solution',
      '3 g of salt added to 100 mL of starting water',
      '3 g of salt per kilogram of solution',
      '3 mL of salt per 100 mL of water',
    ],
    answer: 0,
    explanation:
      'Mass/volume percent is grams of solute per 100 mL of the finished solution, not of the water you started with.',
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'How many grams of salt are in 250 mL of a 2% mass/volume solution?',
    answer: 5,
    tolerance: 0,
    unit: 'g',
    explanation: '2% m/v is 2 g per 100 mL, so 250 mL holds 2 × 2.5 = 5 g.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Understand the float',
    image: 'b-wq-hydrometer',
    caption:
      'A **hydrometer** floating upright: it sinks until the liquid it pushes aside weighs the ==same as the hydrometer==.',
    bullets: [
      'Saltwater is **denser** than fresh water.',
      'Denser liquid holds the float up with ==less displaced volume==, so it **floats higher**.',
      'Keep the float **upright** and away from the beaker walls and bottom.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'A hydrometer is moved from 2% saltwater to 8% saltwater. What happens?',
    options: [
      'It floats higher, because denser water needs less displaced volume to hold it up',
      'It sinks lower, because salt makes water lighter',
      'It stays at exactly the same depth',
      'It sinks to the bottom',
    ],
    answer: 0,
    explanation:
      'Saltier water is denser, so a smaller underwater volume displaces enough weight to balance the float.',
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which would spoil a hydrometer reading? Select all that apply.',
    options: [
      'The float leaning against the beaker wall',
      'The float touching the bottom',
      'The float tilted to one side',
      'The float upright and floating freely',
    ],
    answers: [0, 1, 2],
    explanation:
      'Touching the wall or bottom lets the beaker support part of the weight, and tilting changes the depth you read. Only a free, upright float gives a fair reading.',
  },
  {
    kind: 'flow',
    section: 2,
    title: 'Make calibration standards',
    steps: [
      {
        label: 'Plan',
        detail: 'Choose **known concentrations across the whole range**, 1% to 10%.',
      },
      { label: 'Weigh', detail: 'For 400 mL of 5% m/v, weigh **20 g** of salt.' },
      {
        label: 'Dissolve and top up',
        detail: 'Dissolve, then bring the ==final volume== to 400 mL.',
      },
      {
        label: 'Mark',
        detail: 'Float the device and **mark the immersion depth** for each standard.',
      },
      { label: 'Same temperature', detail: 'Make every mark at a ==consistent temperature==.' },
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: mixing a standard',
    problem: 'How much salt is needed for 400 mL of a 5% mass/volume standard?',
    steps: [
      '5% m/v means **5 g per 100 mL**.',
      '400 mL is 4 × 100 mL, so salt = 5 g × 4 = **20 g**.',
      'Dissolve the 20 g, then add water until the ==final volume is 400 mL==.',
    ],
    conclusion: 'Measure the **final volume after dissolving**, not the water you started with.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'How many grams of salt make 500 mL of an 8% mass/volume standard?',
    answer: 40,
    tolerance: 0,
    unit: 'g',
    explanation: '8 g per 100 mL × 5 = 40 g, then bring the final volume to 500 mL.',
  },
  {
    kind: 'order',
    section: 2,
    prompt: 'Put the steps for making one calibration standard in order.',
    items: [
      'Calculate the grams of salt needed',
      'Weigh the salt',
      'Dissolve it in some water',
      'Add water until the final volume is reached',
      'Float the device and mark the depth',
    ],
    explanation:
      'Calculate, weigh, dissolve, then top up to the final volume before marking, so the concentration is what you labeled.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Read an unknown',
    bullets: [
      'Compare the unknown’s immersion with the **nearest calibration marks**.',
      'Estimate the concentration to the ==nearest tenth of a percent==.',
      '**Recalibrate** if the float’s mass or the temperature changes.',
      'Rules: a standard **400–600 mL beaker** with at least 400 mL of solution, and **Category C** eye protection.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: between two marks',
    problem:
      'The 4.0% standard immerses 9.8 cm and the 6.0% standard 9.6 cm. An unknown immerses 9.7 cm at the same temperature.',
    steps: [
      'Higher salt means **less immersion**, so 9.8 cm → 4.0% and 9.6 cm → 6.0%.',
      '9.7 cm is ==halfway== between the two marks.',
      'Halfway between 4.0% and 6.0% is **5.0%**.',
    ],
    conclusion: 'The unknown is about **5.0% mass/volume**.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'The 2.0% standard immerses 10.4 cm and the 4.0% standard 10.0 cm. An unknown immerses 10.3 cm at the same temperature. What is its concentration in %?',
    answer: 2.5,
    tolerance: 0.05,
    unit: '%',
    explanation:
      'Each 0.1 cm less immersion is 0.5% more salt here (2% over 0.4 cm). 10.3 cm is 0.1 cm above the 2.0% mark, so 2.0 + 0.5 = 2.5%.',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'After calibrating, you glue a heavier tip onto the float. What should you do before reading unknowns?',
    options: [
      'Recalibrate with the standards, because the float’s mass changed',
      'Nothing; the marks still work',
      'Subtract 1% from every reading',
      'Only test unknowns above 5%',
    ],
    answer: 0,
    explanation:
      'A heavier float sinks deeper in every solution, so the old marks no longer match. Remake the marks with the standards.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Mass/volume percent', back: 'Grams of solute per 100 mL of final solution.' },
      { front: 'Hydrometer', back: 'A float whose depth shows the density of a liquid.' },
      {
        front: 'Calibration standard',
        back: 'A solution of known concentration used to mark the scale.',
      },
      { front: 'Immersion depth', back: 'How far the float sinks into the liquid.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Saltier water is more {0}, so a hydrometer floats {1}. Standards are marked at the same {2}, and an unknown is read between the nearest {3}.',
    blanks: ['dense', 'higher', 'temperature', 'marks'],
    distractors: ['lower', 'colorful', 'pressure', 'beakers'],
    explanation:
      'Density holds the float up; consistent temperature keeps the marks fair; unknowns are read by comparing to neighboring marks.',
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      '**1% m/v** = 1 g of salt per 100 mL of ==final== solution.',
      'Denser saltwater makes a float ride **higher**; keep it upright and free.',
      'Mark **standards across 1–10%** at one temperature.',
      'Read unknowns ==between nearby marks== to the nearest 0.1%; recalibrate after changes.',
    ],
  },
]);

// Every Division C water-quality deck except the C salinometer lesson, which B replaces.
export const decks: Deck[] = [
  ...divisionCDecks.filter((deck) => deck.lessonId !== 'water-u7-l1'),
  salinometer,
];
