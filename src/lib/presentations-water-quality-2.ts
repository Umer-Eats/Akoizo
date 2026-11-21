import { defineDeck, type Deck } from './presentation-types.ts';

// Water Quality lessons 6–9: reef organisms, salinometers, study skills and emerging contaminants.

const organisms = defineDeck('water-u6-l1', [
  {
    kind: 'title',
    title: 'Reef organisms, identification, and indicator interpretation',
    subtitle: 'Identify by structure, connect structure to feeding, and use indicators cautiously.',
    objectives: [
      'Compare reef organism groups.',
      'Connect feeding and life history.',
      'Use indicator claims cautiously.',
    ],
    image: 'wq-coral-outcrop',
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Identification levels',
    image: 'wq-coral-outcrop',
    caption:
      'A coral outcrop on Flynn Reef, Great Barrier Reef: hard and soft corals, fish and other reef life share one patch.',
    bullets: [
      'Start broad: **symmetry**, **skeleton**, **attachment**, appendages and feeding structures.',
      'Reefs hold cnidarians, sponges, mollusks, echinoderms, crustaceans, fishes and algae.',
      'Common names can cover several taxa: pair them with a ==scientific name and identification level==.',
      'The official event list decides which organisms are required.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Sponges',
    image: 'wq-sponges',
    caption:
      'Tube and barrel sponges on a Caribbean reef: water enters through small pores and leaves through large openings.',
    bullets: [
      '**Sponges** filter water through pores and internal channels.',
      'They lack the true tissue organization of corals.',
      '**Corals** are cnidarians with **polyps** and stinging cells; many build CaCO₃ skeletons.',
      '==Both can be attached and branching==, so shape alone can mislead.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Symbiotic algae',
    image: 'wq-zooxanthellae',
    caption:
      'Golden-brown **zooxanthellae** cells under the microscope: the single-celled algae that live inside reef corals.',
    bullets: [
      'Reef-building corals host photosynthetic **zooxanthellae** that supply much of their energy.',
      'Losing these symbionts is **bleaching**.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: coral or sponge?',
    problem:
      'A branching attached organism is photographed. Can shape distinguish coral from sponge?',
    steps: [
      'Both groups can be **branching and attached**.',
      'Look for **polyps** and tissue, **pores**, and skeleton evidence.',
      'Keep the identification broad until diagnostic features are visible.',
    ],
    conclusion: '==Shared shape is not a unique taxonomic character.==',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Which feature best separates a coral from a sponge?',
    options: [
      'Branching shape',
      'Living attached to the reef',
      'Polyps with stinging tentacles',
      'Bright color',
    ],
    answer: 2,
    explanation:
      'Polyps with cnidocytes are diagnostic of cnidarians; shape, attachment and color are shared or variable.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Mobile invertebrates',
    image: 'wq-echinoderms',
    caption:
      'Echinoderms: a sea star, a brittle star, a sea urchin, a feather star and a sea cucumber, all built on a fivefold plan.',
    bullets: [
      '**Echinoderms**: fivefold adult symmetry and a **water vascular system**.',
      '**Mollusks** vary: gastropods (snails) and bivalves (clams) among others.',
      '**Crustaceans** have jointed appendages and exoskeletons.',
      'Adult and larval forms ==can look completely different==.',
    ],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'A filter-feeding mollusk',
    image: 'wq-giant-clam',
    caption:
      'A giant clam on the Great Barrier Reef; its colorful mantle holds symbiotic algae, and it also filter-feeds.',
    bullets: [
      'Bivalves like clams are **filter feeders**.',
      'Giant clams also gain energy from symbionts, like corals.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each reef organism to its main feeding role.',
    pairs: [
      ['Parrotfish', 'Grazer scraping algae from rock'],
      ['Giant clam', 'Filter feeder with symbiotic algae'],
      ['Crown-of-thorns sea star', 'Predator of coral polyps'],
      ['Sea cucumber', 'Detritivore processing sediment'],
    ],
    explanation:
      'Even within one broad group, feeding roles differ; connect structure to function for each organism.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Algae and producers',
    image: 'wq-coralline',
    caption:
      'Pink **coralline algae** crusting a rock: these red algae deposit calcium carbonate and help cement reefs.',
    bullets: [
      '**Macroalgae** add production, habitat and food.',
      '**Calcifying algae** help build reef structure.',
      'Excess algal cover can come from ==less grazing or more nutrients==.',
      'Distinguish macroalgae, microscopic symbionts and **cyanobacteria**.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Grazers keep algae in check',
    image: 'wq-parrotfish',
    caption: 'A stoplight parrotfish: its beak-like fused teeth scrape algae from coral rock.',
    bullets: [
      'Herbivorous fish and urchins limit **algal overgrowth**.',
      'Overfishing grazers can shift a reef toward ==algae-dominated== states.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Sort each organism into its group.',
    bins: ['Producer', 'Consumer'],
    items: [
      ['Coralline algae', 0],
      ['Parrotfish', 1],
      ['Zooxanthellae', 0],
      ['Sea urchin', 1],
      ['Turf algae', 0],
      ['Sponge', 1],
    ],
    explanation:
      'Algae and symbionts photosynthesize; fish, urchins and sponges consume food from other sources.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Life cycles',
    bullets: [
      'Many reef organisms have **dispersive larvae** and site-attached adults.',
      '**Recruitment** depends on larval supply, settlement, survival and habitat.',
      'Adult abundance can reflect ==earlier conditions==, not only the sampling day.',
      'Sexual and asexual reproduction affect genetic diversity and spread differently.',
    ],
    callout: 'A short monitoring window can miss seasonal spawning or delayed community response.',
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Order the stages of recruitment for a coral.',
    items: [
      'Spawning releases gametes',
      'Fertilized larvae drift in plankton',
      'Larvae settle on suitable substrate',
      'Settled polyps survive and grow',
      'A new colony is counted in surveys',
    ],
    explanation:
      'Recruitment needs larval supply, settlement and survival; a failure at any step lowers it.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Indicator reasoning',
    image: 'wq-crown-of-thorns',
    caption:
      'A **crown-of-thorns sea star**, a coral predator whose outbreaks can strip reefs of living coral.',
    bullets: [
      'Presence supports an interpretation only when ==tolerance, habitat, sampling and identification== are understood.',
      'Outbreaks have been linked to nutrient runoff, but that link needs separate evidence.',
      'Coral cover, grazing and community composition complement chemistry.',
      'No single organism certifies all aspects of water quality.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt:
      'A team claims high coral cover proves a reef has excellent water quality. Which follow-up measurements would test the claim? Select all that apply.',
    options: [
      'Nutrient and turbidity measurements',
      'Temperature records',
      'Repeated surveys over seasons',
      'One more photograph of the same coral',
    ],
    answers: [0, 1, 2],
    explanation:
      'Independent chemistry, physical data and repeated surveys can challenge the claim; another photo adds nothing new.',
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each reef organism to its main role.',
    pairs: [
      ['Parrotfish', 'Grazes algae off the reef'],
      ['Sponge', 'Filters particles from the water'],
      ['Zooxanthellae', 'Photosynthesize inside coral tissue'],
      ['Crown-of-thorns sea star', 'Eats coral polyps'],
    ],
    explanation:
      'Grazers, filter feeders, symbionts and coral predators each shift reef balance in a different way.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Polyp', back: 'Cnidarian body form found in corals.' },
      { front: 'Filter feeder', back: 'Organism collecting suspended food from water.' },
      { front: 'Recruitment', back: 'Addition of individuals through settlement and survival.' },
      { front: 'Indicator', back: 'Organism or measure interpreted in environmental context.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Identify by **structure** first; keep names at the level the evidence supports.',
      'Corals have **polyps**; sponges have pores and channels.',
      'Echinoderms, mollusks and crustaceans fill ==different feeding roles==.',
      'Grazers control algae; recruitment depends on larvae and settlement.',
      'Indicators need context and **independent measurements**.',
    ],
  },
]);

const salinometers = defineDeck('water-u7-l1', [
  {
    kind: 'title',
    title: 'Salinometers, calibration, and mixture calculations',
    subtitle: 'Measure salinity by conductivity, density or refraction, and calibrate honestly.',
    objectives: [
      'Compare conductivity, density and refractive methods.',
      'Read a calibrated scale.',
      'Quantify mixtures and uncertainty.',
    ],
    image: 'wq-refractometer',
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'What salinity means',
    bullets: [
      '**Salinity** describes dissolved salt content.',
      '**Practical salinity** comes from conductivity ratios and is ==dimensionless==.',
      'Mass-based salinity can be reported in **g/kg**; school problems sometimes use ppt.',
      'Seawater averages about 35.',
    ],
    callout: 'State the convention you are using rather than treating every label as identical.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Why is practical salinity reported without units?',
    options: [
      'Because it is a ratio of conductivities',
      'Because salt has no mass',
      'Because it is always exactly 35',
      'Because it is measured in percent',
    ],
    answer: 0,
    explanation:
      'Practical salinity is defined from a conductivity ratio against a standard, so the units cancel.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'The conductivity method',
    bullets: [
      'Dissolved **ions carry current**, so conductivity rises with salinity.',
      'It needs ==calibration and temperature compensation==: warm water conducts better.',
      'Electrode geometry, contamination and bubbles affect readings.',
      'Conductivity infers salinity; it is **not a full chemical analysis**.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which can make a conductivity salinity reading wrong? Select all that apply.',
    options: [
      'Air bubbles on the electrodes',
      'Uncorrected temperature change',
      'Contaminated electrodes',
      'Measuring in a clean, calibrated, temperature-compensated probe',
    ],
    answers: [0, 1, 2],
    explanation:
      'Bubbles, temperature and contamination all change the measured current; a clean compensated probe is the fix.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Density and optics',
    image: 'wq-refractometer',
    caption:
      'A handheld **refractometer**: a drop on the prism bends light, and the shadow line is read on an internal scale.',
    bullets: [
      '**Hydrometers** infer density from buoyancy: they float higher in saltier water.',
      '**Refractometers** infer refractive index, which rises with dissolved salt.',
      'Both need the ==right scale and temperature handling==.',
      'Density also changes with temperature, not just salt.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each instrument to the property it measures.',
    pairs: [
      ['Conductivity meter', 'Electrical conduction by ions'],
      ['Hydrometer', 'Density, through buoyancy'],
      ['Refractometer', 'Refractive index of light'],
    ],
    explanation: 'Three different physical properties all correlate with salinity once calibrated.',
  },
  {
    kind: 'flow',
    section: 3,
    title: 'A calibration sequence',
    steps: [
      { label: 'Clean', detail: 'Rinse equipment; avoid carry-over between samples.' },
      { label: 'Standards', detail: 'Measure **standards spanning the range** you expect.' },
      { label: 'Record', detail: 'Raw reading, ==temperature==, corrected value, repeats.' },
      {
        label: 'Fit',
        detail: 'Fit and inspect the curve; **do not extrapolate** far beyond standards.',
      },
      { label: 'Unknowns', detail: 'Keep calibration data separate from sample data.' },
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'A sensor reads 0 correctly in distilled water. What does this zero check prove?',
    options: [
      'The whole scale is accurate',
      'Only that the zero point is right; the slope still needs standards across the range',
      'The sensor never needs recalibration',
      'Replicates are no longer needed',
    ],
    answer: 1,
    explanation:
      'A zero check fixes one point. Accuracy across the range needs standards that span it.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Construction principles',
    bullets: [
      'Know which **physical property** your device measures.',
      'Electrode spacing and area (**geometry**) change the response.',
      'A scale is established by ==calibrating with known standards==.',
      'A homemade device does not certify environmental safety.',
    ],
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: freshwater fraction',
    problem: 'Find the freshwater fraction when S(fresh) = 0, S(sea) = 35 and S(mix) = 21.',
    steps: [
      'Write **21 = 35(1 − f)**.',
      '1 − f = 21 / 35 = 0.60.',
      'Freshwater fraction **f = 0.40**.',
    ],
    conclusion: 'This assumes ==fixed conservative endmembers==.',
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'Mix 2 L of water at salinity 10 with 3 L at salinity 30 (conservative, additive volumes). What is the mixture salinity?',
    answer: 22,
    tolerance: 0,
    explanation: 'S = (10 × 2 + 30 × 3) / 5 = (20 + 90) / 5 = 22.',
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'An estuary sample has salinity 28 with endmembers 0 and 35. What is its freshwater fraction, as a decimal?',
    answer: 0.2,
    tolerance: 0.005,
    explanation: '28 = 35(1 − f), so 1 − f = 0.8 and f = 0.2.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Practical salinity',
        back: 'Conductivity-based dimensionless salinity convention.',
      },
      { front: 'Calibration', back: 'Mapping sensor response to known standards.' },
      { front: 'Refractometer', back: 'Instrument using refractive behavior.' },
      { front: 'Endmember mixing', back: 'Weighted combination of defined source waters.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A hydrometer measures {0}; a refractometer measures refractive {1}. A mixture’s salinity must lie between the two {2}.',
    blanks: ['density', 'index', 'endmembers'],
    distractors: ['conductivity', 'turbidity', 'standards'],
    explanation:
      'Each instrument measures a different property, and a conservative mixture cannot fall outside its endmembers.',
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      '**Practical salinity** is a dimensionless conductivity ratio.',
      'Conductivity, density and refraction ==all need calibration and temperature control==.',
      'Standards must span the range; a zero check is not enough.',
      'Mixing: S = (S₁V₁ + S₂V₂)/(V₁ + V₂); results stay **between endmembers**.',
    ],
  },
]);

const synthesis = defineDeck('water-u8-l1', [
  {
    kind: 'title',
    title: 'References, synthesis, and water-quality study skills',
    subtitle:
      'Organize by process, read cases carefully, and design monitoring that tests a mechanism.',
    objectives: [
      'Build process-centered notes.',
      'Evaluate a multi-measure case.',
      'Design a defensible monitoring plan.',
    ],
    image: 'wq-sampling',
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Organizing references',
    bullets: [
      'Group notes by **cycles, methods, habitats, organisms, treatment and calculations**.',
      'Put ==units, calibration needs and limitations== beside each method.',
      'Use diagrams that connect nutrients, production, respiration and oxygen.',
      'Organism pages need diagnostic structures and ecological context.',
    ],
    callout: 'Check the event rules for allowed reference format separately from content.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Reading a case',
    image: 'wq-sampling',
    caption:
      'A field testing kit: photometer, reagents and sample bottles. Every result needs its location, depth, time and method recorded.',
    bullets: [
      'Identify the **boundary, interval, locations, depths and methods**.',
      'Separate ==measured values from interpretations==.',
      'More nutrients is not more **load** unless flow is included.',
      'Missing **metadata** should lower confidence, not be filled with a guess.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Is each statement a measurement or an interpretation?',
    bins: ['Measurement', 'Interpretation'],
    items: [
      ['Bottom DO was 2.1 mg/L at 6 a.m.', 0],
      ['The bay is eutrophic', 1],
      ['Nitrate was 3.4 mg/L at the river mouth', 0],
      ['Farm runoff caused the fish kill', 1],
      ['Chlorophyll rose from 8 to 40 µg/L', 0],
      ['Recovery will take five years', 1],
    ],
    explanation:
      'Measurements report values with context; interpretations propose mechanisms that need testing.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Quantitative habits',
    bullets: [
      'Show **units and conversions** for concentration, volume, flow and time.',
      'Check that weighted averages ==fall between the source values==.',
      'Salinity fraction, percent fresh water and a single ion’s proportion are different.',
      'pH differences are **factors of ten**; explain them chemically.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'Convert a discharge of 0.5 m³/s to liters per second.',
    answer: 500,
    tolerance: 0,
    unit: 'L/s',
    explanation: '1 m³ = 1000 L, so 0.5 m³/s = 500 L/s.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Monitoring design',
    bullets: [
      'Choose sites that answer the question, including **reference sites** and relevant depths.',
      'Repeat across ==tides, seasons and daily cycles== when those processes matter.',
      'Include calibration, duplicates and handling records.',
      'More frequent sampling does **not fix a consistent instrument offset**.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: strengthen an assessment',
    problem: 'A surface sample has high oxygen at noon. Design a stronger assessment.',
    steps: [
      'Sample **predawn** as well as noon.',
      'Include **bottom water** where stratification may occur.',
      'Record temperature, salinity, mixing and production/demand indicators.',
    ],
    conclusion: '==Broaden coverage to match the proposed mechanism.==',
  },
  {
    kind: 'multi',
    section: 3,
    prompt:
      'You suspect nighttime hypoxia in a stratified pond. Which additions to your plan help most? Select all that apply.',
    options: [
      'Predawn sampling',
      'Bottom-water samples',
      'A reference pond without heavy nutrient input',
      'Sampling the same convenient bank at noon more often',
    ],
    answers: [0, 1, 2],
    explanation:
      'Timing, depth and a reference site target the mechanism; more noon samples at one spot do not.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Team practice',
    bullets: [
      'One teammate extracts data while another ==checks mechanisms and units==.',
      'Keep an **error log**: missing concepts, wrong units, weak IDs, unsupported causes.',
      'Redo a changed scenario to test transfer.',
      'Practice should expose uncertainty, not hide it.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each error-log entry to its category.',
    pairs: [
      ['Used mg instead of g in a load', 'Wrong units'],
      ['Called a sponge a coral from shape', 'Weak identification'],
      ['Blamed one farm without loading data', 'Unsupported causal claim'],
      ['Did not know what alkalinity means', 'Missing concept'],
    ],
    explanation: 'Classifying mistakes tells you what to practice next.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Synthesis',
    bullets: [
      'Name the ==best-supported mechanism==, its supporting observations, and an alternative.',
      'Propose a **discriminating measurement** between them.',
      'A synthetic oxygen decline illustrates bookkeeping only.',
      'Real systems add transport, solubility and biological feedback.',
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Order the steps of a monitoring study that tests a mechanism.',
    items: [
      'State the hypothesis and the mechanism',
      'Choose sites, including a reference site',
      'Set sampling times and flow conditions',
      'Collect samples with duplicates and blanks',
      'Compare results against the predictions',
    ],
    explanation:
      'The question drives the design; quality checks and matched comparisons let the data test it.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Metadata', back: 'Context describing collection and measurement.' },
      { front: 'Reference site', back: 'Comparison location chosen for the question.' },
      { front: 'Causal hypothesis', back: 'Proposed mechanism connecting processes.' },
      { front: 'Monitoring', back: 'Repeated observations with a defined purpose.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Context about how a sample was collected is called {0}. A comparison location is a {1} site. A strong conclusion names an {2} explanation.',
    blanks: ['metadata', 'reference', 'alternative'],
    distractors: ['calibration', 'control', 'identical'],
    explanation: 'Metadata, reference sites and alternatives make a case defensible.',
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Organize notes by **process** with units and limits beside each method.',
      'Separate ==measurements from interpretations==; respect missing metadata.',
      'Check units and that averages fall between sources.',
      'Design monitoring around the mechanism: **timing, depth, references**.',
      'Conclude with a mechanism, an alternative, and a test.',
    ],
  },
]);

const contaminants = defineDeck('water-u9-l1', [
  {
    kind: 'title',
    title: 'Emerging contaminants and ocean garbage patches',
    subtitle:
      'Where contaminants go, how plastic breaks up, and what detection does and does not mean.',
    objectives: [
      'Explain transport and persistence.',
      'Locate the five major subtropical accumulation regions.',
      'Distinguish presence, exposure, and effect.',
    ],
    image: 'wq-beach-debris',
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Emerging questions',
    bullets: [
      '**Emerging contaminants** are newly recognized, newly measured, or poorly characterized.',
      'Examples: **pharmaceuticals**, some persistent industrial chemicals (such as PFAS), and **microplastics**.',
      'The label does ==not mean every substance is equally persistent or harmful==.',
      'Better detection can reveal old material without showing a recent increase.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'A new instrument detects a drug in river water for the first time. What can you conclude?',
    options: [
      'Its concentration must have risen recently',
      'It is now detectable; whether it increased needs comparable earlier data',
      'It is harmful at any concentration',
      'Older methods were broken',
    ],
    answer: 1,
    explanation:
      'First detection reflects method sensitivity; a trend needs consistent measurements over time.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Fate and transport',
    bullets: [
      '**Advection** moves contaminants with bulk water flow; mixing spreads them.',
      '**Sorption** binds them to particles; settling then carries them to sediment.',
      'Degradation and biological uptake change form or location.',
      'Dilution ==does not permanently remove material== from the environment.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each fate process to its description.',
    pairs: [
      ['Advection', 'Carried along with moving water'],
      ['Sorption', 'Attaches to particle surfaces'],
      ['Settling', 'Sinks to the sediment with particles'],
      ['Degradation', 'Breaks down into other products'],
    ],
    explanation: 'A mass balance tracks all of these: inputs, outputs, storage and transformation.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Plastic fragmentation',
    image: 'wq-microplastics',
    caption:
      '**Microplastic** fragments and fibers picked out of sediment, in many colors, shapes and sizes.',
    bullets: [
      'Large items **fragment** into smaller pieces without necessarily losing polymer mass.',
      'Density, fouling, shape and currents decide whether particles ==float, sink or stay suspended==.',
      'Microplastics are not one substance or one size.',
      'Compare only compatible size ranges and methods.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: fragments and mass',
    problem: 'A plastic item fragments into 100 pieces. Has its polymer mass necessarily vanished?',
    steps: [
      'Fragmentation changes the **size distribution**.',
      'It does not itself require **loss of polymer mass**.',
      'Transport and detectability can change even if mass remains.',
    ],
    conclusion: '==Counts and mass are different metrics.==',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Five accumulation regions',
    image: 'wq-gyres',
    caption:
      'The five major **subtropical gyres**: North and South Pacific, North and South Atlantic, and Indian Ocean.',
    bullets: [
      'Gyre circulation can ==accumulate floating debris== in their centers.',
      'Boundaries and concentrations shift with conditions.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'The Great Pacific Garbage Patch',
    image: 'wq-garbage-patch',
    caption:
      'Model concentration of floating plastic in the North Pacific, highest between Hawaii and California.',
    bullets: [
      'Garbage patches are **dispersed regions** of mostly small particles, not solid islands.',
      'Surface patches miss plastic on beaches, in sediments, in organisms and at depth.',
      'A gyre map is a ==circulation framework, not a complete pollution inventory==.',
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Which oceans contain a major subtropical gyre? Select all that apply.',
    options: ['North Pacific', 'South Atlantic', 'Indian Ocean', 'Arctic Ocean', 'South Pacific'],
    answers: [0, 1, 2, 4],
    explanation:
      'The five gyres are the North and South Pacific, North and South Atlantic, and Indian Ocean; the Arctic has none.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Presence, exposure, effect',
    image: 'wq-beach-debris',
    bullets: [
      '**Presence**: the substance was detected by a method.',
      '**Exposure**: an organism contacted it by a route over a duration.',
      '**Effect**: additional evidence of a biological response.',
      'Lab effects at one concentration ==do not automatically predict field outcomes==.',
    ],
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Order the evidence chain from weakest to strongest claim of harm.',
    items: [
      'Substance detected in water',
      'Organisms shown to contact it over time',
      'Lab effect observed at a similar concentration',
      'Field effect linked to exposure with alternatives ruled out',
    ],
    explanation: 'Presence, then exposure, then effect: each step requires its own evidence.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Management and research',
    bullets: [
      '**Source reduction**, better waste handling and pathway control address different parts.',
      'Cleaning one patch ==does not stop continued input==.',
      'A research plan defines the substance, size range, sampling frame, blanks and comparison sites.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'A lab detects a trace pharmaceutical in river water. What can you conclude from detection alone?',
    options: [
      'The water is toxic to fish',
      'The compound is present above the detection limit; exposure and effects need more evidence',
      'The river is safe',
      'The compound came from a factory',
    ],
    answer: 1,
    explanation:
      'Presence is not exposure or effect: concentration, duration, species sensitivity and source must still be shown.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Advection', back: 'Transport with bulk water motion.' },
      { front: 'Sorption', back: 'Association with surfaces or particles.' },
      { front: 'Persistence', back: 'Resistance to removal or transformation over time.' },
      { front: 'Exposure', back: 'Contact through a defined route and duration.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Fragmentation changes particle {0} but not necessarily mass. Garbage patches form in subtropical {1}. Detection shows presence, not {2}.',
    blanks: ['counts', 'gyres', 'effect'],
    distractors: ['density', 'estuaries', 'location'],
    explanation:
      'Counts rise as pieces break; gyres accumulate debris; harm needs exposure and effect evidence.',
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      '**Emerging** means newly recognized, not uniformly harmful.',
      'Advection, sorption, settling and degradation decide ==where material goes==.',
      'Fragmentation multiplies counts without destroying mass.',
      'Five **gyres** accumulate debris; patches are dispersed, not islands.',
      'Presence → exposure → effect needs evidence at each step.',
    ],
  },
]);

export const waterQualityDecksReefs: Deck[] = [organisms, salinometers, synthesis, contaminants];
