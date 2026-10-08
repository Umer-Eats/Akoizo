import type { EventLessons } from './lessons';

export const forensicsLessons: EventLessons = {
  eventId: 'forensics',
  eventName: 'Forensics',
  intro:
    'Division C Forensics: qualitative analysis, polymers, chromatography and spectrometry, and physical evidence. Learn competition lab technique, observation discipline, and written analysis for powders, plastics, fibers, hair, fingerprints, DNA, blood, glass, ballistics, entomology, and soil.',
  units: [
    {
      id: 'for-u1',
      title: 'Unit 1: Intro to Forensics',
      description:
        'Forensic science method, Locard exchange, evidence classes, crime scene protocol, and lab documentation for Division C competition.',
      lessonIds: ['for-u1-l1', 'for-u1-l2'],
    },
    {
      id: 'for-u2',
      title: 'Unit 2: Qualitative Analysis',
      description:
        'Systematic powder and solution ID: solubility, pH, precipitation with NaOH and HCl, Benedict and flame tests.',
      lessonIds: ['for-u2-l1', 'for-u2-l2'],
    },
    {
      id: 'for-u3',
      title: 'Unit 3: Polymers Part 1 - Plastics',
      description:
        'Polymer chemistry, recycling codes, and bench ID of plastics by density, flame, and chemical spot tests.',
      lessonIds: ['for-u3-l1', 'for-u3-l2'],
    },
    {
      id: 'for-u4',
      title: 'Unit 4: Polymers Part 2 - Fibers and Hair',
      description:
        'Fiber classification, microscopy, burn tests, and hair morphology for association and elimination.',
      lessonIds: ['for-u4-l1', 'for-u4-l2'],
    },
    {
      id: 'for-u5',
      title: 'Unit 5: Chromatography and Spectrometry',
      description:
        'Paper and thin-layer chromatography, Rf calculations, mass spectrometry fragments, and spectroscopy interpretation.',
      lessonIds: ['for-u5-l1', 'for-u5-l2'],
    },
    {
      id: 'for-u6',
      title: 'Unit 6: Physical Evidence Part 1 - Fingerprints',
      description:
        'Skin anatomy, friction ridges, fingerprint patterns, comparison quality, and surface-appropriate development.',
      lessonIds: ['for-u6-l1', 'for-u6-l2', 'for-u6-l3'],
    },
    {
      id: 'for-u7',
      title: 'Unit 7: Physical Evidence Part 2 - DNA and Blood',
      description:
        'DNA structure and STR profiling, ABO genetics, presumptive blood tests, and bloodstain pattern analysis.',
      lessonIds: ['for-u7-l1', 'for-u7-l2'],
    },
    {
      id: 'for-u8',
      title: 'Unit 8: Physical Evidence Part 3 - Materials and Environment',
      description:
        'Glass and toolmark comparisons, insect development, pollen and seeds, tracks, and soil associations.',
      lessonIds: ['for-u8-l1', 'for-u8-l2', 'for-u8-l3'],
    },
    {
      id: 'for-u9',
      title: 'Unit 9: Analysis and Writing',
      description:
        'Competition written analysis: data tables, error discussion, claim-evidence-reasoning, and time management.',
      lessonIds: ['for-u9-l1', 'for-u9-l2'],
    },
  ],
  lessons: [
    {
      id: 'for-u1-l1',
      unitId: 'for-u1',
      title: 'Forensic Method and Locard Exchange',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Explain Locard exchange principle and class vs individual evidence with competition examples',
        'Distinguish presumptive vs confirmatory tests and direct vs circumstantial evidence',
        'Apply crime scene search patterns and chain of custody rules to a scenario',
        'Identify Division C Forensics event format, scoring, and allowed resources',
      ],
      sections: [
        {
          heading: 'What Forensics Tests in Division C',
          body: [
            'Science Olympiad Division C Forensics gives teams a crime scenario plus physical samples such as white powders, plastics, fibers, hair, fingerprints, chromatography strips, and mass spectra. Teams rotate through stations, perform observations and spot tests, record data in tables, and write an analysis connecting evidence to suspects. Speed, clean technique, and precise vocabulary matter as much as content knowledge.',
            'The event rewards systematic comparison: known vs questioned samples. You rarely prove a suspect guilty from one test. You build association or elimination across many independent lines of evidence. Learn to state conclusions with correct uncertainty, for example consistent with rather than identical to, unless a confirmatory test supports it.',
          ],
        },
        {
          heading: 'Locard Exchange Principle',
          body: [
            'Locard exchange states every contact leaves a trace: fibers transfer to seats, soil to shoes, oils to touched glass. In competition this means tiny samples are significant and cross-transfer is expected. A fiber matching a suspect sweater does not alone prove presence, but combined with powder, fingerprint, and chromatography matches it builds weight.',
            'The principle also explains contamination risk. Investigators wear gloves, use clean tools, and package items separately because exchange works both ways. In the lab, wipe spatulas, use fresh well plates, and never return sample to stock bottles. Judges deduct for sloppy technique and mixed samples.',
          ],
        },
        {
          heading: 'Class vs Individual Evidence',
          body: [
            'Class characteristics identify a group of possible sources, such as a polymer class, fiber type, or ABO phenotype. More detailed comparisons can provide stronger source evidence, but the degree of support depends on the method, data quality, and relevant alternatives.',
            'No universal minutiae count or generic DNA profile frequency establishes certainty for every case. Separate the observed agreement from the statistical or comparative evaluation, and separate a possible material source from responsibility for the incident.',
          ],
        },
        {
          heading: 'Presumptive vs Confirmatory Tests',
          body: [
            'Presumptive tests screen quickly but have false positives. Phenolphthalein and luminol suggest blood but also react with bleach, rust, or plant peroxidases. Cobalt thiocyanate suggests cocaine but reacts with other amines. Use them to narrow options, then confirm with a specific method.',
            'Confirmatory tests identify a substance specifically, such as mass spectrometry fragmentation, DNA sequencing, or crystal tests. In qualitative powder schemes, no single color test is fully confirmatory. Combine pH, solubility, precipitation with NaOH and HCl, flame color, and Benedict result to converge on one candidate.',
          ],
        },
        {
          heading: 'Search Patterns and Chain of Custody',
          body: [
            'Standard search patterns are spiral, grid, strip or line, and zone or quadrant. Outdoor scenes often use grid or strip for thorough coverage, small rooms use zone. Document first with overall, medium, and close-up photos with a scale, then sketch with measurements, then collect. Never move evidence before documentation in a real scene.',
            'Chain of custody is the written log of who collected, packaged, transported, and analyzed each item. Every transfer is signed and dated with sealed packaging. In competition, mimic this by labeling every observation with sample code, recording reagent lot logic, and keeping a clean data table so your written analysis can trace each claim to data.',
          ],
        },
        {
          heading: 'Separate material identity, source, activity, and responsibility',
          body: [
            'Four different questions often become mixed together in a forensic story. What is this material? Could it have come from this object or person? How and when was it deposited? What does that imply about the event under investigation? Identifying a fiber as polyester answers a material question. Finding similar fibers on a garment addresses a possible source. Demonstrating contact during a specified event requires transfer, persistence, and background context. Responsibility for an event cannot be inferred automatically from any one of these lower-level findings.',
            'The strength of an observation depends on competing explanations. Common blue cotton fibers may be expected under many ordinary contacts. A more discriminating combination can be less common, but several similarities are not automatically independent. Color and dye chemistry, for example, may arise from the same manufacturing process. Avoid counting related observations as though each independently multiplies the evidence. A comparison should explain both why a finding fits the proposed source and why it might also fit alternatives. This is the foundation of evidence evaluation, not merely cautious wording at the end.',
          ],
        },
        {
          heading: 'Distinguish a reliable exclusion from an uninformative result',
          body: [
            'An exclusion requires a meaningful incompatibility under valid measurement conditions. Failure to see a faint feature in a poor-quality image may be inconclusive rather than exclusionary. A negative reagent result is useful only if the positive control shows that the reagent and procedure worked. Likewise, a trace absent from a small sampled area does not establish that it was absent everywhere. Write unavailable, not observed, and excluded as different entries in your table.',
            'Chain of custody preserves traceability but does not prove a scientific conclusion. A perfectly documented sample can still be measured incorrectly, while an undocumented transfer undermines confidence in which sample was tested. Both integrity and analytical validity are necessary. In the interactive case, open the observations before choosing a conclusion. Resist choosing the suspect whose name is most familiar. The aim is to identify the narrowest conclusion supported by all supplied evidence and to name the missing information that would change it.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Locard exchange',
          definition:
            'Every contact leaves a trace; basis for transfer evidence such as fibers, soil, and prints.',
        },
        {
          term: 'Class evidence',
          definition:
            'Material identifying a group source, such as cotton or PETE; includes or excludes but does not individualize.',
        },
        {
          term: 'Individual evidence',
          definition:
            'High-specificity match such as STR DNA or fingerprint minutiae that can approach unique identification.',
        },
        {
          term: 'Presumptive test',
          definition:
            'Fast screening test with possible false positives, such as luminol for blood.',
        },
        {
          term: 'Confirmatory test',
          definition: 'Specific identification method such as mass spectrometry or DNA profiling.',
        },
        {
          term: 'Chain of custody',
          definition:
            'Documented sequence of collection, packaging, transfer, and analysis preserving evidence integrity.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Trace-evidence case file',
        instructions: 'Reveal the material, comparison, and timing evidence before making a claim.',
        observations: [
          {
            label: 'Material',
            result: 'A common blue polyester fiber is recovered.',
          },
          {
            label: 'Comparison',
            result:
              'Several garments in the reference set share the same observed color and polymer class.',
          },
          {
            label: 'Context',
            result: 'One matching garment was in the room before the incident during ordinary use.',
          },
        ],
        question: 'Which conclusion is supported?',
        options: [
          'The fiber is consistent with a class of possible sources',
          'The wearer is proven responsible',
          'The fiber cannot have transferred earlier',
        ],
        correct: 0,
        explanation:
          'A class association is supported. The comparison is not unique, and the activity timing remains unresolved.',
      },
      practice: [
        {
          id: 'for-u1-l1-q1',
          prompt: 'Which statement best expresses Locard exchange?',
          type: 'mcq',
          options: [
            'Every contact leaves a trace',
            'Fingerprints are unique',
            'DNA proves guilt alone',
            'Confirmatory tests never err',
          ],
          answer: 'Every contact leaves a trace',
          explanation:
            'Locard exchange is the basis for transfer evidence and contamination control.',
          points: 2,
        },
        {
          id: 'for-u1-l1-q2',
          prompt: 'A PETE fragment is class or individual evidence, and why?',
          type: 'short',
          answer:
            'Class, because PETE identifies a manufacturing group shared by many items and cannot alone individualize.',
          explanation:
            'Class evidence narrows groups. Individualization needs high-specificity features plus statistics.',
          points: 3,
        },
        {
          id: 'for-u1-l1-q3',
          prompt: 'Luminol glows on a stain later shown to be bleach. This shows luminol is:',
          type: 'mcq',
          options: [
            'Confirmatory for blood',
            'Presumptive with false positives',
            'Useless in forensics',
            'A DNA test',
          ],
          answer: 'Presumptive with false positives',
          explanation:
            'Luminol is sensitive but reacts with oxidants and peroxidases, so positives need confirmation.',
          points: 2,
        },
        {
          id: 'for-u1-l1-q4',
          prompt: 'Name two required chain-of-custody entries for each transfer.',
          type: 'short',
          answer:
            'Collector and receiver identities with signatures, plus date, time, description, and package condition.',
          explanation:
            'Complete logs let a court trace every handler and detect tampering or gaps.',
          points: 3,
        },
        {
          id: 'for-u1-l1-q5',
          prompt: 'Which search pattern is most systematic for a large flat field?',
          type: 'mcq',
          options: ['Spiral', 'Grid', 'Point-to-point', 'No pattern'],
          answer: 'Grid',
          explanation:
            'Grid covers large areas twice from perpendicular directions and reduces misses.',
          points: 2,
        },
        {
          id: 'for-u1-l1-q6',
          prompt: 'Why are source-level and activity-level conclusions different?',
          type: 'short',
          answer:
            'A sample may originate from a source without being deposited by that source during the event in question; transfer, persistence, and timing matter.',
          explanation: 'A material association does not automatically reconstruct an activity.',
          points: 3,
        },
        {
          id: 'for-u1-l1-q7',
          prompt: 'When is a negative test inconclusive rather than exclusionary?',
          type: 'short',
          answer:
            'When controls fail, sensitivity is inadequate, sample quality is poor, or the tested portion is not informative enough.',
          explanation: 'A lack of detected signal must be interpreted in light of the method.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Evaluate a transferred fiber',
        problem:
          'A blue polyester fiber on a chair resembles fibers from a suspect’s common jacket. The jacket was present in the room during an unrelated earlier meeting.',
        steps: [
          'Material-level result: the questioned fiber is consistent with the observed polyester class and color.',
          'Source-level limit: many garments may share those characteristics, so the jacket is not uniquely identified.',
          'Activity-level alternative: earlier innocent contact could explain transfer or persistence.',
          'Conclusion: the observation may support a possible association, but it does not establish contact during the incident or responsibility for it.',
        ],
        conclusion:
          'Strong forensic writing states what the observation measures and avoids skipping levels of inference.',
      },
    },
    {
      id: 'for-u1-l2',
      unitId: 'for-u1',
      title: 'Lab Safety, QA, and Documentation',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'List PPE, reagent hazards, and safe handling for HCl, NaOH, Benedict, and flame tests',
        'Build a competition data table with units, controls, and repeat observations',
        'Describe blanks, knowns, and replicates as quality control',
        'Avoid contamination and false positives through clean technique',
      ],
      sections: [
        {
          heading: 'Safety for Forensics Stations',
          body: [
            'Know the hazards and the permitted procedure before physical laboratory work. Protective eyewear, appropriate clothing, trained supervision, and the actual laboratory instructions determine how materials are handled. Do not taste, directly smell, or mix unknowns without an approved procedure.',
            'This course uses virtual samples and recorded observations. Practice sample labeling, separate aliquots, control selection, and result interpretation here. Physical spill response, chemical disposal, and heated procedures follow the specific supervised laboratory protocol rather than a generic online recipe.',
          ],
        },
        {
          heading: 'Controls, Blanks, and Knowns',
          body: [
            'Run a known standard alongside every questioned sample when possible. If testing unknown powder solubility, test table salt and baking soda in parallel. A reagent blank, such as distilled water plus reagent, shows background color so you do not mistake reagent tint for a positive.',
            'Replicate key observations. Two consistent pH strips beat one hurried dip. In competition, if time allows, repeat flame color and precipitation settling after two minutes. Record both trials rather than overwriting.',
          ],
        },
        {
          heading: 'Data Tables That Score',
          body: [
            'Headers should name sample, test, reagent concentration, observation with units, and result. Use precise verbs: dissolved, effervesced, formed white precipitate, turned brick-red precipitate. Avoid vague words like reacted or changed. Include negative results because elimination is evidence.',
            'Record colors against white paper in good light and note timing. Silver chloride darkens in light, Benedict needs sustained heat, and iodine fingerprints fade. Timing notes protect you when judges ask whether a color was immediate or developed.',
          ],
        },
        {
          heading: 'Contamination Control',
          body: [
            'Use a fresh spatula or toothpick per sample, clean well plates between reagents, and cap bottles immediately. Powders drift easily. Open one vial at a time and keep unknowns upwind of reagents. Cross-transfer is the fastest way to fail qualitative analysis.',
            'For fibers, hair, and prints, use forceps and paper folds rather than plastic bags that build static. Do not process suspect and victim items on the same sheet. Change gloves between handling different sources.',
          ],
        },
        {
          heading: 'Measurement Discipline',
          body: [
            'Estimate consistently: a few grains for spot tests, one drop of indicator, 1 to 2 mL for solubility. Too much powder overwhelms reagents and masks colors. Practice micro-scale technique before competition so color changes stay visible.',
            'Calibrate language for size and quantity: length in millimeters, precipitate as trace, slight, or heavy, flame as persistent vs fleeting. Judges compare wording across teams, so quantitative detail wins ties.',
          ],
        },
        {
          heading: 'Make controls answer explicit questions',
          body: [
            "A positive control asks whether the method can detect the expected response under the current conditions. A negative control asks whether a sample without the target remains negative. A reagent blank helps reveal contamination introduced by reagents or handling. These controls are related but not interchangeable. If a positive control fails, a negative unknown cannot be interpreted as evidence that the target is absent. If the blank reacts, the unknown's positive result may include contamination. Record the actual control observation rather than simply writing controls passed.",
            'Use fresh aliquots for different tests so one reagent does not create the next result. Label the original sample and each derived portion clearly. A small amount preserved without treatment can be valuable if the first result needs checking. The virtual activities supply observations without requiring chemicals or equipment; their purpose is to rehearse the decision logic and documentation. Physical laboratory work depends on the allowed materials, trained supervision, and the actual safety instructions for that setting.',
          ],
        },
        {
          heading: 'Control bias and preserve an audit trail',
          body: [
            'Record observations before opening a reference answer or deciding which suspect seems plausible. Expectation can change how a faint color or ambiguous pattern is perceived. In a comparison task, a blind or coded reference can reduce irrelevant contextual influence. This does not make judgment infallible; it reduces one source of preventable bias. Separate raw observation from interpretation in adjacent columns so a later reviewer can understand how the conclusion was reached.',
            'Every numerical entry needs a unit, a measurement reference, and realistic precision. A distance of 3.0 cm from a pencil baseline is different from 3.0 cm from the paper edge. A balance reading with hundredth-gram resolution does not justify reporting six decimal places. Corrections should preserve the original record and the reason for the change. In a team, designate who records each result and who checks sample identity at handoff. An extra calculation cannot rescue a dataset whose labels were swapped.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Reagent blank',
          definition: 'Control with solvent plus reagent and no sample to reveal background color.',
        },
        {
          term: 'Known standard',
          definition: 'Reference material tested in parallel to validate reagent and technique.',
        },
        {
          term: 'Replicate',
          definition: 'Repeat measurement showing consistency and reducing random error.',
        },
        {
          term: 'PPE',
          definition:
            'Personal protective equipment: goggles, gloves, apron for chemical stations.',
        },
        {
          term: 'Cross-contamination',
          definition: 'Unwanted transfer between samples or reagents causing false results.',
        },
        {
          term: 'Waste protocol',
          definition: 'Labeled disposal stream for chemicals; never assume sink disposal.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Quality-control troubleshooting bench',
        instructions: 'Inspect the run before deciding whether its unknown result is usable.',
        observations: [
          {
            label: 'Positive control',
            result: 'The known target gives the expected response.',
          },
          {
            label: 'Reagent blank',
            result: 'The blank also gives a strong response that should not occur.',
          },
          {
            label: 'Unknown',
            result: 'The unknown produces the same response.',
          },
        ],
        question: 'What should happen next?',
        options: [
          'Investigate contamination and repeat with valid controls',
          'Accept the unknown because the positive control worked',
          'Average the blank and unknown colors',
        ],
        correct: 0,
        explanation:
          'A reacting blank compromises interpretation even when the positive control works. Resolve the source of the background response.',
      },
      practice: [
        {
          id: 'for-u1-l2-q1',
          prompt: 'Why run a distilled-water blank with Benedict reagent?',
          type: 'short',
          answer:
            'To show the reagent background blue color so a negative is not mistaken for a weak positive.',
          explanation:
            'Blanks separate reagent color from sample reaction and validate heating time.',
          points: 3,
        },
        {
          id: 'for-u1-l2-q2',
          prompt: 'Which practice prevents powder cross-contamination?',
          type: 'mcq',
          options: [
            'Same spatula for speed',
            'Fresh tool per vial, one vial open at a time',
            'Pour excess back into stock',
            'Fan the bench to clear dust',
          ],
          answer: 'Fresh tool per vial, one vial open at a time',
          explanation:
            'Separate tools and sequential handling prevent transfer and stock contamination.',
          points: 2,
        },
        {
          id: 'for-u1-l2-q3',
          prompt: 'Dilute NaOH contacts skin. Correct immediate action?',
          type: 'mcq',
          options: [
            'Neutralize with HCl',
            'Flush with water and alert supervisor',
            'Wipe and continue',
            'Apply flame',
          ],
          answer: 'Flush with water and alert supervisor',
          explanation:
            'Flood with water first. Never neutralize corrosives on skin with opposite reagent.',
          points: 2,
        },
        {
          id: 'for-u1-l2-q4',
          prompt: 'Rewrite vague note into scoring language: powder reacted with HCl.',
          type: 'short',
          answer:
            'Example: 0.1 g powder plus 2 mL 1M HCl produced vigorous effervescence and dissolved clear within 30 s.',
          explanation:
            'Quantities, observations, and timing convert reacted into interpretable evidence.',
          points: 3,
        },
        {
          id: 'for-u1-l2-q5',
          prompt: 'Why test a known alongside an unknown powder?',
          type: 'mcq',
          options: [
            'To waste time',
            'To validate reagents and compare colors directly',
            'To contaminate the unknown',
            'To skip blanks',
          ],
          answer: 'To validate reagents and compare colors directly',
          explanation:
            'Knowns confirm reagents work and anchor color judgments under the same lighting.',
          points: 2,
        },
        {
          id: 'for-u1-l2-q6',
          prompt: 'What does a positive control test that a reagent blank does not?',
          type: 'short',
          answer:
            'It demonstrates that the method can detect the expected target response under current conditions.',
          explanation: 'A clean blank cannot show that a reagent is capable of reacting.',
          points: 3,
        },
        {
          id: 'for-u1-l2-q7',
          prompt: 'Why keep raw observations separate from interpretations?',
          type: 'short',
          answer:
            'It preserves an audit trail and allows another person to reassess the conclusion without losing what was actually seen.',
          explanation: 'Recording only a candidate name hides the evidence behind the decision.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Respond to a failed blank',
        problem:
          'A reagent blank and an unknown both turn yellow. The expected negative blank should remain clear.',
        steps: [
          'The blank has failed, indicating contamination or an unintended reaction somewhere in the procedure.',
          'Do not label the unknown positive based only on this run. The same background response could explain it.',
          'Preserve the record, identify the reagent or handling issue, and repeat with fresh materials and valid controls when appropriate in the simulated workflow.',
          'Only after valid control behavior should the unknown result be interpreted.',
        ],
        conclusion:
          'Invalidating a compromised run is a scientific result; forcing a material identification is not.',
      },
    },
    {
      id: 'for-u2-l1',
      unitId: 'for-u2',
      title: 'Powder Scheme: Solubility, pH, and Precipitation',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Run a flowchart using appearance, solubility, pH, and HCl and NaOH precipitation',
        'Predict AgCl, PbCl2, carbonate effervescence, and hydroxide precipitates',
        'Separate common powders such as NaCl, CaCO3, AlCl3, and sucrose',
        'Record negative results as elimination evidence',
      ],
      sections: [
        {
          heading: 'Flowchart Logic',
          body: [
            'Start non-destructively: color, crystal shape under hand lens, and odor from a safe waft. Then test water solubility in 1 to 2 mL distilled water with a micro-spatula of powder. Soluble white powders include NaCl, sucrose, glucose, and sodium carbonate. Insoluble or slightly soluble whites include CaCO3, CaSO4, MgO, and starch.',
            'Next test pH with moistened pH paper or a drop of solution. Carbonates and NaOH are basic, AlCl3 hydrolyzes acidic, NaCl and sucrose are near neutral. pH splits groups cheaply before using up reagents, so always record the numeric range rather than just acid or base.',
          ],
        },
        {
          heading: 'HCl Tests and Carbonate Effervescence',
          body: [
            'Dilute HCl on a carbonate such as Na2CO3 or CaCO3 gives immediate effervescence: CO3 2- plus 2H+ yields CO2 plus H2O. CaCO3 fizzes and may dissolve, while NaCl simply dissolves without gas. Record gas, odor, and whether solid remains because HCl also precipitates Ag+ as white AgCl and Pb2+ as white PbCl2.',
            'If testing for chloride after dissolving, add dilute HNO3 then AgNO3 logic where allowed, but many Division C sets use HCl precipitation directly. White curdy AgCl darkens in light, distinguishing it from stable white sulfates. Lead chloride redissolves in hot water, a classic confirmatory trick.',
          ],
        },
        {
          heading: 'NaOH Tests and Hydroxides',
          body: [
            'Sodium hydroxide precipitates many metal hydroxides. Al3+ gives white Al(OH)3 that redissolves in excess NaOH as aluminate, a key amphoteric result. Mg2+ gives white Mg(OH)2 insoluble in excess. Fe3+ gives brown Fe(OH)3. Record both initial precipitate and excess-NaOH behavior.',
            'NaOH also frees ammonia from ammonium salts on gentle warming, turning moist red litmus blue. Do not confuse aluminum amphoterism with simple insolubility. The dissolve-in-excess step is the discriminating observation most teams forget to perform.',
          ],
        },
        {
          heading: 'Common Division C Powder Panel',
          body: [
            'Typical panels mix salts, carbonates, sugars, and starch: NaCl, KCl, CaCl2, Na2CO3, CaCO3, AlCl3, sucrose, glucose, starch, and MgSO4. Sucrose and glucose look similar but only glucose is a reducing sugar giving brick-red Benedict after heating. Starch gives blue-black with iodine and forms a cloudy suspension in cold water.',
            'Flame and Benedict narrow sugars and cations later, but solubility plus pH plus HCl and NaOH already separate most salts. Practice a matrix table from memory: solubility, pH, HCl gas or precipitate, NaOH precipitate and excess behavior, iodine, Benedict.',
          ],
        },
        {
          heading: 'Avoiding False Calls',
          body: [
            'Too much powder causes false insolubility and traps reagent. Use a grain the size of a sesame seed in 2 mL water and stir. Hard tap water can precipitate carbonates, so use distilled water for solubility and pH when provided.',
            'Watch timing: carbonates fizz instantly, Al(OH)3 forms then clears in excess within a minute, and AgCl darkens over minutes. Immediate vs delayed observations distinguishLook-alike whites, so log time explicitly.',
          ],
        },
        {
          heading: 'Build a decision tree from chemical properties',
          body: [
            'Start with the candidate list supplied for the exercise and the tests available. A useful first test separates candidates into informative groups while preserving enough sample for follow-up. Solubility, solution acidity, and reaction behavior measure different properties. A white appearance is shared by many substances and therefore has little discriminatory power on its own. A soluble sample is not automatically a sugar, and effervescence does not identify a specific salt without considering its anion and the test conditions.',
            'For a carbonate-containing sample, acid can release carbon dioxide: CO₃²⁻ + 2H⁺ → CO₂ + H₂O. The observation supports a carbonate-related reaction under the controlled exercise conditions, but it does not identify the cation. A separate flame or other permitted comparison may provide cation information. Sodium hydroxide can precipitate some metal hydroxides from suitable solutions, yet not every candidate yields a precipitate. The meaning of a negative result depends on concentration, solubility, and whether a fresh aliquot was used.',
          ],
        },
        {
          heading: 'Handle mixtures and apparently conflicting results',
          body: [
            'A mixture can show features of more than one component. One portion may dissolve while another remains, and a small amount of a reactive component may dominate a visible test. Do not force the sample into a pure-substance table when the problem allows mixtures. Record partial dissolution, delayed response, and residual solids explicitly. A candidate that explains one strong response but contradicts another reliable observation needs re-evaluation.',
            'An information-rich test is one that distinguishes the remaining candidates, not merely one that produces a vivid effect. If two candidates are both carbonate salts, another acid test repeats the same anion evidence. A cation-sensitive comparison may add more useful information. This distinction between repeated evidence and complementary evidence is central to efficient qualitative analysis. The virtual bench below provides clean illustrative observations; real analytical conclusions would also require control results, method limits, and an appropriate reference set.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Effervescence',
          definition: 'Gas bubbles from carbonate plus acid forming CO2.',
        },
        {
          term: 'Amphoteric hydroxide',
          definition: 'Precipitate such as Al(OH)3 dissolving in both acid and excess base.',
        },
        {
          term: 'AgCl precipitation',
          definition: 'White curdy silver chloride darkening in light; soluble in ammonia.',
        },
        {
          term: 'Solubility class',
          definition: 'Grouping by water solubility before specific ion tests.',
        },
        {
          term: 'pH hydrolysis',
          definition: 'Acidic or basic pH from dissolved salts such as AlCl3 or carbonate.',
        },
        {
          term: 'Negative evidence',
          definition: 'Documented absence of reaction used to eliminate candidates.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Virtual unknown-powder bench',
        instructions: 'Run the observation buttons on a fresh virtual aliquot for each test.',
        observations: [
          {
            label: 'Water solubility',
            result: 'Most of the white solid remains undissolved.',
          },
          {
            label: 'Acid response',
            result: 'A fresh aliquot releases gas; the blank remains negative.',
          },
          {
            label: 'Reference comparison',
            result:
              'In this candidate set, calcium carbonate is poorly soluble and acid-reactive; sodium carbonate is soluble; sodium chloride is not acid-effervescent.',
          },
        ],
        question: 'Which candidate is most consistent?',
        options: ['Calcium carbonate', 'Sodium carbonate', 'Sodium chloride'],
        correct: 0,
        explanation:
          'The acid result identifies a carbonate-like behavior while the solubility comparison separates the two carbonate candidates in this exercise.',
      },
      practice: [
        {
          id: 'for-u2-l1-q1',
          prompt: 'Powder fizzes with HCl and gives basic pH. Best inference?',
          type: 'mcq',
          options: ['Chloride salt', 'Carbonate', 'Sucrose', 'Starch'],
          answer: 'Carbonate',
          explanation: 'Carbonate plus acid releases CO2 effervescence and solutions are basic.',
          points: 2,
        },
        {
          id: 'for-u2-l1-q2',
          prompt:
            'White precipitate with NaOH dissolves in excess NaOH. Identify behavior and one ion.',
          type: 'short',
          answer:
            'Amphoteric hydroxide, consistent with Al3+ as Al(OH)3 forming aluminate in excess.',
          explanation:
            'Dissolving in excess separates aluminum from magnesium and most other hydroxides.',
          points: 3,
        },
        {
          id: 'for-u2-l1-q3',
          prompt: 'White precipitate with dilute HCl darkens in light. Identify it.',
          type: 'mcq',
          options: ['CaCO3', 'AgCl', 'Starch', 'NaCl'],
          answer: 'AgCl',
          explanation: 'Silver chloride is white and curdy and photoreduces to dark silver.',
          points: 2,
        },
        {
          id: 'for-u2-l1-q4',
          prompt: 'Explain why a large scoop can fake insolubility.',
          type: 'short',
          answer:
            'Excess solid saturates solvent and leaves undissolved residue even for soluble salts, masking pH and later tests.',
          explanation:
            'Micro-scale amounts keep concentrations in the responsive range of indicators.',
          points: 3,
        },
        {
          id: 'for-u2-l1-q5',
          prompt: 'CaCO3 vs NaCl: give two discriminating tests.',
          type: 'short',
          answer:
            'HCl gives effervescence only with CaCO3; water solubility is high for NaCl but very low for CaCO3.',
          explanation: 'Gas plus solubility separates carbonates from neutral chlorides quickly.',
          points: 3,
        },
        {
          id: 'for-u2-l1-q6',
          prompt:
            'Why does an acid-effervescence result not identify the cation in a carbonate salt?',
          type: 'short',
          answer:
            'The gas-producing reaction involves the carbonate anion; different cations can accompany it.',
          explanation:
            'A complementary cation-sensitive test provides a different dimension of evidence.',
          points: 3,
        },
        {
          id: 'for-u2-l1-q7',
          prompt: 'Why must different reagents be applied to separate aliquots?',
          type: 'short',
          answer:
            'An earlier reagent can alter pH, consume material, or introduce ions that change the next response.',
          explanation:
            'Sequential contamination can make a reaction reflect the procedure rather than the original sample.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Narrow an unknown in two dimensions',
        problem:
          'The exercise candidate set is sodium chloride, sodium carbonate, and calcium carbonate. The unknown reacts with acid to release gas and is poorly soluble in water.',
        steps: [
          'Gas release under the supplied valid conditions is consistent with a carbonate reaction, narrowing the set to the two carbonate candidates.',
          'Poor water solubility agrees better with calcium carbonate than sodium carbonate within this reference set.',
          'A calcium-associated flame comparison would add cation evidence, whereas repeating the acid response would largely repeat anion evidence.',
          'Conclude that the sample is most consistent with calcium carbonate among the stated candidates, while preserving the candidate-set limitation.',
        ],
        conclusion:
          'An identification scheme combines complementary properties instead of relying on one dramatic reaction.',
      },
    },
    {
      id: 'for-u2-l2',
      unitId: 'for-u2',
      title: 'Flame Tests, Iodine, and Benedict',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Recall flame colors for Na, K, Ca, Sr, Cu, and B with cobalt-glass masking',
        'Interpret iodine starch blue-black and Benedict brick-red for reducing sugars',
        'Clean nichrome loops to avoid sodium carryover and ghost flames',
        'Combine flame plus solubility to ID salts such as NaCl vs KCl vs CaCO3',
      ],
      sections: [
        {
          heading: 'Flame Test Technique',
          body: [
            'Clean a nichrome wire in concentrated HCl, then heat in a blue Bunsen flame until no color. Dip in powdered sample or its HCl paste and return to the flame edge. Record the immediate dominant color and duration because sodium gives an intense but brief yellow that masks potassium.',
            'Sodium contamination is everywhere from fingers and glass. If every sample flashes yellow, reclean longer, use distilled water, and view potassium through cobalt-blue glass which absorbs yellow and reveals lilac. Calcium gives brick-red orange, strontium crimson, copper blue-green, and borate green.',
          ],
        },
        {
          heading: 'Flame Color Table',
          body: [
            'Memorize: Na intense yellow, K lilac through cobalt glass, Ca brick-red orange, Sr crimson red, Li carmine, Cu blue-green, Ba apple green, Zn bluish-green weak. Chlorides volatilize well, so a drop of HCl often intensifies color. Sulfates and carbonates may need longer heating.',
            'In competition, flame is supporting rather than sole evidence because mixes and contamination shift hues. Pair flame with solubility and precipitation: orange-red flame plus HCl effervescence points to CaCO3, while lilac plus high solubility and neutral pH points to KCl.',
          ],
        },
        {
          heading: 'Iodine Test for Starch',
          body: [
            'Iodine-potassium iodide solution turns blue-black with amylose helices in starch. Add one drop to a small suspension. A positive is dramatic and fast. Cellulose fibers do not give this color, separating starch powder from powdered cellulose or sugars.',
            'False positives are rare but excess heat or strong alkali can fade the complex. Test at room temperature and run a starch known alongside. Record whether color is uniform or spotted, which hints at mixtures.',
          ],
        },
        {
          heading: 'Benedict Test for Reducing Sugars',
          body: [
            'Benedict reagent is alkaline copper(II) citrate, blue. Heating with a reducing sugar such as glucose reduces Cu2+ to brick-red Cu2O precipitate. Sucrose is non-reducing and stays blue unless first hydrolyzed by boiling with HCl then neutralized. Use a boiling water bath for 2 to 3 minutes, not direct flame.',
            'Grade color progression: blue to green to yellow to orange to brick-red with increasing reducing sugar. Record final precipitate color after heating, not just initial tint. Too much sugar gives heavy red that hides other observations, so keep sample small.',
          ],
        },
        {
          heading: 'Putting Triad Together',
          body: [
            'Example: white soluble powder, neutral pH, persistent yellow flame, no iodine color, stays blue with Benedict suggests NaCl or sucrose split by AgCl test or taste prohibition logic. Yellow flame plus brick-red Benedict after heating suggests glucose sodium mix, prompting separation reasoning.',
            'Judges love mixtures and look-alikes. State each test result, then eliminate: lilac through cobalt glass eliminates Na+, blue-black iodine confirms starch despite similar appearance to other whites, and Benedict red confirms reducing sugar despite similar solubility.',
          ],
        },
        {
          heading: 'Connect observed color with molecular or atomic processes',
          body: [
            "In a flame-emission exercise, thermal energy excites species that can emit characteristic wavelengths as they return to lower-energy states. The observed color is a combined visual signal rather than a perfectly isolated spectral line. Sodium contamination can dominate a flame's appearance and obscure weaker emissions. A clean tool blank and known reference comparison help distinguish a true sample effect from carryover. The counterion and physical matrix may affect the observation, so flame color alone is not a complete identification of every salt.",
            "Iodine-based starch testing relies on an interaction with the starch structure that produces a characteristic dark color under suitable conditions. A negative iodine result does not mean no carbohydrate is present: glucose and many other carbohydrates do not give the same starch response. Benedict's reagent assesses reducing behavior in a controlled heated assay, rather than testing all sugars identically. A reducing sugar can reduce copper species under the specified conditions, producing a change that depends on concentration and procedure. Distinguish the chemical property being screened from the broad everyday category sugar.",
          ],
        },
        {
          heading: 'Interpret a matrix rather than a memorized color list',
          body: [
            "Create a table with candidates as rows and each test as a column. Mark expected positive, negative, and variable responses. The unknown's complete pattern should be compared with that matrix. Starch-positive and Benedict-negative behavior differs from a reducing-sugar pattern, but mixtures can generate both responses. A vivid positive result should not cause you to ignore a reliable contradiction in another column. Use the reference conditions in the problem; test duration, reagent condition, sample amount, and contamination can change observations.",
            'The virtual exercise uses recorded results instead of asking students to heat substances or expose materials to flames. It lets you practice which conclusion follows from a particular combination. If an activity includes a flame-color reference, treat it as a comparative observation tied to that controlled exercise, not a universal promise that every sample of the named material will look identical. The most defensible result states the observed pattern, the candidates it supports, and the additional test needed if more than one candidate remains.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Cobalt glass',
          definition: 'Blue filter absorbing sodium yellow to reveal potassium lilac.',
        },
        {
          term: 'Benedict positive',
          definition: 'Brick-red Cu2O precipitate showing reducing sugar after heating.',
        },
        {
          term: 'Iodine-starch complex',
          definition: 'Blue-black inclusion complex of iodine in amylose helices.',
        },
        {
          term: 'Carryover',
          definition: 'Residual sodium on wire causing ghost yellow flames.',
        },
        {
          term: 'Reducing sugar',
          definition: 'Sugar with free aldehyde such as glucose that reduces Cu2+.',
        },
        {
          term: 'Non-reducing sugar',
          definition: 'Sugar such as sucrose needing hydrolysis before Benedict reacts.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Spot-test interpretation laboratory',
        instructions: 'Inspect the controls and two complementary test results.',
        observations: [
          {
            label: 'Controls',
            result:
              'Known starch responds to iodine; known reducing sugar responds to Benedict’s assay; blanks remain negative.',
          },
          {
            label: 'Iodine result',
            result: 'The unknown does not show the reference starch color.',
          },
          {
            label: 'Benedict result',
            result: 'The unknown gives the reference positive reducing response.',
          },
        ],
        question: 'Which claim is justified?',
        options: [
          'Reducing behavior is detected; the starch response is not detected',
          'All carbohydrates are absent',
          'The sample is uniquely identified by one color',
        ],
        correct: 0,
        explanation:
          'The observations describe two chemical properties. They narrow a candidate set but do not uniquely identify every possible substance.',
      },
      practice: [
        {
          id: 'for-u2-l2-q1',
          prompt: 'Every sample and the tool blank show yellow emission. Best next step?',
          type: 'mcq',
          options: [
            'Accept every sample as pure sodium salt',
            'Resolve carryover and obtain a clean blank',
            'Ignore the blank',
            'Mix all unknowns',
          ],
          answer: 'Resolve carryover and obtain a clean blank',
          explanation:
            'The blank indicates background contamination, so the unknowns cannot yet be interpreted.',
          points: 2,
        },
        {
          id: 'for-u2-l2-q2',
          prompt: 'Why does sucrose stay blue with Benedict unless pre-hydrolyzed?',
          type: 'short',
          answer:
            'Sucrose is non-reducing with no free aldehyde; acid hydrolysis splits it to glucose plus fructose which then reduce copper.',
          explanation: 'Only reducing sugars convert blue Cu2+ to red Cu2O without extra steps.',
          points: 3,
        },
        {
          id: 'for-u2-l2-q3',
          prompt: 'Brick-red flame plus effervescence with HCl suggests:',
          type: 'mcq',
          options: ['KCl', 'CaCO3', 'Starch', 'Sucrose'],
          answer: 'CaCO3',
          explanation: 'Calcium gives brick-red orange flame and carbonate gives CO2 fizz.',
          points: 2,
        },
        {
          id: 'for-u2-l2-q4',
          prompt: 'Why must a Benedict comparison use controlled assay conditions?',
          type: 'short',
          answer:
            'The response depends on reagent performance, concentration, heating conditions, and a valid reference comparison.',
          explanation:
            'The virtual lesson provides observations; a color is interpretable only within a controlled method.',
          points: 3,
        },
        {
          id: 'for-u2-l2-q5',
          prompt: 'White powder gives blue-black with iodine. Conclusion?',
          type: 'mcq',
          options: ['Glucose', 'Starch', 'NaCl', 'CaCO3'],
          answer: 'Starch',
          explanation: 'Iodine in amylose gives the diagnostic blue-black complex.',
          points: 2,
        },
        {
          id: 'for-u2-l2-q6',
          prompt: 'Why can a negative iodine test coexist with a positive Benedict test?',
          type: 'short',
          answer:
            'A reducing sugar may lack the starch structure that produces the iodine response.',
          explanation: 'Different assays target different chemical properties.',
          points: 3,
        },
        {
          id: 'for-u2-l2-q7',
          prompt: 'What can a yellow flame in a tool blank reveal?',
          type: 'short',
          answer:
            'Sodium or other background contamination may be contributing a signal before the unknown is tested.',
          explanation: 'A blank helps separate sample evidence from carryover.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Compare two carbohydrate patterns',
        problem:
          'Sample A is strongly iodine-positive and Benedict-negative under valid exercise conditions. Sample B is iodine-negative and Benedict-positive.',
        steps: [
          'A supports a starch-containing candidate because the iodine interaction is the discriminating observation.',
          'B supports a reducing-substance candidate such as the supplied reducing sugar, without establishing every possible molecule of that class.',
          'Neither result licenses the claim that the negative sample contains no carbohydrate.',
          'If both tests were positive in one unknown, consider a mixture or the relevant candidate chemistry rather than discarding one result.',
        ],
        conclusion:
          'Test specificity determines the level of the conclusion: starch detection and reducing behavior are different questions.',
      },
    },
    {
      id: 'for-u3-l1',
      unitId: 'for-u3',
      title: 'Polymer Chemistry and Recycling Codes',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Distinguish addition vs condensation polymers and thermoplastic vs thermoset',
        'Decode recycling codes 1 to 6 with monomers and properties',
        'Predict density float-sink and general chemical resistance',
        'Link structure such as crystallinity to appearance and behavior',
      ],
      sections: [
        {
          heading: 'Monomers to Polymers',
          body: [
            'Addition polymers join unsaturated monomers without byproducts, such as ethylene to polyethylene and styrene to polystyrene. Condensation polymers release water or HCl, such as PET from terephthalic acid plus ethylene glycol and nylon from diamine plus diacid. Competition questions often ask which code is condensation: PET and nylon stand out.',
            'Cross-linking changes behavior profoundly. Thermoplastics have linear or branched chains that soften on heating and can be remelted. Thermosets have 3D cross-links that char rather than melt. If a chip softens and draws strings on a hot spatula, it behaves as thermoplastic.',
          ],
        },
        {
          heading: 'Codes 1 to 6',
          body: [
            'Code 1 PETE is clear, strong polyester for bottles. Code 2 HDPE is opaque, waxy, chemical-resistant jugs. Code 3 PVC is dense, chlorine-containing pipe and blister packs. Code 4 LDPE is flexible film and bags. Code 5 PP is heat-resistant tubs and caps. Code 6 PS is rigid or foamed cups and cutlery.',
            'Memorize monomers: PET ethylene glycol plus terephthalic acid, HDPE and LDPE ethylene with different branching, PVC vinyl chloride, PP propylene, PS styrene. Branching lowers density and crystallinity, so LDPE floats more readily and feels waxy while HDPE is stiffer.',
          ],
        },
        {
          heading: 'Density and Crystallinity',
          body: [
            'Density ranges guide float-sink: PP about 0.90, LDPE 0.92, HDPE 0.95, PS about 1.05, PET about 1.38, PVC about 1.38 grams per cubic centimeter. In water at 1.00, PP, LDPE, and HDPE float while PS, PET, and PVC sink. Salt solutions refine splits.',
            'Crystalline regions are ordered and opaque, amorphous regions are clear. PET bottles are transparent when quenched but whiten when crystallized. Foamed PS traps air and floats despite PS density above water, a favorite trick question.',
          ],
        },
        {
          heading: 'Thermal and Chemical Hints',
          body: [
            'Heat behavior narrows codes: PP resists heat and microwaves, PS softens and styrene odor appears, PVC chars and releases HCl, PET shrinks. Do not overheat in competition; a warm water bath and hot-pin observation are enough when flame tests are separate.',
            'Chemical resistance also helps: HDPE resists acids, PET resists many solvents but hydrolyzes in strong hot alkali, PS dissolves in acetone, PVC resists hydrocarbons. Acetone drop causing tackiness strongly suggests PS.',
          ],
        },
        {
          heading: 'Competition Strategy',
          body: [
            'Combine code mark, clarity, flexibility, density, and flame later. A clear rigid sinker marked 1 behaving as polyester is PET. An opaque flexible floater is likely PE or PP, split by heat resistance and flame odor. Always check for foam structure that inverts density logic.',
            'Record recycling mark but verify because lab chips may be cut without marks. Judges plant unmarked pieces to force testing. Never ID by mark alone when test data conflict; tests outrank stamps.',
          ],
        },
        {
          heading: 'Relate chain structure to bulk properties',
          body: [
            'A polymer consists of repeating units connected into long molecules. Chain length, branching, cross-linking, intermolecular interactions, and packing influence its bulk behavior. Two materials with similar repeat-unit chemistry can differ in crystallinity, orientation, additives, and processing history. Density is therefore not a property determined by the recycling symbol alone. A sample may contain pigments, fillers, plasticizers, or trapped air that alter a simple comparison with an ideal reference.',
            "Thermoplastics can soften and be reshaped under suitable conditions because their structure is not a permanently cross-linked network in the same way as a thermoset. Thermosets have extensive cross-linking that limits this reversible flow. Addition and condensation describe broad polymerization patterns; the distinction concerns how monomers connect and whether small molecules are released in the process. Do not confuse polymerization chemistry with the finished object's identification code. A manufacturing label is useful background information, but an unknown fragment still requires observations.",
          ],
        },
        {
          heading: 'Use morphology to explain identification limits',
          body: [
            'Crystalline regions pack chains more regularly, while amorphous regions have less ordered arrangement. Many polymers contain both. Increased packing can alter density, stiffness, and transparency, but the relationship also depends on composition and processing. Stretching can orient chains and change mechanical properties. A thin film and a thick molded part made from a similar polymer may therefore look and behave differently. The physical form of the evidence belongs in the record.',
            'Resin identification codes describe broad material categories, not forensic uniqueness or guaranteed local recyclability. PET, HDPE, PVC, LDPE, PP, and PS are common teaching references. A matching code or density can narrow a class; it cannot identify one bottle or one owner. The density simulator isolates buoyancy under ideal conditions. Its object has a defined density and no bubbles or fillers beyond the chosen value. Use it to understand the force balance before interpreting real-world deviations from ideal behavior.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Addition polymer',
          definition: 'Chain from unsaturated monomers with no byproduct, such as polyethylene.',
        },
        {
          term: 'Condensation polymer',
          definition: 'Polymer releasing small molecule such as water, such as PET and nylon.',
        },
        {
          term: 'Thermoplastic',
          definition: 'Heat-softening reformable plastic with linear chains.',
        },
        {
          term: 'Thermoset',
          definition: 'Cross-linked plastic that chars instead of melting.',
        },
        {
          term: 'Crystallinity',
          definition: 'Ordered chain packing controlling opacity, strength, and density.',
        },
        {
          term: 'Resin code',
          definition: 'Numbered recycling mark 1 to 6 identifying base polymer family.',
        },
      ],
      simulation: {
        kind: 'model',
        model: 'density',
        title: 'Polymer buoyancy explorer',
        instructions:
          'Choose sample and liquid densities and observe the predicted float-or-sink behavior.',
        challenge: 'Find two different sample densities that both float in water.',
        takeaway: 'The same observation can fit multiple polymer candidates.',
      },
      practice: [
        {
          id: 'for-u3-l1-q1',
          prompt: 'Which polymer is a condensation product?',
          type: 'mcq',
          options: ['HDPE', 'PET', 'PP', 'PS'],
          answer: 'PET',
          explanation:
            'PET forms from diacid plus diol with water loss, unlike addition polyolefins.',
          points: 2,
        },
        {
          id: 'for-u3-l1-q2',
          prompt:
            'A fragment floats in water and several low-density polymers are candidates. What next?',
          type: 'short',
          answer:
            'Use a second controlled density comparison or a complementary validated material test; flotation alone is not unique.',
          explanation: 'Choose a test that distinguishes the remaining candidates.',
          points: 3,
        },
        {
          id: 'for-u3-l1-q3',
          prompt: 'Why can PS foam float while solid PS sinks?',
          type: 'short',
          answer:
            'Foam includes air lowering bulk density below water; solid PS density about 1.05 sinks.',
          explanation: 'Bulk vs material density explains the trick; test solid fragment.',
          points: 3,
        },
        {
          id: 'for-u3-l1-q4',
          prompt: 'Clear rigid bottle marked 1 is most likely:',
          type: 'mcq',
          options: ['PVC', 'PETE', 'LDPE', 'PP'],
          answer: 'PETE',
          explanation: 'Code 1 clear beverage bottles are PET polyester.',
          points: 2,
        },
        {
          id: 'for-u3-l1-q5',
          prompt: 'Thermoplastic vs thermoset on heating?',
          type: 'mcq',
          options: [
            'Both melt cleanly',
            'Thermoplastic softens and remelts; thermoset chars',
            'Both char',
            'Neither changes',
          ],
          answer: 'Thermoplastic softens and remelts; thermoset chars',
          explanation: 'Cross-links prevent thermoset flow, causing decomposition instead.',
          points: 2,
        },
        {
          id: 'for-u3-l1-q6',
          prompt: 'Why can two samples with the same broad polymer label have different densities?',
          type: 'short',
          answer:
            'Crystallinity, additives, fillers, processing, and voids can change bulk density.',
          explanation: 'The label does not specify every structural feature of the material.',
          points: 3,
        },
        {
          id: 'for-u3-l1-q7',
          prompt: 'What does floating establish in the ideal density model?',
          type: 'short',
          answer:
            'The sample density is less than the liquid density, with equilibrium submerged fraction equal to their ratio.',
          explanation: 'It establishes an inequality, not a unique source.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Explain why a floating fragment is not uniquely identified',
        problem:
          'A fragment floats in water. The reference set contains polypropylene and two polyethylene samples with densities below water.',
        steps: [
          'Floating indicates the fragment’s effective density is below the liquid density under the test conditions.',
          'All three listed candidates satisfy that inequality, so flotation in water alone does not distinguish them.',
          'A second liquid with a carefully chosen density may subdivide the candidate group.',
          'Additional chemical or spectroscopic evidence may be needed, especially if fillers or bubbles alter the apparent behavior.',
        ],
        conclusion:
          'A useful physical property constrains a candidate set; it does not necessarily produce a unique name.',
      },
    },
    {
      id: 'for-u3-l2',
      unitId: 'for-u3',
      title: 'Plastic ID: Density, Flame, and Beilstein',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Run water and salt float-sink to bracket density',
        'Interpret flame color, soot, odor, and drip for PE, PP, PS, PVC, PET',
        'Use Beilstein copper-wire test for chlorine and acetone for PS',
        'Write a stepwise plastic unknown conclusion',
      ],
      sections: [
        {
          heading: 'Density Liquids Safely',
          body: [
            'Start with water at 1.00 grams per cubic centimeter. Floaters are PP, LDPE, or HDPE including foam. Sinkers go to saturated salt near 1.20 where PS near 1.05 floats but PET and PVC near 1.38 still sink. This single second liquid splits the most common six.',
            'Use small chips, press out bubbles, and wait ten seconds. Air clinging to rough edges fakes floating. Pat dry between liquids so carryover does not dilute the next solution. Record float, sink, or suspend for each liquid.',
          ],
        },
        {
          heading: 'Flame Test Signatures',
          body: [
            'Hold with forceps at a flame edge, never in hand. PE burns with blue-yellow flame, drips, paraffin odor, and little soot. PP is similar but with acrid diesel-like odor and less drip. PS burns with orange sooty flame and sweet floral styrene odor.',
            'PVC self-extinguishes, gives green-edged flame and sharp HCl odor with white fumes. PET burns with sooty flame and sweet burnt odor, leaving hard black bead. Record ease of ignition, self-extinguishing, soot on porcelain, drip, and odor after fanning safely.',
          ],
        },
        {
          heading: 'Beilstein and Acetone',
          body: [
            'A historical copper-wire halogen screen can show a green response associated with certain halogen-containing materials, but contamination and other compositions limit specificity. Solvent-response observations can also vary with polymer formulation and exposure conditions.',
            'This lesson uses virtual reference observations only. No single halogen or solvent screening response uniquely establishes a polymer, and physical screening procedures require an approved supervised laboratory method.',
          ],
        },
        {
          heading: 'Worked Unknown',
          body: [
            'Example: unmarked rigid clear sinker in water, floats in nothing at 1.20? Actually sinks in salt too, burns with sooty flame and sweet odor, acetone negative, no green Beilstein. Conclusion is PET Code 1, consistent with polyester bottle stock. PVC would share sinking but give green Beilstein and HCl odor.',
            'Example: waxy floater with paraffin odor and dripping blue-yellow flame is PE. To split HDPE from LDPE use stiffness and opacity: stiff milk-jug feel is HDPE, stretchy film is LDPE. PP floater resists heat more and smells acrid rather than candle-like.',
          ],
        },
        {
          heading: 'Errors and Safety',
          body: [
            'Do not burn large pieces; fumes from PVC and PS irritate lungs. Work in ventilated area, keep burn time under five seconds, and extinguish on ceramic. Odor testing means wafting, never direct sniffing over burning plastic.',
            'Mixtures and additives shift colors, so require two independent confirmations. A black pigmented chip hides soot observation, so rely on density plus Beilstein and acetone rather than flame color alone.',
          ],
        },
        {
          heading: 'Bracket density using multiple comparisons',
          body: [
            "A density bracket is more informative than a single float-or-sink result. If a fragment sinks in a liquid of density 0.90 g/mL but floats in one of density 1.00 g/mL, its density lies between those values under ideal conditions. If it appears suspended, its density is near the liquid's, but small currents and attached bubbles complicate interpretation. Record temperature and reference-liquid identity because liquid density changes with conditions. Do not report a narrow numerical density from one visual observation that only establishes a broad interval.",
            "Archimedes' principle relates buoyant force to displaced fluid weight. A floating object displaces enough fluid to balance its own weight, leading to the ideal submerged fraction equal to sample density divided by liquid density. A sinking object does not have a stable floating fraction greater than one; it is fully submerged and continues downward unless supported. This distinction explains why the simulator caps the displayed submerged fraction at 100% while reporting a sinking outcome separately.",
          ],
        },
        {
          heading: 'Combine physical and chemical evidence without overclaiming',
          body: [
            'A polymer identification scheme may combine density, appearance, microscopy, and appropriately validated chemical or spectroscopic comparisons. Some historical teaching schemes describe flame or copper-wire observations, but those results are screening clues and can involve hazardous products. This course uses virtual observations rather than physical burning or fuming instructions. A halogen-associated screening response is not equivalent to proving that an unknown is PVC, since other compositions or contamination can contribute.',
            'When two tests disagree, first inspect assumptions. Was the fragment solid or foamed? Was a bubble attached? Was the surface coated? Were different pieces sampled from a multilayer object? Did a reference reagent or instrument perform correctly? A composite object can contain several polymers, so one fragment may not represent the whole. The final statement should connect the measured properties to the allowed reference candidates and identify any unresolved contradiction. Do not make the candidate fit by silently changing a recorded observation.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Float-sink bracket',
          definition: 'Density split using water 1.00 and salt solution about 1.20.',
        },
        {
          term: 'Beilstein test',
          definition: 'Green copper flame indicating halogen such as PVC chlorine.',
        },
        {
          term: 'Sooty flame',
          definition: 'Orange smoky flame from aromatic polymers such as PS and PET.',
        },
        {
          term: 'Self-extinguishing',
          definition: 'Flame dies when removed from burner, characteristic of PVC.',
        },
        {
          term: 'Acetone attack',
          definition: 'Softening test selective for polystyrene among common codes.',
        },
        {
          term: 'Drip behavior',
          definition: 'Molten dripping indicating thermoplastic flow, common in PE and PP.',
        },
        {
          term: 'Wafting',
          definition: 'Safe odor sampling by fanning air toward nose, never direct inhalation.',
        },
      ],
      simulation: {
        kind: 'model',
        model: 'density',
        title: 'Density bracketing bench',
        instructions: 'Hold sample density fixed and vary liquid density.',
        challenge:
          'Use a 0.95 g/mL sample. Find one liquid in which it sinks and another in which it floats.',
        takeaway:
          'The transition constrains density; a source identification requires additional evidence.',
      },
      practice: [
        {
          id: 'for-u3-l2-q1',
          prompt: 'Green Beilstein flash means:',
          type: 'mcq',
          options: ['Sodium', 'Halogen such as PVC chlorine', 'Starch', 'Glucose'],
          answer: 'Halogen such as PVC chlorine',
          explanation: 'Copper halide volatilizes green; among codes this points to PVC.',
          points: 2,
        },
        {
          id: 'for-u3-l2-q2',
          prompt:
            'Chip floats in water. Which codes remain and which liquid splits PS from PET/PVC?',
          type: 'short',
          answer:
            'Remain PP, LDPE, HDPE; saturated salt near 1.20 floats PS near 1.05 but PET and PVC near 1.38 still sink.',
          explanation:
            'Water removes polyolefins; salt separates styrene from polyesters and vinyl.',
          points: 3,
        },
        {
          id: 'for-u3-l2-q3',
          prompt:
            'Why is one thermal screening observation insufficient for unique polymer identification?',
          type: 'short',
          answer:
            'Composition, additives, sample form, and conditions can affect the response; multiple candidates may agree.',
          explanation:
            'Screening clues require a controlled reference set and complementary observations.',
          points: 3,
        },
        {
          id: 'for-u3-l2-q4',
          prompt: 'Acetone softens chip in 30 s. Most likely code?',
          type: 'mcq',
          options: ['PS 6', 'HDPE 2', 'PP 5', 'PET 1'],
          answer: 'PS 6',
          explanation: 'Acetone attacks polystyrene selectively among the common six.',
          points: 2,
        },
        {
          id: 'for-u3-l2-q5',
          prompt: 'Why press out bubbles in density tests?',
          type: 'mcq',
          options: [
            'To speed sinking',
            'Trapped air fakes floating',
            'To dissolve plastic',
            'To change density of liquid',
          ],
          answer: 'Trapped air fakes floating',
          explanation: 'Air lowers apparent bulk density, especially on rough or foamed chips.',
          points: 2,
        },
        {
          id: 'for-u3-l2-q6',
          prompt:
            'A sample sinks in 1.00 g/mL and floats in 1.10 g/mL. State its ideal density bracket.',
          type: 'short',
          answer: '1.00 < sample density < 1.10 g/mL.',
          explanation: 'Each result supplies one inequality.',
          points: 3,
        },
        {
          id: 'for-u3-l2-q7',
          prompt: 'How can an attached air bubble mislead a flotation test?',
          type: 'short',
          answer:
            'It changes the effective displaced volume relative to sample mass, making the fragment appear more buoyant.',
          explanation:
            'The test may measure a sample-plus-bubble system rather than the solid alone.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Use two flotation observations',
        problem:
          'A fragment sinks in a 0.92 g/mL reference liquid and floats in a 0.98 g/mL reference liquid. A candidate table lists 0.90, 0.95, and 1.20 g/mL samples.',
        steps: [
          'Sinking in 0.92 requires a sample density greater than 0.92 in the ideal model.',
          'Floating in 0.98 requires a sample density less than 0.98.',
          'The resulting interval is 0.92 < density < 0.98 g/mL, which includes the 0.95 reference.',
          'Report consistency with that reference, plus the assumptions of no attached bubbles, representative sampling, and valid liquid densities.',
        ],
        conclusion:
          'A bracket uses two inequalities. It is stronger than one observation but still depends on the reference set and measurement conditions.',
      },
    },
    {
      id: 'for-u4-l1',
      unitId: 'for-u4',
      title: 'Fibers: Classification and Microscopy',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Classify natural, regenerated, and synthetic fibers with examples',
        'Use lengthwise and cross-section microscopy: delusterant, diameter uniformity',
        'Run burn, acetone, and alkali tests to split cotton, nylon, polyester, acrylic',
        'State association limits for fiber evidence',
      ],
      sections: [
        {
          heading: 'Fiber Families',
          body: [
            'Natural fibers are cotton cellulose with twisted ribbon, wool protein with scales, and silk smooth protein. Regenerated fibers such as rayon are cellulose reformed and look like smooth rods with striations. Synthetics are nylon polyamide, polyester PET ester, acrylic polyacrylonitrile, and olefin polyolefin.',
            'Competition panels favor cotton, wool, nylon, polyester, acrylic, and rayon. Memorize origin plus chemistry because burn and solubility follow chemistry: cellulose chars, protein smells like burnt hair, nylon melts then burns, polyester melts with sweet odor, acrylic burns fiercely with black bead.',
          ],
        },
        {
          heading: 'Microscopy First',
          body: [
            'Mount dry fibers on a slide and view lengthwise at 40x to 100x. Cotton shows flat twisted ribbon with variable diameter. Wool shows overlapping scales and variable diameter. Synthetics show uniform diameter and smooth rods; delusterant titanium dioxide specks appear as dark dots reducing shine.',
            'Cross-sections, where provided as photos, are decisive: cotton kidney bean, wool round with scales, rayon serrated, nylon round or trilobal, polyester round, acrylic bean or dog-bone. Uniformity plus delusterant equals manufactured fiber even before burn tests.',
          ],
        },
        {
          heading: 'Burn Test Matrix',
          body: [
            'Historical fiber reference tables compare recorded thermal behavior such as charring, melting, residue formation, and extinguishing. Cellulose-based and protein-based fibers can behave differently, while synthetic materials may soften or form beads. Blends and additives complicate these broad patterns.',
            'Interpret only supplied virtual observations in this course. Do not burn or smell unknown fibers. Combine reference behavior with microscopy and composition evidence rather than using odor as a unique identifier.',
          ],
        },
        {
          heading: 'Chemical Splits',
          body: [
            'Acetone dissolves acetate but not most crime-lab fibers; among common panels it helps less than alkali. Warm 5 percent NaOH dissolves wool and silk proteins but not cotton or synthetics, splitting animal from plant plus synthetic. Concentrated sulfuric or specific stains may be restricted, so rely on NaOH plus burn plus microscopy.',
            'Bleach can degrade protein fibers and remove dyes, so never bleach before color comparison. Compare undyed structure first, then dye color under same light, then chemistry. Dye alone is weak because common colors repeat across manufacturers.',
          ],
        },
        {
          heading: 'What Fibers Prove',
          body: [
            'Fibers are class evidence. A blue polyester match between victim and suspect car seat supports contact but large-scale textile production limits individualization. Report color, diameter, cross-section, delusterant, and burn as independent matches before concluding consistent with.',
            'Elimination is powerful: different microscopy plus different burn eliminates quickly. In timed stations, eliminate obvious non-matches first, then spend burn tests on the closest two candidates.',
          ],
        },
        {
          heading: 'Compare fibers using a structured feature set',
          body: [
            'Begin with broad composition: natural plant fibers are commonly cellulose-based, natural animal fibers are commonly protein-based, and manufactured fibers include regenerated and synthetic materials. Rayon is regenerated cellulose, so manufactured does not always mean a wholly synthetic polymer. Microscopy can reveal longitudinal shape, surface texture, diameter variation, and cross-sectional form. Cotton often appears as a twisted ribbon; wool commonly shows surface scales. These appearances are useful patterns, not infallible identifiers across all treatments and image conditions.',
            'Color should be assessed under controlled illumination and, where possible, through more discriminating dye or spectral comparisons. Two blue fibers can have different dye chemistry, while a single dyed fiber may look different under different lighting. Record whether the sample is a single fiber, a blend, or part of a yarn. A blended fabric can transfer only one component, so absence of the second component in a tiny trace need not exclude the fabric. Sampling variability belongs in the interpretation.',
          ],
        },
        {
          heading: 'Separate compatibility from transfer significance',
          body: [
            'A fiber compatible with a reference garment may support a possible association. The strength depends on how common the characteristics are, how many fibers are recovered, where they are found, and what contacts could have occurred. Transfer can be primary or secondary, and persistence changes with time and activity. A fiber on an exposed seat may have many plausible sources; a cluster in a protected location may raise a different question. These contextual differences cannot be replaced by a single microscopic match label.',
            'Thermal or solvent observations in reference materials can help distinguish broad classes, but treatment, blends, and additives alter behavior. The virtual investigation uses recorded observations and requires students to compare them without burning samples or using solvents. If a feature clearly differs under valid conditions, discuss whether it excludes the sampled reference or whether the reference range is inadequately characterized. More reference fibers from different parts of a garment may be necessary to understand within-source variation.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Delusterant',
          definition: 'Titanium dioxide dots in synthetic fibers reducing shine under microscope.',
        },
        {
          term: 'Twisted ribbon',
          definition: 'Flat helical cotton morphology with variable diameter.',
        },
        {
          term: 'Scales',
          definition: 'Overlapping wool cuticle plates visible under microscope.',
        },
        {
          term: 'Bead residue',
          definition: 'Melted polymer bead after burning; hardness and color aid ID.',
        },
        {
          term: 'Regenerated fiber',
          definition: 'Reformed natural polymer such as rayon from cellulose.',
        },
        {
          term: 'Cross-section',
          definition: 'Fiber end-view shape such as kidney bean or trilobal for ID.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Virtual fiber comparison microscope',
        instructions:
          'Inspect morphology and composition before choosing the best reference class.',
        observations: [
          {
            label: 'Longitudinal view',
            result: 'A flattened ribbon with repeated twists is visible.',
          },
          {
            label: 'Composition record',
            result: 'The supplied reference assay supports a cellulose-based material.',
          },
          {
            label: 'Comparison set',
            result:
              'Wool shows scales; the synthetic reference is a smooth uniform filament; cotton shows convolutions.',
          },
        ],
        question: 'Which comparison is best supported?',
        options: [
          'Cotton-like fiber class',
          'Unique identification of one sweater',
          'Wool based on scales',
        ],
        correct: 0,
        explanation:
          'The observed morphology and composition favor cotton within the reference set, but do not identify a unique textile source.',
      },
      practice: [
        {
          id: 'for-u4-l1-q1',
          prompt: 'Twisted ribbon, paper odor, soft ash. Fiber?',
          type: 'mcq',
          options: ['Wool', 'Cotton', 'Nylon', 'Polyester'],
          answer: 'Cotton',
          explanation:
            'Cotton cellulose shows ribbon twist, burns like paper, leaves no hard bead.',
          points: 2,
        },
        {
          id: 'for-u4-l1-q2',
          prompt: 'Uniform diameter with dark specks under microscope indicates?',
          type: 'short',
          answer:
            'Manufactured synthetic fiber with delusterant titanium dioxide; natural fibers vary in diameter.',
          explanation: 'Uniformity plus delusterant separates synthetics from cotton and wool.',
          points: 3,
        },
        {
          id: 'for-u4-l1-q3',
          prompt: 'Burnt-hair odor plus crushable black bead and scales suggests:',
          type: 'mcq',
          options: ['Polyester', 'Wool', 'Cotton', 'Acrylic'],
          answer: 'Wool',
          explanation: 'Protein keratin smells like hair and shows scale cuticle.',
          points: 2,
        },
        {
          id: 'for-u4-l1-q4',
          prompt: 'How does warm dilute NaOH split wool from cotton?',
          type: 'short',
          answer:
            'Dissolves protein wool and silk but leaves cellulose cotton intact, separating animal from plant fibers.',
          explanation: 'Alkali hydrolyzes proteins while cellulose resists dilute alkali.',
          points: 3,
        },
        {
          id: 'for-u4-l1-q5',
          prompt: 'Why are fibers class evidence?',
          type: 'mcq',
          options: [
            'They degrade fast',
            'Mass production shares traits across many garments',
            'They cannot be seen',
            'They never transfer',
          ],
          answer: 'Mass production shares traits across many garments',
          explanation:
            'Common manufacture means matches support association but rarely individualize.',
          points: 2,
        },
        {
          id: 'for-u4-l1-q6',
          prompt: 'Why does manufactured fiber not always mean a wholly synthetic polymer?',
          type: 'short',
          answer:
            'Regenerated fibers such as rayon are manufactured from cellulose-derived material.',
          explanation: 'Manufacturing process and chemical family are different categories.',
          points: 3,
        },
        {
          id: 'for-u4-l1-q7',
          prompt:
            'Why might one recovered fiber fail to represent every component of a blended fabric?',
          type: 'short',
          answer: 'Transfer and sampling can recover only a small subset of the source fibers.',
          explanation: 'Within-source variation must be considered before claiming exclusion.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Compare a questioned fiber with three references',
        problem:
          'The questioned fiber is a flattened twisted ribbon with a cellulose-associated reference response. Reference A is cotton, B is wool, and C is a uniform synthetic filament.',
        steps: [
          'The ribbon-like convolution supports the cotton reference more strongly than the scaled wool or uniform filament examples.',
          'The cellulose-associated behavior supplies a compatible chemical-class observation.',
          'Together the observations support cotton-like class identification within the exercise set.',
          'They do not establish one garment or the time of transfer; many cotton textiles share those broad characteristics.',
        ],
        conclusion:
          'Material classification and source attribution are separate steps even when several observations agree.',
      },
    },
    {
      id: 'for-u4-l2',
      unitId: 'for-u4',
      title: 'Hair Morphology and Comparison',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Label cuticle, cortex, medulla, root, and shaft from diagrams',
        'Distinguish human vs animal hair and body-area traits',
        'Use medullary index and pigment patterns for comparison',
        'Explain why hair needs DNA for individualization',
      ],
      sections: [
        {
          heading: 'Hair Anatomy',
          body: [
            'A hair has an outer cuticle of overlapping scales, a cortex with pigment granules and cortical fusi, and a central medulla that may be continuous, interrupted, fragmented, or absent. The root with follicular tissue holds nuclear DNA; the shaft holds mitochondrial DNA but little nuclear DNA when shed.',
            'Growth phases matter: anagen growing hairs have fleshy roots, telogen shed hairs have club roots. Forcibly pulled hairs may show stretched follicles and sheath. Competition photos test whether a root can yield nuclear DNA or only mitochondrial.',
          ],
        },
        {
          heading: 'Human vs Animal',
          body: [
            'Human hairs have narrow medulla less than one-third shaft width or absent, fine pigment, and imbricate cuticle. Animal hairs often have wide medulla over one-half width, coarse pigment, and coronal or spinous scales. Deer shows lattice medulla, rabbit shows multiserial ladder.',
            'Calculate medullary index as medulla width divided by shaft width. Human typically under 0.33, many animals over 0.50. State both measurement and threshold rather than guessing from blurry images.',
          ],
        },
        {
          heading: 'Body Area and Treatment',
          body: [
            'Scalp hairs are long with even diameter, pubic hairs are coarse with wide diameter variation and buckled tips, facial hairs are coarse with triangular cross-section. Bleached or dyed hairs show altered cortex color and cuticle damage. Split ends and weathering indicate age and exposure.',
            'These traits help reconstruct source area but do not identify a person. Record length, color, curl, tip shape, and damage before comparison. Cosmetic treatment is class information shared by many people.',
          ],
        },
        {
          heading: 'Comparison Protocol',
          body: [
            'Compare known and questioned hairs side by side for color, length, diameter, medulla type, pigment distribution, cuticle, and tip. Require agreement on all major traits to state consistent with. One major difference, such as continuous wide animal medulla vs absent human medulla, eliminates.',
            'Microscopy cannot individualize human hair. State that nuclear DNA or mitochondrial sequencing would be needed for stronger association. This disciplined limit is exactly what judges award in written analysis.',
          ],
        },
        {
          heading: 'Collection Pitfalls',
          body: [
            'Collect with forceps, never tape that obscures scales, and package in paper folds. Control hairs from each body area separately because scalp and pubic hair differ on one person. Avoid mixed piles where transfer direction cannot be determined.',
            'Shed hairs without roots limit DNA to mitochondrial maternal lineage. Explain this in analysis: shaft suitable for microscopy and mtDNA, root needed for nuclear STR individualization.',
          ],
        },
        {
          heading: 'Use hair morphology to narrow, not uniquely identify',
          body: [
            'The cuticle forms the outer scale layer, the cortex contains much of the pigment and structural material, and the medulla occupies a variable central region. A medulla may be continuous, interrupted, fragmented, or absent. Diameter, pigment distribution, root shape, and treatment features can add descriptive information. A medullary index is medulla width divided by total shaft width, measured at a comparable location. It is a dimensionless ratio, and it can vary along a hair. Common teaching ranges are tendencies, not universal boundaries that identify every species.',
            'Microscopic hair comparison cannot reliably identify one person to the exclusion of all others. Human hairs vary within one individual by body area, growth phase, age, treatment, and sampling location. Similarity therefore supports a limited association, while meaningful differences can sometimes exclude a particular sampled reference. The reference must capture the relevant variation. A single known hair may be an inadequate comparison for a group of questioned hairs.',
          ],
        },
        {
          heading: 'Connect biological material with analytical possibilities',
          body: [
            'A root with attached tissue can provide cellular material for nuclear DNA analysis. A shaft may contain mitochondrial DNA and, with specialized methods, other analyzable material. Avoid the absolute rule that no root means no possible nuclear analysis: laboratory capability, preservation, and method matter. Mitochondrial comparisons often have lower individual discrimination because maternal relatives can share a lineage. Neither a microscopic resemblance nor a lineage association establishes when or how a hair was deposited.',
            'Growth phases influence root appearance, but a photographed root alone does not reliably reconstruct every circumstance of removal. Cosmetic treatment can create color boundaries or structural changes, yet weathering and natural variation can complicate interpretation. Record observations first and use an appropriately qualified reference comparison. The virtual case focuses on whether the available morphology supports inclusion, exclusion, or an inconclusive result, while keeping individual source claims outside what the observations can establish.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Medulla',
          definition: 'Central hair canal; continuous, interrupted, fragmented, or absent.',
        },
        {
          term: 'Medullary index',
          definition: 'Medulla width divided by shaft width; human usually under 0.33.',
        },
        {
          term: 'Cuticle',
          definition: 'Outer scale layer; imbricate in humans, coronal or spinous in animals.',
        },
        {
          term: 'Cortex',
          definition: 'Pigmented mid-layer holding granules used for comparison.',
        },
        {
          term: 'Anagen vs telogen',
          definition: 'Growing vs shed phase; root form affects DNA availability.',
        },
        {
          term: 'mtDNA',
          definition:
            'Mitochondrial DNA in shaft; maternal lineage, less discriminating than nuclear STR.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Hair comparison case file',
        instructions: 'Compare the questioned hair with the range of known samples.',
        observations: [
          {
            label: 'Questioned sample',
            result: 'Pigment distribution and shaft diameter overlap the known sample range.',
          },
          {
            label: 'Reference range',
            result: 'Known hairs vary noticeably in medulla continuity.',
          },
          {
            label: 'Analytical limit',
            result: 'No DNA result is supplied; morphology is the only comparison.',
          },
        ],
        question: 'Which conclusion is defensible?',
        options: [
          'Morphologically consistent, without individual identification',
          'The donor is uniquely proven',
          'A shared medulla pattern proves the time of contact',
        ],
        correct: 0,
        explanation:
          'The evidence supports compatibility within the observed range. Morphology alone does not identify an individual or establish deposition timing.',
      },
      practice: [
        {
          id: 'for-u4-l2-q1',
          prompt: 'Medulla width 40 um, shaft 60 um. Index and inference?',
          type: 'short',
          answer: 'Index 0.67, above 0.5, consistent with animal hair rather than human.',
          explanation: 'Wide medulla over half the shaft favors animal origin.',
          points: 3,
        },
        {
          id: 'for-u4-l2-q2',
          prompt: 'Shed hair without follicle can best yield:',
          type: 'mcq',
          options: ['Nuclear STR', 'Mitochondrial DNA', 'ABO proteins', 'No DNA'],
          answer: 'Mitochondrial DNA',
          explanation: 'Shaft keratin holds mtDNA but little nuclear DNA without root tissue.',
          points: 2,
        },
        {
          id: 'for-u4-l2-q3',
          prompt: 'Why can microscopy alone not individualize human hair?',
          type: 'short',
          answer:
            'Many people share color, diameter, and medulla traits; microscopy is class comparison needing DNA for individualization.',
          explanation:
            'Overlap in population traits limits conclusions to consistent with or elimination.',
          points: 3,
        },
        {
          id: 'for-u4-l2-q4',
          prompt: 'What is the proper role of scale and medulla patterns in hair comparison?',
          type: 'mcq',
          options: [
            'Part of a combined morphological assessment',
            'Unique identification from one feature',
            'Proof of exact deposition time',
            'A replacement for all DNA methods',
          ],
          answer: 'Part of a combined morphological assessment',
          explanation: 'Individual patterns can vary and require appropriate reference comparison.',
          points: 2,
        },
        {
          id: 'for-u4-l2-q5',
          prompt: 'Best packaging for hair?',
          type: 'mcq',
          options: [
            'Plastic bag',
            'Paper fold with forceps',
            'Tape lift left on tape',
            'Mixed pile',
          ],
          answer: 'Paper fold with forceps',
          explanation: 'Paper avoids static and preserves scales; separate folds prevent mixing.',
          points: 2,
        },
        {
          id: 'for-u4-l2-q6',
          prompt: 'Calculate the medullary index for a 30 μm medulla in a 100 μm shaft.',
          type: 'short',
          answer: '0.30, with no units.',
          explanation: 'The ratio compares widths at the same location.',
          points: 3,
        },
        {
          id: 'for-u4-l2-q7',
          prompt: 'Why should several reference hairs be examined?',
          type: 'short',
          answer:
            'Hair characteristics vary within a person by location, growth, treatment, and individual strands.',
          explanation:
            'A reference range is needed to interpret agreement or difference responsibly.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Calculate and interpret a medullary index',
        problem: 'At one measured point, a hair shaft is 80 μm wide and the medulla is 20 μm wide.',
        steps: [
          'Use the same units in numerator and denominator: 20/80 = 0.25.',
          'The ratio is unitless because the micrometer units cancel.',
          'Record where on the shaft the measurements were taken and consider repeated locations if the medulla varies.',
          'Do not convert this one ratio into a unique human or animal source identification. Combine morphology and validated reference information.',
        ],
        conclusion: 'A precise ratio can still support only a limited biological inference.',
      },
    },
    {
      id: 'for-u5-l1',
      unitId: 'for-u5',
      title: 'Paper and Thin-Layer Chromatography',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Calculate Rf and compare spots under identical solvent conditions',
        'Explain stationary vs mobile phase and polarity effects',
        'Detect inks and dyes with UV and iodine visualization',
        'Avoid front overshoot, overloading, and mixed lanes',
      ],
      sections: [
        {
          heading: 'How Chromatography Separates',
          body: [
            'Chromatography partitions compounds between a stationary phase such as paper cellulose or silica and a mobile solvent climbing by capillarity. Polar compounds cling to polar stationary phases and move little; nonpolar compounds ride the solvent farther. Different dyes therefore stop at different heights.',
            'Retention factor Rf equals distance from origin to spot center divided by distance from origin to solvent front, both measured in the same units. Rf is always between zero and one. It is only comparable when paper, solvent, temperature, and saturation match, so run knowns and unknowns on the same strip.',
          ],
        },
        {
          heading: 'Rf Calculation Drill',
          body: [
            'Mark the origin in pencil, never ink which separates itself. Spot tiny, dry, and re-spot to concentrate without widening. Develop in a covered chamber with shallow solvent below the origin. Mark the front immediately on removal before it evaporates.',
            'Example: spot center 3.6 cm, front 6.0 cm gives Rf 0.60. Measure to spot center, not leading edge. If a pen shows spots at Rf 0.25 blue and 0.60 red while suspect ink shows only 0.60 red, the inks differ and suspect is eliminated as sole source.',
          ],
        },
        {
          heading: 'TLC vs Paper',
          body: [
            'Thin-layer plates coat silica or alumina on plastic or glass and give sharper spots and faster runs than paper. Silica is polar, so nonpolar solvents move nonpolar dyes farther. UV light reveals fluorescent spots, iodine vapor stains organics brown reversibly.',
            'Paper suits water-soluble inks and classroom safety. TLC suits lipstick, plant pigments, and drug-adjacent dyes where allowed. Choose visualization to match chemistry: UV for aromatics, iodine for unsaturates, ninhydrin for amino acids if the event permits.',
          ],
        },
        {
          heading: 'Reading Forensic Strips',
          body: [
            'Count spots, record color in daylight and UV, and compute each Rf. Co-migration with a known supports consistency but tailing or double spots suggest mixtures. A questioned ransom note matching only two of three dye bands is not a match.',
            'Document solvent system and front shape. Slanted fronts mean uneven saturation or chamber tilt. Note it rather than hiding it, then compare only lanes from the same plate.',
          ],
        },
        {
          heading: 'Classic Errors',
          body: [
            'Overloading makes streaks that merge separate dyes. Let spots dry fully and keep diameters under 3 mm. Submerging the origin dissolves spots into solvent reservoir and ruins the run. Keep solvent depth below the origin line.',
            'Touching silica with fingers deposits oils that distort lanes. Handle plates by edges, use pencil labels, and do not move plates while wet. Photograph with a ruler for Rf verification in written analysis.',
          ],
        },
        {
          heading: 'Explain migration through competing interactions',
          body: [
            'Chromatographic separation depends on how components distribute between a mobile phase and a stationary environment. A component that spends relatively more time traveling with the mobile phase migrates farther under the same conditions. One that interacts more strongly with the stationary phase migrates less. Paper and thin-layer chromatography use related separation logic, but their stationary environments and specific interactions differ. Solvent composition can change the ordering and spacing of components, so a retention factor is not a universal constant printed into a molecule.',
            "Mark an origin baseline and compare each spot's center with the solvent front measured from that same baseline. Measuring the spot from the paper edge while measuring the front from the baseline gives a false ratio. A broad or streaked spot makes its center uncertain; a tilted front may require a local reference. Small application spots, appropriate loading, and consistent development conditions improve interpretability in an actual controlled demonstration. The simulation below holds conditions constant when front distance changes, so the spot moves proportionally with a chosen Rf.",
          ],
        },
        {
          heading: 'Compare complete patterns and uncertainty',
          body: [
            'An ink mixture may separate into multiple visible components. Compare the number of detectable spots, their colors or detection responses, and their relative positions. One shared spot does not establish identical mixtures, and a missing faint spot may reflect sensitivity rather than a true compositional difference. Reference and questioned samples developed together provide a stronger comparison than unrelated published Rf values. Temperature, solvent, substrate, sample load, and development conditions can all influence a result.',
            'Report uncertainty in a way that reflects the measurement. If a spot center could reasonably lie between 3.8 and 4.2 cm and the front is near 8.0 cm, the corresponding Rf interval is approximately 0.475 to 0.525 before including front uncertainty. Do not claim a chemical mismatch solely because two rounded ratios differ by 0.01 when the method is less precise than that. Conversely, a clearly distinct additional band under valid conditions may be more informative than near agreement in one shared component.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Rf',
          definition:
            'Spot distance divided by front distance; zero to one under matched conditions.',
        },
        {
          term: 'Stationary phase',
          definition: 'Fixed coating such as paper or silica that retains polar compounds.',
        },
        {
          term: 'Mobile phase',
          definition: 'Climbing solvent carrying compounds by polarity and solubility.',
        },
        {
          term: 'Origin line',
          definition: 'Pencil baseline for spotting, kept above solvent level.',
        },
        {
          term: 'Solvent front',
          definition: 'Leading solvent edge marked before evaporation for Rf math.',
        },
        {
          term: 'Co-migration',
          definition: 'Same Rf as known on same plate suggesting possible same dye.',
        },
      ],
      simulation: {
        kind: 'model',
        model: 'chromatography',
        title: 'Chromatography migration bench',
        instructions: 'Move the solvent front and vary the component’s relative migration.',
        challenge: 'Hold Rf at 0.5 while moving the front from 4 to 8 cm.',
        takeaway:
          'The spot distance doubles while the normalized Rf remains unchanged under the model conditions.',
      },
      practice: [
        {
          id: 'for-u5-l1-q1',
          prompt: 'Spot 4.2 cm, front 7.0 cm. Rf?',
          type: 'short',
          answer: 'Rf equals 4.2 divided by 7.0 equals 0.60.',
          explanation: 'Measure origin to spot center over origin to front in same units.',
          points: 3,
        },
        {
          id: 'for-u5-l1-q2',
          prompt: 'Why must known and questioned inks share one strip?',
          type: 'mcq',
          options: [
            'To save paper',
            'Rf depends on exact solvent, paper, and conditions',
            'To mix them',
            'No reason',
          ],
          answer: 'Rf depends on exact solvent, paper, and conditions',
          explanation: 'Only side-by-side runs control temperature, saturation, and front effects.',
          points: 2,
        },
        {
          id: 'for-u5-l1-q3',
          prompt:
            'Questioned note has 2 bands, suspect pen has 3 bands with one extra at Rf 0.80. Conclusion?',
          type: 'short',
          answer:
            'Not a match as sole source; extra band means different formulation or mixture, elimination or needs explanation.',
          explanation: 'All major bands must correspond for a consistency claim.',
          points: 3,
        },
        {
          id: 'for-u5-l1-q4',
          prompt: 'Best fix for streaky overloaded spots?',
          type: 'mcq',
          options: [
            'Larger spots',
            'Smaller dried re-spotted origins under 3 mm',
            'Deeper solvent over origin',
            'Touch plate center',
          ],
          answer: 'Smaller dried re-spotted origins under 3 mm',
          explanation: 'Concentrated small origins give tight spots without streaking.',
          points: 2,
        },
        {
          id: 'for-u5-l1-q5',
          prompt: 'Silica TLC, polar dye barely moves in hexane. Why?',
          type: 'mcq',
          options: [
            'Dye evaporated',
            'Polar dye binds polar silica and nonpolar solvent cannot carry it',
            'Front too high',
            'Pencil interfered',
          ],
          answer: 'Polar dye binds polar silica and nonpolar solvent cannot carry it',
          explanation: 'Partition favors stationary phase until solvent polarity increases.',
          points: 2,
        },
        {
          id: 'for-u5-l1-q6',
          prompt: 'A spot moves 3.6 cm and the front 6.0 cm. Calculate Rf.',
          type: 'short',
          answer: '0.60; it is unitless.',
          explanation: 'Both distances must start at the same baseline.',
          points: 3,
        },
        {
          id: 'for-u5-l1-q7',
          prompt:
            'Why should reference and questioned inks be developed under matching conditions?',
          type: 'short',
          answer:
            'Rf and component visibility depend on solvent, stationary phase, temperature, loading, and other conditions.',
          explanation: 'A fair comparison controls factors that affect migration.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Calculate and compare an ink pattern',
        problem:
          'The solvent front travels 8.0 cm from the baseline. Two questioned spots travel 2.0 and 6.0 cm. A reference has spots at 2.0, 4.0, and 6.0 cm under the same conditions.',
        steps: [
          'Questioned Rf values are 2/8 = 0.25 and 6/8 = 0.75.',
          'Reference values are 0.25, 0.50, and 0.75.',
          'Two components agree, but the reference has an additional detectable component.',
          'Investigate sensitivity, sampling, and degradation before deciding whether the difference supports exclusion. Do not report the full patterns as identical.',
        ],
        conclusion:
          'Compare the complete developed pattern and its detection limits, not a single convenient spot.',
      },
    },
    {
      id: 'for-u5-l2',
      unitId: 'for-u5',
      title: 'Mass Spectrometry and Spectroscopy',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Read molecular ion, base peak, and M+1, M+2 isotope clues',
        'Use common fragments such as 43, 57, 77, 91 to infer structure',
        'Interpret IR carbonyl and OH bands and simple UV logic',
        'Match spectra to candidates without overclaiming',
      ],
      sections: [
        {
          heading: 'Mass Spec Basics',
          body: [
            'Electron impact mass spectrometry blasts molecules into charged fragments sorted by mass to charge m/z. The molecular ion M+ gives molar mass when visible. The base peak is the tallest peak at 100 percent abundance and reflects the most stable fragment, not necessarily the largest mass.',
            'Nitrogen rule helps: odd nominal mass M+ suggests odd nitrogen count. Loss patterns matter: M minus 15 is methyl loss, M minus 18 is water, M minus 29 is ethyl, M minus 31 is methoxy. Track neutral losses before guessing structures.',
          ],
        },
        {
          heading: 'Isotopes M+1 and M+2',
          body: [
            'Carbon-13 gives M+1 about 1.1 percent per carbon, so a 6-carbon molecule shows M+1 near 6.6 percent of M+. Chlorine gives M+2 about one-third of M with 35Cl to 37Cl near 3 to 1. Bromine gives M and M+2 nearly equal from 79Br and 81Br.',
            'Competition spectra often plant Cl or Br to test this. Equal M and M+2 near 100 and 50 percent screams bromine. A 3 to 1 pair two units apart screams chlorine. State ratio explicitly in analysis.',
          ],
        },
        {
          heading: 'Fragment Library',
          body: [
            'Memorize workhorses: m/z 29 ethyl, 43 acetyl or propyl, 57 butyl, 77 phenyl C6H5+, 91 tropylium from toluene-like benzyl, 105 benzoyl. A strong 77 plus 105 suggests benzoyl compound; 91 base peak suggests benzyl or alkyl benzene.',
            'Alkanes fragment every 14 units for CH2, alcohols lose 18 water and 31, amines show odd masses from nitrogen rule. Do not force a full structure when data fit a functional class; report class plus molar mass when isomers remain.',
          ],
        },
        {
          heading: 'IR and UV-Vis Support',
          body: [
            'Infrared stretches identify bonds: broad 3200 to 3600 OH or NH, sharp 1700 carbonyl, 1600 aromatic, 2200 nitrile or alkyne. A broad 2500 to 3300 plus 1710 suggests carboxylic acid. IR gives functional groups, mass gives mass and fragments; together they narrow candidates.',
            'UV-Vis and flame emission add conjugation and metal clues, but Division C usually limits UV to chromatography visualization and IR to printed spectra. Link color to conjugation cautiously: highly conjugated dyes absorb visible light, simple alcohols do not.',
          ],
        },
        {
          heading: 'Writing Spectra Conclusions',
          body: [
            'Structure your paragraph as molar mass from M+, isotope evidence, base peak and two fragments, IR cross-check, then candidate ranking. Example: M+ 92 with base 91 and IR aromatic bands fits toluene at 92 better than unrelated mass 92 isomers, consistent with a benzyl fragment.',
            'Avoid claiming a unique structure from mass alone when isomers share fragments. List the best fit plus one alternative and the extra test that would decide, such as IR carbonyl or chromatography Rf.',
          ],
        },
        {
          heading: 'Read a mass spectrum from its axes',
          body: [
            'A mass spectrum plots ion signal against mass-to-charge ratio, m/z. The tallest peak is the base peak and is assigned 100% relative intensity; it need not be the molecular ion. Fragment peaks arise when ionized molecules break into charged and neutral products. Only the charged products are measured in the mass spectrum. A molecular-ion signal may be weak or absent depending on the compound and ionization method, so the highest visible mass peak is not automatically the intact molecule.',
            'For singly charged ions, nominal m/z often corresponds closely to nominal ion mass, but charge state matters. An isotope pattern can supply evidence about elemental composition: chlorine- and bromine-containing ions often produce characteristic M and M+2 relationships under appropriate assumptions. The pattern must be interpreted with charge, overlapping fragments, abundance, and instrument resolution in mind. A single isotope clue narrows possibilities rather than identifying every structure with those elements.',
          ],
        },
        {
          heading: 'Use complementary spectra and avoid one-peak identification',
          body: [
            'An infrared spectrum probes vibrational absorption and can support functional-group interpretation. A mass spectrum provides mass-to-charge and fragmentation evidence. UV-visible measurements probe electronic transitions in a different spectral range. These techniques do not measure the same thing, so agreement across them can be complementary. In a simplified exercise, a carbonyl-related IR feature plus a plausible molecular ion and fragmentation pattern may support a candidate more strongly than any one signal.',
            'Library comparison depends on the reference collection, ionization conditions, data quality, and similarity criteria. Common fragments appear in many compounds. A strong m/z 91 peak, for example, can be compatible with certain alkyl-aromatic fragmentation patterns but does not uniquely identify toluene by itself. Compare the whole informative spectrum and the candidate set. If two candidates remain plausible, identify which additional peak, accurate-mass measurement, chromatographic separation, or other validated observation would distinguish them. Do not invent an absent molecular ion simply to complete a preferred story.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Molecular ion M+',
          definition: 'Unfragmented ion giving nominal molar mass when present.',
        },
        {
          term: 'Base peak',
          definition: 'Tallest peak normalized to 100 percent; most stable fragment.',
        },
        {
          term: 'M+2 pattern',
          definition: 'Isotope pair flagging Cl 3 to 1 or Br 1 to 1 two units above M+.',
        },
        {
          term: 'Tropylium m/z 91',
          definition: 'Stable C7H7+ fragment suggesting benzyl or alkyl benzene.',
        },
        {
          term: 'Neutral loss',
          definition: 'Mass difference such as 15, 18, or 29 inferring lost group.',
        },
        {
          term: 'Carbonyl IR',
          definition: 'Strong band near 1700 wavenumbers for C=O.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Spectrum interpretation bench',
        instructions: 'Reveal peak information and decide the strongest supported claim.',
        observations: [
          {
            label: 'Base peak',
            result: 'The largest signal is m/z 91.',
          },
          {
            label: 'Candidate comparison',
            result: 'Two candidates in the supplied reference set produce m/z 91.',
          },
          {
            label: 'Mass constraint',
            result: 'The intact-ion region is too weak to interpret reliably in this record.',
          },
        ],
        question: 'What should you conclude?',
        options: [
          'The spectrum does not yet distinguish the two candidates',
          'm/z 91 uniquely proves toluene',
          'The base peak must equal molecular mass',
        ],
        correct: 0,
        explanation:
          'A common fragment is not a unique identifier, and an uninformative intact-ion region leaves the stated candidates unresolved.',
      },
      practice: [
        {
          id: 'for-u5-l2-q1',
          prompt: 'Tallest peak in a mass spectrum is called:',
          type: 'mcq',
          options: ['Molecular ion', 'Base peak', 'M+2', 'Solvent front'],
          answer: 'Base peak',
          explanation: 'Base peak is normalized to 100 percent abundance.',
          points: 2,
        },
        {
          id: 'for-u5-l2-q2',
          prompt: 'Equal peaks at 79 and 81 suggest which element?',
          type: 'short',
          answer: 'Bromine from 79Br and 81Br near 1 to 1 abundance.',
          explanation: 'Bromine isotope pattern is diagnostic two units apart at equal height.',
          points: 3,
        },
        {
          id: 'for-u5-l2-q3',
          prompt: 'M+ 92 with major 91 and 65. Explain inference.',
          type: 'short',
          answer:
            'Molar mass 92, loss of 1 H to tropylium 91 then acetylene loss to 65, consistent with alkyl benzene such as toluene.',
          explanation: '91 to 65 is classic aromatic fragmentation after benzyl formation.',
          points: 3,
        },
        {
          id: 'for-u5-l2-q4',
          prompt: 'IR broad 2500 to 3300 plus 1710 suggests:',
          type: 'mcq',
          options: ['Alkane', 'Carboxylic acid', 'Amine', 'Ether'],
          answer: 'Carboxylic acid',
          explanation: 'Hydrogen-bonded OH plus carbonyl together flag carboxylic acid.',
          points: 2,
        },
        {
          id: 'for-u5-l2-q5',
          prompt: 'Why not claim a unique isomer from mass fragments alone?',
          type: 'mcq',
          options: [
            'Mass spec never works',
            'Isomers can share mass and fragments; need IR or chromatography',
            'Base peak proves structure',
            'M+ is always absent',
          ],
          answer: 'Isomers can share mass and fragments; need IR or chromatography',
          explanation: 'Orthogonal data separate isomers with identical masses.',
          points: 2,
        },
        {
          id: 'for-u5-l2-q6',
          prompt: 'Distinguish base peak from molecular-ion peak.',
          type: 'short',
          answer:
            'The base peak is the most intense measured signal; a molecular-ion peak represents the ionized intact molecule under the relevant method.',
          explanation: 'The two may coincide, but need not.',
          points: 3,
        },
        {
          id: 'for-u5-l2-q7',
          prompt: 'Why can IR and mass spectrometry provide complementary evidence?',
          type: 'short',
          answer:
            'IR probes vibrational features while mass spectrometry probes ions and fragmentation at mass-to-charge values.',
          explanation:
            'Different physical measurements constrain different aspects of a candidate structure.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Reject a one-peak shortcut',
        problem:
          'A spectrum contains a strong m/z 91 fragment. Candidate A and candidate B can both produce that fragment, but their molecular masses differ.',
        steps: [
          'The shared fragment supports a compatible structural motif or fragmentation pathway, not a unique candidate.',
          'Inspect the higher-mass region for a supported molecular-ion or related mass constraint.',
          'Compare the rest of the spectrum and the measurement conditions with valid references.',
          'If the decisive mass information is unavailable, report the ambiguity and name the measurement that would resolve it.',
        ],
        conclusion:
          'A recognizable peak is the beginning of interpretation, not a complete identification.',
      },
    },
    {
      id: 'for-u6-l1',
      unitId: 'for-u6',
      title: 'Prints: Patterns and Minutiae',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Classify arches, tented arches, loops, whorls with ridge counts and deltas',
        'Identify bifurcations, endings, dots, and enclosures as minutiae',
        'Distinguish patent, plastic, and latent prints',
        'Explain AFIS as matcher, not decider, and state match thresholds',
      ],
      sections: [
        {
          heading: 'Pattern Families',
          body: [
            'Three families cover nearly all prints: arches with no delta, loops with one delta opening toward ulna or radius, and whorls with two deltas including plain whorl, central pocket, double loop, and accidental. Tented arch has a sharp upthrust but still no true delta loop.',
            'Population frequency is roughly 60 to 65 percent loops, 30 to 35 percent whorls, and 5 percent arches. Pattern alone is class evidence. Record pattern plus ridge count between core and delta for loops to add discrimination.',
          ],
        },
        {
          heading: 'Deltas, Cores, Ridge Count',
          body: [
            'A delta is the triangular ridge divergence, a core is the pattern center. Loops have one delta, whorls have two, arches have none. Ridge count tallies ridges crossing a line from core to delta, excluding the endpoints. Counts help file and compare but do not individualize alone.',
            'Practice on enlarged images: mark deltas first, then core, then count. Ulnar loops open toward the little finger, radial loops toward the thumb. Note hand and finger when given because the same pattern mirrors across hands.',
          ],
        },
        {
          heading: 'Minutiae and comparison quality',
          body: [
            'Ridge endings, bifurcations, islands, and other details contribute to a comparison through their arrangement and orientation. Examiners evaluate quality and consistency, not a universal automatic count threshold.',
            'Partial contact, pressure, smearing, and image quality can alter recorded details. A reliable incompatible feature may matter greatly, while an unclear apparent difference may be inconclusive. Document which regions are suitable for comparison before drawing a source conclusion.',
          ],
        },
        {
          heading: 'Patent, Plastic, Latent',
          body: [
            'Patent prints are visible deposits such as blood or ink. Plastic prints are 3D impressions in wax, putty, or fresh paint. Latent prints are invisible sweat and oil needing development with powder, iodine, ninhydrin, or cyanoacrylate. Competition stations often mix all three as photos or lifts.',
            'Each type needs different handling: photograph patent at scale, cast plastic without brushing, develop latent with the least destructive method first. Sequence matters and is frequently tested.',
          ],
        },
        {
          heading: 'AFIS and Testimony Limits',
          body: [
            'Automated Fingerprint Identification Systems rank candidates by algorithm score. A human examiner verifies with ACE-V: analysis, comparison, evaluation, verification. AFIS does not declare identity; examiners do, with documented minutiae.',
            'In written analysis, state pattern agreement as class consistency, then minutiae count and clarity for individualization strength. Acknowledge distortion and partial area as limits rather than forcing a match.',
          ],
        },
        {
          heading: 'Separate pattern classification from detailed comparison',
          body: [
            "Loops, whorls, and arches describe broad ridge-flow patterns. They are useful for organizing prints and excluding some incompatible possibilities, but many people share the same pattern class. A loop's opening direction must be interpreted relative to the known hand when assigning radial or ulnar terminology. A mirror image, mislabeled hand, or rotated partial print can reverse an apparently obvious answer. Orient the reference before classifying details.",
            'Minutiae include ridge endings and bifurcations, described by their relative positions and directions. Ridge width, pressure distortion, smear, and incomplete contact affect how those features appear. A short isolated mark may be a true feature or a broken portion of a poorly recorded ridge. The first question is therefore whether the image contains enough reliable information for the proposed comparison. Counting unclear marks does not turn them into reliable data.',
          ],
        },
        {
          heading: 'Evaluate quality and disagreement explicitly',
          body: [
            'There is no universal number of matching minutiae that automatically proves identity. A defensible comparison evaluates the quality, configuration, and consistency of the detail, with verification and awareness of method limits. Automated systems can return candidate lists, but a ranking score is not itself a source conclusion. Likewise, an apparent mismatch in a smudged region is different from a reproducible incompatible feature in a clear corresponding region.',
            'In a simplified competition station, a clean diagram may intentionally provide a decisive arrangement of ridge endings and bifurcations. State that your conclusion is based on the supplied diagram rather than claiming the certainty of all real-world fingerprint examination. If only a broad loop pattern is supplied, limit the conclusion to class agreement. If image quality is insufficient, inconclusive is a legitimate result. The interactive exercise emphasizes recognizing this boundary instead of rewarding a forced identification.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Arch',
          definition: 'Ridge flow with no delta; plain or tented.',
        },
        {
          term: 'Loop',
          definition: 'One-delta pattern opening ulnar or radial; needs ridge count.',
        },
        {
          term: 'Whorl',
          definition: 'Two-delta circular pattern including plain and double loop.',
        },
        {
          term: 'Minutiae',
          definition: 'Small ridge events such as bifurcation and ending used to individualize.',
        },
        {
          term: 'Latent print',
          definition: 'Invisible sweat-oil print requiring development.',
        },
        {
          term: 'ACE-V',
          definition: 'Analysis comparison evaluation verification protocol for print examiners.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Partial-print comparison laboratory',
        instructions:
          'Inspect class features and usable detail before reaching a source conclusion.',
        observations: [
          {
            label: 'Ridge flow',
            result: 'Both images show a loop pattern.',
          },
          {
            label: 'Detail quality',
            result:
              'Most of the questioned print is smeared; only two short clear segments remain.',
          },
          {
            label: 'Candidate context',
            result: 'Several reference prints share the same pattern class.',
          },
        ],
        question: 'Which result is best supported?',
        options: [
          'Class agreement; insufficient detail for stronger identification',
          'A universal two-feature threshold proves identity',
          'All loop prints come from one source',
        ],
        correct: 0,
        explanation:
          'Pattern agreement alone is common, and the available detail is insufficient. No universal count rule converts it into certainty.',
      },
      practice: [
        {
          id: 'for-u6-l1-q1',
          prompt: 'Loop vs whorl delta count?',
          type: 'mcq',
          options: ['Loop 1, whorl 2', 'Loop 2, whorl 1', 'Both 0', 'Both 2'],
          answer: 'Loop 1, whorl 2',
          explanation: 'Delta count is the fastest pattern classifier.',
          points: 2,
        },
        {
          id: 'for-u6-l1-q2',
          prompt: 'Define ridge count and its use.',
          type: 'short',
          answer:
            'Ridges crossed core to delta excluding endpoints; adds discrimination within loops but does not alone individualize.',
          explanation: 'Counts file and compare prints but need minutiae for identification.',
          points: 3,
        },
        {
          id: 'for-u6-l1-q3',
          prompt: 'Bifurcation vs ridge ending under distortion?',
          type: 'short',
          answer:
            'Pressure and smear can merge or split ridges, so verify orientation, clarity, and neighboring ridges before counting.',
          explanation:
            'Artifacts flip endings to bifurcations, requiring quality assessment first.',
          points: 3,
        },
        {
          id: 'for-u6-l1-q4',
          prompt: 'Invisible sweat print on paper is:',
          type: 'mcq',
          options: ['Patent', 'Plastic', 'Latent', 'None'],
          answer: 'Latent',
          explanation: 'Latent needs development; patent is visible, plastic is impressed.',
          points: 2,
        },
        {
          id: 'for-u6-l1-q5',
          prompt: 'AFIS top candidate means:',
          type: 'mcq',
          options: [
            'Automatic guilt',
            'Ranked candidate needing examiner ACE-V',
            'No human needed',
            'Pattern proof',
          ],
          answer: 'Ranked candidate needing examiner ACE-V',
          explanation: 'Algorithms rank; humans verify minutiae and testify.',
          points: 2,
        },
        {
          id: 'for-u6-l1-q6',
          prompt: 'Why is a shared loop pattern weaker than a detailed configuration comparison?',
          type: 'short',
          answer:
            'It is a broad class shared by many sources and contains less discriminating information.',
          explanation: 'Pattern class and individual ridge detail operate at different levels.',
          points: 3,
        },
        {
          id: 'for-u6-l1-q7',
          prompt: 'What should you do with an apparent discrepancy in a severely smudged region?',
          type: 'short',
          answer:
            'Assess whether the region is reliable enough to compare; otherwise treat the feature as uninformative rather than a certain exclusion.',
          explanation: 'Evidence quality determines whether a difference is interpretable.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Interpret a partial print',
        problem:
          'A questioned print and a reference both show a loop. The questioned image has a large smear through the region where detailed features would be compared.',
        steps: [
          'Broad pattern agreement means the reference is not excluded by that class feature alone.',
          'The smeared region prevents reliable comparison of the necessary fine detail.',
          'Do not count the shared word loop as an individualizing feature.',
          'Report class consistency with insufficient detail for a stronger source conclusion, and seek a better-quality impression if available.',
        ],
        conclusion:
          'The conclusion must scale to the usable detail, not the desire to select one person.',
      },
    },
    {
      id: 'for-u6-l2',
      unitId: 'for-u6',
      title: 'Developing Latent Prints',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Sequence methods from least to most destructive by surface',
        'Explain powder, iodine, ninhydrin, and cyanoacrylate chemistry',
        'Lift and photograph prints without destroying detail',
        'Choose method for glass, paper, and textured plastic',
      ],
      sections: [
        {
          heading: 'Least Destructive First',
          body: [
            'Begin with appropriate visual inspection and documentation, then select a validated workflow compatible with the surface, residue, and other evidence on the item. There is no universal sequence suitable for every material.',
            'Preserve visible detail before an intervention changes it. Additional processing can improve contrast or destroy useful information, so each step needs a reason. A fixed minutiae count is not a universal stopping or identification rule.',
          ],
        },
        {
          heading: 'Powders and Brushes',
          body: [
            'Powders cling to moisture and oils. Use black on light surfaces, white or fluorescent on dark, magnetic powder on textured surfaces to reduce brushing damage. Apply lightly with a fiberglass or magnetic wand; heavy brushing fills valleys and erases bifurcations.',
            'Lift with smooth tape in one motion and mount on contrast card without bubbles. Label location, orientation, date, and collector. Photograph before lifting at 1 to 1 with scale because lifts can stretch.',
          ],
        },
        {
          heading: 'Iodine and Cyanoacrylate',
          body: [
            'Iodine-based development can produce a temporary contrast response associated with components of a latent residue. Cyanoacrylate development forms polymer associated with suitable residues and is commonly used in controlled nonporous-surface workflows.',
            'Both require trained handling and appropriate facilities in physical practice. Here students interpret virtual observations only. The important lesson is that residue chemistry, surface, and processing conditions determine whether a method is informative.',
          ],
        },
        {
          heading: 'Ninhydrin on Porous Surfaces',
          body: [
            'Ninhydrin reacts with amino acids in sweat to give purple Ruhemann purple prints on paper over hours to days with humidity. Heat and steam accelerate it. It is ideal for checks, notebooks, and ransom notes where powders fail on fibers.',
            'Because ninhydrin stains paper permanently, use it after iodine and photography. DFO and 1,2-indanedione are fluorescent alternatives with better sensitivity on colored paper when the event allows them.',
          ],
        },
        {
          heading: 'Surface Decision Guide',
          body: [
            'Porous paper and nonporous glass or plastic often require different approaches. Amino-acid-sensitive methods can be useful on suitable porous materials; surface-residue methods can be useful on suitable nonporous items.',
            'Consider moisture, background, prior processing, and other analyses before selecting an approach. State why the method fits the exhibit instead of presenting a universal powder-to-fuming-to-chemical sequence.',
          ],
        },
        {
          heading: 'Choose a method by surface and residue',
          body: [
            'Fingerprint development is not one universal sequence of powder, iodine, cyanoacrylate, and ninhydrin. Surface porosity, condition, residue, environmental exposure, and other evidence needs determine an appropriate validated workflow. Nonporous surfaces keep more residue near the surface, while porous materials can absorb components. Ninhydrin targets amino acids associated with residues on suitable porous materials. Cyanoacrylate development is commonly associated with nonporous surfaces. Powder can adhere to surface residues but may be unsuitable or damaging in some circumstances.',
            'Visual inspection and photography preserve information before an intervention changes the item. Alternate illumination can reveal features that were not visible under ordinary light. A development method may improve contrast while also altering the sample, so consider DNA, ink, or trace evidence that could be affected. The decision is about the whole item and the question being investigated, not merely the fastest way to make any pattern visible.',
          ],
        },
        {
          heading: 'Document both success and limitations',
          body: [
            'Photograph developed detail with a scale and orientation information before lifting or further processing where appropriate. A lift can stretch, introduce bubbles, or fail to transfer faint features. Overdevelopment can fill valleys or create background that obscures ridge detail. The absence of a visible print after one method does not prove the item was never touched; residue may be insufficient, degraded, removed, or incompatible with the method.',
            'The virtual laboratory supplies surface information and possible outcomes. It does not provide instructions for heating glue, iodine, or other reagents. Your task is to select a compatible approach and explain why a different surface may require a different method. A scientifically strong answer also preserves an option to stop: once the relevant detail is documented, additional processing without a clear purpose can destroy information rather than improve it. Method choice should be justified with material properties and evidence priorities.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Ruhemann purple',
          definition: 'Purple product of ninhydrin with amino acids on porous paper.',
        },
        {
          term: 'Iodine fuming',
          definition: 'Reversible violet vapor development in lipid residues.',
        },
        {
          term: 'Cyanoacrylate fuming',
          definition: 'Super-glue vapor polymerizing white on nonporous latent prints.',
        },
        {
          term: 'Magnetic powder',
          definition: 'Low-abrasion powder applied by wand for delicate surfaces.',
        },
        {
          term: 'Porous vs nonporous',
          definition:
            'Paper absorbs needing chemical methods; glass holds surface residues for powder.',
        },
        {
          term: 'Lift card',
          definition: 'Contrast backing preserving tape-lifted print with labels.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Choose a print-development pathway',
        instructions: 'Inspect a virtual exhibit and select the most appropriate reasoning.',
        observations: [
          {
            label: 'Surface',
            result: 'The exhibit is uncoated absorbent paper.',
          },
          {
            label: 'Residue',
            result: 'The question concerns amino-acid-containing latent residue.',
          },
          {
            label: 'Other evidence',
            result: 'The note also has ink that may require separate comparison.',
          },
        ],
        question: 'Which decision is most appropriate?',
        options: [
          'Consider a validated porous-surface method while preserving ink evidence',
          'Apply the exact same sequence used on every plastic surface',
          'Declare no contact because the print is not visible',
        ],
        correct: 0,
        explanation:
          'Porosity and residue chemistry support a compatible method, while other evidence on the item must be considered before treatment.',
      },
      practice: [
        {
          id: 'for-u6-l2-q1',
          prompt: 'What should guide method selection for a paper note?',
          type: 'mcq',
          options: [
            'Porosity, residue chemistry, and other evidence needs',
            'A universal method order for every surface',
            'The suspect’s identity',
            'The darkest reagent',
          ],
          answer: 'Porosity, residue chemistry, and other evidence needs',
          explanation:
            'A validated workflow must fit the material; no universal sequence applies to all exhibits.',
          points: 2,
        },
        {
          id: 'for-u6-l2-q2',
          prompt: 'Why photograph iodine prints immediately?',
          type: 'short',
          answer: 'Iodine development fades as vapor leaves lipids, so delay loses ridge detail.',
          explanation: 'Reversible methods demand instant 1 to 1 photography with scale.',
          points: 3,
        },
        {
          id: 'for-u6-l2-q3',
          prompt: 'Cyanoacrylate best suits:',
          type: 'mcq',
          options: ['Porous notebook', 'Nonporous plastic and metal', 'Skin', 'Water puddle'],
          answer: 'Nonporous plastic and metal',
          explanation: 'Fumed polymer builds on surface residues in humid chambers.',
          points: 2,
        },
        {
          id: 'for-u6-l2-q4',
          prompt: 'Ninhydrin purple indicates reaction with what?',
          type: 'short',
          answer: 'Amino acids in sweat forming Ruhemann purple on paper.',
          explanation: 'Protein residues persist in paper fibers for chemical development.',
          points: 3,
        },
        {
          id: 'for-u6-l2-q5',
          prompt: 'Heavy brushing risk?',
          type: 'mcq',
          options: [
            'Better contrast always',
            'Fills valleys and erases minutiae',
            'No effect',
            'Creates DNA',
          ],
          answer: 'Fills valleys and erases minutiae',
          explanation: 'Excess powder and pressure destroy second-level detail.',
          points: 2,
        },
        {
          id: 'for-u6-l2-q6',
          prompt: 'Why is there no single development sequence suitable for every exhibit?',
          type: 'short',
          answer:
            'Surface porosity, residue, condition, and other evidence needs change method compatibility and order.',
          explanation: 'A workflow must fit the item and validated procedure.',
          points: 3,
        },
        {
          id: 'for-u6-l2-q7',
          prompt: 'Why document a developed print before attempting a lift?',
          type: 'short',
          answer:
            'Lifting can distort or lose details, so the photograph preserves the prior state and orientation.',
          explanation: 'Preservation of information precedes a potentially altering step.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Compare porous and nonporous exhibits',
        problem:
          'Exhibit A is an uncoated paper note. Exhibit B is a smooth plastic container. Both may have latent residues.',
        steps: [
          'A is porous, so residue components may enter the paper matrix. An amino-acid-sensitive method may be appropriate within a validated workflow.',
          'B is nonporous, so surface-residue methods such as an appropriate powder or cyanoacrylate process may be considered by trained personnel.',
          'For both, first preserve visible detail and consider other analyses that processing could affect.',
          'Do not prescribe identical processing order for both exhibits or interpret one negative development result as proof of no contact.',
        ],
        conclusion:
          'Surface properties and evidence priorities guide the method; a memorized universal sequence does not.',
      },
    },
    {
      id: 'for-u7-l1',
      unitId: 'for-u7',
      title: 'DNA: STR Profiling and Electrophoresis',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Outline extraction, PCR, STR loci, and capillary electrophoresis',
        'Read allele tables and random match probability logic',
        'Distinguish nuclear STR from mitochondrial and touch DNA limits',
        'Prevent contamination with controls and clean technique',
      ],
      sections: [
        {
          heading: 'From Swab to Profile',
          body: [
            'DNA workflow is extraction to release DNA, quantitation, PCR amplification of targeted short tandem repeat loci, capillary electrophoresis sizing fragments, and profile comparison. PCR copies specific STR regions millions of times so tiny crime stains become analyzable. Primers flank repeats such as AGAT repeated 8 to 15 times.',
            'Electrophoresis pulls negatively charged DNA through polymer toward positive electrode; shorter fragments arrive first. Fluorescent tags color each locus, producing peaks at allele sizes. A heterozygote shows two peaks, a homozygote one tall peak at that locus.',
          ],
        },
        {
          heading: 'STR Loci and CODIS Logic',
          body: [
            'STR comparison examines repeat-length alleles at multiple loci. In a complete single-source exercise, compare all supplied allele pairs, with an explicit assumption that the data are reliable and no dropout or mixture is modeled.',
            'A full agreement can support compatibility, while a reproducible mismatch may exclude a reference as the sole source under those assumptions. The strength of a real profile association requires an appropriate statistical framework. A generic one-in-quadrillions statement cannot be attached to every profile.',
          ],
        },
        {
          heading: 'Mixtures and Low Template',
          body: [
            'More than two alleles at multiple autosomal loci can suggest a mixture, but artifacts and quality must also be considered. Peak heights, stutter, dropout, drop-in, degradation, and shared alleles complicate interpretation. A validated model is needed; visually assigning major and minor contributors is not always sufficient.',
            'Low-level DNA can be especially sensitive to contamination and stochastic effects. Secondary transfer and background deposition can occur. A profile association concerns source information; activity-level conclusions require separate context about how and when material could have arrived.',
          ],
        },
        {
          heading: 'Mitochondrial vs Nuclear',
          body: [
            'Nuclear and mitochondrial DNA provide different kinds of information. Nuclear autosomal profiles reflect biparental inheritance; mitochondrial lineages are maternally inherited and may be shared among relatives. Y-lineage comparisons likewise have lineage-related limitations.',
            'Material quality and analytical method determine what can be recovered. A hair root with tissue can support nuclear analysis, but absence of a visible root does not establish that no nuclear information can ever be recovered. Laboratory capability and preservation matter.',
          ],
        },
        {
          heading: 'Contamination Control',
          body: [
            'Wear masks and gloves, change gloves between samples, use disposable tools, and run reagent blanks plus positive controls. PCR amplifies contamination as efficiently as evidence. Open evidence and reference samples at different times and places.',
            'Document every extraction batch with controls. A blank showing peaks invalidates the run. Judges reward answers that invalidate rather than force a match when controls fail.',
          ],
        },
        {
          heading: 'Read an STR table with an explicit sample model',
          body: [
            'A short tandem repeat locus is a region where a sequence unit is repeated. A diploid individual typically has two alleles at an autosomal locus, one inherited from each parent; the two may have the same repeat count. In a clean complete single-source teaching table, a reference must agree with both observed allele values at each compared locus. A reproducible incompatibility can exclude that reference as the sole source under the stated assumptions. Missing data and mixtures require a different interpretation.',
            'The number of detected peaks is not always identical to the number of true alleles. Stutter, drop-in, dropout, degradation, and overlapping contributors can complicate profiles. A mixture can contain more than two alleles at some loci, yet a locus with two observed peaks is not proof of a single source. Shared alleles can overlap, and low-level contributors may not be detected. A full mixture interpretation requires validated methods and assumptions, not a rule that simply counts visible peaks and assigns people.',
          ],
        },
        {
          heading: 'Separate a match statistic from the probability of guilt',
          body: [
            'A random-match probability asks how often a specified profile might occur under stated population assumptions. A likelihood ratio compares how probable the findings are under two specified propositions. Neither quantity is automatically the probability that a suspect is guilty or that a named activity occurred. The meaning depends on the propositions, population information, relatedness assumptions, data quality, and method. A very small probability under one condition cannot simply be inverted into a statement about responsibility.',
            'The classroom dataset below is intentionally a complete single-source example so you can practice allele compatibility without pretending to solve a mixed trace. Nuclear DNA profiling does not inherently require an intact visible cell, and modern methods can sometimes recover information from challenging substrates. Mitochondrial and Y-lineage comparisons answer different source questions and can be shared among relatives. Whatever the method, a source association remains separate from how or when the material arrived. Secondary transfer and background deposition belong in the activity-level discussion.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'STR',
          definition: 'Short tandem repeat; variable repeat count used for profiling.',
        },
        {
          term: 'PCR',
          definition: 'Polymerase chain reaction amplifying targeted DNA regions.',
        },
        {
          term: 'Electrophoresis',
          definition: 'Size separation of DNA fragments by charge through polymer.',
        },
        {
          term: 'Allele',
          definition: 'Repeat number at a locus, such as 10 or 12 at D7S820.',
        },
        {
          term: 'Mixture profile',
          definition: 'Multi-contributor result with extra peaks needing deconvolution.',
        },
        {
          term: 'Reagent blank',
          definition: 'No-template control revealing contamination in DNA workflow.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'STR comparison laboratory',
        diagram: 'str',
        instructions: 'Reveal two loci and the quality statement before comparing candidates.',
        observations: [
          {
            label: 'Questioned profile',
            result: 'Locus 1: 10,12. Locus 2: 8,9.',
          },
          {
            label: 'Reference profiles',
            result: 'A: 10,12 / 8,9. B: 10,11 / 8,9.',
          },
          {
            label: 'Quality statement',
            result:
              'This teaching dataset is complete, uncontaminated, and single-source; no dropout is modeled.',
          },
        ],
        question: 'Which conclusion follows?',
        options: [
          'A remains compatible; B is excluded as sole source in this model',
          'Both are identical because locus 2 agrees',
          'A is proven responsible for the incident',
        ],
        correct: 0,
        explanation:
          'The locus-1 mismatch excludes B under the stated assumptions. A’s compatibility does not establish unique identity or activity.',
      },
      practice: [
        {
          id: 'for-u7-l1-q1',
          prompt: 'Heterozygote at one STR locus shows:',
          type: 'mcq',
          options: ['One peak', 'Two peaks', 'No peaks', 'Three peaks'],
          answer: 'Two peaks',
          explanation: 'Two different repeat lengths amplify and separate by size.',
          points: 2,
        },
        {
          id: 'for-u7-l1-q2',
          prompt: 'A high-quality profile agrees at all supplied loci. What wording is supported?',
          type: 'short',
          answer:
            'The reference is compatible under the stated assumptions; strength requires an appropriate profile-specific statistical evaluation.',
          explanation:
            'Agreement is not automatically a probability of guilt or an activity-level conclusion.',
          points: 3,
        },
        {
          id: 'for-u7-l1-q3',
          prompt: 'Three peaks at several loci indicates:',
          type: 'mcq',
          options: ['Single source', 'Mixture of contributors', 'Failed PCR', 'Protein'],
          answer: 'Mixture of contributors',
          explanation: 'More than two alleles per locus reveals multiple DNA sources.',
          points: 2,
        },
        {
          id: 'for-u7-l1-q4',
          prompt: 'Why might mitochondrial DNA be considered for a degraded hair shaft?',
          type: 'short',
          answer:
            'It is present in many copies and may remain analyzable when other targets are difficult; method and preservation still matter.',
          explanation: 'Absence of a visible root does not prove every nuclear method must fail.',
          points: 3,
        },
        {
          id: 'for-u7-l1-q5',
          prompt: 'Reagent blank shows peaks. Action?',
          type: 'mcq',
          options: [
            'Ignore and match anyway',
            'Invalidate run and investigate contamination',
            'Average the blank',
            'Add more suspect DNA',
          ],
          answer: 'Invalidate run and investigate contamination',
          explanation: 'Contaminated blanks undermine every profile in the batch.',
          points: 2,
        },
        {
          id: 'for-u7-l1-q6',
          prompt: 'Why do two peaks at one STR locus not prove that a sample has one contributor?',
          type: 'short',
          answer:
            'Multiple contributors may share alleles, and low-level alleles may be undetected.',
          explanation:
            'Peak count must be interpreted across loci and with validated mixture assumptions.',
          points: 3,
        },
        {
          id: 'for-u7-l1-q7',
          prompt: 'Why is a random-match probability not the probability of guilt?',
          type: 'short',
          answer:
            'It concerns profile frequency under specified conditions, not the complete competing explanations or responsibility for an event.',
          explanation:
            'Conditional probabilities answer different questions and cannot be reversed automatically.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Compare complete single-source allele pairs',
        problem:
          'The questioned profile is locus 1: 10,12 and locus 2: 8,9. Reference A is 10,12 and 8,9. Reference B is 10,11 and 8,9.',
        steps: [
          'Compare both alleles at locus 1. A agrees; B has 11 where the questioned profile has 12.',
          'Compare locus 2. Both references agree there, but that does not cancel the locus-1 incompatibility for B.',
          'Under the supplied clean complete single-source assumptions, B is excluded as the sole source and A remains compatible.',
          'A two-locus exercise is not a unique identification or a guilt determination. More loci and a valid statistical framework would be needed for a stronger real-world source evaluation.',
        ],
        conclusion:
          'A supported incompatibility can be decisive within a defined model; agreement still requires appropriate interpretation.',
      },
    },
    {
      id: 'for-u7-l2',
      unitId: 'for-u7',
      title: 'Blood: ABO Genetics and Spatter',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Predict ABO types from alleles IA, IB, i and agglutination',
        'Sequence presumptive tests: luminol, phenolphthalein, TMB, confirmatory logic',
        'Calculate impact angle from width over length and read spatter direction',
        'Distinguish transfer, drip, cast-off, and expirated patterns cautiously',
      ],
      sections: [
        {
          heading: 'ABO Genetics and Typing',
          body: [
            'A and B alleles are codominant; each is dominant to the common O allele in the simplified teaching model. AA or AO gives type A, BB or BO gives B, AB gives AB, and OO gives O. A phenotype need not uniquely specify genotype.',
            'In valid forward typing, anti-A agglutination supports A antigen and anti-B agglutination supports B antigen. Both responses support AB; neither supports O only with valid controls. ABO is class evidence, and population frequencies vary, so agreement does not uniquely identify a donor.',
          ],
        },
        {
          heading: 'Presumptive Blood Tests',
          body: [
            'Luminol glows blue in dark with heme-catalyzed oxidation, useful for washed scenes but false positives with bleach and rust. Phenolphthalein or Kastle-Meyer turns pink with heme peroxidase activity. Tetramethylbenzidine TMB turns blue-green. All are presumptive and need confirmatory crystal or immunochromatographic tests.',
            'Sequence from least destructive: photograph, luminol for location, then swab for Kastle-Meyer or TMB, then lab confirmation such as Takayama hemochromogen crystals or anti-human hemoglobin cards. Human vs animal requires immunological confirmation, never color alone.',
          ],
        },
        {
          heading: 'Impact Angle Math',
          body: [
            'A falling drop makes a circle; an angled impact makes an ellipse. Impact angle theta satisfies arcsin of width divided by length. Example: width 6 mm, length 12 mm gives ratio 0.5 and arcsin 30 degrees. Measure the stain body, not tail or spines.',
            'Direction comes from the pointed tail and satellite spatter away from travel: the drop points in its travel direction. Combine multiple stains with stringing or software to estimate area of origin in 3D. Single stains give angle and direction, not origin alone.',
          ],
        },
        {
          heading: 'Pattern Families',
          body: [
            'Passive drips show round drops with satellites. Transfer shows smeared wipe or swipe with feathered edges. Cast-off from a swung object makes linear arcs of similar stains. Impact spatter radiates forward and back from force. Expirated blood shows air bubbles and diluted mucus strands.',
            'Do not diagnose expirated vs impact from one photo without bubbles, strands, or context. State competing hypotheses and the extra view that would decide, such as close-up for bubbles or luminol for cleaned trails.',
          ],
        },
        {
          heading: 'Genetics Plus Spatter Case',
          body: [
            'An anti-A-only response supports type A in a valid forward-typing exercise. A compatible reference remains one of many possible sources sharing that class, and population frequencies vary.',
            'An elliptical stain can separately support an ideal impact-angle estimate. Neither blood type nor one angle establishes the complete deposition activity. Keep source classification, geometry, and event reconstruction as distinct levels of inference.',
          ],
        },
        {
          heading: 'Interpret ABO typing at the correct level',
          body: [
            'ABO typing compares red-cell surface antigens with reagents containing known antibodies. Agglutination with anti-A and not anti-B supports type A in a valid forward-typing exercise. Both reactions support AB; neither supports O only when controls and procedure are valid. The phenotype does not uniquely specify genotype: type A can arise from two A alleles or an A allele with O, while AB reflects codominant A and B expression. In a genetic cross, list parental alleles and possible combinations rather than treating the blood-group letter as a single inherited object.',
            'ABO agreement is class evidence. Population frequencies differ across groups, so one universal percentage should not be attached to every sample. A type incompatibility may exclude a person as the sole source of a particular properly typed stain under the exercise assumptions, but it does not eliminate that person from an entire incident. The stain could belong to a different participant or come from another time. This source-versus-activity distinction remains essential even for a straightforward classroom test.',
          ],
        },
        {
          heading: 'Treat stain geometry as a constrained physical model',
          body: [
            'For an ideal ellipse produced on a suitable flat surface, width divided by length estimates the sine of the angle measured from the surface. The ratio must lie between zero and one. Measure the main elliptical body, excluding tails and spines. A nearly circular body corresponds to a near-perpendicular impact. An elongated body corresponds to a shallower angle. Keep the calculator in degrees if the answer is requested in degrees; using radians without conversion produces a numerical error.',
            'Surface texture, absorbency, distortion, overlapping stains, and uncertain boundaries can limit the ideal model. Several stains may support an area-of-convergence or origin analysis, but one stain does not locate the complete three-dimensional source. Pattern labels also require context: a collection of small stains does not by itself prove a particular weapon or exact action. The simulator exposes the mathematical relation while explicitly omitting those broader reconstruction claims. Source typing and geometric reconstruction answer different questions and should appear as separate lines in a report.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Agglutination',
          definition: 'Clumping of red cells with matching antiserum for ABO typing.',
        },
        {
          term: 'Kastle-Meyer',
          definition: 'Phenolphthalein presumptive pink test for heme peroxidase.',
        },
        {
          term: 'Impact angle',
          definition: 'Arcsin width over length from elliptical bloodstain.',
        },
        {
          term: 'Area of origin',
          definition: '3D convergence of trajectories from multiple spatter stains.',
        },
        {
          term: 'Cast-off',
          definition: 'Linear pattern flung from moving bloody object.',
        },
        {
          term: 'Expirated blood',
          definition: 'Blown blood with bubbles and mucus strands from airway.',
        },
        {
          term: 'Secretor',
          definition: 'Person secreting ABO antigens in fluids; refines blood evidence.',
        },
      ],
      simulation: {
        kind: 'model',
        model: 'bloodstain',
        title: 'Ideal stain-angle laboratory',
        instructions: 'Change ellipse length and width-to-length ratio.',
        challenge: 'Keep ratio 0.5 while doubling length. Explain why the angle remains 30°.',
        takeaway: 'Angle depends on shape ratio, not the absolute size of the ideal ellipse.',
      },
      practice: [
        {
          id: 'for-u7-l2-q1',
          prompt: 'Parents AO x BO can have child type:',
          type: 'mcq',
          options: ['O only', 'A, B, AB, or O', 'AB only', 'B only'],
          answer: 'A, B, AB, or O',
          explanation: 'IAi x IBi crosses yield all four ABO phenotypes.',
          points: 2,
        },
        {
          id: 'for-u7-l2-q2',
          prompt: 'Stain width 4 mm length 8 mm. Angle?',
          type: 'short',
          answer: 'Ratio 0.5, arcsin gives 30 degrees impact angle.',
          explanation: 'Theta equals arcsin width divided by length measured on stain body.',
          points: 3,
        },
        {
          id: 'for-u7-l2-q3',
          prompt: 'Kastle-Meyer pink means:',
          type: 'mcq',
          options: [
            'Confirmed human blood',
            'Presumptive blood needing confirmation',
            'Proof of DNA',
            'No blood',
          ],
          answer: 'Presumptive blood needing confirmation',
          explanation: 'Peroxidase positives occur with plant and chemical oxidants.',
          points: 2,
        },
        {
          id: 'for-u7-l2-q4',
          prompt: 'Bubbly blood with pale strands suggests?',
          type: 'short',
          answer: 'Expirated blood from airway with air and mucus, distinct from impact spatter.',
          explanation: 'Bubbles and dilution separate expirated from force-driven spatter.',
          points: 3,
        },
        {
          id: 'for-u7-l2-q5',
          prompt: 'A type A stain agrees with a type A reference. What does this establish?',
          type: 'mcq',
          options: [
            'Class consistency, not unique source identity',
            'An exact donor identity',
            'A time of deposition',
            'A complete activity reconstruction',
          ],
          answer: 'Class consistency, not unique source identity',
          explanation: 'Many people share a blood group, and frequencies vary.',
          points: 2,
        },
        {
          id: 'for-u7-l2-q6',
          prompt:
            'A stain has width 8 mm and length 16 mm. What angle does the ideal model predict?',
          type: 'short',
          answer: '30°, because arcsin(8/16) = arcsin(0.5).',
          explanation: 'Absolute size cancels when the shape ratio is formed.',
          points: 3,
        },
        {
          id: 'for-u7-l2-q7',
          prompt:
            'Why does an ABO mismatch exclude a sole stain source without necessarily excluding someone from the event?',
          type: 'short',
          answer:
            'The stain may belong to another participant or time; source attribution is narrower than involvement in the whole incident.',
          explanation: 'Do not turn a sample-level exclusion into a complete activity conclusion.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Calculate angle and separate the source inference',
        problem:
          'A stain has a 6 mm minor axis and a 12 mm major axis. Its valid typing reacts only with anti-A.',
        steps: [
          'Compute width/length = 6/12 = 0.5.',
          'Angle from the surface = arcsin(0.5) = 30°.',
          'The anti-A-only pattern supports type A in the supplied typing exercise.',
          'The geometry does not identify the donor, and type A does not identify the impact position. Combine them as distinct observations with distinct limits.',
        ],
        conclusion:
          'A correct forensic synthesis keeps biological classification and physical geometry separate before relating them to the case.',
      },
    },
    {
      id: 'for-u8-l1',
      unitId: 'for-u8',
      title: 'Glass Fracture and Ballistics',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Read radial vs concentric fractures and 3R rule for impact side',
        'Use refractive index, Becke line, and density for glass comparison',
        'Match bullets by striations, caliber, and rifling twist',
        'Distinguish entrance vs exit and range clues cautiously',
      ],
      sections: [
        {
          heading: 'Glass Fracture Reading',
          body: [
            'Radial fractures run outward from impact like spokes; concentric fractures circle around it. The 3R rule states radial cracks make Right angles on the Reverse side from impact. Rib marks and hackle on broken edges point along crack growth, helping order multiple impacts by which fracture terminates at another.',
            'Cone or crater beveling is wider on the exit side. For a bullet through window, the small entry pit and large exit crater show direction. Do not wash edges before microscopy because adhering fragments preserve fit and refractive clues.',
          ],
        },
        {
          heading: 'Refractive Index and Becke Line',
          body: [
            'Refractive index RI is light speed in vacuum divided by speed in the material. Soda-lime window is about 1.52, borosilicate lower, lead crystal higher. Immerse fragments in calibrated oils and watch the Becke line bright halo move: when objective-to-specimen distance is increased, the line moves into the higher RI medium.',
            'Match temperature precisely because oil RI shifts with temperature. Report oil RI, temperature, and match vs mismatch for known and questioned fragments. Density by flotation and elemental analysis add orthogonal comparison beyond RI alone.',
          ],
        },
        {
          heading: 'Bullet and Cartridge Basics',
          body: [
            'Bullets carry caliber diameter, jacket type, weight, and rifling engraving. Cartridge cases show firing pin, breechface, extractor, and ejector marks. In competition, compare questioned bullet striations to test fires from suspect firearms under comparison microscopy.',
            'Groove count, width, and twist direction are class traits shared by a model. Fine toolmark detail may support a source comparison, but no universal line-count threshold guarantees identity; quality, validation, and uncertainty matter.',
          ],
        },
        {
          heading: 'Range and Direction Clues',
          body: [
            'Soot, particulate deposits, defect shape, and other observations may inform a qualified reconstruction when compared with appropriate reference conditions. Ammunition, intervening materials, substrate, and recording quality can alter patterns.',
            'One defect does not establish an exact distance, direction, or actor. In a simplified glass diagram, beveling or fracture relationships may support a limited geometric inference under the stated assumptions. Report those assumptions rather than generalizing a classroom sketch to every real scene.',
          ],
        },
        {
          heading: 'Writing Glass and Ballistics Calls',
          body: [
            'Example: questioned fragment RI 1.520 at 25 C matches victim window and mismatches suspect bottle at 1.530, supporting common source with window within measurement uncertainty. Radial termination order shows impact A occurred before B because B cracks stop at A.',
            'Example: questioned bullet shows 6 right-twist grooves matching suspect pistol class, plus aligned individual striations in land 3 across test fires, supporting identification pending examiner verification. State class plus individual layers separately.',
          ],
        },
        {
          heading: 'Evaluate glass properties as comparative measurements',
          body: [
            'Refractive index is the ratio of light speed in vacuum to its speed in the material. A practical comparison uses calibrated reference media and controlled conditions. A similar refractive index can support class consistency between fragments, but many unrelated glass objects can share a value within measurement uncertainty. Density, elemental composition, physical fit, and scene context may provide additional information. A physical fit between complementary broken edges asks a different, potentially more specific question than two fragments sharing a common refractive index.',
            'In the conventional Becke-line observation, increasing the distance between the objective and specimen causes the bright line to move toward the higher-index material. State that direction explicitly rather than relying on the ambiguous phrase raise focus, since microscopes may move different components. Temperature influences reference-liquid behavior. A claimed mismatch must exceed the meaningful uncertainty of the measurement and should use comparable conditions. Do not report a difference in the fourth decimal place if the method cannot resolve it reliably.',
          ],
        },
        {
          heading: 'Separate fracture sequence from firearm source inference',
          body: [
            "A later crack may terminate at a pre-existing fracture in suitable glass, giving evidence about relative sequence. Radial and concentric fracture features can help interpret direction under applicable conditions, but tempered, laminated, damaged, or complex glass may not follow a simple classroom pattern. A diagram's stated assumptions matter. Relative sequence is not the same as an absolute time of breakage, and impact direction is not the identity of the person who caused it.",
            'Firearm and toolmark comparisons consider class characteristics such as caliber and rifling configuration along with finer surface features. Manufacturing processes, wear, damage, and recording quality affect those marks. A fixed count of consecutive lines does not provide a universal guarantee of a common firearm source. The field uses trained comparison, validation, verification, and research on uncertainty. In a school case, describe observed class agreement or the supplied comparison result without asserting zero error or naming a shooter from a toolmark alone. The lesson concerns evidence interpretation, not operation or construction of firearms.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Radial fracture',
          definition: 'Spoke cracks outward; 3R right angle on reverse side.',
        },
        {
          term: 'Concentric fracture',
          definition: 'Circular cracks around impact point from bending stress.',
        },
        {
          term: 'Becke line',
          definition:
            'Bright halo moving to higher RI medium as objective-to-specimen distance increases.',
        },
        {
          term: 'Striation match',
          definition:
            'Fine surface marks that can contribute to a qualified comparative source assessment.',
        },
        {
          term: 'Stippling',
          definition: 'Powder tattooing around close-range entrance.',
        },
        {
          term: 'Beveling',
          definition: 'Cone crater wider on glass exit side showing direction.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Glass comparison laboratory',
        diagram: 'glass',
        instructions: 'Open the measured intervals and compare the evidence fairly.',
        observations: [
          {
            label: 'Questioned fragment',
            result: 'RI 1.520 ± 0.002.',
          },
          {
            label: 'Reference A',
            result: 'RI 1.521 ± 0.002 under the same stated conditions.',
          },
          {
            label: 'Reference B',
            result: 'RI 1.535 ± 0.002 under the same stated conditions.',
          },
        ],
        question: 'Which conclusion follows?',
        options: [
          'A is consistent within uncertainty; B differs meaningfully',
          'A is excluded because its nominal value is not identical',
          'A is uniquely proven to be the source',
        ],
        correct: 0,
        explanation:
          'Uncertainty intervals overlap for A and are separated for B. Agreement in RI is a class comparison, not unique source proof.',
      },
      practice: [
        {
          id: 'for-u8-l1-q1',
          prompt: 'Radial cracks make right angles on which side?',
          type: 'mcq',
          options: ['Impact side', 'Reverse from impact', 'Both equally', 'Neither'],
          answer: 'Reverse from impact',
          explanation: '3R rule locates impact side without witness marks.',
          points: 2,
        },
        {
          id: 'for-u8-l1-q2',
          prompt:
            'Becke line moves into fragment as objective-to-specimen distance increases. Meaning?',
          type: 'short',
          answer:
            'With increased objective-to-specimen distance, movement into the fragment indicates higher fragment RI than the reference liquid.',
          explanation: 'Line moves to higher index medium, guiding next oil choice.',
          points: 3,
        },
        {
          id: 'for-u8-l1-q3',
          prompt: 'How do broad rifling traits and fine toolmarks differ?',
          type: 'mcq',
          options: [
            'Broad traits define a class; fine detail requires qualified comparative evaluation',
            'Both always prove a unique gun',
            'Neither can be observed',
            'A single line identifies the shooter',
          ],
          answer:
            'Broad traits define a class; fine detail requires qualified comparative evaluation',
          explanation:
            'Neither a universal striation count nor class agreement guarantees unique source identity.',
          points: 2,
        },
        {
          id: 'for-u8-l1-q4',
          prompt: 'Dense stippling with soot suggests range?',
          type: 'short',
          answer:
            'Close range, not contact and not distant; stippling brackets muzzle distance with ammo limits.',
          explanation: 'Unburned powder tattoos only within limited close range.',
          points: 3,
        },
        {
          id: 'for-u8-l1-q5',
          prompt: 'Why report temperature with RI?',
          type: 'mcq',
          options: [
            'Lab habit',
            'Reference-liquid RI shifts with temperature, changing match',
            'Glass melts',
            'No reason',
          ],
          answer: 'Reference-liquid RI shifts with temperature, changing match',
          explanation: 'Match temperature controls the comparison uncertainty.',
          points: 2,
        },
        {
          id: 'for-u8-l1-q6',
          prompt: 'Why must the Becke-line focus direction be described explicitly?',
          type: 'short',
          answer:
            'Microscopes move different components; specifying increased objective-to-specimen distance avoids reversing the interpretation.',
          explanation: 'Ambiguous motion language can reverse which medium has the higher index.',
          points: 3,
        },
        {
          id: 'for-u8-l1-q7',
          prompt: 'What can crack termination establish in a suitable simplified glass diagram?',
          type: 'short',
          answer: 'A relative sequence, because a later crack may stop at an earlier fracture.',
          explanation: 'It does not establish an absolute time or the identity of the actor.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Distinguish consistency from a meaningful glass difference',
        problem:
          'A questioned fragment measures RI 1.520 ± 0.002. Reference A is 1.521 ± 0.002; reference B is 1.535 ± 0.002 under comparable conditions.',
        steps: [
          'A and the questioned sample have overlapping measurement intervals, so the small nominal difference does not establish a meaningful mismatch.',
          'B’s interval is well separated, supporting incompatibility under the stated measurement assumptions.',
          'A’s overlap supports consistency, not unique identification of one window.',
          'Record conditions and uncertainty so another reader can evaluate the comparison.',
        ],
        conclusion:
          'A measurement must be interpreted with its precision before being turned into a source claim.',
      },
    },
    {
      id: 'for-u8-l2',
      unitId: 'for-u8',
      title: 'Entomology PMI and Soil',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Order blow fly, beetle succession and calculate degree-hours for PMI',
        'Collect larvae, puparia, and temperature data correctly',
        'Compare soils by color, texture, pH, and density gradient',
        'State PMI and soil limits with weather and microclimate caveats',
      ],
      sections: [
        {
          heading: 'Insect Succession Clock',
          body: [
            'Insect assemblages change with environment, access, species, and developmental history. Eggs, larval instars, pupae, and empty puparia provide developmental observations that require appropriate reference data.',
            'No stage fixes a universal time since death. Fresh eggs indicate a recent laying event; an empty puparium indicates completion of a relevant developmental cycle. Colonization may have been delayed or repeated, so the inferred interval must be tied to the event the biological evidence actually records.',
          ],
        },
        {
          heading: 'Degree-Hours and PMI',
          body: [
            'Development rate scales with temperature above a base threshold. Accumulated degree hours ADH equals hours times degrees above base, summed over the interval. Example: 24 hours at 20 C with base 6 C gives 336 degree-hours. Compare to lab tables for that species to estimate egg-to-collection time.',
            'Use scene temperature loggers plus nearby weather station corrected for sun, shade, wrapping, and indoor heating. Maggot-mass heat can raise local temperature several degrees. Report PMI as a range with assumptions, never a single hour without uncertainty.',
          ],
        },
        {
          heading: 'Collection Protocol',
          body: [
            'Specialist collection protocols preserve a representative set of stages and locations and document environmental conditions. Species identification, preservation, and any rearing method must be appropriate to the analysis.',
            'In this virtual course, work from the supplied stage observations, temperature history, and reference assumptions. Record missing information rather than inventing a preservation procedure or a universal age from size alone.',
          ],
        },
        {
          heading: 'Soil Comparison',
          body: [
            'Soil can be compared by color, texture, mineral and organic components, and other controlled measurements. Settling in an ordinary water column depends strongly on particle size and behavior; it should not be confused with a calibrated density-gradient separation.',
            'Reference soils must represent relevant variation by location and depth. A shoe sample can contain mixtures from several contacts. Agreement supports compatibility within the observed features, while a difference must be interpreted against sampling and within-site variation before exclusion.',
          ],
        },
        {
          heading: 'Case Synthesis',
          body: [
            'A valid species model and thermal history may support an insect-age interval, which can inform a broader postmortem interpretation only with access and scene history. A soil comparison separately evaluates material compatibility with sampled environments.',
            'State uncertainty from microclimate, colonization timing, reference variation, and sample mixture. Do not treat an insect estimate and soil similarity as automatic proof of a unique location or precise time of death.',
          ],
        },
        {
          heading: 'Distinguish insect age, colonization time, and postmortem interval',
          body: [
            'Insect development can help estimate elapsed time since a colonization event when species, stage, temperature history, and validated developmental data are known. That estimate is not automatically the time since death. Access may be delayed by enclosure, burial, weather, or other conditions, and colonization can be more complex than one immediate arrival. Fresh eggs therefore indicate a recent laying event, not a universal hour-scale postmortem interval. Empty puparia indicate completion of a developmental cycle for the relevant insects, not a fixed number of weeks for every species and environment.',
            'Species identification matters because developmental requirements differ. The oldest relevant evidence may be more informative about the earliest colonization than the most numerous stage. A mixed assemblage can include multiple arrival events. Sampling should document location and condition so that the laboratory interpretation is connected to the scene. Real collection, preservation, and rearing follow specialist protocols; the virtual lesson focuses on reading the resulting data and recognizing what the clock actually measures.',
          ],
        },
        {
          heading: 'Accumulate thermal time with units and boundaries',
          body: [
            'In a simplified linear degree-hour model, each interval contributes the positive temperature difference above a developmental threshold multiplied by elapsed hours. Intervals below threshold contribute zero in the teaching model, not negative development. If temperature changes, calculate each interval separately and add the contributions. A single daily average may hide variation or exceed the conditions under which a species model was validated. Upper developmental limits and nonlinear effects are not represented in the simple equation.',
            'Scene microclimate can differ from a weather station. Sun exposure, indoor heating, wrapping, and insect-mass heat can alter the actual temperature experienced by developing organisms. Uncertainty in the thermal history changes the inferred time. Soil adds a separate comparison: color, particle size, minerals, organic material, pollen, and other features can help compare questioned and reference samples. Nearby soils vary by depth and location, while shoes can carry mixtures accumulated over time. A soil difference must be assessed against within-site variation before treating it as a definitive exclusion.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'PMI',
          definition: 'Postmortem interval estimated from insect development and scene data.',
        },
        {
          term: 'ADH',
          definition: 'Accumulated degree hours above base temperature for development math.',
        },
        {
          term: 'Instar',
          definition: 'Larval molt stage; third instar precedes pupariation.',
        },
        {
          term: 'Puparia',
          definition: 'Hardened fly cases; empty cases show emergence and longer PMI.',
        },
        {
          term: 'Munsell color',
          definition: 'Standard soil color notation controlling light subjectivity.',
        },
        {
          term: 'Density gradient',
          definition: 'Layered liquid column separating soil minerals by density bands.',
        },
      ],
      simulation: {
        kind: 'model',
        model: 'thermal',
        title: 'Insect thermal-time simulator',
        instructions:
          'Explore temperature, threshold, and elapsed time in a simplified development model.',
        challenge: 'Compare 24 h at 20 °C with 48 h at 13 °C, using a 6 °C threshold.',
        takeaway:
          'Both accumulate 336 degree-hours; different temperature histories can produce the same modeled thermal time.',
      },
      practice: [
        {
          id: 'for-u8-l2-q1',
          prompt: '24 h at 22 C with base 6 C gives ADH?',
          type: 'short',
          answer: '16 times 24 equals 384 degree-hours.',
          explanation: 'Subtract base then multiply by hours and sum intervals.',
          points: 3,
        },
        {
          id: 'for-u8-l2-q2',
          prompt: 'Fresh insect eggs directly establish which event most clearly?',
          type: 'mcq',
          options: [
            'An exact time of death',
            'A recent egg-laying event',
            'A universal week-long PMI',
            'A unique donor identity',
          ],
          answer: 'A recent egg-laying event',
          explanation:
            'Egg age is not automatically time since death; colonization may be delayed.',
          points: 2,
        },
        {
          id: 'for-u8-l2-q3',
          prompt: 'Why is species identification necessary for a developmental estimate?',
          type: 'short',
          answer: 'Developmental rates and stage requirements differ among species.',
          explanation:
            'An appropriate species model is needed before thermal accumulation can be linked to age.',
          points: 3,
        },
        {
          id: 'for-u8-l2-q4',
          prompt:
            'Soil samples share color but differ in other features. What should be assessed before exclusion?',
          type: 'mcq',
          options: [
            'Reference variation, mixtures, and reliability of the differences',
            'Color alone proves identity',
            'Ignore all differences',
            'Assume every site is uniform',
          ],
          answer: 'Reference variation, mixtures, and reliability of the differences',
          explanation: 'Soil varies within sites and can accumulate from several locations.',
          points: 2,
        },
        {
          id: 'for-u8-l2-q5',
          prompt: 'Name two PMI confounders to state in analysis.',
          type: 'short',
          answer:
            'Night oviposition delay and rain or wrapping limiting access, plus maggot-mass heat and drugs altering rate.',
          explanation: 'Caveats convert a point estimate into a defensible range.',
          points: 3,
        },
        {
          id: 'for-u8-l2-q6',
          prompt: 'Calculate ADH for 10 h at 20 °C with a 6 °C threshold.',
          type: 'short',
          answer: '140 degree-hours: (20 − 6) × 10.',
          explanation: 'Use temperature above threshold, not the absolute temperature.',
          points: 3,
        },
        {
          id: 'for-u8-l2-q7',
          prompt: 'Why do fresh insect eggs not prove a recent time of death?',
          type: 'short',
          answer:
            'They date a laying event; access or colonization may have been delayed and other scene history may differ.',
          explanation: 'Time since colonization and postmortem interval are distinct quantities.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Add two temperature intervals',
        problem:
          'A teaching insect model uses a 6 °C threshold. The sample experiences 12 h at 18 °C and 12 h at 22 °C.',
        steps: [
          'First interval: (18 − 6) × 12 = 144 degree-hours.',
          'Second interval: (22 − 6) × 12 = 192 degree-hours.',
          'Total = 336 degree-hours. Keep this thermal accumulation distinct from a developmental stage until a valid species reference is supplied.',
          'Even if a reference links 336 degree-hours to an age, that age estimates time since the relevant developmental starting event, not automatically time since death.',
        ],
        conclusion:
          'Thermal arithmetic is only one part of an entomological inference; biological and scene assumptions remain essential.',
      },
    },
    {
      id: 'for-u9-l1',
      unitId: 'for-u9',
      title: 'Data Tables and Error Analysis',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Build scoring data tables with controls and negatives',
        'Quantify uncertainty for Rf, angle, RI, and ADH',
        'Distinguish random vs systematic error with fixes',
        'Write claim-evidence-reasoning paragraphs',
      ],
      sections: [
        {
          heading: 'Tables Judges Trust',
          body: [
            'One master table per evidence type beats scattered notes. Columns should include sample code, known vs questioned, reagent and concentration, observation with units, and result. Include blanks and knowns as rows so validation is visible. Use ruler units for Rf, degrees for angles, and RI with temperature.',
            'Record negatives explicitly: no effervescence, stayed blue, no green Beilstein. Elimination depends on documented absences. Cross out with single line and initial rather than erasing so corrections remain legible.',
          ],
        },
        {
          heading: 'Uncertainty Basics',
          body: [
            'Uncertainty must reflect the actual instrument, procedure, and sample. Preserve the measured distances used for Rf and stain-angle calculations, and the conditions used for refractive-index comparison.',
            'Use supplied measurement intervals to test the range of possible outputs. A broad spot, uncertain front, or varying microclimate can dominate uncertainty. There is no universal fixed precision that applies to every example of a method.',
          ],
        },
        {
          heading: 'Random vs Systematic Error',
          body: [
            'Random errors scatter: ruler placement, spot-center judgment, flame flicker. Fix with replicates and averaging. Systematic errors bias one way: contaminated wire yellowing every flame, tilted chamber slanting fronts, warm oils shifting RI. Fix with blanks, calibration, and technique change.',
            'In analysis, name one of each with evidence. Example: sodium carryover systematically yellows flames, shown by blank wire still yellow; Rf scatter randomly from front marking, shown by replicate spread 0.58 to 0.62.',
          ],
        },
        {
          heading: 'Claim-Evidence-Reasoning',
          body: [
            'Structure each conclusion as claim, evidence with numbers, and scientific reason. Claim: powder A is consistent with CaCO3. Evidence: HCl effervescence, brick-red flame, basic pH, negative Benedict. Reason: carbonate releases CO2 with acid and calcium emits brick-red; sugars would give Benedict red.',
            'End with limits and next test. This format lets judges award partial credit even when the final candidate is wrong because reasoning is visible.',
          ],
        },
        {
          heading: 'Common Point Losses',
          body: [
            'Vague verbs, missing units, unmarked fronts, and overstated matches lose the most points. Writing identical to instead of consistent with for class evidence is a classic deduction. So is ignoring a mismatched band or peak.',
            'Proofread for sample-code swaps. Circle the codes you actually tested. A perfect table with swapped labels still fails because chain of custody breaks.',
          ],
        },
        {
          heading: 'Build a report that can be checked against the data',
          body: [
            'A useful evidence table identifies the exhibit, the tested portion, the method, the control result, the raw observation, and the interpretation. Use a separate row for a repeated measurement rather than silently replacing the first value. Record not tested, inconclusive, negative, and excluded as different states. These distinctions matter when the final argument compares several candidates. An empty cell is not evidence that a candidate failed a test.',
            'Every numerical claim should be reproducible from the record. For chromatography, preserve spot and front distances as well as Rf. For stain geometry, preserve width and length as well as angle. For thermal development, preserve the temperature intervals, threshold, and hours as well as the total. A final number without its inputs prevents a reviewer from finding a sample-label or unit-conversion error. The objective is not a longer table for its own sake; it is a traceable chain from observation to conclusion.',
          ],
        },
        {
          heading: 'Use uncertainty without manufacturing precision',
          body: [
            'Measurement uncertainty depends on the instrument, procedure, sample, and interpretation. There is no universal ±0.02 uncertainty for every chromatographic Rf or one universal precision for refractive index. Estimate a reasonable interval from the actual input uncertainties supplied by the exercise. A broad spot may dominate error more than ruler markings do. A biased ruler or systematic baseline mistake will not be fixed by averaging many repeated readings.',
            'Random variation can often be characterized with repeated independent measurements, while systematic bias requires calibration, controls, or correction of the underlying method. Repeating the same contaminated test ten times may yield highly consistent but wrong results. In a report, identify the specific source of uncertainty and how it affects the conclusion. If two candidate intervals overlap, the correct outcome may be unresolved rather than a forced ranking. The final claim should be no more precise than the evidence chain that supports it.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'CER paragraph',
          definition: 'Claim evidence reasoning structure for defensible conclusions.',
        },
        {
          term: 'Random error',
          definition: 'Scatter reduced by replicates and averaging.',
        },
        {
          term: 'Systematic error',
          definition: 'One-way bias fixed by calibration and blanks.',
        },
        {
          term: 'Propagation',
          definition: 'Carrying measurement uncertainty into calculated Rf, angle, or ADH.',
        },
        {
          term: 'Negative result',
          definition: 'Documented absence used for elimination.',
        },
        {
          term: 'Audit trail',
          definition: 'Traceable link from claim to table row to sample code.',
        },
      ],
      simulation: {
        kind: 'model',
        model: 'chromatography',
        title: 'Measurement-sensitivity workbench',
        instructions:
          'Explore how a changed spot-to-front relationship changes the calculated ratio.',
        challenge:
          'Compare Rf values 0.45, 0.50, and 0.55, then relate them to the worked uncertainty interval.',
        takeaway: 'A calculated decimal is meaningful only relative to measurement uncertainty.',
      },
      practice: [
        {
          id: 'for-u9-l1-q1',
          prompt: 'Rewrite as CER: powder is CaCO3.',
          type: 'short',
          answer:
            'Claim CaCO3 consistent; evidence HCl fizz plus brick-red flame plus basic pH; reason carbonate plus calcium chemistry with negative Benedict ruling out sugars.',
          explanation: 'CER ties numbers to chemistry and eliminates alternatives.',
          points: 3,
        },
        {
          id: 'for-u9-l1-q2',
          prompt: 'Contaminated wire yellows all flames. Error type and fix?',
          type: 'mcq',
          options: [
            'Random, average more',
            'Systematic, reclean and run blank',
            'No error',
            'Human error only',
          ],
          answer: 'Systematic, reclean and run blank',
          explanation: 'One-way bias needs cleaning and blank validation, not averaging.',
          points: 2,
        },
        {
          id: 'for-u9-l1-q3',
          prompt: 'Rf replicates are 0.58, 0.60, and 0.62. What can you report directly?',
          type: 'short',
          answer:
            'The mean is 0.60 and the observed range is 0.58–0.62; a full uncertainty statement also needs method information.',
          explanation:
            'Replicate spread is informative but is not automatically a complete uncertainty estimate.',
          points: 3,
        },
        {
          id: 'for-u9-l1-q4',
          prompt: 'Why document negative Benedict?',
          type: 'mcq',
          options: [
            'Filler',
            'Eliminates reducing sugars and supports salts',
            'Proves guilt',
            'Replaces flame',
          ],
          answer: 'Eliminates reducing sugars and supports salts',
          explanation: 'Absences narrow the candidate pool systematically.',
          points: 2,
        },
        {
          id: 'for-u9-l1-q5',
          prompt: 'Class fiber match correct wording?',
          type: 'mcq',
          options: [
            'Identical to suspect',
            'Consistent with suspect, class evidence',
            'Proof suspect present',
            'Elimination',
          ],
          answer: 'Consistent with suspect, class evidence',
          explanation: 'Mass production prevents identical-to language for fibers.',
          points: 2,
        },
        {
          id: 'for-u9-l1-q6',
          prompt: 'Why can repeated measurements fail to repair a systematic error?',
          type: 'short',
          answer:
            'The same bias can affect every repeat, producing consistent but displaced values.',
          explanation: 'Calibration or correction of the procedure is needed.',
          points: 3,
        },
        {
          id: 'for-u9-l1-q7',
          prompt: 'A spot is 2.9–3.1 cm and its front 5.9–6.1 cm. Give approximate Rf bounds.',
          type: 'short',
          answer: '2.9/6.1 ≈ 0.475 and 3.1/5.9 ≈ 0.525, or about 0.48–0.53.',
          explanation:
            'Use opposite extremes of numerator and denominator to find conservative bounds.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Propagate a simple distance interval',
        problem:
          'A spot center lies between 3.8 and 4.2 cm from baseline. The solvent front is between 7.9 and 8.1 cm.',
        steps: [
          'The smallest plausible Rf uses the smallest numerator and largest denominator: 3.8/8.1 ≈ 0.469.',
          'The largest uses the largest numerator and smallest denominator: 4.2/7.9 ≈ 0.532.',
          'A reasonable bounding interval is approximately 0.47–0.53 for this exercise.',
          'A reference at 0.50 is compatible; a nominal difference of a few hundredths cannot be overinterpreted without considering both measurements’ uncertainty.',
        ],
        conclusion:
          'Interval reasoning makes the effect of measurement limits visible without pretending every ratio has the same precision.',
      },
    },
    {
      id: 'for-u9-l2',
      unitId: 'for-u9',
      title: 'Mock Crime Synthesis and Time Plan',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Rank suspects across powders, polymers, prints, DNA, and spatter',
        'Reconcile conflicting evidence without cherry-picking',
        'Allocate 50-minute team time across stations',
        'Write a one-page final analysis with limits and next steps',
      ],
      sections: [
        {
          heading: 'Synthesis Method',
          body: [
            'Build a table of candidate sources and evidence items. Record consistency, incompatibility, inconclusive results, and missing tests separately, with links to the underlying observations.',
            'Evaluate reliability, relevance, discrimination, and dependence rather than counting matches. An exclusion as the source of one item does not automatically exclude every possible role in an incident. Keep each conclusion attached to its specific proposition.',
          ],
        },
        {
          heading: 'Handling Conflicts',
          body: [
            'Conflicts are normal. A suspect matching powder and DNA but mismatching fingerprint needs explanation: print could be old, partial, or another handler. Do not silently drop the mismatch. State it, weigh clarity, and propose re-lift or re-run.',
            'Consider mixtures and secondary transfer. Touch DNA plus shared classroom fibers may reflect background, not crime. Prefer evidence with crime-specific context such as blood spatter geometry or ransom-ink Rf over ubiquitous cotton.',
          ],
        },
        {
          heading: '50-Minute Team Plan',
          body: [
            'Split roles: Partner A runs wet chemistry and chromatography while Partner B does microscopy and prints, then cross-check. First five minutes survey all stations and photograph strips. Middle thirty minutes test unknowns with knowns in parallel. Last fifteen minutes write analysis together.',
            'Pre-draw tables for powders, plastics, fibers, chromatography, prints, blood, and spectra. Pre-write formulas for Rf, angle arcsin, medullary index, and ADH so math is plug-in. Practice handoffs so no station is tested twice while another is skipped.',
          ],
        },
        {
          heading: 'One-Page Final Analysis',
          body: [
            'Paragraph one states scenario and top-ranked suspect with overall confidence. Paragraphs two to four group evidence: chemical ID, polymers and trace, biology and patterns. Each cites numbers: Rf 0.60 match, angle 30 degrees, RI 1.520, STR inclusion, 10-minutiae print.',
            'Final paragraph lists limits, errors, and next confirmatory tests such as mass-spec confirmation, mtDNA, or re-fuming. This honesty earns more than false certainty and mirrors real forensic reporting.',
          ],
        },
        {
          heading: 'Drill Before Competition',
          body: [
            'Run a full timed mock with planteds: carbonate powder, PET chip, cotton vs polyester, three-band ink, loop print with 10 minutiae, Type A blood, 30-degree spatter, RI 1.52 glass, and toluene spectrum. Score with a rubric penalizing overstated language and missing blanks.',
            'Review swaps and contamination events. The best teams debrief which elimination was fastest and which test wasted time. Cut one low-yield step before the next mock to protect writing time.',
          ],
        },
        {
          heading: 'Construct an evidence matrix without a match-count shortcut',
          body: [
            'Place possible sources in rows and evidence items in columns. For each intersection, record consistent, incompatible, inconclusive, or not examined, with a reference to the supporting observation. Do not turn the table into a simple vote. Three weak correlated similarities may carry less information than one reliable incompatible result about the same specified source proposition. Conversely, an exclusion as the source of one item does not remove someone from every possible role in the broader event.',
            'Consider whether evidence items are independent. Two measurements of the same dye are not necessarily two independent links, and two transferred traces may result from one ordinary contact. Evaluate plausible alternative activities as well as possible material sources. A fingerprint may predate the incident, a fiber may transfer through an intermediate surface, and mixed DNA may have several contributors. These alternatives do not automatically erase evidence; they define the propositions that a careful explanation must compare.',
          ],
        },
        {
          heading: 'Write a conclusion with an explicit scope',
          body: [
            'A final analysis should state the narrow claim supported by the findings, cite the decisive observations, explain the scientific relationship, and identify unresolved conflicts. If asked to rank candidates in a school scenario, rank them under the assumptions given and distinguish that exercise result from a legal conclusion. A class-consistent ink pattern supports a possible common material source; it does not by itself identify the person who wrote a note. A biological comparison may identify a possible donor but not the activity that deposited the material.',
            'Time planning should reflect the actual event instructions and station layout. Assign complementary tasks, agree on shared sample codes, and reserve time for checking and synthesis. A suggested 50-minute practice schedule is a rehearsal device, not a universal tournament rule. If photography or devices are not permitted, record the observations in the allowed form. The final cross-check should verify sample identity, units, control validity, and whether every exclusion or uncertainty has been represented honestly in the conclusion.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Suspect matrix',
          definition: 'Grid of suspects by evidence types marking support or elimination.',
        },
        {
          term: 'Exclusion',
          definition: 'Reliable mismatch removing a suspect as single source.',
        },
        {
          term: 'Weighting',
          definition: 'Ranking individual high-specificity evidence above common class matches.',
        },
        {
          term: 'Secondary transfer',
          definition: 'Indirect DNA or fiber movement without direct contact.',
        },
        {
          term: 'Timebox',
          definition: 'Fixed minutes per station preserving final writing time.',
        },
        {
          term: 'Confirmatory follow-up',
          definition: 'Next specific test proposed to resolve limits.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Final evidence synthesis',
        instructions:
          'Open the evidence file and select a conclusion that preserves both findings.',
        observations: [
          {
            label: 'Ink comparison',
            result: 'A’s pen and the questioned ink have compatible developed patterns.',
          },
          {
            label: 'DNA comparison',
            result: 'A is excluded as sole donor of a separate clean single-source stain.',
          },
          {
            label: 'Scenario constraint',
            result: 'The case does not require the writer and stain donor to be the same person.',
          },
        ],
        question: 'Which synthesis is sound?',
        options: [
          'The findings address different sources and do not by themselves establish one actor',
          'The ink similarity cancels the DNA exclusion',
          'The stain exclusion proves A had no possible role in any activity',
        ],
        correct: 0,
        explanation:
          'Each result must remain attached to its item and source proposition. Broader activity conclusions need additional evidence.',
      },
      practice: [
        {
          id: 'for-u9-l2-q1',
          prompt: 'Why can one reliable exclusion outweigh several class matches?',
          type: 'short',
          answer:
            'Exclusion breaks single-source hypothesis while common class matches occur by chance across people.',
          explanation: 'Falsification logic prioritizes mismatches in band, type, or profile.',
          points: 3,
        },
        {
          id: 'for-u9-l2-q2',
          prompt: 'Best 50-minute split?',
          type: 'mcq',
          options: [
            '45 min testing, 5 min writing',
            '5 survey, 30 testing, 15 writing with split roles',
            'Only writing',
            'Random order',
          ],
          answer: '5 survey, 30 testing, 15 writing with split roles',
          explanation: 'Protected writing time with parallel testing maximizes scored synthesis.',
          points: 2,
        },
        {
          id: 'for-u9-l2-q3',
          prompt: 'Touch DNA match plus everywhere cotton fibers. Caution?',
          type: 'short',
          answer:
            'Possible secondary transfer and background fibers; need crime-specific evidence such as spatter or ink before claiming presence.',
          explanation: 'Ubiquitous trace plus transferable DNA is weak without context.',
          points: 3,
        },
        {
          id: 'for-u9-l2-q4',
          prompt: 'Final paragraph must include:',
          type: 'mcq',
          options: [
            'Only suspect name',
            'Limits, errors, and confirmatory next tests',
            'Jokes',
            'Blank space',
          ],
          answer: 'Limits, errors, and confirmatory next tests',
          explanation: 'Forensic reports close with uncertainty and follow-up, not bare verdicts.',
          points: 2,
        },
        {
          id: 'for-u9-l2-q5',
          prompt:
            'Why might a well-supported multilocus DNA comparison be more discriminating than a common fiber-class agreement?',
          type: 'short',
          answer:
            'It can provide more specific source information when evaluated with valid statistics and quality assumptions; relevance and transfer still matter.',
          explanation:
            'Discrimination depends on the actual dataset rather than an automatic hierarchy of labels.',
          points: 3,
        },
        {
          id: 'for-u9-l2-q6',
          prompt: 'Why should evidence not be evaluated by counting matches alone?',
          type: 'short',
          answer:
            'Findings differ in reliability, discrimination, relevance, and dependence; repeated related observations can be overcounted.',
          explanation: 'Evidence quality and the proposition matter more than a raw tally.',
          points: 3,
        },
        {
          id: 'for-u9-l2-q7',
          prompt:
            'How should a report handle a reliable result that conflicts with a preferred explanation?',
          type: 'short',
          answer:
            'Record it explicitly, reassess the explanation, and identify alternatives or additional evidence needed.',
          explanation: 'Silently discarding inconvenient data undermines the analysis.',
          points: 3,
        },
      ],
      workedExample: {
        title: 'Resolve apparently conflicting clues',
        problem:
          'Candidate A’s pen is compatible with a questioned ink pattern. A complete single-source stain profile excludes A as its donor. The scenario does not state that the writer and stain donor must be the same person.',
        steps: [
          'Record ink compatibility as a material-source association with its normal limitations.',
          'Record the biological exclusion as applying to the source of that stain under the stated profile assumptions.',
          'Do not treat either observation as cancelling the other: they address different items and possibly different activities.',
          'State that A’s pen remains a possible ink source while A is not the sole donor of the specified stain in this model. More context is needed to connect the roles.',
        ],
        conclusion:
          'Conflicts become clearer when every conclusion is attached to a specific item and proposition.',
      },
    },
    {
      id: 'for-u6-l3',
      unitId: 'for-u6',
      title: 'Skin, Friction Ridges, and Fingerprint Residue',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Connect epidermis, dermis, and friction-ridge structure to a recorded fingerprint',
        'Distinguish sweat produced on the palm from oils transferred to it',
        'Explain why contact pressure, surface, and residue affect print quality',
        'Separate persistent ridge structure from a variable recorded impression',
      ],
      sections: [
        {
          heading: 'The integumentary system as a layered interface',
          body: [
            'The integumentary system includes skin and associated structures such as glands, hair, and nails. Skin provides a protective interface, contributes to temperature regulation, and contains sensory structures. The epidermis is the outer epithelial layer; the dermis is underlying connective tissue containing vessels and other structures. The hypodermis lies beneath the skin proper and contains substantial connective and adipose tissue. These layers are not interchangeable labels for one uniform sheet.',
            'The epidermis has no blood vessels of its own. Cells receive support through diffusion from deeper tissue. Basal cells generate new keratinocytes, which move outward and change as they contribute to the protective surface. Superficial shedding therefore does not normally erase the deeper organization that supports friction ridges. The important forensic connection is persistence of the underlying pattern alongside ongoing replacement of surface cells.',
          ],
        },
        {
          heading: 'Thick skin and friction-ridge architecture',
          body: [
            'Palms, soles, and the palmar surfaces of fingers have thick skin with friction ridges. These surfaces differ from hair-bearing skin: they lack hair follicles and sebaceous glands, while eccrine sweat glands are abundant. Epidermal ridges and the underlying dermal interface create a structured surface that affects contact with objects. Ridge pattern development occurs before birth and reflects interacting developmental conditions, not a pattern consciously acquired by touching surfaces.',
            'The pattern is persistent, but the image recorded during contact is variable. Stretch, pressure, angle, moisture, movement, and substrate all influence which parts touch and how the residue is distributed. A rolled reference and a partial latent impression therefore need not look like exact photographic copies. Comparison must account for distortion without inventing detail that was never recorded.',
          ],
        },
        {
          heading: 'Sweat, transferred oils, and external material',
          body: [
            'Eccrine secretions contribute water and dissolved components, including salts and small organic substances. Palms do not produce sebaceous oil from local sebaceous glands because those glands are absent there. Oils can nevertheless appear on fingertips after contact with the face, hair, food, lotions, or other materials. A latent deposit can therefore be a complex mixture of endogenous secretions and transferred substances.',
            'Residue composition changes with activity and environment. An impression deposited on clean glass after washing may behave differently from one left after handling a greasy object. Detection chemistry responds to particular components, not an abstract property called fingerprintness. This is why surface and residue information matter when selecting a development method. A successful method for one deposit does not guarantee success for another from the same finger.',
          ],
        },
        {
          heading: 'From contact to a visible or latent impression',
          body: [
            "A patent impression is visible because the deposited material already provides contrast, such as ink. A plastic impression records a three-dimensional deformation in a yielding material. A latent impression may require enhanced illumination or development to reveal sufficient contrast. These terms describe the impression's form, not different biological kinds of fingers.",
            'Pressure can broaden contact areas and merge details; movement can smear ridges. Too little residue may leave gaps, while excess residue may fill valleys. Rough or absorbent surfaces alter the transfer and persistence of material. When comparing two impressions, separate differences in underlying ridge structure from differences introduced by recording conditions. If the available image cannot distinguish them, the appropriate result may be inconclusive.',
          ],
        },
        {
          heading: 'Injury, repair, and persistence',
          body: [
            'A superficial abrasion may temporarily disturb a recorded impression while deeper ridge-supporting structures remain intact. Deeper injury can produce permanent scarring that changes the surface pattern. The effect depends on the depth and extent of injury, so a photograph of a faint area alone cannot establish whether permanent alteration occurred. Scars can add descriptive comparison information, but they too must be interpreted with recording quality and reference context.',
            'Avoid claiming that ordinary wear, washing, or surface shedding automatically creates an entirely new fingerprint. Also avoid the opposite claim that every impression from a persistent pattern must be equally clear. Biological persistence and evidentiary visibility are different properties. A persistent feature may simply fail to transfer to a particular surface on a particular occasion.',
          ],
        },
        {
          heading: 'Use anatomical knowledge to evaluate an observation',
          body: [
            'An anatomy-informed explanation starts with the layer or structure that generates the finding. If a question asks why an oily latent print appears on a palm-touched surface, identify transferred oil rather than inventing palmar sebaceous glands. If a print is blurred, consider contact and recording conditions before claiming anatomical change. If an injury is described as superficial, explain why the deeper pattern may remain.',
            "The virtual case changes residue and contact conditions while holding the person's ridge structure conceptually fixed. This is a controlled comparison: the same source can produce different-quality observations. In a report, describe which features are visible, what may have affected recording, and which comparisons remain possible. Anatomy supplies the mechanism; image quality determines how much of that mechanism the evidence actually reveals.",
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Epidermis',
          definition: 'Outer avascular epithelial layer of skin.',
        },
        {
          term: 'Dermis',
          definition: 'Underlying connective-tissue layer with vascular and structural support.',
        },
        {
          term: 'Friction ridge',
          definition: 'Raised skin pattern on palmar and plantar surfaces.',
        },
        {
          term: 'Eccrine gland',
          definition: 'Sweat gland contributing watery secretion to the surface.',
        },
        {
          term: 'Latent impression',
          definition: 'Deposit requiring enhanced detection or contrast for useful observation.',
        },
        {
          term: 'Recording distortion',
          definition: 'Change in a recorded impression caused by contact or imaging conditions.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Same finger, different impressions',
        instructions: 'Inspect two simulated records from the same ridge source.',
        observations: [
          {
            label: 'Record A',
            result:
              'Light stationary contact on smooth glass produces several clear ridge segments.',
          },
          {
            label: 'Record B',
            result: 'Sliding contact with excess residue produces merged and smeared marks.',
          },
          {
            label: 'Anatomical comparison',
            result: 'No injury or change in the underlying friction-ridge pattern is supplied.',
          },
        ],
        question: 'What best explains the difference?',
        options: [
          'Contact and residue conditions changed the recorded impression',
          'The finger instantly developed a new ridge pattern',
          'Palmar hair follicles changed the print',
        ],
        correct: 0,
        explanation:
          'The same persistent pattern can produce different records because pressure, motion, residue, and substrate affect transfer.',
      },
      workedExample: {
        title: 'Explain oil in a palm impression',
        problem:
          'A student argues that an oily palm impression proves the palm contains sebaceous glands.',
        steps: [
          'Identify the relevant anatomy: palmar thick skin has eccrine glands but lacks local sebaceous glands.',
          'Consider transfer: oil can reach the palm from contact with the face, hair, lotion, food, or another surface.',
          'Separate the composition of a deposit from the anatomical location where each component originated.',
          'Conclude that an oily impression does not establish local sebaceous secretion.',
        ],
        conclusion:
          'Residue can be transferred before a print is deposited; its presence does not identify its anatomical origin.',
      },
      practice: [
        {
          id: 'for-u6-l3-q1',
          type: 'mcq',
          prompt: 'Which skin layer is avascular?',
          answer: 'Epidermis',
          explanation: 'The epidermis receives support through diffusion from deeper tissues.',
          points: 2,
          options: ['Epidermis', 'Dermis', 'Hypodermal blood vessels'],
        },
        {
          id: 'for-u6-l3-q2',
          type: 'short',
          prompt: 'Why can palms deposit oils despite lacking local sebaceous glands?',
          answer: 'Oils can transfer from other body regions or external materials before contact.',
          explanation: 'Deposit chemistry includes transferred substances.',
          points: 3,
        },
        {
          id: 'for-u6-l3-q3',
          type: 'mcq',
          prompt: 'Which gland type is abundant on palms?',
          answer: 'Eccrine',
          explanation: 'Eccrine secretion contributes to friction-ridge residues.',
          points: 2,
          options: ['Sebaceous', 'Eccrine', 'Mammary'],
        },
        {
          id: 'for-u6-l3-q4',
          type: 'short',
          prompt: 'Why does normal surface-cell shedding not normally erase the ridge pattern?',
          answer:
            'Deeper organization supporting the pattern persists while superficial cells are replaced.',
          explanation: 'Surface turnover and underlying architecture occur at different levels.',
          points: 3,
        },
        {
          id: 'for-u6-l3-q5',
          type: 'mcq',
          prompt:
            'A sliding contact produces a smeared print. What is the best initial explanation?',
          answer: 'Recording distortion',
          explanation: 'Motion can distort the impression without changing the underlying pattern.',
          points: 2,
          options: [
            'Instant anatomical replacement',
            'Recording distortion',
            'Proof of a different person',
          ],
        },
        {
          id: 'for-u6-l3-q6',
          type: 'short',
          prompt: 'Distinguish patent and plastic impressions.',
          answer:
            'Patent impressions are visible deposits; plastic impressions are three-dimensional deformations in a yielding material.',
          explanation: 'The terms describe how the impression is recorded.',
          points: 3,
        },
        {
          id: 'for-u6-l3-q7',
          type: 'short',
          prompt:
            'Why should a poor-quality impression not automatically be treated as a source exclusion?',
          answer:
            'Missing or distorted features may reflect recording conditions rather than a true anatomical incompatibility.',
          explanation: 'Quality must support the comparison before a difference is interpreted.',
          points: 3,
        },
      ],
    },
    {
      id: 'for-u8-l3',
      unitId: 'for-u8',
      title: 'Pollen, Seeds, Tracks, and Environmental Associations',
      durationMin: 35,
      kind: 'text',
      objectives: [
        'Compare pollen and seed evidence through morphology and reference samples',
        'Distinguish common background material from an informative assemblage',
        'Separate footwear class characteristics from wear and acquired damage',
        'Integrate botanical, soil, and track evidence without assuming unique location or timing',
      ],
      sections: [
        {
          heading: 'Palynology and the botanical evidence question',
          body: [
            'Palynology examines pollen and spores. Their morphology can include size, shape, aperture number and arrangement, and surface ornamentation. Some features survive conditions that damage more fragile biological material, making pollen useful in environmental comparisons. Identification requires appropriate reference material and expertise; one general shape is not enough to assign every grain to a species. The level of identification may be family, genus, or another broader group depending on the available detail.',
            'Forensic reasoning asks how a botanical observation relates to possible environments, objects, or activities. A common wind-dispersed pollen type may appear far from the plant that produced it. A grain on clothing therefore does not automatically prove direct contact with that plant. Transport, background abundance, season, persistence, and sampling all shape the interpretation. Record the assemblage and context rather than selecting one visually distinctive grain and ignoring the rest.',
          ],
        },
        {
          heading: 'Seed evidence and the syllabus term spermology',
          body: [
            'The syllabus pairs palynology with spermology; here the latter refers to the study of seeds. Seed comparisons can use overall dimensions, shape, surface texture, attachment structures, and the location of recognizable landmarks. Some seeds adhere to clothing through hooks or other structures, while others travel in soil, plant fragments, or transported materials. The dispersal mechanism affects how direct or indirect transfer might occur.',
            'An identified seed type can support an environmental association, but shared plant distributions limit geographic specificity. A landscaped species may occur in many gardens, and a transported potting mixture can move seeds away from their original source. Compare questioned material with representative local references and relevant alternative sites. If only one reference site is sampled, a similarity cannot establish that no other site could produce the same material.',
          ],
        },
        {
          heading: 'Compare assemblages rather than isolated matches',
          body: [
            'An assemblage is the combination of types and relative representation within a sample. A mixture of pollen, seeds, mineral grains, and organic fragments may be more informative than one common component. Still, counts depend on sample size, recovery efficiency, and where the reference was collected. A tiny questioned sample can miss a component that is common in a larger reference sample simply by chance. Absence must be interpreted relative to sampling and detection.',
            'Record known differences as well as similarities. A useful comparison might state that the questioned sample shares several observed botanical types with site A but differs from the supplied site B sample. That statement remains conditional on the references and their variability. It does not establish unique location, exact visit time, or the identity of the person who transported the material. Those are additional questions requiring additional evidence.',
          ],
        },
        {
          heading: 'Footwear and tire tracks as patterned impressions',
          body: [
            'A track can preserve class features such as tread design, dimensions, and arrangement of elements. Many manufactured items share those features. Wear and acquired damage can add detail, but the strength of a comparison depends on how clearly it is recorded and whether the corresponding regions can be assessed. A missing feature in a partial track may simply lie outside the contacted area. A smeared impression cannot support the same detailed conclusion as a complete high-quality record.',
            "Substrate affects shape: soft soil can deform, a wet surface can spread material, and movement can stretch or smear an impression. A scale and orientation reference help preserve dimensions. A photograph taken obliquely can distort apparent size, so perspective must be considered before comparing measurements. Do not infer an exact person's height, weight, or identity from one vague footprint without a validated basis supplied by the task.",
          ],
        },
        {
          heading: 'Integrate tracks with soil and botanical traces',
          body: [
            'A shoe may retain material from several earlier locations while also leaving a new track. A botanical or soil association and a tread association therefore address different aspects of the event. One concerns material carried; the other concerns a patterned contact. They may support each other, but they can also share the same transfer history and should not automatically be treated as independent statistical multipliers.',
            'Within-site variation can be substantial across depth, moisture, vegetation, and human activity. Collecting a reference only from one dry patch may poorly represent material on a shoe that contacted another part of the site. In the virtual exercise, the supplied references define a constrained comparison. State that boundary explicitly when selecting the best-supported association. Real environmental inference requires broader sampling and validated methods.',
          ],
        },
        {
          heading: 'Write the environmental conclusion at the right scale',
          body: [
            'Use a four-part conclusion: describe the questioned assemblage or pattern, compare it with the references, explain the informative similarities and differences, and state remaining alternatives. If a seed is common and the track is partial, say so. If a clearly recorded tread design is incompatible with a candidate shoe under comparable conditions, that may exclude that shoe as the source of that impression, without proving the wearer never visited the area.',
            'Timing is particularly difficult. Pollen and seeds can persist, and footwear can carry layered histories. Presence is not automatically a timestamp. A defensible report avoids claims such as the suspect must have visited this garden that morning unless separate evidence supports that time and activity. The value of environmental evidence comes from careful comparison, not from treating nature as a unique barcode for every location.',
          ],
        },
      ],
      keyTerms: [
        {
          term: 'Palynology',
          definition: 'Study of pollen and spores.',
        },
        {
          term: 'Spermology',
          definition: 'Study of seeds, as used in this syllabus topic.',
        },
        {
          term: 'Assemblage',
          definition: 'Combination of observed material types in a sample.',
        },
        {
          term: 'Class characteristic',
          definition: 'Feature shared by a group, such as a manufactured tread design.',
        },
        {
          term: 'Acquired characteristic',
          definition: 'Wear or damage arising during an item’s history.',
        },
        {
          term: 'Background transfer',
          definition: 'Material acquired through ordinary environmental contact.',
        },
      ],
      simulation: {
        kind: 'investigation',
        title: 'Environmental comparison case file',
        instructions:
          'Inspect botanical and track observations, then choose the narrowest supported association.',
        observations: [
          {
            label: 'Questioned sample',
            result: 'Soil on a shoe contains pollen types P and Q plus hooked seed type R.',
          },
          {
            label: 'Reference sites',
            result:
              'Site A contains P, Q, and R. Site B contains P only in the supplied sample. Other sites have not been sampled.',
          },
          {
            label: 'Track',
            result:
              'The shoe’s broad tread design agrees with a partial scene impression; fine wear detail is not clear.',
          },
        ],
        question: 'Which conclusion is supported?',
        options: [
          'The supplied evidence is more consistent with site A, without unique location or timing proof',
          'Site A is the only possible location on Earth',
          'The partial tread proves one person was present at a precise time',
        ],
        correct: 0,
        explanation:
          'The reference comparison favors A within the exercise set. Limited environmental sampling and partial tread detail prevent unique source or timing claims.',
      },
      workedExample: {
        title: 'Evaluate a shared botanical assemblage',
        problem:
          'Questioned material shares three types with site A. One of those types is widespread, site B shares only that common type, and no other sites were sampled.',
        steps: [
          'Separate the widespread type from the more informative combination of three types.',
          'State that A is more consistent with the supplied assemblage than the supplied B reference.',
          'Do not conclude uniqueness because the reference set does not represent every possible environment.',
          'Name useful next information: within-site variation, other plausible sites, recovery conditions, and transfer history.',
        ],
        conclusion:
          'A comparative preference within a reference set is narrower than proof of a unique geographic origin.',
      },
      practice: [
        {
          id: 'for-u8-l3-q1',
          type: 'mcq',
          prompt: 'What does palynology study?',
          answer: 'Pollen and spores',
          explanation: 'Their morphology and assemblages can inform environmental comparisons.',
          points: 2,
          options: ['Pollen and spores', 'Only human hair', 'Only metal fragments'],
        },
        {
          id: 'for-u8-l3-q2',
          type: 'short',
          prompt: 'Why is one common wind-dispersed pollen type weak evidence of a unique site?',
          answer: 'It can be widespread and transported away from its source plant.',
          explanation: 'Environmental abundance and transport limit specificity.',
          points: 3,
        },
        {
          id: 'for-u8-l3-q3',
          type: 'mcq',
          prompt: 'A mass-produced tread design is primarily which kind of feature?',
          answer: 'Class characteristic',
          explanation: 'Many shoes can share the same design.',
          points: 2,
          options: ['Class characteristic', 'A guaranteed unique identity', 'A DNA allele'],
        },
        {
          id: 'for-u8-l3-q4',
          type: 'short',
          prompt: 'Why can a tiny questioned sample lack a type found in a large reference sample?',
          answer:
            'Sampling variation and recovery limits can omit a component without proving true absence.',
          explanation: 'Compare sample size and detection before treating absence as exclusion.',
          points: 3,
        },
        {
          id: 'for-u8-l3-q5',
          type: 'mcq',
          prompt: 'What does spermology refer to in this syllabus lesson?',
          answer: 'Study of seeds',
          explanation: 'Seed morphology and dispersal support botanical comparisons.',
          points: 2,
          options: ['Study of seeds', 'Study of flame colors', 'Study of ridge endings'],
        },
        {
          id: 'for-u8-l3-q6',
          type: 'short',
          prompt: 'Why should a botanical association not automatically establish time of contact?',
          answer: 'Material can persist or transfer indirectly from earlier contacts.',
          explanation: 'Presence alone is not a timestamp.',
          points: 3,
        },
        {
          id: 'for-u8-l3-q7',
          type: 'short',
          prompt:
            'Give a defensible conclusion for a partial tread sharing only a common pattern with a shoe.',
          answer:
            'The shoe is consistent with the observed class pattern, but the partial impression lacks enough detail for a stronger source conclusion.',
          explanation: 'The conclusion must match the recorded information.',
          points: 3,
        },
      ],
    },
  ],
  division: 'C',
  syllabus: '2026 SciConnect Forensics syllabus',
  references: [
    {
      title: 'NIST: Forensic biometrics and print comparison',
      url: 'https://www.nist.gov/forensic-biometrics',
    },
    {
      title: 'NIST: Limits of microscopic hair comparison',
      url: 'https://www.nist.gov/news-events/news/2019/11/solution-hairy-problem-forensic-science',
    },
    {
      title: 'NIST: DNA mixture interpretation',
      url: 'https://www.nist.gov/programs-projects/dna-mixture-interpretation-0',
    },
    {
      title: 'NIST: Firearms and toolmark measurement',
      url: 'https://www.nist.gov/spo/forensic-science-program/forensic-science-research/firearms-and-toolmarks',
    },
    {
      title: 'OpenStax: Skin layers and friction ridges',
      url: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/5-1-layers-of-the-skin',
    },
  ],
};
