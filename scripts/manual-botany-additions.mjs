// Reviewed against both original Scilympiad PDFs and the publisher's detailed rubric.
// Source extraction is local; this script makes no model or network requests.
import { readFile, writeFile } from 'node:fs/promises';
import { validatePracticeCatalog } from '../src/lib/practice-catalog.ts';

const sources = JSON.parse(await readFile('documents/practice-import-sources.json', 'utf8'));
const criteria = (rows) =>
  rows.map(([points, answer], i) => ({ id: `part-${i + 1}`, points, answer }));
const sharedRubrics = {
  stem: criteria(
    [
      [1, "Last year's growth."],
      [1, 'Internode; accept growth of two years ago.'],
      [1, 'Terminal or apical bud.'],
      [1, 'Axillary or lateral bud.'],
      [1, 'Leaf scar.'],
      [1, 'Bud scale scar or bud scar.'],
      [1, 'Node.'],
      [1, 'Lenticels.'],
    ].map(([p, a]) => [p, a + ' The revised detailed key accepts any order.']),
  ),
  leaf: criteria([
    [1, 'Leaf shape: ovate.'],
    [1, 'Venation: pinnate.'],
  ]),
  graphs: criteria([
    [1, 'Species 2 (lower curve) is C3.'],
    [1, 'Species 1 (upper curve) is C4.'],
    [
      2,
      'C3 is less efficient because of photorespiration; increasing CO2 suppresses photorespiration. C4 concentrates CO2. Award partial credit for a correct incomplete justification.',
    ],
    [1, 'One C3 example: rice, wheat, barley, potato, or another valid C3 plant.'],
    [1, 'One C4 example: maize/corn, sugar cane, millet, or another valid C4 plant.'],
    [1, 'One CAM example: pineapple, agave, or another valid CAM plant.'],
  ]),
  tyloses: criteria([
    [1, 'Tyloses.'],
    [1, 'In the lumen of secondary-xylem tracheids or vessels, growing through pit connections.'],
    [
      2,
      'Balloon-like outgrowths of parenchymatous cells form under stress such as drought or infection.',
    ],
    [
      2,
      'They block damaged vascular tissue, limiting leakage or further damage and pathogen spread; accept a valid environmental-response explanation.',
    ],
    [1, 'Ergastic substances provide storage or defense, including odor/taste deterrence.'],
    [
      2,
      'One point for each of two valid ergastic substances, such as resin, gum, tannin, or taxol.',
    ],
    [1, 'CODIT compartmentalizes damage/decay; tyloses help block vascular spread.'],
  ]),
  elm: criteria([
    [
      2,
      'Describe two valid management methods, such as pruning and destroying infected timber, reducing beetle breeding material, or induced biological resistance (DutchTrig). The historical key also accepts chemical control. Award 1 per described method, or 0.5 per merely named method, maximum 2; do not double-count a method.',
    ],
  ]),
  germination: criteria([
    [
      4,
      'Two practices: stratification exposes seeds to warm/cold conditions, scarification weakens the seed coat by rubbing/cutting/chipping, or soaking removes chemical inhibitors such as abscisic acid. Award 2 per described practice or 1 per named practice, maximum 4; do not double-count.',
    ],
  ]),
  pathways: criteria([
    [
      5,
      'One point per correctly used term, maximum 5: CO2, mesophyll cells, bundle-sheath cells, Calvin cycle, PEP carboxylase. In C4, PEP carboxylase fixes CO2 in mesophyll cells into four-carbon acids, which move to bundle-sheath cells and release CO2 for Rubisco/Calvin-cycle fixation. In CAM, acids are stored overnight and release CO2 for the Calvin cycle during daylight.',
    ],
    [
      2,
      'C4 separates initial fixation and the Calvin cycle spatially between mesophyll and bundle-sheath cells; CAM separates them temporally (night/day) in the same cells.',
    ],
    [
      1,
      'C4 can maintain fixation with partially closed stomata; CAM opens stomata at night and closes them during the hot day to conserve water.',
    ],
    [
      2,
      'One point per valid biome, maximum 2, with biologically appropriate context (for example warm grasslands, savannas, or hot arid regions). The historical key also lists warm temperate zones and tundras.',
    ],
    [
      2,
      'Explain how CO2 concentration reduces photorespiration and water loss in hot, bright conditions; one explanation can cover both listed biomes.',
    ],
  ]),
  agrobacterium: criteria([
    [1, 'Only statement 2 is correct. No partial credit for this subpart.'],
    [1, 'Acetosyringone; the detailed key also accepts phytoalexins or methylsalicylic acids.'],
    [
      5,
      'One point per described step, maximum 5: wounded plant signal activates bacterial vir genes; Ti-plasmid T-DNA is processed to a single strand; T-DNA is transferred into the plant cell; it reaches the nucleus and integrates into a chromosome; expression produces hormones/opines, altered growth, and nutrients for the bacterium.',
    ],
    [
      7,
      'Identify five steps in vir-mediated transfer (1 each, maximum 5) and describe any two (1 each, maximum 2): signal recognition/vir activation, border processing and T-strand production, coating/protecting T-DNA, secretion into the plant cell, and nuclear import/integration. Accept equivalent scientifically valid descriptions of these transfer stages.',
    ],
    [
      3,
      'One point per valid metabolite, maximum 3: auxin, cytokinin, opines. The detailed key also accepts appropriate phenolics/polyphenolics, nitrogen compounds such as nicotine, terpenoids, alkaloids, or other secondary plant metabolites.',
    ],
  ]),
};
const specialB = {
  90: criteria([
    [1, 'Figure 1 is a charophyte. Award 0.5 for a broader answer such as algae.'],
    [
      2,
      'One point per valid shared characteristic, maximum 2: ring-shaped cellulose-synthesizing complexes, similar flagellated sperm, or sporopollenin protecting zygotes.',
    ],
    [
      2,
      'One point per advantage, maximum 2: increased access to CO2, erosion-derived nutrients, or sunlight unfiltered by water/plankton.',
    ],
    [
      2,
      'One point per challenge, maximum 2: limited water and lack of structural support against gravity.',
    ],
    [
      1,
      'Sporopollenin is a durable protective polymer that prevents exposed zygotes from drying out.',
    ],
    [
      1,
      'Accumulating these protective/adaptive traits enabled descendants to live permanently above the waterline and colonize terrestrial habitats.',
    ],
  ]),
  91: criteria([
    [
      2,
      'Meiosis in the diploid sporophyte produces haploid spores (1); spores/protonemata divide by mitosis into gametophytes (1).',
    ],
    [
      1,
      'Rhizoids anchor gametophytes and do not play a significant role in water/mineral absorption.',
    ],
    [2, 'Antheridia (male) and archegonia (female), 1 each.'],
    [
      2,
      'Maturing at different times avoids self-fertilization, maintaining variation and improving population survival.',
    ],
    [
      2,
      'Figure 2 is the fern cycle, unlike the moss cycle in Figure 1. Ferns have a dominant sporophyte and a reduced but independent, photosynthetic gametophyte. Credit distinguishing fern/moss within this 2-point comparison, not as an extra bonus.',
    ],
    [1, 'Ferns have vascular tissues for water/nutrient transport and support; mosses lack them.'],
    [1, 'Sorus: number 14.'],
    [1, 'The gametophyte is independent of the mature sporophyte.'],
  ]),
};
const specialC = {
  91: criteria([
    [1, 'Amino acids.'],
    [1, 'Ketoacids or a hexose.'],
  ]),
  92: criteria([
    [1, 'Crown raising; 0.5 for bottom-up pruning.'],
    [
      2,
      'Excessive crown raising leaves a live crown ratio below about 60%, reducing trunk taper and wind stability. The original Scilympiad key assigns 2 points here.',
    ],
    [
      2,
      'One point per issue, maximum 2: decay, trunk cracks, poor healing/structural failure, or related valid health risks.',
    ],
    [
      1,
      'Allow sufficient canopy regrowth toward at least a 60% live crown ratio, or another valid corrective solution.',
    ],
  ]),
  96: criteria([
    [
      2,
      'Multiple codominant leaders / competing large branches with an excessive branch aspect ratio; accept a clear structural description.',
    ],
    [1, 'Increased risk of splitting in storms and subsequent decay.'],
    [
      1,
      'Branch diameter no more than about half the trunk diameter: branch aspect ratio 50% or less, trunk:branch at least 2:1.',
    ],
    [
      3,
      'One point per step: select a healthy central dominant stem; identify competing stems; remove/reduce competitors with appropriate reduction cuts. Accept equivalent safe structural-pruning plans.',
    ],
  ]),
  98: criteria([
    [1, '1: Undercut.'],
    [1, '2: Top cut.'],
    [1, '3: Stub cut.'],
  ]),
  99: criteria([
    [
      1,
      'Adulteration lowers crude-drug quality deliberately or unintentionally; 0.5 for a definition restricted to deliberate actions.',
    ],
    [1, 'Admixture.'],
    [
      2,
      'One point per valid description, maximum 2: inferiority replaces the drug with substandard material; sophistication adds spurious/inferior material to deceive. Accept other correctly described adulteration types.',
    ],
    [
      2,
      'One point per example linked to a description, maximum 2: substituting Japanese ginger for ginger; adding flour to powdered ginger and using capsicum/curcuma to disguise it. If examples are given without descriptions, award 0.5 each, maximum 1.',
    ],
    [
      2,
      'One point per distinct non-economic reason, maximum 2, such as misidentification/lack of botanical knowledge, accidental contamination/admixture, or spoilage/improper storage.',
    ],
  ]),
  100: criteria([
    [
      2,
      'Describe another valid physicochemical quality-control procedure. The key example calibrates a pH meter against a buffer, rinses the electrode, measures the sample, and records pH. Accept an appropriate alternative procedure.',
    ],
    [
      1,
      'Include reasonable measurements/conditions in the procedure; the key example uses pH-4 buffer, stabilization, and a sample reading near 5.86. An identical invented sample value is not required.',
    ],
    [1, 'Clearly identify the physicochemical parameter measured, such as pH.'],
  ]),
  101: criteria([
    [
      2,
      'One point per chorismate-derived aromatic amino acid, maximum 2: phenylalanine, tyrosine, tryptophan.',
    ],
    [
      2,
      'Describe a valid biosynthetic pathway, such as prephenate oxidative decarboxylation to p-hydroxyphenylpyruvate followed by transamination to tyrosine.',
    ],
    [
      2,
      'Use correct specific compounds and terms in that pathway, such as prephenate, dehydrogenase, p-hydroxyphenylpyruvate, glutamate, and transaminase.',
    ],
    [
      2,
      'One point per phenylalanine-containing food, maximum 2: milk, eggs, cheese, meat, legumes, or another valid protein-containing food.',
    ],
    [
      2,
      'Explain phenylalanine/tyrosine feeding phenylpropanoid synthesis and then flavonoid/quercetin production.',
    ],
    [
      2,
      'Specific quercetin pathway intermediates: naringenin, eriodictyol, dihydroquercetin, and flavonol synthase converting toward quercetin; 0.5 per correct term, maximum 2. Accept correctly spelled biochemical equivalents.',
    ],
    [
      1,
      'Roundup is a glyphosate herbicide; Roundup Ready describes genetically engineered glyphosate-resistant crop seeds.',
    ],
    [
      1,
      'The crop has a glyphosate-resistant EPSP synthase gene/version; the herbicide itself is not genetically modified.',
    ],
    [1, 'EPSP synthase / CP4 EPSPS.'],
    [
      2,
      'Glyphosate inhibits susceptible EPSP synthase in the shikimate pathway, disrupting aromatic amino-acid synthesis in weeds. Resistant crops maintain the pathway and survive.',
    ],
  ]),
};

