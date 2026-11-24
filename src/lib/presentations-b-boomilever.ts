import { defineDeck, type Deck } from './presentation-types.ts';

// Boomilever (Division B) presentations. Each deck follows its lesson in the Boomilever lessons
// section by section (`section` is the lesson section index), and its activities rehearse the
// lesson's scoring rules, statics, worked example, and key terms.

const event = defineDeck('boomb-u1-l1', [
  {
    kind: 'title',
    title: 'Reading the event: score, tiers, and the bonus decision',
    subtitle: 'A Boomilever wins by holding the full load with the fewest grams of wood.',
    objectives: [
      'Describe the **Testing Wall**, Mounting Bolt, and loading setup.',
      'Calculate the score as **load per gram** of structure.',
      'Apply the bonus, tier, and load-limit rules.',
      'Decide whether the **bonus design** is worth its extra mass.',
    ],
    image: 'boom-balsa-bridge',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which structure do you think scores higher?',
    options: [
      'A 20 g structure that holds 15 kg',
      'A 10 g structure that holds 15 kg',
      'They score the same',
      'Not sure yet',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'What the event asks',
    image: 'boom-cantilever',
    caption:
      'A **cantilever** is anchored at one end and reaches out into space, like a Boomilever hanging off its wall.',
    bullets: [
      'A single wooden structure hangs off a vertical **Testing Wall**, resting on one **Mounting Bolt**.',
      'It carries a Loading Block, chain, and bucket whose chain sits ==40 to 45 cm out from the wall==, within 2.5 cm of the wall centerline.',
      'Sand fills the bucket until the structure fails, time runs out, or the load reaches **15,000 g**.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each part of the setup to its number.',
    pairs: [
      ['Chain distance from the wall', '40 to 45 cm'],
      ['Chain offset from the wall centerline', 'Within 2.5 cm'],
      ['Maximum counted load', '15,000 g'],
      ['Number of Mounting Bolts', 'One'],
    ],
    explanation:
      'The structure hangs on one bolt and holds a chain 40–45 cm out, near the centerline, until failure or 15 kg.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'The score is efficiency',
    bullets: [
      '**Score = Load Scored ÷ structure mass** in grams; high score wins.',
      'Load Scored is the Load Supported plus any Load Scored Bonus.',
      'Mass sits in the denominator, so a light structure holding 15 kg beats a heavy one holding the same.',
      '==Halving the mass doubles the score==, so every unnecessary gram of wood and glue costs points.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'A 12.5 g structure holds the full 15,000 g with no bonus. What is its score?',
    answer: 1200,
    tolerance: 0.5,
    explanation: 'Score = 15,000 g ÷ 12.5 g = 1200.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'The bonus option',
    bullets: [
      'The **Load Scored Bonus** adds 5,000 g to Load Scored.',
      'It requires two things: contact with the wall ==only above the 15 cm contact depth line==, and holding the full 15 kg.',
      'A bonus-style structure that fails early is simply scored on its load, without the bonus.',
      'Missing the 15 kg in that case is **not** a construction violation.',
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt: 'Which conditions must both be met to earn the 5,000 g bonus? Select all that apply.',
    options: [
      'Wall contact only above the 15 cm line',
      'Holding the full 15 kg',
      'A structure lighter than 10 g',
      'Contact below the 25 cm mark',
    ],
    answers: [0, 1],
    explanation:
      'The bonus needs shallow contact (above the 15 cm line) and a full 15 kg hold. Mass is not a condition.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Tiers',
    bullets: [
      '**Tier 1** structures meet every construction and competition rule.',
      '**Tier 2** structures break one or more, such as a base design touching the wall below the 20 cm line.',
      '==Every Tier 1 score ranks above every Tier 2 score.==',
      'A structure that cannot hold the Loading Assembly, lacks eye protection, or does not fit the stand earns participation points only.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Where does each structure place?',
    bins: ['Tier 1', 'Tier 2', 'Participation only'],
    items: [
      ['Meets every rule and holds 9 kg', 0],
      ['Base design touching the wall below the 20 cm line', 1],
      ['Cannot hold the Loading Assembly', 2],
      ['Bonus-style design that fails at 12 kg, all rules met', 0],
      ['Team arrives without eye protection', 2],
    ],
    explanation:
      'Rule-compliant structures are Tier 1 even if they fail early; rule breaks drop to Tier 2; missing the minimum load or eye protection earns participation only.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Minimum and maximum load',
    bullets: [
      'The **Loading Assembly** (block, eyebolt, chain, S-hook, bucket) weighs at most 1,500 g.',
      'That assembly is the **Minimum Load Supported**; failing to hold it scores participation only.',
      'The maximum counted load is **15,000 g**.',
      'Once you reliably hold 15 kg, extra strength earns nothing: ==the only way up is to remove mass==.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Your 11 g structure holds 15 kg every time with obvious strength to spare. How do you raise your score?',
    options: [
      'Remove mass while still holding 15 kg',
      'Add wood so it could hold 20 kg',
      'Pour more sand next time',
      'Move the chain to 45 cm',
    ],
    answer: 0,
    explanation:
      'Load is capped at 15,000 g, so spare strength is wasted mass. Lowering the denominator is the only way to improve.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'The bonus decision',
    bullets: [
      'With the bonus, a perfect run scores **20,000 g ÷ mass** instead of 15,000 g ÷ mass.',
      'That is 1.33 times more load, so a bonus design wins ==as long as it weighs less than 1.33 times== the matching base design.',
      'Shallower contact makes the members carry larger forces.',
      'The real question is **how much extra wood** the bonus costs you.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'Your base design weighs 9.0 g. Below what mass, in grams, must a full-load bonus design weigh to beat it?',
    answer: 12,
    tolerance: 0.05,
    unit: 'g',
    explanation:
      'Break-even is 20,000 ÷ 15,000 × 9.0 g = 12.0 g. Lighter than that, the bonus design scores higher.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: base or bonus?',
    problem:
      'Team A’s base design weighs 10.0 g and holds 15 kg. Team B’s bonus design weighs 13.0 g, touches only above the 15 cm line, and also holds 15 kg. Who scores higher?',
    steps: [
      'Team A: 15,000 g ÷ 10.0 g = **1500.0**.',
      'Team B: (15,000 + 5,000) g ÷ 13.0 g = **1538.5**.',
      '13.0 g is 1.30 times Team A’s mass, below the ==1.33 break-even ratio==.',
    ],
    conclusion: 'Team B wins: the bonus pays off only while the extra mass stays **under 1.33×**.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Load Scored', back: 'Load Supported plus the 5,000 g bonus when earned.' },
      { front: 'Structural efficiency', back: 'Load carried per gram of structure: the score.' },
      {
        front: 'Loading Assembly',
        back: 'Block, eyebolt, chain, S-hook, and bucket; at most 1,500 g.',
      },
      { front: 'Contact depth line', back: 'Wall lines 10, 15, and 20 cm below the bolt.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Score equals Load Scored divided by structure {0}. The bonus adds {1} g when contact stays above the {2} cm line and the full load is held.',
    blanks: ['mass', '5,000', '15'],
    distractors: ['volume', '15,000', '20'],
    explanation:
      'Efficiency is load per gram; the 5,000 g bonus needs contact above the 15 cm line and a full 15 kg hold.',
  },
  {
    kind: 'open',
    prompt:
      'Your bonus prototype weighs 1.6 times your base design. What would you try before giving up on the bonus?',
    model:
      'Find where the extra mass went, usually the flatter, more heavily loaded strut. Brace it to shorten its buckling length or use a stiffer, wider section instead of more solid wood. If it still cannot get below 1.33 times the base mass, compete with the base design.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Score = Load Scored ÷ mass, capped at 15,000 g of load.',
      'The bonus adds 5,000 g for shallow contact and a full hold.',
      'Tier 1 always beats Tier 2; follow every rule.',
      '==A bonus design must weigh under 1.33 times the base design to win.==',
    ],
  },
]);

const statics = defineDeck('boomb-u2-l1', [
  {
    kind: 'title',
    title: 'Statics of a cantilever: moments, tension, and compression',
    subtitle: 'Balance the forces and the turning effects, and the member forces follow.',
    objectives: [
      'State the conditions for **static equilibrium**.',
      'Calculate the **moment** of the hanging load.',
      'Identify the **tension** and **compression** members.',
      'Find the force couple at the wall from the moment and depth.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which part of a Boomilever do you think is pulled, and which is pushed?',
    options: [
      'Top pulled, bottom pushed',
      'Top pushed, bottom pulled',
      'Both pushed',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Equilibrium',
    bullets: [
      'A structure that is not moving is in **static equilibrium**.',
      'Forces in every direction add to zero, ==and moments about any point add to zero==.',
      'A Boomilever has only a few external forces: the load pulling down, the **bolt** pushing on the structure, and the **wall** pushing back where it touches below the bolt.',
    ],
  },
  {
    kind: 'multi',
    section: 0,
    prompt: 'Which are external forces on a loaded Boomilever? Select all that apply.',
    options: [
      'The hanging load at the loading block',
      'The bolt pushing on the structure',
      'The wall pushing back at the lower contact',
      'The tension inside the top chord',
    ],
    answers: [0, 1, 2],
    explanation:
      'Load, bolt, and wall act from outside. Chord tension is an internal force between parts of the structure.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'The moment of the load',
    bullets: [
      'A **moment** is force times the perpendicular distance to the pivot.',
      'Fifteen kilograms weighs about **147 N**.',
      'Hung 42 cm from the wall, it makes 147 × 0.42 ≈ ==62 N·m== trying to rotate the structure down about the bolt.',
      'A pair of opposite horizontal forces, at the bolt and at the lower wall contact, must balance it.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'A 98 N load hangs 0.40 m from the wall. What moment does it create, in N·m?',
    answer: 39.2,
    tolerance: 0.1,
    unit: 'N·m',
    explanation: 'Moment = 98 N × 0.40 m = 39.2 N·m.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Tension at the top',
    image: 'boom-forth',
    caption:
      'The Forth Bridge (1890) is a giant cantilever: in each arm the **top members are in tension** and the **lower members are in compression**, just as in a Boomilever.',
    bullets: [
      'The load tries to rotate the structure away from the wall at the top, so the **top member is pulled** and hooks on the bolt.',
      'Wood is ==very strong in tension along the grain==, so a tension chord can be a thin strip.',
      'The weak spots are usually the joints at each end, where glue transfers the whole pull.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Where does a Boomilever’s tension chord most often fail?',
    options: [
      'At its glued end joints',
      'In the middle of the stick, by crushing',
      'By buckling sideways',
      'It never fails',
    ],
    answer: 0,
    explanation:
      'Wood along the grain is strong in tension, so the chord usually lets go where glue must pass the whole pull: its ends.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Compression at the bottom',
    image: 'boom-buckle-photo',
    caption:
      'A column loaded at its ends by the critical force Pc bows sideways: it **buckles** long before the material crushes.',
    bullets: [
      'The lower member, the **compression member** or strut, runs from the wall contact to the loading point.',
      'The load pushes it into the wall, so it is squeezed.',
      '==Compression members fail by buckling==, which is why the strut is usually the heaviest part and why bracing it matters.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Is each member in tension or compression?',
    bins: ['Tension', 'Compression'],
    items: [
      ['Top chord hooked on the bolt', 0],
      ['Lower strut pushing into the wall', 1],
      ['The member most likely to buckle', 1],
      ['A member that can be a thin strip', 0],
    ],
    explanation:
      'The top chord is pulled outward and can be thin; the lower strut is squeezed into the wall and fails by buckling.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'The force couple',
    bullets: [
      'The pull at the bolt and the push at the wall contact form a **couple**.',
      'Their size is **load moment ÷ vertical distance** between them.',
      '147 N at 42 cm with contact 20 cm below the bolt gives about 309 N; at 15 cm it rises to about 412 N.',
      '==Halving the depth doubles these forces.==',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'The load moment is 60 N·m and the wall contact is 0.12 m below the bolt. What is each force of the couple, in newtons?',
    answer: 500,
    tolerance: 1,
    unit: 'N',
    explanation:
      'Couple force = 60 N·m ÷ 0.12 m = 500 N, pulling at the bolt and pushing at the wall.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Members as a triangle',
    bullets: [
      'The simplest Boomilever is a triangle: a near-horizontal **tension chord**, a sloping **compression strut**, and the wall.',
      'At the loading point, strut and chord forces combine to hold the load straight up.',
      'A ==steeper strut carries more of the vertical load directly==; a flatter one must push harder.',
      'Drawing this **triangle of forces** is the core design skill.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Two designs hold the same load at the same reach. Which strut carries less force?',
    options: [
      'The steeper strut',
      'The flatter strut',
      'Both carry the same force',
      'The one with more glue',
    ],
    answer: 0,
    explanation:
      'A steeper strut points more of its force upward, so it needs less total force to hold the load. Flatter struts must push harder.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: chord force',
    problem:
      'A 15 kg load hangs 42 cm from the wall. The strut meets the wall 20 cm below the bolt. Estimate the horizontal chord force.',
    steps: [
      'Weight: 15 kg × 9.8 m/s² ≈ **147 N**.',
      'Moment about the wall contact: 147 N × 0.42 m ≈ **62 N·m**.',
      'Chord force = moment ÷ lever arm = 62 ÷ 0.20 ≈ **309 N**.',
    ],
    conclusion: 'The tension chord carries about 309 N, ==roughly 2.1 times the load itself==.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Moment', back: 'Force times perpendicular distance; a turning effect.' },
      { front: 'Static equilibrium', back: 'Forces and moments both sum to zero.' },
      { front: 'Force couple', back: 'Two equal, opposite, offset forces balancing a moment.' },
      {
        front: 'Free-body diagram',
        back: 'A sketch of one object with every external force on it.',
      },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'The top chord is in {0} and the lower strut is in {1}. The couple force equals the load moment divided by the {2} between bolt and wall contact.',
    blanks: ['tension', 'compression', 'depth'],
    distractors: ['shear', 'torsion', 'reach'],
    explanation:
      'The chord is pulled, the strut is pushed, and the couple force is moment ÷ contact depth.',
  },
  {
    kind: 'open',
    prompt:
      'Explain why moving the wall contact from 20 cm to 15 cm below the bolt raises the chord force.',
    model:
      'The load moment stays the same, but the lever arm between the bolt and the wall contact shrinks. Force equals moment divided by lever arm, so a shorter arm needs a larger force: 20 ÷ 15 ≈ 1.33 times more.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Equilibrium: forces and moments both sum to zero.',
      'Load moment = weight × reach, about 62 N·m for 15 kg at 42 cm.',
      'Top chord in tension, lower strut in compression.',
      '==Couple force = moment ÷ depth: halve the depth, double the force.==',
    ],
  },
]);

const geometry = defineDeck('boomb-u3-l1', [
  {
    kind: 'title',
    title: 'Geometry: contact depth, strut angle, and the bonus line',
    subtitle: 'Reach and depth set every member force before a single stick is cut.',
    objectives: [
      'Calculate chord and strut forces from **reach** and **contact depth**.',
      'Choose a reach with safe **margin** above 40 cm.',
      'Place the strut foot relative to the contact lines.',
      'Judge when extra members are worth their mass.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what reach would you aim for?',
    options: ['Exactly 40.0 cm', 'About 41 cm', 'About 45 cm', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Two numbers set the forces',
    bullets: [
      'In the triangle model, **reach L** (wall to chain) and **contact depth d** (bolt to wall contact) set every member force.',
      'Chord tension = **W × L ÷ d**.',
      'Strut compression = **W × (strut length) ÷ d**, with strut length √(L² + d²).',
      '==Mass grows with force and with length==, so geometry is the first design decision.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'A 147 N load hangs at a 40 cm reach with contact 20 cm below the bolt. What is the chord tension, in newtons?',
    answer: 294,
    tolerance: 1,
    unit: 'N',
    explanation: 'Chord tension = W × L ÷ d = 147 × 40 ÷ 20 = 294 N.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Reach',
    bullets: [
      'The chain centerline must be **40 to 45 cm** from the wall.',
      'Every extra centimeter raises the moment, so aim close to 40 cm.',
      'Leave margin for measurement and for the structure deflecting under load: many teams target ==about 41 cm==.',
      'Under 40 cm is a rules violation, so never cut it to the edge.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Why do many teams build for about 41 cm of reach instead of exactly 40.0 cm?',
    options: [
      'Margin for measurement error and deflection keeps it legal',
      'Longer reach lowers the member forces',
      'The rules require 41 cm',
      'The bonus needs at least 41 cm',
    ],
    answer: 0,
    explanation:
      'A little margin keeps the chain above the 40 cm minimum despite measurement error and sag, while costing only a small extra moment.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Depth and the contact lines',
    image: 'boom-level',
    caption:
      'A bubble level shows when a surface is level or **plumb**; the Testing Wall is set plumb this way, with lines measured from the bolt centerline.',
    bullets: [
      'Contact depth lines sit **10, 15, and 20 cm** below the bolt.',
      'Base designs may touch only above the 20 cm line; bonus designs only above the 15 cm line.',
      '==Deeper contact lowers forces==, so base feet sit just above 20 cm and bonus feet just above 15 cm.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each design to where its strut foot usually sits.',
    pairs: [
      ['Base design', 'Just above the 20 cm line'],
      ['Bonus design', 'Just above the 15 cm line'],
      ['Base design touching below 20 cm', 'Tier 2'],
      ['Deeper contact', 'Lower member forces'],
    ],
    explanation:
      'Each design uses the deepest contact its rules allow, since depth reduces force; going below the allowed line drops to Tier 2.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Cost of the bonus geometry',
    bullets: [
      'At 20 cm depth, a full 15 kg puts about **309 N** in the chord and **342 N** in the strut.',
      'At 15 cm, those rise to about **412 N** and **437 N**.',
      'The strut is also flatter, so ==its buckling length grows==.',
      'A bonus strut usually needs noticeably more wood or more bracing.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'Moving the contact from 20 cm to 15 cm below the bolt multiplies the chord force by about how much?',
    options: ['1.33 times', '0.75 times', '1.78 times', 'It does not change'],
    answer: 0,
    explanation:
      'Chord tension is W × L ÷ d, so the ratio is 20 ÷ 15 ≈ 1.33: about 309 N becomes about 412 N.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Keeping clear of the lines',
    bullets: [
      'The rule is about ==where the structure touches==, not where it ends.',
      'A block foot’s lowest edge must stay above the line during the whole test, including when the structure rotates under load.',
      'Leave a few millimeters of **margin**.',
      'A foot that slides down the wall as the load rises can cross the line mid-test.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'A bonus design’s foot sits 1 mm above the 15 cm line before loading. What is the risk?',
    options: [
      'Under load it may rotate or slide below the line',
      'There is no risk once the test starts',
      'The chain will be too close to the wall',
      'The bolt will not fit',
    ],
    answer: 0,
    explanation:
      'Structures deflect and feet can slip. A few millimeters of margin keeps contact above the line for the whole test.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Beyond the single triangle',
    image: 'boom-truss-bridge',
    caption:
      'A student-built balsa truss bridge: triangulated bracing shortens member lengths and resists twisting.',
    bullets: [
      'Many designs use **two chords and two struts** in a narrow pyramid, which resists twisting and sideways tipping.',
      'Others add a second brace from strut to chord to ==shorten buckling lengths==.',
      'Each extra member adds mass: add it only where a test shows a failure it prevents.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which are good reasons to add a member to a Boomilever? Select all that apply.',
    options: [
      'Tests show the strut buckling at mid-length',
      'The structure twists sideways under load',
      'It makes the structure look more complete',
      'It adds strength beyond 15 kg',
    ],
    answers: [0, 1],
    explanation:
      'Braces that stop a tested failure earn their mass. Strength beyond 15 kg earns nothing, and looks do not score.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: strut force at two depths',
    problem:
      'Compare strut forces for a full 15 kg (147 N) at 42 cm reach, with contact at 20 cm versus 15 cm.',
    steps: [
      'At 20 cm: strut length √(42² + 20²) ≈ 46.5 cm; force = 147 × 46.5 ÷ 20 ≈ **342 N**.',
      'At 15 cm: length ≈ 44.6 cm; force ≈ **437 N**.',
      'Ratio: ==1.28 times more compression== at the shallower contact.',
    ],
    conclusion:
      'The bonus geometry asks the strut for more force over a similar length, so it must be **stiffer or better braced**.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Reach', back: 'Wall to chain centerline: 40–45 cm.' },
      { front: 'Contact depth', back: 'Bolt centerline down to the wall contact.' },
      { front: 'Pyramid layout', back: 'Paired chords and struts that resist twisting.' },
      { front: 'Margin', back: 'Deliberate clearance from a rule limit.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Chord tension equals load times {0} divided by {1}. Base designs touch above the {2} cm line.',
    blanks: ['reach', 'depth', '20'],
    distractors: ['mass', 'width', '10'],
    explanation: 'T = W × L ÷ d, and base designs may touch only above the 20 cm line.',
  },
  {
    kind: 'open',
    prompt:
      'Why is a deeper contact allowed for the base design but rewarded with a bonus for shallow contact?',
    model:
      'Deeper contact gives a longer lever arm, which lowers member forces and makes a light structure easier. The bonus rewards accepting the harder geometry, whose larger forces cost extra wood, with 5,000 g of extra load.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Chord = W × L ÷ d; strut = W × √(L² + d²) ÷ d.',
      'Aim for about 41 cm of reach, never under 40 cm.',
      'Use the deepest contact allowed, with millimeters of margin.',
      '==The bonus geometry raises forces about 1.3 times.==',
    ],
  },
]);

const wood = defineDeck('boomb-u4-l1', [
  {
    kind: 'title',
    title: 'Wood selection, density, and buckling',
    subtitle: 'Pick the right sticks, then shape and brace them so the strut never bows.',
    objectives: [
      'Identify which wood and treatments are **legal**.',
      'Compare **balsa** and **basswood** for each member.',
      'Sort sticks by **density**.',
      'Use **Euler buckling** to size and brace struts.',
    ],
    image: 'boom-balsa-tree',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which matters more for a compression strut?',
    options: ['Stiffness', 'Tensile strength', 'Color', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'What counts as wood',
    bullets: [
      'The structure must be **wood joined by adhesive**, and nothing else.',
      'Wood means natural wood from stems, trunks, or roots.',
      'Not allowed: ==plywood and commercially laminated wood, bamboo, paper, particleboard, composites==.',
      'Wood may not be painted, soaked in glue, or chemically treated; you may laminate pieces yourself.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Is each material legal in a Boomilever?',
    bins: ['Legal', 'Not legal'],
    items: [
      ['Balsa sticks', 0],
      ['Basswood strips', 0],
      ['Balsa sheets laminated by the team', 0],
      ['Commercial plywood', 1],
      ['Bamboo skewers', 1],
      ['Balsa soaked in thin glue', 1],
    ],
    explanation:
      'Natural wood and team-made laminations are fine. Plywood, bamboo, and glue-soaked wood break the material rules.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Balsa and basswood',
    image: 'boom-balsa-sticks',
    caption:
      'Thin balsa strips (1/16 and 1/8 inch) beside a ruler: the raw material for most competition structures.',
    bullets: [
      '**Balsa** densities run roughly 0.08 to 0.25 g/cm³, with excellent stiffness for its weight.',
      '**Basswood** is two to three times denser, more uniform, and much tougher at joints.',
      'Use ==balsa for compression struts== and basswood or hard balsa for the tension chord and bolt hook.',
    ],
  },
  {
    kind: 'compare',
    section: 1,
    title: 'Choosing wood for each member',
    columns: ['', 'Balsa', 'Basswood'],
    rows: [
      ['Density', 'About 0.08–0.25 g/cm³', '**Two to three times** denser'],
      ['Strength', 'Excellent stiffness per gram', 'Uniform and tough at joints'],
      ['Best use', '==Compression struts==', 'Tension chord and bolt hook'],
    ],
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Density sorting',
    bullets: [
      'Two balsa sticks of the same size can differ in mass by ==a factor of two==, and stiffness rises with density.',
      'Weigh every stick: **density = mass ÷ (length × width × thickness)**.',
      'Save light sticks for bracing and the stiffest, denser sticks for the main strut.',
      'Label sticks with density so you can rebuild a good design with matching parts.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'A balsa stick 30 cm × 0.3 cm × 0.3 cm has a mass of 0.32 g. What is its density, in g/cm³?',
    answer: 0.119,
    tolerance: 0.003,
    unit: 'g/cm³',
    explanation: 'Volume = 30 × 0.3 × 0.3 = 2.7 cm³, so density = 0.32 ÷ 2.7 ≈ 0.119 g/cm³.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Euler buckling',
    image: 'boom-buckling-modes',
    caption:
      'Buckled shapes (dashed) of columns with different end supports: ==more restraint means a higher buckling load==.',
    bullets: [
      'A pinned slender column buckles at **P = π²EI ÷ L²**.',
      'E is stiffness, I describes the cross-section, and L is the **unbraced length**; for a square stick, I = b⁴ ÷ 12.',
      '==Halving the unbraced length makes the strut four times harder to buckle==, for the cost of one small brace.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'A strut is braced at two points, dividing it into three equal unbraced lengths. By how much does its buckling load rise?',
    options: ['9 times', '3 times', '6 times', '4 times'],
    answer: 0,
    explanation:
      'Euler load scales with 1 ÷ L². A third of the length gives (3)² = 9 times the buckling load.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Shape matters',
    bullets: [
      'I grows with the **fourth power of width**, so a wider, hollow-looking section is far stiffer than a solid square of the same mass.',
      'Teams laminate thin sheets into an **L or box section**.',
      'Or they space two thin struts apart with small cross braces.',
      'These tricks ==raise I without adding much area==, exactly what a compression member needs.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'A square strut’s side is doubled. By what factor does I (= b⁴ ÷ 12) increase?',
    answer: 16,
    tolerance: 0.01,
    explanation:
      'I scales with b⁴, and 2⁴ = 16. The area only grows 4 times, which is why width pays off.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Tension sizing',
    bullets: [
      'A tension member fails when **stress = force ÷ area** exceeds tensile strength.',
      'Balsa along the grain holds very roughly **7 to 20 MPa**, so a few square millimetres can carry hundreds of newtons in theory.',
      'In practice the chord ==fails at its ends==, where glue and grain direction matter more than area.',
      'Test joints, not just sticks.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'A 3 mm × 3 mm balsa chord has a tensile strength of 12 MPa (12 N/mm²). What force would break the stick itself, in newtons?',
    answer: 108,
    tolerance: 0.5,
    unit: 'N',
    explanation:
      'Area = 9 mm², so force = 12 N/mm² × 9 mm² = 108 N. Its glued ends may fail sooner.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: one midpoint brace',
    problem:
      'A strut buckles at 120 N with an unbraced length of 30 cm. A brace is added at its midpoint. Estimate the new buckling load.',
    steps: [
      'Euler load scales with **1 ÷ L²**.',
      'The new unbraced length is 15 cm, half the original.',
      'Load rises by (30 ÷ 15)² = 4: about **480 N**.',
    ],
    conclusion:
      'One midpoint brace ==roughly quadruples buckling resistance==, usually for less mass than a thicker strut.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Density', back: 'Mass per volume, g/cm³; linked to balsa stiffness.' },
      { front: 'Modulus of elasticity (E)', back: 'Material stiffness.' },
      { front: 'Unbraced length', back: 'Distance between points that stop sideways bowing.' },
      { front: 'Lamination', back: 'Gluing wood layers together; allowed when done by the team.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Euler buckling load falls with the {0} of unbraced length. Struts are usually made of {1}, and width raises I with the {2} power.',
    blanks: ['square', 'balsa', 'fourth'],
    distractors: ['cube', 'plywood', 'second'],
    explanation: 'P = π²EI ÷ L², balsa gives stiffness per gram, and I grows with b⁴.',
  },
  {
    kind: 'open',
    prompt:
      'You have one dense and one light balsa stick of the same size. Which goes where, and why?',
    model:
      'The denser stick is stiffer, so it goes in the main compression strut, where stiffness resists buckling. The light stick goes in lightly loaded bracing, where it saves mass without being near its limit.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Only natural wood and adhesive; you may laminate it yourself.',
      'Balsa for struts, tougher wood for the chord and hook.',
      'Weigh and label every stick by density.',
      '==Brace and widen struts: buckling load grows with I and falls with L².==',
    ],
  },
]);

const joints = defineDeck('boomb-u5-l1', [
  {
    kind: 'title',
    title: 'Joints, adhesives, and the bolt hook',
    subtitle:
      'Most structures break at a joint, so design the glue lines as carefully as the sticks.',
    objectives: [
      'Apply the **adhesive rules**.',
      'Size joints from glue **shear** strength and bonded area.',
      'Design a bolt hook and loading point that seat correctly.',
      'Control the mass of glue.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: where have your structures broken most often?',
    options: ['At a joint', 'In the middle of a stick', 'At the bolt hook', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Adhesive rules',
    bullets: [
      'Any commercially available adhesive may be used: wood glue, **cyanoacrylate (CA)**, epoxy, or hot melt.',
      'Adhesive may be used ==only to join pieces==.',
      'Tape is not allowed, and wood may not be coated or soaked in glue to strengthen it.',
      'Glue sits in joints, not spread along members as a reinforcing skin.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Is each use of adhesive or tape legal?',
    bins: ['Legal', 'Not legal'],
    items: [
      ['Thin CA in a tight joint', 0],
      ['Epoxy at the bolt hook', 0],
      ['Wood glue at a gusset', 0],
      ['Tape wrapped around a joint', 1],
      ['Coating the whole strut in CA', 1],
    ],
    explanation:
      'Any commercial adhesive may join pieces. Tape is banned, and glue may not coat members to reinforce them.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'How glue joints carry load',
    bullets: [
      'Most joints transfer force through **shear**: two surfaces sliding past each other with glue resisting.',
      'Joint strength ≈ ==glue shear strength × bonded area==.',
      'A **butt joint**, where only the stick end touches, is weak; an overlapped or gusseted joint is much stronger.',
      'Long grain to long grain bonds far better than **end grain**, which soaks up glue.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'Glue holds about 2 N per mm² of long-grain overlap. What force can a 10 mm × 8 mm overlap joint carry, in newtons?',
    answer: 160,
    tolerance: 0.5,
    unit: 'N',
    explanation: 'Area = 80 mm², so strength ≈ 2 N/mm² × 80 mm² = 160 N.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Gussets',
    image: 'boom-gusset',
    caption:
      'Steel bridge members meet at riveted **gusset plates**, which spread each joint over a large connecting area.',
    bullets: [
      'A Boomilever gusset is a small plate of thin wood glued across a joint, adding bonded area on both members.',
      'Gussets ==turn a weak butt joint into a strong overlapped one==.',
      'They add mass, so use them where tests show a joint failing: the chord-to-hook joint and the strut-to-chord joint.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Where are gussets most worth their mass on a Boomilever?',
    options: [
      'Where tests show joints failing, such as the chord-to-hook joint',
      'On every joint, just in case',
      'Along the middle of the strut',
      'Nowhere: they are not allowed',
    ],
    answer: 0,
    explanation:
      'Gussets are legal but add mass, so place them where joints actually fail, usually at the hook and the loading point.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'The bolt hook',
    bullets: [
      'The structure rests on the **Mounting Bolt**, a 1/4-20 connector bolt with about 3.0 cm between its nearest face and the wall.',
      'The hook must seat on the bolt shaft within that clearance and pass the whole chord tension into it.',
      '==Soft wood crushing against the round bolt== is a common failure.',
      'A hardwood or end-grain **bearing block** spreads the pressure.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each bolt-hook idea to its description.',
    pairs: [
      ['Mounting Bolt', '1/4-20 connector bolt'],
      ['Clearance to the wall', 'About 3.0 cm'],
      ['Common hook failure', 'Soft wood crushing on the bolt'],
      ['Bearing block', 'Spreads the pressure on the bolt'],
    ],
    explanation:
      'The hook seats on a 1/4-20 bolt 3.0 cm from the wall; high bearing stress crushes soft wood unless a bearing block spreads it.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'The loading point',
    bullets: [
      'The **Loading Block** (5 × 5 × about 2 cm) sits on the structure with its eyebolt hanging below.',
      'Before sand is added, the bottom of the block must be ==above the horizontal plane through the bolt centerline==.',
      'The structure supports only the block, which carries the rest of the assembly.',
      'A small platform or pair of rails keeps the block level and centered.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Where must the bottom of the Loading Block be before loading starts?',
    options: [
      'Above the horizontal plane through the bolt centerline',
      'Below the 15 cm contact line',
      'Touching the wall',
      'Exactly 40 cm below the bolt',
    ],
    answer: 0,
    explanation:
      'The block starts above the bolt plane, resting on the structure, with the eyebolt and chain hanging below it.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Glue mass',
    bullets: [
      'A drop of CA can weigh **several hundredths of a gram**, and a light structure may have dozens of joints.',
      'Excess glue can add ==10 to 20 percent== to a structure’s mass.',
      'Use thin CA for tight joints, apply with a fine tip, and wipe away runs.',
      'Weigh before and after gluing to see how much adhesive you carry.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'A structure has 30 joints, each with 0.03 g of glue. How many grams of glue does it carry?',
    answer: 0.9,
    tolerance: 0.01,
    unit: 'g',
    explanation: '30 × 0.03 g = 0.9 g, about 11 percent of an 8 g structure.',
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: size a chord joint',
    problem:
      'A chord joint must carry 300 N. Glue holds about 2 N per mm² of long-grain overlap. How much bonded area do you need, with a safety factor of 1.5?',
    steps: [
      'Required strength: 300 N × 1.5 = **450 N**.',
      'Area = 450 N ÷ 2 N/mm² = **225 mm²**.',
      'A 15 mm × 15 mm overlap, or two gussets of about 113 mm² each, would do.',
    ],
    conclusion: '==Joint area, not member size==, decides whether the chord end survives.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Shear', back: 'Force that slides one surface along another.' },
      { front: 'Gusset', back: 'A thin plate glued across a joint for more bonded area.' },
      { front: 'End grain', back: 'Cut ends of wood fibers; bonds poorly.' },
      { front: 'Bearing stress', back: 'Pressure where one part pushes on another.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Joint strength is roughly glue strength times bonded {0}. A {1} adds area across a joint, and {2} is never allowed.',
    blanks: ['area', 'gusset', 'tape'],
    distractors: ['length', 'strut', 'epoxy'],
    explanation: 'Strength scales with bonded area; gussets add it; tape is banned.',
  },
  {
    kind: 'open',
    prompt: 'Your hook keeps crushing where it sits on the bolt. Propose a fix and explain it.',
    model:
      'Glue a small hardwood or end-grain bearing block where the hook meets the bolt. It spreads the chord tension over more wood, lowering bearing stress below what crushes balsa, for very little extra mass.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Any commercial adhesive, used only to join; no tape or coatings.',
      'Joint strength ≈ shear strength × bonded long-grain area.',
      'Gussets and bearing blocks go where tests show failure.',
      '==Glue can be 10–20 percent of the mass: apply it sparingly.==',
    ],
  },
]);

const apparatus = defineDeck('boomb-u6-l1', [
  {
    kind: 'title',
    title: 'The test apparatus, setup, and loading procedure',
    subtitle: 'Know the wall, the bolt, and the six-minute routine before you ever reach the test.',
    objectives: [
      'Describe the **Testing Wall** and Mounting Bolt Assembly.',
      'Explain what happens at **check-in**.',
      'Run the six-minute setup and loading rules.',
      'Record the Load Supported correctly.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: have you built a practice wall to the official dimensions?',
    options: ['Yes', 'Partly', 'Not yet', 'Not sure what it needs'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The Testing Wall',
    bullets: [
      'A rigid, smooth surface at least **40 cm wide and 30 cm high**, set ==plumb== with a level.',
      'One bolt hole sits about **5 cm below the top**, centered side to side, with centerlines marked.',
      'Contact depth lines are drawn **10, 15, and 20 cm** below the bolt center.',
      'Two vertical **contact width lines** sit 4.0 cm either side of it.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each Testing Wall feature to its measurement.',
    pairs: [
      ['Minimum wall size', '40 cm wide × 30 cm high'],
      ['Bolt hole position', 'About 5 cm below the top'],
      ['Contact depth lines', '10, 15, and 20 cm below the bolt'],
      ['Contact width lines', '4.0 cm either side of the bolt'],
    ],
    explanation:
      'Build your practice wall to these numbers so your hook and foot behave the same at competition.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Mounting Bolt Assembly',
    bullets: [
      'A **1/4-20 connector bolt** about 60 mm long, held by a nut and washer on each side of the wall.',
      '**3.0 ± 0.1 cm** between the wall and the nearest face of the bolt.',
      'Teams ==may not adjust it==.',
      'Your hook must work with that exact geometry, so build a practice wall to match.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'How far is the nearest face of the Mounting Bolt from the wall?',
    options: ['3.0 ± 0.1 cm', '5.0 ± 0.5 cm', '1.0 cm exactly', 'Teams set it themselves'],
    answer: 0,
    explanation: 'The assembly fixes 3.0 ± 0.1 cm of clearance, and teams may not adjust it.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Check-in',
    bullets: [
      'At check-in you may not leave, receive help, or alter the structure.',
      'The supervisor confirms eye protection and construction rules.',
      'They record your **Estimated Load Supported** and weigh the structure to 0.01 g where possible.',
      '==Ties on mass are broken by whose estimate is closest== to the load actually held.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'What is the Estimated Load Supported used for?',
    options: [
      'Breaking ties',
      'Setting the maximum load',
      'Choosing the chain length',
      'Nothing; it is optional',
    ],
    answer: 0,
    explanation:
      'The estimate is a tiebreaker: when mass ties, the team whose estimate is closest to its actual load wins.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Before loading',
    bullets: [
      'You have **six minutes** to mount the structure and assemble the load.',
      'The supervisor checks bolt seating, that only the block is supported, and the chain position (40–45 cm out, within 2.5 cm of center).',
      'They check wall contact zones and that the block starts above the bolt plane.',
      'They confirm contact stays above the 15 cm line for the bonus, and that ==the bucket hangs clear of the floor==.',
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Which does the supervisor check before sand is poured? Select all that apply.',
    options: [
      'The hook is seated on the bolt',
      'The chain is 40–45 cm from the wall',
      'The bucket hangs clear of the floor',
      'The structure has been painted',
    ],
    answers: [0, 1, 2],
    explanation:
      'Seating, chain position, contact zones, block height, and bucket clearance are all checked. Painting would be illegal.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'During loading',
    bullets: [
      'Once sand starts, ==the structure may not be adjusted==.',
      'You may steady the bucket only with the **tips of the two stabilizing sticks**; you may not lift or push it.',
      'Loading stops when the structure fails, anything else supports the load, the structure gets vertical support other than the bolt, or time expires.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Is each action allowed once sand starts flowing?',
    bins: ['Allowed', 'Not allowed'],
    items: [
      ['Touching the bucket with the stabilizing-stick tips', 0],
      ['Lifting the bucket to slow a swing', 1],
      ['Nudging the structure back onto the bolt', 1],
      ['Pouring sand steadily', 0],
    ],
    explanation:
      'Stick tips may steady the bucket, but nobody may lift it or adjust the structure after loading starts.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Recording the result',
    bullets: [
      '**Load Supported** = assembly plus sand in the bucket, with broken structure pieces removed.',
      'Recorded to the nearest gram and ==capped at 15,000 g==.',
      'Review the score sheet; once you acknowledge it, testing is complete.',
      'To appeal, leave your structure with the supervisor.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'The assembly weighs 1,420 g and the bucket holds 14,100 g of sand when loading ends. What Load Supported is recorded, in grams?',
    answer: 15000,
    tolerance: 0.5,
    unit: 'g',
    explanation: 'The total is 15,520 g, but Load Supported is capped at 15,000 g.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: the six-minute plan',
    problem: 'Plan the six-minute window for a team that has practiced setup.',
    steps: [
      '0:00–1:30: seat the hook, check the foot clears the line, place the block on the rails.',
      '1:30–3:00: hang chain and bucket; confirm the block is above the bolt plane and the chain at about 41 cm.',
      '3:00 onward: pour steadily while one partner steadies with **stick tips only**.',
    ],
    conclusion:
      'A rehearsed routine leaves time to pour slowly, which ==avoids dynamic shocks== that break structures early.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Plumb', back: 'Exactly vertical, checked with a level.' },
      { front: 'Estimated Load Supported', back: 'The team’s prediction, used as a tiebreaker.' },
      {
        front: 'Stabilizing sticks',
        back: 'Dowels whose tips are the only way to steady the bucket.',
      },
      { front: 'Load Supported', back: 'Assembly plus sand at the end, max 15,000 g.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Teams have {0} minutes to mount and set up. During loading the bucket may be steadied only with {1} tips, and Load Supported is capped at {2} g.',
    blanks: ['six', 'stabilizing-stick', '15,000'],
    distractors: ['eight', 'finger', '20,000'],
    explanation: 'Six minutes of setup, stick tips only, and a 15,000 g cap.',
  },
  {
    kind: 'open',
    prompt: 'Why might pouring sand quickly break a structure that holds 15 kg in a slow test?',
    model:
      'Fast pouring and a swinging bucket add dynamic forces on top of the static weight, so peak loads briefly exceed what is in the bucket. A slow, steady pour keeps the force close to the actual sand mass.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Practice on a wall built to the official dimensions.',
      'Give an honest Estimated Load Supported: it breaks ties.',
      'Six minutes of rehearsed setup, then no adjustments.',
      '==Pour steadily and steady the bucket only with stick tips.==',
    ],
  },
]);

const testing = defineDeck('boomb-u7-l1', [
  {
    kind: 'title',
    title: 'Testing, failure analysis, and iteration',
    subtitle: 'Every break tells you where the next gram should go, or come from.',
    objectives: [
      'Use tests to failure to find the **weakest part**.',
      'Identify **failure modes** from the broken pieces.',
      'Change one **variable** at a time and keep a build log.',
      'Choose a consistent competition design and protect it.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how many full tests have you run on your current design?',
    options: ['None yet', 'One or two', 'Three to five', 'More than five'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Test to failure, then to 15 kg',
    bullets: [
      'Load early prototypes **until they break**: the failure shows the weakest part.',
      'Once a design reliably holds 15 kg, test copies to confirm consistency.',
      'Then ==remove mass in small steps==.',
      'If it still holds, the removed wood was not needed; if it fails, the failure shows where the limit is.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Why load early prototypes all the way to failure?',
    options: [
      'The break reveals the weakest part to fix',
      'It is the only legal test',
      'It makes the structure lighter',
      'It measures the Target Time',
    ],
    answer: 0,
    explanation:
      'A structure that never fails tells you little; the failure points to exactly what needs strengthening or what can be lightened.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Read the break',
    image: 'boom-quebec',
    caption:
      'The Quebec Bridge collapsed in 1907 when a lower compression chord buckled: ==the same failure mode that breaks Boomilever struts==.',
    bullets: [
      'A strut that bowed sideways before snapping **buckled**: brace or stiffen it.',
      'Clean wood failure in the chord means **tension strength** was reached.',
      'A joint that peeled with glue on one surface means **bond area or fit** was poor.',
      'Crushed wood at the hook means **bearing stress** was too high.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each observation to its failure mode.',
    pairs: [
      ['Strut bowed sideways, then snapped', 'Buckling'],
      ['Chord stick broke cleanly mid-length', 'Tension strength reached'],
      ['Joint peeled with glue on one face only', 'Poor bond area or fit'],
      ['Wood crushed where it sat on the bolt', 'Bearing stress too high'],
    ],
    explanation:
      'Each mode needs a different fix: bracing, a bigger chord, a better joint, or a bearing block.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'One change at a time',
    bullets: [
      'Change strut wood, bracing, and joints together and ==you cannot tell which helped==.',
      'Change **one variable** per build and keep the others identical.',
      'Record mass, load held, and failure mode.',
      '**Slow-motion video** often reveals which part let go first, which is not always the part that looks most broken afterward.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'A new build uses a denser strut, an extra brace, and thinner glue, and holds 2 kg more. What can you conclude?',
    options: [
      'Only that the combination helped; not which change did',
      'The denser strut caused the improvement',
      'Thinner glue is always better',
      'The brace was unnecessary',
    ],
    answer: 0,
    explanation:
      'With three variables changed at once, the gain cannot be traced to any one of them. Change one variable per build.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'The build log',
    bullets: [
      'Record each build’s date, wood densities, member sizes, joint method, glue type, total mass, load held, and failure description.',
      'Over time the log shows the ==trend of score against mass==.',
      'It is the evidence for your **Estimated Load Supported**.',
      'It also prepares you for design-knowledge questions, which the rules require.',
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Which belong in a Boomilever build log? Select all that apply.',
    options: [
      'Wood densities',
      'Total mass',
      'Load held and failure mode',
      'The weather forecast for the tournament',
    ],
    answers: [0, 1, 2],
    explanation:
      'Materials, mass, load, and failure mode make the log useful for design, estimates, and questions.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Consistency over records',
    bullets: [
      'One build that held 15 kg at 6 g is less useful than ==five builds that each held 15 kg at 7 g==.',
      'Natural variation in balsa means the lightest design that works every time is the right competition structure.',
      'Build **at least two** competition-ready copies, so transport damage does not end your day.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'A design holds 15,000 g at 8.4 g, with no bonus. What is its score?',
    answer: 1785.7,
    tolerance: 0.5,
    explanation: 'Score = 15,000 ÷ 8.4 ≈ 1785.7.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Transport and humidity',
    bullets: [
      'Wood absorbs moisture and gets ==heavier and slightly weaker in humid air==.',
      'Store finished structures in a **dry box** and weigh them before leaving.',
      'Use a padded carrier that supports the strut without loading the joints.',
      'A transport crack is a common reason a proven design fails at competition.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Your structure weighed 7.9 g at home but 8.3 g at a humid tournament. What happened?',
    options: [
      'The wood absorbed moisture from the air',
      'The scale is broken',
      'Glue keeps hardening and gains mass',
      'The supervisor added a part',
    ],
    answer: 0,
    explanation:
      'Wood takes up water in humid air, adding mass and slightly lowering strength. Store structures in a dry box.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: pick the competition build',
    problem:
      'Your log shows: 9.2 g held 15 kg; 8.4 g held 15 kg; 7.9 g failed at 13.1 kg (strut buckled). What should the competition build be?',
    steps: [
      'Scores: **1,630**; **1,786**; **1,658**.',
      'The 7.9 g build failed by buckling, so the strut is at its limit near that mass.',
      'Build two or three more at about 8.4 g to ==confirm they hold reliably==.',
    ],
    conclusion:
      'Compete with the 8.4 g design once it repeats; push lighter only with a **stiffer strut**, not by thinning it.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Failure mode', back: 'How a part broke: buckling, tension, peel, or crush.' },
      { front: 'Controlled variable', back: 'A factor kept the same so one change can be judged.' },
      { front: 'Safety factor', back: 'Capacity ÷ expected load; margin against variation.' },
      { front: 'Consistency', back: 'The same result from repeated, identical builds.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A strut that bowed sideways failed by {0}. Change one {1} per build, and record every result in a build {2}.',
    blanks: ['buckling', 'variable', 'log'],
    distractors: ['tension', 'team member', 'photo'],
    explanation:
      'Bowing means buckling; controlled tests change one variable; the log keeps the evidence.',
  },
  {
    kind: 'open',
    prompt: 'Two weeks before the tournament, your lightest build failed once. What is your plan?',
    model:
      'Read the failure mode and fix that part without changing anything else, then build two copies at that mass and test both. If they do not hold reliably, compete with the slightly heavier design that has repeated, and protect it in a dry, padded carrier.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Break prototypes to find the weakest part, then trim mass step by step.',
      'Read the failure mode: each has its own fix.',
      'One variable per build, everything in the log.',
      '==Compete with the lightest design that works every time.==',
    ],
  },
]);

export const decks: Deck[] = [event, statics, geometry, wood, joints, apparatus, testing];
