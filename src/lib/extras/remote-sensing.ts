import { check, phet, sort, type EventExtras } from '../lesson-extras.ts';
import {
  choice,
  circle,
  goal,
  line,
  near,
  path,
  rect,
  slider,
  swatch,
  text,
  toggle,
  type TopicLab,
} from '../topic-lab-kit.ts';

const aerial: TopicLab = {
  id: 'remote-aerial',
  title: 'Scale of a vertical aerial photograph',
  lead: 'The earliest remote sensing was a camera looking straight down. Similar triangles link the lens, the flying height, and the size of what you see.',
  controls: [
    slider('focal', 'Lens focal length', 50, 300, 2, 100, 'mm'),
    slider('height', 'Flying height above the ground', 500, 10000, 20, 3000, 'm'),
    slider('photo', 'Length measured on the photo', 1, 50, 1, 10, 'mm'),
  ],
  run: (v) => {
    const n = (v.height * 1000) / v.focal,
      ground = (v.photo * n) / 1000,
      half = Math.min(230, 60 + v.height / 60);
    return {
      o: { n, ground },
      metrics: [
        { label: 'Photo scale', value: `1 : ${Math.round(n).toLocaleString('en-US')}` },
        { label: 'Ground length of the measured feature', value: ground, unit: 'm' },
        { label: 'Ground covered by a 230 mm frame', value: (230 * n) / 1e6, unit: 'km' },
      ],
      sceneLabel: `Aerial camera at ${v.height} metres with a ${v.focal} millimetre lens giving a scale of 1 to ${Math.round(n)}`,
      scene: [
        line(60, 290, 580, 290, 'green', 4),
        path(`M320 70L${320 - half} 290M320 70L${320 + half} 290`, 'gold', false, 1.5, 1, true),
        rect(300, 50, 40, 20, 'ink', true, 1, 4),
        line(270, 46, 370, 46, 'ink', 4),
        text(320, 34, `lens f = ${v.focal} mm`, 'middle'),
        line(40, 70, 40, 290, 'muted', 1.5),
        text(48, 180, `H = ${v.height} m`, 'start', 'muted'),
        text(320, 314, `ground footprint ∝ H / f`, 'middle', 'muted'),
      ],
    };
  },
  missions: [
    goal(
      'With a 152 mm mapping lens, find the flying height that gives a photo scale of 1 : 20,000.',
      'Scale number = flying height ÷ focal length, in the same units.',
      { focal: 152, height: 3040 },
      (o, v) => v.focal === 152 && near(o.n, 20000, 1),
    ),
    goal(
      'At a scale of 1 : 20,000, show that a 5 mm feature on the photo is 100 m long on the ground.',
      'Use a 100 mm lens at 2,000 m, then set the measured length.',
      { focal: 100, height: 2000, photo: 5 },
      (o, v) => near(o.n, 20000, 100) && v.photo === 5,
    ),
    goal(
      'Take a large-scale photograph: a scale number below 5,000.',
      'Fly low with a long lens.',
      { focal: 300, height: 1000 },
      (o) => o.n < 5000,
    ),
  ],
  predict: {
    q: 'An aircraft climbs to twice its original height and photographs the same area with the same camera. Features on the photo are now…',
    options: ['Half as long', 'Twice as long', 'The same size', 'One quarter as long'],
    correct: 0,
    why: 'Scale = focal length ÷ flying height. Doubling the height doubles the scale number, so every length on the image is halved (and areas are quartered).',
  },
  model:
    'Vertical photograph over flat terrain: scale = f / H. Relief displacement, camera tilt, and lens distortion make the scale vary across a real photograph, which is why orthorectification is needed before measuring.',
};

const lidar: TopicLab = {
  id: 'remote-lidar',
  title: 'Lidar returns from a forest canopy',
  lead: 'An airborne laser pulse reflects first from the treetops and last from the ground. The delay between the two is the canopy height.',
  controls: [
    slider('alt', 'Aircraft height above the ground', 500, 3000, 50, 1000, 'm'),
    slider('canopy', 'Canopy height', 0, 60, 0.5, 20, 'm'),
    slider('pulse', 'Laser pulse duration', 1, 20, 1, 5, 'ns'),
  ],
  run: (v) => {
    const c = 0.299792458,
      dt = (2 * v.canopy) / c,
      res = (c * v.pulse) / 2,
      sep = v.canopy > res ? 1 : 0,
      w = v.pulse * 0.6;
    return {
      o: { dt, res, sep },
      metrics: [
        {
          label: 'First return (canopy top) after',
          value: (2 * (v.alt - v.canopy)) / c,
          unit: 'ns',
        },
        { label: 'Last return (ground) after', value: (2 * v.alt) / c, unit: 'ns' },
        { label: 'Delay between the two returns', value: dt, unit: 'ns' },
        { label: 'Range resolution of this pulse', value: res, unit: 'm' },
        {
          label: 'Are the returns distinguishable?',
          value:
            v.canopy === 0
              ? 'Bare ground: a single return'
              : sep
                ? 'Yes — two separate peaks'
                : 'No — the peaks merge',
        },
      ],
      plot: {
        title: 'Returned signal',
        x: [-50, 450, 'Time after the first return (ns)'],
        y: [0, 1.3, 'Relative intensity'],
        curves: [{ f: (t) => Math.exp(-((t / w) ** 2)) + 0.8 * Math.exp(-(((t - dt) / w) ** 2)) }],
        vlines: [{ x: Math.min(450, dt), label: 'ground' }],
      },
    };
  },
  missions: [
    goal(
      'Find the canopy height whose two returns arrive 200 ns apart.',
      'Height = speed of light × delay ÷ 2.',
      { canopy: 30 },
      (o) => near(o.dt, 200, 1.5),
    ),
    goal(
      'For a 1.5 m shrub, find the longest pulse that still separates its top from the ground.',
      'The range resolution c·τ/2 must be smaller than the shrub.',
      { canopy: 1.5, pulse: 9 },
      (o, v) => v.canopy === 1.5 && o.sep === 1 && v.pulse >= 9,
    ),
    goal(
      'Show vegetation whose return merges with the ground return.',
      'Make the plants shorter than the pulse’s range resolution.',
      { canopy: 1, pulse: 10 },
      (o, v) => v.canopy > 0 && o.sep === 0,
    ),
  ],
  predict: {
    q: 'A lidar return from the treetops arrives 100 ns before the return from the ground. The canopy is about…',
    options: ['15 m tall', '30 m tall', '100 m tall', '3 m tall'],
    correct: 0,
    why: 'Light travels about 0.3 m per nanosecond, and the pulse covers the extra distance twice: 0.3 × 100 ÷ 2 = 15 m.',
  },
  model:
    'Two-way travel time t = 2R / c with c = 0.2998 m/ns and nadir pointing. Returns are drawn as Gaussians whose width scales with pulse duration; real waveforms also depend on canopy density, beam divergence, and detector response.',
};

