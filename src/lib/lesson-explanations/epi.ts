// Checkpoint explanations for Disease Detectives, keyed by question id.
export const diseaseDetectives: Record<string, string> = {
  'epi-u1-l1-q1':
    'Incidence counts new cases that begin during a set period among people at risk. Prevalence counts everyone who has the disease at a point in time, both new and existing cases. Duration and reporting delay are not measures of occurrence.',
  'epi-u1-l1-q2':
    'The count is the same, but the denominators differ: 10/20 = 50% versus 10/200 = 5%. Risk depends on the population at risk, so the first group has ten times the proportion affected.',
  'epi-u1-l1-q3':
    'People with severe symptoms are more likely to see a doctor and be tested, so they are more likely to be counted. Mild or asymptomatic infections are often missed, so reported cases are not a fixed or fair sample of all infections.',
  'epi-u1-l1-q4':
    '10 cases ÷ 100 people at risk = 0.10, or 10%. Include the time period and population, for example "10% of attendees became ill during the week". A proportion without a denominator and time window is incomplete.',
  'epi-u1-l1-q5':
    'Prevalence ≈ incidence × average duration. If people survive longer with the disease, or it lasts longer, existing cases build up even when new cases occur at the same rate. Better treatment that prolongs life can therefore raise prevalence.',
  'epi-u1-l1-q6':
    'The infection date is when the person acquired the agent. The report date comes after symptoms appear, a test is done and paperwork is processed, often days or weeks later. Plotting by report date can shift or distort the timing of an outbreak.',
  'epi-u1-l1-q7':
    'Counts are comparable only if the populations (denominators), time periods, case definitions and ways cases were found are similar. Otherwise a bigger number may reflect a bigger population or more testing, not more disease.',
  'epi-u2-l1-q1':
    'Snow did more than map deaths near the Broad Street pump. He compared death rates among households served by different water companies, a population comparison by exposure that showed higher risk for one source and ruled out other explanations.',
  'epi-u2-l1-q2':
    'A cause has to come before its effect, so exposure must happen before the outcome. Correct timing alone does not prove causation, but if the outcome came first, the exposure cannot have caused it.',
  'epi-u2-l1-q3':
    'Age often affects both exposure and disease risk. If one group is older, it may have more disease for that reason alone, distorting a crude comparison. That mixing of effects is confounding, which age-adjustment or stratification can reduce.',
  'epi-u2-l1-q4':
    'A map shows where cases occurred, but areas with more people will have more cases. Without population denominators it cannot show risk, and it cannot rule out other explanations for clustering.',
  'epi-u2-l1-q5':
    'A comparison group shows what would likely have happened without the exposure or intervention. Differences between groups can then be attributed to the exposure, provided the groups are otherwise similar.',
  'epi-u2-l1-q6':
    'Confirmation bias is focusing on evidence that supports the favored explanation while overlooking evidence against it or evidence that could distinguish between explanations. It leads investigators to stop too early or reach the wrong conclusion.',
  'epi-u2-l1-q7':
    'A relative risk from a made-up table shows how the numbers in that table relate. Because the data are invented, it cannot show that the exposure causes disease in any real population, which would require real data and attention to bias and confounding.',
  'epi-u3-l1-q1':
    'In a line list, each row is one case (or one clearly defined event) and each column is a variable such as onset date or symptoms. Keeping one row per case avoids counting the same person twice when duplicate reports arrive.',
  'epi-u3-l1-q2':
    'If a clinic sends several days of reports at once, they all receive the same report date, creating a spike that does not reflect when people actually got sick. Plotting by onset date avoids this artifact.',
  'epi-u3-l1-q3':
    'A spot map shows where cases live or were exposed. It does not give rates, because it lacks population denominators, and it cannot identify the cause or full exposure histories.',
  'epi-u3-l1-q4':
    'Useful fields include onset date, standardized symptoms, exposures (foods eaten, places visited), location, demographics and lab confirmation status. A good answer names three and explains how each helps describe or test the outbreak.',
  'epi-u3-l1-q5':
    'Grouping cases into daily, 12-hour or weekly bins can create or hide apparent peaks. If a pattern appears at several bin widths, it is more likely real; if it appears only at one, it may be an artifact of the grouping.',
  'epi-u3-l1-q6':
    'If eating the suspected food were part of being a case, every case would be exposed by definition. The food would then look strongly linked to illness no matter what, a circular result that tells you nothing.',
  'epi-u3-l1-q7':
    'Fewer recent cases could mean the outbreak is truly waning or control measures worked, but recent cases are often not yet reported or confirmed. Check reporting delays and completeness before concluding it is over.',
  'epi-u4-l1-q1':
    'In the example, the exposed risk is 20/50 = 0.4 and the unexposed risk is 5/50 = 0.1. RR = 0.4 ÷ 0.1 = 4. 6 is the odds ratio and 0.3 is the risk difference.',
  'epi-u4-l1-q2':
    'Sensitivity = true positives ÷ everyone who truly has the disease. Its denominator is all people with disease by the reference standard. Dividing by everyone who tested positive gives the positive predictive value instead.',
  'epi-u4-l1-q3':
    'Odds ratio = (a × d) ÷ (b × c) = (20 × 45) ÷ (30 × 5) = 900 ÷ 150 = 6. 4 is the risk ratio from the same table.',
  'epi-u4-l1-q4':
    'Risk difference = exposed risk − unexposed risk = 0.4 − 0.1 = 0.3, or 30 percentage points. It shows how many extra cases per 100 exposed people are associated with the exposure.',
  'epi-u4-l1-q5':
    'Risk is cases ÷ everyone; odds are cases ÷ non-cases. With exposed risk 0.4, the odds are 0.4 ÷ 0.6 ≈ 0.67. When the outcome is common, odds and risks diverge, so the OR (6) is further from 1 than the RR (4).',
  'epi-u4-l1-q6':
    'An RR of 4 means the exposed group’s observed risk of illness over the follow-up period was four times the unexposed group’s. That is an association; bias, confounding and chance must be considered before calling it causal.',
  'epi-u4-l1-q7':
    'If c = 0, no one in the unexposed group became ill, so the unexposed risk is 0 and RR = risk ÷ 0 is undefined. Report it as not estimable by this calculation; do not quietly add a correction without saying so.',
  'epi-u5-l1-q1':
    'Choosing people because they have the disease (cases) or do not (controls), then comparing past exposures, is a case-control study. A cohort starts with an exposure group and follows outcomes, and a trial assigns the exposure.',
  'epi-u5-l1-q2':
    'Everyone who attended is included regardless of whether they became sick, and the outcomes have already happened. Studying a defined group by exposure after the fact is a retrospective cohort, so attack rates and risk ratios can be calculated.',
  'epi-u5-l1-q3':
    'Random sampling picks who is studied so the sample represents a population. Random assignment decides which participants get which exposure so groups are comparable. A study can use either, both or neither.',
  'epi-u5-l1-q4':
    'In a case-control study the investigator decides how many cases and controls to recruit, for example 50 of each. The share of cases in the sample therefore reflects that choice, not how common the disease is, so risk cannot be calculated. Use the odds ratio.',
  'epi-u5-l1-q5':
    'After news links an illness to a food, sick people may search their memory harder and report eating it more often than healthy controls do. That uneven recall biases the association.',
  'epi-u5-l1-q6':
    'The ecological fallacy is assuming a relationship seen between group averages also holds for individuals. A country with higher average fat intake and more heart disease does not show that the individuals eating more fat are the ones getting sick.',
  'epi-u5-l1-q7':
    'Random assignment spreads both known and unknown risk factors evenly between groups on average, so differences in outcome can be credited to the intervention. Dropouts or poor adherence can still undermine it.',
  'epi-u6-l1-q1':
    'In active surveillance the health department reaches out to clinics, labs or hospitals to find cases. In passive surveillance it waits for providers to send reports. Active is more complete but costs more effort.',
  'epi-u6-l1-q2':
    'Sentinel surveillance uses a chosen set of sites, such as certain clinics, to track trends. It is not a full census or a random sample, so its results may not represent the whole population.',
  'epi-u6-l1-q3':
    'A broad syndrome like "fever and cough" catches cases early and rarely misses an outbreak (high sensitivity, good timeliness), but it also catches many unrelated illnesses (lower specificity), so false alarms are more likely.',
  'epi-u6-l1-q4':
    'Surveillance is a continuous cycle: collect data, analyze them, interpret what they mean, and share results with people who can act, whose actions and feedback shape the next round of data collection.',
  'epi-u6-l1-q5':
    'If more people are tested, or a new test is used, more cases may be found even though disease has not increased. Checking testing volume and methods separates real change from changes in detection.',
  'epi-u6-l1-q6':
    'Representativeness asks whether reported cases accurately reflect who gets sick, where and when. If some groups or areas are under-reported, the data give a distorted picture of disease distribution.',
  'epi-u6-l1-q7':
    'An early-warning system accepts more false alarms so clusters are caught quickly. A system measuring disease burden instead aims for complete, specific counts even if they arrive later. The right balance depends on the purpose.',
  'epi-u7-l1-q1':
    'If a case must have eaten the suspected food, every case is exposed by definition, so the analysis will always find a link. The case definition should use symptoms, time and place, never the exposure being tested.',
  'epi-u7-l1-q2':
    'A broader definition catches more true cases but also sweeps in people sick from unrelated causes, lowering specificity. That can dilute the association with the real source. Sensitivity and specificity trade off.',
  'epi-u7-l1-q3':
    'A missing onset date is unknown, not negative. Mark it as unknown or pending and try to obtain it. Inventing a date or coding the person as not ill introduces errors.',
  'epi-u7-l1-q4':
    'All three parts must hold: the person attended, illness began within days 1–3, and they had vomiting or at least three loose stools. Written as logic: attendance AND onset days 1–3 AND (vomiting OR ≥ 3 loose stools).',
  'epi-u7-l1-q5':
    'Recording each version of a case definition lets anyone reproduce who was counted and when. If case numbers change after an update, you can tell whether the disease changed or just the criteria.',
  'epi-u7-l1-q6':
    'Two reviewers apply the definition separately to the same records. If they classify cases differently, the wording is unclear and should be tightened until they agree.',
  'epi-u7-l1-q7':
    'Keeping records of excluded people lets others check the exclusions, lets cases be reclassified if the definition changes, and shows transparently how many were left out and why.',
  'epi-u8-l1-q1':
    'If exposed and unexposed groups have equal risk, the ratio is 1, meaning no association. RR above 1 suggests higher risk with exposure; below 1 suggests lower risk. 0 is the null value for a risk difference, not a ratio.',
  'epi-u8-l1-q2':
    '0.4 − 0.1 = 0.3, or 30 percentage points: 30 more cases per 100 people. A relative comparison would be 0.4 ÷ 0.1 = 4 times. "0.3%" and "3 points" misread the scale.',
  'epi-u8-l1-q3':
    'Vaccination trains the immune system against a specific pathogen, making the host less susceptible to infection or severe disease. It acts on the susceptible-host link in the chain of infection, not on environmental reservoirs.',
  'epi-u8-l1-q4':
    'An RR of 4 means the exposed group had four times the observed risk of the outcome compared with the unexposed group during the follow-up period. Mention study validity: bias and confounding could affect the estimate.',
  'epi-u8-l1-q5':
    'A small p-value only makes chance an unlikely explanation. The association can still come from bias, confounding or wrong timing, and causation also needs plausible biology and consistency with other evidence.',
  'epi-u8-l1-q6':
    'The chain of infection includes the infectious agent, reservoir, portal of exit, mode of transmission, portal of entry and susceptible host. Breaking any link, for example hand-washing for transmission, can stop spread.',
  'epi-u8-l1-q7':
    'Confirm the control was actually carried out, then track cases afterward with the same measurement methods. Compare with the expected trend or another group, since outbreaks often decline naturally, so not every drop is due to the intervention.',
  'epi-u9-l1-q1':
    'Tertiary prevention reduces harm from disease that already exists, for example rehabilitation after a stroke. Primary prevention stops disease from starting, and secondary prevention detects it early, often through screening.',
  'epi-u9-l1-q2':
    'When a disease is rare, almost everyone tested is healthy. Even a small false-positive rate applied to that large healthy group produces many false positives, which can outnumber the true positives and make PPV low.',
  'epi-u9-l1-q3':
    'Providing safe water prevents exposure to waterborne pathogens before anyone is sick, which is primary prevention. Screening would be secondary, and treating or rehabilitating patients would be tertiary.',
  'epi-u9-l1-q4':
    'In the example, 990 people do not have the disease, and 10% of them (specificity 90%) test positive anyway: 990 × 0.10 = 99 false positives.',
  'epi-u9-l1-q5':
    'PPV = true positives ÷ all positives = 9 ÷ (9 + 99) = 9 ÷ 108 ≈ 8.3%. Fewer than 1 in 10 positive results is a true case, because the disease is rare.',
  'epi-u9-l1-q6':
    'Finding more cases helps only if it improves outcomes. Screening can also bring false positives, overdiagnosis of harmless conditions, unnecessary treatment and unequal access, so benefits must be weighed against harms.',
  'epi-u9-l1-q7':
    'Focusing only on high-risk people misses cases among everyone else, who often account for many cases overall. It can also leave some groups without access, creating equity gaps.',
  'epi-u10-l1-q1':
    'Everyone at the event is included because they attended, not because they became sick. Grouping by exposure and comparing illness rates is a cohort design. Selecting sick people first would be case-control.',
  'epi-u10-l1-q2':
    'RR = exposed risk ÷ unexposed risk = (20/50) ÷ (5/50) = 0.4 ÷ 0.1 = 4. 0.3 is the risk difference and 6 is the odds ratio.',
  'epi-u10-l1-q3':
    'Independent evidence that can tell the possibilities apart, such as finding the same pathogen in leftover food and in patients, strengthens a conclusion most. Changing chart colors or repeating the headline adds nothing, and removing limitations makes the report less trustworthy.',
  'epi-u10-l1-q4':
    'With exposed and unexposed as rows and ill and well as columns: a = 20 (exposed, ill), b = 30 (exposed, well), c = 5 (unexposed, ill), d = 45 (unexposed, well). Each row totals 50.',
  'epi-u10-l1-q5':
    'Strength: the whole guest list was included, so risk can be calculated directly. Limitation: food histories rely on memory, and people who ate one dish often ate others, which makes it hard to isolate the source.',
  'epi-u10-l1-q6':
    'MMWR is the CDC’s published report series. This case was written for teaching and its data are invented, so labeling it MMWR would falsely suggest it is a real, published investigation.',
  'epi-u10-l1-q7':
    'Identify the report’s question, source population, case definition and study design, then check its denominators and results. Note the limitations, control measures and follow-up, using only the data it actually reports.',
};
