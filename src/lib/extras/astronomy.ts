import { check, phet, sort, type EventExtras } from '../lesson-extras.ts';
import {
  arrow,
  circle,
  goal,
  line,
  near,
  path,
  rect,
  slider,
  text,
  type Shape,
  type TopicLab,
} from '../topic-lab-kit.ts';

const inverseSquare: TopicLab = {
  id: 'astro-inverse-square',
  title: 'Inverse-square flux bench',
  lead: 'One source, one detector. Luminosity belongs to the source; flux is what arrives on each square metre after the light has spread out.',
  controls: [
    slider('lum', 'Source luminosity', 0.25, 16, 0.25, 1, 'L☉'),
    slider('dist', 'Detector distance', 1, 10, 0.5, 2, 'units'),
  ],
  run: (v) => {
    const flux = v.lum / v.dist ** 2;
    const x = 90 + v.dist * 50,
      side = 8 + v.dist * 13;
    return {
      o: { flux, area: v.dist ** 2 },
      metrics: [
        { label: 'Flux at detector', value: flux, unit: 'relative' },
        { label: 'Area the light covers', value: v.dist ** 2, unit: '× the area at 1 unit' },
        { label: 'Luminosity (unchanged by distance)', value: v.lum, unit: 'L☉' },
      ],
      sceneLabel: `Light from a ${v.lum} solar-luminosity source spreading over ${v.dist ** 2} unit squares at distance ${v.dist}`,
      scene: [
        circle(60, 120, 10 + Math.sqrt(v.lum) * 5, 'gold'),
        text(60, 60, 'Source', 'middle'),
        line(60, 120, x, 120 - side / 2, 'gold', 1.5, true),
        line(60, 120, x, 120 + side / 2, 'gold', 1.5, true),
        rect(x - 3, 120 - side / 2, 6, side, 'slot', true, Math.min(1, 0.25 + flux)),
        text(x, 120 + side / 2 + 20, `d = ${v.dist}`, 'middle'),
        text(
          60,
          230,
          `The same light now crosses ${v.dist ** 2} unit squares, so each square receives`,
        ),
        text(60, 250, `1/${v.dist ** 2} of what it would receive at 1 unit.`),
        ...Array.from({ length: Math.min(100, v.dist ** 2) }, (_, i) =>
          rect(60 + (i % 25) * 20, 270 + Math.floor(i / 25) * 14, 16, 10, 'accent', true, 0.7),
        ),
      ],
      plot: {
        title: 'Flux falls as 1/d²',
        x: [1, 10, 'Distance (units)'],
        y: [0, 4, 'Flux (relative)'],
        curves: [
          { f: (d) => v.lum / d ** 2, label: `${v.lum} L☉ source` },
          { f: (d) => 1 / d ** 2, label: '1 L☉ reference', dash: true, tone: 'muted' },
        ],
        points: [{ x: v.dist, y: flux, label: `F = ${flux.toPrecision(3)}` }],
      },
    };
  },
  missions: [
    goal(
      'Hold luminosity at 1 L☉. The flux at 2 units is 0.25 — find the distance where it is one quarter of that.',
      'One quarter of the flux needs four times the area, which means twice the distance.',
      { dist: 4 },
      (o, v) => v.lum === 1 && near(o.flux, 0.0625, 0.002),
    ),
    goal(
      'Make a 4 L☉ source deliver exactly the flux (0.25) that the 1 L☉ source gave at 2 units.',
      'Four times the power must be spread over four times the area.',
      { lum: 4, dist: 4 },
      (o, v) => v.lum === 4 && near(o.flux, 0.25, 0.004),
    ),
    goal(
      'Produce a flux of exactly 1.00 from a source that is not 1 L☉.',
      'Pick a luminosity that is a perfect square, then set distance to its square root.',
      { lum: 4, dist: 2 },
      (o, v) => v.lum !== 1 && near(o.flux, 1, 0.001),
    ),
  ],
  predict: {
    q: 'A star’s distance triples while its luminosity stays fixed. The measured flux becomes…',
    options: ['One ninth', 'One third', 'One sixth', 'Unchanged'],
    correct: 0,
    why: 'The same power crosses a sphere whose area grew by 3² = 9, so each square metre receives one ninth. Luminosity did not change.',
  },
  model:
    'F = L / (4πd²), shown in relative units where a 1 L☉ source at 1 unit gives F = 1. Assumes an isotropic source and empty space: no dust extinction, beaming, or cosmological effects.',
};

