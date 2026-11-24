import { defineDeck, type Deck } from './presentation-types.ts';

// Heredity (Division B) presentations for units 5–8: DNA, gene expression, population genetics,
// and PCR. Each deck follows its lesson section by section, like presentations-b-heredity.ts.

const dna = defineDeck('her-u5-l1', [
  {
    kind: 'title',
    title: 'DNA structure, replication, and mutation',
    subtitle: 'How DNA is built, copied, changed, and repaired.',
    objectives: [
      'Describe nucleotides, base pairing, and antiparallel strands.',
      'Explain the jobs of the enzymes at a replication fork.',
      'Classify mutations and describe how UV damage is repaired.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Nucleotides and the double helix',
    image: 'b-her-dna',
    caption:
      'In the close-ups, dashed lines are **hydrogen bonds**: two join T and A, three join C and G.',
    bullets: [
      'Each **nucleotide** has a deoxyribose sugar, a phosphate, and a base: **A, G, C, or T**.',
      'Phosphate links to the next sugar’s 3′ carbon, making a **sugar-phosphate backbone** with a 5′ and a 3′ end.',
      'The two strands run **antiparallel**, held together by hydrogen bonds between bases.',
      '==A pairs with T by two bonds; G pairs with C by three==. A purine always pairs with a pyrimidine.',
    ],
  },
  {
    kind: 'fill',
    section: 0,
    prompt: 'Complete the base-pairing rules.',
    text: 'Adenine pairs with {0} by two hydrogen bonds, and guanine pairs with {1} by {2} hydrogen bonds.',
    blanks: ['thymine', 'cytosine', 'three'],
    distractors: ['uracil', 'adenine', 'four'],
    explanation:
      'A–T pairs share two hydrogen bonds and G–C pairs share three. Uracil replaces thymine only in RNA.',
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'A DNA sample is 30% adenine. What percentage of its bases are guanine?',
    answer: 20,
    tolerance: 0,
    unit: '%',
    explanation: 'A = T, so A + T = 60%. The remaining 40% is G + C, split equally: 20% guanine.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Packaging DNA',
    bullets: [
      'Eukaryotic DNA wraps around **histone** proteins to form **nucleosomes**, which coil into chromatin.',
      'Loose **euchromatin** is usually active; tight **heterochromatin** is usually silent.',
      'During division, chromatin condenses further into **visible chromosomes**.',
      'Bacteria have a ==circular chromosome and may carry plasmids==, small circles that often carry antibiotic-resistance genes.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each structure to its description.',
    pairs: [
      ['Nucleosome', 'DNA wrapped around histone proteins'],
      ['Euchromatin', 'Loosely packed, usually active'],
      ['Heterochromatin', 'Tightly packed, usually silent'],
      ['Plasmid', 'Small circular DNA in bacteria'],
    ],
    explanation:
      'Histones package DNA into nucleosomes; how tightly chromatin is packed affects whether genes are used; plasmids are extra bacterial DNA circles.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'The replication fork',
    image: 'gene-replication',
    caption:
      'At the fork the **leading strand** is made continuously and the **lagging strand** in Okazaki fragments.',
    bullets: [
      'Replication is **semiconservative**: each new helix keeps one old strand.',
      '**Helicase** unwinds, **single-strand binding proteins** hold strands apart, **topoisomerase** relieves twisting.',
      '**Primase** lays down an RNA primer, because ==DNA polymerase can only add to an existing 3′ end==.',
      'New DNA is built only **5′ to 3′**.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each enzyme to its job at the replication fork.',
    pairs: [
      ['Helicase', 'Unwinds the double helix'],
      ['Primase', 'Lays down a short RNA primer'],
      ['DNA polymerase', 'Adds nucleotides to a 3′ end'],
      ['Topoisomerase', 'Relieves twisting ahead of the fork'],
      ['DNA ligase', 'Seals gaps between fragments'],
    ],
    explanation:
      'Helicase opens, primase starts, polymerase builds, topoisomerase relieves strain, and ligase seals.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Leading and lagging strands',
    bullets: [
      'The templates are antiparallel, so one new strand — the **leading strand** — is made continuously toward the fork.',
      'The **lagging strand** is made in short **Okazaki fragments** away from the fork, each with its own primer.',
      'Primers are replaced with DNA, and **DNA ligase** seals the gaps.',
      'DNA polymerase ==proofreads==: it removes a wrongly paired nucleotide before continuing.',
    ],
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Order the events that make one stretch of the lagging strand.',
    items: [
      'Helicase opens more of the helix',
      'Primase adds an RNA primer',
      'DNA polymerase builds an Okazaki fragment',
      'The primer is replaced with DNA',
      'DNA ligase seals the gap',
    ],
    explanation:
      'Each fragment needs fresh template, its own primer, extension, primer replacement, and finally sealing by ligase.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Types of mutations',
    columns: ['Mutation', 'What changes', 'Effect on the protein'],
    rows: [
      ['**Silent**', 'One base', 'Same amino acid'],
      ['**Missense**', 'One base', 'One amino acid changes'],
      ['**Nonsense**', 'One base', 'A stop codon ==cuts the protein short=='],
      [
        '**Frameshift**',
        'Insertion or deletion not a multiple of 3',
        'Every codon after it changes',
      ],
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Classify a mutation',
    problem:
      'A template strand reads 3′-TAC GGA TTC-5′. A mutation changes the third codon’s template to ATC. Classify the mutation.',
    steps: [
      'The mRNA is complementary: **5′-AUG CCU AAG-3′**, coding Met–Pro–Lys.',
      'A template of ATC gives the mRNA codon **UAG**.',
      'UAG is a **stop codon**, so translation ends after Pro.',
    ],
    conclusion: 'This is a ==nonsense mutation== that shortens the protein to two amino acids.',
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Classify each mutation.',
    bins: ['Silent', 'Missense', 'Nonsense', 'Frameshift'],
    items: [
      ['GGU → GGC, both glycine', 0],
      ['GAG → GUG, glutamate becomes valine', 1],
      ['UAC → UAA, tyrosine becomes stop', 2],
      ['One base deleted near the start of a gene', 3],
      ['Two bases inserted in the middle of a gene', 3],
      ['CUU → CUC, both leucine', 0],
    ],
    explanation:
      'Same amino acid is silent, a different amino acid is missense, a new stop is nonsense, and adding or removing bases that are not a multiple of three shifts the reading frame.',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'UV damage and nucleotide excision repair',
    steps: [
      {
        label: 'Damage',
        detail:
          '**UVB** joins neighboring thymines into a ==pyrimidine dimer== that kinks the helix.',
      },
      { label: 'Detect', detail: 'Repair proteins find the **distortion** in the helix.' },
      { label: 'Cut', detail: 'Nucleases cut the damaged strand on **both sides** of the lesion.' },
      {
        label: 'Fill',
        detail: 'The short piece is removed and **DNA polymerase** copies the other strand.',
      },
      { label: 'Seal', detail: '**Ligase** seals the last gap.' },
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'How does UVA mainly damage DNA?',
    options: [
      'Indirectly, through reactive oxygen species',
      'By joining thymines directly into dimers',
      'By deleting whole chromosomes',
      'By replacing thymine with uracil',
    ],
    answer: 0,
    explanation:
      'UVB is absorbed directly and makes pyrimidine dimers. UVA penetrates deeper and mostly causes indirect damage through reactive oxygen species.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Antiparallel', back: 'The two DNA strands run in opposite 5′→3′ directions.' },
      { front: 'Semiconservative', back: 'Each new double helix keeps one old strand.' },
      { front: 'Okazaki fragment', back: 'A short piece of the lagging strand.' },
      { front: 'Pyrimidine dimer', back: 'Two neighboring pyrimidines joined by UV light.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'DNA is two **antiparallel** strands: A–T and G–C.',
      'Polymerase builds **5′ to 3′** from a primer; the lagging strand is made in fragments.',
      '==A frameshift changes every codon after it==; a nonsense mutation adds an early stop.',
      'Nucleotide excision repair cuts out UV damage and fills the gap.',
    ],
  },
]);

const expression = defineDeck('her-u6-l1', [
  {
    kind: 'title',
    title: 'Gene expression: transcription and translation',
    subtitle: 'From a DNA sequence to a working protein, and how bacteria switch genes on and off.',
    objectives: [
      'Describe transcription, RNA processing, and translation.',
      'Translate an mRNA with the genetic code.',
      'Compare the inducible lac operon with the repressible trp operon.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The central dogma',
    bullets: [
      '==DNA is transcribed into RNA, and mRNA is translated into protein.==',
      'Each three-base **codon** specifies one amino acid or a stop signal.',
      'The code is **redundant** (61 codons for 20 amino acids) and nearly **universal**.',
      '**AUG** starts translation and codes methionine; **UAA, UAG, UGA** are stops.',
    ],
  },
  {
    kind: 'multi',
    section: 0,
    prompt: 'Which codons are stop codons? Choose all that apply.',
    options: ['UAA', 'AUG', 'UAG', 'UGA', 'UUU'],
    answers: [0, 2, 3],
    explanation:
      'UAA, UAG, and UGA are the stops. AUG is the start codon, and UUU codes phenylalanine.',
  },
  {
    kind: 'flow',
    section: 1,
    title: 'Transcription',
    steps: [
      {
        label: 'Initiation',
        detail:
          '**RNA polymerase** binds a **promoter**, often helped by transcription factors, and unwinds DNA.',
      },
      {
        label: 'Elongation',
        detail:
          'It reads the template **3′ to 5′** and builds RNA **5′ to 3′**, using ==uracil instead of thymine==.',
      },
      {
        label: 'Termination',
        detail: 'A **terminator** sequence releases the RNA. No primer is ever needed.',
      },
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'What does a repressor protein do?',
    options: [
      'Blocks transcription',
      'Increases transcription',
      'Splices out introns',
      'Carries amino acids to the ribosome',
    ],
    answer: 0,
    explanation: 'Activators bind DNA and increase transcription, while repressors block it.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'RNA maturation',
    bullets: [
      'A **5′ cap** protects the RNA and helps ribosomes bind.',
      'A **poly-A tail** at the 3′ end adds stability and aids export.',
      'The **spliceosome** removes **introns** and joins **exons**.',
      '==Alternative splicing lets one gene make several proteins==. Bacterial mRNA is not processed this way.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Is each feature kept in the mature mRNA, or removed during processing?',
    bins: ['In the mature mRNA', 'Removed'],
    items: [
      ['Exons', 0],
      ['Introns', 1],
      ['5′ cap', 0],
      ['Poly-A tail', 0],
    ],
    explanation:
      'The cap and tail are added, exons are joined together, and introns are spliced out.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Translation',
    image: 'gene-translation',
    caption:
      'tRNAs pair with codons in the ribosome’s **A** and **P** sites as amino acids are linked into a chain.',
    bullets: [
      '**Initiation**: the small subunit finds AUG, the methionine tRNA pairs, and the large subunit joins.',
      '**Elongation**: each tRNA **anticodon** pairs with a codon; ==the chain moves to the new amino acid==, and the ribosome shifts one codon.',
      '**Termination**: a stop codon binds a **release factor**, freeing the protein.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'From template to peptide',
    problem:
      'A template strand reads 3′-TAC AAA CCG ATT-5′. Give the mRNA and the amino acid sequence.',
    steps: [
      'Pair each template base: T→A, A→U, C→G, G→C.',
      'The mRNA is **5′-AUG UUU GGC UAA-3′**.',
      'Translate: AUG = Met, UUU = Phe, GGC = Gly, UAA = **stop**.',
    ],
    conclusion: 'The peptide is ==Met–Phe–Gly==, ending at the UAA stop codon.',
  },
  {
    kind: 'fill',
    section: 3,
    prompt: 'Write the mRNA made from this template strand.',
    text: 'Template 3′-TAC GGG-5′ gives mRNA 5′-{0} {1}-3′.',
    blanks: ['AUG', 'CCC'],
    distractors: ['TAC', 'GGG', 'ATG'],
    explanation: 'Pair each base: TAC → AUG and GGG → CCC, using U instead of T in RNA.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'The lac operon',
    image: 'gene-lac-operon',
    caption:
      'The lac genes are strongly expressed only when **glucose is low and lactose is present**.',
    bullets: [
      'No lactose: the **lac repressor** sits on the **operator** and blocks RNA polymerase.',
      'Lactose present: **allolactose** binds the repressor, which lets go of the operator.',
      'Low glucose: the **CAP–cAMP** activator helps polymerase bind.',
      'It is an ==inducible operon==: its substrate switches it on.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'When is the lac operon transcribed the most?',
    options: [
      'Lactose present and glucose low',
      'Lactose present and glucose high',
      'Lactose absent and glucose low',
      'Lactose absent and glucose high',
    ],
    answer: 0,
    explanation:
      'Lactose removes the repressor, and low glucose lets CAP–cAMP boost polymerase binding, so expression is highest with both.',
  },
  {
    kind: 'compare',
    section: 5,
    title: 'The trp operon compared with lac',
    columns: ['Feature', 'lac operon', 'trp operon'],
    rows: [
      ['Genes make…', 'Enzymes that **digest lactose**', 'Enzymes that **build tryptophan**'],
      ['Usual state', 'Off', 'On'],
      ['Switch', 'Allolactose **removes** the repressor', 'Tryptophan **activates** the repressor'],
      ['Type', '**Inducible**', '==Repressible: off when its product builds up=='],
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Is each operon ON or OFF?',
    bins: ['Genes transcribed', 'Genes shut off'],
    items: [
      ['trp operon, tryptophan scarce', 0],
      ['trp operon, tryptophan plentiful', 1],
      ['lac operon, no lactose', 1],
      ['lac operon, lactose present, glucose low', 0],
    ],
    explanation:
      'The trp operon turns off when its product accumulates; the lac operon turns on when its substrate appears.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Codon', back: 'Three mRNA bases that code for one amino acid or stop.' },
      { front: 'Anticodon', back: 'Three tRNA bases that pair with a codon.' },
      {
        front: 'Promoter',
        back: 'DNA sequence where RNA polymerase binds to start transcription.',
      },
      {
        front: 'Operon',
        back: 'A group of bacterial genes controlled together by one promoter and operator.',
      },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Transcription makes RNA **5′ to 3′** with no primer; eukaryotic RNA is capped, tailed, and spliced.',
      'Ribosomes read codons with tRNA anticodons from **AUG** to a stop.',
      '==lac turns on when lactose appears; trp turns off when tryptophan builds up.==',
    ],
  },
]);

const populations = defineDeck('her-u7-l1', [
  {
    kind: 'title',
    title: 'Population genetics and Hardy–Weinberg',
    subtitle: 'Tracking how common alleles are, and what changes them.',
    objectives: [
      'Calculate allele frequencies from genotype counts.',
      'Use p² + 2pq + q² = 1 to find carrier frequencies.',
      'Explain drift, gene flow, selection, and additive traits.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Allele frequencies',
    bullets: [
      '**p** is the frequency of allele A and **q** the frequency of a, with ==p + q = 1==.',
      'Count alleles: each **AA** has two A alleles and each **Aa** has one.',
      'Example: 36 AA, 48 Aa, 16 aa → A alleles = 72 + 48 = **120 of 200**.',
      'So p = 0.6 and q = 0.4.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'A population has 49 AA, 42 Aa, and 9 aa individuals. What is the frequency of allele A (p)?',
    answer: 0.7,
    tolerance: 0.005,
    explanation: 'A alleles = 2 × 49 + 42 = 140 out of 200 total alleles, so p = 0.7.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'The Hardy–Weinberg equation',
    image: 'gene-hardy-weinberg',
    caption: 'Genotype frequencies p², 2pq, and q² change as the allele frequencies change.',
    bullets: [
      'In equilibrium: **AA = p²**, **Aa = 2pq**, **aa = q²**, adding to 1.',
      'For a recessive trait, ==affected (aa) = q², so q is its square root==.',
      '1 in 10,000 affected → q = 0.01, p = 0.99, carriers ≈ **2%**.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Finding carriers',
    problem:
      'In a Hardy–Weinberg population, 9% of individuals show a recessive trait. What percentage are carriers?',
    steps: [
      'Affected are aa: **q² = 0.09**, so q = 0.3.',
      'p = 1 − q = **0.7**.',
      'Carriers are Aa: 2pq = 2 × 0.7 × 0.3 = **0.42**.',
    ],
    conclusion: 'About ==42% are carriers==, far more than the 9% who show the trait.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'In a Hardy–Weinberg population, 4% show a recessive trait. What percentage are carriers?',
    answer: 32,
    tolerance: 0.5,
    unit: '%',
    explanation:
      'q² = 0.04, so q = 0.2 and p = 0.8. Carriers = 2pq = 2 × 0.8 × 0.2 = 0.32, or 32%.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'The five assumptions',
    bullets: [
      'A **very large** population.',
      '**Random mating**.',
      'No **mutation**, no **migration**, and no **natural selection**.',
      'Real populations rarely meet all five, so the model is a **null hypothesis**: ==a mismatch means an assumption is broken==.',
    ],
    callout: 'Too few heterozygotes often points to nonrandom mating.',
  },
  {
    kind: 'multi',
    section: 2,
    prompt: 'Which conditions are required for Hardy–Weinberg equilibrium? Choose all that apply.',
    options: [
      'Random mating',
      'No natural selection',
      'A small, isolated population',
      'No migration',
      'Frequent new mutations',
    ],
    answers: [0, 1, 3],
    explanation:
      'Equilibrium needs a very large population, random mating, and no mutation, migration, or selection. Small populations drift, and mutation changes allele frequencies.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Genetic drift, founders, and bottlenecks',
    bullets: [
      '**Genetic drift** is a random change in allele frequency, strongest in ==small populations==.',
      '**Founder effect**: a few individuals start a new population with different allele frequencies by chance.',
      '**Bottleneck**: a population is suddenly reduced, as after a disaster.',
      'Both reduce diversity; rare alleles may be lost or become unusually common.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each scenario to the process.',
    pairs: [
      ['A storm kills most of an island’s lizards at random', 'Bottleneck'],
      ['Twenty settlers start a new colony on a remote island', 'Founder effect'],
      ['Pollen blows between two neighboring meadows', 'Gene flow'],
      ['Moths that match tree bark survive birds better', 'Natural selection'],
    ],
    explanation:
      'A sudden random die-off is a bottleneck, a small starting group is a founder effect, moving alleles is gene flow, and survival differences are selection.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Migration and fitness',
    bullets: [
      '**Gene flow** moves alleles between populations and makes them ==more similar==.',
      '**Relative fitness** compares reproductive success with the best genotype, which gets fitness 1.',
      'If aa has fitness 0.5, aa individuals leave half as many offspring, so **q falls** over generations.',
      'The fall slows once a is rare, because most a alleles hide in heterozygotes.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Why does selection against a harmful recessive allele become very slow once the allele is rare?',
    options: [
      'Most copies are hidden in heterozygotes, where selection cannot see them',
      'Rare alleles mutate back to the dominant form',
      'Heterozygotes always have fitness 0',
      'Selection only acts on dominant alleles',
    ],
    answer: 0,
    explanation:
      'When q is small, q² (affected) is tiny compared with 2pq (carriers), so very few copies are exposed to selection.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Additive alleles and continuous traits',
    bullets: [
      'Traits like height vary **continuously** because many genes each add a small amount.',
      'With **additive alleles**, each contributing allele adds the same increment.',
      'With n genes, the F2 shows **2n + 1** classes and ==(1/4)ⁿ matches one extreme==.',
      'Environment blurs these classes into a smooth curve.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'In an F2, 1/64 of the offspring match one extreme parent. How many additive genes contribute?',
    answer: 3,
    tolerance: 0,
    unit: 'genes',
    explanation: '(1/4)ⁿ = 1/64, and 4³ = 64, so n = 3 genes.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Allele frequency',
        back: 'How common one allele is among all copies of the gene in a population.',
      },
      {
        front: 'Genetic drift',
        back: 'Random change in allele frequency, strongest in small populations.',
      },
      { front: 'Gene flow', back: 'Movement of alleles between populations by migration.' },
      {
        front: 'Relative fitness',
        back: 'Reproductive success compared with the most successful genotype.',
      },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '**p + q = 1** and **p² + 2pq + q² = 1**.',
      '==For a recessive trait, start from q² = affected fraction.==',
      'Drift, founders, bottlenecks, gene flow, and selection all change allele frequencies.',
      'Many additive genes make continuous traits like height.',
    ],
  },
]);

const pcr = defineDeck('her-u8-l1', [
  {
    kind: 'title',
    title: 'PCR and Sanger sequencing',
    subtitle: 'Copying one piece of DNA millions of times, then reading its bases.',
    objectives: [
      'List the ingredients of a PCR reaction and what each does.',
      'Describe the three temperature steps and exponential copying.',
      'Explain how dideoxynucleotides let Sanger sequencing read DNA.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Why copy DNA?',
    bullets: [
      'Many experiments need far more of one DNA segment than a sample holds.',
      'The **polymerase chain reaction (PCR)** copies a chosen region millions of times in a tube.',
      'Uses: detecting **pathogens**, comparing **crime-scene DNA**, checking for a gene, and preparing DNA for **sequencing**.',
      '==PCR copies only the segment between two primers==, not the whole genome.',
    ],
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'PCR components',
    bullets: [
      '**Template** DNA containing the target.',
      '**Two primers** matching the ends of the target on opposite strands.',
      '**Taq polymerase**, ==heat-stable== because it comes from the hot-spring bacterium Thermus aquaticus.',
      'The four **dNTPs**, a buffer, and **magnesium ions**. A **thermocycler** cycles the temperature.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which ingredients go into a PCR reaction? Choose all that apply.',
    options: [
      'A DNA template containing the target',
      'Two primers',
      'Taq polymerase',
      'dNTPs and magnesium ions',
      'Ribosomes',
    ],
    answers: [0, 1, 2, 3],
    explanation:
      'PCR needs template, two primers, a heat-stable polymerase, dNTPs, buffer, and Mg²⁺. Ribosomes make proteins, not DNA.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Denaturation, annealing, and extension',
    image: 'gene-pcr',
    caption: 'Each cycle of denaturing, annealing, and extending roughly **doubles** the target.',
    bullets: [
      '**Denaturation (~95 °C)**: hydrogen bonds break and the strands separate.',
      '**Annealing (~50–65 °C)**: primers bind their matching sequences.',
      '**Extension (~72 °C)**: Taq adds dNTPs to each primer’s 3′ end.',
      '==Too hot and primers cannot bind; too cool and they bind the wrong sites.==',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each PCR step to its temperature.',
    pairs: [
      ['Denaturation', 'About 95 °C'],
      ['Annealing', 'About 50–65 °C'],
      ['Extension', 'About 72 °C'],
    ],
    explanation:
      'Heat separates the strands, cooling lets primers bind, and 72 °C is the best temperature for Taq to build DNA.',
  },
  {
    kind: 'order',
    section: 2,
    prompt: 'Put the steps of one PCR cycle in order.',
    items: ['Denaturation', 'Annealing', 'Extension'],
    explanation: 'Separate the strands, let primers bind, then extend from the primers.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Exponential copying',
    bullets: [
      'Each cycle roughly **doubles** the target: ==up to 2ⁿ copies after n cycles==.',
      '30 cycles from one molecule give about **a billion** copies.',
      'After a few cycles, products of exactly the target length dominate, because new strands start and stop at the primers.',
      'Real reactions **level off** as primers and dNTPs run out.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Counting copies',
    problem:
      'A PCR starts with 50 copies of a target. Assuming perfect doubling, how many copies are there after 10 cycles?',
    steps: [
      'Each cycle doubles the copies: multiply by **2¹⁰**.',
      '2¹⁰ = **1024**.',
      '50 × 1024 = **51,200**.',
    ],
    conclusion:
      'About ==51,200 copies==, an upper limit; real efficiency is usually a little lower.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'A PCR starts with 10 copies of a target. Assuming perfect doubling, how many copies are there after 5 cycles?',
    answer: 320,
    tolerance: 0,
    unit: 'copies',
    explanation: '2⁵ = 32, and 10 × 32 = 320 copies.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Sanger sequencing compared with PCR',
    columns: ['Feature', 'PCR', 'Sanger sequencing'],
    rows: [
      ['Primers', 'Two', '**One**, so copying runs in one direction'],
      ['Copying', 'Exponential', 'Not exponential'],
      [
        'Special ingredient',
        'None',
        '**ddNTPs**, which ==lack a 3′ hydroxyl and stop the strand==',
      ],
      ['Product', 'Many copies of one segment', 'Fragments ending at **every position**'],
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Why does adding a ddNTP stop a growing DNA strand?',
    options: [
      'It lacks the 3′ hydroxyl group needed to attach the next nucleotide',
      'It cannot pair with the template',
      'It destroys the polymerase',
      'It makes the strands separate',
    ],
    answer: 0,
    explanation:
      'DNA polymerase attaches each new nucleotide to the 3′ hydroxyl. A ddNTP has none, so nothing more can be added.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Reading the sequence',
    image: 'gene-sanger',
    caption:
      'Chain-terminated fragments, sorted by length, are read as a colored **chromatogram**.',
    bullets: [
      'Each ddNTP carries a different **fluorescent dye**.',
      '**Capillary electrophoresis** separates fragments by size, smallest first.',
      'Reading colors from smallest to largest gives the new strand **5′ to 3′**.',
      'The new strand is ==complementary to the template==.',
    ],
  },
  {
    kind: 'fill',
    section: 5,
    prompt: 'Finish the description of a Sanger read.',
    text: 'Fragments are separated by {0} with the {1} ones first, and the colors give the new strand from 5′ to {2}.',
    blanks: ['size', 'smallest', '3′'],
    distractors: ['charge', 'largest', '5′'],
    explanation:
      'Capillary electrophoresis sorts fragments by size, smallest first, so the colors read the new strand 5′ to 3′.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Primer',
        back: 'A short sequence that pairs with the template and gives polymerase a 3′ end to extend.',
      },
      { front: 'Taq polymerase', back: 'Heat-stable DNA polymerase from Thermus aquaticus.' },
      { front: 'dNTP', back: 'A normal DNA building block that lets the strand keep growing.' },
      { front: 'ddNTP', back: 'A building block with no 3′ hydroxyl that stops the strand.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'PCR copies the region **between two primers** using a heat-stable polymerase.',
      'Denature, anneal, extend: ==up to 2ⁿ copies after n cycles==.',
      'Sanger sequencing uses **one primer** and dye-labeled **ddNTPs** that stop each strand.',
      'Sorting fragments by size reads the sequence 5′ to 3′.',
    ],
  },
]);

export const heredityDecksMolecular: Deck[] = [dna, expression, populations, pcr];
