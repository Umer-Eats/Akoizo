import { defineDeck, type Deck } from './presentation-types.ts';

// Anatomy and Physiology, units 7–8: immune anatomy and immune physiology.

const lymphoid = defineDeck('anat-u7-l1', [
  {
    kind: 'title',
    title: 'Central immune organs and lymph flow',
    subtitle:
      'Where lymphocytes are made and trained, and how lymph carries antigens to meet them.',
    objectives: [
      'Contrast primary and secondary lymphoid organs.',
      'Explain selection in the marrow and thymus.',
      'Trace lymph from tissue to the subclavian veins.',
      'Match lymph node groups to the regions they drain.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what pumps lymph around the body?',
    options: [
      'A lymph heart',
      'Muscle movement, breathing, and valves',
      'The spleen',
      'Not sure yet',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Primary organs: marrow and thymus',
    image: 'ap-thymus',
    caption:
      'The thymus sits in the anterior mediastinum; its cortex and medulla train developing T cells.',
    bullets: [
      '**Red marrow** makes stem cells for myeloid and lymphoid lines; **B cells** mature there.',
      '**T cells** mature in the thymus through **positive** and **negative selection**.',
      'The thymus is largest in childhood and ==shrinks with age==, replaced by fat.',
      'SCID from ADA or RAG defects blocks lymphocyte development centrally.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt:
      'Is each organ primary (where lymphocytes develop) or secondary (where they meet antigen)?',
    bins: ['Primary lymphoid organ', 'Secondary lymphoid organ'],
    items: [
      ['Bone marrow', 0],
      ['Thymus', 0],
      ['Lymph node', 1],
      ['Spleen', 1],
      ['Tonsils', 1],
      ['Peyer patches', 1],
    ],
    explanation:
      'Marrow and thymus produce and select lymphocytes; nodes, spleen, and MALT are where mature cells meet antigen.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Secondary organs: nodes, spleen, MALT',
    image: 'ap-lymph-node',
    caption:
      'A lymph node: **B-cell follicles** in the cortex, **T cells** in the paracortex, and macrophage-lined sinuses.',
    bullets: [
      'Nodes filter **lymph**; the spleen filters **blood**.',
      'Splenic **white pulp** mounts responses; **red pulp** removes old red cells.',
      '**MALT** includes tonsils, Peyer patches, and the appendix.',
      'After splenectomy, ==encapsulated bacteria== are a major risk, so vaccines matter.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt:
      'Which organisms are the main threat after the spleen is removed? Select all that apply.',
    options: [
      'Streptococcus pneumoniae',
      'Neisseria meningitidis',
      'Haemophilus influenzae',
      'Common cold viruses',
    ],
    answers: [0, 1, 2],
    explanation:
      'The spleen clears encapsulated bacteria from blood, so pneumococcus, meningococcus, and Haemophilus become dangerous.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Lymphatic vessels and flow',
    image: 'ap-lymphatic-system',
    caption:
      'Lymph collects in blind capillaries, passes through nodes, and drains into the subclavian veins.',
    bullets: [
      'The **thoracic duct** drains both legs, the abdomen, the left chest, left arm, and left head and neck.',
      'The **right lymphatic duct** drains the right upper body.',
      '**Lymphedema** follows node removal, parasites (filariasis), or tumor blockage.',
      'Cancer staging samples the **sentinel node** first.',
    ],
  },
  {
    kind: 'order',
    section: 2,
    prompt: 'Order the path of lymph from a tissue to the blood.',
    items: [
      'Interstitial fluid enters a lymphatic capillary',
      'Afferent vessels carry it to a lymph node',
      'Efferent vessels carry it out of the node',
      'Lymphatic trunks join a major duct',
      'The duct empties into a subclavian vein',
    ],
    explanation: 'Lymph is filtered by nodes on its way back to venous blood.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Barriers and innate helpers',
    bullets: [
      'Barriers: keratinized skin, stomach acid, mucus, cilia, lysozyme, and normal flora.',
      'Burns, ulcers, and IV lines ==open a door for invasion==.',
      'Vitamin A and zinc deficiency impair barrier repair.',
      'Phagocytes, NK cells, and complement bridge to adaptive immunity.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Which patient has lost a major physical barrier?',
    options: [
      'A patient with extensive burns',
      'A patient with a mild cold',
      'A patient who just ate a meal',
      'A patient with high blood pressure',
    ],
    answer: 0,
    explanation:
      'Burns destroy the skin barrier, so burn patients need close infection surveillance.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Exam mapping',
    bullets: [
      '**Cervical** nodes: throat. **Axillary**: arm and breast. **Inguinal**: leg and external genitalia. **Mesenteric**: gut.',
      'Splenomegaly: mono, lymphoma, portal hypertension, or hemolysis.',
      'Label cortex, paracortex, medulla, afferent and efferent vessels.',
      '==Fewer efferent than afferent vessels== slows lymph so it can be screened.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each node group to the region it drains.',
    pairs: [
      ['Cervical nodes', 'Throat and head'],
      ['Axillary nodes', 'Arm and breast'],
      ['Inguinal nodes', 'Leg and external genitalia'],
      ['Mesenteric nodes', 'Intestines'],
    ],
    explanation: 'A swollen node points back to the region it drains.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'A lymphocyte and an antigen take separate routes',
    bullets: [
      'Primary organs **develop** lymphocytes; secondary organs are **meeting places** with antigen.',
      '==A lymph node is not a miniature thymus.==',
      'Tissue antigen travels in lymph to a regional node; dendritic cells can carry it.',
      'Naive lymphocytes recirculate between blood and lymphoid tissue to find rare antigens.',
    ],
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match where an antigen starts to the organ that first organizes a response.',
    pairs: [
      ['Tissue fluid in the foot', 'Regional lymph node'],
      ['Bacteria circulating in blood', 'Spleen'],
      ['Microbes in the gut lumen', 'Peyer patches (MALT)'],
      ['Developing T cells, not antigen', 'Thymus'],
    ],
    explanation: 'Ask where the antigen is: tissue fluid, blood, or a mucosal surface.',
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Why lymph must return',
    bullets: [
      'Fluid and protein leak from capillaries; lymph ==returns them to the blood==.',
      'Overlapping endothelial flaps let fluid in; valves keep flow one-way.',
      'Muscle activity, breathing, and vessel contraction move lymph; there is no lymph heart.',
      'Lacteals also carry **chylomicrons**, linking lymph to fat absorption.',
    ],
  },
  {
    kind: 'multi',
    section: 6,
    prompt: 'What does the lymphatic system do? Select all that apply.',
    options: [
      'Returns leaked fluid and protein to blood',
      'Carries absorbed fat from the gut',
      'Brings antigens to lymph nodes',
      'Pumps blood through the heart',
    ],
    answers: [0, 1, 2],
    explanation:
      'Lymph handles fluid balance, fat transport, and immune surveillance at once. It has no role in pumping blood.',
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Thymic selection and later immunity',
    bullets: [
      '**Positive selection**: T cells must recognize self-MHC.',
      '**Negative selection**: strongly self-reactive T cells are deleted.',
      'Selection is imperfect, so **peripheral tolerance** is still needed.',
      '==Naive does not mean immature==: a naive T cell is mature but has not met its antigen.',
    ],
  },
  {
    kind: 'sort',
    section: 7,
    prompt: 'Does each T cell pass or fail thymic selection?',
    bins: ['Survives selection', 'Is eliminated'],
    items: [
      ['Recognizes self-MHC weakly and appropriately', 0],
      ['Cannot recognize self-MHC at all', 1],
      ['Binds self-peptide on MHC very strongly', 1],
    ],
    explanation:
      'Cells that ignore MHC fail positive selection; cells that react strongly to self fail negative selection.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: the first organized response',
    problem:
      'A scrape on the left foot introduces material into tissue fluid. Trace a plausible route toward immune surveillance and back to blood.',
    steps: [
      'Antigen or antigen-carrying cells enter local lymphatics, not the thymus.',
      'Afferent lymph delivers them to **regional nodes**, where lymphocytes can meet them.',
      'Lymph leaves by efferent vessels and trunks to the thoracic duct and venous blood.',
      'The spleen watches **blood**; the thymus develops T cells.',
    ],
    conclusion: 'The route follows ==the compartment holding the antigen== and each organ’s job.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Positive selection', back: 'Thymic survival of T cells that recognize self-MHC.' },
      {
        front: 'Thoracic duct',
        back: 'Largest lymph vessel, draining most of the body to the left subclavian vein.',
      },
      { front: 'White pulp', back: 'Splenic lymphoid tissue that responds to blood antigens.' },
      { front: 'MALT', back: 'Mucosa-associated lymphoid tissue guarding entry surfaces.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Marrow and thymus develop lymphocytes; nodes, spleen, and MALT host responses.',
      'Lymph returns fluid, carries fat, and brings antigens to nodes.',
      '==Map the antigen’s compartment before choosing the organ.==',
      'After splenectomy, encapsulated bacteria are the major threat.',
    ],
  },
]);

const defenseSites = defineDeck('anat-u7-l2', [
  {
    kind: 'title',
    title: 'Spleen, nodes, and barriers in defense',
    subtitle: 'Inside the organs that sharpen antibodies, filter blood, and guard every surface.',
    objectives: [
      'Describe germinal center reactions.',
      'Explain splenic filtration and its other roles.',
      'Read node findings for infection versus malignancy.',
      'Explain barrier protection and vaccines.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: a swollen, tender neck node during a sore throat most likely means…',
    options: ['A normal response to infection', 'Cancer', 'A broken bone', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Germinal centers and affinity',
    bullets: [
      'Activated B cells form **germinal centers**: a dark zone for proliferation, a light zone for selection.',
      '**Somatic hypermutation** plus selection ==raises antibody affinity==.',
      'Winners become plasma cells and memory cells, guided by T follicular helper cells.',
      'Tender, mobile, acute nodes favor infection; hard, fixed, painless nodes favor malignancy.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Does each node finding lean toward infection or malignancy?',
    bins: ['Favors infection', 'Favors malignancy'],
    items: [
      ['Tender to touch', 0],
      ['Hard and fixed in place', 1],
      ['Appeared quickly with a sore throat', 0],
      ['Painless and growing for months', 1],
      ['Mobile and soft', 0],
    ],
    explanation:
      'These are tendencies, not proof. Biopsy with flow cytometry separates lymphoma from reactive enlargement.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'What the spleen does with blood',
    image: 'ap-spleen',
    caption:
      'Splenic **red pulp** filters blood; **white pulp** nodules are lymphoid tissue around central arteries.',
    bullets: [
      'Red-pulp macrophages remove old red cells and recycle iron.',
      'The **marginal zone** traps encapsulated bacteria; the spleen also stores platelets.',
      'Mono enlarges the spleen, so ==contact sports pause== until cleared.',
      'Portal hypertension causes congestive splenomegaly with low blood counts.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each splenic region to its job.',
    pairs: [
      ['Red pulp', 'Removes aging red blood cells'],
      ['White pulp', 'Mounts immune responses to blood antigens'],
      ['Marginal zone', 'Traps encapsulated bacteria'],
    ],
    explanation: 'The spleen filters blood mechanically and immunologically in different zones.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Skin, mucosa, and microbiome',
    bullets: [
      'Keratin, acidic sebum, defensins, and competing flora block colonization.',
      '**Secretory IgA** neutralizes microbes ==without causing inflammation==.',
      'Broad antibiotics disrupt flora and invite *C. difficile*.',
      'Hand hygiene, wound care, and vaccines reinforce barriers.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'A patient develops severe diarrhea after a long course of broad-spectrum antibiotics. What is the likely mechanism?',
    options: [
      'Normal flora were disrupted, letting C. difficile overgrow',
      'The antibiotic created new lactase',
      'Stomach acid rose too high',
      'The spleen stopped working',
    ],
    answer: 0,
    explanation:
      'Normal flora compete with pathogens. Remove them, and C. difficile can take over the colon.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Fever and the signs of inflammation',
    image: 'ap-inflammation',
    caption:
      'Injury triggers mediator release, vasodilation, and leaky vessels, bringing fluid and white cells to the site.',
    bullets: [
      'Five signs: **rubor, calor, tumor, dolor, functio laesa** (redness, heat, swelling, pain, lost function).',
      'IL-1, IL-6, and TNF ==raise the hypothalamic set point==, causing fever.',
      'Neutrophilia: bacterial. Lymphocytosis: viral. Eosinophilia: allergy or parasites.',
      'A **left shift** (more band cells) means demand outpaces maturation.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each blood count pattern to what it usually suggests.',
    pairs: [
      ['Neutrophilia', 'Bacterial infection'],
      ['Lymphocytosis', 'Viral infection'],
      ['Eosinophilia', 'Allergy or parasites'],
      ['Left shift with bands', 'Acute demand outpacing maturation'],
    ],
    explanation: 'White-cell patterns point toward a category of cause, not a specific organism.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'When to escalate',
    bullets: [
      'Fast-spreading redness, pain out of proportion, blisters (bullae).',
      'Fever in someone immunocompromised or ==without a spleen==.',
      'These need urgent evaluation for necrotizing infection or sepsis.',
      'Document node size, location, consistency, mobility, tenderness, and overlying skin.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which situations need urgent evaluation? Select all that apply.',
    options: [
      'Fever in a person without a spleen',
      'Pain far out of proportion to a skin wound',
      'Redness spreading rapidly over hours',
      'A small, stable bruise',
    ],
    answers: [0, 1, 2],
    explanation:
      'Asplenia with fever risks overwhelming sepsis; disproportionate pain and rapid spread suggest necrotizing infection.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Inside the secondary organs',
    bullets: [
      'Node: B follicles in the **cortex**, T cells in the **paracortex**, sinuses toward the medulla.',
      'The layout ==repeats chances to meet antigen== while lymph is filtered.',
      'Spleen: **white pulp** for immune responses, **red pulp** for blood filtration.',
      'Identify what fluid or surface is watched before naming the cell zone.',
    ],
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each lymph node zone to the cells found there.',
    pairs: [
      ['Cortex follicles', 'B cells and germinal centers'],
      ['Paracortex', 'T cells meeting dendritic cells'],
      ['Medullary sinuses', 'Macrophages filtering lymph'],
    ],
    explanation: 'The node’s geography brings the right cells together with antigen.',
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Barriers are selective interfaces',
    bullets: [
      'Mucosal surfaces must still ==absorb nutrients and exchange gas==.',
      'So they defend with mucus, tight junctions, antimicrobials, immune cells, and movement.',
      'Normal flora are communities that vary by site, not one helpful organism.',
      'A microbe tolerated on one surface can cause disease in a protected compartment.',
    ],
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Inflammation is not proof of a cause',
    bullets: [
      'Redness and warmth come from blood flow; swelling from leaky vessels.',
      'Sterile injury, such as trauma or crystals, inflames tissue too.',
      'Fever is a regulated response, ==not a marker of bacterial infection==.',
      'Separate the observation, the mechanism, and the list of possible causes.',
    ],
  },
  {
    kind: 'mcq',
    section: 7,
    prompt: 'A swollen, red, warm joint is found. What can you conclude?',
    options: [
      'Inflammation is present, but the cause is not yet known',
      'It must be a bacterial infection',
      'It must be gout',
      'Nothing is happening',
    ],
    answer: 0,
    explanation:
      'Inflammatory signs describe a response. Infection, crystals, trauma, and autoimmunity can all cause it.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: compare surveillance sites',
    problem:
      'Three exposures: particles from a skin wound in lymph, microbes circulating in blood, and microbes in the intestinal lumen.',
    steps: [
      'Skin-derived material travels in afferent lymph to **regional nodes**.',
      'Blood-borne microbes meet the **spleen’s** white pulp.',
      'Intestinal exposure is watched by epithelium and **MALT**.',
    ],
    conclusion: '==Map the compartment to the organ== before mapping the organ to a cell type.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Germinal center', back: 'Node site where B cells mutate and are selected.' },
      { front: 'Marginal zone', back: 'Splenic region that traps encapsulated bacteria.' },
      { front: 'Secretory IgA', back: 'Mucosal antibody that neutralizes without inflammation.' },
      { front: 'Sentinel node', back: 'First draining node, biopsied in cancer staging.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Germinal centers raise antibody affinity through mutation and selection.',
      'The spleen filters blood; nodes filter lymph; MALT guards surfaces.',
      '==Inflammation describes a response, not its cause.==',
      'Fever without a spleen is an emergency.',
    ],
  },
]);

const innate = defineDeck('anat-u8-l1', [
  {
    kind: 'title',
    title: 'Innate immunity and complement',
    subtitle:
      'The fast, built-in defenses that recognize danger and hold the line until antibodies arrive.',
    objectives: [
      'Name pattern-recognition receptors and what they detect.',
      'Explain phagocytosis and NK-cell killing.',
      'Order the complement pathways and their outcomes.',
      'Predict infections from complement deficiencies.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: in the first hours of an infection, which defenses are working?',
    options: ['Only antibodies', 'Innate defenses', 'Nothing yet', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Sensing danger',
    bullets: [
      '**Pattern recognition receptors** (such as Toll-like receptors) detect conserved microbial patterns (**PAMPs**).',
      'TLR4 senses lipopolysaccharide, TLR3 senses double-stranded RNA, TLR5 senses flagellin.',
      'Activation turns on NF-κB, cytokines, and signals ==needed to start adaptive immunity==.',
      '**Interferons α and β** make neighboring cells resist viruses and activate NK cells.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each receptor to the microbial pattern it senses.',
    pairs: [
      ['TLR4', 'Lipopolysaccharide (gram-negative wall)'],
      ['TLR3', 'Double-stranded viral RNA'],
      ['TLR5', 'Bacterial flagellin'],
    ],
    explanation: 'Each Toll-like receptor recognizes a pattern shared across many microbes.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Phagocytes and NK cells',
    image: 'ap-phagocytosis',
    caption: 'A neutrophil leaves the blood, moves toward the infection, and engulfs microbes.',
    bullets: [
      '**Neutrophils** arrive first, engulf, release reactive oxygen, and form **NETs**.',
      '**Macrophages** clean up, present antigen, and secrete IL-1, IL-6, and TNF.',
      '**Dendritic cells** carry antigen to T cells in nodes.',
      '**NK cells** kill cells ==missing self-MHC I== using perforin and granzymes.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order the steps of phagocytosis.',
    items: [
      'The phagocyte recognizes and attaches to the microbe',
      'The membrane engulfs it into a phagosome',
      'The phagosome fuses with lysosomes',
      'Enzymes and reactive oxygen destroy the microbe',
    ],
    explanation:
      'Attachment, engulfment, fusion, then killing. Opsonins make the first step much easier.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Complement pathways',
    image: 'ap-complement',
    caption:
      'Three starting routes (classical, lectin, alternative) converge on **C3 convertase**.',
    bullets: [
      '**Classical**: C1 binds antibody on antigen. **Lectin**: mannose-binding lectin. **Alternative**: spontaneous on microbes.',
      '**C3b** opsonizes; **C3a and C5a** recruit inflammation.',
      '**C5b–9** forms the ==membrane attack complex== (MAC).',
      'Regulators (factor H, CD55, CD59) protect our own cells.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each complement fragment to its job.',
    pairs: [
      ['C3b', 'Coats microbes for phagocytes (opsonization)'],
      ['C5a', 'Recruits and activates neutrophils'],
      ['C5b–9', 'Punches pores in membranes (MAC)'],
      ['C1', 'Starts the classical pathway on antibody'],
    ],
    explanation:
      'Different fragments have different physical consequences: coating, recruiting, or lysing.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Deficiency patterns',
    bullets: [
      '**Early (C1–C4)** defects: lupus-like autoimmunity from poor immune-complex clearance.',
      '**C3** deficiency: severe recurrent bacterial infections.',
      '**Late (C5–C9)** defects: ==recurrent Neisseria infections== because the MAC fails.',
      'Screen with **CH50** (classical) and **AH50** (alternative).',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each complement defect to its typical consequence.',
    pairs: [
      ['C2 or C4 deficiency', 'Lupus-like immune-complex disease'],
      ['C3 deficiency', 'Severe recurrent bacterial infections'],
      ['C5–C9 deficiency', 'Recurrent meningococcal infections'],
      ['Missing CD55 and CD59', 'Complement destroying red blood cells'],
    ],
    explanation:
      'Different components fail in different ways. Missing CD55/CD59 (as in PNH) leaves red cells unprotected.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Inflammation wiring',
    bullets: [
      '**Histamine**: vasodilation and leaky vessels. **Prostaglandins**: pain and fever.',
      '**Leukotrienes**: recruit cells and constrict bronchi. **Bradykinin**: pain and swelling.',
      'NSAIDs block prostaglandin production; antihistamines block H1 effects.',
      '**Granulomas** wall off TB and fungi ==when killing fails==.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each mediator to its main effect.',
    pairs: [
      ['Histamine', 'Vasodilation and leaky vessels'],
      ['Prostaglandins', 'Pain and fever'],
      ['Leukotrienes', 'Bronchoconstriction and cell recruitment'],
      ['Bradykinin', 'Pain and swelling'],
    ],
    explanation:
      'Many drugs work by blocking one mediator: NSAIDs block prostaglandins, antihistamines block histamine.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'An innate response in causal order',
    bullets: [
      'Recognition needs ==no prior learning==, unlike adaptive immunity.',
      'Signals change nearby vessels and recruit leukocytes from blood.',
      '**Opsonization** coats a target for phagocytes; **neutralization** blocks binding; **MAC** lyses.',
      'When asked what a molecule does, name its physical consequence.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Which outcome does each event produce?',
    bins: ['Opsonization', 'Neutralization', 'Lysis'],
    items: [
      ['C3b coating a bacterium', 0],
      ['Antibody blocking a toxin’s binding site', 1],
      ['Membrane attack complex forming a pore', 2],
      ['IgG coating a microbe for macrophages', 0],
      ['Antibody stopping a virus from entering cells', 1],
    ],
    explanation:
      'Coating helps phagocytes, blocking prevents attachment, and pores burst the target.',
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Complement: converge, then diverge',
    bullets: [
      'Three different starts converge on **C3 cleavage**.',
      'A central C3 defect affects broad opsonization; a terminal defect mainly loses the MAC.',
      '==Not every complement deficiency gives the same infections.==',
      'Name the failed stage, the missing output, and the consequence.',
    ],
  },
  {
    kind: 'example',
    section: 6,
    title: 'Worked example: localize a complement defect',
    problem:
      'Dataset 1: microbes are poorly coated by complement, but antibody is made. Dataset 2: coating works, but terminal membrane attack fails.',
    steps: [
      'Dataset 1: look at central activation and **C3b** availability.',
      'Dataset 2: recognition and coating work; the **terminal complex** is the problem.',
      'Neither is a total absence of immunity; ==different outputs are lost==.',
      'Choose a functional test that targets the suspected pathway.',
    ],
    conclusion: 'Immunity is a network of separable functions. Locate the failure.',
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Early defense versus specific memory',
    bullets: [
      'Innate defenses act ==in minutes to hours== while adaptive cells are still expanding.',
      'Innate cells also shape adaptive responses by presenting antigen.',
      'A flat early antibody curve does not mean no defense.',
      'The two systems work together; neither replaces the other.',
    ],
  },
  {
    kind: 'sort',
    section: 7,
    prompt: 'Is each defense innate or adaptive?',
    bins: ['Innate', 'Adaptive'],
    items: [
      ['Neutrophil phagocytosis', 0],
      ['Complement activation on a microbe', 0],
      ['IgG from plasma cells', 1],
      ['NK cells killing an infected cell', 0],
      ['Memory B cells', 1],
      ['Cytotoxic T cells killing a specific target', 1],
    ],
    explanation:
      'Innate defenses need no prior exposure; adaptive ones are antigen-specific and form memory.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'PAMP', back: 'Conserved microbial pattern sensed by innate receptors.' },
      { front: 'Opsonization', back: 'Coating with C3b or antibody to boost phagocytosis.' },
      { front: 'MAC', back: 'C5b–9 pore that lyses gram-negative bacteria and Neisseria.' },
      { front: 'NETs', back: 'DNA traps released by neutrophils to catch microbes.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Innate receptors recognize patterns without prior learning.',
      'Neutrophils arrive first; macrophages clean up and present; NK cells kill “missing self”.',
      '==Three complement pathways converge on C3, then split into coating, recruiting, and lysing.==',
      'Late complement defects mean recurrent Neisseria.',
    ],
  },
]);

const adaptive = defineDeck('anat-u8-l2', [
  {
    kind: 'title',
    title: 'Adaptive immunity, antibodies, and allergy',
    subtitle:
      'Specific, learned defenses: how they are selected, what antibodies do, and when they overreact.',
    objectives: [
      'Compare B and T cell subsets and MHC restriction.',
      'Explain antibody classes and functions.',
      'Order hypersensitivity types I–IV with examples.',
      'Interpret vaccine and allergy testing.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: why is a booster shot more effective than the first dose?',
    options: [
      'Memory cells respond faster and stronger',
      'The booster has a different germ',
      'It is not',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Lymphocyte subsets',
    bullets: [
      '**CD8** cytotoxic T cells kill infected cells shown on **MHC I** (all nucleated cells).',
      '**CD4** helper T cells see **MHC II** on antigen-presenting cells.',
      'Th1: macrophages and intracellular microbes. Th2: B cells, parasites, allergy. Th17: neutrophils and fungi. **Treg**: suppression.',
      'B cells become plasma cells or memory cells; ==memory makes the second response faster==.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each T cell subset to its main job.',
    pairs: [
      ['CD8 cytotoxic T cell', 'Kills infected cells via MHC I'],
      ['Th1 helper', 'Activates macrophages against intracellular microbes'],
      ['Th2 helper', 'Helps B cells and eosinophils; parasites and allergy'],
      ['Regulatory T cell', 'Suppresses excessive or self-directed responses'],
    ],
    explanation: 'Each subset coordinates a different kind of defense.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'The antibody toolkit',
    image: 'ap-antibody',
    caption:
      'An antibody: two heavy and two light chains. **Variable** tips bind antigen; the **constant** region sets its class.',
    bullets: [
      '**IgM**: first responder, a pentamer, strong complement activator.',
      '**IgG**: crosses the placenta, opsonizes, mediates ADCC.',
      '**IgA**: guards mucosa as a dimer. **IgE**: binds mast cells; allergy and parasites.',
      '**IgD**: mainly a B-cell receptor.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each antibody class to its signature role.',
    pairs: [
      ['IgM', 'First antibody made; pentamer'],
      ['IgG', 'Crosses the placenta'],
      ['IgA', 'Protects mucosal surfaces'],
      ['IgE', 'Triggers mast cells in allergy'],
    ],
    explanation: 'Learn one mechanistic role per class before adding exceptions.',
  },
  {
    kind: 'compare',
    section: 2,
    title: 'The hypersensitivity map',
    columns: ['Type', 'Mechanism', 'Examples'],
    rows: [
      ['I — immediate', '**IgE** on mast cells; minutes', 'Anaphylaxis, asthma, food allergy'],
      [
        'II — cytotoxic',
        '**Antibody** against cell-surface antigens',
        'Transfusion reaction, myasthenia gravis',
      ],
      ['III — immune complex', '**Antigen-antibody complexes** deposit', 'Lupus, serum sickness'],
      [
        'IV — delayed',
        '**T cells**; 48–72 hours',
        'Poison ivy, TB skin test, transplant rejection',
      ],
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Which hypersensitivity type is each reaction?',
    bins: ['Type I', 'Type II', 'Type III', 'Type IV'],
    items: [
      ['Peanut anaphylaxis', 0],
      ['Mismatched blood transfusion', 1],
      ['Lupus kidney disease', 2],
      ['Poison ivy rash', 3],
      ['Positive TB skin test', 3],
      ['Bee-sting hives in minutes', 0],
    ],
    explanation:
      'Type I is IgE and fast, II is antibody against cells, III is immune complexes, and IV is T cells and slow.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Anaphylaxis',
    bullets: [
      '**Intramuscular epinephrine first**, then airway, fluids, and supportive drugs.',
      '**Biphasic** reactions can return hours later, so ==observe after severe events==.',
    ],
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Vaccines and herd effects',
    bullets: [
      '**Live attenuated** vaccines replicate weakly; avoid them in pregnancy and severe immunodeficiency.',
      '**Inactivated, subunit, toxoid, and mRNA** vaccines do not replicate.',
      'Adjuvants boost responses; boosters refresh memory and affinity.',
      '**Herd immunity** protects people who cannot be vaccinated ==when coverage is high==.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Does each vaccine type replicate in the body?',
    bins: ['Live (replicates weakly)', 'Non-live (does not replicate)'],
    items: [
      ['Live attenuated measles vaccine', 0],
      ['Tetanus toxoid', 1],
      ['mRNA vaccine', 1],
      ['Subunit hepatitis B vaccine', 1],
      ['Live oral rotavirus vaccine', 0],
    ],
    explanation:
      'Live vaccines are avoided in severe immunodeficiency because even weakened organisms can cause disease.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Testing and counseling',
    bullets: [
      'Skin prick and specific IgE show **sensitization**, ==not proof of clinical allergy==.',
      'Supervised **food challenges** are the gold standard.',
      'Counsel avoidance, label reading, an action plan, and carrying epinephrine.',
      'Asthma plus food allergy raises the risk of a fatal reaction.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'A child has a positive peanut skin-prick test but has eaten peanuts with no reaction. What does this show?',
    options: [
      'Sensitization without proven clinical allergy',
      'Definite peanut allergy',
      'A complement deficiency',
      'Lactose intolerance',
    ],
    answer: 0,
    explanation:
      'False positives are common. History, and if needed a supervised challenge, decide clinical allergy.',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'Activation, selection, expansion, differentiation',
    steps: [
      {
        label: 'Specificity exists',
        detail: 'Each lymphocyte’s receptor is set during development.',
      },
      { label: 'Selection', detail: 'Antigen plus the right signals selects matching clones.' },
      { label: 'Expansion', detail: 'Selected clones divide into many identical cells.' },
      {
        label: 'Differentiation',
        detail: 'Cells become effectors (plasma, cytotoxic) and memory.',
      },
    ],
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Clonal selection and MHC',
    bullets: [
      '==Antigen selects existing receptors==; it does not redesign them.',
      '**MHC I** shows inside-the-cell peptides to **CD8** T cells.',
      '**MHC II** on professional APCs shows outside-derived peptides to **CD4** T cells.',
      'Find the antigen’s source compartment before choosing the T-cell type.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'A virus is replicating inside a liver cell. Which T cell recognizes it, and on which MHC?',
    options: [
      'CD8 T cell, on MHC I',
      'CD4 T cell, on MHC I',
      'CD8 T cell, on MHC II',
      'B cell, on MHC II',
    ],
    answer: 0,
    explanation:
      'Peptides made inside a cell are shown on MHC I, which all nucleated cells use, to CD8 cytotoxic T cells.',
  },
  {
    kind: 'compare',
    section: 6,
    title: 'Three different antibody changes',
    columns: ['Change', 'What changes', 'What stays'],
    rows: [
      ['Class switching', 'Constant region (e.g. IgM → IgG)', '**The antigen target**'],
      ['Affinity maturation', 'Variable region gets tighter binding', 'The general target'],
      ['More antibody', 'Quantity', '**Binding strength** is not implied'],
    ],
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Memory changes the curve',
    image: 'ap-immune-response',
    bullets: [
      'A **secondary** response starts sooner and is larger, mostly **IgG**.',
      'Timing and size vary with antigen, host, and what is measured.',
      'Antibody level is ==one immune output, not total protection==.',
      'Not every adverse reaction to food or a drug is IgE-mediated allergy.',
    ],
  },
  {
    kind: 'example',
    section: 7,
    title: 'Worked example: a faster second response',
    problem:
      'First exposure: a delayed, small antibody rise. Later exposure to the same antigen: an earlier, larger rise.',
    steps: [
      'The controlled comparison: same antigen, different exposure history.',
      '**Memory cells** explain the shorter delay and bigger response.',
      'The antibodies have not switched targets; specificity and class are different properties.',
    ],
    conclusion: 'Memory changes ==how the system responds==; read the graph by its actual axes.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'MHC I vs MHC II',
        back: 'MHC I shows to CD8 T cells; MHC II shows to CD4 T cells.',
      },
      { front: 'IgE', back: 'Mast-cell antibody behind immediate allergy.' },
      { front: 'Type III hypersensitivity', back: 'Damage from deposited immune complexes.' },
      { front: 'Treg', back: 'Regulatory T cell that suppresses autoimmunity.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'CD8 T cells recognize peptides on MHC {0}. The first antibody in a primary response is {1}, while {2} is the class that crosses the placenta.',
    blanks: ['I', 'IgM', 'IgG'],
    distractors: ['II', 'IgE', 'IgA'],
    explanation: 'CD8 pairs with MHC I, IgM comes first, and IgG crosses the placenta.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'CD8 sees MHC I; CD4 sees MHC II on antigen-presenting cells.',
      'Each antibody class has a signature job.',
      '==Hypersensitivity: I is IgE, II is antibody on cells, III is complexes, IV is T cells.==',
      'Memory makes the second response faster and bigger.',
    ],
  },
]);

export const anatomyDecksImmune: Deck[] = [lymphoid, defenseSites, innate, adaptive];
