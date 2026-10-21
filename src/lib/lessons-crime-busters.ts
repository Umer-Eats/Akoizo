import { buildCourse } from './lesson-course-builder.ts';
import { chapter as c, evidence } from './course-authoring.ts';

// Division B Crime Busters, organized from the 2027 rules (sections 3.c–3.g).
export const crimeBustersLessons = buildCourse({
  eventId: 'crime-busters',
  eventName: 'Crime Busters',
  prefix: 'cb',
  division: 'B',
  syllabus: '2027 Science Olympiad Division B Crime Busters rules',
  intro:
    'Seven units follow the 2027 Crime Busters evidence lists: the thirteen listed solids, six metals, and six liquids; hair, fibers, and recyclable plastics; paper chromatography; and fingerprints, DNA, prints, soil, and spatter. The last unit practices the written analysis, which must explain both who is implicated and why the other suspects are not. Always follow your supervisor’s safety directions; lab tests here are described, not performed.',
  references: [
    { title: 'Science Olympiad: Crime Busters B', url: 'https://www.soinc.org/crime-busters-b' },
    {
      title: 'National Institute of Justice: Forensic science',
      url: 'https://nij.ojp.gov/topics/forensics',
    },
    {
      title: 'OpenStax Chemistry 2e: Acids and bases',
      url: 'https://openstax.org/books/chemistry-2e/pages/14-introduction',
    },
  ],
  chapters: [
    {
      ...c(
        'Identifying white powders',
        [
          'Describe the appearance and solubility of the listed solids.',
          'Use water, HCl, and iodine tests to tell powders apart.',
          'Plan a testing sequence that conserves samples.',
        ],
        [
          [
            'The solids list',
            'Crime Busters unknowns come from a fixed list: anhydrous sodium acetate, yeast, vitamin C (ascorbic acid), calcium carbonate, table salt, crystal sugar, flour, gypsum (calcium sulfate dihydrate), cornstarch, baking soda, powdered gelatin, powdered Alka-Seltzer, and white sand. Starred solids can appear in mixtures. Because every team receives the same unknowns, careful observation and a consistent testing order are what separate top teams. Record results in a table as you go.',
          ],
          [
            'Look, feel, and smell first',
            'Begin with tests that use no sample. Under a hand lens, table salt forms clear cubes, sugar forms clear, irregular crystals, and sand forms hard, rounded or angular grains. Flour and cornstarch are very fine; cornstarch squeaks when pressed. Yeast is tan granules with a bread-like smell. Sodium acetate may have a faint vinegar smell. Waft odors toward your nose with your hand; never sniff a container directly.',
          ],
          [
            'Water solubility',
            'Add a small amount to water and stir. Salt, sugar, baking soda, sodium acetate, and vitamin C dissolve readily. Alka-Seltzer dissolves and fizzes by itself, because it contains both an acid and baking soda. Calcium carbonate, sand, gypsum, flour, and cornstarch do not dissolve well and leave the water cloudy or settle out. Gelatin absorbs water and swells, dissolving well only in warm water, where it can form a gel as it cools.',
          ],
          [
            'Hydrochloric acid test',
            'The supervisor provides 1 M HCl. Carbonates react with acid to release carbon dioxide bubbles: calcium carbonate and baking soda both fizz strongly. Sodium acetate reacts to form acetic acid, giving a clear vinegar smell, without fizzing. Salt, sugar, sand, gypsum, flour, and cornstarch show no visible reaction. Use only a few drops of acid on a tiny sample, and remember that baking soda also dissolves in water, while calcium carbonate does not.',
          ],
          [
            'Iodine test',
            'Iodine reagent turns blue-black with starch, so flour and cornstarch both give a dark color. Vitamin C is a reducing agent: it turns brown iodine colorless, a distinctive result. Most other solids leave the iodine its normal yellow-brown color. To tell flour from cornstarch, combine clues: cornstarch is pure white, extremely fine, and squeaks, while flour is off-white, slightly gritty, and contains protein.',
          ],
          [
            'Testing mixtures efficiently',
            'For a mixture, the scenario says how many materials it contains. Separate them when possible: dissolve the mixture in water and filter or decant, then test the dissolved part and the solid part separately. Look for multiple results in one sample, such as fizzing with HCl plus a blue-black iodine result, which suggests a carbonate mixed with a starch. Use spot plates and tiny samples so you have material left to confirm a conclusion.',
          ],
        ],
        [
          ['Solubility', 'How much of a substance dissolves in a solvent.'],
          ['Carbonate', 'A compound with CO₃²⁻ that releases CO₂ with acid.'],
          ['Starch', 'A plant carbohydrate that turns iodine blue-black.'],
          ['Reducing agent', 'A substance that donates electrons, such as vitamin C.'],
          ['Wafting', 'Moving vapors toward the nose with the hand to smell safely.'],
          ['Spot plate', 'A plate with small wells for testing tiny samples.'],
        ],
        [
          'An unknown white powder is insoluble in water, fizzes strongly with HCl, and leaves iodine yellow-brown. Identify it.',
          [
            'Fizzing with HCl indicates a carbonate: calcium carbonate or baking soda.',
            'Baking soda dissolves in water, but this powder is insoluble.',
            'The iodine result rules out starch.',
          ],
          'The powder is calcium carbonate (powdered limestone).',
        ],
        [
          [
            'Which solid turns brown iodine colorless?',
            'Vitamin C',
            ['Cornstarch', 'Table salt', 'Gypsum'],
            'Ascorbic acid reduces iodine to colorless iodide.',
          ],
          [
            'Which solid fizzes in plain water without added acid?',
            'Alka-Seltzer',
            ['Baking soda', 'Calcium carbonate', 'Sugar'],
            'Alka-Seltzer contains its own acid and bicarbonate.',
          ],
          [
            'Which two solids give a blue-black iodine result?',
            'Flour and cornstarch',
            ['Salt and sugar', 'Sand and gypsum', 'Yeast and gelatin'],
            'Both contain starch.',
          ],
        ],
        [
          [
            'Describe how to distinguish salt from sugar without tasting.',
            'Under a lens, salt forms clear cubic crystals while sugar crystals are irregular and slightly elongated. Both dissolve, so crystal shape is the key observation.',
          ],
          [
            'Explain why sodium acetate gives a vinegar smell with HCl.',
            'HCl donates a proton to acetate, forming acetic acid, which is the acid in vinegar and has its characteristic odor.',
          ],
          [
            'How would you separate a mixture of salt and sand?',
            'Add water to dissolve the salt, filter or decant to remove the sand, then evaporate the liquid to recover the salt.',
          ],
          [
            'Why should tests begin with observation before adding reagents?',
            'Observation uses no sample and can narrow the possibilities, saving material for the confirming chemical tests.',
          ],
        ],
        [
          ['Observe', 'Crystal shape, color, texture, and odor.'],
          ['Dissolve', 'Water solubility and any reaction.'],
          ['Confirm', 'HCl for carbonates, iodine for starch and vitamin C.'],
        ],
        [
          [
            'Calcium carbonate',
            'Insoluble; fizzes with HCl',
            'Do not confuse with soluble baking soda.',
          ],
          [
            'Cornstarch',
            'Blue-black with iodine; squeaks',
            'Flour also tests positive for starch.',
          ],
          ['Vitamin C', 'Decolorizes iodine', 'Acidic; dissolves readily.'],
        ],
        'Plan the smallest set of tests that identifies the unknown powder.',
        'Combine at least two independent tests before naming a powder.',
      ),
      investigation: evidence(
        [
          ['Appearance', 'Fine, pure white powder that squeaks when pressed.'],
          ['Water', 'Does not dissolve; forms a cloudy suspension.'],
          ['HCl', 'No fizzing.'],
          ['Iodine', 'Turns blue-black.'],
        ],
        'What is the unknown?',
        ['Calcium carbonate', 'Cornstarch', 'Baking soda', 'Gypsum'],
        1,
        'A blue-black iodine result shows starch. The pure white, squeaky, very fine texture points to cornstarch rather than flour.',
      ),
    },
    {
      ...c(
        'Metals and liquids',
        [
          'Identify the six listed metals by color, magnetism, and reaction with acid.',
          'Identify the six listed liquids using odor, pH, and simple reactions.',
          'Explain the chemistry behind each key test.',
        ],
        [
          [
            'Metal appearance and magnetism',
            'The listed non-powdered metals are aluminum, iron, zinc, magnesium, copper, and tin. Copper is easy to spot by its reddish-orange color. The others are silvery to gray: aluminum is light and dull silver, magnesium is a light silvery ribbon that tarnishes gray, zinc is bluish gray, tin is shiny silver and soft, and iron is gray. Only iron is attracted to a magnet, so a magnet test separates it immediately.',
          ],
          [
            'Metals with hydrochloric acid',
            'Many metals react with hydrochloric acid to make hydrogen gas and a metal chloride. Reactivity follows the activity series. Magnesium reacts vigorously with rapid bubbling. Zinc reacts steadily with steady bubbling. Iron and tin react slowly. Aluminum often reacts slowly at first because a protective oxide coating must be removed, then speeds up. Copper is below hydrogen in the activity series and does not react with HCl.',
          ],
          [
            'Density and other clues',
            'Density helps when appearance is unclear. Aluminum and magnesium are light, around 2.7 and 1.7 g/cm³, while zinc, tin, and iron are about 7–8 g/cm³ and copper about 9 g/cm³. Measure mass on a balance and volume by water displacement, then divide. Combining color, magnetism, reaction rate, and density gives a confident identification even when two metals look alike.',
          ],
          [
            'The liquids list',
            'The listed liquids are lemon juice, rubbing alcohol (isopropyl), household ammonia (3%), water, vinegar, and 3% hydrogen peroxide. Many look like clear water, so tests matter. Lemon juice is slightly cloudy and yellowish. Isopropyl alcohol has a sharp, medicinal smell and evaporates quickly from a surface. Household ammonia has a strong, pungent odor. Vinegar smells sour. Waft gently and never mix ammonia with other cleaners.',
          ],
          [
            'pH testing',
            'Use pH paper or indicator. Vinegar and lemon juice are acidic, with pH around 2–3. Household ammonia is basic, around pH 11. Water is near neutral, pH 7, and isopropyl alcohol and hydrogen peroxide are close to neutral or slightly acidic. A pH test splits the liquids into acid, neutral, and base groups, and odor then separates vinegar from lemon juice and alcohol from water.',
          ],
          [
            'Hydrogen peroxide and confirmation',
            'Hydrogen peroxide decomposes into water and oxygen. The reaction is slow alone but fast with a catalyst: adding yeast, which contains the enzyme catalase, produces vigorous bubbling. This identifies peroxide and confirms yeast at the same time. Acids fizz with baking soda while neutral liquids do not. Isopropyl alcohol evaporates far faster than water when a drop is placed on a watch glass.',
          ],
        ],
        [
          ['Activity series', 'Ranking of metals by how easily they react.'],
          ['Oxide layer', 'Thin protective coating, as on aluminum.'],
          ['pH', 'Scale of acidity: below 7 acidic, above 7 basic.'],
          ['Catalase', 'Enzyme that speeds hydrogen peroxide breakdown.'],
          ['Catalyst', 'Substance that speeds a reaction without being used up.'],
          ['Water displacement', 'Measuring volume by the rise in water level.'],
        ],
        [
          'A silvery metal is not magnetic, reacts vigorously with HCl, and has a density of about 1.7 g/cm³. Identify it.',
          [
            'Not magnetic rules out iron.',
            'Vigorous reaction with HCl points to a very reactive metal.',
            'Density near 1.7 g/cm³ is much lighter than zinc or tin.',
          ],
          'The metal is magnesium.',
        ],
        [
          [
            'Which listed metal does not react with hydrochloric acid?',
            'Copper',
            ['Zinc', 'Magnesium', 'Iron'],
            'Copper is below hydrogen in the activity series.',
          ],
          [
            'Which liquid is basic with a strong, pungent odor?',
            'Household ammonia',
            ['Vinegar', 'Hydrogen peroxide', 'Lemon juice'],
            'Ammonia solutions are basic and smell sharp.',
          ],
          [
            'Adding yeast to which liquid causes vigorous bubbling?',
            'Hydrogen peroxide',
            ['Water', 'Isopropyl alcohol', 'Vinegar'],
            'Catalase in yeast breaks down peroxide into oxygen gas and water.',
          ],
        ],
        [
          [
            'Why might aluminum react slowly with HCl at first?',
            'A thin aluminum oxide layer protects the metal until the acid dissolves it, after which the reaction speeds up.',
          ],
          [
            'Describe how to tell vinegar from lemon juice.',
            'Both are acidic, so use odor and appearance: vinegar is clear with a sharp sour smell, while lemon juice is cloudy and yellowish with a citrus smell.',
          ],
          [
            'Write the general products when an active metal reacts with HCl.',
            'Hydrogen gas and a metal chloride, for example Zn + 2HCl → ZnCl₂ + H₂.',
          ],
          [
            'How can you tell isopropyl alcohol from water?',
            'Alcohol has a medicinal odor and evaporates much faster when a drop is placed on a surface.',
          ],
        ],
        [
          ['Sort', 'Color and magnetism separate copper and iron.'],
          ['React', 'HCl bubbling rate ranks the remaining metals.'],
          ['Test liquids', 'pH, odor, and catalase reaction identify liquids.'],
        ],
        [
          ['Iron', 'Magnetic; slow reaction with HCl', 'Steel objects can contain other metals.'],
          ['Magnesium', 'Vigorous HCl reaction; light', 'Tarnish can hide its silver color.'],
          ['Copper', 'Reddish; no HCl reaction', 'Green patina if oxidized.'],
        ],
        'Identify the metal and liquid from the test results.',
        'Use one decisive property first, then confirm with a second test.',
      ),
      investigation: evidence(
        [
          ['Liquid color', 'Clear and colorless.'],
          ['Odor', 'Little odor.'],
          ['pH paper', 'About pH 6, close to neutral.'],
          ['With yeast', 'Vigorous foaming and bubbling.'],
        ],
        'What is the liquid?',
        ['Water', 'Hydrogen peroxide', 'Vinegar', 'Isopropyl alcohol'],
        1,
        'Near-neutral and odorless fits water or peroxide, but only peroxide bubbles vigorously when catalase in yeast breaks it down.',
      ),
    },
    {
      ...c(
        'Hair and fibers',
        [
          'Distinguish human, dog, and cat hair by medulla and scales.',
          'Classify fibers as animal, vegetable, or synthetic.',
          'Interpret provided burn test results.',
        ],
        [
          [
            'Hair structure',
            'A hair has three layers. The cuticle is the outer layer of overlapping scales. The cortex beneath holds pigment granules that give color. The medulla is a central canal that may be continuous, fragmented, or absent. Crime Busters asks only for the difference between human, dog, and cat hair, not specific types. A compound microscope at 100× to 400× shows these features clearly on a slide.',
          ],
          [
            'Medulla index',
            'The medullary index is the medulla’s width divided by the whole hair’s width. Human hair usually has a medulla that is absent or fragmented, and when present its index is less than about one-third. Animal hairs have wide, continuous medullas with an index of about one-half or more. A wide, continuous medulla therefore suggests an animal source, and a thin or absent one suggests a human.',
          ],
          [
            'Telling dog from cat',
            'Once a hair is identified as animal, scales and medulla patterns help separate species. Cat hairs often have pointed, spinous or petal-like scales and a medulla that looks like a string of pearls. Dog hairs typically have flattened, wavy scales, and the medulla is wide and continuous, often with a ladder-like appearance. Human hairs have flat, smooth, imbricate scales that overlap like shingles.',
          ],
          [
            'Fiber categories',
            'Fibers come from three categories. Animal fibers, such as wool and silk, are protein. Vegetable fibers, such as cotton and linen, are made of cellulose from plants. Synthetic fibers, such as nylon, polyester, and acrylic, are made from petroleum-based polymers. Under a microscope, cotton looks like a flat, twisted ribbon, wool shows scales like hair, and synthetics appear smooth, uniform rods.',
          ],
          [
            'Burn test results',
            'Burn tests are not performed at the event, but results may be given. Animal fibers burn slowly, shrink from the flame, smell like burning hair, often self-extinguish, and leave a crushable black ash. Vegetable fibers burn quickly like paper, smell like burning paper or leaves, glow afterward, and leave a soft gray ash. Synthetic fibers melt and shrink away from the flame, may drip, smell chemical, and leave a hard bead.',
          ],
          [
            'Linking fibers to suspects',
            'Fibers are class evidence: they can show a fiber is consistent with a source but rarely prove it came from a single garment. Compare color, diameter, shape, and category with each suspect’s clothing or pets. A dog hair found on a victim implicates a suspect who owns a dog more than one who owns a cat. In your analysis, say “consistent with” rather than “identical to,” and combine fiber evidence with other evidence.',
          ],
        ],
        [
          ['Cuticle', 'Outer layer of overlapping hair scales.'],
          ['Cortex', 'Middle hair layer containing pigment.'],
          ['Medulla', 'Central canal of a hair.'],
          ['Medullary index', 'Medulla width divided by hair width.'],
          ['Cellulose', 'Plant polymer making up vegetable fibers.'],
          ['Class evidence', 'Evidence that narrows to a group, not a single source.'],
        ],
        [
          'A hair has a continuous medulla about 60% of the hair’s width and scales shaped like petals. What is its source?',
          [
            'A medullary index above one-half suggests an animal hair.',
            'Petal-like, pointed scales are typical of cat hair.',
            'Combine both features for the conclusion.',
          ],
          'The hair is most consistent with a cat.',
        ],
        [
          [
            'A human hair usually has a medullary index of:',
            'Less than about one-third',
            ['Greater than one-half', 'Exactly one', 'Zero always'],
            'Human medullas are thin, fragmented, or absent.',
          ],
          [
            'A fiber burns quickly, glows afterward, and leaves soft gray ash. It is:',
            'Vegetable (such as cotton)',
            ['Animal (such as wool)', 'Synthetic (such as nylon)', 'Mineral'],
            'Cellulose burns like paper.',
          ],
          [
            'A fiber melts, shrinks from the flame, and forms a hard bead. It is:',
            'Synthetic',
            ['Vegetable', 'Animal', 'Hair'],
            'Synthetic polymers melt rather than char.',
          ],
        ],
        [
          [
            'Describe the three layers of a hair.',
            'The cuticle is the scaly outer layer, the cortex holds pigment, and the medulla is the central canal.',
          ],
          [
            'How does wool look under a microscope compared with cotton?',
            'Wool shows overlapping scales like hair because it is animal hair; cotton appears as a flat, twisted ribbon.',
          ],
          [
            'Why are fibers called class evidence?',
            'Many garments share the same fiber type and color, so a match narrows possibilities to a group but cannot prove a single source.',
          ],
          [
            'What smell would identify an animal fiber in a burn test?',
            'The smell of burning hair, because animal fibers are protein.',
          ],
        ],
        [
          ['Mount', 'Place hair or fiber on a slide.'],
          ['Measure', 'Note medulla, scales, shape, and color.'],
          ['Classify', 'Human or animal; animal, vegetable, or synthetic.'],
        ],
        [
          ['Human hair', 'Thin or absent medulla; flat scales', 'Dyes and treatments alter color.'],
          ['Animal hair', 'Wide medulla, index ≥ ½', 'Species patterns overlap.'],
          ['Synthetic fiber', 'Smooth, uniform; melts', 'Many brands share polymers.'],
        ],
        'Classify the hair and fiber samples before matching them to suspects.',
        'Measure the medulla first; it is the quickest human-versus-animal clue.',
      ),
      investigation: evidence(
        [
          ['Hair A', 'Medulla fragmented; index about 0.2.'],
          ['Hair B', 'Wide, continuous ladder-like medulla; flattened scales.'],
          ['Fiber', 'Burns quickly with afterglow and soft gray ash.'],
        ],
        'Which summary is correct?',
        [
          'A: cat; B: human; fiber: synthetic',
          'A: human; B: dog; fiber: vegetable',
          'A: dog; B: cat; fiber: animal',
          'A: human; B: cat; fiber: synthetic',
        ],
        1,
        'Hair A’s low index fits a human. Hair B’s wide, ladder-like medulla and flat scales fit a dog. Paper-like burning means a vegetable fiber.',
      ),
    },
    {
      ...c(
        'Recyclable plastics',
        [
          'Name the listed plastics and their resin codes.',
          'Use density to separate plastics that float or sink.',
          'Interpret provided burn and solubility results.',
        ],
        [
          [
            'Polymers and resin codes',
            'Plastics are polymers, long chains of repeating units. Recycling codes identify the resin: 1 PETE (polyethylene terephthalate), 2 HDPE (high-density polyethylene), 3 PVC (polyvinyl chloride), 4 LDPE (low-density polyethylene), 5 PP (polypropylene), 6 PS (polystyrene), and 7 for others, which includes PMMA (acrylic). Crime Busters uses PETE, HDPE, non-expanded PS, LDPE, PP, PVC, and PMMA. An evidence fragment rarely shows its code, so you must test it.',
          ],
          [
            'Everyday sources',
            'Knowing typical uses helps link evidence to a scene. PETE makes clear soda and water bottles. HDPE makes milk jugs and detergent bottles. PVC makes pipes and some clear packaging. LDPE makes plastic bags and squeeze bottles. PP makes yogurt cups, bottle caps, and straws. PS makes disposable cutlery, CD cases, and clear cups. PMMA, or acrylic, makes shatter-resistant windows and displays.',
          ],
          [
            'Density separations',
            'Density is the most useful test. In water, density 1.00 g/cm³, polypropylene (about 0.90), LDPE (about 0.92), and HDPE (about 0.95) float. Polystyrene (about 1.05), PMMA (about 1.18), PVC (about 1.3–1.4), and PETE (about 1.38) sink. Supervisors may provide solutions of other densities, such as alcohol–water mixtures that are less dense than water or salt solutions that are denser, to split groups further.',
          ],
          [
            'Testing technique',
            'Use small pieces free of air bubbles, push each below the surface, and wet it fully, since trapped air makes plastics float falsely. Test from least dense to most dense solution. A piece that floats in water but sinks in a 0.93 g/cm³ alcohol solution must be denser than 0.93, so it is HDPE rather than PP or LDPE. Record float or sink for each solution in a table.',
          ],
          [
            'Burn and other provided results',
            'Burn tests are not done at the event, but results may be provided. PVC contains chlorine, so it burns with a green-edged flame in a copper-wire (Beilstein) test and gives off acrid fumes; it tends to self-extinguish. Polystyrene burns with a sooty, smoky flame. Polyethylene and polypropylene burn with a waxy, candle-like smell and drip. PETE burns and drips with a sweet smell. PMMA burns with a fruity odor.',
          ],
          [
            'Physical properties',
            'Other observations help. LDPE is soft and flexible, while HDPE is stiffer and somewhat waxy. PP is flexible enough to bend repeatedly without breaking. PS is rigid and brittle and makes a metallic sound when dropped. PMMA is very clear and rigid. PETE is clear and tough. Combine density with these clues, and be careful: colorants and fillers can shift density slightly.',
          ],
        ],
        [
          ['Polymer', 'Large molecule made of repeating units.'],
          ['Resin code', 'Recycling number 1–7 identifying a plastic.'],
          ['Density', 'Mass per unit volume; decides float or sink.'],
          ['Beilstein test', 'Copper-wire flame test showing green for chlorine.'],
          ['HDPE', 'High-density polyethylene, code 2.'],
          ['PMMA', 'Polymethyl methacrylate, or acrylic, code 7.'],
        ],
        [
          'A plastic fragment sinks in water, floats in a 1.10 g/cm³ salt solution, and burns with a sooty flame. Identify it.',
          [
            'Sinking in water means density is above 1.00 g/cm³.',
            'Floating in 1.10 g/cm³ means density is below 1.10 g/cm³.',
            'Only polystyrene (about 1.05) fits, and a sooty flame confirms it.',
          ],
          'The fragment is polystyrene (PS, code 6).',
        ],
        [
          [
            'Which plastics float in water?',
            'PP, LDPE, and HDPE',
            ['PVC and PETE', 'PS and PMMA', 'All plastics'],
            'Their densities are below 1.00 g/cm³.',
          ],
          [
            'Which plastic gives a green flame in the Beilstein test?',
            'PVC',
            ['PETE', 'HDPE', 'PP'],
            'PVC contains chlorine, which colors the copper flame green.',
          ],
          [
            'What is resin code 2?',
            'HDPE',
            ['PETE', 'PVC', 'LDPE'],
            'Code 2 is high-density polyethylene.',
          ],
        ],
        [
          [
            'Why must air bubbles be removed before a density test?',
            'Trapped air lowers the overall density of the sample, which can make a dense plastic float falsely.',
          ],
          [
            'How could you separate HDPE from PP using density?',
            'Use a solution with density between them, about 0.92–0.94 g/cm³. PP (0.90) floats and HDPE (0.95) sinks.',
          ],
          [
            'Give an everyday source for PETE and for PVC.',
            'PETE: clear soda or water bottles. PVC: plumbing pipes.',
          ],
          [
            'Why is plastic evidence class evidence?',
            'The same polymer is made into many products, so a match shows consistency with a source type, not one specific object.',
          ],
        ],
        [
          ['Prepare', 'Cut small, bubble-free pieces.'],
          ['Float', 'Test in solutions of increasing density.'],
          ['Confirm', 'Check provided burn results and physical properties.'],
        ],
        [
          ['Polypropylene', 'Floats; flexible hinges', 'Density close to LDPE.'],
          ['Polystyrene', 'Sinks in water, floats in 1.10 salt water', 'Brittle; sooty flame.'],
          ['PVC', 'Very dense; green Beilstein flame', 'Toxic fumes when burned.'],
        ],
        'Bracket each fragment’s density between solutions before naming it.',
        'Float or sink in several solutions brackets a density; that narrows the polymer.',
      ),
      investigation: evidence(
        [
          ['Water', 'Sinks.'],
          ['1.10 g/cm³ solution', 'Sinks.'],
          ['1.25 g/cm³ solution', 'Floats.'],
          ['Appearance', 'Very clear, rigid, and shatter-resistant.'],
        ],
        'Which plastic is it?',
        ['Polystyrene', 'PMMA (acrylic)', 'PVC', 'HDPE'],
        1,
        'Density is between 1.10 and 1.25 g/cm³, matching PMMA near 1.18. Very clear, rigid, shatter-resistant material confirms acrylic.',
      ),
    },
    {
      ...c(
        'Paper chromatography',
        [
          'Explain how paper chromatography separates mixtures.',
          'Calculate and interpret Rf values.',
          'Match ink or dye evidence to a suspect.',
        ],
        [
          [
            'How chromatography works',
            'Chromatography separates mixtures based on how strongly each component is attracted to two phases. In paper chromatography, the stationary phase is the paper, and the mobile phase is the solvent that climbs up the paper by capillary action. Components that dissolve well in the solvent and cling weakly to the paper travel farther. Components that cling strongly to the paper travel less. A mixture of dyes, like black ink, separates into colored bands.',
          ],
          [
            'Setting up a chromatogram',
            'Draw a starting line in pencil, not ink, about 1–2 cm from the bottom, since pen ink would separate too. Place a small, concentrated spot of the sample on the line and let it dry. Stand the paper in solvent so the solvent level is below the spot; otherwise the sample dissolves into the solvent pool. Cover the container to keep the air saturated. Remove the paper before the solvent reaches the top and mark the solvent front immediately.',
          ],
          [
            'Calculating Rf',
            'The retention factor, Rf, equals the distance traveled by a spot divided by the distance traveled by the solvent front, both measured from the starting line. Rf is always between 0 and 1 and has no units. Measure to the center of each spot. For example, a spot 3.0 cm from the start with a solvent front at 6.0 cm has Rf = 0.50. Report Rf to two decimal places.',
          ],
          [
            'What affects Rf',
            'For a given solvent and paper, a substance has a characteristic Rf value. Changing the solvent, paper type, or temperature changes Rf values, so known samples must be run on the same paper under the same conditions as the evidence. That is why suspects’ pens are tested side by side with the ransom note ink. If the solvent front is not marked, Rf cannot be calculated.',
          ],
          [
            'Matching evidence',
            'To match an ink, compare the number of bands, their colors, their order, and their Rf values. A match requires all to agree. Two black inks can look identical on paper but separate into different dye combinations. Juices and drink mixes like Kool-Aid also separate into food dyes. Chromatograms are collected with the score sheet, so label them clearly and keep them neat.',
          ],
          [
            'Limitations',
            'A chromatography match shows the ink is consistent with a pen, not that it came from that exact pen, since many pens of a brand share the same ink. Faint or overlapping bands can be hard to measure. Some dyes may not move at all in a given solvent and stay on the starting line, giving Rf = 0. State these limitations when you write your analysis and combine chromatography with other evidence.',
          ],
        ],
        [
          ['Stationary phase', 'The paper, which holds components back.'],
          ['Mobile phase', 'The solvent that moves up the paper.'],
          ['Capillary action', 'Liquid movement through narrow spaces like paper fibers.'],
          ['Solvent front', 'Farthest point the solvent reached.'],
          ['Rf value', 'Spot distance divided by solvent front distance.'],
          ['Chromatogram', 'The developed paper showing separated components.'],
        ],
        [
          'Ransom-note ink separates into a blue spot at 2.4 cm and a yellow spot at 4.8 cm, with the solvent front at 6.0 cm. Suspect A’s pen gives Rf values 0.40 and 0.80; suspect B’s gives 0.40 and 0.65. Which pen matches?',
          [
            'Blue: Rf = 2.4 ÷ 6.0 = 0.40.',
            'Yellow: Rf = 4.8 ÷ 6.0 = 0.80.',
            'Suspect A’s values match both bands; suspect B’s yellow does not.',
          ],
          'The note’s ink is consistent with suspect A’s pen, but not suspect B’s.',
        ],
        [
          [
            'Why is the starting line drawn in pencil?',
            'Pencil graphite does not dissolve and separate',
            ['Pencil speeds up the solvent', 'Ink is required for Rf', 'Pencil changes Rf values'],
            'Ink from a pen would separate along with the sample.',
          ],
          [
            'A spot travels 2.0 cm while the solvent travels 8.0 cm. What is its Rf?',
            '0.25',
            ['4.0', '0.40', '2.5'],
            'Rf = 2.0 ÷ 8.0 = 0.25.',
          ],
          [
            'A component that clings strongly to the paper will have:',
            'A low Rf',
            ['A high Rf', 'An Rf above 1', 'No spot at all'],
            'Strong attraction to the stationary phase slows it down.',
          ],
        ],
        [
          [
            'Explain why the sample spot must be above the solvent level.',
            'If the spot is below the solvent surface, the sample dissolves into the solvent pool instead of traveling up the paper.',
          ],
          [
            'Why must known and unknown samples be run on the same paper at the same time?',
            'Rf values depend on solvent, paper, and conditions, so only side-by-side runs are directly comparable.',
          ],
          [
            'What makes two inks a match on a chromatogram?',
            'The same number of bands, colors, order, and Rf values.',
          ],
          [
            'Why can a chromatography match not prove a specific pen wrote the note?',
            'Many pens share the same ink formula, so the match shows consistency with a pen type, not a single pen.',
          ],
        ],
        [
          ['Spot', 'Apply a small sample on a pencil line.'],
          ['Develop', 'Solvent climbs and separates components.'],
          ['Measure', 'Calculate Rf for each band and compare.'],
        ],
        [
          ['High Rf', 'Dissolves well, travels far', 'Can run off if left too long.'],
          ['Low Rf', 'Clings to paper, travels little', 'May overlap the starting spot.'],
          ['Match', 'Same bands, colors, Rf', 'Shows consistency, not uniqueness.'],
        ],
        'Calculate Rf for each band before comparing suspects’ pens.',
        'Rf compares a spot with its own solvent front, so only side-by-side runs are comparable.',
      ),
      investigation: evidence(
        [
          ['Note ink', 'Three bands: Rf 0.15, 0.45, 0.70.'],
          ['Suspect 1 pen', 'Two bands: Rf 0.45, 0.70.'],
          ['Suspect 2 pen', 'Three bands: Rf 0.15, 0.45, 0.70.'],
          ['Suspect 3 pen', 'Three bands: Rf 0.20, 0.50, 0.90.'],
        ],
        'Which pen’s ink is consistent with the note?',
        ['Suspect 1', 'Suspect 2', 'Suspect 3', 'None of them'],
        1,
        'Only suspect 2’s pen gives all three bands at the same Rf values as the note.',
      ),
    },
    {
      ...c(
        'Fingerprints, DNA, prints, soil, and spatter',
        [
          'Classify fingerprints as loops, whorls, or arches.',
          'Compare DNA electropherograms between scene and suspects.',
          'Interpret shoe prints, tire treads, soil, and spatter patterns.',
        ],
        [
          [
            'Fingerprint patterns',
            'Fingerprints are formed by friction ridges and are unique to each person, even identical twins. There are three main patterns. Loops, the most common at about 60–65%, have ridges that enter and leave on the same side and one delta. Whorls, about 30–35%, have circular or spiral ridges and two deltas. Arches, about 5%, have ridges that enter one side, rise in the middle, and leave the other side, with no delta.',
          ],
          [
            'Comparing prints',
            'To compare a scene print with suspects’ prints, first check the overall pattern type: a whorl cannot match a loop. Then compare detailed ridge features, called minutiae, such as ridge endings, bifurcations (forks), and dots. Fingerprints are individual evidence, meaning a full match can point to one person. A partial or smudged print may only rule suspects out rather than identify one.',
          ],
          [
            'DNA electropherograms',
            'DNA profiles compare short tandem repeats (STRs), places where a short DNA sequence repeats a different number of times in different people. An electropherogram shows peaks; each peak’s position gives the number of repeats. A person has two peaks at a location, one from each parent, or one peak if both copies are the same. A suspect matches only if every peak at every location matches the scene sample.',
          ],
          [
            'Shoe prints and tire treads',
            'Shoe prints and tire treads show class characteristics, such as brand pattern and size, and individual characteristics, such as cuts and wear. Compare the overall pattern first, then any unique damage. Prints can show direction of travel: toe direction for shoes, and soil thrown backward for tires. Deeper, longer, more spread-out prints suggest running, while short, even strides suggest walking. Crime Busters asks for conclusions without calculations.',
          ],
          [
            'Soil evidence',
            'Soil varies from place to place in color, particle size, and composition, such as sand, silt, clay, and organic matter. Comparing soil on a suspect’s shoes with soil from the scene can show whether the suspect could have been there. A matching composition is class evidence that is consistent with the scene; a clearly different composition can help rule a suspect out for that location.',
          ],
          [
            'Spatter patterns',
            'Spatter is analyzed for direction and speed of impact without calculations. A drop falling straight down makes a round stain. A drop striking at an angle makes an elongated stain, with its narrow tail pointing in the direction of travel. Low-speed impacts, like dripping, make larger drops; high-speed impacts make a fine mist of tiny drops. Finding where many stains converge points to the area of origin.',
          ],
        ],
        [
          ['Friction ridges', 'Raised skin lines that form fingerprints.'],
          ['Delta', 'Triangular ridge meeting point in loops and whorls.'],
          ['Minutiae', 'Ridge endings, forks, and dots used to compare prints.'],
          ['STR', 'Short tandem repeat used in DNA profiling.'],
          ['Individual evidence', 'Evidence that can point to one source.'],
          ['Area of origin', 'Location where spatter came from.'],
        ],
        [
          'A scene DNA sample shows peaks at 12 and 15 repeats at location 1, and 8 and 8 at location 2. Suspect X: 12/15 and 8/10. Suspect Y: 12/15 and 8/8. Which suspect matches?',
          [
            'Location 1: both suspects show 12/15, matching the scene.',
            'Location 2: the scene shows only 8 repeats (homozygous 8/8).',
            'Suspect X has 8/10, which does not match; suspect Y has 8/8, which does.',
          ],
          'Only suspect Y matches at every location tested.',
        ],
        [
          [
            'Which fingerprint pattern has no delta?',
            'Arch',
            ['Loop', 'Whorl', 'Double loop'],
            'Arches have ridges flowing across without a delta.',
          ],
          [
            'An elongated stain’s narrow tail points:',
            'In the direction of travel',
            ['Back toward the source', 'Straight up', 'In a random direction'],
            'The tail forms as the drop continues moving forward.',
          ],
          [
            'A DNA profile matches a suspect only if:',
            'Every peak at every location matches',
            ['Most peaks match', 'One location matches', 'The peaks are the same height'],
            'One mismatch excludes the suspect.',
          ],
        ],
        [
          [
            'Explain the difference between class and individual evidence, with an example of each.',
            'Class evidence narrows to a group, like a shoe brand and size. Individual evidence can point to one source, like a full fingerprint or a complete DNA profile.',
          ],
          [
            'How can tire tracks show direction of travel?',
            'Soil or debris is thrown backward by spinning tires, and tread marks can show the direction the vehicle moved.',
          ],
          ['What does a fine mist of tiny spatter drops indicate?', 'A high-speed impact.'],
          [
            'Why can a partial fingerprint still be useful?',
            'Even if it cannot identify one person, its pattern type and visible ridge details can rule out suspects whose prints differ.',
          ],
        ],
        [
          ['Classify', 'Pattern type, tread type, or soil type first.'],
          ['Compare', 'Detailed features or peaks between scene and suspects.'],
          ['Conclude', 'Match, exclude, or inconclusive.'],
        ],
        [
          ['Fingerprint', 'Individual ridge detail', 'Smudges limit comparison.'],
          ['DNA STR profile', 'Peaks at several locations', 'Contamination can add peaks.'],
          ['Soil', 'Composition consistent with a location', 'Class evidence only.'],
        ],
        'Compare each scene record with the suspects’ records and exclude where possible.',
        'Exclusion is often stronger than a match: one clear difference rules a suspect out.',
      ),
      investigation: evidence(
        [
          ['Scene print', 'A whorl with two deltas.'],
          ['Suspect A', 'Right index finger: loop.'],
          ['Suspect B', 'Right index finger: whorl with matching ridge endings.'],
          ['Suspect C', 'Right index finger: arch.'],
        ],
        'Which suspect’s print matches the scene?',
        ['Suspect A', 'Suspect B', 'Suspect C', 'None'],
        1,
        'Only suspect B has a whorl, and the matching ridge details support the comparison. Loops and arches are excluded by pattern alone.',
      ),
    },
    {
      ...c(
        'Writing the crime scene analysis',
        [
          'Organize evidence into a table linking items to suspects.',
          'Write an analysis explaining who is implicated and why others are not.',
          'Use precise, cautious scientific language.',
        ],
        [
          [
            'Start with a summary table',
            'Before writing, build a table with suspects as columns and evidence items as rows. Mark each cell with a link (consistent), no link (excluded), or not tested. For example, a soil row may show soil consistent with suspects A and C, while a chromatography row links only suspect A. The table shows at a glance which suspect connects to the most evidence and which are cleared, and it keeps your writing organized.',
          ],
          [
            'Explain who did it',
            'The rules require you to explain which evidence implicates the culprit and why. Name each piece of evidence, give your test result, and connect it to the suspect: “The unknown powder fizzed with HCl but was insoluble in water, identifying calcium carbonate, which was found in suspect A’s garage.” Lead with the strongest individual evidence, such as fingerprints or DNA, and support it with class evidence.',
          ],
          [
            'Explain why the others are innocent',
            'An analysis is incomplete if it only names the culprit. For each other suspect, explain which evidence excludes them or fails to link them. For example, “Suspect B’s pen ink had a different second band (Rf 0.65 versus 0.80), so the note was not written with B’s pen.” Exclusions are often decisive, because one clear mismatch rules a suspect out.',
          ],
          [
            'Use careful language',
            'Choose words that match the strength of evidence. Say “consistent with” or “matches” for class evidence, and “identifies” only for strong individual evidence. Avoid claiming certainty you do not have. Note limitations, such as a smudged print or a common fiber type. Clear, cautious language shows scientific reasoning and earns points for the quality of your explanation.',
          ],
          [
            'Handle conflicting evidence',
            'Sometimes evidence points in different directions, such as soil linking two suspects but the hair linking only one. Weigh individual evidence above class evidence, and look for an explanation that fits all the results. If two suspects worked together, the scenario may allow multiple culprits. Never ignore a result that does not fit; explain it or state why it carries less weight.',
          ],
          [
            'Time management',
            'The event lasts about 50 minutes, so plan: identify unknowns quickly, keep a clean data table, and leave at least 10 minutes to write the analysis. Split work between partners, for example one person on powders and liquids and the other on hair, fibers, and chromatography. Clean up as directed and dispose of waste in the containers the supervisor provides.',
          ],
        ],
        [
          ['Analysis', 'Written explanation connecting evidence to the solution.'],
          ['Implicate', 'Show evidence links a suspect to the crime.'],
          ['Exclude', 'Show evidence rules a suspect out.'],
          ['Inconclusive', 'Evidence that neither links nor excludes.'],
          ['Corroborate', 'Support one piece of evidence with another.'],
          ['Chain of reasoning', 'Step-by-step link from test result to conclusion.'],
        ],
        [
          'Evidence: the scene powder is baking soda; suspect A has baking soda, B has cornstarch, C has baking soda. Note ink matches only C’s pen. A dog hair was found; A and C own dogs, B owns a cat. Who is the culprit?',
          [
            'Powder links A and C, and excludes B (cornstarch).',
            'Dog hair links A and C, and excludes B (cat).',
            'Ink matches only C, which excludes A.',
          ],
          'Suspect C is implicated by all three items. A is excluded by the ink, and B by the powder and hair.',
        ],
        [
          [
            'An analysis must explain the culprit and also:',
            'Why the other suspects were not chosen',
            ['Only the strongest evidence', 'Each suspect’s alibi only', 'The price of each test'],
            'The rules require explaining exclusions.',
          ],
          [
            'Which evidence should usually carry the most weight?',
            'Individual evidence, such as a full fingerprint',
            ['Common class evidence', 'Unknown odors', 'Suspect statements'],
            'Individual evidence can point to one source.',
          ],
          [
            'Which phrase is best for a fiber match?',
            '“Consistent with”',
            ['“Proves beyond doubt”', '“Identical source”', '“Certainly from”'],
            'Fibers are class evidence, so cautious wording is appropriate.',
          ],
        ],
        [
          [
            'Why is a summary table helpful before writing?',
            'It shows which evidence links or excludes each suspect, revealing the culprit and keeping the explanation organized.',
          ],
          [
            'How should you handle a result that does not fit your conclusion?',
            'Acknowledge it, look for an explanation, and state why it carries less weight than the stronger evidence.',
          ],
          [
            'Give an example of a sentence that excludes a suspect.',
            'Suspect B’s fingerprint is an arch, but the scene print is a whorl, so B did not leave the print.',
          ],
          [
            'Why might two suspects both be culprits?',
            'Different evidence items may link two different people to the scene, which the scenario may allow.',
          ],
        ],
        [
          ['Tabulate', 'Link each evidence item to each suspect.'],
          ['Implicate', 'Explain how the evidence links the culprit.'],
          ['Exclude', 'Explain how evidence clears the others.'],
        ],
        [
          ['Individual evidence', 'Points to one person', 'Must be complete and clear.'],
          ['Class evidence', 'Narrows to a group', 'Needs corroboration.'],
          ['Exclusion', 'One clear mismatch clears a suspect', 'Check test quality first.'],
        ],
        'Use the evidence table to decide who is implicated and who is cleared.',
        'A strong analysis explains both the culprit and every exclusion.',
      ),
      investigation: evidence(
        [
          ['Powder', 'Calcium carbonate: found with suspects 1 and 3.'],
          ['Plastic', 'HDPE fragment: suspects 1, 2, and 3 all use HDPE jugs.'],
          ['Chromatography', 'Note ink matches only suspect 3’s pen.'],
          ['Fingerprint', 'Scene loop matches suspect 3’s minutiae.'],
        ],
        'Who is the culprit?',
        ['Suspect 1', 'Suspect 2', 'Suspect 3', 'Suspects 1 and 2 together'],
        2,
        'The fingerprint is individual evidence for suspect 3, supported by ink and powder. Suspect 2 lacks the powder, and suspect 1’s pen does not match.',
      ),
    },
  ],
});