const parallax: TopicLab = {
  id: 'astro-parallax',
  title: 'Parallax baseline and measurement limit',
  lead: 'Earth’s orbit is the baseline. The nearer the star, the larger its annual shift against the distant background.',
  controls: [
    slider('dist', 'Star distance', 1, 100, 1, 10, 'pc'),
    slider('floor', 'Smallest angle the instrument resolves', 0.001, 0.05, 0.001, 0.01, 'arcsec'),
  ],
  run: (v) => {
    const p = 1 / v.dist,
      uncertainty = (v.floor / p) * 100;
    const sx = 210 + (Math.log10(v.dist) / 2) * 330,
      shift = Math.max(6, 78 * (1 - Math.log10(v.dist) / 2.2));
    return {
      o: { parallax: p, uncertainty, limit: 1 / v.floor },
      metrics: [
        { label: 'Parallax angle p', value: p, unit: 'arcsec' },
        { label: 'Fractional uncertainty', value: uncertainty, unit: '%' },
        { label: 'Farthest distance where p equals the floor', value: 1 / v.floor, unit: 'pc' },
      ],
      note:
        p < v.floor
          ? 'The shift is smaller than the instrument can resolve: this star needs a different distance method.'
          : `d = 1/p = ${v.dist} pc. A fixed angular error becomes a larger distance error as p shrinks.`,
      sceneLabel: `Parallax geometry for a star at ${v.dist} parsecs with angle ${p.toPrecision(3)} arcseconds; angles exaggerated`,
      scene: [
        circle(90, 170, 12, 'gold'),
        text(90, 200, 'Sun', 'middle'),
        circle(90, 80, 6, 'cool'),
        circle(90, 260, 6, 'cool'),
        text(104, 76, 'Earth, January'),
        text(104, 274, 'Earth, July'),
        line(90, 80, 90, 260, 'muted', 1, true),
        line(90, 80, 610, 170 + shift, 'accent', 1.5),
        line(90, 260, 610, 170 - shift, 'accent', 1.5),
        circle(sx, 170, 7, 'slot'),
        text(sx, 150, `star · ${v.dist} pc`, 'middle'),
        line(610, 60, 610, 290, 'muted', 3),
        circle(610, 170 + shift, 4, 'warm'),
        circle(610, 170 - shift, 4, 'warm'),
        text(600, 50, 'distant background', 'end', 'muted'),
        text(
          320,
          320,
          'Angles are exaggerated; real parallaxes are below one arcsecond.',
          'middle',
          'muted',
        ),
      ],
      plot: {
        title: 'Parallax shrinks as 1/d',
        x: [1, 100, 'Distance (pc)'],
        y: [0, 0.2, 'Parallax (arcsec)'],
        curves: [{ f: (d) => 1 / d }],
        hlines: [{ y: v.floor, label: 'instrument floor' }],
        points: [{ x: v.dist, y: p, label: `p = ${p.toPrecision(2)}″` }],
      },
    };
  },
  missions: [
    goal(
      'Find the distance of a star whose parallax is 0.050 arcsec.',
      'd in parsecs is the reciprocal of p in arcseconds.',
      { dist: 20 },
      (o) => near(o.parallax, 0.05, 0.0005),
    ),
    goal(
      'Set the floor to 0.005 arcsec and find the largest distance with uncertainty no more than 20%.',
      '20% means the parallax is five times the floor.',
      { floor: 0.005, dist: 40 },
      (o, v) => near(v.floor, 0.005, 1e-6) && v.dist === 40,
    ),
    goal(
      'Show a star whose parallax is below the instrument floor.',
      'Raise the floor or push the star farther away until p < floor.',
      { dist: 100, floor: 0.02 },
      (o, v) => o.parallax < v.floor,
    ),
  ],
  predict: {
    q: 'A star is moved to twice its original distance. Its parallax angle…',
    options: ['Halves', 'Doubles', 'Falls to one quarter', 'Stays the same'],
    correct: 0,
    why: 'p (arcsec) = 1 / d (pc): the angle is inversely proportional to distance, not to distance squared.',
  },
  model:
    'd (pc) = 1 / p (arcsec) for a 1 AU baseline (small-angle approximation). The scene uses a logarithmic distance scale and exaggerated angles. Fractional distance uncertainty ≈ angular floor / p; real surveys also have systematic zero-point offsets.',
};

