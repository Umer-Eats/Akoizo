import type { LessonReferenceFigure } from './lessons';

// Additional distinct placements researched through Firecrawl; source figures remain unmodified.
export const furtherLessonFigures: (LessonReferenceFigure & {
  lessonId: string;
  section: number;
})[] = [
  {
    lessonId: 'bot-u7-l1',
    section: 1,
    title: 'Light reactions across the thylakoid membrane',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/07c9f7befda5e7acfc4528c18dc0329dcdb2ebd4',
    source:
      'https://openstax.org/books/biology-2e/pages/8-2-the-light-dependent-reactions-of-photosynthesis',
    alt: 'Thylakoid-membrane diagram connects water splitting, photosystems, electron transport, proton accumulation, ATP synthesis, and NADPH formation.',
    prompt:
      'Follow electrons and protons on separate routes. Explain why oxygen production comes from water splitting and why the proton gradient is needed to generate ATP.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'bot-u7-l1',
    section: 4,
    title: 'Pigments absorb different parts of the spectrum',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/d38666605e2a32df8cc2468ed321bc1392ca21d4',
    source:
      'https://openstax.org/books/biology-2e/pages/8-2-the-light-dependent-reactions-of-photosynthesis',
    alt: 'Molecular structures and absorption spectra compare chlorophyll a, chlorophyll b, and beta-carotene across visible wavelengths.',
    prompt:
      'Compare absorption in blue, green, and red light. Explain why leaf color alone does not describe all the pigments present and why absorption is not the same measurement as net photosynthetic rate.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'bot-u5-l1',
    section: 1,
    title: 'Flower organs and their reproductive roles',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/a0b434245f5ba2730a2be4da1a744e8144dc0a6c',
    source:
      'https://openstax.org/books/biology-2e/pages/32-1-reproductive-development-and-structure',
    alt: 'Labeled flower diagram identifies sepals, petals, stamens, anthers, stigma, style, ovary, and ovules.',
    prompt:
      'Trace the route from pollen landing on a stigma toward an ovule. Distinguish pollination from fertilization and identify which structures can later contribute to a seed and a fruit.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'bot-u6-l1',
    section: 3,
    title: 'A conifer life cycle',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/6f354b8626d566330a70db7dc04df63c56f90e18',
    source:
      'https://openstax.org/books/biology-2e/pages/32-1-reproductive-development-and-structure',
    alt: 'Conifer life-cycle diagram connects the mature sporophyte, male and female cones, pollen, ovules, fertilization, and seed development.',
    prompt:
      'Mark where meiosis and fertilization change ploidy. Compare the position of a conifer ovule with an angiosperm ovule and explain why a cone is not a flower.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'astro-u2-l1',
    section: 2,
    title: 'Temperature changes both peak wavelength and intensity',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/6a47d55943035469cc43227c4c0c3bdf9c115fc0',
    source: 'https://openstax.org/books/astronomy-2e/pages/5-2-the-electromagnetic-spectrum',
    alt: 'Thermal-radiation curves compare intensity versus wavelength for objects at different temperatures, marking each peak.',
    prompt:
      'Read the units before comparing peak wavelengths. Explain why a hotter surface shifts its peak toward shorter wavelengths and emits more energy per unit surface area.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'astro-u4-l1',
    section: 2,
    title: 'Core exhaustion and shell burning',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/cc033be9b13b59a74e88a10051bf30679ef8b22d',
    source:
      'https://openstax.org/books/astronomy-2e/pages/22-1-evolution-from-the-main-sequence-to-red-giants',
    alt: 'Stellar cross sections compare a main-sequence hydrogen-burning core with a helium core surrounded by a hydrogen-burning shell.',
    prompt:
      'Identify the region in which hydrogen fusion occurs in each star. Explain why exhausting core hydrogen does not mean all fusion in the star immediately stops.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'astro-u7-l1',
    section: 2,
    title: 'Stellar evolutionary tracks carry a time dimension',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/bebe14b402e4273bae8374843b3b95c9789baa6a',
    source:
      'https://openstax.org/books/astronomy-2e/pages/22-1-evolution-from-the-main-sequence-to-red-giants',
    alt: 'Hertzsprung–Russell diagram shows evolutionary tracks and time labels for stars with different initial masses.',
    prompt:
      'Follow one track away from the main sequence and compare its time labels with another mass. Explain why a track represents one star evolving while a cluster isochrone represents a shared age.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'remote-u2-l1',
    section: 4,
    title: 'The atmosphere filters the observing signal',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/fd686395fdb767eb21ed9f677d202e5b639293db',
    source: 'https://openstax.org/books/astronomy-2e/pages/5-2-the-electromagnetic-spectrum',
    alt: 'Atmospheric cross section compares transmission of gamma rays, X-rays, ultraviolet, visible, infrared, microwave, and radio wavelengths.',
    prompt:
      'Identify the visible and radio windows and the partially absorbed bands. Explain why choosing a sensor requires considering its observing altitude and the path radiation takes through the atmosphere.',
    author: 'OpenStax; modified from STScI / JHU / NASA',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'remote-u8-l1',
    section: 0,
    title: 'Absorption, reflection, and emission',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/e0462a33a45672405646795c6cc0515d9eef042a',
    source:
      'https://openstax.org/books/university-physics-volume-2/pages/1-6-mechanisms-of-heat-transfer',
    alt: 'Four surface diagrams contrast absorption and emission for dark and reflective surfaces.',
    prompt:
      'Separate incoming reflected energy from emitted thermal energy. Explain why the fraction reflected in a particular band and the thermal emission at a given temperature are different quantities.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'therm-u2-l1',
    section: 0,
    title: 'Geometry controls conductive heat flow',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/7e5d75994858195546669af6058be4a564645dfb',
    source:
      'https://openstax.org/books/university-physics-volume-2/pages/1-6-mechanisms-of-heat-transfer',
    alt: 'A material bar connects hot and cold reservoirs and labels its cross-sectional area and thermal conductivity.',
    prompt:
      'Predict the effect of doubling the bar length, doubling its area, and changing its conductivity separately. Explain why the temperature difference drives heat transfer.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'therm-u2-l1',
    section: 1,
    title: 'Convection transports energy with moving fluid',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/fe224950e7a44b9798508a03a46e546f12f8314b',
    source:
      'https://openstax.org/books/university-physics-volume-2/pages/1-6-mechanisms-of-heat-transfer',
    alt: 'Circulation arrows show warmer water rising and cooler water sinking in a heated container.',
    prompt:
      'Follow one fluid parcel around the circulation loop. Distinguish bulk transport of fluid from conduction between neighboring particles and identify the role of density differences.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'therm-u6-l1',
    section: 5,
    title: 'Different paths connect the same two states',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/297010e5ba0ae009e1f0b215c769d2c23ff0b55a',
    source:
      'https://openstax.org/books/university-physics-volume-2/pages/3-3-first-law-of-thermodynamics',
    alt: 'Pressure-volume graph shows several distinct paths connecting the same initial and final thermodynamic states.',
    prompt:
      'Compare the areas under two paths. Explain why work can differ while the change in internal energy remains the same, and use the first law to infer how the heat transfer must differ.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'therm-u3-l1',
    section: 1,
    title: 'Reading phase boundaries',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/1c66c36d9701ebf3106287ea61723d470c6cce5e',
    source: 'https://openstax.org/books/chemistry-2e/pages/10-4-phase-diagrams',
    alt: 'Pressure-temperature phase diagram separates solid, liquid, and gas regions and marks phase changes, the triple point, and the critical point.',
    prompt:
      'Trace a constant-pressure heating path and name each boundary crossed. Explain why a pressure below the triple-point pressure can prevent a stable liquid phase from appearing.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'therm-u3-l1',
    section: 4,
    title: 'Water has an unusual melting boundary',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/7b1a1b1600c9514b29554da94cfdc3ad1ded603f',
    source: 'https://openstax.org/books/chemistry-2e/pages/10-4-phase-diagrams',
    alt: 'Water phase diagram marks the triple point, critical point, normal boiling point, and negatively sloped solid-liquid boundary.',
    prompt:
      'Compare the melting boundary with the generic phase diagram. Explain what its slope implies about the relative densities of ice and liquid water and distinguish normal boiling from the critical point.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'anat-u5-l2',
    section: 0,
    title: 'The small intestine as a continuous route',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/abf6ec32722c242d09afa2da6f08a61d71ac585b',
    source:
      'https://openstax.org/books/anatomy-and-physiology-2e/pages/23-5-the-small-and-large-intestines',
    alt: 'Labeled small-intestine anatomy identifies the duodenum, jejunum, ileum, and their connections to neighboring digestive structures.',
    prompt:
      'Trace chyme from the stomach to the large intestine. Identify the order of the three small-intestinal regions and explain why a continuous pathway can contain regions with different specialized roles.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'anat-u6-l2',
    section: 0,
    title: 'Segmentation mixes material for digestion',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/5d96eb41fcdfc0f7134331cec1795295aa0cb659',
    source:
      'https://openstax.org/books/anatomy-and-physiology-2e/pages/23-5-the-small-and-large-intestines',
    alt: 'Sequential intestinal diagrams show chyme being divided and remixed by segmentation contractions.',
    prompt:
      'Distinguish mixing from one-way propulsion. Explain why repeated contact with the intestinal surface helps digestion but cannot replace the missing enzyme in lactose maldigestion.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'for-u7-l2',
    section: 0,
    title: 'ABO identity depends on surface antigens',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/387433ee24cad9d0a576c5bd5944c5a726901211',
    source: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/18-6-blood-typing',
    alt: 'Red-blood-cell illustrations compare ABO antigen patterns on the cell surface.',
    prompt:
      'Predict which reagent would agglutinate cells carrying an A antigen. Explain why a shared ABO type can be consistent with a source yet cannot uniquely identify a person.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'water-u4-l1',
    section: 1,
    title: 'Biomass, numbers, and energy are different pyramids',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/95af711419a8c5ec02c1e4bc5aeb618a29cb5d15',
    source: 'https://openstax.org/books/biology-2e/pages/46-2-energy-flow-through-ecosystems',
    alt: 'Ecological pyramids compare organism counts, standing biomass, and energy flow in terrestrial and aquatic ecosystems.',
    prompt:
      'Check the units of every pyramid before comparing shapes. Explain how rapid phytoplankton turnover can support an inverted biomass pyramid while an energy-flow pyramid remains upright.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'water-u4-l1',
    section: 0,
    title: 'Food webs can concentrate persistent pollutants',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/31910a73e589ad405a1485fc0930926d06ab3a3d',
    source: 'https://openstax.org/books/biology-2e/pages/46-2-energy-flow-through-ecosystems',
    alt: "Graph relates PCB concentration to nitrogen-isotope enrichment as a marker of increasing trophic level in Lake Huron's Saginaw Bay.",
    prompt:
      'Identify the trend across trophic levels and distinguish biomagnification from accumulation within one organism over time. State why the PCB example does not prove that every contaminant behaves the same way.',
    author: 'Patricia Van Hoof / NOAA GLERL; OpenStax',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'chem-u1-l1',
    section: 1,
    title: 'Atomic radius follows a repeating pattern',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/2813bbfc14b4f41b54d4b66e57281d2ccf2350e3',
    source:
      'https://openstax.org/books/chemistry-2e/pages/6-5-periodic-variations-in-element-properties',
    alt: 'Periodic-table diagram compares relative atomic radii and illustrates covalent-radius measurement in diatomic molecules.',
    prompt:
      'Compare sizes down one group and across one period. Connect the patterns to occupied shells and effective nuclear attraction rather than assuming atomic number alone predicts size.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'chem-u1-l1',
    section: 0,
    title: 'Ions and their parent atoms have different sizes',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/8de04f0707fca242da5b757cef08ff37a899b9a7',
    source:
      'https://openstax.org/books/chemistry-2e/pages/6-5-periodic-variations-in-element-properties',
    alt: 'Relative-size diagrams compare neutral aluminum and sulfur atoms with their common cation and anion.',
    prompt:
      'Explain why removing electrons can shrink an ion and adding electrons can enlarge one. Keep electron count separate from proton count when comparing the atom with its ion.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'chem-u9-l1',
    section: 1,
    title: 'Induced fit links binding to catalysis',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/065386871b944db2faf13ef55cbfebddbfba6394',
    source: 'https://openstax.org/books/biology-2e/pages/6-5-enzymes',
    alt: 'Enzyme sequence shows substrate binding, conformational adjustment, conversion, and product release.',
    prompt:
      'Identify what changes shape and what is released. Explain why an enzyme can be reused and why favorable binding alone does not fully explain lowering an activation barrier.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'chem-u9-l1',
    section: 2,
    title: 'Inhibition changes a saturation curve',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/0a3d6056ab2a8ce8ba0dc862d4c4180af2eec2de',
    source: 'https://openstax.org/books/biology-2e/pages/6-5-enzymes',
    alt: 'Rate-versus-substrate curves compare uninhibited enzyme with competitive and idealized noncompetitive inhibition.',
    prompt:
      'Compare the high-substrate limits and the substrate needed to reach a given rate. Explain which inhibitor effect can be overcome by substrate in this simplified model and why real mixed inhibition needs a more general model.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'gene-u1-l1',
    section: 1,
    title: 'Segregation predicts genotype and phenotype ratios',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/83af4d98c6e7004c52f95071a357b686d11dc819',
    source: 'https://openstax.org/books/biology-2e/pages/12-2-characteristics-and-traits',
    alt: 'Pea-plant cross follows parental genotypes, heterozygous offspring, and a second-generation Punnett square.',
    prompt:
      'Count YY, Yy, and yy outcomes before grouping by phenotype. Explain why the 1:2:1 genotype ratio and 3:1 phenotype ratio answer different questions under complete dominance.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'gene-u1-l1',
    section: 2,
    title: 'A test cross probes an unknown genotype',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/8c6988fdec94ad931915871926f0417bb002aaad',
    source: 'https://openstax.org/books/biology-2e/pages/12-2-characteristics-and-traits',
    alt: 'Test-cross diagrams compare offspring from a homozygous-dominant or heterozygous parent crossed with a recessive parent.',
    prompt:
      "Explain why the recessive parent makes the unknown parent's alleles easier to infer. If only three dominant offspring appear, calculate why that small sample does not rule out heterozygosity.",
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'gene-u2-l1',
    section: 1,
    title: 'A pedigree constrains possible genotypes',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/864f91b77d41d9fa7579d568c3b4f0892f09b451',
    source: 'https://openstax.org/books/biology-2e/pages/12-2-characteristics-and-traits',
    alt: 'Family pedigree uses shaded symbols and genotype annotations to illustrate inheritance of a recessive trait.',
    prompt:
      'Find an unaffected individual whose offspring prove that they carry the recessive allele. Explain why an unaffected phenotype sometimes permits two possible genotypes.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'gene-u2-l1',
    section: 2,
    title: 'X-linked inheritance depends on the transmitted chromosome',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/1b57a6b5c5b03271c632b71839852ab4d902ab5a',
    source: 'https://openstax.org/books/biology-2e/pages/12-2-characteristics-and-traits',
    alt: 'Inheritance diagram compares possible offspring of an unaffected father and a mother carrying an X-linked recessive allele.',
    prompt:
      'Follow the paternal chromosome and maternal chromosome separately. Distinguish the probability conditional on a son from the probability among all offspring in the simplified equal-sex-ratio model.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'gene-u8-l1',
    section: 1,
    title: 'Clades include an ancestor and all descendants',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/43b5ab0d77dcb3ba74e88041d65604fea5e16ea7',
    source:
      'https://openstax.org/books/biology-2e/pages/20-2-determining-evolutionary-relationships',
    alt: 'Branching vertebrate tree shows the amniote clade nested within the larger vertebrate clade.',
    prompt:
      'Circle the most recent common ancestor of the amniotes and every descendant branch. Explain why nearby tip positions do not establish relatedness without tracing the branching nodes.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'exp-u3-l1',
    section: 4,
    title: 'Reading a meniscus reproducibly',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/d95acf4892568c9217a07771de38bc56740a9b68',
    source:
      'https://openstax.org/books/chemistry-2e/pages/1-5-measurement-uncertainty-accuracy-and-precision',
    alt: 'Graduated-cylinder illustration enlarges a curved water meniscus and its position between marked volume divisions.',
    prompt:
      'Describe an operational reading rule for eye position and the bottom of the meniscus. Decide which digit is estimated and explain why recording excessive decimal places does not improve the measurement.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'exp-u6-l1',
    section: 0,
    title: 'Precision and accuracy can come apart',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/d63f798546a840f22ea24ae27f919ec38dcae272',
    source:
      'https://openstax.org/books/chemistry-2e/pages/1-5-measurement-uncertainty-accuracy-and-precision',
    alt: 'Three target diagrams compare tightly centered observations, a tight off-center cluster, and scattered off-center observations.',
    prompt:
      'Match tight clustering to precision and proximity to the reference to accuracy. Propose one possible fixed bias and explain why repeated measurements alone need not remove it.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'exp-u7-l1',
    section: 3,
    title: 'Rounding follows the measurement operation',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/ba4ddc246675f0dbd8a08f36b1129be6af7dce33',
    source:
      'https://openstax.org/books/chemistry-2e/pages/1-5-measurement-uncertainty-accuracy-and-precision',
    alt: 'Worked addition and subtraction diagrams identify the decimal-place limit imposed by the least precise measurement.',
    prompt:
      'Explain why addition and subtraction use a decimal-place rule rather than simply copying the smallest count of significant figures. Keep guard digits until the final reported result.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'circ-u2-l1',
    section: 2,
    title: 'The slope depends on the plotted axes',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/ade9ee53ce09709fb3e6fb756b8f2eebb0cefe68',
    source: 'https://openstax.org/books/university-physics-volume-2/pages/9-4-ohms-law',
    alt: 'Linear current-versus-voltage graph illustrates ohmic behavior through the origin.',
    prompt:
      'Read which quantity is on each axis before using the slope. Explain why an I-versus-V slope gives conductance, while the slope of V versus I gives resistance.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    lessonId: 'circ-u4-l1',
    section: 1,
    title: 'A diode is not an ohmic resistor',
    src: 'https://openstax.org/apps/archive/20260604.144757/resources/3916faff6ec634a9f3a6d6cdd6cb05abdc2d9a5a',
    source: 'https://openstax.org/books/university-physics-volume-2/pages/9-4-ohms-law',
    alt: 'Diode current-voltage graph contrasts small reverse current, forward conduction, and reverse breakdown.',
    prompt:
      'Identify forward and reverse bias on the axes. Explain why 0.7 V is an approximate silicon-diode model value rather than a universal threshold for all diodes, especially LEDs.',
    author: 'OpenStax / Rice University',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
];
