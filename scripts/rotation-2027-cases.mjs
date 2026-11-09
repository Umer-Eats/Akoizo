// Original, fully supplied data exercises. All numerical observations are synthetic.
// Clauses refer to the checked-in 2027 event rule sections, not past topic rotations.
const w = (prompt, answer, clause, context = '') => ({
  prompt,
  answer,
  clause,
  context,
  points: 2,
});
const n = (
  prompt,
  value,
  units,
  clause,
  context = '',
  tolerance = Math.max(1e-12, Math.abs(value) * 0.002),
) => ({
  ...w(prompt, `${value} ${units}`.trim(), clause, context),
  numeric: { value, tolerance, units: ['', units], unitRequired: false },
});
const choice = (prompt, answer, wrong, clause, context = '') => ({
  ...w(prompt, answer, clause, context),
  options: [answer, ...wrong],
});

export function chemistryCases(f) {
  const p = 1 + f * 0.2,
    v = 4 + f,
    t = 300 + 20 * f,
    c = 0.1 + 0.02 * f,
    k = 2 + f;
  const gas = '3.e';
  const rates = '3.f (State/National where rate laws are used)';
  const data = `Synthetic initial-rate data (M/s): [A]=${c} M, [B]=0.10 M gives rate ${k * c * c * 0.1}; [A]=${2 * c}, [B]=0.10 gives ${k * 4 * c * c * 0.1}; [A]=${c}, [B]=0.20 gives ${k * c * c * 0.2}. Assume rate=k[A]^m[B]^n.`;
  return [
    n(
      `At constant temperature, a gas at ${p} atm occupies ${v} L. Compress it to ${v / 2} L. Find the final pressure.`,
      2 * p,
      'atm',
      gas,
    ),
    n(
      `At constant pressure, a gas occupies ${v} L at ${t} K. Find its volume at ${2 * t} K.`,
      2 * v,
      'L',
      gas,
    ),
    n(
      `A rigid vessel contains a gas at ${p} atm and ${t} K. Find its pressure at ${t / 2} K with no gas lost.`,
      p / 2,
      'atm',
      gas,
    ),
    n(
      `Use PV=nRT with R=0.08206 L atm/(mol K). P=${p} atm, V=${v} L and T=${t} K. Find the amount of gas.`,
      (p * v) / (0.08206 * t),
      'mol',
      gas,
    ),
    n(
      `A dry gas mixture has partial pressures ${p} atm and ${p / 2} atm. Find total pressure.`,
      1.5 * p,
      'atm',
      gas,
    ),
    n(
      `A mixture has ${2 + f} mol oxygen and ${6 + 3 * f} mol nitrogen at total pressure ${4 + f} atm. Find oxygen partial pressure.`,
      (4 + f) / 4,
      'atm',
      gas,
    ),
    n(
      `Gas collected over water has total pressure ${100 + f} kPa. Water-vapor pressure is supplied as ${3 + f} kPa. Find dry-gas pressure.`,
      97,
      'kPa',
      gas,
    ),
    n(
      "Two ideal gases at the same temperature have molar masses 4 and 16 g/mol. What is the diffusion-rate ratio light/heavy? Use Graham's law.",
      2,
      '',
      gas,
    ),
    n(
      `For 2 H2 + O2 -> 2 H2O, ${2 + f} mol O2 reacts completely with excess H2. How many moles of H2 are consumed?`,
      2 * (2 + f),
      'mol',
      '3.c, 3.e',
    ),
    w(
      'Explain why gas-law temperature ratios must use kelvin rather than degrees Celsius.',
      'Kelvin is proportional to absolute thermodynamic temperature. Celsius has an arbitrary offset; its ratios do not represent molecular kinetic-energy ratios.',
      gas,
    ),
    n(
      'Determine the order with respect to A from the supplied initial-rate data.',
      2,
      '',
      rates,
      data,
    ),
    n(
      'Determine the order with respect to B from the supplied initial-rate data.',
      1,
      '',
      rates,
      data,
    ),
    n(
      'Calculate k from the initial-rate data. Give its value in M^-2 s^-1.',
      k,
      'M^-2 s^-1',
      rates,
      data,
    ),
    n(
      `Predict the rate at [A]=${3 * c} M and [B]=0.10 M.`,
      k * 9 * c * c * 0.1,
      'M/s',
      rates,
      data,
    ),
    n(
      `For a first-order reaction, k=${0.693 / (10 + f)} s^-1. Use ln(2)=0.693 to calculate the half-life.`,
      10 + f,
      's',
      rates,
    ),
    n(
      `A first-order reactant starts at ${0.8 + 0.08 * f} M. Find concentration after three half-lives.`,
      (0.8 + 0.08 * f) / 8,
      'M',
      rates,
    ),
    n(
      `A zero-order reaction starts at ${1 + 0.1 * f} M and consumes reactant at 0.02 M/s. Find concentration after 10 s.`,
      0.8 + 0.1 * f,
      'M',
      rates,
    ),
    w(
      'A catalyst increases rate without changing reactant/product free energies. Explain the mechanism and whether the equilibrium constant changes.',
      'It offers a lower-activation-energy pathway and speeds approach to equilibrium. At fixed temperature it does not change the equilibrium constant.',
      '3.f.i',
    ),
    w(
      'Equal masses of the same solid react with excess acid under matched conditions. Why can smaller particles react faster?',
      'Smaller particles expose more surface area, increasing contact and collision opportunities; mass alone does not set exposed area.',
      '3.f.i',
    ),
    n(
      `At 300 K a rate constant is k1; at 330 K it is 2k1. Using R=8.314 J/(mol K), ln(2)=0.693 and ln(k2/k1)=Ea/R(1/T1-1/T2), find Ea.`,
      (8.314 * 0.693) / (1 / 300 - 1 / 330),
      'J/mol',
      rates,
    ),
  ];
}

