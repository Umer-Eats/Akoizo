import { check, phet, sort, type EventExtras } from '../lesson-extras.ts';
import { goal, near, slider, type TopicLab } from '../topic-lab-kit.ts';

const fresh = (t: number) =>
  1000 * (1 - ((t + 288.9414) / (508929.2 * (t + 68.12963))) * (t - 3.9863) ** 2);
const density: TopicLab = {
  id: 'water-density',
  title: 'Temperature, salinity, and water density',
  lead: 'Density decides which water sinks and which floats. Fresh water has a density maximum; enough salt removes it.',
  controls: [
    slider('t', 'Temperature', 0, 30, 0.5, 20, '°C'),
    slider('s', 'Salinity', 0, 40, 0.5, 0, 'ppt'),
  ],
  run: (v) => {
    const rho = (t: number) => fresh(t) + 0.78 * v.s,
      tmax = 3.98 - 0.215 * v.s,
      freeze = -0.054 * v.s;
    return {
      o: { rho: rho(v.t), tmax, freeze },
      metrics: [
        { label: 'Density', value: Number(rho(v.t).toFixed(2)), unit: 'kg/m³' },
        { label: 'Temperature of maximum density', value: Number(tmax.toFixed(2)), unit: '°C' },
        { label: 'Freezing point', value: Number(freeze.toFixed(2)), unit: '°C' },
        {
          label: 'On cooling toward freezing, surface water',
          value:
            tmax > freeze
              ? 'Stops sinking below its density maximum — ice forms on top of stable water'
              : 'Keeps sinking until it freezes — deep convection',
        },
      ],
      plot: {
        title: 'Density against temperature',
        x: [0, 30, 'Temperature (°C)'],
        y: [995, 1035, 'Density (kg/m³)'],
        curves: [
          { f: rho, label: `salinity ${v.s}` },
          { f: fresh, label: 'fresh water', dash: true, tone: 'muted' },
        ],
        points: [{ x: v.t, y: rho(v.t), label: rho(v.t).toFixed(1) }],
      },
    };
  },
  missions: [
    goal(
      'Find the temperature at which fresh water is densest.',
      'It is a few degrees above freezing.',
      { t: 4 },
      (o, v) => v.s === 0 && v.t === 4,
    ),
    goal(
      'Find the lowest salinity at which the temperature of maximum density falls below the freezing point.',
      'Both drop as salt is added, but the density maximum drops faster. Look near 25 ppt.',
      { s: 25 },
      (o, v) => o.tmax < o.freeze && v.s <= 25.5,
    ),
    goal(
      'Make water denser than 1,027 kg/m³ — typical of the deep ocean.',
      'Cold and salty together.',
      { s: 35, t: 5 },
      (o) => o.rho > 1027,
    ),
  ],
  predict: {
    q: 'Ice forms at the top of a freshwater lake rather than at the bottom because…',
    options: [
      'Water is densest near 4 °C, so colder water and ice float',
      'The lake bottom is heated by the Earth',
      'Ice is denser than liquid water',
      'Wind pushes ice to the surface',
    ],
    correct: 0,
    why: 'Below about 4 °C water expands as it cools, so the coldest water stays at the surface, where it freezes and insulates the liquid beneath.',
  },
  model:
    'Fresh-water density from a standard polynomial fit; salinity adds about 0.78 kg/m³ per ppt; freezing point falls 0.054 °C per ppt and the temperature of maximum density 0.215 °C per ppt. A simplified equation of state at surface pressure — oceanographers use the full TEOS-10 formulation.',
};

const saturation = (t: number, s: number) =>
  (14.62 - 0.3898 * t + 0.006969 * t * t - 0.00005897 * t ** 3) * (1 - 0.0055 * s);
const oxygen: TopicLab = {
  id: 'water-do',
  title: 'Dissolved-oxygen saturation',
  lead: 'A concentration in mg/L means little without temperature and salinity. Convert a reading to percent saturation and see what the water could hold.',
  controls: [
    slider('t', 'Water temperature', 0, 35, 0.5, 20, '°C'),
    slider('s', 'Salinity', 0, 40, 1, 0, 'ppt'),
    slider('meas', 'Measured dissolved oxygen', 0, 16, 0.1, 7, 'mg/L'),
  ],
  run: (v) => {
    const sat = saturation(v.t, v.s),
      pct = (v.meas / sat) * 100;
    return {
      o: { sat, pct },
      metrics: [
        { label: 'Saturation concentration', value: sat, unit: 'mg/L' },
        { label: 'Percent saturation', value: pct, unit: '%' },
        {
          label: 'Reading',
          value:
            pct > 105
              ? 'Supersaturated — often daytime photosynthesis'
              : pct < 60
                ? 'Strongly undersaturated — oxygen is being consumed'
                : 'Near equilibrium with the air',
        },
      ],
      plot: {
        title: 'What the water can hold at 1 atm',
        x: [0, 35, 'Temperature (°C)'],
        y: [0, 16, 'Dissolved oxygen (mg/L)'],
        curves: [
          { f: (t) => saturation(t, v.s), label: `saturation at ${v.s} ppt` },
          { f: (t) => saturation(t, 0), label: 'fresh water', dash: true, tone: 'muted' },
        ],
        points: [{ x: v.t, y: v.meas, label: `${pct.toFixed(0)}% sat` }],
      },
    };
  },
  missions: [
    goal(
      'Find a fresh-water temperature at which saturation is about 8.0 mg/L.',
      'Warmer than room temperature: saturation falls roughly 0.2 mg/L per degree here.',
      { t: 27 },
      (o, v) => v.s === 0 && near(o.sat, 8, 0.08),
    ),
    goal(
      'Show a reading that is more than 120% saturated.',
      'Raise the measured value well above the curve, as an algal bloom does on a sunny afternoon.',
      { meas: 11.5 },
      (o) => o.pct > 120,
    ),
    goal(
      'Find warm, salty conditions in which even fully saturated water holds less than 6.5 mg/L.',
      'Both heat and salt reduce solubility.',
      { t: 30, s: 35 },
      (o) => o.sat < 6.5,
    ),
  ],
  predict: {
    q: 'As water warms, the amount of oxygen it can hold at saturation…',
    options: ['Decreases', 'Increases', 'Stays the same', 'Doubles every 10 °C'],
    correct: 0,
    why: 'Gas solubility falls with temperature. Warm water holds less oxygen just as organisms’ oxygen demand rises — a double stress.',
  },
  model:
    'Empirical cubic for oxygen solubility in fresh water at sea-level pressure, reduced by 0.55% per ppt of salinity. Altitude lowers saturation further in proportion to barometric pressure, which this lab does not include.',
};

