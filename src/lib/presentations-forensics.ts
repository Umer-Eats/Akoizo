import { defineDeck, type Deck } from './presentation-types.ts';
import { forensicsDecksMaterials } from './presentations-forensics-2.ts';
import { forensicsDecksPrints } from './presentations-forensics-3.ts';
import { forensicsDecksScene } from './presentations-forensics-4.ts';

// Forensics (Division C) presentations, one per lesson, following presentations-anatomy.ts.
// Each deck follows its lesson in lessons-forensics.ts section by section (`section` is the
// lesson section index). Lab techniques are taught as recorded reference observations, as the
// lessons do: no deck gives instructions for burning, fuming, or heating real samples.

const method = defineDeck('for-u1-l1', [
  {
    kind: 'title',
    title: 'Forensic Method and Locard Exchange',
    subtitle: 'Every contact leaves a trace, but **a trace is not a verdict**.',
    objectives: [
      'Explain **Locard exchange** and class versus individual evidence.',
      'Distinguish **presumptive** from **confirmatory** tests.',
      'Apply search patterns and **chain of custody** to a scenario.',
      'Describe the Division C Forensics event format.',
    ],
    image: 'for-evidence',
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: a blue fiber on a chair matches a suspect’s jacket. How strong is that alone?',
    options: [
      'Proof of guilt',
      'Strong proof of contact',
      'A possible association only',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'What Forensics tests in Division C',
    bullets: [
      'A **crime scenario** plus physical samples: powders, plastics, fibers, hair, prints, chromatograms, mass spectra.',
      'Teams rotate through stations, run **spot tests**, record data tables, and write an analysis linking evidence to suspects.',
      '==Systematic comparison of known versus questioned samples== wins the event.',
      'You build **association or elimination** across many independent lines of evidence.',
      'Say **“consistent with”**, not “identical to,” unless a confirmatory test supports it.',
    ],
    callout: 'Speed, clean technique, and precise vocabulary matter as much as content knowledge.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Locard exchange principle',
    bullets: [
      '**Every contact leaves a trace**: fibers to seats, soil to shoes, oils to glass.',
      'Tiny samples matter, and **cross-transfer** is expected.',
      'One fiber match does not prove presence; ==combined independent matches build weight==.',
      'Exchange works both ways, so it also explains **contamination**.',
      'Wear gloves, use clean tools, package items separately, and never return sample to stock.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt:
      'Which habits protect against Locard-style contamination in the lab? Select all that apply.',
    options: [
      'Wiping the spatula between samples',
      'Using a fresh well plate for each reagent set',
      'Returning unused powder to its stock vial',
      'Packaging suspect and victim items separately',
      'Handling all items with the same gloves to save time',
    ],
    answers: [0, 1, 3],
    explanation:
      'Exchange works both ways: anything that touches two samples can carry material between them. Clean tools, fresh plates, and separate packaging break that path.',
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Class versus individual evidence',
    columns: ['Type', 'What it does', 'Examples'],
    rows: [
      [
        '**Class**',
        'Identifies a **group** of possible sources',
        'Polymer class, fiber type, ABO type',
      ],
      ['**More detailed**', 'Can give **stronger source support**', 'STR profile, ridge detail'],
      [
        'Strength depends on',
        '==Method, data quality, and relevant alternatives==',
        'No universal minutiae count',
      ],
      [
        'Separate questions',
        'A material source is **not responsibility**',
        'Owner of a jacket vs. actor',
      ],
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Is each finding class evidence or more source-specific evidence?',
    bins: ['Class evidence', 'More source-specific'],
    items: [
      ['Fiber is nylon', 0],
      ['Blood is type O', 0],
      ['Full single-source STR profile agrees at many loci', 1],
      ['Plastic chip is PET', 0],
      ['Clear ridge detail agrees across a large print region', 1],
      ['Soil is a sandy loam', 0],
    ],
    explanation:
      'Polymer, fiber, blood-group, and soil classes are shared by many sources. Detailed DNA and ridge comparisons can support a stronger source evaluation, still within a statistical framework.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Presumptive versus confirmatory tests',
    columns: ['', 'Presumptive', 'Confirmatory'],
    rows: [
      ['Purpose', '**Fast screening**', '**Specific identification**'],
      ['Weakness', '==False positives==', 'Slower, needs instruments'],
      [
        'Examples',
        'Luminol, phenolphthalein, cobalt thiocyanate',
        'Mass spectrometry, DNA profiling, crystal tests',
      ],
      [
        'Powder schemes',
        'Each color test alone',
        'Pattern across pH, solubility, precipitates, flame, Benedict',
      ],
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Luminol glows on a scrubbed floor. What is the best conclusion?',
    options: [
      'Blood may be present; a confirmatory test is needed',
      'Human blood is confirmed',
      'The stain is bleach',
      'The suspect cleaned the floor',
    ],
    answer: 0,
    explanation:
      'Luminol is presumptive. Bleach, rust, and plant peroxidases can also trigger it, so it narrows options and guides sampling for confirmation.',
  },
  {
    kind: 'flow',
    section: 4,
    title: 'Search patterns and chain of custody',
    steps: [
      {
        label: 'Search',
        detail:
          '**Spiral, grid, strip (line), or zone**; grid or strip outdoors, zone for small rooms.',
      },
      { label: 'Photograph', detail: 'Overall, medium, and close-up views **with a scale**.' },
      { label: 'Sketch', detail: 'Measured sketch of positions.' },
      { label: 'Collect', detail: '==Never move evidence before documentation.==' },
      { label: 'Custody log', detail: 'Every transfer **signed, dated, and sealed**.' },
    ],
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Put these crime-scene steps in order.',
    items: [
      'Secure the scene',
      'Photograph overall, medium, and close-up views',
      'Make a measured sketch',
      'Collect and package evidence',
      'Log the transfer to the lab',
    ],
    explanation:
      'Documentation comes before any item is moved, and the custody log records every hand-off after collection.',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'Four separate questions',
    steps: [
      { label: 'Material', detail: 'What is it? (**polyester fiber**)' },
      { label: 'Source', detail: 'Could it come from **this object or person**?' },
      {
        label: 'Activity',
        detail: 'How and **when** was it deposited? Needs transfer, persistence, background.',
      },
      {
        label: 'Responsibility',
        detail: '==Never inferred automatically== from any lower-level finding.',
      },
    ],
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each statement to the level of question it answers.',
    pairs: [
      ['The fiber is polyester', 'Material'],
      ['Similar fibers occur in the suspect’s jacket', 'Source'],
      ['The fiber was transferred during the break-in', 'Activity'],
      ['The suspect committed the break-in', 'Responsibility'],
    ],
    explanation:
      'Each level needs its own evidence. Jumping from a material finding straight to responsibility skips the source and activity questions.',
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'A reliable exclusion versus an uninformative result',
    bullets: [
      'An **exclusion** needs a meaningful incompatibility under valid measurement conditions.',
      'A faint feature missing from a poor image may be **inconclusive**, not exclusionary.',
      'A negative reagent result counts ==only if the positive control worked==.',
      'Keep **unavailable, not observed, and excluded** as different entries.',
      '**Chain of custody** preserves traceability; it does not prove a scientific conclusion.',
    ],
  },
  {
    kind: 'sort',
    section: 6,
    prompt: 'How should each result be recorded?',
    bins: ['Excluded', 'Inconclusive', 'Not tested'],
    items: [
      ['Clear, reproducible ink band missing from the suspect pen under valid controls', 0],
      ['Print feature not visible in a smeared region', 1],
      ['Reagent result negative, but the positive control also failed', 1],
      ['No time to run the Benedict test', 2],
      ['Reference fiber clearly different in cross-section under the same lighting', 0],
    ],
    explanation:
      'Only a valid, meaningful incompatibility excludes. Poor data and failed controls are inconclusive, and an untested item is simply not tested.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: a transferred fiber',
    problem:
      'A **blue polyester fiber** on a chair resembles fibers from a suspect’s common jacket. The jacket was in the room during an **earlier, unrelated meeting**.',
    steps: [
      '**Material**: the fiber is consistent with the polyester class and color.',
      '**Source limit**: many garments share those traits, so the jacket is not uniquely identified.',
      '**Activity alternative**: the earlier innocent contact could explain transfer and persistence.',
      'Conclusion: a possible association, not contact during the incident or responsibility.',
    ],
    conclusion: '==State what the observation measures and never skip levels of inference.==',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '**Locard**: every contact leaves a trace, in both directions.',
      'Class evidence narrows; detailed comparisons need statistical support.',
      'Presumptive tests screen; ==confirmatory tests identify==.',
      'Document before collecting, and log every custody transfer.',
      'Keep material, source, activity, and responsibility separate.',
    ],
  },
]);

const safety = defineDeck('for-u1-l2', [
  {
    kind: 'title',
    title: 'Lab Safety, QA, and Documentation',
    subtitle: 'Controls tell you whether a result **means anything at all**.',
    objectives: [
      'Know PPE and reagent hazards for forensics stations.',
      'Build a competition data table with units, controls, and repeats.',
      'Use **blanks, knowns, and replicates** as quality control.',
      'Avoid contamination and **false positives**.',
    ],
    image: 'for-goggles',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: your reagent blank turns the same color as your unknown. What do you do?',
    options: [
      'Call the unknown positive',
      'Invalidate and repeat',
      'Ignore the blank',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Safety for forensics stations',
    bullets: [
      'Know the **hazards and the permitted procedure** before any physical work.',
      'Protective **eyewear**, suitable clothing, and **trained supervision** set how materials are handled.',
      '==Never taste, directly smell, or mix unknowns without an approved procedure.==',
      'This course uses **virtual samples**; real spills, disposal, and heating follow the supervised lab’s own protocol.',
    ],
  },
  {
    kind: 'multi',
    section: 0,
    prompt: 'Which choices follow forensics-station safety rules? Select all that apply.',
    options: [
      'Reading the station instructions before opening a vial',
      'Wearing goggles at a wet-chemistry station',
      'Sniffing an unknown powder directly to check its odor',
      'Using the disposal stream the supervisor names',
      'Mixing two unknowns to see what happens',
    ],
    answers: [0, 1, 3],
    explanation:
      'Follow the posted procedure, protect your eyes, and use the named waste stream. Direct sniffing and unplanned mixing are never allowed.',
  },
  {
    kind: 'compare',
    section: 1,
    title: 'Controls, blanks, and knowns',
    columns: ['Control', 'Question it answers', 'Example'],
    rows: [
      [
        '**Known standard**',
        'Do reagent and technique give the expected result?',
        'Table salt and baking soda run beside the unknown',
      ],
      [
        '**Reagent blank**',
        'What color does the reagent alone give?',
        'Distilled water plus reagent',
      ],
      ['**Replicate**', 'Is the observation **repeatable**?', 'Two pH strips, two flame trials'],
      [
        'Record both trials',
        '==Never overwrite a first result==',
        'Note settling after two minutes',
      ],
    ],
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Data tables that score',
    bullets: [
      'Headers: **sample, test, reagent concentration, observation with units, result**.',
      'Use precise verbs: **dissolved, effervesced, formed white precipitate**.',
      '==Avoid vague words like “reacted” or “changed.”==',
      'Include **negative results**: elimination is evidence.',
      'Note **timing**: AgCl darkens in light, Benedict needs sustained heat, iodine prints fade.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Is each notebook entry precise enough to score?',
    bins: ['Precise', 'Too vague'],
    items: [
      ['Formed white curdy precipitate within 10 s', 0],
      ['It reacted', 1],
      ['Effervesced immediately; solid fully dissolved', 0],
      ['Changed color', 1],
      ['No precipitate after 2 min (negative)', 0],
      ['Looked different', 1],
    ],
    explanation:
      'Scoring entries say what happened, how much, and when. Vague entries cannot be checked or used for elimination.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Contamination control',
    bullets: [
      'Fresh spatula or toothpick **per sample**; clean well plates between reagents; cap bottles at once.',
      'Open **one vial at a time**; powders drift easily.',
      '==Cross-transfer is the fastest way to fail qualitative analysis.==',
      'Fibers, hair, prints: use **forceps and paper folds**, not static-building plastic bags.',
      'Never process suspect and victim items on the same sheet; **change gloves** between sources.',
    ],
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Measurement discipline',
    bullets: [
      'A **few grains** for spot tests, **one drop** of indicator, **1–2 mL** for solubility.',
      '==Too much powder overwhelms reagents and masks colors.==',
      'Report size in **millimeters**; precipitate as **trace, slight, or heavy**; flame as **persistent or fleeting**.',
      'Judges compare wording across teams, so **quantitative detail wins ties**.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'A team adds a heaping spatula of powder to 1 mL of water and reports “insoluble.” What is the most likely problem?',
    options: [
      'Too much sample saturated the water and gave a false insoluble call',
      'The water was too pure',
      'Solubility tests need no measurement',
      'The powder must be a carbonate',
    ],
    answer: 0,
    explanation:
      'Micro-scale amounts (a few grains in 1–2 mL) let a soluble powder dissolve fully. Overloading fakes insolubility.',
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each control to the question it asks.',
    pairs: [
      ['Positive control', 'Can the method detect the target right now?'],
      ['Negative control', 'Does a sample without the target stay negative?'],
      ['Reagent blank', 'Did reagents or handling add contamination?'],
      ['Untreated reserve portion', 'Can the first result be rechecked later?'],
    ],
    explanation:
      'These controls are related but not interchangeable. Record each actual control observation instead of writing “controls passed.”',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Make controls answer explicit questions',
    bullets: [
      'If the **positive control fails**, ==a negative unknown says nothing== about absence.',
      'If the **blank reacts**, an unknown’s positive may include contamination.',
      'Use **fresh aliquots** for different tests so one reagent does not create the next result.',
      'Label the original sample and every derived portion; keep a small **untreated reserve**.',
    ],
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Control bias and preserve an audit trail',
    bullets: [
      'Record observations **before** opening a reference or picking a suspect: ==expectation shapes perception==.',
      '**Blind or coded references** reduce irrelevant context.',
      'Keep **raw observation** and **interpretation** in adjacent columns.',
      'Every number needs a **unit, a reference point, and realistic precision**.',
      'Correct with a single line and a reason; never erase the original.',
    ],
    callout: 'An extra calculation cannot rescue a dataset whose labels were swapped.',
  },
  {
    kind: 'fill',
    section: 6,
    prompt: 'Complete the measurement record rules.',
    text: 'A distance of 3.0 cm from the pencil {0} is different from 3.0 cm from the paper edge. A balance with hundredth-gram {1} does not justify six decimal places. A correction should preserve the {2} record.',
    blanks: ['baseline', 'resolution', 'original'],
    distractors: ['front', 'accuracy', 'final'],
    explanation:
      'Every number needs a reference point and realistic precision, and corrections keep the original entry visible with the reason for the change.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: a failed blank',
    problem:
      'A **reagent blank** and an **unknown** both turn yellow. The blank should stay clear.',
    steps: [
      'The **blank has failed**: contamination or an unintended reaction is in the procedure.',
      'Do not call the unknown positive; the same background could explain it.',
      'Preserve the record, find the reagent or handling issue, and **repeat with fresh materials**.',
      'Interpret the unknown only after valid control behavior.',
    ],
    conclusion:
      '==Invalidating a compromised run is a scientific result==; forcing an identification is not.',
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'Your positive starch control stays brown with iodine, and the unknown also stays brown. What can you conclude?',
    options: [
      'Nothing about starch: the test did not work',
      'The unknown contains no starch',
      'The unknown is glucose',
      'The unknown is starch',
    ],
    answer: 0,
    explanation:
      'A failed positive control means the reagent or procedure could not detect starch, so the negative unknown is uninterpretable.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Follow the posted procedure; **never taste or directly smell**.',
      'Run knowns and blanks beside unknowns; replicate key observations.',
      'Precise verbs, units, timing, and ==recorded negatives==.',
      'One tool, one sample; change gloves between sources.',
      'A failed control invalidates the run; that is a legitimate result.',
    ],
  },
]);

const powders = defineDeck('for-u2-l1', [
  {
    kind: 'title',
    title: 'Powder Scheme: Solubility, pH, and Precipitation',
    subtitle: 'Split white powders with **complementary tests**, not one dramatic reaction.',
    objectives: [
      'Run a flowchart using appearance, **solubility, pH**, and HCl and NaOH tests.',
      'Predict AgCl, PbCl₂, **carbonate effervescence**, and hydroxide precipitates.',
      'Separate NaCl, CaCO₃, AlCl₃, sucrose, and similar powders.',
      'Record **negative results** as elimination evidence.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how many common white powders could you tell apart by appearance alone?',
    options: ['Almost all', 'About half', 'Very few', 'Not sure yet'],
  },
  {
    kind: 'flow',
    section: 0,
    title: 'Flowchart logic',
    steps: [
      {
        label: 'Look',
        detail: 'Color and crystal shape under a hand lens (**non-destructive first**).',
      },
      { label: 'Solubility', detail: 'A micro-spatula in **1–2 mL distilled water**.' },
      {
        label: 'pH',
        detail: 'Moistened pH paper; ==record the number, not just “acid” or “base.”==',
      },
      { label: 'HCl', detail: 'Watch for **gas** or a **precipitate**.' },
      { label: 'NaOH', detail: 'Watch for a precipitate and its **behavior in excess**.' },
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Sort each powder by its water solubility.',
    bins: ['Soluble', 'Insoluble or slightly soluble'],
    items: [
      ['NaCl', 0],
      ['CaCO₃', 1],
      ['Sucrose', 0],
      ['Starch', 1],
      ['Na₂CO₃', 0],
      ['MgO', 1],
      ['Glucose', 0],
      ['CaSO₄', 1],
    ],
    explanation:
      'Sodium salts and simple sugars dissolve readily; calcium carbonate, calcium sulfate, magnesium oxide, and starch do not dissolve well in cold water.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A dissolved white powder gives pH 4 on pH paper. Which candidate fits best?',
    options: ['AlCl₃', 'Na₂CO₃', 'NaCl', 'Sucrose'],
    answer: 0,
    explanation:
      'Hydrated Al³⁺ hydrolyzes and makes the solution acidic. Carbonates are basic; NaCl and sucrose are near neutral.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'HCl tests and carbonate effervescence',
    image: 'for-agcl',
    caption:
      'White, curdy **silver chloride** forms when chloride meets Ag⁺. Unlike stable white sulfates, ==AgCl darkens in light==.',
    bullets: [
      'Dilute HCl on a carbonate gives **immediate effervescence**: CO₃²⁻ + 2H⁺ → CO₂ + H₂O.',
      'CaCO₃ fizzes and may dissolve; NaCl just dissolves, **no gas**.',
      'HCl precipitates **Ag⁺ as white AgCl** and **Pb²⁺ as white PbCl₂**.',
      '**PbCl₂ redissolves in hot water**, a classic confirmatory clue.',
    ],
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'NaOH tests and hydroxides',
    bullets: [
      '**Al³⁺** → white Al(OH)₃ that ==redissolves in excess NaOH== (amphoteric).',
      '**Mg²⁺** → white Mg(OH)₂ that stays in excess.',
      '**Fe³⁺** → **brown** Fe(OH)₃.',
      'Ammonium salts release **ammonia** with NaOH, turning moist red litmus blue.',
      'Record both the **first precipitate** and the **excess-NaOH** behavior.',
    ],
    callout: 'The dissolve-in-excess step is the discriminating observation most teams forget.',
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each ion to its NaOH result.',
    pairs: [
      ['Al³⁺', 'White precipitate that dissolves in excess'],
      ['Mg²⁺', 'White precipitate that stays in excess'],
      ['Fe³⁺', 'Rust-brown precipitate'],
      ['NH₄⁺', 'No precipitate; ammonia released'],
      ['Na⁺', 'No visible change'],
    ],
    explanation:
      'Record both the first precipitate and the excess-NaOH behavior: that second step separates amphoteric aluminum from magnesium.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Common Division C powder panel',
    columns: ['Powder', 'Key splits', 'Distinctive result'],
    rows: [
      ['NaCl / KCl', 'Soluble, neutral', 'Flame color separates Na from K'],
      ['Na₂CO₃ / CaCO₃', 'Basic; **fizz with HCl**', 'Solubility separates them'],
      ['AlCl₃', 'Soluble, **acidic**', 'Al(OH)₃ dissolves in excess NaOH'],
      ['Glucose / sucrose', 'Soluble, neutral', '==Only glucose turns Benedict brick-red=='],
      ['Starch', 'Cloudy in cold water', '**Blue-black with iodine**'],
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Which powder does each result point to?',
    bins: ['CaCO₃', 'AlCl₃', 'Starch', 'Glucose'],
    items: [
      ['Fizzes with HCl but barely dissolves in water', 0],
      ['Acidic solution; precipitate clears in excess NaOH', 1],
      ['Blue-black with iodine', 2],
      ['Brick-red Benedict result after heating', 3],
      ['Cloudy suspension in cold water, no fizz', 2],
      ['pH around 4, fully soluble', 1],
    ],
    explanation:
      'Each candidate has one or two signature results. Combine them so no single test carries the whole identification.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Avoiding false calls',
    bullets: [
      '**Too much powder** causes false insolubility: use a sesame-seed amount in 2 mL.',
      'Hard tap water can precipitate carbonates: ==use distilled water== for solubility and pH.',
      '**Timing matters**: carbonates fizz instantly; Al(OH)₃ clears in excess within a minute; AgCl darkens over minutes.',
      'Log the time of each observation explicitly.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which habits prevent false calls in powder tests? Select all that apply.',
    options: [
      'Using a sesame-seed amount of powder',
      'Using distilled water for solubility and pH',
      'Logging when each observation was made',
      'Using tap water to save time',
      'Adding extra powder when a sample looks insoluble',
    ],
    answers: [0, 1, 2],
    explanation:
      'Small samples, distilled water, and timed observations avoid the classic false insolubility, false precipitate, and missed timing errors.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Build a decision tree from chemical properties',
    bullets: [
      'Start from the **supplied candidate list** and the tests available.',
      'A good first test splits candidates into **informative groups** and saves sample.',
      '==White appearance has almost no discriminating power.==',
      'A soluble sample is not automatically a sugar; **fizzing identifies the anion, not the cation**.',
      'A negative result depends on concentration, solubility, and a **fresh aliquot**.',
    ],
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Mixtures and conflicting results',
    bullets: [
      'A **mixture** can show features of more than one component.',
      'Record **partial dissolution**, delayed response, and leftover solids.',
      'A candidate that explains one strong result but **contradicts another** needs re-evaluation.',
      '==Complementary evidence beats repeated evidence==: a second acid test on two carbonates repeats anion evidence.',
    ],
  },
  {
    kind: 'mcq',
    section: 6,
    prompt: 'Two candidates left: Na₂CO₃ and K₂CO₃. Which next test adds the most information?',
    options: [
      'A flame comparison for the cation',
      'Another HCl fizz test',
      'A pH test',
      'An iodine test',
    ],
    answer: 0,
    explanation:
      'Both are basic carbonates that fizz with acid, so acid and pH repeat the same anion evidence. A cation-sensitive flame comparison distinguishes sodium from potassium.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: narrowing an unknown',
    problem:
      'Candidates: **NaCl, Na₂CO₃, CaCO₃**. The unknown **releases gas with acid** and is **poorly soluble** in water.',
    steps: [
      'Gas release fits a **carbonate**, leaving Na₂CO₃ and CaCO₃.',
      '**Poor solubility** fits CaCO₃ better than Na₂CO₃.',
      'A **calcium flame** comparison would add cation evidence; another acid test would only repeat anion evidence.',
      'Most consistent with **CaCO₃ among the stated candidates**.',
    ],
    conclusion: '==Combine complementary properties== instead of relying on one dramatic reaction.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Non-destructive first, then solubility, pH, HCl, NaOH.',
      '**Carbonate + acid → CO₂**; AgCl and PbCl₂ are white chloride precipitates.',
      '==Al(OH)₃ dissolves in excess NaOH; Mg(OH)₂ does not.==',
      'Use micro amounts, distilled water, and timed observations.',
      'Pick the next test that separates the remaining candidates.',
    ],
  },
]);

const flame = defineDeck('for-u2-l2', [
  {
    kind: 'title',
    title: 'Flame Tests, Iodine, and Benedict',
    subtitle: 'Three tests, three different questions: **cation, starch, and reducing sugar**.',
    objectives: [
      'Recall flame colors for Na, K, Ca, Sr, Cu, and B, with **cobalt-glass** masking.',
      'Interpret **iodine–starch** and **Benedict** results.',
      'Avoid **sodium carryover** and ghost flames.',
      'Combine flame plus solubility to identify salts.',
    ],
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: every sample you test shows a bright yellow flame. What is the likeliest cause?',
    options: [
      'They all contain sodium',
      'Sodium contamination on the wire',
      'The flame is too hot',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Flame test technique and carryover',
    bullets: [
      'A clean wire must give **no color** on its own: that is the tool **blank**.',
      'Record the **immediate dominant color** and how long it lasts.',
      'Sodium is everywhere (fingers, glass) and gives an ==intense yellow that masks potassium==.',
      '**Cobalt-blue glass** absorbs sodium yellow and reveals potassium’s lilac.',
    ],
    callout:
      'In this course flame results are supplied as recorded observations; physical flame work follows a supervised procedure.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Flame color table',
    image: 'for-flame-colors',
    caption:
      'Metal salts give characteristic flame colors. Compare with a **known reference** run the same way, not with memory alone.',
    bullets: [
      '**Na** intense yellow; **K** lilac (through cobalt glass); **Li** carmine.',
      '**Ca** brick-red orange; **Sr** crimson; **Ba** apple green.',
      '**Cu** blue-green; **borate** green.',
      '==Flame is supporting evidence==: mixtures and contamination shift hues.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each ion to its reference flame color.',
    pairs: [
      ['Na⁺', 'Intense yellow'],
      ['K⁺', 'Lilac through cobalt glass'],
      ['Ca²⁺', 'Brick-red orange'],
      ['Sr²⁺', 'Crimson red'],
      ['Cu²⁺', 'Blue-green'],
      ['Ba²⁺', 'Apple green'],
    ],
    explanation:
      'These are the standard reference colors. Use them comparatively alongside a known sample run under the same conditions.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Iodine test for starch',
    image: 'for-iodine-starch',
    caption:
      'Iodine on a cut apple turns **blue-black** where starch is present (iodine slips into the coiled **amylose helices**); low-starch tissue near the core stays paler.',
    bullets: [
      'One drop on a small suspension gives a **fast, dramatic** positive.',
      '**Cellulose** fibers and simple sugars do not give this color.',
      'Excess heat or strong alkali can fade the complex: ==test at room temperature with a starch known==.',
      'Uniform versus **spotted** color hints at a mixture.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Iodine solution stays yellow-brown on a white powder. What does that result show?',
    options: [
      'No detectable starch; it says nothing about other sugars',
      'The powder is glucose',
      'The powder contains starch',
      'The powder is a carbonate',
    ],
    answer: 0,
    explanation:
      'Iodine answers only the starch question. A negative rules out detectable starch but cannot name the powder.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Benedict test for reducing sugars',
    image: 'for-benedict',
    caption:
      'Benedict reagent is a **blue** alkaline copper(II) solution. With a reducing sugar and heat it forms **orange-red Cu₂O**; without one the tube stays blue.',
    bullets: [
      '**Glucose** is reducing; **sucrose** is non-reducing and stays blue unless first hydrolyzed.',
      'Color grades with sugar amount: ==blue → green → yellow → orange → brick-red==.',
      'Record the **final color after heating**, not the first tint.',
      'Too much sugar gives a heavy red that hides other observations.',
    ],
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Order Benedict results from no reducing sugar to the most reducing sugar.',
    items: ['Blue', 'Green', 'Yellow', 'Orange', 'Brick-red'],
    explanation:
      'More reducing sugar reduces more Cu²⁺ to red Cu₂O, so the mixture shifts from blue through green and yellow to brick-red.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Putting the triad together',
    bullets: [
      'White, soluble, neutral, **yellow flame**, no iodine color, Benedict stays blue → **NaCl or sucrose**; split them with the AgCl chloride test.',
      'Yellow flame plus **brick-red Benedict** → a glucose and sodium mixture; reason about separating them.',
      '==Lilac through cobalt glass eliminates Na⁺== as the only cation.',
      '**Blue-black iodine** confirms starch despite looking like other whites.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Which candidate does each full result pattern support?',
    bins: ['KCl', 'CaCO₃', 'Glucose', 'Starch'],
    items: [
      ['Lilac through cobalt glass, highly soluble, neutral', 0],
      ['Brick-red flame, fizzes with HCl, poorly soluble', 1],
      ['Soluble, neutral, brick-red Benedict, iodine negative', 2],
      ['Cloudy in water, blue-black with iodine, Benedict blue', 3],
    ],
    explanation:
      'Each pattern combines a flame or carbohydrate test with solubility, so no single color carries the identification.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Color comes from atomic and molecular processes',
    bullets: [
      'In a flame, thermal energy **excites** species that emit characteristic wavelengths as they relax.',
      'The color you see is ==a combined visual signal==, not one isolated spectral line.',
      'A **clean tool blank** and a known reference separate a true sample effect from carryover.',
      'A **negative iodine result** does not mean “no carbohydrate”; glucose gives no starch color.',
      '**Benedict** screens reducing behavior, not all sugars equally.',
    ],
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Interpret a matrix, not a memorized list',
    bullets: [
      'Make a table: **candidates as rows, tests as columns**, expected positive, negative, or variable.',
      'Compare the unknown’s **complete pattern** with the matrix.',
      '==A vivid positive never cancels a reliable contradiction== in another column.',
      'Duration, reagent condition, sample amount, and contamination change observations.',
      'State the pattern, the candidates it supports, and the next test if more than one remains.',
    ],
  },
  {
    kind: 'example',
    section: 6,
    title: 'Worked example: two carbohydrate patterns',
    problem:
      '**Sample A** is iodine-positive and Benedict-negative. **Sample B** is iodine-negative and Benedict-positive.',
    steps: [
      'A supports a **starch-containing** candidate: iodine is the discriminating result.',
      'B supports a **reducing sugar** such as the supplied glucose, not every molecule of that class.',
      'Neither negative proves the sample has **no carbohydrate**.',
      'If one unknown were positive for both, consider a **mixture**.',
    ],
    conclusion: '==Starch detection and reducing behavior are different questions.==',
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'An unknown is iodine-negative. Which conclusion is justified?',
    options: [
      'No detectable starch under these conditions',
      'No carbohydrate of any kind',
      'It must be glucose',
      'It must be a salt',
    ],
    answer: 0,
    explanation:
      'The iodine test responds to starch structure. Sugars such as glucose and sucrose are carbohydrates that give no starch color.',
  },
  {
    kind: 'fill',
    section: 3,
    prompt: 'Complete the Benedict reasoning.',
    text: 'Glucose is a {0} sugar, so it turns Benedict reagent brick-red. Sucrose is {1}, so it stays blue unless it is first {2}.',
    blanks: ['reducing', 'non-reducing', 'hydrolyzed'],
    distractors: ['oxidizing', 'insoluble', 'dried'],
    explanation:
      'Glucose has a free aldehyde that reduces Cu²⁺. Sucrose’s linked units hide that group until hydrolysis splits it into glucose and fructose.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Flame identifies **cations**; check the blank wire for sodium carryover.',
      '**Cobalt glass** reveals potassium lilac under sodium yellow.',
      'Iodine → **starch**; Benedict → **reducing sugar**.',
      '==Compare full patterns in a matrix==, never one vivid color.',
      'A negative test answers only the question that test asks.',
    ],
  },
]);

const polymers = defineDeck('for-u3-l1', [
  {
    kind: 'title',
    title: 'Polymer Chemistry and Recycling Codes',
    subtitle: 'Chain structure explains how plastics **float, soften, and look**.',
    objectives: [
      'Distinguish **addition vs condensation** and **thermoplastic vs thermoset**.',
      'Decode **recycling codes 1–6** with monomers and properties.',
      'Predict float–sink from **density**.',
      'Link **crystallinity** to appearance and behavior.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: does a “1” stamped on a bottle prove the chip in front of you is PET?',
    options: ['Yes', 'No, tests outrank stamps', 'Only if it is clear', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Monomers to polymers',
    image: 'for-polyethylene',
    caption:
      '**Addition polymerization**: many ethylene monomers join into one polyethylene chain with **no byproduct** (Polish labels: heat and pressure, catalyst).',
    bullets: [
      '**Addition**: unsaturated monomers link (polyethylene, polystyrene, PVC).',
      '**Condensation**: each link releases a small molecule such as water: ==PET and nylon==.',
      '**Thermoplastics** have linear or branched chains that soften and remelt.',
      '**Thermosets** have 3-D cross-links and char instead of melting.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Is each polymer made by addition or condensation?',
    bins: ['Addition', 'Condensation'],
    items: [
      ['Polyethylene', 0],
      ['PET', 1],
      ['Polystyrene', 0],
      ['Nylon', 1],
      ['Polypropylene', 0],
      ['PVC', 0],
    ],
    explanation:
      'Alkene monomers add without byproducts. PET (diacid + diol) and nylon (diacid + diamine) release water as each link forms.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Codes 1 to 6',
    image: 'for-resin-codes',
    caption:
      '**Resin identification codes** name the base polymer family. They are a manufacturing label, not proof of what a fragment is.',
    bullets: [
      '**1 PETE**: clear, strong polyester bottles. **2 HDPE**: opaque, waxy jugs.',
      '**3 PVC**: dense, chlorine-containing pipe and blister packs. **4 LDPE**: flexible film and bags.',
      '**5 PP**: heat-resistant tubs and caps. **6 PS**: rigid or foamed cups and cutlery.',
      '==Branching lowers density and crystallinity==: LDPE is softer and less dense than HDPE.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each resin code to its monomer.',
    pairs: [
      ['1 PETE', 'Ethylene glycol + terephthalic acid'],
      ['2 HDPE', 'Ethylene, little branching'],
      ['3 PVC', 'Vinyl chloride'],
      ['5 PP', 'Propylene'],
      ['6 PS', 'Styrene'],
    ],
    explanation:
      'HDPE and LDPE share the ethylene monomer and differ in branching; the others each come from a distinct monomer.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Density and crystallinity',
    bullets: [
      'Typical densities (g/cm³): **PP 0.90, LDPE 0.92, HDPE 0.95, PS 1.05, PET 1.38, PVC 1.38**.',
      'In water (1.00): ==PP, LDPE, and HDPE float; PS, PET, and PVC sink==.',
      '**Crystalline** regions are ordered and opaque; **amorphous** regions are clear.',
      'PET bottles are clear when quenched but whiten when crystallized.',
      '**Foamed PS traps air and floats** despite a solid density above water.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Solid, bubble-free chips: which float in water (1.00 g/cm³)?',
    bins: ['Floats', 'Sinks'],
    items: [
      ['PP (0.90)', 0],
      ['LDPE (0.92)', 0],
      ['HDPE (0.95)', 0],
      ['PS (1.05)', 1],
      ['PET (1.38)', 1],
      ['PVC (1.38)', 1],
    ],
    explanation:
      'Anything less dense than the liquid floats. The polyolefins float; polystyrene, PET, and PVC sink as solid pieces.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Thermal and chemical hints',
    columns: ['Polymer', 'Thermal behavior', 'Chemical resistance'],
    rows: [
      ['PP', 'Resists heat and microwaving', 'Good general resistance'],
      ['PS', 'Softens; styrene odor', '==Attacked by acetone=='],
      ['PVC', 'Chars; releases HCl', 'Resists hydrocarbons'],
      ['PET', 'Shrinks when warmed', 'Resists many solvents; hydrolyzes in hot strong alkali'],
      ['HDPE', 'Softens; waxy', 'Resists acids'],
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'In the reference table, which common plastic is attacked by acetone?',
    options: ['Polystyrene', 'Polypropylene', 'HDPE', 'PVC'],
    answer: 0,
    explanation:
      'Among the common codes, acetone softens polystyrene; the polyolefins and PVC resist it.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Competition strategy',
    bullets: [
      'Combine **code mark, clarity, flexibility, density**, and later reference observations.',
      'A clear, rigid sinker marked 1 that behaves as polyester → **PET**.',
      'An opaque, flexible floater → **PE or PP**, split by heat resistance.',
      'Always check for **foam**, which inverts density logic.',
      '==Never identify by mark alone==: judges plant unmarked or mismarked pieces, and tests outrank stamps.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'An unmarked white foam chip floats in water. What is the best response?',
    options: [
      'Note the foam: trapped air can make even PS float, so test a solid piece',
      'It must be polypropylene',
      'It must be LDPE',
      'Foam cannot be polystyrene',
    ],
    answer: 0,
    explanation:
      'Foamed polystyrene floats because of trapped air even though solid PS (1.05 g/cm³) sinks. Record the physical form before applying density logic.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Chain structure to bulk properties',
    bullets: [
      'Chain length, **branching, cross-linking**, intermolecular forces, and packing shape bulk behavior.',
      'Similar repeat units can differ in crystallinity, orientation, **additives**, and processing.',
      '==Density is not set by the recycling symbol alone==: pigments, fillers, plasticizers, and air change it.',
      'Addition versus condensation describes **how monomers link**, not the finished object’s code.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which factors can change a plastic chip’s apparent density? Select all that apply.',
    options: [
      'Mineral fillers',
      'Trapped air or foam',
      'The recycling number stamped on it',
      'Pigments and plasticizers',
      'Degree of crystallinity',
    ],
    answers: [0, 1, 3, 4],
    explanation:
      'Composition, additives, air, and packing all shift density. The stamp is just a label and has no physical effect.',
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Morphology and identification limits',
    bullets: [
      '**Crystalline** regions pack regularly; **amorphous** regions do not; most polymers have both.',
      '**Stretching orients chains** and changes mechanical properties.',
      'A thin film and a thick molded part of one polymer can look and behave differently: record the **physical form**.',
      '==A code or density narrows a class; it cannot identify one bottle or one owner.==',
    ],
  },
  {
    kind: 'example',
    section: 6,
    title: 'Worked example: a floating fragment',
    problem:
      'A fragment **floats in water**. The reference set holds **polypropylene and two polyethylenes**, all below 1.00 g/cm³.',
    steps: [
      'Floating means the fragment’s effective density is **below the liquid’s**.',
      'All three candidates satisfy that, so water alone **does not distinguish** them.',
      'A second liquid of carefully chosen density could **subdivide** the group.',
      'Chemical or spectroscopic evidence may be needed, especially if fillers or bubbles are present.',
    ],
    conclusion:
      '==A physical property constrains a candidate set==; it does not necessarily give a unique name.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'PET and nylon are **condensation** polymers; PE, PP, PS, PVC are **addition**.',
      'Thermoplastics soften; thermosets char.',
      '==In water, PP/LDPE/HDPE float; PS/PET/PVC sink (unless foamed).==',
      'Branching lowers density; crystallinity raises opacity.',
      'Tests outrank stamps; a class is not a unique source.',
    ],
  },
]);

export const decks: Deck[] = [
  method,
  safety,
  powders,
  flame,
  polymers,
  ...forensicsDecksMaterials,
  ...forensicsDecksPrints,
  ...forensicsDecksScene,
];
