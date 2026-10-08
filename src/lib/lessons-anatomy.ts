import type { EventLessons } from './lessons';

export const anatomyLessons: EventLessons = {
  eventId: 'anatomy-and-physiology',
  eventName: 'Anatomy and Physiology',
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
      description:
        'Conducting and respiratory zones, lungs, alveoli, pleura, and breathing muscles.',
      lessonIds: ['anat-u2-l1', 'anat-u2-l2'],
    },
    {
      id: 'anat-u3',
      title: 'Unit 3: Respiratory Physiology',
      description:
        'Ventilation, lung volumes, gas exchange, oxygen transport, and control of breathing.',
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
      description:
        'Case studies, medical imaging, vitals interpretation, and competition strategy.',
      lessonIds: ['anat-u10-l1', 'anat-u10-l2'],
    },
  ],
  lessons: [
    {
      id: 'anat-u1-l1',
      unitId: 'anat-u1',
      title: 'Anatomical Language, Planes, and Organization',
      durationMin: 40,
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
            'A sagittal body plane divides left and right portions; a midsagittal plane passes through the midline. A frontal or coronal plane divides anterior and posterior portions. A transverse plane divides superior and inferior portions. Oblique sections pass at an angle to the standard planes.',
            'A cross section of a particular organ is perpendicular to that organ’s local long axis. Because organs such as bowel curve, an organ cross section does not always coincide with a transverse body plane. Identify the reference frame and orientation markers before naming a cut.',
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
        {
          heading: 'Build a spatial description from reference points',
          body: [
            "A useful anatomical description answers three separate questions: whose perspective is used, which structures are being compared, and along which axis? Right and left always belong to the person being described. In an anterior-view illustration, the person's right appears on the viewer's left. First label the patient's right and left, then identify the midline, then locate the structure. This procedure prevents an apparently correct organ label from being placed on the wrong side. A directional word expresses a relationship, not an absolute address: the sternum is anterior to the heart, while the heart is anterior to much of the vertebral column.",
            "Plane names describe a cut through a reference body, whereas longitudinal and cross sections describe a cut relative to a particular structure's long axis. The small intestine bends in many directions. A transverse body image can therefore show one bowel segment in cross section and another obliquely. For a cylindrical tube, a true perpendicular cut makes a circular lumen; an oblique cut makes an ellipse. Do not assume every circle in an image is a blood vessel or that every horizontal body slice cuts all organs perpendicularly. Use wall layers and neighboring structures to identify the tissue.",
          ],
        },
        {
          heading: 'Connect microscopic structure to a physiological job',
          body: [
            "Epithelial cells lie on a basement membrane and separate two environments. Their apical surface faces a lumen or exterior; their basal surface faces underlying connective tissue. A thin simple squamous layer minimizes the distance a gas crosses in an alveolus. Stratified squamous epithelium protects the esophagus against abrasion as a food bolus passes. A simple columnar intestinal cell provides space for transport proteins, while microvilli enlarge its absorptive surface. These are causal explanations: name the structural feature, state how it changes a physical process, and connect that process to the organ's function.",
            'Connective tissue supplies support, extracellular matrix, and often a vascular route for exchange. Muscle produces force; nervous tissue coordinates information. An organ is not assigned to a tissue class simply because one class is conspicuous. A bronchus contains epithelium, connective tissue, cartilage, smooth muscle, vessels, and nerves. Likewise, blood is a connective tissue despite being fluid. When tracing levels of organization, keep examples within one chain: a phospholipid contributes to a cell membrane; an epithelial cell contributes to alveolar epithelium; alveoli contribute to lung structure; lungs participate in the respiratory system. Mixing unrelated examples obscures how lower levels produce higher-level function.',
          ],
        },
        {
          heading: 'Distinguish a potential space from an organ compartment',
          body: [
            'A serous cavity is normally a narrow, fluid-lubricated potential space between visceral and parietal layers. The lung is covered by visceral pleura; it is not floating inside a large empty pleural room. Similarly, saying that an organ is intraperitoneal describes its relationship to peritoneum, not that the organ lies inside the fluid-filled potential space. Retroperitoneal inflammation can spread along tissue planes and is not guaranteed to remain contained. On a competition diagram, identify the organ surface, the membrane attached to it, the potential space, and the body-wall membrane in that order. This four-part sequence supports later reasoning about friction, fluid accumulation, and pressure coupling.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Anatomical position',
          definition:
            'Standard reference posture with palms forward used for all directional descriptions.',
        },
        {
          term: 'Midsagittal plane',
          definition: 'Midline plane dividing body into equal left and right halves.',
        },
        {
          term: 'Mediastinum',
          definition:
            'Central thoracic compartment containing heart, thymus, trachea, and esophagus.',
        },
        {
          term: 'Retroperitoneal',
          definition: 'Behind the parietal peritoneum; e.g. kidneys, pancreas, duodenum.',
        },
        {
          term: 'Serous membrane',
          definition: 'Parietal plus visceral layers with lubricating serous fluid.',
        },
        {
          term: 'Pseudostratified epithelium',
          definition: 'Single cell layer appearing stratified; ciliated type lines most airways.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Identify an unknown tissue section',
        diagram: 'tissue-section',
        instructions:
          'Open the observations, then decide which structure best explains all of them.',
        observations: [
          {
            label: 'View lining',
            result: 'Many flattened cell layers protect the luminal surface.',
          },
          {
            label: 'View wall',
            result: 'Smooth and skeletal muscle contribute to propulsion along this organ.',
          },
          {
            label: 'Locate section',
            result: 'The organ lies behind the trachea and leads toward the stomach.',
          },
        ],
        question: 'Which structure fits the evidence?',
        options: ['Esophagus', 'Alveolus', 'Small intestinal villus'],
        correct: 0,
        explanation:
          'The location, protective stratified lining, and propulsive wall agree with esophagus; the alternatives are specialized for exchange or absorption.',
      },
      practice: [
        {
          id: 'anat-u1-l1-q1',
          prompt: 'The sternum is ___ to the heart and the elbow is ___ to the wrist.',
          type: 'mcq',
          options: [
            'anterior; proximal',
            'posterior; distal',
            'anterior; distal',
            'superior; proximal',
          ],
          answer: 'anterior; proximal',
          explanation: 'Sternum lies in front of heart; elbow is closer to trunk than wrist.',
        },
        {
          id: 'anat-u1-l1-q2',
          prompt:
            'Which cut through a straight segment of intestine best shows concentric wall layers?',
          type: 'mcq',
          options: [
            'Parallel to its long axis',
            'Perpendicular to the segment’s long axis',
            'Always midsagittal',
            'Always frontal',
          ],
          answer: 'Perpendicular to the segment’s long axis',
          explanation:
            'A true local cross section is perpendicular to the tube, regardless of its orientation in the body.',
        },
        {
          id: 'anat-u1-l1-q3',
          prompt: 'Name a retroperitoneal organ and explain the anatomical relationship.',
          type: 'short',
          answer:
            'A kidney, most of the pancreas, or much of the duodenum lies behind the parietal peritoneum.',
          explanation:
            'Retroperitoneal location changes the tissue planes involved; it does not guarantee inflammation remains contained.',
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
          answer:
            'Pericardial cavity in mediastinum; parietal and visceral pericardium with serous fluid.',
          explanation: 'Parietal lines the sac, visceral covers the heart.',
        },
        {
          id: 'anat-u1-l1-q6',
          prompt: 'Why can a transverse body image show an intestinal lumen as an ellipse?',
          type: 'short',
          answer:
            'The bowel segment may run obliquely through the body plane, so the cut is not perpendicular to its local long axis.',
          explanation:
            'Body planes and sections relative to an organ are different reference systems.',
          points: 3,
        },
        {
          id: 'anat-u1-l1-q7',
          prompt:
            'Explain why thin alveolar epithelium and thick esophageal epithelium are both useful.',
          type: 'short',
          answer:
            'A thin exchange barrier shortens diffusion distance; multiple protective layers resist mechanical abrasion.',
          explanation:
            'Connect each structural difference to its physical function rather than simply memorizing the tissue names.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Orient an unfamiliar section',
        problem:
          'A cross section of a hollow tube shows an abrasion-resistant lining, connective tissue, and thick muscle. The tube lies posterior to the trachea. Is it more consistent with esophagus or an alveolus?',
        steps: [
          'Begin with location: posterior to the trachea is consistent with the esophagus. An alveolus lies in lung parenchyma rather than as a large central tube.',
          'Use the lining: stratified squamous epithelium protects against food abrasion. An alveolus requires a very thin simple squamous exchange surface.',
          'Use the wall: substantial muscle can propel a bolus. An alveolus does not have a thick peristaltic muscle wall.',
          'State the complete relationship: the esophagus is posterior to the trachea; the two structures have different epithelial and mechanical functions.',
        ],
        conclusion:
          'Several independent structural clues support esophagus. Shape alone would be insufficient because many structures appear circular in cross section.',
      },
    },
    {
      id: 'anat-u1-l2',
      unitId: 'anat-u1',
      title: 'Homeostasis, Feedback, and Gradients',
      durationMin: 35,
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
            'Diffusion produces net movement down a concentration gradient. Oxygen crosses the respiratory membrane by diffusion. Facilitated transport uses membrane proteins, while active transport maintains gradients using energy directly or indirectly. Intestinal sodium-glucose cotransport uses the sodium gradient maintained by the sodium-potassium pump.',
            'Osmosis concerns water movement across a selectively permeable membrane. Tonicity depends on effective nonpenetrating solutes and predicts changes in cell volume. A hypertonic environment draws water from a cell; a hypotonic environment tends to increase cell volume. Membrane permeability and the relevant solutes must be specified.',
          ],
        },
        {
          heading: 'From molecule to test question',
          body: [
            'Homeostasis questions often combine systems: dehydration raises osmolarity, ADH rises, aquaporins insert, water reabsorption increases, urine concentrates, and thirst drives intake. High altitude lowers PO2, chemoreceptors raise ventilation, kidneys release EPO, red cell mass rises over days.',
            'When interpreting a case, first name the variable, set point, sensor, and effector, then state whether feedback is negative or positive and predict the next change. Include units and normal ranges when given: pH 7.35-7.45, PaCO2 35-45 mmHg, fasting glucose near 70-100 mg/dL.',
          ],
        },
        {
          heading: 'Track the regulated variable, not just the hormone',
          body: [
            'A feedback diagram begins with a measurable regulated variable, such as extracellular glucose concentration, arterial pressure, or temperature. A hormone is usually a signal within the loop rather than the variable the loop exists to stabilize. Write a disturbance first, then follow the receptor, integrating process, effector, and resulting change. Rising glucose stimulates insulin release; insulin promotes glucose uptake in skeletal muscle and adipose tissue and favors storage while suppressing hepatic glucose output. The resulting decline in glucose reduces the original stimulus. Calling the process negative feedback describes this opposing direction, not a harmful outcome.',
            'A set point is a reference around which a variable is regulated, not a perfectly fixed number. Circadian rhythms, exercise, meals, and changes in physiological state affect observed values. Fever involves a regulated rise in the temperature set point; unregulated heat accumulation is a different mechanism. A sensor can function while an effector fails, and an effector can function while the signal is absent. To localize a defect, ask whether the disturbance was detected, whether an appropriate signal was generated, and whether the target responded. This creates testable predictions rather than a list of hormone names.',
          ],
        },
        {
          heading: 'Use gradients to explain movement',
          body: [
            'Diffusion is net movement down a concentration gradient produced by random molecular motion. At equilibrium molecules still move, but there is no net flux. A larger gradient, greater area, or shorter diffusion distance changes the rate. Facilitated diffusion uses channels or carriers but remains energetically downhill. Primary active transport uses an energy source such as ATP directly; secondary active transport uses a gradient established by another transport process. Sodium-glucose cotransport in intestinal epithelium therefore depends indirectly on ATP because the sodium gradient is maintained by the sodium-potassium pump.',
            "Osmosis is movement of water across a selectively permeable barrier in response to differences in effective solute concentration. Tonicity predicts a cell's volume change and depends on solutes that do not readily cross that membrane. An extracellular solution with a higher effective solute concentration draws water from a cell, reducing its volume. Do not replace this reasoning with the statement that water always moves toward salt: membrane permeability and the relevant solutes matter. In a physiological chain, distinguish diffusion of oxygen, active maintenance of ion gradients, and pressure-driven bulk flow of blood. All transport material, but each has a different driving force and mathematical description.",
          ],
        },
        {
          heading: 'Interpret stability and timing',
          body: [
            'A negative-feedback loop can overshoot when signals or effectors are delayed. Stronger correction is not automatically better: a delayed excessive response may oscillate around the set point. The interactive model below deliberately omits delay so you can first isolate correction strength. Setting correction to zero leaves the error unchanged; increasing correction removes a greater fraction each step. Positive feedback, such as amplification within a clotting process, requires a terminating event or limiting condition. Feedforward differs again: anticipatory responses begin before a measured disturbance fully develops. Use these distinctions when an examination asks why a graph rises, levels off, or reverses after a stimulus.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Negative feedback',
          definition: 'Output reverses the stimulus to restore set point.',
        },
        {
          term: 'Positive feedback',
          definition: 'Output amplifies the stimulus toward a climax.',
        },
        {
          term: 'Baroreceptor',
          definition: 'Stretch receptor sensing blood pressure in carotid and aorta.',
        },
        {
          term: 'Osmolarity',
          definition: 'Solute concentration determining water movement.',
        },
        {
          term: 'Set point',
          definition: 'Target value maintained by a control loop.',
        },
        {
          term: 'Chemoreceptor',
          definition: 'Sensor for CO2, pH, and O2 driving ventilation.',
        },
      ],
      simulation: {
        kind: 'model',
        model: 'feedback',
        title: 'Feedback control bench',
        instructions: 'Change one variable at a time and watch the remaining error.',
        challenge:
          'Compare zero correction with 0.5 correction after four steps; then reverse the disturbance sign.',
        takeaway: 'Negative feedback opposes either direction of deviation.',
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
          prompt:
            'Explain why isotonic saline is used for volume replacement rather than pure water.',
          type: 'short',
          answer:
            'Isotonic fluid stays extracellular and preserves red cell volume; pure water would cause osmotic hemolysis and cellular swelling.',
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
        {
          id: 'anat-u1-l2-q6',
          prompt:
            'An 8-unit deviation is corrected by 50% each step. What remains after three steps?',
          type: 'short',
          answer: '1 unit: 8 × 0.5³.',
          explanation: 'The correction applies to the remaining error each time.',
          points: 3,
        },
        {
          id: 'anat-u1-l2-q7',
          prompt:
            'A sensor detects a disturbance and the control signal rises, but the variable does not recover. What part of the loop should you investigate?',
          type: 'short',
          answer:
            'The effector or its responsiveness, while considering whether the disturbance exceeds the response capacity.',
          explanation:
            'Detection and signaling alone do not establish that the corrective output is functioning.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Read a negative-feedback trace',
        problem:
          'A variable begins 8 units above its reference. Each step corrects 25% of the remaining deviation. Predict the error after two steps.',
        steps: [
          'Keep the reference separate from the deviation. The model concerns an 8-unit error, not an absolute hormone concentration.',
          'After step one, remove 0.25 × 8 = 2 units. The remaining error is 6 units.',
          'After step two, remove 0.25 × 6 = 1.5 units. The remaining error is 4.5 units.',
          'Equivalently, error = 8 × (1 − 0.25)² = 4.5. Correction gets smaller as the disturbance shrinks; it is not a fixed 2-unit subtraction.',
        ],
        conclusion:
          'The response opposes the disturbance and approaches the reference. This mathematical illustration does not specify real biological response times.',
      },
    },
    {
      id: 'anat-u2-l1',
      unitId: 'anat-u2',
      title: 'Airways: From Nose to Bronchioles',
      durationMin: 35,
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
            'The pharynx has nasopharynx with adenoids and auditory tube openings, oropharynx shared with food, and laryngopharynx directing flow. The larynx houses vocal folds and protective structures involved in swallowing. The thyroid cartilage forms the laryngeal prominence; the cricoid is the only complete ring.',
          ],
        },
        {
          heading: 'Trachea and bronchial tree',
          body: [
            'The trachea has 16-20 C-shaped cartilages with trachealis smooth muscle posteriorly, allowing esophageal expansion. At the carina near the sternal-angle level, approximately T4-T5, it bifurcates. The right main bronchus is wider, shorter, and more vertical, so aspirated objects favor the right lower lobe.',
            'Bronchi gain plates of cartilage, bronchioles lose cartilage and gain smooth muscle. Terminal bronchioles mark the end of the conducting zone; respiratory bronchioles begin gas exchange. Asthma constricts bronchiolar smooth muscle, dramatically raising resistance because resistance scales inversely with radius to the fourth power in an ideal laminar tube.',
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
            'For competition diagrams, label turbinates, auditory tube, epiglottis, thyroid and cricoid cartilages, carina, main bronchi, and lobar bronchi. Note that the right lung has three lobes and ten segments while the left has two lobes, a variable number of segments (often described as eight to ten), and a lingula.',
          ],
        },
        {
          heading: 'Follow a particle through the branching tree',
          body: [
            'Air travels from nasal cavity through pharynx, larynx, trachea, main bronchi, lobar bronchi, segmental bronchi, smaller bronchi, and bronchioles. Terminal bronchioles end the conducting zone. Respiratory bronchioles have alveoli in their walls and lead toward alveolar ducts and sacs. This boundary matters because air in the conducting zone does not directly exchange gases with pulmonary capillary blood. Conducting tissue still performs essential work: warming, humidifying, filtering, and distributing inspired air. Losing these functions can injure distal surfaces even if the airway remains physically open.',
            "As airways branch, a single branch becomes narrower, but total cross-sectional area across all parallel branches increases greatly. This reduces average airflow speed toward the respiratory zone. Do not conclude that the smallest individual airway must account for the largest total resistance of the whole network: many small pathways operate in parallel. Cartilage supports larger airways; smooth muscle can change the caliber of smaller airways. Airway radius, wall swelling, mucus, and dynamic compression therefore interact. An aspirated object's path depends on geometry, posture, and object properties; the more vertical right main bronchus creates a tendency, not a guarantee.",
          ],
        },
        {
          heading: 'Explain clearance as a coordinated defense',
          body: [
            'The mucus layer traps inhaled particles, while cilia move that material toward the pharynx. Goblet cells and submucosal glands contribute mucus; coordinated ciliary beating provides transport. Swallowed mucus is subsequently exposed to digestive conditions. Cough adds a rapid airflow mechanism to remove larger secretions. In distal air spaces, macrophages ingest particles and microbes because the alveolar surface cannot simply be covered with thick mucus without impairing diffusion. These mechanisms connect respiratory anatomy to innate immunity: a structural barrier and a physical removal process reduce the burden reaching immune cells.',
            'Failure at different points produces different predictions. Excessive mucus can obstruct a passage even with functioning cilia. Poor ciliary function can leave mucus in place despite normal secretion. A narrow lumen makes the same mucus volume more consequential. When interpreting a microscopy image, locate cilia on the apical surface and nuclei at different apparent heights within a pseudostratified layer. All cells contact the basement membrane even though not all reach the lumen. Toward smaller bronchioles, the epithelium becomes lower and club cells become more prominent. Alveolar epithelium is specialized for gas transfer rather than the thick, ciliated barrier characteristic of larger conducting passages.',
          ],
        },
        {
          heading: 'Use the radius relationship responsibly',
          body: [
            'For a simplified rigid tube with laminar flow, resistance varies inversely with the fourth power of radius. Halving radius increases resistance sixteenfold at fixed length and viscosity. At the same driving pressure, flow then becomes one-sixteenth as large. This model explains why modest narrowing can matter greatly, but it is not a complete lung model: airways branch, deform, change with lung volume, and sometimes carry turbulent flow. Use the simulation to identify cause and effect while retaining these assumptions. A competition answer should name both the direction of change and why the numerical model may only approximate a living airway.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Carina',
          definition: 'Tracheal bifurcation ridge; sensitive cough trigger.',
        },
        {
          term: 'Mucociliary escalator',
          definition: 'Cilia-driven upward mucus transport to pharynx.',
        },
        {
          term: 'Trachealis',
          definition: 'Posterior smooth muscle allowing esophageal bulge.',
        },
        {
          term: 'Club cells',
          definition: 'Bronchiolar secretory cells with detox and repair roles.',
        },
        {
          term: 'Beta-2 dilation',
          definition: 'Sympathetic bronchodilation targeted by rescue inhalers.',
        },
        {
          term: 'Anatomical shunt',
          definition: 'Bronchial venous drainage lowering systemic oxygen slightly.',
        },
      ],
      simulation: {
        kind: 'model',
        model: 'airway',
        title: 'Airway narrowing laboratory',
        instructions: 'Adjust radius and driving pressure while other tube properties stay fixed.',
        challenge: 'Reduce radius to 50%, then double pressure. Does flow return to baseline?',
        takeaway:
          'A twofold pressure increase cannot fully offset a sixteenfold resistance increase.',
      },
      practice: [
        {
          id: 'anat-u2-l1-q1',
          prompt: 'Aspirated peanut most likely lodges in which bronchus and why?',
          type: 'mcq',
          options: [
            'Left, narrower',
            'Right, wider and more vertical',
            'Left, more horizontal',
            'Trachea only',
          ],
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
          options: [
            'Alpha-1 receptors',
            'Beta-2 receptors',
            'Muscarinic receptors',
            'Histamine receptors',
          ],
          answer: 'Beta-2 receptors',
          explanation: 'Beta-2 activation relaxes bronchiolar smooth muscle.',
        },
        {
          id: 'anat-u2-l1-q4',
          prompt: 'The trachea usually bifurcates near which landmark?',
          type: 'mcq',
          options: ['Sternal angle, approximately T4-T5', 'Pelvic brim', 'C1 only', 'L5 only'],
          answer: 'Sternal angle, approximately T4-T5',
          explanation:
            'The level varies with position and respiration; this is the usual anatomical reference.',
        },
        {
          id: 'anat-u2-l1-q5',
          prompt: 'Explain why airway resistance rises sharply in asthma.',
          type: 'short',
          answer:
            'Smooth muscle constriction, mucosal edema, and mucus narrow radius; resistance is proportional to 1/r^4.',
          explanation: 'Small radius changes cause large resistance changes.',
        },
        {
          id: 'anat-u2-l1-q6',
          prompt:
            'At half the radius and twice the pressure, what fraction of baseline flow does the tube model predict?',
          type: 'short',
          answer: '2/16 = 0.125, or 12.5%.',
          explanation: 'Flow is proportional to pressure × radius⁴.',
          points: 3,
        },
        {
          id: 'anat-u2-l1-q7',
          prompt:
            'Why do alveoli rely on thin walls and macrophages instead of a thick mucus-covered ciliated lining?',
          type: 'short',
          answer:
            'A thin barrier supports gas diffusion; macrophages clear particles without imposing a thick diffusion barrier.',
          explanation: 'Defenses must be compatible with the specialized exchange function.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Compare two simplified airways',
        problem:
          'Tube A has the baseline radius. Tube B has 80% of that radius. Both have the same length, viscosity, and driving pressure.',
        steps: [
          'Convert the percentage to a fraction: rB/rA = 0.80.',
          'Relative resistance is 1/(0.80⁴) = 2.44, approximately. Resistance more than doubles despite a 20% radius decrease.',
          'Flow at fixed pressure is proportional to the reciprocal of resistance, so relative flow is 0.80⁴ = 0.4096.',
          'State the boundary conditions: the result assumes one rigid tube and laminar flow. It is not a prediction of total oxygen delivery or the resistance of an entire branching lung.',
        ],
        conclusion:
          'The radius change produces a nonlinear flow change. Increased breathing effort may partly compensate, but compensation requires more driving pressure.',
      },
    },
    {
      id: 'anat-u2-l2',
      unitId: 'anat-u2',
      title: 'Lungs, Alveoli, Pleura, and Breathing Muscles',
      durationMin: 35,
      kind: 'text',
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
            'Bronchopulmonary segments are surgical units with independent bronchi and vessels: typically ten on the right and a variable eight to ten on the left. Pneumonia often respects lobar boundaries, so right middle lobe pneumonia obscures the right heart border on X-ray.',
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
          heading: 'Practice with anatomical diagrams',
          body: [
            'Sketch an alveolar-capillary interface and label the type I cell, type II cell, macrophage, capillary, and thin supporting interface. Then trace the path of an oxygen molecule into blood. Explain why adding thickness or removing surface area changes gas transfer.',
            'On a chest schematic, distinguish visceral from parietal pleura and locate the diaphragm. During inspiration, thoracic expansion lowers alveolar pressure briefly below atmosphere. At the end of inspiration, alveolar pressure can equal atmosphere while the lung remains expanded because the transpulmonary pressure is still positive.',
          ],
        },
        {
          heading: 'Keep three pressures separate',
          body: [
            'Atmospheric pressure is the reference outside the chest. Alveolar pressure is the pressure of gas within air spaces. Intrapleural pressure is the pressure in the thin pleural compartment. Airflow depends on the difference between atmosphere and alveoli; lung expansion depends strongly on transpulmonary pressure, defined as alveolar pressure minus intrapleural pressure. These are different pressure differences. At the end of a quiet inspiration, airflow momentarily stops because alveolar and atmospheric pressures are equal, even though the lung remains expanded and intrapleural pressure is more negative than at rest.',
            'During inspiration, contraction of the diaphragm increases thoracic dimensions. The chest wall and pleural coupling stretch the lung, increasing alveolar volume and briefly lowering alveolar pressure below atmosphere. During quiet expiration, muscle relaxation allows elastic recoil to reduce lung volume and briefly raise alveolar pressure. A pneumothorax disrupts normal pressure coupling by allowing air into the pleural space. The resulting behavior depends on extent and pressure conditions; tracheal deviation is not a feature of every small pneumothorax. Trace the sequence from muscle movement to pressure change to airflow rather than memorizing that inspiration is simply negative pressure.',
          ],
        },
        {
          heading: 'Integrate surface tension, compliance, and recoil',
          body: [
            'Compliance is change in volume divided by change in distending pressure. A highly compliant structure expands easily; a low-compliance structure requires a larger pressure change for the same volume change. Elastic recoil describes its tendency to return toward a smaller volume after stretching. In emphysema, loss of elastic tissue can make expansion easier while reducing the force available to expel air. In fibrosis, stiff tissue reduces compliance. Thus easy inflation does not necessarily mean effective overall ventilation. Forced expiration can narrow intrathoracic airways when surrounding pressure rises, especially when elastic support is diminished.',
            'Alveolar surface tension adds an inward force at the air-liquid interface. In a simplified spherical interface, the pressure required to oppose surface tension increases as radius decreases. Surfactant reduces surface tension and helps stabilize alveoli, particularly at smaller volumes. Type II cells supply surfactant and participate in epithelial repair; type I cells cover most of the gas-exchange surface. A capillary is separated from alveolar air by epithelial and endothelial layers and their thin supporting interfaces. Increasing exchange area or reducing barrier thickness helps diffusion, while edema or fibrosis increases the distance a gas must cross. These mechanical and diffusional processes operate together but should be analyzed separately.',
          ],
        },
        {
          heading: 'Read a diagram as a sequence of compartments',
          body: [
            'A gas molecule moving from an alveolus to a red cell crosses the alveolar lining, interstitial or fused basement-membrane region, capillary endothelium, plasma, and red-cell membrane before binding hemoglobin. A label pointing at the alveolar lumen is therefore not identifying blood, and a label pointing to a macrophage is not identifying a surfactant-producing cell. At the organ scale, identify apex, base, fissures, hilum, and the diaphragm before naming lobes. The left lung has two lobes; the lingula belongs to the upper lobe. Segment counts can vary with anatomical classification, so avoid treating one left-lung count as universally fixed.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Surfactant',
          definition: 'Type II cell secretion lowering alveolar surface tension.',
        },
        {
          term: 'Hilum',
          definition: 'Medial lung root entry for bronchus, vessels, nerves.',
        },
        {
          term: 'Pleural pressure',
          definition: 'Normally negative pressure coupling lung and wall.',
        },
        {
          term: 'Compliance',
          definition: 'Volume change per pressure change; distensibility.',
        },
        {
          term: 'Tension pneumothorax',
          definition: 'One-way air leak with mediastinal shift; emergency.',
        },
        {
          term: 'Type I pneumocyte',
          definition: 'Thin squamous cell forming most alveolar wall.',
        },
      ],
      simulation: {
        kind: 'model',
        model: 'diffusion',
        title: 'Alveolar membrane model',
        instructions: 'Change exchange area, gradient, and thickness to isolate their effects.',
        challenge:
          'Double thickness, then double area. Explain why modeled transfer returns to baseline.',
        takeaway:
          'The same transfer rate can arise from different structures; it does not mean those structures are healthy.',
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
          options: [
            'Positive 10 mmHg',
            'Atmospheric',
            'Negative around -4 mmHg',
            'Equal to alveolar',
          ],
          answer: 'Negative around -4 mmHg',
          explanation: 'Negative pressure keeps lungs inflated against recoil.',
        },
        {
          id: 'anat-u2-l2-q3',
          prompt: 'Explain tracheal shift in tension pneumothorax.',
          type: 'short',
          answer:
            'Pressurized pleural air pushes mediastinum to the opposite side, compressing the good lung and vena cava.',
          explanation: 'One-way valve physiology creates pressure buildup.',
        },
        {
          id: 'anat-u2-l2-q4',
          prompt: 'Quiet inspiration is driven mainly by:',
          type: 'mcq',
          options: [
            'Abdominals',
            'Diaphragm + external intercostals',
            'Internal intercostals',
            'Sternocleidomastoid alone',
          ],
          answer: 'Diaphragm + external intercostals',
          explanation: 'Accessory muscles are for forced inspiration.',
        },
        {
          id: 'anat-u2-l2-q5',
          prompt: 'Why does right middle lobe pneumonia hide the right heart border?',
          type: 'short',
          answer:
            'The lobe abuts the heart; consolidation removes the air-soft tissue interface (silhouette sign).',
          explanation: 'Adjacent densities merge on X-ray.',
        },
        {
          id: 'anat-u2-l2-q6',
          prompt:
            'At alveolar pressure 0 and pleural pressure −5 cm H₂O, calculate transpulmonary pressure.',
          type: 'short',
          answer: '5 cm H₂O: 0 − (−5).',
          explanation:
            'Equal atmospheric and alveolar pressures can coexist with a positive distending pressure.',
          points: 3,
        },
        {
          id: 'anat-u2-l2-q7',
          prompt: 'Why can emphysema increase compliance but still impair expiration?',
          type: 'short',
          answer:
            'Loss of elastic tissue makes inflation easier but reduces recoil and airway support, promoting expiratory airway narrowing and air trapping.',
          explanation: 'Compliance and effective ventilation are not interchangeable.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Separate airflow from lung expansion',
        problem:
          'At one instant, alveolar pressure is 0 cm H₂O relative to atmosphere and pleural pressure is −7 cm H₂O. At another, alveolar pressure is −1 and pleural pressure is −6.',
        steps: [
          'For the first instant, atmosphere and alveoli have equal pressure, so no pressure-driven airflow occurs at that instant.',
          'Transpulmonary pressure is 0 − (−7) = 7 cm H₂O, so the lung can remain expanded without ongoing airflow.',
          'For the second instant, alveolar pressure is below atmosphere, so air flows inward.',
          'Transpulmonary pressure is −1 − (−6) = 5 cm H₂O. Do not substitute this distending pressure for the atmosphere-to-alveolus airflow gradient.',
        ],
        conclusion:
          'Airflow and expansion answer different questions. Always identify the two compartments in a stated pressure difference.',
      },
    },
    {
      id: 'anat-u3-l1',
      unitId: 'anat-u3',
      title: 'Ventilation, Volumes, and Spirometry',
      durationMin: 35,
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
            'Anatomical dead space is conducting-airway volume; alveolar dead space is ventilated tissue with inadequate perfusion. Physiological dead space includes both. Pulmonary embolism can increase alveolar dead space, but compensatory hyperventilation may keep arterial CO₂ normal or low.',
            'Ventilation-perfusion mismatch means local air and blood delivery are not appropriately matched. A shunt-like region receives blood without effective ventilation. A dead-space-like region receives ventilation without sufficient blood flow. Regional problems may exist even when total lung ventilation appears substantial.',
          ],
        },
        {
          heading: 'Control of breathing preview',
          body: [
            'Central chemoreceptors respond to changes in cerebrospinal-fluid chemistry related to arterial CO₂. Peripheral chemoreceptors respond to oxygen, carbon dioxide, and acidity. Increased CO₂ production or reduced effective ventilation changes the stimulus for breathing.',
            'Hyperventilation relative to metabolic CO₂ production tends to lower PaCO₂, while hypoventilation tends to raise it. Oxygen-related CO₂ changes in severe lung disease involve several mechanisms, including ventilation-perfusion effects and the Haldane effect, and should not be reduced to a single hypoxic-drive explanation. Use the supplied case data to explain physiology rather than choose a clinical oxygen setting.',
          ],
        },
        {
          heading: 'Build a spirogram from additive quantities',
          body: [
            "A spirogram shows how volume changes over time. Quiet tidal breaths oscillate around end-expiratory volume. Inspiratory reserve is the additional volume inhaled beyond a usual inspiration; expiratory reserve is the additional volume exhaled beyond a usual expiration. Residual volume remains after maximal expiration. Capacities combine volumes: inspiratory capacity equals tidal volume plus inspiratory reserve; functional residual capacity equals expiratory reserve plus residual volume; vital capacity includes all movable volume; total lung capacity includes residual volume as well. Check that sums use the same units and refer to one person's measurements.",
            'Simple spirometry measures air that enters or leaves through the mouth. It cannot directly measure residual air remaining in the lungs, so capacities containing residual volume require another measurement method. A forced expiratory maneuver answers a different question from quiet breathing: FEV1 measures the volume expelled in the first second, and FVC measures the total forced volume expelled. A low ratio suggests obstructed expiratory airflow, but interpretation depends on age-appropriate reference values, maneuver quality, and clinical context. A reduced FVC alone does not prove restriction because air trapping or poor effort can reduce it. Restriction is established by reduced total lung capacity relative to an appropriate reference.',
          ],
        },
        {
          heading: 'Distinguish ventilation, perfusion, and diffusion',
          body: [
            'Ventilation moves air, perfusion moves blood, and diffusion transfers gases across the exchange barrier. Each can fail independently. Anatomical dead space is conducting airway volume; alveolar dead space is ventilated exchange tissue receiving insufficient perfusion; physiologic dead space includes both. In a shunt-like unit, blood passes a region without effective ventilation. These extremes help explain ventilation-perfusion mismatch. A lung-wide average can hide regional differences, so a normal-looking total airflow does not guarantee that each ventilated region receives matching blood flow.',
            'Minute ventilation is total tidal volume times breathing frequency. Alveolar ventilation subtracts the dead-space portion of each breath before multiplying. In this simplified calculation, more breaths mean the dead-space cost is paid more often. Rapid shallow breathing can therefore produce the same minute ventilation with less fresh gas reaching exchange regions. Carbon dioxide production must also be considered: at steady production, reduced alveolar ventilation tends to increase arterial carbon dioxide. During exercise, both production and ventilation rise. Increased alveolar dead space does not mandate elevated arterial carbon dioxide if a person increases overall ventilation enough to compensate; interpretation requires the whole system.',
          ],
        },
        {
          heading: 'Quality-check physiological calculations',
          body: [
            'First convert milliliters to liters or keep every input in milliliters until the final line. Second, check that tidal volume is at least as large as the dead space in the simple model. Third, distinguish a fraction from a percentage: FEV1/FVC = 0.75 is 75%, not 0.75%. Finally, keep example values separate from diagnostic thresholds. Healthy volumes vary with body size and other characteristics. The numerical examples in this course are for calculation practice, not universal normal ranges. A strong answer includes the equation, substitution, units, and a physiological explanation of why the number changes.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'FEV1/FVC',
          definition: 'Ratio distinguishing obstructive from restrictive disease.',
        },
        {
          term: 'Alveolar ventilation',
          definition: '(TV minus dead space) times rate; effective gas exchange.',
        },
        {
          term: 'Anatomical dead space',
          definition: 'Conducting airway volume, about 150 mL.',
        },
        {
          term: 'Shunt',
          definition: 'Perfusion without ventilation; refractory hypoxemia.',
        },
        {
          term: 'Compliance curve',
          definition: 'Volume-pressure relationship of lung and chest wall.',
        },
        {
          term: 'Flow-volume loop',
          definition: 'Graph diagnosing obstruction and restriction patterns.',
        },
      ],
      simulation: {
        kind: 'model',
        model: 'ventilation',
        title: 'Ventilation and dead-space simulator',
        instructions: 'Adjust tidal volume, rate, and dead space.',
        challenge:
          'Reproduce the two breathing patterns in the worked example, then test 300 mL at 20 breaths/min.',
        takeaway: 'Subtract dead space before multiplying by frequency.',
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
          answer:
            'Raised alveolar PO2 can overcome low V/Q units but cannot reach unventilated shunt blood.',
          explanation: 'Shunt blood never contacts enriched alveolar gas.',
        },
        {
          id: 'anat-u3-l1-q6',
          prompt:
            'Calculate alveolar ventilation for 300 mL breaths at 20/min with 150 mL dead space.',
          type: 'short',
          answer: '3.0 L/min: (300 − 150) × 20 = 3000 mL/min.',
          explanation: 'Minute ventilation is 6.0 L/min, but half is dead-space ventilation.',
          points: 3,
        },
        {
          id: 'anat-u3-l1-q7',
          prompt:
            'A low FVC has a normal FEV1/FVC ratio. What extra measurement helps establish restriction?',
          type: 'short',
          answer:
            'Total lung capacity measured by a suitable lung-volume method and compared with reference values.',
          explanation: 'Low FVC alone can result from air trapping or inadequate effort.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Equal minute ventilation, unequal exchange',
        problem:
          'Person A breathes 500 mL twelve times each minute. Person B breathes 250 mL twenty-four times. Both have 150 mL anatomical dead space per breath.',
        steps: [
          'A: minute ventilation = 500 × 12 = 6000 mL/min. Alveolar ventilation = (500 − 150) × 12 = 4200 mL/min.',
          'B: minute ventilation = 250 × 24 = 6000 mL/min. Alveolar ventilation = (250 − 150) × 24 = 2400 mL/min.',
          'Convert to liters: each moves 6.0 L/min overall, but exchange-region fresh airflow is 4.2 versus 2.4 L/min.',
          'The 1.8 L/min difference reflects the additional dead-space cost of more frequent, shallower breaths. It does not by itself specify blood oxygen saturation.',
        ],
        conclusion:
          'The breathing pattern matters, even when total minute ventilation is unchanged.',
      },
    },
    {
      id: 'anat-u3-l2',
      unitId: 'anat-u3',
      title: 'Gas Exchange, Hemoglobin, and pH Control',
      durationMin: 35,
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
        {
          heading: 'Separate oxygen pressure, saturation, content, and delivery',
          body: [
            'Partial pressure describes the tendency of dissolved oxygen to move between compartments. Saturation describes the fraction of hemoglobin binding sites occupied. Content describes the total amount of oxygen carried per volume of blood, including bound and dissolved fractions. Delivery combines content with blood flow. These quantities are related but not interchangeable. A person with less hemoglobin may have a normal oxygen partial pressure and high saturation of the remaining binding sites, yet carry less oxygen overall. A membrane diffusion problem and a hemoglobin quantity problem therefore produce different patterns.',
            'A useful educational approximation is arterial oxygen content in mL O₂/dL = 1.34 × hemoglobin in g/dL × fractional saturation + 0.003 × arterial PO₂ in mmHg. Most of the result comes from hemoglobin-bound oxygen. To estimate delivery per minute, multiply content by cardiac output after converting liters of blood into deciliters. This relationship shows why a circulation problem can impair oxygen delivery even when lung measurements look adequate. The constants are approximations, and the calculation assumes the stated saturation accurately represents oxygen-bound hemoglobin; it is not a substitute for specialized measurements when abnormal hemoglobin species are present.',
          ],
        },
        {
          heading: 'Connect the dissociation curve to local tissue conditions',
          body: [
            'The steep middle portion of the oxygen-hemoglobin curve permits substantial unloading as tissue PO₂ falls. The flatter upper portion helps maintain high loading over a range of alveolar conditions. Increased carbon dioxide and acidity reduce oxygen affinity through the Bohr effect. Increased temperature and 2,3-BPG also favor unloading. A rightward shift increases P50, meaning more oxygen pressure is required for half saturation. A leftward shift decreases P50. Label the x-axis PO₂ and the y-axis saturation before drawing a shift; otherwise it is easy to reverse affinity and delivery.',
            'The Haldane effect concerns carbon dioxide and proton carriage: deoxygenated hemoglobin can carry more CO₂ and buffer more H⁺, while oxygenation in the lungs promotes CO₂ release. It complements rather than duplicates the Bohr effect. In tissues, carbonic anhydrase speeds conversion between CO₂ and bicarbonate-related species; bicarbonate exits red cells as chloride enters to balance charge. In pulmonary capillaries, the process reverses and CO₂ is exhaled. Follow atoms and charge separately: oxygen binding is not identical to bicarbonate transport, even though hemoglobin helps coordinate both processes.',
          ],
        },
        {
          heading: 'Use acid-base evidence without overinterpreting it',
          body: [
            'An arterial pH below the supplied reference range indicates acidemia; above it indicates alkalemia. Increased CO₂ tends to acidify, while increased bicarbonate tends to alkalinize. Identify which change explains the pH direction before considering compensation. Compensation may bring pH closer to its reference without removing the underlying disturbance. A nearly normal pH can hide opposing processes, so always inspect CO₂ and bicarbonate together. The course uses simplified educational cases to show mechanisms. When a case includes severe respiratory disease, do not assume one number establishes a diagnosis or that a compensated value proves the person is stable.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'P50',
          definition: 'PO2 at 50% saturation; marker of affinity.',
        },
        {
          term: 'Bohr effect',
          definition: 'Acid/CO2/heat shifting curve right to unload O2.',
        },
        {
          term: 'Chloride shift',
          definition: 'Cl-/HCO3- exchange preserving electroneutrality.',
        },
        {
          term: 'Haldane effect',
          definition: 'Deoxygenated hemoglobin carrying more CO2/H+.',
        },
        {
          term: '2,3-BPG',
          definition: 'Glycolytic metabolite lowering affinity; rises in hypoxia.',
        },
        {
          term: 'Respiratory acidosis',
          definition: 'Low pH from CO2 retention.',
        },
      ],
      simulation: {
        kind: 'model',
        model: 'diffusion',
        title: 'Gas-transfer tradeoffs',
        instructions: 'Explore membrane area, thickness, and the driving gradient independently.',
        challenge:
          'Set area to 50% and thickness to 200%. Predict transfer before reading the result.',
        takeaway:
          'Area loss and increased thickness compound to reduce transfer to 25% in this model.',
      },
      practice: [
        {
          id: 'anat-u3-l2-q1',
          prompt: 'Exercising muscle unloads more O2 because of:',
          type: 'mcq',
          options: [
            'Left shift from alkalosis',
            'Right shift from acid, CO2, heat',
            'Low 2,3-BPG',
            'High pH',
          ],
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
          options: [
            'Lower; binds BPG tighter',
            'Higher; gamma chains bind BPG poorly',
            'Equal; same chains',
            'Lower; fewer hemes',
          ],
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
        {
          id: 'anat-u3-l2-q6',
          prompt: 'Why can anemia lower oxygen content while saturation stays high?',
          type: 'short',
          answer:
            'There are fewer hemoglobin binding sites per volume of blood, although a high fraction of the remaining sites can still be occupied.',
          explanation: 'A percentage does not specify the total carrying capacity.',
          points: 3,
        },
        {
          id: 'anat-u3-l2-q7',
          prompt:
            'At half the exchange area and double the membrane thickness, what relative flux is predicted with unchanged gradient?',
          type: 'short',
          answer: '25% of baseline: 0.5 / 2 = 0.25.',
          explanation: 'Fick-law changes multiply and divide; do not subtract percentages.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Calculate carrying capacity',
        problem:
          'Compare blood with hemoglobin 15 g/dL versus 8 g/dL. Both samples have saturation 0.98 and PO₂ 100 mmHg.',
        steps: [
          'For the first sample, bound content = 1.34 × 15 × 0.98 = 19.698 mL/dL. Dissolved content = 0.003 × 100 = 0.3 mL/dL.',
          'Total first-sample content is approximately 20.0 mL/dL.',
          'For the second sample, total content = 1.34 × 8 × 0.98 + 0.3 = 10.806 mL/dL, approximately 10.8.',
          'Both saturation values are 98%, but the lower-hemoglobin sample carries only about 54% as much oxygen per volume. Pressure and percent saturation do not measure the number of available binding sites.',
        ],
        conclusion:
          'Always identify which oxygen quantity a question supplies and which it asks you to explain.',
      },
    },
    {
      id: 'anat-u4-l1',
      unitId: 'anat-u4',
      title: 'Obstructive Disease: Asthma, Bronchitis, Emphysema, COPD',
      durationMin: 35,
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
            'COPD involves persistent airflow limitation with varying contributions from airway disease and emphysema. Chronic bronchitic pathology emphasizes mucus hypersecretion and airway inflammation; emphysema involves destruction of alveolar walls and elastic support. Exposure history and individual susceptibility influence the pattern.',
            'Loss of recoil and small-airway support promotes air trapping during expiration. Obstruction, reduced gas-exchange area, and altered ventilation-perfusion matching can coexist. Avoid older appearance-based stereotypes: real presentations overlap and cannot be reliably classified by body habitus or skin color.',
          ],
        },
        {
          heading: 'Drugs and devices',
          body: [
            'Bronchodilator classes can reduce airway smooth-muscle constriction, while anti-inflammatory treatments address a different part of airway disease. These distinctions help explain why widening an airway and reducing inflammation are separate physiological goals.',
            'No bronchodilator rebuilds alveolar walls already lost in emphysema. Oxygen changes the available inspired oxygen but does not itself restore elastic recoil or remove an obstruction. Treatment selection is outside this lesson’s simulation; use the categories to identify the mechanism being targeted.',
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
        {
          heading: 'Compare mechanisms before comparing disease labels',
          body: [
            'Asthma involves variable airflow limitation associated with airway inflammation and hyperresponsiveness. Smooth-muscle contraction, mucosal swelling, and mucus can all reduce the effective lumen. Chronic bronchitic disease emphasizes mucus hypersecretion and airway inflammation, whereas emphysema emphasizes destruction of alveolar walls and loss of elastic recoil. These processes may overlap within chronic obstructive pulmonary disease. Avoid treating older appearance-based labels as distinct kinds of people: body habitus and skin color do not reliably establish mechanism, and real presentations vary widely.',
            'The most useful comparison is where resistance or gas-transfer capacity changes. A narrowed airway can limit expiratory flow while leaving much of the alveolar membrane intact. Destruction of alveolar walls reduces exchange area and the connective support that helps keep small airways open. Loss of recoil makes forced expiration less effective and favors air trapping. This explains why emphysema can combine higher compliance with impaired emptying. A low diffusion capacity is compatible with loss of exchange surface, but diffusion measurements are influenced by hemoglobin and other factors as well. Use a pattern of findings rather than one isolated feature.',
          ],
        },
        {
          heading: 'Read evidence for obstruction and variability',
          body: [
            "A forced expiratory trace should be evaluated for effort, adequate expiration, repeatability, and the relevant reference comparison. FEV1/FVC can fall when airflow obstruction limits how quickly the lungs empty. Comparing measurements before and after a bronchodilator can demonstrate a variable component, but reversibility is not a perfect binary separator between asthma and COPD. Some people with asthma have persistent limitation, and some with COPD show measurable bronchodilator response. An exam vignette may simplify these patterns, so distinguish the question's intended mechanism from an absolute rule about every patient.",
            'Air trapping changes end-expiratory volume and can increase residual volume. Hyperinflation flattens the diaphragm and changes the geometry through which muscle contraction generates pressure. Pursed-lip expiration can help maintain pressure in small airways during exhalation. Increased work of breathing is therefore partly a mechanical problem, not simply a need to breathe faster. Oxygenation and ventilation must also be separated: oxygen delivery into blood can be impaired by ventilation-perfusion mismatch, while CO₂ removal depends on effective alveolar ventilation relative to metabolic production. In severe illness, seemingly ordinary values must be interpreted in context and over time.',
          ],
        },
        {
          heading: 'Use treatment categories to understand physiology',
          body: [
            'Bronchodilator classes act on airway smooth-muscle signaling; anti-inflammatory therapies address inflammatory processes. These categories teach a mechanistic distinction, not a personal treatment plan. A medication that widens an airway does not regenerate destroyed alveolar walls. Likewise, providing oxygen changes inspired oxygen availability but does not itself remove a mucus obstruction or restore elastic recoil. For a competition explanation, connect an intervention category to the specific process it targets, then state what it does not fix. This structure is more durable than memorizing a dosing scheme and avoids confusing symptom relief with reversal of structural disease.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Reversibility',
          definition: 'FEV1 improvement after bronchodilator; hallmark of asthma.',
        },
        {
          term: 'Air trapping',
          definition: 'Incomplete exhalation raising residual volume in COPD.',
        },
        {
          term: 'Alpha-1 antitrypsin',
          definition: 'Protease inhibitor; deficiency causes early emphysema.',
        },
        {
          term: 'Pulsus paradoxus',
          definition: 'Exaggerated BP drop on inspiration in severe asthma.',
        },
        {
          term: 'Peak flow zones',
          definition: 'Green/yellow/red action thresholds from personal best.',
        },
        {
          term: 'Cor pulmonale',
          definition: 'Right heart strain from chronic lung disease.',
        },
      ],
      simulation: {
        kind: 'model',
        model: 'airway',
        title: 'Obstruction and breathing effort',
        instructions: 'Narrow the model airway and test whether increased pressure compensates.',
        challenge: 'At 70% radius, compare baseline pressure with twice that pressure.',
        takeaway:
          'Extra effort only partly compensates for substantial narrowing in this idealized tube.',
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
          answer:
            'Tiring patient hypoventilates; CO2 rises from low toward normal despite distress, warning of failure.',
          explanation: 'Do not mistake for improvement without clinical context.',
        },
        {
          id: 'anat-u4-l1-q4',
          prompt: 'Which change is directly produced by relaxing bronchial smooth muscle?',
          type: 'mcq',
          options: [
            'Increased airway caliber',
            'New alveolar walls',
            'Instant new hemoglobin',
            'Loss of all mucus',
          ],
          answer: 'Increased airway caliber',
          explanation:
            'Smooth-muscle relaxation widens the lumen; it does not regenerate alveolar walls.',
        },
        {
          id: 'anat-u4-l1-q5',
          prompt: 'Young nonsmoker with basilar emphysema: test for?',
          type: 'short',
          answer: 'Alpha-1 antitrypsin deficiency.',
          explanation: 'Early or familial disease triggers testing.',
        },
        {
          id: 'anat-u4-l1-q6',
          prompt:
            'Why does a bronchodilator not restore gas-exchange surface destroyed in emphysema?',
          type: 'short',
          answer:
            'It changes smooth-muscle tone and airway caliber; it does not rebuild missing alveolar walls.',
          explanation: 'Airflow limitation and membrane surface loss are distinct mechanisms.',
          points: 3,
        },
        {
          id: 'anat-u4-l1-q7',
          prompt:
            'Name two reasons a low expiratory ratio alone cannot distinguish asthma from COPD.',
          type: 'short',
          answer:
            'Both can produce obstruction; bronchodilator response and persistence overlap, and history plus test quality and other measurements matter.',
          explanation: 'Use a pattern of evidence rather than an absolute single-test rule.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Interpret a paired physiology dataset',
        problem:
          'Dataset A has variable wheeze, reduced expiratory ratio, and largely preserved diffusion capacity. Dataset B has persistent obstruction, increased residual volume, and reduced diffusion capacity.',
        steps: [
          'Both have evidence of airflow limitation; first identify the shared obstructive physiology.',
          'In A, variable airway narrowing with preserved exchange surface is compatible with an asthma-type mechanism.',
          'In B, air trapping plus reduced diffusion suggests loss of alveolar area and elastic support, compatible with emphysema-type pathology.',
          'State uncertainty: the patterns support mechanisms but are not independently sufficient for a clinical diagnosis; measurement quality and other causes of low diffusion require consideration.',
        ],
        conclusion:
          'Explain what changed in the airway or alveolus, then use the disease name as a summary of that reasoning.',
      },
    },
    {
      id: 'anat-u4-l2',
      unitId: 'anat-u4',
      title: 'Infection and Restriction: Pneumonia, TB, Fibrosis',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Classify pneumonia by setting and pathogen pattern',
        'Explain TB granulomas and testing',
        'Contrast restrictive physiology and imaging',
        'Distinguish air-space filling, diffusion impairment, and restriction',
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
            'A poorly ventilated but perfused region creates low V/Q or shunt-like physiology. A thickened membrane creates a diffusion barrier. These mechanisms affect gas exchange differently even if both lower oxygenation.',
            'Increasing inspired oxygen raises the gradient in ventilated units, while blood passing entirely unventilated units cannot directly benefit there. Mechanical support can alter recruitment and ventilation, but the details depend on the condition. This course models the mechanism rather than prescribing a device or treatment setting.',
          ],
        },
        {
          heading: 'Test images',
          body: [
            'Lobar consolidation silhouettes adjacent borders; interstitial disease shows reticular markings; cavitary apical lesions suggest TB; basilar honeycombing suggests UIP fibrosis; bat-wing edema suggests cardiogenic cause rather than infection.',
            'Pair each image with physiology: consolidation is shunt, fibrosis is diffusion plus restriction, effusion is compression with dullness and absent breath sounds, pneumothorax is hyperresonance with absent sounds.',
          ],
        },
        {
          heading: 'Locate the problem: filling, stiffness, or loss of perfusion',
          body: [
            'Pneumonia can fill alveolar spaces with inflammatory material while blood continues to pass nearby. The resulting low ventilation relative to perfusion creates hypoxemia. Fibrosis thickens and stiffens the interstitial framework, reducing compliance and increasing diffusion distance. A pleural effusion occupies space outside the lung and may compress it, whereas a pneumothorax introduces air into the pleural compartment. These abnormalities can all reduce effective respiratory function, but they act in different anatomical locations. Begin every case by deciding whether the principal abnormality is within an airway, an alveolar space, an interstitial barrier, or the pleural compartment.',
            'Restriction means reduced total lung capacity relative to a reference. Intrinsic parenchymal stiffness is one cause; chest-wall constraints or neuromuscular weakness can also limit volume. A high or preserved FEV1/FVC ratio with small measured volumes suggests a restrictive pattern but requires confirmation of total lung capacity. A small forced vital capacity due to incomplete effort is not the same as true physiological restriction. Where supplied, diffusion capacity helps separate some parenchymal processes from extrapulmonary causes, but no single number replaces the rest of the dataset.',
          ],
        },
        {
          heading: 'Connect image appearance with a physical explanation',
          body: [
            'Air is relatively radiolucent on a chest radiograph; fluid and tissue are more opaque. Consolidation replaces air in alveolar spaces, potentially creating a denser region. An air bronchogram may become visible when air-filled bronchi stand out against surrounding opacified tissue. An effusion can blunt a costophrenic angle. A pneumothorax can produce a pleural line with reduced peripheral lung markings. These are descriptions of patterns, not diagnoses by themselves. Image quality, patient position, projection, and rotation can create misleading appearances.',
            'The silhouette principle links an obscured border with an adjacent abnormality of similar radiographic density. Loss of the right heart border may help localize an opacity near the right middle lobe; it does not by itself identify the pathogen. Tuberculosis can cause several patterns depending on disease stage and host response, so a single apical opacity does not prove TB. In examination reasoning, state location, describe the visible pattern, connect it to a mechanism, and name the extra evidence needed to distinguish alternatives. Avoid interpreting a nonspecific white area as a complete microbiological diagnosis.',
          ],
        },
        {
          heading: 'Distinguish shunt from diffusion limitation',
          body: [
            "Increasing inspired oxygen raises the alveolar-to-blood gradient in ventilated regions. This may improve oxygen transfer when diffusion or ventilation-perfusion matching is impaired. Blood passing an entirely unventilated region cannot directly benefit from more oxygen delivered to that region, explaining why a substantial true shunt is relatively resistant to oxygen supplementation. Real lungs usually contain a mixture of units rather than one ideal extreme. The simulation isolates area and thickness; it deliberately cannot model a true shunt or predict a person's response to oxygen. Naming these boundaries is part of correct scientific interpretation, not an optional caveat.",
          ],
        },
      ],
      keyTerms: [
        {
          term: 'CURB-65',
          definition: 'Pneumonia severity score guiding admission.',
        },
        {
          term: 'Ghon complex',
          definition: 'Calcified TB focus plus hilar node.',
        },
        {
          term: 'Honeycombing',
          definition: 'Cystic basilar fibrosis pattern in UIP.',
        },
        {
          term: 'Shunt hypoxemia',
          definition: 'Low O2 resistant to supplementation from unventilated units.',
        },
        {
          term: 'Egophony',
          definition: 'E-to-A change over consolidation.',
        },
        {
          term: 'PEEP',
          definition: 'Positive end-expiratory pressure recruiting alveoli.',
        },
      ],
      simulation: {
        kind: 'model',
        model: 'diffusion',
        title: 'Barrier thickening experiment',
        instructions: 'Predict the effect of a thicker membrane before moving the control.',
        challenge:
          'Set thickness to 250%, then raise the gradient to 150%. Is transfer fully restored?',
        takeaway:
          'Transfer is 60% of baseline; raising a gradient need not offset a large barrier change.',
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
          prompt: 'Which measurement establishes reduced lung volume in a restrictive pattern?',
          type: 'mcq',
          options: [
            'Reduced total lung capacity',
            'Any fast breathing rate',
            'One low saturation',
            'A single cough',
          ],
          answer: 'Reduced total lung capacity',
          explanation: 'A low FVC alone can have other explanations.',
        },
        {
          id: 'anat-u4-l2-q5',
          prompt: 'Aspiration pneumonia favors which lobes and why?',
          type: 'short',
          answer: 'Dependent lower lobes, especially right; gravity and bronchus angle.',
          explanation: 'Aspiration follows gravity into dependent segments.',
        },
        {
          id: 'anat-u4-l2-q6',
          prompt: 'Why does an air bronchogram become visible in some consolidated regions?',
          type: 'short',
          answer: 'Air-filled bronchi contrast with surrounding denser air-space material.',
          explanation:
            'The pattern localizes a density relationship, not a specific microorganism.',
          points: 3,
        },
        {
          id: 'anat-u4-l2-q7',
          prompt: 'What physiological feature separates a true shunt from diffusion limitation?',
          type: 'short',
          answer:
            'A true shunt carries blood past unventilated units; diffusion limitation occurs across a barrier in a ventilated exchange region.',
          explanation:
            'An increased oxygen gradient cannot directly ventilate an unventilated unit.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Compare two causes of low oxygen',
        problem:
          'Case A has a focal air-space opacity and ongoing blood flow through poorly ventilated tissue. Case B has diffuse interstitial thickening and reduced total lung capacity.',
        steps: [
          'A primarily reduces ventilation of perfused units. Describe low V/Q or shunt-like physiology, depending on how completely ventilation is lost.',
          'B adds diffusion distance and reduces compliance. Describe impaired transfer plus a restrictive mechanical pattern.',
          'Use the model only for B’s membrane component: doubling thickness at unchanged area and gradient halves relative transfer.',
          'Do not apply that 50% result to A. A perfused but unventilated region requires a different model of regional airflow and blood flow.',
        ],
        conclusion:
          'Two cases can share hypoxemia while differing in location, mechanics, and response to changes in inspired oxygen.',
      },
    },
    {
      id: 'anat-u5-l1',
      unitId: 'anat-u5',
      title: 'Alimentary Canal: Mouth to Stomach',
      durationMin: 35,
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
            'Mechanical digestion begins with mastication. Salivary amylase and lingual lipase contribute to chemical digestion; lysozyme contributes antimicrobial activity. Saliva moistens, dissolves tastants, and begins starch digestion at near-neutral pH. The uvula and epiglottis route bolus past the airway into the esophagus.',
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
        {
          heading: 'Track food, enzymes, and signals separately',
          body: [
            'Food travels within the lumen of the alimentary canal. Secretions enter that lumen from epithelial cells or accessory organs, while hormones and neural signals coordinate activity through other routes. Keeping these paths separate prevents common errors: gastrin is not a digestive enzyme poured onto food, intrinsic factor is not an acid, and bile is not made by the gallbladder. In the mouth, chewing is mechanical digestion and salivary amylase begins chemical digestion of starch. Lingual lipase is an enzyme and therefore contributes to chemical, not mechanical, digestion. Mechanical processing increases accessible surface area without itself breaking covalent bonds.',
            'Swallowing coordinates a voluntary initiation with involuntary phases that protect the airway and move the bolus. Peristalsis advances material through sequential contraction and relaxation; it does not depend on gravity alone. Sphincters regulate passage between compartments and reduce backward movement. Once food reaches the stomach, muscular mixing combines it with secretions to form chyme. Gastric emptying delivers small portions toward the duodenum, allowing downstream neutralization and digestion. A food molecule can be mechanically fragmented many times before it is chemically reduced to an absorbable form.',
          ],
        },
        {
          heading: 'Explain secretion and protection at the cell level',
          body: [
            'Parietal cells contribute hydrochloric acid and intrinsic factor. Acid helps denature proteins and creates conditions in which pepsin functions; intrinsic factor later supports vitamin B12 absorption in the terminal ileum. Chief cells release pepsinogen, an inactive precursor that becomes pepsin in acidic conditions. Releasing a precursor helps limit inappropriate proteolysis within the secretory machinery. Gastric surface epithelial cells produce a mucus-bicarbonate barrier that maintains a less acidic microenvironment near the tissue even while the lumen is acidic.',
            'The stomach wall contains mucosa, submucosa, muscularis externa, and an outer covering. Gastric pits open into glands, while rugae are larger folds associated with expansion; pits and rugae are not synonyms. Tight junctions limit acid movement between epithelial cells, blood flow supplies oxygen and supports repair, and epithelial replacement maintains the barrier. If protection is impaired, a corrosive environment that is useful within the lumen can damage tissue. A loss of intrinsic factor causes a downstream absorption problem even when a meal contains sufficient B12, illustrating how the function of one organ influences another several steps later in the pathway.',
          ],
        },
        {
          heading: 'Coordinate a meal through neural and hormonal feedback',
          body: [
            "The cephalic phase begins with sensory anticipation and neural responses. Gastric distension and nutrient products then stimulate activity within the stomach. Duodenal feedback helps coordinate emptying with the small intestine's ability to neutralize acid and process nutrients. Hormonal signals such as secretin and cholecystokinin contribute to this coordination, with distinct triggers and effects. Predict changes by asking what enters the duodenum, which signal responds, and which secretion or movement helps handle that input. A high-acid input and a high-fat input need different responses; treating every digestive hormone as simply increasing all digestion loses this specificity.",
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Peristalsis',
          definition: 'Coordinated contraction-propulsion wave.',
        },
        {
          term: 'Lower esophageal sphincter',
          definition: 'Barrier preventing gastric reflux.',
        },
        {
          term: 'Parietal cell',
          definition: 'HCl and intrinsic factor source.',
        },
        {
          term: 'Pepsin',
          definition: 'Acid-activated protease from pepsinogen.',
        },
        {
          term: 'Barrett esophagus',
          definition: 'Intestinal metaplasia from chronic GERD.',
        },
        {
          term: 'Gastrin',
          definition: 'G-cell hormone stimulating acid and growth.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Locate a digestive failure',
        instructions: 'Reveal each result and decide which missing function links the evidence.',
        observations: [
          {
            label: 'Diet record',
            result: 'The case provides adequate vitamin B12 intake.',
          },
          {
            label: 'Gastric finding',
            result: 'Parietal-cell function is greatly reduced.',
          },
          {
            label: 'Distal finding',
            result:
              'The terminal ileum is anatomically present, but normal B12 uptake is impaired.',
          },
        ],
        question: 'Which loss best connects these observations?',
        options: [
          'Intrinsic factor from the stomach',
          'Bile storage in the gallbladder',
          'Salivary amylase in the mouth',
        ],
        correct: 0,
        explanation:
          'Intrinsic factor originates from parietal cells and supports the downstream B12 absorption pathway. The other functions address different nutrients.',
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
          options: [
            'G cells; gastrin',
            'Parietal cells; B12 absorption',
            'Chief cells; lipase',
            'Goblet cells; mucus',
          ],
          answer: 'Parietal cells; B12 absorption',
          explanation: 'Loss causes pernicious anemia.',
        },
        {
          id: 'anat-u5-l1-q3',
          prompt: 'Explain why NSAIDs cause ulcers in one mechanism sentence.',
          type: 'short',
          answer:
            'They block prostaglandin synthesis, reducing mucus, bicarbonate, and mucosal blood flow.',
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
        {
          id: 'anat-u5-l1-q6',
          prompt: 'Why is lingual lipase an example of chemical rather than mechanical digestion?',
          type: 'short',
          answer:
            'It catalyzes molecular bond breakdown; mechanical digestion changes particle size or mixing without that chemical cleavage.',
          explanation: 'Classify a process by what it does, not where it happens.',
          points: 3,
        },
        {
          id: 'anat-u5-l1-q7',
          prompt: 'How can an acidic stomach lumen coexist with living epithelial cells?',
          type: 'short',
          answer:
            'A mucus-bicarbonate microenvironment, tight junctions, blood flow, and repair protect the tissue from the lumen.',
          explanation:
            'Protection is an active, multilayered barrier rather than tissue being intrinsically immune to acid.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Trace a B12 absorption failure',
        problem:
          'An educational case describes loss of parietal-cell function with adequate dietary B12 but poor B12 absorption.',
        steps: [
          'Identify the affected secretions: parietal cells supply acid and intrinsic factor.',
          'Separate the vitamin from the binding partner. Adequate intake does not replace a missing factor needed for the later absorption pathway.',
          'Follow the connection to the terminal ileum, where intrinsic-factor-associated B12 normally undergoes uptake.',
          'Explain that the defect begins in a gastric function but produces an intestinal absorption problem. Avoid attributing the entire pathway to the stomach simply because the initiating defect is there.',
        ],
        conclusion:
          'A digestive case often requires tracing a chain of functions across several organs.',
      },
    },
    {
      id: 'anat-u5-l2',
      unitId: 'anat-u5',
      title: 'Small Intestine, Liver, Pancreas, and Absorption',
      durationMin: 35,
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
        {
          heading: 'Follow a mixed meal through three parallel pathways',
          body: [
            'Carbohydrates are hydrolyzed into monosaccharides before uptake. Glucose and galactose use sodium-linked transport at the apical surface, while fructose uses facilitated transport. Monosaccharides then leave enterocytes toward portal blood. Protein digestion begins with gastric proteolysis and continues with pancreatic and brush-border processes. Amino acids and small peptides are taken up, with most absorbed peptide products broken down further inside the enterocyte before reaching portal blood. Naming an enzyme is incomplete unless you can identify its substrate, source, destination, and product.',
            'Long-chain dietary lipids follow a different route. Bile salts help disperse lipid and support micelle formation; pancreatic lipase generates absorbable products. Those products enter epithelial cells, are reassembled into lipids, and are packaged into chylomicrons. Chylomicrons enter lacteals and travel through lymph before reaching the systemic circulation. Many shorter-chain fatty acids can enter portal blood more directly, so the lymph route is not a rule for every lipid molecule. Mechanical emulsification and enzymatic hydrolysis cooperate, but bile salts are not enzymes and do not themselves cleave the ester bonds acted on by lipase.',
          ],
        },
        {
          heading: 'Relate secretions to the changing chemical environment',
          body: [
            'Acidic chyme arriving from the stomach must be brought into a range suitable for intestinal enzymes and mucosal protection. Pancreatic duct cells contribute bicarbonate-rich fluid, while acinar cells contribute digestive enzymes and precursors. Secretin responds to acid in the duodenum and favors bicarbonate secretion. Cholecystokinin responds especially to lipid and protein digestion products and coordinates pancreatic enzyme secretion and gallbladder contraction. The liver makes bile; the gallbladder stores and concentrates it between meals. A blockage of bile delivery can impair lipid processing even when pancreatic enzymes are present.',
            'Pancreatic proteases are largely secreted as inactive zymogens. Enteropeptidase at the intestinal surface activates trypsinogen, and trypsin participates in activation of other precursors. This spatial control helps keep powerful proteolysis away from the tissues that synthesize the enzymes. Intestinal folds, villi, and microvilli enlarge area at different scales: folds include tissue layers, villi are multicellular projections with vessels, and microvilli are apical cell extensions. A lesion reducing villus area may impair several nutrient pathways at once, unlike a selective brush-border enzyme deficiency that primarily affects one substrate.',
          ],
        },
        {
          heading: 'Use a mass-balance view of malabsorption',
          body: [
            'For any nutrient, divide the path into delivery, digestion, uptake, and transport away. Material may enter the gut but fail to be hydrolyzed; it may be hydrolyzed but fail to cross damaged epithelium; or it may cross yet encounter problems with vascular or lymphatic transport. Excess unabsorbed solute can retain water within the lumen, and microbial fermentation can produce gases. The lactase model below deliberately simplifies the digestion step to a capacity limit so that intake, hydrolysis, and residual substrate remain distinct. It does not represent every cause of malabsorption or predict the full symptom pattern of a meal.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Enterohepatic circulation',
          definition: 'Ileal bile salt reabsorption and liver reuse.',
        },
        {
          term: 'Chylomicron',
          definition: 'Lymph lipid carrier from enterocytes.',
        },
        {
          term: 'Enterokinase',
          definition: 'Brush border enzyme activating trypsinogen.',
        },
        {
          term: 'Anti-tTG',
          definition: 'Celiac autoantibody against tissue transglutaminase.',
        },
        {
          term: 'Courvoisier law',
          definition: 'Palpable gallbladder with jaundice suggests malignancy, not stones.',
        },
        {
          term: 'SGLT1',
          definition: 'Sodium-glucose cotransporter driving absorption.',
        },
      ],
      simulation: {
        kind: 'model',
        model: 'digestion',
        title: 'Digestive capacity and unabsorbed substrate',
        instructions:
          'Use lactose as a concrete example of substrate load versus hydrolysis capacity.',
        challenge: 'Keep load at 20 g and compare capacities of 5, 12, and 20 g.',
        takeaway:
          'Greater effective hydrolysis leaves less substrate for colonic fermentation, within this simplified model.',
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
          options: [
            'Anti-tTG + villous atrophy',
            'Low lipase + normal villi',
            'High gastrin only',
            'No antibodies',
          ],
          answer: 'Anti-tTG + villous atrophy',
          explanation: 'Gluten triggers autoimmune villous loss.',
        },
        {
          id: 'anat-u5-l2-q3',
          prompt:
            'How do bile salts and pancreatic lipase contribute differently to fat digestion?',
          type: 'short',
          answer:
            'Bile salts support emulsification and micellar transport; lipase hydrolyzes triglycerides.',
          explanation: 'Bile is not an enzyme, and emulsification is different from bond cleavage.',
        },
        {
          id: 'anat-u5-l2-q4',
          prompt: 'Long-chain dietary lipid leaves the enterocyte mainly through which pathway?',
          type: 'mcq',
          options: [
            'Chylomicrons into lacteals',
            'Directly into the stomach',
            'Through the trachea',
            'As intact droplets through bile ducts',
          ],
          answer: 'Chylomicrons into lacteals',
          explanation:
            'The lymphatic route differs from the usual portal route for monosaccharides.',
        },
        {
          id: 'anat-u5-l2-q5',
          prompt: 'Fat-soluble vitamins malabsorbed in cholestasis:',
          type: 'short',
          answer: 'A, D, E, K; monitor night vision, bone, neuro, and clotting.',
          explanation: 'Lack of bile impairs micelle formation.',
        },
        {
          id: 'anat-u5-l2-q6',
          prompt: 'Distinguish the roles of bile salts and pancreatic lipase.',
          type: 'short',
          answer:
            'Bile salts support emulsification and micellar transport; lipase catalyzes lipid hydrolysis.',
          explanation: 'A physical aid to digestion is not itself an enzyme.',
          points: 3,
        },
        {
          id: 'anat-u5-l2-q7',
          prompt: 'Trace long-chain dietary lipid from enterocyte to systemic blood.',
          type: 'short',
          answer:
            'Reassembly into lipid, chylomicron packaging, entry into lacteals, lymphatic transport, then venous blood.',
          explanation:
            'This pathway differs from the usual portal route of absorbed monosaccharides and amino acids.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Explain a fat-absorption pattern',
        problem:
          'A case supplies normal pancreatic enzyme production but greatly reduced bile delivery to the small intestine. Predict the most directly affected step.',
        steps: [
          'Separate enzyme activity from physical handling. Lipase may be present, but lipid dispersion and micellar transport are impaired.',
          'Predict reduced efficiency in absorbing long-chain lipid products and possible reduced absorption of fat-soluble vitamins.',
          'Do not conclude that every nutrient is equally affected. Glucose and amino-acid pathways do not depend on micelles in the same way.',
          'Trace the normal destination after successful uptake: reassembly and chylomicron packaging, lacteals, lymphatic circulation, then blood.',
        ],
        conclusion:
          'A correct answer identifies the disrupted step and explains why the effect is selective.',
      },
    },
    {
      id: 'anat-u6-l1',
      unitId: 'anat-u6',
      title: 'Ulcers, GI Bleeding, and GI Cancers',
      durationMin: 35,
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
            'Melena often reflects digested blood and frequently suggests an upper gastrointestinal source. Hematochezia commonly suggests a lower source, but rapid transit from a brisk upper bleed can also produce red blood. Coffee-ground material reflects blood altered by gastric conditions.',
            'Interpret appearance alongside the supplied history and measurements. Ulcers, vascular abnormalities, tumors, and other lesions can bleed through different mechanisms. A color description alone does not identify the exact site or determine severity.',
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
        {
          heading: 'Explain injury as a balance between exposure and defense',
          body: [
            'An ulcer is a break in the mucosal barrier that extends deeper than a superficial erosion. Gastric acid and proteolytic activity are normal luminal functions; injury results when those exposures exceed local protection or when protection fails. Helicobacter pylori can persist within gastric mucus and alter inflammatory and secretory conditions. Nonsteroidal anti-inflammatory drugs can reduce protective prostaglandin effects. These pathways are not identical, and neither is explained by saying that all ulcers are caused by stress or spicy food. A useful answer links a cause to impaired barrier function and then to tissue injury.',
            'Gastric and duodenal ulcers share some mechanisms but occur in different locations. Descriptions of pain relative to meals may appear in teaching cases, yet symptom timing is not sufficiently specific to establish location by itself. Complications such as bleeding, perforation, or obstruction arise from different consequences of tissue damage. In a diagram, locate the mucosa, submucosa, muscular wall, and serosal covering to explain why deeper injury can have different effects from superficial irritation. The goal here is to reason about structure and mechanism, not to infer a personal diagnosis from a symptom checklist.',
          ],
        },
        {
          heading: 'Trace neoplasia from altered cells to organ effects',
          body: [
            'Cancer involves abnormal cell behavior that may include uncontrolled proliferation, resistance to normal growth constraints, invasion, and metastatic spread. A benign growth and an invasive malignancy are not distinguished merely by size. In the digestive tract, a lesion may obstruct a lumen, disrupt absorption, bleed, or alter organ output depending on its location. A colorectal lesion and a pancreatic lesion can therefore both produce weight change through different pathways. Recognizing the affected function is more informative than treating weight loss as specific to one disease.',
            'The adenoma-to-carcinoma sequence is a useful model for some colorectal cancers, but not every polyp becomes cancer and not every colorectal cancer follows one identical molecular route. Dysplasia describes abnormal epithelial growth and organization; invasion requires crossing the relevant tissue boundary. Barrett metaplasia illustrates a change in epithelial type associated with chronic reflux and altered risk, not a statement that every case progresses to malignancy. When interpreting a pathology figure, distinguish the observed cellular change from an inference about future progression. Risk factors change probabilities; they are not guarantees.',
          ],
        },
        {
          heading: 'Interpret blood appearance with transit and location in mind',
          body: [
            'Blood exposed to digestive conditions can change appearance. Melena often reflects digested blood and frequently suggests an upper gastrointestinal source, but transit time and bleeding rate influence the pattern. Bright red blood commonly suggests a lower source, yet a brisk upper bleed can also move rapidly through the tract. Coffee-ground material reflects altered blood, not a precise measurement of the amount lost. In an examination case, use appearance as one clue alongside location, other findings, and the supplied investigation results. Avoid the absolute shortcut that one color always identifies one organ.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Melena',
          definition: 'Black tarry stool from upper GI bleeding.',
        },
        {
          term: 'Hematochezia',
          definition: 'Bright red blood, usually lower source.',
        },
        {
          term: 'Quadruple therapy',
          definition: 'PPI + bismuth + tetracycline + metronidazole for H. pylori.',
        },
        {
          term: 'Adenoma-carcinoma sequence',
          definition: 'Polyp progression to colorectal cancer.',
        },
        {
          term: 'Lynch syndrome',
          definition: 'Mismatch repair defect with MSI cancers.',
        },
        {
          term: 'Portal hypertension',
          definition: 'High portal pressure causing varices and splenomegaly.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Barrier failure or luminal obstruction?',
        instructions:
          'Inspect the case observations, then select the mechanism most directly supported.',
        observations: [
          {
            label: 'Mucosal image description',
            result: 'A focal defect extends through the mucosa.',
          },
          {
            label: 'Protective function',
            result: 'Mucus-bicarbonate protection is reduced.',
          },
          {
            label: 'Lumen assessment',
            result: 'No obstructing tissue mass is described.',
          },
        ],
        question: 'Which mechanism best fits?',
        options: [
          'Acid-associated injury after weakened mucosal defense',
          'A tumor mechanically blocks the lumen',
          'Lactase selectively fails to hydrolyze lactose',
        ],
        correct: 0,
        explanation:
          'The observed defect and weakened barrier support ulcerative injury. The case does not supply evidence of a mass or a selective carbohydrate-enzyme defect.',
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
          prompt: 'What distinguishes invasive malignancy from dysplasia confined to epithelium?',
          type: 'mcq',
          options: [
            'Crossing the relevant tissue boundary',
            'A larger food bolus',
            'Any increased acid',
            'A dark color alone',
          ],
          answer: 'Crossing the relevant tissue boundary',
          explanation: 'Invasion concerns tissue relationships, not just lesion size.',
        },
        {
          id: 'anat-u6-l1-q5',
          prompt: 'Sudden severe ulcer pain + rigid abdomen suggests?',
          type: 'short',
          answer: 'Perforation with peritonitis; upright X-ray for free air.',
          explanation: 'Chemical then bacterial peritonitis is surgical.',
        },
        {
          id: 'anat-u6-l1-q6',
          prompt: 'Why is bright red blood not absolute proof of a lower gastrointestinal source?',
          type: 'short',
          answer:
            'A brisk upper source can move through the tract rapidly; transit and rate affect appearance.',
          explanation: 'Appearance must be integrated with other evidence.',
          points: 3,
        },
        {
          id: 'anat-u6-l1-q7',
          prompt: 'How does invasion differ from a large benign growth?',
          type: 'short',
          answer:
            'Invasion involves crossing tissue boundaries and infiltrating surrounding structures; size alone does not establish that behavior.',
          explanation:
            'Pathology describes cellular behavior and tissue relationships, not only dimensions.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Distinguish two mechanisms of digestive dysfunction',
        problem:
          'Case A supplies impaired mucus protection and a focal mucosal defect. Case B supplies an invasive colonic lesion that narrows the lumen.',
        steps: [
          'For A, connect reduced defense to acid and enzyme exposure of underlying tissue. The immediate problem is barrier injury.',
          'For B, identify abnormal tissue growth and invasion. Luminal narrowing can impair propulsion even before a major absorption defect develops.',
          'Both may bleed, so bleeding alone does not separate their mechanisms.',
          'Use the structural evidence to support the distinction and state what remains unknown, such as the precise cause of the barrier failure in A.',
        ],
        conclusion:
          'A symptom shared by two conditions does not erase the anatomical differences responsible for it.',
      },
    },
    {
      id: 'anat-u6-l2',
      unitId: 'anat-u6',
      title: 'Lactose Intolerance, Obesity, and Exercise Metabolism',
      durationMin: 35,
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
        {
          heading: 'Separate an enzyme deficiency from an immune response',
          body: [
            'Lactase is a brush-border enzyme that hydrolyzes lactose into glucose and galactose. Reduced lactase activity allows more intact lactose to remain in the lumen and reach the colon. The retained substrate contributes to osmotic effects and bacterial fermentation. Lactose malabsorption describes incomplete absorption; lactose intolerance adds the experience of symptoms associated with that process. The amount ingested, transit, microbiota, and individual sensitivity affect the outcome. Thus a simple enzyme-capacity model demonstrates a mechanism but cannot specify one universal symptom threshold.',
            'Milk-protein allergy is different: an immune response targets proteins rather than a disaccharide digestion pathway. Removing lactose does not necessarily remove those proteins. Celiac disease is another distinct process involving an immune-mediated response to gluten in susceptible people and small-intestinal injury that can secondarily reduce brush-border functions. The comparison matters because the same broad complaint, such as abdominal discomfort, can arise through unrelated mechanisms. In a case question, identify the substrate, affected tissue, and type of process before proposing a label.',
          ],
        },
        {
          heading: 'Connect exercise and energy balance without oversimplifying obesity',
          body: [
            'Digestion supplies energy and building blocks, but long-term body-mass regulation involves intake, expenditure, absorption, endocrine signaling, genetics, environment, sleep, and medications among other factors. Energy conservation still applies, yet physiological responses can alter both sides of an energy-balance calculation. Obesity cannot be explained as a single failed enzyme or inferred from an isolated meal. Adipose tissue is metabolically active and communicates through hormones and inflammatory signals. Its distribution and associated metabolic effects matter alongside total mass.',
            'During exercise, skeletal muscle increases demand for ATP and can use carbohydrate and lipid fuels in proportions affected by intensity, duration, training, and availability. Sympathetic activation and blood-flow redistribution influence gastrointestinal activity. Intense exercise can produce gastrointestinal symptoms through several mechanisms, while habitual activity can support metabolic function. Keep immediate responses separate from adaptations over weeks or months. A short burst of activity does not instantaneously reverse chronic digestive pathology, and an episode of discomfort does not demonstrate a chronic enzyme deficiency.',
          ],
        },
        {
          heading: 'Design a controlled comparison',
          body: [
            'To investigate a digestion mechanism in a virtual case, change one factor while holding the others fixed. Compare equal lactose loads at different hydrolysis capacities, then equal capacities at different loads. Label the dependent variable as unhydrolyzed lactose, not symptom severity. This distinction prevents a measurable model output from being mistaken for a complete biological outcome. If comparing two real foods in a hypothetical experiment, note that fat, protein, portion size, and transit effects may differ too. A useful control differs only in the factor being tested; a collection of simultaneous changes prevents a clean causal conclusion.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Lactase persistence',
          definition: 'Genetic continued lactase expression into adulthood.',
        },
        {
          term: 'Hydrogen breath test',
          definition: 'Rise in exhaled H2 from undigested carbohydrate.',
        },
        {
          term: 'FODMAP',
          definition: 'Fermentable carbs triggering IBS-like symptoms.',
        },
        {
          term: 'NAFLD',
          definition: 'Liver fat from metabolic disease; reversible early.',
        },
        {
          term: 'Splanchnic shunt',
          definition: 'Exercise blood diversion away from gut.',
        },
        {
          term: 'Secondary deficiency',
          definition: 'Temporary lactase loss from villous injury.',
        },
      ],
      simulation: {
        kind: 'model',
        model: 'digestion',
        title: 'Lactose load experiment',
        instructions:
          'Compare the load entering the intestine with the modeled amount hydrolyzed during transit.',
        challenge: 'Find two different load-capacity pairs that both leave 8 g unhydrolyzed.',
        takeaway: 'The same residual substrate can result from a larger load or a lower capacity.',
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
          answer:
            'Allergy: immune hives/wheeze needing avoidance; intolerance: enzymatic bloating/diarrhea managed by dose/lactase.',
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
        {
          id: 'anat-u6-l2-q6',
          prompt: 'Why might lactose-free milk fail to address a milk-protein allergy?',
          type: 'short',
          answer:
            'Lactose removal changes a sugar; the proteins targeted by the immune response may remain.',
          explanation: 'Enzyme-mediated malabsorption and allergy involve different targets.',
          points: 3,
        },
        {
          id: 'anat-u6-l2-q7',
          prompt:
            'A model leaves 18 g rather than 6 g unhydrolyzed. Why can it not predict exactly threefold symptoms?',
          type: 'short',
          answer:
            'Symptoms also depend on transit, microbial fermentation, sensitivity, and other factors not represented in the mass balance.',
          explanation: 'Model output and full biological outcome are different quantities.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Apply a simple substrate balance',
        problem:
          'A teaching model supplies 24 g lactose during transit. In one setting, 18 g can be hydrolyzed; in another, only 6 g can be hydrolyzed.',
        steps: [
          'Use residual = max(0, input − effective hydrolysis capacity).',
          'First setting: 24 − 18 = 6 g remains unhydrolyzed. Second setting: 24 − 6 = 18 g remains.',
          'The second setting leaves three times the substrate for downstream processes, although that does not imply three times the symptoms.',
          'If capacity exceeds the load, residual is zero rather than a negative mass. This is a physical boundary on the model.',
        ],
        conclusion:
          'A mass balance can isolate mechanism while leaving clinical outcomes appropriately undetermined.',
      },
    },
    {
      id: 'anat-u7-l1',
      unitId: 'anat-u7',
      title: 'Central Immune Organs and Lymph Flow',
      durationMin: 35,
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
        {
          heading: 'Trace a lymphocyte and an antigen on separate routes',
          body: [
            'Primary lymphoid organs support lymphocyte development and maturation. B cells develop in bone marrow, and T-cell precursors travel from marrow to the thymus for maturation. Secondary lymphoid tissues are organized meeting places where mature lymphocytes encounter antigens and receive activation signals. These include lymph nodes, spleen, and mucosa-associated lymphoid tissue. A lymph node is therefore not simply a miniature thymus: one supports antigen-driven responses, while the other has a central developmental and selection role.',
            'Antigen from peripheral tissue may enter lymphatic capillaries and travel through afferent vessels to a regional node. Dendritic cells can carry antigen and present processed peptides. Naive lymphocytes circulate between blood and lymphoid tissues, increasing the chance that a rare antigen-specific cell meets the corresponding antigen. Blood-borne material is monitored especially by the spleen. In a case question, ask where the antigen originated: tissue fluid, blood, or a mucosal surface. That origin helps predict which organ first provides a structured encounter.',
          ],
        },
        {
          heading: 'Explain why lymph must return to circulation',
          body: [
            'Fluid and proteins leave blood capillaries during tissue exchange. Lymphatic uptake returns part of this material to the vascular system and supports volume balance. Overlapping endothelial junctions in lymphatic capillaries permit entry when local pressure conditions favor it. Larger vessels contain valves that support one-way transport. Skeletal-muscle activity, respiratory pressure changes, and vessel contraction help move lymph; there is no separate central lymph heart analogous to the blood-circulation pump. Obstruction can produce protein-rich interstitial accumulation and swelling.',
            "The thoracic duct drains much of the body toward the left venous angle; the right lymphatic drainage pathway serves the right upper region. Intestinal lacteals also carry chylomicrons, linking lymph flow to dietary lipid transport. Thus the lymphatic system supports fluid return, immune surveillance, and lipid transport at once. When studying an anatomical map, trace an actual path from foot tissue through regional vessels and nodes to venous blood, then compare it with a blood-borne antigen's route to the spleen. Flow direction explains function more effectively than memorizing dots on a body outline.",
          ],
        },
        {
          heading: 'Connect thymic selection with later immunity',
          body: [
            'Developing T cells must recognize self MHC appropriately while avoiding strongly harmful self-reactivity. Positive and negative selection describe different filters in this developmental process. Selection is imperfect, and additional peripheral tolerance mechanisms remain necessary. A mature naive T cell has completed development but has not yet encountered its specific activating antigen in the relevant context. Naive does not mean immature. Likewise, a memory cell is not defined simply by residing in a lymph node. Developmental state, activation history, location, and function are distinct categories that often appear together in competition questions.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Positive selection',
          definition: 'Thymic survival of T cells recognizing self-MHC.',
        },
        {
          term: 'Negative selection',
          definition: 'Deletion of strongly self-reactive lymphocytes.',
        },
        {
          term: 'Thoracic duct',
          definition: 'Largest lymph vessel draining most of body to left vein.',
        },
        {
          term: 'White pulp',
          definition: 'Splenic lymphoid tissue responding to blood antigens.',
        },
        {
          term: 'Howell-Jolly bodies',
          definition: 'Nuclear remnants marking asplenia.',
        },
        {
          term: 'MALT',
          definition: 'Mucosa-associated lymphoid tissue guarding entries.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Follow an antigen through the body',
        instructions: 'Inspect the antigen route and choose the appropriate organ function.',
        observations: [
          {
            label: 'Origin',
            result: 'Antigen enters interstitial fluid around a skin abrasion.',
          },
          {
            label: 'Transport',
            result: 'Afferent lymph carries antigen-bearing cells from the tissue.',
          },
          {
            label: 'Cell encounter',
            result: 'Mature naive lymphocytes meet presented antigen in organized lymphoid tissue.',
          },
        ],
        question: 'Which location best fits this encounter?',
        options: [
          'Regional lymph node',
          'Thymic cortex for T-cell selection',
          'Bone marrow for erythrocyte production',
        ],
        correct: 0,
        explanation:
          'Regional nodes connect incoming tissue lymph with mature lymphocyte surveillance. Development in primary organs is a different process.',
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
          options: [
            'Good spleen',
            'Absent spleen function',
            'High platelets only',
            'Iron overload',
          ],
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
        {
          id: 'anat-u7-l1-q6',
          prompt: 'Why is the spleen especially relevant to blood-borne antigens?',
          type: 'short',
          answer:
            'Its organized immune tissue samples blood rather than incoming afferent tissue lymph.',
          explanation: 'Match the organ to the sampled compartment.',
          points: 3,
        },
        {
          id: 'anat-u7-l1-q7',
          prompt: 'Distinguish a mature naive T cell from an immature T cell.',
          type: 'short',
          answer:
            'A mature naive cell has passed developmental selection but has not undergone its antigen-driven activation; an immature cell is still developing.',
          explanation: 'Activation history and developmental maturity are separate dimensions.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Locate the first organized response',
        problem:
          'A small skin abrasion introduces material into tissue fluid of the left foot. Trace a plausible route toward immune surveillance and return to blood.',
        steps: [
          'Material or antigen-bearing cells enter local lymphatic pathways rather than being assumed to travel directly to the thymus.',
          'Afferent lymph delivers material to regional lymph nodes, where antigen and recirculating lymphocytes can meet.',
          'Lymph exits through efferent pathways and larger trunks, ultimately reaching major duct drainage toward venous circulation.',
          'Distinguish the spleen: it primarily surveys blood-borne material, while the thymus supports T-cell development.',
        ],
        conclusion:
          'The route follows the compartment containing the antigen and the function of each lymphoid organ.',
      },
    },
    {
      id: 'anat-u7-l2',
      unitId: 'anat-u7',
      title: 'Spleen, Nodes, and Barriers in Defense',
      durationMin: 35,
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
        {
          heading: 'Map the internal geography of secondary organs',
          body: [
            'A lymph node is organized to bring different cells and antigens together efficiently. B-cell follicles occupy cortical regions, while T cells are concentrated in the paracortex. Antigen-bearing dendritic cells interact with T cells, and activated B cells may participate in germinal-center reactions. Lymph passes through a series of sinuses before leaving by efferent routes. The arrangement creates repeated opportunities to encounter antigen while fluid is filtered. Enlarged nodes can reflect cellular proliferation and inflammation, but size alone cannot distinguish infection from every other cause.',
            'The spleen has white pulp associated with immune responses and red pulp associated with blood filtration and removal of aging or damaged erythrocytes. Its architecture makes it important in defense against certain blood-borne organisms. This is different from a node filtering lymph from a local tissue region. Mucosa-associated lymphoid tissue places surveillance near common entry surfaces, including the gastrointestinal and respiratory tracts. A diagram question may mix these structures; identify what fluid or surface is being monitored before naming the cell zone.',
          ],
        },
        {
          heading: 'Think of barriers as selective interfaces',
          body: [
            "The skin's outer keratinized layers create a physical obstacle, while secretions and local chemical conditions contribute to defense. Mucosal surfaces must remain permeable enough to exchange nutrients or gases, so their defenses rely on coordinated mucus, epithelial junctions, antimicrobial molecules, immune cells, and movement. The intestinal surface cannot simply become an impermeable wall without sacrificing absorption. The respiratory surface cannot be covered by an arbitrarily thick barrier without affecting diffusion. Defense therefore balances exclusion of harmful agents with the physiological function of each interface.",
            'Normal microbial communities can compete for space and nutrients and influence immune activity. They are not a single uniformly beneficial organism, and community composition varies by site and circumstances. Barrier disruption changes the relationship between microbes and host tissues. For example, organisms tolerated at one surface may cause problems after entering a normally protected compartment. In a case, the location of a microbe can therefore matter as much as its name. Describe both the barrier crossed and the new environment reached.',
          ],
        },
        {
          heading: 'Separate inflammation from proof of a specific cause',
          body: [
            'Redness and warmth can result from increased local blood flow; swelling can result from altered vascular permeability and fluid accumulation; pain can arise from inflammatory mediators and tissue effects. These signs explain a response but do not identify the initiating organism. Sterile tissue injury can also generate inflammation. Similarly, fever is a regulated systemic response, not a unique marker for bacterial infection. For competition reasoning, separate the observation, the physiological mechanism behind it, and the list of possible causes. This prevents an overly specific conclusion from being drawn from a general defense pattern.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Germinal center',
          definition: 'Node site of B mutation and selection.',
        },
        {
          term: 'Marginal zone',
          definition: 'Splenic trap for encapsulated bacteria.',
        },
        {
          term: 'Secretory IgA',
          definition: 'Mucosal antibody neutralizing pathogens.',
        },
        {
          term: 'Left shift',
          definition: 'Immature neutrophils signaling acute infection.',
        },
        {
          term: 'Sentinel node',
          definition: 'First draining node biopsied in cancer staging.',
        },
        {
          term: 'Sequestration',
          definition: 'Splenic trapping causing cytopenias.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Choose the surveillance compartment',
        instructions: 'Reveal three observations about a lymphoid organ.',
        observations: [
          {
            label: 'Input',
            result: 'The organ receives and filters blood.',
          },
          {
            label: 'Architecture',
            result: 'White pulp supports immune responses; red pulp processes erythrocytes.',
          },
          {
            label: 'Function',
            result: 'The case emphasizes defense against blood-borne material.',
          },
        ],
        question: 'Which organ fits?',
        options: ['Spleen', 'Regional lymph node', 'Thymus'],
        correct: 0,
        explanation:
          'White and red pulp plus blood filtration identify the spleen. Nodes primarily receive tissue lymph; the thymus supports T-cell maturation.',
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
          answer:
            'Overwhelming post-splenectomy sepsis from encapsulated bacteria can progress in hours.',
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
        {
          id: 'anat-u7-l2-q6',
          prompt: 'Explain why inflammation does not prove a bacterial infection.',
          type: 'short',
          answer:
            'Tissue injury and other nonbacterial stimuli can activate inflammatory pathways, producing similar local signs.',
          explanation: 'The response pattern is less specific than the initiating cause.',
          points: 3,
        },
        {
          id: 'anat-u7-l2-q7',
          prompt:
            'Why must an intestinal barrier remain selective rather than completely impermeable?',
          type: 'short',
          answer:
            'It must limit harmful entry while permitting nutrient, water, and electrolyte absorption.',
          explanation:
            'Anatomical defense must remain compatible with the organ’s exchange function.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Compare surveillance sites',
        problem:
          'One case involves particles arriving from a skin wound in lymph. Another involves microbes circulating in blood. A third involves intestinal luminal exposure.',
        steps: [
          'The skin-derived material is directed toward regional nodes through afferent lymph.',
          'Blood-borne material encounters splenic surveillance, particularly organized white-pulp immune structures.',
          'Intestinal exposure is monitored by epithelial defenses and mucosa-associated lymphoid tissue.',
          'Each site contains immune cells, but its input route and anatomical organization determine its role. The same word, antigen, does not imply the same route in every case.',
        ],
        conclusion: 'Map compartment to organ before mapping organ to cell type.',
      },
    },
    {
      id: 'anat-u8-l1',
      unitId: 'anat-u8',
      title: 'Innate Immunity and Complement',
      durationMin: 35,
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
        {
          heading: 'Build an innate response in causal order',
          body: [
            'Innate recognition begins when cells detect molecular patterns associated with microbes or tissue damage. Pattern-recognition receptors do not require the prior clonal learning characteristic of adaptive immunity. Activated cells release signals that influence nearby vessels and recruit circulating leukocytes. Neutrophils often arrive rapidly in acute responses, while macrophages contribute phagocytosis, signaling, cleanup, and repair functions. Natural killer cells respond to altered target-cell signals and can kill certain infected or abnormal cells. These are complementary tasks, not a single generic immune-cell action.',
            'A phagocyte first recognizes and attaches to a target, engulfs it into an internal compartment, and then exposes it to destructive processes following compartment maturation. Opsonins improve recognition by coating the target with molecules that phagocytes can bind. This is different from neutralization, in which binding blocks a pathogen or toxin from interacting with its target, and different again from membrane attack by complement. When an exam asks what an antibody or complement fragment does, identify the physical consequence rather than merely saying it fights infection.',
          ],
        },
        {
          heading: 'Organize complement around convergence and outcomes',
          body: [
            'Classical, lectin, and alternative activation routes begin differently but converge on key complement-cleavage events. The classical pathway can be activated through antibody-associated recognition; lectin-pathway recognition involves carbohydrate patterns; the alternative pathway amplifies complement activity under appropriate surface conditions. C3 cleavage produces fragments with distinct roles. C3b contributes opsonization and downstream complex formation; inflammatory fragments such as C3a and C5a promote recruitment and vascular effects. Terminal components assemble a membrane attack complex in susceptible targets.',
            'Complement must be regulated to avoid damage to host cells. Defects in different components produce different patterns because the pathways do not all lose the same function. A defect near central C3 activity can affect broad opsonization, whereas loss of terminal components particularly compromises membrane-attack function and is associated with susceptibility to certain organisms. Do not infer that every complement deficiency produces identical infections. A good mechanism answer locates the failed stage, names the missing output, and predicts the consequence while recognizing that other defense pathways may still operate.',
          ],
        },
        {
          heading: 'Distinguish early defense from antigen-specific memory',
          body: [
            'Innate mechanisms act quickly and can constrain an infection while adaptive cells are selected, activated, and expanded. Innate cells also help shape adaptive responses through antigen presentation and signaling. The two systems are not independent replacement options. The antibody-response simulator below focuses only on a conceptual adaptive curve so you can contrast its delay with early innate activity. A flat modeled antibody curve at the beginning does not mean the body has no defense during that interval. The model deliberately does not quantify phagocytosis, complement, cytokines, or pathogen burden.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'PAMP',
          definition: 'Conserved microbial pattern sensed by innate receptors.',
        },
        {
          term: 'Opsonization',
          definition: 'C3b/antibody coating enhancing phagocytosis.',
        },
        {
          term: 'MAC',
          definition: 'C5b-9 pore lysing gram-negative and Neisseria.',
        },
        {
          term: 'Interferon',
          definition: 'Antiviral cytokine inducing neighbor resistance.',
        },
        {
          term: 'NETs',
          definition: 'Neutrophil DNA traps catching microbes.',
        },
        {
          term: 'CH50',
          definition: 'Total complement activity screening test.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Which defense function failed?',
        instructions: 'Use the simulated assay results to identify the missing action.',
        observations: [
          {
            label: 'Recognition assay',
            result: 'Microbial targets are recognized.',
          },
          {
            label: 'Coating assay',
            result: 'C3b deposition on targets is markedly reduced.',
          },
          {
            label: 'Phagocyte assay',
            result: 'Phagocytes work better when an external opsonin is supplied.',
          },
        ],
        question: 'Which function is most directly impaired?',
        options: ['Opsonization', 'Antibody class switching alone', 'Red-cell oxygen binding'],
        correct: 0,
        explanation:
          'Reduced target coating and improved uptake after supplying an opsonin point to an opsonization defect rather than a failure of all phagocyte functions.',
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
          answer:
            'MAC lysis is critical for gram-negative diplococci; opsonization alone is insufficient.',
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
        {
          id: 'anat-u8-l1-q6',
          prompt: 'Distinguish opsonization from neutralization.',
          type: 'short',
          answer:
            'Opsonization marks a target for uptake; neutralization blocks a harmful binding or activity such as toxin interaction with a receptor.',
          explanation:
            'Both can involve immune binding, but their immediate physical effects differ.',
          points: 3,
        },
        {
          id: 'anat-u8-l1-q7',
          prompt:
            'Why does absence of early antibody in a conceptual curve not mean absence of defense?',
          type: 'short',
          answer:
            'Barriers, phagocytes, complement, and other innate mechanisms can act before substantial adaptive antibody production.',
          explanation: 'The plotted variable represents only one part of the response.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Localize a complement defect',
        problem:
          'A hypothetical dataset shows poor complement-mediated coating of microbes, while antibody production is present. A second dataset shows coating but failure of terminal membrane attack.',
        steps: [
          'For the first dataset, investigate the pathway supporting opsonization, including central complement activation and C3b availability.',
          'For the second, distinguish preserved recognition and coating from the terminal complex that disrupts susceptible membranes.',
          'Do not label both as a complete absence of immunity; different outputs have been lost.',
          'Explain why a functional assay should target the suspected pathway rather than measure antibody concentration alone.',
        ],
        conclusion:
          'An immune system is a network of separable functions. Locate the failure instead of assuming every component fails together.',
      },
    },
    {
      id: 'anat-u8-l2',
      unitId: 'anat-u8',
      title: 'Adaptive Immunity, Antibodies, and Allergy',
      durationMin: 35,
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
        {
          heading: 'Trace activation, selection, expansion, and differentiation',
          body: [
            'Each lymphocyte has antigen-recognition specificity generated during development. When a compatible antigen is encountered with the required context and signals, the appropriate clone expands. Cells then differentiate into effectors and memory populations. Clonal selection does not mean an antigen redesigns every receptor to match itself; it selects cells whose receptors already provide compatible recognition. This distinction explains why the initial specific response takes time and why memory changes a later response to the same antigen.',
            'B cells can become antibody-secreting plasma cells. Helper T cells coordinate responses through contact-dependent and soluble signals, while cytotoxic T cells can kill target cells displaying relevant antigen in the appropriate MHC context. MHC I generally presents intracellularly derived peptides to CD8 T cells; MHC II on professional antigen-presenting cells presents peptides to CD4 T cells. These are functional patterns, not a claim that every antigen follows only one possible processing route. An exam may simplify the presentation pathway; identify the source compartment and presenting cell before choosing the responding T-cell type.',
          ],
        },
        {
          heading: 'Separate specificity, antibody class, and affinity',
          body: [
            'Antibody variable regions determine binding specificity, while the constant region helps determine effector interactions and class. Class switching can change the constant region while preserving the underlying antigen target. Affinity maturation instead selects B-cell variants with improved binding within germinal-center processes. These are different changes. A class-switched antibody is not automatically evidence that its antigen target changed, and more antibody is not identical to better binding affinity.',
            'IgM is prominent early in many primary responses and has a multimeric structure that supports effective binding and complement activation. IgG is important in blood and tissues and can cross the placenta. Secretory IgA contributes to mucosal defense. IgE participates in immediate allergic responses and defense against some parasites through interactions with effector cells. IgD functions mainly as a B-cell receptor component. The distribution and context matter: a question about a mucosal secretion differs from one about placental transfer or mast-cell sensitization. Learn one mechanistic role per class before adding exception-heavy details.',
          ],
        },
        {
          heading: 'Relate memory to a changing response curve',
          body: [
            "A secondary response to the same antigen often begins sooner and can be larger or more effective because memory cells are already available. The exact timing and magnitude vary with antigen, prior exposure, host factors, and the quantity being measured. The interactive curve uses arbitrary units and an explicitly illustrative equation. It is intended to show a shifted lag and amplitude, not predict a person's vaccine response or immune status. Allergy also requires context: sensitization and later exposure can connect antigen recognition to rapid mediator release, but not every adverse reaction to food or medication is an IgE-mediated allergy.",
          ],
        },
      ],
      keyTerms: [
        {
          term: 'MHC I vs II',
          definition: 'I presents to CD8, II presents to CD4.',
        },
        {
          term: 'IgE',
          definition: 'Mast cell antibody mediating immediate allergy.',
        },
        {
          term: 'Type III',
          definition: 'Immune complex deposition disease.',
        },
        {
          term: 'Systemic allergy',
          definition:
            'An immune reaction whose mediator effects can involve multiple organ systems.',
        },
        {
          term: 'Memory response',
          definition: 'Faster stronger IgG recall after priming.',
        },
        {
          term: 'Treg',
          definition: 'Regulatory T suppressing autoimmunity.',
        },
      ],
      simulation: {
        kind: 'model',
        model: 'immune',
        title: 'Primary and memory response explorer',
        instructions: 'Change the day and toggle prior memory to this antigen.',
        challenge: 'Compare day 3, day 7, and day 14 with and without memory.',
        takeaway:
          'The memory response begins earlier in this conceptual model; arbitrary units are not clinical antibody titers.',
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
        {
          id: 'anat-u8-l2-q6',
          prompt: 'What changes during class switching, and what can remain the same?',
          type: 'short',
          answer:
            'The antibody constant region and effector class change; the antigen-binding specificity can remain the same.',
          explanation: 'Class switching and affinity maturation describe different processes.',
          points: 3,
        },
        {
          id: 'anat-u8-l2-q7',
          prompt:
            'Why must you know the antigen is the same when comparing primary and secondary responses?',
          type: 'short',
          answer:
            'Memory is antigen-specific; prior exposure to an unrelated antigen does not establish the same memory advantage.',
          explanation: 'A controlled comparison isolates exposure history for a particular target.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Interpret a faster second response',
        problem:
          'An experiment shows a delayed small antibody rise after first exposure and an earlier larger rise after a later exposure to the same antigen.',
        steps: [
          'Identify the controlled comparison: the antigen is the same and exposure history differs.',
          'Memory cells provide a plausible mechanism for reduced activation delay and a changed response magnitude.',
          'Do not infer that all antibodies now recognize a different antigen; specificity and class are different properties.',
          'Separate the curve measurement from clinical protection. An antibody quantity is evidence about one immune output, not a complete measurement of every protective process.',
        ],
        conclusion:
          'Memory changes how the system responds; the graph must still be interpreted according to its actual axes and experimental context.',
      },
    },
    {
      id: 'anat-u9-l1',
      unitId: 'anat-u9',
      title: 'Immunodeficiency: HIV, SCID, and CVID',
      durationMin: 35,
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
        {
          heading: 'Classify the failed arm of immunity',
          body: [
            'An immunodeficiency can primarily affect antibody production, T-cell function, phagocyte activity, complement, or several functions together. These categories help generate predictions, but actual disorders may overlap and vary in severity. Primary immunodeficiencies arise from intrinsic defects, often genetic; secondary immunodeficiency can follow infection, certain treatments, malnutrition, or other conditions. A normal count of one cell type does not prove that its function is normal, and a low count alone does not specify the underlying cause.',
            'Severe combined immunodeficiency describes a group of disorders involving profound T-cell dysfunction with additional immune consequences that vary by genetic cause. Because helper T-cell function supports other responses, a defect in one compartment can have downstream effects on another. Common variable immunodeficiency is heterogeneous and typically involves impaired antibody production or function after appropriate evaluation. It is not simply the milder version of every SCID subtype. In a study case, compare onset, infection pattern, cell counts, immunoglobulin measurements, and functional response rather than classifying by a single memorable acronym.',
          ],
        },
        {
          heading: 'Connect HIV biology with immune coordination',
          body: [
            'HIV infects susceptible cells through interactions involving CD4 and appropriate coreceptors. Viral replication and the host response can progressively disrupt immune function without effective control. CD4 helper T-cell depletion is especially consequential because these cells coordinate multiple immune pathways. A falling helper-cell population can therefore impair defenses beyond one antibody class. Viral load and CD4 measurements answer different questions: one concerns viral material in a measured compartment, while the other describes a component of immune-cell status.',
            'Screening and diagnostic interpretation depend on the particular assay and timing after exposure. Antigen, antibody, and nucleic-acid tests detect different targets, so an early negative result does not have the same meaning for every method. This course uses these differences to teach measurement logic rather than provide a testing schedule. Similarly, antiretroviral therapy illustrates intervention at stages of viral replication, not a claim that replacing one immune cell alone resolves the entire process. Keep mechanism, laboratory target, and interpretation window separate when reading a case.',
          ],
        },
        {
          heading: 'Avoid treating a response model as a diagnostic tool',
          body: [
            'A weak or delayed antibody response can arise through different mechanisms, including inadequate helper activity, a B-cell defect, or circumstances of the antigen exposure. The immune-response model offers a conceptual comparison of exposure history; it does not simulate SCID, CVID, or HIV numerically. Use a clinical-style evidence investigation to localize a functional defect, then state which additional assay would discriminate competing explanations. A careful answer can identify impaired humoral response without pretending that the information establishes a complete diagnosis.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'U=U',
          definition: 'Undetectable viral load means untransmittable.',
        },
        {
          term: 'TREC',
          definition: 'Newborn SCID screen measuring T excision circles.',
        },
        {
          term: 'Opportunistic threshold',
          definition: 'CD4 level predicting specific infections.',
        },
        {
          term: 'ART',
          definition: 'Combination antiretroviral therapy blocking replication.',
        },
        {
          term: 'Bronchiectasis',
          definition: 'Chronic airway dilation from repeated infection.',
        },
        {
          term: 'PEP',
          definition: 'Post-exposure prophylaxis started within 72 hours.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Find the functional immune gap',
        instructions:
          'Open the simulated results; diagnose the failed function rather than a person.',
        observations: [
          {
            label: 'Cell inventory',
            result: 'B cells are present in the sample.',
          },
          {
            label: 'Challenge response',
            result: 'Antibody output after repeated specified challenges is poor.',
          },
          {
            label: 'Comparison',
            result: 'The supplied T-cell functional comparison is preserved.',
          },
        ],
        question: 'What is directly supported?',
        options: [
          'Impaired humoral response despite B-cell presence',
          'All immunity is absent',
          'A specific diagnosis is certain from one count',
        ],
        correct: 0,
        explanation:
          'The case supports a functional antibody-response deficit. It does not establish every cause or a complete clinical diagnosis.',
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
          prompt: 'Why can a helper T-cell defect affect several immune pathways?',
          type: 'mcq',
          options: [
            'Helper signals coordinate multiple responses',
            'T cells are all antibodies',
            'Only red cells are affected',
            'All immune cells have identical jobs',
          ],
          answer: 'Helper signals coordinate multiple responses',
          explanation:
            'A defect in coordination can affect downstream antibody and cellular functions.',
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
          options: [
            'High IgG only',
            'Low IgG + low IgA/IgM with poor responses',
            'Normal all',
            'High IgE only',
          ],
          answer: 'Low IgG + low IgA/IgM with poor responses',
          explanation: 'Combined antibody failure defines CVID.',
        },
        {
          id: 'anat-u9-l1-q5',
          prompt: 'Which receptor and coreceptor interactions are relevant to HIV entry?',
          type: 'short',
          answer:
            'CD4 together with a compatible coreceptor, commonly CCR5 or CXCR4; tropism varies.',
          explanation:
            'Coreceptor use is not a universal fixed early-to-late switch in every infection.',
        },
        {
          id: 'anat-u9-l1-q6',
          prompt: 'Why can a normal B-cell count coexist with impaired antibody defense?',
          type: 'short',
          answer:
            'Cell presence does not guarantee normal activation, differentiation, class switching, secretion, or antibody function.',
          explanation: 'Counts and functional assays measure different properties.',
          points: 3,
        },
        {
          id: 'anat-u9-l1-q7',
          prompt:
            'What different information do viral load and CD4 count provide in an HIV teaching case?',
          type: 'short',
          answer:
            'Viral load measures viral material; CD4 count measures the size of a helper T-cell population.',
          explanation: 'One is not a direct substitute for the other.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Interpret cell quantity versus function',
        problem:
          'A hypothetical case has circulating B cells but repeatedly poor antibody responses to supplied antigen challenges. T-cell measurements are also provided and appear preserved.',
        steps: [
          'Recognize that the presence of B cells does not establish successful differentiation or antibody function.',
          'The supplied functional challenge supports an impaired humoral-response pathway.',
          'Preserved T-cell evidence helps narrow the comparison but does not establish one named disorder without other required information.',
          'Request the relevant additional context: immunoglobulin measurements, clinical history, repeated validated functional assessment, and exclusion of secondary causes in the educational case.',
        ],
        conclusion:
          'A functional deficit can exist despite measurable cell numbers. State the level of conclusion supported by the data.',
      },
    },
    {
      id: 'anat-u9-l2',
      unitId: 'anat-u9',
      title: 'Autoimmunity, MS, RA, and Systemic Allergy',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Explain tolerance loss and molecular mimicry',
        'Contrast MS and RA pathology and drugs',
        'Explain the physiological sequence of a systemic allergic reaction',
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
            'Anaphylaxis is a rapid systemic reaction that can affect airway function and circulation through mediator-driven changes. Increased vascular permeability, vasodilation, and bronchoconstriction help explain the physiological findings. It is distinct from a local mild response and requires emergency care.',
            'For this educational course, trace trigger, immune effector activation, mediator release, and organ effects. Epinephrine is central to emergency treatment, but the lesson does not provide an individual dosing or response plan. Compare the rapid mechanism with the slower tissue injury discussed in autoimmunity.',
          ],
        },
        {
          heading: 'Test discriminators',
          body: [
            'MS worsens with heat and shows central white matter lesions; Guillain-Barre ascends peripherally after infection with albuminocytologic dissociation. RA is symmetric with anti-CCP; lupus is multisystem with ANA and immune complexes; anaphylaxis is minutes with airway and pressure collapse.',
            'For vignettes, note tempo, symmetry, heat effect, antibody pattern, and first drug: steroids for MS relapse, methotrexate for RA, epi for anaphylaxis.',
          ],
        },
        {
          heading: 'Explain tolerance as active regulation',
          body: [
            "The immune system must recognize harmful challenges while limiting damaging responses to the body's own structures. Central tolerance acts during lymphocyte development; peripheral tolerance adds control after mature cells leave primary organs. Deletion, functional unresponsiveness, regulatory cells, and restricted activation contexts contribute to this control. Self-reactive cells can still exist without inevitably causing disease. Autoimmunity emerges from interacting susceptibility, regulation, and environmental factors rather than a single universal trigger.",
            'An autoimmune target determines much of the resulting physiology. In multiple sclerosis, immune-mediated damage to central nervous system myelin and associated structures impairs signal conduction. In rheumatoid arthritis, persistent inflammation centered on synovial joints can damage cartilage and bone. These disorders involve immune dysregulation but do not share an identical target tissue or outcome. An answer should connect target, inflammatory process, structural damage, and functional consequence. Naming an antibody without explaining the affected tissue is usually insufficient mechanistic reasoning.',
          ],
        },
        {
          heading: 'Distinguish allergy, autoimmunity, and immunodeficiency',
          body: [
            'Allergy describes an inappropriate immune response to an otherwise generally harmless external antigen in a susceptible person. Autoimmunity targets self components. Immunodeficiency involves inadequate protective immune function. These categories can coexist, but they answer different questions about the direction and adequacy of the response. Lactose intolerance, for example, is primarily a digestion problem rather than one of these immune-response categories. Using the correct category first prevents downstream confusion about mechanism.',
            "Immediate IgE-associated reactions involve prior sensitization of effector cells such as mast cells and subsequent antigen-triggered mediator release. Local reactions can affect a particular surface, while systemic mediator effects can influence airway caliber and vascular function. Anaphylaxis is a serious systemic reaction requiring prompt emergency care; the lesson's emphasis is the physiological chain, not an individualized action or dosing plan. Other hypersensitivity mechanisms involve antibody-mediated cellular injury, immune complexes, or T-cell-mediated responses. Do not label every rash or delayed reaction as the same immediate IgE mechanism.",
          ],
        },
        {
          heading: 'Reason from tissue to function in comparative cases',
          body: [
            'For demyelination, predict slower or disrupted signal transmission and then relate the deficit to the affected neural pathway. For synovial inflammation, predict swelling, stiffness, and progressive joint damage through local tissue effects. For systemic mast-cell mediator release, connect vasodilation and altered permeability to circulatory effects and airway smooth-muscle changes to breathing difficulty. A symptom shared by multiple mechanisms, such as weakness, is not enough to identify one cause. Compare the temporal pattern, tissue involved, and supplied evidence before selecting the strongest explanation.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Molecular mimicry',
          definition: 'Microbial-self similarity triggering autoimmunity.',
        },
        {
          term: 'Dawson fingers',
          definition: 'Perpendicular MS plaques around ventricles.',
        },
        {
          term: 'Anti-CCP',
          definition: 'Specific RA antibody against citrullinated peptides.',
        },
        {
          term: 'Biphasic reaction',
          definition: 'Anaphylaxis recurrence hours after improvement.',
        },
        {
          term: 'Treat-to-target',
          definition: 'Escalation strategy to remission scores.',
        },
        {
          term: 'Uhthoff phenomenon',
          definition: 'Heat-worsened MS neurologic symptoms.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Identify the immune mechanism',
        instructions:
          'Inspect timing, trigger, and affected functions in a fictional educational case.',
        observations: [
          {
            label: 'Timing',
            result: 'Effects develop rapidly after re-exposure.',
          },
          {
            label: 'Trigger',
            result: 'The trigger is an external antigen encountered previously.',
          },
          {
            label: 'Mechanism',
            result: 'Mast-cell mediators alter vascular permeability and airway smooth muscle.',
          },
        ],
        question: 'Which mechanism is most consistent?',
        options: [
          'Immediate allergic effector activation',
          'Slow central demyelination',
          'Selective lactase deficiency',
        ],
        correct: 0,
        explanation:
          'The timing and mediator pathway support immediate allergic activation. Demyelination and lactase deficiency involve different targets and processes.',
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
          options: [
            'RA >1 hr symmetric small joints; OA brief weight-bearing',
            'Both identical',
            'OA longer',
            'No stiffness either',
          ],
          answer: 'RA >1 hr symmetric small joints; OA brief weight-bearing',
          explanation: 'Duration and distribution separate them.',
        },
        {
          id: 'anat-u9-l2-q5',
          prompt: 'Which process directly helps explain circulatory effects in systemic allergy?',
          type: 'mcq',
          answer: 'Mediator-driven vasodilation and increased permeability',
          explanation: 'These effects can reduce effective circulating volume and pressure.',
          options: [
            'New myelin synthesis',
            'Mediator-driven vasodilation and increased permeability',
            'Lactase hydrolysis',
            'Increased bone mineral deposition',
          ],
        },
        {
          id: 'anat-u9-l2-q6',
          prompt: 'Trace central demyelination to a physiological deficit.',
          type: 'short',
          answer:
            'Loss or disruption of myelin impairs effective conduction along affected central neural pathways, producing deficits determined by location.',
          explanation: 'The anatomical pathway explains which function is affected.',
          points: 3,
        },
        {
          id: 'anat-u9-l2-q7',
          prompt: 'How does autoimmunity differ from immunodeficiency?',
          type: 'short',
          answer:
            'Autoimmunity is harmful self-directed immune activity; immunodeficiency is inadequate protective immune function.',
          explanation:
            'Excess in one pathway and deficiency in another can coexist, so these are mechanistic categories rather than mutually exclusive labels for people.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Compare three immune case mechanisms',
        problem:
          'Case A describes central myelin injury. Case B describes destructive synovial inflammation. Case C describes rapid systemic effects after re-exposure to an external antigen.',
        steps: [
          'A maps to impaired conduction in central neural pathways through demyelinating injury.',
          'B maps to an inflammatory joint process with potential cartilage and bone damage.',
          'C maps to rapid mediator-driven effects after sensitization, rather than slow loss of myelin or antibody deficiency.',
          'Explain why the category changes: A and B involve self-directed injury in the supplied cases, while C involves an external trigger and immediate effector activation.',
        ],
        conclusion:
          'The target and timing help distinguish mechanisms that would otherwise all be described vaguely as immune problems.',
      },
    },
    {
      id: 'anat-u10-l1',
      unitId: 'anat-u10',
      title: 'Case Reasoning: Vitals, ABGs, and Imaging',
      durationMin: 35,
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
        {
          heading: 'Use a fixed case-analysis sequence',
          body: [
            'Begin by listing only what is actually supplied: measured values with units, symptoms with timing, image descriptions, and relevant history. Next, identify the system and process each observation measures. A breathing rate describes frequency, not alveolar ventilation by itself; a saturation value describes occupancy, not total oxygen content; a chest opacity describes an imaging density pattern, not a specific organism. Then connect observations through a mechanism and compare at least one plausible alternative. This sequence prevents a familiar keyword from forcing every later observation into one premature diagnosis.',
            'For an acid-base teaching case, inspect pH first, then carbon dioxide and bicarbonate. Identify which direction of change explains the pH and whether another change may represent compensation or a second process. A normal-looking pH does not imply both other quantities are normal. If the question supplies a reference interval, use that interval rather than recalling an unrelated threshold. Include units consistently: arterial gas pressure, blood concentration, and breathing frequency are not interchangeable quantities even when they appear in the same table.',
          ],
        },
        {
          heading: 'Read images from orientation to mechanism',
          body: [
            "Before interpreting a chest image, check the stated projection, patient side labels, and image quality. On a standard frontal display, the patient's right usually appears on the viewer's left, but labels take priority. Look for rotation, degree of inspiration, and obscured regions before identifying abnormalities. A simple comparison routine is to inspect airway position, lungs and pleura, heart borders, diaphragms, and visible bones. This routine supports completeness; it does not transform an unlabeled low-quality image into diagnostic certainty.",
            'When the lesson supplies a schematic description rather than an actual medical image, treat it as a constrained teaching case. An opacity next to a particular border may help localize the process, while an air-fluid interface or pleural line suggests a different compartment. Distinguish observation from interpretation in the written response: describe what is visible first, then state what mechanism it supports. The same principle applies to an intestinal diagram or lymph-node section. Geometry and contrast provide evidence, but the final interpretation depends on context.',
          ],
        },
        {
          heading: 'Separate confidence from completeness',
          body: [
            'A concise response can be confident about an equation yet appropriately limited about a diagnosis. For example, the calculation of alveolar ventilation from given inputs may be exact within the model, while the reason for low ventilation remains uncertain. State which additional observation would discriminate alternatives. This is stronger than listing every possible disorder without ranking them. Use a four-line format: observation, mechanism, calculation or anatomical link, and limitation. In a timed competition, the structure keeps reasoning visible while reducing unnecessary narrative.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'A-a gradient',
          definition: 'Alveolar-arterial O2 gap marking shunt/V-Q disease.',
        },
        {
          term: 'Winter formula',
          definition: 'Expected PaCO2 in metabolic acidosis compensation.',
        },
        {
          term: 'Silhouette sign',
          definition: 'Loss of border where consolidation touches structure.',
        },
        {
          term: 'Murphy sign',
          definition: 'Inspiratory arrest on gallbladder palpation.',
        },
        {
          term: 'EtCO2',
          definition: 'End-tidal CO2 reflecting ventilation and perfusion.',
        },
        {
          term: 'Ground glass',
          definition: 'Hazy opacity preserving bronchial markings.',
        },
      ],
      simulation: {
        kind: 'model',
        model: 'ventilation',
        title: 'Case physiology workbench',
        instructions:
          'Recreate the case inputs and separate total airflow from effective fresh-air delivery.',
        challenge: 'Increase tidal volume from 250 to 500 mL while keeping rate 20/min.',
        takeaway: 'Rate alone cannot explain the ventilation delivered to exchange regions.',
      },
      practice: [
        {
          id: 'anat-u10-l1-q1',
          prompt: 'pH 7.30 with PaCO2 55 indicates:',
          type: 'mcq',
          options: [
            'Metabolic alkalosis',
            'Respiratory acidosis',
            'Respiratory alkalosis',
            'Normal',
          ],
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
        {
          id: 'anat-u10-l1-q6',
          prompt: 'Why can a near-normal pH hide a significant acid-base disturbance?',
          type: 'short',
          answer:
            'Opposing changes in CO₂ and bicarbonate can bring the ratio and pH toward normal despite abnormal underlying quantities.',
          explanation: 'Always inspect the full set of supplied values.',
          points: 3,
        },
        {
          id: 'anat-u10-l1-q7',
          prompt:
            'Give one observation and one interpretation for a chest image with a focal opacity.',
          type: 'short',
          answer:
            'Observation: a localized denser region is visible. Interpretation: reduced air content or increased material in that region may explain it, with location and context narrowing causes.',
          explanation:
            'Do not substitute a specific pathogen name for a direct description of the image.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Interpret a mixed respiratory dataset',
        problem:
          'A teaching case supplies pH 7.30, elevated PaCO₂, and bicarbonate slightly above its reference. A separate table supplies tidal volume 250 mL, rate 20/min, and dead space 150 mL.',
        steps: [
          'The pH indicates acidemia in the stated teaching range. Elevated CO₂ provides a respiratory mechanism that explains that direction.',
          'Slightly elevated bicarbonate may reflect compensation or another contribution; duration and the complete dataset matter.',
          'Alveolar ventilation from the supplied model is (250 − 150) × 20 = 2000 mL/min = 2.0 L/min.',
          'The calculation supports inefficient fresh-air delivery despite a rate of 20/min. It does not identify the cause without further case evidence.',
        ],
        conclusion:
          'A high breathing frequency can coexist with low alveolar ventilation when breaths are shallow.',
      },
      extension: true,
    },
    {
      id: 'anat-u10-l2',
      unitId: 'anat-u10',
      title: 'Competition Strategy and Study System',
      durationMin: 35,
      kind: 'text',
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
            'Use the current event rules to determine permitted notes, equipment, and competition scope. This course follows the supplied respiratory, digestive, and immune syllabus; its coverage is not a claim about every tournament year.',
            'Organize allowed study materials around structures, pathways, equations, and comparisons. Practice locating information quickly and solving questions without assuming that every reference resource will be permitted at the event.',
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
          heading: 'Final-week preparation and transfer practice',
          body: [
            'Combine a timed mixed set with a slower explanation-focused set. Redraw pathways from memory, check them, and revisit weak connections. Use the worked examples and interactive labs to test whether an equation or mechanism transfers to a new input.',
            'Prepare the resources permitted by the actual event instructions and rehearse a consistent question-checking routine. End each study session with a specific next action based on observed errors rather than an undirected plan to reread everything.',
          ],
        },
        {
          heading: 'Build a retrieval system around relationships',
          body: [
            "Organize notes around questions you need to answer, not only alphabetical lists. For respiratory physiology, keep volumes, capacities, pressure relationships, gas transport, and obstruction-versus-restriction comparisons near each other. For digestion, link organ, secretion, substrate, product, and absorption route. For immunity, link source organ, cell type, recognition pathway, effector output, and failure pattern. A single relational table can prevent several confusions that isolated flashcards leave unresolved. The supplied syllabus determines this course's topic sequence; your tournament's current rules determine permitted resources and exact competition scope.",
            'Retrieval practice means producing an answer before looking it up. Draw a pathway from memory, compare it with a reference, mark missing links, and redraw later. Merely rereading the correct diagram creates familiarity without showing whether you can reconstruct it. Space revisits across days and mix related problem types once the foundations are secure. Interleaving a ventilation calculation with an oxygen-content problem forces you to identify which equation applies instead of repeating one procedure automatically.',
          ],
        },
        {
          heading: 'Turn mistakes into specific training decisions',
          body: [
            'An error log should record the prompt type, the mistaken decision, the underlying reason, and a targeted next action. If you subtracted dead space after multiplying by rate, the issue is equation structure. If you identified a tissue correctly but reversed patient right and left, the issue is orientation. If your immune answer names the correct cell but not its action, the issue is causal explanation. These need different practice. Writing study more beside each error does not specify how to improve.',
            'Review incorrect answers and correct guesses alike. A correct choice reached by an invalid argument is unstable knowledge. Conversely, a wrong numerical answer with a correct model but a unit-conversion slip requires a smaller repair than a completely wrong mechanism. In written practice, compare your answer against the model for three features: the key relationship, the causal chain, and any needed units or limits. The practice interface treats those responses as self-reviewed because a few matching keywords cannot reliably establish scientific understanding.',
          ],
        },
        {
          heading: 'Rehearse a complete timed workflow',
          body: [
            'In a mock session, survey the available stations or questions, divide time according to point value and difficulty, and reserve a final checking interval. Mark uncertainties visibly and return when permitted. For each calculation, write the formula before substitution and check whether the result is physiologically plausible within the hypothetical case. For identification, anchor orientation and structure before naming function. For a comparison, give one similarity and the decisive difference. After the session, use the error log to choose the next focused lesson instead of repeating the entire course indiscriminately.',
            'Measure progress with evidence of transfer: can you solve a new case using the same relationship? Completing a lesson is a useful study milestone, but it is not a guarantee of mastery. A written model answer is a comparison tool rather than text to copy mechanically. The strongest preparation combines accurate retrieval, mechanistic explanation, numerical discipline, and the ability to state what a limited dataset does not establish.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Index tabbing',
          definition: 'Labeled binder tabs for station-speed lookup.',
        },
        {
          term: 'Second pass',
          definition: 'Return strategy for flagged calculations/cases.',
        },
        {
          term: 'Error log',
          definition: 'Personal list of repeat misreads to review.',
        },
        {
          term: 'Allowed sheet',
          definition: 'Rules-limited notes; verify current year limits.',
        },
        {
          term: 'Retrieval practice',
          definition: 'Producing an answer or diagram from memory before checking the reference.',
        },
        {
          term: 'Teach-back',
          definition: 'Explaining aloud to expose gaps.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Choose the next study action',
        instructions:
          'Inspect a fictional error log and select the practice that addresses its cause.',
        observations: [
          {
            label: 'Attempt one',
            result: 'Correct anatomical labels, but patient right and left are reversed.',
          },
          {
            label: 'Attempt two',
            result: 'The same labels are reversed on a new anterior-view diagram.',
          },
          {
            label: 'Recall check',
            result: 'The student correctly explains each organ’s function without the image.',
          },
        ],
        question: 'Which next action best targets the gap?',
        options: [
          'Practice orientation on varied labeled and unlabeled views',
          'Memorize more organ-function definitions',
          'Repeat only ventilation arithmetic',
        ],
        correct: 0,
        explanation:
          'The repeated error is spatial orientation, so varied viewpoint practice directly targets it. More unrelated recall does not address the cause.',
      },
      practice: [
        {
          id: 'anat-u10-l2-q1',
          prompt: 'Best first pass strategy for stations:',
          type: 'mcq',
          options: [
            'Answer in order only',
            'Skim, answer confident, flag rest',
            'Skip diagrams',
            'No watch',
          ],
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
          answer:
            'Shunt: perfusion without ventilation; dead space: ventilation without perfusion.',
          explanation: 'Oxygen helps dead space/V-Q more than true shunt.',
        },
        {
          id: 'anat-u10-l2-q6',
          prompt: 'Why should a correct guess still enter an error log?',
          type: 'short',
          answer:
            'The outcome may be correct without reliable reasoning; reviewing the mechanism improves transfer to a new question.',
          explanation: 'Accuracy and the quality of the reasoning process are separate evidence.',
          points: 3,
        },
        {
          id: 'anat-u10-l2-q7',
          prompt:
            'Repair the formula 500 × 12 − 150 for alveolar ventilation and explain the repair.',
          type: 'short',
          answer:
            '(500 − 150) × 12, because dead-space volume must be removed from each breath, not once from the entire minute.',
          explanation: 'The correct output is 4200 mL/min or 4.2 L/min.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Repair a recurring calculation error',
        problem:
          'A student repeatedly reports 5.85 L/min alveolar ventilation for tidal volume 500 mL, rate 12/min, and dead space 150 mL.',
        steps: [
          'Reconstruct the mistake: 500 × 12 − 150 = 5850 mL/min subtracts dead space only once per minute.',
          'Identify the conceptual repair: dead space is paid per breath, so subtract before multiplying or subtract 150 × 12.',
          'Correct result: (500 − 150) × 12 = 4200 mL/min = 4.2 L/min.',
          'Choose a transfer problem with a different breathing rate. If the student can explain why the dead-space loss changes, the repair extends beyond memorizing this answer.',
        ],
        conclusion: 'Effective review identifies and fixes the decision that produced the error.',
      },
      extension: true,
    },
  ],
  division: 'C',
  syllabus: '2026 SciConnect Anatomy & Physiology B/C syllabus',
  references: [
    {
      title: 'NHLBI: How the lungs work',
      url: 'https://www.nhlbi.nih.gov/health/lungs',
    },
    {
      title: 'OpenStax: Digestive processes and regulation',
      url: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/23-2-digestive-system-processes-and-regulation',
    },
    {
      title: 'NIDDK: Lactose intolerance mechanisms',
      url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/lactose-intolerance/symptoms-causes',
    },
  ],
};
