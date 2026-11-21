import { defineDeck, type Deck } from './presentation-types.ts';

// Forensics decks for Units 8–9 (glass and toolmarks, entomology and soil, environmental traces,
// data and error analysis, final synthesis), imported by presentations-forensics.ts. Firearms
// appear only as marked evidence to interpret, never as operation or construction.

const glass = defineDeck('for-u8-l1', [
  {
    kind: 'title',
    title: 'Glass Fracture and Ballistics',
    subtitle:
      'Cracks give **sequence and direction**; marks give **class and comparison**, not a shooter.',
    objectives: [
      'Read **radial vs concentric** fractures and the **3R rule**.',
      'Compare glass by **refractive index, Becke line**, and density.',
      'Compare bullets by **caliber, rifling, and striations**.',
      'Treat **range and direction** clues cautiously.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: two bullet holes in one window. Can you tell which came first?',
    options: ['Yes, from the cracks', 'No, never', 'Only with video', 'Not sure'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Radial and concentric fractures',
    image: 'for-glass-fracture',
    caption:
      '**Radial** fractures spread outward from the impact like spokes; **concentric** fractures circle it.',
    bullets: [
      '**3R rule**: Radial cracks form a **Right angle** on the **Reverse** side from impact.',
      'A **later crack stops** where it meets an earlier one: that orders the impacts.',
      'The cone or crater is **wider on the exit side**.',
      '==Do not wash edges== before microscopy; adhering fragments preserve fit and RI clues.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'The radial cracks from hole B stop where they meet the cracks of hole A. What follows?',
    options: [
      'Hole A was made first',
      'Hole B was made first',
      'Both were made at once',
      'Nothing about order',
    ],
    answer: 0,
    explanation:
      'A new crack cannot cross an existing break, so B’s cracks ending at A’s show that A already existed.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Refractive index and the Becke line',
    bullets: [
      '**RI** = speed of light in vacuum ÷ speed in the material.',
      'Soda-lime window **≈ 1.52**; borosilicate lower; lead crystal higher.',
      'Immerse fragments in calibrated oils: as **objective-to-specimen distance increases**, the bright **Becke line moves into the higher-RI medium**.',
      'When fragment and oil match, the line **disappears**.',
      '==Control temperature==: oil RI shifts with it. Density and elemental analysis add independent comparisons.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'As the objective-to-specimen distance is increased, the Becke line moves out of the glass into the oil. What does that show?',
    options: [
      'The oil has the higher RI',
      'The glass has the higher RI',
      'They match exactly',
      'The temperature is wrong',
    ],
    answer: 0,
    explanation:
      'The line moves toward the higher-index medium, here the oil. A matching oil would make the line vanish.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Bullet marks',
    image: 'for-fired-bullets',
    caption: 'Unfired and fired bullets: the barrel’s **lands and grooves** engrave the fired one.',
    bullets: [
      'Bullets carry **caliber, jacket, weight, and rifling engraving**.',
      'Cases show **firing-pin, breechface, extractor, and ejector** marks.',
      '**Groove count, width, and twist** are class traits shared by a model.',
      '==No universal line-count threshold guarantees identity==; quality, validation, and verification matter.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Class characteristic or finer individual detail?',
    bins: ['Class characteristic', 'Finer individual detail'],
    items: [
      ['Caliber', 0],
      ['Six grooves, right twist', 0],
      ['Groove width', 0],
      ['Fine striations on one land impression', 1],
      ['A wear nick in the breechface mark', 1],
    ],
    explanation:
      'Class traits narrow to a make or model. Finer marks from wear and manufacture may support a source comparison by a trained examiner.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Range and direction clues',
    bullets: [
      '**Soot, particulates, and defect shape** may inform a qualified reconstruction against reference conditions.',
      'Ammunition, intervening materials, and substrate **change** those patterns.',
      '==One defect does not establish an exact distance, direction, or actor.==',
      'In a classroom glass diagram, state the **assumptions** behind any direction call.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'A window has a small pit on one face and a wide crater on the other. What does the diagram support?',
    options: [
      'The projectile traveled from the pit side toward the crater side',
      'The projectile traveled from the crater side',
      'The exact firing distance',
      'Who fired the shot',
    ],
    answer: 0,
    explanation:
      'Beveling is wider on the exit side. Direction is a limited geometric inference; distance and actor need other evidence.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: writing the call',
    problem:
      'A questioned fragment reads **RI 1.520 at 25 °C**. The victim’s window reads 1.520; a suspect’s bottle reads **1.530**. Cracks from impact B stop at impact A.',
    steps: [
      'The fragment is **consistent with** the window within uncertainty.',
      'It is **inconsistent with** the bottle.',
      'Impact **A came before B**.',
      'State class and individual layers separately for any bullet comparison, pending verification.',
    ],
    conclusion: '==Report consistency, not identity==, and keep sequence separate from source.',
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Order the layers of a bullet comparison report.',
    items: [
      'Record class traits: caliber, groove count, twist',
      'Compare with test fires from the suspect firearm',
      'Describe agreement of finer striations',
      'Note that verification is pending',
    ],
    explanation:
      'Class agreement comes first; finer comparison builds on it; verification completes the examiner’s process.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Glass as a comparative measurement',
    bullets: [
      'Similar RI supports **class consistency**; many unrelated glasses share a value.',
      'A **physical fit** of broken edges asks a more specific question than shared RI.',
      'State the **Becke direction** explicitly instead of the vague phrase “raise focus.”',
      '==A mismatch must exceed the measurement’s real uncertainty.==',
    ],
  },
  {
    kind: 'example',
    section: 6,
    title: 'Worked example: consistency versus difference',
    problem:
      'Questioned **1.520 ± 0.002**. Reference A **1.521 ± 0.002**; reference B **1.535 ± 0.002**.',
    steps: [
      'A’s interval **overlaps** the questioned one: no meaningful mismatch.',
      'B’s interval is **well separated**: incompatible under these conditions.',
      'Overlap with A supports **consistency**, not one unique window.',
      'Record conditions and uncertainty so others can check.',
    ],
    conclusion: 'Interpret a measurement ==with its precision== before making a source claim.',
  },
  {
    kind: 'multi',
    section: 6,
    prompt:
      'Which statements are supported by glass and toolmark evidence alone? Select all that apply.',
    options: [
      'Impact A preceded impact B',
      'The fragment is consistent with the victim’s window',
      'The suspect fired the shot',
      'The bullet shares class traits with the suspect’s pistol model',
      'The window broke at exactly 9:14 p.m.',
    ],
    answers: [0, 1, 3],
    explanation:
      'Relative sequence, glass consistency, and class agreement are supported. Who acted and the absolute time need other evidence.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '**3R**: radial cracks, right angle, reverse side.',
      'Later cracks **stop** at earlier ones.',
      'Becke line moves **into the higher RI** as distance increases.',
      'Rifling class traits narrow; ==no line count guarantees identity==.',
      'Sequence and direction are not the actor.',
    ],
  },
]);

const entomology = defineDeck('for-u8-l2', [
  {
    kind: 'title',
    title: 'Entomology PMI and Soil',
    subtitle: 'Insects keep a **temperature-driven clock** that starts at colonization, not death.',
    objectives: [
      'Order **blow fly and beetle succession** and calculate **degree-hours**.',
      'Record **larvae, puparia, and temperature** data correctly.',
      'Compare soils by **color, texture, pH, and composition**.',
      'State **PMI and soil limits** with microclimate caveats.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: does a warmer week make fly larvae develop faster or slower?',
    options: ['Faster', 'Slower', 'No effect', 'Not sure'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Early colonizers',
    image: 'for-blowfly',
    caption: 'A **blow fly**: often among the first insects to reach remains when access allows.',
    bullets: [
      'Stages: **egg → larval instars → pupa in a puparium → adult**.',
      'Fresh eggs indicate a **recent laying event**; an empty puparium shows a **completed cycle**.',
      'Beetles and later species join as remains change.',
      '==No stage fixes a universal time since death.==',
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Put the blow fly life stages in order.',
    items: [
      'Egg',
      'First-instar larva',
      'Third-instar larva',
      'Pupa in a puparium',
      'Empty puparium after emergence',
    ],
    explanation: 'Each later stage records more accumulated development since the egg was laid.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Larval development and heat',
    image: 'for-maggots',
    caption:
      'A **blow fly larva**: stage and size, with temperature history, help estimate development time.',
    bullets: [
      'Development scales with temperature **above a base threshold**.',
      '**ADH** = Σ (hours × degrees above base).',
      'Use scene loggers and corrected weather data; **maggot-mass heat** can add several degrees.',
      '==Report PMI as a range with assumptions==, never a single hour.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A sample spends 24 h at a constant 20 °C. With a 6 °C base, how many accumulated degree-hours is that?',
    answer: 336,
    tolerance: 1,
    unit: 'degree-hours',
    explanation: '(20 − 6) × 24 = 14 × 24 = 336 degree-hours.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Collection and records',
    bullets: [
      'Specialist protocols preserve a **representative set of stages and locations**.',
      'Document **environmental conditions** at the scene.',
      'Species ID, preservation, and rearing follow **appropriate methods**.',
      '==Record missing information== rather than inventing a procedure or an age from size alone.',
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt: 'Which records matter for an insect-based estimate? Select all that apply.',
    options: [
      'Which stages were found, and where',
      'Scene temperature history',
      'Species identification',
      'The color of the investigator’s car',
      'Sun, shade, or wrapping of the remains',
    ],
    answers: [0, 1, 2, 4],
    explanation: 'Stage, location, species, and the thermal environment all feed the estimate.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Comparing soils',
    image: 'for-soil',
    caption:
      'The **USDA texture triangle**: sand, silt, and clay percentages place a soil in a texture class.',
    bullets: [
      'Compare **color** (Munsell), **texture**, minerals, organic matter, and pH.',
      'Ordinary **settling in water** depends on particle size; it is not a calibrated density gradient.',
      'References must capture **variation by location and depth**.',
      'A shoe can carry a **mixture** from several contacts.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'A soil from a shoe differs from one reference sample taken at the scene. What is the best response?',
    options: [
      'Check within-site variation and possible mixtures before calling it an exclusion',
      'Exclude the scene immediately',
      'Conclude the shoe was never there',
      'Ignore the difference',
    ],
    answer: 0,
    explanation:
      'Sites vary with depth and location, and shoes accumulate mixtures. A single reference may not represent the site.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Case synthesis',
    bullets: [
      'A valid species model plus thermal history supports an **insect-age interval**.',
      'That interval informs PMI only with **access and scene history**.',
      'Soil separately tests **material compatibility** with sampled places.',
      '==Neither proves a unique location or a precise time of death.==',
    ],
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Insect age is not PMI',
    bullets: [
      'Development estimates time since **colonization**, not automatically since death.',
      'Access may be **delayed** by enclosure, burial, or weather.',
      'The **oldest** relevant stage can say more about first colonization than the most numerous one.',
      'A mixed assemblage may reflect **several arrival events**.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'Remains were sealed indoors for two days before flies could reach them. How does that affect an insect-based estimate?',
    options: [
      'It underestimates time since death, because colonization was delayed',
      'It overestimates time since death',
      'It has no effect',
      'It makes the estimate exact',
    ],
    answer: 0,
    explanation:
      'The insect clock starts when insects arrive, so a delay before access makes the estimated interval shorter than the true PMI.',
  },
  {
    kind: 'example',
    section: 6,
    title: 'Worked example: two temperature intervals',
    problem:
      'A **6 °C** threshold. The sample experiences **12 h at 18 °C**, then **12 h at 22 °C**.',
    steps: [
      'First interval: (18 − 6) × 12 = **144** degree-hours.',
      'Second interval: (22 − 6) × 12 = **192** degree-hours.',
      'Total = **336** degree-hours.',
      'Hours below threshold add **zero**, not negative development.',
    ],
    conclusion:
      '==Thermal arithmetic is one part of the inference==; the age still dates the developmental start, not death.',
  },
  {
    kind: 'numeric',
    section: 6,
    prompt:
      'Base 10 °C. A sample spends 10 h at 25 °C, then 14 h at 8 °C. How many degree-hours accumulate?',
    answer: 150,
    tolerance: 1,
    unit: 'degree-hours',
    explanation: '(25 − 10) × 10 = 150. The 8 °C hours are below threshold and add 0. Total 150.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'ADH = Σ hours × **degrees above base**; below base adds zero.',
      'Insect age dates **colonization**, not death.',
      'Report PMI as a **range** with microclimate caveats.',
      'Soil references must capture **within-site variation**.',
      '==Insects and soil narrow; they do not pinpoint.==',
    ],
  },
]);

const environment = defineDeck('for-u8-l3', [
  {
    kind: 'title',
    title: 'Pollen, Seeds, Tracks, and Environmental Associations',
    subtitle: 'Compare **assemblages** and patterns; nature is not a unique barcode.',
    objectives: [
      'Compare **pollen and seeds** by morphology and reference samples.',
      'Separate **common background** from an **informative assemblage**.',
      'Separate footwear **class features** from **wear and damage**.',
      'Integrate botanical, soil, and track evidence **without assuming location or timing**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: a pine pollen grain is found on a jacket. Did the wearer touch a pine tree?',
    options: ['Yes', 'Not necessarily', 'Only in spring', 'Not sure'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Palynology',
    image: 'for-pollen',
    caption:
      'Pollen from several plants: **size, shape, apertures, and surface ornament** differ by plant group.',
    bullets: [
      'Pollen walls are **tough** and survive conditions that destroy softer tissue.',
      'Identification may reach **family or genus**, not always species.',
      'Wind-dispersed pollen travels **far** from its plant.',
      '==Record the whole assemblage==, not one striking grain.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each pollen feature to what it describes.',
    pairs: [
      ['Aperture', 'Opening or thin area in the grain wall'],
      ['Ornamentation', 'Surface texture such as spines or ridges'],
      ['Size', 'Grain diameter, measured against a scale'],
      ['Shape', 'Overall outline, round, oval, or lobed'],
    ],
    explanation:
      'Combined morphological features, checked against references, set the identification level.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Seeds and spermology',
    bullets: [
      'Here **spermology** means the study of seeds.',
      'Compare **dimensions, shape, surface texture, attachment structures**, and landmarks.',
      '**Hooked** seeds cling to clothing; others ride in soil or potting mix.',
      '==Shared plant distributions limit geographic specificity==: a landscaped species grows in many gardens.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'Only one reference site was sampled, and it matches a seed on the suspect’s shoe. What can you conclude?',
    options: [
      'The seed is consistent with that site, but other sites were not excluded',
      'The suspect was at that exact site',
      'No other site could produce that seed',
      'The seed proves when the visit happened',
    ],
    answer: 0,
    explanation:
      'With one reference, similarity cannot rule out unsampled places that share the species.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Assemblages, not isolated matches',
    bullets: [
      'An **assemblage** is the combination of types and their relative amounts.',
      'A mix of **pollen, seeds, minerals, and organics** says more than one common component.',
      'A **tiny sample** can miss a common component by chance.',
      '==Absence must be judged against sampling and detection.==',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Informative association or weak background?',
    bins: ['More informative', 'Weak background'],
    items: [
      ['A rare combination of four plant types matching one site', 0],
      ['One widespread wind-blown pollen type', 1],
      ['Grass pollen on a jacket in summer', 1],
      ['A distinctive seed plus matching soil minerals', 0],
      ['A single common weed seed', 1],
    ],
    explanation:
      'Combinations and uncommon types narrow environments; ubiquitous single types are expected almost anywhere.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Footwear impressions',
    image: 'for-shoe',
    caption:
      'A questioned print (Q1) compared with a suspect’s shoe (K1), with **corresponding features** labeled.',
    bullets: [
      '**Class**: tread design, size, element arrangement, shared by many shoes.',
      '**Acquired**: wear and damage that build up during the shoe’s history.',
      'A missing feature in a **partial** print may lie outside the contact area.',
      '**Soft soil deforms**, wet surfaces spread, movement smears; ==photograph with scale and square-on==.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Class or acquired characteristic?',
    bins: ['Class', 'Acquired'],
    items: [
      ['Tread pattern design', 0],
      ['Shoe size', 0],
      ['A cut in the heel', 1],
      ['Wear smoothing one edge', 1],
      ['Arrangement of tread blocks', 0],
      ['An embedded pebble', 1],
    ],
    explanation:
      'Manufactured features are shared across a model; wear and damage arise from one shoe’s history.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Integrate tracks, soil, and plants',
    bullets: [
      'A shoe can **carry** material from earlier places while **leaving** a new track.',
      'Material carried and pattern left answer **different questions**.',
      'They may share one transfer history, so ==do not multiply them as independent==.',
      'References from **one dry patch** may poorly represent a varied site.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt:
      'Why should a soil match and a tread match on the same shoe not simply be multiplied as independent evidence? Select all that apply.',
    options: [
      'They may come from the same contact event',
      'The shoe can carry soil from earlier places',
      'Tread and soil address different questions',
      'Soil can never be compared',
    ],
    answers: [0, 1, 2],
    explanation:
      'Shared history and different propositions mean the two findings are not automatically independent multipliers.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: a shared assemblage',
    problem:
      'Questioned material shares **three types** with site A. One type is **widespread**; site B shares only that common type. No other sites were sampled.',
    steps: [
      'Separate the **widespread** type from the informative **three-type** combination.',
      'A is **more consistent** with the assemblage than B.',
      'Do not claim **uniqueness**: the reference set is limited.',
      'Next: within-site variation, other plausible sites, recovery conditions, transfer history.',
    ],
    conclusion: '==A preference within a reference set is narrower than proof of origin.==',
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'A clear tread design is incompatible with a candidate shoe under comparable conditions. What does that support?',
    options: [
      'That shoe did not make this impression',
      'The wearer never visited the area',
      'The wearer is innocent of everything',
      'Nothing at all',
    ],
    answer: 0,
    explanation:
      'An exclusion applies to the source of that impression, not to every possible visit or role.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Pollen survives and travels: record **assemblages** and context.',
      'Seeds and plants are often **widespread**.',
      'Tread design is **class**; wear and damage are **acquired**.',
      'Carried material and left impressions are **not independent** by default.',
      '==Presence is not a timestamp.==',
    ],
  },
]);

const data = defineDeck('for-u9-l1', [
  {
    kind: 'title',
    title: 'Data Tables and Error Analysis',
    subtitle:
      'A traceable table and honest uncertainty **earn more points than a confident guess**.',
    objectives: [
      'Build data tables with **controls and negatives**.',
      'Quantify **uncertainty** for Rf, angle, RI, and ADH.',
      'Distinguish **random vs systematic** error and their fixes.',
      'Write **claim-evidence-reasoning** paragraphs.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: is “no reaction” worth writing down?',
    options: ['Yes, always', 'No, only positives count', 'Only if asked', 'Not sure'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Tables judges trust',
    bullets: [
      '**One master table** per evidence type.',
      'Columns: **sample code, known or questioned, reagent, observation with units, result**.',
      'Include **blanks and knowns** as rows so validation is visible.',
      '==Record negatives explicitly==: stayed blue, no effervescence, no green response.',
      'Correct with **a single line and initials**, never erasing.',
    ],
  },
  {
    kind: 'multi',
    section: 0,
    prompt: 'Which belong in a forensic data table? Select all that apply.',
    options: [
      'Sample codes',
      'Blank and known control rows',
      'Negative results',
      'Only the final answer',
      'Units with every measurement',
    ],
    answers: [0, 1, 2, 4],
    explanation:
      'Codes, controls, negatives, and units let a reader check the reasoning. A bare final answer cannot be audited.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Uncertainty basics',
    bullets: [
      'Uncertainty reflects the **actual instrument, procedure, and sample**.',
      'Keep the **raw distances** behind each Rf and stain angle, and the conditions behind RI.',
      'A **broad spot**, uncertain front, or varying microclimate can dominate.',
      '==There is no universal fixed precision== for every use of a method.',
    ],
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Random versus systematic error',
    columns: ['Type', 'Examples', 'Fix'],
    rows: [
      [
        'Random',
        'Ruler placement, spot-center judgment, flame flicker',
        '**Replicates and averaging**',
      ],
      [
        'Systematic',
        'Contaminated wire, tilted chamber, warm oils',
        '**Blanks, calibration, technique change**',
      ],
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Random or systematic error?',
    bins: ['Random', 'Systematic'],
    items: [
      ['Replicate Rf values scatter 0.58 to 0.62', 0],
      ['A blank wire still flames yellow every time', 1],
      ['A tilted chamber slants every solvent front', 1],
      ['Judging a spot center slightly differently each time', 0],
      ['Oils too warm, shifting every RI reading', 1],
    ],
    explanation:
      'Random error scatters both ways and averages out. Systematic error pushes every result the same way and needs a method fix.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Ten repeat measurements on a miscalibrated ruler agree closely. What does that show?',
    options: [
      'High precision but possibly poor accuracy; averaging cannot remove the bias',
      'The results must be accurate',
      'The error is random',
      'No calibration is ever needed',
    ],
    answer: 0,
    explanation:
      'Consistency is not correctness. A systematic bias repeats faithfully and needs calibration.',
  },
  {
    kind: 'flow',
    section: 3,
    title: 'Claim, evidence, reasoning',
    steps: [
      { label: 'Claim', detail: 'Powder A is **consistent with CaCO₃**.' },
      {
        label: 'Evidence',
        detail: 'HCl effervescence, brick-red flame, basic pH, **negative Benedict**.',
      },
      {
        label: 'Reasoning',
        detail: 'Carbonate releases **CO₂** with acid; calcium emits **brick-red**.',
      },
      {
        label: 'Limits and next test',
        detail: '==Name what would confirm== or rule out the claim.',
      },
    ],
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Order the parts of a CER paragraph.',
    items: ['Claim', 'Evidence with numbers', 'Scientific reasoning', 'Limits and next test'],
    explanation: 'Visible reasoning earns partial credit even when the final candidate is wrong.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Common point losses',
    bullets: [
      '**Vague verbs, missing units, unmarked fronts**, overstated matches.',
      'Writing ==“identical to” instead of “consistent with”== for class evidence.',
      'Ignoring a **mismatched band or peak**.',
      '**Sample-code swaps**: a perfect table with swapped labels still fails.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Which phrase is best for a fiber that shares every class feature with a reference?',
    options: [
      'Consistent with the reference',
      'Identical to the reference',
      'Proven to come from the reference',
      'A perfect match',
    ],
    answer: 0,
    explanation:
      'Class evidence supports consistency. Stronger words overstate what mass-produced material can show.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'A report that can be checked',
    bullets: [
      'Each row: **exhibit, portion tested, method, control result, raw observation, interpretation**.',
      'Add a **new row** for a repeat; never silently replace a value.',
      'Keep **not tested, inconclusive, negative, and excluded** as different states.',
      '==An empty cell is not evidence that a candidate failed.==',
      'Preserve the **inputs** behind every calculated number.',
    ],
  },
  {
    kind: 'example',
    section: 6,
    title: 'Worked example: propagating an interval',
    problem: 'Spot center **3.8–4.2 cm** from the baseline; solvent front **7.9–8.1 cm**.',
    steps: [
      'Smallest Rf: smallest numerator ÷ largest denominator = 3.8 ÷ 8.1 ≈ **0.469**.',
      'Largest Rf: 4.2 ÷ 7.9 ≈ **0.532**.',
      'Bounding interval ≈ **0.47–0.53**.',
      'A reference at 0.50 is **compatible**.',
    ],
    conclusion:
      '==Interval reasoning shows measurement limits== without pretending every ratio is equally precise.',
  },
  {
    kind: 'numeric',
    section: 6,
    prompt:
      'A spot center lies 3.8–4.2 cm from the baseline and the front 7.9–8.1 cm. What is the largest plausible Rf? (Give three decimals.)',
    answer: 0.532,
    tolerance: 0.002,
    explanation: 'Largest numerator over smallest denominator: 4.2 ÷ 7.9 ≈ 0.532.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Tables include **controls, negatives, and units**.',
      'Random error averages out; **systematic error needs calibration**.',
      'CER: claim, evidence, reasoning, **limits**.',
      'Say ==“consistent with”== for class evidence.',
      'Claims are no more precise than their inputs.',
    ],
  },
]);

const synthesis = defineDeck('for-u9-l2', [
  {
    kind: 'title',
    title: 'Mock Crime Synthesis and Time Plan',
    subtitle: 'Weigh evidence; do not **count matches**.',
    objectives: [
      'Rank candidates across **powders, polymers, prints, DNA, and spatter**.',
      'Reconcile **conflicting evidence** without cherry-picking.',
      'Allocate **team time** across stations.',
      'Write a **one-page analysis** with limits and next steps.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: a suspect matches four items and mismatches one. Are they the top suspect?',
    options: ['Yes, four beats one', 'It depends on what the items are', 'No', 'Not sure'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Synthesis method',
    bullets: [
      'Build a table of **candidate sources × evidence items**.',
      'Record **consistent, incompatible, inconclusive, and not examined** separately, each linked to its observation.',
      'Weigh **reliability, relevance, discrimination, and dependence**.',
      '==Exclusion from one item is not exclusion from every role== in the incident.',
    ],
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Handling conflicts',
    bullets: [
      'Conflicts are **normal**: a print mismatch may be old, partial, or another handler.',
      '==Never silently drop a mismatch==: state it, weigh clarity, propose a re-run.',
      'Touch DNA and shared classroom fibers may be **background**.',
      'Prefer evidence with **crime-specific context**: spatter geometry, ransom-ink Rf.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'A suspect matches the powder and DNA, but a clear print on the weapon is not theirs. What should the analysis do?',
    options: [
      'Report the mismatch, weigh its clarity, and consider another handler or an older print',
      'Leave the print out because it spoils the story',
      'Exclude the suspect from the whole incident',
      'Count two matches against one mismatch and stop there',
    ],
    answer: 0,
    explanation:
      'A mismatch must be stated and explained. It excludes the suspect as the source of that print, not from every role.',
  },
  {
    kind: 'flow',
    section: 2,
    title: 'A 50-minute practice plan',
    steps: [
      { label: 'Minutes 0–5', detail: 'Survey every station; record strips before they fade.' },
      {
        label: 'Minutes 5–35',
        detail:
          'Partner A: **wet chemistry and chromatography**. Partner B: **microscopy and prints**. Cross-check.',
      },
      { label: 'Minutes 35–50', detail: '**Write the analysis together.**' },
      {
        label: 'Before the event',
        detail: 'Pre-draw tables; pre-write **Rf, arcsin, medullary index, ADH**.',
      },
    ],
  },
  {
    kind: 'order',
    section: 2,
    prompt: 'Order the phases of the practice time plan.',
    items: [
      'Survey all stations',
      'Test unknowns against knowns in parallel',
      'Cross-check partner results',
      'Write the final analysis',
    ],
    explanation:
      'Survey first so nothing is skipped, test in parallel, verify, then protect writing time.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'The one-page final analysis',
    bullets: [
      '**Paragraph 1**: scenario and top-ranked candidate with overall confidence.',
      '**Paragraphs 2–4**: chemical ID; polymers and trace; biology and patterns, each **with numbers**.',
      '**Final paragraph**: limits, errors, and next confirmatory tests.',
      '==Honest limits earn more than false certainty.==',
    ],
  },
  {
    kind: 'fill',
    section: 3,
    prompt: 'Complete the closing paragraph guidance.',
    text: 'The final paragraph lists {0}, errors, and the next {1} tests, because honest limits earn more than false {2}.',
    blanks: ['limits', 'confirmatory', 'certainty'],
    distractors: ['suspects', 'optional', 'speed'],
    explanation:
      'Naming limits and follow-up tests mirrors real forensic reporting and is rewarded by judges.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Drill before competition',
    bullets: [
      'Run a **timed mock** with planted unknowns: carbonate powder, PET chip, cotton vs polyester, three-band ink, loop print, type A blood, 30° spatter, RI 1.52 glass, toluene spectrum.',
      'Score with a rubric that **penalizes overstated language** and missing blanks.',
      'Debrief the **fastest elimination** and the most wasted test.',
      'Cut one low-yield step before the next mock.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each planted unknown to the key test result that identifies it.',
    pairs: [
      ['Carbonate powder', 'Fizzes with acid'],
      ['PET chip', 'Sinks in salt solution, no halogen response'],
      ['Three-band ink', 'Three spots on the chromatogram'],
      ['Type A blood', 'Clumps with anti-A only'],
      ['30° spatter', 'Width ÷ length = 0.5'],
    ],
    explanation:
      'Each planted unknown has one fast, decisive observation; drilling them frees time for writing.',
  },
  {
    kind: 'compare',
    section: 5,
    title: 'An evidence matrix',
    columns: ['Item', 'Candidate A', 'Candidate B'],
    rows: [
      ['Ransom-note ink', '**Consistent**', 'Incompatible'],
      ['Bloodstain STR', '==Excluded==', 'Not examined'],
      ['Fibers on seat', 'Consistent (common cotton)', 'Consistent (common cotton)'],
      ['Shoe print', 'Inconclusive (partial)', 'Incompatible'],
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which practices keep an evidence matrix honest? Select all that apply.',
    options: [
      'Linking each cell to its observation',
      'Keeping not examined separate from incompatible',
      'Counting two tests on the same dye as two independent links',
      'Noting that one contact can transfer several traces',
      'Ranking by the total number of matches only',
    ],
    answers: [0, 1, 3],
    explanation:
      'Linked, distinct states and attention to dependence keep the matrix honest. Double-counting and vote-counting distort it.',
  },
  {
    kind: 'example',
    section: 6,
    title: 'Worked example: clues that seem to conflict',
    problem:
      'Candidate A’s pen is **compatible** with the ransom ink. A complete single-source stain profile **excludes A** as its donor. The scenario does not say the writer and donor are the same person.',
    steps: [
      'Ink: a **material-source association** with its usual limits.',
      'Stain: A is **not the donor** of that stain under the profile assumptions.',
      'Neither cancels the other: they address **different items and activities**.',
      'More context is needed to connect the roles.',
    ],
    conclusion: '==Attach every conclusion to a specific item and proposition.==',
  },
  {
    kind: 'mcq',
    section: 6,
    prompt: 'Which sentence best fits a scoped final conclusion?',
    options: [
      'Under the given assumptions, Candidate A ranks highest; the ink is a possible common material source, not proof A wrote the note',
      'Candidate A is guilty',
      'Candidate A wrote the note and left the blood',
      'The evidence proves exactly what happened',
    ],
    answer: 0,
    explanation:
      'A school ranking is not a legal finding. A good conclusion states its scope and what each item does and does not show.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Weigh **reliability, relevance, discrimination, dependence**: never just count.',
      'State every **conflict** and propose a re-run.',
      'Protect **writing time** with roles and a timebox.',
      '==Scope every conclusion to its item and proposition.==',
    ],
  },
]);

export const forensicsDecksScene: Deck[] = [glass, entomology, environment, data, synthesis];
