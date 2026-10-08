// Source-reviewed archive transcriptions. No network or model requests.
// Generate drafts, then import explicitly with import-reviewed-practice.mjs.
import { readFile, writeFile } from 'node:fs/promises';
import { validatePracticeCatalog } from '../src/lib/practice-catalog.ts';

const sources = JSON.parse(await readFile('documents/practice-import-sources.json', 'utf8'));
const drafts = [];
function paper(id, difficulty, difficultyReason, topics, topicMatch, alignment, scoringBasis) {
  const s = sources.find((s) => s.id === id);
  if (!s) throw new Error(`Missing source: ${id}`);
  const t = {
    id,
    eventId: s.eventId,
    division: s.division,
    competition: s.competition,
    year: s.year,
    level: s.level,
    difficulty,
    difficultyReason,
    topics,
    topicMatch,
    alignment,
    scoringBasis,
    sourceUrl: s.sourceUrl,
    paperUrl: s.paperUrl,
    keyUrl: s.keyUrl,
    season: 2027,
    minutes: 50,
    reviewedOn: '2026-10-08',
    rulesUrl: 'https://www.soinc.org/rules-2027',
    gradingMode: 'published-key',
    instructions:
      'Use the original PDF and its printed question numbers. Show your reasoning and calculations in each written response. Auto Grade reviews responses against the published rubric. ' +
      scoringBasis,
    levelEvidence: s.level
      ? {
          sourceUrl: s.levelSourceUrl ?? s.sourceUrl,
          text: s.levelText,
          basis: s.levelBasis ?? 'Reported level in the source archive.',
        }
      : null,
    questions: [],
    keys: {},
    questionCount: 0,
    maxScore: 0,
  };
  if (s.contextPath) t.supplementUrl = `/practice/${id}/images.pdf`;
  drafts.push(t);
  return t;
}
function mc(t, id, page, points, correct, letters = 'ABCD', prompt) {
  id = String(id);
  t.questions.push({
    id,
    label: id,
    page,
    points,
    type: 'mcq',
    options: [...letters].map((id) => ({ id, text: id })),
    ...(prompt ? { prompt } : {}),
    ...(Array.isArray(correct) ? { multiple: true } : {}),
  });
  t.keys[id] = Array.isArray(correct) ? { correctOptions: correct } : { correctOption: correct };
}
function fr(t, id, page, prompt, rows) {
  id = String(id);
  const criteria = rows.map(([points, answer, extra], i) => ({
    id: `part-${i + 1}`,
    points,
    answer,
    ...extra,
  }));
  t.questions.push({
    id,
    label: id,
    page,
    points: criteria.reduce((s, c) => s + c.points, 0),
    type: 'frq',
    prompt,
  });
  t.keys[id] = { criteria };
}
const accepted = (...words) => ({ accepted: words });
const numeric = (value, units, tolerance = 0) => ({
  numeric: { value, tolerance, units, unitRequired: true },
});

const remote = paper(
  'west-ottawa-2026-remote-sensing-b',
  'Medium',
  'Combines foundational sensor concepts with false-color interpretation, land-cover changes, map scaling and multi-step percentage calculations.',
  ['Earth observation', 'Land cover', 'Satellite imagery', 'Topographic maps'],
  'current',
  'Matches the 2027 Observable Earth focus: Landsat and MODIS images, NLCD land cover, sensor concepts and map measurements. The older bit-depth question is more quantitative than the current qualitative radiometric-resolution requirement.',
  'All 85 published points are included: 27 conceptual and 58 applied. Subparts have separate fields; diagram and map questions refer to the original PDF. Multi-select items require the complete correct set.',
);
const remoteMC = [
  [1, 1, ['B', 'D'], 'ABCDE'],
  [2, 1, ['A'], 'ABCDE'],
  [3, 1, 'D', 'ABCD'],
  [4, 1, 'C', 'ABCD'],
  [5, 1, 'B', 'ABCDE'],
  [6, 2, 'A', 'ABCD'],
  [7, 2, 'B', 'ABCD'],
  [8, 2, 'A', 'ABCDE'],
  [9, 2, 'B', 'AB'],
  [14, 4, 'D', 'ABCDE'],
  [15, 4, 'C', 'ABCDE'],
  [16, 4, 'A', 'ABCDE'],
  [17, 4, 'B', 'ABCDE'],
  [18, 4, 'B', 'ABCD'],
  [19, 5, ['B', 'C'], 'ABCDE'],
  [20, 5, 'A', 'ABCDE'],
  [21, 5, 'C', 'ABCDE'],
  [22, 5, 'F', 'ABCDEF'],
  [25, 6, 'B', 'ABC'],
];
for (const [n, page, key, letters] of remoteMC) mc(remote, n, page, 1, key, letters);
fr(
  remote,
  10,
  3,
  'In which portion of the electromagnetic spectrum does Earth primarily emit radiation?',
  [[1, 'Infrared.', accepted('infrared', 'infrared radiation', 'IR')]],
);
fr(
  remote,
  11,
  3,
  'What are spectral regions with low atmospheric absorption and scattering called?',
  [
    [
      1,
      'Atmospheric windows.',
      accepted('atmospheric windows', 'atmospheric window', 'windows', 'window'),
    ],
  ],
);
fr(
  remote,
  12,
  3,
  'What collective name describes gases that absorb and re-radiate energy emitted by Earth?',
  [[1, 'Greenhouse gases.', accepted('greenhouse gases', 'greenhouse gas')]],
);
fr(
  remote,
  13,
  3,
  'Would a sensor sensitive to 2.5–3.0 µm be useful on an Earth-observing satellite? Explain using the graph.',
  [
    [1, 'No; it would not be useful.'],
    [
      1.5,
      'Those wavelengths are mostly absorbed/scattered by the atmosphere rather than transmitted.',
    ],
    [0.5, 'Water vapor and carbon dioxide are important absorbers in this band.'],
  ],
);
fr(remote, 23, 6, 'Name the type of imaging scanner in diagram (a).', [
  [
    1,
    'Across-track or whiskbroom scanner.',
    accepted(
      'across-track',
      'across track',
      'across-track scanner',
      'whiskbroom',
      'whiskbroom scanner',
    ),
  ],
]);
fr(remote, 24, 6, 'Name the type of imaging scanner in diagram (b).', [
  [
    1,
    'Along-track or pushbroom scanner.',
    accepted('along-track', 'along track', 'along-track scanner', 'pushbroom', 'pushbroom scanner'),
  ],
]);
for (const [id, display, answer] of [
  ['26-red', 'red', 'Band 2 (blue)'],
  ['26-green', 'green', 'Band 3 (green)'],
  ['26-blue', 'blue', 'Band 4 (red)'],
])
  fr(remote, id, 7, `Which OLI band is displayed as ${display} in the false-color image?`, [
    [2.5, answer],
  ]);
