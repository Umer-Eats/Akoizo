import type { EventLessons, Lesson } from './lessons';

// Scope is grounded in the checked-in 2027 B event sections, not a blanket grade-level cut.
// Replacement IDs keep old C-depth attempts and ID-keyed enrichment out of the B lesson.
type Adaptation = {
  title: string;
  sections: [string, string][];
  terms: [string, string][];
  observations: [string, string][];
  question: string;
  answer: string;
  alternatives: string[];
  steps: string[];
};
const adaptations: Record<string, Adaptation> = {
  'code-u2-l1': {
    title: 'Atbash and Caesar shifts',
    sections: [
      [
        'Number the alphabet',
        'Use A=0 through Z=25 when doing shift arithmetic. Wrap around after Z. Encryption and decryption move in opposite directions for a Caesar shift, so write down which direction the problem asks you to use.',
      ],
      [
        'Caesar decoding',
        'A Caesar cipher shifts every letter by the same amount. If encryption shifts forward by three, D decodes to A and A decodes to X. Try plausible shifts and verify a whole phrase rather than accepting one recognizable word.',
      ],
      [
        'Atbash decoding',
        'Atbash reverses the alphabet: A pairs with Z, B with Y, and C with X. The same table encrypts and decrypts. There is no unknown shift key to recover. Copy spacing carefully and check every letter against the table.',
      ],
      [
        'Check the B cipher list',
        'Atbash and Caesar are in the supplied B Regional list. Affine transformations are not, so this B lesson concentrates on fixed substitutions and shifts. For each puzzle identify its cipher family before choosing a solving method.',
      ],
    ],
    terms: [
      ['Caesar cipher', 'A fixed alphabet shift.'],
      ['Atbash', 'A reversal of the alphabet.'],
      ['Plaintext', 'The original readable message.'],
      ['Ciphertext', 'The encoded message.'],
    ],
    observations: [
      ['Cipher', 'Caesar with forward encryption shift 3.'],
      ['Ciphertext', 'FDW.'],
      ['Alphabet', 'A=0 through Z=25.'],
    ],
    question: 'What is the plaintext?',
    answer: 'CAT',
    alternatives: ['IGZ', 'DOG', 'XZD'],
    steps: [
      'Decode by shifting backward three places.',
      'F becomes C, D becomes A, and W becomes T.',
      'Re-encrypt CAT to check that it gives FDW.',
    ],
  },
  'code-u4-l1': {
    title: 'Porta, Nihilist, and checkerboard tables',
    sections: [
      [
        'Porta',
        'Repeat the keyword beneath the text. Each key letter selects a paired-alphabet row in the supplied Porta table. Locate the ciphertext letter in that row and read its paired plaintext letter. Porta is reciprocal: the same row operation reverses itself. Regional B problems supply the key; State/National cryptanalysis can instead provide a crib.',
      ],
      [
        'Nihilist',
        'Construct the keyed Polybius square by writing unique keyword letters followed by unused alphabet letters, combining I/J when specified. Give each letter a row-column coordinate such as 11 or 34. A Nihilist cipher adds the plaintext coordinate and repeating key coordinate as ordinary numbers. Subtract the key coordinate to decode; do not subtract digits separately.',
      ],
      [
        'Checkerboard',
        'A 5-by-5 checkerboard uses row and column keywords to label a Polybius square. Read each ciphertext pair as a row label and a column label, then look up the square entry. Use the supplied Polybius key and the exact row/column ordering in the question. A label is not an alphabet shift.',
      ],
      [
        'Verify a crib',
        'A crib is known plaintext that helps test a key or alignment. Decode across several positions, then re-encode to check. The supplied B rules distinguish given-key Regional questions from some State/National cryptanalysis tasks. Match practice to those conditions instead of assuming every table cipher has an unknown key.',
      ],
    ],
    terms: [
      ['Polybius square', 'A letter table indexed by row and column.'],
      ['Crib', 'Known plaintext used to constrain a solution.'],
      ['Repeating key', 'A key reused across successive positions.'],
      ['Reciprocal', 'The same operation reverses itself.'],
    ],
    observations: [
      ['Nihilist ciphertext', '65.'],
      ['Key coordinate', '23.'],
      ['Square entry', 'Row 4, column 2 contains R.'],
    ],
    question: 'Which letter is decoded?',
    answer: 'R',
    alternatives: [
      'The letter in row 6, column 5',
      'The letter in row 2, column 3',
      'No letter because 65 is outside the square',
    ],
    steps: [
      'Subtract whole coordinate numbers: 65 − 23 = 42.',
      'Interpret 42 as row 4, column 2.',
      'Read R and check 42 + 23 = 65.',
    ],
  },
  'code-u8-l1': {
    title: 'Columnar transposition and homophonic evidence',
    sections: [
      [
        'Rearrangement versus substitution',
        'A transposition cipher rearranges plaintext letters without replacing them. In complete columnar transposition, text fills a rectangle and columns are read in a keyed order. Letter counts are preserved. The supplied B rules limit complete columnar problems to nine columns or fewer and provide a crib.',
      ],
      [
        'Rebuild the rectangle',
        'Divide message length by the given column count to obtain column height for a complete rectangle. Split ciphertext into column-sized pieces. Test their order by reading across the reconstructed rows and looking for the crib. Recheck the entire message; a short accidental word is weak evidence.',
      ],
      [
        'Homophonic substitution',
        'A homophonic system lets more than one ciphertext symbol represent the same plaintext letter. This spreads a common letter across several symbols, weakening simple frequency guesses. Keep a symbol-to-letter table and use the supplied crib and keyword clues to constrain it. The B rules specify a four-unique-letter keyword and their clue conditions; follow the table convention supplied with the puzzle.',
      ],
      [
        'Use consistent evidence',
        'Repeated symbols must behave consistently under the specified encoding scheme, but different symbols can decode to the same letter in a homophonic cipher. Distinguish that from monoalphabetic substitution. Check word patterns, keyword constraints, and the full crib before committing to a solution.',
      ],
    ],
    terms: [
      ['Transposition', 'Rearrangement of letters without changing their identities.'],
      ['Column height', 'Number of rows in a complete transposition rectangle.'],
      ['Homophone', 'An alternative ciphertext symbol for the same plaintext letter.'],
      ['Crib', 'A supplied piece of plaintext.'],
    ],
    observations: [
      ['Rectangle', 'Six letters in two columns.'],
      ['Ciphertext pieces', 'CTO and ATO.'],
      ['Clue', 'The plaintext starts with CAT.'],
    ],
    question: 'What plaintext results when CTO is the left column?',
    answer: 'CATTOO',
    alternatives: ['CTOATO', 'ATOC TO', 'CATTWO'],
    steps: [
      'Each column contains 6/2 = 3 letters.',
      'Read the rows CA, TT, and OO.',
      'Join the rows as CATTOO, which agrees with the supplied crib.',
    ],
  },
  'remote-u2-l1': {
    title: 'Passive images and active radar',
    sections: [
      [
        'Passive sensing',
        'A passive instrument detects energy from another source. Optical images often use reflected sunlight; thermal images use energy emitted by surfaces. Clouds can hide the ground from optical sensors. A nighttime thermal image is possible because surfaces still emit radiation.',
      ],
      [
        'Active radar',
        'Radar sends microwave energy and measures returning signals. Backscatter depends on surface roughness, moisture, material, and viewing direction. Smooth water often looks dark when it reflects energy away from the sensor. Radar can observe through clouds, but brightness is not a direct label for water or vegetation.',
      ],
      [
        'Radar products',
        'Synthetic aperture radar combines measurements along a moving platform to form an image. Interferometric SAR compares phase information to help interpret elevation or surface movement. For B, recognize the basic purpose and interpret a supplied map; do not derive phase equations. Radar altimeters estimate distance from pulse travel time.',
      ],
      [
        'Match instrument and task',
        'Multispectral imagers compare several wavelength bands, radiometers measure radiation, and digital elevation models represent surface height. Use optical bands for land-cover patterns, thermal data for surface-temperature patterns, and radar when clouds obstruct visible observations. The B sensor list does not include a separate lidar unit.',
      ],
    ],
    terms: [
      ['Passive sensor', 'Detects energy supplied by another source.'],
      ['Active sensor', 'Transmits energy and measures its return.'],
      ['Backscatter', 'Energy scattered toward the sensor.'],
      ['Elevation model', 'A representation of surface heights.'],
    ],
    observations: [
      ['Weather', 'Clouds cover a flooded valley.'],
      ['Optical image', 'The ground cannot be seen beneath the clouds.'],
      ['Radar image', 'New dark areas follow the low valley floor.'],
    ],
    question: 'What is the best next interpretation step?',
    answer: 'Compare radar patterns with elevation and independent flood observations',
    alternatives: [
      'Label every dark pixel as water without checking',
      'Assume thermal imagery always sees through clouds',
      'Discard radar because it requires sunlight',
    ],
    steps: [
      'The optical view is obstructed.',
      'Radar supplies different evidence, but dark returns are not unique to flooding.',
      'Use elevation and independent observations to test the flood interpretation.',
    ],
  },
  'circ-u9-l1': {
    title: 'Fault finding with switches, fuses, and diodes',
    sections: [
      [
        'Trace a complete path',
        'A DC circuit needs a complete conducting path from one battery terminal through the load to the other terminal. An open switch breaks that path. A short circuit creates an unintended low-resistance path that can bypass a load and draw excessive current. Trace the wiring before changing components.',
      ],
      [
        'Protection and control',
        'A fuse melts when excessive current heats its element; a circuit breaker interrupts excessive current and can be reset after the fault is corrected. A ground fault circuit interrupter detects an imbalance between outgoing and returning current. A relay uses one circuit to operate a switch in another. These devices have different jobs.',
      ],
      [
        'A diode has direction',
        'A silicon diode conducts much more readily in its forward direction than in reverse. An LED emits light when forward biased and needs current limiting. If only one LED is dark, compare its direction and branch connections before blaming the battery. Do not treat a diode as a resistor that obeys the same voltage-current relation in both directions.',
      ],
      [
        'Measure and test',
        'Disconnect power before rearranging wires or measuring resistance. Measure voltage across a component and current through a series connection. Start with a wiring sketch and a prediction, then use one measurement to distinguish an open wire from a reversed LED. Transistors, operational amplifiers, capacitance, and sequential logic are outside the supplied Division B Circuit Lab scope.',
      ],
    ],
    terms: [
      ['Open circuit', 'A broken conducting path.'],
      ['Short circuit', 'An unintended low-resistance path.'],
      ['Diode', 'A device that conducts preferentially in one direction.'],
      ['Relay', 'An electrically operated switch.'],
    ],
    observations: [
      ['Supply', 'The battery reads 6 V.'],
      ['Branch A', 'Its LED lights through a resistor.'],
      ['Branch B', 'Its LED is reversed and remains dark.'],
    ],
    question: 'Which change best tests the cause of the dark LED?',
    answer: 'Reverse the LED with power disconnected, retaining its resistor',
    alternatives: [
      'Remove both current-limiting resistors',
      'Short the battery terminals',
      'Replace the working battery without checking wiring',
    ],
    steps: [
      'The working branch shows that the supply can power an LED.',
      'Compare LED polarity and connections in the two branches.',
      'Disconnect power, correct the reversed LED, and retest with its resistor.',
    ],
  },
  'exp-u7-l1': {
    title: 'A clear Division B investigation report',
    sections: [
      [
        'Make the question measurable',
        'Name what you change and what you measure. “How does towel area affect absorbed water mass?” identifies an independent variable and a dependent variable. Choose several area levels, use the same material and soak time, and describe the measurement method so another team can repeat it.',
      ],
      [
        'Keep the raw evidence',
        'Give each trial a row with units. Record qualitative observations separately from numerical measurements. Keep unexpected values visible and explain possible causes; do not erase a result simply because it weakens your hypothesis. Repeated trials reveal variation under the same conditions.',
      ],
      [
        'Summarize and graph',
        'A mean is the sum of the measurements divided by their number. A range is the largest value minus the smallest. Label both graph axes, include units, and put the independent variable on the horizontal axis. Compare means alongside the spread of repeated measurements.',
      ],
      [
        'Support the conclusion',
        'State whether the results support the hypothesis, quote numerical evidence, and connect it to a scientific explanation. Identify a specific error and how it might change the measurement. Suggest an improvement that addresses that error. Use the Division B checklist in Rules for required report parts; a Division C abstract is not a substitute for those parts.',
      ],
    ],
    terms: [
      ['Mean', 'Sum divided by number of measurements.'],
      ['Range', 'Largest value minus smallest value.'],
      ['Trial', 'One repetition of a measurement.'],
      ['Conclusion', 'A claim supported by the recorded evidence.'],
    ],
    observations: [
      ['25 cm² towel', 'Absorbed masses: 2, 3, 4 g.'],
      ['50 cm² towel', 'Absorbed masses: 5, 6, 7 g.'],
      ['Controls', 'Same towel brand, soak time, and draining method.'],
    ],
    question: 'What conclusion is supported by these trials?',
    answer: 'Doubling area increased mean absorbed mass from 3 g to 6 g',
    alternatives: [
      'Every individual measurement doubled',
      'The larger towel absorbed less water',
      'Soak time caused the change because it was increased',
    ],
    steps: [
      'Calculate (2 + 3 + 4)/3 = 3 g.',
      'Calculate (5 + 6 + 7)/3 = 6 g.',
      'Compare the means while acknowledging the 2 g range in each group.',
    ],
  },
  'remote-u3-l1': {
    title: 'Choosing an orbit for an observation',
    sections: [
      [
        'Height and coverage',
        'Low Earth orbit places a satellite relatively close to the surface. It can collect detailed images along a moving track. Higher orbits can view larger areas at once, but image detail also depends on the sensor. Orbit height alone does not determine resolution.',
      ],
      [
        'Polar coverage',
        'A near-polar orbit passes near both poles while Earth turns beneath the track. Repeated passes sample different longitudes. This is useful for mapping land cover over broad regions. Revisit time also depends on the field of view and the number of satellites.',
      ],
      [
        'Watching one region',
        'A geosynchronous orbit matches Earth’s rotation period. A circular equatorial geostationary orbit is the special case that appears fixed over one longitude. GOES can therefore follow weather changes frequently over a broad region. A geosynchronous orbit is not automatically geostationary.',
      ],
      [
        'Reason qualitatively',
        'For the same central body, a larger orbital size means a longer period according to Kepler’s third law. The supplied B rules assess that relationship qualitatively. Choose an orbit using coverage and revisit needs, and avoid turning the task into a numerical orbital derivation.',
      ],
    ],
    terms: [
      ['Orbit', 'A path around a body under gravity.'],
      ['Polar orbit', 'An orbit passing near the poles.'],
      ['Geostationary', 'Appearing fixed over one equatorial longitude.'],
      ['Revisit time', 'Time between observations of a location.'],
    ],
    observations: [
      ['Task', 'Track a storm every few minutes.'],
      ['Sensor A', 'Views one broad region continuously.'],
      ['Sensor B', 'Collects a detailed strip on occasional passes.'],
    ],
    question: 'Which observation strategy best follows rapid storm development?',
    answer: 'Use the frequent regional views from sensor A',
    alternatives: [
      'Use only one detailed image from sensor B',
      'Ignore the time between images',
      'Assume all polar satellites continuously view the same place',
    ],
    steps: [
      'The task requires frequent observations.',
      'Sensor A repeatedly observes the region.',
      'Use sensor A for the time sequence and check its spatial detail is sufficient.',
    ],
  },
  'remote-u6-l1': {
    title: 'Map scale, elevation, and land-cover evidence',
    sections: [
      [
        'Read the map first',
        'Find the date, orientation, legend, scale, and coordinate information before measuring. False-color images assign visible display colors to selected bands, so a red patch does not necessarily represent a red object. Use the legend and surrounding pattern together.',
      ],
      [
        'Measure distance and area',
        'At a scale of 1:50,000, one centimeter on the map represents 50,000 cm, or 500 m, on the ground. Two centimeters represents 1 km. Area scales in two dimensions: a 1 cm by 1 cm square represents 500 m by 500 m, or 250,000 m².',
      ],
      [
        'Read contours',
        'Contours connect equal elevations. Closely spaced contours indicate a steeper surface when the scale and contour interval are fixed. Slope as rise divided by horizontal run is a ratio; multiply by 100 for percent slope. Keep both distances in compatible units.',
      ],
      [
        'Compare land cover',
        'Compare images from similar seasons before concluding that vegetation has disappeared. Use color, texture, shape, and surrounding features to distinguish fields, water, forest, and built areas. Division B emphasizes map measurements and interpretation; numerical NDVI and EVI formulas are not listed in the supplied B equation scope.',
      ],
    ],
    terms: [
      ['Scale', 'Map distance compared with ground distance.'],
      ['Contour', 'Line connecting equal elevations.'],
      ['Gradient', 'Vertical change divided by horizontal distance.'],
      ['Legend', 'Key explaining map symbols or colors.'],
    ],
    observations: [
      ['Scale', '1 cm represents 500 m.'],
      ['Map distance', 'Two sites are 4 cm apart.'],
      ['Elevation', 'They differ by 100 m.'],
    ],
    question: 'What is the average percent slope between these sites?',
    answer: '5%',
    alternatives: ['25%', '50%', '500%'],
    steps: [
      'Convert the horizontal distance: 4 × 500 = 2,000 m.',
      'Divide rise by run: 100/2,000 = 0.05.',
      'Multiply by 100 to obtain 5%.',
    ],
  },
  'remote-u7-l1': {
    title: 'Light, temperature, and radar distance',
    sections: [
      [
        'Wavelength and frequency',
        'Light travels at approximately 3 × 10⁸ m/s in a vacuum. The wave equation is c = wavelength × frequency. A longer wavelength means lower frequency at the same speed. Convert wavelengths to meters before calculating frequency in hertz.',
      ],
      [
        'Temperature from a peak',
        'Wien’s displacement law relates the wavelength of strongest thermal emission to absolute temperature: peak wavelength = b/T. Use Kelvin. If temperature doubles, the peak wavelength halves. This concerns the emission peak, not the brightness of every individual wavelength.',
      ],
      [
        'Radar timing',
        'A radar pulse travels to a target and returns. Range = speed × round-trip time / 2. The division by two matters because the time includes both journeys. A longer return time indicates a more distant reflecting surface under the same geometry.',
      ],
      [
        'Other interactions',
        'Reflection redirects light from a surface, absorption transfers its energy to matter, and scattering redirects it in many directions. Refraction changes direction across materials. Division B uses Snell’s law, inverse-square irradiance, and Stefan–Boltzmann behavior qualitatively; numerical work here is limited to the starred rules equations.',
      ],
    ],
    terms: [
      ['Wavelength', 'Distance between successive wave crests.'],
      ['Frequency', 'Cycles per second.'],
      ['Absorption', 'Transfer of radiation energy to matter.'],
      ['Radar range', 'Distance inferred from round-trip pulse travel time.'],
    ],
    observations: [
      ['Pulse speed', '300,000,000 m/s.'],
      ['Round-trip time', '0.004 s.'],
      ['Geometry', 'A pulse travels straight to the surface and back.'],
    ],
    question: 'What is the range to the surface?',
    answer: '600,000 m',
    alternatives: ['1,200,000 m', '300,000 m', '75,000,000,000 m'],
    steps: [
      'Multiply speed by time: 300,000,000 × 0.004 = 1,200,000 m.',
      'That distance includes the outward and return paths.',
      'Divide by two to obtain 600,000 m.',
    ],
  },
  'remote-u8-l1': {
    title: 'Albedo, surface temperature, and image comparisons',
    sections: [
      [
        'Reflected and emitted energy',
        'Albedo describes the fraction of incoming light a surface reflects. Thermal imagery measures emitted radiation rather than simply photographing visible brightness. A bright visible surface can be cool or warm; use the thermal scale to determine its apparent temperature.',
      ],
      [
        'Compare fairly',
        'Compare surfaces in the same scene or match time of day, season, and weather across scenes. Sun angle, moisture, shade, and surface material can all affect the pattern. A dark pavement and a shaded forest differ in more than color.',
      ],
      [
        'Use radiation qualitatively',
        'Warmer surfaces emit more thermal energy under comparable conditions. A more reflective surface absorbs less incoming sunlight when other factors are fixed. The B rules call for qualitative understanding of Stefan–Boltzmann behavior rather than fourth-power energy-balance calculations.',
      ],
      [
        'Evidence and limits',
        'A single hot pixel does not identify the cause of heating. Check the legend, surrounding land cover, cloud mask, and acquisition time. A land-surface temperature is not automatically the air temperature experienced by a person above that surface.',
      ],
    ],
    terms: [
      ['Albedo', 'Fraction of incoming radiation reflected.'],
      ['Thermal image', 'Image based on thermal radiation.'],
      ['Surface temperature', 'Temperature of the observed surface.'],
      ['Confounder', 'Another factor that can change a comparison.'],
    ],
    observations: [
      ['Pavement', 'Dark visible image; thermal scale indicates 42°C.'],
      ['Trees', 'Thermal scale indicates 28°C.'],
      ['Acquisition', 'Same cloud-free scene at the same time.'],
    ],
    question: 'Which statement is supported?',
    answer: 'The pavement surface is warmer in this observation',
    alternatives: [
      'Every dark surface is always warmer',
      'The air above the pavement must be 42°C',
      'Albedo alone proves the entire temperature difference',
    ],
    steps: [
      'Read the thermal scale rather than visible brightness.',
      'Compare 42°C with 28°C in the same scene.',
      'Report the observed surface difference without claiming one exclusive cause.',
    ],
  },
  'remote-u9-l1': {
    title: 'Land-cover change, hazards, and classification',
    sections: [
      [
        'Recognize change',
        'Flooding can expand dark water areas, fire can alter vegetation reflectance, and urban growth can replace irregular vegetation with roads and buildings. Compare before-and-after images with matching scales, season, and bands. Clouds and shadows can imitate real surface change.',
      ],
      [
        'Classify with examples',
        'Supervised classification learns from labeled examples such as known water, forest, and pavement. Unsupervised classification groups similar measurements first; people then interpret the groups. Neither method guarantees that every pixel is correctly labeled.',
      ],
      [
        'Choose useful data',
        'Landsat and Sentinel-2 support multispectral land-cover comparisons. Sentinel-1 radar can observe through clouds, though backscatter also depends on surface roughness and viewing geometry. SRTM provides elevation context for drainage and flood exposure. GOES provides frequent broad weather views.',
      ],
      [
        'Explain implications',
        'A map of reduced forest cover can guide questions about habitat loss or erosion, but it does not by itself establish who caused the change. Validate sample locations with independent evidence. Read NLCD class labels and change-map legends before counting areas. Report uncertain boundaries honestly.',
      ],
    ],
    terms: [
      ['Supervised classification', 'Assigning classes using labeled training examples.'],
      [
        'Unsupervised classification',
        'Grouping similar measurements before interpreting the groups.',
      ],
      ['Change detection', 'Comparing observations to identify differences over time.'],
      ['Validation', 'Checking predictions against independent evidence.'],
    ],
    observations: [
      ['Before', 'A field is mapped as vegetation.'],
      ['After', 'The field is dark in a cloudy optical image.'],
      ['Radar and ground report', 'Both support standing water at that location.'],
    ],
    question: 'Which interpretation has the strongest support?',
    answer: 'Flooding is supported by multiple independent observations',
    alternatives: [
      'A dark optical pixel alone proves flooding',
      'Clouds cannot affect optical observations',
      'A classification map never needs validation',
    ],
    steps: [
      'Recognize that optical darkness could be cloud shadow.',
      'Compare radar evidence and the ground report.',
      'Conclude flooding is supported where the observations agree.',
    ],
  },
  'therm-u6-l1': {
    title: 'Gas processes with graphs and simple algebra',
    sections: [
      [
        'Identify what stays fixed',
        'Isothermal means constant temperature; isobaric means constant pressure; isochoric means constant volume; adiabatic means no heat crosses the boundary. These statements describe different constraints. Insulation does not force temperature to remain constant.',
      ],
      [
        'Read a pressure-volume graph',
        'Put volume on the horizontal axis and pressure on the vertical axis. A constant-volume path is vertical and involves no expansion work. A constant-pressure path is horizontal. Expansion moves toward larger volume; compression toward smaller volume.',
      ],
      [
        'Calculate rectangular work',
        'At constant pressure, work done by the gas is pressure × change in volume. Use pascals and cubic meters to obtain joules. At 100,000 Pa, an expansion of 0.002 m³ does 200 J of work. For curved paths, interpret the shape qualitatively; no calculus is required by the B rules.',
      ],
      [
        'Connect to energy',
        'With work defined as done by the gas, change in internal energy = heat added − work done. An ideal gas expanding isothermally has unchanged internal energy, so heat added balances work. An adiabatic expansion can cool the gas because work leaves without heat entering.',
      ],
    ],
    terms: [
      ['Isothermal', 'Constant temperature.'],
      ['Isobaric', 'Constant pressure.'],
      ['Isochoric', 'Constant volume.'],
      ['Adiabatic', 'No heat transfer across the boundary.'],
    ],
    observations: [
      ['Pressure', '100,000 Pa, held constant.'],
      ['Volume change', 'An increase of 0.002 m³.'],
      ['Heat input', '300 J enters the gas.'],
    ],
    question: 'What is the internal-energy change?',
    answer: 'An increase of 100 J',
    alternatives: [
      'An increase of 500 J',
      'A decrease of 300 J',
      'No change because pressure is constant',
    ],
    steps: [
      'Calculate work: 100,000 × 0.002 = 200 J.',
      'Use change in internal energy = heat added − work done.',
      'Subtract 300 − 200 = 100 J.',
    ],
  },
  'therm-u8-l1': {
    title: 'Energy direction and the second law',
    sections: [
      [
        'Conservation is not direction',
        'Energy is conserved when hot water warms a cooler cup. Conservation alone does not explain why heat flows that way. The second law describes the direction of spontaneous processes: heat flows from hotter to colder objects without external work.',
      ],
      [
        'System and surroundings',
        'Choose a boundary around the object you study. A refrigerator can cool its contents while warming the room, because electrical work is supplied and heat is released outside. Cooling one object does not mean the total entropy of object plus surroundings decreases.',
      ],
      [
        'Entropy without calculus',
        'Entropy describes how energy is distributed among possible microscopic arrangements. For an isolated combined system, total entropy cannot decrease. A reversible process is an ideal limiting process with no total entropy production. Friction and heat transfer across a finite temperature difference make real processes irreversible.',
      ],
      [
        'Reason about devices',
        'A heat engine takes in heat, converts part into work, and rejects the remainder. No cyclic engine operating between two reservoirs converts all input heat into work. Use energy balances, ratios, and qualitative reasoning for Division B; logarithmic gas-entropy calculations are unnecessary here.',
      ],
    ],
    terms: [
      ['System', 'The part of the world chosen for study.'],
      ['Surroundings', 'Everything outside the chosen system.'],
      ['Irreversible', 'Not restorable without a net change elsewhere.'],
      ['Heat engine', 'A device that converts part of heat input to work in a cycle.'],
    ],
    observations: [
      ['Heat input', 'An engine receives 500 J.'],
      ['Useful work', 'It delivers 150 J.'],
      ['Cycle', 'The working substance returns to its initial state.'],
    ],
    question: 'How much heat must this engine reject?',
    answer: '350 J',
    alternatives: ['650 J', '500 J', '0 J'],
    steps: [
      'A complete cycle has no net internal-energy change.',
      'Heat input equals work output plus heat rejected.',
      'Subtract 500 − 150 = 350 J.',
    ],
  },
  'bot-u7-l1': {
    title: 'Photosynthesis and plant energy',
    sections: [
      [
        'Inputs and products',
        'Photosynthesis uses light energy to help build sugars from carbon dioxide and water, releasing oxygen. Chloroplasts contain chlorophyll that absorbs light. Sugars supply material and chemical energy for growth; plants do not obtain most of their dry mass by absorbing soil.',
      ],
      [
        'Two connected stages',
        'Light-dependent reactions capture energy and release oxygen from water. Carbon-fixing reactions use that captured energy to build organic molecules from carbon dioxide. Learn the inputs, outputs, and connection before memorizing individual enzymes. Carbon fixation is not the same process as taking up mineral nutrients.',
      ],
      [
        'Plants also respire',
        'Plant cells use cellular respiration to release usable energy from organic molecules during both day and night. In the light, measured net carbon-dioxide uptake reflects photosynthesis minus respiratory release. In darkness, photosynthesis stops but respiration can continue.',
      ],
      [
        'Test a limiting factor',
        'Light, carbon dioxide, temperature, and water availability can limit photosynthesis. Increase one factor while holding the others steady. A rate that stops increasing can indicate that another factor has become limiting. Counting bubbles in an aquatic plant is an approximate indicator, because bubble sizes and dissolved gases vary.',
      ],
    ],
    terms: [
      ['Chloroplast', 'Plant cell structure where photosynthesis occurs.'],
      ['Chlorophyll', 'A pigment that absorbs light.'],
      ['Carbon fixation', 'Incorporation of inorganic carbon into organic molecules.'],
      ['Limiting factor', 'A condition restricting the rate of a process.'],
    ],
    observations: [
      ['Low light', '5 bubbles per minute.'],
      ['Medium light', '10 bubbles per minute.'],
      ['High light', '10 bubbles per minute at the same temperature and carbon-dioxide supply.'],
    ],
    question: 'What does the plateau suggest?',
    answer: 'Another factor may limit the rate at high light',
    alternatives: [
      'Plants do not respire',
      'Each bubble must have exactly the same volume',
      'Light never affects photosynthesis',
    ],
    steps: [
      'Compare low and medium light: the indicator increases.',
      'Compare medium and high light: the indicator stays constant.',
      'Test another limiting factor while keeping the method consistent.',
    ],
  },
  'water-u7-l1': {
    title: 'Calibrate a Division B salinometer',
    sections: [
      [
        'Use the right concentration',
        'The supplied B rules use 1–10% mass/volume saltwater. One percent mass/volume means 1 g of salt per 100 mL of final solution. It is not grams per 100 mL of starting water and is not the same quantity as grams per kilogram of solution.',
      ],
      [
        'Understand the float',
        'A floating hydrometer settles where the weight of displaced liquid balances its weight. Denser saltwater supports it with less displaced volume, so it floats higher. Keep the float upright and free from contact with the beaker walls or bottom.',
      ],
      [
        'Make calibration standards',
        'Prepare known concentrations across the whole test range and mark immersion depths at a consistent temperature. For 400 mL of 5% mass/volume solution, dissolve 20 g of salt and bring the final volume to 400 mL. Measure the final volume after dissolving.',
      ],
      [
        'Read an unknown',
        'Compare the unknown immersion with nearby calibration marks and estimate concentration to the nearest tenth of a percent. Recalibrate if float mass or temperature changes. The supplied rules require the device to operate in a standard 400–600 mL beaker with at least 400 mL of solution and Category C eye protection during testing.',
      ],
    ],
    terms: [
      ['Mass/volume percent', 'Grams of solute per 100 mL of final solution.'],
      ['Calibration', 'Relating readings to known reference values.'],
      ['Hydrometer', 'A float used to compare liquid density.'],
      ['Interpolation', 'Estimating between nearby known readings.'],
    ],
    observations: [
      ['4.0% standard', 'Immersion is 9.8 cm.'],
      ['6.0% standard', 'Immersion is 9.6 cm.'],
      ['Unknown', 'Immersion is 9.7 cm at the same temperature.'],
    ],
    question: 'What is a reasonable interpolated concentration?',
    answer: 'About 5.0% mass/volume',
    alternatives: ['About 50% mass/volume', 'Exactly 5 g/kg', 'About 0.5% mass/volume'],
    steps: [
      'The unknown lies halfway between the two nearby calibration depths.',
      'Estimate halfway between 4.0% and 6.0%.',
      'Report about 5.0% mass/volume; real calibration curves may not be perfectly linear.',
    ],
  },
};

