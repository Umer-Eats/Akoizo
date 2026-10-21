import { check, phet, sort, type EventExtras } from '../lesson-extras.ts';
import {
  choice,
  circle,
  ellipse,
  goal,
  near,
  slider,
  text,
  type TopicLab,
} from '../topic-lab-kit.ts';

const teqAt = (d: number, albedo: number) => (278.6 * (1 - albedo) ** 0.25) / Math.sqrt(d);
const equilibrium: TopicLab = {
  id: 'sol-teq',
  title: 'Distance, albedo, and equilibrium temperature',
  lead: 'Move a planet around a Sun-like star and change how much light it reflects. The equilibrium temperature balances absorbed sunlight against emitted heat, before any greenhouse warming.',
  controls: [
    slider('dist', 'Distance from the star', 0.2, 10, 0.1, 1.5, 'AU'),
    slider('albedo', 'Albedo (fraction reflected)', 0, 0.9, 0.05, 0.3, ''),
  ],
  run: (v) => {
    const teq = teqAt(v.dist, v.albedo);
    const flux = 1361 / v.dist ** 2;
    return {
      o: { teq },
      metrics: [
        { label: 'Equilibrium temperature', value: Number(teq.toFixed(1)), unit: 'K' },
        { label: 'In degrees Celsius', value: Number((teq - 273.15).toFixed(1)), unit: '°C' },
        { label: 'Starlight flux', value: Math.round(flux), unit: 'W/m²' },
        {
          label: 'Liquid water (without greenhouse)',
          value: teq >= 273 && teq <= 373 ? 'Possible' : teq < 273 ? 'Too cold' : 'Too hot',
        },
      ],
      plot: {
        title: `Equilibrium temperature at albedo ${v.albedo.toFixed(2)}`,
        x: [0.2, 10, 'Distance (AU)'],
        y: [0, 700, 'Temperature (K)'],
        curves: [{ f: (d) => teqAt(d, v.albedo), label: 'Teq', tone: 'slot' }],
        hlines: [
          { y: 273, label: 'water freezes' },
          { y: 373, label: 'water boils (1 atm)' },
        ],
        points: [{ x: v.dist, y: teq, label: `${teq.toFixed(0)} K` }],
      },
    };
  },
  missions: [
    goal(
      'Reproduce Earth’s equilibrium temperature of about 255 K.',
      'Earth orbits at 1 AU with an albedo near 0.3.',
      { dist: 1, albedo: 0.3 },
      (o, v) => v.dist === 1 && near(o.teq, 255, 1),
    ),
    goal(
      'With Earth’s albedo, move the planet until its equilibrium temperature is between 273 and 373 K.',
      'Move inward: Teq rises as 1/√d.',
      { dist: 0.8 },
      (o) => o.teq >= 273 && o.teq <= 373,
    ),
    goal(
      'Model Venus: a very reflective planet at 0.7 AU whose equilibrium temperature is below 240 K.',
      'Raise the albedo to about 0.75 and set the distance to 0.7 AU.',
      { dist: 0.7, albedo: 0.75 },
      (o, v) => v.albedo >= 0.7 && v.dist <= 0.8 && o.teq < 240,
    ),
  ],
  predict: {
    q: 'A planet with Earth’s albedo moves from 1 AU to 4 AU. What happens to its equilibrium temperature?',
    options: [
      'It halves',
      'It drops to one quarter',
      'It drops to one sixteenth',
      'It stays the same',
    ],
    correct: 0,
    why: 'Teq is proportional to 1/√d, and √4 = 2, so the equilibrium temperature falls to half of its value.',
  },
  model:
    'Teq = 278.6 K × (1 − A)^¼ ÷ √d for a fast-rotating planet around a Sun-like star, with emissivity 1. It ignores greenhouse warming and internal heat, which is why Venus and Earth are warmer than this.',
};

