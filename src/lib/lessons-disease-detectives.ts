import { buildCourse } from './lesson-course-builder.ts';

export const diseaseDetectivesLessons = buildCourse({
  eventId: 'disease-detectives',
  eventName: 'Disease Detectives',
  prefix: 'epi',
  lab: 'epidemiology',
  syllabus: 'Intro to Disease Detectives Syllabus.pdf',
  intro:
    'Investigate synthetic outbreaks using person, place, time, study design, surveillance, and quantitative evidence. Ten units follow the supplied introduction syllabus, with Division C depth in denominators, bias, interpretation, and prevention. Examples teach population reasoning and do not provide individual medical advice.',
  references: [
    {
      title: 'CDC: Introduction to Epidemiology',
      url: 'https://www.cdc.gov/training-publichealth101/php/training/introduction-to-epidemiology.html',
    },
    {
      title: 'CDC Field Epidemiology Manual: Analyzing and Interpreting Data',
      url: 'https://www.cdc.gov/field-epi-manual/php/chapters/analyze-interpret-data.html',
    },
  ],
  chapters: [
    {
      title: 'Epidemiological background and natural history',
      description: 'Population health, frequency measures, and disease progression.',
      objectives: [
        'Distinguish clinical and population questions.',
        'Separate incidence from prevalence.',
        'Describe natural history and the spectrum of disease.',
      ],
      sections: [
        [
          'The population perspective',
          'Epidemiology studies the distribution and determinants of health-related states in specified populations and applies that study to health problems. A clinical question may ask what explains one person’s symptoms; a population question asks why cases occur more often in one group, place, or period. Both perspectives can inform each other, but their units of analysis differ. A striking individual case does not establish a population rate. Define the population and observation period before counting outcomes or comparing groups.',
        ],
        [
          'Counts need denominators',
          'Ten cases in a group of 20 and ten cases in a group of 200 represent different risks. A proportion has a numerator contained within its denominator; a rate incorporates time or person-time in its denominator. Keep cases, persons at risk, and observation time distinct. A population can differ in age, exposure opportunity, and follow-up, so an unadjusted comparison may be misleading even when arithmetic is correct. Always state what the denominator includes and excludes before interpreting a numerical measure.',
        ],
        [
          'Incidence and prevalence',
          'Incidence concerns new cases arising during a defined period among persons initially at risk. Prevalence concerns existing cases at a point or over a specified period in the defined population. Prevalence depends on both disease occurrence and duration, so a long-lasting condition can have high prevalence without a high recent incidence. Point prevalence does not tell when each case began. In a closed outbreak cohort, an attack proportion is a cumulative incidence over the stated outbreak interval, often informally called an attack rate.',
        ],
        [
          'Natural history',
          'Natural history describes progression from susceptibility through exposure, subclinical changes, possible symptoms, and outcomes in the absence of an intervention. The incubation period extends from infection to symptom onset for an infectious disease; latency is used differently depending on context, so define it when needed. Detection can occur before symptoms when screening or laboratory surveillance identifies a subclinical state. Infection, symptomatic illness, diagnosis, and reporting are distinct events that can occur at different times or not all occur at all.',
        ],
        [
          'The disease spectrum',
          'Observed clinical cases can represent only part of the total burden. Some infections are asymptomatic, some illnesses are mild and never tested, and severe cases may be more likely to enter surveillance. This selection changes the apparent severity and age distribution of reported cases. The “iceberg” idea describes unobserved or undiagnosed disease beneath the visible count, but does not supply a numerical multiplier without data. Differences in testing can imitate differences in disease frequency.',
        ],
        [
          'Framing a sound comparison',
          'Write the outcome, population, exposure or grouping variable, and period in one sentence. Compare groups using the same case definition and ascertainment approach whenever possible. If one group receives more testing, acknowledge detection bias before interpreting a higher reported proportion. In the synthetic lab, the table cells are complete counts for a stated population; that assumption permits particular calculations. Real investigations must evaluate whether their counts and denominators have comparable completeness.',
        ],
      ],
      terms: [
        ['Incidence', 'New cases among an at-risk population during a defined period.'],
        ['Prevalence', 'Existing cases in a defined population and time frame.'],
        ['Incubation period', 'Time from infection to symptom onset.'],
        ['Ascertainment', 'How cases are identified and counted.'],
      ],
      example: {
        problem:
          'In a closed group of 100 initially well people, 10 develop the defined illness during one week. Separately, 15 of 100 residents have an existing chronic condition on survey day.',
        steps: [
          'The outbreak cumulative incidence is 10/100 = 10% for the week.',
          'The survey point prevalence is 15/100 = 15% on that day.',
          'Do not interpret the prevalence as 15 new cases during the week.',
        ],
        conclusion: 'Measures must be named with their population and time definition.',
      },
      mcq: [
        [
          'Which measure concerns new cases?',
          'Incidence',
          ['Point prevalence', 'Mean disease duration', 'Reporting delay'],
          'Incidence tracks onset during a period.',
        ],
        [
          'Ten cases in 20 people versus ten in 200 means…',
          'Different proportions',
          [
            'Equal risk necessarily',
            'No denominator is needed',
            'The second group has higher risk',
          ],
          'The proportions are 50% and 5%.',
        ],
        [
          'Reported cases may overrepresent…',
          'Severe or readily tested illness',
          [
            'Every infection equally',
            'Only uninfected people',
            'A fixed fraction of every population',
          ],
          'Ascertainment can vary with severity and testing.',
        ],
      ],
      written: [
        [
          'Calculate 10/100 as an outbreak proportion.',
          '0.10 or 10% over the defined week among initially at-risk people.',
        ],
        [
          'Why can prevalence rise without increased incidence?',
          'Longer disease duration or improved survival can increase the number of existing cases.',
        ],
        [
          'Distinguish infection and reporting dates.',
          'Infection is acquisition of the agent; reporting occurs after detection and administrative processes and can be substantially later.',
        ],
        [
          'What must accompany a count comparison?',
          'Comparable population denominators, time periods, outcome definitions, and case-ascertainment methods.',
        ],
      ],
      flow: [
        ['Define', 'Specify outcome, population, and time.'],
        ['Count', 'Identify cases and appropriate denominators.'],
        ['Interpret', 'Name the measure and ascertainment limits.'],
      ],
      compare: [
        ['Incidence', 'New cases over an interval', 'Needs an at-risk denominator.'],
        ['Prevalence', 'Existing cases at a defined time', 'Depends partly on duration.'],
        [
          'Reported count',
          'Detected and recorded cases',
          'Can omit subclinical or untested cases.',
        ],
      ],
      challenge:
        'Keep the case count fixed while increasing the unexposed population. Predict which proportions and comparisons change.',
      takeaway:
        'A count becomes epidemiological evidence only with a population, time frame, and measurement definition.',
    },
    {
      title: 'History of epidemiology and causal reasoning',
      description: 'From descriptive comparisons to analytic studies and intervention.',
      objectives: [
        'Explain the contribution of historical comparisons.',
        'Distinguish association from causation.',
        'Identify evidence that discriminates competing explanations.',
      ],
      sections: [
        [
          'Why history matters',
          'Historical investigations show how patterns can motivate action before a biological mechanism is fully understood. The lesson is the reasoning process rather than a list of names. Compare groups, map cases, establish time order, and test alternatives. A compelling narrative can hide weaknesses in measurement or comparison, so examine what evidence actually changed the conclusion. Retrospective summaries often look more orderly than real investigations, where definitions, data collection, and control measures develop together.',
        ],
        [
          'John Snow and cholera',
          'Snow’s cholera work connected patterns of disease to water exposure through mapping and comparisons of supplied populations. The pump map is memorable, but mapping alone does not estimate risk without population denominators or exclude every alternative explanation. Comparisons involving water suppliers strengthened the argument by using groups with differing exposures. Separate the descriptive clue from the analytic comparison. Removing an exposure can be a prudent control action while evidence continues to accumulate, but the action itself does not retroactively prove every proposed causal detail.',
        ],
        [
          'Lind and comparison groups',
          'Lind’s scurvy comparison illustrates the value of allocating different treatments under relatively similar conditions. Historical experiments were limited by sample size and standards different from modern study design. A comparison group helps distinguish an intervention effect from improvement that would have happened anyway. Modern reasoning adds randomization, transparent outcome definitions, replication, and ethical review as appropriate. Do not turn one successful historical example into a universal claim that every treatment comparison has controlled all possible confounders.',
        ],
        [
          'Semmelweis and prevention',
          'Semmelweis linked differences in puerperal fever to clinical practices and introduced hand-cleaning measures. The example emphasizes comparison, temporal change, and a plausible transmission pathway. Before-and-after observations can still be affected by changes in patient mix, reporting, or other practices, so modern analysis evaluates those alternatives. A useful historical response identifies both the supportive evidence and the limitations. Explaining prevention requires naming which part of the transmission pathway is interrupted rather than treating “cleanliness” as an unspecified universal mechanism.',
        ],
        [
          'Association, temporality, and confounding',
          'An association is a statistical relationship between variables. Causation requires a stronger argument, including exposure preceding outcome and consideration of bias, chance, and alternative causes. A confounder is related to exposure and outcome and is not merely any third variable; it should not be an intermediate on the causal pathway when assessing ordinary confounding. For example, age differences between exposed and unexposed groups can distort a crude comparison if age also affects the outcome. Stratification or adjustment may help when valid data are available.',
        ],
        [
          'From a clue to a test',
          'Turn a historical clue into a specific testable prediction. If water source is the leading hypothesis, compare illness occurrence among people with documented source use using consistent case definitions. Ask what observation would differ under a competing food-source hypothesis. Collecting only examples that fit the preferred explanation creates confirmation bias. The teaching lab changes complete synthetic table counts to show associations; it cannot establish causal identification by itself. Use that limitation to practice writing measured, evidence-based conclusions.',
        ],
      ],
      terms: [
        ['Association', 'A measured relationship between variables.'],
        [
          'Confounding',
          'Distortion by a related external cause or factor under the stated causal structure.',
        ],
        ['Temporality', 'Exposure preceding the outcome in a causal account.'],
        ['Comparison group', 'A reference group used to evaluate a difference.'],
      ],
      example: {
        problem:
          'Illness is more common among water-source A users, who are also substantially older. What should be investigated?',
        steps: [
          'Confirm exposure preceded illness and case definitions are comparable.',
          'Assess whether age is associated with both source use and illness risk.',
          'Compare age strata or use an appropriate adjustment, while checking other bias and chance explanations.',
        ],
        conclusion:
          'The crude association supports investigation but does not alone prove water source caused illness.',
      },
      mcq: [
        [
          'What strengthened Snow’s work beyond a map?',
          'Exposure-based population comparisons',
          [
            'Only a memorable story',
            'Ignoring denominators',
            'Assuming all deaths shared one source',
          ],
          'Analytic comparisons address exposure and risk.',
        ],
        [
          'Which must hold for ordinary causation?',
          'Relevant exposure precedes outcome',
          [
            'Outcome always precedes exposure',
            'The largest group must be exposed',
            'The map must be colorful',
          ],
          'Time order is necessary though not sufficient.',
        ],
        [
          'What can age differences produce?',
          'Confounding in a suitable causal structure',
          [
            'Automatic proof of causation',
            'No possible effect on comparisons',
            'A new case definition necessarily',
          ],
          'Related age composition can distort crude measures.',
        ],
      ],
      written: [
        [
          'Why is mapping alone insufficient?',
          'It locates cases but may omit population denominators and alternative explanations.',
        ],
        [
          'Explain a comparison group’s purpose.',
          'It estimates what outcomes might look like under a different exposure or intervention, subject to comparability assumptions.',
        ],
        [
          'What is confirmation bias here?',
          'Seeking or emphasizing only evidence supporting a preferred hypothesis while neglecting contradictory or discriminating observations.',
        ],
        [
          'What does a synthetic RR establish?',
          'The numerical exposure-outcome association in the constructed table, not causal identification in a real population.',
        ],
      ],
      flow: [
        ['Describe', 'Find a person-place-time pattern.'],
        ['Compare', 'Measure outcomes in relevant exposure groups.'],
        ['Challenge', 'Check timing, bias, chance, and alternatives.'],
      ],
      compare: [
        ['Map', 'Shows spatial pattern', 'Needs denominators for spatial risk.'],
        ['Association', 'Quantifies a relationship', 'Does not alone establish cause.'],
        ['Intervention', 'Can interrupt a plausible pathway', 'Effects still require evaluation.'],
      ],
      challenge:
        'Create the same crude risk ratio using two different table sizes. Explain why the ratio alone does not tell the historical or causal story.',
      takeaway:
        'Historical lessons are strongest when reconstructed as comparisons and tests rather than memorized conclusions.',
    },
    {
      title: 'Outbreak investigation and descriptive evidence',
      description: 'Line listings, epidemic curves, maps, and person-place-time.',
      objectives: [
        'Build a usable line list.',
        'Read an epidemic curve without overclaiming its source.',
        'Connect descriptive findings to analytic hypotheses.',
      ],
      sections: [
        [
          'Organizing an investigation',
          'An outbreak investigation commonly involves confirming the diagnosis and excess occurrence, defining and finding cases, describing person-place-time patterns, developing and evaluating hypotheses, implementing controls, and communicating results. These activities overlap and are revisited; they are not a rigid waiting sequence. Urgent controls can begin while evidence is incomplete. For an educational case, explain why each action addresses a specific uncertainty. Counting more reports without clarifying who qualifies as a case can make the apparent pattern less interpretable rather than more reliable.',
        ],
        [
          'Line listings',
          'A line list places one case per row with standardized variables such as identifier, onset date, symptoms, location, exposure history, and confirmation status. Avoid counting repeated laboratory reports as separate people unless the outcome definition requires events. Keep missing values distinct from explicit “no” responses. A line list supports sorting and cross-tabulation, but data quality depends on how information was collected. Use onset dates for temporal disease patterns where appropriate; report dates can be distorted by batch processing or delays.',
        ],
        [
          'Epidemic curves',
          'An epidemic curve is usually a histogram of case onsets over time. Its shape can suggest point-source, continuous common-source, or propagated patterns, but bin width, incomplete ascertainment, and reporting delays affect appearance. A point-source exposure can produce a compact cluster spread by incubation times; propagated transmission can show successive waves. Those shapes are clues rather than unique diagnoses. Label the time unit and choose bins suitable for the disease timescale, then inspect whether a different binning changes the apparent pattern.',
        ],
        [
          'Person and place',
          'Describe age, occupation, participation, or other relevant characteristics with denominators whenever possible. A location with more cases may simply have more people. A spot map identifies case locations, while an area-based rate map compares standardized counts to populations; the two answer different questions. Residence may differ from exposure location. Choose the location variable that matches the hypothesis and protect individual privacy in real reporting. Spatial clusters require context about movement, exposure opportunities, and how cases were found.',
        ],
        [
          'Generating and evaluating hypotheses',
          'Combine onset timing, shared activities, exposures, and plausible incubation periods. A hypothesis should specify the agent or mechanism where evidence permits, the source, route, and population at risk. Compare exposed and unexposed people using an appropriate design. Do not define cases using the suspected exposure if the goal is to test that exposure’s association; that builds the conclusion into the outcome. Ask which additional data would separate competing sources rather than collecting only more detail about one favored source.',
        ],
        [
          'Communicating provisional findings',
          'A concise outbreak summary states the case definition, number identified, observation period, descriptive pattern, leading hypotheses, current controls, and remaining uncertainty. Distinguish confirmed findings from possibilities. An epidemic curve ending with fewer cases may reflect control, delayed reporting, or incomplete recent data. Mark the data cutoff and revise conclusions as information arrives. The lab lets students edit synthetic onset-bin counts and compare a table association, making clear that temporal shape and exposure comparisons supply complementary evidence.',
        ],
      ],
      terms: [
        ['Line list', 'One-row-per-case standardized record.'],
        ['Epidemic curve', 'Histogram of cases by onset or another explicitly stated time.'],
        ['Point source', 'Exposure concentrated in a relatively short interval.'],
        ['Propagated outbreak', 'Spread involving successive transmission generations.'],
      ],
      example: {
        problem:
          'Six cases have onset on day 1, eight on day 2, and two on day 3. Their report dates are all day 5.',
        steps: [
          'An onset curve has three bins with counts 6, 8, and 2.',
          'A report-date curve would incorrectly look like 16 simultaneous reports if interpreted as onset.',
          'Use onset timing to generate source hypotheses and assess completeness before claiming the source.',
        ],
        conclusion: 'The time variable changes the meaning of the curve.',
      },
      mcq: [
        [
          'A line list usually has one row per…',
          'Case or explicitly defined event',
          ['Map color', 'Hypothesis only', 'Calendar month necessarily'],
          'Avoid duplicate reports counted as people.',
        ],
        [
          'What can create an artificial report-date spike?',
          'Batch reporting',
          ['Perfect onset data', 'A uniform denominator', 'Removing duplicate cases'],
          'Administrative timing can cluster reports.',
        ],
        [
          'A spot map directly supplies…',
          'Case locations',
          [
            'Population-adjusted risk automatically',
            'The causal agent',
            'Complete exposure histories',
          ],
          'Risk needs relevant denominators.',
        ],
      ],
      written: [
        [
          'Give three useful line-list fields.',
          'Examples: onset date, standardized symptoms, exposure history, location, and confirmation status.',
        ],
        [
          'Why vary epidemic-curve bin width?',
          'To assess whether apparent waves or peaks depend on arbitrary grouping rather than a robust temporal pattern.',
        ],
        [
          'Why exclude suspected exposure from the outcome definition?',
          'Including it would make exposure and case status dependent by construction and bias the association test.',
        ],
        [
          'What can a recent decline in counts mean?',
          'True decline, intervention effect, reporting delay, or incomplete recent ascertainment; evaluate timing and completeness.',
        ],
      ],
      flow: [
        ['Find cases', 'Use a consistent definition and deduplicate records.'],
        ['Describe', 'Organize person, place, and onset time.'],
        ['Test', 'Compare exposure hypotheses and act on evidence.'],
      ],
      compare: [
        ['Onset date', 'Time symptoms began', 'May depend on recall.'],
        ['Report date', 'Time a report was received', 'Can reflect administrative delays.'],
        ['Case map', 'Where cases occurred or lived', 'Not a risk map without denominators.'],
      ],
      challenge:
        'Edit onset bins to produce one peak and then two waves. Explain why neither shape uniquely identifies the agent.',
      takeaway:
        'Descriptive patterns generate hypotheses; analytic evidence and context are needed to test them.',
    },
    {
      title: 'Two-by-two tables and quantitative measures',
      description: 'Attack proportions, risk ratios, odds ratios, sensitivity, and specificity.',
      objectives: [
        'Label table cells before calculating.',
        'Compute RR and OR in appropriate designs.',
        'Reinterpret diagnostic tables with correct denominators.',
      ],
      sections: [
        [
          'Set up the table',
          'For an exposure-outcome table use rows exposed and unexposed, columns ill and well. Let a be exposed ill, b exposed well, c unexposed ill, and d unexposed well. Write these meanings before using a memorized formula because some sources transpose rows or columns. Row totals are exposure-group populations; column totals are outcome groups. All cells must refer to the same defined source population and observation period for a closed-cohort risk comparison. Check totals against the original description rather than trusting a copied layout.',
        ],
        [
          'Risk and risk ratio',
          'Exposed risk is a/(a+b); unexposed risk is c/(c+d). Their ratio is RR. RR = 1 means equal observed risks, RR greater than 1 means higher exposed risk, and RR below 1 means lower exposed risk under this orientation. The interpretation must name the exposure, outcome, population, and time. A risk difference subtracts the two risks and describes an absolute difference, which is distinct from the multiplicative comparison. Risk estimates require denominators representing people at risk rather than arbitrary case-control sample totals.',
        ],
        [
          'Odds and odds ratio',
          'Odds of illness among exposed people are a/b, and among unexposed people c/d, giving OR = ad/bc. Odds are not probabilities: a risk of 0.5 corresponds to odds 1. In a case-control design, exposure odds among sampled cases and controls can estimate an exposure-disease association under design assumptions. Ordinary sampled case fractions do not provide population risk. OR can approximate RR under suitable rare-outcome conditions, but they can differ substantially when outcomes are common.',
        ],
        [
          'Diagnostic table orientation',
          'For a diagnostic table, rows can be test positive/negative and columns disease present/absent according to a reference standard. Then a is true positive, b false positive, c false negative, and d true negative. Sensitivity is a/(a+c); specificity is d/(b+d). Positive predictive value is a/(a+b) and negative predictive value d/(c+d). These denominators answer different conditional questions. Relabeling an exposure table as a diagnostic table changes interpretation; it does not make the original exposure a medical test.',
        ],
        [
          'Undefined values and uncertainty',
          'If a needed denominator is zero, the corresponding ratio is undefined rather than automatically zero or infinite. A zero observed risk in the reference group makes an ordinary RR calculation problematic. Do not add a continuity correction unless the method and purpose are specified. Small counts produce unstable estimates, and a large point estimate does not communicate precision. Confidence intervals, sampling design, and data quality matter, though the teaching lab displays descriptive point estimates rather than pretending to calculate full inferential uncertainty.',
        ],
        [
          'Write the meaning, not just a number',
          'After calculating, translate the measure into a complete sentence. For RR = 4, the exposed group had four times the observed risk of the defined outcome during the stated period, under the study assumptions. It does not mean four extra cases per person or a proven causal effect. For sensitivity, specify the fraction of truly diseased individuals testing positive. Verify formulas by checking extreme cases: perfect classification has no false positives or false negatives, while equal risks should yield RR = 1.',
        ],
      ],
      terms: [
        ['Risk ratio', 'Exposed risk divided by reference risk.'],
        ['Odds ratio', 'Ratio of odds, equal to ad/bc in the labeled table.'],
        ['Sensitivity', 'Fraction of reference-positive people testing positive.'],
        ['Specificity', 'Fraction of reference-negative people testing negative.'],
      ],
      example: {
        problem: 'a = 20, b = 30, c = 5, d = 45 in an exposure-outcome cohort.',
        steps: [
          'Exposed risk = 20/50 = 0.4; unexposed risk = 5/50 = 0.1.',
          'RR = 0.4/0.1 = 4.',
          'OR = (20 × 45)/(30 × 5) = 6; risk difference = 0.3 or 30 percentage points.',
        ],
        conclusion: 'RR and OR describe different measures and are not interchangeable here.',
      },
      mcq: [
        ['RR for the example?', '4', ['6', '0.3', '20'], 'Use the ratio of row risks.'],
        [
          'Sensitivity’s denominator is…',
          'All reference-diseased people',
          ['All test-positive people', 'All reference-negative people', 'Only true positives'],
          'Sensitivity conditions on disease presence.',
        ],
        ['OR for the example?', '6', ['4', '0.4', '0.1'], 'ad/bc = 900/150.'],
      ],
      written: [
        ['Compute the risk difference.', '0.4 − 0.1 = 0.3, or 30 percentage points.'],
        [
          'Explain why OR differs from RR here.',
          'Odds and risks differ, especially with common outcomes; exposed risk 0.4 gives odds 2/3 rather than 0.4.',
        ],
        [
          'State RR = 4 in context.',
          'The exposed group had four times the observed illness risk of the unexposed group over the defined follow-up; this alone does not prove cause.',
        ],
        [
          'What if c = 0 in an ordinary RR calculation?',
          'The reference risk is zero; report the ordinary ratio as undefined/non-estimable under this calculation rather than silently inserting a correction.',
        ],
      ],
      flow: [
        ['Label', 'Write every cell’s exposure/outcome meaning.'],
        ['Calculate', 'Use the denominator for the requested conditional measure.'],
        ['Interpret', 'Name population, time, orientation, and limits.'],
      ],
      compare: [
        ['Risk', 'Cases divided by people at risk', 'Requires appropriate follow-up denominator.'],
        ['Odds', 'Cases divided by noncases', 'Not the same as probability.'],
        ['Sensitivity', 'Test positives among diseased', 'Not positive predictive value.'],
      ],
      challenge:
        'Reproduce RR 4 and OR 6, then switch to diagnostic orientation and explain every changed denominator.',
      takeaway:
        'A formula is only valid when the table labels and study design justify its denominator.',
    },
    {
      title: 'Identifying study designs',
      description: 'Cohort, case-control, cross-sectional, and experimental comparisons.',
      objectives: [
        'Recognize how participants were selected.',
        'Choose an association measure supported by design.',
        'Identify selection bias and confounding risks.',
      ],
      sections: [
        [
          'Selection defines the design',
          'Do not classify a study only by whether investigators look into the past. Ask how people entered the study and how exposure and outcome were measured. A cohort begins with a defined population or exposure groups and observes or reconstructs outcomes. A case-control study selects by outcome and compares earlier exposure. A cross-sectional study measures exposure and outcome at a defined snapshot. Historical records can support a retrospective cohort, so “past data” does not automatically mean case-control.',
        ],
        [
          'Cohort reasoning',
          'A closed cohort with complete follow-up can estimate risk in exposed and unexposed groups. At a banquet, a roster of all attendees and their food histories can support a retrospective cohort after the illness occurs. People are included because they attended, not because they became cases. Compare food-specific attack proportions and RR while checking whether exposure reports and illness ascertainment are comparable. Multiple foods may be consumed together, creating confounding or correlated exposure patterns that a single crude ratio cannot separate.',
        ],
        [
          'Case-control reasoning',
          'A case-control investigation selects cases and a comparison group of controls intended to represent exposure in the population that produced the cases. It can be efficient for rare outcomes or when the full source population cannot be enumerated. Because investigators choose the numbers of cases and controls, their sample proportions are not population disease risks. Use an odds ratio under the appropriate sampling assumptions. Controls should not be selected merely because they have unusually low exposure if that differs from the source population.',
        ],
        [
          'Cross-sectional and ecological studies',
          'A cross-sectional survey measures existing exposure and outcome together, making prevalence comparisons possible but temporal ordering difficult. An ecological study uses group-level measures, such as regional exposure averages and regional disease rates. A group-level relationship need not hold for individuals, a problem called ecological fallacy. These designs can describe patterns and generate hypotheses but have specific inference limits. Name the unit of analysis and the timing of measurement instead of treating every association as individual causal evidence.',
        ],
        [
          'Experiments and allocation',
          'An experiment assigns an intervention rather than merely observing naturally occurring exposure. Random allocation can reduce confounding on average, though it does not guarantee exact balance in every small sample or eliminate missing-data problems. Blinding can reduce some measurement and behavior effects when feasible. Ethical constraints are central in real studies; an educational outbreak exercise uses synthetic data rather than exposing people to harm. Distinguish random sampling, which concerns representation, from random assignment, which concerns comparison under an intervention.',
        ],
        [
          'Bias and interpretation',
          'Selection bias arises when inclusion or retention creates a distorted exposure-outcome comparison. Information bias arises from systematic differences in measurement, such as cases recalling a food more readily than controls. Confounding concerns a related factor in the causal structure, not merely imprecise measurements. A study label does not guarantee freedom from any of these problems. A strong response identifies the selection method, measure, main limitation, and a feasible design improvement tied to that limitation.',
        ],
      ],
      terms: [
        ['Cohort', 'Study of outcomes within a defined population or exposure groups.'],
        ['Case-control', 'Selection by outcome with comparison of exposure histories.'],
        ['Cross-sectional', 'Exposure and outcome measured at a defined snapshot.'],
        ['Selection bias', 'Distorted comparison caused by inclusion or retention mechanisms.'],
      ],
      example: {
        problem:
          'Investigators interview every attendee on a banquet roster after an outbreak and compare illness by food consumed. Identify the design.',
        steps: [
          'Selection is based on banquet attendance, not illness status.',
          'Exposure and outcome are reconstructed for the full defined cohort.',
          'Food-specific risks and RR can be estimated if ascertainment and denominators are adequate.',
        ],
        conclusion:
          'This is a retrospective cohort, despite collecting the information after the event.',
      },
      mcq: [
        [
          'Selecting 50 cases and 50 controls primarily defines…',
          'A case-control design',
          ['A randomized trial', 'A complete cohort automatically', 'A time series only'],
          'Selection is by outcome.',
        ],
        [
          'A full banquet roster investigated afterward is…',
          'A retrospective cohort',
          ['Necessarily case-control', 'An ecological study only', 'A randomized trial'],
          'The inclusion population is defined independently of illness.',
        ],
        [
          'Random assignment and random sampling are…',
          'Different procedures',
          ['Synonyms', 'Both proof of no bias', 'Both required for every survey'],
          'They address different inferential questions.',
        ],
      ],
      written: [
        [
          'Why not compute risk from an ordinary case-control sample fraction?',
          'Investigators choose case/control numbers; those fractions do not represent source-population disease occurrence.',
        ],
        [
          'Name a recall-bias example.',
          'Cases may remember or report a suspected food more readily than controls after publicity.',
        ],
        [
          'Explain ecological fallacy.',
          'A relationship among group averages need not describe the individual-level relationship.',
        ],
        [
          'What is one purpose of random assignment?',
          'To reduce systematic confounding between intervention groups on average, subject to implementation and follow-up limitations.',
        ],
      ],
      flow: [
        ['Selection', 'Determine why each participant was included.'],
        ['Timing', 'Identify when exposure and outcome were measured.'],
        ['Measure', 'Choose a quantity justified by the design.'],
      ],
      compare: [
        ['Cohort', 'Selection by population/exposure', 'Can estimate risk with valid follow-up.'],
        ['Case-control', 'Selection by outcome', 'Sample risk is not population risk.'],
        ['Cross-sectional', 'Snapshot of existing states', 'Temporal direction can be unclear.'],
      ],
      challenge:
        'Use the same four counts first as a complete cohort and then as a case-control sample. Explain why only one interpretation justifies the displayed risks.',
      takeaway:
        'Study design is identified by selection and measurement, not by a single word such as “retrospective.”',
    },
    {
      title: 'Surveillance and the public health information cycle',
      description: 'Passive, active, sentinel, syndromic, and laboratory systems.',
      objectives: [
        'Distinguish surveillance from a one-time survey.',
        'Compare strengths and biases of surveillance methods.',
        'Interpret changes in reported counts.',
      ],
      sections: [
        [
          'An ongoing cycle',
          'Public health surveillance involves ongoing systematic collection, analysis, interpretation, and dissemination of health data for action. A one-time data collection can inform a study but is not an ongoing surveillance system by itself. The cycle must connect information to decisions and feedback. Specify the case definition, reporting population, collection frequency, analysis method, recipients, and action threshold. A system that collects many forms but never returns interpretable information to decision-makers is incomplete for its intended purpose.',
        ],
        [
          'Passive reporting',
          'Passive surveillance relies on routine reports from clinicians, laboratories, or institutions. It can cover large populations with relatively modest central effort, but completeness depends on recognition, reporting incentives, access, and workload. Underreporting can vary over time and among groups. A stable count can mask a changing true burden if reporting completeness changes. Interpret trends with information about system operations and case definitions rather than treating every report as an equal, randomly sampled fraction of all disease.',
        ],
        [
          'Active and sentinel systems',
          'Active surveillance involves investigators seeking reports or reviewing records directly, often improving ascertainment at greater resource cost. Sentinel surveillance uses selected reporting sites to monitor patterns, but selected sites may not represent the entire population. A consistent sentinel network can track trends even when it is not a census. Generalizing its counts requires knowledge of the covered population and selection. Compare the system’s purpose with its design rather than calling one method universally best.',
        ],
        [
          'Syndromic and laboratory evidence',
          'Syndromic systems can use patterns of symptoms or other early indicators before definitive diagnosis, potentially improving timeliness at a cost in specificity. Laboratory-based systems provide more specific evidence for some outcomes but depend on who is tested, test performance, and reporting delays. A new testing program can increase detected cases without an equivalent rise in true incidence. Combining systems can provide complementary evidence, but duplicated people or episodes must be handled consistently.',
        ],
        [
          'Evaluating system performance',
          'Useful attributes include sensitivity, positive predictive value, timeliness, representativeness, acceptability, simplicity, flexibility, and stability. Improvements can trade off: a broad sensitive definition may generate more false alarms; a complex detailed form may reduce reporting participation. Evaluate the attribute relevant to the intended action. A system designed for rapid cluster detection need not optimize the same features as one designed for precise long-term burden estimates. Report performance with denominators and a reference method wherever possible.',
        ],
        [
          'Interpreting a reported increase',
          'Before concluding that transmission rose, check case-definition changes, new sites, altered testing, backlog clearance, and population changes. Compare onset dates with report dates and inspect affected subgroups. A true increase and improved ascertainment can occur together, so alternatives are not always mutually exclusive. The teaching lab’s complete counts isolate mathematical relationships; surveillance examples require an additional layer explaining how those counts reached the table. A strong conclusion separates observed reports from estimated disease occurrence.',
        ],
      ],
      terms: [
        ['Passive surveillance', 'Routine reporting by participating sources.'],
        ['Active surveillance', 'Investigators directly seek or verify cases.'],
        ['Sentinel surveillance', 'Monitoring through selected sites.'],
        ['Syndromic surveillance', 'Tracking early symptom or related indicators.'],
      ],
      example: {
        problem:
          'Reported cases double in the month a new laboratory and more testing sites begin reporting.',
        steps: [
          'Document the reporting expansion and testing changes.',
          'Compare rates within stable sites and inspect onset versus report dates.',
          'Assess other evidence before estimating how much of the increase is true incidence.',
        ],
        conclusion:
          'A doubling of reports alone does not quantify a doubling of disease occurrence.',
      },
      mcq: [
        [
          'Directly contacting facilities for case records is…',
          'Active surveillance',
          ['Only passive reporting', 'A randomized trial', 'A case-control definition'],
          'Investigators actively seek cases.',
        ],
        [
          'A selected network of sites is…',
          'Sentinel surveillance',
          [
            'A complete census necessarily',
            'A perfect random sample automatically',
            'No surveillance',
          ],
          'Coverage and representativeness require evaluation.',
        ],
        [
          'A broad syndrome signal often trades specificity for…',
          'Timeliness or sensitivity',
          ['Guaranteed causality', 'Perfect diagnosis', 'Elimination of false alarms'],
          'Early indicators can be less specific.',
        ],
      ],
      written: [
        [
          'List four steps in a surveillance cycle.',
          'Ongoing collection, analysis, interpretation, and dissemination for action, with feedback.',
        ],
        [
          'Why inspect testing changes?',
          'More or different testing can change reported counts independently of true disease occurrence.',
        ],
        [
          'What does representativeness concern?',
          'Whether observed cases and covered populations adequately reflect the relevant person-place-time distribution.',
        ],
        [
          'Give a purpose-specific tradeoff.',
          'A rapid broad alert system may accept more false alarms to detect clusters early; a detailed burden system may prioritize completeness and specificity.',
        ],
      ],
      flow: [
        ['Collect', 'Define sources and consistent cases.'],
        ['Analyze', 'Evaluate trends and system performance.'],
        ['Act and feedback', 'Disseminate findings and improve the system.'],
      ],
      compare: [
        ['Passive', 'Broad routine reporting', 'Variable completeness.'],
        ['Active', 'Direct case seeking', 'Greater resource demand.'],
        ['Syndromic', 'Early indicators', 'Often less diagnostic specificity.'],
      ],
      challenge:
        'Treat a change in a table count as improved detection rather than new disease. Explain why the numerical ratio cannot distinguish those mechanisms.',
      takeaway:
        'Surveillance data reflect both population health and the system used to observe it.',
    },
    {
      title: 'Constructing and applying case definitions',
      description: 'Clinical criteria, person, place, time, and certainty categories.',
      objectives: [
        'Write an operational case definition.',
        'Separate suspected and confirmed classifications.',
        'Evaluate sensitivity-specificity tradeoffs without circular exposure criteria.',
      ],
      sections: [
        [
          'An operational definition',
          'A case definition specifies reproducible criteria for including a person or event in an investigation. Common components are clinical features, person, place, time, and sometimes laboratory criteria. “Anyone who seems sick” is not operational because different investigators can apply it differently. Define symptoms, thresholds, and dates explicitly, and state whether onset or reporting date controls the interval. The purpose is consistent classification for a population investigation, not replacing an individual clinician’s diagnostic judgment.',
        ],
        [
          'Person, place, and time',
          'Person criteria might restrict age or membership in a defined group; place criteria might describe attendance or residence; time criteria define the onset interval. Choose these to match the investigation population without embedding the suspected causal exposure. If testing whether one dish caused illness, defining a case as “an ill person who ate that dish” prevents a valid exposed/unexposed comparison. Attendance at the event may define the source population, while specific food consumption remains an exposure to evaluate.',
        ],
        [
          'Clinical and laboratory criteria',
          'Symptoms can identify a broad suspected case, while laboratory evidence may support probable or confirmed categories. Category names and exact requirements vary by system, so use the supplied definition rather than assuming “confirmed” always has one universal meaning. A negative laboratory test does not always exclude disease if timing, sensitivity, or specimen quality are limited, but educational classification should follow the stated algorithm. Keep classification rules and uncertainty about the underlying truth conceptually separate.',
        ],
        [
          'Sensitivity and specificity tradeoffs',
          'A broad definition can capture more true cases but include more unrelated illness. A narrow definition can improve specificity while missing mild or atypical cases. The preferred balance depends on the stage and purpose of the investigation. Early case finding may emphasize sensitivity; analytic comparisons may need a more specific and consistent outcome definition. Evaluate how changes affect both exposed and unexposed groups, because differential classification can distort the association rather than simply changing the total count.',
        ],
        [
          'Versioning and reproducibility',
          'If a definition changes, record the version and date, and consider reclassifying earlier records consistently. Otherwise a trend may reflect revised criteria rather than altered disease occurrence. Maintain unknown or pending information separately from a negative finding. An auditable line list stores the variables needed to reproduce case status, not only a final yes/no label. Two investigators should classify the same complete record the same way under the same definition; disagreements reveal ambiguity that should be resolved explicitly.',
        ],
        [
          'Applying a definition to records',
          'Read each criterion as a logical condition. If the definition requires symptom A and symptom B within a date range, symptom A alone does not qualify. If laboratory confirmation is an alternative branch, write the AND/OR structure clearly. Do not fill missing data with assumptions to force a record into a category. Report excluded, included, and unresolved records with reasons. The lab’s diagnostic orientation illustrates classification consequences; it does not substitute for a fully specified outbreak case definition.',
        ],
      ],
      terms: [
        ['Case definition', 'Operational inclusion criteria for an investigation.'],
        ['Suspected case', 'A case meeting stated preliminary criteria.'],
        ['Confirmed case', 'A case meeting the system’s stated confirmation criteria.'],
        ['Misclassification', 'Assignment to an incorrect category relative to the reference.'],
      ],
      example: {
        problem:
          'A synthetic case requires event attendance, vomiting or at least three loose stools, and onset on days 1–3. One attendee has one loose stool on day 2.',
        steps: [
          'Attendance and time criteria are met.',
          'The symptom threshold is not met: one loose stool is below three and vomiting is absent.',
          'Classify as not meeting this operational definition, while retaining the underlying record.',
        ],
        conclusion: 'Failure to meet a study definition is not a universal clinical diagnosis.',
      },
      mcq: [
        [
          'Which criterion creates circularity when testing a food exposure?',
          'Requiring that food consumption to be a case',
          [
            'A defined onset interval',
            'A standardized symptom threshold',
            'A documented event population',
          ],
          'It builds exposure into outcome selection.',
        ],
        [
          'A more sensitive broad definition may…',
          'Include more unrelated illness',
          [
            'Eliminate every false positive',
            'Always improve causal inference',
            'Guarantee laboratory confirmation',
          ],
          'Sensitivity and specificity can trade off.',
        ],
        [
          'Missing onset date should be…',
          'Recorded as unknown or pending',
          ['Invented from the report date', 'Automatically coded no illness', 'Always ignored'],
          'Missing information is not a negative finding.',
        ],
      ],
      written: [
        [
          'Write the example’s logic.',
          'Attendance AND onset in days 1–3 AND (vomiting OR at least three loose stools).',
        ],
        [
          'Why version a changed definition?',
          'To reproduce classification and distinguish changes in criteria from changes in disease occurrence.',
        ],
        [
          'How can two reviewers test clarity?',
          'Apply the same definition independently to identical records and resolve disagreements by clarifying operational criteria.',
        ],
        [
          'Why retain excluded records?',
          'Their data allow auditing, reclassification under revised criteria, and transparent accounting of exclusions.',
        ],
      ],
      flow: [
        ['Specify', 'Write clinical and person-place-time criteria.'],
        ['Classify', 'Apply explicit AND/OR rules to records.'],
        ['Audit', 'Track unknowns, exclusions, and definition versions.'],
      ],
      compare: [
        ['Broad definition', 'Finds more possible cases', 'Can include unrelated illness.'],
        ['Narrow definition', 'May improve specificity', 'Can miss true atypical cases.'],
        [
          'Exposure variable',
          'Tests a source hypothesis',
          'Should not define the tested outcome circularly.',
        ],
      ],
      challenge:
        'Switch the lab to diagnostic orientation and increase false positives. Predict specificity and positive predictive value separately.',
      takeaway:
        'A useful case definition is explicit, reproducible, and appropriate to the question being tested.',
    },
    {
      title: 'Interpreting results and interrupting transmission',
      description: 'Effect measures, uncertainty, and the chain of infection.',
      objectives: [
        'Translate ratios into contextual statements.',
        'Evaluate chance, bias, and confounding.',
        'Match controls to a transmission-chain link.',
      ],
      sections: [
        [
          'Effect measures in context',
          'A risk ratio compares observed risks; a risk difference compares their absolute separation. Both can be useful because a large relative increase from a tiny baseline can still represent a small absolute difference. State exposure, reference group, outcome, population, and interval. Do not say “four times more likely” without defining the measure, and do not confuse percentage points with percent increase. A numerical result should answer the study question in a sentence that another reader can verify from the table.',
        ],
        [
          'Uncertainty and chance',
          'A point estimate summarizes the observed sample but does not show its precision. Small cell counts can produce unstable ratios; confidence intervals summarize uncertainty under a specified model and design. An interval containing the null is not proof that no effect exists, and an interval excluding the null does not establish causation. Statistical uncertainty is only one part of uncertainty: misclassification, selection, and incomplete denominators may dominate. The synthetic lab intentionally reports descriptive calculations without pretending to estimate a full confidence interval.',
        ],
        [
          'Bias and confounding before certainty',
          'Review how participants entered the study, how exposure was measured, and whether outcome ascertainment differed between groups. Ask whether a third factor related to both exposure and outcome explains part of the comparison. A strong association can survive some bias but is not immune to it. Compare competing hypotheses and independent evidence such as timing, environmental findings, or laboratory consistency. Several imperfect observations can support a coherent account, but they should not be presented as independent if they come from the same underlying measurement.',
        ],
        [
          'The chain of infection',
          'A common framework names an agent, reservoir, portal of exit, mode of transmission, portal of entry, and susceptible host. It organizes where a control might act. Removing a contaminated source targets a reservoir or exposure pathway; improving ventilation can reduce some airborne exposure; vaccination changes host susceptibility for the relevant agent. Match the measure to the actual transmission mechanism rather than assuming every intervention works equally for all agents. Educational scenarios should state the route before asking which link is interrupted.',
        ],
        [
          'Immediate and longer-term actions',
          'An investigation can recommend immediate proportionate controls while continuing to test hypotheses. Later actions may improve infrastructure, surveillance, training, or vaccination coverage as relevant. Evaluate implementation and outcomes rather than assuming a recommendation was followed or effective. A decline after intervention may support an effect but can also reflect natural epidemic progression or reporting changes. Choose a comparison and time scale that help distinguish these possibilities. Communicate what is established, what is plausible, and what evidence is still needed.',
        ],
        [
          'Writing a defensible recommendation',
          'Tie each proposed action to an observed problem and a plausible mechanism. State an additional observation that would test the leading explanation, and describe how success will be monitored. Avoid a long generic list of controls unrelated to the scenario. For a food-associated cluster, a defined source investigation and targeted exposure interruption may be more informative than unspecified “more hygiene.” In a student response, the quality lies in connecting evidence, mechanism, action, and evaluation while retaining appropriate uncertainty.',
        ],
      ],
      terms: [
        ['Risk difference', 'Absolute difference between group risks.'],
        ['Null value', 'Value representing no association, often 1 for ratios.'],
        ['Reservoir', 'Where an infectious agent normally persists.'],
        ['Portal of entry', 'Route by which an agent enters a host.'],
      ],
      example: {
        problem:
          'Observed risks are 0.4 and 0.1 in a closed cohort. Explain the measures and propose the next analytic step.',
        steps: [
          'RR = 4; risk difference = 0.3 or 30 percentage points.',
          'Describe the association without asserting a proven causal effect.',
          'Check timing, measurement, selection, and potential confounding; seek independent source evidence.',
        ],
        conclusion:
          'A complete interpretation connects magnitude with validity and a discriminating next step.',
      },
      mcq: [
        [
          'The null value for an ordinary RR is…',
          '1',
          ['0', '100', '−1'],
          'Equal risks give ratio 1.',
        ],
        [
          '0.4 minus 0.1 is…',
          '30 percentage points',
          ['30 times the risk', '3 percentage points', 'A 0.3% difference'],
          'The absolute proportion difference is 0.3.',
        ],
        [
          'Vaccination primarily acts on…',
          'Host susceptibility for the relevant agent',
          ['Every environmental reservoir', 'The map projection', 'All reporting delays'],
          'Its mechanism is agent-specific host protection.',
        ],
      ],
      written: [
        [
          'Write an RR = 4 interpretation.',
          'The exposed group had four times the observed risk of the defined outcome versus the reference during follow-up, subject to study validity.',
        ],
        [
          'Why does significance not prove cause?',
          'Chance is only one explanation; bias, confounding, and temporal or mechanistic issues can remain.',
        ],
        [
          'Name three chain links.',
          'Examples: agent, reservoir, portal of exit, transmission mode, portal of entry, susceptible host.',
        ],
        [
          'How evaluate a proposed control?',
          'Track implementation and subsequent outcomes with attention to timing, comparable measurement, natural progression, and relevant comparison data.',
        ],
      ],
      flow: [
        ['Interpret', 'Describe relative and absolute association.'],
        ['Evaluate', 'Check uncertainty and alternative explanations.'],
        ['Interrupt', 'Choose a mechanism-specific control and monitor it.'],
      ],
      compare: [
        ['Relative measure', 'Multiplicative contrast', 'Needs baseline context.'],
        ['Absolute measure', 'Difference in outcome frequency', 'Not a ratio.'],
        ['Control action', 'Targets a transmission link', 'Effectiveness must be evaluated.'],
      ],
      challenge:
        'Construct two cohorts with the same RR but different baseline risks. Compare the absolute differences and explain why both matter.',
      takeaway:
        'A defensible conclusion connects calculation, study validity, mechanism, and evaluation.',
    },
    {
      title: 'Levels of prevention and population strategies',
      description: 'Primary, secondary, tertiary, and mechanism-specific applications.',
      objectives: [
        'Classify prevention by its target stage.',
        'Explain screening tradeoffs.',
        'Choose measures suited to a synthetic scenario.',
      ],
      sections: [
        [
          'Primary prevention',
          'Primary prevention aims to prevent disease or injury before it occurs. Examples include a relevant vaccination program, safer water systems, and reducing a harmful exposure. Classify the action by its purpose and target stage, not only its name. Education is primary prevention when it reduces future exposure, but education can also support treatment or rehabilitation later. A population strategy can reduce risk broadly even when each person’s benefit is modest. Evaluate reach, feasibility, and the actual mechanism by which exposure or susceptibility changes.',
        ],
        [
          'Secondary prevention',
          'Secondary prevention seeks early detection and intervention to limit disease progression. Screening apparently asymptomatic people differs from diagnostic testing prompted by symptoms, though both can use similar tests. A screening program needs a meaningful target condition, an appropriate test, and a useful follow-up pathway. Finding more positive tests is not by itself a health benefit. False positives, false negatives, overdiagnosis, and access to confirmatory care affect outcomes. These lessons teach the framework rather than recommending a screening program for an individual.',
        ],
        [
          'Tertiary prevention',
          'Tertiary prevention reduces complications, disability, or recurrence after disease is established. Rehabilitation and complication management are common examples. The same intervention can have different prevention roles depending on when and why it is applied. A response should identify the existing condition and the harm being reduced. Distinguish improving a surrogate measurement from improving meaningful function or outcomes. Evaluation should consider who receives the service, whether it is implemented, and which endpoint reflects the intended benefit.',
        ],
        [
          'Screening denominators',
          'Sensitivity and specificity condition on reference disease status, while predictive values condition on test result. Positive predictive value depends strongly on prevalence when test performance is otherwise held constant. In a low-prevalence population, false positives can outnumber true positives even with apparently high specificity. Calculate counts with a defined population size rather than assuming “high accuracy” guarantees a reliable positive result. The lab’s diagnostic orientation makes these denominator differences visible without presenting a test result as medical advice.',
        ],
        [
          'Targeted and population-wide approaches',
          'A targeted strategy focuses resources on a high-risk group; a population strategy shifts exposure or conditions across a broader group. Each can have benefits and limits. Targeting can improve efficiency but miss cases outside the selected group; broad measures can reach many people but require infrastructure and implementation. Consider equity, access, acceptability, and unintended effects as part of a real program evaluation. Do not infer effectiveness solely from the label “public health”; specify the causal pathway and measurable outcome.',
        ],
        [
          'Classifying a scenario carefully',
          'Ask whether the intended outcome is avoiding onset, detecting early disease, or reducing consequences of established disease. Then explain the classification in a complete sentence. A safe-water program before an outbreak is primary prevention; detecting early infection through an appropriate program is secondary; rehabilitation after lasting injury is tertiary. Some actions span stages, so state the scenario’s purpose. Pair classification with a plan for evaluation and a limitation rather than memorizing a list detached from context.',
        ],
      ],
      terms: [
        ['Primary prevention', 'Avoiding onset by reducing exposure or susceptibility.'],
        ['Secondary prevention', 'Early detection and intervention.'],
        ['Tertiary prevention', 'Reducing consequences of established disease.'],
        ['Predictive value', 'Conditional probability of reference status given a test result.'],
      ],
      example: {
        problem:
          'In 1000 synthetic people, 10 have a condition. A test has sensitivity 90% and specificity 90%. Calculate expected counts and PPV.',
        steps: [
          'Expected true positives = 9 and false negatives = 1.',
          'Of 990 without the condition, expected false positives = 99 and true negatives = 891.',
          'PPV = 9/(9+99) ≈ 8.3%.',
        ],
        conclusion:
          'Even 90% sensitivity and specificity can yield low PPV in a low-prevalence population.',
      },
      mcq: [
        [
          'Rehabilitation after established disability is usually…',
          'Tertiary prevention',
          ['Primary prevention', 'A new incidence definition', 'A case-control selection rule'],
          'It reduces consequences of established disease.',
        ],
        [
          'Why can PPV be low despite high specificity?',
          'Low prevalence can leave many false positives',
          ['Sensitivity equals prevalence', 'All tests are random', 'PPV ignores false positives'],
          'The large nondiseased group can generate many false positives.',
        ],
        [
          'A safe-water intervention before illness is…',
          'Primary prevention',
          ['Tertiary prevention necessarily', 'Only surveillance', 'A diagnostic test'],
          'It reduces exposure before disease onset.',
        ],
      ],
      written: [
        ['Calculate expected false positives in the example.', '990 × 0.1 = 99.'],
        ['Calculate PPV.', '9/(9+99) = 9/108 ≈ 8.3%.'],
        [
          'Why is finding more cases not automatically a benefit?',
          'Detection must lead to useful outcomes and be weighed against false results, overdiagnosis, access, and intervention effects.',
        ],
        [
          'Give one limitation of targeting only a high-risk group.',
          'Cases outside the selected group can be missed, and selection may create access or equity gaps.',
        ],
      ],
      flow: [
        ['Stage', 'Identify onset, early disease, or established consequences.'],
        ['Mechanism', 'Choose exposure, detection, or consequence reduction.'],
        ['Evaluate', 'Measure meaningful outcomes and unintended effects.'],
      ],
      compare: [
        ['Primary', 'Before onset', 'Reduces exposure or susceptibility.'],
        ['Secondary', 'Early detection', 'Needs a beneficial follow-up pathway.'],
        ['Tertiary', 'After established disease', 'Reduces complications or disability.'],
      ],
      challenge:
        'Set diagnostic counts to TP 9, FP 99, FN 1, TN 891. Explain the low PPV without confusing it with sensitivity.',
      takeaway:
        'Prevention levels describe purpose and stage; effective programs also require valid evidence and evaluation.',
    },
    {
      title: 'Integrated outbreak study walkthrough',
      description: 'Optional report-reading framework using a complete synthetic investigation.',
      extension: true,
      objectives: [
        'Connect study questions, tables, timing, and controls.',
        'Separate report evidence from inference.',
        'Evaluate a public-health report transparently.',
      ],
      sections: [
        [
          'A report-reading framework',
          'The syllabus suggests a real-world walkthrough using an MMWR report. This lesson supplies an explicitly synthetic banquet investigation so every learner has the same complete data without implying a fabricated report is a CDC publication. When reading an actual report, identify its question, population, case definition, design, measurements, results, limitations, actions, and follow-up. A title or headline is not enough. Follow the denominator from the source population to the final analytic table, including exclusions and missing records.',
        ],
        [
          'The synthetic source population',
          'Suppose 100 people attended an event and all are interviewed using one symptom and onset definition. Fifty consumed a particular dish and fifty did not. Twenty exposed attendees and five unexposed attendees meet the case definition. This is a retrospective cohort because selection is based on attendance. The complete-roster assumption permits group risks; if only selected ill and well attendees had been sampled, the same-looking table would require a different interpretation. Record exposure timing before symptom onset.',
        ],
        [
          'Descriptive evidence',
          'A line list should contain each attendee’s exposure, onset, symptoms, and classification. Plot onsets rather than only report dates and describe person and place patterns. A compact onset cluster after a shared meal is compatible with a common exposure, but it does not uniquely identify the dish or agent. Different foods may be consumed together. Check whether one exposure’s apparent association persists when a correlated exposure is considered. Missing or uncertain food histories should remain visible in the analytic accounting.',
        ],
        [
          'Analytic evidence',
          'The dish-specific risks are 20/50 = 0.4 and 5/50 = 0.1, giving RR = 4 and risk difference 0.3. OR = 6 describes a different quantity. These results support investigating the dish but do not alone prove causation. Review selection, recall, case definition, timing, and possible confounding. Laboratory or environmental findings can strengthen a coherent account if they are independently informative and correctly linked to the source. A numerical ranking of foods should not substitute for validity assessment.',
        ],
        [
          'Actions and communication',
          'Describe a targeted exposure interruption and the evidence supporting it, along with ongoing investigation. A report should distinguish actions taken from recommendations not yet implemented. Monitor subsequent onsets with attention to expected incubation and reporting delays. Communicate what is known, what remains uncertain, and how the public or responsible institutions should use the information. In a student exercise, explain the transmission link addressed instead of inventing an agent-specific intervention unsupported by the scenario.',
        ],
        [
          'Evaluate and transfer',
          'An effective final critique names at least one strength, one limitation, and one next observation that could change the conclusion. Complete roster coverage is a strength; recalled exposure and possible correlated foods are limitations. A new independent source result could strengthen or redirect the hypothesis. Transfer the framework to a real report by tracing its actual data rather than copying this scenario’s numbers. The goal of the optional unit is integrated reasoning, not memorizing that every banquet investigation must have the same ratio or source.',
        ],
      ],
      terms: [
        ['Source population', 'Population from which analytic participants arise.'],
        ['Analytic cohort', 'Defined group used for an exposure-outcome comparison.'],
        [
          'Independent evidence',
          'Information that adds more than a repetition of the same measurement.',
        ],
        ['Follow-up', 'Observation after an action or initial assessment.'],
      ],
      example: {
        problem:
          'Summarize the synthetic banquet cohort in four lines: design, calculation, interpretation, next step.',
        steps: [
          'Design: complete retrospective cohort of 100 attendees.',
          'Calculation: risks 0.4 and 0.1; RR 4; risk difference 0.3.',
          'Interpretation: observed association supports investigation, not automatic causation.',
          'Next step: assess correlated food exposure and seek independent source evidence.',
        ],
        conclusion:
          'The result is reproducible because the population, table, interpretation, and uncertainty are explicit.',
      },
      mcq: [
        [
          'Why is this a cohort?',
          'All attendees define inclusion',
          [
            'Only sick people define inclusion',
            'The word banquet makes it a trial',
            'The interview happened later',
          ],
          'Selection is independent of outcome.',
        ],
        ['Which number is the RR?', '4', ['6', '0.3', '25'], 'It is the ratio of risks.'],
        [
          'Which strengthens the report most?',
          'A discriminating independent source finding',
          ['Repeating the headline', 'Removing limitations', 'Changing a chart color'],
          'Independent evidence can test alternatives.',
        ],
      ],
      written: [
        [
          'Give the four table cells.',
          'a = 20, b = 30, c = 5, d = 45 under exposed/unexposed rows and ill/well columns.',
        ],
        [
          'Name one study strength and one limitation.',
          'Complete roster coverage is a strength; recalled exposure or correlated food consumption is a limitation.',
        ],
        [
          'Why not label this scenario an MMWR report?',
          'It is an authored synthetic teaching case, not a published CDC investigation.',
        ],
        [
          'How would you analyze an actual report?',
          'Trace its question, source population, case definition, design, denominators, results, limitations, controls, and follow-up using its own data.',
        ],
      ],
      flow: [
        ['Reconstruct', 'Trace population, definitions, and onset evidence.'],
        ['Analyze', 'Calculate supported measures and assess validity.'],
        ['Respond', 'Connect actions and follow-up to the evidence.'],
      ],
      compare: [
        ['Synthetic case', 'Complete shared teaching data', 'Not a published investigation.'],
        ['Observed association', 'Supports a source hypothesis', 'Does not alone prove cause.'],
        [
          'Report critique',
          'Tests reproducibility and limits',
          'Uses the actual report’s evidence.',
        ],
      ],
      challenge:
        'Rebuild the banquet table and record a second trial after changing one exposure-group count. Explain both the mathematical change and a possible ascertainment explanation.',
      takeaway:
        'Integrated epidemiological reasoning follows the evidence from population definition through action and evaluation.',
    },
  ],
});
