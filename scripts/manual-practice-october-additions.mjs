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
    ...(s.sourceId ? { sourceId: s.sourceId } : {}),
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

function tf(t, id, page, correct, prompt) {
  mc(t, id, page, 1, correct, 'TF', prompt);
  t.questions.at(-1).options = [
    { id: 'T', text: 'True' },
    { id: 'F', text: 'False' },
  ];
}
function short(t, id, page, points, prompt, answer, variants = []) {
  fr(t, id, page, prompt, [[points, answer, accepted(answer, ...variants)]]);
}
function number(t, id, page, points, prompt, value, units = [], tolerance = 0) {
  fr(t, id, page, prompt, [
    [
      points,
      `${value}${units.length ? ' ' + units[0] : ''}`,
      {
        numeric: { value, units, tolerance, unitRequired: false },
      },
    ],
  ]);
}

const kenston = paper(
  'kenston-2018-anatomy-b',
  'Medium',
  'Combines system knowledge with lung-volume diagrams, digestive anatomy, immune mechanisms and nutrition calculations.',
  ['Respiratory system', 'Digestive system', 'Immune system'],
  'current',
  'The paper covers the same three systems as the 2027 rotation. Some treatment and disease examples reflect the original 2018 competition.',
  'Printed question weights are retained. Questions 17 and 49 are excluded because their key is inconsistent with the question; 56D (HPV) and 56E (GI) have no corresponding answers in the supplied key and are excluded. Question 12 refers to question 11; its printed reference to 34 is a typo. Question 34 awards up to five points for five distinct digestive cancers in the rubric. Multi-select questions use the complete correct set.',
);
for (const [n, page, points, key, letters] of [
  [1, 2, 1, 'D', 'ABCD'],
  [2, 2, 1, 'C', 'ABCD'],
  [3, 2, 1, 'D', 'ABCD'],
  [4, 2, 1, 'A', 'ABC'],
  [5, 2, 1, 'C', 'ABCD'],
  [6, 2, 1, 'A', 'ABCD'],
  [7, 2, 1, 'D', 'ABCD'],
  [8, 2, 2, 'C', 'ABC'],
  [10, 4, 1, 'D', 'ABCDEF'],
  [11, 4, 1, 'C', 'ABCDEF'],
  [12, 4, 1, 'C', 'ABCD'],
  [13, 4, 1, 'F', 'ABCDEF'],
  [14, 5, 1, 'B', 'ABCD'],
  [15, 5, 1, 'B', 'ABCD'],
  [16, 5, 1, 'A', 'ABCD'],
  [18, 5, 1, 'C', 'ABCD'],
  [19, 5, 2, ['D', 'E'], 'ABCDE'],
  [21, 5, 2, 'A', 'ABCD'],
  [22, 6, 1, 'C', 'ABCD'],
  [23, 6, 1, 'E', 'EFGH'],
  [24, 6, 1, 'J', 'IJKL'],
  [25, 7, 1, 'C', 'ABCDE'],
  [26, 7, 1, 'B', 'ABCDE'],
  [27, 7, 1, 'E', 'ABCDE'],
  [28, 7, 1, 'C', 'ABCD'],
  [29, 8, 1, 'C', 'ABCDE'],
  [30, 8, 1, 'D', 'ABCD'],
  [31, 8, 1, 'C', 'ABCD'],
  [32, 8, 3, 'A', 'ABCD'],
  [35, 8, 3, ['A', 'B', 'C'], 'ABCD'],
  [36, 9, 3, ['B', 'C'], 'ABCD'],
  [37, 9, 1, 'A', 'ABCD'],
  [38, 9, 2, 'A', 'ABCD'],
  [39, 9, 1, 'A', 'ABCD'],
  [40, 9, 2, 'C', 'ABCD'],
  [42, 10, 1, 'A', 'ABCD'],
  [43, 10, 1, 'A', 'ABCD'],
  [44, 10, 1, 'A', 'ABCD'],
  [45, 10, 1, 'C', 'ABCD'],
  [46, 10, 1, 'C', 'ABC'],
  [47, 10, 1, 'A', 'ABCD'],
  [48, 10, 1, 'A', 'ABCD'],
  [50, 11, 1, 'C', 'ABCD'],
  [51, 11, 1, 'B', 'ABC'],
  [52, 11, 1, 'C', 'ABCD'],
  [53, 11, 1, 'A', 'ABCD'],
  [54, 11, 1, 'D', 'ABCD'],
  [55, 11, 1, 'A', 'ABCD'],
  [57, 12, 1, 'A', 'ABCD'],
  [58, 12, 1, 'C', 'ABCD'],
  [59, 12, 1, 'B', 'ABCD'],
  [60, 12, 1, 'A', 'ABCD'],
])
  mc(kenston, n, page, points, key, letters);
for (const [label, answer] of [
  [21, 'Pulmonary vein'],
  [22, 'Capillary beds'],
  [23, 'Alveoli'],
  [24, 'Alveolar sac'],
  [25, 'Pleural cavity'],
])
  short(kenston, `9-${label}`, 3, 1, `Identify diagram label ${label}.`, answer);