fr(
  remote,
  '26-explanation',
  7,
  'Explain how comparing the two images supports your band assignments.',
  [
    [
      2.5,
      'Any thorough comparison of corresponding colors between the natural-color and false-color images supports the assignments. The red and blue display channels are exchanged; green remains green.',
    ],
  ],
);
for (const [i, answer] of [
  'Deciduous forest',
  'Cultivated crops',
  'Open water',
  'Developed, high-intensity',
  'Woody wetlands',
].entries())
  fr(remote, `27${'ABCDE'[i]}`, 8, `Identify the NLCD land-cover type at point ${'ABCDE'[i]}.`, [
    [2, answer, accepted(answer)],
  ]);
fr(
  remote,
  28,
  8,
  'Which NLCD classification best describes the West Ottawa High School Athletic Fields?',
  [
    [
      2,
      'Developed, open space.',
      accepted('developed open space', 'developed, open space', 'developed, open-space'),
    ],
  ],
);
fr(remote, 29, 9, 'Did the Cultivated Crops share increase or decrease from 1985 to 2024?', [
  [1, 'Decrease.', accepted('decrease', 'decreased')],
]);
fr(remote, '29a', 9, 'By how many percentage points did Cultivated Crops change? Show your work.', [
  [
    2,
    '34% − 45% = −11 percentage points; accept 11 percentage points decrease without the negative sign. Show the subtraction.',
  ],
]);
fr(
  remote,
  '29b',
  9,
  'What is that change as a percentage of the original Cultivated Crops share? Show your work.',
  [
    [
      2,
      '(34 − 45)/45 × 100 ≈ −24%, or a 24% decrease. Published tolerance is 23–26% decrease. Show the calculation.',
    ],
  ],
);
fr(remote, 30, 9, 'Did Developed, Low-Intensity increase or decrease from 1985 to 2024?', [
  [1, 'Increase.', accepted('increase', 'increased')],
]);
fr(
  remote,
  '30a',
  9,
  'By how many percentage points did Developed, Low-Intensity change? Show your work.',
  [[2, '13% − 9% = 4 percentage points increase. Show the subtraction.']],
);
fr(
  remote,
  '30b',
  9,
  'What is that change as a percentage of the original Developed, Low-Intensity share? Show your work.',
  [[2, '(13 − 9)/9 × 100 ≈ 44% increase. Published tolerance is 40–50%. Show the calculation.']],
);
for (const [i, answer, synonyms] of [
  [0, 'Water', ['water']],
  [1, 'Snow or ice', ['snow', 'ice', 'snow/ice', 'snow and ice']],
  [2, 'Cloud', ['cloud', 'clouds']],
  [3, 'Vegetation', ['vegetation', 'plants']],
])
  fr(
    remote,
    `31${'ABCD'[i]}`,
    10,
    `Identify the feature at point ${'ABCD'[i]} in the MODIS false-color image.`,
    [[2, answer, accepted(...synonyms)]],
  );
fr(remote, 32, 10, 'Is MODIS active or passive?', [
  [1, 'Passive.', accepted('passive', 'passive sensor')],
]);
fr(
  remote,
  33,
  11,
  'Why is the SWIR / NIR / visible-red band combination effective for showing forest fires?',
  [
    [3, 'Strong contrast between living green vegetation and burned reddish-brown vegetation.'],
    [1, 'It identifies the locations of active fires.'],
  ],
);
fr(
  remote,
  34,
  11,
  'Estimate the triangular area burned by the Cerro Pelado fire in square kilometers. Use the image scale and show your work.',
  [
    [
      1,
      'Convert the base using the scale: about 1.1 cm × (20 km / 1.6 cm) = 13.75 km. Equivalent scaled measurements are acceptable.',
    ],
    [1, 'Convert the height: about 0.8 cm × (20 km / 1.6 cm) = 10 km.'],
    [2, 'Area = ½ × base × height ≈ 68.7. Accept 64–73.'],
    [1, 'Correct area unit: square kilometers (km²).'],
  ],
);
for (const [n, prompt, value] of [
  [35, 'What is the thick contour-line interval?', 200],
  [36, 'What is the thin contour-line interval?', 40],
  [37, 'What is the scenic overlook elevation?', 1085],
])
  fr(remote, n, 12, prompt, [[1, `${value} ft.`, numeric(value, ['ft', 'feet', 'foot'])]]);
