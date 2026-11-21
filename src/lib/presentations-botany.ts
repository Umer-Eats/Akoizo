import { defineDeck, type Deck } from './presentation-types.ts';
import { botanyDecksApplied } from './presentations-botany-2.ts';

// Botany (Division C) presentations. Each deck follows its lesson in lessons-botany.ts section by
// section (`section` is the lesson section index), and its activities rehearse the lesson's
// structures, mechanisms, worked example, and evidence reasoning.

const evidence = defineDeck('bot-u1-l1', [
  {
    kind: 'title',
    title: 'Botany, evidence, and ecosystem importance',
    subtitle:
      'What counts as a plant, how plant science gathers evidence, and why producers matter.',
    objectives: [
      'Define plants using more than **color** or **immobility**.',
      'Connect **primary production** to food webs.',
      'Distinguish **observation**, **classification**, and **experiment**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: is every green, photosynthetic organism a plant?',
    options: ['Yes', 'No', 'Only if it lives on land', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'What botany studies',
    bullets: [
      '**Botany** studies plant structure, function, diversity, development, evolution, and environment.',
      '==Green or immobile is not a definition==: some plants lack normal photosynthesis, and many photosynthesizers are not plants.',
      'Classification uses ==shared ancestry and traits==, not one superficial feature.',
      'Identify with reproductive structures, vascular features, tissues, and life cycle together.',
    ],
  },
  {
    kind: 'multi',
    section: 0,
    prompt:
      'Which evidence helps decide whether an organism is a land plant? Select all that apply.',
    options: [
      'How its embryo is protected and nourished',
      'Its life cycle',
      'Its tissues and vascular features',
      'Simply being green',
    ],
    answers: [0, 1, 2],
    explanation:
      'Land plants share embryo protection and a characteristic life cycle and tissues; many algae and bacteria are green too.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Historical approaches',
    bullets: [
      'Plant science grew through ==collections, anatomy, microscopy, physiology, genetics, and molecular methods==.',
      'A **herbarium** specimen keeps form and collection context, but ==not the living photosynthetic rate==.',
      'A microscope section shows tissues but may not identify the species.',
      'Methods are strongest when their evidence is ==complementary==.',
    ],
    image: 'bot-herbarium',
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each method to what it can reveal.',
    pairs: [
      ['Herbarium specimen', 'Form and collection place and date'],
      ['Microscope section', 'Tissue organization'],
      ['Controlled physiology experiment', 'How a rate responds to a factor'],
      ['DNA sequences', 'Ancestry and relationships'],
    ],
    explanation:
      'Each method answers a different question, so combining them is stronger than treating them as interchangeable.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Primary production',
    bullets: [
      'Producers turn ==light energy into chemical energy== while fixing inorganic carbon.',
      '**Gross primary production (GPP)** is total carbon fixation.',
      '**Net primary production (NPP)** = GPP − ==producer respiration==.',
      'Plants respire day and night; NPP supplies growth and food for consumers and decomposers.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: calculate NPP',
    problem:
      'A plant community fixes 100 carbon units and its producers respire 40 units over the same interval.',
    steps: [
      'Gross fixation (**GPP**) = 100 units.',
      'Subtract ==producer respiration==: 100 − 40 = 60.',
      'Do ==not== subtract consumer respiration when defining plant NPP.',
    ],
    conclusion: '**NPP** is 60 carbon units over the stated interval.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'A forest fixes 250 carbon units; its plants respire 110 units. What is NPP?',
    answer: 140,
    tolerance: 0,
    unit: 'units',
    explanation: 'NPP = GPP − producer respiration = 250 − 110 = 140 units.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Ecosystem functions',
    bullets: [
      'Plants ==create habitat, stabilize soil, shape water and energy exchange==, and cycle nutrients.',
      'Roots limit **erosion**; leaves shade and **transpire**; litter returns nutrients by decomposition.',
      'Plants trade with animals too, such as **pollinators**.',
      'A fast-growing invader can add biomass while ==reducing native diversity== or changing fire regimes.',
    ],
    image: 'bot-bee',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'An introduced grass doubles a site’s plant biomass but crowds out native species and fuels more fires. What is the best evaluation?',
    options: [
      'Judge it on several outcomes; more growth is not automatically beneficial',
      'It improved the ecosystem because biomass rose',
      'Biomass is the only measure that matters',
      'Fire frequency is unrelated to plants',
    ],
    answer: 0,
    explanation:
      'Ecosystem function includes diversity, soil, water, and disturbance regimes, not just how much grows.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Observation versus explanation',
    bullets: [
      '**Yellow leaves** are evidence, ==not a diagnosis==.',
      'Possible causes: nutrient limits, water stress, normal **senescence**, pathogens, or injury.',
      'A **controlled experiment** changes one factor and compares outcomes.',
      'A **classification key** sorts by traits but ==does not establish a cause==.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Which kind of question is each?',
    bins: ['Observation', 'Classification', 'Experiment'],
    items: [
      ['Recording that lower leaves are yellow', 0],
      ['Using a key to name the species from its flowers', 1],
      ['Comparing growth with and without added nitrogen', 2],
      ['Counting stomata on a leaf', 0],
      ['Watering half the plants twice as often and measuring wilting', 2],
    ],
    explanation:
      'Observations record what is there, keys assign names, and experiments manipulate a factor to test a cause.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Studying across scales',
    bullets: [
      'Link ==organelles → cells → tissues → organs → plants → populations → ecosystems==.',
      'Stomatal opening affects leaf gas exchange, plant water use, and canopy energy balance.',
      'Those links ==depend on scale and context==.',
      'Record the variable changed, output measured, and assumption held fixed.',
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Order these levels of organization from smallest to largest.',
    items: ['Chloroplast', 'Mesophyll cell', 'Leaf', 'Whole plant', 'Population', 'Ecosystem'],
    explanation:
      'An organelle sits in a cell, cells form an organ, organs form a plant, plants form populations, and populations sit in ecosystems.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Botany', back: 'Scientific study of plants and their relationships.' },
      { front: 'Primary production', back: 'Formation of organic material by producers.' },
      { front: 'Net primary production', back: 'Gross production minus producer respiration.' },
      { front: 'Herbarium', back: 'Curated collection of preserved plant specimens and data.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Plants are defined by ==ancestry and combined traits==, not color.',
      '**NPP = GPP − producer respiration.**',
      'Plant effects on ecosystems need ==several outcomes==, not just biomass.',
      'An observation suggests hypotheses; an **experiment** tests them.',
    ],
  },
]);

const tissues = defineDeck('bot-u2-l1', [
  {
    kind: 'title',
    title: 'Plant cells, tissues, and vascular organization',
    subtitle: 'From cell walls and vacuoles to xylem and phloem.',
    objectives: [
      'Relate **organelles** to plant-cell function.',
      'Compare **dermal**, **ground**, and **vascular** tissues.',
      'Distinguish **xylem** and **phloem** transport.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: does phloem always carry sugar downward?',
    options: ['Yes', 'No', 'Only in trees', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Cell structures and functions',
    image: 'bot-plant-cell',
    caption:
      'A plant cell has the usual eukaryotic organelles plus a **cellulose cell wall**, a large **central vacuole**, and **chloroplasts**.',
    bullets: [
      'The wall ==resists turgor pressure==; it lies outside the plasma membrane and does not replace it.',
      'The **vacuole** stores materials and balances water.',
      '==Not every plant cell has many chloroplasts==; most root cells have none.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each structure to its main role.',
    pairs: [
      ['Cell wall', 'Supports shape and resists turgor'],
      ['Central vacuole', 'Storage and osmotic balance'],
      ['Chloroplast', 'Photosynthesis'],
      ['Plasma membrane', 'Selective transport'],
    ],
    explanation:
      'The wall provides support, but the membrane still controls what enters; the vacuole stores, and chloroplasts photosynthesize.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Meristems and differentiation',
    bullets: [
      '**Meristems** keep dividing and supply new cells.',
      '**Apical meristems** drive ==primary growth in length==; **lateral meristems** drive ==secondary thickening==.',
      'Daughter cells **differentiate**, changing walls, organelles, and connections.',
      'Mature xylem conducting cells are ==dead at maturity==; growth is division, expansion, and differentiation.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Which meristem lets a tree trunk grow wider each year?',
    options: ['Lateral meristem (vascular cambium)', 'Apical meristem', 'Root cap', 'Epidermis'],
    answer: 0,
    explanation:
      'Lateral meristems such as the vascular cambium add secondary tissues that thicken stems; apical meristems lengthen them.',
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Three tissue systems',
    columns: ['System', 'Main job', 'Examples'],
    rows: [
      [
        '**Dermal**',
        'Outer interface: ==protection and regulated exchange==',
        'Epidermis, guard cells, cuticle',
      ],
      [
        '**Ground**',
        'Photosynthesis, ==storage, and support==',
        '**Parenchyma**, **collenchyma**, **sclerenchyma**',
      ],
      ['**Vascular**', 'Transport of water, minerals, and sugars', '**Xylem** and **phloem**'],
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Which tissue system does each cell belong to?',
    bins: ['Dermal', 'Ground', 'Vascular'],
    items: [
      ['Guard cell', 0],
      ['Palisade mesophyll cell', 1],
      ['Vessel element', 2],
      ['Sieve-tube element', 2],
      ['Sclerenchyma fiber in the cortex', 1],
      ['Root hair cell', 0],
    ],
    explanation:
      'Guard and root hair cells are epidermal, mesophyll and cortical fibers are ground tissue, and vessel and sieve elements are vascular.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Xylem conduction',
    image: 'bot-tilia-stem',
    caption:
      'A one-year basswood stem: rows of thick-walled **xylem** radiate from the pith. Their ==lignified walls resist collapse== under tension.',
    bullets: [
      'Xylem carries ==water and minerals== through **tracheids** and **vessel elements**.',
      'Flow is driven by ==water-potential gradients== from transpiration, not by cells pumping.',
      '**Pits** allow sideways flow; an **embolism** (air bubble) blocks a conduit.',
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Which statements about xylem conduits are correct? Select all that apply.',
    options: [
      'Tracheids and vessel elements are dead at maturity',
      'Lignified walls resist collapse under tension',
      'Pits let water move sideways between conduits',
      'Xylem cells actively pump water upward',
    ],
    answers: [0, 1, 2],
    explanation:
      'Xylem conduits are dead, lignified tubes connected by pits; flow follows water-potential gradients rather than pumping.',
  },
  {
    kind: 'fill',
    section: 4,
    prompt: 'Complete the description of phloem transport.',
    text: 'Phloem carries sugar from a {0} to a {1}, through living {2} supported by companion cells.',
    blanks: ['source', 'sink', 'sieve-tube elements'],
    distractors: ['vessel elements', 'tracheids'],
    explanation:
      'Sugar moves source to sink through sieve-tube elements, which depend on companion cells.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Phloem conduction',
    bullets: [
      '**Phloem** moves sugars from ==sources to sinks== through living cells.',
      'In angiosperms, **sieve-tube elements** work with **companion cells**.',
      'Loading sugar at the source draws in water, building ==pressure that drives bulk flow==.',
      'Sources: mature leaves or mobilized storage. Sinks: growing tissue, fruits, storage.',
    ],
    callout:
      '“Phloem always moves downward” is wrong: different tubes can flow in different directions.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: source and sink',
    problem:
      'A mature leaf exports sugar to a growing root. Identify source, sink, and transport tissue.',
    steps: [
      'The exporting leaf is the **source**.',
      'The growing root is a **sink** using imported sugar.',
      '**Phloem** carries organic solutes source to sink; xylem has a different main role.',
    ],
    conclusion: 'Direction follows ==source–sink relationships==, not a universal up/down rule.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Xylem versus phloem',
    columns: ['', 'Xylem', 'Phloem'],
    rows: [
      ['Carries', 'Water and minerals', 'Sugars and other organic solutes'],
      [
        'Cells at maturity',
        '==Dead== tracheids and vessels',
        '==Living== sieve tubes with companion cells',
      ],
      ['Driving force', 'Tension from **transpiration**', '**Pressure flow** from loading'],
      ['Direction', 'Mostly root to shoot', 'Source to sink, either way'],
    ],
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Interpreting a tissue diagram',
    bullets: [
      'First identify the ==organ, orientation, outer boundary, and repeating patterns==.',
      'Connect wall thickness, lumen size, and position to plausible function.',
      'An empty-looking lumen in a slide ==does not prove it was empty in life==.',
      'Anatomy suggests capacity; ==physiology measures actual flow==.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'A section shows wide, thick-walled, empty-looking cells in the vascular bundle. What is the best inference?',
    options: [
      'They are likely xylem conduits, dead at maturity and fluid-filled in life',
      'They were empty of water in the living plant',
      'They must be phloem',
      'They show the transport rate',
    ],
    answer: 0,
    explanation:
      'Wide lignified conduits are typical of xylem; preparation removes contents, and anatomy alone cannot give a rate.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Meristem', back: 'Region supplying dividing cells for growth.' },
      { front: 'Xylem', back: 'Water- and mineral-conducting, supporting tissue.' },
      { front: 'Phloem', back: 'Living tissue moving sugars from sources to sinks.' },
      { front: 'Turgor', back: 'Pressure of cell contents against the wall.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'The **cell wall** resists turgor; the membrane still controls transport.',
      'Meristems add length (**apical**) or girth (**lateral**).',
      '**Xylem**: dead, lignified, tension-driven. **Phloem**: living, ==source to sink==.',
      'Read a section by organ and pattern before naming tissues.',
    ],
  },
]);

const organs = defineDeck('bot-u3-l1', [
  {
    kind: 'title',
    title: 'Roots, stems, and leaves',
    subtitle: 'How each organ gathers, moves, and exchanges, and what it trades off.',
    objectives: [
      'Explain **root uptake** and selective entry.',
      'Relate **stem** organization to transport and support.',
      'Interpret **leaf anatomy** as a gas–water tradeoff.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: do roots “suck up” water?',
    options: ['Yes, like a straw', 'No, water follows gradients', 'Only at night', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Root systems',
    bullets: [
      'Roots ==anchor, absorb water and minerals, and store== reserves.',
      '**Taproot** and **fibrous** systems differ in architecture.',
      '**Root hairs** expand the absorptive surface near the tip.',
      'Water follows ==gradients==; active ion uptake can lower root water potential.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Why do root hairs increase water and mineral uptake?',
    options: [
      'They greatly enlarge the absorptive surface in contact with soil',
      'They pump water into the xylem',
      'They photosynthesize',
      'They seal the root against water',
    ],
    answer: 0,
    explanation:
      'Root hairs are thin epidermal extensions that multiply surface area near the root tip.',
  },
  {
    kind: 'compare',
    section: 1,
    title: 'Two routes into the root',
    columns: ['', 'Apoplast', 'Symplast'],
    rows: [
      [
        'Path',
        'Cell walls and spaces ==between== cells',
        'Through cell interiors via **plasmodesmata**',
      ],
      ['Selectivity', 'Unregulated until the endodermis', 'Membrane already crossed'],
      ['At the endodermis', '==Blocked by the Casparian strip==', 'Continues into the stele'],
    ],
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Selective entry to the stele',
    bullets: [
      'The **endodermis** surrounds the vascular cylinder (**stele**).',
      'Its **Casparian strip** is a waxy band that ==blocks the apoplast route==.',
      'Water and ions must ==cross a membrane==, so the root selects what enters.',
      'It controls solutes; it is not an absolute barrier to all water.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order the tissues water crosses from soil to xylem in a young root.',
    items: ['Root hair (epidermis)', 'Cortex', 'Endodermis', 'Pericycle', 'Xylem'],
    explanation:
      'Water enters at the epidermis, crosses the cortex, passes the selective endodermis, then the pericycle, and reaches xylem.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Stem support and transport',
    bullets: [
      'Stems ==position leaves and flowers== and connect transport pathways.',
      '**Vascular cambium** and **cork cambium** add secondary tissues in woody plants.',
      'Bundle arrangement varies among groups; ==one feature rarely identifies a group==.',
      'Support comes from **turgor**, thick walls, **lignin**, and geometry.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'A non-woody seedling wilts and droops when it dries out. Which support has it lost?',
    options: [
      'Turgor pressure in its cells',
      'Lignin in its wood',
      'Its cork cambium',
      'Its root cap',
    ],
    answer: 0,
    explanation:
      'Herbaceous stems rely heavily on turgor; losing water drops cell pressure and the stem droops.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Leaf surfaces and internal structure',
    image: 'bot-leaf-tissue',
    caption:
      'A leaf in section: **cuticle** and **epidermis** outside, **palisade** and **spongy mesophyll** inside, and a **stoma** on the lower surface.',
    bullets: [
      'The **cuticle** limits ==uncontrolled water loss==.',
      'Spongy mesophyll’s ==air spaces== speed internal gas diffusion.',
      '**Veins** bring xylem and phloem into the leaf.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Stomata link CO₂ and water',
    image: 'bot-stomata',
    caption:
      'A single **stoma** on a tomato leaf. Two **guard cells** open and close the pore that ==admits CO₂ and loses water vapor==.',
    bullets: [
      'One pore serves both gas uptake and water loss.',
      'Needles, succulents, and aquatic leaves arrange these tissues differently.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each leaf structure to its role.',
    pairs: [
      ['Cuticle', 'Reduces uncontrolled water loss'],
      ['Palisade mesophyll', 'Main photosynthetic layer'],
      ['Spongy mesophyll', 'Air spaces for gas diffusion'],
      ['Guard cells', 'Open and close the stoma'],
    ],
    explanation:
      'The cuticle seals, palisade cells capture light, spongy tissue holds air spaces, and guard cells regulate the pore.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Structure–function tradeoffs',
    bullets: [
      'Broad, thin leaves catch light and shorten diffusion paths but ==lose water and heat stress==.',
      'Thick cuticles, ==sunken stomata==, small leaves, and succulence conserve water.',
      'Roots and stems adapt to flooding, drought, climbing, and storage.',
      'Name the ==benefit and the cost==: saving water usually reduces gas exchange.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: closing stomata',
    problem: 'A leaf closes its stomata during dry conditions. Predict one benefit and one cost.',
    steps: [
      'Benefit: less ==water-vapor loss==.',
      'Cost: ==CO₂ diffusion== into the leaf also falls.',
      'Lower CO₂ can limit carbon fixation even in bright light.',
    ],
    conclusion: 'Water conservation and carbon uptake share ==the same pathway==.',
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which leaf traits help a desert plant conserve water? Select all that apply.',
    options: [
      'Thick cuticle',
      'Sunken stomata',
      'Succulent water storage',
      'Very large, thin leaves',
    ],
    answers: [0, 1, 2],
    explanation:
      'Thick cuticles, sunken stomata, and succulence limit water loss; large thin leaves lose water quickly.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Reading organ evidence',
    bullets: [
      'Identify the ==organ and orientation== before naming tissues.',
      'A cross section shows vascular arrangement, not whole root architecture.',
      'A leaf photo shows venation but ==does not measure stomatal conductance==.',
      'Separate anatomical role from a measured rate, then design an experiment for the rate.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'A photo shows a leaf with many stomata. Which claim does it support?',
    options: [
      'The leaf has the structures for gas exchange; the actual rate needs measuring',
      'The leaf transpires faster than any other leaf',
      'Its stomata were open when photographed',
      'The plant is a monocot',
    ],
    answer: 0,
    explanation:
      'Anatomy shows capacity; conductance or transpiration must be measured under defined conditions.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Apoplast', back: 'Cell-wall and extracellular transport pathway.' },
      { front: 'Symplast', back: 'Connected living-cell interior pathway.' },
      { front: 'Endodermis', back: 'Selective root layer around the vascular cylinder.' },
      { front: 'Stoma', back: 'Guard-cell-regulated pore for gas exchange.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'The **Casparian strip** forces water across a membrane at the ==endodermis==.',
      'Stems support and connect; secondary growth comes from **cambia**.',
      'Leaves trade ==CO₂ uptake against water loss== at the stomata.',
      'Anatomy shows a role; a measurement shows a rate.',
    ],
  },
]);

const water = defineDeck('bot-u4-l1', [
  {
    kind: 'title',
    title: 'Water transport, storage, hormones, and growth',
    subtitle:
      'Water potential, cohesion–tension, pressure flow, and the signals that steer growth.',
    objectives: [
      'Predict water movement from **water potential**.',
      'Explain **transpiration-driven** xylem flow.',
      'Connect **hormones** to context-dependent growth responses.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how does water reach the top of a 100 m redwood?',
    options: [
      'Roots pump it',
      'It is pulled up by evaporation from leaves',
      'Capillary action alone',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Water potential',
    bullets: [
      'Water moves from ==higher to lower water potential (Ψ)==.',
      'For a cell, **Ψ = Ψs + Ψp**: solute potential plus pressure potential.',
      '**Ψs** is negative; positive turgor (**Ψp**) raises Ψ.',
      '−0.4 MPa is ==higher== than −0.8 MPa, so water tends toward −0.8.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'A cell has Ψs = −0.7 MPa and Ψp = +0.3 MPa. What is its water potential in MPa?',
    answer: -0.4,
    tolerance: 0.001,
    unit: 'MPa',
    explanation: 'Ψ = Ψs + Ψp = −0.7 + 0.3 = −0.4 MPa.',
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: soil to leaf',
    problem:
      'Soil Ψ is −0.2 MPa, root −0.5 MPa, and leaf −1.0 MPa. Predict the idealized direction.',
    steps: [
      'Order from higher to lower: ==−0.2 > −0.5 > −1.0==.',
      'Water tends from **soil → root → leaf** when the pathway is connected.',
      'Resistance and supply still limit the actual rate.',
    ],
    conclusion:
      'Sign and total potential set direction, ==not the size of the negative number alone==.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Cohesion and tension',
    image: 'bot-transpiration',
    caption:
      'Water enters roots (1), rises through xylem as a ==continuous column== (2), and evaporates through stomata (3).',
    bullets: [
      '**Transpiration** lowers leaf Ψ and creates **tension** in the xylem.',
      '**Cohesion** between water molecules and **adhesion** to walls keep the column intact.',
      '**Root pressure** helps sometimes but ==does not explain tall trees==.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'An air bubble (embolism) forms in a vessel. What happens to flow in that vessel?',
    options: [
      'It stops, because the water column is broken',
      'It speeds up',
      'Root pressure always restores it immediately',
      'Nothing changes',
    ],
    answer: 0,
    explanation:
      'Cohesion–tension needs a continuous column; an embolism breaks it, so water must detour through pits into other conduits.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Stomatal control and storage',
    bullets: [
      '**Guard-cell turgor** opens the pore, coordinating CO₂ uptake and water loss.',
      'Light, CO₂, water status, and **abscisic acid (ABA)** adjust opening.',
      '==Dry air increases vapor loss==; closing pores cuts both water loss and CO₂ entry.',
      'Stored water buffers short-term demand, not unlimited supply.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Does each condition tend to open or close stomata?',
    bins: ['Tends to open', 'Tends to close'],
    items: [
      ['Bright light', 0],
      ['Abscisic acid from drought-stressed roots', 1],
      ['Low internal CO₂', 0],
      ['Severe water deficit', 1],
      ['Very dry, hot air (in many plants)', 1],
    ],
    explanation:
      'Light and low CO₂ favor opening for photosynthesis; ABA and water deficit close pores to save water.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Source–sink pressure flow',
    bullets: [
      '**Loading** sugar at a source draws in water and raises pressure.',
      '**Unloading** at a sink lowers pressure, so ==bulk flow runs source to sink==.',
      'A storage organ can ==switch roles==: a sink in summer, a source in spring.',
      'Phloem flow is not simply the reverse of xylem flow.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'In early spring, before leaves open, a potato tuber sprouts shoots. What is the tuber?',
    options: ['A source', 'A sink', 'Neither', 'Part of the xylem'],
    answer: 0,
    explanation:
      'The tuber mobilizes stored starch and exports sugar to growing shoots, so it is acting as a source.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Hormones and tropisms',
    image: 'bot-phototropism',
    caption:
      '**Phototropism**: auxin moves to the ==shaded side==, those cells elongate more, and the shoot curves toward light.',
    bullets: [
      '**Auxin**: cell expansion and directional growth.',
      '**Cytokinins**, **gibberellins**, **abscisic acid**, and **ethylene** have distinct, interacting roles.',
      'Effects depend on tissue and concentration; ==more hormone is not always more growth==.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each hormone to a typical effect.',
    pairs: [
      ['Auxin', 'Cell elongation and tropic curvature'],
      ['Gibberellin', 'Stem elongation and seed germination'],
      ['Abscisic acid', 'Stomatal closure and dormancy'],
      ['Ethylene', 'Fruit ripening'],
      ['Cytokinin', 'Cell division and shoot growth'],
    ],
    explanation:
      'These are typical roles; real responses depend on tissue, concentration, developmental stage, and other signals.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Testing growth responses',
    bullets: [
      'Define light direction, hormone dose, water status, and ==measurement interval==.',
      'Measure **curvature**, **elongation**, or **conductance**, not a vague “health” score.',
      'Include an untreated or ==vehicle control==.',
      'Repeated measurements on one plant are ==not independent replicates==.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt:
      'Which strengthen an experiment testing whether auxin causes stem bending? Select all that apply.',
    options: [
      'Applying the solvent alone to control plants',
      'Using several independent plants per treatment',
      'Measuring curvature angle at set times',
      'Changing light direction for treated plants only',
    ],
    answers: [0, 1, 2],
    explanation:
      'Vehicle controls, independent replicates, and defined measurements isolate the auxin effect; changing light only for one group confounds it.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Water potential',
        back: 'Potential governing water movement relative to pure water.',
      },
      { front: 'Transpiration', back: 'Water-vapor loss from plant surfaces.' },
      {
        front: 'Cohesion-tension',
        back: 'Evaporation pulls a cohesive water column up the xylem.',
      },
      { front: 'Tropism', back: 'Directional growth response to a stimulus.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Water moves toward ==lower (more negative) Ψ==; Ψ = Ψs + Ψp.',
      '**Transpiration** pulls a cohesive water column up the xylem.',
      'Phloem pressure flow runs ==source to sink==, and roles can switch.',
      'Hormone effects depend on context; test them with controls and replicates.',
    ],
  },
]);

const reproduction = defineDeck('bot-u5-l1', [
  {
    kind: 'title',
    title: 'Life cycles, flowers, seeds, and biotechnology',
    subtitle: 'Tracking ploidy from spore to seed, and judging breeding claims by evidence.',
    objectives: [
      'Track **ploidy** through meiosis and fertilization.',
      'Explain **flower-to-seed** development.',
      'Distinguish **breeding methods** from outcome claims.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: is a pollen grain a seed?',
    options: ['Yes', 'No', 'Sometimes', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Alternation of generations',
    image: 'bot-sporic',
    caption:
      'Land plants alternate a diploid **sporophyte** and a haploid **gametophyte**: ==meiosis makes spores==, and ==fertilization restores 2n==.',
    bullets: [
      'Spores grow into gametophytes by **mitosis**; gametophytes make gametes by mitosis.',
      'A **spore** grows on its own; **gametes** must fuse.',
      'Which generation dominates differs among bryophytes, ferns, and seed plants.',
    ],
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: track the ploidy',
    problem: 'Follow ploidy through sporophyte, spore, gametophyte, gamete, and zygote.',
    steps: [
      '**Meiosis** turns 2n sporophyte cells into ==n spores==.',
      '**Mitosis** keeps n in the gametophyte and its gametes.',
      '**Fertilization** combines n + n into a ==2n zygote==.',
    ],
    conclusion: 'Meiosis and fertilization change ploidy; ==mitosis preserves it==.',
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Is each structure haploid (n) or diploid (2n)?',
    bins: ['Haploid (n)', 'Diploid (2n)'],
    items: [
      ['Spore', 0],
      ['Zygote', 1],
      ['Gametophyte', 0],
      ['Sporophyte', 1],
      ['Egg', 0],
    ],
    explanation:
      'Spores, gametophytes, and gametes are haploid; the zygote and the sporophyte that grows from it are diploid.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Flowers and pollination',
    image: 'bot-flower',
    caption:
      '**Anthers** on the stamens make pollen; **ovules** sit inside the **ovary** of the pistil, below the **stigma** and style.',
    bullets: [
      '**Pollination** moves pollen to the stigma; ==fertilization comes later==.',
      'A pollen grain is a ==reduced male gametophyte==, not a seed.',
      'The **pollen tube** delivers two sperm to the ovule.',
    ],
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Pollen and pollinators',
    bullets: [
      'Pollen grains differ in shape and surface across species.',
      '**Wind** and **animals** move pollen, and floral traits often match the mechanism.',
      '==No single color or shape proves== which pollinator visits.',
    ],
    image: 'bot-pollen',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Double fertilization and seeds',
    image: 'bot-double-fert',
    caption:
      'In maize, one sperm fertilizes the **egg** (embryo, 2n) and the other joins two **polar nuclei** (==endosperm, 3n==).',
    bullets: [
      'The **ovule** becomes the seed; the **ovary** usually becomes the fruit.',
      'The **seed coat** is ==maternal tissue==, genetically different from the embryo.',
      'A seed is not one genetically uniform tissue.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each flower part to what it becomes after fertilization.',
    pairs: [
      ['Fertilized egg', 'Embryo'],
      ['Central cell plus sperm', 'Endosperm'],
      ['Ovule', 'Seed'],
      ['Ovary', 'Fruit'],
    ],
    explanation:
      'Double fertilization makes the embryo and endosperm; the ovule becomes the seed and the ovary the fruit.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Dormancy and germination',
    bullets: [
      'A **dormant** seed is alive but waits for cues; ==dormancy is not death==.',
      'Water, temperature, oxygen, light, and species signals affect **germination**.',
      'Define germination clearly, such as ==radicle emergence==, and an observation interval.',
      'Report germinated ==and the total tested==; control seed age and source.',
    ],
    image: 'bot-germination',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'Seeds fail to sprout in a dry drawer for a year, then sprout when planted. What was their state in the drawer?',
    options: ['Dormant but alive', 'Dead', 'Already germinated', 'Undergoing fertilization'],
    answer: 0,
    explanation:
      'Dormant seeds are alive with low metabolism and germinate once water and other cues return.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      '37 of 50 seeds show radicle emergence within 7 days. What is the germination percentage?',
    answer: 74,
    tolerance: 0,
    unit: '%',
    explanation: '37/50 = 0.74, or 74%, for the stated criterion and interval.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Breeding and biotechnology',
    columns: ['Method', 'How it works', 'Note'],
    rows: [
      [
        '**Selective breeding**',
        'Choose parents with desired traits and cross',
        'Reshuffles ==many alleles==',
      ],
      [
        '**Transgenic** engineering',
        'Insert a defined sequence, often from another species',
        'A distinct category from editing',
      ],
      [
        '**Genome editing**',
        'Change a targeted sequence in place',
        'Precise target, still needs validation',
      ],
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'A crop is edited for resistance to one insect. Which claim is supported by that fact alone?',
    options: [
      'It may resist that insect; other pests, yield, and ecology need separate evidence',
      'It will have higher yield everywhere',
      'It is resistant to all pests',
      'It is harmful because it was edited',
    ],
    answer: 0,
    explanation:
      'The method defines what changed, not every outcome; each claim about yield, pests, or ecology needs its own evidence.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Genetics and experimental claims',
    bullets: [
      '**Aa × Aa** with complete dominance: ==1 AA : 2 Aa : 1 aa== and 3 dominant : 1 recessive.',
      'Linkage, many genes, environment, or non-Mendelian inheritance change this.',
      'Ratios are ==probabilities, not exact counts== in small samples.',
      'Test breeding claims against a comparison across ==replicated conditions==.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'An Aa × Aa cross with complete dominance yields 200 seedlings. How many are expected to show the recessive phenotype?',
    answer: 50,
    tolerance: 0,
    unit: 'seedlings',
    explanation: 'One quarter are aa: 200 × 1/4 = 50, though a real count will vary by chance.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Sporophyte', back: 'Diploid generation that makes spores by meiosis.' },
      { front: 'Gametophyte', back: 'Haploid generation that makes gametes by mitosis.' },
      { front: 'Pollination', back: 'Transfer of pollen to a receptive surface.' },
      { front: 'Double fertilization', back: 'Angiosperm process forming embryo and endosperm.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '==Meiosis makes spores; fertilization restores 2n==; mitosis keeps ploidy.',
      'Pollination comes before fertilization; pollen is a male gametophyte.',
      'Double fertilization: **2n embryo** plus **3n endosperm**.',
      'Judge a breeding method by ==measured outcomes==, not its label.',
    ],
  },
]);

export const decks: Deck[] = [
  evidence,
  tissues,
  organs,
  water,
  reproduction,
  ...botanyDecksApplied,
];