tf(kenston, 20, 5, 'T', 'The lungs have two blood supplies.');
short(kenston, 33, 8, 2, 'Name the disease illustrated by the pictured symptom.', 'Lupus', [
  'systemic lupus erythematosus',
  'SLE',
]);
fr(kenston, 34, 8, 'List five distinct cancers affecting the digestive system.', [
  [
    5,
    'Award one point per distinct digestive cancer, up to five: esophageal, gallbladder, liver, pancreatic, stomach, small-intestinal, bowel (colon/rectal), or anal cancer. Accept organ names in the context of cancer. Do not count synonymous names twice.',
  ],
]);
for (const [n, answer] of [
  [1, 'Gastric pit'],
  [2, 'Submucosa'],
  [3, 'Oblique layer of muscularis externa'],
  [4, 'Circular layer of muscularis externa'],
  [5, 'Longitudinal layer of muscularis externa'],
  [6, 'Serosa'],
])
  short(kenston, `41-${n}`, 9, 1, `Name structure ${n} on the stomach-wall diagram.`, answer);
for (const [letter, abbr, answer] of [
  ['A', 'ART', 'Antiretroviral therapy'],
  ['B', 'BMI', 'Body mass index'],
  ['C', 'AIDS', 'Acquired immunodeficiency syndrome'],
  ['F', 'COPD', 'Chronic obstructive pulmonary disease'],
])
  short(kenston, `56${letter}`, 12, 1, `Expand ${abbr}.`, answer);
kenston.questions.sort((a, b) => parseInt(a.id) - parseInt(b.id));

const phoenix = paper(
  'phoenix-2012-disease-detectives-b',
  'Medium',
  'Mixes outbreak-investigation sequencing, study design, epidemic-curve interpretation and relative-risk/odds-ratio calculations.',
  ['Epidemiology', 'Outbreak investigation', 'Foodborne illness', 'Study design'],
  'current',
  'Core epidemiology, study designs, disease transmission and outbreak calculations overlap the 2027 rules. The original paper focuses on foodborne illness, uses a historical ten-step investigation sequence and dates its outbreak examples to 2012.',
  'One practice point per numbered response because the supplied paper and key do not specify weights. Question 31 is corrected from B to F to match the printed definition of contagious. Question 48 is excluded: the source marks its epidemic-curve statement false despite the supplied illness-onset histogram. Numeric rounding follows the key. Questions 52–59 use the complete party-attendee table as a cohort exercise; risk calculations would not in general be valid for a sampled case-control study.',
);
const steps = 'MQPF RAGEJC'.replaceAll(' ', '');
for (let i = 0; i < 10; i++)
  mc(
    phoenix,
    i + 1,
    1,
    1,
    steps[i],
    'ABCDEFGHJKLMNPQR',
    `Outbreak investigation: choose step ${i + 1} from the original lettered list.`,
  );
for (const [i, key] of [...'CDBABDBD'].entries()) mc(phoenix, i + 11, 1, 1, key);
for (const [i, key] of [...'FTFFFTF'].entries()) tf(phoenix, i + 19, 1, key);
for (const [i, key] of [...'ELHCDFAMNGJI'].entries())
  mc(phoenix, i + 26, 2, 1, key, 'ABCDEFGHIJKLMN');
for (const [n, page, key, letters] of [
  [38, 2, 'E', 'ABCDEF'],
  [39, 2, 'F', 'ABCDEF'],
  [40, 3, 'C', 'ABCDEF'],
  [41, 3, 'C', 'ABCD'],
  [42, 3, 'B', 'ABCD'],
  [43, 3, 'F', 'ABCDEF'],
  [44, 3, 'C', 'ABCDE'],
  [45, 3, 'E', 'ABCDEF'],
])
  mc(phoenix, n, page, 1, key, letters);
for (const [n, key] of [
  [46, 'T'],
  [47, 'F'],
  [49, 'F'],
  [50, 'F'],
])
  tf(phoenix, n, 4, key, 'Use the illness-onset chart for this statement.');
short(phoenix, 51, 5, 1, 'Which food has the highest associated risk?', 'Ice cream');
fr(phoenix, 52, 5, 'Write the numeric expression for relative risk for the highest-risk food.', [
  [1, '(43 / (43 + 11)) / (3 / (3 + 18)), or an algebraically equivalent expression.'],
]);
number(phoenix, 53, 5, 1, 'Evaluate the relative risk in question 52.', 5.574, [], 0.05);
fr(phoenix, 54, 5, 'Write the expression for the percentage of party attendees who became ill.', [
  [1, '46 × 100 / (46 + 29) = 46/75 × 100.'],
]);
number(phoenix, 55, 5, 1, 'Evaluate question 54 as a percentage.', 61.333, ['%', 'percent'], 0.5);
fr(phoenix, 56, 5, 'Write the attack-rate expression for people who ate mashed potatoes.', [
  [1, '23 × 100 / (23 + 14) = 23/37 × 100.'],
]);
number(phoenix, 57, 5, 1, 'Evaluate question 56 as a percentage.', 62.162, ['%', 'percent'], 0.5);
fr(phoenix, 58, 5, 'Write the odds-ratio expression for ice cream.', [
  [1, '(43 / 3) / (11 / 18), equivalently (43 × 18) / (3 × 11).'],
]);
number(phoenix, 59, 5, 1, 'Evaluate the odds ratio.', 23.4545, [], 0.5);
number(phoenix, 60, 5, 1, 'How many students ate at the party?', 75, ['students', 'people']);

