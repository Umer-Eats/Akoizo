import { defineDeck, type Deck } from './presentation-types.ts';
import { decks as divisionCDecks } from './presentations-experimental-design.ts';

// Experimental Design (Division B) presentations, one per lesson, following presentations-anatomy.ts.
// Lessons shared with Division C word for word use the Division C decks; exp-u7-l1-b, the report
// lesson written for Division B, gets its own deck here.

const shared = [
  'exp-u1-l1',
  'exp-u2-l1',
  'exp-u3-l1',
  'exp-u4-l1',
  'exp-u5-l1',
  'exp-u6-l1',
  'exp-u8-l1',
];

const report = defineDeck('exp-u7-l1-b', [
  {
    kind: 'title',
    title: 'A clear Division B investigation report',
    subtitle: 'A report another team could repeat, with ==a conclusion the data can support==.',
    objectives: [
      'Write a **measurable question** with clear variables.',
      'Keep **raw evidence** in a data table, including surprises.',
      'Summarize with the **mean** and **range**, and graph correctly.',
      'Write a **conclusion** backed by numbers, with an error and an improvement.',
    ],
    image: 'xd-method',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which part of a lab report do you find hardest to write?',
    options: ['The question and hypothesis', 'The data table', 'The graph', 'The conclusion'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Make the question measurable',
    bullets: [
      'Name what you **change** (the **independent variable**) and what you **measure** (the **dependent variable**).',
      'Example: “How does **towel area** affect **absorbed water mass**?”',
      'Test **several levels** of the independent variable, such as 25, 50, and 75 cm².',
      'Keep the **same material and soak time**, and describe the method so ==another team can repeat it==.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'In the towel investigation, what role does each item play?',
    bins: ['Independent variable', 'Dependent variable', 'Controlled variable'],
    items: [
      ['Towel area', 0],
      ['Mass of water absorbed', 1],
      ['Towel brand', 2],
      ['Soak time', 2],
      ['Draining method', 2],
    ],
    explanation:
      'Area is what the team changes, absorbed mass is what they measure, and brand, soak time, and draining method stay the same so the test is fair.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Which question is the most measurable?',
    options: [
      'Are some towels better?',
      'How does towel area affect the mass of water it absorbs?',
      'Why do people like soft towels?',
      'What is the best towel brand in the world?',
    ],
    answer: 1,
    explanation:
      'It names one variable to change (area) and one quantity to measure (absorbed mass), so it can be tested with a clear procedure.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Keep the raw evidence',
    image: 'xd-hahn-notebook',
    caption:
      'A scientist’s notebook from 1938: readings written down ==at the moment they were measured==, not cleaned up later.',
    bullets: [
      'Give each **trial** its own row, with **units** in the column headings.',
      'Record **qualitative observations** separately from numbers.',
      'Keep **unexpected values** visible and explain possible causes.',
      'Never erase a result just because it weakens your hypothesis.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which habits make a data table trustworthy? Choose all that apply.',
    options: [
      'One row for each trial',
      'Units written in the column headings',
      'Deleting the trial that did not fit the hypothesis',
      'Recording observations such as “towel tore” in a notes column',
      'Writing only the averages, not each trial',
    ],
    answers: [0, 1, 3],
    explanation:
      'Every trial and its units should be visible, and notes explain surprises. Deleting results or keeping only averages hides the evidence.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Why repeat each level of the investigation several times?',
    options: [
      'To make the table longer',
      'To reveal how much results vary under the same conditions',
      'So you can pick the trial you like best',
      'Because the rules require exactly ten trials',
    ],
    answer: 1,
    explanation:
      'Repeated trials show variation under the same conditions, which tells you how much to trust a difference between levels.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Summarize and graph',
    image: 'xd-boxplot',
    bullets: [
      'The **mean** is the sum of the measurements divided by how many there are.',
      'The **range** is the largest value minus the smallest.',
      'Label **both axes** with units; put the **independent variable on the horizontal axis**.',
      'Compare means ==alongside the spread== of the repeated measurements.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'Three trials absorbed 4 g, 6 g, and 8 g of water. What is the mean, in grams?',
    answer: 6,
    tolerance: 0.01,
    unit: 'g',
    explanation: 'Mean = (4 + 6 + 8) ÷ 3 = 18 ÷ 3 = 6 g.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'For the same trials (4 g, 6 g, and 8 g), what is the range, in grams?',
    answer: 4,
    tolerance: 0.01,
    unit: 'g',
    explanation: 'Range = largest − smallest = 8 g − 4 g = 4 g.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'In the towel investigation, what belongs on the horizontal axis of the graph?',
    options: ['Mass of water absorbed (g)', 'Towel area (cm²)', 'Trial number', 'Soak time (s)'],
    answer: 1,
    explanation:
      'The independent variable, towel area, goes on the horizontal axis; the measured absorbed mass goes on the vertical axis.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: comparing two towel sizes',
    problem:
      'A **25 cm²** towel absorbed 2, 3, and 4 g. A **50 cm²** towel absorbed 5, 6, and 7 g. Brand, soak time, and draining were kept the same.',
    steps: [
      'Mean for 25 cm²: (2 + 3 + 4) ÷ 3 = **3 g**.',
      'Mean for 50 cm²: (5 + 6 + 7) ÷ 3 = **6 g**.',
      'Each group has a **2 g range**, and the groups do not overlap.',
    ],
    conclusion: 'Doubling the area ==increased the mean absorbed mass from 3 g to 6 g==.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Support the conclusion',
    bullets: [
      'Say whether the results **support the hypothesis**, and **quote numbers** as evidence.',
      'Connect the result to a **scientific explanation**: more area means more fibers to hold water.',
      'Name a **specific error** and how it might change the measurement.',
      'Suggest an **improvement** that fixes that error.',
      'Follow the **Division B checklist** in the Rules; a Division C abstract does not replace it.',
    ],
    callout: 'A strong conclusion is a claim, numerical evidence, and an explanation.',
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Put the parts of a strong conclusion in a sensible order.',
    items: [
      'State whether the hypothesis was supported',
      'Quote the numerical evidence',
      'Explain the result scientifically',
      'Name a specific source of error',
      'Suggest an improvement that addresses that error',
    ],
    explanation:
      'Lead with the claim, back it with numbers and an explanation, then discuss a specific error and how to fix it.',
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['Mean', 'Sum of measurements divided by their number'],
      ['Range', 'Largest value minus smallest value'],
      ['Trial', 'One repetition of a measurement'],
      ['Conclusion', 'A claim supported by the recorded evidence'],
    ],
    explanation:
      'These are the core words for summarizing data and writing the final part of a Division B report.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'A measurable question names the **independent** and **dependent** variables.',
      'Keep **every trial** with units, and explain surprises instead of erasing them.',
      'Report the **mean** with the **range**, and graph the independent variable on the horizontal axis.',
      'Conclusions need ==a claim, numbers, an explanation, an error, and an improvement==.',
    ],
  },
  {
    kind: 'open',
    prompt:
      'One towel trial absorbed far less water than the others at the same area. Write two sentences explaining how you would handle it in your report.',
    model:
      'I would keep the value in the data table and note what might have caused it, such as the towel not being fully soaked. I would discuss it as a possible error and suggest timing each soak more carefully next time.',
  },
]);

export const decks: Deck[] = [
  ...divisionCDecks.filter((deck) => shared.includes(deck.lessonId)),
  report,
];
