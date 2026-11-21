import { defineDeck, type Deck } from './presentation-types.ts';

// Anatomy and Physiology, units 9–10: immune pathophysiology and real-world application.

const deficiency = defineDeck('anat-u9-l1', [
  {
    kind: 'title',
    title: 'Immunodeficiency: HIV, SCID, and CVID',
    subtitle:
      'What happens when a part of the immune system is missing, and how to tell which part.',
    objectives: [
      'Explain HIV entry, testing, and treatment.',
      'Contrast SCID and CVID presentations.',
      'Apply vaccine and prophylaxis rules.',
      'Interpret CD4 counts and viral loads.',
    ],
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: why does losing one cell type, CD4 helper T cells, weaken so much of immunity?',
    options: [
      'They coordinate many other immune cells',
      'They make all the antibodies',
      'They are the only white cells',
      'Not sure yet',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'HIV biology',
    image: 'ap-hiv',
    caption:
      'HIV: an RNA genome and reverse transcriptase inside a capsid, with gp120 envelope proteins that bind CD4.',
    bullets: [
      'Binds **CD4** plus **CCR5 or CXCR4**, fuses, reverse-transcribes, integrates, and buds.',
      'Acute infection: a mono-like illness with high virus levels; then a long latent phase.',
      '**AIDS**: CD4 under 200 or an opportunistic illness.',
      'Infections ==track the CD4 count==: Pneumocystis under 200, toxoplasmosis under 100, MAC and CMV under 50.',
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Order the HIV replication cycle.',
    items: [
      'gp120 binds CD4 and a coreceptor',
      'The viral envelope fuses with the cell',
      'Reverse transcriptase copies RNA into DNA',
      'Integrase inserts the DNA into the host genome',
      'New virions assemble and bud off',
    ],
    explanation:
      'Each step is a drug target: entry inhibitors, reverse transcriptase inhibitors, integrase inhibitors, protease inhibitors.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Testing and treatment',
    bullets: [
      '**Fourth-generation** tests detect p24 antigen plus antibodies; RNA tests catch the window period.',
      '**Combination ART** blocks replication and resistance.',
      '**U=U**: an undetectable viral load means ==untransmittable==.',
      '**PEP** within 72 hours after exposure; TMP-SMX protects against Pneumocystis when CD4 is low.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each HIV test to what it detects.',
    pairs: [
      ['Fourth-generation combination test', 'p24 antigen plus HIV antibodies'],
      ['HIV RNA (viral load) test', 'Viral genetic material in blood'],
      ['CD4 count', 'Number of helper T cells'],
    ],
    explanation:
      'Each test measures a different target, so timing after exposure changes what a result means.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'SCID emergencies',
    bullets: [
      'Infants with failure to thrive, thrush, and severe viral, fungal, and opportunistic infections.',
      'Causes: X-linked **IL2RG**, **ADA** deficiency, **RAG** defects.',
      'Clue: very low lymphocytes with ==absent T cells==; newborn **TREC** screening catches it early.',
      'No live vaccines; immunoglobulin support; urgent stem cell transplant or gene therapy.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Why must an infant with SCID avoid live vaccines such as rotavirus and BCG?',
    options: [
      'Even weakened organisms can cause severe disease without T cells',
      'Live vaccines contain too much antibody',
      'They cause lactose intolerance',
      'They only work in adults',
    ],
    answer: 0,
    explanation:
      'Live vaccines replicate. Without T cells, the infant cannot control even an attenuated organism.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'CVID patterns',
    bullets: [
      'Late childhood to adulthood: **low IgG** plus low IgA or IgM, and poor vaccine responses.',
      'Recurrent sinus and lung infections with **encapsulated bacteria**.',
      'Autoimmunity, granulomas, and lymphoma can coexist.',
      'Lifelong **immunoglobulin replacement**; watch for ==bronchiectasis==.',
    ],
  },
  {
    kind: 'compare',
    section: 3,
    title: 'SCID versus CVID',
    columns: ['Feature', 'SCID', 'CVID'],
    rows: [
      ['Onset', 'Early infancy', 'Late childhood to adulthood'],
      ['Main defect', '**T cells** (often B and NK too)', '**Antibody** production'],
      ['Infections', 'Viral, fungal, opportunistic', 'Bacterial sinus and lung'],
      ['Treatment', 'Stem cell transplant or gene therapy', 'Immunoglobulin replacement'],
    ],
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Numbers to memorize',
    bullets: [
      'CD4 normal ≈ **500–1500**; under **200** defines AIDS.',
      'Under **100**: toxoplasmosis risk. Under **50**: MAC and CMV risk.',
      'Viral load goal: **undetectable** (under 20–50 copies).',
      'Infant + viral and fungal → T defect. Adult + bacterial sinus/lung + low Ig → ==CVID==.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'At which CD4 count does each infection risk begin?',
    bins: ['Below 200', 'Below 100', 'Below 50'],
    items: [
      ['Pneumocystis pneumonia', 0],
      ['Toxoplasmosis', 1],
      ['Mycobacterium avium complex', 2],
      ['Cytomegalovirus retinitis', 2],
    ],
    explanation:
      'Thresholds guide prophylaxis: lower CD4 counts open the door to more opportunistic organisms.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Classify the failed arm',
    bullets: [
      'Defects can hit **antibodies, T cells, phagocytes, complement**, or several at once.',
      '**Primary** defects are intrinsic, often genetic; **secondary** ones follow infection, drugs, or malnutrition.',
      '==A normal cell count does not prove normal function.==',
      'CVID is not just “mild SCID”: compare onset, infections, counts, and function.',
    ],
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each failed arm to its typical infection pattern.',
    pairs: [
      ['Antibody defect', 'Recurrent encapsulated bacteria in sinuses and lungs'],
      ['T-cell defect', 'Viral, fungal, and opportunistic infections'],
      ['Phagocyte defect', 'Deep abscesses and poor wound healing'],
      ['Late complement defect', 'Recurrent Neisseria infections'],
    ],
    explanation: 'The infection pattern points to which defense is missing.',
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'HIV and immune coordination',
    bullets: [
      'Losing CD4 helpers impairs ==many pathways, not just one antibody class==.',
      '**Viral load** measures virus; **CD4 count** measures immune status. They answer different questions.',
      'Antigen, antibody, and RNA tests detect different targets on different timelines.',
      'ART blocks stages of viral replication; it does not simply replace one cell.',
    ],
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'A model is not a diagnosis',
    bullets: [
      'A weak antibody response can come from poor helper activity, a B-cell defect, or the exposure itself.',
      'Localize the defect, then name ==the assay that would separate the alternatives==.',
      'State the level of conclusion the data supports.',
    ],
  },
  {
    kind: 'example',
    section: 7,
    title: 'Worked example: quantity versus function',
    problem:
      'B cells are present in blood, but antibody responses to test antigens are repeatedly poor. T-cell measurements look preserved.',
    steps: [
      'B cells being present ==does not prove they work==.',
      'The functional challenge supports an impaired humoral (antibody) pathway.',
      'Preserved T cells narrow the options but do not name one disorder.',
      'Next: immunoglobulin levels, history, repeat testing, and ruling out secondary causes.',
    ],
    conclusion: 'A functional deficit can exist despite normal cell numbers.',
  },
  {
    kind: 'mcq',
    section: 7,
    prompt:
      'B cells are present, but the patient cannot make antibody to vaccines. What is the strongest conclusion?',
    options: [
      'Antibody function is impaired; more tests are needed to name the cause',
      'The patient definitely has HIV',
      'The immune system is normal',
      'The patient has SCID',
    ],
    answer: 0,
    explanation:
      'The data supports a humoral defect, not a single named diagnosis without more information.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'U=U', back: 'Undetectable viral load means untransmittable.' },
      { front: 'TREC', back: 'Newborn SCID screen measuring T-cell receptor excision circles.' },
      { front: 'ART', back: 'Combination antiretroviral therapy that blocks HIV replication.' },
      { front: 'PEP', back: 'Post-exposure prophylaxis started within 72 hours.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'HIV destroys CD4 helpers, and infections track the CD4 count.',
      'SCID: infant T-cell failure, an emergency. CVID: later antibody failure.',
      '==Infection patterns point to the missing arm of immunity.==',
      'Cell counts and cell function are different evidence.',
    ],
  },
]);

const autoimmunity = defineDeck('anat-u9-l2', [
  {
    kind: 'title',
    title: 'Autoimmunity, MS, RA, and systemic allergy',
    subtitle:
      'When the immune system targets the body itself, or overreacts to something harmless.',
    objectives: [
      'Explain loss of tolerance and molecular mimicry.',
      'Contrast MS and RA pathology.',
      'Trace the physiological sequence of anaphylaxis.',
      'Separate allergy, autoimmunity, and immunodeficiency.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: do healthy people have any self-reactive immune cells?',
    options: [
      'Yes, but they are kept in check',
      'No, all are deleted',
      'Only in old age',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Tolerance and triggers',
    bullets: [
      '**Central tolerance** deletes self-reactive cells; **peripheral tolerance** uses anergy, deletion, and Tregs.',
      '**Molecular mimicry**: a microbial peptide resembles a self peptide.',
      'Risk: HLA genes, female sex, smoking, low vitamin D, gut dysbiosis.',
      'Autoantibodies may cause disease or just mark it; ==biopsy and function matter more than titer==.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each trigger to its description.',
    pairs: [
      ['Molecular mimicry', 'A microbial peptide resembles a self peptide'],
      ['Epitope spreading', 'Tissue damage exposes new self targets'],
      ['Bystander activation', 'Inflammation activates nearby self-reactive cells'],
    ],
    explanation: 'Infections can break tolerance in several different ways.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Multiple sclerosis',
    image: 'ap-ms-mri',
    caption:
      'MRI in MS: bright white-matter plaques where myelin in the brain and spinal cord has been damaged.',
    bullets: [
      '**Central** demyelination: optic neuritis, Lhermitte sign, and **Uhthoff** (worse with heat).',
      'Lesions are ==spread out in space and time==; periventricular **Dawson fingers**.',
      'Relapses: high-dose steroids. Disease-modifying drugs include anti-CD20 and interferons.',
      'Mimics: NMO (aquaporin-4 antibodies) and MOG disease.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'A patient’s blurred vision worsens after a hot shower and improves as they cool down. Which disease fits?',
    options: ['Multiple sclerosis', 'Rheumatoid arthritis', 'Anaphylaxis', 'CVID'],
    answer: 0,
    explanation:
      'Heat slows conduction further in demyelinated nerves: the Uhthoff phenomenon of MS.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Rheumatoid arthritis',
    image: 'ap-ra-hand',
    caption:
      'Long-standing RA: symmetric inflammation of the small hand joints erodes bone and deforms the fingers.',
    bullets: [
      '**Symmetric small-joint** synovitis with morning stiffness over an hour.',
      '**Rheumatoid factor** and the more specific **anti-CCP** antibodies.',
      'Osteoarthritis is asymmetric and weight-bearing, with ==short stiffness== and bony nodes.',
      'Treatment starts with **methotrexate**; screen for TB before TNF blockers.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Rheumatoid arthritis or osteoarthritis?',
    bins: ['Rheumatoid arthritis', 'Osteoarthritis'],
    items: [
      ['Symmetric small-joint swelling', 0],
      ['Morning stiffness over an hour', 0],
      ['Bony Heberden nodes', 1],
      ['Positive anti-CCP', 0],
      ['Worse in weight-bearing knees after use', 1],
    ],
    explanation: 'RA is autoimmune synovitis; OA is wear-related cartilage loss.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'The anaphylaxis sequence',
    bullets: [
      'A rapid, **systemic** reaction affecting the airway and circulation.',
      'Mediators cause **vasodilation**, **leaky vessels**, and **bronchoconstriction**.',
      '**Epinephrine** is central to emergency treatment.',
      'Compare this ==minutes-long tempo== with the slow tissue injury of autoimmunity.',
    ],
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Order the anaphylaxis sequence.',
    items: [
      'First exposure sensitizes mast cells with IgE',
      'Re-exposure: the antigen cross-links IgE on mast cells',
      'Mast cells release histamine and other mediators',
      'Vessels dilate and leak; bronchi constrict',
      'Blood pressure falls and breathing becomes difficult',
    ],
    explanation:
      'Sensitization comes first; re-exposure triggers mediator release with effects on several organ systems.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Test discriminators',
    bullets: [
      '**MS**: worse with heat, central white-matter lesions.',
      '**Guillain-Barré**: ascending, peripheral, after infection.',
      '**RA**: symmetric with anti-CCP. **Lupus**: multisystem with ANA and immune complexes.',
      'First drugs: ==steroids for an MS relapse, methotrexate for RA, epinephrine for anaphylaxis==.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each condition to its strongest discriminating clue.',
    pairs: [
      ['Multiple sclerosis', 'Central white-matter lesions, worse with heat'],
      ['Guillain-Barré syndrome', 'Ascending weakness after an infection'],
      ['Rheumatoid arthritis', 'Symmetric small joints with anti-CCP'],
      ['Lupus', 'Multisystem disease with ANA'],
    ],
    explanation: 'Note tempo, symmetry, heat effect, and antibody pattern.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Tolerance is active regulation',
    bullets: [
      'Self-reactive cells exist ==without always causing disease==.',
      'Autoimmunity comes from susceptibility, failed regulation, and environment together.',
      'The **target tissue** sets the physiology: myelin in MS, synovium in RA.',
      'Link target → inflammation → structural damage → lost function.',
    ],
  },
  {
    kind: 'compare',
    section: 6,
    title: 'Allergy, autoimmunity, immunodeficiency',
    columns: ['Category', 'What goes wrong', 'Example'],
    rows: [
      ['Allergy', 'Overreaction to a **harmless external** antigen', 'Peanut anaphylaxis'],
      ['Autoimmunity', 'Response against **self**', 'Multiple sclerosis, RA'],
      ['Immunodeficiency', '**Too little** protective function', 'SCID, CVID, HIV'],
      ['None of these', 'A digestion problem, not immune', 'Lactose intolerance'],
    ],
  },
  {
    kind: 'sort',
    section: 6,
    prompt: 'Which category does each condition belong to?',
    bins: ['Allergy', 'Autoimmunity', 'Immunodeficiency'],
    items: [
      ['Bee-sting anaphylaxis', 0],
      ['Rheumatoid arthritis', 1],
      ['Severe combined immunodeficiency', 2],
      ['Hay fever', 0],
      ['Multiple sclerosis', 1],
      ['Untreated advanced HIV', 2],
    ],
    explanation:
      'Ask about the direction and adequacy of the response: against harmless outside things, against self, or too weak.',
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Reason from tissue to function',
    bullets: [
      '**Demyelination** → slowed or blocked conduction in the affected pathway.',
      '**Synovitis** → swelling, stiffness, and progressive joint damage.',
      '**Mast-cell mediators** → low blood pressure and airway narrowing.',
      'A shared symptom such as weakness ==cannot identify one cause==; compare timing and tissue.',
    ],
  },
  {
    kind: 'example',
    section: 7,
    title: 'Worked example: three immune mechanisms',
    problem:
      'Case A: central myelin injury. Case B: destructive synovial inflammation. Case C: rapid systemic effects after re-exposure to an outside antigen.',
    steps: [
      'A → impaired conduction from **demyelination**.',
      'B → inflammatory joint damage to cartilage and bone.',
      'C → rapid **mediator release** after sensitization.',
      'A and B are self-directed; C is an external trigger with immediate effects.',
    ],
    conclusion:
      '==Target and timing== separate mechanisms that would otherwise all be “immune problems”.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Molecular mimicry', back: 'Microbe–self similarity that triggers autoimmunity.' },
      { front: 'Anti-CCP', back: 'Specific RA antibody against citrullinated peptides.' },
      { front: 'Biphasic reaction', back: 'Anaphylaxis returning hours after improvement.' },
      { front: 'Uhthoff phenomenon', back: 'MS symptoms worsened by heat.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Tolerance is actively maintained, centrally and peripherally.',
      'MS attacks central myelin; RA attacks synovial joints.',
      '==Anaphylaxis is minutes; autoimmune damage builds over months.==',
      'Classify allergy, autoimmunity, or deficiency before naming a disease.',
    ],
  },
]);

const cases = defineDeck('anat-u10-l1', [
  {
    kind: 'title',
    title: 'Case reasoning: vitals, ABGs, and imaging',
    subtitle: 'A repeatable method for reading measurements and images under time pressure.',
    objectives: [
      'Interpret vitals, pulse oximetry, and capnography.',
      'Read ABGs with compensation logic.',
      'Identify key chest and abdominal imaging signs.',
      'Structure a timed case answer.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: when you read an ABG, what do you look at first?',
    options: ['pH', 'PaCO₂', 'Bicarbonate', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Vitals and monitors',
    bullets: [
      'Low pressure + fast heart rate: **volume loss or sepsis**.',
      'High pressure + slow heart rate: ==raised intracranial pressure==.',
      'Pulse oximetry lags with poor perfusion; check the waveform and warmth.',
      '**Capnography**: falling EtCO₂ = hyperventilation or poor perfusion; rising = hypoventilation; shark-fin = bronchospasm.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each vital-sign pattern to what it suggests.',
    pairs: [
      ['Low blood pressure with a fast heart rate', 'Volume loss or sepsis'],
      ['High blood pressure with a slow heart rate', 'Raised intracranial pressure'],
      ['Shark-fin capnography waveform', 'Bronchospasm'],
      ['Rising end-tidal CO₂', 'Hypoventilation or return of circulation'],
    ],
    explanation: 'Read vitals as a set; a single number rarely tells the story.',
  },
  {
    kind: 'flow',
    section: 1,
    title: 'The ABG method',
    steps: [
      { label: '1. pH', detail: 'Acidemia (< 7.35) or alkalemia (> 7.45)?' },
      { label: '2. PaCO₂', detail: 'Does the respiratory value explain the pH direction?' },
      { label: '3. HCO₃⁻', detail: 'Does the metabolic value explain it?' },
      { label: '4. Compensation', detail: 'Is the other value moving as expected?' },
      { label: '5. Oxygenation', detail: 'PaO₂ and the A–a gradient.' },
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each ABG to its primary disturbance.',
    pairs: [
      ['pH 7.30, PaCO₂ 55, HCO₃⁻ 26', 'Acute respiratory acidosis'],
      ['pH 7.48, PaCO₂ 28, HCO₃⁻ 22', 'Acute respiratory alkalosis'],
      ['pH 7.28, PaCO₂ 30, HCO₃⁻ 14', 'Metabolic acidosis with compensation'],
      ['pH 7.50, PaCO₂ 46, HCO₃⁻ 34', 'Metabolic alkalosis with compensation'],
    ],
    explanation:
      'Find the value that explains the pH direction; the other value shows compensation. Acute CO₂ changes barely move bicarbonate.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Chest imaging signs',
    image: 'ap-chest-xray',
    caption:
      'A normal frontal chest X-ray: sharp heart borders, clear costophrenic angles, and domed diaphragms.',
    bullets: [
      '**Silhouette sign** localizes consolidation; **air bronchograms** show open bronchi in it.',
      '**Kerley B lines** mark interstitial edema.',
      'Pneumothorax: a pleural line with no markings beyond it; tension adds shift.',
      'Effusion blunts the angles; COPD ==flattens the diaphragms==.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each chest X-ray sign to what it indicates.',
    pairs: [
      ['Lost right heart border', 'Right middle lobe opacity'],
      ['Blunted costophrenic angle', 'Pleural effusion'],
      ['Visible pleural line, no markings beyond', 'Pneumothorax'],
      ['Flattened diaphragms', 'Hyperinflation, as in COPD'],
    ],
    explanation:
      'Each sign points to a compartment and mechanism, not a final diagnosis on its own.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Abdominal and immune imaging',
    bullets: [
      '**Free air under the diaphragm** means perforation.',
      'Dilated loops with air-fluid levels: **obstruction**. Thumbprinting: ischemia.',
      'Splenomegaly plus nodes: mono or lymphoma.',
      'CT for appendicitis; ==ultrasound first== for the gallbladder, in pregnancy, and in the young.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'An upright X-ray shows air under the diaphragm in a patient with sudden severe abdominal pain. What does it mean?',
    options: ['A perforated hollow organ', 'Normal digestion', 'Gallstones', 'Pneumonia'],
    answer: 0,
    explanation:
      'Free intraperitoneal air means a hollow organ, such as a perforated ulcer, has broken open.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'A timed answer template',
    bullets: [
      'Most likely diagnosis → top two alternatives → supporting and refuting findings.',
      'Then the ==next test== and immediate management.',
      'Include normal ranges and units for full credit.',
    ],
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Order the parts of a timed case answer.',
    items: [
      'Most likely diagnosis',
      'Top two alternatives',
      'Key supporting and refuting findings',
      'Next test',
      'Immediate management',
    ],
    explanation:
      'A fixed structure keeps the reasoning visible and earns the most credit under time pressure.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'A fixed case-analysis sequence',
    bullets: [
      'List only what is **supplied**: values with units, timing, descriptions, history.',
      'Name what each measures: ==a rate is not alveolar ventilation; saturation is not content==.',
      'Connect observations through a mechanism and compare one alternative.',
      'A normal-looking pH can hide two opposing processes.',
    ],
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Read images from orientation to mechanism',
    bullets: [
      'Check projection, side labels, rotation, and inspiration first.',
      'Routine: **airway, lungs and pleura, heart borders, diaphragms, bones**.',
      'On a standard frontal view, the patient’s right is on the viewer’s left, but ==labels win==.',
      'Describe what is visible first, then the mechanism it supports.',
    ],
  },
  {
    kind: 'order',
    section: 6,
    prompt: 'Order a systematic chest X-ray review.',
    items: [
      'Check labels, projection, and image quality',
      'Airway and tracheal position',
      'Lungs and pleura',
      'Heart borders and mediastinum',
      'Diaphragms and costophrenic angles',
      'Bones and soft tissues',
    ],
    explanation:
      'A routine makes the review complete; it does not turn a poor image into certainty.',
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Confidence versus completeness',
    bullets: [
      'A calculation can be exact while ==the cause stays uncertain==.',
      'Name the one observation that would separate the alternatives.',
      'Four-line format: **observation, mechanism, calculation or link, limitation**.',
    ],
  },
  {
    kind: 'example',
    section: 7,
    title: 'Worked example: a mixed respiratory dataset',
    problem:
      'pH 7.30, high PaCO₂, bicarbonate slightly high. Tidal volume 250 mL, rate 20/min, dead space 150 mL.',
    steps: [
      'pH shows acidemia; high CO₂ is a respiratory mechanism that explains it.',
      'Slightly high bicarbonate may be compensation; duration matters.',
      '**Alveolar ventilation = (250 − 150) × 20 = 2000 mL/min = 2.0 L/min**.',
      'This shows poor fresh-air delivery, but not its cause.',
    ],
    conclusion:
      '==A fast rate can coexist with low alveolar ventilation== when breaths are shallow.',
  },
  {
    kind: 'numeric',
    section: 7,
    prompt:
      'Tidal volume is 300 mL, dead space is 150 mL, and the rate is 24/min. What is alveolar ventilation in L/min?',
    answer: 3.6,
    tolerance: 0.05,
    unit: 'L/min',
    explanation: '(300 − 150) × 24 = 3600 mL/min, which is 3.6 L/min.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'A–a gradient', back: 'Alveolar–arterial O₂ gap; widened by shunt or V/Q disease.' },
      { front: 'Silhouette sign', back: 'Lost border where consolidation touches a structure.' },
      { front: 'EtCO₂', back: 'End-tidal CO₂, reflecting ventilation and perfusion.' },
      { front: 'Winter’s formula', back: 'Expected PaCO₂ when compensating metabolic acidosis.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Read vitals as a set and capnography as ventilation.',
      'ABG order: pH, CO₂, bicarbonate, compensation, oxygenation.',
      '==Describe the image before interpreting it.==',
      'Answer with diagnosis, alternatives, evidence, next test, and management.',
    ],
  },
]);

const strategy = defineDeck('anat-u10-l2', [
  {
    kind: 'title',
    title: 'Competition strategy and study system',
    subtitle: 'Turning everything in this course into points on test day.',
    objectives: [
      'Build notes allowed by the current rules.',
      'Plan pacing for stations and written tests.',
      'Avoid common misreads and unit errors.',
      'Run a final-week review schedule.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which study habit helps you remember more?',
    options: [
      'Rereading the notes',
      'Answering from memory, then checking',
      'Highlighting everything',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Rules-first preparation',
    bullets: [
      'The **current event rules** decide allowed notes, equipment, and scope.',
      'This course follows the respiratory, digestive, and immune syllabus.',
      'Organize notes around **structures, pathways, equations, and comparisons**.',
      'Practice ==without assuming every resource will be allowed==.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Which source decides what notes and equipment you may bring to the event?',
    options: [
      'The current year’s official event rules',
      'Last year’s tournament packet',
      'What a teammate remembers',
      'This course’s syllabus',
    ],
    answer: 0,
    explanation:
      'Rules change between seasons, so always prepare from the current official rules; a course syllabus sets study scope, not allowed resources.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Diagram fluency',
    image: 'ap-respiratory-organs',
    caption:
      'Redraw diagrams like this one from memory every week, then check them against the original.',
    bullets: [
      'Airways, alveoli, gut, liver plumbing, marrow→thymus→node, antibodies, complement.',
      'Label in **exam orientation** and add normal values.',
      'Teach each diagram aloud: ==hesitation marks a gap==.',
    ],
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Station tactics',
    bullets: [
      'Skim everything first, answer what you know, and **flag** calculations and cases for a second pass.',
      'Write ==units on every number==; circle acid or alkaline before reading gases.',
      'In practicals, narrate color, consistency, location, and comparison to normal.',
      'Torn between two answers? Name the one test that separates them.',
    ],
  },
  {
    kind: 'order',
    section: 2,
    prompt: 'Order a smart approach to a timed station.',
    items: [
      'Skim every question',
      'Answer confident items first',
      'Flag calculations and cases',
      'Return to flagged items on a second pass',
      'Check units and answers in the final minutes',
    ],
    explanation:
      'Banking easy points first protects you from running out of time on one hard item.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Error-proofing',
    bullets: [
      'Classic mix-ups: **MHC I/II**, **IgG/IgM timing**, **shunt/dead space**, **melena/hematochezia**, **right/left bronchus**.',
      'Keep a personal **error log** and review it before every test.',
      'Low SpO₂ with normal PaCO₂: shunt or V/Q mismatch.',
      'High PaCO₂ means ==hypoventilation, regardless of saturation==.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each commonly confused pair to the correct fact.',
    pairs: [
      ['MHC I', 'Presents to CD8 T cells'],
      ['IgM', 'Appears first in a primary response'],
      ['Shunt', 'Blood flow without ventilation'],
      ['Melena', 'Black stool, usually an upper source'],
    ],
    explanation: 'These are the pairs most often reversed under time pressure.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Final week',
    bullets: [
      'Mix a **timed set** with a slower, explanation-focused set.',
      'Redraw pathways from memory, check them, and fix weak links.',
      'Use worked examples to test whether a method ==transfers to new numbers==.',
      'End each session with a specific next action, not “reread everything”.',
    ],
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Retrieval built on relationships',
    bullets: [
      'Respiratory: volumes, pressures, gas transport, obstruction versus restriction side by side.',
      'Digestion: organ → secretion → substrate → product → absorption route.',
      'Immunity: source organ → cell → recognition → effector → failure pattern.',
      '**Retrieval practice**: produce the answer ==before looking it up==; space and mix topics.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Which practice best tests whether you can use the alveolar ventilation equation?',
    options: [
      'Solving a new problem mixed in with oxygen-content questions',
      'Rereading the worked example',
      'Highlighting the formula',
      'Copying the answer key',
    ],
    answer: 0,
    explanation:
      'Interleaving forces you to choose the right equation, not just repeat one procedure.',
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Turn mistakes into training decisions',
    bullets: [
      'Log the **prompt type, the wrong decision, the reason, and a targeted next action**.',
      'Equation-structure errors, orientation errors, and explanation gaps need ==different practice==.',
      'Review correct guesses too: a right answer from wrong reasoning is unstable.',
    ],
  },
  {
    kind: 'sort',
    section: 6,
    prompt: 'What kind of error is each mistake?',
    bins: ['Equation structure', 'Orientation', 'Causal explanation'],
    items: [
      ['Subtracting dead space after multiplying by rate', 0],
      ['Placing the patient’s right lung on the viewer’s right', 1],
      ['Naming the right immune cell but not its action', 2],
      ['Adding RV to a capacity that excludes it', 0],
      ['Reversing proximal and distal', 1],
    ],
    explanation: 'Classifying an error tells you exactly what to practice next.',
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Rehearse the whole workflow',
    bullets: [
      'Survey, divide time by points and difficulty, and keep a final checking interval.',
      'Write the **formula before substituting**, then check plausibility.',
      'For identification, anchor orientation before naming function.',
      '==Completing a lesson is not proof of mastery==; transfer to new cases is.',
    ],
  },
  {
    kind: 'example',
    section: 6,
    title: 'Worked example: repair a recurring error',
    problem:
      'A student keeps getting 5.85 L/min alveolar ventilation for tidal volume 500 mL, rate 12/min, and dead space 150 mL.',
    steps: [
      'The mistake: 500 × 12 − 150 = 5850 subtracts dead space **only once per minute**.',
      'The repair: dead space is paid ==every breath==, so subtract before multiplying.',
      'Correct: **(500 − 150) × 12 = 4200 mL/min = 4.2 L/min**.',
      'Check transfer with a different rate.',
    ],
    conclusion: 'Good review fixes the decision that produced the error.',
  },
  {
    kind: 'numeric',
    section: 6,
    prompt:
      'Tidal volume 450 mL, dead space 150 mL, rate 16/min. What is alveolar ventilation in mL/min?',
    answer: 4800,
    tolerance: 0,
    unit: 'mL/min',
    explanation: '(450 − 150) × 16 = 300 × 16 = 4800 mL/min.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Error log', back: 'Personal list of repeated misreads to review before tests.' },
      { front: 'Second pass', back: 'Returning to flagged calculations and cases.' },
      { front: 'Retrieval practice', back: 'Producing an answer from memory before checking.' },
      { front: 'Teach-back', back: 'Explaining aloud to expose gaps.' },
    ],
  },
  {
    kind: 'open',
    prompt:
      'Name one mistake you have made in this course and the specific practice that would fix it.',
    model:
      'Example: I subtracted dead space once per minute instead of per breath, so I will solve three ventilation problems at different rates and explain each step aloud.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Prepare from the current rules and organize notes by relationships.',
      'Skim, bank easy points, flag hard items, and keep time to check.',
      '==Retrieve from memory, log errors, and fix the decision behind each one.==',
      'Transfer to new cases is the real test of mastery.',
    ],
  },
]);

export const anatomyDecksApplied: Deck[] = [deficiency, autoimmunity, cases, strategy];