const menomonie = paper(
  'menomonie-2021-heredity-b',
  'Hard',
  'Includes multi-step genetic reasoning, karyotypes, molecular mechanisms, RNA processing and Sanger sequencing explanations.',
  ['Inheritance', 'DNA and RNA', 'Cell division', 'Protein synthesis'],
  'current',
  'Heredity fundamentals align with the 2027 event. Advanced molecular questions provide extension practice; this is not a claim of compliance with every current tier restriction.',
  'All 72 printed points are included. Explicit source corrections: Q17 is A (incomplete dominance blends; codominance expresses both); Q34 uses multiple codons per amino acid, not multiple amino acids per codon; Q37/38 rubric entries are swapped to match the paper; Q42 prokaryotic DNA is in the nucleoid/cytoplasm, not a nucleus; Q46 concerns replication, not transcription. Q35 accepts genes encoding functional RNA as well as proteins. Q31 accepts the published percentage, with the square optional for practice.',
);
for (const [n, page, key, letters] of [
  [1, 2, 'A', 'ABCD'],
  [2, 2, 'B', 'ABCD'],
  [3, 2, 'A', 'ABCD'],
  [4, 2, 'C', 'ABCD'],
  [5, 3, 'B', 'ABCD'],
  [6, 3, ['A', 'B', 'D', 'E'], 'ABCDE'],
  [7, 3, 'C', 'ABCD'],
  [8, 3, 'C', 'ABCD'],
  [9, 3, 'C', 'ABCD'],
  [10, 3, 'D', 'ABCD'],
  [11, 4, 'A', 'ABCD'],
  [12, 4, ['B', 'C'], 'ABCDE'],
  [13, 4, 'A', 'ABCD'],
  [14, 4, 'D', 'ABCD'],
  [15, 5, 'C', 'ABCD'],
  [16, 5, 'A', 'ABCD'],
  [17, 5, 'A', 'ABCD'],
  [18, 5, 'A', 'ABCD'],
  [19, 6, 'A', 'ABCD'],
])
  mc(menomonie, n, page, 1, key, letters);
for (const [i, key] of [...'FTFTFF'].entries()) tf(menomonie, i + 20, 6, key);
for (const [n, prompt, answer] of [
  [26, 'What bonds join complementary nitrogenous bases?', 'Hydrogen'],
  [27, 'Name the amino acid specified by the usual start codon.', 'Methionine'],
  [28, 'What does the t in tRNA stand for?', 'Transfer'],
  [
    29,
    'Which sequence signals the end of transcription in this eukaryotic context?',
    'Polyadenylation',
  ],
  [30, 'Name the bonds linking adjacent nucleotides in the DNA backbone.', 'Phosphodiester'],
])
  short(menomonie, n, 6, 1, prompt, answer, [`${answer} bonds`, `${answer} signal`]);
