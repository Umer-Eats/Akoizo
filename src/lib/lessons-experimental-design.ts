import { buildCourse } from './lesson-course-builder.ts';

export const experimentalDesignLessons = buildCourse({
  eventId: 'experimental-design',
  eventName: 'Experimental Design',
  prefix: 'exp',
  lab: 'experiment',
  syllabus: 'Introduction to Experimental Design Syllabus.pdf',
  intro:
    'Design, document, analyze, and defend a reproducible experiment. Eight units follow the supplied introductory syllabus, including Division C standards of comparison, significant figures, and abstracts. Practice uses synthetic data; actual event prompts, required sections, and scoring follow the applicable tournament checklist.',
  references: [
    {
      title: 'Science Olympiad Experimental Design C resources and checklists',
      url: 'https://www.soinc.org/experimental-design-c',
    },
  ],
  chapters: [
    {
      title: 'The experiment and the prompt packet',
      description: 'Task constraints, evidence, feasibility, and report structure.',
      objectives: [
        'Extract constraints from a prompt.',
        'Choose a measurable experimental question.',
        'Plan linked design, measurement, and reporting steps.',
      ],
      sections: [
        [
          'An experiment is a comparison',
          'An experiment deliberately changes a defined factor and measures a response while managing alternative explanations. A demonstration that something happens is not automatically an experiment testing a relationship. Begin with a comparison that could produce evidence for or against a prediction. The outcome must be operationally measurable using the available materials and time. A beautiful apparatus with no clear independent variable or response can produce observations without answering a scientific question.',
        ],
        [
          'Read the supplied constraints',
          'Identify allowed materials, topic boundaries, required report sections, safety conditions, and timing from the actual prompt and rules. The syllabus teaches a process rather than guaranteeing a particular tournament format. Do not assume a familiar practice experiment is permitted for every prompt. Translate the constraints into a short checklist before choosing a design. If the topic concerns motion, for example, define which motion quantity can be measured reliably with the provided tools rather than introducing unrelated materials or unsupported instrumentation.',
        ],
        [
          'Feasibility before complexity',
          'Pilot the proposed measurement with a small check. Confirm that the response changes enough to detect, the apparatus resets consistently, and measurements fit the available scale. A design with too many factors can consume time without enough replication. Prefer a focused question with several levels of one independent variable and a clear standard of comparison where appropriate. A pilot checks feasibility; it should not be quietly mixed into final data if procedures or definitions changed afterward.',
        ],
        [
          'A connected report',
          'Problem, hypothesis, variables, materials, procedure, observations, quantitative data, graph, statistics, reasoning, errors, and conclusion should describe the same experiment. If the independent variable is release height, the graph axis should not suddenly become ramp angle unless the relationship and design justify it. Keep units and labels consistent across sections. A conclusion must answer the stated question using the collected evidence, not a broader question the apparatus never tested.',
        ],
        [
          'Roles and traceability',
          'Team roles can divide measurement, recording, and analysis, but everyone should agree on the operational definitions. Record raw data at collection time with trial identifiers and units. A later reader should be able to trace a plotted point back to its original measurement. Avoid relying on memory to reconstruct results or selectively copying only neat trials. If a trial fails due to a documented procedural problem, retain the record and explain how it was handled.',
        ],
        [
          'What quality looks like',
          'Quality is not the same as a perfect straight line or a confirmed hypothesis. A well-designed experiment can reveal no clear effect or substantial variation. The important features are a valid comparison, reproducible procedure, honest data, suitable analysis, and a conclusion proportional to the evidence. The synthetic lab shows a known underlying relationship plus controlled measurement effects so students can practice those distinctions. Its generated values are never presented as measurements from a real experiment.',
        ],
      ],
      terms: [
        ['Independent variable', 'Factor deliberately changed.'],
        ['Dependent variable', 'Measured response.'],
        ['Operational definition', 'Specific rule for how a variable is set or measured.'],
        ['Pilot', 'Preliminary feasibility check before the final protocol.'],
      ],
      example: {
        problem:
          'A prompt supplies a ramp, object, ruler, and timer. Turn “study motion” into a testable question.',
        steps: [
          'Choose release height as the independent variable with defined levels.',
          'Define response as time between two fixed marks, with units and timing endpoints.',
          'Hold object, ramp surface, release method, and travel distance consistent and replicate each level.',
        ],
        conclusion: 'A narrow measurable comparison supports a reproducible experiment.',
      },
      mcq: [
        [
          'Which is most operational?',
          'Time in seconds between two fixed marks',
          ['How good the motion is', 'Whether the object seems fast', 'Interesting behavior'],
          'It specifies a measurable response.',
        ],
        [
          'A pilot primarily checks…',
          'Feasibility and procedure',
          [
            'Whether to delete awkward results',
            'The final conclusion automatically',
            'Every possible mechanism',
          ],
          'It tests whether the planned measurement works.',
        ],
        [
          'A failed hypothesis means the experiment is invalid?',
          'No',
          ['Yes', 'Only if data vary', 'Only if the graph is flat'],
          'Validity depends on design and evidence, not agreement with prediction.',
        ],
      ],
      written: [
        [
          'Name the example independent and dependent variables.',
          'Independent: release height. Dependent: transit time between defined marks.',
        ],
        [
          'Give three controlled conditions.',
          'Same object, surface, release method, travel distance, and timing method are examples.',
        ],
        [
          'Why keep raw data?',
          'They allow auditing, recalculation, plotting, and transparent handling of failed trials.',
        ],
        [
          'What should be checked in the actual packet?',
          'Topic and material limits, timing, safety, required sections, and the applicable scoring expectations.',
        ],
      ],
      flow: [
        ['Constrain', 'Read the actual task and available measurements.'],
        ['Design', 'Choose a feasible comparison and operational definitions.'],
        ['Trace', 'Connect raw measurements through analysis to the conclusion.'],
      ],
      compare: [
        ['Demonstration', 'Shows an effect or behavior', 'May lack a tested comparison.'],
        ['Experiment', 'Changes a factor and measures response', 'Needs controls and replication.'],
        ['Report', 'Makes reasoning reproducible', 'Must describe the actual design.'],
      ],
      challenge:
        'Generate three levels with replicated synthetic measurements. Identify the independent variable, response, and which controls the model holds fixed.',
      takeaway:
        'A coherent experiment links a measurable question to traceable evidence and a bounded conclusion.',
    },
    {
      title: 'Problem, hypothesis, variables, and experimentation',
      description: 'Directional predictions, controls, replication, and randomization.',
      objectives: [
        'Write a testable directional hypothesis with reasoning.',
        'Distinguish controlled variables and a control condition.',
        'Explain independent replication and randomized order.',
      ],
      sections: [
        [
          'State the relationship',
          'A problem statement names the independent variable, dependent variable, system, and relevant conditions. “How does release height affect transit time for this object on this ramp?” is more testable than “What affects speed?” because it defines a specific comparison. State a practical range of levels and measurement units. The question should be answerable by the actual observations, so avoid claiming to test friction coefficients if the design only measures travel time without the necessary force or geometric information.',
        ],
        [
          'A hypothesis with a mechanism',
          'A useful hypothesis predicts a relationship and explains why it is expected. For example, increased release height may decrease transit time because more gravitational potential energy can become kinetic energy under comparable losses. The prediction is conditional on the system and range; it is not a guarantee. A hypothesis can be rejected or remain unresolved by the data. Do not rewrite the original prediction after observing results merely to make it appear correct; discuss the discrepancy in the analysis.',
        ],
        [
          'Variables and controls',
          'The independent variable is deliberately manipulated, the dependent variable is measured, and controlled variables are conditions kept comparable. A control condition or standard of comparison is a reference treatment, not a synonym for every controlled variable. For a fertilizer experiment, concentration may be independent, biomass response dependent, light controlled, and an otherwise comparable no-added-fertilizer treatment a reference. Be explicit about the unit receiving treatment: a plant, container, or plot can be the experimental unit depending on the design.',
        ],
        [
          'Levels and replication',
          'Choose several independent-variable levels spanning a meaningful range. Replicate independently at each level so variability can be estimated. Measuring the same object repeatedly can assess measurement consistency but does not necessarily represent independent biological or material units. Repeated trials should reset the procedure rather than carry unnoticed changes from the previous run. Record trial identifiers so analyses can distinguish independent units from repeated measurements. Equal replication across levels often simplifies comparison, but valid designs can use other allocations when justified.',
        ],
        [
          'Randomization and blocking',
          'Randomizing trial order can reduce systematic association between treatment and time-dependent conditions, such as warming or operator practice. It does not remove all random error or guarantee perfect balance in a small experiment. Blocking groups comparable units or conditions and compares treatments within those groups, helping manage known nuisance variation. Random sampling and random assignment are different: one concerns how units represent a population, the other how treatments are allocated. Use the procedure that addresses the actual source of possible distortion.',
        ],
        [
          'Confounding and causal interpretation',
          'If high release levels are always tested after the ramp becomes smoother, level and surface condition are confounded. A difference in transit time cannot be uniquely assigned to height. Changing one intended factor while keeping measurement consistent supports a causal comparison, but unmeasured changes may remain. Identify at least one plausible alternative explanation and how the design reduces it. The lab’s confounding switch adds a time-linked offset deliberately; it demonstrates that a clean trend can still include systematic bias.',
        ],
      ],
      terms: [
        ['Control condition', 'Reference treatment for comparison.'],
        ['Controlled variable', 'Condition kept comparable.'],
        ['Replication', 'Repeated independent experimental units or trials as specified.'],
        ['Confounding', 'A competing factor systematically linked with the intended factor.'],
      ],
      example: {
        problem:
          'All low-level trials occur early and all high-level trials occur late while the instrument drifts upward.',
        steps: [
          'Identify time and level as systematically associated.',
          'Upward drift can imitate or exaggerate a positive level effect.',
          'Randomize order or use suitable blocking and calibration checks.',
        ],
        conclusion: 'Replication alone does not remove systematic confounding.',
      },
      mcq: [
        [
          'Which is a controlled variable rather than a control treatment?',
          'Keeping light constant',
          ['A no-added-fertilizer group', 'A baseline reference level', 'An untreated comparison'],
          'Controlled variables are maintained conditions.',
        ],
        [
          'Randomizing order mainly helps address…',
          'Time-linked systematic differences',
          [
            'All measurement uncertainty',
            'The need for units',
            'Every possible confounder automatically',
          ],
          'It breaks a predictable level-time ordering.',
        ],
        [
          'Repeated readings on one plant always equal independent plants?',
          'No',
          ['Yes', 'Only at noon', 'Only with a calculator'],
          'The experimental unit remains shared.',
        ],
      ],
      written: [
        [
          'Write a directional ramp hypothesis.',
          'Increasing release height will reduce defined transit time under comparable conditions because available potential energy increases.',
        ],
        [
          'Distinguish control condition and controlled variable.',
          'A control condition is a reference treatment; a controlled variable is held comparable across treatments.',
        ],
        [
          'Why use several levels?',
          'They reveal the response pattern over a range rather than only a single pairwise difference.',
        ],
        [
          'Why does replication not solve drift alone?',
          'More trials can reproduce the same systematic level-time distortion if order remains confounded.',
        ],
      ],
      flow: [
        ['Predict', 'State a directional relationship and mechanism.'],
        ['Allocate', 'Set levels, independent units, and comparison conditions.'],
        ['Protect', 'Randomize or block against competing variation.'],
      ],
      compare: [
        ['Replication', 'Estimates variation', 'Does not erase systematic bias.'],
        [
          'Randomization',
          'Breaks predictable allocation patterns',
          'Does not guarantee perfect balance.',
        ],
        ['Blocking', 'Manages known nuisance variation', 'Must match the design and analysis.'],
      ],
      challenge:
        'Toggle confounding and randomized order while retaining the same true effect. Explain why the observed means can change.',
      takeaway:
        'Causal interpretation depends on how treatments and measurements are arranged, not just how many numbers are collected.',
    },
    {
      title: 'Materials, reproducible procedures, and qualitative data',
      description: 'Specific quantities, measurement endpoints, diagrams, and observations.',
      objectives: [
        'Write a procedure another team can repeat.',
        'Separate qualitative observations from numerical data.',
        'Document anomalies without inventing explanations.',
      ],
      sections: [
        [
          'Materials with specifications',
          'List the materials actually used with quantities and relevant dimensions or properties. “A cup” may be inadequate if volume, shape, or material affects the result. Include measuring tools with resolution where it matters and distinguish supplied materials from assumptions. A materials list should support the procedure rather than decorate it. Do not claim an instrument precision finer than its readable scale or add equipment unavailable under the prompt. Record substitutions because they can change comparability and interpretation.',
        ],
        [
          'Operational steps',
          'A reproducible procedure specifies setup, levels, measurement endpoints, resetting, trial order, replication, and recording. Number steps in a sequence that another person can execute without asking what “do it normally” means. For timing, identify exactly what starts and stops the clock. For a release, specify whether an object is pushed or released without an added impulse. Include how the apparatus returns to a comparable starting state. Procedure detail should target factors that could affect the outcome rather than unrelated narration.',
        ],
        [
          'Diagrams as part of the method',
          'A labeled setup diagram can show distances, orientations, reference marks, and the relationship among apparatus parts more efficiently than prose alone. It must agree with the written procedure and data table. A schematic is not a measured photograph; state which dimensions are specified and which are illustrative. If a diagram omits a critical distance or timing endpoint, the visual neatness does not make the method reproducible. Use arrows and labels with defined meanings rather than relying on color alone.',
        ],
        [
          'Qualitative observations',
          'Qualitative data describe features such as wobbling, color change, slipping, bubbles, or visible damage without reducing them to the primary numerical measurement. Record them at the time of observation and distinguish what happened from why it might have happened. “The object wobbled on trial 4” is an observation; “friction increased” is an inference requiring evidence. Qualitative notes can explain why a trial warrants review, but they should not be invented afterward to justify deleting an inconvenient point.',
        ],
        [
          'Measurement records',
          'A raw-data table includes level, trial identifier, response value, units, and relevant notes. Missing measurements should be marked missing with a reason rather than entered as zero. Keep raw values separate from calculated means or corrected values. If an instrument is zeroed or calibrated, record the procedure and timing. A consistent method can still be systematically wrong, so include checks against a reference where feasible. More decimal places do not compensate for an ambiguous endpoint or a misaligned ruler.',
        ],
        [
          'Reproducibility and practical limits',
          'Ask another reader to reconstruct the setup from the procedure and diagram. Any needed clarification identifies an opportunity to improve operational detail. Record deviations as they occur and explain whether they affect comparison. A transparent limited experiment is more useful than an apparently perfect one with undocumented changes. The synthetic lab’s generated data are fully labeled examples; a real report must use actual recorded observations rather than replacing messy measurements with values expected from a model.',
        ],
      ],
      terms: [
        [
          'Resolution',
          'Smallest distinguishable instrument increment under the stated reading method.',
        ],
        [
          'Qualitative data',
          'Descriptive observations rather than the primary numerical measurement.',
        ],
        ['Raw data', 'Original recorded measurements before summary processing.'],
        ['Protocol deviation', 'Departure from the stated procedure.'],
      ],
      example: {
        problem:
          'A trial has no timer reading because the observer missed the endpoint. What should the table and procedure record?',
        steps: [
          'Mark the value missing, not zero.',
          'Record the missed endpoint as the reason and retain the trial identifier.',
          'Repeat under a predefined rule if feasible, documenting the repeat and its relation to the failed trial.',
        ],
        conclusion: 'Transparent missing-data handling preserves the evidence trail.',
      },
      mcq: [
        [
          'A missed reading should be entered as…',
          'Missing with a reason',
          ['Zero automatically', 'The expected mean', 'A convenient nearby value'],
          'Zero is a measurement, not absence of one.',
        ],
        [
          'Which is a direct qualitative observation?',
          'The object wobbled',
          [
            'Friction definitely increased',
            'The hypothesis is true',
            'The cause was gravity alone',
          ],
          'Wobbling is observed; mechanism is inferred.',
        ],
        [
          'A reproducible timing method needs…',
          'Explicit start and stop events',
          ['Only a stopwatch brand', 'Only a final mean', 'Only a title'],
          'Endpoints define the measurement.',
        ],
      ],
      written: [
        [
          'Improve “release and time it.”',
          'Specify release location and method, start/stop marks, timer operation, reset, trial count, and recording units.',
        ],
        [
          'Why separate raw and summary data?',
          'It permits auditing and recalculation without confusing original observations with derived quantities.',
        ],
        [
          'What should a setup diagram show?',
          'Relevant dimensions, orientation, apparatus relationships, variable-setting points, and measurement endpoints.',
        ],
        [
          'Why not invent qualitative notes after analysis?',
          'They would not be genuine observations and could falsely justify selective exclusion or an unsupported mechanism.',
        ],
      ],
      flow: [
        ['Specify', 'List materials, dimensions, and operational endpoints.'],
        ['Record', 'Capture raw values and descriptive notes contemporaneously.'],
        ['Audit', 'Document missing values, repeats, and deviations.'],
      ],
      compare: [
        ['Observation', 'What was directly seen or measured', 'Does not alone identify cause.'],
        ['Inference', 'Explanation for an observation', 'Needs supporting evidence.'],
        ['Missing value', 'No valid recorded measurement', 'Not numerical zero.'],
      ],
      challenge:
        'Generate a dataset and write the procedure that would be needed to obtain analogous real measurements, including one missing-value rule.',
      takeaway:
        'Reproducibility depends on operational detail and an honest record of what actually happened.',
    },
    {
      title: 'Quantitative data, graphs, and statistics',
      description: 'Means, spread, sample standard deviation, trend, and uncertainty.',
      objectives: [
        'Compute summaries from raw data.',
        'Choose axes that match the design.',
        'Distinguish variability, bias, and fit.',
      ],
      sections: [
        [
          'Raw data and derived summaries',
          'Preserve every valid raw value and calculate summaries separately. A mean is the sum divided by the number of observations; a median is the middle ordered value; a range is maximum minus minimum. These describe different features. A mean can be influenced strongly by an extreme value, while a median can hide useful magnitude information. Report the sample size and units with each summary. Missing measurements reduce the count used in a calculation and should not be silently treated as zeros.',
        ],
        [
          'Variance and standard deviation',
          'Sample variance is the sum of squared deviations from the sample mean divided by n − 1 for the usual independent-sample estimator; sample standard deviation is its square root. Standard deviation has the response’s units, while variance has squared units. At least two values are needed for this sample SD. Standard error of the mean is SD divided by sqrt(n) under appropriate independence assumptions; it describes precision of the estimated mean, not the spread of individual trials. State which error bar is shown.',
        ],
        [
          'Choosing a graph',
          'Place the deliberately changed variable on the horizontal axis and the measured response on the vertical axis in an ordinary one-factor design. Include descriptive labels, units, and a useful scale. A scatter plot preserves individual measurements; mean points summarize levels and should show or describe variability. Do not join categories as though they formed a continuous numerical scale without justification. A graph should reveal the comparison rather than exaggerate small differences through an unexplained truncated scale.',
        ],
        [
          'Trend and fitted models',
          'A positive slope means the response tends to increase with the independent variable over the observed range. Fit a model only when its form is justified by the data and purpose. A high R² does not establish causation, correct measurement, or valid extrapolation. A straight line can fit a narrow part of a curved relationship. Inspect residuals and individual data points, not only a summary coefficient. The synthetic lab’s means and scatter show how noise and drift affect apparent trends.',
        ],
        [
          'Precision and accuracy',
          'Precision concerns consistency or spread; accuracy concerns closeness to an appropriate reference. Repeated measurements can be tightly clustered around a biased value. More replication can improve an estimated mean’s precision under valid assumptions but does not automatically remove systematic error. Compare instrument resolution, procedural variability, and actual trial spread. Do not report a calculated mean with unrealistic precision simply because software supplies many decimals. Keep guard digits during calculations and round for communication.',
        ],
        [
          'A complete analysis statement',
          'Give the pattern, representative numerical evidence, spread, and scope. For example, “Mean response increased from 12 to 20 units across levels 1–3, with sample SD near 2 units; the trend applies to this tested range.” If differences are small relative to variation, describe that limitation rather than declaring certainty. The lab does not perform a formal hypothesis test, so its descriptive graph should not be labeled statistically significant. Choose additional replication or improved measurement based on the source of uncertainty.',
        ],
      ],
      terms: [
        ['Mean', 'Arithmetic average.'],
        ['Sample standard deviation', 'Spread estimate using squared deviations and n − 1.'],
        ['Residual', 'Observed value minus model prediction.'],
        ['Precision', 'Consistency or limited spread of measurements.'],
      ],
      example: {
        problem: 'For response values 8, 10, 12, calculate mean, range, and sample SD.',
        steps: [
          'Mean = 30/3 = 10. Range = 12 − 8 = 4.',
          'Squared deviations are 4, 0, 4; sum = 8.',
          'Sample variance = 8/(3−1) = 4; sample SD = 2.',
        ],
        conclusion:
          'Mean 10, range 4, and sample SD 2 have distinct meanings; variance is 4 squared response units.',
      },
      mcq: [
        ['Sample SD for 8,10,12 is…', '2', ['4', '10', '8'], 'sqrt(8/2) = 2.'],
        [
          'Standard deviation has…',
          'The response’s units',
          [
            'Squared response units',
            'No units always',
            'The independent-variable units necessarily',
          ],
          'Taking the square root restores units.',
        ],
        [
          'High R² proves causation?',
          'No',
          ['Yes', 'Only with a colored line', 'Only when n = 3'],
          'Fit and causal validity are different.',
        ],
      ],
      written: [
        ['Calculate mean and range for 8,10,12.', 'Mean 10; range 4 response units.'],
        [
          'Distinguish SD and standard error.',
          'SD describes individual-value spread; standard error estimates mean precision under valid independence assumptions.',
        ],
        [
          'Why show individual trials?',
          'They reveal spread, unusual values, sample size, and patterns that a mean alone can hide.',
        ],
        [
          'Why can precise measurements be inaccurate?',
          'A systematic offset can shift all tightly clustered readings away from the reference.',
        ],
      ],
      flow: [
        ['Preserve', 'Keep raw values with units and sample sizes.'],
        ['Summarize', 'Calculate central tendency and spread.'],
        ['Graph', 'Show the designed comparison and bounded trend.'],
      ],
      compare: [
        ['SD', 'Spread of observations', 'Not standard error.'],
        ['Fit', 'Agreement with a selected model', 'Not proof of causality.'],
        ['Precision', 'Consistency', 'Can coexist with bias.'],
      ],
      challenge:
        'Increase random variation without changing the true slope. Compare mean trend and sample SD across recorded trials.',
      takeaway:
        'Graphs and statistics describe evidence; they do not repair a confounded or biased design.',
    },
    {
      title: 'Claims, evidence, and reasoning for trends and outliers',
      description: 'Variance CER, outlier CER, and data-trend CER.',
      objectives: [
        'Write claims proportional to data.',
        'Use quantitative evidence rather than vague description.',
        'Explain variability and outliers without selective deletion.',
      ],
      sections: [
        [
          'The CER structure',
          'A claim answers a specific question, evidence cites relevant observations or calculations, and reasoning explains why the evidence supports the claim through a mechanism or analytic principle. “The hypothesis is right because the graph goes up” is incomplete: it lacks quantified evidence, uncertainty, and a mechanism. Keep the claim within the tested system and range. A result can support a descriptive trend while leaving its exact cause unresolved. CER should expose that boundary rather than hide it behind confident language.',
        ],
        [
          'Data-trend CER',
          'State whether the response increases, decreases, plateaus, or shows no clear consistent pattern over the measured levels. Cite representative means and, where relevant, a slope with units. Explain why the proposed physical relationship would produce that direction, then compare variation with the size of the change. Do not claim a global linear law from three nearby levels. If the expected pattern is absent, discuss whether the effect may be small, measurement noisy, range unsuitable, or the original mechanism incorrect.',
        ],
        [
          'Variance CER',
          'A variance claim concerns the spread and possible sources of trial differences. Cite a range, SD, or visible scatter rather than merely saying values varied. Connect a plausible source to how it changes measurements: inconsistent release impulses could alter travel time in different directions. A source name alone is not a mechanism. Compare observed spread across levels cautiously because small samples produce unstable spread estimates. Separate random variation from a systematic offset that moves all measurements similarly.',
        ],
        [
          'Outlier CER',
          'An outlier is unusual relative to a defined pattern or distribution, not simply a point that harms the desired conclusion. Identify the value, its context, and the criterion used to flag it. Review contemporaneous notes and apparatus behavior. A documented procedural failure can justify special handling under a transparent rule, but an unexplained unusual value should not be quietly erased. Report analyses with and without a flagged value when useful, clearly stating that this is a sensitivity check.',
        ],
        [
          'Reasoning and alternative explanations',
          'A plausible mechanism is stronger when alternatives make different predictions that can be tested. If time drift and treatment level are confounded, a positive trend may support either explanation. Use randomized order, calibration checks, or additional controls to discriminate them. Distinguish observation from speculation in the CER: “the timer missed the endpoint” is recorded evidence if noted at collection; “the timer probably failed” is an unverified explanation. A good argument identifies what would change the conclusion.',
        ],
        [
          'Sensitivity and robustness',
          'Recalculate a summary under a documented alternative choice, such as including a flagged point or changing a reasonable graph scale. If the conclusion changes substantially, report that sensitivity instead of selecting the version that confirms the hypothesis. Robustness means a conclusion persists under relevant defensible choices, not that every possible analysis must agree. The synthetic lab can introduce a flagged anomaly deliberately so students compare visible scatter and means while knowing its teaching origin. Real anomalies require actual evidence and transparent handling.',
        ],
      ],
      terms: [
        ['Claim', 'Answer to the defined question.'],
        ['Evidence', 'Relevant observations and quantitative results.'],
        ['Reasoning', 'Explanation connecting evidence to a claim.'],
        [
          'Sensitivity analysis',
          'Checking how conclusions depend on a documented analytic choice.',
        ],
      ],
      example: {
        problem:
          'At levels 1,2,3, means are 12,16,20 units, with SD 2 at each level. Write a bounded trend CER.',
        steps: [
          'Claim: mean response increases across the tested range.',
          'Evidence: means rise by 4 units per level and by 8 overall, with SD about 2.',
          'Reasoning: a proposed increasing mechanism is consistent, but design validity and sample size limit certainty and extrapolation.',
        ],
        conclusion: 'A complete CER quantifies support and states what it does not establish.',
      },
      mcq: [
        [
          'Which is quantitative evidence?',
          'Means increased from 12 to 20 units',
          ['It looks nice', 'The hypothesis is obviously true', 'The team worked hard'],
          'Numerical evidence is specific and checkable.',
        ],
        [
          'An inconvenient point should…',
          'Be reviewed transparently using evidence',
          ['Always be deleted', 'Always be replaced by the mean', 'Be hidden in the graph'],
          'Outlier handling needs a rule and record.',
        ],
        [
          'A source of error explanation should include…',
          'How it changes the response',
          ['Only the word “human”', 'Only a list of tools', 'Only an apology'],
          'Mechanism and direction matter.',
        ],
      ],
      written: [
        [
          'Write the example’s claim and evidence.',
          'Mean response increases over levels 1–3; means are 12,16,20 with SD 2, an overall rise of 8 units.',
        ],
        [
          'Give a variance mechanism for timing.',
          'Inconsistent start/stop reaction can vary measured duration across trials, increasing spread.',
        ],
        [
          'Why show with/without-outlier results?',
          'It reveals whether the conclusion depends strongly on the flagged value under transparent alternatives.',
        ],
        [
          'What limits extrapolation?',
          'Only the tested range and conditions were observed; the relationship may change outside them.',
        ],
      ],
      flow: [
        ['Claim', 'Answer only what the experiment tests.'],
        ['Evidence', 'Cite values, spread, and anomaly context.'],
        ['Reason', 'Connect mechanisms, alternatives, and limitations.'],
      ],
      compare: [
        ['Trend CER', 'Explains relationship across levels', 'Needs scale and range.'],
        ['Variance CER', 'Explains trial spread', 'Distinguish random from systematic effects.'],
        ['Outlier CER', 'Reviews an unusual observation', 'No deletion merely for inconvenience.'],
      ],
      challenge:
        'Toggle the synthetic anomaly, compare the raw plot and means, and write a transparent outlier CER without pretending it was a real observed accident.',
      takeaway:
        'A strong argument makes quantitative support, mechanisms, and analytic choices visible.',
    },
    {
      title: 'Errors, conclusions, and recommendations',
      description: 'Random/systematic effects, bounded conclusions, and targeted improvements.',
      objectives: [
        'Distinguish random error from systematic bias.',
        'Tie conclusions to measured evidence.',
        'Recommend changes that address specific limitations.',
      ],
      sections: [
        [
          'Random and systematic effects',
          'Random variation changes measurements unpredictably across trials, while systematic bias shifts results in a consistent or structured way. Inconsistent reaction timing can increase spread; a miscalibrated ruler can offset every reading. Some sources combine both effects, so explain the mechanism rather than assigning a label mechanically. “Human error” is too vague to guide improvement. State which action or instrument behavior occurred, how it affected the dependent variable, and whether it could change the treatment comparison.',
        ],
        [
          'Direction and consequence',
          'If a timer starts late but stops correctly, measured duration is biased downward. If it stops late, duration is biased upward. A surface that changes across trial order can distort a slope rather than merely shift every point equally. Some errors affect absolute values but leave a difference approximately unchanged; others affect the comparison itself. Identify the consequence relevant to the study question. Do not claim an error definitely occurred without a recorded observation or a justified limitation.',
        ],
        [
          'Conclusions from evidence',
          'Answer the original problem with a trend statement, representative results, variation, and scope. State whether data support the hypothesis, conflict with it, or are insufficient to distinguish it. A hypothesis is not “proven” by one small experiment. If no clear effect is observed, distinguish evidence of a small or absent effect from a design too noisy to detect one. Include the tested range and conditions so the conclusion does not overreach to every material or environment.',
        ],
        [
          'Targeted improvements',
          'An improvement should address a named limitation. Automated timing may reduce endpoint reaction variability; calibration against a reference can address an offset; randomized order can reduce time-linked confounding; more independent units can improve precision and representation. More trials alone do not fix a miscalibrated instrument or an unmeasured confounder. Explain why the proposed change should improve the relevant part of validity or measurement. Recommendations are most useful when their mechanism is explicit.',
        ],
        [
          'Further experiments',
          'A follow-up question should extend the result logically, perhaps testing a wider range, another material, or a competing mechanism. Change the design deliberately rather than adding many uncontrolled factors. If the original trend might be due to temperature drift, a follow-up can hold temperature stable or compare randomized and blocked schedules. Define the new response and comparison. A broad suggestion to “do more research” does not identify what evidence would alter the conclusion.',
        ],
        [
          'Transparent reporting',
          'Report limitations without using them as excuses to rewrite data. Keep failed trials, deviations, and missing values traceable. Distinguish a recommended improvement from an action actually taken. A final report can be successful even if results are messy when it accurately describes design, observations, analysis, and uncertainty. The synthetic lab’s drift and noise controls let students separate precision from bias; they are known model settings, whereas a real experiment requires evidence to identify such sources.',
        ],
      ],
      terms: [
        ['Random error', 'Unpredictable variation across observations.'],
        ['Systematic bias', 'Consistent or structured distortion.'],
        ['Validity', 'How well evidence supports the intended inference.'],
        ['Extrapolation', 'Extending a relationship beyond observed conditions.'],
      ],
      example: {
        problem:
          'Every timer reading is 0.5 s too high. Would ten more repeats eliminate the bias?',
        steps: [
          'The offset is systematic.',
          'Averaging more readings can reduce some random variation but retains the 0.5 s offset.',
          'Calibrate or correct using a justified reference method and document the change.',
        ],
        conclusion: 'Replication alone cannot remove a known systematic offset.',
      },
      mcq: [
        [
          'A fixed +0.5 s offset is…',
          'Systematic bias',
          ['Only random scatter', 'A new independent variable always', 'No error'],
          'The same directional distortion persists.',
        ],
        [
          'Which addresses time-order drift?',
          'Randomization or suitable blocking',
          ['Only more decimals', 'Only a larger title', 'Deleting late trials silently'],
          'Design changes can break or manage the confounding.',
        ],
        [
          'A conclusion should answer…',
          'The original measured question',
          [
            'Every possible mechanism',
            'A preferred hypothesis regardless of data',
            'A different untested outcome',
          ],
          'Scope must match evidence.',
        ],
      ],
      written: [
        [
          'Why do more repeats not remove a fixed offset?',
          'The mean retains the systematic shift even if random uncertainty decreases.',
        ],
        [
          'Explain late stop timing direction.',
          'Stopping after the true endpoint increases recorded duration.',
        ],
        [
          'Recommend a targeted improvement for reaction-time variation.',
          'Use a defined automated endpoint or more consistent timing method, then verify its calibration and applicability.',
        ],
        [
          'Write a useful follow-up question.',
          'Test whether the observed level-response trend persists with randomized order and stable temperature, using the same operational response and independent replication.',
        ],
      ],
      flow: [
        ['Diagnose', 'Name a specific plausible measurement or design limitation.'],
        ['Conclude', 'Answer the tested question with values and uncertainty.'],
        ['Improve', 'Choose a change that addresses that limitation.'],
      ],
      compare: [
        ['More replication', 'Can improve mean precision', 'Does not remove fixed bias.'],
        ['Calibration', 'Checks a measurement reference', 'Does not alone remove confounding.'],
        ['Randomization', 'Addresses allocation structure', 'Does not make instruments exact.'],
      ],
      challenge:
        'Increase instrument offset while holding noise fixed, then increase noise alone. Compare mean shifts and spread.',
      takeaway:
        'Recommendations should repair a specific inferential problem rather than merely make the experiment larger.',
    },
    {
      title: 'Division C comparison standards, significant figures, and abstracts',
      description: 'Reference treatments, justified precision, and compact scientific summaries.',
      objectives: [
        'Identify a meaningful standard of comparison.',
        'Apply significant-figure rules with measurement context.',
        'Write an abstract reflecting the actual study.',
      ],
      sections: [
        [
          'Standard of comparison',
          'A standard of comparison is a defined reference condition against which treatments are evaluated. It might be an untreated group, a baseline level, or an established reference treatment, depending on the question. It is not the list of controlled variables and not necessarily a zero-valued response. Explain why the reference is meaningful. If a solvent carries an active treatment, a vehicle-only condition can separate solvent effects from the active material, while a separate untreated condition may answer another question.',
        ],
        [
          'Fair reference conditions',
          'A reference should share relevant measurement and procedural conditions with treatments except for the intended difference. If the control receives less handling, different lighting, or another measurement method, the comparison may be distorted. Record its sample size and raw values with the same care as the treatments. A reference mean has uncertainty too; it should not be treated as exact simply because it is called a standard. Use the actual event checklist to determine required reporting rather than assuming one historical rubric applies unchanged.',
        ],
        [
          'Significant figures and resolution',
          'Significant figures communicate justified precision, but they do not replace an uncertainty analysis. The measurement instrument and reading method constrain meaningful digits. Leading zeros locate the decimal point rather than count as significant; trailing zeros can communicate precision when notation makes that clear. Scientific notation can resolve ambiguity. Exact counts and defined conversion factors do not impose the same precision limit as measured quantities. Keep enough guard digits during calculations and round at the final reporting stage.',
        ],
        [
          'Calculation rules',
          'For multiplication and division, a common classroom rule reports the result to the least number of significant figures among measured inputs. For addition and subtraction, decimal-place precision is the relevant rule. These shortcuts approximate uncertainty handling and should be applied with the measurement context. Multiplying 2.0 cm by 3.00 cm gives 6.0 cm² under the usual two-significant-figure rule. Adding 2.0 cm and 3.00 cm gives 5.0 cm because the tenths place is the limiting decimal precision.',
        ],
        [
          'An abstract with content',
          'An abstract compactly summarizes the question, essential design, principal quantitative result, and conclusion or limitation. It is not a procedure copied in full or an introduction promising results later. Include the actual independent-variable range, measured response, and relevant summary rather than only saying “data were collected.” Write it after the analysis so it agrees with the report. The applicability and scoring of an abstract can vary with the event’s current checklist and competition level; this syllabus includes it as a Division C skill.',
        ],
        [
          'Integration and consistency',
          'Check that the abstract, graph, statistics, and conclusion use the same units, sample sizes, and comparison standard. Avoid reporting a highly rounded abstract value that contradicts a more precise table interpretation. If a result is inconclusive, say so rather than hiding uncertainty in a confident summary. The lab’s baseline level can act as a reference for a synthetic comparison, while its numerical outputs are rounded for display. Real significant figures must be justified from the actual measurement process, not the software’s number of decimals.',
        ],
      ],
      terms: [
        ['Standard of comparison', 'Defined reference condition for evaluating treatments.'],
        [
          'Vehicle control',
          'Condition receiving a treatment carrier without the active component.',
        ],
        ['Significant figures', 'Digits communicating measurement precision under a convention.'],
        ['Abstract', 'Compact summary of question, methods, results, and conclusion.'],
      ],
      example: {
        problem: 'Report area from measured lengths 2.0 cm and 3.00 cm, then report their sum.',
        steps: [
          'Area before rounding is 6.00 cm²; the limiting measured input has two significant figures.',
          'Report area as 6.0 cm² under the usual multiplication rule.',
          'For addition, 2.0 + 3.00 = 5.0 cm, retaining the limiting tenths place.',
        ],
        conclusion: 'Multiplication and addition use different classroom precision rules.',
      },
      mcq: [
        [
          'A standard of comparison is…',
          'A defined reference condition',
          ['Every controlled variable', 'Always a zero response', 'Always the largest treatment'],
          'Its role is a meaningful baseline.',
        ],
        [
          '2.0 × 3.00 cm² is reported as…',
          '6.0 cm²',
          ['6.00000 cm²', '6 cm', '5.0 cm²'],
          'The usual multiplication rule retains two significant figures.',
        ],
        [
          'An abstract should include…',
          'The principal result and bounded conclusion',
          ['Only future promises', 'Every raw value', 'Only a title'],
          'It summarizes the completed study.',
        ],
      ],
      written: [
        ['Report 2.0 + 3.00 cm.', '5.0 cm using the limiting tenths-place precision.'],
        [
          'Why does a control mean have uncertainty?',
          'It comes from measurements and sampled units with variability, not an exact definition.',
        ],
        [
          'Write a compact abstract skeleton.',
          'Question and system; levels, response, and replication; key quantitative result with variability; conclusion and main limitation.',
        ],
        [
          'Why check the applicable checklist?',
          'Required sections, competition-level applicability, and scoring can change; the syllabus teaches skills rather than fixing current rules.',
        ],
      ],
      flow: [
        ['Reference', 'Define a fair standard of comparison.'],
        ['Precision', 'Preserve justified digits and units.'],
        ['Summarize', 'Write an abstract consistent with the actual findings.'],
      ],
      compare: [
        ['Control variable', 'Held comparable', 'Not the comparison treatment.'],
        ['Comparison standard', 'Reference condition', 'Has measurement uncertainty.'],
        ['Abstract', 'Reports completed evidence', 'Not a substitute for the full method.'],
      ],
      challenge:
        'Use level 1 as the comparison standard. Report each mean difference with units and write a four-sentence abstract for the synthetic dataset.',
      takeaway:
        'Division C reporting makes the reference, precision, and actual evidence explicit.',
    },
    {
      title: 'Practice, timing, teamwork, and final review',
      description: 'Efficient experimentation with a coherent report and targeted reflection.',
      objectives: [
        'Plan time for measurement and analysis.',
        'Coordinate roles without fragmenting the report.',
        'Use review evidence to choose future practice.',
      ],
      sections: [
        [
          'Plan backwards from the report',
          'A complete experiment requires time for design, pilot, collection, calculation, graphing, reasoning, and review. Work backward from the actual allowed duration and reserve time for sections that depend on data. Do not spend nearly all the session building an elaborate apparatus and leave no time to analyze it. The appropriate schedule depends on the prompt and rules, so use practice to measure realistic task durations rather than memorizing one universal minute-by-minute plan.',
        ],
        [
          'Coordinate shared definitions',
          'Assign roles while agreeing on independent-variable levels, response endpoints, units, trial identifiers, and comparison standard. A data recorder must understand what a measurement means, and an analyst should know whether trials are independent. Brief check-ins catch a procedure change before it propagates through many trials. A shared diagram and raw-data table reduce ambiguity. Work in parallel where tasks are independent, but keep changes to the actual experimental design synchronized across the team.',
        ],
        [
          'Protect the evidence trail',
          'Record values immediately and preserve anomalies with notes. If the procedure changes, mark which trials used each version and decide transparently whether they can be combined. Do not fabricate data to fill an incomplete table or replace an inconvenient result with an expected value. A smaller valid dataset is more defensible than a larger invented one. Use synthetic practice explicitly as synthetic; the lab’s known generated values teach analysis but cannot stand in for measurements in a real event report.',
        ],
        [
          'Review the whole chain',
          'Check that the problem, hypothesis, variable definitions, procedure, graph axes, statistics, and conclusion agree. Verify sample sizes, units, and arithmetic. Confirm that errors have mechanisms and recommendations address them. An abstract should reflect the final analysis, not an earlier version. Read the conclusion beside the original question to catch scope drift. A report can contain individually polished sections that contradict one another, so coherence deserves its own final check.',
        ],
        [
          'Practice with variation',
          'Use different materials and prompts so the team must choose a design instead of reproducing one memorized apparatus. Alternate emphasis: one session can focus on operational procedures, another on replication and statistics, another on CER and error analysis. After each practice, identify a bottleneck and select a specific next drill. Track both completeness and scientific quality. Finishing every heading with vague content is not the same as producing a valid experiment and evidence-based report.',
        ],
        [
          'A useful reflection',
          'Separate design problems, measurement problems, analysis mistakes, and communication gaps. Choose one correction and test it in the next unfamiliar experiment. If timing was the bottleneck, simplify setup or improve task coordination rather than merely writing faster. If variability dominated, improve measurement or replication. If a trend was confounded, repair allocation and controls. The lab lets students compare these changes under a known synthetic mechanism, supporting a precise explanation of what each improvement can and cannot fix.',
        ],
      ],
      terms: [
        ['Bottleneck', 'Task limiting overall progress or quality.'],
        ['Coherence', 'Agreement among design, data, analysis, and conclusions.'],
        ['Guard digits', 'Extra intermediate digits retained to avoid rounding error.'],
        ['Audit trail', 'Traceable record from original observations to reported results.'],
      ],
      example: {
        problem:
          'A team finishes data collection with little time left and no graph or analysis. Suggest a targeted practice change.',
        steps: [
          'Measure where time went: setup, resetting, recording, or coordination.',
          'Simplify the apparatus or parallelize independent tasks while preserving definitions.',
          'Reserve analysis time and test the revised workflow on a new prompt.',
        ],
        conclusion:
          'The improvement addresses the actual bottleneck rather than sacrificing evidence quality.',
      },
      mcq: [
        [
          'The best final coherence check compares…',
          'Question, variables, data, graph, and conclusion',
          ['Only page colors', 'Only handwriting', 'Only the materials title'],
          'The entire inference chain must agree.',
        ],
        [
          'A missing trial should be fabricated to complete the table?',
          'No',
          ['Yes', 'Only if the hypothesis is clear', 'Only if software predicts it'],
          'Data integrity outranks a neat table.',
        ],
        [
          'A useful practice reflection leads to…',
          'A specific correction tested on a new task',
          [
            'Only repeating the same answer',
            'Blaming all variation on humans',
            'Removing the error section',
          ],
          'Transfer requires applying an improvement.',
        ],
      ],
      written: [
        [
          'Name three dependent reporting tasks.',
          'Statistics, graphing, and conclusions depend on collected measurements; the abstract depends on completed analysis.',
        ],
        [
          'How can roles create contradictions?',
          'If teammates use different units, endpoints, variable names, or procedure versions without coordination.',
        ],
        [
          'What should a changed procedure record?',
          'Version, affected trials, reason, and whether combining data remains justified.',
        ],
        [
          'Give a targeted follow-up for excessive setup time.',
          'Use a simpler apparatus, pilot feasibility early, coordinate independent tasks, and reserve analysis time in a new practice run.',
        ],
      ],
      flow: [
        ['Plan', 'Allocate time around the complete evidence chain.'],
        ['Coordinate', 'Share definitions and record changes.'],
        ['Review', 'Audit coherence and choose a targeted next drill.'],
      ],
      compare: [
        ['Completeness', 'All requested sections addressed', 'Does not guarantee validity.'],
        ['Speed', 'Efficient execution', 'Must preserve honest measurements.'],
        ['Reflection', 'Evidence-based improvement', 'Needs a concrete next test.'],
      ],
      challenge:
        'Create baseline, high-noise, and confounded datasets. Write one targeted improvement for each and explain why the same remedy does not solve all three.',
      takeaway:
        'Efficient teamwork protects the scientific comparison and the traceability of its report.',
    },
  ],
});
