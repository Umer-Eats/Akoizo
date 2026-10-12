import { check, phet, sort, type EventExtras } from '../lesson-extras.ts';
import {
  choice,
  circle,
  goal,
  line,
  near,
  seeded,
  slider,
  text,
  toggle,
  type TopicLab,
} from '../topic-lab-kit.ts';

const feasibility: TopicLab = {
  id: 'exp-feasibility',
  title: 'Will the design fit the time?',
  lead: 'More levels and more trials make stronger evidence — until the clock runs out. Budget the experiment before committing to it.',
  controls: [
    slider('levels', 'Levels of the independent variable', 2, 8, 1, 3, ''),
    slider('trials', 'Trials at each level', 1, 10, 1, 2, ''),
    slider('per', 'Minutes per trial', 0.5, 5, 0.5, 2, 'min'),
    slider('setup', 'Set-up and clean-up', 0, 10, 1, 5, 'min'),
  ],
  run: (v) => {
    const time = v.setup + v.levels * v.trials * v.per;
    return {
      o: { time, points: v.levels * v.trials },
      metrics: [
        { label: 'Time needed for the experiment', value: time, unit: 'min' },
        { label: 'Data points collected', value: v.levels * v.trials },
        {
          label: 'Fits a 20-minute testing window',
          value: time <= 20 ? 'Yes' : `No — over by ${time - 20} min`,
        },
        {
          label: 'Supports a trend and a variability estimate',
          value:
            v.levels >= 3 && v.trials >= 3
              ? 'Yes: at least three levels and three trials'
              : 'Not yet — aim for three or more of each',
        },
      ],
      bars: {
        title: 'Minutes',
        max: Math.max(50, time),
        items: [
          { label: 'This plan', value: time, tone: time <= 20 ? 'green' : 'warm' },
          { label: 'Testing window', value: 20, tone: 'muted' },
          { label: 'Whole event', value: 50, tone: 'muted' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Design an experiment with at least four levels and three trials each that fits in 20 minutes.',
      'Shorten each trial rather than cutting replication.',
      { levels: 4, trials: 3, per: 1 },
      (o, v) => v.levels >= 4 && v.trials >= 3 && o.time <= 20,
    ),
    goal(
      'Show an over-ambitious plan that would need more than 40 minutes.',
      'Many levels with many trials multiplies quickly.',
      { levels: 8, trials: 5 },
      (o) => o.time > 40,
    ),
    goal(
      'Make a five-level, three-trial plan fit the 20-minute window.',
      'Fifteen trials leave one minute each after set-up.',
      { levels: 5, trials: 3, per: 1 },
      (o, v) => v.levels === 5 && v.trials === 3 && o.time <= 20,
    ),
  ],
  predict: {
    q: 'With a fixed amount of time, adding more levels of the independent variable usually means…',
    options: [
      'Fewer trials at each level, unless each trial is made shorter',
      'More trials at each level',
      'No change in the number of trials',
      'The dependent variable no longer needs measuring',
    ],
    correct: 0,
    why: 'Total time is set-up plus levels × trials × time per trial. Something has to give, so decide the trade deliberately.',
  },
  model:
    'Time = set-up + levels × trials × minutes per trial, compared with an illustrative 20-minute testing window inside a 50-minute event. Check the current rules and your own writing speed; the right split differs between teams.',
};

function assign(seed: number) {
  // Shuffle sixteen units, eight per bench; count treatment-B units that land on bench 2.
  const rng = seeded(seed * 9973),
    units = Array.from({ length: 16 }, (_, i) => i);
  for (let i = 15; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [units[i], units[j]] = [units[j], units[i]];
  }
  return units.slice(8).filter((u) => u >= 8).length;
}
const blocking: TopicLab = {
  id: 'exp-blocking',
  title: 'Confounding, randomising, and blocking',
  lead: 'Two treatments are tested on two lab benches that are not identical. How you assign treatments to benches decides whether the bench difference contaminates the result.',
  controls: [
    slider('effect', 'True treatment effect (B − A)', 0, 10, 0.5, 0, 'units'),
    slider('bench', 'Bench 2 reads higher than bench 1 by', 0, 10, 0.5, 4, 'units'),
    choice(
      'design',
      'Assignment of treatments',
      [
        'All of A at bench 1, all of B at bench 2',
        'Randomly assigned across benches',
        'Blocked: half of each treatment at each bench',
      ],
      2,
    ),
    slider('seed', 'Random assignment number', 1, 10, 1, 1, ''),
  ],
  run: (v) => {
    const k = v.design === 0 ? 8 : v.design === 2 ? 4 : assign(v.seed),
      estimate = v.effect + (v.bench * (2 * k - 8)) / 8;
    return {
      o: { estimate, bias: estimate - v.effect, k },
      metrics: [
        { label: 'Effect you would report', value: estimate, unit: 'units' },
        { label: 'True effect', value: v.effect, unit: 'units' },
        { label: 'Bias from the bench difference', value: estimate - v.effect, unit: 'units' },
        { label: 'Treatment-B units on bench 2', value: `${k} of 8` },
      ],
      bars: {
        max: 20,
        items: [
          { label: 'True effect', value: v.effect, tone: 'muted' },
          {
            label: 'Estimated effect',
            value: estimate,
            tone: Math.abs(estimate - v.effect) < 0.01 ? 'green' : 'warm',
          },
        ],
      },
    };
  },
  missions: [
    goal(
      'Show a design that reports an effect of 3 units or more when the true effect is zero.',
      'Put each treatment on its own bench so the bench difference masquerades as a treatment effect.',
      { design: 0 },
      (o, v) => v.effect === 0 && o.estimate >= 3,
    ),
    goal(
      'With a true effect of 5 and benches differing by 10, choose the design that recovers the effect exactly.',
      'Give each bench equal numbers of both treatments.',
      { effect: 5, bench: 10, design: 2 },
      (o, v) => v.effect === 5 && v.bench === 10 && o.bias === 0,
    ),
    goal(
      'Use random assignment and find a draw whose bias is under 2 units.',
      'Randomising makes large imbalance unlikely, not impossible: try several assignments.',
      { design: 1, seed: 1 },
      (o, v) => v.design === 1 && v.bench === 4 && Math.abs(o.bias) < 2,
    ),
  ],
  predict: {
    q: 'Blocking by lab bench improves an experiment because it…',
    options: [
      'Makes each treatment experience every bench equally, so bench differences cancel',
      'Removes the need for replication',
      'Guarantees the treatment has an effect',
      'Eliminates all random error',
    ],
    correct: 0,
    why: 'A known nuisance factor is balanced by design instead of left to chance. Randomisation is still used within each block for everything else.',
  },
  model:
    'Eight units per treatment across two benches with an additive bench offset and no other noise. Estimated effect = true effect + bench offset × (imbalance / 8). Random assignment is a reproducible pseudo-random shuffle. Real experiments add measurement noise on top.',
};

const keys = ['x1', 'x2', 'x3', 'x4', 'x5'];
const spread: TopicLab = {
  id: 'exp-spread',
  title: 'Centre and spread of five measurements',
  lead: 'Drag five trial values around and watch the summary statistics respond. Some react strongly to one unusual value; others barely move.',
  controls: [8, 9, 10, 11, 12].map((initial, i) =>
    slider(keys[i], `Trial ${i + 1}`, 0, 20, 0.5, initial, ''),
  ),
  run: (v) => {
    const xs = keys.map((k) => v[k]),
      sorted = [...xs].sort((a, b) => a - b),
      mean = xs.reduce((a, b) => a + b, 0) / 5,
      sd = Math.sqrt(xs.reduce((s, x) => s + (x - mean) ** 2, 0) / 4),
      px = (x: number) => 70 + x * 25;
    return {
      o: { mean, median: sorted[2], sd, range: sorted[4] - sorted[0] },
      metrics: [
        { label: 'Mean', value: Number(mean.toFixed(3)) },
        { label: 'Median', value: sorted[2] },
        { label: 'Sample standard deviation', value: Number(sd.toFixed(3)) },
        { label: 'Range', value: sorted[4] - sorted[0] },
      ],
      sceneLabel: `Dot plot of five trials with mean ${mean.toFixed(2)}, median ${sorted[2]}, and standard deviation ${sd.toFixed(2)}`,
      scene: [
        line(70, 220, 570, 220, 'muted', 2),
        ...[0, 5, 10, 15, 20].flatMap((x) => [
          line(px(x), 214, px(x), 226, 'muted', 2),
          text(px(x), 246, `${x}`, 'middle', 'muted'),
        ]),
        ...sorted.map((x, i) =>
          circle(px(x), 200 - sorted.slice(0, i).filter((y) => y === x).length * 22, 9, 'accent'),
        ),
        line(px(mean), 80, px(mean), 214, 'slot', 2.5),
        text(px(mean), 70, 'mean', 'middle', 'slot'),
        line(px(sorted[2]), 110, px(sorted[2]), 214, 'gold', 2, true),
        text(px(sorted[2]), 100, 'median', 'middle', 'gold', 11),
        line(px(Math.max(0, mean - sd)), 290, px(Math.min(20, mean + sd)), 290, 'slot', 5),
        text(320, 316, 'bar: mean ± one standard deviation', 'middle', 'muted', 11),
      ],
    };
  },
  missions: [
    goal(
      'Make five trials with a mean of 12 and no spread at all.',
      'A standard deviation of zero means every value is identical.',
      { x1: 12, x2: 12, x3: 12, x4: 12, x5: 12 },
      (o) => o.sd === 0 && o.mean === 12,
    ),
    goal(
      'Keep the mean at exactly 10 while raising the standard deviation above 5.',
      'Move values outward symmetrically so the centre does not shift.',
      { x1: 3, x2: 5, x3: 10, x4: 15, x5: 17 },
      (o) => o.mean === 10 && o.sd > 5,
    ),
    goal(
      'Create an outlier that pulls the mean at least 1.5 above the median.',
      'Change only the largest value.',
      { x5: 20 },
      (o) => o.mean - o.median >= 1.5,
    ),
  ],
  predict: {
    q: 'One extremely high value is added to a data set. Which summary changes more?',
    options: ['The mean', 'The median', 'Both change equally', 'Neither changes'],
    correct: 0,
    why: 'The mean uses every value’s size, so one extreme point drags it. The median depends only on rank order and is resistant to outliers.',
  },
  model:
    'Mean, median, range, and the sample standard deviation (dividing by n − 1) of exactly five values. With so few trials every statistic is itself uncertain — which is why more replication is worth the time.',
};

const dataX = [1, 2, 3, 4, 5, 6, 7, 8],
  dataY = [3.4, 4.4, 7.3, 8.8, 11.5, 12.6, 15.1, 16.7];
function leastSquares(xs: number[], ys: number[]) {
  const n = xs.length,
    sx = xs.reduce((a, b) => a + b, 0),
    sy = ys.reduce((a, b) => a + b, 0),
    sxy = xs.reduce((s, x, i) => s + x * ys[i], 0),
    sxx = xs.reduce((s, x) => s + x * x, 0),
    slope = (n * sxy - sx * sy) / (n * sxx - sx * sx),
    intercept = (sy - slope * sx) / n;
  return {
    slope,
    intercept,
    ssr: xs.reduce((s, x, i) => s + (ys[i] - slope * x - intercept) ** 2, 0),
  };
}
const fit: TopicLab = {
  id: 'exp-fit',
  title: 'Fitting a trend line by hand',
  lead: 'Adjust a line’s slope and intercept to follow the data. The sum of squared residuals measures the misfit — and shows what a single outlier does.',
  controls: [
    slider('slope', 'Slope of your line', 0, 4, 0.05, 1, ''),
    slider('intercept', 'Intercept of your line', -5, 10, 0.25, 5, ''),
    toggle('outlier', 'Include the outlier at (9, 8)'),
  ],
  run: (v) => {
    const xs = v.outlier ? [...dataX, 9] : dataX,
      ys = v.outlier ? [...dataY, 8] : dataY,
      best = leastSquares(xs, ys),
      ssr = xs.reduce((s, x, i) => s + (ys[i] - v.slope * x - v.intercept) ** 2, 0);
    return {
      o: { ssr, best: best.ssr, bestSlope: best.slope },
      metrics: [
        { label: 'Sum of squared residuals for your line', value: Number(ssr.toFixed(2)) },
        { label: 'Smallest possible value', value: Number(best.ssr.toFixed(2)) },
        { label: 'Least-squares slope for these points', value: Number(best.slope.toFixed(3)) },
        { label: 'Least-squares intercept', value: Number(best.intercept.toFixed(3)) },
      ],
      plot: {
        title: 'Response against the independent variable',
        x: [0, 10, 'Independent variable'],
        y: [0, 20, 'Response'],
        curves: [
          { f: (x) => v.slope * x + v.intercept, label: 'your line' },
          {
            f: (x) => best.slope * x + best.intercept,
            label: 'least-squares line',
            dash: true,
            tone: 'muted',
          },
        ],
        points: xs.map((x, i) => ({
          x,
          y: ys[i],
          tone: i === 8 ? ('warm' as const) : ('slot' as const),
        })),
      },
    };
  },
  missions: [
    goal(
      'Without the outlier, fit a line whose sum of squared residuals is below 2.',
      'The points rise about 2 units for each unit of x, starting near 1.',
      { slope: 2, intercept: 1 },
      (o, v) => v.outlier === 0 && o.ssr < 2,
    ),
    goal(
      'Include the outlier and refit until your line is within 10% of the best possible misfit.',
      'The outlier drags the best line flatter and raises its intercept.',
      { outlier: 1, slope: 1.25, intercept: 3.5 },
      (o, v) => v.outlier === 1 && o.ssr <= 1.1 * o.best,
    ),
    goal(
      'With the outlier included, restore the original trend (slope 2, intercept 1) and compare its misfit.',
      'The line still follows the eight consistent points; one residual is now huge.',
      { outlier: 1, slope: 2, intercept: 1 },
      (o, v) => v.outlier === 1 && v.slope === 2 && v.intercept === 1,
    ),
  ],
  predict: {
    q: 'A single point far from the trend affects a least-squares line because…',
    options: [
      'Residuals are squared, so one large deviation counts heavily',
      'The line must pass through every point',
      'Outliers are always deleted automatically',
      'Least squares ignores the largest residual',
    ],
    correct: 0,
    why: 'Squaring makes a residual of 8 count as 64. The line tilts toward the outlier to reduce that one term, at the expense of the fit to everything else.',
  },
  model:
    'Ordinary least squares minimises Σ(y − mx − b)² over a fixed synthetic data set (trend y ≈ 2x + 1 with small scatter). An outlier should be investigated and reported, not silently removed; a justified exclusion needs a documented reason.',
};

function shots(n: number, seed: number, bias: number, spreadBy: number) {
  const rng = seeded(seed * 7907 + n);
  const normal = () => (rng() + rng() + rng() + rng() - 2) * 1.732;
  return Array.from({ length: n }, () => [bias + spreadBy * normal(), spreadBy * normal()]);
}
const error: TopicLab = {
  id: 'exp-error',
  title: 'Accuracy and precision on a target',
  lead: 'Each dot is one measurement; the centre is the true value. A constant offset moves the whole cluster, while random scatter spreads it out.',
  controls: [
    slider('bias', 'Systematic offset', -5, 5, 0.5, 0, 'units'),
    slider('spread', 'Random scatter', 0.2, 4, 0.2, 1, 'units'),
    slider('n', 'Number of measurements', 3, 20, 1, 8, ''),
    slider('seed', 'Repeat the session', 1, 10, 1, 1, ''),
  ],
  run: (v) => {
    const pts = shots(v.n, v.seed, v.bias, v.spread),
      cx = pts.reduce((s, p) => s + p[0], 0) / v.n,
      cy = pts.reduce((s, p) => s + p[1], 0) / v.n,
      scatter = Math.sqrt(pts.reduce((s, p) => s + (p[0] - cx) ** 2 + (p[1] - cy) ** 2, 0) / v.n),
      offset = Math.hypot(cx, cy),
      sx = (x: number) => 320 + Math.max(-11, Math.min(11, x)) * 13,
      sy = (y: number) => 170 - Math.max(-11, Math.min(11, y)) * 13;
    return {
      o: { offset, scatter },
      metrics: [
        { label: 'Distance of the average from the true value', value: offset, unit: 'units' },
        { label: 'Scatter about the average', value: scatter, unit: 'units' },
        {
          label: 'Description',
          value: `${offset < 1 ? 'Accurate' : 'Inaccurate'} and ${scatter < 1 ? 'precise' : 'imprecise'}`,
        },
      ],
      sceneLabel: `Target with ${v.n} measurements; average is ${offset.toFixed(2)} units from the centre with scatter ${scatter.toFixed(2)}`,
      scene: [
        ...[10, 7.5, 5, 2.5].map((r) => circle(320, 170, r * 13, 'muted', false)),
        line(307, 170, 333, 170, 'muted', 1.5),
        line(320, 157, 320, 183, 'muted', 1.5),
        ...pts.map(([x, y]) => circle(sx(x), sy(y), 5, 'accent', true, 0.85)),
        circle(sx(cx), sy(cy), 8, 'slot', false),
        text(sx(cx) + 14, sy(cy) - 10, 'average', 'start', 'slot', 11),
        text(
          320,
          326,
          'Rings are 2.5 units apart; the cross is the true value',
          'middle',
          'muted',
          11,
        ),
      ],
    };
  },
  missions: [
    goal(
      'Produce measurements that are precise but inaccurate: scatter under 1 with the average more than 3 units off.',
      'A large constant offset with very little random scatter.',
      { bias: 4, spread: 0.4 },
      (o) => o.scatter < 1 && o.offset > 3,
    ),
    goal(
      'Produce measurements that are accurate but imprecise: average within 1 unit of the truth with scatter above 3.',
      'No offset, wide scatter, and enough measurements for the average to settle. Repeat the session if one draw is unlucky.',
      { spread: 2.4, n: 20, seed: 7 },
      (o) => o.offset < 1 && o.scatter > 3,
    ),
    goal(
      'Produce measurements that are both accurate and precise.',
      'No offset and very little scatter.',
      { spread: 0.4 },
      (o) => o.offset < 0.5 && o.scatter < 1,
    ),
  ],
  predict: {
    q: 'Averaging many repeated measurements reduces the effect of…',
    options: [
      'Random error, but not systematic error',
      'Systematic error, but not random error',
      'Both kinds of error equally',
      'Neither kind of error',
    ],
    correct: 0,
    why: 'Random deviations partly cancel in an average. A miscalibrated instrument shifts every reading the same way, and no amount of averaging removes that.',
  },
  model:
    'Synthetic two-dimensional measurements: a constant offset along one axis plus approximately normal scatter generated reproducibly. Accuracy is the distance of the average from the true value; precision is the root-mean-square scatter about the average.',
};

const percent: TopicLab = {
  id: 'exp-percent',
  title: 'Comparing a result with a standard',
  lead: 'Percent error says how far a measured value lies from an accepted one, and in which direction. Significant figures say how much of the number you can stand behind.',
  controls: [
    slider('measured', 'Your measured value', 5, 15, 0.01, 9.62, ''),
    slider('accepted', 'Accepted (standard) value', 5, 15, 0.01, 9.81, ''),
    slider('sig', 'Significant figures to report', 1, 5, 1, 3, ''),
  ],
  run: (v) => {
    const pct = ((v.measured - v.accepted) / v.accepted) * 100;
    return {
      o: { pct, shown: Number(v.measured.toPrecision(v.sig)) },
      metrics: [
        { label: 'Percent error', value: Number(pct.toFixed(2)), unit: '%' },
        {
          label: 'Direction',
          value:
            Math.abs(pct) < 1e-9
              ? 'Exactly on the standard'
              : pct > 0
                ? 'Measured value is too high'
                : 'Measured value is too low',
        },
        {
          label: 'Reported at the chosen significant figures',
          value: v.measured.toPrecision(v.sig),
        },
        { label: 'Absolute difference', value: Number((v.measured - v.accepted).toFixed(2)) },
      ],
      bars: {
        max: 15,
        items: [
          { label: 'Measured', value: v.measured, tone: 'slot' },
          { label: 'Accepted', value: v.accepted, tone: 'muted' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Find a measured value whose percent error is smaller than 0.5% in size.',
      'Move the measurement to within about 0.05 of the standard.',
      { measured: 9.8 },
      (o) => Math.abs(o.pct) < 0.5,
    ),
    goal(
      'Report the starting measurement of 9.62 to two significant figures.',
      'Count from the first non-zero digit and round the next one.',
      { sig: 2 },
      (o, v) => near(v.measured, 9.62, 1e-9) && v.sig === 2,
    ),
    goal(
      'Produce a percent error of +5.0%.',
      'The measured value must be 1.05 times the accepted value.',
      { measured: 10.3 },
      (o) => near(o.pct, 5, 0.05),
    ),
  ],
  predict: {
    q: 'A length of 12.5 cm is multiplied by a width of 3.2 cm. The area should be reported as…',
    options: ['40. cm² (two significant figures)', '40.0 cm²', '40.00 cm²', '4 × 10¹ cm²'],
    correct: 0,
    why: 'In multiplication the result keeps as many significant figures as the least precise factor — here the two in 3.2.',
  },
  model:
    'Percent error = (measured − accepted) / accepted × 100, keeping its sign. Rounding uses standard rounding to the requested number of significant figures; trailing zeros shown after a decimal point are significant.',
};

const phases: [string, number, number][] = [
  ['Plan and hypothesise', 15, 4],
  ['Run the experiment', 30, 8],
  ['Analyse and graph', 25, 6],
  ['Write the report', 30, 9],
];
const timePlan: TopicLab = {
  id: 'exp-time',
  title: 'Dividing fifty minutes',
  lead: 'Every section of the report earns points with diminishing returns, and unfinished sections earn nothing. Split the event’s time to finish strong.',
  controls: [
    slider('plan', 'Plan and hypothesise', 0, 20, 1, 5, 'min'),
    slider('run', 'Run the experiment', 0, 30, 1, 20, 'min'),
    slider('analyze', 'Analyse and graph', 0, 20, 1, 10, 'min'),
    slider('write', 'Write the report', 0, 30, 1, 10, 'min'),
  ],
  run: (v) => {
    const minutes = [v.plan, v.run, v.analyze, v.write],
      total = minutes.reduce((a, b) => a + b, 0),
      raw = phases.map(([, max, tau], i) => max * (1 - Math.exp(-minutes[i] / tau))),
      scale = total > 50 ? 50 / total : 1,
      score = raw.reduce((a, b) => a + b, 0) * scale;
    return {
      o: { total, score },
      metrics: [
        { label: 'Total time planned', value: total, unit: 'min' },
        {
          label: 'Status',
          value:
            total > 50
              ? `Over by ${total - 50} min — the last sections will be left unfinished`
              : total < 50
                ? `${50 - total} min unused`
                : 'Exactly fifty minutes',
        },
        { label: 'Modelled rubric score', value: Number(score.toFixed(1)), unit: 'of 100' },
      ],
      bars: {
        title: 'Modelled points earned in each phase',
        max: 30,
        items: phases.map(([name], i) => ({
          label: `${name} (${minutes[i]} min)`,
          value: raw[i] * scale,
          tone: 'accent' as const,
        })),
      },
    };
  },
  missions: [
    goal(
      'Use exactly fifty minutes and score above 82.',
      'Move time from the experiment into analysis and writing.',
      { plan: 6, run: 16, analyze: 12, write: 16 },
      (o) => o.total === 50 && o.score > 82,
    ),
    goal(
      'Show what over-running costs: build a plan that needs sixty minutes or more.',
      'Add time to any phase without removing it elsewhere.',
      { write: 25 },
      (o) => o.total >= 60,
    ),
    goal(
      'Use all fifty minutes but leave three minutes or fewer for writing, and see the score fall below 70.',
      'Extra trials cannot make up for a missing conclusion.',
      { plan: 8, run: 30, analyze: 10, write: 2 },
      (o, v) => o.total === 50 && v.write <= 3 && o.score < 70,
    ),
  ],
  predict: {
    q: 'Ten minutes remain. The data table is complete but there is no analysis or conclusion. The better choice is to…',
    options: [
      'Stop collecting data and write the analysis and conclusion',
      'Run several more trials',
      'Redo the hypothesis',
      'Rewrite the materials list neatly',
    ],
    correct: 0,
    why: 'Later sections carry many points and depend on what you already have. Additional trials add little compared with a missing conclusion.',
  },
  model:
    'A deliberately simple teaching model: each phase earns max × (1 − e^(−t/τ)) points and an over-long plan is scaled down in proportion. The point values are illustrative, not the official rubric — use the current scoring sheet to weight your own plan.',
};

export const experimentalDesignExtras: EventExtras = {
  eventId: 'experimental-design',
  labs: [feasibility, blocking, spread, fit, error, percent, timePlan],
  lessons: {
    'exp-u1-l1': {
      labs: ['exp-feasibility'],
      sort: sort(
        'Testable in a 20-minute experiment, or not?',
        ['Testable question', 'Not testable as stated'],
        [
          ['How does ramp height affect the distance a marble rolls?', 0],
          ['Which colour is the most beautiful?', 1],
          ['Does string length change a pendulum’s period?', 0],
          ['Why do people like music?', 1],
          ['How does the number of folds affect a paper strip’s strength?', 0],
          ['Is science more important than art?', 1],
        ],
      ),
      checks: [
        check(
          0,
          'What makes an investigation an experiment rather than an observation?',
          [
            'One variable is deliberately changed and its effect is compared',
            'It uses expensive equipment',
            'It produces a graph',
            'It is written in the past tense',
          ],
          'An experiment is a controlled comparison: you change the independent variable on purpose while holding others constant.',
        ),
      ],
    },
    'exp-u2-l1': {
      labs: ['exp-blocking'],
      phet: [
        phet(
          'pendulum-lab',
          'Pendulum Lab',
          'A ready-made system with several candidate variables. Practise changing exactly one while holding the others constant.',
          'Choose length as the independent variable. Record the period for three lengths with mass and release angle fixed.',
          'Now hold length fixed and change the mass. Does the period respond? State what this means for your list of controlled variables.',
          'Write a hypothesis for the effect of release angle, test it at three small angles, and decide whether the data support it.',
        ),
      ],
      sort: sort(
        'Which kind of variable?',
        ['Independent', 'Dependent', 'Controlled'],
        [
          ['Ramp height, set to 10, 20, and 30 cm', 0],
          ['Distance the marble travels', 1],
          ['The same marble used every time', 2],
          ['The surface the marble rolls on', 2],
          ['Time for the marble to stop', 1],
          ['Number of books under the ramp', 0],
        ],
      ),
      checks: [
        check(
          1,
          'Which hypothesis is the strongest?',
          [
            'If ramp height increases, the marble rolls farther, because it starts with more gravitational potential energy',
            'The marble will roll',
            'Ramps are interesting',
            'Height might or might not matter',
          ],
          'A good hypothesis states the direction of the relationship between the independent and dependent variables and gives a reason that can be tested.',
        ),
      ],
    },
    'exp-u3-l1': {
      phet: [
        phet(
          'masses-and-springs-basics',
          'Masses and Springs: Basics',
          'Use a simple apparatus to practise writing a procedure someone else could follow exactly — including how each measurement is taken.',
          'Hang three known masses in turn and record the spring’s stretch with the ruler. Write each step as a numbered instruction.',
          'List every material with its specification (which spring, which masses, ruler resolution).',
          'Hand your procedure to a partner, or reread it tomorrow. Which step was ambiguous? Rewrite it.',
        ),
      ],
      sort: sort(
        'Qualitative or quantitative?',
        ['Qualitative observation', 'Quantitative measurement'],
        [
          ['The solution turned cloudy', 0],
          ['The mass was 12.4 g', 1],
          ['The spring oscillated smoothly', 0],
          ['Twelve oscillations in 10.0 s', 1],
          ['A faint sulfur smell was noticed', 0],
          ['The temperature rose by 3.5 °C', 1],
        ],
      ),
      checks: [
        check(
          1,
          'Which procedure step is written reproducibly?',
          [
            'Release the marble from rest at the 20.0 cm mark and measure where its centre stops, to the nearest 0.1 cm',
            'Let the marble go and see how far it gets',
            'Roll it down the ramp a few times',
            'Measure the distance carefully',
          ],
          'A reproducible step states the starting condition, what is measured, the reference point, and the precision.',
        ),
      ],
    },
    'exp-u4-l1': {
      labs: ['exp-spread'],
      phet: [
        phet(
          'center-and-variability',
          'Center and Variability',
          'Kick soccer balls and watch a data set build. See how the mean, median, and spread respond as values are added.',
          'On the Median screen, kick five balls and predict the median before revealing it.',
          'On the Mean & Median screen, drag one ball far to the right. Which measure moves more?',
          'On the Variability screen, compare the range with the interquartile range for a data set with one outlier.',
        ),
        phet(
          'least-squares-regression',
          'Least-Squares Regression',
          'Residuals made visible: each one is drawn as a square whose area the best-fit line minimises.',
          'Place six points with a clear upward trend and fit your own line. Compare your sum of squares with the best-fit line’s.',
          'Add one point far from the trend. How do the slope and the correlation coefficient change?',
        ),
      ],
      sort: sort(
        'Which graph suits the data?',
        ['Scatter plot with trend line', 'Bar chart', 'Histogram'],
        [
          ['Stretch of a spring against hanging mass', 0],
          ['Mean bounce height for three ball types', 1],
          ['Distribution of 40 reaction times', 2],
          ['Temperature against time while cooling', 0],
          ['Average plant height under four light colours', 1],
          ['How often each range of measurement occurred', 2],
        ],
      ),
      checks: [
        check(
          4,
          'A balance repeatedly reads 5.12 g, 5.13 g, and 5.12 g for a 5.00 g standard. The measurements are…',
          [
            'Precise but not accurate',
            'Accurate but not precise',
            'Both accurate and precise',
            'Neither accurate nor precise',
          ],
          'The readings agree closely with each other (precise) but are consistently about 0.12 g too high (inaccurate) — a systematic error.',
        ),
      ],
    },
    'exp-u5-l1': {
      labs: ['exp-fit'],
      phet: [
        phet(
          'curve-fitting',
          'Curve Fitting',
          'Not every relationship is a straight line. Compare how well linear and curved models describe the same points.',
          'Place eight points that curve upward. Fit a linear model, then a quadratic. Which has the smaller chi-squared?',
          'Add error bars of different sizes. How does the fit treat a point with a large uncertainty?',
          'Decide when a more complicated model is justified by the data and when it is just chasing noise.',
        ),
      ],
      sort: sort(
        'Claim, evidence, or reasoning?',
        ['Claim', 'Evidence', 'Reasoning'],
        [
          ['Increasing ramp height increases roll distance', 0],
          ['Mean distance rose from 42 cm to 88 cm as height went from 10 cm to 30 cm', 1],
          ['A higher start gives more potential energy to convert to motion', 2],
          ['The trend line has a slope of 2.3 cm per cm', 1],
          ['Trial 3 at 20 cm is an outlier', 0],
          ['It lies more than three standard deviations from that level’s mean', 1],
        ],
      ),
      checks: [
        check(
          3,
          'One trial is far from the others at its level. The best way to handle it in the report is to…',
          [
            'Report it, analyse the data with and without it, and suggest a cause',
            'Delete it without comment',
            'Change it to match the other trials',
            'Ignore the rest of the data instead',
          ],
          'Transparency earns credit. Showing the effect of the point and proposing a plausible cause is evidence of careful reasoning.',
        ),
      ],
    },
    'exp-u6-l1': {
      labs: ['exp-error'],
      phet: [
        phet(
          'projectile-data-lab',
          'Projectile Data Lab',
          'Launch the same projectile repeatedly and collect real-looking scatter. Separate what varies at random from what is consistently off.',
          'Fire 20 launches with one launcher and record the mean and spread of the landing distance.',
          'Switch to a different launcher with the same settings. Is the difference in means larger than the spread within each?',
          'Identify one source of random variation and one possible systematic difference between launchers.',
        ),
      ],
      sort: sort(
        'Random or systematic error?',
        ['Random error', 'Systematic error'],
        [
          ['Reaction-time variation when starting a stopwatch', 0],
          ['A ruler whose zero end is worn off', 1],
          ['Slight air currents on different trials', 0],
          ['A balance that was never zeroed', 1],
          ['Reading a meniscus slightly differently each time', 0],
          ['Always measuring from the wrong reference mark', 1],
        ],
      ),
      checks: [
        check(
          1,
          'A thermometer reads 2 °C too high on every measurement. In the report, this should be described as…',
          [
            'A systematic error that shifts all results upward by about 2 °C',
            'A random error that averages out',
            'Human error',
            'Not worth mentioning',
          ],
          'Name the source, state its direction, and estimate its size. “Human error” says nothing a reader can use.',
        ),
      ],
    },
    'exp-u7-l1': {
      labs: ['exp-percent'],
      sort: sort(
        'Count the significant figures in each measurement',
        ['Two', 'Three', 'Four'],
        [
          ['0.050 m', 0],
          ['2.50 s', 1],
          ['1,200. g', 2],
          ['0.00340 kg', 1],
          ['45 cm', 0],
          ['10.05 mL', 2],
        ],
      ),
      checks: [
        check(
          0,
          'A standard of comparison (control) is included in an experiment to…',
          [
            'Provide a baseline against which the other levels are judged',
            'Increase the number of trials',
            'Make the graph look complete',
            'Replace the independent variable',
          ],
          'Without a reference condition you cannot say whether a treatment changed anything, only that conditions differed from each other.',
        ),
      ],
    },
    'exp-u8-l1': {
      labs: ['exp-time'],
      sort: sort(
        'Helps the team finish, or costs time?',
        ['Helps', 'Costs time'],
        [
          ['Agreeing variable names and units before starting', 0],
          ['Two people rewriting the same section', 1],
          ['One person building the data table while another sets up', 0],
          ['Changing the design after data collection has begun', 1],
          ['Checking the rubric headings at the half-way point', 0],
          ['Recording data on scrap paper to copy later', 1],
        ],
      ),
      checks: [
        check(
          0,
          'The most reliable way to finish every report section in time is to…',
          [
            'Plan backwards from the report, assigning minutes to each section first',
            'Start the experiment immediately and plan later',
            'Write the conclusion before collecting data',
            'Let each person work alone without a plan',
          ],
          'Knowing what the report requires tells you what data to collect and how long you can afford to spend collecting it.',
        ),
      ],
    },
  },
};