number(
  menomonie,
  31,
  7,
  1,
  'For IA IB × IA i, what percentage of offspring have type B blood?',
  25,
  ['%', 'percent'],
);
fr(menomonie, 32, 7, 'Give the possible F1 genotypes for Qq × qq.', [
  [0.5, 'Qq (heterozygous).'],
  [0.5, 'qq (homozygous recessive).'],
]);
fr(menomonie, 33, 7, 'Give the genotype of the true-breeding red panda described in the paper.', [
  [1, 'TTFF.', { accepted: ['TTFF'], caseSensitive: true }],
]);
fr(
  menomonie,
  34,
  7,
  'Can a unique DNA sequence be determined from a protein amino-acid sequence? Explain.',
  [
    [1, 'No; the sequence generally cannot be uniquely recovered.'],
    [1, 'The genetic code is degenerate: multiple codons can specify the same amino acid.'],
  ],
);
fr(menomonie, 35, 7, 'Define a gene.', [
  [
    1,
    'A DNA sequence that specifies a functional product, such as an RNA or a protein. The source definition mentioning a protein is accepted but is not required to exclude noncoding RNA genes.',
  ],
]);
fr(menomonie, 36, 8, 'Give two structural similarities and two differences between DNA and RNA.', [
  [
    2,
    'One point each for two distinct similarities, such as nucleotide polymers, sugar-phosphate backbone, or shared A/G/C bases.',
  ],
  [
    2,
    'One point each for two distinct contrasts: deoxyribose/ribose, thymine/uracil, or typically double-/single-stranded.',
  ],
]);
fr(menomonie, 37, 8, 'Identify the sex and any chromosomal abnormality in the karyotype.', [
  [1, 'Male (XY).'],
  [1, 'Normal karyotype; no chromosomal abnormality shown.'],
]);
fr(menomonie, 38, 8, 'Describe three types of mutations.', [
  [
    3,
    'One point for each of three correctly described mutation types, e.g. substitution (base replacement), insertion (added bases), deletion (lost bases), or frameshift (reading-frame change). Do not award credit twice for the same description.',
  ],
]);
fr(menomonie, 39, 9, 'Compare purine and pyrimidine structures.', [
  [1, 'Purines have two fused rings.'],
  [1, 'Pyrimidines have one ring.'],
]);
fr(
  menomonie,
  40,
  9,
  'Explain why purines pair with pyrimidines and predict the effect of like-with-like pairing.',
  [
    [2, 'One large purine plus one smaller pyrimidine maintains a consistent DNA helix width.'],
    [
      2,
      'Purine-purine and pyrimidine-pyrimidine pairs would produce wider and narrower regions, distorting the helix.',
    ],
  ],
);
fr(menomonie, 41, 9, 'Distinguish chromatid, chromatin and chromosome.', [
  [1, 'A chromatid is one copy/half of a replicated chromosome, containing one DNA double helix.'],
  [1, 'Chromatin is DNA associated with proteins; it can be relatively loosely packed.'],
  [
    1,
    'A chromosome is an organized DNA-protein unit, condensed during division to aid segregation.',
  ],
]);
fr(
  menomonie,
  42,
  9,
  'Give three differences between typical bacterial and eukaryotic nuclear DNA organization.',
  [
    [
      3,
      'One point per accurate contrast, up to three: usually circular versus linear chromosomes; nucleoid/cytoplasm versus nucleus; one main chromosome versus multiple; typical bacterial DNA is not wrapped in canonical eukaryotic histone nucleosomes. Recognize biological exceptions; do not require the incorrect source phrase “in the nucleus” for bacteria.',
    ],
  ],
);
fr(
  menomonie,
  43,
  10,
  'Name two modifications to mRNA after transcription and explain their purposes.',
  [
    [1, 'Poly-A tail.'],
    [1, '5′ cap.'],
    [1, 'Help nuclear export.'],
    [1, 'Protect against degradation / stabilize the mRNA.'],
  ],
);
fr(menomonie, 44, 10, 'What is the function of a TATA box?', [
  [
    1,
    'A core promoter sequence that binds transcription factors and helps position/initiate the transcription machinery.',
  ],
]);
fr(menomonie, 45, 10, 'How can one gene produce multiple proteins?', [
  [
    2,
    'Alternative splicing joins different combinations of exons from the same pre-mRNA, generating distinct mature mRNAs and protein isoforms.',
  ],
]);
fr(
  menomonie,
  46,
  10,
  'Predict the effect of loss of DNA ligase function on replication and explain.',
  [
    [1, 'Replication cannot produce a fully joined DNA strand.'],
    [1, 'DNA ligase normally seals nicks/joins Okazaki fragments; fragments remain unconnected.'],
  ],
);
fr(
  menomonie,
  47,
  11,
  'How do ddNTPs differ from normal nucleotides, and why are they used in Sanger sequencing?',
  [
    [1, 'They lack the 3′ hydroxyl required for further extension.'],
    [
      1,
      'Incorporation terminates the growing strand, producing fragments of different lengths for sequencing.',
    ],
  ],
);
fr(menomonie, 48, 11, 'Describe the four levels of protein structure.', [
  [0.5, 'Primary: amino-acid sequence.'],
  [0.5, 'Secondary: local structures such as alpha helices and beta sheets.'],
  [0.5, 'Tertiary: overall three-dimensional folding of a polypeptide.'],
  [0.5, 'Quaternary: association of multiple polypeptide subunits.'],
]);
short(menomonie, 49, 11, 1, 'What process forms Barr bodies?', 'Lyonization', [
  'X inactivation',
  'X-inactivation',
  'X chromosome inactivation',
]);
short(
  menomonie,
  50,
  11,
  1,
  'What does a double horizontal mating line on a pedigree indicate?',
  'Consanguineous mating',
  ['consanguinity', 'related parents', 'mating between relatives', 'incest'],
);

const kraemer = paper(
  'kraemer-2017-anatomy-b',
  'Hard',
  'Requires detailed explanations of respiratory control, gas transport, digestive physiology and immune memory, plus extensive anatomical identification.',
  ['Respiratory system', 'Digestive system', 'Immune system'],
  'current',
  'Covers the same three systems as the 2027 rotation. The test date is November 4, 2017, although the archive groups it under the 2018 season.',
  'One practice point per numbered question or diagram label; only the true/false section explicitly prints a one-point weight. Q32 is excluded because its abbreviated key does not adequately match all requested hormone targets/products. Q56 is corrected to D (extracellular pathogens). Digestive diagram N has no key entry, and O has an uncertain arrow/key match; both are excluded. Unweighted image tiebreakers are available in the PDF but excluded from the practice score. Multi-select cell questions require the complete correct set.',
);
for (const [n, page, key] of [
  [1, 1, 'T'],
  [2, 1, 'T'],
  [3, 1, 'F'],
  [4, 1, 'F'],
  [5, 1, 'F'],
  [6, 1, 'F'],
  [24, 3, 'F'],
  [25, 4, 'F'],
  [26, 4, 'T'],
  [27, 4, 'F'],
  [28, 4, 'T'],
  [49, 6, 'T'],
  [50, 6, 'F'],
  [51, 6, 'F'],
  [52, 6, 'T'],
  [53, 6, 'F'],
])
  tf(kraemer, n, page, key);
