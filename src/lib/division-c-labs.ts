import type { Division } from './events';

export type LabModel =
  | 'kinetics'
  | 'colorimetry'
  | 'circuit'
  | 'bridge'
  | 'chromatography'
  | 'salinometer'
  | 'bod'
  | 'absorption';
export type LabControl = {
  key: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  initial: number;
};
export type LabSource = {
  title: string;
  url: string;
  paper: string;
  section: string;
  basis: string;
  testId?: string;
  questionIds?: string[];
};
export type LabActivity = {
  id: string;
  eventId: string;
  title: string;
  summary: string;
  minutes: number;
  model: LabModel;
  source: LabSource;
  controls: LabControl[];
  procedure: string[];
  question: string;
  answerUnit: string;
  explanation: string;
  reflection: string;
  assumptions: string;
};
const control = (
  key: string,
  label: string,
  unit: string,
  min: number,
  max: number,
  step: number,
  initial: number,
): LabControl => ({ key, label, unit, min, max, step, initial });
const kineticsSource: LabSource = {
  title: 'BullSO 2026 · Chemistry Lab C',
  url: 'https://drive.google.com/drive/folders/1lRMbktxttXY38kU4IHE33y17BlwEsI_y',
  paper: '/practice/bullso-2026-chemistry-lab-c/test.pdf#page=13',
  section: 'Page 13 · Section III, Lab 1–7',
  basis:
    'Adapted from the kinetics lab portion. The reaction, constants, and readings here are synthetic; they do not reproduce the original experimental dataset.',
  testId: 'bullso-2026-chemistry-lab-c',
  questionIds: ['q41', 'q42', 'q43', 'q44', 'q45', 'q46', 'q47'],
};
const circuitSource: LabSource = {
  title: 'Virginia 2013 · Circuit Lab C',
  url: 'https://scioly.org/wiki/Test_Exchange_Archive',
  paper: '/practice/virginia-2013-circuit-lab-c/test.pdf#page=4',
  section: 'Page 4 · Questions 27, 28, and 32',
  basis:
    'A new hands-on simulation of the archived meter and Wheatstone bridge questions. These stations extend written questions, rather than reproduce an original practical.',
  testId: 'virginia-2013-circuit-lab-c',
  questionIds: ['q27', 'q28', 'q32'],
};
const waterSource: LabSource = {
  title: 'Boca Raton 2019 · Water Quality C',
  url: 'https://scioly.org/tests/qXc52yNc-Qo',
  paper: '/practice/scioly-qxc52ync-qo-c/test.pdf#page=14',
  section: 'Page 14 · Part III, dry lab',
  basis:
    'Adapted from the salinometer calibration and BOD dry-lab tasks. Measurements and unknown samples are newly simulated.',
  testId: 'scioly-qxc52ync-qo-c',
  questionIds: ['p3_q1', 'p3_q3_d'],
};