const massLifetime: TopicLab = {
  id: 'astro-mass-lifetime',
  title: 'Mass, luminosity, and the cluster turnoff clock',
  lead: 'Massive stars have more fuel but burn it far faster. In a cluster of one age, that sets which stars have already left the main sequence.',
  controls: [
    slider('mass', 'Stellar mass', 0.2, 40, 0.1, 1, 'M☉'),
    slider('age', 'Cluster age (log₁₀ years)', 6.5, 10.2, 0.1, 9, ''),
  ],
  run: (v) => {
    const lum = v.mass ** 3.5,
      life = 10 * v.mass ** -2.5,
      ageGyr = 10 ** (v.age - 9),
      turnoff = (ageGyr / 10) ** -0.4,
      on = life > ageGyr ? 1 : 0;
    return {
      o: { lum, life, turnoff, on },
      metrics: [
        { label: 'Luminosity', value: lum, unit: 'L☉' },
        { label: 'Main-sequence lifetime', value: life, unit: 'Gyr' },
        { label: 'Cluster age', value: ageGyr, unit: 'Gyr' },
        { label: 'Turnoff mass at this age', value: turnoff, unit: 'M☉' },
        { label: 'This star now', value: on ? 'Still on the main sequence' : 'Evolved off' },
      ],
      plot: {
        title: 'Lifetime falls steeply with mass (log–log)',
        x: [-0.7, 1.7, 'log₁₀ (mass / M☉)'],
        y: [6, 12, 'log₁₀ (lifetime / yr)'],
        curves: [{ f: (x) => 10 - 2.5 * x, label: 't ≈ 10 Gyr × M⁻²·⁵' }],
        hlines: [{ y: v.age, label: 'cluster age' }],
        points: [{ x: Math.log10(v.mass), y: 10 + Math.log10(life), label: `${v.mass} M☉` }],
      },
    };
  },
  missions: [
    goal(
      'Find a star whose main-sequence lifetime is about 1 Gyr.',
      'You need M⁻²·⁵ ≈ 0.1, so the mass is a little above 2 M☉.',
      { mass: 2.5 },
      (o) => near(o.life, 1, 0.06),
    ),
    goal(
      'Set the cluster age to 100 Myr (log age 8.0) and select the most massive star still on the main sequence.',
      'Raise the mass until the status flips, then step back one notch.',
      { age: 8, mass: 6.3 },
      (o, v) => near(v.age, 8, 1e-6) && o.on === 1 && v.mass >= 6.2,
    ),
    goal(
      'Find a star roughly 10,000 times as luminous as the Sun and read its lifetime.',
      'M³·⁵ = 10⁴ gives a mass near 14 M☉.',
      { mass: 13.9 },
      (o) => near(o.lum, 10000, 1500),
    ),
  ],
  predict: {
    q: 'Compared with the Sun, a 10 M☉ star stays on the main sequence for…',
    options: [
      'A far shorter time — well under 1% as long',
      'About ten times longer, because it has ten times the fuel',
      'About the same time',
      'One tenth as long',
    ],
    correct: 0,
    why: 'Fuel scales with M but the burn rate scales roughly as M³·⁵, so lifetime ∝ M⁻²·⁵ ≈ 0.3% of the solar value.',
  },
  model:
    'Scaling relations L ∝ M³·⁵ and t ≈ 10 Gyr × M⁻²·⁵ for main-sequence stars. Real exponents vary with mass range, and composition, rotation, and binarity change the result. Turnoff mass is the mass whose lifetime equals the cluster age.',
};

