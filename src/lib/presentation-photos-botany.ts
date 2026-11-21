import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Botany presentations, served from public/presentations.
export const photos = {
  'bot-bee': {
    file: 'bot-bee.jpg',
    width: 1200,
    height: 900,
    alt: 'A bee covered in yellow pollen working among the stamens of a pink rose.',
    caption: 'A bee carries pollen between flowers, one of many interactions plants depend on.',
    credit: 'Debivort',
    source: commons('Bee_pollinating_a_rose.jpg'),
  },
  'bot-calvin': {
    file: 'bot-calvin.png',
    width: 1200,
    height: 1100,
    alt: 'The Calvin cycle drawn with molecular models: RuBisCO fixes CO₂ to RuBP, ATP and NADPH reduce 3-phosphoglycerate to G3P, and RuBP is regenerated.',
    caption:
      'The Calvin cycle: fixation by RuBisCO, reduction with ATP and NADPH, and regeneration of RuBP.',
    credit: 'Mike Jones',
    source: commons('Calvin-cycle4.svg'),
  },
  'bot-double-fert': {
    file: 'bot-double-fert.png',
    width: 1200,
    height: 1194,
    alt: 'Maize double fertilization: a pollen tube enters the embryo sac, two sperm nuclei meet the egg and polar nuclei, and the seed forms a 3n endosperm and an embryo.',
    caption:
      'Double fertilization in maize: one sperm fertilizes the egg (embryo), the other joins the polar nuclei (3n endosperm).',
    credit: 'Triploid, after Nature Reviews Genetics',
    source: commons('Double_Fertilization.jpg'),
  },
  'bot-fern-sori': {
    file: 'bot-fern-sori.jpg',
    width: 1200,
    height: 798,
    alt: 'The underside of a polypody fern frond with two rows of round brown dots, the sori, on each leaflet.',
    caption:
      'Sori on a polypody fern: clusters of sporangia on the underside of the sporophyte’s frond.',
    credit: 'Dietzel',
    source: commons('Polypodium_vulgare_sori.jpg'),
  },
  'bot-flower': {
    file: 'bot-flower.png',
    width: 1200,
    height: 694,
    alt: 'A labeled flower with the pistil (stigma, style, ovary, ovules), stamens (anther, filament), petals, sepals, nectary and pedicel.',
    caption:
      'Parts of a flower: stamens make pollen in anthers; the pistil holds ovules inside the ovary.',
    credit: 'Mariana Ruiz (LadyofHats)',
    source: commons('Mature_flower_diagram.svg'),
  },
  'bot-germination': {
    file: 'bot-germination.png',
    width: 1200,
    height: 646,
    alt: 'A row of pea seedlings at successive stages, from a swelling seed to a radicle, then shoot, leaves and roots, labeled A to H.',
    caption: 'Germination: the radicle emerges first, then the shoot and first leaves.',
    credit: 'Aslyntodd',
    source: commons('Stages_of_germination_in_pea_plants.svg'),
  },
  'bot-herbarium': {
    file: 'bot-herbarium.jpg',
    width: 1200,
    height: 1689,
    alt: 'A pressed lily specimen mounted on a herbarium sheet with a handwritten label, a collection stamp and a color calibration card.',
    caption:
      'A herbarium sheet preserves the plant’s form plus when, where and by whom it was collected.',
    credit: 'Musée national d’histoire naturelle Luxembourg',
    source: commons('Joseph_Witry_herbarium_sheet_Lilium_speciosum.jpg'),
  },
  'bot-hydroponics': {
    file: 'bot-hydroponics.jpg',
    width: 1200,
    height: 798,
    alt: 'Researchers tending trays of lettuce and onions growing in nutrient solution under bright lights in a NASA growth chamber.',
    caption: 'Hydroponics at NASA: roots sit in aerated nutrient solution instead of soil.',
    credit: 'NASA',
    source: commons('Hydroponic_onions,_NASA_--_17_June_2004.jpg'),
  },
  'bot-leaf-spot': {
    file: 'bot-leaf-spot.jpg',
    width: 1200,
    height: 865,
    alt: 'A corn leaf covered in long, rectangular tan lesions running parallel to the veins.',
    caption:
      'Gray leaf spot on corn: the lesions are symptoms; the fungus Cercospora zeae-maydis is the cause.',
    credit: 'Daren Mueller, Iowa State University, Bugwood.org',
    source: commons('Gray_leaf_spot_Cercospora_zeae-maydis_5465607.png'),
  },
  'bot-leaf-tissue': {
    file: 'bot-leaf-tissue.png',
    width: 1200,
    height: 801,
    alt: 'A 3D block of a leaf showing the cuticle, upper epidermis, palisade and spongy mesophyll, lower epidermis and a stoma between guard cells.',
    caption:
      'Leaf anatomy: cuticle and epidermis outside, palisade and spongy mesophyll inside, and a stoma on the lower surface.',
    credit: 'Zephyris',
    source: commons('Leaf_Tissue_Structure.svg'),
  },
  'bot-monocot-dicot': {
    file: 'bot-monocot-dicot.png',
    width: 1200,
    height: 900,
    alt: 'A two-column table comparing monocots and dicots with photos: one versus two cotyledons, parallel versus netted veins, scattered versus ringed bundles, floral parts in threes versus fours or fives.',
    caption:
      'Monocots versus eudicots: cotyledons, venation, stem vascular bundles and floral part numbers.',
    credit: 'Flowerpower207',
    source: commons('Monocot_vs_Dicot.svg'),
  },
  'bot-moss-cycle': {
    file: 'bot-moss-cycle.png',
    width: 1200,
    height: 1221,
    alt: 'A moss life cycle: a capsule releases spores, spores grow into leafy male and female gametophytes, sperm reach the egg, and a sporophyte grows from the gametophyte.',
    caption:
      'The moss life cycle: the leafy plant is the gametophyte; the stalked capsule is the sporophyte growing on it.',
    credit: 'Tomáš Kebert and umimeto.org',
    source: commons('Moss_life_cycle.svg'),
  },
  'bot-nitrogen-cycle': {
    file: 'bot-nitrogen-cycle.png',
    width: 1200,
    height: 900,
    alt: 'The nitrogen cycle: fixation by bacteria in soil and legume root nodules, ammonification by decomposers, nitrification to nitrites and nitrates, assimilation by plants and denitrification back to N₂.',
    caption:
      'The nitrogen cycle: microbes fix, convert and release nitrogen; plants assimilate it as ammonium or nitrate.',
    credit: 'Johann Dréo and translators',
    source: commons('Nitrogen_Cycle.svg'),
  },
  'bot-nodules': {
    file: 'bot-nodules.jpg',
    width: 1200,
    height: 987,
    alt: 'A stained cross section of a legume root nodule: a large central zone packed with bacteria-filled cells inside a ring of vascular tissue.',
    caption: 'A legume root nodule in section: the central cells house nitrogen-fixing rhizobia.',
    credit: 'Jon Houseman and Matthew Ford',
    source: commons('Root_tubercle_legume.jpg'),
  },
  'bot-phototropism': {
    file: 'bot-phototropism.png',
    width: 1200,
    height: 631,
    alt: 'Four panels of a shoot tip lit from the right; purple auxin dots gather on the shaded side as the tip bends toward the light.',
    caption:
      'Phototropism: auxin builds up on the shaded side, those cells elongate more, and the shoot curves toward light.',
    credit: 'MacKhayman',
    source: commons('Phototropism_Diagram.svg'),
  },
  'bot-pine-cone': {
    file: 'bot-pine-cone.png',
    width: 1200,
    height: 668,
    alt: 'A young female pine strobilus with ovules on seed scales, and the mature woody cone with seeds after pollination and fertilization.',
    caption:
      'A pine’s female cone: ovules sit exposed on scales and become seeds, with no ovary around them.',
    credit: 'Nefronus',
    source: commons('Pinus_sylvestris_female_strobilus_and_cone_en.svg'),
  },
  'bot-plant-cell': {
    file: 'bot-plant-cell.png',
    width: 1200,
    height: 879,
    alt: 'A cutaway plant cell labeling the cell wall, plasma membrane, large central vacuole, chloroplasts, nucleus, mitochondria, Golgi and endoplasmic reticulum.',
    caption:
      'A typical plant cell: a cellulose wall, a large central vacuole and chloroplasts alongside the usual eukaryotic organelles.',
    credit: 'Mariana Ruiz (LadyofHats)',
    source: commons('Plant_cell_structure-en.svg'),
  },
  'bot-pollen': {
    file: 'bot-pollen.jpg',
    width: 1200,
    height: 914,
    alt: 'A scanning electron micrograph of many pollen grains from different plants: spiky spheres, smooth ovals and grooved grains.',
    caption:
      'Pollen from several species: grain shapes are distinctive, which lets paleobotanists identify fossil pollen.',
    credit: 'Dartmouth College Electron Microscope Facility',
    source: commons('Misc_pollen.jpg'),
  },
  'bot-rhynie': {
    file: 'bot-rhynie.jpg',
    width: 1200,
    height: 971,
    alt: 'A broken slab of pale chert packed with dark circular cross sections of fossil Rhynia stems.',
    caption:
      'Rhynie chert: about 400-million-year-old early land plants preserved in silica, down to their cells.',
    credit: 'Peter Coxhead',
    source: commons('Rhynie_chert_with_Rhynia_1.png'),
  },
  'bot-sporic': {
    file: 'bot-sporic.png',
    width: 1200,
    height: 877,
    alt: 'A cycle diagram split into haploid (n) and diploid (2n) halves: meiosis makes spores, mitosis grows gametophytes, gametes fuse into a zygote that grows into a sporophyte.',
    caption:
      'Alternation of generations: meiosis makes spores, gametophytes make gametes by mitosis, and fertilization restores 2n.',
    credit: 'Menchi and Rehua',
    source: commons('Sporic_meiosis.svg'),
  },
  'bot-stomata': {
    file: 'bot-stomata.jpg',
    width: 1200,
    height: 1229,
    alt: 'A green-tinted scanning electron micrograph of a single stoma, an oval pore between two curved guard cells on a tomato leaf.',
    caption:
      'A stoma on a tomato leaf: two guard cells open and close the pore that admits CO₂ and loses water vapor.',
    credit: 'Dartmouth College Electron Microscope Facility',
    source: commons('Tomato_leaf_stomate_1-color.jpg'),
  },
  'bot-thylakoid': {
    file: 'bot-thylakoid.png',
    width: 1200,
    height: 685,
    alt: 'A thylakoid membrane with photosystem II, the cytochrome b6f complex, photosystem I, ferredoxin-NADP reductase and ATP synthase, and arrows for electrons and protons.',
    caption:
      'Light reactions in the thylakoid membrane: PSII splits water, electrons flow to PSI and NADPH, and the proton gradient drives ATP synthase.',
    credit: 'Somepics',
    source: commons('Thylakoid_membrane_3.svg'),
  },
  'bot-tilia-stem': {
    file: 'bot-tilia-stem.jpg',
    width: 1200,
    height: 677,
    alt: 'A stained micrograph of a one-year basswood stem section with radiating rows of xylem cells beside larger pith cells.',
    caption:
      'A one-year Tilia (basswood) stem: rows of thick-walled xylem cells radiate outward beside the pith.',
    credit: 'Berkshire Community College Bioscience Image Library',
    source: commons(
      'Woody_Dicot_Stem_Primary_Phloem_and_Xylem_in_One_Year_Tilia_(35120342926).jpg',
    ),
  },
  'bot-transpiration': {
    file: 'bot-transpiration.png',
    width: 1200,
    height: 1010,
    alt: 'A seedling with three insets: water entering root cells from soil, water molecules in a xylem vessel, and vapor leaving a leaf through a stoma.',
    caption:
      'Transpiration: water enters the roots (1), rises through xylem as a continuous column (2) and evaporates from the leaf through stomata (3).',
    credit: 'Laurel Jules',
    source: commons('Transpiration_Overview.svg'),
  },
  'bot-yew': {
    file: 'bot-yew.jpg',
    width: 1200,
    height: 1500,
    alt: 'A Pacific yew branch with flat dark needles and bright red berry-like arils.',
    caption: 'Pacific yew, the original source of the cancer drug paclitaxel (Taxol).',
    credit: 'Jason Hollinger',
    source: commons('Taxus_brevifolia_Blue_Mts_WA.jpg'),
  },
} satisfies Record<string, Photo>;
