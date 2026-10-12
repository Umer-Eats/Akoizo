import { check, phet, sort, type EventExtras } from '../lesson-extras.ts';
import {
  arrow,
  choice,
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

const prevalence: TopicLab = {
  id: 'epi-prevalence',
  title: 'Incidence, duration, and prevalence',
  lead: 'Prevalence is a pool: new cases flow in, and recovery or death drains it. How full it gets depends on both the inflow and how long each case stays.',
  controls: [
    slider('inc', 'Incidence rate', 1, 100, 1, 10, 'per 1,000 person-years'),
    slider('dur', 'Average duration of illness', 0.1, 20, 0.1, 2, 'years'),
  ],
  run: (v) => {
    const prev = (d: number) => {
      const odds = (v.inc / 1000) * d;
      return (odds / (1 + odds)) * 100;
    };
    return {
      o: { prev: prev(v.dur), existing: prev(v.dur) * 1000 },
      metrics: [
        { label: 'Prevalence at steady state', value: prev(v.dur), unit: '%' },
        {
          label: 'Existing cases in a population of 100,000',
          value: Math.round(prev(v.dur) * 1000),
        },
        {
          label: 'New cases each year in that population',
          value: Math.round(v.inc * 100 * (1 - prev(v.dur) / 100)),
        },
      ],
      plot: {
        title: 'Longer illnesses accumulate',
        x: [0.1, 20, 'Average duration (years)'],
        y: [0, 70, 'Prevalence (%)'],
        curves: [{ f: prev }],
        points: [{ x: v.dur, y: prev(v.dur), label: `${prev(v.dur).toFixed(1)}%` }],
      },
    };
  },
  missions: [
    goal(
      'Roughly double the starting prevalence without changing the incidence rate.',
      'If people live twice as long with the condition, the pool holds twice as many.',
      { dur: 4 },
      (o, v) => v.inc === 10 && near(o.prev / 1.9608, 2, 0.06),
    ),
    goal(
      'Show a common but brief illness: incidence of at least 50 per 1,000 with prevalence under 1%.',
      'Make the duration very short.',
      { inc: 50, dur: 0.1 },
      (o, v) => v.inc >= 50 && o.prev < 1,
    ),
    goal(
      'With incidence at 10 per 1,000, find the duration at which about 10% of the population is affected.',
      'Prevalence odds = incidence × duration, so you need a duration near 11 years.',
      { dur: 11.1 },
      (o, v) => v.inc === 10 && near(o.prev, 10, 0.15),
    ),
  ],
  predict: {
    q: 'A new treatment keeps people with a chronic disease alive much longer but does not cure them. Over time the disease’s prevalence will…',
    options: ['Rise', 'Fall', 'Stay the same', 'Drop to zero'],
    correct: 0,
    why: 'Incidence is unchanged but each case now remains in the pool longer. Rising prevalence can therefore be a sign of better care, not of a worsening epidemic.',
  },
  model:
    'Steady-state relationship: prevalence odds = incidence rate × mean duration, so P = ID / (1 + ID). Assumes constant incidence and duration and a stable population; it does not describe an outbreak that is still growing.',
};

const confounding: TopicLab = {
  id: 'epi-confounding',
  title: 'How a confounder manufactures an association',
  lead: 'Here the exposure does nothing at all: within each age group, exposed and unexposed people have identical risk. Watch the crude comparison anyway.',
  controls: [
    slider('pe', 'Share of the exposed group who are older', 0, 100, 5, 50, '%'),
    slider('pu', 'Share of the unexposed group who are older', 0, 100, 5, 50, '%'),
    slider('ro', 'Risk of disease in older people', 1, 60, 1, 30, 'per 100'),
    slider('ry', 'Risk of disease in younger people', 1, 60, 1, 5, 'per 100'),
  ],
  run: (v) => {
    const exposed = (v.pe * v.ro + (100 - v.pe) * v.ry) / 100,
      unexposed = (v.pu * v.ro + (100 - v.pu) * v.ry) / 100;
    return {
      o: { crude: exposed / unexposed, exposed, unexposed },
      metrics: [
        { label: 'Crude risk in the exposed', value: exposed, unit: 'per 100' },
        { label: 'Crude risk in the unexposed', value: unexposed, unit: 'per 100' },
        { label: 'Crude risk ratio', value: exposed / unexposed },
        { label: 'Risk ratio within each age group', value: '1.00 — no effect of exposure' },
      ],
      bars: {
        title: 'Risk per 100 people',
        max: 60,
        items: [
          { label: 'Exposed (all ages combined)', value: exposed, tone: 'warm' },
          { label: 'Unexposed (all ages combined)', value: unexposed, tone: 'cool' },
          { label: 'Older people, either exposure group', value: v.ro, tone: 'muted' },
          { label: 'Younger people, either exposure group', value: v.ry, tone: 'muted' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Create a crude risk ratio of at least 2 even though the exposure has no effect.',
      'Make the exposed group much older than the unexposed group.',
      { pe: 80, pu: 20 },
      (o) => o.crude >= 2,
    ),
    goal(
      'Make the useless exposure look protective: a crude risk ratio below 0.6.',
      'Now make the exposed group the younger one.',
      { pe: 10, pu: 80 },
      (o) => o.crude < 0.6,
    ),
    goal(
      'Keep the age mix unequal but make the confounding vanish.',
      'A factor that does not change the risk of disease cannot confound.',
      { pe: 80, pu: 20, ro: 5 },
      (o, v) => v.pe !== v.pu && near(o.crude, 1, 1e-9),
    ),
  ],
  predict: {
    q: 'For a variable to confound an exposure–disease association, it must be associated with…',
    options: [
      'Both the exposure and the disease, without lying on the causal pathway between them',
      'The exposure only',
      'The disease only',
      'Neither; it only needs to be measured badly',
    ],
    correct: 0,
    why: 'Remove either link and the crude comparison is no longer distorted — which is exactly what stratification, matching, and randomisation aim to do.',
  },
  model:
    'Two age strata with exposure having no effect in either. Crude risks are weighted averages of the stratum risks, so unequal age mixes produce a spurious ratio. Real confounding usually involves several variables and is handled by stratified or adjusted analysis.',
};

const curveShape = (mode: number, inc: number, d: number) => {
  if (mode === 0) return d <= 5 ? 0 : 30 * Math.exp(-(Math.log((d - 5) / inc) ** 2) / 0.32);
  if (mode === 1)
    return (15 / (1 + Math.exp(-(d - 5 - inc)))) * (1 - 1 / (1 + Math.exp(-(d - 25 - inc) / 1.5)));
  return [4, 9, 16, 22].reduce(
    (sum, height, k) =>
      sum + height * Math.exp(-(((d - 5 - inc * (k + 1)) / (inc * 0.25 + 0.4)) ** 2)),
    0,
  );
};
const epiCurve: TopicLab = {
  id: 'epi-curve',
  title: 'Epidemic curve shapes',
  lead: 'The shape of an outbreak’s onset curve is a clue to how people were exposed. Generate the three classic patterns and read them.',
  controls: [
    choice(
      'mode',
      'How exposure happened',
      ['Point source', 'Continuous common source', 'Propagated, person to person'],
      0,
    ),
    slider('inc', 'Typical incubation period', 1, 14, 1, 3, 'days'),
    slider('day', 'Day examined', 0, 40, 1, 0, ''),
  ],
  run: (v) => {
    const cases = (d: number) => curveShape(v.mode, v.inc, d);
    let peak = 0,
      peakDay = 0;
    for (let d = 0; d <= 40; d += 0.25) if (cases(d) > peak) [peak, peakDay] = [cases(d), d];
    return {
      o: { cases: cases(v.day), peak, peakDay },
      metrics: [
        { label: 'New cases on the day examined', value: Math.round(cases(v.day)) },
        { label: 'Day of the highest peak', value: peakDay },
        {
          label: 'Reading the shape',
          value: [
            'One sharp peak, all cases within about one incubation period',
            'A plateau that lasts as long as the source persists',
            'Successive, growing waves one incubation period apart',
          ][v.mode],
        },
      ],
      plot: {
        title: 'Cases by day of symptom onset',
        x: [0, 40, 'Day of onset'],
        y: [0, 35, 'New cases'],
        curves: [{ f: cases }],
        vlines: [{ x: 5, label: 'first exposure' }],
        points: [{ x: v.day, y: cases(v.day), label: `${Math.round(cases(v.day))}` }],
      },
    };
  },
  missions: [
    goal(
      'For the point-source outbreak, move the examined day onto the peak of the curve.',
      'The peak follows the exposure by about one typical incubation period.',
      { day: 8 },
      (o, v) => v.mode === 0 && v.day > 0 && near(o.cases, o.peak, 0.5),
    ),
    goal(
      'For a propagated outbreak with a 7-day incubation, find the peak of the second wave.',
      'Waves are spaced one incubation period apart, starting from the first exposure on day 5.',
      { mode: 2, inc: 7, day: 19 },
      (o, v) => v.mode === 2 && v.inc === 7 && v.day === 19,
    ),
    goal(
      'For a continuous common source, find a day on the plateau at least ten days after it began.',
      'Cases stay level while people keep being exposed.',
      { mode: 1, day: 20 },
      (o, v) => v.mode === 1 && v.day >= 20 && o.cases > 13,
    ),
  ],
  predict: {
    q: 'An epidemic curve shows a single sharp peak with all cases falling within one incubation period. This suggests…',
    options: [
      'A point-source exposure',
      'Person-to-person spread',
      'A continuing common source',
      'No common exposure at all',
    ],
    correct: 0,
    why: 'Everyone was exposed at about the same time, so onset times are spread only by variation in incubation. Propagated outbreaks show successive waves instead.',
  },
  model:
    'Stylised curves: a log-normal-shaped peak for a point source, a logistic rise and fall for a continuing source removed on day 25, and four growing Gaussian waves one incubation period apart for propagated spread. Real curves are noisier and often mixed.',
};

const foods: [string, number, number, number, number][] = [
  ['Potato salad', 45, 60, 5, 40],
  ['Chicken', 42, 80, 8, 20],
  ['Ice cream', 25, 50, 25, 50],
  ['Lemonade', 33, 70, 17, 30],
];
const attack: TopicLab = {
  id: 'epi-attack',
  title: 'Food-specific attack rates',
  lead: 'One hundred people attended a picnic and fifty became ill. Compare attack rates in those who ate and did not eat each item to find the likely vehicle.',
  controls: [
    choice(
      'food',
      'Food item examined',
      foods.map(([name]) => name),
      1,
    ),
    choice(
      'verdict',
      'Your conclusion: the most likely vehicle',
      ['Undecided', ...foods.map(([name]) => name)],
      0,
    ),
  ],
  run: (v) => {
    const [name, illAte, ate, illNot, not] = foods[v.food],
      arAte = (illAte / ate) * 100,
      arNot = (illNot / not) * 100;
    return {
      o: { rr: arAte / arNot, arAte, arNot, correct: v.verdict === 1 ? 1 : 0 },
      metrics: [
        { label: 'Among those who ate this food', value: `${illAte} ill of ${ate}` },
        { label: 'Among those who did not eat it', value: `${illNot} ill of ${not}` },
        { label: 'Attack rate in those who ate it', value: arAte, unit: '%' },
        { label: 'Attack rate in those who did not', value: arNot, unit: '%' },
        { label: 'Risk ratio', value: arAte / arNot },
        {
          label: 'Your conclusion',
          value:
            v.verdict === 0
              ? 'Compare all four foods before deciding'
              : v.verdict === 1
                ? 'Consistent with the data'
                : 'Another food fits the data better',
        },
      ],
      bars: {
        title: `Attack rates for ${name.toLowerCase()} (%)`,
        max: 100,
        items: [
          { label: 'Ate it', value: arAte, tone: 'warm' },
          { label: 'Did not eat it', value: arNot, tone: 'cool' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Find a food that looks “protective” — a risk ratio below 1.',
      'People who did not eat it were ill slightly more often.',
      { food: 3 },
      (o) => o.rr < 1,
    ),
    goal(
      'Find a food with no association at all with illness.',
      'Its two attack rates are identical.',
      { food: 2 },
      (o) => near(o.rr, 1, 1e-9),
    ),
    goal(
      'Name the most likely vehicle of the outbreak.',
      'Look for a high attack rate in those who ate it together with a low rate in those who did not.',
      { food: 0, verdict: 1 },
      (o) => o.correct === 1,
    ),
  ],
  predict: {
    q: 'In a food-borne outbreak, the most likely vehicle is the food with…',
    options: [
      'A high attack rate among those who ate it and a low attack rate among those who did not',
      'The highest number of people who ate it',
      'The highest attack rate among those who ate it, regardless of the others',
      'The lowest overall attack rate',
    ],
    correct: 0,
    why: 'A popular food can have many ill eaters by chance. It is the contrast between eaters and non-eaters — a large risk ratio — that points to the vehicle.',
  },
  model:
    'A synthetic retrospective cohort of 100 attendees with 50 cases. Attack rate = ill ÷ total in each group; risk ratio = attack rate in eaters ÷ attack rate in non-eaters. A real investigation would add confidence intervals, dose-response, and laboratory confirmation.',
};

const designs = [
  'Randomised controlled trial',
  'Non-randomised intervention study',
  'Ecological study',
  'Cohort study',
  'Case-control study',
  'Cross-sectional study',
];
const measures = [
  'Risk ratio',
  'Risk ratio, interpreted cautiously',
  'Correlation between group-level rates',
  'Risk ratio or rate ratio',
  'Odds ratio',
  'Prevalence ratio',
];
const weaknesses = [
  'Cost, ethics, and limited generalisability',
  'Groups may differ in ways that affect the outcome',
  'Ecological fallacy: group patterns need not hold for individuals',
  'Loss to follow-up; inefficient for rare diseases',
  'Recall and selection bias; cannot give risk directly',
  'Cannot establish which came first',
];
const design: TopicLab = {
  id: 'epi-design',
  title: 'Identifying a study design',
  lead: 'A design is defined by a few decisions: who controls the exposure, how participants are chosen, and what the unit of analysis is.',
  controls: [
    toggle('assign', 'The investigators assign the exposure'),
    toggle('random', 'Assignment is random'),
    choice(
      'basis',
      'Participants are selected on the basis of',
      ['Exposure status', 'Outcome (disease) status', 'Neither — a snapshot of a population'],
      0,
    ),
    choice('unit', 'Data are analysed for', ['Individuals', 'Whole groups or regions'], 0),
  ],
  run: (v) => {
    const id = v.assign
      ? v.random
        ? 0
        : 1
      : v.unit === 1
        ? 2
        : v.basis === 0
          ? 3
          : v.basis === 1
            ? 4
            : 5;
    const box = (x: number, y: number, label: string, on: boolean): Shape[] => [
      rect(x, y, 250, 34, on ? 'slot' : 'muted', on, on ? 0.3 : 1, 6),
      text(x + 125, y + 22, label, 'middle', on ? 'ink' : 'muted', 12),
    ];
    return {
      o: { id },
      metrics: [
        { label: 'Study design', value: designs[id] },
        { label: 'Natural measure of association', value: measures[id] },
        { label: 'Main weakness to address', value: weaknesses[id] },
      ],
      sceneLabel: `Decision path leading to ${designs[id]}`,
      scene: [
        ...box(40, 40, 'Investigator assigns exposure?', true),
        ...box(350, 20, 'Yes → experimental', !!v.assign),
        ...box(350, 62, 'No → observational', !v.assign),
        ...arrow(290, 57, 350, 40, v.assign ? 'slot' : 'muted', 1.5),
        ...arrow(290, 57, 350, 78, v.assign ? 'muted' : 'slot', 1.5),
        ...box(40, 140, v.assign ? 'Random assignment?' : 'Unit: individuals or groups?', true),
        ...box(
          350,
          140,
          v.assign
            ? v.random
              ? 'Yes'
              : 'No'
            : v.unit === 1
              ? 'Groups'
              : 'Individuals → selected by…',
          true,
        ),
        ...arrow(290, 157, 350, 157, 'slot', 1.5),
        ...box(195, 250, designs[id], true),
        ...arrow(320, 180, 320, 250, 'slot', 1.5),
      ],
    };
  },
  missions: [
    goal(
      'Describe a case-control study.',
      'Observational, with individuals chosen according to whether they have the disease.',
      { basis: 1 },
      (o) => o.id === 4,
    ),
    goal(
      'Describe a randomised controlled trial.',
      'The investigators assign the exposure, and they do it at random.',
      { assign: 1, random: 1 },
      (o) => o.id === 0,
    ),
    goal(
      'Describe an ecological study.',
      'Observational, comparing whole groups or regions rather than individuals.',
      { unit: 1 },
      (o) => o.id === 2,
    ),
    goal(
      'Describe a cross-sectional study.',
      'Exposure and outcome are measured together in one snapshot.',
      { basis: 2 },
      (o) => o.id === 5,
    ),
  ],
  predict: {
    q: 'Investigators enrol people who have a disease and similar people who do not, then ask both groups about past exposures. This is a…',
    options: ['Case-control study', 'Cohort study', 'Randomised trial', 'Cross-sectional study'],
    correct: 0,
    why: 'Selection is by outcome, and exposure is assessed looking backward. A cohort study would select by exposure and follow people forward to see who becomes ill.',
  },
  model:
    'A simplified decision path covering six common designs. Real studies can be hybrids (nested case-control, cluster-randomised trials, case-crossover), and a design’s label matters less than whether its comparison is fair.',
};

const surveillance: TopicLab = {
  id: 'epi-surveillance',
  title: 'Will the surveillance system notice?',
  lead: 'A system raises an alert when reports exceed the usual level by more than chance would explain. Incomplete reporting shrinks the signal faster than the noise.',
  controls: [
    slider('base', 'Usual true cases per week', 2, 100, 1, 20, ''),
    slider('now', 'True cases this week', 0, 300, 1, 40, ''),
    slider('comp', 'Reporting completeness', 10, 100, 5, 20, '%'),
  ],
  run: (v) => {
    const usual = (v.base * v.comp) / 100,
      seen = (v.now * v.comp) / 100,
      threshold = usual + 2 * Math.sqrt(usual),
      alert = seen > threshold ? 1 : 0;
    return {
      o: { usual, seen, threshold, alert, z: (seen - usual) / Math.sqrt(usual) },
      metrics: [
        { label: 'Reports expected in a usual week', value: usual },
        { label: 'Alert threshold (expected + 2 standard deviations)', value: threshold },
        { label: 'Reports received this week', value: seen },
        { label: 'System response', value: alert ? 'ALERT — investigate' : 'No alert' },
        { label: 'Cases the system never hears about', value: v.now - seen },
      ],
      bars: {
        title: 'Weekly reports',
        max: Math.max(threshold, seen) * 1.1,
        items: [
          { label: 'Expected', value: usual, tone: 'muted' },
          { label: 'Alert threshold', value: threshold, tone: 'gold' },
          { label: 'Received this week', value: seen, tone: alert ? 'warm' : 'accent' },
        ],
      },
    };
  },
  missions: [
    goal(
      'True cases have doubled from 20 to 40. Find the lowest reporting completeness at which the system raises an alert.',
      'More complete reporting makes the same doubling stand out from random variation.',
      { comp: 25 },
      (o, v) => v.base === 20 && v.now === 40 && o.alert === 1 && v.comp <= 25,
    ),
    goal(
      'Show a real 50% increase (20 to 30 cases) that a half-complete system fails to flag.',
      'Set completeness to 50% and check the threshold.',
      { now: 30, comp: 50 },
      (o, v) => v.base === 20 && v.now === 30 && v.comp >= 50 && o.alert === 0,
    ),
    goal(
      'With complete reporting and a usual 20 cases, find the smallest weekly count that triggers an alert.',
      'The threshold is 20 + 2√20.',
      { comp: 100, now: 29 },
      (o, v) => v.comp === 100 && v.base === 20 && o.alert === 1 && v.now <= 29,
    ),
  ],
  predict: {
    q: 'Compared with passive surveillance, an active surveillance system generally provides…',
    options: [
      'More complete and timely reporting, at greater cost',
      'Less complete reporting at lower cost',
      'The same data with no extra effort',
      'Only laboratory results',
    ],
    correct: 0,
    why: 'Active surveillance has health staff seek out cases rather than wait for reports. It finds more of them but requires people and money, so it is used selectively.',
  },
  model:
    'Weekly counts treated as Poisson, so the standard deviation of reports is the square root of the expected number; the alert threshold is the expected count plus two standard deviations. Real systems also account for season, reporting delay, and day-of-week effects.',
};

const phi = (z: number) => {
  // Normal cumulative distribution (Abramowitz–Stegun 7.1.26 error-function approximation).
  const x = Math.abs(z) / Math.SQRT2,
    t = 1 / (1 + 0.3275911 * x),
    erf =
      1 -
      ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
        t *
        Math.exp(-x * x);
  return z >= 0 ? (1 + erf) / 2 : (1 - erf) / 2;
};
const bell = (x: number, mean: number) => Math.exp(-((x - mean) ** 2) / 2) / Math.sqrt(2 * Math.PI);
const caseDef: TopicLab = {
  id: 'epi-casedef',
  title: 'Tightening and loosening a case definition',
  lead: 'A case definition draws a line through overlapping groups. Move the line and you trade missed cases for false alarms.',
  controls: [
    slider('thr', 'Symptom score required to count as a case', 0, 10, 0.1, 5, ''),
    slider('sep', 'How well the criteria separate ill from well', 1, 5, 0.25, 3, ''),
  ],
  run: (v) => {
    const ill = 5 + v.sep / 2,
      well = 5 - v.sep / 2,
      sens = 1 - phi(v.thr - ill),
      spec = phi(v.thr - well);
    return {
      o: { sens, spec, youden: sens + spec - 1 },
      metrics: [
        { label: 'Sensitivity (true cases captured)', value: sens * 100, unit: '%' },
        { label: 'Specificity (non-cases excluded)', value: spec * 100, unit: '%' },
        { label: 'True cases missed', value: (1 - sens) * 100, unit: '%' },
        { label: 'Non-cases wrongly counted', value: (1 - spec) * 100, unit: '%' },
      ],
      plot: {
        title: 'Score distributions and the case-definition cut-off',
        x: [0, 10, 'Symptom score'],
        y: [0, 0.45, 'Relative frequency'],
        curves: [
          { f: (x) => bell(x, ill), label: 'truly ill', tone: 'warm' },
          { f: (x) => bell(x, well), label: 'not ill', tone: 'cool' },
        ],
        vlines: [{ x: v.thr, label: 'counted as a case →' }],
      },
    };
  },
  missions: [
    goal(
      'Write a broad “suspect case” definition: sensitivity of at least 99%.',
      'Lower the required score until almost no true case is missed — and note the specificity you give up.',
      { thr: 4.1 },
      (o) => o.sens >= 0.99,
    ),
    goal(
      'Write a strict “confirmed case” definition: specificity of at least 99.5%.',
      'Raise the required score until almost no well person qualifies.',
      { thr: 6.1 },
      (o) => o.spec >= 0.995,
    ),
    goal(
      'With poorly separating criteria (separation 1), find the cut-off where sensitivity and specificity are equal.',
      'By symmetry it lies midway between the two groups — and neither value is impressive.',
      { sep: 1 },
      (o, v) => v.sep === 1 && near(o.sens, o.spec, 0.01),
    ),
  ],
  predict: {
    q: 'Early in an outbreak investigation, the working case definition is usually…',
    options: [
      'Broad and sensitive, then narrowed as more is learned',
      'As strict as possible from the start',
      'Limited to laboratory-confirmed cases only',
      'Left undefined until the outbreak ends',
    ],
    correct: 0,
    why: 'Missing cases early hides the outbreak’s extent and its clues. Suspect, probable, and confirmed tiers let the definition tighten later without losing them.',
  },
  model:
    'Two unit-variance normal score distributions for ill and well people, separated by the chosen amount. Sensitivity and specificity follow from the cut-off. Real case definitions combine clinical, laboratory, and person–place–time criteria rather than a single score.',
};

const chance: TopicLab = {
  id: 'epi-chance',
  title: 'Sample size and the confidence interval',
  lead: 'A risk ratio from a small study could have arisen by chance. The confidence interval shows the range of values the data are compatible with.',
  controls: [
    slider('n', 'People in each group', 10, 2000, 10, 50, ''),
    slider('p1', 'Risk in the exposed', 1, 60, 1, 20, '%'),
    slider('p0', 'Risk in the unexposed', 1, 60, 1, 10, '%'),
  ],
  run: (v) => {
    const rr = v.p1 / v.p0,
      se = (n: number) => Math.sqrt((100 - v.p1) / (n * v.p1) + (100 - v.p0) / (n * v.p0)),
      lower = (n: number) => Math.exp(Math.log(rr) - 1.96 * se(n)),
      upper = (n: number) => Math.exp(Math.log(rr) + 1.96 * se(n));
    return {
      o: { rr, lower: lower(v.n), upper: upper(v.n) },
      metrics: [
        { label: 'Risk ratio', value: rr },
        {
          label: '95% confidence interval',
          value: `${lower(v.n).toFixed(2)} to ${upper(v.n).toFixed(2)}`,
        },
        {
          label: 'Is a ratio of 1 (no association) inside the interval?',
          value:
            lower(v.n) <= 1 && upper(v.n) >= 1
              ? 'Yes — chance is a plausible explanation'
              : 'No — unlikely to be chance alone',
        },
      ],
      plot: {
        title: 'The interval narrows as the study grows',
        x: [10, 2000, 'People per group'],
        y: [0, 6, 'Risk ratio'],
        curves: [
          { f: upper, label: 'upper limit', tone: 'cool' },
          { f: lower, label: 'lower limit', tone: 'warm' },
        ],
        hlines: [{ y: 1, label: 'no association' }],
        points: [{ x: v.n, y: rr, label: `RR ${rr.toFixed(2)}` }],
      },
    };
  },
  missions: [
    goal(
      'With risks of 20% and 10%, find the smallest group size whose interval excludes 1.',
      'Add people until the lower limit rises above 1.',
      { n: 110 },
      (o, v) => v.p1 === 20 && v.p0 === 10 && o.lower > 1 && v.n <= 110,
    ),
    goal(
      'Show a statistically clear but small effect: a risk ratio of 1.2 or less whose interval still excludes 1.',
      'A very large study can detect a trivial difference.',
      { p1: 12, n: 2000 },
      (o) => o.rr > 1 && o.rr <= 1.2 && o.lower > 1,
    ),
    goal(
      'Show a large risk ratio of 3 or more that is still compatible with chance.',
      'Use rare outcomes in a small study.',
      { p1: 6, p0: 2 },
      (o) => o.rr >= 3 && o.lower < 1,
    ),
  ],
  predict: {
    q: 'A study is repeated with four times as many participants. Its confidence interval becomes roughly…',
    options: ['Half as wide', 'One quarter as wide', 'Twice as wide', 'Unchanged'],
    correct: 0,
    why: 'Standard error shrinks with the square root of sample size, so quadrupling n halves the interval’s width (on the log scale for a ratio).',
  },
  model:
    'Large-sample 95% interval for a risk ratio: exp(ln RR ± 1.96·SE), SE = √((1 − p₁)/(n p₁) + (1 − p₀)/(n p₀)). It addresses random error only; bias and confounding can produce a tight interval around the wrong answer.',
};

function outbreak(r0: number, immune: number) {
  // Deterministic SIR model: 10,000 people, five-day infectious period, quarter-day steps.
  let s = Math.max(0, 10000 * (1 - immune) - 1),
    i = 1;
  const daily = [i / 10000];
  for (let step = 1; step <= 480; step++) {
    const infections = Math.min(s, ((r0 / 5) * s * i) / 10000 / 4),
      recoveries = i / 5 / 4;
    s -= infections;
    i += infections - recoveries;
    if (step % 4 === 0) daily.push(i / 10000);
  }
  return { daily, attack: 1 - immune - s / 10000 };
}
const transmission: TopicLab = {
  id: 'epi-r0',
  title: 'Reproduction number and vaccination',
  lead: 'An outbreak grows while each case infects more than one other. Immunise enough people and transmission chains die out — protecting the unvaccinated too.',
  controls: [
    slider('r0', 'Basic reproduction number R₀', 1, 18, 0.5, 3, ''),
    slider('cov', 'Vaccination coverage', 0, 100, 1, 0, '%'),
    slider('eff', 'Vaccine effectiveness', 50, 100, 5, 95, '%'),
    slider('day', 'Day of the outbreak', 0, 120, 1, 0, ''),
  ],
  run: (v) => {
    const immune = (v.cov / 100) * (v.eff / 100),
      re = v.r0 * (1 - immune),
      sim = outbreak(v.r0, immune);
    return {
      o: { re, threshold: (1 - 1 / v.r0) * 100, attack: sim.attack, infectious: sim.daily[v.day] },
      metrics: [
        { label: 'Effective reproduction number at the start', value: re },
        { label: 'Herd-immunity threshold', value: (1 - 1 / v.r0) * 100, unit: '% immune' },
        {
          label: 'Infectious on the day examined',
          value: sim.daily[v.day] * 100,
          unit: '% of population',
        },
        {
          label: 'Susceptible people eventually infected',
          value: sim.attack * 100,
          unit: '% of population',
        },
      ],
      note:
        re < 1
          ? 'Each case infects fewer than one other on average: introductions fizzle out.'
          : undefined,
      plot: {
        title: 'Infectious people over time',
        x: [0, 120, 'Day'],
        y: [0, 0.8, 'Fraction of the population infectious'],
        curves: [{ f: (d) => sim.daily[Math.max(0, Math.min(120, Math.round(d)))] }],
        points: [
          { x: v.day, y: sim.daily[v.day], label: `${(sim.daily[v.day] * 100).toFixed(1)}%` },
        ],
      },
    };
  },
  missions: [
    goal(
      'For a measles-like R₀ of 15 and a 95% effective vaccine, find the lowest coverage that prevents an outbreak.',
      'The effective reproduction number must fall below 1.',
      { r0: 15, cov: 99 },
      (o, v) => v.r0 === 15 && v.eff === 95 && o.re < 1 && v.cov <= 99,
    ),
    goal(
      'For an influenza-like R₀ of 1.5, find the lowest coverage that prevents an outbreak.',
      'The threshold 1 − 1/R₀ is only one third here.',
      { r0: 1.5, cov: 36 },
      (o, v) => v.r0 === 1.5 && v.eff === 95 && o.re < 1 && v.cov <= 36,
    ),
    goal(
      'With R₀ = 3 and no vaccination, run to day 120 and show that more than 90% of the population is infected.',
      'Outbreaks overshoot the herd-immunity threshold before they stop.',
      { day: 120 },
      (o, v) => v.r0 === 3 && v.cov === 0 && v.day === 120 && o.attack > 0.9,
    ),
  ],
  predict: {
    q: 'A disease has a basic reproduction number of 4. What share of the population must be immune to stop sustained transmission?',
    options: ['75%', '25%', '40%', '100%'],
    correct: 0,
    why: 'Threshold = 1 − 1/R₀ = 1 − 1/4. With three of every four contacts immune, each case infects on average only one other.',
  },
  model:
    'Deterministic SIR model for 10,000 well-mixed people with a five-day infectious period. Vaccination removes coverage × effectiveness of the population from the susceptible pool. Real populations mix unevenly, immunity can wane, and chance matters when cases are few.',
};

const screening: TopicLab = {
  id: 'epi-screening',
  title: 'Screening: predictive value depends on prevalence',
  lead: 'Sensitivity and specificity describe the test. What a positive result means for a person also depends on how common the disease is among those tested.',
  controls: [
    slider('prev', 'Prevalence in the screened population', 0.1, 50, 0.1, 1, '%'),
    slider('sens', 'Sensitivity', 50, 100, 1, 90, '%'),
    slider('spec', 'Specificity', 50, 100, 0.5, 95, '%'),
  ],
  run: (v) => {
    const cells = (prev: number) => {
      const d = prev * 100,
        tp = (d * v.sens) / 100,
        fp = ((10000 - d) * (100 - v.spec)) / 100;
      return { tp, fp, fn: d - tp, tn: 10000 - d - fp };
    };
    const c = cells(v.prev),
      ppv = (prev: number) => {
        const k = cells(prev);
        return k.tp + k.fp === 0 ? 0 : k.tp / (k.tp + k.fp);
      };
    return {
      o: { ppv: ppv(v.prev), npv: c.tn / (c.tn + c.fn), fp: c.fp, tp: c.tp },
      metrics: [
        { label: 'Per 10,000 screened: true positives', value: Math.round(c.tp) },
        { label: 'False positives', value: Math.round(c.fp) },
        { label: 'False negatives', value: Math.round(c.fn) },
        { label: 'Positive predictive value', value: ppv(v.prev) * 100, unit: '%' },
        { label: 'Negative predictive value', value: (c.tn / (c.tn + c.fn)) * 100, unit: '%' },
      ],
      plot: {
        title: 'A positive result means more where disease is common',
        x: [0.1, 50, 'Prevalence (%)'],
        y: [0, 1, 'Positive predictive value'],
        curves: [{ f: ppv }],
        points: [{ x: v.prev, y: ppv(v.prev), label: `${(ppv(v.prev) * 100).toFixed(0)}%` }],
      },
    };
  },
  missions: [
    goal(
      'Changing only prevalence, find the lowest value at which a positive result is more likely true than false.',
      'True positives must outnumber false positives.',
      { prev: 5.3 },
      (o, v) => v.sens === 90 && v.spec === 95 && o.ppv > 0.5 && v.prev <= 5.3,
    ),
    goal(
      'At 1% prevalence, find the lowest specificity that lifts the positive predictive value to 50%.',
      'False positives come from the 99% who are healthy, so specificity is what matters.',
      { spec: 99.5 },
      (o, v) => near(v.prev, 1, 1e-9) && v.sens === 90 && o.ppv >= 0.5 && v.spec <= 99.5,
    ),
    goal(
      'At 1% prevalence, show a negative predictive value above 99.9%.',
      'Raise sensitivity so that very few cases are missed.',
      { sens: 95 },
      (o, v) => near(v.prev, 1, 1e-9) && o.npv > 0.999,
    ),
  ],
  predict: {
    q: 'A screening test is moved from a high-risk clinic to the general population, where the disease is much rarer. Its positive predictive value…',
    options: ['Falls', 'Rises', 'Stays the same', 'Becomes equal to its sensitivity'],
    correct: 0,
    why: 'Sensitivity and specificity are unchanged, but with fewer true cases the false positives from the large healthy group make up more of all positives.',
  },
  model:
    'Expected counts in 10,000 people for fixed sensitivity and specificity. PPV = TP/(TP + FP); NPV = TN/(TN + FN). Assumes test performance does not vary with disease stage or population, which is not always true.',
};

const agents: [string, number, number][] = [
  ['Staphylococcal toxin', 1 / 24, 0.25],
  ['Salmonella', 0.25, 3],
  ['E. coli O157:H7', 1, 8],
  ['Hepatitis A', 15, 50],
];
const incubation: TopicLab = {
  id: 'epi-incubation',
  title: 'Working back to the exposure window',
  lead: 'If you know a pathogen’s incubation range, the first and last onset dates bracket when a shared exposure could have happened.',
  controls: [
    choice(
      'agent',
      'Suspected agent',
      agents.map(
        ([name, lo, hi]) =>
          `${name} · ${lo < 1 ? `${Math.round(lo * 24)} h` : `${lo} d`} to ${hi < 1 ? `${Math.round(hi * 24)} h` : `${hi} d`}`,
      ),
      1,
    ),
    slider('first', 'Onset of the first case', 1, 30, 0.5, 4, 'day'),
    slider('last', 'Onset of the last case', 1, 40, 0.5, 5, 'day'),
  ],
  run: (v) => {
    const [, lo, hi] = agents[v.agent],
      last = Math.max(v.first, v.last),
      earliest = last - hi,
      latest = v.first - lo,
      feasible = earliest <= latest ? 1 : 0,
      x = (d: number) => 80 + ((Math.max(-50, Math.min(40, d)) + 50) / 90) * 500;
    return {
      o: { earliest, latest, feasible, width: latest - earliest },
      metrics: [
        { label: 'Earliest possible exposure', value: `day ${earliest.toFixed(2)}` },
        { label: 'Latest possible exposure', value: `day ${latest.toFixed(2)}` },
        {
          label: 'Width of the exposure window',
          value: feasible ? Number((latest - earliest).toFixed(2)) : 0,
          unit: 'days',
        },
        {
          label: 'Single shared exposure?',
          value: feasible
            ? 'Plausible within this window'
            : 'No — onsets are too spread out for one exposure with this agent',
        },
      ],
      sceneLabel: `Timeline with onsets from day ${v.first} to day ${last} and ${feasible ? `an exposure window from day ${earliest.toFixed(1)} to ${latest.toFixed(1)}` : 'no single exposure window'}`,
      scene: [
        line(80, 200, 580, 200, 'muted', 2),
        ...[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40].flatMap((d) => [
          line(x(d), 194, x(d), 206, 'muted', 1.5),
          text(x(d), 226, `${d}`, 'middle', 'muted', 11),
        ]),
        rect(x(v.first), 150, Math.max(4, x(last) - x(v.first)), 40, 'warm', true, 0.55, 4),
        text((x(v.first) + x(last)) / 2, 140, 'onsets', 'middle', 'warm', 12),
        ...(feasible
          ? [
              rect(
                x(earliest),
                90,
                Math.max(4, x(latest) - x(earliest)),
                30,
                'slot',
                true,
                0.55,
                4,
              ),
              text((x(earliest) + x(latest)) / 2, 80, 'exposure window', 'middle', 'slot', 12),
            ]
          : [text(320, 100, 'No single exposure time fits every case', 'middle', 'slot', 13)]),
        text(
          330,
          260,
          'Day (first onset − minimum incubation; last onset − maximum incubation)',
          'middle',
          'muted',
          11,
        ),
      ],
    };
  },
  missions: [
    goal(
      'With Salmonella and a first onset on day 4, find a last-onset day that narrows the exposure window to under half a day.',
      'A wider spread of onsets pins the exposure down more tightly.',
      { last: 6.5 },
      (o, v) => v.agent === 1 && v.first === 4 && o.feasible === 1 && o.width < 0.5,
    ),
    goal(
      'Show onsets too spread out to come from a single Salmonella exposure.',
      'The spread cannot exceed the difference between the longest and shortest incubation.',
      { last: 7.5 },
      (o, v) => v.agent === 1 && o.feasible === 0,
    ),
    goal(
      'Switch to hepatitis A with onsets from day 20 to day 40 and read the exposure window.',
      'With incubation measured in weeks, the exposure lies well before the first case.',
      { agent: 3, first: 20, last: 40 },
      (o, v) => v.agent === 3 && v.first === 20 && v.last === 40,
    ),
  ],
  predict: {
    q: 'To find the latest possible time of a point-source exposure, count back from the…',
    options: [
      'First case by the minimum incubation period',
      'Last case by the minimum incubation period',
      'First case by the maximum incubation period',
      'Peak of the curve by the maximum incubation period',
    ],
    correct: 0,
    why: 'The first case cannot have been exposed later than one minimum incubation before it became ill. The last case and the maximum incubation give the earliest bound.',
  },
  model:
    'Exposure window = [last onset − maximum incubation, first onset − minimum incubation] with typical incubation ranges. Assumes one shared exposure and accurate onset times; secondary cases and misremembered dates widen real curves.',
};

export const diseaseDetectivesExtras: EventExtras = {
  eventId: 'disease-detectives',
  labs: [
    prevalence,
    confounding,
    epiCurve,
    attack,
    design,
    surveillance,
    caseDef,
    chance,
    transmission,
    screening,
    incubation,
  ],
  lessons: {
    'epi-u1-l1': {
      labs: ['epi-prevalence'],
      sort: sort(
        'Incidence or prevalence?',
        ['Incidence (new cases over time)', 'Prevalence (existing cases at a time)'],
        [
          ['120 new cases of influenza this week per 100,000 people', 0],
          ['8% of adults currently have diabetes', 1],
          ['Attack rate at a wedding reception', 0],
          ['Share of students with asthma on survey day', 1],
          ['Cases diagnosed per 1,000 person-years', 0],
          ['Number of people living with a condition today', 1],
        ],
      ),
      checks: [
        check(
          1,
          'A town reports 50 cases of a disease. Why can you not yet say whether that is a lot?',
          [
            'There is no denominator — the size of the population at risk is unknown',
            'Fifty is always a small number',
            'Cases must be confirmed by two laboratories',
            'Counts are only meaningful for chronic diseases',
          ],
          'Fifty cases among 500 people and among 5 million are very different situations. Rates need a numerator, a denominator, and a time period.',
        ),
      ],
    },
    'epi-u2-l1': {
      labs: ['epi-confounding'],
      sort: sort(
        'Which pioneer?',
        ['John Snow', 'James Lind', 'Ignaz Semmelweis'],
        [
          ['Mapped cholera deaths around a water pump', 0],
          ['Compared treatments for scurvy among sailors', 1],
          ['Introduced handwashing to cut childbed fever', 2],
          ['Compared death rates by water company', 0],
          ['An early controlled trial using citrus fruit', 1],
          ['Linked deaths to doctors arriving from autopsies', 2],
        ],
      ),
      checks: [
        check(
          4,
          'Ice-cream sales and drowning deaths both rise in summer. The best explanation for their association is…',
          [
            'Confounding by hot weather',
            'Ice cream causes drowning',
            'Drowning causes ice-cream sales',
            'Pure coincidence with no shared cause',
          ],
          'Temperature drives both swimming and ice-cream buying. An association produced by a shared cause is confounding, not causation.',
        ),
      ],
    },
    'epi-u3-l1': {
      labs: ['epi-curve'],
      sort: sort(
        'Person, place, or time?',
        ['Person', 'Place', 'Time'],
        [
          ['Age and sex of the cases', 0],
          ['A spot map of where cases live', 1],
          ['An epidemic curve', 2],
          ['Occupation of those affected', 0],
          ['Which school each case attends', 1],
          ['Date of symptom onset', 2],
        ],
      ),
      checks: [
        check(
          1,
          'In a line listing, each row represents…',
          [
            'One case, with columns for its characteristics',
            'One day of the outbreak',
            'One symptom',
            'One laboratory',
          ],
          'A line list is a table of individual cases — identifiers, demographics, onset time, symptoms, exposures — and is the raw material for descriptive epidemiology.',
        ),
      ],
    },
    'epi-u4-l1': {
      labs: ['epi-attack'],
      sort: sort(
        'Which measure fits the study?',
        ['Risk ratio', 'Odds ratio'],
        [
          ['A cohort of picnic guests followed for illness', 0],
          ['A case-control study of a rare cancer', 1],
          ['Attack rates among those who did and did not eat a food', 0],
          ['Cases and controls compared for past exposure', 1],
          ['A randomised vaccine trial', 0],
          ['Controls sampled without knowing the population size', 1],
        ],
      ),
      checks: [
        check(
          1,
          'Among 40 people who ate a dish, 30 became ill; among 60 who did not, 15 became ill. The risk ratio is…',
          ['3.0', '2.0', '0.33', '9.0'],
          'Attack rates are 30/40 = 75% and 15/60 = 25%; 75 ÷ 25 = 3.0.',
        ),
      ],
    },
    'epi-u5-l1': {
      labs: ['epi-design'],
      sort: sort(
        'Which bias?',
        ['Selection bias', 'Recall bias', 'Confounding'],
        [
          ['Controls recruited only from hospital patients', 0],
          ['Cases remember exposures more thoroughly than controls', 1],
          ['Smokers also drink more coffee', 2],
          ['Healthy volunteers are more likely to enrol', 0],
          ['Parents of ill children think harder about what was eaten', 1],
          ['Older people are both more exposed and more at risk', 2],
        ],
      ),
      checks: [
        check(
          2,
          'Why is a case-control design often chosen for a rare disease?',
          [
            'It starts with people who already have the disease, so few participants are needed',
            'It measures incidence directly',
            'It avoids all bias',
            'It proves causation',
          ],
          'A cohort would need to follow enormous numbers to see enough rare cases. Sampling by outcome is efficient, at the cost of relying on past-exposure data.',
        ),
      ],
    },
    'epi-u6-l1': {
      labs: ['epi-surveillance'],
      sort: sort(
        'Which type of surveillance?',
        ['Passive', 'Active', 'Sentinel', 'Syndromic'],
        [
          ['Clinicians send in notifiable-disease reports on their own', 0],
          ['Health staff phone laboratories each week to ask for cases', 1],
          ['Selected clinics report influenza-like illness in detail', 2],
          ['Emergency-department chief complaints monitored in near real time', 3],
          ['Lowest cost, least complete', 0],
          ['School absenteeism tracked for early warning', 3],
        ],
      ),
      checks: [
        check(
          0,
          'What distinguishes public health surveillance from a one-time survey?',
          [
            'It is ongoing and linked to action',
            'It uses larger samples',
            'It never involves laboratories',
            'It is always anonymous',
          ],
          'Surveillance is the continuous, systematic collection, analysis, and interpretation of data, with timely dissemination to those who can act.',
        ),
      ],
    },
    'epi-u7-l1': {
      labs: ['epi-casedef'],
      sort: sort(
        'Which case classification?',
        ['Suspect', 'Probable', 'Confirmed'],
        [
          ['Compatible symptoms only', 0],
          ['Compatible symptoms plus an epidemiological link to a confirmed case', 1],
          ['Laboratory isolation of the outbreak strain', 2],
          ['Diarrhoea in someone living in the affected town', 0],
          ['Typical illness in a guest who ate the implicated food', 1],
          ['Positive culture matching the outbreak fingerprint', 2],
        ],
      ),
      checks: [
        check(
          1,
          'A complete outbreak case definition specifies clinical criteria together with…',
          [
            'Person, place, and time',
            'The suspected cause',
            'The treatment given',
            'The name of the investigator',
          ],
          'Restricting by who, where, and when keeps unrelated illness out. The hypothesised exposure is deliberately left out so that it can be tested.',
        ),
      ],
    },
    'epi-u8-l1': {
      labs: ['epi-chance', 'epi-r0'],
      phet: [
        phet(
          'plinko-probability',
          'Plinko Probability',
          'Chance alone produces variation. Drop balls through a peg board to see how sample size controls how closely a result matches expectation.',
          'Drop 10 balls and note the shape of the histogram. Repeat several times. How much does it change?',
          'Drop 1,000 balls. Compare the histogram with the theoretical distribution overlay.',
          'Explain what this implies about an attack-rate difference seen in a study of 20 people versus one of 2,000.',
        ),
      ],
      sort: sort(
        'Which link in the chain of infection is broken?',
        ['Reservoir or source', 'Mode of transmission', 'Susceptible host'],
        [
          ['Closing a contaminated well', 0],
          ['Handwashing by food handlers', 1],
          ['Vaccinating contacts', 2],
          ['Recalling a contaminated food product', 0],
          ['Insecticide-treated bed nets', 1],
          ['Giving preventive antibiotics to exposed household members', 2],
        ],
      ),
      checks: [
        check(
          1,
          'A 95% confidence interval for a risk ratio runs from 0.8 to 3.5. This means…',
          [
            'The data are compatible with no association',
            'The exposure definitely causes disease',
            'The exposure is definitely protective',
            'The study contained an arithmetic error',
          ],
          'The interval includes 1, the value of no association, so chance cannot be excluded — although a sizeable effect has not been ruled out either.',
        ),
      ],
    },
    'epi-u9-l1': {
      labs: ['epi-screening'],
      sort: sort(
        'Which level of prevention?',
        ['Primary', 'Secondary', 'Tertiary'],
        [
          ['Childhood immunisation', 0],
          ['Mammography screening', 1],
          ['Stroke rehabilitation', 2],
          ['Fluoridating drinking water', 0],
          ['Blood-pressure checks to find hypertension early', 1],
          ['Foot care to prevent amputation in diabetes', 2],
        ],
      ),
      checks: [
        check(
          3,
          'A screening programme is most worthwhile when…',
          [
            'Early detection leads to treatment that improves outcomes',
            'The disease is extremely rare',
            'The test is expensive and invasive',
            'No treatment exists',
          ],
          'Finding disease early only helps if something effective can then be done, and if the benefits outweigh the harm of false positives and overdiagnosis.',
        ),
      ],
    },
    'epi-u10-l1': {
      labs: ['epi-incubation'],
      sort: sort(
        'Put the outbreak step in its phase',
        ['Establish and describe', 'Analyse', 'Act and communicate'],
        [
          ['Verify the diagnosis and confirm that case numbers exceed expectation', 0],
          ['Construct a case definition and line list', 0],
          ['Compare attack rates between exposed and unexposed', 1],
          ['Test hypotheses with a case-control study', 1],
          ['Implement control measures', 2],
          ['Write and share the report', 2],
        ],
      ),
      checks: [
        check(
          4,
          'During an outbreak, when should control measures begin?',
          [
            'As soon as a likely source or mode of spread is identified, even before the study is complete',
            'Only after the final report is published',
            'Only after laboratory confirmation of every case',
            'After the outbreak has ended',
          ],
          'Protecting people takes priority. Reasonable action on good provisional evidence runs in parallel with continued investigation.',
        ),
      ],
    },
  },
};
