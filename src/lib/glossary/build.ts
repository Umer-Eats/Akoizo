import type { GlossaryEntries } from './index.ts';

// Build events. Keys list the term first, then other word forms separated by "|".
const physics: GlossaryEntries = {
  'Acceleration|accelerating|accelerate':
    'How quickly speed changes. A bigger force or a lighter object gives more acceleration.',
  'Deceleration|decelerate|decelerates': 'Slowing down; the rate at which speed drops.',
  Velocity: 'Speed in a particular direction.',
  'Voltage|voltages':
    'The electric “push” from a battery or supply, in volts; higher voltage drives more current.',
  'DC|direct current': 'Direct current: electricity that flows one way, as from a battery.',
  'AC|alternating current':
    'Alternating current: electricity that switches direction many times a second, as from a wall outlet.',
  Friction: 'The force that resists sliding or rolling; it turns motion energy into heat.',
  'Kinetic energy|kinetic': 'Energy of motion; it grows with the square of speed.',
  'Potential energy':
    'Stored energy, such as from height, a stretched rubber band or a squeezed spring.',
};

const flight: GlossaryEntries = {
  'Flight time|flight times':
    'The time from release until the aircraft lands or is stopped; it is the scored number in flight events.',
  'Ceiling|ceilings':
    'The roof of the flying room. A higher ceiling allows a higher climb and usually a longer flight.',
  'Trim|trimmed|trimming':
    'Small adjustments to wing, tail or weight placement that make an aircraft fly steadily on its own.',
  'Stabilizer|stabilizers':
    'The small horizontal tail surface. It keeps the nose from pitching up or down on its own.',
  'Fin|fins': 'A small vertical surface at the tail that keeps the craft pointing straight ahead.',
  Rudder: 'A movable or bendable vertical tail surface; tilting it makes the aircraft turn.',
  'Stall|stalls|stalled|stalling':
    'When a wing meets the air at too steep an angle, the airflow breaks away and lift suddenly drops.',
  'Airfoil|airfoils':
    'The curved cross-section shape of a wing, built so air flowing over it creates lift.',
  'Camber|cambered':
    'The upward curve of a wing from front to back. More camber gives more lift but more drag.',
  Dihedral:
    'The upward tilt of the wings from the middle to the tips; it helps the plane level itself after a bank.',
  Incidence:
    'The angle a wing or stabilizer is mounted at, compared with the body of the aircraft.',
  'Bank|banks|banked|banking':
    'Tilting the wings to one side. A banked aircraft turns toward the low wing.',
  Fuselage: 'The main body or stick of an aircraft that holds the wing, tail and nose together.',
  Airframe: 'The whole aircraft structure without its motor: wing, tail and body.',
  Wingspan: 'The distance from one wing tip to the other.',
  'Rib|ribs': 'Thin cross-pieces inside a wing that hold the covering in the airfoil shape.',
  Airspeed: 'How fast the aircraft moves through the air around it.',
  'Drafts|draft':
    'Air currents in the room from vents, doors or people; they push light aircraft off course.',
  'Free-flight':
    'Flying with no remote control; the aircraft has to be trimmed to fly well by itself.',
  'Spiral|spirals|spiraling':
    'A turning path that keeps getting steeper or tighter, often ending in a dive.',
  'Dive|dives|diving': 'A steep nose-down path where the aircraft gains speed and loses height.',
  'Induced drag':
    'Drag created as a side effect of making lift, mostly from swirling air at the wing tips.',
  'Parasite drag':
    'Drag from pushing the aircraft’s shape through the air, such as from the body and struts.',
  Flutter:
    'A fast shaking of a thin wing or tail surface caused by the airflow; it wastes energy and can break parts.',
  'Shim|shims':
    'A thin piece slipped under a wing or tail edge to change its angle by a small amount.',
  'Jig|jigs': 'A template or holder that keeps parts in the same position each time you build.',
};

