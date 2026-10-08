// Curated transcription of answer identifiers and factual rubric summaries only.
// Original papers remain at their publishers' URLs; see documents/PRACTICE_TESTS.md.
import { writeFile } from 'node:fs/promises';
import { format, resolveConfig } from 'prettier';
import { addArchivePapers } from './practice-additions.mjs';
import { reviewedDifficulty } from './practice-difficulty.mjs';

const catalog = [];
function make(meta) {
  const assessment = reviewedDifficulty[meta.id];
  if (!assessment) throw new Error(`Assess the questions before assigning difficulty: ${meta.id}`);
  const test = {
    scoringBasis: 'Published rubric',
    ...meta,
    difficulty: assessment[0],
    difficultyReason: assessment[1],
    // Invitational is a tournament format, not a reported rules tier.
    level: meta.level === 'Invitational' ? null : meta.level,
    levelEvidence:
      meta.level === 'Invitational'
        ? null
        : {
            sourceUrl: meta.sourceUrl,
            text: `${meta.competition} ${meta.level}`,
            basis: 'Competition identified in the published source',
          },
    competition:
      meta.level === 'Invitational' && !/invitational/i.test(meta.competition)
        ? `${meta.competition} Invitational`
        : meta.competition,
    topicMatch: 'current',
    season: 2027,
    reviewedOn: '2026-10-07',
    minutes: 50,
    rulesUrl: `/rules/2027/${meta.division.toLowerCase()}/${meta.eventId}.pdf`,
    questions: [],
    keys: {},
  };
  const add = (id, page, points, answer, options = {}) => {
    const q = { id: String(id), label: `Question ${id}`, page, type: 'frq', points, ...options };
    test.questions.push(q);
    test.keys[q.id] = { criteria: [{ id: 'answer', points, answer, ...options.grading }] };
    delete q.grading;
    return q;
  };
  const exact = (id, page, points, answer, aliases = [], options = {}) =>
    add(id, page, points, answer, { ...options, grading: { accepted: [answer, ...aliases] } });
  const number = (
    id,
    page,
    points,
    value,
    tolerance = 0,
    units = [],
    unitRequired = false,
    label,
  ) =>
    add(id, page, points, label ?? String(value), {
      grading: { numeric: { value, tolerance, units, unitRequired } },
    });
  const mcq = (id, page, points, correct, letters = 'ABCDE', options = {}) => {
    const q = add(id, page, points, correct, {
      type: 'mcq',
      options: [...letters].map((letter) => ({ id: letter, text: letter })),
      ...options,
    });
    test.keys[q.id] = { correctOption: correct };
  };
  const finish = () => {
    test.questionCount = test.questions.length;
    test.maxScore = test.questions.reduce((n, q) => n + q.points, 0);
    catalog.push(test);
  };
  return { test, add, exact, number, mcq, finish };
}