const tides: TopicLab = {
  id: 'sol-tides',
  title: 'Tidal force and tidal heating',
  lead: 'Tidal force grows sharply as a moon moves closer, but heating needs an elliptical orbit that flexes the moon. Compare both to a Europa-like starting point.',
  controls: [
    slider('mass', 'Planet mass (Jupiter = 1)', 0.1, 2, 0.1, 1, ''),
    slider('dist', 'Orbit radius', 1, 20, 0.5, 8, '×100,000 km'),
    slider('e', 'Orbital eccentricity', 0, 0.1, 0.01, 0, ''),
  ],
  run: (v) => {
    const force = v.mass * (8 / v.dist) ** 3;
    const heat = v.mass ** 2.5 * (v.e / 0.01) ** 2 * (8 / v.dist) ** 7.5;
    const r = 30 + v.dist * 12;
    return {
      o: { force, heat },
      metrics: [
        { label: 'Tidal force (start = 1)', value: Number(force.toFixed(2)) },
        { label: 'Tidal heating (Europa-like = 1)', value: Number(heat.toPrecision(3)) },
        {
          label: 'Orbit',
          value: v.e === 0 ? 'Circular: no flexing' : 'Elliptical: flexing each orbit',
        },
      ],
      sceneLabel: `Moon orbiting at ${v.dist * 100000} km with eccentricity ${v.e}`,
      scene: [
        ellipse(320, 170, r, r * Math.sqrt(1 - Math.min(0.9, v.e * 6) ** 2), 'muted', false),
        circle(320, 170, 16 + v.mass * 12, 'gold'),
        circle(320 + r, 170, 9, heat > 0 ? 'warm' : 'cool'),
        text(320, 320, `force × ${force.toFixed(2)} · heating × ${heat.toPrecision(2)}`, 'middle'),
      ],
    };
  },
  missions: [
    goal(
      'Switch on tidal heating at the starting distance by making the orbit slightly elliptical.',
      'A circular orbit gives a steady bulge that never flexes.',
      { e: 0.01 },
      (o) => o.heat >= 0.5,
    ),
    goal(
      'Make the tidal force exactly eight times its starting value by moving the moon.',
      'Tidal force scales as 1/d³; halve the distance.',
      { dist: 4 },
      (o) => near(o.force, 8, 1e-9),
    ),
    goal(
      'Show that a moon very close to its planet still gets no tidal heating on a circular orbit.',
      'Move inside 300,000 km but keep eccentricity at zero.',
      { dist: 3 },
      (o, v) => v.dist <= 3 && v.e === 0 && o.force > 10 && o.heat === 0,
    ),
  ],
  predict: {
    q: 'A moon moves to half its distance from a planet. By what factor does the tidal force change?',
    options: ['8 times larger', '2 times larger', '4 times larger', 'Unchanged'],
    correct: 0,
    why: 'Tidal force depends on M/d³, so halving d multiplies the force by 2³ = 8.',
  },
  model:
    'Tidal force ∝ M/d³. Heating uses the standard scaling ∝ M^2.5 e² / a^7.5 for a fixed moon, normalized to a Europa-like case (Jupiter mass, 800,000 km, e = 0.01). Interior properties are held constant.',
};

