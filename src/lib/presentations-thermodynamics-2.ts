import { defineDeck } from './presentation-types.ts';

// Thermodynamics (Division C) units 6–10: gas processes, the first law, entropy, cycles, and the
// history of thermodynamic reasoning.

const processes = defineDeck('therm-u6-l1', [
  {
    kind: 'title',
    title: 'Isothermal, isobaric, isochoric, and adiabatic processes',
    subtitle: 'Four constraints, four paths, and the area under each one.',
    objectives: [
      'Read P–V work as the signed area under a path.',
      'Compare what each process holds fixed.',
      'Apply reversible adiabatic relations with their assumptions.',
      'Compare paths that start from the same state.',
    ],
    image: 'thermo-processes',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: does “isothermal” mean no heat crosses the boundary?',
    options: ['Yes', 'No', 'Only for liquids', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Work is area on a P–V diagram',
    bullets: [
      'For a quasistatic path, work by the gas **W = ∫P dV**.',
      'On a P–V diagram it is the ==signed area under the path==, positive for expansion.',
      'Pa × m³ = J.',
      'A vertical (constant-volume) path does **zero boundary work**.',
      'The path shape matters, not only the endpoint volumes.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'A gas expands at a constant 100 kPa from 0.010 m³ to 0.030 m³. How much work, in joules, does it do?',
    answer: 2000,
    tolerance: 1,
    unit: 'J',
    explanation:
      'W = PΔV = 100 000 Pa × 0.020 m³ = 2000 J, the rectangle under the horizontal path.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Isothermal versus adiabatic',
    image: 'thermo-processes',
    caption:
      'From the same start, an **isothermal** path is shallowest and the **adiabatic** (isentropic) path is steeper. The area under each curve is the work.',
    bullets: [
      'Ideal-gas **isothermal**: T and U constant, so ==heat in equals work out==.',
      'Reversible: **W = nRT ln(V₂/V₁)**.',
      'Isothermal does not mean insulated; free expansion is a different, irreversible process.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'One mole at 300 K expands reversibly and isothermally to twice its volume. Work by the gas, in joules? (R = 8.314 J/(mol·K))',
    answer: 1729,
    tolerance: 5,
    unit: 'J',
    explanation: 'W = nRT ln 2 = 1 × 8.314 × 300 × 0.693 ≈ 1729 J. ΔU = 0, so Q = W.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Isobaric: constant pressure',
    bullets: [
      'Work by the gas is **PΔV**.',
      'For a fixed ideal amount, ==T rises in proportion to V==.',
      'Heat supplies both ΔU and work: **Q = nCpΔT**.',
      'A horizontal line is isobaric ==only when pressure is the vertical axis==.',
    ],
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Isochoric: constant volume',
    bullets: [
      'Constant volume means **zero P–V work**.',
      'Heat changes internal energy and temperature: **Q = ΔU**.',
      'Pressure rises with Kelvin temperature.',
      'Zero work does not mean zero heat or zero energy change.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'A rigid sealed tank of gas is heated. Which statement is true?',
    options: [
      'No boundary work is done, so all the heat raises internal energy',
      'The gas does work equal to the heat',
      'Pressure stays constant',
      'Temperature stays constant',
    ],
    answer: 0,
    explanation: 'Constant volume means W = 0, so Q = ΔU and both temperature and pressure rise.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Adiabatic: no heat',
    bullets: [
      '**Adiabatic** means Q = 0; expansion lowers U because the gas does work.',
      'Reversible ideal gas: **PVᵞ** and **TVᵞ⁻¹** are constant.',
      '==Adiabatic is not automatically reversible==: friction or rapid expansion breaks the power laws.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Which process does each description fit?',
    bins: ['Isothermal', 'Isobaric', 'Isochoric', 'Adiabatic'],
    items: [
      ['Temperature stays constant', 0],
      ['Work equals PΔV', 1],
      ['No boundary work at all', 2],
      ['No heat crosses the boundary', 3],
      ['Heat in equals work out for an ideal gas', 0],
      ['Expansion cools the gas with Q = 0', 3],
    ],
    explanation: 'Each name says what is held fixed: T, P, V, or zero heat.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Comparing paths',
    image: 'thermo-carnot-pv',
    caption:
      'Isotherms (T₁, T₂) and adiabats connect states on one diagram. Different paths between states trade different amounts of ==heat and work==.',
    bullets: [
      'Start from the **same initial state** and the same volume ratio.',
      'Then compare final T, P, work, and heat.',
      'Two paths ending at different temperatures do not share full endpoints.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'From the same start, a gas expands to twice its volume isothermally or adiabatically. Which does more work?',
    options: ['Isothermal', 'Adiabatic', 'They are equal', 'It cannot be compared'],
    answer: 0,
    explanation:
      'Pressure falls faster on the adiabat, so less area lies under it. Heat input keeps the isothermal pressure higher.',
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: isothermal doubling',
    problem: 'One mole at 300 K expands reversibly and isothermally to twice its volume. Find W.',
    steps: [
      'Use **W = nRT ln 2**.',
      'W ≈ 1 × 8.314 × 300 × 0.693.',
      'W ≈ **1729 J**; ΔU = 0 and Q = W.',
    ],
    conclusion: '==Constant temperature does not mean zero heat.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Quasistatic', back: 'A path close to a sequence of equilibrium states.' },
      { front: 'Isothermal', back: 'Constant temperature.' },
      { front: 'Isochoric', back: 'Constant volume.' },
      { front: 'Adiabatic', back: 'No heat transfer.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'P–V work is the {0} under the path. An isochoric process does {1} work, and an adiabatic process has zero {2}.',
    blanks: ['area', 'zero', 'heat'],
    distractors: ['slope', 'maximum', 'work'],
    explanation: 'Work is area; constant volume means no area; adiabatic means Q = 0.',
  },
  {
    kind: 'open',
    prompt: 'Why can a gas cool during an adiabatic expansion?',
    model:
      'No heat enters, so the work the gas does comes out of its internal energy. Lower internal energy means lower temperature.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Work is the signed area under a P–V path.',
      'Isothermal: ΔU = 0 for an ideal gas. Isochoric: W = 0.',
      '**Adiabatic means Q = 0, not automatically reversible.**',
      'Compare paths from the same initial state.',
    ],
  },
]);

const firstLaw = defineDeck('therm-u7-l1', [
  {
    kind: 'title',
    title: 'Internal energy and the first law',
    subtitle: 'Energy in as heat, out as work, and the change in between.',
    objectives: [
      'Use a declared work sign convention.',
      'Balance heat and work against ΔU.',
      'Translate between physics and chemistry signs.',
      'Apply special-process shortcuts with their assumptions.',
    ],
    image: 'thermo-carnot-pv',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: is heat the same thing as internal energy?',
    options: ['Yes', 'No', 'Only for gases', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The first law',
    bullets: [
      'For a closed system: **ΔU = Q − W_by**.',
      'Q is heat **into** the system; W_by is work done **by** it.',
      'It is an ==energy balance==, not a claim that heat and U are the same.',
      'Broader systems may add kinetic, gravitational, or other work terms.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'A system receives 500 J of heat and does 200 J of work. What is ΔU, in joules?',
    answer: 300,
    tolerance: 0.5,
    unit: 'J',
    explanation: 'ΔU = Q − W_by = 500 − 200 = 300 J.',
  },
  {
    kind: 'compare',
    section: 1,
    title: 'Two sign conventions',
    columns: ['Convention', 'Equation', 'Expansion work'],
    rows: [
      ['Physics (work **by**)', '**ΔU = Q − W_by**', 'Positive'],
      ['Chemistry (work **on**)', '**ΔU = q + w_on**', 'Negative'],
      ['Link', '**w_on = −W_by**', 'Same ΔU either way'],
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A gas does 100 J of work on its surroundings. In the chemistry convention, what is w_on, in joules?',
    answer: -100,
    tolerance: 0.5,
    unit: 'J',
    explanation: 'w_on = −W_by = −100 J.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'State and path',
    image: 'thermo-carnot-pv',
    caption:
      'A **cycle** returns to its starting state, so **net ΔU = 0**, yet the enclosed area means net work, and net heat equals net work.',
    bullets: [
      '**U** is a state function; **Q and W depend on the path**.',
      'Different paths between the same states share ΔU = Q − W_by.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'A gas completes one full cycle. What is its net change in internal energy?',
    options: ['Zero', 'Equal to the net work', 'Equal to the heat in', 'It depends on the path'],
    answer: 0,
    explanation:
      'U depends only on state, and the cycle ends where it began. Net heat and net work can be nonzero but equal.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Special processes',
    bullets: [
      '**Isochoric**: W_by = 0, so **ΔU = Q**.',
      '**Adiabatic**: Q = 0, so **ΔU = −W_by**.',
      '**Ideal-gas isothermal**: ΔU = 0, so Q = W_by.',
      'The isothermal shortcut needs U to depend only on T, which is an **ideal-gas** property.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each process to its first-law shortcut.',
    pairs: [
      ['Isochoric', 'ΔU = Q'],
      ['Adiabatic', 'ΔU = −W_by'],
      ['Ideal-gas isothermal', 'Q = W_by'],
      ['Complete cycle', 'Net Q = net W_by'],
    ],
    explanation: 'Each shortcut sets one term to zero using the process or the state function.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Calculating ΔU',
    bullets: [
      'Monatomic ideal gas: **ΔU = (3/2)nRΔT**.',
      'A temperature rise means ==positive ΔU== in this model.',
      'Check that Q − W_by matches the state-based ΔU: ==two routes, one answer==.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'Two moles of a monatomic ideal gas warm by 10 K. What is ΔU, in joules? (R = 8.314 J/(mol·K))',
    answer: 249.4,
    tolerance: 0.5,
    unit: 'J',
    explanation: 'ΔU = (3/2)nRΔT = 1.5 × 2 × 8.314 × 10 ≈ 249.4 J.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Verify with the lab',
    bullets: [
      'The lab reports **Q, W_by, and ΔU** for each path.',
      'Run trials from the same start with different constraints and ==check the balance numerically==.',
      'A curve on a P–V plot is not an engine: a **cycle** must close back on its starting state.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: both conventions',
    problem:
      'A system receives 500 J of heat and does 200 J of work. Find ΔU and the chemistry work.',
    steps: [
      'Q = +500 J, W_by = +200 J.',
      '**ΔU = 500 − 200 = 300 J**.',
      'w_on = −200 J, so q + w_on = 300 J.',
    ],
    conclusion: '==Both sign conventions give the same energy change.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'First law', back: 'Energy conservation for the defined system.' },
      { front: 'Work by', back: 'Energy leaving the system as work, counted positive.' },
      { front: 'State function', back: 'A quantity set by the state alone.' },
      { front: 'Cycle', back: 'A process that returns to its initial state.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Internal energy is a {0} function, while heat and work depend on the {1}. In an adiabatic expansion, ΔU is {2}.',
    blanks: ['state', 'path', 'negative'],
    distractors: ['volume', 'pressure', 'positive'],
    explanation: 'With Q = 0 and positive work by the gas, ΔU = −W_by is negative.',
  },
  {
    kind: 'open',
    prompt: 'Why is it worth checking ΔU from the temperature change as well as from Q − W?',
    model:
      'The two routes use different information. If they agree, the heat and work accounting, including signs, is probably right; if not, something is wrong.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'ΔU = Q − W_by (physics) = q + w_on (chemistry).',
      'U is a state function; Q and W are path functions.',
      '**A cycle has ΔU = 0 but can have net work.**',
      'Shortcuts depend on the process and the ideal-gas model.',
    ],
  },
]);

const entropy = defineDeck('therm-u8-l1', [
  {
    kind: 'title',
    title: 'Entropy, reversibility, and the second law',
    subtitle: 'Energy is conserved; the second law decides which way things go.',
    objectives: [
      'Compute entropy changes with Kelvin temperatures.',
      'Distinguish reversible idealizations from real transfers.',
      'Separate system entropy from total entropy.',
      'Find entropy changes for ideal-gas paths.',
    ],
    image: 'thermo-free-expansion',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: can the entropy of a system ever decrease?',
    options: [
      'Never',
      'Yes, if the surroundings gain more',
      'Only at absolute zero',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Direction beyond conservation',
    bullets: [
      'The first law allows many balances but ==does not say which processes happen==.',
      'The **second law**: total entropy of system plus surroundings does not decrease.',
      'A **local decrease** is allowed if it is compensated elsewhere.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'Water freezes in a freezer, so its entropy drops. Why doesn’t this break the second law?',
    options: [
      'The surroundings gain at least as much entropy as the water loses',
      'Freezing creates energy',
      'The second law only applies to gases',
      'Entropy is not defined for ice',
    ],
    answer: 0,
    explanation:
      'The freezer rejects heat to the room, raising the room’s entropy by more than the water’s decrease.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Entropy is a state function',
    bullets: [
      'For a reversible transfer: **dS = δQ_rev / T**.',
      'Entropy is a ==state function== even for irreversible processes: use a reversible reference path to calculate it.',
      'Heat itself stays path-dependent.',
      'Entropy links bulk properties to the ==number of microscopic arrangements==.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: heat flowing downhill',
    problem:
      'Transfer 100 J from a 400 K reservoir to a 300 K reservoir. Find the total entropy change.',
    steps: [
      'Hot reservoir: **−100/400 = −0.250 J/K**.',
      'Cold reservoir: **+100/300 = +0.333 J/K**.',
      'Total = **+0.083 J/K**.',
    ],
    conclusion: '==Energy is conserved while total entropy increases.==',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      '600 J flows from a 600 K reservoir to a 300 K reservoir. What is the total entropy change, in J/K?',
    answer: 1,
    tolerance: 0.01,
    unit: 'J/K',
    explanation: '−600/600 + 600/300 = −1 + 2 = +1 J/K.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Reversible and irreversible',
    image: 'thermo-free-expansion',
    caption:
      'In **free expansion** the gas rushes into the empty bulb: no work, no heat, an ideal gas keeps its temperature, yet ==entropy rises== and the gas never un-mixes by itself.',
    bullets: [
      'A **reversible** process is an ideal limit: everything can be restored with no net change elsewhere.',
      'Finite temperature gaps, friction, unrestrained expansion, and mixing **generate entropy**.',
      'Quasistatic alone does not guarantee reversibility.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Does each process generate entropy (irreversible) or approach the reversible limit?',
    bins: ['Generates entropy', 'Ideal reversible limit'],
    items: [
      ['Heat flowing across a large temperature gap', 0],
      ['Gas expanding freely into a vacuum', 0],
      ['Slow frictionless isothermal expansion against a matched pressure', 1],
      ['A block sliding to a stop by friction', 0],
      ['Two gases mixing', 0],
      ['A frictionless reversible adiabatic compression', 1],
    ],
    explanation:
      'Gradients, friction, free expansion, and mixing are classic sources of entropy generation.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Ideal-gas entropy',
    bullets: [
      '**ΔS = nCv ln(T₂/T₁) + nR ln(V₂/V₁)**.',
      'Reversible adiabatic paths are ==isentropic==.',
      'Irreversible adiabatic paths can still generate entropy.',
      'Reversible isothermal expansion: the gas gains entropy and the surroundings lose the same, so ==total generation is zero==.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'One mole of ideal gas doubles its volume isothermally. What is its entropy change, in J/K? (R = 8.314)',
    answer: 5.76,
    tolerance: 0.02,
    unit: 'J/K',
    explanation: 'ΔS = nR ln 2 = 8.314 × 0.693 ≈ 5.76 J/K. The temperature term is zero.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Reading the lab carefully',
    bullets: [
      'The gas paths are ==reversible teaching paths==; the cycle panel gives a reversible Carnot bound.',
      'They do not calculate friction or finite-gradient entropy generation.',
      'Zero generation in a formula is a statement about the model, not proof a real process is lossless.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Select every true statement.',
    options: [
      'Adiabatic always means isentropic',
      'Entropy calculations need Kelvin temperatures',
      'A system’s entropy may fall if the surroundings compensate',
      'Zero entropy generation in an ideal model proves a real device has no losses',
    ],
    answers: [1, 2],
    explanation:
      'Only reversible adiabatic paths are isentropic, and an ideal model says nothing about real irreversibility.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Entropy generation', back: 'The increase caused by irreversibility.' },
      { front: 'Reversible', back: 'An ideal process undoable with no net change elsewhere.' },
      { front: 'Isentropic', back: 'Constant entropy.' },
      { front: 'Reservoir', back: 'A body that keeps a fixed temperature during exchange.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'For a reversible transfer, dS equals heat divided by {0} temperature. Heat flowing from hot to cold makes total entropy {1}, and the {2} law forbids the total from decreasing.',
    blanks: ['absolute', 'increase', 'second'],
    distractors: ['Celsius', 'decrease', 'first'],
    explanation:
      'Use Kelvin; the cold side gains more Q/T than the hot side loses; this is the second law.',
  },
  {
    kind: 'open',
    prompt:
      'Why does the same 100 J produce a bigger entropy change when it enters a cold reservoir than when it leaves a hot one?',
    model:
      'Entropy change is Q/T. The same Q divided by a smaller absolute temperature gives a larger number, so the cold side gains more than the hot side loses.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'The second law constrains total entropy, not the system alone.',
      'dS = δQ_rev/T with Kelvin temperatures; S is a state function.',
      '==Gradients, friction, free expansion, and mixing generate entropy.==',
      'Adiabatic is isentropic only when reversible.',
    ],
  },
]);

const engines = defineDeck('therm-u9-l1', [
  {
    kind: 'title',
    title: 'Heat engines, Carnot cycles, refrigerators, and heat pumps',
    subtitle: 'Turning heat into work, and work into moved heat, within the second law.',
    objectives: [
      'Balance heat and work for a cycle.',
      'Calculate the Carnot efficiency bound.',
      'Distinguish efficiency from coefficient of performance.',
      'Relate refrigerator and heat-pump COP.',
    ],
    image: 'thermo-carnot-engine',
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: a heat pump delivers 3 J of heat per 1 J of work. Does that break energy conservation?',
    options: ['Yes', 'No', 'Only in winter', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Engine accounting',
    image: 'thermo-carnot-engine',
    caption: 'Heat **Q_h** in, work **W** out, **Q_c** rejected. Over a cycle, **W = Q_h − Q_c**.',
    bullets: ['**Thermal efficiency** η = W/Q_h; no cycle turns ==all the heat into work==.'],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'An engine takes in 1000 J and rejects 600 J per cycle. What is its efficiency, as a decimal?',
    answer: 0.4,
    tolerance: 0.001,
    explanation: 'W = 1000 − 600 = 400 J; η = 400/1000 = 0.40.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'The Carnot cycle',
    image: 'thermo-carnot-pv',
    caption:
      'Two **isotherms** and two **reversible adiabats**. Its efficiency **1 − T_c/T_h** is the ==maximum== for any engine between those reservoirs.',
    bullets: [
      'Use **Kelvin** and T_h > T_c.',
      'It is a bound, not a prediction of real performance.',
      'Do not swap reservoir temperatures with working-fluid temperatures.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'What is the Carnot efficiency between reservoirs at 600 K and 300 K, as a decimal?',
    answer: 0.5,
    tolerance: 0.001,
    explanation: 'η = 1 − 300/600 = 0.50.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Changing the bound',
    bullets: [
      'Raising T_h or lowering T_c ==raises the ideal bound==.',
      'Materials, heat transfer, emissions, and operating limits matter in practice.',
      '**Celsius substitution** gives nonsense or a plausible wrong answer.',
      'Equal reservoir temperatures give ==zero== Carnot efficiency.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'A student computes Carnot efficiency between 327 °C and 27 °C as 1 − 27/327. What is wrong?',
    options: [
      'Celsius was used; the temperatures must be 600 K and 300 K',
      'Nothing; Celsius ratios are fine',
      'The hot and cold temperatures are swapped',
      'Carnot efficiency uses the sum of temperatures',
    ],
    answer: 0,
    explanation: 'Ratios need absolute temperatures: 1 − 300/600 = 0.50, not 0.92.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Refrigerators move heat uphill',
    image: 'thermo-perkins',
    caption:
      'Perkins’ 1834 vapor-compression machine: ==work moved heat== out of water to freeze it.',
    bullets: [
      'A refrigerator uses work to move heat from cold to hot.',
      '**COP_ref = Q_c/W**; reversible limit T_c/(T_h − T_c).',
      'COP can exceed 1: it compares moved heat with work, ==not energy created==.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt: 'What is the ideal refrigerator COP between 300 K (cold) and 600 K (hot)?',
    answer: 1,
    tolerance: 0.001,
    explanation: 'COP_ref = T_c/(T_h − T_c) = 300/300 = 1.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Three performance measures',
    columns: ['Device', 'Useful output ÷ input', 'Ideal limit'],
    rows: [
      ['Engine', '**η = W/Q_h**', '1 − T_c/T_h'],
      ['Refrigerator', '**COP = Q_c/W**', 'T_c/(T_h − T_c)'],
      ['Heat pump', '**COP = Q_h/W**', '==COP_ref + 1=='],
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each device to its useful output.',
    pairs: [
      ['Heat engine', 'Work delivered'],
      ['Refrigerator', 'Heat removed from the cold side'],
      ['Heat pump', 'Heat delivered to the warm side'],
    ],
    explanation: 'Different purposes give different numerators, not contradictory accounting.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Using the cycle panel',
    bullets: [
      'The panel keeps T_h above T_c and reports **Carnot efficiency and both COPs**.',
      'It is a ==reversible limit calculator==, not a simulated compressor.',
      'Build cycles from the gas-process panel’s individual paths.',
      'Keep magnitude accounting separate from the signed convention for one path.',
    ],
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: one pair of reservoirs',
    problem: 'For T_h = 600 K and T_c = 300 K, find the Carnot efficiency and both ideal COPs.',
    steps: [
      '**η** = 1 − 300/600 = 0.50.',
      '**COP_ref** = 300/(600 − 300) = 1.',
      '**COP_heat** = COP_ref + 1 = 2.',
    ],
    conclusion: '==The values describe different useful outputs.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Thermal efficiency', back: 'Work out divided by hot-side heat in.' },
      { front: 'COP', back: 'Useful moved heat divided by work in.' },
      { front: 'Carnot bound', back: 'The reversible maximum between fixed reservoirs.' },
      { front: 'Heat rejection', back: 'Energy an engine sends to the cold reservoir.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'For one engine cycle, W equals Q_h minus {0}. Carnot efficiency uses {1} temperatures, and a heat pump’s ideal COP is one {2} than the refrigerator’s.',
    blanks: ['Q_c', 'Kelvin', 'greater'],
    distractors: ['Q_h', 'Celsius', 'less'],
    explanation:
      'Energy balances over the cycle; ratios need absolute temperature; Q_h = Q_c + W gives the extra 1.',
  },
  {
    kind: 'open',
    prompt: 'Explain why a COP of 3 does not create energy.',
    model:
      'The device moves 3 J of heat for each 1 J of work. The heat comes from the cold side, so energy is conserved; COP just compares heat moved with work supplied.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Over a cycle, W = Q_h − Q_c and η = W/Q_h.',
      'Carnot: η_max = 1 − T_c/T_h in Kelvin.',
      '==COP compares moved heat with work and can exceed 1.==',
      'COP_heat = COP_ref + 1 for the same ideal cycle.',
    ],
  },
]);

const history = defineDeck('therm-u10-l1', [
  {
    kind: 'title',
    title: 'Historical experiments and modern thermodynamic reasoning',
    subtitle: 'From latent heat and paddle wheels to entropy and blackbody spectra.',
    objectives: [
      'Connect historical contributions to the evidence behind them.',
      'Distinguish classical and statistical descriptions.',
      'Explain why models have regimes of usefulness.',
      'Evaluate models through reproducible checks.',
    ],
    image: 'thermo-joule',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: does a historically important model have to be exact?',
    options: ['Yes', 'No', 'Only if it is old', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Heat as a scientific question',
    image: 'thermo-ice-calorimeter',
    caption:
      'Lavoisier and Laplace’s **ice calorimeter** measured heat by the mass of ice melted, the same latent-heat idea Joseph Black had clarified.',
    bullets: [
      '**Joseph Black** distinguished ==specific heat from latent heat==.',
      'Temperature change alone does not capture all energy transfer.',
      'Read historical terms in context, not as modern notation.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Joule and energy',
    image: 'thermo-joule',
    caption:
      'Joule’s **paddle-wheel** apparatus: a falling weight stirred water, and the small temperature rise linked ==mechanical work to heat==.',
    bullets: [
      'A modern reconstruction tracks **work input, temperature rise, apparatus capacity, and losses**.',
      'A rising thermometer alone does not give an exact conversion.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A heater adds 1000 J to a system with total heat capacity 500 J/K, with no losses. What temperature rise, in K?',
    answer: 2,
    tolerance: 0.01,
    unit: 'K',
    explanation:
      'ΔT = Q/C = 1000/500 = 2 K. A smaller measured rise would point to losses or a wrong capacity.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Kelvin and Clausius',
    bullets: [
      '**Kelvin** helped develop ==absolute thermodynamic temperature==.',
      '**Clausius** formalized the second law and **entropy**.',
      'First law: energy conservation. Second law: ==allowed direction==.',
      'State the system and conditions when applying either.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each scientist to the idea.',
    pairs: [
      ['Joseph Black', 'Latent and specific heat'],
      ['Joule', 'Mechanical work and heat'],
      ['Kelvin', 'Absolute temperature scale'],
      ['Clausius', 'Entropy and the second law'],
      ['Planck', 'Blackbody radiation spectra'],
    ],
    explanation: 'Learn each contribution as the evidence it explained, not a vocabulary fact.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Maxwell and Boltzmann',
    image: 'thermo-boltzmann',
    caption:
      '**Ludwig Boltzmann** connected entropy to the number of microscopic arrangements, building on **Maxwell’s** speed distributions.',
    bullets: [
      'Equal temperature does ==not mean equal molecular speed==.',
      'A **distribution** describes many particles, not one deterministic speed.',
      'Large numbers make bulk behavior reproducible.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Why do statistical descriptions use distributions?',
    options: [
      'Individual particles vary, but bulk averages are stable',
      'Every molecule has exactly the same speed',
      'Classical thermodynamics is always wrong',
      'Temperature is a property of one molecule',
    ],
    answer: 0,
    explanation:
      'Distributions capture variation among enormous numbers of particles, producing reliable averages.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Planck and radiation',
    image: 'thermo-blackbody',
    caption:
      'Blackbody spectra peak at shorter wavelengths as temperature rises. The **classical** curve shoots upward at short wavelengths, a failure Planck’s ==quantum== model fixed.',
    bullets: [
      'Models have **regimes of usefulness** and limits.',
      'Progress often keeps a good approximation while clarifying where it fails.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'What does the classical curve on a blackbody graph show?',
    options: [
      'A successful model failing outside its regime, at short wavelengths',
      'That Planck’s model is wrong',
      'That hotter bodies emit less',
      'That radiation needs a medium',
    ],
    answer: 0,
    explanation:
      'The classical prediction diverges at short wavelengths; Planck’s quantized treatment matches the measured spectra.',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'A common problem-solving routine',
    steps: [
      { label: 'Boundary', detail: 'Define the **system** and what crosses it.' },
      { label: 'State', detail: 'List **state variables** in consistent, absolute units.' },
      { label: 'Process', detail: 'Name the **constraint** and sign convention.' },
      { label: 'Check', detail: 'Test ==limiting cases== and energy balance.' },
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Order the cycle of scientific refinement.',
    items: [
      'Observe a reproducible thermal effect',
      'Build a model under stated assumptions',
      'Predict a new measurement',
      'Compare and refine the model’s scope',
    ],
    explanation:
      'Discrepancies between prediction and measurement drive refinement of scope and evidence.',
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: auditing a heater',
    problem:
      'A mechanical heater adds 1000 J to a system with total capacity 500 J/K, neglecting losses. Predict ΔT.',
    steps: [
      'Use **Q = CΔT**.',
      'ΔT = 1000/500 = **2 K**.',
      'A different measured rise could mean losses or a wrong capacity.',
    ],
    conclusion: '==A discrepancy invites a boundary and measurement audit.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Specific heat', back: 'Energy per mass per degree of temperature change.' },
      { front: 'Statistical mechanics', back: 'Links microscopic states to bulk properties.' },
      { front: 'Distribution', back: 'How values spread across possibilities.' },
      { front: 'Blackbody', back: 'An ideal absorber and emitter of thermal radiation.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Joule linked mechanical {0} with heat. Clausius formalized {1}, and Planck’s work on {2} radiation helped start quantum theory.',
    blanks: ['work', 'entropy', 'blackbody'],
    distractors: ['charge', 'enthalpy', 'nuclear'],
    explanation: 'Each name connects to the evidence it explained.',
  },
  {
    kind: 'open',
    prompt:
      'A simulation agrees perfectly with the gas law. Why isn’t that experimental proof of the law?',
    model:
      'The simulation computes its output from the gas law itself, so agreement only checks the code. Experimental support needs independent measurements of a real gas.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Black, Joule, Kelvin, Clausius, Maxwell, Boltzmann, and Planck each explained specific evidence.',
      'First law: conservation. Second law: direction.',
      '==Statistical descriptions explain bulk regularity from microscopic variety.==',
      'Models have regimes; simulations are not independent evidence.',
    ],
  },
]);

export const thermoDecksProcesses = [processes, firstLaw, entropy, engines, history];