const orbit: TopicLab = {
  id: 'remote-orbit',
  title: 'Orbit altitude, period, and revisit',
  lead: 'Altitude fixes how fast a satellite circles the Earth. Together with swath width, that decides how often it can see the same place.',
  controls: [
    slider('alt', 'Altitude (low Earth orbit)', 300, 2000, 5, 500, 'km'),
    slider('swath', 'Swath width', 10, 3000, 10, 200, 'km'),
    toggle('geo', 'Use geostationary altitude instead (35,786 km)'),
  ],
  run: (v) => {
    const h = v.geo ? 35786 : v.alt,
      period = (2 * Math.PI * Math.sqrt((6371 + h) ** 3 / 398600)) / 60,
      perDay = 1440 / period,
      revisit = v.geo ? 0 : 40075 / (v.swath * perDay),
      ring = v.geo ? 150 : 62 + (h / 2000) * 26;
    return {
      o: { period, perDay, revisit },
      metrics: [
        { label: 'Orbital period', value: period, unit: 'min' },
        { label: 'Orbits per day', value: perDay },
        {
          label: 'Speed over the ground',
          value: v.geo ? 0 : (2 * Math.PI * 6371) / (period * 60),
          unit: 'km/s',
        },
        {
          label: 'Days to cover the whole equator',
          value: v.geo
            ? 'Not applicable — it watches one hemisphere continuously'
            : Number(revisit.toFixed(2)),
        },
      ],
      sceneLabel: `Earth with a satellite orbit at ${h} kilometres; period ${period.toFixed(1)} minutes`,
      scene: [
        circle(320, 170, 60, 'cool', true, 0.5),
        text(320, 174, 'Earth', 'middle'),
        circle(320, 170, ring, 'slot', false),
        circle(320 + ring, 170, 6, 'gold'),
        text(
          320,
          326,
          v.geo
            ? 'Geostationary orbit drawn to a compressed scale'
            : 'Low Earth orbit (altitude exaggerated for visibility)',
          'middle',
          'muted',
          11,
        ),
        text(320 + ring + 12, 166, `${h.toLocaleString('en-US')} km`, 'start', 'slot'),
      ],
    };
  },
  missions: [
    goal(
      'Find the altitude that gives a period of about 99 minutes, as for Landsat.',
      'It is near 700 km.',
      { alt: 705 },
      (o, v) => v.geo === 0 && near(o.period, 98.8, 0.15),
    ),
    goal(
      'In low Earth orbit, choose a swath wide enough to cover the whole equator in two days or less.',
      'Coverage per day = swath × orbits per day.',
      { swath: 1400 },
      (o, v) => v.geo === 0 && o.revisit <= 2,
    ),
    goal(
      'Switch to geostationary altitude and confirm the period matches one rotation of the Earth.',
      'One sidereal day is about 1,436 minutes.',
      { geo: 1 },
      (o) => near(o.period, 1436, 2),
    ),
  ],
  predict: {
    q: 'A geostationary satellite appears fixed in the sky because…',
    options: [
      'Its orbital period equals Earth’s rotation period and it orbits above the equator',
      'It is too far away for gravity to act on it',
      'It hovers using thrusters',
      'It orbits over the poles',
    ],
    correct: 0,
    why: 'At about 35,786 km a circular equatorial orbit takes one sidereal day, so the satellite keeps pace with the ground beneath it.',
  },
  model:
    'Circular orbit, T = 2π√((R + h)³ / μ) with R = 6,371 km and μ = 398,600 km³/s². Equatorial coverage time = circumference ÷ (swath × orbits per day), ignoring overlap, orbit inclination, and off-nadir pointing, all of which change real revisit times.',
};

