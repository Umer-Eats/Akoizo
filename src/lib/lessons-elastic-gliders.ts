import { buildEventCourse } from './build-course-kit.ts';

// Elastic Launched Gliders B (2027): catapult-launched indoor gliders. Sum of the three best flights wins.
export const elasticGlidersLessons = buildEventCourse({
  eventId: 'elastic-launched-gliders',
  eventName: 'Elastic Launched Gliders',
  prefix: 'elg',
  division: 'B',
  intro:
    'Seven units build a glider that is flung high by a stretched elastic and then glides down as slowly as possible. You will learn the rules and score, glide physics, launch energy, the climb-to-glide transition, construction, launch technique under a ceiling, and how to log and fly on competition day.',
  references: [
    {
      title: 'Science Olympiad: Elastic Launched Glider B',
      url: 'https://www.soinc.org/elastic-launched-glider-b',
    },
    {
      title: 'NASA Glenn: Gliding Flight',
      url: 'https://www.grc.nasa.gov/www/k-12/airplane/glidang.html',
    },
  ],
  units: [
    {
      title: 'Rules, scoring, and planning five flights',
      objectives: [
        'State the glider and launch handle limits.',
        'Calculate a final score from several flights.',
        'Plan the 6-minute flight period.',
      ],
      sections: [
        [
          'The goal',
          'Elastic Launched Gliders asks teams to build up to two free-flight gliders that are launched by a stretched elastic band on a handle. Nothing powers the glider after release, so all the energy comes from the launch. A good flight climbs high and steeply, turns smoothly into a slow circling glide, and lands as late as possible in the room.',
        ],
        [
          'Glider limits',
          'The glider’s total mass must be more than 3.5 g and less than 10.0 g throughout the flight. It must fit inside a lidless measurement box of 32.0 × 24.0 × 47.0 cm, and its nose must be blunt enough to pass the supervisor’s check. Boron is not allowed. Teams may adjust mass with their own ballast to account for differences between scales.',
        ],
        [
          'Launch handle limits',
          'The launch handle, not counting the elastic, must be less than 1 m long in any direction, be held entirely by one student, and be safe. The elastic must be non-metallic, stay in contact with the glider through the launch, and remain attached to the handle. If the elastic leaves the handle, timing ends for that flight, so secure it carefully.',
        ],
        [
          'The flight period',
          'The 6-minute Flight Period starts when the supervisor returns the launch handle. Teams may make up to five official flights with one or two gliders, plus trim flights, and must declare each flight before launching; an undeclared flight is official. Any flight that begins within the period may finish. Students must launch standing on the floor, without aids that raise launch height.',
        ],
        [
          'Scoring',
          'Each official flight’s score is its flight time multiplied by the flight log bonus: ×1.2 for a complete log, ×1.1 for a partial log, and ×1.0 without one. The final score is the sum of the three best flight scores, and highest wins. Ties are broken by the longest non-scored official flight score, so every official flight can matter.',
        ],
        [
          'Why consistency wins',
          'Because the final score adds three flights, one lucky flight is not enough. A glider that flies 25 seconds every time beats one that flies 35 seconds once and 10 seconds the rest. Practice should focus on repeatable launches and trim. Using five official flights gives two spares, so a bad flight does not ruin the score.',
        ],
      ],
      terms: [
        ['Flight Period', '6 minutes beginning when the launch handle is returned.'],
        ['Official flight', 'Declared scoring flight; up to five per team.'],
        ['Final score', 'Sum of the three best flight scores.'],
        ['Launch handle', 'Under 1 m long, held by one student, elastic attached.'],
        ['Mass window', 'More than 3.5 g and less than 10.0 g.'],
        ['Flight log bonus', '×1.2 complete, ×1.1 partial.'],
      ],
      example: [
        'A team with a complete log flies official flights of 22.4, 18.0, 25.1, 9.6, and 24.0 s. What is the final score and tiebreaker?',
        [
          'Three best times: 25.1 + 24.0 + 22.4 = 71.5 s.',
          'Final score = 71.5 × 1.2 = 85.80.',
          'Tiebreaker: the longest non-scored flight, 18.0 × 1.2 = 21.60.',
        ],
        'Final score 85.80, tiebreaker 21.60.',
      ],
      mcq: [
        [
          'How is the final score calculated?',
          'Sum of the three best flight scores',
          ['Best single flight', 'Average of all flights', 'Sum of all five flights'],
          'The final score adds the three longest flight scores after the log bonus is applied. More flights give more chances for three good ones.',
        ],
        [
          'Which glider mass is legal?',
          '6.2 g',
          ['3.5 g', '10.0 g', '12.0 g'],
          'Mass must be more than 3.5 g and less than 10.0 g, so values exactly at either limit are not legal.',
        ],
        [
          'What happens if the elastic flies off the handle during a launch?',
          'Timing ends for that flight',
          ['The flight is repeated', 'Nothing', 'The team is disqualified'],
          'The elastic must remain on the launch handle. If it leaves the handle, timing ends for that flight.',
        ],
      ],
      written: [
        [
          'Why does consistency matter more than one long flight?',
          'The final score adds three flights, so three good flights beat one excellent flight and several poor ones.',
          'Summing scores rewards repeatable launches and trim. Spare official flights reduce the impact of one bad flight.',
        ],
        [
          'Why may teams bring their own ballast to check-in?',
          'Scales differ, so ballast lets teams adjust mass to stay inside the legal window on the supervisor’s scale.',
          'A glider near 3.5 g or 10.0 g might fail on a different scale. Ballast fixes that quickly.',
        ],
        [
          'What is the benefit of declaring a trim flight?',
          'It lets the team test trim or the room without using one of the five official flights.',
          'Undeclared flights count as official. Declaring trim flights protects official attempts for good conditions. later in the period.',
        ],
        [
          'How is a tie broken?',
          'By the longest non-scored official flight score.',
          'The tiebreaker uses the best flight that did not count toward the final score, so a fourth good flight helps.',
        ],
      ],
      flow: [
        ['Check-in', 'Box, mass, handle, and log inspected.'],
        ['Fly', 'Up to five official flights in 6 minutes.'],
        ['Score', 'Sum of the three best × log bonus.'],
      ],
      compare: [
        ['Consistent glider', 'Steady three-flight total', 'May lack a record flight.'],
        ['Two gliders', 'Backup if one breaks', 'Two to trim.'],
        ['Complete log', '×1.2 on every flight', 'Needs 10 logged flights.'],
      ],
      challenge: 'Plan five official flights so three strong scores are likely.',
      takeaway: 'Three consistent flights, a complete log, and a legal handle make the score.',
      evidence: {
        observations: [
          ['Glider A', 'Flights: 35, 12, 11, 10, 9 s.'],
          ['Glider B', 'Flights: 24, 23, 22, 21, 20 s.'],
          ['Both', 'Complete flight log.'],
        ],
        question: 'Which glider gives the higher final score?',
        options: ['Glider B', 'Glider A', 'They tie'],
        correct: 0,
        explanation:
          'Glider A totals (35 + 12 + 11) × 1.2 = 69.6. Glider B totals (24 + 23 + 22) × 1.2 = 82.8. Consistency beats one long flight.',
      },
    },
    {
      title: 'Glide physics: sink rate and glide ratio',
      objectives: [
        'Relate glide ratio, airspeed, and sink rate.',
        'Explain why a slow, efficient glide lasts longest.',
        'Estimate glide time from height.',
      ],
      sections: [
        [
          'Forces in a glide',
          'A glider has no engine, so it trades height for speed. Gravity pulls it down; part of its weight acts forward along the flight path and balances drag, while lift supports the rest. The glider descends along a shallow path. The angle of that path depends on the ratio of lift to drag, which is set by wing design and trim.',
        ],
        [
          'Glide ratio',
          'The glide ratio is horizontal distance traveled per unit of height lost, and in steady flight it equals the lift-to-drag ratio (L/D). A glider with L/D of 8 travels 8 m forward for each 1 m it drops. Long, thin wings, smooth surfaces, and a clean fuselage raise L/D. Indoor gliders usually reach glide ratios between 5 and 10.',
        ],
        [
          'Sink rate decides time',
          'For time aloft, the key number is the sink rate, the vertical speed downward. Sink rate equals airspeed divided by glide ratio. A glider flying slowly with a good glide ratio sinks slowly. Two gliders with the same glide ratio but different speeds will have different flight times: the slower one stays up longer.',
        ],
        [
          'Flying slowly',
          'Lift equals ½ρv²SC_L. A glider with more wing area for its weight, lower wing loading, can produce enough lift at a lower speed. Higher lift coefficients from camber and the right angle of attack also slow the glide. But flying too slowly brings the wing near stall, where lift drops suddenly and the glider loses height quickly.',
        ],
        [
          'Mass trade-offs',
          'A lighter glider glides more slowly and sinks more slowly. But a heavier glider stores more energy from the launch and climbs higher before air drag slows it. The mass window of 3.5 to 10.0 g lets teams choose. Many designs sit in the middle: heavy enough to climb high, light enough to glide slowly.',
        ],
        [
          'Circling',
          'Indoors, gliders circle so they stay in the room. Banking tilts the lift, so the glider needs a bit more lift and sinks a little faster in a turn. Wide, gentle circles waste less height than tight ones. Plan circle size from the room’s width and use trim to keep the circle consistent as the glider slows. Note the circle size in the log.',
        ],
      ],
      terms: [
        ['Glide ratio', 'Horizontal distance per unit height lost; equals L/D.'],
        ['Sink rate', 'Vertical descent speed.'],
        ['Lift-to-drag ratio (L/D)', 'Measure of aerodynamic efficiency.'],
        ['Wing loading', 'Weight divided by wing area.'],
        ['Stall', 'Sudden loss of lift when the wing’s angle is too high.'],
        ['Bank angle', 'Tilt of the wings in a turn.'],
      ],
      example: [
        'A glider reaches 9.0 m and glides at 3.2 m/s with glide ratio 8. Estimate glide time.',
        [
          'Sink rate = airspeed ÷ glide ratio = 3.2 ÷ 8 = 0.40 m/s.',
          'Glide time = 9.0 m ÷ 0.40 m/s = 22.5 s.',
          'Add the few seconds of climb for total flight time.',
        ],
        'About 22.5 s of glide, plus the climb.',
      ],
      mcq: [
        [
          'A glider has glide ratio 6 and airspeed 3.0 m/s. What is its sink rate?',
          '0.50 m/s',
          ['18 m/s', '2.0 m/s', '0.20 m/s'],
          'Sink rate equals airspeed divided by glide ratio: 3.0 ÷ 6 = 0.50 m/s. A higher glide ratio would lower it.',
        ],
        [
          'Two gliders have the same glide ratio. Which stays up longer from the same height?',
          'The one flying more slowly',
          ['The faster one', 'They are equal', 'The heavier one always'],
          'Sink rate is airspeed divided by glide ratio, so the slower glider sinks more slowly and stays up longer.',
        ],
        [
          'Why do tight circles shorten glides?',
          'Banking more requires more lift, increasing sink rate',
          ['They increase glide ratio', 'They reduce drag', 'They slow the glider'],
          'In a steep bank the wing must make more lift to hold the glider up, which costs extra drag and height.',
        ],
      ],
      written: [
        [
          'Explain why sink rate, not glide ratio alone, predicts time aloft.',
          'Time aloft depends on how fast height is lost; sink rate combines glide ratio and airspeed.',
          'A fast glider with a good glide ratio can still sink quickly. Time aloft is height divided by sink rate.',
        ],
        [
          'Why might a heavier glider score better despite gliding faster?',
          'It can store more launch energy and climb higher, giving more height to glide from.',
          'The trade-off is launch height versus sink rate. Testing different masses finds the best balance.',
        ],
        [
          'What happens if a glider is trimmed too slow?',
          'It approaches stall, losing lift suddenly and dropping, often in a series of stalls.',
          'Flying just above stall speed is efficient. Below it, lift collapses and height is wasted.',
        ],
        [
          'How can a team increase glide ratio?',
          'Use long, thin wings, smooth surfaces, a clean fuselage, and good trim at the best angle of attack.',
          'Reducing drag for a given lift raises L/D. High aspect ratio wings reduce induced drag.',
        ],
      ],
      flow: [
        ['Height', 'Launch sets starting altitude.'],
        ['Glide', 'Sink rate = speed ÷ glide ratio.'],
        ['Time', 'Height ÷ sink rate.'],
      ],
      compare: [
        ['Light glider', 'Slow sink', 'Lower launch height.'],
        ['Heavy glider', 'Higher launch', 'Faster sink.'],
        ['Wide circles', 'Less height lost', 'Need room width.'],
      ],
      challenge: 'Estimate glide time from height, speed, and glide ratio.',
      takeaway: 'Fly slowly and efficiently: low sink rate is long time aloft.',
      evidence: {
        observations: [
          ['Glider A', 'Peak 10 m; sink 0.55 m/s.'],
          ['Glider B', 'Peak 8 m; sink 0.35 m/s.'],
          ['Question', 'Which glides longer, ignoring climb time?'],
        ],
        question: 'Which glider has the longer glide?',
        options: ['Glider B', 'Glider A', 'Equal'],
        correct: 0,
        explanation:
          'Glider A: 10 ÷ 0.55 ≈ 18 s. Glider B: 8 ÷ 0.35 ≈ 23 s. Lower sink rate outweighs the 2 m height advantage.',
      },
    },
    {
      title: 'Launch energy: from stretched elastic to height',
      objectives: [
        'Calculate elastic potential energy.',
        'Estimate launch speed and ideal height.',
        'Explain where launch energy is lost.',
      ],
      sections: [
        [
          'Elastic energy',
          'A stretched elastic stores energy. For an ideal spring, energy is ½kx², where k is the stiffness in N/m and x is the stretch. Real rubber does not follow this exactly, but the idea holds: doubling the stretch roughly quadruples the energy. That is why small changes in pull distance make large changes in launch height.',
        ],
        [
          'Converting energy',
          'When released, the elastic accelerates the glider. Some energy becomes the glider’s kinetic energy, ½mv², and some stays in the moving elastic and handle or is lost as heat. The glider then climbs, trading kinetic energy for potential energy, mgh, while drag steals energy the whole way up. Real climbs reach only a fraction of the ideal height.',
        ],
        [
          'Launch speed',
          'Launch speeds for elastic gliders can be 10 to 20 m/s, much faster than the glide speed. At that speed drag is large, since drag grows with speed squared. A clean, stiff glider loses less energy during the climb. Wings must not flutter or bend at launch speed, or the climb becomes erratic and much lower.',
        ],
        [
          'Mass and height',
          'If all launch energy went into height, h = E ÷ (mg), and lighter gliders would climb higher. In reality, very light gliders reach high speed but lose energy quickly to drag. A heavier glider carries its momentum higher. This is why launch height does not simply increase as mass decreases, and why testing matters.',
        ],
        [
          'The elastic',
          'Elastic thickness, length, and condition all change launch energy. Fresh rubber stores more energy than tired rubber, and temperature affects stiffness. Use the same elastic type for testing and competition, replace it before it weakens, and record its relaxed length in the log. The elastic must be non-metallic and stay on the handle.',
        ],
        [
          'Consistent pull',
          'The same pull distance each time gives the same energy. Teams mark the pull length on a reference or practice a fixed arm position. For a lower ceiling, reduce the pull rather than changing the glider. Recording stretch length in the flight log as an extra parameter helps predict peak height for each pull. A simple tape mark on the handle or a measured arm position makes the same pull easy to repeat on every launch.',
        ],
      ],
      terms: [
        ['Elastic potential energy', '½kx² for an ideal spring.'],
        ['Stiffness (k)', 'Force per unit stretch.'],
        ['Kinetic energy', '½mv², energy of motion.'],
        ['Gravitational potential energy', 'mgh, energy of height.'],
        ['Launch speed', 'Glider speed as it leaves the elastic.'],
        ['Pull distance', 'How far the elastic is stretched.'],
      ],
      example: [
        'An elastic with k = 20 N/m is stretched 0.30 m. Half the energy reaches a 6.0 g glider. Find launch speed and ideal height.',
        [
          'Energy stored = ½ × 20 × 0.30² = 0.90 J; to glider: 0.45 J.',
          'v = √(2E ÷ m) = √(2 × 0.45 ÷ 0.006) ≈ 12 m/s.',
          'Ideal height = E ÷ (mg) = 0.45 ÷ (0.006 × 9.8) ≈ 7.7 m before drag losses.',
        ],
        'About 12 m/s at launch; drag keeps the real peak below 7.7 m.',
      ],
      mcq: [
        [
          'If pull distance doubles, about how does stored energy change?',
          'It roughly quadruples',
          ['It doubles', 'It halves', 'No change'],
          'Elastic energy is proportional to stretch squared, so doubling the stretch gives about four times the energy.',
        ],
        [
          'Why does a real glider climb lower than E ÷ (mg)?',
          'Drag and energy left in the elastic reduce the energy for height',
          ['Gravity is weaker indoors', 'Mass increases', 'Lift pushes it down'],
          'Not all elastic energy reaches the glider, and drag removes energy during the fast climb.',
        ],
        [
          'Which change best lowers peak height for a low ceiling?',
          'Reduce the pull distance',
          ['Use a thicker elastic', 'Remove ballast', 'Launch from a chair'],
          'Less stretch stores less energy and lowers the climb. Raising launch height with aids is prohibited.',
        ],
      ],
      written: [
        [
          'Why do very light gliders not always climb highest?',
          'They reach high speed but lose energy quickly to drag; heavier gliders carry momentum higher.',
          'Drag scales with speed squared and surface, not mass. A heavier glider loses a smaller share of its energy.',
        ],
        [
          'Why should elastic relaxed length be logged?',
          'Elastic length and condition change stored energy, so logging it links launch energy to flight results.',
          'Relaxed elastic length is a required log parameter. It helps match pull distance to ceiling height.',
        ],
        [
          'Why must wings be stiff at launch?',
          'At launch speed, flexible wings flutter or bend, wasting energy and sending the glider off course.',
          'Launch loads are much higher than glide loads. Stiffness keeps the climb straight and efficient.',
        ],
        [
          'How can a team make each launch use the same energy?',
          'Pull the elastic the same distance each time using marks or a fixed arm position, with the same elastic.',
          'Equal stretch gives equal energy. Consistent launches are the basis of consistent flight times. across all five official flights.',
        ],
      ],
      flow: [
        ['Stretch', 'Elastic stores energy.'],
        ['Release', 'Glider gains speed.'],
        ['Climb', 'Speed becomes height, minus drag.'],
      ],
      compare: [
        ['Longer pull', 'Higher climb', 'Ceiling risk.'],
        ['Thicker elastic', 'More energy', 'Higher launch loads.'],
        ['Fresh elastic', 'Consistent energy', 'Must replace often.'],
      ],
      challenge: 'Calculate launch energy and choose a pull for a given ceiling.',
      takeaway: 'Stretch sets energy; drag and stiffness decide how much becomes height.',
      evidence: {
        observations: [
          ['Pull 25 cm', 'Peak 6 m; flight 19 s.'],
          ['Pull 35 cm', 'Peak 9 m; flight 26 s.'],
          ['Pull 45 cm', 'Hit 10 m ceiling; flight 15 s.'],
        ],
        question: 'Which pull should the team use in this room?',
        options: ['About 35 cm', '25 cm', '45 cm'],
        correct: 0,
        explanation:
          'Longer pulls climb higher until the ceiling. The 45 cm pull hit the ceiling and lost time, so about 35 cm gives the best flight.',
      },
    },
    {
      title: 'Trim: the transition from climb to glide',
      objectives: [
        'Explain why a glider must transition from climb to glide.',
        'Use CG, decalage, and asymmetry to trim.',
        'Diagnose common launch and glide problems.',
      ],
      sections: [
        [
          'Two different flights',
          'An elastic glider flies at two very different speeds. It climbs at high speed right after launch, then glides slowly. A trim that glides well wants to pull up hard at launch speed and may loop. A trim that climbs straight at high speed may glide too fast. Good trim makes the glider climb, roll over, and settle into a glide.',
        ],
        [
          'Center of gravity',
          'The center of gravity (CG) must be ahead of the neutral point for pitch stability. Gliders are usually balanced with nose ballast. A CG too far back makes the glider stall and the climb loop; too far forward makes it dive. Find a CG that gives a smooth hand glide first, then adjust launch angle and bank.',
        ],
        [
          'Decalage',
          'Decalage is the difference between the wing’s and stabilizer’s incidence angles. It sets the trimmed glide speed. At launch speed, decalage creates a strong nose-up moment, so the climb tends to curve over. Small changes, such as a thin shim under the stabilizer, adjust the glide; record each one and test with hand glides.',
        ],
        [
          'The roll-out',
          'Many teams launch the glider banked, so it climbs in a curving path instead of looping straight over. As speed drops near the top, the glider rolls level and begins to glide. Small asymmetries, such as a slight wing tip tilt or rudder offset, make the glider turn into its glide circle in the right direction.',
        ],
        [
          'Glide circle',
          'Once gliding, the glider should circle steadily. A small rudder offset or tilted stabilizer starts the turn, and dihedral keeps it from spiraling. Turning the same way as the launch roll keeps the transition smooth. If the circle tightens until the glider spirals down, reduce the turn or add dihedral.',
        ],
        [
          'Reading flights',
          'If the glider loops at launch, launch with more bank or lower the angle. If it stalls repeatedly in the glide, move the CG forward or reduce decalage. If it dives, the opposite. If it spirals in, reduce turn and check for warps. Change one thing at a time and record the result in the flight log. Over time those notes become a troubleshooting guide for every glider the team builds.',
        ],
      ],
      terms: [
        ['Transition', 'Change from fast climb to slow glide.'],
        ['Neutral point', 'CG position where pitch stability vanishes.'],
        ['Decalage', 'Wing incidence minus stabilizer incidence.'],
        ['Banked launch', 'Launch with the wings tilted so the climb curves.'],
        ['Rudder offset', 'Small fin angle that starts a turn.'],
        ['Spiral dive', 'Tightening, descending turn.'],
      ],
      example: [
        'A glider climbs well but loops over at the top and then dives. Suggest a fix.',
        [
          'Looping means the nose-up moment at launch speed is too strong for a straight launch.',
          'Launch with more bank so the climb curves to the side.',
          'If it still loops, reduce decalage slightly and retest the hand glide.',
        ],
        'Bank the launch more, then reduce decalage if needed.',
      ],
      mcq: [
        [
          'A glider loops at launch. What is a first fix?',
          'Launch with more bank',
          ['Add more decalage', 'Pull farther', 'Move CG back'],
          'Banking the launch turns the nose-up tendency into a curving climb, avoiding a loop. over the top.',
        ],
        [
          'A glider repeatedly stalls in the glide. What may help?',
          'Move the CG forward slightly',
          ['Move the CG back', 'Add decalage', 'Launch harder'],
          'A forward CG increases trim speed and stability, reducing stalls. Move it in small steps and recheck the hand glide each time.',
        ],
        [
          'Why should the launch roll and glide circle go the same direction?',
          'The transition is smoother without reversing the turn',
          ['It increases launch energy', 'It is required', 'It reduces mass'],
          'Continuing the same turn means the glider does not have to reverse bank, which wastes height.',
        ],
      ],
      written: [
        [
          'Why does decalage cause a nose-up moment at launch speed?',
          'The pitching moment from decalage grows with speed squared, so it is much larger in the fast climb.',
          'Trim set for slow glide becomes too strong at high speed, which is why launches loop without bank.',
        ],
        [
          'Why test hand glides before elastic launches?',
          'Hand glides show pitch trim at glide speed safely, without the stresses and confusion of a full launch.',
          'Fixing the glide first isolates the problem. Then launch trim can be adjusted separately. with confidence.',
        ],
        [
          'What does a tightening spiral indicate?',
          'Too much turn or too little roll stability; reduce the turn or add dihedral.',
          'Spiral instability makes a turn tighten. Dihedral and less rudder restore a steady circle. and save height.',
        ],
        [
          'Why change one trim setting at a time?',
          'So the effect of each change is clear and can be reversed if it makes things worse.',
          'Controlled changes build reliable trim knowledge and useful log data. They also let a team undo a bad adjustment quickly.',
        ],
      ],
      flow: [
        ['Climb', 'Banked, fast launch.'],
        ['Roll-out', 'Glider levels near the top.'],
        ['Glide', 'Steady, slow circle.'],
      ],
      compare: [
        ['More bank', 'Avoids loops', 'Can lose height.'],
        ['Forward CG', 'Stable, no stall', 'Faster glide.'],
        ['Rudder offset', 'Sets circle', 'Too much spirals.'],
      ],
      challenge: 'Diagnose a launch from its path and suggest one trim change.',
      takeaway: 'Trim the glide first, then shape the launch so the transition is smooth.',
      evidence: {
        observations: [
          ['Launch at 0° bank', 'Glider loops over and dives; 8 s.'],
          ['Launch at 30° bank', 'Climbs in a curve, rolls level; 22 s.'],
          ['Launch at 70° bank', 'Climbs low and spirals; 12 s.'],
        ],
        question: 'What explains the best result?',
        options: [
          'Moderate bank turns the climb without wasting height',
          'Bank always reduces flight time',
          'Steeper bank always climbs higher',
        ],
        correct: 0,
        explanation:
          'No bank loops; too much bank turns the climb sideways and low. A moderate bank curves the climb and allows a clean roll-out into the glide.',
      },
    },
    {
      title: 'Construction: light, stiff, and legal',
      objectives: [
        'Choose materials and shapes for an elastic glider.',
        'Meet the mass window, box, and blunt nose rules.',
        'Build for durability and repeatable trim.',
      ],
      sections: [
        [
          'Materials',
          'Elastic gliders are usually built from balsa, sometimes with carbon fiber reinforcement. Boron is banned. Wings are often solid sheet balsa sanded to an airfoil shape, which is stiff enough for launch loads. The fuselage is a stiff stick with a hook or notch for the elastic. Thin glue joints keep weight down without weakening the structure.',
        ],
        [
          'Launch loads',
          'At launch, the glider accelerates from rest to over 10 m/s in a fraction of a second. The fuselage, wing joint, and tail must survive this force. A cracked joint or bent fuselage changes trim. Reinforce the elastic hook area and wing mount, and check them after every flight, especially after hard landings.',
        ],
        [
          'The blunt nose',
          'The nose must be blunt enough to pass the supervisor’s check, which protects people and property. A rounded nose block or added nose piece also holds ballast and absorbs impacts. Design the nose early, since its mass affects the CG. A glider that fails the nose check cannot fly, regardless of performance.',
        ],
        [
          'Mass window',
          'The glider must weigh more than 3.5 g and less than 10.0 g throughout the flight. Parts may not fall off to change mass. Build a few grams under your target and add ballast to tune balance and mass. Check mass on a scale at the start of the day and bring small ballast pieces for adjustment at check-in.',
        ],
        [
          'Fitting the box',
          'The glider must fit inside the 32.0 × 24.0 × 47.0 cm measurement box. That limits wingspan and length. Using the full allowed span reduces induced drag and improves glide ratio, but long wings must stay stiff. Check box fit with the final configuration, including any nose piece and fin, before competition day.',
        ],
        [
          'Repeatable shape',
          'Warps change trim. Store gliders in a rigid box away from heat and humidity, and build matching wings with templates. Mark the wing, stabilizer, and fin positions so they can be reset after a hard landing. Bring a second glider trimmed to the same settings, so a break does not end the flight period. Label each glider and keep its trim notes with it, so the backup can be flown with the right settings at once.',
        ],
      ],
      terms: [
        ['Sheet balsa wing', 'Solid balsa wing shaped to an airfoil.'],
        ['Elastic hook', 'Notch or hook where the elastic engages.'],
        ['Blunt nose', 'Rounded nose required for safety.'],
        ['Ballast', 'Added mass to set balance and mass.'],
        ['Template', 'Pattern for building matching parts.'],
        ['Launch load', 'Large force during elastic acceleration.'],
      ],
      example: [
        'A glider weighs 3.4 g and its CG is behind the target. What should the team do?',
        [
          'It is below the 3.5 g minimum; add at least 0.2 g for margin.',
          'Place that ballast in the nose to move the CG forward.',
          'Recheck mass, balance, and hand glide.',
        ],
        'Add about 0.2–0.3 g of nose ballast to fix both problems.',
      ],
      mcq: [
        [
          'Which material is banned?',
          'Boron',
          ['Balsa', 'Carbon fiber', 'Plastic film'],
          'The rules prohibit boron. Balsa and carbon fiber are common, allowed materials. for gliders at every level.',
        ],
        [
          'Why reinforce the elastic hook area?',
          'It carries the large launch force',
          ['It adds lift', 'It reduces drag', 'It is required by rule'],
          'The elastic pulls on the hook with a large force at launch. A weak hook cracks and changes trim.',
        ],
        [
          'A glider loses a ballast piece during flight, dropping to 3.3 g. What is the issue?',
          'Mass must stay within limits throughout the flight',
          ['No issue', 'Only check-in mass counts', 'The flight is doubled'],
          'Mass must be more than 3.5 g and less than 10.0 g throughout the flight, so ballast must be secure.',
        ],
      ],
      written: [
        [
          'Why build under the target mass and add ballast?',
          'Ballast lets teams fine-tune both total mass and CG, and adjust for scale differences.',
          'Building slightly light gives flexibility. Ballast placed at the nose also improves balance. in most designs.',
        ],
        [
          'Why design the nose early?',
          'Its shape must pass the blunt nose check, and its mass strongly affects the CG.',
          'A nose added late can change balance and trim. Planning it early keeps the glider legal and stable.',
        ],
        [
          'What should be checked after a hard landing?',
          'Wing and tail positions, warps, fuselage straightness, the elastic hook, and secured ballast.',
          'Damage changes trim. A quick check and hand glide prevent a wasted official flight. after a crash.',
        ],
        [
          'Why must long wings stay stiff?',
          'Flexing at launch speed causes flutter and erratic climbs, and bending changes the glide trim.',
          'Long spans reduce induced drag only if the wing keeps its shape under launch and glide loads.',
        ],
      ],
      flow: [
        ['Design', 'Fit box and mass window.'],
        ['Build', 'Stiff, reinforced, templated parts.'],
        ['Check', 'Nose, mass, and box before flying.'],
      ],
      compare: [
        ['Sheet balsa wing', 'Stiff, simple', 'Heavier than framed.'],
        ['Carbon reinforcement', 'Very stiff', 'Harder to repair.'],
        ['Nose ballast', 'Fixes CG and mass', 'Must be secure.'],
      ],
      challenge: 'Plan a glider that is legal, stiff, and easy to re-trim.',
      takeaway: 'A legal, stiff, well-marked glider keeps its trim through many launches.',
      evidence: {
        observations: [
          ['Flights 1–4', '22–24 s each.'],
          ['Flight 5', 'Hard landing on nose.'],
          ['Flights 6–8', '9–12 s; glider veers right at launch.'],
        ],
        question: 'What should the team check first?',
        options: [
          'Wing and tail alignment after the hard landing',
          'The flight log',
          'The room’s ceiling',
        ],
        correct: 0,
        explanation:
          'Flight times dropped right after the hard landing and the glider now veers. A shifted wing or tail is the most likely cause.',
      },
    },
    {
      title: 'Launch technique and the ceiling',
      objectives: [
        'Choose launch angle, bank, and pull for a room.',
        'Use the launch handle safely and legally.',
        'Adapt launches to ceiling height and obstacles.',
      ],
      sections: [
        [
          'Launch angle',
          'Most launches aim steeply upward, often 60 to 80 degrees, so the glider gains height quickly. Too steep and the glider may stall at the top before rolling out. Too shallow and it travels sideways, losing potential height. Practice a consistent angle, and record it with bank and pull in the flight log as extra parameters.',
        ],
        [
          'Using the handle',
          'The launch handle extends the student’s reach, raising the launch point and making the stretch consistent. It must be under 1 m long, not counting the elastic, and held entirely by one student. Students must launch standing on the floor; standing on chairs or using other height aids is not allowed. Keep elastic and fingers clear of faces.',
        ],
        [
          'Ceiling height',
          'Tournament officials announce the room’s approximate length, width, and ceiling height in advance. A glider that hits the ceiling loses speed and height and may fall into a stall. In a low room, reduce the pull or launch with more bank. In a tall room, use more energy and aim steeper to reach greater height.',
        ],
        [
          'Obstacles',
          'Lights, beams, basketball hoops, and banners can catch gliders. Watch other teams’ flights to see where obstacles and drafts are. Choose a launch spot where the circle stays clear. If a glider lands on a beam, it may be lost, so having a second glider ready keeps the flight period alive.',
        ],
        [
          'Collisions and re-flights',
          'Several teams may fly at once. Timers may delay a launch to avoid a collision. If gliders collide, a team may choose a re-flight after the glider lands, and that re-flight is not limited by the 6-minute period. Fly where your circle will not overlap others, and yield to official flights when making trim flights.',
        ],
        [
          'Building a routine',
          'A consistent routine makes consistent flights: check the glider, load the elastic, pull to the mark, set angle and bank, and release smoothly without twisting the wrist. Practice the routine until it is automatic. Under competition pressure, a well-rehearsed routine keeps the launch the same as in practice. Practice in different rooms when possible, and rehearse the full sequence with a teammate timing, so a new space and a stopwatch do not change how you launch.',
        ],
      ],
      terms: [
        ['Launch angle', 'Angle above horizontal at release.'],
        ['Launch bank', 'Wing tilt at release.'],
        ['Ceiling hit', 'Contact with the ceiling that wastes height.'],
        ['Re-flight', 'Repeat allowed after a collision.'],
        ['Launch routine', 'Rehearsed sequence of steps for each launch.'],
        ['Height aid', 'Prohibited device that raises launch position.'],
      ],
      example: [
        'In practice, a 35 cm pull reaches 9 m. Competition ceiling is 7.5 m. Estimate a starting pull, assuming height scales with energy.',
        [
          'Height ∝ energy ∝ pull², so pull ∝ √height.',
          'New pull ≈ 35 × √(7.0 ÷ 9) ≈ 35 × 0.88 ≈ 31 cm, aiming 0.5 m below the ceiling.',
          'Test with a trim flight and adjust.',
        ],
        'Start near 31 cm, then fine-tune with a trim flight.',
      ],
      mcq: [
        [
          'Which launch method is NOT allowed?',
          'Standing on a chair to launch',
          ['Using a 90 cm handle', 'Banking the launch', 'Launching from the floor'],
          'Students must be on the floor, and artificial aids other than the launch handle may not raise launch height.',
        ],
        [
          'Two gliders collide. What may the team do?',
          'Elect a re-flight after the glider lands',
          ['Nothing', 'Add 5 seconds', 'Score the longer flight twice'],
          'In a collision, the team may choose a re-flight, decided after landing, and it is not limited by the 6-minute period.',
        ],
        [
          'Why aim the climb slightly below the ceiling?',
          'Hitting the ceiling wastes height and speed',
          ['Ceilings add drag', 'It is required', 'It increases launch energy'],
          'A ceiling hit stops the climb abruptly and can stall the glider. Peaking just below gives the most height.',
        ],
      ],
      written: [
        [
          'How should a team adjust for a lower ceiling?',
          'Reduce the pull distance or add bank so the glider peaks just below the ceiling.',
          'Less energy or a curving climb keeps the glider from hitting the ceiling while still using most of the room.',
        ],
        [
          'Why watch other flights before launching?',
          'To find drafts and obstacles like beams and lights, and choose a launch spot that avoids them.',
          'Room conditions differ from practice. Scouting prevents lost gliders and short flights. in an unfamiliar room.',
        ],
        [
          'Why rehearse a launch routine?',
          'A practiced sequence makes each launch the same, giving consistent flights under pressure.',
          'Consistency drives the three-flight total. Routine reduces mistakes caused by nerves. during official flights at a tournament.',
        ],
        [
          'What safety practices apply to the launch handle?',
          'One student holds it, it is under 1 m, the elastic stays attached, and fingers and faces stay clear.',
          'The rules require a safe configuration. Elastic that slips can hurt people and ends timing.',
        ],
      ],
      flow: [
        ['Scout', 'Ceiling, obstacles, drafts.'],
        ['Set', 'Pull, angle, and bank.'],
        ['Launch', 'Routine release from the floor.'],
      ],
      compare: [
        ['Steep launch', 'Maximum height', 'Stall risk at top.'],
        ['More bank', 'Avoids loops and ceilings', 'Less height.'],
        ['Shorter pull', 'Safe in low rooms', 'Lower climb.'],
      ],
      challenge: 'Plan launch settings for a room with a 7 m ceiling.',
      takeaway: 'Scout the room, match energy to the ceiling, and launch the same way every time.',
      evidence: {
        observations: [
          ['Practice room', '12 m ceiling; best pull 40 cm.'],
          ['Competition room', '6 m ceiling with beams at 5.5 m.'],
          ['First trim flight', '40 cm pull; glider hit a beam.'],
        ],
        question: 'What should the team change?',
        options: [
          'Reduce pull and launch away from the beams',
          'Pull farther',
          'Use a thinner wing',
        ],
        correct: 0,
        explanation:
          'The practice pull is far too strong for a 6 m room with beams. Less energy and a clear launch spot keep the glider below the beams.',
      },
    },
    {
      title: 'The flight log and competition day',
      objectives: [
        'Build a complete flight log with four parameters.',
        'Use log data to predict competition settings.',
        'Run check-in and the flight period smoothly.',
      ],
      sections: [
        [
          'Flight log requirements',
          'A complete flight log contains data from at least 10 test flights before the competition, with four or more parameters. Three are required: estimated or recorded peak flight height after launch, approximate relaxed length of the elastic, and flight time. Teams add at least one more, such as launch pitch, launch roll, or elastic stretch. Choose parameters that you will actually use when deciding how to launch in a new room.',
        ],
        [
          'Why the log matters',
          'A complete log multiplies every flight by 1.2, a 20 percent bonus applied to the three-flight total. Beyond the bonus, the log is a dataset. Graphing flight time against pull or peak height shows the best settings for each ceiling, and notes on trim changes show what fixed past problems. Keep entries neat and dated.',
        ],
        [
          'Estimating peak height',
          'Peak height can be estimated by comparing the glider with known heights, such as wall markings or ceiling height, or measured from video using a reference object. Consistent methods matter more than perfect accuracy. Recording peak height with pull and time shows whether a short flight came from a low climb or a poor glide.',
        ],
        [
          'Check-in',
          'At check-in, present gliders in measurement boxes, the launch handle, and the flight log. Remove the glider so it can be weighed, and adjust with ballast if needed. The supervisor collects the handle and returns it to start the 6-minute period. Only participants should handle gliders or boxes.',
        ],
        [
          'Using six minutes',
          'A good plan is a quick trim flight to check the room, then official flights while the glider is trimmed. Since three of five count, start official flights early to leave time for spares. Declare every flight. Teams receive no extra time for repairs, so a second trimmed glider is valuable. Keep a stopwatch or timer visible to the launcher so no one loses track of the remaining minutes.',
        ],
        [
          'After the flights',
          'If asked, participants must demonstrate the launch and the supervisor may recheck the handle and glider mass. Review recorded times with the supervisor before leaving. Teams filing an appeal must leave the gliders, handle, boxes, and log in the event area. Afterward, add competition flights to your log for the next tournament.',
        ],
      ],
      terms: [
        ['Peak flight height', 'Highest point after launch; a required log parameter.'],
        ['Relaxed elastic length', 'Elastic length when not stretched; required parameter.'],
        ['Additional parameter', 'At least one extra, e.g., launch pitch or roll.'],
        ['Complete log', '10+ flights, 4+ parameters; ×1.2 bonus.'],
        ['Partial log', 'Incomplete log; ×1.1 bonus.'],
        ['Re-check', 'Supervisor may recheck mass and handle after flights.'],
      ],
      example: [
        'A team has five official flights in 6 minutes. After a trim flight, it plans official flights. Its first three are 21, 23, and 8 s (a beam hit). How should it use the remaining two?',
        [
          'Current best three: 23 + 21 + 8 = 52 s.',
          'Two more flights near 22 s would replace the 8 s and add a tiebreaker.',
          'Adjust to avoid the beam, then fly both remaining official flights.',
        ],
        'Fix the beam problem, then use both spare flights to replace the 8 s flight.',
      ],
      mcq: [
        [
          'Which is a required flight log parameter?',
          'Approximate relaxed elastic length',
          ['Glider color', 'Room temperature', 'Wing camber'],
          'The three required parameters are peak height, relaxed elastic length, and flight time. Teams add at least one more.',
        ],
        [
          'How many test flights must a complete log include?',
          '10 or more',
          ['3', '5', '20'],
          'A complete log needs at least 10 test flights before the competition with four or more parameters.',
        ],
        [
          'Why start official flights early in the period?',
          'To leave time for spare flights in case some are poor',
          ['Early flights score double', 'Late flights are not timed', 'It is required'],
          'Three of up to five flights count. Starting early leaves room to replace a bad flight.',
        ],
      ],
      written: [
        [
          'How can peak height be estimated consistently?',
          'Compare with known heights like the ceiling or wall marks, or use video with a reference object, the same way each time.',
          'A consistent method makes data comparable across flights, which is more useful than occasional precise measurements.',
        ],
        [
          'Why record peak height with flight time?',
          'It separates launch problems from glide problems: low peaks mean launch issues, short glides from good peaks mean trim issues.',
          'Two numbers locate the problem. This guides whether to change pull or trim. on the next flight.',
        ],
        [
          'Why is a second trimmed glider valuable?',
          'Teams get no extra time for repairs; a ready backup keeps official flights going if one glider breaks.',
          'The 6-minute period is short. A trimmed spare protects the score from a single break.',
        ],
        [
          'What should teams do with competition flight data?',
          'Add it to the flight log to improve predictions for the next room and tournament.',
          'Competition rooms differ from practice. Each tournament adds valuable data for future settings. and future rooms.',
        ],
      ],
      flow: [
        ['Log', '10+ flights, 4+ parameters.'],
        ['Check in', 'Box, mass, handle, log.'],
        ['Fly', 'Trim, then official flights early.'],
      ],
      compare: [
        ['Complete log', '×1.2 bonus and data', 'Takes practice time.'],
        ['Partial log', '×1.1 bonus', 'Loses 10 percent.'],
        ['Video heights', 'Accurate peaks', 'Needs a reference.'],
      ],
      challenge: 'Design a flight log page and fill it with 10 test flights.',
      takeaway: 'Log carefully, check in prepared, and use spare official flights wisely.',
      evidence: {
        observations: [
          ['Flight 4', 'Peak 9 m, time 12 s.'],
          ['Flight 5', 'Peak 4 m, time 13 s.'],
          ['Flight 6', 'Peak 9 m, time 24 s after reducing rudder offset.'],
        ],
        question: 'What does the log show about Flight 4?',
        options: [
          'It had a good launch but a poor glide trim',
          'It had a poor launch',
          'The elastic was worn out',
        ],
        correct: 0,
        explanation:
          'Flight 4 reached full height but flew briefly, so the problem was the glide. Reducing rudder offset in Flight 6 kept the height and doubled the time.',
      },
    },
  ],
});