for (const division of ['B', 'C']) {
  const id = `ut-austin-2020-botany-${division.toLowerCase()}`;
  const s = sources.find((s) => s.id === id);
  if (!s) throw new Error(`Missing source ${id}`);
  const rows = JSON.parse(
    await readFile(
      `output/practice-research/expansion/botany-${division.toLowerCase()}-extraction.json`,
      'utf8',
    ),
  );
  const isB = division === 'B';
  const scoringBasis = isB
    ? '168 points across all 91 questions. Published MCQ markings are retained, including disputed question 75 (the key selects B). Multi-select questions require the complete correct set. Stem labels accept any order per the revised detailed key. The fern/moss comparison is capped at its printed 12-point question total; the ambiguous extra identification note is included within that comparison.'
    : '200 points across all 101 questions. Q99 uses its eight itemized rubric points although its heading says nine (the printed question headings sum to 201). Q92 follows the original key’s 2-point explanation. Published MCQ markings are retained, including disputed question 76 (the key selects B). Multi-select questions require the complete correct set. Stem labels accept any order per the revised detailed key.';
  const t = {
    id,
    eventId: 'botany',
    division,
    competition: s.competition,
    year: 2020,
    season: 2027,
    level: null,
    levelEvidence: null,
    difficulty: 'Hard',
    difficultyReason: isB
      ? 'A long 91-question paper with plant pathology, photosynthetic pathways, genetics and substantial multi-part explanations under a 50-minute target.'
      : 'A long 101-question paper combining core botany with detailed biochemistry, genetic engineering, horticulture and extended rubric-based explanations.',
    topics: [
      'Plant anatomy',
      'Plant physiology',
      'Plant diseases',
      'Photosynthesis',
      'Plant genetics',
      ...(isB ? ['Plant evolution'] : ['Horticulture', 'Plant biochemistry']),
    ],
    topicMatch: 'current',
    alignment:
      'Core botany, anatomy, photosynthesis, plant genetics and diseases match the 2027 subject area. ' +
      (isB
        ? 'Some biochemical detail exceeds the broad Division B outline.'
        : 'The additional horticulture, biochemistry and plant-use questions match the Division C outline.') +
      ' Historical event materials and question wording are preserved; this is not a guarantee that every item meets every current rule detail.',
    minutes: 50,
    sourceUrl: s.sourceUrl,
    paperUrl: s.paperUrl,
    keyUrl: s.keyUrl,
    rulesUrl: 'https://www.soinc.org/rules-2027',
    reviewedOn: '2026-10-08',
    gradingMode: 'published-key',
    scoringBasis,
    instructions:
      'Use the complete original paper for diagrams and printed question numbers. Enter all subparts in the matching response box. Auto Grade uses the published Scilympiad key and the publisher’s detailed written rubric. ' +
      scoringBasis,
    questions: [],
    keys: {},
    questionCount: 0,
    maxScore: 0,
  };
  const offset = isB ? 0 : 1;
  const rubrics = {
    [80 + offset]: sharedRubrics.stem,
    [83 + offset]: sharedRubrics.leaf,
    [84 + offset]: sharedRubrics.graphs,
    [85 + offset]: sharedRubrics.tyloses,
    [86 + offset]: sharedRubrics.elm,
    [87 + offset]: sharedRubrics.germination,
    [88 + offset]: sharedRubrics.pathways,
    [89 + offset]: sharedRubrics.agrobacterium,
    ...(isB ? specialB : specialC),
  };
  for (const row of rows) {
    const prompt = row.prompt
      .split(
        /\n(?:BeLeaf In Yourselves|A Bacterial Plant Parasite Aids Cloning In Plants|Plant Horticulture|Congratulations, you have finished)/,
      )[0]
      .trim();
    const q = {
      id: String(row.n),
      label: String(row.n),
      page: row.page,
      points: row.points,
      prompt,
      type: row.options ? 'mcq' : 'frq',
    };
    if (row.options) {
      q.options = row.options;
      q.multiple = row.answers.length > 1 || prompt.includes('Mark ALL correct answers');
      t.keys[q.id] = q.multiple
        ? { correctOptions: row.answers }
        : { correctOption: row.answers[0] };
    } else if (rubrics[row.n]) {
      t.keys[q.id] = { criteria: rubrics[row.n] };
      q.points = rubrics[row.n].reduce((n, c) => n + c.points, 0);
      if (q.points !== row.points && !(division === 'C' && row.n === 99))
        throw new Error(`Unexpected weight change ${id}/${row.n}`);
    } else {
      const answer = row.keyText.split('\n').at(-1).trim();
      if (answer.length > 30 || answer === row.prompt || /Expected Answer/.test(answer))
        throw new Error(`Review short answer ${id}/${row.n}`);
      const accepted = [answer];
      if (answer === 'Mycorrhizae') accepted.push('mycorrhiza', 'mycorrhizas');
      if (answer === 'Bat') accepted.push('bats');
      t.keys[q.id] = { criteria: [{ id: 'answer', points: q.points, answer, accepted }] };
    }
    t.questions.push(q);
  }
  t.questionCount = t.questions.length;
  t.maxScore = t.questions.reduce((n, q) => n + q.points, 0);
  validatePracticeCatalog([t]);
  await writeFile(`output/practice-research/converted/${id}.json`, JSON.stringify(t, null, 2));
  console.log(`${id}: ${t.questionCount} questions, ${t.maxScore} points`);
}
