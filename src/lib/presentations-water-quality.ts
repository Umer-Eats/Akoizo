import { defineDeck, type Deck } from './presentation-types.ts';
import { waterQualityDecksReefs } from './presentations-water-quality-2.ts';

// Water Quality (Division C) presentations, one per lesson, following presentations-anatomy.ts.
// Each deck follows its lesson in lessons-water.ts section by section (`section` is the lesson
// section index); lessons 6–9 are in presentations-water-quality-2.ts.

const cycles = defineDeck('water-u1-l1', [
  {
    kind: 'title',
    title: 'Water properties and interacting cycles',
    subtitle: 'Water, carbon, oxygen, nitrogen and phosphorus move through connected stores.',
    objectives: [
      'Trace water and element fluxes between stores.',
      'Distinguish storage from movement.',
      'Connect stratification to the physical properties of water.',
    ],
    image: 'wq-water-cycle',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which water store do you think holds water the longest on average?',
    options: ['A river', 'The atmosphere', 'The deep ocean', 'A soil layer'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Why water behaves the way it does',
    image: 'wq-hbonds',
    bullets: [
      'Water is **polar**: the oxygen end is slightly negative and the hydrogen ends slightly positive.',
      '**Hydrogen bonds** between molecules explain cohesion, a relatively high heat capacity, and solvent behavior.',
      'Ice is ==less dense than liquid fresh water near freezing==, so lakes freeze from the top down.',
      'Dissolved salts change density and lower the freezing point.',
    ],
    callout:
      'Solubility depends on the substance, temperature, pressure and chemistry; suspended particles are **not** dissolved.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A water sample looks cloudy after shaking soil into it. What is the best description?',
    options: [
      'The soil has fully dissolved because water dissolves everything',
      'Fine particles are suspended, which is not the same as dissolved',
      'The water has become saline',
      'The particles have changed the water into ice',
    ],
    answer: 1,
    explanation:
      'Cloudiness from soil is suspended material that scatters light. Water is a good solvent, but it does not dissolve every substance, and suspension is not solution.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'The water budget',
    image: 'wq-water-cycle',
    caption:
      'Water moves among **stores** (ocean, ice, groundwater, lakes, atmosphere) by **fluxes** such as precipitation, evaporation and runoff.',
    bullets: [
      'Budget: ==change in storage = inputs − outputs== for a defined region and interval.',
      'Water can leave a watershed through pipes or groundwater, not only channels.',
      'Keep **volume**, **flux per time**, and **residence time** separate.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Is each quantity a store or a flux?',
    bins: ['Store (amount)', 'Flux (amount per time)'],
    items: [
      ['Volume of water in a lake', 0],
      ['Evaporation from the lake surface each day', 1],
      ['Groundwater held in an aquifer', 0],
      ['River discharge into the bay', 1],
      ['Snow held in a mountain snowpack', 0],
      ['Transpiration from forest leaves per hour', 1],
    ],
    explanation:
      'Stores are amounts at a moment; fluxes are transfers per unit time. Residence time is storage divided by a flux.',
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: a bay’s budget',
    problem:
      'A bay receives 8 units/day and loses 6 units/day. Find the storage change over three days.',
    steps: [
      'Net input is **8 − 6 = 2 units/day**.',
      'Multiply by the interval: 2 units/day × 3 days.',
      'Storage increases by **6 units** if the fluxes stay constant.',
    ],
    conclusion: 'A budget only works with a ==defined boundary and time interval==.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A pond receives 12 m³/day and loses 15 m³/day. What is the change in storage over 4 days, in m³? (Use a negative number for a loss.)',
    answer: -12,
    tolerance: 0,
    unit: 'm³',
    explanation: 'Net flux is 12 − 15 = −3 m³/day; over 4 days storage changes by −12 m³.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Carbon and oxygen move together',
    image: 'wq-carbon-cycle',
    caption:
      'Carbon moves between the atmosphere, land, ocean and rocks; in water, **photosynthesis** and **respiration** drive daily oxygen swings.',
    bullets: [
      'Photosynthesis fixes inorganic carbon and can ==release oxygen== in daylight.',
      'Respiration and decomposition **consume oxygen** and return carbon.',
      'A noon oxygen reading can differ sharply from a **predawn** one.',
      '**Carbonate chemistry** links dissolved carbon, pH and alkalinity.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'When is dissolved oxygen in a productive pond usually lowest?',
    options: ['Early afternoon', 'Just before dawn', 'Midday on a sunny day', 'It never changes'],
    answer: 1,
    explanation:
      'Respiration continues all night with no photosynthesis to replace oxygen, so the minimum usually comes just before dawn.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Nitrogen changes form',
    image: 'wq-nitrogen-cycle',
    caption:
      'Microbes move nitrogen among forms: **fixation**, **assimilation**, **mineralization** (ammonification), **nitrification** and **denitrification**.',
    bullets: [
      'Nitrification needs oxygen; ==denitrification happens where oxygen is low==.',
      '**Phosphorus** has no major gas phase; it cycles through dissolved, particulate and sediment forms.',
      'The **limiting nutrient** depends on the ecosystem and season.',
      'More nutrients do not automatically mean healthier water.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each nitrogen process to what it does.',
    pairs: [
      ['Fixation', 'N₂ gas converted to ammonia'],
      ['Nitrification', 'Ammonium oxidized to nitrite and nitrate'],
      ['Denitrification', 'Nitrate reduced toward N₂ gas'],
      ['Mineralization', 'Organic nitrogen released as ammonium'],
    ],
    explanation:
      'Fixation brings nitrogen in from the air, mineralization releases it from organic matter, nitrification oxidizes it, and denitrification returns it to the air.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Density layers and mixing',
    image: 'wq-thermocline',
    caption:
      'An ocean temperature profile: warm surface water sits above a sharp **thermocline** and cold deep water.',
    bullets: [
      'Temperature and salinity set density, which can produce **stratification**.',
      'A fresh surface layer over saline water ==restricts vertical oxygen exchange==.',
      'Wind, tides, river input and seasonal heating change the layering.',
      'A surface sample can miss **low oxygen near the bottom**.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt:
      'Which details belong in a sampling plan for a stratified estuary? Select all that apply.',
    options: [
      'Sampling depth',
      'Tidal stage',
      'Time of day',
      'Only the color of the water',
      'Location',
    ],
    answers: [0, 1, 2, 4],
    explanation:
      'Depth, tide, time and location all change what a sample represents. Color alone says little about layering or oxygen.',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'Linking cycles to evidence',
    steps: [
      { label: 'Input', detail: '**Nutrient runoff** enters the water.' },
      { label: 'Production', detail: 'Algal growth increases.' },
      { label: 'Demand', detail: 'Decomposition later ==consumes oxygen==.' },
      {
        label: 'Evidence',
        detail: 'Test the chain with observations at the **right times and depths**.',
      },
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Order the steps of a nutrient-to-low-oxygen chain.',
    items: [
      'Nutrients run off into the water',
      'Algal production increases',
      'Algae die and sink',
      'Decomposers consume oxygen',
      'Bottom oxygen drops',
    ],
    explanation:
      'Each link needs its own evidence: loading data, chlorophyll, and oxygen at depth over time.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Flux', back: 'Transfer per unit time.' },
      { front: 'Residence time', back: 'Storage divided by a flux, under a steady approximation.' },
      { front: 'Stratification', back: 'Vertical density layering.' },
      { front: 'Denitrification', back: 'Microbial conversion of oxidized nitrogen toward gas.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Change in storage equals inputs minus {0}. Residence time is storage divided by a {1}. Nitrate becomes N₂ gas through {2}.',
    blanks: ['outputs', 'flux', 'denitrification'],
    distractors: ['volume', 'nitrification', 'evaporation'],
    explanation: 'A budget balances inputs and outputs; residence time divides a store by a flux.',
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      '**Hydrogen bonding** explains many of water’s properties; suspended is not dissolved.',
      'Budgets need a ==boundary and interval==: ΔS = inputs − outputs.',
      'Oxygen swings daily with **photosynthesis** and **respiration**.',
      'Nitrogen changes form through microbes; phosphorus has no major gas phase.',
      '**Stratification** can hide low bottom oxygen from surface samples.',
    ],
  },
]);

const measures = defineDeck('water-u2-l1', [
  {
    kind: 'title',
    title: 'Chemical, physical, and biological water measures',
    subtitle: 'Every number needs its units, its method and its sampling context.',
    objectives: [
      'Interpret units and sampling context.',
      'Compare oxygen concentration and oxygen demand.',
      'Use several indicators rather than one score.',
    ],
    image: 'wq-secchi',
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Chemical measurements',
    bullets: [
      '**Dissolved oxygen (DO)** concentration (mg/L) is not the same as **percent saturation**.',
      'Saturation depends on ==temperature, salinity and pressure==: cold fresh water holds more oxygen.',
      '**pH** is logarithmic, so averaging pH values arithmetically can mislead.',
      '**Alkalinity** is acid-neutralizing capacity, not pH itself.',
    ],
    callout:
      'State the method and conditions before comparing values from different places or instruments.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'Sample A has pH 6 and sample B has pH 8. How do their hydrogen-ion concentrations compare?',
    options: [
      'A has 2 times as much as B',
      'A has 100 times as much as B',
      'B has 100 times as much as A',
      'They are equal because the average is 7',
    ],
    answer: 1,
    explanation:
      'Each pH unit is a factor of 10 in hydrogen-ion concentration, so two units lower means 10 × 10 = 100 times more H⁺.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Physical measurements',
    image: 'wq-secchi',
    caption:
      'A **Secchi disk** is lowered until it disappears; the depth records a visibility endpoint, not a turbidity reading.',
    bullets: [
      '**Turbidity** measures light scattering under a specified method.',
      'Sediment, plankton and dissolved color affect optical readings differently.',
      '**Conductivity** reflects ions and is ==temperature-sensitive==; it infers salinity only with calibration.',
      'Temperature, depth and flow constrain how every other value is read.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each measurement to what it records.',
    pairs: [
      ['Turbidity', 'Light scattering by particles'],
      ['Secchi depth', 'Depth at which a disk disappears from view'],
      ['Conductivity', 'Ability of dissolved ions to carry current'],
      ['Temperature', 'Thermal state that changes gas solubility'],
    ],
    explanation:
      'Optical and electrical readings answer different questions and are not interchangeable.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Oxygen demand',
    image: 'wq-bod-bottles',
    caption:
      'Sealed **BOD bottles**: oxygen is measured before and after a dark incubation, usually five days at 20 °C.',
    bullets: [
      '**BOD** estimates oxygen consumed by organisms during a defined incubation.',
      'It differs from the oxygen present at collection.',
      '**COD** uses a chemical oxidant and does not measure the identical quantity.',
      'High demand can cause ==later depletion if replenishment is slow==.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'A BOD bottle starts at 8.6 mg/L oxygen and ends at 3.4 mg/L after incubation (undiluted). What is the BOD in mg/L?',
    answer: 5.2,
    tolerance: 0.05,
    unit: 'mg/L',
    explanation: 'BOD = initial DO − final DO = 8.6 − 3.4 = 5.2 mg/L for an undiluted sample.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Biological evidence',
    image: 'wq-caddisfly',
    caption:
      'An adult **caddisfly**. Its aquatic larvae, with mayfly and stonefly larvae, are classic pollution-sensitive indicators.',
    bullets: [
      'Communities ==integrate conditions over time==, unlike a single grab sample.',
      'Interpretation depends on habitat, season, identification quality and effort.',
      '**Chlorophyll** approximates photosynthetic biomass; microbial indicators answer different questions.',
      'A missing organism may reflect unsuitable habitat or poor sampling, not contamination.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'No mayfly larvae were found at a site. Which conclusion is best supported?',
    options: [
      'The site is definitely polluted',
      'The absence needs habitat and sampling-effort context before interpretation',
      'Mayflies cannot live in any stream',
      'Chemistry measurements are now unnecessary',
    ],
    answer: 1,
    explanation:
      'Indicators are evidence, not labels. Absence can come from habitat, season or sampling effort, so combine biology with chemistry and physics.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Quality assurance',
    bullets: [
      '**Calibrate** with suitable standards and record temperature compensation.',
      'Use **blanks** and **duplicates** where appropriate; handle samples consistently.',
      'Replication reveals variability but ==does not remove a shared calibration error==.',
      'A **nondetect** means below the method’s detection limit, not necessarily zero.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'What does each quality step mainly check?',
    bins: ['Accuracy (bias)', 'Precision (variability)', 'Contamination'],
    items: [
      ['Measuring a known standard', 0],
      ['Running duplicate samples', 1],
      ['Analyzing a field blank', 2],
      ['Calibrating against reference solutions', 0],
      ['Repeating a reading three times', 1],
      ['Testing rinse water from clean bottles', 2],
    ],
    explanation:
      'Standards test accuracy, repeats test precision, and blanks reveal contamination added during handling.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: equal oxygen, equal saturation?',
    problem: 'Two sites both have 6 mg/L oxygen. Are they equally saturated?',
    steps: [
      'Check **temperature**, **salinity** and **pressure** at each site.',
      'These set the equilibrium oxygen solubility.',
      'Equal concentration need not mean ==equal percent saturation==.',
    ],
    conclusion: 'Units do not remove environmental context.',
  },
  {
    kind: 'multi',
    section: 5,
    prompt:
      'A warm, stratified site has high nutrients and high chlorophyll. Which observations would support a eutrophication explanation? Select all that apply.',
    options: [
      'Low bottom-water oxygen',
      'Large predawn oxygen drop',
      'Rapid, turbid flow with no layering',
      'Rising chlorophyll after nutrient pulses',
    ],
    answers: [0, 1, 3],
    explanation:
      'Low bottom oxygen, strong day–night swings and chlorophyll tracking nutrients all fit the mechanism; a well-mixed turbid flow points to a different explanation.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Alkalinity', back: 'Acid-neutralizing capacity.' },
      { front: 'Turbidity', back: 'Method-dependent optical scattering measure.' },
      { front: 'BOD', back: 'Oxygen demand over a defined biological incubation.' },
      { front: 'Detection limit', back: 'Lowest reliably detectable amount under a method.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Percent saturation depends on temperature, salinity and {0}. Turbidity measures light {1}. A nondetect means the value was below the {2}.',
    blanks: ['pressure', 'scattering', 'detection limit'],
    distractors: ['pH', 'absorption by salt', 'calibration curve'],
    explanation:
      'Gas solubility depends on temperature, salinity and pressure; turbidity is a scattering measure; nondetects are bounded by the detection limit.',
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'DO concentration and **percent saturation** are different quantities.',
      'pH is ==logarithmic==; alkalinity is buffering capacity.',
      '**BOD** is oxygen demand over an incubation, not oxygen present now.',
      'Biological indicators integrate time but need habitat and effort context.',
      'QA: standards, blanks, duplicates, and honest **detection limits**.',
    ],
  },
]);

const impacts = defineDeck('water-u3-l1', [
  {
    kind: 'title',
    title: 'Human impacts, treatment, and pollution management',
    subtitle: 'Follow where material goes: sources, treatment trains, and measured outcomes.',
    objectives: [
      'Distinguish wastewater and drinking-water treatment.',
      'Trace point and nonpoint sources.',
      'Evaluate management through measured outcomes.',
    ],
    image: 'wq-wastewater-plant',
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Source pathways',
    bullets: [
      '**Point sources** enter through identifiable outlets, such as a discharge pipe.',
      '**Nonpoint sources** are distributed across land or air, such as farm and street runoff.',
      'Exposure depends on ==concentration, duration, chemical form and transport==.',
      'Clear water can hold dissolved contaminants; turbid water does not name a toxin.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Point source or nonpoint source?',
    bins: ['Point source', 'Nonpoint source'],
    items: [
      ['Factory discharge pipe', 0],
      ['Fertilizer washing off many fields', 1],
      ['Sewage treatment plant outfall', 0],
      ['Oil and salt running off city streets', 1],
      ['Atmospheric nitrogen deposition', 1],
      ['A single overflowing storm-sewer outlet', 0],
    ],
    explanation:
      'Point sources have a single identifiable outlet; nonpoint sources are spread over an area or arrive from the air.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Wastewater treatment',
    image: 'wq-wastewater-plant',
    caption:
      'A large wastewater plant from the air: round settling tanks and long rectangular aeration basins for biological treatment.',
    bullets: [
      '**Primary**: screening and settling remove large and settleable material.',
      '**Secondary**: microbes in aerated basins consume dissolved organic matter.',
      '**Tertiary**: polishing or nutrient removal as required.',
      '==Sludge is captured matter==, not matter that disappeared; disinfection does not remove salts.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order a typical wastewater treatment train.',
    items: [
      'Screening of large debris',
      'Primary settling',
      'Biological (secondary) treatment',
      'Nutrient removal or polishing',
      'Disinfection before discharge',
    ],
    explanation:
      'Physical removal comes first, then biological processing, then polishing and disinfection; plants vary but this order is typical.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Drinking-water treatment',
    image: 'wq-drinking-treatment',
    caption:
      'A drinking-water plant: **flocculants** are added, then **sedimentation**, **filtration** and **disinfection** before storage and delivery.',
    bullets: [
      'Coagulants neutralize particle charges so ==fine particles clump into floc==.',
      'Settling and filtration remove the floc; disinfection targets susceptible microbes.',
      'Membranes or adsorption target other substances.',
      'No single step makes every source potable; safety needs validated treatment and testing.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each drinking-water step to its purpose.',
    pairs: [
      ['Coagulation', 'Neutralize charges on fine particles'],
      ['Flocculation', 'Gently mix so particles grow into floc'],
      ['Filtration', 'Remove remaining small particles'],
      ['Disinfection', 'Inactivate susceptible microbes'],
    ],
    explanation: 'Each step targets a different problem; the train works only in combination.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Eutrophication',
    image: 'wq-erie-bloom',
    caption:
      'A cyanobacterial bloom colors western Lake Erie green, fed by nutrient loading from the surrounding watershed.',
    bullets: [
      'Nutrients raise **primary production**; later **decomposition** depletes oxygen.',
      'Depletion is worst where ==stratification limits exchange== with the surface.',
      'Not every bloom produces toxins: measure biomass, species and toxins separately.',
      'A green photograph is not loading data.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Dead zones worldwide',
    image: 'wq-dead-zones',
    caption:
      'Red circles mark coastal **dead zones** (hypoxic areas); blue shading shows particulate organic carbon and brown shading population density.',
    bullets: [
      'Many dead zones lie off coasts that receive ==high nutrient loads== from rivers.',
      'The Gulf of Mexico zone forms each summer below the Mississippi outflow.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Why does oxygen often drop well after a nutrient-fed bloom peaks?',
    options: [
      'Algae stop photosynthesizing at once and absorb oxygen',
      'Dead algae sink and decomposers consume oxygen, especially below a stratified layer',
      'Nutrients themselves react directly with oxygen in seconds',
      'Blooms always release toxins that destroy oxygen',
    ],
    answer: 1,
    explanation:
      'The oxygen demand comes from decomposition of the extra organic matter, and stratification keeps that deep water from being re-oxygenated.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Management choices',
    image: 'wq-riparian-buffer',
    caption:
      'A **riparian buffer** of trees and grasses between crop fields and Bear Creek, Iowa, slows runoff and traps sediment.',
    bullets: [
      'Source reduction, buffers, erosion control, upgrades and stormwater retention target different pathways.',
      'Success depends on design, maintenance, scale and local conditions.',
      'A lower concentration can come from ==dilution rather than a lower load==.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: concentration versus load',
    problem:
      'A river’s concentration halves while its discharge doubles. What happens to the load rate?',
    steps: [
      'Use **load rate = concentration × discharge**.',
      'New rate = 0.5 × 2 = **1 times** the original.',
      'Concentration improved, but the load rate did not change.',
    ],
    conclusion:
      '==Dilution and source reduction differ==; always estimate flow as well as concentration.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A stream carries 4 mg/L nitrate at a discharge of 2 m³/s (2000 L/s). What is the nitrate load rate in g/s?',
    answer: 8,
    tolerance: 0,
    unit: 'g/s',
    explanation: '4 mg/L × 2000 L/s = 8000 mg/s = 8 g/s.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Evidence and decisions',
    bullets: [
      'Separate **mechanism**, **observation**, and **management inference**.',
      'If loading falls but oxygen stays low, consider ==stored sediment nutrients==, temperature, mixing or time lag.',
      'Name the measurement that would distinguish two explanations.',
      'Decide how long monitoring must continue to see a response.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt:
      'Nutrient loading to a lake fell, but bottom oxygen is still low two years later. Which explanations are plausible? Select all that apply.',
    options: [
      'Phosphorus released from lake sediments',
      'Warmer summers strengthening stratification',
      'A time lag before the lake responds',
      'Lower loading always fixes oxygen within weeks, so the data must be fake',
    ],
    answers: [0, 1, 2],
    explanation:
      'Internal loading, temperature and lag can all delay recovery; the last option ignores how ecosystems respond.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Point source', back: 'Identifiable discharge location.' },
      { front: 'Nonpoint source', back: 'Distributed input pathway.' },
      { front: 'Load', back: 'Quantity entering over time.' },
      { front: 'Disinfection', back: 'Reduction of targeted viable pathogens.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      '**Point** sources have outlets; **nonpoint** sources are spread out.',
      'Wastewater: screen, settle, treat biologically, polish, disinfect; ==sludge still exists==.',
      'Drinking water: coagulate, flocculate, settle, filter, disinfect.',
      'Eutrophication: nutrients → production → decomposition → **low oxygen**.',
      'Load = concentration × discharge; dilution is not source reduction.',
    ],
  },
]);

const ecology = defineDeck('water-u4-l1', [
  {
    kind: 'title',
    title: 'Food webs, niches, and population dynamics',
    subtitle: 'Energy flows through ecosystems while matter cycles.',
    objectives: [
      'Trace energy and matter differently.',
      'Interpret ecological interactions.',
      'Evaluate population models and sampling limits.',
    ],
    image: 'wq-food-web',
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Food-web connections',
    image: 'wq-food-web',
    caption:
      'A freshwater food web: arrows run from food to feeder, from algae and plants through tadpoles, insects and fish to the heron.',
    bullets: [
      '**Producers** fix energy into organic matter; consumers and **decomposers** obtain it.',
      'Arrows point ==from resource to consumer== to show transfer.',
      'Omnivory and detrital pathways make webs more complex than one chain.',
      'Energy dissipates as heat; **matter cycles**.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'In a food web drawn with standard arrows, which way does the arrow between algae and a snail point?',
    options: ['From snail to algae', 'From algae to snail', 'Both ways', 'No arrow is needed'],
    answer: 1,
    explanation:
      'Arrows show the direction of energy and matter transfer, from the resource (algae) to the consumer (snail).',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Ecological pyramids',
    image: 'wq-eco-pyramid',
    caption:
      'An energy pyramid: producers at the base, then primary, secondary and tertiary consumers, with less energy at each level.',
    bullets: [
      '**Energy** pyramids generally decline upward in comparable units.',
      '**Biomass** is a standing stock; with fast-turnover phytoplankton it ==can be inverted==.',
      '**Numbers** pyramids depend strongly on organism size.',
      'The 10% rule is a teaching approximation, not a constant.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'Using the 10% teaching approximation, producers capture 50,000 kJ. How much energy reaches secondary consumers, in kJ?',
    answer: 500,
    tolerance: 0,
    unit: 'kJ',
    explanation:
      '50,000 × 0.1 = 5,000 kJ to primary consumers; × 0.1 again = 500 kJ to secondary consumers.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Niche and habitat',
    bullets: [
      '**Habitat** is where an organism lives; **niche** is its resource use and role.',
      'The **fundamental niche** is shrunk to the **realized niche** by interactions and constraints.',
      'Competition, predation, mutualism and parasitism affect populations differently.',
      'Relationships ==can shift with environment==; a species name does not fix its role.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each interaction to its effect on the two species (+ helps, − harms).',
    pairs: [
      ['Competition', '− / −'],
      ['Predation', '+ / −'],
      ['Mutualism', '+ / +'],
      ['Commensalism', '+ / 0'],
    ],
    explanation:
      'Competitors both lose; predators gain at prey’s expense; mutualists both gain; commensals help one and leave the other unaffected.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Population models and survivorship',
    image: 'wq-survivorship',
    caption:
      'Survivorship curves: **Type I** (most survive to old age), **Type II** (constant risk), **Type III** (high early mortality).',
    bullets: [
      '**Exponential** growth assumes a constant per-capita rate with no feedback.',
      '**Logistic** growth adds density dependence and a carrying capacity, K.',
      'K is ==not a fixed permanent number==: resources, disturbance and migration change it.',
      'Survivorship curves summarize mortality patterns, not every individual’s fate.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Which survivorship type best fits each organism?',
    bins: ['Type I', 'Type II', 'Type III'],
    items: [
      ['Humans in developed countries', 0],
      ['Oysters releasing millions of larvae', 2],
      ['Many songbirds with steady adult risk', 1],
      ['Large mammals with heavy parental care', 0],
      ['Coral larvae drifting in plankton', 2],
      ['Hydra with roughly constant mortality', 1],
    ],
    explanation:
      'Parental care pushes mortality late (Type I); broadcast spawners lose most young early (Type III); constant risk gives Type II.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Diversity and evidence',
    bullets: [
      '**Richness** counts species; **evenness** describes relative abundances.',
      'Two communities can have equal richness but ==different dominance==.',
      'Sampling effort, area, season and identification quality change estimates.',
      'Diversity informs assessment but does not replace chemical or pathogen tests.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: same richness, different structure',
    problem:
      'Two sites have four species. One is dominated by a single species. Compare their diversity.',
    steps: [
      '**Richness** is equal: four species each.',
      'Relative abundance differs.',
      'The dominated site has **lower evenness**.',
    ],
    conclusion: '==Richness alone misses community structure.==',
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Site A: 25, 25, 25, 25 individuals of four species. Site B: 91, 3, 3, 3. Which statement is correct?',
    options: [
      'A has higher richness',
      'B has higher evenness',
      'They have equal richness but A has higher evenness',
      'They have equal evenness',
    ],
    answer: 2,
    explanation:
      'Both have four species, but A’s individuals are spread evenly while B is dominated by one species.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Linking oxygen to ecology',
    bullets: [
      'Production and respiration connect food webs to the **oxygen cycle**.',
      'High daytime production can coexist with ==low predawn or deep-water oxygen==.',
      'The virtual model holds input and demand constant over a short interval.',
      'Real ecosystems change, so they need repeated observations, not one extrapolated line.',
    ],
  },
  {
    kind: 'fill',
    section: 5,
    prompt: 'Complete the summary.',
    text: 'Energy {0} through a food web, while matter {1}. Logistic growth levels off near the carrying {2}.',
    blanks: ['flows', 'cycles', 'capacity'],
    distractors: ['cycles back', 'disappears', 'rate'],
    explanation:
      'Energy is lost as heat at each transfer while atoms are recycled; logistic growth approaches K.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Niche', back: 'Resource use and ecological role.' },
      { front: 'Richness', back: 'Number of species.' },
      { front: 'Evenness', back: 'Distribution of relative abundances.' },
      { front: 'Carrying capacity', back: 'Context-dependent population parameter in a model.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Arrows run from **resource to consumer**; energy flows, matter cycles.',
      'Energy pyramids decline upward; ==biomass pyramids can invert==.',
      'Realized niches are narrower than fundamental niches.',
      'Exponential versus **logistic** growth; K is context-dependent.',
      'Richness and **evenness** describe different aspects of diversity.',
    ],
  },
]);

const habitats = defineDeck('water-u5-l1', [
  {
    kind: 'title',
    title: 'Oceans, estuaries, reefs, and watersheds',
    subtitle: 'Coastal water quality starts upstream and changes with depth, tide and season.',
    objectives: [
      'Explain estuarine mixing.',
      'Compare reef types and threats.',
      'Connect upstream land use to coastal conditions.',
    ],
    image: 'wq-coral-outcrop',
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Marine gradients',
    bullets: [
      'Ocean conditions vary with **depth**, **light**, temperature, circulation, nutrients and substrate.',
      'The **photic zone** supports photosynthesis where light is adequate.',
      'Deeper waters depend on ==sinking organic matter== and other pathways.',
      'Continental shelves are often far more productive than open-ocean gyres.',
    ],
    callout: 'Locate a measurement in its physical setting before assigning ecological meaning.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Salinity across waters',
    image: 'wq-salinity',
    caption:
      'Salinity classes from fresh water through brackish water to seawater and brine; estuaries span the brackish range.',
    bullets: [
      'Estuaries connect river input with tides and the sea.',
      'They range from **well mixed** to **salt-wedge** (strongly stratified).',
      'Salinity can change ==over hours and with depth==.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: two-endmember mixing',
    problem:
      'Mix equal volumes of fresh water (salinity 0) and seawater (salinity 35). Estimate the final salinity.',
    steps: [
      'Assume **conservative mixing** and additive volumes.',
      'Use the volume-weighted average.',
      'S = (0 + 35) / 2 = **17.5**.',
    ],
    conclusion:
      'Evaporation, rain, groundwater and changing endmembers ==can break the simple model==.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'Mix 3 L of river water (salinity 0) with 1 L of seawater (salinity 36). Assuming conservative mixing, what is the salinity?',
    answer: 9,
    tolerance: 0,
    explanation: 'S = (0 × 3 + 36 × 1) / (3 + 1) = 36 / 4 = 9.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Reef types: the atoll',
    image: 'wq-atoll',
    caption:
      'Tetiaroa atoll from the air: a ring of reef and small islands around a central lagoon, with no central island left.',
    bullets: [
      '**Fringing reefs** lie close to shore.',
      '**Barrier reefs** are separated from shore by a lagoon.',
      '**Atolls** ring a lagoon, often over a ==subsided volcanic island==.',
    ],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'A fringing reef',
    image: 'wq-fringing-reef',
    caption:
      'The fringing reef at Eilat, Red Sea, grows right along the shoreline with no lagoon in between.',
    bullets: [
      'Reef-building corals secrete **calcium carbonate** and host symbiotic algae.',
      'Not all corals build shallow tropical reefs.',
      'A photograph alone does not establish a reef’s ==origin or health==.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each reef type to its description.',
    pairs: [
      ['Fringing reef', 'Grows directly along the shoreline'],
      ['Barrier reef', 'Separated from shore by a lagoon'],
      ['Atoll', 'Ring of reef around a central lagoon'],
    ],
    explanation:
      'Darwin’s sequence: as a volcanic island subsides, a fringing reef can become a barrier reef and then an atoll.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Threat mechanisms: bleaching',
    image: 'wq-bleached-coral',
    caption:
      'Bleached coral: the white skeleton shows through tissue that has lost its symbiotic algae.',
    bullets: [
      '**Thermal stress** disrupts the coral–algal symbiosis and causes **bleaching**.',
      'Bleached coral is ==stressed, not automatically dead==.',
      'Sediment, nutrients, disease, damage and overharvest add pressures.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Ocean acidification',
    image: 'wq-ocean-ph',
    caption:
      'Seawater pH measured off Hawaii, 1988–2024: it swings with the seasons but falls steadily as the ocean takes up CO₂.',
    bullets: [
      'Dissolved CO₂ forms carbonic acid and ==reduces carbonate ion availability==.',
      'Lower carbonate saturation can make **calcification** harder for corals and shellfish.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Which threat mechanism does each observation point to?',
    bins: ['Thermal stress', 'Acidification', 'Sediment and nutrients'],
    items: [
      ['Mass bleaching during a marine heat wave', 0],
      ['Slower skeleton growth as carbonate saturation falls', 1],
      ['Algae overgrowing coral near a river mouth', 2],
      ['Pale colonies after weeks of record water temperature', 0],
      ['Corals smothered by silt after heavy rain', 2],
      ['Thinner shells in larval snails at lower pH', 1],
    ],
    explanation:
      'Different threats leave different evidence; combine tissue observations, history and measurements.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Watershed connections',
    image: 'wq-mississippi-basin',
    caption:
      'The Mississippi River basin drains about 40% of the lower 48 states into the Gulf of Mexico, where a summer hypoxic zone forms.',
    bullets: [
      'A **watershed** drains to a defined outlet.',
      'Land use far inland changes ==runoff timing, sediment and nutrients== at the coast.',
      'Retention, dilution, chemical form and timing matter more than distance alone.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Why does Midwestern farm fertilizer matter to oxygen in the Gulf of Mexico?',
    options: [
      'It evaporates and falls as rain over the Gulf',
      'Rivers in the Mississippi watershed carry the nutrients to the Gulf, fueling blooms and hypoxia',
      'Distance alone always dilutes it to zero',
      'Fertilizer directly removes oxygen from river water',
    ],
    answer: 1,
    explanation:
      'The basin delivers nutrient loads to the Gulf, where stratified summer water develops a large hypoxic zone.',
  },
  {
    kind: 'compare',
    section: 5,
    title: 'Comparing habitats',
    columns: ['Feature', 'Estuary', 'Coral reef'],
    rows: [
      ['Salinity', '**Variable**, brackish', 'Near full seawater, stable'],
      ['Tidal influence', 'Strong, changes salinity', 'Moderate'],
      ['Light and nutrients', 'Turbid, ==nutrient-rich==', 'Clear, ==nutrient-poor=='],
      ['Characteristic life', 'Marsh grasses, oysters', 'Corals, reef fish'],
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Is each condition more typical of an estuary or a coral reef?',
    bins: ['Estuary', 'Coral reef'],
    items: [
      ['Salinity swings with the tide and river flow', 0],
      ['Clear, low-nutrient water', 1],
      ['Turbid water rich in suspended sediment', 0],
      ['Stable, near full-strength seawater', 1],
      ['Oyster beds and marsh grasses', 0],
      ['Calcium carbonate framework built by animals', 1],
    ],
    explanation:
      'Estuaries mix river and sea water and trap sediment; reefs need clear, stable, nutrient-poor seawater.',
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which upstream changes could harm a downstream reef? Select all that apply.',
    options: [
      'More fertilizer runoff from farms',
      'Increased soil erosion after forest clearing',
      'Restoring a riparian buffer',
      'Untreated sewage discharge',
    ],
    answers: [0, 1, 3],
    explanation:
      'Nutrients, sediment and sewage reduce light and fuel algae; buffers reduce those loads.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Estuary', back: 'Coastal system influenced by fresh water and seawater.' },
      { front: 'Endmember', back: 'Defined source composition in a mixture.' },
      { front: 'Bleaching', back: 'Loss of symbionts or pigments in stressed coral.' },
      { front: 'Watershed', back: 'Area draining to a defined outlet.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Light, depth and circulation create **marine gradients**.',
      'Estuaries range from well mixed to ==salt-wedge== stratified; mixing is a weighted average.',
      '**Fringing**, **barrier** and **atoll** reefs differ in their relation to land.',
      'Bleaching is stress, not death; acidification reduces carbonate availability.',
      'Upstream land use shapes coastal water through the **watershed**.',
    ],
  },
]);

export const decks: Deck[] = [
  cycles,
  measures,
  impacts,
  ecology,
  habitats,
  ...waterQualityDecksReefs,
];
