import type { GlossaryEntries } from './index.ts';

// Remote sensing and space events. Keys: term, then other word forms after "|".
const spaceBasics: GlossaryEntries = {
  'Orbit|orbits|orbiting|orbited|orbital':
    'The curved path of one object around another, held by gravity.',
  'AU|astronomical unit':
    'Astronomical unit: the average Earth–Sun distance, about 150 million km.',
  'Light-year|light-years': 'The distance light travels in a year, about 9.5 trillion km.',
  'Elliptical|ellipse|eccentricity':
    'Shaped like a stretched circle; eccentricity measures how stretched an orbit is.',
  'Kepler’s laws|Kepler':
    'Three rules of orbits: ellipses, equal areas in equal times, and period² ∝ distance³.',
  'Periapsis|apoapsis|perihelion|aphelion':
    'The closest (periapsis) and farthest (apoapsis) points of an orbit.',
  GM: 'Gravitational constant times mass; it sets how strongly a body pulls on things orbiting it.',
  'Wavelength|wavelengths':
    'The distance between wave crests; it sets the colour or type of light.',
  'Spectrum|spectra|spectroscopy':
    'Light spread out by wavelength; its lines reveal what an object is made of.',
  'Doppler shift|Doppler':
    'A change in wavelength from motion: toward us is bluer, away is redder.',
  'Telescope|telescopes': 'An instrument that collects light to see faint, distant objects.',
  JWST: 'The James Webb Space Telescope, an infrared observatory launched in 2021.',
};