export function waterCases(f, division) {
  const s = 20 + f * 2,
    o = 8 - f * 0.3;
  const ctx = `Synthetic estuary transect: river end salinity 0, marine end salinity ${s} practical-salinity units. After a nutrient pulse, dissolved oxygen falls from ${o} to ${o - 3} mg/L overnight. A separate closed BOD bottle starts at 8.0 mg/L and ends at ${5 - 0.2 * f} mg/L; ignore dilution and nitrification. These are teaching observations, not measurements from a real reef.`;
  const ecology = '3.Part I';
  const reef = '3.Part II';
  const monitor = '3.Part III';
  const salino = '3.Part IV';
  const reefBank = [
    [
      'A reef fish has fused beak-like teeth and scrapes algae from hard surfaces. Identify its common-name group.',
      'Parrotfish',
    ],
    [
      'A starfish has many arms and venomous spines and consumes live coral tissue. Identify it.',
      'Crown of thorns starfish',
    ],
    [
      'A reef-building animal secretes a hard calcium carbonate skeleton. Identify its listed group.',
      'Hard/stony coral',
    ],
    [
      'A dark urchin has conspicuously long slender spines and grazes algae. Identify its listed group.',
      'Long-spined black sea urchin',
    ],
    [
      'A shrimp has red-and-white bands and conspicuous elongated appendages. Identify the listed common-name group.',
      'Banded coral shrimp',
    ],
    [
      'An elongate, soft-bodied echinoderm processes sediment on the seafloor. Identify its listed group.',
      'Sea cucumber',
    ],
    [
      'Name the listed Indo-Pacific bivalve group with a large shell, mantle and photosynthetic symbionts.',
      'Giant clam',
    ],
    [
      'An elongate predatory fish shelters in reef crevices and has strong jaws. Identify the listed eel group.',
      'Moray eel',
    ],
    [
      'Name the listed overgrowing non-coral macroalgal category that can compete for reef space.',
      'Fleshy algae',
    ],
    [
      'Why can loss of parrotfish and grazing urchins favor macroalgal dominance?',
      'Reduced grazing can allow algal biomass to increase and compete with corals; nutrients and disturbance also matter.',
    ],
    [
      'Why does a single organism count not establish overall reef health?',
      'Interpret species identity, size, sampling effort, habitat and repeated measurements together; one count does not uniquely establish cause or condition.',
    ],
    [
      'Explain why identifying an organism from only its color can fail.',
      'Color can vary with age, lighting and species; use diagnostic structure, size, behavior and habitat together.',
    ],
  ];
  const rows = [
    w(
      'Explain why this transect is an estuary rather than a freshwater-only habitat.',
      'It connects river freshwater with seawater and has a salinity gradient produced by mixing.',
      ecology,
      ctx,
    ),
    w(
      'Explain how a nutrient pulse can lead to lower overnight oxygen.',
      'Nutrients can increase production; respiration and decomposition consume oxygen. Nighttime photosynthesis is absent, and mixing also affects the budget.',
      ecology,
      ctx,
    ),
    w(
      'Identify one watershed action that could reduce nutrient loading and explain its pathway.',
      'For example, reduce excess fertilizer and retain vegetated buffers to limit nutrient transport in runoff; identify a source and transport pathway.',
      ecology,
      ctx,
    ),
    w(
      'Explain how traditional ecological knowledge could improve this monitoring plan without replacing measured evidence.',
      'Collaborate with knowledge holders to identify historical baselines, seasonal changes and appropriate sampling locations; evaluate observations alongside recorded measurements and respect consent/context.',
      ecology,
      ctx,
    ),
    w(
      'Why should a reef food-web analysis distinguish herbivores from predators?',
      'They affect different trophic pathways; grazing regulates algae while predation affects prey populations, with indirect effects across the web.',
      ecology,
    ),
    w(
      'Distinguish a harmful algal bloom from an ordinary observation of green water.',
      'A bloom can cause toxins or oxygen stress, but color alone does not establish harmful species, toxins or ecological damage; additional evidence is needed.',
      ecology,
    ),
  ];
  for (let i = 0; i < 6; i++) {
    const [p, a] = reefBank[(i + (f - 1) * 3) % reefBank.length];
    rows.push(w(p, a, reef));
  }
  rows.push(
    n('Calculate the overnight dissolved-oxygen decline.', 3, 'mg/L', monitor, ctx),
    n(
      'Calculate the BOD-bottle oxygen demand under the stated assumptions.',
      3 + 0.2 * f,
      'mg/L',
      monitor,
      ctx,
    ),
    n(
      `A mixture contains equal volumes of freshwater and seawater with salinity ${s}. Assuming additive volumes and conservative mixing, estimate salinity.`,
      s / 2,
      '',
      monitor,
      ctx,
    ),
    w(
      'Aragonite saturation decreases while other factors are held fixed. Explain a relevant concern for stony corals.',
      'Lower aragonite saturation can make calcium-carbonate skeleton formation less favorable and increase dissolution risk; responses depend on organism and conditions.',
      monitor,
    ),
    w(
      'Explain why high turbidity and high dissolved-solids concentration are not interchangeable observations.',
      'Turbidity reflects light scattering by suspended material. Dissolved substances can change chemistry without producing the same scattering signal.',
      monitor,
    ),
    w(
      'A field pH value changes between daytime and predawn. Name a biological mechanism consistent with this and one check on the inference.',
      'Photosynthesis/respiration change dissolved CO2 and can shift pH. Check timing, calibration, temperature, depth, mixing and repeated observations before assigning a cause.',
      monitor,
    ),
    n(
      `A salinometer calibration gives reading 10 at 2% mass/volume salt and reading 30 at 6%. A sample reads ${15 + f}. Use linear interpolation to estimate concentration.`,
      3 + f * 0.2,
      '%',
      salino,
    ),
    n(
      `How many grams of salt are required for ${400 + f * 100} mL of final solution at 3% mass/volume?`,
      (400 + f * 100) * 0.03,
      'g',
      salino,
    ),
  );
  return rows;
}

