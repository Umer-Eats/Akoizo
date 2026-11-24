import { defineDeck, type Deck } from './presentation-types.ts';

// Remote Sensing (Division B) presentations, part 2: light and radar timing, albedo and thermal
// images, and land-cover change.

const lightRadar = defineDeck('remote-u7-l1-b', [
  {
    kind: 'title',
    title: 'Light, temperature, and radar distance',
    subtitle: 'Three starred equations: the wave equation, Wien’s law, and radar range.',
    objectives: [
      'Relate wavelength and frequency with c = λf.',
      'Use Wien’s law to connect peak wavelength and temperature.',
      'Calculate distance from radar round-trip time.',
      'Describe reflection, absorption, scattering and refraction.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Wavelength and frequency',
    image: 'em-spectrum-properties',
    caption:
      'Across the spectrum, ==a longer wavelength means a lower frequency==, because all light travels at the same speed.',
    bullets: [
      'Light travels at about **3 × 10⁸ m/s** in a vacuum.',
      'The **wave equation**: **c = wavelength × frequency**.',
      'Convert wavelengths to **meters** before calculating frequency in **hertz**.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'A radar uses microwaves with a wavelength of 0.03 m. What is their frequency in gigahertz (GHz)?',
    answer: 10,
    tolerance: 0,
    unit: 'GHz',
    explanation: 'f = c ÷ λ = 3 × 10⁸ ÷ 0.03 = 1 × 10¹⁰ Hz, which is 10 GHz.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'If the wavelength of light doubles, what happens to its frequency?',
    options: ['It halves', 'It doubles', 'It stays the same', 'It becomes four times larger'],
    answer: 0,
    explanation: 'Speed is fixed, so wavelength × frequency stays constant. Doubling one halves the other.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Temperature from a peak',
    image: 'astro-blackbody',
    caption:
      'Hotter objects emit most strongly at **shorter wavelengths**. The peak moves left as temperature rises.',
    bullets: [
      '**Wien’s law**: peak wavelength = **b ÷ T**, with b ≈ 2.9 × 10⁻³ m·K.',
      'Always use **Kelvin**.',
      'If temperature **doubles**, the peak wavelength ==halves==.',
      'Wien’s law is about the **peak**, not the brightness at every wavelength.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'Earth’s surface is about 290 K. Using b = 2.9 × 10⁻³ m·K, what is its peak wavelength in micrometers (µm)?',
    answer: 10,
    tolerance: 0.2,
    unit: 'µm',
    explanation: 'λ = 2.9 × 10⁻³ ÷ 290 = 1 × 10⁻⁵ m = 10 µm, in the thermal infrared.',
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order these objects from shortest to longest peak wavelength.',
    items: [
      'A 10,000 K blue star',
      'The Sun, about 5,800 K',
      'A 3,000 K red dwarf',
      'A 600 K wildfire',
      'Earth’s surface, about 290 K',
    ],
    explanation: 'Peak wavelength = b ÷ T, so the hottest object peaks at the shortest wavelength and the coolest at the longest.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Radar timing',
    bullets: [
      'A radar pulse travels **to** a target and **back**.',
      '**Range = speed × round-trip time ÷ 2**.',
      '==Divide by two== because the time includes both journeys.',
      'A longer return time means a more distant reflecting surface.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Work through the evidence',
    problem: 'A pulse travels at 300,000,000 m/s straight to the surface and back in 0.004 s.',
    steps: [
      'Multiply speed by time: **300,000,000 × 0.004 = 1,200,000 m**.',
      'That distance includes the **outward and return** paths.',
      'Divide by two: ==600,000 m==.',
    ],
    conclusion: 'The surface is 600,000 m (600 km) away.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'A radar pulse returns after 0.002 s. Using 3 × 10⁸ m/s, how far away is the surface, in kilometers?',
    answer: 300,
    tolerance: 0,
    unit: 'km',
    explanation: '3 × 10⁸ × 0.002 = 600,000 m round trip. Divide by two: 300,000 m = 300 km.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Other interactions',
    image: 'snells-law',
    caption:
      '**Refraction**: light changes direction as it crosses from one material into another.',
    bullets: [
      '**Reflection** redirects light from a surface.',
      '**Absorption** transfers the light’s energy to matter.',
      '**Scattering** redirects light in many directions.',
      'Snell’s law, inverse-square irradiance and Stefan–Boltzmann are ==qualitative in Division B==.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each interaction to its description.',
    pairs: [
      ['Reflection', 'Light bounces off a surface'],
      ['Absorption', 'Light’s energy is transferred to matter'],
      ['Scattering', 'Light is redirected in many directions'],
      ['Refraction', 'Light changes direction crossing into a new material'],
    ],
    explanation: 'These four interactions decide how much light reaches a sensor and from where.',
  },
  {
    kind: 'summary',
    title: 'Key ideas',
    points: [
      '**c = λf**: longer wavelength, lower frequency. Use meters and hertz.',
      '**Wien**: peak λ = b ÷ T, in **Kelvin**; ==hotter means shorter peak==.',
      '**Radar range = speed × time ÷ 2**.',
      'Reflection, absorption, scattering and refraction are described **qualitatively**.',
    ],
  },
]);

const albedoThermal = defineDeck('remote-u8-l1-b', [
  {
    kind: 'title',
    title: 'Albedo, surface temperature, and image comparisons',
    subtitle: 'How much light a surface reflects, how warm it gets, and how to compare images fairly.',
    objectives: [
      'Separate reflected light from emitted thermal energy.',
      'Compare surfaces under matching conditions.',
      'Use radiation ideas qualitatively.',
      'State what a thermal image can and cannot show.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: on a sunny afternoon, which would feel hottest to touch?',
    options: ['Black asphalt', 'White concrete', 'Grass in shade', 'A pond'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Reflected and emitted energy',
    image: 'solar-energy-breakdown',
    caption:
      'Some sunlight is **reflected** by air, clouds and ground; the rest is **absorbed** and later ==emitted as heat==.',
    bullets: [
      '**Albedo** is the fraction of incoming light a surface reflects.',
      'A **thermal image** measures **emitted** radiation; it is not a photo of visible brightness.',
      'A bright visible surface can be cool or warm: ==read the thermal scale== to find its temperature.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'What does a thermal image record?',
    options: [
      'Radiation emitted by surfaces',
      'Sunlight reflected in visible colors',
      'Radar pulses returning from the ground',
      'The air temperature where people stand',
    ],
    answer: 0,
    explanation: 'Thermal sensors detect the infrared energy that surfaces emit, which depends on their temperature.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Compare fairly',
    bullets: [
      'Compare surfaces **in the same scene**, or match **time of day**, **season** and **weather** across scenes.',
      '**Sun angle**, **moisture**, **shade** and **material** can all change the pattern.',
      '==A dark pavement and a shaded forest differ in more than color==.',
      'A factor that can change a comparison is called a **confounder**.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'You compare a city thermal image from a July afternoon with one from a January morning. Which are confounders?',
    options: ['Season', 'Time of day', 'Sun angle', 'The thermal scale’s units'],
    answers: [0, 1, 2],
    explanation:
      'Season, time of day and sun angle all change surface temperatures, so they must be matched before comparing. Units are just labels.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Use radiation qualitatively',
    image: 'surface-albedo',
    bullets: [
      '**Warmer surfaces emit more** thermal energy under comparable conditions.',
      'A **more reflective** (higher-albedo) surface ==absorbs less sunlight== when other factors are fixed.',
      'Division B treats **Stefan–Boltzmann** behavior qualitatively: no fourth-power energy-balance calculations.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'With everything else equal, which surface absorbs more sunlight?',
    bins: ['Absorbs more (low albedo)', 'Absorbs less (high albedo)'],
    items: [
      ['Fresh snow', 1],
      ['Dark forest', 0],
      ['Open water', 0],
      ['Bright clouds', 1],
      ['Black asphalt', 0],
    ],
    explanation: 'Low-albedo surfaces such as forest, water and asphalt absorb most sunlight; snow and clouds reflect most of it.',
  },
  {
    kind: 'example',
    section: 2,
    title: 'Work through the evidence',
    problem:
      'Pavement: dark in the visible image; the thermal scale shows 42 °C. Trees: the thermal scale shows 28 °C. Both are in the same cloud-free scene at the same time.',
    steps: [
      'Read the **thermal scale**, not visible brightness.',
      'Compare **42 °C with 28 °C** in the same scene.',
      'Report the observed difference ==without claiming one exclusive cause==.',
    ],
    conclusion: 'The pavement surface is warmer in this observation.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'In the example, how many degrees Celsius warmer is the pavement surface than the trees?',
    answer: 14,
    tolerance: 0,
    unit: '°C',
    explanation: '42 − 28 = 14 °C, read directly from the thermal scale for the same scene.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Evidence and limits',
    bullets: [
      'A **single hot pixel** does not identify the cause of heating.',
      'Check the **legend**, **surrounding land cover**, **cloud mask** and **acquisition time**.',
      'A **land-surface temperature** is ==not automatically the air temperature== a person feels above it.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'A thermal image shows a parking lot at 50 °C. What is the best conclusion?',
    options: [
      'The lot’s surface was 50 °C when the image was taken',
      'People standing there felt 50 °C air',
      'The lot is on fire',
      'The lot will always be 50 °C',
    ],
    answer: 0,
    explanation: 'Thermal imagery measures surface temperature at one time. Air temperature above the surface is usually different.',
  },
  {
    kind: 'match',
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['Albedo', 'Fraction of incoming radiation reflected'],
      ['Thermal image', 'Image based on emitted thermal radiation'],
      ['Surface temperature', 'Temperature of the observed surface'],
      ['Confounder', 'Another factor that can change a comparison'],
    ],
    explanation: 'These are the key terms for reading and comparing thermal images.',
  },
  {
    kind: 'summary',
    title: 'Key ideas',
    points: [
      '**Albedo** = fraction reflected; thermal images record **emitted** energy.',
      'Match **time, season and weather** to compare fairly.',
      'Warmer emits more; ==higher albedo absorbs less==.',
      'Surface temperature is **not** air temperature, and one hot pixel is not a cause.',
    ],
  },
]);

const changeHazards = defineDeck('remote-u9-l1-b', [
  {
    kind: 'title',
    title: 'Land-cover change, hazards, and classification',
    subtitle: 'Spot real change, sort pixels into classes, and say what a change map does and does not prove.',
    objectives: [
      'Recognize floods, fires and urban growth in images.',
      'Compare supervised and unsupervised classification.',
      'Choose useful satellite data for a task.',
      'Explain the implications and limits of a change map.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Recognize change',
    image: 'borneo-haze',
    caption:
      'Smoke from fires spreads over Borneo. Clouds and smoke ==can hide or imitate surface change==.',
    bullets: [
      '**Flooding** can expand dark water areas.',
      '**Fire** can change vegetation reflectance.',
      '**Urban growth** replaces irregular vegetation with roads and buildings.',
      'Compare before-and-after images with **matching scale, season and bands**.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Which kind of change does each clue suggest?',
    bins: ['Flood', 'Fire', 'Urban growth'],
    items: [
      ['Dark water spreading over fields', 0],
      ['Burned vegetation with changed reflectance', 1],
      ['New straight roads and building grids', 2],
      ['A river wider than its usual channel', 0],
      ['A blackened scar inside a forest', 1],
    ],
    explanation: 'Water darkens and spreads, fire scars change vegetation reflectance, and urban growth adds regular roads and buildings.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A field turns dark in an after image taken on a day with scattered clouds. Besides flooding, what could explain it?',
    options: ['A cloud shadow', 'A higher sun angle making it brighter', 'The scale bar changing', 'Nothing else could'],
    answer: 0,
    explanation: 'Clouds and their shadows can imitate real surface change, so check a cloud mask or another image before calling it a flood.',
  },
  {
    kind: 'compare',
    section: 1,
    title: 'Classify with examples',
    columns: ['Method', 'How it works', 'Watch out for'],
    rows: [
      ['**Supervised**', 'Learns from **labeled examples** such as known water, forest and pavement', 'Poor training examples give poor labels'],
      ['**Unsupervised**', 'Groups similar measurements **first**; people then name the groups', 'A group may mix several real classes'],
      ['Both', 'Assign a class to each pixel', '==Neither guarantees every pixel is correct=='],
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'An analyst marks known patches of water, forest and pavement, then lets the computer label the rest. Which method is this?',
    options: ['Supervised classification', 'Unsupervised classification', 'Change detection', 'Validation'],
    answer: 0,
    explanation: 'Using labeled training examples is supervised classification. Unsupervised methods group pixels first and are labeled afterward.',
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Choose useful data',
    columns: ['Data', 'Type', 'Useful for'],
    rows: [
      ['Landsat, Sentinel-2', '**Multispectral** optical', 'Land-cover comparisons'],
      ['Sentinel-1', '**Radar**', '==Seeing through clouds==; depends on roughness and geometry'],
      ['SRTM', '**Elevation**', 'Drainage and flood exposure'],
      ['GOES', 'Geostationary weather', '**Frequent** broad weather views'],
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each task to the most useful data.',
    pairs: [
      ['Map flooding under clouds', 'Sentinel-1'],
      ['Compare forest cover between years', 'Landsat'],
      ['Find low land likely to flood', 'SRTM'],
      ['Watch a storm develop hour by hour', 'GOES'],
    ],
    explanation: 'Radar sees through clouds, Landsat compares land cover, SRTM gives elevation, and GOES gives frequent weather views.',
  },
  {
    kind: 'example',
    section: 2,
    title: 'Work through the evidence',
    problem:
      'Before: a field is mapped as vegetation. After: the field is dark in a cloudy optical image. Radar and a ground report both support standing water there.',
    steps: [
      'Optical darkness could be **cloud shadow**.',
      'Compare the **radar** evidence and the **ground report**.',
      'Flooding is supported ==where independent observations agree==.',
    ],
    conclusion: 'Flooding is supported by multiple independent observations.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Explain implications',
    image: 'aral-sea-1989-2014',
    caption:
      'Repeat images show the Aral Sea shrinking from 1989 to 2014. The images measure the change; ==they do not show who caused it==.',
    bullets: [
      'A map of lost forest can raise questions about **habitat loss** or **erosion**.',
      '**Validate** sample locations with independent evidence.',
      'Read **NLCD class labels** and change-map **legends** before counting areas.',
      'Report uncertain boundaries honestly.',
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'A change map shows forest loss in a county. Which conclusions are supported by the map alone?',
    options: [
      'Forest cover decreased in the mapped areas',
      'The change can be measured in area from the legend and scale',
      'A specific company caused the loss',
      'Every mapped pixel is certainly correct',
    ],
    answers: [0, 1],
    explanation: 'The map shows where and how much forest changed. It cannot establish who caused it, and classification errors are always possible.',
  },
  {
    kind: 'fill',
    section: 3,
    prompt: 'Complete the sentences about checking a change map.',
    text: 'Comparing images over time to find differences is called change {0}. Checking predictions against independent evidence is called {1}.',
    blanks: ['detection', 'validation'],
    distractors: ['classification', 'calibration'],
    explanation: 'Change detection finds differences between dates; validation tests whether the mapped classes match independent observations.',
  },
  {
    kind: 'summary',
    title: 'Key ideas',
    points: [
      'Floods, fires and urban growth leave different **signatures**; match scale, season and bands.',
      '**Supervised** uses labeled examples; **unsupervised** groups first.',
      'Landsat/Sentinel-2, **Sentinel-1 radar**, **SRTM** elevation, **GOES** weather.',
      'A change map shows ==what changed, not who caused it==; **validate** it.',
    ],
  },
]);

export const remoteSensingBDecksLater: Deck[] = [lightRadar, albedoThermal, changeHazards];