const sag: TopicLab = {
  id: 'water-sag',
  title: 'Oxygen sag below a waste outfall',
  lead: 'Bacteria consume oxygen as they break down organic waste; the river takes oxygen back from the air. Follow a parcel of water downstream.',
  controls: [
    slider('load', 'Biochemical oxygen demand at the outfall', 5, 60, 1, 20, 'mg/L'),
    slider('kd', 'Deoxygenation rate', 0.1, 0.6, 0.05, 0.3, 'per day'),
    slider('ka', 'Reaeration rate', 0.2, 1.5, 0.05, 0.6, 'per day'),
    slider('t', 'Travel time downstream', 0, 15, 0.25, 0, 'days'),
  ],
  run: (v) => {
    const deficit = (t: number) =>
      Math.abs(v.ka - v.kd) < 1e-9
        ? (v.kd * v.load * t + 1) * Math.exp(-v.kd * t)
        : ((v.kd * v.load) / (v.ka - v.kd)) * (Math.exp(-v.kd * t) - Math.exp(-v.ka * t)) +
          Math.exp(-v.ka * t);
    const level = (t: number) => Math.max(0, 9 - deficit(t));
    let min = 9,
      tcrit = 0;
    for (let t = 0; t <= 15; t += 0.01) if (level(t) < min) [min, tcrit] = [level(t), t];
    return {
      o: { level: level(v.t), min, tcrit },
      metrics: [
        { label: 'Dissolved oxygen here', value: level(v.t), unit: 'mg/L' },
        { label: 'Lowest oxygen along the reach', value: min, unit: 'mg/L' },
        { label: 'Travel time to the lowest point', value: tcrit, unit: 'days' },
        {
          label: 'Waste demand still remaining here',
          value: v.load * Math.exp(-v.kd * v.t),
          unit: 'mg/L',
        },
      ],
      plot: {
        title: 'Dissolved oxygen downstream of the outfall',
        x: [0, 15, 'Travel time (days)'],
        y: [0, 10, 'Dissolved oxygen (mg/L)'],
        curves: [{ f: level }],
        hlines: [
          { y: 9, label: 'saturation' },
          { y: 5, label: 'stress for many fish' },
        ],
        points: [{ x: v.t, y: level(v.t), label: `${level(v.t).toFixed(2)} mg/L` }],
      },
    };
  },
  missions: [
    goal(
      'Travel downstream to the point where oxygen is lowest.',
      'Watch for where the curve bottoms out — about two days of travel with the starting settings.',
      { t: 2.25 },
      (o, v) => v.t > 0 && near(o.level, o.min, 0.02),
    ),
    goal(
      'Change the system so that oxygen never falls below 5 mg/L.',
      'Treat the waste (lower the load) or pick a more turbulent, faster-reaerating river.',
      { load: 14 },
      (o) => o.min > 5,
    ),
    goal(
      'Create a stretch of river with no dissolved oxygen at all.',
      'Overload the river so consumption outruns reaeration.',
      { load: 60 },
      (o) => o.min <= 0,
    ),
  ],
  predict: {
    q: 'Downstream of an untreated sewage outfall, dissolved oxygen is usually lowest…',
    options: [
      'Some distance downstream, then it recovers',
      'Exactly at the outfall',
      'Far downstream, where it keeps falling for ever',
      'Upstream of the outfall',
    ],
    correct: 0,
    why: 'Consumption is fastest while waste is abundant, but the deficit keeps growing until reaeration catches up; beyond that point the river recovers.',
  },
  model:
    'Streeter–Phelps model with saturation fixed at 9 mg/L and a 1 mg/L starting deficit. First-order decay of BOD and first-order reaeration in a well-mixed river with steady flow. Photosynthesis, sediment oxygen demand, and nitrification are omitted; negative values are clipped to zero.',
};