const bandNames = ['Blue', 'Green', 'Red', 'Near-infrared', 'Shortwave-infrared'];
const surfaces: [string, number[]][] = [
  ['Healthy vegetation', [0.04, 0.1, 0.05, 0.5, 0.25]],
  ['Stressed vegetation', [0.06, 0.11, 0.1, 0.3, 0.3]],
  ['Clear water', [0.08, 0.06, 0.03, 0.01, 0.005]],
  ['Bare soil', [0.1, 0.15, 0.2, 0.28, 0.35]],
  ['Concrete', [0.2, 0.22, 0.24, 0.27, 0.28]],
  ['Snow', [0.95, 0.95, 0.93, 0.85, 0.1]],
];
const composite: TopicLab = {
  id: 'remote-composite',
  title: 'Building colour composites from bands',
  lead: 'A display has three colour channels; a sensor has more bands than that. Which band you send to which channel decides what stands out.',
  controls: [
    choice('r', 'Band shown as red', bandNames, 0),
    choice('g', 'Band shown as green', bandNames, 1),
    choice('b', 'Band shown as blue', bandNames, 2),
  ],
  run: (v) => {
    const level = (refl: number) => Math.round(255 * Math.min(1, refl * 2)),
      colour = (bands: number[]) =>
        `rgb(${level(bands[v.r])},${level(bands[v.g])},${level(bands[v.b])})`,
      snow = [v.r, v.g, v.b].map((band) => surfaces[5][1][band]),
      veg = surfaces[0][1];
    return {
      o: {
        natural: v.r === 2 && v.g === 1 && v.b === 0 ? 1 : 0,
        snowWhite: Math.min(...snow) > 0.5 ? 1 : 0,
        vegRed: veg[v.r] - Math.max(veg[v.g], veg[v.b]),
      },
      metrics: [
        {
          label: 'Composite',
          value: `${bandNames[v.r]} / ${bandNames[v.g]} / ${bandNames[v.b]} as R / G / B`,
        },
        {
          label: 'Type',
          value: v.r === 2 && v.g === 1 && v.b === 0 ? 'Natural (true) colour' : 'False colour',
        },
        {
          label: 'Healthy vegetation appears',
          value:
            veg[v.r] - Math.max(veg[v.g], veg[v.b]) > 0.15
              ? 'Strongly red'
              : veg[v.g] - Math.max(veg[v.r], veg[v.b]) > 0.15
                ? 'Strongly green'
                : 'Without a strong colour cast',
        },
        {
          label: 'Snow appears',
          value: Math.min(...snow) > 0.5 ? 'White' : 'Coloured — separable from white cloud',
        },
      ],
      sceneLabel: `Six surface types rendered in a ${bandNames[v.r]}, ${bandNames[v.g]}, ${bandNames[v.b]} composite`,
      scene: [
        ...surfaces.flatMap(([name, bands], i) => [
          swatch(70 + (i % 3) * 180, 50 + Math.floor(i / 3) * 130, 150, 84, colour(bands), 8),
          rect(70 + (i % 3) * 180, 50 + Math.floor(i / 3) * 130, 150, 84, 'muted', false, 1, 8),
          text(145 + (i % 3) * 180, 152 + Math.floor(i / 3) * 130, name, 'middle', 'ink', 12),
        ]),
        text(
          320,
          320,
          'Display colours use a ×2 linear stretch of typical surface reflectance',
          'middle',
          'muted',
          11,
        ),
      ],
    };
  },
  missions: [
    goal(
      'Build a natural-colour composite.',
      'Send each visible band to its own display channel.',
      { r: 2, g: 1, b: 0 },
      (o) => o.natural === 1,
    ),
    goal(
      'Build the standard false-colour composite that makes healthy vegetation bright red.',
      'Near-infrared to red, red to green, green to blue.',
      { r: 3, g: 2, b: 1 },
      (o, v) => v.r === 3 && v.g === 2 && v.b === 1,
    ),
    goal(
      'Find a composite in which snow is no longer white, so it can be told apart from cloud.',
      'Snow is bright in the visible but dark in the shortwave-infrared.',
      { r: 4, g: 3, b: 2 },
      (o) => o.snowWhite === 0,
    ),
  ],
  predict: {
    q: 'In a standard false-colour composite with the near-infrared band shown as red, healthy vegetation appears…',
    options: ['Bright red', 'Bright green', 'Black', 'Blue'],
    correct: 0,
    why: 'Leaf cell structure reflects near-infrared strongly while chlorophyll absorbs red light, so the red display channel is far brighter than the other two.',
  },
  model:
    'Representative surface reflectances in five broad bands, shown with a simple linear stretch. Actual values vary with species, moisture, sun angle, and atmosphere, and image-processing software applies scene-dependent stretches.',
};

const gsd: TopicLab = {
  id: 'remote-gsd',
  title: 'Designing a sensor’s spatial and radiometric resolution',
  lead: 'Pixel size on the ground follows from altitude, focal length, and detector size. Bit depth decides how finely brightness is recorded.',
  controls: [
    slider('alt', 'Orbit altitude', 400, 900, 5, 705, 'km'),
    slider('focal', 'Telescope focal length', 0.2, 5, 0.1, 1, 'm'),
    slider('pitch', 'Detector element size', 2, 40, 1, 10, 'µm'),
    slider('bits', 'Radiometric depth', 6, 16, 1, 8, 'bits'),
  ],
  run: (v) => {
    const size = (v.alt * 1000 * v.pitch * 1e-6) / v.focal,
      levels = 2 ** v.bits;
    return {
      o: { size, levels },
      metrics: [
        { label: 'Ground sample distance', value: size, unit: 'm' },
        { label: 'Pixels needed to cover one hectare', value: 10000 / size ** 2 },
        { label: 'Brightness levels recorded', value: levels },
        {
          label: 'Smallest reflectance step distinguishable',
          value: (100 / levels).toPrecision(2) + ' %',
        },
      ],
      bars: {
        title: 'Pixel size against familiar objects (m, capped at 120)',
        max: 120,
        items: [
          { label: 'This sensor’s pixel', value: Math.min(120, size), tone: 'slot' },
          { label: 'Car', value: 4.5, tone: 'muted' },
          { label: 'House', value: 12, tone: 'muted' },
          { label: 'Football pitch length', value: 105, tone: 'muted' },
        ],
      },
    };
  },
  missions: [
    goal(
      'From 705 km, design a pixel within 1.5 m of 30 m — the classic Landsat scale.',
      'Pixel = altitude × detector size ÷ focal length. Try a large detector with a focal length just under 1 m.',
      { focal: 0.9, pitch: 38 },
      (o, v) => v.alt === 705 && near(o.size, 30, 1.5),
    ),
    goal(
      'Design a sub-metre imaging system.',
      'A long focal length with small detector elements.',
      { focal: 5, pitch: 5 },
      (o) => o.size < 1,
    ),
    goal(
      'Find the smallest bit depth that records more than 1,000 brightness levels.',
      'Each extra bit doubles the number of levels.',
      { bits: 10 },
      (o, v) => o.levels > 1000 && v.bits <= 10,
    ),
  ],
  predict: {
    q: 'A new sensor halves the ground sample distance while imaging the same area. The number of pixels in the image is multiplied by…',
    options: ['Four', 'Two', 'One half', 'Eight'],
    correct: 0,
    why: 'Pixels tile a two-dimensional area, so halving their side length quadruples the count — and the data volume.',
  },
  model:
    'Nadir-viewing pinhole geometry: GSD = H × p / f. Real spatial resolution is also limited by diffraction, motion blur, and atmospheric turbulence. Radiometric levels = 2^bits; usable precision further depends on signal-to-noise ratio.',
};

