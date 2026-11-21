import { defineDeck, type Deck } from './presentation-types.ts';
import { rocksDecksRocks } from './presentations-rocks-and-minerals-2.ts';

// Rocks and Minerals (Division C) presentations, one per lesson, following presentations-anatomy.ts.
// Each deck follows its lesson section by section (`section` is the lesson section index);
// lessons 1–4 (minerals) are here and lessons 5–8 (rocks and strategy) in the -2 file.

const evidence = defineDeck('rock-u1-l1', [
  {
    kind: 'title',
    title: 'Minerals, rocks, and diagnostic evidence',
    subtitle: 'Tell minerals from rocks, and build an identification from independent tests.',
    objectives: [
      'Distinguish minerals from rocks.',
      'Choose independent diagnostic observations.',
      'Explain uncertainty in specimen identification.',
    ],
    image: 'rock-granite',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which single property do you trust most when identifying a mineral?',
    options: ['Color', 'Hardness', 'Streak', 'Shape'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Mineral versus rock',
    image: 'rock-quartz',
    caption:
      'A cluster of clear **quartz** crystals: one mineral species with an ordered internal structure.',
    bullets: [
      'A **mineral** is a naturally occurring inorganic solid with ==ordered structure== and characteristic composition.',
      'A **rock** is an aggregate of minerals, mineraloids or other material.',
      'Granite contains several minerals; quartz is one of them.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Glass is not a mineral',
    image: 'rock-obsidian',
    caption: 'Black **obsidian** with smooth, curved fracture surfaces: volcanic glass.',
    bullets: [
      'Glass ==lacks long-range crystalline order==, so it is a mineraloid.',
      'A visually uniform specimen need not be a single mineral.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Is each a mineral or a rock?',
    bins: ['Mineral', 'Rock'],
    items: [
      ['Quartz', 0],
      ['Granite', 1],
      ['Calcite', 0],
      ['Sandstone', 1],
      ['Halite', 0],
      ['Basalt', 1],
    ],
    explanation:
      'Minerals are single species with defined structure; rocks are aggregates of minerals or other material.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Color and streak',
    image: 'rock-streak',
    caption:
      'Streak tests: **pyrite** leaves a black streak on white porcelain; pink **rhodochrosite** leaves a white streak on a black plate.',
    bullets: [
      '**Color** varies with impurities, weathering and light, so it is a weak identifier alone.',
      '**Streak**, the color of the powder, is ==often more consistent==.',
      'A mineral harder than the plate scratches it instead of streaking.',
      '**Luster** describes reflected light, such as metallic or vitreous.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Brassy-yellow pyrite leaves a dark streak. What does this show?',
    options: [
      'Streak always matches the specimen’s color',
      'Streak can differ from color and is often more diagnostic',
      'The streak plate was dirty',
      'Pyrite is a glass',
    ],
    answer: 1,
    explanation:
      'Powdering removes surface and crystal-size effects; pyrite’s greenish-black streak is diagnostic.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Hardness testing',
    image: 'rock-mohs',
    caption:
      'A Mohs hardness kit: ten reference minerals from talc (1) to diamond (10), with scratch pencils.',
    bullets: [
      'Mohs hardness is an ==ordinal scratch scale==, not a linear strength measure.',
      'A harder material scratches a softer fresh surface.',
      'Wipe away powder to tell a real groove from a mark.',
      'Hardness 8 is **not** twice hardness 4.',
    ],
  },
  {
    kind: 'order',
    section: 2,
    prompt: 'Order these minerals from softest to hardest on the Mohs scale.',
    items: ['Talc', 'Gypsum', 'Calcite', 'Fluorite', 'Quartz', 'Diamond'],
    explanation: 'Talc 1, gypsum 2, calcite 3, fluorite 4, quartz 7, diamond 10.',
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: bracketing hardness',
    problem: 'An unknown scratches gypsum but is scratched by fluorite. What can you conclude?',
    steps: [
      'Gypsum is Mohs **2**; fluorite is Mohs **4**.',
      'The test brackets hardness between about **2 and 4**.',
      'Calcite at **3** is compatible, but more evidence is needed.',
    ],
    conclusion: 'A bracket is ==evidence, not a unique identification==.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Cleavage and fracture',
    image: 'rock-fluorite-cleavage',
    caption:
      'Green **fluorite** with stepped flat surfaces where it has broken along cleavage planes.',
    bullets: [
      '**Cleavage** follows planes favored by internal bonding; **fracture** is other breakage.',
      'Count ==sets of parallel planes==, not every flat face.',
      'Quartz shows **conchoidal fracture**; calcite has **rhombohedral cleavage**.',
      'Growth faces are not automatically cleavage planes.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'A specimen breaks with smooth, curved, shell-like surfaces and no flat planes. Which breakage is this?',
    options: ['Cubic cleavage', 'Conchoidal fracture', 'Basal cleavage', 'Rhombohedral cleavage'],
    answer: 1,
    explanation: 'Curved shell-like surfaces are conchoidal fracture, typical of quartz and glass.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Combining evidence',
    bullets: [
      '**Density, magnetism, habit, streak, cleavage** and reaction observations narrow the choices.',
      'Use features that answer ==different questions==; color and a photo of color are not independent.',
      'Density = mass ÷ true volume; porous specimens complicate it.',
      'Acid reactivity is supplied as an observation, not a test to perform.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which pairs give two independent pieces of evidence? Select all that apply.',
    options: [
      'Hardness and streak',
      'Color and a photograph of the color',
      'Cleavage angles and magnetism',
      'Density and luster',
    ],
    answers: [0, 2, 3],
    explanation:
      'A photo of color repeats the same observation; the other pairs test different properties.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'An identification claim',
    bullets: [
      'State a **candidate**, the **supporting observations**, and an **excluded alternative**.',
      'Hardness ~3, pale streak, rhombohedral cleavage and carbonate reactivity support ==calcite== more than color alone.',
      'Conclusions are limited by the quality of observations.',
    ],
  },
  {
    kind: 'fill',
    section: 5,
    prompt: 'Complete the claim.',
    text: 'The unknown is probably {0}: it has hardness about 3, rhombohedral {1}, and reacts as a {2}.',
    blanks: ['calcite', 'cleavage', 'carbonate'],
    distractors: ['quartz', 'fracture', 'sulfide'],
    explanation: 'Each observation is independent and together they point to calcite.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Mineral',
        back: 'Crystalline geological substance with characteristic composition.',
      },
      { front: 'Rock', back: 'Aggregate of geological material.' },
      { front: 'Cleavage', back: 'Preferential breakage along structural planes.' },
      { front: 'Streak', back: 'Color of mineral powder.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Minerals have **ordered structure**; rocks are aggregates; glass is a mineraloid.',
      '**Streak** beats color; luster depends on the surface.',
      'Mohs is ==ordinal==, not linear.',
      'Count cleavage **sets**; quartz fractures conchoidally.',
      'Claims name a candidate, evidence and an excluded alternative.',
    ],
  },
]);

const crystals = defineDeck('rock-u2-l1', [
  {
    kind: 'title',
    title: 'Formation environments, crystal systems, and habit',
    subtitle:
      'Where crystals grow, how their atoms repeat, and why the same mineral can look different.',
    objectives: [
      'Connect crystallization to environment.',
      'Distinguish lattice symmetry from external habit.',
      'Explain why growth history changes appearance.',
    ],
    image: 'rock-habit',
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Routes to crystals',
    bullets: [
      'Minerals crystallize from **magma**, precipitate from **solutions**, grow in **metamorphic reactions**, or form **biologically**.',
      'Temperature, pressure, composition and fluids decide which phases form.',
      'Slow growth allows large crystals, but ==space and supply also matter==.',
      'Use host rock and associated minerals to reconstruct formation.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each mineral occurrence to its likely formation route.',
    pairs: [
      ['Halite crust on a dry lake bed', 'Evaporation of salty water'],
      ['Olivine in basalt', 'Crystallization from magma'],
      ['Garnet in schist', 'Metamorphic reaction'],
      ['Calcite in a clam shell', 'Biological precipitation'],
    ],
    explanation:
      'Each route leaves associated minerals and textures that support the interpretation.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Ordered structure',
    image: 'rock-diamond-lattice',
    caption:
      'A ball-and-stick model of the **diamond** unit cell: each carbon bonds to four neighbors in a repeating cube.',
    bullets: [
      'A crystal repeats a structure; the **unit cell** is its building block.',
      'Same composition, different structure: **polymorphs**, like ==diamond and graphite==.',
      'Real crystals contain defects and impurities.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Diamond and graphite are both pure carbon. Why are their properties so different?',
    options: [
      'Graphite contains iron',
      'Their atoms are arranged in different crystal structures',
      'Diamond is a glass',
      'They form at the same conditions',
    ],
    answer: 1,
    explanation:
      'They are polymorphs: diamond’s 3D network is hard; graphite’s weakly bonded sheets are soft.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Seven crystal systems',
    bullets: [
      '**Cubic, tetragonal, orthorhombic, hexagonal, trigonal, monoclinic, triclinic**.',
      'Cubic: three ==equal axes at right angles==.',
      'Orthorhombic: three unequal axes at right angles.',
      'Broken or intergrown specimens may hide the external geometry.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each crystal system to its axes.',
    pairs: [
      ['Cubic', 'Three equal axes, all at 90°'],
      ['Tetragonal', 'Two equal axes and one different, all at 90°'],
      ['Orthorhombic', 'Three unequal axes, all at 90°'],
      ['Triclinic', 'Three unequal axes, none at 90°'],
    ],
    explanation: 'Systems group crystals by unit-cell geometry and symmetry.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Habit is appearance',
    image: 'rock-calcite',
    caption:
      'Four specimens of **calcite**: pointed crystals, blocky rhombs, knobby crusts and cave stalactites.',
    bullets: [
      '**Habit** is growth form: prismatic, acicular, tabular, fibrous, massive.',
      'One mineral can show ==many habits==; different minerals can share one.',
      'Massive specimens can still be crystalline inside.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: massive is not amorphous',
    problem: 'A massive specimen lacks visible faces. Does it lack crystalline order?',
    steps: [
      'Habit describes **external appearance**.',
      'Many small **intergrown crystals** can look massive.',
      'Other structural and physical observations are needed.',
    ],
    conclusion: 'Absent faces ==do not prove an amorphous material==.',
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each habit to its description.',
    pairs: [
      ['Acicular', 'Needle-like crystals'],
      ['Tabular', 'Flat, plate-like crystals'],
      ['Prismatic', 'Elongated crystals with parallel faces'],
      ['Massive', 'No visible crystal faces'],
    ],
    explanation: 'Habit names describe shape only; they do not identify the mineral.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Replacement: pseudomorphs',
    image: 'rock-pseudomorph',
    caption:
      'Brown **goethite** that has replaced pyrite while keeping its blocky cubic crystal shape.',
    bullets: [
      'Replacement can keep an earlier shape while changing composition: a ==pseudomorph==.',
      'Hydrothermal fluids carry dissolved components and precipitate minerals as conditions change.',
    ],
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Veins and timing',
    image: 'rock-veins',
    caption:
      'White mineral **veins** crossing a dark rock: fluids filled the cracks after the rock formed.',
    bullets: [
      '**Crosscutting** veins are younger than the rock they cut.',
      'Absolute ages ==need additional evidence==.',
    ],
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Evaporite growth',
    image: 'rock-evaporite',
    caption: 'Cubic **halite** crystals grown on a piece of wood as salty water evaporated.',
    bullets: ['Evaporation concentrates ions until **minerals precipitate**.'],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'A white quartz vein cuts across a granite. What is their relative age?',
    options: [
      'The vein is older than the granite',
      'The vein is younger than the granite',
      'They must be the same age',
      'Relative age cannot be judged',
    ],
    answer: 1,
    explanation:
      'A feature that cuts across another must have formed after it (crosscutting relationships).',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'Interpreting a specimen',
    steps: [
      { label: 'Identity', detail: 'What **mineral** is it?' },
      { label: 'Structure', detail: 'What **symmetry** does it have?' },
      { label: 'History', detail: 'How did ==this specimen== form?' },
      { label: 'Faces', detail: 'Growth surface, **cleavage** fragment, or inherited form?' },
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'A specimen shows perfect cubes. What does the cubic shape establish by itself?',
    options: [
      'The mineral must be halite',
      'It supports cubic symmetry, but several minerals (halite, pyrite, galena, fluorite) can form cubes',
      'The mineral formed by evaporation',
      'Nothing about symmetry',
    ],
    answer: 1,
    explanation:
      'Shape supports a symmetry interpretation; identity needs hardness, streak, cleavage and other evidence.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Unit cell', back: 'Repeating structural cell.' },
      { front: 'Polymorph', back: 'Same composition with different crystal structure.' },
      { front: 'Habit', back: 'External growth form.' },
      { front: 'Pseudomorph', back: 'New mineral retaining an earlier form.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Crystals grow from magma, solutions, metamorphism and organisms.',
      '**Polymorphs** share composition but not structure.',
      'Seven systems describe ==unit-cell symmetry==.',
      'Habit is appearance; massive can still be crystalline.',
      'Pseudomorphs and veins record **later changes**.',
    ],
  },
]);

const silicates = defineDeck('rock-u3-l1', [
  {
    kind: 'title',
    title: 'Silicate structures and mineral groups',
    subtitle: 'How silica tetrahedra link into islands, chains, sheets and frameworks.',
    objectives: [
      'Trace shared oxygen in tetrahedral structures.',
      'Compare silicate groups.',
      'Connect structure to cleavage and composition.',
    ],
    image: 'rock-mica',
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The tetrahedral building block',
    bullets: [
      'Silicon sits among **four oxygen** atoms: the ==SiO₄⁴⁻ tetrahedron==.',
      'Tetrahedra share corners to build **groups, chains, sheets or frameworks**.',
      'Shared oxygen changes the Si:O ratio and the charge balance.',
      'A structure diagram is a connectivity model, not a photograph.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Isolated tetrahedra: olivine',
    image: 'rock-olivine',
    caption: 'A glassy green crystal of gem **olivine** (peridot), a nesosilicate.',
    bullets: [
      '**Nesosilicates**: isolated tetrahedra joined through other cations.',
      '**Sorosilicates**: pairs sharing one oxygen (Si₂O₇).',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Rings: beryl',
    image: 'rock-beryl',
    caption: 'Hexagonal **beryl** crystals in orange, aqua and green, a ring silicate.',
    bullets: [
      '**Cyclosilicates** contain rings, often six-membered.',
      'Group names describe ==connectivity, not shape==.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each silicate group to its structure.',
    pairs: [
      ['Nesosilicate', 'Isolated tetrahedra'],
      ['Sorosilicate', 'Pairs of tetrahedra'],
      ['Cyclosilicate', 'Rings of tetrahedra'],
      ['Tectosilicate', 'Three-dimensional framework'],
    ],
    explanation: 'Silicate groups are classified by how many corners each tetrahedron shares.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Single chains: pyroxene',
    image: 'rock-pyroxene',
    caption: 'Dark green prismatic crystals of **diopside**, a pyroxene.',
    bullets: [
      'Single-chain **inosilicates** share two corners: SiO₃.',
      'Pyroxene cleavage is ==near 90°==.',
    ],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Double chains: amphibole',
    image: 'rock-amphibole',
    caption: 'A green prismatic crystal of **tremolite**, an amphibole.',
    bullets: ['Double chains give Si₄O₁₁ groups.', 'Amphibole cleavage is about ==56° and 124°==.'],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'A dark prismatic mineral shows two cleavages meeting at about 124° and 56°. Which group is favored?',
    options: ['Pyroxene', 'Amphibole', 'Mica', 'Quartz'],
    answer: 1,
    explanation: 'Amphiboles’ double chains give cleavages near 56°/124°; pyroxenes are near 90°.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Sheets: mica',
    image: 'rock-mica',
    caption: 'Stacked books of **mica** that split into thin, flexible sheets.',
    bullets: [
      '**Phyllosilicates** link tetrahedra into sheets: Si₂O₅.',
      'Weak bonds between layers give ==perfect basal cleavage==.',
      'Micas and clays are sheet silicates.',
    ],
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Frameworks: feldspar',
    image: 'rock-feldspar',
    caption: 'Four **feldspar** specimens with blocky crystals in cream, white and gray.',
    bullets: [
      '**Tectosilicates** share ==all four corners==; pure silica is SiO₂ (quartz).',
      'Feldspars substitute aluminum and add balancing cations.',
      'The same structural class does not mean identical properties.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Sort each mineral into its silicate structure.',
    bins: ['Chain', 'Sheet', 'Framework'],
    items: [
      ['Pyroxene', 0],
      ['Muscovite mica', 1],
      ['Quartz', 2],
      ['Amphibole', 0],
      ['Kaolinite clay', 1],
      ['Orthoclase feldspar', 2],
    ],
    explanation:
      'Chains: pyroxene and amphibole; sheets: micas and clays; frameworks: quartz and feldspars.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: why SiO₂?',
    problem: 'Why does a fully shared silica framework have SiO₂ rather than SiO₄?',
    steps: [
      'Each tetrahedron has **four oxygen corners**.',
      'Each corner is **shared by two** tetrahedra.',
      'Four halves = **two oxygen per silicon**.',
    ],
    conclusion: 'Sharing ==changes atom bookkeeping==.',
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'In a single-chain silicate, each tetrahedron shares 2 of its 4 oxygens. How many oxygens belong to each silicon?',
    answer: 3,
    tolerance: 0,
    explanation: '2 unshared + 2 × ½ shared = 3, giving SiO₃.',
  },
  {
    kind: 'fill',
    section: 0,
    prompt: 'Complete the description of the silicate building block.',
    text: 'In the silicate tetrahedron, one {0} atom sits among four {1} atoms, and tetrahedra link by sharing {2}.',
    blanks: ['silicon', 'oxygen', 'corners'],
    distractors: ['carbon', 'hydrogen', 'edges'],
    explanation: 'SiO₄ tetrahedra share oxygen corners to build larger structures.',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'A mineral peels into thin, flexible, elastic sheets. Which silicate structure does this suggest?',
    options: ['Framework', 'Sheet', 'Isolated tetrahedra', 'Single chain'],
    answer: 1,
    explanation: 'Elastic sheets with one perfect cleavage point to a phyllosilicate such as mica.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Tetrahedron', back: 'Silicon coordinated by four oxygen atoms.' },
      { front: 'Inosilicate', back: 'Chain silicate structure.' },
      { front: 'Phyllosilicate', back: 'Sheet silicate structure.' },
      { front: 'Tectosilicate', back: 'Framework silicate structure.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'The **SiO₄** tetrahedron is the building block.',
      'Islands → pairs → rings → chains → sheets → frameworks share ==more corners==.',
      'Pyroxene ~90°, amphibole ~56°/124° cleavage.',
      'Sheets give **basal cleavage**; frameworks give SiO₂.',
      'Count shared oxygen as **half** to each tetrahedron.',
    ],
  },
]);

const nonSilicates = defineDeck('rock-u4-l1', [
  {
    kind: 'title',
    title: 'Non-silicates and economic geology',
    subtitle: 'Carbonates, oxides, sulfides, halides and native elements, and what makes an ore.',
    objectives: [
      'Recognize major non-silicate groups.',
      'Use chemical and physical evidence together.',
      'Separate mineral resources from economic reserves.',
    ],
    image: 'rock-pyrite',
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Grouping by chemistry',
    bullets: [
      'Groups use characteristic **anions**: carbonates, oxides, sulfides, halides, sulfates, phosphates, native elements.',
      'Calcite: carbonate. Hematite: oxide. Pyrite: sulfide. Halite: halide.',
      '==Metallic luster does not mean native metal==; many sulfides look metallic.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Sort each mineral into its chemical group.',
    bins: ['Carbonate', 'Oxide', 'Sulfide', 'Halide'],
    items: [
      ['Calcite', 0],
      ['Hematite', 1],
      ['Pyrite', 2],
      ['Halite', 3],
      ['Magnetite', 1],
      ['Galena', 2],
      ['Fluorite', 3],
      ['Dolomite', 0],
    ],
    explanation: 'Carbonates contain CO₃, oxides O, sulfides S, and halides F or Cl.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Carbonates',
    bullets: [
      'Carbonates contain ==CO₃²⁻==; calcite and dolomite are rock-forming examples.',
      'Supplied reaction observations help separate them.',
      'Rhombohedral cleavage is **not** cubic symmetry.',
      'Carbonates link biology, sediments, groundwater and **karst**.',
    ],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Oxides: hematite',
    image: 'rock-hematite',
    caption: 'Shiny black, steel-gray crystals of **hematite**; its powder is reddish-brown.',
    bullets: ['Hematite’s ==reddish-brown streak== is more diagnostic than its dark color.'],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Oxides: magnetite',
    image: 'rock-magnetite',
    caption: 'Black octahedral crystals of **magnetite**, strongly attracted to a magnet.',
    bullets: ['Magnetite is ==strongly magnetic== with a black streak.'],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Sulfides: galena',
    image: 'rock-galena',
    caption: 'Silvery cubic crystals of **galena** (lead sulfide) with brassy pyrite.',
    bullets: [
      'Sulfides combine sulfur with metals: **pyrite** and **galena**.',
      'Galena is ==very dense== with cubic cleavage.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: which iron oxide?',
    problem:
      'A dark specimen has reddish-brown streak and weak magnetism. Which iron mineral is favored?',
    steps: [
      'Compare **hematite** and **magnetite** rather than color.',
      'Hematite gives **reddish-brown streak**; magnetite is **strongly magnetic**.',
      'Favor hematite while checking other properties.',
    ],
    conclusion: 'Use ==diagnostic combinations==.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'A black metallic mineral strongly attracts a magnet and leaves a black streak. Which is it most likely?',
    options: ['Hematite', 'Magnetite', 'Galena', 'Graphite'],
    answer: 1,
    explanation: 'Strong magnetism plus black streak points to magnetite.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Halides: halite and fluorite',
    image: 'rock-halite',
    caption: 'Clear, blocky **halite** crystals from the Wieliczka salt mine, Poland.',
    bullets: [
      'Halite has **cubic cleavage** and low hardness (~2.5).',
      'Fluorite has **octahedral cleavage** and hardness 4.',
      '==Never identify minerals by taste==.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Fluorite crystal',
    image: 'rock-fluorite',
    caption: 'A green **fluorite** crystal on a bed of pale mica.',
    bullets: ['Fluorite’s color varies widely; its **hardness and cleavage** are steadier.'],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Native elements: copper',
    image: 'rock-copper',
    caption: 'A branching mass of native **copper** with a coppery metallic luster.',
    bullets: ['Native elements include **metals** like copper and gold.'],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Native elements: sulfur',
    image: 'rock-sulfur',
    caption: 'Bright yellow crystals of native **sulfur**.',
    bullets: ['**Nonmetals** such as sulfur and carbon also occur native.'],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Same element, different minerals: diamond',
    image: 'rock-diamond',
    caption: 'A rough, pale **diamond** crystal: carbon in a 3D network, hardness 10.',
    bullets: ['Composition alone ==cannot establish hardness==.'],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Same element, different minerals: graphite',
    image: 'rock-graphite',
    caption: 'Dark gray, metallic **graphite**: carbon in weakly bonded sheets, hardness 1–2.',
    bullets: ['Graphite feels greasy and marks paper.'],
  },
  {
    kind: 'multi',
    section: 3,
    prompt:
      'A shiny brass-yellow specimen might be gold. Which observations would rule gold out? Select all that apply.',
    options: [
      'A greenish-black streak',
      'Hardness about 6, harder than a steel knife',
      'Low density compared with gold',
      'A yellow color',
    ],
    answers: [0, 1, 2],
    explanation:
      'Gold is soft, very dense and has a gold streak; pyrite is hard, lighter and streaks greenish-black.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Banded iron formation',
    image: 'rock-banded-iron',
    caption:
      'A slab of **banded iron formation**, layered rock that is a major source of iron ore.',
    bullets: [
      'An **ore** can be mined ==economically== under stated conditions.',
      'A **resource** is the geological endowment; a **reserve** is the economically recoverable part.',
      'Price, technology, grade, access and environment change the status.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each mineral property to a use.',
    pairs: [
      ['Extreme hardness of diamond', 'Abrasives and cutting tools'],
      ['Conductivity of copper', 'Electrical wiring'],
      ['Softness and slipperiness of graphite', 'Pencils and lubricants'],
      ['Iron content of hematite', 'Steel production'],
    ],
    explanation: 'Uses follow from properties; whether a deposit is an ore depends on economics.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Environmental interpretation',
    image: 'rock-rio-tinto',
    caption:
      'The orange, acidic Río Tinto in Spain, colored by iron from weathered sulfide ores and centuries of mining.',
    bullets: [
      'Sulfides exposed to **oxygen and water** can produce ==acidic drainage==.',
      'Risk depends on mineralogy, **neutralizing capacity** and hydrology.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Which ion defines the carbonate mineral group?',
    options: ['SiO₄⁴⁻', 'CO₃²⁻', 'SO₄²⁻', 'Cl⁻'],
    answer: 1,
    explanation: 'Carbonates such as calcite and dolomite contain the CO₃²⁻ group.',
  },
  {
    kind: 'multi',
    section: 5,
    prompt:
      'Which factors affect whether mine waste produces acid drainage? Select all that apply.',
    options: [
      'How much sulfide the waste contains',
      'Exposure to oxygen and water',
      'Carbonate minerals that neutralize acid',
      'The color of the specimens',
    ],
    answers: [0, 1, 2],
    explanation:
      'Sulfide content, exposure and neutralizing capacity control acid drainage; color does not.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Carbonate', back: 'Mineral class containing CO₃²⁻.' },
      { front: 'Sulfide', back: 'Mineral class with sulfur bonded to other elements.' },
      { front: 'Ore', back: 'Material economically extractable for a valuable component.' },
      { front: 'Reserve', back: 'Economically recoverable portion under specified conditions.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Non-silicates group by **anion**: CO₃, O, S, halogens, native elements.',
      'Hematite: **red-brown streak**; magnetite: **magnetic**.',
      'Diamond and graphite show ==structure controls properties==.',
      'Ore and reserve are **economic** terms.',
      'Sulfide weathering can create acid drainage.',
    ],
  },
]);

export const decks: Deck[] = [evidence, crystals, silicates, nonSilicates, ...rocksDecksRocks];