fr(remote, 38, 12, 'Convert an azimuth of 342° into a quadrant bearing.', [
  [2, 'N 18° W.', accepted('N18W', 'N 18 W', 'N18°W', 'N 18° W', 'north 18 degrees west')],
]);
fr(remote, 39, 12, 'Which profile is steeper, AB or AC? Explain using the topographic map.', [
  [1, 'AB is steeper.'],
  [
    2,
    'Both have the same elevation change, but AB covers a shorter horizontal distance. Award only 1 of these 2 points for stating only that the contours are closer together.',
  ],
]);
remote.questions.sort((a, b) => Number.parseInt(a.id) - Number.parseInt(b.id));

const chemistry = paper(
  'chem2000-2016-chemistry-lab-c',
  'Hard',
  'Multi-step gas-law and stoichiometry calculations, reaction mechanisms, experimental design and integrated rate-law analysis.',
  ['Gas laws', 'Chemical kinetics', 'Reaction mechanisms', 'Experimental design'],
  'current',
  'The 2016 gases and kinetics rotation matches the 2027 Chemistry Lab topic pair. Some mechanism and rate-law questions overlap the current States/Nationals-only extensions; the archive labels this authored practice paper Regional.',
  '70 published points: 15 MCQs at 2 each and 40 written points. This is Chem2000’s archived Regional practice paper, not a verified held tournament. The original combined file has been separated into unchanged test pages 1–12 and key pages 13–14. Q18(b) is interpreted as concentration rate (M/s), consistent with the key; the printed rate omits the per-liter unit.',
);
const chemPages = [3, 3, 3, 4, 4, 4, 4, 5, 6, 6, 6, 6, 7, 7, 7];
'ADDCCAACCBCBACC'.split('').forEach((key, i) => mc(chemistry, i + 1, chemPages[i], 2, key));
fr(
  chemistry,
  '16a',
  8,
  'Specify two conditions where the van der Waals equation deviates most from the ideal gas equation.',
  [
    [1, 'High pressure.'],
    [1, 'Low temperature.'],
  ],
);
fr(
  chemistry,
  '16b',
  8,
  'Is the van der Waals a constant of methane lower or higher than water’s? Justify.',
  [
    [1, 'Methane has a lower a value.'],
    [2, 'Nonpolar CH4 has weaker intermolecular attractions than polar, hydrogen-bonding H2O.'],
  ],
);
fr(
  chemistry,
  '16c',
  8,
  'Explain the increase in the van der Waals b values down the noble-gas group, using atomic structure.',
  [
    [1, 'The b value relates to particle volume.'],
    [
      2,
      'Atomic radius increases down the group because of additional energy levels and increased shielding.',
    ],
  ],
);
fr(
  chemistry,
  '17a',
  8,
  'Write the balanced reaction of solid aluminum sulfide with liquid water, including state symbols.',
  [
    [1, 'Al2S3(s) + H2O(l) → Al(OH)3(s) + H2S(g), with correct formulas and states.'],
    [1, 'Balanced coefficients 1:6:2:3 (or a common multiple): Al2S3 + 6H2O → 2Al(OH)3 + 3H2S.'],
  ],
);
fr(
  chemistry,
  '17b',
  8,
  'Calculate the percent yield from 50.0 g Al2S3, excess water, an 8.50 L jar at 65.0 °C, initial pressure 0.970 atm and final pressure 4.04 atm. Show work.',
  [
    [1, 'Product pressure = 4.04 − 0.970 = 3.07 atm.'],
    [2, 'Correct substitution in PV = nRT with 8.50 L and 338.15 K.'],
    [1, 'Use the molar mass of Al2S3 and the 1:3 Al2S3:H2S ratio to find theoretical yield.'],
    [1, 'Percent yield about 94.1%.'],
  ],
);
fr(
  chemistry,
  '18a',
  8,
  'Derive the overall rate law from the three-step phosgene mechanism on page 8.',
  [
    [1, 'Rate of the slow step: k2f[Cl][CO].'],
    [1, 'Fast pre-equilibrium: k1f[Cl2] = k1r[Cl]².'],
    [1, 'Overall rate = k[Cl2]^(1/2)[CO]. Equivalent partial-pressure expressions accepted.'],
  ],
);
fr(
  chemistry,
  '18b',
  8,
  'Determine k when rate = 6.0 × 10⁻³ M/s, [Cl2] = 4.0 M and [CO] = 1.0 M. Include units. (The source omits the concentration-rate unit; this follows its key.)',
  [
    [1, 'Substitute k(4.0)^(1/2)(1.0) = 6.0 × 10⁻³.'],
    [1, 'k = 3.0 × 10⁻³.'],
    [1, 'Units M^(-1/2) s^(-1).'],
  ],
);
fr(
  chemistry,
  '19a',
  9,
  'Use kinetic theory to explain why breaking dry ice into small pieces speeds sublimation.',
  [
    [2, 'Breaking the block increases exposed surface area.'],
    [1, 'More collisions per second with warmer surrounding particles transfer energy.'],
  ],
);
fr(chemistry, '19b', 9, 'Explain why MnO2 speeds the decomposition of hydrogen peroxide.', [
  [2, 'The catalyst supplies an alternative reaction pathway with lower activation energy.'],
  [
    1,
    'More collisions can overcome the barrier; alternatively, lower Ea increases k in the Arrhenius equation.',
  ],
]);
fr(
  chemistry,
  '19c',
  9,
  'Explain why the depicted NO–O3 collision fails despite kinetic energy above activation energy.',
  [
    [2, 'Reactants must have a suitable collision orientation to reach the transition state.'],
    [
      1,
      'The N atom of NO must collide with an O atom of O3 to form NO2; the illustrated orientation does not do this.',
    ],
  ],
);
fr(
  chemistry,
  '20a',
  9,
  'Describe two distinct methods using the listed materials to measure the average reaction rate of OH− with bromoethane.',
  [
    [1, 'Relate rate to the change of OH− or Br− concentration over a time interval.'],
    [
      2,
      'First method with procedure and explanation: pH measurements, spectrophotometry of an indicator, or AgNO3 precipitation and AgBr mass. The source also accepts litmus comparisons at two times.',
    ],
    [
      2,
      'A second distinct method with procedure and explanation from the published alternatives; do not award twice for the same method.',
    ],
  ],
);
fr(
  chemistry,
  '20b',
  9,
  'Using the concentration-time table and excess OH−, determine the reaction order with respect to bromoethane. Show the analysis.',
  [
    [1, 'Calculate slopes/average rates from the concentration-time data.'],
    [
      3,
      'Test transformed plots: ln(concentration) against time is linear; concentration/time and inverse concentration/time are not. Show adequate numerical or graphical support.',
    ],
    [1, 'First order in bromoethane.'],
  ],
);

