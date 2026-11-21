import { defineDeck, type Deck } from './presentation-types.ts';

// Astronomy decks for lessons 5–8 (stellar remnants, galaxies and the ISM, graph and image
// interpretation, quantitative synthesis), imported by presentations-astronomy.ts.

const remnants = defineDeck('astro-u5-l1', [
  {
    kind: 'title',
    title: 'Supernovae, white dwarfs, neutron stars, and black holes',
    subtitle: 'How stars end, what supports their remnants, and what an event horizon is.',
    objectives: [
      'Separate thermonuclear and core-collapse supernovae.',
      'Explain compact-remnant support qualitatively.',
      'Distinguish an event horizon from a material surface.',
    ],
    image: 'astro-crab',
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Core collapse',
    image: 'astro-crab',
    caption:
      'Hubble’s Crab Nebula: the expanding debris of a core-collapse supernova seen in 1054, with a pulsar at its center.',
    bullets: [
      'An evolved massive star’s core ==collapses when pressure fails==.',
      'Gravity, nuclear physics, **neutrinos** and hydrodynamics all matter.',
      'The remnant is a **neutron star** or **black hole**.',
      'It is not hydrogen burning explosively.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'White dwarfs and degeneracy',
    image: 'astro-sirius-b',
    caption:
      'The faint dot marked by the arrow is **Sirius B**, a white dwarf beside the much brighter Sirius A.',
    bullets: [
      'Supported by ==electron degeneracy pressure==, not fusion.',
      'Adding mass makes a white dwarf **smaller**, not bigger.',
      'Limit near **1.4 M☉** (the Chandrasekhar mass) in the ideal model.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'What mainly holds up a white dwarf against gravity?',
    options: [
      'Ongoing hydrogen fusion',
      'Electron degeneracy pressure',
      'Rotation',
      'Radiation from its companion',
    ],
    answer: 1,
    explanation:
      'Quantum degeneracy of tightly packed electrons resists compression without fusion.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Type Ia supernovae',
    image: 'astro-sn1994d',
    caption:
      'Supernova 1994D, the bright point at lower left, outshining much of its host galaxy NGC 4526.',
    bullets: [
      '**Type Ia**: thermonuclear disruption of a ==white dwarf in a binary==.',
      'Pathways include **accretion** and **mergers**.',
      'Light curves can be **standardized** for distances.',
    ],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'A Type Ia remnant',
    image: 'astro-tycho',
    caption:
      'Tycho’s supernova remnant, a Type Ia event seen in 1572: Chandra X-rays and Spitzer infrared show the expanding shell.',
    bullets: ['No neutron star remains: the white dwarf ==is destroyed==.'],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Kepler’s supernova remnant',
    image: 'astro-kepler-snr',
    caption:
      'The remnant of Kepler’s supernova of 1604, combined from X-ray, infrared and visible data.',
    bullets: ['Multiwavelength images show **hot gas, dust and shocks**.'],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Does each feature describe a Type Ia or a core-collapse supernova?',
    bins: ['Type Ia', 'Core collapse'],
    items: [
      ['White dwarf in a binary system', 0],
      ['Massive star with an iron core', 1],
      ['Leaves a neutron star or black hole', 1],
      ['No compact remnant left behind', 0],
      ['Used as a standardizable candle', 0],
      ['Huge burst of neutrinos', 1],
    ],
    explanation:
      'Type Ia are thermonuclear white-dwarf explosions; core collapse ends massive stars.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Neutron stars and pulsars',
    image: 'astro-pulsar',
    caption:
      'Pulsar PSR B1509-58 and its surrounding nebula: Chandra X-rays in gold, WISE infrared in red, green and blue.',
    bullets: [
      'A **neutron star** is extremely dense, supported by nuclear matter.',
      'A **pulsar** is seen through ==periodic emission from rotation==.',
      'Not every neutron star is seen as a pulsar from Earth.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'A pulsar’s pulses arrive every 0.033 s. What does this period most directly measure?',
    options: [
      'How fast the star expands and contracts',
      'Its rotation period, with the beam sweeping past Earth once per turn',
      'Its distance',
      'Its temperature',
    ],
    answer: 1,
    explanation: 'The lighthouse model ties the period to rotation, not pulsation.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Black holes',
    image: 'astro-black-hole-parts',
    caption:
      'The simplest black hole: an **event horizon** at the Schwarzschild radius R = 2GM/c², around a central singularity.',
    bullets: [
      'The event horizon is a ==causal boundary, not a surface==.',
      'Rs ≈ **3 km per solar mass**.',
    ],
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Imaging a black hole’s shadow',
    image: 'astro-m87-eht',
    caption:
      'The Event Horizon Telescope image of M87*: a bright ring of hot gas around a dark central shadow.',
    bullets: [
      'Light from ==accreting gas near the horizon== can escape.',
      'Evidence combines **dynamics, compactness and accretion**.',
    ],
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Its home galaxy',
    image: 'astro-m87-spitzer',
    caption:
      'Spitzer’s infrared view of the giant elliptical galaxy M87; the inset shows the jet launched near its black hole.',
    bullets: ['Accretion can power **jets** thousands of light-years long.'],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: Schwarzschild radius',
    problem: 'Use 3 km per solar mass to estimate Rs for a 10 M☉ nonrotating black hole.',
    steps: [
      'Apply **Rs ≈ 3 × (M/M☉) km**.',
      'For 10 M☉, Rs ≈ **30 km**.',
      'This is a **horizon scale**, not a glowing surface.',
    ],
    conclusion: 'The horizon radius is ==about 30 km== in this approximation.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'Using Rs ≈ 3 km per solar mass, what is the Schwarzschild radius of a 4 million M☉ black hole, in millions of km?',
    answer: 12,
    tolerance: 0,
    unit: 'million km',
    explanation: '3 km × 4 × 10⁶ = 1.2 × 10⁷ km = 12 million km.',
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each observation to what it best constrains.',
    pairs: [
      ['Hydrogen-poor spectrum', 'Composition of the outer envelope'],
      ['Precise pulse timing', 'Neutron-star rotation and orbit'],
      ['Stars orbiting fast around a dark point', 'Compact mass'],
      ['Light-curve shape and peak', 'Supernova type and distance'],
    ],
    explanation:
      'Combine spectra, light curves, environment and dynamics before naming a mechanism.',
  },
  {
    kind: 'fill',
    section: 1,
    prompt: 'Complete the summary of stellar remnants.',
    text: 'A white dwarf is held up by electron {0} pressure; a {1} is a rotating neutron star seen through periodic pulses; nothing escapes from inside the event {2}.',
    blanks: ['degeneracy', 'pulsar', 'horizon'],
    distractors: ['radiation', 'quasar', 'shell'],
    explanation:
      'Degeneracy supports white dwarfs, pulsars are rotating neutron stars, and the horizon bounds a black hole.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Degeneracy pressure',
        back: 'Quantum support associated with densely packed fermions.',
      },
      { front: 'Type Ia', back: 'Thermonuclear white-dwarf supernova class.' },
      { front: 'Pulsar', back: 'Rotating neutron-star source observed with periodic emission.' },
      { front: 'Event horizon', back: 'Causal boundary limiting escape to distant observers.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Core collapse ends massive stars; Type Ia ==destroys a white dwarf==.',
      'White dwarfs: **electron degeneracy**, limit ≈ 1.4 M☉.',
      'Pulsars are **rotating** neutron stars.',
      'Rs ≈ **3 km per M☉**; the horizon is not a surface.',
      'Combine several observations before naming a mechanism.',
    ],
  },
]);

const galaxies = defineDeck('astro-u6-l1', [
  {
    kind: 'title',
    title: 'Galaxies, stellar populations, and the interstellar medium',
    subtitle: 'Galaxy shapes, the stars and gas inside them, and how dust changes what we see.',
    objectives: [
      'Compare galaxy morphologies without treating them as a simple age sequence.',
      'Distinguish stellar populations and ISM phases.',
      'Interpret nebular emission and dust effects.',
    ],
    image: 'astro-whirlpool-bands',
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Galaxy morphology',
    image: 'astro-hubble-fork',
    caption:
      'Hubble’s tuning fork: ellipticals E0–E7, lenticular S0, then normal spirals Sa–Sc and barred spirals SBa–SBc.',
    bullets: [
      'Categories describe **appearance**, ==not an evolutionary path==.',
      'Viewing angle and wavelength change apparent shape.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'A barred spiral',
    image: 'astro-ngc1300',
    caption:
      'NGC 1300: a central bar with spiral arms trailing from its ends, laced with dark dust lanes.',
    bullets: ['**Bars** and interactions add structure to disks.'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'An edge-on disk',
    image: 'astro-sombrero',
    caption:
      'The Sombrero Galaxy seen nearly edge-on: a bright bulge cut by a dark dust lane in the disk.',
    bullets: ['Seen edge-on, a disk ==hides its spiral arms==.'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'An irregular galaxy',
    image: 'astro-irregular',
    caption:
      'NGC 1427A, an irregular galaxy with scattered blue star-forming knots and no regular shape.',
    bullets: ['**Irregulars** lack a simple regular morphology.'],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each Hubble class to its appearance.',
    pairs: [
      ['E0', 'Round, smooth elliptical'],
      ['E7', 'Highly elongated elliptical'],
      ['Sc', 'Small bulge, loosely wound arms'],
      ['SBb', 'Bar with moderately wound arms'],
      ['Irr', 'No regular shape'],
    ],
    explanation: 'Classes describe what we see, including projection effects.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Disk, bulge, and halo',
    image: 'astro-milky-way',
    caption:
      'An annotated illustration of the Milky Way from above: the central bar and the Perseus, Sagittarius, Norma and Scutum-Centaurus arms, with the Sun in the Orion Spur.',
    bullets: [
      'Galaxies hold populations with different **ages, abundances and motions**.',
      'Young stars trace **disks**; older stars dominate **bulges and halos**.',
      '**Metallicity** means ==elements heavier than helium==.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Halo globular clusters',
    image: 'astro-m2',
    caption:
      'The globular cluster M2: a dense ball of hundreds of thousands of old stars in the Milky Way’s halo.',
    bullets: ['Globular clusters are **old** and often **metal-poor**.'],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Omega Centauri in infrared',
    image: 'astro-omega-cen',
    caption: 'WISE infrared view of Omega Centauri, the Milky Way’s largest globular cluster.',
    bullets: ['Population labels are ==summaries, not exact ages==.'],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Is each feature typical of the disk or of the halo?',
    bins: ['Disk', 'Halo'],
    items: [
      ['Young blue stars', 0],
      ['Globular clusters', 1],
      ['Active star formation', 0],
      ['Old, metal-poor stars', 1],
      ['Gas and dust lanes', 0],
      ['Stars on tilted, elongated orbits', 1],
    ],
    explanation: 'Disks hold gas and young stars; halos hold old stars and globular clusters.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Gas and molecular clouds',
    image: 'astro-ldn483',
    caption: 'LDN 483: a dark cloud of gas and dust blocking the light of the stars behind it.',
    bullets: [
      'The **ISM** holds gas and dust over a huge range of densities and temperatures.',
      '**Cold molecular clouds** host star formation.',
      'A dark patch is ==obscuring matter, not empty space==.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'A reflection nebula',
    image: 'astro-reflection',
    caption: 'The Witch Head Nebula: blue dust scattering light from the bright star Rigel.',
    bullets: [
      '**Emission** nebulae glow from ionized gas.',
      '**Reflection** nebulae ==scatter starlight==, often blue.',
      '**Dark** nebulae block background light.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'A dark nebula',
    image: 'astro-horsehead',
    caption:
      'The Horsehead Nebula in visible light: a dark dusty cloud silhouetted against glowing gas.',
    bullets: ['Mechanisms can ==coexist in one region==.'],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each nebula type to how it produces (or blocks) light.',
    pairs: [
      ['Emission nebula', 'Ionized gas emits line radiation'],
      ['Reflection nebula', 'Dust scatters light from nearby stars'],
      ['Dark nebula', 'Dust blocks light from behind'],
      ['Planetary nebula', 'Gas ejected by a dying star is ionized by its hot core'],
    ],
    explanation: 'Identify the light source and wavelength before naming the mechanism.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Dust extinction',
    image: 'astro-horsehead-ir',
    caption:
      'The Horsehead in **near-infrared**: the same cloud becomes partly transparent, revealing its wispy structure and stars behind it.',
    bullets: [
      'Dust **absorbs and scatters** light; blue is dimmed more: ==reddening==.',
      'Reddening can make a hot star look cooler.',
      'Absorbed energy is **re-emitted in the infrared**.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'A hot star seen through a dust cloud looks redder than expected. Why?',
    options: [
      'Its surface cooled',
      'Dust removes blue light more than red light',
      'It is moving toward us',
      'Dust emits red visible light',
    ],
    answer: 1,
    explanation:
      'Extinction is stronger at shorter wavelengths, reddening the light that gets through.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: dark but not empty',
    problem:
      'A region is dark in visible light but bright in infrared and contains embedded young sources. Explain without calling it empty.',
    steps: [
      'Visible darkness can come from **dust obscuring** light.',
      'Absorbed energy is **reradiated in the infrared**.',
      'Combine with molecular and stellar data before estimating mass.',
    ],
    conclusion: 'The evidence fits ==a dusty region, not an absence of material==.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Reading a multiwavelength region',
    image: 'astro-andromeda-bands',
    caption:
      'Andromeda in **far-infrared** from Herschel and Planck: rings of cold dust that are hard to see in visible light.',
    bullets: [
      'Compare images with ==matched scales and orientation==.',
      'Different bands trace **complementary components**.',
    ],
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Four bands at once',
    image: 'astro-whirlpool-bands',
    caption:
      'The Whirlpool Galaxy combined from **X-ray, ultraviolet, visible and infrared** data.',
    bullets: ['A galaxy’s spectrum combines many stars, gas and dust, ==not one photosphere==.'],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Which observation best reveals cold molecular gas inside a dark cloud?',
    options: [
      'Visible-light photographs',
      'Radio emission lines from molecules such as CO',
      'X-ray images',
      'Ultraviolet images',
    ],
    answer: 1,
    explanation:
      'Cold molecular gas emits radio lines; visible and UV light are blocked by the dust.',
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'An infrared image of a galaxy shows bright rings where the visible image shows dark lanes. What is the best explanation?',
    options: [
      'The two images show different galaxies',
      'Dust that blocks visible light glows in the infrared',
      'The infrared image is wrong',
      'Stars only exist in the rings',
    ],
    answer: 1,
    explanation:
      'The same dust absorbs visible light and reradiates it in the infrared; the images are complementary.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'ISM', back: 'Interstellar gas and dust.' },
      { front: 'Metallicity', back: 'Abundance of elements heavier than helium.' },
      { front: 'Extinction', back: 'Attenuation of light along a path.' },
      { front: 'Reflection nebula', back: 'Dusty region visible through scattered source light.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Hubble types describe **appearance**, not age.',
      'Disks: young stars and gas; halos: ==old stars and globulars==.',
      'Emission, reflection and dark nebulae differ in mechanism.',
      'Dust **dims and reddens**, then glows in infrared.',
      'Multiwavelength images trace complementary components.',
    ],
  },
]);

const graphs = defineDeck('astro-u7-l1', [
  {
    kind: 'title',
    title: 'Advanced graph and image interpretation',
    subtitle: 'Read log axes, tracks and isochrones, and the limits built into every sample.',
    objectives: [
      'Read logarithmic stellar diagrams.',
      'Distinguish evolutionary tracks and population distributions.',
      'Recognize observation and selection limits.',
    ],
    image: 'astro-southern-ring',
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Axes before patterns',
    image: 'astro-hr',
    caption:
      'This H–R diagram has luminosity (left) and absolute magnitude (right) on log scales, and temperature decreasing to the right along the top.',
    bullets: [
      'Read every **label, unit, direction and scale**.',
      'Absolute magnitude ==increases toward fainter== objects.',
      'Equal log intervals mean **equal ratios**, not equal differences.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'On a log luminosity axis, the gap from 1 to 10 L☉ looks the same as from 10 to 100 L☉. What do these equal gaps represent?',
    options: [
      'Equal additions of 10 L☉',
      'Equal multiplicative factors of 10',
      'Equal temperatures',
      'Equal distances',
    ],
    answer: 1,
    explanation: 'Log axes space ratios equally: each gap is a factor of 10.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Radius on the H–R diagram',
    bullets: [
      'At fixed luminosity, ==R ∝ T⁻²==.',
      'A cooler star at the same luminosity is **larger**.',
      'At fixed temperature, more luminous means **larger area**.',
      'Plot symbol size is not stellar size.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: radius ratio',
    problem:
      'Two stars have equal effective temperature but luminosities of 1 and 100 L☉. Compare radii.',
    steps: [
      'At fixed T, **L ∝ R²**.',
      'R₂/R₁ = √(100/1) = **10**.',
      'Equal apparent brightness would not support this without distances.',
    ],
    conclusion: 'The brighter star has ==ten times the radius==.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'Two stars have equal luminosity. Star A is twice as hot as star B. What is R_B / R_A?',
    answer: 4,
    tolerance: 0,
    explanation: 'At fixed L, R ∝ T⁻², so R_B/R_A = (T_A/T_B)² = 2² = 4.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Tracks, isochrones, and populations',
    image: 'astro-m67',
    caption:
      'Open cluster M67: stars of one age and many masses, the kind of population an isochrone models.',
    bullets: [
      'An **evolutionary track** follows one modeled star.',
      'An **isochrone** connects ==same-age stars of different masses==.',
      'Observed clusters include binaries, extinction and incompleteness.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each diagram feature to its meaning.',
    pairs: [
      ['Evolutionary track', 'One star’s modeled changes over time'],
      ['Isochrone', 'Modeled stars of equal age and different masses'],
      ['Turnoff', 'Where a population leaves the main sequence'],
      ['Binary sequence', 'Unresolved pairs plotted above the main sequence'],
    ],
    explanation: 'Tracks follow stars; isochrones and turnoffs describe populations.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Selection effects',
    bullets: [
      'A **flux-limited** survey overrepresents ==intrinsically luminous== distant sources.',
      'A **volume-limited** sample shows a different mix.',
      'Missing faint stars may reflect **sensitivity**, not absence.',
      'Unresolved binaries look brighter than single stars.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'A bright-star catalog contains many giants and few red dwarfs. What is the best explanation?',
    options: [
      'Giants are the most common stars',
      'A flux-limited sample favors luminous stars seen from far away',
      'Red dwarfs do not exist nearby',
      'Giants are closer to Earth',
    ],
    answer: 1,
    explanation:
      'Red dwarfs are the most common stars but too faint to enter a bright-star sample beyond short distances.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Reading images by wavelength',
    image: 'astro-southern-ring',
    caption:
      'The Southern Ring Nebula from Webb: **near-infrared** (left) and **mid-infrared** (right) show different gas, dust and the central stars.',
    bullets: [
      'Colors map **filters** to display channels.',
      '“Blue means hot” is ==not a universal rule==.',
      'Cite the stated tracer and note ambiguity.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt:
      'Which statements about processed astronomical images are correct? Select all that apply.',
    options: [
      'Colors may represent invisible wavelengths',
      'Blue always means hotter gas',
      'X-ray brightness can trace hot gas or compact sources',
      'Captions and filter names are needed to interpret colors',
    ],
    answers: [0, 2, 3],
    explanation:
      'Color assignments are choices; interpret them through stated filters and tracers.',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'Writing a graph-based argument',
    steps: [
      { label: 'Quote', detail: 'Cite the **coordinates or intervals**.' },
      { label: 'Describe', detail: 'State the relationship.' },
      { label: 'Explain', detail: 'Apply a ==physical model==.' },
      { label: 'Limit', detail: 'Name a **limitation** or missing input.' },
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'You only know two stars’ apparent brightness, not their distances. Can you compare their radii from an H–R argument?',
    options: [
      'Yes, apparent brightness equals luminosity',
      'No, you need distances to turn flux into luminosity first',
      'Yes, if they have the same color',
      'No, radius can never be inferred',
    ],
    answer: 1,
    explanation:
      'Radius follows from luminosity and temperature; apparent flux needs a distance to give luminosity.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Logarithmic axis', back: 'Axis whose equal intervals represent equal ratios.' },
      { front: 'Isochrone', back: 'Modeled locus of equal-age stars with differing masses.' },
      { front: 'Flux-limited sample', back: 'Sample restricted by received brightness threshold.' },
      { front: 'Selection effect', back: 'Pattern introduced by how observations enter a sample.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Read axes first; log intervals are **ratios**.',
      'At fixed L, ==R ∝ T⁻²==; at fixed T, L ∝ R².',
      'Tracks follow one star; **isochrones** describe a population.',
      'Flux-limited samples favor **luminous** sources.',
      'Image colors are filter choices.',
    ],
  },
]);

const equations = defineDeck('astro-u8-l1', [
  {
    kind: 'title',
    title: 'Astrophysics equations and quantitative synthesis',
    subtitle:
      'Flux, magnitudes, distance modulus, radiation laws and motion, checked step by step.',
    objectives: [
      'Choose between intrinsic and apparent quantities.',
      'Solve magnitude and distance relations.',
      'Check a multistep calculation with units and scaling.',
    ],
    image: 'astro-helix',
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Inverse-square flux',
    image: 'astro-inverse-square',
    caption: 'The same light covers 1, 4 and 9 squares at distances r, 2r and 3r: **flux ∝ 1/d²**.',
    bullets: [
      '==F = L/(4πd²)== for isotropic, unattenuated emission.',
      'Rearranged: **L = 4πd²F**, so distance errors grow in L.',
      'Extinction reduces the received flux further.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'A source’s distance is halved with no change in luminosity. By what factor does its flux change?',
    answer: 4,
    tolerance: 0,
    explanation: 'F ∝ 1/d², so halving d multiplies F by 2² = 4.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Magnitude differences',
    bullets: [
      '==m₂ − m₁ = −2.5 log₁₀(F₂/F₁)==.',
      '**Smaller** magnitude means **brighter**.',
      '5 magnitudes = a factor of **100** in flux.',
      'Never add magnitudes; convert to fluxes first.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'Star 2 is 100 times brighter than star 1. What is m₂ − m₁?',
    answer: -5,
    tolerance: 0,
    explanation: '−2.5 log₁₀(100) = −2.5 × 2 = −5: brighter means a smaller magnitude.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Distance modulus',
    bullets: [
      '==m − M = 5 log₁₀(d / 10 pc)== without extinction.',
      '**m** is observed; **M** is the magnitude at 10 pc.',
      'd = 10 × 10^((m−M)/5) pc.',
      'With extinction A: m − M = 5 log₁₀(d/10) + A.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: distance modulus',
    problem:
      'A source has m = 10 and M = 5 with negligible extinction. Find its distance and compare its flux with the same source at 10 pc.',
    steps: [
      'Distance modulus is **5**.',
      'd = 10 × 10^(5/5) = **100 pc**.',
      'At ten times the distance, flux is **1/100** of its 10 pc value.',
    ],
    conclusion: 'The distance is ==100 pc==, consistent with five magnitudes of dimming.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'A star has m = 12 and M = 2, with no extinction. What is its distance in parsecs?',
    answer: 1000,
    tolerance: 0,
    unit: 'pc',
    explanation: 'm − M = 10, so d = 10 × 10^(10/5) = 10 × 100 = 1000 pc.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Radiation-law ratios',
    bullets: [
      '**L/L☉ = (R/R☉)² (T/T☉)⁴** avoids repeated constants.',
      'Wien peak ∝ ==1/T==.',
      'Both assume idealized thermal emission.',
      'Don’t mix one component’s temperature with an unresolved binary’s total luminosity.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt: 'A star is half as hot as the Sun but has the same luminosity. What is R/R☉?',
    answer: 4,
    tolerance: 0,
    explanation: 'L ∝ R²T⁴: 1 = R² × (½)⁴ = R²/16, so R = 4 R☉.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Motion and gravity',
    image: 'astro-kepler-laws',
    caption:
      'Kepler’s laws: planets follow ellipses with the Sun at one focus (F₁) and sweep equal areas (A₁, A₂) in equal times; a is the semimajor axis.',
    bullets: [
      'Doppler: ==Δλ/λ ≈ v/c== for small speeds; redshift means recession.',
      'Kepler’s third law links **period, separation and total mass**.',
      'Projected separation is not automatically the semimajor axis.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A line with rest wavelength 500.0 nm is observed at 500.5 nm. What is the radial velocity in km/s? (c = 300,000 km/s)',
    answer: 300,
    tolerance: 1,
    unit: 'km/s',
    explanation: 'Δλ/λ = 0.5/500 = 0.001; v = 0.001 × 300,000 = 300 km/s away from us.',
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Order the steps of a multistep solution.',
    items: [
      'List given values with units and the requested output',
      'Choose a relation for each step',
      'Calculate, keeping guard digits',
      'Check signs and scaling',
      'Round and state the assumptions',
    ],
    explanation: 'Clear inputs, explicit relations and checks make the answer defensible.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Apparent magnitude', back: 'Logarithmic received brightness in a defined band.' },
      { front: 'Absolute magnitude', back: 'Magnitude at a standardized 10 pc distance.' },
      { front: 'Distance modulus', back: 'Difference between apparent and absolute magnitude.' },
      {
        front: 'Radial velocity',
        back: 'Line-of-sight motion inferred from suitable Doppler evidence.',
      },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      '**F = L/(4πd²)**; distance errors grow in L.',
      '5 magnitudes = ==100× flux==; smaller m is brighter.',
      '**m − M = 5 log₁₀(d/10 pc)** (+ A with extinction).',
      'Use solar-unit ratios for L, R and T.',
      'Doppler and Kepler need stated assumptions.',
    ],
  },
]);

export const astronomyDecksRemnants: Deck[] = [remnants, galaxies, graphs, equations];
