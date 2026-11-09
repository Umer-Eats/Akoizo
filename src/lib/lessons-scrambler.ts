import { buildEventCourse } from './build-course-kit.ts';

// Scrambler B (2027): falling-mass-powered vehicle carrying an egg to a Target Point. Low score wins.
export const scramblerLessons = buildEventCourse({
  eventId: 'scrambler',
  eventName: 'Scrambler',
  prefix: 'scr',
  division: 'B',
  intro:
    'Seven units build a vehicle powered only by a falling mass that carries a raw egg to a Target Point and stops on its own, without breaking the egg. You will learn the score, falling-mass energy, drivetrains, automatic stopping, egg protection, the curved path to the Can Bonus, and how to calibrate and run on competition day.',
  references: [
    { title: 'Science Olympiad: Scrambler B', url: 'https://www.soinc.org/scrambler-b' },
    {
      title: 'OpenStax College Physics: Kinetic Energy and the Work-Energy Theorem',
      url: 'https://openstax.org/books/college-physics-2e/pages/7-2-kinetic-energy-and-the-work-energy-theorem',
    },
  ],
  units: [
    {
      title: 'Rules and the low-score system',
      objectives: [
        'Describe the vehicle, energy, and egg requirements.',
        'Calculate a run score with distance, time, and the Can Bonus.',
        'Explain why accuracy matters more than speed.',
      ],
      sections: [
        [
          'The task',
          'The Scrambler is a vehicle and propulsion system that carries a raw egg from the Start Point toward a Target Point 7.00 to 10.00 m away and stops automatically as close to the Target Point as possible. A Terminal Barrier, a hard wall at least 25 cm tall, stands at the Target Point. The egg must survive, and the lowest score wins.',
        ],
        [
          'Energy and size limits',
          'All propulsion energy must come from a falling mass of no more than 2.00 kg. The falling mass may not touch the floor, so teams use a cushion. In ready-to-run configuration, everything, including the egg, mass, and cushion, must fit in a box with a 100.0 × 50.0 cm base and 100.0 cm height. No electronics are allowed, and the vehicle may not be remotely controlled or tethered.',
        ],
        [
          'Run Score',
          'Run Score = 100 + Distance Score + Time Score + Can Bonus + Run Penalties. Distance Score is 2.0 points per centimeter of Vehicle Distance, the point-to-point distance from the egg’s tip to the Target Point. Time Score is the run time in seconds. The Can Bonus is negative, lowering the score. The final score is the better of two runs plus any final penalties.',
        ],
        [
          'Failed runs and penalties',
          'A Failed Run gets a Distance Score of 2500 points and a time of zero, which is far worse than any normal run. A competition violation adds 150 points to the run, and a construction violation adds 300. Kits are allowed but need at least two documented functional modifications, or a non-modification penalty applies. Breaking the egg is a competition violation.',
        ],
        [
          'Accuracy beats speed',
          'Every centimeter of distance costs 2 points, while every second of time costs only 1. A vehicle that stops 5 cm closer gains 10 points, the same as running 10 seconds faster. Most Scramblers finish in a few seconds, so speed improvements are small. Teams should focus first on stopping precisely and protecting the egg, then on modest speed.',
        ],
        [
          'Tiebreakers',
          'Ties are broken by the better Vehicle Distance of the scored run, then the lower Time Score of the scored run, then the better Vehicle Distance of the non-scored run, and finally the better Time Score of the non-scored run. Because both runs can matter, a team should try to make its second run strong even after a good first run.',
        ],
      ],
      terms: [
        ['Target Point', 'Point 7.00–10.00 m from the Start Point.'],
        ['Terminal Barrier', 'Hard wall at least 25 cm tall centered at the Target Point.'],
        ['Vehicle Distance', 'Point-to-point distance from egg tip to Target Point.'],
        ['Distance Score', '2.0 points per cm of Vehicle Distance.'],
        ['Failed Run', '2500 distance points and zero time.'],
        ['Falling mass', 'Up to 2.00 kg; the only propulsion energy.'],
      ],
      example: [
        'A run stops 12.4 cm from the Target Point in 5.31 s with an Inside Can Distance of 60.0 cm and no violations. Find the Run Score.',
        [
          'Distance Score = 2.0 × 12.4 = 24.80; Time Score = 5.31.',
          'Can Bonus = −0.5 × (110 − 60.0) = −25.00.',
          'Run Score = 100 + 24.80 + 5.31 − 25.00 = 105.11.',
        ],
        'Run Score = 105.11.',
      ],
      mcq: [
        [
          'Which wins: a lower or higher score?',
          'Lower',
          ['Higher', 'Closest to 100', 'Fewest runs'],
          'Scrambler scores add distance, time, and penalties to a base of 100, so the lowest final score wins.',
        ],
        [
          'What is the Distance Score for a Failed Run?',
          '2500 points',
          ['0 points', '150 points', '300 points'],
          'A Failed Run is assigned a Distance Score of 2500 points and a run time of zero, far worse than a normal run.',
        ],
        [
          'Which is the only allowed source of propulsion energy?',
          'A falling mass up to 2.00 kg',
          ['A wound rubber band', 'A battery motor', 'A compressed spring'],
          'All energy that propels the vehicle must come from a falling mass not exceeding 2.00 kg.',
        ],
      ],
      written: [
        [
          'Explain why accuracy matters more than speed.',
          'Each cm costs 2 points while each second costs 1, and runs last only a few seconds, so stopping closer saves more points.',
          'Distance errors are weighted double and are usually larger than time savings. Precision is the main goal.',
        ],
        [
          'What violations come from the egg and barrier?',
          'Breaking the egg, any part besides the egg touching the barrier, and the egg tip going past the barrier’s front.',
          'Each is a competition violation adding 150 points to the run, so stopping must be gentle and accurate.',
        ],
        [
          'Why must the falling mass not hit the floor?',
          'The rules forbid floor contact to prevent damage, so teams must use a cushion within the size limits.',
          'The supervisor can stop a run if the floor could be damaged. The cushion also counts toward size.',
        ],
        [
          'How is the final score determined from two runs?',
          'The better of the two Run Scores plus any Final Score penalties.',
          'Only the better run counts, so a failed first run can be recovered with a good second run.',
        ],
      ],
      flow: [
        ['Release', 'Pencil triggers the falling mass.'],
        ['Travel', 'Vehicle carries the egg toward the target.'],
        ['Stop', 'Automatic stop close to the Target Point.'],
      ],
      compare: [
        ['Precise stop', 'Saves 2 points per cm', 'Needs careful calibration.'],
        ['Fast run', 'Saves 1 point per s', 'Harder egg stops.'],
        ['Can Bonus', 'Up to −55 points', 'Requires a curved path.'],
      ],
      challenge: 'Score a sample run and decide what to improve first.',
      takeaway: 'Stop close, keep the egg safe, then chase the Can Bonus and time.',
      evidence: {
        observations: [
          ['Vehicle A', 'Stops 20 cm away in 3.0 s.'],
          ['Vehicle B', 'Stops 6 cm away in 7.5 s.'],
          ['Both', 'No cans, no violations.'],
        ],
        question: 'Which vehicle scores better?',
        options: ['Vehicle B', 'Vehicle A', 'They tie'],
        correct: 0,
        explanation:
          'Vehicle A: 100 + 40 + 3.0 = 143.0. Vehicle B: 100 + 12 + 7.5 = 119.5. Precision outweighs speed.',
      },
    },
    {
      title: 'Energy from a falling mass',
      objectives: [
        'Calculate gravitational potential energy available.',
        'Trace energy from the mass to the vehicle.',
        'Choose how much energy the run actually needs.',
      ],
      sections: [
        [
          'Potential energy',
          'A falling mass m dropping height h releases potential energy mgh. A 2.00 kg mass falling 0.80 m releases 2.00 × 9.8 × 0.80 ≈ 15.7 J. That energy can become the vehicle’s kinetic energy, heat from friction, sound, and the kinetic energy of the mass itself. The size box limits how far the mass can fall, and the cushion takes up some height.',
        ],
        [
          'Where the energy goes',
          'Energy flows through strings, pulleys, and axles to the wheels. Some is lost to friction in bearings and pulleys. Some stays in the falling mass as it moves. The rest becomes the vehicle’s kinetic energy, then is lost to rolling resistance and braking. Counting where energy goes shows why a vehicle may travel less far than expected.',
        ],
        [
          'Two architectures',
          'In one design, the falling mass rides on the vehicle and drives the wheels directly as it drops. In another, a separate launcher holds the mass, which pulls the vehicle forward with a string and then lets it go, so the vehicle coasts. Each design must fit the size box and keep the falling mass off the floor.',
        ],
        [
          'How much energy is enough',
          'A vehicle needs only enough energy to cover the target distance against rolling resistance. Extra energy means more speed, which makes stopping harder and the egg more likely to crack. Many teams use less than the full 2.00 kg or a shorter drop, and tune the energy so the vehicle reaches the stopping point at a moderate speed.',
        ],
        [
          'Speed and kinetic energy',
          'Kinetic energy is ½mv². Doubling speed quadruples kinetic energy, which the brakes must then remove. A 0.60 kg vehicle at 2.0 m/s has 1.2 J; at 4.0 m/s it has 4.8 J. Since time only costs 1 point per second, moderate speeds that keep stops gentle are usually the better trade.',
        ],
        [
          'Consistency',
          'For precise stopping, each run should deliver the same energy. Use the same mass, release height, and string routing every time. Check that strings do not slip or tangle, and that pulleys spin freely. A consistent energy source makes the stopping mechanism’s job easier and the calibration more reliable. Mark the release height clearly on the frame so it never drifts between runs.',
        ],
      ],
      terms: [
        ['Gravitational potential energy', 'mgh released as the mass falls.'],
        ['Kinetic energy', '½mv² of the moving vehicle.'],
        ['Launcher', 'Separate stand that holds and drops the mass.'],
        ['Rolling resistance', 'Energy loss as wheels roll.'],
        ['Energy budget', 'Planned split of energy among motion and losses.'],
        ['Drop height', 'How far the falling mass descends.'],
      ],
      example: [
        'A 1.50 kg mass falls 0.60 m. If 40 percent reaches a 0.50 kg vehicle as kinetic energy, what is its top speed?',
        [
          'Energy released = 1.50 × 9.8 × 0.60 ≈ 8.8 J.',
          'To vehicle: 0.40 × 8.8 ≈ 3.5 J.',
          'v = √(2E ÷ m) = √(2 × 3.5 ÷ 0.50) ≈ 3.7 m/s.',
        ],
        'About 3.7 m/s, fast enough that braking must be gentle.',
      ],
      mcq: [
        [
          'How much energy does a 2.00 kg mass release falling 0.50 m?',
          'About 9.8 J',
          ['About 1.0 J', 'About 19.6 J', 'About 4.9 J'],
          'Potential energy released = mgh = 2.00 × 9.8 × 0.50 = 9.8 J. Not all of it reaches the vehicle.',
        ],
        [
          'If vehicle speed doubles, how does its kinetic energy change?',
          'It becomes four times larger',
          ['It doubles', 'It halves', 'It stays the same'],
          'Kinetic energy is ½mv², proportional to speed squared, so doubling speed quadruples it. The brakes must remove all of it.',
        ],
        [
          'Why might a team use less than 2.00 kg?',
          'Less energy makes stopping gentler and protects the egg',
          ['The rules require less', 'It increases distance', 'Heavier masses are slower'],
          'Extra energy means more speed and harder stops. Teams use only the energy needed to reach the target reliably.',
        ],
      ],
      written: [
        [
          'List three places energy is lost between the mass and the wheels.',
          'Friction in pulleys and bearings, motion of the falling mass itself, and string stretch or slip.',
          'Each loss reduces vehicle energy. Identifying them explains differences between predicted and actual distance. in testing.',
        ],
        [
          'Why is consistent release important?',
          'The same energy each run makes stopping position and calibration predictable.',
          'Varying energy changes speed and braking behavior, which spreads stopping positions and raises the score.',
        ],
        [
          'Compare on-board and launcher designs.',
          'On-board: the mass drives the wheels as it drops. Launcher: a separate mass pulls the vehicle with a string, then releases it to coast.',
          'Both are legal if the energy is from the falling mass and the system fits the size box.',
        ],
        [
          'How much kinetic energy does a 0.80 kg vehicle have at 2.5 m/s?',
          '½ × 0.80 × 2.5² = 2.5 J.',
          'Kinetic energy is ½mv². This energy must be removed by the brakes at the end of the run.',
        ],
      ],
      flow: [
        ['Drop', 'Mass releases mgh.'],
        ['Transfer', 'Strings and axles drive the vehicle.'],
        ['Spend', 'Motion, friction, and braking.'],
      ],
      compare: [
        ['Full 2 kg', 'Plenty of energy', 'Harsh stops.'],
        ['Lighter mass', 'Gentle speeds', 'May fall short.'],
        ['Launcher', 'Light vehicle', 'Vehicle coasts uncontrolled.'],
      ],
      challenge: 'Size the falling mass and drop for a 9 m run at moderate speed.',
      takeaway: 'Use only the energy you need, delivered the same way every run.',
      evidence: {
        observations: [
          ['2.0 kg mass', 'Top speed 4.2 m/s; egg cracked on stop in 3 of 5 runs.'],
          ['1.2 kg mass', 'Top speed 2.6 m/s; egg safe 5 of 5; time +1.8 s.'],
          ['Target', '8.00 m in both cases.'],
        ],
        question: 'Which setup is better?',
        options: ['1.2 kg mass', '2.0 kg mass', 'No difference'],
        correct: 0,
        explanation:
          'The 1.8 s time cost adds only 1.8 points, while a cracked egg adds a 150-point violation. The lighter mass is far better.',
      },
    },
    {
      title: 'Drivetrains: turning a drop into distance',
      objectives: [
        'Relate drop height, axle size, and wheel size to distance.',
        'Choose a gear or pulley ratio.',
        'Design low-friction axles and wheels.',
      ],
      sections: [
        [
          'String and axle',
          'A common drive winds a string around a drive axle. As the falling mass pulls the string, the axle turns. If a length of string L unwinds from an axle of radius r, the axle turns L ÷ (2πr) times. Each turn moves the vehicle one wheel circumference, 2πR. So the vehicle travels about L × R ÷ r, ignoring slip.',
        ],
        [
          'Distance ratio',
          'The ratio R ÷ r multiplies the drop distance. To travel 9 m with only 0.8 m of string, the vehicle needs R ÷ r of about 11; for example, a 0.4 cm axle with 4.5 cm wheels. A larger ratio moves farther but delivers less force to the ground, so the vehicle accelerates more slowly. Choose a ratio that covers the longest possible target with margin.',
        ],
        [
          'Pulleys',
          'Pulley systems change force and distance before the axle. A pulley arrangement where the falling mass moves 1 cm and the string moves 2 cm doubles distance and halves force. Launcher designs often use such pulleys to multiply the mass’s short fall into a longer pull. Every pulley adds friction, so use only what is needed.',
        ],
        [
          'Wheels',
          'Large, light, true wheels roll with less resistance and cover more distance per turn. Wheels must be round and centered, or the vehicle wobbles and veers. Thin rubber bands or O-rings on the rims improve traction so wheels do not slip when torque is applied. Wheel diameter must be measured precisely, since calibration depends on it.',
        ],
        [
          'Axles and bearings',
          'Friction in axles wastes energy and makes runs inconsistent. Use straight, smooth axles in low-friction bearings or bushings. Keep wheels perpendicular to axles and axles parallel to each other, or the vehicle curves and scrubs. Check that the vehicle rolls straight and far when pushed gently by hand.',
        ],
        [
          'String management',
          'The string must wind neatly so the effective axle radius stays constant. If string piles up, the radius grows and the vehicle moves farther per centimeter of drop than planned. A small hook or a hole in the axle lets the string release when fully unwound, so it does not rewind or snag. Use strong, low-stretch line.',
        ],
      ],
      terms: [
        ['Drive axle', 'Axle turned by the string.'],
        ['Distance ratio', 'Wheel radius divided by axle radius.'],
        ['Wheel circumference', '2πR, distance per wheel turn.'],
        ['Bearing', 'Part that supports an axle with low friction.'],
        ['Traction', 'Grip between wheel and floor.'],
        ['String pile-up', 'String layering that increases effective radius.'],
      ],
      example: [
        'A vehicle has 0.50 cm axle radius and 4.0 cm wheel radius. The mass pulls 0.75 m of string. About how far can the vehicle be driven?',
        [
          'Distance ratio = 4.0 ÷ 0.50 = 8.',
          'Distance ≈ 0.75 m × 8 = 6.0 m.',
          'Too short for a 7.00 m minimum target; increase wheel size or string length.',
        ],
        'About 6 m, so the team must raise the ratio or the pull.',
      ],
      mcq: [
        [
          'Doubling wheel radius with the same axle and string does what to driven distance?',
          'Doubles it',
          ['Halves it', 'Quadruples it', 'No change'],
          'Driven distance ≈ string length × R ÷ r. Doubling R doubles the distance. if the wheels do not slip.',
        ],
        [
          'What happens if string piles up on the axle?',
          'Effective axle radius grows, changing distance per centimeter of string',
          ['Friction disappears', 'The wheel shrinks', 'Nothing'],
          'A larger effective radius reduces the distance ratio and makes runs inconsistent. from one run to the next.',
        ],
        [
          'Why add O-rings to wheel rims?',
          'To improve traction and prevent slipping',
          ['To add mass', 'To slow the vehicle', 'To make wheels bigger'],
          'Rubber improves grip, so torque turns into motion without wheel spin. That keeps the calibration of distance per turn accurate.',
        ],
      ],
      written: [
        [
          'Why does a bigger distance ratio reduce acceleration?',
          'The same force on the string becomes a smaller force at the wheel, since force divides by the ratio.',
          'Distance is gained at the cost of force. Too large a ratio may barely move a heavy vehicle.',
        ],
        [
          'How can a team check alignment quickly?',
          'Push the vehicle gently and watch whether it rolls straight and far without scrubbing.',
          'A curving or quickly stopping roll reveals misaligned wheels or axles, or friction. in the bearings.',
        ],
        [
          'Why must wheel diameter be measured precisely?',
          'Calibration converts axle turns to distance using circumference; a small diameter error accumulates over meters.',
          'A 1 percent diameter error causes about a 1 percent distance error, about 9 cm on a 9 m run.',
        ],
        [
          'Why release the string when fully unwound?',
          'So the axle does not rewind the string or snag, which could stop or reverse the vehicle.',
          'A clean release lets the vehicle coast freely toward the stopping mechanism. without any drag from the string.',
        ],
      ],
      flow: [
        ['Pull', 'Falling mass pulls string.'],
        ['Turn', 'Axle turns the wheels.'],
        ['Travel', 'Distance ≈ string × R ÷ r.'],
      ],
      compare: [
        ['Large ratio', 'Long distance', 'Weak acceleration.'],
        ['Small ratio', 'Strong start', 'Short distance.'],
        ['Pulleys', 'Multiply pull', 'Add friction.'],
      ],
      challenge: 'Choose axle and wheel sizes so the vehicle reaches 10 m.',
      takeaway: 'Wheel-to-axle ratio turns a short drop into a long run.',
      evidence: {
        observations: [
          ['Run 1', 'String wound in one neat layer: 8.42 m.'],
          ['Run 2', 'String piled in three layers: 7.61 m.'],
          ['Same', 'Mass and drop height.'],
        ],
        question: 'Why did Run 2 travel less?',
        options: [
          'Pile-up increased the effective axle radius',
          'The wheels shrank',
          'The mass was lighter',
        ],
        correct: 0,
        explanation:
          'Layered string made the effective axle radius larger, so each centimeter of string turned the axle less, lowering the distance ratio.',
      },
    },
    {
      title: 'Automatic stopping',
      objectives: [
        'Design a turn-counting stopping mechanism.',
        'Convert target distance to axle turns.',
        'Reduce stopping error from skid and overrun.',
      ],
      sections: [
        [
          'Why automatic stopping',
          'The stopping mechanism must be entirely inside the vehicle and work automatically, with no remote control or tether. Pre-loaded energy, like a spring or rubber band, may operate the brake as long as it does not propel the vehicle. Because the Distance Score is the biggest part of the score, the stopping mechanism is the heart of the design.',
        ],
        [
          'Threaded rod and wing nut',
          'A classic design uses a threaded rod as, or geared to, an axle. A wing nut rides along the threads as the axle turns, kept from spinning by a guide. After a set number of turns, the nut hits a stop or releases a brake. Setting the starting position of the nut sets the distance.',
        ],
        [
          'Turns from distance',
          'Distance per axle turn equals the wheel circumference, πd. For a target of 8.50 m with wheels 8.00 cm in diameter, each turn moves 25.13 cm, so the vehicle needs 850 ÷ 25.13 ≈ 33.8 turns. Measure the egg tip’s position relative to the wheels, since Vehicle Distance is measured from the egg tip. Measure it carefully.',
        ],
        [
          'Braking',
          'When triggered, a brake should lock or press the wheels firmly and evenly, or a pin can jam the axle. Stopping abruptly can crack the egg, while a slow brake lets the vehicle skid or roll on unpredictably. Many teams test braking from full speed to find how far the vehicle travels after the trigger and include that in calibration.',
        ],
        [
          'Calibration',
          'Calibration connects nut position or turns to actual stopping distance. Run the vehicle at several settings, measure where the egg tip stops, and fit a line or table. Use it to choose the setting for any target. Recheck it on surfaces like the competition floor, since different floors change skid distance.',
        ],
        [
          'Sources of error',
          'Wheel slip, misalignment that curves the path, string variation, and inconsistent braking all add error. Run many tests at the same setting to measure the spread, then attack the largest cause. A vehicle that stops within 2 to 3 cm consistently is very competitive, since each centimeter is worth 2 points. Track the spread in a log so you can see whether each change actually helped.',
        ],
      ],
      terms: [
        ['Stopping mechanism', 'Automatic, in-vehicle device that halts the vehicle.'],
        ['Threaded rod', 'Screw that moves a nut a fixed distance per turn.'],
        ['Wing nut', 'Nut that travels along the threads to trigger the brake.'],
        ['Brake', 'Device that stops wheel or axle rotation.'],
        ['Skid distance', 'Travel after the brake triggers.'],
        ['Calibration curve', 'Relationship between setting and stopping distance.'],
      ],
      example: [
        'Target 9.25 m. Wheels are 7.50 cm in diameter. The vehicle skids 3 cm after braking, and the egg tip sits 10 cm ahead of the point used as the start reference. How many turns?',
        [
          'Circumference = π × 7.50 ≈ 23.56 cm.',
          'Distance to cover before braking = 925 − 3 − 10 = 912 cm.',
          'Turns = 912 ÷ 23.56 ≈ 38.7 turns.',
        ],
        'Set the nut for about 38.7 turns, then confirm on the competition floor.',
      ],
      mcq: [
        [
          'Wheels are 6.0 cm in diameter. How far does one axle turn move the vehicle?',
          'About 18.8 cm',
          ['6.0 cm', '12.0 cm', '37.7 cm'],
          'Distance per turn is the circumference, π × 6.0 ≈ 18.8 cm. One full turn moves the vehicle that far.',
        ],
        [
          'Which brake power source is allowed?',
          'A pre-loaded rubber band that only operates the brake',
          ['A battery-powered motor', 'A remote control', 'A tether from the start line'],
          'Pre-loaded energy may operate other functions like braking, as long as it does not propel the vehicle. Electronics and tethers are banned.',
        ],
        [
          'Why recheck calibration on the competition floor?',
          'Surface changes skid distance and wheel grip',
          ['Gravity changes', 'Wheels grow', 'The target changes the rules'],
          'Smoother or rougher floors change how far the vehicle slides after braking, shifting stopping positions.',
        ],
      ],
      written: [
        [
          'Explain how a wing nut mechanism sets distance.',
          'As the axle turns, the nut travels along a threaded rod; after a set number of turns it triggers the brake.',
          'Distance equals turns times circumference, so the nut’s starting position sets the stopping distance. for each run.',
        ],
        [
          'Why include skid distance in the setting?',
          'The vehicle keeps moving briefly after the brake triggers, so ignoring skid makes it overshoot.',
          'Measured skid is subtracted from the target so the vehicle stops at the right place.',
        ],
        [
          'How should a team find the largest error source?',
          'Run many tests at one setting, measure the spread, and test each suspected cause separately.',
          'Controlled tests isolate causes like slip, misalignment, or brake variation. Fixing the largest cause first gives the biggest improvement.',
        ],
        [
          'Why measure Vehicle Distance from the egg tip?',
          'The rules define Vehicle Distance from the egg tip, the Vehicle Measurement Point, to the Target Point.',
          'Calibrating the wheels alone ignores the egg’s offset, adding a fixed error to every run.',
        ],
      ],
      flow: [
        ['Set', 'Position the nut for the target.'],
        ['Count', 'Axle turns move the nut.'],
        ['Brake', 'Nut triggers stop at the target.'],
      ],
      compare: [
        ['Wing nut', 'Precise, adjustable', 'Needs a guide.'],
        ['Axle pin', 'Very sudden stop', 'Hard on the egg.'],
        ['Friction brake', 'Gentle', 'Skid varies.'],
      ],
      challenge: 'Convert three target distances into stopping settings.',
      takeaway:
        'Count axle turns, account for skid and egg offset, and calibrate on the real floor.',
      evidence: {
        observations: [
          ['Setting 30.0 turns', 'Stops at 7.21, 7.24, 7.19 m.'],
          ['Setting 35.0 turns', 'Stops at 8.40, 8.43, 8.38 m.'],
          ['Target', '8.00 m.'],
        ],
        question: 'About what setting should the team use?',
        options: ['About 33.3 turns', '32.0 turns', '35.0 turns'],
        correct: 0,
        explanation:
          'Five turns moved the stop about 1.19 m, or 0.238 m per turn. Reaching 8.00 m from 7.21 m needs about 3.3 more turns, so about 33.3 turns.',
      },
    },
    {
      title: 'Protecting the egg',
      objectives: [
        'Build a legal egg holder and backstop.',
        'Calculate deceleration during stopping.',
        'Stop safely near the Terminal Barrier.',
      ],
      sections: [
        [
          'Egg holder rules',
          'The egg sits on two wooden dowels, 1/4 to 3/8 inch in diameter and 3.0 to 4.0 cm long, attached to a wooden backstop 5.0 × 5.0 cm and at least 1.1 cm thick; balsa is not allowed. The bottom of the dowels must be 5.0 to 10.0 cm above the track. The egg must be the foremost part of the vehicle.',
        ],
        [
          'Attaching the egg',
          'Supervisors supply the tape. Teams tape the egg to the dowels, with its rounded end touching the backstop and visible. No tape may cover the front or rear 1.0 cm of the egg. Attaching the egg and falling mass counts against event time, so practice taping quickly and consistently with the same tape type.',
        ],
        [
          'Deceleration',
          'The egg feels the vehicle’s deceleration when it stops. Stopping from speed v in distance d gives an average deceleration a = v² ÷ (2d). Stopping from 2.0 m/s in 10 cm gives 20 m/s², about 2 g. Stopping in 1 cm gives 200 m/s², about 20 g. Longer, smoother stops are much gentler on the egg.',
        ],
        [
          'The Terminal Barrier',
          'The barrier is a hard, flat wall at least 25 cm tall and 1 m long, centered at the Target Point. Any vehicle part besides the egg touching the barrier is a competition violation, and so is the egg tip going past the barrier’s front. Plan to stop the egg tip very close to, but not past, the barrier.',
        ],
        [
          'Speed at the end',
          'Because speed squared sets deceleration, the vehicle should already be slowing as it approaches the target. Some designs use energy that runs out near the end, so the vehicle coasts in slowly. Others brake progressively. Lower arrival speed gives gentler stops and smaller skid errors, at the cost of a little time.',
        ],
        [
          'Testing safely',
          'Test with practice eggs or egg-shaped substitutes of similar mass, then confirm with real eggs. Check for hairline cracks after each test. A broken egg on the first run means no second run, so egg safety protects both runs. Bring spare eggs to practice, and handle eggs gently during setup. Store spare eggs in a padded carton so none crack on the way to the tournament.',
        ],
      ],
      terms: [
        ['Backstop', 'Wooden block at least 1.1 cm thick holding the dowels.'],
        ['Dowels', 'Two wooden pegs supporting the egg.'],
        ['Deceleration', 'Rate of slowing, a = v² ÷ (2d).'],
        ['g-force', 'Acceleration in multiples of 9.8 m/s².'],
        ['Foremost part', 'The egg must lead the vehicle.'],
        ['Tape-free zone', 'Front and rear 1.0 cm of the egg.'],
      ],
      example: [
        'A vehicle arrives at 1.5 m/s and stops in 6 cm. Find the average deceleration in g.',
        [
          'a = v² ÷ (2d) = 1.5² ÷ (2 × 0.06) = 2.25 ÷ 0.12 ≈ 18.8 m/s².',
          'In g: 18.8 ÷ 9.8 ≈ 1.9 g.',
          'This is gentle; the egg should survive.',
        ],
        'About 1.9 g, a safe stop.',
      ],
      mcq: [
        [
          'Which egg holder detail is NOT legal?',
          'A balsa backstop',
          ['A 3/8 inch dowel', 'Dowels 3.5 cm long', 'Dowel bottoms 7 cm above the track'],
          'The backstop must be wood at least 1.1 cm thick and not balsa. The other details are within the rules.',
        ],
        [
          'If arrival speed doubles with the same stopping distance, how does deceleration change?',
          'It quadruples',
          ['It doubles', 'It halves', 'No change'],
          'Deceleration is v² ÷ (2d), so doubling speed multiplies it by four. This is why arrival speed matters so much.',
        ],
        [
          'What happens if the egg breaks on the first run?',
          'A violation, and no second run',
          ['Only a time penalty', 'Nothing', 'A 300-point penalty'],
          'A broken egg is a competition violation, and a second run will not occur if the egg breaks on the first run.',
        ],
      ],
      written: [
        [
          'Why is the egg required to be foremost?',
          'Vehicle Distance is measured from the egg tip, and the egg leads the vehicle to the barrier.',
          'Placing the egg first makes measurement clear and tests whether the design protects it at the front.',
        ],
        [
          'Why is a progressive slowdown better than a sudden stop?',
          'Spreading the stop over a longer distance reduces deceleration and egg stress.',
          'Deceleration is v² ÷ (2d), so a larger stopping distance and lower speed both help.',
        ],
        [
          'What violations involve the Terminal Barrier?',
          'Any part besides the egg touching it, or the egg tip passing its front.',
          'Both add 150 points. Stopping just short of the barrier avoids them. while keeping the distance small.',
        ],
        [
          'How can teams practice taping quickly?',
          'Rehearse with the same tape type, keeping the front and rear 1.0 cm clear and the rounded end against the backstop.',
          'Taping counts against event time, and incorrect taping is a violation. Practice makes it fast and legal.',
        ],
      ],
      flow: [
        ['Mount', 'Egg taped legally to the dowels.'],
        ['Approach', 'Vehicle slows near the target.'],
        ['Stop', 'Gentle stop short of the barrier.'],
      ],
      compare: [
        ['Hard stop', 'Little skid', 'High g on the egg.'],
        ['Progressive stop', 'Gentle', 'More skid variation.'],
        ['Slow arrival', 'Safe, precise', 'Slightly longer time.'],
      ],
      challenge: 'Design a stop that keeps deceleration under 3 g.',
      takeaway: 'Arrive slowly, stop smoothly, and never let the vehicle hit the barrier.',
      evidence: {
        observations: [
          ['Design A', 'Arrives 3.0 m/s, stops in 2 cm; 2 of 5 eggs cracked.'],
          ['Design B', 'Arrives 1.5 m/s, stops in 5 cm; 0 of 5 cracked.'],
          ['Question', 'Compare decelerations.'],
        ],
        question: 'Why did Design B protect the eggs?',
        options: [
          'Its deceleration was about 10 times lower',
          'It was heavier',
          'It traveled farther',
        ],
        correct: 0,
        explanation:
          'Design A: 3.0² ÷ 0.04 = 225 m/s². Design B: 1.5² ÷ 0.10 = 22.5 m/s². A slower arrival and longer stop cut deceleration tenfold.',
      },
    },
    {
      title: 'The Can Bonus and curved paths',
      objectives: [
        'Calculate the Can Bonus for any Inside Can Distance.',
        'Design an arc that passes between the cans and reaches the target.',
        'Compare the bonus with its risks.',
      ],
      sections: [
        [
          'Can placement',
          'The Bonus Line lies halfway between the Start Point and Target Point and extends to the left. Two cans sit on it. The supervisor places the Outside Can with its inside edge 100.0 cm from the imaginary center line. Competitors place the Inside Can with its outside edge 0.0 to 100.0 cm from the inside edge of the Outside Can.',
        ],
        [
          'Bonus value',
          'Can Bonus = −0.5 × (110 − Inside Can Distance), where the Inside Can Distance is the gap between the cans. A 50 cm gap earns −30 points; a 30 cm gap earns −40. Narrower gaps earn more but are harder to pass through. All parts of the vehicle must travel between the cans, and if a can moves, the bonus is lost.',
        ],
        [
          'Why the path must curve',
          'The gap lies to the left of the straight line from start to target. For a 50 cm gap, its center is 75 cm left of the center line. The vehicle must curve left to pass through the gap at the halfway point, then curve back to reach the Target Point. A circular arc through all three points does this.',
        ],
        [
          'Arc geometry',
          'For a chord length L (the target distance) and a sideways offset s at the middle, the arc radius is R = (L²/4 + s²) ÷ (2s). For L = 8.00 m and s = 0.75 m, R ≈ 11.0 m. The arc is longer than the straight line: here about 8.19 m. The stopping mechanism must count the arc length.',
        ],
        [
          'Steering an arc',
          'A vehicle turns steadily if its wheels are angled slightly or if one drive wheel is larger than the other. For two wheels a track width w apart, the outer wheel travels (R + w/2) ÷ (R − w/2) times as far as the inner. With R = 11 m and w = 0.15 m, that ratio is about 1.014, a very small difference.',
        ],
        [
          'Risk versus reward',
          'The bonus is large: up to tens of points, more than most distance errors. But a curved path is harder to calibrate, and a vehicle that hits a can or misses the gap loses the bonus and may stop far from the target. Teams often master straight runs first, then add the bonus with a wide gap and narrow it as reliability improves.',
        ],
      ],
      terms: [
        ['Bonus Line', 'Line halfway to the target where the cans sit.'],
        ['Outside Can', 'Placed by the supervisor, inside edge 100 cm from center.'],
        ['Inside Can', 'Placed by competitors, 0–100 cm from the Outside Can.'],
        ['Inside Can Distance', 'Gap between cans used in the bonus formula.'],
        ['Chord', 'Straight line from start to target.'],
        ['Arc length', 'Distance along the curved path.'],
      ],
      example: [
        'Target 9.00 m. The team sets a 60 cm gap. Find the bonus, the gap center offset, and the arc radius.',
        [
          'Bonus = −0.5 × (110 − 60) = −25 points.',
          'Gap spans 40 to 100 cm left of center; center offset s = 0.70 m.',
          'R = (9.00²/4 + 0.70²) ÷ (2 × 0.70) = (20.25 + 0.49) ÷ 1.40 ≈ 14.8 m.',
        ],
        'Bonus −25 with an arc radius near 14.8 m.',
      ],
      mcq: [
        [
          'What is the Can Bonus for an Inside Can Distance of 40.0 cm?',
          '−35 points',
          ['−20 points', '−55 points', '−70 points'],
          'Can Bonus = −0.5 × (110 − 40) = −35 points. A narrower gap would earn more, with more risk.',
        ],
        [
          'Why must the stopping setting change for a curved path?',
          'The arc is longer than the straight-line distance',
          ['The cans slow the vehicle', 'The target moves', 'Curves shrink wheels'],
          'A curved path covers more ground than the chord, so counting turns for the straight distance would stop short.',
        ],
        [
          'When is the Can Bonus lost?',
          'If any part of the vehicle does not pass between the cans or a can is moved',
          ['If the run takes over 5 s', 'If the egg is foremost', 'If the gap is over 50 cm'],
          'All parts must pass between the cans, and the Inside Can Distance must not change. Otherwise no bonus is awarded.',
        ],
      ],
      written: [
        [
          'Why do narrow gaps earn more bonus?',
          'The formula subtracts the gap from 110, so smaller gaps give larger negative bonuses.',
          'The rules reward precise steering. Narrow gaps lower the score more but increase the risk of hitting a can.',
        ],
        [
          'Calculate the arc length for a chord of 8.00 m and a radius of 11.0 m.',
          'θ = 2 asin(4.00 ÷ 11.0) ≈ 0.744 rad; arc = 11.0 × 0.744 ≈ 8.19 m.',
          'The arc is about 19 cm longer than the chord. Ignoring that difference would stop the vehicle short.',
        ],
        [
          'How can a vehicle be made to follow a gentle arc?',
          'Angle the wheels slightly or use slightly different drive wheel sizes so one side travels farther.',
          'Large-radius arcs need tiny differences, so adjustments should be small and finely tunable. and well recorded.',
        ],
        [
          'Why master straight runs before the bonus?',
          'Straight runs build a reliable drivetrain and calibration; adding the curve later isolates new errors.',
          'Stepwise development makes problems easier to find and keeps a safe fallback for competition. day at the tournament.',
        ],
      ],
      flow: [
        ['Place', 'Set the Inside Can gap.'],
        ['Curve', 'Arc through the gap.'],
        ['Arrive', 'Stop at the target after the arc length.'],
      ],
      compare: [
        ['No cans', 'Simple, straight', 'No bonus.'],
        ['Wide gap', 'Safer bonus', 'Smaller bonus.'],
        ['Narrow gap', 'Large bonus', 'High risk.'],
      ],
      challenge: 'Plan an arc for a 9.50 m target with a 50 cm gap.',
      takeaway: 'Compute the arc, count its length, and narrow the gap only as reliability allows.',
      evidence: {
        observations: [
          ['Arc runs', 'Passed between cans 10 of 10.'],
          ['Stopping', 'Stopped 18 cm short of the target each time.'],
          ['Setting', 'Turns calculated from the straight-line distance.'],
        ],
        question: 'What explains the short stops?',
        options: [
          'The arc is longer than the straight-line distance',
          'The cans slowed the vehicle',
          'The egg was too heavy',
        ],
        correct: 0,
        explanation:
          'Turns were set for the chord, but the vehicle traveled along a longer arc, so it ran out of turns about 18 cm before the target.',
      },
    },
    {
      title: 'Calibration and competition day',
      objectives: [
        'Build a calibration table for 7.00–10.00 m targets.',
        'Follow impound, setup, and run procedures.',
        'Use the second run wisely.',
      ],
      sections: [
        [
          'Target Distance',
          'The Target Distance is chosen by the supervisor between 7.00 and 10.00 m, in steps of 0.25 m at Regionals, 0.10 m at State, and 0.01 m at Nationals. It is announced after impound and before the first time slot. A calibration table covering the whole range lets the team set the vehicle quickly for any value.',
        ],
        [
          'Building the table',
          'Test at several settings across the range, such as 7, 8, 9, and 10 m, with several runs each. Record setting, stopping distance, and time. Fit a line through the averages. Repeat on a floor similar to tournament floors. Separate tables for straight runs and for each Can Bonus gap make bonus runs predictable.',
        ],
        [
          'Impound',
          'Teams impound the vehicle, launcher if separate, and the Kit Modification Form if using a kit. The falling mass must be detached when impounding. Tools do not need impound, and the launcher and falling mass may be shared between teams from the same school. Inspections do not happen at impound. Pack the falling mass separately and bring a checklist so nothing is left behind.',
        ],
        [
          'Setup and launch',
          'During event time, teams attach the falling mass and tape the egg. They place the vehicle at the Start Point and the Inside Can if trying the bonus. When ready, they tell the supervisor, who may ask questions about specific violations. Teams trigger the run with an unsharpened #2 pencil, touching only the pencil, without adding energy.',
        ],
        [
          'During and after the run',
          'Competitors may not follow the vehicle down the track before being called to retrieve it. The supervisor decides if the run was successful or failed, then measures Vehicle Distance and records the time. If the vehicle fails to move when triggered, a run has not occurred and the team may keep working within event time.',
        ],
        [
          'Using the second run',
          'Only the better run counts. If the first run is good, the second can try a narrower Can Bonus gap or a small calibration adjustment. If the first run failed or had a violation, make the second a safe, reliable run. Remember that the egg must survive the first run for a second run to happen. Plan the egg handling carefully.',
        ],
      ],
      terms: [
        ['Target Distance', '7.00–10.00 m, announced after impound.'],
        ['Calibration table', 'Settings mapped to stopping distances.'],
        ['Impound', 'Turning in the vehicle before the event.'],
        ['Kit Modification Form', 'Documents at least two functional kit changes.'],
        ['Pencil trigger', 'Unsharpened #2 pencil used to start the run.'],
        ['Successful run', 'A run judged valid and measured.'],
      ],
      example: [
        'Table: 30 turns → 7.20 m, 34 turns → 8.15 m, 38 turns → 9.10 m. Set for a State target of 8.60 m.',
        [
          'Slope: (9.10 − 7.20) ÷ 8 = 0.2375 m per turn.',
          'From 34 turns: (8.60 − 8.15) ÷ 0.2375 ≈ 1.9 turns.',
          'Set about 35.9 turns.',
        ],
        'About 35.9 turns for 8.60 m.',
      ],
      mcq: [
        [
          'When is the Target Distance announced?',
          'After impound and before the first time slot',
          ['Weeks before the tournament', 'During the run', 'After both runs'],
          'The Target Distance is announced and posted after impound and before the first time slot.',
        ],
        [
          'What must be detached when impounding?',
          'The falling mass',
          ['The wheels', 'The stopping mechanism', 'The egg holder'],
          'The falling mass must be detached during impound and attached during event time. by the team.',
        ],
        [
          'The vehicle does not move when triggered. What happens?',
          'A run has not occurred; the team may keep working',
          ['It is a Failed Run', 'It scores 2500', 'The team is disqualified'],
          'If the vehicle fails to actuate, a run has not occurred. The team may continue working within event time.',
        ],
      ],
      written: [
        [
          'Why build calibration tables for both straight and bonus runs?',
          'Curved paths are longer and behave differently, so each needs its own settings.',
          'Separate tables let the team choose quickly between a safe straight run and a bonus attempt.',
        ],
        [
          'Why may participants only touch the pencil during triggering?',
          'Touching the vehicle could add energy or aim it, which the rules prohibit.',
          'The falling mass must be the only propulsion energy. Pencil-only triggering keeps starts fair. and repeatable.',
        ],
        [
          'Describe a strategy for the second run after a good first run.',
          'Try a narrower Can Bonus gap or a small calibration improvement, since the good first run is already banked.',
          'Only the better run counts, so a modest risk in the second run can improve the score without losing the first.',
        ],
        [
          'Why test on a floor similar to the tournament’s?',
          'Floor surfaces change traction, rolling resistance, and skid, shifting stopping distances.',
          'Calibration on a similar floor reduces surprises and the size of the setup adjustment needed.',
        ],
      ],
      flow: [
        ['Impound', 'Vehicle in, mass detached.'],
        ['Set', 'Use the table for the announced target.'],
        ['Run', 'Pencil trigger; best run counts.'],
      ],
      compare: [
        ['Safe second run', 'Protects a fallback', 'Little gain.'],
        ['Bonus second run', 'Can drop score sharply', 'Risk of missing cans.'],
        ['Untested change', 'Possible gain', 'Unpredictable.'],
      ],
      challenge: 'Build a calibration table and use it for three sample targets.',
      takeaway:
        'Calibrate across the full range, follow procedures exactly, and use the second run deliberately.',
      evidence: {
        observations: [
          ['Run 1', 'Straight run: 4.2 cm from target, 6.1 s, no cans.'],
          ['Run 1 score', '100 + 8.4 + 6.1 = 114.5.'],
          ['Option for Run 2', '60 cm can gap; bonus runs average 9 cm error, 6.5 s.'],
        ],
        question: 'Should the team try the Can Bonus on Run 2?',
        options: [
          'Yes; the expected score is lower and Run 1 is banked',
          'No; the bonus never helps',
          'No; Run 2 replaces Run 1',
        ],
        correct: 0,
        explanation:
          'A bonus run would score about 100 + 18 + 6.5 − 25 = 99.5, better than 114.5. Since only the better run counts, Run 1 remains as the fallback.',
      },
    },
  ],
});
