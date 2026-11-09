import { buildEventCourse } from './build-course-kit.ts';

// Wright Stuff C (2027): indoor free-flight rubber-powered airplane. Longest flight wins.
export const wrightStuffLessons = buildEventCourse({
  eventId: 'wright-stuff',
  eventName: 'Wright Stuff',
  prefix: 'ws',
  division: 'C',
  intro:
    'Seven units build an indoor rubber-powered airplane that stays aloft as long as possible. You will learn the rules and score, how wings make lift at walking speed, how a rubber motor stores and releases energy, how a propeller turns torque into thrust, how to trim for a stable circling climb, and how to log and fly on competition day.',
  references: [
    { title: 'Science Olympiad: Wright Stuff C', url: 'https://www.soinc.org/wright-stuff-c' },
    {
      title: 'NASA Glenn: The Lift Equation',
      url: 'https://www.grc.nasa.gov/www/k-12/airplane/lifteq.html',
    },
  ],
  units: [
    {
      title: 'Rules, scoring, and the flight log bonus',
      objectives: [
        'State the airplane’s size, mass, and motor limits.',
        'Calculate a flight score with the log bonus.',
        'Plan the 10-minute flight period.',
      ],
      sections: [
        [
          'The goal',
          'Wright Stuff asks teams to build up to two free-flight airplanes powered only by rubber motors and flown indoors for maximum time aloft. Nothing controls the plane after release, so every flight depends on design, trim, and how the motor is wound. The rules reward a plane that climbs gently, cruises slowly in wide circles, and lands only after the motor runs down.',
        ],
        [
          'Size and mass limits',
          'The airplane must fit inside a lidless measurement box of 32.0 × 24.0 × 47.0 cm in flight configuration, sliding in and out without changing shape; propellers may be rotated to fit. Its mass without the rubber motor must be at least 8.0 g. The minimum mass means teams cannot win just by building lighter, so the design must use that mass well.',
        ],
        [
          'Motor and propeller limits',
          'The rubber motor or motor set, including O-rings and attachments, may not exceed 1.5 g. Up to six motors may be checked in, and motors are massed separately. Propellers may be built or purchased, but variable-pitch propellers that actively change blade angle or diameter are banned. All lift must come from wings, and the only power is the rubber.',
        ],
        [
          'Flight period',
          'The 10-minute Flight Period begins when the supervisor returns the motors. Teams may make trim flights and adjustments, and up to two official flights using one or two planes. Before each launch, teams must declare whether the flight is official; an undeclared flight counts as official. Timing runs from release until the plane touches the floor or its wings stop supporting it.',
        ],
        [
          'Scoring',
          'Each official flight’s score is its flight time multiplied by the flight log bonus: ×1.2 for a complete log, ×1.1 for a partial log, and ×1.0 without one. The team’s score is its best flight score. Ties are broken by the longest non-scored official flight score, so a strong second flight also matters. A complete log is worth a 20 percent boost.',
        ],
        [
          'The flight log',
          'A complete log has data for at least 10 test flights before the competition, with six or more parameters. Three are required: motor size before wind-up, turns or torque at launch, and flight time. Teams add three more, such as torque at landing, peak altitude, or propeller pitch. The log is also your best tool for predicting how many turns to use.',
        ],
      ],
      terms: [
        ['Measurement box', '32.0 × 24.0 × 47.0 cm; the plane must fit in flight configuration.'],
        ['Airframe mass', 'Plane mass without motor; must be at least 8.0 g.'],
        ['Motor mass limit', 'Rubber and attachments at most 1.5 g.'],
        ['Official flight', 'Declared scoring flight; up to two per team.'],
        ['Flight log bonus', '×1.2 complete, ×1.1 partial.'],
        ['Trim flight', 'Non-scoring test flight during the Flight Period.'],
      ],
      example: [
        'A team with a complete flight log flies official flights of 96.4 s and 112.0 s. What is its score and tiebreaker?',
        [
          'Flight scores: 96.4 × 1.2 = 115.68; 112.0 × 1.2 = 134.40.',
          'Score = best flight score = 134.40.',
          'Tiebreaker = the non-scored official flight score, 115.68.',
        ],
        'Score 134.40 with a 115.68 tiebreaker.',
      ],
      mcq: [
        [
          'What is the minimum airplane mass excluding the motor?',
          '8.0 g',
          ['1.5 g', '3.5 g', '10.0 g'],
          'The rules require the airplane, excluding the rubber motor, to have a mass of 8.0 g or more. The motor is limited separately to 1.5 g.',
        ],
        [
          'A team forgets to declare a flight as a trim flight. How is it treated?',
          'As an official flight',
          ['As a trim flight', 'It is not timed', 'It is repeated'],
          'A flight is considered official if the team fails to tell the timers its status. Declaring every flight avoids wasting one of the two official flights.',
        ],
        [
          'Which propeller is NOT allowed?',
          'One whose blade angle changes by an active mechanism during flight',
          [
            'A purchased fixed-pitch propeller',
            'A team-built balsa propeller',
            'A propeller with a freewheel',
          ],
          'Variable-pitch propellers with mechanisms that actively change blade angle or diameter are banned. Fixed-pitch built or purchased propellers are fine.',
        ],
      ],
      written: [
        [
          'Why is a complete flight log worth building?',
          'It multiplies every flight by 1.2 instead of 1.1 or 1.0, and its data predicts the best winding for competition.',
          'The log bonus is a 20 percent increase. The same data guides turns and torque choices under a new ceiling.',
        ],
        [
          'List the three required flight log parameters.',
          'Motor size before wind-up; turns or torque at launch; flight time.',
          'Three parameters are required, and teams must add at least three more to reach six for a complete log.',
        ],
        [
          'Why does the 8.0 g minimum change design priorities?',
          'Teams cannot win by building ultralight, so mass should go into stiffness, durability, and wing area within the box limits.',
          'With mass fixed, efficiency and trim decide flight time. A sturdy plane survives ceiling bumps and repeated tests.',
        ],
        [
          'When does timing of a flight end?',
          'When the plane touches the floor or when its lifting surfaces no longer support it, such as resting on a beam.',
          'Timing stops at landing or when the wings no longer carry the plane. A plane hung up on a fixture stops the clock.',
        ],
      ],
      flow: [
        ['Check-in', 'Box, mass, motors, and log inspected.'],
        ['Flight Period', '10 minutes of trim and official flights.'],
        ['Score', 'Best flight time × log bonus.'],
      ],
      compare: [
        ['Complete log', '×1.2 on every flight', 'Needs 10 flights, 6 parameters.'],
        ['Two planes', 'Backup if one breaks', 'Twice the building.'],
        ['Early official flight', 'Banks a score', 'Less time to trim.'],
      ],
      challenge: 'Plan a 10-minute flight period that guarantees one good official flight.',
      takeaway: 'Meet the limits, complete the log, and use trim flights before official ones.',
      evidence: {
        observations: [
          ['Team A', 'Best flight 120 s, no flight log.'],
          ['Team B', 'Best flight 105 s, complete flight log.'],
          ['Team C', 'Best flight 112 s, partial flight log.'],
        ],
        question: 'Which team scores highest?',
        options: ['Team B', 'Team A', 'Team C'],
        correct: 0,
        explanation:
          'Team B scores 105 × 1.2 = 126.0, Team C 112 × 1.1 = 123.2, and Team A 120 × 1.0 = 120.0. The log bonus outweighs a 15-second flight advantage.',
      },
    },
    {
      title: 'Wings and slow flight',
      objectives: [
        'Apply the lift equation to an indoor airplane.',
        'Explain why indoor planes fly slowly with large wings.',
        'Relate wing loading and drag to flight time.',
      ],
      sections: [
        [
          'The lift equation',
          'Lift equals ½ρv²SC_L, where ρ is air density, v is airspeed, S is wing area, and C_L is the lift coefficient set by wing shape and angle of attack. In level flight, lift equals weight. Because lift grows with the square of speed, a plane with more wing area or a higher lift coefficient can support the same weight at a lower speed.',
        ],
        [
          'Why slow is good',
          'A rubber motor holds a fixed amount of energy. The power needed to stay aloft is drag times speed, so a plane that flies slowly with low drag uses that energy over a longer time. Indoor duration planes typically cruise near walking speed, around 1 to 2 m/s, with large, light wings and propellers that turn slowly.',
        ],
        [
          'Wing loading',
          'Wing loading is weight divided by wing area. Lower wing loading means a lower flying speed for the same lift coefficient. Because the airframe must weigh at least 8.0 g and must fit the measurement box, teams cannot shrink weight or grow area without limit. Good designs use the allowed span and length fully and keep the structure light where it matters.',
        ],
        [
          'Airfoils and camber',
          'Indoor wings are usually thin, curved (cambered) surfaces of film over a light frame. Camber raises the lift coefficient at low speed, letting the wing support weight while flying slowly. Too much camber adds drag and can make the plane unstable in pitch. Most designs use a modest, consistent camber set by curved ribs or a formed spar.',
        ],
        [
          'Drag',
          'Drag has two main parts. Parasite drag comes from friction and shape and grows with speed. Induced drag comes from producing lift and is largest at low speed; long, narrow wings (high aspect ratio) reduce it. Indoor planes fly where both matter, so a long span within the box, thin structure, and clean surfaces all help.',
        ],
        [
          'Air in the room',
          'Indoor air is still but not perfect. Ventilation drafts, doors, and heat rising from people can push a slow plane off its circle. Air density changes slightly with temperature and altitude, changing lift at the same speed. Watch early flights carefully, note air currents in the log, and plan circles that avoid known drafts.',
        ],
      ],
      terms: [
        ['Lift equation', 'L = ½ρv²SC_L.'],
        [
          'Lift coefficient (C_L)',
          'Dimensionless measure of a wing’s lifting ability at a given angle.',
        ],
        ['Wing loading', 'Weight divided by wing area.'],
        ['Camber', 'Curvature of the wing section.'],
        ['Induced drag', 'Drag caused by producing lift; largest at low speed.'],
        ['Aspect ratio', 'Span squared divided by wing area.'],
      ],
      example: [
        'A 9.5 g plane (with motor) has 0.040 m² of wing and C_L = 0.8. Find its level-flight speed (ρ = 1.2 kg/m³).',
        [
          'Weight W = 0.0095 kg × 9.8 m/s² ≈ 0.093 N.',
          'v = √(2W ÷ (ρSC_L)) = √(0.186 ÷ (1.2 × 0.040 × 0.8)) = √(4.84).',
          'v ≈ 2.2 m/s.',
        ],
        'The plane cruises near 2.2 m/s; more area or C_L would slow it further.',
      ],
      mcq: [
        [
          'If airspeed doubles with all else equal, how does lift change?',
          'It becomes four times larger',
          ['It doubles', 'It halves', 'It stays the same'],
          'Lift is proportional to the square of airspeed, so doubling speed multiplies lift by four.',
        ],
        [
          'Which change lowers the flying speed of a plane of fixed weight?',
          'Increasing wing area',
          ['Decreasing wing area', 'Adding weight', 'Reducing the lift coefficient'],
          'Lower wing loading means less speed is needed to make lift equal to weight. More area does that.',
        ],
        [
          'Which drag type is largest at low speed?',
          'Induced drag',
          ['Parasite drag', 'Skin friction only', 'Wave drag'],
          'Induced drag comes from producing lift and rises as speed falls, which is why high-aspect-ratio wings help slow indoor planes.',
        ],
      ],
      written: [
        [
          'Explain why a slower plane can stay up longer on the same motor.',
          'Power required is drag times speed; flying slowly with low drag uses the motor’s fixed energy at a lower rate.',
          'Flight time is roughly stored energy divided by power required. Lower power means a longer flight.',
        ],
        [
          'Why do indoor planes use long, narrow wings?',
          'High aspect ratio reduces induced drag, which dominates at the low speeds indoor planes fly.',
          'Reducing induced drag lowers the power needed at low speed. The box limits how long the span can be.',
        ],
        [
          'How does camber help an indoor wing?',
          'It raises the lift coefficient at low speed, so the wing supports the plane while flying slowly.',
          'Moderate camber gives high lift at low speed. Too much adds drag and pitch instability.',
        ],
        [
          'Why should drafts be noted in the flight log?',
          'Drafts push slow planes off course and change flight times; noting them explains outliers and guides circle placement.',
          'Recording conditions separates trim problems from air effects. It helps predict behavior in the competition room.',
        ],
      ],
      flow: [
        ['Weight', 'Fixed by minimum mass and motor.'],
        ['Wing', 'Area and camber set the needed speed.'],
        ['Power', 'Slow, clean flight stretches the motor.'],
      ],
      compare: [
        ['Large wing', 'Slow flight', 'Must fit the box.'],
        ['High camber', 'More lift', 'More drag.'],
        ['High aspect ratio', 'Less induced drag', 'Flexible spars.'],
      ],
      challenge: 'Estimate cruise speed and suggest one change to slow the plane.',
      takeaway: 'Indoor duration comes from flying slowly with low drag on a large, light wing.',
      evidence: {
        observations: [
          ['Plane 1', 'Wing area 0.030 m²; cruise 2.6 m/s; flight 85 s.'],
          ['Plane 2', 'Wing area 0.042 m²; cruise 2.1 m/s; flight 118 s.'],
          ['Same', 'Mass, motor, and turns.'],
        ],
        question: 'What best explains Plane 2’s longer flight?',
        options: [
          'Lower wing loading let it fly slower with less power',
          'It had a bigger motor',
          'It weighed less',
        ],
        correct: 0,
        explanation:
          'With the same mass and motor, the larger wing lowered wing loading and cruise speed. Less power was needed, so the same energy lasted longer.',
      },
    },
    {
      title: 'Rubber motors: storing and releasing energy',
      objectives: [
        'Describe the torque curve of a wound rubber motor.',
        'Choose motor length and cross-section for a flight.',
        'Wind safely with a winder and torque meter.',
      ],
      sections: [
        [
          'Energy in rubber',
          'Twisting a rubber motor stores elastic energy. The energy available depends mostly on the rubber’s mass, which is why the rules cap the motor at 1.5 g. Good rubber stores more energy per gram and releases most of it. Lubricating the motor reduces internal friction and lets it take more turns before breaking.',
        ],
        [
          'The torque curve',
          'A freshly wound motor delivers high torque at first, a burst that can climb the plane quickly. Torque then drops to a long, fairly flat cruise portion, and finally tails off as the last turns unwind. Good flights match the plane to this curve: a controlled climb during the burst, then a long cruise near the ceiling.',
        ],
        [
          'Length and thickness',
          'For a fixed mass, a longer, thinner motor takes more turns but gives less torque; a shorter, thicker motor gives more torque and fewer turns. More turns usually means a longer flight if the torque still keeps the plane level. Teams test several sizes and log length, width, and mass so they can choose a motor for each room.',
        ],
        [
          'Turns and breaking',
          'Each motor has a maximum number of turns before it breaks, roughly proportional to its length. Stretch-winding, pulling the motor several times its length while winding, packs in more turns. Winding to the edge of breaking is risky, so teams usually back off 5 to 10 percent from tested maximum turns, and use a blast tube or guard for safety.',
        ],
        [
          'Winders and torque meters',
          'A geared winder multiplies crank turns, for example a 10:1 winder gives 10 motor turns per crank. A torque meter measures the twisting force directly. Many teams wind to a target torque rather than a target turn count, because torque predicts the climb better. Recording both in the log helps match the motor to the ceiling height.',
        ],
        [
          'Backing off turns',
          'After winding, teams can release some turns to set launch torque without losing the cruise turns. This is the main control for low ceilings. A plane that hits the ceiling during the burst loses height and time, so in a low room, start with less torque. In a tall room, more torque at launch gives more height to cruise from.',
        ],
      ],
      terms: [
        ['Rubber motor', 'Twisted loop of rubber that stores elastic energy.'],
        ['Torque', 'Twisting force the motor applies to the propeller.'],
        ['Torque burst', 'High torque right after launch.'],
        ['Stretch-winding', 'Winding while the motor is stretched to fit more turns.'],
        ['Winder ratio', 'Motor turns per crank turn.'],
        ['Back-off', 'Releasing turns to lower launch torque.'],
      ],
      example: [
        'A team uses a 15:1 winder and tests show a motor breaks near 1,400 turns. How many cranks should they wind for a safe 8 percent back-off?',
        [
          'Safe turns = 1,400 × 0.92 ≈ 1,290 turns.',
          'Cranks = 1,290 ÷ 15 ≈ 86 cranks.',
          'Check torque at that count and record both in the log.',
        ],
        'Wind about 86 cranks, about 1,290 turns, and confirm the torque.',
      ],
      mcq: [
        [
          'For a fixed motor mass, what does a longer, thinner motor provide?',
          'More turns and lower torque',
          ['Fewer turns and higher torque', 'More turns and higher torque', 'No change'],
          'With mass fixed, longer and thinner rubber stores its energy as more turns at lower torque.',
        ],
        [
          'Why do many teams wind to a target torque?',
          'Torque predicts the climb rate better than turns alone',
          ['It is required', 'It breaks fewer winders', 'It adds energy'],
          'Two motors with the same turns can have different torque, especially after use. Torque directly controls how hard the plane climbs.',
        ],
        [
          'A plane hits the ceiling early in the flight. What is the best first change?',
          'Back off turns to reduce launch torque',
          ['Wind more turns', 'Use a thicker motor', 'Add camber'],
          'Lower launch torque reduces the climb during the burst so the plane levels off below the ceiling.',
        ],
      ],
      written: [
        [
          'Describe the three parts of a rubber motor’s torque curve.',
          'A high initial burst, a long, fairly flat cruise portion, and a tail-off as the last turns unwind.',
          'Matching trim to each part gives a controlled climb, a long cruise, and a gentle descent.',
        ],
        [
          'Why is the motor mass limit the main energy limit?',
          'Stored energy depends mostly on rubber mass, so a 1.5 g cap limits the total energy available.',
          'With energy fixed, flight time depends on how slowly and efficiently the plane uses it.',
        ],
        [
          'Why back off from the maximum tested turns?',
          'Motors vary and weaken with use; winding near the breaking point risks a broken motor and damage.',
          'A small margin trades a few seconds for reliability. A broken motor can damage the plane and waste a flight period.',
        ],
        [
          'What should the log record for each motor?',
          'Length, width or cross-section, mass, turns, launch torque, and resulting flight time.',
          'These data let teams choose the right motor and winding for a new room and ceiling.',
        ],
      ],
      flow: [
        ['Wind', 'Stretch-wind to target torque.'],
        ['Back off', 'Set launch torque for the ceiling.'],
        ['Fly', 'Burst climb, long cruise, gentle descent.'],
      ],
      compare: [
        ['Thin long motor', 'More turns, longer flight', 'May not climb.'],
        ['Thick short motor', 'Strong climb', 'Shorter cruise.'],
        ['Torque winding', 'Consistent launches', 'Needs a torque meter.'],
      ],
      challenge: 'Choose a motor and winding plan for a 9 m ceiling.',
      takeaway: 'Rubber mass sets the energy; length, turns, and torque set how it is spent.',
      evidence: {
        observations: [
          ['Motor A', '1.4 g, 30 cm long; 1,100 turns; climbed to ceiling, 78 s.'],
          ['Motor B', '1.4 g, 38 cm long; 1,350 turns; stayed below ceiling, 104 s.'],
          ['Ceiling', '8 m in both tests.'],
        ],
        question: 'Why did Motor B fly longer?',
        options: [
          'Its lower torque and more turns gave a gentle climb and longer cruise',
          'It had more mass',
          'It was wound with fewer turns',
        ],
        correct: 0,
        explanation:
          'Same mass, but the longer motor took more turns at lower torque. It avoided the ceiling and spread its energy over a longer cruise.',
      },
    },
    {
      title: 'Propellers: turning torque into thrust',
      objectives: [
        'Define propeller diameter and pitch.',
        'Explain why large, slow propellers are efficient.',
        'Match a propeller to the motor and plane.',
      ],
      sections: [
        [
          'What a propeller does',
          'A propeller is a rotating wing. Each blade meets the air at an angle and produces a forward force, thrust, while the motor’s torque turns it against drag. In steady cruise, thrust equals the plane’s drag. The propeller’s job is to turn the motor’s slowly released energy into thrust with as little waste as possible.',
        ],
        [
          'Diameter and pitch',
          'Diameter is the tip-to-tip span. Pitch is the distance the propeller would advance in one revolution if it moved like a screw in a solid. Blade angle is steep near the hub and flatter near the tip so every section advances the same distance. Indoor propellers usually have large diameter and pitch, making them turn slowly.',
        ],
        [
          'Why large and slow',
          'A propeller makes thrust by pushing air backward. Pushing a large mass of air gently wastes less energy than pushing a small mass quickly. So a large-diameter propeller turning slowly is more efficient at low flight speeds. It also unwinds the motor more slowly, which directly stretches flight time when the propeller is well matched.',
        ],
        [
          'Matching the motor',
          'A propeller that is too large or too high in pitch needs more torque than the motor gives in cruise; the plane sinks. One that is too small spins fast, uses turns quickly, and shortens the flight. The best match turns just fast enough to keep the plane level through the cruise portion of the torque curve.',
        ],
        [
          'Pitch, speed, and slip',
          'In flight, the plane moves forward less than the pitch each revolution; the difference is slip. Revolutions per second roughly equal flight speed divided by effective pitch. A plane flying 1.5 m/s with an effective advance of 0.30 m per turn spins about 5 times per second, so a 900-turn motor lasts roughly 180 seconds.',
        ],
        [
          'Building and balancing',
          'Light, stiff blades hold their shape under load. Balance the propeller so it does not vibrate, and use a low-friction bearing. A freewheel or folding mechanism can reduce drag after the motor runs out, but no mechanism may actively change pitch or diameter. Log propeller pitch and diameter as extra flight log parameters. Mark each propeller with an ID so its data can be traced to specific flights and compared fairly later.',
        ],
      ],
      terms: [
        ['Thrust', 'Forward force produced by the propeller.'],
        ['Diameter', 'Tip-to-tip span of the propeller.'],
        ['Pitch', 'Ideal forward advance per revolution.'],
        ['Slip', 'Difference between pitch and actual advance.'],
        ['Propeller efficiency', 'Useful thrust power divided by shaft power.'],
        ['Freewheel', 'Lets the propeller spin freely after the motor unwinds.'],
      ],
      example: [
        'A plane cruises at 1.2 m/s and its propeller effectively advances 0.24 m per turn. A motor has 1,200 usable turns. Estimate motor run time.',
        [
          'Revolutions per second = 1.2 ÷ 0.24 = 5.0 rev/s.',
          'Run time = 1,200 turns ÷ 5.0 rev/s = 240 s.',
          'The burst spends turns faster, so real time is somewhat less.',
        ],
        'About 240 s of motor run, shortened somewhat by the faster burst.',
      ],
      mcq: [
        [
          'What is propeller pitch?',
          'The ideal distance advanced in one revolution',
          ['The tip-to-tip span', 'The blade thickness', 'The number of blades'],
          'Pitch is the distance a propeller would move forward in one turn if it advanced like a screw with no slip.',
        ],
        [
          'Why are large, slow propellers efficient for indoor planes?',
          'They push a large mass of air gently, wasting less energy',
          ['They weigh less', 'They make more noise', 'They spin faster'],
          'For a given thrust, accelerating more air by a smaller amount wastes less kinetic energy in the wake.',
        ],
        [
          'A plane sinks during cruise even with turns left. What propeller change may help?',
          'Reduce diameter or pitch so cruise torque can turn it',
          ['Increase pitch further', 'Add weight to the blades', 'Remove the bearing'],
          'If the propeller demands more torque than the cruise portion supplies, it turns too slowly to give enough thrust. A smaller load restores thrust.',
        ],
      ],
      written: [
        [
          'Explain why blade angle changes from hub to tip.',
          'The tip moves faster than the hub, so a flatter angle at the tip makes every section advance the same distance per turn.',
          'Twist keeps the pitch uniform across the blade so no section works against the others.',
        ],
        [
          'How does propeller choice affect flight time directly?',
          'It sets how fast the motor unwinds; a well-matched slow propeller spends turns more slowly while still giving enough thrust.',
          'Turns divided by revolutions per second gives motor run time. Efficient thrust at low rpm lengthens it.',
        ],
        [
          'What is slip, and why does it exist?',
          'The difference between pitch and actual advance; the blades must meet the air at an angle to make thrust.',
          'With zero slip there would be no angle of attack and no thrust. Some slip is normal and necessary.',
        ],
        [
          'Why is a freewheel allowed but variable pitch not?',
          'A freewheel only lets the propeller spin freely; variable pitch actively changes blade angle, which the rules prohibit.',
          'The rule bans mechanisms that change pitch or diameter. A freewheel does neither. It simply stops the idle propeller from dragging.',
        ],
      ],
      flow: [
        ['Torque', 'Motor turns the propeller.'],
        ['Thrust', 'Blades push air backward.'],
        ['Cruise', 'Thrust balances drag at low rpm.'],
      ],
      compare: [
        ['Large high-pitch prop', 'Efficient, slow unwinding', 'May need more torque.'],
        ['Small prop', 'Turns easily', 'Uses turns quickly.'],
        ['Freewheel', 'Less drag after run-down', 'Adds a little mass.'],
      ],
      challenge: 'Choose a propeller that keeps the plane level on cruise torque.',
      takeaway: 'Match a large, slow propeller to the motor’s cruise torque.',
      evidence: {
        observations: [
          ['Prop 1', 'Diameter 22 cm; plane cruised level; motor ran 140 s.'],
          ['Prop 2', 'Diameter 26 cm, same pitch; plane sank after the burst; 90 s.'],
          ['Prop 3', 'Diameter 18 cm; plane climbed fast; motor ran 95 s.'],
        ],
        question: 'Why did Prop 2 give a short flight?',
        options: [
          'It needed more torque than the cruise portion supplied',
          'It spun too fast',
          'It was too light',
        ],
        correct: 0,
        explanation:
          'The larger propeller loaded the motor beyond its cruise torque, so it turned too slowly to keep the plane level. Prop 1 was best matched.',
      },
    },
    {
      title: 'Stability, trim, and circling flight',
      objectives: [
        'Locate the center of gravity and explain pitch stability.',
        'Use incidence, dihedral, and rudder to trim.',
        'Set a steady circling pattern indoors.',
      ],
      sections: [
        [
          'Pitch stability',
          'A stable plane returns to its trimmed angle after a disturbance. The horizontal stabilizer behind the wing provides this: if the nose rises, the stabilizer’s angle increases and its lift pushes the tail up, lowering the nose. The center of gravity (CG) must be ahead of the neutral point for this to work; moving it back reduces stability.',
        ],
        [
          'Incidence and decalage',
          'Decalage is the difference between the wing’s and stabilizer’s angles of incidence, with the wing at the higher angle. Together with CG position, it sets the trimmed flying speed. More decalage or a rearward CG slows the plane until it stalls; less makes it dive. Small adjustments, often a millimeter at the stabilizer, change trim noticeably.',
        ],
        [
          'Glide testing',
          'Before powered flights, launch the plane gently by hand without a motor wound. A good glide is long, straight, and smooth. A stall, where the nose rises and drops repeatedly, means too much decalage or a CG too far back. A steep dive means too little. Fix the glide first, then add power.',
        ],
        [
          'Dihedral and roll',
          'Dihedral is the upward angle of the wings from the center. When a wing drops, the plane slips sideways and the lower wing meets the air at a higher angle, rolling the plane level. Dihedral, along with a vertical fin, keeps a turning plane from spiraling into the floor. Too much dihedral makes the plane rock.',
        ],
        [
          'Circling indoors',
          'Indoor planes fly in circles to stay inside the room. Turns come from a rudder offset, a tilted stabilizer, or wing tilt. Propeller torque rolls the plane opposite to the propeller’s rotation, which is strongest during the burst. Many teams turn the same way as the torque roll in a careful amount, or use a slight thrust offset.',
        ],
        [
          'The climb and cruise',
          'During the burst, extra thrust makes the plane climb and tighten or widen its circle. A small right or down thrust offset, or a little propeller tilt, controls the climb. During cruise the plane should circle steadily near the ceiling. Log each adjustment with its effect so the trim can be restored after repairs. A short written trim checklist speeds this up on competition day, when time is tight and nerves are high.',
        ],
      ],
      terms: [
        ['Center of gravity (CG)', 'Point where the plane balances.'],
        ['Neutral point', 'CG position at which pitch stability vanishes.'],
        ['Decalage', 'Difference in wing and stabilizer incidence angles.'],
        ['Dihedral', 'Upward wing angle that adds roll stability.'],
        ['Torque roll', 'Roll opposite to propeller rotation.'],
        ['Thrust offset', 'Small angle of the propeller shaft to control climb and turn.'],
      ],
      example: [
        'A plane stalls on every glide test. List adjustments in order to try.',
        [
          'Check the CG; move it slightly forward with a tiny ballast if behind plan.',
          'Reduce decalage by lowering the stabilizer’s leading edge slightly.',
          'Retest the glide and record the change and result.',
        ],
        'Make one small change at a time until the glide is smooth.',
      ],
      mcq: [
        [
          'What does a horizontal stabilizer mainly provide?',
          'Pitch stability',
          ['Thrust', 'Roll control', 'Lift for the whole plane'],
          'The stabilizer creates a restoring moment when the nose rises or falls, keeping the plane at its trimmed angle.',
        ],
        [
          'A glide shows repeated nose-up, nose-down stalls. What is likely?',
          'Too much decalage or CG too far back',
          ['CG too far forward', 'Not enough dihedral', 'Propeller too small'],
          'Stalling oscillation means the plane is trimmed too slowly. Less decalage or a forward CG increases trim speed.',
        ],
        [
          'Why do wing dihedral and a fin matter in a circling plane?',
          'They prevent the turn from tightening into a spiral dive',
          ['They increase thrust', 'They reduce mass', 'They add lift only'],
          'Roll and yaw stability keep a banked circle steady instead of tightening until the plane spirals down.',
        ],
      ],
      written: [
        [
          'Why test glide before powered flights?',
          'Glide shows pitch trim without motor effects, so problems like stalls or dives can be fixed safely.',
          'Separating trim from power makes each cause easier to diagnose and avoids crashes under full torque.',
        ],
        [
          'How does propeller torque affect the flight?',
          'It rolls the plane opposite to propeller rotation, strongest during the burst, tightening or widening the circle.',
          'Teams balance torque roll with rudder, wing tilt, or thrust offset to keep a steady circle. during both the burst and the cruise.',
        ],
        [
          'Why make only one trim change at a time?',
          'Several changes at once hide which one caused the result; single changes build reliable knowledge.',
          'Controlled experiments make the log useful and let teams reverse a bad adjustment. quickly and confidently.',
        ],
        [
          'Explain how dihedral rolls a plane level.',
          'When one wing drops, the plane slips toward it and the lower wing meets the air at a higher angle, making more lift and rolling it back.',
          'Sideslip on a dihedral wing creates a restoring roll moment. This is lateral stability. It works with no pilot input at all.',
        ],
      ],
      flow: [
        ['Balance', 'Set CG and decalage.'],
        ['Glide', 'Fix stalls or dives.'],
        ['Power', 'Trim climb and circle.'],
      ],
      compare: [
        ['Forward CG', 'Stable', 'Faster flight.'],
        ['Rear CG', 'Slower flight', 'Less stable; stalls.'],
        ['More dihedral', 'Spiral stability', 'Rocking; less lift.'],
      ],
      challenge: 'Trim a plane from glide test to a steady circling climb.',
      takeaway: 'Stable pitch, a good glide, and a controlled circle come before longer flights.',
      evidence: {
        observations: [
          ['Glide', 'Smooth and straight.'],
          ['Powered launch', 'Plane rolls left and spirals down in the first 5 s.'],
          ['After 5 s', 'Torque drops; plane recovers if still airborne.'],
        ],
        question: 'What is the likely cause?',
        options: [
          'Torque roll during the burst is too strong for the trim',
          'CG too far forward',
          'Not enough motor turns',
        ],
        correct: 0,
        explanation:
          'The glide is fine, and the problem appears only at high torque. Torque roll during the burst tightens the turn into a spiral; thrust offset or less launch torque helps.',
      },
    },
    {
      title: 'Building light and strong',
      objectives: [
        'Choose materials for a durable indoor plane.',
        'Plan a mass budget that meets the 8.0 g minimum.',
        'Design for repair and consistent shape.',
      ],
      sections: [
        [
          'Materials',
          'Indoor planes use balsa or carbon fiber spars and ribs, covered with thin plastic film. Balsa is light and easy to shape; denser balsa is stiffer and heavier. Carbon rods are very stiff for their weight. Glue joints add mass quickly, so use small amounts of thin glue. Film should be tight and wrinkle-free to keep the airfoil shape.',
        ],
        [
          'Using the minimum mass',
          'Because the plane must weigh at least 8.0 g without the motor, there is no prize for building lighter than that. Spend the mass on stiffness and durability: a stiff motor stick that does not bend under torque, wing spars that keep their shape, and joints that survive ceiling bumps. Add ballast only where it improves balance.',
        ],
        [
          'The motor stick',
          'The motor stick carries the full tension of the wound motor. If it bends, the propeller tilts, thrust direction changes, and trim shifts as the torque drops. A stiff, straight motor stick keeps the flight predictable from burst to cruise. Many builders test the stick by winding a motor fully and checking the bend.',
        ],
        [
          'Fitting the box',
          'The plane must slide into the measurement box in flight configuration without changing shape. That limits span, length, and height. Use the full allowed span for low induced drag, and check the box fit with the exact propeller and landing gear setup you will fly. A plane that only fits when flexed is a violation.',
        ],
        [
          'Consistent shape',
          'Warps change trim. Heat, humidity, and handling can warp balsa and film. Store the plane in a rigid box, use jigs to build matching wings, and mark incidence and stabilizer positions so they can be reset. Removable wings and tails should fit in exactly the same place every time, using keyed mounts or marks.',
        ],
        [
          'Repairs and spares',
          'Planes hit walls and ceilings. Bring spare propellers, film, glue, and a second airplane if possible. Practice quick repairs and check trim afterward with a glide. Because the Flight Period is only 10 minutes, a team with a ready backup plane and pre-wound spare motors loses little time when something breaks. Rehearse a full plane swap, including a motor change and a quick glide check, so it takes only about a minute.',
        ],
      ],
      terms: [
        ['Spar', 'Main lengthwise member of a wing.'],
        ['Rib', 'Crosswise piece that sets the airfoil shape.'],
        ['Motor stick', 'Beam carrying the motor tension.'],
        ['Ballast', 'Added mass to adjust balance or meet minimum mass.'],
        ['Jig', 'Fixture that holds parts in the right shape during building.'],
        ['Warp', 'Unwanted twist or bend in a surface.'],
      ],
      example: [
        'A built airframe weighs 7.4 g. The CG is slightly behind the target. How should the team meet the 8.0 g minimum?',
        [
          'Mass needed: 8.0 − 7.4 = 0.6 g; add a small margin, e.g., 0.7 g.',
          'Place ballast near the nose to move the CG forward.',
          'Recheck balance and glide after adding it.',
        ],
        'Add about 0.7 g at the nose: it meets the minimum and fixes balance.',
      ],
      mcq: [
        [
          'Why is a stiff motor stick important?',
          'Bending changes thrust direction and trim as torque changes',
          ['It adds lift', 'It reduces motor mass', 'It shortens the flight'],
          'A bending stick tilts the propeller differently during the burst and cruise, so trim changes during the flight.',
        ],
        [
          'An airframe weighs 7.8 g. What must happen?',
          'Add at least 0.2 g so it meets the 8.0 g minimum',
          ['Nothing', 'Remove the motor', 'Use a heavier motor'],
          'The airplane without the motor must weigh 8.0 g or more. Ballast can bring it up to the minimum.',
        ],
        [
          'Which practice keeps trim consistent between flights?',
          'Marking and keying removable wing and tail positions',
          [
            'Storing the plane loose in a bag',
            'Changing propellers often',
            'Retensioning film between flights',
          ],
          'Marks and keyed mounts let parts return to exactly the same positions, preserving incidence and trim.',
        ],
      ],
      written: [
        [
          'Why add ballast where it improves balance rather than anywhere?',
          'Ballast changes the CG; placing it to move the CG toward the target fixes balance while meeting the minimum mass.',
          'Mass that must be added anyway can solve a trim problem. Placed badly, it creates one.',
        ],
        [
          'What can warp a plane between practice and competition?',
          'Heat, humidity, and rough handling can twist balsa and film.',
          'Rigid storage, jigs, and alignment marks reduce warps and make trim recoverable. after travel or a hard landing.',
        ],
        [
          'Why test box fit with the exact flight setup?',
          'The plane must fit in flight configuration without changing shape; different props or gear can make it too big.',
          'Checking the actual flight setup, including propeller and landing gear, prevents a surprise construction violation at check-in.',
        ],
        [
          'Why bring a second airplane?',
          'A crash or warp can end the event; a trimmed backup plane allows official flights within the 10-minute period.',
          'Teams may use up to two airplanes. A ready backup protects the score. if the first plane is damaged.',
        ],
      ],
      flow: [
        ['Design', 'Fit the box and mass budget.'],
        ['Build', 'Use jigs and light, stiff parts.'],
        ['Protect', 'Rigid storage and spares.'],
      ],
      compare: [
        ['Balsa', 'Light, easy to shape', 'Warps with humidity.'],
        ['Carbon rod', 'Very stiff', 'Harder to join.'],
        ['Ballast', 'Meets minimum mass', 'Must be placed for balance.'],
      ],
      challenge: 'Plan a mass budget that reaches 8.0 g and improves the CG.',
      takeaway: 'Spend the required mass on stiffness, consistency, and balance.',
      evidence: {
        observations: [
          ['Flight 1', 'Fresh build, 102 s.'],
          ['Flight 6', 'After a week in a hot car, 61 s; plane turned sharply right.'],
          ['Inspection', 'Right wing twisted 2 degrees.'],
        ],
        question: 'What caused the drop in performance?',
        options: [
          'Heat warped the wing, changing trim',
          'The motor lost mass',
          'The ceiling was lower',
        ],
        correct: 0,
        explanation:
          'The twisted wing gives uneven lift, causing the sharp turn and short flight. Rigid storage away from heat prevents warps.',
      },
    },
    {
      title: 'Testing, the flight log, and competition day',
      objectives: [
        'Run controlled test flights and log six parameters.',
        'Use the log to choose turns for a new ceiling.',
        'Use the 10-minute flight period strategically.',
      ],
      sections: [
        [
          'Controlled testing',
          'A test flight is an experiment. Change one variable, such as turns, motor size, or a trim adjustment, and keep the rest constant. Fly in a space with a known ceiling, and fly several times to see the spread. Record every flight, including bad ones, because failures reveal the limits of a design and a motor.',
        ],
        [
          'Building the log',
          'The complete log needs at least 10 test flights and six parameters: motor size before wind-up, turns or torque at launch, flight time, and three of your choice. Good extra choices include torque at landing, estimated peak altitude, propeller pitch, motor mass, and room ceiling height. Choose parameters you will actually use to make decisions.',
        ],
        [
          'Turning data into decisions',
          'Graph flight time against launch torque for each motor size. Usually time rises with torque until the plane reaches the ceiling, then falls as it bumps and loses height. The peak of that curve is the best launch torque for that ceiling height. Remaining torque at landing tells whether the motor ran out before the plane landed.',
        ],
        [
          'Scouting the room',
          'Tournament officials announce the room’s approximate dimensions and ceiling height in advance. Plan your opening winding from the log data for a similar ceiling. On arrival, watch other flights for drafts and obstacles like lights and beams. A plane that circles under a beam can hang up and end its flight. Note where the strongest drafts are.',
        ],
        [
          'Using 10 minutes well',
          'The Flight Period starts when the motors are returned, and any flight beginning before it ends may finish. A common plan is a quick trim flight at moderate torque, an official flight that banks a safe score, then a second official flight with an adjusted winding. Pre-wind motors while waiting when possible, and keep the timer in view. Leave enough time at the end so the final official flight starts before the period closes.',
        ],
        [
          'Check-in and conduct',
          'At check-in, present planes in the measurement box, motors, and the flight log. Only participants handle the planes. Declare each flight as official or trim before launching. Be ready to answer questions about design and construction. Teams filing an appeal must leave their planes, motors, boxes, and log in the event area.',
        ],
      ],
      terms: [
        ['Controlled variable', 'Factor held constant during a test.'],
        ['Peak altitude', 'Highest point of a flight; a useful log parameter.'],
        ['Torque at landing', 'Remaining motor torque when the plane lands.'],
        ['Ceiling height', 'Room height that limits the climb.'],
        ['Banked score', 'A safe official flight made early.'],
        ['Hang-up', 'Plane caught on a fixture, ending timing.'],
      ],
      example: [
        'Log data at a 9 m ceiling: torque 0.10 → 95 s, 0.13 → 118 s, 0.16 → 104 s (ceiling bumps). Plan the first official flight.',
        [
          'Flight time peaks near 0.13 torque units.',
          'At 0.16, the plane hits the ceiling and loses time.',
          'Wind near 0.13 for the first official flight; adjust slightly after watching it.',
        ],
        'Use about 0.13 torque units for a safe first official flight.',
      ],
      mcq: [
        [
          'How many test flights does a complete log require?',
          '10 or more',
          ['5', '20', '1 per motor'],
          'A complete flight log needs data from at least 10 test flights prior to the competition, with six or more parameters.',
        ],
        [
          'What does high remaining torque at landing suggest?',
          'The plane descended before the motor ran down; trim or propeller may need changing',
          ['The motor was too weak', 'The flight was perfect', 'The ceiling was too high'],
          'If the motor still has torque when the plane lands, its energy was not used. The plane may be sinking during cruise.',
        ],
        [
          'Why bank a safe official flight early?',
          'It guarantees a score before trying a riskier winding',
          ['Official flights get bonus time', 'The first flight counts double', 'It is required'],
          'Only two official flights are allowed. A safe first flight protects the score, and the second can push for more time.',
        ],
      ],
      written: [
        [
          'Explain the typical shape of flight time versus launch torque.',
          'Time rises with torque until the plane reaches the ceiling, then falls because ceiling contact wastes energy.',
          'The peak shows the best launch torque for that ceiling, which is why the log should note ceiling height.',
        ],
        [
          'Why record bad flights in the log?',
          'They show limits and causes of failure, which help choose safe settings and count toward the 10-flight minimum.',
          'Failures are data. Omitting them biases decisions toward settings that only work sometimes. under ideal room conditions.',
        ],
        [
          'Name three useful extra log parameters.',
          'Torque at landing, estimated peak altitude, and propeller pitch; others include motor mass and ceiling height.',
          'Any three extra parameters complete the six required. Useful ones connect directly to winding and trim choices.',
        ],
        [
          'What is a hang-up and how can teams avoid it?',
          'The plane catches on a beam or light and stops being supported by its wings; avoid by circling clear of fixtures and controlling the climb.',
          'Timing ends when wings no longer support the plane. Watching the room and trimming the circle reduce the risk.',
        ],
      ],
      flow: [
        ['Test', 'Change one variable and log six parameters.'],
        ['Plan', 'Choose winding from ceiling-matched data.'],
        ['Fly', 'Bank a safe flight, then push.'],
      ],
      compare: [
        ['Safe first flight', 'Guaranteed score', 'May leave time on the table.'],
        ['Aggressive winding', 'Possible record', 'Ceiling or motor risk.'],
        ['Trim flight first', 'Finds room drafts', 'Uses period time.'],
      ],
      challenge: 'Use your log to plan both official flights for a new room.',
      takeaway: 'A well-kept log turns a new ceiling into a known winding plan.',
      evidence: {
        observations: [
          ['Room A, 7 m ceiling', 'Best time at torque 0.10.'],
          ['Room B, 11 m ceiling', 'Best time at torque 0.15.'],
          ['Competition', 'Ceiling announced as 9 m.'],
        ],
        question: 'What launch torque is a sensible starting point?',
        options: ['About 0.12–0.13', '0.10', '0.15'],
        correct: 0,
        explanation:
          'Best torque rises with ceiling height. A 9 m ceiling lies between 7 m and 11 m, so a torque between 0.10 and 0.15 is the logical starting point.',
      },
    },
  ],
});