// Uploaded by SO Inc. in 2020; the archived document metadata identifies the 2014 exam.
{
  const t = make({
    id: 'ut-austin-2014-heredity-b',
    eventId: 'heredity',
    division: 'B',
    competition: 'UT Austin',
    level: 'Regionals',
    year: 2014,
    topics: ['Mendelian genetics', 'DNA', 'Cell division', 'Pedigrees'],
    alignment:
      'The paper covers DNA structure, mitosis and meiosis, inheritance, and pedigrees, all present in the 2027 Heredity B rules. It also includes incomplete dominance, which the current rules reserve for States and Nationals. This older regional paper does not cover every 2027 topic.',
    instructions:
      'Use the original question numbers. Question 21 is a duplicate and is unscored in the published key; it remains available here with 0 points. MCQs are 2.5 points and written responses are 5 points. Scoring follows the published key, including a disputed answer to question 25. Explanations require instructor rubric review. The competition paper dates to 2014; 2020 is the upload label.',
    sourceUrl: 'https://soinc.org/heredity-b',
    paperUrl: 'https://soinc.org/sites/default/files/uploaded_files/2020_2014_Heredity_Test_0.pdf',
    keyUrl: 'https://soinc.org/sites/default/files/uploaded_files/2020_2014_Heredity_Key_0.pdf',
  });
  const keys = 'E A C A C A B A C A C B D B C C E A A C C C C C A'.split(' ');
  keys.forEach((key, i) => {
    const n = i + 1;
    t.mcq(
      n,
      n <= 7 ? 2 : n <= 14 ? 3 : n <= 21 ? 4 : 5,
      n === 21 ? 0 : 2.5,
      key,
      [18, 19, 20, 24, 25].includes(n) ? 'ABCD' : 'ABCDE',
      n === 21 ? { prompt: 'Duplicate; excluded from the published total.' } : {},
    );
  });
  t.add(
    '26',
    6,
    5,
    'A: one dominant allele produces the full phenotype. B: two dominant alleles are needed for the full phenotype.',
  );
  t.add('27', 6, 5, 'Absence of Y-linked sex-determining genes.');
  t.exact('28', 6, 5, 'Autosomal dominant', ['autosomal dominant inheritance']);
  t.exact('29', 6, 5, 'Maternal', [
    'maternal inheritance',
    'mitochondrial',
    'mitochondrial inheritance',
  ]);
  t.finish();
}