const grid: TopicLab = {
  id: 'remote-grid',
  title: 'What a degree is worth on the ground',
  lead: 'Latitude lines are evenly spaced, but meridians converge toward the poles. The same number of degrees covers very different ground at different latitudes.',
  controls: [
    slider('lat', 'Latitude of the cell’s centre', 0, 85, 1, 0, '°'),
    slider('dlon', 'Width in longitude', 0.1, 5, 0.1, 1, '°'),
    slider('dlat', 'Height in latitude', 0.1, 5, 0.1, 1, '°'),
  ],
  run: (v) => {
    const perDeg = 111.32 * Math.cos((v.lat * Math.PI) / 180),
      ew = perDeg * v.dlon,
      ns = 110.57 * v.dlat,
      wide = (perDeg / 111.32) * 200;
    return {
      o: { perDeg, ew, ns, area: ew * ns },
      metrics: [
        { label: 'One degree of longitude here', value: perDeg, unit: 'km' },
        { label: 'East–west extent of the cell', value: ew, unit: 'km' },
        { label: 'North–south extent of the cell', value: ns, unit: 'km' },
        { label: 'Approximate area', value: ew * ns, unit: 'km²' },
      ],
      sceneLabel: `A one-degree cell at latitude ${v.lat} compared with the same cell at the equator`,
      scene: [
        rect(120, 190, 200, 100, 'muted', false, 1),
        text(220, 310, 'equator: 1° of longitude = 111 km', 'middle', 'muted', 11),
        rect(520 - wide, 190, wide, 100, 'slot', true, 0.4),
        rect(520 - wide, 190, wide, 100, 'slot', false, 1),
        text(520 - wide / 2, 310, `at ${v.lat}°: ${perDeg.toFixed(1)} km`, 'middle', 'slot', 11),
        path('M320 150Q250 90 320 40Q390 90 320 150', 'muted', false, 1.5),
        line(320, 40, 320, 150, 'muted', 1, true),
        text(320, 30, 'meridians converge toward the pole', 'middle', 'muted', 11),
      ],
    };
  },
  missions: [
    goal(
      'Find the latitude at which a degree of longitude is half its length at the equator.',
      'Length scales with the cosine of latitude.',
      { lat: 60 },
      (o) => near(o.perDeg, 55.66, 0.2),
    ),
    goal(
      'At the equator, build a cell close to 100 km on each side.',
      'A degree is about 111 km there, so use nine tenths of a degree both ways.',
      { dlon: 0.9, dlat: 0.9 },
      (o, v) => v.lat === 0 && near(o.ew, 100, 1) && near(o.ns, 100, 1),
    ),
    goal(
      'Show a 1° × 1° cell with an area under 3,000 km².',
      'Move it to a high latitude.',
      { lat: 76 },
      (o, v) => near(v.dlon, 1, 1e-9) && near(v.dlat, 1, 1e-9) && o.area < 3000,
    ),
  ],
  predict: {
    q: 'Moving from the equator toward a pole, the ground distance spanned by one degree of longitude…',
    options: ['Shrinks toward zero', 'Stays the same', 'Grows larger', 'Doubles'],
    correct: 0,
    why: 'All meridians meet at the poles. One degree of longitude spans about 111 km at the equator, half that at 60°, and nothing at 90°.',
  },
  model:
    'Spherical-Earth approximation: 1° of longitude = 111.32 km × cos(latitude); 1° of latitude ≈ 110.57 km. Area is treated as a rectangle, which is adequate for small cells; precise work uses an ellipsoid and a projected coordinate system.',
};

