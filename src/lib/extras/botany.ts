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
  type Shape,
  type Tone,
  type TopicLab,
} from '../topic-lab-kit.ts';

const production: TopicLab = {
  id: 'bot-production',
  title: 'From sunlight to primary production',
  lead: 'Plants fix a small share of incoming light as chemical energy, spend part of it on their own respiration, and pass a fraction of the rest up the food web.',
  controls: [
    slider('sun', 'Sunlight reaching the canopy', 5, 30, 1, 18, 'MJ/m²/day'),
    slider('eff', 'Photosynthetic efficiency', 0.1, 4, 0.1, 1, '%'),
    slider('resp', 'Share of fixed energy respired by the plants', 20, 80, 5, 50, '%'),
    slider('transfer', 'Transfer efficiency between trophic levels', 5, 20, 1, 10, '%'),
  ],
  run: (v) => {
    const gpp = v.sun * v.eff * 10,
      npp = gpp * (1 - v.resp / 100),
      herb = (npp * v.transfer) / 100,
      carn = (herb * v.transfer) / 100;
    return {
      o: { gpp, npp, herb, carn },
      metrics: [
        { label: 'Gross primary production', value: gpp, unit: 'kJ/m²/day' },
        { label: 'Net primary production', value: npp, unit: 'kJ/m²/day' },
        { label: 'Energy reaching herbivores', value: herb, unit: 'kJ/m²/day' },
        { label: 'Energy reaching carnivores', value: carn, unit: 'kJ/m²/day' },
      ],
      bars: {
        title: 'Energy flow (kJ per m² per day)',
        items: [
          { label: 'Gross primary production', value: gpp, tone: 'green' },
          { label: 'Net primary production', value: npp, tone: 'accent' },
          { label: 'Herbivore production', value: herb, tone: 'gold' },
          { label: 'Carnivore production', value: carn, tone: 'warm' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Find the respiration share at which net production is exactly one quarter of gross production.',
      'NPP = GPP × (1 − respired fraction).',
      { resp: 75 },
      (o) => near(o.npp / o.gpp, 0.25, 1e-9),
    ),
    goal(
      'Double the starting net production by changing only photosynthetic efficiency.',
      'Production is proportional to efficiency.',
      { eff: 2 },
      (o, v) => v.sun === 18 && v.resp === 50 && near(o.npp, 180, 1e-6),
    ),
    goal(
      'Support at least 5 kJ/m²/day of carnivore production.',
      'Raise both the base of the food web and the transfer efficiency.',
      { eff: 2, transfer: 20 },
      (o) => o.carn >= 5,
    ),
  ],
  predict: {
    q: 'Net primary production is best described as…',
    options: [
      'Gross production minus the energy plants use in their own respiration',
      'All of the sunlight striking the leaves',
      'The energy stored by herbivores',
      'Gross production plus respiration',
    ],
    correct: 0,
    why: 'Plants respire much of what they fix. Only the remainder is stored as new biomass, and that is what every consumer in the ecosystem depends on.',
  },
  model:
    'GPP = sunlight × efficiency; NPP = GPP × (1 − respired share); each trophic step retains a fixed transfer fraction. Whole-ecosystem efficiencies near 1% and transfers near 10% are typical averages with wide real variation.',
};

const osmosis: TopicLab = {
  id: 'bot-osmosis',
  title: 'A plant cell in solution: turgor and plasmolysis',
  lead: 'Water moves toward the more negative water potential. The cell wall resists swelling, so pressure builds — until the outside solution becomes stronger than the cell sap.',
  controls: [
    slider('conc', 'Sucrose concentration outside the cell', 0, 1, 0.02, 0.1, 'M'),
    slider('psis', 'Solute potential of the cell sap', -2, -0.2, 0.1, -0.7, 'MPa'),
  ],
  run: (v) => {
    const ext = -2.48 * v.conc,
      plas = ext < v.psis ? 1 : 0,
      psip = plas ? 0 : ext - v.psis,
      vol = plas ? v.psis / ext : 1,
      inset = (1 - Math.sqrt(vol)) * 90;
    return {
      o: { ext, psip, vol, plas },
      metrics: [
        { label: 'Water potential of the solution', value: Number(ext.toFixed(2)), unit: 'MPa' },
        { label: 'Turgor pressure in the cell', value: Number(psip.toFixed(2)), unit: 'MPa' },
        { label: 'Protoplast volume', value: vol * 100, unit: '% of full' },
        {
          label: 'Cell state',
          value: plas
            ? 'Plasmolysed — membrane pulled away from the wall'
            : psip < 0.03
              ? 'Flaccid — on the verge of plasmolysis'
              : 'Turgid',
        },
      ],
      sceneLabel: `Plant cell ${plas ? 'plasmolysed' : 'turgid'} with turgor ${psip.toFixed(2)} megapascals and protoplast at ${Math.round(vol * 100)} percent volume`,
      scene: [
        rect(170, 60, 300, 200, 'green', false, 1, 14),
        rect(
          176 + inset,
          66 + inset * 0.66,
          288 - inset * 2,
          188 - inset * 1.32,
          'green',
          true,
          0.35,
          12,
        ),
        ellipse(
          320,
          160,
          Math.max(20, 70 - inset),
          Math.max(14, 45 - inset * 0.6),
          'cool',
          true,
          0.5,
        ),
        text(320, 164, 'vacuole', 'middle', 'ink', 11),
        text(320, 48, 'cell wall', 'middle', 'muted', 11),
        ...(plas
          ? arrow(240, 290, 180, 290, 'cool', 2.5)
          : psip > 0.03
            ? arrow(180, 290, 240, 290, 'cool', 2.5)
            : []),
        text(
          260,
          294,
          plas
            ? 'water leaves the cell'
            : psip > 0.03
              ? 'water has entered until pressure balances'
              : 'no net movement',
          'start',
          'muted',
        ),
      ],
    };
  },
  missions: [
    goal(
      'Give the cell its maximum turgor pressure.',
      'Pure water has the highest possible water potential.',
      { conc: 0 },
      (o, v) => v.conc === 0 && o.psip > 0.6,
    ),
    goal(
      'Find incipient plasmolysis: turgor within 0.03 MPa of zero, with the membrane still against the wall.',
      'The outside water potential must just match the sap’s solute potential.',
      { conc: 0.28 },
      (o) => o.plas === 0 && o.psip < 0.03,
    ),
    goal(
      'Shrink the protoplast to less than 60% of its full volume.',
      'Make the bathing solution much stronger than the cell sap.',
      { conc: 0.48 },
      (o) => o.vol < 0.6,
    ),
  ],
  predict: {
    q: 'A plant cell is placed in a concentrated sugar solution. What happens?',
    options: [
      'It loses water and its membrane pulls away from the wall',
      'It swells and bursts',
      'It gains water and becomes more turgid',
      'Nothing; the wall blocks water movement',
    ],
    correct: 0,
    why: 'The solution’s water potential is lower than the cell’s, so water leaves by osmosis. The rigid wall keeps its shape while the protoplast shrinks.',
  },
  model:
    'Ψ = Ψs + Ψp with Ψs of the external solution = −iCRT (−2.48 MPa per mol/L at 25 °C for a non-ionising solute). The wall is treated as rigid and the cell’s solute content as fixed, so a plasmolysed protoplast shrinks until its sap matches the solution.',
};

const rootHair: TopicLab = {
  id: 'bot-roothair',
  title: 'Root hairs and absorbing surface',
  lead: 'A root hair is a single epidermal cell extended into the soil. Thousands of them change the root’s contact with soil water out of all proportion to their size.',
  controls: [
    slider('len', 'Length of root in the hair zone', 1, 50, 1, 10, 'cm'),
    slider('density', 'Root hairs per millimetre of root', 0, 600, 20, 100, ''),
    slider('hair', 'Length of each hair', 0.1, 2, 0.1, 1, 'mm'),
  ],
  run: (v) => {
    const root = 2 * Math.PI * 0.5 * v.len * 10,
      hairs = v.density * v.len * 10 * 2 * Math.PI * 0.005 * v.hair,
      ratio = (root + hairs) / root;
    return {
      o: { root, hairs, ratio },
      metrics: [
        { label: 'Surface of the bare root cylinder', value: root, unit: 'mm²' },
        { label: 'Surface added by root hairs', value: hairs, unit: 'mm²' },
        { label: 'Total surface relative to a hairless root', value: ratio, unit: '×' },
        { label: 'Number of hairs', value: v.density * v.len * 10 },
      ],
      bars: {
        title: 'Absorbing surface (mm²)',
        items: [
          { label: 'Root cylinder', value: root, tone: 'gold' },
          { label: 'Root hairs', value: hairs, tone: 'green' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Triple the absorbing surface compared with a hairless root.',
      'The hairs must contribute twice the area of the root cylinder.',
      { density: 200 },
      (o) => near(o.ratio, 3, 0.02),
    ),
    goal(
      'Model a hairless mutant and read its relative surface.',
      'With no hairs the ratio must be exactly 1.',
      { density: 0 },
      (o) => o.ratio === 1,
    ),
    goal(
      'Reach a tenfold increase in absorbing surface.',
      'Combine a high hair density with long hairs.',
      { density: 520, hair: 1.8 },
      (o) => o.ratio >= 10,
    ),
  ],
  predict: {
    q: 'Root hairs are important for water and mineral uptake mainly because they…',
    options: [
      'Greatly increase the surface area in contact with soil water',
      'Pump water using ATP',
      'Anchor the plant against wind',
      'Carry out photosynthesis underground',
    ],
    correct: 0,
    why: 'Uptake happens across the epidermal surface. Fine hairs reach into soil pores and multiply that surface; they are too delicate to anchor the plant.',
  },
  model:
    'Root treated as a cylinder 0.5 mm in radius and each hair as a cylinder 5 µm in radius; areas are lateral surfaces only. Mycorrhizal fungi, which extend the absorbing network much further in most plants, are not included.',
};

const waterPotential: TopicLab = {
  id: 'bot-waterpotential',
  title: 'The soil–plant–air water-potential gradient',
  lead: 'Water moves up a plant only because each step is at a lower water potential than the one before. Dry air sits at the far end of a very steep slope.',
  controls: [
    slider('soil', 'Soil water potential', -2, 0, 0.05, -0.3, 'MPa'),
    slider('rh', 'Relative humidity of the air', 20, 100, 1, 50, '%'),
    slider('stomata', 'Stomatal opening', 0, 100, 5, 80, '%'),
  ],
  run: (v) => {
    const air = 135 * Math.log(v.rh / 100),
      flow = (v.stomata / 100) * (1 - v.rh / 100),
      leaf = v.soil - 0.2 - 1.2 * flow,
      rows: [string, number, Tone][] = [
        ['Outside air', air, 'warm'],
        ['Leaf', leaf, 'green'],
        ['Stem xylem', (leaf + v.soil - 0.1) / 2, 'green'],
        ['Root', v.soil - 0.1, 'gold'],
        ['Soil', v.soil, 'gold'],
      ];
    return {
      o: { air, leaf, flow },
      metrics: [
        { label: 'Water potential of the air', value: Number(air.toFixed(1)), unit: 'MPa' },
        { label: 'Leaf water potential', value: Number(leaf.toFixed(2)), unit: 'MPa' },
        { label: 'Relative transpiration rate', value: flow * 100, unit: '% of maximum' },
        {
          label: 'Plant status',
          value:
            leaf < -2
              ? 'Severe water stress — wilting likely'
              : leaf < -1.2
                ? 'Moderate stress'
                : 'Well supplied',
        },
      ],
      sceneLabel: `Water potential from soil ${v.soil} megapascals to leaf ${leaf.toFixed(2)} to air ${air.toFixed(0)} megapascals`,
      scene: [
        ...rows.flatMap(([name, value, tone], i): Shape[] => [
          rect(200, 40 + i * 54, 240, 40, tone, true, 0.25, 6),
          text(216, 65 + i * 54, name),
          text(424, 65 + i * 54, `${value.toFixed(value < -10 ? 0 : 2)} MPa`, 'end'),
        ]),
        ...(flow > 0 ? arrow(150, 290, 150, 60, 'cool', 2 + flow * 6) : []),
        text(
          150,
          316,
          flow > 0 ? 'water moves up' : 'no transpiration stream',
          'middle',
          'cool',
          11,
        ),
        text(500, 180, 'more negative ↑', 'middle', 'muted', 11),
      ],
    };
  },
  missions: [
    goal(
      'Find the humidity at which the air’s water potential is about −30 MPa.',
      'Even fairly humid air is far “drier” than any leaf: try about 80%.',
      { rh: 80 },
      (o) => near(o.air, -30, 1),
    ),
    goal(
      'Stop the transpiration stream without changing the humidity.',
      'Close the pores through which water vapour leaves.',
      { stomata: 0 },
      (o, v) => v.rh === 50 && o.flow === 0,
    ),
    goal(
      'Dry the soil until leaf water potential falls below −2 MPa.',
      'The leaf must always be more negative than the soil for water to keep flowing.',
      { soil: -1.4 },
      (o) => o.leaf < -2,
    ),
  ],
  predict: {
    q: 'Along the pathway from soil to atmosphere, the largest single drop in water potential is usually…',
    options: [
      'Between the leaf’s air spaces and the outside air',
      'Between the soil and the root',
      'Along the stem xylem',
      'Between the root and the stem',
    ],
    correct: 0,
    why: 'Unsaturated air has a water potential of tens of megapascals below zero, while the whole liquid pathway spans only a megapascal or two. Stomata sit at this steep step.',
  },
  model:
    'Air water potential = (RT/V̄w) ln(RH) ≈ 135 MPa × ln(RH) near 20 °C. Leaf water potential is the soil value minus a fixed gravitational/root term and a term proportional to transpiration. A schematic steady state; real plants adjust stomata dynamically and xylem can cavitate.',
};

const phototropism: TopicLab = {
  id: 'bot-phototropism',
  title: 'Phototropism in a seedling shoot',
  lead: 'Repeat the classic coleoptile experiments. Where the light comes from and what you do to the tip decide whether, and which way, the shoot bends.',
  controls: [
    choice('light', 'Light direction', ['Overhead', 'From the left', 'From the right'], 0),
    choice('tip', 'Shoot tip', ['Intact', 'Covered with an opaque cap', 'Removed'], 0),
    slider('hours', 'Hours of exposure', 0, 12, 1, 0, 'h'),
  ],
  run: (v) => {
    const dir = v.light === 1 ? -1 : v.light === 2 ? 1 : 0,
      senses = v.tip === 0 ? 1 : 0,
      angle = dir * senses * Math.min(60, 5 * v.hours),
      growth = v.tip === 2 ? 0 : v.hours * 1.5,
      rad = (angle * Math.PI) / 180,
      tall = 110 + growth * 4,
      tx = 320 + Math.sin(rad) * tall,
      ty = 290 - Math.cos(rad) * tall;
    return {
      o: { angle, growth },
      metrics: [
        {
          label: 'Curvature',
          value:
            angle === 0
              ? 'None — straight'
              : `${Math.abs(angle)}° toward the ${angle < 0 ? 'left' : 'right'}`,
        },
        { label: 'Elongation', value: growth, unit: 'mm' },
        {
          label: 'Auxin distribution below the tip',
          value:
            v.tip === 2
              ? 'No auxin source'
              : angle !== 0
                ? 'More on the shaded side'
                : 'Even on both sides',
        },
      ],
      sceneLabel: `Seedling shoot with ${angle === 0 ? 'no curvature' : `${Math.abs(angle)} degrees of curvature toward the light`}`,
      scene: [
        line(120, 290, 520, 290, 'muted', 3),
        path(
          `M320 290Q320 ${290 - tall * 0.55} ${tx.toFixed(1)} ${ty.toFixed(1)}`,
          'green',
          false,
          12,
        ),
        ...(v.tip === 1
          ? [circle(tx, ty, 9, 'ink')]
          : v.tip === 2
            ? [line(tx - 9, ty, tx + 9, ty, 'warm', 3)]
            : [circle(tx, ty, 6, 'gold')]),
        ...(dir === 0
          ? [
              ...arrow(320, 30, 320, 70, 'gold', 2.5),
              ...arrow(280, 30, 280, 70, 'gold', 2.5),
              ...arrow(360, 30, 360, 70, 'gold', 2.5),
            ]
          : [0, 1, 2].flatMap((i) =>
              arrow(320 + dir * 230, 110 + i * 40, 320 + dir * 180, 110 + i * 40, 'gold', 2.5),
            )),
        ...(angle !== 0
          ? [0, 1, 2, 3].map((i) =>
              circle(320 - dir * 12 + Math.sin(rad) * i * 18, 270 - i * 22, 3, 'warm'),
            )
          : []),
        text(
          320,
          320,
          angle !== 0
            ? 'Orange dots: auxin concentrated on the shaded side, where cells elongate more'
            : 'No lateral difference in auxin',
          'middle',
          'muted',
          11,
        ),
      ],
    };
  },
  missions: [
    goal(
      'Make an intact shoot grow straight for at least six hours.',
      'Light from directly above gives no left–right difference.',
      { hours: 6 },
      (o, v) => v.tip === 0 && v.hours >= 6 && o.angle === 0 && o.growth > 0,
    ),
    goal(
      'Bend the shoot at least 30° toward light from the left.',
      'Side light, an intact tip, and enough time.',
      { light: 1, hours: 6 },
      (o, v) => v.light === 1 && o.angle <= -30,
    ),
    goal(
      'Show that covering the tip abolishes bending even with six hours of side light.',
      'The tip is where the direction of light is sensed.',
      { light: 2, tip: 1, hours: 6 },
      (o, v) => v.light !== 0 && v.tip === 1 && v.hours >= 6 && o.angle === 0,
    ),
  ],
  predict: {
    q: 'A shoot bends toward light because auxin…',
    options: [
      'Accumulates on the shaded side, where cells then elongate more',
      'Accumulates on the lit side, where cells elongate more',
      'Is destroyed everywhere by light',
      'Makes cells on the lit side divide faster',
    ],
    correct: 0,
    why: 'Auxin moves laterally away from the light. Faster elongation on the shaded flank pushes the tip over toward the light source.',
  },
  model:
    'Cholodny–Went picture: the tip senses light and exports auxin asymmetrically; curvature grows at 5° per hour up to 60°. An opaque cap blocks sensing but not auxin supply; removing the tip removes the supply. Real responses depend on wavelength (blue light) and fluence.',
};

const germination: TopicLab = {
  id: 'bot-germination',
  title: 'Germination: temperature, water, and dormancy',
  lead: 'A seed needs suitable conditions — and may also need a signal that winter has passed. Compare a seed with no dormancy and one that requires chilling.',
  controls: [
    choice(
      'species',
      'Seed',
      ['Lettuce — no chilling requirement', 'Apple — needs cold, moist stratification'],
      1,
    ),
    slider('temp', 'Germination temperature', 0, 45, 1, 15, '°C'),
    slider('moist', 'Soil moisture', 0, 100, 5, 60, '% of field capacity'),
    slider('chill', 'Weeks of cold, moist storage first', 0, 12, 1, 0, 'weeks'),
  ],
  run: (v) => {
    const heat = (t: number) => (t <= 3 || t >= 38 ? 0 : t <= 22 ? (t - 3) / 19 : (38 - t) / 16),
      water =
        v.moist < 20
          ? 0
          : v.moist <= 60
            ? (v.moist - 20) / 40
            : v.moist <= 90
              ? 1
              : 1 - (v.moist - 90) / 20,
      released = v.species === 0 ? 1 : Math.min(1, v.chill / 8);
    const germ = (t: number) => 95 * heat(t) * water * released;
    return {
      o: { germ: germ(v.temp), released },
      metrics: [
        { label: 'Seeds germinating', value: germ(v.temp), unit: '%' },
        { label: 'Dormancy released', value: released * 100, unit: '%' },
        {
          label: 'Limiting factor',
          value:
            released < 1
              ? 'Dormancy not yet broken'
              : heat(v.temp) === 0
                ? 'Temperature outside the workable range'
                : water < 0.5
                  ? 'Water supply'
                  : heat(v.temp) < 0.5
                    ? 'Temperature'
                    : 'None — near optimum',
        },
      ],
      plot: {
        title: 'Germination against temperature at this moisture',
        x: [0, 45, 'Temperature (°C)'],
        y: [0, 100, 'Germination (%)'],
        curves: [{ f: germ }],
        points: [{ x: v.temp, y: germ(v.temp), label: `${germ(v.temp).toFixed(0)}%` }],
      },
    };
  },
  missions: [
    goal(
      'Show that warmth and water alone cannot germinate an unchilled apple seed.',
      'Give it ideal conditions — about 22 °C and moist soil — with no cold treatment.',
      { temp: 22 },
      (o, v) => v.species === 1 && v.chill === 0 && v.temp === 22 && v.moist >= 60 && o.germ === 0,
    ),
    goal(
      'Break the apple seed’s dormancy and germinate more than 80%.',
      'Eight weeks of cold, then return to the optimum temperature.',
      { chill: 8, temp: 22 },
      (o, v) => v.species === 1 && o.germ > 80,
    ),
    goal(
      'Find a temperature too hot for lettuce to germinate at all.',
      'Above the maximum cardinal temperature the response falls to zero.',
      { species: 0, temp: 40 },
      (o, v) => v.species === 0 && v.temp >= 38 && o.germ === 0,
    ),
  ],
  predict: {
    q: 'Many temperate tree seeds will not germinate until they have spent weeks cold and moist. The advantage is that it prevents…',
    options: [
      'Germination in autumn, just before winter would kill the seedling',
      'Seeds from being eaten',
      'Seeds from absorbing water',
      'Photosynthesis in the seed',
    ],
    correct: 0,
    why: 'A chilling requirement works as a winter counter: only after enough cold has accumulated does a warm spell trigger growth.',
  },
  model:
    'Cardinal-temperature response (base 3 °C, optimum 22 °C, maximum 38 °C), a moisture response that falls off in dry and waterlogged soil, and dormancy released linearly over eight weeks of stratification. Illustrative values; real species differ widely and many also respond to light.',
};

const groups: TopicLab = {
  id: 'bot-groups',
  title: 'Sorting plants by their key innovations',
  lead: 'Three evolutionary innovations divide the land plants into their major groups. Record what a specimen has and see where it belongs.',
  controls: [
    toggle('vascular', 'Has xylem and phloem'),
    toggle('seeds', 'Produces seeds'),
    toggle('flowers', 'Produces flowers and fruit'),
    choice('petals', 'Flower parts', ['Not observed', 'In threes', 'In fours or fives'], 0),
    choice('veins', 'Leaf venation', ['Not observed', 'Parallel', 'Netted'], 0),
  ],
  run: (v) => {
    const impossible = (v.seeds && !v.vascular) || (v.flowers && !v.seeds),
      id = impossible
        ? 9
        : !v.vascular
          ? 0
          : !v.seeds
            ? 1
            : !v.flowers
              ? 2
              : v.petals === 1 && v.veins === 1
                ? 4
                : v.petals === 2 && v.veins === 2
                  ? 5
                  : 3;
    const name: Record<number, string> = {
      0: 'Bryophyte (moss, liverwort, hornwort)',
      1: 'Seedless vascular plant (fern, lycophyte)',
      2: 'Gymnosperm (conifer, cycad, ginkgo)',
      3: 'Angiosperm — more evidence needed for monocot or eudicot',
      4: 'Angiosperm: monocot',
      5: 'Angiosperm: eudicot',
      9: 'No living plant group has this combination',
    };
    const tip = id >= 3 && id <= 5 ? 3 : id;
    const tips = ['Bryophytes', 'Ferns & allies', 'Gymnosperms', 'Angiosperms'];
    return {
      o: { id },
      metrics: [
        { label: 'Group', value: name[id] },
        {
          label: 'Dominant generation',
          value: id === 9 ? '—' : id === 0 ? 'Gametophyte (haploid)' : 'Sporophyte (diploid)',
        },
        {
          label: 'Needs free water for fertilisation',
          value: id === 9 ? '—' : id <= 1 ? 'Yes — swimming sperm' : 'No — pollen delivers sperm',
        },
      ],
      sceneLabel: `Land-plant tree with ${id === 9 ? 'no group' : tips[tip]} highlighted`,
      scene: [
        line(80, 290, 540, 80, 'muted', 3),
        ...tips.flatMap((label, i): Shape[] => {
          const bx = 150 + i * 120,
            by = 290 - ((bx - 80) / 460) * 210;
          return [
            line(bx, by, bx, 50, tip === i ? 'slot' : 'muted', tip === i ? 4 : 2),
            text(bx, 38, label, 'middle', tip === i ? 'slot' : 'muted', 12),
          ];
        }),
        ...[
          ['vascular tissue', 210],
          ['seeds', 330],
          ['flowers', 450],
        ].flatMap(([label, x]): Shape[] => {
          const px = Number(x),
            py = 290 - ((px - 80) / 460) * 210;
          return [
            line(px - 8, py - 8, px + 8, py + 8, 'gold', 3),
            text(px + 12, py + 22, String(label), 'start', 'gold', 11),
          ];
        }),
        text(320, 326, 'Tick marks show where each innovation arose', 'middle', 'muted', 11),
      ],
    };
  },
  missions: [
    goal(
      'Describe a fern: record the combination that places a plant among the seedless vascular plants.',
      'Vascular tissue, but neither seeds nor flowers.',
      { vascular: 1 },
      (o) => o.id === 1,
    ),
    goal(
      'Describe a pine: record the combination that makes it a gymnosperm.',
      'Seeds, but no flowers or fruit.',
      { vascular: 1, seeds: 1 },
      (o) => o.id === 2,
    ),
    goal(
      'Describe a lily well enough to call it a monocot.',
      'A flowering plant with parts in threes and parallel veins.',
      { vascular: 1, seeds: 1, flowers: 1, petals: 1, veins: 1 },
      (o) => o.id === 4,
    ),
    goal(
      'Record a combination that no living plant group shows.',
      'Each innovation was built on the one before: try seeds without vascular tissue.',
      { seeds: 1 },
      (o) => o.id === 9,
    ),
  ],
  predict: {
    q: 'Which feature is shared by gymnosperms and angiosperms but is absent from ferns?',
    options: ['Seeds', 'Vascular tissue', 'A dominant sporophyte', 'Spores'],
    correct: 0,
    why: 'Ferns have vascular tissue and a dominant sporophyte but disperse by spores. The seed — an embryo with stored food in a protective coat — arose later.',
  },
  model:
    'A simplified key using three nested innovations and two classic monocot–eudicot traits. Real classification rests on many characters and on DNA; some flowering plants (for example basal angiosperms) fit neither the monocot nor the eudicot pattern.',
};

const a3 = (t: number, c: number) =>
  35 *
  (c / (c + 350)) *
  Math.exp(-(((t - 25) / 14) ** 2)) *
  (1 - Math.min(0.6, 0.25 * (400 / c) * 2 ** ((t - 25) / 10)));
const a4 = (t: number, c: number) => 36 * Math.min(1, c / 250) * Math.exp(-(((t - 34) / 13) ** 2));
const pathways: TopicLab = {
  id: 'bot-c3c4',
  title: 'C₃ versus C₄ photosynthesis',
  lead: 'Rubisco sometimes fixes oxygen instead of CO₂, and it does so more as leaves warm. C₄ plants pay extra energy to avoid that loss. See when the investment pays.',
  controls: [
    slider('t', 'Leaf temperature', 5, 45, 1, 25, '°C'),
    slider('co2', 'Atmospheric CO₂', 150, 1000, 10, 400, 'ppm'),
  ],
  run: (v) => ({
    o: { c3: a3(v.t, v.co2), c4: a4(v.t, v.co2) },
    metrics: [
      { label: 'C₃ net assimilation', value: a3(v.t, v.co2), unit: 'µmol CO₂/m²/s' },
      { label: 'C₄ net assimilation', value: a4(v.t, v.co2), unit: 'µmol CO₂/m²/s' },
      {
        label: 'C₃ carbon lost to photorespiration',
        value: Math.min(0.6, 0.25 * (400 / v.co2) * 2 ** ((v.t - 25) / 10)) * 100,
        unit: '%',
      },
      {
        label: 'Better performer here',
        value: a3(v.t, v.co2) > a4(v.t, v.co2) ? 'C₃ plant' : 'C₄ plant',
      },
    ],
    plot: {
      title: `Net assimilation at ${v.co2} ppm CO₂`,
      x: [5, 45, 'Leaf temperature (°C)'],
      y: [0, 40, 'Net assimilation (µmol/m²/s)'],
      curves: [
        { f: (t) => a3(t, v.co2), label: 'C₃ (wheat, rice, trees)', tone: 'green' },
        { f: (t) => a4(t, v.co2), label: 'C₄ (maize, sugarcane)', tone: 'warm' },
      ],
      points: [
        { x: v.t, y: a3(v.t, v.co2), tone: 'green' },
        { x: v.t, y: a4(v.t, v.co2), tone: 'warm' },
      ],
    },
  }),
  missions: [
    goal(
      'At 400 ppm CO₂, find a temperature at which the C₃ plant out-performs the C₄ plant.',
      'Photorespiration is small when leaves are cool.',
      { t: 15 },
      (o, v) => v.co2 === 400 && o.c3 > o.c4,
    ),
    goal(
      'At 25 °C, raise CO₂ until the C₃ plant matches or beats the C₄ plant.',
      'Extra CO₂ suppresses photorespiration, which only the C₃ plant suffers from.',
      { co2: 900 },
      (o, v) => v.t === 25 && o.c3 >= o.c4,
    ),
    goal(
      'At 400 ppm, find hot conditions in which the C₄ plant fixes at least three times as much carbon as the C₃ plant.',
      'Go to 38 °C or above.',
      { t: 40 },
      (o, v) => v.t >= 38 && v.co2 === 400 && o.c4 >= 3 * o.c3,
    ),
  ],
  predict: {
    q: 'In which environment does the C₄ pathway offer the greatest advantage over C₃?',
    options: [
      'Hot, bright, and often dry',
      'Cool and shaded',
      'Cold and wet',
      'Any environment with very high CO₂',
    ],
    correct: 0,
    why: 'Heat increases photorespiration, and closing stomata to save water lowers internal CO₂ further. Concentrating CO₂ around Rubisco avoids both problems.',
  },
  model:
    'Illustrative response surfaces: a C₃ curve with a CO₂-saturating term and a photorespiratory loss that doubles every 10 °C and falls as CO₂ rises; a C₄ curve with a warmer optimum that saturates above about 250 ppm. Curves show the qualitative crossover, not any particular species.',
};

const appearances: [string, number, Tone][] = [
  ['Non-vascular land plants', 470, 'green'],
  ['Vascular plants', 425, 'green'],
  ['Forest trees (lycophytes, tree ferns)', 385, 'cool'],
  ['Seed plants', 365, 'cool'],
  ['Conifers', 310, 'accent'],
  ['Flowering plants', 135, 'warm'],
  ['Grasses', 65, 'gold'],
];
const tx = (ma: number) => 600 - (ma / 500) * 380;
const timeline: TopicLab = {
  id: 'bot-timeline',
  title: 'Plant evolution on a timeline',
  lead: 'Slide back through 500 million years. Each major plant group enters the fossil record at a different time, and each built on what came before.',
  controls: [slider('age', 'Time before present', 0, 500, 5, 0, 'million years')],
  run: (v) => {
    const present = appearances.filter(([, first]) => v.age <= first);
    return {
      o: {
        count: present.length,
        seed: v.age <= 365 ? 1 : 0,
        flower: v.age <= 135 ? 1 : 0,
        vascular: v.age <= 425 ? 1 : 0,
      },
      metrics: [
        { label: 'Groups present in the fossil record', value: present.length },
        {
          label: 'Most recent arrival',
          value: present.length
            ? present[present.length - 1][0]
            : 'No land plants yet — only algae in water',
        },
        {
          label: 'Landscape',
          value:
            v.age > 470
              ? 'Bare rock and microbial crusts'
              : v.age > 385
                ? 'Low ground cover only'
                : v.age > 135
                  ? 'Forests without flowers'
                  : v.age > 65
                    ? 'Flowering forests, no grasslands'
                    : 'Modern vegetation types',
        },
      ],
      sceneLabel: `Timeline of plant groups with a marker at ${v.age} million years ago`,
      scene: [
        ...appearances.flatMap(([name, first, tone], i): Shape[] => [
          rect(
            tx(first),
            44 + i * 34,
            600 - tx(first),
            18,
            tone,
            true,
            v.age <= first ? 0.8 : 0.2,
            4,
          ),
          text(tx(first) - 8, 58 + i * 34, name, 'end', v.age <= first ? 'ink' : 'muted', 11),
        ]),
        line(tx(v.age), 30, tx(v.age), 290, 'slot', 2.5),
        text(tx(v.age), 24, `${v.age} Ma`, 'middle', 'slot'),
        line(220, 296, 600, 296, 'muted', 1.5),
        ...[500, 400, 300, 200, 100, 0].map((ma) =>
          text(tx(ma), 314, `${ma}`, 'middle', 'muted', 11),
        ),
        text(410, 334, 'Million years ago', 'middle'),
      ],
    };
  },
  missions: [
    goal(
      'Find a time when seed plants existed but flowering plants did not.',
      'Seeds appear in the Late Devonian; flowers not until the Cretaceous.',
      { age: 200 },
      (o) => o.seed === 1 && o.flower === 0,
    ),
    goal(
      'Visit the coal-forest world: forest trees present, but no conifers yet.',
      'Between about 385 and 310 million years ago.',
      { age: 330 },
      (o, v) => v.age <= 385 && v.age > 310,
    ),
    goal(
      'Find a time after the first land plants but before any had vascular tissue.',
      'The first land plants were small and moss-like.',
      { age: 450 },
      (o, v) => v.age <= 470 && o.vascular === 0,
    ),
  ],
  predict: {
    q: 'Which of these appears earliest in the fossil record?',
    options: [
      'Small land plants that reproduced by spores and lacked vascular tissue',
      'Conifers',
      'Flowering plants',
      'Grasses',
    ],
    correct: 0,
    why: 'Spores and fragments of bryophyte-grade plants date to the Ordovician. Vascular tissue, seeds, and flowers followed in that order.',
  },
  model:
    'Approximate first appearances in millions of years (land plants 470, vascular plants 425, forests 385, seed plants 365, conifers 310, flowering plants 135, grasses 65). Dates shift as new fossils are found, and molecular estimates of origin are usually older than the first fossils.',
};

const nutrients = [
  'No classic single-nutrient pattern',
  'Nitrogen',
  'Magnesium',
  'Phosphorus',
  'Potassium',
  'Iron',
  'Sulfur',
  'Calcium',
];
const table: number[][] = [
  [1, 2, 3, 4, 0],
  [6, 5, 0, 0, 0],
  [0, 0, 0, 0, 7],
];
const nutrient: TopicLab = {
  id: 'bot-nutrient',
  title: 'Reading nutrient-deficiency symptoms',
  lead: 'Where a symptom appears tells you whether the plant can move that nutrient. The pattern narrows it further — and soil pH can make a nutrient unavailable even when it is present.',
  controls: [
    choice(
      'where',
      'Where symptoms appear first',
      ['Older, lower leaves', 'Younger, upper leaves', 'Growing tips and new roots'],
      0,
    ),
    choice(
      'pattern',
      'Symptom pattern',
      [
        'Uniform pale yellow',
        'Yellow between green veins',
        'Purple or dark tint',
        'Scorched leaf margins',
        'Dying or distorted tissue',
      ],
      3,
    ),
    slider('ph', 'Soil pH', 4.5, 8.5, 0.1, 6.5, ''),
  ],
  run: (v) => {
    const id = table[v.where][v.pattern],
      mobile = id >= 1 && id <= 4,
      locked = id === 5 && v.ph > 7.5 ? 1 : 0;
    const tone = (zone: number): Tone => (zone === v.where ? 'warm' : 'green');
    return {
      o: { id, locked },
      metrics: [
        { label: 'Most likely deficiency', value: nutrients[id] },
        {
          label: 'Mobility in the plant',
          value:
            id === 0
              ? '—'
              : mobile
                ? 'Mobile — moved from old leaves to new growth'
                : 'Immobile — cannot be withdrawn from old tissue',
        },
        {
          label: 'Soil note',
          value: locked
            ? 'Iron is probably present but insoluble at this high pH'
            : v.ph < 5.5
              ? 'Acidic soil: phosphorus, calcium, and magnesium are less available'
              : 'pH is in a broadly suitable range',
        },
      ],
      sceneLabel: `Plant diagram with symptoms on the ${['older lower leaves', 'younger upper leaves', 'growing tip'][v.where]}; likely ${nutrients[id].toLowerCase()}`,
      scene: [
        line(320, 300, 320, 70, 'green', 6),
        ellipse(250, 250, 62, 22, tone(0), true, 0.6),
        ellipse(390, 250, 62, 22, tone(0), true, 0.6),
        ellipse(262, 170, 50, 18, tone(1), true, 0.6),
        ellipse(378, 170, 50, 18, tone(1), true, 0.6),
        ellipse(320, 66, 18, 26, tone(2), true, 0.7),
        text(120, 254, 'older leaves', 'middle', 'muted', 11),
        text(140, 174, 'younger leaves', 'middle', 'muted', 11),
        text(390, 60, 'growing tip', 'start', 'muted', 11),
        line(200, 300, 440, 300, 'muted', 3),
        text(320, 328, 'Orange marks where the symptom shows first', 'middle', 'muted', 11),
      ],
    };
  },
  missions: [
    goal(
      'Enter the symptoms that point to nitrogen deficiency.',
      'Nitrogen is mobile, so the oldest leaves yellow evenly first.',
      { pattern: 0 },
      (o) => o.id === 1,
    ),
    goal(
      'Enter the symptoms that point to iron deficiency.',
      'Iron is immobile: young leaves turn yellow while their veins stay green.',
      { where: 1, pattern: 1 },
      (o) => o.id === 5,
    ),
    goal(
      'Show iron chlorosis caused by alkaline soil rather than by a lack of iron.',
      'Keep the iron symptoms and raise the pH above 7.5.',
      { where: 1, pattern: 1, ph: 8 },
      (o) => o.locked === 1,
    ),
    goal(
      'Enter the symptoms that point to calcium deficiency.',
      'Calcium cannot be redistributed, so growing points die back.',
      { where: 2, pattern: 4 },
      (o) => o.id === 7,
    ),
  ],
  predict: {
    q: 'Deficiency of a mobile nutrient such as nitrogen shows first in…',
    options: [
      'Older leaves, because the plant relocates the nutrient to new growth',
      'The youngest leaves',
      'The roots only',
      'All leaves at once',
    ],
    correct: 0,
    why: 'Mobile nutrients are withdrawn from old tissue and sent to growing points, so the old leaves show the shortage while new ones look healthy.',
  },
  model:
    'A simplified diagnostic table of classic symptoms. Real diagnosis needs tissue and soil tests: diseases, herbicide injury, drought, and waterlogging mimic deficiencies, and several nutrients are often short together.',
};

const crops: [string, number, number][] = [
  ['Lettuce', 12, 17],
  ['Tomato', 20, 30],
  ['Seedlings and microgreens', 6, 12],
];
const light: TopicLab = {
  id: 'bot-dli',
  title: 'Daily light integral for an indoor crop',
  lead: 'Plants respond to the total light they receive in a day. Intensity and day length trade off — and each choice has an energy cost.',
  controls: [
    slider('ppfd', 'Light intensity (PPFD)', 50, 1000, 10, 200, 'µmol/m²/s'),
    slider('hours', 'Photoperiod', 6, 24, 1, 12, 'h'),
    choice(
      'crop',
      'Crop',
      crops.map(([name, lo, hi]) => `${name} · target ${lo}–${hi} mol/m²/day`),
      0,
    ),
  ],
  run: (v) => {
    const dli = (h: number) => v.ppfd * h * 0.0036,
      [, lo, hi] = crops[v.crop];
    return {
      o: { dli: dli(v.hours), kwh: ((v.ppfd / 2.5) * v.hours) / 1000 },
      metrics: [
        { label: 'Daily light integral', value: dli(v.hours), unit: 'mol/m²/day' },
        {
          label: 'Against the crop’s target',
          value:
            dli(v.hours) < lo
              ? 'Too little light — slow, stretched growth'
              : dli(v.hours) > hi
                ? 'More than needed — wasted energy or stress'
                : 'Within the target range',
        },
        { label: 'Lamp electricity', value: ((v.ppfd / 2.5) * v.hours) / 1000, unit: 'kWh/m²/day' },
      ],
      plot: {
        title: 'DLI = PPFD × hours × 0.0036',
        x: [6, 24, 'Photoperiod (h)'],
        y: [0, 60, 'Daily light integral (mol/m²/day)'],
        curves: [{ f: dli }],
        hlines: [
          { y: lo, label: 'target minimum' },
          { y: hi, label: 'target maximum' },
        ],
        points: [{ x: v.hours, y: dli(v.hours), label: dli(v.hours).toFixed(1) }],
      },
    };
  },
  missions: [
    goal(
      'Give lettuce its minimum target with a 16-hour day, using the lowest intensity that works.',
      'Solve PPFD × 16 × 0.0036 ≥ 12.',
      { hours: 16, ppfd: 210 },
      (o, v) => v.crop === 0 && v.hours === 16 && o.dli >= 12 && v.ppfd <= 210,
    ),
    goal(
      'Put a tomato crop inside its target range.',
      'Tomatoes need roughly twice the light lettuce does.',
      { crop: 1, ppfd: 400, hours: 14 },
      (o, v) => v.crop === 1 && o.dli >= 20 && o.dli <= 30,
    ),
    goal(
      'Deliver the same daily total as 300 µmol/m²/s for 12 hours, using only 150 µmol/m²/s.',
      'Halve the intensity and double the hours.',
      { ppfd: 150, hours: 24 },
      (o, v) => v.ppfd === 150 && near(o.dli, 12.96, 1e-6),
    ),
  ],
  predict: {
    q: 'The daily light integral a crop receives is determined by…',
    options: [
      'Light intensity multiplied by the hours of light',
      'Light intensity alone',
      'Day length alone',
      'The colour of the lamp only',
    ],
    correct: 0,
    why: 'DLI is the day’s total of photosynthetically active photons. Dim light for longer can match bright light for a shorter time.',
  },
  model:
    'DLI (mol/m²/day) = PPFD (µmol/m²/s) × hours × 3600 ÷ 10⁶. Target ranges are typical horticultural guidelines. Electricity assumes a fixture efficacy of 2.5 µmol/J with all light reaching the canopy; some crops also have day-length limits that DLI ignores.',
};

export const botanyExtras: EventExtras = {
  eventId: 'botany',
  labs: [
    production,
    osmosis,
    rootHair,
    waterPotential,
    phototropism,
    germination,
    groups,
    pathways,
    timeline,
    nutrient,
    light,
  ],
  lessons: {
    'bot-u1-l1': {
      labs: ['bot-production'],
      sort: sort(
        'Observation or inference?',
        ['Observation', 'Inference'],
        [
          ['The lower leaves are yellow', 0],
          ['The plant lacks nitrogen', 1],
          ['Stem height increased 4 cm in a week', 0],
          ['The plant prefers shade', 1],
          ['Leaves have a waxy surface', 0],
          ['The wax evolved to reduce water loss', 1],
        ],
      ),
      checks: [
        check(
          2,
          'Why do plants form the base of almost every terrestrial food web?',
          [
            'They convert light energy into chemical energy that consumers can use',
            'They are the largest organisms',
            'They recycle all nutrients themselves',
            'They do not respire',
          ],
          'Primary producers are the entry point for energy. Every consumer ultimately depends on the organic matter they fix.',
        ),
      ],
    },
    'bot-u2-l1': {
      labs: ['bot-osmosis'],
      phet: [
        phet(
          'membrane-transport',
          'Membrane Transport',
          'Root cells take up minerals and phloem cells load sugars across membranes. Compare what crosses unaided, what needs a channel, and what needs energy.',
          'Add small nonpolar molecules to one side. Do they cross without any protein?',
          'Add ions with no transport proteins, then insert a channel. What changes, and in which direction is the net movement?',
          'Insert a pump and supply energy. Can it move solute against its concentration gradient?',
        ),
      ],
      sort: sort(
        'Xylem or phloem?',
        ['Xylem', 'Phloem'],
        [
          ['Conducts water and minerals upward', 0],
          ['Conducts sugars from source to sink', 1],
          ['Conducting cells are dead at maturity', 0],
          ['Sieve-tube elements with companion cells', 1],
          ['Vessel elements and tracheids', 0],
          ['Flow driven by a pressure gradient built by loading sugar', 1],
        ],
      ),
      checks: [
        check(
          1,
          'A region of a root or shoot where cells divide rapidly is called a…',
          ['Meristem', 'Cortex', 'Stoma', 'Cuticle'],
          'Apical meristems lengthen the plant; lateral meristems (vascular and cork cambium) thicken it.',
        ),
      ],
    },
    'bot-u3-l1': {
      labs: ['bot-roothair'],
      sort: sort(
        'Root, stem, or leaf adaptation?',
        ['Root', 'Stem', 'Leaf'],
        [
          ['Root hairs for absorption', 0],
          ['A potato tuber storing starch', 1],
          ['Cactus spines', 2],
          ['A carrot taproot', 0],
          ['A strawberry runner', 1],
          ['Tendrils of a pea', 2],
        ],
      ),
      checks: [
        check(
          1,
          'The Casparian strip in the root endodermis forces water and minerals to…',
          [
            'Pass through cell membranes before entering the xylem',
            'Leak back into the soil',
            'Move only through cell walls',
            'Bypass the root entirely',
          ],
          'Blocking the wall pathway makes every solute cross a membrane, giving the plant selective control over what enters the vascular tissue.',
        ),
      ],
    },
    'bot-u4-l1': {
      labs: ['bot-waterpotential', 'bot-phototropism'],
      sort: sort(
        'Which hormone?',
        ['Auxin', 'Gibberellin', 'Abscisic acid', 'Ethylene'],
        [
          ['Promotes cell elongation and phototropism', 0],
          ['Stimulates stem elongation and seed germination', 1],
          ['Closes stomata during drought', 2],
          ['Ripens fruit', 3],
          ['Maintains apical dominance', 0],
          ['Promotes seed dormancy', 2],
        ],
      ),
      checks: [
        check(
          1,
          'According to the cohesion–tension theory, water is pulled up the xylem mainly by…',
          [
            'Evaporation from leaves creating tension in a continuous water column',
            'Root cells pumping it upward',
            'Atmospheric pressure pushing from below',
            'Phloem pressure',
          ],
          'Transpiration lowers the water potential in the leaf; hydrogen bonding between water molecules transmits that pull all the way down to the roots.',
        ),
      ],
    },
    'bot-u5-l1': {
      labs: ['bot-germination'],
      sort: sort(
        'Haploid or diploid?',
        ['Haploid (n)', 'Diploid (2n)'],
        [
          ['Pollen grain', 0],
          ['Zygote', 1],
          ['Moss leafy shoot', 0],
          ['Oak tree', 1],
          ['Egg cell', 0],
          ['Embryo in a seed', 1],
        ],
      ),
      checks: [
        check(
          2,
          'In flowering plants, double fertilisation produces…',
          [
            'A diploid zygote and a triploid endosperm',
            'Two diploid zygotes',
            'A haploid embryo and a diploid seed coat',
            'Two pollen tubes',
          ],
          'One sperm fuses with the egg; the other fuses with two polar nuclei to form the endosperm, the embryo’s food supply.',
        ),
      ],
    },
    'bot-u6-l1': {
      labs: ['bot-groups'],
      sort: sort(
        'Monocot or eudicot?',
        ['Monocot', 'Eudicot'],
        [
          ['Parallel leaf veins', 0],
          ['Netted leaf veins', 1],
          ['Flower parts in threes', 0],
          ['Flower parts in fours or fives', 1],
          ['Vascular bundles scattered in the stem', 0],
          ['A taproot system', 1],
        ],
      ),
      checks: [
        check(
          1,
          'Mosses stay small and live in damp places partly because they…',
          [
            'Lack lignified vascular tissue and have swimming sperm',
            'Cannot photosynthesise',
            'Have no cell walls',
            'Produce seeds too heavy to disperse',
          ],
          'Without xylem they cannot lift water far or support height, and fertilisation needs a film of water for sperm to swim through.',
        ),
      ],
    },
    'bot-u7-l1': {
      labs: ['bot-c3c4'],
      sort: sort(
        'Light reactions or Calvin cycle?',
        ['Light reactions', 'Calvin cycle'],
        [
          ['Water is split and O₂ released', 0],
          ['CO₂ is fixed by Rubisco', 1],
          ['ATP and NADPH are produced', 0],
          ['Takes place on thylakoid membranes', 0],
          ['Takes place in the stroma', 1],
          ['G3P sugar is produced', 1],
        ],
      ),
      checks: [
        check(
          3,
          'CAM plants reduce water loss by…',
          [
            'Opening stomata at night and storing CO₂ as organic acids',
            'Never opening their stomata',
            'Fixing CO₂ only in bundle-sheath cells',
            'Having no Rubisco',
          ],
          'Night air is cooler and more humid. CO₂ captured then is released behind closed stomata during the day for the Calvin cycle.',
        ),
      ],
    },
    'bot-u8-l1': {
      labs: ['bot-timeline'],
      sort: sort(
        'Which problem of life on land did it solve?',
        ['Drying out', 'Support and transport', 'Reproduction without water'],
        [
          ['Waxy cuticle', 0],
          ['Lignified xylem', 1],
          ['Pollen', 2],
          ['Stomata with guard cells', 0],
          ['Seeds', 2],
          ['Woody stems', 1],
        ],
      ),
      checks: [
        check(
          1,
          'The closest living relatives of land plants are…',
          ['Charophyte green algae', 'Brown algae (kelps)', 'Fungi', 'Cyanobacteria'],
          'Shared features such as the way cell walls form during division, and DNA evidence, link land plants to charophytes.',
        ),
      ],
    },
    'bot-u9-l1': {
      labs: ['bot-nutrient'],
      sort: sort(
        'Biotic or abiotic cause?',
        ['Biotic (a living agent)', 'Abiotic (non-living)'],
        [
          ['Powdery mildew fungus', 0],
          ['Frost damage', 1],
          ['Aphid-transmitted virus', 0],
          ['Nutrient deficiency', 1],
          ['Root-knot nematodes', 0],
          ['Herbicide drift', 1],
        ],
      ),
      checks: [
        check(
          2,
          'Legumes can grow in nitrogen-poor soil because their root nodules contain…',
          [
            'Bacteria that fix atmospheric nitrogen',
            'Fungi that release phosphorus',
            'Extra chloroplasts',
            'Stored nitrate from the seed',
          ],
          'Rhizobia convert N₂ into ammonia the plant can use, in exchange for sugars — a mutualism.',
        ),
      ],
    },
    'bot-u10-l1': {
      labs: ['bot-dli'],
      sort: sort(
        'Which propagation method?',
        ['Sexual (seed)', 'Asexual (vegetative)'],
        [
          ['Sowing tomato seed', 0],
          ['Rooting a stem cutting', 1],
          ['Grafting an apple scion', 1],
          ['Cross-pollinating two varieties', 0],
          ['Tissue culture from a leaf sample', 1],
          ['Planting an acorn', 0],
        ],
      ),
      checks: [
        check(
          1,
          'In hydroponics, plant roots obtain mineral nutrients from…',
          [
            'A nutrient solution, without soil',
            'The air around the leaves',
            'Soil bacteria only',
            'The plastic growing container',
          ],
          'Soil is a support and a reservoir, not a requirement. Supplying dissolved minerals, water, and oxygen directly to roots is sufficient.',
        ),
      ],
    },
  },
};
