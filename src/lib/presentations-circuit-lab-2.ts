import { defineDeck } from './presentation-types.ts';

// Circuit Lab (Division C) units 6–10: Kirchhoff networks, measurement and builds, LED matching
// and troubleshooting, transistors and timing, and engineering diagnostics.

const kirchhoff = defineDeck('circ-u6-l1', [
  {
    kind: 'title',
    title: 'Kirchhoff laws and network problem solving',
    subtitle: 'Conserve charge at every node and energy around every loop.',
    objectives: [
      'Apply node and loop conservation with consistent signs.',
      'Write enough independent equations to solve unknowns.',
      'Reduce networks only where it is valid.',
      'Check network power balance and limits.',
    ],
    image: 'circ-kvl',
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: at a node where a wire splits into two equal-looking branches, does current always split in half?',
    options: ['Yes', 'Only if the branches have equal resistance', 'Never', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Kirchhoff’s current law',
    image: 'circ-kcl',
    caption:
      '**KCL**: with directions assigned, the ==signed currents at a node sum to zero==. It is charge conservation in the lumped steady model.',
    bullets: [
      'Pick a convention, such as entering currents positive.',
      'KCL does not say branches get equal current.',
      'Two currents in, one out: the out current equals their sum.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'At a node, 12 mA and 8 mA enter and one branch leaves. What current, in mA, leaves?',
    answer: 20,
    tolerance: 0.01,
    unit: 'mA',
    explanation: 'With entering currents positive: 12 + 8 − Iout = 0, so Iout = 20 mA.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Kirchhoff’s voltage law',
    image: 'circ-kvl',
    caption: '**KVL**: going around a closed loop, the ==signed voltage changes sum to zero==.',
    bullets: [
      'Crossing a source from − to + is a **rise**; crossing a resistor along the assumed current is a **drop**.',
      'Keep one traversal direction for the whole loop.',
      'A negative solved current means the real direction is reversed.',
      'Never add unsigned magnitudes when sources oppose.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'A source Vs drives R₁ and R₂ in series with current I. Which loop equation is correct?',
    options: ['Vs − IR₁ − IR₂ = 0', 'Vs + IR₁ + IR₂ = 0', 'Vs = I(R₁ − R₂)', 'IR₁ = IR₂ always'],
    answer: 0,
    explanation:
      'Traverse with the current: a rise of Vs, then drops IR₁ and IR₂ around the loop back to the start.',
  },
  {
    kind: 'flow',
    section: 2,
    title: 'Writing independent equations',
    steps: [
      {
        label: 'Label',
        detail: 'Assign **node potentials** or **mesh currents** and choose a reference node.',
      },
      { label: 'Express', detail: 'Branch current from a to b through R is ==(Va − Vb)/R==.' },
      {
        label: 'Share',
        detail:
          'In mesh analysis, a shared resistor carries the **difference** of two mesh currents.',
      },
      {
        label: 'Count',
        detail:
          'Write as many ==independent== equations as unknowns; a repeated loop adds nothing.',
      },
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Why doesn’t writing the same loop equation twice help solve for a new unknown?',
    options: [
      'It repeats information, so it is not independent',
      'Kirchhoff’s laws only allow one equation',
      'Loops must always be avoided',
      'It changes the circuit',
    ],
    answer: 0,
    explanation:
      'Only independent equations add information; you need as many as there are unknowns.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Reduce before algebra, when valid',
    image: 'circ-wheatstone',
    caption:
      'In this **bridge**, the middle branch joins two nodes, so ==no resistor is simply in series or parallel== with another. It needs node or mesh equations.',
    bullets: [
      'Combine only genuine series and parallel groups.',
      'Simplification must preserve the terminal connections.',
      'An equivalent resistance alone does not answer a question about one internal branch.',
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Select every valid reduction step.',
    options: [
      'Combining two resistors that carry the same current with no branch between them',
      'Combining two resistors that connect across the same two nodes',
      'Treating any two resistors drawn next to each other as parallel',
      'Merging resistors across a node where a third branch leaves',
    ],
    answers: [0, 1],
    explanation:
      'Series needs a shared current with no branch; parallel needs the same two nodes. Drawing position means nothing.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Power and limit checks',
    bullets: [
      'Ideal resistors dissipate **I²R ≥ 0**.',
      '==Total resistor power must equal net source power== under a consistent sign convention.',
      'A negative resistance or a power mismatch usually reveals a sign error.',
      'Limits: opening a branch removes its current; a huge parallel branch leaves the other one nearly alone.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A 12 V source delivers 0.5 A to a network of ideal resistors. What total power, in watts, must the resistors dissipate?',
    answer: 6,
    tolerance: 0.01,
    unit: 'W',
    explanation:
      'Source power = VI = 12 × 0.5 = 6 W, and in an ideal network all of it is dissipated in the resistors.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: a node balance',
    problem: 'At a node, 12 mA and 8 mA enter. One branch leaves. Find its current.',
    steps: [
      'Define entering currents as **positive**.',
      'KCL: **12 + 8 − Iout = 0** mA.',
      '**Iout = 20 mA**, leaving the node.',
    ],
    conclusion:
      '==Current splitting follows conservation and the branch relations==, not equal shares.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Explaining a solution',
    bullets: [
      'Show **diagram labels, equations, substituted values, results, and checks**.',
      'Keep units on intermediate and final quantities.',
      'State source ideality and resistor assumptions.',
      'The lab’s two-resistor network ==validates the basic relations==; apply the same laws to bigger paper schematics.',
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Order a clear written network solution.',
    items: [
      'Label nodes, currents, and a reference',
      'Write independent KCL and KVL equations',
      'Solve with units',
      'Check power balance and limits',
      'State the answer with assumptions',
    ],
    explanation:
      'Labels make the algebra meaningful, and checks catch sign errors before you report.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'KCL', back: 'Signed node currents sum to zero.' },
      { front: 'KVL', back: 'Signed loop voltages sum to zero.' },
      { front: 'Mesh current', back: 'A loop variable assigned in planar analysis.' },
      { front: 'Reference node', back: 'The node chosen as zero potential.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'KCL expresses conservation of {0}, while KVL expresses conservation of {1} around a loop. Resistor dissipation is I²{2}.',
    blanks: ['charge', 'energy', 'R'],
    distractors: ['mass', 'current', 'V'],
    explanation:
      'Node currents balance because charge is conserved; loop voltages balance because energy per charge is.',
  },
  {
    kind: 'open',
    prompt:
      'Your solved network shows the resistors dissipating more power than the source supplies. What do you check?',
    model:
      'Something is wrong, because an ideal network must balance. Recheck signs in the loop equations, the assumed directions, and the arithmetic, then confirm with KCL at each node.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'KCL: charge balance at nodes. KVL: signed voltage balance around loops.',
      'Write independent equations, one per unknown.',
      '==Reduce only true series and parallel groups.==',
      'Power balance and limits catch sign mistakes.',
    ],
  },
]);

const measurement = defineDeck('circ-u7-l1', [
  {
    kind: 'title',
    title: 'Breadboards, multimeters, and a first virtual build',
    subtitle: 'Map the board, place the meter correctly, and infer an unknown from data.',
    objectives: [
      'Map breadboard connections to schematic nodes.',
      'Choose correct voltmeter, ammeter, and ohmmeter placement.',
      'Infer an unknown resistance from series measurements.',
      'Verify a build before and after energizing.',
    ],
    image: 'circ-breadboard',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which meter goes in series with the current path?',
    options: ['Voltmeter', 'Ammeter', 'Ohmmeter', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'From schematic to board',
    image: 'circ-breadboard',
    caption:
      'Each short row of holes is joined inside by a metal strip; the **central gap** separates the halves and the long **rails** carry supply.',
    bullets: [
      'Translate each schematic **node** to one connected strip.',
      'Some rails are ==split halfway==; check the actual board.',
      'Two leads of one part in the same strip ==short that part==.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Both leads of a resistor are pushed into the same connected row. What happens?',
    options: [
      'The resistor is shorted and carries no useful current',
      'The resistor works normally',
      'The resistor’s value doubles',
      'The board becomes an ammeter',
    ],
    answer: 0,
    explanation:
      'Both ends sit on one node, so there is no voltage across the resistor and the strip bypasses it.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Measuring voltage',
    image: 'circ-multimeter2',
    caption:
      'A **voltmeter** is placed ==across two nodes==. Lead polarity sets the sign of the reading.',
    bullets: [
      'Its large but finite input resistance can **load** high-resistance circuits.',
      'A negative reading may just mean reversed leads.',
      'Record the measurement points, not only the number.',
    ],
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Three meters, three placements',
    columns: ['Meter', 'Placement', 'Caution'],
    rows: [
      ['**Voltmeter**', 'Across two nodes (parallel)', 'Finite input resistance can load'],
      ['**Ammeter**', 'Inserted in the path (series)', '==Across a source it makes a short=='],
      ['**Ohmmeter**', 'Across an isolated part', 'Uses its own signal; circuit de-energized'],
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Is each meter placement correct or incorrect?',
    bins: ['Correct', 'Incorrect'],
    items: [
      ['Voltmeter leads across a resistor', 0],
      ['Ammeter connected directly across a battery', 1],
      ['Ammeter inserted into a break in the wire', 0],
      ['Ohmmeter on a powered circuit', 1],
      ['Ohmmeter on a resistor lifted out of the circuit', 0],
    ],
    explanation:
      'An ammeter has very low resistance, so across a source it is a short. Ohmmeters need de-energized, isolated parts.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Measuring resistance',
    bullets: [
      'An **ohmmeter** applies its own test signal, so use it on ==de-energized, isolated== components.',
      'Other **parallel paths** change an in-circuit reading.',
      'Measured values differ from nominal by **tolerance**, temperature, and contact resistance.',
      'An R inferred from V/I ==inherits uncertainty from both== measurements.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'A 1 kΩ resistor reads 500 Ω while still wired in the circuit. What is the most likely cause?',
    options: [
      'Another path in parallel with it',
      'The resistor became a capacitor',
      'Ohmmeters always read half',
      'The color bands faded',
    ],
    answer: 0,
    explanation:
      'A parallel path (for example another 1 kΩ) lowers the measured resistance. Lift one lead to isolate it.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: the mystery resistor',
    problem:
      'A known 100 Ω resistor has 2 V across it; an unknown in series has 4 V. Find the unknown.',
    steps: [
      'Current through the known resistor: **2/100 = 0.020 A**.',
      'In a true series path, the ==same current== passes through the unknown.',
      '**R = 4/0.020 = 200 Ω**.',
    ],
    conclusion:
      'This assumes negligible meter loading and correct topology. ==Verify nodes before blaming the resistor.==',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A known 220 Ω resistor shows 1.1 V; the unknown in series shows 3.3 V. What is the unknown, in ohms?',
    answer: 660,
    tolerance: 1,
    unit: 'Ω',
    explanation: 'I = 1.1/220 = 0.005 A; R = 3.3/0.005 = 660 Ω.',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'Build verification',
    steps: [
      {
        label: 'Inspect',
        detail: 'Check connections, **polarity**, component values, and the intended current path.',
      },
      { label: 'Predict', detail: 'Calculate the readings expected at ==named nodes==.' },
      { label: 'Measure', detail: 'Compare readings with predictions.' },
      { label: 'Isolate', detail: 'Change ==one suspected cause at a time== and remeasure.' },
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Order the steps for checking a first build.',
    items: [
      'Inspect wiring and polarity before power',
      'Predict node voltages',
      'Energize the approved low-voltage source',
      'Measure the named nodes',
      'Change one suspected cause if readings disagree',
    ],
    explanation:
      'Predictions make a discrepancy meaningful; one change at a time keeps the cause identifiable.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Breadboard node', back: 'Holes joined by one internal strip.' },
      { front: 'Meter loading', back: 'The measurement itself changes the circuit.' },
      { front: 'Tolerance', back: 'Allowed variation around the nominal value.' },
      { front: 'Divider', back: 'A series network giving an intermediate voltage.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A voltmeter connects {0} two nodes, an ammeter is placed in {1} with the path, and an ohmmeter needs a {2} circuit.',
    blanks: ['across', 'series', 'de-energized'],
    distractors: ['between', 'parallel', 'powered'],
    explanation:
      'Voltage is a difference between nodes; current must flow through the meter; resistance meters supply their own signal.',
  },
  {
    kind: 'open',
    prompt: 'Why should you check rail continuity on a breadboard before building?',
    model:
      'Some boards split the rails halfway. If you assume a continuous rail, part of the circuit may have no supply, which looks like a component fault.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Map every schematic node to a real connected strip.',
      'Voltmeter across, ammeter in series, ohmmeter on isolated parts.',
      '==Inferred values inherit measurement uncertainty.==',
      'Predict, measure, and change one thing at a time.',
    ],
  },
]);

const matching = defineDeck('circ-u8-l1', [
  {
    kind: 'title',
    title: 'LED matching, charge-time estimates, and troubleshooting',
    subtitle: 'Separate branches, honest estimates, and tests that split competing faults.',
    objectives: [
      'Give each LED branch its own current limit.',
      'Estimate charge time and state its assumptions.',
      'Trace SPDT switching for every combination.',
      'Choose measurements that discriminate faults.',
    ],
    image: 'circ-rgb-leds',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: two LEDs carry exactly the same current. Are they equally bright?',
    options: ['Always', 'Not necessarily', 'Only if the same color', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Matching LED branches',
    image: 'circ-rgb-leds',
    caption:
      'Different colors use different semiconductors, so their ==forward voltages differ==. One shared resistor cannot divide current between them reliably.',
    bullets: [
      'Give **each branch its own resistor**: R = (Vs − Vf)/I_target.',
      'Equal current is an electrical condition, ==not proof of equal brightness==.',
      'Tolerances and temperature add further differences.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'A 5.0 V supply, a blue LED with Vf = 3.0 V, and a target of 10 mA. What resistor, in ohms?',
    answer: 200,
    tolerance: 1,
    unit: 'Ω',
    explanation:
      'R = (5.0 − 3.0)/0.010 = 200 Ω. A red LED with lower Vf would need a larger resistor for the same current.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Comparing measurements',
    bullets: [
      'Record **source voltage, each branch current, Vf, and conditions**.',
      'Changing LED color changes Vf, so ==the same resistor gives a different current==.',
      'If brightness is the target, use an optical measurement.',
      'A bright on-screen LED shows modeled conduction, not a photometric result.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'A red LED (Vf ≈ 2.0 V) is swapped for a blue one (Vf ≈ 3.0 V) on the same 5 V supply and resistor. Its current…',
    options: ['Decreases', 'Increases', 'Stays the same', 'Reverses'],
    answer: 0,
    explanation: 'The resistor now has 2 V across it instead of 3 V, so I = (Vs − Vf)/R falls.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Battery charge-time estimates',
    bullets: [
      'Ideal estimate: **time = required charge ÷ current**.',
      '2 Ah at 0.5 A gives an ideal 4 hours.',
      'Real charging adds ==efficiency losses, tapering, and temperature limits==, so it takes longer.',
      'Energy needs voltage too; USB power ratings and cell Ah are not interchangeable.',
      'This is arithmetic, not a charging procedure: always use an approved charger.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'Estimate the ideal time, in hours, to supply 1.5 Ah at a constant 0.30 A.',
    answer: 5,
    tolerance: 0.01,
    unit: 'h',
    explanation: '1.5 Ah / 0.30 A = 5.0 h. Tapering and losses can make the real time longer.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Two-location switching',
    image: 'circ-3way',
    caption:
      'Two SPDT switches joined by **traveler** wires. The lamp is on only when the chosen contacts form ==one continuous path==.',
    bullets: [
      'Trace continuity for all **four** switch combinations.',
      'Up or down position alone does not tell you the state.',
      'This is a conceptual low-voltage exercise, not household wiring guidance.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'In the two-SPDT arrangement, the lamp is on. One switch is flipped. What happens?',
    options: [
      'The lamp turns off',
      'The lamp stays on',
      'Both switches must flip to change it',
      'The source shorts',
    ],
    answer: 0,
    explanation:
      'Flipping either switch moves its common terminal to the other traveler, breaking the continuous path. The circuit behaves like XOR or XNOR logic.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'From truth table to circuit',
    bullets: [
      'Start from the **desired inputs and output**, simplify an expression, then choose gates.',
      'Trace the real logic path for every input combination.',
      'A circuit that ==works for three rows but fails the fourth is wrong==.',
      'A switch input must have a defined level; a **floating input** is undefined.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which problems can an ideal Boolean model NOT reveal?',
    options: [
      'A floating input',
      'Contact bounce',
      'A wrong truth-table row',
      'A missing inversion in the expression',
    ],
    answers: [0, 1],
    explanation:
      'Logic errors show up in the Boolean model; floating inputs and bounce are electrical effects it omits.',
  },
  {
    kind: 'compare',
    section: 5,
    title: 'Discriminating faults',
    columns: ['Observation', 'Points toward', 'Next test'],
    rows: [
      [
        'Source correct, all current zero',
        '**Open path or reversed polarity**',
        'Measure node voltages along the path',
      ],
      [
        'Voltage collapses under load',
        '**Source limitation**',
        'Compare loaded and unloaded voltage',
      ],
      [
        'One branch dim, others fine',
        'Wrong resistor or LED in that branch',
        '==Change one part and predict the result first==',
      ],
    ],
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: an honest estimate',
    problem: 'Estimate the ideal time for 1.5 Ah supplied at a constant 0.30 A.',
    steps: [
      'Use **charge ÷ current** with compatible units (Ah and A).',
      '1.5 / 0.30 = **5.0 h**.',
      'State that ==tapering and losses can extend real time==.',
    ],
    conclusion: 'This is an estimate, not a charging procedure.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Traveler', back: 'An alternative path between switch contacts.' },
      { front: 'Charge capacity', back: 'Charge stored or delivered under stated conditions.' },
      { front: 'Floating input', back: 'An input with no defined electrical level.' },
      { front: 'Fault isolation', back: 'Tests that separate competing failure causes.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Each LED branch needs its own {0}. Ideal charge time is charge divided by {1}, and real charging usually takes {2}.',
    blanks: ['resistor', 'current', 'longer'],
    distractors: ['capacitor', 'voltage', 'shorter'],
    explanation:
      'Different Vf values need separate current control, and losses and tapering stretch real charging.',
  },
  {
    kind: 'open',
    prompt:
      'What measurement would tell a weak source apart from an open connection in a dark circuit?',
    model:
      'Measure the source voltage with and without load. A weak source sags under load; with an open connection the source stays at full voltage but no current flows.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Separate resistors for LEDs with different Vf.',
      'Charge ÷ current gives an ideal time; real charging is slower.',
      '==Trace every switch combination for continuity.==',
      'Pick tests that split hypotheses, one change at a time.',
    ],
  },
]);

const transistors = defineDeck('circ-u9-l1', [
  {
    kind: 'title',
    title: 'Transistors, op-amps, storage, and timing',
    subtitle: 'Device models, feedback, stored state, and the clock edge.',
    objectives: [
      'Interpret BJT operating regions and their assumptions.',
      'Use ideal op-amp feedback with its conditions.',
      'Distinguish combinational and sequential logic.',
      'Read a timing diagram around the clock edge.',
    ],
    image: 'circ-transistors',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: does an op-amp always force its two inputs to 0 V?',
    options: ['Yes', 'No', 'Only with positive feedback', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'BJT models',
    image: 'circ-transistors',
    caption:
      'A **bipolar transistor** has base, collector, and emitter terminals. Packages differ, but the operating ==regions== matter more than the case.',
    bullets: [
      'In the **forward-active** region, Ic ≈ β·Ib, but β varies with device and conditions.',
      '**Saturation** and **cutoff** need different models.',
      'The 0.7 V base–emitter value is an approximation, not a constant.',
      '**Biasing** sets an operating point so a signal stays in the intended region.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'In the forward-active region, β = 100 and the base current is 50 μA. Estimate the collector current in mA.',
    answer: 5,
    tolerance: 0.01,
    unit: 'mA',
    explanation:
      'Ic ≈ β·Ib = 100 × 50 μA = 5000 μA = 5 mA, valid only while the transistor stays in the active region.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Transistors implement gates',
    bullets: [
      'Transistors build logic by ==controlling conducting paths==.',
      '**CMOS** gates combine complementary devices; BJT logic uses other arrangements.',
      'Input capacitance, resistance, and switching time affect **speed and power**.',
      'A truth table does not describe a gate’s whole electrical behavior.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Two gates have identical truth tables. What can still differ between them?',
    options: [
      'Switching speed and power use',
      'The logical output for some input',
      'The number of input combinations',
      'Nothing at all',
    ],
    answer: 0,
    explanation:
      'The truth table fixes logic only; the transistor implementation sets delay, power, and input loading.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Op-amps with negative feedback',
    image: 'circ-opamp-noninv',
    caption:
      'A **noninverting amplifier**: gain = 1 + R₂/R₁. With stable negative feedback in the linear region, the two inputs sit at ==nearly equal voltages==.',
    bullets: [
      'Ideal: huge open-loop gain, negligible input current.',
      'The **virtual short** is not a wire and fails in **saturation**.',
      'Real op-amps are limited by supply rails and bandwidth.',
    ],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'The inverting amplifier',
    image: 'circ-opamp-inv',
    caption:
      'Here the + input is grounded, so feedback holds the − input near 0 V (a **virtual ground**) and gain = ==−Rf/Rin==.',
    bullets: ['Derive gain from the feedback network, not from a slogan about zero volts.'],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'An ideal noninverting amplifier has Rf = 9 kΩ and Rg = 1 kΩ. A 0.10 V input gives what output, in volts?',
    answer: 1,
    tolerance: 0.01,
    unit: 'V',
    explanation:
      'Gain = 1 + 9/1 = 10, so Vout = 10 × 0.10 = 1.0 V, if the supply and bandwidth allow.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Combinational versus sequential',
    columns: ['Feature', 'Combinational', 'Sequential'],
    rows: [
      ['Output depends on', 'Current inputs only', 'Inputs **and stored state**'],
      ['Example', 'Adder, multiplexer', '**Latch, flip-flop**, counter'],
      ['Timing', 'Propagation delay', '==Setup, hold, clock edge=='],
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'An edge-triggered D flip-flop’s output changes…',
    options: [
      'Only around the active clock edge, copying D at that moment',
      'Every time D changes',
      'Only when the power is switched on',
      'Whenever the clock is high',
    ],
    answer: 0,
    explanation:
      'It samples D at the active edge (respecting setup and hold); a level-sensitive latch can follow D while enabled.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Timing evidence',
    image: 'circ-rc',
    caption:
      'Real signals take time to settle: a capacitor charging through a resistor reaches 63% after one **time constant τ = RC**.',
    bullets: [
      'Align **input, clock, and output** time axes.',
      'Mark the active edge and when the output may respond.',
      'Changes too close to the edge violate **setup and hold**.',
      'Ideal simulators omit metastability and analog settling.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A 10 kΩ resistor charges a 100 μF capacitor. What is the time constant τ = RC, in seconds?',
    answer: 1,
    tolerance: 0.01,
    unit: 's',
    explanation:
      'τ = 10 000 Ω × 0.000100 F = 1.0 s. After about 5τ the capacitor is essentially fully charged.',
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Order the layers of circuit reasoning from physical to behavioral.',
    items: [
      'Physical device',
      'Operating regime',
      'Circuit network',
      'Logical function',
      'Timing behavior',
    ],
    explanation:
      'Each layer needs its own evidence. A Boolean lab speaks only to the logical function.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: ideal gain and its limits',
    problem: 'An ideal noninverting amplifier has Rf = 9 kΩ and Rg = 1 kΩ. Predict the gain.',
    steps: [
      'Assume **stable negative feedback** and linear operation.',
      'Gain = **1 + Rf/Rg = 10**.',
      'A 0.10 V input predicts 1.0 V output ==if supply and bandwidth permit==.',
    ],
    conclusion:
      'Ideal gain fails when the output would exceed the rails or the signal is too fast.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Bias', back: 'The DC operating point.' },
      { front: 'Saturation', back: 'An operating region limited by device conditions.' },
      { front: 'Negative feedback', back: 'Output response that reduces the input error.' },
      { front: 'Flip-flop', back: 'A clocked state-storage element.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'In the active region, collector current is about {0} times base current. A D flip-flop adds stored {1}, sampled at the clock {2}.',
    blanks: ['β', 'state', 'edge'],
    distractors: ['R', 'charge', 'level'],
    explanation:
      'Ic ≈ βIb in the active region; flip-flops remember a bit and sample it at the active edge.',
  },
  {
    kind: 'open',
    prompt: 'Why can an ideal op-amp gain formula give the wrong answer for a large input?',
    model:
      'The output cannot exceed the supply rails, so a large input drives the op-amp into saturation. Feedback stops working and the inputs are no longer equal.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'BJT relations depend on the operating region; β varies.',
      'The virtual short needs negative feedback and linear operation.',
      '==Sequential logic adds stored state and clock timing.==',
      'Match the evidence to the layer you are claiming about.',
    ],
  },
]);

const engineering = defineDeck('circ-u10-l1', [
  {
    kind: 'title',
    title: 'Engineering applications and diagnostic thinking',
    subtitle: 'Systems, requirements, tradeoffs, and a repeatable way to find faults.',
    objectives: [
      'Connect circuit concepts to sensing and processing systems.',
      'Write measurable requirements.',
      'Plan diagnostic tests that split hypotheses.',
      'Communicate evidence and limitations.',
    ],
    image: 'circ-arduino',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: ten repeated readings all agree. Are they accurate?',
    options: ['Yes', 'Not necessarily', 'Only if digital', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'System layers',
    image: 'circ-arduino',
    caption:
      'A microcontroller board ties together **sensors, power, processing, communication, and actuators**.',
    bullets: [
      'A **sensor** converts a physical quantity to an electrical signal; **calibration** makes it meaningful.',
      'Digital processing ==does not remove analog input uncertainty==.',
      'A display can faithfully show a wrongly calibrated voltage.',
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Order the path of a measurement through a sensing system.',
    items: [
      'Physical quantity',
      'Sensor',
      'Signal conditioning',
      'Digital processing',
      'Display or actuator',
    ],
    explanation:
      'Identify each layer and its units before blaming the whole system for a wrong output.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Requirements',
    bullets: [
      'Define **measurable** goals: current range, energy use, response time, allowable error.',
      'A requirement is ==not a preferred part or an aesthetic choice==.',
      'Compare designs under the same conditions and test method.',
      'Working once at room temperature is not universal reliability.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Is each statement a measurable requirement or not?',
    bins: ['Measurable requirement', 'Not a requirement'],
    items: [
      ['Output current stays between 10 and 20 mA', 0],
      ['Use the blue LED because it looks nicer', 1],
      ['Responds within 50 ms of a button press', 0],
      ['Draws less than 0.5 W from a 5 V supply', 0],
      ['Should be a good circuit', 1],
    ],
    explanation: 'Requirements state a quantity, a limit, and conditions that a test can check.',
  },
  {
    kind: 'flow',
    section: 2,
    title: 'A diagnostic sequence',
    steps: [
      { label: 'Expect', detail: 'State **expected** and **observed** behavior.' },
      { label: 'Hypothesize', detail: 'List a short set of ==competing causes==.' },
      { label: 'Basics', detail: 'Verify **power and references** first.' },
      { label: 'Split', detail: 'Measure an intermediate node that ==divides the hypotheses==.' },
      { label: 'Act', detail: 'Replace a part only when evidence supports it; keep the baseline.' },
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'A logic output is wrong. Which test best splits “wrong truth table” from “wiring fault”?',
    options: [
      'Measure the gate’s actual inputs and output for one row and compare with the intended table',
      'Replace every gate at once',
      'Rewrite the truth table from memory',
      'Increase the supply voltage',
    ],
    answer: 0,
    explanation:
      'If the gate receives the right inputs but the design table is wrong, the fault is logical; if the inputs are wrong, check the wiring.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Measurement quality',
    columns: ['Idea', 'What it gives', 'Limit'],
    rows: [
      ['**Repeatability**', 'Agreement among readings', '==Does not remove a shared bias=='],
      ['**Calibration**', 'Accuracy against a known reference', 'Only for the tested range'],
      ['**Prediction**', 'Model output', 'Not independent validation'],
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Virtual lab results agree with Ohm’s law perfectly. What does that show?',
    options: [
      'The simulator implements the stated equations; it is not experimental confirmation',
      'Ohm’s law is proven for every component',
      'Real resistors have zero tolerance',
      'No measurement is ever needed',
    ],
    answer: 0,
    explanation:
      'Simulated values come from the model equations, so agreement checks the code, not nature.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: a power tradeoff',
    problem: 'At a fixed 6 V, compare 300 Ω and 600 Ω loads.',
    steps: [
      'Currents: 6/300 = **20 mA** and 6/600 = **10 mA**.',
      'Powers: 6 × 0.020 = **0.12 W** and 6 × 0.010 = **0.06 W**.',
      'Lower current halves dissipation here but ==may not meet the load’s requirement==.',
    ],
    conclusion: 'A tradeoff only makes sense against a defined purpose.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'At a fixed 6 V, what power, in watts, does a 300 Ω load dissipate?',
    answer: 0.12,
    tolerance: 0.001,
    unit: 'W',
    explanation: 'P = V²/R = 36/300 = 0.12 W.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Communicating a result',
    bullets: [
      'Include **intended function, schematic, model, measurements, uncertainty, and conclusion**.',
      'Show ==the observation that rejects the nearest alternative==.',
      'Separate data from calculated expectations.',
      'Troubleshooting is a ==repeatable process for reducing uncertainty==.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Select everything a good troubleshooting hand-off should contain.',
    options: [
      'Schematic with labeled nodes',
      'Expected and observed values with units',
      'Hypotheses tested and their results',
      'Only the final verdict',
    ],
    answers: [0, 1, 2],
    explanation:
      'Another person must be able to reproduce the tests and see the remaining uncertainty.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Calibration', back: 'Comparison with a suitable reference.' },
      { front: 'Requirement', back: 'A measurable performance target.' },
      { front: 'Systematic bias', back: 'A consistent offset in measurements.' },
      { front: 'Tradeoff', back: 'Improving one goal at a cost to another.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Repeated readings reduce random variation but not a {0} bias. A good diagnostic test {1} competing hypotheses, and requirements must be {2}.',
    blanks: ['systematic', 'separates', 'measurable'],
    distractors: ['random', 'ignores', 'decorative'],
    explanation:
      'Calibration addresses bias; discriminating tests narrow causes; requirements need testable targets.',
  },
  {
    kind: 'open',
    prompt: 'Why should a diagnosis start by checking power and reference connections?',
    model:
      'Many symptoms downstream share one cause: a missing supply or reference. Checking it first rules out a common failure quickly before deeper tests.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Identify each system layer and its units.',
      'Requirements are measurable targets under stated conditions.',
      '==Choose tests that split hypotheses; keep a baseline.==',
      'Report data, uncertainty, and the evidence against alternatives.',
    ],
  },
]);

export const circuitDecksNetworks = [kirchhoff, measurement, matching, transistors, engineering];