const circuits = paper(
  'lake-erie-niagara-2018-circuit-lab-c',
  'Hard',
  'Combines Coulomb calculations, capacitance and RC transients, op-amp circuits, circuit analysis and Boolean logic.',
  ['DC circuits', 'Digital logic', 'Operational amplifiers', 'Capacitance and RC circuits'],
  'different',
  'DC circuits, diodes, digital logic and op-amps overlap 2027. Historical capacitance, RC transients and magnetic-flux questions are outside the 2027 written scope. The cover dates the competition December 8, 2018, in the 2019 season.',
  '68 available written points. Physical stations 30–31 require missing apparatus and are excluded. Question 18 is excluded because the published logarithmic answer conflicts with the RC charging response and the choices are ambiguous. All remaining MCQ letters and printed weights follow the supplied key.',
);
const circuitAnswers = 'B A B B D E A C D A B D D A D E B B B C A D A C B B A C C'.split(' ');
const circuitWeights = [
  2, 3, 3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 3, 3, 3, 3, 3, 3, 2, 3,
];
if (circuitAnswers.length !== 29) throw new Error('Circuit key length');
for (let i = 0; i < 29; i++) {
  const n = i + 1;
  if (n === 18) continue;
  const letters = [11, 17].includes(n)
    ? 'AB'
    : [1, 2, 4, 9, 10, 14, 22, 28, 29].includes(n)
      ? 'ABCD'
      : 'ABCDE';
  mc(
    circuits,
    n,
    n <= 8 ? 2 : n <= 17 ? 3 : n <= 23 ? 4 : 5,
    circuitWeights[i],
    circuitAnswers[i],
    letters,
  );
}

