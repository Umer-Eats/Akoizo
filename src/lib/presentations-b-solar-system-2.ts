import { defineDeck, type Deck } from './presentation-types.ts';

// Solar System (Division B) presentations, part 2: ocean worlds, small bodies, and exoplanets.

const oceanWorlds = defineDeck('sol-u5-l1', [
  {
    kind: 'title',
    title: 'Ocean worlds: Europa, Ganymede, Enceladus, and Titan',
    subtitle: 'Icy moons that hide oceans, and a moon where methane plays the part of water.',
    objectives: [
      'Describe the evidence for subsurface oceans on icy moons.',
      'Compare Titan’s surface liquids and atmosphere with Earth’s.',
      'Explain the goals of Galileo, Europa Clipper, JUICE, Cassini–Huygens, and Dragonfly.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how could a spacecraft tell there is an ocean under kilometers of ice it cannot see through?',
    options: ['Magnetic measurements', 'Watching jets or plumes', 'Measuring gravity', 'Any of these'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Europa',
    image: 'b-sol-europa',
    caption:
      'Europa’s **young icy surface** is crossed by cracks and ridges, with **chaos terrain** where ice blocks broke and refroze.',
    bullets: [
      'Slightly smaller than Earth’s Moon.',
      'Galileo measured an **induced magnetic field**, best explained by a ==salty, electrically conducting ocean== under the ice.',
      'The ocean may hold **twice as much water as Earth’s oceans** and touch a rocky seafloor, where **hydrothermal activity** could supply energy.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'What Galileo measurement is the best evidence for Europa’s ocean?',
    options: [
      'An induced magnetic field from a salty, conducting layer',
      'Photographs of liquid water on the surface',
      'Radio signals from life in the ocean',
      'A thick nitrogen atmosphere',
    ],
    answer: 0,
    explanation:
      'Jupiter’s changing magnetic field induces a response in a conducting layer. A salty ocean under the ice explains the field Galileo measured.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Ganymede',
    image: 'b-sol-ganymede',
    bullets: [
      'The **largest moon** in the solar system, bigger than Mercury.',
      'The ==only moon known to make its own magnetic field==.',
      'Its **auroras shift less than expected**, supporting a deep salty ocean, perhaps sandwiched between ice layers.',
      'Dark, ancient cratered terrain mixes with lighter **grooved terrain**. ESA’s JUICE will orbit it.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which statements about Ganymede are true?',
    options: [
      'It is larger than the planet Mercury',
      'It generates its own magnetic field',
      'Its auroras support a deep salty ocean',
      'It has lakes of liquid methane',
      'It orbits Saturn',
    ],
    answers: [0, 1, 2],
    explanation: 'Ganymede is Jupiter’s moon, bigger than Mercury, with its own magnetic field and an ocean inferred from its auroras. Methane lakes belong to Titan.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Enceladus',
    image: 'b-sol-enceladus-stripes',
    caption:
      'The **tiger stripes**: warm cracks near the south pole where ==jets of water vapor and ice== erupt.',
    bullets: [
      'A small moon of Saturn, only about **500 km** across.',
      'Cassini flew through the plume and found **salts**, **silica nanoparticles** (hot water reacting with rock), **organic molecules** and **hydrogen**.',
      'Later analysis also found **phosphates**. The plume feeds Saturn’s **E ring**.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each discovery in Enceladus’s plume to what it suggests.',
    pairs: [
      ['Salts', 'The water touched rock and is salty like an ocean'],
      ['Silica nanoparticles', 'Hot water is reacting with rock'],
      ['Molecular hydrogen', 'Chemical energy is available'],
      ['Phosphates', 'A key element for life is present'],
    ],
    explanation: 'Each ingredient adds a piece: a salty ocean, hydrothermal activity, an energy source, and phosphorus, one of the CHNOPS elements.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Titan',
    image: 'b-sol-titan-lakes',
    caption:
      'Titan’s northern seas, such as **Kraken Mare**, are filled with ==liquid methane and ethane==, not water.',
    bullets: [
      'A thick **nitrogen** atmosphere with about **1.5 times** Earth’s surface pressure.',
      'At about **−180 °C**, methane forms clouds, rain, rivers, lakes and seas.',
      'Sunlight breaks down methane to make an orange **organic haze**.',
      'Gravity data suggest a **subsurface water ocean** too.',
    ],
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Titan and Earth',
    columns: ['Feature', 'Earth', 'Titan'],
    rows: [
      ['Main gas', 'Nitrogen', '**Nitrogen**, with methane'],
      ['Surface pressure', '1 atmosphere', 'About **1.5** atmospheres'],
      ['Surface liquid', 'Water', '==Methane and ethane=='],
      ['Temperature', 'About 15 °C', 'About **−180 °C**'],
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Which moon does each fact describe?',
    bins: ['Europa', 'Enceladus', 'Titan'],
    items: [
      ['Chaos terrain of broken, refrozen ice', 0],
      ['Tiger-stripe cracks with jets', 1],
      ['Methane rain and rivers', 2],
      ['A plume that feeds Saturn’s E ring', 1],
      ['A thick nitrogen atmosphere', 2],
      ['An ocean revealed by an induced magnetic field', 0],
    ],
    explanation: 'Europa: chaos terrain and an induced field. Enceladus: tiger stripes and a plume. Titan: a thick atmosphere and a methane cycle.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Galileo, Europa Clipper, and JUICE',
    columns: ['Mission', 'When', 'What it does'],
    rows: [
      ['Galileo (NASA)', 'Orbited Jupiter 1995–2003', 'Discovered the evidence for **oceans on Europa and Ganymede**'],
      ['Europa Clipper (NASA)', 'Launched 2024', 'Dozens of close Europa flybys with **ice-penetrating radar**, cameras, a magnetometer, and gas and dust samplers'],
      ['JUICE (ESA)', 'Launched 2023', 'Studies Ganymede, Europa and Callisto; ==first spacecraft to orbit a moon other than ours=='],
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Which mission will become the first spacecraft to orbit a moon other than Earth’s Moon?',
    options: ['JUICE, at Ganymede', 'Europa Clipper, at Europa', 'Galileo, at Io', 'Dragonfly, at Titan'],
    answer: 0,
    explanation: 'JUICE will finish its tour by orbiting Ganymede. Europa Clipper orbits Jupiter and makes flybys of Europa.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Cassini–Huygens and Dragonfly',
    image: 'b-sol-titan',
    caption:
      'Titan’s haze hides its surface, so Cassini used **radar** to map it and Huygens ==landed to see it up close==.',
    bullets: [
      '**Cassini** orbited Saturn 2004–2017, flying through Enceladus’s plume and mapping Titan with radar.',
      '**Huygens** landed on Titan in 2005, the most distant landing ever, and photographed **rounded pebbles** shaped by flowing liquid.',
      '**Dragonfly** is a planned nuclear-powered **rotorcraft** that will fly between sites on Titan to study organic chemistry.',
    ],
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each spacecraft to its achievement or plan.',
    pairs: [
      ['Cassini', 'Flew through Enceladus’s plume'],
      ['Huygens', 'Landed on Titan in 2005'],
      ['Dragonfly', 'Will fly between sites on Titan'],
      ['Galileo', 'Found evidence for Europa’s ocean'],
    ],
    explanation: 'Cassini was the Saturn orbiter, Huygens its Titan lander, Dragonfly the future rotorcraft, and Galileo the earlier Jupiter orbiter.',
  },
  {
    kind: 'summary',
    title: 'Key ideas',
    points: [
      'Europa and Ganymede: **magnetic evidence** for salty oceans under ice.',
      'Enceladus: a **plume** with salts, silica, organics, hydrogen and phosphates.',
      'Titan: a **nitrogen** atmosphere and a ==methane cycle like Earth’s water cycle==.',
      'Missions: Galileo, **Europa Clipper**, **JUICE**, Cassini–Huygens, **Dragonfly**.',
    ],
  },
]);

const smallBodies = defineDeck('sol-u6-l1', [
  {
    kind: 'title',
    title: 'Small bodies and the building blocks of life',
    subtitle: 'Dwarf planets, asteroids and comets as time capsules, and the molecules and organisms that stretch our idea of where life could live.',
    objectives: [
      'Describe Makemake, Bennu, and 67P and what missions learned.',
      'Explain how small bodies delivered water and organics.',
      'Identify life’s building blocks, water phases, and extremophiles.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Makemake',
    bullets: [
      'A **dwarf planet** in the **Kuiper Belt**, beyond Neptune, about two-thirds the size of Pluto.',
      'Spectra show a bright surface of **frozen methane** (and possibly ethane), giving a reddish color.',
      'Extremely cold, around **−240 °C**, with at least one small moon.',
      'Its ice ==preserves material from the early outer solar system==, but it is far too cold for surface liquid water.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'How do scientists know Makemake’s surface is covered in frozen methane?',
    options: [
      'From spectra of the sunlight it reflects',
      'A lander collected a sample',
      'Radar from Earth melted the surface',
      'Its moon is made of methane',
    ],
    answer: 0,
    explanation: 'No spacecraft has visited Makemake. Telescope spectra show the absorption features of methane ice.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Bennu and OSIRIS-REx',
    image: 'b-sol-bennu-sample',
    caption:
      'OSIRIS-REx collected this sample in 2020 and ==returned it to Earth in 2023==.',
    bullets: [
      'Bennu is a near-Earth asteroid about **500 m** across: a carbon-rich **rubble pile** of loose boulders.',
      'The sample holds **hydrated clay minerals**, **carbon compounds**, **phosphates**, and salts left by evaporating **brines**.',
      'It also contains **amino acids** and **nucleobases**: asteroids like Bennu carried ingredients of life.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which were found in the Bennu sample?',
    options: ['Hydrated clay minerals', 'Amino acids', 'Evaporated salts from brines', 'Living microbes', 'Liquid water pools'],
    answers: [0, 1, 2],
    explanation: 'The sample contained clays, carbon compounds, phosphates, salts, amino acids and nucleobases: ingredients of life, not life itself.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Comet 67P and Rosetta',
    image: 'b-sol-67p',
    caption:
      'ESA’s **Rosetta** orbited this two-lobed comet from 2014 to 2016; its **Philae** lander touched down in 2014.',
    bullets: [
      'Rosetta detected the amino acid **glycine**, **phosphorus**, and many organic molecules.',
      '67P’s water had a **deuterium-to-hydrogen (D/H)** ratio about ==three times Earth’s oceans==.',
      'So comets like 67P were probably **not the main source** of Earth’s water.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each small body to its description.',
    pairs: [
      ['Makemake', 'Kuiper Belt dwarf planet coated in methane ice'],
      ['Bennu', 'Carbon-rich rubble-pile asteroid sampled by OSIRIS-REx'],
      ['67P', 'Two-lobed comet studied by Rosetta and Philae'],
    ],
    explanation: 'Makemake is a distant dwarf planet, Bennu a near-Earth asteroid, and 67P a comet.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Delivering water and organics',
    bullets: [
      'Early Earth formed **hot and close to the Sun**, where water was hard to keep.',
      'Much of its water may have come from **carbon-rich asteroids**, whose water ==matches Earth’s oceans better than most comets==.',
      'Impacts also delivered **organic molecules**.',
      '**Isotope ratios** like D/H act as fingerprints to test which source fits; **spectra** identify ices, minerals and organics.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'A comet’s water has a D/H ratio three times that of Earth’s oceans. What does that suggest?',
    options: [
      'Comets like it were not the main source of Earth’s water',
      'All of Earth’s water came from that type of comet',
      'Earth’s oceans formed from deuterium only',
      'The comet must have come from Earth',
    ],
    answer: 0,
    explanation: 'Isotope ratios act like fingerprints. Water with a different D/H ratio from Earth’s oceans cannot be their main source.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Building blocks of life',
    bullets: [
      '**Proteins**, built from **amino acids**, act as enzymes and structures.',
      '**Nucleic acids** (DNA and RNA), built from **nucleotides**, store and transfer information.',
      '**Lipids** form cell membranes; **carbohydrates** store energy and form structures.',
      'Water beyond liquid: **crystalline ice**, **amorphous ice** (in very cold space), **brines**, and **clathrates** that ==trap gases like methane in icy cages==.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each molecule class to its building block or job.',
    pairs: [
      ['Proteins', 'Built from amino acids; act as enzymes'],
      ['Nucleic acids', 'Built from nucleotides; store information'],
      ['Lipids', 'Form cell membranes'],
      ['Carbohydrates', 'Store energy'],
    ],
    explanation: 'These four classes of molecules make up all known life.',
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Is each item a form of water or a building block of life?',
    bins: ['Form of water', 'Building block of life'],
    items: [
      ['Amorphous ice', 0],
      ['Clathrate', 0],
      ['Brine', 0],
      ['Amino acid', 1],
      ['Nucleotide', 1],
      ['Lipid', 1],
    ],
    explanation: 'Amorphous ice, clathrates and brines are water phases or mixtures; amino acids, nucleotides and lipids are the molecules life is built from.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Extremophiles',
    image: 'b-sol-tardigrade',
    caption:
      '**Tardigrades** survive drying, freezing, radiation and vacuum by entering a ==dormant state==.',
    bullets: [
      '**Extremophiles** thrive in conditions once thought impossible.',
      '**Chemolithoautotrophs** get energy from inorganic chemicals such as hydrogen or sulfur compounds and make food from carbon dioxide.',
      'Some live at deep-sea **hydrothermal vents** with no sunlight.',
      'Extremophiles ==expand where life might exist==: icy moon oceans or Martian brines.',
    ],
  },
  {
    kind: 'fill',
    section: 5,
    prompt: 'Complete the sentences about extremophiles.',
    text: 'Microbes at deep-sea hydrothermal vents get energy from {0} chemicals instead of sunlight and make food from {1}. They are called {2}.',
    blanks: ['inorganic', 'carbon dioxide', 'chemolithoautotrophs'],
    distractors: ['radioactive', 'oxygen', 'photosynthesizers'],
    explanation: 'Chemolithoautotrophs “eat rocks”: they use chemicals such as hydrogen or sulfur compounds for energy and fix carbon dioxide into food.',
  },
  {
    kind: 'summary',
    title: 'Key ideas',
    points: [
      'Makemake, Bennu and 67P are **time capsules** from the early solar system.',
      'Bennu’s sample held **amino acids, nucleobases, clays and salts**.',
      '**D/H ratios** suggest ==carbon-rich asteroids, not comets like 67P==, delivered much of Earth’s water.',
      'Life uses proteins, nucleic acids, lipids and carbohydrates; **extremophiles** widen where life could live.',
    ],
  },
]);

const exoplanets = defineDeck('sol-u7-l1', [
  {
    kind: 'title',
    title: 'Exoplanets: detection and the named systems',
    subtitle: 'How astronomers find planets around other stars, and the systems and telescopes named in the rules.',
    objectives: [
      'Explain transit, radial velocity, microlensing, and direct imaging.',
      'Describe TRAPPIST-1, Kepler-452, and LHS 1140.',
      'Describe the roles of Kepler, JWST, and the Roman Space Telescope.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Transits',
    bullets: [
      'A **transit** happens when a planet passes in front of its star and blocks a little light.',
      'The **transit depth** = **(Rp/Rs)²**, the planet-to-star radius ratio squared.',
      'An Earth-sized planet dims a Sun-like star by only about **0.01%**, but ==a small red dwarf shows a much deeper dip==.',
      'The time between transits gives the **orbital period**.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'A planet’s radius is one tenth of its star’s radius. What percentage of the star’s light does the transit block?',
    answer: 1,
    tolerance: 0,
    unit: '%',
    explanation: 'Depth = (Rp/Rs)² = (1/10)² = 1/100, which is 1% of the star’s light.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Radial velocity',
    bullets: [
      'A planet and its star orbit their common **center of mass**, so the star **wobbles**.',
      'As the star moves toward and away from us, its spectral lines shift by the **Doppler effect**.',
      'Bigger planets and closer orbits cause ==bigger wobbles==.',
      'Radial velocity gives a **minimum mass**; combined with the transit radius it gives **density**: rocky, water-rich or gaseous.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'What can astronomers find by combining a planet’s transit radius with its radial-velocity mass?',
    options: [
      'Its density, which hints at its composition',
      'Its exact surface temperature',
      'Whether it has life',
      'The age of its star',
    ],
    answer: 0,
    explanation: 'Mass divided by volume gives density, which tells whether a planet is likely rocky, water-rich or gaseous.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Microlensing and direct imaging',
    bullets: [
      '**Microlensing**: a foreground star bends and brightens a distant star’s light; a planet adds a ==short extra spike==.',
      'Microlensing finds planets far from their stars and even **free-floating planets**, but each event happens only once.',
      '**Direct imaging** blocks starlight with a **coronagraph** or **starshade** to photograph planets.',
      'It works best for **large, young, hot planets** far from their stars.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Which detection method does each clue describe?',
    bins: ['Transit', 'Radial velocity', 'Microlensing', 'Direct imaging'],
    items: [
      ['A regular small dip in brightness', 0],
      ['Spectral lines shifting back and forth', 1],
      ['A one-time brightening with a short extra spike', 2],
      ['A coronagraph blocks the starlight', 3],
      ['Can find free-floating planets', 2],
      ['Gives the planet’s minimum mass', 1],
    ],
    explanation: 'Transits dim the star, radial velocity shifts its spectrum, microlensing brightens a background star once, and direct imaging blocks the star to see the planet.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'TRAPPIST-1',
    image: 'b-sol-trappist-hz',
    caption:
      'Seven roughly **Earth-sized** rocky planets, all closer to their star than Mercury is to the Sun.',
    bullets: [
      'An **ultracool red dwarf** about **40 light-years** away.',
      'Planets **e, f and g** lie in the habitable zone. The planets are likely **tidally locked**.',
      'JWST suggests the inner planets **b and c lack thick atmospheres**: ==red dwarf flares may strip atmospheres==.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Which TRAPPIST-1 planets are in the habitable zone?',
    options: ['e, f and g', 'b and c', 'Only h', 'All seven'],
    answer: 0,
    explanation: 'Planets e, f and g sit in the habitable zone. JWST suggests the innermost planets b and c lack thick atmospheres.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Kepler-452 b and LHS 1140 b',
    columns: ['Feature', 'Kepler-452 b', 'LHS 1140 b'],
    rows: [
      ['Star', 'A **Sun-like G star**', 'A **red dwarf**'],
      ['Distance', 'About 1,400–1,800 light-years', 'About **48 light-years**'],
      ['Size', 'About **1.6** Earth radii', 'About **1.7** Earth radii'],
      ['Notes', 'Period 385 days; ==detection questioned by later reanalysis==', 'Rocky or water-rich; JWST hints at an ==atmosphere=='],
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each planet to its description.',
    pairs: [
      ['Kepler-452 b', 'Super-Earth orbiting a Sun-like star in 385 days'],
      ['LHS 1140 b', 'Super-Earth around a red dwarf about 48 light-years away'],
      ['TRAPPIST-1 e', 'Earth-sized habitable-zone planet in a seven-planet system'],
    ],
    explanation: 'Kepler-452 b orbits a G star, LHS 1140 b a nearby red dwarf, and TRAPPIST-1 e is one of seven planets around an ultracool dwarf.',
  },
  {
    kind: 'compare',
    section: 5,
    title: 'Kepler, JWST, and Roman',
    columns: ['Telescope', 'Main method', 'Contribution'],
    rows: [
      ['Kepler', 'Transits', 'Stared at one patch of sky 2009–2018; found thousands of planets and showed ==small planets are common=='],
      ['JWST', 'Infrared **transmission spectroscopy**', 'Reads starlight filtered through a planet’s atmosphere to detect gases like **CO₂** and **water**'],
      ['Roman', 'Microlensing and a coronagraph', 'Will survey the galactic center for **microlensing planets** and test **direct imaging**'],
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'How does JWST detect gases in an exoplanet’s atmosphere?',
    options: [
      'It studies starlight filtered through the atmosphere during a transit',
      'It lands a probe on the planet',
      'It measures the star’s wobble',
      'It waits for a microlensing event',
    ],
    answer: 0,
    explanation: 'In transmission spectroscopy, gases in the planet’s atmosphere absorb specific wavelengths of the starlight passing through it.',
  },
  {
    kind: 'summary',
    title: 'Key ideas',
    points: [
      '**Transit depth = (Rp/Rs)²**; the time between transits gives the period.',
      '**Radial velocity** gives minimum mass; with radius it gives ==density==.',
      '**Microlensing** finds distant and free-floating planets; **direct imaging** needs a coronagraph or starshade.',
      'TRAPPIST-1, Kepler-452 b and LHS 1140 b; telescopes **Kepler**, **JWST** and **Roman**.',
    ],
  },
]);

export const solarSystemDecksWorlds: Deck[] = [oceanWorlds, smallBodies, exoplanets];
