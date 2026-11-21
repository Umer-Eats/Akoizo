import { defineDeck, type Deck } from './presentation-types.ts';

// Forensics decks for Units 3–5 (plastic ID, fibers, hair, chromatography, spectra), imported by
// presentations-forensics.ts. Thermal and halogen screens appear only as recorded reference
// observations, as the lessons present them.

const plasticId = defineDeck('for-u3-l2', [
  {
    kind: 'title',
    title: 'Plastic ID: Density, Flame, and Beilstein',
    subtitle: 'Two liquids and a reference table can **split the common six**.',
    objectives: [
      'Use **water and salt solution** to bracket a chip’s density.',
      'Read recorded **flame, soot, odor, and drip** observations for PE, PP, PS, PVC, PET.',
      'Weigh **halogen and solvent screens** as clues, not proof.',
      'Write a **stepwise conclusion** for a plastic unknown.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: a chip sinks in water. How many of the six common codes are still possible?',
    options: ['One', 'Two', 'Three', 'All six'],
  },
  {
    kind: 'flow',
    section: 0,
    title: 'Two-liquid density split',
    steps: [
      {
        label: 'Water, 1.00 g/cm³',
        detail: 'Floaters: **PP, LDPE, HDPE** (and any foam). Sinkers go on.',
      },
      {
        label: 'Saturated salt, about 1.20',
        detail: '**PS (≈1.05) floats**; PET and PVC (≈1.38) still sink.',
      },
      {
        label: 'Good technique',
        detail: 'Small chips, **bubbles pressed out**, wait ten seconds, pat dry between liquids.',
      },
      {
        label: 'Record',
        detail: 'Float, sink, or suspend ==for each liquid==, not just the last one.',
      },
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Solid chips, no bubbles: where does each one end up after water then salt solution?',
    bins: ['Floats in water', 'Sinks in water, floats in salt', 'Sinks in both'],
    items: [
      ['PP', 0],
      ['HDPE', 0],
      ['LDPE', 0],
      ['PS', 1],
      ['PET', 2],
      ['PVC', 2],
    ],
    explanation:
      'Polyolefins (0.90–0.95) float in water. PS (≈1.05) sinks in water but floats in 1.20 salt. PET and PVC (≈1.38) sink in both, so they need another test.',
  },
  {
    kind: 'compare',
    section: 1,
    title: 'Recorded flame observations',
    columns: ['Polymer', 'Flame and soot', 'Odor and residue'],
    rows: [
      ['PE', 'Blue-yellow, **drips**, little soot', 'Paraffin, candle-like'],
      ['PP', 'Like PE, less drip', '**Acrid**, diesel-like'],
      ['PS', '**Orange, very sooty**', 'Sweet, floral styrene'],
      ['PVC', '==Self-extinguishes==, green edge', 'Sharp HCl, white fumes'],
      ['PET', 'Sooty', 'Sweet burnt; **hard black bead**'],
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each recorded observation to the plastic it best fits.',
    pairs: [
      ['Dripping flame, candle odor', 'PE'],
      ['Self-extinguishes with a sharp acid odor', 'PVC'],
      ['Heavy orange soot, sweet floral odor', 'PS'],
      ['Sooty flame leaving a hard black bead', 'PET'],
      ['Like PE but acrid and less drip', 'PP'],
    ],
    explanation:
      'Aromatic rings (PS, PET) give soot. Chlorine in PVC suppresses burning and releases HCl. Polyolefins burn cleanly and drip like wax.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Halogen and solvent screens',
    bullets: [
      'The historical **Beilstein copper-wire** screen gives a green response with some **halogen-containing** materials.',
      '**Contamination and other compositions** can also give green, so specificity is limited.',
      '**Acetone** softens polystyrene among the common codes, but response varies with formulation and exposure.',
      'This course uses ==virtual reference observations only==; physical screens need an approved, supervised lab method.',
    ],
    callout: 'No single halogen or solvent response **uniquely establishes** a polymer.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'A recorded green copper-wire response appears for a dense sinker. What is the best statement?',
    options: [
      'Consistent with a halogen-containing polymer such as PVC; confirm with other evidence',
      'The chip is proven to be PVC',
      'The chip must be PET',
      'The result rules out every other plastic',
    ],
    answer: 0,
    explanation:
      'A green response points toward halogen, which fits PVC, but contamination or another composition can contribute. Combine it with density and the other observations.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked unknown: a clear, rigid sinker',
    problem:
      'An unmarked, **rigid, clear** chip sinks in water and in 1.20 salt. Recorded: sooty flame, sweet odor, acetone negative, **no green** copper response.',
    steps: [
      'Sinking in both liquids leaves **PET or PVC**.',
      'No halogen response and no HCl odor **argue against PVC**.',
      'Soot, sweet odor, and a clear rigid body fit **PET**.',
      'Name the alternative and the evidence that rejected it.',
    ],
    conclusion:
      '==Consistent with PET (code 1)==, such as polyester bottle stock; PVC shares the density but not the halogen evidence.',
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Put the steps of a plastic-unknown write-up in a sensible order.',
    items: [
      'Record form: color, clarity, stiffness, foam',
      'Float-sink in water',
      'Float-sink in salt solution',
      'Compare recorded flame and screen observations',
      'State the best candidate and the rejected alternative',
    ],
    explanation:
      'Nondestructive observations come first, density narrows the set, reference observations split what is left, and the conclusion names both the fit and the runner-up.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Errors and safety',
    bullets: [
      'Burning plastics releases **irritating fumes**, especially PVC and PS: ==this course does not burn samples==.',
      'Odor in reference tables was sampled by **wafting**, never by direct sniffing.',
      '**Mixtures and additives** shift colors, so require two independent confirmations.',
      'A **black-pigmented** chip hides soot, so lean on density and the screens instead.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which situations can make a single observation misleading? Select all that apply.',
    options: [
      'A bubble clinging to a rough edge',
      'Black pigment hiding soot',
      'A filler raising density',
      'Using two liquids instead of one',
      'Liquid carried over from the previous test',
    ],
    answers: [0, 1, 2, 4],
    explanation:
      'Bubbles, pigment, fillers, and carryover all distort one reading. Using a second liquid is the remedy, not a problem.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Brackets and Archimedes',
    bullets: [
      'Sinks in 0.90 but floats in 1.00 → **0.90 < ρ < 1.00**, ideally.',
      '**Suspended** means near the liquid’s density, but currents and bubbles blur it.',
      'Floating fraction submerged = **ρ sample / ρ liquid**; a sinker is simply fully submerged.',
      'Record **temperature and liquid identity**; do not report a precise density from one visual result.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'A solid HDPE chip (0.95 g/cm³) floats in water (1.00 g/cm³). What percentage of it sits below the surface?',
    answer: 95,
    tolerance: 1,
    unit: '%',
    explanation:
      'Submerged fraction = 0.95 / 1.00 = 0.95, so about 95% of the chip is below the waterline.',
  },
  {
    kind: 'example',
    section: 6,
    title: 'Worked example: a two-liquid bracket',
    problem:
      'A fragment **sinks in 0.92** g/mL and **floats in 0.98** g/mL. References: 0.90, 0.95, 1.20 g/mL.',
    steps: [
      'Sinking in 0.92 means density **> 0.92**.',
      'Floating in 0.98 means density **< 0.98**.',
      'The interval 0.92–0.98 holds only the **0.95** reference.',
      'State the assumptions: no bubbles, representative chip, valid liquid densities.',
    ],
    conclusion:
      'A bracket uses **two inequalities**; ==it is stronger than one result but still depends on the reference set==.',
  },
  {
    kind: 'mcq',
    section: 6,
    prompt:
      'Density says PVC, but the recorded halogen screen is negative. What should you do first?',
    options: [
      'Check assumptions: foam, bubbles, coatings, multilayer pieces, reagent performance',
      'Change the density record so it fits PET',
      'Report PVC and ignore the screen',
      'Report that plastics cannot be identified',
    ],
    answer: 0,
    explanation:
      'When tests disagree, inspect the assumptions behind each one. Never silently change a recorded observation to fit a preferred candidate.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Water then 1.20 salt splits **floaters, PS, and PET/PVC**.',
      'Recorded soot points to **aromatics**; self-extinguishing and HCl point to **PVC**.',
      'Halogen and solvent screens are ==clues, not proof==.',
      'Report a density **bracket** with its assumptions.',
      'Resolve contradictions by checking assumptions, never by editing data.',
    ],
  },
]);

const fibers = defineDeck('for-u4-l1', [
  {
    kind: 'title',
    title: 'Fibers: Classification and Microscopy',
    subtitle: 'Look first: **shape, diameter, and surface** sort most fibers before any chemistry.',
    objectives: [
      'Classify **natural, regenerated, and synthetic** fibers with examples.',
      'Use **lengthwise and cross-section** microscopy, including delusterant and diameter uniformity.',
      'Interpret recorded **thermal and alkali** observations for common fibers.',
      'State the **association limits** of fiber evidence.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: is rayon a natural or a synthetic fiber?',
    options: ['Natural', 'Synthetic', 'Neither: it is regenerated', 'Not sure'],
  },
  {
    kind: 'compare',
    section: 0,
    title: 'Fiber families',
    columns: ['Family', 'Examples', 'Chemistry'],
    rows: [
      ['Natural plant', '**Cotton**', 'Cellulose'],
      ['Natural animal', '**Wool**, silk', 'Protein'],
      ['Regenerated', '**Rayon**', '==Cellulose reformed== into a filament'],
      [
        'Synthetic',
        'Nylon, polyester, acrylic, olefin',
        'Polyamide, PET, polyacrylonitrile, polyolefin',
      ],
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Sort each fiber into its family.',
    bins: ['Natural', 'Regenerated', 'Synthetic'],
    items: [
      ['Cotton', 0],
      ['Wool', 0],
      ['Silk', 0],
      ['Rayon', 1],
      ['Nylon', 2],
      ['Polyester', 2],
      ['Acrylic', 2],
    ],
    explanation:
      'Rayon starts as natural cellulose but is dissolved and re-spun, so it is regenerated: manufactured, yet not wholly synthetic.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Cotton: the twisted ribbon',
    image: 'for-cotton',
    caption:
      'Cotton under polarized light: **flat ribbons** with periodic **twists (convolutions)** and varying width.',
    bullets: [
      'View lengthwise at **40×–100×** on a dry mount.',
      'Cotton: flat, twisted, ==variable diameter==; cross-section like a **kidney bean**.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Wool: overlapping scales',
    image: 'for-wool',
    caption:
      'A wool fiber in the electron microscope: **cuticle scales** overlap along the surface.',
    bullets: [
      'Wool is a **protein** fiber with scales and variable diameter; cross-section roughly round.',
      'Scales are the quickest way to tell an animal fiber from a plant or manufactured one.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Rayon and other manufactured fibers',
    image: 'for-rayon',
    caption:
      'Rayon: a smooth, **uniform** rod with lengthwise **striations**; its cross-section is serrated.',
    bullets: [
      'Manufactured fibers have ==uniform diameter== and smooth surfaces.',
      '**Delusterant** (titanium dioxide) shows as dark specks that reduce shine.',
      'Cross-sections: nylon round or **trilobal**, polyester round, acrylic bean or dog-bone.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each microscopic feature to the fiber it suggests.',
    pairs: [
      ['Flat ribbon with twists', 'Cotton'],
      ['Overlapping surface scales', 'Wool'],
      ['Smooth rod with lengthwise striations', 'Rayon'],
      ['Uniform rod with trilobal cross-section', 'Nylon'],
    ],
    explanation:
      'Natural fibers vary in width and carry distinctive surface features; manufactured fibers are uniform, with shape set by the spinneret.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Recorded thermal behavior',
    bullets: [
      'Reference tables compare **charring, melting, residue, and extinguishing**.',
      '**Cellulose** (cotton, rayon) chars; **protein** (wool, silk) gives a burnt-hair odor.',
      '**Synthetics** soften and form beads: nylon melts then burns, polyester melts, acrylic leaves a black bead.',
      '==Do not burn or smell unknown fibers==; interpret the supplied observations only.',
    ],
    callout: 'Blends and finishes **change these patterns**, so odor is never a unique identifier.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'A recorded observation says a fiber left a hard bead. Which group does that point to?',
    options: ['Synthetic (melt-forming) fibers', 'Cotton', 'Wool', 'Silk'],
    answer: 0,
    explanation:
      'Melting into a bead is typical of thermoplastic synthetics. Cellulose chars and protein crumbles to a brittle ash.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Chemical splits',
    bullets: [
      'Warm dilute **NaOH dissolves wool and silk** (protein) but not cotton or synthetics.',
      'That one result splits **animal** from **plant plus synthetic**.',
      '**Acetone** dissolves acetate but few common panel fibers, so it helps less.',
      '==Never bleach before color comparison==: bleach degrades protein and strips dye.',
      'Order: **structure, then color under the same light, then chemistry**.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Recorded result in warm dilute NaOH: which fibers dissolve?',
    bins: ['Dissolves', 'Does not dissolve'],
    items: [
      ['Wool', 0],
      ['Silk', 0],
      ['Cotton', 1],
      ['Polyester', 1],
      ['Nylon', 1],
      ['Rayon', 1],
    ],
    explanation:
      'Alkali attacks the peptide bonds of protein fibers. Cellulose and the common synthetics survive.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'What fibers prove',
    bullets: [
      'Fibers are **class evidence**: mass production limits individualization.',
      'Report **color, diameter, cross-section, delusterant**, and recorded behavior as separate comparisons.',
      '**Elimination** is powerful: different microscopy plus different behavior excludes quickly.',
      'In timed stations, ==eliminate obvious non-matches first==, then spend effort on the closest two.',
    ],
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'A structured feature set',
    bullets: [
      'Start with **composition**: plant cellulose, animal protein, regenerated, or synthetic.',
      'Then **shape, texture, diameter variation, and cross-section**.',
      'Assess color under **controlled light**; two blue fibers can carry different dyes.',
      'A **blend** may transfer only one component, so a missing component need not exclude the fabric.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which observations help distinguish fibers? Select all that apply.',
    options: [
      'Cross-section shape',
      'Diameter uniformity',
      'Surface scales or striations',
      'The brand of the garment it came from',
      'Delusterant specks',
    ],
    answers: [0, 1, 2, 4],
    explanation:
      'Physical features of the fiber itself are comparable. A brand name is not an observation of the trace.',
  },
  {
    kind: 'example',
    section: 6,
    title: 'Worked example: three references',
    problem:
      'A questioned fiber is a **flattened twisted ribbon** with a cellulose-associated response. References: A cotton, B wool, C a uniform synthetic.',
    steps: [
      'The convolutions fit **cotton** better than scaled wool or a uniform filament.',
      'The cellulose response is a **compatible chemical class**.',
      'Together they support a **cotton-like** identification within this set.',
      'They do not establish **one garment** or **when** transfer happened.',
    ],
    conclusion:
      '==Classification and source attribution are separate steps==, even when several observations agree.',
  },
  {
    kind: 'mcq',
    section: 6,
    prompt: 'Which finding raises the significance of a fiber association the most?',
    options: [
      'A cluster of matching uncommon fibers in a protected location',
      'One common white cotton fiber on a bus seat',
      'A fiber whose color looked similar under different lights',
      'A single fiber found weeks after contact',
    ],
    answer: 0,
    explanation:
      'Significance grows with how unusual the fiber is, how many are recovered, and whether the location limits other sources. Common, single, or poorly compared fibers say little.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Cotton **twists**, wool has **scales**, rayon is a **striated rod**.',
      'Uniform diameter and delusterant mean **manufactured**.',
      'Warm NaOH separates **protein** from everything else.',
      '==Fibers are class evidence==; context sets significance.',
    ],
  },
]);

const hair = defineDeck('for-u4-l2', [
  {
    kind: 'title',
    title: 'Hair Morphology and Comparison',
    subtitle: 'A microscope **narrows** the source; only DNA can **individualize**.',
    objectives: [
      'Label **cuticle, cortex, medulla, root, and shaft**.',
      'Distinguish **human from animal** hair and body-area traits.',
      'Use **medullary index** and pigment patterns in comparison.',
      'Explain why hair needs **DNA** for individualization.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: can a hair with no root still be useful evidence?',
    options: ['Yes', 'No', 'Only for animals', 'Not sure'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Hair anatomy',
    image: 'for-hair-follicle',
    caption:
      'A hair grows from its **follicle**; the **bulb** at the base holds the living root tissue.',
    bullets: [
      '**Cuticle**: overlapping outer scales. **Cortex**: pigment granules. **Medulla**: central canal.',
      'Medulla may be **continuous, interrupted, fragmented, or absent**.',
      '==Root tissue carries nuclear DNA==; a shed shaft mostly offers mitochondrial DNA.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Roots and growth phase',
    image: 'for-hair-root',
    caption:
      'A human hair root under the microscope. Root form hints at **growth phase** and DNA potential.',
    bullets: [
      '**Anagen** (growing) hairs have fleshy roots; **telogen** (shed) hairs have **club** roots.',
      'Forcibly pulled hairs may show a stretched follicle and sheath.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each hair structure to its description.',
    pairs: [
      ['Cuticle', 'Overlapping outer scales'],
      ['Cortex', 'Middle layer holding pigment granules'],
      ['Medulla', 'Central canal of variable form'],
      ['Root', 'Base that may carry cellular tissue'],
    ],
    explanation:
      'From outside in: cuticle, cortex, medulla. The root anchors the hair and is where nucleated cells may remain.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Human versus animal',
    image: 'for-hair-wool',
    caption:
      'Merino wool (top) above a human hair (bottom): both have **scales**, but size and **scale pattern** differ.',
    bullets: [
      'Human: **narrow or absent medulla** (index under about 0.33), fine pigment, **imbricate** scales.',
      'Animal: often a **wide medulla** (over about 0.50), coarse pigment, **coronal or spinous** scales.',
      'Deer shows a **lattice** medulla; rabbit a **multiserial ladder**.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A shaft is 80 µm wide and its medulla is 20 µm wide at the same point. What is the medullary index?',
    answer: 0.25,
    tolerance: 0.005,
    explanation:
      'Index = medulla width ÷ shaft width = 20 ÷ 80 = 0.25. The units cancel, so the index has none.',
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Which traits lean human and which lean animal?',
    bins: ['Leans human', 'Leans animal'],
    items: [
      ['Medullary index about 0.2', 0],
      ['Medullary index about 0.6', 1],
      ['Imbricate (flattened) scales', 0],
      ['Spinous or coronal scales', 1],
      ['Lattice medulla', 1],
      ['Fine, evenly spread pigment', 0],
    ],
    explanation:
      'These are tendencies, not hard boundaries, but together they separate most human from most animal hairs.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Body area and treatment',
    bullets: [
      '**Scalp**: long, even diameter. **Pubic**: coarse, wide diameter variation, buckled. **Facial**: coarse, triangular cross-section.',
      '**Bleach or dye** alters cortex color and damages the cuticle; a color boundary marks regrowth.',
      'Split ends and weathering reflect **age and exposure**.',
      '==Cosmetic treatment is class information== shared by many people.',
    ],
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Comparison protocol',
    bullets: [
      'Compare known and questioned side by side: **color, length, diameter, medulla, pigment, cuticle, tip**.',
      'Agreement on **all major traits** supports “consistent with.”',
      '**One major difference** (wide animal medulla versus absent human medulla) excludes.',
      '==Microscopy cannot individualize human hair==; name nuclear or mitochondrial DNA as the next step.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'Questioned and known scalp hairs agree on every major microscopic trait. What is the strongest correct statement?',
    options: [
      'The questioned hair is consistent with the known source; DNA would be needed to go further',
      'The questioned hair came from the suspect',
      'The hairs are from the same person to the exclusion of all others',
      'Nothing can be said without DNA',
    ],
    answer: 0,
    explanation:
      'Full agreement supports a limited association. Individual identification requires DNA, but the microscopic comparison still has value.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Collection pitfalls',
    bullets: [
      'Collect with **forceps**, package in **paper folds**; tape hides the scales.',
      'Take **control hairs from each body area** separately: scalp and pubic hair differ on one person.',
      'Avoid mixed piles where transfer direction cannot be told.',
      'A rootless shaft suits **microscopy and mtDNA**; a root is needed for nuclear STRs.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which practices protect hair evidence? Select all that apply.',
    options: [
      'Picking hairs up with forceps',
      'Folding them into paper packets',
      'Pressing them onto clear tape for storage',
      'Collecting separate controls from each body area',
      'Combining all hairs into one envelope',
    ],
    answers: [0, 1, 3],
    explanation:
      'Tape obscures the cuticle, and pooling destroys the link between each hair and its location.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Narrow, do not identify',
    bullets: [
      'Measure the medullary index **at a comparable location**; it can vary along one hair.',
      'Teaching ranges are **tendencies**, not species boundaries.',
      'One person’s hairs vary with **body area, growth phase, age, and treatment**.',
      'A **single known hair** may not capture that variation.',
    ],
  },
  {
    kind: 'fill',
    section: 6,
    prompt: 'Complete the statement about hair and DNA.',
    text: 'Root tissue can provide {0} DNA. A shaft mainly offers {1} DNA, which is shared along the {2} line and so discriminates less.',
    blanks: ['nuclear', 'mitochondrial', 'maternal'],
    distractors: ['paternal', 'synthetic', 'ribosomal'],
    explanation:
      'Mitochondria pass from mother to child, so maternal relatives can share a lineage. Nuclear STRs discriminate far more.',
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Analytical possibilities and limits',
    bullets: [
      'Avoid the absolute “no root, no nuclear DNA”: ==method and preservation matter==.',
      'Neither a resemblance nor a lineage match tells **when or how** a hair was deposited.',
      'A root photo alone does not reliably reconstruct **how a hair was removed**.',
      'Report **inclusion, exclusion, or inconclusive**.',
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Cuticle, cortex, medulla; **root** holds nucleated cells.',
      'Human medullary index is usually **under 0.33**; many animals exceed 0.50.',
      'Take **controls by body area**.',
      '==Microscopy narrows; DNA individualizes.==',
    ],
  },
]);

const chromatography = defineDeck('for-u5-l1', [
  {
    kind: 'title',
    title: 'Paper and Thin-Layer Chromatography',
    subtitle: 'Compare the **whole pattern**, run side by side, under matched conditions.',
    objectives: [
      'Calculate **Rf** and compare spots under identical conditions.',
      'Explain **stationary vs mobile** phase and polarity effects.',
      'Visualize spots with **UV and iodine**.',
      'Avoid **front overshoot, overloading, and mixed lanes**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: why should the origin line be drawn in pencil?',
    options: [
      'Graphite does not dissolve and run',
      'Pencil is cheaper',
      'Ink is too dark to see',
      'Not sure',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Separating an ink',
    image: 'for-ink',
    caption:
      'Paper chromatography of black ink: one spot becomes **several dyes** at different heights.',
    bullets: [
      'Compounds partition between the **stationary phase** (paper, silica) and the **mobile solvent**.',
      'On a polar stationary phase, ==polar compounds cling and move little==; nonpolar ones travel farther.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Retention factor',
    image: 'for-tlc-rf',
    caption:
      '**Rf = A / L**: spot-center distance from the start line divided by the solvent front’s distance.',
    bullets: [
      'Rf is always **between 0 and 1**; measure both distances **from the origin** in the same units.',
      'Measure to the **spot center**, not its leading edge.',
      'Mark the **front immediately** on removal, before it evaporates.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A spot center is 3.6 cm above the origin and the solvent front is 6.0 cm above it. What is the Rf?',
    answer: 0.6,
    tolerance: 0.01,
    explanation: 'Rf = 3.6 ÷ 6.0 = 0.60.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'A pen shows spots at Rf 0.25 (blue) and 0.60 (red). A suspect ink shows only 0.60 (red) on the same strip. What follows?',
    options: [
      'The inks differ, so the suspect ink is excluded as the sole source',
      'The inks match because they share the red spot',
      'Rf values cannot be compared on one strip',
      'The blue spot must be contamination',
    ],
    answer: 0,
    explanation:
      'Complete patterns must agree. A missing blue component means the suspect ink is a different mixture, unless sensitivity explains it.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Thin-layer plates and UV',
    image: 'for-tlc-uv',
    caption:
      'A TLC plate under UV (turned sideways): compounds show as **dark spots** on the fluorescent layer.',
    bullets: [
      'TLC uses **silica or alumina** on glass or plastic: sharper spots, faster runs than paper.',
      'Silica is polar, so a **nonpolar solvent** carries nonpolar dyes farther.',
      '**UV** shows aromatics; **iodine vapor** stains organics brown, reversibly.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each visualization to what it reveals best.',
    pairs: [
      ['UV light', 'Aromatic or fluorescent compounds'],
      ['Iodine vapor', 'Unsaturated organics, reversibly brown'],
      ['Ninhydrin', 'Amino acids'],
      ['Daylight', 'Colored dyes'],
    ],
    explanation:
      'Choose the detection method to match the chemistry. A compound invisible in daylight may still appear under UV.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Reading forensic strips',
    bullets: [
      'Count spots, record color **in daylight and UV**, and compute each Rf.',
      '**Co-migration** with a known supports consistency; tailing or double spots suggest mixtures.',
      'A **slanted front** means uneven saturation or tilt: note it, do not hide it.',
      '==Compare only lanes from the same plate.==',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'The solvent front on a plate is clearly slanted. What is the best practice?',
    options: [
      'Note it and compare only lanes on that same plate',
      'Redraw the front as a straight line',
      'Compare with published Rf values instead',
      'Ignore it, since slant never matters',
    ],
    answer: 0,
    explanation:
      'A slanted front signals uneven saturation or tilt. Record it honestly and compare lanes that ran together.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Classic errors',
    bullets: [
      '**Overloading** makes streaks that merge dyes: keep spots small and dry.',
      '**Origin below solvent** dissolves spots into the reservoir.',
      '**Fingers on silica** leave oils that distort lanes: handle plates by the edges.',
      'Photograph with a **ruler** so Rf can be checked later.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Good practice or error?',
    bins: ['Good practice', 'Error'],
    items: [
      ['Solvent level below the origin', 0],
      ['Large, wet, overloaded spot', 1],
      ['Marking the front right after removal', 0],
      ['Origin line drawn in ballpoint pen', 1],
      ['Comparing lanes from two different plates', 1],
      ['Handling the plate by its edges', 0],
    ],
    explanation: 'Each error either destroys the separation or makes Rf values incomparable.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Competing interactions',
    bullets: [
      'More time in the mobile phase → **travels farther**; stronger stationary interaction → **moves less**.',
      'Changing the solvent can **reorder** components, so Rf is ==not a universal constant==.',
      'Measuring the spot from the paper edge but the front from the origin gives a **false ratio**.',
      'Broad or streaked spots make the center **uncertain**.',
    ],
  },
  {
    kind: 'example',
    section: 6,
    title: 'Worked example: an ink pattern',
    problem:
      'Front at **8.0 cm**. Questioned spots at 2.0 and 6.0 cm. Reference spots at 2.0, 4.0 and 6.0 cm, run together.',
    steps: [
      'Questioned Rf: 2/8 = **0.25** and 6/8 = **0.75**.',
      'Reference Rf: **0.25, 0.50, 0.75**.',
      'Two components agree; the reference has an **extra** component.',
      'Check sensitivity, sampling, and degradation before calling it an exclusion.',
    ],
    conclusion:
      '==Do not report the patterns as identical==; compare the complete pattern and its detection limits.',
  },
  {
    kind: 'mcq',
    section: 6,
    prompt:
      'Two rounded Rf values are 0.50 and 0.51, but spot centers are uncertain by about ±0.2 cm on an 8 cm run. What is fair?',
    options: [
      'The difference is within measurement uncertainty, so it is not evidence of a mismatch',
      'They are definitely different compounds',
      'They are definitely the same compound',
      'Rf cannot be reported with uncertainty',
    ],
    answer: 0,
    explanation: '±0.2 cm on 8 cm is about ±0.025 in Rf, so a 0.01 difference is within the noise.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Rf = spot center ÷ front, **both from the origin**.',
      'Polar stationary phase holds **polar** compounds.',
      'Run knowns and unknowns ==on the same plate==.',
      'A shared spot is not a match; compare **every component**.',
      'Report Rf with honest **uncertainty**.',
    ],
  },
]);

const spectra = defineDeck('for-u5-l2', [
  {
    kind: 'title',
    title: 'Mass Spectrometry and Spectroscopy',
    subtitle: 'Mass, fragments, isotopes, and bonds: **each narrows, together they decide**.',
    objectives: [
      'Read the **molecular ion, base peak**, and M+1/M+2 isotope clues.',
      'Use common fragments (**43, 57, 77, 91**) to infer structure.',
      'Interpret **IR** carbonyl and O–H bands and simple UV logic.',
      'Match spectra to candidates **without overclaiming**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: is the tallest peak in a mass spectrum always the intact molecule?',
    options: ['Yes', 'No', 'Only for small molecules', 'Not sure'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Reading a mass spectrum',
    image: 'for-mass',
    caption:
      'A real spectrum: the **base peak** (m/z 43) is far from the **molecular ion** (m/z 306).',
    bullets: [
      'Ions are sorted by **m/z**; the molecular ion **M⁺** gives molar mass when visible.',
      'The **base peak** is set to 100% and is ==the most stable fragment==, not the heaviest ion.',
      '**Nitrogen rule**: an odd nominal M⁺ suggests an odd number of nitrogens.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each neutral loss from M to the group lost.',
    pairs: [
      ['M − 15', 'Methyl'],
      ['M − 18', 'Water'],
      ['M − 29', 'Ethyl'],
      ['M − 31', 'Methoxy'],
    ],
    explanation:
      'CH₃ = 15, H₂O = 18, C₂H₅ = 29, OCH₃ = 31. Track losses before guessing a structure.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Isotope clues',
    bullets: [
      '**Carbon-13**: M+1 is about **1.1% per carbon**.',
      '**Chlorine**: M+2 about **one-third** of M (³⁵Cl : ³⁷Cl ≈ 3 : 1).',
      '**Bromine**: M and M+2 **nearly equal** (⁷⁹Br : ⁸¹Br ≈ 1 : 1).',
      '==State the ratio explicitly== in your analysis.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A molecule has 6 carbon atoms. Roughly how tall is its M+1 peak, as a percentage of M?',
    answer: 6.6,
    tolerance: 0.3,
    unit: '%',
    explanation: '6 carbons × 1.1% per carbon ≈ 6.6% of the M peak.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'Peaks at m/z 156 and 158 have nearly equal heights. Which element is most likely present?',
    options: ['Bromine', 'Chlorine', 'Nitrogen', 'Oxygen'],
    answer: 0,
    explanation:
      'A 1 : 1 pair two units apart is the bromine signature; chlorine gives about 3 : 1.',
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each fragment m/z to the ion it usually signals.',
    pairs: [
      ['29', 'Ethyl'],
      ['43', 'Acetyl or propyl'],
      ['57', 'Butyl'],
      ['77', 'Phenyl'],
      ['91', 'Tropylium (benzyl)'],
      ['105', 'Benzoyl'],
    ],
    explanation:
      'A strong 77 with 105 suggests a benzoyl compound; a 91 base peak suggests a benzyl group or alkylbenzene.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Fragment patterns',
    bullets: [
      '**Alkanes** fragment in steps of 14 (CH₂).',
      '**Alcohols** lose 18 (water) and show 31.',
      '**Amines** give odd masses by the nitrogen rule.',
      '==Report a functional class plus molar mass== when isomers remain.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Infrared: bonds, not mass',
    image: 'for-ir',
    caption:
      'Ethanol’s IR spectrum: a **broad O–H** band near 3350 cm⁻¹ and **C–H** stretches just below 3000 cm⁻¹.',
    bullets: [
      'Broad **3200–3600**: O–H or N–H. Sharp **≈1700**: C=O. **≈1600**: aromatic. **≈2200**: nitrile or alkyne.',
      'Very broad **2500–3300** plus **1710** suggests a carboxylic acid.',
      'Highly conjugated dyes absorb **visible** light; simple alcohols do not.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Which technique answers each question best?',
    bins: ['Mass spectrometry', 'Infrared'],
    items: [
      ['What is the molar mass?', 0],
      ['Is a carbonyl group present?', 1],
      ['Does it contain bromine?', 0],
      ['Is there an O–H group?', 1],
      ['Which fragments form?', 0],
    ],
    explanation:
      'Mass spectrometry gives mass, isotopes, and fragments; IR gives bond vibrations and functional groups.',
  },
  {
    kind: 'flow',
    section: 4,
    title: 'Writing a spectra conclusion',
    steps: [
      { label: 'Molar mass', detail: 'From **M⁺**, if it is visible.' },
      { label: 'Isotopes', detail: '**M+1** carbon count; **M+2** for Cl or Br.' },
      { label: 'Fragments', detail: 'Base peak plus two others, with **neutral losses**.' },
      { label: 'IR cross-check', detail: 'Functional groups that fit or rule out candidates.' },
      {
        label: 'Rank candidates',
        detail: '==Best fit plus one alternative== and the test that would decide.',
      },
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: M⁺ 92, base peak 91',
    problem: 'A spectrum shows **M⁺ at 92**, a **base peak at 91**, and IR **aromatic** bands.',
    steps: [
      '92 − 91 = **loss of H**, leaving C₇H₇⁺ (tropylium).',
      'Aromatic IR bands support a **benzene ring**.',
      'Toluene (C₇H₈, 92) fits both.',
      'Name an alternative of mass 92 and the test that would separate them.',
    ],
    conclusion:
      '==Consistent with toluene==, supported by a benzyl fragment, rather than proven by one peak.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Reading from the axes',
    bullets: [
      'The y-axis is **relative intensity**, with the base peak at 100%.',
      'Only **charged** fragments are detected; neutral pieces are inferred from differences.',
      'M⁺ can be **weak or absent**, so the highest visible peak is not automatically the molecule.',
      'Isotope patterns depend on **charge, overlap, and resolution**.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt:
      'Which statements about the incensole spectrum (base peak 43, molecular ion 306) are true? Select all that apply.',
    options: [
      'The molar mass is about 306',
      'The base peak is set to 100% relative intensity',
      'The molecule has a mass of 43',
      'Fragment ions lighter than the molecular ion are present',
    ],
    answers: [0, 1, 3],
    explanation:
      'M⁺ at 306 gives the molar mass. The 43 peak is the most abundant fragment, not the molecule.',
  },
  {
    kind: 'mcq',
    section: 6,
    prompt:
      'A strong m/z 91 fragment appears, and two candidates of different molar mass can both produce it. What should you report?',
    options: [
      'A compatible benzyl motif; use the high-mass region or another test to decide',
      'The compound is toluene',
      'The lighter candidate, since 91 is closer to its mass',
      'Invent a molecular ion that fits the preferred candidate',
    ],
    answer: 0,
    explanation:
      'A shared fragment supports a motif, not one compound. Name the measurement that would resolve the ambiguity.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '**M⁺** gives mass; the **base peak** is the most stable fragment.',
      'Cl gives **3 : 1** M/M+2; Br gives **1 : 1**.',
      '**43, 57, 77, 91, 105** are workhorse fragments.',
      'IR shows **bonds**; mass spectrometry shows **mass**.',
      '==One peak starts an interpretation; it never finishes one.==',
    ],
  },
]);

export const forensicsDecksMaterials: Deck[] = [plasticId, fibers, hair, chromatography, spectra];
