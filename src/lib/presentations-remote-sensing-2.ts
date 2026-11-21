import { defineDeck } from './presentation-types.ts';

// Remote Sensing (Division C) presentations for lessons 6–10. See presentations-remote-sensing.ts.

const indices = defineDeck('remote-u6-l1', [
  {
    kind: 'title',
    title: 'Map reading, coordinates, NDVI, and EVI',
    subtitle: 'Scale, geolocation, band-ratio calculations, and units.',
    objectives: [
      'Calculate map distances and pixel areas.',
      'Interpret coordinate order and projection.',
      'Compute NDVI and EVI with valid inputs.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Coordinates and reference systems',
    image: 'mercator-map',
    bullets: [
      'A coordinate pair needs its **reference system, units, axis order**, and datum to mean anything.',
      '**Latitude/longitude are angles**; projected coordinates are often metres.',
      'Subtracting degrees does not give a ground distance without a proper conversion.',
      'A raster row/column is an array position until a spatial transform places it on Earth.',
    ],
    callout: 'Before interpreting a map: ==find north, the scale, and the legend==.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Why is a difference in latitude not directly a distance in metres?',
    options: [
      'Latitude is an angle; converting needs a geographic method',
      'Latitude is already measured in metres',
      'Latitude changes with the time of day',
      'Only longitude can be converted',
    ],
    answer: 0,
    explanation:
      'Latitude and longitude are angular; converting to distance needs a method, and the longitude scale also depends on latitude.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Scale and area calculations',
    image: 'noaa-scale',
    caption:
      'At 1:50,000, **1 cm on the map = 50,000 cm = 500 m on the ground**. ==Area scales with the square of length==.',
    bullets: [
      'A 10 m pixel covers 100 m²; 100 full pixels = **10,000 m² = 1 hectare**.',
      'Boundary mixtures and classification errors make pixel counts estimates, not surveys.',
      'Keep units at every step — **do not confuse length with area**.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'At 1:50,000, how many kilometres does 3 cm on the map represent?',
    answer: 1.5,
    tolerance: 0.001,
    unit: 'km',
    explanation: '3 × 50,000 cm = 150,000 cm = 1,500 m = 1.5 km.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'How many full 10 m × 10 m pixels make one hectare (10,000 m²)?',
    answer: 100,
    tolerance: 0,
    explanation: 'Each pixel is 100 m², so 10,000 ÷ 100 = 100 pixels.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'NDVI from reflectance',
    image: 'ndvi-leaves',
    caption: 'NDVI = (NIR − red) ⁄ (NIR + red). With valid inputs it runs from ==−1 to +1==.',
    bullets: [
      'Higher values often mean stronger red/NIR contrast associated with green vegetation.',
      '**No universal threshold** identifies health or species in every scene.',
      'If NIR and red are both zero, NDVI is **undefined**.',
      'Use calibrated reflectances and quality masks; clouds, snow, water, and soil all shift values.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'Compute NDVI for NIR = 0.6 and red = 0.2.',
    answer: 0.5,
    tolerance: 0.005,
    explanation: '(0.6 − 0.2) ⁄ (0.6 + 0.2) = 0.4 ⁄ 0.8 = 0.5.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'What happens to NDVI if red and NIR are both zero?',
    options: [
      'NDVI is undefined',
      'NDVI is automatically 1',
      'NDVI proves bare soil',
      'NDVI is −1',
    ],
    answer: 0,
    explanation: 'The denominator is zero, so the ratio is undefined.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'EVI and scaling',
    image: 'modis-ndvi-global',
    bullets: [
      'A common form: EVI = 2.5 (NIR − red) ⁄ (NIR + 6·red − 7.5·blue + 1).',
      'The blue term and background adjustment distinguish it from NDVI.',
      'The “+1” means stored integer reflectances **must be converted** with their scale factor first.',
      'A near-zero denominator or odd output should trigger a quality review. EVI is not limited to NDVI’s range.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: NDVI and EVI',
    problem: 'NIR = 0.6, red = 0.2, blue = 0.1. Calculate NDVI and EVI.',
    steps: [
      'NDVI = 0.4 ⁄ 0.8 = 0.5.',
      'EVI denominator = 0.6 + 1.2 − 0.75 + 1 = 2.05.',
      'EVI = 2.5 × 0.4 ⁄ 2.05 ≈ 0.488.',
    ],
    conclusion:
      'Both are dimensionless derived indices; neither uniquely establishes a plant-health diagnosis.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'Using the same formula, compute EVI for NIR = 0.5, red = 0.1, blue = 0.05 (to 2 decimals).',
    answer: 0.58,
    tolerance: 0.01,
    explanation:
      'Numerator 2.5 × (0.5 − 0.1) = 1.0. Denominator 0.5 + 0.6 − 0.375 + 1 = 1.725. EVI = 1.0 ⁄ 1.725 ≈ 0.58.',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Why does EVI require careful input scaling?',
    options: [
      'Its denominator includes an additive constant',
      'It uses no bands',
      'All units cancel regardless of offsets',
      'Blue is always zero',
    ],
    answer: 0,
    explanation: 'Multiplying band values alone changes the role of the “+1” constant.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Comparing indices properly',
    bullets: [
      'Use the same target, date, and valid band definitions for each index.',
      'NDVI and EVI emphasize related but different information.',
      'Agreement strengthens a description of spectral change — ==not a biological cause==.',
      '**Index difference ≠ percentage change**: 0.2 → 0.4 is +0.2 units and +100%.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'NDVI rises from 0.2 to 0.4. What is the relative (percent) increase?',
    answer: 100,
    tolerance: 0.5,
    unit: '%',
    explanation: 'The difference is 0.2 index units; relative to 0.2 that is a 100% increase.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'A complete calculation response',
    bullets: [
      '**State the equation.**',
      '**Substitute** values with their scaling.',
      '**Evaluate** numerator and denominator separately.',
      '**Interpret** the dimensionless result, check validity, and give one limitation.',
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Put a complete index calculation in order.',
    items: [
      'Check units, scale factors, and quality masks',
      'Write the equation',
      'Substitute the scaled band values',
      'Evaluate numerator and denominator',
      'Interpret the result and state a limitation',
    ],
    explanation: 'Validate inputs, calculate transparently, then interpret with uncertainty.',
  },
  {
    kind: 'compare',
    title: 'Lengths and indices compared',
    columns: ['Quantity', 'Meaning', 'Caution'],
    rows: [
      ['Map length', 'Linear distance with units', 'Do not confuse with area.'],
      ['NDVI', 'Normalized red/NIR contrast', 'Undefined if the sum is zero.'],
      ['EVI', 'Adjusted multi-band ratio', 'Scaling and denominator matter.'],
    ],
  },
  {
    kind: 'match',
    prompt: 'Match each term to its definition.',
    pairs: [
      ['NDVI', 'Normalized red/NIR reflectance contrast'],
      ['EVI', 'Vegetation index with background and blue-band adjustment'],
      ['Datum', 'Reference framework underlying coordinates'],
      ['Scale factor', 'Conversion from stored values to physical units'],
    ],
    explanation: 'These are the vocabulary of every calculation question in this unit.',
  },
  {
    kind: 'open',
    prompt: 'A pixel has NDVI = 0.5. Write an appropriate, cautious conclusion.',
    model:
      'The pixel has positive red/NIR contrast consistent with vegetation under the stated conditions; class, health, and cause require further evidence.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Correct arithmetic begins with valid units and band definitions.',
      'Scale: map length × denominator, then convert; ==area scales with length squared==.',
      'NDVI = (NIR − red)/(NIR + red); EVI adds blue and a +1 background term.',
      'Report index differences and percent changes separately.',
    ],
  },
]);

const light = defineDeck('remote-u7-l1', [
  {
    kind: 'title',
    title: 'Electromagnetic properties and light interactions',
    subtitle: 'Wavelength, frequency, reflection, refraction, and absorption.',
    objectives: [
      'Relate wavelength and frequency.',
      'Apply Snell’s law with an explicit angle convention.',
      'Separate reflection, absorption, transmission, and emission.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Wave relationships',
    image: 'em-spectrum-properties',
    caption: '**c = λ × f**. Longer wavelength ↔ lower frequency ↔ lower photon energy (E = h·f).',
    bullets: [
      'Keep units consistent: 500 nm = 5 × 10⁻⁷ m.',
      'Microwave, visible, and thermal sensors reveal different features because matter interacts differently.',
      'Across a boundary, ==frequency stays the same== while speed and wavelength change.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'If wavelength doubles in vacuum, frequency…',
    options: ['Halves', 'Doubles', 'Stays fixed', 'Becomes zero'],
    answer: 0,
    explanation: 'c = λf is fixed, so f must halve.',
  },
  {
    kind: 'fill',
    section: 0,
    prompt: 'Convert units.',
    text: '500 nm equals 5 × 10^{0} m, and photon energy {1} as frequency increases.',
    blanks: ['-7', 'increases'],
    distractors: ['-9', 'decreases', '-5'],
    explanation: '1 nm = 10⁻⁹ m, so 500 nm = 5 × 10⁻⁷ m; E = hf rises with frequency.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Partitioning incoming energy',
    image: 'solar-energy-breakdown',
    caption:
      'Incident radiation is **reflected, absorbed, or transmitted**. For one wavelength and geometry, ==the fractions sum to 1==.',
    bullets: [
      'Absorbed energy can heat the material; emission is a separate temperature- and material-dependent response.',
      'A material can reflect strongly at one wavelength and absorb at another — so **name the wavelength** when you say “bright.”',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'Reflectance is 0.3 and transmittance is 0.2. What is the absorptance?',
    answer: 0.5,
    tolerance: 0.001,
    explanation: 'Fractions sum to 1: 1 − 0.3 − 0.2 = 0.5.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Reflection and scattering',
    image: 'atmosphere-limb',
    bullets: [
      '**Specular reflection**: mirror-like, concentrated in one direction.',
      '**Diffuse** scattering: spread broadly.',
      'Roughness is **judged relative to** wavelength — a surface can be smooth to microwaves but rough to light.',
      'Sun glint can make water bright in optical images, even though water is usually dark in NIR.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'A water pixel looks unusually bright in an optical image. Which is a likely cause?',
    options: [
      'Sun glint off the surface',
      'Water always reflects NIR strongly',
      'The pixel is a mountain',
      'The sensor is radar',
    ],
    answer: 0,
    explanation: 'Glint, sediment, or mixtures can brighten water; geometry and context matter.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Snell’s law',
    image: 'snells-law',
    caption:
      '**n₁ sin θ₁ = n₂ sin θ₂**, with angles measured from the NORMAL (perpendicular to the surface).',
    bullets: [
      'Entering a higher index, light bends toward the normal.',
      'Going from high to low index, if the computed sine exceeds 1, **total internal reflection** occurs.',
      '==Draw the normal first== to avoid using angles from the surface.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: refraction angle',
    problem: 'Light enters from n₁ = 1 to n₂ = 1.5 at 30° from the normal.',
    steps: [
      'sin θ₂ = (1 ⁄ 1.5) × sin 30° = 1 ⁄ 3.',
      'θ₂ = arcsin(1 ⁄ 3) ≈ 19.5°.',
      'The smaller angle is toward the normal, consistent with the higher index.',
    ],
    conclusion: 'The refracted angle is about ==19.5°== from the normal.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'Light goes from n₁ = 1.0 into n₂ = 1.33 at 45° from the normal. Find θ₂ in degrees (1 decimal).',
    answer: 32.1,
    tolerance: 0.3,
    unit: '°',
    explanation: 'sin θ₂ = sin 45° ⁄ 1.33 ≈ 0.7071 ⁄ 1.33 ≈ 0.532, so θ₂ ≈ 32.1°.',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Snell’s-law angles are measured from…',
    options: ['The normal', 'The surface', 'The north arrow', 'The satellite track'],
    answer: 0,
    explanation: 'The normal is perpendicular to the interface.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Atmospheric effects',
    image: 'borneo-haze',
    bullets: [
      '**Gases absorb** in selected bands; **particles and molecules scatter** along the path.',
      'Short visible wavelengths scatter strongly off small molecules → **haze and blue sky**.',
      'Aerosols have more complex, size-dependent behavior.',
      'Atmospheric correction is ==an inference with assumptions== — not perfect removal.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Select ALL statements that are true about atmospheric correction.',
    options: [
      'It separates surface and atmospheric contributions using a model',
      'It removes every atmospheric effect perfectly',
      'Quality flags still matter afterward',
      'It relies on assumptions and imperfect measurements',
    ],
    answers: [0, 2, 3],
    explanation: 'Correction is a modeled estimate; uncertainty and quality flags remain.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Connecting physics to a scene',
    bullets: [
      'Ask which interaction causes a difference: pigment absorption, leaf scattering, moisture absorption, thermal emission, or radar geometry.',
      'Name the wavelength and process ==before proposing a class label==.',
      'State simplifications so an ideal equation is not mistaken for a full scene model.',
    ],
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each observation with the interaction most responsible.',
    pairs: [
      ['Leaves are dark in red light', 'Pigment absorption'],
      ['Leaves are bright in near-infrared', 'Internal leaf scattering'],
      ['Warm pavement glows at night in thermal imagery', 'Thermal emission'],
      ['A pool looks blinding white at one angle', 'Specular reflection (glint)'],
    ],
    explanation: 'Good explanations name the physical interaction, not just “bright” or “dark.”',
  },
  {
    kind: 'compare',
    title: 'Interactions compared',
    columns: ['Interaction', 'What happens', 'Remember'],
    rows: [
      ['Reflection', 'Redirects incident radiation', 'Can be strongly directional.'],
      ['Absorption', 'Transfers energy into the material', 'Varies with wavelength.'],
      ['Refraction', 'Changes propagation direction across media', 'Angles use the normal.'],
    ],
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Wavelength', back: 'Distance between successive wave phases.' },
      { front: 'Refractive index', back: 'Ratio relating light speed in vacuum and a medium.' },
      { front: 'Normal', back: 'Line perpendicular to a boundary.' },
      {
        front: 'Absorptance',
        back: 'Fraction of incident energy absorbed under stated conditions.',
      },
    ],
  },
  {
    kind: 'open',
    prompt: 'Why does atmospheric correction still leave uncertainty?',
    model:
      'The atmosphere and surface contributions are separated using imperfect measurements and assumptions; correction is not complete knowledge of every path effect.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'A remote-sensing interpretation should name the wavelength, interaction, and geometry.',
      '**c = λf; E = hf.** Longer wavelength → lower frequency and energy.',
      'Reflected + absorbed + transmitted fractions = 1 for a given wavelength.',
      'Snell’s law uses angles from the normal.',
    ],
  },
]);

const albedo = defineDeck('remote-u8-l1', [
  {
    kind: 'title',
    title: 'Albedo and climate energy balance',
    subtitle: 'Shortwave reflection, longwave emission, and warming versus dimming.',
    objectives: [
      'Compute absorbed solar energy in a simple model.',
      'Distinguish albedo and greenhouse effects.',
      'Separate weather variability from climate inference.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Prediction: which surface do you think reflects the most sunlight?',
    options: ['Fresh snow', 'Ocean water', 'Asphalt', 'Forest'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Albedo as a fraction',
    image: 'baffin-sea-ice',
    bullets: [
      'Albedo = the **fraction** of incoming shortwave radiation **reflected**.',
      '**Fresh snow is high**; dark water and some soils are **low**.',
      '**Absorbed shortwave = incoming × (1 − albedo)**.',
      '**Albedo alone does not set temperature** — emission, storage, and transport matter too.',
    ],
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: two albedos',
    problem: 'Incoming local shortwave flux is 400 W/m². Compare albedo 0.2 and 0.6.',
    steps: [
      'For 0.2: reflected 80, absorbed 320 W/m².',
      'For 0.6: reflected 240, absorbed 160 W/m².',
      'The absorption difference is 160 W/m² with all else fixed.',
    ],
    conclusion:
      'Higher albedo ==halves absorbed shortwave flux== here; temperature is **not calculated** by this balance alone.',
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'Incoming flux is 500 W/m² and albedo is 0.3. How much is absorbed?',
    answer: 350,
    tolerance: 0.5,
    unit: 'W/m²',
    explanation: '500 × (1 − 0.3) = 350 W/m².',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'A planetary average',
    image: 'nasa-energy-budget',
    caption:
      'Earth intercepts sunlight over a disk (πR²) but spreads it over a sphere (4πR²): **average incoming = S ⁄ 4**; **absorbed = S(1 − α) ⁄ 4**.',
    bullets: [
      'Useful for reasoning about changes — not for local noon, seasons, clouds, or heat transport.',
      'Always say whether a number is ==local and instantaneous or a planetary average==.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Where does the factor of 4 in S ⁄ 4 come from?',
    options: [
      'A sphere’s area is four times the disk that intercepts sunlight',
      'Earth has four seasons',
      'Sunlight passes through four atmospheric layers',
      'Only a quarter of sunlight is visible',
    ],
    answer: 0,
    explanation: '4πR² ⁄ πR² = 4, giving a whole-surface average.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Longwave emission and the greenhouse effect',
    image: 'earth-eastern-hemisphere',
    bullets: [
      'Surfaces emit **thermal (longwave) radiation**; the atmosphere absorbs and re-emits parts of it.',
      '**Greenhouse gases** change the balance between absorbed solar and outgoing thermal energy.',
      'That is ==a different mechanism== from changing shortwave reflectivity (albedo).',
      'One hot infrared image **does not establish a climate trend** or its cause.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Sort each process: shortwave (albedo) or longwave (greenhouse) pathway?',
    bins: ['Shortwave reflection', 'Longwave exchange'],
    items: [
      ['Snow reflecting sunlight', 0],
      ['CO₂ absorbing outgoing thermal radiation', 1],
      ['Bright clouds reflecting sunlight to space', 0],
      ['Earth’s surface emitting infrared', 1],
      ['Darker pavement absorbing more sunlight', 0],
    ],
    explanation:
      'Albedo concerns reflected sunlight; greenhouse effects concern thermal radiation absorbed and emitted by the atmosphere.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Dimming and competing influences',
    image: 'pinatubo-1991',
    bullets: [
      'Aerosols and clouds reduce sunlight reaching the surface (“**dimming**”).',
      '**Absorbing aerosols** can heat atmospheric layers while the surface gets less sunlight.',
      'Clouds affect both shortwave reflection and longwave exchange.',
      '==Analyze each energy pathway separately== before judging the net effect.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Why is “dimming” not the same as uniform cooling?',
    options: [
      'Absorbing particles can heat the atmosphere while the surface receives less sunlight',
      'Dimming adds sunlight to the surface',
      'Aerosols only affect radar',
      'Clouds have no longwave effect',
    ],
    answer: 0,
    explanation: 'Scattering and absorption redistribute energy among layers.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Weather and climate scales',
    bullets: [
      '**Weather**: short-term conditions. **Climate**: long-term distributions and patterns.',
      'Satellites give broad coverage, but sampling, calibration continuity, and variability affect trends.',
      'Compare many consistently processed observations — ==not two convenient images==.',
      'A regional anomaly can coexist with a different global pattern.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Weather or climate?',
    bins: ['Weather', 'Climate'],
    items: [
      ['A heat wave this week', 0],
      ['30-year average July temperature', 1],
      ['A thunderstorm tonight', 0],
      ['A multi-decade decline in Arctic sea ice', 1],
      ['Tomorrow’s cloud cover', 0],
    ],
    explanation: 'Weather is short-term; climate describes long-term statistics and trends.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Testing a feedback explanation',
    image: 'surface-albedo',
    caption:
      'Snow-albedo feedback: warming → less snow → lower albedo → more absorbed sunlight → more warming.',
    bullets: [
      'A feedback **amplifies (positive)** or **opposes (negative)** an initial change.',
      'A feedback is not independent proof of the original cause; ==distinguish feedback from forcing==.',
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Put the snow-albedo feedback loop in order.',
    items: [
      'Initial warming',
      'Snow cover shrinks',
      'Surface albedo decreases',
      'More shortwave energy is absorbed',
      'Further warming',
    ],
    explanation: 'Each step amplifies the next — a positive feedback.',
  },
  {
    kind: 'compare',
    title: 'Mechanisms compared',
    columns: ['Change', 'Pathway', 'Caution'],
    rows: [
      [
        'Albedo change',
        'Changes shortwave reflection',
        'Hold illumination fixed for a simple comparison.',
      ],
      [
        'Greenhouse change',
        'Changes thermal radiation exchange',
        'Not the same as visible reflectivity.',
      ],
      ['Climate trend', 'Persistent distributional change', 'Requires more than two scenes.'],
    ],
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Albedo', back: 'Fraction of incoming shortwave energy reflected.' },
      { front: 'Flux', back: 'Energy transfer per area per time.' },
      { front: 'Feedback', back: 'A response that amplifies or opposes an initial change.' },
      { front: 'Emissivity', back: 'Efficiency of thermal emission relative to a blackbody.' },
    ],
  },
  {
    kind: 'mcq',
    prompt: 'What does a single hot satellite scene establish?',
    options: [
      'A short-term observation under its conditions',
      'A complete climate attribution',
      'A global trend automatically',
      'A new solar constant',
    ],
    answer: 0,
    explanation: 'Climate inference needs a consistent series and broader evidence.',
  },
  {
    kind: 'open',
    prompt:
      'Describe the snow-albedo feedback in your own words and say why it is a positive feedback.',
    model:
      'Warming can reduce reflective snow, lowering albedo; more shortwave energy is absorbed, which amplifies the warming under comparable conditions — so it reinforces the initial change.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '**Absorbed shortwave = incoming × (1 − albedo)**.',
      'Planetary average absorbed flux = S(1 − α) ⁄ 4.',
      'Albedo (shortwave) and greenhouse (longwave) are ==different pathways==.',
      'Distinguish energy pathways before assigning a warming or cooling mechanism.',
    ],
  },
]);

const systems = defineDeck('remote-u9-l1', [
  {
    kind: 'title',
    title: 'Climate systems, ozone, cycles, and geohazards',
    subtitle: 'Linked Earth systems and multi-sensor evidence.',
    objectives: [
      'Connect water and carbon cycles to observables.',
      'Distinguish stratospheric ozone from greenhouse mechanisms.',
      'Interpret hazard maps with time and exposure context.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Linked reservoirs and flows',
    image: 'katrina-2005',
    bullets: [
      'Atmosphere, ocean, land, ice, and life exchange matter and energy.',
      'Reservoir = **a stored quantity**. Flux = **a transfer per unit time**.',
      'Satellites constrain parts of these: vegetation cover, clouds, sea-surface temperature, ice extent.',
      'A map of one reservoir ==does not give the full flux in or out of it==.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Reservoir (stock) or flux (rate)?',
    bins: ['Reservoir', 'Flux'],
    items: [
      ['Stored biomass carbon', 0],
      ['Carbon uptake per day', 1],
      ['Water in a lake', 0],
      ['Runoff per second', 1],
      ['Ice sheet volume', 0],
      ['Emissions per year', 1],
    ],
    explanation: 'Reservoirs are amounts; fluxes have “per time” units.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'The water cycle',
    image: 'usgs-water-cycle',
    caption:
      '**Evaporation**, **transpiration**, **condensation**, **precipitation**, **infiltration**, **runoff**, and **storage** connect water across Earth systems.',
    bullets: [
      'Different sensors see different parts: clouds, precipitation returns, snow cover, surface-water extent.',
      'A wet-surface image ==is not a groundwater measurement==.',
      'Time sequences separate rain-driven flooding from permanent water bodies.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each water-cycle process to its description.',
    pairs: [
      ['Evaporation', 'Liquid water becomes vapor from surfaces'],
      ['Transpiration', 'Plants release water vapor through leaves'],
      ['Infiltration', 'Water soaks into the ground'],
      ['Runoff', 'Water flows over land toward streams'],
    ],
    explanation:
      'Satellites observe some of these directly; others, like infiltration, stay hidden.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Carbon and vegetation',
    image: 'carbon-cycle',
    caption:
      '**Photosynthesis** moves carbon into organic matter; **respiration**, **decomposition**, **combustion**, and **ocean exchange** return or redistribute it.',
    bullets: [
      'Vegetation indices describe canopy spectra — not total carbon storage or net uptake.',
      'Biomass models need calibration, structural data, and ecological context.',
      'Keep **gross uptake**, **net exchange**, and **stored biomass** distinct.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Why is NDVI not a measurement of total carbon storage?',
    options: [
      'It measures spectral contrast; carbon needs calibrated biomass models',
      'NDVI is measured in kilograms of carbon',
      'NDVI is only used for water',
      'Carbon is invisible to every sensor',
    ],
    answer: 0,
    explanation: 'An index is a proxy; storage requires structure, calibration, and ecology.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Ozone in context',
    image: 'ozone-hole-2010',
    bullets: [
      '**Stratospheric** ozone **absorbs much solar UV**, protecting life at the surface.',
      'Ozone depletion and greenhouse warming are ==different mechanisms== (though they interact).',
      '**Tropospheric** (near-ground) ozone is an **air-quality concern**.',
      '**Column ozone** integrates the whole vertical column — it ==does not give ground-level concentration==.',
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Select ALL true statements about ozone.',
    options: [
      'Stratospheric ozone absorbs ultraviolet radiation',
      'A column-ozone map gives the concentration at ground level',
      'Near-ground ozone is an air-quality concern',
      'Ozone depletion is the same mechanism as greenhouse warming',
    ],
    answers: [0, 2],
    explanation:
      'Column values are vertical totals; depletion and greenhouse warming are distinct mechanisms.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Hazard observation versus risk',
    image: 'risk-equation',
    caption:
      'Risk combines hazard, **exposure**, and **vulnerability**. A hazard map alone shows ==only the first==.',
    bullets: [
      'Satellites map fire scars, floods, volcanic ash, landslides, and ground deformation.',
      'A post-event image can **miss the maximum flood extent**.',
      'Radar deformation needs careful geometry and coherence interpretation.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each term with an example.',
    pairs: [
      ['Hazard', 'River flooding'],
      ['Exposure', 'Homes and roads in the floodplain'],
      ['Vulnerability', 'Buildings without flood protection'],
      ['Risk', 'Expected harm from all three combined'],
    ],
    explanation:
      'Remote sensing maps hazards well; exposure and vulnerability come from other data.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: a flood map',
    problem:
      'A flood map shows 10 km² inundated, but no settlement or infrastructure data are provided. What can be concluded?',
    steps: [
      'Report the observed inundation extent and image date.',
      'Check whether the scene captured the peak and whether clouds or mixtures limit mapping.',
      'Request exposure and vulnerability information before estimating damage or risk.',
    ],
    conclusion: 'Mapped hazard extent is evidence, but it is ==not a complete loss or risk estimate==.',
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Flood extent alone gives…',
    options: [
      'A mapped hazard observation',
      'Exact economic loss',
      'Population vulnerability automatically',
      'A complete groundwater budget',
    ],
    answer: 0,
    explanation: 'Risk also requires exposure and vulnerability.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Building a multi-evidence explanation',
    image: 'aral-sea-1989-2014',
    bullets: [
      'State what changed, where, when, and in which measurement.',
      'Compare before, during, and after; add independent reference information.',
      '**Coincident changes suggest a link** — not its direction, and not that a third cause is excluded.',
      'Pick additional observations that ==discriminate between the alternatives==.',
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Order the steps of a multi-evidence explanation.',
    items: [
      'Observe: locate a measured change in time and space',
      'Connect: link it to a reservoir, flux, or hazard mechanism',
      'Evaluate: add independent evidence and exposure context',
    ],
    explanation:
      'Observe → connect → evaluate keeps proxies, mechanisms, and consequences distinct.',
  },
  {
    kind: 'compare',
    title: 'Proxies versus quantities',
    columns: ['Item', 'What it is', 'Not the same as'],
    rows: [
      ['Biomass', 'Stored organic material', 'An index.'],
      ['Ozone column', 'Vertically integrated atmospheric quantity', 'Surface concentration.'],
      ['Hazard extent', 'Where a process was observed', 'Total risk or damage.'],
    ],
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Reservoir', back: 'Stored quantity in a system.' },
      { front: 'Flux', back: 'Transfer rate between reservoirs.' },
      { front: 'Hazard', back: 'Potentially damaging process.' },
      { front: 'Risk', back: 'Potential harm involving hazard, exposure, and vulnerability.' },
    ],
  },
  {
    kind: 'open',
    prompt:
      'What additional evidence would improve a flood-risk analysis built from one satellite image?',
    model:
      'Image timing and accuracy (did it catch the peak?), terrain, the people and infrastructure exposed, and their vulnerability.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Distinguish reservoirs (**stocks**) from fluxes (**rates**).',
      'Indices are proxies — not carbon storage or uptake.',
      'Column ozone ≠ surface ozone; depletion ≠ greenhouse warming.',
      'Hazard maps are evidence; risk also needs exposure and vulnerability.',
    ],
  },
]);

const agriculture = defineDeck('remote-u10-l1', [
  {
    kind: 'title',
    title: 'Applied image interpretation and agriculture',
    subtitle: 'Field-monitoring workflow, validation, and change analysis.',
    objectives: [
      'Design a field-scale comparison.',
      'Distinguish crop phenology from stress.',
      'Validate an interpretation using independent evidence.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Start with the decision',
    image: 'al-jowf-pivots',
    bullets: [
      '==Define the decision and target scale== before selecting an index.',
      'Draw field boundaries that isolate the crop, excluding roads, neighbors, and mixed edges.',
      'Record dates relative to planting, management, rainfall, and harvest.',
      'Two fields planted on different dates can differ in greenness **without differing in condition**.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Phenology and time series',
    image: 'modis-ndvi-profile',
    caption:
      'An index rises during canopy development, peaks, and falls at senescence or harvest. ==Comparing different stages can imitate stress==.',
    bullets: [
      'Use consistent time series and compare similar developmental windows.',
      'Clouds and shadows interrupt the series.',
      '**Interpolated points are estimates** — report gaps and smoothing choices.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Why compare fields at the same phenological stage?',
    options: [
      'Development timing can mimic condition differences',
      'All fields mature on one date',
      'Indices have no seasonal behavior',
      'Clouds never vary seasonally',
    ],
    answer: 0,
    explanation: 'Seasonal development changes canopy response on its own.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Separating possible causes',
    bullets: [
      'Low vegetation contrast can come from sparse cover, exposed soil, water stress, nutrients, disease, normal senescence, or measurement effects.',
      'The index ==does not choose among them==.',
      'Thermal data, other bands, field visits, weather, and management history can discriminate.',
      '**Ask**: what evidence would ==differ between the leading hypotheses==?',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each hypothesis for a low-NDVI field with evidence that could test it.',
    pairs: [
      ['Water stress', 'Thermal imagery and recent rainfall records'],
      ['Normal harvest', 'Farm management and harvest dates'],
      ['More exposed soil', 'Higher-resolution imagery or a field visit'],
      ['Cloud contamination', 'Quality masks and cloud flags'],
    ],
    explanation: 'Good investigations choose observations that would differ between hypotheses.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Sampling and validation',
    bullets: [
      'Choose reference sites that span the variation — not just the easiest locations.',
      'Keep validation data **independent** of the data used to fit thresholds.',
      'Report class-specific errors: ==overall accuracy can hide a poorly detected rare class==.',
      'Match field timing and spatial support to the imagery.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Validation data should be…',
    options: [
      'Independent of threshold fitting',
      'The same selected examples only',
      'Chosen only where predictions are correct',
      'Discarded after fitting',
    ],
    answer: 0,
    explanation: 'Independence is what tests generalization.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Change detection',
    image: 'rondonia-2007',
    bullets: [
      'Use comparable products, registration, masks, and units across dates.',
      'Compute change from calibrated values — ==never from independently stretched colors==.',
      'Field averages can hide a damaged patch; pixel differences can exaggerate noise.',
      'State the baseline: last week, last year, or an untreated reference field are different comparisons.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Select ALL practices that make a change-detection comparison fair.',
    options: [
      'Register both images to the same ground locations',
      'Compare independently stretched display colors',
      'Apply the same cloud and quality masks',
      'State the baseline you are comparing against',
      'Use different units for each date',
    ],
    answers: [0, 2, 3],
    explanation: 'Registration, consistent masks, and an explicit baseline make change meaningful.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: pure to mixed pixel',
    problem:
      'A field pixel changes from pure vegetation to 50% vegetation and 50% soil using NIR/red pairs (0.6, 0.1) and (0.3, 0.2).',
    steps: [
      'Initial NDVI = 0.5 ⁄ 0.7 ≈ 0.714.',
      'Mixed NIR/red = 0.45 ⁄ 0.15, so new NDVI = 0.5.',
      'The drop can arise from **changed cover fraction alone**; investigate before naming a stress cause.',
    ],
    conclusion: 'A lower ratio demonstrates ==a spectral change, not a unique diagnosis==.',
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'Compute the initial NDVI for the pure-vegetation pixel (NIR 0.6, red 0.1), to 3 decimals.',
    answer: 0.714,
    tolerance: 0.002,
    explanation: '(0.6 − 0.1) ⁄ (0.6 + 0.1) = 5 ⁄ 7 ≈ 0.714.',
  },
  {
    kind: 'order',
    prompt: 'Order the field-monitoring workflow.',
    items: [
      'Design: define target, baseline, dates, and support',
      'Compare: calculate quality-controlled spatial and temporal changes',
      'Validate: test causes with independent field evidence',
      'Communicate: report product, change, uncertainty, and next observation',
    ],
    explanation: 'Design → compare → validate → communicate.',
  },
  {
    kind: 'compare',
    title: 'Summaries and their limits',
    columns: ['Result', 'Tells you', 'Caution'],
    rows: [
      ['Index decline', 'Observed spectral change', 'Several biological and measurement causes.'],
      ['Field average', 'Useful summary', 'Can hide small patches.'],
      [
        'Validation sample',
        'Tests prediction outside fitting',
        'Must represent relevant variation.',
      ],
    ],
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Phenology', back: 'Timing of seasonal biological development.' },
      { front: 'Validation', back: 'Independent evaluation of a model or classification.' },
      { front: 'Baseline', back: 'Reference against which change is described.' },
      { front: 'Aggregation', back: 'Combining measurements over a larger support.' },
    ],
  },
  {
    kind: 'mcq',
    prompt: 'What can explain lower field NDVI without a unique disease diagnosis?',
    options: [
      'Greater exposed-soil fraction',
      'A renamed file only',
      'A changed notebook font',
      'A higher map title',
    ],
    answer: 0,
    explanation: 'Mixtures change band values directly.',
  },
  {
    kind: 'open',
    prompt: 'Write a cautious change statement for the worked example.',
    model:
      'The calibrated pixel NDVI fell from about 0.714 to 0.5 under the stated mixture; altered cover fraction is one explanation, and the cause requires independent evidence.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Applications need a question, comparable observations, and independent validation.',
      'Compare phenological stages, not just calendar dates.',
      'An index decline is a spectral observation with several possible causes.',
      'Report product, dates, support, change, uncertainty, and the next discriminating observation.',
    ],
  },
]);

export const remoteSensingDecksLater = [indices, light, albedo, systems, agriculture];
