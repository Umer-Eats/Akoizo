import { check, phet, sort, type EventExtras } from '../lesson-extras.ts';
import {
  choice,
  goal,
  near,
  rect,
  seeded,
  slider,
  text,
  type Shape,
  type TopicLab,
} from '../topic-lab-kit.ts';

// Offspring phenotype ratios for each cross, in the order of their class names.
const crosses: { name: string; classes: string[]; ratios: number[] }[] = [
  { name: 'Aa × Aa', classes: ['A_', 'aa'], ratios: [3 / 4, 1 / 4] },
  { name: 'Aa × aa (test cross)', classes: ['Aa', 'aa'], ratios: [1 / 2, 1 / 2] },
  {
    name: 'AaBb × AaBb',
    classes: ['A_B_', 'A_bb', 'aaB_', 'aabb'],
    ratios: [9 / 16, 3 / 16, 3 / 16, 1 / 16],
  },
  {
    name: 'AaBb × aabb (test cross)',
    classes: ['AaBb', 'Aabb', 'aaBb', 'aabb'],
    ratios: [1 / 4, 1 / 4, 1 / 4, 1 / 4],
  },
  {
    name: 'BbEe × BbEe (recessive epistasis)',
    classes: ['black B_E_', 'brown bbE_', 'yellow __ee'],
    ratios: [9 / 16, 3 / 16, 4 / 16],
  },
];
const cross: TopicLab = {
  id: 'her-cross',
  title: 'Punnett predictions versus real families',
  lead: 'Pick a cross and a family size. Expected counts come from the Punnett square; the observed counts are a random sample, so they wobble around the prediction.',
  controls: [
    choice(
      'cross',
      'Cross',
      crosses.map((c) => c.name),
      0,
    ),
    slider('n', 'Offspring scored', 16, 1600, 16, 160, ''),
    slider('run', 'Sample number (draw a new family)', 1, 20, 1, 1, ''),
  ],
  run: (v) => {
    const { classes, ratios } = crosses[v.cross];
    const expected = ratios.map((r) => r * v.n),
      observed = ratios.map(() => 0),
      rng = seeded(v.run * 104729 + v.cross * 977 + v.n);
    for (let i = 0; i < v.n; i++) {
      let u = rng(),
        k = 0;
      while (k < ratios.length - 1 && u >= ratios[k]) u -= ratios[k++];
      observed[k]++;
    }
    const last = expected.length - 1;
    return {
      o: { last: expected[last], first: expected[0], classes: classes.length },
      metrics: [
        { label: 'Expected counts', value: expected.map((e) => Number(e.toFixed(1))).join(' : ') },
        { label: 'Observed in this family', value: observed.join(' : ') },
        {
          label: 'Largest gap from expectation',
          value: Number(Math.max(...expected.map((e, i) => Math.abs(observed[i] - e))).toFixed(1)),
        },
      ],
      bars: {
        title: 'Expected (grey) and observed (colour) offspring',
        max: Math.max(...expected, ...observed),
        items: classes.flatMap((name, i) => [
          { label: `${name} expected`, value: expected[i], tone: 'muted' as const },
          { label: `${name} observed`, value: observed[i], tone: 'slot' as const },
        ]),
      },
    };
  },
  missions: [
    goal(
      'Choose the cross in which every phenotype class is expected equally often among four classes.',
      'Cross a double heterozygote with a homozygous recessive parent.',
      { cross: 3 },
      (o, v) => v.cross === 3,
    ),
    goal(
      'In the epistasis cross, find the family size that predicts exactly 100 yellow puppies.',
      'Yellow (ee) is 4/16 of the offspring.',
      { cross: 4, n: 400 },
      (o, v) => v.cross === 4 && near(o.last, 100, 1e-9),
    ),
    goal(
      'In Aa × Aa, set a family size that predicts exactly 300 dominant offspring.',
      'The dominant class is three quarters of the total.',
      { cross: 0, n: 400 },
      (o, v) => v.cross === 0 && near(o.first, 300, 1e-9),
    ),
  ],
  predict: {
    q: 'In a BbEe × BbEe cross with recessive epistasis, what fraction of puppies are yellow?',
    options: ['4/16', '3/16', '1/16', '9/16'],
    correct: 0,
    why: 'ee masks the B gene, so every ee genotype (1/4 of offspring) is yellow regardless of its B alleles: 4/16.',
  },
  model:
    'Unlinked autosomal genes with complete dominance unless epistasis is chosen, and equal survival of every genotype. Observed counts are a reproducible pseudo-random sample, synthetic rather than real data.',
};

