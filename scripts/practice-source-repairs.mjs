// Targeted corrections preserve the subject of the original item. Any added data
// or changed wording is explicitly part of the authored repair, not source evidence.
const written = (prompt, answer, points = 2, context = '') => ({
  kind: 'written',
  prompt,
  answer,
  points,
  context,
});
const numeric = (prompt, value, units, points = 2, context = '') => ({
  ...written(prompt, `${value} ${units}`, points, context),
  numeric: { value, tolerance: Math.max(0.001, Math.abs(value) * 0.002), units: ['', units] },
});

export function sourceRepair(test, q) {
  const id = `${test.id}/${q.id}`;
  const repairs = {
    'scioly-tj8pj0wzt-s-b/2': written(
      'Classify acetic acid as an amino acid, a protein, or an acid.',
      'An acid; acetic acid is a carboxylic acid, not an amino acid or protein.',
      1,
    ),
    'scioly-tj8pj0wzt-s-b/6': written(
      'Is an aqueous solution of sodium bicarbonate mildly acidic or mildly basic?',
      'Mildly basic. The original paper prints Base as A, whereas its key incorrectly labels it B.',
      1,
    ),
    'scioly-tj8pj0wzt-s-b/8': numeric(
      'A cylindrical bread sample has mass 7 g, radius 2.6 cm and thickness 0.6 cm. Use pi=3.14. Calculate its density to the nearest hundredth in g/cm^3.',
      0.55,
      'g/cm^3',
      1,
    ),
    'scioly-dz8-ypn7zj8-b/35': written(
      'For a simple solenoid with fixed current and fixed core geometry, does increasing the number of turns per unit length increase or decrease its magnetic field? Explain.',
      'It increases the field; in the ideal long-solenoid model B is proportional to turns per unit length times current. Holding current fixed removes the indirect effect of wire resistance.',
      1,
    ),
    'scioly-p6s6szpywts-b/24': written(
      'For a closed system performing only pressure-volume boundary work, which process has zero boundary work because its volume is constant?',
      'Isochoric. Boundary work is the integral of pressure with respect to volume; dV=0. This does not rule out other forms of work.',
      1,
    ),
    'scioly-p6s6szpywts-b/30': written(
      'State the Kelvin-Planck form of the second law in your own words, without attributing it to the wrong scientist.',
      'A cyclic heat engine cannot have as its sole effect extracting heat from a single reservoir and converting it entirely to work; some other effect, such as heat rejection, is required.',
      1,
    ),
    'scioly-p6s6szpywts-b/32': numeric(
      'Calculate the energy required to heat 16.50 kg of silver from 20 C to its melting point and melt it completely. Added assumption: melting point is 962 C. Use c=230 J/(kg K), latent heat of fusion 88,000 J/kg, and no heat loss.',
      16.5 * (230 * (962 - 20) + 88000),
      'J',
      3,
    ),
    'scioly-fmnnyytasp0-c/9': written(
      'The repair supplies three specimens: quartz (piezoelectric), galena (not piezoelectric), and stibnite (not piezoelectric). Which specimen can generate electric polarization under suitable mechanical stress?',
      'Quartz. The relevant property is piezoelectricity; do not use the inconsistent B/C pair in the source key.',
      2,
    ),
    'scioly-fmnnyytasp0-c/34': written(
      'A clean elemental sulfur specimen is odorless at room temperature. Explain why a rotten-egg odor would not, by itself, identify that specimen as sulfur.',
      'Rotten-egg odor is associated with hydrogen sulfide, a different substance. Do not equate a compound containing sulfur with pure elemental sulfur or use smell/taste as a definitive sample identification.',
      2,
    ),
    'scioly-fmnnyytasp0-c/63': written(
      'A volcanic neck consists of magma solidified inside a volcanic conduit and exposed later by erosion. Is the solidified conduit an intrusive or extrusive body?',
      'Intrusive (hypabyssal/shallow intrusive); it solidified inside the conduit rather than as a surface lava flow.',
      2,
    ),
    'scioly-t-bhel1zl1m-c/chemistry-7': written(
      'Repair data: a sodium carbonate solution has pH 11.2; a calcium nitrate solution has pH 6.8. Which of these two solutions is basic, and what threshold did you use?',
      'Sodium carbonate; pH 11.2 is above 7 under the stated ordinary aqueous comparison. The supplied nitrate solution is below 7. Only these two measured solutions are being compared.',
      1,
    ),
    'scioly-t-bhel1zl1m-c/mass-1': numeric(
      'The mass spectrum has its tallest peak at m/z 31 and a smaller molecular-ion peak at m/z 46. What is the m/z of the base peak?',
      31,
      '',
      1,
    ),
    'scioly-t-bhel1zl1m-c/mass-2': numeric(
      'For a singly charged molecular ion with m/z 46 and a fragment base peak at m/z 31, what is the nominal molecular mass?',
      46,
      'Da',
      1,
    ),
    'scioly-wpknin0qxmq-b/4': written(
      'A supplied diagnostic report identifies Colletotrichum, a fungal genus, as the cause of a plant infection named anthracnose. Is this diagnosed infection fungal or bacterial? Explain using the report.',
      'Fungal: the supplied report identifies its causative organism as a fungus. This replaces the source question with more than one potentially fungal disease name.',
      1,
    ),
    'scioly-wpknin0qxmq-b/9': written(
      'Supplied crop survey: soybeans 40 hectares, corn 30, cotton 20. Which of these genetically modified crop plantings occupies the largest area in this survey?',
      'Soybeans, at 40 hectares. This is a supplied survey, not a claim about worldwide rankings.',
      1,
    ),
    'scioly-wpknin0qxmq-b/14': written(
      'A plant germinates, flowers, sets seed and dies within one growing season. Classify its life cycle as annual, biennial or perennial.',
      'Annual. The complete life cycle occurs in one growing season; no ambiguous climate-zone assumption is needed.',
      1,
    ),
    'scioly-wpknin0qxmq-b/21': written(
      'Compare supplied ages of individual trees: A=600 years, B=1,200 years, C=4,000 years. Which individual is oldest? Explain why this comparison does not establish the age of a clonal colony.',
      'Individual C, at 4,000 years. A single stem/tree age differs from the persistence of an entire clone; the given ages do not measure a colony.',
      1,
    ),
    'scioly-wpknin0qxmq-b/57': written(
      'The repair defines its reservoirs as sedimentary rocks, the atmosphere, living forest biomass and ice. Supplied carbon stores are 80, 10, 8 and 2 arbitrary units respectively. Which reservoir stores the most carbon in this model?',
      'Sedimentary rocks, at 80 units. This explicitly defined model avoids the source’s ambiguous use of biosphere.',
      1,
    ),
    'scioly-wpknin0qxmq-b/60': written(
      'An animal can digest starch but cannot hydrolyze the beta-1,4 glycosidic links in cellulose because it lacks cellulase. Explain why “it cannot break any glycosidic bonds” is too broad.',
      'It can hydrolyze other glycosidic linkages, including those in starch. The limitation is its lack of the appropriate cellulose-hydrolyzing enzyme, not an inability to break all glycosidic bonds.',
      1,
    ),
    'scioly-wpknin0qxmq-b/66': written(
      'A crop receives an inserted gene using a laboratory transformation method. Another crop is selected only through conventional crossing. Which is genetically engineered by the stated method?',
      'The crop receiving the inserted gene through laboratory transformation. This avoids the unverified earliest-commercial-crop assertion in the source.',
      1,
    ),
    'scioly-9gdab8vmnhi-b/s2-10': written(
      'Supplied field notes place celestite with gypsum in evaporite beds. Describe an environment consistent with those observations.',
      'An evaporative basin where dissolved sulfate minerals precipitate as water becomes concentrated; an arid restricted marine basin is one suitable example. Use the supplied field notes, not the unrelated fireworks answer.',
      2,
    ),
    'scioly-9gdab8vmnhi-b/s2-11': written(
      'Supplied crystallographic data: chalcopyrite is tetragonal and celestite is orthorhombic. Do these two specimens belong to the same crystal system?',
      'No. Tetragonal and orthorhombic are different crystal systems.',
      1,
    ),
    'scioly-9gdab8vmnhi-b/s6-3': written(
      'Repair data: green amazonite is a variety of microcline; microcline is triclinic and orthoclase is monoclinic; both feldspars have composition KAlSi3O8. Explain which pair illustrates polymorphism.',
      'Microcline and orthoclase have the same composition and different crystal structures, so they illustrate polymorphism. Amazonite is a variety of microcline, not a separate polymorph contrasted with microcline.',
      2,
    ),
    'scioly-9gdab8vmnhi-b/s6-5': written(
      'Can a green feldspar’s color or ultraviolet appearance alone establish that it contains lead? Describe a stronger test.',
      'No. Color/fluorescence is not a uniquely diagnostic elemental measurement. Use a suitable calibrated chemical/elemental analysis and standards rather than inferring lead solely from an appearance.',
      2,
    ),
    'scioly-9gdab8vmnhi-b/s15-1': written(
      'Label these supplied descriptions: A is a sheet parallel to bedding; B cuts across bedding; C is a concordant dome-shaped intrusion; D is an intrusive body with exposed area greater than 100 square kilometres.',
      'A: sill. B: dike/dyke. C: laccolith. D: batholith. Award one point for each correct label.',
      4,
    ),
    'scioly-9gdab8vmnhi-b/s16-1': written(
      'Name and explain these four relative-dating principles: superposition, original horizontality, lateral continuity and cross-cutting relationships.',
      'Superposition: younger beds overlie older beds in an undeformed sequence. Original horizontality: sediments are initially deposited approximately horizontally. Lateral continuity: beds originally extend laterally until thinning or reaching a boundary. Cross-cutting: the cutting feature is younger than what it cuts. Award credit for the meaning of each specified principle.',
      2,
    ),
    'scioly-9gdab8vmnhi-b/s17-1': written(
      'Replace the missing facies diagram using this supplied schematic: A has moderate pressure and lower temperature; B has similar pressure and higher temperature; C has high pressure and low temperature. The supplied candidate facies are greenschist, amphibolite and blueschist. Match each once.',
      'A: greenschist. B: amphibolite. C: blueschist. These are qualitative positions in a supplied schematic, not exact pressure-temperature boundaries.',
      3,
    ),
    'scioly-9gdab8vmnhi-b/s17-2': written(
      'Explain why hornfels, greenschist, blueschist, amphibolite and granulite cannot all be put into one universal lowest-to-highest temperature grade sequence without pressure information.',
      'Facies depend on pressure as well as temperature. Blueschist is characteristically high-pressure/low-temperature, while hornfels is associated with low-pressure contact metamorphism. At comparable moderate pressure, greenschist-amphibolite-granulite can express increasing temperature, but it is not a universal ordering of all listed facies.',
      3,
    ),
  };
  const additional = {
    'scioly-9idzuozwmxm-c/4': numeric(
      'A diagnostic test gives 3 true positives and 7 false negatives among 10 infected patients. Calculate the false-negative rate as a percentage of infected patients.',
      70,
      '%',
      2,
    ),
    'scioly-golgkcarvyw-c/1-1': numeric(
      'Added assumption: a mother has genotype IA i and a father IA IB. What is the probability that both of two independently inherited children have blood type B? Give a fraction or decimal.',
      1 / 16,
      '',
      2,
    ),
    'scioly-najkggc-oem-c/MC-5': written(
      'A layer has a rapid change in seawater density with depth. Name this layer and distinguish it from a thermocline.',
      'A pycnocline is a rapid density-gradient layer; a thermocline is a rapid temperature-gradient layer. The source incorrectly substituted pressure for density.',
      2,
    ),
    'scioly-8hoey-b0s6o-c/1-13': written(
      'What is the SI unit of heat energy needed to melt a sample? Distinguish it from the unit of specific latent heat of fusion.',
      'Heat energy is in joules (J). Specific latent heat of fusion is energy per mass, J/kg. The original choices named concepts rather than units.',
      1,
    ),
  };
  return repairs[id] ?? additional[id];
}