export function remoteCases(f, division) {
  if (division === 'B') {
    const pix = 10 + f * 5,
      a = 120 + f * 10,
      b = 60 + f * 5;
    const c = `Synthetic Sentinel-2 interpretation exercise: square pixels are ${pix} m on a side. A rectangular changed patch is ${a} pixels east-west and ${b} pixels north-south. Map north is up. A paired Sentinel-1 image was acquired through cloud. A separate Landsat image has water, vegetation and built-area classes; all dates, bands and measurements used in each question are stated.`;
    return [
      w(
        'Classify Sentinel-1 SAR as active or passive and explain the distinction.',
        'Active: the radar transmits a signal and measures its return.',
        '3.a.ii',
        c,
      ),
      w(
        'Which kind of resolution describes the ground area represented by a pixel?',
        'Spatial resolution.',
        '3.a.iv',
        c,
      ),
      w(
        'Does a shorter orbital period necessarily give an equally short revisit time for a specified ground point? Explain.',
        'No. Revisit depends on orbit geometry, swath and pointing as well as orbital period.',
        '3.a.iii',
        c,
      ),
      n(
        'Using c=3.0e8 m/s, find the frequency of light with wavelength 6.0e-7 m.',
        5e14,
        'Hz',
        '3.a.i.1',
      ),
      n(
        "Use Wien's law with b=2.90e-3 m K to find peak wavelength at 290 K.",
        1e-5,
        'm',
        '3.a.i.1',
      ),
      n(
        'A radar echo takes 2.0e-5 s for its round trip. With c=3.0e8 m/s, calculate range.',
        3000,
        'm',
        '3.a.ii.2',
      ),
      n('Find the changed patch east-west ground length.', a * pix, 'm', '3.b.i.3', c),
      n('Find the changed patch north-south ground length.', b * pix, 'm', '3.b.i.3', c),
      n('Find its ground area.', a * b * pix * pix, 'm^2', '3.b.i.3', c),
      n('Find its perimeter.', 2 * (a + b) * pix, 'm', '3.b.i.3', c),
      w(
        'Cloud obscures the optical image but the SAR image shows a surface pattern. Explain why these observations differ.',
        'Visible/near-infrared optical observations can be obscured by cloud; radar can often observe through cloud. Interpret radar geometry and surface scattering before classifying the pattern.',
        '3.b.ii',
        c,
      ),
      w(
        'A dark SAR patch is labeled water from brightness alone. Give one alternative explanation and a stronger check.',
        'Smooth non-water surfaces, shadow or viewing geometry can also be dark. Compare location, terrain, another date and optical/ground evidence.',
        '3.b.ii',
        c,
      ),
      n(
        `A classified map labels ${40 + f} of 100 equal-area pixels as forest. Calculate forest cover percentage.`,
        40 + f,
        '%',
        '3.b.ii.2',
      ),
      n(
        `Forest pixels decline from ${80 + f} to ${50 + f}. How many equal-area pixels of forest are lost?`,
        30,
        '',
        '3.b.ii.3',
      ),
      w(
        'Explain why comparing a wet-season image with a dry-season image can mimic land-cover change.',
        'Seasonal vegetation, water and illumination can change reflectance without permanent cover conversion; compare similar seasons and acquisition conditions.',
        '3.b.ii.3',
      ),
      n(
        'A topographic profile rises 60 m over 1,200 m horizontal distance. Find gradient as a percentage.',
        5,
        '%',
        '3.b.i.3',
      ),
      w(
        'Two contours are 20 m apart vertically. Adjacent contours are closer horizontally in area A than area B. Which area is steeper and why?',
        'A; the same elevation change occurs over a shorter horizontal distance.',
        '3.b.i.3',
      ),
      w(
        'A false-color display makes healthy vegetation red. Does that mean the vegetation reflects red light most strongly? Explain.',
        'No. Display colors are assigned to selected sensor bands; red display can represent near-infrared reflectance.',
        '3.b.i.2',
      ),
      w(
        'An ECOSTRESS thermal image shows a warmer paved area than a nearby canopy. Give an observation and a cautious interpretation.',
        'The measured surface-temperature estimate is higher over pavement; material properties, shading and evapotranspiration may contribute. Do not equate surface temperature with air temperature without evidence.',
        '3.b.ii.1',
      ),
      w(
        'A classifier was trained using labeled examples of water, forest and pavement. Is it supervised or unsupervised? Explain.',
        'Supervised, because labeled training examples associate measurements with classes.',
        '3.b.ii.2',
      ),
    ];
  }
  const u = 330 + f * 5,
    up = 100 + f,
    down = 50 + f;
  const c = `Synthetic climate-observation worksheet, not actual mission measurements. CERES energy-flux estimates: incoming solar flux ${u} W/m^2, reflected solar flux ${up} W/m^2 and outgoing longwave flux ${u - up - 2 * f} W/m^2. GRACE mass-change estimates and JASON sea-level estimates are supplied separately in each problem. Use only the named instrument/data descriptions.`;
  return [
    w(
      'Distinguish an active lidar measurement from a passive optical radiometer measurement.',
      'Lidar transmits light and measures its return; a passive radiometer measures radiation arriving without an emitted probing signal.',
      '3.c.i–ii',
    ),
    w(
      'Explain how spectral resolution differs from radiometric resolution.',
      'Spectral resolution describes wavelength-band discrimination; radiometric resolution describes discrimination/sensitivity to signal levels.',
      '3.c.v, viii',
    ),
    n(
      "Apply Wien's law with b=2.90e-3 m K to a 290 K blackbody. Find peak wavelength.",
      1e-5,
      'm',
      '3.c.vi',
    ),
    w(
      'Why is space-based gravimetry relevant to changing ice mass?',
      'Changes in mass distribution affect gravity measurements; gravimetry constrains mass change rather than directly measuring sea-surface height.',
      '3.c.ii',
    ),
    w(
      'Explain why a geostationary observer and a polar-orbiting observer provide different sampling patterns.',
      'A geostationary observer repeatedly views a similar region while a polar orbiter samples changing ground tracks over much of Earth; coverage and revisit must be evaluated separately.',
      '3.c.vii',
    ),
    n(
      'Compute net incoming minus outgoing top-of-atmosphere energy flux.',
      2 * f,
      'W/m^2',
      '3.d.v',
      c,
    ),
    n(
      `A JASON teaching series shows 12, ${12 + f} and ${12 + 2 * f} mm at yearly intervals. Find its endpoint slope.`,
      f,
      'mm/year',
      '3.d.ii',
    ),
    n(
      `A GRACE teaching estimate changes from 0 to ${-20 * f} gigatonnes over 2 years. Find mean mass-change rate.`,
      -10 * f,
      'gigatonnes/year',
      '3.d.ii',
    ),
    w(
      'Why can the JASON and GRACE observations not be substituted for one another?',
      'Radar altimetry constrains surface height; gravimetry constrains mass redistribution. Sea level can also change through thermal expansion, so the signals represent different quantities.',
      '3.d.ii',
    ),
    n(
      `An OCO-2 teaching column-CO2 series changes from ${400 + f} to ${405 + f} ppm. Find the increase.`,
      5,
      'ppm',
      '3.d.iii',
    ),
    w(
      'A MODIS scene is masked as cloud-covered. Explain why treating missing pixels as zero aerosol concentration is wrong.',
      'Missing retrievals are not measurements of zero; cloud screening creates a sampling limitation that must be retained.',
      '3.d.iii',
    ),
    w(
      'A CrIS teaching dataset supplies temperature estimates while an instrument map supplies radiative flux. Explain why temperature and energy flux have different units and meanings.',
      'Temperature describes thermal state in K; radiative flux is energy transferred per area per time in W/m^2. A physical radiation model is needed to relate them.',
      '3.d.iv–v',
    ),
    w(
      'Explain a climate pathway from increasing atmospheric CO2 to changing outgoing longwave radiation, with surface temperature initially fixed.',
      'Additional infrared absorption/emission changes radiative transfer and can reduce outgoing longwave flux for the stated initially fixed-temperature comparison, creating an energy imbalance.',
      '3.e.i',
    ),
    w(
      'A supplied ENSO index changes sign. Why should regional rainfall impacts be evaluated from regional data rather than assumed identical everywhere?',
      'ENSO alters circulation and regional precipitation patterns differently by region and season; a single global uniform rainfall response is not justified.',
      '3.e.ii',
    ),
    w(
      'Distinguish a carbon flux from a carbon reservoir in a climate budget.',
      'A reservoir is stored carbon; a flux is a transfer rate between reservoirs. Both magnitudes and time intervals must be specified.',
      '3.e.iii',
    ),
    w(
      'Why can changing vegetation distributions affect both carbon cycling and surface energy exchange?',
      'Vegetation affects carbon uptake/storage, albedo and evapotranspiration; the sign and size depend on location, species and conditions.',
      '3.e.v',
    ),
    n(
      'Calculate reflected/incoming solar flux as a dimensionless albedo.',
      up / u,
      '',
      '3.f.iii',
      c,
    ),
    n(
      'For fixed emissivity, a blackbody temperature doubles. By what factor does emitted power per unit area change?',
      16,
      '',
      '3.f.ii',
    ),
    n(
      `A supplied linear energy anomaly grows from ${f} to ${4 * f} W/m^2 over 3 years. Find its slope.`,
      f,
      'W/m^2/year',
      '3.f.v',
    ),
    w(
      'Explain the ice-albedo feedback after an initial warming perturbation.',
      'Less reflective ice can expose darker surfaces, increasing absorbed solar energy and reinforcing warming, while acknowledging regional/context dependence.',
      '3.f.i, iii',
    ),
  ];
}

