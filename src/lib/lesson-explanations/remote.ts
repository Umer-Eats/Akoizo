// Checkpoint explanations for Remote Sensing, keyed by question id.
export const remoteSensing: Record<string, string> = {
  'remote-u1-l1-q1':
    'An optical sensor measures how much energy reaches it in each wavelength band. Properties like species, land use or climate causes are inferred from those numbers with calibration and other evidence; the sensor never records them directly.',
  'remote-u1-l1-q2':
    'A field plot might cover a few square meters, while one pixel can cover 900 m² or more and blend several surfaces. They measure different areas (different spatial support), so a mixed pixel can legitimately disagree with a small plot.',
  'remote-u1-l1-q3':
    'Comparing two dates is fair only if both images are in the same physical units (such as surface reflectance) and you know the acquisition conditions: sun angle, viewing geometry, season and atmosphere. File names and display settings tell you nothing about the measurement.',
  'remote-u1-l1-q4':
    'Sunlight passes through the atmosphere, reflects off the target, passes through the atmosphere again and reaches the sensor, which records a signal. Calibration and atmospheric correction convert that signal into a product that can then be interpreted. A full answer names each step in order.',
  'remote-u1-l1-q5':
    'Calibration converts raw sensor counts into physical units such as radiance or reflectance, which defines the measurement. A display stretch only changes how those values appear on screen to improve contrast; the stored values stay the same.',
  'remote-u1-l1-q6':
    'The question decides what you need to measure, which wavelengths, resolution and dates to use, and how to check the result. An index chosen because it is easy may not tell apart the possibilities that actually matter.',
  'remote-u1-l1-q7':
    'One pixel can blend several surfaces, and its value is affected by atmosphere, shadows and sun angle. A high vegetation index shows strong NIR/red contrast, not which plant species is there or why a plant is stressed.',
  'remote-u2-l1-q1':
    'An active sensor sends out its own energy and measures what comes back. Radar emits microwave pulses, so it works at night and through cloud. Cameras and thermal radiometers are passive: they detect sunlight or emitted heat from the scene.',
  'remote-u2-l1-q2':
    'The measured time covers the pulse going out to the target and coming back, so c × t is twice the distance. Dividing by 2 gives the one-way range: range = c·t ÷ 2.',
  'remote-u2-l1-q3':
    'Brightness in a radar image means a strong return signal, nothing more. Rough surfaces, buildings that bounce the signal straight back, wet soil and slopes facing the sensor can all be bright, so color, height or temperature cannot be read from it.',
  'remote-u2-l1-q4':
    'Range = c × t ÷ 2 = (3 × 10⁸ m/s × 10 × 10⁻⁶ s) ÷ 2 = 3,000 m ÷ 2 = 1,500 m. Convert microseconds to seconds (× 10⁻⁶) first, and halve because the pulse travels there and back.',
  'remote-u2-l1-q5':
    'Yes. A thermal sensor detects infrared radiation that surfaces emit because they are warm. That emission continues at night, so no sunlight is needed. Clouds still block the view of the ground, however.',
  'remote-u2-l1-q6':
    'Lidar records the height of each laser return. Returns from the top of the canopy are compared with returns classified as bare ground; the difference is canopy height. Errors in classifying ground points, positioning or sparse sampling add uncertainty.',
  'remote-u2-l1-q7':
    'Optical sensors measure reflected light and radar measures microwave backscatter, so they respond to different properties. Images may also differ in date, pixel size and viewing angle. Align them first, then state what each one contributes as evidence.',
  'remote-u3-l1-q1':
    'A storm can change within hours, so you need images taken close together in time (high temporal resolution), such as from a geostationary satellite. One sharp image shows a single moment and cannot show how the storm develops.',
  'remote-u3-l1-q2':
    'A sun-synchronous satellite passes over each place at about the same local solar time, giving consistent lighting. It still orbits the whole Earth, so it sees any one location only on certain passes, often days apart, and clouds can block it.',
  'remote-u3-l1-q3':
    'Optical sensors cannot see through clouds. Even if a satellite passes overhead every few days, cloudy passes give no usable ground data, so the effective time between clear views can be much longer.',
  'remote-u3-l1-q4':
    'Swath is the width of ground covered in one pass; pixel size is the ground area represented by one pixel. A sensor with a wide swath often has larger pixels, which is a design tradeoff, but they measure different things.',
  'remote-u3-l1-q5':
    'Different sensors use slightly different wavelength bands, calibrations, viewing angles and pixel sizes. Combining them without adjustment can make values jump between sensors, which looks like real change but is an artifact.',
  'remote-u3-l1-q6':
    'A cloudy scene means the surface was not observed that day. It does not show that nothing changed underneath; something could have happened and been hidden. Treat it as missing data.',
  'remote-u3-l1-q7':
    'A brief flood needs frequent images, timed to capture the peak, not just the aftermath. Radar sees through clouds that often come with floods. Check the quality of each image and align geometry so before and after can be compared.',
  'remote-u4-l1-q1':
    'A false-color composite assigns chosen bands, such as NIR, red and green, to the red, green and blue display channels. Which band goes to which channel decides what color each surface appears; changing the assignment changes the colors.',
  'remote-u4-l1-q2':
    'If each date is stretched separately, the same displayed color can represent different measured values. Areas may look changed or unchanged because of display settings, not the surface. Use the same stretch or compare the underlying values.',
  'remote-u4-l1-q3':
    'If two images are not aligned exactly, edges such as field or shoreline boundaries shift between them. Subtracting the images then shows "change" along every edge even when nothing actually moved.',
  'remote-u4-l1-q4':
    'Healthy plants reflect strongly in near-infrared. In a standard false-color composite, NIR is shown in the red display channel, so vegetation appears bright red. The plants are not physically red.',
  'remote-u4-l1-q5':
    'Water absorbs near-infrared strongly, so it looks dark. Shadow also looks dark because little light reaches it. To tell them apart, use context (shape, location, terrain) and other bands, such as visible bands where shadows and water differ.',
  'remote-u4-l1-q6':
    'Pan-sharpening combines a sharp panchromatic band with coarser color bands. The result looks crisper, but it can change the relative values of the bands, so an index such as NDVI calculated from it may differ from one calculated from the original bands.',
  'remote-u4-l1-q7':
    'High NIR with low red reflectance fits a pixel with a lot of vegetation. That pattern cannot reveal the species, how healthy the plants are or why. A careful statement says what the data are consistent with and what further evidence is needed.',
  'remote-u5-l1-q1':
    'A square pixel’s area is its side length squared: 30 m × 30 m = 900 m². Doubling or multiplying by 10 confuses area with perimeter or length.',
  'remote-u5-l1-q2':
    'Each bit doubles the number of possible values, so n bits give 2ⁿ levels. 8 bits give 2⁸ = 256 levels, from 0 to 255. 4,096 would be 12-bit data.',
  'remote-u5-l1-q3':
    'Upsampling splits each pixel into smaller display pixels by interpolating between existing values. It adds no new measurements: mixed pixels stay mixed and no new detail or bands are created.',
  'remote-u5-l1-q4':
    'With equal parts of the two surfaces, the mixed NIR is the average: (0.6 + 0.3) ÷ 2 = 0.45. A linear mixing model weights each surface’s reflectance by the fraction of the pixel it covers.',
  'remote-u5-l1-q5':
    'NDVI is a ratio, (NIR − red) ÷ (NIR + red), so it does not average linearly. In a mixed pixel the sensor averages the reflectances, so mix the band values first and then compute NDVI from those mixed values.',
  'remote-u5-l1-q6':
    'Spectral resolution is how finely a sensor separates wavelengths (number and width of bands). Radiometric resolution is how finely it separates brightness levels within a band, often set by bit depth. One divides the spectrum; the other divides the signal.',
  'remote-u5-l1-q7':
    'A river narrower than one pixel only partly fills the pixels it crosses, so they mix water with bank and vegetation. Classification and width measurements at that scale are uncertain, and the description should say so.',
  'remote-u6-l1-q1':
    'NDVI = (NIR − red) ÷ (NIR + red) = (0.6 − 0.2) ÷ (0.6 + 0.2) = 0.4 ÷ 0.8 = 0.5. Dividing NIR by red alone (0.6 ÷ 0.2 = 3) is a simple ratio, not NDVI.',
  'remote-u6-l1-q2':
    'If both are zero, NDVI becomes 0 ÷ 0, which has no defined value. It does not mean bare soil or any particular cover. This usually signals missing data, shadow or a processing problem, and those pixels should be flagged.',
  'remote-u6-l1-q3':
    'EVI = 2.5(NIR − red) ÷ (NIR + 6·red − 7.5·blue + 1). The "+1" assumes reflectance values from 0 to 1. If bands are stored as integers (for example 0–10,000), the constant becomes negligible and the result is wrong unless the bands are rescaled.',
  'remote-u6-l1-q4':
    'At 1:50,000, 1 cm on the map is 50,000 cm on the ground. 3 cm × 50,000 = 150,000 cm. Divide by 100,000 cm per km to get 1.5 km.',
  'remote-u6-l1-q5':
    'EVI = 2.5 × (NIR − red) ÷ (NIR + 6·red − 7.5·blue + 1). With the example values (as reflectance fractions), NIR − red = 0.4 and the denominator works out to 2.05, so EVI = 2.5 × 0.4 ÷ 2.05 ≈ 0.488.',
  'remote-u6-l1-q6':
    'Latitude is an angle. One degree of latitude is roughly 111 km but varies slightly because Earth is not a perfect sphere, and a degree of longitude shrinks toward the poles (about 111 km × cos latitude). Converting to meters needs a stated method or projection.',
  'remote-u6-l1-q7':
    'An NDVI of 0.5 means NIR is clearly higher than red, which fits a pixel with substantial vegetation. It does not identify the crop or forest type, its health or why it looks that way. Those need more evidence.',
  'remote-u7-l1-q1':
    'In a vacuum, c = wavelength × frequency, and c is constant. If wavelength doubles, frequency must halve to keep the product the same. Frequency and wavelength are inversely proportional.',
  'remote-u7-l1-q2':
    'In Snell’s law, angles are measured from the normal, a line perpendicular to the surface. Measuring from the surface itself gives the complement of the correct angle and wrong results.',
  'remote-u7-l1-q3':
    'Incoming energy is reflected, transmitted or absorbed, so the three fractions add to 1. Absorptance = 1 − 0.3 − 0.2 = 0.5.',
  'remote-u7-l1-q4':
    'One nanometer is 10⁻⁹ m, so 500 nm = 500 × 10⁻⁹ m = 5 × 10⁻⁷ m. This is green visible light.',
  'remote-u7-l1-q5':
    'Snell’s law: n₁ sin θ₁ = n₂ sin θ₂. With n₁ = 1, n₂ = 1.5 and θ₁ = 30°: sin θ₂ = (1 ÷ 1.5) × 0.5 ≈ 0.333, so θ₂ ≈ 19.5° from the normal. Light bends toward the normal entering the denser medium.',
  'remote-u7-l1-q6':
    'Sun glint (mirror-like reflection toward the sensor), suspended sediment, mixing with nearby land in the same pixel and the choice of wavelength can all make water look bright. Check the viewing geometry and surroundings before deciding it is not water.',
  'remote-u7-l1-q7':
    'Atmospheric correction estimates how much of the signal came from the air (haze, scattering, absorption) and removes it. That estimate relies on models and imperfect measurements, so some uncertainty always remains in the corrected values.',
  'remote-u8-l1-q1':
    'Albedo is the fraction of incoming sunlight a surface reflects. Whatever is not reflected is absorbed: 1 − 0.3 = 0.7, so 70% is absorbed.',
  'remote-u8-l1-q2':
    'Longwave radiation is the infrared heat emitted by Earth’s surface and atmosphere. Greenhouse gases absorb and re-emit this radiation, which is the core of the greenhouse effect. Display settings, interpolation and map projections have nothing to do with it.',
  'remote-u8-l1-q3':
    'One hot image records conditions at one time and place, influenced by that day’s weather. Detecting a climate trend or its cause requires a long, consistent record and other evidence.',
  'remote-u8-l1-q4':
    'Absorbed flux = incoming × (1 − albedo) = 400 W/m² × (1 − 0.6) = 400 × 0.4 = 160 W/m². The other 240 W/m² is reflected.',
  'remote-u8-l1-q5':
    'Earth intercepts sunlight over a disk of area πR², but that energy is spread over the whole sphere, area 4πR². Dividing gives S/4, the sunlight averaged over the entire surface, day and night.',
  'remote-u8-l1-q6':
    'Warming melts snow and ice, exposing darker land or water. Darker surfaces have lower albedo and absorb more sunlight, which causes more warming and more melt. That self-reinforcing loop is a positive feedback.',
  'remote-u8-l1-q7':
    'Aerosols reduce sunlight reaching the ground (dimming), but they do not all cool everything equally. Dark particles like soot absorb sunlight and warm the air layer they are in, even while the surface below cools. Energy is moved around, not just removed.',
  'remote-u9-l1-q1':
    'A reservoir is an amount stored, such as tonnes of carbon in biomass. A flux is a rate of movement, with "per time" in its units, such as uptake per day or emissions per year.',
  'remote-u9-l1-q2':
    'The stratospheric ozone layer absorbs most of the Sun’s harmful ultraviolet radiation (UV-B and UV-C) before it reaches the surface. It is not a replacement for greenhouse gases, and it has nothing to do with buildings or map scales.',
  'remote-u9-l1-q3':
    'A flood-extent map shows where water was observed. Risk also depends on who and what is in the way (exposure) and how easily they are harmed (vulnerability). Losses and groundwater effects need additional data.',
  'remote-u9-l1-q4':
    'NDVI measures how much more NIR than red a pixel reflects, which relates to green leaf cover. Carbon is also stored in trunks, roots and soil, which NDVI cannot see, and dense canopies saturate it. Estimating carbon needs structural data and calibrated models.',
  'remote-u9-l1-q5':
    'Water-cycle processes include evaporation, transpiration, condensation, precipitation, infiltration, runoff and groundwater flow. A full answer names three and ideally says where water goes in each (for example, infiltration moves surface water into soil).',
  'remote-u9-l1-q6':
    'Column ozone is the total ozone in a vertical column from the ground to the top of the atmosphere, mostly in the stratosphere. Surface concentration is the ozone near the ground. A satellite column value does not tell you the air-quality level people breathe.',
  'remote-u9-l1-q7':
    'Check when each image was taken and how accurate it is, then add terrain (elevation), the location of people, buildings and roads (exposure), and how vulnerable they are. Together these turn a flood map into a risk assessment.',
  'remote-u10-l1-q1':
    'If more bare soil shows between plants, each pixel mixes soil with crop. Soil reflects less NIR relative to red, so NDVI falls even if the plants are healthy. That is why a lower value alone cannot diagnose disease.',
  'remote-u10-l1-q2':
    'Validation data must not be the same examples used to choose the threshold. Testing on fitting data only shows the method fits what it already saw; independent data shows whether it works on new areas.',
  'remote-u10-l1-q3':
    'Crops planted at different times can be at different growth stages on the same date. A field with lower NDVI may simply be younger or already maturing, not stressed. Compare fields at similar stages.',
  'remote-u10-l1-q4':
    'NDVI = (NIR − red) ÷ (NIR + red) = (0.6 − 0.1) ÷ (0.6 + 0.1) = 0.5 ÷ 0.7 = 5/7 ≈ 0.714.',
  'remote-u10-l1-q5':
    'Normal harvest and drought both lower NDVI. Field and harvest records, recent rainfall and temperature, the crop’s growth stage, thermal or soil-moisture data and a site visit can tell them apart.',
  'remote-u10-l1-q6':
    'A field average combines all pixels. If only a small part is damaged, healthy pixels dominate and the mean hardly changes. Mapping values across the field reveals patches the summary hides.',
  'remote-u10-l1-q7':
    'A careful statement reports the measured change (NDVI from about 0.71 to 0.5), names a possible explanation such as less plant cover in the pixel, and says that confirming the cause requires independent evidence.',
  'remote-u2-l1-b-q1':
    'Clouds block the optical view, so radar is needed. Dark radar areas often mean smooth water, but smooth pavement and radar shadow can also be dark. Checking against elevation (water collects low) and ground reports tests the flood interpretation.',
  'remote-u2-l1-b-q2':
    'A complete answer says the optical image is blocked by cloud, radar can see through it, dark radar returns fit flooding but are not unique to water, and elevation plus independent reports are used to confirm.',
  'remote-u2-l1-b-q3':
    'A passive sensor does not send out its own energy. It detects energy from another source: reflected sunlight for optical cameras or heat that surfaces naturally emit for thermal sensors.',
  'remote-u3-l1-b-q1':
    'A storm changes quickly, so the key need is frequent images. Sensor A views the region repeatedly, giving a time sequence. One sharp image from sensor B cannot show how the storm develops.',
  'remote-u3-l1-b-q2':
    'A full answer states the task needs frequent observations, notes sensor A revisits the region often while B gives only occasional detailed images, chooses A, and checks that A’s detail is good enough to see the storm features.',
  'remote-u3-l1-b-q3':
    'An orbit is the curved path a satellite follows around Earth because gravity keeps pulling it toward the planet while its speed carries it forward. The orbit’s height and shape decide how often and how widely it sees the ground.',
  'remote-u6-l1-b-q1':
    'Horizontal distance = 4 map units × 500 m = 2,000 m. Slope = rise ÷ run = 100 m ÷ 2,000 m = 0.05. Multiply by 100 to get 5%. The common mistake is forgetting to convert map distance to ground distance.',
  'remote-u6-l1-b-q2':
    'A full answer converts the map distance to ground distance (4 × 500 = 2,000 m), divides the rise by it (100 ÷ 2,000 = 0.05) and multiplies by 100 to get 5%.',
  'remote-u6-l1-b-q3':
    'Scale compares a distance on the map with the matching distance on the ground. At 1:50,000, 1 cm on the map equals 50,000 cm (500 m) in reality. It is needed to measure real distances and areas from a map.',
  'remote-u7-l1-b-q1':
    'Distance traveled = speed × time = 3 × 10⁸ m/s × 0.004 s = 1,200,000 m. That covers the trip out and back, so the range is half: 600,000 m.',
  'remote-u7-l1-b-q2':
    'A full answer multiplies speed by time (3 × 10⁸ × 0.004 = 1,200,000 m), explains that this includes the return trip, and halves it to get 600,000 m.',
  'remote-u7-l1-b-q3':
    'Wavelength is the distance from one wave crest to the next. For light, c = wavelength × frequency, so longer wavelengths have lower frequencies.',
  'remote-u8-l1-b-q1':
    'The thermal image reads 42 °C for pavement and 28 °C for the nearby surface, so the pavement surface was warmer when the image was taken. It measures surface, not air, temperature, and darker color is only one possible reason.',
  'remote-u8-l1-b-q2':
    'A full answer reads the thermal scale (42 °C versus 28 °C) rather than visible brightness, states the pavement surface was warmer in this image, and avoids claiming one single cause.',
  'remote-u8-l1-b-q3':
    'Albedo is the fraction of incoming sunlight a surface reflects, from 0 (absorbs everything) to 1 (reflects everything). Fresh snow is high and dark pavement is low, so darker surfaces absorb more energy.',
  'remote-u9-l1-b-q1':
    'A dark optical pixel might be water or cloud shadow, so on its own it is weak evidence. When radar data and a ground report also indicate water, those independent sources agree, giving the strongest support for flooding.',
  'remote-u9-l1-b-q2':
    'A full answer notes that optical darkness could be cloud shadow, compares the radar evidence and the ground report, and concludes flooding is supported where independent observations agree.',
  'remote-u9-l1-b-q3':
    'In supervised classification, an analyst first labels sample pixels of known types (water, forest, city). The computer learns their spectral patterns and assigns every other pixel to the closest class. Results still need checking against independent data.',
};