for (const [n, page, key] of [
  [13, 2, 'C'],
  [14, 2, 'A'],
  [15, 2, 'D'],
  [16, 2, 'A'],
  [17, 2, 'B'],
  [18, 2, 'A'],
  [19, 3, 'C'],
  [20, 3, 'B'],
  [21, 3, 'A'],
  [22, 3, 'C'],
  [23, 3, 'A'],
  [39, 5, 'A'],
  [40, 5, 'D'],
  [41, 5, 'B'],
  [42, 5, 'C'],
  [43, 5, 'A'],
  [44, 5, 'A'],
  [45, 6, 'B'],
  [46, 6, 'B'],
  [47, 6, 'C'],
  [48, 6, 'D'],
  [54, 7, 'B'],
  [55, 7, 'B'],
  [56, 7, 'D'],
  [57, 7, 'A'],
  [58, 7, 'B'],
  [59, 7, 'B'],
  [60, 8, 'D'],
  [61, 8, 'B'],
  [62, 8, 'B'],
  [63, 8, 'D'],
])
  mc(kraemer, n, page, 1, key);
for (const [n, page, prompt, answer] of [
  [
    7,
    1,
    'Explain the effects of increased carbon dioxide/hydrogen ions on breathing.',
    'CO2 raises H+ and lowers pH; central chemoreceptors stimulate respiratory centers, increasing breathing rate and depth to expel CO2. Award 0.25 each for CO2/pH, chemoreceptors, respiratory stimulation, and increased rate/depth.',
  ],
  [
    8,
    1,
    'How does perfusion respond to insufficient ventilation of an alveolus?',
    'Low alveolar oxygen causes local pulmonary vasoconstriction, redirecting blood to better-ventilated alveoli. Award 0.5 for constriction and 0.5 for redistribution.',
  ],
  [
    9,
    1,
    'What shifts the oxygen-hemoglobin dissociation curve to the right?',
    'Increased CO2/decreased pH, increased temperature, and increased 2,3-BPG. Award one third per distinct factor group.',
  ],
  [
    10,
    1,
    'Complete both blanks in the chemical equation and name the enzyme.',
    'Water (H2O), carbonic acid (H2CO3), and carbonic anhydrase (CA). Award one third per blank.',
  ],
  [
    11,
    1,
    'Describe three forms of carbon dioxide transport.',
    'Dissolved in plasma; as bicarbonate after CO2 reacts with water; and bound to hemoglobin as carbaminohemoglobin. Award one third per form.',
  ],
  [
    12,
    1,
    'Name the organ and hormone that increase erythrocyte production at altitude.',
    'Kidneys produce erythropoietin (EPO). Award 0.5 for each.',
  ],
  [
    30,
    4,
    'Name four retroperitoneal digestive structures.',
    'Any four of duodenum, pancreas, ascending colon, descending colon, and rectum, as in the source key. Accept appropriate qualification of retroperitoneal portions; 0.25 per distinct correct structure.',
  ],
  [
    31,
    4,
    'How is acidic chyme neutralized after leaving the stomach?',
    'The pancreas supplies bicarbonate-rich juice to the duodenum, neutralizing acid and providing an appropriate pH for intestinal enzymes. Award 0.5 for pancreatic bicarbonate and 0.5 for neutralization.',
  ],
  [
    34,
    4,
    'Complete the three blanks describing deglutition.',
    'Soft palate and uvula rise to close the nasopharynx; the epiglottis covers the glottis. Award one third per blank.',
  ],
  [
    35,
    4,
    'Name the eight anterior teeth lost and explain the effect on eating.',
    'Incisors; they cut/bite food, so food must be precut or supplied in bite-sized pieces. Award 0.5 for incisors and 0.5 for function/effect.',
  ],
  [
    36,
    4,
    'How is the stomach protected from self-digestion, and why is protection necessary?',
    'Bicarbonate-rich mucus protects against acid and enzymes; tight junctions prevent penetration into underlying tissue; rapid epithelial replacement repairs damage. Award up to 1 point proportionally for a coherent barrier explanation including the need to prevent acid/enzymatic injury.',
  ],
  [
    37,
    4,
    'How do small-intestinal nutrients reach the general circulation?',
    'Carbohydrate/protein digestion products enter blood capillaries in villi; most dietary lipids enter lacteals and reach blood via lymph. Award 0.5 for each route.',
  ],
  [
    38,
    4,
    'Why are some pancreatic enzymes secreted inactive, and where are they activated?',
    'To prevent pancreatic self-digestion; activated in the duodenum/small intestine. Award 0.5 each.',
  ],
  [
    64,
    8,
    'How does a secondary B-cell response develop?',
    'The primary response produces plasma cells and memory B cells; memory B cells respond to a subsequent encounter with the antigen. Award 0.5 for memory-cell formation and 0.5 for their secondary response.',
  ],
  [
    65,
    8,
    'Contrast lymphatic and cardiovascular circulation.',
    'The heart actively pumps blood; lymph is propelled by skeletal muscle/body movements and breathing, with one-way valves preventing backflow. Award 0.5 for the blood pump and 0.5 for lymph transport.',
  ],
])
  fr(kraemer, n, page, prompt, [[1, answer]]);