const protein = paper(
  'ut-austin-2019-protein-modeling-c',
  'Hard',
  'Detailed protein chemistry, CRISPR mechanisms, 25 diagram labels and many multi-part explanations require advanced molecular reasoning.',
  ['Protein structure', 'Amino acids', 'CRISPR-Cas systems', 'Cytidine deaminase'],
  'different',
  'General protein chemistry overlaps 2027, but this paper focuses on CRISPR-Cas and cytidine deaminase instead of the 2027 hemagglutinin/H1N1 focus. The actual competition was October 26, 2019.',
  '155 available points from the master rubric. General-biochemistry MCQs 3, 5, 7 and 10 are excluded for ambiguous single-answer wording; CRISPR short answer 2(c) is excluded for an erroneous NHEJ key. The computer/model-building portion is not included. The master key resolves label Y as Type III; W/X/Y are the overall systems despite the prompt saying X/Y/Z. The duplicate (2) in general short answer 4 is counted once. Itemized CRISPR short answers total 41, not the heading’s 38.',
);
'DEDECBEDAD'.split('').forEach((key, i) => {
  if ([3, 5, 7, 10].includes(i + 1)) return;
  mc(protein, `I-MC-${i + 1}`, i < 5 ? 2 : 3, 1, key, 'ABCDE');
});
const proteinShort = [
  [
    1,
    'Where does the net free-energy change from forming weak interactions within a protein primarily come from?',
    [
      [
        2,
        'Increased entropy of the surrounding aqueous solution when hydrophobic surfaces are buried.',
      ],
    ],
  ],
  [
    2,
    'Why is the peptide C–N bond shorter than a C–N bond in a simple amine?',
    [
      [1, 'Resonance / partial electron sharing gives partial double-bond character.'],
      [1, 'Delocalization involves the carbonyl oxygen and amide nitrogen.'],
    ],
  ],
  [
    3,
    'Why can peptide C–N bonds not rotate freely?',
    [
      [
        1,
        'Partial double-bond character.',
        accepted('partial double bond character', 'partial double-bond character'),
      ],
    ],
  ],
  [
    4,
    'Which peptide-bond element has partial negative charge and which has partial positive charge?',
    [
      [1, 'Oxygen: partial negative.'],
      [1, 'Nitrogen: partial positive.'],
    ],
  ],
  [
    5,
    'Why does a long block of Glu residues resist alpha-helix formation at pH 7?',
    [
      [1, 'The adjacent Glu groups are negatively charged.'],
      [1, 'Like charges repel one another.'],
      [1, 'This destabilizes/prevents the alpha helix.'],
    ],
  ],
  [
    6,
    'Why is proline rarely within an alpha helix?',
    [
      [1, 'Its nitrogen is part of a rigid ring.'],
      [1, 'The ring restricts rotation about N–Cα.'],
      [1, 'The backbone nitrogen of proline is implicated.'],
      [1, 'It lacks a hydrogen to donate to the normal backbone hydrogen bond.'],
    ],
  ],
  [
    7,
    'How are disulfide bonds commonly formed?',
    [
      [1, 'Oxidation.'],
      [1, 'Of sulfhydryl (thiol) groups, forming a disulfide.'],
    ],
  ],
  [
    8,
    'List and describe the three torsion angles.',
    [
      [1, 'Phi (φ).'],
      [1, 'Rotation about N–Cα.'],
      [1, 'Psi (ψ).'],
      [1, 'Rotation about Cα–C.'],
      [1, 'Omega (ω).'],
      [1, 'Rotation about the peptide C–N bond.'],
    ],
  ],
  [
    9,
    'Give the peptide C–N, C–N single and C–N double bond lengths in nanometers, in that order.',
    [
      [1, 'Peptide: 0.133 nm.'],
      [1, 'Single: 0.149 nm.'],
      [1, 'Double: 0.127 nm.'],
    ],
  ],
  [
    10,
    'Which isomer is generally more stable, trans or cis? Explain.',
    [
      [1, 'Trans.'],
      [1, 'Less physical contact between the amino-acid side chains.'],
      [1, 'Trans is generally more stable for acyclic systems.'],
      [1, 'Cis has more unfavorable steric interactions.'],
      [1, 'Trans has higher thermochemical stability / less exothermic heat of combustion.'],
    ],
  ],
];
for (const [n, prompt, rows] of proteinShort) fr(protein, `I-SA-${n}`, 4, prompt, rows);
for (const [letter, points, prompt, answer, extra] of [
  ['A', 1, 'Identify the amino acid in Figure 1.1.', 'Glycine.', accepted('glycine')],
  ['B', 2, 'What is unique about its chirality?', 'It is the only achiral standard amino acid.'],
  [
    'C',
    1,
    'True or false: this amino acid can only fit into hydrophilic environments.',
    'False.',
    accepted('false'),
  ],
  ['D', 2, 'Give the lower-pH pKa of this molecule.', '2.4.', accepted('2.4')],
  ['E', 2, 'Give its higher-pH pKa.', '9.6.', accepted('9.6')],
  [
    'F',
    1,
    'Is this amino acid conformationally flexible or inflexible?',
    'Flexible.',
    accepted('flexible', 'conformationally flexible'),
  ],
])
  fr(protein, `I-DIAG-1${letter}`, 5, prompt, [[points, answer, extra]]);
for (const [letter, points, prompt, answer, extra] of [
  [
    'A',
    1,
    'Where are hydrogen bonds located in beta sheets (Figure 1.2)?',
    'Between backbone C=O and N–H groups.',
  ],
  [
    'B',
    1,
    'How are neighboring beta-strand R groups oriented?',
    'They point in opposite directions.',
  ],
  [
    'C',
    2,
    'What is the axial distance between adjacent beta-strand residues in angstroms?',
    '3.5 angstroms.',
    numeric(3.5, ['angstrom', 'angstroms', 'Å', 'A']),
  ],
  [
    'D',
    2,
    'Compare the strand directions in parallel and antiparallel beta sheets.',
    'Parallel: same direction (1); antiparallel: opposite directions (1).',
  ],
  [
    'E',
    1,
    'What are the dashed lines in Figure 1.2?',
    'Hydrogen bonds.',
    accepted('hydrogen bonds', 'hydrogen bonding'),
  ],
  [
    'F',
    1,
    'In what type of protein are beta sheets most common according to the source?',
    'Globular proteins.',
    accepted('globular', 'globular proteins'),
  ],
  [
    'G',
    2,
    'How are most beta sheets oriented in globular-protein X-ray structures, compared with the planar Pauling–Corey model?',
    'Twisted.',
    accepted('twisted', 'twisted sheets'),
  ],
])
  fr(protein, `I-DIAG-2${letter}`, 5, prompt, [[points, answer, extra]]);
'D A C C A A B A A A C C A B B'
  .split(' ')
  .forEach((key, i) => mc(protein, `II-MC-${i + 1}`, i < 6 ? 6 : i < 11 ? 7 : 8, 1, key));
