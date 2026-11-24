import { defineDeck, type Deck } from './presentation-types.ts';
import { decks as divisionCDecks } from './presentations-thermodynamics.ts';

// Thermodynamics (Division B) presentations, one per lesson, following presentations-anatomy.ts.
// Lessons shared with Division C word for word use the Division C decks; the two lessons
// rewritten for Division B (gas processes and the second law) get their own decks here.

const shared = [
  'therm-u1-l1',
  'therm-u2-l1',
  'therm-u3-l1',
  'therm-u4-l1',
  'therm-u5-l1',
  'therm-u7-l1',
  'therm-u9-l1',
  'therm-u10-l1',
];

const gasProcesses = defineDeck('therm-u6-l1-b', [
  {
    kind: 'title',
    title: 'Gas processes with graphs and simple algebra',
    subtitle: 'Name what stays fixed, read the graph, and ==follow the energy==.',
    objectives: [
      'Tell **isothermal**, **isobaric**, **isochoric**, and **adiabatic** processes apart.',
      'Read a **pressure-volume graph** and spot expansion and compression.',
      'Calculate work at constant pressure as **pressure × change in volume**.',
      'Use **change in internal energy = heat added − work done**.',
    ],
    image: 'thermo-carnot-pv',
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: you pump up a bike tire quickly and the pump gets warm. Where did that energy come from?',
    options: [
      'From the air outside the pump',
      'From the work your arms did on the gas',
      'From friction only',
      'Not sure yet',
    ],
  },
  {
    kind: 'compare',
    section: 0,
    title: 'Identify what stays fixed',
    columns: ['Process', 'What stays fixed', 'Clue words'],
    rows: [
      [
        '**Isothermal**',
        'Temperature',
        'Slow change while touching a large constant-temperature bath',
      ],
      ['**Isobaric**', 'Pressure', 'A piston free to move under a constant weight'],
      ['**Isochoric**', 'Volume', 'A sealed, rigid container'],
      [
        '**Adiabatic**',
        '==No heat crosses the boundary==',
        'Very fast change or perfect insulation',
      ],
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each process to what it holds constant or forbids.',
    pairs: [
      ['Isothermal', 'Constant temperature'],
      ['Isobaric', 'Constant pressure'],
      ['Isochoric', 'Constant volume'],
      ['Adiabatic', 'No heat transfer across the boundary'],
    ],
    explanation:
      'Iso- means same: thermal (temperature), baric (pressure), choric (volume). Adiabatic means no heat crosses the boundary.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A gas in a perfectly insulated cylinder is compressed. Which statement is correct?',
    options: [
      'Its temperature must stay constant because it is insulated',
      'No heat crosses the boundary, but its temperature can still change',
      'Its volume stays constant',
      'Its pressure stays constant',
    ],
    answer: 1,
    explanation:
      'Insulation makes the process adiabatic: no heat transfer. Work done on the gas still raises its internal energy and temperature.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Read a pressure-volume graph',
    image: 'thermo-processes',
    caption:
      'Compressions from the same starting point: the **isothermal** curve is shallowest and the **adiabatic** curves rise more steeply.',
    bullets: [
      'Put **volume** on the horizontal axis and **pressure** on the vertical axis.',
      'A **constant-volume** path is ==vertical== and does no expansion work.',
      'A **constant-pressure** path is ==horizontal==.',
      'Moving right is **expansion**; moving left is **compression**.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'What shape does each process make on a pressure-volume graph?',
    bins: ['Vertical line', 'Horizontal line', 'Curve'],
    items: [
      ['Isochoric heating', 0],
      ['Isobaric expansion', 1],
      ['Isothermal expansion', 2],
      ['Cooling a sealed rigid can', 0],
      ['A piston rising under a constant weight', 1],
      ['Adiabatic compression', 2],
    ],
    explanation:
      'Constant volume means no left-right movement (vertical). Constant pressure means no up-down movement (horizontal). Isothermal and adiabatic paths change both and curve.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Calculate rectangular work',
    bullets: [
      'At constant pressure, **work done by the gas = pressure × change in volume**.',
      'Use **pascals** and **cubic meters** to get **joules**.',
      'At 100,000 Pa, expanding by 0.002 m³ does ==200 J of work==.',
      'On the graph, that work is the **area of the rectangle** under the horizontal line.',
      'For curved paths, describe the area qualitatively; the B rules need **no calculus**.',
    ],
    callout: 'Expansion: the gas does positive work. Compression: work is done on the gas.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'A gas at a constant 150,000 Pa expands by 0.004 m³. How much work does the gas do, in joules?',
    answer: 600,
    tolerance: 1,
    unit: 'J',
    explanation: 'Work = 150,000 Pa × 0.004 m³ = 600 J.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'A gas is heated in a sealed rigid tank. How much expansion work does it do?',
    options: [
      'Zero',
      'Pressure × volume of the tank',
      'Equal to the heat added',
      'It cannot be known',
    ],
    answer: 0,
    explanation:
      'The volume does not change, so the change in volume is zero and the expansion work is zero.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Connect to energy',
    image: 'thermo-joule',
    bullets: [
      'With work defined as done **by** the gas: **change in internal energy = heat added − work done**.',
      'An ideal gas expanding **isothermally** keeps the same internal energy, so ==heat added equals work done==.',
      'In an **adiabatic expansion**, work leaves with no heat entering, so the gas **cools**.',
      'Joule’s paddle wheel showed that work and heat are both ways to transfer energy.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: heat in, work out',
    problem:
      'Pressure stays at **100,000 Pa**. The volume increases by **0.002 m³**. **300 J** of heat enters the gas.',
    steps: [
      'Work done by the gas: 100,000 × 0.002 = **200 J**.',
      'Use **change in internal energy = heat added − work done**.',
      'Subtract: 300 − 200 = **100 J**.',
    ],
    conclusion: 'The internal energy ==increases by 100 J==.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'A gas absorbs 500 J of heat and does 200 J of work on its surroundings. What is the change in its internal energy, in joules?',
    answer: 300,
    tolerance: 1,
    unit: 'J',
    explanation: 'Change in internal energy = 500 J − 200 J = 300 J.',
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Which statements are true? Choose all that apply.',
    options: [
      'In an isothermal expansion of an ideal gas, heat added equals work done',
      'An adiabatic expansion can cool a gas',
      'At constant volume, all added heat goes into internal energy',
      'Insulation always keeps temperature constant',
    ],
    answers: [0, 1, 2],
    explanation:
      'Isothermal ideal gas: internal energy is unchanged, so heat in equals work out. Adiabatic expansion: work leaves with no heat in, so it cools. Constant volume: no work, so heat goes to internal energy. Insulation prevents heat flow, not temperature change.',
  },
  {
    kind: 'fill',
    section: 1,
    prompt: 'Complete the graph-reading rules.',
    text: 'On a pressure-volume graph, a constant-volume path is {0}, a constant-pressure path is {1}, and expansion moves toward {2} volume.',
    blanks: ['vertical', 'horizontal', 'larger'],
    distractors: ['curved', 'smaller', 'diagonal'],
    explanation:
      'Volume is on the horizontal axis, so constant volume is vertical and constant pressure is horizontal. Expansion increases volume.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      '**Isothermal**: same temperature. **Isobaric**: same pressure. **Isochoric**: same volume. **Adiabatic**: no heat.',
      'On a P–V graph, constant volume is **vertical** and constant pressure is **horizontal**.',
      'Constant-pressure work = **pressure × change in volume**, in joules.',
      'Change in internal energy = **heat added − work done** by the gas.',
    ],
  },
  {
    kind: 'open',
    prompt:
      'Explain why a gas that expands adiabatically gets colder, using the energy equation in your answer.',
    model:
      'In an adiabatic process no heat enters, so heat added is zero. The expanding gas does positive work, so change in internal energy = 0 − work, which is negative. Lower internal energy means a lower temperature.',
  },
]);

const secondLaw = defineDeck('therm-u8-l1-b', [
  {
    kind: 'title',
    title: 'Energy direction and the second law',
    subtitle: 'Energy is always conserved, but ==the second law tells which way things go==.',
    objectives: [
      'Explain why **conservation of energy** does not set the direction of heat flow.',
      'Choose a **system** and its **surroundings**.',
      'Describe **entropy** and **irreversible** processes without calculus.',
      'Use energy balances for a **heat engine**.',
    ],
    image: 'thermo-carnot-engine',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: have you ever seen a cold drink get colder on its own on a warm day?',
    options: ['Yes', 'No', 'Only in a refrigerator', 'Not sure'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Conservation is not direction',
    bullets: [
      'When hot water warms a cooler cup, **energy is conserved**: what the water loses, the cup gains.',
      'Energy would also be conserved if the cup warmed the water, but ==that never happens on its own==.',
      'The **second law** gives the direction: heat flows **from hotter to colder** without outside work.',
    ],
    callout: 'The first law says energy is conserved; the second law says which way it flows.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A 70 °C metal block touches a 20 °C block, with no outside work. What happens?',
    options: [
      'Heat flows from the 20 °C block to the 70 °C block',
      'Heat flows from the 70 °C block to the 20 °C block',
      'No heat flows because energy is conserved',
      'Both blocks get hotter',
    ],
    answer: 1,
    explanation:
      'Spontaneous heat flow always goes from hotter to colder. Conservation alone would allow either direction; the second law picks this one.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'System and surroundings',
    image: 'thermo-perkins',
    caption:
      'Perkins’ 1834 ice machine used **work** to move heat out of water and freeze it; that heat was ==released to the surroundings==.',
    bullets: [
      'The **system** is the part you choose to study; the **surroundings** are everything else.',
      'A **refrigerator** cools its contents while **warming the room**, because electrical work is supplied.',
      'Cooling one object does **not** mean total entropy of object plus surroundings goes down.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt:
      'A refrigerator is running in a kitchen. Which statements are true? Choose all that apply.',
    options: [
      'It moves heat from the cold inside to the warmer room',
      'It needs work (electrical energy) to do this',
      'It releases heat into the kitchen',
      'It breaks the second law',
      'Leaving its door open would cool the whole kitchen',
    ],
    answers: [0, 1, 2],
    explanation:
      'A refrigerator pumps heat from cold to hot only because work is supplied, and it releases that heat plus the work into the room. With the door open, it adds net heat to the kitchen.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Entropy without calculus',
    image: 'thermo-free-expansion',
    bullets: [
      '**Entropy** describes how energy is spread among the possible microscopic arrangements.',
      'For an **isolated** combined system, total entropy ==cannot decrease==.',
      'A **reversible** process is an ideal limit with no total entropy production.',
      '**Friction** and heat flow across a finite temperature difference make processes **irreversible**.',
    ],
    callout: 'In free expansion, gas spreads into the empty bulb and never gathers back by itself.',
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Is each process irreversible in practice, or an ideal reversible limit?',
    bins: ['Irreversible', 'Ideal reversible limit'],
    items: [
      ['A book slides to a stop because of friction', 0],
      ['Hot coffee cools in a room', 0],
      ['Gas rushes into an empty container', 0],
      ['An infinitely slow, frictionless compression', 1],
      ['Ink spreads through a glass of water', 0],
    ],
    explanation:
      'Friction, heat flow across a temperature difference, free expansion, and mixing all produce entropy. Only the idealized frictionless, infinitely slow process is reversible.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Reason about devices',
    image: 'thermo-carnot-engine',
    caption:
      'A **heat engine** takes heat from a hot reservoir, delivers **work**, and ==rejects the rest== to a cold reservoir.',
    bullets: [
      'Over a full cycle: **heat input = work output + heat rejected**.',
      'No cyclic engine between two reservoirs turns **all** of its heat input into work.',
      'Division B uses energy balances, ratios, and reasoning; no logarithmic entropy calculations.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: engine energy balance',
    problem:
      'An engine receives **500 J** of heat and delivers **150 J** of useful work. The working substance returns to its starting state.',
    steps: [
      'A complete cycle has **no net change** in internal energy.',
      'So **heat input = work output + heat rejected**.',
      'Subtract: 500 − 150 = **350 J**.',
    ],
    conclusion: 'The engine rejects ==350 J== to the cold reservoir.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'An engine takes in 800 J of heat per cycle and rejects 600 J. How much work does it deliver per cycle, in joules?',
    answer: 200,
    tolerance: 1,
    unit: 'J',
    explanation: 'Work = heat input − heat rejected = 800 J − 600 J = 200 J.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'The engine in the worked example takes in 500 J and delivers 150 J of work. What fraction of its heat input becomes work? Give a percent.',
    answer: 30,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Work ÷ heat input = 150 ÷ 500 = 0.30, which is 30%.',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'An inventor claims an engine turns 1000 J of heat into 1000 J of work every cycle. Your verdict?',
    options: [
      'Possible, because energy is conserved',
      'Impossible, because some heat must be rejected',
      'Possible only if the engine is very large',
      'Impossible, because energy is destroyed',
    ],
    answer: 1,
    explanation:
      'The claim satisfies energy conservation but breaks the second law: a cyclic engine must reject some heat to a colder reservoir.',
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['System', 'The part of the world chosen for study'],
      ['Surroundings', 'Everything outside the chosen system'],
      ['Irreversible', 'Cannot be undone without a net change elsewhere'],
      ['Heat engine', 'Turns part of its heat input into work in a cycle'],
    ],
    explanation:
      'These four terms are the vocabulary for second-law reasoning: draw the boundary, then track heat, work, and entropy across it.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Energy is conserved, but the **second law** sets the direction: heat flows **hot to cold** on its own.',
      'A **refrigerator** moves heat uphill only with **work**, and it warms the room.',
      'Total entropy of an isolated system ==never decreases==; friction and mixing are **irreversible**.',
      'For an engine cycle, **heat in = work out + heat rejected**, and the rejected heat is never zero.',
    ],
  },
  {
    kind: 'open',
    prompt:
      'A friend says a refrigerator breaks the second law because it makes heat flow from cold to hot. Explain why it does not.',
    model:
      'The second law says heat does not flow from cold to hot on its own. A refrigerator uses electrical work to move the heat, and it releases that heat plus the work into the room. Counting the surroundings, total entropy still increases.',
  },
]);

export const decks: Deck[] = [
  ...divisionCDecks.filter((deck) => shared.includes(deck.lessonId)),
  gasProcesses,
  secondLaw,
];