{
  const t = make({
    id: 'berkeley-2026-heredity-b',
    eventId: 'heredity',
    division: 'B',
    competition: 'Science Olympiad at Berkeley',
    level: 'Invitational',
    year: 2026,
    topics: ['Mendelian genetics', 'Cell division', 'DNA and RNA', 'PCR'],
    alignment:
      'Reviewed against 2027 Heredity B: inheritance probabilities and pedigrees; mitosis and meiosis; DNA structure and replication; transcription and translation; PCR. The paper’s numbered gaps are present in the original; no missing questions have been invented.',
    instructions:
      'Subparts have separate answer fields so partial credit follows the key. Original numbering skips 1, 6, 7, 23, and 29. The Berkeley archive publishes a key headed BBSO; its question text matches this paper. The published terminology in questions 18 and 28 is retained. Written explanations are subject to instructor review. For PCR temperatures, use degrees Celsius.',
    sourceUrl: 'https://drive.google.com/drive/folders/1vhptBwWINJlHQLefU6vb8UPuvOB-nDRh',
    paperUrl: 'https://drive.google.com/file/d/1zCdgZBNOntoePsUS8PJGJncckMzuqalh/view',
    keyUrl: 'https://drive.google.com/file/d/1gftm-u7VON681nPhlE21RRP4k73CYrWP/view',
  });
  t.exact('2-genotype', 3, 1.5, '1:1:1:1', ['1 : 1 : 1 : 1'], { prompt: 'Genotypic ratio' });
  t.exact('2-phenotype', 3, 1.5, '1:1', ['1 : 1'], { prompt: 'Phenotypic ratio' });
  [0, 1 / 16, 1 / 8, 3 / 8, 1 / 4, 0].forEach((value, i) =>
    t.number(
      `3${'abcdef'[i]}`,
      3,
      1,
      value,
      0,
      [],
      false,
      ['0', '1/16', '1/8', '3/8', '1/4', '0'][i],
    ),
  );
  t.exact('4', 3, 2, '(1/2)^26', ['(0.5)^26', '0.5^26', '2^-26', '1/2^26', '1/(2^26)', '(½)^26']);
  t.number('5', 3, 2, 0.5, 0, [], false, '1/2');
  t.exact('8a', 4, 2, 'Autosomal dominant', ['autosomal dominant inheritance']);
  t.exact('8b', 4, 2, 'X-linked recessive', [
    'x linked recessive',
    'x-linked recessive inheritance',
  ]);
  t.exact('9', 4, 1, 'Prophase, metaphase, anaphase, telophase', [
    'prophase, prometaphase, metaphase, anaphase, telophase',
    'PMAT',
  ]);
  t.exact('10', 4, 1, 'G1, S, G2, M', ['G1 S G2 M', 'G1 -> S -> G2 -> M']);
  t.number('11', 4, 2, 4, 0, ['chromosomes']);
  t.exact('12', 5, 2, 'Crossing over', ['crossing-over']);
  [
    ['centromere'],
    ['kinetochore'],
    ['spindle fibers', 'microtubules', 'cytoskeleton', 'spindle fibres'],
    ['centrosome', 'centrosomes'],
    ['cell plate'],
  ].forEach((v, i) => t.exact(`13${'abcde'[i]}`, 5, 1, v[0], v.slice(1)));
  t.exact('14', 5, 2, 'Nondisjunction', ['non-disjunction']);
  t.exact('15', 5, 1, 'Law of segregation', ['segregation', "Mendel's law of segregation"]);
  t.exact('16', 5, 1, 'Turner syndrome', ["Turner's syndrome"]);
  t.add('17', 6, 1, 'Female development; absence of male features.');
  t.add('18', 6, 3, 'Phosphate; nitrogenous base; hydroxyl group (published key: hydroxide).');
  t.add('19', 6, 1, 'Ribose has an additional hydroxyl group at the 2′ carbon.');
  t.exact('20', 6, 2, 'TGTATCTGTATC', ["5'-TGTATCTGTATC-3'", '5’ - TGTATCTGTATC - 3’'], {
    prompt: 'Enter the strand in the 5′ to 3′ direction.',
  });
  '245136'.split('').forEach((answer, i) => t.mcq(`21${'abcdef'[i]}`, 7, 1, answer, '123456'));
  t.exact('22', 7, 3, '3, 1, 4, 2', ['3,1,4,2', '3 1 4 2', '3-1-4-2']);
  [
    ['thymine', 32],
    ['guanine', 18],
    ['cytosine', 18],
    ['uracil', 0],
  ].forEach(([id, value]) => t.number(`24-${id}`, 7, 1, value, 0, ['%'], false, `${value}%`));
  ['RNA polymerase', 'nucleus', 'initiation', 'elongation', 'termination'].forEach((answer, i) =>
    t.exact(`25-${i + 1}`, 7, 1, answer, [], { prompt: `Blank ${i + 1}` }),
  );
  ['cytoplasm', 'ribosomes', 'A', 'P', 'E'].forEach((answer, i) =>
    t.exact(`26-${i + 1}`, 7, 1, answer, i === 1 ? ['ribosome'] : [], { prompt: `Blank ${i + 1}` }),
  );
  t.exact('27', 7, 1, 'Reverse transcriptase', ['RNA-dependent DNA polymerase', 'telomerase']);
  t.exact('28', 8, 2, 'Wobble', ['wobble hypothesis']);
  t.exact('30a', 8, 1, 'AUGCGUAUUGACCACAUGUAA');
  t.exact('30b', 8, 2, 'Met, Arg, Ile, Asp, His, Met', [
    'Met Arg Ile Asp His Met',
    'Met-Arg-Ile-Asp-His-Met',
    'methionine, arginine, isoleucine, aspartic acid, histidine, methionine',
  ]);
  ['Denaturation', 'Annealing', 'Extension'].forEach((answer, i) => {
    t.exact(`31-${i + 1}-stage`, 8, 0.5, answer, [], { prompt: `Stage ${i + 1}` });
    // The key permits ±3 °C; annealing is a published range of 50–65 °C.
    const [value, tol] = [
      [94, 3],
      [57.5, 10.5],
      [72, 3],
    ][i];
    t.number(
      `31-${i + 1}-temperature`,
      8,
      0.5,
      value,
      tol,
      ['C', '°C', 'degrees C', 'Celsius'],
      false,
      `${i === 0 ? '94' : i === 1 ? '50–65' : '72'} °C (±3 °C)`,
    );
  });
  t.exact('32', 8, 2, 'Taq', ['Taq polymerase', 'Taq DNA polymerase']);
  t.exact('33', 8, 1, 'Primers', ['primer', 'DNA primers']);
  t.number('34', 8, 2, 32, 0, ['double helices', 'molecules']);
  t.add('35', 8, 1, 'Any response earns credit.', { grading: { anyNonEmpty: true } });
  t.add('36', 9, 1, 'Any response earns credit.', { grading: { anyNonEmpty: true } });
  t.finish();
}

