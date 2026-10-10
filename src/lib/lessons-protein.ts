import { buildCourse } from './lesson-course-builder.ts';
import { chapter as c } from './course-authoring.ts';
export const proteinLessons = buildCourse({
  eventId: 'protein-modeling',
  eventName: 'Protein Modeling',
  prefix: 'prot',
  lab: 'protein',
  syllabus: 'Protein Modeling C SciConnect Syllabus 2026 - Google Docs.pdf',
  intro:
    'Eight units connect protein synthesis, structure, folding, influenza hemagglutinin, molecular viewing, and model communication. Influenza is the supplied syllabus’s case study, not a claim about the currently assigned competition protein. The interactive chain is an original synthetic schematic, not an experimental hemagglutinin structure or a JUDE replacement.',
  references: [
    { title: 'RCSB PDB-101: Hemagglutinin', url: 'https://pdb101.rcsb.org/motm/076' },
    {
      title: 'PDB-101: Biological assemblies',
      url: 'https://pdb101.rcsb.org/learn/guide-to-understanding-pdb-data/biological-assemblies',
    },
    { title: 'Jmol documentation', url: 'https://jmol.sourceforge.net/docs/' },
  ],
  chapters: [
    c(
      'Event evidence, reference design, and model purpose',
      [
        'Separate a model from molecular evidence.',
        'Plan an indexed reference.',
        'Verify assigned structure and requirements.',
      ],
      [
        [
          'What a model communicates',
          'A physical or digital protein model encodes selected structural relationships. It is not the molecule itself and may exaggerate features for readability. A backbone trace emphasizes chain path, while atoms, bonds, surfaces, and cartoons answer different questions. Define the model’s purpose before adding colors or labels. A visually impressive model can be scientifically weak if chain identity, residue numbering, or the evidence behind a highlighted interaction is unclear.',
        ],
        [
          'Rules and course scope',
          'The supplied syllabus organizes a course around foundations, influenza, viewing software, and a pre-build. Applicable competition documents determine the assigned protein, allowed resources, construction limits, and scoring criteria. Do not infer this year’s assignment from an old structure or a course heading. Record the version and source of requirements. This course teaches a verification workflow rather than inventing an official rubric or treating influenza as a permanent event topic.',
        ],
        [
          'Structural identifiers',
          'A PDB identifier names an entry, not automatically a single chain or a complete functional assembly. Specify chain, residue range, insertion codes where relevant, and whether numbering follows the deposited structure or reference sequence. Missing residues can create gaps. A model that joins a missing loop smoothly may communicate an unsupported conformation. Distinguish observed coordinates, modeled additions, and annotations explicitly.',
        ],
        [
          'Reference organization',
          'Build sections for amino-acid chemistry, secondary structure, folding interactions, biological function, and the assigned structure. Keep annotated diagrams beside source identifiers and a legend. An interaction note should identify residues, distance criterion, chemical rationale, and uncertainty. Use an index that retrieves a concept quickly. Select information that helps explain structure and function rather than administrative details.',
        ],
        [
          'Evidence hierarchy',
          'Sequence establishes residue order, structural coordinates describe an experimental or predicted arrangement, and functional experiments address biological activity. One type does not automatically prove another. A close pair of atoms may suggest an interaction but needs chemical and geometric support. A colored patch does not prove an active site. Separate direct observations from interpretations and identify the evidence needed for a stronger claim.',
        ],
        [
          'Virtual investigation',
          'The synthetic chain lets you rotate a projection, highlight regions, and compare compact versus extended arrangements. Its contact count is a geometric teaching measure, not a folding-energy calculation. Use it to explain representation choices and visibility. A real protein analysis requires the correct coordinate file, biological context, and validated annotations. Record the question a representation answers and one feature it hides.',
        ],
      ],
      [
        ['Backbone trace', 'Representation of the chain path.'],
        ['PDB entry', 'Deposited structure record with identifiers and metadata.'],
        ['Annotation', 'Evidence-linked description of a feature.'],
        ['Assembly', 'Functional or proposed arrangement of molecular components.'],
      ],
      [
        'A structure entry has chains A and B and a gap at residues 40–45. Plan a model label.',
        [
          'Identify the chosen chain and numbering.',
          'Mark the missing segment as unobserved rather than inventing its shape.',
          'State whether the displayed chains form the relevant assembly.',
        ],
        'Clear labels preserve evidence limits.',
      ],
      [
        [
          'A PDB identifier alone fixes the chosen chain?',
          'No',
          ['Always', 'Only for viruses', 'Only for enzymes'],
          'Entries can contain multiple components.',
        ],
        [
          'An unsupported missing loop should be…',
          'Marked as missing or modeled',
          [
            'Presented as directly observed',
            'Deleted from the sequence silently',
            'Called an active site',
          ],
          'Distinguish evidence from additions.',
        ],
        [
          'A model’s first design decision is…',
          'Its scientific purpose',
          ['Its price', 'Its teacher name', 'Maximum decoration'],
          'Representation follows the question.',
        ],
      ],
      [
        [
          'Why verify current requirements?',
          'Assigned proteins and construction constraints can differ from a supplied course case study.',
        ],
        [
          'What should an interaction annotation include?',
          'Residue identity, geometry, chemical rationale, source, and limitations.',
        ],
        ['Why use a legend?', 'Colors and symbols have no universal meaning without definitions.'],
        [
          'What does the synthetic lab not prove?',
          'An actual protein’s conformation, energy minimum, or biological function.',
        ],
      ],
      [
        ['Question', 'Define the biological or structural claim.'],
        ['Represent', 'Choose chain, features, and legend.'],
        ['Support', 'Link every claim to evidence.'],
      ],
      [
        ['Sequence', 'Residue order', 'Not full conformation.'],
        ['Coordinates', 'Spatial model', 'May contain gaps.'],
        ['Function', 'Biological behavior', 'Needs more than a colored structure.'],
      ],
      'Rotate the synthetic chain and highlight a region. Explain how a different view changes visibility without changing connectivity.',
      'Scientific models should make both their evidence and their omissions visible.',
    ),
    c(
      'Protein synthesis and diverse functions',
      [
        'Trace DNA information to polypeptide.',
        'Distinguish template and coding strands.',
        'Connect sequence changes to possible function.',
      ],
      [
        [
          'Information flow',
          'Transcription uses a DNA template to synthesize RNA, and translation reads mRNA codons to build a polypeptide. In eukaryotes, RNA processing commonly includes capping, splicing, and polyadenylation before translation. A gene does not always encode a protein; some products are functional RNAs. Separate the molecule carrying information from the enzyme performing a step. The information sequence is not a direct mechanical drawing of the final folded shape.',
        ],
        [
          'Directionality',
          'Nucleic-acid synthesis proceeds 5′ to 3′ while the template is read in the opposite direction. The mRNA sequence resembles the coding strand with U replacing T, subject to processing. Translation proceeds through codons in the reading frame, producing a chain from amino to carboxyl terminus. A reverse-complement error can produce a plausible-looking but incorrect sequence. Label strand orientation before copying letters or using a codon table.',
        ],
        [
          'Translation machinery',
          'Ribosomes coordinate mRNA and charged tRNAs, while aminoacyl-tRNA synthetases connect amino acids to appropriate tRNAs. Start and stop signals depend on the biological context; stop codons do not encode ordinary amino acids. Peptide-bond formation extends the chain and releases uncharged tRNA for reuse. A codon specifies an amino acid within a code and reading frame, not an independently folded structural unit.',
        ],
        [
          'Functions',
          'Proteins act as enzymes, receptors, channels, transporters, structural components, motors, and immune recognition molecules. Many functions require cofactors, partners, membranes, or post-translational modifications. A sequence motif can suggest a function but should be checked against structure and experiments. Different conformational states can support binding and catalysis. Static coordinates capture a particular state or ensemble description rather than every movement during function.',
        ],
        [
          'Changes after synthesis',
          'Proteins may be cleaved, modified, targeted to compartments, assembled with partners, or degraded. Signal peptides and processing can make mature-protein numbering differ from the original translated sequence. Glycosylation can influence folding, trafficking, and recognition. Do not assume every atom in a biological protein is represented in a given structure. Deposited models may omit flexible regions or modifications that were absent or unresolved in the experiment.',
        ],
        [
          'Sequence to inference',
          'A substitution may change charge, size, hydrogen bonding, or flexibility, but its effect depends on location and context. A synonymous DNA change preserves the encoded amino acid but can still have effects through expression or RNA biology in some contexts. Avoid declaring every mutation harmful or every conserved residue catalytic. Build a mechanistic hypothesis and name an experiment that could test it.',
        ],
      ],
      [
        ['Codon', 'Three-nucleotide unit read in a translation frame.'],
        ['Template strand', 'DNA strand read to synthesize complementary RNA.'],
        ['Peptide bond', 'Covalent linkage between amino-acid residues.'],
        ['Post-translational modification', 'Chemical change after polypeptide synthesis.'],
      ],
      [
        'Coding DNA is 5′-ATG GAA TAA-3′. Give simple unprocessed mRNA and translated product.',
        [
          'Replace T with U: 5′-AUG GAA UAA-3′.',
          'Read from AUG in the stated frame.',
          'Met–Glu, followed by a stop signal.',
        ],
        'The example omits eukaryotic processing.',
      ],
      [
        [
          'Translation builds a chain from…',
          'N terminus toward C terminus',
          ['C toward N', 'Both ends randomly', 'DNA ends directly'],
          'Peptides have directionality.',
        ],
        [
          'A stop codon ordinarily specifies…',
          'Termination',
          ['One universal amino acid', 'A glycan', 'A DNA base'],
          'It is a signal.',
        ],
        [
          'A protein may require…',
          'Partners or modifications',
          ['Only its name', 'No folding', 'No chemical environment'],
          'Function is contextual.',
        ],
      ],
      [
        [
          'Why label 5′ and 3′?',
          'Orientation determines the correct complement and reading frame.',
        ],
        [
          'What does a tRNA do?',
          'It links codon recognition with delivery of its attached amino acid.',
        ],
        [
          'Why can mature numbering differ?',
          'Signal peptides or other segments may be cleaved and annotations can use different references.',
        ],
        [
          'How would you test a functional substitution?',
          'Compare a controlled mutant and reference in an appropriate binding or activity assay.',
        ],
      ],
      [
        ['Transcribe', 'Synthesize and process RNA.'],
        ['Translate', 'Read codons and extend a polypeptide.'],
        ['Mature', 'Fold, modify, and assemble for function.'],
      ],
      [
        ['DNA', 'Information template', 'Not the protein shape.'],
        ['mRNA', 'Translation message', 'Frame and processing matter.'],
        ['Protein', 'Functional molecule', 'Context and modifications matter.'],
      ],
      'Highlight a residue in the chain. Explain why changing its chemistry does not specify one inevitable functional outcome.',
      'Sequence constrains proteins, while processing and environment shape their functional forms.',
    ),
    c(
      'Structural levels and denaturation',
      [
        'Distinguish four structural levels.',
        'Identify backbone hydrogen-bond patterns.',
        'Explain denaturation without assuming peptide cleavage.',
      ],
      [
        [
          'Primary structure',
          'Primary structure is amino-acid sequence and associated covalent connectivity. Peptide bonds are largely planar, constraining backbone rotation to other bond angles. Side chains provide chemical diversity. A sequence change can influence higher structure but does not guarantee complete loss of function. Distinguish a residue’s identity from its conformation and from its position in a three-dimensional coordinate model.',
        ],
        [
          'Secondary structure',
          'Alpha helices and beta sheets involve recurring backbone hydrogen-bond patterns. A typical alpha helix has backbone hydrogen bonding between residues i and i+4. Beta strands align into parallel or antiparallel sheets. Turns and loops connect regular elements and can have important functions. A coil label does not mean a segment is biologically meaningless or completely random. Cartoon representations summarize these patterns while hiding many atoms.',
        ],
        [
          'Tertiary structure',
          'Tertiary structure describes the overall three-dimensional arrangement of one polypeptide. Domains can form recognizable structural and functional units, while motifs are smaller recurring arrangements. Hydrophobic packing, hydrogen bonds, ionic interactions, van der Waals contacts, and sometimes disulfide bonds contribute. Their importance depends on environment and location. A surface residue and buried residue of the same identity can have different structural roles.',
        ],
        [
          'Quaternary structure',
          'Quaternary structure describes the arrangement of multiple polypeptide subunits in an assembly. Not every protein has it. Identical subunits can form a homomer, while different subunits form a heteromer. Crystal contacts are not automatically biological interfaces. Compare deposited assembly annotations and biological evidence before interpreting every neighboring chain as a functional partner. A single chain view can omit a crucial interface.',
        ],
        [
          'Denaturation',
          'Denaturation disrupts native structure and often function through heat, pH, solvents, or other conditions. It does not necessarily break peptide bonds or change amino-acid sequence. Reversibility depends on the protein and conditions; aggregation can prevent return to the native state. A denatured chain is not always a completely straight line. Distinguish loss of native interactions from hydrolysis of the backbone and from degradation.',
        ],
        [
          'Representation choices',
          'A backbone trace highlights connectivity, a cartoon emphasizes secondary structure, and a surface can reveal pockets or accessibility. Each omits information. The synthetic lab’s compact/extended setting illustrates altered geometry without a physical denaturation prediction. Rotation changes projection, while changing compaction changes the teaching coordinates. Explain which structural level is depicted and which actual molecular evidence would be needed to label a helix or sheet.',
        ],
      ],
      [
        ['Primary', 'Residue sequence and covalent connectivity.'],
        ['Secondary', 'Recurring local backbone organization.'],
        ['Tertiary', 'Overall arrangement of one chain.'],
        ['Quaternary', 'Arrangement of multiple polypeptide subunits.'],
      ],
      [
        'Heating disrupts activity but the amino-acid sequence remains intact. What changed?',
        [
          'Primary sequence need not change.',
          'Higher-order interactions and native conformation can be disrupted.',
          'Loss of function is consistent with denaturation, not proof of peptide hydrolysis.',
        ],
        'Structural levels separate different claims.',
      ],
      [
        [
          'Alpha-helix H bonds mainly involve…',
          'Backbone groups',
          ['Only sulfur atoms', 'Only DNA bases', 'Only neighboring side-chain colors'],
          'Regular backbone patterns define the helix.',
        ],
        [
          'Quaternary structure requires…',
          'Multiple polypeptide subunits',
          ['Exactly four atoms', 'Only one residue', 'No interfaces'],
          'The term does not mean four subunits.',
        ],
        [
          'Denaturation always cleaves peptide bonds?',
          'No',
          ['Always', 'Only for helices', 'Only at neutral pH'],
          'Connectivity can remain intact.',
        ],
      ],
      [
        [
          'Compare motif and domain.',
          'A motif is a recurring arrangement; a domain is a larger structural/functional unit.',
        ],
        ['Why inspect assembly annotations?', 'Crystal neighbors may not be biological partners.'],
        [
          'Why is a loop not meaningless?',
          'Loops can form binding sites, switches, or connectors.',
        ],
        ['What does a cartoon hide?', 'Many atom-level details and side-chain contacts.'],
      ],
      [
        ['Sequence', 'Define residue order.'],
        ['Fold', 'Arrange local and overall structure.'],
        ['Assemble', 'Form relevant multichain interactions.'],
      ],
      [
        ['Rotation', 'Changes viewing angle', 'Does not change connectivity.'],
        ['Denaturation', 'Changes native structure', 'Need not cleave backbone.'],
        ['Assembly', 'Multiple chains', 'Not every crystal contact.'],
      ],
      'Compare compact and extended schematic chains, then rotate each. Distinguish coordinate change from projection change.',
      'Protein structure has multiple levels that should not be collapsed into one shape label.',
    ),
    c(
      'Amino-acid chemistry, folding, and stability',
      [
        'Classify side-chain properties with context.',
        'Explain the hydrophobic effect.',
        'Separate stability from folding kinetics.',
      ],
      [
        [
          'Residue chemistry',
          'Amino acids share a backbone but differ in side chains. Nonpolar, polar, acidic, and basic groupings are useful, with protonation depending on pH and local environment. Glycine has unusual flexibility, proline constrains backbone geometry, and cysteine can form disulfide links under suitable conditions. Categories are not absolute behavior labels. A charged group buried in a protein can have shifted ionization and a specialized role.',
        ],
        [
          'Hydrophobic effect',
          'In aqueous environments, burying nonpolar groups can favor folding through changes in solvent organization and free energy. It is not a new covalent bond between hydrophobic residues. Membrane proteins face different environments from soluble proteins, so exposed nonpolar surfaces can be appropriate within a lipid bilayer. Explain both the protein and its surroundings when discussing favorable packing. A simple count of nonpolar residues cannot identify the exact native structure.',
        ],
        [
          'Interaction geometry',
          'Hydrogen bonds depend on suitable donors, acceptors, and geometry. Ionic interactions depend on charge state and screening. Van der Waals contacts favor appropriate packing but resist severe overlap. Disulfide bonds are covalent links between cysteine residues, with context-dependent formation. A two-dimensional drawing can make distant residues appear close or hide nearby ones. Use actual three-dimensional distances and chemistry for a real contact claim.',
        ],
        [
          'Free-energy landscape',
          'Folding can be described through many conformations and a free-energy landscape. Stability compares native and alternative states under specified conditions; folding rate concerns pathways and barriers. A stable protein may fold slowly, and a quickly formed structure need not be the most stable state. Chaperones can help prevent aggregation or guide productive folding without encoding a new amino-acid sequence. Avoid treating folding as one universal deterministic zipper.',
        ],
        [
          'Perturbations',
          'Temperature, pH, salt, and mutations can change competing interactions and solvent effects. A salt bridge may stabilize one conformation but become unfavorable if protonation changes. Mutation effects depend on position, packing, dynamics, and function. A single geometric contact count is not a full free-energy model. Distinguish a plausible mechanistic hypothesis from a validated prediction, especially when interpreting an unfamiliar protein.',
        ],
        [
          'Virtual contacts',
          'The lab counts nonadjacent schematic residues within a declared geometric cutoff. Increasing compaction often increases this count, but it does not establish favorable contacts, actual bonds, or correct folding. Highlight charged and nonpolar categories to ask where each might occur in a soluble or membrane protein. Explain what solvent, atom-level, and energy information is missing before drawing a stability conclusion.',
        ],
      ],
      [
        [
          'Hydrophobic effect',
          'Solvent-linked free-energy contribution involving nonpolar groups.',
        ],
        ['Disulfide', 'Covalent cysteine–cysteine linkage.'],
        ['Stability', 'Relative favorability of states under conditions.'],
        ['Chaperone', 'Protein assisting productive folding or preventing aggregation.'],
      ],
      [
        'A buried leucine is replaced by a charged residue. Predict cautiously.',
        [
          'Identify the new charge and possible protonation.',
          'Consider burial, packing, water access, and nearby partners.',
          'Propose altered stability or function and test experimentally.',
        ],
        'Chemistry suggests hypotheses, not a guaranteed outcome.',
      ],
      [
        [
          'Hydrophobic attraction is a new covalent bond?',
          'No',
          ['Always', 'Only between leucines', 'Only in water'],
          'Solvent free energy matters.',
        ],
        [
          'A disulfide links…',
          'Cysteines',
          ['Any two glycines', 'DNA bases', 'Two phosphate groups'],
          'Cysteine sulfur forms the link.',
        ],
        [
          'More geometric contacts prove greater stability?',
          'No',
          ['Always', 'Only in cartoons', 'Only for enzymes'],
          'Contact quality and environment matter.',
        ],
      ],
      [
        [
          'Why does pH matter?',
          'It changes protonation and interactions, often in context-dependent ways.',
        ],
        [
          'Contrast rate and stability.',
          'Rate concerns barriers and pathways; stability concerns relative free energies.',
        ],
        [
          'Why are membrane proteins different?',
          'Their nonpolar surfaces can interact favorably with lipid rather than bulk water.',
        ],
        [
          'What is missing from the lab’s contact count?',
          'Atom identities, solvent, charge states, bond geometry, and an energy model.',
        ],
      ],
      [
        ['Chemistry', 'Identify side-chain and solvent properties.'],
        ['Interactions', 'Evaluate geometry and competing effects.'],
        ['States', 'Separate relative stability from transition rates.'],
      ],
      [
        ['Contact', 'Geometric proximity', 'Not necessarily favorable.'],
        ['Bond', 'Specific chemical interaction', 'Needs appropriate evidence.'],
        ['Stability', 'Free-energy comparison', 'Not a count of colored dots.'],
      ],
      'Change compaction and contact cutoff independently. Record the count and explain why neither alone measures folding energy.',
      'Protein folding is a competition among interactions, solvent effects, and accessible conformations.',
    ),
    c(
      'Viruses, entry, and immune recognition',
      [
        'Trace a viral infection cycle.',
        'Distinguish innate and adaptive responses.',
        'Connect surface proteins to recognition.',
      ],
      [
        [
          'Viral components',
          'Viruses contain a genome and protective structural components, sometimes including a lipid envelope. They depend on host processes for replication and differ in genome type, entry mechanism, and assembly. An envelope does not make every virus identical. Distinguish a virion, an infected cell, and a purified viral protein. A structure of one protein cannot by itself describe the whole infection cycle.',
        ],
        [
          'Entry and replication',
          'Attachment recognizes suitable host features, followed by entry, genome release, replication or expression, assembly, and release through virus-specific pathways. Receptor binding and membrane fusion are different steps. A protein can change conformation during entry, making one static structure incomplete. Influenza provides one example, but its details should not be generalized to all viruses. Sequence, cellular context, and experimental conditions influence what a structure explains.',
        ],
        [
          'Innate defenses',
          'Innate responses include physical barriers, pattern-recognition mechanisms, interferon signaling, and cellular responses. They can act rapidly without the same antigen-specific memory mechanism as adaptive immunity. Inflammation is a coordinated response rather than evidence of one unique pathogen. Molecular recognition depends on shape and chemistry, not a lock-and-key cartoon alone. A lesson on immune mechanisms does not diagnose an infection from symptoms or from a structural image.',
        ],
        [
          'Adaptive recognition',
          'B cells and antibodies recognize particular molecular features, while T-cell responses depend on peptide presentation and other context. Antibody binding may block attachment or fusion, recruit other mechanisms, or have limited functional effect. Binding alone is not proof of neutralization. Memory can alter later responses. Distinguish an epitope, the recognized molecular feature, from an antibody’s binding region and from the entire antigen molecule.',
        ],
        [
          'Evolution and escape',
          'Variation can change receptor interactions, antibody recognition, stability, or replication, sometimes with tradeoffs. A substitution near an epitope suggests a possible effect but requires binding or functional evidence. Not every surface change causes immune escape, and not every conserved residue is directly recognized. Compare sequences and structures in the proper biological assembly and account for glycans or missing regions before making a mechanistic claim.',
        ],
        [
          'Model communication',
          'Use a labeled chain or surface to distinguish receptor-binding and antibody-associated regions when supported by actual annotations. The synthetic lab highlights generic regions only; it does not assign real viral epitopes. Explain how accessibility changes with assembly or view and what data would validate an interaction. This course addresses molecular biology and historical examples, not prevention or treatment advice.',
        ],
      ],
      [
        ['Virion', 'Virus particle.'],
        ['Epitope', 'Molecular feature recognized by an immune receptor or antibody.'],
        ['Neutralization', 'Reduction of infectivity through a relevant mechanism.'],
        ['Conformational change', 'Change in molecular arrangement.'],
      ],
      [
        'An antibody binds a viral protein in an assay. Does that prove neutralization?',
        [
          'Binding establishes an interaction under assay conditions.',
          'Neutralization requires a functional infectivity-related test.',
          'Consider whether binding blocks a relevant entry or replication step.',
        ],
        'Interaction and function are distinct evidence.',
      ],
      [
        [
          'Attachment and fusion are…',
          'Different entry-related steps',
          ['Always identical', 'Only DNA processes', 'Absent in all enveloped viruses'],
          'They involve different mechanisms.',
        ],
        [
          'An epitope is…',
          'A recognized molecular feature',
          ['The entire immune system', 'Every viral genome', 'A unit of salinity'],
          'Recognition can target part of a molecule.',
        ],
        [
          'Binding alone proves neutralization?',
          'No',
          ['Always', 'Only for any antibody', 'Only in a diagram'],
          'Function needs additional evidence.',
        ],
      ],
      [
        [
          'Name an innate mechanism.',
          'Pattern recognition or interferon signaling, among other defenses.',
        ],
        ['Why inspect conformational states?', 'Entry proteins can rearrange during function.'],
        [
          'What can mutation change?',
          'Binding, stability, processing, or recognition depending on context.',
        ],
        [
          'Why not assign epitopes from the synthetic lab?',
          'It has no experimental viral sequence or validated interaction annotations.',
        ],
      ],
      [
        ['Attach', 'Recognize suitable host features.'],
        ['Enter', 'Change state and deliver the genome.'],
        ['Respond', 'Host recognition and viral variation interact.'],
      ],
      [
        ['Binding', 'Molecular interaction', 'Not automatic neutralization.'],
        ['Structure', 'One state or model', 'Not the entire infection cycle.'],
        ['Variation', 'Changes sequence', 'Effects require context.'],
      ],
      'Highlight a generic surface region and rotate the model. Explain what would establish its role in receptor or antibody binding.',
      'Viral protein models support mechanism only when linked to biological and functional evidence.',
    ),
    c(
      'Influenza H1N1 and hemagglutinin',
      [
        'Explain HA attachment and fusion roles.',
        'Distinguish drift and reassortment.',
        'Place the 2009 case study in historical context.',
      ],
      [
        [
          'Influenza organization',
          'Influenza A has a segmented RNA genome and an envelope bearing proteins including hemagglutinin, HA, and neuraminidase, NA. H and N labels classify these surface proteins rather than every genomic difference. HA contributes to attachment and membrane fusion, while NA has a distinct role related to sialic-acid cleavage and virus release. Do not assign every viral process to the most visually prominent protein in a model.',
        ],
        [
          'The 2009 case',
          'The 2009 H1N1 pandemic is a historical case for studying viral evolution, surveillance, and molecular function. Its genome reflected reassortment history, illustrating why segmented genomes can exchange segments when conditions allow coinfection. This lesson does not summarize current outbreak status. Distinguish historical description from present epidemiology and separate lineage relationships from a simplistic claim that one surface-protein name fully defines a virus.',
        ],
        [
          'HA structure',
          'Hemagglutinin commonly forms a trimeric assembly, with receptor-binding and fusion-related regions. Proteolytic processing creates functionally important subunits connected within the mature protein arrangement. Structural numbering can differ among precursor, mature chain, subtype, and deposited model. Use entry-specific annotations rather than assuming one residue number means the same site in every HA. Glycosylation and unresolved regions can affect what is visible in a structure.',
        ],
        [
          'Attachment and fusion',
          'HA recognizes sialic-acid-containing host features, with specificity depending on viral and host context. Acidic endosomal conditions can trigger major conformational changes that expose or reposition fusion machinery. Binding and fusion are separate mechanistic claims, and static prefusion coordinates do not show every transition. A useful model distinguishes receptor-associated features, membrane orientation, and the fusion-related region with a clear evidence-based legend.',
        ],
        [
          'Drift and reassortment',
          'Antigenic drift involves accumulated changes that can alter recognition. Reassortment exchanges genome segments and is distinct from one point mutation; large antigenic changes can arise in relevant influenza contexts. Effects are not determined by the vocabulary alone. Sequence changes, structural location, immune recognition, and functional fitness all matter. A highlighted residue near a binding region is a hypothesis-generating observation, not sufficient proof of altered transmission or immunity.',
        ],
        [
          'Structural interpretation',
          'Consult a real HA entry and its biological assembly, chains, ligands, method, and missing residues. A trimer viewed as one chain can hide interfaces and accessibility. Compare annotations with sequence and functional evidence. The lab remains a generic synthetic chain so it cannot be mistaken for an experimentally determined H1N1 structure. Use the linked PDB-101 article to connect the conceptual lesson to actual molecular representations.',
        ],
      ],
      [
        ['HA', 'Hemagglutinin, an influenza attachment/fusion protein.'],
        ['NA', 'Neuraminidase, a distinct influenza surface enzyme.'],
        ['Reassortment', 'Exchange of genome segments.'],
        ['Antigenic drift', 'Accumulated antigen-associated variation.'],
      ],
      [
        'A model shows one HA chain. What must be checked before describing the functional surface?',
        [
          'Inspect the relevant trimeric assembly.',
          'Verify mature-chain numbering, glycans, and missing regions.',
          'Link highlighted sites to documented function.',
        ],
        'A single-chain view can omit interfaces.',
      ],
      [
        [
          'HA contributes to…',
          'Attachment and fusion',
          ['Only genome replication', 'Only salt sensing', 'Only ATP storage'],
          'Its roles differ from NA.',
        ],
        [
          'Reassortment exchanges…',
          'Genome segments',
          ['Only individual atoms', 'Only amino-acid colors', 'Only antibodies'],
          'Segmented genomes enable this process.',
        ],
        [
          'The 2009 outbreak is used here as…',
          'A historical case study',
          ['A current case count', 'A permanent event assignment', 'A diagnosis guide'],
          'Current event scope must be verified separately.',
        ],
      ],
      [
        [
          'Why verify residue numbering?',
          'Precursor processing, subtype alignments, and deposited chains can use different references.',
        ],
        [
          'Why inspect glycans?',
          'They can affect accessibility and recognition and may be incompletely represented.',
        ],
        [
          'Distinguish drift and reassortment.',
          'Drift accumulates changes; reassortment exchanges whole segments.',
        ],
        [
          'What does a prefusion structure omit?',
          'Other conformational states and the full dynamic entry pathway.',
        ],
      ],
      [
        ['Attach', 'HA recognizes host-associated features.'],
        ['Trigger', 'Endosomal conditions favor rearrangement.'],
        ['Fuse', 'Conformational changes support membrane fusion.'],
      ],
      [
        ['HA', 'Attachment/fusion functions', 'Not all viral functions.'],
        ['NA', 'Sialic-acid cleavage role', 'Different from HA.'],
        ['Trimer', 'Assembly context', 'Single-chain views can hide interfaces.'],
      ],
      'Compare region highlights and explain why actual HA analysis requires a validated assembly rather than the generic lab chain.',
      'Hemagglutinin’s function connects sequence, assembly, processing, and conformational change.',
    ),
    c(
      'Molecular viewing and reproducible JUDE/Jmol workflows',
      [
        'Select chains and representations deliberately.',
        'Record viewing commands and identifiers.',
        'Avoid confusing display changes with molecular changes.',
      ],
      [
        [
          'Preparing a structure',
          'Start with the assigned coordinate file or documented PDB entry. Record chain identifiers, residue numbering, missing segments, and assembly choice before changing the display. JUDE is a course-mentioned viewing environment; installation and interface details may vary. The linked Jmol documentation provides the underlying command reference. This lesson teaches transferable viewing operations and does not claim the built-in schematic executes Jmol or replaces the assigned software.',
        ],
        [
          'Selection first',
          'Selection specifies which atoms or residues subsequent commands affect. A chain, residue range, or named set can be selected; syntax must match the actual viewer and file identifiers. In standard Jmol, select all resets the selection, while commands such as cartoon on and color structure change representation or coloring. Verify each operation visibly and consult the command reference for exact selection syntax rather than guessing chain names from a screenshot.',
        ],
        [
          'Representations',
          'A cartoon emphasizes helices and sheets, a backbone trace emphasizes connectivity, space-filling atoms show approximate occupied volume, and surfaces can reveal accessibility. Displaying all atoms can obscure a pocket; displaying only a cartoon can hide side-chain chemistry. Use multiple complementary views. A color-by-structure scheme encodes a classification, not measured charge or energy. Every exported image needs a legend explaining its colors and representation.',
        ],
        [
          'Orientation and distances',
          'Rotation and zoom change the camera, not the molecule’s connectivity. A projected overlap does not establish a three-dimensional contact. For a real interaction, select the relevant atoms and measure distance with units, then check chemical plausibility and geometry. Distances alone do not prove bonds or favorable energy. Compare the same structure and selection when changing views so that an accidental chain change is not interpreted as a conformational change.',
        ],
        [
          'Reproducibility',
          'Keep a command log, structure identifier, file version, assembly, selection, and view settings. Export labeled images at readable scale and retain enough context to locate highlighted residues. A future viewer should be able to recover the same scientific claim without relying on an unlabeled color patch. Separate original coordinates from display modifications and from any added modeled segments. Reset and replay the workflow as a practical check.',
        ],
        [
          'Using this lab',
          'The synthetic viewer supports rotation, compaction, residue selection, region highlighting, and a defined contact cutoff. It intentionally uses native controls rather than pretending to accept the full Jmol language. Explain which operations correspond to camera changes and which alter the generated teaching coordinates. Then write the additional metadata needed for a real HA figure. Reproducibility is as important as visual appeal.',
        ],
      ],
      [
        ['Selection', 'Subset affected by a viewing operation.'],
        ['Cartoon', 'Secondary-structure-oriented representation.'],
        ['Projection', 'Mapping three-dimensional coordinates to a display.'],
        ['Command log', 'Recorded operations for reproducibility.'],
      ],
      [
        'Plan a figure highlighting one chain’s helix region.',
        [
          'Load and verify the correct entry and chain.',
          'Choose a cartoon representation and select the documented region.',
          'Add a legend, numbering reference, and saved workflow.',
        ],
        'A useful image is reproducible and interpretable.',
      ],
      [
        [
          'Rotation changes…',
          'Viewpoint',
          ['Primary sequence', 'Chemical bonds automatically', 'PDB identifier'],
          'Camera operations preserve connectivity.',
        ],
        [
          'Color by structure shows…',
          'A structural classification',
          ['Measured free energy', 'Every atom’s charge', 'A diagnosis'],
          'The scheme needs a legend.',
        ],
        [
          'The built-in lab executes full Jmol?',
          'No',
          ['Yes', 'Only at maximum zoom', 'Only for HA'],
          'It is a synthetic native-control viewer.',
        ],
      ],
      [
        [
          'Why reset a selection?',
          'Later operations might otherwise affect only an unintended subset.',
        ],
        [
          'What should an image caption include?',
          'Entry/chain, numbering, representation, legend, and supported claim.',
        ],
        [
          'Why is projected overlap insufficient?',
          'Depth is lost in projection; atoms can appear close while spatially separated.',
        ],
        [
          'What makes a workflow reproducible?',
          'Documented input data and ordered operations with consistent identifiers.',
        ],
      ],
      [
        ['Load', 'Verify entry and assembly.'],
        ['Select', 'Choose exact molecular features.'],
        ['Explain', 'Export a labeled evidence-linked view.'],
      ],
      [
        ['Camera', 'Rotation and zoom', 'Preserves molecule.'],
        ['Representation', 'Changes visible encoding', 'May hide chemistry.'],
        ['Coordinates', 'Spatial model', 'Changing them is not merely recoloring.'],
      ],
      'Rotate through 180 degrees without changing compaction. Record what remains invariant and what becomes visible.',
      'Molecular visualization communicates evidence best when selections, legends, and workflows are explicit.',
    ),
    c(
      'Pre-build planning, annotation, and model review',
      [
        'Plan chain path and scale.',
        'Annotate functional features with evidence.',
        'Review against verified requirements.',
      ],
      [
        [
          'Planning before construction',
          'Verify the assigned chain, residue range, coordinate source, scale, and current construction requirements. Sketch the backbone route and major structural features before committing material. Identify termini and directionality so the path can be followed unambiguously. A physical model should preserve important relationships while acknowledging simplifications. Construction aesthetics should support the scientific message rather than compete with it.',
        ],
        [
          'Scale and geometry',
          'Convert molecular distances to model distances with one declared scale. Preserve relative placement of important features and avoid accidental shortcuts across missing segments. Thick materials can make nearby strands overlap or obscure loops. A physical backbone is not an atomically exact object; state what its centerline represents. A scale label and orientation guide help reviewers distinguish intended geometry from material limitations.',
        ],
        [
          'Functional annotations',
          'Choose features that support the assigned biological story: a binding region, catalytic residue, interface, modification, or conformational element where documented. Each annotation should identify residue or range, chemical role, and source. Do not add unsupported hydrogen bonds merely to make the model look intricate. If a feature is inferred, label it as such. An annotated model should teach why a location matters, not merely where it is.',
        ],
        [
          'Legends and accessibility',
          'Use a limited consistent color scheme with text labels so meaning does not depend on color alone. Avoid tiny detached labels and ambiguous arrows. A feature label should identify the exact target without hiding the backbone. Distinguish chain colors from property colors in the legend. Provide an explanation that can be followed from the model’s visible elements and does not require the creator to supply missing context verbally.',
        ],
        [
          'Review criteria',
          'Consult the actual rubric rather than inventing point values. Check scientific accuracy, chain continuity, numbering, termini, required features, construction constraints, and explanation clarity as applicable. Ask a peer to trace the chain and interpret a highlighted region without prompting. Compare the model with the verified digital view from several orientations. A discrepancy may be a projection issue, a scale error, or an unsupported coordinate assumption.',
        ],
        [
          'Revision and communication',
          'Keep an evidence log of what changed and why. If a label suggests a function that lacks support, revise the claim rather than decorating the model further. The virtual viewer can rehearse viewpoint selection and region explanations, but it cannot certify a physical pre-build against an unseen rubric. Finish with a clear biological narrative that connects sequence, structure, interactions, and function while retaining relevant uncertainty.',
        ],
      ],
      [
        ['Scale', 'Ratio between model and molecular distances.'],
        ['Terminus', 'End of a polypeptide chain.'],
        ['Interface', 'Region of interaction between components.'],
        ['Evidence log', 'Sources and reasons supporting model features.'],
      ],
      [
        'At a scale of 1 cm per Å, how long is a modeled 12 Å separation?',
        [
          'Use the stated ratio.',
          '12 Å × 1 cm/Å = 12 cm.',
          'Confirm that all other features use the same scale.',
        ],
        'A consistent scale is more useful than an unlabeled attractive shape.',
      ],
      [
        [
          'A strong annotation explains…',
          'Identity, role, and evidence',
          ['Only a color', 'Only a teacher name', 'Only material cost'],
          'Scientific interpretation needs support.',
        ],
        [
          'A missing segment should be…',
          'Explicitly marked or qualified',
          ['Silently invented', 'Called observed', 'Ignored in numbering'],
          'Preserve evidence boundaries.',
        ],
        [
          'Model review should use…',
          'The verified applicable rubric',
          ['Invented point values', 'Only appearance', 'An unrelated year automatically'],
          'Requirements are specific.',
        ],
      ],
      [
        ['Why label both termini?', 'They establish directionality and help trace the chain.'],
        [
          'What can peer tracing reveal?',
          'Ambiguous path, labels, orientation, or hidden structural features.',
        ],
        [
          'Why use text with color?',
          'It makes the legend accessible and avoids ambiguous color-only meanings.',
        ],
        [
          'What should guide a revision?',
          'A scientific discrepancy, clarity problem, or verified requirement rather than unsupported decoration.',
        ],
      ],
      [
        ['Verify', 'Confirm data and requirements.'],
        ['Build', 'Preserve scale, path, and supported features.'],
        ['Review', 'Test interpretation from multiple views.'],
      ],
      [
        ['Geometry', 'Spatial relationships', 'Material thickness can distort them.'],
        ['Annotation', 'Scientific meaning', 'Needs sources and numbering.'],
        ['Rubric', 'Task requirements', 'Must be verified for the assignment.'],
      ],
      'Select a region and write a model label that states both the intended feature and what the synthetic chain cannot establish.',
      'A successful model links readable geometry to a supported biological explanation.',
    ),
  ],
});
