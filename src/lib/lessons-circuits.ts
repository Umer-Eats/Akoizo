import { buildCourse } from './lesson-course-builder.ts';
import { chapter as c } from './course-authoring.ts';
export const circuitLessons = buildCourse({
  eventId: 'circuit-lab',
  eventName: 'Circuit Lab',
  prefix: 'circ',
  lab: 'circuits',
  syllabus: 'Circuit Lab B_C SciConnect Syllabus 2026 - Google Docs.pdf',
  intro:
    'Ten units develop charge, electrical quantities, DC networks, semiconductors, digital logic, measurement, and advanced circuit reasoning. Virtual builds use ideal low-voltage models. Unit 10 is enrichment; advanced-unit placement follows the supplied syllabus rather than a claim about current tournament requirements.',
  references: [
    {
      title: 'OpenStax University Physics Volume 2',
      url: 'https://openstax.org/books/university-physics-volume-2/pages/1-introduction',
    },
  ],
  chapters: [
    c(
      'Electrostatics, historical ideas, and event reasoning',
      [
        'Apply Coulomb’s law with direction.',
        'Distinguish electric field and force.',
        'Organize a circuit reference.',
      ],
      [
        [
          'Charge conservation',
          'Electric charge is conserved in an isolated system and occurs in positive and negative forms. Ordinary charging transfers electrons rather than creating protons in a material. Like charges repel and unlike charges attract. Conductors permit mobile charge to redistribute, while insulators restrict its movement. A neutral object can still be attracted through polarization, so attraction does not prove opposite net charge. Begin with a diagram showing objects, signs, distances, and the system boundary.',
        ],
        [
          'Force and field',
          'For ideal point charges, force magnitude is k|q₁q₂|/r² along their separation. Electric field is force per positive test charge, making it a property of the source configuration rather than the chosen test charge. Add field contributions as vectors. A negative test charge experiences force opposite the field direction. Convert microcoulombs and centimeters before substituting; inverse-square relations amplify distance errors. Extended charge distributions require more than treating every object as one point.',
        ],
        [
          'Potential and energy',
          'Electric potential is energy per charge, measured in volts, whereas field is force per charge. A potential difference can change a charge’s electric potential energy by qΔV. Potential is a scalar; field is a vector. Zero potential depends on a chosen reference, while potential differences drive many measurable effects. A location can have zero net field without zero potential. Distinguish vector cancellation from cancellation of signed scalar contributions.',
        ],
        [
          'Historical connections',
          'Coulomb’s force measurements, Volta’s electrochemical sources, Ohm’s resistance relation, Ampère’s current-related magnetism, Kirchhoff’s network laws, Hertz’s electromagnetic waves, and Joule’s energy experiments connect different aspects of electricity. Learn the physical contribution rather than only a surname. Historical models developed with particular instruments and assumptions. Modern units and notation provide a consistent way to compare their ideas without implying that one experiment established every present circuit concept.',
        ],
        [
          'Safety and preparation',
          'Static discharge can damage sensitive electronics even when a person feels little shock. Use approved electrostatic precautions and supervised low-voltage equipment. Never use this course to explore mains wiring or unapproved power sources. A useful reference groups definitions, units, diagrams, and worked problems, with assumptions beside equations. Applicable rules establish event format and permitted tools; the course does not invent a current scoring breakdown.',
        ],
        [
          'Evidence-first problem solving',
          'Identify what is measured, what is asked, and which quantity must remain fixed. Draw vector directions before arithmetic and estimate the result’s scale. Doubling separation should quarter a point-charge force. The DC lab begins with a voltage source and resistors; explain that it models sustained charge motion, not the isolated-charge geometry of Coulomb’s law. Connecting related concepts requires respecting the limits of each model.',
        ],
      ],
      [
        ['Field', 'Force per positive test charge.'],
        ['Potential', 'Electric potential energy per charge.'],
        ['Polarization', 'Redistribution of charge within material.'],
        ['Conductor', 'Material with mobile charge carriers.'],
      ],
      [
        'Two point charges keep their values while separation triples. Predict force.',
        [
          'Use F proportional to 1/r².',
          'Replacing r with 3r multiplies the denominator by nine.',
          'The new magnitude is F/9; attraction or repulsion is unchanged.',
        ],
        'Direction depends on signs, not distance alone.',
      ],
      [
        [
          'A negative charge’s force is…',
          'Opposite the electric field',
          ['Always with the field', 'Always zero', 'Independent of its charge'],
          'F = qE.',
        ],
        [
          'Tripling distance changes force to…',
          'One ninth',
          ['Three times', 'One third', 'Nine times'],
          'Use inverse-square scaling.',
        ],
        [
          'Neutral-object attraction can arise from…',
          'Polarization',
          ['Creation of protons', 'Loss of charge conservation', 'Only gravity'],
          'Charge redistribution can cause attraction.',
        ],
      ],
      [
        [
          'Distinguish field and potential.',
          'Field is a vector force-per-charge; potential is scalar energy-per-charge.',
        ],
        [
          'Why convert units first?',
          'The constant assumes compatible units; prefixes and squared distance otherwise produce major errors.',
        ],
        [
          'Name a useful reference feature.',
          'An equation beside its units, assumptions, and a checked example.',
        ],
        ['Does zero field imply zero potential?', 'No; vector and scalar sums can differ.'],
      ],
      [
        ['Draw', 'Mark signs and distances.'],
        ['Add', 'Combine vector fields.'],
        ['Check', 'Use units and limiting cases.'],
      ],
      [
        ['Force', 'Interaction on a charge', 'Depends on test charge.'],
        ['Field', 'Source configuration', 'Vector quantity.'],
        ['Potential', 'Energy per charge', 'Reference-dependent scalar.'],
      ],
      'Change source voltage in the DC model. Explain why Ohm’s law, rather than Coulomb’s two-point-charge formula, describes its steady current.',
      'Choose a model that matches the measured quantity and geometry.',
    ),
    c(
      'Current, voltage, resistance, power, and energy',
      [
        'Track charge and energy separately.',
        'Convert electrical units.',
        'Distinguish DC and AC.',
      ],
      [
        [
          'Charge flow',
          'Current is charge crossing a section per time: I = Δq/Δt for an average interval. One ampere is one coulomb per second. Conventional current follows positive-charge motion; electron drift in a metal is opposite. Charge is not used up by a resistor. In a steady series path, equal current enters and leaves each element, while energy is transferred from the electrical system to other forms.',
        ],
        [
          'Voltage difference',
          'Voltage is energy change per charge between two points. A source maintains a potential difference through chemical or other processes. A resistor’s voltage drop reflects energy transfer per unit charge. Voltage belongs between nodes, not to an isolated point without a reference. A multimeter measures a difference even when one lead is designated ground. Ground in a low-voltage schematic can be a reference node rather than a literal Earth connection.',
        ],
        [
          'Resistance and conductance',
          'For an ohmic element in a fixed operating regime, V = IR and resistance has units of ohms. Resistance can depend on temperature, geometry, and material. Conductance is its reciprocal. A resistor’s rating is not a promise that every component follows a linear relation at every voltage. LEDs and other semiconductor devices are nonlinear. Identify whether a problem specifies an ideal resistor before extrapolating a measured ratio.',
        ],
        [
          'Power and energy',
          'Electrical power delivered to an element is P = VI under the chosen passive sign convention. For an ideal resistor, P = I²R = V²/R. Energy over constant-power time is Pt; joules measure energy and watts measure its transfer rate. A watt-hour is an energy unit, equal to 3600 joules. Battery ampere-hours describe charge capacity, not energy unless voltage and discharge conditions are also considered.',
        ],
        [
          'DC and AC',
          'DC maintains one current direction, though its magnitude can vary. AC periodically reverses direction and often uses sinusoidal models. RMS values relate to heating-equivalent effects for specified waveforms, not simply the arithmetic average of signed voltage. This course’s resistor lab uses steady DC, so it does not model capacitive phase shift, inductive effects, or AC impedance. Do not interpret its moving current indicator as a simulated electron speed.',
        ],
        [
          'Reasonableness checks',
          'Label each quantity and unit before solving. At fixed resistance, doubling voltage doubles current and quadruples dissipated power. At fixed voltage, doubling resistance halves current and power. These different constraints explain apparently conflicting proportionalities. Verify source power against total resistor dissipation in an ideal network. A real source has limits and internal resistance; the virtual ideal source is an explicit simplification rather than a build recommendation.',
        ],
      ],
      [
        ['Current', 'Charge flow rate.'],
        ['Voltage', 'Energy difference per charge.'],
        ['Power', 'Energy transfer rate.'],
        ['Watt-hour', 'Energy equal to 3600 J.'],
      ],
      [
        'A 6 V source drives a 300 Ω resistor for 60 s. Find current, power, and energy.',
        ['I = 6/300 = 0.020 A.', 'P = 6 × 0.020 = 0.120 W.', 'E = 0.120 × 60 = 7.20 J.'],
        'Track charge flow separately from energy transfer.',
      ],
      [
        [
          'An ampere is…',
          'Coulomb per second',
          ['Joule per second', 'Joule per coulomb', 'Ohm per meter'],
          'It measures charge flow rate.',
        ],
        [
          'A watt-hour measures…',
          'Energy',
          ['Current', 'Resistance', 'Charge alone'],
          'Power times time is energy.',
        ],
        [
          'At fixed R, doubling V changes power by…',
          'A factor of four',
          ['A factor of two', 'A factor of one half', 'No change'],
          'P = V²/R.',
        ],
      ],
      [
        [
          'Why is charge not consumed?',
          'Steady charge flow conserves charge while energy changes form.',
        ],
        ['Convert 2 Wh to joules.', '7200 J.'],
        [
          'Why is Ah not sufficient for battery energy?',
          'Voltage and operating conditions are also required.',
        ],
        ['What does the lab omit for AC?', 'Frequency-dependent impedance and phase behavior.'],
      ],
      [
        ['Source', 'Provide energy per charge.'],
        ['Current', 'Move charge around a closed path.'],
        ['Load', 'Transfer energy at rate VI.'],
      ],
      [
        ['Charge', 'Conserved flow', 'Not consumed by a resistor.'],
        ['Energy', 'Changes form', 'Measured in joules or Wh.'],
        ['Power', 'Transfer rate', 'Measured in watts.'],
      ],
      'Double source voltage at fixed resistance. Record current and power ratios, then explain their different scaling.',
      'Current tracks charge; voltage and power track energy transfer.',
    ),
    c(
      'Diagrams, nodes, series, parallel, and Ohm’s law',
      [
        'Identify topology from nodes.',
        'Calculate equivalent resistance.',
        'Interpret open and closed paths.',
      ],
      [
        [
          'Reading a schematic',
          'A schematic represents electrical connections rather than physical layout. Wires meeting at the same ideal node share a potential. A crossing is a connection only when the drawing convention indicates it. Trace nodes before classifying resistors; two components drawn beside each other are not necessarily parallel. Label source polarity, element values, and current directions. An assumed direction can yield a negative solution without invalidating the analysis.',
        ],
        [
          'Series paths',
          'Elements in series carry the same current when their shared node has no additional branch. Resistances add: Req = R₁ + R₂. Voltage divides in proportion to resistance for a simple unloaded divider. The larger resistor has the larger voltage drop at the common current. Adding a branch to the divider output can change both current and voltage, so an unloaded formula cannot be applied blindly to a loaded circuit.',
        ],
        [
          'Parallel branches',
          'Parallel elements connect across the same two nodes and share voltage. Currents add, and conductances add: 1/Req = 1/R₁ + 1/R₂. For positive finite resistors, parallel equivalent resistance is smaller than either branch resistance. The lower-resistance branch carries more current at the same voltage. Distinguish branch current from total source current; current does not split equally unless branch resistances are equal.',
        ],
        [
          'Open and short',
          'An ideal open path carries zero steady current, while an ideal short connects nodes with negligible resistance and negligible voltage drop. A voltage can exist across an open switch. Shorting an ideal source would produce an unphysical unlimited current in an idealized model; real sources are limited and may be damaged. The lab models an open switch safely and does not encourage short-circuit experiments.',
        ],
        [
          'Equivalent networks',
          'Reduce simple series and parallel groups step by step, preserving the actual nodes at every step. Some bridge networks cannot be reduced by one immediate series or parallel operation and require Kirchhoff analysis or another method. After finding source current, reconstruct intermediate voltages and branch currents. Check that resistor powers sum to source power for an ideal network. Equivalent resistance describes terminal behavior, not identical power in every internal resistor.',
        ],
        [
          'Testing the topology',
          'Use the lab’s series/parallel selector while keeping source and resistor values fixed. Compare total current, each resistor’s voltage, and total power. A diagram change should have a mathematical consequence you can explain from shared nodes. Record one limiting case, such as a very large branch resistance approximating an open branch. Real wiring adds contact resistance and source limitations; the ideal model isolates topology and Ohm’s law.',
        ],
      ],
      [
        ['Node', 'Set of ideally connected points at one potential.'],
        ['Series', 'Shared current without a branching intermediate node.'],
        ['Parallel', 'Shared pair of terminal nodes.'],
        ['Equivalent resistance', 'Terminal voltage/current ratio for the network.'],
      ],
      [
        'Find Req for 100 Ω and 300 Ω in parallel on 6 V.',
        [
          '1/Req = 1/100 + 1/300.',
          'Req = 75 Ω and total current = 0.080 A.',
          'Branch currents are 0.060 A and 0.020 A.',
        ],
        'Branch currents add to source current.',
      ],
      [
        [
          'Parallel resistors share…',
          'Voltage',
          ['Always current', 'Always power', 'Always resistance'],
          'They connect to the same two nodes.',
        ],
        [
          'Two 100 Ω resistors in series give…',
          '200 Ω',
          ['50 Ω', '100 Ω', '10000 Ω'],
          'Series resistances add.',
        ],
        [
          'An open switch can have…',
          'Voltage with zero current',
          ['Infinite real power', 'Always zero voltage', 'Consumed charge'],
          'A gap can support potential difference.',
        ],
      ],
      [
        ['Why trace nodes first?', 'Topology follows connections, not visual placement.'],
        ['Find 100 Ω parallel 100 Ω.', '50 Ω.'],
        [
          'Why does divider loading matter?',
          'The new branch changes equivalent resistance and the voltage distribution.',
        ],
        [
          'Give a power check.',
          'Source VI should equal the sum of resistor I²R losses in the ideal network.',
        ],
      ],
      [
        ['Trace', 'Identify shared nodes.'],
        ['Reduce', 'Combine true series or parallel groups.'],
        ['Recover', 'Calculate element currents and voltages.'],
      ],
      [
        ['Series', 'Same current', 'Voltage drops add.'],
        ['Parallel', 'Same voltage', 'Branch currents add.'],
        ['Open', 'No steady path', 'Voltage may remain.'],
      ],
      'Compare 100 Ω and 300 Ω in series and parallel at 6 V. Record equivalent resistance and both branch currents.',
      'Circuit relationships follow topology, not the shape of the drawing.',
    ),
    c(
      'Switches, relays, diodes, and LEDs',
      [
        'Explain switch-controlled paths.',
        'Recognize diode polarity and nonlinear behavior.',
        'Estimate LED current with a declared model.',
      ],
      [
        [
          'Control paths',
          'A switch changes connectivity, not the source’s chemical identity. An SPST switch opens or closes one path; an SPDT switch connects a common terminal to one of two alternatives. A relay uses an actuator, often an electromagnet, to control contacts and can separate control and load circuits. Contact ratings and isolation matter in physical devices. Virtual switching here uses ideal contacts without bounce, arcing, or mechanical delay.',
        ],
        [
          'Junction behavior',
          'A PN junction has a built-in carrier distribution and responds differently to forward and reverse bias. A diode is nonlinear; it does not have one fixed resistance valid at all operating points. An ideal diode model allows forward conduction and blocks reverse current, while a constant-drop model adds an approximate forward voltage. Real reverse leakage and breakdown require device-specific data. State the model before calculating a circuit.',
        ],
        [
          'Light-emitting diodes',
          'An LED emits light through semiconductor electronic transitions during forward operation. Its forward voltage depends on material, current, and temperature, and is not universally 0.7 V. A series resistor can limit current in a simple low-voltage circuit. Under a constant-drop approximation, I ≈ (Vs − Vf)/R when forward biased and Vs exceeds Vf. Light output is not represented by a universal current-to-brightness law in this course.',
        ],
        [
          'Choosing a resistor',
          'Estimate the desired current and forward voltage, then calculate resistance from the remaining source voltage. Check resistor power using I²R and allow appropriate rating margins in a supervised design. A negative current from the simple forward formula means its conduction assumption failed; it is not proof that the LED glows backward. Real devices must follow their ratings. The virtual model never authorizes wiring an LED directly across an unregulated source.',
        ],
        [
          'Control versus load',
          'A small control signal may operate a transistor or relay controlling a separate load, but energy still comes from the load’s power supply. An actuator does not create energy or guarantee isolation by itself. Coil switching can produce transients that need suitable protection in real circuits. Identify control path, load path, common reference, and ratings before proposing a physical circuit. The ideal diagrams omit transient behavior deliberately.',
        ],
        [
          'Troubleshooting evidence',
          'For a nonlighting LED, consider open contacts, reversed orientation, insufficient voltage, incorrect resistor value, and wiring errors. Measure node voltages rather than changing several components simultaneously. A bright indicator in a simulation only visualizes modeled conduction; it is not a calibrated optical measurement. Record the assumed Vf and source voltage, then compare predicted current with an approved measurement. A useful diagnosis identifies the observation that would distinguish competing faults.',
        ],
      ],
      [
        ['SPDT', 'Switch connecting one common terminal to either of two contacts.'],
        ['Forward bias', 'Junction orientation favoring forward conduction.'],
        ['Vf', 'Forward voltage at a specified operating condition.'],
        ['Current limiting', 'Restricting current to an appropriate operating range.'],
      ],
      [
        'For Vs = 5 V, Vf = 2 V, and R = 300 Ω, estimate current.',
        [
          'The resistor receives 5 − 2 = 3 V.',
          'I ≈ 3/300 = 0.010 A.',
          'Resistor power is 0.010² × 300 = 0.030 W.',
        ],
        'The result depends on the constant-drop approximation.',
      ],
      [
        [
          'An LED’s forward voltage is…',
          'Device- and condition-dependent',
          ['Always 0.7 V', 'Always zero', 'Equal to any source'],
          'Semiconductor material and current matter.',
        ],
        [
          'A series resistor mainly…',
          'Limits current',
          ['Creates charge', 'Guarantees any voltage is safe', 'Reverses polarity'],
          'Use device ratings.',
        ],
        [
          'A diode is generally…',
          'Nonlinear',
          ['An ideal fixed resistor', 'Always conducting both ways', 'A mechanical switch'],
          'Its current–voltage relation is nonlinear.',
        ],
      ],
      [
        [
          'Why declare the diode model?',
          'Ideal, constant-drop, and detailed models predict different currents.',
        ],
        [
          'Name two LED faults.',
          'Reversed orientation and an open path; node measurements can distinguish them.',
        ],
        [
          'What does a relay separate?',
          'Control and contact/load functions, subject to its actual isolation and ratings.',
        ],
        [
          'Why not infer brightness from current alone?',
          'Efficiency, optics, temperature, and device characteristics affect light output.',
        ],
      ],
      [
        ['Orient', 'Identify source and junction polarity.'],
        ['Limit', 'Allocate voltage and calculate current.'],
        ['Verify', 'Check power, ratings, and fault evidence.'],
      ],
      [
        ['Ideal diode', 'One-way conduction model', 'Omits forward drop.'],
        ['Constant drop', 'Approximate Vf', 'Valid only in a suitable regime.'],
        ['LED indicator', 'Shows conduction', 'Not calibrated brightness.'],
      ],
      'Select LED mode, vary series resistance, and reverse the diode. Compare predicted current and the model assumptions.',
      'Semiconductor calculations require explicit polarity, operating assumptions, and current limits.',
    ),
    c(
      'Digital logic and combinational circuits',
      [
        'Build and interpret truth tables.',
        'Apply De Morgan’s laws.',
        'Explain adders and multiplexers.',
      ],
      [
        [
          'Binary abstraction',
          'Digital logic maps physical signal ranges to abstract zero and one. A gate’s truth table describes its logical behavior, while actual voltage thresholds, timing, and noise margins depend on the device. An AND gate outputs one only when all inputs are one; OR requires at least one; NOT inverts. Do not confuse logical one with a universal voltage value. The virtual gate uses exact Boolean states without analog transitions.',
        ],
        [
          'Derived gates',
          'NAND is the inversion of AND, and NOR is the inversion of OR. XOR is one when two inputs differ; XNOR is one when they match. NAND and NOR are universal: combinations can implement any Boolean function. Universality is a statement about expressiveness, not automatically minimum delay or transistor count. Write the intermediate outputs when tracing a network so that a single inversion is not silently omitted.',
        ],
        [
          'De Morgan reasoning',
          'NOT(A AND B) equals (NOT A) OR (NOT B); NOT(A OR B) equals (NOT A) AND (NOT B). The operator changes and every input is inverted. Test the transformation against all four input combinations rather than one convenient case. Parentheses define scope, so NOT A AND B is different from NOT(A AND B). Translate both expressions to a truth table when notation is ambiguous.',
        ],
        [
          'Addition',
          'A half-adder produces sum A XOR B and carry A AND B. A full-adder includes carry-in; its sum is A XOR B XOR Cin, and carry-out is one when at least two inputs are one. Sum and carry represent different bit positions. Binary 1 + 1 gives sum zero and carry one, representing decimal two. Propagating carries connects arithmetic to circuit timing and shows why a combinational output may not settle instantly.',
        ],
        [
          'Selection circuits',
          'A two-input multiplexer selects A when S = 0 and B when S = 1, represented by (NOT S AND A) OR (S AND B). Selection differs from ordinary OR: the unselected input must not influence the intended logical result. Build the truth table before constructing the gate network. A decoder maps input combinations to selected outputs, while an encoder performs a different mapping. Signal direction and function should be stated explicitly.',
        ],
        [
          'Testing a design',
          'Enumerate every input combination for a small combinational circuit. Compare intended output and calculated output row by row, including boundary cases such as all zeros and all ones. A successful single trial does not validate a truth table. Real designs also require timing and electrical checks; this Boolean lab covers only logic. Record which gate or expression changed and explain the consequence rather than toggling inputs until the output appears familiar.',
        ],
      ],
      [
        ['Truth table', 'Output for every input combination.'],
        ['XOR', 'True for unequal two-input states.'],
        ['Universal gate', 'Gate type sufficient to build arbitrary Boolean logic.'],
        ['Multiplexer', 'Circuit selecting one input using control bits.'],
      ],
      [
        'For A=1, B=1, find half-adder sum and carry.',
        [
          'Sum uses XOR: 1 XOR 1 = 0.',
          'Carry uses AND: 1 AND 1 = 1.',
          'Carry–sum bits are 10₂, equal to decimal 2.',
        ],
        'Carry is not an error or lost bit.',
      ],
      [
        ['XOR(1,1) equals…', '0', ['1', '2', 'Undefined'], 'Equal inputs produce zero.'],
        [
          'NOT(A AND B) equals…',
          '(NOT A) OR (NOT B)',
          ['A OR B', '(NOT A) AND B', 'A AND B'],
          'Both inputs and the operator transform.',
        ],
        [
          'A multiplexer…',
          'Selects an input',
          ['Always adds inputs', 'Stores a clocked bit by definition', 'Measures resistance'],
          'Selection uses control signals.',
        ],
      ],
      [
        ['Give half-adder equations.', 'Sum = A XOR B; carry = A AND B.'],
        [
          'Why test all input combinations?',
          'Different cases can expose omitted inversions or incorrect branch logic.',
        ],
        [
          'Why is logical one not always 5 V?',
          'Physical signal ranges depend on device technology and supply.',
        ],
        [
          'What does a Boolean model omit?',
          'Propagation delay, thresholds, analog transitions, and noise behavior.',
        ],
      ],
      [
        ['Specify', 'List desired input–output rows.'],
        ['Construct', 'Choose gates or expressions.'],
        ['Exhaust', 'Check every Boolean combination.'],
      ],
      [
        ['AND', 'All inputs true', 'Different from OR.'],
        ['XOR', 'Inputs differ', 'Different from inclusive OR.'],
        ['Boolean lab', 'Exact logic states', 'Omits analog and timing effects.'],
      ],
      'Switch among AND, OR, XOR, NAND, and NOR. Verify every row and explain one De Morgan equivalence.',
      'A truth table provides exhaustive evidence for a small combinational function.',
    ),
    c(
      'Kirchhoff laws and network problem solving',
      [
        'Apply node and loop conservation.',
        'Solve unknown branch quantities.',
        'Check network power balance.',
      ],
      [
        [
          'Conservation at nodes',
          'Kirchhoff’s current law states that algebraic current sum at a node is zero in the lumped steady-circuit model. Choose entering currents positive or another consistent convention. It expresses charge conservation rather than a rule that each branch receives equal current. If two currents enter and one leaves, the leaving current equals their sum. In time-dependent systems, charge storage and the chosen model require careful treatment.',
        ],
        [
          'Conservation around loops',
          'Kirchhoff’s voltage law states that signed voltage changes around a closed loop sum to zero under the usual lumped-circuit assumptions. Traversing a source from negative to positive is a rise; traversing a resistor with assumed current gives a drop. Keep the traversal direction consistent. A negative solved current simply means actual direction is opposite the assumption. Avoid adding unsigned voltage magnitudes when sources oppose one another.',
        ],
        [
          'Independent equations',
          'Assign node potentials or mesh currents, choose a reference, and write enough independent equations for unknowns. Repeating a dependent loop does not add information. In nodal analysis, express branch currents through potential differences and resistance. In mesh analysis, a shared resistor’s current can be the difference of mesh currents. Label variables on the diagram so algebra retains physical meaning. Check that equations and unknowns are consistently counted.',
        ],
        [
          'Reduction before algebra',
          'Recognize genuine series and parallel groups before applying a full system of equations. A bridge resistor may prevent simple reduction because a shared node branches. Simplification is valuable only if it preserves terminal connections. Once source current is known, recover internal quantities stepwise. A correctly calculated equivalent resistance alone does not answer a question about one internal branch voltage. Keep track of what each reduced block represents.',
        ],
        [
          'Power and limits',
          'For ideal resistors, dissipation is nonnegative I²R. Sum all resistor powers and compare with net source delivery under a consistent sign convention. An impossible negative resistance or a power mismatch often reveals an equation or sign mistake. Limits provide independent checks: opening a branch should remove its current; making a parallel branch very large should approach the remaining branch resistance. These checks complement, rather than replace, algebra.',
        ],
        [
          'Explaining a solution',
          'Present diagram labels, equations, substituted values, results, and checks. Units should appear on intermediate and final quantities. State source ideality and resistor assumptions. The lab gives a two-resistor network to make current conservation and voltage sums visible; it is not a general multi-loop solver. Use its values to validate basic relations, then apply the same conservation principles to a more complex paper schematic.',
        ],
      ],
      [
        ['KCL', 'Signed node currents sum to zero.'],
        ['KVL', 'Signed loop voltages sum to zero.'],
        ['Mesh current', 'Assigned loop variable in planar analysis.'],
        ['Reference node', 'Chosen zero-potential node.'],
      ],
      [
        'At a node, 12 mA and 8 mA enter. One branch leaves. Find its current.',
        ['Define entering currents positive.', '12 + 8 − Iout = 0 mA.', 'Iout = 20 mA.'],
        'Current splitting follows conservation and branch relations.',
      ],
      [
        [
          'KCL expresses…',
          'Charge conservation',
          ['Equal current in all branches', 'Energy creation', 'Resistance addition only'],
          'It is a node balance.',
        ],
        [
          'Negative solved current means…',
          'Opposite the assumed direction',
          ['Impossible circuit necessarily', 'Negative charge disappears', 'No voltage exists'],
          'Signed variables encode direction.',
        ],
        [
          'Resistor dissipation is…',
          'I²R',
          ['Always negative', 'Independent of current', 'Equal to charge'],
          'Positive R gives nonnegative dissipation.',
        ],
      ],
      [
        [
          'Write a source–two-resistor loop equation.',
          'Vs − IR₁ − IR₂ = 0 for traversal with current.',
        ],
        [
          'Why avoid dependent equations?',
          'They repeat information and do not determine additional unknowns.',
        ],
        ['Explain a nodal branch current.', 'Current from node a to b through R is (Va − Vb)/R.'],
        [
          'Give two verification checks.',
          'Node/loop conservation and total power balance, plus sensible limiting behavior.',
        ],
      ],
      [
        ['Label', 'Choose current directions and a reference.'],
        ['Conserve', 'Write independent node and loop equations.'],
        ['Verify', 'Check units, power, and limits.'],
      ],
      [
        ['Node law', 'Charge balance', 'Not equal splitting.'],
        ['Loop law', 'Signed potential balance', 'Requires consistent traversal.'],
        ['Reduction', 'Preserves terminal topology', 'Cannot ignore bridge branches.'],
      ],
      'For both network modes, verify node currents, resistor voltage sums where appropriate, and source power.',
      'A network solution is strongest when conservation and independent checks agree.',
    ),
    c(
      'Breadboards, multimeters, and a first virtual build',
      [
        'Map breadboard connections.',
        'Choose correct measurement placement.',
        'Infer an unknown resistance from data.',
      ],
      [
        [
          'Physical and schematic maps',
          'A breadboard connects groups of holes through internal metal strips, often with a central gap and separate supply rails. Layouts vary; some rails are interrupted. Verify the actual board rather than assuming every row or rail is continuous. Translate each intended schematic node to connected holes. Components crossing the central gap may bridge separate strips, while two leads in one connected strip can accidentally short the component.',
        ],
        [
          'Voltage measurement',
          'A voltmeter measures potential difference and is placed across two nodes. Its finite input resistance can load high-resistance circuits, though an ideal model treats it as infinite. Begin with an appropriate range and approved low-voltage source. The polarity of the leads sets the sign of the reading. A negative reading may indicate reversed leads rather than a failed circuit. Record the measurement points, not just the numerical display.',
        ],
        [
          'Current measurement',
          'An ammeter is inserted in the current path and ideally has very low resistance. Connecting it across a source can create a short path and damage equipment. Use only approved measurement procedures, correct sockets, ranges, and protection. Do not rearrange live circuits casually. The virtual model reports current without physically inserting a meter; explain the difference between direct current measurement and inferring current from a known resistor’s voltage.',
        ],
        [
          'Resistance measurement',
          'An ohmmeter applies its own test signal and should be used according to instructions on de-energized, suitably isolated components. Other parallel paths can change an in-circuit resistance reading. A measured value can differ from nominal due to tolerance, temperature, and contact resistance. Document whether the resistor was isolated and which leads were used. An unknown resistance inferred from V/I inherits uncertainty from both measurements.',
        ],
        [
          'Mystery resistor reasoning',
          'Place a known resistor and unknown in a simple divider under a supervised low-voltage setup. Measure voltage across the known resistor to infer current, then use the unknown’s voltage divided by that current. The same current assumption requires a true series path without significant meter loading. Compare the inferred resistance with tolerances and repeat measurements. An incorrect breadboard connection can imitate an unexpected component value, so verify nodes before blaming the resistor.',
        ],
        [
          'Build verification',
          'Before energizing an approved build, inspect connections, polarity, component values, and intended current path. Predict readings at named nodes. If observations disagree, change one suspected cause at a time and remeasure. The virtual first build can validate divider mathematics but omits loose contacts and instrument loading. Use the trial notebook to keep baseline and changed conditions separate; a good diagnosis explains why a particular observation favors one fault over another.',
        ],
      ],
      [
        ['Breadboard node', 'Holes joined by an internal connection.'],
        ['Meter loading', 'Measurement changes the circuit.'],
        ['Tolerance', 'Specified variation around nominal value.'],
        ['Divider', 'Series network providing an intermediate voltage.'],
      ],
      [
        'A known 100 Ω resistor has 2 V across it; an unknown in series has 4 V. Find the unknown.',
        [
          'Current is 2/100 = 0.020 A.',
          'The same current passes through the unknown.',
          'Runknown = 4/0.020 = 200 Ω.',
        ],
        'Meter loading and topology are assumed negligible.',
      ],
      [
        [
          'A voltmeter connects…',
          'Across two nodes',
          ['As an intentional source short', 'Only instead of every wire', 'Only to ground alone'],
          'It measures a difference.',
        ],
        [
          'An ohmmeter generally requires…',
          'A de-energized suitable circuit',
          ['A live mains circuit', 'Maximum possible voltage', 'No instrument instructions'],
          'Follow instrument procedures.',
        ],
        [
          'Divider inference needs…',
          'The same series current',
          ['Equal resistor values', 'Zero source voltage', 'No known component'],
          'The current relation follows topology.',
        ],
      ],
      [
        [
          'Why check rail continuity?',
          'Breadboard rails may be split or connected differently from the assumed layout.',
        ],
        [
          'What does meter loading mean?',
          'The instrument’s finite impedance changes the quantity being measured.',
        ],
        [
          'Why isolate an unknown for resistance measurement?',
          'Other paths can alter the reading.',
        ],
        [
          'How should troubleshooting proceed?',
          'Predict named-node readings, verify wiring, and change one suspected factor at a time.',
        ],
      ],
      [
        ['Map', 'Translate schematic nodes to board connections.'],
        ['Predict', 'Calculate readings before measurement.'],
        ['Compare', 'Use discrepancies to isolate faults.'],
      ],
      [
        ['Voltmeter', 'Parallel measurement', 'Finite input impedance.'],
        ['Ammeter', 'Series measurement', 'Wrong placement can short a source.'],
        ['Ohmmeter', 'Own test signal', 'Use de-energized suitable components.'],
      ],
      'Use series mode with 100 Ω and 200 Ω at 6 V. Recover the second resistance from the first voltage and common current.',
      'Measurement placement and topology are part of the experiment, not afterthoughts.',
    ),
    c(
      'LED matching, charge-time estimates, and troubleshooting',
      [
        'Use separate LED branch limits.',
        'Estimate charge time with efficiency assumptions.',
        'Explain SPDT switching and fault tests.',
      ],
      [
        [
          'Matching branches',
          'Two LEDs can require different forward voltages and produce different light output at equal current. Give each branch appropriate current control rather than assuming one shared resistor divides current reliably. Under the constant-drop approximation, choose each resistor from source minus its LED forward voltage divided by target current. Matching current is an electrical condition, not proof of identical perceived brightness. Device tolerances and temperature can create additional differences.',
        ],
        [
          'Comparing measurements',
          'Record source voltage, each branch current, forward voltage, and measurement conditions. A changed LED color can alter Vf, so the same resistor need not produce the same current. Use a suitable optical measurement if brightness itself is the target. The virtual LED indicator displays modeled conduction only. Separate the measured quantity from the visual metaphor so that a bright screen symbol is not mistaken for a photometric result.',
        ],
        [
          'Battery charge time',
          'A simple constant-current estimate is time = required charge/current. A 2 Ah capacity at 0.5 A gives an ideal four-hour estimate, but real charging includes efficiency losses, tapering, temperature limits, and control electronics. Do not directly charge cells from this arithmetic. Battery chemistry requires an approved charger. If estimating energy, include voltage and efficiency; USB power rating and cell charge capacity are not interchangeable units.',
        ],
        [
          'Two-location switching',
          'Two SPDT switches can route a low-voltage load through alternative traveler paths. The load state depends on whether the chosen contacts form a continuous path, not solely on one switch’s visual up/down position. Draw both alternatives and trace continuity for all four switch combinations. This is a conceptual low-voltage exercise, not guidance for household mains wiring. Identify common terminals from actual documentation rather than position alone.',
        ],
        [
          'Truth table to circuit',
          'Start with the desired input states and output, then simplify an expression and choose gates. For each input combination, trace the actual logic path. A circuit that works for three rows but fails for the fourth is not correct. If a switch represents a binary input, ensure the physical input has a defined level rather than floating. The ideal Boolean model cannot reveal floating inputs or contact bounce.',
        ],
        [
          'Fault discrimination',
          'An open connection, reversed LED, wrong resistor, weak source, or incorrect common terminal can produce similar symptoms. Use measurements that separate alternatives. If source voltage is correct but all current is zero, check the path and polarity; if voltage collapses under load, consider source limitations. Record one change and its predicted result before testing. Troubleshooting should reduce uncertainty systematically rather than replace components at random.',
        ],
      ],
      [
        ['Traveler', 'Alternative path between switching contacts.'],
        ['Charge capacity', 'Stored or deliverable charge under specified conditions.'],
        ['Floating input', 'Input without a defined electrical level.'],
        ['Fault isolation', 'Tests separating competing failure causes.'],
      ],
      [
        'Estimate ideal time for 1.5 Ah supplied at constant 0.30 A.',
        [
          'Use charge/current with compatible Ah and A.',
          '1.5/0.30 = 5.0 h.',
          'State that tapering and losses can extend real time.',
        ],
        'This is an estimate, not a charging procedure.',
      ],
      [
        [
          'Equal LED current guarantees equal brightness?',
          'No',
          ['Always', 'Only for any red LED', 'Only at 5 V'],
          'Optical efficiency and geometry matter.',
        ],
        [
          '1.5 Ah / 0.30 A equals…',
          '5 h',
          ['0.45 h', '5 J', '0.20 h'],
          'Ah divided by A gives hours.',
        ],
        [
          'Useful troubleshooting changes…',
          'One suspected factor at a time',
          ['Every wire at once', 'Only the answer label', 'All components randomly'],
          'Controlled changes identify causes.',
        ],
      ],
      [
        [
          'Why separate branch resistors?',
          'Different LED characteristics can produce unequal current in uncontrolled shared branches.',
        ],
        [
          'Why can real charging exceed the ideal time?',
          'Current tapers and efficiency, temperature, and control constraints matter.',
        ],
        [
          'How do you validate an SPDT arrangement?',
          'Trace continuity for every switch combination with labeled common and traveler contacts.',
        ],
        [
          'What evidence suggests a source limitation?',
          'Voltage drops substantially under load despite correct unloaded voltage.',
        ],
      ],
      [
        ['Specify', 'Choose electrical and observed targets.'],
        ['Predict', 'Calculate branch and charge behavior.'],
        ['Diagnose', 'Measure conditions that separate faults.'],
      ],
      [
        ['Current matching', 'Electrical equality', 'Not calibrated brightness.'],
        ['Charge estimate', 'Capacity/current', 'Assumes constant effective current.'],
        ['Switch logic', 'Connectivity states', 'Not household wiring instructions.'],
      ],
      'Change LED forward drop and resistance independently. Explain how to recover the same target current after Vf changes.',
      'A practical design distinguishes the target measurement from the simplified circuit model.',
    ),
    c(
      'Transistors, op-amps, storage, and timing',
      [
        'Interpret BJT operating assumptions.',
        'Use ideal op-amp feedback cautiously.',
        'Distinguish combinational and sequential logic.',
      ],
      [
        [
          'BJT models',
          'A bipolar transistor has base, collector, and emitter terminals. In a suitable forward-active regime, collector current can be approximated as β times base current, but β varies with device and conditions. Saturation and cutoff require different models. A fixed 0.7 V base–emitter approximation is limited and not a universal constant. Biasing establishes an operating point so a signal can vary within the intended regime without assuming unlimited gain or output swing.',
        ],
        [
          'Switching and gates',
          'Transistors can implement logic by controlling conducting paths. CMOS gates combine complementary devices to establish output states, while BJT logic uses different arrangements. A gate’s Boolean function does not describe its entire electrical behavior. Input capacitance, finite resistance, and switching time affect speed and power. A transistor symbol is therefore a physical implementation layer beneath the truth table, not another abstract AND or OR label.',
        ],
        [
          'Operational amplifiers',
          'An ideal op-amp has very high open-loop gain, negligible input current, and suitable output capability, but real devices have supply limits and bandwidth. With stable negative feedback in the linear regime, input voltages can be approximately equal. This virtual short is not a physical connection and fails in saturation or inappropriate feedback. Derive gains from the feedback network rather than asserting that every op-amp automatically forces both inputs to zero volts.',
        ],
        [
          'Sequential state',
          'Combinational outputs depend on current inputs; sequential circuits also depend on stored state. Latches and flip-flops provide different timing behavior. An edge-triggered D flip-flop samples its input around an active clock edge, subject to setup and hold requirements. The output does not copy every input change continuously. Distinguish clock frequency, duty cycle, edge, and propagation delay when reading a timing diagram.',
        ],
        [
          'Timing evidence',
          'Align input, clock, and output time axes. Mark which edge is active and when the output can respond. Rapid changes near the sampling edge can violate timing requirements in real devices. A truth table alone cannot describe these failures. Ideal logic simulators omit metastability and analog settling. State what is abstracted before treating a clean digital trace as a guarantee of physical reliability.',
        ],
        [
          'Advanced reasoning',
          'Use a hierarchy: physical device, operating regime, circuit network, logical function, and timing behavior. Each layer requires evidence appropriate to its claims. The shared Boolean lab checks combinational functions only; it does not pretend to simulate transistor bias or clocked storage. Sketch an additional timing table or bias calculation for those topics and identify the assumptions that a more complete simulator would need. This distinction prevents overinterpreting a simple interactive diagram.',
        ],
      ],
      [
        ['Bias', 'DC operating point.'],
        ['Saturation', 'Operating regime limited by device conditions.'],
        ['Negative feedback', 'Output response reducing input error.'],
        ['Flip-flop', 'Clocked state-storage element.'],
      ],
      [
        'An ideal noninverting amplifier has Rf = 9 kΩ and Rg = 1 kΩ. Predict gain.',
        [
          'Assume stable negative feedback and linear operation.',
          'Gain = 1 + Rf/Rg = 10.',
          'A 0.10 V input predicts 1.0 V output if supply and bandwidth permit.',
        ],
        'Ideal gain fails when operating limits are exceeded.',
      ],
      [
        [
          'A D flip-flop mainly adds…',
          'Stored state',
          ['Unlimited voltage', 'Zero timing constraints', 'Only resistance'],
          'Sequential behavior includes memory.',
        ],
        [
          'The op-amp virtual short requires…',
          'Suitable negative feedback and linear operation',
          ['Any circuit whatsoever', 'Saturation', 'Disconnected inputs'],
          'It is an approximation.',
        ],
        [
          'BJT β is…',
          'Condition-dependent',
          ['Exactly constant for all devices', 'A voltage unit', 'A logic truth value'],
          'Device behavior varies.',
        ],
      ],
      [
        [
          'Contrast latch and edge-triggered flip-flop.',
          'A latch can be level-sensitive; an edge-triggered flip-flop samples around a specified edge.',
        ],
        ['What is setup time?', 'Required stable input interval before the sampling edge.'],
        [
          'Why can ideal gain fail?',
          'Supply rails, output current, bandwidth, or feedback conditions can invalidate the approximation.',
        ],
        [
          'What does the Boolean lab not establish?',
          'Transistor operating points or real sequential timing reliability.',
        ],
      ],
      [
        ['Device', 'Choose an operating model.'],
        ['Circuit', 'Apply feedback or switching topology.'],
        ['Time', 'Check state and settling constraints.'],
      ],
      [
        ['Combinational', 'Current-input function', 'No stored state.'],
        ['Sequential', 'Input plus state', 'Requires timing assumptions.'],
        ['Ideal op-amp', 'Feedback approximation', 'Limited by real operating range.'],
      ],
      'Verify a Boolean function, then explain what clock and state information would be needed to turn it into a sequential circuit.',
      'Advanced circuits require both logical correctness and valid electrical operating conditions.',
    ),
    c(
      'Engineering applications and diagnostic thinking',
      [
        'Connect circuit concepts to systems.',
        'Plan reproducible fault tests.',
        'Communicate evidence and limitations.',
      ],
      [
        [
          'System layers',
          'Electrical and computer engineering connect sensors, power, processing, communication, and actuators. A sensor converts a physical quantity into an electrical signal; conditioning and calibration make that signal useful. Digital processing does not remove analog uncertainty at the input. Identify each layer and its units before blaming the whole system for a wrong output. A software display can faithfully report an incorrectly calibrated voltage.',
        ],
        [
          'Requirements',
          'Define measurable goals such as current range, energy use, response time, and allowable error. Requirements differ from a preferred component or aesthetic choice. Compare designs against the same operating conditions and test method. A circuit that works once at room temperature may fail with supply variation or load changes. Document what was tested and what remains an extrapolation rather than presenting a prototype as universally reliable.',
        ],
        [
          'Diagnostic sequence',
          'Start with expected behavior, observed behavior, and a minimal set of competing hypotheses. Verify power and references, then inspect connections and measure intermediate nodes. Choose tests that split the hypothesis set. If a logic output is wrong, distinguish an incorrect truth table from a wiring fault or undefined input. Replace a component only when evidence supports that step. Keep the original baseline so a change’s effect remains interpretable.',
        ],
        [
          'Measurement quality',
          'Calibration, range selection, loading, resolution, and repeatability affect conclusions. Repeated readings reduce uncertainty about variation but do not remove a shared systematic bias. A known reference can test accuracy. Record units and connection points so another person can reproduce the measurement. Distinguish actual data from calculated expectations in a report. Virtual results are generated by stated equations and are not independent experimental confirmation of those equations.',
        ],
        [
          'Tradeoffs',
          'Lower resistance can increase current and power at fixed voltage; more computational speed can increase switching demands; extra instrumentation can alter a sensitive circuit. Engineering decisions balance performance, energy, cost, reliability, and context. No one metric identifies a universally best design. Use the resistor model to quantify a simple power tradeoff, then state what thermal and device-rating information would be needed before choosing physical parts.',
        ],
        [
          'Communicating a result',
          'A concise technical explanation includes the intended function, schematic, model, measurements, uncertainty, and conclusion. Show the observation that rejects the nearest alternative. The trial notebook stores temporary comparisons, while practice answers save separately. This optional unit extends scientific reasoning into engineering work without assigning a career path or treating the virtual system as a certified design. Good troubleshooting is a repeatable process for reducing uncertainty.',
        ],
      ],
      [
        ['Calibration', 'Comparison with a suitable reference.'],
        ['Requirement', 'Measurable performance target.'],
        ['Systematic bias', 'Consistent measurement displacement.'],
        ['Tradeoff', 'Improvement in one objective with costs elsewhere.'],
      ],
      [
        'At fixed 6 V, compare 300 Ω and 600 Ω loads.',
        [
          'Currents are 20 mA and 10 mA.',
          'Powers are 0.12 W and 0.06 W.',
          'Lower current reduces dissipation here but may not meet a load requirement.',
        ],
        'A tradeoff needs a defined purpose.',
      ],
      [
        [
          'Repeated biased readings remove bias?',
          'No',
          ['Always', 'Only after three trials', 'Only for DC'],
          'A shared offset persists.',
        ],
        [
          'A good diagnostic test…',
          'Separates competing hypotheses',
          ['Changes everything', 'Only repeats a guess', 'Ignores measurement points'],
          'It should reduce uncertainty.',
        ],
        [
          'Requirements should be…',
          'Measurable',
          ['Only component names', 'Only colors', 'Independent of conditions'],
          'Performance needs a test definition.',
        ],
      ],
      [
        [
          'Why start with power and reference checks?',
          'Many downstream symptoms share a supply or reference failure.',
        ],
        [
          'What distinguishes data and prediction?',
          'Data are observed measurements; predictions follow a model and assumptions.',
        ],
        [
          'Name a power tradeoff.',
          'At fixed voltage, lower resistance increases current and dissipation.',
        ],
        [
          'What should a handoff contain?',
          'Schematic, expected/observed values with units, tested hypotheses, and remaining uncertainty.',
        ],
      ],
      [
        ['Define', 'State the expected function.'],
        ['Measure', 'Test a discriminating intermediate quantity.'],
        ['Revise', 'Update the hypothesis from evidence.'],
      ],
      [
        ['Repeatability', 'Agreement among readings', 'Does not remove shared bias.'],
        ['Prediction', 'Model output', 'Not independent validation.'],
        ['Requirement', 'Testable target', 'Depends on operating context.'],
      ],
      'Compare two resistor choices at fixed voltage and record both current and power. Explain the design information still missing.',
      'Engineering decisions become defensible through measurable requirements and reproducible evidence.',
      true,
    ),
  ],
});
