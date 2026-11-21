import { defineDeck, type Deck } from './presentation-types.ts';
import { remoteSensingDecksLater } from './presentations-remote-sensing-2.ts';

// Remote Sensing (Division C) presentations. Each deck follows its lesson in
// lessons-remote-sensing.ts section by section (`section` is the lesson section index), and its
// activities rehearse the lesson's key terms, worked example, comparisons, and checkpoint ideas.

const foundations = defineDeck('remote-u1-l1', [
  {
    kind: 'title',
    title: 'Remote sensing foundations and history',
    subtitle: 'From aerial observation to calibrated satellite measurements.',
    objectives: [
      'Describe the source–target–sensor chain.',
      'Separate an observation from an inferred property.',
      'Explain why repeated calibrated measurements matter.',
    ],
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: when a satellite image shows a “healthy forest,” what did the satellite actually record?',
    options: [
      'The health of each tree',
      'Energy in a few wavelength bands',
      'A photograph identical to what our eyes see',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Observing without direct contact',
    image: 'blue-marble-americas',
    bullets: [
      'Remote sensing measures energy that a target reflects, emits, or scatters — without sampling the target.',
      'A satellite never records “forest health”; it records radiance in selected spectral bands.',
      'Processing plus a physical or empirical model links those numbers to a property such as vegetation cover.',
      'Keep three layers separate: the observation, the intermediate product, and the interpretation.',
    ],
    callout:
      'The same signal can come from different mixtures of materials, lighting, atmosphere, and viewing angle — inference is a constrained problem, not automatic recognition.',
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Sort each statement: is it something a sensor measures, or something we infer?',
    bins: ['Measured observation', 'Inferred interpretation'],
    items: [
      ['Radiance in the near-infrared band', 0],
      ['Brightness counts recorded by a detector', 0],
      ['“This forest is healthy”', 1],
      ['“This field is planted with corn”', 1],
      ['Reflected energy in the red band', 0],
      ['“Drought caused the browning”', 1],
    ],
    explanation:
      'Sensors record band-dependent energy. Health, crop type, and causes are interpretations built on those measurements with models and reference data.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'The measurement chain',
    image: 'remote-sensing-schematic',
    caption:
      'Energy source → atmospheric path → target interaction → atmospheric path → sensor response → calibration and correction → interpreted product.',
    bullets: [
      'Optical sensors record reflected sunlight; thermal sensors record emitted radiation; radar supplies its own microwaves.',
      'Clouds, aerosols, absorption, and scattering all alter the path.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Put the optical measurement chain in order, from the Sun to a finished product.',
    items: [
      'Sunlight leaves the Sun',
      'Light passes through the atmosphere',
      'The target reflects part of the spectrum',
      'Reflected light passes back through the atmosphere',
      'The sensor records a band-weighted response',
      'Calibration and atmospheric correction',
      'An interpreted product',
    ],
    explanation:
      'Every step can change the signal, which is why a full answer names the source, both atmospheric passes, the target interaction, the sensor, and processing.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Calibration versus a pretty picture',
    bullets: [
      'Calibration converts raw detector counts into a physical quantity such as radiance.',
      'Atmospheric correction then estimates surface reflectance.',
      'A visually attractive composite is not automatically a calibrated product you can compare across dates.',
    ],
    image: 'contrast-stretch-photo',
    callout: 'Ask of every image: are these stored physical values, or only display colors?',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Historical development',
    image: 'boston-1860',
    bullets: [
      'Aerial photography made systematic overhead mapping possible before satellites.',
      'Orbital instruments expanded coverage, repeatability, and access to more wavelengths.',
      'Digital detectors and computing enabled time series, multi-band analysis, and large-area change detection.',
      'The key shift: from one descriptive picture to a repeatable measurement system.',
    ],
    callout:
      'Spatial detail is only one improvement. Spectral sampling, revisit timing, radiometric sensitivity, and calibration stability can matter just as much.',
  },
  {
    kind: 'order',
    section: 2,
    prompt: 'Order these developments from earliest to most recent.',
    items: [
      'Aerial photography for overhead mapping',
      'Orbital instruments with repeat coverage',
      'Digital detectors recording numbers',
      'Computational time series and change detection',
    ],
    explanation:
      'Photography came first, then orbiting platforms, then digital detectors that made consistent, computer-processed time series possible.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Scale and ground truth',
    image: 'mixed-pixel',
    caption:
      'One pixel integrates everything inside its footprint. A field plot is usually much smaller and may sit near a boundary.',
    bullets: [
      'Compare field measurements collected near the image date.',
      '“Ground truth” is really reference data with its own sampling and measurement uncertainty.',
      'A mixed pixel can disagree with a plot without either being wrong.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Why can a field plot disagree with the satellite pixel that contains it?',
    options: [
      'They sample different spatial supports',
      'Pixels have no ground area',
      'Field measurements are always exact',
      'Calibration removes all mixtures',
    ],
    answer: 0,
    explanation:
      'A plot might cover a few square metres while a pixel covers hundreds or more, blending several surfaces. Different supports can legitimately disagree.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Choosing an observable',
    bullets: [
      'Begin with a specific question: flood extent? canopy cover? surface temperature?',
      'Identify the physical property that separates the alternatives, then the wavelength or geometry that measures it.',
      'Optical color can fail under clouds; thermal emission answers a different question than red reflectance.',
      'Plan resolution, dates, calibration, reference samples, and validation before choosing an index or display.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each monitoring question with an observable that addresses it.',
    pairs: [
      ['Is the surface warmer than yesterday?', 'Emitted thermal radiation'],
      ['How much green canopy is present?', 'Red and near-infrared reflectance'],
      ['Where is the flood under cloud cover?', 'Radar (microwave) backscatter'],
      ['How tall is the forest canopy?', 'Lidar return timing'],
    ],
    explanation:
      'The question decides the observable: temperature needs thermal emission, canopy greenness needs red/NIR contrast, clouds call for microwaves, and height needs ranging.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Responsible interpretation',
    bullets: [
      'Record product type, units, acquisition date, band definitions, and quality masks.',
      'Brighter display ≠ changed surface: it may only be a new contrast stretch.',
      'Compare like products under comparable conditions and say what remains unresolved.',
      'A vegetation index is a derived ratio, not a species diagnosis.',
    ],
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: a brighter image',
    problem:
      'An image becomes brighter after a display stretch, but its stored reflectance values are unchanged. Has surface reflectance increased?',
    steps: [
      'Identify stored measurement values separately from display colors.',
      'Confirm the stretch changes only how values are mapped to screen brightness.',
      'Compare calibrated values and acquisition conditions before claiming physical change.',
    ],
    conclusion: 'The display change alone supplies no evidence of a reflectance increase.',
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Which metadata is essential before comparing two dates of imagery?',
    options: [
      'Product units and acquisition conditions',
      'Only file name length',
      'Only border color',
      'Only display size',
    ],
    answer: 0,
    explanation:
      'A fair comparison needs the same physical units (such as surface reflectance) and known sun angle, geometry, season, and atmosphere.',
  },
  {
    kind: 'compare',
    title: 'Raw counts, calibrated products, and composites',
    columns: ['Item', 'What it is', 'Watch out for'],
    rows: [
      ['Raw counts', 'Detector output', 'Not automatically reflectance.'],
      ['Calibrated product', 'Values with defined units', 'Quality and geometry still matter.'],
      ['Display composite', 'Maps bands to colors', 'Color is not a direct material label.'],
    ],
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Radiance', back: 'Directional radiant energy measured by a sensor.' },
      {
        front: 'Reflectance',
        back: 'Fraction of incident radiation reflected under stated conditions.',
      },
      { front: 'Calibration', back: 'Conversion from detector response to a measurement scale.' },
      { front: 'Footprint', back: 'Ground region contributing to a measurement.' },
    ],
  },
  {
    kind: 'match',
    prompt: 'Match each term to its definition.',
    pairs: [
      ['Radiance', 'Directional radiant energy measured by a sensor'],
      ['Reflectance', 'Fraction of incident radiation reflected'],
      ['Calibration', 'Converts detector response to a measurement scale'],
      ['Footprint', 'Ground region contributing to a measurement'],
    ],
    explanation: 'These four words appear throughout the course — keep them distinct.',
  },
  {
    kind: 'mcq',
    prompt: 'What does an optical sensor directly record?',
    options: [
      'A band-dependent energy response',
      'Tree species with certainty',
      'Human land-use intent',
      'A complete climate mechanism',
    ],
    answer: 0,
    explanation: 'Surface properties are inferred from a calibrated response.',
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Calibration converts detector {0} into a physical quantity, while a display {1} only changes how values appear on screen. A vegetation index is a {2} ratio, not a species diagnosis.',
    blanks: ['counts', 'stretch', 'derived'],
    distractors: ['species', 'orbit', 'measured'],
    explanation:
      'Calibration defines measurement values; a stretch changes only display; indices are derived from measured bands.',
  },
  {
    kind: 'open',
    prompt:
      'In one or two sentences: why should a study start with a question rather than an index?',
    model:
      'The question determines the needed observable, wavelengths, resolution, dates, and validation; a convenient ratio may not discriminate the alternatives that matter.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Remote sensing connects energy measurements to hypotheses through explicit processing and validation.',
      'Name the source, path, target interaction, sensor, and processing for every measurement.',
      'Pixels and field plots sample different supports — expect honest disagreement.',
      'Display changes are not physical changes; check units and conditions.',
    ],
  },
]);

const sensors = defineDeck('remote-u2-l1', [
  {
    kind: 'title',
    title: 'Sensors, radar, lidar, and illumination',
    subtitle: 'Active/passive systems and what different instruments measure.',
    objectives: [
      'Distinguish active from passive sensing.',
      'Compute a pulse range from round-trip time.',
      'Interpret backscatter without treating brightness as height.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Passive does not mean visible',
    image: 'remote-sensing-illustration',
    caption:
      'Passive sensors detect naturally available radiation (reflected sunlight or emitted heat). Active sensors send energy and time its return.',
    bullets: [
      'Reflected-sunlight sensors need illumination; thermal sensors can work at night.',
      'Visible, NIR, SWIR, and thermal regions respond to different material properties.',
      'A warm target can be bright thermally without looking bright in a photo.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Can a passive thermal sensor collect useful data at night?',
    options: [
      'Yes — it detects emitted thermal radiation',
      'No — every passive sensor needs sunlight',
      'Only if it carries a laser',
      'Only over water',
    ],
    answer: 0,
    explanation:
      'Thermal sensors detect radiation surfaces emit because they are warm. That continues at night (clouds still block the view).',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Active measurements',
    image: 'sentinel1-estonia',
    bullets: [
      'An active system transmits energy and measures the return: radar uses microwaves, lidar uses laser pulses.',
      'Known timing lets us compute range: d = c·t ⁄ 2.',
      'The factor of 2 accounts for the trip out and back.',
      'Active ≠ immune: rain, attenuation, geometry, and target properties still alter returns.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Sort each instrument: active or passive?',
    bins: ['Active (supplies its own energy)', 'Passive (uses natural energy)'],
    items: [
      ['Radar', 0],
      ['Lidar', 0],
      ['Reflected-sunlight camera', 1],
      ['Thermal radiometer', 1],
      ['Natural-light photograph', 1],
    ],
    explanation: 'Only radar and lidar transmit their own illumination.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: lidar range',
    problem: 'A lidar pulse has round-trip time 8 microseconds. Use c = 3 × 10⁸ m/s.',
    steps: [
      'Convert 8 microseconds to 8 × 10⁻⁶ s.',
      'Round-trip distance = 3 × 10⁸ × 8 × 10⁻⁶ = 2400 m.',
      'Divide by two to obtain one-way range 1200 m.',
    ],
    conclusion:
      'The idealized sensor-to-target range is 1200 m — not a ground elevation without platform geometry.',
  },
  {
    kind: 'numeric',
    section: 5,
    prompt: 'A pulse returns in 10 microseconds (c = 3 × 10⁸ m/s). What is the one-way range?',
    answer: 1500,
    tolerance: 1,
    unit: 'm',
    explanation: '3 × 10⁸ × 10 × 10⁻⁶ = 3000 m round trip; ÷ 2 = 1500 m.',
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'In this idealized setup, a 1-microsecond timing error changes the range by about…',
    options: ['150 m', '300 m', '1.5 m', '3000 m'],
    answer: 0,
    explanation: '3 × 10⁸ × 10⁻⁶ = 300 m round trip, so 150 m one way — precise timing matters.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Radar backscatter',
    image: 'manaus-radar',
    caption:
      'Smooth water reflects microwaves away (dark); rough surfaces scatter some back; buildings can double-bounce (very bright).',
    bullets: [
      'Brightness depends on wavelength, polarization, roughness relative to wavelength, dielectric (moisture) properties, and geometry.',
      'Terrain causes foreshortening, layover, and shadow that depend on viewing direction.',
      'A bright radar pixel is NOT simply a high-elevation pixel.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each surface to its typical radar appearance.',
    pairs: [
      ['Calm water', 'Dark — energy reflected away from the antenna'],
      ['City buildings', 'Very bright — double-bounce return'],
      ['Rough bare soil', 'Moderate — diffuse scattering'],
      ['Slope facing away from the sensor', 'Possible radar shadow'],
    ],
    explanation:
      'Geometry and roughness relative to wavelength control how much energy returns toward a side-looking antenna.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'What does a bright radar pixel necessarily indicate?',
    options: ['A strong recorded return', 'A high mountain', 'A hot surface', 'A green forest'],
    answer: 0,
    explanation:
      'Several target and geometry properties affect backscatter; brightness only means strong return.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Lidar structure and returns',
    image: 'lidar-waveform',
    caption:
      'One pulse can return from the canopy top, middle layers, and the ground. Canopy height ≈ canopy return elevation − ground elevation.',
    bullets: [
      'Multiple returns sample the illuminated footprint; they are not a photo of every leaf.',
      'Classification errors and gaps affect derived surfaces.',
      'Range is along the beam — platform position and orientation are needed to place each 3-D point.',
    ],
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Order the steps to estimate canopy height from lidar.',
    items: [
      'Emit a laser pulse and record return times',
      'Convert times to ranges and locate points using platform position',
      'Classify returns as canopy or ground',
      'Build a ground surface and a canopy surface',
      'Subtract ground from canopy elevations',
    ],
    explanation:
      'Ranges become 3-D points, points are classified, then the canopy-height model is the difference of the two surfaces.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Matching sensor to question',
    bullets: [
      'Flood under clouds → microwave radar can see where optical cannot.',
      'Canopy height → lidar gives vertical structure.',
      'Canopy spectral condition → calibrated optical bands.',
      'Combine instruments only when dates and footprints align, and state what each supports independently.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each task with the best-suited instrument.',
    pairs: [
      ['Map a flood during a storm', 'Radar'],
      ['Measure forest canopy height', 'Lidar'],
      ['Compare leaf greenness between fields', 'Optical red/NIR bands'],
      ['Find warm spots at night', 'Thermal radiometer'],
    ],
    explanation: 'Each instrument measures a different physical response.',
  },
  {
    kind: 'compare',
    title: 'Three ways to sense a surface',
    columns: ['System', 'Measures', 'Limitation'],
    rows: [
      ['Optical reflection', 'Spectral surface response', 'Cloud and illumination limitations.'],
      ['Radar', 'Microwave backscatter', 'Roughness and geometry affect brightness.'],
      ['Lidar', 'Laser range and structure', 'Positioning and classification matter.'],
    ],
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Active sensor', back: 'Transmits energy and measures its return.' },
      { front: 'Passive sensor', back: 'Detects naturally available radiation.' },
      { front: 'Backscatter', back: 'Energy scattered back toward a sensor.' },
      { front: 'Lidar', back: 'Laser-based ranging and structural measurement.' },
    ],
  },
  {
    kind: 'mcq',
    prompt: 'Why divide c·t by two?',
    options: [
      'The pulse travels outward and back',
      'The target is half as bright',
      'There are two wavelength bands',
      'Pixels have two dimensions',
    ],
    answer: 0,
    explanation: 'Travel time is round-trip.',
  },
  {
    kind: 'open',
    prompt: 'Why should optical and radar images be combined cautiously?',
    model:
      'They measure different responses (reflected light vs. microwave backscatter) and may differ in date, footprint, and geometry; align them and state which evidence each supplies.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'A sensor name does not specify a unique surface property — follow the physical measurement.',
      'Range = c·t ⁄ 2; convert units before multiplying.',
      'Radar brightness reflects roughness, moisture, and geometry, not height.',
      'Lidar separates canopy and ground returns to measure structure.',
    ],
  },
]);

const orbits = defineDeck('remote-u3-l1', [
  {
    kind: 'title',
    title: 'Satellite orbits and observing strategies',
    image: 'landsat8-orbit',
    subtitle: 'Coverage, revisit, swath, and mission tradeoffs.',
    objectives: [
      'Compare geostationary and polar observing geometry.',
      'Separate orbit repetition from usable revisit.',
      'Select a platform for a stated monitoring task.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Orbit as an observing constraint',
    image: 'orbit-altitudes',
    caption:
      'A near-polar low-Earth orbit sweeps many latitudes as Earth turns beneath it. A geostationary satellite stays above one point on the equator.',
    bullets: [
      'The orbit sets where and when a sensor can look; the instrument sets swath and sampling.',
      'Orbit alone tells you nothing about pixel size, calibration, or spectral bands.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Sort each feature to the orbit it describes.',
    bins: ['Geostationary', 'Near-polar / sun-synchronous'],
    items: [
      ['Stays above one point on the equator', 0],
      ['Very frequent images of the same region', 0],
      ['Views high latitudes obliquely or not at all', 0],
      ['Passes over at about the same local solar time', 1],
      ['Covers nearly all latitudes over many passes', 1],
      ['Low orbit with finer spatial detail', 1],
    ],
    explanation:
      'Geostationary orbits trade detail for frequent regional views; sun-synchronous polar orbits give consistent lighting and global coverage over repeated passes.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Sun-synchronous sampling',
    bullets: [
      'Observations happen near a consistent local solar time, giving similar illumination.',
      'Shadows, season, atmosphere, and surface change still vary.',
      'Consistent local time ≠ continuous coverage of a location.',
      'Separate the repeat cycle, acquisition opportunities, and cloud-free usable images.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Does “sun-synchronous” mean a location is observed continuously?',
    options: [
      'No',
      'Yes, at every location',
      'Only at the equator, continuously',
      'It means no clouds',
    ],
    answer: 0,
    explanation: 'It concerns local solar-time geometry, not continuous viewing.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Geostationary tradeoffs',
    image: 'goes16-full-disk',
    bullets: [
      'Revisits a broad region frequently — ideal for evolving weather.',
      'Large distance and geometry trade away spatial detail compared with low orbits.',
      'High latitudes are viewed obliquely or fall outside useful geometry.',
      'Choose temporal sampling by the process timescale — the sharpest image is not always the most useful.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'What is especially useful for tracking a fast-changing storm?',
    options: [
      'Frequent temporal observations',
      'A single sharp image only',
      'A long orbit name',
      'A larger file format',
    ],
    answer: 0,
    explanation: 'Observations must resolve the process in time — hours, not days.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Mission examples and continuity',
    image: 'landsat9-launch',
    bullets: [
      'Landsat: long-term calibrated land observation.',
      'Sentinel family: complementary optical and radar capabilities.',
      'Weather platforms: frequent regional monitoring.',
      'Joining records across sensors needs documentation and cross-sensor comparison — not simple concatenation.',
    ],
    callout:
      'A calibration change or resolution difference between sensors can look like a real trend.',
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each mission family with what it illustrates.',
    pairs: [
      ['Landsat', 'Long-term calibrated land observation'],
      ['Sentinel missions', 'Complementary optical and radar capabilities'],
      ['Geostationary weather satellites', 'Frequent regional monitoring'],
    ],
    explanation: 'These are mission families used as examples of observing strategies.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Swath and revisit',
    image: 'trmm-swath',
    caption:
      'Wider swaths cover more ground per pass; constellations add opportunities; clouds remove usable optical views.',
    bullets: [
      'Effective revisit can be far longer than the nominal schedule.',
      'For a short-lived flood, one missed date can lose the peak entirely.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: cloudy month',
    problem:
      'A satellite has four nominal acquisition opportunities in a month, but three are cloud-obscured. How many usable optical observations remain?',
    steps: [
      'Separate scheduled opportunities from quality-controlled observations.',
      'Reject the three cloud-obscured scenes for surface optical measurement.',
      'Retain one usable scene and report the temporal gap.',
    ],
    conclusion: 'Nominal revisit does not imply four usable measurements.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A sensor has 6 opportunities in a month; clouds block half of them. How many usable optical scenes remain?',
    answer: 3,
    tolerance: 0,
    explanation: 'Six scheduled minus three cloudy leaves three usable observations.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Designing a monitoring plan',
    bullets: [
      'Start with location, process duration, required detail, and needed wavelengths.',
      'Storm → temporal coverage. Small farm plots → spatial support and spectral response.',
      'Check that dates sample the event itself, not only its aftermath.',
      'Record rejected observations: missing data limit what was observed — they are not evidence of no change.',
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Order the steps of a monitoring plan.',
    items: [
      'Define location and process timescale',
      'Choose orbit and sensor for coverage, swath, bands, and detail',
      'Collect acquisitions and apply quality checks',
      'Report the usable series and its gaps',
    ],
    explanation:
      'Question first, then platform, then quality control, then honest reporting of gaps.',
  },
  {
    kind: 'compare',
    title: 'Orbits and revisit compared',
    columns: ['Strategy', 'Strength', 'Limitation'],
    rows: [
      ['Geostationary', 'Frequent regional views', 'Oblique high-latitude geometry.'],
      ['Near-polar', 'Broad latitude coverage over passes', 'Not continuous at one site.'],
      ['Nominal revisit', 'Scheduled opportunities', 'Cloud-free revisit can differ.'],
    ],
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Swath', back: 'Ground width observed during a pass.' },
      { front: 'Revisit', back: 'Interval between observations or opportunities, as defined.' },
      {
        front: 'Sun-synchronous',
        back: 'Orbit maintaining approximately consistent local solar time.',
      },
      {
        front: 'Geostationary',
        back: 'Orbit with an approximately fixed apparent equatorial position.',
      },
    ],
  },
  {
    kind: 'multi',
    prompt: 'Select ALL that reduce the number of usable optical observations.',
    options: [
      'Cloud cover',
      'Smoke or heavy haze',
      'Renaming a band',
      'Missing a scheduled pass',
      'A wider display monitor',
    ],
    answers: [0, 1, 3],
    explanation:
      'Clouds, smoke, and missed passes remove surface measurements; renaming or display hardware change nothing.',
  },
  {
    kind: 'open',
    prompt: 'Choose an observing strategy for a brief flood and justify it.',
    model:
      'Use frequent quality-controlled acquisitions, consider radar under clouds, align geometry, and ensure dates bracket the peak rather than only the aftermath.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'An observing plan must fit both where a process occurs and how quickly it changes.',
      'Swath (coverage width) and pixel size (detail) are different quantities.',
      'Nominal revisit ≠ usable revisit; clouds and quality checks matter.',
      'Compare sensors before merging records to avoid artificial trends.',
    ],
  },
]);

const composites = defineDeck('remote-u4-l1', [
  {
    kind: 'title',
    title: 'Composites, spectral signatures, and contrast',
    subtitle: 'Band assignment, true/false color, and comparable displays.',
    objectives: [
      'Explain RGB channel assignment.',
      'Interpret vegetation in false color.',
      'Distinguish display enhancement from calibration.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Bands become display channels',
    image: 'additive-rgb',
    caption:
      'A composite assigns three measured bands to the screen’s red, green, and blue channels.',
    bullets: [
      'True color ≈ visible red, green, blue → R, G, B.',
      'False color puts other wavelengths (like NIR) into visible channels.',
      'Colors are a code for the band mapping — read the legend first.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'What determines false-color appearance?',
    options: [
      'Band-to-channel assignment',
      'Only the object name',
      'Only sensor altitude',
      'Only file compression',
    ],
    answer: 0,
    explanation: 'Channel mapping defines what each color means.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Spectral signatures',
    image: 'reflectance-spectra',
    caption:
      'Healthy leaves absorb red (pigments) and reflect NIR strongly (leaf structure). Water is dark in NIR. Soil rises gradually.',
    bullets: [
      'With NIR displayed as red, vegetation appears red.',
      'This is useful evidence — not a diagnosis of health or species.',
      'Soil exposure, canopy density, moisture, illumination, and atmosphere all alter the response.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each surface with its typical red/NIR behavior.',
    pairs: [
      ['Healthy vegetation', 'Low red, high NIR'],
      ['Clear deep water', 'Low red, very low NIR'],
      ['Bare dry soil', 'Moderate red, moderate NIR'],
    ],
    explanation:
      'Pigments absorb red, leaf structure scatters NIR; water absorbs NIR; soils rise gradually across both.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Water and built surfaces',
    image: 'dubai-false-color',
    bullets: [
      'Water usually has low NIR — but sediment, depth, sun glint, and shoreline mixtures change that.',
      'Roofs, asphalt, concrete, and shadows do not share one signature.',
      'A dark pixel could be water, shadow, or another low-response surface.',
      'Use spatial context, texture, shape, and other band combinations to decide.',
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt: 'A pixel is dark in NIR. Select ALL plausible explanations.',
    options: [
      'Open water',
      'Shadow',
      'Dense healthy forest',
      'A low-response dark surface',
      'Fresh snow',
    ],
    answers: [0, 1, 3],
    explanation:
      'Water, shadow, and some dark surfaces can all be dark in NIR; healthy vegetation and snow are typically bright in NIR.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Stretching and enhancement',
    image: 'contrast-stretch-histogram',
    caption: 'A linear stretch maps a chosen range of stored values onto the full display range.',
    bullets: [
      'Histogram-based enhancements redistribute contrast to reveal subtle variation.',
      'Stretching two dates independently makes equal colors mean unequal values.',
      'Enhancement cannot create information that was not measured — and can amplify noise.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Independent stretches can make date comparisons misleading because…',
    options: [
      'Equal colors may represent unequal values',
      'All stored values are erased',
      'NIR becomes visible light physically',
      'Registration is no longer needed',
    ],
    answer: 0,
    explanation: 'Display coding can change between dates even when the data do not.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Merging and registration',
    bullets: [
      'Registration aligns images so corresponding pixels are the same ground location.',
      'Small misalignments create fake change along roads, rivers, and field edges.',
      'Pan-sharpening adds spatial detail but can alter spectral relationships.',
      'Sharper-looking ≠ better for band-ratio calculations.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'What can misregistration between two dates imitate?',
    options: ['Boundary change', 'A new wavelength band', 'Perfect calibration', 'A known species'],
    answer: 0,
    explanation: 'Shifted edges create false differences along boundaries.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: a red field in false color',
    problem:
      'NIR is assigned to the red display channel. A field has NIR = 0.6 and red reflectance = 0.1. Explain its likely display and limitation.',
    steps: [
      'The strong NIR response makes the red display channel bright.',
      'The red/NIR contrast is consistent with a vegetation-rich surface.',
      'Check other bands, atmosphere, mixtures, and reference data before a specific health claim.',
    ],
    conclusion:
      'Red false-color appearance is a channel-coded observation, not the field’s literal visible color.',
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Order the parts of a defensible composite explanation.',
    items: [
      'State the channel assignment',
      'Describe observed colors and context',
      'Give the physical interpretation',
      'State alternatives and quality limits',
    ],
    explanation: 'Legend first, then observation, then interpretation, then limits.',
  },
  {
    kind: 'compare',
    title: 'Displays compared',
    columns: ['Display', 'What it shows', 'Caution'],
    rows: [
      ['True color', 'Visible bands in approximate natural order', 'Still depends on enhancement.'],
      ['False color', 'Other bands mapped into visible channels', 'Read band order first.'],
      ['Contrast stretch', 'Changes visual separation', 'Does not prove physical change.'],
    ],
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Composite', back: 'Multiple bands assigned to display channels.' },
      { front: 'False color', back: 'Display assignment differing from ordinary visible color.' },
      { front: 'Registration', back: 'Alignment of images to common ground locations.' },
      { front: 'Stretch', back: 'Mapping measurement values into a display range.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the sentence.',
    text: 'In a false-color composite with {0} shown as red, healthy vegetation looks red because leaves {1} red light and strongly reflect near-infrared.',
    blanks: ['NIR', 'absorb'],
    distractors: ['blue', 'emit', 'thermal'],
    explanation: 'High NIR goes to the red channel; pigments absorb visible red.',
  },
  {
    kind: 'open',
    prompt: 'Write a cautious interpretation of a field that is bright in NIR and dark in red.',
    model:
      'High NIR and low red are consistent with a vegetation-rich pixel; species or stress cause needs additional evidence and quality checks.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Color meaning comes from the channel assignment and measurement context.',
      'Spectral signatures are evidence conditioned on geometry and processing.',
      'Use consistent stretches (or calibrated values) when comparing dates.',
      'Register images before comparing; inspect pan-sharpening before ratios.',
    ],
  },
]);

const resolution = defineDeck('remote-u5-l1', [
  {
    kind: 'title',
    title: 'Spatial, spectral, temporal, and radiometric resolution',
    subtitle: 'Mixed pixels, detectable differences, and enhancement limits.',
    objectives: [
      'Distinguish four resolution types.',
      'Compute pixel area and mixtures.',
      'Explain why interpolation cannot recover missing detail.',
    ],
  },
  {
    kind: 'figure',
    title: 'Four kinds of resolution',
    image: 'pixel-size-mixing',
    caption:
      'Spatial (how much ground per pixel), spectral (which wavelengths), temporal (how often), radiometric (how many signal levels).',
  },
  {
    kind: 'match',
    prompt: 'Match each resolution type to the question it answers.',
    pairs: [
      ['Spatial', 'How much ground detail can be distinguished?'],
      ['Spectral', 'How finely are wavelengths separated?'],
      ['Temporal', 'How often is the place observed?'],
      ['Radiometric', 'How many signal levels can be distinguished?'],
    ],
    explanation:
      'Each dimension is independent; a sensor can be strong in one and weak in another.',
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Spatial support',
    image: 'kansas-crops-aster',
    bullets: [
      'Spatial resolution = distinguishable ground detail; pixel spacing = sampling. Related, not always identical.',
      'A 30 m × 30 m pixel covers 900 m² — not 30 m².',
      'A narrow stream can influence a pixel without filling it.',
      'Boundary pixels integrate several surfaces, hiding sub-pixel variation.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'What is the area of one square 30 m pixel?',
    answer: 900,
    tolerance: 0,
    unit: 'm²',
    explanation: 'Area is side squared: 30 × 30 = 900 m².',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Spectral resolution',
    bullets: [
      'How finely the spectrum is sampled and distinguished.',
      'Many narrow bands can separate materials with subtle absorption features.',
      'Band count alone is not enough — bandwidth and placement matter.',
      'Fine spatial detail with the wrong wavelengths can fail a material-ID task.',
    ],
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Temporal resolution',
    bullets: [
      'How often observations are available.',
      'Sparse dates can miss peaks or confuse seasonal change with disturbance.',
      'Quality filtering reduces usable sampling — report actual gaps.',
      'Match sampling to the process: a smoke plume and a slow land-cover change need different strategies.',
    ],
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Radiometric discrimination',
    bullets: [
      'The ability to distinguish signal levels, often described by bit depth.',
      '8-bit → 2⁸ = 256 levels; 12-bit → 2¹² = 4096 levels.',
      'More levels ≠ more accuracy: noise and calibration may dominate.',
      'A one-count difference may be below the real measurement precision.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt: 'How many ideal levels does an 8-bit encoding have?',
    answer: 256,
    tolerance: 0,
    explanation: '2⁸ = 256.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Mixed-pixel arithmetic',
    image: 'mixed-pixel',
    caption:
      'Linear mixture: each band of the pixel is the area-weighted mean of its components. Mix the bands first, then compute the index.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: 50/50 pixel',
    problem: 'Vegetation is NIR 0.6, red 0.1; soil is NIR 0.3, red 0.2. Mix equal areas.',
    steps: [
      'Mixed NIR = 0.5 × 0.6 + 0.5 × 0.3 = 0.45.',
      'Mixed red = 0.5 × 0.1 + 0.5 × 0.2 = 0.15.',
      'NDVI = (0.45 − 0.15)/(0.45 + 0.15) = 0.5.',
    ],
    conclusion:
      'Calculate the ratio after mixing the measured bands; do not assume indices average linearly.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A pixel is 75% vegetation (NIR 0.6) and 25% soil (NIR 0.2). What is the mixed NIR reflectance?',
    answer: 0.5,
    tolerance: 0.005,
    explanation: '0.75 × 0.6 + 0.25 × 0.2 = 0.45 + 0.05 = 0.50.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Choosing and enhancing data',
    bullets: [
      'Useful resolution = what supports the question with tolerable uncertainty.',
      'Upsampling makes smoother pixels but adds no new ground measurements.',
      'Aggregation can reduce noise but mixes classes and hides small features.',
      'Document resampling and remember the original support when reporting area or change.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'What does upsampling (interpolating to smaller pixels) guarantee?',
    options: [
      'More display samples',
      'More independent ground observations',
      'A new spectral band',
      'Elimination of mixed pixels',
    ],
    answer: 0,
    explanation: 'Interpolation does not create measured detail.',
  },
  {
    kind: 'compare',
    title: 'More is not always better',
    columns: ['Feature', 'Gives you', 'But'],
    rows: [
      ['Fine spacing', 'More raster sample locations', 'Not necessarily independent detail.'],
      ['Narrow bands', 'More spectral discrimination', 'May trade off signal strength.'],
      ['More bit depth', 'More encoded levels', 'Not automatic measurement accuracy.'],
    ],
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Spatial resolution', back: 'Distinguishable ground detail or effective support.' },
      { front: 'Spectral resolution', back: 'Discrimination among wavelength intervals.' },
      { front: 'Radiometric resolution', back: 'Discrimination among signal levels.' },
      { front: 'Mixed pixel', back: 'A footprint containing multiple surface components.' },
    ],
  },
  {
    kind: 'sort',
    prompt: 'Sort each sensor upgrade into the resolution it improves.',
    bins: ['Spatial', 'Spectral', 'Temporal', 'Radiometric'],
    items: [
      ['10 m pixels instead of 30 m', 0],
      ['200 narrow bands instead of 4 broad ones', 1],
      ['Daily instead of 16-day revisit', 2],
      ['12-bit instead of 8-bit encoding', 3],
      ['A constellation of identical satellites', 2],
    ],
    explanation:
      'Pixel size → spatial; band count/width → spectral; revisit → temporal; bit depth → radiometric.',
  },
  {
    kind: 'open',
    prompt: 'Why not average the NDVI of each component instead of mixing the bands first?',
    model:
      'NDVI is a nonlinear ratio. Under the linear model, mix band reflectances by area first, then compute the index; averaging component indices generally gives a different number.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Resolution has four dimensions: spatial, spectral, temporal, radiometric.',
      'Pixel area is side squared; boundary pixels mix surfaces.',
      'Mix bands, then compute ratios — indices do not average linearly.',
      'Interpolation smooths a display; it cannot recover missing detail.',
    ],
  },
]);

export const remoteSensingDecks: Deck[] = [
  foundations,
  sensors,
  orbits,
  composites,
  resolution,
  ...remoteSensingDecksLater,
];