const bodies: [string, number, number][] = [
  ['Earth', 5.97e24, 6371],
  ['Venus', 4.87e24, 6052],
  ['Mars', 6.42e23, 3390],
  ['Titan', 1.345e23, 2575],
  ['Makemake', 3.1e21, 715],
  ['Enceladus', 1.08e20, 252],
  ['Bennu', 7.33e10, 0.245],
];
const gases: [string, number][] = [
  ['H₂', 2],
  ['He', 4],
  ['H₂O', 18],
  ['N₂', 28],
  ['CO₂', 44],
];
const escape: TopicLab = {
  id: 'sol-escape',
  title: 'Can this world keep its gas?',
  lead: 'A world keeps a gas over billions of years if its escape velocity is at least about six times the gas molecules’ typical speed. Compare bodies, gases, and temperatures.',
  controls: [
    choice(
      'body',
      'World',
      bodies.map(([name]) => name),
      0,
    ),
    choice(
      'gas',
      'Gas',
      gases.map(([name]) => name),
      3,
    ),
    slider('temp', 'Upper-atmosphere temperature', 50, 800, 10, 300, 'K'),
  ],
  run: (v) => {
    const [name, mass, radius] = bodies[v.body];
    const vesc = Math.sqrt((2 * 6.674e-11 * mass) / (radius * 1000));
    const vrms = Math.sqrt((3 * 1.380649e-23 * v.temp) / (gases[v.gas][1] * 1.6605e-27));
    const kept = vesc >= 6 * vrms ? 1 : 0;
    return {
      o: { vesc, vrms, kept },
      metrics: [
        {
          label: `${name} escape velocity`,
          value: vesc >= 100 ? Number((vesc / 1000).toFixed(2)) : Number(vesc.toFixed(2)),
          unit: vesc >= 100 ? 'km/s' : 'm/s',
        },
        { label: `${gases[v.gas][0]} typical speed`, value: Math.round(vrms), unit: 'm/s' },
        { label: 'Verdict', value: kept ? 'Retained over billions of years' : 'Lost to space' },
      ],
      bars: {
        title: 'Escape velocity versus six times the molecular speed (m/s)',
        max: Math.max(vesc, 6 * vrms),
        items: [
          { label: 'Escape velocity', value: vesc, tone: 'accent' },
          { label: '6 × molecular speed', value: 6 * vrms, tone: kept ? 'muted' : 'warm' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Show that Earth cannot hold on to hydrogen gas at 300 K.',
      'Choose H₂: the lightest molecule moves fastest.',
      { body: 0, gas: 0, temp: 300 },
      (o, v) => v.body === 0 && v.gas === 0 && o.kept === 0,
    ),
    goal(
      'Find the temperature at which Titan keeps its nitrogen atmosphere.',
      'Titan’s upper atmosphere is near 90 K; nitrogen is lost at 300 K.',
      { body: 3, gas: 3, temp: 90 },
      (o, v) => v.body === 3 && v.gas === 3 && o.kept === 1,
    ),
  ],
  predict: {
    q: 'Why can asteroid Bennu hold no atmosphere at all?',
    options: [
      'Its escape velocity is only centimeters per second',
      'It is too far from the Sun',
      'It is made of metal',
      'It spins too slowly',
    ],
    correct: 0,
    why: 'Bennu’s tiny mass gives an escape velocity near 0.2 m/s, far below the speed of any gas molecule, so every gas escapes.',
  },
  model:
    'v_esc = √(2GM/R) and v_rms = √(3kT/m). Gases are treated as retained when v_esc ≥ 6 v_rms (Jeans escape rule of thumb). Masses and radii are published values; solar-wind stripping is ignored.',
};

const stars: [string, number][] = [
  ['Sun-like star (1.0 R☉)', 1],
  ['K dwarf (0.7 R☉)', 0.7],
  ['Red dwarf (0.2 R☉)', 0.2],
  ['Ultracool dwarf (0.12 R☉)', 0.12],
];
const transit: TopicLab = {
  id: 'sol-transit',
  title: 'Transit depth and star size',
  lead: 'A transiting planet blocks a fraction of its star equal to (Rp/Rs)². Change the planet and the star to see why small planets are easiest to find around small stars.',
  controls: [
    slider('rp', 'Planet radius', 0.5, 15, 0.5, 1, 'R⊕'),
    choice(
      'star',
      'Star',
      stars.map(([name]) => name),
      0,
    ),
  ],
  run: (v) => {
    const ratio = (v.rp * 6371) / (stars[v.star][1] * 695700);
    const depth = Math.min(1, ratio ** 2);
    const floor = 1 - depth;
    const y0 = 1 - Math.max(depth * 1.5, 0.0002);
    return {
      o: { depth },
      metrics: [
        { label: 'Transit depth', value: Number((depth * 100).toPrecision(3)), unit: '%' },
        { label: 'In parts per million', value: Math.round(depth * 1e6), unit: 'ppm' },
        { label: 'Planet-to-star radius ratio', value: Number(ratio.toPrecision(3)) },
      ],
      plot: {
        title: 'Light curve during transit',
        x: [-3, 3, 'Time from mid-transit (hours)'],
        y: [y0, 1 + (1 - y0) * 0.1, 'Relative brightness'],
        curves: [
          { f: (t) => (Math.abs(t) < 1 ? floor : 1), label: 'star brightness', tone: 'slot' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Make an Earth-sized planet dim its star by at least 0.5%.',
      'Pick a much smaller star; depth depends on the radius ratio squared.',
      { star: 3 },
      (o, v) => v.rp === 1 && o.depth >= 0.005,
    ),
    goal(
      'Make a Jupiter-sized planet (about 11 R⊕) transit a Sun-like star and dim it by about 1%.',
      'Raise the planet radius to 11 Earth radii.',
      { rp: 11 },
      (o, v) => v.star === 0 && o.depth > 0.009 && o.depth < 0.011,
    ),
  ],
  predict: {
    q: 'An Earth-sized planet transits a star one-tenth the Sun’s radius. Compared with a Sun-like star, the transit is:',
    options: ['100 times deeper', '10 times deeper', 'The same depth', '10 times shallower'],
    correct: 0,
    why: 'Depth scales as (Rp/Rs)². A star 10 times smaller makes the ratio 10 times larger, so the depth is 10² = 100 times greater.',
  },
  model:
    'Depth = (Rp/Rs)² for a dark, opaque planet crossing the star’s centre, ignoring limb darkening and grazing transits. Earth radius 6,371 km; solar radius 695,700 km.',
};

export const solarSystemExtras: EventExtras = {
  eventId: 'solar-system',
  labs: [equilibrium, tides, escape, transit],
  lessons: {
    'sol-u1-l1': {
      labs: ['sol-teq'],
      sort: sort(
        'Which habitability need does this evidence address?',
        ['Liquid water', 'Energy source', 'Chemical building blocks'],
        [
          ['An induced magnetic field suggests a salty ocean', 0],
          ['Hydrogen gas detected in a plume', 1],
          ['Organic molecules found in ice grains', 2],
          ['Tidal flexing from an orbital resonance', 1],
          ['Phosphates detected in ocean material', 2],
          ['Rounded pebbles shaped by flowing liquid', 0],
        ],
      ),
      checks: [
        check(
          4,
          'What keeps a moon’s orbit elliptical so tidal heating continues?',
          ['Orbital resonance with other moons', 'Sunlight pressure', 'Its own magnetic field'],
          'Regular tugs from neighbouring moons in resonance keep the orbit from becoming circular, so the moon keeps flexing.',
        ),
      ],
    },
    'sol-u2-l1': {
      labs: ['sol-teq'],
      phet: [
        phet(
          'blackbody-spectrum',
          'Blackbody Spectrum',
          'Wien’s law and the Stefan–Boltzmann law are easiest to feel by watching a spectrum change shape. This simulation shows the peak shift and the total emission rise as temperature increases.',
          'Set the Sun’s temperature near 5,800 K and record the peak wavelength, then repeat for a 3,000 K red dwarf.',
          'Double the temperature and estimate how much the area under the curve grows; compare your answer with T⁴.',
        ),
      ],
      sort: sort(
        'Which law do you need?',
        ['Inverse-square law', 'Stefan–Boltzmann law', 'Wien’s law', 'Doppler shift'],
        [
          ['How much sunlight Jupiter receives compared with Earth', 0],
          ['Why a hotter star emits far more power per area', 1],
          ['Why a red dwarf looks red', 2],
          ['How fast a star moves toward us', 3],
          ['The peak wavelength of a 300 K planet', 2],
          ['Flux at 3 AU compared with 1 AU', 0],
        ],
      ),
      checks: [
        check(
          3,
          'Earth’s equilibrium temperature is about 255 K, but its average is 288 K. Why?',
          ['The greenhouse effect', 'Tidal heating', 'Its high albedo'],
          'Greenhouse gases absorb outgoing infrared radiation and warm the surface above the no-atmosphere equilibrium value.',
        ),
      ],
    },
    'sol-u3-l1': {
      phet: [
        phet(
          'gravity-and-orbits',
          'Gravity and Orbits',
          'Changing masses and distances shows Newton’s law at work and how orbits respond. You can see why gravity sets both the path and the period of a moon or planet.',
          'Double the Sun’s mass and describe how Earth’s orbit changes; then restore it and double the distance.',
          'Explain your observations using F = GMm/r² and Kepler’s third law.',
        ),
        phet(
          'keplers-laws',
          'Kepler’s Laws',
          'Kepler’s second and third laws describe how orbital speed and period depend on orbit shape and size, which explains comets speeding up near the Sun.',
          'Make an eccentric orbit and use the area tool to show equal areas are swept in equal times.',
          'Change the semi-major axis and check that the period squared is proportional to the axis cubed.',
        ),
      ],
      sort: sort(
        'Which quantity does this change affect most?',
        ['Gravitational force (1/r²)', 'Tidal force (1/d³)', 'Orbital period (Kepler III)'],
        [
          ['A moon moves to half its distance and is stretched 8 times harder', 1],
          ['An asteroid at 4 AU takes 8 years to orbit', 2],
          ['Doubling the distance makes the attraction one quarter', 0],
          ['The Moon raises bigger ocean tides than the Sun', 1],
          ['A habitable-zone planet of a red dwarf orbits in 10 days', 2],
          ['Surface gravity depends on mass divided by radius squared', 0],
        ],
      ),
      checks: [
        check(
          2,
          'A body orbits the Sun at 4 AU. What is its period?',
          ['8 years', '4 years', '16 years', '2 years'],
          'P² = a³ = 64 for orbits around the Sun, so P = 8 years.',
        ),
      ],
    },
    'sol-u4-l1': {
      phet: [
        phet(
          'greenhouse-effect',
          'The Greenhouse Effect',
          'Venus’s runaway greenhouse and Mars’s thin, cold atmosphere are two extremes of the same physics. This simulation lets you add greenhouse gases and watch the surface temperature respond.',
          'Start with no greenhouse gases and record the surface temperature, then add a lot and record it again.',
          'Use your results to explain why Venus is hotter than Mercury even though it is farther from the Sun.',
        ),
      ],
      sort: sort(
        'Venus, Mars, or both?',
        ['Venus', 'Mars', 'Both'],
        [
          ['Runaway greenhouse with a surface near 465 °C', 0],
          ['River deltas and clay minerals record ancient lakes', 1],
          ['Atmosphere made mostly of carbon dioxide', 2],
          ['High D/H ratio suggests lost water', 0],
          ['Lost its global magnetic field early', 1],
          ['Studied by orbiters as well as probes or landers', 2],
        ],
      ),
      checks: [
        check(
          4,
          'Which mission measures how fast Mars loses gas to space?',
          ['MAVEN', 'Perseverance', 'VERITAS'],
          'MAVEN studies the Martian upper atmosphere and its escape, revealing how Mars lost much of its air.',
        ),
      ],
    },
    'sol-u5-l1': {
      labs: ['sol-tides'],
      sort: sort(
        'Match the evidence to the ocean world',
        ['Europa', 'Ganymede', 'Enceladus', 'Titan'],
        [
          ['An induced magnetic field and young chaos terrain', 0],
          ['The only moon with its own magnetic field', 1],
          ['Plumes containing silica grains and hydrogen', 2],
          ['Methane rain and lakes of hydrocarbons', 3],
          ['Huygens landed on rounded pebbles', 3],
          ['Tiger-stripe fractures near the south pole', 2],
        ],
      ),
      checks: [
        check(
          3,
          'Which mission will become the first to orbit a moon of another planet?',
          ['JUICE', 'Dragonfly', 'Galileo'],
          'ESA’s JUICE is planned to enter orbit around Ganymede after its tour of the Jupiter system.',
        ),
      ],
    },
    'sol-u6-l1': {
      labs: ['sol-escape'],
      sort: sort(
        'Which class of biomolecule is it?',
        ['Protein', 'Nucleic acid', 'Lipid', 'Carbohydrate'],
        [
          ['Built from amino acids and acts as an enzyme', 0],
          ['Stores genetic information in nucleotides', 1],
          ['Forms the double layer of a cell membrane', 2],
          ['A sugar such as glucose used for energy', 3],
          ['RNA copied from a DNA template', 1],
          ['Glycine joined into chains', 0],
        ],
      ),
      checks: [
        check(
          2,
          'Comet 67P’s water has a D/H ratio about three times Earth’s oceans. What does this suggest?',
          [
            'Comets like 67P were not Earth’s main water source',
            'Earth’s water came only from 67P',
            'Comets contain no water',
          ],
          'Water from the main source should share Earth’s isotope fingerprint; 67P’s does not match.',
        ),
      ],
    },
    'sol-u7-l1': {
      labs: ['sol-transit'],
      sort: sort(
        'Which detection method fits?',
        ['Transit', 'Radial velocity', 'Microlensing', 'Direct imaging'],
        [
          ['A periodic dip in a star’s brightness', 0],
          ['A star’s spectral lines shift back and forth', 1],
          ['A one-time brightening of a background star with a short spike', 2],
          ['A coronagraph blocks starlight to photograph a young planet', 3],
          ['Gives the planet’s radius', 0],
          ['Gives the planet’s minimum mass', 1],
        ],
      ),
      checks: [
        check(
          1,
          'Which method can detect free-floating planets with no star?',
          ['Microlensing', 'Radial velocity', 'Transit'],
          'Microlensing relies only on the planet’s gravity bending background light, so no host star is needed.',
        ),
      ],
    },
  },
};