const compact: TopicLab = {
  id: 'astro-compact',
  title: 'Stellar remnants: mass decides the endpoint',
  lead: 'Slide the remnant mass through the Chandrasekhar limit and beyond. Size responds in a way ordinary matter never does.',
  controls: [slider('mass', 'Remnant mass', 0.2, 10, 0.1, 0.6, 'M☉')],
  run: (v) => {
    const kind = v.mass <= 1.4 ? 0 : v.mass <= 2.5 ? 1 : 2;
    const horizon = 2.95 * v.mass;
    const radius = kind === 0 ? 7650 * (v.mass / 0.6) ** (-1 / 3) : kind === 1 ? 12 : horizon;
    const name = ['White dwarf', 'Neutron star', 'Black hole'][kind];
    const drawn = 10 + Math.log10(radius) * 16;
    return {
      o: { kind, radius, horizon },
      metrics: [
        { label: 'Remnant type', value: name },
        { label: kind === 2 ? 'Event-horizon radius' : 'Radius', value: radius, unit: 'km' },
        { label: 'Schwarzschild radius for this mass', value: horizon, unit: 'km' },
        {
          label: 'Support against gravity',
          value: [
            'Electron degeneracy pressure',
            'Neutron degeneracy + nuclear forces',
            'None — collapse',
          ][kind],
        },
      ],
      sceneLabel: `${name} of ${v.mass} solar masses with radius ${Math.round(radius)} kilometres, compared with Earth on a logarithmic scale`,
      scene: [
        text(20, 28, 'Radius comparison · logarithmic scale'),
        circle(170, 170, 10 + Math.log10(6371) * 16, 'cool', false),
        text(170, 290, 'Earth · 6,371 km', 'middle', 'muted'),
        circle(450, 170, drawn, kind === 2 ? 'ink' : kind === 1 ? 'accent' : 'gold'),
        text(450, 290, `${name} · ${Math.round(radius).toLocaleString('en-US')} km`, 'middle'),
        line(40, 316, 600, 316, 'muted', 1),
        ...[1.4, 2.5].map((m) =>
          line(40 + (m / 10) * 560, 308, 40 + (m / 10) * 560, 324, 'warm', 2),
        ),
        circle(40 + (v.mass / 10) * 560, 316, 5, 'slot'),
        text(40 + (1.4 / 10) * 560, 304, '1.4', 'middle', 'warm', 11),
        text(40 + (2.5 / 10) * 560, 304, '≈2.5', 'middle', 'warm', 11),
        text(600, 334, 'mass →', 'end', 'muted', 11),
      ],
    };
  },
  missions: [
    goal(
      'Find a white dwarf with a radius below 6,000 km.',
      'Degenerate matter shrinks as mass is added: go toward the limit.',
      { mass: 1.3 },
      (o) => o.kind === 0 && o.radius < 6000,
    ),
    goal(
      'Cross the Chandrasekhar limit and land on a neutron star.',
      'Just above 1.4 M☉ electron degeneracy can no longer hold.',
      { mass: 1.8 },
      (o) => o.kind === 1,
    ),
    goal(
      'Make a black hole whose event horizon is about 30 km in radius.',
      'The horizon radius is about 3 km per solar mass.',
      { mass: 10 },
      (o) => o.kind === 2 && near(o.radius, 30, 1),
    ),
  ],
  predict: {
    q: 'Mass is added to a white dwarf that is still below the Chandrasekhar limit. Its radius…',
    options: ['Decreases', 'Increases', 'Stays fixed', 'Doubles for each doubling of mass'],
    correct: 0,
    why: 'Degeneracy pressure must rise to balance stronger gravity, which requires higher density: R ∝ M⁻¹ᐟ³ for a non-relativistic white dwarf.',
  },
  model:
    'White dwarf R ≈ 7,650 km × (M/0.6 M☉)⁻¹ᐟ³ (non-relativistic scaling; real radii fall faster near the limit). Chandrasekhar limit taken as 1.4 M☉. Neutron stars are drawn at 12 km with an upper mass of 2.5 M☉; the true maximum is uncertain (about 2.2–2.9 M☉). Schwarzschild radius = 2GM/c² ≈ 2.95 km per M☉ for a non-rotating black hole. Remnant mass is not the progenitor mass.',
};

const extinction: TopicLab = {
  id: 'astro-extinction',
  title: 'Dust extinction and reddening',
  lead: 'Interstellar dust removes blue light more efficiently than red. Dim and red together point to dust, not to a cooler star.',
  controls: [
    slider('av', 'Visual extinction A_V', 0, 5, 0.1, 0.5, 'mag'),
    slider('wave', 'Observed wavelength', 300, 2200, 10, 550, 'nm'),
  ],
  run: (v) => {
    const a = (l: number) => (v.av * 550) / l,
      through = (l: number) => 10 ** (-0.4 * a(l));
    return {
      o: { transmitted: through(v.wave), ebv: v.av / 3.1, alam: a(v.wave) },
      metrics: [
        { label: 'Extinction at this wavelength', value: a(v.wave), unit: 'mag' },
        { label: 'Light transmitted', value: through(v.wave) * 100, unit: '%' },
        { label: 'Blue (440 nm) transmitted', value: through(440) * 100, unit: '%' },
        { label: 'Red (700 nm) transmitted', value: through(700) * 100, unit: '%' },
        { label: 'Reddening E(B−V)', value: v.av / 3.1, unit: 'mag' },
      ],
      plot: {
        title: 'Fraction of starlight that survives the dust',
        x: [300, 2200, 'Wavelength (nm)'],
        y: [0, 1, 'Transmitted fraction'],
        curves: [{ f: through }],
        vlines: [
          { x: 440, label: 'B' },
          { x: 550, label: 'V' },
        ],
        points: [
          { x: v.wave, y: through(v.wave), label: `${(through(v.wave) * 100).toFixed(0)}%` },
        ],
      },
    };
  },
  missions: [
    goal(
      'With A_V = 1.0, confirm how much visible (550 nm) light gets through.',
      'One magnitude is a factor of 2.512, so about 40% survives.',
      { av: 1, wave: 550 },
      (o, v) => near(v.av, 1, 1e-6) && v.wave === 550,
    ),
    goal(
      'Hold A_V = 2.0 and find an infrared wavelength where more than 60% is transmitted.',
      'Extinction falls roughly as 1/λ: go to about 2 micrometres.',
      { av: 2, wave: 2100 },
      (o, v) => near(v.av, 2, 1e-6) && o.transmitted > 0.6,
    ),
    goal(
      'Find the dust column that produces a reddening E(B−V) of 1.0.',
      'A_V ≈ 3.1 × E(B−V) for typical Milky Way dust.',
      { av: 3.1 },
      (o) => near(o.ebv, 1, 0.005),
    ),
  ],
  predict: {
    q: 'A star seen through a dust lane appears dimmer and…',
    options: [
      'Redder, because blue light is removed more strongly',
      'Bluer, because dust scatters red light away',
      'The same colour, only fainter',
      'Hotter, because dust re-emits in the visible',
    ],
    correct: 0,
    why: 'Extinction rises toward short wavelengths, so the transmitted light is depleted in blue. Spectral lines still reveal the true temperature class.',
  },
  model:
    'Teaching law A_λ ≈ A_V × (550 nm / λ); transmitted fraction = 10^(−0.4 A_λ); R_V = A_V / E(B−V) = 3.1. Real extinction curves have features (such as the 217.5 nm bump) and R_V varies between sightlines.',
};