const proteinLabels = [
  'Pre-crRNA (precursor CRISPR RNA; source abbreviates pre-cRNA)',
  'Mature crRNA (source abbreviates mat-cRNA)',
  'Cas3',
  'PAM (protospacer-adjacent motif)',
  'Cas9',
  'Pre-crRNA',
  'RNase (RNase III)',
  'tracrRNA',
  'Intermediate crRNA',
  'Mature crRNA',
  'PAM',
  'RuvC',
  'HNH',
  'Cas6',
  'Pre-crRNA',
  'Cmr/Cas10 and Csm/Cas10 complexes',
  'Intermediate crRNA',
  'Mature crRNA',
  'Csm/Cas10',
  'Cmr/Cas10',
  'III-A (DNA target)',
  'III-B (RNA target)',
  'Type I',
  'Type II',
  'Type III',
];
proteinLabels.forEach((answer, i) =>
  fr(
    protein,
    `II-LABEL-${'ABCDEFGHIJKLMNOPQRSTUVWXY'[i]}`,
    9,
    `Identify label ${'ABCDEFGHIJKLMNOPQRSTUVWXY'[i]} in Figure 2.1 of the image packet. W, X and Y label the overall systems.`,
    [[1, answer]],
  ),
);
const proteinDiagram = [
  [
    '1a',
    'What mediates the genome editing in Figure 2.2, part I?',
    [[2, 'Cas9.', accepted('Cas9')]],
  ],
  [
    '1b',
    'Identify label A in Figure 2.2.',
    [[2, 'sgRNA (single-guide RNA).', accepted('sgRNA', 'single-guide RNA', 'single guide RNA')]],
  ],
  [
    '1c',
    'Name repair pathway B in Figure 2.2.',
    [
      [
        2,
        'Nonhomologous end joining (NHEJ).',
        accepted('NHEJ', 'nonhomologous end joining', 'non-homologous end joining'),
      ],
    ],
  ],
  [
    '1d',
    'Name template-dependent repair pathway C in Figure 2.2.',
    [
      [
        2,
        'Homologous recombination (HR).',
        accepted('HR', 'homologous recombination', 'homology directed repair', 'HDR'),
      ],
    ],
  ],
  [
    '1e',
    'What does the delta symbol D represent and what mutations can it cause?',
    [
      [2, 'Indels (insertions and deletions).'],
      [2, 'Knockout frameshift mutations.'],
    ],
  ],
  [
    '2a',
    'What is Cas9 converted to by disabling its RuvC and HNH active sites?',
    [
      [
        2,
        'dCas9 (catalytically inactive/dead Cas9).',
        accepted('dCas9', 'dead Cas9', 'catalytically inactive Cas9'),
      ],
    ],
  ],
  [
    '2b',
    'Identify protein E whose transcription initiation can be blocked in Figure 2.2.',
    [[2, 'RNA polymerase (RNAP).', accepted('RNA polymerase', 'RNAP')]],
  ],
  [
    '3a',
    'Give two functions of the domain F fused to an RNA-guided DNA-binding protein.',
    [
      [
        4,
        'Award 2 per distinct valid activity, maximum 4: transcription repression, transcription activation, chromatin remodeling, fluorescent reporting, histone modification, recombinase or methylase activity.',
      ],
    ],
  ],
];
for (const [n, prompt, rows] of proteinDiagram) fr(protein, `II-DIAG-${n}`, 9, prompt, rows);
const proteinCRISPR = [
  [
    '1a',
    10,
    'Which human gene encodes cytidine deaminase?',
    [[1, 'CDA.', accepted('CDA', 'CDA gene')]],
  ],
  [
    '1b',
    10,
    'Name the components of the hydrolytic deamination catalyzed by cytidine deaminase.',
    [
      [1, 'Cytidine.'],
      [1, 'Deoxycytidine.'],
      [
        1,
        'Uridine; accept the corresponding deoxyuridine product when describing deoxycytidine deamination.',
      ],
    ],
  ],
  [
    '2a',
    10,
    'Why is CRISPR-Cas9 editing more efficient and cost-effective than other genome editors?',
    [[2, 'An RNA strand guides cleavage instead of engineering a new protein specificity.']],
  ],
  [
    '2b',
    10,
    'What does NHEJ stand for?',
    [
      [
        1,
        'Nonhomologous end joining.',
        accepted('nonhomologous end joining', 'non-homologous end joining'),
      ],
    ],
  ],
  [
    '2d',
    10,
    'Does the question place the PAM upstream or downstream of the target locus?',
    [[1, 'Downstream.', accepted('downstream')]],
  ],
  [
    '3a',
    10,
    'In which CRISPR types do CRISPR-associated ribonucleases cleave pre-crRNA?',
    [
      [1, 'Type I.'],
      [1, 'Type III.'],
    ],
  ],
  [
    '3b',
    10,
    'Which CRISPR type further processes crRNA intermediates at the 3′ end?',
    [[2, 'Type III.', accepted('III', 'type III', '3', 'type 3')]],
  ],
  [
    '3c',
    10,
    'Which CRISPR type associates crRNAs with Csm or Cmr complexes?',
    [[2, 'Type III.', accepted('III', 'type III', '3', 'type 3')]],
  ],
  [
    '3d',
    10,
    'Which two CRISPR types rely on the Cas6 endoribonuclease family?',
    [
      [1, 'Type I.'],
      [1, 'Type III.'],
    ],
  ],
  [
    '3e',
    10,
    'Which Type III subtype cleaves DNA in vivo?',
    [[2, 'III-A.', accepted('III-A', 'type III-A', '3A', 'type 3A')]],
  ],
  [
    '4a',
    11,
    'Which enzyme in the cas gene cluster can mediate target DNA cleavage in the cited S. thermophilus work?',
    [[3, 'Cas9.', accepted('Cas9')]],
  ],
  [
    '4b',
    11,
    'Which noncoding component hybridizes with crRNA for Cas9 targeting?',
    [
      [
        3,
        'Trans-activating crRNA (tracrRNA).',
        accepted('tracrRNA', 'trans-activating crRNA', 'trans activating crRNA'),
      ],
    ],
  ],
  [
    '4ci',
    11,
    'For which CRISPR types does the absence of PAM within the repeat prevent self-targeting?',
    [
      [2, 'Type I.'],
      [2, 'Type II.'],
    ],
  ],
  [
    '4cii',
    11,
    'Which CRISPR type requires a mismatch between the 5′ crRNA end and the DNA target for plasmid interference?',
    [[4, 'Type III.', accepted('III', 'type III', '3', 'type 3')]],
  ],
  [
    '5a',
    11,
    'List the three CRISPR immune-system stages in order.',
    [[2, 'Adaptation → crRNA biogenesis → targeting. No partial credit for an incorrect order.']],
  ],
  [
    '5b',
    11,
    'Describe the first stage.',
    [[2, 'New spacers from exogenous nucleic acid are incorporated into the CRISPR locus.']],
  ],
  [
    '5c',
    11,
    'Describe the second stage.',
    [[2, 'CRISPR arrays are transcribed and processed into small CRISPR RNAs (crRNAs).']],
  ],
  [
    '5d',
    11,
    'Describe the third stage.',
    [[2, 'crRNAs guide Cas nucleases to cleave homologous target sequences.']],
  ],
];
for (const [n, page, prompt, rows] of proteinCRISPR) fr(protein, `II-SA-${n}`, page, prompt, rows);

