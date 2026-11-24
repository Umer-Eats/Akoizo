import { defineDeck, type Deck } from './presentation-types.ts';
import { remoteSensingDecks } from './presentations-remote-sensing.ts';
import { remoteSensingBDecksLater } from './presentations-b-remote-sensing-2.ts';

// Remote Sensing (Division B) presentations, one per lesson. Lessons ending in `-b` are Division
// B's own (lessons-b-adaptations.ts) and get the middle-school decks below. The other Division B
// lessons keep the Division C lesson's id and sections unchanged, so they are taught by the
// Division C deck for that same lesson; the presentations test checks every section is covered.

const sharedWithC = new Set(['remote-u1-l1', 'remote-u4-l1', 'remote-u5-l1', 'remote-u10-l1']);
const shared = (lessonId: string) => {
  const deck = remoteSensingDecks.find((d) => d.lessonId === lessonId && sharedWithC.has(lessonId));
  if (!deck) throw new Error(`No Division C deck for ${lessonId}`);
  return deck;
};

const passiveActive = defineDeck('remote-u2-l1-b', [
  {
    kind: 'title',
    title: 'Passive images and active radar',
    subtitle: 'Some sensors wait for energy to arrive; others send their own and listen for the echo.',
    objectives: [
      'Explain what a passive sensor detects.',
      'Describe how radar backscatter forms an image.',
      'Recognize what SAR, InSAR and radar altimeters are for.',
      'Match an instrument to an observing task.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: a valley is under thick clouds. Which sensor could still see the ground?',
    options: ['A normal camera', 'A radar', 'Neither', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Passive sensing',
    image: 'remote-sensing-illustration',
    caption:
      'A **passive** sensor (top) records energy from another source; an **active** sensor (bottom) ==sends its own energy and records the echo==.',
    bullets: [
      'Optical images usually record **reflected sunlight**.',
      '**Thermal** images record energy **emitted** by surfaces, so they work at night.',
      'Clouds can hide the ground from optical sensors.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Is each instrument passive or active?',
    bins: ['Passive', 'Active'],
    items: [
      ['A camera recording reflected sunlight', 0],
      ['A thermal sensor at night', 0],
      ['A radar sending microwave pulses', 1],
      ['A radar altimeter timing its pulses', 1],
      ['A multispectral imager on Landsat', 0],
    ],
    explanation:
      'Passive sensors detect energy from another source, such as the Sun or the warm surface. Active sensors transmit their own energy and measure what returns.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Active radar and backscatter',
    image: 'sentinel1-estonia',
    caption:
      'In this Sentinel-1 radar image, smooth lakes ==reflect energy away from the sensor== and look dark.',
    bullets: [
      'Radar sends **microwave** energy and measures the returning signal, called **backscatter**.',
      'Backscatter depends on **roughness**, **moisture**, **material** and **viewing direction**.',
      'Radar can see **through clouds**.',
      'Brightness is ==not a direct label== for water or vegetation.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Why does calm water usually look dark in a radar image?',
    options: [
      'Its smooth surface reflects the pulse away from the sensor',
      'Water absorbs all microwaves',
      'Radar cannot reach water through clouds',
      'Water is cold, so it emits no radar',
    ],
    answer: 0,
    explanation:
      'A smooth surface acts like a mirror and bounces the pulse away, so little backscatter returns. Rough or wind-blown water can look brighter.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Radar products',
    image: 'manaus-radar',
    bullets: [
      '**Synthetic aperture radar (SAR)** combines measurements along a moving platform to build an image.',
      '**Interferometric SAR (InSAR)** compares phase information to study ==elevation or ground movement==.',
      'A **radar altimeter** estimates distance from the **pulse travel time**.',
      'For Division B: know what each is for and read a supplied map. No phase equations.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each radar product to its purpose.',
    pairs: [
      ['SAR', 'Builds a radar image from a moving platform'],
      ['InSAR', 'Compares phase to detect surface movement'],
      ['Radar altimeter', 'Measures distance from pulse travel time'],
    ],
    explanation:
      'SAR makes images, InSAR compares two radar passes to see elevation or movement, and an altimeter times pulses to measure height.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Match the instrument to the task',
    columns: ['Instrument or data', 'What it measures', 'Good for'],
    rows: [
      ['Multispectral imager', 'Several **wavelength bands**', 'Land-cover patterns'],
      ['Thermal sensor (radiometer)', '**Emitted** radiation', 'Surface-temperature patterns'],
      ['Radar', 'Microwave **backscatter**', '==Seeing through clouds=='],
      ['Digital elevation model', 'Surface **height**', 'Slopes, drainage and flood exposure'],
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Choose the best data for each task.',
    pairs: [
      ['Map farm fields on a clear day', 'Multispectral optical bands'],
      ['Find hot and cool surfaces in a city', 'Thermal data'],
      ['Map a flood under thick clouds', 'Radar'],
      ['Find which low areas water could collect in', 'An elevation model'],
    ],
    explanation:
      'Optical bands show land cover, thermal data shows temperature patterns, radar works through clouds, and elevation shows where water drains.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Work through the evidence',
    problem:
      'Clouds cover a flooded valley. The optical image cannot see the ground. The radar image shows new dark areas along the low valley floor.',
    steps: [
      'The **optical view is blocked** by clouds.',
      'Radar gives different evidence, but ==dark returns are not unique to flooding==.',
      'Use **elevation** and **independent observations** to test the flood idea.',
    ],
    conclusion: 'Compare the radar pattern with elevation and independent flood reports before concluding.',
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which factors change how bright a surface looks in a radar image?',
    options: ['Surface roughness', 'Moisture', 'Viewing direction', 'The color of the surface', 'Whether it is day or night'],
    answers: [0, 1, 2],
    explanation:
      'Backscatter depends on roughness, moisture, material and viewing direction. Radar brings its own energy, so visible color and daylight do not matter.',
  },
  {
    kind: 'fill',
    section: 1,
    prompt: 'Complete the sentences about radar.',
    text: 'Radar sends {0} energy and measures the signal that returns, called {1}. A smooth lake usually looks {2} because it reflects the pulse away.',
    blanks: ['microwave', 'backscatter', 'dark'],
    distractors: ['ultraviolet', 'albedo', 'bright'],
    explanation:
      'Radar is an active microwave sensor. The returned energy is backscatter, and mirror-like water sends little of it back.',
  },
  {
    kind: 'summary',
    title: 'Key ideas',
    points: [
      '**Passive** sensors detect energy from another source; **active** sensors send their own.',
      'Radar **backscatter** depends on roughness, moisture, material and geometry.',
      'Radar ==sees through clouds==, but a dark pixel is evidence, not a label.',
      'SAR makes images, **InSAR** shows movement, **altimeters** time pulses.',
    ],
  },
]);

const orbits = defineDeck('remote-u3-l1-b', [
  {
    kind: 'title',
    title: 'Choosing an orbit for an observation',
    subtitle: 'Where a satellite flies decides what it can see, and how often.',
    objectives: [
      'Relate orbit height to coverage.',
      'Explain why polar orbits map the whole Earth.',
      'Explain how geostationary satellites watch one region.',
      'Reason qualitatively with Kepler’s third law.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Height and coverage',
    image: 'orbit-altitudes',
    caption:
      'Low Earth orbit sits close to the surface; geostationary orbit is ==35,786 km up==.',
    bullets: [
      '**Low Earth orbit** is relatively close, so it can collect detailed images along a moving track.',
      '**Higher orbits** can view larger areas at once.',
      'Image detail also depends on the **sensor**: ==orbit height alone does not set resolution==.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Which statement about orbit height is correct?',
    options: [
      'Higher orbits can view larger areas at once',
      'Higher orbits always give sharper images',
      'Orbit height alone sets an image’s resolution',
      'Low orbits can see a whole hemisphere at once',
    ],
    answer: 0,
    explanation:
      'A higher orbit sees more of Earth at once. Detail depends on both distance and the sensor’s optics, so height alone does not decide resolution.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Polar coverage',
    image: 'trmm-swath',
    caption:
      'Each pass covers a **strip** (a swath). As ==Earth turns beneath the track==, later passes fill in the gaps.',
    bullets: [
      'A **near-polar orbit** passes near both poles.',
      'Repeated passes sample different longitudes: useful for **mapping land cover** over broad regions.',
      '**Revisit time** also depends on the sensor’s field of view and the number of satellites.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which changes would shorten the revisit time for a location?',
    options: [
      'A wider field of view',
      'Adding a second identical satellite',
      'A narrower field of view',
      'Turning the sensor off on alternate passes',
    ],
    answers: [0, 1],
    explanation:
      'A wider swath covers more ground per pass, and more satellites mean more passes. Both bring the sensor back over a spot sooner.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Watching one region',
    image: 'goes16-full-disk',
    caption:
      '**GOES** sits in geostationary orbit, so it can image this whole disk ==every few minutes==.',
    bullets: [
      'A **geosynchronous** orbit matches Earth’s rotation period.',
      'A circular, equatorial geosynchronous orbit is **geostationary**: it appears fixed over one longitude.',
      'A geosynchronous orbit is ==not automatically geostationary==.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Which orbit fits each description?',
    bins: ['Near-polar low orbit', 'Geostationary orbit'],
    items: [
      ['Appears fixed over one longitude', 1],
      ['Passes near both poles', 0],
      ['Maps land cover strip by strip', 0],
      ['Follows a storm every few minutes', 1],
      ['Sits over the equator about 35,786 km up', 1],
    ],
    explanation:
      'Polar orbiters map the globe in swaths; geostationary satellites hover over one longitude and watch a broad region continuously.',
  },
  {
    kind: 'fill',
    section: 2,
    prompt: 'Complete the sentences about orbits that match Earth’s rotation.',
    text: 'A {0} orbit has the same period as Earth’s rotation. If it is also circular and above the {1}, it is {2} and appears fixed over one longitude.',
    blanks: ['geosynchronous', 'equator', 'geostationary'],
    distractors: ['polar', 'poles', 'sun-synchronous'],
    explanation:
      'Every geostationary orbit is geosynchronous, but only a circular, equatorial one stays fixed over one longitude.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Reason qualitatively',
    image: 'landsat8-orbit',
    bullets: [
      'Kepler’s third law: for the same central body, ==a larger orbit means a longer period==.',
      'Division B uses this relationship **qualitatively**, not as a numerical derivation.',
      'Choose an orbit from **coverage** and **revisit** needs.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Satellite A orbits 700 km up; satellite B orbits 20,000 km up. Which has the longer period?',
    options: ['Satellite B', 'Satellite A', 'They are equal', 'It depends on the satellites’ masses'],
    answer: 0,
    explanation:
      'Around the same planet, a larger orbit always takes longer. The satellite’s own mass does not matter.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Work through the evidence',
    problem:
      'Task: track a storm every few minutes. Sensor A views one broad region continuously. Sensor B collects a detailed strip on occasional passes.',
    steps: [
      'The task needs **frequent** observations.',
      'Sensor A ==repeatedly observes the same region==.',
      'Use sensor A for the time sequence, and check its spatial detail is good enough.',
    ],
    conclusion: 'Use the frequent regional views from sensor A.',
  },
  {
    kind: 'match',
    prompt: 'Match each task to the best orbit.',
    pairs: [
      ['Watch a hurricane every 10 minutes', 'Geostationary'],
      ['Map forests across every continent', 'Near-polar'],
      ['Take a detailed image of one farm', 'Low Earth orbit'],
    ],
    explanation:
      'Frequent views of one region need geostationary orbit; global mapping uses near-polar passes; close, detailed views come from low orbit.',
  },
  {
    kind: 'summary',
    title: 'Key ideas',
    points: [
      '**Low orbits** see detail along a track; **higher orbits** see more at once.',
      '**Near-polar** orbits map the globe as Earth turns underneath.',
      '**Geostationary** satellites like GOES ==watch one region continuously==.',
      'Larger orbit, **longer period**. Pick an orbit by coverage and revisit needs.',
    ],
  },
]);

const mapsScale = defineDeck('remote-u6-l1-b', [
  {
    kind: 'title',
    title: 'Map scale, elevation, and land-cover evidence',
    subtitle: 'Measure distances and slopes correctly, then read land cover from several clues.',
    objectives: [
      'Check a map’s date, legend, scale and orientation first.',
      'Convert map distance and area to ground units.',
      'Read contours and calculate slope.',
      'Compare land cover fairly between images.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Read the map first',
    image: 'dubai-false-color',
    caption:
      'In this **false-color** image, vegetation is red: ==display colors are a code==, not the objects’ real colors.',
    bullets: [
      'Find the **date**, **orientation**, **legend**, **scale** and **coordinates** before measuring.',
      'A red patch in a false-color image does not mean a red object.',
      'Use the legend and the surrounding pattern together.',
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Put these steps for reading a satellite map in a sensible order.',
    items: [
      'Check the date and orientation',
      'Read the legend and band colors',
      'Find the scale',
      'Measure distances or areas',
      'Interpret the land cover',
    ],
    explanation:
      'Knowing when, which way, what the colors mean and the scale comes before measuring; interpretation comes last.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Measure distance and area',
    image: 'noaa-scale',
    caption:
      'A **scale** compares map distance with ground distance. At **1:50,000**, ==1 cm on the map is 500 m on the ground==.',
    bullets: [
      '1 cm = 50,000 cm = **500 m**, so 2 cm = **1 km**.',
      'Area scales in **two dimensions**: a 1 cm × 1 cm square is 500 m × 500 m = **250,000 m²**.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'On a 1:50,000 map, two towns are 6 cm apart. How far apart are they on the ground, in km?',
    answer: 3,
    tolerance: 0,
    unit: 'km',
    explanation: '6 cm × 500 m per cm = 3,000 m = 3 km.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'On the same 1:50,000 map, a field is 2 cm × 2 cm. What is its ground area in m²?',
    answer: 1000000,
    tolerance: 0,
    unit: 'm²',
    explanation: '2 cm is 1,000 m, so the field is 1,000 m × 1,000 m = 1,000,000 m² (1 km²). Area grows with the square of the scale.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Read contours',
    image: 'dp-contours',
    caption:
      'Each **contour** connects points of equal elevation. ==Closely spaced contours mean a steeper slope==.',
    bullets: [
      'Compare spacing only when the scale and **contour interval** are the same.',
      '**Gradient** = rise ÷ horizontal run; multiply by 100 for **percent slope**.',
      'Keep both distances in the **same units**.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Calculate a slope',
    problem: 'Scale: 1 cm represents 500 m. Two sites are 4 cm apart on the map and differ in elevation by 100 m.',
    steps: [
      'Convert the horizontal distance: **4 × 500 = 2,000 m**.',
      'Divide rise by run: **100 ÷ 2,000 = 0.05**.',
      'Multiply by 100 to get ==5%==.',
    ],
    conclusion: 'The slope is 5%.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'With 1 cm = 500 m, two points are 2 cm apart and differ in elevation by 50 m. What is the percent slope?',
    answer: 5,
    tolerance: 0,
    unit: '%',
    explanation: 'Run = 2 × 500 = 1,000 m. Slope = 50 ÷ 1,000 = 0.05, which is 5%.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Compare land cover',
    image: 'rondonia-2007',
    caption:
      'Cleared land cuts into forest along roads. Use **color, texture, shape** and ==surrounding features== to tell classes apart.',
    bullets: [
      'Compare images from **similar seasons** before deciding vegetation has disappeared.',
      'Fields, water, forest and built areas differ in pattern as well as color.',
      'Division B focuses on **map measurement and interpretation**; NDVI and EVI formulas are not in the B equation list.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'A July image shows green fields; a January image of the same place shows brown fields. What should you do first?',
    options: [
      'Compare images from similar seasons before concluding',
      'Report that the farms were abandoned',
      'Assume the January image is a false-color error',
      'Measure the area of brown fields as cleared land',
    ],
    answer: 0,
    explanation: 'Seasonal change can turn fields brown. Compare same-season images before claiming land cover changed.',
  },
  {
    kind: 'match',
    prompt: 'Match each map term to its meaning.',
    pairs: [
      ['Scale', 'Map distance compared with ground distance'],
      ['Contour', 'Line connecting equal elevations'],
      ['Gradient', 'Vertical change divided by horizontal distance'],
      ['Legend', 'Key explaining map symbols or colors'],
    ],
    explanation: 'These four terms let you measure and interpret any map or image.',
  },
  {
    kind: 'summary',
    title: 'Key ideas',
    points: [
      'Check **date, orientation, legend, scale** first.',
      'At 1:50,000, **1 cm = 500 m**; ==area scales by the square==.',
      'Close contours mean **steep**; slope = rise ÷ run × 100%.',
      'Compare **same-season** images and use texture, shape and context.',
    ],
  },
]);

export const decks: Deck[] = [
  shared('remote-u1-l1'),
  passiveActive,
  orbits,
  shared('remote-u4-l1'),
  shared('remote-u5-l1'),
  mapsScale,
  ...remoteSensingBDecksLater,
  shared('remote-u10-l1'),
];