export function adaptBLesson(original: Lesson): Lesson {
  const a = adaptations[original.id];
  if (!a) return { ...original };
  const id = `${original.id}-b`;
  return {
    id,
    unitId: original.unitId,
    title: a.title,
    kind: 'text',
    durationMin: 25,
    objectives: a.sections.map(([heading]) => heading),
    sections: a.sections.map(([heading, text]) => ({ heading, body: [text] })),
    keyTerms: a.terms.map(([term, definition]) => ({ term, definition })),
    workedExample: {
      title: 'Work through the evidence',
      problem: a.observations.map(([label, text]) => `${label}: ${text}`).join(' '),
      steps: a.steps,
      conclusion: a.answer,
    },
    simulation: {
      kind: 'investigation',
      title: a.title,
      instructions:
        'Reveal the observations, make a prediction, and explain your choice. These are synthetic teaching data.',
      observations: a.observations.map(([label, result]) => ({ label, result })),
      question: a.question,
      options: [...a.alternatives.slice(0, 1), a.answer, ...a.alternatives.slice(1)],
      correct: 1,
      explanation: a.steps.join(' '),
    },
    visual: {
      section: 1,
      title: 'Follow the evidence',
      steps: a.steps.map((detail, i) => ({ label: `Step ${i + 1}`, detail })),
      contrasts: a.terms.slice(0, 3).map(([label, mechanism]) => ({
        label,
        mechanism,
        limit: 'Apply this definition to the observations and conditions in this lesson.',
      })),
    },
    practice: [
      {
        id: `${id}-q1`,
        type: 'mcq',
        prompt: a.question,
        options: [a.alternatives[0], a.answer, ...a.alternatives.slice(1)],
        answer: a.answer,
        explanation: a.steps.join(' '),
      },
      {
        id: `${id}-q2`,
        type: 'short',
        prompt:
          'Explain the evidence supporting your answer, including the calculation or comparison.',
        answer: a.steps.join(' '),
        explanation:
          'Connect each step to the observations; an answer without evidence is incomplete.',
      },
      {
        id: `${id}-q3`,
        type: 'short',
        prompt: `Explain “${a.terms[0][0]}” in your own words.`,
        answer: a.terms[0][1],
        explanation: a.sections[0][1],
      },
    ],
  };
}

