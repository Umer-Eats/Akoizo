import { check, phet, sort, type EventExtras } from '../lesson-extras.ts';
import {
  arrow,
  choice,
  circle,
  ellipse,
  goal,
  line,
  near,
  path,
  rect,
  slider,
  text,
  toggle,
  trace,
  type TopicLab,
} from '../topic-lab-kit.ts';

const budget: TopicLab = {
  id: 'dyn-budget',
  title: 'Watershed water budget',
  lead: 'Rain in, evapotranspiration and streamflow out. Whatever does not balance must be a change in storage.',
  controls: [
    slider('p', 'Precipitation', 200, 3000, 50, 1000, 'mm/yr'),
    slider('et', 'Evapotranspiration', 100, 2000, 50, 600, 'mm/yr'),
    slider('q', 'Streamflow out', 0, 2000, 50, 300, 'mm/yr'),
    slider('store', 'Water held in storage', 100, 20000, 100, 2000, 'mm'),
  ],
  run: (v) => {
    const ds = v.p - v.et - v.q,
      residence = v.store / (v.et + v.q);
    return {
      o: { ds, residence, ratio: v.q / v.p },
      metrics: [
        { label: 'Change in storage ΔS', value: ds, unit: 'mm/yr' },
        { label: 'Runoff ratio Q / P', value: v.q / v.p },
        { label: 'Mean residence time in storage', value: residence, unit: 'yr' },
        {
          label: 'Status',
          value:
            ds === 0
              ? 'Balanced year'
              : ds > 0
                ? 'Storage is filling'
                : 'Storage is being drawn down',
        },
      ],
      bars: {
        title: 'Annual fluxes (mm)',
        max: 3000,
        items: [
          { label: 'Precipitation in', value: v.p, tone: 'cool' },
          { label: 'Evapotranspiration out', value: v.et, tone: 'warm' },
          { label: 'Streamflow out', value: v.q, tone: 'accent' },
          { label: 'Storage change', value: ds, tone: ds >= 0 ? 'green' : 'slot' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Adjust only the streamflow until the year’s budget balances exactly.',
      'ΔS = P − ET − Q must be zero.',
      { q: 400 },
      (o, v) => v.p === 1000 && v.et === 600 && o.ds === 0,
    ),
    goal(
      'Create a drought year in which storage falls by more than 200 mm.',
      'Cut precipitation while the losses continue.',
      { p: 500 },
      (o) => o.ds < -200,
    ),
    goal(
      'Give the watershed a mean residence time of at least 10 years.',
      'Residence time = storage ÷ total outflow.',
      { store: 9000 },
      (o) => o.residence >= 10,
    ),
  ],
  predict: {
    q: 'A lake stores 500 km³ and loses 50 km³ each year to outflow and evaporation at steady state. The mean residence time of its water is…',
    options: ['10 years', '50 years', '450 years', '0.1 year'],
    correct: 0,
    why: 'Residence time = volume ÷ throughput = 500 ÷ 50 = 10 years. It is an average: individual molecules stay shorter or longer.',
  },
  model:
    'Annual mass balance for a closed basin, ΔS = P − ET − Q, as depths over the basin area. Residence time is storage divided by total outflow, which assumes a well-mixed store near steady state. Groundwater exchange across the divide is ignored.',
};

const orographic: TopicLab = {
  id: 'dyn-orographic',
  title: 'Orographic lifting and the rain shadow',
  lead: 'Moist air is forced over a range. It cools as it rises, drops its water on the windward slope, and arrives on the lee side warmer and drier.',
  controls: [
    slider('t', 'Sea-level air temperature (windward)', 10, 30, 1, 20, '°C'),
    slider('td', 'Dew point of the incoming air', 0, 25, 1, 12, '°C'),
    slider('h', 'Summit height', 500, 4000, 100, 2500, 'm'),
  ],
  run: (v) => {
    const td = Math.min(v.td, v.t),
      lcl = 125 * (v.t - td),
      cloud = v.h > lcl ? 1 : 0;
    const summit = cloud
        ? v.t - (9.8 * lcl) / 1000 - (6 * (v.h - lcl)) / 1000
        : v.t - (9.8 * v.h) / 1000,
      lee = summit + (9.8 * v.h) / 1000,
      top = 280 - v.h * 0.055,
      base = 280 - lcl * 0.055;
    return {
      o: { lcl, summit, lee, warming: lee - v.t, cloud },
      metrics: [
        { label: 'Cloud base (lifting condensation level)', value: lcl, unit: 'm' },
        { label: 'Temperature at the summit', value: summit, unit: '°C' },
        { label: 'Lee-side temperature back at sea level', value: lee, unit: '°C' },
        { label: 'Net warming across the range', value: lee - v.t, unit: 'K' },
      ],
      sceneLabel: `Mountain ${v.h} metres high; cloud base at ${Math.round(lcl)} metres; windward ${v.t} degrees, lee side ${lee.toFixed(1)} degrees`,
      scene: [
        line(30, 280, 610, 280, 'muted', 2),
        path(`M110 280L320 ${top}L530 280Z`, 'muted', true, 1, 0.45),
        ...(cloud
          ? [
              ellipse(
                250 - (280 - base) * 0.2,
                (top + base) / 2,
                70,
                Math.max(10, (base - top) / 2),
                'cool',
                true,
                0.35,
              ),
              ...[0, 1, 2, 3].map((i) =>
                line(200 + i * 22, base - 6, 194 + i * 22, base + 16, 'cool', 1.5),
              ),
              line(60, base, 300, base, 'cool', 1, true),
              text(60, base - 6, `cloud base ${Math.round(lcl)} m`, 'start', 'cool', 11),
            ]
          : [text(190, 150, 'no condensation: air stays unsaturated', 'middle', 'muted', 11)]),
        ...arrow(60, 250, 130, 250, 'slot', 2.5),
        ...arrow(510, 250, 580, 250, 'warm', 2.5),
        text(70, 304, `windward ${v.t} °C`, 'start'),
        text(570, 304, `lee ${lee.toFixed(1)} °C`, 'end', 'warm'),
        text(320, top - 10, `summit ${summit.toFixed(1)} °C`, 'middle'),
      ],
    };
  },
  missions: [
    goal(
      'Make the lee side at least 10 K warmer than the windward side.',
      'The warming comes from the height climbed inside cloud: use the tallest range.',
      { h: 4000 },
      (o) => o.warming >= 10,
    ),
    goal(
      'Find a range too low to form any cloud, and compare the two sides.',
      'Keep the summit below the cloud base.',
      { h: 500 },
      (o) => o.cloud === 0,
    ),
    goal(
      'With 20 °C air at sea level, find a summit height that is below freezing.',
      'Cooling slows to about 6 K per km once cloud forms.',
      { h: 2800 },
      (o, v) => v.t === 20 && o.summit < 0,
    ),
  ],
  predict: {
    q: 'Air that has crossed a mountain range arrives on the lee side warmer than it started mainly because…',
    options: [
      'Condensation released latent heat on the way up, and the water then fell out',
      'It is closer to the Sun at the summit',
      'Friction with the mountain heats it',
      'The lee side always receives more sunlight',
    ],
    correct: 0,
    why: 'Rising saturated air cools at the smaller moist rate; with its moisture rained out it descends at the full dry rate, gaining more than it lost.',
  },
  model:
    'Dry adiabatic lapse rate 9.8 K/km below cloud base and on the entire descent; a constant moist rate of 6 K/km in cloud; cloud base at 125 m per kelvin of dew-point depression. All condensed water is assumed to fall out. Real moist rates vary with temperature.',
};

const strahler: TopicLab = {
  id: 'dyn-strahler',
  title: 'Stream-order bookkeeping',
  lead: 'In a well-developed network the number of streams falls by a nearly constant factor with each increase in order — Horton’s law of stream numbers.',
  controls: [
    slider('rb', 'Bifurcation ratio', 2, 5, 0.5, 3, ''),
    slider('k', 'Order of the trunk stream', 2, 7, 1, 4, ''),
  ],
  run: (v) => {
    const counts = Array.from({ length: v.k }, (_, i) => v.rb ** (v.k - 1 - i));
    return {
      o: { n1: counts[0], total: counts.reduce((a, b) => a + b, 0) },
      metrics: [
        { label: 'First-order (headwater) streams', value: Math.round(counts[0]) },
        { label: 'Stream segments in total', value: Math.round(counts.reduce((a, b) => a + b, 0)) },
        {
          label: 'Share of segments that are first order',
          value: (counts[0] / counts.reduce((a, b) => a + b, 0)) * 100,
          unit: '%',
        },
      ],
      bars: {
        title: 'Number of stream segments of each order',
        items: counts.map((n, i) => ({
          label: `Order ${i + 1}`,
          value: n,
          tone: i === v.k - 1 ? ('slot' as const) : ('accent' as const),
        })),
      },
    };
  },
  missions: [
    goal(
      'Build a fourth-order basin that has exactly 64 first-order streams.',
      'Each step down in order multiplies the count by the bifurcation ratio: Rb³ = 64.',
      { rb: 4 },
      (o, v) => v.k === 4 && near(o.n1, 64, 1e-6),
    ),
    goal(
      'Now get 64 first-order streams with a bifurcation ratio of only 2.',
      'You need more orders: 2⁶ = 64.',
      { rb: 2, k: 7 },
      (o, v) => v.rb === 2 && near(o.n1, 64, 1e-6),
    ),
    goal(
      'Build a network with more than 1,000 headwater streams.',
      'Combine a high ratio with a high trunk order.',
      { rb: 5, k: 6 },
      (o) => o.n1 > 1000,
    ),
  ],
  predict: {
    q: 'Under Strahler ordering, a second-order stream is joined by a first-order tributary. Below the junction the stream is…',
    options: ['Still second order', 'Third order', 'First order', 'Order 1.5'],
    correct: 0,
    why: 'Order increases only when two streams of the same order meet. A lower-order tributary does not change the order of the larger stream.',
  },
  model:
    'Horton’s law of stream numbers, N_u = R_b^(k − u), for an idealised network with a constant bifurcation ratio. Natural basins typically have R_b between 3 and 5 and deviate where geological structure controls the drainage.',
};

const erodeAt = (d: number) => (d >= 0.5 ? 20 * (d / 0.5) ** 0.45 : 20 * (0.5 / d) ** 0.35),
  settleAt = (d: number) => 7 * d ** 0.6;
const hx = (logd: number) => 80 + ((logd + 3) / 5) * 500,
  hy = (logv: number) => 290 - ((logv + 1) / 4) * 250;
const hjulstrom: TopicLab = {
  id: 'dyn-hjulstrom',
  title: 'Erosion, transport, or deposition?',
  lead: 'A Hjulström-style diagram: grain size on one axis, flow velocity on the other. Find which grains a given flow can pick up, carry, or must drop.',
  controls: [
    slider('logd', 'Grain size, log₁₀ (mm)', -3, 2, 0.1, -0.3, ''),
    slider('logv', 'Flow velocity, log₁₀ (cm/s)', -1, 3, 0.05, 1, ''),
  ],
  run: (v) => {
    const d = 10 ** v.logd,
      vel = 10 ** v.logv,
      regime = vel > erodeAt(d) ? 0 : vel > settleAt(d) ? 1 : 2;
    const grain =
      d < 0.004 ? 'clay' : d < 0.0625 ? 'silt' : d < 2 ? 'sand' : d < 64 ? 'gravel' : 'cobble';
    return {
      o: { regime, d, vel, erode: erodeAt(d), settle: settleAt(d) },
      metrics: [
        { label: 'Grain', value: `${d.toPrecision(2)} mm (${grain})` },
        { label: 'Flow velocity', value: vel, unit: 'cm/s' },
        {
          label: 'What the flow does to this grain',
          value: ['Erodes it from the bed', 'Transports it if already moving', 'Deposits it'][
            regime
          ],
        },
        { label: 'Velocity needed to erode this grain', value: erodeAt(d), unit: 'cm/s' },
      ],
      sceneLabel: `Hjulström diagram: ${grain} grain of ${d.toPrecision(2)} millimetres in a ${vel.toPrecision(3)} centimetre per second flow`,
      scene: [
        path('M80 40V290H580', 'muted', false, 1.5),
        trace((x) => [hx(x), hy(Math.log10(erodeAt(10 ** x)))], -3, 2, 'warm'),
        trace((x) => [hx(x), Math.min(290, hy(Math.log10(settleAt(10 ** x))))], -3, 2, 'cool'),
        text(330, 70, 'EROSION', 'middle', 'warm'),
        text(250, 190, 'TRANSPORT', 'middle', 'muted'),
        text(480, 270, 'DEPOSITION', 'middle', 'cool'),
        ...[-3, -2, -1, 0, 1, 2].map((x) => text(hx(x), 308, `${10 ** x}`, 'middle', 'muted', 11)),
        ...[-1, 0, 1, 2, 3].map((y) => text(72, hy(y) + 4, `${10 ** y}`, 'end', 'muted', 11)),
        text(330, 330, 'Grain diameter (mm) · clay — silt — sand — gravel', 'middle'),
        text(80, 30, 'Velocity (cm/s)'),
        circle(hx(v.logd), hy(v.logv), 8, 'slot'),
      ],
    };
  },
  missions: [
    goal(
      'Find a velocity that erodes the starting sand grain (0.5 mm).',
      'Sand of this size is the easiest material to entrain: about 20 cm/s is enough.',
      { logv: 1.5 },
      (o, v) => near(v.logd, -0.3, 1e-6) && o.regime === 0,
    ),
    goal(
      'Show that clay (0.001 mm) is not eroded by a flow faster than 30 cm/s.',
      'Cohesion between clay particles raises the velocity needed to lift them.',
      { logd: -3, logv: 1.7 },
      (o, v) => near(v.logd, -3, 1e-6) && o.vel > 30 && o.regime !== 0,
    ),
    goal(
      'Find a flow that deposits 10 mm gravel.',
      'Slow the flow below the gravel’s settling curve.',
      { logd: 1, logv: 1.2 },
      (o, v) => near(v.logd, 1, 1e-6) && o.regime === 2,
    ),
  ],
  predict: {
    q: 'Which bed material is set in motion by the slowest flow?',
    options: ['Fine to medium sand', 'Clay', 'Cobbles', 'All sizes move at the same velocity'],
    correct: 0,
    why: 'Larger grains are heavier, while clay and silt are cohesive and present a smooth bed. Loose sand sits at the minimum of the erosion curve.',
  },
  model:
    'Schematic power-law fits to the shape of the Hjulström curve: an erosion threshold with a minimum near 0.5 mm and a lower settling curve. Values are illustrative, for a flow about one metre deep; consolidated clay, grain shape, and bed armouring shift real thresholds considerably.',
};

function sinuosity(amp: number, wavelength: number) {
  let length = 0;
  for (let i = 0; i < 200; i++) {
    const x = ((i + 0.5) / 200) * wavelength,
      slope = ((2 * Math.PI * amp) / wavelength) * Math.cos((2 * Math.PI * x) / wavelength);
    length += Math.sqrt(1 + slope * slope) * (wavelength / 200);
  }
  return length / wavelength;
}
const meander: TopicLab = {
  id: 'dyn-meander',
  title: 'Meander geometry and channel slope',
  lead: 'A river that wanders travels farther to lose the same elevation. Stretch the bends and watch sinuosity rise and channel gradient fall.',
  controls: [
    slider('amp', 'Meander amplitude', 0, 150, 5, 40, 'm'),
    slider('wave', 'Meander wavelength', 200, 600, 20, 400, 'm'),
    slider('slope', 'Valley slope', 0.0005, 0.01, 0.0005, 0.002, 'm/m'),
  ],
  run: (v) => {
    const s = sinuosity(v.amp, v.wave);
    return {
      o: { s, channel: v.slope / s },
      metrics: [
        { label: 'Sinuosity (channel length ÷ valley length)', value: s },
        { label: 'Channel slope', value: v.slope / s, unit: 'm/m' },
        { label: 'Planform', value: s < 1.05 ? 'Straight' : s < 1.5 ? 'Sinuous' : 'Meandering' },
        { label: 'Extra channel length per km of valley', value: (s - 1) * 1000, unit: 'm' },
      ],
      sceneLabel: `Plan view of a channel with sinuosity ${s.toFixed(2)}`,
      scene: [
        line(40, 170, 600, 170, 'muted', 1, true),
        trace(
          (x) => [40 + x * 560, 170 - v.amp * 0.85 * Math.sin((2 * Math.PI * x * 800) / v.wave)],
          0,
          1,
          'accent',
          240,
          7,
        ),
        text(40, 40, 'Plan view · flow left to right · dashed line is the valley axis'),
        ...(v.amp > 0
          ? [
              circle(40 + (v.wave / 4 / 800) * 560, 170 - v.amp * 0.85 - 12, 5, 'warm'),
              text(
                40 + (v.wave / 4 / 800) * 560 + 10,
                170 - v.amp * 0.85 - 16,
                'cut bank (erosion)',
                'start',
                'warm',
                11,
              ),
              circle(40 + (v.wave / 4 / 800) * 560, 170 - v.amp * 0.85 + 14, 5, 'gold'),
              text(
                40 + (v.wave / 4 / 800) * 560 + 10,
                170 - v.amp * 0.85 + 30,
                'point bar (deposition)',
                'start',
                'gold',
                11,
              ),
            ]
          : []),
        text(
          320,
          326,
          `channel path is ${s.toFixed(2)} × the straight-line distance`,
          'middle',
          'muted',
        ),
      ],
    };
  },
  missions: [
    goal(
      'Straighten the channel until its sinuosity is below 1.05 — without removing the bends entirely.',
      'Small amplitude relative to wavelength.',
      { amp: 25 },
      (o, v) => v.amp > 0 && o.s < 1.05,
    ),
    goal(
      'Create a sinuous channel with sinuosity between 1.15 and 1.25.',
      'Try an amplitude of about 15% of the wavelength.',
      { amp: 60 },
      (o) => o.s >= 1.15 && o.s <= 1.25,
    ),
    goal(
      'Make the river’s own slope about half the valley slope.',
      'Channel slope = valley slope ÷ sinuosity, so you need a sinuosity near 2: large bends on a shorter wavelength.',
      { amp: 150, wave: 360 },
      (o) => o.s >= 1.9 && o.s <= 2.1,
    ),
  ],
  predict: {
    q: 'At a meander bend, erosion is concentrated on the…',
    options: [
      'Outer bank, where the fastest flow impinges',
      'Inner bank, where the water is shallow',
      'Centre of the channel bed only',
      'Both banks equally',
    ],
    correct: 0,
    why: 'The high-velocity thread swings to the outside of the bend, undercutting the cut bank, while slower flow on the inside deposits a point bar. Together they make the bend migrate.',
  },
  model:
    'The centreline is a sine curve and sinuosity is its numerically integrated arc length divided by wavelength. Real meanders are closer to sine-generated curves, tighten until a neck cutoff forms an oxbow, and interact with bank material and vegetation.',
};

const recurrence: TopicLab = {
  id: 'dyn-recurrence',
  title: 'Flood recurrence and risk over time',
  lead: 'Rank the annual peak floods in a record. A flood’s rank gives its recurrence interval, and that gives the chance of meeting one in any span of years.',
  controls: [
    slider('n', 'Years of record', 10, 200, 1, 49, 'yr'),
    slider('m', 'Rank of the flood (1 = largest)', 1, 20, 1, 1, ''),
    slider('horizon', 'Planning horizon', 1, 100, 1, 10, 'yr'),
  ],
  run: (v) => {
    const interval = (v.n + 1) / v.m,
      p = Math.min(1, 1 / interval);
    const risk = (years: number) => 1 - (1 - p) ** years;
    return {
      o: { interval, p, risk: risk(v.horizon) },
      metrics: [
        { label: 'Recurrence interval T = (n + 1) / m', value: interval, unit: 'yr' },
        { label: 'Chance in any single year', value: p * 100, unit: '%' },
        {
          label: `Chance of at least one in ${v.horizon} years`,
          value: risk(v.horizon) * 100,
          unit: '%',
        },
      ],
      plot: {
        title: 'Risk accumulates with exposure time',
        x: [1, 100, 'Years of exposure'],
        y: [0, 1, 'Probability of at least one'],
        curves: [{ f: risk }],
        hlines: [{ y: 0.5, label: 'even odds' }],
        points: [
          { x: v.horizon, y: risk(v.horizon), label: `${(risk(v.horizon) * 100).toFixed(0)}%` },
        ],
      },
    };
  },
  missions: [
    goal(
      'Find the record length that makes the largest flood on record a “100-year flood”.',
      'T = (n + 1) / m with m = 1.',
      { n: 99 },
      (o, v) => v.m === 1 && near(o.interval, 100, 1e-9),
    ),
    goal(
      'For that 100-year flood, find the chance of at least one during a 30-year mortgage.',
      'It is 1 − 0.99³⁰ — much more than 1%.',
      { n: 99, horizon: 30 },
      (o, v) => near(o.interval, 100, 1e-9) && v.horizon === 30,
    ),
    goal(
      'Find the shortest exposure for which a 100-year flood is more likely than not.',
      'Solve 0.99ᴺ < 0.5.',
      { n: 99, horizon: 69 },
      (o, v) => near(o.interval, 100, 1e-9) && o.risk > 0.5 && v.horizon <= 69,
    ),
  ],
  predict: {
    q: 'A river had its “100-year flood” last year. The probability of a flood that large this year is…',
    options: [
      'Still about 1%',
      'Nearly zero for the next 99 years',
      'About 50%',
      '100%, because floods cluster',
    ],
    correct: 0,
    why: 'A recurrence interval is an average, not a schedule. Under the usual assumption of independent years, each year carries the same 1-in-100 chance.',
  },
  model:
    'Weibull plotting position T = (n + 1) / m; annual exceedance probability 1/T; risk over N years = 1 − (1 − 1/T)ᴺ. Assumes independent years and a stationary climate and land use — both questionable for long horizons. Short records estimate rare floods poorly.',
};

const well: TopicLab = {
  id: 'dyn-well',
  title: 'Cone of depression around a pumping well',
  lead: 'Pumping lowers the water table most at the well and less with distance. How far and how deep the cone reaches depends on the aquifer.',
  controls: [
    slider('q', 'Pumping rate', 100, 5000, 100, 1000, 'm³/day'),
    slider('t', 'Aquifer transmissivity', 50, 2000, 50, 500, 'm²/day'),
    slider('r', 'Distance from the well', 1, 500, 1, 10, 'm'),
  ],
  run: (v) => {
    const drawdown = (r: number) => (v.q / (2 * Math.PI * v.t)) * Math.log(500 / Math.max(1, r));
    return {
      o: { s: drawdown(v.r), atWell: drawdown(1) },
      metrics: [
        { label: 'Drawdown at this distance', value: drawdown(v.r), unit: 'm' },
        { label: 'Drawdown 1 m from the well', value: drawdown(1), unit: 'm' },
        { label: 'Drawdown at 100 m', value: drawdown(100), unit: 'm' },
      ],
      plot: {
        title: 'Water level relative to the undisturbed water table',
        x: [1, 500, 'Distance from the well (m)'],
        y: [-15, 0, 'Water level (m)'],
        curves: [{ f: (r) => -drawdown(r) }],
        points: [{ x: v.r, y: -drawdown(v.r), label: `−${drawdown(v.r).toFixed(2)} m` }],
      },
    };
  },
  missions: [
    goal(
      'Halve the drawdown seen 10 m from the well by changing only the aquifer.',
      'Drawdown is inversely proportional to transmissivity.',
      { t: 1000 },
      (o, v) => v.q === 1000 && v.r === 10 && near(o.s, 0.6226, 0.01),
    ),
    goal(
      'Pump 2,000 m³/day while keeping drawdown at a neighbour’s well 100 m away under 0.5 m.',
      'Find an aquifer transmissive enough to spread the cone thinly.',
      { q: 2000, r: 100, t: 1050 },
      (o, v) => v.q === 2000 && v.r === 100 && o.s < 0.5,
    ),
    goal(
      'Produce more than 10 m of drawdown beside the well.',
      'Pump hard from a poorly transmissive aquifer and look 1 m away.',
      { q: 5000, t: 450, r: 1 },
      (o, v) => v.r === 1 && o.s > 10,
    ),
  ],
  predict: {
    q: 'Two identical wells pump at the same rate from different aquifers. The one in the less transmissive aquifer has…',
    options: [
      'A deeper, steeper cone of depression',
      'A shallower cone',
      'No cone at all',
      'The same cone; only pumping rate matters',
    ],
    correct: 0,
    why: 'A steeper hydraulic gradient is needed to drive the same flow through material that transmits water less readily.',
  },
  model:
    'Thiem steady-state equation for a confined aquifer, s = (Q / 2πT) ln(R / r), with a fixed radius of influence R = 500 m. Assumes a homogeneous, isotropic aquifer of constant thickness and a fully penetrating well; unconfined aquifers and transient pumping behave differently.',
};

const seasons = [
  'Winter (ice cover)',
  'Spring turnover',
  'Summer stratification',
  'Autumn turnover',
];
function lakeTemp(season: number, z: number) {
  if (season === 0) return 4 * Math.min(1, z / 4);
  if (season === 1) return 4;
  if (season === 3) return 9;
  return z <= 6 ? 22 : z < 12 ? 22 - ((z - 6) * 14) / 6 : 8 - ((z - 12) * 2) / 18;
}
function lakeOxygen(season: number, z: number, eutrophic: number) {
  if (season === 0) return 12 - z * 0.15;
  if (season === 1) return 11;
  if (season === 3) return 9.5;
  const deep = eutrophic ? 1 : 6;
  return z <= 6
    ? 8.5
    : z < 12
      ? 8.5 - ((z - 6) * (8.5 - deep)) / 6
      : Math.max(0, deep - (z - 12) * 0.1);
}
const stratification: TopicLab = {
  id: 'dyn-stratification',
  title: 'Lake stratification through the year',
  lead: 'Lower a probe through a 30 m temperate lake in each season. Temperature controls density, and density controls whether the lake can mix.',
  controls: [
    choice('season', 'Season', seasons, 2),
    slider('depth', 'Probe depth', 0, 30, 1, 0, 'm'),
    toggle('eutrophic', 'Nutrient-rich (eutrophic) lake'),
  ],
  run: (v) => {
    const temp = lakeTemp(v.season, v.depth),
      oxygen = lakeOxygen(v.season, v.depth, v.eutrophic);
    const density =
      1000 * (1 - ((temp + 288.9414) / (508929.2 * (temp + 68.12963))) * (temp - 3.9863) ** 2);
    const layer =
      v.season !== 2
        ? 'Not stratified by a summer thermocline'
        : v.depth <= 6
          ? 'Epilimnion (warm, mixed)'
          : v.depth < 12
            ? 'Metalimnion (thermocline)'
            : 'Hypolimnion (cold, isolated)';
    return {
      o: { temp, oxygen, density, mixed: v.season === 1 || v.season === 3 ? 1 : 0 },
      metrics: [
        { label: 'Temperature at the probe', value: temp, unit: '°C' },
        { label: 'Dissolved oxygen', value: oxygen, unit: 'mg/L' },
        { label: 'Water density', value: Number(density.toFixed(3)), unit: 'kg/m³' },
        { label: 'Layer', value: layer },
      ],
      plot: {
        title: seasons[v.season],
        x: [0, 30, 'Depth (m) · surface at left'],
        y: [0, 25, 'Temperature (°C) and oxygen (mg/L)'],
        curves: [
          { f: (z) => lakeTemp(v.season, z), label: 'temperature', tone: 'warm' },
          {
            f: (z) => lakeOxygen(v.season, z, v.eutrophic),
            label: 'dissolved oxygen',
            tone: 'cool',
            dash: true,
          },
        ],
        points: [{ x: v.depth, y: temp, label: `${temp.toFixed(1)} °C` }],
      },
    };
  },
  missions: [
    goal(
      'In summer, lower the probe into the layer where temperature changes fastest with depth.',
      'The thermocline lies between the warm surface layer and the cold deep water.',
      { depth: 9 },
      (o, v) => v.season === 2 && v.depth > 6 && v.depth < 12,
    ),
    goal(
      'Find a season in which surface and bottom water have the same temperature.',
      'With no density difference, wind can mix the whole lake.',
      { season: 1 },
      (o) => o.mixed === 1,
    ),
    goal(
      'In a eutrophic lake in summer, find water with less than 2 mg/L of dissolved oxygen.',
      'Decomposition uses oxygen in deep water that cannot be resupplied from the surface.',
      { eutrophic: 1, depth: 15 },
      (o, v) => v.season === 2 && o.oxygen < 2,
    ),
  ],
  predict: {
    q: 'Under winter ice, a deep temperate lake is warmest…',
    options: [
      'At the bottom, near 4 °C',
      'Just beneath the ice',
      'At mid-depth',
      'Nowhere; it is 0 °C throughout',
    ],
    correct: 0,
    why: 'Fresh water is densest at about 4 °C, so the densest water sinks and colder, lighter water near 0 °C floats on top beneath the ice.',
  },
  model:
    'Idealised temperature and oxygen profiles for a dimictic temperate lake 30 m deep; density from a standard polynomial fit for pure water. Actual profiles depend on lake size, wind fetch, clarity, and inflows, and the eutrophic toggle only changes deep-water oxygen.',
};

const impervious: TopicLab = {
  id: 'dyn-impervious',
  title: 'Paving a watershed: peak runoff',
  lead: 'Replace soil and vegetation with roofs and roads and more of each storm runs straight off. The rational method puts a number on the peak.',
  controls: [
    slider('imp', 'Impervious cover', 0, 100, 5, 10, '%'),
    slider('i', 'Rainfall intensity', 5, 100, 5, 25, 'mm/h'),
    slider('area', 'Contributing area', 10, 500, 10, 100, 'ha'),
  ],
  run: (v) => {
    const c = (imp: number) => 0.05 + 0.009 * imp,
      peak = (imp: number) => 0.00278 * c(imp) * v.i * v.area;
    return {
      o: { c: c(v.imp), q: peak(v.imp), ratio: peak(v.imp) / peak(10) },
      metrics: [
        { label: 'Runoff coefficient C', value: c(v.imp) },
        { label: 'Peak discharge', value: peak(v.imp), unit: 'm³/s' },
        {
          label: 'Peak relative to 10% impervious cover',
          value: peak(v.imp) / peak(10),
          unit: '×',
        },
        {
          label: 'Share of rain that infiltrates or is stored',
          value: (1 - c(v.imp)) * 100,
          unit: '%',
        },
      ],
      plot: {
        title: 'Peak discharge rises with impervious cover',
        x: [0, 100, 'Impervious cover (%)'],
        y: [0, 40, 'Peak discharge (m³/s)'],
        curves: [{ f: peak }],
        points: [{ x: v.imp, y: peak(v.imp), label: `${peak(v.imp).toPrecision(3)} m³/s` }],
      },
    };
  },
  missions: [
    goal(
      'Urbanise the starting basin to 60% impervious cover and read how many times larger the peak becomes.',
      'Only the runoff coefficient changes.',
      { imp: 60 },
      (o, v) => v.imp === 60 && v.i === 25 && v.area === 100,
    ),
    goal(
      'Find the impervious cover at which the peak is about double its starting value.',
      'C must roughly double from 0.14.',
      { imp: 25 },
      (o, v) => v.i === 25 && v.area === 100 && near(o.ratio, 2, 0.06),
    ),
    goal(
      'Hold cover at 60% and intensity at 25 mm/h, and shrink the contributing area until the peak is below 2 m³/s.',
      'Peak is proportional to area: this is what diverting flow to detention achieves.',
      { imp: 60, area: 40 },
      (o, v) => v.imp === 60 && v.i === 25 && o.q < 2,
    ),
  ],
  predict: {
    q: 'After a forested catchment is urbanised, its storm hydrograph typically shows…',
    options: [
      'A higher peak that arrives sooner',
      'A lower peak that arrives later',
      'The same peak with more baseflow',
      'No change, because rainfall is unchanged',
    ],
    correct: 0,
    why: 'Impervious surfaces and storm drains cut infiltration and speed delivery to the channel, shortening lag time and raising the peak.',
  },
  model:
    'Rational method Q = 0.00278 · C · i · A (Q in m³/s, i in mm/h, A in hectares), with C rising linearly from 0.05 to 0.95 with impervious cover. Intended for small catchments and a storm at least as long as the time of concentration; it gives a peak, not a hydrograph.',
};

const roughness: [string, number][] = [
  ['Smooth concrete', 0.013],
  ['Clean earth channel', 0.022],
  ['Natural stream, clean', 0.03],
  ['Weedy, stony stream', 0.045],
  ['Brushy floodplain', 0.1],
];
const manning: TopicLab = {
  id: 'dyn-manning',
  title: 'Estimating discharge with Manning’s equation',
  lead: 'Discharge is velocity times cross-sectional area. Manning’s equation estimates the velocity from channel shape, slope, and roughness.',
  controls: [
    slider('b', 'Channel width', 1, 50, 1, 10, 'm'),
    slider('y', 'Water depth', 0.2, 5, 0.1, 1, 'm'),
    slider('s', 'Water-surface slope', 0.0002, 0.02, 0.0002, 0.001, 'm/m'),
    choice(
      'n',
      'Bed and bank roughness',
      roughness.map(([name, n]) => `${name} · n = ${n}`),
      2,
    ),
  ],
  run: (v) => {
    const area = v.b * v.y,
      radius = area / (v.b + 2 * v.y),
      vel = (1 / roughness[v.n][1]) * radius ** (2 / 3) * Math.sqrt(v.s),
      w = Math.min(420, 60 + v.b * 7),
      d = v.y * 30;
    return {
      o: { vel, q: vel * area, radius },
      metrics: [
        { label: 'Cross-sectional area', value: area, unit: 'm²' },
        { label: 'Hydraulic radius A / P', value: radius, unit: 'm' },
        { label: 'Mean velocity', value: vel, unit: 'm/s' },
        { label: 'Discharge Q = vA', value: vel * area, unit: 'm³/s' },
      ],
      sceneLabel: `Rectangular channel ${v.b} metres wide and ${v.y} metres deep carrying ${(vel * area).toPrecision(3)} cubic metres per second`,
      scene: [
        path(
          `M${320 - w / 2 - 40} 100H${320 - w / 2}V270H${320 + w / 2}V100H${320 + w / 2 + 40}`,
          'ink',
          false,
          3,
        ),
        rect(320 - w / 2 + 2, 270 - d, w - 4, d, 'cool', true, 0.45),
        line(320 - w / 2, 270 - d, 320 + w / 2, 270 - d, 'cool', 2),
        text(320, 270 - d - 10, `depth ${v.y} m`, 'middle'),
        text(320, 296, `width ${v.b} m`, 'middle'),
        text(
          320,
          60,
          `v = ${vel.toPrecision(3)} m/s  ·  Q = ${(vel * area).toPrecision(3)} m³/s`,
          'middle',
          'slot',
          15,
        ),
        text(
          320,
          326,
          'Cross-section looking downstream (vertical scale exaggerated)',
          'middle',
          'muted',
          11,
        ),
      ],
    };
  },
  missions: [
    goal(
      'Raise only the depth until the discharge has at least doubled; find the smallest depth that does it.',
      'Deeper flow gains both area and hydraulic radius, so discharge grows faster than depth.',
      { y: 1.6 },
      (o, v) => v.b === 10 && v.n === 2 && near(v.s, 0.001, 1e-9) && o.q >= 18.66 && v.y <= 1.6,
    ),
    goal(
      'Choose a roughness that slows the starting flow below 0.3 m/s.',
      'Dense vegetation gives the largest n.',
      { n: 4 },
      (o, v) => v.n === 4 && o.vel < 0.3,
    ),
    goal(
      'Line the channel with smooth concrete and steepen it until the velocity exceeds 3 m/s.',
      'Velocity scales with the square root of slope.',
      { n: 0, s: 0.002 },
      (o, v) => v.n === 0 && o.vel > 3,
    ),
  ],
  predict: {
    q: 'Vegetation grows in a channel while discharge stays the same. The flow becomes…',
    options: ['Slower and deeper', 'Faster and shallower', 'Faster and deeper', 'Unchanged'],
    correct: 0,
    why: 'Higher roughness lowers velocity; to pass the same discharge the area — and so the depth — must increase. This is why overgrown channels flood sooner.',
  },
  model:
    'Manning’s equation in SI units, v = (1/n) R^(2/3) S^(1/2), for uniform steady flow in a rectangular channel. The roughness coefficient is an empirical estimate and is often the largest source of error; field gauging uses measured velocities instead.',
};

export const dynamicPlanetExtras: EventExtras = {
  eventId: 'dynamic-planet',
  labs: [
    budget,
    orographic,
    strahler,
    hjulstrom,
    meander,
    recurrence,
    well,
    stratification,
    impervious,
    manning,
  ],
  lessons: {
    'dyn-u1-l1': {
      labs: ['dyn-budget'],
      sort: sort(
        'Store or flux?',
        ['Store (a volume)', 'Flux (a rate)'],
        [
          ['Groundwater in an aquifer', 0],
          ['Evapotranspiration', 1],
          ['Snowpack', 0],
          ['Stream discharge', 1],
          ['Soil moisture', 0],
          ['Infiltration', 1],
        ],
      ),
      checks: [
        check(
          2,
          '25 mm of rain falls evenly on a 2 km² catchment. What volume of water is that?',
          ['50,000 m³', '50 m³', '5,000 m³', '500,000 m³'],
          'Volume = depth × area = 0.025 m × 2,000,000 m² = 50,000 m³. Converting depth to metres and area to square metres first avoids the usual error.',
        ),
      ],
    },
    'dyn-u2-l1': {
      labs: ['dyn-orographic'],
      sort: sort(
        'Where is Earth’s fresh water?',
        ['Ice sheets and glaciers', 'Groundwater', 'Surface water and atmosphere'],
        [
          ['The largest share of all fresh water', 0],
          ['The largest share of liquid fresh water', 1],
          ['Lakes and rivers', 2],
          ['Antarctica and Greenland', 0],
          ['Water in the pores of an aquifer', 1],
          ['Water vapour and clouds', 2],
        ],
      ),
      checks: [
        check(
          2,
          'The windward side of a coastal mountain range is wetter than the lee side because…',
          [
            'Rising air cools, condenses, and precipitates before crossing the crest',
            'The lee side is at a higher elevation',
            'Wind cannot carry water over mountains',
            'The windward side is closer to the equator',
          ],
          'Forced uplift cools moist air to saturation. Descending air on the far side warms and dries, creating a rain shadow.',
        ),
      ],
    },
    'dyn-u3-l1': {
      labs: ['dyn-strahler'],
      sort: sort(
        'Which drainage pattern?',
        ['Dendritic', 'Trellis', 'Radial', 'Rectangular'],
        [
          ['Tree-like branching on uniform rock', 0],
          ['Long parallel streams with short right-angle tributaries in folded strata', 1],
          ['Streams flowing outward from a volcanic cone', 2],
          ['Right-angle bends following joints and faults', 3],
          ['Develops where there is no strong structural control', 0],
          ['Typical of ridge-and-valley terrain', 1],
        ],
      ),
      checks: [
        check(
          2,
          'Two third-order streams join. Under the Strahler system, the stream below the confluence is…',
          ['Fourth order', 'Third order', 'Sixth order', 'Ninth order'],
          'Order rises by one only when two streams of equal order meet; orders are not added.',
        ),
      ],
    },
    'dyn-u4-l1': {
      labs: ['dyn-hjulstrom'],
      sort: sort(
        'How is the sediment carried?',
        ['Dissolved load', 'Suspended load', 'Bed load'],
        [
          ['Ions from weathered limestone', 0],
          ['Clay and silt that make water turbid', 1],
          ['Gravel rolling along the channel floor', 2],
          ['Sand grains bouncing by saltation', 2],
          ['Invisible; measured as conductivity', 0],
          ['Fine particles held up by turbulence', 1],
        ],
      ),
      checks: [
        check(
          2,
          'A stream’s competence refers to…',
          [
            'The largest particle it can move',
            'The total amount of sediment it can carry',
            'Its discharge at bankfull',
            'The area of its drainage basin',
          ],
          'Competence depends mainly on velocity (largest grain size); capacity is the total load and depends mainly on discharge.',
        ),
      ],
    },
    'dyn-u5-l1': {
      labs: ['dyn-meander'],
      sort: sort(
        'Erosional or depositional landform?',
        ['Erosional', 'Depositional'],
        [
          ['Cut bank', 0],
          ['Point bar', 1],
          ['Natural levee', 1],
          ['V-shaped valley', 0],
          ['Delta', 1],
          ['Stream terrace riser cut into older alluvium', 0],
        ],
      ),
      checks: [
        check(
          3,
          'A drop in base level (for example, falling sea level) typically causes a river to…',
          [
            'Incise, leaving the old floodplain as terraces',
            'Deposit sediment and build up its bed',
            'Stop flowing',
            'Become wider and shallower without changing elevation',
          ],
          'Lowering the level a river grades to steepens its profile, giving it energy to cut down. Abandoned floodplain surfaces remain as terraces.',
        ),
      ],
    },
    'dyn-u6-l1': {
      labs: ['dyn-recurrence'],
      sort: sort(
        'Part of a storm hydrograph',
        ['Rising limb', 'Peak', 'Falling limb (recession)', 'Baseflow'],
        [
          ['Discharge increasing as runoff arrives', 0],
          ['Maximum discharge of the event', 1],
          ['Discharge declining as stored water drains', 2],
          ['Groundwater-fed flow between storms', 3],
          ['Steeper in an urban catchment', 0],
          ['Sustains the stream during dry weather', 3],
        ],
      ),
      checks: [
        check(
          0,
          'A stream is 8 m wide and 0.5 m deep on average, with a mean velocity of 1.5 m/s. Its discharge is…',
          ['6 m³/s', '4 m³/s', '12 m³/s', '10 m³/s'],
          'Q = width × depth × velocity = 8 × 0.5 × 1.5 = 6 m³/s.',
        ),
      ],
    },
    'dyn-u7-l1': {
      labs: ['dyn-well'],
      phet: [
        phet(
          'under-pressure',
          'Under Pressure',
          'Hydraulic head combines elevation and pressure. Measure how water pressure grows with depth before you apply head differences to groundwater flow.',
          'Place the pressure gauge at three depths in the tank. Is the increase in pressure per metre constant?',
          'Change the fluid density. How does the pressure at a fixed depth respond?',
          'Use the connected-chambers scene: does the shape of the container change the pressure at a given depth?',
        ),
      ],
      sort: sort(
        'Aquifer or aquitard?',
        ['Good aquifer', 'Aquitard (confining layer)'],
        [
          ['Well-sorted sand and gravel', 0],
          ['Unfractured clay', 1],
          ['Fractured sandstone', 0],
          ['Massive shale', 1],
          ['Karst limestone with solution conduits', 0],
          ['Unweathered crystalline bedrock without fractures', 1],
        ],
      ),
      checks: [
        check(
          1,
          'Clay has a high porosity yet makes a poor aquifer because…',
          [
            'Its pores are tiny and poorly connected, so permeability is very low',
            'It contains no water',
            'It dissolves in groundwater',
            'It is always above the water table',
          ],
          'Porosity measures how much water a material holds; permeability measures how readily it transmits water. An aquifer needs both.',
        ),
      ],
    },
    'dyn-u8-l1': {
      labs: ['dyn-stratification'],
      sort: sort(
        'How did the lake basin form?',
        ['Glacial', 'Tectonic', 'Volcanic', 'Fluvial'],
        [
          ['Kettle lake left by a melting ice block', 0],
          ['Rift-valley lake such as Tanganyika', 1],
          ['Caldera lake such as Crater Lake', 2],
          ['Oxbow lake cut off from a meander', 3],
          ['Cirque lake (tarn)', 0],
          ['Lake in a down-dropped fault block', 1],
        ],
      ),
      checks: [
        check(
          2,
          'In a stratified eutrophic lake in late summer, dissolved oxygen is usually lowest in the…',
          ['Hypolimnion', 'Epilimnion', 'Surface film', 'Inflowing stream'],
          'Sinking organic matter decomposes in the deep layer, which is cut off from the atmosphere and from photosynthesis by the thermocline.',
        ),
      ],
    },
    'dyn-u9-l1': {
      labs: ['dyn-impervious'],
      sort: sort(
        'Point or nonpoint source?',
        ['Point source', 'Nonpoint source'],
        [
          ['A wastewater-treatment plant outfall', 0],
          ['Fertiliser washing off many farm fields', 1],
          ['A factory discharge pipe', 0],
          ['Oil and grit carried off city streets', 1],
          ['A leaking storage tank at one known site', 0],
          ['Sediment eroding from construction sites across a region', 1],
        ],
      ),
      checks: [
        check(
          1,
          'Building storm drains and paving a catchment generally makes its lag time (rain peak to flow peak)…',
          ['Shorter', 'Longer', 'Unchanged', 'Infinite'],
          'Water reaches the channel through pipes and over smooth surfaces instead of slowly through soil, so the flood peak follows the rain more quickly.',
        ),
      ],
    },
    'dyn-u10-l1': {
      labs: ['dyn-manning'],
      sort: sort(
        'Which tool answers the question?',
        ['Topographic map', 'Stream gauge', 'Monitoring well', 'Water-quality sonde'],
        [
          ['Where is the drainage divide?', 0],
          ['What is the discharge right now?', 1],
          ['How deep is the water table?', 2],
          ['What are the temperature, conductivity, and dissolved oxygen?', 3],
          ['What is the channel gradient between two points?', 0],
          ['Is the aquifer’s water level falling over years?', 2],
        ],
      ),
      checks: [
        check(
          0,
          'On a topographic map, contour lines crossing a stream form a “V”. The V points…',
          ['Upstream', 'Downstream', 'Toward the nearest road', 'North'],
          'A valley is lower than the land beside it, so each contour bends up the valley to stay at its elevation — the “rule of Vs”.',
        ),
      ],
    },
  },
};
