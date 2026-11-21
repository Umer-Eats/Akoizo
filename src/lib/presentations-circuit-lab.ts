import { defineDeck, type Deck } from './presentation-types.ts';
import { circuitDecksNetworks } from './presentations-circuit-lab-2.ts';

// Circuit Lab (Division C) presentations. Each deck follows its lesson in the Circuit Lab course
// section by section (`section` is the lesson section index); units 6–10 are in
// presentations-circuit-lab-2.ts.

const electrostatics = defineDeck('circ-u1-l1', [
  {
    kind: 'title',
    title: 'Electrostatics, historical ideas, and event reasoning',
    subtitle: 'Charge, force, field, and potential: the ideas underneath every circuit.',
    objectives: [
      'Apply Coulomb’s law with direction.',
      'Distinguish electric field, force, and potential.',
      'Connect historical experiments to the quantities they measured.',
      'Organize a circuit reference sheet.',
    ],
    image: 'circ-field-lines',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: a charged balloon attracts a neutral piece of paper. Is the paper charged?',
    options: [
      'Yes, it must be oppositely charged',
      'No, it can still be attracted',
      'Only if it touches',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Charge is conserved',
    bullets: [
      'Charge comes in **positive** and **negative** forms and is **conserved** in an isolated system.',
      'Ordinary charging ==moves electrons==; it does not create protons.',
      'Like charges repel and unlike charges attract.',
      '**Conductors** let charge redistribute; **insulators** hold it in place.',
      '**Polarization** lets a neutral object be attracted, so attraction does not prove opposite net charge.',
    ],
    callout:
      'Start every problem with a diagram: objects, signs, distances, and the system boundary.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A rubbed rod attracts a neutral scrap of foil. What is the best explanation?',
    options: [
      'The rod polarizes the foil, pulling its near side closer',
      'The foil must carry the opposite net charge',
      'Rubbing created new protons on the rod',
      'Charge was destroyed in the foil',
    ],
    answer: 0,
    explanation:
      'The rod shifts charge within the neutral foil. The nearer, opposite side is pulled harder than the far side is pushed, so the foil is attracted with zero net charge.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Force and field',
    image: 'circ-field-lines',
    caption:
      'Coulomb’s law: **F = k|q₁q₂|/r²** along the line between point charges. Field lines show the direction a positive test charge would be pushed.',
    bullets: [
      'The **electric field** is force per positive test charge, so it belongs to the source charges.',
      'Field contributions ==add as vectors==.',
      'A **negative** test charge feels a force opposite the field.',
      'Convert μC and cm to C and m first; squared distance magnifies errors.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'Two point charges attract with 36 N. Their separation triples and the charges stay the same. What is the new force magnitude in newtons?',
    answer: 4,
    tolerance: 0.01,
    unit: 'N',
    explanation:
      'F ∝ 1/r². Tripling r multiplies r² by 9, so the force becomes 36/9 = 4 N. It is still attractive, because direction depends on the signs.',
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Force, field, and potential',
    columns: ['Quantity', 'What it is', 'Watch out'],
    rows: [
      ['Force', 'Interaction on one charge (N)', 'Depends on the test charge'],
      ['Field', '**Force per charge** (N/C), a vector', 'Contributions add as vectors'],
      ['Potential', '**Energy per charge** (V), a scalar', 'Zero is a ==chosen reference=='],
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt: 'Select every true statement about electric potential.',
    options: [
      'It is energy per charge, measured in volts',
      'It is a vector that adds head to tail',
      'A point can have zero net field but nonzero potential',
      'A charge q crossing a difference ΔV changes energy by qΔV',
    ],
    answers: [0, 2, 3],
    explanation:
      'Potential is a scalar. Between two equal positive charges the fields cancel at the midpoint, but the positive potentials add.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Measuring the force',
    image: 'circ-coulomb-balance',
    caption:
      'Coulomb’s **torsion balance** (1785) measured the tiny twist of a wire as two charged balls repelled, revealing the inverse-square law.',
    bullets: [
      'Volta: electrochemical **sources**. Ohm: the **resistance** relation.',
      'Ampère: current and magnetism. **Kirchhoff**: network laws.',
      'Hertz: electromagnetic waves. **Joule**: electrical heating and energy.',
      '==Learn the physical contribution==, not only the surname.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each scientist to the contribution.',
    pairs: [
      ['Coulomb', 'Inverse-square force between charges'],
      ['Volta', 'Electrochemical source of potential difference'],
      ['Ohm', 'Relation between voltage, current, and resistance'],
      ['Kirchhoff', 'Node and loop laws for networks'],
      ['Joule', 'Energy transferred as heat by current'],
    ],
    explanation:
      'Each name connects to one measurable idea. Historical models used their own instruments and assumptions; modern units let us compare them.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Safety and a good reference',
    bullets: [
      '**Static discharge** can damage electronics even when you feel little shock.',
      'Use approved ESD precautions and ==supervised low-voltage equipment== only; never mains wiring.',
      'A useful reference groups **definitions, units, diagrams, and worked problems**.',
      'Write the assumptions beside each equation.',
      'The event rules, not this course, set format, tools, and scoring.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Which reference-sheet entry is most useful in a timed event?',
    options: [
      'An equation with units, assumptions, and one checked example',
      'A long paragraph copied from a textbook',
      'A list of scientists’ birth years',
      'An equation with no units so it fits more',
    ],
    answer: 0,
    explanation:
      'Units and assumptions tell you when an equation applies, and a checked example lets you test your substitution quickly.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: evidence first',
    problem:
      'Two point charges keep their values while their separation triples. Predict the force.',
    steps: [
      'Use **F ∝ 1/r²**; the charges and k are unchanged.',
      'Replacing r with 3r multiplies the denominator by **nine**.',
      'The new magnitude is F/9; attraction or repulsion is unchanged.',
    ],
    conclusion:
      '==Direction depends on signs, not distance.== Doubling distance would quarter the force.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Respect each model’s limits',
    bullets: [
      'Identify what is measured, what is asked, and what stays fixed.',
      'Draw vector directions before arithmetic and **estimate the scale** of the answer.',
      'The DC lab models ==sustained charge motion== in a loop, not isolated point charges.',
      'Extended charge distributions need more than one point-charge formula.',
    ],
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Field', back: 'Force per positive test charge.' },
      { front: 'Potential', back: 'Electric potential energy per charge.' },
      { front: 'Polarization', back: 'Redistribution of charge within a material.' },
      { front: 'Conductor', back: 'Material with mobile charge carriers.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Electric field is force per {0}, while potential is energy per charge measured in {1}. A negative charge feels a force {2} the field.',
    blanks: ['charge', 'volts', 'opposite'],
    distractors: ['mass', 'amperes', 'along'],
    explanation:
      'Field is a vector force per charge; potential is a scalar in volts. F = qE, so a negative q reverses the force.',
  },
  {
    kind: 'open',
    prompt: 'Explain why a point can have zero electric field but a nonzero potential.',
    model:
      'Field is a vector, so equal opposite contributions cancel. Potential is a signed scalar, so contributions from like charges add instead of cancelling.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Charge is conserved; charging moves electrons.',
      'Coulomb force follows an inverse-square law with direction set by signs.',
      '==Field is a vector; potential is a scalar with a chosen zero.==',
      'Learn each historical name by its physical contribution.',
    ],
  },
]);

const quantities = defineDeck('circ-u2-l1', [
  {
    kind: 'title',
    title: 'Current, voltage, resistance, power, and energy',
    subtitle: 'Track charge and energy separately, and every circuit quantity falls into place.',
    objectives: [
      'Define current, voltage, resistance, and power with units.',
      'Convert between joules, watt-hours, and ampere-hours carefully.',
      'Distinguish DC from AC and what RMS means.',
      'Check answers with proportional reasoning.',
    ],
    image: 'circ-resistors',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: does a resistor “use up” current?',
    options: [
      'Yes, less current leaves it',
      'No, the same current leaves it',
      'Only in AC',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Current is charge flow',
    bullets: [
      '**Current** I = Δq/Δt; one **ampere** is one coulomb per second.',
      '**Conventional current** follows positive-charge motion; electrons in a metal drift the opposite way.',
      '==Charge is not used up== by a resistor.',
      'In a steady series path, equal current enters and leaves each element; ==energy== is what changes form.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'A steady current carries 12 C past a point in 4.0 s. What is the current in amperes?',
    answer: 3,
    tolerance: 0.01,
    unit: 'A',
    explanation: 'I = Δq/Δt = 12 C / 4.0 s = 3.0 A.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Voltage is a difference',
    bullets: [
      '**Voltage** is energy change per charge between ==two points==.',
      'A **source** maintains a potential difference; a resistor’s **voltage drop** is energy transferred per charge.',
      'A multimeter always measures a difference, even with one lead called ground.',
      'In a low-voltage schematic, **ground** is often just the chosen reference node.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Why is “the voltage at point P” incomplete without more information?',
    options: [
      'Voltage is defined between two points, so a reference is needed',
      'Voltage only exists inside batteries',
      'Voltage depends on the wire color',
      'Voltage is the same everywhere in a circuit',
    ],
    answer: 0,
    explanation:
      'A node voltage is always relative to a reference node, often the one labeled ground.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Resistance and conductance',
    image: 'circ-resistors',
    caption:
      'For an **ohmic** resistor, **V = IR**. The color bands give a nominal value and tolerance, not a promise of linear behavior everywhere.',
    bullets: [
      'Resistance depends on **material, geometry, and temperature**.',
      '**Conductance** G = 1/R, measured in siemens.',
      'LEDs and other semiconductors are ==nonlinear==, so one V/I ratio does not describe them.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Is each statement about resistance true or false?',
    bins: ['True', 'False'],
    items: [
      ['V = IR holds for an ideal resistor in its operating range', 0],
      ['Every component has one fixed resistance at all voltages', 1],
      ['Conductance is the reciprocal of resistance', 0],
      ['A resistor’s value can change with temperature', 0],
      ['An LED obeys V = IR with a constant R', 1],
    ],
    explanation:
      'Ohm’s law describes ohmic elements in a fixed regime. Semiconductor devices such as LEDs are nonlinear.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Power and energy',
    bullets: [
      '**Power** P = VI; for an ideal resistor P = I²R = V²/R.',
      '**Energy** at constant power is E = Pt: joules measure energy, ==watts measure its rate==.',
      'A **watt-hour** is an energy unit: 1 Wh = 3600 J.',
      'Battery **ampere-hours** measure ==charge==, not energy, unless voltage and conditions are known.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt: 'Convert 2.0 Wh to joules.',
    answer: 7200,
    tolerance: 1,
    unit: 'J',
    explanation: '1 Wh = 1 W × 3600 s = 3600 J, so 2.0 Wh = 7200 J.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'DC and AC',
    columns: ['Feature', 'DC', 'AC'],
    rows: [
      ['Direction', '**One direction** (magnitude may vary)', '**Periodically reverses**'],
      ['Typical model', 'Steady value', 'Sinusoid with frequency'],
      ['Effective value', 'The value itself', '**RMS** = heating-equivalent value'],
      ['In this course’s lab', 'Modeled', '==Not modeled==: no phase or impedance'],
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'What does the RMS value of an AC voltage describe?',
    options: [
      'The steady DC value that would produce the same heating',
      'The arithmetic average of the signed voltage',
      'The peak voltage',
      'The frequency of the signal',
    ],
    answer: 0,
    explanation:
      'The signed average of a sinusoid is zero, so RMS is used instead: it matches the heating effect of a DC value.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: current, power, energy',
    problem: 'A 6 V source drives a 300 Ω resistor for 60 s. Find current, power, and energy.',
    steps: [
      '**I** = V/R = 6/300 = 0.020 A.',
      '**P** = VI = 6 × 0.020 = 0.120 W.',
      '**E** = Pt = 0.120 × 60 = 7.20 J.',
    ],
    conclusion: '==Track charge flow separately from energy transfer.==',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Reasonableness checks',
    bullets: [
      'At **fixed R**, doubling V doubles I and ==quadruples P==.',
      'At **fixed V**, doubling R halves both I and P.',
      'The constraint explains apparently conflicting proportionalities.',
      'In an ideal network, **source power equals total resistor dissipation**.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'At fixed resistance, the voltage across a resistor doubles. The power it dissipates…',
    options: ['Quadruples', 'Doubles', 'Halves', 'Stays the same'],
    answer: 0,
    explanation: 'P = V²/R, so doubling V multiplies P by four.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Current', back: 'Charge flow rate, in amperes.' },
      { front: 'Voltage', back: 'Energy difference per charge, in volts.' },
      { front: 'Power', back: 'Energy transfer rate, in watts.' },
      { front: 'Watt-hour', back: 'An energy unit equal to 3600 J.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'One ampere is one {0} per second. A watt-hour measures {1}, while an ampere-hour measures {2}.',
    blanks: ['coulomb', 'energy', 'charge'],
    distractors: ['joule', 'power', 'voltage'],
    explanation: 'An ampere-hour is 3600 C of charge; a watt-hour is 3600 J of energy.',
  },
  {
    kind: 'open',
    prompt: 'Why is an ampere-hour rating alone not enough to know a battery’s stored energy?',
    model:
      'Ampere-hours measure charge. Energy also depends on the voltage at which that charge is delivered and on discharge conditions such as rate and temperature.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Current is charge per time; charge is conserved, energy changes form.',
      'Voltage is always a difference between two points.',
      '**P = VI; energy = power × time.**',
      'Check answers against what is held fixed.',
    ],
  },
]);

const topology = defineDeck('circ-u3-l1', [
  {
    kind: 'title',
    title: 'Diagrams, nodes, series, parallel, and Ohm’s law',
    subtitle: 'Read connections, not pictures, and reduce networks one true step at a time.',
    objectives: [
      'Identify topology from nodes.',
      'Calculate series and parallel equivalent resistance.',
      'Interpret open and short circuits.',
      'Recover branch currents and check power.',
    ],
    image: 'circ-parallel',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: two resistors drawn side by side are…',
    options: [
      'Always in parallel',
      'Parallel only if they share both nodes',
      'Always in series',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Reading a schematic',
    bullets: [
      'A **schematic** shows electrical connections, not physical layout.',
      'All wire joined at one ideal **node** shares ==one potential==.',
      'A crossing is a connection only when the drawing convention (a dot) says so.',
      'Label polarity, values, and assumed current directions; a ==negative answer just means the other direction==.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'You solve for a branch current and get −0.02 A. What does this mean?',
    options: [
      'The actual current flows opposite your assumed arrow',
      'Your analysis is invalid',
      'The resistor is producing energy',
      'The branch is open',
    ],
    answer: 0,
    explanation:
      'An assumed direction is just a sign convention; the negative sign reports the real direction.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Series paths',
    bullets: [
      'Series elements carry the **same current** when no branch leaves their shared node.',
      'Resistances add: **Req = R₁ + R₂**.',
      'Voltage divides ==in proportion to resistance==: the larger resistor drops more.',
      'Loading a divider output with a new branch ==changes the voltages==.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A 9 V source drives 100 Ω and 200 Ω in series. What voltage, in volts, appears across the 200 Ω resistor?',
    answer: 6,
    tolerance: 0.01,
    unit: 'V',
    explanation: 'I = 9/300 = 0.030 A; V = 0.030 × 200 = 6 V. Equivalently, 200/300 of 9 V.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Parallel branches',
    image: 'circ-parallel',
    caption:
      'Parallel elements connect across the **same two nodes** and share one voltage. ==Currents add, and conductances add.==',
    bullets: [
      '**1/Req = 1/R₁ + 1/R₂**; Req is smaller than any branch.',
      'The **lower-resistance branch** carries more current.',
      'Current splits equally only when branch resistances are equal.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'What is the equivalent resistance of 100 Ω in parallel with 100 Ω, in ohms?',
    answer: 50,
    tolerance: 0.1,
    unit: 'Ω',
    explanation:
      '1/Req = 1/100 + 1/100 = 2/100, so Req = 50 Ω. Two equal branches halve the resistance.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Open and short',
    columns: ['Case', 'Current', 'Voltage across it'],
    rows: [
      ['Ideal **open**', 'Zero', '==Can be nonzero=='],
      ['Ideal **short**', 'Set by the rest of the circuit', 'Negligible'],
      [
        'Short across an ideal source',
        'Unphysically unlimited',
        'Real sources are limited and may be damaged',
      ],
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'An open switch sits in series with a lamp and a 6 V source. The voltage across the open switch is…',
    options: ['About 6 V', '0 V', 'Infinite', 'Equal to the lamp’s voltage when lit'],
    answer: 0,
    explanation:
      'No current flows, so the lamp drops no voltage and the full source voltage appears across the open gap.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Equivalent networks',
    image: 'circ-wheatstone',
    caption:
      'A **bridge** like this one cannot be reduced by a single series or parallel step; it needs Kirchhoff analysis.',
    bullets: [
      'Reduce **true** series and parallel groups step by step, ==keeping the real nodes==.',
      'After finding source current, rebuild branch voltages and currents.',
      'Check that resistor powers sum to source power.',
    ],
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Order the steps for solving a mixed series–parallel network.',
    items: [
      'Trace and label the nodes',
      'Combine a true series or parallel group',
      'Repeat until one equivalent resistance remains',
      'Find the source current',
      'Work back to branch voltages and currents',
      'Check the power balance',
    ],
    explanation: 'Reduce, solve at the terminals, then reconstruct and verify.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: parallel pair on 6 V',
    problem: 'Find Req for 100 Ω and 300 Ω in parallel on 6 V, then the branch currents.',
    steps: [
      '1/Req = 1/100 + 1/300 = 4/300, so **Req = 75 Ω**.',
      'Total current = 6/75 = **0.080 A**.',
      'Branch currents: 6/100 = **0.060 A** and 6/300 = **0.020 A**.',
    ],
    conclusion: '==Branch currents add to the source current==: 0.060 + 0.020 = 0.080 A.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Testing the topology',
    bullets: [
      'Keep source and resistor values fixed and switch series ↔ parallel.',
      'Compare **total current, each voltage, and total power**.',
      'A very large branch resistance ==approximates an open branch==.',
      'Real wiring adds contact resistance and source limits.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Does each quantity describe resistors in series or in parallel?',
    bins: ['Series', 'Parallel'],
    items: [
      ['Same current through each', 0],
      ['Same voltage across each', 1],
      ['Voltage drops add to the total', 0],
      ['Branch currents add to the total', 1],
      ['Equivalent resistance larger than any one', 0],
      ['Equivalent resistance smaller than any one', 1],
    ],
    explanation:
      'Series shares current and adds resistance; parallel shares voltage and adds conductance.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Node', back: 'Ideally connected points at one potential.' },
      { front: 'Series', back: 'Shared current with no branching node between.' },
      { front: 'Parallel', back: 'Elements sharing the same two terminal nodes.' },
      { front: 'Equivalent resistance', back: 'Terminal voltage divided by terminal current.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Series resistors share the same {0}, while parallel resistors share the same {1}. An ideal open path carries zero {2}.',
    blanks: ['current', 'voltage', 'current'],
    distractors: ['power', 'resistance', 'charge'],
    explanation: 'These sharing rules come straight from how the nodes are connected.',
  },
  {
    kind: 'open',
    prompt:
      'Why can’t an unloaded voltage-divider formula be used after a load is connected to its output?',
    model:
      'The load is a new branch in parallel with the lower resistor. It lowers that part’s equivalent resistance, changing the current and the voltage split.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Trace nodes before naming series or parallel.',
      'Series adds resistance; parallel adds conductance.',
      '==An open switch can have voltage across it with zero current.==',
      'Reduce, solve, rebuild, and check power.',
    ],
  },
]);

const diodes = defineDeck('circ-u4-l1', [
  {
    kind: 'title',
    title: 'Switches, relays, diodes, and LEDs',
    subtitle: 'Control paths, one-way junctions, and choosing a current-limiting resistor.',
    objectives: [
      'Explain switch- and relay-controlled paths.',
      'Recognize diode polarity and nonlinear behavior.',
      'Estimate LED current with a declared model.',
      'Separate control circuits from load circuits.',
    ],
    image: 'circ-rgb-leds',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what forward voltage does every LED have?',
    options: ['0.7 V', '2 V', 'It depends on the LED and conditions', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Switches and relays control paths',
    image: 'circ-relay',
    caption:
      'A **relay**: current in the coil pulls an armature that moves a separate set of contacts, so a small control circuit can switch a load circuit.',
    bullets: [
      'A switch changes ==connectivity==, not the source.',
      '**SPST** opens or closes one path; **SPDT** connects a common terminal to one of two contacts.',
      'Real contacts have ratings, bounce, and arcing; the virtual lab uses ideal contacts.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each part to its role.',
    pairs: [
      ['SPST switch', 'Opens or closes one path'],
      ['SPDT switch', 'Connects a common terminal to either of two contacts'],
      ['Relay coil', 'Electromagnet that moves the contacts'],
      ['Relay contacts', 'Switch the separate load circuit'],
    ],
    explanation: 'A relay separates control from load, subject to its real ratings and isolation.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'A diode is not a resistor',
    image: 'circ-diode-iv',
    caption:
      'Diode I–V curves: almost no current until a knee, then a steep rise. ==No single resistance== describes this curve.',
    bullets: [
      'A **PN junction** conducts under **forward bias** and blocks under reverse bias.',
      '**Ideal model**: conducts forward, blocks reverse, no voltage drop.',
      '**Constant-drop model**: adds an approximate forward voltage.',
      'Leakage and breakdown need device data. ==State your model first.==',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Why must you declare a diode model before calculating?',
    options: [
      'Ideal, constant-drop, and detailed models predict different currents',
      'Diodes have one fixed resistance anyway',
      'The model changes the diode’s color',
      'It only matters for AC circuits',
    ],
    answer: 0,
    explanation:
      'The diode is nonlinear, so the predicted current depends on which approximation you choose.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Light-emitting diodes',
    image: 'circ-led-parts',
    caption:
      'The **longer lead is the anode** and the flat spot marks the cathode. Light comes from electronic transitions in the die while forward biased.',
    bullets: [
      'Forward voltage **Vf** depends on material, current, and temperature, ==not always 0.7 V==.',
      'A **series resistor** limits current: I ≈ (Vs − Vf)/R when Vs > Vf.',
      'Brightness has no universal current-to-light law here.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'Vs = 5 V, Vf = 2 V and R = 300 Ω. Using the constant-drop model, estimate the LED current in milliamperes.',
    answer: 10,
    tolerance: 0.1,
    unit: 'mA',
    explanation: 'The resistor gets 5 − 2 = 3 V, so I ≈ 3/300 = 0.010 A = 10 mA.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: choosing a resistor',
    problem: 'For Vs = 5 V, Vf = 2 V and R = 300 Ω, estimate the current and resistor power.',
    steps: [
      'The resistor receives **5 − 2 = 3 V**.',
      '**I ≈ 3/300 = 0.010 A**.',
      'Resistor power = 0.010² × 300 = **0.030 W**; check it against the resistor rating with margin.',
    ],
    conclusion:
      '==The result depends on the constant-drop approximation.== A negative current means the LED is not conducting.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'You want 15 mA through an LED with Vf = 2.0 V from a 5.0 V supply. What series resistance, in ohms?',
    answer: 200,
    tolerance: 1,
    unit: 'Ω',
    explanation: 'R = (Vs − Vf)/I = 3.0 V / 0.015 A = 200 Ω.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Control versus load',
    bullets: [
      'A small **control signal** can operate a transistor or relay that switches a separate **load**.',
      '==Energy still comes from the load’s supply==; the actuator creates none.',
      'Switching a coil can create **transients** that need protection in real circuits.',
      'Identify control path, load path, **common reference**, and ratings before building.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Select every true statement about a relay-switched load.',
    options: [
      'The load’s energy comes from the load supply',
      'The coil circuit supplies all the load’s energy',
      'Coil switching can cause voltage transients',
      'Isolation depends on the real device’s ratings',
    ],
    answers: [0, 2, 3],
    explanation:
      'The relay only switches; energy and isolation depend on the actual supplies and device.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Troubleshooting a dark LED',
    bullets: [
      'Suspects: **open contact, reversed LED, low supply, wrong resistor, wiring error**.',
      '==Measure node voltages== instead of swapping several parts at once.',
      'A glowing icon in a simulation shows modeled conduction, not a calibrated light measurement.',
      'A good diagnosis names the observation that would distinguish competing faults.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'A 5 V circuit with a resistor and LED stays dark. Which fault fits each measurement?',
    bins: ['Reversed LED', 'Open connection before the resistor'],
    items: [
      ['Almost the full 5 V appears across the LED', 0],
      ['0 V across both the resistor and the LED', 1],
      ['The supply node reads 5 V but the resistor input reads 0 V', 1],
      ['Swapping the LED leads makes it light', 0],
    ],
    explanation:
      'A reversed LED blocks current, so it takes the full voltage. An upstream open leaves the resistor and LED with no voltage at all.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'SPDT', back: 'Switch joining one common terminal to either of two contacts.' },
      { front: 'Forward bias', back: 'Junction orientation that favors conduction.' },
      { front: 'Vf', back: 'Forward voltage at a stated operating condition.' },
      { front: 'Current limiting', back: 'Keeping current within a safe operating range.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'An LED’s longer lead is the {0}. A series {1} limits its current, and the LED only conducts when {2} biased.',
    blanks: ['anode', 'resistor', 'forward'],
    distractors: ['cathode', 'capacitor', 'reverse'],
    explanation:
      'Current flows from anode to cathode under forward bias; the resistor sets its size.',
  },
  {
    kind: 'open',
    prompt: 'Why can’t you infer an LED’s brightness from its current alone?',
    model:
      'Light output also depends on the LED’s efficiency, color, optics, and temperature, so equal currents can give different brightness.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Switches and relays change connectivity; energy comes from the load supply.',
      'Diodes are nonlinear: declare the model.',
      '==I ≈ (Vs − Vf)/R under the constant-drop model.==',
      'Troubleshoot with node measurements, one change at a time.',
    ],
  },
]);

const logic = defineDeck('circ-u5-l1', [
  {
    kind: 'title',
    title: 'Digital logic and combinational circuits',
    subtitle: 'Truth tables, De Morgan’s laws, adders, and multiplexers.',
    objectives: [
      'Build and interpret truth tables.',
      'Apply De Morgan’s laws.',
      'Explain half and full adders.',
      'Explain multiplexers and test a design exhaustively.',
    ],
    image: 'circ-full-adder',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: is logical 1 always 5 V?',
    options: ['Yes', 'No, it depends on the technology', 'Only in OR gates', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Binary abstraction',
    bullets: [
      'Digital logic maps ==ranges of signal voltage== to abstract 0 and 1.',
      'A **truth table** lists the output for every input combination.',
      '**AND** outputs 1 only when all inputs are 1; **OR** needs at least one; **NOT** inverts.',
      'Real thresholds, timing, and noise margins depend on the device; the lab uses exact Boolean states.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each gate to when its output is 1.',
    pairs: [
      ['AND', 'All inputs are 1'],
      ['OR', 'At least one input is 1'],
      ['NOT', 'The single input is 0'],
      ['XOR', 'The two inputs differ'],
      ['NAND', 'Not all inputs are 1'],
    ],
    explanation: 'NAND is the inversion of AND; XOR is 1 for unequal inputs.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Derived and universal gates',
    bullets: [
      '**NAND** = NOT(AND); **NOR** = NOT(OR).',
      '**XOR** is 1 when inputs differ; **XNOR** is 1 when they match.',
      'NAND and NOR are **universal**: combinations of either can build any Boolean function.',
      'Universality is about expressiveness, ==not minimum delay or part count==.',
    ],
    callout: 'Write intermediate outputs when tracing a network so no inversion goes missing.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'What is XOR(1, 1)?',
    options: ['0', '1', 'Undefined', 'It depends on the supply voltage'],
    answer: 0,
    explanation: 'XOR is 1 only when the inputs differ; equal inputs give 0.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'De Morgan’s laws',
    bullets: [
      '**NOT(A AND B) = (NOT A) OR (NOT B)**.',
      '**NOT(A OR B) = (NOT A) AND (NOT B)**.',
      '==The operator flips and every input is inverted.==',
      'Parentheses matter: NOT A AND B is not NOT(A AND B).',
      'Check a transformation against all four input rows, not one convenient case.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Which expression equals NOT(A OR B)?',
    options: ['(NOT A) AND (NOT B)', '(NOT A) OR (NOT B)', 'NOT A OR B', 'A AND B'],
    answer: 0,
    explanation:
      'De Morgan: invert each input and change OR to AND. It is 1 only when both inputs are 0.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'The half adder',
    image: 'circ-half-adder',
    caption:
      'A half adder: **Sum = A XOR B** and **Carry = A AND B**. Sum and carry are different bit positions.',
    bullets: [
      'Binary 1 + 1 gives sum 0, carry 1: **10₂ = decimal 2**.',
      'A carry is not an error or a lost bit.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'The full adder',
    image: 'circ-full-adder',
    caption:
      'A full adder adds a **carry-in**: Sum = A XOR B XOR Cin, and Cout = 1 whenever ==at least two inputs are 1==.',
    bullets: [
      'Chaining adders makes carries **propagate** from bit to bit.',
      'Propagation links arithmetic to timing: outputs need time to settle.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'For each full-adder input (A, B, Cin), is the carry-out 0 or 1?',
    bins: ['Cout = 0', 'Cout = 1'],
    items: [
      ['0, 0, 1', 0],
      ['1, 1, 0', 1],
      ['1, 0, 1', 1],
      ['0, 1, 0', 0],
      ['1, 1, 1', 1],
      ['0, 0, 0', 0],
    ],
    explanation: 'Carry-out is 1 exactly when two or three of the inputs are 1.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Selection circuits',
    bullets: [
      'A 2-input **multiplexer** outputs A when S = 0 and B when S = 1.',
      'Expression: **(NOT S AND A) OR (S AND B)**.',
      'Selection ≠ OR: ==the unselected input must not affect the output==.',
      'A **decoder** maps an input code to one selected output; an encoder does the reverse mapping.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'A 2-input multiplexer has S = 1, A = 0, B = 1. What is the output?',
    options: ['1', '0', 'A OR B, always', 'Undefined'],
    answer: 0,
    explanation: 'S = 1 selects B, so the output is B = 1, whatever A is.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: 1 + 1',
    problem: 'For A = 1 and B = 1, find the half-adder sum and carry.',
    steps: [
      'Sum uses XOR: **1 XOR 1 = 0**.',
      'Carry uses AND: **1 AND 1 = 1**.',
      'Carry–sum bits are **10₂**, equal to decimal 2.',
    ],
    conclusion: '==Carry is not an error or a lost bit==; it is the next place value.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Testing a design',
    bullets: [
      '==Enumerate every input combination== for a small circuit.',
      'Compare intended and calculated output row by row, including all-zeros and all-ones.',
      'One successful trial does not validate a truth table.',
      'Real designs also need timing and electrical checks; the Boolean lab covers logic only.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt: 'How many rows does a complete truth table for a 3-input circuit need?',
    answer: 8,
    tolerance: 0,
    unit: 'rows',
    explanation: 'Each input doubles the combinations: 2³ = 8.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Truth table', back: 'Output for every input combination.' },
      { front: 'XOR', back: 'True when two inputs differ.' },
      { front: 'Universal gate', back: 'A gate type that can build any Boolean function.' },
      { front: 'Multiplexer', back: 'Selects one input using control bits.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A half adder’s sum is A {0} B and its carry is A {1} B. NAND and NOR are called {2} gates.',
    blanks: ['XOR', 'AND', 'universal'],
    distractors: ['OR', 'NOR', 'sequential'],
    explanation: 'XOR gives the sum bit, AND the carry bit; NAND and NOR can build any function.',
  },
  {
    kind: 'open',
    prompt: 'Why is testing only one or two input rows not enough to validate a logic circuit?',
    model:
      'A missing inversion or wrong branch may only show up in some rows. Only checking every combination proves the circuit matches the whole truth table.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Logic maps voltage ranges to 0 and 1; truth tables define behavior.',
      'De Morgan: flip the operator and invert every input.',
      '**Sum = A XOR B; carry = A AND B.**',
      'Test every row; a Boolean lab omits timing and analog effects.',
    ],
  },
]);

export const decks: Deck[] = [
  electrostatics,
  quantities,
  topology,
  diodes,
  logic,
  ...circuitDecksNetworks,
];