const botany = paper(
  'mit-2020-botany-c',
  'Medium',
  'Plant classification and physiology recall is combined with short applications in propagation, biodiversity and hydroponics, without extended calculations.',
  [
    'Plant classification',
    'Plant physiology',
    'Nitrogen cycle',
    'Propagation',
    'Biodiversity',
    'Hydroponics',
  ],
  'current',
  'Overlaps the 2027 Division C plant physiology, genetics, horticulture, nutrient cycles and diversity topics. MIT reported national rules for all events at this invitational; Botany was a Division C trial event.',
  '166 available points. Excluded for erroneous or ambiguous source wording/keys: MCQs 2, 7, 10, 11, 12, 15 and 31; Produce 4, 5 and 8; Hydroponics 5. In the classification diagram, the top Seeds / No Seeds labels are reversed: read the left branch as No Seeds and the right as Seeds. Labels g/h are combined and accept monocots/dicots in either order. Written responses use the published 3-point answer plus 2-point explanation rubric; scientifically valid equivalents are accepted.',
);
for (const [i, answer, synonyms] of [
  [0, 'Ferns', ['ferns', 'fern']],
  [1, 'Mosses', ['mosses', 'moss']],
  [2, 'Algae', ['algae']],
  [3, 'Gymnosperms', ['gymnosperm', 'gymnosperms']],
  [4, 'Naked seeds / conifers', ['naked seeds', 'conifers', 'conifer']],
  [5, 'Angiosperms', ['angiosperms', 'angiosperm']],
])
  fr(
    botany,
    `CLASS-${'abcdef'[i]}`,
    3,
    `Identify classification label ${'abcdef'[i]}. Source correction: the left top branch is No Seeds; the right is Seeds.`,
    [[2, answer, accepted(...synonyms)]],
  );
fr(
  botany,
  'CLASS-gh',
  3,
  'Name the two groups at classification labels g and h. Either order is accepted.',
  [
    [2, 'Monocots.'],
    [2, 'Dicots.'],
  ],
);
for (const [i, answer] of [
  'Root nitrogen-fixing bacteria',
  'Soil nitrogen-fixing bacteria',
  'Nitrification',
  'Nitrifying bacteria',
  'Assimilation',
  'Ammonification',
  'Denitrifying bacteria',
].entries())
  fr(botany, `NITROGEN-${'abcdefg'[i]}`, 4, `Identify nitrogen-cycle label ${'ABCDEFG'[i]}.`, [
    [2, answer, accepted(answer)],
  ]);