{
  const t = make({
    id: 'columbia-2023-anatomy-c',
    eventId: 'anatomy-and-physiology',
    division: 'C',
    competition: 'Columbia University',
    level: 'Invitational',
    year: 2023,
    topics: ['Respiratory system', 'Digestive system', 'Immune system'],
    alignment:
      'This January 28, 2023 paper tests the respiratory, digestive, and immune systems, matching the 2027 rotation. Reviewed against the local 2027 Division C anatomy rules. It includes advanced material useful for State/National preparation; not every current subtopic is assessed.',
    instructions:
      '60 multiple-choice items, 41 diagram labels, and all 40 written questions are included. MCQ 24 requires both C and E. The key lists written answers 11–13 in a different order: these have been matched by question content. Written 6 and 18 use the answer key’s 1-point maxima; written 40 uses the paper’s stated 4 points. Explanations are sent for instructor rubric review; exact labels and choices are scored immediately.',
    sourceUrl: 'https://www.soinc.org/anatomy-and-physiology-c',
    paperUrl: 'https://drive.google.com/file/d/18_TncAL14rh2LV8xW7p3vDEccxULhepo/view',
    keyUrl: 'https://drive.google.com/file/d/1oThkxBYvNkdt7vebm4VA1itdQ0QNagrL/view',
  });
  const keys =
    'D E D A C E E D A B A D A C C C A A D C D D E C C A A A B B B D D A B C B C B A C C A D D B A C C C A B B C C B B C D B'.split(
      ' ',
    );
  // Page and option counts transcribed from the original paper, not inferred from the key.
  keys.forEach((answer, i) => {
    const n = i + 1;
    const page =
      n <= 6
        ? 2
        : n <= 13
          ? 3
          : n <= 19
            ? 4
            : n <= 25
              ? 5
              : n <= 30
                ? 6
                : n <= 33
                  ? 7
                  : n <= 35
                    ? 8
                    : n <= 40
                      ? 9
                      : n <= 48
                        ? 10
                        : n <= 55
                          ? 11
                          : 12;
    const options = n <= 16 || [22, 23, 24, 48].includes(n) ? 'ABCDE' : 'ABCD';
    t.mcq(`MC-${i + 1}`, page, 1, answer, options);
  });
  t.test.questions.find((q) => q.id === 'MC-24').multiple = true;
  t.test.keys['MC-24'] = { correctOptions: ['C', 'E'] };
  const diagrams = [
    [
      'Esophagus',
      'Cardia',
      'Fundus',
      'Body of stomach',
      'Longitudinal layer',
      'Circular layer',
      'Oblique layer',
      'Rugae',
      'Greater curvature',
      'Pylorus',
      'Duodenum',
      'Pyloric sphincter',
      'Lesser curvature',
      'Lower esophageal sphincter',
      'Mucosa',
      'Submucosa',
      'Muscularis externa',
      'Serosa',
    ],
    [
      'Tidal volume',
      'Inspiratory reserve volume',
      'Expiratory reserve volume',
      'Residual volume',
      'Vital capacity',
      'Inspiratory capacity',
      'Functional residual volume',
      'Total lung capacity',
    ],
    [
      'Serosa',
      'Longitudinal muscle',
      'Myenteric plexus',
      'Circular muscle',
      'Submucosa',
      'Submucosal plexus',
      'Muscularis mucosae',
      'Mucosa',
      'Mesentery',
    ],
    [
      'Metabolic alkalosis',
      'Acute respiratory alkalosis',
      'Chronic respiratory alkalosis',
      'Metabolic acidosis',
      'Acute respiratory acidosis',
      'Chronic respiratory acidosis',
    ],
  ];
  diagrams.forEach((terms, d) =>
    terms.forEach((term, i) =>
      t.exact(
        `Label-${d + 1}.${i + 1}`,
        13 + d,
        1,
        term,
        term === 'Functional residual volume'
          ? ['functional residual capacity']
          : term === 'Greater curvature'
            ? ['creater curvature']
            : [],
        { label: `Diagram ${d + 1}, label ${i + 1}` },
      ),
    ),
  );
  // Concise factual rubric summaries. The complete official key is linked in each result.
  const written = [
    [
      8,
      'Enzymes: pancreas/trypsin/proteolysis; stomach/pepsin/proteolysis; saliva/lysozyme; intestinal brush border/maltase/glucose.',
    ],
    [2, 'Coordinated muscular waves propel contents.'],
    [1.5, 'Taste; lubrication; cleansing.'],
    [1.5, 'Parotid; submandibular; sublingual.'],
    [3, 'Squamous epithelium; folds; glands; adventitia; changing muscle types. Any three.'],
    [1, 'Zymogens, epithelial turnover, or regulated acid secretion.'],
    [4, 'Distension; osmolarity; acidity; digestion products.'],
    [2, 'Secretin; cholecystokinin.'],
    [2, 'G: gastrin. D: somatostatin.'],
    [2, 'Bicarbonate enters blood during acid secretion.'],
    [3, 'Columnar epithelium; absent folds/villi/glands; thicker crypts; goblet cells. Any three.'],
    [2, 'Glycogen; iron; vitamin storage.'],
    [
      4,
      'Erythrocyte phagocytosis; hemoglobin breakdown; iron recovery; bilirubin; globin digestion.',
    ],
    [3, 'Microbiota loss; appendix reservoir; microbiota restoration.'],
    [
      8,
      'Macrophage/phagocytosis/myeloid; eosinophil/parasites/myeloid; cytotoxic T/killing/lymphoid; helper T/cytokines/lymphoid; B/antibodies/lymphoid; basophil/histamine/myeloid; neutrophil/phagocytosis/myeloid; NK/killing/lymphoid.',
    ],
    [2, 'Red: blood filtration. White: adaptive immunity.'],
    [1, 'Immunity against environmental pathogens.'],
    [1, 'Recurrent infection; swelling impairs breathing/swallowing.'],
    [4, 'Skin barrier; salivary lysozyme; gastric acid; mucosal barrier.'],
    [2, 'Cytokine: signaling. Chemokine: chemotaxis.'],
    [1, 'Heat; redness; pain; swelling (loss of function accepted).'],
    [4, 'Injury mediators; vasodilation; permeability; phagocyte recruitment.'],
    [2, 'Variable: specificity. Constant: conserved.'],
    [1, 'Artificial active immunity.'],
    [2, 'Bacterial targets absent from viruses; host dependence.'],
    [
      3,
      'Natural infection; antigen presentation; lymphocyte activation; antibodies; memory; vaccination; passive antibodies. Any three.',
    ],
    [
      3,
      'Acidity; antimicrobials; physical barrier; microbiota; mucus; cilia; phagocytes. Any three.',
    ],
    [1, 'Laryngeal prominence.'],
    [4, 'Macrophage; type I; type II; reduced surface tension.'],
    [2, 'Lubrication/adhesion; compartmentalization.'],
    [1, 'Blood carbon dioxide concentration.'],
    [4, 'Obstruction/obesity; impaired respiratory drive/brainstem injury.'],
    [1, 'Nitrogen > oxygen > water vapor > carbon dioxide.'],
    [4, 'Oxygen displaces CO; oxygen harms anaerobes.'],
    [1.5, 'Dissolved; bicarbonate; carbaminohemoglobin.'],
    [2, 'Hypoxia → erythropoietin → erythrocytes.'],
    [2, 'Alveolar damage reduces exchange area.'],
    [2, 'Tissue elasticity; surface tension.'],
    [3.5, '3000; 1200; 1200; 4700; 3500; 2400; 5900 mL.'],
    [4, 'DRG: inspiration. VRG: rhythm and active expiration.'],
  ];
  written.forEach(([points, answer], i) =>
    t.add(
      `FRQ-${i + 1}`,
      i < 10 ? 17 : i < 19 ? 18 : i < 30 ? 19 : i < 39 ? 20 : 21,
      points,
      answer,
      { label: `Written ${i + 1}` },
    ),
  );
  for (const [id, accepted] of Object.entries({
    'FRQ-24': ['artificial active immunity', 'active artificial immunity'],
    'FRQ-28': ['laryngeal prominence'],
    'FRQ-31': [
      'carbon dioxide',
      'CO2',
      'blood carbon dioxide concentration',
      'concentration of carbon dioxide in the blood',
    ],
  }))
    t.test.keys[id].criteria[0].accepted = accepted;
  t.finish();
}