const hx = (t: number) => 80 + ((Math.log10(30000) - Math.log10(t)) / 1) * 500,
  hy = (logL: number) => 290 - ((logL + 4) / 10) * 250;
function radiusLine(r: number): Shape[] {
  const inside: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const t = 30000 * 10 ** (-i / 60),
      logL = 2 * Math.log10(r) + 4 * Math.log10(t / 5772);
    if (logL >= -4 && logL <= 6) inside.push(`${hx(t).toFixed(1)},${hy(logL).toFixed(1)}`);
  }
  if (inside.length < 2) return [];
  const [lx, ly] = inside[Math.floor(inside.length / 2)].split(',').map(Number);
  return [
    path(`M${inside.join('L')}`, 'muted', false, 1.2, 1, true),
    text(lx + 4, ly - 4, `${r} R☉`, 'start', 'muted', 11),
  ];
}
const radiusLines: TopicLab = {
  id: 'astro-radius-lines',
  title: 'Reading radius from an H–R position',
  lead: 'Place a star anywhere on the diagram. Its temperature and luminosity together fix its size — the dashed diagonals are lines of constant radius.',
  controls: [
    slider('temp', 'Effective temperature', 3000, 30000, 100, 5800, 'K'),
    slider('logl', 'log₁₀ (L / L☉)', -4, 6, 0.1, 0, ''),
  ],
  run: (v) => {
    const radius = Math.sqrt(10 ** v.logl) * (5772 / v.temp) ** 2;
    return {
      o: { radius, lum: 10 ** v.logl },
      metrics: [
        { label: 'Radius', value: radius, unit: 'R☉' },
        { label: 'Luminosity', value: 10 ** v.logl, unit: 'L☉' },
        { label: 'Wien peak', value: 2.898e6 / v.temp, unit: 'nm' },
      ],
      sceneLabel: `H–R diagram with a star at ${v.temp} kelvin and log luminosity ${v.logl}, radius ${radius.toPrecision(3)} solar radii`,
      scene: [
        path('M80 40V290H580', 'muted', false, 1.5),
        ...[0.01, 0.1, 1, 10, 100, 1000].flatMap(radiusLine),
        ...[30000, 10000, 5000, 3000].flatMap((t) => [
          line(hx(t), 290, hx(t), 296, 'muted', 1),
          text(hx(t), 310, `${t.toLocaleString('en-US')}`, 'middle', 'muted', 11),
        ]),
        ...[-4, -2, 0, 2, 4, 6].map((l) => text(72, hy(l) + 4, `${l}`, 'end', 'muted', 11)),
        text(330, 330, 'Effective temperature (K) · hotter ← → cooler', 'middle'),
        text(80, 30, 'log₁₀ (L / L☉)'),
        circle(hx(v.temp), hy(v.logl), 8, 'slot'),
      ],
    };
  },
  missions: [
    goal(
      'Find a supergiant: Sun-like temperature (5,800 K) but about 100 R☉.',
      'At fixed temperature L ∝ R², so 100 R☉ needs 10⁴ L☉.',
      { temp: 5800, logl: 4 },
      (o, v) => v.temp === 5800 && near(o.radius, 100, 8),
    ),
    goal(
      'Find a white-dwarf-like object: hotter than 15,000 K and smaller than 0.02 R☉.',
      'Hot but faint: move to the lower left.',
      { temp: 20000, logl: -2 },
      (o, v) => v.temp > 15000 && o.radius < 0.02,
    ),
    goal(
      'Hold L = 1 L☉ (log L = 0) and cool the star to 3,600 K or below. Note how its radius must change.',
      'At fixed luminosity R ∝ 1/T².',
      { logl: 0, temp: 3500 },
      (o, v) => near(v.logl, 0, 1e-6) && v.temp <= 3600,
    ),
  ],
  predict: {
    q: 'With hot stars on the left, lines of constant radius on an H–R diagram run…',
    options: [
      'From upper left to lower right',
      'Horizontally',
      'Vertically',
      'From lower left to upper right',
    ],
    correct: 0,
    why: 'At a fixed radius L ∝ T⁴: a hotter star of the same size is more luminous, so the line rises toward the hot (left) side.',
  },
  model:
    'L/L☉ = (R/R☉)² (T/5772 K)⁴ solved for R. The star is treated as a spherical blackbody; no claim is made that an arbitrary point corresponds to a real evolutionary state.',
};