export const spaceGlossaries: Record<string, GlossaryEntries> = {
  'remote-sensing': {
    SRTM: 'Shuttle Radar Topography Mission: a 2000 radar survey that made a near-global elevation map.',
    NLCD: 'National Land Cover Database: US land-cover maps made from Landsat.',
    'DEM|elevation model':
      'Digital elevation model: a raster where each pixel holds a ground height.',
    'Electromagnetic spectrum|spectrum':
      'All types of light by wavelength, from radio to gamma rays.',
    'Visible light|visible': 'The wavelengths our eyes see, about 400–700 nm.',
    'NIR|near-infrared':
      'Near-infrared: just beyond red light; healthy leaves reflect it strongly.',
    'SWIR|shortwave infrared|shortwave':
      'Shortwave infrared, beyond near-infrared; it is sensitive to water in leaves and soil.',
    'Thermal infrared|TIR': 'Infrared emitted as heat; used to measure surface temperature.',
    Microwave: 'Long-wavelength radiation that passes through clouds; used by radar.',
    Radar: 'An active sensor that sends microwave pulses and measures the echoes.',
    'SAR|synthetic aperture radar':
      'Radar that combines echoes along the flight path to make sharp images.',
    Backscatter: 'Energy bounced back toward a radar; rough surfaces backscatter more.',
    Roughness: 'How bumpy a surface is compared with the wavelength.',
    Lidar: 'A sensor that times laser pulses to measure distance and height.',
    'Round-trip': 'The time for a pulse to travel out and back, used to find distance.',
    'Active sensor': 'A sensor that sends its own energy, like radar or lidar.',
    'Passive sensor': 'A sensor that records energy from the Sun or the surface itself.',
    'Sensor|sensors|detector|detectors': 'The instrument that records the incoming energy.',
    Platform: 'The vehicle carrying a sensor, such as a satellite, plane or drone.',
    'Pixel|pixels': 'The smallest square of an image, with one value per band.',
    'Mixed pixel|mixed-pixel|subpixel':
      'A pixel covering more than one surface type, so its value is a blend.',
    'Spatial resolution': 'The ground size of one pixel; smaller pixels show finer detail.',
    'Spectral resolution': 'How many bands a sensor has and how narrow they are.',
    'Temporal resolution|revisit': 'How often a sensor images the same place.',
    'Radiometric resolution|radiometric':
      'How many brightness levels a sensor can record (its bit depth).',
    'Band|bands': 'One wavelength range a sensor records as a separate image layer.',
    Multispectral: 'Imaging a few to a dozen broad bands.',
    Hyperspectral: 'Imaging hundreds of narrow, continuous bands.',
    'Panchromatic|pan-sharpening':
      'One wide black-and-white band with fine detail; pan-sharpening uses it to sharpen colour bands.',
    Reflectance: 'The fraction of incoming light a surface reflects.',
    'Spectral signature|signature':
      'The pattern of reflectance across wavelengths that identifies a material.',
    'Red edge': 'The sharp jump in vegetation reflectance between red and near-infrared.',
    NDVI: 'Normalized difference vegetation index, (NIR − Red) ÷ (NIR + Red); higher means greener vegetation.',
    'Index|indices|band-ratio':
      'A formula combining bands to highlight something, such as vegetation or water.',
    NDWI: 'Normalized difference water index, which highlights water.',
    NBR: 'Normalized burn ratio, which highlights burned areas using NIR and SWIR.',
    'True-color|true colour': 'An image showing red, green and blue bands as they look to the eye.',
    'False-color|false colour':
      'An image that shows invisible bands such as NIR as visible colours.',
    Scattering: 'Light bouncing off particles in the air, which adds haze.',
    'Rayleigh scattering':
      'Scattering by gas molecules that affects short (blue) wavelengths most.',
    'Aerosol|aerosols': 'Tiny particles in the air such as smoke, dust and sea salt.',
    'Atmospheric window|windows':
      'Wavelengths that pass through the atmosphere with little absorption.',
    Absorption: 'Energy taken in by a material instead of reflected or passed through.',
    Ozone: 'An oxygen gas (O₃) high in the atmosphere that absorbs ultraviolet light.',
    'Atmospheric correction': 'Removing the haze and glow the atmosphere adds to an image.',
    Illumination: 'How much light falls on the surface, set by sun angle and slope.',
    'Sun glint|glint': 'Bright mirror-like reflection of sunlight off water.',
    'Signal-to-noise|noise':
      'Noise is random error in the signal; a high signal-to-noise ratio means a clean image.',
    'Georeferencing|registration|misalignment':
      'Lining an image up with map coordinates or another image.',
    'Resampling|upsampling': 'Recalculating pixel values on a new grid, such as when resizing.',
    Raster: 'Data stored as a grid of pixels.',
    'Histogram|histogram-based': 'A graph of how many pixels have each brightness value.',
    'Contrast stretch|enhancements':
      'Spreading pixel values across the display range to make features easier to see.',
    'Classification|land-cover': 'Sorting pixels into categories such as water, forest or city.',
    'Supervised classification': 'Classification trained with example pixels whose class is known.',
    'Unsupervised classification':
      'Classification that lets the computer group similar pixels first.',
    'Ground truth|truth': 'Information checked on site, used to train or test a classification.',
    'Accuracy assessment|confusion matrix':
      'Checking a classified map against ground truth to measure errors.',
    'Change detection': 'Comparing images from different dates to find what changed.',
    'Acquisition|acquisition date': 'When the image was taken.',
    Swath: 'The width of ground a sensor images in one pass.',
    'Polar orbit|near-polar|sun-synchronous':
      'A low orbit over the poles that passes each place at the same local time.',
    'Geostationary|geosynchronous':
      'An orbit 36,000 km up that keeps a satellite over one spot on Earth.',
    GOES: 'The US geostationary weather satellites.',
    Landsat: 'A long-running NASA/USGS satellite series imaging Earth since 1972.',
    'Sentinel-2|Sentinel': 'European satellites that image Earth with 10–60 m multispectral bands.',
    MODIS: 'A daily, coarse-resolution NASA sensor on the Terra and Aqua satellites.',
    Albedo: 'The fraction of sunlight a surface reflects.',
    Emissivity: 'How efficiently a surface gives off thermal energy.',
    Canopy: 'The top layer of leaves in a forest or crop.',
    Senescence: 'Leaves ageing and yellowing at the end of a season.',
    Refraction: 'Light bending as it passes from one material to another.',
    'Aerial photography|aerial': 'Photos taken from aircraft.',
    'Digital number|DN': 'The raw value stored in a pixel before converting to reflectance.',
  },
  'solar-system': {
    ...spaceBasics,
    'Planet|planets': 'A large body orbiting the Sun that is round and has cleared its orbit.',
    'Dwarf planet|dwarf|dwarfs':
      'A round body orbiting the Sun that has not cleared its orbit, like Pluto.',
    'Moon|moons': 'A natural satellite orbiting a planet.',
    'Asteroid|asteroids': 'A small rocky body orbiting the Sun, mostly between Mars and Jupiter.',
    'Comet|comets': 'An icy body that grows a glowing tail when it nears the Sun.',
    'Kuiper Belt': 'A region of icy bodies beyond Neptune, home to Pluto.',
    'Oort Cloud': 'A distant, spherical shell of icy bodies that supplies long-period comets.',
    'Terrestrial planet|rocky':
      'A small, dense planet with a rocky surface: Mercury, Venus, Earth, Mars.',
    'Gas giant': 'A large planet made mostly of hydrogen and helium: Jupiter and Saturn.',
    'Ice giant': 'A large planet rich in water, ammonia and methane ices: Uranus and Neptune.',
    Europa: 'Jupiter’s icy moon with a salty ocean under its crust.',
    Ganymede: 'Jupiter’s largest moon, bigger than Mercury, with a buried ocean.',
    Titan: 'Saturn’s largest moon, with a thick atmosphere and lakes of methane and ethane.',
    Enceladus: 'A small Saturn moon that sprays water from its south-pole ocean.',
    Io: 'Jupiter’s volcanic moon, heated by tidal flexing.',
    'Habitable|habitability':
      'Able to support life, usually needing liquid water, energy and the right chemicals.',
    'Habitable zone':
      'The distance from a star where a planet could keep liquid water on its surface.',
    'Subsurface ocean': 'Liquid water under the icy crust of a moon.',
    'Brine|brines|salty': 'Very salty water, which stays liquid at lower temperatures.',
    'Tidal heating|tidal|flexing':
      'Heat made inside a moon as a planet’s gravity squeezes and stretches it.',
    'Tidally locked|locked': 'Always showing the same face to the body it orbits.',
    'Orbital resonance|resonance':
      'Orbits whose periods form a simple ratio, so the bodies tug on each other regularly.',
    'Methane|ethane': 'Simple carbon gases; on Titan they are liquid and form lakes.',
    'Greenhouse effect|greenhouse': 'Gases trapping heat in an atmosphere, warming the surface.',
    Volcanism: 'Volcanic activity.',
    Tesserae: 'Highly deformed, ridged terrain on Venus, among its oldest surfaces.',
    'Crater|craters': 'A bowl-shaped pit made by an impact.',
    'Isotope|isotopes': 'Forms of an element with different numbers of neutrons.',
    Deuterium: 'Heavy hydrogen; its ratio to normal hydrogen tracks where water came from.',
    'Organic|carbon-rich': 'Carbon-based chemistry, not necessarily from life.',
    Biosignature: 'A sign that could be evidence of past or present life.',
    'Exoplanet|exoplanets': 'A planet orbiting a star other than the Sun.',
    'Transit|transits': 'A planet passing in front of its star, dimming it slightly.',
    'Radial velocity|wobbles':
      'Detecting a planet from the star’s back-and-forth wobble in its spectrum.',
    'TRAPPIST-1': 'A nearby small, cool star with seven Earth-sized planets.',
    Orbiter: 'A spacecraft that circles a planet or moon.',
    Lander: 'A spacecraft that sets down on a surface.',
    Probe: 'An uncrewed spacecraft sent to study a body.',
    Flyby: 'A spacecraft passing close to a body without stopping.',
    Cassini: 'NASA/ESA mission that orbited Saturn from 2004 to 2017.',
    Galileo: 'NASA mission that orbited Jupiter from 1995 to 2003.',
    JUICE: 'ESA’s Jupiter Icy Moons Explorer, launched in 2023.',
    'Europa Clipper': 'NASA mission launched in 2024 to study Europa’s ocean.',
    Rosetta: 'ESA mission that orbited and landed on a comet.',
    'OSIRIS-REx|Bennu': 'NASA mission that sampled the asteroid Bennu and returned it to Earth.',
    Jezero: 'The Mars crater, once a lake, explored by the Perseverance rover.',
    MRO: 'Mars Reconnaissance Orbiter, which takes detailed images of Mars.',
    MAVEN: 'NASA orbiter studying how Mars lost its atmosphere.',
    'DAVINCI|VERITAS':
      'Planned NASA missions to Venus: DAVINCI probes the atmosphere, VERITAS maps the surface.',
    NASA: 'The US space agency.',
    ESA: 'The European Space Agency.',
  },
  astronomy: {
    ...spaceBasics,
    'Star|stars|stellar': 'A huge ball of hot gas that shines by nuclear fusion in its core.',
    'Nuclear fusion|fusion':
      'Light nuclei joining into heavier ones, releasing energy; it powers stars.',
    'Main sequence|main-sequence': 'The long, stable stage when a star fuses hydrogen in its core.',
    'H-R diagram|Hertzsprung-Russell':
      'A graph of star luminosity against temperature that shows stages of star life.',
    'Luminosity|luminous|luminosities': 'The total energy a star gives off each second.',
    'Apparent magnitude': 'How bright a star looks from Earth; smaller numbers are brighter.',
    'Absolute magnitude': 'How bright a star would look from 10 parsecs away.',
    'Parsec|parsecs':
      'About 3.26 light-years, the distance at which a star shows 1 arcsecond of parallax.',
    Parallax:
      'A nearby star’s small shift against far stars as Earth orbits, used to find distance.',
    'Arcsecond|arcseconds|arcsec': 'A tiny angle, 1/3600 of a degree.',
    'Lsun|Msun|Rsun|Tsun': 'The Sun’s luminosity, mass, radius and temperature, used as units.',
    'Stefan-Boltzmann law|Stefan|Boltzmann':
      'Luminosity grows with radius squared times temperature to the fourth power: L ∝ R²T⁴.',
    'Wien’s law|Wien': 'Hotter objects give off light peaking at shorter wavelengths.',
    Blackbody: 'An ideal object whose light depends only on its temperature.',
    Photosphere: 'The visible surface of a star.',
    'Hydrostatic equilibrium|hydrostatic':
      'The balance between gravity pulling in and pressure pushing out in a star.',
    'Red giant|giant': 'A large, cool, bright star that has used up the hydrogen in its core.',
    'White dwarf|white dwarfs': 'The hot, dense, Earth-sized core left after a Sun-like star dies.',
    'Neutron star|neutron':
      'An extremely dense remnant of a massive star, made mostly of neutrons.',
    Pulsar: 'A spinning neutron star that sweeps beams of radio waves past Earth.',
    'Black hole': 'A region where gravity is so strong that not even light escapes.',
    'Event horizon|horizon': 'The boundary around a black hole beyond which nothing can escape.',
    'Schwarzschild radius|nonrotating':
      'The event horizon size of a non-rotating black hole, 2GM/c².',
    'Supernova|supernovae':
      'The explosion of a star, either a massive star’s core collapsing or a white dwarf blowing apart.',
    'Core-collapse': 'A supernova from the core of a massive star collapsing.',
    'Type Ia': 'A supernova from a white dwarf exploding; it has a standard peak brightness.',
    'Standard candle|standardized': 'An object of known brightness, used to measure distance.',
    'Light curve|light-curve': 'A graph of an object’s brightness over time.',
    Remnant: 'What is left after a star dies: a white dwarf, neutron star, black hole or nebula.',
    'Nebula|nebulae': 'A cloud of gas and dust in space.',
    'Planetary nebula': 'The glowing gas shell thrown off by a dying Sun-like star.',
    Protostar: 'A forming star still gathering mass from its cloud.',
    'Accretion|accretion disk': 'Matter gathering onto an object, often through a spinning disk.',
    'Binary|binaries': 'Two stars orbiting each other.',
    'Galaxy|galaxies': 'A huge system of stars, gas and dust held by gravity.',
    'Interstellar dust|dust': 'Tiny solid grains between stars that dim and redden light.',
    'Extinction|obscuring': 'Dimming of starlight by dust in the way.',
    'Ionized|ionization': 'Atoms that have lost electrons, often from hot starlight.',
    'H II region': 'Hydrogen gas ionized by hot young stars, glowing red.',
    'Initial mass function|initial-mass':
      'How many stars form at each mass; low-mass stars are far more common.',
    'X-ray|X-rays': 'High-energy light from very hot gas, such as near black holes.',
    Radio: 'The longest wavelengths of light, used to see cold gas and pulsars.',
    Relativistic: 'Moving close to the speed of light.',
    'Logarithmic|log10': 'A scale where each step multiplies by ten.',
  },
};