{
  const t = make({
    id: 'beachwood-2023-dynamic-planet-c',
    eventId: 'dynamic-planet',
    division: 'C',
    competition: 'Beachwood High School',
    level: 'Invitational',
    year: 2023,
    scoringBasis: 'Practice scale: 1 point per question',
    topics: ['Freshwater', 'Rivers and streams', 'Groundwater', 'Lakes'],
    alignment:
      'The complete paper covers freshwater hydrology: streams, groundwater, drainage patterns, flow calculations, and lakes. These match the 2027 Dynamic Planet C freshwater focus. It is listed by Science Olympiad under previous freshwater-topic papers, rather than the oceanography or glacier rotations.',
    instructions:
      'The publisher provides a complete answer key but no overall point-weight schedule. This practice score assigns one point to each of the 70 numbered questions (70 total); it is not a reconstruction of the tournament’s original weighted score. Enter all requested labels in one text field for multi-part questions. Numerical ranges for questions 58 and 60 follow the key. Include the units requested by the paper.',
    sourceUrl: 'https://www.soinc.org/dynamic-planet-c',
    paperUrl: 'https://www.soinc.org/sites/default/files/uploaded_files/2023%20Beachwood%20DP.pdf',
    keyUrl:
      'https://www.soinc.org/sites/default/files/uploaded_files/2023%20Beachwood%20DP%20Answer%20Key.pdf',
  });
  'C B B C A B C B A B D A B C B A A D C A A C D A A C C C C A D A A C C B C C A D A B B C C A A D C C'
    .split(' ')
    .forEach((key, i) => {
      const n = i + 1;
      t.mcq(
        n,
        n <= 9 ? 1 : n <= 16 ? 2 : n <= 18 ? 3 : n <= 25 ? 4 : n <= 34 ? 5 : n <= 42 ? 6 : 7,
        1,
        key,
        'ABCD',
      );
    });
  t.number('51', 7, 1, 130, 0, ['ft3/s', 'ft^3/s', 'ft³/s', 'cfs'], true, '130 ft³/s');
  t.exact(
    '52',
    7,
    1,
    'A: dendritic; B: centripetal; C: annular; D: trellised; E: rectangular; F: parallel',
    [
      'dendritic, centripetal, annular, trellised, rectangular, parallel',
      'dendritic, centripetal, annular, trellis, rectangular, parallel',
    ],
  );
  t.mcq('53', 8, 1, 'D', 'ABCD');
  t.number('54', 8, 1, 150, 0, ['m/km'], true, '150 m/km');
  t.mcq('55', 8, 1, 'B', 'ABCD');
  t.mcq('56', 9, 1, 'A', 'ABCD');
  t.exact('57', 9, 1, 'Delta', ['river delta']);
  t.number('58', 9, 1, 0.0009, 0.0001, ['cm'], true, '0.0008–0.001 cm');
  t.mcq('59', 10, 1, 'C', 'ABCD');
  t.number('60', 10, 1, 50, 2, ['m/km'], true, '48–52 m/km');
  t.number('61', 10, 1, 40.2, 0, ['ft3/s', 'ft^3/s', 'ft³/s', 'cfs'], true, '40.2 ft³/s');
  'DFAGEBI'.split('').forEach((answer, i) => t.mcq(String(i + 62), 11, 1, answer, 'ABCDEFGHIJ'));
  t.exact('69', 11, 1, 'A: 2; B: 2; C: 5', ['2,2,5', '2, 2, 5', '2 2 5']);
  t.exact('70', 11, 1, 'D: 4; E: 3', ['4,3', '4, 3', '4 3']);
  t.finish();
}

