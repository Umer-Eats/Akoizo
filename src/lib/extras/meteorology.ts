import { check, phet, sort, type EventExtras } from '../lesson-extras.ts';
import {
  arrow,
  choice,
  circle,
  goal,
  line,
  path,
  rect,
  slider,
  text,
  type Shape,
  type TopicLab,
} from '../topic-lab-kit.ts';

const doppler: TopicLab = {
  id: 'met-doppler',
  title: 'Reading a Doppler velocity couplet',
  lead: 'Set the strongest inbound (green) and outbound (red) winds and how far apart they are. Tight, strong couplets mean intense rotation.',
  controls: [
    slider('inbound', 'Strongest inbound wind', 0, 100, 5, 20, 'kt'),
    slider('outbound', 'Strongest outbound wind', 0, 100, 5, 20, 'kt'),
    slider('dist', 'Distance between the peaks', 0.5, 5, 0.5, 3, 'km'),
  ],
  run: (v) => {
    const dv = v.inbound + v.outbound,
      rot = dv / 2,
      shear = dv / v.dist;
    const verdict =
      dv >= 90 && v.dist <= 1
        ? 'Tornadic vortex signature'
        : rot >= 30
          ? 'Strong mesocyclone'
          : rot >= 15
            ? 'Weak rotation'
            : 'Little rotation';
    const gap = 40 + v.dist * 40;
    const scene: Shape[] = [
      circle(320 - gap / 2, 160, 18 + v.inbound * 0.6, 'green', true, 0.55),
      circle(320 + gap / 2, 160, 18 + v.outbound * 0.6, 'warm', true, 0.55),
      text(320 - gap / 2, 165, `${v.inbound} kt in`, 'middle'),
      text(320 + gap / 2, 165, `${v.outbound} kt out`, 'middle'),
      ...arrow(80, 300, 80, 250, 'muted'),
      text(95, 290, 'toward radar', 'start', 'muted'),
      text(320, 300, verdict, 'middle', 'accent', 16),
    ];
    return {
      o: { dv, rot, shear, dist: v.dist },
      metrics: [
        { label: 'Gate-to-gate velocity difference', value: dv, unit: 'kt' },
        { label: 'Rotational velocity', value: rot, unit: 'kt' },
        { label: 'Shear across the couplet', value: Number(shear.toFixed(1)), unit: 'kt/km' },
        { label: 'Interpretation', value: verdict },
      ],
      sceneLabel: `Velocity couplet: ${v.inbound} knots inbound and ${v.outbound} knots outbound, ${v.dist} km apart — ${verdict}`,
      scene,
    };
  },
  missions: [
    goal(
      'Create a strong mesocyclone with a rotational velocity of at least 50 knots.',
      'Rotational velocity is half the sum of the inbound and outbound speeds.',
      { inbound: 50, outbound: 50 },
      (o) => o.rot >= 50,
    ),
    goal(
      'Build a tornadic vortex signature: at least 90 knots difference within 1 km.',
      'Raise both speeds and squeeze the peaks together.',
      { inbound: 50, outbound: 45, dist: 1 },
      (o) => o.dv >= 90 && o.dist <= 1,
    ),
  ],
  predict: {
    q: 'On a Doppler velocity image, bright green next to bright red in a hook echo most likely shows what?',
    options: ['Rotation', 'Heavy rain only', 'Hail', 'Ground clutter'],
    correct: 0,
    why: 'Green is motion toward the radar and red is away; side-by-side strong opposite motions mean air is spinning.',
  },
  model:
    'Couplet strength is summarized by velocity difference and rotational velocity (half the difference). Thresholds are teaching guides; real warning decisions also use storm structure, range, and environment.',
};

