import { defineDeck, type Deck } from './presentation-types.ts';
import { anatomyDecksRespiratory } from './presentations-anatomy-2.ts';
import { anatomyDecksDigestive } from './presentations-anatomy-3.ts';
import { anatomyDecksImmune } from './presentations-anatomy-4.ts';
import { anatomyDecksApplied } from './presentations-anatomy-5.ts';

// Anatomy and Physiology (Division C) presentations. Each deck follows its lesson in
// lessons-anatomy.ts section by section (`section` is the lesson section index), and its
// activities rehearse the lesson's key terms, worked example, comparisons, and checkpoint ideas.

const language = defineDeck('anat-u1-l1', [
  {
    kind: 'title',
    title: 'Anatomical language, planes, and organization',
    subtitle: 'A shared map of the body, so every description means the same thing to everyone.',
    objectives: [
      'Use directional, regional, and sectional terms precisely.',
      'Identify sagittal, frontal, and transverse planes.',
      'Order the levels of organization from chemical to organism.',
      'Use body cavities and membranes to locate organs.',
    ],
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: on a front-view diagram of a person, where does the person’s right arm appear?',
    options: ['On my left', 'On my right', 'It depends on the diagram', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Anatomical position and directions',
    image: 'ap-directional-terms',
    caption:
      'Every direction assumes **anatomical position**: standing, feet parallel, arms at the sides, palms forward.',
    bullets: [
      '**Proximal** is closer to the trunk; **distal** is farther away.',
      '**Medial** is toward the midline; **lateral** is away from it.',
      'Anterior means ventral and posterior means dorsal in humans.',
      '==A direction is a relationship==, not an address: always name what you are comparing against.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Complete each comparison with the correct directional term.',
    pairs: [
      ['The elbow is ___ to the wrist', 'Proximal'],
      ['The sternum is ___ to the heart', 'Anterior'],
      ['The lungs are ___ to the heart', 'Lateral'],
      ['Skin is ___ to skeletal muscle', 'Superficial'],
    ],
    explanation:
      'The elbow is nearer the trunk, the sternum lies in front of the heart, the lungs sit to either side, and the skin is toward the surface.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Planes and sections',
    image: 'ap-body-planes',
    caption:
      'Sagittal planes divide left from right, frontal (coronal) planes divide front from back, and transverse planes divide top from bottom.',
    bullets: [
      'A **midsagittal** plane runs exactly through the midline.',
      'An organ **cross section** is perpendicular to that organ’s own long axis.',
      'Curving organs mean ==a transverse body slice is not always an organ cross section==.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Which plane makes each cut?',
    bins: ['Sagittal', 'Frontal (coronal)', 'Transverse'],
    items: [
      ['Separates the left eye from the right eye', 0],
      ['Separates the face from the back of the head', 1],
      ['Separates the chest from the abdomen', 2],
      ['Passes through the nose, navel, and spine', 0],
      ['Separates the toes’ tops from the heel’s bottom', 2],
      ['Separates the sternum from the vertebral column', 1],
    ],
    explanation:
      'Sagittal cuts split left and right, frontal cuts split front and back, and transverse cuts split upper and lower parts.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Body cavities and membranes',
    image: 'ap-body-cavities',
    caption:
      'The dorsal cavity holds the brain and spinal cord; the ventral cavity is split by the diaphragm into thoracic and abdominopelvic cavities.',
    bullets: [
      'The thorax holds two **pleural** cavities, the **pericardial** cavity, and the mediastinum between them.',
      '**Parietal** membranes line walls; **visceral** membranes cover organs; serous fluid reduces friction.',
      'Kidneys, pancreas, and much of the duodenum are **retroperitoneal**.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Is each organ wrapped in peritoneum, or behind it?',
    bins: ['Intraperitoneal', 'Retroperitoneal'],
    items: [
      ['Stomach', 0],
      ['Kidney', 1],
      ['Jejunum', 0],
      ['Pancreas (most of it)', 1],
      ['Transverse colon', 0],
      ['Much of the duodenum', 1],
    ],
    explanation:
      'Stomach, jejunum, and transverse colon are wrapped by visceral peritoneum; kidneys, most of the pancreas, and much of the duodenum lie behind the parietal peritoneum.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Levels of organization',
    image: 'ap-epithelium-types',
    bullets: [
      'Chemical → cellular → tissue → organ → organ system → organism.',
      'Four tissue classes: **epithelial**, **connective**, **muscle**, and **nervous**.',
      'Simple squamous for diffusion in alveoli; stratified squamous for protection in the esophagus.',
      'Pseudostratified ciliated columnar in airways; simple columnar with microvilli in the intestine.',
    ],
    callout: 'Blood is a connective tissue, even though it is fluid.',
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Order the levels of organization from smallest to largest.',
    items: ['Chemical', 'Cellular', 'Tissue', 'Organ', 'Organ system', 'Organism'],
    explanation:
      'Molecules build cells, cells build tissues, tissues combine into organs, organs work together as systems, and systems make an organism.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Competition traps',
    bullets: [
      'Watch **proximal versus superior** on the trunk, and **transverse versus cross section**.',
      'Learn the **nine abdominopelvic regions** and **four quadrants**: digestive and immune questions reuse them.',
      'Liver: right hypochondriac and epigastric. Appendix: right iliac. Spleen: left hypochondriac.',
      '==Pair each organ with cavity, peritoneum status, and quadrant== for fast recall.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each organ to the region where it mostly lies.',
    pairs: [
      ['Appendix', 'Right iliac region'],
      ['Spleen', 'Left hypochondriac region'],
      ['Liver', 'Right hypochondriac and epigastric regions'],
      ['Urinary bladder', 'Hypogastric (pubic) region'],
    ],
    explanation:
      'These region pairings come up repeatedly in digestive and immune questions, so learn them together.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Build a spatial description',
    bullets: [
      'Ask three questions: **whose perspective**, **which structures**, and **along which axis**?',
      'Right and left always belong to the person, so ==the person’s right appears on your left== in a front view.',
      'Label the person’s right and left, find the midline, then place the structure.',
      'A perpendicular cut through a tube shows a circle; an oblique cut shows an ellipse.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'A transverse body image shows one bowel loop as an ellipse. What is the best explanation?',
    options: [
      'The loop runs obliquely through the body plane',
      'The bowel must be diseased',
      'Every ellipse is a blood vessel',
      'Transverse images cannot show bowel',
    ],
    answer: 0,
    explanation:
      'The cut is not perpendicular to that loop’s local long axis, so its lumen looks elliptical. Body planes and organ sections are different reference frames.',
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Structure explains function',
    bullets: [
      'Epithelium sits on a **basement membrane**, with an apical side facing a lumen and a basal side facing connective tissue.',
      'A thin simple squamous layer ==shortens the distance a gas must cross== in an alveolus.',
      'Stratified squamous epithelium resists abrasion from a passing food bolus.',
      'Microvilli on columnar intestinal cells enlarge the absorptive surface.',
    ],
    callout:
      'Give a causal chain: name the feature, say how it changes a physical process, then connect that process to the organ’s job.',
  },
  {
    kind: 'match',
    section: 6,
    prompt: 'Match each epithelium to the job its structure suits.',
    pairs: [
      ['Simple squamous', 'Fast gas diffusion in alveoli'],
      ['Stratified squamous', 'Resisting abrasion in the esophagus'],
      ['Pseudostratified ciliated columnar', 'Moving mucus out of airways'],
      ['Simple columnar with microvilli', 'Absorbing nutrients in the intestine'],
    ],
    explanation:
      'Thin layers favor diffusion, many layers protect, cilia move mucus, and microvilli add absorptive area.',
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Potential spaces, not empty rooms',
    bullets: [
      'A serous cavity is a ==narrow, fluid-lubricated potential space== between visceral and parietal layers.',
      'The lung is covered by visceral pleura; it does not float in a large empty room.',
      '“Intraperitoneal” describes a relationship to peritoneum, not a position inside the fluid.',
      'On a diagram, name the organ surface, its membrane, the potential space, then the body-wall membrane.',
    ],
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: orient an unfamiliar section',
    problem:
      'A hollow tube has an abrasion-resistant lining, connective tissue, and thick muscle, and it lies posterior to the trachea. Is it the esophagus or an alveolus?',
    steps: [
      'Location: posterior to the trachea fits the esophagus; alveoli sit in lung tissue, not as a central tube.',
      'Lining: stratified squamous epithelium protects against food, while an alveolus needs a very thin exchange surface.',
      'Wall: thick muscle can propel a bolus; an alveolus has no peristaltic wall.',
    ],
    conclusion:
      'Several independent clues point to the **esophagus**. ==Shape alone is not enough==, because many structures look circular in cross section.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Anatomical position', back: 'Standard reference posture with palms forward.' },
      {
        front: 'Mediastinum',
        back: 'Central chest compartment with heart, thymus, trachea, and esophagus.',
      },
      { front: 'Serous membrane', back: 'Parietal plus visceral layers with lubricating fluid.' },
      { front: 'Retroperitoneal', back: 'Behind the parietal peritoneum, like the kidneys.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A {0} plane divides the body into left and right parts. The heart sits in the {1} between the lungs, inside a {2} cavity lined by serous membrane.',
    blanks: ['sagittal', 'mediastinum', 'pericardial'],
    distractors: ['transverse', 'peritoneum', 'pleural'],
    explanation:
      'Sagittal planes split left from right; the heart lies in the mediastinum within the pericardial cavity.',
  },
  {
    kind: 'open',
    prompt:
      'Why are thin alveolar epithelium and thick esophageal epithelium both “right” for their organs?',
    model:
      'A thin barrier shortens the diffusion distance for gases, while many protective layers resist abrasion from food. Each structure suits a different physical job.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Directions assume anatomical position and always compare two structures.',
      'Body planes and organ sections are different reference frames.',
      'Pair every organ with its cavity, peritoneum status, and region.',
      '==Explain tissues by the job their structure performs.==',
    ],
  },
]);

const homeostasis = defineDeck('anat-u1-l2', [
  {
    kind: 'title',
    title: 'Homeostasis, feedback, and gradients',
    subtitle: 'How the body senses change, corrects it, and moves materials down gradients.',
    objectives: [
      'Contrast negative and positive feedback with real examples.',
      'Predict responses to temperature, glucose, calcium, and pressure changes.',
      'Relate diffusion, osmosis, and active transport to homeostasis.',
      'Interpret a disrupted control loop.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what does “negative” mean in negative feedback?',
    options: [
      'The response opposes the change',
      'The outcome is harmful',
      'A hormone level falls',
      'Not sure yet',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Components of control',
    image: 'ap-negative-feedback',
    caption:
      'A **receptor** senses the change, a **control center** compares it to the set point, and an **effector** produces the correction.',
    bullets: [
      '**Negative feedback** reverses the initial change.',
      '**Positive feedback** amplifies it until a climax event ends the loop.',
      'Falling pressure: carotid **baroreceptors** → medulla → faster heart and vasoconstriction.',
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Order the glucose control loop after a meal.',
    items: [
      'Blood glucose rises',
      'Pancreatic beta cells detect the rise',
      'Insulin is released',
      'Liver and muscle take up glucose',
      'Blood glucose falls toward the set point',
    ],
    explanation:
      'The stimulus is detected, a signal is released, effectors respond, and the variable returns, which reduces the original stimulus.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Negative feedback loops to know',
    bullets: [
      '**Temperature**: the hypothalamus compares core temperature. Sweat and vasodilation shed heat; shivering and vasoconstriction keep it.',
      '**Calcium**: PTH raises blood calcium through bone, kidney, and vitamin D; calcitonin opposes it.',
      'Blood pressure, blood oxygen, and pH use medullary and chemoreceptor loops.',
      '==Label where the variable is sensed versus where it is corrected.==',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Does each response help the body lose heat or keep heat?',
    bins: ['Lose heat', 'Keep or make heat'],
    items: [
      ['Sweating', 0],
      ['Shivering', 1],
      ['Skin vasodilation', 0],
      ['Skin vasoconstriction', 1],
      ['Piloerection', 1],
    ],
    explanation:
      'Sweat and dilated skin vessels shed heat; shivering, constricted skin vessels, and piloerection conserve or produce it.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Blood calcium is high. What happens next?',
    options: ['More calcitonin, less PTH', 'More PTH', 'More ADH', 'More aldosterone'],
    answer: 0,
    explanation: 'Calcitonin lowers calcium, and PTH, which would raise it, is suppressed.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Positive feedback that matters',
    image: 'ap-positive-feedback',
    caption:
      'Childbirth: contractions stretch the cervix, stretch releases more oxytocin, and contractions strengthen until delivery ends the loop.',
    bullets: [
      'Clotting: activated platelets release ADP and thromboxane, recruiting more platelets.',
      'Action potentials: sodium entry opens more sodium channels.',
      'Positive feedback ==drives the system toward an endpoint==, not back to a set point.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Sort each loop by feedback type.',
    bins: ['Negative feedback', 'Positive feedback'],
    items: [
      ['Insulin lowering blood glucose', 0],
      ['Oxytocin during labor', 1],
      ['Baroreceptor reflex', 0],
      ['Platelet plug formation', 1],
      ['Shivering in the cold', 0],
      ['Sodium channels opening during an action potential', 1],
    ],
    explanation:
      'Negative loops oppose the change and stabilize; positive loops amplify it until a terminating event.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Membranes, gradients, and transport',
    bullets: [
      '**Diffusion** is net movement down a concentration gradient, as oxygen crosses the respiratory membrane.',
      '**Facilitated** transport uses proteins but still runs downhill.',
      '**Active** transport uses energy directly (primary) or another gradient (secondary).',
      '**Tonicity** depends on solutes that cannot cross, and it predicts changes in cell volume.',
    ],
    image: 'ap-tonicity',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'A red blood cell is placed in a hypertonic solution. What happens?',
    options: [
      'Water leaves and the cell shrinks',
      'Water enters and the cell swells',
      'Nothing moves',
      'Solutes rush in and the cell bursts',
    ],
    answer: 0,
    explanation:
      'A higher effective solute concentration outside draws water out of the cell, so it shrinks (crenates).',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'From molecule to test question',
    bullets: [
      'Dehydration: osmolarity rises → ADH → aquaporins → more water reabsorbed → concentrated urine and thirst.',
      'High altitude: low PO₂ → more ventilation → kidneys release **EPO** → more red cells over days.',
      'Case method: ==name the variable, set point, sensor, and effector==, then predict the next change.',
      'Know reference ranges: pH 7.35–7.45, PaCO₂ 35–45 mmHg, fasting glucose about 70–100 mg/dL.',
    ],
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Order the response to dehydration.',
    items: [
      'Plasma osmolarity rises',
      'ADH release increases',
      'Aquaporins insert in collecting ducts',
      'More water is reabsorbed',
      'Urine becomes more concentrated',
    ],
    explanation:
      'The osmolarity change triggers ADH, which adds water channels so the kidney keeps water and excretes concentrated urine.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Track the variable, not the hormone',
    bullets: [
      'A loop exists to stabilize a measurable variable, such as glucose, pressure, or temperature.',
      'A hormone is usually ==a signal inside the loop==, not the regulated variable.',
      'A set point is a reference, not a fixed number: meals, exercise, and circadian rhythm shift it.',
      'To find a defect, ask: was the change detected, was a signal made, and did the target respond?',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'A sensor detects a disturbance and the control signal rises, but the variable never recovers. Where should you look first?',
    options: ['The effector’s response', 'The receptor', 'The set point', 'Nothing is wrong'],
    answer: 0,
    explanation:
      'Detection and signaling worked, so check whether the effector responds and whether the disturbance exceeds its capacity.',
  },
  {
    kind: 'compare',
    section: 6,
    title: 'Ways materials move',
    columns: ['Process', 'Driving force', 'Example'],
    rows: [
      ['Simple diffusion', 'Concentration gradient', 'O₂ crossing the respiratory membrane'],
      [
        'Facilitated diffusion',
        'Gradient, through a channel or carrier',
        'Fructose uptake by enterocytes',
      ],
      ['Primary active transport', 'ATP used directly', 'Sodium-potassium pump'],
      ['Secondary active transport', 'Another ion’s gradient', '**Sodium-glucose cotransport**'],
      ['Bulk flow', 'Pressure difference', 'Blood moving through vessels'],
    ],
  },
  {
    kind: 'match',
    section: 6,
    prompt: 'Match each transport process to its energy source.',
    pairs: [
      ['Simple diffusion', 'No energy: down the gradient'],
      ['Sodium-potassium pump', 'ATP used directly'],
      ['Sodium-glucose cotransport', 'The sodium gradient'],
      ['Blood flow in arteries', 'A pressure difference'],
    ],
    explanation:
      'Secondary active transport depends on ATP only indirectly, because the pump maintains the sodium gradient it uses.',
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Stability and timing',
    bullets: [
      'Delayed signals or effectors can make a loop **overshoot** and oscillate.',
      '==Stronger correction is not automatically better== if it arrives late.',
      'Positive feedback needs a terminating event or limit.',
      '**Feedforward** responses begin before a disturbance fully develops.',
    ],
  },
  {
    kind: 'example',
    section: 7,
    title: 'Worked example: read a feedback trace',
    problem:
      'A variable starts 8 units above its reference, and each step corrects 25% of the remaining error. What is the error after two steps?',
    steps: [
      'Step one removes 0.25 × 8 = 2 units, leaving 6.',
      'Step two removes 0.25 × 6 = 1.5 units, leaving 4.5.',
      'Equivalently, **error = 8 × (1 − 0.25)² = 4.5**.',
    ],
    conclusion:
      'The correction shrinks as the error shrinks: ==it is a fraction of what remains==, not a fixed amount.',
  },
  {
    kind: 'numeric',
    section: 7,
    prompt:
      'An 8-unit deviation is corrected by 50% of the remaining error each step. How many units remain after three steps?',
    answer: 1,
    tolerance: 0,
    unit: 'units',
    explanation: '8 × 0.5³ = 8 × 0.125 = 1 unit remains.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Set point', back: 'Target value a control loop maintains.' },
      {
        front: 'Baroreceptor',
        back: 'Stretch receptor sensing blood pressure in the carotid and aorta.',
      },
      { front: 'Chemoreceptor', back: 'Sensor for CO₂, pH, and O₂ that drives ventilation.' },
      { front: 'Osmolarity', back: 'Solute concentration that determines water movement.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'In a control loop, the {0} senses change, the control center compares it to the {1}, and the {2} corrects it. Positive feedback instead {3} the change.',
    blanks: ['receptor', 'set point', 'effector', 'amplifies'],
    distractors: ['hormone', 'reverses', 'gradient'],
    explanation:
      'Receptor, control center, and effector make the loop; positive feedback amplifies until an endpoint.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Negative feedback opposes change in either direction; positive feedback amplifies toward an endpoint.',
      'Track the regulated variable; hormones are signals within the loop.',
      'Diffusion, facilitated, active, and bulk transport have different driving forces.',
      '==Localize a failure by sensor, signal, and effector.==',
    ],
  },
]);

const airways = defineDeck('anat-u2-l1', [
  {
    kind: 'title',
    title: 'Airways: from nose to bronchioles',
    subtitle:
      'The conducting zone warms, cleans, and distributes every breath before gas exchange.',
    objectives: [
      'Trace airflow through the conducting zone.',
      'Relate cartilage, smooth muscle, and epithelium to function.',
      'Explain mucociliary clearance and airway resistance.',
      'Predict where aspirated objects lodge.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: a child inhales a peanut. Which lung is it more likely to enter?',
    options: ['Right', 'Left', 'Equally likely', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Upper airway and filtration',
    image: 'ap-respiratory-organs',
    caption:
      'Air passes the nasal cavity, pharynx, and larynx before the trachea divides into bronchi.',
    bullets: [
      '**Turbinates** make air turbulent, warming it and humidifying it toward 100%.',
      'Pharynx: nasopharynx, oropharynx shared with food, and laryngopharynx.',
      'The **cricoid** is the only complete cartilage ring; the thyroid cartilage forms the laryngeal prominence.',
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Order the path of inhaled air.',
    items: [
      'Nasal cavity',
      'Pharynx',
      'Larynx',
      'Trachea',
      'Main bronchus',
      'Lobar bronchus',
      'Bronchiole',
    ],
    explanation:
      'Air moves from the nose through the pharynx and larynx into the trachea, then down progressively smaller branches.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Trachea and bronchial tree',
    image: 'ap-bronchial-tree',
    caption:
      'The trachea divides at the **carina** (about T4–T5) into the right and left main bronchi.',
    bullets: [
      '16–20 C-shaped cartilages, with **trachealis** smooth muscle behind so the esophagus can expand.',
      'The right main bronchus is ==wider, shorter, and more vertical==, so aspirated objects favor the right.',
      'Bronchi have cartilage plates; bronchioles lose cartilage and gain smooth muscle.',
      'Terminal bronchioles end the conducting zone; respiratory bronchioles begin gas exchange.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Why do aspirated objects more often lodge in the right main bronchus?',
    options: [
      'It is wider, shorter, and more vertical',
      'It has no cartilage',
      'The left lung is larger',
      'It has no cilia',
    ],
    answer: 0,
    explanation:
      'Its geometry makes it a more direct continuation of the trachea. That creates a tendency, not a guarantee.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Epithelium and clearance',
    image: 'ap-respiratory-epithelium',
    bullets: [
      'Pseudostratified ciliated columnar epithelium, with **goblet cells** and submucosal glands making mucus.',
      'Cilia beat upward at 10–20 Hz, moving mucus to the pharynx: the **mucociliary escalator**.',
      'Smoking paralyzes cilia and causes goblet-cell hyperplasia, producing a chronic cough.',
      'Cystic fibrosis thickens mucus through defective chloride transport, crippling clearance.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each airway cell to its role.',
    pairs: [
      ['Goblet cell', 'Secretes mucus that traps particles'],
      ['Ciliated cell', 'Moves the mucus blanket toward the pharynx'],
      ['Club cell', 'Secretes protective proteins and detoxifies in bronchioles'],
      ['Alveolar macrophage', 'Ingests particles in distal air spaces'],
    ],
    explanation:
      'Mucus traps, cilia transport, club cells protect small airways, and macrophages clean the alveoli where mucus would block diffusion.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Blood supply and nerves',
    bullets: [
      '**Bronchial arteries** from the aorta feed the airway walls with oxygenated blood.',
      '**Pulmonary arteries** carry deoxygenated blood to the alveoli for exchange.',
      'Bronchial veins drain partly into pulmonary veins: a small normal **anatomical shunt**.',
      'Vagal (parasympathetic) fibers constrict; ==sympathetic beta-2 signals dilate==, the target of albuterol.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Does each signal narrow or widen the bronchioles?',
    bins: ['Narrows (bronchoconstriction)', 'Widens (bronchodilation)'],
    items: [
      ['Vagal parasympathetic output', 0],
      ['Beta-2 adrenergic activation', 1],
      ['Histamine during an allergic attack', 0],
      ['Albuterol inhaler', 1],
    ],
    explanation:
      'Parasympathetic and inflammatory signals constrict airway smooth muscle; beta-2 stimulation relaxes it.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'High-yield clinical links',
    bullets: [
      '**Croup**: barking cough from subglottic swelling in children.',
      '**Epiglottitis**: drooling and tripod posture; an airway emergency.',
      'Foreign body: one-sided wheeze, more often on the right.',
      'The right lung has 3 lobes and 10 segments; the left has 2 lobes, a **lingula**, and a variable segment count.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'A child is drooling, leaning forward on their hands, and struggling to breathe. Which condition fits?',
    options: ['Epiglottitis', 'Croup', 'Mild asthma', 'A common cold'],
    answer: 0,
    explanation:
      'Drooling and tripod posture point to epiglottitis, a supraglottic airway emergency. Croup gives a barking cough.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Following a particle through the tree',
    bullets: [
      'Air in the conducting zone ==does not exchange gas== with blood.',
      'Each branch is narrower, but **total cross-sectional area** rises greatly, so airflow slows.',
      'Many small airways work in parallel, so the smallest single airway is not the biggest total resistance.',
      'Cartilage holds large airways open; smooth muscle changes the caliber of small ones.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'As airways branch deeper into the lung, what happens to total cross-sectional area?',
    options: ['It rises greatly', 'It falls', 'It stays the same', 'It drops to zero'],
    answer: 0,
    explanation:
      'Each branch is narrower, but there are so many in parallel that total area rises and average air speed falls.',
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Clearance as a coordinated defense',
    bullets: [
      'Mucus traps, cilia transport, and cough adds a fast burst for larger secretions.',
      'Alveoli rely on macrophages because ==thick mucus would block diffusion==.',
      'Too much mucus can obstruct even with working cilia; weak cilia leave normal mucus in place.',
      'In a pseudostratified layer, every cell touches the basement membrane, but not all reach the lumen.',
    ],
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'The radius relationship',
    bullets: [
      'In a rigid tube with laminar flow, **resistance ∝ 1 ⁄ r⁴**.',
      'Halving the radius raises resistance ==sixteenfold== and cuts flow to one-sixteenth.',
      'Real airways branch, deform, change with lung volume, and can be turbulent.',
      'Name the direction of change and why the model only approximates a living airway.',
    ],
  },
  {
    kind: 'example',
    section: 7,
    title: 'Worked example: two simplified airways',
    problem:
      'Tube B has 80% of tube A’s radius. Length, viscosity, and driving pressure are the same. Compare their resistance and flow.',
    steps: [
      'The radius ratio is 0.80.',
      'Relative resistance is **1 ⁄ 0.80⁴ ≈ 2.44**, more than double.',
      'Relative flow is **0.80⁴ ≈ 0.41** at the same pressure.',
      'This assumes one rigid tube with laminar flow, not a whole branching lung.',
    ],
    conclusion:
      'A 20% narrowing ==more than halves the flow==. Breathing harder can compensate only with more driving pressure.',
  },
  {
    kind: 'numeric',
    section: 7,
    prompt:
      'In the simple model, an airway’s radius is halved. By what factor does its resistance increase?',
    answer: 16,
    tolerance: 0,
    unit: '×',
    explanation: 'Resistance scales with 1 ⁄ r⁴, so (1 ⁄ 0.5)⁴ = 2⁴ = 16.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Carina', back: 'Ridge where the trachea divides; a sensitive cough trigger.' },
      { front: 'Mucociliary escalator', back: 'Cilia moving mucus up to the pharynx.' },
      {
        front: 'Trachealis',
        back: 'Posterior tracheal smooth muscle that lets the esophagus bulge.',
      },
      {
        front: 'Anatomical shunt',
        back: 'Bronchial venous drainage that slightly lowers systemic O₂.',
      },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'The conducting zone ends at the {0} bronchioles. Bronchioles lack {1} but have smooth muscle, and {2} stimulation relaxes that muscle to widen the airway.',
    blanks: ['terminal', 'cartilage', 'beta-2'],
    distractors: ['respiratory', 'cilia', 'vagal'],
    explanation:
      'Terminal bronchioles end conduction; cartilage disappears in bronchioles; beta-2 signals dilate them.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'The conducting zone warms, humidifies, filters, and distributes air but does not exchange gas.',
      'Cartilage supports large airways; smooth muscle controls small ones.',
      'Mucus, cilia, cough, and macrophages clear particles at different depths.',
      '==Small radius changes cause large resistance changes.==',
    ],
  },
]);

const lungs = defineDeck('anat-u2-l2', [
  {
    kind: 'title',
    title: 'Lungs, alveoli, pleura, and breathing muscles',
    subtitle: 'How a thin membrane, a sealed pleural space, and muscle move air in and out.',
    objectives: [
      'Describe lobes, fissures, segments, and pleural layers.',
      'Explain alveolar structure and surfactant.',
      'Identify breathing muscles and the pressures they create.',
      'Interpret pneumothorax and pleural effusion findings.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what actually pulls air into your lungs?',
    options: [
      'The lungs suck it in on their own',
      'Chest expansion lowers pressure inside',
      'Air pressure pushes the lungs open from inside',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Lobes and surfaces',
    image: 'ap-lung-lobes',
    bullets: [
      'Right lung: **upper, middle, and lower** lobes, with horizontal and oblique fissures.',
      'Left lung: **upper and lower** lobes, an oblique fissure, a cardiac notch, and a lingula.',
      'The **hilum** admits bronchi, vessels, and nerves; the apex rises above the clavicle.',
      'Bronchopulmonary segments are surgical units with their own bronchus and vessels.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Which lung has each feature?',
    bins: ['Right lung', 'Left lung'],
    items: [
      ['Three lobes', 0],
      ['Cardiac notch', 1],
      ['Horizontal fissure', 0],
      ['Lingula', 1],
      ['Middle lobe', 0],
    ],
    explanation:
      'The right lung has three lobes and a horizontal fissure; the left makes room for the heart with a cardiac notch and lingula.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Alveoli and the exchange membrane',
    image: 'ap-alveoli',
    caption:
      'About 300 million alveoli give roughly 70 m² of exchange surface, wrapped in capillaries.',
    bullets: [
      '**Type I** cells are thin diffusion cells; **type II** cells make surfactant and repair the lining.',
      'The membrane is epithelium, fused basal lamina, and endothelium, often under 0.5 µm thick.',
      '**Surfactant** lowers surface tension and ==keeps small alveoli from collapsing==.',
      'Premature infants without surfactant develop respiratory distress syndrome.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each alveolar cell to its job.',
    pairs: [
      ['Type I pneumocyte', 'Forms the thin gas-exchange surface'],
      ['Type II pneumocyte', 'Secretes surfactant and repairs the lining'],
      ['Alveolar macrophage', 'Clears debris and microbes'],
      ['Capillary endothelium', 'Lines the blood side of the membrane'],
    ],
    explanation:
      'Type I cells cover most of the surface, type II cells make surfactant, and macrophages patrol where mucus cannot.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Pleura and pressures',
    bullets: [
      '**Visceral** pleura covers the lung; **parietal** pleura lines the chest wall, diaphragm, and mediastinum.',
      'A thin fluid film at about −4 mmHg ==couples the lung to the chest wall==.',
      '**Pneumothorax** lets air into the pleural space and the lung collapses.',
      'Effusion and hemothorax blunt the costophrenic angles; pleuritic pain worsens with breathing.',
    ],
    image: 'ap-pleura',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Air enters the pleural space after a chest wound. What happens to that lung?',
    options: [
      'It collapses because the pressure coupling is lost',
      'It overinflates',
      'It is unaffected',
      'It fills with blood',
    ],
    answer: 0,
    explanation:
      'The negative pleural pressure that held the lung against the chest wall is lost, so elastic recoil collapses the lung.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Muscles and mechanics',
    bullets: [
      'Quiet inspiration: **diaphragm** and **external intercostals** enlarge the chest.',
      'Forced inspiration adds the scalenes, sternocleidomastoid, and pectoralis minor.',
      'Quiet expiration is **passive elastic recoil**; forced expiration uses abdominals and internal intercostals.',
      '**Boyle’s law**: larger thoracic volume lowers alveolar pressure, so air flows in.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'When is each muscle used?',
    bins: ['Quiet inspiration', 'Forced inspiration', 'Forced expiration'],
    items: [
      ['Diaphragm', 0],
      ['External intercostals', 0],
      ['Scalenes', 1],
      ['Sternocleidomastoid', 1],
      ['Internal intercostals', 2],
      ['Abdominal muscles', 2],
    ],
    explanation:
      'Quiet breathing in uses the diaphragm and external intercostals, forced breathing in adds neck muscles, and forced breathing out uses abdominals and internal intercostals.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Practice with diagrams',
    bullets: [
      'Sketch an alveolus and capillary; label type I, type II, macrophage, and capillary.',
      'Trace an oxygen molecule from air to blood.',
      'Adding thickness or removing area ==slows gas transfer==.',
      'At the end of inspiration, alveolar pressure can equal atmospheric while the lung stays expanded.',
    ],
  },
  {
    kind: 'compare',
    section: 5,
    title: 'Keep three pressures separate',
    columns: ['Pressure', 'Where', 'What it controls'],
    rows: [
      ['Atmospheric', 'Outside the chest', 'The reference for airflow'],
      [
        'Alveolar',
        'Gas inside the air spaces',
        '**Airflow** depends on atmospheric minus alveolar',
      ],
      [
        'Intrapleural',
        'Thin pleural compartment',
        'Combines with alveolar to set **lung expansion**',
      ],
    ],
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Airflow versus expansion',
    bullets: [
      '**Transpulmonary pressure = alveolar − intrapleural**; it holds the lung open.',
      'At the end of quiet inspiration ==airflow stops==, but the lung stays expanded.',
      'Inspiration: muscle contraction → chest enlarges → alveolar pressure dips → air flows in.',
      'A small pneumothorax does not always shift the trachea; that depends on size and pressure.',
    ],
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: separate airflow from expansion',
    problem:
      'Instant 1: alveolar pressure 0 and pleural −7 cm H₂O. Instant 2: alveolar −1 and pleural −6 cm H₂O.',
    steps: [
      'Instant 1: alveolar equals atmospheric, so no air flows at that moment.',
      'Instant 1: **transpulmonary = 0 − (−7) = 7 cm H₂O**, so the lung stays expanded.',
      'Instant 2: alveolar is below atmospheric, so air flows in.',
      'Instant 2: **transpulmonary = −1 − (−6) = 5 cm H₂O**.',
    ],
    conclusion:
      '==Airflow and expansion answer different questions.== Always name the two compartments.',
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'Alveolar pressure is −2 cm H₂O and intrapleural pressure is −8 cm H₂O. What is the transpulmonary pressure?',
    answer: 6,
    tolerance: 0,
    unit: 'cm H₂O',
    explanation: 'Transpulmonary pressure is alveolar minus intrapleural: −2 − (−8) = 6 cm H₂O.',
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Surface tension, compliance, and recoil',
    bullets: [
      '**Compliance** = change in volume ÷ change in distending pressure.',
      '**Emphysema** raises compliance but destroys recoil; **fibrosis** lowers compliance.',
      '==Easy inflation does not mean effective ventilation.==',
      'Smaller alveoli need more pressure to resist surface tension, so surfactant matters most there.',
    ],
  },
  {
    kind: 'sort',
    section: 6,
    prompt: 'How does each condition change lung compliance?',
    bins: ['Raises compliance', 'Lowers compliance'],
    items: [
      ['Emphysema', 0],
      ['Pulmonary fibrosis', 1],
      ['Surfactant deficiency', 1],
      ['Loss of elastic fibers', 0],
    ],
    explanation:
      'Losing elastic tissue makes the lung easy to inflate; stiff tissue or high surface tension makes it harder.',
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Read a diagram compartment by compartment',
    bullets: [
      'Oxygen crosses the alveolar lining, basement membrane, endothelium, plasma, and red-cell membrane.',
      'A label on the alveolar lumen is not blood; a macrophage is not a surfactant cell.',
      'Find apex, base, fissures, hilum, and diaphragm before naming lobes.',
      'The lingula belongs to the **left upper lobe**.',
    ],
  },
  {
    kind: 'order',
    section: 7,
    prompt: 'Order what an oxygen molecule crosses on its way from the alveolus to hemoglobin.',
    items: [
      'Alveolar epithelium',
      'Fused basement membrane',
      'Capillary endothelium',
      'Plasma',
      'Red blood cell membrane',
    ],
    explanation:
      'Oxygen crosses the epithelium, shared basement membrane, and endothelium, then plasma and the red-cell membrane before binding.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Surfactant', back: 'Type II cell secretion that lowers alveolar surface tension.' },
      { front: 'Hilum', back: 'Medial entry for bronchus, vessels, and nerves.' },
      { front: 'Compliance', back: 'Volume change per pressure change; distensibility.' },
      {
        front: 'Tension pneumothorax',
        back: 'One-way air leak with mediastinal shift; an emergency.',
      },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Thin type I cells and huge surface area make alveoli efficient exchangers.',
      'Surfactant stabilizes small alveoli; pleural coupling keeps lungs expanded.',
      '==Airflow follows atmospheric minus alveolar; expansion follows transpulmonary pressure.==',
      'Compliance and recoil are different: emphysema inflates easily but empties poorly.',
    ],
  },
]);

export const anatomyDecks: Deck[] = [
  language,
  homeostasis,
  airways,
  lungs,
  ...anatomyDecksRespiratory,
  ...anatomyDecksDigestive,
  ...anatomyDecksImmune,
  ...anatomyDecksApplied,
];