const machines: GlossaryEntries = {
  'Lever|levers':
    'A rigid bar that turns about a fixed point (the fulcrum) to trade force for distance.',
  Fulcrum: 'The fixed pivot point a lever turns around.',
  'First-class lever|first-class':
    'A lever with the fulcrum between the effort and the load, like a seesaw.',
  'Second-class lever|second-class':
    'A lever with the load between the fulcrum and the effort, like a wheelbarrow.',
  'Third-class lever|third-class':
    'A lever with the effort between the fulcrum and the load, like tweezers.',
  'Pulley|pulleys':
    'A wheel with a grooved rim that guides a rope or string; movable pulleys reduce the force needed.',
  'Movable pulley':
    'A pulley that moves with the load; it halves the pulling force but doubles the rope you must pull.',
  'Inclined plane|incline':
    'A ramp; pushing a load up a gentle slope takes less force over a longer distance.',
  'Screw|screws':
    'An inclined plane wrapped around a rod; each turn moves it forward by one thread spacing.',
  'Wheel and axle':
    'A large wheel fixed to a smaller rod so both turn together; a small force on the wheel gives a large turning force on the axle.',
  'Axle|axles': 'The rod a wheel turns on or is fixed to.',
  Wedge: 'Two inclined planes back to back, used to split or lift things apart.',
  'Simple machine|simple machines':
    'One of six basic devices (lever, pulley, wheel and axle, inclined plane, wedge, screw) that change the size or direction of a force.',
  'IMA|ideal mechanical advantage':
    'Ideal mechanical advantage: how many times a machine multiplies force if there were no friction, found from distances moved.',
  'Pitch|thread pitch|fine-pitch':
    'For a screw, the distance between neighbouring threads, which is how far it moves in one full turn.',
};

const vehicle: GlossaryEntries = {
  'Encoder|encoders':
    'A sensor that counts small steps of a wheel or motor turning, so the program knows how far it has gone.',
  'Microcontroller|microcontrollers':
    'A tiny programmable computer on one chip (an Arduino is one) that reads sensors and controls motors.',
  'Arduino|arduinos': 'A popular brand of beginner-friendly microcontroller board.',
  'Motor driver':
    'A chip or board that lets a small microcontroller signal switch the larger motor current on, off and in reverse.',
  Supercapacitor:
    'A capacitor that stores much more charge than a normal one and can release it quickly for a burst of power.',
  'Capacitor|capacitors': 'An electronic part that stores electric charge and releases it quickly.',
  'Boost converter':
    'A circuit that raises battery voltage to a higher voltage, such as 12 V from a few AA cells.',
  Torque: 'Turning force. It equals the force times its distance from the pivot or axle.',
  'Cruise|cruise speed|cruises':
    'The steady middle part of a run, at constant speed, between speeding up and slowing down.',
  'PID|PID control':
    'A feedback method that corrects a motor using the error now (P), its build-up over time (I) and how fast it changes (D).',
  'Closed-loop':
    'Control that measures what really happened (such as wheel turns) and corrects it while running.',
  'Open-loop': 'Control that runs a fixed plan without measuring and correcting along the way.',
  'Slip|slips|slipping':
    'When a wheel spins without gripping, so the vehicle moves less than the wheel turns.',
  'Skid|skids': 'When a locked or braking wheel slides along the floor instead of rolling.',
  'Braking|brake|brakes':
    'Slowing the vehicle on purpose, by a motor, friction pad or wing nut stop.',
  Drivetrain: 'Everything that carries power from the motor or spring to the wheels.',
  'Gearbox|geared|gear|gears':
    'Toothed wheels that trade speed for turning force between a motor and an axle.',
  'Bushing|bushings':
    'A smooth sleeve an axle turns inside of, used to reduce friction and wobble.',
  'NiMH|nickel-metal hydride':
    'Nickel-metal hydride: a common rechargeable battery type, about 1.2 V per cell.',
  Alkaline: 'The common disposable battery type, about 1.5 V per cell when fresh.',
  Lithium:
    'A battery chemistry with high energy for its weight; often limited or banned by rules for safety.',
  Circumference:
    'The distance around a wheel. One full wheel turn moves the vehicle one circumference.',
  'Revolution|revolutions': 'One full turn of a wheel, axle or propeller.',
  'Calibrate|calibrating|calibration|recalibrate':
    'Testing against known values and adjusting settings so the measured result matches reality.',
};

const timing: GlossaryEntries = {
  'Target Time|target time':
    'A run time announced at the tournament; scores improve the closer the real run comes to it.',
  'Impound|impounded|impounding':
    'Turning in your device before the event starts; it stays with officials and cannot be changed.',
  'Interpolate|interpolated|interpolating':
    'Estimating a value between two measured points, such as a setting between two tested times.',
};

