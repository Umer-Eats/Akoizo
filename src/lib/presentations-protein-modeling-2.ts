import { defineDeck } from './presentation-types.ts';

// Protein Modeling (Division C) units 5–8: viruses and immunity, influenza hemagglutinin,
// molecular viewing, and pre-build planning.

const viruses = defineDeck('prot-u5-l1', [
  {
    kind: 'title',
    title: 'Viruses, entry, and immune recognition',
    subtitle: 'How a virus gets in, and how surface proteins get recognized.',
    objectives: [
      'Trace a viral infection cycle.',
      'Separate attachment from membrane fusion.',
      'Distinguish innate and adaptive responses.',
      'Separate antibody binding from neutralization.',
    ],
    image: 'prot-flu-3d',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: if an antibody sticks to a virus, is the virus always stopped?',
    options: ['Yes', 'No', 'Only for influenza', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Viral components',
    image: 'prot-flu-3d',
    caption:
      'An influenza **virion**: a lipid envelope studded with **hemagglutinin and neuraminidase** spikes around the ==RNA genome segments==.',
    bullets: [
      'Viruses carry a **genome** and protective structural components, sometimes an **envelope**.',
      'They depend on **host processes** to replicate.',
      'A structure of one protein cannot describe the whole infection cycle.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Which pair is correctly distinguished?',
    options: [
      'A virion is a virus particle; a purified viral protein is one component',
      'A virion and an infected cell are the same thing',
      'Every virus has a lipid envelope',
      'Viruses replicate without host processes',
    ],
    answer: 0,
    explanation: 'Keep the particle, the infected cell, and an isolated protein separate.',
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order the general steps of a viral infection cycle.',
    items: [
      'Attachment to host features',
      'Entry',
      'Genome release',
      'Replication and expression',
      'Assembly',
      'Release',
    ],
    explanation:
      'Specific pathways differ by virus, but the general sequence runs from attachment to release.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Entry and replication',
    bullets: [
      '**Receptor binding** and **membrane fusion** are different steps.',
      'Entry proteins can ==change conformation==, so one static structure is incomplete.',
      'Influenza is one example; do not generalize its details to all viruses.',
    ],
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Innate and adaptive defenses',
    columns: ['Feature', 'Innate', 'Adaptive'],
    rows: [
      ['Speed', '**Rapid**', 'Slower at first'],
      ['Examples', 'Barriers, pattern recognition, interferon', 'B cells, antibodies, T cells'],
      ['Memory', 'Not antigen-specific', '==Antigen-specific memory=='],
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Is each defense innate or adaptive?',
    bins: ['Innate', 'Adaptive'],
    items: [
      ['Skin and mucous barriers', 0],
      ['Interferon signaling', 0],
      ['Antibodies against a specific epitope', 1],
      ['Pattern-recognition receptors', 0],
      ['Memory B cells', 1],
    ],
    explanation:
      'Innate defenses act quickly without antigen-specific memory; adaptive ones are specific and can remember.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Antibodies and epitopes',
    image: 'prot-antibody',
    caption:
      'An antibody’s **binding sites** at the tips of its arms fit one **epitope**, a molecular feature of the antigen, ==not the whole antigen==.',
    bullets: [
      'B cells and antibodies recognize **particular molecular features**.',
      'T-cell responses depend on **peptide presentation**.',
      '==Binding alone is not proof of neutralization==.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['Epitope', 'The molecular feature recognized'],
      ['Paratope', 'The antibody’s binding region'],
      ['Antigen', 'The whole molecule bearing the epitope'],
      ['Neutralization', 'Reduced infectivity through a relevant mechanism'],
    ],
    explanation: 'Distinguish the recognized feature, the binding region, and the whole molecule.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Evolution and escape',
    bullets: [
      'Variation can change **receptor interactions, antibody recognition, stability, or replication**.',
      'A substitution near an epitope ==suggests== an effect; binding or functional data test it.',
      'Not every surface change causes escape.',
      'Account for **glycans and missing regions** before making a mechanistic claim.',
    ],
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Communicating with the model',
    bullets: [
      'Label **receptor-binding and antibody-associated regions** only when real annotations support them.',
      'The synthetic lab highlights generic regions and ==assigns no real epitopes==.',
      'Explain how accessibility changes with assembly or view.',
      'This course covers molecular biology, **not prevention or treatment advice**.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which would you need before labeling a region of your model as an antibody epitope?',
    options: [
      'Published binding or structural evidence for that region',
      'The correct assembly and accessibility',
      'A bright color',
      'A highlight from the synthetic lab',
    ],
    answers: [0, 1],
    explanation: 'Annotations need real evidence; colors and teaching highlights are not data.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: binding versus neutralization',
    problem: 'An antibody binds a viral protein in an assay. Does that prove neutralization?',
    steps: [
      'Binding establishes an **interaction under assay conditions**.',
      'Neutralization needs a **functional, infectivity-related test**.',
      'Ask whether binding blocks a relevant **entry or replication step**.',
    ],
    conclusion: '==Interaction and function are distinct evidence.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Virion', back: 'Virus particle.' },
      { front: 'Epitope', back: 'Molecular feature recognized by an immune receptor or antibody.' },
      { front: 'Neutralization', back: 'Reduction of infectivity through a relevant mechanism.' },
      { front: 'Conformational change', back: 'Change in molecular arrangement.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Attachment and {0} are different entry steps. An {1} is the feature an antibody recognizes, and binding alone does not prove {2}.',
    blanks: ['fusion', 'epitope', 'neutralization'],
    distractors: ['assembly', 'antigen', 'replication'],
    explanation: 'Separate steps of entry, the recognized feature, and the functional outcome.',
  },
  {
    kind: 'open',
    prompt: 'Why can one static structure of an entry protein be an incomplete picture?',
    model:
      'Entry proteins can change shape during attachment and fusion. One set of coordinates captures a single state, so it may not show the arrangement that carries out a later step.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Infection runs from attachment to release, with virus-specific details.',
      'Innate defenses are rapid; adaptive defenses are specific with memory.',
      '==Binding is not proof of neutralization.==',
      'Annotate epitopes only from real evidence.',
    ],
  },
]);

const influenza = defineDeck('prot-u6-l1', [
  {
    kind: 'title',
    title: 'Influenza H1N1 and hemagglutinin',
    subtitle: 'A segmented genome, a trimeric spike, and a historical case study.',
    objectives: [
      'Explain hemagglutinin’s attachment and fusion roles.',
      'Read an influenza strain name.',
      'Distinguish antigenic drift from reassortment.',
      'Check assembly and numbering before interpreting HA.',
    ],
    image: 'prot-ha-ribbon',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what do the H and N in “H1N1” refer to?',
    options: [
      'Two surface proteins',
      'Hospital and nation',
      'Two genome segments only',
      'Not sure yet',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Reading an influenza name',
    image: 'prot-flu-names',
    caption:
      'A strain name gives **type, place of origin, strain number, year, and subtype**. The ==H and N subtype== classifies two surface proteins.',
    bullets: [
      'Influenza A has a **segmented RNA genome** and an envelope.',
      '**HA** helps with attachment and membrane fusion; **NA** cleaves sialic acid and aids release.',
      'Do not assign every process to the most prominent protein.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each part of “A/Fujian/411/2002 (H3N2)” to its meaning.',
    pairs: [
      ['A', 'Virus type'],
      ['Fujian', 'Place of origin'],
      ['411', 'Strain number'],
      ['2002', 'Year isolated'],
      ['H3N2', 'Surface-protein subtype'],
    ],
    explanation: 'Strain names follow a standard pattern; the subtype names only HA and NA.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'The 2009 case',
    bullets: [
      'The **2009 H1N1 pandemic** is a ==historical case study== of viral evolution and surveillance.',
      'Its genome reflected **reassortment**, possible because segments can exchange in co-infection.',
      'This lesson does not summarize current outbreak status.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Why can influenza viruses exchange whole genome segments?',
    options: [
      'Their genome is segmented, so co-infecting viruses can package mixed sets',
      'Their genome is one continuous DNA molecule',
      'HA copies segments between viruses',
      'Segments exchange only in laboratory models',
    ],
    answer: 0,
    explanation: 'A segmented genome lets two strains in one cell produce reassorted progeny.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'HA structure',
    image: 'prot-ha-ribbon',
    caption:
      'A physical backbone model of the **hemagglutinin trimer**, each chain in its own color. HA usually works as ==three chains together==.',
    bullets: [
      'HA has **receptor-binding** and **fusion-related** regions.',
      'Proteolytic processing creates functionally important **subunits**.',
      'Numbering can differ among **precursor, mature chain, subtype, and deposited model**.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'A paper says “residue 190” of HA. Why should you check before marking residue 190 in your PDB file?',
    options: [
      'Numbering schemes differ between precursor, mature chain, and subtype',
      'PDB files have no residue numbers',
      'Residue 190 does not exist in any HA',
      'HA has only one possible numbering',
    ],
    answer: 0,
    explanation: 'Use entry-specific annotations; the same number can mean different sites.',
  },
  {
    kind: 'flow',
    section: 3,
    title: 'Attachment, then fusion',
    steps: [
      { label: 'Bind', detail: 'HA recognizes **sialic-acid-containing** host features.' },
      { label: 'Internalize', detail: 'The virus enters an **endosome**.' },
      { label: 'Acidify', detail: 'Low pH triggers a ==major conformational change==.' },
      { label: 'Fuse', detail: 'Repositioned fusion machinery merges the membranes.' },
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Why can a prefusion HA structure not show the whole entry mechanism?',
    options: [
      'Fusion involves a large conformational change after binding',
      'HA does not take part in fusion',
      'Prefusion structures show every state',
      'Binding and fusion are the same step',
    ],
    answer: 0,
    explanation: 'Static prefusion coordinates capture only one stage of a moving process.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Drift versus reassortment',
    columns: ['Process', 'What changes', 'Scale'],
    rows: [
      ['**Antigenic drift**', 'Accumulated changes in antigen sequences', 'Gradual'],
      ['**Reassortment**', '==Whole genome segments exchange==', 'Can be abrupt'],
      ['**Effect**', 'Depends on location, recognition, and fitness', 'Not set by the word alone'],
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Is each event an example of drift or reassortment?',
    bins: ['Drift', 'Reassortment'],
    items: [
      ['Point mutations build up in HA over several seasons', 0],
      ['Two strains in one cell swap their HA segments', 1],
      ['A new combination of segments from bird and swine viruses', 1],
      ['Small changes reduce binding by existing antibodies', 0],
    ],
    explanation: 'Drift accumulates changes; reassortment exchanges whole segments.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Interpreting a real HA entry',
    bullets: [
      'Check the **biological assembly, chains, ligands, method, and missing residues**.',
      'A trimer viewed as ==one chain can hide interfaces== and accessibility.',
      'Compare annotations with sequence and functional evidence.',
      'The lab’s generic chain is **not** an H1N1 structure.',
    ],
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: one chain shown',
    problem:
      'A model shows one HA chain. What must you check before describing the functional surface?',
    steps: [
      'Inspect the relevant **trimeric assembly**.',
      'Verify **mature-chain numbering, glycans, and missing regions**.',
      'Link highlighted sites to **documented function**.',
    ],
    conclusion: '==A single-chain view can omit interfaces.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'HA', back: 'Hemagglutinin, an influenza attachment/fusion protein.' },
      { front: 'NA', back: 'Neuraminidase, a distinct influenza surface enzyme.' },
      { front: 'Reassortment', back: 'Exchange of genome segments.' },
      { front: 'Antigenic drift', back: 'Accumulated antigen-associated variation.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'HA contributes to attachment and {0}. Reassortment exchanges genome {1}, and HA usually functions as a {2}.',
    blanks: ['fusion', 'segments', 'trimer'],
    distractors: ['release', 'codons', 'monomer'],
    explanation: 'HA binds and fuses; segments swap in reassortment; three chains form the spike.',
  },
  {
    kind: 'open',
    prompt: 'Why might glycans matter when you mark an antibody-binding region on HA?',
    model:
      'Sugar chains can cover parts of the surface, changing what an antibody can reach, and they are often incompletely resolved in structures.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'HA attaches and fuses; NA aids release.',
      'Strain names give type, origin, number, year, and subtype.',
      '==Drift accumulates changes; reassortment swaps segments.==',
      'Check the trimer, numbering, and glycans before interpreting HA.',
    ],
  },
]);

const viewing = defineDeck('prot-u7-l1', [
  {
    kind: 'title',
    title: 'Molecular viewing and reproducible JUDE/Jmol workflows',
    subtitle: 'Select first, display deliberately, and log every step.',
    objectives: [
      'Record identifiers before changing the display.',
      'Select chains and residues deliberately.',
      'Choose complementary representations.',
      'Keep a reproducible command log.',
    ],
    image: 'prot-jmol',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: does rotating a molecule in a viewer change its structure?',
    options: ['Yes', 'No', 'Only in 3D mode', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Preparing a structure',
    bullets: [
      'Start with the **assigned coordinate file** or documented PDB entry.',
      'Record ==chain identifiers, numbering, missing segments, and assembly== before changing the display.',
      '**JUDE** is a course-mentioned viewer; the Jmol documentation is the command reference.',
      'The built-in schematic does not run Jmol.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Selection first',
    image: 'prot-jmol',
    caption:
      'A **Jmol** view of a protein bound to DNA. Each colored part reflects a ==selection followed by a display command==.',
    bullets: [
      '**Selection** sets which atoms later commands affect.',
      'In Jmol, **select all** resets the selection; **cartoon on** and **color structure** change the display.',
      'Check the command reference rather than guessing chain names.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order the steps for coloring one chain’s helix region.',
    items: [
      'Load and verify the entry',
      'Reset the selection',
      'Select the chain and residue range',
      'Apply the cartoon and color',
      'Check the result visually',
    ],
    explanation: 'Selections control what each command changes, so set them before displaying.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Representations',
    image: 'prot-gfp',
    caption:
      'A **cartoon** of green fluorescent protein shows its barrel of beta strands. It hides the side chains that fill the barrel.',
    bullets: [
      '**Cartoon**: helices and sheets. **Backbone trace**: connectivity. **Space-filling**: occupied volume. **Surface**: accessibility.',
      'Use ==several complementary views==.',
      '**Color by structure** encodes a classification, not charge or energy.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each representation to what it best shows.',
    pairs: [
      ['Cartoon', 'Helices and sheets'],
      ['Backbone trace', 'Chain connectivity'],
      ['Space-filling', 'Approximate occupied volume'],
      ['Surface', 'Pockets and accessibility'],
    ],
    explanation: 'Each representation answers a different question and hides something else.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Orientation and distances',
    bullets: [
      '**Rotation and zoom** change the camera, not the molecule.',
      'A ==projected overlap is not a 3D contact==.',
      'Measure **atom distances with units**, then check chemistry and geometry.',
      'Distances alone do not prove bonds or favorable energy.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Two residues overlap on screen. What should you do before calling it an interaction?',
    options: [
      'Measure the 3D distance between the relevant atoms and check the chemistry',
      'Report it as a hydrogen bond',
      'Zoom in until they touch',
      'Change the color scheme',
    ],
    answer: 0,
    explanation: 'Projection loses depth; atoms that appear close can be far apart.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Reproducibility',
    bullets: [
      'Keep a **command log, structure identifier, file version, assembly, selection, and view**.',
      'Export ==labeled images== at readable scale.',
      'Separate original coordinates from display changes and added segments.',
      '**Reset and replay** the workflow as a check.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Select everything a figure caption should include.',
    options: [
      'The entry and chain',
      'The numbering reference',
      'A legend for colors and representation',
      'The viewer’s window size',
    ],
    answers: [0, 1, 2],
    explanation: 'A caption should let someone else recover the same scientific claim.',
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Does each lab action change the camera or the teaching coordinates?',
    bins: ['Camera only', 'Changes coordinates'],
    items: [
      ['Rotate the view', 0],
      ['Zoom in', 0],
      ['Increase compaction', 1],
      ['Highlight a region', 0],
    ],
    explanation:
      'Only compaction alters the generated coordinates; the others change what you see.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: a helix figure',
    problem: 'Plan a figure highlighting one chain’s helix region.',
    steps: [
      'Load and verify the **correct entry and chain**.',
      'Choose a **cartoon** and select the documented region.',
      'Add a **legend, numbering reference, and saved workflow**.',
    ],
    conclusion: '==A useful image is reproducible and interpretable.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Selection', back: 'Subset affected by a viewing operation.' },
      { front: 'Cartoon', back: 'Secondary-structure-oriented representation.' },
      { front: 'Projection', back: 'Mapping 3D coordinates to a display.' },
      { front: 'Command log', back: 'Recorded operations for reproducibility.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Rotation changes the {0}, not the molecule. Color by structure shows a {1}, and a command {2} makes a figure reproducible.',
    blanks: ['viewpoint', 'classification', 'log'],
    distractors: ['sequence', 'charge', 'color'],
    explanation:
      'Camera changes are not structural; structure coloring is categorical; logs let others replay.',
  },
  {
    kind: 'open',
    prompt: 'Why should you reset the selection before starting a new display step?',
    model:
      'Commands act on the current selection. If an old selection is still active, the next command may change only an unintended subset, which is easy to misread as a structural difference.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Record identifiers before changing the display.',
      'Select first, then apply representation and color.',
      '==A projected overlap is not a 3D contact.==',
      'Log commands so the figure can be reproduced.',
    ],
  },
]);

const prebuild = defineDeck('prot-u8-l1', [
  {
    kind: 'title',
    title: 'Pre-build planning, annotation, and model review',
    subtitle: 'Scale, path, labels, and evidence before the material is committed.',
    objectives: [
      'Plan the chain path and one consistent scale.',
      'Annotate features with evidence.',
      'Design accessible legends.',
      'Review against the verified requirements.',
    ],
    image: 'prot-ha-model',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which matters more for a pre-build, accuracy or appearance?',
    options: ['Accuracy', 'Appearance', 'Both equally', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Planning before construction',
    bullets: [
      'Verify the **chain, residue range, coordinate source, scale, and requirements**.',
      'Sketch the backbone route and major features before committing material.',
      'Mark ==both termini and the direction== so the path can be followed.',
      'Aesthetics should support the scientific message.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Scale and geometry',
    image: 'prot-helix',
    caption:
      'An **alpha helix** with its hydrogen bonds dashed. A physical model keeps ==one declared scale== for every feature like this.',
    bullets: [
      'Convert distances with **one stated scale**; never shortcut across **missing segments**.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'At a scale of 1 cm per Å, how long, in cm, is a 12 Å separation in the model?',
    answer: 12,
    tolerance: 0.01,
    unit: 'cm',
    explanation: '12 Å × 1 cm/Å = 12 cm. Every other feature must use the same scale.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'At a scale of 2 cm per Å, how long, in cm, should a 5.4 Å helix pitch be?',
    answer: 10.8,
    tolerance: 0.01,
    unit: 'cm',
    explanation: '5.4 Å × 2 cm/Å = 10.8 cm.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Functional annotations',
    bullets: [
      'Choose features that tell the **biological story**: binding region, catalytic residue, interface, modification.',
      'Each annotation names the **residue or range, chemical role, and source**.',
      '==Do not add unsupported hydrogen bonds== to make a model look intricate.',
      'Label inferred features as inferred.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Is each annotation well supported or a problem?',
    bins: ['Well supported', 'Problem'],
    items: [
      ['“His57, catalytic base (PDB 1ABC, ref. 3)”', 0],
      ['An extra hydrogen bond added for looks', 1],
      ['“Receptor-binding site, residues 130–140, per annotation”', 0],
      ['A red patch with no label', 1],
      ['“Inferred interface — needs confirmation”', 0],
    ],
    explanation: 'Good annotations give identity, role, and source, and flag inferences.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Legends and accessibility',
    image: 'prot-ha-model',
    caption:
      'A **3D-printed** hemagglutinin colored by chain. A legend should say what each color means ==in text, not color alone==.',
    bullets: [
      'Use a **limited, consistent** color scheme.',
      'Avoid tiny detached labels and ambiguous arrows.',
      'Separate **chain colors** from **property colors** in the legend.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Why should a legend use text labels as well as colors?',
    options: [
      'Color alone is ambiguous and inaccessible to some viewers',
      'Text is required for every 3D print',
      'Colors fade quickly',
      'Judges cannot see color',
    ],
    answer: 0,
    explanation: 'Text makes meaning clear and accessible.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Review criteria',
    bullets: [
      'Consult the **actual rubric**; do not invent point values.',
      'Check accuracy, chain continuity, numbering, termini, required features, and constraints.',
      'Ask a peer to ==trace the chain without prompting==.',
      'Compare the model with the digital view from several orientations.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'A peer traces your model and gets lost halfway. What could be the cause?',
    options: [
      'An ambiguous path',
      'Unlabeled termini',
      'Overlapping thick material',
      'Too much evidence in the log',
    ],
    answers: [0, 1, 2],
    explanation: 'Peer tracing reveals path, label, and material problems.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Revision and communication',
    bullets: [
      'Keep an **evidence log** of what changed and why.',
      'If a label lacks support, ==revise the claim== rather than decorating further.',
      'The viewer can rehearse explanations but cannot certify a build.',
      'Finish with a narrative linking **sequence, structure, interactions, and function**.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: applying a scale',
    problem: 'At a scale of 1 cm per Å, how long is a modeled 12 Å separation?',
    steps: [
      'Use the **stated ratio**.',
      '12 Å × 1 cm/Å = **12 cm**.',
      'Confirm all other features use the **same scale**.',
    ],
    conclusion: '==A consistent scale beats an unlabeled attractive shape.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Scale', back: 'Ratio between model and molecular distances.' },
      { front: 'Terminus', back: 'End of a polypeptide chain.' },
      { front: 'Interface', back: 'Region of interaction between components.' },
      { front: 'Evidence log', back: 'Sources and reasons supporting model features.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Label both {0} to show direction. A strong annotation gives identity, role, and {1}, and review uses the verified {2}.',
    blanks: ['termini', 'evidence', 'rubric'],
    distractors: ['helices', 'color', 'template'],
    explanation: 'Termini give direction; evidence supports claims; the real rubric guides review.',
  },
  {
    kind: 'open',
    prompt: 'A peer says your highlighted “active site” has no source. What should you do?',
    model:
      'Find evidence for the claim or revise the label to say it is inferred, and record the change in the evidence log rather than adding more decoration.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Plan path, termini, and one consistent scale first.',
      'Annotate with identity, role, and source.',
      '==Legends need text, not color alone.==',
      'Review against the actual rubric and revise unsupported claims.',
    ],
  },
]);

export const proteinDecksViruses = [viruses, influenza, viewing, prebuild];
