import { defineDeck, type Deck } from './presentation-types.ts';
import { geneDecksApplied } from './presentations-designer-genes-2.ts';

// Designer Genes (Division C) presentations. Each deck follows its lesson in lessons-genes.ts
// section by section (`section` is the lesson section index), and its activities rehearse the
// lesson's crosses, calculations, worked example, and model assumptions.

const mendel = defineDeck('gene-u1-l1', [
  {
    kind: 'title',
    title: 'Mendelian inheritance and probability',
    subtitle: 'From pea counts to gametes, Punnett squares, and the rules of probability.',
    objectives: [
      'Separate **genotype** from **phenotype**.',
      'Construct **gametes** before a Punnett square.',
      'Use the **product** and **sum** rules appropriately.',
    ],
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: two carriers already have three unaffected children. What is the chance the fourth is affected?',
    options: ['Nearly 100%', '1/4', '0', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Mendel’s experimental logic',
    bullets: [
      'Mendel used ==controlled crosses and counts== across generations to test inheritance models.',
      'An **allele** is an alternative sequence form at a **locus**.',
      'Diploids carry ==two copies== of each autosomal locus.',
      '**Genotype** is the allele combination; **phenotype** is the observed trait, shaped by genotype and environment.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['Allele', 'Alternative form at a locus'],
      ['Locus', 'Position of a gene on a chromosome'],
      ['Genotype', 'The allele combination an individual carries'],
      ['Phenotype', 'The observed trait'],
    ],
    explanation:
      'Alleles are versions at a locus; the genotype lists which alleles are present, and the phenotype is what you observe.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Segregation and the Punnett square',
    image: 'gene-punnett',
    caption:
      'A heterozygous pea cross: each parent’s **B** and **b** alleles ==segregate into gametes==, and fertilization combines one from each.',
    bullets: [
      'An **Aa** parent makes **A** and **a** gametes in equal expected frequency.',
      'The square lists ==possible combinations and their probabilities==.',
      'It is not a schedule: a family of four need not contain each outcome once.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order the steps for solving a cross.',
    items: [
      'Write each parent’s genotype',
      'List each parent’s gametes',
      'Combine gametes in a Punnett square',
      'Apply the dominance rule to get phenotypes',
    ],
    explanation:
      'Gametes come from segregation; combining them gives genotypes, and only then does a dominance rule turn genotypes into phenotypes.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Dominance',
    bullets: [
      '**Complete dominance**: the heterozygote looks like one homozygote.',
      '==Dominant does not mean common, strong, or beneficial==.',
      'Aa × Aa genotypes: **1/4 AA, 1/2 Aa, 1/4 aa**.',
      'The **3:1** phenotype ratio needs complete dominance and other model assumptions.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'In an Aa × Aa cross with complete dominance, what fraction of dominant-phenotype offspring are heterozygous? Give a decimal.',
    answer: 0.667,
    tolerance: 0.01,
    explanation:
      'Dominant phenotypes are AA (1/4) and Aa (1/2), so Aa makes up (1/2)/(3/4) = 2/3 ≈ 0.667 of them.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Probability rules',
    bullets: [
      '**Product rule**: ==multiply== probabilities of independent events.',
      '**Sum rule**: ==add== probabilities of mutually exclusive alternatives.',
      'AaBb × AaBb: P(aabb) = 1/4 × 1/4 = **1/16**.',
      '“Or” does not justify adding when events ==overlap==; enumerate to avoid double counting.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt: 'AaBbCc × AaBbCc with independent loci: P(aabbcc) = 1/x. What is x?',
    answer: 64,
    tolerance: 0,
    explanation: 'Each locus gives aa with probability 1/4, so 1/4 × 1/4 × 1/4 = 1/64.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: one child, then two',
    problem: 'Find P(aa) for Aa × Aa, then the probability of two independent aa offspring.',
    steps: [
      'Each parent passes **a** with probability 1/2.',
      'One aa child: 1/2 × 1/2 = **1/4**.',
      'Two independent aa children: (1/4)² = **1/16**.',
    ],
    conclusion: '==Expected ratios do not force exact family counts.==',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Sampling variation',
    bullets: [
      'Expected ratios describe ==long-run behavior== under assumptions.',
      'Small samples can drift far from 3:1 by chance alone.',
      'A mismatch may reflect sample size, **viability**, or scoring, not a new mechanism.',
      'Each child is independent: avoid the **gambler’s fallacy**.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'A cross expected to give 3:1 yields 7 dominant and 5 recessive offspring. What is the best conclusion?',
    options: [
      'Small samples vary; this alone does not reject the model',
      'The trait must be sex-linked',
      'Dominance has failed',
      'The parents were misidentified for certain',
    ],
    answer: 0,
    explanation:
      'With only 12 offspring, chance deviation is large. Test larger samples before proposing a different mechanism.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Using the cross lab',
    bullets: [
      'Pick both parental genotypes and inspect ==labeled gametes and offspring==.',
      'Toggle **complete** versus **incomplete** dominance: phenotypes change, ==genotype probabilities do not==.',
      'Explain allele transmission before quoting a ratio.',
      'One autosomal locus only: no sex linkage, penetrance, linkage, or selection.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Switching the lab from complete to incomplete dominance for Aa × Aa changes what?',
    options: [
      'The phenotype ratio, from 3:1 to 1:2:1',
      'The genotype probabilities',
      'The gametes each parent makes',
      'Nothing at all',
    ],
    answer: 0,
    explanation:
      'Segregation and genotypes stay 1:2:1; only the rule mapping genotype to phenotype changes, so heterozygotes become distinguishable.',
  },
  {
    kind: 'fill',
    prompt: 'Complete the rules.',
    text: 'Alleles separate into gametes by {0}. Multiply probabilities of {1} events, and add probabilities of mutually {2} outcomes.',
    blanks: ['segregation', 'independent', 'exclusive'],
    distractors: ['dominance', 'overlapping', 'dependent'],
    explanation:
      'Segregation sends one allele to each gamete; the product rule covers independent events and the sum rule covers mutually exclusive ones.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Allele', back: 'Alternative form at a genetic locus.' },
      { front: 'Genotype', back: 'Allele combination.' },
      { front: 'Phenotype', back: 'Observed trait.' },
      { front: 'Segregation', back: 'Separation of alleles into gametes.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '==Write gametes first==, then fill the Punnett square.',
      '**Dominance** maps genotype to phenotype; it says nothing about frequency.',
      '**Multiply** independent probabilities; **add** exclusive ones.',
      'Small samples stray from expected ratios by chance.',
    ],
  },
]);

const pedigrees = defineDeck('gene-u2-l1', [
  {
    kind: 'title',
    title: 'Pedigrees and extensions of Mendelian patterns',
    subtitle: 'Reading family trees under explicit models, and traits beyond simple dominance.',
    objectives: [
      'Compare **autosomal** and **sex-linked** models.',
      'Recognize **incomplete dominance** and **codominance**.',
      'Explain **penetrance** and pedigree uncertainty.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: an affected father has an affected son. Can the trait be X-linked recessive?',
    options: ['Yes', 'No', 'Only if the mother carries it', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Pedigree evidence',
    bullets: [
      'A **pedigree** records relationships and phenotypes with a ==defined symbol key==.',
      'Infer genotypes ==under an explicit model==, never from appearance alone.',
      'An unaffected person may be a **carrier**.',
      'State whether outsiders are assumed not to carry a rare allele; that assumption changes probabilities.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Autosomal recessive inheritance',
    image: 'gene-autosomal-recessive',
    caption:
      'Two unaffected **carrier** parents: each child has a ==1 in 4 chance== of being affected and a 1 in 2 chance of being a carrier.',
    bullets: [
      '**Recessive** traits can appear in children of unaffected parents.',
      '**Dominant** traits with high penetrance tend to appear in every generation.',
      'These are clues, not proof; small families can fit several models.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: two carriers',
    problem:
      'Two unaffected carriers of an autosomal recessive trait have a child. What is the modeled affected probability?',
    steps: [
      'Assign **Aa** to both parents.',
      'Aa × Aa gives **1/4 aa**.',
      'Under ==complete penetrance==, the affected probability is 1/4.',
    ],
    conclusion: 'Penetrance or other assumptions can change the phenotype probability.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'An unaffected child of two carrier parents: what is the probability this child is a carrier? Give a decimal.',
    answer: 0.667,
    tolerance: 0.01,
    explanation:
      'Being unaffected rules out aa, leaving AA (1/4) and Aa (1/2). The conditional carrier probability is (1/2)/(3/4) = 2/3.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'X-linked recessive inheritance',
    image: 'gene-x-linked',
    caption:
      'A carrier mother passes the X-linked allele to ==half her sons (affected)== and half her daughters (carriers).',
    bullets: [
      'XY individuals have **one** X-linked copy; XX individuals have two.',
      'Fathers pass X to daughters and Y to sons, so there is ==no father-to-son X transmission==.',
      'Higher prevalence in one sex alone does not prove X linkage.',
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt:
      'Which observations argue against a simple X-linked recessive model? Select all that apply.',
    options: [
      'An affected father has an affected son through a non-carrier mother',
      'An affected daughter has an unaffected father',
      'Affected males have unaffected carrier mothers',
      'The trait skips a generation through females',
    ],
    answers: [0, 1],
    explanation:
      'Fathers do not pass an X to sons, and an affected daughter needs an affected father. Carrier mothers and skipping through females fit the model.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Multiple alleles and codominance: ABO',
    image: 'gene-abo',
    caption:
      'ABO groups: type AB red cells carry ==both A and B antigens== because the **A** and **B** alleles are codominant; type O cells carry neither.',
    bullets: [
      '**Incomplete dominance**: the heterozygote is ==intermediate==, like pink snapdragons.',
      '**Codominance**: both alleles contribute ==distinguishable== products.',
      'A population can hold many alleles; one diploid carries at most two.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Classify each heterozygote phenotype.',
    bins: ['Complete dominance', 'Incomplete dominance', 'Codominance'],
    items: [
      ['Red × white snapdragons give pink flowers', 1],
      ['Type AB blood shows both A and B antigens', 2],
      ['Tt pea plants are as tall as TT plants', 0],
      ['Roan cattle have both red and white hairs', 2],
      ['Wavy hair from curly × straight parents', 1],
    ],
    explanation:
      'Looking like one homozygote is complete dominance, an intermediate is incomplete dominance, and both products visible is codominance.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'A parent with genotype AO and a parent with genotype BO have a child. What is the chance of type O blood? Give a decimal.',
    answer: 0.25,
    tolerance: 0,
    explanation: 'Type O needs OO; each parent passes O with probability 1/2, so 1/2 × 1/2 = 1/4.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Penetrance and expressivity',
    bullets: [
      '**Penetrance**: the ==proportion== of a genotype that shows the phenotype.',
      '**Expressivity**: the ==degree or form== of the phenotype.',
      'Environment, age, other genes, and measurement affect what is observed.',
      'A pedigree exercise is a model, ==not a clinical risk assessment==.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A dominant allele has 80% penetrance. A child inherits it with probability 1/2. What is the chance the child shows the trait? Give a decimal.',
    answer: 0.4,
    tolerance: 0,
    explanation: 'Multiply inheritance by penetrance: 0.5 × 0.8 = 0.4.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Comparing models',
    bullets: [
      'List each model’s expected transmissions, compatible genotypes, and ==required exceptions==.',
      'Prefer the model supported by the ==whole pedigree==, not one dramatic relationship.',
      'The cross lab models one autosomal locus; sex linkage needs ==chromosome-specific gametes==.',
    ],
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each pedigree clue to the model it best suggests.',
    pairs: [
      ['Affected child of two unaffected parents', 'Autosomal recessive'],
      ['Affected person in every generation, both sexes', 'Autosomal dominant'],
      ['Mostly affected males linked through carrier females', 'X-linked recessive'],
    ],
    explanation:
      'These are clues, not proof; each model should still be checked against every relationship in the pedigree.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Penetrance', back: 'Frequency of a phenotype among a genotype group.' },
      { front: 'Expressivity', back: 'Degree or form of expression.' },
      { front: 'Codominance', back: 'Distinguishable contributions from both alleles.' },
      { front: 'Carrier', back: 'Carries a recessive allele without the recessive phenotype.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Infer pedigree genotypes ==under an explicit model==.',
      'X-linked: ==no father-to-son transmission==; carrier mothers affect half their sons.',
      '**Incomplete dominance** blends; **codominance** shows both.',
      '**Penetrance** and **expressivity** separate genotype from phenotype.',
    ],
  },
]);

const linkage = defineDeck('gene-u3-l1', [
  {
    kind: 'title',
    title: 'Linkage, mapping, epistasis, and complementation',
    subtitle: 'When genes travel together, interact, or turn out to be the same gene.',
    objectives: [
      'Estimate a **recombination fraction** and map distance.',
      'Separate **gene interaction** from **linkage**.',
      'Interpret **complementation** with its assumptions.',
    ],
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: two genes sit close together on one chromosome. Do they assort independently?',
    options: ['Yes', 'No, they tend to stay together', 'Only in males', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Linked loci and crossing over',
    image: 'gene-crossover',
    caption:
      'Thomas Hunt Morgan’s scheme of **crossing over**: paired chromosomes exchange segments, producing ==recombinant== combinations.',
    bullets: [
      'Genes on one chromosome are ==inherited together more often== than independent assortment predicts.',
      '**Phase** matters: AB/ab and Ab/aB carry the same alleles arranged differently.',
      'A **testcross** reveals parental and recombinant gamete classes.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A dihybrid AB/ab is testcrossed to ab/ab. Which offspring are recombinant?',
    options: ['Ab/ab and aB/ab', 'AB/ab and ab/ab', 'Only AB/ab', 'All four classes equally'],
    answer: 0,
    explanation:
      'The parent’s chromosomes are AB and ab, so new combinations Ab and aB come from crossing over.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Recombination maps',
    bullets: [
      '**Recombination fraction** = recombinants ÷ informative total.',
      'For short intervals, ==1% recombination ≈ 1 centimorgan (cM)==.',
      '**Double crossovers** can hide events, so long distances are underestimated.',
      'Observed recombination ==tops out near 0.5==; cM is not a fixed number of base pairs.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: a testcross map',
    problem:
      'A testcross gives 420, 430, 70, and 80 offspring in two parental and two recombinant classes.',
    steps: [
      'Total = **1000**.',
      'Recombinants = 70 + 80 = 150; fraction = **0.15**.',
      'Approximate distance = ==15 cM==, subject to missed crossovers.',
    ],
    conclusion: 'Map distance is a ==recombination measure==, not a base-pair count.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A testcross gives 180 parental and 20 recombinant offspring. What is the map distance in cM?',
    answer: 10,
    tolerance: 0,
    unit: 'cM',
    explanation: '20/200 = 0.10, or about 10 cM for a short interval.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Three-point reasoning',
    bullets: [
      'The ==largest classes are parental==; the ==smallest are double recombinants==.',
      'The gene that ==switches position== between them is the **middle gene**.',
      'Count each interval’s recombinants, ==including doubles in both intervals==.',
      '**Interference** compares observed doubles with the independence expectation.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'Parental classes are ABC and abc; the rarest classes are AbC and aBc. Which gene is in the middle?',
    options: ['B', 'A', 'C', 'Cannot be determined'],
    answer: 0,
    explanation:
      'A double crossover swaps only the middle gene relative to the parental arrangement; here B is the one that switched.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Epistasis',
    bullets: [
      '**Epistasis**: one locus’s effect ==depends on another locus==.',
      'Labrador coat: **E** allows pigment deposit; **B** sets black versus brown. ee dogs are yellow.',
      'That recessive epistasis gives ==9:3:4== instead of 9:3:3:1.',
      '**Linkage** concerns transmission; **epistasis** concerns phenotype.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'BbEe × BbEe Labradors (ee is yellow regardless of B). Out of 16, how many are expected yellow?',
    answer: 4,
    tolerance: 0,
    unit: 'of 16',
    explanation:
      'ee occurs in 1/4 of offspring = 4/16, all yellow, giving 9 black : 3 brown : 4 yellow.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Complementation',
    bullets: [
      'Combine two **recessive** mutants and ask whether the ==reference phenotype is restored==.',
      'Restored: defects are probably in ==different genes==.',
      'Not restored: probably the ==same gene==.',
      'Not crossing over, and not one allele becoming dominant.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Two white-flowered recessive mutants are crossed and the offspring are purple. What does this suggest?',
    options: [
      'The mutations are in different genes',
      'The mutations are in the same gene',
      'Crossing over occurred in every offspring',
      'White is dominant',
    ],
    answer: 0,
    explanation:
      'Each parent supplies a working copy of the gene the other lacks, so function is restored: complementation.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Model separation',
    bullets: [
      'A one-locus lab cannot produce recombination or epistasis with a dominance toggle.',
      'Draw ==two-locus haplotypes== and explicit phenotype rules.',
      'For a ratio mismatch, check ==linkage, interaction, viability, or sampling==.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Is each observation explained by linkage or by epistasis?',
    bins: ['Linkage', 'Epistasis'],
    items: [
      ['Parental allele combinations are overrepresented in a testcross', 0],
      ['A 9:3:4 phenotype ratio from a dihybrid cross', 1],
      ['Recombinants appear in 8% of offspring', 0],
      ['One gene’s genotype hides the other’s effect', 1],
    ],
    explanation:
      'Linkage changes how alleles are transmitted; epistasis changes how genotypes map to phenotypes.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Haplotype', back: 'Allele combination on one chromosome.' },
      { front: 'Recombination fraction', back: 'Fraction of informative recombinant outcomes.' },
      { front: 'Epistasis', back: 'Locus-dependent effect on phenotype.' },
      { front: 'Complementation', back: 'Restored function when mutant defects combine.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Recombinants ÷ total ≈ map distance for ==short intervals==.',
      'In three-point crosses, the ==gene that switches== in double recombinants is in the middle.',
      '**Linkage** is about transmission; **epistasis** is about phenotype.',
      'Complementation restores function when mutations are in different genes.',
    ],
  },
]);

const chromosomes = defineDeck('gene-u4-l1', [
  {
    kind: 'title',
    title: 'Chromosomes, mitosis, meiosis, and mutations',
    subtitle: 'Count centromeres, follow chromatids, and see where segregation goes wrong.',
    objectives: [
      'Count **chromosomes** and **chromatids** correctly.',
      'Locate **segregation** events in meiosis.',
      'Interpret **nondisjunction** and rearrangements.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: after DNA replication, does a cell have twice as many chromosomes?',
    options: [
      'Yes',
      'No, the same number with two chromatids each',
      'Only in meiosis',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Counting definitions',
    bullets: [
      'A **replicated chromosome** has two **sister chromatids** joined at a centromere.',
      '==Count chromosomes by centromeres==; replication doubles DNA but not chromosome number.',
      '**Homologs** carry the same loci but can carry different alleles.',
      'Keep **ploidy**, chromosome number, chromatid count, and DNA amount separate.',
    ],
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: after S phase',
    problem:
      'A diploid cell has 2n = 6. Count chromosomes and chromatids immediately after S phase.',
    steps: [
      'There are still **six** centromere-defined chromosomes.',
      'Each has **two** sister chromatids.',
      'That makes ==12 chromatids==; DNA content has doubled.',
    ],
    conclusion: 'Replication changes ==DNA amount==, not chromosome count.',
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'A human cell (2n = 46) is in metaphase of mitosis. How many chromatids does it contain?',
    answer: 92,
    tolerance: 0,
    unit: 'chromatids',
    explanation: 'All 46 chromosomes are replicated, each with two sister chromatids: 92.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Mitosis',
    image: 'gene-mitosis',
    caption:
      'One homologous pair is replicated, then mitosis ==separates sister chromatids== so each of two diploid daughter cells gets both chromosomes.',
    bullets: [
      'Mitosis generally ==preserves chromosome complement==.',
      'DNA replication happens earlier, in **S phase**, not between stages.',
      'Cytokinesis divides the cytoplasm.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order the stages of mitosis.',
    items: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'],
    explanation:
      'Chromosomes condense in prophase, align in metaphase, separate in anaphase, and re-form nuclei in telophase.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Meiosis: two divisions',
    image: 'gene-meiosis',
    caption:
      'Meiosis I separates ==homologous chromosomes==; meiosis II separates ==sister chromatids==, yielding four haploid products.',
    bullets: [
      'Homologs pair and **cross over** between nonsister chromatids in **prophase I**.',
      '**Independent orientation** of homolog pairs shuffles unlinked loci.',
      'Meiosis II has ==no intervening DNA replication==.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Does each event happen in meiosis I or meiosis II?',
    bins: ['Meiosis I', 'Meiosis II'],
    items: [
      ['Homologous chromosomes separate', 0],
      ['Sister chromatids separate', 1],
      ['Crossing over between homologs', 0],
      ['Ploidy is reduced from diploid to haploid', 0],
      ['Haploid cells with replicated chromosomes divide', 1],
    ],
    explanation:
      'Meiosis I pairs, recombines, and separates homologs; meiosis II splits sister chromatids in already-haploid cells.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Meiosis II details',
    bullets: [
      'Products reflect both **recombination** and **assortment**.',
      'Four products are not always four functional gametes: in many female animals ==one egg and polar bodies== form.',
      'A haploid cell can still hold replicated chromosomes; ==haploid is not “one chromatid.”==',
    ],
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Segregation errors',
    image: 'gene-karyotype',
    caption:
      'A karyotype with ==three copies of chromosome 21== (trisomy 21), an aneuploidy caused by nondisjunction.',
    bullets: [
      '**Nondisjunction**: chromosomes or chromatids fail to separate properly.',
      '**Aneuploidy** changes one chromosome’s number; **polyploidy** changes whole sets.',
      'Structural changes: **deletions**, **duplications**, **inversions**, **translocations**.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Nondisjunction occurs in meiosis I for one chromosome pair. What gametes result for that chromosome?',
    options: [
      'Two with an extra copy (n+1) and two missing it (n−1)',
      'All four normal',
      'Two normal, one n+1, one n−1',
      'Four triploid gametes',
    ],
    answer: 0,
    explanation:
      'Both homologs go to one cell, so both of its meiosis II products are n+1 and the other cell’s two products are n−1. An MII error gives two normal, one n+1, and one n−1.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Reading diagrams',
    bullets: [
      'Count ==centromeres and DNA units== at the stated stage, then trace each.',
      'Do not count colored lines without a **legend**.',
      'The cross lab assumes successful meiosis; nondisjunction needs ==a different gamete model==.',
    ],
    image: 'gene-nondisjunction',
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each change to its category.',
    pairs: [
      ['Trisomy 21', 'Aneuploidy'],
      ['A 4n wheat plant', 'Polyploidy'],
      ['A segment flipped end to end', 'Inversion'],
      ['A segment moved to a nonhomologous chromosome', 'Translocation'],
    ],
    explanation:
      'Changing one chromosome’s number is aneuploidy, whole sets is polyploidy, and inversions and translocations rearrange structure.',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Meiosis II most closely resembles which process?',
    options: [
      'Mitosis, because sister chromatids separate',
      'Meiosis I, because homologs separate',
      'DNA replication',
      'Fertilization',
    ],
    answer: 0,
    explanation: 'In meiosis II sister chromatids split as in mitosis, but in haploid cells.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Homolog', back: 'Chromosome with corresponding loci in a pair.' },
      { front: 'Chromatid', back: 'One replicated chromosome copy.' },
      { front: 'Ploidy', back: 'Number of chromosome sets.' },
      { front: 'Nondisjunction', back: 'Failure of appropriate segregation.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '==Count chromosomes by centromeres==; chromatids double after S phase.',
      'Mitosis preserves the chromosome set; meiosis I separates **homologs**, meiosis II **sisters**.',
      'Nondisjunction in MI or MII gives different gamete patterns.',
      'Aneuploidy, polyploidy, and rearrangements are distinct changes.',
    ],
  },
]);

const centralDogma = defineDeck('gene-u5-l1', [
  {
    kind: 'title',
    title: 'DNA replication, transcription, and translation',
    subtitle: 'Strand direction, base pairing, and reading frames from DNA to protein.',
    objectives: [
      'Apply **complementary base pairing** and **5′→3′ directionality**.',
      'Explain **semiconservative** replication.',
      'Interpret coding changes in a stated **reading frame**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which direction do DNA polymerases build a new strand?',
    options: ['5′ to 3′', '3′ to 5′', 'Either', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'DNA organization',
    bullets: [
      'DNA has two ==antiparallel== strands joined by **complementary** base pairs: **A–T** and **G–C**.',
      'Sequence order carries information; sugar–phosphate backbones give ==direction==.',
      'Complementary strands are ==not identical== when written in the same direction.',
      'Label **5′** and **3′** ends before writing a reverse complement.',
    ],
  },
  {
    kind: 'fill',
    section: 0,
    prompt: 'Write the reverse complement of 5′-ATGC-3′.',
    text: 'The complementary strand, written 5′ to 3′, is 5′-{0}-3′.',
    blanks: ['GCAT'],
    distractors: ['TACG', 'CGTA', 'ATGC'],
    explanation: 'Complement of ATGC is TACG read 3′→5′; reversed to read 5′→3′ it is GCAT.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Replication at the fork',
    image: 'gene-replication',
    caption:
      'At a replication fork, the **leading strand** is made continuously and the **lagging strand** in ==Okazaki fragments==.',
    bullets: [
      '**Semiconservative**: each daughter molecule keeps ==one parental strand==.',
      '**Helicase** unwinds, **primase** lays RNA primers, **polymerase** extends, **ligase** joins.',
      'Which strand leads depends on ==fork direction==, not on being the top strand.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each replication protein to its job.',
    pairs: [
      ['Helicase', 'Unwinds the double helix'],
      ['Primase', 'Lays down a short RNA primer'],
      ['DNA polymerase', 'Extends new DNA 5′ to 3′'],
      ['Ligase', 'Joins Okazaki fragments'],
    ],
    explanation:
      'Unwinding, priming, extension, and joining are distinct functions performed by different proteins.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Transcription',
    bullets: [
      '**RNA polymerase** reads the ==template strand== to make complementary RNA.',
      '**Promoters** and regulatory context control initiation.',
      'The **coding strand** matches the RNA, with ==U in place of T==.',
      'Eukaryotic transcripts can be **spliced**, so mature mRNA can differ from the gene.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'The coding strand reads 5′-ATG GCA-3′. What is the mRNA?',
    options: ['5′-AUG GCA-3′', '5′-UAC CGU-3′', '5′-ATG GCA-3′', '3′-AUG GCA-5′'],
    answer: 0,
    explanation:
      'mRNA has the same sequence and direction as the coding strand, with U replacing T.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Translation',
    image: 'gene-translation',
    caption:
      'A **ribosome** reads mRNA codons while **tRNAs** carrying matching anticodons deliver amino acids to the growing chain.',
    bullets: [
      'The ==start codon sets the frame==; stop codons end translation.',
      'Indels not divisible by three ==shift the frame== downstream.',
      'The code is **redundant** (several codons per amino acid), ==not ambiguous==.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: translate a short gene',
    problem: 'Coding DNA 5′-ATG TTT TGA-3′. What does it encode?',
    steps: [
      'mRNA: **5′-AUG UUU UGA-3′**.',
      'Read **AUG** (Met), then **UUU** (Phe), in the stated frame.',
      '**UGA** is a stop codon.',
    ],
    conclusion: 'Met–Phe, then stop. ==Orientation and frame must be defined.==',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Mutation consequences',
    bullets: [
      '**Synonymous**: same amino acid. **Missense**: different amino acid. **Nonsense**: premature stop.',
      'The same change can matter differently in a ==regulatory or noncoding== region.',
      'Insertions of ==multiples of three== keep the frame but add residues.',
      'State the reference sequence and coordinates first.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Classify each change in a coding region.',
    bins: ['Synonymous', 'Missense', 'Nonsense', 'Frameshift'],
    items: [
      ['UUU (Phe) → UUC (Phe)', 0],
      ['UUU (Phe) → UCU (Ser)', 1],
      ['UAC (Tyr) → UAA (stop)', 2],
      ['One base deleted after the start codon', 3],
      ['GAA (Glu) → GUA (Val)', 1],
    ],
    explanation:
      'Same amino acid is synonymous, a different one is missense, a new stop is nonsense, and a single-base deletion shifts the frame.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Integrated reasoning',
    bullets: [
      'Step through ==template orientation, RNA, frame, amino acids, then effect==.',
      'Check each step before inferring a phenotype.',
      'The inheritance lab shows transmission, not biochemistry.',
      'Same one-locus genotype can still differ through ==environment or other genes==.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'An insertion of three bases occurs inside a coding region. What is the most likely result?',
    options: [
      'One added amino acid, with the frame preserved',
      'A guaranteed frameshift',
      'No change in the protein at all',
      'Loss of the start codon',
    ],
    answer: 0,
    explanation:
      'Three bases add one codon, so downstream codons keep their frame; the effect depends on where the residue lands.',
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'A single base change turns a codon into a stop codon. What type of mutation is this?',
    options: ['Nonsense', 'Silent', 'Missense', 'Frameshift'],
    answer: 0,
    explanation: 'A premature stop codon is a nonsense mutation and usually truncates the protein.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Semiconservative', back: 'Each daughter DNA molecule keeps one old strand.' },
      { front: 'Primer', back: 'Starting nucleic-acid segment for extension.' },
      { front: 'Reading frame', back: 'Grouping of bases into successive codons.' },
      { front: 'Missense', back: 'Coding substitution that changes an amino acid.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Strands are ==antiparallel==; polymerases build **5′→3′**.',
      'Replication is **semiconservative**, with leading and lagging strands.',
      'mRNA matches the **coding strand**, with U for T.',
      'The ==frame decides meaning==: synonymous, missense, nonsense, or frameshift.',
    ],
  },
]);

export const decks: Deck[] = [
  mendel,
  pedigrees,
  linkage,
  chromosomes,
  centralDogma,
  ...geneDecksApplied,
];
