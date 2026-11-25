import { defineDeck, type Deck } from './presentation-types.ts';
import { meteorologyDecksStorms } from './presentations-b-meteorology-2.ts';

// Meteorology (Division B) presentations, one per lesson, following presentations-anatomy.ts.
// Each deck follows its lesson section by section (`section` is the lesson section index);
// lessons 5–8 are in presentations-b-meteorology-2.ts.

const observing = defineDeck('met-u1-l1', [
  {
    kind: 'title',
    title: 'Observing severe weather',
    subtitle: 'Stations, balloons, radar and satellites each show a different piece of the storm.',
    objectives: [
      'Describe what surface networks, radiosondes, buoys and aircraft measure.',
      'Read visible, infrared and water vapor satellite images.',
      'Explain the main Doppler radar products.',
    ],
    image: 'b-met-goes-ir',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which tool do you think spots a tornado fastest?',
    options: ['A weather balloon', 'Doppler radar', 'A thermometer', 'A satellite photo'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Surface networks',
    bullets: [
      'Forecasts start with **observations**.',
      '**ASOS** stations at airports report temperature, dew point, wind, pressure, visibility, sky cover and precipitation ==every hour==, more often when weather changes fast.',
      '**Mesonets** are denser networks, with stations every few tens of kilometers.',
      'Closer spacing catches small features like ==outflow boundaries and drylines==.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Why can a mesonet find a dryline that the ASOS network misses?',
    options: [
      'Its stations are much closer together',
      'It only reports once a day',
      'It measures from space',
      'It uses balloons instead of stations',
    ],
    answer: 0,
    explanation:
      'Mesonet stations are only a few tens of kilometers apart, so small features fall between fewer gaps.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Upper-air, ocean and aircraft data',
    image: 'b-met-radiosonde',
    caption:
      'A **radiosonde** rides a balloon upward, measuring the atmosphere ==from the ground to about 30 km==.',
    bullets: [
      'Launched twice a day, near **0000 and 1200 UTC**, worldwide.',
      'Measures temperature, humidity and pressure; its **drift gives the wind**.',
      '**Buoys** report sea-surface temperature, waves, wind and pressure over the oceans.',
      'Airliners report temperature and wind; ==hurricane hunters== fly into storms.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each tool to what it does best.',
    pairs: [
      ['Radiosonde', 'Vertical profile of the atmosphere'],
      ['Moored buoy', 'Wind and waves over the open ocean'],
      ['Reconnaissance aircraft', 'Data from inside a hurricane'],
      ['ASOS station', 'Hourly surface weather at an airport'],
    ],
    explanation:
      'Each tool fills a different gap: balloons go up, buoys cover oceans, aircraft fly into storms, and ASOS covers the ground.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Satellite channels',
    image: 'b-met-goes-ir',
    caption:
      'An **infrared** image measures emitted heat: the ==coldest cloud tops== (colored here) are the tallest storms.',
    bullets: [
      '**Geostationary** satellites (GOES) watch one region all the time; **polar orbiters** pass over the whole Earth.',
      '**Visible** images show reflected sunlight, so they work ==only in daytime==.',
      '**Water vapor** images show mid- and upper-level moisture, even where there are no clouds.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Which satellite channel fits each description?',
    bins: ['Visible', 'Infrared', 'Water vapor'],
    items: [
      ['Works only during the day', 0],
      ['Shows cloud texture in sunlight', 0],
      ['Cold cloud tops appear bright', 1],
      ['Works at night by measuring heat', 1],
      ['Reveals jet streams and dry slots without clouds', 2],
    ],
    explanation:
      'Visible needs sunlight, infrared measures emitted heat, and water vapor shows moisture in the middle and upper troposphere.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Radar reflectivity',
    bullets: [
      'Radar sends **microwave pulses** and listens for energy scattered back by rain, hail and snow.',
      '**Reflectivity** (dBZ) rises with the ==size and number== of targets.',
      'Light rain ≈ **20 dBZ**, heavy rain ≈ **50 dBZ**, above about **60 dBZ** often means hail.',
      '**Base** reflectivity is the lowest scan; **composite** shows the highest value above each point, which helps find ==hail cores aloft==.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'A storm core shows 65 dBZ. What is the most likely target?',
    options: ['Light drizzle', 'Hail', 'Clear air', 'Light snow'],
    answer: 1,
    explanation: 'Values above about 60 dBZ usually mean large targets such as hail.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Doppler velocity',
    bullets: [
      '**Radial velocity**: how fast targets move toward or away from the radar.',
      'By convention ==green is toward== the radar and ==red is away==.',
      'A tight **couplet** of strong green beside strong red signals **rotation**.',
      '**Storm-relative** motion subtracts the storm’s movement so rotation stands out.',
      'A **VAD wind profile** shows how wind changes with height above the radar.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'On a velocity image, strong green sits right next to strong red. What does this suggest?',
    options: [
      'Rotation in the storm',
      'Heavy rain only',
      'The radar is broken',
      'All the air is moving toward the radar',
    ],
    answer: 0,
    explanation:
      'Air moving toward the radar right beside air moving away is a velocity couplet, a sign of rotation.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Dual polarization',
    bullets: [
      'Pulses go out **horizontally and vertically**, revealing target shape.',
      '**Correlation coefficient (CC)** measures how alike the targets are.',
      'Pure rain or snow: CC ==near 1==. Hail mixed with rain: lower.',
      'Tornado **debris**: very low, jumbled CC, often below 0.8.',
    ],
    callout:
      'Low CC **in the same spot** as a velocity couplet is strong evidence of a ==tornado on the ground==.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: put the products together',
    problem:
      'A storm shows 65 dBZ, a tight red–green couplet on its southwest side, and CC near 0.7 at the same spot.',
    steps: [
      '**65 dBZ** points to a hail core.',
      'The **couplet** shows strong rotation, a mesocyclone.',
      '**Low CC** at the couplet means mixed, odd-shaped targets: ==lofted debris==.',
    ],
    conclusion:
      'A **supercell** is producing a tornado that is lofting debris, and it probably has hail too.',
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which radar clues together point to a tornado on the ground? Select all that apply.',
    options: [
      'A tight velocity couplet',
      'Very low correlation coefficient at the couplet',
      'Uniform CC near 1 everywhere',
      'Only light 20 dBZ rain',
    ],
    answers: [0, 1],
    explanation:
      'Rotation (couplet) plus debris (low CC) in the same place is the strongest radar case for a tornado.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Radiosonde', back: 'Balloon-borne instruments that profile the atmosphere.' },
      { front: 'Reflectivity (dBZ)', back: 'How much radar energy targets send back.' },
      { front: 'Radial velocity', back: 'Motion toward (green) or away from (red) the radar.' },
      {
        front: 'Correlation coefficient',
        back: 'How alike the radar targets are; debris is low.',
      },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Visible images need {0}. Infrared shows cold cloud tops as {1}. On Doppler velocity, green means motion {2} the radar.',
    blanks: ['sunlight', 'bright', 'toward'],
    distractors: ['darkness', 'away from', 'invisible'],
    explanation:
      'Visible images use reflected sunlight, infrared shows cold tall tops brightly, and green is motion toward the radar.',
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      '**ASOS and mesonets** watch the surface; mesonets catch ==small boundaries==.',
      '**Radiosondes** profile the air twice daily; buoys and aircraft fill ocean gaps.',
      '**Visible** = daytime, **infrared** = heat, **water vapor** = moisture aloft.',
      '**Reflectivity** finds rain and hail; a ==velocity couplet plus low CC== means a tornado.',
    ],
  },
]);

const readingData = defineDeck('met-u2-l1', [
  {
    kind: 'title',
    title: 'Reading weather data',
    subtitle: 'Station models, METARs, hodographs and computer models.',
    objectives: [
      'Decode a station model and a METAR.',
      'Read wind shear from a hodograph.',
      'Use computer model guidance with caution.',
    ],
    image: 'b-met-station-model',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: have you ever read a weather map with little circles and lines on it?',
    options: ['Yes, often', 'Once or twice', 'Never', 'Not sure what that is'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'The station model',
    image: 'b-met-station-model',
    caption:
      'One station’s weather packed into one symbol: ==temperature upper left==, **dew point lower left**, pressure upper right.',
    bullets: [
      'The **center circle** shows sky cover.',
      'Present weather sits **between** temperature and dew point.',
      'The **wind barb** points into the direction the wind ==comes from==.',
      'Long barb = **10 knots**, short barb = **5 knots**, flag = **50 knots**.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'A wind barb has one flag, two long barbs and one short barb. What is the wind speed in knots?',
    answer: 75,
    tolerance: 0,
    unit: 'knots',
    explanation: '50 + 10 + 10 + 5 = 75 knots.',
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: decode a station model',
    problem:
      'Upper left 88, lower left 70, a wind barb from the south with two long barbs and one short barb, and 096 at upper right.',
    steps: [
      'Temperature **88 °F**, dew point **70 °F**: hot and humid.',
      'Wind from the **south** at 10 + 10 + 5 = **25 knots**, flowing north.',
      '096 → **1009.6 mb**.',
    ],
    conclusion: 'Hot, humid air flowing north: a ==moist warm sector==.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Decoding pressure and tendency',
    bullets: [
      'Pressure is coded as **three digits** in tenths of a millibar, dropping the leading 9 or 10.',
      'Code **below about 500** → put ==10 in front==; **above** → put ==9 in front==.',
      '**132** → 1013.2 mb. **978** → 997.8 mb.',
      'The **tendency** shows the change over three hours; a rapid fall often means an approaching low.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'A station model shows a pressure code of 096. What is the pressure in mb?',
    answer: 1009.6,
    tolerance: 0.01,
    unit: 'mb',
    explanation: '096 is below 500, so add 10 in front: 1009.6 mb.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'A station model shows a pressure code of 965. What is the pressure in mb?',
    answer: 996.5,
    tolerance: 0.01,
    unit: 'mb',
    explanation: '965 is above 500, so add 9 in front: 996.5 mb.',
  },
  {
    kind: 'flow',
    section: 2,
    title: 'Reading a METAR: KOKC 241953Z 19025G38KT 10SM BKN045 31/22 A2985',
    steps: [
      { label: 'KOKC', detail: 'The **station** (Oklahoma City).' },
      { label: '241953Z', detail: 'Day **24** at **1953 UTC**.' },
      { label: '19025G38KT', detail: 'Wind ==from 190° at 25 knots, gusting to 38==.' },
      {
        label: '10SM BKN045',
        detail: '10 statute miles visibility; **broken** clouds at 4,500 ft.',
      },
      { label: '31/22 A2985', detail: 'Temperature/dew point **in °C**; altimeter 29.85 inHg.' },
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each METAR code to its meaning.',
    pairs: [
      ['TS', 'Thunderstorm'],
      ['+RA', 'Heavy rain'],
      ['GR', 'Hail'],
      ['BKN045', 'Broken clouds at 4,500 feet'],
    ],
    explanation:
      'TS is thunderstorm, +RA heavy rain, GR hail, and BKN045 a broken layer at 4,500 ft.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Hodographs',
    image: 'b-met-hodograph',
    caption:
      'Wind arrows at each height start at the center; joining their tips draws the **hodograph**.',
    bullets: [
      '**Length** from the center = speed; direction = where the wind blows **toward**.',
      'A **long** hodograph means ==strong vertical wind shear==.',
      'Curving **clockwise** in the lowest few km = **veering** winds and helicity, favoring ==rotating supercells==.',
      'A short, straight hodograph = weak shear, short-lived storms.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Which hodograph most favors rotating supercells?',
    options: [
      'Long and curving clockwise in the lowest few kilometers',
      'Very short and straight',
      'A single dot at the center',
      'Short and curving counterclockwise',
    ],
    answer: 0,
    explanation:
      'A long hodograph means strong shear, and clockwise curvature means veering winds and helicity.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Computer model guidance',
    bullets: [
      '**Numerical weather prediction** splits the air into a 3-D grid and solves physics equations forward in time.',
      '**Global models** cover Earth at coarser spacing; **convection-allowing** models can show single storms.',
      '**Ensembles** run a model many times with slightly different starts; ==agreement means more confidence==.',
      'Models are **guidance, not observations**.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Thirty ensemble members all show a storm in the same place. What does this mean?',
    options: [
      'Forecast confidence is higher',
      'The storm has already been observed',
      'The model needs no checking',
      'Observations are no longer needed',
    ],
    answer: 0,
    explanation:
      'Agreement among members raises confidence, but a model is still guidance, not an observation.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Using recent severe weather data',
    bullets: [
      'Rules emphasize real storm data from about **2022 to 2027**.',
      'Connect products: a **surface map** with a front and dryline, a **sounding** with strong instability, **radar** of the storms, and **storm reports**.',
      'Ask what each product shows, ==when it was valid==, and what it cannot show.',
      'Times are usually in **UTC**: convert carefully to local time.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'A radar image is valid at 2300 UTC. Central Daylight Time is UTC − 5 hours. What hour is that in CDT, on a 24-hour clock?',
    answer: 18,
    tolerance: 0,
    explanation: '2300 − 5 hours = 1800 CDT, which is 6 p.m.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Station model', back: 'One station’s observations packed into a symbol.' },
      { front: 'METAR', back: 'A coded hourly airport weather report.' },
      { front: 'Hodograph', back: 'A plot joining wind vector tips at increasing heights.' },
      { front: 'Ensemble', back: 'Many model runs from slightly different starts.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A wind barb points to where the wind comes {0}. A long barb is worth {1} knots. A long, clockwise-curving hodograph shows strong {2}.',
    blanks: ['from', '10', 'shear'],
    distractors: ['toward', '50', 'rain'],
    explanation:
      'Barbs point into the wind source, a long barb is 10 knots, and a long curved hodograph means strong turning shear.',
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Station model: **temperature upper left, dew point lower left, pressure upper right**.',
      'Pressure code: add ==10 if below 500, 9 if above==.',
      '**METAR** wind 19025G38KT = from 190° at 25 knots, gusting 38.',
      'Long, **clockwise** hodographs favor supercells; **ensembles** show confidence.',
    ],
  },
]);

const stability = defineDeck('met-u3-l1', [
  {
    kind: 'title',
    title: 'Stability on Stüve and Skew-T diagrams',
    subtitle: 'Read a sounding to decide whether air will rise into storms.',
    objectives: [
      'Read temperature and dew point profiles.',
      'Decide stability, cloud base and shear from a sounding.',
      'Find the LCL and interpret CAPE (State/National).',
    ],
    image: 'b-met-skewt',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what happens to air in a bike pump when you squeeze it fast?',
    options: ['It warms up', 'It cools down', 'Nothing changes', 'Not sure'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'What a sounding shows',
    image: 'b-met-skewt',
    caption:
      'A sounding plots **temperature** and **dew point** against height or pressure, with wind barbs along the side.',
    bullets: [
      'On a **Stüve** diagram, temperature is across the bottom and ==pressure decreases upward==.',
      'Lines **close together** → nearly saturated air → clouds likely.',
      'Lines **far apart** → dry air.',
      'Wind barbs show how wind ==changes with height==.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'At 700 mb, the temperature and dew point lines almost touch. What is likely there?',
    options: ['A cloud layer', 'Very dry air', 'The ground', 'A tornado'],
    answer: 0,
    explanation:
      'When temperature and dew point are close, the air is nearly saturated, so clouds are likely.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Adiabatic lapse rates',
    bullets: [
      'A rising **parcel** expands and cools without trading heat with its surroundings.',
      'Unsaturated air cools at the **dry adiabatic rate**, about ==9.8 °C per km==.',
      'Saturated air releases **latent heat**, so it cools more slowly: the **moist rate**, about 4–7 °C per km.',
      'The **environmental lapse rate** is how fast the real surrounding air cools with height that day.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'An unsaturated parcel starts at 25 °C and rises 2 km. About what is its temperature, in °C? (Use 10 °C per km.)',
    answer: 5,
    tolerance: 0.5,
    unit: '°C',
    explanation: 'Dry air cools about 10 °C per km: 25 − 20 = 5 °C.',
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Stability: parcel versus environment',
    columns: ['Situation', 'What the parcel does', 'Stability'],
    rows: [
      ['Parcel ends **cooler** than its surroundings', 'Sinks back down', '**Stable**'],
      ['Parcel ends **warmer** than its surroundings', 'Keeps rising', '**Unstable**'],
      ['Lapse rate **steeper than the dry rate**', 'Any parcel rises', '==Absolutely unstable=='],
      [
        'Lapse rate **between moist and dry**',
        'Rises only if saturated',
        '==Conditionally unstable==',
      ],
      ['**Temperature inversion**', 'Strongly held down', 'Very stable'],
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Is each atmosphere stable or unstable?',
    bins: ['Stable', 'Unstable'],
    items: [
      ['A lifted parcel ends up colder than the air around it', 0],
      ['A temperature inversion near the ground', 0],
      ['A lifted parcel ends up warmer than the air around it', 1],
      ['The environment cools faster than 9.8 °C per km', 1],
    ],
    explanation:
      'Parcels cooler than their surroundings sink (stable); warmer parcels keep rising (unstable). Inversions are very stable.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Cloud base and the LCL (State/National)',
    bullets: [
      'The **lifting condensation level (LCL)** is where a parcel lifted dry adiabatically becomes saturated: ==cloud base==.',
      'Quick estimate: **LCL (m) ≈ 125 × (temperature − dew point)** in °C.',
      'A **small spread** gives low cloud bases, which ==favor tornadoes==.',
      'On a Skew-T, the LCL is where the **dry adiabat** from the surface temperature meets the **mixing ratio line** from the surface dew point.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: estimate the LCL',
    problem: 'Surface temperature 30 °C, dew point 22 °C. Estimate the LCL.',
    steps: [
      'Spread = 30 − 22 = **8 °C**.',
      'LCL ≈ 125 × 8 = **1,000 m**.',
      'That is a fairly ==low cloud base==.',
    ],
    conclusion: 'Low enough to support tornadoes **if shear and instability** are also present.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'The temperature is 26 °C and the dew point is 20 °C. Estimate the LCL height in meters.',
    answer: 750,
    tolerance: 10,
    unit: 'm',
    explanation: 'Spread = 6 °C; 125 × 6 = 750 m.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'CAPE and the cap (State/National)',
    bullets: [
      '**CAPE** is the energy a rising parcel gains by being warmer than its environment.',
      'On a Skew-T it is the ==area between the parcel path and the environment== where the parcel is warmer.',
      'Above about **2,500 J/kg** means strong instability.',
      'A **cap** (warm layer aloft) can hold storms back until heating or lifting breaks it; then storms can develop ==explosively==.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'A sounding has 3,500 J/kg of CAPE but a strong cap, and the morning is quiet. What could happen later?',
    options: [
      'If heating or lifting breaks the cap, storms could develop explosively',
      'Storms can never form because of the cap',
      'CAPE disappears by noon every day',
      'The cap makes the air absolutely unstable',
    ],
    answer: 0,
    explanation:
      'The cap stores up instability. Once heating or a front breaks it, the large CAPE can drive intense storms.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Shear on a sounding',
    bullets: [
      'Winds turning **clockwise** with height (southeast at the surface to west aloft) are **veering**: warm air advection and helicity.',
      'Large speed increases with height mean strong **bulk shear**.',
      '==Strong instability + strong shear== → supercells likely.',
      'Instability **without** shear → **pulse storms** that rain themselves out quickly.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'A sounding has high CAPE but almost no change in wind with height. What storms are most likely?',
    options: [
      'Short-lived pulse storms',
      'Long-lived supercells',
      'No clouds at all',
      'A hurricane',
    ],
    answer: 0,
    explanation:
      'Without shear, a storm’s downdraft chokes its updraft, so it rains itself out quickly.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Dry adiabatic rate', back: 'About 9.8 °C cooling per km for unsaturated air.' },
      { front: 'LCL', back: 'Height where a lifted parcel saturates: cloud base.' },
      { front: 'CAPE', back: 'Energy a parcel gains from being warmer than its surroundings.' },
      { front: 'Cap', back: 'A warm layer aloft that holds storms back.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A parcel warmer than its surroundings keeps {0}, so the air is {1}. A small temperature–dew point spread gives a {2} cloud base.',
    blanks: ['rising', 'unstable', 'low'],
    distractors: ['sinking', 'stable', 'high'],
    explanation:
      'Warmer parcels are buoyant and keep rising (unstable); a small spread means the LCL, and cloud base, is low.',
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Close **temperature and dew point** lines = moist air and clouds.',
      'Dry rate ≈ **9.8 °C/km**; moist rate is ==slower because of latent heat==.',
      '**LCL ≈ 125 × spread**; low LCLs favor tornadoes.',
      '**CAPE + shear** → supercells; a **cap** can delay then unleash storms.',
    ],
  },
]);

const ingredients = defineDeck('met-u4-l1', [
  {
    kind: 'title',
    title: 'Ingredients for severe weather',
    subtitle: 'Air masses, fronts, jets and terrain set the stage for storms.',
    objectives: [
      'Identify air masses, fronts and drylines on maps.',
      'Explain how jets, shear and atmospheric rivers drive storms.',
      'Describe how oceans and landforms change storms.',
    ],
    image: 'b-met-air-masses',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which U.S. region do you think gets the most tornadoes?',
    options: ['The Pacific coast', 'The central Plains', 'New England', 'Alaska'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Air masses',
    image: 'b-met-air-masses',
    caption:
      'An **air mass** is a huge body of air with similar temperature and moisture, ==named for its source region==.',
    bullets: [
      '**mT** (maritime tropical), from the Gulf of Mexico: warm and humid.',
      '**cP** (continental polar), from Canada: cold and dry.',
      '**cT** (continental tropical), from the desert Southwest and Mexico: hot and dry.',
      'Central U.S. storms form where these masses ==meet and contrast sharply==.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each air mass to its description.',
    pairs: [
      ['mT', 'Warm and humid, from the Gulf of Mexico'],
      ['cP', 'Cold and dry, from Canada'],
      ['cT', 'Hot and dry, from the desert Southwest'],
    ],
    explanation:
      'm = maritime (moist), c = continental (dry); T = tropical (warm), P = polar (cold).',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Fronts and drylines',
    image: 'b-met-fronts',
    caption:
      'Map symbols: **cold front** (blue triangles), **warm front** (red half-circles), **stationary**, **occluded** and ==dryline== (open half-circles).',
    bullets: [
      '**Cold front**: dense cold air wedges under warm air → rapid lifting, often a line of storms.',
      '**Warm front**: rises gently over cool air → widespread clouds, steady rain.',
      '**Occluded**: a cold front overtakes a warm front. **Stationary**: barely moves.',
      'A **dryline** separates moist mT from dry cT air, often in west Texas and Oklahoma: a ==common supercell trigger==.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Which boundary usually brings a fast line of storms rather than steady rain?',
    options: [
      'A cold front',
      'A warm front',
      'A stationary front far away',
      'A high-pressure center',
    ],
    answer: 0,
    explanation:
      'Cold air wedges under warm air at a cold front, forcing rapid lifting and storms.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Jet streams and large-scale patterns',
    bullets: [
      '**Jet streams** are narrow bands of fast wind near the top of the troposphere, strongest where ==temperature contrasts are large==.',
      'The **polar jet** often steers storm systems.',
      'Air **spreading apart** aloft near a **jet streak** makes air below rise and surface pressure fall, ==strengthening lows==.',
      'A **low-level jet** carries warm, moist air north at night, feeding Plains storms.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Why does air spreading apart near a jet streak help a surface low strengthen?',
    options: [
      'Air below rises to replace it, so surface pressure falls',
      'It pushes cold air straight down onto the low',
      'It stops all wind near the ground',
      'It adds more air at the surface, raising pressure',
    ],
    answer: 0,
    explanation:
      'Divergence aloft removes air from the column, so air rises from below and surface pressure drops.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Shear and atmospheric rivers',
    bullets: [
      '**Wind shear** tilts the updraft away from the downdraft, so a storm ==does not choke on its own rain-cooled air==.',
      '**Turning** shear helps updrafts rotate.',
      '**Atmospheric rivers** are long, narrow corridors of concentrated water vapor, often thousands of km long.',
      'When one hits mountains (U.S. West Coast), air is forced up: ==extreme rain and flooding== over days.',
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Which statements about shear and atmospheric rivers are true? Select all that apply.',
    options: [
      'Shear tilts the updraft away from the downdraft',
      'Turning shear helps updrafts rotate',
      'Atmospheric rivers are narrow corridors of water vapor',
      'Shear always weakens every thunderstorm',
    ],
    answers: [0, 1, 2],
    explanation:
      'Shear separates updraft and downdraft and turning shear adds rotation; it helps organize thunderstorms (though it weakens hurricanes).',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Oceans and large water bodies',
    bullets: [
      'Oceans supply **heat and moisture**; warm water with high heat content ==fuels hurricanes==.',
      'The **depth** of warm water matters, because storms churn up cooler water from below.',
      'A storm’s **wake** of cooler water can weaken a following storm.',
      '**Fetch** (distance over open water) controls waves and moisture pickup; long fetch over the Great Lakes drives ==lake-effect snow==.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Cold wind blows 300 km down the length of Lake Erie. What does the long fetch do?',
    options: [
      'Picks up more moisture, feeding heavy lake-effect snow bands',
      'Dries the air completely',
      'Stops all snow downwind',
      'Turns the snow into hail',
    ],
    answer: 0,
    explanation:
      'A long path over open water adds heat and moisture, which feeds lake-effect bands.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Landforms and topography',
    bullets: [
      'Mountains force air up the **windward** side → more rain and snow; the **leeward** side is a dry ==rain shadow==.',
      'Terrain channels wind through **gaps and valleys** and can cause strong downslope winds.',
      'Over land, hurricanes ==lose their warm-water energy== and weaken; rough terrain tears them apart.',
      'Flat, open **plains** let contrasting air masses collide: one reason for **Tornado Alley**.',
    ],
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: assess the threat',
    problem:
      'Spring afternoon, Oklahoma: a dryline near the Texas border, mT air with dew points near 20 °C to its east, a strong jet streak overhead, and winds turning from southeast at the surface to west aloft.',
    steps: [
      '**Moisture**: humid mT air east of the dryline.',
      '**Lift**: the dryline and the jet streak.',
      '**Shear**: winds veering with height; **instability** from warm, moist low levels.',
    ],
    conclusion:
      'All ingredients are present: ==supercells with tornado potential== are likely east of the dryline.',
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Order the path of moist air in the example, from the Gulf to the storm.',
    items: [
      'Warm, humid air forms over the Gulf of Mexico',
      'A low-level jet carries it north over the Plains',
      'It meets dry desert air at the dryline',
      'Lifting at the dryline starts storms',
    ],
    explanation:
      'mT air forms over the Gulf, is carried north, meets the dryline, and is lifted into storms.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Air mass', back: 'A large body of air with similar temperature and moisture.' },
      { front: 'Dryline', back: 'Boundary between moist mT and dry cT air.' },
      { front: 'Jet streak', back: 'A fast wind core within a jet stream.' },
      { front: 'Atmospheric river', back: 'A long, narrow corridor of concentrated water vapor.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A dryline separates moist {0} air from dry {1} air. Mountains leave a dry {2} on their leeward side.',
    blanks: ['mT', 'cT', 'rain shadow'],
    distractors: ['cP', 'jet stream', 'warm front'],
    explanation:
      'The dryline divides Gulf moisture (mT) from desert air (cT); leeward slopes sit in a rain shadow.',
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      '**mT** warm and humid, **cP** cold and dry, **cT** hot and dry.',
      '**Cold fronts and drylines** force lifting that ==triggers storms==.',
      '**Jet streaks** help lows deepen; **shear** organizes storms; atmospheric rivers bring floods.',
      'Warm **oceans** fuel hurricanes; **mountains** and **plains** shape where storms go.',
    ],
  },
]);

export const decks: Deck[] = [
  observing,
  readingData,
  stability,
  ingredients,
  ...meteorologyDecksStorms,
];
