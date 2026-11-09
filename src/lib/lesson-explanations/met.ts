// Checkpoint explanations for Meteorology (Division B), keyed by question id.
export const meteorology: Record<string, string> = {
  'met-u1-l1-q1':
    'Water vapor channels sense moisture in the upper troposphere even where there are no clouds. A jet stream shows up as a sharp moist–dry boundary. Visible imagery needs clouds and sunlight, and radar sees precipitation, not clear air.',
  'met-u1-l1-q2':
    'By convention, Doppler velocity shows motion toward the radar (inbound) in green and motion away (outbound) in red. Velocity measures movement, not precipitation, so it cannot show heavy rain or hail directly.',
  'met-u1-l1-q3':
    'Infrared images measure temperature, and air gets colder with height in the troposphere. The coldest, brightest cloud tops therefore reach the highest altitudes, marking tall, strong thunderstorms. Fog is low and relatively warm.',
  'met-u1-l1-q4':
    'Mesonet stations are spaced much more closely than airport ASOS stations. That density lets them catch small features such as outflow boundaries and drylines, where new storms often form, that a sparse network would miss.',
  'met-u1-l1-q5':
    'Base reflectivity shows only the lowest radar scan. Composite reflectivity shows the strongest return from any elevation above each point, so it can reveal hail cores high in the storm that have not yet fallen.',
  'met-u1-l1-q6':
    'Launching radiosondes at the same times everywhere (0000 and 1200 UTC) gives a single, consistent snapshot of the whole atmosphere. Weather maps and computer models need that matched starting data.',
  'met-u1-l1-q7':
    'Correlation coefficient (CC) is high when targets are similar, like raindrops. Low CC means a mix of shapes and sizes, such as tornado debris. It can confirm a tornado on the ground at night, when no one can see it.',
  'met-u2-l1-q1':
    'Station models show the last three digits of pressure without the decimal. Codes above about 500 get a leading 9 and a decimal before the last digit: 984 becomes 998.4 mb. Codes below 500 get a leading 10.',
  'met-u2-l1-q2':
    'In a METAR, two numbers separated by a slash are temperature and dew point in °C, so 31/22 means 31 °C with a 22 °C dew point. Wind is written as direction and speed with KT, such as 31022KT.',
  'met-u2-l1-q3':
    'A long hodograph means wind speed changes a lot with height, which is strong shear. Clockwise curving near the ground means the wind veers with height. Both help storms develop rotating updrafts, favoring supercells.',
  'met-u2-l1-q4':
    'The barb’s shaft points toward the direction the wind is blowing from, with the feathers (flags) on that end. Each full feather is 10 knots, a half feather 5 knots and a pennant 50 knots.',
  'met-u2-l1-q5':
    'TS stands for thunderstorm and RA for rain, so TSRA is a thunderstorm with rain. A plus sign means heavy intensity, so +RA is heavy rain; a minus sign would mean light.',
  'met-u2-l1-q6':
    'Small errors in a model’s starting data grow over time. An ensemble runs many forecasts with slightly different starting conditions. Their spread shows the range of possible outcomes and how much to trust the forecast.',
  'met-u2-l1-q7':
    'A short, straight hodograph means the wind changes little with height, which is weak shear. Weak shear usually gives short-lived single-cell storms rather than organized supercells.',
  'met-u3-l1-q1':
    'Rising unsaturated air expands and cools at the dry adiabatic lapse rate, about 9.8 °C per km. 6.5 °C per km is the average environmental lapse rate, and saturated air cools more slowly than the dry rate.',
  'met-u3-l1-q2':
    'The gap between temperature and dew point (the dewpoint depression) shows how close air is to saturation. When the lines nearly touch, the air is close to saturated and likely cloudy. A wide spread means dry air.',
  'met-u3-l1-q3':
    'If the environment cools faster than the moist rate but slower than the dry rate, unsaturated parcels are stable but saturated parcels are unstable. Stability depends on whether the air is saturated, so it is conditionally unstable.',
  'met-u3-l1-q4':
    'Rising air expands and cools. In saturated air, water vapor condenses, which releases latent heat. That heat partly offsets the cooling, so saturated air cools more slowly (about 6 °C per km) than dry air.',
  'met-u3-l1-q5':
    'A capping inversion is a layer of warm air aloft that stops rising parcels and suppresses storms. Instability builds beneath it. If heating or lifting breaks the cap, that stored energy can be released suddenly in strong storms.',
  'met-u3-l1-q6':
    'The LCL is the cloud-base height. A low LCL means moist air near the ground, so the storm’s rotating updraft and its outflow are close to the surface. That makes it easier for rotation to reach the ground as a tornado.',
  'met-u3-l1-q7':
    'Supercells need fuel and organization. High CAPE gives strong instability for powerful updrafts, and strong, veering vertical wind shear organizes those updrafts into rotating storms. Either ingredient alone is usually not enough.',
  'met-u4-l1-q1':
    'Maritime means the air mass formed over water, so it is humid. Tropical means it formed in warm regions. Maritime tropical air is therefore warm and humid. Continental tropical air is hot but dry.',
  'met-u4-l1-q2':
    'A dryline separates moist air from dry air, so the main difference is moisture, shown by a sharp drop in dew point. Temperatures on each side can be similar, unlike at a cold or warm front.',
  'met-u4-l1-q3':
    'Hurricanes are powered by heat and moisture from warm ocean water. Over land, that supply is cut off and surface friction increases, so the storm weakens. Land air is drier, not moister.',
  'met-u4-l1-q4':
    'Wind shear tilts the updraft. Rain and its cool downdraft then fall away from the updraft instead of straight into it. Warm, moist inflow can keep feeding the storm, so it lasts much longer.',
  'met-u4-l1-q5':
    'Cold air crossing a relatively warm lake picks up heat and moisture from the water. Over a long fetch it becomes unstable and forms clouds. On reaching the downwind shore, it drops heavy snow in narrow bands.',
  'met-u4-l1-q6':
    'Atmospheric rivers carry huge amounts of water vapor. When they hit mountains, the air is forced up, cools and releases heavy rain or snow. This can continue over the same area for days, causing floods.',
  'met-u4-l1-q7':
    'Air rising over the windward side of a mountain cools and drops its moisture. On the leeward side, the air sinks, warms and dries. That dry area behind the mountains is the rain shadow.',
  'met-u5-l1-q1':
    'A supercell is defined by a persistent rotating updraft called a mesocyclone. Gust fronts occur with many kinds of storms, and a single short-lived cell is the opposite of a supercell.',
  'met-u5-l1-q2':
    'In the dissipating stage, the cool downdraft dominates and cuts off the warm updraft that fed the storm. The cloud stops growing and rain gradually weakens. A strengthening updraft belongs to the earlier stages.',
  'met-u5-l1-q3':
    'In the usual structure, small, light ice crystals become positively charged and are carried to the top of the storm. Heavier graupel becomes negative and stays lower. So the upper part is positive.',
  'met-u5-l1-q4':
    'Cold outflow from mature cells spreads along the ground as a gust front. It lifts warm, moist air ahead of it, starting new updrafts on the storm’s flank. New cells keep forming as old ones die out.',
  'met-u5-l1-q5':
    'Positive cloud-to-ground strikes come from the high anvil. They carry more current, last longer and can hit many kilometers from the main storm, where people think they are safe.',
  'met-u5-l1-q6':
    'When graupel and ice crystals collide in the presence of supercooled water, charge is transferred. Heavier graupel usually becomes negative and stays lower; light ice crystals become positive and are lifted higher, separating the charges.',
  'met-u5-l1-q7':
    'A mesoscale convective complex (MCC) is a huge, organized cluster of storms. It usually brings widespread heavy rain, flooding and gusty winds, and typically develops overnight over the Plains in summer.',
  'met-u6-l1-q1':
    'A downburst is a strong downdraft that hits the ground and spreads outward, leaving damage that fans out in a starburst pattern. A tornado’s winds spin inward, leaving convergent or swirled damage.',
  'met-u6-l1-q2':
    'The Enhanced Fujita scale rates tornadoes by damage. Surveyors match damage indicators (such as homes or trees) and the degree of damage to estimated wind speeds. Direct wind measurements inside tornadoes are rarely available.',
  'met-u6-l1-q3':
    'Debris lofted by a tornado reflects strongly, creating a small, round area of high reflectivity at the tip of the hook. Its mixed shapes and sizes give low correlation coefficient. Together they suggest a debris ball.',
  'met-u6-l1-q4':
    'EF ratings come from damage, not measured winds. A tornado crossing empty fields hits few damage indicators, so it may be rated lower than an equally strong tornado striking well-built structures.',
  'met-u6-l1-q5':
    'Wind shear near the ground creates horizontal rolls of spinning air. A strong updraft tilts those rolls upright, turning the horizontal spin into vertical rotation inside the storm: a mesocyclone.',
  'met-u6-l1-q6':
    'Southeast tornadoes are often wrapped in rain, happen more often at night and form in hilly, forested areas with poor visibility. The region also has many mobile homes, which offer little protection.',
  'met-u6-l1-q7':
    'A derecho shows on radar as a long line of storms with bow echoes. A rear-inflow notch marks strong winds feeding in from behind, and velocity data show very strong winds along the leading edge.',
  'met-u7-l1-q1':
    'On the Saffir–Simpson scale, Category 3 covers sustained winds of 111–129 mph. At 115 mph the storm is Category 3. Category 4 begins at 130 mph.',
  'met-u7-l1-q2':
    'The strongest winds are in the eyewall, the ring of intense thunderstorms around the eye. The eye itself is calm, and outer rain bands have weaker winds.',
  'met-u7-l1-q3':
    'El Niño strengthens upper-level westerly winds over the Atlantic. That increases vertical wind shear, which tears apart developing hurricanes, so Atlantic activity is usually reduced.',
  'met-u7-l1-q4':
    'Tropical cyclones need ocean water of at least about 26.5 °C to a good depth, moist air, low wind shear, a pre-existing disturbance and a location at least about 5° from the equator so the Coriolis effect can start rotation.',
  'met-u7-l1-q5':
    'The Saffir–Simpson scale rates only wind speed. A large, slow Category 1 storm can produce far more rain, flooding and storm surge than a small, fast-moving Category 4, so it can be more destructive.',
  'met-u7-l1-q6':
    'In the eye, air sinks and warms by compression, which dries it and stops clouds from forming. The strong winds are concentrated in the surrounding eyewall, so the eye is calm and often clear.',
  'met-u7-l1-q7':
    'Atlantic hurricanes usually move west on the south side of the subtropical high, then curve north and northeast around its western edge. Large-scale steering winds control the track.',
  'met-u8-l1-q1':
    'Sleet forms when snow falls through a warm layer, melts, and then passes through a deep cold layer near the ground where it refreezes into ice pellets. If the cold layer is too shallow, the rain freezes on contact instead, which is freezing rain.',
  'met-u8-l1-q2':
    'A tornado warning means a tornado is happening or about to happen, so take shelter immediately. A watch means conditions are favorable for tornadoes later.',
  'met-u8-l1-q3':
    'A "100-year flood" has a 1 in 100 chance, or 1%, of happening in any given year. The return period is the inverse of the yearly probability. It does not mean the flood happens only once a century.',
  'met-u8-l1-q4':
    'Saturation vapor pressure is lower over ice than over liquid water. Air saturated for water droplets is supersaturated for ice, so vapor deposits onto ice crystals while the droplets evaporate. The ice grows at the droplets’ expense.',
  'met-u8-l1-q5':
    'A watch means conditions are favorable for the hazard, so be prepared. A warning means the hazard is happening or imminent, so take action immediately.',
  'met-u8-l1-q6':
    'Pavement and buildings stop rain from soaking into the ground. Water runs off quickly into streets and drains, which can overflow fast, so water levels rise rapidly during heavy rain.',
  'met-u8-l1-q7':
    'Under a ridge of high pressure, sinking air warms by compression and suppresses clouds. Strong sunshine then heats the ground day after day, so heat builds into a heat wave.',
};