const mothers = ['XᴬXᴬ unaffected', 'XᴬXᵃ carrier', 'XᵃXᵃ affected'];
const xlinked: TopicLab = {
  id: 'her-xlinked',
  title: 'Sons, daughters, and the X chromosome',
  lead: 'An X-linked recessive allele travels differently to sons and daughters. Choose the parents and compare the risk for each sex.',
  controls: [
    choice('mother', 'Mother', mothers, 1),
    choice('father', 'Father', ['XᴬY unaffected', 'XᵃY affected'], 0),
  ],
  run: (v) => {
    const eggs = [
      ['Xᴬ', 'Xᴬ'],
      ['Xᴬ', 'Xᵃ'],
      ['Xᵃ', 'Xᵃ'],
    ][v.mother];
    const sperm = v.father ? 'Xᵃ' : 'Xᴬ';
    const sons = eggs.filter((e) => e === 'Xᵃ').length / 2;
    const affectedD = eggs.filter((e) => e === 'Xᵃ' && sperm === 'Xᵃ').length / 2;
    const carrierD = eggs.filter((e) => (e === 'Xᵃ') !== (sperm === 'Xᵃ')).length / 2;
    const cell = (x: number, y: number, label: string, sick: boolean): Shape[] => [
      rect(x, y, 150, 80, sick ? 'warm' : 'accent', sick, sick ? 0.3 : 1, 6),
      text(x + 75, y + 46, label, 'middle', 'ink', 18),
    ];
    return {
      o: { sons, affectedD, carrierD },
      metrics: [
        { label: 'Sons affected', value: sons * 100, unit: '%' },
        { label: 'Daughters affected', value: affectedD * 100, unit: '%' },
        { label: 'Daughters who are carriers', value: carrierD * 100, unit: '%' },
      ],
      sceneLabel: `Punnett square: ${sons * 100}% of sons and ${affectedD * 100}% of daughters affected`,
      scene: [
        text(250, 40, `sperm ${sperm}`, 'middle'),
        text(410, 40, 'sperm Y', 'middle'),
        text(165, 105, `egg ${eggs[0]}`, 'end'),
        text(165, 195, `egg ${eggs[1]}`, 'end'),
        ...cell(175, 60, eggs[0] + sperm, eggs[0] === 'Xᵃ' && sperm === 'Xᵃ'),
        ...cell(335, 60, eggs[0] + 'Y', eggs[0] === 'Xᵃ'),
        ...cell(175, 150, eggs[1] + sperm, eggs[1] === 'Xᵃ' && sperm === 'Xᵃ'),
        ...cell(335, 150, eggs[1] + 'Y', eggs[1] === 'Xᵃ'),
        text(250, 270, 'daughters', 'middle', 'muted'),
        text(410, 270, 'sons', 'middle', 'muted'),
      ],
    };
  },
  missions: [
    goal(
      'Find parents whose daughters are all carriers but none are affected, and whose sons are all unaffected.',
      'An affected father gives his X to every daughter, but never to a son.',
      { mother: 0, father: 1 },
      (o) => o.carrierD === 1 && o.sons === 0,
    ),
    goal(
      'Find parents for whom every child, son or daughter, is affected.',
      'Both of the mother’s X chromosomes and the father’s X must carry the allele.',
      { mother: 2, father: 1 },
      (o) => o.sons === 1 && o.affectedD === 1,
    ),
  ],
  predict: {
    q: 'A carrier mother and an unaffected father have a son. What is the chance he is affected?',
    options: ['1/2', '1/4', '0', '1'],
    correct: 0,
    why: 'A son gets his only X from his mother, and a carrier passes the affected X half of the time.',
  },
  model:
    'A single X-linked recessive allele with complete penetrance; each egg and sperm type is equally likely. Percentages are probabilities for each child, not guaranteed family outcomes.',
};

