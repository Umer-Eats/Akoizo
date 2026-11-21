import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Chemistry Lab presentations, served from public/presentations.
export const photos = {
  'chem-periodic-trends': {
    file: 'chem-periodic-trends.png',
    width: 1200,
    height: 694,
    alt: 'A small periodic table with arrows: ionization energy and electron affinity rise to the right and up, atomic radius grows to the left and down, metallic character grows toward the lower left.',
    caption:
      'Periodic trends: ionization energy rises across and up the table; atomic radius grows down and to the left.',
    credit: 'Mirek2',
    source: commons('Periodic_trends.svg'),
  },
  'chem-hbond-water': {
    file: 'chem-hbond-water.png',
    width: 960,
    height: 586,
    alt: 'Two water molecules with partial charges, the δ+ hydrogen of one joined by a dashed line to the δ− oxygen of the other.',
    caption:
      'A hydrogen bond (dashed) links the δ+ hydrogen of one water molecule to a lone pair on the δ− oxygen of the next.',
    credit: 'Benjah-bmm27',
    source: commons('Hydrogen-bonding-in-water-2D.png'),
  },
  'chem-precipitate': {
    file: 'chem-precipitate.jpg',
    width: 1200,
    height: 1600,
    alt: 'A test tube of cloudy liquid with a white solid settled at the bottom.',
    caption: 'A white silver chloride precipitate settles out of solution in a test tube.',
    credit: 'Dr.T',
    source: commons('AgCl-neerslag.jpg'),
  },
  'chem-gas-laws': {
    file: 'chem-gas-laws.png',
    width: 1200,
    height: 801,
    alt: 'The expression PV over TN equals a constant, with colored bands showing which pairs of variables form Boyle’s, Charles’s, Gay-Lussac’s, Avogadro’s, combined and ideal gas laws.',
    caption: 'Each named gas law links two variables of PV/(nT) while the others are held fixed.',
    credit: 'Cmglee',
    source: commons('Ideal_gas_law_relationships.svg'),
  },
  'chem-no2-equilibrium': {
    file: 'chem-no2-equilibrium.jpg',
    width: 1200,
    height: 952,
    alt: 'Five sealed glass ampoules of nitrogen dioxide and dinitrogen tetroxide, from nearly colorless on the left to dark red-brown on the right.',
    caption:
      'Sealed NO₂/N₂O₄ ampoules at different temperatures: colder samples favor colorless N₂O₄, hotter ones brown NO₂.',
    credit: 'Eframgoldberg',
    source: commons('Nitrogen_dioxide_at_different_temperatures.jpg'),
  },
  'chem-titration-curve': {
    file: 'chem-titration-curve.png',
    width: 1200,
    height: 968,
    alt: 'A titration curve of pH against volume of NaOH added: a slow rise, a near-vertical jump at 10 mL through pH 7, then a plateau, with phenolphthalein and methyl orange color ranges shaded.',
    caption:
      'A strong acid titrated with NaOH: the pH jumps steeply at the equivalence point; indicator color ranges are shaded.',
    credit: 'すじにくシチュー and Johannes Kalliauer',
    source: commons('CH3COOH_titration-curve_en.svg'),
  },
  'chem-calorimeter': {
    file: 'chem-calorimeter.jpg',
    width: 500,
    height: 750,
    alt: 'Two nested foam cups with a lid and a thermometer clamped on a ring stand.',
    caption:
      'A coffee-cup calorimeter: nested foam cups insulate the water, and a thermometer tracks its temperature change.',
    credit: 'Community College Consortium for Bioscience Credentials',
    source: commons('Coffee_cup_calorimeter_pic.jpg'),
  },
  'chem-activation-energy': {
    file: 'chem-activation-energy.png',
    width: 1200,
    height: 960,
    alt: 'An energy diagram along a reaction path from X to Y: a tall barrier without catalyst and a lower dashed barrier with catalyst, with Ea and ΔH marked.',
    caption:
      'A catalyst lowers the activation energy (dashed path) but leaves ΔH between reactant and product unchanged.',
    credit: 'Wikimedia Commons contributors',
    source: commons('Activation_energy.svg'),
  },
  'chem-michaelis-menten': {
    file: 'chem-michaelis-menten.png',
    width: 1200,
    height: 512,
    alt: 'A curve of reaction rate against substrate concentration rising steeply then leveling toward Vmax, with half Vmax and Km marked by dashed lines.',
    caption:
      'The Michaelis–Menten curve: the rate is half of Vmax when substrate concentration equals Km.',
    credit: 'Thomas Shafee',
    source: commons('Michaelis_Menten_curve_2.svg'),
  },
} satisfies Record<string, Photo>;
