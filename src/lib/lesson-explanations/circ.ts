// Checkpoint explanations for Circuit Lab, keyed by question id.
export const circuitLab: Record<string, string> = {
  'circ-u1-l1-q1':
    'F = qE. When q is negative, the force vector points opposite to E. Positive charges are pushed along field lines and negative charges against them.',
  'circ-u1-l1-q2':
    'Coulomb’s law, F = kq₁q₂/r², is inverse-square. Tripling r multiplies r² by 9, so the force becomes 1/9 as strong. One third would be an inverse (not inverse-square) law.',
  'circ-u1-l1-q3':
    'A charged object shifts the charges inside a nearby neutral object: opposite charges move slightly closer and like charges slightly farther. The closer charges are attracted more strongly than the farther ones are repelled, so the net force is attraction. No charge is created.',
  'circ-u1-l1-q4':
    'The electric field is a vector, force per unit charge (N/C or V/m), with both size and direction. Potential is a scalar, energy per unit charge (volts), with size only. The field points in the direction potential decreases fastest.',
  'circ-u1-l1-q5':
    'Coulomb’s constant k = 8.99 × 10⁹ N·m²/C² assumes coulombs and meters. Using μC or cm without converting, and then squaring the distance, can produce errors of many powers of ten.',
  'circ-u1-l1-q6':
    'A good reference entry pairs each equation with its units, the conditions under which it holds and a short checked example. That helps you choose the right formula quickly and catch unit mistakes during a test.',
  'circ-u1-l1-q7':
    'No. Field is a vector, so contributions can cancel. Potential is a scalar, so contributions simply add. Midway between two equal positive charges the fields cancel (E = 0), but the potentials add to a nonzero value.',
  'circ-u2-l1-q1':
    'An ampere is one coulomb of charge passing a point each second: 1 A = 1 C/s. A joule per second is a watt (power), and a joule per coulomb is a volt.',
  'circ-u2-l1-q2':
    'A watt-hour is power multiplied by time, which is energy: 1 Wh = 1 W × 3,600 s = 3,600 J. Battery and electricity bills use it as an energy unit.',
  'circ-u2-l1-q3':
    'P = V²/R. At fixed resistance, doubling V multiplies V² by 4, so power is four times larger. Current also doubles, and P = VI = (2V)(2I) = 4VI.',
  'circ-u2-l1-q4':
    'Charge is conserved: the same current flows out of and back into the source. What a load uses is energy: charges lose potential energy in the resistor, which becomes heat or light. The charge itself keeps circulating.',
  'circ-u2-l1-q5': '1 Wh = 1 W × 3,600 s = 3,600 J. So 2 Wh = 2 × 3,600 = 7,200 J.',
  'circ-u2-l1-q6':
    'Amp-hours measure charge (current × time). Energy is charge × voltage, so Wh = Ah × V. A 2 Ah battery at 3.7 V stores about 7.4 Wh, while a 2 Ah battery at 12 V stores 24 Wh. Load, temperature and age also change usable energy.',
  'circ-u2-l1-q7':
    'The DC lab treats resistors as fixed. In AC circuits, capacitors and inductors have impedance that changes with frequency, and current and voltage can be out of phase. Those effects are not modeled.',
  'circ-u3-l1-q1':
    'Components in parallel connect between the same two nodes, so they all have the same voltage across them. Currents split according to each resistance, so currents and powers can differ.',
  'circ-u3-l1-q2':
    'In series, the current passes through one resistor then the other, so their resistances add: 100 Ω + 100 Ω = 200 Ω. 50 Ω would be the parallel result.',
  'circ-u3-l1-q3':
    'An open switch breaks the path, so no current flows. The full source voltage can still appear across the gap, because one side remains connected to each terminal. Voltage without current means zero power.',
  'circ-u3-l1-q4':
    'A schematic can be drawn in many shapes. What matters is which points are electrically connected (nodes). Identifying nodes first shows which components are truly in series or parallel, regardless of how the diagram is laid out.',
  'circ-u3-l1-q5':
    'For two resistors in parallel, R = (R₁ × R₂) ÷ (R₁ + R₂) = (100 × 100) ÷ 200 = 50 Ω. Two equal resistors in parallel give half of one resistor.',
  'circ-u3-l1-q6':
    'Connecting a load across part of a voltage divider puts it in parallel with that resistor, lowering that section’s resistance. The voltage split changes, so the output drops below the unloaded calculation.',
  'circ-u3-l1-q7':
    'Energy must balance: the power delivered by the source (V × I) should equal the total power dissipated in all resistors (sum of I²R). If they do not match, a current or voltage is wrong somewhere.',
  'circ-u4-l1-q1':
    'An LED’s forward voltage depends on its semiconductor material, and therefore color, and also on current and temperature: roughly 1.8–2.2 V for red and about 3 V for blue or white. 0.7 V is typical of silicon diodes, not LEDs.',
  'circ-u4-l1-q2':
    'An LED has very little resistance once it conducts, so without a series resistor the current could rise until it is destroyed. The resistor sets the current: I = (V_source − V_LED) ÷ R.',
  'circ-u4-l1-q3':
    'A diode’s current does not rise in proportion to voltage. Almost no current flows until the forward voltage is reached, then it rises steeply, and very little flows in reverse. That nonlinear I–V curve is why Ohm’s law with a fixed R does not apply.',
  'circ-u4-l1-q4':
    'An ideal diode drops 0 V, a constant-drop model uses about 0.7 V (or the LED’s V_F), and a detailed model follows the exponential curve. Each gives a different current, so stating which one you used makes the answer checkable.',
  'circ-u4-l1-q5':
    'An LED stays dark if it is reversed (anode and cathode swapped) or if the path is open (loose wire, burned-out LED, bad breadboard contact). Measuring voltages at labeled nodes tells which: a reversed LED has the full voltage across it in the wrong direction.',
  'circ-u4-l1-q6':
    'A relay uses a small current through its coil to move switch contacts that carry a separate, often larger, load current. That separates the control circuit from the load circuit, within the relay’s ratings.',
  'circ-u4-l1-q7':
    'Light output depends on how efficiently the LED converts current to light, its color, its lens and viewing angle, and its temperature. Two LEDs at the same current can look very different in brightness.',
  'circ-u5-l1-q1':
    'XOR (exclusive OR) outputs 1 only when the inputs differ. With both inputs 1, they are the same, so XOR(1,1) = 0. Logic values are only 0 or 1, so "2" is not possible.',
  'circ-u5-l1-q2':
    'De Morgan’s law: NOT(A AND B) = (NOT A) OR (NOT B). Negating an AND flips each input and changes AND to OR. For example, it is false only when A and B are both 1.',
  'circ-u5-l1-q3':
    'A multiplexer (MUX) uses select (control) inputs to choose which one of several data inputs passes to the output. It does not store bits like a flip-flop or add inputs.',
  'circ-u5-l1-q4':
    'Adding two bits: the sum bit is 1 when exactly one input is 1, which is XOR, so Sum = A XOR B. The carry is 1 only when both are 1, which is AND, so Carry = A AND B. For 1 + 1: sum 0, carry 1, binary 10.',
  'circ-u5-l1-q5':
    'A circuit can work for some inputs and fail for others, for example a missing inverter that matters only when A = 1 and B = 0. Testing every combination (2ⁿ rows for n inputs) is the only way to confirm the whole truth table.',
  'circ-u5-l1-q6':
    'Logic levels depend on the technology and supply voltage. A "1" may be about 5 V in classic TTL, 3.3 V or 1.8 V in modern chips, and any voltage above the input threshold counts. Logic 1 is a range, not a fixed voltage.',
  'circ-u5-l1-q7':
    'Boolean logic treats signals as instant, perfect 0s and 1s. Real gates take time to switch (propagation delay), have voltage thresholds, pass through in-between values when changing and can be affected by noise.',
  'circ-u6-l1-q1':
    'Kirchhoff’s current law says current into a node equals current out. Charge cannot build up or disappear at a junction, so KCL is conservation of charge. It does not mean all branches carry equal current.',
  'circ-u6-l1-q2':
    'When solving, you choose a direction for each current. A negative answer just means the actual current flows opposite to the direction you assumed; the size is still correct.',
  'circ-u6-l1-q3':
    'Power dissipated in a resistor is P = I²R (equivalently V²/R or VI). With positive R it is always zero or positive: resistors only turn electrical energy into heat.',
  'circ-u6-l1-q4':
    'Kirchhoff’s voltage law: going around a loop, voltage rises equal drops. Starting at the source and moving with the current: +Vs − IR₁ − IR₂ = 0. So I = Vs ÷ (R₁ + R₂).',
  'circ-u6-l1-q5':
    'A dependent equation is a combination of others you already have, so it adds no new information. To solve for n unknowns you need n independent equations; extra dependent ones cannot fill the gap.',
  'circ-u6-l1-q6':
    'By Ohm’s law, current through a resistor equals the voltage across it divided by R. From node a to node b that is I = (Va − Vb) ÷ R. A positive result means current flows from a to b.',
  'circ-u6-l1-q7':
    'Check that currents balance at each node (KCL) and voltages sum to zero around each loop (KVL), and that source power equals total resistor power. Also test limiting cases: if a resistor were zero or infinite, does the answer behave sensibly?',
  'circ-u7-l1-q1':
    'A voltmeter measures the voltage difference between two points, so its probes go across a component, in parallel. It has a very high resistance, so it draws almost no current. An ammeter, not a voltmeter, goes in series.',
  'circ-u7-l1-q2':
    'An ohmmeter sends its own small current through the component. Measuring in a powered circuit gives wrong readings and can damage the meter, so turn off the power and follow the meter’s instructions.',
  'circ-u7-l1-q3':
    'In a series voltage divider, the same current flows through both resistors, so each voltage is proportional to its resistance: V₁/V₂ = R₁/R₂. That shared current, from the series connection, is what makes the divider calculation work.',
  'circ-u7-l1-q4':
    'On many breadboards, the long power rails are split in the middle or are not connected between the two sides. Checking continuity confirms that power actually reaches where you expect.',
  'circ-u7-l1-q5':
    'A meter is not perfect: a voltmeter draws a small current and an ammeter adds a small resistance. Connecting it slightly changes the circuit, so the reading can differ from the value without the meter, especially in high-resistance circuits.',
  'circ-u7-l1-q6':
    'If a resistor is still connected in a circuit, the ohmmeter also measures any parallel paths through other components, usually giving a lower reading. Disconnecting at least one end measures only the component.',
  'circ-u7-l1-q7':
    'Predict what each labeled node should read, measure and compare to find where the circuit departs from expectation. Check the wiring there, then change one suspected thing at a time so you know what fixed it.',
  'circ-u8-l1-q1':
    'No. Brightness depends on the LED’s efficiency, color (the eye is more sensitive to green), lens and viewing angle. Two LEDs with the same current can look very different.',
  'circ-u8-l1-q2':
    'Time = capacity ÷ current = 1.5 Ah ÷ 0.30 A = 5 h. The amps cancel, leaving hours. This ideal estimate ignores efficiency losses.',
  'circ-u8-l1-q3':
    'Changing one thing at a time shows which change fixed or affected the problem. Changing several at once leaves the cause unknown and can introduce new faults.',
  'circ-u8-l1-q4':
    'LEDs vary slightly in forward voltage. If several share one resistor in parallel, the one with the lowest V_F takes most of the current and may burn out while others stay dim. A resistor per LED sets each current independently.',
  'circ-u8-l1-q5':
    'Ideal charge time = capacity ÷ current. Real chargers reduce current as the battery fills (tapering), some energy is lost as heat, and temperature or safety limits slow charging, so it takes longer than the ideal estimate.',
  'circ-u8-l1-q6':
    'Label each switch’s common and traveler terminals, then check continuity or the load for every combination of switch positions (for two switches, four cases). The circuit is correct only if each case behaves as designed.',
  'circ-u8-l1-q7':
    'If the source reads its correct voltage with no load but drops sharply when a load is connected, its internal resistance or current limit is too high for that load. The source, not the wiring, is the bottleneck.',
  'circ-u9-l1-q1':
    'A D flip-flop stores one bit: at the clock edge it copies D to its output and holds it until the next edge. That memory is what makes a circuit sequential rather than purely combinational.',
  'circ-u9-l1-q2':
    'The "virtual short" assumes the two op-amp inputs are at nearly the same voltage. That holds only with negative feedback and when the output is within its linear range, not saturated against a supply rail.',
  'circ-u9-l1-q3':
    'β (current gain, I_C ÷ I_B) varies widely between transistors of the same model and changes with collector current and temperature. Good designs work over a range of β rather than relying on one value.',
  'circ-u9-l1-q4':
    'A latch is level-sensitive: while enabled, its output follows the input. An edge-triggered flip-flop samples its input only at a clock edge (rising or falling) and ignores changes at other times.',
  'circ-u9-l1-q5':
    'Setup time is how long the data input must be stable before the clock edge for the flip-flop to capture it reliably. If data changes too close to the edge, the stored value may be wrong or unstable.',
  'circ-u9-l1-q6':
    'The ideal gain formula, such as −R_f/R_in, assumes a perfect op-amp. Real outputs cannot exceed the supply rails, can supply limited current and lose gain at high frequencies, so the formula fails beyond those limits.',
  'circ-u9-l1-q7':
    'The Boolean lab checks logic: which outputs follow from which inputs. It does not show whether real transistors are biased correctly or whether real circuits meet timing requirements such as setup time and delays.',
  'circ-u10-l1-q1':
    'No. If every reading is shifted by the same amount, averaging keeps that shift. Only calibration or a correction removes bias; repeating reduces random scatter.',
  'circ-u10-l1-q2':
    'A good diagnostic test gives different results depending on which possible cause is true, so its outcome rules some causes out. Repeating a guess or changing everything at once does not narrow the problem.',
  'circ-u10-l1-q3':
    'A requirement must be testable, for example "LED current 15 ± 2 mA at 9 V input". Vague goals like "works well" or listing component names cannot show whether the design meets them.',
  'circ-u10-l1-q4':
    'If the supply or ground reference is faulty, many parts of the circuit misbehave at once. Checking power and reference first catches that common cause before you chase misleading downstream symptoms.',
  'circ-u10-l1-q5':
    'Data are what you actually measured. Predictions are what a model says should happen, given its assumptions. Comparing them tests the model; mixing them up hides real problems.',
  'circ-u10-l1-q6':
    'At fixed voltage, I = V/R and P = V²/R. Lowering resistance increases current and power, which gives more output but also more heat and faster battery drain. Raising resistance does the opposite.',
  'circ-u10-l1-q7':
    'A useful handoff includes the schematic, expected and measured values with units, which hypotheses were tested and ruled out, and what remains uncertain. Then a teammate can continue without repeating work.',
  'circ-u9-l1-b-q1':
    'The other LED branch lights, so the battery works. A dark LED with an intact path is most likely reversed. Turning off power, flipping it and keeping its resistor tests that cause safely. Removing resistors or shorting the battery could damage parts.',
  'circ-u9-l1-b-q2':
    'A full answer uses the working branch as evidence the supply is fine, compares the polarity and connections of the two LEDs, then disconnects power, reverses the faulty LED, keeps its resistor and retests.',
  'circ-u9-l1-b-q3':
    'An open circuit has a break in the path, such as an open switch, loose wire or burned-out part, so current cannot flow all the way around. Voltage can still appear across the gap.',
};
