import { defineDeck, type Deck } from './presentation-types.ts';
import { decks as later } from './presentations-b-elastic-launched-gliders-2.ts';

// Elastic Launched Gliders (Division B) presentations. Each deck follows its lesson section by
// section (`section` is the lesson section index), and its activities rehearse the lesson's rules,
// physics, worked example, and key terms. Lessons 5–7 are in presentations-b-elastic-launched-gliders-2.ts.

const rules = defineDeck('elg-u1-l1', [
  {
    kind: 'title',
    title: 'Rules, scoring, and planning five flights',
    subtitle:
      'All the energy comes from one stretch of elastic, and the score rewards three good flights.',
    objectives: [
      'State the **glider** and **launch handle** limits.',
      'Calculate a final score from several flights.',
      'Plan the **6-minute Flight Period**.',
    ],
    image: 'b-glide-kid',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which glider would you rather bring to competition?',
    options: [
      'One that flies 35 s once, then 10 s',
      'One that flies about 24 s every time',
      'It depends on luck',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The goal',
    bullets: [
      'Teams build up to **two free-flight gliders** launched by a stretched elastic band on a handle.',
      'Nothing powers the glider after release: ==all the energy comes from the launch==.',
      'A good flight **climbs high and steeply**, turns smoothly into a slow circling glide, and lands as late as possible.',
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Put the parts of a good flight in order.',
    items: [
      'The stretched elastic is released',
      'The glider climbs high and steeply',
      'It rolls over into a glide',
      'It circles slowly down',
      'It lands as late as possible',
    ],
    explanation:
      'The launch gives all the energy, the climb turns it into height, and a slow circling glide spends that height as slowly as possible.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Glider limits',
    bullets: [
      'Total mass must be ==more than 3.5 g and less than 10.0 g== for the whole flight.',
      'The glider must fit in a lidless **measurement box** of 32.0 × 24.0 × 47.0 cm.',
      'The nose must be **blunt** enough to pass the supervisor’s check.',
      '**Boron** is not allowed. Teams may add their own ballast to allow for different scales.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Is each glider legal or not?',
    bins: ['Legal', 'Not legal'],
    items: [
      ['A 6.2 g glider that fits the box', 0],
      ['A 3.4 g glider', 1],
      ['A 10.3 g glider', 1],
      ['A glider with boron strips', 1],
      ['A 9.5 g glider with a little clay ballast', 0],
    ],
    explanation:
      'Mass must be over 3.5 g and under 10.0 g, and boron is banned. Ballast is fine as long as the total stays in the window.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Launch handle limits',
    bullets: [
      'The handle, not counting the elastic, must be **less than 1 m** long in any direction.',
      'It is held by **one student** and must be safe.',
      'The elastic must be **non-metallic**, touch the glider through the launch, and stay attached to the handle.',
      '==If the elastic leaves the handle, timing ends for that flight.==',
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt: 'Which launch handles follow the rules? Select all that apply.',
    options: [
      'A 60 cm wooden handle with a rubber elastic tied on',
      'A 1.2 m pole',
      'A handle with a thin steel spring as the elastic',
      'A 45 cm handle held by one student',
    ],
    answers: [0, 3],
    explanation:
      'The handle must be under 1 m and held by one student, and the elastic must be non-metallic, so a steel spring is not allowed.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'The Flight Period',
    bullets: [
      'The **6-minute Flight Period** starts when the supervisor returns the launch handle.',
      'Teams may make up to **five official flights** with one or two gliders, plus trim flights.',
      'Declare each flight before launching: ==an undeclared flight is official==.',
      'A flight that begins within the period may finish. Launch standing on the floor, with no aids that raise launch height.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'A student launches without saying whether the flight is a trim flight. How is it counted?',
    options: [
      'As an official flight',
      'As a trim flight',
      'It is not counted at all',
      'The team must fly it again',
    ],
    answer: 0,
    explanation:
      'Every flight must be declared before launch, and an undeclared flight counts as official, so a bad trim flight could use up one of the five.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Scoring',
    bullets: [
      'Flight score = **flight time × flight log bonus**.',
      'The bonus is ==×1.2 for a complete log==, ×1.1 for a partial log, and ×1.0 without one.',
      'The **final score** is the sum of the **three best** flight scores.',
      'Ties are broken by the longest **non-scored** official flight score.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'A team with a complete log flies 20, 18, 15, 12, and 10 s. What is its final score?',
    answer: 63.6,
    tolerance: 0.05,
    explanation:
      'The three best flights are 20 + 18 + 15 = 53 s, and a complete log multiplies by 1.2: 53 × 1.2 = 63.6.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: final score and tiebreaker',
    problem:
      'A team with a complete log flies official flights of 22.4, 18.0, 25.1, 9.6, and 24.0 s. What are the final score and tiebreaker?',
    steps: [
      'Three best times: 25.1 + 24.0 + 22.4 = **71.5 s**.',
      'Final score = 71.5 × 1.2 = **85.80**.',
      'Tiebreaker: the longest non-scored flight, 18.0 × 1.2 = **21.60**.',
    ],
    conclusion: 'Final score 85.80, tiebreaker 21.60: ==every official flight can matter==.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Why consistency wins',
    bullets: [
      'The final score adds **three** flights, so one lucky flight is not enough.',
      'A glider that flies 25 s every time ==beats one that flies 35 s once== and 10 s the rest.',
      'Practice **repeatable launches and trim**.',
      'Five official flights give **two spares**, so one bad flight does not ruin the score.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'Glider A flies 35, 12, 11, 10, and 9 s; Glider B flies 24, 23, 22, 21, and 20 s. Both have complete logs. How many points higher is Glider B’s final score?',
    answer: 13.2,
    tolerance: 0.05,
    explanation:
      'A: (35 + 12 + 11) × 1.2 = 69.6. B: (24 + 23 + 22) × 1.2 = 82.8. B wins by 13.2 points: consistency beats one long flight.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Flight Period', back: '6 minutes, starting when the launch handle is returned.' },
      { front: 'Official flight', back: 'A declared scoring flight; up to five per team.' },
      { front: 'Final score', back: 'The sum of the three best flight scores.' },
      { front: 'Mass window', back: 'More than 3.5 g and less than 10.0 g.' },
      { front: 'Flight log bonus', back: '×1.2 complete, ×1.1 partial, ×1.0 none.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'The final score adds the {0} best flights, each multiplied by {1} for a complete flight log. The Flight Period lasts {2} minutes.',
    blanks: ['three', '1.2', '6'],
    distractors: ['five', '1.5', '8'],
    explanation:
      'Three best flights count, a complete log multiplies each by 1.2, and teams have 6 minutes.',
  },
  {
    kind: 'open',
    prompt:
      'Your team has two gliders. How would you use the five official flights and the 6 minutes?',
    model:
      'Start with a trim flight to check the room, then fly the most reliable glider for the first official flights to bank three good scores. Keep the second glider as a backup in case the first breaks, and use the spare flights to try for a longer time once the score is safe.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Glider mass: over 3.5 g, under 10.0 g; it must fit the 32 × 24 × 47 cm box.',
      'Handle under 1 m; non-metallic elastic that stays attached.',
      'Up to five official flights in 6 minutes; declare every flight.',
      '==Final score = three best flights × log bonus==, so consistency wins.',
    ],
  },
]);

const glide = defineDeck('elg-u2-l1', [
  {
    kind: 'title',
    title: 'Glide physics: sink rate and glide ratio',
    subtitle: 'A glider spends height to keep moving; the slower it sinks, the longer it flies.',
    objectives: [
      'Relate **glide ratio**, airspeed, and **sink rate**.',
      'Explain why a slow, efficient glide lasts longest.',
      'Estimate glide time from height.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what keeps a glider moving forward with no engine?',
    options: ['Gravity', 'Leftover launch speed only', 'Air pushing from behind', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Forces in a glide',
    bullets: [
      'A glider has no engine, so it ==trades height for speed==.',
      'Part of its **weight** acts forward along the flight path and balances **drag**.',
      '**Lift** supports the rest of the weight.',
      'The glider descends along a shallow path whose angle depends on the **lift-to-drag ratio**.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each force to its job in a steady glide.',
    pairs: [
      ['Weight', 'Pulls down; part of it pushes the glider forward'],
      ['Lift', 'Supports most of the weight'],
      ['Drag', 'Slows the glider, balanced by part of the weight'],
    ],
    explanation:
      'In a steady glide the forward part of the weight balances drag, and lift holds up the rest, so the glider slides down a shallow path.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Glide ratio',
    image: 'ws-wing-profile',
    bullets: [
      '**Glide ratio** = horizontal distance traveled per unit of height lost.',
      'In steady flight it equals the **lift-to-drag ratio (L/D)**.',
      'With L/D of 8, the glider goes ==8 m forward for each 1 m it drops==.',
      'Long, thin wings, smooth surfaces, and a clean fuselage raise L/D. Indoor gliders reach about 5 to 10.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A glider with a glide ratio of 6 loses 2.5 m of height. How far forward does it travel, in meters?',
    answer: 15,
    tolerance: 0.05,
    unit: 'm',
    explanation: 'Distance = glide ratio × height lost = 6 × 2.5 m = 15 m.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Sink rate decides time',
    bullets: [
      'For time aloft, the key number is the **sink rate**: how fast the glider moves downward.',
      '==Sink rate = airspeed ÷ glide ratio.==',
      'Two gliders with the same glide ratio: the **slower** one sinks slower and stays up longer.',
      'Glide time ≈ height ÷ sink rate.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'A glider flies at 3.0 m/s with a glide ratio of 6, starting its glide 8.0 m up. About how many seconds does the glide last?',
    answer: 16,
    tolerance: 0.1,
    unit: 's',
    explanation: 'Sink rate = 3.0 ÷ 6 = 0.50 m/s, so the glide lasts 8.0 m ÷ 0.50 m/s = 16 s.',
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: glide time',
    problem:
      'A glider reaches 9.0 m and glides at 3.2 m/s with glide ratio 8. Estimate the glide time.',
    steps: [
      'Sink rate = airspeed ÷ glide ratio = 3.2 ÷ 8 = **0.40 m/s**.',
      'Glide time = 9.0 m ÷ 0.40 m/s = **22.5 s**.',
      'Add the few seconds of climb for the total flight time.',
    ],
    conclusion: 'About 22.5 s of glide, ==plus the climb==.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Flying slowly, but not too slowly',
    image: 'ws-lift-curve',
    caption:
      'Lift coefficient rises with angle of attack until the **stall**, where it peaks and then drops.',
    bullets: [
      'Lift = ½ρv²SC_L, so ==more wing area for the weight== (lower **wing loading**) lets the glider fly slower.',
      'Camber and the right angle of attack also raise lift and slow the glide.',
      'Too slow, and the wing nears **stall**: lift drops suddenly and the glider loses height fast.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Two gliders weigh the same. Which can glide more slowly?',
    options: [
      'The one with more wing area',
      'The one with less wing area',
      'The one with a heavier nose',
      'They glide at the same speed',
    ],
    answer: 0,
    explanation:
      'More wing area for the same weight means lower wing loading, so the wing makes enough lift at a lower speed.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Mass trade-offs',
    bullets: [
      'A **lighter** glider glides more slowly and sinks more slowly.',
      'A **heavier** glider stores more launch energy and ==climbs higher before drag slows it==.',
      'The 3.5–10.0 g window lets teams choose.',
      'Many designs sit in the middle: heavy enough to climb high, light enough to glide slowly.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Which glider does each advantage belong to?',
    bins: ['Lighter glider', 'Heavier glider'],
    items: [
      ['Sinks more slowly', 0],
      ['Carries its momentum higher in the climb', 1],
      ['Glides at a lower speed', 0],
      ['Loses less of its climb to drag', 1],
    ],
    explanation:
      'Light gliders win the glide; heavier gliders win the climb. Most good designs balance the two.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Circling',
    bullets: [
      'Indoors, gliders **circle** so they stay in the room.',
      'Banking tilts the lift, so the glider ==sinks a little faster in a turn==.',
      '**Wide, gentle circles** waste less height than tight ones.',
      'Plan circle size from the room’s width, keep it steady with trim, and note it in the log.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Which circle loses the least height per lap, if it fits the room?',
    options: [
      'A wide, gentle circle',
      'A tight, steeply banked circle',
      'A figure eight',
      'Circle size does not matter',
    ],
    answer: 0,
    explanation:
      'Steeper banks tilt more lift sideways, so the glider sinks faster. A wide, gentle circle keeps more lift pointing up.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Glide ratio', back: 'Distance forward per unit of height lost; equals L/D.' },
      { front: 'Sink rate', back: 'How fast the glider moves downward.' },
      { front: 'Wing loading', back: 'Weight divided by wing area.' },
      { front: 'Stall', back: 'Sudden loss of lift when the wing’s angle is too high.' },
      { front: 'Bank angle', back: 'The tilt of the wings in a turn.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Sink rate equals airspeed divided by {0}. A glider with lower wing {1} can fly more {2} and stay up longer.',
    blanks: ['glide ratio', 'loading', 'slowly'],
    distractors: ['mass', 'area', 'quickly'],
    explanation:
      'Sink rate = speed ÷ glide ratio, and low wing loading lets the glider fly slowly, so it sinks slowly.',
  },
  {
    kind: 'open',
    prompt:
      'Glider A peaks at 10 m and sinks at 0.55 m/s. Glider B peaks at 8 m and sinks at 0.35 m/s. Which glides longer, and why?',
    model:
      'Glider B. A glides about 10 ÷ 0.55 ≈ 18 s, while B glides about 8 ÷ 0.35 ≈ 23 s. A lower sink rate matters more than the 2 m height advantage.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'A glider trades height for forward motion; L/D sets the glide path.',
      '==Sink rate = airspeed ÷ glide ratio; glide time ≈ height ÷ sink rate.==',
      'Low wing loading lets a glider fly slowly, but not below stall.',
      'Wide, gentle circles keep the glider in the room with little extra sink.',
    ],
  },
]);

const launch = defineDeck('elg-u3-l1', [
  {
    kind: 'title',
    title: 'Launch energy: from stretched elastic to height',
    subtitle:
      'The stretch you pull sets the energy, and the energy sets how high the glider climbs.',
    objectives: [
      'Calculate **elastic potential energy**.',
      'Estimate launch speed and ideal height.',
      'Explain where launch energy is lost.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: if you pull the elastic twice as far, how much more energy does it store?',
    options: ['The same', 'About twice as much', 'About four times as much', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Elastic energy',
    bullets: [
      'A stretched elastic **stores energy**.',
      'For an ideal spring, energy = **½kx²**: k is stiffness in N/m and x is the stretch in m.',
      'Rubber is not perfect, but ==doubling the stretch roughly quadruples the energy==.',
      'That is why small changes in pull distance make big changes in launch height.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'An elastic with k = 40 N/m is stretched 0.25 m. How much energy does it store, in joules?',
    answer: 1.25,
    tolerance: 0.01,
    unit: 'J',
    explanation: 'E = ½kx² = ½ × 40 × 0.25² = ½ × 40 × 0.0625 = 1.25 J.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Converting energy',
    bullets: [
      'On release, some energy becomes the glider’s **kinetic energy**, ½mv².',
      'Some stays in the moving elastic and handle, or is lost as heat.',
      'The glider climbs, trading kinetic energy for **gravitational potential energy**, mgh.',
      '==Drag steals energy the whole way up==, so real climbs reach only part of the ideal height.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Put the energy changes of a launch in order.',
    items: [
      'Elastic potential energy in the stretched band',
      'Kinetic energy as the glider leaves the elastic',
      'Gravitational potential energy at the top of the climb',
      'Energy spent slowly during the glide',
    ],
    explanation:
      'Stretch energy becomes motion, motion becomes height, and the glide spends that height slowly. Some energy is lost to heat and drag at each step.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Launch speed',
    bullets: [
      'Launch speeds can be **10 to 20 m/s**, much faster than the glide speed.',
      'Drag grows with **speed squared**, so drag is large during the climb.',
      'A ==clean, stiff glider== loses less energy on the way up.',
      'Wings that **flutter or bend** at launch make the climb erratic and much lower.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'If a glider’s speed doubles, about how much does its drag change?',
    options: ['It becomes about four times larger', 'It doubles', 'It stays the same', 'It halves'],
    answer: 0,
    explanation:
      'Drag grows with speed squared, so twice the speed gives about 2² = 4 times the drag. That is why the fast climb loses so much energy.',
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: launch speed and ideal height',
    problem:
      'An elastic with k = 20 N/m is stretched 0.30 m. Half the energy reaches a 6.0 g glider. Find the launch speed and ideal height.',
    steps: [
      'Stored energy = ½ × 20 × 0.30² = **0.90 J**; to the glider: **0.45 J**.',
      'v = √(2E ÷ m) = √(2 × 0.45 ÷ 0.006) ≈ **12 m/s**.',
      'Ideal height = E ÷ (mg) = 0.45 ÷ (0.006 × 9.8) ≈ **7.7 m** before drag losses.',
    ],
    conclusion: 'About 12 m/s at launch; ==drag keeps the real peak below 7.7 m==.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Mass and height',
    bullets: [
      'If all energy went into height, **h = E ÷ (mg)**, so lighter gliders would climb higher.',
      'But very light gliders reach high speed and ==lose energy quickly to drag==.',
      'A heavier glider **carries its momentum** higher.',
      'So launch height does not simply rise as mass falls: **testing matters**.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'A 5.0 g glider receives 0.30 J at launch. Ignoring drag, how high could it climb, in meters?',
    answer: 6.1,
    tolerance: 0.1,
    unit: 'm',
    explanation:
      'h = E ÷ (mg) = 0.30 ÷ (0.005 × 9.8) ≈ 6.1 m. Drag will keep the real climb lower.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'The elastic',
    image: 'b-glide-bands',
    bullets: [
      'Elastic **thickness, length, and condition** all change launch energy.',
      '==Fresh rubber stores more energy than tired rubber==, and temperature changes stiffness.',
      'Use the **same elastic type** for testing and competition, and replace it before it weakens.',
      'Record its relaxed length in the log. It must be non-metallic and stay on the handle.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt:
      'Which habits keep launch energy the same from practice to competition? Select all that apply.',
    options: [
      'Using the same elastic type you tested with',
      'Replacing the elastic before it gets tired',
      'Switching to a brand-new kind of elastic on competition day',
      'Recording the elastic’s relaxed length in the log',
    ],
    answers: [0, 1, 3],
    explanation:
      'A new, untested elastic type changes the launch energy. Keep the same type, replace worn bands, and log their length.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Consistent pull',
    bullets: [
      '==The same pull distance gives the same energy== every time.',
      'Mark the pull length on a reference, or practice a fixed arm position.',
      'For a **lower ceiling**, reduce the pull instead of changing the glider.',
      'Log the stretch length so you can predict the peak height for each pull.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'The competition room has a lower ceiling than your practice gym. What is the simplest fix?',
    options: [
      'Pull the elastic a shorter, marked distance',
      'Add a lot of nose weight',
      'Bend the wings',
      'Launch from a chair',
    ],
    answer: 0,
    explanation:
      'A shorter pull stores less energy, so the glider climbs less without changing its trim. Launching from a chair is not allowed.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Elastic potential energy', back: '½kx² for an ideal spring.' },
      { front: 'Stiffness (k)', back: 'Force per unit of stretch, in N/m.' },
      { front: 'Kinetic energy', back: '½mv², the energy of motion.' },
      { front: 'Gravitational potential energy', back: 'mgh, the energy of height.' },
      { front: 'Pull distance', back: 'How far the elastic is stretched.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Elastic energy is one half k times the stretch {0}. It becomes {1} energy at launch, then height, while {2} steals energy during the climb.',
    blanks: ['squared', 'kinetic', 'drag'],
    distractors: ['cubed', 'chemical', 'lift'],
    explanation:
      'E = ½kx², which becomes ½mv² and then mgh, with drag taking a share the whole way up.',
  },
  {
    kind: 'open',
    prompt:
      'Your glider climbed 8 m last week but only 6 m today with the same pull. List possible causes.',
    model:
      'The elastic may be tired or a different type, the room may be colder so the rubber is stiffer, the pull may be shorter than marked, or the glider may be bent so it has more drag or flutters in the climb.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '==Elastic energy ≈ ½kx²: double the stretch, about four times the energy.==',
      'Energy goes stretch → motion → height, with losses to heat and drag.',
      'Drag grows with speed squared, so a clean, stiff glider climbs best.',
      'Fresh elastic and a marked, repeatable pull give repeatable flights.',
    ],
  },
]);

const trim = defineDeck('elg-u4-l1', [
  {
    kind: 'title',
    title: 'Trim: the transition from climb to glide',
    subtitle: 'One glider has to fly two ways: fast and straight up, then slow and circling.',
    objectives: [
      'Explain why a glider must **transition** from climb to glide.',
      'Use **CG**, **decalage**, and asymmetry to trim.',
      'Diagnose common launch and glide problems.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what does “trim” mean for a glider?',
    options: [
      'Small adjustments that set how it flies',
      'Cutting off extra wood',
      'Painting it',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Two different flights',
    bullets: [
      'An elastic glider **climbs at high speed**, then **glides slowly**.',
      'A trim that glides well wants to ==pull up hard at launch speed and may loop==.',
      'A trim that climbs straight at high speed may glide too fast.',
      'Good trim makes the glider **climb, roll over, and settle** into a glide.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Why is trimming an elastic glider harder than trimming a hand-tossed glider?',
    options: [
      'It must fly well at two very different speeds',
      'It has no wings',
      'It is always heavier',
      'It cannot carry ballast',
    ],
    answer: 0,
    explanation:
      'The same trim has to handle a fast climb and a slow glide. Settings that suit one speed can cause trouble at the other.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Center of gravity',
    image: 'b-glide-stability',
    caption:
      'After a nose-down bump, a **stable** aircraft returns toward level flight, a neutral one holds the new angle, and an unstable one keeps diving.',
    bullets: [
      'The **CG** must be ahead of the **neutral point** for pitch stability.',
      'Gliders are usually balanced with **nose ballast**.',
      'CG too far back: the glider stalls and the climb loops. ==Too far forward: it dives.==',
      'Find a CG that gives a smooth hand glide first.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each CG position to what the glider does.',
    pairs: [
      ['CG too far back', 'Stalls, and the climb loops'],
      ['CG too far forward', 'Dives'],
      ['CG ahead of the neutral point, well placed', 'Smooth, stable glide'],
    ],
    explanation:
      'The CG must sit ahead of the neutral point. Too far back makes the glider unstable and stall-prone; too far forward makes it nose down.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Decalage',
    bullets: [
      '**Decalage** = wing incidence angle − stabilizer incidence angle.',
      'It sets the **trimmed glide speed**.',
      'At launch speed, decalage creates a ==strong nose-up moment==, so the climb tends to curve over.',
      'Small changes, like a thin shim under the stabilizer, adjust the glide. Record each one.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'What is decalage?',
    options: [
      'The difference between the wing and stabilizer incidence angles',
      'The tilt of the wings in a turn',
      'The distance from nose to CG',
      'The upward bend of the wings',
    ],
    answer: 0,
    explanation:
      'Decalage is wing incidence minus stabilizer incidence. Bank is wing tilt, and the upward bend of the wings is dihedral.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'The roll-out',
    image: 'ws-flight-axes',
    callout:
      'Roll tilts the wings, pitch raises or lowers the nose, and yaw swings the nose sideways.',
    bullets: [
      'Many teams launch the glider **banked**, so it climbs in a curving path instead of looping.',
      'As speed drops near the top, it ==rolls level and begins to glide==.',
      'Small asymmetries, like a slight wing tip tilt or **rudder offset**, turn it into its glide circle.',
    ],
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Put the stages of a banked launch in order.',
    items: [
      'Launch with the wings tilted',
      'Climb in a curving path',
      'Slow down near the top',
      'Roll level',
      'Settle into the glide circle',
    ],
    explanation:
      'The bank keeps the fast climb from looping. As the glider slows at the top it rolls level and starts circling.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Glide circle',
    bullets: [
      'Once gliding, the glider should **circle steadily**.',
      'A small rudder offset or tilted stabilizer starts the turn; **dihedral** keeps it from spiraling.',
      '==Turn the same way as the launch roll== for a smooth transition.',
      'If the circle tightens into a **spiral dive**, reduce the turn or add dihedral.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'The glide circle keeps tightening until the glider spirals into the floor. What should you try?',
    options: [
      'Reduce the turn or add dihedral',
      'Add more rudder offset',
      'Pull the elastic farther',
      'Move the CG far back',
    ],
    answer: 0,
    explanation:
      'A tightening spiral means too much turn or too little dihedral. More rudder would make it worse.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Reading flights',
    bullets: [
      'Loops at launch: launch with **more bank** or a lower angle.',
      'Stalls in the glide: move the **CG forward** or reduce decalage. Dives: the opposite.',
      'Spirals in: reduce turn and **check for warps**.',
      '==Change one thing at a time== and record the result in the flight log.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Sort each fix under the problem it solves.',
    bins: ['Loops at launch', 'Stalls in the glide', 'Spirals in'],
    items: [
      ['Launch with more bank', 0],
      ['Move the CG forward', 1],
      ['Reduce the rudder offset', 2],
      ['Lower the launch angle', 0],
      ['Reduce decalage slightly', 1],
      ['Check the wings for warps', 2],
    ],
    explanation:
      'Bank or a lower angle stops loops, a forward CG or less decalage stops stalls, and less turn or straighter wings stop spirals.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: a looping glider',
    problem: 'A glider climbs well but loops over at the top and then dives. Suggest a fix.',
    steps: [
      'Looping means the **nose-up moment** at launch speed is too strong for a straight launch.',
      'Launch with **more bank** so the climb curves to the side.',
      'If it still loops, **reduce decalage** slightly and retest the hand glide.',
    ],
    conclusion: 'Bank the launch more, then ==reduce decalage if needed==.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Transition', back: 'The change from fast climb to slow glide.' },
      { front: 'Neutral point', back: 'The CG position where pitch stability disappears.' },
      { front: 'Decalage', back: 'Wing incidence minus stabilizer incidence.' },
      { front: 'Rudder offset', back: 'A small fin angle that starts a turn.' },
      { front: 'Spiral dive', back: 'A tightening, descending turn.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'The CG must sit ahead of the {0} point. A banked launch keeps the climb from {1}, and the glider should change only {2} thing at a time.',
    blanks: ['neutral', 'looping', 'one'],
    distractors: ['center', 'stalling', 'every'],
    explanation:
      'Pitch stability needs the CG ahead of the neutral point, bank stops the loop, and one change at a time shows what each change does.',
  },
  {
    kind: 'open',
    prompt: 'Why should you change only one trim setting between test flights?',
    model:
      'If you change two things and the flight improves or gets worse, you cannot tell which change caused it. One change at a time, written in the log, shows exactly what each adjustment does.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Good trim climbs fast, rolls over, and settles into a slow glide.',
      '==CG ahead of the neutral point==; too far back stalls, too far forward dives.',
      'Decalage sets glide speed; bank at launch stops the loop.',
      'Diagnose from the flight, change one thing, and log it.',
    ],
  },
]);

export const decks: Deck[] = [rules, glide, launch, trim, ...later];
