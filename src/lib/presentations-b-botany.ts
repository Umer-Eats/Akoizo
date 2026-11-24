import { defineDeck, type Deck } from './presentation-types.ts';
import { decks as divisionCDecks } from './presentations-botany.ts';

// Botany (Division B) presentations. Nine Division B lessons are the Division C lessons word for
// word (same ids and sections), so they are taught by the decks in presentations-botany.ts. The
// photosynthesis lesson has its own Division B version, bot-u7-l1-b, taught by the deck below.

const photosynthesis = defineDeck('bot-u7-l1-b', [
  {
    kind: 'title',
    title: 'Photosynthesis and plant energy',
    subtitle:
      'How a plant turns light, water, and air into sugar, and why it still needs to respire.',
    objectives: [
      'Name the inputs and products of photosynthesis.',
      'Connect the light-dependent and carbon-fixing stages.',
      'Explain why plants respire day and night.',
      'Test one limiting factor at a time.',
    ],
    image: 'b-bot-photosynthesis',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: where does most of a tree’s mass come from?',
    options: ['The soil', 'Water', 'Carbon dioxide from the air', 'Sunlight'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Inputs and products',
    image: 'b-bot-photosynthesis',
    caption:
      '**Light energy** helps build **sugar** from **carbon dioxide** and **water**, and **oxygen** is released.',
    bullets: [
      'Chloroplasts contain **chlorophyll**, a pigment that absorbs light.',
      'Sugars supply both building material and chemical energy for growth.',
      'Plants do ==not get most of their dry mass from soil==: much of it is carbon taken from the air.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Is each one an input or a product of photosynthesis?',
    bins: ['Input', 'Product'],
    items: [
      ['Carbon dioxide', 0],
      ['Water', 0],
      ['Light energy', 0],
      ['Sugar', 1],
      ['Oxygen', 1],
    ],
    explanation: 'Light, carbon dioxide, and water go in; sugar and oxygen come out.',
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Where it happens',
    image: 'bot-leaf-tissue',
    bullets: [
      'Leaf cells packed with **chloroplasts** do most of the work.',
      'Carbon dioxide enters and oxygen leaves through **stomata** on the leaf surface.',
      'Water arrives from the roots through the **xylem**.',
    ],
    callout: '==Chlorophyll absorbs the light==; the chloroplast turns that energy into sugar.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'A seedling grows from 1 g to 50 g in moist soil, and the soil loses almost no mass. Where did most of the new dry mass come from?',
    options: [
      'Carbon dioxide from the air, built into sugars',
      'Minerals absorbed from the soil',
      'Sunlight turning into matter',
      'Oxygen absorbed through the leaves',
    ],
    answer: 0,
    explanation:
      'Photosynthesis builds carbon from CO₂ into sugars; soil minerals add only a small share of the mass.',
  },
  {
    kind: 'flow',
    section: 1,
    title: 'Two connected stages',
    steps: [
      {
        label: 'Light-dependent reactions',
        detail: 'Capture light energy and ==release oxygen from water==.',
      },
      { label: 'Energy passed on', detail: 'The captured energy is handed to the next stage.' },
      {
        label: 'Carbon-fixing reactions',
        detail: 'Use that energy to build **organic molecules** from carbon dioxide.',
      },
      { label: 'Sugar', detail: 'The product feeds growth and respiration.' },
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each stage to what it does.',
    pairs: [
      ['Light-dependent reactions', 'Capture light energy and release oxygen from water'],
      ['Carbon-fixing reactions', 'Build organic molecules from carbon dioxide'],
      ['Chlorophyll', 'Absorbs light'],
    ],
    explanation:
      'The light stage captures energy; the carbon-fixing stage spends it to make sugar from CO₂.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Learn the connection first',
    bullets: [
      'Know each stage’s **inputs, outputs, and link** before memorizing enzymes.',
      '**Carbon fixation** puts inorganic carbon (CO₂) into organic molecules.',
      '==Carbon fixation is not the same as taking up mineral nutrients== from soil.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'The oxygen released during photosynthesis comes from which molecule?',
    options: ['Water', 'Carbon dioxide', 'Sugar', 'Chlorophyll'],
    answer: 0,
    explanation: 'The light-dependent reactions split water and release its oxygen.',
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Plants also respire',
    columns: ['', 'Photosynthesis', 'Cellular respiration'],
    rows: [
      ['When', 'Only in the **light**', '==Day and night=='],
      ['Uses', 'CO₂, water, light', 'Sugar and oxygen'],
      ['Makes', 'Sugar and oxygen', 'Usable energy, CO₂, and water'],
    ],
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Net exchange',
    bullets: [
      'In the light, measured CO₂ uptake = **photosynthesis minus respiration**.',
      'In darkness, photosynthesis stops but **respiration continues**, so the plant releases CO₂.',
      'A plant is ==never only photosynthesizing==.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'What does a healthy leaf do in each condition?',
    bins: ['Takes in more CO₂ than it releases', 'Releases CO₂ overall'],
    items: [
      ['Bright sunlight', 0],
      ['Total darkness at night', 1],
      ['A dark closet for a day', 1],
      ['A sunny windowsill', 0],
    ],
    explanation:
      'With good light, photosynthesis outpaces respiration; in the dark only respiration runs.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Why does a plant in the dark give off carbon dioxide?',
    options: [
      'Respiration continues even when photosynthesis stops',
      'Photosynthesis runs backward in the dark',
      'The soil releases it through the roots',
      'Chlorophyll breaks down every night',
    ],
    answer: 0,
    explanation:
      'Cells respire day and night; without light there is no photosynthesis to offset it.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Test a limiting factor',
    bullets: [
      '**Light, carbon dioxide, temperature, and water** can each limit photosynthesis.',
      'Change ==one factor while holding the others steady==.',
      'When the rate **stops rising**, another factor has probably become limiting.',
      'Counting bubbles from an aquatic plant is only ==approximate==: bubble sizes and dissolved gases vary.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: read the bubble data',
    problem:
      'Low light: 5 bubbles/min. Medium light: 10 bubbles/min. High light: 10 bubbles/min. Temperature and CO₂ stay the same.',
    steps: [
      'Low to medium light: the rate **doubles**, so light was limiting.',
      'Medium to high light: the rate **stays at 10**, so more light no longer helps.',
      'Next, test another factor, such as CO₂, with the same method.',
    ],
    conclusion: 'At high light, ==another factor is limiting the rate==.',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'A rate rises from low to medium light, then stays flat from medium to high light. What is the best conclusion?',
    options: [
      'Another factor, such as CO₂, may now be limiting the rate',
      'Light has stopped reaching the plant',
      'The plant has stopped respiring',
      'Light is still the only limiting factor',
    ],
    answer: 0,
    explanation: 'A plateau means more light no longer helps, so something else limits the rate.',
  },
  {
    kind: 'multi',
    section: 3,
    prompt:
      'A student tests how light affects bubble rate. Which should stay the same in every trial? Choose all that apply.',
    options: [
      'Water temperature',
      'Amount of dissolved CO₂',
      'The same plant sprig',
      'Distance of the lamp',
    ],
    answers: [0, 1, 2],
    explanation:
      'The lamp distance is how light is changed (the independent variable); everything else stays fixed.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Chloroplast', back: 'Plant cell structure where photosynthesis occurs.' },
      { front: 'Chlorophyll', back: 'A pigment that absorbs light.' },
      { front: 'Carbon fixation', back: 'Building inorganic carbon into organic molecules.' },
      { front: 'Limiting factor', back: 'A condition that restricts the rate of a process.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Photosynthesis uses light to build {0} from carbon dioxide and water, releasing {1}. Plants also {2} day and night.',
    blanks: ['sugar', 'oxygen', 'respire'],
    distractors: ['soil', 'nitrogen', 'sleep'],
    explanation:
      'Sugar and oxygen are the products, and respiration never stops, even in the light.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '**CO₂ + water + light → sugar + oxygen**, in chloroplasts.',
      'Light reactions capture energy; carbon-fixing reactions build sugar.',
      '==Plants respire day and night==, so net uptake is photosynthesis minus respiration.',
      'Change one factor at a time; a plateau means another factor is limiting.',
    ],
  },
]);

export const decks: Deck[] = [
  ...divisionCDecks.filter((deck) => deck.lessonId !== 'bot-u7-l1'),
  photosynthesis,
];