const distanceModulus: TopicLab = {
  id: 'astro-distance-modulus',
  title: 'Distance modulus with and without dust',
  lead: 'Apparent brightness, intrinsic brightness, and dust all enter one equation. Change one and see which inferred quantity moves.',
  controls: [
    slider('m', 'Apparent magnitude m', -2, 25, 0.1, 10, 'mag'),
    slider('M', 'Absolute magnitude M', -20, 15, 0.1, 5, 'mag'),
    slider('A', 'Extinction along the sightline', 0, 3, 0.1, 0, 'mag'),
  ],
  run: (v) => {
    const mu = v.m - v.M - v.A,
      logd = (mu + 5) / 5,
      d = 10 ** logd;
    return {
      o: { mu, logd, d },
      metrics: [
        { label: 'True distance modulus m − M − A', value: mu, unit: 'mag' },
        { label: 'Distance', value: d, unit: 'pc' },
        { label: 'Distance in light-years', value: d * 3.2616, unit: 'ly' },
        {
          label: 'Flux relative to the same star at 10 pc',
          value: 10 ** (-0.4 * (v.m - v.M)),
          unit: '×',
        },
      ],
      note:
        v.A > 0
          ? `Ignoring the dust would place the star at ${(10 ** ((v.m - v.M + 5) / 5)).toPrecision(3)} pc — too far by a factor of ${(10 ** (v.A / 5)).toFixed(2)}.`
          : undefined,
      plot: {
        title: 'Every 5 magnitudes of modulus is a factor of 10 in distance',
        x: [0, 9, 'log₁₀ (distance / pc)'],
        y: [-5, 40, 'Distance modulus (mag)'],
        curves: [{ f: (x) => 5 * x - 5 }],
        points: [{ x: Math.max(0, Math.min(9, logd)), y: mu, label: `μ = ${mu.toFixed(1)}` }],
      },
    };
  },
  missions: [
    goal(
      'Place the star at exactly 10 pc with no dust.',
      'At 10 pc the apparent and absolute magnitudes are equal.',
      { m: 5, M: 5 },
      (o, v) => v.A === 0 && near(o.d, 10, 0.01),
    ),
    goal(
      'A Type Ia supernova (M = −19.3) is observed at m = 15.7 with no dust. Find its distance.',
      'The modulus is 35, so log d = 8: one hundred million parsecs.',
      { M: -19.3, m: 15.7 },
      (o, v) => near(v.M, -19.3, 1e-6) && near(v.m, 15.7, 1e-6) && v.A === 0,
    ),
    goal(
      'Keep that supernova and add 1.0 mag of dust. Read how much closer it really is.',
      'One magnitude of extinction changes distance by 10^(1/5) ≈ 1.58.',
      { M: -19.3, m: 15.7, A: 1 },
      (o, v) => near(v.M, -19.3, 1e-6) && near(v.m, 15.7, 1e-6) && near(v.A, 1, 1e-6),
    ),
  ],
  predict: {
    q: 'Two identical stars differ by 5 magnitudes in apparent brightness. The fainter one is…',
    options: ['10 times farther', '100 times farther', '5 times farther', '2.512 times farther'],
    correct: 0,
    why: 'Five magnitudes is a flux ratio of exactly 100, and flux ∝ 1/d², so the distance ratio is √100 = 10.',
  },
  model:
    'm − M = 5 log₁₀(d / 10 pc) + A. Assumes a known absolute magnitude (a standard candle), a single extinction value in the observed band, and no cosmological corrections.',
};