const logistic: TopicLab = {
  id: 'water-logistic',
  title: 'Logistic population growth',
  lead: 'A population cannot grow without limit in a finite habitat. Set its intrinsic rate and the carrying capacity, then run time forward.',
  controls: [
    slider('r', 'Intrinsic growth rate', 0.1, 2, 0.1, 0.5, 'per year'),
    slider('k', 'Carrying capacity', 100, 2000, 100, 1000, ''),
    slider('n0', 'Starting population', 10, 2000, 10, 50, ''),
    slider('t', 'Elapsed time', 0, 30, 0.5, 0, 'years'),
  ],
  run: (v) => {
    const size = (t: number) => v.k / (1 + ((v.k - v.n0) / v.n0) * Math.exp(-v.r * t)),
      n = size(v.t);
    return {
      o: { n, growth: v.r * n * (1 - n / v.k), percapita: v.r * (1 - n / v.k) },
      metrics: [
        { label: 'Population now', value: n },
        { label: 'Population growth rate', value: v.r * n * (1 - n / v.k), unit: 'per year' },
        { label: 'Per-capita growth rate', value: v.r * (1 - n / v.k), unit: 'per year' },
        { label: 'Share of carrying capacity used', value: (n / v.k) * 100, unit: '%' },
      ],
      plot: {
        title: 'N(t) = K / (1 + ((K − N₀)/N₀) e^(−rt))',
        x: [0, 30, 'Time (years)'],
        y: [0, 2000, 'Population'],
        curves: [{ f: size }],
        hlines: [{ y: v.k, label: 'carrying capacity' }],
        points: [{ x: v.t, y: n, label: `${Math.round(n)}` }],
      },
    };
  },
  missions: [
    goal(
      'Find the moment at which the population is growing fastest.',
      'Total growth rate peaks when the population is half the carrying capacity.',
      { t: 6 },
      (o, v) => v.t > 0 && near(o.n, v.k / 2, 30),
    ),
    goal(
      'Start the population above its carrying capacity and watch what happens.',
      'With N greater than K the growth rate is negative.',
      { n0: 2000, t: 5 },
      (o, v) => v.n0 > v.k && v.t > 0 && o.growth < 0,
    ),
    goal(
      'Double the intrinsic rate to 1.0 and reach 90% of carrying capacity within 6 years.',
      'A higher r changes how fast K is approached, not K itself.',
      { r: 1, t: 5.5 },
      (o, v) => v.r === 1 && v.t <= 6 && o.n >= 0.9 * v.k,
    ),
  ],
  predict: {
    q: 'In logistic growth, the per-capita growth rate is highest when the population is…',
    options: [
      'Very small',
      'At half the carrying capacity',
      'At the carrying capacity',
      'Above the carrying capacity',
    ],
    correct: 0,
    why: 'Per-capita rate is r(1 − N/K), which is largest when N is near zero. The population’s total growth, rN(1 − N/K), is what peaks at K/2.',
  },
  model:
    'Continuous logistic equation dN/dt = rN(1 − N/K) with constant r and K. No time lags, age structure, predation, or random variation — real aquatic populations often overshoot and oscillate.',
};

