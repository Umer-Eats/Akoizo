import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Thermodynamics presentations, served from public/presentations.
export const photos = {
  'thermo-thermometer': {
    file: 'thermo-thermometer.jpg',
    width: 1200,
    height: 2089,
    alt: 'A wall thermometer with a red liquid column read against two scales, Celsius on the left and kelvin on the right.',
    caption:
      'Celsius and kelvin side by side: each step is the same size, but 0 °C sits at about 273 K.',
    credit: 'Martinvl',
    source: commons('CelsiusKelvinThermometer.jpg'),
  },
  'thermo-thermogram': {
    file: 'thermo-thermogram.jpg',
    width: 1200,
    height: 757,
    alt: 'An infrared image of a building and trees in false color, with an insulated block in blue and an uninsulated one glowing yellow and green.',
    caption:
      'A thermal camera sees infrared radiation: the warm (yellow) walls are losing more heat than the well-insulated blue ones.',
    credit: 'Passivhaus Institut',
    source: commons('Passivhaus_thermogram_gedaemmt_ungedaemmt.png'),
  },
  'thermo-phase': {
    file: 'thermo-phase.png',
    width: 1200,
    height: 1003,
    alt: 'A pressure–temperature phase diagram with solid, liquid and vapor regions, a triple point, a critical point and a supercritical fluid region.',
    caption:
      'A generic phase diagram: the curves are coexistence lines meeting at the triple point; the liquid–vapor line ends at the critical point.',
    credit: 'Matthieu Marechal',
    source: commons('Phase-diag2.svg'),
  },
  'thermo-water-phase': {
    file: 'thermo-water-phase.png',
    width: 1200,
    height: 1000,
    alt: 'A detailed phase diagram of water on log pressure against temperature, showing many ice forms, liquid, vapor, the triple point and the critical point.',
    caption:
      'Water’s real phase diagram: many ice phases at high pressure, and a triple point at 273.16 K and 611.657 Pa.',
    credit: 'Cmglee',
    source: commons('Phase_diagram_of_water.svg'),
  },
  'thermo-heating-curve': {
    file: 'thermo-heating-curve.png',
    width: 1200,
    height: 800,
    alt: 'A temperature against heat added graph rising through solid, a flat melting line at 0°, rising liquid, a flat boiling line at 100°, then gas.',
    caption:
      'A heating curve: temperature climbs within each phase and stays flat while the phase changes.',
    credit: 'C3bc-taaccct',
    source: commons('Heating-Curve.png'),
  },
  'thermo-cup-calorimeter': {
    file: 'thermo-cup-calorimeter.jpg',
    width: 500,
    height: 750,
    alt: 'A thermometer clamped to a ring stand, dipping into a lidded foam cup.',
    caption:
      'A coffee-cup calorimeter: a foam cup limits heat exchange so the hot and cold parts trade energy with each other.',
    credit: 'Community College Consortium for Bioscience Credentials',
    source: commons('Coffee_cup_calorimeter_pic.jpg'),
  },
  'thermo-maxwell': {
    file: 'thermo-maxwell.png',
    width: 1200,
    height: 801,
    alt: 'Four speed distribution curves for helium, neon, argon and xenon: xenon peaks tall and slow, helium is low and spread to high speeds.',
    caption:
      'At the same temperature, lighter atoms move faster on average, but every gas has a spread of speeds.',
    credit: 'Pdbailey and later uploaders',
    source: commons('MaxwellBoltzmann-en.svg'),
  },
  'thermo-processes': {
    file: 'thermo-processes.png',
    width: 500,
    height: 503,
    alt: 'A P–V diagram with three compression curves from state 1 to state 2: isothermal, isentropic and polytropic, with shaded areas between them.',
    caption:
      'Compressions from the same start: the isothermal path is shallowest and the adiabatic paths are steeper; the area under each is the work.',
    credit: 'Mattia Luigi Nappi',
    source: commons('Diagram_of_isothermal,_isoentropic_and_polytropic_gas_compressions.png'),
  },
  'thermo-carnot-pv': {
    file: 'thermo-carnot-pv.png',
    width: 1200,
    height: 888,
    alt: 'A P–V diagram of a four-sided loop 1–2–3–4 between two isotherms T1 and T2, with heat Q1 entering and Q2 leaving.',
    caption:
      'A Carnot cycle on a P–V diagram: two isotherms and two adiabats; the enclosed area is the net work.',
    credit: 'Keta',
    source: commons('Carnot_cycle_p-V_diagram.svg'),
  },
  'thermo-free-expansion': {
    file: 'thermo-free-expansion.png',
    width: 1200,
    height: 1620,
    alt: 'Two panels of two linked bulbs with thermometers: first gas fills one bulb behind a closed valve, then the valve is open and gas fills both.',
    caption:
      'Free (Joule) expansion: the gas rushes into the empty bulb and does no work; an ideal gas keeps its temperature, yet entropy rises.',
    credit: 'Olivier Cleynen',
    source: commons('Joule_and_Gay-lussac_expansion.svg'),
  },
  'thermo-carnot-engine': {
    file: 'thermo-carnot-engine.png',
    width: 1200,
    height: 529,
    alt: 'A hot reservoir TH sends heat QH to a circle that outputs work W and sends heat QC to a cold reservoir TC.',
    caption:
      'A heat engine takes QH from the hot reservoir, delivers work W and rejects QC to the cold reservoir: W = QH − QC.',
    credit: 'Eric Gaba (Sting)',
    source: commons('Carnot_heat_engine_2.svg'),
  },
  'thermo-perkins': {
    file: 'thermo-perkins.png',
    width: 1200,
    height: 807,
    alt: 'An 1834 drawing of a hand-cranked pump with a flywheel between a worm tub and a box of water to be frozen.',
    caption:
      'Jacob Perkins’ 1834 vapor-compression ice machine: work moved heat out of water to freeze it.',
    credit: 'Frederick Bramwell',
    source: commons("Jacob_Perkins'_Ice_Machine_1834_from_Scientific_American_Article.jpg"),
  },
  'thermo-joule': {
    file: 'thermo-joule.png',
    width: 1200,
    height: 988,
    alt: 'An engraving of a paddle-wheel apparatus: a falling weight on a cord turns a spindle inside a water vessel.',
    caption:
      'Joule’s paddle-wheel apparatus: a falling weight stirred water, and the warming linked mechanical work to heat.',
    credit: 'Jacob Abbott',
    source: commons("Joule's_Apparatus_(Harper's_Scan).png"),
  },
  'thermo-boltzmann': {
    file: 'thermo-boltzmann.jpg',
    width: 1200,
    height: 1506,
    alt: 'A black-and-white portrait of Ludwig Boltzmann with full beard and glasses, with his signature below.',
    caption:
      'Ludwig Boltzmann linked entropy to the number of microscopic arrangements of a system.',
    credit: 'Unknown author',
    source: commons('Boltzmann2.jpg'),
  },
  'thermo-blackbody': {
    file: 'thermo-blackbody.png',
    width: 1200,
    height: 960,
    alt: 'Blackbody spectra for 5000 K, 4000 K and 3000 K peaking at shorter wavelengths for hotter bodies, beside a classical theory curve that rises without limit.',
    caption:
      'Planck’s blackbody curves: hotter bodies emit more and peak at shorter wavelengths; the classical curve fails at short wavelengths.',
    credit: 'Darth Kule',
    source: commons('Black_body.svg'),
  },
  'thermo-ice-calorimeter': {
    file: 'thermo-ice-calorimeter.jpg',
    width: 1200,
    height: 1600,
    alt: 'A museum display of an 18th-century ice calorimeter: a dark double-walled vessel beside other instruments.',
    caption: 'Lavoisier and Laplace’s ice calorimeter measured heat by the mass of ice it melted.',
    credit: 'Vacalm',
    source: commons('Ice-Calorimeter_of_Lavoisier-Laplace.jpg'),
  },
} satisfies Record<string, Photo>;