const scope: Record<string, string> = {
  'anatomy-and-physiology':
    'Study respiratory, digestive, and immune structure and function. The B manual separates additional disorders, treatments, and immune therapies into State/National topics; use its lists to plan your tournament preparation.',
  botany:
    'Focus on plant structures, transport, reproduction, photosynthesis, evolution, ecology, and useful plant products. Photosynthesis begins with inputs, outputs, and controlled observations.',
  'circuit-lab':
    'Use DC circuits, switches, diodes, logic, and meters. Kirchhoff network analysis is State/National material. Transistors, op-amps, capacitors, and sequential logic are excluded from the B course.',
  codebusters:
    'Use the cipher types and tournament-level restrictions listed in the B Rules; a cipher demonstration is a solving aid, not a claim that every cipher is tested at every level.',
  'disease-detectives':
    'Emphasize broad, basic reasoning from outbreak evidence. Bias, confounding, herd immunity, and vaccine effectiveness receive State/National treatment in the supplied B manual.',
  'dynamic-planet':
    'Study freshwater systems, maps, discharge, groundwater, and human impacts. Monitoring and interpretation are required preparation, including the final investigation unit.',
  'experimental-design':
    'Build a reproducible investigation and support its conclusion with tables, graphs, and repeated measurements. The report lesson is written for B rather than the C abstract syllabus.',
  'remote-sensing':
    'Observable Earth emphasizes image and map interpretation. Quantitative physics is limited to Wien’s law, the wave equation, and radar range; other listed physical laws are qualitative. Prioritize the satellites named in the B manual.',
  'rocks-and-minerals':
    'Use diagnostic evidence, formation processes, and the Division B official specimen list. Interpret observations before using advanced terminology.',
  thermodynamics:
    'Use arithmetic, simple algebra, and geometry. Gas processes and entropy are taught without calculus or logarithmic derivations. Blackbody radiation, Stefan–Boltzmann law, and the third law are State/National topics.',
  'water-quality':
    'Study marine and estuary ecology, reef identification, monitoring data, and a student-built salinometer. Emerging contaminants and ocean garbage patches are core B topics. Calibrate using 1–10% mass/volume standards.',
};