const atmosphere: TopicLab = {
  id: 'remote-atmosphere',
  title: 'Rayleigh scattering and the path through the air',
  lead: 'Air molecules scatter short wavelengths far more than long ones, and a low sun sends light through much more air. Both reshape what a sensor records.',
  controls: [
    slider('wave', 'Wavelength', 400, 2500, 10, 550, 'nm'),
    slider('elev', 'Sun elevation above the horizon', 5, 90, 1, 60, '°'),
  ],
  run: (v) => {
    const rel = (l: number) => (550 / l) ** 4,
      mass = 1 / Math.sin((v.elev * Math.PI) / 180),
      through = (l: number) => Math.exp(-0.098 * rel(l) * mass);
    return {
      o: { rel: rel(v.wave), mass, through: through(v.wave) },
      metrics: [
        { label: 'Scattering relative to green light (550 nm)', value: rel(v.wave), unit: '×' },
        { label: 'Air mass along the sunbeam', value: mass, unit: '× vertical' },
        {
          label: 'Direct beam surviving Rayleigh scattering',
          value: through(v.wave) * 100,
          unit: '%',
        },
      ],
      plot: {
        title: 'Direct-beam transmission at this sun elevation',
        x: [400, 2500, 'Wavelength (nm)'],
        y: [0, 1, 'Fraction transmitted'],
        curves: [
          { f: through, label: `sun at ${v.elev}°` },
          { f: (l) => Math.exp(-0.098 * rel(l)), label: 'sun overhead', dash: true, tone: 'muted' },
        ],
        points: [
          { x: v.wave, y: through(v.wave), label: `${(through(v.wave) * 100).toFixed(0)}%` },
        ],
      },
    };
  },
  missions: [
    goal(
      'Find the wavelength scattered about sixteen times less than green light.',
      'Scattering falls as 1/λ⁴, so double the wavelength.',
      { wave: 1100 },
      (o) => near(o.rel, 1 / 16, 0.004),
    ),
    goal(
      'Find a visible wavelength scattered about twice as much as green light.',
      'Go toward the blue: about 460 nm.',
      { wave: 460 },
      (o) => near(o.rel, 2, 0.08),
    ),
    goal(
      'With blue light at 450 nm, lower the sun until less than half of the direct beam gets through.',
      'A low sun means a long slant path.',
      { wave: 450, elev: 18 },
      (o, v) => v.wave === 450 && o.through < 0.5,
    ),
  ],
  predict: {
    q: 'Atmospheric haze from molecular scattering degrades which band of a satellite image the most?',
    options: ['Blue', 'Red', 'Near-infrared', 'Shortwave-infrared'],
    correct: 0,
    why: 'Rayleigh scattering is proportional to 1/λ⁴, so blue light is scattered several times more than red and far more than infrared.',
  },
  model:
    'Rayleigh optical depth ≈ 0.098 at 550 nm scaling as λ⁻⁴; plane-parallel air mass 1/sin(elevation); Beer–Lambert transmission. Aerosol (Mie) scattering and gas absorption bands, which dominate in many real scenes, are not included.',
};

const balance: TopicLab = {
  id: 'remote-balance',
  title: 'Planetary energy balance',
  lead: 'A planet settles at the temperature where the energy it radiates equals the sunlight it absorbs. Albedo and the greenhouse effect move that balance point.',
  controls: [
    slider('albedo', 'Planetary albedo', 0, 0.9, 0.01, 0.2, ''),
    slider('s', 'Solar constant', 1000, 1600, 10, 1360, 'W/m²'),
    slider(
      'eps',
      'Effective emissivity to space (lower = stronger greenhouse)',
      0.5,
      1,
      0.01,
      1,
      '',
    ),
  ],
  run: (v) => {
    const temp = (a: number) => ((v.s * (1 - a)) / (4 * 5.670374e-8 * v.eps)) ** 0.25;
    return {
      o: { temp: temp(v.albedo), absorbed: (v.s * (1 - v.albedo)) / 4 },
      metrics: [
        { label: 'Equilibrium temperature', value: temp(v.albedo), unit: 'K' },
        { label: 'In Celsius', value: temp(v.albedo) - 273.15, unit: '°C' },
        {
          label: 'Sunlight absorbed, global mean',
          value: (v.s * (1 - v.albedo)) / 4,
          unit: 'W/m²',
        },
        { label: 'Sunlight reflected, global mean', value: (v.s * v.albedo) / 4, unit: 'W/m²' },
      ],
      plot: {
        title: 'Brighter planets are colder',
        x: [0, 0.9, 'Albedo'],
        y: [150, 350, 'Equilibrium temperature (K)'],
        curves: [{ f: temp }],
        hlines: [{ y: 273.15, label: 'freezing point' }],
        points: [{ x: v.albedo, y: temp(v.albedo), label: `${temp(v.albedo).toFixed(0)} K` }],
      },
    };
  },
  missions: [
    goal(
      'With no greenhouse effect, set Earth’s albedo of 0.30 and read its effective temperature.',
      'It comes out near 255 K — well below freezing.',
      { albedo: 0.3 },
      (o, v) => near(v.albedo, 0.3, 1e-9) && v.eps === 1 && near(o.temp, 255, 1),
    ),
    goal(
      'Keep the albedo at 0.30 and add a greenhouse effect until the temperature reaches about 288 K.',
      'Lower the effective emissivity to roughly 0.61.',
      { albedo: 0.3, eps: 0.61 },
      (o, v) => near(v.albedo, 0.3, 1e-9) && near(o.temp, 288, 1),
    ),
    goal(
      'Create a “snowball” planet colder than 230 K with no greenhouse effect.',
      'Cover it in ice: raise the albedo above one half.',
      { albedo: 0.55 },
      (o, v) => v.eps === 1 && o.temp < 230,
    ),
  ],
  predict: {
    q: 'Earth’s albedo increases because ice cover expands, with nothing else changing. Its equilibrium temperature…',
    options: ['Falls', 'Rises', 'Stays the same', 'Oscillates'],
    correct: 0,
    why: 'More sunlight is reflected and less absorbed, so the planet balances at a lower temperature — and cooling grows more ice, a positive feedback.',
  },
  model:
    'Zero-dimensional balance: S(1 − α)/4 = εσT⁴. The single emissivity is a crude stand-in for the greenhouse effect; real climate has vertical structure, feedbacks, and regional differences that this model cannot represent.',
};

