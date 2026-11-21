import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Experimental Design presentations, served from public/presentations.
export const photos = {
  'xd-method': {
    file: 'xd-method.png',
    width: 1200,
    height: 1140,
    alt: 'A circle of arrows linking observation or question, research, hypothesis, test with experiment, analyze data and report conclusions.',
    caption:
      'The investigation cycle: question, hypothesis, test, analyze, report, and back to new questions.',
    credit: 'Efbrazil',
    source: commons('The_Scientific_Method.svg'),
  },
  'xd-hahn-notebook': {
    file: 'xd-hahn-notebook.jpg',
    width: 1200,
    height: 900,
    alt: 'An open handwritten lab notebook with dated notes on the left page and columns of numbers on the right.',
    caption:
      'Otto Hahn’s 1938 notebook: raw readings recorded by hand at the time they were measured.',
    credit: 'J Brew',
    source: commons("Otto_Hahn's_notebook_1938_-_Deutsches_Museum_-_Munich.jpg"),
  },
  'xd-sd': {
    file: 'xd-sd.png',
    width: 1200,
    height: 600,
    alt: 'A bell curve split into bands one standard deviation wide, labeled 34.1%, 13.6%, 2.1% and 0.1% on each side.',
    caption:
      'For a normal distribution, about 68% of values lie within one SD of the mean and 95% within two.',
    credit: 'M. W. Toews',
    source: commons('Standard_deviation_diagram.svg'),
  },
  'xd-anscombe': {
    file: 'xd-anscombe.png',
    width: 1200,
    height: 873,
    alt: 'Four scatter plots with the same fitted line: one scattered, one curved, one straight with an outlier, and one vertical stack with a single far point.',
    caption:
      'Anscombe’s quartet: four data sets with the same means, fit line and R², but very different patterns.',
    credit: 'Schutz and Avenue',
    source: commons("Anscombe's_quartet_3.svg"),
  },
  'xd-correlation': {
    file: 'xd-correlation.png',
    width: 1200,
    height: 549,
    alt: 'Rows of small scatter plots labeled with correlation from 1 to −1, then lines of different slopes, then curved and patterned clouds labeled 0.',
    caption:
      'Correlation measures how tightly points follow a line, not its slope, and misses curved patterns.',
    credit: 'DenisBoigelot',
    source: commons('Correlation_examples2.svg'),
  },
  'xd-boxplot': {
    file: 'xd-boxplot.png',
    width: 1200,
    height: 1308,
    alt: 'A box plot with median, Q1, Q3 and whiskers at 1.5 IQR drawn above two normal curves showing the matching percentages.',
    caption: 'A box plot flags points beyond 1.5 IQR from the box as possible outliers.',
    credit: 'Jhguch and Chen-Pan Liao',
    source: commons('Boxplot_vs_PDF.svg'),
  },
  'xd-acc-lowprec': {
    file: 'xd-acc-lowprec.png',
    width: 1200,
    height: 1200,
    alt: 'A red and white target with four black hits spread widely around the bullseye.',
    caption: 'Accurate but imprecise: hits center on the bullseye but spread widely.',
    credit: 'DarkEvil',
    source: commons('High_accuracy_Low_precision.svg'),
  },
  'xd-prec-lowacc': {
    file: 'xd-prec-lowacc.png',
    width: 1200,
    height: 1200,
    alt: 'A red and white target with four black hits tightly clustered away from the bullseye.',
    caption: 'Precise but inaccurate: a tight cluster shifted off target, like a systematic bias.',
    credit: 'DarkEvil',
    source: commons('High_precision_Low_accuracy.svg'),
  },
} satisfies Record<string, Photo>;
