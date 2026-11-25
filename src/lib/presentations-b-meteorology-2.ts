import { defineDeck, type Deck } from './presentation-types.ts';

// Meteorology (Division B) lessons 5–8: thunderstorms, winds and tornadoes, hurricanes, and
// precipitation hazards. Imported by presentations-b-meteorology.ts.

const thunderstorms = defineDeck('met-u5-l1', [
  {
    kind: 'title',
    title: 'Thunderstorms and lightning',
    subtitle: 'How storms grow, organize and build up electric charge.',
    objectives: [
      'Describe the life cycle of an ordinary thunderstorm.',
      'Compare single-cell, multicell, supercell and MCC storms.',
      'Explain cloud electrification and types of lightning.',
    ],
    image: 'b-met-lightning',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how long do you think an ordinary thunderstorm lasts?',
    options: ['About 5 minutes', 'Under an hour', 'About a day', 'A week'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'What makes a storm severe',
    image: 'b-met-cumulonimbus',
    caption: 'A towering **cumulonimbus**: its top spreads into an ==anvil at the tropopause==.',
    bullets: [
      'NWS **severe**: hail **at least 1 inch**, gusts **at least 58 mph (50 knots)**, or a **tornado**.',
      'Every thunderstorm needs ==moisture, instability and lift==.',
      'What makes some severe is **organization**, mostly controlled by **wind shear**.',
    ],
  },
  {
    kind: 'multi',
    section: 0,
    prompt: 'Which would make a thunderstorm officially severe? Select all that apply.',
    options: [
      'Hail 1.25 inches across',
      'A 60 mph wind gust',
      'A tornado',
      'Heavy rain with 40 mph gusts and pea-sized hail',
    ],
    answers: [0, 1, 2],
    explanation:
      'Severe means hail at least 1 inch, gusts at least 58 mph, or a tornado. Heavy rain alone does not count.',
  },
  {
    kind: 'flow',
    section: 1,
    title: 'Life cycle of a single cell',
    steps: [
      { label: 'Cumulus stage', detail: 'A warm **updraft** builds the cloud upward.' },
      {
        label: 'Mature stage',
        detail:
          'Rain falls and drags air down: ==updraft and downdraft side by side==, with the heaviest rain, lightning and gusts.',
      },
      {
        label: 'Dissipating stage',
        detail:
          'The **downdraft cuts off the updraft**; the storm rains itself out, usually within an hour.',
      },
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Put the stages of a single-cell storm in order.',
    items: ['Cumulus stage', 'Mature stage', 'Dissipating stage'],
    explanation:
      'The updraft builds the cloud, rain and downdraft join it at maturity, then the downdraft takes over.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Multicell storms and squall lines',
    bullets: [
      '**Multicells** are clusters of cells at different stages.',
      'One cell’s **cold outflow** lifts warm air to ==form a new cell==, usually on one flank.',
      '**Squall lines** can stretch hundreds of km along a front, led by a **gust front**.',
      'They bring **damaging winds**, brief tornadoes, and often move faster than single cells.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Supercells and MCCs',
    image: 'b-met-supercell',
    caption:
      'A supercell from above: rain and hail curl around the updraft, and the **tornado** sits at the ==tip of the hook==.',
    bullets: [
      'A **supercell** has a long-lived rotating updraft, the **mesocyclone**, made possible by strong, turning shear.',
      'It can last for hours and makes most **large hail and violent tornadoes**.',
      'Radar shows a **hook echo** and a **weak-echo region** where the strong updraft keeps rain from forming.',
      'An **MCC** is a huge, nearly circular storm cluster (often over ==100,000 km²== of cold tops) that forms at night.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each storm type to its description.',
    pairs: [
      ['Single cell', 'One updraft that rains itself out within an hour'],
      ['Multicell', 'A cluster of cells where outflow triggers new cells'],
      ['Supercell', 'A long-lived storm with a rotating updraft'],
      ['MCC', 'A huge, nearly circular nighttime storm cluster'],
    ],
    explanation:
      'Organization grows from single cells to multicells to supercells; an MCC is a very large nighttime complex.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Charging a cloud',
    bullets: [
      'Lightning comes from **charge separation** in the storm’s **mixed-phase** region.',
      '**Graupel** (soft hail) collides with small **ice crystals** where **supercooled water** is present.',
      'Usually the heavier graupel turns ==negative and stays low==; light ice crystals turn ==positive and rise to the top==.',
      'Result: a **positive top**, a main **negative middle**, and often a small positive region near the base.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'In the usual case, where does the main negative charge sit in a thunderstorm?',
    options: [
      'In the middle of the cloud, carried by graupel',
      'At the very top of the anvil',
      'Only on the ground',
      'Outside the cloud',
    ],
    answer: 0,
    explanation:
      'Heavier graupel becomes negative and stays lower, forming the main negative region in the middle; light ice crystals carry positive charge to the top.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Types of lightning and detection',
    image: 'b-met-lightning',
    caption:
      'A **cloud-to-ground** strike: a **stepped leader** comes down, a **positive streamer** rises to meet it, then a bright ==return stroke==.',
    bullets: [
      'Most lightning is **intracloud**.',
      '**Positive** cloud-to-ground strikes come from the anvil, carry more current, and can strike ==far from the storm==.',
      'Air heated to about **30,000 °C** expands explosively: **thunder**.',
      'Detection networks locate strikes by **timing radio signals** at several sensors.',
    ],
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: how far away?',
    problem: 'You see a flash and hear thunder 12 seconds later. How far is the lightning?',
    steps: [
      'Sound travels about **1 km every 3 seconds**.',
      '12 s ÷ 3 = **4 km**.',
      'If you can hear thunder, you are ==close enough to be struck==.',
    ],
    conclusion: 'The strike was about **4 km** away: go indoors.',
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'Thunder arrives 9 seconds after the flash. About how far away is the lightning, in km? (Sound travels about 1 km per 3 s.)',
    answer: 3,
    tolerance: 0.2,
    unit: 'km',
    explanation: '9 ÷ 3 = 3 km.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Cumulonimbus', back: 'The towering thunderstorm cloud with an anvil top.' },
      { front: 'Mesocyclone', back: 'The rotating updraft of a supercell.' },
      { front: 'Graupel', back: 'Soft hail that carries negative charge in a storm.' },
      { front: 'Return stroke', back: 'The bright flash after a leader meets a streamer.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Every thunderstorm needs moisture, instability and {0}. Strong turning shear lets a {1} rotate. Thunder comes from air heated by {2}.',
    blanks: ['lift', 'supercell', 'lightning'],
    distractors: ['snow', 'single cell', 'sunlight'],
    explanation:
      'Lift starts the updraft, shear organizes supercells, and lightning heats air so fast that it booms.',
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      '**Severe** = hail ≥ 1 inch, gusts ≥ 58 mph, or a tornado.',
      'Single cells go **cumulus → mature → dissipating** in about an hour.',
      '**Shear** organizes multicells and ==rotating supercells==.',
      'Graupel–ice collisions **separate charge**; count seconds ÷ 3 for km to the strike.',
    ],
  },
]);

const windsAndTornadoes = defineDeck('met-u6-l1', [
  {
    kind: 'title',
    title: 'Damaging winds and tornadoes',
    subtitle: 'Tell straight-line winds from tornadoes, and rate the damage.',
    objectives: [
      'Distinguish downbursts, derechos, squall lines and downslope winds.',
      'Describe how tornadoes form, live and where they occur.',
      'Rate tornadoes with the F and EF scales and read radar signatures.',
    ],
    image: 'b-met-tornado',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: is most thunderstorm wind damage caused by tornadoes?',
    options: ['Yes, almost all', 'No, a lot is straight-line wind', 'About half', 'Not sure'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Straight-line winds',
    image: 'b-met-microburst',
    caption:
      'A **downburst** is a strong downdraft that hits the ground and ==spreads outward== in all directions.',
    bullets: [
      '**Microburst**: under **4 km** across, lasting a few minutes. **Macroburst**: a wider area.',
      'Downburst damage spreads **outward** in a ==starburst== pattern.',
      'Tornado damage is **convergent**: debris thrown inward and in a swirl.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'Trees in a field are all blown down pointing outward from one central point. What caused it?',
    options: [
      'A downburst of straight-line winds',
      'A tornado',
      'An earthquake',
      'A lightning strike',
    ],
    answer: 0,
    explanation:
      'Outward, starburst damage comes from a downdraft spreading out; tornado damage points inward and swirls.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Derechos and bow echoes',
    image: 'b-met-bow-echo',
    caption:
      'A **bow echo**: a **rear-inflow jet** pushes the line forward, with the ==strongest winds at the apex==.',
    bullets: [
      'A **derecho** is a widespread, long-lived windstorm from a fast-moving storm line, with a damage swath typically ==over 400 km==.',
      '**Gust fronts** show on radar as thin lines of weak reflectivity ahead of storms.',
      '**Downslope winds** such as the **chinook** descend the lee side of mountains and warm.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each wind event to its description.',
    pairs: [
      ['Microburst', 'A downdraft outflow under 4 km across'],
      ['Derecho', 'A long-lived windstorm with a swath over 400 km'],
      ['Bow echo', 'A storm line bulging forward on radar'],
      ['Chinook', 'Warm wind descending the lee side of mountains'],
    ],
    explanation:
      'Microbursts are small, derechos are long, bow echoes are the radar shape, and chinooks are downslope winds.',
  },
  {
    kind: 'flow',
    section: 2,
    title: 'How a supercell tornado forms',
    steps: [
      { label: 'Shear', detail: 'Wind shear creates **horizontal spin** near the ground.' },
      {
        label: 'Tilting',
        detail: 'The **updraft tilts the spin upright** into a ==mesocyclone==.',
      },
      {
        label: 'Tightening',
        detail: 'Interaction with the **rear-flank downdraft** tightens rotation near the ground.',
      },
      {
        label: 'Tornado',
        detail: 'A violently rotating column ==touching both the ground and the cloud==.',
      },
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Which statement about tornadoes is true?',
    options: [
      'Most supercells do not produce tornadoes',
      'Every supercell produces a tornado',
      'Landspouts always need a mesocyclone',
      'A tornado does not touch the ground',
    ],
    answer: 0,
    explanation:
      'Most supercells never make a tornado. Landspouts and waterspouts form from weaker rotation without a mesocyclone.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Life cycle, timing and geography',
    image: 'b-met-tornado',
    caption: 'A tornado near **Anadarko, Oklahoma**, in the southern Plains, on May 3, 1999.',
    bullets: [
      'Stages: **organizing → mature → shrinking rope**, then it dissipates.',
      'Most last **minutes**; rare long-track tornadoes travel over **100 km**.',
      'In the U.S., most common in **spring and early summer**, **late afternoon and evening**.',
      'Hot spots: **Tornado Alley** (Plains) and **Dixie Alley** (Southeast), where tornadoes are often ==rain-wrapped and at night==.',
    ],
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Rating tornadoes',
    columns: ['Rating', 'Estimated wind', 'Notes'],
    rows: [
      ['**EF0**', '65–85 mph', 'Weakest rating'],
      ['**EF3**', '136–165 mph', 'Severe damage'],
      ['**EF5**', '**Above 200 mph**', 'Strongest rating'],
      ['**F scale**', 'Used before Feb 1, 2007', 'The original Fujita scale'],
      ['**EF scale**', 'Since 2007', '==28 damage indicators== and degrees of damage'],
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'A strong tornado crosses only open fields and is rated EF0. Why might the rating be low?',
    options: [
      'Ratings come from damage, and there was little to damage',
      'Radar measured its winds as slow',
      'Tornadoes in fields are always weak',
      'The EF scale only rates tornadoes in cities',
    ],
    answer: 0,
    explanation:
      'Tornadoes are rated after the event from damage to indicators like homes and trees, not from measured winds.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Radar signatures',
    image: 'b-met-hook-echo',
    caption: 'A **hook echo**: rain wraps around the mesocyclone on the storm’s south side.',
    bullets: [
      'A **bow echo** marks damaging ==straight-line winds==.',
      'A **tornadic vortex signature (TVS)** is a very tight, strong velocity couplet between adjacent beams.',
      'A **debris ball** is a small, round high-reflectivity spot at the hook’s tip.',
      'A matching area of **low CC** ==confirms lofted debris==.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Does each radar signature point mainly to a tornado or to straight-line winds?',
    bins: ['Tornado', 'Straight-line winds'],
    items: [
      ['Hook echo', 0],
      ['Tornadic vortex signature', 0],
      ['Debris ball with low CC', 0],
      ['Bow echo', 1],
      ['Rear-inflow notch on a storm line', 1],
    ],
    explanation:
      'Hooks, TVSs and debris balls mark tornadoes; bow echoes and rear-inflow notches mark straight-line winds.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Downburst', back: 'A strong downdraft that spreads out on hitting the ground.' },
      { front: 'Derecho', back: 'A widespread, long-lived windstorm from a storm line.' },
      { front: 'EF scale', back: 'Rates tornadoes from damage, used since 2007.' },
      { front: 'TVS', back: 'A very tight, strong velocity couplet on radar.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Downburst damage spreads {0}, while tornado damage is {1}. Tornadoes are rated from {2}.',
    blanks: ['outward', 'convergent', 'damage'],
    distractors: ['upward', 'measured winds', 'straight'],
    explanation:
      'Downbursts blow outward; tornadoes pull debris inward; EF ratings come from damage surveys.',
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      '**Downbursts** spread outward; tornado damage is ==convergent and swirled==.',
      '**Derechos** run over 400 km; **bow echoes** mark their strongest winds.',
      'Tornadoes form when the updraft **tilts and tightens** shear-made spin.',
      '**EF ratings** come from damage; hook, TVS, debris ball and low CC build the radar case.',
    ],
  },
]);

const hurricanes = defineDeck('met-u7-l1', [
  {
    kind: 'title',
    title: 'Hurricanes, typhoons and cyclones',
    subtitle: 'How tropical cyclones form, how they are built, and why surge is so dangerous.',
    objectives: [
      'Describe tropical cyclone formation, life cycle and structure.',
      'Apply the Saffir–Simpson scale and explain storm surge.',
      'Explain how shear, ENSO and terrain affect tracks and strength.',
    ],
    image: 'b-met-katrina',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which hurricane hazard do you think has caused the most deaths?',
    options: ['Wind', 'Storm surge', 'Lightning', 'Hail'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Names and formation',
    bullets: [
      '**Hurricanes** (Atlantic, eastern Pacific), **typhoons** (western Pacific), **cyclones** (Indian Ocean).',
      'They need sea-surface temperatures of about ==26.5 °C or warmer== to a good depth.',
      'Also: **moist mid-levels**, **low wind shear**, a **starting disturbance**, and at least about **5° from the equator** for the Coriolis effect.',
      'Atlantic season: **June 1 to November 30**, peaking in September.',
    ],
  },
  {
    kind: 'multi',
    section: 0,
    prompt: 'Which conditions help a tropical cyclone form? Select all that apply.',
    options: [
      'Ocean water about 26.5 °C or warmer',
      'Low vertical wind shear',
      'A pre-existing disturbance such as a tropical wave',
      'A location right on the equator',
    ],
    answers: [0, 1, 2],
    explanation:
      'Warm water, low shear and a disturbance help; right on the equator the Coriolis effect is too weak to start rotation.',
  },
  {
    kind: 'flow',
    section: 1,
    title: 'Life cycle',
    steps: [
      { label: 'Invest', detail: 'A disturbance being **watched closely**.' },
      {
        label: 'Tropical depression',
        detail: 'Closed circulation, sustained winds **below 39 mph**.',
      },
      { label: 'Tropical storm', detail: '**39–73 mph**; the storm ==gets a name==.' },
      { label: 'Hurricane', detail: '**74 mph** or more; Category 3+ (**111 mph**) is ==major==.' },
      {
        label: 'Decay',
        detail: 'Weakens over cool water or land, or becomes **extratropical** with fronts.',
      },
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order these stages as a storm strengthens.',
    items: ['Invest', 'Tropical depression', 'Tropical storm', 'Hurricane', 'Major hurricane'],
    explanation:
      'Invest, then depression (< 39 mph), storm (39–73 mph, named), hurricane (74+), major (111+ mph).',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Structure',
    image: 'b-met-katrina',
    caption:
      'Hurricane Katrina: the clear **eye**, the thick **eyewall** around it, and ==spiral rain bands==.',
    bullets: [
      '**Eye**: calm, sinking air, often clear, with the ==lowest pressure==.',
      '**Eyewall**: a ring of tall storms with the **strongest winds** and heaviest rain.',
      '**Rain bands** spiral outward and can spawn tornadoes, especially in the **right-front quadrant**.',
      'Northern Hemisphere: air flows in **counterclockwise** near the surface and out clockwise at the top.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each part of a hurricane to its description.',
    pairs: [
      ['Eye', 'Calm center of sinking air with the lowest pressure'],
      ['Eyewall', 'Ring of tall storms with the strongest winds'],
      ['Rain bands', 'Spiral bands that can spawn tornadoes'],
    ],
    explanation: 'The eye is calm, the eyewall is the most violent ring, and bands spiral outward.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Saffir–Simpson Hurricane Wind Scale',
    columns: ['Category', 'Sustained wind', 'Class'],
    rows: [
      ['**1**', '74–95 mph', 'Hurricane'],
      ['**2**', '96–110 mph', 'Hurricane'],
      ['**3**', '111–129 mph', '==Major=='],
      ['**4**', '130–156 mph', '==Major=='],
      ['**5**', '157 mph or higher', '==Major=='],
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'What does the Saffir–Simpson category leave out?',
    options: [
      'Storm surge, rainfall and storm size',
      'Sustained wind speed',
      'Whether the storm is a hurricane',
      'Wind direction only',
    ],
    answer: 0,
    explanation:
      'The scale uses sustained wind only. A large, slow Category 1 can flood more than a compact Category 4.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt: 'A hurricane has sustained winds of 140 mph. What Saffir–Simpson category is it?',
    answer: 4,
    tolerance: 0,
    explanation: '140 mph falls in the 130–156 mph range: Category 4.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Storm surge',
    image: 'b-met-storm-surge',
    caption:
      '**Storm surge** is an abnormal rise of seawater pushed ashore, ==mainly by the hurricane’s winds==.',
    bullets: [
      'Low pressure adds a **smaller** part.',
      'Height depends on wind, size, forward speed, angle of approach and especially the **coast shape** and **shelf slope**.',
      '**Shallow, gently sloping** shelves and bays make ==higher surges==.',
      'Surge at **high tide** adds to the total; surge is historically the **deadliest** hurricane hazard.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: rate the storm and the surge',
    problem:
      'A hurricane with 140 mph sustained winds approaches a coast with a wide, shallow continental shelf at high tide.',
    steps: [
      '140 mph → **Category 4**, a major hurricane.',
      'A **shallow shelf** piles water higher.',
      '**High tide** adds to the total water level.',
    ],
    conclusion: 'A major hurricane with a ==very dangerous storm surge==.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Steering and intensity',
    bullets: [
      'Hurricanes are **steered** by surrounding winds, especially around the **subtropical high**.',
      'Atlantic storms often move **west** under the high, then ==curve north and northeast== around its western edge.',
      'Strong **wind shear** tilts and weakens hurricanes.',
      '**El Niño** raises Atlantic shear (fewer storms); **La Niña** lowers it (==more storms==).',
      'Mountainous islands disrupt circulations; very warm, deep water allows **rapid intensification**.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'During a strong El Niño year, what usually happens to Atlantic hurricane activity?',
    options: [
      'It decreases, because wind shear over the Atlantic increases',
      'It increases, because shear disappears',
      'It is unaffected',
      'Hurricanes move east instead of west',
    ],
    answer: 0,
    explanation: 'El Niño increases Atlantic shear, which tilts and weakens developing storms.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Eyewall', back: 'Ring of tall storms with the strongest winds.' },
      { front: 'Saffir–Simpson scale', back: 'Rates hurricanes 1–5 by sustained wind only.' },
      { front: 'Storm surge', back: 'Seawater pushed ashore mainly by hurricane winds.' },
      { front: 'Subtropical high', back: 'The high-pressure system that steers many hurricanes.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A hurricane needs ocean water of about {0} °C or warmer. The strongest winds are in the {1}. A shallow continental shelf makes the storm {2} higher.',
    blanks: ['26.5', 'eyewall', 'surge'],
    distractors: ['10', 'eye', 'pressure'],
    explanation:
      'Warm water fuels the storm, the eyewall holds the strongest winds, and shallow shelves pile up surge.',
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Needs **≥ 26.5 °C** water, moist air, low shear, a disturbance, and distance from the equator.',
      'Depression → **storm (named, 39 mph)** → **hurricane (74 mph)** → major (111 mph).',
      '**Saffir–Simpson** uses wind only; ==surge and rain== need separate judgment.',
      'Steered by the **subtropical high**; El Niño shear means fewer Atlantic storms.',
    ],
  },
]);

const precipitation = defineDeck('met-u8-l1', [
  {
    kind: 'title',
    title: 'Precipitation, floods, winter storms, drought and safety',
    subtitle: 'How precipitation forms, the hazards it brings, and how to stay safe.',
    objectives: [
      'Explain how rain, snow, sleet, freezing rain and hail form.',
      'Describe flood, winter storm, drought and heat wave hazards.',
      'Use NWS watches and warnings and analyze historic cases.',
    ],
    image: 'b-met-precip-types',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which winter precipitation do you think is the most dangerous on roads?',
    options: ['Snow', 'Sleet', 'Freezing rain', 'Cold rain'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Forming precipitation',
    bullets: [
      'Cloud droplets must grow about a ==million times in volume== to fall.',
      '**Warm clouds**: **collision–coalescence** merges droplets of different sizes.',
      '**Cold clouds**: the **Bergeron process**: ice crystals grow at the expense of supercooled droplets, because vapor pressure is ==lower over ice==.',
      '**Riming** freezes droplets onto ice (graupel); **aggregation** clumps crystals into snowflakes.',
      '**Hail** grows in strong updrafts that keep stones aloft while ice layers build.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each process to what it does.',
    pairs: [
      ['Collision–coalescence', 'Droplets merge in warm clouds'],
      ['Bergeron process', 'Ice crystals grow at the expense of supercooled droplets'],
      ['Riming', 'Supercooled droplets freeze onto ice, forming graupel'],
      ['Aggregation', 'Ice crystals clump into snowflakes'],
    ],
    explanation:
      'Warm clouds grow drops by merging; cold clouds grow ice by the Bergeron process, riming and aggregation.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Temperature layers and winter precipitation',
    image: 'b-met-precip-types',
    caption:
      'The **warm layer aloft** decides the type: as it thins, rain becomes ==freezing rain, then sleet, then snow==.',
    bullets: [
      '**Snow**: the whole column is below freezing.',
      '**Sleet**: snow melts in a warm layer, then ==refreezes into ice pellets== in a deep cold layer near the ground.',
      '**Freezing rain**: the cold surface layer is **too thin** to refreeze drops, so they ==freeze on contact==.',
      '**Freezing drizzle** comes from small drops in shallow clouds.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Reading a freezing-rain sounding',
    image: 'b-met-freezing-rain',
    caption:
      'A real freezing-rain sounding: the temperature line crosses ==above 0 °C aloft==, then drops below freezing in a **thin layer at the ground**.',
    bullets: [
      'Look for where the temperature line crosses **0 °C**.',
      'A warm layer aloft + a **thin** cold layer = freezing rain.',
      'A warm layer aloft + a **deep** cold layer = sleet.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'Below freezing from 3 km to the cloud top, +3 °C from 1.5 to 3 km, and −2 °C from the ground to 300 m. What reaches the ground?',
    options: ['Freezing rain', 'Snow', 'Sleet', 'Hail'],
    answer: 0,
    explanation:
      'Snow melts in the warm layer, and the 300 m cold layer is too thin to refreeze it, so supercooled drops freeze on contact.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Floods and their impacts',
    bullets: [
      '**Flash floods** rise within hours of intense rain, often from slow or ==repeating storms==.',
      '**River floods** build over days as water drains through large basins.',
      '**Urban floods**: pavement prevents infiltration.',
      'Heavy rain on steep or **burned slopes** can trigger mudslides and debris flows.',
      'A **100-year storm** has a ==1% chance in any year==, not exactly once every 100 years.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'A town had a 100-year flood last year. What is the chance of one this year?',
    options: [
      'About 1%, the same as any year',
      'Zero, since it just happened',
      '100%',
      'Exactly 50%',
    ],
    answer: 0,
    explanation: 'A 100-year event has a 1% chance each year; past events do not reset the odds.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Winter storms',
    bullets: [
      '**Blizzard**: winds or frequent gusts **≥ 35 mph** with blowing snow cutting visibility below **¼ mile** for ==3 hours or more==.',
      '**Nor’easters**: East Coast lows with strong northeast winds, heavy snow and coastal flooding.',
      '**Lake-effect** storms: narrow, intense snow bands downwind of the Great Lakes.',
      '**Ice storms** coat roads, trees and power lines; heavy snow loads can collapse roofs.',
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Which are required for an official blizzard? Select all that apply.',
    options: [
      'Winds or frequent gusts of at least 35 mph',
      'Visibility below a quarter mile in blowing snow',
      'Lasting three hours or more',
      'At least 2 feet of new snow',
    ],
    answers: [0, 1, 2],
    explanation:
      'A blizzard is defined by wind, visibility and duration, not by how much snow falls.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Drought and heat waves',
    columns: ['Type', 'What is short or extreme', 'Example sign'],
    rows: [
      ['**Meteorological drought**', 'Rainfall deficit', 'Months of below-normal rain'],
      ['**Agricultural drought**', 'Soil moisture and crops', 'Wilting crops'],
      ['**Hydrological drought**', 'Streams and reservoirs', 'Low reservoir levels'],
      ['**Heat wave**', 'Abnormally hot weather', '==Persistent ridge of high pressure=='],
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Which kind of drought does each observation show?',
    bins: ['Meteorological', 'Agricultural', 'Hydrological'],
    items: [
      ['Rainfall 40% below normal for six months', 0],
      ['Corn wilting from dry soil', 1],
      ['Reservoir at record low levels', 2],
      ['Stream flow far below average', 2],
    ],
    explanation:
      'Meteorological = rainfall, agricultural = soil and crops, hydrological = streams and reservoirs.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Watches, warnings and historic cases',
    bullets: [
      '**Watch**: conditions are ==favorable== — be prepared.',
      '**Warning**: the hazard is ==occurring or imminent== — act now.',
      'Tornado: **interior room, lowest floor**. Flash flood: **higher ground**, never drive through water. Lightning: **go indoors**.',
      'Historic cases: **Katrina (2005)**, the **Dust Bowl**, the **1993 Storm of the Century**, the **April 2011** outbreaks — analyze the data given.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'A tornado warning is issued for your county. What should you do?',
    options: [
      'Go to an interior room on the lowest floor now',
      'Wait to see if a watch is issued',
      'Drive to look at the storm',
      'Open the windows',
    ],
    answer: 0,
    explanation:
      'A warning means a tornado is occurring or imminent, so take shelter immediately in an interior room on the lowest floor.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Bergeron process', back: 'Ice crystals grow at the expense of supercooled drops.' },
      { front: 'Freezing rain', back: 'Supercooled drops that freeze on contact with the ground.' },
      { front: 'Flash flood', back: 'A flood that rises within hours of intense rain.' },
      { front: 'Warning', back: 'The hazard is occurring or imminent: act now.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Sleet refreezes in a {0} cold layer; freezing rain freezes on {1}. A watch means conditions are favorable; a {2} means act now.',
    blanks: ['deep', 'contact', 'warning'],
    distractors: ['thin', 'clouds', 'forecast'],
    explanation:
      'A deep cold layer refreezes drops into sleet; a thin one leaves supercooled drops that freeze on contact. Warnings mean take action.',
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Warm clouds: **collision–coalescence**; cold clouds: the ==Bergeron process==.',
      'Warm layer + **deep** cold layer = sleet; + **thin** cold layer = freezing rain.',
      'A **100-year** storm has a 1% chance each year; flash floods rise in hours.',
      '**Watch** = be prepared; **warning** = ==take action now==.',
    ],
  },
]);

export const meteorologyDecksStorms: Deck[] = [
  thunderstorms,
  windsAndTornadoes,
  hurricanes,
  precipitation,
];