const ozone: TopicLab = {
  id: 'remote-ozone',
  title: 'Ozone column and surface ultraviolet',
  lead: 'Satellites map total ozone in Dobson units. Less ozone overhead, or a higher sun, means more ultraviolet reaching the ground.',
  controls: [
    slider('ozone', 'Total ozone column', 100, 500, 5, 300, 'DU'),
    slider('sza', 'Solar zenith angle (0° = sun overhead)', 0, 80, 1, 30, '°'),
  ],
  run: (v) => {
    const uvi = (o3: number) =>
        12.5 * Math.cos((v.sza * Math.PI) / 180) ** 2.42 * (o3 / 300) ** -1.23,
      now = uvi(v.ozone);
    return {
      o: { uvi: now, ratio: now / uvi(300) },
      metrics: [
        { label: 'Clear-sky UV index', value: now },
        {
          label: 'Exposure category',
          value:
            now < 3
              ? 'Low'
              : now < 6
                ? 'Moderate'
                : now < 8
                  ? 'High'
                  : now < 11
                    ? 'Very high'
                    : 'Extreme',
        },
        { label: 'Relative to a 300 DU column', value: now / uvi(300), unit: '×' },
      ],
      plot: {
        title: 'UV index against ozone at this sun angle',
        x: [100, 500, 'Total ozone (Dobson units)'],
        y: [0, 40, 'Clear-sky UV index'],
        curves: [{ f: uvi }],
        vlines: [{ x: 220, label: 'ozone-hole threshold' }],
        points: [{ x: v.ozone, y: now, label: now.toFixed(1) }],
      },
    };
  },
  missions: [
    goal(
      'With the sun 30° from overhead, find the ozone column that raises the UV index by about 25%.',
      'UV rises roughly 1.2% for each 1% of ozone lost: try 250 DU.',
      { ozone: 250 },
      (o, v) => v.sza === 30 && near(o.ratio, 1.25, 0.02),
    ),
    goal(
      'Model an ozone-hole column of 150 DU at the same sun angle and read the UV index.',
      'Halving the column far more than doubles the index.',
      { ozone: 150 },
      (o, v) => v.ozone === 150 && v.sza === 30,
    ),
    goal(
      'With a normal 300 DU column, find a sun angle at which the UV index is “low” (below 3).',
      'Late afternoon or winter: a zenith angle near 57° or more.',
      { sza: 57 },
      (o, v) => v.ozone === 300 && o.uvi < 3,
    ),
  ],
  predict: {
    q: 'A 1% decrease in the ozone column increases the clear-sky UV index by roughly…',
    options: ['1.2%', '0.1%', '10%', '50%'],
    correct: 0,
    why: 'The response is a power law with an exponent of about −1.2, so small ozone losses are slightly amplified in sunburning ultraviolet.',
  },
  model:
    'Empirical clear-sky relation UVI ≈ 12.5 · cos(SZA)^2.42 · (Ω/300 DU)^−1.23 at sea level. Clouds, aerosols, altitude, and surface reflection (snow) change the real value substantially.',
};

const phenology: TopicLab = {
  id: 'remote-phenology',
  title: 'Reading a crop’s NDVI season',
  lead: 'A field’s greenness rises, peaks, and falls through the season. Comparing a date against the expected curve is how stress is spotted from orbit.',
  controls: [
    slider('doy', 'Day of year observed', 1, 365, 1, 100, ''),
    slider('plant', 'Planting day', 60, 180, 5, 120, ''),
    slider('stress', 'Peak greenness lost to stress', 0, 60, 5, 0, '%'),
  ],
  run: (v) => {
    const curve = (d: number, loss: number) =>
      0.15 +
      (0.85 * (1 - loss / 100) - 0.15) *
        (1 / (1 + Math.exp(-(d - v.plant - 35) / 8))) *
        (1 / (1 + Math.exp((d - v.plant - 125) / 10)));
    const now = curve(v.doy, v.stress),
      healthy = curve(v.doy, 0);
    return {
      o: { ndvi: now, healthy, delta: healthy - now },
      metrics: [
        { label: 'NDVI on this date', value: Number(now.toFixed(3)) },
        { label: 'Expected for a healthy field', value: Number(healthy.toFixed(3)) },
        { label: 'Shortfall', value: Number((healthy - now).toFixed(3)) },
        {
          label: 'Growth stage',
          value:
            v.doy < v.plant
              ? 'Bare soil before planting'
              : v.doy < v.plant + 35
                ? 'Emergence and green-up'
                : v.doy < v.plant + 110
                  ? 'Full canopy'
                  : v.doy < v.plant + 150
                    ? 'Senescence'
                    : 'Harvested / residue',
        },
      ],
      plot: {
        title: 'NDVI through the year',
        x: [1, 365, 'Day of year'],
        y: [0, 1, 'NDVI'],
        curves: [
          { f: (d) => curve(d, v.stress), label: 'this field' },
          { f: (d) => curve(d, 0), label: 'healthy reference', dash: true, tone: 'muted' },
        ],
        points: [{ x: v.doy, y: now, label: now.toFixed(2) }],
      },
    };
  },
  missions: [
    goal(
      'For the unstressed field planted on day 120, find the first day its NDVI reaches 0.4.',
      'Green-up accelerates about a month after planting.',
      { doy: 151 },
      (o, v) => v.plant === 120 && v.stress === 0 && o.ndvi >= 0.4 && v.doy <= 151,
    ),
    goal(
      'Find a date in peak season on which NDVI exceeds 0.8.',
      'Look in the middle of the full-canopy period.',
      { doy: 200 },
      (o) => o.ndvi > 0.8,
    ),
    goal(
      'Near day 200, show a stressed field whose NDVI is at least 0.25 below the healthy reference.',
      'Raise the stress loss while watching the gap between the curves.',
      { doy: 200, stress: 40 },
      (o, v) => v.doy >= 180 && v.doy <= 220 && o.delta >= 0.25,
    ),
  ],
  predict: {
    q: 'To detect crop stress by comparing NDVI images from two years, the most informative pair of dates is…',
    options: [
      'The same growth stage in each year',
      'Midsummer in one year and midwinter in the other',
      'Any two cloud-free dates',
      'The planting day and the harvest day',
    ],
    correct: 0,
    why: 'NDVI changes strongly through the season. Unless phenology is matched, a normal seasonal difference will be mistaken for a change in crop condition.',
  },
  model:
    'Double-logistic seasonal curve between a bare-soil NDVI of 0.15 and a peak of 0.85, with stress reducing the peak. Timing constants are illustrative; real fields differ by crop, variety, weather, and management, and clouds leave gaps in the series.',
};

