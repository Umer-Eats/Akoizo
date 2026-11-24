import { defineDeck, type Deck } from './presentation-types.ts';

// Elastic Launched Gliders (Division B) presentations, lessons 5–7. Imported by
// presentations-b-elastic-launched-gliders.ts.

const construction = defineDeck('elg-u5-l1', [
  {
    kind: 'title',
    title: 'Construction: light, stiff, and legal',
    subtitle: 'A glider has to survive a hard launch, pass inspection, and keep its shape flight after flight.',
    objectives: [
      'Choose materials and shapes for an elastic glider.',
      'Meet the **mass window**, **box**, and **blunt nose** rules.',
      'Build for durability and repeatable trim.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what breaks most often on a glider launched by an elastic?',
    options: ['The wing joint or fuselage', 'The paint', 'The tip of the fin', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Materials',
    bullets: [
      'Elastic gliders are usually **balsa**, sometimes reinforced with **carbon fiber**. ==Boron is banned.==',
      'Wings are often **solid sheet balsa** sanded to an airfoil: stiff enough for launch loads.',
      'The fuselage is a stiff stick with a **hook or notch** for the elastic.',
      '**Thin glue joints** save weight without weakening the structure.',
    ],
  },
  {
    kind: 'multi',
    section: 0,
    prompt: 'Which materials are allowed for an elastic glider? Select all that apply.',
    options: ['Balsa', 'Carbon fiber', 'Boron', 'Glue'],
    answers: [0, 1, 3],
    explanation: 'Balsa, carbon fiber, and glue are fine. Boron is not allowed.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Launch loads',
    bullets: [
      'At launch, the glider goes from rest to ==over 10 m/s in a fraction of a second==.',
      'The fuselage, wing joint, and tail must survive that **launch load**.',
      'A cracked joint or bent fuselage **changes the trim**.',
      'Reinforce the elastic hook and wing mount, and check them after every flight.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'After a hard landing, a glider suddenly starts diving. What should you check first?',
    options: [
      'The wing mount and fuselage for cracks or bends',
      'The color of the elastic',
      'The flight log handwriting',
      'The weather outside',
    ],
    answer: 0,
    explanation:
      'A cracked joint or bent fuselage changes the wing and tail angles, which changes the trim. Check the structure first.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'The blunt nose',
    bullets: [
      'The nose must be **blunt** enough to pass the supervisor’s check, to protect people and property.',
      'A rounded **nose block** also holds ballast and absorbs impacts.',
      'Design the nose early: ==its mass affects the CG==.',
      'A glider that fails the nose check **cannot fly**, no matter how good it is.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Why should you design the nose block early instead of adding it at the end?',
    options: [
      'Its mass changes where the CG is',
      'It makes the wings longer',
      'It is not checked at competition',
      'It replaces the elastic hook',
    ],
    answer: 0,
    explanation:
      'The nose is far forward, so its mass moves the CG a lot. Adding it late would undo your trim.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Mass window',
    bullets: [
      'The glider must weigh ==more than 3.5 g and less than 10.0 g== for the whole flight.',
      'Parts may **not fall off** to change mass.',
      'Build a few grams **under your target**, then add **ballast** to tune balance and mass.',
      'Check mass at the start of the day and bring small ballast pieces to check-in.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'Your glider weighs 7.6 g and your target is 8.0 g. How many grams of ballast should you add?',
    answer: 0.4,
    tolerance: 0.01,
    unit: 'g',
    explanation: '8.0 g − 7.6 g = 0.4 g, placed where it also sets the balance you want.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: too light and tail-heavy',
    problem: 'A glider weighs 3.4 g and its CG is behind the target. What should the team do?',
    steps: [
      'It is **below the 3.5 g minimum**, so add at least 0.2 g for margin.',
      'Put that ballast **in the nose** to move the CG forward.',
      'Recheck mass, balance, and the hand glide.',
    ],
    conclusion: 'About 0.2–0.3 g of ==nose ballast fixes both problems==.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Fitting the box',
    bullets: [
      'The glider must fit the **32.0 × 24.0 × 47.0 cm** measurement box, which limits span and length.',
      'Using the full allowed span ==reduces induced drag and improves glide ratio==.',
      'But long wings must stay **stiff**.',
      'Check box fit with the final setup, including the nose piece and fin.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Why do many teams make the wingspan as large as the box allows?',
    options: [
      'Longer wings lower induced drag and improve glide ratio',
      'Longer wings always weigh less',
      'Judges give points for wingspan',
      'Long wings bend less at launch',
    ],
    answer: 0,
    explanation:
      'A longer span lowers induced drag, which raises the glide ratio. The catch is keeping long wings stiff enough for launch.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Repeatable shape',
    bullets: [
      '==Warps change trim.== Store gliders in a rigid box away from heat and humidity.',
      'Build matching wings with **templates**.',
      'Mark wing, stabilizer, and fin positions so they can be **reset** after a hard landing.',
      'Bring a **second glider** trimmed the same way, labeled, with its trim notes.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Does each habit keep the glider’s shape repeatable?',
    bins: ['Helps', 'Hurts'],
    items: [
      ['Storing the glider in a rigid box', 0],
      ['Leaving it in a hot car', 1],
      ['Marking the stabilizer position', 0],
      ['Building wings from a template', 0],
      ['Carrying it loose in a backpack', 1],
    ],
    explanation:
      'Heat and loose storage warp balsa. A rigid box, templates, and position marks keep each flight the same.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Sheet balsa wing', back: 'A solid balsa wing shaped to an airfoil.' },
      { front: 'Elastic hook', back: 'The notch or hook where the elastic catches.' },
      { front: 'Blunt nose', back: 'A rounded nose required for safety.' },
      { front: 'Ballast', back: 'Added mass to set balance and total mass.' },
      { front: 'Template', back: 'A pattern for building matching parts.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Build slightly {0} your target mass, then add {1} in the nose. The nose must be {2} to pass inspection.',
    blanks: ['under', 'ballast', 'blunt'],
    distractors: ['over', 'glue', 'pointed'],
    explanation:
      'Building light leaves room for nose ballast that sets both mass and CG, and the nose must be blunt for safety.',
  },
  {
    kind: 'open',
    prompt: 'Your best glider breaks during the Flight Period. What should already be in place so the team keeps scoring?',
    model:
      'A second glider trimmed to the same settings, labeled, with its trim notes, ready to fly. Marked wing and tail positions and spare ballast help too, because there is no extra time for repairs.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Balsa, maybe carbon fiber; no boron. Thin glue joints.',
      'Reinforce the hook and wing mount for launch loads.',
      '==Mass over 3.5 g and under 10.0 g==; blunt nose; fits the box.',
      'Templates, marks, safe storage, and a trimmed backup keep flights repeatable.',
    ],
  },
]);

const technique = defineDeck('elg-u6-l1', [
  {
    kind: 'title',
    title: 'Launch technique and the ceiling',
    subtitle: 'The same glider can fly great or terribly depending on how, and where, it is launched.',
    objectives: [
      'Choose **launch angle**, bank, and pull for a room.',
      'Use the launch handle safely and legally.',
      'Adapt launches to **ceiling height** and obstacles.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what is the biggest risk in a gym with a low ceiling?',
    options: ['Hitting the ceiling', 'Running out of floor', 'The glider getting cold', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Launch angle',
    image: 'b-glide-launch',
    caption:
      'A hand launch angled upward. An elastic launch aims even steeper, often **60 to 80 degrees**.',
    bullets: [
      'Steep launches gain **height quickly**.',
      'Too steep: the glider may **stall at the top** before rolling out.',
      'Too shallow: it travels sideways and ==loses potential height==.',
      'Practice a consistent angle and record it, with bank and pull, in the log.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A glider launched at 30 degrees flies across the gym and lands early. What is the likely fix?',
    options: [
      'Launch steeper, around 60 to 80 degrees',
      'Launch flat along the floor',
      'Add more wing area',
      'Use a longer handle than 1 m',
    ],
    answer: 0,
    explanation:
      'A shallow launch spends energy going sideways instead of up. A steeper launch turns more energy into height.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Using the handle',
    bullets: [
      'The **launch handle** extends your reach, raising the launch point and making the stretch consistent.',
      'Under 1 m long, not counting the elastic, and held by **one student**.',
      '==Launch standing on the floor==: chairs and other height aids are not allowed.',
      'Keep the elastic and fingers clear of faces.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which launches are legal? Select all that apply.',
    options: [
      'Standing on the floor with a 90 cm handle',
      'Standing on a chair to launch higher',
      'Two students holding one handle',
      'One student with a 70 cm handle',
    ],
    answers: [0, 3],
    explanation:
      'One student, standing on the floor, with a handle under 1 m. Chairs are height aids, and two holders break the one-student rule.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Ceiling height',
    bullets: [
      'Officials announce the room’s length, width, and **ceiling height** in advance.',
      'A **ceiling hit** wastes speed and height and can cause a stall.',
      'Low room: ==reduce the pull or launch with more bank==.',
      'Tall room: use more energy and aim steeper.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: scaling the pull for a lower ceiling',
    problem:
      'In practice, a 35 cm pull reaches 9 m. The competition ceiling is 7.5 m. Estimate a starting pull, assuming height grows with energy.',
    steps: [
      'Height ∝ energy ∝ pull², so **pull ∝ √height**.',
      'Aim 0.5 m below the ceiling: 35 × √(7.0 ÷ 9) ≈ 35 × 0.88 ≈ **31 cm**.',
      'Test with a **trim flight** and adjust.',
    ],
    conclusion: 'Start near 31 cm, then ==fine-tune with a trim flight==.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'A 40 cm pull reaches 8 m. You want a 4.5 m peak. Using pull ∝ √height, what pull should you start with, in cm?',
    answer: 30,
    tolerance: 0.5,
    unit: 'cm',
    explanation: 'New pull = 40 × √(4.5 ÷ 8) = 40 × √0.5625 = 40 × 0.75 = 30 cm.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Obstacles',
    bullets: [
      '**Lights, beams, hoops, and banners** can catch gliders.',
      'Watch other teams’ flights to spot obstacles and drafts.',
      'Pick a launch spot where ==the circle stays clear==.',
      'A glider stuck on a beam may be lost, so keep a second glider ready.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'What is the best way to find drafts and obstacles in a new competition room?',
    options: [
      'Watch other teams’ flights before yours',
      'Launch as hard as possible and see what happens',
      'Ask for the lights to be turned off',
      'Fly only in the exact center no matter what',
    ],
    answer: 0,
    explanation:
      'Other teams’ flights show where gliders drift and what they hit, so you can choose a clear spot before you use an official flight.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Collisions and re-flights',
    bullets: [
      'Several teams may fly at once; timers may **delay a launch** to avoid a collision.',
      'After a collision, a team may choose a **re-flight** once the glider lands.',
      '==A re-flight is not limited by the 6-minute period.==',
      'Fly where your circle will not overlap others, and yield to official flights when trimming.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Your glider collides with another team’s glider in the last minute. What may you do?',
    options: [
      'Choose a re-flight after it lands, even past the 6 minutes',
      'Nothing: the flight counts as it is',
      'Only re-fly if time remains in the period',
      'Re-fly the other team’s glider',
    ],
    answer: 0,
    explanation:
      'After a collision, the team may choose a re-flight, and it is not limited by the 6-minute period.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Building a routine',
    bullets: [
      'Check the glider, load the elastic, ==pull to the mark==, set angle and bank, release smoothly.',
      'Do not **twist the wrist** at release.',
      'Practice until it is automatic, so pressure does not change the launch.',
      'Practice in different rooms with a teammate timing.',
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Put the launch routine in order.',
    items: [
      'Check the glider',
      'Load the elastic',
      'Pull to the mark',
      'Set angle and bank',
      'Release smoothly',
    ],
    explanation:
      'The same steps in the same order every time give the same launch energy, angle, and bank.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Launch angle', back: 'The angle above horizontal at release.' },
      { front: 'Launch bank', back: 'The wing tilt at release.' },
      { front: 'Ceiling hit', back: 'Touching the ceiling, which wastes height.' },
      { front: 'Re-flight', back: 'A repeat flight allowed after a collision.' },
      { front: 'Height aid', back: 'A banned device, like a chair, that raises the launch point.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Launch steeply, about {0} to 80 degrees. In a low room, reduce the {1}. After a collision, a team may choose a {2}.',
    blanks: ['60', 'pull', 're-flight'],
    distractors: ['20', 'wingspan', 'penalty'],
    explanation:
      'Steep launches gain height, a shorter pull avoids the ceiling, and a collision allows a re-flight.',
  },
  {
    kind: 'open',
    prompt: 'You arrive and the competition ceiling is much lower than your practice gym. Describe your plan.',
    model:
      'Use the log to scale the pull down (pull ∝ √height), aiming below the ceiling. Add a little more bank so the climb curves, then check with a trim flight before the first official flight, watching for beams and lights.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Launch steeply, about 60–80°, with a consistent angle, bank, and pull.',
      'One student, on the floor, handle under 1 m; no height aids.',
      '==Low ceiling: shorter pull or more bank; pull ∝ √height.==',
      'Avoid obstacles, use re-flights after collisions, and rehearse a routine.',
    ],
  },
]);

const competition = defineDeck('elg-u7-l1', [
  {
    kind: 'title',
    title: 'The flight log and competition day',
    subtitle: 'A good log earns a 20 percent bonus and tells you exactly how to launch in a new room.',
    objectives: [
      'Build a complete **flight log** with four parameters.',
      'Use log data to predict competition settings.',
      'Run **check-in** and the Flight Period smoothly.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what is a flight log for?',
    options: [
      'Earning a score bonus',
      'Choosing settings for a new room',
      'Both of these',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Flight log requirements',
    bullets: [
      'A **complete log** has data from ==at least 10 test flights== with four or more parameters.',
      'Three are required: **peak flight height**, **relaxed elastic length**, and **flight time**.',
      'Add at least one more, such as launch pitch, launch roll, or elastic stretch.',
      'Choose parameters you will actually use in a new room.',
    ],
  },
  {
    kind: 'multi',
    section: 0,
    prompt: 'Which parameters are required in every complete flight log? Select all that apply.',
    options: [
      'Peak flight height',
      'Relaxed length of the elastic',
      'Flight time',
      'Color of the glider',
    ],
    answers: [0, 1, 2],
    explanation:
      'Peak height, relaxed elastic length, and flight time are required, plus at least one more useful parameter like launch pitch.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Why the log matters',
    bullets: [
      'A complete log multiplies every flight by **1.2**: a ==20 percent bonus== on the three-flight total.',
      'The log is also a **dataset**.',
      'Graphing flight time against pull or peak height shows the best settings for each ceiling.',
      'Notes on trim changes show what fixed past problems. Keep entries neat and dated.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A team’s three best flights total 60 s. How many more points does a complete log earn than a partial log?',
    answer: 6,
    tolerance: 0.01,
    unit: 'points',
    explanation: 'Complete: 60 × 1.2 = 72. Partial: 60 × 1.1 = 66. The complete log is worth 6 more points.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Estimating peak height',
    bullets: [
      'Compare the glider with **known heights**, like wall markings or the ceiling.',
      'Or measure from **video** using a reference object.',
      '==Consistent methods matter more than perfect accuracy.==',
      'Peak height with pull and time shows whether a short flight came from a **low climb** or a **poor glide**.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'Two flights both reach 8 m, but one lasts 12 s and the other 22 s. What does the log tell you about the short flight?',
    options: [
      'The problem was the glide, not the climb',
      'The problem was the climb',
      'The elastic was too short',
      'Nothing; height and time are unrelated',
    ],
    answer: 0,
    explanation:
      'Both climbed equally high, so the short flight lost its time in the glide. Look at trim, warps, or a stall.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Check-in',
    bullets: [
      'Present gliders in **measurement boxes**, the **launch handle**, and the **flight log**.',
      'Remove each glider to be weighed, and adjust with ballast if needed.',
      'The supervisor collects the handle; ==returning it starts the 6-minute period==.',
      'Only participants handle the gliders and boxes.',
    ],
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Put the check-in steps in order.',
    items: [
      'Present gliders in boxes, the handle, and the log',
      'Remove each glider so it can be weighed',
      'Adjust mass with ballast if needed',
      'The supervisor returns the handle to start the period',
    ],
    explanation:
      'Inspection comes first, then weighing and any ballast fix, and the Flight Period starts only when the handle is returned.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Using six minutes',
    bullets: [
      'Start with a quick **trim flight** to check the room.',
      'Then fly **official flights early** while the glider is trimmed, leaving time for spares.',
      'Declare every flight. ==There is no extra time for repairs==, so a second trimmed glider is valuable.',
      'Keep a timer visible to the launcher.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: using the spare flights',
    problem:
      'After a trim flight, a team’s first three official flights are 21, 23, and 8 s (a beam hit). How should it use the last two?',
    steps: [
      'Current best three: 23 + 21 + 8 = **52 s**.',
      'Two more flights near 22 s would **replace the 8 s** and add a tiebreaker.',
      'Adjust to avoid the beam, then fly both remaining official flights.',
    ],
    conclusion: 'Fix the beam problem, then ==use both spares to replace the 8 s flight==.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'In that example, the last two official flights are 22 s and 20 s. What is the new three-flight total, in seconds, before the log bonus?',
    answer: 66,
    tolerance: 0.01,
    unit: 's',
    explanation: 'The best three are now 23 + 22 + 21 = 66 s, up from 52 s.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'After the flights',
    bullets: [
      'If asked, demonstrate the launch; the supervisor may **recheck** the handle and glider mass.',
      '**Review recorded times** with the supervisor before leaving.',
      'Teams filing an **appeal** must leave the gliders, handle, boxes, and log in the event area.',
      '==Add competition flights to your log== for the next tournament.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Your team plans to appeal a timing decision. What must you do with your equipment?',
    options: [
      'Leave the gliders, handle, boxes, and log in the event area',
      'Take everything home to test it',
      'Keep only the log',
      'Give the gliders to another team',
    ],
    answer: 0,
    explanation:
      'During an appeal, the event supervisor needs everything that was flown and logged, so it all stays in the event area.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Peak flight height', back: 'The highest point after launch; a required log entry.' },
      { front: 'Relaxed elastic length', back: 'The elastic’s length when not stretched; required.' },
      { front: 'Complete log', back: '10+ flights and 4+ parameters: ×1.2 bonus.' },
      { front: 'Partial log', back: 'An incomplete log: ×1.1 bonus.' },
      { front: 'Re-check', back: 'The supervisor may recheck mass and handle after flights.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A complete log needs at least {0} test flights and {1} parameters. It multiplies each flight by {2}.',
    blanks: ['10', 'four', '1.2'],
    distractors: ['5', 'two', '2.0'],
    explanation: 'Ten or more flights and four or more parameters earn the ×1.2 bonus.',
  },
  {
    kind: 'open',
    prompt: 'Which extra parameter would you add to your log, and how would it help you on competition day?',
    model:
      'Elastic stretch (pull distance). Graphing peak height against pull lets me pick the pull that reaches just below the announced ceiling, so the first official flight is already close to the best setting.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '==Complete log: 10+ flights, 4+ parameters, ×1.2 on every flight.==',
      'Required: peak height, relaxed elastic length, and flight time.',
      'Trim flight first, official flights early, a backup glider ready.',
      'Review times, keep equipment for appeals, and log competition flights.',
    ],
  },
]);

export const decks: Deck[] = [construction, technique, competition];
