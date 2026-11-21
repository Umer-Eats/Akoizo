import { defineDeck, type Deck } from './presentation-types.ts';

// Forensics decks for Units 6–7 (fingerprints, latent development, skin, DNA, blood), imported by
// presentations-forensics.ts. Development methods are discussed as method choice and recorded
// outcomes only; no deck gives reagent or fuming instructions.

const prints = defineDeck('for-u6-l1', [
  {
    kind: 'title',
    title: 'Prints: Patterns and Minutiae',
    subtitle: 'Patterns **sort** prints; minutiae, judged for quality, **compare** them.',
    objectives: [
      'Classify **arches, tented arches, loops, and whorls** with deltas and ridge counts.',
      'Identify **bifurcations, endings, dots, and enclosures** as minutiae.',
      'Distinguish **patent, plastic, and latent** prints.',
      'Explain **AFIS** as a matcher, not a decider.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which pattern do you think is on your own right index finger?',
    options: ['Loop', 'Whorl', 'Arch', 'No idea'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Pattern families',
    image: 'for-loops',
    caption:
      'Ridge patterns with **cores and deltas** marked: loops have one delta, whorls two, arches none.',
    bullets: [
      '**Loops** about 60–65% of prints, **whorls** 30–35%, **arches** about 5%.',
      'Whorl types: **plain, central pocket, double loop, accidental**.',
      'A **tented arch** has a sharp upthrust but no true delta and loop.',
      '==Pattern alone is class evidence.==',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'A central pocket loop whorl',
    image: 'for-whorl',
    caption: 'A **central pocket loop whorl**: ridges circle a small pocket near the core.',
    bullets: [
      'Every whorl has **two deltas**; the pocket sets this subtype apart from a plain whorl.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each pattern to its number of deltas.',
    pairs: [
      ['Plain arch', 'No delta'],
      ['Loop', 'One delta'],
      ['Plain whorl', 'Two deltas'],
      ['Double loop', 'Two deltas, two loop cores'],
    ],
    explanation: 'Counting deltas is the fastest way to sort a print into its family.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Deltas, cores, and ridge count',
    bullets: [
      'A **delta** is the triangular ridge divergence; the **core** is the pattern center.',
      '**Ridge count**: ridges crossing a line from core to delta, ==excluding both endpoints==.',
      'Mark the **delta first**, then the core, then count.',
      '**Ulnar** loops open toward the little finger; **radial** toward the thumb.',
      'Patterns mirror across hands, so ==note hand and finger==.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'A right-hand loop opens toward the little finger. What is it called?',
    options: ['Ulnar loop', 'Radial loop', 'Tented arch', 'Accidental whorl'],
    answer: 0,
    explanation:
      'The ulna is on the little-finger side of the forearm, so a loop opening that way is ulnar.',
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each minutia to its description.',
    pairs: [
      ['Ridge ending', 'A ridge that stops abruptly'],
      ['Bifurcation', 'One ridge splitting into two'],
      ['Dot', 'A very short isolated ridge'],
      ['Enclosure', 'A ridge that splits and rejoins'],
    ],
    explanation: 'Minutiae are compared by their arrangement and orientation, not merely counted.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Comparison quality',
    bullets: [
      'Minutiae contribute through **arrangement and orientation**.',
      'Examiners judge **quality and consistency**; ==there is no universal automatic count threshold==.',
      '**Pressure, smear, partial contact**, and image quality can alter recorded detail.',
      'A clear incompatible feature matters; an **unclear** apparent difference may be inconclusive.',
    ],
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Patent, plastic, and latent',
    columns: ['Type', 'What it is', 'First handling'],
    rows: [
      ['Patent', 'Visible deposit: **blood, ink, paint**', 'Photograph **at scale**'],
      [
        'Plastic',
        '3-D impression in **wax, putty, fresh paint**',
        'Photograph and cast; ==never brush==',
      ],
      ['Latent', 'Invisible **sweat and oil** residue', 'Least destructive development first'],
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Classify each impression.',
    bins: ['Patent', 'Plastic', 'Latent'],
    items: [
      ['Bloody print on a door', 0],
      ['Thumb pressed into candle wax', 1],
      ['Invisible print on a glass', 2],
      ['Inked print on a card', 0],
      ['Print in soft window putty', 1],
      ['Print on paper seen only after ninhydrin', 2],
    ],
    explanation:
      'Patent prints are visible deposits, plastic prints are molded, and latent prints need enhancement to be seen.',
  },
  {
    kind: 'flow',
    section: 4,
    title: 'AFIS and ACE-V',
    steps: [
      { label: 'AFIS search', detail: 'An algorithm **ranks candidates** by score.' },
      { label: 'Analysis', detail: 'Is the questioned print of **sufficient quality**?' },
      { label: 'Comparison', detail: 'Side by side: pattern, then minutiae in **arrangement**.' },
      { label: 'Evaluation', detail: 'Identification, exclusion, or **inconclusive**.' },
      { label: 'Verification', detail: '==A second examiner== independently checks the result.' },
    ],
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Put the ACE-V steps in order.',
    items: ['Analysis', 'Comparison', 'Evaluation', 'Verification'],
    explanation:
      'Examiners first judge whether the print is usable, then compare, decide, and have the result independently verified.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Classify before comparing',
    bullets: [
      'Broad patterns **organize and exclude**, but many people share each class.',
      '**Orient the reference** first: a mirror image or mislabeled hand reverses radial and ulnar.',
      'A short isolated mark may be **a true feature or a broken ridge**.',
      '==Counting unclear marks does not turn them into reliable data.==',
    ],
  },
  {
    kind: 'example',
    section: 6,
    title: 'Worked example: a smeared partial',
    problem:
      'A questioned print and a reference **both show a loop**. A large **smear** covers the region needed for detailed comparison.',
    steps: [
      'Pattern agreement means the reference is **not excluded** by class.',
      'The smear prevents reliable comparison of **fine detail**.',
      'The shared word “loop” is **not an individualizing feature**.',
      'Seek a better-quality impression if one exists.',
    ],
    conclusion:
      'Report ==class consistency with insufficient detail== for a stronger source conclusion.',
  },
  {
    kind: 'mcq',
    section: 6,
    prompt:
      'An AFIS search returns a top-ranked candidate with a very high score. What does that score establish?',
    options: [
      'A candidate for an examiner to compare, not a source conclusion',
      'That the candidate left the print',
      'That the print is a whorl',
      'That no verification is needed',
    ],
    answer: 0,
    explanation:
      'AFIS ranks candidates. Only an examiner’s documented comparison, verified by another examiner, reaches a conclusion.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Arches 0, loops 1, whorls **2 deltas**.',
      'Ridge count runs core to delta, **excluding endpoints**.',
      'Patent is visible, plastic is molded, latent needs **development**.',
      '==No universal minutiae count proves identity.==',
      'AFIS ranks; examiners decide with **ACE-V**.',
    ],
  },
]);

const latent = defineDeck('for-u6-l2', [
  {
    kind: 'title',
    title: 'Developing Latent Prints',
    subtitle: 'The **surface and residue** choose the method; documentation comes first.',
    objectives: [
      'Order methods from **least to most destructive** for a given surface.',
      'Explain what **powder, iodine, ninhydrin, and cyanoacrylate** respond to.',
      'Lift and photograph prints **without destroying detail**.',
      'Choose an approach for **glass, paper, and textured plastic**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: a ransom note on plain paper. Would you reach for powder first?',
    options: ['Yes', 'No', 'Depends on the paper', 'Not sure'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Least destructive first',
    bullets: [
      'Start with **visual inspection and photography** under good and alternate light.',
      'Then choose a **validated workflow** that fits the surface, residue, and other evidence.',
      '==There is no universal sequence== for every material.',
      'Each step needs a **reason**: processing can improve contrast or destroy information.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Powders and brushes',
    image: 'for-fp-kit',
    caption:
      'A historical FBI kit: **contrasting powders** and brushes for smooth, nonporous surfaces.',
    bullets: [
      'Powder clings to **moisture and oils**: black on light surfaces, white or fluorescent on dark.',
      '**Magnetic** powder and wand reduce brushing damage on textured surfaces.',
      '==Heavy brushing fills valleys== and erases bifurcations.',
      'Photograph **at 1 : 1 with a scale** before lifting; lift in one smooth motion onto a labeled contrast card.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Which powder choice fits each surface best?',
    bins: ['Black powder', 'White or fluorescent powder', 'Magnetic powder'],
    items: [
      ['White ceramic mug', 0],
      ['Dark glossy car door', 1],
      ['Textured plastic tool handle', 2],
      ['Clear glass on a white backing', 0],
      ['Black lacquered box', 1],
    ],
    explanation:
      'Pick the color that contrasts with the background; pick magnetic powder where brushing would damage detail.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Iodine and cyanoacrylate',
    bullets: [
      '**Iodine** gives a **temporary** contrast response with components of the residue.',
      '**Cyanoacrylate** forms a white polymer on suitable residues, mainly in **nonporous** workflows.',
      'Both need **trained handling and proper facilities**; here they appear only as virtual observations.',
      '==Residue chemistry, surface, and conditions== decide whether a method is informative.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Which response is temporary and which is lasting?',
    bins: ['Temporary contrast', 'Lasting product'],
    items: [
      ['Iodine response', 0],
      ['Cyanoacrylate polymer', 1],
      ['Ninhydrin purple', 1],
    ],
    explanation:
      'Iodine contrast fades, so it must be photographed quickly; polymer and Ruhemann’s purple persist.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Ninhydrin on porous surfaces',
    image: 'for-ninhydrin',
    caption:
      'Ninhydrin reacts with **amino acids** in sweat to give a purple print (**Ruhemann’s purple**).',
    bullets: [
      'Suited to **checks, notebooks, and notes**, where powders fail on fibers.',
      'It **stains paper permanently**, so photography and reversible methods come first.',
      '**DFO and 1,2-indanedione** are fluorescent alternatives on colored paper.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each method to the residue component or result it is associated with.',
    pairs: [
      ['Ninhydrin', 'Amino acids, purple product'],
      ['Iodine', 'Temporary, reversible contrast'],
      ['Cyanoacrylate', 'White polymer on nonporous surfaces'],
      ['Powder', 'Adheres to surface moisture and oils'],
    ],
    explanation:
      'Each method targets a different residue property, which is why surface and residue drive the choice.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Surface decision guide',
    columns: ['Surface', 'Residue behavior', 'Often suitable'],
    rows: [
      [
        'Porous paper',
        'Components **absorb** into fibers',
        '**Amino-acid** methods such as ninhydrin',
      ],
      ['Smooth glass or plastic', 'Residue **stays on the surface**', 'Powder or cyanoacrylate'],
      ['Textured plastic', 'Surface residue, rough relief', '**Magnetic** powder or cyanoacrylate'],
      [
        'Wet or previously processed',
        'Altered residue',
        '==Consider prior steps and other analyses==',
      ],
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Which choice is best for a latent print on an uncoated paper note?',
    options: [
      'An amino-acid-sensitive method such as ninhydrin, after photography',
      'Heavy black powder with a stiff brush',
      'Casting it like a plastic print',
      'No method can work on paper',
    ],
    answer: 0,
    explanation:
      'Paper absorbs residue, so surface powders work poorly. Amino-acid chemistry reaches what soaked into the fibers.',
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which factors should shape the choice of development method? Select all that apply.',
    options: [
      'Surface porosity',
      'Residue type and age',
      'Whether DNA or ink analysis is also needed',
      'Which method is fastest',
      'Prior processing of the item',
    ],
    answers: [0, 1, 2, 4],
    explanation:
      'Method choice serves the whole item and the questions being asked. Speed alone is not a scientific reason.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Method by surface and residue',
    bullets: [
      'Nonporous surfaces keep residue **near the surface**; porous materials **absorb** it.',
      '**Alternate illumination** can reveal detail invisible under ordinary light.',
      'Development may affect **DNA, ink, or trace** evidence: plan for them.',
      '==The goal is the right information, not the fastest visible pattern.==',
    ],
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Document success and limits',
    bullets: [
      'Photograph developed detail **with scale and orientation** before lifting.',
      'Lifts can **stretch, trap bubbles**, or miss faint features.',
      '**Overdevelopment** fills valleys and raises background.',
      '==No visible print does not prove no contact==: residue may be scant, degraded, or incompatible.',
      'Know when to **stop**: extra processing without a purpose can destroy information.',
    ],
  },
  {
    kind: 'example',
    section: 6,
    title: 'Worked example: paper versus plastic',
    problem:
      'Exhibit A is an **uncoated paper note**. Exhibit B is a **smooth plastic container**. Both may hold latent residue.',
    steps: [
      'A is **porous**: an amino-acid-sensitive method may fit a validated workflow.',
      'B is **nonporous**: trained staff may consider powder or cyanoacrylate.',
      'For both, **preserve visible detail first** and weigh other analyses.',
      'A negative result on either is not proof of no contact.',
    ],
    conclusion:
      '==Surface properties and evidence priorities guide the method==, not a memorized universal order.',
  },
  {
    kind: 'fill',
    section: 6,
    prompt: 'Complete the statement about documentation.',
    text: 'Photograph a developed print with a {0} before {1}, because a tape lift can {2} the impression.',
    blanks: ['scale', 'lifting', 'stretch'],
    distractors: ['flashlight', 'brushing', 'darken'],
    explanation:
      'A scaled photo preserves true size and detail even if the lift distorts or fails.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Inspect and **photograph first**.',
      'Porous → **amino-acid** methods; nonporous → **surface** methods.',
      'Choose powder color for **contrast**; magnetic for texture.',
      '==No print does not mean no touch.==',
      'Stop once the needed detail is documented.',
    ],
  },
]);

const skin = defineDeck('for-u6-l3', [
  {
    kind: 'title',
    title: 'Skin, Friction Ridges, and Fingerprint Residue',
    subtitle: 'The ridge pattern **persists**; each recorded impression **varies**.',
    objectives: [
      'Connect **epidermis, dermis, and friction ridges** to a recorded print.',
      'Distinguish **sweat produced** on the palm from **oils transferred** to it.',
      'Explain how **pressure, surface, and residue** affect print quality.',
      'Separate **persistent structure** from a **variable impression**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: do the palms of your hands have oil glands?',
    options: ['Yes', 'No', 'Only on the fingertips', 'Not sure'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Skin as a layered interface',
    image: 'for-skin',
    caption:
      '**Epidermis** on top, **dermis** below with glands and vessels, then the **hypodermis**.',
    bullets: [
      'The **epidermis** has no blood vessels; it is fed by diffusion from below.',
      '**Basal cells** make new keratinocytes that move outward.',
      'Surface shedding ==does not erase== the deeper organization that supports ridges.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each layer to its description.',
    pairs: [
      ['Epidermis', 'Outer epithelium without blood vessels'],
      ['Dermis', 'Connective tissue with vessels and glands'],
      ['Hypodermis', 'Deeper connective and fat tissue'],
      ['Basal layer', 'Cells that generate new keratinocytes'],
    ],
    explanation:
      'Constant renewal from the basal layer replaces surface cells while the underlying ridge structure persists.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Friction-ridge architecture',
    image: 'for-ridge',
    caption:
      'An **epidermal ridge** reaching into the dermis; basal cells along it keep renewing the surface.',
    bullets: [
      '**Thick skin** of palms, soles, and finger pads carries friction ridges.',
      'It has **no hair follicles or sebaceous glands** but abundant **eccrine** sweat glands.',
      'Ridge patterns form **before birth** from developmental conditions.',
      '==The pattern persists; the recorded image varies== with stretch, pressure, angle, and moisture.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Thick palmar skin or thin hair-bearing skin?',
    bins: ['Thick palmar skin', 'Thin hair-bearing skin'],
    items: [
      ['Friction ridges', 0],
      ['Hair follicles', 1],
      ['Sebaceous glands', 1],
      ['Abundant eccrine glands', 0],
      ['Found on the fingertip pads', 0],
    ],
    explanation: 'Thick skin trades hair and oil glands for ridges and many sweat pores.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Sweat, transferred oil, and other material',
    bullets: [
      '**Eccrine** secretions supply water, salts, and small organic molecules such as amino acids.',
      'Palms ==do not make sebaceous oil==; oil arrives by **touching the face, hair, food, or lotion**.',
      'A latent deposit is a **mixture** of secretions and transferred substances.',
      'Detection chemistry targets **specific components**, so residue matters to method choice.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'An oily latent print appears on a glass. Where did the oil most likely come from?',
    options: [
      'Transfer from the face, hair, or a handled substance',
      'Sebaceous glands in the fingertip',
      'The dermis leaking through the ridges',
      'Eccrine glands, which secrete only oil',
    ],
    answer: 0,
    explanation:
      'Fingertips lack sebaceous glands, so oil in a print was picked up by contact before the print was left.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Recording conditions',
    columns: ['Condition', 'Effect on the impression', 'Risk'],
    rows: [
      ['Heavy pressure', 'Broadens contact', '**Merged** details'],
      ['Movement', 'Drags ridges', '**Smear**'],
      ['Too little residue', 'Patchy transfer', 'Gaps'],
      ['Excess residue', 'Fills valleys', '==Lost ridge separation=='],
      ['Rough or absorbent surface', 'Uneven transfer', 'Poor persistence'],
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt:
      'Which differences between two impressions could come from recording rather than the finger? Select all that apply.',
    options: [
      'Smearing',
      'Merged ridges from pressure',
      'Gaps from scant residue',
      'Filled valleys from excess residue',
    ],
    answers: [0, 1, 2, 3],
    explanation:
      'All four are recording effects. Separate them from true structural differences before comparing.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Injury, repair, and persistence',
    bullets: [
      'A **superficial abrasion** may disturb a print temporarily while deeper structures remain.',
      '**Deeper injury** can leave a permanent scar that changes the surface pattern.',
      'A faint area alone cannot show whether **permanent** alteration occurred.',
      '==Biological persistence and evidentiary visibility are different properties.==',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'A person scraped a fingertip lightly last month. What should you expect of new prints?',
    options: [
      'The deeper ridge pattern likely persists once the surface heals',
      'An entirely new fingerprint pattern',
      'No ridges at all, permanently',
      'A pattern copied from the scraping surface',
    ],
    answer: 0,
    explanation:
      'Superficial damage heals from the persistent deeper structure. Only deep injury leaves a permanent scar.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: oil in a palm print',
    problem:
      'A student argues that an **oily palm impression** proves the palm has **sebaceous glands**.',
    steps: [
      'Palmar thick skin has **eccrine** glands but **no local sebaceous glands**.',
      'Oil can reach the palm by **contact** with face, hair, lotion, or food.',
      'Separate the **deposit’s composition** from the **anatomical origin** of each part.',
    ],
    conclusion: 'An oily impression ==does not establish local sebaceous secretion==.',
  },
  {
    kind: 'fill',
    section: 5,
    prompt: 'Complete the statement.',
    text: 'The same finger can leave prints of different {0}, because contact and residue change while the {1} ridge structure stays {2}.',
    blanks: ['quality', 'underlying', 'fixed'],
    distractors: ['owners', 'surface', 'random'],
    explanation:
      'Anatomy supplies the persistent mechanism; recording conditions decide how much of it appears.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Basal cells renew the epidermis; **ridges persist**.',
      'Palms have **eccrine** glands, not sebaceous ones.',
      'Oil in a print is usually **transferred**.',
      '==Pressure, movement, and residue change the image, not the finger.==',
    ],
  },
]);

const dna = defineDeck('for-u7-l1', [
  {
    kind: 'title',
    title: 'DNA: STR Profiling and Electrophoresis',
    subtitle: 'Repeat counts at many loci build a profile; **controls** make it trustworthy.',
    objectives: [
      'Outline **extraction, PCR, STR loci, and capillary electrophoresis**.',
      'Read **allele tables** and match-probability logic.',
      'Distinguish **nuclear STR** from mitochondrial and touch-DNA limits.',
      'Prevent **contamination** with controls and clean technique.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: in a gel, do short DNA fragments travel farther or less far?',
    options: ['Farther', 'Less far', 'The same distance', 'Not sure'],
  },
  {
    kind: 'flow',
    section: 0,
    title: 'From swab to profile',
    steps: [
      { label: 'Extraction', detail: 'Release DNA from cells.' },
      { label: 'Quantitation', detail: 'Measure how much DNA is present.' },
      { label: 'PCR', detail: 'Copy targeted **STR loci** millions of times.' },
      { label: 'Capillary electrophoresis', detail: 'Size fragments; **shorter arrive first**.' },
      { label: 'Comparison', detail: '==Allele by allele==, locus by locus.' },
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Separating DNA by size',
    image: 'for-gel',
    caption:
      'DNA in a gel: negatively charged fragments move toward the **positive electrode**, and **shorter fragments travel farther**.',
    bullets: [
      'Primers flank repeats such as **AGAT** repeated 8 to 15 times.',
      'A **heterozygote** shows two peaks at a locus; a **homozygote** shows one taller peak.',
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Put the profiling steps in order.',
    items: [
      'Extraction',
      'Quantitation',
      'PCR amplification',
      'Capillary electrophoresis',
      'Profile comparison',
    ],
    explanation: 'Release DNA, measure it, amplify the targets, size them, then compare.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'From capillary to electropherogram',
    image: 'for-epg',
    caption:
      'Capillary electrophoresis turns alleles of **5 and 11 repeats** into peaks; the **size standard** fixes each peak’s length.',
    bullets: [
      'Each locus carries a **fluorescent tag**, so many loci are read in one run.',
      'In a clean, complete, single-source exercise, compare **both alleles at every locus**.',
      'A full match supports **compatibility**; a reproducible mismatch can **exclude** a sole source.',
      '==Match strength needs a proper statistical framework==, not a generic “one in quadrillions.”',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: two references',
    problem:
      'Questioned: **locus 1 = 10,12; locus 2 = 8,9**. Reference A: 10,12 and 8,9. Reference B: 10,11 and 8,9.',
    steps: [
      'Locus 1: A agrees; **B has 11** where the questioned has 12.',
      'Locus 2: both agree, but that **does not cancel** B’s locus-1 mismatch.',
      'Under clean single-source assumptions, **B is excluded**; A remains compatible.',
      'Two loci are not a unique identification or a finding of guilt.',
    ],
    conclusion:
      '==One supported incompatibility can be decisive==; agreement still needs proper interpretation.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'A questioned profile reads 14,16 at one locus. Which reference is compatible there?',
    options: ['14,16', '14,15', '16,16', '13,14'],
    answer: 0,
    explanation: 'Both alleles must agree. 14,15 and 13,14 lack the 16, and 16,16 lacks the 14.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Mixtures and low template',
    bullets: [
      '**More than two alleles** at several loci can suggest a mixture, but check artifacts.',
      '**Stutter, dropout, drop-in, degradation**, and shared alleles complicate reading.',
      'A ==validated model== is needed; eyeballing major and minor contributors is not enough.',
      'Low-level DNA is sensitive to **contamination**, **secondary transfer**, and background.',
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt:
      'Which can make the visible peak count differ from the true alleles? Select all that apply.',
    options: [
      'Stutter peaks',
      'Allele dropout',
      'Shared alleles between contributors',
      'Using a size standard',
      'Degraded DNA',
    ],
    answers: [0, 1, 2, 4],
    explanation:
      'Artifacts add peaks, dropout and degradation hide them, and shared alleles overlap. A size standard is a calibration tool.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Nuclear versus lineage DNA',
    columns: ['Type', 'Inheritance', 'Discrimination'],
    rows: [
      ['Nuclear autosomal STR', 'From **both parents**', '**High**, across many loci'],
      ['Mitochondrial', '**Maternal** line', 'Shared by maternal relatives'],
      ['Y-STR', '**Paternal** line, males', 'Shared by paternal relatives'],
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'A mitochondrial sequence from a hair matches a suspect. Who else could share that sequence?',
    options: [
      'The suspect’s maternal relatives',
      'Only the suspect',
      'The suspect’s father',
      'No one else',
    ],
    answer: 0,
    explanation:
      'Mitochondria pass from mother to children, so siblings, mother, and maternal relatives can share the lineage.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Contamination control',
    bullets: [
      'Masks and gloves, **change gloves between samples**, disposable tools.',
      'Run **reagent blanks** and **positive controls** with every batch.',
      'Handle evidence and reference samples **at different times and places**.',
      '==A blank showing peaks invalidates the run==: report that, do not force a match.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'The reagent blank in a batch shows clear peaks. What is the right response?',
    options: [
      'Treat the run as invalid and re-process with fresh controls',
      'Subtract the blank peaks and report the rest',
      'Ignore the blank because the evidence peaks are taller',
      'Report a match only at loci without blank peaks',
    ],
    answer: 0,
    explanation:
      'PCR amplifies contamination as efficiently as evidence. A failed blank undermines every result in that batch.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Reading an STR table',
    bullets: [
      'A diploid person has **two alleles** per autosomal locus; they may be the same number.',
      'In a clean teaching table, a reference must agree with **both** observed alleles.',
      'Two observed peaks at a locus are ==not proof of a single source==.',
      'Missing data and mixtures need a **different interpretation**.',
    ],
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'A match statistic is not guilt',
    bullets: [
      '**Random-match probability**: how often a profile might occur under stated population assumptions.',
      '**Likelihood ratio**: how probable the findings are under two stated propositions.',
      '==Neither is the probability of guilt==, and neither can simply be inverted into it.',
      'Source association is separate from **how and when** material arrived.',
    ],
  },
  {
    kind: 'sort',
    section: 6,
    prompt: 'Source-level question or activity-level question?',
    bins: ['Source level', 'Activity level'],
    items: [
      ['Whose DNA is in this stain?', 0],
      ['How did the DNA get onto the handle?', 1],
      ['Is the reference excluded at locus 3?', 0],
      ['Was the DNA left during the crime or earlier?', 1],
      ['Could secondary transfer explain this trace?', 1],
    ],
    explanation:
      'A profile speaks to source. Questions of how and when need case context about transfer and persistence.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Extract, quantify, **PCR**, electrophoresis, compare.',
      'Compare **both alleles at every locus**.',
      'One reproducible mismatch can **exclude**.',
      'Mitochondrial and Y lineages are **shared by relatives**.',
      '==A failed blank invalidates; a match statistic is not guilt.==',
    ],
  },
]);

const blood = defineDeck('for-u7-l2', [
  {
    kind: 'title',
    title: 'Blood: ABO Genetics and Spatter',
    subtitle:
      'Typing answers **whose class**; geometry answers **from where**: keep them separate.',
    objectives: [
      'Predict **ABO types** from alleles Iᴬ, Iᴮ, i and agglutination.',
      'Sequence **presumptive and confirmatory** blood tests.',
      'Calculate **impact angle** from width over length.',
      'Distinguish **transfer, drip, cast-off, and expirated** patterns cautiously.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: can two type A parents have a type O child?',
    options: ['Yes', 'No', 'Only with a mutation', 'Not sure'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'ABO antigens and antibodies',
    image: 'for-abo',
    caption:
      'ABO groups: the **antigens** on red cells and the **antibodies** in plasma for A, B, AB, and O.',
    bullets: [
      'Iᴬ and Iᴮ are **codominant**; both dominate **i** (O).',
      '**AA or AO → A; BB or BO → B; AB → AB; OO → O.**',
      'Forward typing: **anti-A clumping** supports A antigen; **anti-B** supports B.',
      '==ABO is class evidence==; a phenotype need not reveal the genotype.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each forward-typing result to the blood type it supports.',
    pairs: [
      ['Clumps with anti-A only', 'Type A'],
      ['Clumps with anti-B only', 'Type B'],
      ['Clumps with both', 'Type AB'],
      ['Clumps with neither', 'Type O'],
    ],
    explanation:
      'Agglutination shows which antigens sit on the red cells. An O result needs valid controls to be trusted.',
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'Parents with genotypes AO and BO have a child. What is the chance, in percent, that the child is type O?',
    answer: 25,
    tolerance: 0.5,
    unit: '%',
    explanation:
      'The child must inherit O from both parents: ½ × ½ = ¼ = 25%. The cross gives A, B, AB, and O at 25% each.',
  },
  {
    kind: 'flow',
    section: 1,
    title: 'Presumptive to confirmatory',
    steps: [
      { label: 'Photograph', detail: 'Record the stain **before any test**.' },
      {
        label: 'Luminol',
        detail:
          'Glows blue in the dark; finds **washed** traces, but bleach and rust give false positives.',
      },
      {
        label: 'Kastle-Meyer or TMB',
        detail: 'Pink or blue-green with **heme peroxidase** activity.',
      },
      { label: 'Confirmatory', detail: '**Takayama crystals** or anti-human hemoglobin cards.' },
      {
        label: 'Species',
        detail: '==Human versus animal needs immunological confirmation==, never color alone.',
      },
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Presumptive or confirmatory?',
    bins: ['Presumptive', 'Confirmatory'],
    items: [
      ['Luminol glow', 0],
      ['Kastle-Meyer pink', 0],
      ['TMB blue-green', 0],
      ['Takayama hemochromogen crystals', 1],
      ['Anti-human hemoglobin card', 1],
    ],
    explanation:
      'Presumptive tests react with peroxidase-like activity and can be fooled; confirmatory tests target blood or human blood specifically.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Reading individual stains',
    image: 'for-blood-drop',
    caption: 'Drip stains and a wipe photographed beside an **L-shaped forensic scale**.',
    bullets: [
      'A drop falling **straight down** makes a near-circle; an **angled** impact makes an ellipse.',
      'Impact angle θ = **arcsin(width ÷ length)**; measure the body, ==not the tail or spines==.',
      'The tail points in the **direction of travel**.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'A stain is 6 mm wide and 12 mm long. What is its impact angle, in degrees?',
    answer: 30,
    tolerance: 0.5,
    unit: '°',
    explanation: 'width ÷ length = 6 ÷ 12 = 0.5, and arcsin(0.5) = 30°.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'A stain is 8 mm wide and 10 mm long. What is its impact angle, in degrees?',
    answer: 53.1,
    tolerance: 0.5,
    unit: '°',
    explanation: '8 ÷ 10 = 0.8, and arcsin(0.8) ≈ 53.1°. A rounder stain means a steeper impact.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Pattern families',
    columns: ['Pattern', 'Appearance', 'Caution'],
    rows: [
      ['Passive drip', 'Round drops with satellites', 'Surface texture changes edges'],
      ['Transfer', '**Wipe or swipe** with feathered edges', 'Direction can be ambiguous'],
      ['Cast-off', '**Linear arcs** of similar stains', 'Does not name the object'],
      ['Impact spatter', 'Radiates from a **force**', 'Size alone does not fix the mechanism'],
      [
        'Expirated',
        '**Air bubbles**, diluted, mucus strands',
        '==Needs bubbles or context==, not one photo',
      ],
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'Fine spatter near a victim’s face shows no visible bubbles in one distant photo. What is the best statement?',
    options: [
      'Expirated and impact spatter both remain possible; a close-up for bubbles would help decide',
      'It is definitely expirated blood',
      'It is definitely impact spatter',
      'Bloodstain patterns cannot be interpreted at all',
    ],
    answer: 0,
    explanation:
      'State competing hypotheses and name the view that would decide, rather than diagnosing from one photo.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Many stains, one origin estimate',
    image: 'for-spatter-origin',
    caption:
      'Stains trace back to an **area of convergence**; their impact angles then estimate **height of origin**.',
    bullets: [
      'A **single stain** gives angle and direction, not the origin.',
      'Several stains, by **stringing or software**, estimate a 3-D area of origin.',
      '==Typing and geometry are separate lines of inference==: type A does not locate a person, and an angle does not identify a donor.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt:
      'A valid stain reacts only with anti-A and has a 30° impact angle. Which conclusions are supported? Select all that apply.',
    options: [
      'The stain supports type A',
      'The drop struck the surface at about 30°',
      'The stain came from the suspect, who is type A',
      'The single stain locates the area of origin',
    ],
    answers: [0, 1],
    explanation:
      'Type and angle are each supported. Neither identifies the donor, and one stain cannot locate the origin.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'ABO at the correct level',
    bullets: [
      'Type A can come from **AA or AO**: list parental alleles and every combination in a cross.',
      'Population frequencies **vary**, so no universal percentage fits every sample.',
      'A type mismatch can exclude a person as the **source of that stain**, not from the **whole incident**.',
    ],
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Stain geometry as a model',
    bullets: [
      'Width ÷ length must lie **between 0 and 1**; the angle is measured **from the surface**.',
      'Keep the calculator in **degrees**: a radian answer is a numerical error.',
      '**Texture, absorbency, distortion, and overlap** limit the ideal ellipse.',
      '==A group of small stains does not by itself prove a weapon or exact action.==',
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Iᴬ and Iᴮ codominant, **i recessive**.',
      'Presumptive tests screen; **confirmatory** and species tests decide.',
      'θ = **arcsin(width ÷ length)**, measured on the body.',
      'One stain gives angle and direction; **several** estimate origin.',
      '==Keep source typing and geometry on separate lines.==',
    ],
  },
]);

export const forensicsDecksPrints: Deck[] = [prints, latent, skin, dna, blood];