short(
  kraemer,
  29,
  4,
  1,
  'Which precise alimentary-canal layer contains MALT?',
  'Lamina propria of the mucosa',
  ['lamina propria'],
);
short(kraemer, 33, 4, 1, 'What is the hardest substance in the human body?', 'Enamel', [
  'tooth enamel',
  'dental enamel',
]);
for (const [i, answer] of [
  'Cystic fibrosis',
  'Sleep apnea',
  'Pneumonia',
  'Lung cancer',
  'Asthma',
  'Emphysema',
  'Type 1 diabetes mellitus',
  'Multiple sclerosis',
  'AIDS',
  'Graves disease',
  'Apnea',
  'Eupnea',
  'Tachypnea',
  'Dyspnea',
  'Hyperpnea',
  'Orthopnea',
  'Hyperventilation',
].entries())
  short(
    kraemer,
    66 + i,
    9,
    1,
    `Identify the disease or breathing pattern described in question ${66 + i}.`,
    answer,
  );
for (const [n, key] of [
  [83, 'E'],
  [84, ['A', 'B', 'C']],
  [85, ['A', 'D']],
  [86, 'D'],
  [87, 'C'],
])
  mc(kraemer, n, 10, 1, key, 'ABCDE');
kraemer.questions.sort((a, b) => parseInt(a.id) - parseInt(b.id));
for (const [letter, answer] of Object.entries({
  A: 'Gallbladder',
  B: 'Transverse colon',
  C: 'Cecum',
  D: 'Pancreas',
  E: 'Stomach',
  F: 'Spleen',
  G: 'Duodenum',
  H: 'Esophagus',
  I: 'Liver',
  J: 'Appendix',
  K: 'Fundus',
  L: 'Rugae',
  M: 'Lesser curvature',
}))
  short(
    kraemer,
    `DIGESTIVE-${letter}`,
    11,
    1,
    `Identify digestive-system diagram label ${letter}.`,
    answer,
  );
for (const [letter, answer] of Object.entries({
  A: 'Nasal conchae',
  B: 'Hard palate',
  C: 'Epiglottis',
  D: 'Trachea',
  E: 'Uvula',
  F: 'Palatine tonsil',
  G: 'Vocal cords',
  H: 'Cardiac notch',
  I: 'Superior lobe of the right lung',
  J: 'Horizontal fissure',
}))
  short(
    kraemer,
    `RESPIRATORY-${letter}`,
    12,
    1,
    `Identify respiratory-system diagram label ${letter}.`,
    answer,
  );

const gopher = paper(
  'gopher-2019-heredity-b',
  'Hard',
  'An extended genetics paper with pedigrees, metabolic pathways, penetrance, DNA replication calculations and experimental interpretation.',
  ['Inheritance', 'DNA and RNA', 'Cell division', 'Protein synthesis'],
  'current',
  'Genetic crosses, DNA/RNA, mitosis, meiosis and protein synthesis overlap the 2027 Heredity event. Challenge questions extend beyond introductory study.',
  'The source assigns one point per general/investigation item and two per challenge item. Part I Q5 is split into five yes/no choices at 0.2 each, retaining partial credit for each correct selection decision. Part II Q12/Q15 are corrected to 32% cytosine from the stated base composition. Part II Q21 is corrected to A,D,B,C; the printed two-point question weight is used, split equally over its four positions, instead of the inconsistent “1/3 per blank” key. Part II Q19–20 are excluded because their base-pair/nucleotide counts and reported calculations are inconsistent. Q17–18 retain the publisher’s effective rate of 100 base pairs/s. The original answer sheet supplies the codon chart.',
);
for (const [part, n, page, key, letters] of [
  [1, 3, 2, 'C', 'ABC'],
  [1, 4, 2, 'B', 'ABCD'],
  [1, 6, 3, 'A', 'ABC'],
  [1, 7, 3, 'D', 'ABCD'],
  [1, 9, 3, 'A', 'ABCD'],
  [1, 10, 3, 'B', 'ABC'],
  [1, 15, 4, 'C', 'ABCD'],
  [1, 25, 6, 'C', 'ABC'],
  [2, 2, 7, 'B', 'ABCDE'],
  [2, 3, 7, 'A', 'ABCD'],
  [2, 5, 7, 'B', 'ABC'],
  [2, 9, 8, 'D', 'ABCD'],
  [2, 10, 8, 'B', 'ABCD'],
  [3, 1, 11, 'A', 'ABCD'],
  [3, 2, 11, 'C', 'ABCD'],
  [3, 3, 11, 'C', 'ABCD'],
  [3, 4, 11, 'A', 'ABCD'],
  [3, 5, 11, 'D', 'ABCD'],
  [3, 6, 11, 'C', 'ABC'],
  [3, 7, 11, 'A', 'ABCD'],
  [3, 8, 12, 'C', 'ABCD'],
  [3, 9, 12, 'B', 'ABC'],
  [3, 10, 12, 'A', 'ABCD'],
  [3, 14, 13, 'A', 'ABCD'],
  [3, 15, 13, 'B', 'ABC'],
  [4, 1, 14, 'D', 'ABCD'],
  [4, 2, 14, 'C', 'ABCD'],
  [4, 3, 14, 'A', 'ABCD'],
  [4, 4, 14, 'A', 'ABCD'],
  [4, 5, 14, 'B', 'ABCD'],
  [4, 6, 14, 'B', 'ABCD'],
  [4, 7, 14, 'A', 'ABCDE'],
  [4, 8, 15, 'C', 'ABCD'],
  [4, 9, 15, 'C', 'ABCD'],
  [4, 10, 15, 'B', 'ABCD'],
  [4, 11, 15, 'E', 'ABCDE'],
  [4, 12, 15, 'C', 'ABCDE'],
  [4, 15, 16, 'D', 'ABCD'],
])
  mc(gopher, `P${part}-${n}`, page, n > (part < 3 ? 20 : 10) ? 2 : 1, key, letters);