export const astronomyExtras: EventExtras = {
  eventId: 'astronomy',
  labs: [inverseSquare, parallax, massLifetime, compact, extinction, radiusLines, distanceModulus],
  lessons: {
    'astro-u1-l1': {
      labs: ['astro-inverse-square'],
      sort: sort(
        'Property of the source, or of what we measure here?',
        ['Intrinsic to the source', 'Depends on the observer'],
        [
          ['Luminosity', 0],
          ['Flux received at Earth', 1],
          ['Absolute magnitude', 0],
          ['Apparent magnitude', 1],
          ['Stellar radius', 0],
          ['Angular size', 1],
        ],
      ),
      checks: [
        check(
          2,
          'A result says a star’s flux went up when it was moved farther away at fixed luminosity. What should you do first?',
          [
            'Recheck the inverse-square step — the trend is physically backwards',
            'Report it with more significant figures',
            'Assume the star’s luminosity changed',
            'Convert the distance to light-years and try again',
          ],
          'A limiting-case check catches the error before any arithmetic is trusted: farther at fixed luminosity must mean less flux.',
        ),
      ],
    },
    'astro-u2-l1': {
      labs: ['astro-parallax'],
      phet: [
        phet(
          'models-of-the-hydrogen-atom',
          'Models of the Hydrogen Atom',
          'Spectral lines exist because bound electrons can only change between allowed energies. Watch which photons hydrogen absorbs and emits, then connect them to the Balmer lines astronomers classify stars with.',
          'Switch to the Bohr (or a later) model and turn on the spectrometer. Which emitted wavelengths fall in the visible range?',
          'Shine monochromatic light instead of white light. Find one wavelength the atom absorbs and one it ignores.',
          'Explain why the same atom produces an emission line in a hot thin gas and an absorption line in front of a hotter continuous source.',
        ),
      ],
      sort: sort(
        'Which kind of spectrum would you observe?',
        ['Continuous', 'Emission lines', 'Absorption lines'],
        [
          ['Hot, dense stellar interior seen directly', 0],
          ['Thin glowing nebular gas against dark sky', 1],
          ['Starlight passing through a cooler outer atmosphere', 2],
          ['An incandescent filament', 0],
          ['A planetary nebula shell', 1],
          ['Sunlight showing Fraunhofer lines', 2],
        ],
      ),
      checks: [
        check(
          4,
          'A star has a parallax of 0.25 arcsec. How far away is it?',
          ['4 pc', '0.25 pc', '25 pc', '40 pc'],
          'd (pc) = 1 / p (arcsec) = 1 / 0.25 = 4 pc — about 13 light-years.',
        ),
      ],
    },
    'astro-u3-l1': {
      phet: [
        phet(
          'blackbody-spectrum',
          'Blackbody Spectrum',
          'A star’s continuous spectrum is close to a blackbody curve. Its peak tells you temperature; the area under it tells you power per unit surface.',
          'Set the temperature to the Sun’s (about 5,800 K) and read the peak wavelength. Is the peak inside the visible band?',
          'Drop to 3,000 K and then rise to 10,000 K. Describe how both the peak position and the curve height change.',
          'Use the intensity readout to test Stefan–Boltzmann: when temperature doubles, by what factor does the total power per area grow?',
        ),
      ],
      sort: sort(
        'Where on the H–R diagram?',
        ['Main sequence', 'Giants / supergiants', 'White dwarfs'],
        [
          ['Core hydrogen fusion in hydrostatic equilibrium', 0],
          ['Cool surface yet very high luminosity', 1],
          ['Hot surface yet very low luminosity', 2],
          ['The Sun today', 0],
          ['Earth-sized, supported by electron degeneracy', 2],
          ['Radius hundreds of times the Sun’s', 1],
        ],
      ),
      checks: [
        check(
          2,
          'Two stars have the same surface temperature, but star A is 100 times more luminous. Star A’s radius is…',
          ['10 times larger', '100 times larger', 'The same', '10,000 times larger'],
          'At fixed temperature L ∝ R², so a factor of 100 in luminosity is a factor of 10 in radius.',
        ),
      ],
    },
    'astro-u4-l1': {
      labs: ['astro-mass-lifetime'],
      sort: sort(
        'Which mass range follows this path?',
        ['Low / intermediate mass', 'High mass'],
        [
          ['Ends as a carbon–oxygen white dwarf', 0],
          ['Ejects a planetary nebula', 0],
          ['Fuses elements up to iron-group nuclei in its core', 1],
          ['Core collapses to a neutron star or black hole', 1],
          ['Main-sequence lifetime of billions of years', 0],
          ['Leaves the main sequence within a few million years', 1],
        ],
      ),
      checks: [
        check(
          5,
          'In a star cluster, the main-sequence turnoff sits at a lower mass than in a second cluster. The first cluster is…',
          ['Older', 'Younger', 'More distant', 'More metal-rich, with age unknown'],
          'Stars leave the main sequence in order of decreasing mass, so a lower turnoff mass means more time has passed.',
        ),
      ],
    },
    'astro-u5-l1': {
      labs: ['astro-compact'],
      sort: sort(
        'Core collapse or thermonuclear?',
        ['Core-collapse supernova', 'Type Ia (thermonuclear)'],
        [
          ['Massive star with an iron core', 0],
          ['White dwarf approaching the Chandrasekhar limit', 1],
          ['Can leave a neutron star behind', 0],
          ['No hydrogen lines; strong silicon absorption', 1],
          ['Occurs in a binary with mass transfer or a merger', 1],
          ['Found in regions of recent star formation', 0],
        ],
      ),
      checks: [
        check(
          1,
          'What holds up a white dwarf against gravity?',
          [
            'Electron degeneracy pressure',
            'Ongoing hydrogen fusion',
            'Thermal gas pressure alone',
            'Neutron degeneracy pressure',
          ],
          'No fusion occurs in a white dwarf. The Pauli exclusion principle for electrons supplies pressure that does not depend on temperature.',
        ),
      ],
    },
    'astro-u6-l1': {
      labs: ['astro-extinction'],
      sort: sort(
        'Which nebula type explains the observation?',
        ['Emission nebula', 'Reflection nebula', 'Dark nebula'],
        [
          ['Red Hα glow around hot O and B stars', 0],
          ['Blue haze of starlight scattered by dust', 1],
          ['A starless patch silhouetted against a bright field', 2],
          ['Gas ionised by ultraviolet photons', 0],
          ['Dense dust blocking background light', 2],
          ['Spectrum resembles the illuminating star', 1],
        ],
      ),
      checks: [
        check(
          4,
          'A star looks both fainter and redder than its spectral lines predict. The best first explanation is…',
          [
            'Dust extinction and reddening along the sightline',
            'The star is cooler than its lines indicate',
            'The star is moving away at high speed',
            'The detector is saturated',
          ],
          'Lines fix the temperature class; a colour that is too red for that class is the signature of dust removing blue light.',
        ),
      ],
    },
    'astro-u7-l1': {
      labs: ['astro-radius-lines'],
      sort: sort(
        'Real trend, or a selection effect?',
        ['Physical relationship', 'Selection effect'],
        [
          ['Hotter main-sequence stars are more luminous', 0],
          ['A magnitude-limited survey contains mostly luminous stars at large distances', 1],
          ['Nearby star lists are dominated by faint red dwarfs', 0],
          ['Only bright quasars appear in the highest-redshift bin', 1],
          ['Cluster turnoff moves to lower mass with age', 0],
          ['Short-period planets dominate transit discoveries', 1],
        ],
      ),
      checks: [
        check(
          0,
          'Before interpreting any astronomical graph, the first thing to establish is…',
          [
            'What each axis measures, its units, and its direction',
            'The name of the brightest object plotted',
            'Which point is the Sun',
            'Whether the colours look realistic',
          ],
          'H–R temperature axes run backwards and many axes are logarithmic; reading the pattern before the axes produces confident wrong answers.',
        ),
      ],
    },
    'astro-u8-l1': {
      labs: ['astro-distance-modulus'],
      phet: [
        phet(
          'keplers-laws',
          'Kepler’s Laws',
          'Orbital period and size are tied together by the central mass. This is how binary stars and exoplanet hosts are weighed.',
          'On the Third Law screen, record the period for semi-major axes of 1, 2, and 4 AU. Does T² / a³ stay constant?',
          'Increase eccentricity while holding the semi-major axis fixed. Which quantity changes — the period or the speed at closest approach?',
          'Use the Second Law screen to show that equal-time sectors have equal areas, and explain what that implies about speed near periapsis.',
        ),
        phet(
          'gravity-and-orbits',
          'Gravity and Orbits',
          'Test how the central mass and the orbital distance set the motion before you apply M = 4π²a³ / (GT²) on paper.',
          'Run the star–planet system and note the period. Double the star’s mass: does the same orbit remain bound, and how does the period change?',
          'Turn gravity off mid-orbit. Describe the path and connect it to Newton’s first law.',
        ),
      ],
      sort: sort(
        'Which relation solves it?',
        ['Inverse-square flux', 'Distance modulus', 'Stefan–Boltzmann', 'Kepler’s third law'],
        [
          ['Flux at 3× the distance for a fixed source', 0],
          ['Distance from m and M', 1],
          ['Luminosity from radius and temperature', 2],
          ['Total mass of a binary from period and separation', 3],
          ['Radius from luminosity and temperature', 2],
          ['Brightness ratio of two identical stars at different distances', 0],
        ],
      ),
      checks: [
        check(
          1,
          'Star X is 5 magnitudes brighter than star Y. The flux ratio F_X / F_Y is…',
          ['100', '5', '2.512', '25'],
          'Each magnitude is a factor of 100^(1/5) ≈ 2.512, so five magnitudes is exactly 100.',
        ),
      ],
    },
  },
};
