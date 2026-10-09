import { buildCourse } from './lesson-course-builder.ts';

export const astronomyLessons = buildCourse({
  eventId: 'astronomy',
  eventName: 'Astronomy',
  prefix: 'astro',
  lab: 'astronomy',
  syllabus: 'Astronomy C SciConnect Syllabus 2026 - Google Docs.pdf',
  intro:
    'Build from observational evidence to stellar properties, evolution, galaxies, diagrams, and astrophysics calculations. Eight units follow the supplied Astronomy C syllabus. Synthetic diagrams and stellar models state their assumptions; current object lists and tournament permissions come from the applicable rules.',
  references: [
    {
      title: 'OpenStax Astronomy 2e',
      url: 'https://openstax.org/books/astronomy-2e/pages/1-introduction',
    },
    { title: 'NASA: Stars', url: 'https://science.nasa.gov/universe/stars/' },
  ],
  chapters: [
    {
      title: 'Event reasoning, references, and study strategy',
      description: 'Evidence-centered astronomy preparation and reproducible calculations.',
      objectives: [
        'Separate recognition from physical interpretation.',
        'Organize a reference around observables and equations.',
        'Check units and assumptions before calculations.',
      ],
      sections: [
        [
          'A scientific response',
          'Astronomy questions can ask for object recognition, a physical mechanism, a diagram interpretation, or a calculation. Identify the requested output before using a familiar equation. A colorful image does not establish a temperature without wavelength and calibration context. A name without supporting evidence can be a fragile answer when images are processed differently. State the observable first, connect it to a physical process, and then give the requested conclusion. This structure works even when the particular object is unfamiliar.',
        ],
        [
          'Organizing references',
          'Build references by concepts and observables: spectra, stellar parameters, evolution, distance methods, and galaxy structure. Keep units and assumptions beside each equation rather than in a distant formula list. An index should let a teammate find a topic quickly. For an object page, distinguish measurements, interpretations, image wavelength, and uncertainty. The supplied syllabus teaches preparation strategy; it does not establish the current season’s required object list, allowed devices, or binder rules. Verify those in the applicable event documentation.',
        ],
        [
          'Dimensional reasoning',
          'Write the dimensions of a quantity before substituting values. Luminosity is power, flux is power per area, radius and distance are lengths, and temperature is measured on an absolute scale for radiation laws. A light-year is a distance rather than a duration. Ratios to solar values can simplify calculations, but a dimensional equation still requires compatible units. If a result grows when the source moves farther away at fixed luminosity, recheck the inverse-square relation before trusting the number.',
        ],
        [
          'Independent checks',
          'Use limiting cases and scale checks. Doubling distance should reduce flux to one quarter; doubling radius at fixed temperature should increase luminosity by four. Estimate order of magnitude before calculator precision. A result with ten decimal places can be less defensible than a two-digit estimate if inputs are approximate. Reverse the calculation where possible, such as recovering the original flux from a derived luminosity and distance. Keep algebraic manipulation visible so a teammate can identify an inversion or exponent mistake.',
        ],
        [
          'Working as a team',
          'Divide recognition, data extraction, and calculation tasks while keeping a shared notation for units and symbols. One person can check whether an equation’s assumptions apply while another performs arithmetic. A useful handoff includes the observable, equation, substituted values, and unresolved assumption. If two solutions disagree, compare the starting quantities rather than only the final numbers. Confusing apparent magnitude with absolute magnitude or flux with luminosity often produces a consistent-looking calculation using the wrong input.',
        ],
        [
          'Practice that builds transfer',
          'Interleave diagram, conceptual, and numerical questions so each problem requires choosing the method. Maintain an error log distinguishing missing knowledge, wrong observable, unit conversion, algebra, and unsupported inference. Redo an unfamiliar problem after correcting the rule rather than memorizing one solution. Use images with known wavelength labels and data tables with stated units. The interactive lab lets temperature, radius, and distance vary independently as a teaching experiment; explain which combinations are plausible stars and which merely isolate one equation.',
        ],
      ],
      terms: [
        ['Luminosity', 'Total emitted power.'],
        ['Flux', 'Received power per unit area.'],
        ['Light-year', 'Distance light travels in one year.'],
        ['Dimensional analysis', 'Checking consistency of units and physical dimensions.'],
      ],
      example: {
        problem:
          'A star’s luminosity is fixed. Its distance doubles. Predict its observed flux and name an independent check.',
        steps: [
          'Use F = L/(4πd²).',
          'Replacing d by 2d multiplies the denominator by 4.',
          'The new flux is F/4; substitute it back to recover the same luminosity.',
        ],
        conclusion: 'A distance change affects apparent flux, not the star’s intrinsic luminosity.',
      },
      mcq: [
        [
          'A light-year measures…',
          'Distance',
          ['Time', 'Luminosity', 'Temperature'],
          'It is a distance unit.',
        ],
        [
          'Which quantity is intrinsic emitted power?',
          'Luminosity',
          ['Flux at Earth', 'Apparent magnitude only', 'Angular size'],
          'Luminosity belongs to the source.',
        ],
        [
          'What makes a useful handoff?',
          'Observable, equation, units, and assumptions',
          ['Only a final number', 'Only an object nickname', 'Only a screenshot color'],
          'Reproducibility requires context.',
        ],
      ],
      written: [
        [
          'Predict flux at twice the distance.',
          'One quarter of the original at fixed luminosity under inverse-square propagation.',
        ],
        [
          'Why keep assumptions beside equations?',
          'They determine whether an equation applies and prevent using a familiar formula for the wrong observable.',
        ],
        [
          'Give a limiting-case check for luminosity.',
          'At fixed temperature, doubling radius multiplies L by four under Stefan–Boltzmann scaling.',
        ],
        [
          'Design an error-log entry.',
          'Record the incorrect observable or conversion, the corrected relation, and a new worked check showing the repaired reasoning.',
        ],
      ],
      flow: [
        ['Observe', 'Identify the measured quantity and units.'],
        ['Model', 'Choose a physical relation with valid assumptions.'],
        ['Check', 'Test scale, limiting cases, and reverse substitution.'],
      ],
      compare: [
        ['Recognition', 'Names a likely object or class', 'Needs observable support.'],
        ['Calculation', 'Connects measured quantities', 'Needs units and assumptions.'],
        [
          'Reference page',
          'Organizes evidence and equations',
          'Must match applicable tournament permissions.',
        ],
      ],
      challenge:
        'Double distance while holding temperature and radius fixed. Record the flux and luminosity before and after.',
      takeaway:
        'Good astronomy answers distinguish observations, intrinsic properties, and the model connecting them.',
    },
    {
      title: 'Observational astronomy and the electromagnetic spectrum',
      description: 'Scale, wavelengths, spectra, and distance evidence.',
      objectives: [
        'Relate wavelength to physical emission processes.',
        'Distinguish angular size and physical size.',
        'Use parallax with correct angular units.',
      ],
      sections: [
        [
          'Scales and distances',
          'Astronomical systems span planets, stars, galaxies, and larger structures. An astronomical unit describes a Solar-System length scale, while parsecs and light-years are useful for larger distances. A parsec is defined through parallax geometry, not as a time. Angular size depends on physical size and distance; a small nearby object can appear larger than a much larger distant one. State whether a quantity is angular or linear before comparing sources. Images often use different fields of view and display scales.',
        ],
        [
          'Wavelength as evidence',
          'Radio, infrared, visible, ultraviolet, X-ray, and gamma-ray observations probe different emission and absorption processes. Cool dust can be prominent in infrared, while hot plasma or energetic processes can be conspicuous in X-rays. These associations are clues, not unique source classifications. A false-color image maps invisible radiation to visible colors, so blue display color does not automatically mean blue visible starlight. Read instrument bands and legends before interpreting morphology or temperature.',
        ],
        [
          'Thermal spectra',
          'An ideal blackbody’s spectrum depends on temperature. Wien’s relation gives peak wavelength approximately 2.898 × 10⁻³ m K divided by temperature. A hotter blackbody has a shorter peak wavelength and greater emitted power per area. Real stellar spectra contain absorption features and can differ from a perfect blackbody. The wavelength form of the peak differs from the frequency form, so state which representation is being used. A peak outside the visible band does not mean the star emits no visible light.',
        ],
        [
          'Spectral lines',
          'Atoms and ions absorb or emit photons at particular transition energies. Line positions can identify species and Doppler shifts; line strengths also depend on temperature, ionization, density, and abundance. The absence of a strong line does not necessarily mean the element is absent. A stellar classification therefore uses multiple spectral features and physical models. Distinguish a shifted line from a different transition by comparing a consistent set of known lines, not a single unexplained feature.',
        ],
        [
          'Parallax geometry',
          'For nearby stars with parallax p in arcseconds, distance d in parsecs is 1/p. A smaller measured parallax means a greater distance. Convert milliarcseconds to arcseconds before applying the simple relation: 50 mas is 0.050 arcsec, giving 20 pc. Small or uncertain parallaxes require careful statistical treatment; an inverse of a noisy near-zero estimate is not automatically a reliable distance. The classroom equation teaches geometry under an adequate-measurement assumption.',
        ],
        [
          'Choosing complementary observations',
          'Images show spatial structure, spectra constrain physical processes, and time series show variability. Combine them when they independently address the same hypothesis. A compact bright point might be a star, an active galactic nucleus, or an unresolved source until additional evidence is considered. Instrument resolution and sensitivity determine which structures are visible or missing. A nondetection can reflect the instrument’s limits rather than the physical absence of a component. Always connect the proposed interpretation to what the observing system could actually detect.',
        ],
      ],
      terms: [
        ['Parsec', 'Distance corresponding to one arcsecond of parallax.'],
        ['Parallax', 'Apparent angular shift from a change in observer position.'],
        ['Blackbody', 'Ideal absorber/emitter with a temperature-dependent spectrum.'],
        ['Spectral line', 'Feature associated with particular transition energies.'],
      ],
      example: {
        problem: 'A star has parallax 50 mas and approximate blackbody temperature 5800 K.',
        steps: [
          '50 mas = 0.050 arcsec, so d = 20 pc.',
          'Peak wavelength = 2.898 × 10⁻³ / 5800 ≈ 5.0 × 10⁻⁷ m.',
          'This is about 500 nm in the wavelength representation; the star still emits across a broad spectrum.',
        ],
        conclusion:
          'Distance geometry and spectral temperature are different observations connected by separate models.',
      },
      mcq: [
        ['Distance for p = 0.05 arcsec?', '20 pc', ['0.05 pc', '5 pc', '200 pc'], 'd = 1/p.'],
        [
          'Hotter blackbodies peak at…',
          'Shorter wavelength',
          ['Longer wavelength', 'The same wavelength always', 'Zero frequency'],
          'Wien’s law gives inverse scaling.',
        ],
        [
          'False-color blue necessarily means…',
          'Only the assigned display channel',
          ['Visible blue starlight', 'A known temperature', 'A nearby object'],
          'The legend defines its physical meaning.',
        ],
      ],
      written: [
        ['Convert 50 mas to arcseconds.', '0.050 arcsec.'],
        [
          'Why can line strength vary without abundance changing?',
          'Temperature, ionization, density, and excitation conditions alter absorption or emission.',
        ],
        [
          'Distinguish angular and physical size.',
          'Angular size is apparent extent on the sky; physical size requires distance and geometry.',
        ],
        [
          'What can a nondetection mean?',
          'The component may be absent, too faint, unresolved, obscured, or outside the observed wavelength sensitivity.',
        ],
      ],
      flow: [
        ['Acquire', 'Read wavelength, angular scale, and sensitivity.'],
        ['Measure', 'Use spectra, positions, and variability.'],
        ['Infer', 'Apply a model and test alternative source interpretations.'],
      ],
      compare: [
        ['Image color', 'Display coding of measured bands', 'Read the legend.'],
        ['Parallax', 'Geometric distance evidence', 'Small errors can matter greatly.'],
        ['Line strength', 'Depends on physical conditions', 'Not abundance alone.'],
      ],
      challenge:
        'Change temperature and track peak wavelength. Then change distance and explain which intrinsic spectral property should remain fixed.',
      takeaway:
        'Wavelength, geometry, and instrument limits determine what an astronomical observation can establish.',
    },
    {
      title: 'Stellar properties, fusion, and the H–R diagram',
      description: 'Temperature, radius, luminosity, spectral classes, and equilibrium.',
      objectives: [
        'Compute relative luminosity from radius and temperature.',
        'Interpret conventional H–R axes.',
        'Distinguish main-sequence stars, giants, and white dwarfs.',
      ],
      sections: [
        [
          'What supports a star',
          'A star is a self-gravitating gaseous object whose structure reflects the balance of inward gravity and outward pressure gradients. In a main-sequence star, sustained hydrogen fusion supplies energy while hydrostatic and thermal balances govern its structure. Fusion does not mean atoms simply burn chemically; nuclear changes release energy through mass-energy differences. Energy transport can involve radiation and convection. A star can evolve when its fuel distribution or structure changes even while remaining approximately hydrostatic over much of its life.',
        ],
        [
          'Temperature and spectral classification',
          'Spectral sequence O B A F G K M generally runs from hotter to cooler stellar photospheres. Line strengths depend on temperature and ionization, so classification is not merely ranking hydrogen abundance. Effective temperature summarizes the emitted power per surface area through a blackbody-equivalent relation. Observed color also depends on dust extinction and instrumentation. A reddened hot star can appear redder without having a cool photosphere, so distinguish measured color from a corrected temperature estimate.',
        ],
        [
          'Luminosity and radius',
          'The Stefan–Boltzmann relation is L = 4πR²σT⁴. Relative to solar values, L/Lsun = (R/Rsun)²(T/Tsun)⁴. A small temperature change has a strong effect because temperature is raised to the fourth power. A cool star can still be very luminous if its radius is large. Luminosity is emitted power, whereas flux depends on distance. The lab lets radius and temperature vary independently to isolate this relationship; actual stellar structures restrict which combinations occur naturally.',
        ],
        [
          'Reading the H–R diagram',
          'A conventional theoretical H–R diagram plots luminosity upward and effective temperature decreasing from left to right. Both axes commonly use logarithmic scaling. Main-sequence stars form a diagonal band; giants lie at high luminosity with relatively cool surfaces, and white dwarfs at low luminosity despite high temperatures. Position is not a physical location in space. A star moving on the diagram is changing properties, not traveling along a line through the galaxy. Check axis definitions because observational diagrams may use color and absolute magnitude instead.',
        ],
        [
          'Mass, lifetime, and limitations',
          'For main-sequence stars, higher mass generally means higher luminosity and shorter lifetime, because energy use rises faster than available fuel. A rough educational scaling L ∝ M³·⁵ and lifetime ∝ M/L can illustrate this tendency over a limited range, not every stellar mass or phase. Do not apply the main-sequence mass-luminosity relation to a red giant or white dwarf. The lab’s independently adjustable temperature and radius do not infer mass or evolutionary age without an additional stellar model.',
        ],
        [
          'Comparing stars defensibly',
          'Compare two stars by separating temperature, radius, luminosity, distance, and extinction. If they have the same temperature, luminosity ratio equals radius ratio squared. If they have the same luminosity, the hotter star must have smaller radius under the stated relation. A bright-looking star may simply be nearby. A complete response identifies the measured or supplied quantities, applies the valid relation, and states whether the classification depends on additional spectral or evolutionary evidence.',
        ],
      ],
      terms: [
        ['Hydrostatic equilibrium', 'Balance of gravity and pressure gradients.'],
        ['Effective temperature', 'Blackbody-equivalent temperature for emitted flux.'],
        ['Main sequence', 'Phase of sustained core hydrogen fusion.'],
        [
          'H–R diagram',
          'Diagram relating stellar luminosity and temperature or observational equivalents.',
        ],
      ],
      example: {
        problem: 'A star has radius 2 Rsun and temperature 2 Tsun. Calculate L/Lsun.',
        steps: [
          'Radius factor is 2² = 4.',
          'Temperature factor is 2⁴ = 16.',
          'Multiply to obtain 64; do not add the factors.',
        ],
        conclusion: 'Its idealized luminosity is 64 Lsun, independent of distance.',
      },
      mcq: [
        [
          'Conventional H–R temperature increases toward…',
          'The left',
          ['The right', 'The top only', 'The bottom only'],
          'Temperature decreases left to right.',
        ],
        [
          'A cool very luminous star generally needs…',
          'A large radius',
          ['A zero radius', 'No energy source', 'A smaller distance necessarily'],
          'L scales with R²T⁴.',
        ],
        [
          'At fixed radius, doubling T multiplies L by…',
          '16',
          ['2', '4', '8'],
          'The temperature dependence is fourth power.',
        ],
      ],
      written: [
        ['Compute the example luminosity.', '2² × 2⁴ = 64 Lsun.'],
        [
          'Why can a white dwarf be hot but faint?',
          'Its small radius limits total emitting area despite high surface temperature.',
        ],
        [
          'Why not apply main-sequence mass-luminosity scaling to a giant?',
          'Its structure and energy generation differ; the approximate relation is phase-dependent.',
        ],
        [
          'Distinguish an H–R track from motion through space.',
          'The track records changing stellar properties over time, not physical coordinates in the galaxy.',
        ],
      ],
      flow: [
        ['Structure', 'Gravity, pressure, fusion, and transport interact.'],
        ['Properties', 'Temperature and radius determine luminosity.'],
        ['Diagram', 'Locate the star on defined logarithmic axes.'],
      ],
      compare: [
        ['Main sequence', 'Core hydrogen fusion', 'Mass-luminosity scaling is approximate.'],
        ['Giant', 'Large radius and high luminosity', 'Can have a cool photosphere.'],
        ['White dwarf', 'Small radius and low luminosity', 'Can have a hot photosphere.'],
      ],
      challenge:
        'Compare a giant preset and a white-dwarf preset on the H–R plot. Explain the radius effect without using apparent brightness.',
      takeaway:
        'Temperature, area, and distance play different roles; H–R position describes intrinsic properties.',
    },
    {
      title: 'Cloud collapse and mass-dependent stellar evolution',
      description: 'Protostars, main sequence, giant phases, and population ages.',
      objectives: [
        'Explain gravitational heating before fusion.',
        'Trace low/intermediate- and high-mass pathways.',
        'Interpret a cluster turnoff with assumptions.',
      ],
      sections: [
        [
          'From molecular cloud to protostar',
          'Cold dense regions of molecular clouds can collapse when gravity overcomes supporting motions, pressure, and other effects. Compression converts gravitational energy into heat, and a protostar can radiate before sustained core hydrogen fusion begins. Rotation can produce a disk, while outflows redistribute mass and angular momentum. A bright young source is not necessarily already on the main sequence. Dust obscures visible light and reradiates energy, so infrared observations are especially useful for some embedded stages.',
        ],
        [
          'Entering the main sequence',
          'Sustained core hydrogen fusion marks the main-sequence phase in the standard evolutionary framework. The star’s initial mass strongly influences core conditions, luminosity, and fuel consumption. Higher mass supplies more fuel but usually increases luminosity even more strongly, shortening the main-sequence lifetime. A star does not spend its life moving steadily up the main sequence from low mass to high mass. Different positions along the sequence largely represent different masses at a given evolutionary stage.',
        ],
        [
          'After core hydrogen exhaustion',
          'When core hydrogen is depleted, the core and surrounding layers readjust. Shell burning and envelope expansion can produce a giant phase. A star can cool at its photosphere while total luminosity rises because its radius increases greatly. Track the site of fusion rather than saying the entire star “runs out of fuel” at once. Core composition, degeneracy, mass loss, and later burning stages determine the next evolution. A schematic track simplifies complex transitions and should not be read as a universally timed sequence.',
        ],
        [
          'Low- and intermediate-mass outcomes',
          'Stars in a broad low/intermediate initial-mass range can shed outer layers and leave a white dwarf rather than undergo ordinary core-collapse supernova. A planetary nebula is ionized ejected material around a hot remnant, unrelated to forming planets despite the historical name. The final white-dwarf mass differs from the initial stellar mass because much material is lost. Details depend on composition, mass loss, and binary interaction. Avoid assigning an exact initial-mass boundary without the model or problem specifying it.',
        ],
        [
          'High-mass pathways',
          'More massive stars can reach advanced burning stages, building increasingly heavy core products until further evolution can lead to core collapse. Their structure may contain different burning shells at once. Mass loss and binary interaction can substantially alter the path and final explosion appearance. The simple low-versus-high-mass branching diagram teaches the dominant role of initial mass, but it is not a complete prediction for every observed source. Use spectra, luminosity, environment, and variability as additional evidence.',
        ],
        [
          'Cluster turnoff as an age clue',
          'In a coeval cluster, the most massive stars leave the main sequence first. The turnoff location can therefore constrain age through stellar models. A younger cluster can retain hotter, more massive main-sequence stars; an older cluster has a cooler, lower-mass turnoff. This reasoning assumes an approximately shared formation epoch and accounts for distance, extinction, metallicity, binaries, and completeness. The turnoff is not the faintest observed star or simply the brightest point on a diagram.',
        ],
      ],
      terms: [
        ['Protostar', 'Contracting young stellar object before sustained core hydrogen fusion.'],
        ['Shell burning', 'Fusion in a layer surrounding a core.'],
        ['Planetary nebula', 'Ionized ejected stellar envelope around a hot remnant.'],
        ['Turnoff', 'Location where a population departs from the main sequence.'],
      ],
      example: {
        problem:
          'A toy main-sequence model uses L ∝ M³·⁵ and lifetime ∝ M/L. Compare a 2 Msun star with the Sun.',
        steps: [
          'L/Lsun ≈ 2³·⁵ ≈ 11.3.',
          'Lifetime ratio ≈ 2/11.3 ≈ 0.177.',
          'The more massive star has more fuel but consumes it much faster in this approximate model.',
        ],
        conclusion:
          'The toy lifetime is about 18% of solar main-sequence lifetime; the scaling is not universal.',
      },
      mcq: [
        [
          'What can power a protostar before sustained fusion?',
          'Gravitational contraction',
          ['Chemical oxygen combustion', 'A planetary nebula necessarily', 'No energy source'],
          'Contraction releases gravitational energy.',
        ],
        [
          'A giant can cool at the surface while brightening because…',
          'Its radius increases strongly',
          ['Distance must decrease', 'Temperature has no effect', 'Its area becomes zero'],
          'Area can outweigh lower surface flux.',
        ],
        [
          'A cluster turnoff is primarily an age clue because…',
          'Massive stars evolve off the main sequence sooner',
          [
            'All stars have identical masses',
            'Faint stars always form last',
            'Every cluster is dust-free',
          ],
          'Lifetime depends strongly on mass.',
        ],
      ],
      written: [
        ['Compute the toy lifetime ratio for 2 Msun.', '2/2³·⁵ = 2⁻²·⁵ ≈ 0.177.'],
        [
          'Why is “all fuel is gone” misleading after core hydrogen exhaustion?',
          'Hydrogen may remain in outer layers and shell burning or other fusion stages can continue.',
        ],
        [
          'What does planetary nebula not imply?',
          'It does not mean the nebula formed from planets; the term is historical.',
        ],
        [
          'Name two turnoff assumptions or corrections.',
          'Approximate coeval formation plus stellar-model dependence; distance, extinction, metallicity, binaries, and completeness also matter.',
        ],
      ],
      flow: [
        ['Collapse', 'Gravity heats a protostar and builds structure.'],
        ['Main sequence', 'Core hydrogen fusion sustains a mass-dependent lifetime.'],
        ['Branch', 'Core changes and mass loss lead to different outcomes.'],
      ],
      compare: [
        ['Protostar', 'Radiates contraction energy', 'Not necessarily core-H fusion yet.'],
        [
          'Giant phase',
          'Expanded envelope and changed burning structure',
          'Surface cooling can accompany higher luminosity.',
        ],
        [
          'Cluster turnoff',
          'Population evolution marker',
          'Requires model and population assumptions.',
        ],
      ],
      challenge:
        'Move from the main-sequence preset to a giant preset. Describe the H–R direction and why the path is not a literal spatial journey.',
      takeaway:
        'Initial mass, internal fuel distribution, and structural changes govern evolutionary pathways.',
    },
    {
      title: 'Supernovae, white dwarfs, neutron stars, and black holes',
      description: 'Explosion mechanisms, compact remnants, and evidence.',
      objectives: [
        'Separate thermonuclear and core-collapse supernovae.',
        'Explain compact-remnant support qualitatively.',
        'Distinguish an event horizon from a material surface.',
      ],
      sections: [
        [
          'Core collapse',
          'In an evolved massive star, an unstable core can collapse when pressure support can no longer maintain equilibrium. The explosion involves complex gravitational, nuclear, neutrino, and hydrodynamic processes. It is not simply the entire star burning hydrogen explosively. Depending on core properties and evolution, the remnant can be a neutron star or black hole, with some collapses producing weak or unusual visible events. Observed supernova classification describes spectral and light-curve features that must be connected carefully to a physical progenitor model.',
        ],
        [
          'White dwarfs and degeneracy',
          'A white dwarf is a compact remnant supported largely by electron degeneracy pressure rather than ongoing ordinary core fusion. It can cool and fade over time. Its mass-radius behavior differs from a normal gas star; adding mass does not simply inflate it. A limiting mass near 1.4 solar masses is an important idealized scale for a nonrotating electron-degenerate carbon-oxygen configuration, but composition and model assumptions matter. This is a remnant mass, not the initial mass of every star that forms one.',
        ],
        [
          'Thermonuclear Type Ia events',
          'Type Ia supernovae are associated with thermonuclear disruption of a white dwarf in a binary-related evolutionary channel. Accretion and mergers are important classes of proposed pathways. They differ from core-collapse explosions even though both can become extremely luminous. Type Ia light curves can be standardized for distance studies using calibrated relations; they are not perfectly identical lamps without correction. Distinguish a standardized luminosity inference from directly measuring distance or assuming every supernova subtype shares one luminosity.',
        ],
        [
          'Neutron stars and pulsars',
          'A neutron star is an extremely dense compact remnant whose support involves dense nuclear matter and quantum effects. A pulsar is observed through periodic emission associated with rotation and magnetic geometry; not every neutron star is observed as a pulsar from Earth. Timing provides precise evidence for rotation and can reveal binary motion or energy loss. A short pulse period does not mean the whole star expands and contracts at that rate. Interpret the lighthouse analogy as a viewing-geometry model, not a literal beam from a solid lamp.',
        ],
        [
          'Black holes and accretion',
          'An event horizon is a causal boundary beyond which outward light cannot reach distant observers in the simple black-hole model. It is not an ordinary material surface. For a nonrotating uncharged black hole, Schwarzschild radius is 2GM/c², approximately 3 km per solar mass. Radiation from nearby accreting material can be observed even though light from inside the horizon cannot escape. Evidence for a black hole combines dynamics, compactness, accretion behavior, or other measurements rather than merely finding a dark patch in an image.',
        ],
        [
          'Connecting observations to mechanisms',
          'Use spectra, light-curve evolution, host environment, remnant emission, and dynamics together. A hydrogen-poor spectrum can constrain outer-envelope composition but does not by itself settle every explosion mechanism. A compact X-ray source may have alternatives requiring further evidence. State whether a supplied number is a directly measured quantity or model-derived mass, radius, or distance. The stellar-property lab illustrates emitting area and temperature; it deliberately does not model event horizons, relativistic accretion, or explosion light curves.',
        ],
      ],
      terms: [
        ['Degeneracy pressure', 'Quantum support associated with densely packed fermions.'],
        ['Type Ia', 'Thermonuclear white-dwarf supernova class.'],
        ['Pulsar', 'Rotating neutron-star source observed with periodic emission.'],
        ['Event horizon', 'Causal boundary limiting escape to distant observers.'],
      ],
      example: {
        problem:
          'Use 3 km per solar mass as a rounded Schwarzschild-radius scale for a 10 Msun nonrotating black hole.',
        steps: [
          'Apply Rs ≈ 3 × (M/Msun) km.',
          'For 10 Msun, Rs ≈ 30 km.',
          'State that this is a horizon scale under the simple model, not a luminous material surface.',
        ],
        conclusion: 'The horizon radius is about 30 km in the stated approximation.',
      },
      mcq: [
        [
          'Type Ia events are primarily…',
          'Thermonuclear white-dwarf explosions',
          ['Ordinary hydrogen-core fusion', 'Planet formation events', 'All neutron-star pulses'],
          'Their mechanism differs from core collapse.',
        ],
        [
          'A pulsar’s ordinary pulse period chiefly tracks…',
          'Rotation and viewing geometry',
          ['The age of the galaxy', 'The speed of light changing', 'Whole-star breathing'],
          'A rotating emission pattern can sweep past the observer.',
        ],
        [
          'A black-hole horizon is…',
          'A causal boundary',
          [
            'A normal rocky surface',
            'A visible shell of gas necessarily',
            'The edge of every accretion disk',
          ],
          'It limits outward causal escape in the model.',
        ],
      ],
      written: [
        [
          'Calculate Rs for 10 Msun.',
          'Approximately 30 km using the stated 3 km/Msun approximation.',
        ],
        [
          'Why can material around a black hole shine?',
          'Accretion outside the horizon can convert energy into radiation that escapes before crossing it.',
        ],
        [
          'Why is a white dwarf not powered like a main-sequence star?',
          'It is primarily a cooling compact remnant supported by degeneracy, not sustained core hydrogen fusion.',
        ],
        [
          'Why must Type Ia luminosities be standardized?',
          'Observed events vary; calibrated light-curve relationships and corrections support distance inference rather than assuming exact identical luminosity.',
        ],
      ],
      flow: [
        ['Progenitor', 'Identify mass history and binary context.'],
        ['Mechanism', 'Distinguish thermonuclear disruption from collapse.'],
        ['Evidence', 'Use spectra, timing, dynamics, and remnants.'],
      ],
      compare: [
        [
          'White dwarf',
          'Electron-degenerate remnant',
          'Can participate in thermonuclear channels.',
        ],
        ['Neutron star', 'Dense compact remnant', 'Pulses depend on emission and geometry.'],
        [
          'Black hole',
          'Horizon-bearing compact object',
          'Observed radiation comes from outside the horizon.',
        ],
      ],
      challenge:
        'Compare a tiny hot-emitter preset with a giant. Explain why an area-temperature model is insufficient to identify a black hole.',
      takeaway:
        'Explosion classes and compact objects require physical mechanisms and multiple observables, not brightness alone.',
    },
    {
      title: 'Galaxies, stellar populations, and the interstellar medium',
      description: 'Morphology, structure, gas, dust, and nebulae.',
      objectives: [
        'Compare galaxy morphologies without treating them as a simple age sequence.',
        'Distinguish stellar populations and ISM phases.',
        'Interpret nebular emission and dust effects.',
      ],
      sections: [
        [
          'Galaxy morphology',
          'Spiral galaxies commonly have disks, spiral structure, and central bulges; ellipticals have smoother distributions; irregular systems lack a simple regular morphology. Bars and interactions add further structure. These categories describe appearance rather than a universal chronological path from one type to another. Viewing angle can conceal a disk or change apparent shape. Wavelength choice also changes which components dominate. A classification should cite observed structure and acknowledge projection rather than infer a complete evolutionary history from one image.',
        ],
        [
          'Disk, bulge, and halo',
          'A galaxy can contain populations with different ages, chemical abundances, and motions. Young luminous stars can trace active star-forming regions in disks, while older populations can dominate other components. Halo stars and globular clusters offer evidence about different formation histories. “Metallicity” in astronomy refers broadly to elements heavier than helium, not only ordinary metallic solids. Population labels summarize distributions and should not be treated as exact ages or compositions for every star in a region.',
        ],
        [
          'Gas and molecular clouds',
          'The interstellar medium contains gas and dust across a range of densities and temperatures. Cold molecular clouds can host star formation, while ionized and hot phases trace other processes. Different wavelengths reveal different phases: optical lines can trace ionized gas, radio transitions can trace some atomic or molecular material, and infrared can reveal dust emission. A dark visible patch may be obscuring material rather than an absence of matter. The selected tracer determines which component is observable.',
        ],
        [
          'Emission, reflection, and dark nebulae',
          'An emission nebula produces line radiation from excited or ionized gas; a reflection nebula scatters light from nearby sources; a dark nebula blocks background light at the observed wavelengths. These mechanisms can coexist within one region. Color in a processed image may represent selected emission lines rather than ordinary visual appearance. Identify the wavelength and source of illumination before naming the mechanism. A molecular cloud need not be bright in visible light to contain substantial mass or active embedded star formation.',
        ],
        [
          'Dust extinction and reddening',
          'Dust reduces and redistributes light through absorption and scattering. In many optical conditions shorter wavelengths are attenuated more strongly, causing reddening. This can make a hot star appear cooler by color and can dim a galaxy’s apparent flux. Correcting for extinction requires a model and suitable data, not simply increasing screen brightness. Dust also emits in infrared after absorbing energy, connecting missing optical light to another observable. Distinguish foreground extinction from intrinsic source temperature or population differences.',
        ],
        [
          'Reading a multiwavelength region',
          'Compare images at known wavelengths with matched scales and orientation. A visible stellar disk, infrared dust features, and X-ray hot gas can trace complementary components rather than contradict each other. Differences in resolution and sensitivity can create apparent offsets or nondetections. Use each image to make a specific evidence statement and then combine them into a physical explanation. The H–R lab applies to individual idealized stars; a galaxy’s integrated spectrum combines many stars, dust, and gas and cannot be interpreted as one stellar photosphere.',
        ],
      ],
      terms: [
        ['ISM', 'Interstellar gas and dust.'],
        ['Metallicity', 'Abundance of elements heavier than helium.'],
        ['Extinction', 'Attenuation of light along a path.'],
        ['Reflection nebula', 'Dusty region visible through scattered source light.'],
      ],
      example: {
        problem:
          'A region is dark in visible light but bright in infrared and contains embedded young sources. Explain without declaring it empty.',
        steps: [
          'Visible darkness can result from dust obscuring background or embedded light.',
          'Absorbed energy can be reradiated by dust in infrared.',
          'Combine the wavelength evidence with molecular and stellar observations before estimating structure or mass.',
        ],
        conclusion:
          'The observations are consistent with a dusty region, not an absence of material.',
      },
      mcq: [
        [
          'Astronomical metals are…',
          'Elements heavier than helium',
          ['Only iron and nickel', 'All solids only', 'Only charged atoms'],
          'The term has a broad astronomical definition.',
        ],
        [
          'A reflection nebula is seen primarily through…',
          'Scattered light',
          ['Only nuclear fusion in every dust grain', 'A mandatory supernova', 'No illumination'],
          'Nearby source light is redirected.',
        ],
        [
          'Galaxy morphology is necessarily a simple age sequence?',
          'No',
          ['Yes', 'Only for face-on images', 'Only at visible wavelengths'],
          'Appearance alone does not define a universal evolutionary order.',
        ],
      ],
      written: [
        [
          'Why can optical darkness indicate matter?',
          'Dust can absorb and scatter background light, creating a dark region despite substantial material.',
        ],
        [
          'Distinguish emission and reflection nebulae.',
          'Emission produces radiation from excited gas; reflection redirects radiation from another source.',
        ],
        [
          'Why not model a galaxy as one star?',
          'Integrated light combines many stellar temperatures, evolutionary stages, gas, and dust with differing attenuation and emission.',
        ],
        [
          'What should be matched across wavelength images?',
          'Scale, orientation, registration, and awareness of resolution, sensitivity, and acquisition differences.',
        ],
      ],
      flow: [
        ['Components', 'Identify stars, gas, and dust.'],
        ['Wavelengths', 'Choose tracers for each physical phase.'],
        ['Synthesis', 'Combine compatible observations with projection and extinction limits.'],
      ],
      compare: [
        ['Emission nebula', 'Radiation from excited gas', 'Line color can be display-coded.'],
        ['Reflection nebula', 'Scattered source light', 'Needs illumination geometry.'],
        ['Dark nebula', 'Obscures background light', 'Not necessarily empty.'],
      ],
      challenge:
        'Compare hot- and cool-star presets as components of a population. Explain why their combined light is not represented by averaging temperatures.',
      takeaway:
        'Multiwavelength astronomy reveals different components of a coupled stellar, gas, and dust system.',
    },
    {
      title: 'Advanced graph and image interpretation',
      description:
        'Logarithmic axes, populations, selection effects, and wavelength identification.',
      objectives: [
        'Read logarithmic stellar diagrams.',
        'Distinguish evolutionary tracks and population distributions.',
        'Recognize observation and selection limits.',
      ],
      sections: [
        [
          'Axes before patterns',
          'Read every axis label, unit, direction, and scale before describing a graph. H–R temperature commonly decreases to the right, luminosity increases upward, and an absolute-magnitude axis increases numerically toward fainter objects. A logarithmic interval represents a multiplicative factor rather than an additive difference. Equal spacing from 1 to 10 and 10 to 100 does not imply equal absolute change. A point’s position must be interpreted through the actual labels rather than a memorized picture.',
        ],
        [
          'Radius on the H–R diagram',
          'At fixed luminosity, R ∝ T⁻² from Stefan–Boltzmann scaling. Therefore a cooler star at the same luminosity has a larger radius. At fixed temperature, a more luminous star has a larger emitting area. Lines of constant radius can help organize the diagram, but inferred radius assumes the effective-temperature and luminosity model applies. Do not read radius directly from an unlabeled horizontal distance or confuse a large symbol used for plotting with a measured stellar size.',
        ],
        [
          'Tracks, isochrones, and populations',
          'An evolutionary track follows one modeled star through changing properties; an isochrone connects modeled stars of the same age with different masses. An observed cluster diagram is a distribution of measurements, affected by binaries, extinction, distance, and completeness. A main-sequence turnoff is a population feature, not a path every individual star follows in the same direction. Interpret a model overlay by identifying its parameters and comparing multiple parts of the observed distribution rather than one coincident point.',
        ],
        [
          'Selection effects',
          'A flux-limited survey overrepresents intrinsically luminous sources at large distances because faint sources fall below detection. A nearby volume-limited sample can show a different population mix. Missing faint white dwarfs or low-mass stars can reflect sensitivity rather than physical absence. Unresolved binaries can appear brighter than a single component, shifting their diagram location. A trend in an observed plot can combine astrophysics and selection. State the sample definition before extrapolating frequencies to all stars.',
        ],
        [
          'Reading images by wavelength',
          'Image colors may map selected filters or emission lines to display channels. Use the caption, filter names, and physical morphology together. Infrared brightness can trace cool dust or stars depending on wavelength and context; X-ray brightness can trace hot gas or compact energetic sources. “Blue means hot” is not a universal rule for processed images. A convincing wavelength identification cites the stated or inferred tracer and notes ambiguity rather than treating aesthetic color as a calibrated temperature measurement.',
        ],
        [
          'Writing a graph-based argument',
          'Quote the relevant coordinates or intervals, describe the relationship, apply a physical explanation, and identify a limitation. For example, two stars at equal temperature with luminosities differing by 100 have radii differing by 10 under the standard model. If the input is apparent flux instead of luminosity, distance must also be known. The interactive plot uses fixed log axes so changing a control produces a meaningful comparison; its schematic reference populations are teaching guides, not a measured survey.',
        ],
      ],
      terms: [
        ['Logarithmic axis', 'Axis whose equal intervals represent equal ratios.'],
        ['Isochrone', 'Modeled locus of equal-age stars with differing masses.'],
        ['Flux-limited sample', 'Sample restricted by received brightness threshold.'],
        ['Selection effect', 'Pattern introduced by how observations enter a sample.'],
      ],
      example: {
        problem:
          'Two stars have equal effective temperature but luminosities 1 and 100 Lsun. Compare radii.',
        steps: [
          'At fixed T, L ∝ R².',
          'R2/R1 = sqrt(100/1) = 10.',
          'Equal apparent brightness would not support this conclusion without distance information.',
        ],
        conclusion: 'The more luminous star has ten times the radius under the stated model.',
      },
      mcq: [
        [
          'On a log scale, 1→10 and 10→100 represent…',
          'The same multiplicative factor',
          ['The same absolute difference', 'A reversed axis necessarily', 'No measurable change'],
          'Both are factors of ten.',
        ],
        [
          'An isochrone describes…',
          'Equal age across modeled masses',
          ['One star’s spatial orbit', 'Only equal radii', 'A single observed pulse'],
          'It is a population-model locus.',
        ],
        [
          'A flux-limited distant sample favors…',
          'Intrinsically luminous detectable objects',
          ['Every star equally', 'Only the lowest-mass stars', 'No selection effect'],
          'Faint sources can fall below threshold.',
        ],
      ],
      written: [
        [
          'Calculate the radius ratio in the example.',
          'sqrt(100) = 10 at equal effective temperature.',
        ],
        [
          'Why can a binary lie above a single-star sequence?',
          'Combined unresolved light can be brighter than either component alone.',
        ],
        [
          'What makes “blue means hot” unsafe for images?',
          'False-color assignments and selected filters can give blue display colors unrelated to visible stellar temperature.',
        ],
        [
          'What must precede a population-frequency claim?',
          'The sample selection, sensitivity/completeness, distance support, and measurement definitions must be understood.',
        ],
      ],
      flow: [
        ['Read', 'Inspect units, directions, log scales, and sample definition.'],
        ['Compare', 'Extract ratios or model loci correctly.'],
        ['Explain', 'Connect to physics and selection limits.'],
      ],
      compare: [
        ['Track', 'One star’s modeled evolution', 'Not a sky trajectory.'],
        ['Isochrone', 'Equal-age modeled population', 'Depends on model parameters.'],
        [
          'Observed distribution',
          'Measured selected sample',
          'Includes errors and selection effects.',
        ],
      ],
      challenge:
        'Change radius by a factor of ten at fixed temperature. Locate the factor-of-100 luminosity shift on the logarithmic plot.',
      takeaway:
        'Graph interpretation combines axis literacy, physical scaling, and knowledge of the selected sample.',
    },
    {
      title: 'Astrophysics equations and quantitative synthesis',
      description: 'Inverse square, magnitudes, distance modulus, parallax, and radiation laws.',
      objectives: [
        'Choose between intrinsic and apparent quantities.',
        'Solve magnitude and distance relations.',
        'Check a multistep calculation with units and scaling.',
      ],
      sections: [
        [
          'Inverse-square flux',
          'For isotropic emission without attenuation, F = L/(4πd²). Doubling distance reduces flux by four, while doubling luminosity doubles flux. If extinction is present, received flux is additionally reduced and the simple inference needs correction. The distance is source-to-observer distance, not the stellar radius. Keep watts, metres, and watts per square metre consistent in dimensional calculations, or use explicitly defined ratios. Rearranging gives L = 4πd²F, showing why distance uncertainty can strongly affect inferred luminosity.',
        ],
        [
          'Magnitude differences',
          'Magnitude is a logarithmic brightness scale: m2 − m1 = −2.5 log10(F2/F1). Smaller magnitudes correspond to greater flux. A difference of five magnitudes corresponds to a factor of 100 in flux. If source 2 is ten times brighter, its magnitude is 2.5 lower. Do not add magnitudes directly to combine fluxes. Convert each magnitude to a relative flux, sum those fluxes, and convert back using the same reference.',
        ],
        [
          'Distance modulus',
          'Without extinction, m − M = 5 log10(d/10 pc). Apparent magnitude m describes observed brightness; absolute magnitude M describes the brightness the source would have at 10 pc in the specified band. Rearranging gives d = 10 × 10^((m−M)/5) pc. If extinction A is included, m − M = 5 log10(d/10 pc) + A in that band. A larger apparent magnitude can reflect distance, intrinsic faintness, or extinction, so isolate the supplied quantities carefully.',
        ],
        [
          'Radiation-law ratios',
          'Relative Stefan–Boltzmann scaling L/Lsun = (R/Rsun)²(T/Tsun)⁴ avoids repeatedly substituting physical constants. Wien’s wavelength peak is inversely proportional to temperature. Both relations refer to an idealized thermal description; stellar atmospheres and line spectra supply additional information. A fitted temperature and luminosity can imply a radius, but uncertainty and dust corrections affect the inference. Do not combine a temperature from one component with total luminosity from an unresolved binary as though they describe a single star.',
        ],
        [
          'Motion and gravity',
          'For small nonrelativistic line-of-sight Doppler shifts, delta wavelength / rest wavelength ≈ radial velocity / c. Positive wavelength shifts indicate recession under the usual sign convention. Larger speeds require a relativistic treatment. Kepler’s orbital relation can connect period, separation, and total mass when the orbit and units are appropriate; a projected separation alone is not automatically the orbital semimajor axis. Name assumptions before substituting numbers so a simplified equation is not applied outside its regime.',
        ],
        [
          'A multistep solution',
          'Begin by listing given values with units and requested output. Choose a relation for each transition, preserve guard digits during arithmetic, and round at the end to a defensible precision. Check whether a magnitude difference has the correct sign and whether a distance change produces the expected flux ratio. Distinguish exact definitions from approximate constants and empirical calibrations. A final sentence should state both the numerical result and the assumptions, making clear which conclusions would change if extinction, anisotropy, or unresolved components were present.',
        ],
      ],
      terms: [
        ['Apparent magnitude', 'Logarithmic received brightness in a defined band.'],
        ['Absolute magnitude', 'Magnitude at a standardized 10 pc distance.'],
        ['Distance modulus', 'Difference between apparent and absolute magnitude.'],
        ['Radial velocity', 'Line-of-sight motion inferred from suitable Doppler evidence.'],
      ],
      example: {
        problem:
          'A source has m = 10 and M = 5, with negligible extinction. Find distance and compare its flux with the same source at 10 pc.',
        steps: [
          'Distance modulus is 5.',
          'd = 10 × 10^(5/5) = 100 pc.',
          'At ten times the distance, flux is one hundredth of its 10 pc value.',
        ],
        conclusion: 'The distance is 100 pc, consistent with a five-magnitude dimming.',
      },
      mcq: [
        [
          'Five magnitudes fainter means flux is…',
          '100 times smaller',
          ['5 times smaller', '100 times larger', 'Unchanged'],
          'The magnitude scale is logarithmic.',
        ],
        ['At 10 pc with no extinction, m − M equals…', '0', ['5', '10', '−5'], 'log10(1) = 0.'],
        [
          'A positive small wavelength shift conventionally indicates…',
          'Recession',
          ['Approach', 'A smaller radius necessarily', 'A lower mass necessarily'],
          'Longer observed wavelength is redshift.',
        ],
      ],
      written: [
        ['Solve the example distance modulus.', 'd = 10 × 10^((10−5)/5) = 100 pc.'],
        [
          'Why not add magnitudes to combine stars?',
          'Magnitudes are logarithmic; add linear fluxes, then convert the total back to magnitude.',
        ],
        [
          'What assumption does F = L/(4πd²) use?',
          'Isotropic propagation without attenuation in the stated simple model.',
        ],
        [
          'How does neglected positive extinction bias a distance-modulus estimate?',
          'Treating extinction dimming as distance dimming makes the inferred distance too large for fixed absolute magnitude.',
        ],
      ],
      flow: [
        ['Define', 'Separate luminosity, flux, magnitudes, and distance.'],
        ['Solve', 'Use compatible equations with explicit assumptions.'],
        ['Check', 'Verify signs, units, scaling, and uncertainty.'],
      ],
      compare: [
        ['Flux', 'Received power per area', 'Depends on distance and attenuation.'],
        ['Luminosity', 'Intrinsic emitted power', 'Not directly apparent brightness.'],
        [
          'Magnitude',
          'Logarithmic brightness representation',
          'Add fluxes rather than magnitudes.',
        ],
      ],
      challenge:
        'Record a star at distances 10, 100, and 1000 pc. Predict the successive flux factors and magnitude offsets before changing controls.',
      takeaway:
        'Equations form a chain only when the quantities, units, and assumptions at each link are compatible.',
    },
  ],
});