const dirs = ['north', 'east', 'south', 'west'];
const barb: TopicLab = {
  id: 'met-barb',
  title: 'Building a station-model wind barb',
  lead: 'Choose a wind speed and direction. The shaft points toward where the wind comes from; flags are 50 knots, long barbs 10, and short barbs 5.',
  controls: [
    slider('speed', 'Wind speed', 0, 150, 5, 10, 'kt'),
    choice('dir', 'Wind blowing from', dirs, 0),
  ],
  run: (v) => {
    const flags = Math.floor(v.speed / 50),
      longs = Math.floor((v.speed % 50) / 10),
      shorts = v.speed % 10 >= 5 ? 1 : 0;
    const angle = [-Math.PI / 2, 0, Math.PI / 2, Math.PI][v.dir];
    const cx = 320,
      cy = 170,
      L = 120;
    const ux = Math.cos(angle),
      uy = Math.sin(angle);
    const px = -uy,
      py = ux;
    const tip = [cx + ux * L, cy + uy * L];
    const scene: Shape[] = [
      circle(cx, cy, 14, 'ink', false),
      line(cx, cy, tip[0], tip[1], 'ink', 3),
    ];
    let pos = 0;
    for (let i = 0; i < flags; i++, pos += 18) {
      const bx = tip[0] - ux * pos,
        by = tip[1] - uy * pos;
      scene.push(
        path(
          `M${bx},${by}L${bx + px * 36},${by + py * 36}L${bx - ux * 14},${by - uy * 14}Z`,
          'accent',
          true,
          1,
        ),
      );
    }
    for (let i = 0; i < longs; i++, pos += 12) {
      const bx = tip[0] - ux * pos,
        by = tip[1] - uy * pos;
      scene.push(line(bx, by, bx + px * 36, by + py * 36, 'ink', 3));
    }
    for (let i = 0; i < shorts; i++, pos += 12) {
      const bx = tip[0] - ux * (pos + 4),
        by = tip[1] - uy * (pos + 4);
      scene.push(line(bx, by, bx + px * 18, by + py * 18, 'ink', 3));
    }
    scene.push(text(320, 320, `${v.speed} kt from the ${dirs[v.dir]}`, 'middle'));
    return {
      o: { flags, longs, shorts },
      metrics: [
        { label: 'Flags (50 kt each)', value: flags },
        { label: 'Long barbs (10 kt each)', value: longs },
        { label: 'Short barbs (5 kt)', value: shorts },
        {
          label: 'Wind',
          value:
            v.speed === 0 ? 'Calm (circle drawn twice)' : `${v.speed} kt from the ${dirs[v.dir]}`,
        },
      ],
      sceneLabel: `Wind barb for ${v.speed} knots from the ${dirs[v.dir]}`,
      scene,
    };
  },
  missions: [
    goal(
      'Draw a 65-knot wind: one flag, one long barb, and one short barb.',
      'Add 50 + 10 + 5 knots.',
      { speed: 65 },
      (o) => o.flags === 1 && o.longs === 1 && o.shorts === 1,
    ),
    goal(
      'Draw a 25-knot wind coming from the south, as in a moist warm sector.',
      'Two long barbs and one short barb, shaft pointing south.',
      { speed: 25, dir: 2 },
      (o, v) => v.dir === 2 && o.longs === 2 && o.shorts === 1 && o.flags === 0,
    ),
  ],
  predict: {
    q: 'A wind barb has two long barbs and one short barb. What is the wind speed?',
    options: ['25 knots', '21 knots', '30 knots', '15 knots'],
    correct: 0,
    why: 'Each long barb is 10 knots and the short barb is 5, so 10 + 10 + 5 = 25 knots.',
  },
  model:
    'Standard U.S. station model barb conventions, rounded to the nearest 5 knots. Only four directions are offered here for clarity; real barbs show directions to 10°.',
};

