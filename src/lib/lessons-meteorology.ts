import { buildCourse } from './lesson-course-builder.ts';
import { chapter as c, evidence } from './course-authoring.ts';

// Division B Meteorology (2027 theme: Severe Weather & Storms), organized from rule 3.c.
export const meteorologyLessons = buildCourse({
  eventId: 'meteorology',
  eventName: 'Meteorology',
  prefix: 'met',
  division: 'B',
  syllabus: '2027 Science Olympiad Division B Meteorology rules (Severe Weather & Storms)',
  intro:
    'Eight units follow the 2027 Severe Weather & Storms topic list. At least half of every Meteorology test asks you to interpret maps, graphs, radar, and satellite images, so each unit pairs the science with the data products forecasters actually read. Skew-T diagrams, LCL, CAPE, and IDF curves are State and National topics; they are flagged where they appear.',
  references: [
    { title: 'Science Olympiad: Meteorology B', url: 'https://www.soinc.org/meteorology-b' },
    {
      title: 'NOAA JetStream: An Online School for Weather',
      url: 'https://www.noaa.gov/jetstream',
    },
    {
      title: 'NOAA National Severe Storms Laboratory: Severe Weather 101',
      url: 'https://www.nssl.noaa.gov/education/svrwx101/',
    },
  ],
  chapters: [
    {
      ...c(
        'Observing severe weather: stations, balloons, radar, and satellites',
        [
          'Describe what surface networks, radiosondes, buoys, and aircraft measure.',
          'Interpret visible, infrared, and water vapor satellite images.',
          'Explain the main Doppler radar products.',
        ],
        [
          [
            'Surface networks',
            'Forecasts start with observations. The Automated Surface Observing System (ASOS) at airports reports temperature, dew point, wind, pressure, visibility, sky cover, and precipitation every hour, and more often when weather changes quickly. Mesonets are denser networks, often run by states or universities, with stations every few tens of kilometers. Their closer spacing catches small features such as outflow boundaries and drylines that the wider ASOS network can miss.',
          ],
          [
            'Upper-air, ocean, and aircraft data',
            'Radiosondes are instrument packages carried by balloons, launched twice daily at about 0000 and 1200 UTC from stations worldwide. They measure temperature, humidity, and pressure, and their drift gives wind, building a vertical profile of the atmosphere up to about 30 km. Moored and drifting buoys report sea-surface temperature, waves, wind, and pressure over oceans, where other data are sparse. Commercial aircraft automatically report temperature and wind, and reconnaissance aircraft fly directly into hurricanes.',
          ],
          [
            'Satellite channels',
            'Geostationary satellites such as GOES watch one region continuously, while polar orbiters pass over the whole Earth at lower altitude. Visible images show reflected sunlight, so they work only in daytime and show cloud thickness and texture well. Infrared images measure emitted heat: cold cloud tops appear bright, which marks tall thunderstorms. Water vapor images show moisture in the middle and upper troposphere, revealing jet streams and dry slots even where there are no clouds.',
          ],
          [
            'Radar reflectivity',
            'Weather radar sends out microwave pulses and listens for energy scattered back by raindrops, hail, and snow. Reflectivity, measured in dBZ, rises with the size and number of targets. Light rain is about 20 dBZ, heavy rain 50 dBZ, and values above about 60 dBZ often mean hail. Base reflectivity shows the lowest scan angle, while composite reflectivity shows the highest value in any scan above each point, which helps find hail cores aloft.',
          ],
          [
            'Doppler velocity',
            'Doppler radar also measures how fast targets move toward or away from the radar, called radial velocity. By convention green shows motion toward the radar and red shows motion away. A tight couplet of strong green next to strong red is a sign of rotation. Storm-relative motion subtracts the storm’s own movement, making rotation easier to see. A velocity-azimuth display wind profile shows how wind changes with height above the radar.',
          ],
          [
            'Dual polarization',
            'Dual-polarization radars send pulses in horizontal and vertical orientations, which reveals target shape. Correlation coefficient (CC) measures how similar the targets in a volume are. Pure rain or snow gives CC near 1. Mixed targets such as hail with rain give lower values, and debris lofted by a tornado gives very low, jumbled values, often below 0.8. A low-CC area collocated with a velocity couplet is strong evidence that a tornado is on the ground.',
          ],
        ],
        [
          ['ASOS', 'Automated airport weather stations reporting surface conditions.'],
          ['Radiosonde', 'Balloon-borne instruments that measure an atmospheric profile.'],
          ['Reflectivity', 'Radar power returned by precipitation, measured in dBZ.'],
          ['Radial velocity', 'Target motion toward or away from the radar.'],
          [
            'Correlation coefficient',
            'Dual-pol measure of how similar targets are in a radar volume.',
          ],
          [
            'Water vapor imagery',
            'Satellite channel showing upper and middle tropospheric moisture.',
          ],
        ],
        [
          'A radar image shows a storm with reflectivity of 65 dBZ, a tight red–green velocity couplet on its southwest side, and a small area of CC values around 0.7 at the same spot. What is happening?',
          [
            '65 dBZ suggests large hail in the storm core.',
            'The adjacent strong inbound and outbound winds show rotation.',
            'Low CC collocated with rotation indicates lofted debris.',
          ],
          'The storm is a supercell producing a tornado that is lofting debris, and it probably also has a hail core.',
        ],
        [
          [
            'Which satellite channel can show a jet stream in clear air?',
            'Water vapor',
            ['Visible', 'Infrared only at night', 'Radar reflectivity'],
            'Water vapor imagery shows moisture boundaries in the upper troposphere even without clouds.',
          ],
          [
            'On Doppler velocity, green colors usually mean:',
            'Motion toward the radar',
            ['Motion away from the radar', 'Heavy rain', 'Hail'],
            'Green is inbound by convention and red is outbound.',
          ],
          [
            'Why are cold, bright cloud tops on infrared images important?',
            'They mark tall thunderstorms',
            ['They mark fog', 'They show surface temperature', 'They indicate clear skies'],
            'Temperature drops with height, so the coldest tops belong to the tallest clouds.',
          ],
        ],
        [
          [
            'Explain why mesonets help forecasters during severe weather.',
            'Mesonet stations are much closer together than airport ASOS stations, so they detect small boundaries such as outflows and drylines where storms often form.',
          ],
          [
            'How does composite reflectivity differ from base reflectivity?',
            'Base reflectivity shows the lowest radar scan. Composite reflectivity shows the strongest value from any elevation above each point, so it can reveal hail cores aloft.',
          ],
          [
            'Why are radiosondes launched at the same times worldwide?',
            'Simultaneous launches at 0000 and 1200 UTC give a consistent snapshot of the atmosphere for maps and computer models.',
          ],
          [
            'What does a low correlation coefficient tell you, and why can it be useful at night?',
            'Low CC means the targets are mixed in shape and size, such as tornado debris. It confirms a tornado even when no one can see it at night.',
          ],
        ],
        [
          ['Observe', 'Stations, balloons, buoys, and aircraft measure the atmosphere.'],
          ['Scan', 'Satellites and radar map clouds, moisture, precipitation, and motion.'],
          ['Combine', 'Forecasters merge products to identify the threat.'],
        ],
        [
          ['Visible satellite', 'Reflected sunlight shows cloud texture', 'Unavailable at night.'],
          [
            'Infrared satellite',
            'Emitted heat shows cloud-top temperature',
            'Low clouds and ground can look alike.',
          ],
          [
            'Doppler velocity',
            'Radial motion reveals rotation',
            'Only measures motion along the beam.',
          ],
        ],
        'Match each radar and satellite clue to the storm feature it shows.',
        'No single product is enough: combine reflectivity, velocity, and dual-pol before concluding.',
      ),
      investigation: evidence(
        [
          ['Reflectivity', 'A hook-shaped appendix on the storm’s southwest side.'],
          ['Velocity', 'Strong inbound and outbound winds side by side at the hook.'],
          ['Correlation coefficient', 'A small area of 0.6–0.7 inside the hook.'],
        ],
        'What is the best interpretation?',
        ['A tornado lofting debris', 'Heavy rain only', 'A snow band', 'Ground clutter'],
        0,
        'A hook echo with a velocity couplet shows a rotating supercell; very low CC at the same spot indicates lofted debris from a tornado on the ground.',
      ),
    },
    {
      ...c(
        'Reading weather data: station models, METARs, hodographs, and models',
        [
          'Decode a surface station model and a METAR report.',
          'Read wind shear from a hodograph.',
          'Use computer model guidance with appropriate caution.',
        ],
        [
          [
            'The station model',
            'A station model packs one station’s observations into a small symbol. Temperature is at the upper left and dew point at the lower left, in °F on U.S. maps. The circle in the center shows sky cover. Present weather symbols sit between temperature and dew point. A wind barb points into the direction the wind comes from, with each long barb worth 10 knots, a short barb 5 knots, and a flag 50 knots. Pressure is at the upper right.',
          ],
          [
            'Decoding pressure and tendency',
            'Station model pressure is coded with three digits for sea-level pressure in tenths of a millibar, dropping the leading 9 or 10. Add a 10 in front if the code is below about 500, and a 9 in front if it is above. So 132 means 1013.2 mb, and 978 means 997.8 mb. The pressure tendency below it shows the change over three hours. A rapid fall often signals an approaching low or strengthening storm.',
          ],
          [
            'Reading a METAR',
            'A METAR is a coded airport observation. In “KOKC 241953Z 19025G38KT 10SM BKN045 31/22 A2985,” KOKC is the station, 241953Z is the 24th day at 1953 UTC, and 19025G38KT is wind from 190° at 25 knots gusting to 38. 10SM is visibility in statute miles, BKN045 is a broken cloud layer at 4,500 feet, 31/22 gives temperature and dew point in °C, and A2985 is the altimeter setting of 29.85 inches of mercury. Codes such as TS, +RA, and GR mean thunderstorm, heavy rain, and hail.',
          ],
          [
            'Hodographs',
            'A hodograph plots wind vectors at increasing heights, connecting their tips with a line. Length from the center shows speed, and direction shows where the wind blows toward. A long hodograph means strong vertical wind shear. A hodograph that curves clockwise with height in the lowest few kilometers shows veering winds and helicity, which favor rotating supercells. A short, straight hodograph suggests weak shear and short-lived storms.',
          ],
          [
            'Computer model guidance',
            'Numerical weather prediction models divide the atmosphere into a three-dimensional grid and solve physical equations forward in time from current observations. Global models cover the whole Earth at coarser spacing, while high-resolution convection-allowing models can show individual storms. Ensembles run a model many times with slightly different starting conditions; when members agree, confidence is higher. Models are guidance, not observations.',
          ],
          [
            'Using recent severe weather data',
            'Rules emphasize analyzing real storm data from about 2022 to 2027. Practice by connecting several products: a surface map showing a front and dryline, a sounding with strong instability, radar showing the storms that formed, and storm reports of hail and tornadoes. Ask what each product shows, when it was valid, and what it cannot show. Times are usually in UTC, so convert carefully to local time.',
          ],
        ],
        [
          ['Station model', 'A symbol that summarizes one weather station’s observations.'],
          ['Wind barb', 'A line pointing to where the wind comes from, with barbs showing speed.'],
          ['METAR', 'A coded routine aviation weather report.'],
          ['Hodograph', 'A plot of wind vectors with height showing vertical wind shear.'],
          ['Wind shear', 'Change in wind speed or direction with height.'],
          ['Ensemble', 'A set of model runs started from slightly different conditions.'],
        ],
        [
          'A station model shows 88 at upper left, 70 at lower left, a wind barb from the south with two long barbs and one short barb, and 096 at upper right. Decode it.',
          [
            'Temperature 88 °F and dew point 70 °F: warm and humid.',
            'Two long barbs (20 knots) plus one short barb (5 knots) gives 25 knots from the south.',
            '096 is below 500, so add 100: 1009.6 mb.',
          ],
          'Hot, humid air flowing north at 25 knots with pressure near 1009.6 mb—a moist warm sector.',
        ],
        [
          [
            'A station model pressure code of 984 means:',
            '998.4 mb',
            ['1098.4 mb', '984 mb', '1008.4 mb'],
            'Codes above about 500 get a leading 9: 998.4 mb.',
          ],
          [
            'In a METAR, “31/22” means:',
            'Temperature 31 °C, dew point 22 °C',
            ['Wind 310° at 22 knots', 'Visibility 31 miles', 'Pressure 31.22 inches'],
            'Temperature and dew point appear together, separated by a slash.',
          ],
          [
            'A long hodograph that curves clockwise near the ground indicates:',
            'Strong shear favoring supercells',
            ['No wind', 'Stable air', 'Calm conditions favoring fog'],
            'Strong veering shear supports rotating updrafts.',
          ],
        ],
        [
          [
            'Explain how to read wind direction from a wind barb.',
            'The barb’s shaft points toward the direction the wind is coming from, and the feathers are on the end where the wind originates.',
          ],
          [
            'Decode “TSRA” and “+RA” in a METAR.',
            'TSRA is a thunderstorm with rain. +RA is heavy rain; the plus sign means heavy intensity.',
          ],
          [
            'Why do forecasters use ensembles?',
            'Small errors in starting data grow over time. Running many slightly different forecasts shows the range of outcomes and how confident the forecast is.',
          ],
          [
            'What does a short, straight hodograph suggest about storms?',
            'Weak wind shear, which usually supports short-lived single-cell storms rather than organized supercells.',
          ],
        ],
        [
          ['Decode', 'Read temperature, dew point, wind, and pressure from symbols.'],
          ['Profile', 'Use hodographs and soundings to see shear and moisture aloft.'],
          ['Forecast', 'Compare model guidance with what observations show.'],
        ],
        [
          ['Station model', 'Map symbol of one station', 'Shows one place at one time.'],
          ['METAR', 'Text code of airport observations', 'Uses °C and UTC times.'],
          ['Computer model', 'Physics-based forecast on a grid', 'Can miss small features.'],
        ],
        'Decode the observation clues and decide what kind of air mass the station is in.',
        'Decode carefully, then connect products: one observation is a point, not a pattern.',
      ),
      investigation: evidence(
        [
          ['METAR', 'KDDC 151900Z 20030G45KT 7SM TSRA BKN030CB 29/21 A2972'],
          ['Wind', 'From 200° at 30 knots gusting to 45 knots.'],
          ['Weather', 'Thunderstorm with rain and cumulonimbus clouds.'],
          ['Pressure', 'Altimeter 29.72 inHg and falling quickly.'],
        ],
        'What is the best summary?',
        [
          'Calm, clear high pressure',
          'A strong thunderstorm with gusty winds',
          'Dense fog',
          'A blizzard',
        ],
        1,
        'TSRA with CB clouds and gusts to 45 knots describes a strong thunderstorm. Warm temperature rules out a blizzard.',
      ),
    },
    {
      ...c(
        'Stability on Stüve and Skew-T diagrams',
        [
          'Plot and read temperature and dew point profiles on a Stüve diagram.',
          'Determine stability, cloud base, and wind shear from a sounding.',
          'State/National: find the LCL and interpret CAPE on a Skew-T.',
        ],
        [
          [
            'What a sounding shows',
            'A sounding plots temperature and dew point against height or pressure from a radiosonde. On a Stüve diagram, temperature is on the horizontal axis and pressure decreases upward on the vertical axis, with straight dry adiabats. Where the temperature and dew point lines are close together the air is nearly saturated, and clouds are likely. Where they spread far apart, the air is dry. Wind barbs along the side show how wind changes with height.',
          ],
          [
            'Adiabatic lapse rates',
            'A rising parcel of air expands and cools without exchanging heat with its surroundings. Unsaturated air cools at the dry adiabatic rate of about 9.8 °C per kilometer. Once saturated, condensation releases latent heat, so the parcel cools more slowly at the moist adiabatic rate, roughly 4–7 °C per kilometer near the surface. The environmental lapse rate is how fast the surrounding air actually cools with height on a given day.',
          ],
          [
            'Stability',
            'Stability compares a lifted parcel with its environment. If the parcel ends up cooler and denser than its surroundings, it sinks back, and the air is stable. If it ends up warmer and less dense, it keeps rising, and the air is unstable. A steep environmental lapse rate, greater than the dry rate, is absolutely unstable. A lapse rate between the moist and dry rates is conditionally unstable: unstable only if the air becomes saturated. Temperature inversions are very stable.',
          ],
          [
            'Cloud base and the LCL (State/National)',
            'The lifting condensation level (LCL) is the height at which a parcel lifted dry adiabatically becomes saturated, which marks cloud base. A quick estimate is LCL height in meters ≈ 125 × (temperature − dew point) in °C. A small spread gives low cloud bases, which favor tornadoes because the storm’s rotation is closer to the ground. On a Skew-T, the LCL is where the dry adiabat from the surface temperature meets the mixing ratio line from the surface dew point.',
          ],
          [
            'CAPE and the cap (State/National)',
            'Convective available potential energy (CAPE) measures how much energy a rising parcel gains from being warmer than its environment. On a Skew-T it is the area between the parcel path and the environmental temperature where the parcel is warmer. Values above about 2,500 J/kg indicate strong instability. A warm layer aloft, called a cap or capping inversion, can hold storms back until heating or lifting breaks it, then storms can develop explosively.',
          ],
          [
            'Shear on a sounding',
            'Wind barbs on a sounding show speed and direction at each level. Winds that turn clockwise with height, from southeast at the surface to west aloft, are veering and suggest warm air advection and helicity. Large increases in speed with height give strong bulk shear. When strong instability and strong shear occur together, supercells are likely. Instability without shear tends to produce pulse storms that rain themselves out quickly.',
          ],
        ],
        [
          ['Stüve diagram', 'Thermodynamic chart with temperature across and pressure upward.'],
          ['Dry adiabatic rate', 'About 9.8 °C/km cooling for unsaturated rising air.'],
          ['Moist adiabatic rate', 'Slower cooling of saturated air due to released latent heat.'],
          ['Conditional instability', 'Unstable only if the air becomes saturated.'],
          ['LCL', 'Height where a lifted parcel saturates; the cloud base.'],
          ['CAPE', 'Energy available to a rising parcel warmer than its surroundings.'],
        ],
        [
          'The surface temperature is 30 °C and the dew point is 22 °C. Estimate the LCL and comment on tornado potential.',
          [
            'Spread = 30 − 22 = 8 °C.',
            'LCL ≈ 125 m × 8 = 1,000 m above ground.',
            'Cloud bases near 1 km are fairly low.',
          ],
          'With an LCL near 1,000 m, cloud bases are low enough to support tornadoes if shear and instability are also present.',
        ],
        [
          [
            'Unsaturated air rises and cools at about:',
            '9.8 °C per km',
            ['2 °C per km', '6.5 °C per km always', '20 °C per km'],
            'This is the dry adiabatic lapse rate.',
          ],
          [
            'On a sounding, temperature and dew point lines close together indicate:',
            'Nearly saturated air',
            ['Very dry air', 'An inversion', 'Strong wind'],
            'A small spread means the air is close to saturation.',
          ],
          [
            'An environmental lapse rate between the moist and dry rates is:',
            'Conditionally unstable',
            ['Absolutely stable', 'Absolutely unstable', 'Always neutral'],
            'It is unstable only for saturated parcels.',
          ],
        ],
        [
          [
            'Explain why saturated air cools more slowly as it rises.',
            'Condensation releases latent heat, which partly offsets the cooling from expansion.',
          ],
          [
            'Describe how a capping inversion affects storm development.',
            'Warm air aloft stops parcels from rising, suppressing storms. If heating or lifting breaks the cap, the stored instability can be released suddenly, producing strong storms.',
          ],
          [
            'Why do low LCLs favor tornadoes?',
            'Low cloud bases mean the storm’s rotating updraft and cold outflow are closer to the ground, which makes it easier for rotation to reach the surface.',
          ],
          [
            'What combination of sounding features most favors supercells?',
            'High CAPE (strong instability) together with strong, veering vertical wind shear.',
          ],
        ],
        [
          ['Lift', 'A parcel cools dry adiabatically to its LCL.'],
          ['Saturate', 'Above the LCL it cools moist adiabatically, releasing heat.'],
          ['Compare', 'Warmer than the environment means unstable and rising.'],
        ],
        [
          [
            'Stable layer',
            'Parcel cooler than environment',
            'Inversions can still be broken by strong lifting.',
          ],
          [
            'Conditional instability',
            'Unstable once saturated',
            'Needs a lifting mechanism to start.',
          ],
          [
            'High CAPE',
            'Strong buoyant energy for updrafts',
            'A cap or weak shear can limit storms.',
          ],
        ],
        'Predict whether the sounding supports storms, then check each layer.',
        'Stability is a comparison between a parcel and its environment, not a property of one temperature.',
      ),
      investigation: evidence(
        [
          ['Surface', 'Temperature 32 °C, dew point 23 °C.'],
          ['Layer near 850 mb', 'A thin warm layer: temperature rises with height.'],
          ['Above 700 mb', 'Temperature drops steeply with height.'],
          ['Afternoon', 'A front lifts the air by midafternoon.'],
        ],
        'What is the most likely outcome?',
        [
          'No storms ever form',
          'Storms form once the cap is broken',
          'Fog forms all day',
          'Snow showers',
        ],
        1,
        'The warm layer is a cap that suppresses storms. Steep lapse rates aloft store instability, and frontal lifting can break the cap, releasing strong storms.',
      ),
    },
    {
      ...c(
        'Ingredients for severe weather: air masses, fronts, jets, and terrain',
        [
          'Identify air masses, fronts, and drylines on maps.',
          'Explain how jet streams, shear, and atmospheric rivers drive storms.',
          'Describe how oceans and landforms strengthen or weaken storms.',
        ],
        [
          [
            'Air masses',
            'An air mass is a large body of air with similar temperature and moisture, named for its source. Maritime tropical (mT) air from the Gulf of Mexico is warm and humid. Continental polar (cP) air from Canada is cold and dry. Continental tropical (cT) air from the desert Southwest and Mexico is hot and dry. Severe storms in the central United States often form where these air masses meet and contrast sharply.',
          ],
          [
            'Fronts and drylines',
            'A front is the boundary between air masses. A cold front advances as dense cold air wedges under warm air, forcing rapid lifting and often a line of storms. A warm front rises gently over cooler air, giving widespread clouds and steady precipitation. A stationary front barely moves, and an occluded front forms when a cold front overtakes a warm front. A dryline separates moist mT air from dry cT air, often in west Texas and Oklahoma, and is a common trigger for supercells.',
          ],
          [
            'Jet streams and large-scale patterns',
            'Jet streams are narrow bands of fast wind near the top of the troposphere, strongest where temperature contrasts are large. The polar jet often steers storm systems. Air spreading apart at jet level, especially near a jet streak, causes air below to rise and surface pressure to fall, helping low-pressure systems strengthen. A low-level jet carries warm, moist air northward at night, which feeds storms on the Plains.',
          ],
          [
            'Shear and atmospheric rivers',
            'Wind shear tilts thunderstorm updrafts away from their downdrafts, so a storm does not choke on its own rain-cooled air, and turning shear helps updrafts rotate. Atmospheric rivers are long, narrow corridors of concentrated water vapor, often thousands of kilometers long. When one strikes mountains, as on the U.S. West Coast, the air is forced upward and can produce extreme rain and flooding over several days.',
          ],
          [
            'Oceans and large water bodies',
            'Oceans supply heat and moisture. Warm water with high heat content fuels hurricanes, and the depth of warm water matters because storms churn up cooler water from below. A storm’s wake can leave a trail of cooler water that weakens a following storm. Fetch, the distance wind blows over open water, controls wave height and moisture pickup; long fetch over the Great Lakes drives lake-effect snow bands.',
          ],
          [
            'Landforms and topography',
            'Mountains force air upward on their windward side, increasing rain and snow, while the leeward side is drier in a rain shadow. Terrain can channel winds through gaps and valleys and cause intense downslope winds. Over land, hurricanes lose their warm-water energy source and weaken, while rough terrain can tear their circulation apart. Flat, open plains allow contrasting air masses to collide, which helps explain Tornado Alley.',
          ],
        ],
        [
          ['Air mass', 'A large body of air with uniform temperature and humidity.'],
          ['Cold front', 'Boundary where cold air advances and lifts warm air sharply.'],
          ['Dryline', 'Boundary between moist and dry air masses of similar temperature.'],
          ['Jet streak', 'A region of fastest winds within a jet stream.'],
          ['Atmospheric river', 'A narrow corridor of concentrated water vapor transport.'],
          ['Fetch', 'Distance wind travels over open water.'],
        ],
        [
          'On a spring afternoon in Oklahoma, a dryline lies near the Texas border, mT air with dew points near 20 °C is to its east, a strong jet streak passes overhead, and winds turn from southeast at the surface to west aloft. Assess the severe weather threat.',
          [
            'The dryline provides lift along a sharp moisture boundary.',
            'Humid mT air east of the dryline provides fuel for strong updrafts.',
            'The jet streak supports rising motion, and turning winds provide shear.',
          ],
          'All ingredients—moisture, instability, lift, and shear—are present, so supercells with tornado potential are likely east of the dryline.',
        ],
        [
          [
            'Which air mass is warm and humid?',
            'Maritime tropical',
            ['Continental polar', 'Continental tropical', 'Continental arctic'],
            'Maritime means formed over water; tropical means warm.',
          ],
          [
            'A dryline separates air masses that differ mainly in:',
            'Moisture',
            ['Temperature', 'Pressure only', 'Wind speed only'],
            'Drylines mark a sharp change in dew point.',
          ],
          [
            'Why do hurricanes weaken after landfall?',
            'They lose their warm-water energy source',
            ['Land air is too moist', 'The jet stream stops them', 'Coriolis force becomes zero'],
            'Hurricanes are fueled by heat and moisture from warm ocean water.',
          ],
        ],
        [
          [
            'Explain how wind shear helps a thunderstorm last longer.',
            'Shear tilts the updraft so falling rain and its cool downdraft occur away from the updraft, allowing warm inflow to continue.',
          ],
          [
            'Describe how a lake-effect snow band forms.',
            'Cold air crosses a relatively warm lake, picks up heat and moisture over a long fetch, becomes unstable, and drops heavy snow downwind on shore.',
          ],
          [
            'Why are atmospheric rivers a flood threat in mountain regions?',
            'Mountains force the moisture-rich air upward, causing it to cool and release large amounts of rain or snow over a small area for a long time.',
          ],
          [
            'What is a rain shadow?',
            'A dry area on the leeward side of a mountain range where descending air warms and dries after losing moisture on the windward side.',
          ],
        ],
        [
          ['Moisture', 'Warm, humid air supplies fuel.'],
          ['Lift', 'Fronts, drylines, terrain, or jets force air upward.'],
          ['Organize', 'Instability and shear decide how strong storms become.'],
        ],
        [
          ['Cold front', 'Steep, fast lifting', 'Storms form in a narrow line.'],
          ['Warm front', 'Gentle overrunning', 'Widespread but usually less severe weather.'],
          [
            'Dryline',
            'Moisture contrast with similar temperatures',
            'Moves east by day and west at night.',
          ],
        ],
        'Locate the boundary most likely to start storms on the map evidence.',
        'Severe storms need moisture, instability, lift, and shear at the same time and place.',
      ),
      investigation: evidence(
        [
          ['West of the line', 'Temperature 33 °C, dew point 2 °C.'],
          ['East of the line', 'Temperature 31 °C, dew point 21 °C.'],
          ['Wind shift', 'Southwest winds west of the line, southeast winds east.'],
        ],
        'What boundary is this?',
        ['Cold front', 'Warm front', 'Dryline', 'Occluded front'],
        2,
        'Temperatures are similar on both sides but dew points differ sharply, which defines a dryline.',
      ),
    },
    {
      ...c(
        'Thunderstorms and lightning',
        [
          'Describe the life cycle of an ordinary thunderstorm.',
          'Compare single-cell, multicell, supercell, and MCC storms.',
          'Explain cloud electrification and types of lightning.',
        ],
        [
          [
            'What makes a storm severe',
            'The U.S. National Weather Service calls a thunderstorm severe when it produces hail at least 1 inch in diameter, wind gusts of at least 58 mph (50 knots), or a tornado. Every thunderstorm needs moisture, instability, and a lifting mechanism. What makes some storms severe is organization, mostly controlled by wind shear. Cumulonimbus clouds, with anvil tops spreading out at the tropopause, are the cloud type to identify.',
          ],
          [
            'Life cycle of a single cell',
            'An ordinary single-cell storm has three stages. In the cumulus stage, a warm updraft builds the cloud upward. In the mature stage, precipitation grows heavy enough to fall, dragging air down and cooling it by evaporation, so updraft and downdraft exist side by side, with the heaviest rain, lightning, and gusts. In the dissipating stage, the downdraft cuts off the updraft, and the storm rains itself out, usually within an hour.',
          ],
          [
            'Multicell storms and squall lines',
            'Multicell storms are clusters of cells at different stages. The cold outflow of one cell lifts warm air to form a new cell, usually on one flank. Multicell lines, or squall lines, can stretch hundreds of kilometers along a front, with a gust front leading the line. They can produce damaging winds and brief tornadoes, and they often move faster than individual cells.',
          ],
          [
            'Supercells and MCCs',
            'A supercell has a long-lived rotating updraft called a mesocyclone, made possible by strong, turning shear. It can last for hours and produces most large hail and violent tornadoes. Radar shows a hook echo and a weak-echo region where the strong updraft keeps rain from forming. A mesoscale convective complex (MCC) is a huge, nearly circular cluster of storms, often over 100,000 km² of cold cloud tops, that forms at night and brings widespread heavy rain and wind.',
          ],
          [
            'Charging a cloud',
            'Lightning comes from charge separation. In the mixed-phase region of a storm, graupel (soft hail) collides with small ice crystals in the presence of supercooled water. The collisions transfer charge: in the usual case the heavier graupel becomes negative and stays low, while light ice crystals become positive and are carried to the top. The result is a positive cloud top, a main negative region in the middle, and often a small positive region near the base.',
          ],
          [
            'Types of lightning and detection',
            'Most lightning is intracloud. Cloud-to-ground lightning usually begins with a stepped leader moving down from the negative region, met by a positive streamer from the ground, followed by a bright return stroke. Positive cloud-to-ground strikes come from the anvil, carry more current, and can strike far from the storm. Heating of air to about 30,000 °C makes it expand explosively, producing thunder. Lightning detection networks locate strikes by timing radio signals at several sensors.',
          ],
        ],
        [
          ['Severe thunderstorm', 'Storm with hail ≥1 inch, gusts ≥58 mph, or a tornado.'],
          ['Gust front', 'Leading edge of a storm’s cold outflow.'],
          ['Mesocyclone', 'A rotating updraft in a supercell.'],
          ['MCC', 'A very large, long-lived, nearly circular cluster of storms.'],
          ['Graupel', 'Soft hail formed when supercooled droplets freeze onto ice.'],
          [
            'Return stroke',
            'The bright main lightning flash after a leader connects to the ground.',
          ],
        ],
        [
          'You see a flash and hear thunder 12 seconds later. How far away is the lightning, and are you safe outdoors?',
          [
            'Sound travels about 343 m/s, roughly 1 km every 3 seconds (1 mile every 5 seconds).',
            '12 s ÷ 3 s/km ≈ 4 km (about 2.4 miles).',
            'Lightning can strike more than 15 km from a storm.',
          ],
          'The strike was about 4 km away. If you can hear thunder, you are close enough to be struck, so go indoors.',
        ],
        [
          [
            'Which feature defines a supercell?',
            'A rotating updraft (mesocyclone)',
            ['A gust front', 'A single short-lived cell', 'A warm front'],
            'Supercells are defined by their persistent rotating updraft.',
          ],
          [
            'In the dissipating stage of a single-cell storm:',
            'The downdraft dominates',
            ['The updraft strengthens', 'The cloud is still growing', 'Rain has not begun'],
            'Cool downdraft air cuts off the warm updraft.',
          ],
          [
            'In the usual charge structure, the upper part of a thunderstorm is:',
            'Positively charged',
            ['Negatively charged', 'Neutral', 'Charged only during rain'],
            'Light positive ice crystals are carried to the top.',
          ],
        ],
        [
          [
            'Explain how a multicell storm keeps producing new cells.',
            'Cold outflow from mature cells spreads out as a gust front that lifts warm, moist air, starting new updrafts along the flank.',
          ],
          [
            'Why are positive cloud-to-ground lightning strikes especially dangerous?',
            'They come from the high anvil, carry more current and last longer, and can strike far from the main storm where people feel safe.',
          ],
          [
            'Describe how graupel and ice crystals separate charge.',
            'Collisions in the presence of supercooled water transfer charge. Heavier graupel usually becomes negative and stays low; small ice crystals become positive and rise.',
          ],
          [
            'What weather does an MCC usually bring, and when?',
            'Widespread heavy rain, flooding, and gusty winds, usually overnight on the Plains in summer.',
          ],
        ],
        [
          ['Cumulus', 'Updraft builds the cloud.'],
          ['Mature', 'Updraft and downdraft coexist; heaviest weather.'],
          ['Dissipating', 'Downdraft cuts off the updraft.'],
        ],
        [
          ['Single cell', 'One updraft, weak shear', 'Brief; occasional pulse severe weather.'],
          ['Squall line', 'Line of cells along a gust front', 'Damaging straight-line winds.'],
          ['Supercell', 'Rotating updraft, strong shear', 'Most violent tornadoes and large hail.'],
        ],
        'Classify the storm using the radar and life-cycle evidence.',
        'Shear organizes storms: the more it organizes them, the longer and more severe they last.',
      ),
      investigation: evidence(
        [
          ['Duration', 'The storm has lasted three hours.'],
          ['Radar', 'A hook echo and a bounded weak-echo region.'],
          ['Velocity', 'Persistent rotation in the mid levels.'],
          ['Reports', 'Hail up to 2.75 inches (baseball size).'],
        ],
        'What type of storm is this?',
        ['Single-cell storm', 'Multicell cluster', 'Supercell', 'Stratiform rain'],
        2,
        'Long duration, a hook echo, a weak-echo region, persistent rotation, and giant hail all indicate a supercell.',
      ),
    },
    {
      ...c(
        'Damaging winds and tornadoes',
        [
          'Distinguish downbursts, derechos, squall lines, and downslope winds.',
          'Describe tornado formation, life cycle, and climatology.',
          'Rate tornadoes with the Fujita and Enhanced Fujita scales and read radar signatures.',
        ],
        [
          [
            'Straight-line winds',
            'Not all storm damage is from tornadoes. Straight-line winds blow outward with little rotation, often from a downdraft. A downburst is a strong downdraft that spreads out on hitting the ground. A microburst affects an area under 4 km across and lasts a few minutes, while a macroburst covers a wider area. Damage from a downburst spreads outward in a starburst pattern, while tornado damage is convergent, with debris thrown inward and in a swirl.',
          ],
          [
            'Derechos and bow echoes',
            'A derecho is a widespread, long-lived windstorm caused by a fast-moving line of storms, with a damage swath typically over 400 km long. On radar, the line often bulges forward into a bow echo, where a rear-inflow jet pushes the line outward. Strongest winds occur at the bow’s apex. Gust fronts appear on radar as thin lines of weak reflectivity ahead of storms. Downslope winds such as the chinook form when strong flow descends the lee side of mountains and warms.',
          ],
          [
            'How tornadoes form',
            'A tornado is a violently rotating column of air in contact with the ground and with a thunderstorm cloud. In supercells, horizontal spin created by wind shear is tilted upward by the updraft into a mesocyclone. Interactions with the rear-flank downdraft can tighten rotation near the ground into a tornado. Most supercells do not produce tornadoes. A landspout or waterspout can form from weaker rotation along boundaries, without a mesocyclone.',
          ],
          [
            'Life cycle, timing, and geography',
            'A tornado typically moves from the organizing stage through a mature stage to a shrinking rope stage before dissipating. Most last only minutes, though rare long-track tornadoes travel over 100 km. In the United States, tornadoes are most common in spring and early summer and in late afternoon and evening, when heating is strongest. The southern and central Plains (Tornado Alley) and the Southeast (Dixie Alley) are hot spots; Southeast tornadoes are often rain-wrapped and at night.',
          ],
          [
            'Rating tornadoes',
            'Tornadoes are rated after the event from the damage they cause, not from measured winds. The original Fujita (F) scale was used before February 1, 2007. The Enhanced Fujita (EF) scale since then uses 28 damage indicators, such as homes, schools, and trees, and degrees of damage to estimate wind. EF0 is about 65–85 mph, EF3 136–165 mph, and EF5 above 200 mph. A tornado that hits only open fields may be rated low even if it was strong.',
          ],
          [
            'Radar signatures',
            'Radar clues build a case for a tornado. A hook echo on reflectivity marks rain wrapping around the mesocyclone. A bow echo marks damaging straight-line winds. A tornadic vortex signature (TVS) is a very tight, strong velocity couplet between adjacent beams. A debris ball is a small, round area of high reflectivity at the hook’s tip, and a matching area of low correlation coefficient confirms that debris has been lofted.',
          ],
        ],
        [
          ['Downburst', 'A strong downdraft spreading out on reaching the ground.'],
          ['Microburst', 'A downburst less than 4 km across.'],
          ['Derecho', 'A long-lived, widespread straight-line windstorm.'],
          ['Bow echo', 'A bowed line of storms on radar marking strong winds.'],
          ['EF scale', 'Damage-based tornado rating used in the U.S. since 2007.'],
          ['TVS', 'Tornadic vortex signature: an intense, tight velocity couplet.'],
        ],
        [
          'A damage survey finds trees in a field all blown down pointing outward from a central point, and a well-built house nearby lost its roof. Was this a tornado?',
          [
            'Debris pointing outward from a center is a divergent pattern.',
            'Tornadoes leave convergent, swirling debris patterns.',
            'Roof loss shows strong winds but does not by itself prove rotation.',
          ],
          'The pattern indicates a downburst (straight-line winds), not a tornado.',
        ],
        [
          [
            'Damage spreading outward in a starburst pattern indicates:',
            'A downburst',
            ['A tornado', 'Hail', 'A dryline'],
            'Downbursts spread outward; tornadoes produce convergent damage.',
          ],
          [
            'The EF scale estimates wind speed from:',
            'Observed damage to indicators',
            ['Direct anemometer readings in the tornado', 'Radar reflectivity', 'Funnel width'],
            'Surveyors match damage indicators and degrees of damage to wind ranges.',
          ],
          [
            'A small round area of high reflectivity at a hook’s tip with low CC suggests:',
            'A debris ball from a tornado',
            ['Light snow', 'Ground clutter only', 'A gust front'],
            'Debris reflects strongly and is irregular, giving low CC.',
          ],
        ],
        [
          [
            'Why can two tornadoes with similar winds get different EF ratings?',
            'Ratings depend on damage. A tornado crossing open fields damages few indicators and may be underrated compared with one striking well-built structures.',
          ],
          [
            'Explain how wind shear helps create a mesocyclone.',
            'Shear produces horizontal rolls of spinning air near the ground. A strong updraft tilts these rolls vertically, creating rotation within the storm.',
          ],
          [
            'Why are Southeast U.S. tornadoes especially dangerous?',
            'They are often hidden by rain, occur at night, form in hilly, forested terrain with poor visibility, and affect many mobile homes.',
          ],
          [
            'Describe the radar signature of a derecho-producing system.',
            'A long line of storms with bow echoes, a rear-inflow notch, and strong outbound or inbound velocities along the leading edge.',
          ],
        ],
        [
          ['Tilt', 'Updraft tilts shear-generated spin into a mesocyclone.'],
          ['Tighten', 'Downdraft interactions focus rotation near the ground.'],
          ['Touch down', 'A rotating column reaches the ground: a tornado.'],
        ],
        [
          ['Microburst', 'Divergent outflow under 4 km', 'Very dangerous to aircraft.'],
          ['Derecho', 'Long, wide straight-line wind swath', 'Damage can rival a weak tornado.'],
          ['Tornado', 'Convergent rotating winds', 'Rated only after a damage survey.'],
        ],
        'Use the survey and radar clues to decide what caused the damage.',
        'Damage patterns and radar signatures, not just wind strength, separate tornadoes from straight-line winds.',
      ),
      investigation: evidence(
        [
          ['Damage path', 'A narrow path 300 m wide and 12 km long.'],
          ['Debris', 'Trees fell in different directions, converging toward the path center.'],
          ['Homes', 'Well-built homes lost exterior walls; interior rooms remained.'],
        ],
        'What is the best rating?',
        ['A microburst, unrated', 'An EF1 tornado', 'An EF3 tornado', 'An EF5 tornado'],
        2,
        'Convergent debris shows a tornado. Loss of exterior walls with interior rooms standing on well-built homes matches EF3 damage; EF5 would sweep homes from foundations.',
      ),
    },
    {
      ...c(
        'Hurricanes, typhoons, and cyclones',
        [
          'Describe tropical cyclone formation, life cycle, and structure.',
          'Apply the Saffir–Simpson scale and explain storm surge.',
          'Explain effects of shear, ENSO, terrain, and pressure systems on tracks and intensity.',
        ],
        [
          [
            'Names and formation',
            'Tropical cyclones are called hurricanes in the Atlantic and eastern Pacific, typhoons in the western Pacific, and cyclones in the Indian Ocean. They need sea-surface temperatures of about 26.5 °C or warmer to a good depth, moist mid-levels, low vertical wind shear, a pre-existing disturbance such as a tropical wave, and enough distance from the equator, usually at least 5°, for the Coriolis effect to start rotation. Atlantic season runs June 1 to November 30, peaking in September.',
          ],
          [
            'Life cycle',
            'A disturbance being watched closely is labeled an Invest. When a closed circulation forms with sustained winds below 39 mph, it is a tropical depression. At 39–73 mph it becomes a tropical storm and receives a name. At 74 mph or more it is a hurricane, and at Category 3 (111 mph) or higher it is a major hurricane. Storms weaken over cool water or land, or become extratropical when they move into the mid-latitudes and gain fronts.',
          ],
          [
            'Structure',
            'At the center is the eye, a calm area of sinking air, often clear, with the lowest pressure. Surrounding it, the eyewall has the strongest winds and heaviest rain in a ring of tall thunderstorms. Spiral rain bands extend outward and can spawn tornadoes, especially in the right-front quadrant relative to motion. Air flows in counterclockwise near the surface in the Northern Hemisphere and out clockwise at the top. Satellite and radar images show the eye, eyewall, and bands clearly.',
          ],
          [
            'Saffir–Simpson scale',
            'The Saffir–Simpson Hurricane Wind Scale rates hurricanes 1 to 5 using sustained wind speed only: Category 1 is 74–95 mph, 2 is 96–110, 3 is 111–129, 4 is 130–156, and 5 is 157 mph or higher. It does not account for storm surge, rainfall, or size. A large, slow Category 1 storm can cause more flooding than a compact Category 4, so impacts must be judged from all hazards, not the category alone.',
          ],
          [
            'Storm surge',
            'Storm surge is an abnormal rise of seawater pushed ashore mainly by a hurricane’s winds, with a smaller contribution from low pressure. Surge height depends on wind strength, storm size, forward speed, angle of approach, and especially the shape of the coast and the slope of the continental shelf: shallow, gently sloping shelves and bays produce higher surges. Surge arriving at high tide adds to the total water level. Surge is historically the deadliest hurricane hazard.',
          ],
          [
            'Steering and intensity',
            'Hurricanes are steered by surrounding winds, especially around the subtropical high. In the Atlantic, storms often move west under the high, then curve north and northeast around its western edge. Strong wind shear tilts and weakens hurricanes. El Niño increases shear over the Atlantic and usually reduces Atlantic hurricane activity, while La Niña reduces shear and favors more storms. Mountainous islands disrupt circulations, and rapid intensification can occur over very warm, deep water.',
          ],
        ],
        [
          ['Tropical depression', 'Closed circulation with winds below 39 mph.'],
          ['Eyewall', 'Ring of strongest winds and storms around the eye.'],
          ['Saffir–Simpson scale', 'Hurricane categories 1–5 based on sustained winds.'],
          ['Storm surge', 'Abnormal rise of seawater pushed ashore by a storm.'],
          ['Wind shear', 'Change of wind with height that tilts and weakens hurricanes.'],
          ['ENSO', 'El Niño–Southern Oscillation, a Pacific ocean–atmosphere cycle.'],
        ],
        [
          'A hurricane with 140 mph sustained winds approaches a coast with a wide, shallow continental shelf at high tide. Rate the storm and assess surge.',
          [
            '140 mph is between 130 and 156 mph: Category 4.',
            'A shallow shelf lets water pile up rather than spread downward, raising surge.',
            'High tide adds to the total water level.',
          ],
          'A major Category 4 hurricane with a very dangerous storm surge, made worse by the shallow shelf and high tide.',
        ],
        [
          [
            'A hurricane with sustained winds of 115 mph is:',
            'Category 3',
            ['Category 2', 'Category 4', 'Category 1'],
            'Category 3 spans 111–129 mph.',
          ],
          [
            'Where are a hurricane’s strongest winds?',
            'In the eyewall',
            ['In the eye', 'In the outer rain bands', 'Far ahead of the storm'],
            'The eyewall’s ring of storms has the fastest winds.',
          ],
          [
            'How does El Niño usually affect Atlantic hurricane activity?',
            'It reduces activity by increasing shear',
            [
              'It increases activity',
              'It has no effect',
              'It warms the Atlantic and doubles storms',
            ],
            'El Niño strengthens upper-level westerly winds over the Atlantic.',
          ],
        ],
        [
          [
            'List the conditions needed for a tropical cyclone to form.',
            'Warm ocean water of about 26.5 °C to a good depth, moist air, low wind shear, a pre-existing disturbance, and a location at least about 5° from the equator.',
          ],
          [
            'Why can a Category 1 hurricane be more destructive than a Category 4?',
            'The scale rates only wind. A large, slow Category 1 storm can produce more rain, flooding, and surge than a small, fast-moving Category 4.',
          ],
          [
            'Explain why the eye is calm and often clear.',
            'Air sinks in the eye, warming and drying, which suppresses clouds; the strong winds are concentrated in the surrounding eyewall.',
          ],
          [
            'Describe a typical Atlantic hurricane track and what controls it.',
            'Storms move west under the subtropical high, then curve north and northeast around its western edge, steered by the surrounding large-scale winds.',
          ],
        ],
        [
          ['Organize', 'A tropical disturbance gains a closed circulation.'],
          ['Intensify', 'Warm water and low shear grow it to a hurricane.'],
          ['Decay', 'Land, cool water, or shear weaken the storm.'],
        ],
        [
          ['Category (wind)', 'Sustained wind speed', 'Ignores surge, rain, and size.'],
          ['Storm surge', 'Wind-driven seawater rise', 'Largest on shallow shelves and bays.'],
          ['Rainfall flooding', 'Slow storms drop extreme rain', 'Can occur far inland.'],
        ],
        'Rate the storm and identify its greatest hazard from the evidence.',
        'The category describes wind only; surge, rain, size, and speed determine the full impact.',
      ),
      investigation: evidence(
        [
          ['Satellite', 'A clear eye surrounded by a ring of very cold cloud tops.'],
          ['Recon aircraft', 'Sustained surface winds of 160 mph.'],
          ['Motion', 'Slowing to 5 mph near the coast.'],
          ['Coast', 'A wide, shallow bay ahead of the storm.'],
        ],
        'Which statement is best supported?',
        [
          'Category 3 with minor surge',
          'Category 5 with extreme surge and rain',
          'Tropical storm with minor rain',
          'Category 4 weakening quickly',
        ],
        1,
        'Winds of 160 mph are Category 5. Slow motion increases rainfall totals, and a shallow bay amplifies storm surge.',
      ),
    },
    {
      ...c(
        'Precipitation, floods, winter storms, drought, and safety',
        [
          'Explain how rain, snow, sleet, freezing rain, and hail form.',
          'Describe flood, winter storm, drought, and heat wave hazards.',
          'Use NWS watches and warnings and apply historic case analysis.',
        ],
        [
          [
            'Forming precipitation',
            'Cloud droplets are tiny and must grow a million times in volume to fall. In warm clouds, collision–coalescence merges droplets of different sizes. In cold clouds, the Bergeron process dominates: ice crystals grow at the expense of supercooled droplets, because saturation vapor pressure is lower over ice. Riming occurs when supercooled droplets freeze onto ice, forming graupel. Aggregation clumps ice crystals into snowflakes. Hail grows in strong updrafts that keep stones aloft while layers of ice accumulate.',
          ],
          [
            'Temperature layers and winter precipitation',
            'The temperature profile decides precipitation type. Snow falls when the whole column is below freezing. Sleet forms when snow melts in a warm layer aloft and refreezes into ice pellets in a deep cold layer near the ground. Freezing rain forms when the cold surface layer is too thin to refreeze the drops, so they freeze on contact, coating roads and power lines. Freezing drizzle comes from small drops in shallow clouds.',
          ],
          [
            'Floods and their impacts',
            'Flash floods rise within hours of intense rain, often from slow or repeating storms. River floods build over days as water drains through large basins. Urban floods occur where pavement prevents infiltration. Heavy rain on steep or burned slopes can trigger mudslides and debris flows. State/National tests use intensity–duration–frequency (IDF) curves: a 100-year storm has a 1% chance of occurring in any year, not once every 100 years exactly.',
          ],
          [
            'Winter storms',
            'A blizzard has sustained winds or frequent gusts of at least 35 mph with blowing snow reducing visibility below a quarter mile for three hours or more. Nor’easters are coastal lows along the U.S. East Coast with strong northeast winds, heavy snow, and coastal flooding. Lake-effect storms produce narrow, intense snow bands downwind of the Great Lakes. Ice storms deposit damaging ice accumulation. Heavy snow loads can collapse roofs, and ice weighs down power lines and trees.',
          ],
          [
            'Drought and heat waves',
            'A drought is a long period of below-normal precipitation that causes water shortages. Meteorological drought refers to rainfall deficits, agricultural drought to soil moisture and crops, and hydrological drought to streams and reservoirs. A heat wave is a period of abnormally hot weather, often under a persistent ridge of high pressure, where sinking air warms and suppresses clouds. High humidity raises the heat index and makes heat waves more dangerous for people.',
          ],
          [
            'Watches, warnings, and historic cases',
            'A National Weather Service watch means conditions are favorable for a hazard, so be prepared. A warning means the hazard is occurring or imminent, so take action now. During tornado warnings, go to an interior room on the lowest floor; for flash floods, move to higher ground and never drive through water; for lightning, go indoors. Rules list historic events such as Hurricane Katrina (2005), the Dust Bowl, the 1993 Storm of the Century, and the April 2011 tornado outbreaks; tests give the data, so analyze rather than memorize.',
          ],
        ],
        [
          ['Bergeron process', 'Ice crystals grow at the expense of supercooled droplets.'],
          ['Collision–coalescence', 'Droplets merge by colliding in warm clouds.'],
          ['Freezing rain', 'Supercooled rain that freezes on contact with surfaces.'],
          ['Flash flood', 'A rapid rise of water within hours of heavy rain.'],
          ['Blizzard', 'Strong wind and blowing snow cutting visibility for hours.'],
          ['Warning', 'A hazard is occurring or imminent: act now.'],
        ],
        [
          'A sounding shows below-freezing air from 3 km to the cloud top, a layer from 1.5 to 3 km at +3 °C, and a shallow layer from the ground to 300 m at −2 °C. What precipitation will reach the ground?',
          [
            'Snow forms in the cold cloud above 3 km.',
            'The warm layer melts the snow into rain.',
            'The cold layer is only 300 m deep, too shallow to refreeze the drops.',
          ],
          'Freezing rain: supercooled drops freeze on contact with the cold ground, a serious ice storm threat.',
        ],
        [
          [
            'Sleet forms when:',
            'Melted snow refreezes in a deep cold layer near the ground',
            ['Snow never melts', 'Rain freezes on contact', 'Hail falls from a supercell'],
            'Ice pellets need a deep enough cold layer to refreeze.',
          ],
          [
            'A tornado warning means:',
            'A tornado is occurring or imminent; take shelter now',
            [
              'Conditions may become favorable later',
              'The storm has ended',
              'Only hail is expected',
            ],
            'Warnings call for immediate action.',
          ],
          [
            'A “100-year flood” has what chance of occurring in any given year?',
            '1%',
            ['100%', '10%', '0.1%'],
            'The return period is the inverse of annual probability.',
          ],
        ],
        [
          [
            'Explain why ice crystals grow at the expense of supercooled droplets.',
            'Saturation vapor pressure is lower over ice than over liquid water, so water vapor deposits onto ice while droplets evaporate.',
          ],
          [
            'Distinguish a watch from a warning.',
            'A watch means conditions are favorable for the hazard; be prepared. A warning means it is happening or about to happen; take action immediately.',
          ],
          [
            'Why are urban areas especially prone to flash flooding?',
            'Pavement and buildings prevent infiltration, so rain runs off quickly into drains and streets, raising water levels rapidly.',
          ],
          [
            'How does a ridge of high pressure cause a heat wave?',
            'Sinking air under the ridge warms by compression and suppresses clouds, allowing strong sunshine and heat to build for days.',
          ],
        ],
        [
          ['Grow', 'Droplets and ice grow by coalescence, Bergeron, riming, or aggregation.'],
          ['Fall', 'Temperature layers decide snow, sleet, freezing rain, or rain.'],
          ['Impact', 'Floods, ice, and snow loads threaten people and structures.'],
        ],
        [
          ['Sleet', 'Refrozen ice pellets', 'Needs a deep cold surface layer.'],
          ['Freezing rain', 'Liquid freezes on contact', 'Ice accumulation downs trees and lines.'],
          ['Flash flood', 'Hours after intense rain', 'Most deaths occur in vehicles.'],
        ],
        'Predict the precipitation type from the temperature layers before checking the evidence.',
        'Follow the falling particle through each layer, and match safety actions to watches versus warnings.',
      ),
      investigation: evidence(
        [
          ['Rainfall', '150 mm fell in three hours over a small hilly basin.'],
          ['Land surface', 'A wildfire burned the slopes last summer.'],
          ['Stream gauge', 'Water rose 3 m in 90 minutes.'],
        ],
        'Which hazard is most likely downstream?',
        [
          'A slow river flood days later',
          'A flash flood with debris flows',
          'A drought',
          'An ice storm',
        ],
        1,
        'Intense rain on a small, steep, burned basin runs off fast; the rapid rise shows a flash flood, and burned slopes favor debris flows.',
      ),
    },
  ],
});
