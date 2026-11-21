import { defineDeck, type Deck } from './presentation-types.ts';
import { diseaseDecksApplied } from './presentations-disease-detectives-2.ts';

// Disease Detectives (Division C) presentations. Each deck follows its lesson in
// lessons-disease-detectives.ts section by section (`section` is the lesson section index), and
// its activities rehearse the lesson's measures, worked example, and reasoning checks.

const background = defineDeck('epi-u1-l1', [
  {
    kind: 'title',
    title: 'Epidemiological background and natural history',
    subtitle: 'Counting disease in populations, with the right denominator and the right clock.',
    objectives: [
      'Distinguish **clinical** questions from **population** questions.',
      'Separate **incidence** from **prevalence**.',
      'Describe the **natural history** and **spectrum** of disease.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: a town reports 40 flu cases this week. Is that a lot?',
    options: [
      'Yes, 40 is a lot',
      'No, 40 is small',
      'It depends on the population size',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The population perspective',
    bullets: [
      '**Epidemiology** studies the ==distribution and determinants== of health states in specified populations.',
      'A **clinical** question asks what explains one person’s illness.',
      'A **population** question asks why cases are more common in one group, place, or period.',
      'One striking case does not establish a population rate.',
    ],
    callout: 'Define the population and the observation period before counting anything.',
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Is each question clinical or population-level?',
    bins: ['Clinical (one person)', 'Population'],
    items: [
      ['What is causing this patient’s rash?', 0],
      ['Why are rashes more common in one school?', 1],
      ['Should this patient get an antibiotic?', 0],
      ['Did illness rise in March compared with February?', 1],
      ['Which neighborhood has the highest asthma rate?', 1],
    ],
    explanation:
      'Clinical questions are about one individual; population questions compare groups, places, or periods.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Counts need denominators',
    bullets: [
      '10 cases among 20 people and 10 cases among 200 are ==very different risks==.',
      'A **proportion** has its numerator inside its denominator.',
      'A **rate** puts time or **person-time** in the denominator.',
      'Groups can differ in age, exposure, and follow-up, so even correct arithmetic can mislead.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'Group A: 10 ill of 20. Group B: 10 ill of 200. What percent of group A became ill?',
    answer: 50,
    tolerance: 0,
    unit: '%',
    explanation:
      '10/20 = 50%, while group B is 10/200 = 5%. The same count of cases means a tenfold difference in risk.',
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Incidence versus prevalence',
    columns: ['', 'Incidence', 'Prevalence'],
    rows: [
      ['Counts', '**New** cases during a period', '**Existing** cases at a point or period'],
      ['Denominator', 'People initially ==at risk==', 'The whole defined population'],
      ['Depends on', 'How often disease starts', 'Occurrence ==and duration=='],
      [
        'Outbreak use',
        '**Attack proportion** (cumulative incidence)',
        'Rarely used for a short outbreak',
      ],
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'A long-lasting chronic disease has few new cases each year but many people living with it. Which is true?',
    options: [
      'Prevalence can be high while incidence is low',
      'Incidence must equal prevalence',
      'Prevalence must be low because incidence is low',
      'Duration has no effect on prevalence',
    ],
    answer: 0,
    explanation:
      'Prevalence depends on both how often disease starts and how long it lasts, so long duration builds up existing cases.',
  },
  {
    kind: 'flow',
    section: 3,
    title: 'Natural history of disease',
    steps: [
      { label: 'Susceptibility', detail: 'The host can become ill but has not yet been exposed.' },
      { label: 'Exposure', detail: 'Contact with the agent or risk factor begins the process.' },
      {
        label: 'Subclinical disease',
        detail: 'Changes start without symptoms; **screening** may detect them here.',
      },
      {
        label: 'Clinical disease',
        detail: 'Symptoms begin; the **incubation period** ends at symptom onset.',
      },
      { label: 'Outcome', detail: 'Recovery, disability, or death, ==without intervention==.' },
    ],
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Order these events in one infectious illness.',
    items: [
      'Exposure to the agent',
      'Infection',
      'Symptom onset',
      'Diagnosis',
      'Report to the health department',
    ],
    explanation:
      'Infection, illness, diagnosis, and reporting are distinct events at different times; some may never happen at all.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'The disease iceberg',
    bullets: [
      'Reported cases are often only the ==visible tip== of total burden.',
      'Some infections are **asymptomatic**; mild illnesses may never be tested.',
      'Severe cases are more likely to enter surveillance, so reported cases look ==sicker and older==.',
      'The iceberg idea supplies no numerical multiplier without data.',
    ],
    callout: 'Differences in testing can imitate differences in disease frequency.',
  },
  {
    kind: 'multi',
    section: 4,
    prompt:
      'Which could make reported cases a biased picture of all infections? Select all that apply.',
    options: [
      'Many infections cause no symptoms',
      'Mild cases are rarely tested',
      'Severe cases are more likely to be hospitalized and reported',
      'Every infected person is tested once',
    ],
    answers: [0, 1, 2],
    explanation:
      'Asymptomatic, untested, and preferentially reported severe cases all distort what reaches the count. Universal testing would reduce that bias.',
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: name the measure',
    problem:
      'In a closed group of 100 well people, 10 develop the illness in one week. Separately, 15 of 100 residents have a chronic condition on survey day.',
    steps: [
      'Outbreak: **cumulative incidence** = 10/100 = 10% for the week.',
      'Survey: **point prevalence** = 15/100 = 15% on that day.',
      'The 15% is ==not 15 new cases== during the week.',
    ],
    conclusion: 'Every measure must be named with its **population** and **time definition**.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Framing a sound comparison',
    bullets: [
      'Write the **outcome**, **population**, **grouping variable**, and **period** in one sentence.',
      'Use the ==same case definition and ascertainment== in both groups.',
      'If one group gets more testing, name **detection bias** before interpreting a higher count.',
      'Lab tables assume complete counts; real data must earn that assumption.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'School A tests every student weekly; school B tests only students with symptoms. A reports more cases. What is the first concern?',
    options: [
      'Detection bias from unequal ascertainment',
      'School A must have more transmission',
      'School B students are immune',
      'The case definition is too narrow',
    ],
    answer: 0,
    explanation:
      'More testing finds more cases, including mild ones, so unequal ascertainment can produce the difference by itself.',
  },
  {
    kind: 'fill',
    prompt: 'Complete the definitions.',
    text: '{0} counts new cases among people at risk; {1} counts existing cases. The time from infection to symptom onset is the {2} period.',
    blanks: ['Incidence', 'prevalence', 'incubation'],
    distractors: ['Prevalence', 'incidence', 'latent'],
    explanation:
      'Incidence is new cases, prevalence is existing cases, and the incubation period ends at symptom onset.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Incidence',
        back: 'New cases among an at-risk population during a defined period.',
      },
      { front: 'Prevalence', back: 'Existing cases in a defined population and time frame.' },
      { front: 'Incubation period', back: 'Time from infection to symptom onset.' },
      { front: 'Ascertainment', back: 'How cases are identified and counted.' },
    ],
  },
  {
    kind: 'open',
    prompt: 'Write one sentence that defines a fair comparison of illness between two dorms.',
    model:
      'Compare the proportion of residents in each dorm with onset of the defined illness between May 1 and May 14, using the same case definition and testing approach in both.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '**Epidemiology** asks population questions with defined denominators.',
      '**Incidence** counts new cases; **prevalence** counts existing ones and grows with duration.',
      'Natural history separates infection, symptoms, diagnosis, and reporting.',
      '==Reported cases are the tip of the iceberg==, shaped by who gets tested.',
    ],
  },
]);

const history = defineDeck('epi-u2-l1', [
  {
    kind: 'title',
    title: 'History of epidemiology and causal reasoning',
    subtitle: 'What Snow, Lind, and Semmelweis teach about comparison and cause.',
    objectives: [
      'Explain what historical **comparisons** contributed.',
      'Distinguish **association** from **causation**.',
      'Identify evidence that discriminates competing explanations.',
    ],
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: ice cream sales and drownings rise together each summer. Does ice cream cause drowning?',
    options: ['Yes', 'No, something else drives both', 'Partly', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Why history matters',
    bullets: [
      'Patterns can justify action ==before a mechanism is understood==.',
      'Learn the reasoning: **compare groups**, **map cases**, **establish time order**, **test alternatives**.',
      'A compelling story can hide weak measurement or comparison.',
      'Retrospective summaries look tidier than real investigations did.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'John Snow and cholera, 1854',
    image: 'dd-snow-map',
    caption:
      'Snow’s map of Soho stacks a bar for each cholera death at its address; the deaths cluster around the **Broad Street pump**.',
    bullets: [
      'The map is a ==descriptive clue==; without population denominators it does not estimate risk.',
      'His comparison of homes supplied by two **water companies** was the stronger analytic evidence.',
      'Removing the pump handle was a prudent control, but it did not by itself prove the cause.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'Why did comparing households served by different water companies strengthen Snow’s argument?',
    options: [
      'It compared death rates in groups with differing exposure',
      'It showed the exact bacterium',
      'It mapped every death more precisely',
      'It proved the pump handle removal ended the outbreak',
    ],
    answer: 0,
    explanation:
      'Comparing similar neighborhoods supplied by different sources turned a spatial clue into an exposure comparison with denominators.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Lind and comparison groups',
    bullets: [
      'In 1747 **James Lind** gave sailors with scurvy different treatments under similar conditions.',
      'Those given **citrus** improved quickly; the others did not.',
      'A **comparison group** separates a treatment effect from improvement that would happen anyway.',
      'Modern trials add ==randomization, defined outcomes, replication, and ethics review==.',
    ],
    image: 'dd-lind',
    callout: 'One small historical success does not show that every confounder was controlled.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Semmelweis and handwashing',
    image: 'dd-semmelweis',
    caption:
      'Monthly maternal deaths in the doctors’ clinic in Vienna swung as high as 30% until ==chlorine hand-washing== began in 1847, then fell close to zero.',
    bullets: [
      'Doctors came straight from autopsies; midwives did not, a **plausible transmission pathway**.',
      'Before-and-after comparisons can still shift with patient mix or reporting changes.',
      'Name the ==link that is interrupted==: contaminated hands carrying material to patients.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each investigator to the method their work illustrates.',
    pairs: [
      ['John Snow', 'Mapping cases and comparing water supplies'],
      ['James Lind', 'Allocating treatments to similar patients'],
      ['Ignaz Semmelweis', 'Comparing clinics and changing a practice'],
    ],
    explanation:
      'Snow combined maps and supplier comparisons, Lind compared treatments, and Semmelweis compared clinics before and after hand-washing.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Association, temporality, and confounding',
    bullets: [
      'An **association** is a statistical relationship; ==causation needs a stronger argument==.',
      '**Temporality**: exposure must precede outcome.',
      'A **confounder** is related to both exposure and outcome and is ==not on the causal pathway==.',
      '**Stratification** or adjustment can separate the effect when valid data exist.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt:
      'Which must be true for age to confound an exposure–illness comparison? Select all that apply.',
    options: [
      'Age is associated with the exposure',
      'Age affects the risk of illness',
      'Age is not a step on the path from exposure to illness',
      'Age is measured in years',
    ],
    answers: [0, 1, 2],
    explanation:
      'A confounder relates to both exposure and outcome and is not an intermediate on the causal pathway. The unit of measurement is irrelevant.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: an older exposed group',
    problem:
      'Illness is more common among users of water source A, who are also much older. What should be investigated?',
    steps: [
      'Confirm **exposure preceded illness** and case definitions were comparable.',
      'Check whether **age** is associated with both source use and illness risk.',
      'Compare ==within age strata== or adjust, while checking bias and chance.',
    ],
    conclusion:
      'The crude association justifies investigation but ==does not alone prove== the water caused illness.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'From a clue to a test',
    bullets: [
      'Turn a clue into a **specific testable prediction**.',
      'Water hypothesis: compare illness by ==documented source use== with one case definition.',
      'Ask what would differ if a **food source** were responsible instead.',
      'Collecting only fitting examples is **confirmation bias**.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'An investigator interviews only ill people who drank the suspect water. What is the main flaw?',
    options: [
      'No comparison group, inviting confirmation bias',
      'Too many people were interviewed',
      'The case definition is too broad',
      'Water can never cause illness',
    ],
    answer: 0,
    explanation:
      'Without well people or unexposed people, there is nothing to compare; the design only collects confirming examples.',
  },
  {
    kind: 'sort',
    prompt: 'Is each statement an association or a causal claim?',
    bins: ['Association', 'Causal claim'],
    items: [
      ['Illness was more common among source A users', 0],
      ['Source A water caused the illness', 1],
      ['Smokers had higher lung cancer rates', 0],
      ['Hand-washing reduced maternal deaths', 1],
    ],
    explanation:
      'Associations describe co-occurrence; causal claims assert that changing the exposure changes the outcome and need stronger evidence.',
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Coffee drinkers have more lung cancer, but coffee drinkers also smoke more. What is smoking here?',
    options: [
      'A likely confounder',
      'The outcome',
      'Proof that coffee causes cancer',
      'A comparison group',
    ],
    answer: 0,
    explanation:
      'Smoking relates to both coffee drinking and lung cancer, so it can distort the coffee–cancer association.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Association', back: 'A measured relationship between variables.' },
      { front: 'Confounding', back: 'Distortion by a related external factor.' },
      { front: 'Temporality', back: 'Exposure precedes the outcome.' },
      { front: 'Comparison group', back: 'Reference group used to evaluate a difference.' },
    ],
  },
  {
    kind: 'open',
    prompt:
      'What one observation would distinguish a water-source hypothesis from a food-source hypothesis?',
    model:
      'Compare illness among people who drank source A but ate none of the suspect food with people who ate the food but drank other water; the hypotheses predict different risks in those groups.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Snow, Lind, and Semmelweis all relied on ==comparison==, not just observation.',
      'A map or a before-after change is a clue; a **comparison with denominators** is a test.',
      '**Confounders** relate to exposure and outcome and lie off the causal path.',
      'Seek evidence that ==could prove your hypothesis wrong==.',
    ],
  },
]);

const outbreak = defineDeck('epi-u3-l1', [
  {
    kind: 'title',
    title: 'Outbreak investigation and descriptive evidence',
    subtitle: 'Line lists, epidemic curves, and person–place–time patterns.',
    objectives: [
      'Build a usable **line list**.',
      'Read an **epidemic curve** without overclaiming its source.',
      'Connect descriptive findings to **analytic hypotheses**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what would you do first if 20 students got sick after a picnic?',
    options: [
      'Test the potato salad',
      'Confirm and define who is a case',
      'Close the school',
      'Not sure yet',
    ],
  },
  {
    kind: 'flow',
    section: 0,
    title: 'Steps of an outbreak investigation',
    steps: [
      {
        label: 'Confirm',
        detail: 'Verify the **diagnosis** and that cases exceed what is expected.',
      },
      {
        label: 'Define and find cases',
        detail: 'Write a **case definition** and search systematically.',
      },
      { label: 'Describe', detail: 'Summarize by **person, place, and time**.' },
      {
        label: 'Hypothesize and test',
        detail: 'Compare exposed and unexposed with an analytic study.',
      },
      {
        label: 'Control and communicate',
        detail: '==Controls can start early==; report and revise.',
      },
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Put these investigation activities in their usual starting order.',
    items: [
      'Confirm the diagnosis and excess cases',
      'Establish a case definition',
      'Describe cases by person, place, and time',
      'Test hypotheses with an analytic comparison',
      'Communicate findings',
    ],
    explanation:
      'The steps overlap and are revisited, and controls may begin at any point, but this is the usual order in which each starts.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Line listings',
    bullets: [
      'A **line list** has ==one case per row== with standard columns: ID, onset date, symptoms, place, exposures, status.',
      'Do not count repeated lab reports as separate people.',
      'Keep **missing** values distinct from an explicit **“no”**.',
      'Use **onset dates** for disease patterns; report dates can be delayed or batched.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which are good line-list practices? Select all that apply.',
    options: [
      'One row per case',
      'Recording “unknown” separately from “no”',
      'Adding a new row for each repeat lab result on the same person',
      'Recording symptom onset date',
    ],
    answers: [0, 1, 3],
    explanation:
      'One person per row, distinct missing values, and onset dates make the list sortable and honest. Repeat lab reports would double-count people.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Epidemic curves',
    image: 'dd-epi-curve',
    caption:
      'An **epidemic curve** is a histogram of cases by ==onset date==. This WHO curve shows weekly MERS cases; each sharp spike is a separate hospital outbreak.',
    bullets: [
      '**Point source**: a compact cluster spread by incubation times.',
      '**Continuous common source**: a plateau while exposure continues.',
      '**Propagated**: successive waves about one incubation period apart.',
      'Bin width and reporting delays change the shape, so ==shape is a clue, not a diagnosis==.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each epidemic-curve shape to the pattern it suggests.',
    pairs: [
      ['One sharp peak, then a fall', 'Point source'],
      ['A long, irregular plateau', 'Continuous common source'],
      [
        'Rising waves spaced about one incubation period apart',
        'Propagated person-to-person spread',
      ],
    ],
    explanation:
      'A brief exposure gives one cluster, ongoing exposure gives a plateau, and person-to-person spread gives generations of cases.',
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: onset versus report date',
    problem:
      'Six cases have onset on day 1, eight on day 2, and two on day 3. All were reported on day 5.',
    steps: [
      'The **onset curve** has three bins: 6, 8, 2.',
      'A **report-date** curve shows 16 cases on day 5, which ==is not when people got sick==.',
      'Use onset timing to form source hypotheses, then check completeness.',
    ],
    conclusion: 'The **time variable** changes the meaning of the curve.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'In that example, how many cases fall in the tallest onset bin?',
    answer: 8,
    tolerance: 0,
    unit: 'cases',
    explanation: 'Day 2 has 8 onsets, the peak of the 6, 8, 2 onset curve.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Person and place',
    bullets: [
      'Describe age, occupation, or attendance ==with denominators==.',
      'A place with more cases may simply have **more people**.',
      'A **spot map** shows where cases are; a **rate map** compares cases to population.',
      'Residence may not be where exposure happened; protect **privacy** in real reports.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'Dorm X has 12 cases and dorm Y has 6. What do you need before saying X has higher risk?',
    options: [
      'The number of residents in each dorm',
      'The exact time of each report',
      'A larger map',
      'Nothing; 12 is more than 6',
    ],
    answer: 0,
    explanation:
      'If X houses 400 and Y houses 60, Y’s risk (10%) is far higher than X’s (3%). Counts need denominators.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Generating and evaluating hypotheses',
    bullets: [
      'Combine onset timing, shared activities, exposures, and **plausible incubation periods**.',
      'A hypothesis names the agent, **source**, **route**, and population at risk.',
      'Test it by comparing ==exposed and unexposed== people.',
      'Never ==build the exposure into the case definition== you use to test it.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Why is “an ill attendee who ate the chicken” a bad case definition for testing the chicken?',
    options: [
      'Every case is exposed by definition, so no comparison is possible',
      'It is too long to write',
      'It excludes attendees',
      'Chicken cannot cause illness',
    ],
    answer: 0,
    explanation:
      'Defining cases by the exposure makes the association automatic; attendance can define the population, but eating chicken must remain an exposure to measure.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Communicating provisional findings',
    bullets: [
      'State the **case definition**, number of cases, period, pattern, hypotheses, controls, and uncertainty.',
      'Separate ==confirmed findings from possibilities==.',
      'A falling tail may reflect control, ==reporting delay==, or incomplete recent data.',
      'Mark the **data cutoff** and revise as information arrives.',
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the outbreak summary rules.',
    text: 'A line list has one {0} per row. An epidemic curve plots cases by {1} date. Successive waves of cases suggest {2} spread.',
    blanks: ['case', 'onset', 'propagated'],
    distractors: ['report', 'exposure', 'point-source'],
    explanation:
      'Line lists hold one case per row, epi curves use onset dates, and waves suggest propagated person-to-person spread.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Line list', back: 'One-row-per-case standardized record.' },
      { front: 'Epidemic curve', back: 'Histogram of cases by onset (or another stated time).' },
      { front: 'Point source', back: 'Exposure concentrated in a short interval.' },
      { front: 'Propagated outbreak', back: 'Spread through successive transmission generations.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Investigation steps ==overlap==; controls can start before proof.',
      'Line lists: one person per row, missing kept separate from “no.”',
      'Epi curves use **onset dates**; shape suggests but does not prove a source.',
      'Test exposures against a **comparison group**, never inside the case definition.',
    ],
  },
]);

const tables = defineDeck('epi-u4-l1', [
  {
    kind: 'title',
    title: 'Two-by-two tables and quantitative measures',
    subtitle: 'Label the cells first, then calculate risk ratios, odds ratios, and test accuracy.',
    objectives: [
      'Label **a, b, c, d** before using a formula.',
      'Compute **RR** and **OR** in the right designs.',
      'Reinterpret **diagnostic tables** with correct denominators.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: a risk of 0.5 corresponds to what odds?',
    options: ['0.5', '1', '2', 'Not sure yet'],
  },
  {
    kind: 'compare',
    section: 0,
    title: 'Set up the exposure table',
    columns: ['', 'Ill', 'Well'],
    rows: [
      ['**Exposed**', '**a** (exposed ill)', '**b** (exposed well)'],
      ['**Unexposed**', '**c** (unexposed ill)', '**d** (unexposed well)'],
      ['Totals', 'a + c = all cases', 'b + d = all non-cases'],
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt:
      'Match each cell to its meaning in an exposure table (rows exposed/unexposed, columns ill/well).',
    pairs: [
      ['a', 'Exposed and ill'],
      ['b', 'Exposed and well'],
      ['c', 'Unexposed and ill'],
      ['d', 'Unexposed and well'],
    ],
    explanation:
      'Write the cell meanings before applying any formula, because some sources transpose rows and columns.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Risk and risk ratio',
    bullets: [
      'Exposed risk = **a/(a+b)**; unexposed risk = **c/(c+d)**.',
      '**RR** = exposed risk ÷ unexposed risk. RR = 1 means ==equal risk==.',
      '**Risk difference** subtracts the two risks: an ==absolute== comparison.',
      'Risks need denominators of people **at risk**, so they come from cohorts, not case-control samples.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: one cohort, three measures',
    problem: 'a = 20, b = 30, c = 5, d = 45 in an exposure–outcome cohort.',
    steps: [
      'Exposed risk = 20/50 = **0.4**; unexposed risk = 5/50 = **0.1**.',
      '**RR** = 0.4/0.1 = 4.',
      '**OR** = (20 × 45)/(30 × 5) = 6; **risk difference** = 0.3, or 30 percentage points.',
    ],
    conclusion: '==RR and OR are different measures== and are not interchangeable here.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'a = 30, b = 70, c = 10, d = 90. What is the risk ratio?',
    answer: 3,
    tolerance: 0.01,
    explanation: 'Exposed risk 30/100 = 0.3; unexposed 10/100 = 0.1; RR = 0.3/0.1 = 3.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Odds and odds ratio',
    bullets: [
      'Odds among exposed = **a/b**; among unexposed = **c/d**; **OR = ad/bc**.',
      'Odds are not probabilities: ==risk 0.5 equals odds 1==.',
      'In a **case-control** study, the OR estimates the association; sampled case fractions are not risks.',
      'OR ≈ RR only when the outcome is ==rare==.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'Using a = 30, b = 70, c = 10, d = 90, what is the odds ratio? (Round to two decimals.)',
    answer: 3.86,
    tolerance: 0.01,
    explanation:
      'OR = (30 × 90)/(70 × 10) = 2700/700 ≈ 3.86, larger than the RR of 3 because the outcome is fairly common.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Diagnostic table orientation',
    image: 'dd-sens-spec',
    caption:
      'Filled dots have the condition; the circle holds positive tests. **Sensitivity** asks what share of ==filled dots== are inside; **specificity** asks what share of ==open dots== are outside.',
    bullets: [
      'a = **true positive**, b = **false positive**, c = **false negative**, d = **true negative**.',
      '**Sensitivity** = a/(a+c); **specificity** = d/(b+d).',
      '**PPV** = a/(a+b); **NPV** = d/(c+d).',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt:
      'Match each diagnostic measure to its formula (rows test +/−, columns disease present/absent).',
    pairs: [
      ['Sensitivity', 'a/(a+c)'],
      ['Specificity', 'd/(b+d)'],
      ['Positive predictive value', 'a/(a+b)'],
      ['Negative predictive value', 'd/(c+d)'],
    ],
    explanation:
      'Sensitivity and specificity condition on true disease status (columns); predictive values condition on the test result (rows).',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'A test finds 45 of 50 people with the disease (a = 45, c = 5). What is its sensitivity in percent?',
    answer: 90,
    tolerance: 0,
    unit: '%',
    explanation: 'Sensitivity = a/(a+c) = 45/50 = 90%.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Undefined values and uncertainty',
    bullets: [
      'A zero denominator makes a ratio ==undefined==, not zero or infinite.',
      'Zero risk in the reference group breaks an ordinary RR.',
      'No **continuity correction** unless the method calls for it.',
      'Small counts give **unstable** estimates; a big point estimate says nothing about **precision**.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'No unexposed person became ill (c = 0). What is the ordinary risk ratio?',
    options: ['Undefined', 'Zero', 'One', 'Exactly equal to the exposed risk'],
    answer: 0,
    explanation:
      'The unexposed risk is 0, so RR divides by zero and is undefined. Report the risks and say so rather than inventing a value.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Write the meaning, not just a number',
    bullets: [
      'RR = 4: the exposed group had ==four times the observed risk== of the defined outcome in the period.',
      'It is not four extra cases per person, and not a proven cause.',
      'Sensitivity: the fraction of **truly diseased** people who test positive.',
      'Check formulas with extremes: equal risks give RR = 1; a perfect test has no false results.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Which sentence best interprets RR = 4?',
    options: [
      'Exposed attendees had four times the observed risk of illness during the event',
      'The exposure caused four cases per person',
      'Exposed people had a 4% risk',
      'The exposure is proven to cause illness',
    ],
    answer: 0,
    explanation:
      'RR is a multiplicative comparison of observed risks for a named outcome, population, and period, not proof of cause.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Risk ratio', back: 'Exposed risk divided by reference risk.' },
      { front: 'Odds ratio', back: 'Ratio of odds, ad/bc in the labeled table.' },
      { front: 'Sensitivity', back: 'Fraction of reference-positive people testing positive.' },
      { front: 'Specificity', back: 'Fraction of reference-negative people testing negative.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '==Label a, b, c, d first==; layouts vary between sources.',
      '**RR** compares risks in cohorts; **OR = ad/bc** suits case-control samples.',
      'Sensitivity and specificity read down columns; **PPV** and **NPV** read across rows.',
      'Zero denominators are undefined; always write the measure as a sentence.',
    ],
  },
]);

const designs = defineDeck('epi-u5-l1', [
  {
    kind: 'title',
    title: 'Identifying study designs',
    subtitle: 'How people entered the study decides the design and the measure it supports.',
    objectives: [
      'Recognize how participants were **selected**.',
      'Choose an association measure the **design** supports.',
      'Identify **selection bias** and **confounding** risks.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: a study that uses old records must be case-control. True?',
    options: ['True', 'False', 'Only sometimes', 'Not sure yet'],
  },
  {
    kind: 'compare',
    section: 0,
    title: 'Selection defines the design',
    columns: ['Design', 'People enter by…', 'Main measure'],
    rows: [
      ['**Cohort**', 'Defined population or ==exposure== group', 'Risk, **RR**'],
      ['**Case-control**', 'Their ==outcome==: cases and controls', '**OR** of past exposure'],
      ['**Cross-sectional**', 'A snapshot of a population', '**Prevalence** comparisons'],
      ['**Experiment**', 'Investigator ==assigns== the intervention', 'Risk, RR'],
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Classify each study by its design.',
    bins: ['Cohort', 'Case-control', 'Cross-sectional'],
    items: [
      ['Follow smokers and nonsmokers for 10 years and compare stroke', 0],
      ['Recruit 50 people with a rare cancer and 100 without, then ask about past solvent use', 1],
      ['Survey 2000 adults once about diet and current diabetes', 2],
      ['Use 1990s employment records to compare later illness in exposed and unexposed workers', 0],
      ['Compare past travel among 30 ill people and 60 well neighbors', 1],
    ],
    explanation:
      'Selection by exposure or population is a cohort (even from old records), selection by outcome is case-control, and a single snapshot is cross-sectional.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Cohort reasoning',
    bullets: [
      'A **closed cohort** with complete follow-up can estimate ==risk== in each exposure group.',
      'A banquet roster with every attendee’s food history supports a **retrospective cohort**.',
      'People are included because they ==attended==, not because they got sick.',
      'Foods eaten together create **correlated exposures** one crude ratio cannot separate.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: the banquet roster',
    problem:
      'Investigators interview every attendee on a banquet roster after an outbreak and compare illness by food eaten. What design is it?',
    steps: [
      'Selection is by **attendance**, not by illness status.',
      'Exposure and outcome are reconstructed for the ==whole defined group==.',
      'Food-specific **risks** and **RR** can be estimated if ascertainment is complete.',
    ],
    conclusion:
      'It is a **retrospective cohort**, even though data were collected after the event.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Case-control reasoning',
    bullets: [
      'Select **cases** and **controls**; controls should represent exposure in the ==source population==.',
      'Efficient for **rare** outcomes or when the population cannot be listed.',
      'Investigators choose the numbers, so sample proportions ==are not disease risks==.',
      'Use the **odds ratio**; never pick controls for their low exposure.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'In a case-control study with 100 cases and 200 controls, why can’t you compute disease risk?',
    options: [
      'The investigators fixed how many cases and controls were sampled',
      'There are too few people',
      'Controls never have the exposure',
      'Odds ratios are always larger than risk ratios',
    ],
    answer: 0,
    explanation:
      'The one-third case fraction reflects the sampling plan, not the population, so only the exposure odds ratio is meaningful.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Cross-sectional and ecological studies',
    bullets: [
      'A **cross-sectional** survey measures exposure and outcome together: good for prevalence, ==weak on time order==.',
      'An **ecological** study uses group-level data, such as regional averages and rates.',
      'A group pattern need not hold for individuals: the **ecological fallacy**.',
      'Name the ==unit of analysis== and timing before interpreting.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'Countries with more TVs per person have longer life expectancy. Concluding that buying a TV extends your life commits which error?',
    options: ['Ecological fallacy', 'Recall bias', 'Detection bias', 'Misclassification of cases'],
    answer: 0,
    explanation:
      'A country-level association does not show that the same relationship holds within individuals; wealth plausibly drives both.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Experiments and allocation',
    bullets: [
      'An **experiment** ==assigns== the intervention rather than observing it.',
      '**Random allocation** reduces confounding on average, not perfectly in small samples.',
      '**Blinding** reduces some measurement and behavior effects.',
      '**Random sampling** concerns representation; **random assignment** concerns fair comparison.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each tool to what it mainly protects.',
    pairs: [
      ['Random sampling', 'Representativeness of the population'],
      ['Random assignment', 'Comparable intervention groups'],
      ['Blinding', 'Unbiased measurement and behavior'],
    ],
    explanation:
      'Sampling decides who is studied, assignment decides who gets the intervention, and blinding keeps knowledge of the group from shaping results.',
  },
  {
    kind: 'compare',
    section: 5,
    title: 'Three threats to validity',
    columns: ['Threat', 'What goes wrong', 'Example'],
    rows: [
      [
        '**Selection bias**',
        'Who is ==included or retained== distorts the comparison',
        'Controls recruited from a health club',
      ],
      [
        '**Information bias**',
        'Exposure or outcome ==measured differently==',
        'Cases recall foods more readily (**recall bias**)',
      ],
      [
        '**Confounding**',
        'A third factor tied to both exposure and outcome',
        'Age differs between exposure groups',
      ],
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Name the main threat in each scenario.',
    bins: ['Selection bias', 'Information bias', 'Confounding'],
    items: [
      ['Ill people think harder about what they ate than well people', 1],
      ['Controls are chosen from a vegetarian club in a meat-dish study', 0],
      ['Coffee drinkers smoke more, and smoking causes the disease', 2],
      ['Sicker cohort members drop out before follow-up ends', 0],
      ['Interviewers probe cases more thoroughly than controls', 1],
    ],
    explanation:
      'Inclusion or retention problems are selection bias, unequal measurement is information bias, and a factor tied to both exposure and outcome is confounding.',
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Volunteers are randomly assigned to a new vaccine or placebo and followed for infection. What design is this?',
    options: [
      'Randomized controlled trial',
      'Case-control study',
      'Cross-sectional survey',
      'Ecological study',
    ],
    answer: 0,
    explanation: 'Investigators allocate the exposure at random, which makes it an experiment.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Cohort', back: 'Outcomes studied within a defined population or exposure groups.' },
      { front: 'Case-control', back: 'Selection by outcome, comparing past exposures.' },
      { front: 'Cross-sectional', back: 'Exposure and outcome measured at one snapshot.' },
      { front: 'Selection bias', back: 'Distortion caused by inclusion or retention.' },
    ],
  },
  {
    kind: 'open',
    prompt:
      'A case-control study recruits controls from a hospital. Name one limitation and a design fix.',
    model:
      'Hospital controls may have exposures linked to their own illnesses, so they may not represent the source population; recruiting community controls from the same area would fix that.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '==How people entered the study== defines the design, not when data were collected.',
      'Cohorts give **risks and RR**; case-control gives **OR**; cross-sectional gives **prevalence**.',
      'Ecological patterns may not hold for individuals.',
      'Name the selection method, measure, main bias, and a fix.',
    ],
  },
]);

export const decks: Deck[] = [
  background,
  history,
  outbreak,
  tables,
  designs,
  ...diseaseDecksApplied,
];
