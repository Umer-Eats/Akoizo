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
} satisfies Record<string, Photo>;
