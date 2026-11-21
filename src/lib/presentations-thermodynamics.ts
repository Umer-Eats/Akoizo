import type { Deck } from './presentation-types.ts';
import { defineDeck } from './presentation-types.ts';
import { thermoDecksProcesses } from './presentations-thermodynamics-2.ts';

// Thermodynamics (Division C) presentations, one per lesson, following presentations-anatomy.ts.

const systems = defineDeck('therm-u1-l1', [
  {
    kind: 'title',
    title: 'Systems, temperature, and thermal equilibrium',
    subtitle: 'Draw the boundary first; everything else follows from it.',
    objectives: [
      'Define thermodynamic systems and boundaries.',
      'Distinguish heat, temperature, and internal energy.',
      'Apply the zeroth law to measurement.',
      'Use absolute temperature scales correctly.',
    ],
    image: 'thermo-thermometer',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: does a hot object “contain” heat?',
    options: ['Yes', 'No', 'Only metals do', 'Not sure yet'],
  },
  {
    kind: 'compare',
    section: 0,
    title: 'Three kinds of system',
    columns: ['System', 'Matter crosses?', 'Energy crosses?'],
    rows: [
      ['**Open**', 'Yes', 'Yes'],
      ['**Closed**', 'No', 'Yes'],
      ['**Isolated**', 'No', '==No — an idealization=='],
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A sealed metal can of soup sits on a hot stove. What kind of system is the soup?',
    options: ['Closed, not isolated', 'Isolated', 'Open', 'Neither, because it is sealed'],
    answer: 0,
    explanation:
      'No matter crosses the sealed walls, but heat does, so it is closed rather than isolated.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'State variables',
    bullets: [
      '**Pressure, volume, temperature, amount, and internal energy** describe equilibrium states.',
      '**Extensive** quantities scale with size; **intensive** ones such as temperature do not add.',
      'A state description ==does not record the path== used to reach it.',
      'Equal temperature does not mean equal internal energy.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Is each quantity extensive or intensive?',
    bins: ['Extensive', 'Intensive'],
    items: [
      ['Volume', 0],
      ['Temperature', 1],
      ['Internal energy', 0],
      ['Pressure', 1],
      ['Mass', 0],
      ['Density', 1],
    ],
    explanation:
      'Extensive quantities double when you combine two identical samples; intensive ones stay the same.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Heat versus temperature',
    bullets: [
      '**Temperature** characterizes thermal equilibrium.',
      '**Heat** is ==energy crossing a boundary== because of a temperature difference.',
      'Heat is not a substance stored inside an object; **internal energy** is the state property.',
      'A large cool sample can transfer more energy than a tiny hot one.',
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt: 'Select every correct statement.',
    options: [
      'Heat is energy in transit because of a temperature difference',
      'An object stores a definite amount of heat',
      'Two samples at the same temperature can have different internal energy',
      'Temperature and heat have the same units',
    ],
    answers: [0, 2],
    explanation:
      'Heat is a transfer, measured in joules; temperature is a state variable in kelvins.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'The zeroth law and thermometers',
    image: 'thermo-thermometer',
    caption:
      'A thermometer works because of the **zeroth law**: if A and B are each in equilibrium with C, they are in equilibrium with each other.',
    bullets: [
      'Equilibrium means ==no net thermal driving difference==, not that molecules stop moving.',
      'The thermometer must exchange energy with the sample and can **perturb** a small one.',
      'Calibration, response time, and contact affect the reading.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Why might a large thermometer give a misleading reading of a single drop of water?',
    options: [
      'It exchanges enough energy to change the drop’s temperature',
      'Thermometers only work in large volumes',
      'The zeroth law fails for small samples',
      'Water has no definite temperature',
    ],
    answer: 0,
    explanation:
      'Reaching equilibrium with the thermometer moves energy, which matters when the sample is small.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Temperature scales',
    bullets: [
      '**T(K) = T(°C) + 273.15**.',
      'A ==temperature difference has the same size== in kelvins and degrees Celsius.',
      '**Ratios need an absolute scale**: gas laws, radiation, entropy, and Carnot equations use Kelvin.',
      'Fahrenheit has a different step size and offset.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'Convert 27 °C to kelvins.',
    answer: 300.15,
    tolerance: 0.01,
    unit: 'K',
    explanation: 'T = 27 + 273.15 = 300.15 K.',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'Before every trial',
    steps: [
      { label: 'Define', detail: 'Choose the material and its **boundary**.' },
      { label: 'Describe', detail: 'Record the equilibrium **state variables**.' },
      { label: 'Constrain', detail: 'Declare which ==heat and work transfers== are allowed.' },
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: offsets and differences',
    problem: 'Convert 27 °C to Kelvin and compare a 10 °C temperature change.',
    steps: [
      'T = 27 + 273.15 = **300.15 K**.',
      'A change of 10 °C equals a change of **10 K**.',
      'A ratio must use absolute temperatures.',
    ],
    conclusion: '==Offsets change values but not Celsius/Kelvin differences.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Open system', back: 'Exchanges matter and energy.' },
      { front: 'Internal energy', back: 'State property of microscopic energy.' },
      { front: 'Heat', back: 'Energy transfer driven by temperature difference.' },
      { front: 'Zeroth law', back: 'Transitive thermal-equilibrium principle.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A closed system exchanges energy but not {0}. Heat is energy in {1}, and gas-law ratios require the {2} scale.',
    blanks: ['matter', 'transit', 'Kelvin'],
    distractors: ['charge', 'storage', 'Celsius'],
    explanation:
      'Closed systems keep their matter; heat is a transfer; ratios need absolute temperature.',
  },
  {
    kind: 'open',
    prompt: 'Why must you define the system boundary before calculating heat or work?',
    model:
      'Heat and work are transfers across a boundary. Until the boundary is chosen, you cannot say which matter and energy transfers count or what their signs are.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Open, closed, and isolated systems differ in what crosses the boundary.',
      'Heat is a transfer; internal energy is a state property.',
      '==Ratios of temperature require Kelvin.==',
      'Thermometers rely on the zeroth law and can perturb small samples.',
    ],
  },
]);

const transfer = defineDeck('therm-u2-l1', [
  {
    kind: 'title',
    title: 'Conduction, convection, radiation, and heat capacity',
    subtitle: 'Three ways energy moves, and how much it takes to warm something.',
    objectives: [
      'Compare conduction, convection, and radiation.',
      'Use heat capacity with consistent units.',
      'Identify the limits of simple insulation models.',
      'Separate energy from transfer rate.',
    ],
    image: 'thermo-thermogram',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: can heat travel through a vacuum?',
    options: ['Yes', 'No', 'Only light, not heat', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Conduction',
    bullets: [
      'Energy moves through **microscopic interactions** without bulk flow.',
      'Steady slab: rate ∝ ==conductivity × area × ΔT ÷ thickness==.',
      'Thermal and electrical conductivity are **different properties**.',
      'Thickness and contact quality matter as much as the material’s name.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'Doubling the thickness of an insulating slab, with everything else fixed, changes the steady conduction rate how?',
    options: ['It halves', 'It doubles', 'It stays the same', 'It quarters'],
    answer: 0,
    explanation: 'The steady slab rate is inversely proportional to thickness.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Convection',
    bullets: [
      'Energy transport combined with **bulk fluid motion**.',
      '**Natural** convection comes from buoyancy; **forced** convection uses driven flow.',
      'The coefficient h in hAΔT ==depends on fluid, geometry, and flow==; it is not a material constant.',
      'A lid can change several transfer paths at once.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'Why is the convection coefficient h not listed in a materials table like conductivity?',
    options: [
      'It depends on the fluid, geometry, and flow conditions',
      'It is always zero for gases',
      'It only applies in a vacuum',
      'It is identical for every fluid',
    ],
    answer: 0,
    explanation:
      'h is an effective coefficient for a particular situation, not a property of one material.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Radiation you can see in infrared',
    image: 'thermo-thermogram',
    caption:
      'A **thermal image** maps infrared emission. Radiation needs ==no material medium==, and its rate depends on emissivity and absolute temperature to the fourth power.',
    bullets: [
      'Net graybody rate involves **εσA(T⁴ − T_env⁴)**.',
      'Celsius values are ==invalid== in a fourth-power expression.',
      'Visible shininess alone does not set infrared **emissivity**.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Which mechanism dominates each example?',
    bins: ['Conduction', 'Convection', 'Radiation'],
    items: [
      ['A metal spoon handle warming in hot soup', 0],
      ['Warm air rising above a radiator', 1],
      ['Sunlight warming your face', 2],
      ['A fan cooling a hot laptop', 1],
      ['Your hand on a cold window pane', 0],
      ['Feeling a campfire’s warmth from across the circle', 2],
    ],
    explanation:
      'Contact without flow is conduction; moving fluid is convection; electromagnetic transfer is radiation.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Heat capacity',
    bullets: [
      '**C** (J/K) relates energy to temperature change for a stated process.',
      '**Specific heat c** is per mass; molar heat capacity is per mole.',
      'With constant c and no phase change: **Q = mcΔT**.',
      'Gas **Cp > Cv** because constant-pressure heating includes expansion work.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'How much energy, in joules, warms 0.20 kg of water by 10 K? (c = 4180 J/(kg·K), no losses)',
    answer: 8360,
    tolerance: 1,
    unit: 'J',
    explanation: 'Q = mcΔT = 0.20 × 4180 × 10 = 8360 J.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Several paths at once',
    bullets: [
      'A cooling object loses energy by **conduction, convection, radiation, and evaporation**.',
      'Insulation reduces some paths but leaves others.',
      'An exponential cooling fit ==does not identify the mechanism==.',
      'Compare controlled designs and track room conditions and sensor placement.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'A covered cup of coffee cools more slowly. Which explanations could contribute?',
    options: [
      'Less evaporation',
      'Less convection above the surface',
      'Less radiation from the top surface',
      'The lid destroys heat',
    ],
    answers: [0, 1, 2],
    explanation: 'A lid changes several paths at once; energy is never destroyed.',
  },
  {
    kind: 'compare',
    section: 5,
    title: 'Energy, rate, and capacity',
    columns: ['Quantity', 'Unit', 'Limit'],
    rows: [
      ['**Energy**', 'J', 'Not a rate'],
      ['**Rate**', 'W', 'Needs a ==transfer model=='],
      ['**Capacity**', 'J/K', 'Depends on material and constraint'],
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: warming water',
    problem: 'Heat 0.20 kg water by 10 K with c = 4180 J/(kg·K), neglecting losses.',
    steps: ['Use **Q = mcΔT**.', 'Q = 0.20 × 4180 × 10.', 'Q = **8360 J**.'],
    conclusion: '==The result is energy, not a transfer rate or a time.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Conductivity', back: 'Coefficient for conduction under a model.' },
      { front: 'Convection', back: 'Energy transport involving bulk fluid motion.' },
      { front: 'Emissivity', back: 'Radiative emission relative to an ideal blackbody.' },
      { front: 'Specific heat', back: 'Heat capacity per mass.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Radiation needs no {0}. Q = mcΔT gives an {1}, not a rate, and radiation formulas need {2} temperatures.',
    blanks: ['medium', 'energy', 'absolute'],
    distractors: ['vacuum', 'power', 'Celsius'],
    explanation: 'Electromagnetic transfer crosses vacuum; joules are energy; T⁴ needs Kelvin.',
  },
  {
    kind: 'open',
    prompt: 'What extra information would you need to predict how long a thermos keeps soup hot?',
    model:
      'The soup’s heat capacity plus validated transfer paths: geometry, materials, wall conductivity, radiation and convection coefficients, and the room’s conditions.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Conduction, convection, and radiation are distinct mechanisms.',
      'Q = mcΔT gives energy within one phase.',
      '==Radiation uses absolute temperature to the fourth power.==',
      'Real cooling combines several paths.',
    ],
  },
]);

const phases = defineDeck('therm-u3-l1', [
  {
    kind: 'title',
    title: 'Phases, diagrams, and transition paths',
    subtitle: 'Reading maps of stable phases and the paths across them.',
    objectives: [
      'Read phase-diagram axes before tracing a path.',
      'Distinguish phase diagrams from heating curves.',
      'Explain triple and critical points.',
      'Recognize the limits of equilibrium diagrams.',
    ],
    image: 'thermo-phase',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: does water always boil at 100 °C?',
    options: ['Yes', 'No', 'Only in a kettle', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'States of matter',
    bullets: [
      '**Solids** resist shape change; **liquids** flow at nearly fixed volume; **gases** expand.',
      '**Plasma** has substantial ionization and collective charged-particle behavior.',
      'A phase change is ==physical, not chemical==: composition stays the same.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'A pressure–temperature phase diagram',
    image: 'thermo-phase',
    caption:
      'Regions show the **stable phase**; boundaries are coexistence conditions. Read ==both axes== before following a path.',
    bullets: [
      'Crossing a boundary changes the stable phase.',
      'Heating at fixed pressure is a horizontal move here because **temperature is the x-axis**.',
      'Each diagram is **substance-specific**.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'On a P–T diagram with temperature on the horizontal axis, heating at constant pressure moves the state which way?',
    options: [
      'Horizontally to the right',
      'Vertically upward',
      'Diagonally',
      'It stays at one point',
    ],
    answer: 0,
    explanation: 'Pressure is fixed, so only the temperature coordinate changes.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Triple and critical points',
    bullets: [
      'At the **triple point**, three phases coexist.',
      'The liquid–gas curve ends at the **critical point**; beyond it is a ==supercritical regime==.',
      'A critical point is not a melting point or a universal high-temperature limit.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each feature to its meaning.',
    pairs: [
      ['Triple point', 'Solid, liquid, and gas coexist'],
      ['Critical point', 'End of liquid–gas coexistence'],
      ['Boundary line', 'Two phases coexist'],
      ['Open region', 'One stable phase'],
    ],
    explanation: 'Points, lines, and regions on a phase diagram each have a distinct meaning.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Heating curves',
    bullets: [
      'A heating curve plots **temperature against energy or time** for one path.',
      'Ideal **plateaus** show ==latent energy== at a transition.',
      'If the axis is time, interpretation depends on heating power and losses.',
      'A heating curve is a single path, not the whole phase map.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'A heating curve plots temperature against time. Its plateau doubles in length when you halve the burner power. Why?',
    options: [
      'The same latent energy takes twice as long to deliver',
      'Halving power doubles the latent heat',
      'The melting temperature changed',
      'Plateaus do not depend on power',
    ],
    answer: 0,
    explanation: 'Latent energy is fixed by mass; time = energy ÷ net power.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Water is unusual',
    image: 'thermo-water-phase',
    caption:
      'Water’s **solid–liquid boundary tilts backward**: higher pressure lowers its melting point, unlike most substances.',
    bullets: [
      'Near 1 atm, pure water melts near **0 °C** and boils near **100 °C**.',
      'Pressure and dissolved substances ==shift transition conditions==.',
      'The lab does not model high-pressure ice or supercritical water.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Why does water boil below 100 °C on a high mountain?',
    options: [
      'Lower pressure lowers the boiling temperature',
      'The water is less pure',
      'Gravity is weaker',
      'Boiling point never depends on pressure',
    ],
    answer: 0,
    explanation: 'The liquid–gas boundary shifts to lower temperature at lower pressure.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Interpreting evidence',
    bullets: [
      'Identify the **initial state, path, boundary, and final state**.',
      'At coexistence, ==temperature alone does not give the phase fraction==.',
      'Real experiments show **supercooling**, delayed nucleation, and gradients.',
      'Kinetic effects limit, but do not invalidate, equilibrium diagrams.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Select every effect the simple lab model leaves out.',
    options: [
      'Supercooling',
      'Pressure-dependent transitions',
      'Temperature gradients',
      'Latent heat at melting',
    ],
    answers: [0, 1, 2],
    explanation:
      'The lab uses fixed transitions and includes latent heat, but omits kinetics, gradients, and pressure effects.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: inside a plateau',
    problem: 'During ideal melting at 0 °C, what does added energy increase?',
    steps: [
      'Temperature stays at the transition in the model.',
      'Energy converts **ice to liquid**.',
      'The **liquid fraction** rises until melting finishes.',
    ],
    conclusion: '==A plateau can contain a changing internal state.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Triple point', back: 'Three-phase coexistence condition.' },
      { front: 'Critical point', back: 'Endpoint of liquid–gas coexistence.' },
      { front: 'Latent heat', back: 'Energy per amount for a phase transition.' },
      { front: 'Heating curve', back: 'Temperature along a specified energy-input path.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A phase diagram usually plots pressure against {0}. Three phases coexist at the {1} point, and during melting the liquid {2} can change at fixed temperature.',
    blanks: ['temperature', 'triple', 'fraction'],
    distractors: ['volume', 'critical', 'density'],
    explanation: 'P–T axes; triple point; phase fraction changes on a plateau.',
  },
  {
    kind: 'open',
    prompt:
      'Why is a heating curve with time on the x-axis harder to interpret than one with energy?',
    model:
      'To turn time into energy you need the net heating power, including losses. Without it, plateau lengths cannot be compared to latent heats.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Phase diagrams map equilibrium phases against P and T.',
      'Triple and critical points are different features.',
      '==Plateaus hold latent energy while phase fraction changes.==',
      'Water’s melting boundary tilts unusually.',
    ],
  },
]);

const calorimetry = defineDeck('therm-u4-l1', [
  {
    kind: 'title',
    title: 'Latent heat, heating curves, and calorimetry',
    subtitle: 'Splitting paths into segments and balancing energy in an insulated cup.',
    objectives: [
      'Combine sensible and latent energy.',
      'Write an insulated energy balance.',
      'Check the final phase before the final temperature.',
      'Account for apparatus heat capacity and losses.',
    ],
    image: 'thermo-heating-curve',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: when ice melts at 0 °C, does it absorb energy?',
    options: ['Yes', 'No, the temperature does not change', 'Only if stirred', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Sensible energy',
    bullets: [
      'Within one phase: **Q = mcΔT**.',
      'Use the ==phase-appropriate specific heat==: ice, liquid, and vapor differ.',
      'The formula does not include a phase change.',
      'Split a path that crosses a transition into segments.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'How much energy, in kJ, warms 0.10 kg of ice from −20 °C to 0 °C? (c_ice = 2100 J/(kg·K))',
    answer: 4.2,
    tolerance: 0.01,
    unit: 'kJ',
    explanation: 'Q = mcΔT = 0.10 × 2100 × 20 = 4200 J = 4.2 kJ, using the ice value of c.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Latent energy',
    bullets: [
      'Complete conversion: **Q = mL**; partial conversion uses the mass transformed.',
      'Melting (**L_f**) and vaporization (**L_v**) have different values.',
      'A plateau is ==not energy-free== just because ΔT = 0.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'How much energy, in kJ, melts 0.10 kg of ice at 0 °C? (L_f = 334 kJ/kg)',
    answer: 33.4,
    tolerance: 0.05,
    unit: 'kJ',
    explanation: 'Q = mL_f = 0.10 × 334 = 33.4 kJ.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'A segmented heating curve',
    image: 'thermo-heating-curve',
    caption:
      'Sloped segments are **sensible** warming; flat plateaus are **melting and boiling**. Breakpoints are ==cumulative energies==.',
    bullets: [
      'Cold ice to warm water: **warm ice → melt → warm liquid**.',
      'Add segment energies with compatible units.',
      'Mark the initial reference state so zero input has meaning.',
    ],
  },
  {
    kind: 'order',
    section: 2,
    prompt: 'Order the segments for taking ice at −20 °C to steam at 110 °C.',
    items: [
      'Warm the ice to 0 °C',
      'Melt the ice',
      'Warm the water to 100 °C',
      'Boil the water',
      'Warm the steam to 110 °C',
    ],
    explanation: 'Each sensible segment uses mcΔT with its own c; each plateau uses mL.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'The calorimeter balance',
    image: 'thermo-cup-calorimeter',
    caption:
      'A **coffee-cup calorimeter**: in an ideal insulated system, ==heat lost by the hot part equals heat gained by the cold part== and the container.',
    bullets: [
      'Include phase changes in the balance.',
      '**Solve the phase regime first**: there may not be enough energy to melt all the ice.',
      'Real cups still exchange energy with the room.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'You drop a lot of ice into a little warm water and your calculated final temperature is −5 °C. What most likely went wrong?',
    options: [
      'Not all the ice melts, so the final state is an ice–water mix at 0 °C',
      'Water cannot cool below 20 °C',
      'Latent heat should have been ignored',
      'Calorimeters always give negative temperatures',
    ],
    answer: 0,
    explanation:
      'Check the phase regime first; if the warm water cannot melt all the ice, the mixture stays at 0 °C.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Capacity and losses',
    bullets: [
      'A **calorimeter constant** accounts for the apparatus’s heat capacity.',
      'Ignoring it ==biases== inferred heat capacity or reaction energy.',
      'Evaporation, splashing, mixing delays, and sensor response add effects.',
      'Report measured values and uncertainty.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which of these can bias a coffee-cup calorimetry result?',
    options: [
      'Ignoring the cup’s heat capacity',
      'Evaporation from the surface',
      'A slow thermometer',
      'Recording masses carefully',
    ],
    answers: [0, 1, 2],
    explanation:
      'Careful mass measurement reduces error; the others introduce unaccounted energy terms.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'The virtual curve',
    bullets: [
      'The lab starts with **ice at −20 °C** and tracks melting, warming, and vaporization at about 1 atm.',
      'Doubling mass ==doubles every transition energy==: energy is extensive.',
      'It uses rounded constants and does not calculate time or losses.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: melting ice',
    problem: 'Melt 0.10 kg ice at 0 °C using L_f = 334 kJ/kg.',
    steps: [
      'No initial sensible warming is needed.',
      '**Q = mL_f** = 0.10 × 334 kJ.',
      'Q = **33.4 kJ** for complete melting.',
    ],
    conclusion: '==Warming the meltwater requires another segment.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Sensible heat', back: 'Energy for temperature change within a phase.' },
      { front: 'Latent heat', back: 'Energy per mass for phase conversion.' },
      { front: 'Calorimeter constant', back: 'Apparatus heat capacity under a model.' },
      { front: 'Energy balance', back: 'Accounting of all relevant energy changes.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Within a phase use mcΔT; at a transition use {0}. Doubling the mass {1} the energy, and before finding the final temperature you check whether all the {2} melts.',
    blanks: ['mL', 'doubles', 'ice'],
    distractors: ['PV', 'halves', 'steam'],
    explanation: 'Latent segments use mL; energy is extensive; check the phase regime first.',
  },
  {
    kind: 'open',
    prompt: 'Why is a plateau on a heating curve not energy-free?',
    model:
      'Energy is still being added, but it changes the phase fraction instead of the temperature. The latent heat is the energy per mass converted.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Split paths into sensible (mcΔT) and latent (mL) segments.',
      'An insulated balance sums to zero, phase changes included.',
      '==Solve the final phase before the final temperature.==',
      'Include the calorimeter constant and plausible losses.',
    ],
  },
]);

const gases = defineDeck('therm-u5-l1', [
  {
    kind: 'title',
    title: 'Ideal gases and kinetic molecular theory',
    subtitle: 'One equation of state, and the molecular picture behind it.',
    objectives: [
      'Use PV = nRT with consistent, absolute units.',
      'Connect temperature to average kinetic energy.',
      'Use monatomic heat capacities correctly.',
      'Identify where the ideal model fails.',
    ],
    image: 'thermo-maxwell',
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: at the same temperature, do helium and xenon atoms move at the same average speed?',
    options: ['Yes', 'No', 'Only at high pressure', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The ideal-gas law',
    bullets: [
      '**PV = nRT** links equilibrium variables.',
      'Use ==absolute pressure==, not gauge pressure, and **Kelvin** temperature.',
      'Say what is held fixed when one variable changes.',
      'An equation of state does not give the heat and work of a path.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'One mole at 300 K occupies 0.010 m³. What is its pressure in kPa? (R = 8.314 J/(mol·K))',
    answer: 249.4,
    tolerance: 0.5,
    unit: 'kPa',
    explanation: 'P = nRT/V = 8.314 × 300 / 0.010 ≈ 249 400 Pa ≈ 249 kPa.',
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each simple gas law to what it holds fixed.',
    pairs: [
      ['Boyle: P ∝ 1/V', 'Amount and temperature'],
      ['Charles: V ∝ T', 'Amount and pressure'],
      ['Pressure–temperature: P ∝ T', 'Amount and volume'],
    ],
    explanation: 'Each law is PV = nRT with two variables held constant.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Speeds at one temperature',
    image: 'thermo-maxwell',
    caption:
      'Speed distributions of four noble gases at the **same temperature**: lighter atoms move faster, but ==average translational kinetic energy is the same==.',
    bullets: [
      'Ideal particles have negligible volume and no long-range attraction; **pressure comes from collisions**.',
      'Average translational KE per particle = **(3/2)k_BT**.',
      'Real molecules can also rotate and vibrate.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Helium and argon are at the same temperature. What do their atoms share on average?',
    options: ['Translational kinetic energy', 'Speed', 'Momentum', 'Mass'],
    answer: 0,
    explanation:
      'Temperature fixes average translational KE; lighter helium atoms move faster to have the same KE.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Internal energy of a monatomic gas',
    bullets: [
      '**U = (3/2)nRT** and **Cv = (3/2)R** per mole.',
      '**Cp = Cv + R**, so **γ = Cp/Cv = 5/3** for the monatomic case.',
      'Diatomic and polyatomic gases have more active modes and different capacities.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Why is Cp larger than Cv for an ideal gas?',
    options: [
      'At constant pressure, some heat goes into expansion work',
      'Pressure stores extra energy',
      'Volume cannot change at constant pressure',
      'Cp includes the mass of the container',
    ],
    answer: 0,
    explanation: 'Constant-pressure heating raises U and also does work as the gas expands.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Real-gas departures',
    bullets: [
      'Finite particle size and attractions matter at **high density** or near **condensation**.',
      'An ideal prediction can be ==systematically wrong with perfect arithmetic==.',
      'Low pressure is often closer to ideal, but no label guarantees exactness.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Is the ideal-gas model likely good or poor in each case?',
    bins: ['Likely good', 'Likely poor'],
    items: [
      ['Helium at room temperature and 1 atm', 0],
      ['Steam just above its condensation point', 1],
      ['Nitrogen compressed to 300 atm', 1],
      ['Dilute argon in a large flask', 0],
      ['A gas about to liquefy on cooling', 1],
    ],
    explanation:
      'High density and nearness to condensation make particle size and attraction important.',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'Using the gas lab',
    steps: [
      { label: 'Specify', detail: 'Choose **n**, units, and absolute variables.' },
      { label: 'Relate', detail: 'Apply **PV = nRT** to each state.' },
      { label: 'Constrain', detail: 'Choose a ==process== before computing heat and work.' },
    ],
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: pressure from the gas law',
    problem: 'For one mole at 300 K in 0.010 m³, estimate the pressure using R = 8.314 J/(mol·K).',
    steps: ['Use **SI units**.', 'P = nRT/V = 1 × 8.314 × 300 / 0.010.', 'P ≈ **249 kPa**.'],
    conclusion: '==The result is an absolute pressure.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Absolute pressure', back: 'Pressure relative to vacuum.' },
      { front: 'Equation of state', back: 'Relation among equilibrium state variables.' },
      { front: 'Cv', back: 'Constant-volume heat capacity.' },
      { front: 'Gamma', back: 'The ratio Cp/Cv.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Gas-law pressure must be {0}. For a monatomic ideal gas Cv equals {1} R, and equal temperature means equal average translational {2}.',
    blanks: ['absolute', '3/2', 'energy'],
    distractors: ['gauge', '5/2', 'speed'],
    explanation: 'Use absolute pressure; Cv = 3R/2; temperature sets average KE, not speed.',
  },
  {
    kind: 'open',
    prompt: 'Why doesn’t PV = nRT alone tell you how much heat a gas absorbs between two states?',
    model:
      'It only relates state variables. Heat depends on the path taken between states, so you also need the process, such as isothermal or isobaric.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'PV = nRT needs absolute pressure and Kelvin.',
      'Temperature sets average translational KE, not speed.',
      '**Monatomic ideal gas: Cv = 3R/2, γ = 5/3.**',
      'The model fails at high density or near condensation.',
    ],
  },
]);

export const decks: Deck[] = [
  systems,
  transfer,
  phases,
  calorimetry,
  gases,
  ...thermoDecksProcesses,
];