export function adaptBCourse(course: EventLessons): EventLessons {
  const originals =
    course.eventId === 'codebusters'
      ? [...course.lessons, { ...course.lessons[0], id: 'code-u8-l1', unitId: 'code-u8' }]
      : course.lessons;
  const lessons = originals
    .map(adaptBLesson)
    .filter(
      (lesson) =>
        // The final C circuit enrichment returns to excluded semiconductor devices.
        !(course.eventId === 'circuit-lab' && lesson.id === 'circ-u10-l1'),
    )
    .map((lesson) => ({
      ...lesson,
      ...(['dyn-u10-l1', 'remote-u10-l1', 'water-u9-l1'].includes(lesson.id)
        ? { extension: false }
        : {}),
    }));
  const byOriginal = new Map(
    originals.map((lesson) => [
      lesson.id,
      lessons.find((item) => item.id === lesson.id || item.id === `${lesson.id}-b`),
    ]),
  );
  const units =
    course.eventId === 'codebusters'
      ? [...course.units, { id: 'code-u8', title: '', description: '', lessonIds: ['code-u8-l1'] }]
      : course.units;
  return {
    ...course,
    division: 'B',
    syllabus: `2027 Division B: ${course.eventName}`,
    intro: `Division B study path. ${scope[course.eventId]} Open Rules for the full event and tournament-level requirements.`,
    references: [
      { title: `2027 ${course.eventName} B rules`, url: `/rules/2027/b/${course.eventId}.pdf` },
      ...course.references,
    ],
    lessons,
    units: units
      .map((unit) => {
        const members = unit.lessonIds.flatMap((id) =>
          byOriginal.get(id) ? [byOriginal.get(id)!] : [],
        );
        const changed = members.some((l) => l.id.endsWith('-b'));
        return {
          ...unit,
          ...(changed
            ? {
                title: members.map((l) => l.title).join(' · '),
                description: members.flatMap((l) => l.objectives).join(' '),
              }
            : {}),
          lessonIds: members.map((l) => l.id),
        };
      })
      .filter((unit) => unit.lessonIds.length > 0),
  };
}