const meiosis: TopicLab = {
  id: 'her-meiosis',
  title: 'Counting chromosomes through meiosis',
  lead: 'Choose a diploid number and a stage. Track how many chromosomes and chromatids each cell holds, and how many gamete combinations independent assortment allows.',
  controls: [
    slider('pairs', 'Homologous pairs (n)', 1, 23, 1, 4, ''),
    choice(
      'stage',
      'Stage',
      ['G1 (before S)', 'After S phase', 'After meiosis I', 'After meiosis II'],
      0,
    ),
  ],
  run: (v) => {
    const chromosomes = v.stage <= 1 ? 2 * v.pairs : v.pairs;
    const chromatids =
      v.stage === 0
        ? 2 * v.pairs
        : v.stage === 1
          ? 4 * v.pairs
          : v.stage === 2
            ? 2 * v.pairs
            : v.pairs;
    const cells = v.stage <= 1 ? 1 : v.stage === 2 ? 2 : 4;
    const combos = 2 ** v.pairs;
    const shown = Math.min(v.pairs, 6);
    const scene: Shape[] = [];
    for (let i = 0; i < shown; i++) {
      const x = 60 + i * 90;
      const copies = v.stage <= 1 ? 2 : 1;
      for (let j = 0; j < copies; j++) {
        scene.push(rect(x + j * 26, 120, 14, 90, j ? 'warm' : 'accent', true, 0.5, 6));
        if (v.stage === 1 || v.stage === 2)
          scene.push(rect(x + j * 26 + 15, 120, 10, 90, j ? 'warm' : 'accent', true, 0.3, 5));
      }
    }
    scene.push(
      text(
        320,
        60,
        `${cells} cell${cells > 1 ? 's' : ''} · ${chromosomes} chromosomes each`,
        'middle',
      ),
    );
    if (v.pairs > shown)
      scene.push(text(320, 280, `showing 6 of ${v.pairs} pairs`, 'middle', 'muted'));
    return {
      o: { chromosomes, chromatids, cells, combos },
      metrics: [
        { label: 'Cells', value: cells },
        { label: 'Chromosomes per cell', value: chromosomes },
        { label: 'Chromatids per cell', value: chromatids },
        { label: 'Possible gamete combinations (2ⁿ)', value: combos.toLocaleString('en-US') },
      ],
      sceneLabel: `${cells} cells with ${chromosomes} chromosomes and ${chromatids} chromatids each`,
      scene,
    };
  },
  missions: [
    goal(
      'Set up a human cell (23 pairs) right after meiosis I and read its chromatid count.',
      'Homologs have separated, but each chromosome still has two chromatids.',
      { pairs: 23, stage: 2 },
      (o, v) => v.pairs === 23 && v.stage === 2 && o.chromatids === 46,
    ),
    goal(
      'Find the number of pairs that gives exactly 1,024 gamete combinations.',
      'Solve 2ⁿ = 1,024.',
      { pairs: 10 },
      (o) => o.combos === 1024,
    ),
  ],
  predict: {
    q: 'A cell with 2n = 8 finishes meiosis II. How many chromosomes does each gamete have?',
    options: ['4', '8', '16', '2'],
    correct: 0,
    why: 'Meiosis halves the chromosome number in meiosis I; meiosis II separates sister chromatids without changing the count, leaving 4.',
  },
  model:
    'Chromosome counts follow centromeres; chromatids double in S phase. Combinations count only independent assortment (2ⁿ), ignoring crossing over, which adds far more variety.',
};

