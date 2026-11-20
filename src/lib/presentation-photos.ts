// Real photographs and satellite images used on presentation slides, served from
// public/presentations. Each was downloaded from Wikimedia Commons or the NASA Image and Video
// Library; `source` links the original page.

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
} satisfies Record<string, Photo>;