for (const [letter, name, correct] of [
  ['A', 'Tay-Sachs disease', 'Y'],
  ['B', 'Down syndrome', 'N'],
  ['C', 'Cystic fibrosis', 'Y'],
  ['D', 'Huntington disease', 'N'],
  ['E', 'Polydactyly', 'N'],
]) {
  mc(
    gopher,
    `P1-5${letter}`,
    2,
    0.2,
    correct,
    'YN',
    `Is ${name} a recessive genetic disorder? (Part I, question 5${letter})`,
  );
  gopher.questions.at(-1).options = [
    { id: 'Y', text: 'Yes — select this option' },
    { id: 'N', text: 'No — leave this option unselected' },
  ];
}
for (const [id, page, points, prompt, value, units, tolerance] of [
  ['P1-1', 2, 1, 'What percentage of FF × ff offspring can fly?', 100, ['%', 'percent'], 0],
  [
    'P1-2',
    2,
    1,
    'What is the probability all three Ff × Ff offspring cannot fly?',
    1 / 64,
    [],
    0.000001,
  ],
  ['P1-12', 4, 1, 'Of 384 offspring, how many have green seeds?', 96, [], 0],
  ['P1-13', 4, 1, 'Of 384 offspring, how many are heterozygous?', 192, [], 0],
  ['P1-19', 5, 1, 'What fraction have constricted green pods?', 3 / 16, [], 0],
  ['P1-20', 5, 1, 'How many have inflated yellow pods?', 72, [], 0],
  ['P1-22', 5, 2, 'How many different claw lengths are possible?', 7, [], 0],
  ['P1-24', 6, 2, 'What is the probability Bonnie will grow a beard?', 0.5, [], 0],
  ['P2-11', 8, 1, 'What percentage of the original genome is thymine?', 18, ['%', 'percent'], 0],
  ['P2-12', 8, 1, 'What percentage of the original genome is cytosine?', 32, ['%', 'percent'], 0],
  [
    'P2-14',
    8,
    1,
    'After accounting for 4% urchinine, what percentage is adenine?',
    14,
    ['%', 'percent'],
    0,
  ],
  [
    'P2-15',
    8,
    1,
    'After accounting for seanine/urchinine, what percentage is cytosine?',
    32,
    ['%', 'percent'],
    0,
  ],
  [
    'P2-16',
    8,
    1,
    'How many base pairs are in one somatic cell?',
    16000000,
    ['bp', 'base pairs'],
    0,
  ],
  [
    'P2-17',
    8,
    1,
    'Using the source effective replication rate, how long does the shortest chromosome take (hours)?',
    2.78,
    ['hours', 'h', 'hr'],
    0.02,
  ],
  [
    'P2-18',
    8,
    1,
    'Using the source effective rate and simultaneous chromosome duplication, how long does the cell take (hours)?',
    11.11,
    ['hours', 'h', 'hr'],
    0.02,
  ],
  [
    'P3-11',
    12,
    2,
    'How many polar bodies accompany 300 ova in the illustrated process?',
    900,
    ['polar bodies'],
    0,
  ],
  [
    'P4-13',
    16,
    2,
    'How many hemoglobin mRNAs are present at steady state?',
    2400,
    ['mRNAs', 'transcripts'],
    0,
  ],
])
  number(gopher, id, page, points, prompt, value, units, tolerance);
for (const [id, page, prompt, answer, variants] of [
  [
    'P1-8',
    3,
    'Give the genotype of individual I-2.',
    'XAXa',
    ['X^AX^a', 'X^A X^a', 'XᴬXᵃ', 'XAXa'],
  ],
  ['P1-11', 4, 'Give the seed-color genotype of the original pea plant.', 'Yy', []],
  ['P1-17', 4, 'Give the genotype needed for the testcross.', 'pp', []],
  ['P1-18', 4, 'Give the original plant’s flower-color genotype after the testcross.', 'PP', []],
])
  fr(gopher, id, page, prompt, [
    [1, answer, { accepted: [answer, ...variants], caseSensitive: true }],
  ]);
fr(gopher, 'P1-14', 4, 'Which pigment colors remain when only enzyme B is nonfunctional?', [
  [0.5, 'Green.'],
  [0.5, 'Blue.'],
]);
fr(gopher, 'P1-16', 4, 'Which enzymes does the dominant inhibitor Y inhibit?', [
  [0.5, 'Enzyme D.'],
  [0.5, 'Enzyme E.'],
]);
short(
  gopher,
  'P1-21',
  5,
  2,
  'Calculate double-eye penetrance as a fraction, decimal or percentage.',
  '0.72',
  ['72%', '72 percent', '36/50'],
);
short(
  gopher,
  'P1-23',
  5,
  2,
  'Give the ratio of living short-tailed to long-tailed offspring.',
  '2:1',
  ['2 : 1', '2 to 1'],
);
for (const [n, page, points, prompt, answer, variants] of [
  [1, 7, 1, 'Expand DNA.', 'Deoxyribonucleic acid', []],
  [4, 7, 1, 'Which base occurs in RNA but not DNA?', 'Uracil', []],
  [
    6,
    7,
    1,
    'Which end does the green arrow identify?',
    '5′ end',
    ["5' end", '5 prime', '5-prime end', '5'],
  ],
  [7, 7, 1, 'Name the red-boxed nitrogenous base.', 'Guanine', []],
  [8, 7, 1, 'Classify that base as a purine or pyrimidine.', 'Purine', []],
  [13, 8, 1, 'Who discovered the base-composition rules?', 'Chargaff', ['Erwin Chargaff']],
  [
    23,
    10,
    2,
    'Which replication model is ruled out by test tube A?',
    'Conservative',
    ['conservative model'],
  ],
  [
    24,
    10,
    2,
    'Which tube shows the expected result after two rounds?',
    'C',
    ['test tube C', 'tube C'],
  ],
  [25, 10, 2, 'Which enzyme was omitted from the replication mixture?', 'DNA ligase', ['ligase']],
])
  short(gopher, `P2-${n}`, page, points, prompt, answer, variants);
