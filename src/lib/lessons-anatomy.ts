import type { EventLessons } from './lessons';

export const anatomyLessons: EventLessons = {
  eventId: 'anatomy-and-physiology',
  eventName: 'Anatomy and Physiology',
  instructor: 'Yingling Yang',
  intro:
    'Division C Anatomy & Physiology: respiratory, digestive, and immune systems. Build from anatomical language and homeostasis through organ anatomy, physiology calculations, pathophysiology, and case-based application.',
  units: [
    {
      id: 'anat-u1',
      title: 'Unit 1: Intro to the Human Body',
      description: 'Anatomical terms, planes, homeostasis, and levels of organization.',
      lessonIds: ['anat-u1-l1', 'anat-u1-l2'],
    },
    {
      id: 'anat-u2',
      title: 'Unit 2: Respiratory Anatomy',
      description: 'Conducting and respiratory zones, lungs, alveoli, pleura, and breathing muscles.',
      lessonIds: ['anat-u2-l1', 'anat-u2-l2'],
    },
    {
      id: 'anat-u3',
      title: 'Unit 3: Respiratory Physiology',
      description: 'Ventilation, lung volumes, gas exchange, oxygen transport, and control of breathing.',
      lessonIds: ['anat-u3-l1', 'anat-u3-l2'],
    },
    {
      id: 'anat-u4',
      title: 'Unit 4: Respiratory Pathophysiology',
      description: 'COPD, asthma, emphysema, pneumonia, and respiratory case reasoning.',
      lessonIds: ['anat-u4-l1', 'anat-u4-l2'],
    },
    {
      id: 'anat-u5',
      title: 'Unit 5: Digestive Anatomy & Physiology',
      description: 'Alimentary canal, accessory organs, enzymes, absorption, and regulation.',
      lessonIds: ['anat-u5-l1', 'anat-u5-l2'],
    },
    {
      id: 'anat-u6',
      title: 'Unit 6: Digestive Pathophysiology',
      description: 'Ulcers, GI cancers, lactose intolerance, obesity, and exercise effects.',
      lessonIds: ['anat-u6-l1', 'anat-u6-l2'],
    },
    {
      id: 'anat-u7',
      title: 'Unit 7: Immune Anatomy',
      description: 'Marrow, thymus, spleen, nodes, MALT, and anatomical barriers.',
      lessonIds: ['anat-u7-l1', 'anat-u7-l2'],
    },
    {
      id: 'anat-u8',
      title: 'Unit 8: Immune Physiology',
      description: 'Innate, complement, adaptive immunity, antibodies, and allergy.',
      lessonIds: ['anat-u8-l1', 'anat-u8-l2'],
    },
    {
      id: 'anat-u9',
      title: 'Unit 9: Immune Pathophysiology',
      description: 'Immunodeficiency, autoimmunity, hypersensitivity, and anaphylaxis.',
      lessonIds: ['anat-u9-l1', 'anat-u9-l2'],
    },
    {
      id: 'anat-u10',
      title: 'Unit 10: Real-World Application',
      description: 'Case studies, medical imaging, vitals interpretation, and competition strategy.',
      lessonIds: ['anat-u10-l1', 'anat-u10-l2'],
    },
  ],
  lessons: [
    {
      id: 'anat-u1-l1',
      unitId: 'anat-u1',
      title: 'Anatomical Language, Planes, and Organization',
      durationMin: 28,
      kind: 'text',
      objectives: [
        'Use directional, regional, and sectional terms precisely',
        'Identify sagittal, frontal, transverse planes and common sections',
        'Order levels of organization from chemical to organismal',
        'Apply body cavities and membranes to organ location questions',
      ],
      sections: [
        {
          heading: 'Anatomical position and directional terms',
          body: [
            'All anatomy descriptions assume anatomical position: standing erect, feet parallel, arms at sides with palms forward, head and eyes forward. Proximal means closer to the trunk or point of origin, distal means farther away. Superior and inferior replace above and below to avoid confusion in quadrupeds, while anterior and ventral both mean toward the front and posterior and dorsal mean toward the back in humans.',
            'Medial means toward the midline, lateral means away from it. Superficial means toward the surface, deep means internal. Ipsilateral structures are on the same side, contralateral on opposite sides. Competition questions love limb examples: the elbow is proximal to the wrist, the patella is anterior to the femur, and the lungs are lateral to the heart.',
          ],
        },
        {
          heading: 'Planes and sections',
          body: [
            'The sagittal plane divides left from right. A midsagittal plane passes through the midline, a parasagittal plane is offset. The frontal or coronal plane divides anterior from posterior. The transverse or horizontal plane divides superior from inferior, producing cross sections. Oblique sections cut at an angle and are rarely named on tests.',
            'Learn to read sections: a transverse section through the abdomen shows the peritoneum surrounding gut, rectus abdominis anteriorly, and erector spinae posteriorly. A frontal section through the thorax shows both lungs, heart, and diaphragm in one view. Practice mentally rotating structures because test diagrams often use small inset orientation icons.',
          ],
        },
        {
          heading: 'Body cavities and membranes',
          body: [
            'The dorsal cavity includes cranial and vertebral cavities housing brain and spinal cord, lined by meninges. The ventral cavity splits at the diaphragm into thoracic and abdominopelvic cavities. The thoracic cavity contains pleural cavities around each lung, the pericardial cavity around the heart, and the mediastinum between them.',
            'The abdominopelvic cavity contains peritoneal and retroperitoneal organs. Intra-peritoneal organs such as stomach, jejunum, and transverse colon are wrapped by visceral peritoneum, while kidneys, pancreas, and much of the duodenum are retroperitoneal. Parietal membranes line walls, visceral membranes cover organs, and serous fluid reduces friction. Pericarditis, pleurisy, and peritonitis questions test this directly.',
          ],
        },
        {
          heading: 'Levels of organization',
          body: [
            'Chemical, cellular, tissue, organ, organ system, organism. The four tissue classes are epithelial, connective, muscle, and nervous. Epithelia are classified by layers and cell shape: simple squamous for diffusion in alveoli, stratified squamous for protection in esophagus, pseudostratified ciliated columnar in airways, simple columnar with microvilli in intestine.',
            'Connective tissue ranges from loose areolar to dense regular tendon, cartilage, bone, and blood. Muscle includes skeletal, cardiac, and smooth. Organs combine tissues: the stomach has mucosa, submucosa, muscularis externa with three muscle layers, and serosa. Systems integrate organs: respiratory plus cardiovascular deliver oxygen.',
          ],
        },
        {
          heading: 'Competition traps',
          body: [
            'Watch for proximal versus superior on the trunk, and transverse versus cross terminology. A midsagittal brain section shows the corpus callosum, while a transverse lung section shows segmental bronchi in cross section. When a question says deep to the trapezius, think rhomboids and erector spinae, not skin.',
            'Memorize nine abdominopelvic regions and four quadrants because digestive and immune questions reuse them: liver mostly right hypochondriac and epigastric, appendix in right iliac, spleen in left hypochondriac. Pair each organ with cavity, peritoneum status, and quadrant for fast recall.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Anatomical position', definition: 'Standard reference posture with palms forward used for all directional descriptions.' },
        { term: 'Midsagittal plane', definition: 'Midline plane dividing body into equal left and right halves.' },
        { term: 'Mediastinum', definition: 'Central thoracic compartment containing heart, thymus, trachea, and esophagus.' },
        { term: 'Retroperitoneal', definition: 'Behind the parietal peritoneum; e.g. kidneys, pancreas, duodenum.' },
        { term: 'Serous membrane', definition: 'Parietal plus visceral layers with lubricating serous fluid.' },
        { term: 'Pseudostratified epithelium', definition: 'Single cell layer appearing stratified; ciliated type lines most airways.' },
      ],
      simulation: {
        kind: 'flashcards',
        title: 'Plane and cavity drill',
        instructions: 'Flip each card. Say the answer aloud before revealing.',
        cards: [
          { front: 'Divides anterior from posterior', back: 'Frontal / coronal plane' },
          { front: 'Lines the wall of a cavity', back: 'Parietal serous membrane' },
          { front: 'Right lower quadrant organ, intraperitoneal pouch', back: 'Appendix / cecum' },
          { front: 'Single layer, flat cells, diffusion', back: 'Simple squamous epithelium' },
          { front: 'Brain + spinal cord cavities', back: 'Dorsal cavity: cranial + vertebral' },
        ],
      },
      practice: [
        {
          id: 'anat-u1-l1-q1',
          prompt: 'The sternum is ___ to the heart and the elbow is ___ to the wrist.',
          type: 'mcq',
          options: ['anterior; proximal', 'posterior; distal', 'anterior; distal', 'superior; proximal'],
          answer: 'anterior; proximal',
          explanation: 'Sternum lies in front of heart; elbow is closer to trunk than wrist.',
        },
        {
          id: 'anat-u1-l1-q2',
          prompt: 'Which plane produces a cross section through the small intestine showing lumen, mucosa, and muscularis in rings?',
          type: 'mcq',
          options: ['Midsagittal', 'Frontal', 'Transverse', 'Oblique'],
          answer: 'Transverse',
          explanation: 'Transverse cuts perpendicular to the gut tube, giving concentric rings.',
        },
        {
          id: 'anat-u1-l1-q3',
          prompt: 'Name one retroperitoneal organ and why it matters for peritonitis spread.',
          type: 'short',
          answer: 'Kidney / pancreas / duodenum; infection is contained behind peritoneum and may present as back pain rather than diffuse peritonitis.',
          explanation: 'Retroperitoneal organs are behind the peritoneal sac, altering pain and spread patterns.',
        },
        {
          id: 'anat-u1-l1-q4',
          prompt: 'Pseudostratified ciliated columnar epithelium is found in the:',
          type: 'mcq',
          options: ['Alveoli', 'Trachea and bronchi', 'Esophagus', 'Bladder'],
          answer: 'Trachea and bronchi',
          explanation: 'Cilia plus goblet cells form the mucociliary escalator.',
        },
        {
          id: 'anat-u1-l1-q5',
          prompt: 'The heart sits in which cavity and is wrapped by which serous layers?',
          type: 'short',
          answer: 'Pericardial cavity in mediastinum; parietal and visceral pericardium with serous fluid.',
          explanation: 'Parietal lines the sac, visceral covers the heart.',
        },
      ],
    },
    {
      id: 'anat-u1-l2',
      unitId: 'anat-u1',
      title: 'Homeostasis, Feedback, and Gradients',
      durationMin: 30,
      kind: 'text',
      objectives: [
        'Explain negative vs positive feedback with physiological examples',
        'Predict responses to temperature, glucose, calcium, and pressure disturbances',
        'Relate diffusion, osmosis, and membrane potential to homeostasis',
        'Interpret a homeostasis disruption case',
      ],
      sections: [
        {
          heading: 'Components of control',
          body: [
            'Homeostasis keeps variables near a set point using receptor, control center, and effector. The receptor senses change, the control center compares input to the set point, and the effector produces output. Negative feedback reverses the initial change; positive feedback amplifies it until a climax event ends the loop.',
            'Example: rising blood glucose is sensed by pancreatic beta cells, insulin is released, liver and muscle take up glucose, and glucose falls. Falling blood pressure is sensed by carotid baroreceptors, the medulla increases sympathetic output, heart rate and vasoconstriction rise, and pressure returns toward normal.',
          ],
        },
        {
          heading: 'Negative feedback systems to memorize',
          body: [
            'Thermoregulation: hypothalamus compares core temperature. Heat loss uses cutaneous vasodilation and sweating; heat gain uses vasoconstriction, shivering, and piloerection. Thyroid hormone sets basal metabolic rate over days, while rapid control is neural.',
            'Calcium: parathyroid hormone raises blood calcium by bone resorption, renal reabsorption, and vitamin D activation; calcitonin opposes it. Blood pressure, blood oxygen, and blood pH all use medullary and chemoreceptor loops. For tests, draw the loop and label where the variable is sensed versus where correction occurs.',
          ],
        },
        {
          heading: 'Positive feedback that matters',
          body: [
            'Childbirth: oxytocin strengthens uterine contractions, which stretch the cervix, which releases more oxytocin until delivery. Blood clotting: activated platelets release ADP and thromboxane, recruiting more platelets. Action potentials: sodium entry depolarizes membrane, opening more sodium channels.',
            'Pathological positive feedback includes fever spirals, hypoxia-driven pulmonary vasoconstriction, and heart failure dilation. If a question asks why a loop does not maintain stability, answer that it drives the system away from the set point toward a defined endpoint.',
          ],
        },
        {
          heading: 'Membranes, gradients, and transport',
          body: [
            'Diffusion moves down concentration gradients; oxygen crosses alveoli and glucose enters cells this way when channels allow. Osmosis is water movement toward higher solute. Isotonic solutions preserve cell volume, hypotonic solutions swell cells, hypertonic solutions crenate them. IV fluids are isotonic for this reason.',
            'Active transport uses ATP against gradients, such as the sodium-potassium pump maintaining resting membrane potential. Facilitated diffusion uses carriers without ATP. In the gut and kidney, sodium-coupled glucose transport links gradients to absorption, a favorite crossover question.',
          ],
        },
        {
          heading: 'From molecule to test question',
          body: [
            'Homeostasis questions often combine systems: dehydration raises osmolarity, ADH rises, aquaporins insert, water reabsorption increases, urine concentrates, and thirst drives intake. High altitude lowers PO2, chemoreceptors raise ventilation, kidneys release EPO, red cell mass rises over days.',
            'When interpreting a case, first name the variable, set point, sensor, and effector, then state whether feedback is negative or positive and predict the next change. Include units and normal ranges when given: pH 7.35-7.45, PaCO2 35-45 mmHg, fasting glucose near 70-100 mg/dL.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Negative feedback', definition: 'Output reverses the stimulus to restore set point.' },
        { term: 'Positive feedback', definition: 'Output amplifies the stimulus toward a climax.' },
        { term: 'Baroreceptor', definition: 'Stretch receptor sensing blood pressure in carotid and aorta.' },
        { term: 'Osmolarity', definition: 'Solute concentration determining water movement.' },
        { term: 'Set point', definition: 'Target value maintained by a control loop.' },
        { term: 'Chemoreceptor', definition: 'Sensor for CO2, pH, and O2 driving ventilation.' },
      ],
      simulation: {
        kind: 'scenario',
        title: 'Feedback loop diagnosis',
        instructions: 'Choose the best next step in each homeostatic disruption.',
        steps: [
          {
            prompt: 'Core temp 39.5 C after heat exposure. Skin hot and dry. First correction?',
            options: ['Move to cool area, hydrate, active cooling', ' Vigorous exercise to sweat', 'Drink alcohol to vasodilate'],
            correct: 0,
            feedback: 'Remove heat load, replace fluid, and promote heat loss.',
          },
          {
            prompt: 'Fasting glucose 55 mg/dL, shaky and sweaty. Correct loop?',
            options: ['Give fast glucose, recheck', 'Give insulin', 'Wait without intake'],
            correct: 0,
            feedback: 'Hypoglycemia needs rapid glucose; insulin would worsen it.',
          },
          {
            prompt: 'Hemorrhage with falling BP. Baroreceptor response?',
            options: ['Increased sympathetic output', 'Decreased heart rate only', 'No change until transfusion'],
            correct: 0,
            feedback: 'Sympathetic activation raises rate, contractility, and vascular tone.',
          },
        ],
      },
      practice: [
        {
          id: 'anat-u1-l2-q1',
          prompt: 'Oxytocin-driven labor is an example of:',
          type: 'mcq',
          options: ['Negative feedback', 'Positive feedback', 'Feedforward only', 'No feedback'],
          answer: 'Positive feedback',
          explanation: 'Contractions amplify oxytocin until delivery ends the loop.',
        },
        {
          id: 'anat-u1-l2-q2',
          prompt: 'High blood calcium triggers which hormonal response?',
          type: 'mcq',
          options: ['More PTH', 'More calcitonin, less PTH', 'More ADH', 'More aldosterone'],
          answer: 'More calcitonin, less PTH',
          explanation: 'Calcitonin lowers calcium; PTH is suppressed.',
        },
        {
          id: 'anat-u1-l2-q3',
          prompt: 'Explain why isotonic saline is used for volume replacement rather than pure water.',
          type: 'short',
          answer: 'Isotonic fluid stays extracellular and preserves red cell volume; pure water would cause osmotic hemolysis and cellular swelling.',
          explanation: 'Tonicity determines water shifts across membranes.',
        },
        {
          id: 'anat-u1-l2-q4',
          prompt: 'Carotid baroreceptors sense falling pressure and signal the:',
          type: 'mcq',
          options: ['Hypothalamus', 'Medulla cardiovascular center', 'Cerebellum', 'Thymus'],
          answer: 'Medulla cardiovascular center',
          explanation: 'Medullary centers adjust autonomic output within seconds.',
        },
        {
          id: 'anat-u1-l2-q5',
          prompt: 'Cold exposure causes shivering and vasoconstriction. Name the control center.',
          type: 'short',
          answer: 'Hypothalamus, posterior thermoregulatory center.',
          explanation: 'Hypothalamus integrates core and skin temperature.',
        },
      ],
    },
    {
      id: 'anat-u2-l1',
      unitId: 'anat-u2',
      title: 'Airways: From Nose to Bronchioles',
      durationMin: 32,
      kind: 'text',
      objectives: [
        'Trace airflow through conducting zone structures',
        'Relate cartilage, smooth muscle, and epithelium to function',
        'Explain mucociliary clearance and airway resistance',
        'Localize common obstruction and aspiration sites',
      ],
      sections: [
        {
          heading: 'Upper airway and filtration',
          body: [
            'Air enters through external nares into nasal cavities lined by pseudostratified ciliated epithelium with goblet cells. Turbinates create turbulence, warming air to near body temperature and humidifying it toward 100 percent. Olfactory epithelium superiorly and paranasal sinuses lighten the skull and resonate sound.',
            'The pharynx has nasopharynx with adenoids and auditory tube openings, oropharynx shared with food, and laryngopharynx directing flow. The larynx houses vocal cords, the epiglottis folding during swallowing, and C-shaped hyaline cartilages. The thyroid cartilage forms the laryngeal prominence; the cricoid is the only complete ring.',
          ],
        },
        {
          heading: 'Trachea and bronchial tree',
          body: [
            'The trachea has 16-20 C-shaped cartilages with trachealis smooth muscle posteriorly, allowing esophageal expansion. At the carina near T5-T7, it bifurcates. The right main bronchus is wider, shorter, and more vertical, so aspirated objects favor the right lower lobe.',
            'Bronchi gain plates of cartilage, bronchioles lose cartilage and gain smooth muscle. Terminal bronchioles mark the end of the conducting zone; respiratory bronchioles begin gas exchange. Asthma constricts bronchiolar smooth muscle, dramatically raising resistance because resistance scales with radius to the fourth power.',
          ],
        },
        {
          heading: 'Epithelium and clearance',
          body: [
            'Most conducting airways use pseudostratified ciliated columnar epithelium with mucus from goblet cells and submucosal glands. Cilia beat upward at 10-20 Hz, moving the mucus blanket toward the pharynx where it is swallowed. Smoking paralyzes cilia and causes goblet hyperplasia, producing chronic bronchitic cough.',
            'Club cells in bronchioles secrete surfactant-like protein and detoxify inhaled chemicals. Alveolar macrophages patrol distal spaces. Cystic fibrosis thickens mucus by defective chloride transport, crippling clearance and inviting Pseudomonas infection.',
          ],
        },
        {
          heading: 'Blood supply and innervation',
          body: [
            'Bronchial arteries from the aorta supply airway walls with systemic oxygenated blood, while pulmonary arteries deliver deoxygenated blood for gas exchange. Bronchial veins drain partly to pulmonary veins, creating a small normal anatomical shunt that slightly lowers systemic PaO2.',
            'Parasympathetic vagal fibers constrict bronchioles and increase secretions; sympathetic beta-2 activation dilates bronchioles and is the target of albuterol. Irritant receptors trigger cough, J receptors trigger rapid shallow breathing in edema.',
          ],
        },
        {
          heading: 'High-yield clinical links',
          body: [
            'Croup causes subglottic barky cough in children; epiglottitis causes drooling and tripod positioning and is an airway emergency. Foreign body aspiration classically causes unilateral wheeze, worse on the right. Bronchoscopy follows the same path you trace on tests.',
            'For competition diagrams, label turbinates, auditory tube, epiglottis, thyroid and cricoid cartilages, carina, main bronchi, and lobar bronchi. Note that the right lung has three lobes and ten segments while the left has two lobes, eight segments, and a lingula.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Carina', definition: 'Tracheal bifurcation ridge; sensitive cough trigger.' },
        { term: 'Mucociliary escalator', definition: 'Cilia-driven upward mucus transport to pharynx.' },
        { term: 'Trachealis', definition: 'Posterior smooth muscle allowing esophageal bulge.' },
        { term: 'Club cells', definition: 'Bronchiolar secretory cells with detox and repair roles.' },
        { term: 'Beta-2 dilation', definition: 'Sympathetic bronchodilation targeted by rescue inhalers.' },
        { term: 'Anatomical shunt', definition: 'Bronchial venous drainage lowering systemic oxygen slightly.' },
      ],
      simulation: {
        kind: 'checklist',
        title: 'Airway trace check',
        instructions: 'Mentally trace each step in order before checking it off.',
        items: [
          { label: 'Nasal cavity warming', detail: 'Turbinates, mucus, and rich vessels condition air.' },
          { label: 'Pharynx to larynx guard', detail: 'Epiglottis covers glottis during swallow.' },
          { label: 'Trachea to carina', detail: 'C-rings keep airway open; carina at T5-T7.' },
          { label: 'Right main bronchus risk', detail: 'Wider and more vertical; aspiration favors right.' },
          { label: 'Bronchiole resistance', detail: 'Smooth muscle tone controls fourth-power resistance.' },
        ],
      },
      practice: [
        {
          id: 'anat-u2-l1-q1',
          prompt: 'Aspirated peanut most likely lodges in which bronchus and why?',
          type: 'mcq',
          options: ['Left, narrower', 'Right, wider and more vertical', 'Left, more horizontal', 'Trachea only'],
          answer: 'Right, wider and more vertical',
          explanation: 'Right main bronchus anatomy favors aspiration.',
        },
        {
          id: 'anat-u2-l1-q2',
          prompt: 'Which cells and structures drive mucociliary clearance?',
          type: 'short',
          answer: 'Ciliated pseudostratified cells plus goblet mucus; cilia beat toward pharynx.',
          explanation: 'Clearance requires both mucus and coordinated ciliary beating.',
        },
        {
          id: 'anat-u2-l1-q3',
          prompt: 'Albuterol relieves bronchospasm by acting on:',
          type: 'mcq',
          options: ['Alpha-1 receptors', 'Beta-2 receptors', 'Muscarinic receptors', 'Histamine receptors'],
          answer: 'Beta-2 receptors',
          explanation: 'Beta-2 activation relaxes bronchiolar smooth muscle.',
        },
        {
          id: 'anat-u2-l1-q4',
          prompt: 'The carina is located at approximately:',
          type: 'mcq',
          options: ['C3', 'T5-T7', 'T12', 'L2'],
          answer: 'T5-T7',
          explanation: 'Bifurcation near the sternal angle level.',
        },
        {
          id: 'anat-u2-l1-q5',
          prompt: 'Explain why airway resistance rises sharply in asthma.',
          type: 'short',
          answer: 'Smooth muscle constriction, mucosal edema, and mucus narrow radius; resistance is proportional to 1/r^4.',
          explanation: 'Small radius changes cause large resistance changes.',
        },
      ],
    },
    {
      id: 'anat-u2-l2',
      unitId: 'anat-u2',
      title: 'Lungs, Alveoli, Pleura, and Breathing Muscles',
      durationMin: 30,
      kind: 'video',
      videoUrl: '',
      objectives: [
        'Describe lobes, fissures, segments, and pleural layers',
        'Explain alveolar structure and surfactant',
        'Identify inspiratory and expiratory muscles and pressures',
        'Interpret pneumothorax and pleural effusion findings',
      ],
      sections: [
        {
          heading: 'Lobes and surfaces',
          body: [
            'The right lung has upper, middle, and lower lobes divided by horizontal and oblique fissures; the left has upper and lower lobes with an oblique fissure and cardiac notch. The base sits on the diaphragm, the apex rises above the clavicle, and the hilum admits bronchi, vessels, and nerves.',
            'Bronchopulmonary segments are surgical units with independent bronchi and vessels: ten on the right, eight on the left. Pneumonia often respects lobar boundaries, so right middle lobe pneumonia obscures the right heart border on X-ray.',
          ],
        },
        {
          heading: 'Alveoli and gas-exchange membrane',
          body: [
            'About 300 million alveoli provide 70 square meters of surface. Type I pneumocytes are thin diffusion cells, type II cells secrete surfactant and repair epithelium, and macrophages clear debris. The membrane includes alveolar epithelium, fused basal lamina, and capillary endothelium, often under 0.5 micrometers thick.',
            'Surfactant is dipalmitoylphosphatidylcholine plus proteins that lowers surface tension and prevents collapse, especially in small alveoli where Laplace pressure is highest. Premature infants lacking surfactant develop respiratory distress syndrome, treated with exogenous surfactant and CPAP.',
          ],
        },
        {
          heading: 'Pleura and pressures',
          body: [
            'Visceral pleura coats the lung, parietal pleura lines the chest wall, diaphragm, and mediastinum. The pleural space normally has a thin fluid film and negative pressure around minus 4 mmHg, coupling lung to chest wall. The costodiaphragmatic recess allows lung expansion.',
            'Pneumothorax introduces air into the pleural space, collapsing lung and shifting the trachea away in tension physiology. Hemothorax and pleural effusion blunt costophrenic angles. Pleuritic pain worsens with breathing because inflamed parietal pleura is pain-sensitive.',
          ],
        },
        {
          heading: 'Muscles and mechanics',
          body: [
            'Quiet inspiration uses the diaphragm and external intercostals; the diaphragm contracts downward, increasing vertical thoracic volume. Forced inspiration recruits scalenes, sternocleidomastoid, and pectoralis minor. Quiet expiration is passive elastic recoil; forced expiration uses abdominals and internal intercostals.',
            'Boyle law links volume and pressure: larger thoracic volume lowers alveolar pressure below atmosphere, driving inflow. Compliance measures distensibility, elastance is its inverse. Fibrosis lowers compliance, emphysema raises it but destroys recoil.',
          ],
        },
        {
          heading: 'Watch in the video and on diagrams',
          body: [
            'Pause the video at the alveolar-capillary close-up and label type I, type II, macrophage, capillary, and fused basement membrane. On a frontal chest diagram, trace visceral versus parietal pleura and mark the costodiaphragmatic angle.',
            'Practice pressure reasoning: during inspiration pleural pressure becomes more negative, alveolar pressure becomes slightly negative, and air flows in. During pneumothorax, pleural pressure equilibrates with atmosphere and the lung recoils inward.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Surfactant', definition: 'Type II cell secretion lowering alveolar surface tension.' },
        { term: 'Hilum', definition: 'Medial lung root entry for bronchus, vessels, nerves.' },
        { term: 'Pleural pressure', definition: 'Normally negative pressure coupling lung and wall.' },
        { term: 'Compliance', definition: 'Volume change per pressure change; distensibility.' },
        { term: 'Tension pneumothorax', definition: 'One-way air leak with mediastinal shift; emergency.' },
        { term: 'Type I pneumocyte', definition: 'Thin squamous cell forming most alveolar wall.' },
      ],
      simulation: {
        kind: 'slider',
        title: 'Surfactant and alveolar stability',
        instructions: 'Move surfactant from low to high and predict small-alveolus behavior.',
        min: 0,
        max: 100,
        step: 10,
        defaultValue: 20,
        unit: '% surfactant',
        scenarios: [
          { value: 0, label: 'Premature, no surfactant', outcome: 'High surface tension; small alveoli collapse and atelectasis spreads.' },
          { value: 40, label: 'Partial deficiency', outcome: 'Increased work of breathing; CPAP helps stent airways.' },
          { value: 100, label: 'Normal surfactant', outcome: 'Low tension, stable alveoli, preserved functional residual capacity.' },
        ],
      },
      practice: [
        {
          id: 'anat-u2-l2-q1',
          prompt: 'Type II pneumocytes produce:',
          type: 'mcq',
          options: ['Mucus', 'Surfactant', 'HCl', 'Antibodies'],
          answer: 'Surfactant',
          explanation: 'Surfactant prevents alveolar collapse.',
        },
        {
          id: 'anat-u2-l2-q2',
          prompt: 'Normal pleural pressure during quiet breathing is:',
          type: 'mcq',
          options: ['Positive 10 mmHg', 'Atmospheric', 'Negative around -4 mmHg', 'Equal to alveolar'],
          answer: 'Negative around -4 mmHg',
          explanation: 'Negative pressure keeps lungs inflated against recoil.',
        },
        {
          id: 'anat-u2-l2-q3',
          prompt: 'Explain tracheal shift in tension pneumothorax.',
          type: 'short',
          answer: 'Pressurized pleural air pushes mediastinum to the opposite side, compressing the good lung and vena cava.',
          explanation: 'One-way valve physiology creates pressure buildup.',
        },
        {
          id: 'anat-u2-l2-q4',
          prompt: 'Quiet inspiration is driven mainly by:',
          type: 'mcq',
          options: ['Abdominals', 'Diaphragm + external intercostals', 'Internal intercostals', 'Sternocleidomastoid alone'],
          answer: 'Diaphragm + external intercostals',
          explanation: 'Accessory muscles are for forced inspiration.',
        },
        {
          id: 'anat-u2-l2-q5',
          prompt: 'Why does right middle lobe pneumonia hide the right heart border?',
          type: 'short',
          answer: 'The lobe abuts the heart; consolidation removes the air-soft tissue interface (silhouette sign).',
          explanation: 'Adjacent densities merge on X-ray.',
        },
      ],
    },
    {
      id: 'anat-u3-l1',
      unitId: 'anat-u3',
      title: 'Ventilation, Volumes, and Spirometry',
      durationMin: 34,
      kind: 'text',
      objectives: [
        'Define tidal, reserve, residual volumes and capacities',
        'Calculate minute ventilation and alveolar ventilation',
        'Read obstructive vs restrictive spirograms',
        'Explain dead space and V/Q mismatch',
      ],
      sections: [
        {
          heading: 'Volumes and capacities',
          body: [
            'Tidal volume is about 500 mL, inspiratory reserve 3000 mL, expiratory reserve 1100 mL, residual volume 1200 mL. Vital capacity sums IRV plus TV plus ERV, roughly 4500 mL. Total lung capacity adds residual volume, near 6000 mL. Functional residual capacity is ERV plus RV, the resting end-expiratory volume.',
            'Spirometry measures volumes but not residual volume or total lung capacity; those need helium dilution or plethysmography. FEV1 is volume exhaled in one second, FVC is total forced exhaled volume. The FEV1/FVC ratio is normally above 0.70-0.80 in adults.',
          ],
        },
        {
          heading: 'Ventilation math',
          body: [
            'Minute ventilation equals tidal volume times respiratory rate, normally 6-8 L/min. Alveolar ventilation subtracts dead space: (TV minus anatomical dead space around 150 mL) times rate. Rapid shallow breathing wastes ventilation because dead space is a larger fraction.',
            'Example: TV 500 mL at 12 breaths gives 6.0 L/min minute ventilation but only (500-150) times 12 = 4.2 L/min alveolar ventilation. Doubling rate with halved TV can keep minute ventilation constant while dropping alveolar ventilation sharply.',
          ],
        },
        {
          heading: 'Obstructive vs restrictive',
          body: [
            'Obstruction lowers FEV1 more than FVC, so FEV1/FVC falls. The flow-volume loop shows scooped expiration. Asthma and COPD are obstructive; asthma reverses with bronchodilators while COPD responds poorly.',
            'Restriction lowers both FEV1 and FVC proportionally, preserving or raising the ratio, with small lung volumes and steep flow-volume curves. Pulmonary fibrosis, chest wall disease, and neuromuscular weakness restrict. Mixed patterns occur in advanced COPD with air trapping.',
          ],
        },
        {
          heading: 'Dead space and V/Q',
          body: [
            'Anatomical dead space is conducting airways; alveolar dead space is ventilated but unperfused alveoli; physiologic dead space sums both. Pulmonary embolism creates alveolar dead space, raising PaCO2 despite hyperventilation.',
            'Normal V/Q is about 0.8. Shunt is perfused but unventilated blood, as in pneumonia and atelectasis, causing hypoxemia resistant to supplemental oxygen. Dead space is ventilated but unperfused, as in embolism. Supplemental oxygen helps V/Q mismatch more than true shunt.',
          ],
        },
        {
          heading: 'Control of breathing preview',
          body: [
            'Central chemoreceptors in the medulla sense CSF pH driven by PaCO2; peripheral carotid bodies sense PaO2, pH, and PaCO2. Rising CO2 is the dominant resting drive. Hypoxic drive matters mainly in chronic CO2 retainers, where excess oxygen can blunt ventilation.',
            'On tests, link hyperventilation to respiratory alkalosis with low PaCO2, and hypoventilation to respiratory acidosis with high PaCO2. Anxiety hyperventilation causes tingling from low ionized calcium; rebreathing into a bag is no longer routinely advised.',
          ],
        },
      ],
      keyTerms: [
        { term: 'FEV1/FVC', definition: 'Ratio distinguishing obstructive from restrictive disease.' },
        { term: 'Alveolar ventilation', definition: '(TV minus dead space) times rate; effective gas exchange.' },
        { term: 'Anatomical dead space', definition: 'Conducting airway volume, about 150 mL.' },
        { term: 'Shunt', definition: 'Perfusion without ventilation; refractory hypoxemia.' },
        { term: 'Compliance curve', definition: 'Volume-pressure relationship of lung and chest wall.' },
        { term: 'Flow-volume loop', definition: 'Graph diagnosing obstruction and restriction patterns.' },
      ],
      simulation: {
        kind: 'slider',
        title: 'Rate vs depth lab',
        instructions: 'Adjust respiratory rate at fixed minute ventilation and observe alveolar ventilation.',
        min: 6,
        max: 30,
        step: 2,
        defaultValue: 12,
        unit: 'breaths/min',
        scenarios: [
          { value: 6, label: 'Slow deep: TV 1000 mL', outcome: 'Alveolar ventilation high: (1000-150)x6 = 5.1 L/min.' },
          { value: 12, label: 'Normal', outcome: 'Balanced: (500-150)x12 = 4.2 L/min.' },
          { value: 30, label: 'Rapid shallow: TV 200 mL', outcome: 'Alveolar ventilation collapses: (200-150)x30 = 1.5 L/min.' },
        ],
      },
      practice: [
        {
          id: 'anat-u3-l1-q1',
          prompt: 'Vital capacity equals:',
          type: 'mcq',
          options: ['TV + IRV', 'IRV + TV + ERV', 'ERV + RV', 'TV + RV'],
          answer: 'IRV + TV + ERV',
          explanation: 'VC is maximal exhaled volume after maximal inhalation.',
        },
        {
          id: 'anat-u3-l1-q2',
          prompt: 'FEV1/FVC 0.55 with reduced FEV1 suggests:',
          type: 'mcq',
          options: ['Restriction', 'Obstruction', 'Normal', 'Mixed only'],
          answer: 'Obstruction',
          explanation: 'Low ratio means expiratory flow limitation.',
        },
        {
          id: 'anat-u3-l1-q3',
          prompt: 'Calculate alveolar ventilation for TV 600 mL, dead space 150 mL, rate 10.',
          type: 'short',
          answer: '(600-150)x10 = 4500 mL/min.',
          explanation: 'Subtract dead space before multiplying by rate.',
        },
        {
          id: 'anat-u3-l1-q4',
          prompt: 'Pulmonary embolism creates increased:',
          type: 'mcq',
          options: ['Shunt', 'Alveolar dead space', 'Compliance', 'Residual volume'],
          answer: 'Alveolar dead space',
          explanation: 'Ventilation without perfusion wastes ventilation.',
        },
        {
          id: 'anat-u3-l1-q5',
          prompt: 'Why does supplemental O2 help V/Q mismatch more than true shunt?',
          type: 'short',
          answer: 'Raised alveolar PO2 can overcome low V/Q units but cannot reach unventilated shunt blood.',
          explanation: 'Shunt blood never contacts enriched alveolar gas.',
        },
      ],
    },
    {
      id: 'anat-u3-l2',
      unitId: 'anat-u3',
      title: 'Gas Exchange, Hemoglobin, and pH Control',
      durationMin: 34,
      kind: 'text',
      objectives: [
        'Explain oxygen-hemoglobin dissociation and cooperativity',
        'Interpret Bohr, Haldane, temperature, and 2,3-BPG shifts',
        'Describe CO2 transport and chloride shift',
        'Link ventilation to acid-base balance',
      ],
      sections: [
        {
          heading: 'Diffusion at the membrane',
          body: [
            'Fick law states diffusion is proportional to surface area and gradient and inversely proportional to thickness. Emphysema reduces area, fibrosis increases thickness, and anemia reduces binding capacity. Supplemental oxygen raises alveolar PO2 and gradient, helping diffusion-limited disease more than shunt.',
            'Oxygen moves from alveolus near 100 mmHg to capillary near 40 mmHg, while CO2 moves opposite because it is far more soluble. Exercise widens gradients and recruits capillaries, preserving equilibration even with shorter transit time.',
          ],
        },
        {
          heading: 'Hemoglobin cooperativity',
          body: [
            'Each hemoglobin binds four oxygens cooperatively: first binding eases the next, producing a sigmoidal curve. P50 is the PO2 at 50 percent saturation, normally about 27 mmHg. High affinity shifts left and loads easily but unloads poorly; low affinity shifts right and delivers readily.',
            'Myoglobin has a hyperbolic curve and very high affinity, storing oxygen in muscle. Fetal hemoglobin with two alpha and two gamma chains binds tighter than adult hemoglobin, pulling oxygen across the placenta.',
          ],
        },
        {
          heading: 'Shifts you must graph',
          body: [
            'Right shift from low pH, high CO2, high temperature, and high 2,3-BPG favors unloading in active tissues. This is the Bohr effect: exercising muscle makes acid and heat, so hemoglobin releases more oxygen exactly where needed. Chronic hypoxia raises 2,3-BPG over days.',
            'Left shift from high pH, low CO2, low temperature, low 2,3-BPG, fetal hemoglobin, or carbon monoxide favors loading but impairs delivery. Carbon monoxide also reduces carrying capacity and shifts remaining hemoglobin left, making it especially dangerous.',
          ],
        },
        {
          heading: 'CO2 transport and chloride shift',
          body: [
            'About 70 percent of CO2 travels as bicarbonate, 20 percent bound to hemoglobin as carbamino compounds, and 10 percent dissolved. Carbonic anhydrase in red cells converts CO2 plus water to carbonic acid, which dissociates to bicarbonate and hydrogen. Hemoglobin buffers hydrogen, the Haldane effect.',
            'Bicarbonate exits via the chloride shift while chloride enters to preserve charge. In the lung the reverse occurs: oxygenation releases hydrogen, bicarbonate re-enters, CO2 is reformed and exhaled. Acetazolamide and kidney compensation manipulate the same bicarbonate pool.',
          ],
        },
        {
          heading: 'Ventilation and pH',
          body: [
            'PaCO2 is the respiratory acid: hyperventilation blows off CO2 and causes respiratory alkalosis, hypoventilation retains CO2 and causes respiratory acidosis. Kidneys compensate over hours to days by retaining or excreting bicarbonate. Henderson-Hasselbalch relates pH to bicarbonate over CO2.',
            'Test pattern: asthma attack with wheeze and low PaCO2 is alkalosis; COPD exacerbation with high PaCO2 and low pH is acidosis; prolonged vomiting loses acid and causes metabolic alkalosis with compensatory hypoventilation. Always check which change came first.',
          ],
        },
      ],
      keyTerms: [
        { term: 'P50', definition: 'PO2 at 50% saturation; marker of affinity.' },
        { term: 'Bohr effect', definition: 'Acid/CO2/heat shifting curve right to unload O2.' },
        { term: 'Chloride shift', definition: 'Cl-/HCO3- exchange preserving electroneutrality.' },
        { term: 'Haldane effect', definition: 'Deoxygenated hemoglobin carrying more CO2/H+.' },
        { term: '2,3-BPG', definition: 'Glycolytic metabolite lowering affinity; rises in hypoxia.' },
        { term: 'Respiratory acidosis', definition: 'Low pH from CO2 retention.' },
      ],
      simulation: {
        kind: 'scenario',
        title: 'Curve-shift rounds',
        instructions: 'Predict the dissociation shift for each patient.',
        steps: [
          {
            prompt: 'Sprinter with hot acidic muscles needs O2 delivery. Shift?',
            options: ['Right shift', 'Left shift', 'No shift'],
            correct: 0,
            feedback: 'Acid, CO2, and heat shift right and unload oxygen.',
          },
          {
            prompt: 'CO poisoning with cherry-red skin. Hemoglobin behavior?',
            options: ['Left shift + low capacity', 'Right shift + high capacity', 'Normal'],
            correct: 0,
            feedback: 'CO binds tightly, blocks sites, and left-shifts remainder.',
          },
          {
            prompt: 'Chronic mountain resident after 2 weeks. Adaptation?',
            options: ['Falling 2,3-BPG', 'Rising 2,3-BPG with right shift', 'Fetal hemoglobin return'],
            correct: 1,
            feedback: 'More 2,3-BPG aids tissue unloading at altitude.',
          },
        ],
      },
      practice: [
        {
          id: 'anat-u3-l2-q1',
          prompt: 'Exercising muscle unloads more O2 because of:',
          type: 'mcq',
          options: ['Left shift from alkalosis', 'Right shift from acid, CO2, heat', 'Low 2,3-BPG', 'High pH'],
          answer: 'Right shift from acid, CO2, heat',
          explanation: 'Bohr effect matches delivery to metabolism.',
        },
        {
          id: 'anat-u3-l2-q2',
          prompt: 'Most CO2 is carried as:',
          type: 'mcq',
          options: ['Dissolved gas', 'Carbamino only', 'Bicarbonate', 'Myoglobin'],
          answer: 'Bicarbonate',
          explanation: 'About 70 percent travels as plasma bicarbonate.',
        },
        {
          id: 'anat-u3-l2-q3',
          prompt: 'Hyperventilation causes which pH change and why?',
          type: 'short',
          answer: 'Respiratory alkalosis; low PaCO2 reduces carbonic acid.',
          explanation: 'CO2 is volatile acid controlled by lungs.',
        },
        {
          id: 'anat-u3-l2-q4',
          prompt: 'Fetal hemoglobin has ___ affinity than adult because:',
          type: 'mcq',
          options: ['Lower; binds BPG tighter', 'Higher; gamma chains bind BPG poorly', 'Equal; same chains', 'Lower; fewer hemes'],
          answer: 'Higher; gamma chains bind BPG poorly',
          explanation: 'Weak BPG binding keeps affinity high across placenta.',
        },
        {
          id: 'anat-u3-l2-q5',
          prompt: 'Explain the chloride shift in one sentence with ions.',
          type: 'short',
          answer: 'As HCO3- leaves the RBC, Cl- enters to balance charge during CO2 loading.',
          explanation: 'Electroneutrality must be preserved.',
        },
      ],
    },
    {
      id: 'anat-u4-l1',
      unitId: 'anat-u4',
      title: 'Obstructive Disease: Asthma, Bronchitis, Emphysema, COPD',
      durationMin: 32,
      kind: 'text',
      objectives: [
        'Contrast asthma, chronic bronchitis, and emphysema',
        'Interpret blue bloater vs pink puffer presentations',
        'Explain inhaler classes and action plans',
        'Read ABGs and spirometry in exacerbations',
      ],
      sections: [
        {
          heading: 'Asthma: reversible hyperreactivity',
          body: [
            'Asthma is chronic airway inflammation with reversible bronchospasm, mucosal edema, and mucus plugging. Triggers include allergens, exercise, cold air, smoke, and viral infections. Early response is mast cell histamine and leukotrienes; late response recruits eosinophils over hours.',
            'Attacks show wheeze, prolonged expiration, accessory muscle use, and pulsus paradoxus when severe. ABG early shows respiratory alkalosis from hyperventilation; normalizing CO2 with worsening distress signals fatigue and impending failure. Spirometry shows low FEV1/FVC that improves after bronchodilator.',
          ],
        },
        {
          heading: 'COPD umbrella',
          body: [
            'COPD combines chronic bronchitis and emphysema, usually from smoking, with poorly reversible obstruction, air trapping, and hyperinflation. Chronic bronchitis is productive cough for three months in two consecutive years from goblet hyperplasia. Emphysema destroys alveolar walls and elastic recoil from protease imbalance, especially alpha-1 antitrypsin deficiency in young nonsmokers.',
            'Blue bloaters are bronchitic: cyanotic, edematous, polycythemic with cor pulmonale. Pink puffers are emphysematous: thin, pursed-lip breathing, barrel chest, hyperresonant lungs. Most patients mix both phenotypes.',
          ],
        },
        {
          heading: 'Drugs and devices',
          body: [
            'Short-acting beta agonists rescue acute spasm. Inhaled corticosteroids control inflammation daily. Long-acting beta agonists are never alone for asthma but pair with steroids. Anticholinergics such as tiotropium help COPD; theophylline is narrow-index backup. Biologics target IgE, IL-5, or IL-4 in severe eosinophilic asthma.',
            'Teach spacer technique, rinse after steroids to prevent thrush, and track peak flow zones: green 80-100 percent personal best, yellow 50-80 percent, red below 50 percent. Supplemental oxygen in COPD is titrated to 88-92 percent to avoid worsening hypercapnia in chronic retainers.',
          ],
        },
        {
          heading: 'Imaging and labs',
          body: [
            'Emphysema shows flattened diaphragms, hyperlucency, and bullae. Chronic bronchitis shows thickened bronchial markings. Pneumothorax is a known COPD complication from ruptured blebs. Alpha-1 testing is indicated for early onset, family history, or basilar disease.',
            'Exacerbations raise hematocrit from chronic hypoxia and lower DLCO in emphysema because surface area is lost. Asthma DLCO is typically normal. Sputum in bronchitis is mucoid to purulent; eosinophils favor asthma.',
          ],
        },
        {
          heading: 'Competition cases',
          body: [
            'Case pattern: teen with nighttime cough, exercise wheeze, FEV1/FVC 0.65 improving 15 percent after albuterol equals asthma. Older smoker with progressive dyspnea, low DLCO, and hyperinflation equals emphysema. Productive morning cough with frequent infections equals chronic bronchitis.',
            'Red flags requiring escalation: inability to speak full sentences, silent chest, altered mentation, PaCO2 rising toward normal during severe asthma, or new unilateral chest pain with dyspnea suggesting pneumothorax.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Reversibility', definition: 'FEV1 improvement after bronchodilator; hallmark of asthma.' },
        { term: 'Air trapping', definition: 'Incomplete exhalation raising residual volume in COPD.' },
        { term: 'Alpha-1 antitrypsin', definition: 'Protease inhibitor; deficiency causes early emphysema.' },
        { term: 'Pulsus paradoxus', definition: 'Exaggerated BP drop on inspiration in severe asthma.' },
        { term: 'Peak flow zones', definition: 'Green/yellow/red action thresholds from personal best.' },
        { term: 'Cor pulmonale', definition: 'Right heart strain from chronic lung disease.' },
      ],
      simulation: {
        kind: 'flashcards',
        title: 'Obstruction pattern drill',
        instructions: 'Classify each vignette before flipping.',
        cards: [
          { front: 'Teen, night cough, 15% FEV1 gain post-albuterol', back: 'Asthma: reversible obstruction' },
          { front: 'Smoker, morning sputum 2 winters', back: 'Chronic bronchitis phenotype' },
          { front: 'Thin, pursed lips, low DLCO, bullae', back: 'Emphysema phenotype' },
          { front: 'Silent chest + rising PaCO2 in asthma', back: 'Fatigue/failure; escalate now' },
        ],
      },
      practice: [
        {
          id: 'anat-u4-l1-q1',
          prompt: 'Reversible obstruction with eosinophils best fits:',
          type: 'mcq',
          options: ['Emphysema', 'Asthma', 'Fibrosis', 'Pneumothorax'],
          answer: 'Asthma',
          explanation: 'Reversibility plus allergy/eosinophils defines asthma.',
        },
        {
          id: 'anat-u4-l1-q2',
          prompt: 'Low DLCO with bullae points to:',
          type: 'mcq',
          options: ['Asthma', 'Chronic bronchitis', 'Emphysema', 'Pneumonia'],
          answer: 'Emphysema',
          explanation: 'Lost alveolar surface lowers diffusion.',
        },
        {
          id: 'anat-u4-l1-q3',
          prompt: 'Explain normalizing PaCO2 during a severe asthma attack.',
          type: 'short',
          answer: 'Tiring patient hypoventilates; CO2 rises from low toward normal despite distress, warning of failure.',
          explanation: 'Do not mistake for improvement without clinical context.',
        },
        {
          id: 'anat-u4-l1-q4',
          prompt: 'First-line rescue for acute bronchospasm:',
          type: 'mcq',
          options: ['Inhaled steroid', 'SABA albuterol', 'Antibiotic', 'Diuretic'],
          answer: 'SABA albuterol',
          explanation: 'Beta-2 agonists relax smooth muscle in minutes.',
        },
        {
          id: 'anat-u4-l1-q5',
          prompt: 'Young nonsmoker with basilar emphysema: test for?',
          type: 'short',
          answer: 'Alpha-1 antitrypsin deficiency.',
          explanation: 'Early or familial disease triggers testing.',
        },
      ],
    },
    {
      id: 'anat-u4-l2',
      unitId: 'anat-u4',
      title: 'Infection and Restriction: Pneumonia, TB, Fibrosis',
      durationMin: 30,
      kind: 'text',
      objectives: [
        'Classify pneumonia by setting and pathogen pattern',
        'Explain TB granulomas and testing',
        'Contrast restrictive physiology and imaging',
        'Apply CURB-65 and oxygen strategies',
      ],
      sections: [
        {
          heading: 'Pneumonia patterns',
          body: [
            'Community-acquired pneumonia commonly involves Streptococcus pneumoniae with lobar consolidation, while atypicals such as Mycoplasma cause diffuse interstitial patterns in young patients. Hospital and ventilator-associated disease favors MRSA, Pseudomonas, and gram-negatives. Aspiration pneumonia favors dependent lobes with anaerobes after dysphagia or altered consciousness.',
            'Symptoms include fever, productive cough, pleuritic pain, and hypoxemia with shunt physiology. Lobar consolidation gives dullness, bronchial breath sounds, and egophony. CURB-65 scores confusion, urea, respiratory rate, blood pressure, and age to guide admission.',
          ],
        },
        {
          heading: 'Tuberculosis essentials',
          body: [
            'Mycobacterium tuberculosis spreads by airborne droplets, forms Ghon complexes with hilar nodes, and creates caseating granulomas with Langhans giant cells. Primary infection may heal with calcification; reactivation favors apices where oxygen is high.',
            'Testing uses IGRA or PPD, confirmed by sputum AFB smears, nucleic acid tests, and culture. Active pulmonary TB requires airborne isolation and multidrug therapy. Miliary TB spreads hematogenously; extrapulmonary TB can involve meninges, bone, or kidney.',
          ],
        },
        {
          heading: 'Restrictive lung disease',
          body: [
            'Restriction reduces lung volumes with preserved FEV1/FVC. Idiopathic pulmonary fibrosis causes basilar honeycombing, Velcro crackles, and clubbing. Sarcoidosis causes hilar adenopathy and noncaseating granulomas. Hypersensitivity pneumonitis follows antigen exposure such as mold or birds.',
            'Chest wall restriction includes kyphoscoliosis and obesity hypoventilation; neuromuscular restriction includes myasthenia and Guillain-Barre with weak cough and hypercapnia. All reduce vital capacity and total lung capacity.',
          ],
        },
        {
          heading: 'Oxygen and ventilation decisions',
          body: [
            'Shunt from pneumonia resists oxygen but still warrants supplementation and treatment of the cause. PEEP recruits collapsed alveoli in ARDS but risks barotrauma. Prone positioning improves V/Q matching in severe ARDS.',
            'High-flow nasal cannula supports hypoxemia with some PEEP and comfort; noninvasive ventilation helps COPD exacerbations and cardiogenic edema but is avoided in altered mentation or inability to protect airway.',
          ],
        },
        {
          heading: 'Test images',
          body: [
            'Lobar consolidation silhouettes adjacent borders; interstitial disease shows reticular markings; cavitary apical lesions suggest TB; basilar honeycombing suggests UIP fibrosis; bat-wing edema suggests cardiogenic cause rather than infection.',
            'Pair each image with physiology: consolidation is shunt, fibrosis is diffusion plus restriction, effusion is compression with dullness and absent breath sounds, pneumothorax is hyperresonance with absent sounds.',
          ],
        },
      ],
      keyTerms: [
        { term: 'CURB-65', definition: 'Pneumonia severity score guiding admission.' },
        { term: 'Ghon complex', definition: 'Calcified TB focus plus hilar node.' },
        { term: 'Honeycombing', definition: 'Cystic basilar fibrosis pattern in UIP.' },
        { term: 'Shunt hypoxemia', definition: 'Low O2 resistant to supplementation from unventilated units.' },
        { term: 'Egophony', definition: 'E-to-A change over consolidation.' },
        { term: 'PEEP', definition: 'Positive end-expiratory pressure recruiting alveoli.' },
      ],
      simulation: {
        kind: 'scenario',
        title: 'Fever and infiltrate triage',
        instructions: 'Select the best interpretation for each case.',
        steps: [
          {
            prompt: 'Elderly with lobar consolidation, CURB-65 3. Disposition?',
            options: ['Outpatient', 'Admit, likely inpatient', 'No antibiotics'],
            correct: 1,
            feedback: 'Score 3 or higher favors admission.',
          },
          {
            prompt: 'Young adult, dry cough, diffuse pattern, recent dorm outbreak?',
            options: ['Typical pneumococcus', 'Atypical Mycoplasma', 'Pure edema'],
            correct: 1,
            feedback: 'Atypical pattern in young adults suggests Mycoplasma.',
          },
          {
            prompt: 'Apical cavitary lesion + night sweats?',
            options: ['Asthma', 'Reactivation TB workup + isolation', 'Simple bronchitis'],
            correct: 1,
            feedback: 'Apical cavitation is classic for reactivation TB.',
          },
        ],
      },
      practice: [
        {
          id: 'anat-u4-l2-q1',
          prompt: 'Apical cavitary disease with caseating granulomas suggests:',
          type: 'mcq',
          options: ['Asthma', 'TB', 'Emphysema', 'Pneumothorax'],
          answer: 'TB',
          explanation: 'Oxygen-rich apices favor mycobacterial growth.',
        },
        {
          id: 'anat-u4-l2-q2',
          prompt: 'Basilar honeycombing with Velcro crackles suggests:',
          type: 'mcq',
          options: ['COPD', 'IPF/UIP fibrosis', 'Asthma', 'Effusion'],
          answer: 'IPF/UIP fibrosis',
          explanation: 'Restrictive fibrosis pattern with clubbing.',
        },
        {
          id: 'anat-u4-l2-q3',
          prompt: 'Why does pneumonia cause shunt rather than dead space?',
          type: 'short',
          answer: 'Alveoli are perfused but filled with pus/fluid and unventilated.',
          explanation: 'Perfusion without ventilation defines shunt.',
        },
        {
          id: 'anat-u4-l2-q4',
          prompt: 'CURB-65 includes all except:',
          type: 'mcq',
          options: ['Confusion', 'Urea', 'Respiratory rate', 'Heart rate alone'],
          answer: 'Heart rate alone',
          explanation: 'Components are confusion, urea, RR, BP, age 65+.',
        },
        {
          id: 'anat-u4-l2-q5',
          prompt: 'Aspiration pneumonia favors which lobes and why?',
          type: 'short',
          answer: 'Dependent lower lobes, especially right; gravity and bronchus angle.',
          explanation: 'Aspiration follows gravity into dependent segments.',
        },
      ],
    },
    {
      id: 'anat-u5-l1',
      unitId: 'anat-u5',
      title: 'Alimentary Canal: Mouth to Stomach',
      durationMin: 32,
      kind: 'text',
      objectives: [
        'Trace bolus movement and sphincters',
        'Explain salivary, gastric, and enzymatic digestion',
        'Describe stomach layers and mucosal protection',
        'Localize ulcer and reflux pathology',
      ],
      sections: [
        {
          heading: 'Mouth, pharynx, esophagus',
          body: [
            'Mechanical digestion begins with mastication and lingual lipase plus salivary amylase and lysozyme. Saliva moistens, dissolves tastants, and begins starch digestion at near-neutral pH. The uvula and epiglottis route bolus past the airway into the esophagus.',
            'The esophagus uses primary and secondary peristalsis through skeletal muscle superiorly and smooth muscle inferiorly. The upper esophageal sphincter prevents air entry, the lower esophageal sphincter prevents reflux. Dysphagia to solids suggests stricture, to solids plus liquids suggests motility disease.',
          ],
        },
        {
          heading: 'Stomach anatomy',
          body: [
            'Regions are cardia, fundus, body, antrum, and pylorus. The wall has mucosa with gastric pits, submucosa, muscularis externa with outer longitudinal, middle circular, and inner oblique layers, plus serosa. Rugae allow expansion; the pyloric sphincter meters chyme into the duodenum.',
            'Blood comes from celiac branches, vagal parasympathetics stimulate secretion and motility, sympathetics inhibit. The lesser curvature and pylorus are common ulcer sites because of acid exposure and H. pylori colonization.',
          ],
        },
        {
          heading: 'Gastric secretions',
          body: [
            'Parietal cells secrete HCl and intrinsic factor; chief cells secrete pepsinogen; G cells secrete gastrin; mucous neck cells secrete protective mucus and bicarbonate. HCl sterilizes, denatures protein, and converts pepsinogen to pepsin at pH near 2.',
            'Cephalic, gastric, and intestinal phases coordinate secretion. Distension and peptides stimulate gastrin, histamine potentiates acid via H2 receptors, somatostatin inhibits. This is why H2 blockers and proton pump inhibitors reduce ulcers.',
          ],
        },
        {
          heading: 'Protection and failure',
          body: [
            'The mucus-bicarbonate barrier, tight junctions, rapid epithelial turnover, and prostaglandin-driven blood flow protect mucosa. NSAIDs block prostaglandins, alcohol and bile injure directly, and H. pylori urease alkalinizes its niche while triggering inflammation.',
            'GERD causes heartburn, regurgitation, and chronic cough when the lower sphincter fails; Barrett metaplasia from chronic acid raises adenocarcinoma risk. Vomiting blood suggests varices, ulcer, or Mallory-Weiss tear; coffee-ground emesis suggests digested blood.',
          ],
        },
        {
          heading: 'Motility and testing links',
          body: [
            'Gastric emptying of liquids is faster than solids; hyperglycemia and opioids slow it, erythromycin speeds it. Dumping syndrome after gastrectomy causes early vasomotor symptoms and late hypoglycemia.',
            'Tests use endoscopy for direct visualization, urea breath or stool antigen for H. pylori, and manometry for motility. Barium swallow outlines strictures and achalasia bird-beak narrowing.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Peristalsis', definition: 'Coordinated contraction-propulsion wave.' },
        { term: 'Lower esophageal sphincter', definition: 'Barrier preventing gastric reflux.' },
        { term: 'Parietal cell', definition: 'HCl and intrinsic factor source.' },
        { term: 'Pepsin', definition: 'Acid-activated protease from pepsinogen.' },
        { term: 'Barrett esophagus', definition: 'Intestinal metaplasia from chronic GERD.' },
        { term: 'Gastrin', definition: 'G-cell hormone stimulating acid and growth.' },
      ],
      simulation: {
        kind: 'checklist',
        title: 'Swallow and churn check',
        instructions: 'Order the bolus journey and verify each guard.',
        items: [
          { label: 'Chew + amylase start', detail: 'Mouth begins starch digestion.' },
          { label: 'Epiglottis protects airway', detail: 'Aspiration prevention during swallow.' },
          { label: 'LES keeps acid down', detail: 'Failure causes GERD/Barrett risk.' },
          { label: 'Parietal HCl activates pepsin', detail: 'pH near 2 plus mucus barrier.' },
          { label: 'Pylorus meters chyme', detail: 'Small pulses protect duodenum.' },
        ],
      },
      practice: [
        {
          id: 'anat-u5-l1-q1',
          prompt: 'Pepsinogen is converted to pepsin by:',
          type: 'mcq',
          options: ['Bile', 'HCl/acid pH', 'Bicarbonate', 'Insulin'],
          answer: 'HCl/acid pH',
          explanation: 'Acid activates chief cell pepsinogen.',
        },
        {
          id: 'anat-u5-l1-q2',
          prompt: 'Intrinsic factor is made by ___ and is needed for:',
          type: 'mcq',
          options: ['G cells; gastrin', 'Parietal cells; B12 absorption', 'Chief cells; lipase', 'Goblet cells; mucus'],
          answer: 'Parietal cells; B12 absorption',
          explanation: 'Loss causes pernicious anemia.',
        },
        {
          id: 'anat-u5-l1-q3',
          prompt: 'Explain why NSAIDs cause ulcers in one mechanism sentence.',
          type: 'short',
          answer: 'They block prostaglandin synthesis, reducing mucus, bicarbonate, and mucosal blood flow.',
          explanation: 'Protection fails while acid remains.',
        },
        {
          id: 'anat-u5-l1-q4',
          prompt: 'Dysphagia to solids only most suggests:',
          type: 'mcq',
          options: ['Achalasia', 'Stricture/ring', 'Diffuse spasm', 'Scleroderma'],
          answer: 'Stricture/ring',
          explanation: 'Mechanical obstruction blocks solids first.',
        },
        {
          id: 'anat-u5-l1-q5',
          prompt: 'Chronic GERD can lead to which premalignant change?',
          type: 'short',
          answer: 'Barrett intestinal metaplasia of distal esophagus.',
          explanation: 'Acid-driven metaplasia raises adenocarcinoma risk.',
        },
      ],
    },
    {
      id: 'anat-u5-l2',
      unitId: 'anat-u5',
      title: 'Small Intestine, Liver, Pancreas, and Absorption',
      durationMin: 34,
      kind: 'text',
      objectives: [
        'Map duodenum, jejunum, ileum specializations',
        'Explain bile, pancreatic enzymes, and brush border digestion',
        'Describe nutrient absorption routes and vitamins',
        'Interpret gallstone, pancreatitis, and celiac cases',
      ],
      sections: [
        {
          heading: 'Small intestine architecture',
          body: [
            'The duodenum curves around the pancreas and receives bile and pancreatic juice at the ampulla of Vater. The jejunum has tall plicae and villi for most digestion and absorption; the ileum absorbs B12 with intrinsic factor and bile salts for recycling. Peyer patches in the ileum sample antigens.',
            'Surface area expands through plicae, villi, and microvilli to about 200 square meters. Enterocytes have brush border disaccharidases and peptidases; lactase, sucrase, and maltase finish carbohydrate digestion. SGLT1 couples sodium to glucose uptake.',
          ],
        },
        {
          heading: 'Liver and bile',
          body: [
            'The liver makes bile, processes nutrients, stores glycogen, synthesizes albumin and clotting factors, and detoxifies drugs. Bile salts emulsify fat, micelles ferry fatty acids to enterocytes, and enterohepatic circulation reclaims salts in the ileum.',
            'Gallstones form from cholesterol supersaturation, classically in fair, fat, fertile, forty patients. Cystic duct obstruction causes biliary colic after fatty meals; common bile duct stones cause jaundice and raised direct bilirubin with pruritus.',
          ],
        },
        {
          heading: 'Pancreas exocrine power',
          body: [
            'Acinar cells secrete trypsinogen, chymotrypsinogen, procarboxypeptidase, amylase, and lipase; ductal cells secrete bicarbonate to neutralize chyme. Enterokinase in the duodenum activates trypsin, which activates other zymogens. Premature activation causes autodigestion in pancreatitis.',
            'Pancreatitis causes epigastric pain radiating to the back, raised lipase, and Grey-Turner or Cullen signs in hemorrhage. Chronic alcohol use and gallstones are top causes. Pancreatic cancer often presents late with painless jaundice and Courvoisier gallbladder.',
          ],
        },
        {
          heading: 'Absorption routes',
          body: [
            'Carbohydrates absorb as glucose, galactose, and fructose; proteins as amino acids and small peptides; fats as micelles reformed into chylomicrons entering lacteals. Fat-soluble vitamins A, D, E, and K follow fat; B12 needs intrinsic factor and terminal ileum.',
            'Water follows sodium osmotically; the colon reclaims remaining fluid. Diarrhea causes metabolic acidosis and hypokalemia, while vomiting causes metabolic alkalosis and hypokalemia. Oral rehydration uses sodium-glucose cotransport to pull water in.',
          ],
        },
        {
          heading: 'Malabsorption patterns',
          body: [
            'Celiac disease is gluten-triggered villous atrophy with anti-tTG antibodies, iron deficiency, and dermatitis herpetiformis. Lactose intolerance causes bloating after dairy from lactase loss. Cystic fibrosis causes pancreatic insufficiency with greasy stools.',
            'Crohn disease can affect any gut segment transmurally with skip lesions and fistulas; ulcerative colitis affects colon mucosa continuously from the rectum. Both raise colon cancer risk, but toxic megacolon favors ulcerative colitis.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Enterohepatic circulation', definition: 'Ileal bile salt reabsorption and liver reuse.' },
        { term: 'Chylomicron', definition: 'Lymph lipid carrier from enterocytes.' },
        { term: 'Enterokinase', definition: 'Brush border enzyme activating trypsinogen.' },
        { term: 'Anti-tTG', definition: 'Celiac autoantibody against tissue transglutaminase.' },
        { term: 'Courvoisier law', definition: 'Palpable gallbladder with jaundice suggests malignancy, not stones.' },
        { term: 'SGLT1', definition: 'Sodium-glucose cotransporter driving absorption.' },
      ],
      simulation: {
        kind: 'scenario',
        title: 'Abdominal pain triage',
        instructions: 'Localize each presentation.',
        steps: [
          {
            prompt: 'Right upper pain after fatty meal, Murphy sign?',
            options: ['Cholecystitis', 'Appendicitis', 'Pancreatitis'],
            correct: 0,
            feedback: 'Gallbladder inflammation causes inspiratory arrest on palpation.',
          },
          {
            prompt: 'Epigastric pain to back + lipase 900?',
            options: ['GERD', 'Pancreatitis', 'UTI'],
            correct: 1,
            feedback: 'Lipase plus back radiation defines pancreatitis.',
          },
          {
            prompt: 'Periumbilical pain migrating to RLQ?',
            options: ['Celiac', 'Appendicitis', 'Gastritis'],
            correct: 1,
            feedback: 'Migration plus McBurney tenderness is classic appendicitis.',
          },
        ],
      },
      practice: [
        {
          id: 'anat-u5-l2-q1',
          prompt: 'B12 is absorbed in the:',
          type: 'mcq',
          options: ['Duodenum', 'Jejunum', 'Terminal ileum', 'Colon'],
          answer: 'Terminal ileum',
          explanation: 'Intrinsic factor-B12 complex is taken up there.',
        },
        {
          id: 'anat-u5-l2-q2',
          prompt: 'Celiac disease labs and biopsy show:',
          type: 'mcq',
          options: ['Anti-tTG + villous atrophy', 'Low lipase + normal villi', 'High gastrin only', 'No antibodies'],
          answer: 'Anti-tTG + villous atrophy',
          explanation: 'Gluten triggers autoimmune villous loss.',
        },
        {
          id: 'anat-u5-l2-q3',
          prompt: 'Why does pancreatic lipase need bile first?',
          type: 'short',
          answer: 'Bile emulsifies fat into micelles, expanding surface for lipase.',
          explanation: 'Emulsification precedes enzymatic hydrolysis.',
        },
        {
          id: 'anat-u5-l2-q4',
          prompt: 'Grey-Turner and Cullen signs indicate:',
          type: 'mcq',
          options: ['Mild gastritis', 'Hemorrhagic pancreatitis', 'Lactose intolerance', 'Hepatitis A'],
          answer: 'Hemorrhagic pancreatitis',
          explanation: 'Flank and periumbilical ecchymoses signal retroperitoneal bleeding.',
        },
        {
          id: 'anat-u5-l2-q5',
          prompt: 'Fat-soluble vitamins malabsorbed in cholestasis:',
          type: 'short',
          answer: 'A, D, E, K; monitor night vision, bone, neuro, and clotting.',
          explanation: 'Lack of bile impairs micelle formation.',
        },
      ],
    },
    {
      id: 'anat-u6-l1',
      unitId: 'anat-u6',
      title: 'Ulcers, GI Bleeding, and GI Cancers',
      durationMin: 30,
      kind: 'text',
      objectives: [
        'Explain H. pylori ulcer pathogenesis and treatment',
        'Distinguish upper vs lower GI bleeding signs',
        'Outline colorectal, gastric, and esophageal cancer risks',
        'Apply screening and red-flag logic',
      ],
      sections: [
        {
          heading: 'Ulcer disease',
          body: [
            'Duodenal ulcers relate strongly to H. pylori and acid hypersecretion, often improving with food. Gastric ulcers associate with NSAIDs, bile reflux, and impaired defense, sometimes worsening with food. Both can bleed or perforate; posterior duodenal ulcers threaten the gastroduodenal artery.',
            'Test with urea breath, stool antigen, or biopsy urease; treat with triple or quadruple therapy plus PPI. Confirm eradication after treatment. Perforation causes sudden severe pain with rigid board-like abdomen and free air under the diaphragm.',
          ],
        },
        {
          heading: 'GI bleeding logic',
          body: [
            'Melena suggests upper source with digested blood; hematochezia suggests lower source, though brisk upper bleeding can also appear red. Hematemesis may be variceal, ulcer, or Mallory-Weiss. BUN rises disproportionately in upper bleeding from digested protein.',
            'Varices from portal hypertension require banding and octreotide plus antibiotics; ulcers need endoscopic clipping and high-dose PPI; diverticular bleeding is often painless and lower. Always assess airway, volume, and anticoagulants first.',
          ],
        },
        {
          heading: 'Colorectal cancer',
          body: [
            'Most cancers arise from adenomatous polyps over years. Left-sided lesions cause obstruction and pencil stools; right-sided lesions bleed occultly and cause iron deficiency. Screening uses colonoscopy, FIT, or stool DNA at guideline ages, earlier with family history or IBD.',
            'Staging uses TNM with liver as the common metastatic site via portal drainage. CEA monitors recurrence but does not screen. Lynch syndrome causes microsatellite instability and multiple cancers; FAP causes hundreds of polyps and near-certain malignancy without colectomy.',
          ],
        },
        {
          heading: 'Upper GI cancers',
          body: [
            'Esophageal squamous cancer links to smoking and alcohol, adenocarcinoma to Barrett and obesity. Gastric cancer links to H. pylori, smoked foods, and chronic gastritis. Pancreatic adenocarcinoma presents late with weight loss, new diabetes, and painless jaundice.',
            'Virchow node, Sister Mary Joseph nodule, and Krukenberg tumors are classic metastatic clues. Dysphagia progressing from solids to liquids suggests mechanical malignancy rather than motility disease.',
          ],
        },
        {
          heading: 'Prevention and counseling',
          body: [
            'Fiber, activity, limited alcohol, smoking cessation, and H. pylori treatment lower risk. NSAID users need PPI or misoprostol protection when high risk. Iron replacement alone without GI workup in an older adult with anemia misses cancer.',
            'For competition cases, pair age, NSAID use, H. pylori status, bleeding color, BUN pattern, and polyp history to pick the next test: endoscopy for upper, colonoscopy for lower, urea breath for H. pylori confirmation.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Melena', definition: 'Black tarry stool from upper GI bleeding.' },
        { term: 'Hematochezia', definition: 'Bright red blood, usually lower source.' },
        { term: 'Quadruple therapy', definition: 'PPI + bismuth + tetracycline + metronidazole for H. pylori.' },
        { term: 'Adenoma-carcinoma sequence', definition: 'Polyp progression to colorectal cancer.' },
        { term: 'Lynch syndrome', definition: 'Mismatch repair defect with MSI cancers.' },
        { term: 'Portal hypertension', definition: 'High portal pressure causing varices and splenomegaly.' },
      ],
      simulation: {
        kind: 'flashcards',
        title: 'Bleed and cancer clues',
        instructions: 'Name the source before flipping.',
        cards: [
          { front: 'Melena + high BUN/creatinine ratio', back: 'Upper GI bleed' },
          { front: 'Painless jaundice + palpable gallbladder', back: 'Malignant obstruction, Courvoisier' },
          { front: 'Right colon lesion + iron deficiency', back: 'Occult bleed, right-sided cancer' },
          { front: 'Hundreds of polyps in teen', back: 'FAP, near-certain cancer without surgery' },
        ],
      },
      practice: [
        {
          id: 'anat-u6-l1-q1',
          prompt: 'Duodenal ulcer pain classically:',
          type: 'mcq',
          options: ['Worse with food', 'Better with food/antacid', 'No relation', 'Only nocturnal'],
          answer: 'Better with food/antacid',
          explanation: 'Food buffers acid in duodenal disease.',
        },
        {
          id: 'anat-u6-l1-q2',
          prompt: 'Best H. pylori confirmation after treatment:',
          type: 'mcq',
          options: ['Symptoms only', 'Urea breath/stool antigen', 'Serum IgG alone', 'No testing'],
          answer: 'Urea breath/stool antigen',
          explanation: 'Active infection testing confirms eradication.',
        },
        {
          id: 'anat-u6-l1-q3',
          prompt: 'Left vs right colon cancer presentation difference?',
          type: 'short',
          answer: 'Left obstructs with caliber change; right bleeds occultly causing anemia.',
          explanation: 'Lumen and stool content differ by side.',
        },
        {
          id: 'anat-u6-l1-q4',
          prompt: 'FAP management principle:',
          type: 'mcq',
          options: ['Observe lifelong', 'Prophylactic colectomy', 'Antibiotics cure', 'No screening'],
          answer: 'Prophylactic colectomy',
          explanation: 'Hundreds of polyps make cancer near certain.',
        },
        {
          id: 'anat-u6-l1-q5',
          prompt: 'Sudden severe ulcer pain + rigid abdomen suggests?',
          type: 'short',
          answer: 'Perforation with peritonitis; upright X-ray for free air.',
          explanation: 'Chemical then bacterial peritonitis is surgical.',
        },
      ],
    },
    {
      id: 'anat-u6-l2',
      unitId: 'anat-u6',
      title: 'Lactose Intolerance, Obesity, and Exercise Metabolism',
      durationMin: 26,
      kind: 'text',
      objectives: [
        'Explain lactase deficiency and hydrogen breath testing',
        'Contrast lactose intolerance with milk allergy and celiac',
        'Describe obesity effects on GI, liver, and joints',
        'Explain exercise fuel use and gut effects',
      ],
      sections: [
        {
          heading: 'Lactose intolerance mechanism',
          body: [
            'Lactase at the brush border splits lactose into glucose and galactose. Most humans downregulate lactase after weaning; persistent lactase comes from regulatory variants. Undigested lactose draws water osmotically and is fermented by colonic bacteria into hydrogen, methane, and short-chain acids.',
            'Symptoms begin 30 minutes to 2 hours after dairy: bloating, flatus, cramps, and watery diarrhea. Diagnosis uses hydrogen breath testing, symptom trial with lactase, or supervised elimination. Stool acidity and reducing substances help in infants.',
          ],
        },
        {
          heading: 'Mimics to separate',
          body: [
            'Milk allergy is immune-mediated with hives, wheeze, or anaphylaxis and needs avoidance plus epinephrine planning, not lactase pills. Celiac causes villous damage, anemia, and positive anti-tTG. Irritable bowel worsens with many FODMAPs beyond lactose.',
            'Secondary lactase loss follows gastroenteritis, celiac, or Crohn because villous tips are injured; it often recovers as mucosa heals. Congenital lactase deficiency is rare and severe from birth.',
          ],
        },
        {
          heading: 'Obesity and the gut',
          body: [
            'Obesity raises GERD, gallstones, nonalcoholic fatty liver, and colorectal cancer risk. Adipose inflammation drives insulin resistance, so the liver overproduces glucose and triglycerides. Weight loss, even modest, improves reflux, liver fat, and glycemia.',
            'Exercise and obesity questions intersect: mechanical loading stresses joints, sleep apnea worsens reflux, and rapid weight loss can precipitate gallstones. Counsel gradual loss with protein, fiber, and activity.',
          ],
        },
        {
          heading: 'Exercise fuel and gut',
          body: [
            'High-intensity exercise burns glycogen first, moderate exercise blends glucose and fat, prolonged low-intensity exercise favors fat after glycogen falls. Runner diarrhea comes from splanchnic shunting, jostling, and hyperosmolar gels without water.',
            'Hydration with sodium and glucose uses SGLT1 to speed absorption. NSAIDs before races raise gut permeability and kidney risk, so they are discouraged.',
          ],
        },
        {
          heading: 'Practical management',
          body: [
            'Lactose management uses portion control, hard cheeses and yogurt with less lactose, lactase tablets, and calcium plus vitamin D replacement. Food labels hide lactose in whey, milk solids, and some drugs.',
            'For tests, calculate that one cup of milk has about 12 g lactose; compare lactase dose timing and note that probiotics alone do not restore human lactase.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Lactase persistence', definition: 'Genetic continued lactase expression into adulthood.' },
        { term: 'Hydrogen breath test', definition: 'Rise in exhaled H2 from undigested carbohydrate.' },
        { term: 'FODMAP', definition: 'Fermentable carbs triggering IBS-like symptoms.' },
        { term: 'NAFLD', definition: 'Liver fat from metabolic disease; reversible early.' },
        { term: 'Splanchnic shunt', definition: 'Exercise blood diversion away from gut.' },
        { term: 'Secondary deficiency', definition: 'Temporary lactase loss from villous injury.' },
      ],
      simulation: {
        kind: 'slider',
        title: 'Lactose load vs symptoms',
        instructions: 'Increase milk intake and predict symptoms in lactase deficiency.',
        min: 0,
        max: 24,
        step: 4,
        defaultValue: 12,
        unit: 'g lactose',
        scenarios: [
          { value: 0, label: 'No lactose', outcome: 'No osmotic load; no symptoms.' },
          { value: 12, label: 'One cup milk', outcome: 'Bloating and flatus likely; diarrhea possible.' },
          { value: 24, label: 'Two cups at once', outcome: 'Cramps plus watery diarrhea from osmotic + fermentation load.' },
        ],
      },
      practice: [
        {
          id: 'anat-u6-l2-q1',
          prompt: 'Lactose intolerance is caused by deficiency of:',
          type: 'mcq',
          options: ['Sucrase', 'Lactase', 'Maltase', 'Pepsin'],
          answer: 'Lactase',
          explanation: 'Brush border lactase loss leaves lactose unabsorbed.',
        },
        {
          id: 'anat-u6-l2-q2',
          prompt: 'Best test for lactose malabsorption:',
          type: 'mcq',
          options: ['Anti-tTG', 'Hydrogen breath test', 'Lipase', 'Colonoscopy'],
          answer: 'Hydrogen breath test',
          explanation: 'Bacterial fermentation releases measurable hydrogen.',
        },
        {
          id: 'anat-u6-l2-q3',
          prompt: 'Distinguish milk allergy from intolerance in one line each.',
          type: 'short',
          answer: 'Allergy: immune hives/wheeze needing avoidance; intolerance: enzymatic bloating/diarrhea managed by dose/lactase.',
          explanation: 'Mechanism determines urgency and management.',
        },
        {
          id: 'anat-u6-l2-q4',
          prompt: 'Obesity raises risk of all except:',
          type: 'mcq',
          options: ['Gallstones', 'GERD', 'NAFLD', 'Cystic fibrosis'],
          answer: 'Cystic fibrosis',
          explanation: 'CF is genetic, not metabolic risk-driven.',
        },
        {
          id: 'anat-u6-l2-q5',
          prompt: 'Why do hyperosmolar gels cause runner diarrhea without water?',
          type: 'short',
          answer: 'High luminal osmolarity plus shunting draws water into gut and speeds transit.',
          explanation: 'Dilution and pacing prevent symptoms.',
        },
      ],
    },
    {
      id: 'anat-u7-l1',
      unitId: 'anat-u7',
      title: 'Central Immune Organs and Lymph Flow',
      durationMin: 28,
      kind: 'text',
      objectives: [
        'Contrast primary vs secondary lymphoid organs',
        'Explain marrow and thymus selection',
        'Trace lymph from tissue to subclavian vein',
        'Localize nodes draining key regions',
      ],
      sections: [
        {
          heading: 'Primary organs: marrow and thymus',
          body: [
            'Red marrow produces hematopoietic stem cells that become myeloid and lymphoid lineages. B cells mature in marrow with negative selection against self-reactivity; failure causes autoimmunity or immunodeficiency. Thymus in the anterior mediastinum matures T cells through positive selection for MHC recognition and negative selection against self.',
            'The thymus is largest in childhood and involutes with age, replaced by fat. Myasthenia gravis associates with thymoma because self-tolerance fails. SCID from ADA or RAG defects blocks lymphocyte development centrally.',
          ],
        },
        {
          heading: 'Secondary organs: nodes, spleen, MALT',
          body: [
            'Lymph nodes filter lymph with B follicles, T paracortex, and macrophage-lined sinuses. Germinal centers form during responses with somatic hypermutation. Spleen filters blood: white pulp mounts responses, red pulp removes old red cells and encapsulated bacteria. MALT includes tonsils, Peyer patches, and appendix.',
            'Splenectomy raises risk from encapsulated organisms such as pneumococcus, meningococcus, and Haemophilus, requiring vaccines and fever action plans. Howell-Jolly bodies on smear mark absent splenic function.',
          ],
        },
        {
          heading: 'Lymphatic vessels and flow',
          body: [
            'Interstitial fluid enters blind lymphatic capillaries, moves through nodes via afferent vessels, and returns through the thoracic duct on the left and right lymphatic duct to subclavian veins. The thoracic duct drains both lower limbs, abdomen, left thorax, left arm, and left head and neck.',
            'Lymphedema follows node dissection, filariasis, or tumor obstruction. Elephantiasis from Wuchereria blocks flow chronically. Breast cancer staging samples sentinel nodes first.',
          ],
        },
        {
          heading: 'Barriers and innate helpers',
          body: [
            'Anatomical barriers include skin keratin, stomach acid, mucus, cilia, lysozyme, and normal flora competing with pathogens. Breaks from burns, ulcers, or lines invite invasion. Vitamin A and zinc deficiency impair barrier repair.',
            'Phagocytes, NK cells, and complement bridge to adaptive immunity. Fever from IL-1 and prostaglandins inhibits some pathogens but must be interpreted with age and immune status.',
          ],
        },
        {
          heading: 'Exam mapping',
          body: [
            'Map cervical nodes to throat infections, axillary nodes to arm and breast, inguinal nodes to leg and external genitalia, mesenteric nodes to gut. Splenomegaly suggests mono, lymphoma, portal hypertension, or hemolysis.',
            'On diagrams, label cortex, paracortex, medulla, afferent and efferent vessels, white versus red pulp, and thoracic duct drainage. Efferent vessels are fewer than afferent, slowing flow for screening.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Positive selection', definition: 'Thymic survival of T cells recognizing self-MHC.' },
        { term: 'Negative selection', definition: 'Deletion of strongly self-reactive lymphocytes.' },
        { term: 'Thoracic duct', definition: 'Largest lymph vessel draining most of body to left vein.' },
        { term: 'White pulp', definition: 'Splenic lymphoid tissue responding to blood antigens.' },
        { term: 'Howell-Jolly bodies', definition: 'Nuclear remnants marking asplenia.' },
        { term: 'MALT', definition: 'Mucosa-associated lymphoid tissue guarding entries.' },
      ],
      simulation: {
        kind: 'flashcards',
        title: 'Node and organ mapping',
        instructions: 'Say the drainage or function before flipping.',
        cards: [
          { front: 'Axillary nodes', back: 'Arm, breast, upper back' },
          { front: 'Thoracic duct returns to', back: 'Left subclavian vein' },
          { front: 'White pulp filters', back: 'Blood-borne antigens' },
          { front: 'Thymus involution means', back: 'Less new T output with age' },
        ],
      },
      practice: [
        {
          id: 'anat-u7-l1-q1',
          prompt: 'B cells mature in the ___; T cells mature in the ___.',
          type: 'mcq',
          options: ['Thymus; marrow', 'Marrow; thymus', 'Spleen; node', 'Node; spleen'],
          answer: 'Marrow; thymus',
          explanation: 'Primary organ determines lineage maturation.',
        },
        {
          id: 'anat-u7-l1-q2',
          prompt: 'Asplenic patients need vaccines against:',
          type: 'mcq',
          options: ['Viruses only', 'Encapsulated bacteria', 'Fungi only', 'No vaccines'],
          answer: 'Encapsulated bacteria',
          explanation: 'Spleen clears polysaccharide capsules.',
        },
        {
          id: 'anat-u7-l1-q3',
          prompt: 'Left foot infection drains via which duct to which vein?',
          type: 'short',
          answer: 'Thoracic duct to left subclavian vein.',
          explanation: 'Lower body plus left upper drains left.',
        },
        {
          id: 'anat-u7-l1-q4',
          prompt: 'Howell-Jolly bodies indicate:',
          type: 'mcq',
          options: ['Good spleen', 'Absent spleen function', 'High platelets only', 'Iron overload'],
          answer: 'Absent spleen function',
          explanation: 'Spleen normally removes nuclear remnants.',
        },
        {
          id: 'anat-u7-l1-q5',
          prompt: 'Why does thymoma associate with myasthenia?',
          type: 'short',
          answer: 'Failed central tolerance allows anti-acetylcholine receptor autoimmunity.',
          explanation: 'Thymic selection errors permit self-attack.',
        },
      ],
    },
    {
      id: 'anat-u7-l2',
      unitId: 'anat-u7',
      title: 'Spleen, Nodes, and Barriers in Defense',
      durationMin: 26,
      kind: 'text',
      objectives: [
        'Describe germinal center reactions',
        'Explain splenic filtration and platelet roles',
        'Apply node examination to infection vs malignancy',
        'Advise barrier protection and vaccines',
      ],
      sections: [
        {
          heading: 'Germinal centers and affinity',
          body: [
            'Activated B cells form germinal centers with dark zones of proliferation and light zones of selection. Somatic hypermutation plus selection produces higher-affinity antibodies, then plasma cells and memory cells. T follicular helper cells guide the process.',
            'Lymphadenopathy that is tender, mobile, and acute favors infection; hard, fixed, nontender nodes favor malignancy. Biopsy with flow cytometry distinguishes lymphoma from reactive hyperplasia.',
          ],
        },
        {
          heading: 'Spleen blood work',
          body: [
            'Red pulp macrophages remove senescent red cells, recycle iron, and clear Howell-Jolly bodies. White pulp marginal zones trap encapsulated bacteria. The spleen also stores platelets and mounts IgM responses to blood antigens.',
            'Mono causes splenomegaly with rupture risk, so contact sports pause until cleared. Portal hypertension causes congestive splenomegaly with cytopenias from sequestration.',
          ],
        },
        {
          heading: 'Skin, mucosa, and microbiome',
          body: [
            'Keratinized skin, sebum acidity, defensins, and competing flora block colonization. Mucus traps, cilia clear, acid kills, and secretory IgA neutralizes without inflammation. Broad antibiotics disrupt flora and invite Clostridioides difficile.',
            'Hand hygiene, wound coverage, and up-to-date tetanus, influenza, pneumococcal, and meningococcal vaccines reinforce barriers. Burns lose skin defense and need infection surveillance.',
          ],
        },
        {
          heading: 'Fever and inflammation signs',
          body: [
            'Rubor, calor, tumor, dolor, and functio laesa mark inflammation from vasodilation and permeability. IL-1, IL-6, and TNF raise hypothalamic set point, causing fever that aids some defenses but raises metabolic demand.',
            'Neutrophilia suggests bacterial infection, lymphocytosis suggests viral, eosinophilia suggests allergy or parasites. Left shift with bands means acute demand outpaces maturation.',
          ],
        },
        {
          heading: 'When to escalate',
          body: [
            'Red flags include rapidly spreading redness, severe pain out of proportion, bullae, immunocompromise with fever, and asplenia with fever. These need urgent evaluation for necrotizing infection or sepsis.',
            'Document node size, location, consistency, mobility, tenderness, and overlying skin. Pair with exposures, travel, animals, and medications to narrow causes.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Germinal center', definition: 'Node site of B mutation and selection.' },
        { term: 'Marginal zone', definition: 'Splenic trap for encapsulated bacteria.' },
        { term: 'Secretory IgA', definition: 'Mucosal antibody neutralizing pathogens.' },
        { term: 'Left shift', definition: 'Immature neutrophils signaling acute infection.' },
        { term: 'Sentinel node', definition: 'First draining node biopsied in cancer staging.' },
        { term: 'Sequestration', definition: 'Splenic trapping causing cytopenias.' },
      ],
      simulation: {
        kind: 'checklist',
        title: 'Node exam routine',
        instructions: 'Perform in order on every case.',
        items: [
          { label: 'Map the drainage', detail: 'Match node group to upstream tissue.' },
          { label: 'Feel consistency', detail: 'Soft mobile tender favors infection; hard fixed favors malignancy.' },
          { label: 'Check spleen and barriers', detail: 'Palpate spleen, inspect skin and mucosa.' },
          { label: 'Review vaccines and exposures', detail: 'Animals, travel, drugs, immunization gaps.' },
        ],
      },
      practice: [
        {
          id: 'anat-u7-l2-q1',
          prompt: 'Hard fixed nontender supraclavicular node most suggests:',
          type: 'mcq',
          options: ['Viral URI', 'Malignancy', 'Allergy', 'Vaccine reaction'],
          answer: 'Malignancy',
          explanation: 'Malignant nodes are classically hard and fixed.',
        },
        {
          id: 'anat-u7-l2-q2',
          prompt: 'Mono with splenomegaly should avoid:',
          type: 'mcq',
          options: ['Rest', 'Contact sports', 'Hydration', 'Follow-up'],
          answer: 'Contact sports',
          explanation: 'Rupture risk persists for weeks.',
        },
        {
          id: 'anat-u7-l2-q3',
          prompt: 'Why are asplenic fevers emergencies?',
          type: 'short',
          answer: 'Overwhelming post-splenectomy sepsis from encapsulated bacteria can progress in hours.',
          explanation: 'Loss of filtration plus poor opsonization is high risk.',
        },
        {
          id: 'anat-u7-l2-q4',
          prompt: 'Eosinophilia favors which causes?',
          type: 'mcq',
          options: ['Acute bacteria', 'Allergy/parasites', 'Viral only', 'Hemorrhage'],
          answer: 'Allergy/parasites',
          explanation: 'Eosinophils target parasites and allergic inflammation.',
        },
        {
          id: 'anat-u7-l2-q5',
          prompt: 'Secretory IgA acts mainly by:',
          type: 'short',
          answer: 'Neutralizing mucosal pathogens without strong inflammation.',
          explanation: 'Immune exclusion at surfaces.',
        },
      ],
    },
    {
      id: 'anat-u8-l1',
      unitId: 'anat-u8',
      title: 'Innate Immunity and Complement',
      durationMin: 32,
      kind: 'text',
      objectives: [
        'Name PRRs, PAMPs, and interferon actions',
        'Order complement pathways and effector outcomes',
        'Explain NK killing and phagocyte steps',
        'Predict complement deficiency infections',
      ],
      sections: [
        {
          heading: 'Sensing danger',
          body: [
            'Pattern recognition receptors such as Toll-like receptors detect conserved microbial patterns and damage signals. TLR4 senses lipopolysaccharide, TLR3 senses double-stranded RNA, TLR5 senses flagellin. Activation triggers NF-kB, cytokines, and costimulation needed for adaptive responses.',
            'Viral double-stranded RNA also triggers interferon alpha and beta, which induce antiviral proteins in neighbors, increase MHC I, and activate NK cells. This buys time before antibodies arrive.',
          ],
        },
        {
          heading: 'Phagocytes and NK cells',
          body: [
            'Neutrophils arrive first, phagocytose, release reactive oxygen, and form NETs. Macrophages clean up, present antigen, and secrete IL-1, IL-6, and TNF. Dendritic cells bridge to T cells in nodes.',
            'NK cells kill virally infected or MHC I-deficient targets using perforin and granzymes. They are inhibited by self-MHC I and activated by stress ligands. Missing-self killing explains control of herpesviruses and tumors.',
          ],
        },
        {
          heading: 'Complement pathways',
          body: [
            'Classical starts with C1 binding antibody-antigen complexes, lectin starts with mannose-binding lectin, alternative starts spontaneously on microbial surfaces. All make C3 convertase, cleaving C3 to C3a and C3b. C3b opsonizes, C3a and C5a recruit inflammation, and C5b-9 forms the membrane attack complex.',
            'Regulators such as factor H, CD55, and CD59 protect host cells. Paroxysmal nocturnal hemoglobinuria from missing GPI anchors causes complement-mediated hemolysis; eculizumab blocks C5.',
          ],
        },
        {
          heading: 'Deficiency patterns',
          body: [
            'Early complement C1-C4 defects cause lupus-like autoimmunity from poor immune complex clearance. C3 deficiency causes severe recurrent bacterial infections. Late C5-C9 defects cause recurrent Neisseria meningitis because MAC lysis fails.',
            'Properdin or factor D defects impair alternative pathway amplification. On tests, recurrent meningococcemia points to terminal complement testing with CH50 and AH50.',
          ],
        },
        {
          heading: 'Inflammation wiring',
          body: [
            'Histamine vasodilates and increases permeability, prostaglandins cause pain and fever, leukotrienes recruit and bronchoconstrict, and bradykinin causes pain and swelling. NSAIDs block cyclooxygenase and prostaglandins; antihistamines block H1 effects.',
            'Chronic granulomas wall off TB and fungi when killing fails. Pus is neutrophils plus debris; sterile inflammation from crystals or trauma uses the same mediators without infection.',
          ],
        },
      ],
      keyTerms: [
        { term: 'PAMP', definition: 'Conserved microbial pattern sensed by innate receptors.' },
        { term: 'Opsonization', definition: 'C3b/antibody coating enhancing phagocytosis.' },
        { term: 'MAC', definition: 'C5b-9 pore lysing gram-negative and Neisseria.' },
        { term: 'Interferon', definition: 'Antiviral cytokine inducing neighbor resistance.' },
        { term: 'NETs', definition: 'Neutrophil DNA traps catching microbes.' },
        { term: 'CH50', definition: 'Total complement activity screening test.' },
      ],
      simulation: {
        kind: 'scenario',
        title: 'Recurrent infection workup',
        instructions: 'Match deficiency to presentation.',
        steps: [
          {
            prompt: 'Teen with recurrent meningococcal meningitis?',
            options: ['C5-C9 defect', 'C1q only', 'IgA only'],
            correct: 0,
            feedback: 'Terminal MAC failure predisposes to Neisseria.',
          },
          {
            prompt: 'Child with severe bacterial infections + lupus-like rash?',
            options: ['Late MAC', 'Early C1-C4/C3 defect', 'No complement issue'],
            correct: 1,
            feedback: 'Early defects impair clearance and predispose to autoimmunity.',
          },
          {
            prompt: 'Nighttime hemoglobinuria + thrombosis?',
            options: ['PNH with CD55/59 loss', 'Simple iron deficiency', 'Asthma'],
            correct: 0,
            feedback: 'Missing GPI anchors allow complement hemolysis.',
          },
        ],
      },
      practice: [
        {
          id: 'anat-u8-l1-q1',
          prompt: 'MAC is formed by:',
          type: 'mcq',
          options: ['C3b only', 'C5b-9', 'IgE alone', 'Histamine'],
          answer: 'C5b-9',
          explanation: 'Terminal pathway creates the lytic pore.',
        },
        {
          id: 'anat-u8-l1-q2',
          prompt: 'C3b mainly functions to:',
          type: 'mcq',
          options: ['Vasoconstrict', 'Opsonize for phagocytosis', 'Block fever', 'Make IgE'],
          answer: 'Opsonize for phagocytosis',
          explanation: 'Coating massively speeds uptake.',
        },
        {
          id: 'anat-u8-l1-q3',
          prompt: 'Why do C5-C9 defects specifically risk Neisseria?',
          type: 'short',
          answer: 'MAC lysis is critical for gram-negative diplococci; opsonization alone is insufficient.',
          explanation: 'Neisseria resist phagocytosis without MAC.',
        },
        {
          id: 'anat-u8-l1-q4',
          prompt: 'NK cells are inhibited by:',
          type: 'mcq',
          options: ['Self MHC I', 'Antibody', 'Complement', 'Fever'],
          answer: 'Self MHC I',
          explanation: 'Missing self triggers killing.',
        },
        {
          id: 'anat-u8-l1-q5',
          prompt: 'TLR4 senses which bacterial molecule?',
          type: 'short',
          answer: 'Lipopolysaccharide endotoxin of gram-negatives.',
          explanation: 'LPS drives septic inflammation.',
        },
      ],
    },
    {
      id: 'anat-u8-l2',
      unitId: 'anat-u8',
      title: 'Adaptive Immunity, Antibodies, and Allergy',
      durationMin: 34,
      kind: 'text',
      objectives: [
        'Compare B and T subsets and MHC restriction',
        'Explain antibody classes and functions',
        'Order hypersensitivity types I-IV with examples',
        'Interpret vaccine and allergy testing',
      ],
      sections: [
        {
          heading: 'Lymphocyte subsets',
          body: [
            'CD8 cytotoxic T cells kill infected cells via MHC I presentation to all nucleated cells. CD4 helper T cells see MHC II on professional antigen-presenting cells: Th1 activates macrophages for intracellular microbes, Th2 helps B and eosinophils for parasites and allergy, Th17 recruits neutrophils for fungi, Treg suppresses excess responses.',
            'B cells present antigen, form germinal centers, and become plasma or memory cells. Memory enables faster stronger secondary responses with IgG dominance, the basis for boosters.',
          ],
        },
        {
          heading: 'Antibody toolkit',
          body: [
            'IgM is first responder and potent complement activator as a pentamer. IgG crosses placenta, opsonizes, and mediates ADCC. IgA guards mucosa as a dimer. IgE binds mast cells and basophils for parasites and allergy. IgD is a B receptor with minor secreted roles.',
            'Monoclonals ending in -mab treat cancer and autoimmunity: rituximab depletes CD20 B cells, omalizumab captures IgE. IVIG provides pooled IgG for immunodeficiency and immune modulation.',
          ],
        },
        {
          heading: 'Hypersensitivity map',
          body: [
            'Type I is IgE immediate: anaphylaxis, asthma, food allergy with minutes onset. Type II is cytotoxic antibody: hemolytic transfusion, Goodpasture, myasthenia. Type III is immune complex: lupus, serum sickness, Arthus reaction. Type IV is delayed T cell: contact dermatitis, TB skin test, transplant rejection.',
            'Anaphylaxis treatment is intramuscular epinephrine first, plus airway, fluids, antihistamines, and steroids as adjuncts. Biphasic reactions can recur hours later, so observe after severe events.',
          ],
        },
        {
          heading: 'Vaccines and herd effects',
          body: [
            'Live attenuated vaccines replicate weakly and are avoided in pregnancy and severe immunodeficiency; inactivated, subunit, toxoid, and mRNA vaccines do not replicate. Adjuvants boost responses. Boosters refresh memory and affinity.',
            'Herd immunity protects those who cannot be vaccinated when coverage is high. Breakthroughs still occur, but disease is milder. Cold chain and records matter for competition scenarios about outbreaks.',
          ],
        },
        {
          heading: 'Testing and counseling',
          body: [
            'Skin prick and specific IgE identify sensitization, but history determines clinical allergy because false positives are common. Food challenges are gold standard under supervision. Component testing refines peanut risk.',
            'Counsel avoidance, label reading, action plans, and epinephrine carriage. Asthma plus food allergy raises fatality risk, so control both.',
          ],
        },
      ],
      keyTerms: [
        { term: 'MHC I vs II', definition: 'I presents to CD8, II presents to CD4.' },
        { term: 'IgE', definition: 'Mast cell antibody mediating immediate allergy.' },
        { term: 'Type III', definition: 'Immune complex deposition disease.' },
        { term: 'Epinephrine first', definition: 'IM epi is definitive anaphylaxis therapy.' },
        { term: 'Memory response', definition: 'Faster stronger IgG recall after priming.' },
        { term: 'Treg', definition: 'Regulatory T suppressing autoimmunity.' },
      ],
      simulation: {
        kind: 'flashcards',
        title: 'Hypersensitivity sort',
        instructions: 'Classify before flipping.',
        cards: [
          { front: 'Peanut anaphylaxis in minutes', back: 'Type I IgE immediate' },
          { front: 'Hemolytic transfusion reaction', back: 'Type II cytotoxic' },
          { front: 'Lupus nephritis deposits', back: 'Type III immune complex' },
          { front: 'Poison ivy 48 hours later', back: 'Type IV delayed T cell' },
        ],
      },
      practice: [
        {
          id: 'anat-u8-l2-q1',
          prompt: 'CD8 T cells recognize antigen on:',
          type: 'mcq',
          options: ['MHC II only', 'MHC I', 'Free antibody', 'Complement'],
          answer: 'MHC I',
          explanation: 'All nucleated cells present endogenous antigen on MHC I.',
        },
        {
          id: 'anat-u8-l2-q2',
          prompt: 'Placental antibody protection is mainly:',
          type: 'mcq',
          options: ['IgM', 'IgG', 'IgE', 'IgD'],
          answer: 'IgG',
          explanation: 'IgG crosses placenta and provides neonatal cover.',
        },
        {
          id: 'anat-u8-l2-q3',
          prompt: 'First drug for anaphylaxis and route?',
          type: 'short',
          answer: 'Intramuscular epinephrine into mid-outer thigh.',
          explanation: 'Epi reverses vasodilation, bronchospasm, and edema fastest.',
        },
        {
          id: 'anat-u8-l2-q4',
          prompt: 'Contact dermatitis is which hypersensitivity?',
          type: 'mcq',
          options: ['I', 'II', 'III', 'IV'],
          answer: 'IV',
          explanation: 'Delayed T cell reaction peaks at 48-72 hours.',
        },
        {
          id: 'anat-u8-l2-q5',
          prompt: 'Why are live vaccines avoided in SCID?',
          type: 'short',
          answer: 'Weakened microbes can still disseminate without T/B control.',
          explanation: 'Replication requires intact adaptive immunity.',
        },
      ],
    },
    {
      id: 'anat-u9-l1',
      unitId: 'anat-u9',
      title: 'Immunodeficiency: HIV, SCID, and CVID',
      durationMin: 30,
      kind: 'text',
      objectives: [
        'Explain HIV tropism, testing, and treatment',
        'Contrast SCID and CVID presentations',
        'Apply vaccine and prophylaxis rules',
        'Interpret CD4 counts and viral loads',
      ],
      sections: [
        {
          heading: 'HIV biology',
          body: [
            'HIV binds CD4 plus CCR5 or CXCR4, fuses, reverse transcribes RNA to DNA, integrates, and buds from helper T cells and macrophages. Acute infection causes mononucleosis-like illness with high viremia, then latency with gradual CD4 fall. AIDS is defined by CD4 under 200 or opportunistic illness.',
            'Opportunistics track CD4: thrush and shingles early, Pneumocystis under 200, toxoplasmosis under 100, MAC and CMV under 50. Kaposi sarcoma from HHV-8 and CNS lymphoma mark advanced disease.',
          ],
        },
        {
          heading: 'Testing and treatment',
          body: [
            'Fourth-generation antigen-antibody tests detect p24 plus antibodies; RNA tests catch window periods and monitor therapy. Treatment uses combination ART with integrase plus two nucleoside backbones to block resistance. Undetectable equals untransmittable with adherence.',
            'Prophylaxis includes TMP-SMX for Pneumocystis when CD4 is low, vaccines when CD4 permits, and post-exposure prophylaxis within 72 hours. Needlestick management tests source and starts PEP immediately.',
          ],
        },
        {
          heading: 'SCID emergencies',
          body: [
            'SCID presents in infancy with failure to thrive, thrush, and severe viral, fungal, and opportunistic infections. Causes include X-linked IL2RG, ADA deficiency, and RAG defects. Lymphopenia with absent T cells is the clue; newborn TREC screening catches cases before BCG or rotavirus vaccines harm.',
            'Management is isolation, no live vaccines, immunoglobulin support, and urgent hematopoietic stem cell transplant or gene therapy. Family counseling includes carrier testing.',
          ],
        },
        {
          heading: 'CVID patterns',
          body: [
            'Common variable immunodeficiency appears in late childhood to adulthood with low IgG plus low IgA or IgM, poor vaccine responses, and recurrent sinopulmonary infections with encapsulated bacteria. Autoimmunity, granulomas, and lymphoma coexist, unlike simple antibody loss.',
            'Treatment is lifelong immunoglobulin replacement plus antibiotics and lung monitoring for bronchiectasis. Distinguish from secondary hypogammaglobulinemia caused by nephrosis, protein-losing enteropathy, or rituximab.',
          ],
        },
        {
          heading: 'Numbers to memorize',
          body: [
            'CD4 normal is roughly 500-1500; under 200 defines AIDS; under 100 adds toxo risk; under 50 adds MAC and CMV risk. Viral load goals are undetectable under 20-50 copies. Vaccine protection needs CD4 recovery first.',
            'For cases, pair age of onset, pathogen type, and immunoglobulin pattern: infant viral plus fungal suggests T defect, adult bacterial sinopulmonary with low Ig suggests CVID, opportunistics with risk factors suggest HIV.',
          ],
        },
      ],
      keyTerms: [
        { term: 'U=U', definition: 'Undetectable viral load means untransmittable.' },
        { term: 'TREC', definition: 'Newborn SCID screen measuring T excision circles.' },
        { term: 'Opportunistic threshold', definition: 'CD4 level predicting specific infections.' },
        { term: 'ART', definition: 'Combination antiretroviral therapy blocking replication.' },
        { term: 'Bronchiectasis', definition: 'Chronic airway dilation from repeated infection.' },
        { term: 'PEP', definition: 'Post-exposure prophylaxis started within 72 hours.' },
      ],
      simulation: {
        kind: 'scenario',
        title: 'Low CD4 workup',
        instructions: 'Choose next best step.',
        steps: [
          {
            prompt: 'CD4 150 with dyspnea and bilateral ground glass?',
            options: ['Treat as Pneumocystis + test HIV/RNA', 'Reassure', 'Steroids alone'],
            correct: 0,
            feedback: 'PJP pattern under 200 needs TMP-SMX plus workup.',
          },
          {
            prompt: '3-month-old with thrush, FTT, absent T cells?',
            options: ['Live vaccines now', 'Isolate, no live vaccines, urgent immunology', 'Wait a year'],
            correct: 1,
            feedback: 'SCID is a transplant emergency.',
          },
          {
            prompt: 'Adult with low IgG/IgA and poor vaccine response?',
            options: ['CVID workup + replacement', 'Single antibiotic only', 'No follow-up'],
            correct: 0,
            feedback: 'CVID needs replacement and lung surveillance.',
          },
        ],
      },
      practice: [
        {
          id: 'anat-u9-l1-q1',
          prompt: 'AIDS is defined by CD4 under ___ or opportunistic illness.',
          type: 'mcq',
          options: ['500', '350', '200', '50'],
          answer: '200',
          explanation: 'Threshold marks severe immunodeficiency.',
        },
        {
          id: 'anat-u9-l1-q2',
          prompt: 'Pneumocystis prophylaxis uses:',
          type: 'mcq',
          options: ['TMP-SMX', 'Insulin', 'Albuterol', 'Iron'],
          answer: 'TMP-SMX',
          explanation: 'Low CD4 triggers primary prophylaxis.',
        },
        {
          id: 'anat-u9-l1-q3',
          prompt: 'SCID newborn screen measures:',
          type: 'short',
          answer: 'TREC copies from dried blood spot.',
          explanation: 'Absent TRECs flag missing T development.',
        },
        {
          id: 'anat-u9-l1-q4',
          prompt: 'CVID labs show:',
          type: 'mcq',
          options: ['High IgG only', 'Low IgG + low IgA/IgM with poor responses', 'Normal all', 'High IgE only'],
          answer: 'Low IgG + low IgA/IgM with poor responses',
          explanation: 'Combined antibody failure defines CVID.',
        },
        {
          id: 'anat-u9-l1-q5',
          prompt: 'HIV binds CD4 plus which coreceptors?',
          type: 'short',
          answer: 'CCR5 early, CXCR4 later; tropism shifts with progression.',
          explanation: 'Coreceptor use determines cell targets.',
        },
      ],
    },
    {
      id: 'anat-u9-l2',
      unitId: 'anat-u9',
      title: 'Autoimmunity, MS, RA, and Anaphylaxis Action',
      durationMin: 30,
      kind: 'text',
      objectives: [
        'Explain tolerance loss and molecular mimicry',
        'Contrast MS and RA pathology and drugs',
        'Write an anaphylaxis action sequence',
        'Separate allergy from autoimmunity on tests',
      ],
      sections: [
        {
          heading: 'Tolerance and triggers',
          body: [
            'Central tolerance deletes self-reactive lymphocytes; peripheral tolerance uses anergy, deletion, and Treg suppression. Infections can trigger mimicry when microbial peptides resemble self, epitope spreading after tissue damage, or bystander activation in inflammation.',
            'Risk combines HLA alleles, female sex for many diseases, smoking, vitamin D deficiency, and gut dysbiosis. Autoantibodies may be pathogenic or markers; biopsy and function matter more than titer alone.',
          ],
        },
        {
          heading: 'Multiple sclerosis',
          body: [
            'MS is central demyelination with relapsing optic neuritis, internuclear ophthalmoplegia, Lhermitte sign, and Uhthoff heat worsening. MRI shows Dawson fingers and juxtacortical, periventricular, infratentorial, and spinal lesions disseminated in space and time.',
            'Acute relapses use high-dose steroids; disease-modifying therapies include interferons, anti-CD20, natalizumab with PML risk, and transplant in aggressive cases. Mimics include NMO with aquaporin-4 antibodies and MOG disease.',
          ],
        },
        {
          heading: 'Rheumatoid arthritis',
          body: [
            'RA is symmetric small-joint synovitis with morning stiffness over an hour, rheumatoid factor and anti-CCP antibodies, and erosions. Extra-articular disease includes nodules, lung fibrosis, and vasculitis. Osteoarthritis is asymmetric, weight-bearing, with bony Heberden and Bouchard nodes and short stiffness.',
            'Treatment starts with methotrexate plus short steroids, then TNF, JAK, or other biologics with tuberculosis screening. Treat-to-target uses DAS scores; smoking cessation improves response.',
          ],
        },
        {
          heading: 'Anaphylaxis sequence',
          body: [
            'Speed matters: remove trigger, call emergency, give IM epinephrine mid-thigh, place supine with legs up unless breathing is compromised, add oxygen and fluids, then antihistamines and steroids as adjuncts. Repeat epi every 5-15 minutes if needed.',
            'Biphasic recurrence, beta-blocker resistance requiring glucagon, and asthma overlap complicate cases. Prescribe two auto-injectors, train family, and document a written plan with allergen spelling.',
          ],
        },
        {
          heading: 'Test discriminators',
          body: [
            'MS worsens with heat and shows central white matter lesions; Guillain-Barre ascends peripherally after infection with albuminocytologic dissociation. RA is symmetric with anti-CCP; lupus is multisystem with ANA and immune complexes; anaphylaxis is minutes with airway and pressure collapse.',
            'For vignettes, note tempo, symmetry, heat effect, antibody pattern, and first drug: steroids for MS relapse, methotrexate for RA, epi for anaphylaxis.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Molecular mimicry', definition: 'Microbial-self similarity triggering autoimmunity.' },
        { term: 'Dawson fingers', definition: 'Perpendicular MS plaques around ventricles.' },
        { term: 'Anti-CCP', definition: 'Specific RA antibody against citrullinated peptides.' },
        { term: 'Biphasic reaction', definition: 'Anaphylaxis recurrence hours after improvement.' },
        { term: 'Treat-to-target', definition: 'Escalation strategy to remission scores.' },
        { term: 'Uhthoff phenomenon', definition: 'Heat-worsened MS neurologic symptoms.' },
      ],
      simulation: {
        kind: 'checklist',
        title: 'Anaphylaxis action drill',
        instructions: 'Check in strict order.',
        items: [
          { label: 'IM epi mid-thigh now', detail: '0.3-0.5 mg adult, 0.15 mg child; repeat q5-15 min.' },
          { label: 'Position + oxygen + fluids', detail: 'Supine legs up; airway priority if stridor.' },
          { label: 'Call emergency + monitor', detail: 'Watch 4-6 hours for biphasic return.' },
          { label: 'Adjuncts + plan', detail: 'Antihistamine/steroid after epi; prescribe 2 injectors.' },
        ],
      },
      practice: [
        {
          id: 'anat-u9-l2-q1',
          prompt: 'Heat-worsened blurred vision with INO suggests:',
          type: 'mcq',
          options: ['RA', 'MS', 'Gout', 'Celiac'],
          answer: 'MS',
          explanation: 'Uhthoff plus INO localizes to central demyelination.',
        },
        {
          id: 'anat-u9-l2-q2',
          prompt: 'Most specific RA antibody:',
          type: 'mcq',
          options: ['ANA', 'Anti-CCP', 'ASO', 'Anti-tTG'],
          answer: 'Anti-CCP',
          explanation: 'Citrullinated peptide antibodies define RA.',
        },
        {
          id: 'anat-u9-l2-q3',
          prompt: 'First action in anaphylaxis with hypotension?',
          type: 'short',
          answer: 'IM epinephrine mid-outer thigh immediately.',
          explanation: 'No adjunct replaces timely epi.',
        },
        {
          id: 'anat-u9-l2-q4',
          prompt: 'RA vs OA morning stiffness pattern:',
          type: 'mcq',
          options: ['RA >1 hr symmetric small joints; OA brief weight-bearing', 'Both identical', 'OA longer', 'No stiffness either'],
          answer: 'RA >1 hr symmetric small joints; OA brief weight-bearing',
          explanation: 'Duration and distribution separate them.',
        },
        {
          id: 'anat-u9-l2-q5',
          prompt: 'Beta-blocked anaphylaxis refractory to epi may need:',
          type: 'short',
          answer: 'Glucagon plus fluids/vasopressors in ICU setting.',
          explanation: 'Glucagon bypasses beta blockade.',
        },
      ],
    },
    {
      id: 'anat-u10-l1',
      unitId: 'anat-u10',
      title: 'Case Reasoning: Vitals, ABGs, and Imaging',
      durationMin: 32,
      kind: 'text',
      objectives: [
        'Interpret vitals, pulse oximetry, and capnography trends',
        'Read ABGs with compensation logic',
        'Identify key chest and abdomen imaging signs',
        'Structure a timed case answer',
      ],
      sections: [
        {
          heading: 'Vitals and monitors',
          body: [
            'Track temperature, pressure, rate, saturation, and pain together. Hypotension plus tachycardia suggests volume loss or sepsis; hypertension plus bradycardia suggests raised intracranial pressure. Pulse oximetry lags during poor perfusion; check waveform and warmth.',
            'Capnography shows ventilation: flat low EtCO2 suggests hyperventilation or poor perfusion, rising EtCO2 suggests hypoventilation or return of circulation, shark-fin waveform suggests bronchospasm.',
          ],
        },
        {
          heading: 'ABG method',
          body: [
            'Use a fixed order: pH acid or alkaline, PaCO2 respiratory driver, bicarbonate metabolic driver, compensation as expected, oxygenation and A-a gradient. Acute respiratory acidosis barely changes bicarbonate; chronic retention raises it through kidneys.',
            'Example: pH 7.30, PaCO2 55, HCO3 26 equals acute respiratory acidosis from hypoventilation. pH 7.48, PaCO2 28, HCO3 22 equals acute respiratory alkalosis from hyperventilation. Winter formula checks metabolic acidosis compensation.',
          ],
        },
        {
          heading: 'Chest imaging signs',
          body: [
            'Silhouette sign localizes consolidation to adjacent structures. Air bronchograms confirm patent bronchi in consolidated lung. Kerley B lines mark interstitial edema. Pneumothorax shows absent markings plus visible pleural line; tension adds shift.',
            'Effusion blunts costophrenic angles and layers on lateral decubitus. Hyperinflation flattens diaphragms in COPD. Ground glass suggests Pneumocystis, edema, or hemorrhage depending on context.',
          ],
        },
        {
          heading: 'Abdomen and immune imaging',
          body: [
            'Free air under diaphragm means perforation. Dilated loops with air-fluid levels mean obstruction; thumbprinting suggests ischemia. Splenomegaly plus nodes suggests mono or lymphoma; rim-enhancing nodes suggest infection or metastasis.',
            'CT with contrast shows appendiceal wall thickening, fat stranding, and appendicolith. Ultrasound is first for gallbladder wall thickening and Murphy sonographic sign in pregnancy and youth.',
          ],
        },
        {
          heading: 'Timed answer template',
          body: [
            'State most likely diagnosis, top two differentials, key supporting and refuting findings, next test, and immediate management. Include normal ranges and units to earn full credit.',
            'Example close: Most likely right middle lobe pneumonia given fever, productive cough, and silhouette loss; next obtain chest X-ray and start guideline antibiotics while monitoring oximetry; consider TB if apical cavitation appears.',
          ],
        },
      ],
      keyTerms: [
        { term: 'A-a gradient', definition: 'Alveolar-arterial O2 gap marking shunt/V-Q disease.' },
        { term: 'Winter formula', definition: 'Expected PaCO2 in metabolic acidosis compensation.' },
        { term: 'Silhouette sign', definition: 'Loss of border where consolidation touches structure.' },
        { term: 'Murphy sign', definition: 'Inspiratory arrest on gallbladder palpation.' },
        { term: 'EtCO2', definition: 'End-tidal CO2 reflecting ventilation and perfusion.' },
        { term: 'Ground glass', definition: 'Hazy opacity preserving bronchial markings.' },
      ],
      simulation: {
        kind: 'scenario',
        title: 'ABG sprint',
        instructions: 'Interpret each gas.',
        steps: [
          {
            prompt: 'pH 7.31, PaCO2 55, HCO3 27?',
            options: ['Respiratory acidosis', 'Metabolic alkalosis', 'Normal'],
            correct: 0,
            feedback: 'Acid pH with high CO2 is respiratory acidosis.',
          },
          {
            prompt: 'pH 7.50, PaCO2 28, HCO3 21?',
            options: ['Respiratory alkalosis', 'Metabolic acidosis', 'Mixed normal'],
            correct: 0,
            feedback: 'Alkaline pH with low CO2 is respiratory alkalosis.',
          },
          {
            prompt: 'Silent chest + SpO2 88% in asthma?',
            options: ['Mild attack', 'Severe, escalate now', 'Discharge'],
            correct: 1,
            feedback: 'Silent chest means minimal air movement.',
          },
        ],
      },
      practice: [
        {
          id: 'anat-u10-l1-q1',
          prompt: 'pH 7.30 with PaCO2 55 indicates:',
          type: 'mcq',
          options: ['Metabolic alkalosis', 'Respiratory acidosis', 'Respiratory alkalosis', 'Normal'],
          answer: 'Respiratory acidosis',
          explanation: 'Acid pH plus retained CO2.',
        },
        {
          id: 'anat-u10-l1-q2',
          prompt: 'Air bronchograms are seen in:',
          type: 'mcq',
          options: ['Pneumothorax', 'Consolidation', 'Effusion', 'Normal'],
          answer: 'Consolidation',
          explanation: 'Air-filled bronchi stand out in fluid-filled alveoli.',
        },
        {
          id: 'anat-u10-l1-q3',
          prompt: 'Shark-fin capnography suggests?',
          type: 'short',
          answer: 'Bronchospasm/obstruction with prolonged expiration.',
          explanation: 'Obstructed exhalation slows CO2 rise.',
        },
        {
          id: 'anat-u10-l1-q4',
          prompt: 'Free air under diaphragm means:',
          type: 'mcq',
          options: ['Pneumonia', 'Perforated viscus', 'Asthma', 'Cystitis'],
          answer: 'Perforated viscus',
          explanation: 'Peritoneal air is surgical until proven otherwise.',
        },
        {
          id: 'anat-u10-l1-q5',
          prompt: 'Why check waveform with low SpO2?',
          type: 'short',
          answer: 'Poor perfusion or motion causes false lows; waveform confirms signal.',
          explanation: 'Treat the patient plus the probe.',
        },
      ],
    },
    {
      id: 'anat-u10-l2',
      unitId: 'anat-u10',
      title: 'Competition Strategy and Study System',
      durationMin: 26,
      kind: 'video',
      videoUrl: '',
      objectives: [
        'Build a binder/cheatsheet allowed by current rules',
        'Plan pacing for stations and written tests',
        'Avoid common misreads and unit errors',
        'Run a final-week review schedule',
      ],
      sections: [
        {
          heading: 'Rules-first preparation',
          body: [
            'Read the current Science Olympiad rules for permitted sheets, stations, and topics because respiratory, digestive, and immune emphasis rotates. Note whether resources must be handwritten, single-sided, or secured in a binder. Never bring prohibited devices or extra pages.',
            'Mirror the syllabus in your notes: one tab per unit, one page per high-yield diagram, and a formulas box for ventilation, FEV1/FVC, Henderson-Hasselbalch, and Winter equation. Index every page for station speed.',
          ],
        },
        {
          heading: 'Diagram fluency',
          body: [
            'Redraw airways, alveoli, gut, liver plumbing, marrow-thymus-node flow, antibody classes, and complement cascades from memory weekly. Label in exam orientation, not textbook orientation, and add normal values beside each structure.',
            'Practice with unlabeled images and timed identification. Teach each diagram aloud; hesitation marks a gap to patch the same day.',
          ],
        },
        {
          heading: 'Station tactics',
          body: [
            'Skim all stations first, answer confident items, and flag calculation or case items for second pass. Write units on every number and circle whether pH is acid or alkaline before interpreting gases.',
            'For practicals, narrate observations: color, consistency, location, and comparison to normal. If unsure between two diagnoses, list the one test that best separates them.',
          ],
        },
        {
          heading: 'Error-proofing',
          body: [
            'Common losses include confusing MHC I with II, IgG with IgM timing, shunt with dead space, melena with hematochezia, and right with left bronchus. Make a personal error log and review it before every test.',
            'Check oxygen versus ventilation: low SpO2 with normal PaCO2 suggests shunt or V/Q mismatch, while high PaCO2 means hypoventilation regardless of saturation.',
          ],
        },
        {
          heading: 'Final-week plan and video use',
          body: [
            'Use the video to shadow-draw each system at 1.25 speed, pausing to recite enzymes, antibodies, and thresholds. Then complete one timed mixed set and one open-note set to test both recall and lookup speed.',
            'Sleep, hydrate, and pack permitted sheets, pens, calculator if allowed, and a watch. Arrive early to settle microscopes, models, and station flow.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Index tabbing', definition: 'Labeled binder tabs for station-speed lookup.' },
        { term: 'Second pass', definition: 'Return strategy for flagged calculations/cases.' },
        { term: 'Error log', definition: 'Personal list of repeat misreads to review.' },
        { term: 'Allowed sheet', definition: 'Rules-limited notes; verify current year limits.' },
        { term: 'Shadowing', definition: 'Drawing along with video for active recall.' },
        { term: 'Teach-back', definition: 'Explaining aloud to expose gaps.' },
      ],
      simulation: {
        kind: 'checklist',
        title: 'Meet-day pack',
        instructions: 'Confirm each item the night before.',
        items: [
          { label: 'Rules-legal notes', detail: 'Correct pages, sides, and securing method.' },
          { label: 'Diagrams memorized', detail: 'Airway, alveolus, gut, lymph, antibodies.' },
          { label: 'Formulas boxed', detail: 'Ventilation, FEV1/FVC, ABG steps, Winter.' },
          { label: 'Pacing rehearsed', detail: 'Skim, answer, second pass, units always.' },
        ],
      },
      practice: [
        {
          id: 'anat-u10-l2-q1',
          prompt: 'Best first pass strategy for stations:',
          type: 'mcq',
          options: ['Answer in order only', 'Skim, answer confident, flag rest', 'Skip diagrams', 'No watch'],
          answer: 'Skim, answer confident, flag rest',
          explanation: 'Bank points before spending time on hard items.',
        },
        {
          id: 'anat-u10-l2-q2',
          prompt: 'MHC I presents to ___; MHC II presents to ___.',
          type: 'short',
          answer: 'CD8; CD4.',
          explanation: 'Core adaptive discriminator.',
        },
        {
          id: 'anat-u10-l2-q3',
          prompt: 'High PaCO2 with acid pH means:',
          type: 'mcq',
          options: ['Hyperventilation', 'Hypoventilation', 'No issue', 'Metabolic only'],
          answer: 'Hypoventilation',
          explanation: 'Retained CO2 acidifies blood.',
        },
        {
          id: 'anat-u10-l2-q4',
          prompt: 'Right main bronchus aspiration reason:',
          type: 'short',
          answer: 'Wider, shorter, more vertical than left.',
          explanation: 'Anatomy predicts foreign body site.',
        },
        {
          id: 'anat-u10-l2-q5',
          prompt: 'Shunt vs dead space one-line contrast:',
          type: 'short',
          answer: 'Shunt: perfusion without ventilation; dead space: ventilation without perfusion.',
          explanation: 'Oxygen helps dead space/V-Q more than true shunt.',
        },
      ],
    },
  ],
};
