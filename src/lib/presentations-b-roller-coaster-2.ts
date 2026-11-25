import { defineDeck, type Deck } from './presentation-types.ts';

// Roller Coaster (Division B) presentations, lessons 5–7. Imported by presentations-b-roller-coaster.ts.

const timing = defineDeck('rc-u5-l1', [
  {
    kind: 'title',
    title: 'Hitting the Target Time',
    subtitle:
      'Time is the biggest score, and the trick is a track you can tune to any target in minutes.',
    objectives: [
      'Design slow, **adjustable** track sections.',
      'Calibrate the run time for any **Target Time**.',
      'Avoid stops and overtime penalties.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: the Target Time is 45 s. Which run time would you aim for?',
    options: ['44.5 s', '45.0 s exactly', 'About 45.5 s', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Target Time rules',
    bullets: [
      'The **Target Time** is between **30 and 60 seconds**.',
      'It moves in steps of 5 s at Regionals, 2 s at State, and 1 s at Nationals.',
      'It is revealed just before setup; teams then have **8 minutes** to set up and run.',
      '==Build a device you can adjust quickly to any time in the range==, not one tuned for a single value.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Why should a roller coaster be adjustable instead of tuned for one run time?',
    options: [
      'The Target Time is revealed only just before setup',
      'The Target Time is always 45 s',
      'Adjustable devices get bonus points',
      'The supervisor sets the time after the run',
    ],
    answer: 0,
    explanation:
      'The Target Time can be anything from 30 to 60 s and is announced right before the 8-minute period, so you must be able to retune fast.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Where time comes from',
    image: 'b-coast-marble2',
    caption:
      'Gently sloping rails zig-zag a marble down slowly: a **switchback** turns a short drop into a long, slow path.',
    bullets: [
      'Most run time comes from **long, gentle slopes, switchbacks, spirals, and elevators**.',
      'A ball rolling 1 to 2 m of nearly level track can take many seconds.',
      '**Funnels**, where the ball circles before dropping through, add time in a small space.',
      '==Each section should behave the same way every run==, so test each one alone.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which features add a lot of time in a small space? Select all that apply.',
    options: ['A funnel', 'A switchback', 'A spiral', 'A steep straight drop'],
    answers: [0, 1, 2],
    explanation:
      'Funnels, switchbacks, and spirals make the path long and slow. A steep drop is fast.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Adjusting time',
    bullets: [
      'Change the **slope**, add or remove a **section**, or choose between **alternate paths**.',
      'A **slope adjuster**, like a screw raising one end of a long section, gives ==fine control==.',
      'A removable spiral or loop gives **coarse control**.',
      'Measure the time each adjustment adds and keep it in a **calibration table**.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: planning for 46 s',
    problem:
      'Base path 34 s; each slope-screw turn adds 0.8 s; a removable spiral adds 9 s. Plan for a Target Time of 46 s.',
    steps: [
      'Add the spiral: 34 + 9 = **43 s**.',
      'Need about 3 s more: 3 ÷ 0.8 ≈ **4 screw turns**, giving 46.2 s.',
      '46.2 s is inside the **46.0–46.99 s** window that earns full points.',
    ],
    conclusion: 'Spiral plus 4 screw turns gives ==about 46.2 s==.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'Base path 30 s, spiral adds 8 s, each screw turn adds 0.5 s. You want about 41.5 s. With the spiral in, how many screw turns do you need?',
    answer: 7,
    tolerance: 0.01,
    unit: 'turns',
    explanation: '30 + 8 = 38 s. You need 3.5 s more: 3.5 ÷ 0.5 = 7 turns, for 41.5 s.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'The stopping problem',
    bullets: [
      'Slower sections risk the ball **stopping**.',
      'Timing ends if the ball stops and ==does not move again within 3 seconds==.',
      'A ball that stops earns **no Time Score**.',
      'Keep slopes just steep enough, and avoid **flat spots, sticky joints, and dips**.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'The ball pauses in a small dip for 4 seconds. What happens?',
    options: [
      'Timing ends and the Time Score is zero',
      'Timing pauses until it moves again',
      'The team may give it a push',
      'Nothing; dips are allowed',
    ],
    answer: 0,
    explanation:
      'If the ball stops and does not move again within 3 seconds, timing ends, and a ball that stops earns no Time Score.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Timing rules',
    bullets: [
      'Timing begins on **“Go”** when the pencil is removed.',
      'It ends when the ball **fully crosses the Finish Line**, when twice the Target Time passes, when the ball leaves the device, or when it stops.',
      'Three timekeepers are suggested, and the **median** time is used.',
      '==Time Score counts only full seconds==: 44.9 s counts as 44.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Three timers read 41.2 s, 42.0 s, and 41.6 s. Which time is used?',
    options: [
      '41.6 s, the median',
      '42.0 s, the longest',
      '41.2 s, the shortest',
      '41.6 s, the average rounded',
    ],
    answer: 0,
    explanation: 'The median is the middle value: 41.2, 41.6, 42.0. It counts as 41 full seconds.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Aiming for the sweet spot',
    bullets: [
      'Each full second up to the target earns 5 points; each full second past it loses 5.',
      'With a 45 s target: **44.9 s → 220**, because only 44 full seconds count.',
      '**45.0 to 45.99 s → 225**, the full score; **46.0 s → 220** again.',
      '==Aim for about half a second past the Target Time.==',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt: 'The Target Time is 50 s and the run takes 50.4 s. What is the Time Score?',
    answer: 250,
    tolerance: 0.01,
    unit: 'points',
    explanation:
      '50 full seconds count, and no full second has passed the target, so the score is the full 50 × 5 = 250.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Switchback', back: 'Zig-zag track that lengthens the path.' },
      { front: 'Funnel', back: 'A cone where the ball circles before dropping.' },
      { front: 'Slope adjuster', back: 'A device, like a screw, to fine-tune a section’s tilt.' },
      { front: 'Median time', back: 'The middle value of three timers.' },
      { front: 'Full second', back: 'The whole seconds counted for Time Score.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Timing ends if the ball stops for {0} seconds. Only {1} seconds count, so aim about half a second {2} the Target Time.',
    blanks: ['3', 'full', 'past'],
    distractors: ['10', 'half', 'before'],
    explanation:
      'A 3-second stop ends timing, only full seconds count, and half a second past the target lands in the full-points window.',
  },
  {
    kind: 'open',
    prompt: 'Why does a calibration table matter more than a perfectly tuned single run?',
    model:
      'The Target Time changes at every tournament and is announced just before setup. A table of how much time each adjustment adds lets you set any target in a few minutes instead of guessing.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Target Time is 30–60 s, revealed just before an 8-minute setup.',
      'Slow, repeatable sections; screws for fine control, removable spirals for coarse.',
      'A 3-second stop ends timing and the Time Score.',
      '==Only full seconds count: aim about 0.5 s past the target.==',
    ],
  },
]);

const construction = defineDeck('rc-u6-l1', [
  {
    kind: 'title',
    title: 'Size and construction',
    subtitle: 'Small earns points, but the track still needs room for time and a tall loop.',
    objectives: [
      'Balance **Size Score** against loop and timing needs.',
      'Build a sturdy, compact, adjustable device.',
      'Meet **Start**, **Finish**, and **safety stop** rules.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which dimension do you think is easiest to shrink?',
    options: ['Height', 'Width', 'Length', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Size trade-offs',
    bullets: [
      'Size Score gives ==one point per centimeter under each limit==.',
      'But the track needs **length for timing** and **height for the loop**.',
      'A 45 × 20 × 60 cm device earns 15 + 10 + 20 = **45 Size points**.',
      'Shrinking further usually means less time or a smaller loop, so balance the points.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'A device is 50 cm high, 22 cm wide, and 70 cm long. What is its Size Score?',
    answer: 28,
    tolerance: 0.01,
    unit: 'points',
    explanation: '(60 − 50) + (30 − 22) + (80 − 70) = 10 + 8 + 10 = 28 points.',
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: size versus loop',
    problem:
      'Option 1: 55 × 25 × 75 cm with a 22 cm loop. Option 2: 45 × 20 × 65 cm with a 15 cm loop. Compare Size + Loop points.',
    steps: [
      'Option 1: Size 5 + 5 + 5 = **15**; Loop 22 × 3 = **66**; total **81**.',
      'Option 2: Size 15 + 10 + 15 = **40**; Loop 15 × 3 = **45**; total **85**.',
      'Option 2 scores 4 more, if both hit the Target Time equally.',
    ],
    conclusion: 'Option 2 edges ahead, but they are close, so ==reliability decides==.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Using volume well',
    bullets: [
      'Compact designs **stack track in layers**, use **spirals**, and fold **switchbacks** inside the footprint.',
      '**Elevators** let the ball climb back up and reuse the same space.',
      '==Width is often the cheapest dimension to save==: a narrow tower can hold long, folded track.',
      'Measure at the widest, longest, and highest points, including moving parts.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Why is width often the easiest dimension to save?',
    options: [
      'A narrow tower can still hold long track folded back and forth',
      'Width is not measured',
      'Width is worth 3 points per cm',
      'The loop needs no width',
    ],
    answer: 0,
    explanation:
      'Track can zig-zag in layers inside a narrow frame, so you keep the path length while saving width points.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Start and Finish',
    bullets: [
      'Exactly ==one labeled Start Line and one Finish Line==, perpendicular to the ball’s direction.',
      'Their positions **may not change after impound**.',
      'The ball sits completely behind the Start Line, held by an unsharpened **#2 pencil**.',
      'After the Finish, a **safety stop**, like a cup or padded end, must stop the ball.',
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt: 'Which follow the Start and Finish rules? Select all that apply.',
    options: [
      'A cup that catches the ball after the Finish Line',
      'Moving the Finish Line after impound to fix the time',
      'Ball held fully behind the Start Line by a pencil',
      'Two Start Lines to choose from',
    ],
    answers: [0, 2],
    explanation:
      'There is one Start and one Finish, fixed after impound, the ball waits behind the Start held by a pencil, and a safety stop catches it.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Materials',
    bullets: [
      'Tracks: **foam pipe insulation cut in half**, flexible plastic channel, wire rails, or bent wooden strips.',
      'Frames: **wood, foam board, or plastic**.',
      '==Rigid frames keep slopes from changing between runs.==',
      'No magnets or electrical parts. Choose materials easy to adjust that stay where they are set.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Is each material a good choice for the device?',
    bins: ['Good choice', 'Not allowed or a poor choice'],
    items: [
      ['Foam pipe insulation cut in half', 0],
      ['A rigid wooden frame', 0],
      ['Magnetic strips to guide the ball', 1],
      ['Floppy paper track that sags', 1],
      ['Flexible plastic channel', 0],
    ],
    explanation:
      'Smooth tracks on rigid frames keep slopes steady. Magnets are banned, and sagging track changes the timing.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Stability and transport',
    image: 'boom-level',
    caption: 'A bubble level shows at a glance whether the device’s base is level.',
    bullets: [
      'The device must survive transport and impound **without its slopes changing**.',
      'Use **screws or bolts** for adjustable parts and **glue** for fixed ones.',
      '**Leveling feet** help on uneven tables.',
      '==A few millimeters of tilt change times==, so check calibration after moving it.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'At the tournament your runs are 2 s slower than at home. What should you check first?',
    options: [
      'Whether the base is level on the new table',
      'The color of the labels',
      'The diagram',
      'Whether the Target Time changed',
    ],
    answer: 0,
    explanation:
      'A slightly tilted table changes every slope. Level the device with its feet and a bubble level, then recheck the time.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Visibility and labels',
    bullets: [
      'The ball must ==stay visible at all times==, so tunnels must be clear.',
      'Label the **Start Line, Finish Line, both elevators, the loop POI, and loop height**.',
      'Clear labels help the supervisor score quickly and avoid missed points.',
      'Keep a **diagram** of each section for design questions.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which should be clearly labeled on the device? Select all that apply.',
    options: ['Start Line', 'Both elevators', 'Loop POI and height', 'The team’s favorite color'],
    answers: [0, 1, 2],
    explanation:
      'Start, Finish, each elevator, the loop POI, and loop height need labels so they can be scored.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Footprint', back: 'The area the device covers on the table.' },
      { front: 'Layered track', back: 'Track stacked at different heights.' },
      { front: 'Safety stop', back: 'A mechanism that stops the ball after the Finish.' },
      { front: 'Leveling feet', back: 'Adjustable supports for a level base.' },
      { front: 'Finish Line', back: 'The labeled line that ends timing when crossed.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Size Score gives one point per {0} under each limit. Width is often the {1} dimension to save, and the ball must stay {2} at all times.',
    blanks: ['centimeter', 'cheapest', 'visible'],
    distractors: ['millimeter', 'hardest', 'hidden'],
    explanation:
      'One point per cm saved, width is easiest to shrink, and the ball must always be visible.',
  },
  {
    kind: 'open',
    prompt: 'Describe how you would fit a long, slow track into a narrow device.',
    model:
      'Stack switchbacks in layers inside a tall, narrow frame, add a spiral or funnel for extra time, and use an elevator to lift the ball back up so the same space is reused.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Each cm saved is 1 Size point, but loops earn 3 per cm: balance them.',
      'Layers, spirals, switchbacks, and elevators save space; width is cheapest to cut.',
      'One labeled Start and Finish, a pencil release, and a safety stop.',
      '==Rigid, level, labeled, and visible.==',
    ],
  },
]);

const competition = defineDeck('rc-u7-l1', [
  {
    kind: 'title',
    title: 'Testing and competition day',
    subtitle: 'Two scorable runs, eight minutes: a well-tested device and a plan win the day.',
    objectives: [
      'Run **controlled tests** and record results.',
      'Use the **8-minute period** efficiently.',
      'Follow run procedures to avoid violations.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how many times should you test a final setting before a tournament?',
    options: ['Once', 'Three times', 'Ten or more', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Testing plan',
    image: 'hov-accuracy',
    caption: 'High precision, low accuracy: the shots cluster tightly but miss the center.',
    bullets: [
      '**Test one change at a time.**',
      'Run each setting several times; record each time, whether the loop and elevators worked, and where failures happened.',
      'Repeated tests show the **average** and the **spread**.',
      '==A small spread is easier to tune==; test each final setting at least ten times.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'Design A runs 40.1, 40.3, 40.2 s. Design B runs 38.0, 42.5, 40.4 s. Which is easier to tune for a Target Time?',
    options: [
      'Design A, because its spread is small',
      'Design B, because it has the longest run',
      'They are equally easy',
      'Design B, because its average is higher',
    ],
    answer: 0,
    explanation:
      'A small spread means a predictable time. Design B could miss the target by seconds even when tuned.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Reliability first',
    bullets: [
      'Only **two scorable runs** are allowed, and a failure costs many points at once.',
      'A stopped ball loses the Time Score; a failed loop or elevator loses its points.',
      '==Make every feature work every time== before chasing a taller loop or smaller size.',
      'Fix the weakest part, then retest the whole run.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Your elevator fails 2 times in 10. What should you do before making the loop taller?',
    options: [
      'Find and fix why the elevator fails, then retest the whole run',
      'Make the loop taller anyway',
      'Remove the Start Line',
      'Hope it works on competition day',
    ],
    answer: 0,
    explanation:
      'Reliability comes first. Fix the weakest part, then retest everything, because a fix can change later timing.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'The 8-minute period',
    bullets: [
      'After impound, teams have **8 minutes** to set up and complete up to **two scorable runs**.',
      'Practice runs are allowed; **measurement time is not counted**.',
      'A scorable run that starts before time ends **may finish**.',
      '==Plan: set the Target Time adjustment, do one or two practice runs, then score.==',
    ],
  },
  {
    kind: 'order',
    section: 2,
    prompt: 'Put the 8-minute plan in order.',
    items: [
      'Retrieve the device from impound',
      'Set the adjustment for the Target Time',
      'Do one or two practice runs',
      'Declare and run the scorable runs',
    ],
    explanation: 'Set the time from your calibration table, check it with practice, then score.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Running a scorable run',
    bullets: [
      '**Declare** a scorable run before starting.',
      'Place the supervisor’s #2 pencil on the Start Line with the ball fully behind it.',
      'On “3, 2, 1, Go,” remove the pencil ==without pushing the ball==.',
      'Do **not touch** the device during the run; between runs you may adjust, level, or swap the ball.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'When is each action allowed?',
    bins: ['During a scorable run', 'Only between runs', 'Never'],
    items: [
      ['Pulling the pencil on “Go”', 0],
      ['Turning a slope screw', 1],
      ['Swapping the ball', 1],
      ['Nudging a stuck ball', 2],
      ['Leveling the device', 1],
    ],
    explanation:
      'During a run you only release the ball; adjustments happen between runs, and touching the device during a run is never allowed.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Using the second run',
    bullets: [
      '==The better run counts.==',
      'If the first run is close, keep the settings and use the second for safety or a small fine-tune.',
      'If it missed by a few seconds, adjust using your **calibration table**.',
      'Never make a large untested change unless the first run failed badly.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: a practice-run correction',
    problem:
      'Target 52 s. Practice run: 50.6 s. The calibration table says each screw turn adds 0.4 s. What should the team do?',
    steps: [
      'Aim for about **52.5 s**, half a second past the target: about 1.9 s more.',
      '1.9 s ÷ 0.4 s per turn ≈ **5 turns**, giving about 52.6 s.',
      'Make 5 turns, then declare the scorable run.',
    ],
    conclusion: 'Add 5 turns for ==about 52.6 s==.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'Target 40 s. A practice run takes 37.0 s, and each screw turn adds 0.5 s. Aiming for 40.5 s, how many turns should you add?',
    answer: 7,
    tolerance: 0.01,
    unit: 'turns',
    explanation: 'You need 40.5 − 37.0 = 3.5 s more: 3.5 ÷ 0.5 = 7 turns.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Questions and review',
    bullets: [
      'Be ready to answer questions about the device’s **design, construction, and operation**.',
      'Bring a **diagram** and your **calibration table**.',
      '==Review the scoresheet with the supervisor== before leaving: sizes, elevators, loop, and times.',
      'Note lessons for next time.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'What should you check on the scoresheet before leaving the event area?',
    options: [
      'Size measurements, elevator and loop results, and times',
      'Only your team name',
      'Other teams’ scores',
      'Nothing; it is final',
    ],
    answer: 0,
    explanation:
      'Reviewing sizes, elevator and loop results, and times catches mistakes while they can still be fixed.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Scorable run', back: 'A declared run that may count for scoring.' },
      { front: 'Practice run', back: 'An unscored run during the 8 minutes.' },
      { front: 'Spread', back: 'How much the times vary between runs.' },
      { front: 'Calibration table', back: 'A record of the time each adjustment adds.' },
      { front: 'Better run', back: 'The higher-scoring of the two runs.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Teams have {0} minutes for setup and up to {1} scorable runs. Test one change at a time, and the {2} run counts.',
    blanks: ['8', 'two', 'better'],
    distractors: ['6', 'five', 'first'],
    explanation: 'Eight minutes, two scorable runs, and the better of the two counts.',
  },
  {
    kind: 'open',
    prompt: 'Your first scorable run was perfect. What do you do with the second run, and why?',
    model:
      'Keep the settings and either run it again as insurance or skip a risky change. The better run counts, so there is nothing to gain from a big untested adjustment.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Test one change at a time, ten or more runs per final setting; watch the spread.',
      'Reliability before ambition: every feature must work every time.',
      '==8 minutes: set the time, practice, then score; the better of two runs counts.==',
      'Declare runs, release with the pencil, never touch, and review the scoresheet.',
    ],
  },
]);

export const decks: Deck[] = [timing, construction, competition];