export const buildGlossaries: Record<string, GlossaryEntries> = {
  boomilever: {
    ...physics,
    ...timing,
    'Boomilever|boomilevers':
      'A wooden structure that sticks out sideways from a wall and holds a hanging load, like a crane arm.',
    'Strut|struts':
      'A member pushed on (in compression); in a boomilever it braces the load back against the wall.',
    'Chord|chords':
      'A main long member along the top or bottom edge of the structure, carrying tension or compression.',
    'Member|members': 'One stick or piece in a structure.',
    'Buckling|buckle|buckles|buckled':
      'When a long, thin member under compression suddenly bows sideways and collapses.',
    'Brace|braces|bracing|braced':
      'A small cross-piece that connects members to stop them from bending or buckling.',
    'Mounting Bolt|bolt':
      'The bolt on the Testing Wall that the boomilever hangs on and pushes against.',
    Eyebolt: 'A bolt with a loop at its head; the load is hung from it.',
    'S-hook': 'An S-shaped hook used to hang the bucket from the loading point.',
    'Bucket|load bucket':
      'The container hung from the structure and filled with sand to apply the test load.',
    'Centerline|centerlines': 'An imaginary line through the exact middle of a part or space.',
    'Cross-section':
      'The shape you would see if you cut straight through a member, such as a square 3 mm × 3 mm.',
    Clearance: 'The required gap between parts, or between the structure and a limit line.',
    'Laminate|laminated':
      'Made by gluing thin layers together; this makes a member stronger and more uniform.',
    Basswood:
      'A light, even-grained wood often used for structures; heavier and stronger than balsa.',
    Plywood: 'Wood sheets made of thin layers glued with the grain crossing.',
    Particleboard: 'Board pressed from wood chips and glue.',
    'Composite|composites':
      'A material made of two or more materials bonded together, such as fibre and glue.',
    Hardwood: 'Dense wood such as maple or oak; it resists denting where a bolt presses on it.',
    'End-grain':
      'The cut end of wood where you see the growth rings; it soaks up glue and bonds poorly.',
    'Long-grain':
      'The side of wood running along the fibres; long-grain to long-grain glue joints are strongest.',
    'Gusset|gussets|gusseted':
      'A small flat plate glued across a joint to give the glue more area.',
    'Cyanoacrylate|CA':
      'Cyanoacrylate: fast-setting “super glue” often used to join wooden sticks.',
    Epoxy: 'A two-part glue that sets hard and fills gaps; slower but strong.',
    Adhesive: 'Glue or any substance that bonds two surfaces together.',
    'Bearing|bearing block|bearing stress':
      'The pressure where one part pushes on another, such as wood resting on the bolt.',
    'Tensile|tensile strength':
      'Tensile strength is how hard you can pull on a material before it breaks.',
    Slender: 'Long and thin; slender members buckle much more easily.',
    'Pinned|pinned ends':
      'Ends that are held in place but free to rotate, the usual model for glued stick joints.',
    EI: 'Bending stiffness: E is the material’s stiffness and I is how the cross-section resists bending.',
    'Euler load|critical load':
      'The compressive force at which a slender column buckles, P = π²EI ÷ L².',
    'Break-even': 'The load or ratio at which two choices give the same score.',
    'Deflection|deflecting|deflects':
      'How far a structure bends or moves away from its unloaded position.',
    'Newton|newtons': 'The SI unit of force; about the weight of a 100 g mass.',
    Pivot: 'The point something turns around.',
    Washer: 'A flat ring placed under a nut or bolt head to spread its pressure.',
  },
  hovercraft: {
    ...physics,
    ...timing,
    Hovercraft:
      'A vehicle that floats on a cushion of air pushed underneath it, so it slides with almost no friction.',
    'Cushion|air cushion':
      'The layer of higher-pressure air trapped under the hovercraft that lifts it.',
    'Skirt|curtain': 'The flexible border around the base that traps air under the craft.',
    Hull: 'The main body or base of the hovercraft.',
    'Levitate|levitated|levitation': 'To lift and float, here on the air cushion.',
    Dowel:
      'A wooden rod mounted on the vehicle; its position is used to judge when the craft crosses the finish line.',
    'Duct|ducted': 'A tube or shroud around a fan that directs its air.',
    'Propeller|propellers|prop':
      'Spinning blades that push air backward to drive the craft forward.',
    'Impeller|impellers': 'A fan that pushes air into the cushion to lift the craft.',
    Brushless:
      'A motor type that switches its current electronically instead of with rubbing brushes.',
    'Rheostat|rheostats': 'A variable resistor with a knob or slider, used to change motor speed.',
    'Resistor|resistors':
      'A part that limits electric current; more resistance means less current.',
    'Relay|relays':
      'A switch flipped by a small electric signal, often to turn a larger current on or off.',
    'Voltage|voltages':
      'The electric “push” from a battery; higher voltage usually spins a motor faster.',
    'NiMH|nickel-metal hydride':
      'Nickel-metal hydride: a rechargeable battery type, about 1.2 V per cell.',
    Alkaline: 'The common disposable battery type, about 1.5 V per cell when fresh.',
    Lithium:
      'A battery chemistry with high energy for its weight; often limited by rules for safety.',
    'Class III calculator|Class III':
      'A calculator category in the Science Olympiad rules that allows graphing calculators.',
    'Nickel|nickels': 'US 5-cent coins used as standard masses to load the hovercraft.',
    'Newton’s second law|Newton’s laws':
      'Force equals mass times acceleration (F = ma): the same push speeds a lighter craft up more.',
    'Leakage|leak|leaks': 'Air escaping from under the skirt; more leakage means less lift.',
    Perimeter: 'The distance all the way around the edge of the craft.',
    Runtime: 'How long the craft takes to travel the track.',
    'Calibrate|calibration|recalibrate':
      'Testing against known values and adjusting so your settings give the times you expect.',
  },
  'ping-pong-parachute': {
    ...physics,
    'Bottle rocket|rocket|rockets':
      'A plastic soda bottle launched by compressed air, with fins and a payload on top.',
    'Payload|payloads':
      'The cargo the rocket carries; here, the ping pong ball inside its holder with the parachute.',
    'Parachute|parachutes':
      'A cloth or plastic canopy that catches air to slow the payload’s fall.',
    'Canopy|canopies': 'The main fabric part of the parachute that fills with air.',
    'Descent|descents|descends': 'The trip back down; a slow descent gives a longer flight time.',
    Ascent: 'The trip upward after launch.',
    'Launcher|launch pad': 'The stand that holds and pressurizes the rocket before launch.',
    Nozzle: 'The bottle’s neck opening, where water or air rushes out to push the rocket up.',
    'Pressurize|pressurized|pressurizes':
      'Pumping air into the bottle so it is under higher pressure than the outside air.',
    'Gauge|pressure gauge': 'A dial that shows the pressure inside the bottle.',
    'Schrader valve': 'The same kind of air valve used on bike tires, used to pump up the rocket.',
    Psi: 'Pounds per square inch, a unit of pressure.',
    'Deployment|deploy|deploys': 'The moment the parachute comes out and opens.',
    'Vent|vents|spill hole':
      'A small hole in the top of a canopy that lets some air through so it falls more steadily.',
    Drag: 'The force of air pushing back against something moving through it; parachutes use drag to slow down.',
    'Terminal velocity': 'The steady falling speed reached when air drag balances the weight.',
    Mylar: 'A thin, strong plastic film often used for lightweight parachutes.',
    'Shroud lines|shroud line': 'The strings connecting the canopy to the payload.',
    Aerodynamic: 'Shaped so air flows smoothly around it, which lowers drag.',
    'Newton’s third law':
      'Every push has an equal, opposite push: air thrown down out of the nozzle pushes the rocket up.',
    Thrust: 'The upward push on the rocket from the air escaping the nozzle.',
    'Coast|coasts|coasting':
      'Moving upward after the thrust ends, slowing down because of gravity and drag.',
    Apogee: 'The highest point of the flight.',
    HVAC: 'Heating, ventilation and air conditioning; its airflow can push a slow parachute off course.',
    'Fin|fins': 'Flat pieces at the base of the rocket that keep it flying straight, nose first.',
    'Interpolate|interpolating': 'Estimating a value between two measured points.',
  },
  'electric-vehicle': {
    ...physics,
    ...timing,
    ...vehicle,
    'Pusher|pushers':
      'The front attachment that pushes the bottle; a wider opening scores a better Pusher Bonus.',
    'Laser pointer|laser':
      'A small light beam on the vehicle used only for aiming it before the run.',
  },
  'mission-possible': {
    ...physics,
    ...machines,
    'Action|actions':
      'One scored step of the device, where one kind of energy transfer triggers the next.',
    'Trigger|triggers|triggered|triggering':
      'The event that starts the next action, such as a falling marble pressing a switch.',
    'Initiate|initiates': 'To start the device’s first action.',
    'Sodium bicarbonate|baking soda':
      'Baking soda; it reacts with acids such as vinegar to release carbon dioxide gas.',
    Vinegar: 'A dilute solution of acetic acid; it reacts with baking soda to make carbon dioxide.',
    'Citric acid|citric':
      'A weak acid in citrus fruit; it reacts with baking soda to make carbon dioxide gas.',
    'CO₂|carbon dioxide': 'Carbon dioxide, the gas made when baking soda reacts with an acid.',
    'Reactant|reactants': 'A starting substance that is used up in a chemical reaction.',
    'Limiting reactant': 'The reactant that runs out first, which sets how much product can form.',
    'Mole|moles':
      'A counting unit for particles: 6.02 × 10²³ of them. Chemists compare reactants in moles.',
    'Alka-Seltzer':
      'A tablet with citric acid and baking soda that fizzes out CO₂ when it touches water.',
    'Ammonium nitrate|ammonium': 'A salt that cools water as it dissolves; used in cold packs.',
    Endothermic: 'A change that absorbs heat, so the surroundings get colder.',
    'Bimetallic strip|bimetallic':
      'Two metals bonded together that expand by different amounts, so the strip bends when heated.',
    Solenoid:
      'A coil of wire that becomes a magnet when current flows, often used to push or pull a small rod.',
    Electromagnet:
      'A magnet made by running current through a coil of wire; it switches off when the current stops.',
    Transmitter: 'The part that sends a signal, such as an infrared light, to a receiver.',
    Receiver:
      'The part that detects a signal, such as an infrared light, and switches something on.',
    Photodiode: 'A light sensor that lets current flow when light hits it.',
    'IR|infrared': 'Infrared light, invisible to the eye, often used in remote controls.',
    'Circuit|circuits':
      'A closed path for electric current, from the battery through the parts and back.',
    Spool: 'A small cylinder that string winds around.',
    Helix: 'A spiral shape like a spring or the thread of a screw.',
    Piston:
      'A part that slides inside a tube and is pushed by pressure, such as gas from a reaction.',
    Tolerance: 'How much a size or setting can vary and still work.',
    'Coin sorter|sorter':
      'A device that separates coins by size, so each kind ends up in its own place.',
    Chute: 'A sloped channel that guides a coin or ball as it falls or slides.',
    'Ordinal numerals|ordinal': 'Numbers that give order: first, second, third.',
    Disqualification: 'Losing your score or ranking because a rule was broken.',
  },
  'wright-stuff': {
    ...physics,
    ...flight,
    'Propeller|propellers|prop':
      'Spinning blades that push air backward to pull the plane forward.',
    'Blade|blades': 'One arm of the propeller.',
    'Variable-pitch':
      'A propeller whose blade angle can change during flight, taking big bites of air early and smaller ones later.',
    'Pitch|propeller pitch':
      'How far a propeller would move forward in one turn, set by its blade angle.',
    'Winder|winding|wound|wind':
      'Twisting the rubber motor to store energy, often with a hand-cranked winder that counts turns.',
    'Burst|burst of power':
      'The fast, strong spin right after release, when the rubber has the most torque.',
    Torque: 'Turning force; a tightly wound rubber motor gives high torque at the start.',
    'O-ring|o-rings': 'A small rubber ring, used here to hold parts in place.',
    'Rubber motor': 'The twisted loop of rubber that stores energy and spins the propeller.',
    'Lubricant|lubricating':
      'A slippery coating rubbed on the rubber so it winds more turns without breaking.',
    Bearing: 'The smooth part the propeller shaft turns in, used to lower friction.',
  },
  'elastic-launched-gliders': {
    ...physics,
    ...flight,
    'Glider|gliders': 'An aircraft with no motor that flies by trading height for forward speed.',
    'Glide|glides|gliding': 'Flying without power, sinking slowly while moving forward.',
    CG: 'Center of gravity: the balance point of the glider. Its position sets how the glider pitches.',
    Decalage: 'The difference in mounting angle between the wing and the stabilizer.',
    'Neutral point':
      'The balance point for the air forces; the CG must be ahead of it for stable flight.',
    'Launcher|elastic launcher':
      'The rubber-band catapult used to fling the glider up to its starting height.',
    'Nose-up': 'Tilted with the front higher than the back.',
    Boron: 'A very stiff, light fibre sometimes added to wing edges or the fuselage for strength.',
    'Asymmetry|asymmetries':
      'Differences between the left and right sides that make the glider turn.',
    'Warp|warps':
      'A twist or bend in a thin wing or tail, often from humidity, that changes how it flies.',
    Notch: 'The small cut in the fuselage where the elastic hooks for launch.',
    'Loop|looping': 'Flying in a full upward circle, usually from too much speed or nose-up trim.',
    Moment: 'The turning effect of a force about a point: force times distance from that point.',
  },
  'roller-coaster': {
    ...physics,
    ...machines,
    ...timing,
    'Roller coaster':
      'A track that rolls a ball from a high start to the end by gravity, with the run timed against a Target Time.',
    'Potential energy|gravitational potential energy':
      'Stored energy due to height. A ball at the top of the track has the most.',
    'Kinetic energy': 'Energy of motion; it grows as the ball speeds up going downhill.',
    'Loop|loops':
      'A vertical circle in the track. The ball needs enough speed at the top to stay on.',
    Concave: 'Curved inward like the inside of a bowl.',
    Sphere: 'A ball shape.',
    'Latch|latches': 'A catch that holds something in place until it is released.',
    'Gate|gates': 'A barrier that holds or releases the ball at a set point on the track.',
    'Timekeeper|timekeepers': 'An official who times the run.',
    Friction: 'The force that resists sliding or rolling; it turns motion energy into heat.',
  },
  scrambler: {
    ...physics,
    'Scrambler|scramblers':
      'A vehicle that carries a raw egg to a stop near a wall as fast as possible without cracking it.',
    Propulsion: 'What drives the vehicle forward, usually a falling mass pulling a string.',
    'Falling mass':
      'A weight that drops and pulls a string wound on an axle, which turns the wheels.',
    'Axle|axles': 'The rod the wheels are fixed to or turn on.',
    'Pulley|pulleys': 'A grooved wheel that guides the string and changes its direction.',
    'Braking|brake|brakes': 'Slowing the vehicle on purpose before it reaches the wall.',
    'Wing nut brake|wing nut':
      'A nut that travels along a threaded axle and jams against a stop after a set number of turns.',
    'Threaded rod|threads':
      'A rod with a screw thread; a nut moves along it by a fixed distance each turn.',
    'Slip|slips': 'When a wheel spins without gripping, so the vehicle does not move as far.',
    'Skid|skids': 'When a locked wheel slides along the floor instead of rolling.',
    'Tether|tethered':
      'A cord connecting the vehicle to something outside it; scramblers may not be tethered.',
    'Bushing|bushings': 'A smooth sleeve the axle turns inside, which lowers friction and wobble.',
    Torque: 'Turning force on the axle, such as from the string pulling on it.',
    Circumference:
      'The distance around a wheel. One wheel turn moves the vehicle one circumference.',
    'Rim|rims': 'The outer edge of a wheel.',
    Momentum:
      'Mass times velocity. A heavier or faster vehicle has more momentum and is harder to stop.',
    'Kinetic energy': 'Energy of motion; it grows with the square of speed.',
    'Deceleration|decelerate': 'Slowing down; the rate at which speed drops.',
    Barrier: 'The wall or block at the end of the track.',
    'Hairline crack|hairline': 'A very thin crack in the eggshell, still counted as a break.',
    'Can bonus|cans':
      'Extra score for driving between or around cans on an arc path instead of straight.',
    Arc: 'A curved path, part of a circle; it is longer than the straight line between its ends.',
  },
};
