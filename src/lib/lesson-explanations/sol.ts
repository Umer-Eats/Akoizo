// Checkpoint explanations for Solar System (Division B), keyed by question id.
export const solarSystem: Record<string, string> = {
  'sol-u1-l1-q1':
    'Life as we know it needs liquid water as a solvent, an energy source (light or chemical) and key elements such as carbon, hydrogen, nitrogen, oxygen, phosphorus and sulfur. Oxygen and soil are not required; many microbes live without both.',
  'sol-u1-l1-q2':
    'Heat makes gas molecules move fast, and light gases like hydrogen move fastest. A small world has weak gravity, so its escape velocity is low. When molecular speeds approach that escape velocity, light gases leak into space.',
  'sol-u1-l1-q3':
    'Hydrogen and carbon dioxide can react to make methane and release energy. Finding both together means the system is out of chemical balance (disequilibrium), providing an energy source microbes on Earth use.',
  'sol-u1-l1-q4':
    'The habitable zone is based on distance from the star, but surface temperature also depends on albedo and the atmosphere. A planet with no atmosphere may freeze, and one with a runaway greenhouse, like Venus, can be far too hot.',
  'sol-u1-l1-q5':
    'In an orbital resonance, neighboring moons tug on each other at regular intervals. These tugs keep each orbit elliptical, so the moon’s distance from the planet keeps changing. The changing tidal pull flexes the moon and generates heat.',
  'sol-u1-l1-q6':
    'Dissolved salts lower the freezing point of water. Salty brines can therefore stay liquid well below 0 °C, as may happen in icy moon oceans or briefly on Mars.',
  'sol-u1-l1-q7':
    'Oxygen and methane react with each other and should not last long together. If both are present, something must keep resupplying them. On Earth that source is mostly life, so the pair is a possible biosignature.',
  'sol-u2-l1-q1':
    'Flux follows the inverse-square law: F ∝ 1/d². Doubling the distance from 1 AU to 2 AU gives (1/2)² = 1/4 of the original flux. 1/2 forgets to square the distance.',
  'sol-u2-l1-q2':
    'By the Stefan–Boltzmann law, power per area ∝ T⁴. Doubling the temperature gives 2⁴ = 16 times as much. 4 times would come from squaring instead of raising to the fourth power.',
  'sol-u2-l1-q3':
    'Wien’s law: λmax = 2,898 µm·K ÷ T. At 300 K, λmax ≈ 9.7 µm, which is in the infrared. Visible light needs temperatures of thousands of kelvins, like the Sun’s surface.',
  'sol-u2-l1-q4':
    'Earth’s equilibrium temperature is about 255 K (−18 °C). Greenhouse gases absorb outgoing infrared radiation and send some back toward the surface, warming the actual average to about 288 K (15 °C).',
  'sol-u2-l1-q5':
    'Albedo is the fraction of incoming light reflected. A higher albedo reflects more light, so less energy is absorbed. To stay in balance, the planet needs to emit less, so its equilibrium temperature is lower.',
  'sol-u2-l1-q6':
    'Wien’s law says peak wavelength is inversely proportional to temperature. Star B is half as hot (3,000 K vs 6,000 K), so its peak wavelength is twice as long, shifted toward the red and infrared.',
  'sol-u2-l1-q7':
    'A shorter wavelength than expected is a blueshift. By the Doppler effect, it means the source is moving toward the observer. A longer wavelength (redshift) would mean it is moving away.',
  'sol-u3-l1-q1':
    'Kepler’s third law for the Sun: P² = a³ with P in years and a in AU. a³ = 9³ = 729, so P = √729 = 27 years. 81 years squares the distance instead.',
  'sol-u3-l1-q2':
    'Gravity follows an inverse-square law: F ∝ 1/r². Tripling the distance gives 1/3² = 1/9 of the original force. 1/27 would be the inverse-cube dependence used for tidal force.',
  'sol-u3-l1-q3':
    'Tidal force is the difference in gravity between the near and far sides of a body. That difference falls off faster than gravity itself, as 1/d³, so tides weaken sharply with distance.',
  'sol-u3-l1-q4':
    'Kepler’s second law says a line from the star to the planet sweeps equal areas in equal times. Near the star (periapsis) the line is short, so the planet must move faster; far away it moves slower.',
  'sol-u3-l1-q5':
    'Tidal force depends on M/d³. The Sun is about 27 million times more massive than the Moon but about 390 times farther away, and 390³ ≈ 59 million. The distance factor wins, so the Moon’s tides are about twice as strong.',
  'sol-u3-l1-q6':
    'Red dwarfs are dim, so their habitable zones lie very close to the star. Kepler’s third law gives short periods for small orbits, often just days or weeks.',
  'sol-u3-l1-q7':
    'A tidally locked planet keeps one side facing its star. That side gets constant light and heat while the other stays dark. Winds or oceans must carry heat around the planet to prevent extreme temperature differences.',
  'sol-u4-l1-q1':
    'Venus has a very thick CO₂ atmosphere that traps infrared radiation in a runaway greenhouse effect, heating the surface to about 465 °C. Mercury is closer to the Sun but has almost no atmosphere, so heat escapes.',
  'sol-u4-l1-q2':
    'Deuterium is heavier than ordinary hydrogen, so it escapes to space more slowly. If Venus lost a lot of water, the remaining hydrogen would become enriched in deuterium, giving a high D/H ratio.',
  'sol-u4-l1-q3':
    'MAVEN (Mars Atmosphere and Volatile EvolutioN) orbits Mars to measure how gas escapes from the upper atmosphere. Perseverance is a rover, and DAVINCI and Venus Express study Venus.',
  'sol-u4-l1-q4':
    'Mars’s atmospheric pressure is less than 1% of Earth’s. At such low pressure, liquid water quickly boils or sublimes, and surface temperatures are usually below freezing, so liquid water cannot last on the surface.',
  'sol-u4-l1-q5':
    'A global magnetic field deflects the solar wind. Once Mars lost its field, the solar wind could strip gas directly from the upper atmosphere. Over billions of years, this helped thin the atmosphere.',
  'sol-u4-l1-q6':
    'DAVINCI is a probe that descends through Venus’s atmosphere, measuring its composition and imaging the surface below. VERITAS is an orbiter that uses radar to map topography and identify rock types across the whole planet.',
  'sol-u4-l1-q7':
    'Jezero crater holds an ancient river delta and lake deposits. Fine sediments in such environments are good at preserving chemical and physical signs of ancient microbial life, making it a strong place to search.',
  'sol-u5-l1-q1':
    'Ganymede is the only moon known to generate its own magnetic field, from a molten iron core. Europa shows an induced field from Jupiter, which is evidence of a salty ocean, but not its own field.',
  'sol-u5-l1-q2':
    'Silica nanoparticles this small form when hot water (above about 90 °C) dissolves silica from rock and then cools. Finding them in the plume points to hydrothermal activity on Enceladus’s seafloor.',
  'sol-u5-l1-q3':
    'Titan’s surface is about −180 °C. At that temperature methane and ethane are liquid, while water is frozen as hard as rock. So Titan’s lakes and seas hold liquid hydrocarbons.',
  'sol-u5-l1-q4':
    'Europa likely has a large salty ocean beneath its ice, kept liquid by tidal heating. The ocean touches a rocky seafloor, where water–rock reactions could supply chemical energy. That combines water, energy and chemistry.',
  'sol-u5-l1-q5':
    'Enceladus’s plume sprays ocean material into space. A spacecraft can sample it by flying through the plume, without having to land or drill through kilometers of ice.',
  'sol-u5-l1-q6':
    'On Titan, methane evaporates, forms clouds, falls as rain, flows in rivers and collects in lakes, just like water on Earth. The main difference is temperature: Titan’s cycle works at about −180 °C.',
  'sol-u5-l1-q7':
    'JUICE (JUpiter ICy moons Explorer) will be the first spacecraft to orbit a moon of another planet. After flybys of several moons, it will enter orbit around Ganymede.',
  'sol-u6-l1-q1':
    'OSIRIS-REx collected material from asteroid Bennu and returned it to Earth in 2023. Rosetta studied a comet, Dragonfly will explore Titan and Kepler searched for exoplanets.',
  'sol-u6-l1-q2':
    'Lipids have water-loving heads and water-fearing tails, so they arrange into bilayers that form cell membranes. Nucleic acids store genetic information, and proteins and carbohydrates have other main roles.',
  'sol-u6-l1-q3':
    'A chemolithoautotroph gets energy from inorganic chemicals such as hydrogen sulfide (chemo-litho) and builds its own carbon compounds from CO₂ (autotroph). With no light at the vent, it cannot be a photoautotroph.',
  'sol-u6-l1-q4':
    'Laboratories on Earth have instruments far more sensitive than any spacecraft can carry. Scientists can repeat analyses, measure isotopes precisely and detect trace molecules like amino acids, even decades later with new tools.',
  'sol-u6-l1-q5':
    'A clathrate is an ice structure whose water molecules form cages that trap gas molecules such as methane. Clathrates may store methane on Titan, Mars or icy moons and release it later.',
  'sol-u6-l1-q6':
    'Extremophiles live in conditions once thought impossible: no sunlight, extreme cold or heat, high salt or high pressure. They widen the range of places, like icy-moon oceans, where life might exist.',
  'sol-u6-l1-q7':
    'Bennu samples contain hydrated clay minerals and evaporite salts. These form when liquid water flows through rock or brines evaporate, showing water once existed on Bennu’s parent body.',
  'sol-u7-l1-q1':
    'In a transit, the planet blocks part of the starlight. The dip depth equals (planet radius ÷ star radius)², so it gives the planet’s radius directly. Radial velocity gives mass, not radius.',
  'sol-u7-l1-q2':
    'JWST measures infrared starlight filtered through a planet’s atmosphere during a transit (transmission spectroscopy). It has studied TRAPPIST-1 planets. Kepler found planets but could not measure atmospheres in detail.',
  'sol-u7-l1-q3':
    'Red dwarfs are dim, so their habitable zones are very close in. At such small distances, strong tidal forces quickly slow the planet’s spin until one side always faces the star.',
  'sol-u7-l1-q4':
    'A transit gives the planet’s radius, and radial velocity gives its mass. Density = mass ÷ volume, so combining them gives density. High density means rocky; lower values suggest water-rich or gaseous planets.',
  'sol-u7-l1-q5':
    'Microlensing requires a chance alignment of a foreground star with a more distant background star. That alignment happens only once and does not repeat, so the planet cannot be observed again the same way.',
  'sol-u7-l1-q6':
    'TRAPPIST-1 shows a red dwarf can host several rocky planets in its habitable zone. But flares and close orbits may strip atmospheres; JWST data suggest the inner planets have little or no atmosphere.',
  'sol-u7-l1-q7':
    'Young giant planets are still hot from forming, so they glow brightly in infrared. Being far from the star makes them easier to separate from its glare in images.',
};