const acidification: TopicLab = {
  id: 'water-acidification',
  title: 'Ocean acidification and reef-building',
  lead: 'Seawater absorbs CO₂ and becomes less alkaline. Lower carbonate availability makes it harder for corals and shellfish to build skeletons.',
  controls: [slider('pco2', 'Atmospheric CO₂', 280, 1200, 10, 420, 'ppm')],
  run: (v) => {
    const ph = (p: number) => 8.18 - 0.75 * Math.log10(p / 280),
      omega = 4 * (280 / v.pco2) ** 0.6,
      rise = (10 ** (8.18 - ph(v.pco2)) - 1) * 100;
    return {
      o: { ph: ph(v.pco2), omega, rise },
      metrics: [
        { label: 'Surface-ocean pH', value: Number(ph(v.pco2).toFixed(3)) },
        { label: 'Rise in hydrogen-ion concentration since 280 ppm', value: rise, unit: '%' },
        { label: 'Aragonite saturation state Ω', value: omega },
        {
          label: 'Outlook for tropical reef accretion',
          value:
            omega > 3.5
              ? 'Favourable'
              : omega > 3
                ? 'Adequate'
                : omega > 2.5
                  ? 'Marginal'
                  : 'Poor — erosion can exceed growth',
        },
      ],
      plot: {
        title: 'Surface pH falls as CO₂ rises',
        x: [280, 1200, 'Atmospheric CO₂ (ppm)'],
        y: [7.6, 8.3, 'pH'],
        curves: [{ f: ph }],
        points: [{ x: v.pco2, y: ph(v.pco2), label: `pH ${ph(v.pco2).toFixed(2)}` }],
      },
      bars: {
        title: 'Aragonite saturation state',
        max: 4,
        items: [
          { label: 'Pre-industrial (280 ppm)', value: 4, tone: 'muted' },
          { label: `At ${v.pco2} ppm`, value: omega, tone: omega > 3 ? 'green' : 'warm' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Find the CO₂ level at which the ocean’s hydrogen-ion concentration is 50% above pre-industrial.',
      'A 50% rise in [H⁺] is a pH drop of log₁₀(1.5) ≈ 0.18.',
      { pco2: 480 },
      (o) => near(o.rise, 50, 1.5),
    ),
    goal(
      'Raise CO₂ until the aragonite saturation state falls below 2.5.',
      'That takes a little more than a doubling of pre-industrial CO₂.',
      { pco2: 620 },
      (o) => o.omega < 2.5,
    ),
    goal(
      'Return to the pre-industrial atmosphere and read the baseline values.',
      'Set CO₂ to 280 ppm.',
      { pco2: 280 },
      (o, v) => v.pco2 === 280,
    ),
  ],
  predict: {
    q: 'Average surface-ocean pH has fallen from about 8.2 to 8.1. The hydrogen-ion concentration has risen by roughly…',
    options: ['26%', '1%', '10%', '100%'],
    correct: 0,
    why: 'pH is logarithmic: a drop of 0.1 multiplies [H⁺] by 10^0.1 ≈ 1.26.',
  },
  model:
    'Illustrative fits for warm surface seawater in equilibrium with the atmosphere: pH = 8.18 − 0.75 log₁₀(pCO₂/280) and Ω_aragonite = 4.0 (280/pCO₂)^0.6. Real carbonate chemistry depends on temperature, alkalinity, and local processes; these curves show direction and approximate size only.',
};

const bleaching: TopicLab = {
  id: 'water-bleaching',
  title: 'Degree heating weeks and coral bleaching risk',
  lead: 'Bleaching depends on how hot and for how long. Degree heating weeks add up the heat stress the way reef-monitoring programmes do.',
  controls: [
    slider('hot', 'Temperature above the usual summer maximum', 0, 3, 0.1, 0.5, '°C'),
    slider('weeks', 'Weeks at that temperature (12-week window)', 0, 12, 1, 4, ''),
  ],
  run: (v) => {
    const dhw = v.hot >= 1 ? v.hot * v.weeks : 0,
      level = dhw >= 8 ? 4 : dhw >= 4 ? 3 : v.hot >= 1 ? 2 : v.hot > 0 ? 1 : 0;
    return {
      o: { dhw, level },
      metrics: [
        { label: 'Degree heating weeks', value: dhw, unit: '°C-weeks' },
        {
          label: 'Alert status',
          value: [
            'No stress',
            'Watch',
            'Warning — possible bleaching',
            'Alert level 1 — significant bleaching likely',
            'Alert level 2 — severe bleaching and mortality likely',
          ][level],
        },
      ],
      bars: {
        title: 'Accumulated heat stress against the alert thresholds',
        max: 36,
        items: [
          { label: 'This event', value: dhw, tone: level >= 3 ? 'warm' : 'accent' },
          { label: 'Alert level 1 threshold', value: 4, tone: 'muted' },
          { label: 'Alert level 2 threshold', value: 8, tone: 'muted' },
        ],
      },
    };
  },
  missions: [
    goal(
      'With water exactly 1 °C above the summer maximum, find the fewest weeks that trigger Alert level 1.',
      'Each week at +1 °C adds one degree heating week.',
      { hot: 1, weeks: 4 },
      (o, v) => near(v.hot, 1, 1e-9) && o.level === 3 && v.weeks <= 4,
    ),
    goal(
      'Show that 12 weeks at 0.9 °C above the maximum accumulates no degree heating weeks.',
      'Only temperatures at least 1 °C above the maximum are counted.',
      { hot: 0.9, weeks: 12 },
      (o, v) => near(v.hot, 0.9, 1e-9) && v.weeks === 12,
    ),
    goal(
      'Reach Alert level 2 in four weeks or fewer.',
      'You need 8 °C-weeks: at least 2 °C of excess heat.',
      { hot: 2, weeks: 4 },
      (o, v) => o.level === 4 && v.weeks <= 4,
    ),
  ],
  predict: {
    q: 'A coral colony that has just bleached white is best described as…',
    options: [
      'Alive but has lost most of its symbiotic algae, and may recover if stress ends',
      'Dead, with only skeleton remaining',
      'Covered in white sediment',
      'Growing faster than normal',
    ],
    correct: 0,
    why: 'Bleaching is a stress response: the coral expels its zooxanthellae and loses their pigment and most of its food supply. Prolonged stress leads to starvation and death.',
  },
  model:
    'Degree heating weeks = Σ of weekly temperature excess over the maximum monthly mean, counting only excesses of at least 1 °C within a 12-week window; thresholds of 4 and 8 °C-weeks follow the widely used satellite alert scheme. Light, water flow, and coral species modify actual outcomes.',
};

const calibration: TopicLab = {
  id: 'water-calibration',
  title: 'Two-point calibration of a salinometer',
  lead: 'An uncalibrated meter can be wrong by a constant offset, by a scale factor, or both. Two standards are enough to correct a linear instrument.',
  controls: [
    slider('r0', 'Meter reading in the 0 ppt standard', -2, 2, 0.1, 0.6, 'ppt'),
    slider('r35', 'Meter reading in the 35 ppt standard', 30, 40, 0.1, 33.2, 'ppt'),
    slider('raw', 'Meter reading in the unknown sample', 0, 40, 0.1, 20, 'ppt'),
  ],
  run: (v) => {
    const slope = 35 / (v.r35 - v.r0),
      fix = (raw: number) => (raw - v.r0) * slope;
    return {
      o: { value: fix(v.raw), slope, error: v.raw - fix(v.raw) },
      metrics: [
        { label: 'Calibrated salinity of the sample', value: fix(v.raw), unit: 'ppt' },
        { label: 'Error if the raw reading were trusted', value: v.raw - fix(v.raw), unit: 'ppt' },
        { label: 'Offset (reading at true zero)', value: v.r0, unit: 'ppt' },
        { label: 'Gain correction', value: slope, unit: '×' },
      ],
      plot: {
        title: 'Calibration line through the two standards',
        x: [0, 40, 'Meter reading (ppt)'],
        y: [0, 40, 'True salinity (ppt)'],
        curves: [
          { f: fix, label: 'calibration' },
          { f: (x) => x, label: 'perfect meter', dash: true, tone: 'muted' },
        ],
        points: [
          { x: v.r35, y: 35, label: '35 ppt standard', tone: 'gold' },
          { x: v.raw, y: fix(v.raw), label: `sample ${fix(v.raw).toFixed(1)}` },
        ],
      },
    };
  },
  missions: [
    goal(
      'Set the standards so the meter needs no correction at all.',
      'A perfect meter reads 0 in the blank and 35 in the 35 ppt standard.',
      { r0: 0, r35: 35 },
      (o, v) => near(v.r0, 0, 1e-9) && near(v.r35, 35, 1e-9),
    ),
    goal(
      'Using the starting calibration, find the raw reading that corresponds to a true salinity of 30 ppt.',
      'Invert the calibration: raw = true ÷ gain + offset.',
      { raw: 28.5 },
      (o, v) => near(v.r0, 0.6, 1e-9) && near(v.r35, 33.2, 1e-9) && near(o.value, 30, 0.1),
    ),
    goal(
      'Create a meter with a pure offset error: it reads exactly 1.0 ppt high everywhere.',
      'Both standards must read 1.0 too high.',
      { r0: 1, r35: 36 },
      (o, v) => near(v.r0, 1, 1e-9) && near(v.r35, 36, 1e-9),
    ),
  ],
  predict: {
    q: 'Compared with a single-point check, a two-point calibration can also correct…',
    options: [
      'A slope (gain) error',
      'Random noise in each reading',
      'Operator transcription mistakes',
      'Nothing more than the offset',
    ],
    correct: 0,
    why: 'One standard fixes only where the line sits; two fix both its position and its tilt. Neither removes random scatter, which needs replicates.',
  },
  model:
    'Linear response assumed: true = (reading − offset) × 35 / (reading₃₅ − offset). Real conductivity cells are temperature-dependent and mildly non-linear, so standards should bracket the samples and be at the same temperature.',
};

const sampling: TopicLab = {
  id: 'water-sampling',
  title: 'How many samples are enough?',
  lead: 'Two sites differ in mean dissolved oxygen. Whether you can show it depends on natural variability and on how many samples you take at each.',
  controls: [
    slider('sd', 'Standard deviation between samples', 0.2, 3, 0.1, 1.2, 'mg/L'),
    slider('n', 'Samples per site', 2, 60, 1, 5, ''),
    slider('diff', 'True difference between the sites', 0.2, 3, 0.1, 1, 'mg/L'),
  ],
  run: (v) => {
    const half = (n: number) => (1.96 * v.sd) / Math.sqrt(n),
      clear = v.diff > 2 * half(v.n) ? 1 : 0;
    return {
      o: { se: v.sd / Math.sqrt(v.n), half: half(v.n), clear },
      metrics: [
        { label: 'Standard error of each mean', value: v.sd / Math.sqrt(v.n), unit: 'mg/L' },
        { label: '95% interval half-width', value: half(v.n), unit: 'mg/L' },
        {
          label: 'Do the two sites’ intervals separate?',
          value: clear ? 'Yes — the difference is clearly resolved' : 'No — the intervals overlap',
        },
      ],
      plot: {
        title: 'Uncertainty shrinks with the square root of n',
        x: [2, 60, 'Samples per site'],
        y: [0, 3, '95% half-width (mg/L)'],
        curves: [{ f: half }],
        hlines: [{ y: v.diff / 2, label: 'half the true difference' }],
        points: [{ x: v.n, y: half(v.n), label: `± ${half(v.n).toFixed(2)}` }],
      },
    };
  },
  missions: [
    goal(
      'Quadruple the sampling from 5 to 20 per site and read the new half-width.',
      'Compare it with the starting value of about 1.05 mg/L.',
      { n: 20 },
      (o, v) => v.n === 20 && near(v.sd, 1.2, 1e-9),
    ),
    goal(
      'Find the fewest samples per site that clearly resolve a 1.0 mg/L difference.',
      'You need the half-width below 0.5 mg/L.',
      { n: 23 },
      (o, v) => near(v.sd, 1.2, 1e-9) && near(v.diff, 1, 1e-9) && o.clear === 1 && v.n <= 23,
    ),
    goal(
      'Switch to a more precise method (standard deviation 0.5 mg/L) and resolve the same difference with five samples or fewer.',
      'Lower variability buys far more than extra samples.',
      { sd: 0.5, n: 4 },
      (o, v) => near(v.sd, 0.5, 1e-9) && near(v.diff, 1, 1e-9) && o.clear === 1 && v.n <= 5,
    ),
  ],
  predict: {
    q: 'To halve the standard error of a mean, the number of samples must be multiplied by…',
    options: ['Four', 'Two', 'Eight', 'One half'],
    correct: 0,
    why: 'Standard error = SD / √n. Halving it requires √n to double, so n must quadruple.',
  },
  model:
    'Independent, approximately normal samples with the same standard deviation at both sites; 95% half-width = 1.96 × SD / √n. Requiring non-overlapping intervals is a deliberately conservative criterion; a formal two-sample test would detect somewhat smaller differences.',
};

const plastic: TopicLab = {
  id: 'water-plastic',
  title: 'Plastic fragmentation',
  lead: 'Sunlight and waves break plastic into ever smaller pieces. The mass does not go away — but count and surface area climb steeply.',
  controls: [
    slider('d0', 'Starting size of the item', 10, 500, 10, 100, 'mm'),
    slider('g', 'Number of times every piece has split in two', 0, 40, 1, 0, ''),
  ],
  run: (v) => {
    const size = v.d0 / 2 ** (v.g / 3),
      area = 2 ** (v.g / 3);
    const kind =
      size >= 25
        ? 'Macroplastic'
        : size >= 5
          ? 'Mesoplastic'
          : size >= 0.001
            ? 'Microplastic (< 5 mm)'
            : 'Nanoplastic (< 1 µm)';
    return {
      o: { size, area, pieces: 2 ** v.g },
      metrics: [
        { label: 'Number of pieces', value: 2 ** v.g },
        { label: 'Typical piece size', value: size, unit: 'mm' },
        { label: 'Size class', value: kind },
        { label: 'Total surface area relative to the original', value: area, unit: '×' },
        { label: 'Total mass relative to the original', value: 1, unit: '×' },
      ],
      plot: {
        title: 'Piece size on a logarithmic scale',
        x: [0, 40, 'Halvings'],
        y: [-3, 3, 'log₁₀ (piece size / mm)'],
        curves: [{ f: (g) => Math.log10(v.d0) - (g / 3) * Math.log10(2) }],
        hlines: [{ y: Math.log10(5), label: '5 mm: microplastic' }],
        points: [{ x: v.g, y: Math.log10(size), label: `${size.toPrecision(2)} mm` }],
      },
    };
  },
  missions: [
    goal(
      'Break a 100 mm item down until its pieces first count as microplastics.',
      'Each halving of volume shrinks the size by the cube root of 2.',
      { g: 13 },
      (o, v) => v.d0 === 100 && o.size < 5 && v.g <= 13,
    ),
    goal(
      'Find the stage at which the total surface area is about ten times the original.',
      'Area grows as 2^(g/3).',
      { g: 10 },
      (o) => near(o.area, 10, 0.5),
    ),
    goal(
      'Produce more than a million pieces from one item.',
      '2²⁰ is just over a million.',
      { g: 20 },
      (o) => o.pieces > 1e6,
    ),
  ],
  predict: {
    q: 'As a plastic bottle fragments in the ocean, its total mass and its total surface area…',
    options: [
      'Mass stays the same; surface area increases',
      'Both decrease',
      'Mass decreases; surface area stays the same',
      'Both stay the same',
    ],
    correct: 0,
    why: 'Fragmentation is not degradation. The same polymer is spread over far more surface, which increases contact with water, organisms, and adsorbed pollutants.',
  },
  model:
    'Every piece splits into two equal, geometrically similar pieces at each step, so volume halves, linear size falls by 2^(1/3), and total area rises by 2^(1/3). Real fragmentation yields a broad size distribution, and some plastic sinks or is ingested along the way.',
};

const levels = [
  'Phytoplankton',
  'Zooplankton',
  'Forage fish',
  'Predatory fish',
  'Fish-eating bird',
];
const biomag: TopicLab = {
  id: 'water-biomag',
  title: 'Bioconcentration and biomagnification',
  lead: 'A persistent, fat-soluble compound is taken up from water and then passed up the food web. Follow its concentration from plankton to top predator.',
  controls: [
    slider('cw', 'Concentration in the water', 0.1, 10, 0.1, 1, 'ng/L'),
    slider('logbcf', 'Bioconcentration factor, log₁₀', 2, 6, 0.5, 4, ''),
    slider('bmf', 'Magnification per trophic step', 1, 10, 0.5, 5, '×'),
    slider('level', 'Trophic level examined', 1, 5, 1, 1, ''),
  ],
  run: (v) => {
    const tissue = (l: number) => (v.cw * 10 ** v.logbcf * v.bmf ** (l - 1)) / 1000;
    return {
      o: { tissue: tissue(v.level), factor: 10 ** v.logbcf * v.bmf ** (v.level - 1) },
      metrics: [
        { label: 'Organism examined', value: levels[v.level - 1] },
        { label: 'Tissue concentration', value: tissue(v.level), unit: 'µg/kg' },
        {
          label: 'Concentration relative to the water',
          value: 10 ** v.logbcf * v.bmf ** (v.level - 1),
          unit: '×',
        },
      ],
      bars: {
        title: 'log₁₀ of tissue concentration (ng/kg) by trophic level',
        max: 12,
        items: levels.map((name, i) => ({
          label: name,
          value: Math.log10(tissue(i + 1) * 1000),
          tone: i + 1 === v.level ? ('slot' as const) : ('accent' as const),
        })),
      },
    };
  },
  missions: [
    goal(
      'With the starting compound, find the first trophic level whose tissue is more than a million times the water concentration.',
      'Bioconcentration supplies 10⁴; each step up multiplies by 5.',
      { level: 4 },
      (o, v) => v.logbcf === 4 && v.bmf === 5 && o.factor > 1e6 && v.level <= 4,
    ),
    goal(
      'Show a compound that bioconcentrates but does not biomagnify: the top predator matches the plankton.',
      'Set the per-step magnification to 1.',
      { bmf: 1, level: 5 },
      (o, v) => v.bmf === 1 && v.level === 5,
    ),
    goal(
      'Find a top-predator tissue concentration above 1,000 µg/kg (1 part per million).',
      'Examine the fish-eating bird.',
      { level: 5 },
      (o, v) => v.level === 5 && o.tissue > 1000,
    ),
  ],
  predict: {
    q: 'A persistent, fat-soluble pollutant is usually found at its highest tissue concentration in…',
    options: ['Top predators', 'Phytoplankton', 'The water itself', 'Herbivorous zooplankton'],
    correct: 0,
    why: 'Each consumer eats many times its own mass over its life and stores the compound in fat faster than it can excrete it, so concentration rises at every step.',
  },
  model:
    'Tissue concentration = water concentration × BCF × BMF^(level − 1), with constant factors. Real factors depend on the compound’s lipid solubility and metabolism, the organism’s fat content, growth, and age; water-soluble or readily metabolised compounds do not magnify.',
};

export const waterQualityExtras: EventExtras = {
  eventId: 'water-quality',
  labs: [
    density,
    oxygen,
    sag,
    logistic,
    acidification,
    bleaching,
    calibration,
    sampling,
    plastic,
    biomag,
  ],
  lessons: {
    'water-u1-l1': {
      labs: ['water-density'],
      phet: [
        phet(
          'density',
          'Density',
          'Density is mass per volume — a property of the material, not of the object’s size. Float and sink blocks before applying the idea to layered water.',
          'On the Intro screen, compare two blocks of the same material but different size. Do their densities differ?',
          'On the Compare screen, set blocks to the same mass. Which float, and how does that relate to their volumes?',
          'Find the density of a mystery block by measuring its mass and the volume of water it displaces.',
        ),
      ],
      sort: sort(
        'Which property of water explains it?',
        ['Hydrogen bonding and cohesion', 'High specific heat', 'Solvent ability (polarity)'],
        [
          ['Water striders walk on the surface', 0],
          ['Coastal climates have mild temperature swings', 1],
          ['Salts and nutrients are carried in solution', 2],
          ['Large lakes warm slowly in spring', 1],
          ['Water rises in narrow soil pores', 0],
          ['Ionic compounds dissociate in rivers', 2],
        ],
      ),
      checks: [
        check(
          3,
          'In the nitrogen cycle, bacteria convert ammonium to nitrate. This step is called…',
          ['Nitrification', 'Denitrification', 'Nitrogen fixation', 'Ammonification'],
          'Nitrification needs oxygen and produces nitrate, the form most readily taken up by algae. Denitrification returns nitrate to N₂ gas in low-oxygen settings.',
        ),
      ],
    },
    'water-u2-l1': {
      labs: ['water-do'],
      phet: [
        phet(
          'beers-law-lab',
          'Beer’s Law Lab',
          'Nutrient test kits and colorimeters work by measuring how much light a coloured solution absorbs. Build the calibration idea yourself.',
          'On the Beer’s Law screen, double the concentration at a fixed path length. What happens to the absorbance?',
          'Double the path length at a fixed concentration. Compare the result with the previous step.',
          'Change the wavelength of the light. Why do test kits specify which wavelength (or colour filter) to use?',
        ),
      ],
      sort: sort(
        'Chemical, physical, or biological measure?',
        ['Chemical', 'Physical', 'Biological'],
        [
          ['Dissolved oxygen', 0],
          ['Turbidity', 1],
          ['Macroinvertebrate index', 2],
          ['Nitrate concentration', 0],
          ['Temperature', 1],
          ['Fecal coliform count', 2],
        ],
      ),
      checks: [
        check(
          2,
          'A water sample’s dissolved oxygen falls from 9.0 to 3.0 mg/L over a five-day incubation in the dark. Its BOD₅ is…',
          ['6.0 mg/L', '3.0 mg/L', '12.0 mg/L', '9.0 mg/L'],
          'BOD₅ is the oxygen consumed by microbes in five days: initial minus final dissolved oxygen (for an undiluted sample).',
        ),
      ],
    },
    'water-u3-l1': {
      labs: ['water-sag'],
      sort: sort(
        'Which wastewater treatment stage?',
        ['Primary', 'Secondary', 'Tertiary / disinfection'],
        [
          ['Screens and settling tanks remove solids', 0],
          ['Aerated microbes consume dissolved organic matter', 1],
          ['Nutrient removal and chlorine or UV treatment', 2],
          ['Activated sludge', 1],
          ['Grit chamber', 0],
          ['Phosphorus precipitation', 2],
        ],
      ),
      checks: [
        check(
          3,
          'The usual sequence of cultural eutrophication is…',
          [
            'Nutrient input → algal bloom → decomposition → oxygen depletion',
            'Oxygen depletion → nutrient input → algal bloom',
            'Algal bloom → nutrient input → clearer water',
            'Decomposition → nutrient loss → more oxygen',
          ],
          'Extra nitrogen and phosphorus fuel algal growth; when the algae die, bacterial decomposition consumes oxygen and can create dead zones.',
        ),
      ],
    },
    'water-u4-l1': {
      labs: ['water-logistic'],
      sort: sort(
        'Which trophic level?',
        ['Producer', 'Primary consumer', 'Secondary or higher consumer', 'Decomposer'],
        [
          ['Phytoplankton', 0],
          ['Zooplankton grazing on algae', 1],
          ['Largemouth bass', 2],
          ['Bacteria breaking down detritus', 3],
          ['Submerged aquatic plants', 0],
          ['Mayfly nymph scraping algae from rocks', 1],
        ],
      ),
      checks: [
        check(
          1,
          'Roughly what fraction of the energy at one trophic level is passed to the next?',
          ['About 10%', 'About 50%', 'About 90%', 'All of it'],
          'Most energy is lost as heat through respiration or is never consumed, which is why food chains are short and top predators are scarce.',
        ),
      ],
    },
    'water-u5-l1': {
      labs: ['water-acidification'],
      phet: [
        phet(
          'ph-scale',
          'pH Scale',
          'Ocean acidification is a small-looking shift on a logarithmic scale. Use everyday liquids to see what a change of one pH unit — or one tenth — means.',
          'On the Macro screen, measure the pH of several liquids and order them from most acidic to most basic.',
          'On the Micro screen, compare the H₃O⁺ concentrations of two liquids one pH unit apart. What is the ratio?',
          'Dilute an acid with water. Does its pH move toward 7 linearly with the volume added?',
        ),
      ],
      sort: sort(
        'Which marine or coastal habitat?',
        ['Estuary', 'Coral reef', 'Open ocean'],
        [
          ['Salinity changes with every tide', 0],
          ['Built by colonial animals with symbiotic algae', 1],
          ['Low nutrients and deep, clear water far from land', 2],
          ['Nursery habitat with salt marsh or mangroves', 0],
          ['Needs warm, clear, shallow water', 1],
          ['Productivity limited mainly by nutrients in the sunlit layer', 2],
        ],
      ),
      checks: [
        check(
          1,
          'In a salt-wedge estuary, the densest water is found…',
          [
            'Along the bottom, intruding from the sea',
            'At the surface, flowing seaward',
            'Evenly mixed throughout',
            'Only at the river’s source',
          ],
          'Salt water is denser than river water, so it slides landward beneath the outgoing fresh layer, creating strong vertical stratification.',
        ),
      ],
    },
    'water-u6-l1': {
      labs: ['water-bleaching'],
      sort: sort(
        'Sensitive or tolerant indicator?',
        ['Sensitive to pollution', 'Tolerant of pollution'],
        [
          ['Stonefly nymphs', 0],
          ['Sludge worms (tubificids)', 1],
          ['Mayfly nymphs', 0],
          ['Midge larvae with red haemoglobin', 1],
          ['Caddisfly larvae', 0],
          ['Leeches', 1],
        ],
      ),
      checks: [
        check(
          1,
          'Reef-building corals get most of their energy from…',
          [
            'Photosynthesis by symbiotic zooxanthellae in their tissues',
            'Filtering sediment from the water',
            'Absorbing calcium carbonate',
            'Preying on fish',
          ],
          'The algae supply sugars to the coral and receive shelter and nutrients — which is why reefs need clear, sunlit water and why losing the algae is so damaging.',
        ),
      ],
    },
    'water-u7-l1': {
      labs: ['water-calibration'],
      phet: [
        phet(
          'concentration',
          'Concentration',
          'Mixture calculations are bookkeeping for solute and solvent. Add, dilute, and evaporate while the meter reports concentration.',
          'Add solute to water until the solution saturates. What happens to the concentration if you keep adding?',
          'Dilute a solution to half its concentration. How much water did you need to add relative to the starting volume?',
          'Evaporate water from a dilute solution. Which quantity stays constant — the amount of solute or the concentration?',
        ),
      ],
      sort: sort(
        'Which method measures salinity this way?',
        ['Conductivity meter', 'Hydrometer', 'Refractometer'],
        [
          ['Dissolved ions carry electric current', 0],
          ['A float sits higher in denser water', 1],
          ['Light bends more in saltier water', 2],
          ['Needs temperature compensation for ion mobility', 0],
          ['Reads specific gravity directly', 1],
          ['Needs only a drop of sample on a prism', 2],
        ],
      ),
      checks: [
        check(
          5,
          '1.0 L of 35 ppt seawater is mixed with 1.0 L of fresh water (0 ppt). The mixture’s salinity is about…',
          ['17.5 ppt', '35 ppt', '70 ppt', '8.75 ppt'],
          'Salt is conserved while the volume doubles: (35 × 1 + 0 × 1) / 2 = 17.5 ppt.',
        ),
      ],
    },
    'water-u8-l1': {
      labs: ['water-sampling'],
      sort: sort(
        'Good monitoring practice or a flaw?',
        ['Sound practice', 'Design flaw'],
        [
          ['Sampling upstream and downstream of a suspected source', 0],
          ['Collecting every sample at a different time of day without recording it', 1],
          ['Calibrating meters before each field day', 0],
          ['Taking one sample and reporting it to four decimal places', 1],
          ['Including field blanks and duplicates', 0],
          ['Changing the method halfway through without overlap', 1],
        ],
      ),
      checks: [
        check(
          2,
          'A probe reads 8.0 mg/L in a standard known to contain 7.5 mg/L. Its readings are…',
          [
            'Biased high by about 0.5 mg/L',
            'Imprecise but accurate',
            'Exactly right',
            'Biased low by about 0.5 mg/L',
          ],
          'A consistent difference from a known value is a systematic error (bias). Precision would be judged from the scatter of repeated readings.',
        ),
      ],
    },
    'water-u9-l1': {
      labs: ['water-plastic', 'water-biomag'],
      sort: sort(
        'Where is this contaminant likely to end up?',
        ['Stays dissolved in water', 'Binds to sediment and fat', 'Floats at the surface'],
        [
          ['Nitrate from fertiliser', 0],
          ['PCBs (persistent, fat-soluble)', 1],
          ['Polyethylene fragments', 2],
          ['Many pharmaceutical residues', 0],
          ['DDT and its breakdown products', 1],
          ['Expanded polystyrene foam', 2],
        ],
      ),
      checks: [
        check(
          3,
          'The large “garbage patches” in the oceans are found where they are because…',
          [
            'Circulating gyres converge and trap floating debris',
            'Most plastic is dumped there by ships',
            'Plastic is manufactured at sea',
            'Cold water attracts plastic',
          ],
          'Wind-driven surface currents form five subtropical gyres whose slow inward flow collects buoyant material — mostly small fragments, not a solid island.',
        ),
      ],
    },
  },
};