const lcl: TopicLab = {
  id: 'met-lcl',
  title: 'Estimating cloud base from temperature and dew point',
  lead: 'A rising parcel cools until it saturates at the lifting condensation level. A small temperature–dew point spread means a low cloud base.',
  controls: [
    slider('t', 'Surface temperature', -10, 40, 1, 25, '°C'),
    slider('td', 'Surface dew point', -20, 35, 1, 10, '°C'),
  ],
  run: (v) => {
    const spread = Math.max(0, v.t - v.td),
      height = 125 * spread,
      baseTemp = v.t - (9.8 * height) / 1000;
    const y = 300 - Math.min(4000, height) * 0.065;
    const scene: Shape[] = [
      rect(40, 300, 560, 30, 'muted', true, 0.4),
      ...arrow(320, 295, 320, y + 18, 'accent'),
      circle(320, 295, 9, 'accent'),
      rect(220, y - 22, 200, 30, 'cool', true, 0.5, 14),
      text(320, y - 2, height === 0 ? 'fog at the ground' : `cloud base ≈ ${height} m`, 'middle'),
      text(60, 50, `spread ${spread} °C`, 'start', 'muted'),
    ];
    return {
      o: { height, spread },
      metrics: [
        { label: 'Temperature – dew point spread', value: spread, unit: '°C' },
        { label: 'LCL height (≈125 m per °C)', value: height, unit: 'm' },
        { label: 'Parcel temperature at the LCL', value: Number(baseTemp.toFixed(1)), unit: '°C' },
        {
          label: 'Tornado setting',
          value:
            height <= 1000
              ? 'Low cloud base: favorable if shear is present'
              : 'High cloud base: less favorable',
        },
      ],
      sceneLabel: `Parcel lifted to a cloud base near ${height} meters`,
      scene,
    };
  },
  missions: [
    goal(
      'Lower the cloud base to 500 m or less, a setting that favors tornadoes.',
      'Bring the dew point within 4 °C of the temperature.',
      { t: 25, td: 21 },
      (o) => o.height <= 500 && o.spread > 0,
    ),
    goal(
      'Make the cloud base exactly 2,500 m, typical of a dry afternoon.',
      'A spread of 20 °C gives 2,500 m.',
      { t: 30, td: 10 },
      (o) => o.height === 2500,
    ),
  ],
  predict: {
    q: 'The temperature is 28 °C and the dew point 20 °C. About how high is the cloud base?',
    options: ['1,000 m', '250 m', '2,500 m', '3,500 m'],
    correct: 0,
    why: 'The spread is 8 °C, and 8 × 125 m = 1,000 m, the height where the rising parcel saturates.',
  },
  model:
    'LCL ≈ 125 m × (T − Td), a standard estimate for surface parcels. Parcel temperature uses the dry adiabatic rate of 9.8 °C/km. Dew points above the temperature are treated as saturated air (fog).',
};