export function topicCases(event, f, division) {
  const k = f + 1;
  if (event === 'chemistry-lab') return chemistryCases(f);
  if (event === 'water-quality') return waterCases(f, division);
  if (event === 'remote-sensing') return remoteCases(f, division);
  if (event === 'astronomy') {
    const d = 100 * f,
      m = 10 + f;
    return [
      n(
        `A synthetic star has parallax ${1 / d} arcseconds. Use d(pc)=1/p to find distance.`,
        d,
        'pc',
        '3.b',
      ),
      n(
        `A standard-candle exercise gives apparent magnitude ${m}, absolute magnitude ${m - 10} and negligible extinction. Use m-M=5log10(d/10 pc). Find d.`,
        1000,
        'pc',
        '3.b',
      ),
      n(
        'A star has twice the reference radius and the same temperature. Find its luminosity ratio using L proportional to R^2 T^4.',
        4,
        '',
        '3.a–b',
      ),
      n(
        "Use Wien's constant 2.90e-3 m K for a 5,800 K star. Find peak wavelength.",
        5e-7,
        'm',
        '3.a–b',
      ),
      n(
        `An artificial galaxy recession speed is ${70 * f} km/s. Use H0=70 km/s/Mpc and the nearby linear Hubble law to find distance.`,
        f,
        'Mpc',
        '3.b',
      ),
      n(
        'A normalized binary exercise has separation 2 AU and period 2 years. Use total mass in solar masses=a^3/P^2. Find total mass.',
        2,
        'solar masses',
        '3.b',
      ),
      w(
        'NASA identifies M82 X-2 as an ultraluminous pulsar. What does a coherent rotation-linked pulse train imply about the compact object, and why is luminosity alone insufficient?',
        'The pulsing compact object is a rotating neutron star. High X-ray luminosity by itself does not uniquely establish that a source is a black hole.',
        '3.a, 3.c',
      ),
      w(
        'SN 2014J is a Type Ia supernova in M82. Explain why standardized Type Ia luminosities can constrain distance and why dust must be considered.',
        'Compare extinction-corrected apparent brightness with calibrated intrinsic luminosity; dust changes observed brightness and color and can bias inferred distance.',
        '3.a–c',
      ),
      w(
        'GW170817 was observed in gravitational waves and electromagnetic radiation. Explain the value of this multi-messenger evidence for a neutron-star merger.',
        'The signals independently constrain binary inspiral and luminous ejecta/afterglow, linking compact-object dynamics to an electromagnetic counterpart rather than relying on one signal alone.',
        '3.a, 3.c',
      ),
      w(
        `Synthetic starburst-galaxy case ${f}: ultraviolet emission and infrared dust emission both increase. Explain why using only visible light can miss part of the recent star formation.`,
        'Dust can absorb shorter-wavelength stellar radiation and reradiate energy in the infrared. Multi-wavelength measurements help constrain obscured young populations; separate other heating sources.',
        '3.a, 3.c',
      ),
    ];
  }
  if (event === 'dynamic-planet')
    return [
      n(
        `A freshwater catchment receives ${100 + 10 * f} mm precipitation, loses 40 mm to evapotranspiration and exports 30 mm runoff. Find storage change.`,
        30 + 10 * f,
        'mm',
        '3.a',
      ),
      n(
        `A rectangular stream is ${4 + f} m wide and 2 m deep with mean velocity 0.5 m/s. Calculate discharge.`,
        4 + f,
        'm^3/s',
        '3.f.ii',
      ),
      n(
        `A river channel is ${12 + f} km long between points ${8 + f} km apart along the valley. Find sinuosity.`,
        (12 + f) / (8 + f),
        '',
        '3.d.i',
      ),
      n(
        'A water table drops 2 m over 100 m horizontal distance. Find hydraulic gradient.',
        0.02,
        '',
        '3.g.iii',
      ),
      n(
        `Use Q=K A i with K=0.001 m/s, A=${20 + f} m^2 and i=0.02. Find saturated Darcy discharge.`,
        0.00002 * (20 + f),
        'm^3/s',
        '3.g.iii',
      ),
      n(
        `A lake stores ${1000 * f} m^3 and exports ${100 * f} m^3/day in a steady well-mixed teaching model. Estimate residence time as storage/outflow.`,
        10,
        'days',
        '3.a.ii, 3.h.ii',
      ),
      w(
        'An urbanized watershed has more impervious area. Predict one hydrograph change under a comparable storm and explain.',
        'Faster runoff routing can shorten lag time and increase peak discharge; drainage infrastructure, storage and storm properties must be controlled.',
        '3.j–k',
      ),
      w(
        'A stream bends through its floodplain. Locate likely erosion and deposition relative to the bend.',
        'Erosion is commonly concentrated on the outer cut bank and deposition on the inner point bar, with local flow conditions controlling details.',
        '3.e',
      ),
      w(
        'Two first-order channels join, and no higher-order channel enters. What Strahler order results, and why?',
        'Second order; joining two channels of the same order increases order by one.',
        '3.c.ii',
      ),
      w(
        'Groundwater pumping increases near a connected river. Explain a possible effect on river baseflow.',
        'Lower groundwater head can reduce discharge to the river or induce infiltration from it, depending on hydraulic connection and gradients.',
        '3.g, 3.j',
      ),
    ];
  if (event === 'meteorology') {
    const ctx = `Synthetic diagnostic table (not a real warning):\nReflectivity | 65 dBZ\nVelocity | Adjacent inbound/outbound maxima\nCorrelation coefficient | 0.70, collocated with couplet\nSurface temperature | ${25 + f} C\nDew point | ${20 + f} C\nWind | Sharp shift across boundary`;
    return [
      w(
        'Interpret the adjacent opposite radial velocities cautiously.',
        'A tight adjacent inbound/outbound couplet is evidence consistent with rotation; geometry, resolution and quality control still matter.',
        '3.c.i–ii',
        ctx,
      ),
      w(
        'What additional interpretation is supported by low correlation coefficient collocated with the velocity couplet?',
        'Mixed or irregular scatterers consistent with lofted debris can support a tornado-debris interpretation when collocated with rotation; use corroborating evidence.',
        '3.c.i',
        ctx,
      ),
      n('Calculate the surface temperature–dew-point spread.', 5, 'C', '3.c.ii', ctx),
      w(
        'Identify one reason that 65 dBZ reflectivity alone does not prove a tornado.',
        'High reflectivity can indicate large or numerous precipitation targets, including hail; it does not directly establish a rotating ground-contact vortex.',
        '3.c.i',
        ctx,
      ),
      n(
        `A storm moves ${20 + f * 5} km east in 30 minutes. Find mean speed.`,
        2 * (20 + f * 5),
        'km/h',
        '3.c.ii',
        `Storm-track table:\nTime | Eastward distance\n0 min | 0 km\n30 min | ${20 + f * 5} km`,
      ),
      n(
        `A rain gauge records ${30 + 5 * f} mm in 0.5 hours. Calculate mean rain rate.`,
        2 * (30 + 5 * f),
        'mm/h',
        '3.c.ii',
        `Gauge table:\nElapsed time | Accumulated rain\n0 h | 0 mm\n0.5 h | ${30 + 5 * f} mm`,
      ),
      w(
        'A satellite IR time series shows cloud-top brightness temperature falling from 240 K to 220 K. Give a physically plausible interpretation and a limitation.',
        'Colder cloud tops can be consistent with cloud growth to higher levels, but retrieval, cloud type and environmental temperature profile affect interpretation.',
        '3.c.i–ii',
        'IR table:\nFrame 1 | 240 K\nFrame 2 | 220 K',
      ),
      w(
        'Station wind shifts form a coherent boundary while pressure rises behind it. Describe a candidate thunderstorm-related mechanism.',
        'A thunderstorm cold pool/outflow boundary is consistent with the observations; compare radar, temperature changes and timing rather than identifying it from one variable alone.',
        '3.c.ii',
        'Station table:\nAhead of boundary | Original wind, lower pressure\nBehind boundary | Shifted wind, rising pressure',
      ),
      w(
        'Radar detects strong winds perpendicular to its beam but a small radial velocity. Explain why the wind need not be weak.',
        'Doppler radial velocity is only the component along the beam; perpendicular motion contributes little to that component.',
        '3.c.i',
        'Radar geometry table:\nWind direction | Perpendicular to beam\nRadial velocity | Small\nIndependent wind observation | Strong',
      ),
      w(
        'A short intense rain period falls on an already saturated basin. Explain why rainfall amount alone does not establish flood severity.',
        'Antecedent moisture, infiltration, drainage, catchment area and routing affect runoff and flood response; evaluate rainfall intensity and basin conditions together.',
        '3.c',
        'Basin table:\nAntecedent soil | Saturated\nRain | Short, intense burst\nCatchment drainage/routing | Not supplied',
      ),
    ];
  }
  if (event === 'food-science')
    return [
      n(
        `A dairy label gives ${8 + f} g carbohydrate, 4 g protein and 3 g fat per serving. Using 4/4/9 kcal per gram, calculate energy.`,
        4 * (12 + f) + 27,
        'kcal',
        '3.c',
      ),
      n(
        `A milk experiment begins with ${100 + 10 * f} g milk and produces ${10 + f} g drained curd. Find curd mass as percent of starting milk mass.`,
        10,
        '%',
        '3.b.ii',
      ),
      n(
        `A cream experiment starts with ${100 + f * 10} g cream and produces ${20 + 2 * f} g butter. Find butter mass yield percentage.`,
        20,
        '%',
        '3.b.iii',
      ),
      n(
        `A team obtains ${2 + f} g curd while the supervisor obtains twice that mass. Using mass ratio times 10, calculate the task score.`,
        5,
        '',
        '4.d.ii',
      ),
      n(
        `A synthetic ice-cream mound stands ${80 + 10 * f} mm high for the specified five seconds. Using 0.1 points/mm, calculate its height score.`,
        8 + f,
        '',
        '3.b.i, 4.d.i',
      ),
      w(
        'Explain why adding salt to the surrounding ice bath helps cool a sealed dairy mixture.',
        'Dissolved salt lowers the freezing point of the external water/ice mixture, allowing a colder bath and heat transfer out of the sealed dairy mixture.',
        '3.b.i, 3.c',
      ),
      w(
        'Explain how acid addition can cause casein-rich curds to separate from milk.',
        'Acid lowers pH toward conditions that reduce casein-micelle stability, promoting aggregation; the liquid whey can then be drained from the curds.',
        '3.b.ii, 3.c',
      ),
      w(
        'Distinguish lactose intolerance from a milk-protein allergy.',
        'Lactose intolerance concerns inadequate digestion of lactose by lactase; milk-protein allergy involves an immune response to milk proteins. They are different mechanisms.',
        '3.c',
      ),
      w(
        'Does lactase treatment remove all carbohydrate from milk? Explain.',
        'No. Lactase hydrolyzes lactose into smaller sugars; it does not simply remove the sugar mass.',
        '3.c',
      ),
      w(
        'Why must a dairy-curd comparison standardize draining time and starting milk quantity?',
        'Retained liquid and different initial sample amounts can change measured curd mass independently of the experimental variable.',
        '3.a, 3.b.ii',
      ),
    ];
  if (event === 'anatomy-and-physiology')
    return [
      n(
        `A teaching spirometry case gives tidal volume ${500 + 20 * f} mL, dead space 150 mL and respiratory rate 12/min. Find alveolar ventilation.`,
        (350 + 20 * f) * 12,
        'mL/min',
        '3.a',
      ),
      n(
        `Use the same case to calculate minute ventilation: tidal volume ${500 + 20 * f} mL and rate 12/min.`,
        (500 + 20 * f) * 12,
        'mL/min',
        '3.a',
      ),
      w(
        'A model narrows an airway while pressure difference and other conditions are fixed. Explain the likely airflow consequence.',
        'Narrowing increases resistance and generally reduces flow for a fixed driving pressure; real airways also depend on compliance and flow regime.',
        '3.a',
      ),
      w(
        'Describe how pleural fluid assists ordinary breathing.',
        'It lubricates pleural surfaces so they can slide with low friction while the pleural coupling helps chest and lung motion interact.',
        '3.a',
      ),
      w(
        'Why does the small intestine combine villi, microvilli and a thin absorptive epithelium?',
        'They increase effective exchange area and support absorption while limiting transport distance, with blood/lymph pathways carrying absorbed products.',
        '3.b',
      ),
      w(
        'Distinguish the digestive roles of bile and pancreatic lipase.',
        'Bile salts aid emulsification and micellar handling of lipids; lipase enzymatically hydrolyzes triglycerides. Bile is not itself a lipase.',
        '3.b',
      ),
      w(
        'Explain why a pancreatic bicarbonate secretion can assist digestion of acidic stomach contents.',
        'It helps neutralize acid in the small intestine and supports an appropriate environment for intestinal and pancreatic enzyme activity.',
        '3.b',
      ),
      w(
        'Compare innate and adaptive immune responses without calling either one universally faster or stronger in every situation.',
        'Innate mechanisms provide broad early recognition and defense; adaptive lymphocyte responses are antigen-specific and can generate memory, with timing affected by prior exposure.',
        '3.c',
      ),
      w(
        'Explain why a secondary antibody response can differ from a primary response.',
        'Memory B cells and other adaptive changes can produce a faster, larger and higher-affinity response after re-exposure to the same antigen.',
        '3.c',
      ),
      w(
        'In a teaching case, helper T-cell activation is impaired. Give one potential consequence for a coordinated adaptive response.',
        'Impaired helper signaling can reduce effective B-cell activation/class switching or other coordinated immune responses; the consequence depends on the pathway and context.',
        '3.c',
      ),
    ];
  if (event === 'solar-system')
    return [
      n(
        'In a simplified habitable-zone model, stellar luminosity increases by a factor of four. By what factor must distance increase to preserve incident flux?',
        2,
        '',
        '3.b.vi.1',
      ),
      n(
        'A synthetic planet and star have radius ratio 1/100. For a uniform stellar disk and central transit, what fraction of light is blocked?',
        0.0001,
        '',
        '3.b.iv, vi',
      ),
      w(
        'Compare surface-water and subsurface-water habitability arguments using Europa or Enceladus as listed examples.',
        'Surface conditions may be hostile while subsurface liquid can be maintained by internal/tidal heating. Liquid, chemistry and usable energy must all be considered; water alone does not prove life.',
        '3.a.i, 3.b.i',
      ),
      w(
        'Titan has surface liquid hydrocarbons and water ice. Explain why habitability questions should specify the solvent and biological assumptions.',
        'Habitability depends on the proposed chemistry and solvent; the presence of one kind of liquid does not automatically imply conditions suitable for familiar water-based life.',
        '3.a.i, 3.b.i–iii',
      ),
      w(
        'A spectrum from a Mars teaching dataset shows a mineral associated with past water alteration. What can and cannot be concluded?',
        'It can support a history of water-related processes under suitable geological context, but does not establish that life existed or that stable liquid water is present now.',
        '3.a.i, 3.b.ii',
      ),
      w(
        'Explain the difference between evidence for organic molecules on Bennu or comet 67P and proof of biology.',
        'Organic molecules can form through non-biological processes; their presence constrains chemistry and delivery pathways but is not by itself evidence of life.',
        '3.a.i, 3.b.ii',
      ),
      w(
        'Why can a planet in the TRAPPIST-1 system require atmospheric-retention evidence in addition to an estimated equilibrium temperature?',
        'An equilibrium temperature does not specify an atmosphere, greenhouse effects, stellar irradiation history or surface pressure; these affect stable liquids and habitability.',
        '3.a.ii, 3.b.i',
      ),
      w(
        'A planet is detected through periodic stellar radial-velocity shifts. What physical interaction produces the signal?',
        'The planet and star orbit their shared center of mass, creating a line-of-sight stellar velocity variation; other stellar variability must be considered.',
        '3.b.iv',
      ),
      w(
        'Explain one engineering tradeoff between high spatial resolution and broad repeated mapping for an allowed mission.',
        'Finer sampling can require narrower swaths, greater data volume or observing time; a mission must balance resolution, coverage and revisit against its science goals.',
        '3.b.v',
      ),
      w(
        'Why is chemical disequilibrium potentially relevant to habitability but not a unique biosignature?',
        'A disequilibrium can provide usable free energy or motivate biological hypotheses, but geological, photochemical and transport processes can also maintain it.',
        '3.b.i–iii',
      ),
    ];
  if (event === 'crime-busters') {
    const ctx = `Synthetic complete case ${f}: crime-scene powder is water-soluble, produces gas with supplied dilute acid, and has the same test pattern as reference sodium bicarbonate. Scene fiber matches the provided cotton reference in microscopy and controlled test observations. A suspect's pen has two chromatography bands at ${2 + f} and ${4 + f} cm with a solvent front at ${8 + f} cm. Reference results are supplied to avoid any need for physical unknowns.`;
    return [
      w(
        'Identify the powder from the supplied reference comparison and distinguish observation from inference.',
        'Sodium bicarbonate is the supported identification: solubility and acid-gas observations match that supplied reference. The identity is an inference from the observations.',
        '3.c',
        ctx,
      ),
      w(
        'Why is gas production with acid alone insufficient to uniquely identify this powder?',
        'More than one material can evolve gas with acid; compare a set of diagnostic results against appropriate references.',
        '3.c',
        ctx,
      ),
      n('Calculate the Rf value for the first listed band.', (2 + f) / (8 + f), '', '3.e', ctx),
      n('Calculate the Rf value for the second listed band.', (4 + f) / (8 + f), '', '3.e', ctx),
      w(
        'Does a matching ink-band pattern identify one unique pen owner? Explain.',
        'No. Different pens can contain similar inks, and a class-level match is not a unique personal identification; evaluate additional independent evidence.',
        '3.e, 3.g',
        ctx,
      ),
      w(
        'Classify the supplied cotton reference fiber as natural or synthetic and state its source category.',
        'Natural plant fiber.',
        '3.d',
        ctx,
      ),
      w(
        'Explain why a human hair morphology match alone does not identify one person.',
        'Many people can share hair features; morphology generally gives class evidence and must not be treated as unique DNA identification.',
        '3.d, 3.g',
      ),
      w(
        'A suspect has a powder match but a non-matching fiber and ink. Explain how to report the mixed evidence.',
        'State which findings support and refute an association, discuss transfer and sampling limitations, and avoid turning one class match into a proof of guilt.',
        '3.g',
        ctx,
      ),
      w(
        'Describe one control that helps distinguish contamination from a real sample result.',
        'Use a procedural blank or clean reference, separate tools and consistent test conditions, and compare the blank with the sample result.',
        '3.c, 3.g',
      ),
      w(
        'Why should a complete case report retain contradictory observations rather than omit them?',
        'They constrain hypotheses and prevent selective reporting; a conclusion should reflect the full evidence set and its limitations.',
        '3.g',
      ),
    ];
  }
  if (event === 'protein-modeling')
    return [
      n(
        'The assigned interval runs from residue 153 through 252, inclusive. How many numbered residue positions are included?',
        100,
        '',
        '2.c, 3.Part I.a',
      ),
      n(
        'At the specified scale of 2 cm per residue, what backbone material length corresponds to 100 residues before folding?',
        200,
        'cm',
        '3.Part I.a',
      ),
      w(
        'State the assigned 2027 structure identifier, chain and residue interval, and distinguish these identifiers from a claim that all residues are experimentally resolved.',
        'PDB 3UBE, chain A, residues 153–252. A numbered interval specifies the requested region; experimental missing residues must be checked in the structure record.',
        '2.c, 3.Part I.a',
      ),
      w(
        'Explain the functional relevance of hemagglutinin binding to sialic-acid receptors in influenza entry.',
        'Binding helps the virus attach to susceptible host-cell receptors and initiates the entry pathway; binding specificity is related to infection biology. This is State/National molecular detail in the supplied rules.',
        '3.Part II.c.iii–iv',
      ),
      w(
        'Why does identifying an alpha helix require backbone geometry rather than simply finding a hydrophobic sequence stretch?',
        'Secondary structure depends on backbone conformation and hydrogen-bond organization; residue composition alone does not uniquely establish the actual geometry.',
        '3.Part II.d.i',
      ),
      w(
        'A synthetic structure worksheet places two oppositely charged side chains close together. Describe a possible stabilizing interaction and a qualification.',
        'An electrostatic/salt-bridge interaction may stabilize the arrangement, but protonation state, solvent, distance and geometry affect its strength.',
        '3.Part II.c.i–ii, d.ii',
      ),
      w(
        'Explain why displaying a ligand-binding pocket without identifying chain and residue numbering can mislead a model reviewer.',
        'Equivalent residue numbers can refer to different chains or numbering schemes; reproducible selection requires structure, chain, residue identifiers and consistent coordinate context.',
        '3.Part II.d',
      ),
      w(
        'What is the distinction between a displayed molecular contact and a proven functional interaction?',
        'A geometrical contact is structural evidence; functional significance requires appropriate chemical context and supporting evidence rather than proximity alone.',
        '3.Part II.d.ii–iii',
      ),
      w(
        'A model includes a decorative feature unrelated to protein structure or function. Explain why it does not improve its scientific explanation.',
        'Useful features should communicate relevant structural or functional evidence and be identified in the legend; irrelevant decoration does not explain the molecule.',
        '3.Part I.e, 4.b',
      ),
      w(
        'Explain why rotating a JUDE molecular view does not alter the primary sequence or chemical connectivity.',
        'Rotation changes the viewing transformation, not residue order or the underlying molecular bond structure.',
        '3.Part II.d',
      ),
    ];
  if (event === 'circuit-lab')
    return [
      n(
        `A ${6 + f} V ideal battery drives a ${3 + f / 2} ohm resistor. Find current.`,
        2,
        'A',
        '3.Part I.c.iv–v',
      ),
      n(
        `A series pair has resistances ${2 + f} and ${4 + f} ohms. Find equivalent resistance.`,
        6 + 2 * f,
        'ohms',
        '3.Part I.c.v',
      ),
      n(
        `Two identical ${4 + 2 * f} ohm resistors are placed in parallel. Find equivalent resistance.`,
        2 + f,
        'ohms',
        '3.Part I.c.v',
      ),
      n(
        `An ideal resistor carries 2 A at ${6 + f} V. Find power.`,
        2 * (6 + f),
        'W',
        '3.Part I.c.iv',
      ),
      n(
        `A node has incoming currents ${3 + f} A and 2 A and one outgoing current. Find the outgoing current.`,
        5 + f,
        'A',
        '3.Part I.c.vii',
      ),
      w(
        'Explain why an ideal voltmeter is connected in parallel rather than used as a series current path.',
        'It measures potential difference across a component and has very high input resistance; placing it in series would alter or interrupt the intended current path.',
        '3.Part I.c.v, 3.Part II',
      ),
      w(
        'Give the output of an AND gate for inputs 1 and 0, and explain.',
        '0; an AND output is 1 only when both inputs are 1.',
        '3.Part I.c.viii',
      ),
      division === 'B'
        ? w(
            'Describe a diagnostic use of a ground-fault circuit interrupter without claiming it replaces every protection device.',
            'It detects a current imbalance between outgoing and returning paths and interrupts the circuit; overcurrent and other hazards may require additional protection.',
            '3.Part I.c.vi',
          )
        : w(
            'A silicon diode is reverse biased below breakdown. Contrast its ideal current with a forward-biased conducting diode.',
            'In the ideal model the reverse-biased diode blocks current; a forward-biased conducting diode permits conventional current from anode toward cathode. Real leakage and forward voltage require a stated device model.',
            '3.Part I.c.vi',
          ),
      w(
        'A closed DC loop has a 9 V source and a 4 V resistor drop. Find the remaining series resistor drop and state the governing law.',
        '5 V; Kirchhoff voltage law requires the algebraic sum of potential changes around the closed loop to be zero.',
        '3.Part I.c.vii',
      ),
      w(
        'Two identical LEDs must be equally bright in a low-voltage teaching circuit. Explain why their branch currents and current-limiting arrangements matter.',
        'Brightness depends on operating current; matched LEDs with suitable branch current limiting and comparable currents can produce comparable brightness. Do not connect them without appropriate current control.',
        '3.Part II.c.iii',
      ),
    ];
  throw Error(`No rotation case bank for ${division}/${event}`);
}

export { w, n, choice };