{
  const t = make({
    id: 'bullso-2026-heredity-b',
    eventId: 'heredity',
    division: 'B',
    competition: 'BullSO · University of South Florida',
    level: 'Invitational',
    year: 2026,
    scoringBasis: '100-point scale: 2 points per question',
    topics: ['Mendelian genetics', 'Cell division', 'DNA and RNA', 'Gene regulation', 'PCR'],
    alignment:
      'Matches the 2027 genetics subject area: inheritance, pedigrees, cell division, DNA, gene expression and PCR. Linkage, incomplete dominance and the lac operon are States/Nationals topics in 2027. The archived paper also has a gel-electrophoresis identification question, outside the explicitly listed 2027 techniques. It does not cover the full expanded 2027 syllabus.',
    instructions:
      'Held January 24, 2026. All 50 questions are multiple choice. The paper specifies 100 total points without individual weights; this practice gives each question 2 points. PDF page 2 is blank in the source. Page references here count PDF pages, including the cover and blank page.',
    sourceUrl: 'https://drive.google.com/drive/folders/1yTFlPVACRN6Vv16EBWGXW8Y7GdOy6Wi-',
    paperUrl: 'https://drive.google.com/file/d/1znwL-jmCmdnL8fHZafIXx_n3me1udOFg/view',
    keyUrl: 'https://drive.google.com/file/d/1FvtSHMaOKHkOsr67ODuKdMf2g1s9_Bmx/view',
  });
  'B C B C B B C A C C B C B C C C C A A C B C B C C B B C C B B C C C B B B B D D C C B B B B C C B B'
    .split(' ')
    .forEach((key, i) => {
      const n = i + 1;
      t.mcq(
        n,
        n <= 6
          ? 3
          : n <= 13
            ? 4
            : n <= 20
              ? 5
              : n <= 26
                ? 6
                : n <= 33
                  ? 7
                  : n <= 40
                    ? 8
                    : n <= 46
                      ? 9
                      : 10,
        2,
        key,
        'ABCD',
      );
    });
  t.finish();
}
{
  const t = make({
    id: 'bullso-2026-disease-detectives-b',
    eventId: 'disease-detectives',
    division: 'B',
    competition: 'BullSO · University of South Florida',
    level: 'Invitational',
    year: 2026,
    topics: ['Surveillance', 'Outbreak investigation', 'Epidemiology', 'Disease prevention'],
    alignment:
      'The three subject areas match Disease Detectives B 2027: Background & Surveillance; Outbreak Investigation; Patterns, Control & Prevention. Bias, confounding and herd immunity are States/Nationals topics under the current rules. Archived MCQ 8 asks for a specific disease-category association, which the 2027 rules exclude; it is retained as part of the complete original paper.',
    instructions:
      'Held January 24, 2026. Published scoring: 76 multiple-choice points, 20 matching points and 54 written-response points (150 total). Matching questions use the lettered choices on the paper. For numerical written answers, use percentages where requested. Written explanations and calculations with work receive instructor rubric review so partial credit follows the published key.',
    sourceUrl: 'https://drive.google.com/drive/folders/1euWONjNg48rBOzE036uOKfrkSIOM6Xjd',
    paperUrl: 'https://drive.google.com/file/d/1PwBwUxgCoZND27yd2ylhdKnoEB-sHcLi/view',
    keyUrl: 'https://drive.google.com/file/d/1cVyECcC36IkkkxMw8LtbT6Mt9kwORg1F/view',
  });
  const letters =
    'B C C C C B C C B B C D C B C A B B C C B C D B C B B C C C C C B D C B B C C C C B B C C C A B B C C C C B C B B C C C A D D C B B B C B A B C A C D B'.split(
      ' ',
    );
  letters.forEach((key, i) => {
    const n = i + 1;
    t.mcq(
      `MCQ-${n}`,
      n <= 56 ? 2 + Math.floor((n - 1) / 7) : n <= 61 ? 10 : n <= 66 ? 11 : n <= 71 ? 12 : 13,
      1,
      key,
      'ABCD',
      { label: `Multiple choice ${n}` },
    );
  });
  'L E T Q C O I H R F G B M K D S P J N A'
    .split(' ')
    .forEach((key, i) =>
      t.mcq(`Match-${i + 1}`, 14, 1, key, 'ABCDEFGHIJKLMNOPQRST', { label: `Matching ${i + 1}` }),
    );
  [
    [
      '1',
      15,
      4,
      'Any two explained: seasonal variation; changes in care-seeking; missing baseline comparison.',
    ],
    ['2a', 15, 4, 'High sensitivity; low specificity.'],
    ['2b', 15, 3, 'Earlier detection, with more false alarms.'],
    ['3', 15, 4, 'Clinical care treats individuals; public health addresses population exposures.'],
    ['4a', 16, 4, 'Exposed: 120/200 = 60%. Unexposed: 60/200 = 30%.'],
    ['4b', 16, 4, 'Relative risk 2.0; exposed people have twice the risk.'],
    [
      '4c',
      16,
      4,
      'Causation is unproven: temporal uncertainty, confounding, or exposure misclassification. Explain two limitations.',
    ],
    [
      '4d',
      16,
      3,
      'Food consumption or time at the festival; explain association with both exposure and illness.',
    ],
    ['5a', 17, 3, 'Propagated outbreak'],
    ['5b', 17, 3, 'Person-to-person spread or continuing exposure.'],
    [
      '5c',
      17,
      6,
      'Any two justified: confirm diagnosis, refine case definition, sample the environment.',
    ],
    ['6a', 17, 3, '1200/50000 = 2.4%.'],
    ['6b', 17, 3, '300/48800 ≈ 0.61%.'],
    ['6c', 17, 3, '75/50000 = 0.15%.'],
    ['6d', 17, 3, 'Longer survival or longer disease duration.'],
  ].forEach(([id, page, points, answer]) =>
    t.add(`FRQ-${id}`, page, points, answer, { label: `Written ${id}` }),
  );
  t.test.keys['FRQ-5a'].criteria[0].accepted = [
    'propagated outbreak',
    'propagated',
    'person-to-person',
    'person to person',
  ];
  t.test.keys['FRQ-6a'].criteria[0].accepted = [
    '2.4%',
    '2.4 %',
    '0.024',
    '1200/50000',
    '1,200/50,000',
  ];
  t.test.keys['FRQ-6b'].criteria[0].accepted = [
    '0.61%',
    '0.61 %',
    '0.0061',
    '300/48800',
    '300/48,800',
  ];
  t.test.keys['FRQ-6c'].criteria[0].accepted = [
    '0.15%',
    '0.15 %',
    '0.0015',
    '75/50000',
    '75/50,000',
  ];
  t.finish();
}

const outputPath = 'src/data/practice-tests.json';
addArchivePapers(make);
await writeFile(
  outputPath,
  await format(JSON.stringify(catalog), { ...(await resolveConfig(outputPath)), parser: 'json' }),
);
console.log(
  `Wrote ${catalog.length} verified papers, ${catalog.reduce((n, t) => n + t.questionCount, 0)} answer fields.`,
);