export const divisionCLabs: LabActivity[] = [
  {
    id: 'dye-kinetics',
    eventId: 'chemistry-lab',
    title: 'Follow a fading dye',
    model: 'kinetics',
    minutes: 20,
    summary: 'Use a virtual spectrophotometer to identify a rate law from absorbance over time.',
    source: kineticsSource,
    controls: [
      control('time', 'Reaction time', 's', 0, 180, 10, 30),
      control('concentration', 'Initial dye concentration', 'µmol/L', 20, 100, 5, 60),
      control('temperature', 'Temperature', 'K', 285, 325, 1, 298),
    ],
    procedure: [
      'Record absorbance at 0, 30, 60, 90, and 120 seconds with concentration and temperature held fixed.',
      'Compare A, ln(A), and 1/A against time using the plot selector. Find the straight line.',
      'Use two readings to calculate the first-order rate constant. Repeat at a different temperature.',
    ],
    question:
      'Using k = ln(A₀/A) / t, calculate k for the selected temperature (use a nonzero time).',
    answerUnit: 's⁻¹',
    explanation:
      'A = A₀ exp(−kt), so the slope of ln(A) against time is −k. Absorbance tracks concentration when path length and wavelength stay fixed.',
    reflection:
      'Which transformed plot is straight? Explain a systematic error that would bias k, and how temperature trials could estimate activation energy.',
    assumptions:
      'Synthetic first-order dye decay; ε = 10,000 L mol⁻¹ cm⁻¹, path length 1 cm, k₂₉₈ = 0.012 s⁻¹, Ea = 35 kJ/mol. No instrument noise or side reactions.',
  },
  {
    id: 'absorbance-calibration',
    eventId: 'chemistry-lab',
    title: 'Calibrate the spectrophotometer',
    model: 'colorimetry',
    minutes: 15,
    summary: 'Build a calibration curve and recover the concentration of an unknown dye.',
    source: kineticsSource,
    controls: [
      control('concentration', 'Standard concentration', 'µmol/L', 0, 100, 5, 40),
      control('path', 'Cuvette path length', 'cm', 0.5, 2, 0.1, 1),
    ],
    procedure: [
      'Measure standards at 0, 20, 40, 60, and 80 µmol/L without changing path length.',
      'Plot absorbance against concentration and calculate the calibration slope.',
      'Read the unknown cuvette absorbance and calculate its concentration from your slope.',
    ],
    question: 'What is the unknown dye concentration?',
    answerUnit: 'µmol/L',
    explanation:
      'Beer–Lambert law: A = εlc. Divide unknown absorbance by the slope of your A-versus-concentration calibration; remember the µmol/L conversion.',
    reflection:
      'Why should you use the same cuvette and wavelength for the standards and unknown? Explain the role of a blank.',
    assumptions:
      'An original calibration extension of Lab 4–5, not a separate archived lab. ε = 10,000 L mol⁻¹ cm⁻¹; ideal dilute solution, zero blank absorbance.',
  },
  {
    id: 'resistor-bench',
    eventId: 'circuit-lab',
    title: 'Measure a resistor network',
    model: 'circuit',
    minutes: 20,
    summary: 'Wire series and parallel resistors and compare ideal ammeter and voltmeter readings.',
    source: circuitSource,
    controls: [
      control('voltage', 'Battery voltage', 'V', 1, 12, 0.5, 9),
      control('r1', 'Resistance R₁', 'Ω', 50, 500, 10, 100),
      control('r2', 'Resistance R₂', 'Ω', 50, 500, 10, 200),
      control('parallel', 'Wiring: 0 = series, 1 = parallel', '', 0, 1, 1, 0),
      control('closed', 'Switch: 0 = open, 1 = closed', '', 0, 1, 1, 1),
    ],
    procedure: [
      'Close the switch. Record current and voltage across R₁ at three battery voltages.',
      'Keep voltage and resistors fixed; compare series and parallel wiring.',
      'Open the switch and observe the current. Explain how ideal meters avoid changing the circuit.',
    ],
    question: 'Calculate the equivalent resistance of the selected network.',
    answerUnit: 'Ω',
    explanation:
      'In series, Req = R₁ + R₂. In parallel, Req = R₁R₂/(R₁ + R₂). An ideal ammeter has zero internal resistance; an ideal voltmeter has infinite resistance.',
    reflection:
      'Which connection draws more battery current? Support your explanation with two controlled trials and Kirchhoff’s laws.',
    assumptions:
      'Ideal DC battery, wires, ohmic resistors, and meters. The voltmeter is across R₁; the ammeter measures total battery current. No heating or wire resistance.',
  },
  {
    id: 'bridge-balance',
    eventId: 'circuit-lab',
    title: 'Balance a Wheatstone bridge',
    model: 'bridge',
    minutes: 20,
    summary:
      'Adjust the reference arm until the detector reads zero, then solve for an unknown resistor.',
    source: circuitSource,
    controls: [
      control('voltage', 'Supply voltage', 'V', 1, 12, 1, 6),
      control('r1', 'Upper left R₁', 'Ω', 100, 400, 50, 200),
      control('r2', 'Lower left R₂', 'Ω', 100, 400, 50, 200),
      control('r3', 'Upper right R₃', 'Ω', 25, 1600, 5, 300),
    ],
    procedure: [
      'Observe the voltage difference between the two midpoint nodes.',
      'Adjust R₃ until the detector is as close to 0 V as possible. Record the balanced settings.',
      'Calculate Rx = R₂R₃/R₁. Change supply voltage and test whether the balance condition changes.',
    ],
    question:
      'At balance, what is the unknown resistance Rx? (Balance the detector before using Rx = R₂R₃/R₁.)',
    answerUnit: 'Ω',
    explanation:
      'At balance Vleft = Vright, so R₂/(R₁+R₂) = Rx/(R₃+Rx) and Rx = R₂R₃/R₁. Supply voltage cancels.',
    reflection:
      'Explain how a null measurement can identify resistance. Why does changing supply voltage alter the detector reading away from balance?',
    assumptions:
      'Ideal voltage source and infinite-resistance detector. The unknown is fixed for each generated sample. Displayed voltage is rounded; use the smallest attainable magnitude.',
  },
  {
    id: 'ink-chromatography',
    eventId: 'forensics',
    title: 'Compare an ink trace',
    model: 'chromatography',
    minutes: 15,
    summary:
      'Develop a chromatogram, measure migration, and compare the trace with reference inks.',
    source: {
      title: 'Clio 2013 · Forensics C',
      url: 'https://scioly.org/wiki/Test_Exchange_Archive',
      paper: '/practice/clio-2013-forensics-c/test.pdf#page=6',
      section: 'Page 6 · Questions 32–33',
      basis:
        'A simulated practical based on archived chromatography calculations. Reference ink patterns are synthetic and are not evidence from the original case.',
      testId: 'clio-2013-forensics-c',
      questionIds: ['q32', 'q33'],
    },
    controls: [control('front', 'Solvent-front distance', 'cm', 2, 18, 0.5, 15)],
    procedure: [
      'Measure from the baseline to the solvent front and the upper trace spot.',
      'Calculate the upper spot’s Rf. Develop the paper farther and test whether Rf changes.',
      'Compare every trace spot against reference A and B. Explain why a matching pattern alone cannot identify a person.',
    ],
    question: 'What is the Rf of the upper trace spot?',
    answerUnit: '(unitless)',
    explanation:
      'Rf = spot distance / solvent-front distance, both measured from the baseline. Compare samples only under the same solvent and stationary-phase conditions.',
    reflection:
      'Which reference pattern is consistent with the trace? What additional evidence would you need before drawing a case conclusion?',
    assumptions:
      'Ideal paper chromatography with fixed Rf values and no streaking. A matching pattern supports consistency, not unique identification. Water bound to cellulose acts as the stationary phase in this simplified partition model.',
  },
  {
    id: 'salinometer-calibration',
    eventId: 'water-quality',
    title: 'Calibrate a straw salinometer',
    model: 'salinometer',
    minutes: 20,
    summary: 'Float a weighted straw in standards, then estimate an unknown sample’s salinity.',
    source: waterSource,
    controls: [
      control('salinity', 'Calibration standard salinity', 'g/kg', 0, 40, 5, 0),
      control('mass', 'Weighted straw mass', 'g', 1.5, 3, 0.1, 2),
    ],
    procedure: [
      'Keep straw mass fixed and record immersion depth in standards of 0, 10, 20, 30, and 40 g/kg.',
      'Compare the unknown sample’s immersion depth with the calibration curve.',
      'Calculate the unknown salinity. Change straw mass and explain why you must recalibrate.',
    ],
    question: 'Estimate the unknown water sample’s salinity.',
    answerUnit: 'g/kg',
    explanation:
      'Floating balance gives ρ = m/(Ah). Here A = 0.20 cm² and ρ = 0.9982 + 0.00075S, so S = (m/(0.20h) − 0.9982)/0.00075.',
    reflection:
      'Why does the straw float higher in saltier water? Describe how you would mark calibration points and control temperature.',
    assumptions:
      'Constant 20 °C; approximate linear density relation over 0–40 g/kg. Uniform cross section 0.20 cm²; upright float, negligible meniscus and clay-volume correction. This is not a precision seawater equation.',
  },
  {
    id: 'oxygen-demand',
    eventId: 'water-quality',
    title: 'Run a five-day BOD test',
    model: 'bod',
    minutes: 15,
    summary:
      'Compare dissolved oxygen before and after incubation, correcting for sample dilution.',
    source: waterSource,
    controls: [
      control('initial', 'Initial dissolved oxygen', 'mg/L', 7, 10, 0.1, 9),
      control('fraction', 'Sample fraction in bottle', '', 0.1, 0.5, 0.05, 0.25),
      control('day', 'Incubation time', 'days', 0, 5, 1, 5),
    ],
    procedure: [
      'Measure initial oxygen and record the fraction of sample in the diluted bottle.',
      'Incubate to day 5. Record final dissolved oxygen; keep the bottle dark at constant temperature.',
      'Compute (D₀ − D₅)/P. Repeat with a different dilution and compare recovered BOD₅.',
    ],
    question: 'At day 5, calculate the undiluted sample BOD₅.',
    answerUnit: 'mg/L',
    explanation:
      'For this unseeded model, BOD₅ = (D₀ − D₅)/P, where P is sample volume divided by total bottle volume. Earlier readings are not BOD₅.',
    reflection:
      'Why can two dilutions give different oxygen drops but the same estimated BOD₅? Explain the problem with oxygen depletion before day 5.',
    assumptions:
      'Unseeded, blank-free synthetic sample at constant temperature. Linear five-day oxygen demand is a teaching approximation. No nitrification, reaeration, or microbial lag is modeled.',
  },
  {
    id: 'absorption-design',
    eventId: 'experimental-design',
    title: 'Design an absorption experiment',
    model: 'absorption',
    minutes: 25,
    summary:
      'Choose towel areas, repeat measurements, and separate random variation from a confounding variable.',
    source: {
      title: 'SOnerd · SSSS 2021 · Experimental Design C',
      url: 'https://scioly.org/tests/files/experimentaldesign_2021_c_ssss-sonerd_notes.pdf',
      paper:
        'https://scioly.org/tests/files/experimentaldesign_2021_c_ssss-sonerd_notes.pdf#page=2',
      section: 'Page 2 · Scenario 1: Absorption',
      basis:
        'Adapted from an archived practice prompt, not a scored tournament test. Towel properties and all numerical results are original synthetic data.',
    },
    controls: [
      control('area', 'Towel area', 'cm²', 25, 150, 25, 50),
      control('soak', 'Soak time', 's', 5, 60, 5, 30),
      control('replicate', 'Replicate number', '', 1, 5, 1, 1),
    ],
    procedure: [
      'Write a hypothesis with towel area as the independent variable and absorbed mass as the dependent variable.',
      'Hold soak time fixed. Record at least three replicates each at 25, 50, and 100 cm².',
      'Compare means and variation. Then change soak time to demonstrate a potential confound.',
    ],
    question:
      'What is the mean absorbed water mass of replicates 1–3 at the current area and soak time?',
    answerUnit: 'g',
    explanation:
      'Add the three measured masses and divide by three. Compare area levels at the same soak time; variation between repeats is not a change in the independent variable.',
    reflection:
      'Identify your variables, comparison condition, controlled factors, and an error source. Use recorded means to support a conclusion and suggest a follow-up experiment.',
    assumptions:
      'Synthetic same-brand towel: capacity per area × area × (1 − exp(−soak/15)). Small deterministic replicate variation is added. No real towel brand is characterized.',
  },
];

