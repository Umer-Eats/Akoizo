import type { Deck } from './presentation-types.ts';
import { defineDeck } from './presentation-types.ts';
import { xdDecksAnalysis } from './presentations-experimental-design-2.ts';

// Experimental Design (Division C) presentations, one per lesson, following presentations-anatomy.ts.

const prompt = defineDeck('exp-u1-l1', [
  {
    kind: 'title',
    title: 'The experiment and the prompt packet',
    subtitle: 'Turn a broad topic and a box of materials into one measurable comparison.',
    objectives: [
      'Tell an experiment from a demonstration.',
      'Extract constraints from the prompt.',
      'Pilot for feasibility before adding complexity.',
      'Keep the whole report about one experiment.',
    ],
    image: 'xd-method',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: if your hypothesis turns out wrong, was the experiment a failure?',
    options: ['Yes', 'No', 'Only if the graph is messy', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'An experiment is a comparison',
    image: 'xd-method',
    caption:
      'The scientific method as a cycle: question, research, hypothesis, test, analyze, report. The **test** step must be a ==deliberate comparison==.',
    bullets: [
      'Change a **defined factor** and measure a **response**.',
      'A demonstration that something happens is **not automatically an experiment**.',
      'The outcome must be ==operationally measurable== with the materials and time available.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Which response is most operationally defined?',
    options: [
      'Time in seconds between two fixed marks',
      'How fast the ball seems',
      'Whether the ramp works well',
      'The ball’s overall motion',
    ],
    answer: 0,
    explanation:
      'An operational definition says exactly how the value is measured, with units and endpoints.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Read the supplied constraints',
    bullets: [
      'Identify **allowed materials, topic boundaries, required sections, safety, and timing** from the actual prompt.',
      'Do not assume a familiar practice experiment is permitted.',
      'Turn the constraints into a ==short checklist== before choosing a design.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which items belong on your constraint checklist before designing?',
    options: [
      'Allowed materials',
      'Required report sections',
      'Time limit',
      'Last year’s experiment',
    ],
    answers: [0, 1, 2],
    explanation: 'Read the actual prompt; an earlier experiment may not fit this one.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Feasibility before complexity',
    bullets: [
      '**Pilot** the measurement with a small check.',
      'Confirm the response ==changes enough to detect== and the apparatus resets consistently.',
      'Too many factors leave too little time for replication.',
      'Keep pilot trials separate from final data.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'What is the main purpose of a pilot run?',
    options: [
      'To check feasibility and procedure',
      'To add extra final data',
      'To prove the hypothesis',
      'To pick the best-looking result',
    ],
    answer: 0,
    explanation:
      'A pilot tests whether the plan works; it should not be quietly mixed into the final data.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'A connected report',
    bullets: [
      '**Problem, hypothesis, variables, procedure, data, graph, statistics, errors, and conclusion** describe the same experiment.',
      'If the independent variable is release height, the graph axis ==should not become ramp angle==.',
      'Keep units and labels consistent across sections.',
    ],
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Order the main report sections.',
    items: ['Problem', 'Hypothesis', 'Procedure', 'Data and graph', 'Conclusion'],
    explanation: 'Each section builds on the previous one and must describe the same comparison.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Roles and traceability',
    bullets: [
      'Roles can split measuring, recording, and analysis, but everyone shares the ==operational definitions==.',
      'Record **raw data at collection time** with trial identifiers and units.',
      'Keep failed trials with an explanation instead of copying only neat ones.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Is each a feature of a quality experiment or not required for quality?',
    bins: ['Marks of quality', 'Not required'],
    items: [
      ['A valid comparison', 0],
      ['A perfectly straight line', 1],
      ['A reproducible procedure', 0],
      ['A confirmed hypothesis', 1],
      ['A conclusion proportional to the evidence', 0],
    ],
    explanation: 'An experiment can be excellent while showing no effect or substantial variation.',
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: from topic to question',
    problem:
      'A prompt supplies a ramp, object, ruler, and timer. Turn “study motion” into a testable question.',
    steps: [
      'Choose **release height** as the independent variable with defined levels.',
      'Define the response as **time between two fixed marks**.',
      'Hold the object, surface, release method, and distance **constant**, and replicate.',
    ],
    conclusion: '==A narrow, measurable comparison supports a reproducible experiment.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Independent variable', back: 'Factor deliberately changed.' },
      { front: 'Dependent variable', back: 'Measured response.' },
      {
        front: 'Operational definition',
        back: 'Specific rule for how a variable is set or measured.',
      },
      { front: 'Pilot', back: 'Preliminary feasibility check before the final protocol.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'An experiment deliberately changes the {0} variable and measures the {1} variable. A {2} checks feasibility before final data.',
    blanks: ['independent', 'dependent', 'pilot'],
    distractors: ['controlled', 'constant', 'conclusion'],
    explanation: 'Change one defined factor, measure the response, and test the plan first.',
  },
  {
    kind: 'open',
    prompt: 'Why is a beautiful apparatus with no clear independent variable a weak experiment?',
    model:
      'Without a deliberate change and a measured response, there is no comparison, so the data cannot support or contradict any prediction.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'An experiment is a deliberate, measurable comparison.',
      'Build a checklist from the actual prompt.',
      '==Pilot first; keep the design focused.==',
      'Every report section describes the same experiment.',
    ],
  },
]);

const variables = defineDeck('exp-u2-l1', [
  {
    kind: 'title',
    title: 'Problem, hypothesis, variables, and experimentation',
    subtitle: 'A testable question, a reasoned prediction, and a fair design.',
    objectives: [
      'Write a testable directional hypothesis with reasoning.',
      'Distinguish controlled variables from a control condition.',
      'Explain independent replication.',
      'Use randomized order to reduce confounding.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: is “keeping the light the same” a control group?',
    options: ['Yes', 'No', 'Sometimes', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'State the relationship',
    bullets: [
      'A problem names the **independent variable, dependent variable, system, and conditions**.',
      '“How does release height affect transit time for this object on this ramp?” beats ==“What affects speed?”==',
      'State a practical **range of levels** and units.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Which problem statement is most testable?',
    options: [
      'How does release height affect transit time of this ball on this ramp?',
      'What affects speed?',
      'Are ramps interesting?',
      'Why do things move?',
    ],
    answer: 0,
    explanation: 'It names the variables, the system, and a specific comparison.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'A hypothesis with a mechanism',
    bullets: [
      'Predict a **relationship** and explain **why**.',
      'Example: higher release ==decreases transit time== because more potential energy becomes kinetic energy.',
      'The prediction is conditional on the system and range.',
      'Never rewrite the original prediction after seeing results.',
    ],
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Variables and controls',
    columns: ['Term', 'Meaning', 'Fertilizer example'],
    rows: [
      ['**Independent**', 'Deliberately changed', 'Concentration'],
      ['**Dependent**', 'Measured', 'Biomass'],
      ['**Controlled**', 'Kept comparable', 'Light, water'],
      ['**Control condition**', '==A reference treatment==', 'No added fertilizer'],
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'In a fertilizer experiment, classify each item.',
    bins: ['Independent', 'Dependent', 'Controlled', 'Control condition'],
    items: [
      ['Fertilizer concentration', 0],
      ['Plant biomass after 3 weeks', 1],
      ['Hours of light', 2],
      ['Pots with no added fertilizer', 3],
      ['Pot size', 2],
    ],
    explanation:
      'A control condition is a reference treatment; controlled variables are conditions held constant.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Levels and replication',
    bullets: [
      'Choose **several levels** spanning a meaningful range.',
      '**Replicate independently** at each level so variability can be estimated.',
      'Measuring the same object again checks consistency but ==is not an independent unit==.',
      'Reset the procedure between trials and record trial identifiers.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'You measure one plant’s height five times. What does that give you?',
    options: [
      'Measurement consistency for one plant, not five independent plants',
      'Five independent replicates',
      'A control condition',
      'Proof of the fertilizer effect',
    ],
    answer: 0,
    explanation:
      'Repeated readings of one unit check the measurement; independent units represent the treatment.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Randomization and blocking',
    bullets: [
      '**Randomizing trial order** reduces links between treatment and time-dependent conditions.',
      '**Blocking** compares treatments within groups of similar units.',
      'Random **sampling** and random **assignment** are ==different ideas==.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each design tool to what it helps with.',
    pairs: [
      ['Randomized order', 'Time-linked drift and practice effects'],
      ['Blocking', 'Known nuisance variation between groups'],
      ['Random sampling', 'Representing a larger population'],
      ['Random assignment', 'Balancing units across treatments'],
    ],
    explanation: 'Each tool addresses a different source of unfairness.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Confounding',
    bullets: [
      'If high levels are always tested after the ramp gets smoother, ==level and surface are confounded==.',
      'The difference cannot be assigned to height alone.',
      'Name a plausible **alternative explanation** and how the design reduces it.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'All low-level trials run early and all high-level trials run late while the instrument drifts upward. What is the problem?',
    options: [
      'Time order is confounded with level',
      'There are too many trials',
      'The control condition is missing',
      'Nothing; replication fixes it',
    ],
    answer: 0,
    explanation: 'Drift can imitate a level effect; randomize order or block, and calibrate.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: drift and order',
    problem:
      'All low-level trials occur early and all high-level trials occur late while the instrument drifts upward.',
    steps: [
      'Time and level are **systematically associated**.',
      'Upward drift can **imitate or exaggerate** a positive level effect.',
      '**Randomize order** or block, and add calibration checks.',
    ],
    conclusion: '==Replication alone does not remove systematic confounding.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Control condition', back: 'Reference treatment for comparison.' },
      { front: 'Controlled variable', back: 'Condition kept comparable.' },
      { front: 'Replication', back: 'Repeated independent experimental units or trials.' },
      {
        front: 'Confounding',
        back: 'A competing factor systematically linked with the intended factor.',
      },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A hypothesis predicts a relationship and gives a {0}. A control condition is a reference {1}, and randomizing trial {2} reduces time-linked confounding.',
    blanks: ['mechanism', 'treatment', 'order'],
    distractors: ['result', 'variable', 'size'],
    explanation: 'Explain why; compare against a reference; randomize when trials run.',
  },
  {
    kind: 'open',
    prompt: 'Write a directional hypothesis for the ramp experiment, with its reasoning.',
    model:
      'Increasing release height will reduce transit time between the marks under comparable conditions, because more gravitational potential energy becomes kinetic energy.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'A testable problem names variables, system, and range.',
      'Hypotheses predict a direction and explain why.',
      '==Controlled variables are not the same as a control condition.==',
      'Randomize or block to break confounding with time.',
    ],
  },
]);

const procedure = defineDeck('exp-u3-l1', [
  {
    kind: 'title',
    title: 'Materials, reproducible procedures, and qualitative data',
    subtitle: 'Write it so another team could repeat it without asking.',
    objectives: [
      'List materials with relevant specifications.',
      'Write operational, numbered procedure steps.',
      'Separate qualitative observations from inferences.',
      'Record raw data and missing values honestly.',
    ],
    image: 'xd-hahn-notebook',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: if you miss a reading, is it okay to write 0?',
    options: ['Yes', 'No', 'Only for time', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Materials with specifications',
    bullets: [
      'List materials **actually used** with quantities and relevant dimensions.',
      '“A cup” may be inadequate if ==volume, shape, or material== matters.',
      'Give measuring tools with their **resolution**.',
      'Never claim precision finer than the readable scale.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Which materials entry is most useful?',
    options: ['250 mL glass beaker', 'A cup', 'Some container', 'Lab stuff'],
    answer: 0,
    explanation: 'Volume and material can affect the result, so specify them.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Operational steps',
    bullets: [
      'Specify **setup, levels, endpoints, resetting, trial order, replication, and recording**.',
      'Say ==exactly what starts and stops the clock==.',
      'State whether an object is pushed or released without added impulse.',
      'Number the steps so another person can follow them.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'How would you improve the step “release and time it”?',
    options: [
      'Specify the release point and method',
      'Name the start and stop marks for the timer',
      'State the number of trials and units',
      'Say “do it normally”',
    ],
    answers: [0, 1, 2],
    explanation: 'Operational steps remove guesswork for anyone repeating the work.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Diagrams as part of the method',
    bullets: [
      'A labeled setup diagram shows **distances, orientations, and reference marks**.',
      'It must ==agree with the procedure and data table==.',
      'State which dimensions are specified and which are illustrative.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'Your setup diagram shows the timing marks 50 cm apart, but the procedure says 40 cm. What should you do?',
    options: [
      'Fix whichever is wrong so the diagram and procedure agree',
      'Leave both; readers will average them',
      'Delete the diagram',
      'Nothing; diagrams are decoration',
    ],
    answer: 0,
    explanation: 'The diagram is part of the method and must match the written procedure and data.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Qualitative observations',
    image: 'xd-hahn-notebook',
    caption:
      'Otto Hahn’s lab notebook: **dated notes** beside columns of numbers. Observations were ==recorded at the time==, not reconstructed later.',
    bullets: [
      '**Qualitative data** describe wobbling, color change, slipping, or bubbles.',
      '“The object wobbled on trial 4” is an **observation**; “friction increased” is an **inference**.',
      'Notes can flag a trial for review but do not replace the measurement.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Is each note an observation or an inference?',
    bins: ['Observation', 'Inference'],
    items: [
      ['The ball wobbled on trial 4', 0],
      ['Friction increased on later trials', 1],
      ['Bubbles formed after 30 s', 0],
      ['The reaction sped up because it warmed', 1],
      ['The solution turned blue', 0],
    ],
    explanation: 'Observations record what happened; inferences propose why and need evidence.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Measurement records',
    bullets: [
      'A raw table holds **level, trial ID, value, units, and notes**.',
      'Mark missing values ==missing with a reason, not zero==.',
      'Keep raw values separate from means or corrected values.',
      'More decimal places do not mean more accuracy.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'The observer missed a timer endpoint on trial 3. What goes in the table?',
    options: [
      '“Missing — endpoint missed,” keeping the trial ID',
      '0 s',
      'The average of the other trials',
      'Delete trial 3',
    ],
    answer: 0,
    explanation:
      'A zero or an invented value would distort the analysis and hide the evidence trail.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Reproducibility and limits',
    bullets: [
      'Ask someone to ==rebuild the setup from your procedure and diagram==.',
      'Every question they ask marks a step to improve.',
      'Record **deviations** as they happen and whether they affect the comparison.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: a missed reading',
    problem:
      'A trial has no timer reading because the observer missed the endpoint. What should the table and procedure record?',
    steps: [
      'Mark the value **missing, not zero**.',
      'Record the **reason** and keep the trial identifier.',
      'Repeat under a **predefined rule** if feasible, and document the repeat.',
    ],
    conclusion: '==Transparent missing-data handling preserves the evidence trail.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Resolution', back: 'Smallest distinguishable instrument increment.' },
      {
        front: 'Qualitative data',
        back: 'Descriptive observations rather than the primary measurement.',
      },
      { front: 'Raw data', back: 'Original recorded measurements before processing.' },
      { front: 'Protocol deviation', back: 'Departure from the stated procedure.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A missed reading is recorded as {0} with a reason. A timing method needs explicit start and {1} events, and raw data stay separate from {2} values.',
    blanks: ['missing', 'stop', 'summary'],
    distractors: ['zero', 'pause', 'raw'],
    explanation:
      'Never write zero for a missing value; define both endpoints; keep processing separate.',
  },
  {
    kind: 'open',
    prompt: 'Why keep raw data separate from calculated means in your report?',
    model:
      'Separate raw values let a reader audit and recalculate the summaries, and they keep original observations from being confused with processed results.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Specify materials and tool resolution.',
      'Number steps and define every endpoint.',
      '==Observations are not inferences.==',
      'Missing means missing, never zero.',
    ],
  },
]);

const statistics = defineDeck('exp-u4-l1', [
  {
    kind: 'title',
    title: 'Quantitative data, graphs, and statistics',
    subtitle: 'Summaries, spread, axes, and what a fitted line can and cannot say.',
    objectives: [
      'Compute mean, median, range, and sample SD.',
      'Choose axes that match the design.',
      'Interpret fits without overclaiming.',
      'Distinguish precision from accuracy.',
    ],
    image: 'xd-sd',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: does a high R² prove one variable causes the other?',
    options: ['Yes', 'No', 'Only above 0.9', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Raw data and summaries',
    bullets: [
      '**Mean** = sum ÷ count; **median** = middle ordered value; **range** = max − min.',
      'An extreme value ==pulls the mean== more than the median.',
      'Report **sample size and units** with each summary.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'Response values are 8, 10, and 12. What is the mean?',
    answer: 10,
    tolerance: 0.01,
    explanation: 'Mean = (8 + 10 + 12) / 3 = 30 / 3 = 10.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Standard deviation',
    image: 'xd-sd',
    caption:
      'For a normal distribution, about **68%** of values lie within one SD of the mean and **95%** within two. SD has ==the same units as the data==.',
    bullets: [
      'Sample variance = Σ(x − x̄)² ÷ **(n − 1)**; SD is its square root.',
      'Variance has **squared units**.',
      'Standard error = SD ÷ √n describes the ==precision of the mean==, not individual spread.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'For values 8, 10, and 12, what is the sample standard deviation?',
    answer: 2,
    tolerance: 0.01,
    explanation: 'Squared deviations 4, 0, 4 sum to 8; 8 ÷ (3 − 1) = 4; √4 = 2.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Choosing a graph',
    bullets: [
      'Put the **independent variable on the x-axis** and the response on the y-axis.',
      'Include **labels, units, and a useful scale**.',
      'Scatter plots preserve individual trials; mean points should ==show variability==.',
      'Do not join categories as if they were a continuous scale.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'In a ramp experiment testing release height, which axis should show release height?',
    options: [
      'The horizontal (x) axis',
      'The vertical (y) axis',
      'Either, it does not matter',
      'Neither; use a pie chart',
    ],
    answer: 0,
    explanation:
      'The deliberately changed variable goes on the x-axis in an ordinary one-factor design.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Same statistics, different data',
    image: 'xd-anscombe',
    caption:
      '**Anscombe’s quartet**: four data sets share the same mean, variance, and fitted line, yet look completely different. ==Always plot the points.==',
    bullets: [
      'A high **R²** does not establish causation or valid extrapolation.',
      'A straight line can fit a narrow part of a curve.',
      'Inspect **residuals** and individual points.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'What correlation measures',
    image: 'xd-correlation',
    caption:
      'Correlation measures how tightly points follow a ==straight line==, not the slope. Strongly patterned clouds can still have **r = 0**.',
    bullets: [
      'The sign shows direction; the magnitude shows **linear** tightness.',
      'Curved or clustered patterns can hide a strong relationship.',
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Select every true statement about fitted lines.',
    options: [
      'A high R² does not prove causation',
      'Two data sets can share a fitted line but look very different',
      'A good fit in the tested range justifies any extrapolation',
      'Residuals help show whether a model form is appropriate',
    ],
    answers: [0, 1, 3],
    explanation: 'Fit statistics summarize; they do not replace looking at the data or the design.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Precision and accuracy',
    columns: ['Idea', 'Means', 'Improved by'],
    rows: [
      ['**Precision**', 'Consistency, small spread', 'Better technique, more replication'],
      ['**Accuracy**', 'Closeness to a reference', '==Calibration, removing bias=='],
      ['**Resolution**', 'Smallest readable step', 'A finer instrument'],
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Repeated readings cluster tightly but every one is 0.5 s too high. These data are…',
    options: [
      'Precise but not accurate',
      'Accurate but not precise',
      'Both precise and accurate',
      'Neither',
    ],
    answer: 0,
    explanation:
      'Tight clustering is precision; a consistent offset is a bias that hurts accuracy.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'A complete analysis statement',
    bullets: [
      'Give the **pattern, representative numbers, spread, and scope**.',
      'Example: “Mean response rose from 12 to 20 units across levels 1–3, with SD near 2.”',
      'The lab does no formal test, so ==do not call results “significant”==.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: three values',
    problem: 'For response values 8, 10, 12, calculate the mean, range, and sample SD.',
    steps: [
      'Mean = 30/3 = **10**. Range = 12 − 8 = **4**.',
      'Squared deviations are 4, 0, 4; sum = 8.',
      'Variance = 8/(3 − 1) = 4; **SD = 2**.',
    ],
    conclusion: '==Mean, range, and SD describe different features of the data.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Mean', back: 'Arithmetic average.' },
      {
        front: 'Sample standard deviation',
        back: 'Spread estimate using squared deviations and n − 1.',
      },
      { front: 'Residual', back: 'Observed value minus model prediction.' },
      { front: 'Precision', back: 'Consistency or limited spread of measurements.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Sample SD divides by n minus {0}. Standard deviation has the data’s {1}, and a high R² does not prove {2}.',
    blanks: ['1', 'units', 'causation'],
    distractors: ['2', 'squares', 'precision'],
    explanation: 'The n − 1 estimator; SD in response units; fit is not cause.',
  },
  {
    kind: 'open',
    prompt: 'Why should a graph show individual trials and not only the means?',
    model:
      'Individual points reveal spread, unusual values, sample size, and patterns that a mean alone can hide, as Anscombe’s quartet shows.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Report summaries with n and units.',
      'SD describes spread; SE describes the mean’s precision.',
      '==Always plot the points; fit statistics can mislead.==',
      'Precision is not accuracy.',
    ],
  },
]);

export const decks: Deck[] = [prompt, variables, procedure, statistics, ...xdDecksAnalysis];
