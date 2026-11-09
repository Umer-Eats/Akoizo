import { buildEventCourse } from './build-course-kit.ts';

// Hovercraft (2027), one course per division. The divisions differ only in the Target Time range.
function hovercraft(division: 'B' | 'C') {
  const r =
    division === 'B'
      ? { tt: '6.0–18.0', max: 18, prefix: 'hovb' }
      : { tt: '6.0–26.0', max: 26, prefix: 'hov' };
  const ts = (t: number, tt: number) => Math.max(0, 40 * (1 - Math.abs(t - tt) / tt)).toFixed(2);
  return buildEventCourse({
    eventId: 'hovercraft',
    eventName: 'Hovercraft',
    prefix: r.prefix,
    division,
    intro: `Seven units cover how an air-cushion vehicle lifts, moves, and stops on time while carrying nickels down a 185 cm track. The ${division} Target Time falls between ${r.tt} s. Each unit links the physics to the score: Distance, Time, and Mass Scores out of 100 per run.`,
    references: [
      {
        title: 'Science Olympiad: Hovercraft',
        url: `https://www.soinc.org/hovercraft-${division.toLowerCase()}`,
      },
      {
        title: 'NASA Glenn: Newton’s Laws of Motion',
        url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/newtons-laws-of-motion/',
      },
    ],
    units: [
      {
        title: 'Scoring a run: Distance, Time, and Mass',
        objectives: [
          'Calculate Distance, Time, and Mass Scores for complete and incomplete runs.',
          'Explain how the ramp and penalties change a run score.',
          'Decide how many nickels to carry.',
        ],
        sections: [
          [
            'The run score',
            'Each run earns Run Score = DS + TS + MS, and the Final Score is the best run. A complete run, where the dowel crosses the finish line within twice the Target Time without stalling for 3 seconds, earns the full Distance Score of 40. The Time Score can add up to 40 more, and the Mass Score up to 20, so a perfect run scores 100.',
          ],
          [
            'Time Score',
            `At the start of competition, every team gets the same Target Time (TT), between ${r.tt} seconds. For a complete run, TS = 40 × (1 − |runtime − TT| ÷ TT), never below zero. Missing by 10 percent of TT costs 4 points. Being early and being late are penalized equally, so the goal is accuracy, not speed. An incomplete run earns no Time Score at all.`,
          ],
          [
            'Incomplete runs',
            'A run is incomplete if the vehicle stops moving for 3 seconds before the finish, or if the dowel has not crossed the finish within 2 × TT. The supervisor measures how far the dowel is from the finish. Distance Score becomes 40 × (185 − d) ÷ 185, so a vehicle stopping 37 cm short earns 32. Teams cannot declare a run incomplete themselves.',
          ],
          [
            'Mass Score',
            'MS = (4R + 0.1N) × (185 − d) ÷ 185, where R is the number of nickel rolls (a half roll counts 0.5) and N is the number of loose nickels. The supervisor provides 4 full rolls, 1 half roll, and 20 loose nickels. Carrying all of them gives 4 × 4.5 + 0.1 × 20 = 20, the maximum. Anything that falls off during the run does not count.',
          ],
          [
            'The ramp',
            'Teams may launch from a supervisor-provided ramp, 5 cm high and 41 cm long, that ends 4 cm behind the start line. The ramp gives the vehicle a running start, but a ramp run has its Distance Score multiplied by 0.5 and its Mass Score set to 0. It can rescue a weak vehicle, but it caps a run at about 60 points.',
          ],
          [
            'Penalties and ties',
            'Each construction violation during a run multiplies DS, TS, and MS by 0.8, each competition violation by 0.9, and missing impound by 0.7. If anything falls off the vehicle, the run takes one construction penalty. Touching the vehicle during a run makes DS, TS, and MS all zero. Ties are broken first by the best Time Score over all runs.',
          ],
        ],
        terms: [
          ['Target Time (TT)', `The run time every team aims for, set between ${r.tt} s.`],
          [
            'Distance Score (DS)',
            '40 for a complete run, prorated by distance for an incomplete one.',
          ],
          ['Time Score (TS)', '40 × (1 − |t − TT|/TT) for complete runs; 0 if incomplete.'],
          ['Mass Score (MS)', '(4R + 0.1N) prorated by distance; up to 20.'],
          ['Incomplete run', 'Stalls 3 s or fails to finish within 2 × TT.'],
          ['Construction violation', 'A rule break that multiplies the run’s scores by 0.8.'],
        ],
        example: [
          'TT is 12.0 s. A vehicle carries 3 rolls and 10 loose nickels and finishes in 13.2 s with nothing falling off. Find the run score.',
          [
            'DS = 40 (complete run).',
            `TS = 40 × (1 − 1.2/12.0) = ${ts(13.2, 12)}.`,
            'MS = (4 × 3 + 0.1 × 10) × 185/185 = 13.',
          ],
          `Run score = 40 + ${ts(13.2, 12)} + 13 = ${(40 + Number(ts(13.2, 12)) + 13).toFixed(2)}.`,
        ],
        mcq: [
          [
            'TT is 10.0 s and the run takes 8.0 s. What is the Time Score?',
            '32',
            ['8', '40', '20'],
            'TS = 40 × (1 − |8.0 − 10.0| ÷ 10.0) = 40 × 0.8 = 32. Finishing early is penalized exactly like finishing late, by the fractional error.',
          ],
          [
            'Which load gives the maximum Mass Score of 20?',
            'All 4 rolls, the half roll, and 20 loose nickels',
            ['4 full rolls only', '20 loose nickels only', 'The half roll and 20 loose nickels'],
            'MS = 4R + 0.1N. With R = 4.5 (four rolls plus a half) and N = 20, MS = 18 + 2 = 20. Four rolls alone give only 16.',
          ],
          [
            'A team uses the ramp and finishes exactly on TT carrying 2 rolls. What is the run score?',
            '60',
            ['100', '80', '48'],
            'With the ramp, DS is halved to 20 and MS becomes 0. A perfect time still gives TS = 40. The run score is 20 + 40 + 0 = 60.',
          ],
        ],
        written: [
          [
            'A run is incomplete with the dowel 74 cm from the finish. Find the Distance Score.',
            'DS = 40 × (185 − 74) ÷ 185 = 40 × 0.6 = 24.',
            'Incomplete runs are prorated by the fraction of the 185 cm track covered. Here 111 of 185 cm is 60 percent, so DS is 24 and TS is 0.',
          ],
          [
            'Why can carrying more nickels lower your score even though Mass Score rises?',
            'More mass slows the vehicle and can make it stall or drop nickels, causing an incomplete run with TS = 0, a smaller DS, and a penalty.',
            'Mass Score is worth at most 20, but Time and Distance Scores are worth 80. If extra load risks completion or timing, it can cost far more than it earns.',
          ],
          [
            'Explain why an early finish is not better than a late one.',
            'TS depends on the absolute difference |t − TT|, so 1 s early and 1 s late give the same score.',
            'The absolute value makes the formula symmetric. The aim is to arrive as close to TT as possible, not to be fast.',
          ],
          [
            'What happens if a team member touches the vehicle during a run?',
            'The run counts as complete but DS, TS, and MS are all zero, so it scores nothing.',
            'Touching or interfering with the vehicle zeroes all three scores for that run, and it still uses up one of the two allowed runs.',
          ],
        ],
        flow: [
          ['Complete', 'Finish within 2 × TT without a 3 s stall: DS = 40.'],
          ['On time', 'TS rewards accuracy against TT.'],
          ['Carry', 'MS adds up to 20 for nickels that stay on.'],
        ],
        compare: [
          ['Flat launch', 'Full DS and MS available', 'Vehicle must accelerate itself.'],
          ['Ramp launch', 'Easier start', 'DS × 0.5 and MS = 0.'],
          ['Heavy load', 'Up to 20 MS', 'Slower; risks dropped nickels.'],
        ],
        challenge: 'Find the load and run time that maximize your expected score.',
        takeaway: 'Finish every run, then chase time accuracy; nickels are the last 20 points.',
        evidence: {
          observations: [
            ['Run plan A', 'No nickels, typical error 0.3 s at TT = 12 s, always completes.'],
            ['Run plan B', 'All nickels, typical error 0.6 s, completes 9 times in 10.'],
            ['Run plan C', 'All nickels with ramp, error 0.2 s.'],
          ],
          question: 'Which plan gives the highest expected score?',
          options: ['Plan B', 'Plan A', 'Plan C'],
          correct: 0,
          explanation: `Plan A: 40 + ${ts(12.3, 12)} + 0 ≈ ${(40 + Number(ts(12.3, 12))).toFixed(0)}. Plan B: 40 + ${ts(12.6, 12)} + 20 ≈ ${(60 + Number(ts(12.6, 12))).toFixed(0)} when it completes, still far ahead even with a rare failure. Plan C: 20 + ${ts(12.2, 12)} + 0 ≈ ${(20 + Number(ts(12.2, 12))).toFixed(0)}.`,
        },
      },
      {
        title: 'Levitation: the air cushion and the skirt',
        objectives: [
          'Relate cushion pressure to vehicle weight and footprint area.',
          'Compare skirt designs and their leakage.',
          'Explain why lift and thrust compete for the same power.',
        ],
        sections: [
          [
            'Floating on pressure',
            'A hovercraft rises because a lift fan pumps air under the hull faster than it escapes. The trapped air raises pressure slightly above atmospheric. That extra pressure times the cushion area must equal the vehicle’s weight: P = W ÷ A. A vehicle weighing 9.8 N (1 kg) over a 30 × 30 cm cushion needs only about 109 Pa, roughly one-thousandth of atmospheric pressure.',
          ],
          [
            'Why area helps',
            'Because required pressure is weight divided by area, a larger footprint floats the same vehicle on lower pressure. Lower pressure leaks less air through the gap at the edge, so the fan does less work. The vehicle must fit in a 40 × 40 × 40 cm box when levitated and run in a 45 cm wide track, so most teams use nearly the full footprint allowed.',
          ],
          [
            'The skirt',
            'A skirt is a flexible curtain around the cushion that holds air in while letting the vehicle ride over bumps. A bag skirt inflates into a tube; a finger or segmented skirt uses many small pockets that each conform to the surface. Plastic sheet, such as a trash bag or shower curtain, is common. The skirt should touch lightly; dragging hard creates friction.',
          ],
          [
            'Leakage and hover gap',
            'Air escapes through the gap between skirt and floor. Leak rate grows with the gap length around the perimeter and with the square root of cushion pressure. A smooth, even skirt keeps the gap small and uniform. If one side leaks more, the vehicle tilts and drifts toward it, so check that the craft sits level and centered with the motors running.',
          ],
          [
            'Testing levitation',
            'The rules require the vehicle to levitate on a cushion of air, and the supervisor may push it down slightly to see it rise. Contact with the track surface or the inside of the rails is allowed, but not the top or outside of the rails. A simple test at home: with lift running, the vehicle should glide a long way after a gentle push.',
          ],
          [
            'Sharing power',
            'Teams may use up to two motors, and all lift and thrust must come from air pressure. Some designs use one fan for lift and another for thrust; others split one fan’s flow between cushion and rear duct. A separate lift fan lets you set lift and thrust independently, which makes timing calibration easier, but adds motor and battery mass.',
          ],
        ],
        terms: [
          ['Cushion pressure', 'Pressure above atmospheric under the hull; equals weight ÷ area.'],
          ['Footprint', 'The area of the air cushion under the vehicle.'],
          ['Skirt', 'Flexible curtain that contains the cushion air.'],
          ['Hover gap', 'Small opening between skirt and surface where air escapes.'],
          ['Lift fan', 'Fan that pumps air into the cushion.'],
          ['Pascal (Pa)', 'Unit of pressure: one newton per square metre.'],
        ],
        example: [
          'A hovercraft with nickels weighs 1.6 kg and has a 0.35 m × 0.35 m cushion. What cushion pressure is needed?',
          [
            'Weight = 1.6 × 9.8 ≈ 15.7 N.',
            'Area = 0.35 × 0.35 = 0.1225 m².',
            'P = 15.7 ÷ 0.1225 ≈ 128 Pa.',
          ],
          'About 128 Pa above atmospheric, which a small fan can supply easily if leaks are controlled.',
        ],
        mcq: [
          [
            'If cushion area doubles and weight stays the same, the required pressure:',
            'Halves',
            ['Doubles', 'Stays the same', 'Quadruples'],
            'Required pressure equals weight divided by area. Doubling the area halves the pressure, which also reduces leakage and fan power.',
          ],
          [
            'A hovercraft drifts toward its left rail while hovering in place. A likely cause is:',
            'More air leaking on the left side of the skirt',
            [
              'Too much nickel mass on the right',
              'Battery voltage too high',
              'The dowel is too tall',
            ],
            'Uneven leakage lowers pressure on the leaking side, so the craft tilts and slides that way. Checking skirt contact and balance usually fixes it.',
          ],
          [
            'Which contact with the track is NOT allowed?',
            'The top of the side rails',
            [
              'The track surface',
              'The inside edge of the rails',
              'Gentle skirt contact with the floor',
            ],
            'Contact with the track surface and the inside rail edges is permitted. Vehicle components may not touch the top or outside edges of the rails.',
          ],
        ],
        written: [
          [
            'Explain in your own words why a hovercraft floats.',
            'A fan pushes air under the hull faster than it escapes, raising the pressure; that small extra pressure acting over the whole cushion area pushes up with a force equal to the weight.',
            'Force equals pressure times area. Strong answers mention both the pressure difference and the large area, which is why a small pressure can lift the vehicle.',
          ],
          [
            'Why does a larger footprint reduce the fan power needed?',
            'It lowers the required cushion pressure, and leakage through the hover gap drops at lower pressure, so the fan moves less air against less pressure.',
            'Power depends on airflow and pressure. A bigger footprint lowers pressure, which reduces both escape speed and the work per unit of air.',
          ],
          [
            'Give one advantage and one disadvantage of a separate lift fan.',
            'Advantage: lift and thrust can be tuned independently. Disadvantage: the extra motor, fan, and batteries add mass.',
            'Any reasonable pairing works. Independent control helps timing; added mass and power draw are the usual costs.',
          ],
          [
            'How can the supervisor test whether a vehicle is levitating?',
            'By pressing the vehicle slightly downward; if it rises again on its own, it is supported by the air cushion.',
            'The rule describes a push-down test: a levitating vehicle springs back up because the cushion pressure supports it.',
          ],
        ],
        flow: [
          ['Pump', 'Lift fan pushes air under the hull.'],
          ['Contain', 'Skirt holds air, raising pressure.'],
          ['Lift', 'Pressure × area balances weight.'],
        ],
        compare: [
          ['Bag skirt', 'Inflated tube seals the edge', 'Can bounce or tip on bumps.'],
          ['Segmented skirt', 'Pockets conform to the surface', 'More work to build evenly.'],
          ['No skirt (rigid hull)', 'Simple and light', 'Large leaks need a powerful fan.'],
        ],
        challenge: 'Find the smallest cushion pressure that still lifts a fully loaded vehicle.',
        takeaway: 'Lift is pressure times area: big, even, well-sealed cushions float easily.',
        evidence: {
          observations: [
            ['Empty test', 'Vehicle glides freely across the floor with lift on.'],
            ['With all nickels', 'Rear skirt drags and the craft stops quickly.'],
            ['Nickels moved forward 6 cm', 'Glides freely again, sitting level.'],
          ],
          question: 'What caused the drag with the full load?',
          options: [
            'The load sat too far back, tilting the craft and compressing the rear skirt',
            'The fan was too strong',
            'The track was too wide',
          ],
          correct: 0,
          explanation:
            'Moving the same mass forward fixed it, so the total weight was not the problem. A rear-heavy load tilted the hull, raising the gap at the front and pushing the rear skirt into the floor.',
        },
      },
      {
        title: 'Thrust, friction, and motion down the track',
        objectives: [
          'Apply Newton’s second law to a hovercraft run.',
          'Describe how drag and skirt friction shape the speed profile.',
          'Predict run time from acceleration and top speed.',
        ],
        sections: [
          [
            'Newton’s laws',
            'A thrust fan pushes air backward, and by Newton’s third law the air pushes the vehicle forward. The net force is thrust minus drag and skirt friction, and by Newton’s second law acceleration equals net force divided by mass. Heavier loads mean slower acceleration for the same thrust, which is why adding nickels changes your run time.',
          ],
          [
            'Low friction is the point',
            'Floating on air removes most rolling and sliding friction, so even a small thrust accelerates the vehicle. That also means the vehicle has little to slow it, and a gentle tilt in the floor can speed it up or slow it down. Small surface differences matter, which is why tournaments describe their track surface ahead of time.',
          ],
          [
            'Starting and the timed zone',
            'The vehicle starts fully behind the start line, held by the supervisor’s wood block until the countdown ends. Timing starts when the dowel crosses the start line and stops when it crosses the finish 185 cm later. Starting farther back gives the vehicle more distance to accelerate before timing starts, so your start position is a tuning variable.',
          ],
          [
            'Speed profile',
            'A vehicle that keeps accelerating crosses the timed zone faster and faster. One with significant drag approaches a terminal speed where thrust equals drag. For timing, a steady speed through the zone is easiest to predict: average speed equals 185 cm divided by run time, so a 12 s target needs about 15.4 cm/s on average. Measuring speed at a few points along a practice track shows whether your vehicle is still accelerating inside the timed zone.',
          ],
          [
            'Staying straight',
            'The track is only 45 cm wide, and rails stop sideways drift. A vehicle that scrapes the rails loses speed unpredictably, which ruins timing, because each run touches the rails differently. Align the thrust line through the center of mass, balance the load side to side, and use smooth bumpers or rounded corners so any rail contact is light and consistent.',
          ],
          [
            'Stopping',
            'There is a cushioned barrier at least 5 cm past the finish. Timing ends at the finish line, so the vehicle does not need to stop on its own, but it must not stall before the line. A vehicle moving too slowly near the end risks a 3-second stall, which makes the run incomplete.',
          ],
        ],
        terms: [
          ['Thrust', 'Forward force from pushing air backward.'],
          ['Net force', 'Thrust minus drag and friction; sets acceleration.'],
          ['Acceleration', 'Rate of change of velocity, a = F_net/m.'],
          ['Terminal speed', 'Speed at which drag equals thrust and acceleration stops.'],
          ['Average speed', 'Distance divided by time; 185 cm ÷ run time here.'],
          ['Center of mass', 'Balance point of the loaded vehicle.'],
        ],
        example: [
          'A hovercraft must cross 185 cm in 12.0 s at steady speed. It enters the timed zone already at speed. What speed is required, and how does adding 0.2 kg affect it?',
          [
            'Average speed = 185 cm ÷ 12.0 s ≈ 15.4 cm/s.',
            'Extra mass lowers acceleration from the same thrust (a = F/m).',
            'At steady speed drag balances thrust, but the vehicle reaches that speed more slowly and skirt friction may rise.',
          ],
          'Recalibrate thrust whenever you change the load; the same setting gives a slower run with more nickels.',
        ],
        mcq: [
          [
            'Thrust is 0.30 N, friction and drag total 0.10 N, and mass is 1.0 kg. What is the acceleration?',
            '0.20 m/s²',
            ['0.30 m/s²', '0.40 m/s²', '0.10 m/s²'],
            'Net force is 0.30 − 0.10 = 0.20 N. Acceleration = net force ÷ mass = 0.20 ÷ 1.0 = 0.20 m/s².',
          ],
          [
            'Why can starting farther behind the start line shorten the timed run?',
            'The vehicle builds speed before timing begins',
            [
              'The track is shorter',
              'The supervisor starts timing later',
              'It reduces vehicle mass',
            ],
            'Timing starts when the dowel crosses the start line. Extra run-up distance lets the vehicle accelerate first, so it crosses the timed 185 cm faster.',
          ],
          [
            'What average speed is needed for a run time of 18.5 s?',
            '10 cm/s',
            ['18.5 cm/s', '1 cm/s', '3.4 cm/s'],
            'Average speed is distance over time: 185 cm ÷ 18.5 s = 10 cm/s through the timed zone.',
          ],
        ],
        written: [
          [
            'Explain how a fan produces forward thrust, using Newton’s third law.',
            'The fan pushes air backward; the air pushes the fan, and so the vehicle, forward with an equal and opposite force.',
            'Action and reaction act on different objects: the fan pushes air backward, and the air pushes the fan forward. Answers should name both forces.',
          ],
          [
            'Why does rail scraping hurt Time Score more than it hurts Distance Score?',
            'Scraping adds unpredictable friction that changes run time between runs, while the vehicle usually still finishes, so DS stays 40 but accuracy drops.',
            'Distance Score only needs the vehicle to finish. Time Score needs the same run time every run, and inconsistent rail friction destroys that repeatability.',
          ],
          [
            'Describe one way to keep a hovercraft running straight.',
            'Align the thrust line with the center of mass and balance the load left to right so there is no turning moment.',
            'An off-center thrust or load creates a turning moment. Balance, alignment, or smooth bumpers are all valid answers.',
          ],
          [
            'Why is a vehicle that barely reaches the finish risky?',
            'If it slows almost to a stop it can stall for 3 seconds or exceed 2 × TT, making the run incomplete with no Time Score.',
            'Incomplete runs lose TS entirely and prorate DS and MS. A margin of speed protects completion.',
          ],
        ],
        flow: [
          ['Release', 'Block removed; thrust accelerates the vehicle.'],
          ['Cross start', 'Timing begins at the dowel.'],
          ['Cross finish', 'Timing ends 185 cm later.'],
        ],
        compare: [
          ['Long run-up', 'Higher speed in zone', 'Less control of slow targets.'],
          [
            'Short run-up',
            'Slower entry for long targets',
            'Acceleration affects the timed portion.',
          ],
          ['Heavier load', 'More Mass Score', 'Lower acceleration.'],
        ],
        challenge: 'Predict the run time for a given thrust, mass, and start distance.',
        takeaway:
          'F = ma on an air cushion: small forces matter, and every load change needs recalibration.',
        evidence: {
          observations: [
            ['Trial 1', 'Start 5 cm behind line: 14.1 s.'],
            ['Trial 2', 'Start 40 cm behind line: 11.6 s.'],
            ['Trial 3', 'Start 40 cm behind, plus 2 rolls: 13.8 s.'],
          ],
          question: 'What two variables are changing the run time here?',
          options: [
            'Start position and carried mass',
            'Battery chemistry and skirt color',
            'Only the timer',
          ],
          correct: 0,
          explanation:
            'Trials 1 and 2 differ only by start position: more run-up gave a faster timed run. Trials 2 and 3 differ only by mass: extra load slowed the vehicle.',
        },
      },
      {
        title: 'The electrical system: batteries, motors, and speed control',
        objectives: [
          'List the allowed electrical components and safety limits.',
          'Calculate voltage for series and parallel batteries.',
          'Explain how resistors and potentiometers change motor speed.',
        ],
        sections: [
          [
            'Allowed parts',
            'Electrical components are limited to batteries, wires and holders, mechanical switches, relays, resistors (including potentiometers and rheostats), capacitors, and up to two motors, which may be brushless. Integrated circuits are not allowed unless they are a manufactured part of a commercial motor. Lasers are banned. That rules out microcontrollers, so timing control must be analog or mechanical.',
          ],
          [
            'Battery rules',
            'Only commercial batteries with their original, visible labels may power the motors. Lithium and lead batteries are prohibited, so most teams use alkaline or nickel-metal hydride (NiMH) cells. Batteries may be combined as long as the expected voltage across any two points stays at or below 12.0 V, calculated from their labels. Batteries are stored separately at impound.',
          ],
          [
            'Series and parallel',
            'Cells in series add their voltages: four 1.2 V NiMH cells give 4.8 V. Cells in parallel keep the same voltage but share the current, so the pack lasts longer. Motor speed rises with voltage, so series packs set speed, while parallel packs help a pack hold its voltage under load. Track total voltage against the 12.0 V limit.',
          ],
          [
            'Speed control with resistance',
            'A resistor in series with a motor takes part of the voltage, so the motor runs slower. A potentiometer or rheostat is a variable resistor, which makes it a convenient tuning knob for hitting a Target Time. Resistors waste energy as heat, so check that they are rated for the current. Mark knob positions clearly and record the matching run times, so the knob becomes a reliable dial for any Target Time.',
          ],
          [
            'Battery sag',
            'As batteries discharge, their voltage falls, and the motor slows. A run with fresh batteries can be noticeably faster than the same setting with tired ones. Charge or replace batteries on a consistent schedule, measure pack voltage before each run, and build calibration data at the same voltage you will use at competition.',
          ],
          [
            'Switches and safety',
            'Every motor needs an accessible, manually operated mechanical switch for safe starting and stopping; inserting batteries or twisting wires does not count. Propellers and impellers, including those under the hull, must be shielded so a 3/8-inch dowel cannot touch them. A vehicle failing these safety rules cannot run and receives participation points only.',
          ],
        ],
        terms: [
          ['Series', 'Cells connected end to end; voltages add.'],
          ['Parallel', 'Cells side by side; same voltage, more capacity.'],
          ['Potentiometer', 'Adjustable resistor used as a speed-setting knob.'],
          ['Voltage sag', 'Drop in battery voltage as it discharges or under load.'],
          ['Mechanical switch', 'A switch with moving parts that opens or closes the circuit.'],
          [
            'Integrated circuit',
            'A packaged electronic chip; banned except inside a commercial motor.',
          ],
        ],
        example: [
          'A team wants to use eight 1.5 V alkaline AA cells. Is that legal, and what are the options?',
          [
            'Eight cells in series: 8 × 1.5 = 12.0 V, exactly at the limit.',
            'Two parallel strings of four: 6.0 V with double capacity.',
            'Lithium or lead cells would be illegal regardless of voltage.',
          ],
          'Eight in series is legal at 12.0 V, but leaves no margin; many teams prefer lower voltage with a potentiometer for control.',
        ],
        mcq: [
          [
            'Which battery type is prohibited for powering the motors?',
            'Lithium-ion',
            ['Alkaline', 'Nickel-metal hydride', 'Nickel-cadmium'],
            'The rules prohibit lithium and lead batteries. Commercial alkaline, NiMH, and NiCd cells are allowed if their original labels are visible and the voltage limit is met.',
          ],
          [
            'Four 1.2 V cells in series and two such strings in parallel give what voltage?',
            '4.8 V',
            ['9.6 V', '2.4 V', '1.2 V'],
            'Each string of four in series gives 4 × 1.2 = 4.8 V. Putting two identical strings in parallel keeps 4.8 V and doubles capacity.',
          ],
          [
            'Which component could legally slow a motor?',
            'A potentiometer in series with the motor',
            ['An Arduino speed controller', 'A laser timing gate', 'A lithium regulator chip'],
            'Resistors, including potentiometers and rheostats, are allowed and drop voltage across the motor. Microcontrollers and other integrated circuits, lasers, and lithium parts are not allowed.',
          ],
        ],
        written: [
          [
            'Why is a microcontroller timer not an option in this event?',
            'Integrated circuits are not permitted except as part of a commercial motor, so timing must come from analog components, mechanical systems, or calibration.',
            'The allowed component list excludes integrated circuits. Teams control timing by tuning voltage, resistance, start position, and load instead.',
          ],
          [
            'How does battery sag affect timing, and how can a team control for it?',
            'Lower voltage slows the motor and lengthens run time; teams measure voltage before runs, use fresh or freshly charged packs, and calibrate at that voltage.',
            'Motor speed follows voltage. Recording pack voltage with each calibration run makes the results repeatable when you use them at competition.',
          ],
          [
            'State two safety rules a vehicle must pass to run.',
            'All propellers and impellers shielded against a 3/8-inch dowel; an accessible mechanical on/off switch for every motor; commercial non-lithium, non-lead batteries at 12.0 V or less.',
            'Any two of the 3f safety rules are acceptable. Failing them means the vehicle cannot run and earns participation points only.',
          ],
          [
            'Why must a resistor used for speed control be rated for enough power?',
            'It turns the dropped voltage times the current into heat; an underrated resistor can overheat, change value, or burn out.',
            'Power dissipated is V × I across the resistor. Choosing an adequate rating keeps its resistance stable and the vehicle safe.',
          ],
        ],
        flow: [
          ['Source', 'Labeled commercial cells, ≤ 12.0 V.'],
          ['Control', 'Switch plus resistor or potentiometer.'],
          ['Drive', 'Up to two motors spin the fans.'],
        ],
        compare: [
          ['Alkaline', 'High initial voltage, cheap', 'Sags noticeably as it drains.'],
          ['NiMH', 'Rechargeable, steady voltage', 'Lower 1.2 V per cell.'],
          ['Potentiometer', 'Fine speed tuning', 'Wastes energy as heat.'],
        ],
        challenge: 'Design a legal pack and speed control that hits two different target times.',
        takeaway: 'Voltage sets speed; control it, measure it, and keep it legal.',
        evidence: {
          observations: [
            ['Monday', 'Fresh pack 5.2 V, knob at 3: 11.8 s.'],
            ['Wednesday', 'Same knob, pack at 4.7 V: 13.4 s.'],
            ['Wednesday, recharged', 'Pack 5.2 V, knob at 3: 11.9 s.'],
          ],
          question: 'Why did Wednesday’s first run take longer?',
          options: [
            'The pack voltage was lower',
            'The knob drifted to a new setting',
            'The track was longer',
          ],
          correct: 0,
          explanation:
            'After recharging to 5.2 V, the same setting matched Monday again. The slow run was caused by the lower pack voltage, not by the knob or track.',
        },
      },
      {
        title: 'Carrying nickels: mass, balance, and security',
        objectives: [
          'Plan a nickel load from the supervisor’s rolls and loose coins.',
          'Place the load to keep the vehicle level.',
          'Hold nickels securely without tape or adhesive.',
        ],
        sections: [
          [
            'The available masses',
            'The supervisor provides 4 full rolls of 40 nickels (about 200 g each), 1 half roll of 20 nickels, and 20 loose nickels of about 5 g each. Together they range from about 5 g to about 1 kg. Teams choose how much to carry and can change the amount between runs. You may not bring your own masses.',
          ],
          [
            'How to hold them',
            'You may not unroll, break, or alter the packaging, and you may not tape or glue nickels or rolls to the vehicle. Vehicles that need such measures cannot carry masses. Good designs use cradles, slots, or bins sized for rolls and a tray or cup for loose nickels, so the coins sit in place by shape alone.',
          ],
          [
            'Balance',
            'A kilogram of nickels may outweigh the rest of the vehicle. If its center of mass sits off the center of the cushion, the hull tilts, leakage rises on one side, and the skirt drags on the other. Place the load so the loaded center of mass lies over the cushion’s center. Mark cradle positions so every run uses the same layout.',
          ],
          [
            'Keeping them aboard',
            'If any part, roll, or nickel falls off during a run, the run takes one construction penalty (× 0.8), and anything lost does not count toward Mass Score. Loose nickels slide during acceleration and bumps, so contain them with walls. A loose coin that rattles out at the start line costs more than the 0.5 points it was worth.',
          ],
          [
            'Value per gram',
            'A full roll adds 4 MS points for about 200 g, so 0.02 points per gram. Loose nickels add 0.1 points each for 5 g, the same rate. All carried mass costs speed, so the question is whether the vehicle can carry it and still finish on time. For most competitive vehicles the answer is to carry everything.',
          ],
          [
            'Calibrating with load',
            'Run time depends strongly on mass, so build a separate calibration for each load you might carry. A common plan is to calibrate for the full load and for no load. Then, if the vehicle behaves unexpectedly on the first run, you can drop the nickels on the second run and still use a known setting.',
          ],
        ],
        terms: [
          ['Nickel roll', '40 nickels in a bank wrapper, about 200 g; counts as R = 1.'],
          ['Half roll', '20 nickels, counts as R = 0.5.'],
          ['Loose nickel', 'About 5 g; each adds 0.1 to the mass term.'],
          ['Cradle', 'Shaped holder that keeps a roll in place without tape.'],
          ['Loaded center of mass', 'Balance point of vehicle plus nickels.'],
          ['Calibration set', 'Recorded settings and times for one particular load.'],
        ],
        example: [
          'A vehicle carries 3 rolls, the half roll, and 12 loose nickels, but 2 loose nickels fall out mid-run. The run is complete. Find the Mass Score and the penalty effect.',
          [
            'Counted load: R = 3.5, N = 10, so 4 × 3.5 + 0.1 × 10 = 15.',
            'Something fell off, so one construction penalty applies: DS, TS, and MS × 0.8.',
            'MS after penalty = 15 × 0.8 = 12.',
          ],
          'Two lost nickels cost 0.2 MS directly, but the penalty cost 20 percent of the whole run.',
        ],
        mcq: [
          [
            'How may rolls of nickels be attached to the vehicle?',
            'Held in a shaped cradle without tape or adhesive',
            ['Taped to the deck', 'Unrolled into a tray', 'Glued in place'],
            'Rolls may not be unrolled or altered, and tape or adhesive may not be used to attach nickels. Holders that keep them in place by shape are allowed.',
          ],
          [
            'What happens if one loose nickel falls off during a run?',
            'One construction penalty, and that nickel does not count',
            ['No effect', 'The run is incomplete', 'A penalty for each item lost'],
            'Anything falling off gives one construction penalty for the run (not one per item), and the lost nickel is not counted toward Mass Score.',
          ],
          [
            'Where should the loaded center of mass sit?',
            'Over the center of the air cushion',
            ['As far forward as possible', 'Directly over the thrust fan', 'Near one rail'],
            'Placing the combined center of mass over the cushion center keeps the hull level, so leakage and skirt contact are even all around.',
          ],
        ],
        written: [
          [
            'Calculate MS for a complete run carrying 2 rolls and 8 loose nickels.',
            'MS = 4 × 2 + 0.1 × 8 = 8.8.',
            'Each roll counts 4 and each loose nickel 0.1. A complete run has no distance proration, so MS is 8.8.',
          ],
          [
            'Why calibrate both a full-load and a no-load setting?',
            'Run time changes with mass, so having both lets the team switch loads between runs and still use a known, accurate setting.',
            'The load can change between runs. Two calibrations give a backup plan if the first run reveals a problem with the full load.',
          ],
          [
            'Explain how an off-center load can slow the vehicle.',
            'It tilts the hull, raising the gap on one side so air escapes and pressing the skirt into the floor on the other, adding friction.',
            'Tilt changes leakage and contact. Good answers link the tilt to both uneven pressure and extra skirt drag.',
          ],
          [
            'Why do loose nickels need walls around them?',
            'They slide during acceleration, bumps, and the stop, and any that fall off cost a construction penalty.',
            'Loose items move when the vehicle accelerates. Containment protects both the Mass Score and the whole run from the penalty.',
          ],
        ],
        flow: [
          ['Choose', 'Decide the load for this run.'],
          ['Place', 'Cradles keep the center of mass centered.'],
          ['Secure', 'Shape holds the coins; nothing falls off.'],
        ],
        compare: [
          ['Full load', 'Up to 20 MS', 'Slower; must be balanced.'],
          ['Rolls only', '16 MS with simple cradles', 'Leaves 4 points unclaimed.'],
          ['No load', 'Fastest and simplest', 'MS = 0.'],
        ],
        challenge:
          'Design a load layout that keeps the vehicle level with every combination of rolls.',
        takeaway:
          'Nickels are worth carrying only if they stay aboard and the vehicle stays level.',
        evidence: {
          observations: [
            ['Run 1', '4 rolls in cradles, 20 loose in an open tray: 3 nickels lost at start.'],
            ['Run 2', 'Same load, tray with 2 cm walls: nothing lost.'],
            ['Run 1 score effect', 'Penalty × 0.8 applied to the whole run.'],
          ],
          question: 'What was the main cost of the open tray?',
          options: [
            'The construction penalty on the whole run',
            'The 0.3 Mass Score points from three nickels',
            'Nothing, because the run was complete',
          ],
          correct: 0,
          explanation:
            'Three nickels were worth only 0.3 points, but losing them triggered one construction penalty that multiplied DS, TS, and MS by 0.8, costing around 20 points on a strong run.',
        },
      },
      {
        title: 'Hitting the Target Time: calibration and repeatability',
        objectives: [
          'Build a calibration curve of run time against a control setting.',
          'Interpolate a setting for a new Target Time.',
          'Measure and reduce run-to-run variation.',
        ],
        sections: [
          [
            'The calibration curve',
            `Because the Target Time is announced only at competition, you need a way to set any time between ${r.tt} s. Choose one main control, such as potentiometer position or start distance, and record run times at several settings with a fixed load and voltage. Plotting time against setting gives a calibration curve you can read from on competition day.`,
          ],
          [
            'Interpolation',
            'If setting 4 gives 11.0 s and setting 5 gives 13.0 s, a 12.0 s target lies halfway, near 4.5. That linear interpolation works when points are close together. Where the curve bends, add more measurements. Keep the chart and calculations in the papers you impound, since no new notes may be brought in after impound.',
          ],
          [
            'Repeatability',
            'Run the same setting five times and record each time. The spread tells you your precision. If times range from 11.4 to 12.6 s, no amount of interpolation will hit TT within 0.2 s. Reduce variation first: consistent start position, balanced load, fresh batteries, and smooth skirts. Then refine the curve, since a tighter spread makes every point on it more trustworthy.',
          ],
          [
            'Timing method',
            'The vehicle must carry a vertical wooden dowel at least 1/4 inch thick, within 3.0 cm of its front edge, reaching at least 20 cm above the track. Photogates at the start and finish detect the dowel, with beams about 17 cm up. At home, use a phone video at known frame rate or two people with stopwatches, and average several timers.',
          ],
          [
            'Long and short targets',
            `Very short targets need a fast vehicle with plenty of run-up. Long targets, near ${r.max} s, need a slow, steady vehicle that never stalls. Remember the incomplete-run rule: stopping for 3 seconds ends the run. A vehicle tuned too slow may creep and stop near the end. Test the extremes of the range, not just the middle.`,
          ],
          [
            'No practice runs',
            'There are no practice runs at competition, and you get two runs in 8 minutes. Use your first run with your best calibrated setting, compare the result with TT, then adjust the second run by the curve. A consistent vehicle lets you correct by a known amount; an inconsistent one turns the second run into a guess.',
          ],
        ],
        terms: [
          ['Calibration curve', 'Graph of run time against a control setting.'],
          ['Interpolation', 'Estimating a setting between two measured points.'],
          ['Precision', 'How close repeated results are to each other.'],
          ['Accuracy', 'How close a result is to the target.'],
          ['Photogate', 'Light beam timer triggered by the dowel.'],
          ['Timing dowel', 'Vertical wooden rod near the front that triggers the timers.'],
        ],
        example: [
          'Your curve shows setting 3 → 9.6 s and setting 4 → 11.2 s (full load, 5.0 V). The Target Time is 10.0 s. Which setting do you choose?',
          [
            'The target is (10.0 − 9.6) ÷ (11.2 − 9.6) = 0.25 of the way from 3 to 4.',
            'Interpolated setting = 3 + 0.25 = 3.25.',
            `If the first run gives 10.3 s, TS = ${ts(10.3, 10)}; shift slightly toward 3 for run two.`,
          ],
          'Interpolation gives a starting setting; the first run tells you which way to correct.',
        ],
        mcq: [
          [
            'Five runs at one setting give 11.8, 12.4, 11.6, 12.5, and 11.9 s. What should the team improve first?',
            'Repeatability, because the spread is almost 1 s',
            ['The calibration curve slope', 'The Target Time', 'The dowel height'],
            'The times scatter by nearly a second, so even a perfect setting cannot hit TT reliably. Reducing variation comes before fine-tuning the curve.',
          ],
          [
            'Where must the timing dowel be mounted?',
            'Within 3.0 cm of the front edge, reaching at least 20 cm above the track',
            [
              'Anywhere on the vehicle',
              'At the rear, at least 10 cm tall',
              'On the thrust fan guard',
            ],
            'The rules require a 1/4-inch or larger wooden dowel within 3.0 cm of the front, top at least 20 cm above the track, so it is the first part to break the timing beam.',
          ],
          [
            'Why are papers with calibration data impounded with the vehicle?',
            'No additional notes may be brought in after impound',
            ['The supervisor grades them', 'They replace the run', 'They are a tiebreaker'],
            'Only impounded papers may be used during competition, so calibration charts must be impounded or they cannot be consulted when TT is announced.',
          ],
        ],
        written: [
          [
            'Explain the difference between precision and accuracy for run times.',
            'Precision is how tightly repeated times cluster; accuracy is how close they are to the Target Time. A vehicle can be precise but consistently off target.',
            'High precision lets calibration correct the offset; low precision cannot be fixed by changing the setting. Both ideas should appear.',
          ],
          [
            'Setting 6 gives 14.0 s and setting 8 gives 18.0 s. Estimate a setting for 15.0 s.',
            '(15 − 14) ÷ (18 − 14) = 0.25, so setting ≈ 6 + 0.25 × 2 = 6.5.',
            'Linear interpolation scales the setting change by the fraction of the time change needed. Answers should show the fraction step.',
          ],
          [
            'How should a team use its first competition run to improve the second?',
            'Compare the first run time with TT and shift the setting along the calibration curve by the matching amount.',
            'With no practice runs, run one is a measurement. The curve’s slope converts its time error into a setting correction.',
          ],
          [
            `Why is a Target Time near ${r.max} s risky for a slow vehicle?`,
            'A very slow vehicle can stall for 3 s or creep past 2 × TT, making the run incomplete with no Time Score.',
            'Slow settings sit close to stalling. Testing the long end of the range ensures the vehicle still moves steadily to the finish.',
          ],
        ],
        flow: [
          ['Measure', 'Times at several settings with fixed load and voltage.'],
          ['Plot', 'Draw the calibration curve.'],
          ['Read', 'Interpolate the setting for TT.'],
        ],
        compare: [
          ['Potentiometer control', 'Fine, continuous adjustment', 'Sensitive to battery voltage.'],
          ['Start-distance control', 'Simple and repeatable', 'Limited range on long targets.'],
          ['Load control', 'Changes acceleration', 'Also changes Mass Score.'],
        ],
        challenge: 'Use a calibration curve to pick settings for three different Target Times.',
        takeaway: 'A precise vehicle plus a good curve turns any Target Time into a known setting.',
        evidence: {
          observations: [
            ['Calibration', 'Settings 2, 4, 6 gave 8.0, 12.0, 16.0 s.'],
            ['Target Time', '13.0 s announced.'],
            ['Run 1 at 4.5', '13.5 s.'],
          ],
          question: 'What setting should the team use for Run 2?',
          options: ['About 4.25', 'About 5.0', 'Exactly 6'],
          correct: 0,
          explanation:
            'The curve is 2 s per setting unit, so 0.5 s too slow means moving 0.25 units faster, from 4.5 to about 4.25. The data trend makes the correction predictable.',
        },
      },
      {
        title: 'Impound, inspection, and competition day',
        objectives: [
          'Prepare a vehicle and papers for impound and inspection.',
          'Follow the start procedure and run rules.',
          'Avoid violations that multiply or zero your score.',
        ],
        sections: [
          [
            'Impound',
            'Each team impounds one vehicle, spare parts, and any papers it will need, with batteries stored separately. Nothing else may be brought in later. Missing impound multiplies DS, TS, and MS by 0.7 for every run. Tools and up to two Class III calculators need not be impounded, but tools may not travel with the vehicle, and laser tools are banned.',
          ],
          [
            'Inspection',
            'Before testing, the supervisor checks the specifications: the 40 × 40 × 40 cm box when levitated, the timing dowel, allowed electrical components, battery labels and voltage, switches, and prop shielding. Out-of-spec vehicles may be fixed during the testing period. Safety failures that cannot be fixed mean the vehicle does not run and receives participation points.',
          ],
          [
            'The 8-minute period',
            'Teams have 8 minutes to adjust, repair, and make their two runs. Time ends after two complete or two incomplete runs, or when 8 minutes pass. A run started before time expires is allowed to finish. You may dry-sweep the track and measure it, but not wet it or ask for changes to its position or leveling.',
          ],
          [
            'Starting a run',
            'Place the vehicle with its load fully behind the start line. The supervisor holds a wood block against its front. Turn on the motors, remove your hands, and give the countdown “3, 2, 1, launch.” The supervisor removes the block. If the dowel does not cross the start line within 3 seconds, the attempt does not count as a run.',
          ],
          [
            'During and after',
            'Do not touch or interfere with the vehicle until the supervisor says so. If a run becomes incomplete, the supervisor places the block in front of the vehicle, has you switch it off without moving it, and measures the dowel’s distance to the finish. The competition clock pauses for that measurement. Review your score sheet with the supervisor at the end.',
          ],
          [
            'Design knowledge',
            'Participants must be able to answer questions about the design, construction, and operation of their vehicle. Be ready to explain your lift and thrust system, wiring, battery choice, calibration method, and why you chose your load. Your build log and calibration data are the best preparation, and they are also the evidence your settings come from.',
          ],
        ],
        terms: [
          ['Impound', 'Turning in the vehicle, spares, and papers before competition.'],
          ['Specification check', 'Supervisor’s inspection of size, parts, and safety.'],
          ['Competition time', '8 minutes for adjustments and two runs.'],
          [
            'Launch block',
            'Wood block the supervisor holds at the vehicle’s front before release.',
          ],
          ['Participation points', 'Score for teams that cannot compete under the rules.'],
          ['Dry sweep', 'Brushing the track without liquid; allowed.'],
        ],
        example: [
          'A team’s vehicle passes inspection, but its first attempt stalls behind the start line for 4 seconds. What happens, and what should the team do?',
          [
            'The dowel did not cross the start line within 3 seconds, so it is not a run.',
            'The team still has two runs available while time remains.',
            'Check the lift and thrust, restart quickly, and keep watch on the 8-minute clock.',
          ],
          'A failed launch does not use a run, but it uses time, so diagnose fast.',
        ],
        mcq: [
          [
            'What is the effect of missing impound?',
            'DS, TS, and MS are multiplied by 0.7 for each run',
            ['Participation points only', 'One run instead of two', 'A 10-point deduction'],
            'Teams that miss impound have the three score components multiplied by 0.7 on every run. They can still compete.',
          ],
          [
            'Which action is allowed on the track during competition time?',
            'Dry-sweeping it',
            ['Wetting it', 'Asking the supervisor to re-level it', 'Applying a slick coating'],
            'Teams may dry-sweep and measure the track but may not wet it, apply any substance, or request changes to its position or leveling.',
          ],
          [
            'When does the team’s competition time end?',
            'After two complete or two incomplete runs, or 8 minutes, whichever comes first',
            ['After one complete run', 'After 10 minutes', 'When the team decides'],
            'Competition time is 8 minutes and ends early after two complete or two incomplete runs. A run started before time expires may finish.',
          ],
        ],
        written: [
          [
            'List three things to bring to impound.',
            'The vehicle, spare parts, and calibration papers, with batteries stored separately.',
            'Only impounded items are available during competition. Answers naming the vehicle, spares, papers, and separate batteries are complete.',
          ],
          [
            'What should a team do if inspection finds the dowel 4 cm from the front?',
            'Move it to within 3.0 cm of the front edge during the testing period, keeping it at least 20 cm above the track.',
            'Out-of-spec items can be corrected during the testing period. Fixing the dowel position quickly avoids a construction violation.',
          ],
          [
            'Why is touching the vehicle mid-run so costly?',
            'It sets DS, TS, and MS to zero for that run, which still counts as one of the team’s runs.',
            'Interference zeroes the run but does not refund it, so the team loses a whole scoring chance.',
          ],
          [
            'How can the build log help with design-knowledge questions?',
            'It records the design choices, test results, and calibration data that explain how and why the vehicle works.',
            'Participants must explain design and operation. A log provides specific evidence rather than general claims.',
          ],
        ],
        flow: [
          ['Impound', 'Vehicle, spares, papers; batteries separate.'],
          ['Inspect', 'Size, dowel, wiring, safety.'],
          ['Run twice', 'Within 8 minutes, no practice runs.'],
        ],
        compare: [
          ['Construction violation', 'Run × 0.8', 'Fix specs before running.'],
          ['Competition violation', 'Run × 0.9', 'Follow procedures exactly.'],
          ['Safety failure', 'No run allowed', 'Participation points only.'],
        ],
        challenge: 'Walk through an inspection checklist and find every possible violation.',
        takeaway: 'A legal, impounded, rehearsed vehicle keeps every point it earns.',
        evidence: {
          observations: [
            ['Inspection', 'Rear impeller guard has a gap a 3/8-inch dowel fits through.'],
            ['Team response', 'Covers the gap with spare mesh from impounded parts.'],
            ['Re-check', 'Dowel can no longer reach the impeller.'],
          ],
          question: 'What would have happened without the fix?',
          options: [
            'The vehicle would not run and would earn participation points only',
            'A 0.9 multiplier would apply',
            'Nothing; shielding is optional',
          ],
          correct: 0,
          explanation:
            'Propeller shielding is a safety rule under 3f. A vehicle that cannot be brought into compliance does not run and receives only participation points, which is why impounded spares matter.',
        },
      },
    ],
  });
}

export const hovercraftLessonsC = hovercraft('C');
export const hovercraftLessonsB = hovercraft('B');
