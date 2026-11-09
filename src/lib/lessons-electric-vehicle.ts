import { buildEventCourse } from './build-course-kit.ts';

// Electric Vehicle C (2027): drive forward, push a water bottle past the Bottle Line, then
// reverse so the rear Measurement Point stops at the Target Point, on time. Low score wins.
export const electricVehicleLessons = buildEventCourse({
  eventId: 'electric-vehicle',
  eventName: 'Electric Vehicle',
  prefix: 'ev',
  division: 'C',
  intro:
    'Seven units take you from the scoring formula to a programmed, battery-powered vehicle that pushes a water bottle past a line and backs up to stop on a Target Point at a Target Time. Low score wins, so each unit shows which design and control choices remove the most points.',
  references: [
    {
      title: 'Science Olympiad: Electric Vehicle C',
      url: 'https://www.soinc.org/electric-vehicle-c',
    },
    { title: 'Arduino: Getting Started', url: 'https://docs.arduino.cc/learn/' },
  ],
  units: [
    {
      title: 'Scoring a run: distance, time, bottle, and pusher',
      objectives: [
        'Calculate a Run Score from vehicle distance, bottle distance, and run time.',
        'Apply the Bottle Bonus, Pusher Bonus, and penalties.',
        'Identify which score terms matter most.',
      ],
      sections: [
        [
          'The task',
          'The vehicle starts with its rear Measurement Point (MP) over the Start Point. It drives forward, catches a 500 mL water bottle placed 2, 3, or 4 m down the track, pushes the bottle past a Bottle Line 1 to 3 m beyond the Target Point, then reverses so the MP stops as close as possible to the Target Point. It should finish at the announced Target Time.',
        ],
        [
          'Run Score',
          'Run Score = 100 + Distance Score + Time Score + Bonuses + Run Penalties, and low score wins. The Final Score is the better of two runs. Distance Score = 2.0 points per cm of Vehicle Distance (MP to Target Point) plus 1.0 point per cm of Bottle Distance (Bottle Line to the bottle’s closest side). Every centimeter of vehicle error costs twice as much as bottle error.',
        ],
        [
          'Time Score',
          'Time Score = |Target Time − Run Time| × 0.5 points per second. The Target Time is between 10.0 and 20.0 s in 0.5 s steps. Run Time starts when the vehicle is triggered and ends when it is stationary for 3 seconds; the 3 seconds are not counted, but any pause before moving, and any rocking or recoil, are counted. A 2-second miss costs only 1 point.',
        ],
        [
          'Bottle and pusher bonuses',
          'The Bottle Bonus is −20 points if the bottle ends fully beyond the Bottle Line. If the bottle does not get past the Target Point, or the moving-bottle rules are broken, the Bottle Distance is set to 400 cm. The Pusher Bonus is (widest pusher opening − 35.0 cm) × 1.5, which is negative, and so helpful, for any opening narrower than 35 cm.',
        ],
        [
          'Penalties',
          'One or more competition violations add 150 points to a run; one or more construction violations add 300. A kit vehicle without two documented modifications gets a 50-point non-modification penalty. A Failed Run, such as driving the wrong way or a vehicle that cannot be measured, has a Distance Score of 2500. Missing impound adds 5000 points to the Final Score.',
        ],
        [
          'What matters most',
          'Compare magnitudes. A narrow pusher can be worth about −40 points every run, and getting the bottle past the line is −20. Vehicle Distance costs 2 points per cm, so stopping 10 cm off costs 20. Time Score is cheap by comparison. Violations and failed runs dwarf everything, so reliability and legality come first, then the pusher, bottle, and stopping accuracy.',
        ],
      ],
      terms: [
        [
          'Measurement Point (MP)',
          'Rearmost point of the vehicle, at most 1.0 cm above the track, used for distance.',
        ],
        ['Vehicle Distance', 'Point-to-point distance from the MP to the Target Point.'],
        ['Bottle Distance', 'Distance from the Bottle Line to the bottle’s closest side.'],
        ['Bottle Bonus', '−20 points when the bottle ends fully beyond the Bottle Line.'],
        ['Pusher Bonus', '(widest opening − 35.0 cm) × 1.5 points.'],
        [
          'Failed Run',
          'A run scored with a 2500-point Distance Score, such as a wrong-direction run.',
        ],
      ],
      example: [
        'Target Time 14 s. Pusher opening 16.0 cm. The vehicle stops 22.5 cm from the Target Point in 16.37 s; the bottle ends 12.1 cm beyond the Bottle Line. Find the Run Score.',
        [
          'Distance Score = 22.5 × 2.0 + 12.1 × 1.0 = 57.10.',
          'Time Score = |14 − 16.37| × 0.5 = 1.19; Bottle Bonus = −20.',
          'Pusher Bonus = (16.0 − 35.0) × 1.5 = −28.50; total = 100 + 57.10 + 1.19 − 20 − 28.50.',
        ],
        'Run Score = 109.79, matching the rules’ scoring example.',
      ],
      mcq: [
        [
          'A bottle pusher’s widest opening is 12.0 cm. What is its Pusher Bonus?',
          '−34.5',
          ['−23.0', '+34.5', '−18.0'],
          'Pusher Bonus = (12.0 − 35.0) × 1.5 = −23.0 × 1.5 = −34.5 points. Because low score wins, the negative bonus helps, and it applies to every run.',
        ],
        [
          'The vehicle stops 8.0 cm from the Target Point. How many Distance Score points does that add?',
          '16.0',
          ['8.0', '4.0', '32.0'],
          'Vehicle Distance costs 2.0 points per cm: 8.0 × 2.0 = 16.0. Bottle Distance costs half as much per cm.',
        ],
        [
          'The bottle never gets past the Target Point. What Bottle Distance is used?',
          '400.0 cm',
          ['0 cm', 'The measured distance', '2500 cm'],
          'If the bottle is not past the Target Point, or the moving-bottle rules are broken, the Bottle Distance is set to 400.0 cm, adding 400 points.',
        ],
      ],
      written: [
        [
          'Why is a centimeter of vehicle error more costly than a centimeter of bottle error?',
          'Vehicle Distance is scored at 2.0 points per cm while Bottle Distance is 1.0 point per cm, so the same error costs twice as much for the vehicle.',
          'The weights in the Distance Score formula differ. Accurate stopping of the MP therefore deserves more design effort than precise bottle placement.',
        ],
        [
          'A vehicle pauses 2 s after the pencil trigger before moving. Does the pause count?',
          'Yes. Run Time starts at the trigger, and any pause before moving is included.',
          'The rules state the pause between actuation and motion is part of Run Time, even if it exceeds 3 seconds. Programmed delays must be planned into the timing.',
        ],
        [
          'Rank these by typical size of effect: Time Score, Pusher Bonus, construction violation.',
          'Construction violation (+300) is largest, then Pusher Bonus (often −30 to −45), then Time Score (usually a few points).',
          'Penalties are hundreds of points, the pusher tens of points, and timing errors usually a few. Priorities should follow these magnitudes.',
        ],
        [
          'What is the Final Score if run 1 scores 118.17 and run 2 scores 109.79?',
          '109.79, the better (lower) of the two runs.',
          'Low score wins and the Final Score uses the better run. Only Final Score penalties such as missed impound are added on top.',
        ],
      ],
      flow: [
        ['Push', 'Bottle past the Bottle Line: −20.'],
        ['Return', 'MP stops near the Target Point at 2 pts/cm.'],
        ['On time', 'Time error at 0.5 pts/s.'],
      ],
      compare: [
        ['Narrow pusher', 'Large negative bonus', 'Harder to catch the bottle.'],
        ['Accurate stop', 'Saves 2 pts per cm', 'Needs good sensing and control.'],
        ['Clean run', 'No penalties', 'Requires legal, reliable hardware.'],
      ],
      challenge: 'Score several runs and decide which improvement saves the most points.',
      takeaway:
        'Legality and reliability first, then pusher width, bottle bonus, and stopping accuracy.',
      evidence: {
        observations: [
          ['Pusher', 'Widest opening 20.0 cm.'],
          ['Run 1', 'MP 6.0 cm off, bottle 5.0 cm past the line, time error 3.0 s.'],
          ['Run 2', 'MP 3.0 cm off, bottle 8.0 cm short of the line, time error 0.5 s.'],
        ],
        question: 'Which run scored lower (better)?',
        options: ['Run 1', 'Run 2', 'They tie'],
        correct: 0,
        explanation:
          'Run 1: 100 + 12 + 5 + 1.5 − 20 − 22.5 = 76.0. Run 2: 100 + 6 + 8 + 0.25 − 22.5 = 91.75. Missing the −20 Bottle Bonus outweighed Run 2’s better stop and timing.',
      },
    },
    {
      title: 'Planning the path: distances, geometry, and the reverse',
      objectives: [
        'Lay out the forward and reverse distances from the announced values.',
        'Account for vehicle length and pusher depth.',
        'Plan for the bottle to end fully beyond the line.',
      ],
      sections: [
        [
          'Announced values',
          'After impound, the supervisor posts the Target Distance (5.00 to 9.00 m), Target Time (10.0 to 20.0 s), and Bottle Line Distance (1.00 to 3.00 m beyond the Target Point). The bottle sits on the center line 2.0 m from the Start Point at Regionals, 3.0 m at States, and 4.0 m at Nationals. All teams use the same values, so your program must accept them as inputs.',
        ],
        [
          'Reference points',
          'Every distance is measured from different points on the vehicle. The MP is the rearmost point and is used for Vehicle Distance. The bottle pusher is the foremost part. The distance between them is roughly your vehicle length, at most 80.0 cm. Keep these offsets in your program, because the pusher must travel farther than the MP to move the bottle where it needs to go.',
        ],
        [
          'Forward leg',
          'For the bottle to be fully beyond the Bottle Line, its near side must pass the line. The bottle is 6 to 7 cm in diameter, and it sits inside the pusher’s opening. So the pusher’s contact face must travel past the line by at least the bottle diameter plus a margin. Since the MP trails the pusher by the vehicle length, the MP’s forward travel equals that point minus the vehicle length.',
        ],
        [
          'Reverse leg',
          'After pushing, the vehicle backs up until the MP is over the Target Point. The bottle must be left behind, so the reverse must not drag it. Because the bottle only rests against the pusher, reversing simply leaves it. The reverse distance is the MP’s forward travel minus the Target Distance. Small errors in the forward leg carry into the reverse unless the vehicle measures position throughout.',
        ],
        [
          'Margin choices',
          'Pushing the bottle well past the line protects the −20 bonus but adds Bottle Distance at 1 point per cm. Overshooting by 10 cm costs 10 points; missing the line costs about 20 plus whatever distance remains. Most teams aim a few centimeters beyond, using measured bottle slide. Bottles may slide after the vehicle stops, so test with weighted bottles of 80 to 100 g.',
        ],
        [
          'Staying straight',
          'The track is 2.0 m wide, and the bottle sits on an imaginary center line from Start to Target. A vehicle that drifts sideways can miss the bottle or push it at an angle, and the Vehicle Distance is measured point to point, so sideways error counts. Aligning the vehicle at the start and keeping wheels matched matters as much as distance control.',
        ],
      ],
      terms: [
        ['Target Distance', 'Start Point to Target Point, 5.00–9.00 m.'],
        ['Bottle Line Distance', 'Target Point to Bottle Line, 1.00–3.00 m.'],
        ['Bottle Location', 'Bottle start on the center line: 2, 3, or 4 m by tournament level.'],
        ['Vehicle length offset', 'Distance from the pusher face back to the MP.'],
        ['Forward leg', 'Travel from start until the bottle is past the line.'],
        ['Reverse leg', 'Backing up until the MP reaches the Target Point.'],
      ],
      example: [
        'Target Distance 7.00 m, Bottle Line Distance 2.00 m, vehicle length 50 cm, bottle 6.5 cm, desired margin 3 cm. How far does the MP travel forward and backward?',
        [
          'The line is at 9.00 m; the pusher face must reach 9.00 + 0.065 + 0.03 = 9.095 m.',
          'MP forward travel = 9.095 − 0.50 = 8.595 m.',
          'Reverse = 8.595 − 7.00 = 1.595 m.',
        ],
        'The vehicle drives about 8.60 m forward and 1.60 m backward; the program should compute this from the posted values.',
      ],
      mcq: [
        [
          'Which part of the vehicle is used to measure Vehicle Distance?',
          'The Measurement Point at the rear',
          ['The bottle pusher', 'The front axle', 'The center of mass'],
          'Vehicle Distance is point to point from the rear Measurement Point to the Target Point. The MP must be the rearmost part and no more than 1.0 cm above the track.',
        ],
        [
          'Target Distance 6.00 m and Bottle Line Distance 1.50 m. Where is the Bottle Line from the Start Point?',
          '7.50 m',
          ['4.50 m', '1.50 m', '6.00 m'],
          'The Bottle Line is placed the Bottle Line Distance beyond the Target Point: 6.00 + 1.50 = 7.50 m from the Start Point.',
        ],
        [
          'Why must the pusher travel beyond the Bottle Line by more than zero?',
          'The bottle’s near side must cross the line, so the pusher must go one bottle diameter past it',
          ['The rules require 10 cm past', 'The MP must cross the line', 'To reduce Run Time'],
          'The bonus requires the bottle fully beyond the line. The bottle sits ahead of the pusher face, so its near side crosses only after the face is a bottle diameter past.',
        ],
      ],
      written: [
        [
          'Write the formula for the reverse distance in terms of MP forward travel and Target Distance.',
          'Reverse distance = MP forward travel − Target Distance.',
          'The MP must end at the Target Point, so it backs up by the amount it overshot. Answers can be symbolic or worked with an example.',
        ],
        [
          'Why should the program take the posted values as inputs rather than hard-code them?',
          'The Target Distance, Bottle Line Distance, and Target Time are announced at each tournament, so the program must compute the path for any legal values.',
          'Values change every competition. A program that reads inputs and computes both legs avoids rewriting code under time pressure.',
        ],
        [
          'Explain the tradeoff in choosing how far past the line to push the bottle.',
          'More margin protects the −20 bonus but adds 1 point per cm of Bottle Distance; too little risks missing the line and losing the bonus.',
          'A small, tested margin balances the two costs. Strong answers put a number on both sides of the tradeoff.',
        ],
        [
          'How does sideways drift affect the score even if the forward distance is perfect?',
          'Vehicle Distance is measured point to point, so lateral offset adds to the distance; drift can also cause the bottle to be missed or pushed off line.',
          'Point-to-point measurement means any direction of error counts. Straight travel matters for both the MP and the bottle.',
        ],
      ],
      flow: [
        ['Read values', 'Target Distance, Bottle Line Distance, Target Time.'],
        ['Forward', 'Push the bottle fully past the line.'],
        ['Reverse', 'Back up until the MP reaches the Target Point.'],
      ],
      compare: [
        ['Large bottle margin', 'Safe −20 bonus', 'Costs 1 pt/cm of overshoot.'],
        ['Small margin', 'Low Bottle Distance', 'Risk of missing the line.'],
        ['Long vehicle', 'Stable, room for parts', 'Larger offset to plan for.'],
      ],
      challenge: 'Compute forward and reverse legs for several sets of posted values.',
      takeaway:
        'Know where the pusher and MP are at every moment; the path follows from the posted values.',
      evidence: {
        observations: [
          ['Setup', 'Target 8.00 m, Bottle Line 1.00 m, vehicle length 45 cm.'],
          ['Run', 'MP forward travel programmed as 8.60 m.'],
          ['Result', 'Bottle ended 1 cm short of the line.'],
        ],
        question: 'What went wrong in the plan?',
        options: [
          'The forward travel ignored the bottle diameter and margin',
          'The reverse was too long',
          'The Target Time was wrong',
        ],
        correct: 0,
        explanation:
          'With the line at 9.00 m, an 8.60 m MP travel puts the pusher at 9.05 m, only 5 cm past the line. A 6–7 cm bottle needs the face at least about 9.07 m plus margin.',
      },
    },
    {
      title: 'Drivetrain and distance sensing: motors, gears, and encoders',
      objectives: [
        'Relate wheel diameter and encoder counts to distance traveled.',
        'Choose a gear ratio for speed and control.',
        'Explain sources of distance error.',
      ],
      sections: [
        [
          'Distance from rotation',
          'Each wheel revolution moves the vehicle one circumference, π × diameter, if the wheel does not slip. A 6.0 cm wheel moves 18.85 cm per turn. Counting revolutions therefore measures distance. To stop 1 cm from a target, you need to know position to well under a centimeter, which means counting fractions of a revolution with an encoder.',
        ],
        [
          'Encoders',
          'A rotary encoder produces pulses as a shaft turns. Optical and magnetic quadrature encoders give two signals that also reveal direction, which matters because the vehicle reverses. If an encoder gives 360 counts per wheel revolution on a 6.0 cm wheel, each count is 18.85 ÷ 360 ≈ 0.052 cm. Mounting the encoder on the motor shaft multiplies counts by the gear ratio.',
        ],
        [
          'Motors and gearing',
          'Small DC motors spin fast with little torque, so a gearbox trades speed for torque. A higher reduction gives more pushing force and finer control but lower top speed. With 10 to 20 seconds for roughly 10 to 13 m of total travel, average speeds are modest. Choose a ratio that covers the longest path within the shortest Target Time with margin.',
        ],
        [
          'Calibration',
          'Real wheels compress, and tire diameter varies, so calculate distance per count from a measured run rather than the nominal size. Drive a commanded number of counts, measure the actual distance with a tape, and adjust the conversion factor. Repeat in both directions, since forward and reverse can differ slightly due to backlash and weight shift.',
        ],
        [
          'Sources of error',
          'Wheel slip during hard acceleration or braking, uneven floors, debris, tire wear, and gear backlash all make encoder distance differ from true distance. Accelerate and brake smoothly, keep tires clean, and use the same floor type when calibrating. The supervisor may approve substances applied to the vehicle, but they must not leave residue, and the track must stay dry.',
        ],
        [
          'Two wheels, one line',
          'Encoders on both drive wheels let the controller compare them. If one wheel counts more, the vehicle is turning. Correcting the speeds to keep counts equal keeps the vehicle straight. Alternatively, a single drive motor with a differential or a fixed axle avoids mismatch but makes steering corrections impossible. Many teams use one motor and careful alignment.',
        ],
      ],
      terms: [
        ['Circumference', 'π × wheel diameter; distance per revolution.'],
        ['Rotary encoder', 'Sensor that outputs pulses as a shaft turns.'],
        ['Quadrature', 'Two offset encoder signals that reveal direction.'],
        ['Gear ratio', 'Motor turns per wheel turn.'],
        ['Backlash', 'Play in gears that causes lost motion on reversing.'],
        ['Wheel slip', 'Wheel turning without the vehicle moving the matching distance.'],
      ],
      example: [
        'A 6.5 cm wheel drives a 100-count-per-revolution encoder through a 3:1 motor-to-wheel gear ratio, with the encoder on the motor shaft. How many counts for 8.60 m?',
        [
          'Counts per wheel revolution = 100 × 3 = 300.',
          'Distance per count = π × 6.5 ÷ 300 ≈ 0.068 cm.',
          'Counts for 860 cm = 860 ÷ 0.068 ≈ 12,630.',
        ],
        'Command about 12,630 counts, then correct the factor with a measured calibration run.',
      ],
      mcq: [
        [
          'A 5.0 cm wheel turns 40 times without slipping. About how far does the vehicle travel?',
          '6.28 m',
          ['2.00 m', '12.57 m', '0.63 m'],
          'Distance = revolutions × π × diameter = 40 × π × 5.0 cm ≈ 628 cm, or 6.28 m.',
        ],
        [
          'Why are quadrature encoders useful in this event?',
          'They detect direction, which matters when the vehicle reverses',
          [
            'They measure battery voltage',
            'They replace the pencil trigger',
            'They measure the bottle distance',
          ],
          'Two offset signals tell the controller which way the shaft turns, so counts can be added going forward and subtracted in reverse.',
        ],
        [
          'Mounting the encoder on the motor shaft instead of the wheel axle with a 5:1 reduction:',
          'Gives five times as many counts per wheel turn',
          ['Gives one-fifth as many counts', 'Has no effect', 'Prevents reversing'],
          'The motor turns five times for every wheel turn, so a motor-shaft encoder produces five times as many counts, improving resolution.',
        ],
      ],
      written: [
        [
          'Why calibrate distance per count with a measured run?',
          'Actual wheel diameter, tire compression, and slip differ from nominal values, so a measured run gives the true conversion.',
          'Calibration absorbs real-world differences such as tire compression into one measured factor. Measuring both directions also reveals backlash effects.',
        ],
        [
          'Give two causes of wheel slip and one way to reduce it.',
          'Hard acceleration and sudden braking, or dusty floors; reduce slip with gradual speed ramps and clean tires.',
          'Slip breaks the link between counts and distance. Smooth control and good traction keep encoder readings accurate.',
        ],
        [
          'How can two encoders keep a vehicle straight?',
          'The controller compares left and right counts and adjusts motor speeds to keep them equal.',
          'Unequal counts mean the vehicle is turning. Feedback that equalizes wheel travel corrects heading during the run.',
        ],
        [
          'Why choose a gear ratio with speed margin?',
          'The vehicle must cover the full path within the shortest possible Target Time, even with low batteries and pushing a bottle.',
          'With 10-second targets and long paths, speed is needed. Margin protects against voltage sag and the added load of the bottle.',
        ],
      ],
      flow: [
        ['Rotate', 'Motor turns the wheels through gears.'],
        ['Count', 'Encoder pulses track rotation and direction.'],
        ['Convert', 'Calibrated factor turns counts into distance.'],
      ],
      compare: [
        ['Wheel encoder', 'Directly tracks wheel rotation', 'Fewer counts per turn.'],
        ['Motor encoder', 'High resolution', 'Includes gear backlash.'],
        ['Time-based control', 'Simple', 'Drifts with battery voltage.'],
      ],
      challenge: 'Convert a planned path into encoder counts and estimate the resolution.',
      takeaway:
        'Accurate stopping needs fine distance sensing and a calibration done on real floors.',
      evidence: {
        observations: [
          ['Forward test', 'Commanded 500 cm, measured 503.5 cm.'],
          ['Reverse test', 'Commanded 150 cm back, measured 148.9 cm.'],
          ['Tires', 'Rubber O-rings, slightly compressed under load.'],
        ],
        question: 'What should the team do?',
        options: [
          'Use separate calibration factors for forward and reverse',
          'Ignore the error because it is under 1 percent',
          'Switch to time-based stopping',
        ],
        correct: 0,
        explanation:
          'Forward overshoots by 0.7 percent and reverse undershoots by 0.7 percent, likely from backlash and weight shift. At 2 points per cm, separate factors are worth several points.',
      },
    },
    {
      title: 'Control: speed profiles, stopping, and hitting the Target Time',
      objectives: [
        'Design a speed profile that meets the Target Time.',
        'Use feedback to stop accurately.',
        'Plan the reverse and final stop within the time budget.',
      ],
      sections: [
        [
          'Microcontrollers allowed',
          'Electronic components including microcontrollers are allowed, and teams may connect to them over WiFi, Bluetooth, or USB to program them. The program must be developed by the team; starting from shells or small online examples is fine, but single-source programs are prohibited. AI may help with design before the competition day but may not be used during event time.',
        ],
        [
          'Speed profile',
          'A trapezoidal profile accelerates gently, cruises, then decelerates before each stop. Total time includes the forward leg, the pause to reverse, the reverse leg, and the settling of the final stop. Given a path length and Target Time, the program can compute the cruise speed. Slower, smoother motion reduces slip and overshoot, so use the full Target Time.',
        ],
        [
          'Feedback control',
          'Open-loop control sends a fixed power and hopes; closed-loop control measures and corrects. A proportional controller sets motor power in proportion to remaining distance, so the vehicle slows as it approaches. Adding integral and derivative terms (PID) removes steady errors and damps overshoot. Tune gains on the real floor with a weighted bottle, since floor friction and bottle drag change how the vehicle responds.',
        ],
        [
          'Braking and settling',
          'Run Time ends only when the vehicle has been still for 3 seconds, and any rocking is included. Electronic braking by shorting the motor, or holding position with the controller, stops quickly. Overshoot followed by correction wastes time and may move the MP. A firm, final stop also prevents coasting after the program ends, which would move the MP after you think the run is over.',
        ],
        [
          'Timing accuracy',
          'Time Score is only 0.5 points per second, so a 1-second error costs half a point, but there is no reason to waste it. Measure your actual run times, including the trigger delay and settling, and adjust the cruise speed. Battery voltage changes speed, so closed-loop speed control keeps timing steady as batteries drain.',
        ],
        [
          'Testing the program',
          'Test every legal combination type: short and long targets, near and far bottle lines, and fast and slow times. A run that works at 7 m in 15 s may fail at 9 m in 10 s. Log commanded and measured values for each test. Once a run starts, you may not use or view your programming tools until the vehicle is retrieved.',
        ],
      ],
      terms: [
        ['Open-loop control', 'Commands without measuring the result.'],
        ['Closed-loop control', 'Commands corrected using sensor feedback.'],
        ['PID controller', 'Feedback using proportional, integral, and derivative terms.'],
        ['Trapezoidal profile', 'Accelerate, cruise, decelerate motion plan.'],
        ['Overshoot', 'Passing the target before correcting back.'],
        ['Complete stop', 'Stationary for 3 seconds; ends Run Time.'],
      ],
      example: [
        'Total MP travel is 8.60 m forward plus 1.60 m back. Target Time is 15.0 s. You allow 1.0 s for each of four speed ramps, 0.5 s to reverse, and 0.3 s of settling. What cruise speed is needed?',
        [
          'Time outside cruise: 4 × 1.0 + 0.5 + 0.3 = 4.8 s; cruise time = 10.2 s.',
          'Each ramp covers about half the cruise speed for 1 s, so four ramps ≈ 2 × v.',
          'Distance: 10.2v + 2v = 10.20 m, so v ≈ 0.84 m/s.',
        ],
        'Cruise at about 0.84 m/s, then fine-tune from measured run times.',
      ],
      mcq: [
        [
          'A proportional controller sets motor power based on:',
          'The remaining distance to the target',
          ['The battery’s label', 'The elapsed time only', 'The pusher width'],
          'Proportional control makes power proportional to the error, here distance remaining. The vehicle slows smoothly as it approaches the stopping point.',
        ],
        [
          'When does Run Time end?',
          'When the vehicle has been stationary for 3 seconds (the 3 s not counted)',
          [
            'When the bottle crosses the line',
            'When the MP first passes the Target Point',
            'Exactly at the Target Time',
          ],
          'Run Time ends at a complete stop, defined as 3 seconds stationary; those 3 seconds are not included, but rocking and recoil before them are.',
        ],
        [
          'Which tool use is prohibited during event time?',
          'Using AI to adjust the program',
          [
            'Programming over USB',
            'Adjusting the program over Bluetooth',
            'Using a tape measure to check the track',
          ],
          'Teams may program over WiFi, Bluetooth, or USB and verify track dimensions, but AI may not be used by participants or the device during event time.',
        ],
      ],
      written: [
        [
          'Why is closed-loop speed control better than fixed power for timing?',
          'Fixed power gives a speed that changes with battery voltage and load; feedback measures speed and corrects it, keeping run time consistent.',
          'Voltage sags as batteries drain and the bottle adds load. Closed-loop control holds speed despite these changes.',
        ],
        [
          'Explain how overshoot can cost points.',
          'Passing the target and correcting back adds time, may leave the MP off target, and any oscillation is counted in Run Time.',
          'Overshoot affects both distance and time. Tuning for a damped approach avoids both costs and gives a cleaner final stop.',
        ],
        [
          'Why test at extreme combinations of posted values?',
          'Long distances with short times demand top speed, while short paths with long times demand slow, steady control; a program must work at both extremes.',
          'Corner cases reveal top-speed limits and slow-speed control instability that tests in the middle of the range never show.',
        ],
        [
          'What must the team not do once a run starts?',
          'Use, view, or access its programming tools until the vehicle is retrieved.',
          'The rule prevents remote adjustment during a run. Teams also may not follow the vehicle down the track before being called.',
        ],
      ],
      flow: [
        ['Plan', 'Compute legs and cruise speed from posted values.'],
        ['Drive', 'Feedback follows the speed profile.'],
        ['Stop', 'Brake firmly and hold still at the target.'],
      ],
      compare: [
        ['Open loop', 'Simple code', 'Drifts with voltage and load.'],
        ['P control', 'Smooth approach', 'May stop slightly short.'],
        ['PID control', 'Accurate and damped', 'Needs careful tuning.'],
      ],
      challenge: 'Design a speed profile that meets a Target Time with smooth stops.',
      takeaway:
        'Measure, correct, and stop firmly: feedback turns a fast car into an accurate one.',
      evidence: {
        observations: [
          ['Fresh batteries', 'Fixed-power run: 13.4 s, stop error 4 cm.'],
          ['Half-drained', 'Same code: 15.9 s, stop error 9 cm.'],
          ['Closed-loop version', 'Both battery states: 15.0 ± 0.2 s, stop error 1–2 cm.'],
        ],
        question: 'What does the comparison show?',
        options: [
          'Feedback control makes time and stopping independent of battery state',
          'Fresh batteries are always slower',
          'Fixed power is more accurate',
        ],
        correct: 0,
        explanation:
          'The fixed-power program changed with voltage, but the closed-loop version held the same time and small error at both charge levels, because it measured and corrected speed and position.',
      },
    },
    {
      title: 'The bottle pusher: catching, pushing, and the narrow-opening bonus',
      objectives: [
        'Apply the bottle pusher and moving-bottle rules.',
        'Calculate the Pusher Bonus for a design.',
        'Balance a narrow opening against reliable capture.',
      ],
      sections: [
        [
          'Pusher rules',
          'The bottle pusher must be attached to the front and be the foremost part of the vehicle. It must be rigid, with no flexing, moving parts, or size changes, and only one may be impounded. Its foremost edges must be rounded, about the diameter of a #2 pencil or larger. It must be able to push bottles that are not perfectly round, and kit pushers may not be used.',
        ],
        [
          'The bottle',
          'The bottle is a clear single-use 500 mL water bottle, 6 to 7 cm in diameter and 18 to 22 cm tall, weighted to 80–100 g with metal BBs, not liquid. It must stay upright and in contact with the floor, may only be pushed, and only the pusher may touch it. No part of the vehicle may go under it, and nothing beyond the measured opening may contact it.',
        ],
        [
          'Measuring the opening',
          'The supervisor measures the widest opening of the pusher to 0.1 cm. Teams without a designated pusher use 35.0 cm. The Pusher Bonus is (opening − 35.0) × 1.5, so a 10 cm opening gives −37.5 points on every run, while a 30 cm opening gives only −7.5. That is one of the largest single sources of points in the event.',
        ],
        [
          'Capture geometry',
          'A narrow pusher only works if the bottle enters it. A V or funnel shape guides a slightly off-center bottle into a pocket. The opening must be wider than the bottle’s 6–7 cm diameter plus your expected lateral error at the bottle location. If your vehicle drifts 1.5 cm at 3 m, a 10–11 cm opening with a centering V is a reasonable target.',
        ],
        [
          'Pushing stably',
          'A tall, light bottle tips if pushed too high or too hard. Contact low on the bottle, near its base, and accelerate gently once it is captured. A curved pocket keeps the bottle from sliding sideways. Test with bottles at 80 g and 100 g and with slightly dented bottles, since real bottles vary and the rules require handling imperfect ones.',
        ],
        [
          'Releasing the bottle',
          'When the vehicle stops and reverses, the bottle should stay where it is. A pocket with no hooks lets the bottle simply remain as the vehicle backs away. Decelerate smoothly before reversing so the bottle does not roll forward too far. Measure how far the bottle slides after the vehicle stops and include that in your path plan.',
        ],
      ],
      terms: [
        ['Bottle Pusher', 'Rigid front device that catches and pushes the bottle.'],
        ['Widest opening', 'Measured mouth of the pusher, used for the bonus.'],
        ['Funnel (V) entry', 'Angled guides that center an offset bottle.'],
        ['Pocket', 'The shaped area where the captured bottle rests.'],
        ['Moving-bottle rules', 'Bottle stays upright, on the floor, pushed only by the pusher.'],
        ['Lateral error', 'Sideways offset of the vehicle from the center line.'],
      ],
      example: [
        'Compare pushers with openings of 9.0 cm and 15.0 cm. The 9.0 cm version catches the bottle in 8 of 10 tests; the 15.0 cm version in 10 of 10. A miss costs about 420 points (400 cm bottle penalty plus no bonus).',
        [
          '9.0 cm bonus: (9 − 35) × 1.5 = −39.0; 15.0 cm bonus: −30.0.',
          'Expected miss cost: 9.0 cm → 0.2 × 420 = 84; 15.0 cm → 0.',
          'Expected net: 9.0 cm ≈ +45; 15.0 cm ≈ −30.',
        ],
        'The reliable 15.0 cm pusher is about 75 points better on average, despite its smaller bonus.',
      ],
      mcq: [
        [
          'Which pusher feature is NOT allowed?',
          'Hinged arms that close around the bottle',
          ['A rigid V-shaped funnel', 'Rounded front edges', 'A curved pocket'],
          'The pusher must be rigid with no moving parts or size changes. Hinged arms are moving parts. Funnels, rounded edges, and pockets are fine.',
        ],
        [
          'What happens if the vehicle tips the bottle over while pushing?',
          'The Bottle Distance is set to 400.0 cm',
          [
            'A −20 bonus is still earned',
            'The run is restarted',
            'Nothing, if it crosses the line',
          ],
          'Keeping the bottle upright is a moving-bottle requirement. Violating it sets Bottle Distance to 400.0 cm, which adds 400 points.',
        ],
        [
          'A pusher’s widest opening is 35.0 cm. What is its Pusher Bonus?',
          '0',
          ['−52.5', '+35', '−35'],
          'Pusher Bonus = (35.0 − 35.0) × 1.5 = 0. Narrower openings give negative (helpful) bonuses; teams without a pusher are treated as 35.0 cm.',
        ],
      ],
      written: [
        [
          'Why might a team choose a wider pusher than the narrowest possible?',
          'A slightly wider pusher catches the bottle reliably despite lateral error, avoiding the huge cost of a miss.',
          'Expected value combines bonus and reliability. A rare miss of hundreds of points outweighs a few points of bonus.',
        ],
        [
          'Describe how a V-shaped entry helps capture the bottle.',
          'Angled guides contact an off-center bottle and slide it toward the middle pocket as the vehicle moves forward.',
          'The V converts sideways offset into a centering motion, letting a narrow pocket accept bottles that arrive slightly off line.',
        ],
        [
          'Why push low on the bottle?',
          'Pushing near the base reduces the tipping moment, keeping the tall bottle upright.',
          'A force applied high on a tall object creates a larger turning effect about its base. Low contact keeps it stable.',
        ],
        [
          'Why should teams test with dented or off-weight bottles?',
          'Real bottles vary from 80 to 100 g and may not be perfectly round, and the pusher must handle them.',
          'The rules require handling imperfect bottles. Testing variations prevents surprises with the supervisor’s bottle on competition day.',
        ],
      ],
      flow: [
        ['Approach', 'Funnel centers the bottle.'],
        ['Capture', 'Bottle rests in the pocket.'],
        ['Push', 'Low contact, gentle acceleration, upright bottle.'],
      ],
      compare: [
        ['Narrow opening', 'Large bonus per run', 'Needs accurate aim.'],
        ['Wide opening', 'Reliable capture', 'Smaller bonus.'],
        ['No pusher', 'Measured as 35.0 cm', 'No bonus and risky pushing.'],
      ],
      challenge: 'Choose a pusher width from your measured lateral error.',
      takeaway: 'The pusher bonus is big, but only a pusher that always captures earns it.',
      evidence: {
        observations: [
          ['Lateral error at bottle', 'Up to ±2.0 cm in 20 runs.'],
          ['Pusher A', '8.0 cm opening, no funnel: 14 of 20 captures.'],
          ['Pusher B', '11.0 cm opening with V entry: 20 of 20 captures.'],
        ],
        question: 'Which pusher should the team use?',
        options: ['Pusher B', 'Pusher A', 'No pusher'],
        correct: 0,
        explanation:
          'Pusher A’s 4.5-point larger bonus is wiped out by missing 30 percent of bottles. Pusher B captures every time with a still large −36 bonus.',
      },
    },
    {
      title: 'Power, construction limits, and legal parts',
      objectives: [
        'Apply the battery, energy storage, and size limits.',
        'List prohibited components and devices.',
        'Meet the kit modification and programming rules.',
      ],
      sections: [
        [
          'Batteries',
          'All electrical energy used by the vehicle for any purpose must come from at most eight AA batteries. Each must be a commercial AA cell with its original label, between 1.2 and 1.5 V when fully charged, individually removable from any pack. Lithium and lead batteries are prohibited; teams using them may not run and receive participation points only.',
        ],
        [
          'No extra energy storage',
          'Devices that let the vehicle exceed the instantaneous energy available from the batteries, such as large capacitors or springs, are not allowed. Propulsion must be electric and from the AA batteries. Alignment or sighting devices may have their own power source, but lasers are prohibited everywhere, and cameras of any kind are banned.',
        ],
        [
          'Size and parts',
          'The vehicle must be no longer than 80.0 cm and no wider than 35.0 cm at any point. All parts must move together: no anchors, tethers, ramps, or separate pieces. Only wheels or treads, and parts already touching the floor at the start, may contact the floor. Pieces falling off during a run are a construction violation, as is remote control.',
        ],
        [
          'The Measurement Point',
          'The MP must be the rearmost part, at most 1.0 cm above the track, and easy to measure. A skewer tip, pencil tip, or wire end works. Because it is used for every distance measurement, it must be rigid. A flexible or wobbling MP changes position after stopping and makes your carefully controlled stop meaningless. Glue it firmly and check it after every test run.',
        ],
        [
          'Kits and code',
          'Purchased or open-source kits are allowed if the team makes at least two functional modifications, documents them on the Kit Modification Form, and impounds the form. Kit pushers are not allowed, and kits may supply only common parts, not custom circuit boards. The program must be developed by a team member; single-source programs are prohibited.',
        ],
        [
          'Design knowledge',
          'Participants must answer questions about design, construction, and operation. Be ready to explain your drivetrain, sensing, control algorithm, battery choice, and pusher geometry. A neat wiring layout with labeled connections also makes inspection faster and repairs easier during the 8-minute event time, since all energy sources must be easy for the supervisor to inspect. Spare batteries and a printed wiring diagram speed up repairs.',
        ],
      ],
      terms: [
        ['AA battery', 'Commercial labeled cell, 1.2–1.5 V when charged; up to eight allowed.'],
        ['Energy storage device', 'A capacitor or spring that could exceed battery power; banned.'],
        ['Kit Modification Form', 'Document of two functional changes to a kit; impounded.'],
        ['Single-source program', 'Code copied whole from one source; prohibited.'],
        ['Tether', 'Physical connection to the vehicle during a run; banned.'],
        ['Construction violation', 'Rule break adding 300 points to a run.'],
      ],
      example: [
        'A team’s vehicle uses six NiMH AA cells, a motor driver chip, a microcontroller, a 1 F supercapacitor to boost acceleration, and a laser pointer for aiming. What must change?',
        [
          'Six labeled NiMH AAs, a motor driver, and a microcontroller are allowed.',
          'The supercapacitor is an energy storage device that can exceed battery power: remove it.',
          'The laser pointer is prohibited: replace it with a non-laser sighting device.',
        ],
        'Remove the supercapacitor and the laser; the rest is legal.',
      ],
      mcq: [
        [
          'What is the maximum vehicle width?',
          '35.0 cm',
          ['80.0 cm', '30.0 cm', '50.0 cm'],
          'The vehicle must not exceed 35.0 cm wide at any point and 80.0 cm long including all components.',
        ],
        [
          'Which energy source is allowed?',
          'Eight labeled 1.2 V NiMH AA cells',
          ['A lithium-ion pack', 'A wound spring to assist launch', 'A large capacitor bank'],
          'Up to eight commercial AA cells of 1.2–1.5 V are allowed. Lithium is banned, and springs or large capacitors are prohibited energy storage.',
        ],
        [
          'A team uses a kit with only one documented modification. What happens?',
          'A 50-point non-modification penalty on its runs',
          ['Participation points only', 'No penalty', 'A 300-point construction violation'],
          'Kits need at least two functional modifications documented on the impounded form; otherwise the non-modification penalty adds 50 points to Run Scores.',
        ],
      ],
      written: [
        [
          'Why are large capacitors banned even though they store electrical energy?',
          'They could release energy faster than the batteries can supply instantaneously, giving power beyond the AA limit.',
          'The rule caps available power at what eight AA cells can deliver. Storage that boosts instantaneous power breaks that limit.',
        ],
        [
          'Describe a good Measurement Point.',
          'A rigid pointed tip, such as a skewer end, that is the rearmost part, at most 1.0 cm above the track, and easy to reach.',
          'The MP defines every Vehicle Distance measurement. Rigidity and a clear point make the measurement match where the vehicle actually stopped.',
        ],
        [
          'What two things must a team using a kit provide?',
          'At least two functional modifications and an impounded Kit Modification Form documenting them, plus its own bottle pusher.',
          'Kit rules require documented modifications and a team-built pusher. Answers naming the form and modifications earn full credit.',
        ],
        [
          'Why must all energy sources be easy to access?',
          'So the supervisor can inspect batteries and other sources to verify they are legal.',
          'Inspection checks labels, chemistry, and count. Hidden sources slow inspection and can hide violations from the supervisor.',
        ],
      ],
      flow: [
        ['Power', 'Up to eight labeled AA cells.'],
        ['Build', 'Within 80 × 35 cm, one rigid body, no extra storage.'],
        ['Document', 'Kit form and team-written code.'],
      ],
      compare: [
        ['NiMH AA', 'Rechargeable, steady 1.2 V', 'Lower voltage than alkaline.'],
        ['Alkaline AA', '1.5 V fresh', 'Voltage sags with use.'],
        ['Kit chassis', 'Fast start', 'Needs two documented modifications.'],
      ],
      challenge: 'Audit a vehicle parts list for any violations.',
      takeaway:
        'Legal power and parts keep 300-point violations and participation-only results away.',
      evidence: {
        observations: [
          ['Parts list', '8 × AA alkaline, Arduino, encoder, 12 V boost converter.'],
          ['Inspection question', 'Does the boost converter store energy to exceed battery power?'],
          [
            'Team explanation',
            'It only steps up voltage continuously from the batteries; no large storage.',
          ],
        ],
        question: 'What is the key test for whether a component breaks the energy-storage rule?',
        options: [
          'Whether it lets the vehicle exceed the instantaneous energy available from the batteries',
          'Whether it is electronic',
          'Whether it changes voltage',
        ],
        correct: 0,
        explanation:
          'Electronic components are allowed. The rule targets storage such as large capacitors or springs that release more power than the batteries could supply at that moment.',
      },
    },
    {
      title: 'Competition day: impound, check-in, and running',
      objectives: [
        'Follow the impound, check-in, and run procedures.',
        'Avoid failed runs and violations.',
        'Use the 8-minute event time well.',
      ],
      sections: [
        [
          'Impound',
          'Impound happens before the first time slot. Teams impound one vehicle, batteries stored separately, spare parts, any alignment device, the Kit Modification Form if used, and any papers. Impounding more than one vehicle is a construction violation on all runs. Missing impound adds 5000 points to the Final Score, which effectively ends a team’s chances.',
        ],
        [
          'Check-in',
          'After the posted values are announced, teams retrieve their items when told. The supervisor inspects the vehicle, measures the pusher’s widest opening, and points out construction violations, which teams may fix during event time. Once check-in starts, participants may not leave or get outside help, may not use AC outlets, and may not use AI.',
        ],
        [
          'Event time',
          'Teams have 8 minutes to adjust, repair, and make two runs. A vehicle in ready-to-run configuration before time expires may finish its run. Teams may verify track dimensions and clean the track but must keep it dry, and may not tape the floor. No rolling the vehicle on the track floor before or after runs, or on the day before without permission.',
        ],
        [
          'Starting a run',
          'Place the MP over the Start Point within about 1 cm, with the vehicle body on the target side. The vehicle must stay put untouched. Tell the supervisor you are ready; event time pauses while they check the setup. Start the vehicle with a vertical motion of an unsharpened #2 pencil; only the pencil may touch the vehicle. If it does not move, no run occurred.',
        ],
        [
          'During and after',
          'Alignment devices must be placed within the track area, not fixed to the floor, and moved behind the Start Point before the run. Do not follow the vehicle down the track before being called; that is a competition violation. The supervisor measures Run Time, Vehicle Distance, and Bottle Distance, checks the bottle rules, and reports violations at the end of each run.',
        ],
        [
          'Failed runs and ties',
          'A run fails if the vehicle goes the wrong direction, starts before the supervisor is ready, cannot be measured, or is pushed. A team with only one successful run in 8 minutes gets a Failed Run as its second. Ties are broken by better Distance Score, then lower Time Score, then better Vehicle Distance, then the narrower pusher.',
        ],
      ],
      terms: [
        ['Impound', 'Turning in the vehicle and materials before the first time slot.'],
        ['Event time', 'Eight minutes to adjust and make two runs.'],
        ['Ready-to-run', 'Vehicle placed at the start, waiting for the trigger.'],
        ['Pencil trigger', 'Unsharpened #2 pencil used with a vertical motion to start.'],
        ['Alignment device', 'Sighting or guiding aid used within the track area, not a laser.'],
        [
          'Tiebreaker',
          'Distance Score, then Time Score, then Vehicle Distance, then pusher width.',
        ],
      ],
      example: [
        'With 1:30 left in event time, a team’s first run was successful. Its vehicle now has a loose wire. What should it do?',
        [
          'A second run is needed; without it, the second run counts as failed but the first still scores.',
          'Fix the wire quickly, re-enter the posted values if needed, and place the vehicle ready-to-run.',
          'Signal ready before time expires; a ready vehicle may complete its run.',
        ],
        'The best score of two runs counts, so a quick, careful second run can only help if it is clean.',
      ],
      mcq: [
        [
          'How must the vehicle be started?',
          'With an unsharpened #2 pencil using a vertical motion',
          ['By hand push', 'With a phone app', 'By releasing a held wheel'],
          'The rules require a vertical motion of an unsharpened #2 pencil, and only the pencil may contact the vehicle when triggering.',
        ],
        [
          'Which action results in a competition violation?',
          'Following the vehicle down the track before being called',
          [
            'Measuring the track during event time',
            'Cleaning the track while keeping it dry',
            'Programming over USB',
          ],
          'Following the vehicle before being called to retrieve it is a competition violation. The other actions are allowed.',
        ],
        [
          'What is the first tiebreaker?',
          'Better Distance Score of the scored run',
          ['Lower Time Score', 'Narrower pusher', 'Lighter vehicle'],
          'Ties are broken first by the better Distance Score of the scored run, then lower Time Score, then better Vehicle Distance, then lower pusher measurement.',
        ],
      ],
      written: [
        [
          'List three items to impound.',
          'The vehicle, its batteries stored separately, and spare parts; also any alignment device, papers, and the Kit Modification Form if used.',
          'Only impounded materials can be used during event time. Batteries are stored separately so the supervisor can inspect them.',
        ],
        [
          'Why does the supervisor pause event time before each run?',
          'To check the vehicle in its ready-to-run configuration for violations without using the team’s time.',
          'The pause covers inspection of setup. Violations are reported at the end of the run, and teams may ask specific questions beforehand.',
        ],
        [
          'Name two ways a run becomes a Failed Run.',
          'The vehicle travels the wrong direction, or starts before the supervisor is ready; also if it cannot be measured or is pushed.',
          'Failed Runs score a 2500-point Distance Score. Any two of the listed conditions earn credit.',
        ],
        [
          'Why is testing on the competition floor beforehand restricted?',
          'Rolling on the track gives an unfair calibration advantage, so it requires tournament permission and is banned during competition outside runs.',
          'Floor-specific calibration would benefit some teams. The rule keeps conditions fair for everyone competing on that track.',
        ],
      ],
      flow: [
        ['Impound', 'One vehicle, batteries separate, papers.'],
        ['Check in', 'Inspection and pusher measurement.'],
        ['Run twice', 'Pencil start; best run counts.'],
      ],
      compare: [
        ['Successful run', 'Measured and scored', 'Can still carry violations.'],
        ['Failed Run', 'Distance Score 2500', 'Avoid wrong-way and early starts.'],
        ['Missed impound', '+5000 on Final Score', 'Impound early.'],
      ],
      challenge: 'Run a full competition rehearsal with a timer and checklist.',
      takeaway: 'Procedures protect points: impound, check in calmly, and start cleanly.',
      evidence: {
        observations: [
          ['Run 1', 'Vehicle started while the supervisor was still positioning timers.'],
          ['Supervisor ruling', 'Run 1 recorded as a Failed Run.'],
          ['Run 2', 'Clean run scored 96.4.'],
        ],
        question: 'What is the team’s Final Score?',
        options: ['96.4', '2500', 'The average of the two runs'],
        correct: 0,
        explanation:
          'Starting before the supervisor is ready makes a Failed Run, but the Final Score is the better of the two Run Scores. The clean second run, 96.4, counts.',
      },
    },
  ],
});
