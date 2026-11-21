import { defineDeck, type Deck } from './presentation-types.ts';

// Disease Detectives decks for surveillance, case definitions, interpretation, prevention, and
// the integrated outbreak walkthrough (lessons epi-u6 to epi-u10).

const surveillance = defineDeck('epi-u6-l1', [
  {
    kind: 'title',
    title: 'Surveillance and the public health information cycle',
    subtitle: 'Ongoing data collection that only counts if it leads to action.',
    objectives: [
      'Distinguish **surveillance** from a one-time survey.',
      'Compare strengths and biases of **passive**, **active**, **sentinel**, and **syndromic** systems.',
      'Interpret changes in **reported counts**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: reported cases of a disease doubled this month. What is your first thought?',
    options: [
      'Transmission doubled',
      'Maybe testing or reporting changed',
      'The data are wrong',
      'Not sure yet',
    ],
  },
  {
    kind: 'flow',
    section: 0,
    title: 'The surveillance cycle',
    steps: [
      { label: 'Collect', detail: '**Ongoing, systematic** data using a stated case definition.' },
      { label: 'Analyze', detail: 'Count by person, place, and time on a regular schedule.' },
      { label: 'Interpret', detail: 'Compare with ==expected levels== and action thresholds.' },
      { label: 'Disseminate', detail: 'Return findings to decision-makers and reporters.' },
      {
        label: 'Act',
        detail: '==Information for action==: controls, alerts, and program changes.',
      },
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'A county mails one survey about asthma to every household this year. Is this surveillance?',
    options: [
      'Not by itself: surveillance is ongoing and tied to action',
      'Yes, any data collection is surveillance',
      'Yes, because it covers every household',
      'No, because asthma cannot be tracked',
    ],
    answer: 0,
    explanation:
      'A one-time collection can inform a study, but surveillance is a continuing cycle of collection, analysis, dissemination, and action.',
  },
  {
    kind: 'compare',
    section: 1,
    title: 'Surveillance approaches',
    columns: ['System', 'How cases arrive', 'Main tradeoff'],
    rows: [
      [
        '**Passive**',
        'Routine reports from clinicians and labs',
        'Cheap and broad, but ==underreporting varies==',
      ],
      [
        '**Active**',
        'Investigators seek or verify cases',
        'Better ascertainment at ==higher cost==',
      ],
      [
        '**Sentinel**',
        'Selected reporting sites',
        'Tracks trends; sites ==may not represent== everyone',
      ],
      ['**Syndromic**', 'Symptom patterns before diagnosis', 'Timely, but ==less specific=='],
    ],
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Passive reporting',
    bullets: [
      '**Passive surveillance** relies on routine reports from clinicians, labs, and institutions.',
      'Completeness depends on ==recognition, incentives, access, and workload==.',
      'Underreporting can change over time and differ among groups.',
      'A **stable count** can hide a changing true burden.',
    ],
    image: 'dd-nipah',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Active and sentinel systems',
    bullets: [
      '**Active surveillance**: staff call sites or review records to find cases directly.',
      '**Sentinel surveillance**: a chosen network of sites, such as clinics reporting flu-like illness.',
      'A consistent sentinel network ==tracks trends== even though it is not a census.',
      'Match the design to the purpose; ==no method is universally best==.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each scenario to its surveillance type.',
    pairs: [
      ['Health staff phone every hospital weekly for new cases', 'Active'],
      ['Clinicians mail in required report forms', 'Passive'],
      ['Fifty chosen clinics report flu-like illness counts', 'Sentinel'],
      ['Emergency visits for vomiting are tracked daily', 'Syndromic'],
    ],
    explanation:
      'Investigators seeking cases is active, routine reporting is passive, selected sites are sentinel, and symptom indicators are syndromic.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Syndromic and laboratory evidence',
    bullets: [
      '**Syndromic** data (symptoms, pharmacy sales, absences) can signal ==before diagnosis==.',
      '**Laboratory** data are more specific but depend on ==who gets tested== and on test delays.',
      'A new testing program can raise detected cases without raising true incidence.',
      'Combining systems helps, but remove duplicate people and episodes.',
    ],
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Evaluating system performance',
    bullets: [
      'Attributes: **sensitivity**, **PPV**, **timeliness**, **representativeness**, acceptability, simplicity, flexibility, stability.',
      'A broad definition is sensitive but may ==raise false alarms==.',
      'A long, detailed form may ==reduce reporting==.',
      'Judge the attribute that matters for the ==intended action==.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Which surveillance attribute does each statement describe?',
    bins: ['Timeliness', 'Representativeness', 'Sensitivity'],
    items: [
      ['Reports reach the health department within 24 hours', 0],
      ['Reporting sites match the state’s age and income mix', 1],
      ['The system detects 90% of true cases', 2],
      ['Data are analyzed the same day they arrive', 0],
      ['Rural and urban clinics both participate', 1],
    ],
    explanation:
      'Speed is timeliness, matching the population is representativeness, and the share of true cases detected is sensitivity.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: a doubling in reports',
    problem:
      'Reported cases double in the month a new laboratory and more testing sites begin reporting.',
    steps: [
      'Document the ==reporting expansion== and testing changes.',
      'Compare rates within **stable sites**, and inspect **onset versus report dates**.',
      'Use other evidence before estimating how much is true incidence.',
    ],
    conclusion: 'A doubling of reports alone ==does not quantify a doubling of disease==.',
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which could raise reported counts without more true disease? Select all that apply.',
    options: [
      'A broader case definition',
      'New reporting sites joining',
      'A lab clearing a backlog of old results',
      'More people actually becoming infected',
    ],
    answers: [0, 1, 2],
    explanation:
      'Definition changes, new sites, and backlog clearance all add reports. A true rise in infections is a real increase, and both can happen at once.',
  },
  {
    kind: 'fill',
    prompt: 'Complete the surveillance vocabulary.',
    text: 'Routine reports from clinicians form {0} surveillance. Investigators seeking cases is {1} surveillance. Tracking symptoms before diagnosis is {2} surveillance.',
    blanks: ['passive', 'active', 'syndromic'],
    distractors: ['sentinel', 'ecological', 'clinical'],
    explanation:
      'Passive systems wait for reports, active systems go looking, and syndromic systems track early indicators.',
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'Reported cases double right after a new rapid test is introduced. What should be checked first?',
    options: [
      'Whether testing or reporting changed, not just disease',
      'Nothing; the disease doubled',
      'Only the number of deaths',
      'Whether the case definition is spelled correctly',
    ],
    answer: 0,
    explanation:
      'More testing or new reporting rules can raise counts without a real rise in disease.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Passive surveillance', back: 'Routine reporting by participating sources.' },
      { front: 'Active surveillance', back: 'Investigators directly seek or verify cases.' },
      { front: 'Sentinel surveillance', back: 'Monitoring through selected sites.' },
      { front: 'Syndromic surveillance', back: 'Tracking early symptom or related indicators.' },
    ],
  },
  {
    kind: 'open',
    prompt:
      'A syndromic system flags a spike in vomiting visits. What would you check before alerting the public?',
    model:
      'Check whether a holiday, site change, or coding change explains it, look for clustering by place or age, and seek laboratory or exposure evidence to confirm a real cluster.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Surveillance is ==ongoing, systematic, and tied to action==.',
      '**Passive** is broad and cheap; **active** is thorough; **sentinel** tracks trends; **syndromic** is fast.',
      'Judge a system on the attribute its purpose needs.',
      'Before calling a rise real, check ==definitions, sites, testing, and backlogs==.',
    ],
  },
]);

const caseDefinitions = defineDeck('epi-u7-l1', [
  {
    kind: 'title',
    title: 'Constructing and applying case definitions',
    subtitle: 'Reproducible rules for who counts as a case, and why exposure stays out of them.',
    objectives: [
      'Write an **operational** case definition.',
      'Separate **suspected**, **probable**, and **confirmed** classifications.',
      'Weigh **sensitivity–specificity** tradeoffs without circular exposure criteria.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: is “anyone who seems sick after the party” a usable case definition?',
    options: ['Yes', 'No', 'Only early on', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'An operational definition',
    bullets: [
      'A **case definition** gives ==reproducible criteria== for including a person in an investigation.',
      'Components: **clinical** features, **person**, **place**, **time**, and sometimes **laboratory** criteria.',
      '“Seems sick” fails because different investigators would apply it differently.',
      'State symptoms, thresholds, dates, and whether ==onset or report date== sets the interval.',
    ],
    callout:
      'It standardizes counting for a population investigation; it does not replace a clinician’s diagnosis.',
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Which part of a case definition is each criterion?',
    bins: ['Person', 'Place', 'Time', 'Clinical'],
    items: [
      ['Attended the June 4 wedding reception', 1],
      ['Onset between June 4 and June 7', 2],
      ['Diarrhea (three or more loose stools in 24 hours)', 3],
      ['Aged 18 or older', 0],
      ['Resident of Elm County', 1],
    ],
    explanation:
      'Age or membership is person, attendance or residence is place, the onset window is time, and symptoms are clinical criteria.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Keep the exposure out',
    bullets: [
      'Person, place, and time should match the investigation population.',
      '==Never embed the suspected exposure==: “ill and ate the dish” makes every case exposed.',
      '**Attendance** can define the source population.',
      'Eating a specific food ==remains an exposure to evaluate==.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Investigators suspect the potato salad. Which case definition allows a valid test?',
    options: [
      'An attendee with vomiting or diarrhea beginning within 72 hours of the picnic',
      'An attendee who ate potato salad and became ill',
      'Anyone who ate potato salad',
      'An ill person who did not eat potato salad',
    ],
    answer: 0,
    explanation:
      'Only the first definition leaves potato salad as an exposure that can differ between cases and non-cases.',
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Classification tiers',
    columns: ['Tier', 'Typical requirement', 'Caution'],
    rows: [
      ['**Suspected**', 'Meets ==clinical== criteria', 'Broad; includes unrelated illness'],
      [
        '**Probable**',
        'Clinical criteria plus an **epidemiologic link**',
        'Exact rules vary by system',
      ],
      [
        '**Confirmed**',
        'Meets the stated ==laboratory== criteria',
        'A negative test may reflect timing or specimen quality',
      ],
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'A symptomatic attendee’s stool test is negative, but the specimen was collected late. How should you classify them?',
    options: [
      'Follow the stated algorithm, noting the limitation',
      'Always count them as confirmed',
      'Delete the record',
      'Change the definition for this one person',
    ],
    answer: 0,
    explanation:
      'Classification follows the written rules; uncertainty about the underlying truth is recorded separately rather than bending the rules.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Broad versus narrow definitions',
    columns: ['', 'Broad (sensitive)', 'Narrow (specific)'],
    rows: [
      ['Captures', 'More ==true cases==, including mild ones', 'Fewer, more certain cases'],
      ['Also includes', 'More ==unrelated illness==', 'Misses atypical or mild cases'],
      ['Best stage', 'Early **case finding**', '**Analytic** comparisons'],
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'Early in an outbreak, investigators want to find every possible case. Which definition suits that goal?',
    options: [
      'A broad, sensitive definition',
      'A narrow, lab-confirmed-only definition',
      'A definition requiring the suspected exposure',
      'No definition at all',
    ],
    answer: 0,
    explanation:
      'Case finding favors sensitivity; later analytic work may tighten the definition for specificity and consistency.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Versioning and reproducibility',
    bullets: [
      'If a definition changes, record the ==version and date== and reclassify earlier records consistently.',
      'Otherwise a trend may reflect ==revised criteria==, not changing disease.',
      'Keep **unknown** or **pending** separate from negative findings.',
      'Store the variables needed to ==reproduce case status==, not just a yes/no label.',
    ],
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: apply the rule',
    problem:
      'A case requires attendance, vomiting or at least three loose stools, and onset on days 1–3. One attendee had one loose stool on day 2.',
    steps: [
      'Attendance and time criteria are ==met==.',
      'Symptom threshold is ==not met==: one stool is below three, and no vomiting.',
      'Classify as not meeting the definition, while keeping the record.',
    ],
    conclusion: 'Failing a **study definition** is not a clinical diagnosis of health.',
  },
  {
    kind: 'sort',
    section: 5,
    prompt:
      'Case rule: attended AND onset days 1–3 AND (vomiting OR 3+ loose stools). Classify each record.',
    bins: ['Meets the definition', 'Does not meet it'],
    items: [
      ['Attended, vomiting on day 2', 0],
      ['Attended, 4 loose stools on day 3', 0],
      ['Attended, vomiting on day 6', 1],
      ['Did not attend, vomiting on day 2', 1],
      ['Attended, 2 loose stools on day 1', 1],
    ],
    explanation:
      'Every AND condition must hold, and the symptom branch needs vomiting or at least three loose stools.',
  },
  {
    kind: 'fill',
    prompt: 'Complete the rules for case definitions.',
    text: 'A case definition must be {0} so two investigators classify records the same way. It should never include the suspected {1}. If it changes, record the new {2}.',
    blanks: ['operational', 'exposure', 'version'],
    distractors: ['flexible', 'symptom', 'diagnosis'],
    explanation:
      'Operational criteria are reproducible, exposures stay out to keep comparisons valid, and versions keep trends honest.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Case definition', back: 'Operational inclusion criteria for an investigation.' },
      { front: 'Suspected case', back: 'Meets stated preliminary criteria.' },
      { front: 'Confirmed case', back: 'Meets the system’s stated confirmation criteria.' },
      {
        front: 'Misclassification',
        back: 'Assignment to the wrong category relative to the reference.',
      },
    ],
  },
  {
    kind: 'open',
    prompt: 'Write a case definition for a stomach illness at a three-day camp.',
    model:
      'A camper or staff member at Camp Pine, June 10–12, with vomiting or three or more loose stools in 24 hours and onset June 10–15; confirmed if stool tests positive for the identified agent.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Case definitions combine **clinical**, **person**, **place**, and **time** criteria.',
      '==Keep the suspected exposure out== of the definition.',
      'Broad definitions find cases; narrow ones sharpen analysis.',
      'Version every change and apply AND/OR logic exactly.',
    ],
  },
]);

const interpreting = defineDeck('epi-u8-l1', [
  {
    kind: 'title',
    title: 'Interpreting results and interrupting transmission',
    subtitle: 'From a ratio to a sentence, and from a mechanism to a control measure.',
    objectives: [
      'Translate ratios into **contextual statements**.',
      'Evaluate **chance**, **bias**, and **confounding**.',
      'Match controls to a link in the **chain of infection**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: risk rose from 1 in a million to 3 in a million. Is that a big deal?',
    options: [
      'Yes, it tripled',
      'No, the absolute change is tiny',
      'Both views matter',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Effect measures in context',
    bullets: [
      '**Risk ratio** compares risks multiplicatively; **risk difference** gives the ==absolute gap==.',
      'A large relative rise from a tiny baseline can be a ==small absolute difference==.',
      'Name the exposure, reference group, outcome, population, and interval.',
      'Do not confuse **percentage points** with **percent increase**.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'Risks are 0.4 in the exposed and 0.1 in the unexposed. What is the risk difference in percentage points?',
    answer: 30,
    tolerance: 0,
    unit: 'points',
    explanation:
      '0.4 − 0.1 = 0.3, or 30 percentage points. The risk ratio is 4, a 300% relative increase.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Uncertainty and chance',
    bullets: [
      'A **point estimate** summarizes the sample but not its ==precision==.',
      'Small cell counts give unstable ratios; **confidence intervals** summarize uncertainty under a model.',
      'An interval containing the ==null value== is not proof of no effect.',
      'An interval excluding the null ==does not establish causation==.',
    ],
    callout:
      'Misclassification, selection, and incomplete denominators can matter more than chance.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'An RR of 2.5 has a 95% confidence interval of 0.8 to 7.6. What is the best interpretation?',
    options: [
      'The estimate is imprecise and compatible with no association',
      'The exposure is proven harmless',
      'The exposure definitely causes illness',
      'The RR must be wrong',
    ],
    answer: 0,
    explanation:
      'The interval includes the null value of 1, so the data are compatible with no association, but they do not prove there is none.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Bias and confounding before certainty',
    bullets: [
      'Review ==how participants entered==, how exposure was measured, and whether ascertainment differed.',
      'Ask whether a **third factor** linked to exposure and outcome explains part of it.',
      'A strong association can survive some bias but is ==not immune== to it.',
      'Several observations from the ==same measurement== are not independent evidence.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'The chain of infection',
    image: 'dd-chain-infection',
    caption:
      'Each link is a place to intervene: **agent**, **reservoir**, **portal of exit**, **mode of transmission**, **portal of entry**, and **susceptible host**.',
    bullets: [
      'Removing a contaminated source targets the ==reservoir or exposure pathway==.',
      'Better ventilation reduces some ==airborne transmission==.',
      '**Vaccination** lowers ==host susceptibility== to the relevant agent.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each control measure to the link it interrupts.',
    pairs: [
      ['Discarding a contaminated batch of salad', 'Reservoir or source'],
      ['Improving ventilation in a classroom', 'Mode of transmission'],
      ['Vaccinating children', 'Susceptible host'],
      ['Covering coughs', 'Portal of exit'],
    ],
    explanation:
      'Removing the source targets the reservoir, ventilation targets airborne transmission, vaccination changes susceptibility, and covering coughs blocks the exit route.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Immediate and longer-term actions',
    bullets: [
      'Recommend ==proportionate controls now== while testing hypotheses.',
      'Later: infrastructure, surveillance, training, or vaccination coverage.',
      'Check whether recommendations were ==implemented and effective==.',
      'A decline after intervention may also reflect ==natural epidemic course== or reporting changes.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Cases fell after a restaurant closed. Why is that not proof the closure worked?',
    options: [
      'The outbreak might have been ending anyway, or reporting lagged',
      'Restaurants never cause outbreaks',
      'Closing a restaurant always increases cases',
      'Declines can only follow vaccination',
    ],
    answer: 0,
    explanation:
      'Point-source outbreaks end on their own once exposure stops, and recent cases are often not yet reported, so a comparison is needed.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Writing a defensible recommendation',
    bullets: [
      'Tie each action to an ==observed problem and a plausible mechanism==.',
      'State an observation that would ==test the leading explanation==.',
      'Describe how success will be **monitored**.',
      'A targeted source investigation beats a generic “more hygiene” list.',
    ],
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: from numbers to next steps',
    problem:
      'Observed risks are 0.4 and 0.1 in a closed cohort. Explain the measures and propose the next step.',
    steps: [
      '**RR** = 4; **risk difference** = 0.3, or 30 percentage points.',
      'Describe the association ==without asserting a proven cause==.',
      'Check timing, measurement, selection, and confounding; seek ==independent source evidence==.',
    ],
    conclusion:
      'A complete interpretation connects **magnitude** with **validity** and a discriminating next step.',
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Order the parts of a strong recommendation.',
    items: [
      'State the observed problem',
      'Name the plausible mechanism',
      'Propose a targeted action',
      'Describe how success will be monitored',
    ],
    explanation:
      'Evidence leads to mechanism, mechanism justifies a targeted action, and monitoring shows whether it worked.',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Handwashing between patients mainly breaks which link in the chain of infection?',
    options: ['Mode of transmission', 'Reservoir', 'Susceptible host', 'Infectious agent'],
    answer: 0,
    explanation: 'Clean hands stop the agent being carried from one person to the next.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Risk difference', back: 'Absolute difference between group risks.' },
      { front: 'Null value', back: 'Value meaning no association, often 1 for ratios.' },
      { front: 'Reservoir', back: 'Where an infectious agent normally persists.' },
      { front: 'Portal of entry', back: 'Route by which an agent enters a host.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Report both **relative** and **absolute** measures, in full sentences.',
      'Confidence intervals show precision, not proof; ==bias can outweigh chance==.',
      'Match every control to a ==specific link== in the chain of infection.',
      'Monitor outcomes and compare before crediting an intervention.',
    ],
  },
]);

const prevention = defineDeck('epi-u9-l1', [
  {
    kind: 'title',
    title: 'Levels of prevention and population strategies',
    subtitle: 'Prevent onset, catch it early, or limit the damage, and know which you are doing.',
    objectives: [
      'Classify prevention by its **target stage**.',
      'Explain **screening** tradeoffs and predictive values.',
      'Choose measures suited to a scenario.',
    ],
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: a test is 90% sensitive and 90% specific. If you test positive, how likely are you to have the disease?',
    options: ['About 90%', 'It depends on how common the disease is', 'About 10%', 'Not sure yet'],
  },
  {
    kind: 'compare',
    section: 0,
    title: 'Three levels of prevention',
    columns: ['Level', 'Goal', 'Examples'],
    rows: [
      ['**Primary**', 'Prevent ==onset==', 'Vaccination, safe water, reducing exposure'],
      ['**Secondary**', 'Detect ==early== and intervene', 'Screening asymptomatic people'],
      [
        '**Tertiary**',
        'Limit ==consequences== of established disease',
        'Rehabilitation, complication management',
      ],
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Primary prevention',
    bullets: [
      '**Primary prevention** stops disease or injury ==before it occurs==.',
      'Vaccination, safer water systems, and reducing harmful exposures.',
      'Classify by ==purpose and target stage==, not by the activity’s name.',
      'A **population strategy** can lower risk broadly even if each person gains a little.',
    ],
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Secondary prevention',
    bullets: [
      '**Secondary prevention**: ==early detection and intervention== to limit progression.',
      '**Screening** targets apparently healthy people; **diagnostic testing** follows symptoms.',
      'A program needs a meaningful condition, a suitable test, and ==useful follow-up==.',
      'More positive tests is not a benefit by itself: false positives and **overdiagnosis** cost.',
    ],
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Tertiary prevention',
    bullets: [
      '**Tertiary prevention** reduces ==complications, disability, or recurrence== after disease is established.',
      'Rehabilitation after a stroke; foot care to prevent diabetic amputations.',
      'Name the ==existing condition== and the harm being reduced.',
      'Improving a **surrogate** number is not the same as improving function.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Classify each action by level of prevention.',
    bins: ['Primary', 'Secondary', 'Tertiary'],
    items: [
      ['Measles vaccination for toddlers', 0],
      ['Mammograms for women without symptoms', 1],
      ['Physical therapy after a hip fracture', 2],
      ['Chlorinating a town’s water supply', 0],
      ['Blood pressure checks at a health fair', 1],
      ['Cardiac rehab after a heart attack', 2],
    ],
    explanation:
      'Preventing onset is primary, detecting early disease in healthy-seeming people is secondary, and limiting harm from established disease is tertiary.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Screening denominators',
    bullets: [
      '**Sensitivity** and **specificity** condition on ==true disease status==.',
      '**Predictive values** condition on the ==test result==.',
      '**PPV** depends strongly on **prevalence** when test performance is fixed.',
      'In low-prevalence groups, ==false positives can outnumber true positives==.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: PPV at low prevalence',
    problem: 'Among 1000 people, 10 have a condition. The test is 90% sensitive and 90% specific.',
    steps: [
      '**True positives** = 0.9 × 10 = 9; false negatives = 1.',
      'Of 990 without it, **false positives** = 0.1 × 990 = 99; true negatives = 891.',
      '**PPV** = 9/(9 + 99) ≈ ==8.3%==.',
    ],
    conclusion: 'Even a 90%/90% test can give a ==low PPV== when the condition is rare.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'Same test (90% sensitive, 90% specific), but 100 of 1000 people have the condition. What is the PPV in percent?',
    answer: 50,
    tolerance: 0.5,
    unit: '%',
    explanation:
      'True positives 90; false positives 0.1 × 900 = 90; PPV = 90/(90 + 90) = 50%. Higher prevalence raises PPV.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Targeted versus population-wide strategies',
    columns: ['', 'Targeted (high-risk)', 'Population-wide'],
    rows: [
      ['Reaches', 'A selected ==high-risk group==', 'Everyone in a broad group'],
      ['Strength', 'Efficient use of resources', 'Shifts ==the whole distribution== of risk'],
      ['Limit', 'Misses cases outside the group', 'Needs infrastructure and implementation'],
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Reducing salt in all packaged foods is an example of which strategy?',
    options: [
      'Population-wide',
      'Targeted high-risk',
      'Tertiary prevention',
      'Secondary screening',
    ],
    answer: 0,
    explanation:
      'It lowers exposure for everyone rather than finding high-risk individuals, a population strategy of primary prevention.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Classifying a scenario carefully',
    bullets: [
      'Ask: is the goal ==avoiding onset==, ==detecting early disease==, or ==reducing consequences==?',
      'Safe water before an outbreak is primary; early detection is secondary; rehab is tertiary.',
      'The same action can span stages, so ==state the scenario’s purpose==.',
      'Pair the classification with an evaluation plan and a limitation.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'Nutrition classes for people already diagnosed with diabetes, to prevent kidney damage, are which level?',
    options: ['Tertiary', 'Primary', 'Secondary', 'None of these'],
    answer: 0,
    explanation:
      'The disease is established and the goal is preventing a complication, so it is tertiary, even though education is often primary elsewhere.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'Mammograms to find early breast cancer in women without symptoms are which level of prevention?',
    options: ['Secondary', 'Primary', 'Tertiary', 'None'],
    answer: 0,
    explanation: 'Screening detects disease early, before symptoms, which is secondary prevention.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Cardiac rehabilitation after a heart attack is which level of prevention?',
    options: ['Tertiary', 'Primary', 'Secondary', 'None'],
    answer: 0,
    explanation:
      'Rehabilitation reduces the consequences of established disease, which is tertiary prevention.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Primary prevention',
        back: 'Avoiding onset by reducing exposure or susceptibility.',
      },
      { front: 'Secondary prevention', back: 'Early detection and intervention.' },
      { front: 'Tertiary prevention', back: 'Reducing consequences of established disease.' },
      { front: 'Predictive value', back: 'Probability of true status given a test result.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '**Primary** prevents onset, **secondary** detects early, **tertiary** limits harm.',
      'Classify by ==purpose and stage==, not by the name of the activity.',
      '==PPV falls as prevalence falls==, even for a good test.',
      'Targeted and population strategies trade efficiency for reach.',
    ],
  },
]);

const walkthrough = defineDeck('epi-u10-l1', [
  {
    kind: 'title',
    title: 'Integrated outbreak study walkthrough',
    subtitle: 'One synthetic banquet, followed from roster to recommendation.',
    objectives: [
      'Connect **study questions**, **tables**, **timing**, and **controls**.',
      'Separate **report evidence** from **inference**.',
      'Evaluate a public health report **transparently**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: when you read a health report, what do you look at first?',
    options: [
      'The headline',
      'The case definition and population',
      'The conclusion',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'A report-reading framework',
    bullets: [
      'Real practice: an **MMWR** report. Here: an ==explicitly synthetic== banquet so everyone has the same data.',
      'Identify the **question**, **population**, **case definition**, **design**, measurements, results, limitations, actions.',
      'A headline is not enough.',
      '==Follow the denominator== from source population to final table, including exclusions.',
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Order the parts of a report as you should trace them.',
    items: [
      'Study question',
      'Source population and case definition',
      'Design and measurements',
      'Results',
      'Limitations and actions',
    ],
    explanation:
      'Knowing the question and population first tells you what the design and results can and cannot mean.',
  },
  {
    kind: 'compare',
    section: 1,
    title: 'The synthetic banquet cohort',
    columns: ['', 'Ill', 'Well'],
    rows: [
      ['**Ate the dish** (50)', '**20** (a)', '30 (b)'],
      ['**Did not eat** (50)', '**5** (c)', '45 (d)'],
      ['All 100 attendees', '25 cases', '75 non-cases'],
    ],
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Why this is a cohort',
    bullets: [
      'All ==100 attendees== were interviewed with one symptom and onset definition.',
      'Selection was by **attendance**, so it is a **retrospective cohort**.',
      'The ==complete roster== makes group risks valid.',
      'If only some ill and well attendees were sampled, the same table would need a different reading.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'What makes risks valid in the banquet table?',
    options: [
      'Every attendee was interviewed, so rows are true at-risk groups',
      'There were more well people than ill people',
      'The dish was tested in a lab',
      'Twenty is larger than five',
    ],
    answer: 0,
    explanation:
      'Complete roster coverage means each row total is the real group at risk, so a/(a+b) and c/(c+d) are risks.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Descriptive evidence',
    bullets: [
      'The **line list** holds each attendee’s exposure, onset, symptoms, and classification.',
      'Plot ==onsets==, not just report dates.',
      'A compact onset cluster after a meal fits a **common exposure** but ==does not identify the dish==.',
      'Foods eaten together are **correlated exposures**; keep missing food histories visible.',
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt:
      'What can a tight onset cluster 12–36 hours after the banquet support? Select all that apply.',
    options: [
      'A common exposure at the event',
      'A point-source pattern',
      'Proof that the dish was the source',
      'The need for an analytic food comparison',
    ],
    answers: [0, 1, 3],
    explanation:
      'The cluster fits a shared point exposure and motivates comparing foods, but timing alone cannot single out the dish.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Analytic evidence',
    problem: 'Using the banquet table: a = 20, b = 30, c = 5, d = 45.',
    steps: [
      'Risks: 20/50 = **0.4** among eaters, 5/50 = **0.1** among non-eaters.',
      '**RR** = 4 and **risk difference** = 0.3.',
      '**OR** = (20 × 45)/(30 × 5) = 6, a ==different quantity==.',
    ],
    conclusion: 'The results ==support investigating the dish== but do not alone prove causation.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt: 'What is the attack proportion among all 100 attendees, in percent?',
    answer: 25,
    tolerance: 0,
    unit: '%',
    explanation: '25 cases (20 + 5) among 100 attendees is an overall attack proportion of 25%.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Actions and communication',
    bullets: [
      'Describe a **targeted exposure interruption** and the evidence for it.',
      'Separate ==actions taken== from ==recommendations not yet implemented==.',
      'Monitor new onsets, allowing for **incubation** and **reporting delays**.',
      'Name the transmission link addressed; don’t invent an agent-specific fix.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Which recommendation best fits the synthetic banquet evidence?',
    options: [
      'Hold remaining servings of the dish and trace its preparation while monitoring new onsets',
      'Vaccinate every attendee against an unnamed agent',
      'Tell everyone to wash hands more, with no other action',
      'Declare the dish proven guilty and close the investigation',
    ],
    answer: 0,
    explanation:
      'It targets the implicated exposure, continues the investigation, and monitors outcomes without overclaiming the cause.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Evaluate and transfer',
    bullets: [
      'Name one ==strength==, one ==limitation==, and one ==next observation==.',
      'Strength: **complete roster** coverage.',
      'Limitations: **recalled exposure** and possible **correlated foods**.',
      'Transfer the framework to a real report by tracing ==its own data==.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Is each point a strength or a limitation of the banquet study?',
    bins: ['Strength', 'Limitation'],
    items: [
      ['Every attendee was interviewed', 0],
      ['Food histories rely on memory', 1],
      ['One consistent case definition was used', 0],
      ['Several dishes were often eaten together', 1],
      ['No laboratory result links the dish to cases', 1],
    ],
    explanation:
      'Complete coverage and a consistent definition strengthen it; recall, correlated foods, and missing lab evidence limit it.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Source population', back: 'Population from which analytic participants arise.' },
      { front: 'Analytic cohort', back: 'Defined group used for an exposure–outcome comparison.' },
      {
        front: 'Independent evidence',
        back: 'Information beyond a repeat of the same measurement.',
      },
      { front: 'Follow-up', back: 'Observation after an action or initial assessment.' },
    ],
  },
  {
    kind: 'open',
    prompt:
      'Summarize the banquet study in four lines: design, calculation, interpretation, next step.',
    model:
      'Design: complete retrospective cohort of 100 attendees. Calculation: risks 0.4 and 0.1, RR 4, risk difference 0.3. Interpretation: association supports investigation, not automatic causation. Next: check correlated foods and seek independent source evidence.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Trace a report from ==question and population== to the final table.',
      'A complete roster makes it a **cohort** with valid **risks**.',
      'Timing suggests a common source; the **2×2 table** tests specific foods.',
      'End with a strength, a limitation, and a ==next observation that could change the conclusion==.',
    ],
  },
]);

export const diseaseDecksApplied: Deck[] = [
  surveillance,
  caseDefinitions,
  interpreting,
  prevention,
  walkthrough,
];
