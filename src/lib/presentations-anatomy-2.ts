import { defineDeck, type Deck } from './presentation-types.ts';

// Anatomy and Physiology, units 3–4: respiratory physiology and respiratory disease.

const ventilation = defineDeck('anat-u3-l1', [
  {
    kind: 'title',
    title: 'Ventilation, volumes, and spirometry',
    subtitle: 'Measuring how much air moves, how fast, and how much of it reaches the alveoli.',
    objectives: [
      'Define tidal, reserve, and residual volumes and the capacities they build.',
      'Calculate minute ventilation and alveolar ventilation.',
      'Read obstructive and restrictive spirometry patterns.',
      'Explain dead space and ventilation-perfusion mismatch.',
    ],
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: two people move the same liters of air per minute. Do their alveoli get the same fresh air?',
    options: ['Yes, always', 'Not necessarily', 'Only if they are the same size', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Volumes and capacities',
    image: 'ap-lung-volumes',
    caption:
      'A spirogram: quiet tidal breaths, then maximal breaths in and out. **Capacities** are sums of **volumes**.',
    bullets: [
      'Tidal ≈ 500 mL, inspiratory reserve ≈ 3000, expiratory reserve ≈ 1100, residual ≈ 1200 mL.',
      '**Vital capacity = IRV + TV + ERV** (≈ 4500 mL); **TLC** adds residual volume (≈ 6000 mL).',
      '**FRC = ERV + RV**: the volume left at the end of a quiet breath out.',
      'Spirometry ==cannot measure residual volume==, so it cannot give FRC or TLC on its own.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each capacity to the volumes it adds up.',
    pairs: [
      ['Vital capacity', 'IRV + TV + ERV'],
      ['Functional residual capacity', 'ERV + RV'],
      ['Inspiratory capacity', 'TV + IRV'],
      ['Total lung capacity', 'All four volumes'],
    ],
    explanation:
      'Capacities combine volumes. Any capacity that includes residual volume needs a method other than simple spirometry.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Ventilation math',
    bullets: [
      '**Minute ventilation = tidal volume × rate**, normally 6–8 L/min.',
      '**Alveolar ventilation = (tidal volume − dead space) × rate**.',
      'Anatomical dead space is about 150 mL per breath.',
      '==Rapid, shallow breathing wastes ventilation== because dead space is a bigger share of each breath.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'Tidal volume is 500 mL, dead space is 150 mL, and the rate is 12 breaths/min. What is alveolar ventilation in L/min?',
    answer: 4.2,
    tolerance: 0.05,
    unit: 'L/min',
    explanation: '(500 − 150) × 12 = 4200 mL/min, which is 4.2 L/min.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Obstructive versus restrictive',
    image: 'ap-flow-volume',
    caption:
      'Flow-volume loops: obstruction gives a **scooped** expiratory curve; restriction gives a small, steep loop.',
    bullets: [
      'Obstruction lowers FEV1 more than FVC, so ==FEV1/FVC falls==.',
      'Restriction lowers both together, so the ratio is preserved or high.',
      'Obstructive: asthma, COPD. Restrictive: fibrosis, chest wall disease, neuromuscular weakness.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Which spirometry pattern fits each finding?',
    bins: ['Obstructive', 'Restrictive'],
    items: [
      ['FEV1/FVC of 0.55', 0],
      ['Small lungs with a normal FEV1/FVC', 1],
      ['Scooped expiratory flow-volume curve', 0],
      ['Pulmonary fibrosis', 1],
      ['Asthma attack', 0],
      ['Severe kyphoscoliosis', 1],
    ],
    explanation:
      'Obstruction limits how fast air leaves, lowering the ratio; restriction limits how much air fits, shrinking volumes.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Dead space and V/Q',
    bullets: [
      '**Anatomical** dead space: conducting airways. **Alveolar** dead space: ventilated but poorly perfused alveoli.',
      '**Physiological** dead space includes both.',
      'A **shunt-like** region gets blood without air; a **dead-space-like** region gets air without blood.',
      'A pulmonary embolism adds alveolar dead space, yet extra breathing can keep CO₂ normal or low.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Is each region shunt-like or dead-space-like?',
    bins: ['Shunt-like (blood, no air)', 'Dead-space-like (air, no blood)'],
    items: [
      ['Alveoli filled with pneumonia exudate', 0],
      ['Lung beyond a blocked pulmonary artery', 1],
      ['Collapsed alveoli still perfused', 0],
      ['The trachea and bronchi', 1],
    ],
    explanation:
      'Shunts send blood past unventilated alveoli; dead space ventilates air that never meets blood.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Control of breathing preview',
    bullets: [
      '**Central chemoreceptors** respond to CSF chemistry tied to arterial CO₂.',
      '**Peripheral chemoreceptors** respond to O₂, CO₂, and acidity.',
      'Breathing more than CO₂ production lowers PaCO₂; breathing less raises it.',
      'CO₂ changes in severe lung disease have ==several mechanisms==, not just “hypoxic drive”.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'CO₂ production stays steady while alveolar ventilation doubles. What happens to PaCO₂?',
    options: ['It falls', 'It rises', 'It stays the same', 'It drops to zero'],
    answer: 0,
    explanation:
      'Removing CO₂ faster than it is made lowers arterial CO₂. Roughly, doubling alveolar ventilation halves PaCO₂.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Building a spirogram',
    bullets: [
      'Quiet breaths oscillate around the **end-expiratory volume**.',
      'Check that every sum uses ==the same units and the same person==.',
      '**FEV1**: volume out in the first second. **FVC**: total forced volume out.',
      'A low FVC alone does not prove restriction: air trapping or poor effort can lower it. Restriction needs a low **TLC**.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt: 'ERV is 1100 mL and RV is 1200 mL. What is the functional residual capacity in mL?',
    answer: 2300,
    tolerance: 0,
    unit: 'mL',
    explanation: 'FRC = ERV + RV = 1100 + 1200 = 2300 mL.',
  },
  {
    kind: 'compare',
    section: 6,
    title: 'Ventilation, perfusion, and diffusion',
    columns: ['Process', 'What moves', 'Can fail when…'],
    rows: [
      ['Ventilation', 'Air into and out of alveoli', 'Airways narrow or breathing weakens'],
      ['Perfusion', 'Blood through pulmonary capillaries', 'A clot blocks a pulmonary artery'],
      ['Diffusion', 'Gas across the membrane', 'The membrane thickens or area is lost'],
    ],
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Each can fail on its own',
    bullets: [
      'A lung-wide average can hide regional mismatch.',
      'More breaths per minute means paying the ==dead-space cost more often==.',
      'Steady CO₂ production with less alveolar ventilation raises arterial CO₂.',
      'In exercise, both CO₂ production and ventilation rise.',
    ],
  },
  {
    kind: 'example',
    section: 6,
    title: 'Worked example: equal minute ventilation, unequal exchange',
    problem:
      'Person A breathes 500 mL twelve times a minute. Person B breathes 250 mL twenty-four times. Both have 150 mL of dead space.',
    steps: [
      'A: minute ventilation 500 × 12 = 6000 mL/min; alveolar (500 − 150) × 12 = 4200 mL/min.',
      'B: minute ventilation 250 × 24 = 6000 mL/min; alveolar (250 − 150) × 24 = 2400 mL/min.',
      'Both move 6.0 L/min, but fresh air to the alveoli is 4.2 versus 2.4 L/min.',
    ],
    conclusion: '==The breathing pattern matters== even when total minute ventilation is the same.',
  },
  {
    kind: 'numeric',
    section: 6,
    prompt:
      'Tidal volume is 250 mL, dead space is 150 mL, and the rate is 24 breaths/min. What is alveolar ventilation in mL/min?',
    answer: 2400,
    tolerance: 0,
    unit: 'mL/min',
    explanation: '(250 − 150) × 24 = 2400 mL/min.',
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Quality-check every calculation',
    bullets: [
      'Keep units consistent: all mL or all L until the final line.',
      'Tidal volume must be at least as large as dead space in the simple model.',
      '**FEV1/FVC = 0.75 means 75%**, not 0.75%.',
      'Show the ==equation, substitution, units, and a physiological explanation==.',
    ],
  },
  {
    kind: 'mcq',
    section: 7,
    prompt: 'FEV1 is 3.0 L and FVC is 4.0 L. How should the ratio be reported?',
    options: ['0.75, or 75%', '0.75%', '1.33', '7.5%'],
    answer: 0,
    explanation:
      '3.0 ÷ 4.0 = 0.75, which is 75%. Mixing fractions and percentages is a common error.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'FEV1/FVC', back: 'Ratio that separates obstructive from restrictive disease.' },
      { front: 'Alveolar ventilation', back: '(Tidal volume − dead space) × rate.' },
      { front: 'Anatomical dead space', back: 'Conducting-airway volume, about 150 mL.' },
      { front: 'Shunt', back: 'Perfusion without ventilation; hypoxemia resistant to O₂.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Capacities are sums of volumes; residual volume needs more than spirometry.',
      'Alveolar ventilation subtracts dead space before multiplying by rate.',
      '==Obstruction lowers FEV1/FVC; restriction lowers total lung capacity.==',
      'Ventilation, perfusion, and diffusion fail independently.',
    ],
  },
]);

const gasExchange = defineDeck('anat-u3-l2', [
  {
    kind: 'title',
    title: 'Gas exchange, hemoglobin, and pH control',
    subtitle:
      'How oxygen loads in the lungs, unloads in tissues, and how CO₂ ties breathing to pH.',
    objectives: [
      'Explain the oxygen-hemoglobin curve and cooperativity.',
      'Interpret Bohr, Haldane, temperature, and 2,3-BPG shifts.',
      'Describe CO₂ transport and the chloride shift.',
      'Link ventilation to acid-base balance.',
    ],
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: a person with anemia has 98% oxygen saturation. Is their blood carrying a normal amount of oxygen?',
    options: ['Yes', 'No', 'It depends', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Diffusion at the membrane',
    bullets: [
      '**Fick’s law**: diffusion rises with area and gradient and falls with thickness.',
      'Emphysema loses area; fibrosis adds thickness; anemia lowers carrying capacity.',
      'O₂ moves from alveolar ~100 mmHg to capillary ~40 mmHg; CO₂ moves the other way.',
      'Extra oxygen raises the gradient, helping ==diffusion-limited disease more than shunt==.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Does each change speed up or slow down gas diffusion across the membrane?',
    bins: ['Speeds up diffusion', 'Slows down diffusion'],
    items: [
      ['Breathing extra oxygen', 0],
      ['Pulmonary fibrosis', 1],
      ['Emphysema destroying alveolar walls', 1],
      ['Recruiting more capillaries during exercise', 0],
      ['Fluid in the interstitium (edema)', 1],
    ],
    explanation: 'More gradient or area speeds diffusion; lost area or a thicker barrier slows it.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Hemoglobin cooperativity',
    image: 'ap-oxygen-curve',
    caption:
      'The oxygen-hemoglobin curve is **sigmoidal**: each O₂ that binds makes the next one bind more easily.',
    bullets: [
      '**P50** is the PO₂ at 50% saturation, normally about 27 mmHg.',
      'A **left** shift loads easily but unloads poorly; a **right** shift unloads readily.',
      'Myoglobin has a hyperbolic, high-affinity curve; fetal hemoglobin binds tighter than adult.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Why can fetal hemoglobin pull oxygen across the placenta from the mother’s blood?',
    options: [
      'It has higher oxygen affinity',
      'It has lower oxygen affinity',
      'It binds CO₂ instead',
      'It has no cooperativity',
    ],
    answer: 0,
    explanation:
      'Fetal hemoglobin (two alpha, two gamma chains) binds O₂ more tightly, so its curve sits to the left of adult hemoglobin.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Shifts you must graph',
    bullets: [
      '**Right shift**: low pH, high CO₂, high temperature, high 2,3-BPG. This is the **Bohr effect**.',
      'Active muscle makes acid and heat, so ==hemoglobin releases more O₂ where it is needed==.',
      '**Left shift**: high pH, low CO₂, cold, low 2,3-BPG, fetal hemoglobin, carbon monoxide.',
      'Carbon monoxide lowers capacity and left-shifts what remains, so it is doubly dangerous.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Which way does each condition shift the oxygen-hemoglobin curve?',
    bins: ['Right shift (unloads more)', 'Left shift (holds on)'],
    items: [
      ['Exercising muscle at high temperature', 0],
      ['Carbon monoxide poisoning', 1],
      ['High 2,3-BPG after weeks at altitude', 0],
      ['Hypothermia', 1],
      ['Acidosis', 0],
      ['Fetal hemoglobin', 1],
    ],
    explanation:
      'Acid, CO₂, heat, and 2,3-BPG lower affinity and shift right; their opposites, fetal hemoglobin, and CO shift left.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'CO₂ transport and the chloride shift',
    image: 'ap-co2-transport',
    caption:
      'In red cells, **carbonic anhydrase** turns CO₂ and water into carbonic acid, which splits into bicarbonate and H⁺.',
    bullets: [
      'About **70%** of CO₂ travels as bicarbonate, **20%** bound to hemoglobin, **10%** dissolved.',
      'Bicarbonate leaves the red cell as chloride enters: the **chloride shift**.',
      'In the lungs the process ==runs in reverse== and CO₂ is exhaled.',
    ],
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Order CO₂’s path from a working tissue into plasma as bicarbonate.',
    items: [
      'CO₂ diffuses from the tissue into a red cell',
      'Carbonic anhydrase combines CO₂ with water',
      'Carbonic acid splits into H⁺ and bicarbonate',
      'Hemoglobin buffers the H⁺',
      'Bicarbonate exits as chloride enters',
    ],
    explanation:
      'Carbonic anhydrase makes carbonic acid, hemoglobin buffers the proton, and the chloride shift keeps charge balanced as bicarbonate leaves.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Ventilation and pH',
    bullets: [
      'PaCO₂ is the **respiratory acid**.',
      'Hyperventilation → **respiratory alkalosis**; hypoventilation → **respiratory acidosis**.',
      'Kidneys compensate over hours to days by keeping or excreting bicarbonate.',
      '==Always check which change came first.==',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each case to its acid-base disturbance.',
    pairs: [
      ['Early asthma attack with low PaCO₂', 'Respiratory alkalosis'],
      ['COPD flare with high PaCO₂ and low pH', 'Respiratory acidosis'],
      ['Prolonged vomiting', 'Metabolic alkalosis'],
      ['Severe diarrhea', 'Metabolic acidosis'],
    ],
    explanation:
      'Breathing fast blows off CO₂, retaining CO₂ acidifies, losing stomach acid alkalinizes, and losing intestinal bicarbonate acidifies.',
  },
  {
    kind: 'compare',
    section: 5,
    title: 'Four oxygen quantities',
    columns: ['Quantity', 'What it describes', 'Units'],
    rows: [
      ['Partial pressure (PO₂)', 'Tendency of dissolved O₂ to move', 'mmHg'],
      ['Saturation (SaO₂)', 'Fraction of hemoglobin sites filled', '%'],
      ['Content (CaO₂)', 'Total O₂ per volume of blood', 'mL O₂/dL'],
      ['Delivery (DO₂)', 'Content × blood flow', 'mL O₂/min'],
    ],
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Pressure, saturation, content, delivery',
    bullets: [
      '**CaO₂ ≈ 1.34 × Hb × SaO₂ + 0.003 × PaO₂**.',
      'Most oxygen is bound to hemoglobin; dissolved oxygen is a small extra.',
      'Anemia can show ==normal PO₂ and saturation but low content==.',
      'Delivery also depends on cardiac output, so a circulation problem cuts delivery even with good lungs.',
    ],
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: carrying capacity',
    problem:
      'Compare blood with hemoglobin 15 g/dL and 8 g/dL. Both are 98% saturated with PO₂ 100 mmHg.',
    steps: [
      'Sample 1: 1.34 × 15 × 0.98 = 19.7 mL/dL bound, plus 0.003 × 100 = 0.3 dissolved.',
      'Sample 1 total ≈ **20.0 mL/dL**.',
      'Sample 2: 1.34 × 8 × 0.98 + 0.3 ≈ **10.8 mL/dL**.',
    ],
    conclusion:
      'Both are 98% saturated, but the second carries ==only about 54% as much oxygen==. Saturation does not count binding sites.',
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'Hemoglobin is 10 g/dL, saturation is 1.00, and PaO₂ is 100 mmHg. Using CaO₂ ≈ 1.34 × Hb × SaO₂ + 0.003 × PaO₂, what is the content in mL/dL?',
    answer: 13.7,
    tolerance: 0.1,
    unit: 'mL/dL',
    explanation: '1.34 × 10 × 1.00 = 13.4, plus 0.003 × 100 = 0.3, giving 13.7 mL/dL.',
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'The curve meets the tissue',
    bullets: [
      'The **steep middle** of the curve lets a lot of O₂ unload as tissue PO₂ falls.',
      'The **flat top** keeps loading high over a range of alveolar conditions.',
      'A right shift raises P50; a left shift lowers it.',
      '**Haldane effect**: deoxygenated hemoglobin carries more CO₂ and H⁺. ==It complements the Bohr effect==.',
    ],
  },
  {
    kind: 'mcq',
    section: 6,
    prompt: 'A right shift of the oxygen-hemoglobin curve does what to P50?',
    options: ['Raises it', 'Lowers it', 'Leaves it unchanged', 'Sets it to zero'],
    answer: 0,
    explanation:
      'With lower affinity, a higher PO₂ is needed to reach 50% saturation, so P50 rises.',
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Use acid-base evidence carefully',
    bullets: [
      'pH below range is **acidemia**; above range is **alkalemia**.',
      'Find which change, CO₂ or bicarbonate, explains the pH direction before thinking about compensation.',
      'Compensation moves pH toward normal ==without removing the underlying problem==.',
      'A nearly normal pH can hide two opposing processes, so read CO₂ and bicarbonate together.',
    ],
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'P50', back: 'PO₂ at 50% saturation; a marker of affinity.' },
      { front: 'Bohr effect', back: 'Acid, CO₂, and heat shift the curve right to unload O₂.' },
      {
        front: 'Chloride shift',
        back: 'Cl⁻ in, HCO₃⁻ out, keeping the red cell electrically neutral.',
      },
      {
        front: '2,3-BPG',
        back: 'Glycolytic product that lowers affinity; rises in chronic hypoxia.',
      },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Most CO₂ travels as {0}. Low pH and high temperature shift the oxygen curve to the {1}, which {2} P50 and helps tissues unload oxygen.',
    blanks: ['bicarbonate', 'right', 'raises'],
    distractors: ['carbaminohemoglobin', 'left', 'lowers'],
    explanation:
      'About 70% of CO₂ is carried as bicarbonate; the Bohr effect is a right shift that raises P50.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Diffusion depends on area, gradient, and thickness.',
      'Right shifts unload O₂ in active tissue; left shifts hold on.',
      '==Pressure, saturation, content, and delivery are different quantities.==',
      'CO₂ is the respiratory acid; kidneys compensate slowly with bicarbonate.',
    ],
  },
]);

const obstructive = defineDeck('anat-u4-l1', [
  {
    kind: 'title',
    title: 'Obstructive disease: asthma, bronchitis, emphysema, COPD',
    subtitle: 'Why air goes in but struggles to get out, and how the mechanisms differ.',
    objectives: [
      'Contrast asthma, chronic bronchitis, and emphysema.',
      'Explain what bronchodilators and anti-inflammatories target.',
      'Read spirometry, imaging, and ABGs in obstructive disease.',
      'Recognize red flags in a severe attack.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: in obstructive lung disease, which is harder?',
    options: ['Breathing in', 'Breathing out', 'Both equally', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Asthma: reversible hyperreactivity',
    image: 'ap-asthma',
    caption:
      'An asthmatic airway narrows from **smooth-muscle spasm**, **swollen mucosa**, and **mucus plugs**.',
    bullets: [
      'Triggers: allergens, exercise, cold air, smoke, viral infections.',
      'Early phase: mast-cell histamine and leukotrienes. Late phase: eosinophils over hours.',
      'Low FEV1/FVC that ==improves after a bronchodilator==.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'Mid-attack, a patient’s PaCO₂ rises from low back to “normal” while they look more exhausted. What does that suggest?',
    options: [
      'Fatigue and impending respiratory failure',
      'The attack is resolving',
      'A lab error',
      'Metabolic alkalosis',
    ],
    answer: 0,
    explanation:
      'Early attacks blow off CO₂. A “normal” CO₂ in a tiring patient means ventilation is failing, a red flag.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'The COPD umbrella',
    image: 'ap-emphysema',
    caption:
      'A lung slice with centrilobular emphysema: holes where alveolar walls were destroyed, leaving **less exchange area** and **less elastic support**.',
    bullets: [
      '**Chronic bronchitis**: mucus hypersecretion and airway inflammation.',
      '**Emphysema**: destroyed alveolar walls and lost recoil, so ==air gets trapped on expiration==.',
      'Real presentations overlap; ignore appearance-based stereotypes.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Which process does each finding point to most?',
    bins: ['Asthma', 'Chronic bronchitis', 'Emphysema'],
    items: [
      ['Wheeze that reverses with albuterol', 0],
      ['Productive morning cough for months', 1],
      ['Low diffusion capacity and hyperinflation', 2],
      ['Eosinophils in sputum', 0],
      ['Frequent chest infections with mucus', 1],
      ['Loss of elastic recoil', 2],
    ],
    explanation:
      'Asthma is variable and eosinophilic, bronchitis is mucus-driven, and emphysema destroys area and recoil.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Drugs and devices',
    bullets: [
      '**Bronchodilators** relax airway smooth muscle.',
      '**Anti-inflammatories** target a different process: the inflamed airway.',
      'No bronchodilator ==rebuilds alveolar walls== already lost to emphysema.',
      'Oxygen raises inspired O₂ but does not restore recoil or clear an obstruction.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each treatment category to what it targets.',
    pairs: [
      ['Beta-2 agonist inhaler', 'Airway smooth-muscle contraction'],
      ['Inhaled corticosteroid', 'Airway inflammation'],
      ['Supplemental oxygen', 'Inspired oxygen availability'],
      ['Pursed-lip breathing', 'Small-airway collapse on expiration'],
    ],
    explanation: 'Each intervention targets one process. Say what it fixes and what it does not.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Imaging and labs',
    bullets: [
      'Emphysema X-ray: **flattened diaphragms**, hyperlucency, bullae.',
      'Chronic bronchitis: thickened bronchial markings.',
      'Ruptured blebs can cause **pneumothorax**.',
      'Emphysema ==lowers DLCO== (lost area); asthma DLCO is typically normal.',
      'Test for **alpha-1 antitrypsin** with early onset, family history, or lower-lobe disease.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'A 35-year-old nonsmoker has emphysema mostly at the lung bases. What should be tested?',
    options: ['Alpha-1 antitrypsin', 'Sweat chloride only', 'Thyroid hormone', 'Serum amylase'],
    answer: 0,
    explanation:
      'Alpha-1 antitrypsin protects alveolar walls from proteases. Deficiency causes early, lower-lobe emphysema.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Competition cases and red flags',
    bullets: [
      'Teen, night cough, exercise wheeze, FEV1/FVC 0.65 improving 15% → **asthma**.',
      'Older smoker, progressive breathlessness, low DLCO, hyperinflation → **emphysema**.',
      'Productive morning cough with frequent infections → **chronic bronchitis**.',
      'Red flags: cannot finish sentences, ==silent chest==, confusion, rising PaCO₂, sudden one-sided chest pain.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt:
      'Which findings in a severe asthma attack mean urgent escalation? Select all that apply.',
    options: [
      'A silent chest',
      'Unable to speak full sentences',
      'Confusion or drowsiness',
      'PaCO₂ rising toward normal',
      'Mild wheeze after running',
    ],
    answers: [0, 1, 2, 3],
    explanation:
      'A silent chest means almost no airflow; inability to talk, altered mentation, and normalizing CO₂ signal failure.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Compare mechanisms before labels',
    bullets: [
      'Narrowed airway: expiratory flow is limited, but ==the alveolar membrane may be intact==.',
      'Destroyed walls: less exchange area and less support for small airways.',
      'Emphysema combines **higher compliance** with **poor emptying**.',
      'A low diffusion capacity fits lost surface, but hemoglobin and other factors affect it too.',
    ],
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Evidence for obstruction and variability',
    bullets: [
      'Check spirometry for effort, full expiration, and repeatability.',
      'Bronchodilator reversibility is ==not a perfect divider== between asthma and COPD.',
      'Air trapping raises residual volume and flattens the diaphragm, weakening its pull.',
      'Separate **oxygenation** (V/Q matching) from **CO₂ removal** (alveolar ventilation).',
    ],
  },
  {
    kind: 'mcq',
    section: 6,
    prompt: 'Why does hyperinflation make breathing harder in COPD?',
    options: [
      'A flattened diaphragm generates pressure less effectively',
      'The lungs become smaller',
      'Air enters too quickly',
      'Surfactant production stops',
    ],
    answer: 0,
    explanation:
      'Trapped air flattens the diaphragm, changing the geometry through which it creates pressure, so the work of breathing rises.',
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Treatment categories teach physiology',
    bullets: [
      'Connect each intervention to ==the process it targets==, then name what it does not fix.',
      'Widening an airway does not regenerate alveoli.',
      'Oxygen does not remove a mucus plug or restore recoil.',
      'This is mechanism, not a personal treatment plan.',
    ],
  },
  {
    kind: 'example',
    section: 7,
    title: 'Worked example: paired datasets',
    problem:
      'Dataset A: variable wheeze, low expiratory ratio, preserved diffusion. Dataset B: persistent obstruction, high residual volume, low diffusion.',
    steps: [
      'Both show airflow limitation: the shared obstructive physiology.',
      'A: variable narrowing with intact exchange surface fits an **asthma-type** mechanism.',
      'B: air trapping plus low diffusion fits lost area and recoil, an **emphysema-type** mechanism.',
      'Patterns support mechanisms but are not a full diagnosis on their own.',
    ],
    conclusion:
      'Explain ==what changed in the airway or alveolus==, then use the disease name as a summary.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Reversibility',
        back: 'FEV1 improvement after a bronchodilator; typical of asthma.',
      },
      { front: 'Air trapping', back: 'Incomplete exhalation that raises residual volume.' },
      {
        front: 'Alpha-1 antitrypsin',
        back: 'Protease inhibitor; deficiency causes early emphysema.',
      },
      { front: 'Cor pulmonale', back: 'Right heart strain from chronic lung disease.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Asthma is variable airway narrowing from inflammation and spasm.',
      'Emphysema destroys area and recoil; chronic bronchitis is mucus and inflammation.',
      '==Bronchodilators widen airways but never rebuild alveoli.==',
      'A silent chest or normalizing CO₂ in a tiring patient is an emergency.',
    ],
  },
]);

const restriction = defineDeck('anat-u4-l2', [
  {
    kind: 'title',
    title: 'Infection and restriction: pneumonia, TB, fibrosis',
    subtitle: 'Filling, stiffening, and scarring: three ways lungs fail to exchange gas.',
    objectives: [
      'Classify pneumonia by setting and pattern.',
      'Explain TB granulomas and testing.',
      'Contrast restrictive physiology and imaging.',
      'Separate air-space filling, diffusion impairment, and restriction.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: on a chest X-ray, what color is air?',
    options: ['Black', 'White', 'Gray', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Pneumonia patterns',
    image: 'ap-pneumonia-xray',
    caption:
      'Lobar pneumonia: a white, consolidated region where **alveoli are filled** with inflammatory fluid instead of air.',
    bullets: [
      'Community-acquired: **Streptococcus pneumoniae** with lobar consolidation; atypicals give diffuse patterns.',
      'Hospital and ventilator-associated: MRSA, Pseudomonas, gram-negatives.',
      'Aspiration favors dependent lobes, often with anaerobes.',
      'Consolidation creates ==shunt physiology==: blood passes alveoli with no air.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each setting to its typical pneumonia pattern.',
    pairs: [
      ['Healthy adult in the community', 'Streptococcus pneumoniae, lobar consolidation'],
      ['Young adult with mild diffuse illness', 'Atypical organism such as Mycoplasma'],
      ['Patient on a ventilator', 'MRSA, Pseudomonas, gram-negatives'],
      ['After choking while unconscious', 'Aspiration into dependent lobes'],
    ],
    explanation:
      'Setting predicts organism and pattern. Aspiration follows gravity into dependent segments.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Tuberculosis essentials',
    image: 'ap-tb-xray',
    caption: 'Miliary TB: countless tiny nodules seeded through both lungs by spread in the blood.',
    bullets: [
      'Airborne spread; primary infection forms a **Ghon complex** with hilar nodes.',
      'Reactivation favors the **upper lobes**, where oxygen tension is highest, and can cavitate.',
      '**Caseating granulomas** with Langhans giant cells wall off the bacteria.',
      'Screen with **IGRA or PPD**; confirm with sputum AFB smear, nucleic acid test, and culture.',
      'Active TB needs ==airborne isolation and multidrug therapy==.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order the usual course of a TB infection that later reactivates.',
    items: [
      'Droplets are inhaled',
      'A Ghon focus forms with hilar node involvement',
      'Granulomas contain the infection',
      'The lesion heals or calcifies',
      'Weakened immunity allows apical reactivation',
    ],
    explanation:
      'Primary infection is usually contained by granulomas; reactivation favors the oxygen-rich apices when immunity falls.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Restrictive lung disease',
    image: 'ap-fibrosis-ct',
    caption:
      'Idiopathic pulmonary fibrosis on CT: **honeycombing** at the lung bases from scarred, stiff tissue.',
    bullets: [
      'Restriction ==lowers lung volumes with a preserved FEV1/FVC==.',
      'IPF: basal honeycombing, “Velcro” crackles, clubbing.',
      'Sarcoidosis: hilar lymph nodes and **noncaseating** granulomas.',
      'Chest wall (kyphoscoliosis, obesity) and neuromuscular causes restrict too.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Where does each restrictive cause act?',
    bins: ['Lung tissue (intrinsic)', 'Chest wall', 'Neuromuscular'],
    items: [
      ['Idiopathic pulmonary fibrosis', 0],
      ['Severe kyphoscoliosis', 1],
      ['Guillain-Barré syndrome', 2],
      ['Sarcoidosis', 0],
      ['Obesity hypoventilation', 1],
      ['Myasthenia gravis', 2],
    ],
    explanation:
      'All lower vital capacity and total lung capacity, but only intrinsic disease stiffens the lung itself.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Oxygen and ventilation decisions',
    bullets: [
      'A poorly ventilated but perfused region gives **low V/Q or shunt** physiology.',
      'A thickened membrane gives a **diffusion barrier**.',
      'More inspired O₂ helps ventilated units; ==blood through unventilated units cannot benefit==.',
      'This lesson models mechanism, not device settings.',
    ],
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Reading test images',
    image: 'ap-pneumothorax',
    bullets: [
      'Lobar consolidation **silhouettes** the borders next to it.',
      'Reticular markings: interstitial disease. Apical cavity: suggests TB. Basal honeycombing: fibrosis.',
      'Bat-wing edema suggests a cardiac cause rather than infection.',
      'Effusion: dull, absent breath sounds. Pneumothorax: ==hyperresonant==, absent sounds.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each image finding to its physiology.',
    pairs: [
      ['Lobar consolidation', 'Shunt: perfused alveoli without air'],
      ['Basal honeycombing', 'Diffusion barrier plus restriction'],
      ['Pleural effusion', 'Lung compressed by fluid outside it'],
      ['Pneumothorax', 'Air in the pleural space'],
    ],
    explanation:
      'Pair every image pattern with where the problem sits and what it does to gas exchange.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Filling, stiffness, or lost perfusion?',
    bullets: [
      'Pneumonia fills air spaces while blood keeps flowing.',
      'Fibrosis stiffens the interstitium and lengthens the diffusion path.',
      'Effusion and pneumothorax sit ==outside the lung==, in the pleural compartment.',
      'Begin each case by deciding: airway, air space, interstitium, or pleura?',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Where is the main abnormality in each condition?',
    bins: ['Air space', 'Interstitium', 'Pleural compartment'],
    items: [
      ['Lobar pneumonia', 0],
      ['Idiopathic pulmonary fibrosis', 1],
      ['Pleural effusion', 2],
      ['Pneumothorax', 2],
      ['Pulmonary edema filling alveoli', 0],
    ],
    explanation:
      'Pneumonia and alveolar edema fill air spaces, fibrosis thickens the interstitium, and effusion and pneumothorax sit in the pleural space.',
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Image appearance has a physical cause',
    bullets: [
      'Air is **radiolucent** (dark); fluid and tissue are **opaque** (white).',
      'An **air bronchogram** shows air-filled bronchi against consolidated tissue.',
      '**Silhouette sign**: a lost right heart border places an opacity near the right middle lobe.',
      'A white area is ==a pattern, not a microbiological diagnosis==.',
    ],
  },
  {
    kind: 'mcq',
    section: 6,
    prompt:
      'The right heart border disappears on a frontal chest X-ray. Where is the opacity most likely?',
    options: ['Right middle lobe', 'Left lower lobe', 'Right apex', 'Left upper lobe'],
    answer: 0,
    explanation:
      'The right middle lobe touches the right heart border, so dense tissue there erases that edge: the silhouette sign.',
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Shunt versus diffusion limitation',
    bullets: [
      'Extra oxygen raises the gradient in **ventilated** regions.',
      'A true shunt is ==relatively resistant to supplemental oxygen==.',
      'Real lungs mix many units between the two extremes.',
      'Name a model’s limits: a membrane model cannot represent a shunt.',
    ],
  },
  {
    kind: 'example',
    section: 7,
    title: 'Worked example: two causes of low oxygen',
    problem:
      'Case A has a focal air-space opacity with blood still flowing through it. Case B has diffuse interstitial thickening and a low total lung capacity.',
    steps: [
      'A: ventilation of perfused units is lost, giving low V/Q or shunt physiology.',
      'B: diffusion distance rises and compliance falls, a restrictive pattern.',
      'For B’s membrane: doubling thickness at the same area and gradient **halves transfer**.',
      'Do not apply that result to A, which needs a model of regional air and blood flow.',
    ],
    conclusion:
      'Both cause hypoxemia, but ==they differ in location, mechanics, and response to oxygen==.',
  },
  {
    kind: 'mcq',
    section: 7,
    prompt: 'Which patient’s low oxygen is most resistant to extra inspired oxygen?',
    options: [
      'A large region of perfused but unventilated lung',
      'A mildly thickened alveolar membrane',
      'Mild V/Q mismatch',
      'Breathing thin air at altitude',
    ],
    answer: 0,
    explanation:
      'Blood crossing alveoli that receive no air never meets the extra oxygen, so a true shunt responds poorly.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Ghon complex', back: 'Calcified TB focus plus a hilar lymph node.' },
      { front: 'Honeycombing', back: 'Cystic, scarred basal pattern in pulmonary fibrosis.' },
      { front: 'Egophony', back: '“E” heard as “A” over consolidated lung.' },
      { front: 'PEEP', back: 'Positive end-expiratory pressure that keeps alveoli open.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Pneumonia fills air spaces and creates shunt physiology.',
      'TB forms caseating granulomas and reactivates at the apices.',
      '==Restriction lowers volumes with a preserved FEV1/FVC.==',
      'Locate the problem (airway, air space, interstitium, or pleura) before naming it.',
    ],
  },
]);

export const anatomyDecksRespiratory: Deck[] = [ventilation, gasExchange, obstructive, restriction];
