import { defineDeck, type Deck } from './presentation-types.ts';
import { astronomyDecksRemnants } from './presentations-astronomy-2.ts';

// Astronomy (Division C) presentations, one per lesson, following presentations-anatomy.ts.
// Each deck follows its lesson section by section (`section` is the lesson section index);
// lessons 1–4 are here and lessons 5–8 in presentations-astronomy-2.ts.

const strategy = defineDeck('astro-u1-l1', [
  {
    kind: 'title',
    title: 'Event reasoning, references, and study strategy',
    subtitle: 'Answer what is asked: observable first, then physics, then the conclusion.',
    objectives: [
      'Separate recognition from physical interpretation.',
      'Organize a reference around observables and equations.',
      'Check units and assumptions before calculations.',
    ],
    image: 'astro-cosmic-cliffs',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which part of an astronomy test do you find hardest?',
    options: ['Recognizing objects', 'Explaining the physics', 'Calculations', 'Reading graphs'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'A scientific response',
    image: 'astro-cosmic-cliffs',
    caption:
      'Webb’s near-infrared view of the “Cosmic Cliffs” in the Carina Nebula: the colors are **assigned to infrared filters**, not seen by eye.',
    bullets: [
      'Questions may ask for **recognition, mechanism, diagram reading or calculation**.',
      'A colorful image ==does not give a temperature== without wavelength and calibration.',
      'State the **observable**, connect it to a **process**, then conclude.',
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Order the parts of a strong astronomy answer.',
    items: [
      'Identify what the question asks for',
      'State the observable',
      'Connect it to a physical process',
      'Give the requested conclusion',
    ],
    explanation: 'Observable → process → conclusion works even for unfamiliar objects.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Organizing references',
    bullets: [
      'Organize by **concepts and observables**: spectra, stellar parameters, evolution, distances, galaxies.',
      'Keep ==units and assumptions beside each equation==.',
      'On object pages, separate **measurements, interpretations, wavelength and uncertainty**.',
      'Check the current rules for object lists and allowed resources.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each quantity to its dimensions.',
    pairs: [
      ['Luminosity', 'Power (W)'],
      ['Flux', 'Power per area (W/m²)'],
      ['Light-year', 'Length'],
      ['Temperature in radiation laws', 'Absolute temperature (K)'],
    ],
    explanation: 'Writing dimensions first catches inverted or misused equations.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Dimensional reasoning',
    image: 'astro-inverse-square',
    caption:
      'Light from a source **S** spreads over areas that grow as r², 4r², 9r² at distances r, 2r, 3r, so flux falls as **1/d²**.',
    bullets: [
      'A **light-year is a distance**, not a time.',
      'Luminosity is power; flux is ==power per area==.',
      'If flux grows as a source moves away, recheck the inverse square.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: doubling distance',
    problem:
      'A star’s luminosity is fixed. Its distance doubles. Predict its observed flux and name an independent check.',
    steps: [
      'Use **F = L/(4πd²)**.',
      'Replacing d by 2d multiplies the denominator by **4**.',
      'The new flux is **F/4**; substitute it back to recover the same luminosity.',
    ],
    conclusion: 'Distance changes ==apparent flux, not intrinsic luminosity==.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'A star is moved to 3 times its original distance with no change in luminosity. Its new flux is what fraction of the original? Give a decimal.',
    answer: 0.111,
    tolerance: 0.002,
    explanation: 'Flux ∝ 1/d², so the factor is 1/3² = 1/9 ≈ 0.111.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Independent checks',
    bullets: [
      'Use **limiting cases**: doubling distance → ¼ flux; doubling radius at fixed T → 4× luminosity.',
      'Estimate the **order of magnitude** first.',
      'Ten decimal places from rough inputs are ==less defensible than a two-digit estimate==.',
      'Reverse the calculation where possible.',
    ],
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Working as a team',
    bullets: [
      'Split **recognition, data extraction and calculation**, with shared notation.',
      'A handoff includes the **observable, equation, values and open assumption**.',
      'When answers disagree, ==compare the starting quantities==.',
      'Common trap: apparent vs absolute magnitude, or flux vs luminosity.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Two teammates get different luminosities for the same star. What should they compare first?',
    options: [
      'Only their final numbers',
      'The input quantities, such as whether each used flux or luminosity and apparent or absolute magnitude',
      'Their calculator brands',
      'Whose answer is larger',
    ],
    answer: 1,
    explanation:
      'Most disagreements come from using a different starting quantity, not arithmetic.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Practice that builds transfer',
    bullets: [
      'Interleave **diagram, conceptual and numerical** questions.',
      'Keep an **error log**: missing knowledge, wrong observable, units, algebra, unsupported inference.',
      'Redo problems ==after correcting the rule==.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Which error type does each mistake show?',
    bins: ['Unit conversion', 'Wrong observable', 'Algebra'],
    items: [
      ['Used milliarcseconds as arcseconds', 0],
      ['Used apparent magnitude where absolute was needed', 1],
      ['Squared the distance instead of dividing by it squared', 2],
      ['Mixed kilometers and meters', 0],
      ['Treated flux as luminosity', 1],
      ['Dropped a negative sign in the log', 2],
    ],
    explanation: 'Classifying errors shows which habit to fix.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'What belongs next to each equation in a well-built reference?',
    options: [
      'A photo of the object',
      'Its units and the assumptions under which it applies',
      'The page number of the textbook only',
      'Nothing; equations speak for themselves',
    ],
    answer: 1,
    explanation: 'Units and assumptions beside an equation prevent applying it outside its regime.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Luminosity', back: 'Total emitted power.' },
      { front: 'Flux', back: 'Received power per unit area.' },
      { front: 'Light-year', back: 'Distance light travels in one year.' },
      {
        front: 'Dimensional analysis',
        back: 'Checking consistency of units and physical dimensions.',
      },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Answer in order: **observable → process → conclusion**.',
      'Keep units and assumptions ==next to each equation==.',
      'Flux follows **1/d²**; luminosity does not change with distance.',
      'Check limits and orders of magnitude.',
      'Log errors by type and redo problems.',
    ],
  },
]);

const spectrum = defineDeck('astro-u2-l1', [
  {
    kind: 'title',
    title: 'Observational astronomy and the electromagnetic spectrum',
    subtitle:
      'What each wavelength reveals, how thermal spectra work, and how parallax gives distance.',
    objectives: [
      'Relate wavelength to physical emission processes.',
      'Distinguish angular size and physical size.',
      'Use parallax with correct angular units.',
    ],
    image: 'astro-crab-bands',
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Scales and distances',
    bullets: [
      'The **astronomical unit** suits the Solar System; **parsecs** and **light-years** suit larger distances.',
      'A parsec is ==defined by parallax geometry==, not time.',
      '**Angular size** depends on physical size and distance.',
      'Say whether a quantity is angular or linear before comparing.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'The Moon and the Sun look about the same size in the sky. What does this tell you?',
    options: [
      'They have the same diameter',
      'Their angular sizes match, because the larger Sun is much farther away',
      'They are at the same distance',
      'Angular size measures mass',
    ],
    answer: 1,
    explanation:
      'Angular size ≈ physical size ÷ distance; the Sun is ~400× larger and ~400× farther.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'The electromagnetic spectrum',
    image: 'astro-em-spectrum',
    caption:
      'From radio to gamma rays: wavelength, frequency, whether each band reaches the ground, and the temperature of objects that emit most strongly there.',
    bullets: [
      'Each band probes ==different emission processes==.',
      'Cool dust glows in **infrared**; hot plasma shines in **X-rays**.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'One object, many wavelengths',
    image: 'astro-crab-bands',
    caption:
      'The Crab Nebula combined from **radio, infrared, visible, ultraviolet and X-ray** telescopes, each band given its own display color.',
    bullets: [
      'A **false-color** image maps invisible light to visible colors.',
      'Blue display color ==is not blue starlight== automatically.',
      'Read the instrument bands before interpreting.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'False color',
    image: 'astro-sun-sdo',
    caption:
      'NASA’s SDO view of the Sun in **extreme ultraviolet**, shown in red, with a long dark filament of cooler gas.',
    bullets: ['The red is a ==display choice== for an invisible wavelength.'],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each band to a source it often traces.',
    pairs: [
      ['Radio', 'Cold atomic or molecular gas'],
      ['Infrared', 'Warm dust'],
      ['Visible', 'Starlight from photospheres'],
      ['X-ray', 'Million-degree gas or energetic compact sources'],
    ],
    explanation: 'These associations are clues, not unique classifications.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Thermal spectra',
    image: 'astro-blackbody',
    caption:
      'Blackbody curves at **5000, 4000 and 3000 K**: hotter bodies peak at shorter wavelengths and emit far more at every wavelength.',
    bullets: [
      '**Wien:** λ_peak ≈ ==2.898 × 10⁻³ m·K ÷ T==.',
      'Real stars have absorption lines and differ from perfect blackbodies.',
      'A peak outside the visible band does not mean no visible light.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'Using Wien’s law, at what wavelength (in nm) does a 3000 K blackbody peak? Round to the nearest 10 nm.',
    answer: 966,
    tolerance: 10,
    unit: 'nm',
    explanation: '2.898 × 10⁻³ / 3000 = 9.66 × 10⁻⁷ m ≈ 966 nm, in the near infrared.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Spectral lines',
    bullets: [
      'Atoms absorb or emit at **specific transition energies**.',
      'Line positions identify species and **Doppler shifts**.',
      'Line strength also depends on ==temperature, ionization and density==.',
      'A missing line does not prove the element is absent.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'A hot O star shows weak hydrogen lines. What is the best explanation?',
    options: [
      'It contains almost no hydrogen',
      'At that temperature most hydrogen is ionized, so few atoms can absorb those lines',
      'The telescope is broken',
      'Hydrogen lines appear only in cool stars',
    ],
    answer: 1,
    explanation: 'Line strength depends on ionization state; O stars are still mostly hydrogen.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Parallax geometry',
    image: 'astro-parallax',
    caption:
      'As Earth orbits the Sun (1 AU), a near star shifts against distant stars. A parallax angle of **1 arcsecond** defines **1 parsec**.',
    bullets: [
      '==d (pc) = 1 / p (arcsec)==.',
      'Smaller parallax means **greater distance**.',
      'Convert **milliarcseconds** to arcseconds first.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: parallax and temperature',
    problem: 'A star has parallax 50 mas and an approximate blackbody temperature of 5800 K.',
    steps: [
      '50 mas = **0.050 arcsec**, so d = **20 pc**.',
      'Peak wavelength = 2.898 × 10⁻³ / 5800 ≈ **5.0 × 10⁻⁷ m**.',
      'That is about **500 nm**; the star still emits across a broad spectrum.',
    ],
    conclusion: 'Distance and temperature are ==separate observations with separate models==.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'A star’s parallax is 25 mas. What is its distance in parsecs?',
    answer: 40,
    tolerance: 0,
    unit: 'pc',
    explanation: '25 mas = 0.025 arcsec; d = 1/0.025 = 40 pc.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Choosing complementary observations',
    bullets: [
      '**Images** show structure, **spectra** constrain processes, **time series** show variability.',
      'A compact bright point could be a star, an AGN or an unresolved source.',
      'A nondetection can reflect ==instrument limits, not absence==.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'A survey fails to detect a faint companion near a bright star. What is the safest conclusion?',
    options: [
      'There is no companion',
      'Any companion is below the survey’s sensitivity or resolution limits',
      'The bright star must be a black hole',
      'The survey used the wrong star',
    ],
    answer: 1,
    explanation: 'A nondetection reflects what the instrument could see, not proof of absence.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Parsec', back: 'Distance corresponding to one arcsecond of parallax.' },
      { front: 'Parallax', back: 'Apparent angular shift from a change in observer position.' },
      { front: 'Blackbody', back: 'Ideal absorber/emitter with a temperature-dependent spectrum.' },
      { front: 'Spectral line', back: 'Feature associated with particular transition energies.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Angular size depends on **size and distance**.',
      'Each band traces different physics; ==false color is a display choice==.',
      'Wien: hotter → **shorter peak** wavelength.',
      'Lines depend on composition **and** temperature.',
      'Parallax: **d = 1/p** with p in arcseconds.',
    ],
  },
]);

const stars = defineDeck('astro-u3-l1', [
  {
    kind: 'title',
    title: 'Stellar properties, fusion, and the H–R diagram',
    subtitle:
      'What holds stars up, how temperature and radius set luminosity, and how to read the H–R diagram.',
    objectives: [
      'Compute relative luminosity from radius and temperature.',
      'Interpret conventional H–R axes.',
      'Distinguish main-sequence stars, giants, and white dwarfs.',
    ],
    image: 'astro-pleiades',
  },
  {
    kind: 'figure',
    section: 0,
    title: 'What supports a star',
    image: 'astro-sun-white',
    caption: 'The Sun in white light, with a few dark **sunspots** on its photosphere.',
    bullets: [
      'A star balances **gravity** against outward **pressure gradients**: ==hydrostatic equilibrium==.',
      'Main-sequence stars fuse **hydrogen** in their cores.',
      'Fusion is **nuclear**, not chemical burning.',
      'Energy moves outward by **radiation** and **convection**.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Why doesn’t a main-sequence star collapse under its own gravity?',
    options: [
      'It is solid inside',
      'Pressure from hot gas, kept hot by core fusion, pushes outward to balance gravity',
      'It spins too fast',
      'Magnetic fields alone hold it up',
    ],
    answer: 1,
    explanation: 'Hydrostatic equilibrium: outward pressure gradient balances inward gravity.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Temperature and spectral class',
    bullets: [
      'Spectral sequence ==O B A F G K M== runs from hot to cool.',
      'Classification uses line strengths that depend on **temperature and ionization**.',
      '**Dust reddening** can make a hot star look redder.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order the spectral classes from hottest to coolest.',
    items: ['O', 'B', 'A', 'F', 'G', 'K', 'M'],
    explanation: 'O stars exceed 30,000 K; M stars are below about 3,700 K.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Luminosity and radius',
    bullets: [
      'Stefan–Boltzmann: ==L = 4πR²σT⁴==.',
      'In solar units: **L/L☉ = (R/R☉)² (T/T☉)⁴**.',
      'Temperature is raised to the **fourth power**.',
      'A cool star can be very luminous if it is **huge**.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: radius and temperature',
    problem: 'A star has radius 2 R☉ and temperature 2 T☉. Calculate L/L☉.',
    steps: [
      'Radius factor is **2² = 4**.',
      'Temperature factor is **2⁴ = 16**.',
      'Multiply to get **64**; do not add the factors.',
    ],
    conclusion: 'Its luminosity is ==64 L☉==, independent of distance.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'A star has the Sun’s temperature but 3 times its radius. What is L/L☉?',
    answer: 9,
    tolerance: 0,
    explanation: 'L ∝ R² at fixed T, so 3² = 9.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Reading the H–R diagram',
    image: 'astro-hr',
    caption:
      'An H–R diagram of thousands of nearby stars: luminosity up, temperature (spectral class) decreasing to the right, with the **main sequence**, **giants**, **supergiants** and **white dwarfs** labeled.',
    bullets: [
      'Both axes are usually **logarithmic**; temperature ==decreases to the right==.',
      'Main sequence: diagonal band. Giants: luminous and cool. White dwarfs: faint and hot.',
      'Position on the diagram is **not a location in space**.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'A white dwarf',
    image: 'astro-sirius-b',
    caption:
      'Sirius A blazes in this Hubble image; the arrow marks its tiny companion **Sirius B**, a white dwarf.',
    bullets: ['White dwarfs are ==hot but faint== because they are tiny.'],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Where does each star fall on the H–R diagram?',
    bins: ['Main sequence', 'Giants', 'White dwarfs'],
    items: [
      ['The Sun', 0],
      ['A cool, very luminous red star', 1],
      ['Sirius B', 2],
      ['A hot, luminous blue O star fusing hydrogen', 0],
      ['Betelgeuse', 1],
      ['A hot, Earth-sized faint star', 2],
    ],
    explanation: 'Luminosity and temperature together locate a star; radius follows from both.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Mass, lifetime, and limits',
    bullets: [
      'Higher mass → ==higher luminosity and shorter lifetime==.',
      'Toy scalings: **L ∝ M³·⁵**, **lifetime ∝ M/L**, over a limited range.',
      'Do not apply them to giants or white dwarfs.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'A 10 M☉ star has ten times the Sun’s fuel. Why does it live far shorter?',
    options: [
      'It burns chemically instead of by fusion',
      'Its luminosity is thousands of times higher, so it uses fuel much faster',
      'It has less hydrogen per unit mass',
      'It is farther from Earth',
    ],
    answer: 1,
    explanation: 'L ∝ M³·⁵ ≈ 3000× here, so lifetime ∝ M/L is roughly 1/300 of the Sun’s.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Comparing stars defensibly',
    bullets: [
      'Separate **temperature, radius, luminosity, distance and extinction**.',
      'Same temperature → **L ratio = R ratio²**.',
      'Same luminosity → the hotter star is ==smaller==.',
      'A bright-looking star may simply be nearby.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'Two stars have equal luminosity. Star A is 2 times hotter than star B. How many times larger is star B’s radius?',
    answer: 4,
    tolerance: 0,
    explanation: 'At fixed L, R² T⁴ is constant, so R ∝ 1/T²: (2)² = 4.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Hydrostatic equilibrium', back: 'Balance of gravity and pressure gradients.' },
      {
        front: 'Effective temperature',
        back: 'Blackbody-equivalent temperature for emitted flux.',
      },
      { front: 'Main sequence', back: 'Phase of sustained core hydrogen fusion.' },
      {
        front: 'H–R diagram',
        back: 'Diagram relating stellar luminosity and temperature or observational equivalents.',
      },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Stars balance gravity and pressure; cores fuse hydrogen.',
      '**OBAFGKM** runs hot to cool.',
      '==L ∝ R²T⁴==: multiply factors, never add.',
      'H–R: main sequence, giants, white dwarfs; T decreases to the right.',
      'Massive stars are brighter and **shorter-lived**.',
    ],
  },
]);

const evolution = defineDeck('astro-u4-l1', [
  {
    kind: 'title',
    title: 'Cloud collapse and mass-dependent stellar evolution',
    subtitle: 'From dusty clouds to main sequence, giants, and endpoints set by mass.',
    objectives: [
      'Explain gravitational heating before fusion.',
      'Trace low/intermediate- and high-mass pathways.',
      'Interpret a cluster turnoff with assumptions.',
    ],
    image: 'astro-pillars',
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Star-forming clouds',
    image: 'astro-pillars',
    caption:
      'The Pillars of Creation in **near-infrared** light: infrared passes through much of the dust, revealing stars inside and behind the columns.',
    bullets: [
      'Cold, dense **molecular clouds** collapse when gravity wins.',
      'Compression ==converts gravitational energy into heat==.',
      'Infrared sees through dust to **embedded** young stars.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Protostar outflows',
    image: 'astro-hh-jet',
    caption:
      'Herbig-Haro 110: a jet of hot gas from a newborn star ricocheting off a dense cloud core.',
    bullets: [
      'A **protostar** shines before sustained core fusion.',
      'Disks and **outflows** carry away angular momentum.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'A protostar is bright even though core hydrogen fusion has not started. What powers it?',
    options: [
      'Chemical burning',
      'Heat from gravitational contraction',
      'Reflected sunlight',
      'Radioactive decay of uranium',
    ],
    answer: 1,
    explanation:
      'Contraction converts gravitational potential energy into heat that is radiated away.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Entering the main sequence',
    image: 'astro-lh95',
    caption:
      'LH 95 in the Large Magellanic Cloud: hot blue young stars beside still-forming low-mass stars.',
    bullets: [
      'Sustained core hydrogen fusion marks the **main sequence**.',
      '**Initial mass** sets luminosity and lifetime.',
      'Stars ==do not travel up the main sequence==; positions reflect different masses.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: toy lifetime',
    problem: 'A toy model uses L ∝ M³·⁵ and lifetime ∝ M/L. Compare a 2 M☉ star with the Sun.',
    steps: [
      'L/L☉ ≈ 2³·⁵ ≈ **11.3**.',
      'Lifetime ratio ≈ 2/11.3 ≈ **0.177**.',
      'More fuel, but **much faster** consumption.',
    ],
    conclusion: 'About ==18% of the Sun’s lifetime==; the scaling is not universal.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'In the toy model, what is L/L☉ for a 4 M☉ main-sequence star? (Use L ∝ M³·⁵; round to the nearest whole number.)',
    answer: 128,
    tolerance: 1,
    explanation: '4³·⁵ = 4³ × 4⁰·⁵ = 64 × 2 = 128.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'After core hydrogen runs out',
    bullets: [
      'The core contracts; **shell burning** begins around it.',
      'The envelope expands: a **giant**.',
      'The surface ==cools while luminosity rises== because radius grows hugely.',
      'Track **where** fusion happens, not “the star runs out of fuel”.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Planetary nebulae',
    image: 'astro-cats-eye',
    caption:
      'The Cat’s Eye Nebula: shells of gas ejected by a dying Sun-like star around its hot core.',
    bullets: [
      'Low- and intermediate-mass stars shed layers and leave a **white dwarf**.',
      'A **planetary nebula** is ==unrelated to planets== despite its name.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'The Helix Nebula',
    image: 'astro-helix',
    caption: 'The Helix Nebula, a nearby planetary nebula, glowing around its white-dwarf remnant.',
    bullets: ['The remnant’s mass is ==much less than the initial mass==.'],
  },
  {
    kind: 'flow',
    section: 3,
    title: 'Low-mass pathway',
    steps: [
      { label: 'Main sequence', detail: 'Core **hydrogen** fusion.' },
      { label: 'Red giant', detail: 'Shell burning; envelope **expands**.' },
      { label: 'Planetary nebula', detail: 'Outer layers ==ejected==.' },
      { label: 'White dwarf', detail: 'Hot, dense core **cools** for billions of years.' },
    ],
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'High-mass pathways',
    bullets: [
      'Massive stars burn **heavier elements** in nested shells.',
      'Evolution can end in ==core collapse==.',
      '**Mass loss** and **binary interaction** can change the path.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Which end state is typical for each initial mass?',
    bins: ['White dwarf', 'Core-collapse supernova'],
    items: [
      ['1 M☉ (the Sun)', 0],
      ['20 M☉', 1],
      ['3 M☉', 0],
      ['40 M☉', 1],
      ['0.8 M☉', 0],
      ['12 M☉', 1],
    ],
    explanation:
      'Roughly, stars below about 8 M☉ leave white dwarfs; more massive ones collapse. Mass loss and binaries can shift this.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Cluster turnoff as an age clue',
    image: 'astro-m67',
    caption:
      'M67, an old open cluster: its stars formed together, and its hottest stars have already left the main sequence.',
    bullets: [
      'In a coeval cluster, ==massive stars leave first==.',
      'Older cluster → **cooler, lower-mass turnoff**.',
      'Account for distance, extinction, metallicity and binaries.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'Cluster A still has hot blue O and B stars on its main sequence; cluster B’s turnoff is near G stars. Which is older?',
    options: ['Cluster A', 'Cluster B', 'They are the same age', 'Turnoffs cannot indicate age'],
    answer: 1,
    explanation: 'B has lost its massive stars, so its turnoff is lower; it is older.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'A star leaves the main sequence: its surface cools but its luminosity rises. How is that possible?',
    options: [
      'Its distance shrinks',
      'Its radius grows enormously, more than offsetting the cooler surface',
      'It starts burning chemically',
      'Its mass increases',
    ],
    answer: 1,
    explanation: 'L ∝ R²T⁴: a large radius increase outweighs a modest temperature drop.',
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Order the stages for a high-mass star.',
    items: [
      'Molecular cloud collapse',
      'Main-sequence hydrogen fusion',
      'Supergiant with shell burning of heavier elements',
      'Iron core collapse',
      'Supernova leaving a neutron star or black hole',
    ],
    explanation: 'Massive stars burn successively heavier fuels until the iron core collapses.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Protostar',
        back: 'Contracting young stellar object before sustained core hydrogen fusion.',
      },
      { front: 'Shell burning', back: 'Fusion in a layer surrounding a core.' },
      { front: 'Planetary nebula', back: 'Ionized ejected stellar envelope around a hot remnant.' },
      { front: 'Turnoff', back: 'Location where a population departs from the main sequence.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Collapsing clouds heat by **contraction** before fusion.',
      'Initial mass sets the main-sequence position and lifetime.',
      'Giants ==cool at the surface while brightening==.',
      'Low mass → planetary nebula + **white dwarf**; high mass → **core collapse**.',
      'Cluster turnoffs estimate age.',
    ],
  },
]);

export const decks: Deck[] = [strategy, spectrum, stars, evolution, ...astronomyDecksRemnants];
