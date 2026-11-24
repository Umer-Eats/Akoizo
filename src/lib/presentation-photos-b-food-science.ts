import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Food Science (Division B) presentations, served from public/presentations.
export const photos = {
  'b-food-casein-acid': {
    file: 'b-food-casein-acid.jpg',
    width: 1200,
    height: 1125,
    alt: 'A glass beaker of milk on a lab bench, thick with white clumps after vinegar was added.',
    caption:
      'Milk after adding vinegar (acetic acid): the casein micelles have clumped into white curds.',
    credit: 'ZuzanaBrabcova',
    source: commons('Agregace_micel_kaseinu_v_mléce_při_změně_pH_přidáním_kyseliny_octové.jpg'),
  },
  'b-food-churn': {
    file: 'b-food-churn.jpg',
    width: 1200,
    height: 898,
    alt: 'An old black-and-white photo of a factory worker beside a huge wooden barrel churn turned by belts and pulleys.',
    caption:
      'An early-1900s factory butter churn: a rotating barrel tumbles cream until the fat clumps into butter.',
    credit: 'Artemas Ward, The Encyclopedia of Food (photo by Brown Bros.)',
    source: commons('Early_20th_century_industrial_butter_churning.png'),
  },
  'b-food-label': {
    file: 'b-food-label.png',
    width: 1200,
    height: 579,
    alt: 'The 2016 U.S. Nutrition Facts label shown in two halves: serving size, calories, fats, cholesterol and sodium on the left; carbohydrates, sugars, protein, vitamin D, calcium, iron, potassium and the percent Daily Value note on the right.',
    caption:
      'The FDA Nutrition Facts label, split in two: serving size and calories first, then nutrients with their % Daily Value.',
    credit: 'U.S. Food and Drug Administration',
    source: commons('FDA_Nutrition_Facts_Label_2016.png'),
  },
  'b-food-lactose-hydrolysis': {
    file: 'b-food-lactose-hydrolysis.png',
    width: 1200,
    height: 268,
    alt: 'Ring structures of lactose, an arrow labeled lactase and water, then two separate rings labeled D-galactose and D-glucose.',
    caption: 'Lactase uses water to split lactose into its two sugar units, galactose and glucose.',
    credit: 'Edgar181',
    source: commons('Lactose_hydrolysis.svg'),
  },
  'b-food-micelle': {
    file: 'b-food-micelle.png',
    width: 1200,
    height: 852,
    alt: 'Small green and red sub-micelles on the left, and on the right many of them packed into one round micelle held by dark calcium phosphate dots, with red kappa-casein tips on the outside.',
    caption:
      'A casein micelle: sub-micelles held together by calcium phosphate, with kappa-casein (red) on the surface.',
    credit: 'ZonkerHarris',
    source: commons('Caseine_micelle.svg'),
  },
  'b-food-triglyceride': {
    file: 'b-food-triglyceride.png',
    width: 1200,
    height: 327,
    alt: 'A glycerol backbone on the left joined by ester bonds to three zigzag fatty acid chains: a straight one with no double bonds, one with one double bond, and one with three double bonds.',
    caption:
      'A triglyceride: glycerol joined to three fatty acids, one saturated (top) and two unsaturated with double bonds.',
    credit: 'Nothingserious',
    source: commons('Fat_triglyceride_shorthand_formula.svg'),
  },
} satisfies Record<string, Photo>;
