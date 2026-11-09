import { buildEventCourse } from './build-course-kit.ts';

// Ping Pong Parachute (2027). The B and C rules match, so both divisions share this content.
function pingPongParachute(division: 'B' | 'C') {
  return buildEventCourse({
    eventId: 'ping-pong-parachute',
    eventName: division === 'B' ? 'Ping-Pong Parachute' : 'Ping Pong Parachute',
    prefix: division === 'B' ? 'pppb' : 'ppp',
    division,
    intro:
      'Seven units cover an air-powered bottle rocket that lofts a ping pong ball on a parachute for the longest possible time aloft. You will learn the rules that make a rocket launchable, the physics of the climb and the descent, and how a practice log turns test flights into a justified launch pressure.',
    references: [
      {
        title: `Science Olympiad: Ping Pong Parachute`,
        url: `https://www.soinc.org/ping-pong-parachute-${division.toLowerCase()}`,
      },
      {
        title: 'NASA Glenn: Bottle Rocket Basics',
        url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/bottle-rocket/',
      },
    ],
    units: [
      {
        title: 'The event and its score: time aloft and multipliers',
        objectives: [
          'Describe how a launch is timed and scored.',
          'Apply the separation, ceiling, and log multipliers.',
          'Plan two launches in the five-minute window.',
        ],
        sections: [
          [
            'What you build',
            'Teams bring up to two bottle rockets, two unaltered standard ping pong balls, and two parachutes. A parachute taped to a ping pong ball forms the parachute payload system. The supervisor provides a launcher with a Schrader valve, an air pump, a pressure gauge, and timers. The rocket is pressurized with air only, launched indoors, and the payload is timed until it lands.',
          ],
          [
            'Timing',
            'Timing begins when the rocket leaves the launcher and stops when the parachute payload system lands. Three timers record each launch, and the middle value is the official time, recorded to hundredths of a second. The payload must separate from the rocket. If it never separates, timing runs until any part of the rocket touches the ground, and the launch takes a 0.90 multiplier.',
          ],
          [
            'Ranking',
            'The score is the greatest time aloft from a single launch, after multipliers, and high score wins. Ties are broken by the time aloft of the team’s other launch. Teams have 5 minutes to make two launches with the same rocket or two different rockets, so the second launch is both a second chance and the tiebreaker.',
          ],
          [
            'The ceiling multiplier',
            'If any part of the rocket or payload hits the ceiling, or anything attached to it such as a light or basketball hoop, during the ascent, timing stops at the instant of contact and the launch is multiplied by 0.25. A ceiling hit therefore turns a long flight into almost nothing. Tournaments must tell teams the ceiling height in advance.',
          ],
          [
            'Practice log multipliers',
            'Teams must present a practice log of at least 10 test flights with at least five parameters. A team with an incomplete log has its score multiplied by 0.85, and a team with no log by 0.70. Teams without a complete log are also limited to a safe pressure chosen by the supervisor, which keeps their rockets well below the ceiling.',
          ],
          [
            'Inspection and safety',
            'Teams arrive ready to launch, with Category B eye protection, and rockets are inspected for safety. Rockets or payloads that break the construction rules are not launched, and a team that cannot launch at all receives participation points. If the supplied launcher fails to release a rocket, that launch never happened and can be restarted.',
          ],
        ],
        terms: [
          ['Time aloft', 'Time from leaving the launcher until the payload lands.'],
          ['Parachute payload system', 'A ping pong ball with its taped-on parachute.'],
          ['Separation', 'The payload leaving the rocket during flight; required.'],
          ['Multiplier', 'A factor applied to a launch time as a penalty.'],
          ['Middle value', 'The official time: the median of three timers.'],
          ['Practice log', 'Record of at least 10 test flights with five or more parameters.'],
        ],
        example: [
          'A team with a complete log records 14.20 s on launch 1 (clean) and 19.80 s on launch 2, but launch 2 grazed a light on the way up. What is its score?',
          [
            'Launch 1: 14.20 s × 1.00 = 14.20.',
            'Launch 2: timing stopped at contact; even 19.80 s × 0.25 = 4.95.',
            'Best launch: 14.20.',
          ],
          'The clean, shorter flight wins easily: avoiding the ceiling matters more than climbing higher.',
        ],
        mcq: [
          [
            'Three timers read 12.41, 12.56, and 12.30 s. What is the official time?',
            '12.41 s',
            ['12.56 s', '12.42 s', '12.30 s'],
            'The rules use the middle value of the three timers, not the mean. Sorted, the times are 12.30, 12.41, and 12.56, so the official time is 12.41 s.',
          ],
          [
            'A payload never separates; the rocket takes 9.00 s to land. The log is complete. What is the launch score?',
            '8.10',
            ['9.00', '2.25', '7.65'],
            'Without separation, timing runs until the rocket touches the ground and a 0.90 multiplier applies: 9.00 × 0.90 = 8.10.',
          ],
          [
            'A team has an incomplete practice log and a clean 16.00 s launch. What is its score?',
            '13.60',
            ['16.00', '11.20', '4.00'],
            'An incomplete log multiplies the score by 0.85: 16.00 × 0.85 = 13.60. With no log at all it would be 0.70, or 11.20.',
          ],
        ],
        written: [
          [
            'Why is the second launch valuable even after a good first launch?',
            'It can beat the first launch, and its time is the tiebreaker if teams tie on their best launch.',
            'Ties are broken by the other launch’s time, so a strong second flight protects your rank. A safe repeat of a good setting is often the best plan.',
          ],
          [
            'Explain why hitting the ceiling is usually worse than flying lower.',
            'Timing stops at contact and the launch is multiplied by 0.25, so even a high flight scores only a fraction of a modest clean one.',
            'The 0.25 multiplier plus early timing cut the score drastically. Flying just below the ceiling gives the longest clean descent.',
          ],
          [
            'What two consequences follow from not having a practice log?',
            'The score is multiplied by 0.70, and the team is limited to a supervisor-chosen safe pressure.',
            'Missing logs cost both a multiplier and control of launch pressure. Both parts should be named for full credit.',
          ],
          [
            'Why are three timers used instead of one?',
            'Human reaction times vary; taking the middle of three reduces the effect of one slow or fast timer.',
            'The median ignores a single outlier, making the official time fairer and more repeatable than a single stopwatch.',
          ],
        ],
        flow: [
          ['Launch', 'Timing starts as the rocket leaves the launcher.'],
          ['Separate', 'Payload leaves the rocket and opens.'],
          ['Land', 'Timing stops; middle of three times counts.'],
        ],
        compare: [
          ['Clean launch', 'Full time counts', 'Must stay below the ceiling.'],
          ['No separation', 'Rocket time × 0.90', 'Rocket falls fast; short time.'],
          ['Ceiling hit', 'Timing stops, × 0.25', 'Almost always the worst outcome.'],
        ],
        challenge: 'Calculate scores for launches with different penalties and pick the best.',
        takeaway: 'Long, clean, separated flights below the ceiling win; multipliers punish risk.',
        evidence: {
          observations: [
            ['Ceiling', '24 ft gym.'],
            ['Log data', '60 psi: about 20 ft peak, 15 s aloft; 75 psi: about 26 ft peak.'],
            ['Team plan', 'Launch at 75 psi for “more height.”'],
          ],
          question: 'What is the problem with the team’s plan?',
          options: [
            'At 75 psi the rocket is likely to strike the 24 ft ceiling',
            'At 75 psi the parachute cannot open',
            'Higher pressure is never allowed',
          ],
          correct: 0,
          explanation:
            'The log predicts about 26 ft at 75 psi, above the 24 ft ceiling, which means a 0.25 multiplier. The 60 psi setting gives a clean, long descent and is the justified choice.',
        },
      },
      {
        title: 'How an air-powered bottle rocket climbs',
        objectives: [
          'Explain thrust from compressed air using Newton’s laws.',
          'Relate launch pressure to impulse and peak height.',
          'Describe the three phases of flight.',
        ],
        sections: [
          [
            'Stored energy',
            'Pumping air into a sealed bottle compresses it, storing energy. When the launcher releases the rocket, air rushes out of the nozzle. By Newton’s third law, the air pushed backward pushes the rocket forward. In this event water is not allowed, so the only propellant is the air itself, which is light and leaves quickly, making the powered phase extremely short.',
          ],
          [
            'Thrust and impulse',
            'Thrust is roughly the pressure difference times the nozzle area at first, falling quickly as pressure drops. Impulse, thrust multiplied by time, is what changes the rocket’s momentum. Higher pressure stores more energy and gives more impulse, so the rocket leaves the launcher faster. The nozzle is fixed at about 2.2 cm by the bottle neck, so pressure is your main control.',
          ],
          [
            'Coasting',
            'After the air is spent, the rocket coasts upward, slowed by gravity and air drag. Drag grows with the square of speed, so it matters most right after launch. A light rocket accelerates more for the same impulse but also loses speed faster to drag. The peak height, or apogee, is reached when upward speed falls to zero.',
          ],
          [
            'Why mass matters',
            'From F = ma, the same thrust gives more acceleration to a lighter rocket. Yet a rocket that is too light carries little momentum and is slowed quickly by drag. In this event the goal is not maximum height; it is reaching a safe height below the ceiling with a clean, upright flight, then releasing the payload near apogee.',
          ],
          [
            'Pressure limits',
            'The bottle must be a single plastic carbonated-beverage bottle of 1 liter or less, which is designed for pressure. You choose the launch pressure and must justify it with your log data; the supervisor checks the gauge. Without a complete log, the supervisor sets a lower safe pressure for all such teams. Never alter the bottle’s structure to save mass.',
          ],
          [
            'The three phases',
            'Every flight has a powered phase (milliseconds of thrust), a coasting phase (rising and slowing), and a recovery phase (the payload separates and descends). In this event the recovery phase is where nearly all the time aloft is earned. A rocket that climbs to 20 feet takes only about a second to get there; the parachute may then add ten seconds or more.',
          ],
        ],
        terms: [
          ['Thrust', 'Force from air leaving the nozzle.'],
          ['Impulse', 'Thrust times time; the change in momentum it produces.'],
          ['Apogee', 'The highest point of the flight.'],
          ['Drag', 'Air resistance, growing with the square of speed.'],
          ['Powered phase', 'The brief time air is still leaving the nozzle.'],
          ['Psi', 'Pounds per square inch, the gauge pressure unit.'],
        ],
        example: [
          'A rocket reaches apogee 1.2 s after launch, and the payload then descends for 11.5 s. What share of time aloft came from the descent?',
          [
            'Total time aloft = 1.2 + 11.5 = 12.7 s.',
            'Descent share = 11.5 ÷ 12.7 ≈ 0.91.',
            'About 91 percent of the score comes from the parachute descent.',
          ],
          'Climb only needs to be high enough; descent rate is where most of the time is won.',
        ],
        mcq: [
          [
            'Why is the powered phase so short in this event?',
            'Only air is used, so the propellant is very light and leaves almost instantly',
            [
              'The launcher limits it to one second',
              'Fins stop the thrust',
              'The parachute opens immediately',
            ],
            'Water is banned, so compressed air is the only reaction mass. Air is light and escapes in a fraction of a second, ending thrust very quickly.',
          ],
          [
            'Raising launch pressure mainly increases:',
            'The impulse and launch speed',
            ['The rocket’s mass', 'The parachute area', 'The nozzle diameter'],
            'More pressure stores more energy and produces a larger thrust impulse, so the rocket leaves faster and climbs higher. Mass, parachute size, and nozzle size are set by construction.',
          ],
          [
            'Which phase of the flight earns most of the time aloft?',
            'The parachute descent',
            ['The powered phase', 'The coasting climb', 'The time on the launcher'],
            'Climbing to apogee takes about a second, while a well-designed parachute descent lasts many seconds. Most of the score comes from slow descent.',
          ],
        ],
        written: [
          [
            'Explain how compressed air pushes the rocket upward.',
            'The bottle’s pressurized air rushes out the nozzle downward; by Newton’s third law, the expelled air pushes back up on the rocket.',
            'Action-reaction is the key idea: the rocket pushes air down, and the air pushes the rocket up. Answers may also mention momentum change.',
          ],
          [
            'Why does a very light rocket not always fly higher?',
            'It accelerates quickly but has little momentum, so drag slows it faster, and it may be less stable in flight.',
            'Drag depends on speed and shape, not mass, so its decelerating effect is larger for a light rocket. There is an optimum mass for height.',
          ],
          [
            'What must a team do to launch at its chosen pressure?',
            'Justify that pressure using its practice log data, which the supervisor checks along with the gauge reading.',
            'Teams with complete logs choose and justify a pressure; others are capped at a safe supervisor-chosen pressure.',
          ],
          [
            'Why is maximum height not the goal?',
            'Flying too high risks the ceiling penalty; the goal is a safe apogee below the ceiling followed by the slowest possible descent.',
            'Height adds little time compared with descent, and the ceiling penalty is severe. The best target is a margin below the ceiling.',
          ],
        ],
        flow: [
          ['Thrust', 'Air leaves the nozzle in milliseconds.'],
          ['Coast', 'Gravity and drag slow the climb.'],
          ['Recover', 'Payload separates and descends slowly.'],
        ],
        compare: [
          ['High pressure', 'More height', 'Ceiling risk.'],
          ['Low pressure', 'Safe and repeatable', 'Less descent height.'],
          ['Light rocket', 'Fast acceleration', 'Slowed more by drag.'],
        ],
        challenge: 'Predict how changing launch pressure shifts apogee and total time.',
        takeaway: 'Air thrust is brief; the climb sets up the descent that earns the score.',
        evidence: {
          observations: [
            ['40 psi', 'Peak about 12 ft; time aloft 8.1 s.'],
            ['55 psi', 'Peak about 18 ft; time aloft 12.4 s.'],
            ['70 psi', 'Peak about 24 ft; time aloft 16.0 s in a 30 ft hall.'],
          ],
          question: 'What pattern do these flights show?',
          options: [
            'Higher apogee gives more descent time, so time aloft rises with pressure',
            'Pressure has no effect on time aloft',
            'Time aloft falls as pressure rises',
          ],
          correct: 0,
          explanation:
            'Each pressure increase raised apogee, and a higher start gave the parachute more distance to fall, so time aloft rose. This holds only while the rocket stays below the ceiling.',
        },
      },
      {
        title: 'Building a legal, stable rocket',
        objectives: [
          'Apply the bottle, nose, fin, and material rules.',
          'Explain stability using center of gravity and center of pressure.',
          'Design fins that keep the rocket flying straight.',
        ],
        sections: [
          [
            'The pressure vessel',
            'The rocket’s pressure vessel must be one plastic carbonated-beverage bottle of 1 liter or less, with a nozzle about 2.2 cm across and a standard neck less than 1.6 cm from flange to opening. The label must be presented. Its structural integrity may not be altered by cutting, sanding, heating, hot glue, super glue, or spray paint, because a weakened bottle can burst.',
          ],
          [
            'Attachments',
            'Only tape may attach fins and other parts to the pressure vessel; no glue of any kind may touch it. Metal is prohibited anywhere on the rocket or payload, and so are Mylar and ultrafilm materials. Fins and other added parts must sit 5 cm or more above the bottle opening so the rocket fits on the launcher.',
          ],
          [
            'The nose',
            'The nose must be rounded or blunt. A standard bottle cap, about 3.1 cm across and 1.25 cm tall, is placed over the tip, and no part of the nose may touch the inside top of the cap. This keeps the tip from being pointed, which protects people and the ceiling. Test your nose with a real cap before competition.',
          ],
          [
            'Stability',
            'A rocket flies straight when its center of gravity (CG) is ahead of its center of pressure (CP), the point where aerodynamic forces effectively act. Fins at the tail move the CP backward. If the rocket tilts, air pushes on the fins and swings the nose back into the wind. If the CG is behind the CP, the rocket tumbles.',
          ],
          [
            'Finding CG and CP',
            'Find the CG by balancing the finished rocket, with payload loaded, on a finger or string. A rough CP can be found by cutting the rocket’s side outline from cardboard and balancing it; that balance point approximates the CP. Aim for the CG at least one body diameter ahead of the CP. Adding a little nose mass moves the CG forward.',
          ],
          [
            'Fin design',
            'Three or four fins, evenly spaced and aligned with the body, give steady flight. Large fins move the CP farther back but add drag and mass. Light, stiff materials such as foam board or corrugated plastic work well, attached with tape. Misaligned fins make the rocket spin or curve, which wastes height and can carry it toward walls.',
          ],
        ],
        terms: [
          ['Pressure vessel', 'The unaltered bottle that holds the compressed air.'],
          ['Center of gravity (CG)', 'The rocket’s balance point.'],
          ['Center of pressure (CP)', 'Where aerodynamic forces effectively act.'],
          ['Stability margin', 'Distance the CG sits ahead of the CP, often in body diameters.'],
          ['Cap test', 'Check that a blunt nose does not touch the inside top of a bottle cap.'],
          ['No-fin zone', 'The 5 cm above the bottle opening that must stay clear.'],
        ],
        example: [
          'A rocket’s CG is 18 cm from the nose and its CP is 21 cm from the nose. The bottle diameter is 8 cm. Is it stable enough?',
          [
            'Stability margin = 21 − 18 = 3 cm.',
            'In body diameters: 3 ÷ 8 ≈ 0.4.',
            'Below the 1-diameter guideline: enlarge the fins or add nose mass.',
          ],
          'The rocket is barely stable; moving the CG forward or the CP back improves straight flight.',
        ],
        mcq: [
          [
            'How may fins be attached to the bottle?',
            'With tape only',
            ['With hot glue', 'With epoxy', 'With metal screws'],
            'Only tape may attach parts to the pressure vessel. Glues of any kind are prohibited on it, and metal is banned anywhere on the rocket.',
          ],
          [
            'For stable flight, the center of gravity should be:',
            'Ahead of the center of pressure',
            [
              'Behind the center of pressure',
              'At the same point as the center of pressure',
              'At the nozzle',
            ],
            'With the CG forward, aerodynamic forces on the fins turn the nose back into the airflow whenever the rocket tilts. A CG behind the CP makes it tumble.',
          ],
          [
            'Which material is NOT allowed anywhere on the rocket or parachute?',
            'Mylar film',
            ['Plastic trash bag', 'Foam board', 'Paper tape'],
            'The rules ban Mylar and ultrafilm materials in any part of the rocket or parachute, as well as metal. Plastic bags, foam board, and tape are allowed.',
          ],
        ],
        written: [
          [
            'Why are cutting, sanding, and gluing the bottle prohibited?',
            'They weaken the pressure vessel, which could burst under pressure and injure people.',
            'The bottle is a pressure vessel designed for carbonation. Any damage concentrates stress and risks rupture, so its integrity must not change.',
          ],
          [
            'Describe how to check that a nose meets the rules.',
            'Place a standard bottle cap over the tip; the nose is legal if it does not touch the inside top of the cap.',
            'The cap test ensures the tip is rounded or blunt. Answers should describe placing the cap and checking for contact.',
          ],
          [
            'Explain how fins keep a rocket pointing forward.',
            'When the rocket tilts, airflow pushes on the fins behind the CG, creating a turning force that swings the nose back into the wind.',
            'Fins move the CP rearward, so aerodynamic forces act behind the CG and restore the rocket’s heading.',
          ],
          [
            'Why must fins stay 5 cm or more above the bottle opening?',
            'The rocket must slide onto the launcher, and parts in that zone would block the launcher’s fitting.',
            'The no-fin zone keeps the neck clear for the launch tube and seal, so the rocket can be loaded and released properly.',
          ],
        ],
        flow: [
          ['Inspect', 'Bottle, nose cap test, materials.'],
          ['Balance', 'Find CG with payload loaded.'],
          ['Trim', 'Adjust fins or nose mass until CG leads CP.'],
        ],
        compare: [
          ['Large fins', 'Strong stability', 'More drag and mass.'],
          ['Small fins', 'Low drag', 'May not keep CG ahead of CP.'],
          ['Nose mass', 'Moves CG forward', 'Adds weight to lift.'],
        ],
        challenge:
          'Check a rocket design against every construction rule and the stability guideline.',
        takeaway: 'A legal rocket is a safe one; a stable rocket keeps its CG ahead of its CP.',
        evidence: {
          observations: [
            ['Flight 1', 'Rocket corkscrews and lands near a wall.'],
            ['Inspection', 'One fin is twisted about 8° from the body line.'],
            ['Flight 2', 'Fin realigned: rocket flies straight up.'],
          ],
          question: 'What caused the corkscrew flight?',
          options: ['A misaligned fin', 'Too little pressure', 'A blunt nose'],
          correct: 0,
          explanation:
            'Only the fin alignment changed between flights. A twisted fin creates a sideways force that spins and curves the rocket; realigning it restored straight flight.',
        },
      },
      {
        title: 'Apogee, ceiling height, and choosing pressure',
        objectives: [
          'Estimate apogee with angle measurements or timing.',
          'Relate ceiling height to a safe launch pressure.',
          'Build a pressure-versus-height chart from test flights.',
        ],
        sections: [
          [
            'Why apogee matters',
            'Time aloft depends on how high the payload starts its descent, so you want apogee close to the ceiling without touching it. Tournaments must give the ceiling height in feet in advance, and more than 20 feet is recommended. Your job is to know, from data, what height each pressure produces with your rocket.',
          ],
          [
            'Measuring with an angle',
            'Stand a measured distance from the launcher and sight the rocket at its highest point with a clinometer or phone angle app. Height above your eye equals distance × tan(angle). Add your eye height. For example, 10 m away at 55° gives 10 × 1.43 ≈ 14.3 m above eye level. Using two observers on different sides averages out drift.',
          ],
          [
            'Measuring against a reference',
            'Indoors, the simplest method is comparing apogee to known heights: marks on a wall, a basketball rim at 10 feet, or ceiling beams. Video helps. Record the peak height estimate in feet, since that is one of the required log parameters. Consistent methods matter more than perfect accuracy, because the chart only has to predict your own rocket using your own method.',
          ],
          [
            'Pressure–height chart',
            'Launch the same rocket at several pressures and record the estimated peak height for each. Plot height against pressure. The curve usually rises steeply at first and then flattens, because drag grows with speed. Read the pressure that gives a height a safe margin below the competition ceiling, such as 2 to 3 feet below.',
          ],
          [
            'Margin',
            'Height varies from flight to flight because of payload loading, small leaks, and air currents. Look at the spread of heights at one pressure. If repeated launches at 60 psi range from 19 to 22 feet, set the target so the highest expected flight still clears the ceiling. A 0.25 multiplier is far worse than a slightly shorter clean flight, so when in doubt, step the pressure down.',
          ],
          [
            'Different venues',
            'Practice rooms rarely match the competition ceiling. That is why the log records pressure and height, not just time: you can choose pressure for any announced ceiling. Air movement from vents or doors can push light payloads, and tournaments are asked to reduce it, but your margin should still allow for some drift.',
          ],
        ],
        terms: [
          ['Clinometer', 'Tool that measures the angle of elevation to an object.'],
          ['Tangent method', 'Height = distance × tan(angle) + eye height.'],
          ['Ceiling height', 'Room height given to teams in advance, in feet.'],
          ['Safety margin', 'Planned gap between expected apogee and the ceiling.'],
          ['Spread', 'Range of results from repeated identical launches.'],
          ['Pressure–height chart', 'Graph of measured apogee against launch pressure.'],
        ],
        example: [
          'Your chart shows 50 psi → 17 ft, 60 psi → 21 ft, 70 psi → 24 ft, with about ±1.5 ft spread. The ceiling is 25 ft. Which pressure should you choose?',
          [
            '70 psi could reach 25.5 ft: too risky.',
            '60 psi reaches 21 ± 1.5 ft, at most 22.5 ft: safe.',
            'Interpolating, about 63 psi gives roughly 22 ft, still clearing 25 ft with margin.',
          ],
          'Choose about 60–63 psi and justify it with the chart and the observed spread.',
        ],
        mcq: [
          [
            'An observer 8 m from the launcher sees apogee at 45°, with eye height 1.5 m. What is the apogee?',
            '9.5 m',
            ['8 m', '11.3 m', '6.5 m'],
            'tan 45° = 1, so height above eye level is 8 × 1 = 8 m. Adding the 1.5 m eye height gives 9.5 m.',
          ],
          [
            'Why does the pressure–height curve flatten at high pressure?',
            'Drag grows rapidly with speed',
            [
              'Gravity gets stronger with height',
              'The bottle holds less air',
              'Timers stop earlier',
            ],
            'Drag is proportional to speed squared, so faster launches lose a larger share of their energy to air resistance, and each extra psi buys less height.',
          ],
          [
            'Repeated 65 psi flights reach 22–25 ft. The ceiling is 24 ft. What should you do?',
            'Choose a lower pressure so the highest flights clear 24 ft',
            [
              'Launch at 65 psi; the average is below 24 ft',
              'Raise the pressure to finish faster',
              'Remove the fins',
            ],
            'Some 65 psi flights would hit the ceiling and take a 0.25 multiplier. The pressure must keep the whole spread below the ceiling.',
          ],
        ],
        written: [
          [
            'Calculate apogee for an observer 12 m away sighting 40° (tan 40° ≈ 0.84), eye height 1.6 m.',
            '12 × 0.84 = 10.1 m above eye, plus 1.6 m = about 11.7 m (about 38 ft).',
            'Use height = distance × tan(angle), then add eye height. Converting to feet (× 3.28) matches the log’s required units.',
          ],
          [
            'Why should your launch pressure depend on the spread of your data, not only the average?',
            'A single launch might fly near the top of the spread; if that exceeds the ceiling, the 0.25 multiplier wipes out the flight.',
            'Planning for the highest likely flight protects against the large penalty. The average alone ignores real variation.',
          ],
          [
            'Why record peak height in a gym that is lower than the competition venue?',
            'Your pressure–height data lets you pick a safe pressure for whatever ceiling is announced, even if it differs from your practice room.',
            'Height data transfers to any venue, while time-only data does not. The pressure–height chart converts any announced ceiling into a pressure choice.',
          ],
          [
            'Give one source of error in angle measurements and one way to reduce it.',
            'Missing the exact peak moment or drift away from the launcher; reduce with video, two observers, or averaging several flights.',
            'Angle readings depend on catching the exact peak and on where the rocket is. Extra observers, video recordings, and averaging make estimates more consistent.',
          ],
        ],
        flow: [
          ['Launch', 'Test across a range of pressures.'],
          ['Measure', 'Estimate apogee by angle or reference.'],
          ['Choose', 'Pick a pressure that clears the ceiling with margin.'],
        ],
        compare: [
          ['Angle method', 'Works in any room', 'Needs a distance and quick timing.'],
          ['Reference marks', 'Simple indoors', 'Limited by known heights.'],
          ['Video', 'Can replay the peak', 'Parallax if the camera is close.'],
        ],
        challenge: 'Pick a launch pressure for an announced ceiling using a pressure–height chart.',
        takeaway: 'Measure apogee, know your spread, and launch to just below the ceiling.',
        evidence: {
          observations: [
            ['Chart', '45 psi → 15 ft, 55 psi → 19 ft, 65 psi → 22 ft.'],
            ['Spread', 'About ±1 ft at each pressure.'],
            ['Venue', 'Ceiling announced at 21 ft.'],
          ],
          question: 'Which launch pressure is best justified?',
          options: ['About 50 psi', '65 psi', '45 psi'],
          correct: 0,
          explanation:
            'At 55 psi the highest flights could reach 20 ft, uncomfortably close to 21 ft. About 50 psi (roughly 17 ft ± 1) keeps a safe margin while staying higher than 45 psi.',
        },
      },
      {
        title: 'Parachute physics: drag and slow descent',
        objectives: [
          'Explain terminal velocity using drag and weight.',
          'Calculate how canopy area changes descent rate.',
          'Trade parachute size against mass and reliable opening.',
        ],
        sections: [
          [
            'Terminal velocity',
            'A falling payload speeds up until air drag equals its weight. At that point the net force is zero and it falls at a steady terminal velocity. Drag is F = ½ρv²C_dA, where ρ is air density, v speed, C_d the drag coefficient, and A the canopy area. Solving for v gives v = √(2W ÷ ρC_dA).',
          ],
          [
            'Area is the big lever',
            'Because v depends on 1 ÷ √A, quadrupling canopy area halves the descent speed and doubles the time from the same height. Canopy area grows with the square of diameter, so doubling a canopy’s diameter roughly halves the descent speed. Large, light canopies are the core of long times aloft, as long as they still pack into the rocket and open every time.',
          ],
          [
            'Weight and the ping pong ball',
            'A standard ping pong ball is about 2.7 g, and the parachute, tape, and lines add more. Every gram increases weight and therefore descent speed, though only with the square root. Use thin plastic for the canopy, light thread for the lines, and the least tape that holds reliably. The ball may not be altered, so all weight savings must come from the canopy, lines, and attachment.',
          ],
          [
            'Drag coefficient',
            'A dome-shaped canopy has a drag coefficient around 1.3 to 1.5; a flat sheet that does not inflate fully has less. A small vent hole at the top lets air escape steadily, reducing swinging that wastes height. Lines about as long as the canopy diameter help it open into a full dome. Lines that are too short pull the edge inward and shrink the effective area.',
          ],
          [
            'Opening reliably',
            'A parachute that does not open falls as fast as a crumpled bag. Thin plastic folds compactly and opens readily, but static and tight packing can make it stick. Fold it loosely, avoid twisting lines, and test the exact packing method many times. Opening early near apogee gives the longest descent.',
          ],
          [
            'Drift and indoor air',
            'A slow, light payload drifts with air currents. That is usually fine indoors, but it can carry the parachute into a wall or rafter, ending the flight early. Tournaments reduce HVAC and door drafts where possible. A centered launch, a vent hole for stability, and a canopy that does not glide sideways help. Watch where test descents drift and adjust the canopy shape if it slides one way.',
          ],
        ],
        terms: [
          ['Terminal velocity', 'Steady falling speed when drag equals weight.'],
          ['Drag coefficient (C_d)', 'Number describing how much drag a shape makes.'],
          ['Canopy area', 'The projected area of the open parachute.'],
          ['Air density (ρ)', 'About 1.2 kg/m³ at room conditions.'],
          ['Spill hole', 'Small vent at the canopy top that steadies descent.'],
          ['Shroud lines', 'Threads connecting the canopy to the payload.'],
        ],
        example: [
          'A 4.7 g payload uses a 40 cm diameter dome (C_d ≈ 1.5). Estimate its descent speed and the time to fall 7 m.',
          [
            'W = 0.0047 × 9.8 ≈ 0.046 N; A = π × 0.20² ≈ 0.126 m².',
            'v = √(2 × 0.046 ÷ (1.2 × 1.5 × 0.126)) ≈ 0.64 m/s.',
            'Time ≈ 7 ÷ 0.64 ≈ 11 s (plus the climb).',
          ],
          'A 40 cm canopy turns a 7 m drop into about 11 seconds; doubling diameter would nearly double that.',
        ],
        mcq: [
          [
            'Quadrupling the canopy area changes terminal velocity by a factor of:',
            '1/2',
            ['1/4', '2', '1/16'],
            'Terminal velocity is proportional to 1/√A. Four times the area gives 1/√4 = 1/2 the speed, so the descent takes twice as long.',
          ],
          [
            'At terminal velocity, the drag on the payload is:',
            'Equal to its weight',
            ['Zero', 'Twice its weight', 'Less than its weight'],
            'Terminal velocity is reached when drag balances weight, so the net force is zero and the speed stops changing.',
          ],
          [
            'Why do many canopies include a small hole at the top?',
            'To reduce swinging and steady the descent',
            [
              'To make the parachute fall faster for scoring',
              'Because the rules require it',
              'To attach the ping pong ball',
            ],
            'A spill hole lets air escape steadily instead of spilling around the edge, which reduces oscillation. Steady descents waste less height.',
          ],
        ],
        written: [
          [
            'Explain why a parachute reaches a steady falling speed.',
            'As it speeds up, drag grows with the square of speed until it equals the weight; then the net force is zero and speed stays constant.',
            'Answers should connect rising drag to falling speed and state that balanced forces mean no further acceleration.',
          ],
          [
            'If the canopy diameter doubles, roughly how does descent time change, and why?',
            'Area quadruples, so terminal velocity halves and descent time roughly doubles from the same height.',
            'Area scales with diameter squared and speed with 1/√A, so speed scales with 1/diameter. Time from a fixed height doubles.',
          ],
          [
            'Why does adding tape to the payload matter?',
            'Tape adds weight, which raises terminal velocity and shortens descent; use only what holds reliably.',
            'Descent speed grows with √W. Every gram costs time, so minimal but secure attachment is best.',
          ],
          [
            'Name one way a parachute can fail to open and a fix.',
            'Static or tight folding makes plastic stick; fold loosely, keep lines untwisted, and test the packing method repeatedly.',
            'Failure to open is the biggest loss. Answers linking a failure cause to a practical fix earn credit.',
          ],
        ],
        flow: [
          ['Release', 'Payload leaves the rocket near apogee.'],
          ['Open', 'Canopy inflates into a dome.'],
          ['Descend', 'Drag equals weight at terminal velocity.'],
        ],
        compare: [
          ['Large canopy', 'Slow descent', 'Harder to pack and open.'],
          ['Small canopy', 'Opens easily', 'Falls faster.'],
          ['Spill hole', 'Steady descent', 'Slightly less drag.'],
        ],
        challenge: 'Calculate descent time for different canopy sizes and payload masses.',
        takeaway:
          'Big, light, reliably opening canopies win: speed falls with the square root of area.',
        evidence: {
          observations: [
            ['30 cm canopy', 'Opens every time; 7.8 s descent.'],
            ['60 cm canopy', 'Opens 6 of 10 times; 14.9 s when open, 3 s when not.'],
            ['50 cm canopy, looser fold', 'Opens 10 of 10; 12.6 s descent.'],
          ],
          question: 'Which parachute should the team choose?',
          options: [
            'The 50 cm canopy with the looser fold',
            'The 60 cm canopy',
            'The 30 cm canopy',
          ],
          correct: 0,
          explanation:
            'The 60 cm canopy is fastest-opening only 60 percent of the time, giving an expected time near 10 s. The 50 cm canopy opens every time for 12.6 s, the best reliable result.',
        },
      },
      {
        title: 'Deployment and separation',
        objectives: [
          'Explain why the payload must separate and when it should.',
          'Compare passive deployment methods allowed by the rules.',
          'Follow the loading and pressurizing sequence.',
        ],
        sections: [
          [
            'Why separation is required',
            'The payload must separate from the rocket. If it stays attached, timing runs until the rocket hits the ground and a 0.90 multiplier applies. A heavy rocket hanging from a ping pong ball parachute would fall far faster anyway, so separation matters both for the rules and for time aloft.',
          ],
          [
            'Allowed energy',
            'All energy for the flight must come from air pressure supplied through the launcher. Explosives, chemical reactions, springs or elastic assists, electrical devices, remote controls, tethers, and throwing are all prohibited. Deployment must therefore be passive, using the rocket’s own motion: deceleration, air drag, or the rocket turning over at apogee.',
          ],
          [
            'Nose-cone release',
            'A common method seats the payload in a loose nose cone or open cup on top of the rocket. During thrust, the rocket pushes the payload upward and holds it in the cup. After burnout, the light, bulky payload feels more drag for its mass than the rocket, so it presses into the cup; as the rocket slows, stops, and tips over at apogee, the payload slides out. The fit must be loose enough to release but secure enough to stay through launch.',
          ],
          [
            'Timing of separation',
            'Ideally the payload releases near apogee, so the parachute starts its descent from the highest point. Too early, and it opens while the rocket is still fast, possibly tearing or tangling. Too late, and the rocket may already be falling, wasting height. Video of test flights shows exactly when separation happens, so you can adjust the fit with evidence.',
          ],
          [
            'Loading sequence',
            'At launch, teams load the rocket onto the launcher first. With the rocket loaded but not pressurized, they place the payload on or in it. After that, the payload may not be touched. The team then pressurizes to its chosen psi, the supervisor checks the gauge, and a team member calls “3, 2, 1, LAUNCH!” and releases.',
          ],
          [
            'Rehearsal',
            'Because the payload cannot be adjusted once loaded, the packing must be fast and consistent. Practice with the same steps you will use at competition: fold, place, check nothing is caught, then pressurize. Bring spare parachutes and practice changing to the second rocket within the 5-minute window. A timed rehearsal shows whether two launches really fit.',
          ],
        ],
        terms: [
          ['Separation', 'Payload leaving the rocket during flight.'],
          [
            'Passive deployment',
            'Release driven by the rocket’s own motion, without stored energy.',
          ],
          ['Nose cup', 'Open holder on top of the rocket that carries the payload.'],
          ['Burnout', 'The moment the air thrust ends.'],
          ['Tether', 'A line connecting rocket and payload; prohibited.'],
          ['Loading sequence', 'Rocket on launcher, payload placed, then pressurize.'],
        ],
        example: [
          'Video shows a payload leaving the rocket 0.3 s after launch, well before apogee, and the parachute tangling. What should change?',
          [
            'Early release means the payload sits too loosely or is pushed out by airflow.',
            'Make the nose cup slightly deeper or snugger so it stays through the fast climb.',
            'Retest with video until release happens near apogee.',
          ],
          'Adjust the fit so separation happens as the rocket slows near the top, not during the fast climb.',
        ],
        mcq: [
          [
            'Which deployment method is allowed?',
            'A loose nose cup that releases as the rocket slows at apogee',
            [
              'A spring that pushes the parachute out',
              'A small electronic timer',
              'A rubber band ejector',
            ],
            'Only air pressure from the launcher may supply energy. Springs, elastic assists, and electrical devices are prohibited; a passive cup that uses the rocket’s motion is allowed.',
          ],
          [
            'When may the parachute payload be placed on the rocket?',
            'After the rocket is on the launcher, before pressurizing',
            ['After pressurizing', 'Before loading the rocket on the launcher', 'At any time'],
            'The rules specify loading the rocket onto the launcher, then placing the payload while unpressurized. After that the payload cannot be manipulated.',
          ],
          [
            'Why is release near apogee ideal?',
            'The parachute begins its descent from the greatest height at low speed',
            [
              'It makes the rocket fly higher',
              'It is required by the rules',
              'It avoids the 0.85 multiplier',
            ],
            'At apogee the rocket is slowest and highest, so the canopy opens gently and has the most height to descend through.',
          ],
        ],
        written: [
          [
            'Why can’t a team use a spring to eject the parachute?',
            'All energy must come from launcher air pressure; springs and elastic assists are specifically prohibited.',
            'The rule limits flight energy to the pump’s compressed air. Stored mechanical energy in springs or elastics is banned.',
          ],
          [
            'Describe how a passive nose cup releases the payload.',
            'The payload rides in the cup during thrust; as the rocket slows and tips over at apogee, the payload’s momentum and drag carry it out of the open cup.',
            'Good answers link release to the rocket slowing or turning at apogee, without any stored energy device.',
          ],
          [
            'What happens if the payload releases too early?',
            'The parachute opens at high speed, risking tears or tangles, and starts its descent below the rocket’s apogee.',
            'Early release wastes height and stresses the canopy. Adjusting the cup fit moves release later.',
          ],
          [
            'Why rehearse the loading sequence?',
            'The payload cannot be adjusted after loading, so consistent, quick packing prevents tangles and saves time in the 5-minute window.',
            'Once placed, the payload is fixed. Practiced packing makes every launch like the tested ones.',
          ],
        ],
        flow: [
          ['Load', 'Rocket on launcher, payload placed, unpressurized.'],
          ['Pressurize', 'Pump to the justified psi; gauge checked.'],
          ['Release', 'Payload slides free near apogee.'],
        ],
        compare: [
          ['Snug cup', 'Stays put during thrust', 'May not release at all.'],
          ['Loose cup', 'Releases easily', 'May release too early.'],
          ['No separation', 'Simple', '0.90 multiplier and fast fall.'],
        ],
        challenge: 'Tune a nose-cup fit so the payload releases near apogee every time.',
        takeaway:
          'Separation is passive: shape and fit let the rocket’s own motion release the payload.',
        evidence: {
          observations: [
            ['Cup depth 2 cm', 'Payload left during climb in 4 of 5 flights.'],
            ['Cup depth 4 cm', 'Payload stayed attached in 3 of 5 flights.'],
            ['Cup depth 3 cm', 'Payload released near apogee in 5 of 5 flights.'],
          ],
          question: 'What does the data suggest?',
          options: [
            'A 3 cm cup depth balances retention and release',
            'Deeper cups always work better',
            'Cup depth has no effect',
          ],
          correct: 0,
          explanation:
            'Shallow cups released too early and deep cups often failed to release. The middle depth released reliably near apogee, showing a clear optimum.',
        },
      },
      {
        title: 'The practice log and launch decisions',
        objectives: [
          'Build a complete practice log that meets the rules.',
          'Use controlled tests to improve time aloft.',
          'Justify a competition pressure with data.',
        ],
        sections: [
          [
            'Required data',
            'The log must cover 10 or more test flights and five or more parameters. Three are required: launch pressure in psi, estimated peak flight height in feet, and time aloft in seconds. At least two more are your choice, such as number of fins, parachute diameter, rocket mass, or deployment method. Missing any parameter or flight makes it incomplete.',
          ],
          [
            'Choosing extra parameters',
            'Pick additional parameters you will actually change and learn from. Parachute diameter and payload mass connect directly to descent rate. Rocket mass and fin count affect climb and stability. Recording separation success and notes about drift helps explain outliers. Good extra parameters turn the log into an engineering tool rather than a formality, and they give you material for design-knowledge questions.',
          ],
          [
            'Controlled testing',
            'Change one thing at a time. To compare parachutes, keep the rocket, pressure, and packing the same. To find a pressure, keep the parachute fixed. Repeat each condition several times, because single flights vary. Averages and spreads from repeats are far more trustworthy than one long flight, which may have caught a lucky air current.',
          ],
          [
            'Reading the data',
            'Plot time aloft against peak height. If the points fall on a straight line, your descent rate is steady; the slope is seconds per foot of height. A parachute that improves the slope helps at every venue. Outliers, such as a failed opening, should be noted and explained, not deleted, since they show reliability.',
          ],
          [
            'Justifying pressure',
            'At competition you choose a pressure and must justify it with data. Bring the pressure–height chart, the spread at the chosen pressure, and the ceiling margin it gives. A clear answer, such as “60 psi has reached 19 to 21 feet in eight tests, below the 24-foot ceiling,” shows the supervisor your choice is safe and evidence-based.',
          ],
          [
            'Competition plan',
            'Decide in advance: launch 1 at the justified pressure with your most reliable parachute. If it scores well, repeat the same setup for launch 2 as a tiebreaker. If something fails, switch to the backup rocket or parachute. Know the 5-minute window, prepare spares, and be ready to answer questions on design and operation, using your log as evidence.',
          ],
        ],
        terms: [
          ['Required parameters', 'Pressure (psi), peak height (ft), and time aloft (s).'],
          ['Additional parameters', 'At least two more chosen by the team.'],
          ['Incomplete log', 'Missing a parameter or under 10 flights; × 0.85.'],
          ['Outlier', 'A result far from the rest, which should be explained.'],
          ['Descent slope', 'Seconds of time aloft gained per foot of height.'],
          ['Justification', 'Data-based reason for the chosen launch pressure.'],
        ],
        example: [
          'A log has 12 flights recording pressure, height, time, and fin count. Is it complete?',
          [
            'Required: pressure, height, time — all present.',
            'Additional parameters: only fin count, one of the two needed.',
            'Total parameters: four, below the five required.',
          ],
          'The log is incomplete (× 0.85 and a capped pressure); adding parachute diameter for every flight would fix it.',
        ],
        mcq: [
          [
            'Which set meets the minimum practice log requirement?',
            '10 flights with pressure, height, time, parachute diameter, and rocket mass',
            [
              '20 flights with pressure, time, and parachute diameter',
              '9 flights with six parameters',
              '10 flights with pressure and time only',
            ],
            'The log needs at least 10 flights and five parameters, including all three required ones. Only the first option meets both conditions.',
          ],
          [
            'Why is changing one variable at a time important in test flights?',
            'It shows which change caused the difference in results',
            ['The rules require it', 'It makes rockets lighter', 'It shortens the log'],
            'Controlled tests isolate cause and effect. If several factors change together, you cannot tell which one improved time aloft.',
          ],
          [
            'Time aloft plotted against peak height forms a straight line. What does the slope tell you?',
            'Seconds of descent gained per foot of height',
            ['The launch pressure', 'The ceiling height', 'The rocket’s mass'],
            'A straight line means a steady descent rate; its slope is the time gained per foot, a direct measure of parachute performance.',
          ],
        ],
        written: [
          [
            'Why should outliers stay in the log?',
            'They show real reliability problems, such as failed openings, and explain variation; deleting them hides risk.',
            'An honest log reveals how often things go wrong, which affects which design and pressure are best.',
          ],
          [
            'Write a one-sentence pressure justification for a 22-foot ceiling, using example data.',
            'In seven test flights at 55 psi our rocket peaked between 17 and 19 feet, so 55 psi clears the 22-foot ceiling by at least 3 feet.',
            'A strong justification names the pressure, the measured height range, and the margin below the announced ceiling.',
          ],
          [
            'Suggest two useful additional parameters and explain why.',
            'Parachute diameter, because it controls descent rate; rocket mass, because it affects climb and stability.',
            'Any two parameters that are varied and analyzed are acceptable. The explanation should link each to performance.',
          ],
          [
            'What should a team do on launch 2 after a strong launch 1?',
            'Repeat the same proven setup to secure a strong tiebreaker time rather than take a big risk.',
            'The second launch is the tiebreaker. Repeating a reliable setup protects rank; risky changes can waste it.',
          ],
        ],
        flow: [
          ['Test', 'Fly 10+ times, five parameters each.'],
          ['Analyze', 'Plot height and time; find trends and spread.'],
          ['Decide', 'Choose and justify a safe pressure.'],
        ],
        compare: [
          ['Complete log', 'Full score and free pressure choice', 'Takes many test flights.'],
          ['Incomplete log', '× 0.85 and capped pressure', 'Missing data costs points.'],
          ['No log', '× 0.70 and capped pressure', 'Largest penalty.'],
        ],
        challenge: 'Audit a practice log for completeness and pick a justified launch pressure.',
        takeaway:
          'The log is both a rule and your best tool: test, record, and launch on evidence.',
        evidence: {
          observations: [
            ['Log entries', '14 flights recorded.'],
            ['Columns', 'Pressure, peak height, time aloft, parachute diameter.'],
            ['Flights 1–3', 'Peak height column left blank.'],
          ],
          question: 'How will this log be judged?',
          options: [
            'Incomplete: too few parameters and missing heights',
            'Complete, because there are 14 flights',
            'Complete, because time aloft is recorded',
          ],
          correct: 0,
          explanation:
            'It lists four parameters, not five, and three flights lack a required height. Either problem makes it incomplete, giving a 0.85 multiplier and a capped pressure.',
        },
      },
    ],
  });
}

export const pingPongParachuteLessonsC = pingPongParachute('C');
export const pingPongParachuteLessonsB = pingPongParachute('B');