const saffir: TopicLab = {
  id: 'met-saffir',
  title: 'Classifying tropical cyclones by wind',
  lead: 'Slide the one-minute sustained wind speed. The Saffir–Simpson scale rates hurricanes by wind alone, so read each category with its limits in mind.',
  controls: [slider('wind', 'Sustained wind', 25, 185, 1, 60, 'mph')],
  run: (v) => {
    const w = v.wind;
    const cat = w >= 157 ? 5 : w >= 130 ? 4 : w >= 111 ? 3 : w >= 96 ? 2 : w >= 74 ? 1 : 0;
    const stage =
      w < 39
        ? 'Tropical depression'
        : w < 74
          ? 'Tropical storm'
          : cat >= 3
            ? `Major hurricane (Category ${cat})`
            : `Hurricane (Category ${cat})`;
    return {
      o: { cat, ts: w >= 39 && w < 74 ? 1 : 0, wind: w },
      metrics: [
        { label: 'Classification', value: stage },
        { label: 'Saffir–Simpson category', value: cat === 0 ? 'Not a hurricane' : cat },
        { label: 'Wind speed', value: w, unit: 'mph' },
      ],
      bars: {
        title: 'Lower wind threshold of each stage (mph)',
        max: 185,
        items: [
          { label: 'Tropical storm', value: 39, tone: w >= 39 && w < 74 ? 'slot' : 'muted' },
          { label: 'Category 1', value: 74, tone: cat === 1 ? 'slot' : 'muted' },
          { label: 'Category 2', value: 96, tone: cat === 2 ? 'slot' : 'muted' },
          { label: 'Category 3', value: 111, tone: cat === 3 ? 'slot' : 'muted' },
          { label: 'Category 4', value: 130, tone: cat === 4 ? 'slot' : 'muted' },
          { label: 'Category 5', value: 157, tone: cat === 5 ? 'slot' : 'muted' },
          { label: 'This storm', value: w, tone: 'accent' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Find the lowest sustained wind that makes a major hurricane.',
      'Major hurricanes start at Category 3.',
      { wind: 111 },
      (o) => o.cat === 3 && o.wind === 111,
    ),
    goal(
      'Set a storm strong enough to be Category 5.',
      'Category 5 begins at 157 mph.',
      { wind: 157 },
      (o) => o.cat === 5,
    ),
    goal(
      'Find the strongest wind that is still only a tropical storm.',
      'One mile per hour more would make it a hurricane.',
      { wind: 73 },
      (o) => o.ts === 1 && o.wind === 73,
    ),
  ],
  predict: {
    q: 'A hurricane has sustained winds of 125 mph. Which category is it?',
    options: ['Category 3', 'Category 2', 'Category 4', 'Category 5'],
    correct: 0,
    why: 'Category 3 covers 111–129 mph, so 125 mph is a major Category 3 hurricane.',
  },
  model:
    'Saffir–Simpson Hurricane Wind Scale thresholds in mph. The scale ignores storm surge, rainfall, size, and forward speed, which often drive the worst impacts.',
};

const types = ['Snow', 'Sleet', 'Freezing rain', 'Rain'];
const precip: TopicLab = {
  id: 'met-precip',
  title: 'Temperature layers and winter precipitation',
  lead: 'Snow falls from a cold cloud. Change the warm layer aloft, the depth of the cold layer near the ground, and the surface temperature to see what reaches the ground.',
  controls: [
    slider('warm', 'Warmest temperature aloft', -5, 6, 1, -2, '°C'),
    slider('depth', 'Depth of cold surface layer', 0, 1500, 100, 800, 'm'),
    slider('surface', 'Surface temperature', -10, 5, 1, -3, '°C'),
  ],
  run: (v) => {
    const needed = 300 + 150 * Math.max(0, v.warm);
    let type: number;
    if (v.warm <= 0) type = v.surface > 2 ? 3 : 0;
    else if (v.surface > 0) type = 3;
    else type = v.depth >= needed ? 1 : 2;
    const x = (t: number) => 320 + t * 20;
    const yH = (h: number) => 310 - h * 0.08;
    const coldTop = Math.max(v.depth, 100);
    const profile = `M${x(v.surface)},${yH(0)}L${x(Math.min(v.surface, -1))},${yH(coldTop)}L${x(v.warm)},${yH(coldTop + 600)}L${x(-10)},${yH(3200)}`;
    const scene: Shape[] = [
      line(x(0), 40, x(0), 310, 'muted', 1, true),
      text(x(0) + 6, 52, '0 °C', 'start', 'muted'),
      line(60, 310, 580, 310, 'ink', 2),
      path(profile, 'accent', false, 3),
      text(560, 80, `${types[type]} at the ground`, 'end', 'accent', 16),
      text(60, 300, 'ground', 'start', 'muted'),
    ];
    return {
      o: { type },
      metrics: [
        { label: 'Precipitation at the ground', value: types[type] },
        {
          label: 'Cold layer needed to refreeze',
          value: v.warm > 0 ? needed : 'No melting aloft',
          unit: v.warm > 0 ? 'm' : '',
        },
      ],
      sceneLabel: `Temperature profile producing ${types[type].toLowerCase()} at the ground`,
      scene,
    };
  },
  missions: [
    goal(
      'Make freezing rain reach the ground: melt the snow aloft and keep a shallow cold layer.',
      'Warm the layer aloft above 0 °C and thin the cold layer near the ground.',
      { warm: 3, depth: 300 },
      (o) => o.type === 2,
    ),
    goal(
      'Turn the melted drops into sleet by deepening the cold layer.',
      'Ice pellets need enough cold air to refreeze before landing.',
      { warm: 3, depth: 900 },
      (o, v) => o.type === 1 && v.warm >= 1,
    ),
    goal(
      'Keep the air aloft below freezing but warm the surface so plain rain falls.',
      'Snow melts in a warm layer near the ground if the surface is well above 0 °C.',
      { surface: 4 },
      (o, v) => o.type === 3 && v.warm <= 0,
    ),
  ],
  predict: {
    q: 'Snow melts in a warm layer aloft and then falls through a thin layer of below-freezing air at the ground. What lands?',
    options: ['Freezing rain', 'Snow', 'Sleet', 'Hail'],
    correct: 0,
    why: 'Drops have no time to refreeze in the thin cold layer, so they stay supercooled liquid and freeze on contact with surfaces.',
  },
  model:
    'A simplified profile: snow fully melts when the warm layer exceeds 0 °C, and refreezing needs a cold layer at least 300 m plus 150 m per degree of warming. Real forecasts use full soundings.',
};

export const meteorologyExtras: EventExtras = {
  eventId: 'meteorology',
  labs: [doppler, barb, lcl, saffir, precip],
  lessons: {
    'met-u1-l1': {
      labs: ['met-doppler'],
      phet: [
        phet(
          'blackbody-spectrum',
          'Blackbody Spectrum',
          'Infrared satellite images measure heat emitted by cloud tops. Colder objects emit less and at longer wavelengths, which is why the tallest, coldest storm tops stand out.',
          'Lower the temperature from 300 K to 220 K and describe how the emitted intensity and peak wavelength change.',
          'Use your result to explain why tall thunderstorm tops appear bright white on enhanced infrared images.',
        ),
      ],
      sort: sort(
        'Which observing tool gives this data?',
        ['Radiosonde', 'Doppler radar', 'Satellite', 'Surface station'],
        [
          ['A vertical profile of temperature and humidity', 0],
          ['Radial velocity showing rotation', 1],
          ['Water vapor imagery of a jet stream', 2],
          ['Hourly airport temperature and pressure', 3],
          ['Correlation coefficient showing debris', 1],
          ['Cold cloud-top temperatures in infrared', 2],
        ],
      ),
      checks: [
        check(
          4,
          'On Doppler velocity images, red colours usually show what?',
          ['Motion away from the radar', 'Motion toward the radar', 'Heavy hail'],
          'By convention, red marks outbound motion and green marks inbound motion along the radar beam.',
        ),
      ],
    },
    'met-u2-l1': {
      labs: ['met-barb'],
      sort: sort(
        'Decode the METAR group',
        ['Wind', 'Sky cover', 'Temperature/dew point', 'Weather'],
        [
          ['19025G38KT', 0],
          ['BKN045', 1],
          ['31/22', 2],
          ['+TSRA', 3],
          ['OVC010', 1],
          ['27015KT', 0],
        ],
      ),
      checks: [
        check(
          1,
          'A station model pressure reads 042. What is the sea-level pressure?',
          ['1004.2 mb', '904.2 mb', '1042 mb'],
          'Codes below about 500 take a leading 10, giving 1004.2 mb.',
        ),
      ],
    },
    'met-u3-l1': {
      labs: ['met-lcl'],
      sort: sort(
        'Stable or unstable?',
        ['Stable', 'Unstable'],
        [
          ['A lifted parcel is colder than its surroundings', 0],
          ['A temperature inversion sits near the ground', 0],
          ['CAPE is 3,000 J/kg', 1],
          ['The environment cools faster than the dry adiabatic rate', 1],
          ['A lifted parcel is warmer than its surroundings', 1],
          ['Temperature rises with height in a layer', 0],
        ],
      ),
      checks: [
        check(
          2,
          'Why does saturated air cool more slowly than dry air as it rises?',
          [
            'Condensation releases latent heat',
            'Water vapor is heavier than air',
            'Clouds block sunlight',
          ],
          'Released latent heat partly offsets cooling by expansion, giving the slower moist adiabatic rate.',
        ),
      ],
    },
    'met-u4-l1': {
      phet: [
        phet(
          'gas-properties',
          'Gas Properties',
          'Warm, moist air rises because heating makes gas expand and become less dense. This simulation connects temperature, volume, and pressure to the lift that starts storms.',
          'Heat the gas at constant pressure and record how the volume changes as temperature rises.',
          'Explain why a warm air mass is lifted when it meets a dense, cold air mass along a cold front.',
        ),
      ],
      sort: sort(
        'Name the air mass',
        ['Maritime tropical', 'Continental polar', 'Continental tropical'],
        [
          ['Warm, humid air from the Gulf of Mexico', 0],
          ['Cold, dry air from central Canada', 1],
          ['Hot, dry air from the desert Southwest', 2],
          ['Air east of a dryline with high dew points', 0],
          ['Air west of a dryline with very low dew points', 2],
          ['Air behind a strong winter cold front', 1],
        ],
      ),
      checks: [
        check(
          1,
          'Which boundary separates air masses that differ mainly in moisture?',
          ['A dryline', 'A warm front', 'An occluded front'],
          'A dryline marks a sharp dew-point change, often with similar temperatures on both sides.',
        ),
      ],
    },
    'met-u5-l1': {
      phet: [
        phet(
          'balloons-and-static-electricity',
          'Balloons and Static Electricity',
          'Lightning begins with charge separation by collisions, much like rubbing a balloon transfers electrons. This simulation shows how contact moves charge and builds attraction.',
          'Rub the balloon on the sweater and count the charges that move; describe which object becomes negative.',
          'Compare this to graupel and ice crystals colliding in a thunderstorm and explain how a cloud becomes charged.',
        ),
        phet(
          'john-travoltage',
          'John Travoltage',
          'A spark jumps once enough charge builds up, just as a lightning stroke begins when charge separation becomes large enough to break down the air.',
          'Build up charge on John and record how close his hand must be to the doorknob for a spark.',
          'Explain why lightning needs a large charge difference before a stepped leader forms.',
        ),
      ],
      sort: sort(
        'Which storm type fits?',
        ['Single cell', 'Multicell / squall line', 'Supercell', 'MCC'],
        [
          ['A rotating updraft lasting several hours', 2],
          ['A brief storm that rains itself out in an hour', 0],
          ['A long line of storms along a cold front', 1],
          ['A huge, round overnight storm cluster', 3],
          ['A hook echo and a weak-echo region', 2],
          ['New cells form where outflow lifts warm air', 1],
        ],
      ),
      checks: [
        check(
          5,
          'You hear thunder 9 seconds after a flash. About how far away was it?',
          ['3 km', '9 km', '1 km'],
          'Sound travels about 1 km every 3 seconds, so 9 seconds is roughly 3 km — close enough to be struck.',
        ),
      ],
    },
    'met-u6-l1': {
      labs: ['met-doppler'],
      sort: sort(
        'Tornado or straight-line wind?',
        ['Tornado', 'Straight-line wind'],
        [
          ['Debris converges toward the center of the path', 0],
          ['Trees fall outward in a starburst pattern', 1],
          ['A bow echo marks the strongest gusts', 1],
          ['A debris ball appears with low correlation coefficient', 0],
          ['A derecho damages a 500 km swath', 1],
          ['A tornadic vortex signature appears on velocity', 0],
        ],
      ),
      checks: [
        check(
          4,
          'What does the Enhanced Fujita scale use to rate a tornado?',
          ['Observed damage to indicators', 'Measured wind from anemometers', 'Funnel width'],
          'Surveyors match damage to indicators such as homes and trees to estimate wind speed after the event.',
        ),
      ],
    },
    'met-u7-l1': {
      labs: ['met-saffir'],
      sort: sort(
        'Which factor most raises this hurricane hazard?',
        ['Storm surge', 'Inland rain flooding', 'Wind damage'],
        [
          ['A wide, shallow continental shelf', 0],
          ['A slow-moving storm stalled over land', 1],
          ['Category 5 sustained winds in the eyewall', 2],
          ['Landfall at high tide in a bay', 0],
          ['Moisture-rich storm meeting mountains inland', 1],
          ['A compact storm with an intense eyewall', 2],
        ],
      ),
      checks: [
        check(
          3,
          'What does the Saffir–Simpson scale measure?',
          ['Sustained wind speed only', 'Storm surge height', 'Total rainfall'],
          'Categories use one-minute sustained winds; surge, rain, and size must be judged separately.',
        ),
      ],
    },
    'met-u8-l1': {
      labs: ['met-precip'],
      sort: sort(
        'Watch or warning?',
        ['Watch: be prepared', 'Warning: act now'],
        [
          ['Conditions are favorable for tornadoes later today', 0],
          ['A tornado has been spotted moving toward town', 1],
          ['Flash flooding is occurring on local roads', 1],
          ['Severe thunderstorms may develop this afternoon', 0],
          ['Radar shows rotation heading for your county', 1],
          ['A winter storm could bring heavy snow tomorrow', 0],
        ],
      ),
      checks: [
        check(
          3,
          'What is the chance of a “100-year” rain event in any single year?',
          ['1%', '100%', '10%'],
          'The return period is the inverse of the annual probability, so 1/100 = 1% each year.',
        ),
      ],
    },
  },
};
