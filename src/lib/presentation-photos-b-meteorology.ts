import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Meteorology (Division B) presentations, served from public/presentations.
// Each was downloaded from Wikimedia Commons.
export const photos = {
  'b-met-radiosonde': {
    file: 'b-met-radiosonde.jpg',
    width: 1200,
    height: 633,
    alt: 'A group of people releasing a large white weather balloon on a grassy field, and the balloon rising into a cloudy sky with its instrument hanging below.',
    caption:
      'Launching a radiosonde: the balloon carries a small instrument package up through the atmosphere.',
    credit: 'Tsaud',
    source: commons('Radiosondes_launch.jpg'),
  },
  'b-met-goes-ir': {
    file: 'b-met-goes-ir.jpg',
    width: 1200,
    height: 572,
    alt: 'A GOES-16 infrared satellite image of Hurricane Harvey near the Texas coast, with the coldest cloud tops colored red and a small eye at the center.',
    caption:
      'GOES-16 infrared image of Hurricane Harvey: colors mark the coldest, tallest cloud tops around the eye.',
    credit: 'NOAA',
    source: commons('Infrared_goes-16_harvey.png'),
  },
  'b-met-station-model': {
    file: 'b-met-station-model.png',
    width: 330,
    height: 248,
    alt: 'A labeled station model with temperature 34, dew point 32, pressure code 147, a wind barb, sky cover and weather symbols around a central circle.',
    caption:
      'A labeled station model: temperature (34) upper left, dew point (32) lower left, pressure code (147) upper right, and the wind barb on the circle.',
    credit: 'U.S. government',
    source: commons('Station_model.gif'),
  },
  'b-met-hodograph': {
    file: 'b-met-hodograph.png',
    width: 500,
    height: 586,
    alt: 'A NOAA hodograph with wind vectors from the surface to 4 km drawn from the center, their tips joined by a curving line, and a table of heights, directions and speeds.',
    caption:
      'A hodograph: wind arrows for the surface to 4 km, with their tips joined. The line curves clockwise as the wind veers with height.',
    credit: 'NOAA Local Analysis and Prediction System',
    source: commons('Hodographe_NOAA.PNG'),
  },
  'b-met-skewt': {
    file: 'b-met-skewt.png',
    width: 500,
    height: 417,
    alt: 'An annotated Skew-T diagram for Grand Junction with temperature and dew point lines, labeled dry adiabats, moist adiabats, isobars, isotherms, a lifted parcel and wind barbs.',
    caption:
      'An annotated Skew-T: the temperature and dew point lines, with dry and moist adiabats, isobars, isotherms and wind barbs labeled.',
    credit: 'JeanBizHertzberg',
    source: commons('Annotated_Skew_T_diagram.png'),
  },
  'b-met-air-masses': {
    file: 'b-met-air-masses.png',
    width: 1200,
    height: 550,
    alt: 'A world map with shaded source regions labeled mT, cT, mP, cP and other air mass types.',
    caption:
      'Air mass source regions: maritime tropical (mT), continental tropical (cT), maritime polar (mP) and continental polar (cP), among others.',
    credit: 'Wikimedia Commons contributors',
    source: commons('Air_masses.svg'),
  },
  'b-met-fronts': {
    file: 'b-met-fronts.png',
    width: 960,
    height: 549,
    alt: 'Nine numbered weather map line symbols, including blue triangles, red half-circles, alternating blue and red, purple triangles and half-circles, and open scalloped half-circles.',
    caption:
      'Front symbols: 1 cold (blue triangles), 2 warm (red half-circles), 3 stationary (alternating), 4 occluded (purple), 7 dryline (open half-circles).',
    credit: '-xfi- (after the NOAA Hydrometeorological Prediction Center)',
    source: commons('NWS_weather_fronts.svg'),
  },
  'b-met-cumulonimbus': {
    file: 'b-met-cumulonimbus.jpg',
    width: 1200,
    height: 807,
    alt: 'A towering cumulonimbus cloud rising high above smaller cumulus clouds and a roadway.',
    caption:
      'A cumulonimbus cloud towers above the smaller cumulus around it; its top spreads out at the tropopause.',
    credit: 'Couch-scratching-cats',
    source: commons('Cumulonimbus_capillatus_incus_anvil_cloud.jpg'),
  },
  'b-met-supercell': {
    file: 'b-met-supercell.png',
    width: 500,
    height: 331,
    alt: 'A NOAA top-down schematic of a tornadic supercell showing rain and hail areas, forward and rear flank downdrafts, the gust front, and the tornado at the tip of the hook.',
    caption:
      'A supercell seen from above: rain and hail areas, the forward- and rear-flank downdrafts, and the tornado at the tip of the hook.',
    credit: 'NOAA',
    source: commons('Supercell_final.jpg'),
  },
  'b-met-lightning': {
    file: 'b-met-lightning.jpg',
    width: 1200,
    height: 800,
    alt: 'A bright branching cloud-to-ground lightning bolt striking the ground at night under a purple sky.',
    caption: 'A cloud-to-ground lightning strike in Johnston, Iowa, with branches from the leader.',
    credit: 'NOAA Photo Library',
    source: commons('Lightning_bolt,_Johnston,_Iowa_(27661834650).jpg'),
  },
  'b-met-microburst': {
    file: 'b-met-microburst.png',
    width: 1200,
    height: 544,
    alt: 'A cross-section of a microburst: a downdraft falls from the cloud base, hits the ground, and spreads outward as outflow with curling horizontal vortices.',
    caption:
      'A microburst in cross-section: the downdraft hits the ground and spreads outward in all directions.',
    credit: 'Federal Aviation Administration (vectored by FOX 52)',
    source: commons('Microburst_crosssection_(vectored).svg'),
  },
  'b-met-bow-echo': {
    file: 'b-met-bow-echo.jpg',
    width: 960,
    height: 657,
    alt: 'Side-by-side radar reflectivity and base velocity images of a bow echo over Illinois, labeled with a bookend vortex, a rear-inflow notch and 80 to 90 knot winds.',
    caption:
      'A bow echo over Illinois: reflectivity (left) shows the bowed line and rear-inflow notch; velocity (right) shows 80–90 knot winds.',
    credit: 'NOAA Storm Prediction Center',
    source: commons('11apr20_bowecho1_rdr_KILX_01z_from_grenci_hires_LABELS_crop.gif'),
  },
  'b-met-tornado': {
    file: 'b-met-tornado.jpg',
    width: 960,
    height: 637,
    alt: 'A narrow tornado funnel reaching from a dark cloud base to the ground, kicking up debris over flat land.',
    caption: 'A tornado near Anadarko, Oklahoma, on May 3, 1999, touching the ground below the storm.',
    credit: 'Daphne Zaras (NOAA NSSL)',
    source: commons('A_tornado_near_Anadarko,_Oklahoma,_on_May_3,_1999.jpg'),
  },
  'b-met-hook-echo': {
    file: 'b-met-hook-echo.jpg',
    width: 1200,
    height: 900,
    alt: 'A radar reflectivity image of a storm in Kansas with a curling hook shape on its southern side inside red warning boxes.',
    caption:
      'A hook echo in Kansas (March 13, 2024): rain curls around the rotating updraft on the storm’s south side.',
    credit: 'National Weather Service',
    source: commons('Hook_Echo_March_13,_2024_Kansas.jpg'),
  },
  'b-met-katrina': {
    file: 'b-met-katrina.jpg',
    width: 1200,
    height: 900,
    alt: 'A satellite photo of Hurricane Katrina over the Gulf of Mexico with a clear eye surrounded by a thick white ring of clouds and spiral bands.',
    caption:
      'Hurricane Katrina on August 28, 2005: the small clear eye, the thick eyewall around it, and spiral rain bands.',
    credit: 'Jeff Schmaltz, MODIS Rapid Response Team, NASA/GSFC',
    source: commons('Katrina_2005-08-28_1702Z.jpg'),
  },
  'b-met-storm-surge': {
    file: 'b-met-storm-surge.jpg',
    width: 1200,
    height: 796,
    alt: 'Large waves riding on high water crash over a seawall in front of buildings during Hurricane Eloise.',
    caption:
      'Storm surge and waves crash ashore during Hurricane Eloise (1975), raising the water far above normal.',
    credit: 'NOAA',
    source: commons('Storm_surge_during_hurricane_eloise.jpg'),
  },
  'b-met-precip-types': {
    file: 'b-met-precip-types.png',
    width: 500,
    height: 310,
    alt: 'A National Weather Service diagram of a warm air layer thinning from left to right above cold air, producing rain, freezing rain, sleet and snow.',
    caption:
      'How the warm layer decides the type: rain, freezing rain, sleet and snow as the warm air aloft thins out.',
    credit: 'National Weather Service',
    source: commons('Precipitation_by_type.png'),
  },
  'b-met-freezing-rain': {
    file: 'b-met-freezing-rain.png',
    width: 500,
    height: 514,
    alt: 'An observed Skew-T sounding from Davenport, Iowa, where the temperature line crosses above 0 °C in a layer aloft and drops below freezing near the ground.',
    caption:
      'A freezing-rain sounding (Davenport, Iowa, Dec 14, 2024): a warm layer above 0 °C aloft over a thin cold layer at the ground.',
    credit: 'National Weather Service Quad Cities',
    source: commons('Freezing_Rain_skew-t.gif'),
  },
} satisfies Record<string, Photo>;
