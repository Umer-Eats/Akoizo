// Real photographs, satellite images and published diagrams used on presentation slides, served
// from public/presentations. Each was downloaded from Wikimedia Commons, English Wikipedia or the
// NASA Image and Video Library; `source` links the original page.

type Photo = {
  file: string;
  width: number;
  height: number;
  alt: string;
  /** What students are looking at, shown under the image. */
  caption: string;
  credit: string;
  source: string;
};

const commons = (name: string) => `https://commons.wikimedia.org/wiki/File:${name}`;
const nasa = (id: string) => `https://images.nasa.gov/details/${id}`;
const enwiki = (name: string) => `https://en.wikipedia.org/wiki/File:${name}`;

export const presentationPhotos = {
  'blue-marble-americas': {
    file: 'blue-marble-americas.jpg',
    width: 1000,
    height: 1000,
    alt: 'True-color satellite view of Earth centered on the Americas, with white cloud bands over blue ocean.',
    caption:
      'Earth assembled from months of MODIS observations: every pixel is measured, not seen in person.',
    credit: 'NASA Goddard / Reto Stöckl',
    source: commons('NASA_Earth_America_2002.jpg'),
  },
  'boston-1860': {
    file: 'boston-1860.jpg',
    width: 848,
    height: 1000,
    alt: 'Black-and-white 1860 aerial photograph of Boston rooftops and streets taken from a tethered balloon.',
    caption:
      'Boston from a tethered balloon, 1860: the oldest surviving aerial photograph in the United States.',
    credit: 'James Wallace Black',
    source: commons('Boston,_as_the_Eagle_and_the_Wild_Goose_See_It.jpg'),
  },
  'sentinel1-estonia': {
    file: 'sentinel1-estonia.jpg',
    width: 1200,
    height: 875,
    alt: 'Sentinel-1 radar image of Estonia: grey fields, dark smooth lakes, and bright magenta storm cells.',
    caption:
      'Sentinel-1 radar over Estonia: smooth lakes return little energy and look dark; heavy storm rain shows up in magenta.',
    credit: 'ESA Copernicus Sentinel-1 / Kaupo Voorma',
    source: commons(
      'Thunderstorms_over_Estonia_on_a_Copernicus_Sentinel-1_synthetic_aperture_radar_image.jpg',
    ),
  },
  'goes16-full-disk': {
    file: 'goes16-full-disk.jpg',
    width: 1002,
    height: 1000,
    alt: 'Full-disk image of the Western Hemisphere from the GOES-16 geostationary satellite.',
    caption:
      'GOES-16 sees this whole disk every few minutes from 35,786 km up, at the cost of coarse pixels.',
    credit: 'NOAA',
    source: commons('GOES-16_ABI_Full_Disk_(32440453126).jpg'),
  },
  'landsat9-launch': {
    file: 'landsat9-launch.jpg',
    width: 667,
    height: 1000,
    alt: 'An Atlas V rocket lifting off through fog at Vandenberg carrying the Landsat 9 satellite.',
    caption:
      'Landsat 9 launches in 2021, continuing a record of Earth’s land surface that began in 1972.',
    credit: 'NASA / Kim Shiflett',
    source: commons('Landsat_9_Live_Launch_Coverage_(KSC-20210927-PH-KLS02_0023).jpg'),
  },
  'landsat8-orbit': {
    file: 'landsat8-orbit.jpg',
    width: 1200,
    height: 676,
    alt: 'NASA rendering of the Landsat 8 satellite in orbit above Earth.',
    caption: 'Landsat 8 in its sun-synchronous orbit (NASA rendering).',
    credit: 'NASA Goddard Conceptual Image Lab',
    source: commons('Landsat_8_(LDCM)_Satellite_over_Earth.jpg'),
  },
  'dubai-false-color': {
    file: 'dubai-false-color.jpg',
    width: 1200,
    height: 919,
    alt: 'False-color Sentinel-2 image of Dubai: red vegetation, grey-blue city, dark water and bright sand.',
    caption:
      'Sentinel-2 false color over Dubai: vegetation glows red, water is dark, and built surfaces look grey-blue.',
    credit: 'ESA Copernicus Sentinel-2',
    source: commons('Dubai_by_Copernicus_Sentinel-2_in_false-colour.jpg'),
  },
  'kansas-crops-aster': {
    file: 'kansas-crops-aster.jpg',
    width: 1043,
    height: 1000,
    alt: 'ASTER image of southwest Kansas showing hundreds of circular center-pivot fields in red, green and tan.',
    caption:
      'Center-pivot fields in Kansas from ASTER: each circle is about 800 m across, so a 30 m pixel resolves it but a 1 km pixel mixes several.',
    credit: 'NASA',
    source: commons('Crops_Kansas_AST_20010624.jpg'),
  },
  'mercator-map': {
    file: 'mercator-map.jpg',
    width: 1200,
    height: 931,
    alt: 'World map in the Mercator projection with latitude and longitude grid lines.',
    caption:
      'A Mercator map: straight compass lines, but areas swell toward the poles, so map distance depends on latitude.',
    credit: 'Wikimedia Commons / Mdf',
    source: commons('Mercator-projection.jpg'),
  },
  'modis-ndvi-global': {
    file: 'modis-ndvi-global.jpg',
    width: 1200,
    height: 600,
    alt: 'Global map of vegetation index from MODIS: dense green tropics and boreal forest, pale deserts.',
    caption:
      'Global NDVI from MODIS in July 2013: high values in forests and crops, near zero over deserts and ice.',
    credit: 'NASA MODIS data / Ivan Shmakov',
    source: commons('MYD13C1_A2013201_005_2013218212020_NDVI.jpeg'),
  },
  'borneo-haze': {
    file: 'borneo-haze.jpg',
    width: 1197,
    height: 1000,
    alt: 'MODIS satellite view of thick grey smoke haze from fires covering much of Borneo.',
    caption: 'Smoke haze over Borneo, 2019: aerosols scatter sunlight and hide the surface below.',
    credit: 'NASA / Joshua Stevens, LANCE MODIS',
    source: commons('Satellite_image_of_2019_Southeast_Asian_haze_in_Borneo_-_20190915.jpg'),
  },
  'baffin-sea-ice': {
    file: 'baffin-sea-ice.jpg',
    width: 733,
    height: 1000,
    alt: 'MODIS image of bright white sea ice off Baffin Island beside dark open ocean.',
    caption:
      'Sea ice off Baffin Island: bright ice reflects most sunlight; the dark open water absorbs most of it.',
    credit: 'NASA / Jeff Schmaltz',
    source: commons('Sea_Ice_off_Baffin_Island.jpg'),
  },
  'earth-eastern-hemisphere': {
    file: 'earth-eastern-hemisphere.jpg',
    width: 1000,
    height: 1000,
    alt: 'Satellite composite of Earth showing Africa, Europe and Asia with clouds.',
    caption:
      'Clouds, ice, deserts and dark oceans together set Earth’s planetary albedo of about 0.3.',
    credit: 'NASA',
    source: commons('Earth_Eastern_Hemisphere.jpg'),
  },
  'katrina-2005': {
    file: 'katrina-2005.jpg',
    width: 775,
    height: 1000,
    alt: 'MODIS image of Hurricane Katrina’s spiral clouds and eye over the Gulf of Mexico in August 2005.',
    caption:
      'Hurricane Katrina, August 28, 2005: ocean heat and moisture moving through the atmosphere in one system.',
    credit: 'NASA / Jeff Schmaltz, MODIS Rapid Response',
    source: commons('Katrina_2005-08-28_1702Z.jpg'),
  },
  'aral-sea-1989-2014': {
    file: 'aral-sea-1989-2014.jpg',
    width: 1024,
    height: 870,
    alt: 'Side-by-side satellite images of the Aral Sea in 1989 and 2014, showing most of the sea dried to pale desert.',
    caption:
      'The Aral Sea in 1989 (left) and 2014 (right): repeat images make long-term change measurable.',
    credit: 'NASA',
    source: commons('AralSea1989_2014.jpg'),
  },
  'rondonia-2007': {
    file: 'rondonia-2007.jpg',
    width: 1200,
    height: 939,
    alt: 'Satellite image of Rondônia, Brazil, with a fishbone pattern of cleared land cutting into dark green forest and smoke plumes.',
    caption:
      'Rondônia, Brazil, 2007: clearing spreads along roads in a fishbone pattern, the kind of change detection maps.',
    credit: 'NASA / Jesse Allen and Robert Simmon',
    source: commons(
      'Fires_and_Deforestation_on_the_Amazon_Frontier,_Rondonia,_Brazil_-_August_12,_2007.jpg',
    ),
  },
  'atmosphere-limb': {
    file: 'atmosphere-limb.jpg',
    width: 1065,
    height: 1000,
    alt: 'Space Shuttle photograph of Earth’s limb at sunset: a thin blue band of atmosphere above orange and red layers near the horizon.',
    caption:
      'Earth’s limb at sunset from the Space Shuttle: blue light is scattered high in the atmosphere, while long red paths reach the horizon.',
    credit: 'NASA (STS-39)',
    source: nasa('s39-610-037'),
  },
  'pinatubo-1991': {
    file: 'pinatubo-1991.jpg',
    width: 1000,
    height: 1000,
    alt: 'Space Shuttle photograph of Mount Pinatubo after its 1991 eruption, with grey ash and mudflow channels radiating from the summit.',
    caption:
      'Mount Pinatubo after the 1991 eruption: its sulfate aerosols cooled global temperatures by about 0.5 °C for over a year.',
    credit: 'NASA (STS-46)',
    source: nasa('sts046-75-79a'),
  },
  'ozone-hole-2010': {
    file: 'ozone-hole-2010.jpg',
    width: 720,
    height: 720,
    alt: 'Satellite map of total ozone over Antarctica with a large deep-blue region of low ozone centered on the pole.',
    caption:
      'The Antarctic ozone hole, September 2010: blue and purple mark the lowest total ozone, measured by OMI on the Aura satellite.',
    credit: 'NASA Goddard',
    source: nasa('GSFC_20171208_Archive_e001962'),
  },
  'al-jowf-pivots': {
    file: 'al-jowf-pivots.jpg',
    width: 889,
    height: 1000,
    alt: 'False-color satellite image of Al Jowf, Saudi Arabia: hundreds of circular irrigated fields, bright red where crops are growing.',
    caption:
      'Center-pivot farms in Al Jowf, Saudi Arabia, in false color: red circles are actively growing crops, grey ones are fallow.',
    credit: 'NASA',
    source: nasa('PIA23955'),
  },

  // Published diagrams and figures.
  'remote-sensing-schematic': {
    file: 'remote-sensing-schematic.png',
    width: 500,
    height: 412,
    alt: 'Schematic of remote sensing: sunlight passes through the atmosphere, interacts with the ground, and travels back up to a sensor, with arrows for transmission, absorption, reflection and emission.',
    caption:
      'Energy travels from the source, through the atmosphere, to the surface and back up to the sensor.',
    credit: 'Wcpatrick6572',
    source: commons('Schematic_Drawing_of_Remote_Sensing.png'),
  },
  'remote-sensing-illustration': {
    file: 'remote-sensing-illustration.png',
    width: 1200,
    height: 1121,
    alt: 'Two panels: on top a satellite records sunlight reflected from land (passive); below, the satellite sends its own pulse and records the echo (active). Both relay data to a ground station.',
    caption:
      'Passive sensing (top) records sunlight the surface reflects; active sensing (bottom) sends its own energy and records the echo.',
    credit: 'Arkarjun',
    source: commons('Remote_Sensing_Illustration.jpg'),
  },
  'lidar-waveform': {
    file: 'lidar-waveform.png',
    width: 1200,
    height: 1403,
    alt: 'An aircraft fires an infrared laser pulse into a tree; beside it, the returned echo over time, recorded as discrete returns and as a full waveform with peaks at the canopy and the ground.',
    caption:
      'One lidar pulse through a tree: echoes come back from the canopy, the branches and the ground, recorded as discrete returns or a full waveform.',
    credit: 'Anthony Beck',
    source: commons(
      'Airborne_Laser_Scanning_Discrete_Echo_and_Full_Waveform_signal_comparison.svg',
    ),
  },
  'orbit-altitudes': {
    file: 'orbit-altitudes.png',
    width: 1200,
    height: 1200,
    alt: 'Earth drawn to scale with circles for low Earth orbit (ISS, Hubble), medium orbits (GPS, Galileo) and geostationary orbit, labelled with altitude, period and speed.',
    caption:
      'Orbits to scale: low Earth orbit circles in about 90 minutes; geostationary orbit, 35,786 km up, takes exactly one day.',
    credit: 'cmglee',
    source: commons('Comparison_satellite_navigation_orbits.svg'),
  },
  'trmm-swath': {
    file: 'trmm-swath.png',
    width: 1200,
    height: 900,
    alt: 'Globe with several diagonal bands of satellite data crossing the Americas, with gaps of unobserved ground between the bands.',
    caption:
      'TRMM’s data swaths over the Americas: each pass covers a strip, leaving gaps that later orbits fill in.',
    credit: 'NASA Scientific Visualization Studio',
    source: commons('TRMM_Data_Swath_(SVS174_-_orbit2).jpg'),
  },
  'additive-rgb': {
    file: 'additive-rgb.png',
    width: 1200,
    height: 1144,
    alt: 'Three overlapping circles of red, green and blue light; where they overlap they make yellow, cyan, magenta, and white in the center.',
    caption:
      'Screens mix red, green and blue light. A composite decides which measured band drives each of the three.',
    credit: 'Quark67',
    source: commons('Synthese+.svg'),
  },
  'reflectance-spectra': {
    file: 'reflectance-spectra.png',
    width: 1200,
    height: 992,
    alt: 'Graph of reflectance against wavelength from 400 to 2,400 nm for snow, vegetation, dry soil and water. Vegetation jumps up in the near infrared; water stays low.',
    caption:
      'Reflectance spectra of snow, vegetation, dry soil and water: each surface has its own spectral signature.',
    credit: 'NASA, ESA, Leah Hustak (STScI)',
    source: commons(
      'Reflectance_Spectra_of_Materials_on_Earth’s_Surface_(01F8GFAGTM98YTKDS0FZAAWWV2).png',
    ),
  },
  'mixed-pixel': {
    file: 'mixed-pixel.png',
    width: 1200,
    height: 849,
    alt: 'Diagram: a strip of grass and water, the sensor’s three pixel footprints across it (pure, mixed, pure), their raw values 60, 111 and 156, and the classified output.',
    caption:
      'A pixel straddling grass and water records a blend of both, and can be classified wrongly.',
    credit: 'Anthony Beck',
    source: commons('Mixed_pixel.svg'),
  },
  'pixel-size-mixing': {
    file: 'pixel-size-mixing.png',
    width: 1200,
    height: 1703,
    alt: 'The same blue shapes sampled by grids of different cell sizes, with a graph of how the share of mixed pixels rises as the pixels get coarser.',
    caption: 'Spatial resolution: the coarser the grid, the more pixels mix background and target.',
    credit: 'Anthony Beck',
    source: commons('Relationship_pixel_size_and_mixed_pixels.svg'),
  },
  'em-spectrum-properties': {
    file: 'em-spectrum-properties.png',
    width: 1200,
    height: 712,
    alt: 'The electromagnetic spectrum from radio to gamma rays, with wavelength, objects of similar size, frequency, and the temperature of objects that emit most strongly at each wavelength.',
    caption:
      'Radio to gamma rays: as wavelength shrinks, frequency and photon energy rise. The top bar shows which bands get through the atmosphere.',
    credit: 'Inductiveload, NASA',
    source: commons('EM_Spectrum_Properties_edit.svg'),
  },
  'snells-law': {
    file: 'snells-law.png',
    width: 1200,
    height: 665,
    alt: 'A light ray P–O–Q crosses an interface, bending toward the dashed normal as it enters the medium with index n₂. Angles θ₁ and θ₂ are measured from the normal.',
    caption: 'A ray bends at the interface; θ₁ and θ₂ are measured from the normal.',
    credit: 'Cristan, Sawims',
    source: commons('Snells_law.svg'),
  },
  'solar-energy-breakdown': {
    file: 'solar-energy-breakdown.png',
    width: 1200,
    height: 871,
    alt: 'Arrow diagram of incoming sunlight: parts reflected by the atmosphere, clouds and surface, parts absorbed by the atmosphere, and 89 PW absorbed by land and oceans.',
    caption:
      'Where incoming sunlight goes: some is reflected by air, clouds and ground, some absorbed in the atmosphere, most absorbed at the surface.',
    credit: 'User A1, English Wikipedia',
    source: commons('Breakdown_of_the_incoming_solar_energy.svg'),
  },
  'nasa-energy-budget': {
    file: 'nasa-energy-budget.png',
    width: 1200,
    height: 927,
    alt: 'NASA poster of Earth’s energy budget: 340.4 W/m² of incoming sunlight, 99.9 reflected, 239.9 emitted as infrared, and flows between surface and atmosphere.',
    caption:
      'Earth’s energy budget as global averages in W/m²: about 340 arrives, about 100 is reflected (albedo ≈ 0.3), and the rest leaves as infrared.',
    credit: 'NASA',
    source: commons(
      "The-NASA-Earth's-Energy-Budget-Poster-Radiant-Energy-System-satellite-infrared-radiation-fluxes.jpg",
    ),
  },
  'surface-albedo': {
    file: 'surface-albedo.png',
    width: 1200,
    height: 1678,
    alt: 'Chart of albedo ranges in percent: fresh snow 75–95, old snow 40–70, clouds 30–90, sand, deserts and soils 10–45, forest 5–20, water 3–10.',
    caption:
      'Albedo ranges by surface: fresh snow reflects most sunlight; forest and open water reflect little.',
    credit: 'Wereon',
    source: commons('Albedo-e_hg.svg'),
  },
  'usgs-water-cycle': {
    file: 'usgs-water-cycle.png',
    width: 500,
    height: 342,
    alt: 'USGS water cycle illustration: evaporation from oceans, condensation into clouds, precipitation, snowmelt, runoff, infiltration and groundwater discharge.',
    caption: 'The USGS water cycle: storage in oceans, ice, air and ground, linked by flows.',
    credit: 'John M. Evans, USGS',
    source: commons('Water_cycle.png'),
  },
  'carbon-cycle': {
    file: 'carbon-cycle.png',
    width: 1200,
    height: 921,
    alt: 'Carbon cycle diagram with stores in the atmosphere, vegetation, soil, oceans and fossil fuels, and arrows for photosynthesis, respiration, ocean exchange and emissions, in gigatons of carbon.',
    caption:
      'The carbon cycle: stores in gigatons of carbon and yearly flows between air, plants, soil, ocean and fossil fuels.',
    credit: 'Kevin Saff, FischX (after NASA Earth Observatory)',
    source: commons('Carbon_cycle-cute_diagram.svg'),
  },
  'risk-equation': {
    file: 'risk-equation.png',
    width: 1200,
    height: 255,
    alt: 'Equation drawn as circles: Disaster Risk = Hazard × Exposure × Vulnerability.',
    caption: 'Disaster risk = hazard × exposure × vulnerability.',
    credit: 'Gill, J.C. et al.',
    source: commons('Risk_equation.png'),
  },
  'modis-ndvi-profile': {
    file: 'modis-ndvi-profile.png',
    width: 500,
    height: 364,
    alt: 'Graph of MODIS NDVI from 2000 to 2006 for a conifer site: the index rises and falls each year, with the start, end and length of one growing season marked.',
    caption:
      'Six years of MODIS NDVI at one site: each year’s rise and fall marks the growing season.',
    credit: 'English Wikipedia',
    source: enwiki('MODIS_NDVI_Temporal_Profile_Conifer.jpg'),
  },
  'noaa-scale': {
    file: 'noaa-scale.png',
    width: 960,
    height: 134,
    alt: 'Graphic scale bar from a NOAA nautical chart, marked in nautical miles, yards and meters.',
    caption:
      'A graphic scale from a NOAA chart: measure on the map, read the ground distance off the bar.',
    credit: 'NOAA',
    source: commons('Scale_from_NOAA_Chart_13272.png'),
  },
  'ndvi-leaves': {
    file: 'ndvi-leaves.png',
    width: 1200,
    height: 798,
    alt: 'Average NDVI map of Great Britain and nearby Europe for June 2003, with a color bar running from −1 to 1; land is mostly green (high NDVI) and the sea black.',
    caption:
      'Average NDVI in June 2003: land in green scores high, while water falls at or below zero.',
    credit: 'Gennaro Cappelluti',
    source: commons('NDVI_062003.png'),
  },
  'manaus-radar': {
    file: 'manaus-radar.png',
    width: 1200,
    height: 960,
    alt: 'SIR-C radar image of the Solimões River near Manaus beside a map classifying flooded forest, unflooded forest, open water and floating grasses.',
    caption:
      'SIR-C radar near Manaus, 1994: smooth open water returns little and looks dark, while flooded forest double-bounces and shows up bright.',
    credit: 'NASA/JPL',
    source: nasa('PIA01712'),
  },
  'contrast-stretch-photo': {
    file: 'contrast-stretch-photo.png',
    width: 1200,
    height: 395,
    alt: 'The same grey landscape photograph twice: flat and low-contrast on the left, stretched to full contrast on the right.',
    caption:
      'The same stored values, displayed raw (left) and stretched (right): only the display changed, not the measurement.',
    credit: 'Phillip Capper, modified by Konstable',
    source: commons('Unequalized_Hawkes_Bay_NZ.jpg'),
  },
  'contrast-stretch-histogram': {
    file: 'contrast-stretch-histogram.png',
    width: 1200,
    height: 380,
    alt: 'Two histograms: on the left, values bunched in a narrow range; on the right, the same values spread across the full 0–255 range.',
    caption:
      'Histograms before and after: a narrow cluster of values is spread across the full display range.',
    credit: 'Jarekt',
    source: commons('Unequalized_Histogram.svg'),
  },
  'ap-directional-terms': {
    file: 'ap-directional-terms.png',
    width: 960,
    height: 971,
    alt: 'A body in anatomical position, front and side views, with arrows labeling superior, inferior, anterior, posterior, medial, lateral, proximal and distal.',
    caption:
      'Directional terms are always read from anatomical position: standing, facing forward, palms forward.',
    credit: 'OpenStax College',
    source: commons('Directional_Terms.jpg'),
  },
  'ap-body-planes': {
    file: 'ap-body-planes.png',
    width: 1200,
    height: 1036,
    alt: 'A standing figure cut by a blue coronal plane, a green transverse plane and red and yellow sagittal planes.',
    caption:
      'The three planes: coronal splits front from back, transverse splits top from bottom, sagittal splits left from right.',
    credit: 'David Richfield and Mikael Häggström',
    source: commons('Human_anatomy_planes,_labeled.jpg'),
  },
  'ap-body-cavities': {
    file: 'ap-body-cavities.png',
    width: 960,
    height: 556,
    alt: 'Side and front views of the body with the cranial and vertebral cavities behind and the thoracic and abdominopelvic cavities in front.',
    caption:
      'The dorsal cavity holds the brain and spinal cord; the ventral cavity holds the thoracic and abdominopelvic organs.',
    credit: 'OpenStax College',
    source: commons('Dorsal_Ventral_Body_Cavities.jpg'),
  },
  'ap-epithelium-types': {
    file: 'ap-epithelium-types.png',
    width: 1200,
    height: 722,
    alt: 'A table of eight epithelial tissues, each with a drawing of its cells, and where it is found, in two side-by-side halves.',
    caption:
      'Epithelium is named by layers (simple or stratified) and cell shape (squamous, cuboidal or columnar).',
    credit: 'OpenStax College',
    source: commons('423_Table_04_02_Summary_of_Epithelial_Tissue_CellsN.jpg'),
  },
  'ap-negative-feedback': {
    file: 'ap-negative-feedback.png',
    width: 500,
    height: 293,
    alt: 'Two flow charts: a generic loop of stimulus, sensor, control and effector, and body temperature regulation by the brain and sweat glands.',
    caption:
      'Negative feedback: a sensor detects a change, a control center compares it to the set point, and an effector reverses it.',
    credit: 'OpenStax College',
    source: commons('105_Negative_Feedback_Loops.jpg'),
  },
  'ap-positive-feedback': {
    file: 'ap-positive-feedback.png',
    width: 500,
    height: 408,
    alt: 'A drawing of a full-term baby in the uterus, circled by a five-step arrow cycle labeled a to e.',
    caption:
      'Labor as positive feedback: the head stretches the cervix, the brain releases oxytocin, and stronger contractions stretch it more until birth.',
    credit: 'OpenStax College',
    source: commons('106_Pregnancy-Positive_Feedback_labeled.jpg'),
  },
  'ap-tonicity': {
    file: 'ap-tonicity.png',
    width: 1200,
    height: 630,
    alt: 'Red blood cells in hypertonic, isotonic and hypotonic solutions: shriveled, normal and swollen, with arrows showing water movement.',
    caption:
      'Water follows solute: cells shrink in hypertonic fluid, hold steady in isotonic fluid and swell in hypotonic fluid.',
    credit: 'Mariana Ruiz (LadyofHats)',
    source: commons('Osmotic_pressure_on_blood_cells_diagram.svg'),
  },
  'ap-respiratory-organs': {
    file: 'ap-respiratory-organs.png',
    width: 1200,
    height: 1009,
    alt: 'The respiratory system in an outlined torso: nasal and oral cavities, pharynx, larynx, trachea, bronchi, both lungs and the diaphragm.',
    caption: 'The major respiratory organs, from the nasal cavity down to the diaphragm.',
    credit: 'OpenStax College',
    source: commons('2301_Major_Respiratory_Organs.jpg'),
  },
  'ap-bronchial-tree': {
    file: 'ap-bronchial-tree.png',
    width: 1200,
    height: 929,
    alt: 'A medical illustration of a bronchiole branching into clusters of alveoli wrapped in red and blue blood vessels.',
    caption:
      'The bronchial tree ends in bronchioles and grape-like alveolar clusters wrapped in capillaries.',
    credit: 'Patrick J. Lynch',
    source: commons('Bronchial_anatomy.jpg'),
  },
  'ap-respiratory-epithelium': {
    file: 'ap-respiratory-epithelium.jpg',
    width: 1200,
    height: 705,
    alt: 'A hand-drawn microscope field of pseudostratified columnar epithelium with labeled cilia, columnar cells and basement membrane.',
    caption:
      'Pseudostratified ciliated columnar epithelium: every cell touches the basement membrane, and cilia sweep mucus upward.',
    credit: 'Veeresh Likhitha',
    source: commons('Histology_of_pseudo_stratified_ciliates_columnar_epithelium.jpg'),
  },
  'ap-lung-lobes': {
    file: 'ap-lung-lobes.png',
    width: 960,
    height: 1228,
    alt: 'Front view of the larynx, trachea and both lungs, with the right lung in three lobes and the left in two, and colored bronchial branches.',
    caption: 'The right lung has three lobes and the left has two, leaving room for the heart.',
    credit: 'Patrick J. Lynch',
    source: commons('Lungs_diagram_detailed.svg'),
  },
  'ap-alveoli': {
    file: 'ap-alveoli.png',
    width: 1200,
    height: 917,
    alt: 'A terminal bronchiole leading to alveolar ducts and sacs, with pulmonary arteries and veins and a capillary net over the alveoli.',
    caption:
      'The respiratory zone: respiratory bronchioles, alveolar ducts and alveolar sacs, each wrapped in capillaries.',
    credit: 'OpenStax College',
    source: commons('2309_The_Respiratory_Zone.jpg'),
  },
  'ap-pleura': {
    file: 'ap-pleura.png',
    width: 1200,
    height: 904,
    alt: 'Cutaway of the chest showing the lungs, ribs and diaphragm, with an enlarged inset of the parietal pleura, visceral pleura and pleural cavity.',
    caption:
      'The visceral pleura covers the lung and the parietal pleura lines the chest wall; the thin fluid-filled pleural cavity lies between.',
    credit: 'OpenStax College',
    source: commons('2313_The_Lung_Pleurea.jpg'),
  },
  'ap-pneumothorax': {
    file: 'ap-pneumothorax.jpg',
    width: 1200,
    height: 1021,
    alt: 'A chest X-ray labeled "Left pneumothorax" with notes marking absent lung markings, a collapsed left lung and a mediastinal shift to the right.',
    caption:
      'Left tension pneumothorax: no lung markings at the edge, a collapsed lung, and the mediastinum pushed to the other side.',
    credit: 'Karthik Easvur',
    source: commons('X-ray_of_pneumothorax_signs.jpg'),
  },
  'ap-lung-volumes': {
    file: 'ap-lung-volumes.png',
    width: 1200,
    height: 744,
    alt: 'A spirometer tracing of quiet breaths, then a maximal breath in and out, with bars labeling tidal, reserve and residual volumes and the capacities.',
    caption: 'Lung volumes on a spirometer trace; each capacity is the sum of two or more volumes.',
    credit: 'Kapwatt',
    source: commons('Lungvolumes_Updated.png'),
  },
  'ap-flow-volume': {
    file: 'ap-flow-volume.png',
    width: 960,
    height: 659,
    alt: 'A flow-volume loop: a sharp expiratory peak above the volume axis and a rounded inspiratory curve below it.',
    caption:
      'A flow-volume loop: expiration above the axis peaks early, and inspiration below it is rounded.',
    credit: 'Silvermask',
    source: commons('Flow_volume_loop.png'),
  },
  'ap-oxygen-curve': {
    file: 'ap-oxygen-curve.png',
    width: 1200,
    height: 1016,
    alt: 'A red S-shaped curve of hemoglobin saturation against oxygen partial pressure, with P50 marked at 26.8 mmHg and 95.8% at 80 mmHg.',
    caption:
      'The oxygen-hemoglobin dissociation curve: steep in the tissues, flat in the lungs, with P50 near 27 mmHg.',
    credit: 'Rehua',
    source: commons('Hemoglobin_saturation_curve.svg'),
  },
  'ap-co2-transport': {
    file: 'ap-co2-transport.png',
    width: 500,
    height: 681,
    alt: 'A loop diagram of pulmonary and systemic circulation, with oxygen and carbon dioxide flows and partial pressures at the alveoli and tissue cells.',
    caption:
      'Gas exchange around the circulation: oxygen loads in the lungs, and carbon dioxide loads in the tissues.',
    credit: 'Alan Sved and Daniel Walsh',
    source: commons('Oxygen_and_carbon_dioxide_transport_in_blood_3.png'),
  },
  'ap-asthma': {
    file: 'ap-asthma.png',
    width: 1200,
    height: 900,
    alt: 'Line drawings comparing a normal open airway with an asthmatic airway narrowed by thickened walls and mucus.',
    caption:
      'An asthmatic airway (right) is narrowed by smooth muscle constriction, wall swelling and mucus.',
    credit: 'Baedr-9439',
    source: commons('Asthma-bronchial-tube-cross-section.png'),
  },
  'ap-emphysema': {
    file: 'ap-emphysema.jpg',
    width: 1200,
    height: 813,
    alt: 'A close-up of a lung slice riddled with dark holes where alveolar walls have been destroyed.',
    caption:
      'Centrilobular emphysema in a lung slice: destroyed alveolar walls leave large air spaces.',
    credit: 'Yale Rosen',
    source: commons('Emphysema,_centrilobular_(4563270814).jpg'),
  },
  'ap-pneumonia-xray': {
    file: 'ap-pneumonia-xray.jpg',
    width: 960,
    height: 763,
    alt: 'A frontal chest X-ray with a red arrow pointing to a white opacity in the lower right lung.',
    caption: 'Lobar pneumonia: a dense white consolidation fills part of the right lung.',
    credit: 'Mikael Häggström',
    source: commons('X-ray_of_lobar_pneumonia.jpg'),
  },
  'ap-tb-xray': {
    file: 'ap-tb-xray.jpg',
    width: 500,
    height: 452,
    alt: 'A frontal chest X-ray with countless tiny white dots scattered evenly through both lungs.',
    caption: 'Miliary tuberculosis: millet-seed nodules spread through both lungs by the blood.',
    credit: 'Herreros et al., Pathogens (2018)',
    source: commons('Chest_radiograph_of_miliary_tuberculosis_1.jpg'),
  },
  'ap-fibrosis-ct': {
    file: 'ap-fibrosis-ct.jpg',
    width: 801,
    height: 797,
    alt: 'An axial CT slice of the lower chest with honeycomb cysts and scarring along the outer edges of both lungs.',
    caption: 'Idiopathic pulmonary fibrosis on CT: honeycombing at the lung bases and periphery.',
    credit: 'IPFeditor',
    source: commons('HR_tomography_of_the_chest_of_an_IPF_patient_1.jpg'),
  },
  'ap-digestive-system': {
    file: 'ap-digestive-system.png',
    width: 960,
    height: 1357,
    alt: 'The digestive tract and accessory organs in a body outline, from mouth and salivary glands to the rectum and anus, all labeled.',
    caption:
      'The alimentary canal runs mouth to anus; the salivary glands, liver, gallbladder and pancreas empty into it.',
    credit: 'Mariana Ruiz and Jmarchn',
    source: commons('Digestive_system_diagram_en.svg'),
  },
  'ap-stomach': {
    file: 'ap-stomach.png',
    width: 960,
    height: 634,
    alt: 'A cutaway stomach labeling the cardia, fundus, body, pylorus, rugae, curvatures and three layers of the muscularis externa.',
    caption:
      'Stomach regions and its extra oblique muscle layer, which helps churn food into chyme.',
    credit: 'OpenStax College',
    source: commons('2414_Stomach.jpg'),
  },
  'ap-stomach-histology': {
    file: 'ap-stomach-histology.png',
    width: 960,
    height: 449,
    alt: 'The stomach wall layers with an enlarged gastric gland showing parietal, chief and enteroendocrine cells.',
    caption:
      'Gastric pits lead into glands lined by parietal cells (acid, intrinsic factor) and chief cells (pepsinogen).',
    credit: 'OpenStax College',
    source: commons('2415_Histology_of_StomachN.jpg'),
  },
  'ap-villi': {
    file: 'ap-villi.png',
    width: 1200,
    height: 900,
    alt: 'Two finger-like villi rising from the intestinal lining, with a crypt between them and an inset of enterocytes topped by microvilli.',
    caption:
      'Villi and microvilli multiply the small intestine’s absorptive surface many times over.',
    credit: 'BallenaBlanca',
    source: commons('Villi_&_microvilli_of_small_intestine.svg'),
  },
  'ap-liver-lobule': {
    file: 'ap-liver-lobule.png',
    width: 1200,
    height: 643,
    alt: 'A hexagonal liver lobule drawn as radiating cords, with enlarged insets of a portal triad and a sinusoid lined by hepatocytes and Kupffer cells.',
    caption:
      'A liver lobule: blood flows from portal triads at the corners through sinusoids to the central vein.',
    credit: 'NIH NIAID',
    source: commons('Liver_Lobule_(NIH_BioArt_565).png'),
  },
  'ap-pancreas': {
    file: 'ap-pancreas.png',
    width: 500,
    height: 649,
    alt: 'The pancreas beside the duodenum with its duct, and an enlarged view of acinar cells and a pancreatic islet.',
    caption: 'Acinar cells make digestive enzymes (exocrine); islets make hormones (endocrine).',
    credit: 'OpenStax College',
    source: commons('2424_Exocrine_and_Endocrine_Pancreas.jpg'),
  },
  'ap-gastric-ulcer': {
    file: 'ap-gastric-ulcer.jpg',
    width: 1200,
    height: 990,
    alt: 'An endoscopy view of the stomach lining with a pale, well-defined ulcer crater.',
    caption: 'A peptic ulcer seen on endoscopy: a punched-out crater through the mucosa.',
    credit: 'డా. గన్నవరపు నరసింహమూర్తి',
    source: commons('Peptic_ulcer.jpg'),
  },
  'ap-colon-polyp': {
    file: 'ap-colon-polyp.jpg',
    width: 500,
    height: 363,
    alt: 'A pathology specimen of opened colon with a lumpy, red-brown polyp rising from the folded lining.',
    caption:
      'An adenomatous polyp: a benign growth that can progress to colorectal cancer if left in place.',
    credit: 'Ed Uthman',
    source: commons('Adenomatous_Polyp_of_the_Colon_1.jpg'),
  },
  'ap-lactase-map': {
    file: 'ap-lactase-map.png',
    width: 1200,
    height: 943,
    alt: 'A shaded map of Europe, Africa and Asia showing lactase persistence, highest in northern Europe and patchy in Africa and the Middle East.',
    caption:
      'Lactase persistence across the Old World: common where dairy herding has a long history.',
    credit: 'Joe Roe',
    source: commons('Lactase_persistence_in_the_Old_World.svg'),
  },
  'ap-thymus': {
    file: 'ap-thymus.png',
    width: 960,
    height: 673,
    alt: 'The thymus above the heart, with enlarged views of its lobes and of the cortex and medulla containing thymocytes and epithelial cells.',
    caption: 'The thymus: T cells mature in the cortex and are tested in the medulla.',
    credit: 'OpenStax College',
    source: commons('2206_The_Location_Structure_and_Histology_of_the_Thymus.jpg'),
  },
  'ap-lymph-node': {
    file: 'ap-lymph-node.png',
    width: 465,
    height: 265,
    alt: 'A cut lymph node with afferent vessels entering the capsule, nodules in the cortex, sinuses, and an efferent vessel leaving at the hilum.',
    caption:
      'Lymph enters through several afferent vessels, filters through the sinuses and leaves by the efferent vessel at the hilum.',
    credit: 'NCI SEER Training',
    source: commons('Illu_lymph_node_structure.png'),
  },
  'ap-lymphatic-system': {
    file: 'ap-lymphatic-system.png',
    width: 960,
    height: 1017,
    alt: 'A body outline with lymph vessels and nodes, the thymus, spleen, tonsils and bone marrow, plus insets of lymphatic capillaries and a node.',
    caption:
      'Lymphatic vessels collect tissue fluid and pass it through nodes back to the veins near the heart.',
    credit: 'OpenStax College',
    source: commons('2201_Anatomy_of_the_Lymphatic_System.jpg'),
  },
  'ap-spleen': {
    file: 'ap-spleen.jpg',
    width: 387,
    height: 336,
    alt: 'A drawing of a spleen section with branching blue and red vessels and two arrows, A and B, pointing at its tissue.',
    caption:
      'The spleen’s two compartments: white pulp around the arteries and red pulp filling the rest.',
    credit: 'Senioritisisreal',
    source: commons('Red_Pulp_and_White_Pulp_of_the_Spleen.jpg'),
  },
  'ap-inflammation': {
    file: 'ap-inflammation.png',
    width: 960,
    height: 1001,
    alt: 'Two panels of injured skin: mast cells releasing mediators near pathogens, then phagocytes leaving a vessel, with six numbered steps.',
    caption:
      'Inflammation step by step: mediators open the vessels, phagocytes arrive and platelets start repair.',
    credit: 'OpenStax College',
    source: commons('2213_Inflammatory_Process.jpg'),
  },
  'ap-phagocytosis': {
    file: 'ap-phagocytosis.png',
    width: 960,
    height: 794,
    alt: 'Three steps: a coated particle binds phagocyte receptors, more receptors engage, and the membrane wraps around it with actin.',
    caption:
      'Phagocytosis: receptors bind a coated particle, then actin pulls the membrane around it.',
    credit: 'GrahamColm and Retama',
    source: commons('Phagocytosis_in_three_steps.svg'),
  },
  'ap-complement': {
    file: 'ap-complement.png',
    width: 1200,
    height: 1447,
    alt: 'A vertical cascade from antibody-bound antigen through C1, C3 convertase and C5 cleavage to the membrane attack complex bursting a cell.',
    caption:
      'The complement cascade ends in the membrane attack complex that bursts the target cell.',
    credit: 'DO11.10, after NIAID',
    source: commons('Complement_pathway.svg'),
  },
  'ap-antibody': {
    file: 'ap-antibody.png',
    width: 500,
    height: 406,
    alt: 'A ribbon model of an IgG antibody: two heavy chains and two light chains folded into a Y shape.',
    caption:
      'An IgG antibody: two heavy and two light chains form two antigen-binding arms and a stem.',
    credit: 'Tokenzero',
    source: commons('Antibody_IgG1_structure.png'),
  },
  'ap-immune-response': {
    file: 'ap-immune-response.png',
    width: 1200,
    height: 900,
    alt: 'Five cartoon steps: a macrophage engulfs bacteria and shows antigen, a helper T cell activates a B cell, and B cells become plasma and memory cells.',
    caption:
      'The primary response: antigen presentation activates helper T cells, which activate B cells to make plasma and memory cells.',
    credit: 'Mr.Sneaky64',
    source: commons('Primary_Immune_Response.svg'),
  },
  'ap-hiv': {
    file: 'ap-hiv.png',
    width: 1200,
    height: 923,
    alt: 'A cutaway HIV particle labeling the gp120 and gp41 envelope proteins, lipid membrane, capsid, RNA genome, reverse transcriptase and integrase.',
    caption:
      'HIV: gp120 binds CD4, and reverse transcriptase and integrase write its RNA into the host DNA.',
    credit: 'Thomas Splettstoesser',
    source: commons('HI-virion-structure_en.svg'),
  },
  'ap-ms-mri': {
    file: 'ap-ms-mri.jpg',
    width: 960,
    height: 1097,
    alt: 'An axial brain MRI with arrows and arrowheads marking pale lesions in the white matter and cortex.',
    caption: 'Multiple sclerosis on MRI: scattered demyelinating plaques marked by arrows.',
    credit: 'Favaretto et al. (2015)',
    source: commons('Axial_PSIR_MRI_of_a_brain_with_multiple_sclerosis_lesions.jpg'),
  },
  'ap-ra-hand': {
    file: 'ap-ra-hand.jpg',
    width: 1200,
    height: 1202,
    alt: 'Two hands with swollen knuckles and fingers bent away from the thumbs.',
    caption:
      'Advanced rheumatoid arthritis: symmetric joint swelling and fingers drifting toward the little finger.',
    credit: 'డా. గన్నవరపు నరసింహమూర్తి',
    source: commons('Severely_deformed_hands_from_Rheumatoid_Arthritis.jpg'),
  },
  'ap-chest-xray': {
    file: 'ap-chest-xray.jpg',
    width: 1200,
    height: 1373,
    alt: 'A normal frontal chest X-ray: dark lung fields, a white heart shadow, a central trachea and sharp diaphragm domes.',
    caption:
      'A normal PA chest radiograph to compare against: clear lung fields and sharp borders.',
    credit: 'Mikael Häggström',
    source: commons('Normal_posteroanterior_(PA)_chest_radiograph_(X-ray).jpg'),
  },
} satisfies Record<string, Photo>;
