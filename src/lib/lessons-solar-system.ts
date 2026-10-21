import { buildCourse } from './lesson-course-builder.ts';
import { chapter as c, evidence } from './course-authoring.ts';

// Division B Solar System (2027 theme: habitability), organized from rule 3.a–3.b.
export const solarSystemLessons = buildCourse({
  eventId: 'solar-system',
  eventName: 'Solar System',
  prefix: 'sol',
  division: 'B',
  syllabus: '2027 Science Olympiad Division B Solar System rules (habitability)',
  intro:
    'Seven units follow the 2027 Solar System rules, which center on habitability. You will study what makes a world habitable, the calculator-free math the rules list, the named objects (Venus, Mars, Ganymede, Europa, Enceladus, Titan, Makemake, Bennu, and comet 67P), the three named exoplanet systems, and the listed missions. Tests should stress reasoning with images, graphs, and data over trivia, so every unit practices interpreting evidence.',
  references: [
    { title: 'Science Olympiad: Solar System B', url: 'https://www.soinc.org/solar-system-b' },
    { title: 'NASA Science: Solar System', url: 'https://science.nasa.gov/solar-system/' },
    { title: 'NASA Exoplanet Exploration', url: 'https://exoplanets.nasa.gov/' },
  ],
  chapters: [
    {
      ...c(
        'What makes a world habitable?',
        [
          'List the conditions relevant to habitability.',
          'Explain how a world keeps an atmosphere and stable liquids.',
          'Describe tidal heating and chemical disequilibrium as energy sources.',
        ],
        [
          [
            'Habitable, not inhabited',
            'A habitable environment is one that could support life as we know it; it does not mean life is present. Scientists look for three broad needs: liquid water as a solvent, a source of energy, and the chemical elements life uses, especially carbon, hydrogen, nitrogen, oxygen, phosphorus, and sulfur. A world can be habitable in one place, such as an ocean under ice, and hostile on its surface.',
          ],
          [
            'Temperature and the habitable zone',
            'The habitable zone around a star is the range of distances where a planet with the right atmosphere could keep liquid water on its surface. It lies farther out around hot, bright stars and closer in around cool, dim stars. Distance alone does not decide temperature: albedo, which is the fraction of light reflected, and the greenhouse effect of the atmosphere matter too. Venus and Earth receive similar sunlight but have very different surfaces.',
          ],
          [
            'Atmospheres: composition and retention',
            'An atmosphere spreads heat, shields the surface from radiation, and keeps liquids stable by providing pressure. A world keeps its gases if its escape velocity is much larger than the typical speed of its gas molecules. Small, hot worlds lose light gases such as hydrogen most easily. A magnetic field can also protect an atmosphere from being stripped by the solar wind. Mars’s thin atmosphere shows what happens when these protections are weak.',
          ],
          [
            'Stable liquids, on the surface and below',
            'Liquid water needs the right range of temperature and pressure. On a surface it requires enough atmospheric pressure; otherwise ice sublimates directly to gas. Below the surface, ice shells can hold oceans liquid by trapping heat and adding pressure. Salts lower the freezing point, so brines can stay liquid below 0 °C. Titan shows that other liquids, such as methane and ethane, can also be stable at very low temperatures.',
          ],
          [
            'Tidal heating',
            'A moon on an elliptical orbit is squeezed and stretched more strongly when close to its planet than when far away. This repeated flexing creates friction inside the moon and produces heat, called tidal heating. Orbital resonances keep the orbits from becoming circular: Io, Europa, and Ganymede are in a 1 : 2 : 4 resonance. Tidal heating can keep subsurface oceans liquid far beyond the Sun’s habitable zone, as on Europa and Enceladus.',
          ],
          [
            'Chemical disequilibrium',
            'Life gets energy from chemical reactions that have not yet reached equilibrium. A mixture of oxidants and reductants, such as hydrogen and carbon dioxide, can release energy if combined, which some microbes use to make methane. Finding such disequilibrium, like hydrogen gas in Enceladus’s plume, suggests that usable energy is available. On Earth, the coexistence of oxygen and methane in the atmosphere is itself a strong sign of life.',
          ],
        ],
        [
          ['Habitable zone', 'Distance range where surface liquid water is possible.'],
          ['Albedo', 'Fraction of incoming light a surface reflects.'],
          ['Escape velocity', 'Speed needed to escape a body’s gravity.'],
          ['Tidal heating', 'Internal heat from repeated tidal flexing.'],
          ['Orbital resonance', 'Orbital periods in a simple whole-number ratio.'],
          [
            'Chemical disequilibrium',
            'A mix of chemicals that could still react and release energy.',
          ],
        ],
        [
          'Europa orbits Jupiter far outside the Sun’s habitable zone, yet scientists think it has a liquid ocean. Explain how, using the habitability conditions.',
          [
            'Sunlight there is too weak to keep surface water liquid.',
            'Europa’s elliptical orbit, maintained by resonance with Io and Ganymede, causes tidal flexing and internal heating.',
            'An ice shell insulates the ocean and provides pressure, keeping water liquid below.',
          ],
          'Tidal heating plus an insulating ice shell can keep an ocean liquid without sunlight, so habitability is not limited to the habitable zone.',
        ],
        [
          [
            'Which three broad needs define habitability for life as we know it?',
            'Liquid water, energy, and key chemical elements',
            [
              'Oxygen, sunlight, and soil',
              'A magnetic field, rings, and moons',
              'Ice, methane, and nitrogen only',
            ],
            'These are the broad requirements scientists search for.',
          ],
          [
            'Why are small, hot worlds poor at keeping light gases?',
            'Gas molecules move fast compared with a low escape velocity',
            ['Gravity is too strong', 'Light gases freeze out', 'The Sun adds gas'],
            'Retention depends on molecule speed relative to escape velocity.',
          ],
          [
            'Hydrogen in a plume along with carbon dioxide is evidence for:',
            'Chemical disequilibrium as an energy source',
            ['A thick atmosphere', 'A magnetic field', 'Surface lakes'],
            'H₂ and CO₂ can react to release energy usable by microbes.',
          ],
        ],
        [
          [
            'Explain why being in the habitable zone does not guarantee liquid water.',
            'Surface temperature also depends on albedo and atmosphere. A planet with no atmosphere may freeze, and one with a runaway greenhouse, like Venus, may be too hot.',
          ],
          [
            'Describe how orbital resonance keeps tidal heating going.',
            'Regular gravitational tugs from the other moons keep each orbit elliptical, so the moon keeps flexing as its distance from the planet changes.',
          ],
          [
            'How do salts help liquid water exist in cold places?',
            'Dissolved salts lower the freezing point, so brines can remain liquid below 0 °C.',
          ],
          [
            'Why would oxygen and methane together in an exoplanet atmosphere be interesting?',
            'They react with each other, so both being present means something keeps resupplying them, which on Earth is life.',
          ],
        ],
        [
          ['Water', 'A stable liquid solvent, on the surface or below.'],
          ['Energy', 'Sunlight, tidal heating, or chemical disequilibrium.'],
          ['Chemistry', 'Carbon and other key elements available to react.'],
        ],
        [
          ['Habitable zone', 'Starlight keeps surface water liquid', 'Ignores subsurface oceans.'],
          ['Tidal heating', 'Flexing makes internal heat', 'Needs an elliptical, resonant orbit.'],
          [
            'Disequilibrium',
            'Reactive chemicals supply energy',
            'Shows potential, not proof of life.',
          ],
        ],
        'Decide which habitability conditions each world satisfies from the evidence.',
        'Habitability needs water, energy, and chemistry together; location in the habitable zone is only one clue.',
      ),
      investigation: evidence(
        [
          ['Location', 'The moon orbits Saturn, far outside the habitable zone.'],
          ['Plume', 'Jets of water vapor and ice grains erupt from cracks.'],
          ['Plume chemistry', 'Salts, silica grains, organic molecules, and hydrogen gas.'],
          ['Orbit', 'An elliptical orbit kept by resonance with another moon.'],
        ],
        'What best summarizes this world’s habitability?',
        [
          'Not habitable: too far from the Sun',
          'Possibly habitable subsurface ocean with energy',
          'Habitable surface lakes',
          'Proven to host life',
        ],
        1,
        'Plumes sample a salty ocean; silica and hydrogen point to hydrothermal energy, and tidal heating keeps it liquid. This is habitability evidence, not proof of life.',
      ),
    },
    {
      ...c(
        'Light, radiation, and temperature',
        [
          'Apply the inverse-square law to stellar flux.',
          'Use the Stefan–Boltzmann law, Wien’s law, and albedo to estimate temperatures.',
          'Interpret Doppler shifts in spectra.',
        ],
        [
          [
            'Flux and the inverse-square law',
            'Flux is the power per unit area received from a source. Starlight spreads over a sphere whose area grows with the square of distance, so flux falls as 1/d². Doubling the distance gives one quarter the flux; at 3 AU a planet receives one ninth of the flux at 1 AU. Jupiter, at about 5.2 AU, receives roughly 1/27 of Earth’s sunlight. These ratios are easy to calculate without a calculator by comparing distances.',
          ],
          [
            'Stefan–Boltzmann law',
            'The Stefan–Boltzmann law says the power emitted per area by a blackbody is F = σT⁴. Because temperature is raised to the fourth power, small temperature changes cause large changes in emission: doubling the temperature increases emission by 2⁴ = 16 times. A star’s total power, its luminosity, depends on both its surface area and its temperature: L ∝ R²T⁴. A large, cool star can still be very luminous.',
          ],
          [
            'Wien’s displacement law',
            'Wien’s law says hotter objects emit most strongly at shorter wavelengths: λmax = b/T, with b ≈ 2.9 × 10⁻³ m·K. The Sun, near 5,800 K, peaks in visible light at about 500 nm. Earth, near 290 K, peaks in the infrared, around 10 µm. This is why telescopes such as JWST study cool planets and dust in infrared light, and why red dwarfs, near 3,000 K, look red.',
          ],
          [
            'Albedo and equilibrium temperature',
            'A planet’s equilibrium temperature is the temperature at which the sunlight it absorbs equals the heat it radiates. Absorbed power depends on (1 − A), where A is albedo. For the Sun, Teq ≈ 278 K × (1 − A)^¼ ÷ √d, with d in AU. Earth, with A ≈ 0.3, gives about 255 K, colder than its true average of about 288 K. The difference is the greenhouse effect of Earth’s atmosphere.',
          ],
          [
            'Proportional reasoning',
            'The rules emphasize algebra, proportions, and order-of-magnitude estimates instead of calculators. Set up ratios so constants cancel. For example, to compare equilibrium temperatures at two distances, Teq ∝ 1/√d, so a planet four times farther is half as warm. To compare two stars’ peak wavelengths, λ ∝ 1/T, so a star twice as hot peaks at half the wavelength. Always check that units and powers are consistent.',
          ],
          [
            'Doppler shifts',
            'Motion toward an observer shortens wavelengths (blueshift) and motion away lengthens them (redshift). For speeds much less than light, Δλ/λ = v/c. Doppler shifts reveal planet-hosting stars wobbling, rotation of planets and stars, and winds in atmospheres. A spectral line at 500.00 nm observed at 500.01 nm is shifted by 2 × 10⁻⁵, which corresponds to motion away at about 6 km/s.',
          ],
        ],
        [
          ['Flux', 'Power received per unit area.'],
          ['Inverse-square law', 'Flux decreases as the square of distance increases.'],
          ['Stefan–Boltzmann law', 'Emitted power per area is proportional to T⁴.'],
          ['Wien’s law', 'Peak wavelength is inversely proportional to temperature.'],
          ['Equilibrium temperature', 'Temperature where absorbed and emitted power balance.'],
          ['Redshift', 'Longer observed wavelength from motion away from the observer.'],
        ],
        [
          'Planet X orbits a Sun-like star at 4 AU with albedo 0.3, the same as Earth. Estimate its equilibrium temperature compared with Earth’s 255 K.',
          [
            'Teq is proportional to 1/√d for the same star and albedo.',
            'At 4 AU, √4 = 2, so Teq is half of Earth’s value.',
            '255 K ÷ 2 ≈ 128 K.',
          ],
          'Planet X’s equilibrium temperature is about 128 K, far too cold for surface liquid water without another heat source.',
        ],
        [
          [
            'A planet moves from 1 AU to 2 AU. By what factor does the starlight flux change?',
            'It becomes 1/4 as large',
            ['It becomes 1/2 as large', 'It doubles', 'It becomes 1/8 as large'],
            'Flux ∝ 1/d², so doubling distance gives 1/4.',
          ],
          [
            'If a star’s surface temperature doubles, its emitted power per area changes by:',
            '16 times',
            ['2 times', '4 times', '8 times'],
            'F ∝ T⁴, and 2⁴ = 16.',
          ],
          [
            'A cool object near 300 K emits most strongly in:',
            'Infrared',
            ['Visible', 'Ultraviolet', 'X-rays'],
            'Wien’s law gives a peak near 10 µm, in the infrared.',
          ],
        ],
        [
          [
            'Why is Earth’s actual average temperature higher than its equilibrium temperature?',
            'Greenhouse gases absorb outgoing infrared radiation and re-emit some back toward the surface, warming it above the 255 K equilibrium value.',
          ],
          [
            'Explain how albedo affects a planet’s equilibrium temperature.',
            'Higher albedo reflects more light, so less energy is absorbed and the equilibrium temperature is lower.',
          ],
          [
            'Star A is 6,000 K and star B is 3,000 K. Compare their peak wavelengths.',
            'λmax ∝ 1/T, so star B peaks at twice the wavelength of star A, farther toward the red and infrared.',
          ],
          [
            'A spectral line appears at a shorter wavelength than expected. What does this mean?',
            'The source is moving toward the observer: a blueshift.',
          ],
        ],
        [
          ['Receive', 'Flux falls with distance as 1/d².'],
          ['Absorb', 'A fraction (1 − albedo) of the light is absorbed.'],
          ['Emit', 'The planet radiates as σT⁴ until balance is reached.'],
        ],
        [
          ['Inverse-square law', 'Flux ∝ 1/d²', 'Assumes light spreads in all directions.'],
          ['Stefan–Boltzmann', 'F = σT⁴', 'Real bodies are not perfect blackbodies.'],
          [
            'Equilibrium temperature',
            'Absorbed = emitted',
            'Ignores greenhouse warming and internal heat.',
          ],
        ],
        'Predict how distance and albedo change equilibrium temperature, then check with ratios.',
        'Use proportions so constants cancel: flux ∝ 1/d², Teq ∝ 1/√d, and λmax ∝ 1/T.',
      ),
      investigation: evidence(
        [
          ['Distance', 'A planet orbits a Sun-like star at 0.72 AU.'],
          ['Albedo', 'Very high: about 0.75, from bright clouds.'],
          ['Predicted Teq', 'About 230 K, below freezing.'],
          ['Measured surface', 'About 735 K.'],
        ],
        'What best explains the difference?',
        [
          'The planet is closer than measured',
          'A runaway greenhouse effect',
          'Tidal heating from moons',
          'An error in Wien’s law',
        ],
        1,
        'High albedo makes the predicted equilibrium temperature low, yet the surface is extremely hot. A thick CO₂ atmosphere trapping heat, as on Venus, explains it.',
      ),
    },
    {
      ...c(
        'Gravity, orbits, and tides',
        [
          'Use Newton’s law of gravitation in proportion problems.',
          'Apply Kepler’s laws and calculate escape velocity relationships.',
          'Explain tidal forces and how they shape moons.',
        ],
        [
          [
            'Newton’s law of gravitation',
            'Every mass attracts every other mass with a force F = GMm/r². The force is proportional to each mass and inversely proportional to the square of the distance between their centers. Doubling one mass doubles the force; doubling the distance reduces it to one quarter. Surface gravity is g = GM/R², so a planet with twice Earth’s mass and twice its radius has half of Earth’s surface gravity.',
          ],
          [
            'Kepler’s first and second laws',
            'Kepler’s first law says planets move on ellipses with the star at one focus. The closest point is periapsis (perihelion around the Sun) and the farthest is apoapsis. Kepler’s second law says a line from the star to the planet sweeps out equal areas in equal times, so a planet moves fastest near periapsis and slowest near apoapsis. Comets on very elongated orbits, like 67P, speed up dramatically near the Sun.',
          ],
          [
            'Kepler’s third law',
            'Kepler’s third law relates orbital period P to semi-major axis a: P² ∝ a³. For objects orbiting the Sun, P in years and a in AU give P² = a³. A body at 4 AU has P² = 64, so P = 8 years. Newton’s version includes the central mass: P² = 4π²a³/(GM). So around a less massive star, a planet at the same distance takes longer to orbit, which is why habitable-zone planets around red dwarfs have periods of only days or weeks.',
          ],
          [
            'Energy and escape velocity',
            'A moving body has kinetic energy ½mv², and its gravitational potential energy is −GMm/r. To escape, kinetic energy must at least cancel the negative potential energy, giving escape velocity v = √(2GM/R). Escape velocity grows with mass and shrinks with radius. Earth’s is about 11.2 km/s, Mars’s about 5 km/s, and tiny Bennu’s only centimeters per second, so loose particles easily drift off.',
          ],
          [
            'Tidal forces',
            'Tidal force comes from the difference in gravity across a body: the near side is pulled harder than the far side. This stretches the body along the line to the other mass. Tidal force scales as M/d³, falling faster with distance than gravity itself. That is why the Moon, though much less massive than the Sun, raises larger tides on Earth: it is far closer. Strong tides can raise bulges, lock rotation, and even tear apart small bodies.',
          ],
          [
            'Tidal locking and heating',
            'Over time tides slow a moon’s rotation until it always shows the same face to its planet, called tidal locking. Most large moons, including Europa, Ganymede, Enceladus, and Titan, are tidally locked. If an orbit stays elliptical, the tidal bulge grows and shrinks each orbit, flexing the interior and making heat. Planets close to red dwarfs, like those of TRAPPIST-1, are probably tidally locked too, with one side always facing the star.',
          ],
        ],
        [
          ['Gravitational force', 'F = GMm/r², attraction between masses.'],
          ['Semi-major axis', 'Half the longest diameter of an elliptical orbit.'],
          ['Kepler’s third law', 'P² ∝ a³ for orbits around the same central mass.'],
          ['Periapsis', 'Point of an orbit closest to the central body.'],
          ['Tidal force', 'Difference in gravity across a body; scales as M/d³.'],
          ['Tidal locking', 'Rotation matching orbital period, always showing one face.'],
        ],
        [
          'Planet A has 4 times Earth’s mass and 2 times Earth’s radius. Compare its surface gravity and escape velocity with Earth’s.',
          [
            'g ∝ M/R²: 4 ÷ 2² = 1, so surface gravity equals Earth’s.',
            'v_esc ∝ √(M/R): √(4 ÷ 2) = √2 ≈ 1.4.',
            'Earth’s v_esc is 11.2 km/s, so Planet A’s is about 15.8 km/s.',
          ],
          'Planet A has the same surface gravity but about 1.4 times Earth’s escape velocity, helping it retain an atmosphere.',
        ],
        [
          [
            'A body orbits the Sun at 9 AU. What is its period?',
            '27 years',
            ['9 years', '81 years', '3 years'],
            'P² = a³ = 729, so P = 27 years.',
          ],
          [
            'If the distance between two masses triples, the gravitational force becomes:',
            '1/9 as large',
            ['1/3 as large', '3 times as large', '1/27 as large'],
            'Force ∝ 1/r², and 3² = 9.',
          ],
          [
            'Tidal force depends on distance as:',
            '1/d³',
            ['1/d', '1/d²', 'd²'],
            'Tidal force is a difference in gravity across a body, which falls off as the cube of distance.',
          ],
        ],
        [
          [
            'Explain Kepler’s second law in terms of orbital speed.',
            'Equal areas in equal times means the planet must move faster when closer to the star, near periapsis, and slower when farther away.',
          ],
          [
            'Why does the Moon cause larger tides on Earth than the Sun?',
            'Tidal force scales with M/d³. The Moon is much closer, so the distance factor outweighs the Sun’s much larger mass.',
          ],
          [
            'Why do planets in a red dwarf’s habitable zone have short orbital periods?',
            'The habitable zone is very close to a dim star, and Kepler’s third law gives short periods for small orbits.',
          ],
          [
            'Describe what tidal locking means for climate on an exoplanet.',
            'One side permanently faces the star and the other is in darkness, so heat must be carried by winds or oceans to avoid extreme temperature differences.',
          ],
        ],
        [
          ['Attract', 'Gravity sets orbits and surface gravity.'],
          ['Orbit', 'Kepler’s laws describe shape, speed, and period.'],
          ['Stretch', 'Tidal differences lock and heat moons.'],
        ],
        [
          ['Gravity', 'F ∝ Mm/r²', 'Measured between centers of mass.'],
          ['Escape velocity', '√(2GM/R)', 'Ignores atmospheric drag.'],
          ['Tidal force', '∝ M/d³', 'Matters most for close, large bodies.'],
        ],
        'Use proportions to compare gravity and orbits before checking the evidence.',
        'Gravity sets orbits; differences in gravity, or tides, set locking and internal heating.',
      ),
      investigation: evidence(
        [
          ['Orbit', 'Moon B orbits its planet in 3.6 days on a slightly elliptical path.'],
          ['Rotation', 'It always shows the same face to the planet.'],
          ['Neighbors', 'Its period is exactly twice that of an inner moon.'],
          ['Surface', 'Young, crack-covered ice with few craters.'],
        ],
        'What process best explains the young, cracked surface?',
        [
          'Frequent asteroid impacts',
          'Tidal flexing from a resonant orbit',
          'Solar heating',
          'A thick atmosphere eroding craters',
        ],
        1,
        'A 2 : 1 resonance keeps the orbit elliptical, so tides flex the tidally locked moon. Internal heat and cracking resurface it, erasing craters.',
      ),
    },
    {
      ...c(
        'Venus and Mars: rocky neighbors',
        [
          'Compare the atmospheres and surfaces of Venus and Mars with Earth’s.',
          'Interpret geologic and chemical evidence for past water.',
          'Describe the goals and instruments of the listed Venus and Mars missions.',
        ],
        [
          [
            'Venus today',
            'Venus is nearly Earth’s size, but its surface is about 465 °C under a crushing carbon dioxide atmosphere roughly 90 times Earth’s surface pressure. Clouds of sulfuric acid droplets give it a high albedo. Its runaway greenhouse effect makes it hotter than Mercury, even though it is farther from the Sun. Venus rotates very slowly and backward, so a Venus day is longer than its year.',
          ],
          [
            'Did Venus once have water?',
            'Venus’s atmosphere has a very high ratio of deuterium to ordinary hydrogen. Water molecules made with ordinary hydrogen are lighter and escape more easily, leaving deuterium behind, so a high ratio suggests Venus lost a large amount of water. Some models suggest it once had shallow oceans before a runaway greenhouse boiled them away. Its surface is young, largely reshaped by volcanism, and radar mapping reveals tesserae that may be ancient crust.',
          ],
          [
            'Venus missions',
            'ESA’s Venus Express orbited from 2006 to 2014, studying atmospheric circulation and finding infrared hot spots that hint at recent volcanism. NASA’s planned DAVINCI mission will drop a descent probe through the atmosphere to measure its composition, including noble gases and isotope ratios that record water loss, and image tesserae. NASA’s VERITAS orbiter will use radar to map surface topography and infrared emission to identify rock types.',
          ],
          [
            'Mars today',
            'Mars has a thin carbon dioxide atmosphere, less than 1% of Earth’s surface pressure, and an average temperature near −60 °C. At such low pressure, liquid water quickly boils or freezes, so water today exists mainly as polar and buried ice. Mars lost its global magnetic field early, letting the solar wind strip away much of its atmosphere. Dust storms can cover the whole planet.',
          ],
          [
            'Evidence for ancient water on Mars',
            'Morphology records past liquid water: branching valley networks, outflow channels carved by floods, and fan-shaped deltas where rivers entered lakes, such as in Jezero crater. Chemistry agrees: orbiters and rovers have found clay minerals and sulfates that form in water, and hematite concretions. Together these show that early Mars, over 3 billion years ago, had stable surface water and possibly habitable lakes.',
          ],
          [
            'Mars missions',
            'The Mars Reconnaissance Orbiter (MRO) images the surface in high resolution with HiRISE and maps minerals with a spectrometer, and relays rover data to Earth. MAVEN studies the upper atmosphere and measures how fast gases escape to space, showing how Mars lost its atmosphere. Perseverance explores Jezero crater’s delta, searching for signs of ancient life and caching rock samples for possible return to Earth.',
          ],
        ],
        [
          ['Runaway greenhouse', 'Warming that evaporates oceans and adds more greenhouse gas.'],
          ['D/H ratio', 'Deuterium-to-hydrogen ratio used to trace water loss.'],
          ['Tessera', 'Highly deformed, possibly ancient Venus terrain.'],
          ['Delta', 'Fan-shaped sediment deposit where a river enters standing water.'],
          ['Clay minerals', 'Minerals formed by water altering rock.'],
          ['Atmospheric escape', 'Loss of gas from an atmosphere into space.'],
        ],
        [
          'A Mars orbiter detects clay minerals in layered rocks at the end of a channel that opens into a crater, forming a fan shape. What can you conclude?',
          [
            'A channel ending in a fan inside a crater suggests a river delta.',
            'Clay minerals form when water alters rock over time.',
            'Layering indicates sediments were deposited in standing water.',
          ],
          'The crater likely held a long-lived lake fed by a river, a potentially habitable environment worth sampling.',
        ],
        [
          [
            'Why is Venus’s surface hotter than Mercury’s?',
            'A thick CO₂ atmosphere creates a runaway greenhouse',
            [
              'Venus is closer to the Sun',
              'Venus has a strong magnetic field',
              'Venus has active tidal heating',
            ],
            'The greenhouse effect, not distance, makes Venus the hottest planet.',
          ],
          [
            'A high D/H ratio in Venus’s atmosphere suggests:',
            'Venus lost a lot of water over time',
            [
              'Venus has oceans today',
              'Comets just delivered water',
              'The atmosphere is mostly hydrogen',
            ],
            'Lighter hydrogen escapes more easily, enriching deuterium.',
          ],
          [
            'Which mission measures gas escaping from Mars’s upper atmosphere?',
            'MAVEN',
            ['Perseverance', 'DAVINCI', 'Venus Express'],
            'MAVEN studies atmospheric loss at Mars.',
          ],
        ],
        [
          [
            'Explain why liquid water is not stable on Mars’s surface today.',
            'The atmospheric pressure is so low that water quickly boils or sublimes, and temperatures are usually below freezing.',
          ],
          [
            'How did losing its magnetic field affect Mars?',
            'Without a global magnetic field, the solar wind could strip gas from the upper atmosphere, thinning it over billions of years.',
          ],
          [
            'Compare the goals of DAVINCI and VERITAS.',
            'DAVINCI is a probe that descends through the atmosphere to measure its composition and image the surface below. VERITAS is an orbiter that maps topography with radar and identifies rock types globally.',
          ],
          [
            'Why did Perseverance land in Jezero crater?',
            'Jezero contains an ancient river delta and lake deposits, an environment that may have preserved signs of ancient microbial life.',
          ],
        ],
        [
          ['Observe', 'Orbiters map landforms and minerals.'],
          ['Interpret', 'Channels, deltas, and clays record past water.'],
          ['Explore', 'Landers and probes test whether conditions were habitable.'],
        ],
        [
          ['Venus', 'Thick CO₂, runaway greenhouse', 'Possible early oceans lost.'],
          ['Mars', 'Thin CO₂, cold and dry', 'Ancient lakes and rivers left clear evidence.'],
          ['Earth', 'Moderate greenhouse, magnetic field', 'Stable oceans for billions of years.'],
        ],
        'Decide what the orbital evidence says about ancient water and habitability.',
        'Landforms and minerals together make a stronger case for past water than either alone.',
      ),
      investigation: evidence(
        [
          ['Orbital image', 'A fan of layered sediment where a valley enters a crater.'],
          ['Spectra', 'Clay minerals and carbonates detected in the fan.'],
          ['Rover data', 'Fine-grained mudstone layers on the crater floor.'],
        ],
        'What environment do these rocks record?',
        [
          'A lava flow',
          'An ancient lake fed by a river',
          'Wind-blown dunes only',
          'An impact melt sheet',
        ],
        1,
        'A delta, water-formed clays and carbonates, and fine mud that settles in still water together point to a long-lived lake—like Jezero crater.',
      ),
    },
    {
      ...c(
        'Ocean worlds: Europa, Ganymede, Enceladus, and Titan',
        [
          'Describe the evidence for subsurface oceans on icy moons.',
          'Compare Titan’s surface liquids and atmosphere with Earth’s.',
          'Explain the goals of Galileo, Europa Clipper, JUICE, Cassini–Huygens, and Dragonfly.',
        ],
        [
          [
            'Europa',
            'Europa, slightly smaller than Earth’s Moon, has a bright, young icy surface crossed by cracks and ridges, with chaos terrain where ice blocks appear to have broken and refrozen. The Galileo spacecraft measured an induced magnetic field, best explained by a salty, electrically conducting ocean beneath the ice. Its ocean may contain twice as much water as Earth’s oceans and touch a rocky seafloor, where hydrothermal activity could supply chemical energy.',
          ],
          [
            'Ganymede',
            'Ganymede is the largest moon in the solar system, bigger than Mercury, and the only moon known to have its own internally generated magnetic field. Observations of its auroras shifting less than expected support a salty ocean deep beneath the surface, perhaps sandwiched between layers of ice. Its surface mixes dark, ancient cratered terrain with lighter, grooved terrain. ESA’s JUICE mission will eventually orbit Ganymede.',
          ],
          [
            'Enceladus',
            'Enceladus is a small moon of Saturn, only about 500 km across, yet Cassini found jets of water vapor and ice grains erupting from warm cracks, nicknamed tiger stripes, near its south pole. Flying through the plume, Cassini detected salts, silica nanoparticles that suggest hot water reacting with rock, organic molecules, and molecular hydrogen. Later analysis also found phosphates. The plume feeds Saturn’s E ring.',
          ],
          [
            'Titan',
            'Titan, Saturn’s largest moon, has a thick nitrogen atmosphere with about 1.5 times Earth’s surface pressure. At about −180 °C, methane plays the role water plays on Earth: it forms clouds, rain, rivers, and lakes and seas of liquid methane and ethane, such as Kraken Mare. Sunlight breaks down methane to make complex organic haze. Gravity data suggest a subsurface water ocean as well.',
          ],
          [
            'Galileo, Europa Clipper, and JUICE',
            'NASA’s Galileo orbited Jupiter from 1995 to 2003, discovering the evidence for oceans on Europa and Ganymede. Europa Clipper, launched in 2024, will make dozens of close flybys of Europa with ice-penetrating radar, cameras, a magnetometer, and instruments to sample gases and dust. ESA’s JUICE, launched in 2023, will study Ganymede, Europa, and Callisto and become the first spacecraft to orbit a moon other than ours.',
          ],
          [
            'Cassini–Huygens and Dragonfly',
            'Cassini orbited Saturn from 2004 to 2017, flying through Enceladus’s plume and mapping Titan with radar. Its Huygens probe landed on Titan in 2005, the most distant landing ever, photographing rounded pebbles shaped by flowing liquid. NASA’s Dragonfly is a nuclear-powered rotorcraft lander planned to fly between sites on Titan, studying its organic chemistry and prebiotic processes.',
          ],
        ],
        [
          [
            'Induced magnetic field',
            'A field created when a conductor moves through a planet’s field.',
          ],
          ['Chaos terrain', 'Broken, jumbled ice blocks on Europa’s surface.'],
          ['Plume', 'A jet of gas and particles erupting from a surface.'],
          ['Hydrothermal activity', 'Hot water circulating through rock.'],
          ['Tiger stripes', 'Warm fractures at Enceladus’s south pole that vent plumes.'],
          ['Cryovolcanism', 'Eruption of water or other volatiles instead of molten rock.'],
        ],
        [
          'A spacecraft flying by a moon detects a magnetic field that changes direction as the moon moves through its planet’s field. What does this suggest about the moon’s interior?',
          [
            'A changing planetary field induces currents in an electrical conductor.',
            'Ice and dry rock are poor conductors; salty water is a good conductor.',
            'An induced field responding to the planet’s field therefore points to a salty liquid layer.',
          ],
          'The moon probably has a global salty ocean beneath its surface, as Galileo found at Europa.',
        ],
        [
          [
            'Which moon has its own internally generated magnetic field?',
            'Ganymede',
            ['Europa', 'Titan', 'Enceladus'],
            'Ganymede is the only moon known to generate its own magnetic field.',
          ],
          [
            'Silica nanoparticles in Enceladus’s plume suggest:',
            'Hydrothermal activity at the seafloor',
            ['A thick atmosphere', 'Methane lakes', 'Recent asteroid impacts'],
            'Silica particles this small form when hot water reacts with rock and then cools.',
          ],
          [
            'What liquids fill Titan’s lakes and seas?',
            'Methane and ethane',
            ['Liquid water', 'Sulfuric acid', 'Liquid nitrogen only'],
            'At −180 °C, hydrocarbons are liquid and water is rock-hard ice.',
          ],
        ],
        [
          [
            'Why is Europa considered a strong candidate for habitability?',
            'It likely has a large salty ocean in contact with a rocky seafloor, kept liquid by tidal heating, with possible chemical energy from water–rock reactions.',
          ],
          [
            'Explain why Enceladus’s plume is a convenient way to study its ocean.',
            'The plume carries ocean material into space, so a spacecraft can sample it by flying through, without drilling through the ice.',
          ],
          [
            'Compare Titan’s methane cycle with Earth’s water cycle.',
            'Methane evaporates, forms clouds, rains, flows in rivers, and collects in lakes, just as water does on Earth, but at much lower temperatures.',
          ],
          [
            'What is unique about JUICE’s planned orbit?',
            'It will be the first spacecraft to orbit a moon of another planet, Ganymede.',
          ],
        ],
        [
          ['Heat', 'Tidal flexing warms the interior.'],
          ['Ocean', 'Liquid water persists beneath an ice shell.'],
          ['Sample', 'Plumes, magnetometers, and probes reveal its chemistry.'],
        ],
        [
          ['Europa', 'Salty ocean under young ice', 'Ice shell may be kilometers thick.'],
          ['Enceladus', 'Plumes sample ocean directly', 'Very small, with limited total energy.'],
          ['Titan', 'Methane lakes and organic haze', 'Too cold for surface liquid water.'],
        ],
        'Match each piece of evidence to the ocean world it describes.',
        'Ocean worlds are found by indirect evidence: magnetic fields, plumes, gravity, and young surfaces.',
      ),
      investigation: evidence(
        [
          ['Atmosphere', 'Thick nitrogen, 1.5 times Earth’s surface pressure.'],
          ['Surface temperature', 'About −180 °C.'],
          ['Radar', 'Smooth, dark lakes near the poles.'],
          ['Probe images', 'Rounded pebbles on the landing site.'],
        ],
        'Which world and liquid best fit?',
        [
          'Europa, liquid water',
          'Titan, liquid methane and ethane',
          'Mars, briny water',
          'Venus, sulfuric acid',
        ],
        1,
        'Only Titan has a thick nitrogen atmosphere at −180 °C. Radar-dark lakes and rounded pebbles show flowing hydrocarbon liquids.',
      ),
    },
    {
      ...c(
        'Small bodies and the building blocks of life',
        [
          'Describe Makemake, Bennu, and 67P and what missions learned.',
          'Explain how small bodies delivered water and organics.',
          'Identify life’s building blocks, water phases, and extremophiles.',
        ],
        [
          [
            'Makemake',
            'Makemake is a dwarf planet in the Kuiper Belt beyond Neptune, about two-thirds the size of Pluto. Spectra show its bright surface is covered in frozen methane and possibly ethane, giving it a reddish color. It is extremely cold, around −240 °C, and has at least one small moon. Its icy surface preserves material from the early outer solar system, though it is too cold for liquid water at the surface.',
          ],
          [
            'Bennu and OSIRIS-REx',
            'Bennu is a near-Earth asteroid about 500 m across, a carbon-rich rubble pile of loosely bound boulders. NASA’s OSIRIS-REx collected a sample in 2020 and returned it to Earth in 2023. Analysis found hydrated clay minerals, carbon compounds, phosphates, and evaporated salts that formed from brines on Bennu’s parent body, as well as amino acids and nucleobases. These show that such asteroids carried ingredients of life.',
          ],
          [
            'Comet 67P and Rosetta',
            'Comet 67P/Churyumov–Gerasimenko is a two-lobed comet studied by ESA’s Rosetta orbiter from 2014 to 2016; its Philae lander touched down in 2014. Rosetta detected the amino acid glycine, phosphorus, and many organic molecules. Its water had a deuterium-to-hydrogen ratio about three times that of Earth’s oceans, suggesting comets like 67P were not the main source of Earth’s water.',
          ],
          [
            'Delivering water and organics',
            'Early Earth formed hot and close to the Sun, where water was hard to keep. Much of its water may have come from carbon-rich asteroids, whose water chemistry matches Earth’s oceans better than most comets. Impacts also delivered organic molecules. Isotope ratios, like D/H, act as fingerprints that let scientists test which source fits. Spectral features from telescopes and spacecraft identify ices, minerals, and organics on these bodies.',
          ],
          [
            'Building blocks of life',
            'Life uses four main classes of molecules. Proteins, built from amino acids, act as enzymes and structures. Nucleic acids, DNA and RNA, built from nucleotides, store and transfer information. Lipids form cell membranes. Carbohydrates store energy and form structures. Water occurs in several forms beyond liquid: crystalline ice, amorphous ice that forms in very cold space, brines with dissolved salts, and clathrates, icy cages that trap gases such as methane.',
          ],
          [
            'Extremophiles',
            'Extremophiles are organisms that thrive in conditions once thought impossible. Chemolithoautotrophs get energy from inorganic chemicals, such as hydrogen or sulfur compounds, and make their own food from carbon dioxide; some live at deep-sea hydrothermal vents without sunlight. Tardigrades survive drying, freezing, radiation, and vacuum by entering a dormant state. Extremophiles expand where life might exist, such as icy moon oceans or Martian brines.',
          ],
        ],
        [
          ['Dwarf planet', 'A round body orbiting the Sun that has not cleared its orbit.'],
          ['Rubble pile', 'An asteroid made of loosely bound fragments.'],
          ['Amino acid', 'Building block of proteins.'],
          ['Clathrate', 'Ice cage that traps gas molecules.'],
          [
            'Chemolithoautotroph',
            'Organism using inorganic chemicals for energy and CO₂ for carbon.',
          ],
          ['Extremophile', 'Organism that thrives in extreme environments.'],
        ],
        [
          'Earth’s oceans have a D/H ratio of about 1.6 × 10⁻⁴. Comet 67P’s water has about 5.3 × 10⁻⁴, and carbon-rich asteroids have values close to Earth’s. Which source better matches Earth’s water?',
          [
            '67P’s ratio is about 3 times Earth’s value.',
            'Carbon-rich asteroids have ratios close to Earth’s.',
            'Isotope ratios act as fingerprints of water’s origin.',
          ],
          'Carbon-rich asteroids are the better match, so comets like 67P were probably not Earth’s main water source.',
        ],
        [
          [
            'Which mission returned a sample of asteroid Bennu?',
            'OSIRIS-REx',
            ['Rosetta', 'Dragonfly', 'Kepler'],
            'OSIRIS-REx collected Bennu material and returned it in 2023.',
          ],
          [
            'Which class of molecules forms cell membranes?',
            'Lipids',
            ['Proteins', 'Nucleic acids', 'Carbohydrates'],
            'Lipids arrange into bilayers that enclose cells.',
          ],
          [
            'An organism at a dark hydrothermal vent that uses hydrogen sulfide for energy is a:',
            'Chemolithoautotroph',
            ['Photoautotroph', 'Tardigrade', 'Heterotroph that eats plants'],
            'It gets energy from inorganic chemicals and fixes CO₂.',
          ],
        ],
        [
          [
            'Why are samples returned to Earth more valuable than remote measurements?',
            'Laboratory instruments on Earth are far more sensitive and can repeat or extend analyses, such as measuring isotopes or detecting amino acids, beyond what a spacecraft can carry.',
          ],
          [
            'What is a clathrate, and where might it matter?',
            'An ice structure that traps gas molecules like methane inside cages; it may store methane on Titan, Mars, or icy moons.',
          ],
          [
            'Explain why extremophiles matter for habitability studies.',
            'They show life can survive without sunlight and in cold, salty, or high-pressure conditions, widening the places where life might exist.',
          ],
          [
            'Describe one piece of evidence that Bennu’s parent body had liquid water.',
            'Hydrated clay minerals or evaporite salts formed from brines show water once flowed through the parent body.',
          ],
        ],
        [
          ['Form', 'Small bodies preserve early solar system ices and organics.'],
          ['Deliver', 'Impacts brought water and carbon compounds to planets.'],
          ['Assemble', 'Building blocks may combine into life’s molecules.'],
        ],
        [
          [
            'Bennu',
            'Carbon-rich asteroid, sample returned',
            'One body may not represent all asteroids.',
          ],
          ['67P', 'Comet with organics and high D/H', 'Other comets have different ratios.'],
          ['Makemake', 'Methane-ice dwarf planet', 'Too cold for surface liquids.'],
        ],
        'Compare the isotope and mineral evidence to decide where Earth’s water came from.',
        'Isotopes and minerals are fingerprints that link small bodies to the ingredients of life on Earth.',
      ),
      investigation: evidence(
        [
          ['Sample minerals', 'Clay minerals and sodium carbonate salts.'],
          ['Organics', 'Amino acids and nucleobases detected in the lab.'],
          ['Isotopes', 'D/H ratio close to Earth’s oceans.'],
        ],
        'Which body and conclusion best fit?',
        [
          'Comet 67P: mainly the source of Earth’s water',
          'Bennu: a carbon-rich carrier of life’s ingredients',
          'Makemake: an active ocean world',
          'Venus: a former ocean world',
        ],
        1,
        'A returned sample with clays, brine salts, organics, and Earth-like D/H matches Bennu, a carbon-rich asteroid that carried life’s ingredients.',
      ),
    },
    {
      ...c(
        'Exoplanets: detection and the named systems',
        [
          'Explain transit, radial velocity, microlensing, and direct imaging.',
          'Describe TRAPPIST-1, Kepler-452, and LHS 1140.',
          'Describe the roles of Kepler, JWST, and the Roman Space Telescope.',
        ],
        [
          [
            'Transits',
            'A transit occurs when a planet passes in front of its star and blocks a little light. The fractional dip in brightness, the transit depth, equals (Rp/Rs)², the ratio of planet to star radius squared. An Earth-sized planet crossing a Sun-like star dims it by only about 0.01%, but the same planet crossing a small red dwarf causes a much deeper dip. The time between transits gives the orbital period.',
          ],
          [
            'Radial velocity',
            'A planet and its star orbit their common center of mass, so the star wobbles. As it moves toward and away from us, its spectral lines shift by the Doppler effect. Larger planet masses and closer orbits cause bigger wobbles. Radial velocity gives a planet’s minimum mass. Combining it with transit radius gives density, which tells whether a planet is rocky, water-rich, or gaseous.',
          ],
          [
            'Microlensing and direct imaging',
            'In gravitational microlensing, a foreground star passing in front of a distant star bends and brightens its light; a planet around the foreground star adds a short extra spike. Microlensing finds planets far from their stars and even free-floating planets, but each event happens once. Direct imaging blocks starlight with a coronagraph or starshade to photograph planets, working best for large, young, hot planets far from their stars.',
          ],
          [
            'TRAPPIST-1',
            'TRAPPIST-1 is an ultracool red dwarf about 40 light-years away with seven roughly Earth-sized rocky planets, all orbiting closer than Mercury does to the Sun. Several, especially e, f, and g, lie in the habitable zone. The planets are likely tidally locked. JWST measurements suggest the innermost planets b and c lack thick atmospheres, a reminder that red dwarf flares may strip atmospheres from close planets.',
          ],
          [
            'Kepler-452 and LHS 1140',
            'Kepler-452b is a super-Earth about 1.6 times Earth’s radius orbiting a Sun-like G star in its habitable zone with a period of 385 days, roughly 1,400–1,800 light-years away; later reanalysis has questioned how secure its detection is. LHS 1140 b orbits a red dwarf about 48 light-years away in its habitable zone. It is a super-Earth about 1.7 times Earth’s radius, and its density suggests either a rocky world or one rich in water; JWST observations hint it may have an atmosphere.',
          ],
          [
            'Kepler, JWST, and Roman',
            'NASA’s Kepler telescope stared at one patch of sky from 2009 to 2018, using transits to find thousands of planets and showing that small planets are common. JWST observes in the infrared and uses transmission spectroscopy, studying starlight filtered through a planet’s atmosphere during transit, to detect gases such as carbon dioxide and water. The Nancy Grace Roman Space Telescope will survey the galactic center for microlensing planets and test a coronagraph for direct imaging.',
          ],
        ],
        [
          ['Transit depth', 'Fractional brightness drop, equal to (Rp/Rs)².'],
          ['Radial velocity', 'Star’s motion toward or away from us, from Doppler shifts.'],
          ['Microlensing', 'Brightening of a background star by a foreground mass.'],
          ['Coronagraph', 'Instrument that blocks starlight to image faint companions.'],
          ['Transmission spectrum', 'Starlight filtered through a planet’s atmosphere.'],
          ['Super-Earth', 'Planet larger than Earth but smaller than Neptune.'],
        ],
        [
          'An Earth-sized planet transits two stars: a Sun-like star and a red dwarf with one-tenth the Sun’s radius. Compare the transit depths.',
          [
            'Depth = (Rp/Rs)².',
            'Earth’s radius is about 1/109 of the Sun’s, giving a depth near 1/12,000, about 0.008%.',
            'With Rs one-tenth as large, (Rp/Rs) is 10 times bigger, so the depth is 100 times deeper, about 0.8%.',
          ],
          'The red dwarf transit is about 100 times deeper, which is why small planets are easier to find around small stars.',
        ],
        [
          [
            'Which method directly gives a planet’s radius?',
            'Transit',
            ['Radial velocity', 'Microlensing alone', 'Astrometry'],
            'Transit depth depends on the planet-to-star radius ratio.',
          ],
          [
            'Which telescope used transmission spectroscopy to study TRAPPIST-1 planets?',
            'JWST',
            ['Kepler', 'Rosetta', 'MAVEN'],
            'JWST’s infrared spectra probe exoplanet atmospheres.',
          ],
          [
            'Why are habitable-zone planets around red dwarfs likely tidally locked?',
            'They orbit very close to their dim stars',
            [
              'They are very far from their stars',
              'Red dwarfs have no gravity',
              'They have thick rings',
            ],
            'Strong tides at small distances quickly lock rotation.',
          ],
        ],
        [
          [
            'Explain how combining transit and radial velocity data reveals a planet’s composition.',
            'Transits give the radius and radial velocity gives the mass. Together they give density, which shows whether the planet is rocky, water-rich, or gaseous.',
          ],
          [
            'Why can microlensing not be used to follow up a planet?',
            'The alignment of the foreground and background stars happens only once, so the event cannot be repeated.',
          ],
          [
            'What does the TRAPPIST-1 system show about habitability around red dwarfs?',
            'Red dwarfs can host several rocky planets in the habitable zone, but flares and close orbits may strip atmospheres, as JWST data suggest for the inner planets.',
          ],
          [
            'Why is direct imaging easiest for young, large planets far from their stars?',
            'They are bright in infrared because they are still hot, and wide separation makes them easier to resolve next to the star’s glare.',
          ],
        ],
        [
          ['Detect', 'Transits, wobbles, lensing, or images reveal a planet.'],
          ['Characterize', 'Radius, mass, density, and orbit follow.'],
          ['Probe', 'Spectra test the atmosphere for habitability clues.'],
        ],
        [
          ['Transit', 'Brightness dip gives radius and period', 'Needs an edge-on orbit.'],
          [
            'Radial velocity',
            'Doppler wobble gives minimum mass',
            'Hard for small, distant planets.',
          ],
          ['Direct imaging', 'Photographs the planet', 'Works best for wide, bright planets.'],
        ],
        'Choose the detection method and system that best fit each set of observations.',
        'Each method sees a different property; combining them builds a picture of a world.',
      ),
      investigation: evidence(
        [
          ['Light curve', 'Seven different periodic dips in brightness.'],
          ['Star', 'An ultracool red dwarf, about 40 light-years away.'],
          ['Sizes', 'All planets are roughly Earth-sized.'],
          ['JWST', 'The two innermost planets show no thick atmosphere.'],
        ],
        'Which system is described?',
        ['Kepler-452', 'TRAPPIST-1', 'LHS 1140', 'The solar system'],
        1,
        'Seven Earth-sized transiting planets around an ultracool red dwarf 40 light-years away is TRAPPIST-1.',
      ),
    },
  ],
});