const hardy: TopicLab = {
  id: 'her-hardy',
  title: 'Hardy–Weinberg genotype frequencies',
  lead: 'Slide the recessive allele frequency q. The curves show p², 2pq, and q² — and how many carriers hide behind each affected person.',
  controls: [slider('q', 'Recessive allele frequency q', 0.01, 0.99, 0.01, 0.2, '')],
  run: (v) => {
    const p = 1 - v.q;
    return {
      o: { aa: v.q * v.q, het: 2 * p * v.q, AA: p * p },
      metrics: [
        { label: 'AA (p²)', value: Number((p * p).toFixed(4)) },
        { label: 'Aa carriers (2pq)', value: Number((2 * p * v.q).toFixed(4)) },
        { label: 'aa affected (q²)', value: Number((v.q * v.q).toFixed(4)) },
        {
          label: 'Carriers per affected person',
          value: Number(((2 * p * v.q) / (v.q * v.q)).toFixed(1)),
        },
      ],
      plot: {
        title: 'Genotype frequencies at equilibrium',
        x: [0, 1, 'q (frequency of a)'],
        y: [0, 1, 'Genotype frequency'],
        curves: [
          { f: (x) => (1 - x) ** 2, label: 'AA', tone: 'accent' },
          { f: (x) => 2 * x * (1 - x), label: 'Aa', tone: 'slot' },
          { f: (x) => x * x, label: 'aa', tone: 'warm' },
        ],
        vlines: [{ x: v.q, label: `q = ${v.q.toFixed(2)}` }],
      },
    };
  },
  missions: [
    goal(
      'Find q where exactly 9% of the population shows the recessive trait.',
      'Take the square root of q² = 0.09.',
      { q: 0.3 },
      (o) => near(o.aa, 0.09, 1e-9),
    ),
    goal(
      'Find the allele frequency where heterozygotes are as common as they can be.',
      '2pq is largest when p and q are equal.',
      { q: 0.5 },
      (o) => near(o.het, 0.5, 1e-9),
    ),
    goal(
      'Make the trait rare: set q so only 1 in 10,000 people is affected.',
      'Solve q² = 0.0001 for q.',
      { q: 0.01 },
      (o) => near(o.aa, 0.0001, 1e-9),
    ),
  ],
  predict: {
    q: 'If 1 in 100 people show a recessive trait, about what fraction are carriers?',
    options: ['18%', '1%', '10%', '81%'],
    correct: 0,
    why: 'q² = 0.01 gives q = 0.1 and p = 0.9, so 2pq = 0.18: carriers outnumber affected people 18 to 1.',
  },
  model:
    'A large, randomly mating population with no mutation, migration, or selection. Real populations violate these assumptions; departures from p² : 2pq : q² point to the force acting.',
};

const pcr: TopicLab = {
  id: 'her-pcr',
  title: 'PCR doubling and its limits',
  lead: 'Set the starting copies, cycles, and efficiency. Perfect PCR doubles each cycle; real reactions copy a little less than every strand.',
  controls: [
    slider('start', 'Starting copies', 1, 100, 1, 1, ''),
    slider('cycles', 'Cycles', 0, 35, 1, 0, ''),
    slider('eff', 'Efficiency per cycle', 50, 100, 5, 100, '%'),
  ],
  run: (v) => {
    const factor = 1 + v.eff / 100;
    const copies = v.start * factor ** v.cycles;
    return {
      o: { copies, log: Math.log10(copies) },
      metrics: [
        {
          label: 'Copies after cycling',
          value: copies < 1e6 ? Math.round(copies) : copies.toExponential(2),
        },
        { label: 'Growth per cycle', value: `× ${factor.toFixed(2)}` },
      ],
      plot: {
        title: 'Copies grow exponentially (log scale)',
        x: [0, 35, 'Cycle'],
        y: [0, 14, 'log₁₀(copies)'],
        curves: [
          {
            f: (c) => Math.log10(v.start * 2 ** c),
            label: 'perfect doubling',
            tone: 'muted',
            dash: true,
          },
          { f: (c) => Math.log10(v.start * factor ** c), label: 'this reaction', tone: 'slot' },
        ],
        points: [{ x: v.cycles, y: Math.log10(copies) }],
      },
    };
  },
  missions: [
    goal(
      'Starting from one copy with perfect efficiency, reach exactly 1,024 copies.',
      'Ten doublings: 2¹⁰ = 1,024.',
      { start: 1, cycles: 10, eff: 100 },
      (o, v) => v.start === 1 && v.eff === 100 && near(o.copies, 1024, 1e-6),
    ),
    goal(
      'Start with 50 copies and reach at least one million at perfect efficiency, using as few cycles as possible.',
      '50 × 2ⁿ must pass 1,000,000; try n = 15.',
      { start: 50, cycles: 15, eff: 100 },
      (o, v) => v.start === 50 && v.eff === 100 && o.copies >= 1e6 && v.cycles === 15,
    ),
  ],
  predict: {
    q: 'A PCR starts with one double-stranded copy. About how many copies exist after 20 perfect cycles?',
    options: ['About 1 million', 'About 400', 'About 40', 'About 1 billion'],
    correct: 0,
    why: '2²⁰ = 1,048,576, roughly a million. Each extra 10 cycles multiplies by about 1,000.',
  },
  model:
    'Copies = start × (1 + efficiency)^cycles. Real reactions plateau as primers and dNTPs run out; this model shows only the early exponential phase.',
};

