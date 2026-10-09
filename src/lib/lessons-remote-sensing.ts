import { buildCourse } from './lesson-course-builder.ts';

export const remoteSensingLessons = buildCourse({
  eventId: 'remote-sensing',
  eventName: 'Remote Sensing',
  prefix: 'remote',
  lab: 'remote',
  syllabus: 'SciConnect Syllabus Remote Sensing.pdf',
  intro:
    'Follow energy from a source through the atmosphere to a sensor, then turn calibrated pixels into defensible measurements. These ten units follow the supplied syllabus, including climate systems and the optional applications unit. Instrument examples teach principles rather than establish a current tournament topic list.',
  references: [
    {
      title: 'NASA Earthdata: What is remote sensing?',
      url: 'https://www.earthdata.nasa.gov/learn/backgrounders/remote-sensing',
    },
    {
      title: 'USGS: Landsat Enhanced Vegetation Index',
      url: 'https://www.usgs.gov/landsat-missions/landsat-enhanced-vegetation-index',
    },
  ],
  chapters: [
    {
      title: 'Remote sensing foundations and history',
      description: 'From aerial observation to calibrated satellite measurements.',
      objectives: [
        'Describe the source-target-sensor chain.',
        'Separate an observation from an inferred property.',
        'Explain why repeated calibrated measurements matter.',
      ],
      sections: [
        [
          'Observing without direct contact',
          'Remote sensing measures energy reflected, emitted, or scattered by a target without physically sampling that target at the measurement location. A satellite does not directly measure “forest health”; it records radiance in selected spectral bands. Processing and a physical or empirical model connect those measurements to vegetation properties. Keep the observation, intermediate product, and final interpretation separate. The same sensor signal can arise from different mixtures of surface materials, illumination, atmospheric conditions, and viewing geometry, making inference a constrained problem rather than automatic recognition.',
        ],
        [
          'The measurement chain',
          'Identify the energy source, atmospheric path, target interaction, sensor response, and processing steps. Sunlight can illuminate a surface, which reflects only part of the incoming spectrum; an optical sensor records a band-weighted response. A thermal sensor measures emitted radiation, while radar supplies its own microwave illumination. Clouds, aerosols, absorption, and scattering affect the path. Calibration converts detector counts into a physical quantity; atmospheric correction estimates surface reflectance. A visually attractive composite is not necessarily a quantitatively calibrated product suitable for comparing dates.',
        ],
        [
          'Historical development',
          'Aerial photography made systematic overhead mapping possible before satellite observing systems. Orbital instruments expanded coverage, repeatability, and wavelength access. Digital detectors and computational processing then enabled consistent time series, multi-band analysis, and large-area change detection. The important conceptual shift is from a single descriptive picture to a repeatable measurement system. Improvements in spatial detail are only one part of development: spectral sampling, revisit timing, radiometric sensitivity, and calibration stability can be equally important for a scientific question.',
        ],
        [
          'Scale and ground truth',
          'A pixel records a spatially integrated response over a ground area and sensor footprint. A ground sample is usually much smaller and may not represent that whole footprint. Compare field measurements collected near the image date and account for spatial variability. Ground truth is better understood as reference data with its own sampling and measurement uncertainty. If a field plot lies near a boundary, a mixed satellite pixel can disagree with the plot without either measurement being fabricated or necessarily erroneous.',
        ],
        [
          'Choosing an observable',
          'Begin with a specific question: detect a flood extent, estimate canopy cover, or monitor surface temperature. Identify which physical property would discriminate the alternatives and which wavelength or geometry measures it. Optical color can distinguish some land-cover classes but may fail beneath cloud cover. Thermal emission answers a different question from red reflectance. A strong study design describes required resolution, dates, calibration, reference samples, and validation before selecting an index or attractive image display.',
        ],
        [
          'Responsible interpretation',
          'Record product type, units, acquisition date, band definitions, and quality masks. A change in displayed brightness can reflect a new contrast stretch rather than a changed surface. Compare like products under comparable conditions and report what remains unresolved. In the teaching lab, red and near-infrared reflectances describe an idealized pixel; the vegetation index is a derived ratio, not a species diagnosis. Use that distinction when writing conclusions from real imagery so measurements are not assigned more specificity than the data support.',
        ],
      ],
      terms: [
        ['Radiance', 'Directional radiant energy measured by a sensor.'],
        ['Reflectance', 'Fraction of incident radiation reflected under stated conditions.'],
        ['Calibration', 'Conversion from detector response to a measurement scale.'],
        ['Footprint', 'Ground region contributing to a measurement.'],
      ],
      example: {
        problem:
          'An image becomes brighter after a display stretch, but its stored reflectance values are unchanged. Has surface reflectance increased?',
        steps: [
          'Identify stored measurement values separately from display colors.',
          'Confirm the stretch changes only how values are mapped to screen brightness.',
          'Compare calibrated values and acquisition conditions before claiming physical change.',
        ],
        conclusion: 'The display change alone supplies no evidence of a reflectance increase.',
      },
      mcq: [
        [
          'What does a sensor directly record in optical imaging?',
          'A band-dependent energy response',
          ['Tree species with certainty', 'Human land-use intent', 'A complete climate mechanism'],
          'Surface properties are inferred from a calibrated response.',
        ],
        [
          'Why can a field plot disagree with a pixel?',
          'They sample different spatial supports',
          [
            'Pixels have no ground area',
            'Field measurements are always exact',
            'Calibration removes all mixtures',
          ],
          'A footprint may contain multiple materials.',
        ],
        [
          'Which metadata is essential for date comparison?',
          'Product units and acquisition conditions',
          ['Only file name length', 'Only border color', 'Only display size'],
          'Comparable physical products are required.',
        ],
      ],
      written: [
        [
          'Trace an optical measurement chain.',
          'Sunlight → atmosphere → target reflection → atmosphere → sensor response → calibration/correction → interpreted product.',
        ],
        [
          'Distinguish calibration and display stretch.',
          'Calibration defines measurement values; a stretch maps those values to display brightness and need not change them.',
        ],
        [
          'Why start with a question rather than an index?',
          'The question determines the needed observable, wavelengths, resolution, dates, and validation; a convenient ratio may not discriminate the alternatives.',
        ],
        [
          'State a limitation of one vegetation-index pixel.',
          'It can mix surfaces and respond to atmosphere or illumination; its ratio alone does not identify a plant species or cause of stress.',
        ],
      ],
      flow: [
        ['Energy', 'Identify source and atmospheric path.'],
        ['Measurement', 'Record calibrated band response.'],
        ['Inference', 'Test a surface interpretation against reference evidence.'],
      ],
      compare: [
        ['Raw counts', 'Detector output', 'Not automatically reflectance.'],
        ['Calibrated product', 'Values with defined units', 'Quality and geometry still matter.'],
        ['Display composite', 'Maps bands to colors', 'Color is not a direct material label.'],
      ],
      challenge:
        'Change red and NIR reflectance separately. Describe which values are measurements and which output is derived.',
      takeaway:
        'Remote sensing connects energy measurements to hypotheses through explicit processing and validation.',
    },
    {
      title: 'Sensors, radar, lidar, and illumination',
      description: 'Active/passive systems and what different instruments measure.',
      objectives: [
        'Distinguish active from passive sensing.',
        'Compute a pulse range from round-trip time.',
        'Interpret backscatter without treating brightness as height.',
      ],
      sections: [
        [
          'Passive does not mean visible',
          'A passive sensor detects naturally available radiation. Reflected-sunlight sensors require suitable illumination, whereas thermal instruments can detect emitted radiation at night. The visible, near-infrared, shortwave-infrared, and thermal regions respond to different material properties. Identify whether the signal is reflected or emitted before interpreting brightness. A warm target can be bright thermally without looking bright in a visible photograph. Atmospheric transmission windows and detector bandpasses constrain what can be measured from orbit.',
        ],
        [
          'Active measurements',
          'An active system transmits energy and measures its return. Radar uses microwaves; lidar commonly uses laser pulses. Because the source timing is known, round-trip travel time can estimate range using d = ct/2 for light in the approximated path. The factor of two accounts for outward and return travel. Active sensing is not automatically immune to environmental effects: heavy precipitation, attenuation, geometry, and target properties can alter returns. Specify the signal, measurement, and assumptions rather than relying on the active/passive label alone.',
        ],
        [
          'Radar backscatter',
          'Radar brightness depends on wavelength, polarization, surface roughness relative to wavelength, dielectric properties, and geometry. Smooth water often reflects energy away from a side-looking antenna and appears dark, while some urban structures produce strong double-bounce returns. Vegetation and wet ground can scatter differently from dry bare soil. A bright radar pixel is not simply a high-elevation pixel. Distortion such as foreshortening, layover, and shadow depends on terrain and viewing direction; map interpretation requires that geometric context.',
        ],
        [
          'Lidar structure and returns',
          'A laser pulse can return from canopy tops, intermediate vegetation, and the ground. Differences between classified ground and canopy elevations support a canopy-height model. Multiple returns are observations along an illuminated footprint rather than a complete photograph of every leaf. Classification errors and gaps affect derived surfaces. Range is measured along the beam, so positioning and orientation are required to locate a three-dimensional point. Dense sampling can reveal structure but still requires careful calibration and reference comparisons.',
        ],
        [
          'Matching sensor to question',
          'For flood mapping under clouds, microwave radar may supply observations where visible imagery is blocked. For canopy height, lidar can provide vertical structure. For canopy spectral condition, calibrated optical bands may be useful. Combining instruments works best when their strengths answer complementary questions and their dates and footprints are aligned. More data are not automatically better if they describe incompatible times, scales, or measurement definitions. State which part of the interpretation each instrument independently supports.',
        ],
        [
          'A numerical range check',
          'If a pulse returns in 10 microseconds and c is approximated as 3 × 10⁸ m/s, the one-way range is 1500 m. Convert microseconds to seconds before multiplying and divide by two after computing round-trip distance. An error of one microsecond changes this idealized range by 150 m. Real systems require more precise timing, platform position, and atmospheric treatment. The arithmetic establishes the geometric principle; it does not make a coarse classroom timing measurement a survey-grade elevation.',
        ],
      ],
      terms: [
        ['Active sensor', 'Transmits energy and measures its return.'],
        ['Passive sensor', 'Detects naturally available radiation.'],
        ['Backscatter', 'Energy scattered back toward a sensor.'],
        ['Lidar', 'Laser-based ranging and structural measurement.'],
      ],
      example: {
        problem: 'A lidar pulse has round-trip time 8 microseconds. Use c = 3 × 10⁸ m/s.',
        steps: [
          'Convert 8 microseconds to 8 × 10⁻⁶ s.',
          'Round-trip distance is 2400 m.',
          'Divide by two to obtain one-way range 1200 m.',
        ],
        conclusion:
          'The idealized sensor-to-target range is 1200 m, not a ground elevation without platform geometry.',
      },
      mcq: [
        [
          'Which sensor is active?',
          'Radar',
          [
            'A reflected-sunlight camera',
            'A passive thermal radiometer',
            'A natural-light photograph',
          ],
          'Radar transmits illumination.',
        ],
        [
          'Why divide ct by two?',
          'The pulse travels outward and back',
          [
            'The target is half as bright',
            'There are two wavelength bands',
            'Pixels have two dimensions',
          ],
          'Travel time is round-trip.',
        ],
        [
          'What does a bright radar pixel necessarily indicate?',
          'A strong recorded return',
          ['A high mountain', 'A hot surface', 'A green forest'],
          'Several target and geometry properties affect backscatter.',
        ],
      ],
      written: [
        ['Compute range for 10 microseconds.', '3 × 10⁸ × 10 × 10⁻⁶ / 2 = 1500 m.'],
        [
          'Can a passive thermal sensor work at night?',
          'Yes. It detects naturally emitted thermal radiation rather than requiring reflected sunlight.',
        ],
        [
          'How can lidar estimate canopy height?',
          'Compare vegetation-return elevations with a classified ground surface, accounting for position, sampling, and classification uncertainty.',
        ],
        [
          'Why combine optical and radar cautiously?',
          'They measure different responses and may differ in date, footprint, and geometry; align them and state which evidence each supplies.',
        ],
      ],
      flow: [
        ['Transmit or receive', 'Identify illumination and wavelength.'],
        ['Interact', 'Target and geometry determine the response.'],
        ['Measure', 'Convert return timing or intensity to a stated product.'],
      ],
      compare: [
        ['Optical reflection', 'Spectral surface response', 'Cloud and illumination limitations.'],
        ['Radar', 'Microwave backscatter', 'Roughness and geometry affect brightness.'],
        ['Lidar', 'Laser range and structure', 'Positioning and classification matter.'],
      ],
      challenge:
        'Use the lab’s pulse-time control to double the travel time. Predict the range change and explain the factor of two.',
      takeaway:
        'A sensor name does not specify a unique surface property; follow the physical measurement.',
    },
    {
      title: 'Satellite orbits and observing strategies',
      description: 'Coverage, revisit, swath, and mission tradeoffs.',
      objectives: [
        'Compare geostationary and polar observing geometry.',
        'Separate orbit repetition from usable revisit.',
        'Select a platform for a stated monitoring task.',
      ],
      sections: [
        [
          'Orbit as an observing constraint',
          'An orbit determines where and when a sensor can view Earth, while the instrument determines its swath and sampling. A near-polar low-Earth orbit can observe many latitudes as Earth rotates beneath it. A geostationary satellite remains near one apparent longitude over the equator when its orbital period matches Earth’s rotation and the geometry is appropriate. These arrangements serve different questions. Orbit descriptions alone do not establish pixel size, calibration quality, or spectral bands; those belong to the complete observing system.',
        ],
        [
          'Sun-synchronous sampling',
          'A sun-synchronous orbit is arranged so observations occur near a consistent local solar time. Similar illumination helps compare scenes, but shadows, season, atmosphere, and surface changes still matter. Many land-observing satellites use this strategy for repeated imaging. A consistent local time does not mean continuous coverage of one location. Distinguish the orbit’s repeat cycle from the number of opportunities to see a target within overlapping swaths. State whether a quoted interval describes orbit repetition, acquisition opportunity, or cloud-free usable imagery.',
        ],
        [
          'Geostationary tradeoffs',
          'A geostationary platform can revisit a broad region frequently, making it useful for evolving weather systems. Its large distance and viewing geometry create different spatial-detail tradeoffs from lower-orbit systems. High-latitude regions are viewed obliquely and can be poorly covered or outside useful viewing geometry. A frequent image sequence can reveal motion and development that a single fine-resolution scene misses. Choose temporal sampling according to the process timescale rather than assuming that the sharpest image is always the most useful.',
        ],
        [
          'Mission examples and continuity',
          'Landsat illustrates long-term calibrated land observation; Sentinel missions illustrate complementary optical and radar capabilities; weather platforms illustrate frequent regional monitoring. These examples are mission families rather than a claim that every satellite has identical bands or revisit schedules. When joining records, inspect sensor differences and product definitions. A long time series can contain calibration changes or spatial-resolution differences that resemble a trend. Continuity requires documentation and, where needed, cross-sensor comparison rather than simple concatenation.',
        ],
        [
          'Swath and revisit',
          'A wide swath covers more ground in one pass but can involve different sampling or viewing tradeoffs. Constellations can increase observation opportunities by using multiple platforms. Clouds reduce usable optical observations, so the effective revisit can be much longer than the nominal schedule. For a short-lived flood, one missed date may remove the peak event entirely. A study should define the acceptable temporal gap and choose sensors whose actual quality-controlled observations meet it.',
        ],
        [
          'Designing a monitoring plan',
          'Start with target location, process duration, required detail, and necessary wavelength response. Monitoring a rapidly developing storm emphasizes temporal coverage; mapping small agricultural plots emphasizes spatial support and spectral response. Check whether the sensor footprint isolates the target and whether the dates sample the event rather than only its aftermath. Record acquisition opportunities and rejected observations as part of the analysis. Missing data are not automatically evidence that no change occurred; they are a limit on what was observed.',
        ],
      ],
      terms: [
        ['Swath', 'Ground width observed during a pass.'],
        ['Revisit', 'Interval between observations or opportunities, as defined.'],
        ['Sun-synchronous', 'Orbit maintaining approximately consistent local solar time.'],
        ['Geostationary', 'Orbit with an approximately fixed apparent equatorial position.'],
      ],
      example: {
        problem:
          'A satellite has four nominal acquisition opportunities in a month, but three are cloud-obscured. How many usable optical observations remain?',
        steps: [
          'Separate scheduled opportunities from quality-controlled observations.',
          'Reject the three cloud-obscured scenes for surface optical measurement.',
          'Retain one usable scene and report the temporal gap.',
        ],
        conclusion: 'Nominal revisit does not imply four usable measurements.',
      },
      mcq: [
        [
          'What is especially useful for tracking a fast-changing storm?',
          'Frequent temporal observations',
          ['A single sharp image only', 'A long orbit name', 'A larger file format'],
          'The observations must resolve the process in time.',
        ],
        [
          'Does sun-synchronous mean continuous observation?',
          'No',
          ['Yes, at every location', 'Only at the equator, continuously', 'It means no clouds'],
          'It concerns local solar-time geometry.',
        ],
        [
          'What reduces usable optical revisit?',
          'Cloud obstruction',
          ['Removing a display border', 'Renaming a band', 'Changing text labels'],
          'The surface signal can be unavailable.',
        ],
      ],
      written: [
        [
          'Distinguish swath and pixel size.',
          'Swath is coverage width; pixel size is sampling or ground support detail. They are related design tradeoffs but not the same quantity.',
        ],
        [
          'Why compare sensors before merging records?',
          'Bandpasses, calibration, geometry, and spatial support may differ and create artificial changes.',
        ],
        [
          'What does a missing cloudy scene establish?',
          'That the surface was not measured adequately in that optical observation, not that the surface did not change.',
        ],
        [
          'Choose a strategy for a brief flood.',
          'Use frequent quality-controlled acquisitions, consider radar under clouds, align geometry, and ensure dates bracket the peak rather than only the aftermath.',
        ],
      ],
      flow: [
        ['Question', 'Define location and process timescale.'],
        ['Orbit and sensor', 'Match coverage, swath, bands, and detail.'],
        ['Usable series', 'Apply quality checks and report gaps.'],
      ],
      compare: [
        ['Geostationary', 'Frequent regional views', 'Oblique high-latitude geometry.'],
        ['Near-polar', 'Broad latitude coverage over passes', 'Not continuous at one site.'],
        ['Nominal revisit', 'Scheduled opportunities', 'Cloud-free revisit can differ.'],
      ],
      challenge:
        'Change the mixed-pixel size while holding reflectance fixed. Explain why orbit choice and spatial sampling are separate decisions.',
      takeaway:
        'An observing plan must fit both where a process occurs and how quickly it changes.',
    },
    {
      title: 'Composites, spectral signatures, and contrast',
      description: 'Band assignment, true/false color, and comparable displays.',
      objectives: [
        'Explain RGB channel assignment.',
        'Interpret vegetation in false color.',
        'Distinguish display enhancement from calibration.',
      ],
      sections: [
        [
          'Bands become display channels',
          'A color composite assigns three measured bands to red, green, and blue screen channels. A true-color composite approximately matches visible red, green, and blue observations to the corresponding display channels. A false-color composite assigns other wavelengths, such as near-infrared, to visible channels. The colors are a code for the chosen band mapping, not intrinsic object colors. Always read the legend and band order before naming a land-cover class. The same scene can look very different under another valid assignment.',
        ],
        [
          'Vegetation signatures',
          'Healthy green leaves commonly absorb strongly in visible red for photosynthetic pigments and reflect more strongly in near-infrared because of leaf and canopy structure. A composite displaying NIR as red can therefore show vegetation in red tones. This pattern is useful but not a direct diagnosis of plant health or species. Soil exposure, canopy density, moisture, illumination, and atmosphere can alter the response. Read several bands together and validate the interpretation rather than assigning every red false-color pixel to one vegetation class.',
        ],
        [
          'Water and built surfaces',
          'Water commonly has low near-infrared reflectance, but suspended sediment, depth, glint, and mixed shoreline pixels affect its signature. Built surfaces are diverse: roofs, asphalt, concrete, and shadows need not share a single spectral response. A dark pixel could represent water, shadow, or another low-response surface in the selected bands. Use spatial context, texture, shape, and alternative wavelength combinations to distinguish candidates. A signature is evidence conditioned on acquisition geometry and processing, not an infallible label.',
        ],
        [
          'Stretching and enhancement',
          'A linear stretch maps a chosen range of band values to the display range. Histogram-based enhancements redistribute visual contrast and can reveal subtle variation. If two dates are stretched independently, the same display color may represent different physical reflectance values. Compare calibrated values or use a consistent display scale when visual comparison is important. Sharpening and contrast adjustments cannot create information absent from the measurements, and they may emphasize noise or boundary artifacts. Document enhancements so another viewer can reconstruct the interpretation.',
        ],
        [
          'Merging and registration',
          'Combining images requires spatial registration so corresponding pixels represent the same ground locations. A small misalignment can create apparent change along roads, rivers, and field edges. Pan-sharpening combines finer spatial information with multispectral data but can alter spectral relationships. A visually sharper image is not automatically better for quantitative band-ratio calculations. Choose a method appropriate to the final product, and compare derived values against the original calibrated data if the processing changes spatial or spectral content.',
        ],
        [
          'A defensible composite explanation',
          'Describe the channel assignment first, then the observed colors and context, then the physical interpretation. For example, “NIR is displayed red; the field is bright in that channel and dark in measured red, consistent with a vegetation-rich pixel.” State alternatives and quality limits. In the lab, changing red and NIR values changes both the spectral bars and the derived ratio, while switching a display assignment changes the visual coding. These operations answer different questions and should be described separately.',
        ],
      ],
      terms: [
        ['Composite', 'Multiple bands assigned to display channels.'],
        ['False color', 'Display assignment differing from ordinary visible color.'],
        ['Registration', 'Alignment of images to common ground locations.'],
        ['Stretch', 'Mapping measurement values into a display range.'],
      ],
      example: {
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
      mcq: [
        [
          'What determines false-color appearance?',
          'Band-to-channel assignment',
          ['Only the object name', 'Only sensor altitude', 'Only file compression'],
          'Channel mapping defines color meaning.',
        ],
        [
          'Independent stretches can make date comparisons misleading because…',
          'Equal colors may represent unequal values',
          [
            'All stored values are erased',
            'NIR becomes visible light physically',
            'Registration is no longer needed',
          ],
          'Display coding can change between dates.',
        ],
        [
          'What can misregistration imitate?',
          'Boundary change',
          ['A new wavelength band', 'Perfect calibration', 'A known species'],
          'Shifted edges can create false differences.',
        ],
      ],
      written: [
        [
          'Why might vegetation appear red?',
          'A high NIR response is assigned to the red display channel in the chosen false-color composite.',
        ],
        [
          'Give two alternatives for a dark NIR pixel.',
          'Water and shadow are possible; use context and additional bands to distinguish them.',
        ],
        [
          'Why inspect pan-sharpening before a ratio calculation?',
          'It can change spectral relationships, so visual improvement does not guarantee quantitative equivalence.',
        ],
        [
          'Write a cautious field interpretation.',
          'High NIR and low red are consistent with a vegetation-rich pixel; species or stress cause needs additional evidence and quality checks.',
        ],
      ],
      flow: [
        ['Measure', 'Obtain calibrated bands.'],
        ['Assign', 'Map selected bands to RGB channels.'],
        ['Interpret', 'Use the legend, signatures, and context.'],
      ],
      compare: [
        [
          'True color',
          'Visible bands in approximate natural order',
          'Still depends on enhancement.',
        ],
        ['False color', 'Other bands mapped into visible channels', 'Read band order first.'],
        ['Contrast stretch', 'Changes visual separation', 'Does not prove physical change.'],
      ],
      challenge:
        'Switch the lab between true-color-like and NIR-red displays. Explain a color change without claiming the surface changed.',
      takeaway: 'Color meaning comes from the channel assignment and measurement context.',
    },
    {
      title: 'Spatial, spectral, temporal, and radiometric resolution',
      description: 'Mixed pixels, detectable differences, and enhancement limits.',
      objectives: [
        'Distinguish four resolution types.',
        'Compute pixel area and mixtures.',
        'Explain why interpolation cannot recover missing detail.',
      ],
      sections: [
        [
          'Spatial support',
          'Spatial resolution concerns the ground detail a system can distinguish, while pixel spacing describes sampling. They are related but not always identical because optics, motion, and resampling affect the footprint. A 30 m by 30 m pixel covers 900 m², not 30 m². A narrow stream may influence a pixel without occupying a full pixel. Boundary pixels integrate multiple surfaces, so a class assigned to one pixel can conceal substantial subpixel variation. Inspect the scale of the target before applying a categorical interpretation.',
        ],
        [
          'Spectral resolution',
          'Spectral resolution describes how finely the spectrum is sampled and distinguished. A few broad bands provide different information from many narrow bands. More bands can help distinguish materials with subtle absorption features, but signal-to-noise, calibration, and atmospheric transmission still matter. Band count alone does not establish useful spectral resolution: bandwidth and placement are essential. A sensor with excellent spatial detail but no relevant wavelengths may fail a material-identification task that a coarser spectral instrument can support.',
        ],
        [
          'Temporal resolution',
          'Temporal sampling describes how often observations are available. A daily series can follow rapid change, while sparse dates may miss peaks and confuse seasonal variation with disturbance. Quality filtering can reduce usable sampling. State the observed interval and actual gaps rather than quoting only a platform’s nominal schedule. Match temporal resolution to the process: a slow land-cover transition and a short-lived smoke plume require different observing strategies. Multiple dates also help distinguish temporary conditions from persistent changes.',
        ],
        [
          'Radiometric discrimination',
          'Radiometric resolution concerns the ability to distinguish signal levels, often described by digitization depth. An ideal 8-bit encoding has 256 possible levels and a 12-bit encoding has 4096. More encoded levels do not guarantee accurate measurements; detector noise and calibration may dominate. Specify the physical range mapped to those levels. A small stored difference may be below effective measurement precision, so avoid interpreting every one-count change as a meaningful environmental difference.',
        ],
        [
          'Mixed-pixel arithmetic',
          'Under a simplified linear mixture, pixel reflectance is the area-weighted mean of component reflectances in each band. A half-vegetation, half-soil pixel with vegetation NIR 0.6 and soil NIR 0.3 has NIR 0.45. Compute red in the same way, then calculate an index from the mixed bands. The index of the average bands generally differs from the average of component indices because a ratio is nonlinear. Real mixtures can violate linear assumptions through shadows, adjacency, and multiple scattering.',
        ],
        [
          'Choosing and enhancing data',
          'A useful resolution is the one that supports the question with tolerable uncertainty. Interpolating a coarse raster to finer pixels makes a smoother display but does not add new independent ground measurements. Upsampling is not equivalent to a sharper sensor. Conversely, aggregation can reduce some noise while mixing classes and hiding small features. Document resampling methods and keep the original support in mind when reporting area or change. A visually detailed product can still lack the information needed for a specific inference.',
        ],
      ],
      terms: [
        ['Spatial resolution', 'Distinguishable ground detail or effective support.'],
        ['Spectral resolution', 'Discrimination among wavelength intervals.'],
        ['Radiometric resolution', 'Discrimination among signal levels.'],
        ['Mixed pixel', 'A footprint containing multiple surface components.'],
      ],
      example: {
        problem: 'Vegetation is NIR 0.6, red 0.1; soil is NIR 0.3, red 0.2. Mix equal areas.',
        steps: [
          'Mixed NIR = 0.5 × 0.6 + 0.5 × 0.3 = 0.45.',
          'Mixed red = 0.5 × 0.1 + 0.5 × 0.2 = 0.15.',
          'NDVI = (0.45 − 0.15)/(0.45 + 0.15) = 0.5.',
        ],
        conclusion:
          'Calculate the ratio after mixing the measured bands; do not assume indices average linearly.',
      },
      mcq: [
        [
          'Area of a square 30 m pixel?',
          '900 m²',
          ['30 m²', '60 m²', '300 m²'],
          'Area is side squared.',
        ],
        ['How many ideal 8-bit levels exist?', '256', ['8', '64', '4096'], '2⁸ = 256.'],
        [
          'What does upsampling guarantee?',
          'More display samples',
          [
            'More independent ground observations',
            'A new spectral band',
            'Elimination of mixed pixels',
          ],
          'Interpolation does not create measured detail.',
        ],
      ],
      written: [
        ['Compute mixed NIR in the example.', '0.45 from equal weighting of 0.6 and 0.3.'],
        [
          'Why not average component NDVI values?',
          'The ratio is nonlinear; mix band reflectances first under the stated model, then calculate the index.',
        ],
        [
          'Distinguish spectral and radiometric resolution.',
          'Spectral concerns wavelength discrimination; radiometric concerns signal-level discrimination within measurements.',
        ],
        [
          'How should a narrow river in coarse imagery be described?',
          'It may occupy subpixel fractions and mixed boundary pixels; pixel labels and width estimates require scale-aware uncertainty.',
        ],
      ],
      flow: [
        ['Scale', 'Compare target size with measurement support.'],
        ['Mix', 'Weight component reflectances per band.'],
        ['Derive', 'Compute ratios and report limits.'],
      ],
      compare: [
        ['Fine spacing', 'More raster sample locations', 'Not necessarily independent detail.'],
        ['Narrow bands', 'More spectral discrimination', 'May trade off signal strength.'],
        ['More bit depth', 'More encoded levels', 'Not automatic measurement accuracy.'],
      ],
      challenge:
        'Vary vegetation fraction from 0 to 1. Compare the mixed reflectance bars and nonlinear NDVI response.',
      takeaway:
        'Resolution has several dimensions; a ratio inherits the footprint and quality of its input bands.',
    },
    {
      title: 'Map reading, coordinates, NDVI, and EVI',
      description: 'Scale, geolocation, band-ratio calculations, and units.',
      objectives: [
        'Calculate map distances and pixel areas.',
        'Interpret coordinate order and projection.',
        'Compute NDVI and EVI with valid inputs.',
      ],
      sections: [
        [
          'Coordinates and reference systems',
          'A coordinate pair is meaningful only with its reference system, units, axis order, and datum. Latitude/longitude are angular coordinates; projected coordinates may use metres. Do not subtract degrees and report the result as a ground distance without an appropriate conversion or geodesic method. On a map, read north direction, scale, and legend before interpreting shapes. A raster row-column index identifies an array location, not a geographic position until its spatial transform and reference system are applied.',
        ],
        [
          'Scale and area calculations',
          'At scale 1:50,000, one centimetre represents 50,000 cm = 500 m. Three centimetres represents 1.5 km if the stated scale applies. For a square 10 m pixel, area is 100 m²; 100 such full pixels cover 10,000 m² = 1 hectare. Boundary mixtures and classification error can make a simple count an estimate rather than an exact surveyed area. Projection distortion and resampling also matter for large or irregular regions. Show unit conversions explicitly to avoid linear-versus-area errors.',
        ],
        [
          'NDVI from reflectance',
          'NDVI = (NIR − red)/(NIR + red). With nonnegative inputs and a positive denominator, its range is −1 to +1. Higher values often indicate stronger red/NIR contrast associated with green vegetation, but there is no universal threshold that identifies health or species in every scene. If both inputs are zero, the ratio is undefined. Use compatible calibrated reflectances and quality masks. Clouds, snow, water, soil exposure, and sensor differences can influence the value and must be considered before interpreting change.',
        ],
        [
          'EVI and scaling',
          'A common EVI form is 2.5(NIR − red)/(NIR + 6red − 7.5blue + 1), using reflectance fractions and the defined coefficients. The blue term and background adjustment distinguish it from NDVI. The additive 1 means that using scaled integer reflectances without converting or adjusting scaling changes the result. Check product documentation for band definitions and scale factors. A near-zero denominator or implausible output should trigger quality review rather than automatic interpretation. EVI is not guaranteed to lie in the NDVI range.',
        ],
        [
          'Comparing indices properly',
          'Calculate each index using the same target support, acquisition date, and valid band definitions. NDVI and EVI emphasize related but not identical information. Agreement can strengthen a description of spectral change but does not prove a biological cause. Validate a trend with independent observations where possible. Distinguish an index difference from percentage change: an increase from 0.2 to 0.4 is a difference of 0.2 index units and a relative increase of 100 percent, but those descriptions answer different questions.',
        ],
        [
          'A complete calculation response',
          'State the equation, substitute values with their scaling, evaluate numerator and denominator separately, and interpret the dimensionless result. Include a validity check and one limitation. For map measurements, retain units at every step and describe whether the result is length or area. When using a plotted coordinate grid, do not infer precision finer than the grid or image support. The lab deliberately separates mixed reflectances, computed indices, and display colors to make these reasoning stages visible.',
        ],
      ],
      terms: [
        ['NDVI', 'Normalized red/NIR reflectance contrast.'],
        ['EVI', 'Vegetation index with background and blue-band adjustment.'],
        ['Datum', 'Reference framework underlying coordinates.'],
        ['Scale factor', 'Conversion from stored values to physical units.'],
      ],
      example: {
        problem: 'NIR = 0.6, red = 0.2, blue = 0.1. Calculate NDVI and EVI.',
        steps: [
          'NDVI = 0.4/0.8 = 0.5.',
          'EVI denominator = 0.6 + 1.2 − 0.75 + 1 = 2.05.',
          'EVI = 2.5 × 0.4 / 2.05 ≈ 0.488.',
        ],
        conclusion:
          'Both are dimensionless derived indices; neither uniquely establishes a plant-health diagnosis.',
      },
      mcq: [
        [
          'NDVI for NIR 0.6 and red 0.2?',
          '0.5',
          ['0.4', '2', '0.8'],
          'Difference 0.4 divided by sum 0.8.',
        ],
        [
          'What if red and NIR are both zero?',
          'NDVI is undefined',
          ['NDVI is automatically 1', 'NDVI proves bare soil', 'NDVI is −1'],
          'The denominator is zero.',
        ],
        [
          'Why does EVI require careful input scaling?',
          'Its denominator includes an additive constant',
          ['It uses no bands', 'All units cancel regardless of offsets', 'Blue is always zero'],
          'Multiplying band values alone changes the role of the constant.',
        ],
      ],
      written: [
        ['At 1:50,000, convert 3 cm to km.', '3 × 50,000 cm = 150,000 cm = 1.5 km.'],
        ['Compute EVI for the example.', '2.5 × 0.4 / 2.05 ≈ 0.488 with reflectance fractions.'],
        [
          'Why is a latitude difference not directly metres?',
          'Latitude is angular; conversion depends on the geographic method, and longitude scale also depends on latitude.',
        ],
        [
          'State an appropriate conclusion for NDVI 0.5.',
          'The pixel has positive red/NIR contrast consistent with vegetation under the stated conditions; class, health, and cause require further evidence.',
        ],
      ],
      flow: [
        ['Validate', 'Check units, coordinates, scale factors, and masks.'],
        ['Calculate', 'Apply the equation to compatible bands.'],
        ['Interpret', 'Report index meaning and uncertainty.'],
      ],
      compare: [
        ['Map length', 'Linear distance with units', 'Do not confuse with area.'],
        ['NDVI', 'Normalized red/NIR contrast', 'Undefined if the sum is zero.'],
        ['EVI', 'Adjusted multi-band ratio', 'Scaling and denominator matter.'],
      ],
      challenge:
        'Reproduce NDVI 0.5, then change blue alone. Predict which index can change and explain why.',
      takeaway: 'Correct arithmetic begins with valid units and band definitions.',
    },
    {
      title: 'Electromagnetic properties and light interactions',
      description: 'Wavelength, frequency, reflection, refraction, and absorption.',
      objectives: [
        'Relate wavelength and frequency.',
        'Apply Snell’s law with an explicit angle convention.',
        'Separate reflection, absorption, transmission, and emission.',
      ],
      sections: [
        [
          'Wave relationships',
          'In vacuum, c = wavelength × frequency. Longer wavelength therefore corresponds to lower frequency. Photon energy E = hf increases with frequency and decreases with wavelength. Keep units consistent: 500 nm is 5 × 10⁻⁷ m. Different wavelength regimes interact with matter differently, explaining why microwave, visible, and thermal sensors reveal different features. Frequency remains continuous across a stationary boundary while speed and wavelength change with the medium; do not assume all wave quantities change together.',
        ],
        [
          'Partitioning incoming energy',
          'Incident radiation can be reflected, absorbed, or transmitted. Under an idealized energy balance for a specified wavelength and geometry, the corresponding fractions sum to 1. Absorbed energy can contribute to heating or other processes; emission is a separate temperature- and material-dependent response. A material can reflect strongly at one wavelength and absorb strongly at another. Spectral signatures therefore carry more information than a single brightness value. Specify the wavelength region whenever describing a surface as bright or dark.',
        ],
        [
          'Reflection and scattering',
          'Specular reflection concentrates energy near a mirror-like direction, whereas diffuse scattering spreads it more broadly. Surface roughness must be considered relative to wavelength, so the same physical surface can behave differently for visible light and microwaves. Viewing and illumination angles affect recorded radiance. Sun glint from water can produce a bright optical response even though water is commonly dark in NIR away from glint. A spectral inference should therefore include geometry and scene context rather than treating the target as direction-independent.',
        ],
        [
          'Snell’s law',
          'For refraction across a boundary, n1 sin(theta1) = n2 sin(theta2), with angles measured from the normal to the surface. Light entering a higher refractive index bends toward the normal. If a computed sine exceeds 1 when moving from higher to lower index, ordinary transmitted refraction is impossible under the simple ray model; total internal reflection occurs above the critical angle. Drawing the normal first prevents accidentally using angles measured from the surface, which produces a different numerical result.',
        ],
        [
          'Atmospheric effects',
          'Gases absorb in selected wavelength bands, while particles and molecules scatter radiation along the path. Shorter visible wavelengths can be scattered strongly by small particles, contributing to atmospheric haze and blue-sky appearance. Aerosols have more complex size-dependent behavior. A sensor records surface and atmospheric contributions together until processing separates them under a model. Atmospheric correction is therefore an inference with assumptions, not a perfect removal of every atmospheric effect. Quality flags and acquisition conditions remain important after correction.',
        ],
        [
          'Connecting physics to a scene',
          'When comparing land-cover signatures, ask which interaction causes the difference: pigment absorption, internal leaf scattering, moisture absorption, thermal emission, or radar geometry. A physically grounded explanation identifies the relevant wavelength and process before proposing a class label. In the lab, spectral bars show measured reflectance fractions, while a ray diagram shows pulse geometry as a separate concept. Neither diagram represents every interaction in the atmosphere. State the simplification so an idealized equation is not mistaken for a complete scene model.',
        ],
      ],
      terms: [
        ['Wavelength', 'Distance between successive wave phases.'],
        ['Refractive index', 'Ratio relating light speed in vacuum and a medium.'],
        ['Normal', 'Line perpendicular to a boundary.'],
        ['Absorptance', 'Fraction of incident energy absorbed under stated conditions.'],
      ],
      example: {
        problem: 'Light enters from n1 = 1 to n2 = 1.5 at 30 degrees from the normal.',
        steps: [
          'sin(theta2) = (1/1.5) sin(30°) = 1/3.',
          'theta2 = arcsin(1/3) ≈ 19.5°.',
          'The smaller angle is toward the normal, consistent with the higher refractive index.',
        ],
        conclusion: 'The refracted angle is about 19.5 degrees from the normal.',
      },
      mcq: [
        [
          'If wavelength doubles in vacuum, frequency…',
          'Halves',
          ['Doubles', 'Stays fixed', 'Becomes zero'],
          'c remains fixed.',
        ],
        [
          'Snell angles are measured from…',
          'The normal',
          ['The surface', 'The north arrow', 'The satellite track'],
          'The normal is perpendicular to the interface.',
        ],
        [
          'Reflectance 0.3 and transmittance 0.2 imply absorptance…',
          '0.5',
          ['0.1', '1.5', '0.6'],
          'Fractions sum to 1 in the stated simple balance.',
        ],
      ],
      written: [
        ['Convert 500 nm to metres.', '5 × 10⁻⁷ m.'],
        [
          'Calculate the example’s refracted angle.',
          'arcsin[(1/1.5) × 0.5] ≈ 19.5° from the normal.',
        ],
        [
          'Why can a water pixel be bright?',
          'Glint, sediment, mixtures, or selected wavelength response can increase brightness; context and geometry matter.',
        ],
        [
          'Why does correction retain uncertainty?',
          'The atmosphere and surface contributions are separated using imperfect measurements and assumptions; correction is not complete knowledge of every path effect.',
        ],
      ],
      flow: [
        ['Spectrum', 'Identify wavelength and energy relationships.'],
        ['Interaction', 'Track reflection, absorption, transmission, or emission.'],
        ['Detection', 'Account for geometry and atmospheric path.'],
      ],
      compare: [
        ['Reflection', 'Redirects incident radiation', 'Can be strongly directional.'],
        ['Absorption', 'Transfers energy into the material', 'Varies with wavelength.'],
        ['Refraction', 'Changes propagation direction across media', 'Angles use the normal.'],
      ],
      challenge:
        'Compare the red and NIR responses of the same mixed pixel. Explain why one brightness description is insufficient.',
      takeaway:
        'A remote-sensing interpretation should name the wavelength, interaction, and geometry.',
    },
    {
      title: 'Albedo and climate energy balance',
      description: 'Shortwave reflection, longwave emission, and warming versus dimming.',
      objectives: [
        'Compute absorbed solar energy in a simple model.',
        'Distinguish albedo and greenhouse effects.',
        'Separate weather variability from climate inference.',
      ],
      sections: [
        [
          'Albedo as a fraction',
          'Albedo is the fraction of incident shortwave radiation reflected by a surface or planetary system under defined conditions. Fresh snow often has high albedo; dark water or some soils can have lower values, with geometry and spectrum affecting exact measurements. Absorbed shortwave energy is incoming energy multiplied by 1 − albedo. A larger albedo reduces absorption when incoming energy is held fixed. Albedo alone does not determine temperature because emission, atmospheric exchange, heat storage, and transport also matter.',
        ],
        [
          'A planetary average',
          'For a spherical Earth receiving sunlight, the intercepted solar power is distributed over four times the cross-sectional area when forming a whole-surface average. A simple average incoming flux is S/4, where S is the solar irradiance at Earth’s distance. Absorbed average shortwave flux is S(1 − alpha)/4. This geometric model is useful for reasoning about changes but does not describe local noon conditions, seasons, clouds, or heat transport. State whether a number is local instantaneous flux or a planetary average.',
        ],
        [
          'Longwave emission and the greenhouse effect',
          'Surfaces emit thermal radiation, and the atmosphere absorbs and emits within parts of the thermal spectrum. Changes in greenhouse-gas concentrations can alter the balance between absorbed solar energy and outgoing thermal energy. This mechanism differs from changing shortwave reflectivity. An infrared observation can describe emitted radiance, but retrieving temperature also requires assumptions about emissivity and atmospheric conditions. A single hot image does not establish a long-term climate trend or uniquely identify the cause of warming.',
        ],
        [
          'Dimming and competing influences',
          'Aerosols and clouds can reduce solar radiation reaching a surface through scattering or absorption, sometimes described as dimming. Absorbing aerosols can heat parts of the atmosphere while reducing surface sunlight, so “less sunlight at the ground” does not imply every layer cools equally. Cloud changes influence both shortwave reflection and longwave exchange. When two processes act simultaneously, analyze their energy pathways separately before deciding the net effect. Observations at multiple wavelengths and locations help constrain the explanation.',
        ],
        [
          'Weather and climate scales',
          'Weather describes short-term atmospheric conditions; climate concerns distributions and patterns over longer periods. Remote sensing provides broad spatial coverage, but temporal sampling, calibration continuity, and natural variability affect trend estimates. Compare many observations with consistent processing rather than selecting two convenient images. A regional anomaly can coexist with a different global pattern. The syllabus’s meteorological enrichment is useful context, but a full climate attribution analysis requires more than recognizing a cloud type or comparing one seasonal pair.',
        ],
        [
          'Testing a feedback explanation',
          'A feedback links an initial change to a process that amplifies or opposes it. If warming reduces reflective snow cover, more shortwave energy can be absorbed, contributing to further warming under comparable conditions. This is a positive feedback, not an independent proof of the original cause. State the direction at each step and distinguish feedback from forcing. The lab’s albedo energy bars hold incoming flux fixed, intentionally isolating one relationship rather than simulating the full coupled climate system.',
        ],
      ],
      terms: [
        ['Albedo', 'Fraction of incoming shortwave energy reflected.'],
        ['Flux', 'Energy transfer per area per time.'],
        ['Feedback', 'A response that amplifies or opposes an initial change.'],
        ['Emissivity', 'Efficiency of thermal emission relative to a blackbody.'],
      ],
      example: {
        problem: 'Incoming local shortwave flux is 400 W/m². Compare albedo 0.2 and 0.6.',
        steps: [
          'For 0.2, reflected flux is 80 and absorbed flux is 320 W/m².',
          'For 0.6, reflected flux is 240 and absorbed flux is 160 W/m².',
          'The absorption difference is 160 W/m² with all other factors held fixed.',
        ],
        conclusion:
          'Higher albedo halves absorbed shortwave flux in this example; temperature is not calculated by this balance alone.',
      },
      mcq: [
        [
          'Absorbed fraction for albedo 0.3?',
          '0.7',
          ['0.3', '1.3', '3.3'],
          'Absorbed fraction is 1 − alpha.',
        ],
        [
          'Which primarily describes longwave exchange?',
          'Greenhouse absorption and emission',
          ['Visible display stretching', 'Pixel interpolation', 'Map projection'],
          'Greenhouse processes concern thermal radiation exchange.',
        ],
        [
          'A single hot scene establishes…',
          'A short-term observation under its conditions',
          [
            'A complete climate attribution',
            'A global trend automatically',
            'A new solar constant',
          ],
          'Climate inference needs a consistent series and broader evidence.',
        ],
      ],
      written: [
        ['Calculate absorbed flux for 400 W/m² and alpha 0.6.', '400 × 0.4 = 160 W/m².'],
        [
          'Explain the factor of four in S/4.',
          'The spherical surface area is four times the intercepted disk area; this forms a whole-surface average.',
        ],
        [
          'Describe snow-albedo feedback.',
          'Warming can reduce reflective snow, lower albedo, increase absorbed shortwave energy, and amplify warming under comparable conditions.',
        ],
        [
          'Why is dimming not identical to uniform cooling?',
          'Scattering and absorption redistribute energy; absorbing particles can heat atmospheric layers while reducing surface sunlight.',
        ],
      ],
      flow: [
        ['Incoming', 'Specify local or planetary-average solar flux.'],
        ['Partition', 'Separate reflected and absorbed shortwave energy.'],
        ['Balance', 'Consider longwave exchange, storage, and transport.'],
      ],
      compare: [
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
      challenge:
        'Increase albedo while holding the incoming flux fixed. Predict both energy bars and explain why no temperature output is asserted.',
      takeaway:
        'Energy pathways must be distinguished before assigning a warming or cooling mechanism.',
    },
    {
      title: 'Climate systems, ozone, cycles, and geohazards',
      description: 'Linked Earth systems and multi-sensor evidence.',
      objectives: [
        'Connect water and carbon cycles to observables.',
        'Distinguish stratospheric ozone from greenhouse mechanisms.',
        'Interpret hazard maps with time and exposure context.',
      ],
      sections: [
        [
          'Linked reservoirs and flows',
          'The atmosphere, ocean, land, ice, and living organisms exchange matter and energy. A reservoir is a stored quantity; a flux is a transfer per unit time. Satellite observations can constrain parts of these exchanges, such as vegetation cover, cloud fields, sea-surface temperature, and ice extent. A map of one reservoir does not directly give the complete flux into or out of it. Interpret changes with mass balance and timescale in mind, especially when observations cover only one part of a coupled cycle.',
        ],
        [
          'The water cycle',
          'Evaporation, transpiration, condensation, precipitation, infiltration, runoff, and storage connect water across Earth systems. Different sensors observe different parts: clouds, precipitation-related returns, snow cover, or surface-water extent. A wet surface image is not a direct measure of groundwater storage. Temporal sequences help distinguish rainfall-driven flooding from persistent water bodies. Terrain and land-cover context affect runoff pathways. A defensible explanation combines observed water extent with timing and topography while acknowledging unobserved subsurface processes.',
        ],
        [
          'Carbon and vegetation',
          'Photosynthesis transfers carbon into organic matter, while respiration, decomposition, combustion, and ocean exchange return or redistribute it. Vegetation indices describe spectral canopy properties and can support ecosystem monitoring, but they are not direct measurements of total carbon storage or net carbon uptake. Biomass models require calibration, structural information, and ecological context. A high index can coexist with different biomass or respiration rates. Keep gross uptake, net exchange, and stored biomass distinct when connecting a green-looking scene to a carbon-cycle claim.',
        ],
        [
          'Ozone in context',
          'Stratospheric ozone absorbs substantial ultraviolet radiation and protects surface life from part of the solar UV spectrum. Ozone depletion and greenhouse-driven warming are different mechanisms, although atmospheric chemistry and climate interact. Tropospheric ozone is also an air-quality concern. A column-ozone observation integrates a vertical quantity and does not by itself specify concentration at ground level. Identify the atmospheric region, units, and retrieval assumptions before interpreting an ozone map or comparing it with a surface pollution measurement.',
        ],
        [
          'Hazard observation versus risk',
          'Remote sensing can map fire scars, flood extent, volcanic ash, landslide scars, and ground deformation. A hazard is a potentially damaging process; risk also depends on exposure and vulnerability. A flood map does not directly quantify expected losses without information about people, infrastructure, and susceptibility. Image timing matters: a post-event scene can miss the maximum inundation. Radar deformation measurements require careful geometry and coherence interpretation rather than reading every phase pattern as a unique displacement cause.',
        ],
        [
          'Building a multi-evidence explanation',
          'State what changed, where, when, and in which measurement. Compare before, during, and after observations where available and use independent reference information. A coincident change in vegetation and temperature may suggest a connection but does not establish its direction or exclude a third cause. Choose additional observations that discriminate alternatives. The lab’s mixed-pixel and albedo tools isolate simple relationships; use them to reason about mechanisms while keeping the coupled real-world system more complex than any one slider model.',
        ],
      ],
      terms: [
        ['Reservoir', 'Stored quantity in a system.'],
        ['Flux', 'Transfer rate between reservoirs.'],
        ['Hazard', 'Potentially damaging process.'],
        ['Risk', 'Potential harm involving hazard, exposure, and vulnerability.'],
      ],
      example: {
        problem:
          'A flood map shows 10 km² inundated, but no settlement or infrastructure data are provided. What can be concluded?',
        steps: [
          'Report the observed inundation extent and image date.',
          'Check whether the scene captured the peak and whether clouds or mixtures limit mapping.',
          'Request exposure and vulnerability information before estimating damage or risk.',
        ],
        conclusion:
          'Mapped hazard extent is evidence, but it is not a complete loss or risk estimate.',
      },
      mcq: [
        [
          'Which is a reservoir rather than a flux?',
          'Stored biomass carbon',
          ['Carbon uptake per day', 'Runoff per second', 'Emission per year'],
          'A reservoir is a stock.',
        ],
        [
          'Stratospheric ozone is especially associated with…',
          'UV absorption',
          [
            'A direct census of buildings',
            'Visible map scales',
            'A replacement for all greenhouse gases',
          ],
          'Its atmospheric position and absorption spectrum matter.',
        ],
        [
          'Flood extent alone gives…',
          'A mapped hazard observation',
          [
            'Exact economic loss',
            'Population vulnerability automatically',
            'A complete groundwater budget',
          ],
          'Risk requires exposure and vulnerability.',
        ],
      ],
      written: [
        [
          'Why is NDVI not total carbon storage?',
          'It measures a spectral contrast; biomass and carbon models require calibration, structure, and ecological context.',
        ],
        [
          'Name three water-cycle processes.',
          'Examples include evaporation, precipitation, infiltration, runoff, transpiration, and storage changes.',
        ],
        [
          'Distinguish column ozone from surface concentration.',
          'A column integrates ozone vertically; it does not directly specify near-ground concentration.',
        ],
        [
          'What additional evidence improves flood-risk analysis?',
          'Image timing and accuracy, terrain, exposed people and infrastructure, and vulnerability information.',
        ],
      ],
      flow: [
        ['Observe', 'Locate a measured environmental change in time and space.'],
        ['Connect', 'Link it to a reservoir, flux, or hazard mechanism.'],
        ['Evaluate', 'Add independent evidence and exposure context.'],
      ],
      compare: [
        ['Biomass', 'Stored organic material', 'Not equal to an index.'],
        [
          'Ozone column',
          'Vertically integrated atmospheric quantity',
          'Not surface concentration.',
        ],
        ['Hazard extent', 'Where a process was observed', 'Not total risk or damage.'],
      ],
      challenge:
        'Compare a vegetation-rich and soil-rich pixel at the same albedo. Explain why carbon storage and climate risk remain uncomputed.',
      takeaway:
        'A linked Earth-system explanation must distinguish measured proxies, physical quantities, and social consequences.',
    },
    {
      title: 'Applied image interpretation and agriculture',
      description: 'Optional field-monitoring workflow, validation, and change analysis.',
      extension: true,
      objectives: [
        'Design a field-scale comparison.',
        'Distinguish crop phenology from stress.',
        'Validate an interpretation using independent evidence.',
      ],
      sections: [
        [
          'Start with the decision',
          'An agricultural remote-sensing task might compare crop development, identify irrigation differences, or locate a disturbance. Define the decision and target scale before selecting an index. A field boundary should isolate the crop of interest while excluding roads, adjacent vegetation, and mixed edges where possible. Record acquisition dates relative to planting, management, rainfall, and harvest. Two fields with different planting dates can show different greenness without a difference in crop condition at the same developmental stage.',
        ],
        [
          'Phenology and time series',
          'Phenology describes seasonal biological development. An index can rise during canopy development and decline during senescence or harvest. Comparing one date with a different seasonal stage can imitate stress or recovery. Use a consistent time series and, where appropriate, compare similar developmental windows across years. Clouds and shadows can interrupt or distort the series. Interpolation between observations is an estimate rather than an actual measurement of a missed event; report gaps and smoothing choices rather than hiding them in a clean-looking curve.',
        ],
        [
          'Separating possible causes',
          'Low vegetation contrast can reflect sparse cover, exposed soil, water stress, nutrient limitation, disease, normal senescence, or measurement effects. The index does not uniquely select one cause. Additional bands, thermal observations, field inspection, weather records, and management history can discriminate alternatives. A good investigation asks what evidence would differ between the leading hypotheses. Avoid prescribing treatment from a single ratio; the lesson is about evidence interpretation, and the synthetic lab does not simulate a crop-specific diagnostic model.',
        ],
        [
          'Sampling and validation',
          'Select reference observations that span the variation of interest rather than only the easiest field locations. Keep validation data independent from the data used to choose thresholds or fit a model. Report class-specific errors when mapping categories, because an overall accuracy can conceal poor detection of a rare stressed class. Match field measurements to image timing and spatial support. Repeated measurements from the same tiny region may not represent independent samples of the whole farm.',
        ],
        [
          'Change detection',
          'Use comparable products, registration, masks, and units across dates. Compute changes from calibrated values rather than subtracting independently stretched display colors. A field-average index can hide a localized damaged patch, while a pixel-level difference can emphasize noise or boundary misalignment. Choose an aggregation scale appropriate to the question and show both the summary and its spatial distribution. State the baseline explicitly: a difference from last week, last year, and an untreated reference field are different comparisons.',
        ],
        [
          'Communicating a useful result',
          'A report should identify the measured product, dates, spatial support, observed change, uncertainty, and next discriminating observation. For example, a decline in NDVI with increasing bare-soil fraction suggests reduced canopy cover but does not establish its cause. The mixed-pixel lab demonstrates that a ratio can change simply because the footprint contains more soil. Explain that mechanism before making a biological claim. This optional unit extends the foundational course into applications while preserving the distinction between remote observations and validated field conclusions.',
        ],
      ],
      terms: [
        ['Phenology', 'Timing of seasonal biological development.'],
        ['Validation', 'Independent evaluation of a model or classification.'],
        ['Baseline', 'Reference against which change is described.'],
        ['Aggregation', 'Combining measurements over a larger support.'],
      ],
      example: {
        problem:
          'A field pixel changes from pure vegetation to 50% vegetation and 50% soil using NIR/red pairs (0.6,0.1) and (0.3,0.2).',
        steps: [
          'Initial NDVI = 0.5/0.7 ≈ 0.714.',
          'Mixed NIR/red = 0.45/0.15, so new NDVI = 0.5.',
          'The drop can arise from changed cover fraction alone; investigate field conditions before naming a stress cause.',
        ],
        conclusion: 'A lower ratio demonstrates a spectral change, not a unique diagnosis.',
      },
      mcq: [
        [
          'What can explain lower field NDVI without a unique disease diagnosis?',
          'Greater exposed-soil fraction',
          ['A renamed file only', 'A changed notebook font', 'A higher map title'],
          'Mixtures change band values.',
        ],
        [
          'Validation data should be…',
          'Independent of threshold fitting',
          [
            'The same selected examples only',
            'Chosen only where predictions are correct',
            'Discarded after fitting',
          ],
          'Independence tests generalization.',
        ],
        [
          'Why compare phenological stages?',
          'Development timing can mimic condition differences',
          [
            'All fields mature on one date',
            'Indices have no seasonal behavior',
            'Clouds never vary seasonally',
          ],
          'Seasonal development affects canopy response.',
        ],
      ],
      written: [
        ['Calculate the initial NDVI in the example.', '(0.6 − 0.1)/(0.6 + 0.1) = 5/7 ≈ 0.714.'],
        [
          'What additional data could distinguish drought from normal harvest?',
          'Field records, recent weather, crop stage, thermal or moisture observations, and direct field inspection.',
        ],
        [
          'Why can a field mean hide damage?',
          'A small affected patch can be averaged with a large unaffected area; inspect spatial distribution alongside the summary.',
        ],
        [
          'Write a cautious change statement.',
          'The calibrated pixel NDVI fell from about 0.714 to 0.5 under the stated mixture; altered cover fraction is one explanation, and cause requires independent evidence.',
        ],
      ],
      flow: [
        ['Design', 'Define target, baseline, dates, and support.'],
        ['Compare', 'Calculate quality-controlled spatial and temporal changes.'],
        ['Validate', 'Test causes with independent field evidence.'],
      ],
      compare: [
        ['Index decline', 'Observed spectral change', 'Several biological and measurement causes.'],
        ['Field average', 'Useful summary', 'Can hide small patches.'],
        [
          'Validation sample',
          'Tests prediction outside fitting',
          'Must represent relevant variation.',
        ],
      ],
      challenge:
        'Record trials at vegetation fractions 1, 0.5, and 0. Explain the trend and propose an observation that would distinguish cover loss from a sensor artifact.',
      takeaway:
        'Applications require a question, comparable observations, and independent validation rather than an index alone.',
    },
  ],
});
