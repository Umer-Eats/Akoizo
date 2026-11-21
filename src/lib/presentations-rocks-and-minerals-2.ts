import { defineDeck, type Deck } from './presentation-types.ts';

// Rocks and Minerals decks for lessons 5–8 (igneous, sedimentary, metamorphic, identification
// strategy), imported by presentations-rocks-and-minerals.ts.

const igneous = defineDeck('rock-u5-l1', [
  {
    kind: 'title',
    title: 'Igneous processes, textures, and Bowen’s series',
    subtitle: 'Read cooling history from texture, and composition from minerals.',
    objectives: [
      'Relate texture to cooling history.',
      'Separate composition from grain size.',
      'Explain fractional crystallization.',
    ],
    image: 'rock-porphyritic',
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Magma and lava',
    image: 'rock-granite',
    caption:
      'Polished **granite**: interlocking white feldspar, gray quartz and black mica, all large enough to see.',
    bullets: [
      '**Magma** is below the surface; **lava** has erupted.',
      '**Intrusive** rocks often cool slowly into ==visible interlocking crystals==.',
      '**Extrusive** rocks often have finer textures; glass forms when cooling is very fast.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'A rock has coarse, interlocking crystals you can see without a lens. What is the most likely cooling history?',
    options: [
      'Instant quenching in water',
      'Slow cooling at depth',
      'Explosive eruption into the air',
      'Cementation of sand grains',
    ],
    answer: 1,
    explanation:
      'Slow cooling below the surface gives crystals time to grow large (phaneritic texture).',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Porphyritic texture',
    image: 'rock-porphyritic',
    caption:
      'Large rectangular **feldspar** crystals (phenocrysts) in a finer-grained granite groundmass; scale bar 2 cm.',
    bullets: [
      '**Phaneritic**: crystals visible. **Aphanitic**: very fine.',
      '**Porphyritic**: big crystals in a finer groundmass, often ==two stages of cooling==.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Vesicular texture',
    image: 'rock-pumice',
    caption: 'Pale, frothy **pumice** full of gas-bubble holes, beside a centimeter scale.',
    bullets: [
      '**Vesicles** are gas-bubble cavities.',
      'Vesicles alone ==do not fix magma composition==.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each igneous texture to its description.',
    pairs: [
      ['Phaneritic', 'Crystals visible without magnification'],
      ['Aphanitic', 'Crystals too fine to see'],
      ['Porphyritic', 'Large crystals in a finer groundmass'],
      ['Vesicular', 'Full of gas-bubble holes'],
      ['Glassy', 'No crystals, smooth conchoidal fracture'],
    ],
    explanation: 'Describe texture first, then infer the cooling process.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Felsic: rhyolite',
    image: 'rock-rhyolite',
    caption:
      'A polished slab of **porphyritic rhyolite**: pink feldspar crystals in a fine reddish groundmass.',
    bullets: [
      '**Felsic** rocks are silica-rich with quartz and feldspars.',
      'Granite and rhyolite share composition but ==differ in grain size==.',
    ],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Mafic: gabbro and basalt',
    image: 'rock-gabbro',
    caption: 'Coarse, dark **gabbro**: black pyroxene and gray plagioclase crystals.',
    bullets: [
      '**Mafic** rocks are rich in iron and magnesium minerals.',
      'Gabbro is coarse (intrusive); basalt is fine (extrusive).',
    ],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Basalt',
    image: 'rock-basalt',
    caption: 'Dark, fine-grained **basalt**, the most common volcanic rock.',
    bullets: ['Dark color is a clue; ==weathering can mislead==.'],
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Texture and composition are separate axes',
    columns: ['Composition', 'Coarse (intrusive)', 'Fine (extrusive)'],
    rows: [
      ['**Felsic**', 'Granite', 'Rhyolite'],
      ['**Intermediate**', 'Diorite', 'Andesite'],
      ['**Mafic**', 'Gabbro', 'Basalt'],
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Is each rock intrusive or extrusive?',
    bins: ['Intrusive', 'Extrusive'],
    items: [
      ['Granite', 0],
      ['Rhyolite', 1],
      ['Gabbro', 0],
      ['Basalt', 1],
      ['Diorite', 0],
      ['Pumice', 1],
    ],
    explanation:
      'Coarse rocks cooled at depth; fine, glassy or vesicular rocks cooled at the surface.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Bowen’s reaction series',
    bullets: [
      '**Discontinuous branch**: olivine → pyroxene → amphibole → biotite.',
      '**Continuous branch**: plagioclase changes from Ca-rich to Na-rich.',
      'Low temperature: K-feldspar, muscovite, ==quartz last==.',
      'Not every magma crystallizes every mineral.',
    ],
  },
  {
    kind: 'order',
    section: 3,
    prompt:
      'Order the discontinuous branch of Bowen’s series from highest to lowest crystallization temperature.',
    items: ['Olivine', 'Pyroxene', 'Amphibole', 'Biotite'],
    explanation:
      'Mafic minerals crystallize first at high temperature; biotite comes last on this branch.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Differentiation',
    bullets: [
      'Crystals in contact can react with remaining melt.',
      'Removing crystals is **fractional crystallization**: the ==leftover melt changes composition==.',
      '**Assimilation** and **magma mixing** also modify magma.',
      'A single olivine grain does not identify the whole rock.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Early olivine and pyroxene crystals sink out of a basaltic magma. How does the remaining melt change?',
    options: [
      'It becomes richer in iron and magnesium',
      'It becomes relatively richer in silica',
      'It becomes pure olivine',
      'It does not change',
    ],
    answer: 1,
    explanation:
      'Removing Fe–Mg minerals leaves the melt relatively enriched in silica and alkalis.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: granite or rhyolite?',
    problem: 'Granite and rhyolite have similar broad composition but different textures. Explain.',
    steps: [
      'Both can be **felsic**.',
      'Granite has **coarse crystals** from intrusive growth.',
      'Rhyolite has a **fine extrusive** texture.',
    ],
    conclusion: 'Composition ==does not determine cooling texture==.',
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'A fine-grained dark rock contains a few large green olivine crystals. What is the best description?',
    options: [
      'Coarse-grained granite',
      'Porphyritic, probably mafic volcanic rock such as basalt',
      'A sedimentary conglomerate',
      'Marble',
    ],
    answer: 1,
    explanation:
      'Large crystals in a fine dark groundmass are porphyritic; olivine and dark color suggest mafic basalt.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Intrusive', back: 'Crystallized below the surface.' },
      { front: 'Porphyritic', back: 'Large crystals within a finer groundmass.' },
      { front: 'Fractional crystallization', back: 'Removal of crystals changes remaining melt.' },
      { front: 'Vesicle', back: 'Cavity formed by a gas bubble.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Slow cooling → **coarse**; fast → **fine**; quench → **glass**.',
      'Porphyritic rocks record ==two cooling stages==.',
      'Felsic vs mafic is composition; coarse vs fine is texture.',
      'Bowen’s series: **olivine first, quartz last**.',
      'Fractional crystallization changes the remaining melt.',
    ],
  },
]);

const sedimentary = defineDeck('rock-u6-l1', [
  {
    kind: 'title',
    title: 'Sedimentary processes, grains, and fossils',
    subtitle: 'From weathering to rock, and what grains, structures and fossils record.',
    objectives: [
      'Trace weathering through lithification.',
      'Use grain size and sorting cautiously.',
      'Distinguish clastic, chemical, and biochemical origins.',
    ],
    image: 'rock-cross-bedding',
  },
  {
    kind: 'flow',
    section: 0,
    title: 'From source to sediment',
    steps: [
      { label: 'Weathering', detail: '**Physical** breakup and **chemical** change.' },
      { label: 'Erosion', detail: 'Material is removed.' },
      { label: 'Transport', detail: 'By **water, wind, ice or gravity**.' },
      { label: 'Deposition', detail: 'Accumulates ==when conditions permit==.' },
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Order the steps that turn a mountain’s granite into sandstone.',
    items: ['Weathering', 'Erosion', 'Transport', 'Deposition', 'Compaction and cementation'],
    explanation: 'Material breaks down, is removed and moved, settles, and is then lithified.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Grain populations',
    bullets: [
      'Describe **size, sorting, roundness and composition** separately.',
      '**Sorting** is the spread of sizes; **roundness** is edge smoothness.',
      'Rounded grains record abrasion, ==not a unique transport distance==.',
      'Clay can stay suspended yet resist erosion when cohesive.',
    ],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Conglomerate',
    image: 'rock-conglomerate',
    caption:
      'A quartz-pebble **conglomerate**: rounded white and tan pebbles in a reddish iron-stained matrix.',
    bullets: ['**Conglomerate** has ==rounded gravel-size clasts==.'],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Breccia',
    image: 'rock-breccia',
    caption: 'A **breccia** of angular dark basalt fragments bound by pale cement.',
    bullets: ['**Breccia** has ==angular clasts==, often little transported.'],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Sandstone',
    image: 'rock-sandstone',
    caption: 'A polished disk of banded **sandstone** in tan and orange layers.',
    bullets: [
      '**Sandstone** is dominated by sand-size grains; **shale** is fissile mudrock.',
      'Quartz grains do not make the whole rock the mineral quartz.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: naming a clastic rock',
    problem: 'A rock contains rounded gravel clasts in cement. Classify and constrain the claim.',
    steps: [
      'Recognize **transported clasts** and **cement**.',
      'Rounded gravel supports **conglomerate**.',
      'Transport agent and environment need more evidence.',
    ],
    conclusion: 'Texture supports ==a name more strongly than a setting==.',
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each clastic rock to its grains.',
    pairs: [
      ['Conglomerate', 'Rounded gravel'],
      ['Breccia', 'Angular gravel'],
      ['Sandstone', 'Sand-size grains'],
      ['Shale', 'Clay and silt that split in thin layers'],
    ],
    explanation: 'Clastic names rest on grain size and shape.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Biochemical: coal',
    image: 'rock-coal',
    caption: 'A lump of black, layered **bituminous coal**.',
    bullets: [
      '**Chemical** sediments precipitate from solution; **biochemical** ones involve organisms.',
      '**Coal** comes from buried plant material.',
      '**Evaporites** record ==concentration by evaporation==.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Is each sedimentary rock clastic, chemical, or biochemical?',
    bins: ['Clastic', 'Chemical', 'Biochemical'],
    items: [
      ['Sandstone', 0],
      ['Rock salt', 1],
      ['Coal', 2],
      ['Breccia', 0],
      ['Rock gypsum', 1],
      ['Fossil-shell limestone', 2],
    ],
    explanation:
      'Clastic rocks are fragments, chemical rocks precipitate, and biochemical rocks come from organisms.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Cross-bedding',
    image: 'rock-cross-bedding',
    caption:
      'Sweeping **cross-beds** in Navajo Sandstone, Zion, Utah: the slip faces of ancient sand dunes.',
    bullets: [
      '**Compaction** squeezes out pores; **cementation** binds grains.',
      'Cross-beds record ==migrating dunes or ripples==.',
    ],
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Ripple marks',
    image: 'rock-ripples',
    caption:
      'Ripple marks preserved on a red sandstone bed in Capitol Reef, Utah, with a pen for scale.',
    bullets: ['**Ripples** record moving water or wind over sand.'],
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Mud cracks',
    image: 'rock-mudcracks',
    caption: 'Polygonal **mud cracks** in dried mud on a tidal shore.',
    bullets: ['**Mud cracks** record ==wetting then drying==.'],
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Fossils',
    image: 'rock-fossils',
    caption: 'Four **fossils**: a crinoid, a mammal skull, a crab and ammonite-like shells.',
    bullets: [
      'Fossils record organisms, traces and environments.',
      '**Preservation is selective**: rapid burial and hard parts help.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each structure to what it records.',
    pairs: [
      ['Mud cracks', 'Drying of wet mud'],
      ['Cross-bedding', 'Migrating dunes or ripples'],
      ['Graded bedding', 'Settling from a waning current'],
      ['Ripple marks', 'Moving water or wind over sand'],
    ],
    explanation:
      'Structures constrain processes, but one photo does not give a whole basin history.',
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'A rock is well-sorted, rounded quartz sand. What can you say about its setting?',
    options: [
      'It must be a desert dune',
      'It suggests long reworking, but several settings can produce it',
      'It must be a glacial deposit',
      'Nothing at all',
    ],
    answer: 1,
    explanation:
      'Beaches, dunes and rivers can all rework sand; structures and facies narrow the choice.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'A sediment has grains all about the same size. How is it described?',
    options: ['Poorly sorted', 'Well sorted', 'Angular', 'Lithified'],
    answer: 1,
    explanation: 'Sorting describes the spread of grain sizes; a narrow spread is well sorted.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Sorting', back: 'Distribution of grain sizes.' },
      { front: 'Roundness', back: 'Smoothness of grain edges.' },
      { front: 'Lithification', back: 'Conversion of sediment into rock.' },
      { front: 'Cementation', back: 'Mineral precipitation binding grains.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Weathering, erosion, transport and deposition are **separate** steps.',
      'Rounded → **conglomerate**; angular → **breccia**.',
      'Clastic, chemical and biochemical rocks ==form differently==.',
      'Cross-beds, ripples and mud cracks record processes.',
      'Fossil preservation is **selective**.',
    ],
  },
]);

const metamorphic = defineDeck('rock-u7-l1', [
  {
    kind: 'title',
    title: 'Metamorphism, stress, and mineral assemblages',
    subtitle: 'How rocks change in the solid state, and what fabric and minerals reveal.',
    objectives: [
      'Explain solid-state change.',
      'Distinguish metamorphic settings.',
      'Interpret foliation and grade with context.',
    ],
    image: 'rock-gneiss',
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Solid-state transformation',
    bullets: [
      'Metamorphism changes minerals and texture through **heat, pressure, stress and fluids**.',
      'It happens ==without complete melting==.',
      'The original rock is the **protolith**.',
      'Bulk composition limits the possible products.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each metamorphic rock to a typical protolith.',
    pairs: [
      ['Slate', 'Shale'],
      ['Marble', 'Limestone'],
      ['Quartzite', 'Quartz sandstone'],
      ['Gneiss', 'Granite or shale at high grade'],
    ],
    explanation: 'The protolith’s composition controls which minerals can grow.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Metamorphic settings',
    bullets: [
      '**Contact**: heating near an intrusion forms an ==aureole==.',
      '**Regional**: broad areas during burial and mountain building.',
      '**Dynamic**: deformation in fault zones.',
      '**Hydrothermal**: reactive fluids alter rock.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: contact metamorphism',
    problem:
      'A carbonate-rich rock near an intrusion recrystallizes without melting. Propose an interpretation.',
    steps: [
      'The protolith is **carbonate-rich**.',
      'Intrusion-related heating supports **contact metamorphism**.',
      'Recrystallized carbonate can form **marble**; check composition and fabric.',
    ],
    conclusion: 'Setting and composition ==jointly constrain the product==.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'A narrow zone of altered rock surrounds a granite body, fading with distance. Which setting fits best?',
    options: ['Regional metamorphism', 'Contact metamorphism', 'Weathering', 'Sedimentation'],
    answer: 1,
    explanation: 'Heat from the intrusion forms a contact aureole that fades outward.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Slate',
    image: 'rock-slate',
    caption: 'Dark gray **slate** in an outcrop, splitting along smooth slaty cleavage.',
    bullets: [
      '**Foliation** is a planar fabric from aligned minerals or banding.',
      'Slate cleavage is a ==rock fabric, not mineral cleavage==.',
    ],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Phyllite',
    image: 'rock-phyllite',
    caption: 'Gray **phyllite** with a silky sheen and fine crinkles from tiny aligned micas.',
    bullets: ['Phyllite’s micas are slightly larger than slate’s, giving ==a satiny luster==.'],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Schist',
    image: 'rock-schist',
    caption: 'Glittery **schist** with visible platy mica flakes; scale bar 3 cm.',
    bullets: ['Schist has **visible** mica in a wavy foliation.'],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Gneiss',
    image: 'rock-gneiss',
    caption: 'Banded **gneiss** with alternating light and dark mineral layers.',
    bullets: ['Gneiss shows ==compositional banding== at high grade.'],
  },
  {
    kind: 'order',
    section: 2,
    prompt: 'Order these foliated rocks from a shale protolith by increasing metamorphic grade.',
    items: ['Slate', 'Phyllite', 'Schist', 'Gneiss'],
    explanation:
      'Grain size and banding increase with grade, though not every protolith passes through every stage.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Marble',
    image: 'rock-marble',
    caption: 'White **marble** of recrystallized calcite.',
    bullets: [
      'Marble forms from **carbonate** rocks.',
      '==Nonfoliated does not mean unmetamorphosed==.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Quartzite',
    image: 'rock-quartzite',
    caption: 'Pale green-gray **quartzite** beside a centimeter ruler.',
    bullets: [
      'Quartzite forms from **quartz sandstone**.',
      'It breaks ==through grains, not around them==, unlike sandstone.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Is each metamorphic rock foliated or nonfoliated?',
    bins: ['Foliated', 'Nonfoliated'],
    items: [
      ['Slate', 0],
      ['Marble', 1],
      ['Schist', 0],
      ['Quartzite', 1],
      ['Gneiss', 0],
      ['Hornfels', 1],
    ],
    explanation:
      'Platy minerals under directed stress make foliation; equant grains like calcite and quartz usually do not.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Index minerals: kyanite',
    image: 'rock-kyanite',
    caption: 'Blue blade-shaped crystals of **kyanite** in white quartz.',
    bullets: [
      '**Grade** describes intensity of conditions.',
      '**Index minerals** constrain conditions ==for suitable compositions==.',
    ],
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Index minerals: garnet',
    image: 'rock-garnet',
    caption: 'A deep red-brown **garnet** crystal with sharp faces on a pale matrix.',
    bullets: ['Assemblages are stronger evidence than ==one shiny grain==.'],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'A schist contains garnet. What is the most careful interpretation?',
    options: [
      'It formed at exactly 500 °C',
      'Its composition and the assemblage suggest at least moderate grade',
      'It is igneous',
      'Garnet proves contact metamorphism',
    ],
    answer: 1,
    explanation:
      'Index minerals constrain grade only together with composition, pressure and the full assemblage.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Reconstructing history',
    bullets: [
      'Describe **protolith evidence, new minerals, fabric** and crosscutting features.',
      'Compare competing histories for the same banding.',
      'The rock cycle allows ==igneous → metamorphic and sedimentary → metamorphic== routes.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'A rock shows light and dark bands. Which evidence would best show it is gneiss rather than a layered sedimentary rock?',
    options: [
      'Its overall color',
      'Interlocking recrystallized minerals and aligned micas within the bands',
      'Its weight',
      'Its location near a road',
    ],
    answer: 1,
    explanation:
      'Recrystallized, interlocking grains and metamorphic fabric distinguish gneiss from sedimentary layering.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Protolith', back: 'Original rock before metamorphism.' },
      { front: 'Foliation', back: 'Planar fabric in a rock.' },
      { front: 'Aureole', back: 'Zone of alteration around an intrusion.' },
      {
        front: 'Index mineral',
        back: 'Mineral useful for constraining conditions in an appropriate composition.',
      },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Metamorphism is ==solid-state== change of a protolith.',
      'Contact, regional, dynamic and hydrothermal settings differ.',
      'Slate → phyllite → schist → gneiss shows increasing **grade**.',
      'Marble and quartzite are **nonfoliated**.',
      'Index minerals need composition and assemblage context.',
    ],
  },
]);

const strategy = defineDeck('rock-u8-l1', [
  {
    kind: 'title',
    title: 'Identification strategy, references, and timed practice',
    subtitle: 'Build a reference, choose discriminating tests, and learn from your errors.',
    objectives: [
      'Build a diagnostic reference.',
      'Use evidence under time pressure.',
      'Learn from identification errors.',
    ],
    image: 'rock-cycle',
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Organizing a reference',
    image: 'rock-gypsum',
    caption: 'A clear, layered **gypsum** crystal: soft (hardness 2), with one perfect cleavage.',
    bullets: [
      'Record **composition, group, hardness, streak, cleavage, luster, density, habit** and confusions.',
      'Include ==multiple appearances==, not one ideal image.',
      'Label which features are **diagnostic** and which vary.',
    ],
  },
  {
    kind: 'multi',
    section: 0,
    prompt: 'Which entries make a mineral reference page more useful? Select all that apply.',
    options: [
      'Hardness and streak',
      'Common look-alike minerals',
      'Only one perfect museum photo',
      'Which features vary between specimens',
    ],
    answers: [0, 1, 3],
    explanation:
      'A single ideal photo hides natural variation; diagnostic properties and confusions help most.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Decision paths',
    bullets: [
      'Start broad, then pick a test that ==separates remaining candidates==.',
      'Dark metallic: try **magnetism** or **streak**.',
      'Pale nonmetallic: try **hardness** and **cleavage**.',
      'Keep uncertain branches open; record evidence before checking the key.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'You must separate calcite from quartz, both colorless. Which single test is most discriminating?',
    options: ['Color', 'Hardness (glass scratch)', 'Luster', 'Transparency'],
    answer: 1,
    explanation:
      'Quartz (7) scratches glass; calcite (3) does not. Color, luster and transparency are similar.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Rock descriptions',
    bullets: [
      'Describe **grains, layering, foliation, vesicles or clastic texture** before naming.',
      'Tell mineral grains from rock fragments and cement.',
      'Weathering can create ==misleading surface patterns==.',
      'A qualified classification beats an unsupported precise name.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Which rock family does each observation point to?',
    bins: ['Igneous', 'Sedimentary', 'Metamorphic'],
    items: [
      ['Interlocking crystals with no layering', 0],
      ['Rounded grains held by cement', 1],
      ['Aligned micas giving a wavy sheen', 2],
      ['Gas-bubble holes', 0],
      ['Fossil shells', 1],
      ['Light and dark mineral bands', 2],
    ],
    explanation: 'Texture points to the formation family; confirm with mineralogy.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Timed work',
    bullets: [
      'Split a station into **observation, discrimination and response**.',
      'One teammate records evidence while another checks references.',
      'Use a short list and ==one discriminating property==.',
      'Don’t spend the interval browsing photographs.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: 60 seconds',
    problem: 'You have 60 seconds and two candidate minerals. Plan an evidence-first response.',
    steps: [
      'Record **luster and cleavage** quickly.',
      'Choose a **test that differs** between candidates.',
      'State the best candidate, its evidence, and the **remaining uncertainty**.',
    ],
    conclusion: 'Choose information that ==changes the decision==.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'An error log',
    bullets: [
      'Classify errors: **knowledge, observation, discrimination, reference navigation, time**.',
      'Replace each wrong rule with a ==testable distinction==.',
      'Pyrite mistaken for gold? Compare **hardness and streak**.',
      'Log correct answers reached for the wrong reason.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each mistake to its error type.',
    pairs: [
      ['Did not know fluorite’s cleavage', 'Missing knowledge'],
      ['Mistook a scratch for a powder streak', 'Incorrect observation'],
      ['Could not find the page in the binder', 'Reference-navigation failure'],
      ['Ran out of time at the station', 'Time management'],
    ],
    explanation: 'Naming the error type points to the right fix.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Transfer beyond memorization',
    image: 'rock-cycle',
    caption:
      'The **rock cycle**: igneous, sedimentary and metamorphic rocks linked by melting, weathering, lithification and heat and pressure.',
    bullets: [
      'Practice on **unfamiliar** photos, descriptions and property tables.',
      'Explain why the best candidate beats the ==nearest alternative==.',
      'The rock cycle allows many routes, not one circle.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'According to the rock cycle, which change can turn an igneous rock directly into a metamorphic rock?',
    options: [
      'Weathering and erosion',
      'Heat and pressure',
      'Compaction and cementation',
      'Cooling and crystallization',
    ],
    answer: 1,
    explanation:
      'Heat and pressure (deformation) transform any existing rock into a metamorphic rock.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A specimen has mass 26.5 g and displaces 10.0 mL of water. What is its density, in g/cm³?',
    answer: 2.65,
    tolerance: 0.01,
    unit: 'g/cm³',
    explanation: '26.5 g ÷ 10.0 cm³ = 2.65 g/cm³, consistent with quartz.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Diagnostic feature', back: 'Observation that separates plausible alternatives.' },
      { front: 'Differential identification', back: 'Comparison of competing candidates.' },
      { front: 'Error log', back: 'Record of reasoning failures and corrections.' },
      { front: 'Qualified claim', back: 'Conclusion with stated confidence and limitations.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'References record **diagnostic** and **variable** features.',
      'Pick the test that ==separates the remaining candidates==.',
      'Describe texture before naming a rock.',
      'Split timed stations into observe, discriminate, respond.',
      'An **error log** turns mistakes into testable rules.',
    ],
  },
]);

export const rocksDecksRocks: Deck[] = [igneous, sedimentary, metamorphic, strategy];
