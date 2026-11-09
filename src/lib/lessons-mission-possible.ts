import { buildEventCourse } from './build-course-kit.ts';

// Mission Possible C (2027): a Rube Goldberg-like device from coin start to gum drop. High score wins.
export const missionPossibleLessons = buildEventCourse({
  eventId: 'mission-possible',
  eventName: 'Mission Possible',
  prefix: 'mp',
  division: 'C',
  intro:
    'Seven units walk through a chain-reaction device that starts with a coin and ends by dropping a pack of gum. You will learn where the points are, the physics and chemistry behind each scorable action, how to time the run, and how to document and run the device so every point you build is actually scored.',
  references: [
    {
      title: 'Science Olympiad: Mission Possible C',
      url: 'https://www.soinc.org/mission-possible-c',
    },
    {
      title: 'OpenStax College Physics: Simple Machines',
      url: 'https://openstax.org/books/college-physics-2e/pages/9-5-simple-machines',
    },
  ],
  units: [
    {
      title: 'Where the points are: building a scoring plan',
      objectives: [
        'List every source of points and penalties.',
        'Estimate a device’s total score before building it.',
        'Prioritize reliable points over risky ones.',
      ],
      sections: [
        [
          'The structure of the event',
          'The device begins with a coin dropped into a vertical slot and ends by dropping a commercially purchased, unaltered 5-stick pack of gum at least 50 cm onto a small platform. Between them, teams may build up to 12 specific scorable actions worth 50 points each. High score wins, and points also come from timing, documentation, setup speed, size, and running without adjustments.',
        ],
        [
          'Big-ticket items',
          'The Final Action is worth 250 points. The Start Action earns 25, 50, or 200 points depending on which coin starts it. Twelve scorable actions are worth up to 600. Time earns 2 points per full second of operation up to the Target Time, which is 60 s at Regionals, so up to 120 points there, and more at State and Nationals.',
        ],
        [
          'Smaller, reliable points',
          'The Action Sequence List (ASL) earns up to 100 points: 25 each for on-time submission, proper format, accurate and complete descriptions, and matching labels in the device. Setup within 30 minutes earns 50 (at State and Nationals, 75 within 15 minutes). A run with no adjustments earns 75. Each dimension under 80 cm earns 0.1 point per 0.1 cm, up to 30 per dimension.',
        ],
        [
          'Penalties',
          'Running past the Target Time costs 2 points per second up to twice the Target Time, and a run reaching twice the Target Time earns no time points. Each touch or adjustment costs 25, up to three. Any solid or liquid leaving the device costs 50. Electricity after 30 seconds costs 250 and voids the action. Each dimension over 80 cm costs 25.',
        ],
        [
          'Tiers',
          'Tier 1 devices have no violations. Tier 2 devices have construction or run violations not otherwise penalized, or any dimension over 82 cm. Tier 3 includes late impound, participants without eye protection, and teams unable to answer build questions. Unsafe or remotely controlled devices receive participation points only. Ties go to fewest penalty points, then the smallest L + D + H.',
        ],
        [
          'Planning for reliability',
          'Every scorable action must work in sequence for the final 250 to arrive. One jammed action can cost a touch penalty, the no-adjustment bonus, and time. So a device with eight dependable actions often outscores one with twelve fragile ones. Build the start and final actions first, then add scorable actions one at a time, keeping only those that work nearly every run.',
        ],
      ],
      terms: [
        ['Start Action', 'Coin-triggered first action, worth 25, 50, or 200 points.'],
        ['Scorable action', 'One of 12 listed tasks, 50 points each when completed as described.'],
        ['Final Action', 'Dropping the gum pack 50 cm onto the platform; 250 points.'],
        ['Target Operation Time', '60 s at Regionals, 61–90 s at State, 91–120 s at Nationals.'],
        [
          'Action Sequence List (ASL)',
          'Numbered documentation of every action, worth up to 100 points.',
        ],
        ['Touch', 'An adjustment during the run; −25 each, up to three.'],
      ],
      example: [
        'A Regional device starts on the first coin, completes 8 scorable actions and the Final Action at 58 s, earns all ASL points, sets up in 20 minutes, has no adjustments, and measures 60 × 60 × 70 cm. Estimate its score.',
        [
          'Start 25 + actions 8 × 50 = 400 + Final 250 = 675.',
          'Time 58 × 2 = 116; ASL 100; setup 50; no adjustments 75.',
          'Size: 20 cm, 20 cm, and 10 cm under 80 → 20 + 20 + 10 = 50.',
        ],
        'Total ≈ 675 + 116 + 100 + 50 + 75 + 50 = 1,066 points.',
      ],
      mcq: [
        [
          'How many points is each completed scorable action worth?',
          '50',
          ['25', '100', '250'],
          'Each of the 12 listed scorable actions earns 50 points the first time it is successfully completed as described in the rules, up to 600 total.',
        ],
        [
          'A device has one dimension of 83 cm. What happens?',
          'It runs but is scored in Tier 2, with a 25-point penalty',
          ['It cannot run', 'Only a 25-point penalty', 'It is scored in Tier 3'],
          'Each dimension over 80 cm costs 25 points, and any dimension over 82 cm places the device in Tier 2, though it may still run.',
        ],
        [
          'What is the first tiebreaker?',
          'Fewest penalty points',
          ['Smallest device', 'Fastest setup', 'Most scorable actions'],
          'Ties are broken first by fewest penalty points and then by the smallest overall dimension (L + D + H).',
        ],
      ],
      written: [
        [
          'Why can a device with fewer actions outscore one with more?',
          'Unreliable actions cause jams, touch penalties, loss of the 75-point no-adjustment bonus, wasted time, and possibly no Final Action.',
          'One failure can cost far more than 50 points through penalties and lost bonuses. Reliability multiplies the value of every action.',
        ],
        [
          'Calculate the size points for a device measuring 70.0 × 45.0 × 79.5 cm.',
          '10 cm under → 10 points; 35 cm under → capped at 30; 0.5 cm under → 0.5. Total 40.5.',
          'Each 0.1 cm under 80 earns 0.1 point, capped at 30 per dimension. The middle dimension hits the cap.',
        ],
        [
          'List the four ways to earn ASL points.',
          'Submitted on time; proper format; all actions included and accurately described; device labels match the ASL numbers and task numerals.',
          'Each criterion is worth 25 points. Answers naming all four, in any order, earn full credit.',
        ],
        [
          'What happens to scoring if a team touches the device for a fourth time?',
          'Only three touches are allowed; if it stops after the third, it may not be touched again, time is scored as zero, and no further scoring occurs.',
          'The rules cap adjustments at three, each −25. A stall after the third ends all further scoring and time points.',
        ],
      ],
      flow: [
        ['Start', 'Coin triggers the first action.'],
        ['Chain', 'Scorable actions run in ASL order.'],
        ['Finish', 'Gum pack lands on the platform.'],
      ],
      compare: [
        ['Many actions', 'Up to 600 points', 'More chances to jam.'],
        ['Reliable core', 'Keeps bonuses and Final Action', 'Fewer action points.'],
        ['Small device', 'Up to 90 size points', 'Less room for actions.'],
      ],
      challenge: 'Estimate the score of a device plan and find its riskiest step.',
      takeaway:
        'Plan the whole score: reliable actions, on-time finish, and complete documentation.',
      evidence: {
        observations: [
          ['Plan A', '12 actions, works in 6 of 10 test runs.'],
          ['Plan B', '9 actions, works in 10 of 10 test runs.'],
          [
            'Failure cost',
            'A failed run usually loses the Final Action, 75 no-adjust bonus, and some time points.',
          ],
        ],
        question: 'Which plan should the team bring?',
        options: ['Plan B', 'Plan A', 'Neither; add more actions'],
        correct: 0,
        explanation:
          'Plan A gains 150 action points but fails 40 percent of the time, losing 325+ points each failure. Plan B’s reliability gives a higher expected score.',
      },
    },
    {
      title: 'The Start Action: coins, slots, and selective triggers',
      objectives: [
        'Compare the sizes and masses of US nickels, dimes, and quarters.',
        'Design a slot that starts only with the coin you choose.',
        'Explain how the start points and timing work.',
      ],
      sections: [
        [
          'The coin sequence',
          'The device needs a vertical coin slot on one side, wide enough for one coin at a time. When signaled, the supervisor drops a nickel or dime first, in the announced Coin Drop Order. If that coin starts the first action, the team gets 25 points. If not, the supervisor drops the second small coin; starting then earns 50. If neither works, a quarter is dropped; starting only then earns 200.',
        ],
        [
          'Why 200 points is possible',
          'The quarter-only start rewards a device that can tell coins apart. Because the supervisor tries both smaller coins first, a mechanism that ignores the nickel and dime but triggers on the quarter earns 175 more points than a simple start. The Coin Drop Order (nickel then dime, or dime then nickel) is announced at setup, but a good sorter ignores both regardless.',
        ],
        [
          'Coin properties',
          'A dime is about 17.9 mm across and 2.27 g. A nickel is about 21.2 mm and 5.0 g. A quarter is about 24.3 mm and 5.67 g. Diameter is the cleanest difference: a quarter is about 3 mm wider than a nickel. Mass alone separates the dime, but the nickel and quarter differ by under a gram, which is harder to sense reliably.',
        ],
        [
          'Sorting by size',
          'A common design rolls each coin down a slightly tilted ramp with a gap or rail. Coins smaller than the gap fall through into a catch bin, while the quarter rides across and drops onto a trigger, such as a lever, a balanced arm, or a falling domino. Slot spacing between 22 mm and 24 mm separates them; leave room for coin wear and alignment.',
        ],
        [
          'Timing starts with motion',
          'Timing begins with the first action, not with the coin’s insertion, so the first action must be clearly visible. If the quarter fails, the team gets a 20-second countdown to drop another quarter from above the device; timing starts then, with no start points. If a team must touch the device to start it, there are no start points and a touch penalty applies.',
        ],
        [
          'Returning the coins',
          'All coins used in the Official Run are supplied by the supervisor and must be returned afterward, or a competition violation is assessed. Design the sorter so rejected coins land in an accessible bin. A small-coin bin also prevents loose coins from leaving the device, which would cost the 50-point penalty for a solid leaving the device dimensions.',
        ],
      ],
      terms: [
        ['Coin Drop Order', 'Nickel then dime, or dime then nickel, announced at setup.'],
        ['Coin sorter', 'Mechanism that separates coins by size or mass.'],
        ['Quarter-only start', 'Device ignores small coins and starts on the quarter; 200 points.'],
        ['First action', 'Visible motion that starts timing.'],
        ['Catch bin', 'Container for rejected coins so they can be returned.'],
        ['Countdown restart', '20 s for the team to drop a quarter from above; no start points.'],
      ],
      example: [
        'Design a rail gap that rejects nickels and dimes but passes quarters to a trigger, allowing 0.5 mm tolerance each side.',
        [
          'Largest coin to reject: nickel, 21.2 mm; gap must be wider than 21.2 + 0.5 = 21.7 mm.',
          'Smallest coin to keep: quarter, 24.3 mm; gap must be narrower than 24.3 − 0.5 = 23.8 mm.',
          'Choose a gap near 22.7 mm, centered in the 21.7–23.8 mm window.',
        ],
        'A gap near 22.7 mm drops both small coins and carries the quarter to the trigger.',
      ],
      mcq: [
        [
          'A device ignores the first coin but starts on the second coin. How many start points?',
          '50',
          ['25', '200', '0'],
          'Starting on the second coin dropped by the supervisor earns 50 points. The first coin earns 25, and the quarter after both small coins earns 200.',
        ],
        [
          'Which property most cleanly distinguishes a quarter from a nickel?',
          'Diameter',
          ['Mass', 'Color', 'Magnetism'],
          'The quarter is about 3 mm wider than the nickel, while their masses differ by less than 1 g. Neither is strongly magnetic, and color is similar.',
        ],
        [
          'When does timing begin?',
          'When the first action starts',
          ['When the coin is inserted', 'When the team signals ready', 'When the gum drops'],
          'Timing begins with the first visible action after the coin is deposited, not with the coin insertion itself.',
        ],
      ],
      written: [
        [
          'Explain why a selective coin trigger can be worth 175 points.',
          'A device that starts only on the quarter earns 200 start points instead of 25, because the supervisor tries both small coins first.',
          'The start scoring rewards discrimination. The difference between 200 and 25 is 175 points, more than three scorable actions.',
        ],
        [
          'Why must rejected coins be caught inside the device?',
          'All coins must be returned to the supervisor, and a coin leaving the device would also cost the 50-point penalty.',
          'Catching coins satisfies the return rule and avoids the solid-leaving penalty. Both reasons should appear.',
        ],
        [
          'What happens if the quarter does not start the device?',
          'The supervisor gives a 20-second countdown for a team member to drop another quarter from above the device; timing starts with the first action and no start points are awarded.',
          'The rules provide a fallback start without points. A touch-start costs a touch penalty as well.',
        ],
        [
          'Why should the first action be clearly visible?',
          'Timing starts with the first action, so the supervisor must see it to start the clock accurately.',
          'Hidden first actions make timing ambiguous. A visible lever or falling object gives a clear start signal.',
        ],
      ],
      flow: [
        ['Insert', 'Supervisor drops coins in the announced order.'],
        ['Sort', 'Small coins fall into a bin; quarter rides on.'],
        ['Trigger', 'Quarter starts the first visible action.'],
      ],
      compare: [
        ['Any-coin start', 'Simple and reliable', 'Only 25 points.'],
        ['Size sorter', '200-point quarter start', 'Needs careful gap tolerance.'],
        ['Mass sorter', 'Rejects the light dime easily', 'Nickel and quarter masses are close.'],
      ],
      challenge: 'Design a coin path that rejects small coins and triggers on the quarter.',
      takeaway: 'Sort by diameter, catch every coin, and make the first action obvious.',
      evidence: {
        observations: [
          ['Gap 21.5 mm', 'Nickel sometimes stuck on the rail and triggered the start.'],
          ['Gap 22.8 mm', 'Dime and nickel fell through 20 of 20; quarter carried 20 of 20.'],
          ['Gap 24.0 mm', 'Quarter fell through in 6 of 20 trials.'],
        ],
        question: 'Which gap should the team use?',
        options: ['22.8 mm', '21.5 mm', '24.0 mm'],
        correct: 0,
        explanation:
          'A 21.5 mm gap is too close to the nickel’s 21.2 mm, and 24.0 mm is too close to the quarter’s 24.3 mm. The middle gap separates them reliably.',
      },
    },
    {
      title: 'Simple machines: levers, inclines, pulleys, and screws',
      objectives: [
        'Classify levers and calculate ideal mechanical advantage.',
        'Design an incline with IMA ≥ 2 and a pulley with IMA ≥ 3.',
        'Build a gravity-driven screw and an Archimedes screw action.',
      ],
      sections: [
        [
          'Ideal mechanical advantage',
          'Ideal mechanical advantage (IMA) is the force multiplication a machine would give with no friction. For a lever, IMA = effort arm ÷ load arm. For an incline, IMA = slope length ÷ vertical height. For a pulley system, IMA equals the number of rope segments supporting the moving load. The rules use IMA, so you must be able to show the geometry, not just the motion.',
        ],
        [
          'Three lever classes',
          'In a first-class lever the fulcrum is between effort and load, like a seesaw. In a second-class lever the load is between fulcrum and effort, like a wheelbarrow. In a third-class lever the effort is between fulcrum and load, like tweezers. One scorable action requires the mechanical advantage of all three classes, in any order, to initiate the next action.',
        ],
        [
          'The inclined plane',
          'One action pushes or pulls an object of at least 400 g up an incline with IMA of at least 2, rising at least 10 cm vertically, before it initiates the next action. An IMA of 2 means the slope is at least twice as long as its rise, for example 20 cm long for 10 cm up. The mass must be removable so the supervisor can verify it.',
        ],
        [
          'Pulley systems',
          'Another action uses pulleys with IMA of at least 3 to lift at least 400 g by 10 cm or more. A single fixed pulley only changes direction (IMA 1). Adding movable pulleys adds supporting segments; three segments holding the load give IMA 3. With IMA 3, the effort rope must move three times as far as the load: 30 cm of pull for 10 cm of lift.',
        ],
        [
          'Screws',
          'A screw converts rotation into linear motion. One action uses gravity to rotate a screw at least two full turns, moving an object at least 2 cm before it triggers the next action; the screw must be marked so rotation is visible. A falling weight on a string wound around a spool attached to a threaded rod is a common design. The nut must not turn with the rod.',
        ],
        [
          'Archimedes screw',
          'An Archimedes screw is a helix inside a tube, or a tube wrapped around a shaft, tilted so that rotation carries a marble upward one turn at a time. The action must raise a marble at least 20 cm with the whole action visible. A clear tube helps. Keep the tilt shallow enough that the marble rides each turn rather than rolling back.',
        ],
      ],
      terms: [
        ['Ideal mechanical advantage (IMA)', 'Frictionless force multiplication from geometry.'],
        ['Fulcrum', 'Pivot point of a lever.'],
        ['Effort arm', 'Distance from fulcrum to where the effort is applied.'],
        ['Supporting segments', 'Rope sections holding a pulley load; equal to IMA.'],
        ['Pitch', 'Distance a screw advances per full turn.'],
        ['Archimedes screw', 'Rotating helix that lifts material along its axis.'],
      ],
      example: [
        'A screw has a pitch of 1.5 mm. How many turns move an object 2.0 cm, and is that enough rotation for the action?',
        [
          '2.0 cm = 20 mm.',
          'Turns = 20 mm ÷ 1.5 mm per turn ≈ 13.3 turns.',
          'The rule needs at least 2 full turns and at least 2 cm; 13.3 turns satisfies both.',
        ],
        'A fine-pitch screw easily meets the two-turn rule but needs a long spool string or many turns of a falling weight.',
      ],
      mcq: [
        [
          'A ramp is 30 cm long and rises 12 cm. What is its IMA?',
          '2.5',
          ['0.4', '3.6', '18'],
          'Incline IMA = slope length ÷ height = 30 ÷ 12 = 2.5, which meets the IMA ≥ 2 requirement.',
        ],
        [
          'Which lever class has the load between the fulcrum and the effort?',
          'Second class',
          ['First class', 'Third class', 'None'],
          'A second-class lever, like a wheelbarrow, has the load between the fulcrum and the effort, giving IMA greater than 1.',
        ],
        [
          'A pulley system has four rope segments supporting the load. What is its IMA?',
          '4',
          ['1', '2', '8'],
          'Pulley IMA equals the number of rope segments supporting the moving load. Four segments give IMA 4, above the required 3.',
        ],
      ],
      written: [
        [
          'With a pulley IMA of 3, how far must the effort rope move to lift a load 12 cm?',
          '36 cm, three times the load’s rise.',
          'Ideal work in equals work out, so force is divided by 3 while distance is multiplied by 3. Plan room for that rope travel.',
        ],
        [
          'Why must the incline and pulley masses be removable?',
          'So the supervisor can weigh them to confirm they are at least 400 g.',
          'Verification requires measuring the mass. A fixed or hidden mass cannot be checked and may not earn the points.',
        ],
        [
          'Describe a gravity-driven screw action.',
          'A falling weight unwinds a string from a spool on a threaded rod, turning it at least two full turns so a non-rotating nut moves an object at least 2 cm.',
          'Gravity provides the rotation and the screw converts it to linear motion. Marking the rod shows the turns.',
        ],
        [
          'Why does a first-class lever not always give a mechanical advantage greater than 1?',
          'Its IMA depends on arm lengths; if the effort arm is shorter than the load arm, IMA is less than 1.',
          'First-class levers can multiply force or distance. Only the ratio of effort arm to load arm decides which.',
        ],
      ],
      flow: [
        ['Input', 'Gravity or a previous action supplies effort.'],
        ['Machine', 'Lever, incline, pulley, or screw transforms it.'],
        ['Output', 'Load moves and triggers the next action.'],
      ],
      compare: [
        ['Incline', 'IMA = length ÷ height', 'Friction can stall heavy loads.'],
        ['Pulley', 'IMA = supporting segments', 'Needs long rope travel.'],
        ['Screw', 'Large force, small motion', 'Slow; needs many turns.'],
      ],
      challenge: 'Design each simple-machine action to meet its IMA and distance requirements.',
      takeaway: 'IMA comes from geometry: show the lengths and segments that prove it.',
      evidence: {
        observations: [
          ['Pulley build', 'Load 420 g lifts 11 cm; effort rope moves 22 cm.'],
          ['Supervisor check', 'Counts two supporting segments.'],
          ['Team claim', 'Pulley action meets IMA 3.'],
        ],
        question: 'Does the pulley action qualify?',
        options: [
          'No; IMA is only 2',
          'Yes; the load exceeds 400 g',
          'Yes; it lifts more than 10 cm',
        ],
        correct: 0,
        explanation:
          'Two supporting segments and a 2:1 rope-to-load travel ratio both show IMA 2. The rule needs IMA of at least 3, so the action earns no points despite meeting mass and height.',
      },
    },
    {
      title: 'Chemical actions: gas, cold, and fizz',
      objectives: [
        'Explain the vinegar and baking soda balloon action.',
        'Use an endothermic process to trigger the next action.',
        'Design a reliable Alka-Seltzer trigger safely.',
      ],
      sections: [
        [
          'Vinegar and baking soda',
          'Acetic acid in vinegar reacts with sodium bicarbonate to form sodium acetate, water, and carbon dioxide gas. Trapping the gas in a balloon inflates it. The scorable action requires the balloon to expand 20 cm and strike an object that started at least 20 cm above it, which then initiates the next action. The amount of gas depends on the limiting reactant.',
        ],
        [
          'Getting enough gas',
          'One gram of baking soda (about 0.012 mol) can produce about 0.012 mol of CO₂, roughly 290 mL at room temperature, if enough acid is present. Household vinegar is about 5 percent acetic acid, roughly 0.83 mol/L, so about 15 mL of vinegar reacts with 1 g of baking soda. Test how much gas inflates your balloon to the required size, and add a margin.',
        ],
        [
          'Endothermic actions',
          'An endothermic process absorbs heat and cools its surroundings. Dissolving ammonium chloride or the citric acid and baking soda reaction both cool noticeably. The action must initiate the next action because of the temperature drop, for example by contracting a gas in a sealed container, or by triggering a bimetallic strip or wax that changes shape. A cooling that does nothing does not count.',
        ],
        [
          'Alka-Seltzer',
          'Alka-Seltzer tablets contain citric acid and sodium bicarbonate, which react in water to release carbon dioxide. The scorable action drops two tablets into water so that the reaction triggers the next action, such as gas pressure pushing a piston or lifting a float. Temperature affects speed: warm water reacts much faster, which also changes your timing.',
        ],
        [
          'Safety and containment',
          'Hazardous chemicals, flammable gases, dry ice, and unsafe handling are prohibited, and every device must pass a safety inspection. Keep liquids in sealed or deep containers, because any liquid leaving the device costs 50 points. Use eye protection, label containers, and know what is in each one. Choose the mildest chemicals that do the job.',
        ],
        [
          'Reliability and timing',
          'Chemical actions vary with temperature, freshness, and mixing. Pre-measure reactants into labeled cups, use fresh tablets and vinegar, and test at the temperature of the competition room. Measure how long each reaction takes to trigger its next action, because chemical steps are often the slowest and least predictable parts of the run.',
        ],
      ],
      terms: [
        ['Limiting reactant', 'The reactant that runs out first, setting how much product forms.'],
        ['Acetic acid', 'Acid in vinegar, about 5 percent in household vinegar.'],
        ['Sodium bicarbonate', 'Baking soda; releases CO₂ with acids.'],
        ['Endothermic', 'Absorbs heat from the surroundings, causing cooling.'],
        ['Molar volume', 'About 24 L per mole of gas at room temperature and pressure.'],
        ['Containment', 'Keeping solids and liquids inside the device.'],
      ],
      example: [
        'You need about 600 mL of CO₂ to inflate a balloon to size. How much baking soda and vinegar should you use?',
        [
          'Moles CO₂ = 0.600 L ÷ 24 L/mol = 0.025 mol.',
          'Baking soda: 0.025 mol × 84 g/mol ≈ 2.1 g.',
          'Vinegar: 0.025 mol ÷ 0.83 mol/L ≈ 30 mL; add about 20 percent margin to each.',
        ],
        'About 2.5 g of baking soda with 36 mL of vinegar gives enough gas with margin.',
      ],
      mcq: [
        [
          'What gas inflates the balloon in the vinegar and baking soda action?',
          'Carbon dioxide',
          ['Oxygen', 'Hydrogen', 'Nitrogen'],
          'Acetic acid and sodium bicarbonate react to form carbon dioxide, water, and sodium acetate. The CO₂ fills the balloon.',
        ],
        [
          'What must an endothermic action do to score?',
          'Initiate the next action because of the temperature drop',
          ['Feel cold to the touch', 'Produce gas', 'Change color'],
          'The rule requires the reduction in temperature to initiate the next action. Simply getting cold, without causing the next step, does not earn the points.',
        ],
        [
          'Why might Alka-Seltzer timing differ at competition?',
          'Reaction speed depends on water temperature',
          ['Tablets are a different color', 'The coin order changes it', 'Gravity is different'],
          'Warmer water speeds the reaction and colder water slows it. Matching test conditions to the competition room keeps timing predictable.',
        ],
      ],
      written: [
        [
          'How many moles of CO₂ are produced by 4.2 g of baking soda with excess vinegar?',
          '4.2 g ÷ 84 g/mol = 0.050 mol of CO₂, about 1.2 L at room temperature.',
          'Baking soda and CO₂ react in a 1:1 mole ratio. Converting with molar volume gives the gas volume.',
        ],
        [
          'Describe one way a temperature drop can trigger the next action.',
          'Cooling a sealed container makes the gas contract, pulling a diaphragm or piston that releases a latch.',
          'Any mechanism where cooling causes motion, such as gas contraction or a bimetallic strip bending, satisfies the requirement.',
        ],
        [
          'Why should reactants be pre-measured and labeled?',
          'It makes the reaction consistent, speeds setup, and ensures safe, known contents for inspection.',
          'Consistency drives reliability and timing. Labels also support the safety inspection and setup within 30 minutes.',
        ],
        [
          'What penalty applies if vinegar splashes out of the device?',
          'A 50-point penalty for the first solid or liquid leaving the device dimensions.',
          'Liquids leaving the device are penalized once for the first item. Deep, sealed containers prevent splashes from vigorously fizzing reactions.',
        ],
      ],
      flow: [
        ['Mix', 'Reactants combine on cue.'],
        ['React', 'Gas forms or temperature drops.'],
        ['Trigger', 'Pressure or cooling moves the next object.'],
      ],
      compare: [
        ['Vinegar + baking soda', 'Large gas volume', 'Needs a 20 cm balloon strike.'],
        ['Alka-Seltzer', 'Pre-measured tablets', 'Speed varies with temperature.'],
        ['Endothermic', 'Cooling-driven motion', 'Small temperature effects are slow.'],
      ],
      challenge: 'Size the reactants for each chemical action and add a safety margin.',
      takeaway:
        'Use stoichiometry to size reactions, contain every liquid, and test at room temperature.',
      evidence: {
        observations: [
          ['Test 1', '1.0 g baking soda + 30 mL vinegar: balloon expanded 14 cm.'],
          ['Test 2', '2.0 g + 30 mL vinegar: expanded 21 cm.'],
          ['Test 3', '3.0 g + 30 mL vinegar: expanded 22 cm; undissolved powder left over.'],
        ],
        question: 'What explains the results?',
        options: [
          'Vinegar became the limiting reactant above about 2 g of baking soda',
          'More baking soda always gives more gas',
          'The balloon was too large',
        ],
        correct: 0,
        explanation:
          '30 mL of 5 percent vinegar holds about 0.025 mol of acetic acid, enough for only about 2.1 g of baking soda. Extra powder cannot react, so Test 3 adds almost no gas.',
      },
    },
    {
      title: 'Electrical, infrared, and magnetic actions',
      objectives: [
        'Apply the 9 V and 30-second electricity limits.',
        'Design an infrared beam trigger and a string-breaking action.',
        'Use a magnet removal to drop an object.',
      ],
      sections: [
        [
          'Electricity rules',
          'Only commercial batteries may power circuits, with no more than 9 V across any two points, calculated from labels. Arduinos, Raspberry Pis, and integrated circuits are banned, and timing may not be powered by electricity or springs. Electricity may be used only in the first 30 seconds of operation; using it later costs 250 points and the electrical action does not count.',
        ],
        [
          'Planning around 30 seconds',
          'Because timing starts with the first action, all electrical actions must happen early in the sequence. Put the infrared beam and string-breaking actions near the start, then disconnect power mechanically, for example with a switch the device itself opens. Measure your device’s timeline so electrical steps finish well before 30 seconds even on a fast run.',
        ],
        [
          'Infrared beam',
          'One action uses an infrared beam whose transmitter and receiver are at least 20 cm apart to initiate the next action. The transmitter must be an IR LED and the receiver photodiode-based. When an object breaks or completes the beam, the receiver’s output changes, which can switch a relay or simple discrete circuit to run a small motor or solenoid. Shield the receiver from room light.',
        ],
        [
          'Breaking a string',
          'Another action uses electricity to directly or indirectly break a string or fishing line, dropping an object that starts the next action. A short length of nichrome wire heats when current flows and melts nylon line in seconds. Power is V²/R, so lower resistance heats faster but drains the battery. Keep the hot wire away from flammable materials.',
        ],
        [
          'Magnet removal',
          'One action removes a magnet from a surface so that a magnetic object falls due to the loss of magnetic force, and the falling object starts the next action. For example, a steel ball held under a shelf by a magnet above drops when a previous action slides the magnet away. Magnetic force falls off steeply with distance, so even a short slide releases it.',
        ],
        [
          'Reliability',
          'Electrical actions depend on battery voltage, connections, and alignment. Use fresh batteries, solid connections, and alignment guides for the IR beam. Make it visible to the supervisor that the beam was interrupted or that the line broke. Label each action with its ASL number, and be ready to show labeled battery voltages during inspection.',
        ],
      ],
      terms: [
        ['IR LED', 'Light-emitting diode producing infrared light; the required transmitter.'],
        ['Photodiode', 'Light sensor that produces current when light hits it.'],
        ['Nichrome', 'Resistance wire that heats with current; used to cut line.'],
        ['Relay', 'Electrically operated mechanical switch.'],
        ['30-second rule', 'No electricity after the first 30 seconds of operation.'],
        ['Magnetic force falloff', 'Rapid weakening of magnetic force with distance.'],
      ],
      example: [
        'A 9 V battery drives a nichrome segment of 6 Ω. What current and power result, and is the plan legal?',
        [
          'Current I = V ÷ R = 9 ÷ 6 = 1.5 A.',
          'Power P = V × I = 9 × 1.5 = 13.5 W, enough to melt nylon line quickly.',
          'Legal if it uses one 9 V labeled battery and finishes within the first 30 s.',
        ],
        'The hot wire works fast; schedule it early and disconnect power after the line breaks.',
      ],
      mcq: [
        [
          'An IR action has the transmitter 15 cm from the receiver. Does it qualify?',
          'No; they must be at least 20 cm apart',
          [
            'Yes; any distance works',
            'Yes, if the LED is visible light',
            'No; they must be 50 cm apart',
          ],
          'The rule requires the IR LED transmitter and photodiode receiver to be at least 20 cm apart. Fifteen centimeters is too short.',
        ],
        [
          'What happens if an electrical action fires at 35 seconds?',
          '250-point penalty and that action earns no points',
          ['50-point penalty', 'No penalty', 'Tier 3 placement'],
          'Electricity is limited to the first 30 seconds. Later use costs 250 points, and actions initiated by electricity after 30 seconds do not score.',
        ],
        [
          'Which component is NOT allowed?',
          'A microcontroller',
          ['A relay', 'An IR LED', 'A 9 V battery'],
          'Arduinos, Raspberry Pis, and integrated circuits are prohibited. Relays, LEDs, photodiodes, and labeled batteries up to 9 V are allowed.',
        ],
      ],
      written: [
        [
          'Why should electrical actions be placed early in the sequence?',
          'Electricity is allowed only in the first 30 seconds of operation, so those actions must finish before then.',
          'Timing starts with the first action. Placing electrical steps early keeps them inside the 30-second window with margin.',
        ],
        [
          'How can a falling magnetic object be released by a previous action?',
          'The previous action slides or lifts the magnet away from the surface, removing the magnetic force so the object falls.',
          'Moving the magnet a short distance sharply reduces the force, letting gravity take over and start the next action.',
        ],
        [
          'Explain why lower resistance nichrome cuts line faster with the same battery.',
          'Power is V²/R, so lower resistance draws more current and dissipates more heat.',
          'With fixed voltage, heating power rises as resistance falls. Too low a resistance can drain or overheat the battery.',
        ],
        [
          'How can a team prevent room light from falsely triggering the photodiode?',
          'Shield the receiver in a tube aimed at the IR LED, or use an IR filter so only the beam reaches it.',
          'Ambient light contains infrared. Shielding and filtering make the receiver respond only to the transmitter.',
        ],
      ],
      flow: [
        ['Power on', 'Battery circuit active in the first 30 s.'],
        ['Sense or heat', 'IR beam changes or nichrome melts line.'],
        ['Release', 'Object falls and power disconnects.'],
      ],
      compare: [
        ['IR beam', 'Non-contact trigger', 'Needs alignment and shielding.'],
        ['Nichrome cut', 'Fast, visible release', 'Hot wire safety.'],
        ['Magnet removal', 'No electricity needed', 'Magnet must move far enough.'],
      ],
      challenge: 'Schedule electrical actions inside 30 seconds and design their triggers.',
      takeaway: 'Use electricity early, legally, and visibly; magnets and gravity do the rest.',
      evidence: {
        observations: [
          ['Timeline', 'Coin start at 0 s; IR action at 8 s; nichrome cut at 27 s.'],
          ['Slow test day', 'Device ran 15 percent slower; cut happened at 31 s.'],
          ['Supervisor note', 'Electricity used after 30 s.'],
        ],
        question: 'What change best protects against the penalty?',
        options: [
          'Move the nichrome cut earlier in the sequence',
          'Use a bigger battery',
          'Remove the IR action',
        ],
        correct: 0,
        explanation:
          'A 27 s cut leaves little margin, and a slower run pushed it past 30 s. Moving it earlier keeps it legal even when the device runs slowly.',
      },
    },
    {
      title: 'Timing: Target Time, the water timer, and pacing',
      objectives: [
        'Calculate time points and penalties.',
        'Design an adjustable water timer.',
        'Pace the device to finish at the Target Time.',
      ],
      sections: [
        [
          'Time points',
          'Teams earn 2 points per full second of operation up to the Target Operation Time, and lose 2 points per second past it, up to twice the Target Time. A run lasting twice the Target Time earns no time points at all. Timing stops when the gum comes to rest on the platform. Finishing exactly on the Target Time is ideal.',
        ],
        [
          'Target Times',
          'Regionals use a 60-second Target Time. State tournaments choose 61 to 90 seconds, and Nationals 91 to 120 seconds. Teams learn the exact value at the start of setup. A Regional device can be tuned for 60 seconds, but a State or National device needs a way to add 30 or more seconds on short notice.',
        ],
        [
          'The water timer',
          'Teams may designate one water timer, an action lasting over 10 seconds, that is not a scorable action. It earns 1 bonus point for every full second it runs before the Target Time, and must initiate the next action. At State and Nationals, teams must demonstrate how the timer is adjusted for the Target Time to get the bonus.',
        ],
        [
          'How water timers work',
          'A typical timer drains water from a container through a small hole into a cup that tips or a float that rises, releasing the next action. Flow rate falls as the water level drops, because outflow speed depends on the square root of water height (Torricelli’s law). Adjust time by changing the starting volume, the hole size, or the tipping volume.',
        ],
        [
          'Pacing the device',
          'Measure every action’s duration and add them up. The water timer is your adjustable buffer: set it so the whole chain ends near the Target Time. Because the timer earns 1 point per second and the device earns 2 points per second, a long timer that keeps the run on time is worth up to 3 points per second.',
        ],
        [
          'Avoiding overtime',
          'Running long costs 2 points per second and, at twice the Target Time, all time points. Slow chemical reactions, jams, and adjustments push runs long. Aim slightly under the Target Time, so normal variation does not cross it, and keep the gum drop reliable so timing stops when expected.',
        ],
      ],
      terms: [
        ['Target Operation Time', 'The run length teams aim for, announced at setup.'],
        [
          'Water timer',
          'Designated non-scorable action over 10 s earning 1 pt/s before the Target Time.',
        ],
        ['Torricelli’s law', 'Outflow speed v = √(2gh) from a hole at depth h.'],
        ['Flow rate', 'Volume of water passing per second.'],
        ['Pacing', 'Matching total action time to the Target Time.'],
        ['Overtime penalty', '−2 points per second past the Target Time.'],
      ],
      example: [
        'Target Time 60 s. The device runs 67 s with a 25-s water timer that ended at 40 s. Calculate time points and timer bonus.',
        [
          'Time points: 2 × 60 = 120, minus 2 × 7 = 14 → 106.',
          'Water timer: ran 25 full seconds before the Target Time → +25.',
          'Total from timing: 131 points.',
        ],
        'Shortening the timer by 7 s would raise time points to 120 while losing 7 timer points: a net gain of 7.',
      ],
      mcq: [
        [
          'Target Time 90 s. The run takes 100 s. What are the time points?',
          '160',
          ['180', '200', '0'],
          'Points up to the Target Time: 2 × 90 = 180. Overtime: 10 s × 2 = 20 deducted. Net time points: 160.',
        ],
        [
          'Why does a water timer slow down as it drains?',
          'Outflow speed depends on the water height above the hole',
          ['Water gets thicker', 'The hole gets smaller', 'Air pressure rises'],
          'By Torricelli’s law, outflow speed is √(2gh). As the water level h falls, the flow slows.',
        ],
        [
          'What must a State team do to earn water timer bonus points?',
          'Demonstrate how the timer is adjusted for the Target Time',
          [
            'Use a scorable action as the timer',
            'Run the timer past the Target Time',
            'Use an electric pump',
          ],
          'At State and National tournaments, teams must show how the timer is adjusted to account for the longer Target Time.',
        ],
      ],
      written: [
        [
          'Describe two ways to lengthen a water timer.',
          'Use a smaller drain hole to slow flow, or increase the volume that must drain or fill before the next action triggers.',
          'Hole area and water volume both control timer length. A marked scale on the container makes adjustments fast and repeatable.',
        ],
        [
          'Why aim slightly under the Target Time?',
          'Normal variation may push the run longer; going over costs 2 points per second, while finishing slightly early loses only a few points.',
          'The penalty past the Target Time is as steep as the reward before it, and long runs risk the double-time zero. A small buffer is safer.',
        ],
        [
          'Why can’t a scorable action also be the water timer?',
          'The rules require the water timer to be a separate action that is not one of the scorable actions.',
          'The timer bonus is in addition to action points, so the rules forbid using one action for both.',
        ],
        [
          'What happens to time points if the run reaches twice the Target Time?',
          'The team receives zero time points.',
          'Timing stops at twice the Target Time, and such runs earn no running-time points at all, however many actions finished.',
        ],
      ],
      flow: [
        ['Measure', 'Time each action.'],
        ['Buffer', 'Set the water timer to fill the gap.'],
        ['Finish', 'Gum lands near the Target Time.'],
      ],
      compare: [
        ['Fixed timer', 'Simple', 'Cannot adapt to State or National times.'],
        ['Adjustable timer', 'Marks for each target', 'Must be demonstrated at State.'],
        ['No timer', 'Fewer parts', 'Loses up to 1 pt/s of bonus.'],
      ],
      challenge: 'Set a water timer so the device finishes on a new Target Time.',
      takeaway:
        'Use the water timer as an adjustable buffer and finish just before the Target Time.',
      evidence: {
        observations: [
          ['Timer calibration', '150 mL → 18 s; 300 mL → 30 s; 450 mL → 39 s.'],
          ['Other actions', 'Total 46 s without the timer.'],
          ['Target Time', '80 s announced at State.'],
        ],
        question: 'About how much water should the timer use?',
        options: ['About 380 mL', '150 mL', '450 mL'],
        correct: 0,
        explanation:
          'The timer must fill about 34 s (80 − 46). Calibration puts 34 s between 300 mL (30 s) and 450 mL (39 s), near 380 mL. 450 mL would run about 5 s over.',
      },
    },
    {
      title: 'The Final Action, the ASL, and competition day',
      objectives: [
        'Build a gum drop that meets every Final Action requirement.',
        'Write and label an Action Sequence List that earns full credit.',
        'Run setup and the Official Run without losing points.',
      ],
      sections: [
        [
          'The gum drop',
          'After all scorable actions have been attempted, the device must drop a commercially purchased, unaltered 5-stick gum pack at least 50 cm vertically onto a flat, rigid, unpadded platform no larger than 12 × 12 × 0.5 cm, with no sides and no walls within 4 cm of its edge. The platform top must be at least 2 cm above the base. It earns 250 points.',
        ],
        [
          'Landing and removal',
          'The gum must be the only thing on the platform, supported only by it and clearly visible. An opening on the coin-slot side must let a team member reach in and remove the pack; the Final Action does not count if the gum is not removed. If a team touches the action that releases the gum, the Final Action earns nothing and time points are zero.',
        ],
        [
          'Staying on a small platform',
          'A pack falling 50 cm lands at about 3.1 m/s and tends to bounce. Release it flat, from a guide that keeps it level, and drop it near the platform center. A rigid, smooth platform lets it slide, so test how far it moves after landing. A short vertical chute ending above the 50 cm mark can steady the fall without walls near the platform.',
        ],
        [
          'The Action Sequence List',
          'The ASL documents every scorable and non-scorable action in order. Column 1 is an ordinal number matching a label in the device; column 2 names the object moved; column 3 gives the rule task, using the roman numerals i to xii. Only actions listed by numeral can score, and actions skipped because something starts out of order earn zero.',
        ],
        [
          'Rules that remove points',
          'Each movable object may be used in only one assigned action. Parallel and dead-end actions do not count. If a participant completes an action, or makes an adjustment that directly completes it, that action scores nothing. Up to three adjustments are allowed at −25 each, and adjusting just to stall for time leads to disqualification.',
        ],
        [
          'Setup and impound',
          'At State and Nationals, devices, the ASL, and tools are impounded before the first time slot. Setup within 30 minutes earns 50 points, and at State and Nationals within 15 minutes earns 75. Practice the full setup with a timer. Pack reactants pre-measured, label everything, and bring spare balloons, tablets, and gum.',
        ],
      ],
      terms: [
        ['Final Action', 'Gum pack dropped at least 50 cm onto the platform; 250 points.'],
        ['Platform (tray)', 'Flat, rigid, unpadded, at most 12 × 12 × 0.5 cm, no sides.'],
        ['ASL columns', 'Ordinal number, object moved, and rule task numeral.'],
        ['Dead-end action', 'An action that does not lead to the Final Action; scores nothing.'],
        ['Out-of-order start', 'Actions skipped in the ASL sequence earn zero.'],
        ['Setup bonus', '50 points within 30 min; 75 within 15 min at State and Nationals.'],
      ],
      example: [
        'Estimate the landing speed of a gum pack dropped 55 cm, and suggest how to keep it on the platform.',
        [
          'v = √(2gh) = √(2 × 9.8 × 0.55) ≈ 3.3 m/s.',
          'At that speed a tilted pack bounces or slides off a 12 cm platform.',
          'Use a level release guide and center the drop; test slide distance on the real platform.',
        ],
        'Drop flat and centered; adjust the release so the pack lands with room to slide.',
      ],
      mcq: [
        [
          'Which platform is legal?',
          'A flat 10 × 10 × 0.4 cm wooden square with no sides',
          ['A 12 × 12 cm tray with 1 cm walls', 'A 15 × 15 cm foam pad', 'A cupped 12 cm dish'],
          'The platform must be flat, rigid, solid, and unpadded, at most 12 × 12 × 0.5 cm, with no sides. Walls, padding, and cupping are not allowed.',
        ],
        [
          'Action 6 starts before action 5 on the ASL. What happens to action 5?',
          'It earns zero points, even if it completes later',
          ['It still earns 50', 'It earns 25', 'The run restarts'],
          'If an action starts out of order, all actions skipped in the listed sequence earn zero, even if they are completed afterward.',
        ],
        [
          'A participant pushes the lever that releases the gum. What is the result?',
          'No Final Action points and zero time points',
          ['A 25-point touch penalty only', 'Full points', 'Tier 3'],
          'Teams may not touch the action that leads to releasing the gum. Doing so gives no Final Action points and zero time points.',
        ],
      ],
      written: [
        [
          'Name the three ASL columns and what each contains.',
          'Column 1: ordinal number matching the device label; column 2: the object moved; column 3: the rule task number (roman numeral i–xii).',
          'Matching labels and numerals earn 25 points and make scoring possible, since only listed actions can score.',
        ],
        [
          'Why must the gum be removed after it lands?',
          'The rules award the Final Action only if a team member removes the gum through the opening on the coin-slot side.',
          'Removal proves the gum is accessible and unaltered. Without it, the 250 points are not awarded.',
        ],
        [
          'Why can’t one rolling marble trigger two scorable actions?',
          'Each movable object may be used in only one assigned action; it may start the next action but not be used further.',
          'The one-object-one-action rule prevents counting the same motion twice. Each scorable action needs its own object.',
        ],
        [
          'How can a team earn the 75-point setup bonus at State?',
          'By completing setup within 15 minutes, which requires practiced routines and pre-measured, labeled supplies.',
          'The State and National setup bonus is 75 within 15 minutes. Rehearsal turns setup into a checklist.',
        ],
      ],
      flow: [
        ['Document', 'ASL numbers match device labels.'],
        ['Set up', 'Practiced routine within the bonus time.'],
        ['Finish', 'Gum lands, is visible, and is removed.'],
      ],
      compare: [
        ['Level drop guide', 'Pack lands flat', 'Must stay clear of the 4 cm zone.'],
        ['Free drop', 'Simple', 'Pack tumbles and may miss.'],
        ['Complete ASL', 'Up to 100 points and scoring', 'Must match device exactly.'],
      ],
      challenge: 'Audit a device and ASL for any rule that would cancel points.',
      takeaway:
        'The last 250 points depend on a careful drop and a documentation trail that matches the device.',
      evidence: {
        observations: [
          ['Drop tests', 'Gum fell 52 cm; landed on platform 7 of 10 times, bouncing off 3.'],
          ['Change', 'Added a level release shelf; dropped 51 cm.'],
          ['New tests', 'Landed and stayed 10 of 10 times.'],
        ],
        question: 'Why did the change help?',
        options: [
          'The pack fell flat instead of tumbling, so it did not bounce off',
          'The drop became much shorter',
          'The platform got walls',
        ],
        correct: 0,
        explanation:
          'The drop height barely changed. A level release kept the pack flat, so it landed squarely and did not bounce off the small rigid platform.',
      },
    },
  ],
});