for (const [i, answer] of [...'ADBC'].entries())
  mc(
    gopher,
    `P2-21-${i + 1}`,
    9,
    0.5,
    answer,
    'ABCD',
    `Melting-temperature order: choose sequence in position ${i + 1} (lowest to highest).`,
  );
mc(gopher, 'P2-22-I', 9, 1, 'C', 'ABCDE', 'Which sugar is found in DNA?');
mc(gopher, 'P2-22-II', 9, 1, 'D', 'ABCD', 'Which bond occurs in the DNA backbone?');
short(gopher, 'P3-12-I', 12, 1, 'Which graph interval represents S phase?', 'II', [
  '2',
  'interval II',
]);
short(gopher, 'P3-12-II', 12, 1, 'Which graph interval represents mitosis?', 'IV', [
  '4',
  'interval IV',
]);
short(
  gopher,
  'P3-13',
  13,
  2,
  'In which mitotic phase would colchicine arrest the cells?',
  'Metaphase',
);
short(gopher, 'P4-14', 16, 2, 'Which amino acid does the pictured tRNA carry?', 'Alanine', ['Ala']);
gopher.questions.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

const thermo = paper(
  'kraemer-2017-thermodynamics-b',
  'Medium',
  'Combines conceptual heat-transfer questions with pressure-volume diagrams, kinetic theory, calorimetry and first-law calculations.',
  ['Heat transfer', 'Thermodynamic laws', 'Calorimetry', 'Kinetic theory'],
  'current',
  'Written thermal physics overlaps the 2027 Thermodynamics event. The original date is November 4, 2017; the separate device trial uses older construction rules and is not part of this practice score.',
  'The 16 MCQs retain their printed half-point weight. Written numbering 17–25 supplies nine practice points, split by subpart; the source does not print a separate written weighting scheme. The P–V diagram corrects source-key errors: Q12 E (both vertical paths), Q13 B (expansion), Q14 B (larger area). Q15 is excluded because the heat transferred along BC and DA is unspecified. The physical device trial is excluded. Original pages 1–5 form the student paper; answer pages 6–9 are separated.',
);
for (const [i, key] of [...'CCDDCCDDBDC'].entries()) mc(thermo, i + 1, i < 4 ? 2 : 3, 0.5, key);
for (const [n, key] of [
  [12, 'E'],
  [13, 'B'],
  [14, 'B'],
])
  mc(thermo, n, 4, 0.5, key, 'ABCDEF');
mc(thermo, 16, 4, 0.5, 'B');
fr(
  thermo,
  '17-18',
  5,
  'Calculate average translational kinetic energy at 20.0 °C. Show the formula and result.',
  [
    [1, 'Use average kinetic energy = (3/2)kT with T ≈ 293 K.'],
    [1, 'Approximately 6.07 × 10^-21 J. Accept 293.15 K and reasonable rounding.'],
  ],
);
number(thermo, 19, 5, 1, 'Convert 25 °C to °F.', 77, [
  '°F',
  'F',
  'degrees F',
  'degrees Fahrenheit',
]);
number(thermo, 20, 5, 1, 'Convert 25 °C to K.', 298.15, ['K', 'kelvin'], 0.16);
fr(
  thermo,
  '21-23',
  5,
  'How much heat raises the aluminum pan and water from 20 °C to 80 °C? Show your calculation.',
  [
    [
      1,
      'Temperature change is 60 °C and water mass is 0.250 kg; use Q = mcΔT for both substances.',
    ],
    [1, 'Water requires 62,790 J (about 62.8 kJ); pan requires 27,000 J (27 kJ).'],
    [1, 'Total heat is 89,790 J, approximately 89.8 kJ.'],
  ],
);
number(thermo, 24, 5, 1, 'Calculate net internal-energy change for part (a).', 9, ['J', 'joules']);
number(thermo, 25, 5, 1, 'Calculate net internal-energy change for part (b).', 9, ['J', 'joules']);

for (const t of drafts) {
  t.questionCount = t.questions.length;
  t.maxScore = t.questions.reduce((sum, q) => sum + q.points, 0);
  validatePracticeCatalog([t]);
  await writeFile(`output/practice-research/converted/${t.id}.json`, JSON.stringify(t, null, 2));
  console.log(`${t.id}: ${t.questionCount} fields; ${t.maxScore} points`);
}
