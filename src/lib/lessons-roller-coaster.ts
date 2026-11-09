import { buildEventCourse } from './build-course-kit.ts';

// Roller Coaster B (2027): gravity-powered ball run with a loop and elevators, timed to a target. High score wins.
export const rollerCoasterLessons = buildEventCourse({
  eventId: 'roller-coaster',
  eventName: 'Roller Coaster',
  prefix: 'rc',
  division: 'B',
  intro:
    'Seven units build a compact roller coaster that carries a ball from Start Line to Finish Line as close as possible to a Target Time, while earning points for a loop, two kinds of elevators, and small size. You will learn the score, energy and friction, loop physics, elevator machines, timing control, construction, and how to run on competition day.',
  references: [
    { title: 'Science Olympiad: Roller Coaster B', url: 'https://www.soinc.org/roller-coaster-b' },
    {
      title: 'OpenStax College Physics: Conservation of Energy',
      url: 'https://openstax.org/books/college-physics-2e/pages/7-6-conservation-of-energy',
    },
  ],
  units: [
    {
      title: 'Rules and the four-part score',
      objectives: [
        'List the device limits and the rules on energy.',
        'Calculate a run score from size, time, elevators, and loop.',
        'Decide which points are worth the most effort.',
      ],
      sections: [
        [
          'The device',
          'The roller coaster is a track that carries a ball at least 1 cm in diameter from one clearly labeled Start Line to one Finish Line. At all times the device must fit within 30.0 cm wide, 80.0 cm long, and 60.0 cm high, not counting the ball. The ball must stay visible, and a mechanism must stop it safely after it crosses the Finish Line.',
        ],
        [
          'Energy rules',
          'The ball must travel using only its own gravitational potential energy from the ready-to-run position, except for the simple machines in the elevators. Springs, rubber bands, and other stored energy are banned. Magnets, electrical parts, and electronic devices may not be used anywhere. A team member releases the ball by pulling an unsharpened #2 pencil from the track on “Go.”',
        ],
        [
          'The four scores',
          'Run Score = Size Score + Time Score + Elevator Score + Loop Score, and the highest score wins. Size Score rewards a small device. Time Score rewards running close to the Target Time. Elevator Score gives 50 points for each of two elevator types. Loop Score gives 3 points for each whole centimeter of loop height.',
        ],
        [
          'Size Score',
          'Size Score = (60 − height) + (30 − width) + (80 − length), measured in 0.1 cm increments after each scorable run. A device measuring 50 × 25 × 70 cm (height × width × length) earns 10 + 5 + 10 = 25 points. Each centimeter saved earns one point, while each centimeter of loop earns three, so a tall loop is usually worth some extra height.',
        ],
        [
          'Time Score',
          'Teams earn 5 points for every full second of run time up to the Target Time, and lose 5 points for every full second past it, up to twice the Target Time. The Target Time is between 30 and 60 seconds. A ball that does not cross the Finish Line earns a Time Score of zero, though elevator and loop points can still count.',
        ],
        [
          'Tiers and ties',
          'Tier 1 runs have no violations; runs with construction or competition violations drop to Tier 2. Ties are broken by the highest Loop Score, then the highest Size Score, then the highest Time Score, and finally the longest time the ball ran before leaving the device or stopping. Because Loop Score breaks ties first, a reliable tall loop is valuable twice.',
        ],
      ],
      terms: [
        ['Run Score', 'Size + Time + Elevator + Loop.'],
        ['Size Score', '(60 − H) + (30 − W) + (80 − L).'],
        [
          'Time Score',
          '5 points per full second up to the Target Time, minus 5 per second past it.',
        ],
        ['Elevator Score', '50 points for each elevator type used successfully.'],
        ['Loop Score', '3 points per whole cm of loop height.'],
        ['Ready-to-run position', 'Ball held behind the Start Line by a pencil.'],
      ],
      example: [
        'Target Time 45 s. A 52 × 26 × 72 cm device runs 44.6 s with both elevators and an 18.4 cm loop. Find the Run Score.',
        [
          'Size: (60 − 52) + (30 − 26) + (80 − 72) = 8 + 4 + 8 = 20.',
          'Time: 44 full seconds × 5 = 220. Elevators: 2 × 50 = 100.',
          'Loop: 18 whole cm × 3 = 54. Total = 20 + 220 + 100 + 54 = 394.',
        ],
        'Run Score = 394 points.',
      ],
      mcq: [
        [
          'Which energy source is allowed to move the ball besides its own gravity?',
          'Simple machines in the elevators',
          ['A wound spring', 'A rubber band', 'A small battery motor'],
          'The ball uses only its own gravitational potential energy, except for the simple machines required for elevators. Springs, rubber bands, and electricity are banned.',
        ],
        [
          'What is the Size Score of a 60.0 × 30.0 × 80.0 cm device?',
          '0',
          ['170', '90', '−170'],
          'Each term subtracts the dimension from its limit. At the maximum size every term is zero, so the Size Score is zero.',
        ],
        [
          'What is the first tiebreaker?',
          'Highest Loop Score',
          ['Highest Size Score', 'Longest run time', 'Fewest elevators'],
          'Ties are broken first by Loop Score, then Size Score, then Time Score, then the longest time the ball ran.',
        ],
      ],
      written: [
        [
          'Why is a tall loop usually worth extra device height?',
          'Each cm of loop height earns 3 points, while each cm of extra height costs only 1 Size point.',
          'The loop gains three times what the height costs, and Loop Score is also the first tiebreaker.',
        ],
        [
          'What happens to scoring if the ball stops before the Finish Line?',
          'The Time Score is zero, but successful elevators and the loop before timing stopped still earn points.',
          'Only elevator and loop actions completed before timing stops count. The run time can still break a final tie.',
        ],
        [
          'Calculate the maximum Time Score for a Target Time of 40 s.',
          '40 × 5 = 200 points.',
          'Each full second up to the Target Time earns 5 points, so finishing at exactly 40 s gives 200 points.',
        ],
        [
          'Why are magnets and electronics excluded?',
          'The rules prohibit magnets, electrical, and electronic devices anywhere in the roller coaster.',
          'The event tests gravity and simple machines. Magnetic or electric help would add outside energy or control.',
        ],
      ],
      flow: [
        ['Start', 'Pencil pulled, ball released.'],
        ['Run', 'Elevators, loop, and timing sections.'],
        ['Finish', 'Ball crosses the Finish Line and is stopped.'],
      ],
      compare: [
        ['Small device', 'Up to 170 Size points', 'Less room for track.'],
        ['Tall loop', '3 points per cm', 'Needs height to start.'],
        ['Both elevators', '100 points', 'More mechanisms to fail.'],
      ],
      challenge: 'Estimate the score of a design and find its biggest point source.',
      takeaway: 'Time, elevators, and loop carry most points; size adds a steady bonus.',
      evidence: {
        observations: [
          ['Design A', '15 cm loop, no elevators, size 30, time 215.'],
          ['Design B', '20 cm loop, two elevators, size 15, time 210.'],
          ['Target Time', '45 s for both.'],
        ],
        question: 'Which design scores higher?',
        options: ['Design B', 'Design A', 'They tie'],
        correct: 0,
        explanation:
          'Design A: 30 + 215 + 0 + 45 = 290. Design B: 15 + 210 + 100 + 60 = 385. Elevators and a taller loop outweigh the size difference.',
      },
    },
    {
      title: 'Energy, friction, and the rolling ball',
      objectives: [
        'Apply energy conservation to a rolling ball.',
        'Explain why rolling balls are slower than sliding objects.',
        'Account for friction losses along the track.',
      ],
      sections: [
        [
          'Potential to kinetic',
          'At the start, the ball has gravitational potential energy mgh relative to any lower point. As it rolls down, that energy becomes kinetic energy. Without losses, the ball’s total energy stays constant, so its speed at any point depends only on how far it has dropped from the start. That is why the starting height limits everything the ball can do.',
        ],
        [
          'Rolling energy',
          'A rolling ball has two kinds of kinetic energy: moving forward and spinning. For a solid sphere, total kinetic energy is (7/10)mv², not ½mv². So a rolling ball dropping height h reaches v = √(10gh/7), slower than a sliding object. A hollow ball spins with more of its energy and is slower still.',
        ],
        [
          'Friction and losses',
          'Real tracks lose energy to rolling resistance, air drag, bumps at joints, and sliding in curves. Each loss lowers the ball’s energy, so it can never climb back to its starting height. Smooth joints, rigid track, and gentle curves reduce losses. Small losses add up over a long track, so measure speed at key points. using video or two timing marks.',
        ],
        [
          'Height budget',
          'The device is at most 60.0 cm high, and every bit of height is energy. The track must provide energy for the loop, carry the ball through timing sections, and still reach the Finish Line. Elevators can lift the ball and give it more height to spend later. Plan where each centimeter of height is used.',
        ],
        [
          'Slopes and speed',
          'On an incline of angle θ, a rolling solid sphere accelerates at (5/7)g sin θ, minus friction effects. On a very gentle slope, friction nearly balances gravity and the ball rolls slowly at a near-steady speed. This is how long, slow track sections are made. Too gentle, and the ball may stop and end timing.',
        ],
        [
          'Choosing a ball',
          'Ball choice changes speed and losses. A heavy steel ball rolls consistently and is less affected by small bumps, while a light plastic ball is slowed more by friction and air. A steel ball is fine, but no magnets may be used anywhere in the device to guide or slow it, even hidden inside the track. Test several balls and keep the most consistent one.',
        ],
      ],
      terms: [
        ['Gravitational potential energy', 'mgh, stored by height.'],
        ['Rolling kinetic energy', '(7/10)mv² for a solid sphere.'],
        ['Rolling resistance', 'Energy loss from deformation as the ball rolls.'],
        ['Height budget', 'Plan for how starting height is spent.'],
        ['Incline acceleration', '(5/7)g sin θ for a rolling solid sphere.'],
        ['Energy loss', 'Energy converted to heat or sound by friction and impacts.'],
      ],
      example: [
        'A solid ball drops 0.40 m from rest without losses. Find its speed.',
        [
          'Energy: mgh = (7/10)mv².',
          'v = √(10gh ÷ 7) = √(10 × 9.8 × 0.40 ÷ 7) = √5.6.',
          'v ≈ 2.37 m/s.',
        ],
        'About 2.4 m/s; a sliding object would reach about 2.8 m/s.',
      ],
      mcq: [
        [
          'Why does a rolling ball reach a lower speed than a sliding block after the same drop?',
          'Some energy goes into spinning',
          ['It is heavier', 'Gravity is weaker on spheres', 'It has less potential energy'],
          'A rolling ball shares its kinetic energy between forward motion and rotation, so its forward speed is lower.',
        ],
        [
          'What happens if a timing section’s slope is too gentle?',
          'The ball may stop, ending timing',
          ['The ball speeds up', 'Nothing changes', 'The loop height increases'],
          'If friction outweighs the gravity component, the ball stops. Timing ends if it does not resume within 3 seconds.',
        ],
        [
          'Which change reduces energy losses?',
          'Smoothing joints between track pieces',
          ['Adding more bumps', 'Using a softer track', 'Making curves tighter'],
          'Bumps and soft surfaces absorb energy. Smooth joints and rigid track let the ball keep more energy.',
        ],
      ],
      written: [
        [
          'Why can the ball never return to its starting height without an elevator?',
          'Friction and other losses remove energy, so the ball always has less energy than it started with.',
          'Energy is conserved, but some becomes heat and sound. Only an elevator can add height back.',
        ],
        [
          'Calculate the acceleration of a solid ball on a 5° incline, ignoring friction.',
          'a = (5/7) × 9.8 × sin 5° ≈ 0.61 m/s².',
          'Rolling reduces the acceleration to 5/7 of the sliding value. Small angles give slow, controllable speeds.',
        ],
        [
          'Why plan a height budget?',
          'Height is the ball’s only energy; the loop, timing sections, and finish all need some of it.',
          'Without a plan, the ball may lack energy for the loop or stop before the Finish Line.',
        ],
        [
          'Why might a steel ball be more consistent than a plastic one?',
          'Its greater mass makes it less affected by small bumps, friction, and air resistance.',
          'Heavier balls keep momentum through small disturbances, giving more repeatable run times. from run to run.',
        ],
      ],
      flow: [
        ['Height', 'Start position stores energy.'],
        ['Motion', 'Energy shared between rolling and spinning.'],
        ['Losses', 'Friction removes energy along the way.'],
      ],
      compare: [
        ['Steel ball', 'Consistent, keeps momentum', 'Faster on slopes.'],
        ['Plastic ball', 'Slower', 'More sensitive to bumps.'],
        ['Gentle slope', 'Long, slow travel', 'Risk of stopping.'],
      ],
      challenge: 'Find the speed of the ball at three points on your track.',
      takeaway:
        'Starting height is the energy budget; rolling and friction decide how it is spent.',
      evidence: {
        observations: [
          ['Predicted speed', '2.4 m/s at the bottom of a 0.40 m drop.'],
          ['Measured speed', '2.0 m/s.'],
          ['Track', 'Three joints along the drop.'],
        ],
        question: 'What best explains the difference?',
        options: [
          'Energy losses from friction and the joints',
          'Gravity was weaker',
          'The ball gained mass',
        ],
        correct: 0,
        explanation:
          'The prediction ignored losses. Friction, rolling resistance, and bumps at joints removed energy, so the measured speed was lower.',
      },
    },
    {
      title: 'Loops: physics and scoring',
      objectives: [
        'Find the minimum speed at the top of a loop.',
        'Calculate the release height a loop needs.',
        'Build a loop that meets every scoring rule.',
      ],
      sections: [
        [
          'What counts as a loop',
          'A loop is a continuously concave section of track that appears to cross itself at a Point of Intersection (POI). The two track sections must touch at the POI, with a clearly labeled point for measuring. Loop height is the vertical distance from the POI to the highest inside point of the loop, and it must be clearly labeled to count.',
        ],
        [
          'Loop rules',
          'The ball must stay in contact with the track through the loop. At the top, it must be completely unsupported from below, meaning it rides on the inside of the track held only by its speed. The track must not be fully enclosed anywhere in the loop, so the ball could easily be removed. Only one loop may score.',
        ],
        [
          'The speed needed at the top',
          'At the top of the loop, gravity and the track’s push together provide the centripetal force. The ball stays in contact only if v² ≥ g r, where r is the radius of the ball’s circular path. Slower than that, it falls away from the track. A loop with a 10 cm radius needs at least √(9.8 × 0.10) ≈ 1.0 m/s at the top.',
        ],
        [
          'Release height',
          'Energy conservation for a rolling solid sphere gives the minimum starting height: h ≥ 2.7 r above the loop’s bottom, ignoring friction. The ball needs 2r of height to reach the top, plus energy for the minimum speed and spin. Because real tracks lose energy, add a margin; many builders start 10 to 30 percent higher than the ideal.',
        ],
        [
          'Scoring and trade-offs',
          'Loop Score is 3 points per whole centimeter of height. A 20 cm loop earns 60 points. Taller loops need more starting height, which uses the height budget and can increase device height. Because a loop earns three points per centimeter while extra height costs one Size point, building the tallest reliable loop is usually worth it.',
        ],
        [
          'Building a reliable loop',
          'Use a smooth, flexible track material bent into a round shape, with side rails that guide the ball without enclosing it. Make the entry and exit gradual so the ball does not jump. Test the loop many times at your chosen starting height; a loop that works nine times in ten is risky when only two scorable runs are allowed.',
        ],
      ],
      terms: [
        ['Point of Intersection (POI)', 'Where the loop appears to cross itself.'],
        ['Loop height', 'Vertical distance from POI to highest inside point.'],
        ['Centripetal force', 'Net inward force for circular motion.'],
        ['Minimum top speed', 'v = √(g r) at the top of a loop.'],
        ['Release height rule', 'h ≥ 2.7 r for a rolling solid sphere, no friction.'],
        ['Unsupported top', 'Ball held only by speed against the track at the top.'],
      ],
      example: [
        'A loop has a 9.0 cm path radius. What is the ideal minimum release height above the loop bottom, and a practical target?',
        [
          'Ideal: h = 2.7 × 9.0 = 24.3 cm.',
          'Add a 20 percent margin for friction: 24.3 × 1.2 ≈ 29 cm.',
          'Test from 29 cm and adjust until the loop works every run.',
        ],
        'Start about 29 cm above the loop bottom and refine by testing.',
      ],
      mcq: [
        [
          'What is the minimum speed at the top of a loop with a 0.16 m path radius?',
          'About 1.25 m/s',
          ['About 0.16 m/s', 'About 1.57 m/s', 'About 3.9 m/s'],
          'Minimum speed is √(g r) = √(9.8 × 0.16) ≈ 1.25 m/s. Slower than that, the ball falls away from the track.',
        ],
        [
          'Why is the ideal release height 2.7 r rather than 2.5 r for a rolling ball?',
          'Some energy must go into the ball’s spin',
          ['Gravity is stronger in loops', 'The loop is enclosed', 'Friction is zero'],
          'A sliding object needs 2.5 r. A rolling solid sphere also stores rotational energy, raising the requirement to 2.7 r.',
        ],
        [
          'Which loop design earns no Loop Score?',
          'A fully enclosed tube loop',
          ['An open loop with side rails', 'A loop with a labeled POI', 'A loop 12 cm tall'],
          'The track must not be fully enclosed anywhere in the loop, so the ball can be removed. An enclosed tube does not qualify.',
        ],
      ],
      written: [
        [
          'Explain why the ball must have a minimum speed at the top.',
          'Gravity alone pulls it down with g; it must move fast enough that its path needs at least that much centripetal acceleration.',
          'If v²/r is less than g, gravity pulls the ball off its circular path, and it falls from the track.',
        ],
        [
          'Why add a margin above the ideal release height?',
          'Friction, bumps, and imperfect shapes remove energy, so the ideal height would leave the ball too slow.',
          'The 2.7 r rule ignores losses. A margin ensures the ball still clears the top on every run.',
        ],
        [
          'What labels must a loop have?',
          'A clearly labeled point at the POI and a labeled measurement from the POI to the highest inside point.',
          'Without the labels, the loop does not count for points. The supervisor measures from the labeled POI.',
        ],
        [
          'Why are gradual loop entries and exits important?',
          'Sudden changes in curvature can make the ball bounce or jump the track.',
          'Smooth transitions keep contact and reduce losses, improving reliability. A ball that jumps the track at the entry cannot finish the loop.',
        ],
      ],
      flow: [
        ['Entry', 'Ball enters with enough speed.'],
        ['Top', 'Unsupported, held by speed.'],
        ['Exit', 'Ball returns to the POI and continues.'],
      ],
      compare: [
        ['Tall loop', 'More points', 'Needs more starting height.'],
        ['Open loop with rails', 'Legal and visible', 'Ball can fall if slow.'],
        ['Enclosed tube', 'Never falls', 'Not legal for scoring.'],
      ],
      challenge: 'Design a loop and find the starting height it needs.',
      takeaway: 'Loop height costs starting height; plan with 2.7 r plus a margin.',
      evidence: {
        observations: [
          ['Release 24 cm', 'Ball fell from top of loop in 6 of 10 trials.'],
          ['Release 28 cm', 'Ball completed loop 10 of 10.'],
          ['Loop path radius', '9 cm.'],
        ],
        question: 'Why did 24 cm fail?',
        options: [
          'It was below the ideal 24.3 cm and friction lowered speed further',
          'Too much speed',
          'The loop was enclosed',
        ],
        correct: 0,
        explanation:
          'The ideal minimum is 2.7 × 9 = 24.3 cm. At 24 cm, even before friction, the ball lacked speed at the top. 28 cm provided the needed margin.',
      },
    },
    {
      title: 'Elevators: levers, wheels, and pulleys',
      objectives: [
        'Explain IMA less than 1 and why elevators use it.',
        'Design a Type 1 and a Type 2 elevator.',
        'Use counterweights safely and reliably.',
      ],
      sections: [
        [
          'Two elevator types',
          'Up to two distinct elevator types can each earn 50 points once. Type 1 combines a first-class lever with a wheel and axle, with an IMA less than 1, and raises the ball at least 10 cm vertically. Type 2 combines a second-class lever with a pulley, also with IMA less than 1, raising the ball at least 10 cm. They may appear in any order.',
        ],
        [
          'What IMA less than 1 means',
          'Ideal mechanical advantage is effort distance divided by load distance. An IMA less than 1 means the load moves farther than the effort. The elevator trades force for distance: a heavy counterweight moving a short distance lifts the light ball a longer distance. For combined machines, the overall IMA is the product of the individual IMAs.',
        ],
        [
          'Type 1: lever and wheel',
          'A first-class lever with a short effort arm and long load arm has IMA below 1. A wheel and axle with the effort on the axle and the load at the wheel rim also has IMA below 1, equal to the axle radius divided by the wheel radius. Combining them, for example a lever turning an axle that winds a ball cup up on a large wheel, multiplies the travel.',
        ],
        [
          'Type 2: lever and pulley',
          'A second-class lever alone has IMA above 1, because the load sits between the fulcrum and the effort. To make the combination less than 1, pair it with a pulley arrangement that multiplies distance, such as pulling on the axle of a movable pulley so the rope end, carrying the ball, moves twice as far. For example, 1.5 × 0.5 = 0.75.',
        ],
        [
          'Counterweights and triggers',
          'Counterweights are allowed. Often the ball rolls onto a platform or trips a latch, releasing a counterweight that drives the elevator. With IMA 0.5, the effort force must be at least twice the ball’s weight plus friction. Gates or barriers may be activated as part of an elevator action, and track can be reused after the ball is lifted.',
        ],
        [
          'Making elevators count',
          'Points are awarded only if the ball reaches the track at the top of the elevator, meets all the requirements, and continues on the track. Label each elevator clearly. Elevators also add time, which helps reach longer Target Times. Test each elevator many times, because a stalled elevator can stop timing and lose the Time Score.',
        ],
      ],
      terms: [
        ['Elevator', 'Mechanism lifting the ball to a higher level.'],
        ['IMA < 1', 'Load moves farther than the effort.'],
        ['Type 1 elevator', 'First-class lever + wheel and axle, IMA < 1.'],
        ['Type 2 elevator', 'Second-class lever + pulley, IMA < 1.'],
        ['Counterweight', 'Mass whose fall drives an elevator.'],
        ['Combined IMA', 'Product of the IMAs of machines in series.'],
      ],
      example: [
        'A second-class lever has IMA 1.6. It drives a movable pulley inverted to give IMA 0.5. Is the combination legal, and how far does the ball rise if the effort moves 8 cm?',
        [
          'Combined IMA = 1.6 × 0.5 = 0.8, which is less than 1.',
          'Load distance = effort distance ÷ IMA = 8 ÷ 0.8 = 10 cm.',
          'The ball rises exactly 10 cm, the minimum; add a small margin.',
        ],
        'Legal with IMA 0.8; raise the effort travel slightly so the ball rises more than 10 cm.',
      ],
      mcq: [
        [
          'An elevator has IMA 0.5. If the counterweight drops 6 cm, how far can the ball rise?',
          '12 cm',
          ['3 cm', '6 cm', '0.5 cm'],
          'Load distance = effort distance ÷ IMA = 6 ÷ 0.5 = 12 cm, which meets the 10 cm requirement.',
        ],
        [
          'Why does a second-class lever need help to make IMA less than 1?',
          'On its own, its IMA is greater than 1',
          ['It cannot move', 'It is not a lever', 'Its IMA is always 1'],
          'With the load between fulcrum and effort, the effort arm is longer, so the IMA is above 1. A distance-multiplying pulley lowers the product below 1.',
        ],
        [
          'When does an elevator earn its 50 points?',
          'When the ball reaches the top track and continues on',
          ['When the counterweight moves', 'When it is labeled', 'When it lifts the ball 5 cm'],
          'The ball must reach the track at the top, meet all requirements including at least 10 cm of lift, and continue traveling.',
        ],
      ],
      written: [
        [
          'Explain why elevators use IMA less than 1.',
          'The counterweight moves a short distance with a large force to lift the light ball a longer distance.',
          'IMA below 1 trades force for distance, which suits lifting a light ball through a large height.',
        ],
        [
          'What is the IMA of a wheel and axle with the effort on a 1 cm axle and the load at a 5 cm wheel?',
          '1 ÷ 5 = 0.2.',
          'IMA equals effort radius divided by load radius. With the effort on the axle, the rim moves five times as far.',
        ],
        [
          'Why must elevators be tested many times?',
          'A stalled elevator stops timing, can lose the Time Score, and earns no elevator points.',
          'Elevators are moving mechanisms with triggers and counterweights. Reliability protects 50 points and the Time Score.',
        ],
        [
          'How can elevators help with a long Target Time?',
          'Lifting the ball takes time and gives it new height to spend on slow track sections.',
          'An elevator adds both delay and energy, extending the run without a taller start. or a larger device.',
        ],
      ],
      flow: [
        ['Trigger', 'Ball releases a counterweight.'],
        ['Lift', 'Machine raises the ball 10+ cm.'],
        ['Continue', 'Ball rolls on from the top track.'],
      ],
      compare: [
        ['Type 1', 'Lever + wheel and axle', 'Needs a large wheel.'],
        ['Type 2', 'Lever + pulley', 'Lever IMA must be offset.'],
        ['Counterweight drive', 'Strong, simple', 'Must be reset each run.'],
      ],
      challenge: 'Design both elevator types and calculate their IMA.',
      takeaway: 'Elevators trade force for distance; prove IMA < 1 and lift at least 10 cm.',
      evidence: {
        observations: [
          ['Elevator test', 'Counterweight drops 5 cm; ball rises 9 cm.'],
          ['Requirement', 'Ball must rise at least 10 cm.'],
          ['Team claim', 'Elevator earns 50 points.'],
        ],
        question: 'Does the elevator earn points?',
        options: [
          'No; the ball rises less than 10 cm',
          'Yes; IMA is below 1',
          'Yes; the counterweight moved',
        ],
        correct: 0,
        explanation:
          'Its IMA is 5 ÷ 9 ≈ 0.56, which is less than 1, but the ball rises only 9 cm. The 10 cm minimum is not met, so no points are awarded.',
      },
    },
    {
      title: 'Hitting the Target Time',
      objectives: [
        'Design slow, adjustable track sections.',
        'Calibrate the run time for any Target Time.',
        'Avoid stops and overtime penalties.',
      ],
      sections: [
        [
          'Target Time rules',
          'The Target Time is between 30 and 60 seconds, in steps of 5 s at Regionals, 2 s at State, and 1 s at Nationals. It is revealed just before setup, and teams then have 8 minutes to set up and run. A good design can be adjusted quickly to any time in the range, rather than tuned for one value.',
        ],
        [
          'Where time comes from',
          'Most of the run time is spent on long, gently sloped sections, switchbacks, spirals, and elevators. A ball rolling 1 to 2 m of nearly level track can take many seconds. Funnels where the ball circles before dropping through add time in a small space. Each section should behave the same way every run. Test each one alone.',
        ],
        [
          'Adjusting time',
          'Teams adjust time by changing slope, adding or removing a section of track, or choosing between alternate paths. A slope adjuster, such as a screw that raises one end of a long section, gives fine control. A removable spiral or loop gives coarse control. Measure the time added by each adjustment so you know what to change. Keep those numbers in a table that travels with the device to every tournament.',
        ],
        [
          'The stopping problem',
          'Slower sections risk the ball stopping. Timing ends if the ball stops moving and does not move again within 3 seconds. A ball that stops earns no Time Score. Keep slopes just steep enough for reliable rolling, and avoid flat spots, sticky joints, and dips where the ball can settle.',
        ],
        [
          'Timing rules',
          'Timing begins on “Go” when the pencil is removed and ends when the ball fully crosses the Finish Line, when twice the Target Time passes, when the ball leaves the device, or when it stops. Three timekeepers are suggested, with the median time used. Time Score counts only full seconds, so 44.9 s counts as 44.',
        ],
        [
          'Aiming for the sweet spot',
          'Each full second up to the Target Time earns 5 points, and each full second past it loses 5. With a 45 s target, 44.9 s earns 220 because only 44 full seconds count, 45.0 to 45.99 s earns the full 225 because no full second has passed the target, and 46.0 s drops back to 220. So aim for about half a second past the Target Time.',
        ],
      ],
      terms: [
        ['Target Time', '30–60 s, revealed just before setup.'],
        ['Switchback', 'Zigzag track that lengthens the path.'],
        ['Funnel', 'Cone where the ball circles before dropping.'],
        ['Slope adjuster', 'Device to fine-tune a track section’s tilt.'],
        ['Median time', 'Middle value of three timers.'],
        ['Full second', 'Whole seconds counted for Time Score.'],
      ],
      example: [
        'Calibration: base path 34 s; each slope-screw turn adds 0.8 s; removable spiral adds 9 s. Plan for a Target Time of 46 s.',
        [
          'Add the spiral: 34 + 9 = 43 s.',
          'Need about 3 s more: 3 ÷ 0.8 ≈ 4 screw turns, giving 46.2 s.',
          'Use 4 turns (46.2 s), inside the 46.0–46.99 s window that earns full points.',
        ],
        'Spiral plus 4 screw turns gives about 46.2 s.',
      ],
      mcq: [
        [
          'Target Time 40 s. The ball crosses at 43.2 s. What is the Time Score?',
          '185',
          ['200', '215', '0'],
          'Bonus: 40 × 5 = 200. Penalty: 3 full seconds past × 5 = 15. Time Score = 185.',
        ],
        [
          'The ball stops on a flat section for 4 s, then rolls on. What happens?',
          'Timing ended when it stopped; no Time Score',
          ['Timing continues', 'A 5-point penalty', 'The run is repeated'],
          'Timing stops if the ball does not resume moving within 3 seconds. If it has not crossed the Finish Line, the Time Score is zero.',
        ],
        [
          'With a 45 s Target Time, which run time earns the most Time Score?',
          '45.5 s',
          ['44.9 s', '46.2 s', '43.0 s'],
          'Only full seconds count. 45.5 s earns 225 because no full second is past the target; 44.9 s and 46.2 s each earn 220, and 43.0 s earns 215.',
        ],
      ],
      written: [
        [
          'Describe one fine and one coarse time adjustment.',
          'Fine: a screw that changes the slope of a long section. Coarse: adding or removing a spiral or switchback.',
          'Coarse changes get close to the target; fine changes adjust within a second or two.',
        ],
        [
          'Why calibrate each adjustment before competition?',
          'Knowing how much time each change adds lets the team hit a new Target Time quickly in 8 minutes.',
          'The Target Time is revealed just before setup. A calibration table turns it into a quick decision.',
        ],
        [
          'What causes balls to stop on slow sections?',
          'Slopes too gentle for the friction, flat spots, sticky joints, or dips where the ball settles.',
          'Friction can exceed the gravity component. Smooth, consistent slopes prevent stops. on long, slow sections of the track.',
        ],
        [
          'Why is the median of three timers used?',
          'It reduces the effect of one timer’s error, giving a more reliable run time.',
          'The median ignores the most extreme reading, so a single slow or fast press does not change the score.',
        ],
      ],
      flow: [
        ['Reveal', 'Target Time announced.'],
        ['Adjust', 'Coarse then fine changes.'],
        ['Run', 'Ball finishes just past the target.'],
      ],
      compare: [
        ['Long slope', 'Smooth control', 'Takes length.'],
        ['Funnel', 'Lots of time in small space', 'Can be inconsistent.'],
        ['Slope screw', 'Fine adjustment', 'Small range.'],
      ],
      challenge: 'Build a calibration table for Target Times from 30 to 60 s.',
      takeaway: 'Calibrate coarse and fine adjustments so any Target Time is a quick change.',
      evidence: {
        observations: [
          ['Runs at setting A', '41.8, 42.1, 41.9 s.'],
          ['Runs at setting B', '44.6, 45.4, 44.8 s.'],
          ['Target Time', '45 s.'],
        ],
        question: 'Which setting should the team use?',
        options: [
          'Setting B with a small increase',
          'Setting A',
          'Setting B with a small decrease',
        ],
        correct: 0,
        explanation:
          'Runs from 45.0 to 45.99 s earn the full 225. Setting B averages about 44.9 s, so a small increase centers runs near 45.5 s. Setting A earns only 205–210.',
      },
    },
    {
      title: 'Size and construction',
      objectives: [
        'Balance Size Score against loop and timing needs.',
        'Build a sturdy, compact, adjustable device.',
        'Meet start, finish, and safety stop rules.',
      ],
      sections: [
        [
          'Size trade-offs',
          'Size Score rewards a small device: one point per centimeter under each limit. But the track needs length for timing and height for the loop. A device 45 cm high, 20 cm wide, and 60 cm long earns 15 + 10 + 20 = 45 Size points. Shrinking further usually means less time or a smaller loop, so balance the points.',
        ],
        [
          'Using volume well',
          'Compact designs stack track in layers, use spirals, and fold switchbacks back and forth inside the footprint. Elevators let the ball climb back up and reuse the same space. Width is often the cheapest dimension to save, since narrow towers can hold long, folded track. Measure the device at its widest, longest, and highest points, including any moving parts.',
        ],
        [
          'Start and Finish',
          'There must be exactly one clearly labeled Start Line and one Finish Line, perpendicular to the ball’s direction. Their positions may not change after impound. The ball sits completely behind the Start Line, held by an unsharpened #2 pencil. After the Finish Line, a mechanism must safely stop the ball, such as a cup or a padded end.',
        ],
        [
          'Materials',
          'Common tracks include foam pipe insulation cut in half, flexible plastic channel, wire rails, or bent wooden strips. Frames use wood, foam board, or plastic. Rigid frames keep slopes from changing between runs. Avoid magnets and electrical parts entirely. Choose materials that are easy to adjust but stay where they are set.',
        ],
        [
          'Stability and transport',
          'The device must survive transport and impound without its slopes changing. Use screws or bolts for adjustable parts, and glue for fixed ones. Leveling feet help on uneven tables. Teams may level and adjust the device before each run, but should check calibration after moving it, since a few millimeters of tilt change times. Bring a small bubble level to check the base quickly.',
        ],
        [
          'Visibility and labels',
          'The ball must remain visible at all times, so any tunnels or covered track must be clear. Label the Start Line, Finish Line, both elevators, the loop POI, and loop height measurement. Clear labels let the supervisor score quickly and avoid missed points. Keep a diagram showing each section for questions about design and operation.',
        ],
      ],
      terms: [
        ['Footprint', 'Area the device occupies on the table.'],
        ['Layered track', 'Track stacked at different heights.'],
        ['Start Line', 'Labeled line the ball starts behind.'],
        ['Finish Line', 'Labeled line ending timing when crossed.'],
        ['Safety stop', 'Mechanism stopping the ball after finishing.'],
        ['Leveling feet', 'Adjustable supports for a level base.'],
      ],
      example: [
        'Option 1: 55 × 25 × 75 cm with a 22 cm loop. Option 2: 45 × 20 × 65 cm with a 15 cm loop. Compare Size + Loop points.',
        [
          'Option 1: Size 5 + 5 + 5 = 15; Loop 22 × 3 = 66; total 81.',
          'Option 2: Size 15 + 10 + 15 = 40; Loop 15 × 3 = 45; total 85.',
          'Option 2 scores 4 more, if both hit the Target Time equally.',
        ],
        'Option 2 edges ahead; both are close, so reliability decides.',
      ],
      mcq: [
        [
          'A device measures 50.0 × 22.0 × 70.0 cm. What is its Size Score?',
          '28',
          ['142', '18', '38'],
          'Size = (60 − 50) + (30 − 22) + (80 − 70) = 10 + 8 + 10 = 28.',
        ],
        [
          'Which change after impound is NOT allowed?',
          'Moving the Finish Line',
          ['Leveling the device', 'Swapping the ball', 'Adjusting a slope'],
          'Teams may adjust track, level, and swap balls, but the Start and Finish Line positions may not change after impound.',
        ],
        [
          'Why must covered sections be clear?',
          'The ball must remain visible at all times',
          ['To reduce friction', 'To add Size points', 'To speed the ball'],
          'The rules require the ball to stay visible, so any enclosed track must be transparent.',
        ],
      ],
      written: [
        [
          'Why is width often the cheapest dimension to reduce?',
          'Tracks can be folded into a narrow tower, keeping length and height for timing and the loop.',
          'A narrow, tall layout preserves track length while earning Size points from width. without shortening the run.',
        ],
        [
          'What should a safety stop do?',
          'Catch and hold the ball after it crosses the Finish Line, without it bouncing out.',
          'The rules require safely stopping the ball. A cup or padded catch also prevents losing the ball.',
        ],
        [
          'Why recheck calibration after transport?',
          'Small shifts in tilt or slope change run times, so the device may no longer hit its calibrated times.',
          'A few millimeters of tilt can change a slow section by seconds. Practice runs during setup confirm timing.',
        ],
        [
          'Why label every scoring feature?',
          'Unlabeled elevators and loops may not be scored; labels make measuring and scoring clear.',
          'The loop must have labeled POI and height, and elevators must be labeled to earn points.',
        ],
      ],
      flow: [
        ['Plan', 'Fit track, loop, and elevators in a small box.'],
        ['Build', 'Rigid, adjustable, labeled.'],
        ['Check', 'Measure size and test the stop.'],
      ],
      compare: [
        ['Narrow tower', 'Width points', 'Can tip; needs a base.'],
        ['Short device', 'Length points', 'Less track for time.'],
        ['Tall device', 'Taller loop', 'Fewer height points.'],
      ],
      challenge: 'Sketch a design and calculate its Size and Loop points.',
      takeaway: 'Compact, rigid, labeled builds turn space into points.',
      evidence: {
        observations: [
          ['Home runs', 'Consistent 44.7 s.'],
          ['After car ride', 'Runs 42.1 s; base slightly twisted.'],
          ['After leveling', 'Runs 44.6 s.'],
        ],
        question: 'What explains the faster runs after the car ride?',
        options: [
          'The twisted base changed the track slopes',
          'The ball became heavier',
          'The Target Time changed',
        ],
        correct: 0,
        explanation:
          'Twisting the base steepened some slopes, speeding the ball. Leveling restored the original slopes and times.',
      },
    },
    {
      title: 'Testing and competition day',
      objectives: [
        'Run controlled tests and record results.',
        'Use the 8-minute period efficiently.',
        'Follow run procedures to avoid violations.',
      ],
      sections: [
        [
          'Testing plan',
          'Test one change at a time. For each setting, run the ball several times and record each time, whether the loop and elevators worked, and where any failures happened. Repeated tests reveal both the average and the spread. A design with a small spread is easier to tune for a Target Time. Aim to test each final setting at least ten times before the tournament.',
        ],
        [
          'Reliability first',
          'Only two scorable runs are allowed, and a failure costs many points at once: a stopped ball loses the Time Score, and a failed loop or elevator loses its points. Make each feature work every time before chasing a taller loop or smaller size. Record failure causes, then fix the weakest part. Then retest the whole run, since one fix can change the timing of later sections.',
        ],
        [
          'The 8-minute period',
          'After retrieving the device from impound, teams have 8 minutes to set up and complete up to two scorable runs. Practice runs are allowed during this time. Measurement time is not counted, and a scorable run starting before the period ends may finish. Plan: set the Target Time adjustment, do one or two practice runs, then score.',
        ],
        [
          'Running a scorable run',
          'Declare a scorable run before starting. Place the supervisor’s #2 pencil on the Start Line with the ball fully behind it. On “3, 2, 1, Go,” remove the pencil without pushing the ball. Participants may not touch the device during a scorable run. Between runs, teams may adjust track, level the device, or swap the ball.',
        ],
        [
          'Using the second run',
          'The better run counts. If the first run is close to the target, keep the settings and use the second run for safety or a small fine-tune. If the first run missed by a few seconds, adjust using your calibration table. Never make a large untested change for the final run unless the first run failed badly.',
        ],
        [
          'Questions and review',
          'Participants must be able to answer questions about the design, construction, and operation of the device. Bring a diagram and calibration table. At the end, review the scoresheet with the supervisor, including size measurements, elevator and loop results, and times, before leaving the area. Note any lessons for next time.',
        ],
      ],
      terms: [
        ['Scorable run', 'Declared run that may count for scoring.'],
        ['Practice run', 'Unscored run during the 8 minutes.'],
        ['Spread', 'Variation in times between runs.'],
        ['Calibration table', 'Record of time added by each adjustment.'],
        ['Run declaration', 'Announcing a run as scorable before it starts.'],
        ['Better run', 'The higher-scoring run of the two.'],
      ],
      example: [
        'Target 52 s. Practice run: 50.6 s. The calibration table says each screw turn adds 0.4 s. What should the team do?',
        [
          'Aim for about 52.5 s, half a second past the target: about 1.9 s more.',
          '1.9 s ÷ 0.4 s/turn ≈ 5 turns, giving about 52.6 s.',
          'Make 5 turns, then declare the scorable run.',
        ],
        'Add 5 turns for about 52.6 s.',
      ],
      mcq: [
        [
          'How many scorable runs may a team complete?',
          'Up to two',
          ['One', 'Three', 'Unlimited'],
          'Teams have 8 minutes to set up and complete up to two scorable runs, with unlimited practice runs.',
        ],
        [
          'Which action is NOT allowed during a scorable run?',
          'Touching the device',
          ['Removing the pencil on “Go”', 'Watching the ball', 'Standing near the device'],
          'Participants may not touch the device during a scorable run. They only remove the pencil to release the ball.',
        ],
        [
          'Which run counts for the final score?',
          'The better of the two runs',
          ['The first run', 'The last run', 'The average'],
          'The better scorable run counts. A strong first run lets the team use the second run for a careful improvement.',
        ],
      ],
      written: [
        [
          'Why record failure causes during testing?',
          'They reveal the weakest part of the design so it can be fixed before competition.',
          'Fixing the most common failure gives the biggest improvement in reliability. for the least building time.',
        ],
        [
          'How should the pencil be removed at the start?',
          'Pull it from the track on “Go” without exerting any force on the ball.',
          'The ball must start only with its own gravity. Pushing it adds energy and changes the time.',
        ],
        [
          'Describe a plan for the 8-minute period.',
          'Set the Target Time adjustment, do one or two practice runs, fine-tune, then complete two scorable runs.',
          'Practice runs check calibration in the room. Leaving time for two scorable runs keeps a backup.',
        ],
        [
          'Why bring a diagram and calibration table?',
          'They help answer design questions and make quick, accurate time adjustments.',
          'Participants must explain the device. A calibration table turns the Target Time into specific adjustments.',
        ],
      ],
      flow: [
        ['Set up', 'Adjust for the Target Time.'],
        ['Practice', 'Confirm timing and features.'],
        ['Score', 'Two declared runs; better one counts.'],
      ],
      compare: [
        ['Safe second run', 'Protects score', 'Little improvement.'],
        ['Tuned second run', 'Can gain points', 'Small risk.'],
        ['Untested change', 'Possible big gain', 'High risk.'],
      ],
      challenge: 'Plan your 8 minutes for a Target Time of 37 s.',
      takeaway: 'Reliable features, calibrated adjustments, and clean runs win.',
      evidence: {
        observations: [
          ['Test week 1', 'Loop failed 3 of 10 runs.'],
          ['Cause', 'Ball hit a raised joint just before the loop.'],
          ['After sanding joint', 'Loop worked 10 of 10.'],
        ],
        question: 'What does this show?',
        options: [
          'Fixing one recorded failure cause made the loop reliable',
          'Taller loops are always better',
          'The ball was too heavy',
        ],
        correct: 0,
        explanation:
          'Recording where failures happened pointed to the raised joint. Smoothing it removed the energy loss and made the loop work every time.',
      },
    },
  ],
});
