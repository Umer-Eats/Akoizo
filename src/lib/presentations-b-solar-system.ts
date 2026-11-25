import { defineDeck, type Deck } from './presentation-types.ts';
import { solarSystemDecksWorlds } from './presentations-b-solar-system-2.ts';

// Solar System (Division B) presentations, one per lesson in lessons-division-b.ts. Each deck
// follows its lesson section by section (`section` is the lesson section index) at a middle-school
// level, and its activities rehearse the lesson's key ideas and proportional reasoning.

const habitability = defineDeck('sol-u1-l1', [
  {
    kind: 'title',
    title: 'What makes a world habitable?',
    subtitle:
      'The conditions life as we know it needs, and the places in the solar system that may have them.',
    objectives: [
      'List the conditions relevant to habitability.',
      'Explain how a world keeps an atmosphere and stable liquids.',
      'Describe tidal heating and chemical disequilibrium as energy sources.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which place do you think is most likely to be habitable today?',
    options: [
      'The surface of Mars',
      'An ocean under Europa’s ice',
      'The surface of Venus',
      'Titan’s methane lakes',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Habitable, not inhabited',
    bullets: [
      'A **habitable** environment could support life as we know it. It does ==not mean life is actually there==.',
      'Three broad needs: **liquid water** as a solvent, a **source of energy**, and the right **chemical elements**.',
      'The key elements are carbon, hydrogen, nitrogen, oxygen, phosphorus and sulfur (CHNOPS).',
      'A world can be habitable in one place, such as an ocean under ice, and hostile on its surface.',
    ],
  },
  {
    kind: 'multi',
    section: 0,
    prompt: 'Which are the three broad needs scientists look for in a habitable environment?',
    options: [
      'Liquid water',
      'A source of energy',
      'The chemical elements life uses',
      'An oxygen-rich atmosphere',
      'Visible plants on the surface',
    ],
    answers: [0, 1, 2],
    explanation:
      'Liquid water, energy, and elements such as CHNOPS are the broad needs. Many microbes live without oxygen, and plants are a sign of life, not a requirement for habitability.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'The habitable zone',
    image: 'b-sol-kepler22-hz',
    caption:
      'The **habitable zone** is the range of distances where a planet with the right atmosphere could keep ==liquid water on its surface==.',
    bullets: [
      'Around hot, bright stars the zone lies **farther out**; around cool, dim stars it lies **closer in**.',
      'Distance is not everything: **albedo** (the fraction of light reflected) and the **greenhouse effect** matter too.',
      'Venus and Earth get similar sunlight but have very different surfaces.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'A star is cooler and dimmer than the Sun. Where is its habitable zone?',
    options: [
      'Closer to the star than Earth is to the Sun',
      'Farther from the star than Earth is to the Sun',
      'At exactly 1 AU, like Earth',
      'Cool stars have no habitable zone',
    ],
    answer: 0,
    explanation:
      'A dimmer star delivers less energy at each distance, so a planet must orbit closer to stay warm enough for liquid water.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Keeping an atmosphere',
    bullets: [
      'An atmosphere **spreads heat**, **shields** the surface from radiation, and provides **pressure** that keeps liquids stable.',
      'A world keeps a gas if its **escape velocity** is much larger than the speed of the gas molecules.',
      '==Small, hot worlds lose light gases like hydrogen most easily==.',
      'A **magnetic field** can protect an atmosphere from being stripped by the solar wind.',
    ],
    callout: 'Mars’s thin atmosphere shows what happens when these protections are weak.',
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Does each feature help a world keep its atmosphere, or make it easier to lose?',
    bins: ['Helps keep it', 'Makes it easier to lose'],
    items: [
      ['A large mass and high escape velocity', 0],
      ['A strong global magnetic field', 0],
      ['Very hot gas whose molecules move fast', 1],
      ['A light gas such as hydrogen', 1],
      ['A small, low-gravity body', 1],
    ],
    explanation:
      'High escape velocity and a magnetic shield hold gases in. Fast-moving, light molecules on small worlds escape most easily.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Stable liquids, on the surface and below',
    bullets: [
      'On a surface, liquid water needs **enough air pressure**; otherwise ice **sublimates** straight to gas.',
      '**Ice shells** can keep oceans liquid underneath by trapping heat and adding pressure.',
      '**Salts lower the freezing point**, so brines can stay liquid below 0 °C.',
      'Titan shows ==other liquids can be stable==: methane and ethane lakes at very low temperatures.',
    ],
  },
  {
    kind: 'fill',
    section: 3,
    prompt: 'Complete the sentences about liquid water.',
    text: 'Without enough air pressure, surface ice {0} directly to gas. Dissolved {1} lower the freezing point, so a {2} can stay liquid below 0 °C.',
    blanks: ['sublimates', 'salts', 'brine'],
    distractors: ['melts', 'metals', 'glacier'],
    explanation:
      'Low pressure lets ice turn straight to vapor (sublimation). Salt water, or brine, freezes at a lower temperature than fresh water.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Tidal heating',
    image: 'b-sol-europa',
    bullets: [
      'A moon on an **elliptical orbit** is squeezed harder when close to its planet and less when far away.',
      'That repeated flexing makes **friction and heat** inside the moon: **tidal heating**.',
      '**Orbital resonances** keep orbits from becoming circular: Io, Europa and Ganymede are in a **1 : 2 : 4** resonance.',
      'Tidal heating can keep oceans liquid ==far beyond the Sun’s habitable zone==, as on Europa and Enceladus.',
    ],
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Put the steps of tidal heating in order.',
    items: [
      'A resonance keeps the moon’s orbit elliptical',
      'The moon’s distance from its planet changes each orbit',
      'The tidal squeeze grows and shrinks',
      'The interior flexes and friction makes heat',
      'Heat helps keep a subsurface ocean liquid',
    ],
    explanation:
      'The resonance keeps the orbit stretched, so the distance and tidal squeeze keep changing; that flexing heats the interior and can keep water liquid.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Chemical disequilibrium: energy for life',
    image: 'b-sol-enceladus-plume',
    caption:
      'Cassini flew through this plume and found **hydrogen gas**: a sign of ==chemical energy that microbes could use==.',
    bullets: [
      'Life gets energy from reactions that **have not yet reached equilibrium**.',
      'Mixing **oxidants and reductants**, such as hydrogen and carbon dioxide, releases energy; some microbes use it to make methane.',
      'On Earth, **oxygen and methane together** in the air is itself a strong sign of life.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Why was finding hydrogen gas in Enceladus’s plume exciting?',
    options: [
      'It means usable chemical energy is available',
      'It proves that life exists on Enceladus',
      'It shows Enceladus has an oxygen atmosphere',
      'It means the ocean is frozen solid',
    ],
    answer: 0,
    explanation:
      'Hydrogen alongside carbon dioxide is a mixture out of equilibrium that microbes could use for energy. It is evidence of habitability, not proof of life.',
  },
  {
    kind: 'match',
    prompt: 'Match each world to the feature that makes it interesting for habitability.',
    pairs: [
      ['Europa', 'A salty ocean kept liquid by tidal heating'],
      ['Enceladus', 'A plume containing hydrogen gas'],
      ['Titan', 'Lakes of liquid methane and ethane'],
      ['Mars', 'A thin atmosphere that lost much of its gas'],
    ],
    explanation:
      'Each world shows a different piece of habitability: a hidden ocean, chemical energy, unusual liquids, or what happens when an atmosphere is lost.',
  },
  {
    kind: 'summary',
    title: 'Key ideas',
    points: [
      '**Habitable** means could support life, not that life is present.',
      'Look for **liquid water**, **energy**, and **CHNOPS** elements.',
      'Escape velocity and magnetic fields help a world ==keep its atmosphere==.',
      '**Tidal heating** and **chemical disequilibrium** supply energy far from the Sun.',
    ],
  },
]);

const light = defineDeck('sol-u2-l1', [
  {
    kind: 'title',
    title: 'Light, radiation, and temperature',
    subtitle:
      'How starlight spreads out, how temperature sets the color and power of glowing objects, and what moving light reveals.',
    objectives: [
      'Apply the inverse-square law to stellar flux.',
      'Use the Stefan–Boltzmann law, Wien’s law, and albedo to estimate temperatures.',
      'Interpret Doppler shifts in spectra.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Flux and the inverse-square law',
    image: 'astro-inverse-square',
    caption: 'The same light spreads over a larger area farther away, so **flux falls as 1/d²**.',
    bullets: [
      '**Flux** is the power received per unit area.',
      'Doubling the distance gives **one quarter** the flux; at 3 AU a planet gets **one ninth** of the flux at 1 AU.',
      'Jupiter, at about 5.2 AU, gets roughly ==1/27 of Earth’s sunlight==.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'A planet orbits at 4 AU. What fraction of Earth’s sunlight does it receive? Give a decimal.',
    answer: 0.0625,
    tolerance: 0.002,
    explanation: 'Flux scales as 1/d², so 1/4² = 1/16 = 0.0625 of the flux at 1 AU.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Stefan–Boltzmann law',
    bullets: [
      'Power emitted per area by a blackbody: **F = σT⁴**.',
      'Because of the fourth power, ==small temperature changes cause large changes in emission==.',
      'Doubling the temperature increases emission by **2⁴ = 16 times**.',
      'A star’s total power (luminosity) depends on size and temperature: **L ∝ R²T⁴**. A large, cool star can still be very luminous.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'Star B has the same size as star A but three times the surface temperature. How many times more power does it emit?',
    answer: 81,
    tolerance: 0,
    unit: 'times',
    explanation: 'With the same radius, L ∝ T⁴, so 3⁴ = 81 times as much power.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Wien’s displacement law',
    image: 'astro-blackbody',
    caption: 'Hotter objects peak at **shorter wavelengths**: λmax = b/T, with b ≈ 2.9 × 10⁻³ m·K.',
    bullets: [
      'The Sun, near 5,800 K, peaks in **visible** light at about 500 nm.',
      'Earth, near 290 K, peaks in the **infrared**, around 10 µm.',
      'That is why ==JWST studies cool planets and dust in infrared light==, and why red dwarfs near 3,000 K look red.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Which object has its peak emission at the longest wavelength?',
    options: ['A 290 K planet', 'A 3,000 K red dwarf', 'The 5,800 K Sun', 'A 10,000 K blue star'],
    answer: 0,
    explanation:
      'Peak wavelength is inversely proportional to temperature, so the coldest object, the planet, peaks at the longest wavelength.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Albedo and equilibrium temperature',
    bullets: [
      '**Equilibrium temperature**: the temperature where ==absorbed sunlight equals radiated heat==.',
      'Absorbed power depends on **(1 − A)**, where A is the **albedo**.',
      'For the Sun: Teq ≈ 278 K × (1 − A)^¼ ÷ √d, with d in AU.',
      'Earth (A ≈ 0.3) gives about **255 K**, but its true average is about **288 K**: the difference is the **greenhouse effect**.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'Earth’s calculated equilibrium temperature is about 255 K, but its real average is about 288 K. Why?',
    options: [
      'The greenhouse effect of Earth’s atmosphere',
      'Earth’s albedo is zero',
      'Earth is closer to the Sun than 1 AU',
      'Earth’s core heats the surface by 33 K',
    ],
    answer: 0,
    explanation:
      'The equilibrium formula ignores the atmosphere. Greenhouse gases trap outgoing infrared and warm the surface by about 33 K.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Proportional reasoning',
    bullets: [
      'The rules emphasize **ratios and estimates**, not calculators: set up ratios so constants cancel.',
      '**Teq ∝ 1/√d**: a planet four times farther is ==half as warm==.',
      '**λ ∝ 1/T**: a star twice as hot peaks at half the wavelength.',
      'Always check that units and powers are consistent.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each change to its result.',
    pairs: [
      ['Distance doubles', 'Flux becomes one quarter'],
      ['Distance becomes 4 times larger', 'Equilibrium temperature halves'],
      ['Temperature doubles', 'Peak wavelength halves'],
      ['Temperature doubles (same size)', 'Emitted power becomes 16 times larger'],
    ],
    explanation:
      'Flux ∝ 1/d², Teq ∝ 1/√d, λmax ∝ 1/T, and emitted power ∝ T⁴. Each answer comes from a ratio, not a full calculation.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Doppler shifts',
    image: 'astro-em-spectrum',
    bullets: [
      'Motion **toward** you shortens wavelengths (**blueshift**); motion **away** lengthens them (**redshift**).',
      'For speeds much less than light: **Δλ/λ = v/c**.',
      'Doppler shifts reveal ==stars wobbling because of planets==, spinning planets and stars, and winds.',
    ],
    callout:
      'A line at 500.00 nm seen at 500.01 nm is shifted by 2 × 10⁻⁵: motion away at about 6 km/s.',
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Is each spectral line redshifted or blueshifted?',
    bins: ['Redshift (moving away)', 'Blueshift (moving toward)'],
    items: [
      ['A 656.3 nm line seen at 656.5 nm', 0],
      ['A 500.0 nm line seen at 499.9 nm', 1],
      ['A star moving away from Earth', 0],
      ['The approaching side of a spinning planet', 1],
    ],
    explanation:
      'Longer observed wavelengths mean motion away (redshift); shorter ones mean motion toward us (blueshift).',
  },
  {
    kind: 'summary',
    title: 'Key ideas',
    points: [
      'Flux falls as **1/d²**.',
      'Emission grows as **T⁴**, and luminosity as **R²T⁴**.',
      'Peak wavelength falls as **1/T**: ==hot is blue, cool is red or infrared==.',
      'Equilibrium temperature depends on **albedo** and distance; the **greenhouse effect** adds warmth.',
      'Doppler shifts measure motion along the line of sight.',
    ],
  },
]);

const gravity = defineDeck('sol-u3-l1', [
  {
    kind: 'title',
    title: 'Gravity, orbits, and tides',
    subtitle:
      'How one force explains falling objects, orbiting planets, escaping gas, and moons that always show the same face.',
    objectives: [
      'Use Newton’s law of gravitation in proportion problems.',
      'Apply Kepler’s laws and calculate escape velocity relationships.',
      'Explain tidal forces and how they shape moons.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Newton’s law of gravitation',
    bullets: [
      'Every mass attracts every other mass: **F = GMm/r²**.',
      'Doubling one mass **doubles** the force; doubling the distance makes it ==one quarter==.',
      'Surface gravity is **g = GM/R²**.',
      'A planet with twice Earth’s mass and twice its radius has **half** Earth’s surface gravity (2 ÷ 2² = ½).',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'A planet has 4 times Earth’s mass and 2 times Earth’s radius. Its surface gravity is how many times Earth’s?',
    answer: 1,
    tolerance: 0,
    unit: 'times',
    explanation: 'g ∝ M/R², so 4 ÷ 2² = 4 ÷ 4 = 1. Its surface gravity equals Earth’s.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Kepler’s first and second laws',
    image: 'astro-kepler-laws',
    caption:
      'Planets move on **ellipses** with the star at one focus, and sweep out ==equal areas in equal times==.',
    bullets: [
      'The closest point is **periapsis** (perihelion around the Sun); the farthest is **apoapsis**.',
      'A planet moves **fastest near periapsis** and slowest near apoapsis.',
      'Comets on very stretched orbits, like 67P, speed up dramatically near the Sun.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Where on its elliptical orbit does a comet move fastest?',
    options: [
      'At perihelion, closest to the Sun',
      'At aphelion, farthest from the Sun',
      'Halfway between them',
      'Its speed never changes',
    ],
    answer: 0,
    explanation:
      'Equal areas in equal times means the comet must cover more distance near the Sun, so it moves fastest at perihelion.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Kepler’s third law',
    bullets: [
      'Period and orbit size are linked: **P² ∝ a³**.',
      'Around the Sun, with P in years and a in AU: **P² = a³**. At 4 AU, P² = 64, so **P = 8 years**.',
      'Newton’s version includes the central mass: P² = 4π²a³/(GM).',
      'Around a ==less massive star, the same distance means a longer period==; red-dwarf habitable-zone planets still orbit in days because they are so close.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'An asteroid orbits the Sun with a semi-major axis of 9 AU. What is its period in years?',
    answer: 27,
    tolerance: 0,
    unit: 'years',
    explanation: 'P² = a³ = 9³ = 729, so P = √729 = 27 years.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Energy and escape velocity',
    bullets: [
      'Kinetic energy is **½mv²**; gravitational potential energy is **−GMm/r**.',
      'To escape, kinetic energy must cancel the potential energy: **v = √(2GM/R)**.',
      'Escape velocity ==grows with mass and shrinks with radius==.',
      'Earth about **11.2 km/s**, Mars about **5 km/s**, and tiny Bennu only **centimeters per second**.',
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Which changes would raise a world’s escape velocity?',
    options: [
      'More mass, same radius',
      'Same mass, smaller radius',
      'Same mass, larger radius',
      'Less mass, same radius',
    ],
    answers: [0, 1],
    explanation: 'v = √(2GM/R): more mass or a smaller radius both raise the escape velocity.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Tidal forces',
    bullets: [
      'Tidal force is the **difference** in gravity across a body: the near side is pulled harder than the far side.',
      'This **stretches** the body along the line to the other mass.',
      'Tidal force scales as **M/d³**, so it ==falls faster with distance than gravity itself==.',
      'The Moon raises bigger tides on Earth than the Sun because it is much closer.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'The Sun is far more massive than the Moon. Why does the Moon raise larger tides on Earth?',
    options: [
      'Tidal force falls as 1/d³, and the Moon is much closer',
      'The Moon is made of denser rock than the Sun',
      'The Sun’s gravity does not reach Earth’s oceans',
      'The Moon has a magnetic field',
    ],
    answer: 0,
    explanation:
      'Because tides depend on the cube of distance, the Moon’s closeness outweighs the Sun’s much larger mass.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Tidal locking and heating',
    image: 'b-sol-ganymede',
    caption:
      'Ganymede, like most large moons, is **tidally locked**: it ==always shows the same face== to Jupiter.',
    bullets: [
      'Tides slow a moon’s spin until its rotation matches its orbit.',
      'Europa, Ganymede, Enceladus and Titan are all tidally locked.',
      'If the orbit stays **elliptical**, the bulge grows and shrinks each orbit, flexing the interior and making **heat**.',
      'TRAPPIST-1’s planets are probably locked too, with one side always facing their star.',
    ],
  },
  {
    kind: 'fill',
    section: 5,
    prompt: 'Complete the sentences about tidal effects.',
    text: 'A moon that always shows the same face to its planet is tidally {0}. If its orbit stays {1}, the tidal bulge changes size each orbit and the interior {2} and heats up.',
    blanks: ['locked', 'elliptical', 'flexes'],
    distractors: ['heated', 'circular', 'cools'],
    explanation:
      'Tidal locking matches spin to orbit. An elliptical orbit keeps changing the tidal stretch, and that flexing generates heat.',
  },
  {
    kind: 'summary',
    title: 'Key ideas',
    points: [
      'Gravity ∝ **mass/distance²**; surface gravity ∝ **M/R²**.',
      'Kepler: **ellipses**, **equal areas**, and ==P² = a³== around the Sun.',
      'Escape velocity **√(2GM/R)** grows with mass and shrinks with radius.',
      'Tides ∝ **M/d³**: they stretch, lock, and heat moons.',
    ],
  },
]);

const venusMars = defineDeck('sol-u4-l1', [
  {
    kind: 'title',
    title: 'Venus and Mars: rocky neighbors',
    subtitle:
      'Two Earth-like planets that took very different paths, and the missions studying why.',
    objectives: [
      'Compare the atmospheres and surfaces of Venus and Mars with Earth’s.',
      'Interpret geologic and chemical evidence for past water.',
      'Describe the goals and instruments of the listed Venus and Mars missions.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Venus today',
    bullets: [
      'Nearly **Earth’s size**, but the surface is about **465 °C**.',
      'A crushing **carbon dioxide** atmosphere, about **90 times** Earth’s surface pressure.',
      '**Sulfuric acid clouds** give it a high albedo.',
      'A **runaway greenhouse** makes it ==hotter than Mercury==, even though it is farther from the Sun.',
      'It spins slowly and backward, so a Venus day is longer than its year.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Why is Venus hotter than Mercury, even though Mercury is closer to the Sun?',
    options: [
      'Its thick CO₂ atmosphere causes a runaway greenhouse effect',
      'Venus has a lower albedo than any other planet',
      'Venus has active volcanoes all over its surface',
      'Venus spins faster, making friction heat',
    ],
    answer: 0,
    explanation:
      'Venus actually reflects most sunlight, but its dense carbon dioxide atmosphere traps heat so well that the surface reaches about 465 °C.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Did Venus once have water?',
    image: 'b-sol-venus-radar',
    caption:
      'Radar sees through Venus’s clouds. Its surface is **young**, largely reshaped by volcanism, with **tesserae** that may be ancient crust.',
    bullets: [
      'Venus has a very high ratio of **deuterium** (heavy hydrogen) to ordinary hydrogen.',
      'Light hydrogen escapes more easily, leaving deuterium behind, so the high ratio suggests ==Venus lost a lot of water==.',
      'Some models suggest shallow oceans before a runaway greenhouse boiled them away.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order the steps in how scientists think Venus lost its water.',
    items: [
      'Venus may have had shallow oceans',
      'A runaway greenhouse boiled the water into vapor',
      'Sunlight split water molecules high in the atmosphere',
      'Light hydrogen escaped faster than deuterium',
      'A high deuterium-to-hydrogen ratio remained',
    ],
    explanation:
      'The leftover deuterium is the fingerprint: when ordinary hydrogen escapes faster, the heavy form builds up.',
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Venus missions',
    columns: ['Mission', 'Type', 'Goal'],
    rows: [
      [
        'Venus Express (ESA)',
        'Orbiter, 2006–2014',
        'Studied atmospheric circulation; found **infrared hot spots** hinting at recent volcanism',
      ],
      [
        'DAVINCI (NASA)',
        'Planned descent probe',
        'Measure atmospheric composition, including **noble gases and isotopes** that record water loss; image tesserae',
      ],
      [
        'VERITAS (NASA)',
        'Planned orbiter',
        'Map **topography with radar** and identify rock types from ==infrared emission==',
      ],
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each Venus mission to what it does.',
    pairs: [
      ['Venus Express', 'Orbited and found infrared hot spots'],
      ['DAVINCI', 'Drops a probe to sample the atmosphere'],
      ['VERITAS', 'Maps surface topography with radar'],
    ],
    explanation:
      'Venus Express was the ESA orbiter; DAVINCI samples the atmosphere on the way down; VERITAS maps the surface from orbit.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Mars today',
    bullets: [
      'A thin **carbon dioxide** atmosphere: ==less than 1% of Earth’s surface pressure==.',
      'Average temperature near **−60 °C**.',
      'Liquid water quickly boils or freezes, so water exists mainly as **polar and buried ice**.',
      'Mars lost its **global magnetic field** early, letting the solar wind strip away much of its air.',
      'Dust storms can cover the whole planet.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Does each fact describe Venus or Mars?',
    bins: ['Venus', 'Mars'],
    items: [
      ['Surface pressure about 90 times Earth’s', 0],
      ['Surface pressure under 1% of Earth’s', 1],
      ['Sulfuric acid clouds', 0],
      ['Global dust storms', 1],
      ['Lost its magnetic field early', 1],
      ['A day longer than its year', 0],
    ],
    explanation:
      'Venus is thick, hot and cloudy; Mars is thin, cold and dusty. Both have mostly carbon dioxide atmospheres.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Evidence for ancient water on Mars',
    image: 'b-sol-valleys',
    caption:
      '**Valley networks** like these were carved by flowing water ==over 3 billion years ago==.',
    bullets: [
      '**Morphology** (landforms): valley networks, flood-carved **outflow channels**, and fan-shaped **deltas** such as in Jezero crater.',
      '**Chemistry**: **clay minerals** and **sulfates** that form in water, plus hematite concretions.',
      'Together they show early Mars had stable surface water and possibly habitable lakes.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Is each clue landform evidence or chemical evidence of ancient water?',
    bins: ['Landform (morphology)', 'Chemistry (minerals)'],
    items: [
      ['Branching valley networks', 0],
      ['Clay minerals', 1],
      ['A fan-shaped delta in a crater', 0],
      ['Sulfate minerals', 1],
      ['Flood-carved outflow channels', 0],
      ['Hematite concretions', 1],
    ],
    explanation:
      'Shapes carved by flowing water are morphology; minerals that form in water are chemical evidence. The two lines of evidence agree.',
  },
  {
    kind: 'compare',
    section: 5,
    title: 'Mars missions',
    columns: ['Mission', 'Type', 'Goal'],
    rows: [
      [
        'Mars Reconnaissance Orbiter',
        'Orbiter',
        '**HiRISE** high-resolution images, mineral mapping, and relaying rover data',
      ],
      ['MAVEN', 'Orbiter', 'Measures how fast the upper atmosphere ==escapes to space=='],
      [
        'Perseverance',
        'Rover',
        'Explores **Jezero crater’s delta**, seeks signs of ancient life, and **caches samples**',
      ],
    ],
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each Mars mission to its main job.',
    pairs: [
      ['MRO', 'Takes HiRISE images and relays rover data'],
      ['MAVEN', 'Measures atmospheric escape'],
      ['Perseverance', 'Collects rock samples in Jezero crater'],
    ],
    explanation:
      'MRO images and relays, MAVEN studies how Mars lost its air, and Perseverance explores and samples the Jezero delta.',
  },
  {
    kind: 'summary',
    title: 'Key ideas',
    points: [
      'Venus: **runaway greenhouse**, 465 °C, 90× Earth’s pressure, and a high **D/H ratio** from lost water.',
      'Mars: **thin, cold** air, ice instead of liquid water, and a lost magnetic field.',
      'Valleys, deltas, **clays and sulfates** show ==early Mars had liquid water==.',
      'Missions: Venus Express, DAVINCI, VERITAS; MRO, MAVEN, Perseverance.',
    ],
  },
]);

export const decks: Deck[] = [habitability, light, gravity, venusMars, ...solarSystemDecksWorlds];