const botanyAnswers = 'A B C B C A D C C A E D B D B D A B B A D C A B C B C A A B D A B C B'.split(
  ' ',
);
botanyAnswers.forEach((key, i) => {
  const n = i + 1;
  if ([2, 7, 10, 11, 12, 15, 31].includes(n)) return;
  const letters = [9, 20, 34].includes(n)
    ? 'ABC'
    : [18, 22, 23, 25, 28].includes(n)
      ? 'ABCDE'
      : 'ABCD';
  mc(botany, `MC-${n}`, n <= 13 ? 5 : n <= 24 ? 6 : 7, 2, key, letters);
});
for (const [n, prompt, answer, explanation] of [
  [
    1,
    'Can kitchen scraps from a carrot produce another similar edible carrot without starting from seed? Explain.',
    'No; the edible taproot does not regrow once removed.',
    'The carrot top may grow greens, but that does not regenerate the harvested taproot.',
  ],
  [
    2,
    'Can a Cavendish banana fruit scrap propagate another banana plant? Explain.',
    'No, not from the fruit scrap.',
    'Cavendish bananas are propagated by pups or suckers from the rhizome, which can be separated from the parent.',
  ],
  [
    3,
    'Can scallions with intact roots regrow from kitchen scraps? Explain.',
    'Yes.',
    'The intact root/basal structures regrow leaves, including in water.',
  ],
  [
    6,
    'Can pineapple scraps propagate a plant? Explain.',
    'Yes, using the crown.',
    'The crown / top leaves can root and develop into a new plant.',
  ],
  [
    7,
    'Can lettuce or cabbage regrow from kitchen scraps? Explain.',
    'Yes, from the base/stump.',
    'Retained basal tissue can produce new leaves.',
  ],
  [
    9,
    'Is a potato with green sprouts potentially poisonous? Explain using tuber growth.',
    'It is potentially poisonous; the key says not to eat it.',
    'Sprouting/greening can accompany elevated toxic glycoalkaloids such as solanine. Chlorophyll gives green color but is not itself the toxin.',
  ],
  [
    10,
    'Should wilted leafy vegetables be dried in a spinner or soaked in water? Explain.',
    'Soak in water.',
    'Osmosis replenishes cell water and turgor pressure, restoring rigidity.',
  ],
])
  fr(botany, `PRODUCE-${n}`, 8, prompt, [
    [3, answer],
    [2, explanation],
  ]);
for (const [n, prompt, answer, explanation] of [
  [
    1,
    'Explain why biodiversity helps protect banana crops from fungal disease.',
    'Genetic diversity reduces the chance that one pathogen wipes out the entire crop.',
    'Different susceptibility/resistance among plants means some can survive. The source’s claim that Gros Michel is extinct is not required for credit.',
  ],
  [
    2,
    'Explain how human intervention spread potatoes and made them widely adopted as food.',
    'Trade/colonization spread potatoes from South America, and farmers selected less-bitter, lower-glycoalkaloid tubers.',
    'A relevant further explanation, such as abundant yields encouraging cultivation and adoption.',
  ],
  [
    3,
    'Why is crop rotation useful for corn, soybeans, wheat or sunflowers?',
    'Different crops use/replenish nutrients differently, helping maintain soil fertility and yield.',
    'Explain a relevant benefit such as reduced erosion, alternating deep/shallow roots, or avoiding repeated depletion of the same nutrients.',
  ],
  [
    4,
    'Give a positive and a negative effect of GMO crops on agriculture, with explanation.',
    'A valid example on each side: improved nutrition such as provitamin-A Golden Rice, and economic concerns such as seed licensing costs or dependence on suppliers. Do not require unsupported claims that every GMO seed is sterile.',
    'Explain how the examples affect people or agricultural production; accept other scientifically valid examples.',
  ],
  [
    5,
    'Describe plant succession following wildfire on exposed rocks and surviving soil.',
    'Pioneer organisms / lichens where rock is exposed, and annuals, grasses and later perennial plants as suitable.',
    'Explain how conditions and soil availability influence recovery; secondary succession on remaining soil need not begin with lichens.',
  ],
])
  fr(botany, `BIODIVERSITY-${n}`, 9, prompt, [
    [3, answer],
    [2, explanation],
  ]);
for (const [n, prompt, answer, explanation] of [
  [
    1,
    'How can plants grow without soil?',
    'Root support can come from other substrates and essential mineral nutrients can be supplied in water.',
    'Explain how nutrient solution and suitable root conditions fulfill functions normally provided by soil.',
  ],
  [
    2,
    'What supplements do hydroponic plants need?',
    'A suitable nutrient mixture providing nitrogen, phosphorus, potassium and micronutrients.',
    'Explain supplying the nutrients in solution / liquid fertilizer; accept biologically appropriate nitrogen forms and additional essential minerals.',
  ],
  [
    3,
    'Describe a commercial hydroculture example.',
    'Rice paddies or cranberry bogs, or another valid example.',
    'Explain how the crop is cultivated with partial/substantial water exposure; avoid implying that cranberry vines are permanently submerged.',
  ],
  [
    4,
    'Can fish benefit a hydroponic system? Explain.',
    'Yes: their waste supplies nitrogen compounds that can support plant growth.',
    'Fish still need an external food supply; suitable microbial processing and management are needed. Accept a correctly explained aquaponic mutual benefit; the source’s categorical denial of symbiosis is not required.',
  ],
])
  fr(botany, `HYDROPONICS-${n}`, 9, prompt, [
    [3, answer],
    [2, explanation],
  ]);

for (const t of drafts) {
  t.questionCount = t.questions.length;
  t.maxScore = t.questions.reduce((sum, q) => sum + q.points, 0);
  validatePracticeCatalog([t]);
  await writeFile(`output/practice-research/converted/${t.id}.json`, JSON.stringify(t, null, 2));
  console.log(`${t.id}: ${t.questionCount} questions, ${t.maxScore} points`);
}
