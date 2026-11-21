import { defineDeck, type Deck } from './presentation-types.ts';

// Designer Genes decks for regulation, population genetics, phylogenies, biotechnology, and DNA
// profiles (lessons gene-u6 to gene-u10).

const regulation = defineDeck('gene-u6-l1', [
  {
    kind: 'title',
    title: 'Regulation, mutation, and DNA repair',
    subtitle:
      'Genes can stay the same while their expression changes, and damage is not yet mutation.',
    objectives: [
      'Compare **bacterial** and **eukaryotic** regulation.',
      'Distinguish **DNA damage** from **mutation**.',
      'Explain regulation at **multiple levels**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: a liver cell and a skin cell from one person. Do they have the same genes?',
    options: [
      'Yes, but they express them differently',
      'No, different genes',
      'Only some are shared',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Regulatory purpose',
    bullets: [
      'Cells adjust expression to ==developmental and environmental conditions==.',
      'Control points: **transcription**, **RNA processing**, **translation**, and **protein stability**.',
      'A gene can remain present while its ==expression changes==.',
      'Expression level is not protein activity: folding, modification, and partners intervene.',
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt:
      'Order the levels where a eukaryotic gene’s output can be regulated, from DNA to protein.',
    items: [
      'Chromatin accessibility',
      'Transcription',
      'RNA processing',
      'Translation',
      'Protein stability',
    ],
    explanation:
      'Each step from opening chromatin to degrading the protein is a separate regulatory point.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'The lac operon',
    image: 'gene-lac-operon',
    caption:
      'The **lac operon**: one promoter drives three coding regions; the **repressor** blocks the **operator** unless lactose (as allolactose) binds it.',
    bullets: [
      'An **operon** places several coding regions under ==shared control==.',
      'Low glucose raises cAMP, so **CAP** ==activates== transcription.',
      'Other operons use different logic; ==don’t generalize one switch==.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'For the lac operon, is transcription high or low under each condition?',
    bins: ['High', 'Low'],
    items: [
      ['Lactose present, glucose absent', 0],
      ['Lactose absent, glucose absent', 1],
      ['Lactose absent, glucose present', 1],
      ['Lactose present, glucose present', 1],
    ],
    explanation:
      'Without lactose the repressor stays bound; with glucose CAP is inactive. Only lactose without glucose gives strong transcription.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Eukaryotic regulation',
    bullets: [
      '**Chromatin accessibility**, **transcription factors**, and **enhancers** control initiation.',
      'Enhancers act through ==3-D DNA looping==, not only nearby sequence.',
      '**Epigenetic** marks correlate with regulation but ==do not alone prove mechanism==.',
      'Different cell types use the ==same genome differently==.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'An enhancer 50,000 bases away activates a gene. How is this possible?',
    options: [
      'DNA looping brings the enhancer and its bound factors to the promoter',
      'The enhancer is transcribed into the gene',
      'Enhancers mutate the promoter',
      'It is not possible; enhancers must be adjacent',
    ],
    answer: 0,
    explanation:
      'Enhancers act through three-dimensional contacts, so linear distance does not prevent regulation.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Damage versus mutation',
    bullets: [
      '**Damage** is a chemical or structural ==lesion== in DNA.',
      'A **mutation** is a ==sequence change== fixed through replication or repair.',
      'Not every lesion becomes a mutation.',
      '**Somatic** changes stay in one body; **germline** changes can be inherited.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Is each item DNA damage or a mutation?',
    bins: ['Damage (lesion)', 'Mutation (sequence change)'],
    items: [
      ['A thymine dimer from UV light', 0],
      ['A C→T change copied into both strands', 1],
      ['An oxidized guanine base', 0],
      ['A two-base deletion after replication', 1],
    ],
    explanation:
      'Lesions are altered chemistry awaiting repair; once replication copies a changed base pair, the sequence change is a mutation.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Repair pathways',
    columns: ['Pathway', 'Fixes', 'Note'],
    rows: [
      [
        '**Proofreading**',
        'Misincorporated bases during synthesis',
        'Polymerase 3′→5′ exonuclease',
      ],
      ['**Mismatch repair**', 'Mismatches ==left after replication==', 'Targets the new strand'],
      ['**Base excision**', 'Single damaged bases', 'Glycosylase removes the base'],
      [
        '**Nucleotide excision**',
        '==Bulky lesions== such as thymine dimers',
        'Cuts out an oligonucleotide',
      ],
      [
        '**Double-strand break repair**',
        'Broken chromosomes',
        '**HR** is accurate; **end joining** can change sequence',
      ],
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each problem to the repair pathway that addresses it.',
    pairs: [
      ['UV thymine dimer', 'Nucleotide excision repair'],
      ['G–T mismatch after replication', 'Mismatch repair'],
      ['Deaminated cytosine (uracil in DNA)', 'Base excision repair'],
      ['Double-strand break with a sister template', 'Homologous recombination'],
    ],
    explanation:
      'Bulky lesions use NER, replication mismatches use MMR, single damaged bases use BER, and breaks with a template use HR.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: protein falls, mRNA steady',
    problem: 'A protein level falls while its mRNA is unchanged. Propose two mechanisms.',
    steps: [
      '==Transcription alone== cannot explain it.',
      '**Translation** could decrease.',
      '**Protein degradation** could increase; test each with a suitable assay.',
    ],
    conclusion: 'Measure the ==level relevant to the mechanism==.',
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which belong in a well-designed regulation experiment? Select all that apply.',
    options: [
      'Measuring RNA and protein separately',
      'Matched conditions with replicate samples',
      'Suitable controls for the reporter assay',
      'Assuming a reporter signal always means more transcription',
    ],
    answers: [0, 1, 2],
    explanation:
      'A reporter can reflect transcription, stability, or assay behavior, so controls and separate RNA and protein measurements are needed.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Operon', back: 'Co-regulated bacterial transcription unit.' },
      { front: 'Enhancer', back: 'Regulatory DNA that influences transcription.' },
      { front: 'Lesion', back: 'Chemical or structural DNA damage.' },
      { front: 'Mismatch repair', back: 'Repair of replication-associated mismatches.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Expression is regulated from ==chromatin to protein stability==.',
      'The **lac operon** is on only with lactose present and glucose absent.',
      '==Damage is a lesion; mutation is a fixed sequence change.==',
      'Each repair pathway fixes a different kind of problem.',
    ],
  },
]);

const population = defineDeck('gene-u7-l1', [
  {
    kind: 'title',
    title: 'Population genetics, additive traits, and heritability',
    subtitle:
      'Allele bookkeeping, the Hardy–Weinberg baseline, and what heritability does not mean.',
    objectives: [
      'Calculate **allele** and **genotype frequencies**.',
      'State **Hardy–Weinberg** assumptions.',
      'Interpret **heritability** at the population level.',
    ],
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: height is about 80% heritable. Does that mean 80% of your height comes from genes?',
    options: ['Yes', 'No', 'Only for adults', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Frequency bookkeeping',
    bullets: [
      'For two alleles, ==p + q = 1==.',
      'Count ==two copies== per homozygote and one of each per heterozygote, then divide by 2N.',
      '**Genotype frequency** and **allele frequency** are different summaries.',
      'A dominant phenotype frequency ==is not== the dominant allele frequency.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'A sample has 36 AA, 48 Aa, and 16 aa individuals. What is p, the frequency of A?',
    answer: 0.6,
    tolerance: 0.001,
    explanation: 'A copies = 2(36) + 48 = 120 out of 200 total alleles, so p = 0.6.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'The Hardy–Weinberg model',
    image: 'gene-hardy-weinberg',
    caption:
      'Genotype frequencies across allele frequency: **AA = p²**, **Aa = 2pq**, **aa = q²**, with ==heterozygotes peaking at p = 0.5==.',
    bullets: [
      'Random mating gives **p²**, **2pq**, **q²** in one generation.',
      'Stable frequencies also assume ==no selection, mutation, migration, or drift==.',
      'A departure has several possible causes and does not name one force.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which are Hardy–Weinberg assumptions? Select all that apply.',
    options: [
      'Random mating',
      'Very large population (no drift)',
      'No migration or mutation',
      'Strong selection for the dominant allele',
    ],
    answers: [0, 1, 2],
    explanation:
      'The baseline assumes random mating, a large population, and no migration, mutation, or selection.',
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: from the recessive phenotype',
    problem: 'Under the model, the recessive phenotype frequency is 0.09. Find q, p, and 2pq.',
    steps: [
      '**q** = √0.09 = 0.30.',
      '**p** = 1 − 0.30 = 0.70.',
      '**2pq** = 2 × 0.70 × 0.30 = ==0.42==.',
    ],
    conclusion:
      'This works only for a ==fully penetrant recessive== phenotype under equilibrium assumptions.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'A recessive trait appears in 1 of 100 people. Under Hardy–Weinberg, what fraction are carriers? Give a decimal.',
    answer: 0.18,
    tolerance: 0.001,
    explanation: 'q² = 0.01, so q = 0.1, p = 0.9, and 2pq = 2 × 0.9 × 0.1 = 0.18.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Additive effects',
    bullets: [
      '**Quantitative traits** reflect many loci, environment, and their interactions.',
      'An **additive model** sums allele contributions to predict ==averages==.',
      'Real traits add **dominance**, **epistasis**, linkage, and environmental covariance.',
      'An effect estimated in one population is ==not a universal constant==.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'In an additive model, baseline height is 150 cm and each “+” allele at three loci adds 5 cm. What is an individual with 4 “+” alleles?',
    answer: 170,
    tolerance: 0,
    unit: 'cm',
    explanation:
      '150 + 4 × 5 = 170 cm under the stated model, ignoring environment and interactions.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Heritability',
    bullets: [
      '**Heritability** is the ==fraction of trait variation== associated with genetic differences in one population and environment.',
      '**Broad-sense** (H²) includes all genetic variance; **narrow-sense** (h²) only additive variance.',
      'It is ==not the share of one person’s trait== caused by genes.',
      'High heritability ==does not mean unchangeable==: environments shift means and variance.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'A trait has high heritability in one population. What follows?',
    options: [
      'Most of its variation there is associated with genetic differences',
      'The environment cannot change the trait',
      'Each person’s trait value is mostly genetic',
      'The trait will have the same heritability everywhere',
    ],
    answer: 0,
    explanation:
      'Heritability is a population- and environment-specific variance ratio; it says nothing fixed about individuals or other settings.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Reading population bars',
    bullets: [
      'Move **p** and watch p², 2pq, and q² respond.',
      '==Heterozygosity peaks at p = 0.5== for two alleles.',
      'Changing mating structure at fixed frequency is different from changing allele frequency.',
      'The bars are ==expectations, not a time series==; no selection or drift is simulated.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt: 'What is the maximum possible heterozygote frequency (2pq) for two alleles?',
    answer: 0.5,
    tolerance: 0,
    explanation: 'At p = q = 0.5, 2pq = 2 × 0.5 × 0.5 = 0.5, the highest value possible.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Allele frequency', back: 'Proportion of gene copies that are one allele.' },
      { front: 'Hardy–Weinberg', back: 'Baseline genotype-frequency model.' },
      { front: 'Additive effect', back: 'Contribution summed in a trait model.' },
      { front: 'Heritability', back: 'Population- and context-specific variance ratio.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Count alleles: two per homozygote, one each per heterozygote, over 2N.',
      'Hardy–Weinberg gives **p²**, **2pq**, **q²** under ==explicit assumptions==.',
      'Take √ only of a ==recessive== phenotype frequency.',
      '**Heritability** describes population variance, not individuals.',
    ],
  },
]);

const phylogeny = defineDeck('gene-u8-l1', [
  {
    kind: 'title',
    title: 'Phylogenies and genome evolution',
    subtitle: 'Read ancestry from branching, and follow genes as they duplicate and diverge.',
    objectives: [
      'Read **ancestry** from branching order.',
      'Distinguish **homology** from **analogy**.',
      'Explain **duplication** and **divergence**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: are humans more closely related to mushrooms or to oak trees?',
    options: ['Mushrooms', 'Oak trees', 'Equally related', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Tree structure',
    image: 'gene-phylo-tree',
    caption:
      'A rooted tree of life’s three domains, **Bacteria**, **Archaea**, and **Eukaryota**: Archaea and Eukaryota share a ==more recent common ancestor==.',
    bullets: [
      'A tree is a **hypothesis**; **nodes** are common ancestors.',
      '==Rotating branches at a node changes nothing==.',
      'A **root** sets direction; branch lengths mean time only if the legend says so.',
    ],
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: rotate the branches',
    problem:
      'A and B share a node more recently than either shares with C. Rotate A and B on the drawing. What changes?',
    steps: [
      'The ==same nodes== remain connected.',
      'Only the ==tip display order== changes.',
      'A and B are still **sister groups**.',
    ],
    conclusion: '==Layout is not ancestry.==',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Groups and comparisons',
    bullets: [
      'A **clade** is an ancestor and ==all== its descendants.',
      '**Sister groups** share an immediate common ancestor.',
      'An **outgroup** helps orient character changes.',
      'Living tips are ==not ancestors== of other living tips; a ladder drawing does not imply progress.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'A group includes a common ancestor and only some of its descendants. Is it a clade?',
    options: [
      'No; a clade must include all descendants',
      'Yes, any group with a common ancestor is a clade',
      'Only if it has an outgroup',
      'Only if the tree is unrooted',
    ],
    answer: 0,
    explanation: 'Leaving out descendants makes the group paraphyletic, not a clade.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Homology and convergence',
    bullets: [
      '**Homologous** features share ==ancestry==; **analogous** features arise by **convergence**.',
      '==Similarity alone does not prove== close relationship.',
      'Sequence **alignment** assumes positional homology; poor alignment misleads trees.',
      'Different genes can tell different histories.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Is each similarity homologous or analogous?',
    bins: ['Homologous', 'Analogous (convergent)'],
    items: [
      ['Bat wing bones and human arm bones', 0],
      ['Bird wings and insect wings', 1],
      ['Streamlined bodies of sharks and dolphins', 1],
      ['Hemoglobin genes in mice and humans', 0],
    ],
    explanation:
      'Shared bone plans and orthologous genes reflect common ancestry; wings in birds and insects and torpedo shapes in sharks and dolphins evolved independently.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Duplication and divergence',
    bullets: [
      '**Gene duplication** creates copies that can keep, split, gain, or lose function.',
      '**Orthologs** diverge through ==speciation==; **paralogs** through ==duplication==.',
      'Genomes also change by rearrangement, **transposable elements**, copy number, and horizontal transfer.',
      '==A larger genome is not a more complex organism==.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each gene pair to its relationship.',
    pairs: [
      ['Human and mouse β-globin', 'Orthologs'],
      ['Human α-globin and β-globin', 'Paralogs'],
      ['A gene acquired from another bacterium', 'Horizontal transfer'],
    ],
    explanation:
      'Same gene in two species after speciation is orthologous; copies within one genome from duplication are paralogous.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Evolutionary forces',
    bullets: [
      '**Mutation** supplies variation.',
      '**Selection** changes reproduction associated with traits.',
      '**Drift** is ==random sampling== in finite populations; **gene flow** moves alleles between them.',
      'A frequency rise ==does not prove positive selection==.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each scenario to the force it illustrates.',
    pairs: [
      ['A storm kills a random half of a small island population', 'Genetic drift'],
      ['Migrants bring a new allele to a valley population', 'Gene flow'],
      ['Darker moths survive better on sooty trees', 'Natural selection'],
      ['A new allele arises from a replication error', 'Mutation'],
    ],
    explanation:
      'Random loss is drift, movement is gene flow, differential survival is selection, and new variation comes from mutation.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Evidence-based explanation',
    bullets: [
      'State the ==data, alignment, tree support, and uncertainty==.',
      'Compare alternative topologies instead of treating every branch as certain.',
      'Morphological and molecular evidence ==may not be independent==.',
      'An allele-frequency statement and an ancestry statement answer different questions.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'Two genes in the same species arose when one ancestral gene was duplicated. What are they?',
    options: ['Paralogs', 'Orthologs', 'Analogs', 'Alleles'],
    answer: 0,
    explanation: 'Duplication within a lineage makes paralogs; speciation separates orthologs.',
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'In a very small population, an allele’s frequency swings randomly between generations. Which force is most likely?',
    options: [
      'Genetic drift',
      'Natural selection for that allele',
      'Gene flow',
      'Mutation pressure',
    ],
    answer: 0,
    explanation:
      'Finite sampling of gametes causes random frequency change, strongest in small populations.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Clade', back: 'An ancestor plus all its descendants.' },
      { front: 'Ortholog', back: 'Gene relationship from speciation.' },
      { front: 'Paralog', back: 'Gene relationship from duplication.' },
      { front: 'Drift', back: 'Allele-frequency change through finite sampling.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Read relationships from ==shared nodes==, not tip order.',
      'A **clade** includes every descendant of its ancestor.',
      '**Orthologs** come from speciation, **paralogs** from duplication.',
      'Mutation, selection, drift, and gene flow ==each change frequencies differently==.',
    ],
  },
]);

const biotech = defineDeck('gene-u9-l1', [
  {
    kind: 'title',
    title: 'Sequencing, cloning, and gene editing',
    subtitle: 'What each tool can show, and what still needs validation.',
    objectives: [
      'Compare the purposes of major **biotechnology** methods.',
      'Use **controls** for molecular inference.',
      'Distinguish an **intended edit** from a **validated outcome**.',
    ],
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: a bacterial colony grows on antibiotic plates after cloning. Is the insert correct?',
    options: ['Yes', 'Not necessarily', 'Only if it is blue', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Sanger sequencing',
    image: 'gene-sanger',
    caption:
      'Sanger sequencing: labeled **chain-terminating** nucleotides stop synthesis at each base, and fragments sorted by length ==spell out the sequence==.',
    bullets: [
      'Every method has a characteristic **read length**, **error profile**, and **coverage**.',
      'Raw signal becomes **base calls** with ==quality scores==.',
      'Report the sample, reference, coverage, and uncertainty.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'PCR amplification',
    image: 'gene-pcr',
    caption:
      'Each **PCR** cycle repeats ==denaturation, annealing, and extension==, roughly doubling the target between the two primers.',
    bullets: [
      '**Primers** decide what is amplified.',
      'Positives need ==contamination controls==; negatives may be failed amplification.',
      'PCR copies a region; it does not clone an organism or change a genome.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order the steps of one PCR cycle.',
    items: [
      'Denature the DNA at high heat',
      'Anneal primers at a lower temperature',
      'Extend with polymerase',
    ],
    explanation:
      'Strands separate, primers bind their targets, then polymerase extends from each primer.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'Starting from one target copy, how many copies are there after 10 ideal PCR cycles?',
    answer: 1024,
    tolerance: 0,
    unit: 'copies',
    explanation: 'Ideal doubling gives 2¹⁰ = 1024 copies; real efficiency is lower.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Gene cloning',
    bullets: [
      'Cloning places a DNA fragment into a **vector** that replicates in a **host**.',
      'Vector, insert, host, and **selection** or **screening** each have distinct roles.',
      'Surviving selection proves ==a selectable feature==, not the right insert.',
      'Confirm structure, orientation, and sequence; the host may not process the protein correctly.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: a surviving clone',
    problem: 'A clone survives antibiotic selection. Has its insert been verified?',
    steps: [
      'Selection shows the ==vector’s resistance gene== is present.',
      'It does not prove insert ==identity, orientation, or sequence==.',
      'Use restriction mapping, PCR, or sequencing to confirm.',
    ],
    conclusion: 'Selection and validation answer ==different questions==.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'CRISPR–Cas9 targeting',
    image: 'gene-crispr',
    caption:
      'A **guide RNA** pairs with the target DNA next to a **PAM** site, and **Cas9** cuts both strands; ==cell repair decides the outcome==.',
    bullets: [
      'Targeting is ==not a guarantee== of one exact edit in every cell.',
      '**Mosaicism**, delivery, ==off-target changes==, and selection need checking.',
      'A phenotype change alone does not prove the intended sequence.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each component to its role.',
    pairs: [
      ['Guide RNA', 'Pairs with the target sequence'],
      ['Cas9', 'Cuts both DNA strands'],
      ['PAM', 'Short motif needed next to the target'],
      ['Cell repair pathways', 'Determine the final sequence change'],
    ],
    explanation:
      'The guide finds the site, Cas9 cuts it, the PAM licenses binding, and repair (end joining or a template) sets the outcome.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Controls and verification',
    bullets: [
      'Use **negative**, **positive**, and **process** controls suited to the question.',
      '==Sequence the target== and check off-target or structural changes.',
      'Compare edited and reference cells under ==matched conditions==.',
      '**Independent lines** or **rescue** experiments strengthen causal claims.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each control to what it rules out.',
    pairs: [
      ['No-template PCR control', 'Contamination'],
      ['Known positive sample', 'Failed reaction'],
      ['Unedited cells under the same conditions', 'Effects of handling alone'],
      ['Rescue by restoring the gene', 'Off-target cause of the phenotype'],
    ],
    explanation:
      'Each control removes one alternative explanation, so choose controls by the claim you need to support.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Interpretation limits',
    bullets: [
      'Sequence, manipulation, expression, and function ==can each fail independently==.',
      'The genetics lab does not perform or predict a real edit.',
      'A Punnett square ==is not proof== that an intervention is effective, safe, or ethical.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'Edited plants grow taller. What is the strongest next step before claiming the edit caused it?',
    options: [
      'Sequence the target and test independent edited lines against matched controls',
      'Publish immediately',
      'Edit more genes at once',
      'Assume off-target changes are impossible',
    ],
    answer: 0,
    explanation:
      'Confirming the sequence and replicating in independent lines separates the intended edit from background or off-target effects.',
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'After a CRISPR edit, which check best confirms the intended change in the target?',
    options: [
      'Sequencing the target site in edited and control cells',
      'Observing that cells are alive',
      'Measuring guide RNA concentration only',
      'Assuming every cell was edited',
    ],
    answer: 0,
    explanation:
      'Sequencing edited versus control material verifies the change and reveals mosaicism.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Coverage', back: 'How thoroughly sequencing samples a target.' },
      { front: 'Primer', back: 'Starting segment that defines amplification specificity.' },
      { front: 'Vector', back: 'Construct carrying genetic material in a host.' },
      { front: 'Mosaicism', back: 'Different cell genotypes within one organism or sample.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '**Sequencing** reads; **PCR** copies; **cloning** maintains; **editing** changes.',
      'Primers define specificity; ==controls catch contamination and failure==.',
      'Selection is not validation: ==sequence the insert or edit==.',
      'CRISPR targets a site; repair decides the outcome.',
    ],
  },
]);

const profiles = defineDeck('gene-u10-l1', [
  {
    kind: 'title',
    title: 'DNA profiles and gene-editing applications',
    subtitle: 'What a match means, what it does not, and how to evaluate an application.',
    objectives: [
      'Interpret **multilocus** comparisons.',
      'Separate a **match** from **source certainty**.',
      'Evaluate **applications** with explicit evidence.',
    ],
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: a random-match probability is 1 in a million. Is the suspect’s chance of innocence 1 in a million?',
    options: ['Yes', 'No', 'Roughly', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'DNA profiles',
    image: 'gene-gel',
    caption:
      'Gel electrophoresis separates DNA fragments ==by size==; shorter fragments travel farther from the wells.',
    bullets: [
      'A **DNA profile** compares ==selected variable markers==, not the whole genome.',
      '**STR** loci vary in the number of short repeats; each person carries two alleles per locus.',
      'Partial, mixed, or degraded samples need ==different interpretation==.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'At one STR locus a reference has alleles 12 and 15. An evidence sample shows 12 and 14. What follows?',
    options: [
      'The reference is excluded at that locus, if the typing is reliable',
      'The reference matches',
      'Nothing can be said',
      'The sample must be a mixture',
    ],
    answer: 0,
    explanation:
      'An allele present in the reference but absent in a clean single-source profile, and a new one present, exclude that reference at the locus.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Match probabilities',
    bullets: [
      'A match shows ==compatibility== under a defined comparison.',
      '**Random-match probability** depends on marker frequencies and population assumptions.',
      'It is ==not the probability of innocence== or of correct evidence handling.',
      'Lab error, contamination, and **relatives** are separate considerations.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: combine two loci',
    problem:
      'Two independent marker match probabilities are 0.1 and 0.2. Find the joint modeled probability.',
    steps: [
      'State the ==independence assumption==.',
      'Multiply: 0.1 × 0.2.',
      'The result is **0.02** for that specified event.',
    ],
    conclusion: 'It is ==not a probability of guilt==; its meaning must stay explicit.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'Three independent loci have genotype frequencies 0.1, 0.05, and 0.2. What is the combined random-match probability?',
    answer: 0.001,
    tolerance: 0.00001,
    explanation: '0.1 × 0.05 × 0.2 = 0.001, or 1 in 1000, under the independence model.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Mixtures and uncertainty',
    bullets: [
      '==More than two alleles== at one autosomal locus suggests more than one contributor.',
      '**Peak heights**, **dropout**, **stutter**, and sample quality complicate inference.',
      'A classroom profile shows exclusions, ==not validated forensic interpretation==.',
      'Separate direct observations from conclusions needing statistics.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'An evidence sample shows alleles 9, 11, and 13 at one STR locus. What is the simplest interpretation?',
    options: [
      'At least two contributors',
      'One person with three alleles',
      'Contamination is impossible',
      'Every allele is stutter',
    ],
    answer: 0,
    explanation:
      'One person carries at most two alleles at an autosomal locus, so three suggests a mixture, though artifacts must be ruled out.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Editing applications',
    bullets: [
      'Editing supports research on ==gene function==, agricultural traits, and more.',
      'A proposal defines the **target**, **mechanism**, **delivery**, **verification**, and **outcome measure**.',
      'Changing one trait can create ==tradeoffs elsewhere==.',
      'Lab success does not guarantee field performance.',
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Which belong in a well-defined gene-editing proposal? Select all that apply.',
    options: [
      'The target sequence and intended change',
      'How the edit will be verified',
      'A measurable outcome',
      'A claim that the edit will be risk-free',
    ],
    answers: [0, 1, 2],
    explanation:
      'A sound proposal is specific about target, verification, and outcome; no method can claim zero risk in advance.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Evidence and values',
    bullets: [
      'Evidence asks whether a method ==produces a defined outcome== under tested conditions.',
      'Decisions also involve ==equity, consent, environment, and governance==.',
      'Keep empirical uncertainty and value judgments ==separate==.',
      'A heritable population change has different scope from a contained cell experiment.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Is each question empirical or about values?',
    bins: ['Empirical (evidence)', 'Values (judgment)'],
    items: [
      ['Does the edit raise yield in field trials?', 0],
      ['Should farmers be required to label edited crops?', 1],
      ['How often do off-target edits occur?', 0],
      ['Who should decide whether to release a gene drive?', 1],
    ],
    explanation:
      'Measurable outcomes are empirical; who decides and what is acceptable are value questions informed by, but not settled by, evidence.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Synthesis',
    bullets: [
      'Connect ==molecular identity, transmission, population frequency, and phenotype==, keeping each inference separate.',
      'Lab crosses and Hardy–Weinberg bars ==do not compute== a forensic statistic or editing risk.',
      'A defensible conclusion is precise about the question answered and those still open.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'In a two-person DNA mixture, an expected allele is missing at one locus. What is one explanation?',
    options: [
      'Allele dropout from low template DNA',
      'The profile is certainly from one person',
      'STR markers never vary',
      'The match probability becomes zero',
    ],
    answer: 0,
    explanation:
      'Low-level or degraded DNA can fail to show an allele that is present, so mixtures need cautious interpretation.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'STR', back: 'Short tandem repeat marker.' },
      {
        front: 'Random-match probability',
        back: 'Chance of a specified profile match under a model.',
      },
      { front: 'Dropout', back: 'Failure to observe an allele that is present.' },
      { front: 'Validation', back: 'Evidence a method performs as intended in a context.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Profiles compare **STR markers**; an unexplained allele can ==exclude== a reference.',
      'Random-match probability is ==not the probability of innocence==.',
      'Three or more alleles at a locus suggest a **mixture**.',
      'Separate evidence about outcomes from ==value judgments== about use.',
    ],
  },
]);

export const geneDecksApplied: Deck[] = [regulation, population, phylogeny, biotech, profiles];
