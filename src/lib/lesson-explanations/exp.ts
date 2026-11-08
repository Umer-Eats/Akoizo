// Checkpoint explanations for Experimental Design, keyed by question id.
export const experimentalDesign: Record<string, string> = {
  'exp-u1-l1-q1':
    'An operational definition says exactly how a variable is measured. "Time in seconds between two fixed marks" names the quantity, unit and start and stop points, so anyone can repeat it. "How good" or "seems fast" are opinions that cannot be measured consistently.',
  'exp-u1-l1-q2':
    'A pilot is a quick trial run to see whether the procedure works: can you measure the response, are the levels sensible, and is there time? It is not for deciding results or removing awkward data.',
  'exp-u1-l1-q3':
    'No. An experiment is valid if its design and measurements are sound, whatever the result. A well-run test that contradicts the hypothesis is useful evidence; report it honestly.',
  'exp-u1-l1-q4':
    'The independent variable is what you deliberately change: release height. The dependent variable is what you measure in response: the time to travel between two defined marks.',
  'exp-u1-l1-q5':
    'Controlled variables are kept the same in every trial so only the independent variable changes. Examples: the same object, the same ramp surface, the same release method, the same travel distance and the same timing method.',
  'exp-u1-l1-q6':
    'Raw data are the original measurements. Keeping them lets others check calculations, redo the analysis or graphs a different way, and see exactly how failed or unusual trials were handled. Summaries alone hide that.',
  'exp-u1-l1-q7':
    'Read the actual prompt packet for the topic and allowed materials, time limits, safety rules, required report sections and how it will be scored. Rules can change between competitions, so do not rely only on past practice.',
  'exp-u2-l1-q1':
    'A controlled variable is a condition held constant across all groups, such as keeping light the same. A control treatment is a comparison group, such as plants given no added fertilizer. The other options are all control treatments.',
  'exp-u2-l1-q2':
    'If all trials of one level are run first and another level later, anything that changes over time (warming, fatigue, wear) gets mixed up with the treatment. Randomizing the order spreads those time effects across all levels.',
  'exp-u2-l1-q3':
    'No. Measuring one plant several times reduces measurement error for that plant, but all readings share its genetics, health and location. To generalize, you need several separate plants per treatment (independent replicates).',
  'exp-u2-l1-q4':
    'A directional hypothesis predicts the direction of the effect and gives a reason: "If release height increases, the transit time between the marks will decrease, because a higher start gives more potential energy and so more speed."',
  'exp-u2-l1-q5':
    'A control condition is a comparison treatment, such as no fertilizer, used as a reference. A controlled variable is any condition kept the same in every treatment, such as temperature. One is a group; the other is held constant across groups.',
  'exp-u2-l1-q6':
    'Two levels only show whether there is a difference. Testing several levels shows the shape of the relationship: whether it is linear, levels off or peaks. That supports a much stronger conclusion and graph.',
  'exp-u2-l1-q7':
    'If level and time order stay linked, for example always testing low heights first, every repeat repeats the same drift. More trials then make the biased result look more precise without removing the bias. Randomize or block the order instead.',
  'exp-u3-l1-q1':
    'Record a missed reading as missing and note why, such as "timer not started". Entering zero would claim a measurement of zero, and filling in the mean or a nearby value invents data.',
  'exp-u3-l1-q2':
    '"The object wobbled" describes what was directly seen. The other options explain why something happened or judge the hypothesis; those are inferences, not observations.',
  'exp-u3-l1-q3':
    'For timing to be repeatable, everyone must start and stop the clock at the same moments, such as "start when the front edge passes mark A, stop when it passes mark B". Without defined endpoints, different people measure different intervals.',
  'exp-u3-l1-q4':
    'A reproducible procedure states where and how the object is released, which marks start and stop the timer, how the timer is operated and reset, how many trials are done and in what units data are recorded.',
  'exp-u3-l1-q5':
    'Raw data are what was actually measured; summary data such as means are calculated from them. Keeping them separate lets someone check the calculations and avoids confusing an average with an original observation.',
  'exp-u3-l1-q6':
    'A setup diagram should show the apparatus and how parts are arranged, key dimensions and angles, where the independent variable is set and where the measurement starts and stops. Someone should be able to rebuild the setup from it.',
  'exp-u3-l1-q7':
    'Notes written after seeing the results are not real observations. They could be used, even unintentionally, to justify removing data or to support a favored explanation, which misrepresents what happened.',
  'exp-u4-l1-q1':
    'Mean = 10. Deviations are −2, 0 and +2; squared they are 4, 0 and 4, summing to 8. Sample SD divides by n − 1 = 2: √(8 ÷ 2) = √4 = 2.',
  'exp-u4-l1-q2':
    'Variance is in squared units, but taking the square root to get SD returns to the original units of the response. If times are in seconds, SD is in seconds too.',
  'exp-u4-l1-q3':
    'No. R² only shows how closely the data fit the line. A confounding variable, reverse causation or coincidence can produce a high R². Causation depends on a controlled experimental design, not the strength of fit.',
  'exp-u4-l1-q4':
    'Mean = (8 + 10 + 12) ÷ 3 = 30 ÷ 3 = 10. Range = largest − smallest = 12 − 8 = 4, in the same units as the response.',
  'exp-u4-l1-q5':
    'SD describes how spread out individual measurements are. Standard error, SD ÷ √n, describes how precisely the mean is estimated. More trials shrink the standard error but not the natural spread, assuming the trials are independent.',
  'exp-u4-l1-q6':
    'Plotting each trial shows how spread out results are, how many trials there were and any unusual points. A mean alone can hide a wide spread or one outlier pulling the average.',
  'exp-u4-l1-q7':
    'Precision is how close repeated readings are to each other; accuracy is how close they are to the true value. A miscalibrated instrument can give tightly clustered readings that are all shifted by the same amount: precise but inaccurate.',
  'exp-u5-l1-q1':
    '"Means increased from 12 to 20 units" is specific and numerical, so it can be checked against the data. The other statements are opinions or claims with no measurement behind them.',
  'exp-u5-l1-q2':
    'An unusual point should be checked against a rule set in advance and against the lab notes, such as a recorded timing error. Whatever is decided, report it. Deleting or hiding data because it is inconvenient is not acceptable.',
  'exp-u5-l1-q3':
    'A useful error statement explains how the error affects the result and in which direction, for example "starting the timer late shortened every time by about 0.2 s". Simply listing equipment or saying "human error" gives no insight.',
  'exp-u5-l1-q4':
    'Claim: the mean response rises as the level increases. Evidence: means of 12, 16 and 20 for levels 1–3 (each SD 2), an overall increase of 8 units. Each step (+4) is larger than the SD, which supports a real trend.',
  'exp-u5-l1-q5':
    'Hand timing depends on reaction time. If the person starts or stops the timer slightly early or late by different amounts each trial, measured times vary even when the real time is the same, increasing spread.',
  'exp-u5-l1-q6':
    'Showing results with and without the flagged value lets readers see whether the conclusion depends on that one point. If the conclusion holds either way it is robust; if not, that uncertainty should be reported.',
  'exp-u5-l1-q7':
    'You only know how the system behaves within the tested range. Beyond it the relationship may change, for example leveling off or reversing, so predictions outside the range are speculation.',
  'exp-u6-l1-q1':
    'A constant +0.5 s added to every measurement shifts all values the same way, which makes it a systematic error (bias). Random error would scatter values both above and below the true value.',
  'exp-u6-l1-q2':
    'Randomizing the trial order, or running all levels within each time block, stops time-related drift from lining up with one treatment. Deleting late trials hides the problem and adding decimal places does nothing.',
  'exp-u6-l1-q3':
    'A conclusion should answer the specific question tested, using the data collected. Answering a different question, claiming every possible mechanism or supporting the hypothesis regardless of results goes beyond the evidence.',
  'exp-u6-l1-q4':
    'Averaging many trials cancels random error, because high and low values balance. A fixed offset shifts every trial the same way, so the mean still contains it; only calibration or correction removes it.',
  'exp-u6-l1-q5':
    'If the timer is stopped after the true end, extra time is added to each measurement, so recorded durations are too long. This is a systematic error in one direction.',
  'exp-u6-l1-q6':
    'Replace hand timing with an automatic method, such as light gates or video analysis, so start and stop no longer depend on reaction time. Check that it is calibrated and works for this setup before relying on it.',
  'exp-u6-l1-q7':
    'A good follow-up targets a weakness found: repeat the test with randomized order and stable temperature, using the same measured response and independent replicates, to see whether the trend holds without time drift.',
  'exp-u7-l1-q1':
    'A standard of comparison is a defined baseline treatment, such as "no fertilizer" or "standard ramp height", that other treatments are compared against. It need not give zero response, and it is different from controlled variables.',
  'exp-u7-l1-q2':
    'When multiplying, keep the fewest significant figures of any input. 2.0 has two and 3.00 has three, so 2.0 × 3.00 = 6.00 is reported as 6.0 cm². The units also multiply to cm².',
  'exp-u7-l1-q3':
    'An abstract briefly summarizes the whole study: question, method, main numerical result and a conclusion limited to what the data show. It does not list every raw value or promise future work.',
  'exp-u7-l1-q4':
    'When adding, the result is only as precise as the least precise decimal place. 2.0 is known to tenths, so 2.0 + 3.00 = 5.00 is reported as 5.0 cm.',
  'exp-u7-l1-q5':
    'The control mean is calculated from real measurements, which vary from trial to trial. Repeating the control would give a slightly different mean, so it has uncertainty just like any treatment mean.',
  'exp-u7-l1-q6':
    'One sentence each: the question and system studied; the levels tested, the response measured and the number of trials; the key numerical result with its variability; and the conclusion with its main limitation.',
  'exp-u7-l1-q7':
    'Competition requirements, required sections and scoring can change between seasons and levels. The syllabus teaches general skills, so the current official checklist decides what must be included.',
  'exp-u8-l1-q1':
    'The final check is whether the whole report connects: does the conclusion answer the question, use the stated variables, match the data and agree with the graph? A mismatch anywhere breaks the chain of reasoning.',
  'exp-u8-l1-q2':
    'No. Inventing data is fabrication and makes the whole report untrustworthy. Mark the trial as missing, state why, and analyze the data you actually have.',
  'exp-u8-l1-q3':
    'A useful reflection names a specific problem, decides on a specific change and then tries that change on a new task. Repeating the same answer or blaming general human error does not improve future work.',
  'exp-u8-l1-q4':
    'Statistics, graphs and conclusions all need the collected data, and the abstract needs the finished analysis. A good answer names three such tasks and notes they cannot be finished until the data they depend on exist.',
  'exp-u8-l1-q5':
    'If teammates work separately using different units, different start and stop points, different variable names or different versions of the procedure, their sections will contradict each other. Agree on these at the start.',
  'exp-u8-l1-q6':
    'Record what changed (the new version), which trials used it, why it was changed and whether data from before and after can still be fairly combined. Otherwise readers cannot judge the results.',
  'exp-u8-l1-q7':
    'Simplify the apparatus, run a short pilot early to check it works, split independent jobs between teammates and set aside fixed time for analysis and writing. Then test the plan in a new timed practice.',
  'exp-u7-l1-b-q1':
    'The smaller towel’s mean is (2 + 3 + 4) ÷ 3 = 3 g and the larger towel’s mean is (5 + 6 + 7) ÷ 3 = 6 g. Doubling area doubled the mean absorbed mass. Not every single measurement doubled, and soak time was held constant.',
  'exp-u7-l1-b-q2':
    'A full answer calculates both means, (2 + 3 + 4) ÷ 3 = 3 g and (5 + 6 + 7) ÷ 3 = 6 g, compares them, and notes each group has a 2 g range, so the groups do not overlap.',
  'exp-u7-l1-b-q3':
    'The mean is the average: add all the measurements and divide by how many there are. For 2, 3 and 4 g, the mean is 9 ÷ 3 = 3 g. It summarizes the typical value of repeated trials.',
};