export function labsForEvent(division: Division, eventId: string) {
  return division === 'C' ? divisionCLabs.filter((lab) => lab.eventId === eventId) : [];
}

export const phetActivities: Record<string, { slug: string; title: string; task: string }> = {
  'chemistry-lab': {
    slug: 'beers-law-lab',
    title: 'Beer’s Law Lab',
    task: 'Keep wavelength and path length fixed; measure five concentrations. Use your slope to explain why absorbance can track dye concentration in the archive kinetics task.',
  },
  'circuit-lab': {
    slug: 'circuit-construction-kit-dc',
    title: 'Circuit Construction Kit: DC',
    task: 'Build a battery and two-resistor circuit. Measure total current and branch voltages, then rewire in parallel and test your predictions.',
  },
  forensics: {
    slug: 'density',
    title: 'Density',
    task: 'Extension: measure the mass and displaced volume of an unknown solid. Compare density as a class characteristic. This supports material comparison; PhET does not simulate the ink chromatography station.',
  },
  'water-quality': {
    slug: 'density',
    title: 'Density',
    task: 'Explore floating and displaced volume. Use buoyancy to explain the salinometer calibration. This is a conceptual companion, not a salinity meter.',
  },
  'experimental-design': {
    slug: 'pendulum-lab',
    title: 'Pendulum Lab',
    task: 'Transfer your experiment-design skills: vary length across three levels, hold mass and release angle fixed, and time ten oscillations at each level. This is an additional original investigation.',
  },
};
export const phetUrl = (slug: string) =>
  `https://phet.colorado.edu/sims/html/${slug}/latest/${slug}_en.html`;
