import type { Deck } from './presentation-types.ts';
import { defineDeck } from './presentation-types.ts';
import { proteinDecksViruses } from './presentations-protein-modeling-2.ts';

// Protein Modeling (Division C) presentations, one per lesson, following presentations-anatomy.ts.

const purpose = defineDeck('prot-u1-l1', [
  {
    kind: 'title',
    title: 'Event evidence, reference design, and model purpose',
    subtitle: 'A protein model is an argument about evidence, not the molecule itself.',
    objectives: [
      'Separate a model from the molecular evidence behind it.',
      'Specify a structure by entry, chain, and numbering.',
      'Plan an indexed reference.',
      'Verify the current assignment and requirements.',
    ],
    image: 'prot-myoglobin',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: is a colorful protein model automatically a good scientific model?',
    options: ['Yes', 'No', 'Only if 3D-printed', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'What a model communicates',
    image: 'prot-myoglobin',
    caption:
      'A **cartoon** of myoglobin shows helices wrapped around the heme. It emphasizes ==secondary structure== and hides most atoms.',
    bullets: [
      'A model encodes **selected relationships** and may exaggerate features for readability.',
      'Backbone traces, atoms, surfaces, and cartoons ==answer different questions==.',
      'Define the model’s **purpose** before choosing colors or labels.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'What should be the first design decision for a protein model?',
    options: ['Its scientific purpose', 'Its color scheme', 'Its material', 'Its size'],
    answer: 0,
    explanation: 'Purpose decides which representation, features, and labels the model needs.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Rules and course scope',
    bullets: [
      'The **current competition documents** set the assigned protein, resources, construction limits, and scoring.',
      '==Do not infer this year’s assignment== from an old structure or a course heading.',
      'Record the **version and source** of every requirement.',
      'This course teaches a verification workflow, not an official rubric.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Where should you find this season’s assigned protein and construction limits?',
    options: [
      'The current official competition documents',
      'Last year’s winning model',
      'The headings of this course',
      'Any structure in the PDB',
    ],
    answer: 0,
    explanation:
      'Assignments and constraints change; record the version and source of the current rules.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Structural identifiers',
    bullets: [
      'A **PDB identifier** names an entry, ==not automatically a single chain== or functional assembly.',
      'Specify **chain, residue range, insertion codes**, and which numbering scheme you use.',
      'Missing residues leave gaps; smoothly bridging one can show an ==unsupported conformation==.',
      'Separate observed coordinates, modeled additions, and annotations.',
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt:
      'A PDB entry has chains A and B and a gap at residues 40–45. What should your model label state?',
    options: [
      'Which chain is shown',
      'Which numbering scheme is used',
      'That residues 40–45 are unobserved',
      'That the gap was a smooth loop',
    ],
    answers: [0, 1, 2],
    explanation: 'Mark the missing segment as unobserved rather than inventing its shape.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Organizing the reference',
    image: 'prot-levels',
    caption:
      'Organize the reference by **structural level**: sequence, helices and sheets, the folded chain, and assembled subunits, then the ==assigned structure==.',
    bullets: [
      'Add sections for **amino-acid chemistry, folding interactions, and function**.',
      'Keep diagrams beside **source identifiers and a legend**.',
      'An interaction note gives residues, distance, chemical rationale, and uncertainty.',
    ],
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Order a reference section from foundations to the assigned case.',
    items: [
      'Amino-acid chemistry',
      'Secondary structure',
      'Folding interactions',
      'Biological function',
      'The assigned structure',
    ],
    explanation: 'Later sections build on the vocabulary of earlier ones.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'An evidence hierarchy',
    columns: ['Evidence', 'Establishes', 'Does not prove'],
    rows: [
      ['**Sequence**', 'Residue order', 'The 3D arrangement'],
      ['**Coordinates**', 'An experimental or predicted arrangement', 'Biological activity'],
      [
        '**Functional experiments**',
        'Activity under conditions',
        '==Which atoms are responsible==',
      ],
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Is each statement a direct observation or an interpretation?',
    bins: ['Observation', 'Interpretation'],
    items: [
      ['Two atoms are 3.0 Å apart in the coordinates', 0],
      ['Those atoms form a hydrogen bond', 1],
      ['Residue 57 is a histidine', 0],
      ['This colored patch is the active site', 1],
      ['The structure was solved by X-ray crystallography', 0],
    ],
    explanation:
      'Interpretations need chemical, geometric, or functional support beyond the raw observation.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Using the virtual viewer',
    bullets: [
      'The synthetic chain lets you **rotate, highlight, and compact** a teaching model.',
      'Its contact count is ==geometric, not a folding energy==.',
      'Record the **question** each representation answers and **one feature it hides**.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: labeling a gap',
    problem:
      'A structure entry has chains A and B and a gap at residues 40–45. Plan a model label.',
    steps: [
      'Identify the **chosen chain and numbering**.',
      'Mark the missing segment as **unobserved** rather than inventing its shape.',
      'State whether the displayed chains form the **relevant assembly**.',
    ],
    conclusion: '==Clear labels preserve the limits of the evidence.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Backbone trace', back: 'Representation of the chain path.' },
      { front: 'PDB entry', back: 'Deposited structure record with identifiers and metadata.' },
      { front: 'Annotation', back: 'Evidence-linked description of a feature.' },
      { front: 'Assembly', back: 'Functional or proposed arrangement of molecular components.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A PDB identifier names an {0}, not a single chain. A missing loop should be marked as {1}, and colors need a {2}.',
    blanks: ['entry', 'unobserved', 'legend'],
    distractors: ['atom', 'folded', 'gradient'],
    explanation:
      'Specify the chain; do not invent unseen coordinates; colors have no universal meaning.',
  },
  {
    kind: 'open',
    prompt: 'Why can a visually impressive model still be scientifically weak?',
    model:
      'If chain identity, numbering, or the evidence for highlighted features is unclear, the model makes claims a viewer cannot check, however attractive it looks.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'A model encodes selected relationships for a purpose.',
      'Specify entry, chain, numbering, and gaps.',
      '==Separate observations from interpretations.==',
      'Check the current requirements, not an old case study.',
    ],
  },
]);

const synthesis = defineDeck('prot-u2-l1', [
  {
    kind: 'title',
    title: 'Protein synthesis and diverse functions',
    subtitle: 'From a DNA template to a folded, working polypeptide.',
    objectives: [
      'Trace information from DNA to polypeptide.',
      'Distinguish template and coding strands.',
      'Describe the roles of ribosomes and tRNAs.',
      'Connect sequence changes to possible function.',
    ],
    image: 'prot-translation',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: does every gene encode a protein?',
    options: ['Yes', 'No', 'Only in bacteria', 'Not sure yet'],
  },
  {
    kind: 'flow',
    section: 0,
    title: 'Information flow',
    steps: [
      { label: 'Transcription', detail: 'A **DNA template** directs RNA synthesis.' },
      { label: 'Processing', detail: 'Eukaryotic RNA is **capped, spliced, and polyadenylated**.' },
      { label: 'Translation', detail: 'Ribosomes read **mRNA codons** to build a polypeptide.' },
      { label: 'Folding', detail: 'The sequence is ==not a direct drawing== of the final shape.' },
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Which statement about genes is correct?',
    options: [
      'Some genes produce functional RNAs rather than proteins',
      'Every gene encodes exactly one protein',
      'Genes are translated directly from DNA',
      'Transcription builds polypeptides',
    ],
    answer: 0,
    explanation: 'Some products, such as rRNA and tRNA, are functional RNAs.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Direction and the genetic code',
    image: 'prot-genetic-code',
    caption: 'RNA is read in **triplet codons**. It matches the ==coding strand with U for T==.',
    bullets: ['Synthesis runs **5′ → 3′**; chains grow **N to C terminus**.'],
  },
  {
    kind: 'fill',
    section: 1,
    prompt: 'Transcribe and translate the coding strand 5′-ATG GAA TAA-3′.',
    text: 'The mRNA is 5′-AUG {0} UAA-3′. It encodes Met, then {1}, then a {2} signal.',
    blanks: ['GAA', 'Glu', 'stop'],
    distractors: ['CTT', 'Leu', 'start'],
    explanation: 'Replace T with U; GAA codes for glutamate; UAA is a stop codon.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'The translation machinery',
    image: 'prot-translation',
    caption:
      'The **ribosome** holds mRNA while charged **tRNAs** deliver amino acids; peptide bonds extend the ==growing chain==.',
    bullets: [
      '**Aminoacyl-tRNA synthetases** attach each amino acid to the right tRNA.',
      'Stop codons signal termination; they do not encode ordinary amino acids.',
      'A codon is not an independently folded structural unit.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each component to its role.',
    pairs: [
      ['mRNA', 'Carries codons to be read'],
      ['tRNA', 'Links a codon to its amino acid'],
      ['Ribosome', 'Catalyzes peptide-bond formation'],
      ['Aminoacyl-tRNA synthetase', 'Charges a tRNA with its amino acid'],
    ],
    explanation:
      'Separate the molecule carrying information from the enzymes performing each step.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Diverse functions',
    bullets: [
      'Proteins act as **enzymes, receptors, channels, transporters, structural parts, motors, and antibodies**.',
      'Many need **cofactors, partners, membranes, or modifications**.',
      'A sequence motif ==suggests== a function; structure and experiments test it.',
      'Static coordinates capture **one state**, not every movement.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Which kind of protein function does each example show?',
    bins: ['Catalysis', 'Transport', 'Recognition'],
    items: [
      ['An enzyme speeding a reaction', 0],
      ['Hemoglobin carrying oxygen', 1],
      ['An antibody binding an antigen', 2],
      ['A channel letting ions cross a membrane', 1],
      ['A receptor binding a hormone', 2],
    ],
    explanation:
      'Proteins carry out many roles; each relies on a particular structure and often on partners.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Changes after synthesis',
    bullets: [
      'Proteins may be **cleaved, modified, targeted, assembled, or degraded**.',
      'Removing a signal peptide can make ==mature numbering differ== from the translated sequence.',
      '**Glycosylation** influences folding, trafficking, and recognition.',
      'A deposited structure may omit flexible regions or modifications.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Why might residue 20 in a paper and residue 20 in a PDB file be different amino acids?',
    options: [
      'One may count from the precursor and the other from the mature, cleaved protein',
      'PDB files always use random numbering',
      'Amino acids change identity after crystallization',
      'Residue numbers are not used in structures',
    ],
    answer: 0,
    explanation: 'Signal-peptide removal and different reference sequences shift numbering.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'From sequence to inference',
    bullets: [
      'A substitution may change **charge, size, hydrogen bonding, or flexibility**.',
      'Its effect ==depends on location and context==.',
      'A synonymous change keeps the amino acid but can still affect expression.',
      'Build a **mechanistic hypothesis** and name an experiment to test it.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Select every reasonable statement about mutations.',
    options: [
      'A substitution’s effect depends on where it is in the structure',
      'Every mutation is harmful',
      'A synonymous change keeps the encoded amino acid',
      'Every conserved residue is catalytic',
    ],
    answers: [0, 2],
    explanation: 'Avoid blanket claims; context and experiments decide effects.',
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: a tiny gene',
    problem:
      'Coding DNA is 5′-ATG GAA TAA-3′. Give the unprocessed mRNA and the translated product.',
    steps: [
      'Replace T with U: **5′-AUG GAA UAA-3′**.',
      'Read from AUG in the stated frame.',
      'Product: **Met–Glu**, then a stop signal.',
    ],
    conclusion: '==The example omits eukaryotic RNA processing.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Codon', back: 'Three-nucleotide unit read in a translation frame.' },
      { front: 'Template strand', back: 'DNA strand read to synthesize complementary RNA.' },
      { front: 'Peptide bond', back: 'Covalent linkage between amino-acid residues.' },
      {
        front: 'Post-translational modification',
        back: 'Chemical change after polypeptide synthesis.',
      },
    ],
  },
  {
    kind: 'open',
    prompt: 'How would you test whether a substitution changes a protein’s function?',
    model:
      'Form a hypothesis from the residue’s location and chemistry, then compare the normal and mutant proteins in a functional assay, such as binding or activity, under matched conditions.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'DNA → RNA → polypeptide, built N to C terminus.',
      'mRNA matches the coding strand with U for T.',
      '==Mature numbering can differ from the translated sequence.==',
      'Mutation effects depend on context and need testing.',
    ],
  },
]);

const levels = defineDeck('prot-u3-l1', [
  {
    kind: 'title',
    title: 'Structural levels and denaturation',
    subtitle: 'Four levels of organization, and what heat really disrupts.',
    objectives: [
      'Distinguish the four structural levels.',
      'Identify backbone hydrogen-bond patterns.',
      'Tell crystal contacts from biological interfaces.',
      'Explain denaturation without assuming peptide cleavage.',
    ],
    image: 'prot-levels',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: when you cook an egg, are its peptide bonds broken?',
    options: ['Yes', 'No', 'Some of them', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Four structural levels',
    image: 'prot-levels',
    caption:
      'From top: **primary** sequence, **secondary** helices and sheets, **tertiary** fold of one chain, and **quaternary** assembly of several chains.',
    bullets: [
      'Primary structure is ==sequence and covalent connectivity==.',
      'Peptide bonds are largely **planar**, constraining backbone rotation.',
      'A residue’s identity is different from its conformation.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Secondary structure from backbone angles',
    image: 'prot-ramachandran',
    caption:
      'A **Ramachandran plot** of backbone φ and ψ angles: observed residues cluster in ==alpha-helix and beta-sheet regions==.',
    bullets: [
      'An **alpha helix** has backbone hydrogen bonds between residues **i and i+4**.',
      'Beta strands align into **parallel or antiparallel** sheets.',
      'A “coil” label does not mean a segment is meaningless.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'In an alpha helix, which groups mainly form the stabilizing hydrogen bonds?',
    options: [
      'Backbone C=O and N–H groups',
      'Side chains only',
      'Disulfide bonds',
      'Water molecules only',
    ],
    answer: 0,
    explanation: 'The helix is a backbone pattern: residue i’s C=O bonds to residue i+4’s N–H.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Tertiary structure',
    bullets: [
      'The **overall 3D arrangement** of one polypeptide.',
      '**Domains** are larger structural and functional units; **motifs** are smaller recurring arrangements.',
      'Hydrophobic packing, hydrogen bonds, ionic interactions, van der Waals contacts, and disulfides contribute.',
      'The same residue can play ==different roles buried or on the surface==.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'How does a domain differ from a motif?',
    options: [
      'A domain is a larger structural and functional unit; a motif is a smaller recurring arrangement',
      'They are the same thing',
      'A motif is always larger than a domain',
      'Domains exist only in multi-chain proteins',
    ],
    answer: 0,
    explanation:
      'Domains can fold and function semi-independently; motifs are smaller recurring patterns.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Quaternary structure',
    image: 'prot-hemoglobin',
    caption:
      'Hemoglobin is a **heteromer** of two alpha and two beta chains. Not every protein has quaternary structure.',
    bullets: [
      'Identical subunits form a **homomer**; different ones form a **heteromer**.',
      '==Crystal contacts are not automatically biological interfaces==.',
      'A single-chain view can omit a crucial interface.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each description to its structural level.',
    pairs: [
      ['Amino-acid sequence', 'Primary'],
      ['Alpha helices and beta sheets', 'Secondary'],
      ['Overall fold of one chain', 'Tertiary'],
      ['Arrangement of several chains', 'Quaternary'],
    ],
    explanation: 'Each level describes a different scale of organization.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Denaturation',
    image: 'prot-denaturation',
    caption:
      '**Heat** unfolds a protein’s native structure. The chain and its sequence stay intact; ==native interactions are lost==.',
    bullets: [
      'Heat, pH, solvents, and other conditions can **denature** a protein.',
      'Denaturation does **not necessarily break peptide bonds**.',
      'Reversibility depends on the protein; **aggregation** can prevent refolding.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Does denaturation by heat typically change each feature?',
    bins: ['Usually disrupted', 'Usually unchanged'],
    items: [
      ['Native three-dimensional fold', 0],
      ['Amino-acid sequence', 1],
      ['Peptide bonds', 1],
      ['Biological activity', 0],
      ['Hydrogen-bond pattern of helices', 0],
    ],
    explanation:
      'Denaturation disrupts higher-order structure; backbone hydrolysis is a separate process.',
  },
  {
    kind: 'compare',
    section: 5,
    title: 'Representation choices',
    columns: ['Representation', 'Highlights', 'Hides'],
    rows: [
      ['**Backbone trace**', 'Chain connectivity', 'Side chains'],
      ['**Cartoon**', 'Helices and sheets', '==Most atoms=='],
      ['**Surface**', 'Pockets and accessibility', 'Internal packing'],
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'You rotate a model in the viewer. What changes?',
    options: [
      'The projection you see',
      'The protein’s secondary structure',
      'The residue sequence',
      'The number of chains',
    ],
    answer: 0,
    explanation: 'Rotation is a camera change; it does not alter the molecule.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: heated enzyme',
    problem:
      'Heating destroys an enzyme’s activity, but its amino-acid sequence stays intact. What changed?',
    steps: [
      '**Primary sequence** need not change.',
      'Higher-order interactions and the **native conformation** can be disrupted.',
      'Loss of function fits denaturation; it is not proof of peptide hydrolysis.',
    ],
    conclusion: '==Structural levels separate different claims.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Primary', back: 'Residue sequence and covalent connectivity.' },
      { front: 'Secondary', back: 'Recurring local backbone organization.' },
      { front: 'Tertiary', back: 'Overall arrangement of one chain.' },
      { front: 'Quaternary', back: 'Arrangement of multiple polypeptide subunits.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Alpha-helix hydrogen bonds link residues i and i+{0}. Quaternary structure needs more than one {1}, and denaturation does not necessarily break {2} bonds.',
    blanks: ['4', 'polypeptide', 'peptide'],
    distractors: ['2', 'domain', 'ionic'],
    explanation:
      'i to i+4 backbone pattern; multiple subunits; native structure lost without hydrolysis.',
  },
  {
    kind: 'open',
    prompt:
      'Why should you check assembly annotations before calling two neighboring chains partners?',
    model:
      'In a crystal, chains can pack against each other only because of the lattice. Biological evidence and assembly annotations show which interfaces exist in the functional protein.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Primary, secondary, tertiary, and quaternary are distinct levels.',
      'Helices and sheets are backbone hydrogen-bond patterns.',
      '==Denaturation disrupts the fold, not necessarily the sequence.==',
      'Crystal contacts are not automatically biological.',
    ],
  },
]);

const chemistry = defineDeck('prot-u4-l1', [
  {
    kind: 'title',
    title: 'Amino-acid chemistry, folding, and stability',
    subtitle: 'Side-chain chemistry, water, and the landscape a chain folds across.',
    objectives: [
      'Classify side chains with attention to context.',
      'Explain the hydrophobic effect.',
      'Use 3D geometry for interaction claims.',
      'Separate stability from folding kinetics.',
    ],
    image: 'prot-amino-acids',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: do hydrophobic side chains form bonds with each other?',
    options: [
      'Yes, covalent bonds',
      'No, it is mostly a solvent effect',
      'Only in membranes',
      'Not sure yet',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Side-chain chemistry',
    image: 'prot-amino-acids',
    caption:
      'Amino acids share a backbone but differ in side chains: **charged, polar, special cases, and hydrophobic**. Categories are ==useful, not absolute==.',
    bullets: [
      'Protonation depends on **pH and local environment**.',
      '**Glycine** is unusually flexible; **proline** constrains the backbone; **cysteine** can form disulfides.',
      'A buried charged group can have a shifted ionization and a special role.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each amino acid to its notable property.',
    pairs: [
      ['Glycine', 'Unusual backbone flexibility'],
      ['Proline', 'Constrains backbone geometry'],
      ['Cysteine', 'Can form disulfide links'],
      ['Aspartate', 'Acidic side chain'],
      ['Lysine', 'Basic side chain'],
    ],
    explanation: 'Side chains give chemical diversity; context still decides behavior.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'The hydrophobic effect',
    bullets: [
      'In water, ==burying nonpolar groups favors folding== through solvent organization and free energy.',
      'It is **not a new covalent bond** between hydrophobic residues.',
      '**Membrane proteins** can expose nonpolar surfaces to lipid.',
      'Counting nonpolar residues cannot identify the native structure.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Why can a membrane protein have nonpolar residues on its outer surface?',
    options: [
      'That surface faces the nonpolar interior of the lipid bilayer',
      'Membrane proteins do not fold',
      'Nonpolar residues are always on the surface',
      'Lipids are polar',
    ],
    answer: 0,
    explanation: 'Favorable packing depends on the surroundings, not only the protein.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Interaction geometry',
    bullets: [
      '**Hydrogen bonds** need suitable donors, acceptors, and geometry.',
      '**Ionic interactions** depend on charge state and screening.',
      '**Van der Waals** contacts favor packing but resist overlap; **disulfides** are covalent.',
      'A 2D drawing can mislead: use ==real 3D distances and chemistry==.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Is each interaction covalent or noncovalent?',
    bins: ['Covalent', 'Noncovalent'],
    items: [
      ['Disulfide bond', 0],
      ['Peptide bond', 0],
      ['Salt bridge', 1],
      ['Hydrogen bond', 1],
      ['Van der Waals contact', 1],
    ],
    explanation: 'Only disulfide and peptide bonds share electrons covalently here.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Stability versus folding rate',
    columns: ['Idea', 'Concerns', 'Caution'],
    rows: [
      ['**Stability**', 'Relative free energy of states', 'Depends on conditions'],
      ['**Folding rate**', 'Pathways and barriers', 'A stable protein ==may fold slowly=='],
      ['**Chaperones**', 'Prevent aggregation, aid folding', 'Do not change the sequence'],
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'A structure forms quickly. What does that tell you about its stability?',
    options: [
      'Nothing by itself: rate and stability are different questions',
      'It must be the most stable state',
      'It must be unstable',
      'It cannot be the native state',
    ],
    answer: 0,
    explanation: 'Rate depends on barriers; stability compares free energies of states.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Perturbations',
    bullets: [
      '**Temperature, pH, salt, and mutations** shift competing interactions.',
      'A salt bridge can ==become unfavorable if protonation changes==.',
      'Mutation effects depend on **position, packing, dynamics, and function**.',
      'Separate a plausible hypothesis from a validated prediction.',
    ],
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Virtual contacts',
    bullets: [
      'The lab counts **nonadjacent residues within a geometric cutoff**.',
      'More compaction usually raises the count, but ==does not prove stability==.',
      'It lacks solvent, atom-level, and energy information.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt:
      'The lab’s contact count rises when you compact the chain. Which conclusions are justified?',
    options: [
      'More residues lie within the geometric cutoff',
      'The protein is now more stable',
      'New covalent bonds formed',
      'The count alone cannot judge folding correctness',
    ],
    answers: [0, 3],
    explanation: 'The count is geometric; stability needs energy and solvent information.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: a buried leucine',
    problem: 'A buried leucine is replaced by a charged residue. Predict cautiously.',
    steps: [
      'Identify the **new charge** and possible protonation.',
      'Consider **burial, packing, water access**, and nearby partners.',
      'Propose altered stability or function and **test experimentally**.',
    ],
    conclusion: '==Chemistry suggests hypotheses, not guaranteed outcomes.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Hydrophobic effect',
        back: 'Solvent-linked free-energy contribution involving nonpolar groups.',
      },
      { front: 'Disulfide', back: 'Covalent cysteine–cysteine linkage.' },
      { front: 'Stability', back: 'Relative favorability of states under conditions.' },
      {
        front: 'Chaperone',
        back: 'Protein assisting productive folding or preventing aggregation.',
      },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A disulfide links two {0} residues. The hydrophobic effect is driven largely by {1}, and pH matters because it changes {2}.',
    blanks: ['cysteine', 'water', 'protonation'],
    distractors: ['glycine', 'lipids', 'sequence'],
    explanation: 'Cys–Cys covalent link; solvent organization; charge states shift with pH.',
  },
  {
    kind: 'open',
    prompt: 'Explain the difference between a protein’s stability and how fast it folds.',
    model:
      'Stability compares the free energy of the native state with alternatives under given conditions. Folding rate depends on the pathways and barriers between states, so a stable protein can still fold slowly.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Side-chain categories are useful but context-dependent.',
      'The hydrophobic effect is a solvent effect, not a bond.',
      '==Use real 3D distances and chemistry for interaction claims.==',
      'Stability and folding rate are separate questions.',
    ],
  },
]);

export const decks: Deck[] = [purpose, synthesis, levels, chemistry, ...proteinDecksViruses];
