import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Disease Detectives presentations, served from public/presentations.
export const photos = {
  'dd-chain-infection': {
    file: 'dd-chain-infection.png',
    width: 1200,
    height: 923,
    alt: 'A circular diagram of six linked boxes: infectious agents, reservoirs, portals of exit, modes of transmission, portals of entry and susceptible host, each with examples.',
    caption: 'The chain of infection: breaking any one link interrupts transmission.',
    credit: 'Genieieiop',
    source: commons('Chain_of_Infection.png'),
  },
  'dd-epi-curve': {
    file: 'dd-epi-curve.png',
    width: 1200,
    height: 728,
    alt: 'A WHO bar chart of weekly MERS-CoV cases by week of onset from 2012 to 2015, mostly blue Saudi bars with a red spike for the Republic of Korea in 2015.',
    caption:
      'An epidemic curve of MERS-CoV by week of onset: sharp spikes mark hospital outbreaks, including Korea’s in 2015.',
    credit: 'WHO data, chart by Globalhealthanddisease28',
    source: commons('Mers-epicurve-16-october-2015.png'),
  },
  'dd-lind': {
    file: 'dd-lind.jpg',
    width: 1200,
    height: 1413,
    alt: 'An 18th-century oil portrait of James Lind in a powdered wig, resting his hand on books.',
    caption: 'James Lind, whose 1747 scurvy comparison is an early controlled trial.',
    credit: 'George Chalmers',
    source: commons('James_Lind_by_Chalmers.jpg'),
  },
  'dd-nipah': {
    file: 'dd-nipah.png',
    width: 1200,
    height: 775,
    alt: 'A bar chart of reported Nipah virus cases and deaths in Bangladesh by year from 2001 to 2023, with a line for the case fatality rate.',
    caption:
      'Surveillance data: reported Nipah cases, deaths and case fatality rate in Bangladesh by year.',
    credit: 'World Health Organization, from Bangladesh Ministry of Health data',
    source: commons('Nvi_bangladesh_epicurve.jpg'),
  },
  'dd-semmelweis': {
    file: 'dd-semmelweis.png',
    width: 1200,
    height: 708,
    alt: 'A line chart of monthly puerperal fever mortality from 1841 to 1849, swinging up to 30 percent and falling to near zero after a red line marking chlorine hand-washing in 1847.',
    caption:
      'Monthly maternal deaths in Semmelweis’s clinic fell sharply after chlorine hand-washing began in 1847.',
    credit: 'Power.corrupts',
    source: commons('Monthly_mortality_rates_1841-1849.png'),
  },
  'dd-sens-spec': {
    file: 'dd-sens-spec.png',
    width: 1200,
    height: 1420,
    alt: 'A rectangle of dots: filled dots on the left are people with the condition, open dots on the right are without it, and a circle marks those testing positive, split into true and false positives.',
    caption:
      'Inside the circle are positive tests: true positives (left) and false positives (right). Outside are false negatives and true negatives.',
    credit: 'FeanDoe, after Walber',
    source: commons('Sensitivity_and_specificity_1.01.svg'),
  },
  'dd-snow-map': {
    file: 'dd-snow-map.jpg',
    width: 1200,
    height: 1126,
    alt: 'John Snow’s 1854 street map of Soho, London, with black bars stacked at addresses showing cholera deaths clustered around Broad Street.',
    caption:
      'Snow’s cholera map: each bar is a death, and they cluster around the Broad Street pump.',
    credit: 'John Snow',
    source: commons('Snow-cholera-map-1.jpg'),
  },
} satisfies Record<string, Photo>;