export const remoteSensingExtras: EventExtras = {
  eventId: 'remote-sensing',
  labs: [aerial, lidar, orbit, composite, gsd, grid, atmosphere, balance, ozone, phenology],
  lessons: {
    'remote-u1-l1': {
      labs: ['remote-aerial'],
      sort: sort(
        'Remote sensing, or in-situ measurement?',
        ['Remote sensing', 'In-situ (ground truth)'],
        [
          ['A satellite image of sea-surface temperature', 0],
          ['A buoy thermometer in the water', 1],
          ['Airborne lidar over a forest', 0],
          ['Measuring tree height with a tape and clinometer', 1],
          ['Weather radar', 0],
          ['A soil-moisture probe pushed into a field', 1],
        ],
      ),
      checks: [
        check(
          3,
          'Why is ground truth still needed when satellite imagery is available?',
          [
            'To calibrate and validate what the sensor’s signal actually represents',
            'Because satellites cannot see land',
            'To make the images more colourful',
            'It is not needed',
          ],
          'A sensor records radiance. Field measurements link that signal to the quantity of interest and reveal how often the interpretation is wrong.',
        ),
      ],
    },
    'remote-u2-l1': {
      labs: ['remote-lidar'],
      phet: [
        phet(
          'waves-intro',
          'Waves Intro',
          'Radar, lidar, and optical sensors all use waves. Fix the meaning of wavelength, frequency, and amplitude before comparing sensors.',
          'On the Light screen, raise the frequency. What happens to the wavelength, and does the wave travel any faster?',
          'Use the timer and tape to measure a wave’s speed, then check that speed = frequency × wavelength.',
          'Compare water, sound, and light screens: which need a medium, and what does that mean for sensing through space?',
        ),
      ],
      sort: sort(
        'Active or passive sensor?',
        ['Active (supplies its own energy)', 'Passive (records existing energy)'],
        [
          ['Synthetic aperture radar', 0],
          ['A multispectral imager recording reflected sunlight', 1],
          ['Lidar', 0],
          ['A thermal infrared radiometer', 1],
          ['A radar altimeter', 0],
          ['An aerial film camera', 1],
        ],
      ),
      checks: [
        check(
          2,
          'A calm lake appears very dark in a radar image because…',
          [
            'Its smooth surface reflects the pulse away from the sensor',
            'Water absorbs all radar energy',
            'Radar cannot reach water',
            'The lake is colder than land',
          ],
          'Side-looking radar records backscatter. A mirror-like surface sends the energy forward, away from the antenna; rough surfaces scatter some back.',
        ),
      ],
    },
    'remote-u3-l1': {
      labs: ['remote-orbit'],
      sort: sort(
        'Which orbit suits the mission?',
        ['Sun-synchronous polar orbit', 'Geostationary orbit'],
        [
          ['Imaging every place at the same local time of day', 0],
          ['Watching one hurricane develop minute by minute', 1],
          ['Global land-cover mapping at 30 m', 0],
          ['Continuous weather images of one hemisphere', 1],
          ['Near-polar coverage', 0],
          ['Fixed position relative to the ground', 1],
        ],
      ),
      checks: [
        check(
          1,
          'A sun-synchronous orbit is designed so that the satellite…',
          [
            'Crosses each latitude at about the same local solar time',
            'Stays over one point on the equator',
            'Always remains in sunlight',
            'Orbits the Sun rather than the Earth',
          ],
          'Consistent sun angle keeps shadows and illumination comparable from pass to pass, which matters for detecting change.',
        ),
      ],
    },
    'remote-u4-l1': {
      labs: ['remote-composite'],
      phet: [
        phet(
          'color-vision',
          'Color Vision',
          'A display mixes red, green, and blue light — exactly what a colour composite does with three chosen bands.',
          'On the RGB Bulbs screen, turn on red and green only. What colour is perceived?',
          'Find the three intensities that give white, then lower one channel and name the resulting tint.',
          'Relate this to a composite: if the near-infrared band drives the red bulb, what colour will bright vegetation be?',
        ),
      ],
      sort: sort(
        'Which surface has this spectral behaviour?',
        ['Healthy vegetation', 'Clear water', 'Dry bare soil'],
        [
          ['Low red, very high near-infrared reflectance', 0],
          ['Low reflectance that falls to nearly zero in the infrared', 1],
          ['Reflectance rising steadily from visible to shortwave-infrared', 2],
          ['A “red edge” near 700 nm', 0],
          ['Appears black in a near-infrared band', 1],
          ['Brighter when dry than when wet', 2],
        ],
      ),
      checks: [
        check(
          3,
          'A contrast stretch applied to an image changes…',
          [
            'How digital numbers are mapped to display brightness',
            'The reflectance of the ground',
            'The sensor’s spatial resolution',
            'The number of spectral bands',
          ],
          'Stretching is a display choice that spreads the occupied range of values across the screen’s range. The recorded data are unchanged.',
        ),
      ],
    },
    'remote-u5-l1': {
      labs: ['remote-gsd'],
      sort: sort(
        'Which type of resolution?',
        ['Spatial', 'Spectral', 'Temporal', 'Radiometric'],
        [
          ['Pixel size on the ground', 0],
          ['Number and width of wavelength bands', 1],
          ['How often the same place is imaged', 2],
          ['Number of brightness levels recorded', 3],
          ['A 5-day revisit', 2],
          ['12-bit quantisation', 3],
          ['A 10 m ground sample distance', 0],
        ],
      ),
      checks: [
        check(
          4,
          'A 30 m pixel covers half forest and half bare soil. Its recorded reflectance will be…',
          [
            'An area-weighted mixture of the two surfaces',
            'That of the forest only',
            'That of the soil only',
            'Zero, because the pixel is mixed',
          ],
          'A pixel integrates everything inside it. Mixed pixels are why sub-pixel features need spectral unmixing or finer resolution.',
        ),
      ],
    },
    'remote-u6-l1': {
      labs: ['remote-grid'],
      sort: sort(
        'What does the NDVI value suggest?',
        ['Dense healthy vegetation', 'Sparse or stressed vegetation', 'Water, snow, or cloud'],
        [
          ['NDVI = 0.82', 0],
          ['NDVI = 0.25', 1],
          ['NDVI = −0.15', 2],
          ['NDVI = 0.70', 0],
          ['NDVI = 0.18', 1],
          ['NDVI = −0.40', 2],
        ],
      ),
      checks: [
        check(
          2,
          'A pixel has near-infrared reflectance 0.50 and red reflectance 0.10. Its NDVI is…',
          ['0.67', '0.40', '5.0', '0.60'],
          'NDVI = (NIR − red) / (NIR + red) = 0.40 / 0.60 = 0.67.',
        ),
      ],
    },
    'remote-u7-l1': {
      labs: ['remote-atmosphere'],
      phet: [
        phet(
          'bending-light',
          'Bending Light',
          'Light changes direction when it crosses into a medium with a different refractive index. Measure the angles and test Snell’s law directly.',
          'Send a ray from air into water at 30°, 45°, and 60°. Record the refracted angles with the protractor.',
          'Check that n₁ sin θ₁ = n₂ sin θ₂ for each pair.',
          'Reverse the ray so it travels from water toward air and find the angle beyond which no light escapes.',
        ),
      ],
      sort: sort(
        'Which interaction with matter?',
        ['Reflection', 'Absorption', 'Scattering', 'Transmission'],
        [
          ['Sunlight bouncing off calm water toward the sensor', 0],
          ['Chlorophyll taking up red light', 1],
          ['Blue light redirected in all directions by air molecules', 2],
          ['Visible light passing through a clear atmosphere', 3],
          ['Water vapour removing energy in infrared bands', 1],
          ['Haze brightening the dark parts of an image', 2],
        ],
      ),
      checks: [
        check(
          0,
          'An electromagnetic wave’s frequency doubles while it travels in a vacuum. Its wavelength…',
          ['Halves', 'Doubles', 'Stays the same', 'Becomes zero'],
          'c = fλ and c is fixed in a vacuum, so frequency and wavelength are inversely proportional.',
        ),
      ],
    },
    'remote-u8-l1': {
      labs: ['remote-balance'],
      phet: [
        phet(
          'greenhouse-effect',
          'The Greenhouse Effect',
          'Watch sunlight arrive and infrared leave. Change greenhouse-gas concentration and cloud cover, and track the energy balance and surface temperature.',
          'On the Waves screen, compare the paths of sunlight and infrared with a low and then a high greenhouse-gas concentration.',
          'On the Photons screen, add a cloud. Does it affect incoming sunlight, outgoing infrared, or both?',
          'On the Layer Model screen, add absorbing layers one at a time and record the surface temperature. What pattern emerges?',
        ),
      ],
      sort: sort(
        'High or low albedo?',
        ['High albedo (reflects most sunlight)', 'Low albedo (absorbs most sunlight)'],
        [
          ['Fresh snow', 0],
          ['Open ocean', 1],
          ['Thick cloud', 0],
          ['Dark conifer forest', 1],
          ['Desert sand', 0],
          ['Asphalt', 1],
        ],
      ),
      checks: [
        check(
          0,
          'A surface receives 400 W/m² of sunlight and has an albedo of 0.25. It absorbs…',
          ['300 W/m²', '100 W/m²', '400 W/m²', '25 W/m²'],
          'Albedo is the reflected fraction, so 25% (100 W/m²) is reflected and the remaining 300 W/m² is absorbed.',
        ),
      ],
    },
    'remote-u9-l1': {
      labs: ['remote-ozone'],
      sort: sort(
        'Which part of the Earth system?',
        ['Atmosphere', 'Hydrosphere / cryosphere', 'Biosphere', 'Geosphere'],
        [
          ['Stratospheric ozone', 0],
          ['Sea-ice extent', 1],
          ['Chlorophyll concentration in the ocean', 2],
          ['Ground deformation before an eruption', 3],
          ['Carbon dioxide concentration', 0],
          ['Glacier retreat', 1],
          ['Forest cover', 2],
        ],
      ),
      checks: [
        check(
          3,
          'Stratospheric ozone matters for life at the surface mainly because it…',
          [
            'Absorbs most of the Sun’s harmful ultraviolet radiation',
            'Traps most of Earth’s outgoing heat',
            'Supplies the oxygen we breathe',
            'Causes rainfall',
          ],
          'Ozone in the stratosphere absorbs UV-B and UV-C. Ground-level ozone, by contrast, is a pollutant.',
        ),
      ],
    },
    'remote-u10-l1': {
      labs: ['remote-phenology'],
      sort: sort(
        'Sound change-detection practice, or a pitfall?',
        ['Sound practice', 'Pitfall'],
        [
          ['Comparing images from the same season', 0],
          ['Comparing a wet-season image with a dry-season image', 1],
          ['Co-registering the images before differencing', 0],
          ['Ignoring cloud shadows', 1],
          ['Checking a sample of changed pixels on the ground', 0],
          ['Using different sensors without cross-calibration', 1],
        ],
      ),
      checks: [
        check(
          2,
          'An irrigated field shows a sudden NDVI drop in midsummer while neighbouring fields do not. The most defensible first statement is…',
          [
            'Vegetation condition changed in that field; the cause needs further evidence',
            'The field has a fungal disease',
            'The satellite malfunctioned',
            'The farmer harvested early',
          ],
          'Imagery establishes what changed and where. Disease, water stress, pests, harvest, or hail can all lower NDVI, so the cause needs field or ancillary data.',
        ),
      ],
    },
  },
};