export const heredityExtras: EventExtras = {
  eventId: 'heredity',
  labs: [cross, xlinked, meiosis, hardy, pcr],
  lessons: {
    'her-u1-l1': {
      labs: ['her-cross'],
      phet: [
        phet(
          'plinko-probability',
          'Plinko Probability',
          'Each ball takes random left or right steps, just as each gamete randomly receives one allele. Watching hundreds of balls shows why ratios only appear in large samples.',
          'Drop 10 balls and record the distribution, then drop 1,000 and compare how closely the shape matches the prediction.',
          'Explain how this relates to why 400 pea offspring match 3 : 1 better than 8 offspring do.',
        ),
      ],
      sort: sort(
        'Product rule or sum rule?',
        ['Product rule (and)', 'Sum rule (or)'],
        [
          ['An offspring is aa and also bb', 0],
          ['An offspring is AA or Aa', 1],
          ['Two children in a row are both affected', 0],
          ['A child has blood type A or blood type B', 1],
          ['A gamete carries both A and B', 0],
          ['A seed is round or wrinkled', 1],
        ],
      ),
      checks: [
        check(
          2,
          'What fraction of gametes from an Aa parent carry the A allele?',
          ['1/2', '1/4', '3/4', 'All of them'],
          'Segregation sends one allele of the pair into each gamete with equal probability.',
        ),
      ],
    },
    'her-u2-l1': {
      labs: ['her-xlinked'],
      sort: sort(
        'Which pattern does this pedigree clue support?',
        ['Autosomal dominant', 'Autosomal recessive', 'X-linked recessive'],
        [
          ['Two affected parents have an unaffected child', 0],
          ['Two unaffected parents have an affected daughter', 1],
          ['Nearly all affected people are male, with no father-to-son passing', 2],
          ['The trait appears in every generation in both sexes', 0],
          ['A carrier mother has affected sons but unaffected daughters', 2],
          ['The trait skips a generation and affects both sexes equally', 1],
        ],
      ),
      checks: [
        check(
          3,
          'An affected father and a non-carrier mother: what fraction of daughters carry an X-linked recessive allele?',
          ['All of them', 'Half of them', 'None of them'],
          'Every daughter receives her father’s only X chromosome, which carries the allele.',
        ),
      ],
    },
    'her-u3-l1': {
      labs: ['her-cross'],
      sort: sort(
        'Which gene interaction explains the result?',
        ['Incomplete dominance', 'Codominance', 'Linkage', 'Recessive epistasis'],
        [
          ['Red × white snapdragons give pink offspring', 0],
          ['An AB blood type shows both A and B antigens', 1],
          ['A test cross gives mostly parental combinations', 2],
          ['A dihybrid cross gives 9 : 3 : 4', 3],
          ['Roan cattle show both red and white hairs', 1],
          ['Recombination frequency of 12% between two genes', 2],
        ],
      ),
      checks: [
        check(
          4,
          'Labradors that are ee are yellow whatever their B genotype. What is this?',
          ['Recessive epistasis', 'Codominance', 'Linkage'],
          'One gene (E) masks the effect of another (B) when homozygous recessive.',
        ),
      ],
    },
    'her-u4-l1': {
      labs: ['her-meiosis'],
      sort: sort(
        'Mitosis, meiosis, or both?',
        ['Mitosis only', 'Meiosis only', 'Both'],
        [
          ['Homologous chromosomes pair and cross over', 1],
          ['Produces two identical diploid cells', 0],
          ['Sister chromatids separate in an anaphase', 2],
          ['Produces four haploid cells', 1],
          ['Used for growth and tissue repair', 0],
          ['Preceded by DNA replication in S phase', 2],
        ],
      ),
      checks: [
        check(
          5,
          'A karyotype reads 45,X. Which condition is this?',
          ['Turner syndrome', 'Klinefelter syndrome', 'Down syndrome'],
          'One X chromosome and no second sex chromosome gives 45,X, Turner syndrome.',
        ),
      ],
    },
    'her-u5-l1': {
      phet: [
        phet(
          'gene-expression-essentials',
          'Gene Expression Essentials',
          'Mutation effects only make sense when you follow DNA through mRNA to protein. This simulation lets you build that chain and see where a change in the template would land.',
          'Express a gene and identify the promoter, transcribed region, and the resulting protein.',
          'Predict what would happen to the protein if a stop codon appeared early in the mRNA.',
        ),
      ],
      sort: sort(
        'Classify each mutation',
        ['Silent', 'Missense', 'Nonsense', 'Frameshift'],
        [
          ['GAA (Glu) changes to GAG (Glu)', 0],
          ['GAA (Glu) changes to GUA (Val)', 1],
          ['UGG (Trp) changes to UAG (stop)', 2],
          ['One base is deleted near the start of a gene', 3],
          ['Two bases are inserted inside the coding region', 3],
          ['CGA (Arg) changes to UGA (stop)', 2],
        ],
      ),
      checks: [
        check(
          3,
          'Which enzyme seals gaps between Okazaki fragments?',
          ['DNA ligase', 'Helicase', 'Primase'],
          'Ligase forms the final phosphodiester bond joining adjacent DNA fragments.',
        ),
      ],
    },
    'her-u6-l1': {
      phet: [
        phet(
          'gene-expression-essentials',
          'Gene Expression Essentials',
          'Transcription factors, RNA polymerase, and ribosomes are easier to understand when you can control them. This simulation shows how regulatory proteins change how much protein a cell makes.',
          'Add positive and negative transcription factors and record how the mRNA production rate changes.',
          'Connect the negative factor to the lac repressor: what must happen for transcription to resume?',
        ),
      ],
      sort: sort(
        'Lac or trp operon behaviour?',
        ['Lac operon', 'Trp operon'],
        [
          ['Normally off; turned on by an inducer', 0],
          ['Normally on; turned off when its product builds up', 1],
          ['Allolactose releases the repressor', 0],
          ['The amino acid binds and activates the repressor', 1],
          ['Expression is highest when glucose is low', 0],
          ['Encodes enzymes that make an amino acid', 1],
        ],
      ),
      checks: [
        check(
          2,
          'Which processing step joins exons together?',
          ['Splicing', 'Capping', 'Polyadenylation'],
          'Splicing removes introns and ligates the exons into a continuous coding sequence.',
        ),
      ],
    },
    'her-u7-l1': {
      labs: ['her-hardy'],
      phet: [
        phet(
          'natural-selection',
          'Natural Selection',
          'Selection changes allele frequencies when one phenotype survives better. Watching a rabbit population shows a Hardy–Weinberg assumption being broken in real time.',
          'Add a brown-fur mutation and a selection factor, then track how the allele frequency changes over generations.',
          'Explain which Hardy–Weinberg assumption the simulation violates and how the population shows it.',
        ),
      ],
      sort: sort(
        'Which evolutionary force is acting?',
        ['Genetic drift', 'Gene flow', 'Natural selection'],
        [
          ['A storm leaves a few random survivors', 0],
          ['Migrants bring new alleles to an island', 1],
          ['Darker moths survive better on sooty trees', 2],
          ['A few settlers found a new colony', 0],
          ['Pollen blows between two meadows', 1],
          ['Antibiotic-resistant bacteria leave more offspring', 2],
        ],
      ),
      checks: [
        check(
          1,
          'If q = 0.4, what is the frequency of heterozygotes?',
          ['0.48', '0.16', '0.36', '0.24'],
          'With q = 0.4, p = 0.6, so heterozygotes are 2pq = 2 × 0.6 × 0.4 = 0.48.',
        ),
      ],
    },
    'her-u8-l1': {
      labs: ['her-pcr'],
      sort: sort(
        'PCR, Sanger sequencing, or both?',
        ['PCR only', 'Sanger only', 'Both'],
        [
          ['Uses two primers', 0],
          ['Uses chain-terminating ddNTPs', 1],
          ['Needs a DNA polymerase', 2],
          ['Produces exponential copies of a region', 0],
          ['Reads the order of bases', 1],
          ['Uses a DNA template and dNTPs', 2],
        ],
      ),
      checks: [
        check(
          2,
          'At about what temperature does Taq polymerase extend primers?',
          ['72 °C', '95 °C', '37 °C', '55 °C'],
          'Extension runs near 72 °C, the optimum for heat-stable Taq polymerase.',
        ),
      ],
    },
  },
};
