import { defineDeck } from './presentation-types.ts';

// Experimental Design (Division C) units 5–8: CER reasoning, errors and conclusions,
// comparison standards and significant figures, and practice and review.

const cer = defineDeck('exp-u5-l1', [
  {
    kind: 'title',
    title: 'Claims, evidence, and reasoning for trends and outliers',
    subtitle: 'Claims proportional to data, numbers instead of adjectives, and honest outliers.',
    objectives: [
      'Write claims proportional to the data.',
      'Cite quantitative evidence.',
      'Explain variability with a mechanism.',
      'Handle outliers without selective deletion.',
    ],
    image: 'xd-boxplot',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: is it fine to remove a point that ruins your trend?',
    options: ['Yes', 'No', 'Only one point', 'Not sure yet'],
  },
  {
    kind: 'flow',
    section: 0,
    title: 'The CER structure',
    steps: [
      { label: 'Claim', detail: 'Answer the **specific question**, within the tested range.' },
      { label: 'Evidence', detail: 'Cite **relevant numbers**: means, slopes, spread.' },
      { label: 'Reasoning', detail: 'Explain ==why the evidence supports the claim==.' },
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'What is missing from “The hypothesis is right because the graph goes up”?',
    options: [
      'Quantified evidence, uncertainty, and a mechanism',
      'Nothing; it is a complete CER',
      'A title',
      'A longer sentence',
    ],
    answer: 0,
    explanation: 'A full CER cites numbers, acknowledges spread, and explains why.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'A data-trend CER',
    bullets: [
      'State whether the response **increases, decreases, plateaus, or shows no clear pattern**.',
      'Cite representative **means** and a slope with units.',
      'Compare the ==size of the change with the variation==.',
      'Do not claim a global law from three nearby levels.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Which is quantitative evidence for a trend claim?',
    options: [
      'Means increased from 12 to 20 units across the three levels',
      'The values went up a lot',
      'The graph looks good',
      'We expected it to increase',
    ],
    answer: 0,
    explanation: 'Specific numbers with units let a reader judge the size of the effect.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'A variance CER',
    bullets: [
      'Cite a **range, SD, or visible scatter**, not just “values varied”.',
      'Connect a source to ==how it changes the measurement==.',
      'Inconsistent release impulses can change travel time in either direction.',
      'Small samples give unstable spread estimates.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Flagging outliers with a rule',
    image: 'xd-boxplot',
    caption:
      'A **box plot** marks the median and quartiles; points beyond **1.5 × IQR** are a common, stated criterion for flagging an outlier.',
    bullets: [
      'An outlier is unusual relative to a ==defined pattern==, not a point that harms your conclusion.',
      'Review **contemporaneous notes** and apparatus behavior.',
      'Report analyses **with and without** a flagged value when useful.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Is each handling of an unusual point acceptable or not?',
    bins: ['Acceptable', 'Not acceptable'],
    items: [
      ['Flag it using a stated criterion and report both analyses', 0],
      ['Delete it silently because it weakens the trend', 1],
      ['Exclude it because notes record a dropped ball, and say so', 0],
      ['Replace it with the expected value', 1],
    ],
    explanation: 'Outlier handling must be transparent and rule-based.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Alternative explanations',
    bullets: [
      'A mechanism is stronger when **alternatives make different predictions**.',
      'If drift and level are confounded, a trend could support either.',
      '“The timer missed the endpoint” is ==evidence if noted at the time==; “the timer probably slipped” is speculation.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'How can you tell apart a true level effect and instrument drift?',
    options: [
      'Randomize trial order and add calibration checks',
      'Run more trials in the same order',
      'Use a bigger graph',
      'Assume the hypothesis is right',
    ],
    answer: 0,
    explanation: 'Randomization breaks the link with time, and calibration exposes drift.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Sensitivity and robustness',
    bullets: [
      'Recalculate under a **documented alternative choice**, such as including a flagged point.',
      'If the conclusion changes, ==report the sensitivity==.',
      'Robust conclusions survive relevant, defensible choices.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'Means at levels 1, 2, and 3 are 12, 16, and 20 units. What is the average rise per level?',
    answer: 4,
    tolerance: 0.01,
    unit: 'units',
    explanation: '(20 − 12) ÷ 2 = 4 units per level, an overall rise of 8.',
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: a bounded trend CER',
    problem:
      'At levels 1, 2, 3 the means are 12, 16, 20 units, with SD 2 at each level. Write a bounded CER.',
    steps: [
      '**Claim**: mean response increases across the tested range.',
      '**Evidence**: means rise 4 units per level, 8 overall, with SD about 2.',
      '**Reasoning**: an increasing mechanism fits, but sample size limits certainty and extrapolation.',
    ],
    conclusion: '==A complete CER quantifies support and states its limits.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Claim', back: 'Answer to the defined question.' },
      { front: 'Evidence', back: 'Relevant observations and quantitative results.' },
      { front: 'Reasoning', back: 'Explanation connecting evidence to a claim.' },
      {
        front: 'Sensitivity analysis',
        back: 'Checking how conclusions depend on an analytic choice.',
      },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A CER has a claim, {0}, and reasoning. An outlier is flagged by a stated {1}, and an error explanation says how the source changes the {2}.',
    blanks: ['evidence', 'criterion', 'response'],
    distractors: ['opinion', 'preference', 'hypothesis'],
    explanation: 'Evidence backs claims; rules flag outliers; mechanisms link errors to data.',
  },
  {
    kind: 'open',
    prompt: 'Give a variance mechanism for a timing experiment.',
    model:
      'Inconsistent start and stop reactions vary the measured duration from trial to trial, sometimes longer and sometimes shorter, which spreads the data without shifting the mean much.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Claims stay within the tested system and range.',
      'Cite numbers and spread, not adjectives.',
      '==Flag outliers with a rule, never silently delete them.==',
      'Report when a conclusion is sensitive to a choice.',
    ],
  },
]);

const errors = defineDeck('exp-u6-l1', [
  {
    kind: 'title',
    title: 'Errors, conclusions, and recommendations',
    subtitle: 'Name the mechanism, its direction, and the change that would fix it.',
    objectives: [
      'Distinguish random error from systematic bias.',
      'Predict the direction of a bias.',
      'Tie conclusions to measured evidence.',
      'Recommend targeted improvements.',
    ],
    image: 'xd-prec-lowacc',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: is “human error” a useful error statement?',
    options: ['Yes', 'No', 'Sometimes', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Random error: scattered hits',
    image: 'xd-acc-lowprec',
    caption:
      'Hits **centered on the bullseye but widely spread**: little bias, large ==random variation==.',
    bullets: [
      '**Random error** changes measurements unpredictably across trials.',
      'Inconsistent reaction timing increases **spread**.',
      '“Human error” is too vague; name the action or instrument behavior.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Systematic bias: a tight, offset cluster',
    image: 'xd-prec-lowacc',
    caption:
      'Hits **tightly grouped away from the bullseye**: precise, but ==systematically biased==.',
    bullets: [
      '**Systematic bias** shifts results in a consistent or structured way.',
      'A miscalibrated ruler offsets every reading.',
      'Some sources combine both effects, so explain the mechanism.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Is each source mainly random error or systematic bias?',
    bins: ['Random error', 'Systematic bias'],
    items: [
      ['Inconsistent reaction time when stopping a timer', 0],
      ['A ruler missing its first centimeter', 1],
      ['A scale that reads 2 g heavy', 1],
      ['Small air currents varying from trial to trial', 0],
      ['A thermometer that always reads 1 °C low', 1],
    ],
    explanation: 'Random effects scatter values; systematic ones shift them consistently.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Direction and consequence',
    bullets: [
      'A timer that **starts late** biases duration ==downward==; one that **stops late** biases it upward.',
      'A surface changing with trial order can **distort a slope**.',
      'Some errors shift absolute values but leave differences unchanged.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'The timer is always stopped a moment after the ball crosses the finish mark. How are the recorded times affected?',
    options: ['Biased upward', 'Biased downward', 'Only more spread out', 'Unaffected'],
    answer: 0,
    explanation: 'Stopping after the true endpoint adds time to every recorded duration.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Conclusions from evidence',
    bullets: [
      'Answer the **original problem** with the trend, representative results, variation, and scope.',
      'Say whether data **support, conflict with, or cannot distinguish** the hypothesis.',
      'One small experiment does not ==prove== a hypothesis.',
      'Separate “no effect” from “too noisy to detect one”.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Which conclusion is best supported by a small, clean ramp experiment?',
    options: [
      'The data support the hypothesis over the tested heights',
      'The hypothesis is proven for all ramps',
      'Height has no effect anywhere',
      'Physics is confirmed',
    ],
    answer: 0,
    explanation: 'Keep the conclusion within the tested range and avoid “proven”.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Targeted improvements',
    columns: ['Limitation', 'Improvement', 'Why it helps'],
    rows: [
      ['Endpoint reaction variability', '**Automated timing**', 'Reduces random spread'],
      ['Instrument offset', '**Calibrate against a reference**', '==Removes the bias=='],
      ['Time-linked drift', '**Randomize order**', 'Breaks the confound'],
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each limitation to the improvement that addresses it.',
    pairs: [
      ['A balance that reads 2 g heavy', 'Calibrate with a reference mass'],
      ['Stopwatch reaction time varies', 'Use a light gate'],
      ['High levels always tested last', 'Randomize trial order'],
      ['Large spread with only three units', 'Add independent replicates'],
    ],
    explanation: 'More trials alone do not fix a miscalibration or a confounder.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Further experiments',
    bullets: [
      'Extend the result logically: a ==wider range, another material, or a competing mechanism==.',
      'Change the design deliberately rather than adding uncontrolled factors.',
      '“Do more research” does not identify a test.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Which is the most useful further-experiment recommendation?',
    options: [
      'Repeat with heights from 10 to 60 cm to test whether the trend continues',
      'Do more research',
      'Change the ramp, ball, and timer all at once',
      'Try a completely unrelated topic',
    ],
    answer: 0,
    explanation: 'A good follow-up changes one thing deliberately and defines what it will test.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Transparent reporting',
    bullets: [
      'Report limitations **without rewriting data**.',
      'Keep failed trials, deviations, and missing values traceable.',
      'Separate a ==recommended improvement from an action actually taken==.',
      'A messy result can still be a successful report.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: a fixed offset',
    problem: 'Every timer reading is 0.5 s too high. Would ten more repeats eliminate the bias?',
    steps: [
      'The offset is **systematic**.',
      'Averaging reduces some random variation but **keeps the 0.5 s offset**.',
      '**Calibrate or correct** with a justified reference, and document it.',
    ],
    conclusion: '==Replication alone cannot remove a systematic offset.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Random error', back: 'Unpredictable variation across observations.' },
      { front: 'Systematic bias', back: 'Consistent or structured distortion.' },
      { front: 'Validity', back: 'How well evidence supports the intended inference.' },
      { front: 'Extrapolation', back: 'Extending a relationship beyond observed conditions.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A fixed +0.5 s offset is a {0} bias. More repeats reduce {1} error but not the offset, which needs {2}.',
    blanks: ['systematic', 'random', 'calibration'],
    distractors: ['random', 'systematic', 'replication'],
    explanation: 'Offsets are systematic; averaging helps only with random scatter.',
  },
  {
    kind: 'open',
    prompt: 'Propose a follow-up experiment to test whether temperature drift caused your trend.',
    model:
      'Repeat the experiment with temperature held stable, or randomize trial order while recording temperature, and see whether the trend persists.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Random error spreads data; bias shifts it.',
      'State each error’s mechanism and direction.',
      '==More repeats do not remove a systematic offset.==',
      'Recommendations must target a named limitation.',
    ],
  },
]);

const standards = defineDeck('exp-u7-l1', [
  {
    kind: 'title',
    title: 'Division C comparison standards, significant figures, and abstracts',
    subtitle: 'A meaningful reference, justified digits, and a summary that says something.',
    objectives: [
      'Choose a meaningful standard of comparison.',
      'Keep reference conditions fair.',
      'Apply significant-figure rules in context.',
      'Write an abstract that reflects the actual study.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: must a control group always have a response of zero?',
    options: ['Yes', 'No', 'Only in biology', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Standard of comparison',
    bullets: [
      'A **defined reference condition**: an untreated group, a baseline level, or an established treatment.',
      'It is ==not the list of controlled variables== and not necessarily a zero response.',
      'A **vehicle control** separates a solvent’s effect from the active ingredient’s.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'A drug is dissolved in alcohol before being applied. What is the best standard of comparison?',
    options: [
      'Alcohol alone, applied the same way',
      'No treatment and no handling',
      'A list of controlled variables',
      'The highest dose',
    ],
    answer: 0,
    explanation: 'A vehicle control separates the solvent’s effect from the drug’s.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Fair reference conditions',
    bullets: [
      'The reference should share **handling, lighting, and measurement** with the treatments.',
      'Record its **sample size and raw values** with the same care.',
      'A reference mean has ==uncertainty too==.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'The control plants were watered by hand while treated plants used drip lines. What is the problem?',
    options: [
      'The reference differs in more than the intended factor',
      'Control groups never need water',
      'Nothing, as long as the plants grew',
      'There are too many plants',
    ],
    answer: 0,
    explanation: 'Any extra difference in handling can distort the comparison.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Significant figures and resolution',
    bullets: [
      'Significant figures communicate ==justified precision==, not a full uncertainty analysis.',
      '**Leading zeros** only locate the decimal point.',
      '**Trailing zeros** can show precision; scientific notation removes ambiguity.',
      'Exact counts and defined conversions do not limit precision.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'How many significant figures does 0.00450 have?',
    answer: 3,
    tolerance: 0,
    explanation: 'Leading zeros do not count; 4, 5, and the trailing 0 do.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Calculation rules',
    columns: ['Operation', 'Rule', 'Example'],
    rows: [
      ['Multiply or divide', 'Fewest **significant figures**', '2.0 × 3.00 = ==6.0== cm²'],
      ['Add or subtract', 'Fewest **decimal places**', '2.0 + 3.00 = ==5.0== cm'],
      ['Intermediate steps', 'Keep **guard digits**', 'Round only at the end'],
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'How should 2.0 cm × 3.00 cm be reported?',
    options: ['6.0 cm²', '6 cm²', '6.00 cm²', '6.000 cm²'],
    answer: 0,
    explanation: 'The limiting input, 2.0, has two significant figures.',
  },
  {
    kind: 'flow',
    section: 4,
    title: 'An abstract with content',
    steps: [
      { label: 'Question', detail: 'The **system and variables** studied.' },
      { label: 'Design', detail: 'Levels, response, and **replication**.' },
      { label: 'Result', detail: 'The ==principal quantitative finding==.' },
      { label: 'Conclusion', detail: 'A **bounded** answer with its main limitation.' },
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Select everything a strong abstract contains.',
    options: [
      'The tested range of the independent variable',
      'The main numerical result',
      'A bounded conclusion',
      '“Data were collected” with no numbers',
    ],
    answers: [0, 1, 2],
    explanation: 'Write the abstract after the analysis so it agrees with the report.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Integration and consistency',
    bullets: [
      'The abstract, graph, statistics, and conclusion use the ==same units, sample sizes, and reference==.',
      'Avoid a rounded abstract value that contradicts the table.',
      'If a result is inconclusive, say so.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: two precision rules',
    problem: 'Report the area from measured lengths 2.0 cm and 3.00 cm, then report their sum.',
    steps: [
      'Area before rounding is 6.00 cm²; the limiting input has **two significant figures**.',
      'Report **6.0 cm²** under the multiplication rule.',
      'For addition, 2.0 + 3.00 = **5.0 cm**, keeping the limiting tenths place.',
    ],
    conclusion: '==Multiplication and addition use different precision rules.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Standard of comparison',
        back: 'Defined reference condition for evaluating treatments.',
      },
      {
        front: 'Vehicle control',
        back: 'Receives the treatment carrier without the active component.',
      },
      { front: 'Significant figures', back: 'Digits communicating measurement precision.' },
      { front: 'Abstract', back: 'Compact summary of question, methods, results, and conclusion.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: '2.0 + 3.00 cm is reported as {0} cm. A control mean has {1}, and an abstract gives the principal {2}.',
    blanks: ['5.0', 'uncertainty', 'result'],
    distractors: ['5.00', 'no spread', 'procedure'],
    explanation:
      'Decimal-place rule for addition; references are measured too; abstracts report findings.',
  },
  {
    kind: 'open',
    prompt: 'Write a compact abstract skeleton for the ramp experiment.',
    model:
      'Question and system; release heights tested and the transit-time response with replicates; the main mean change with spread; a bounded conclusion and one key limitation.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'A standard of comparison is a fair, defined reference.',
      'Reference conditions match treatments except for the intended factor.',
      '==Multiply by significant figures; add by decimal places.==',
      'An abstract states the real result and its limits.',
    ],
  },
]);

const practice = defineDeck('exp-u8-l1', [
  {
    kind: 'title',
    title: 'Practice, timing, teamwork, and final review',
    subtitle: 'Plan backward, share definitions, protect the evidence, and review the whole chain.',
    objectives: [
      'Plan time for measurement and analysis.',
      'Coordinate roles with shared definitions.',
      'Protect the evidence trail.',
      'Use review evidence to choose the next practice.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what most often runs out first in a timed experiment?',
    options: ['Materials', 'Time for analysis', 'Ideas', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Plan backward from the report',
    bullets: [
      'A full experiment needs time for **design, pilot, collection, calculation, graphing, reasoning, and review**.',
      '==Reserve time for sections that depend on data==.',
      'Do not spend the session on an elaborate apparatus with no time to analyze.',
      'Measure real task durations in practice.',
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Order the stages of a timed experiment.',
    items: [
      'Design and pilot',
      'Collect data',
      'Calculate and graph',
      'Write reasoning and conclusion',
      'Review the whole report',
    ],
    explanation: 'Later stages depend on data, so reserve time for them up front.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Shared definitions',
    bullets: [
      'Agree on **levels, endpoints, units, trial IDs, and the comparison standard**.',
      'Brief **check-ins** catch a procedure change before it spreads.',
      'A shared diagram and raw table ==reduce ambiguity==.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Two teammates time trials using different finish marks. What is the result?',
    options: [
      'Their data measure different things and cannot be combined directly',
      'More precise data',
      'An automatic control group',
      'Nothing, if both are careful',
    ],
    answer: 0,
    explanation: 'Different operational definitions create contradictions in the data and report.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Protect the evidence trail',
    bullets: [
      'Record values **immediately** and keep anomalies with notes.',
      'Mark which trials used each **procedure version**.',
      '==Never fabricate data== to fill a table; a smaller valid set is more defensible.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Time runs out with two trials missing. What should you do?',
    options: [
      'Report the smaller dataset and note the missing trials',
      'Fill in values that match the trend',
      'Copy values from another level',
      'Delete the whole level',
    ],
    answer: 0,
    explanation: 'Fabricating data is never acceptable; transparent gaps are.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Review the whole chain',
    bullets: [
      'Check that **problem, hypothesis, variables, procedure, axes, statistics, and conclusion** agree.',
      'Verify **sample sizes, units, and arithmetic**.',
      'Read the conclusion beside the original question to catch ==scope drift==.',
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Which checks belong in a final coherence review?',
    options: [
      'The graph axes match the variables',
      'Sample sizes agree across sections',
      'The conclusion answers the original question',
      'The cover page uses a nice font',
    ],
    answers: [0, 1, 2],
    explanation: 'Coherence means every section describes the same experiment consistently.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Practice with variation',
    bullets: [
      'Use **different materials and prompts** so the team must design, not reproduce.',
      'Rotate emphasis: procedures, then statistics, then CER and errors.',
      'After each practice, ==name one bottleneck and pick a drill==.',
    ],
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each reflection to a targeted fix.',
    pairs: [
      ['Ran out of time', 'Simplify setup or parallelize tasks'],
      ['Large variability', 'Improve measurement or add replicates'],
      ['Trend was confounded', 'Repair allocation and controls'],
      ['Sections contradicted each other', 'Agree definitions and review the chain'],
    ],
    explanation:
      'A useful reflection separates design, measurement, analysis, and communication problems.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: no time for analysis',
    problem:
      'A team finishes data collection with little time left and no graph or analysis. Suggest a targeted practice change.',
    steps: [
      'Measure where the time went: **setup, resetting, recording, or coordination**.',
      '**Simplify** the apparatus or **parallelize** independent tasks.',
      'Reserve analysis time and test the workflow on a **new prompt**.',
    ],
    conclusion: '==Fix the actual bottleneck rather than writing faster.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Bottleneck', back: 'Task limiting overall progress or quality.' },
      { front: 'Coherence', back: 'Agreement among design, data, analysis, and conclusions.' },
      { front: 'Guard digits', back: 'Extra intermediate digits kept to avoid rounding error.' },
      { front: 'Audit trail', back: 'Traceable record from observations to reported results.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Plan {0} from the report. Teammates share operational {1}, and a missing trial is never {2}.',
    blanks: ['backward', 'definitions', 'fabricated'],
    distractors: ['forward', 'opinions', 'recorded'],
    explanation:
      'Reserve time for dependent sections; agree definitions; keep the evidence honest.',
  },
  {
    kind: 'open',
    prompt: 'Describe one practice reflection your team could act on next time.',
    model:
      'For example: setup took most of the time, so next practice we will use a simpler apparatus and split recording and graphing in parallel, then check whether analysis time improves.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Plan backward and reserve analysis time.',
      'Share definitions before splitting roles.',
      '==Never fabricate data; report gaps transparently.==',
      'Reflect on one bottleneck and test a fix.',
    ],
  },
]);

export const xdDecksAnalysis = [cer, errors, standards, practice];
