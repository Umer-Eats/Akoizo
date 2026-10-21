import { buildCourse } from './lesson-course-builder.ts';
import { chapter as c, evidence } from './course-authoring.ts';

// Division B Food Science (2027 theme: dairy), organized from rule 3.a–3.c.
export const foodScienceLessons = buildCourse({
  eventId: 'food-science',
  eventName: 'Food Science',
  prefix: 'food',
  division: 'B',
  syllabus: '2027 Science Olympiad Division B Food Science rules (dairy)',
  intro:
    'Seven units follow the 2027 Food Science rules on the science of milk products. You will study dairy carbohydrates, fats, and proteins, then the chemistry behind the three lab tasks: curd mass, butter (milk fat) mass, and ice cream formation. Later units cover processing and preservation, nutrition and labeling, lactose intolerance and allergies, and the pre-tournament experiment notebook. All numbers here are teaching examples; follow your supervisor’s safety rules in the lab.',
  references: [
    { title: 'Science Olympiad: Food Science B', url: 'https://www.soinc.org/food-science-b' },
    {
      title: 'U.S. FDA: Nutrition Facts label',
      url: 'https://www.fda.gov/food/nutrition-facts-label/how-understand-and-use-nutrition-facts-label',
    },
    {
      title: 'OpenStax Biology 2e: Biological macromolecules',
      url: 'https://openstax.org/books/biology-2e/pages/3-introduction',
    },
  ],
  chapters: [
    {
      ...c(
        'What milk is made of: sugars, fats, and proteins',
        [
          'Describe the composition of cow’s milk.',
          'Compare the structures of sugars, starches, fats, and proteins.',
          'Explain the roles of lactose, casein, and whey.',
        ],
        [
          [
            'Milk composition',
            'Cow’s milk is about 87% water. The rest is roughly 4.8% lactose, 3–4% fat, 3.3% protein, and 0.7% minerals, with vitamins in small amounts. Milk is an emulsion of fat droplets in water, a colloidal suspension of protein particles, and a true solution of lactose and salts all at once. The proportions change with breed, feed, and processing; whole milk in stores is standardized to about 3.25% fat.',
          ],
          [
            'Carbohydrates',
            'Carbohydrates contain carbon, hydrogen, and oxygen, usually in a 1 : 2 : 1 ratio. Monosaccharides such as glucose and galactose are single sugar units, often drawn as rings. Disaccharides join two units: lactose, the sugar in milk, is glucose plus galactose joined by a glycosidic bond. Polysaccharides such as starch are long chains of glucose. Milk has no starch, though some dairy products add it as a thickener.',
          ],
          [
            'Lipids',
            'Milk fat is mostly triglycerides: one glycerol molecule bonded to three fatty acids by ester bonds. Fatty acids are long hydrocarbon chains with a carboxyl group. Milk fat also contains phospholipids, which form the membranes around fat globules, and cholesterol. Fats are insoluble in water because their long hydrocarbon chains are nonpolar, so milk fat exists as tiny globules dispersed in the watery phase.',
          ],
          [
            'Proteins',
            'Proteins are chains of amino acids linked by peptide bonds. Each amino acid has an amino group, a carboxyl group, and a side chain. Milk proteins fall into two groups. Casein, about 80% of milk protein, forms clusters called micelles that scatter light and help make milk white. Whey proteins, about 20%, such as β-lactoglobulin and α-lactalbumin, stay dissolved in the liquid.',
          ],
          [
            'Casein and whey behave differently',
            'Casein micelles are stable at milk’s normal pH of about 6.7 but clump together when the pH drops to about 4.6, their isoelectric point, which is the basis of curd formation. Whey proteins stay soluble when acid is added but unfold and clump when heated strongly, which is why heated milk can form a skin. When cheese is made, casein forms the curd, and whey proteins and lactose drain off in the liquid whey.',
          ],
          [
            'Minerals and vitamins in milk',
            'Milk is a major source of calcium and phosphorus, much of it bound in casein micelles. It also provides potassium, riboflavin (vitamin B₂), vitamin B₁₂, and vitamin A. In the United States, milk is usually fortified with vitamin D, which helps the body absorb calcium. Fat-soluble vitamins A and D are removed with the fat in skim milk, so reduced-fat milks are fortified to restore them.',
          ],
        ],
        [
          ['Lactose', 'Milk sugar: a disaccharide of glucose and galactose.'],
          ['Triglyceride', 'Glycerol bonded to three fatty acids.'],
          ['Casein', 'Main milk protein, forming micelles.'],
          ['Whey proteins', 'Milk proteins that stay dissolved when casein curdles.'],
          ['Emulsion', 'A mixture of tiny droplets of one liquid in another.'],
          ['Isoelectric point', 'pH at which a protein has no net charge and clumps most.'],
        ],
        [
          'A 250 mL glass of whole milk weighs about 258 g. Using 3.3% protein and 4.8% lactose by mass, estimate the grams of protein and lactose.',
          [
            'Protein: 0.033 × 258 g ≈ 8.5 g.',
            'Lactose: 0.048 × 258 g ≈ 12.4 g.',
            'These match typical labels (about 8 g protein and 12 g sugar per cup).',
          ],
          'About 8.5 g of protein and 12.4 g of lactose per glass.',
        ],
        [
          [
            'Lactose is made of which two sugars?',
            'Glucose and galactose',
            ['Glucose and fructose', 'Two glucose units', 'Galactose and fructose'],
            'Lactose is a disaccharide of glucose and galactose.',
          ],
          [
            'About what percentage of milk protein is casein?',
            '80%',
            ['20%', '50%', '5%'],
            'Casein dominates; whey proteins make up about 20%.',
          ],
          [
            'A triglyceride contains glycerol and:',
            'Three fatty acids',
            ['Three amino acids', 'Two glucose units', 'One phosphate and one sugar'],
            'Three fatty acids attach by ester bonds.',
          ],
        ],
        [
          [
            'Explain why milk is called an emulsion and a colloid.',
            'Fat exists as tiny droplets dispersed in water (an emulsion), and casein micelles are particles suspended in the liquid (a colloid).',
          ],
          [
            'Why are fats insoluble in water?',
            'Their long hydrocarbon chains are nonpolar, so they cannot form favorable interactions with polar water molecules.',
          ],
          [
            'Compare how casein and whey proteins respond to acid.',
            'Casein clumps at about pH 4.6 to form curds. Whey proteins stay dissolved and drain away in the whey.',
          ],
          [
            'Why is skim milk fortified with vitamin A?',
            'Vitamin A is fat-soluble, so most of it is removed with the fat; fortification restores it.',
          ],
        ],
        [
          ['Water phase', 'Lactose, minerals, and whey proteins dissolve.'],
          ['Colloid', 'Casein micelles stay suspended.'],
          ['Emulsion', 'Fat globules disperse as droplets.'],
        ],
        [
          ['Carbohydrate', 'Lactose for energy', 'Some people cannot digest it.'],
          ['Lipid', 'Triglycerides in globules', 'Energy-dense: 9 kcal/g.'],
          ['Protein', 'Casein and whey', 'Casein curdles in acid; whey with heat.'],
        ],
        'Classify each milk component by molecule type before checking the evidence.',
        'Milk is three mixtures in one: a solution, a colloid, and an emulsion.',
      ),
      investigation: evidence(
        [
          ['Liquid A', 'Clear after acid is added and curds are removed.'],
          ['Test of A', 'Contains lactose and dissolved proteins.'],
          ['Solid B', 'White clumps that formed at pH 4.6.'],
        ],
        'Which statement is correct?',
        [
          'A is casein; B is whey',
          'A is whey; B is mostly casein',
          'Both are fat',
          'A is starch; B is lactose',
        ],
        1,
        'Casein clumps at its isoelectric point to form curds, so B is mostly casein. Lactose and whey proteins stay in the liquid whey, A.',
      ),
    },
    {
      ...c(
        'Fats: saturation, esters, and emulsions',
        [
          'Distinguish saturated, unsaturated, and essential fats.',
          'Write the esterification that forms a triglyceride.',
          'Explain emulsification and how butter forms.',
        ],
        [
          [
            'Saturated and unsaturated fats',
            'A saturated fatty acid has only single carbon–carbon bonds, so every carbon holds as many hydrogens as possible. Its straight chains pack tightly, so saturated fats such as butter are solid at room temperature. Unsaturated fatty acids have one (monounsaturated) or more (polyunsaturated) double bonds. Cis double bonds put kinks in the chain, so the fats pack loosely and are liquid oils. About two-thirds of milk fat is saturated.',
          ],
          [
            'Essential fats and trans fats',
            'Essential fatty acids, such as linoleic acid (an omega-6) and alpha-linolenic acid (an omega-3), cannot be made by the body and must come from food. Trans fats have double bonds arranged so the chain stays straight; most come from partially hydrogenated oils and raise heart disease risk. Dairy fat naturally contains small amounts of trans fats from bacteria in cows’ stomachs, which are thought to be less harmful.',
          ],
          [
            'Esterification',
            'An ester forms when a carboxylic acid reacts with an alcohol and releases water. Forming a triglyceride is esterification three times: glycerol, which has three –OH groups, reacts with three fatty acids, producing one triglyceride and three water molecules. The reverse reaction, hydrolysis, breaks ester bonds by adding water; enzymes called lipases do this during digestion, and in milk can release fatty acids that cause rancid flavors.',
          ],
          [
            'Emulsions and emulsifiers',
            'An emulsion is a stable mixture of tiny droplets of one liquid in another that would otherwise separate. Milk is an oil-in-water emulsion. Emulsifiers have a water-loving (hydrophilic) end and a fat-loving (hydrophobic) end, so they sit at the droplet surface and stop droplets from merging. In milk, membrane phospholipids and proteins coat fat globules. Homogenization breaks globules into smaller ones so cream does not rise.',
          ],
          [
            'Making butter',
            'Butter forms by churning cream. Shaking at a cool temperature, about 13 °C as the rules specify, damages the membranes around partly solid fat globules. The exposed fat sticks together, first trapping air as whipped cream, then clumping into butter grains. The emulsion inverts: cream is oil-in-water, while butter is water-in-oil, about 80% fat. The liquid left is buttermilk, which is drained off before weighing.',
          ],
          [
            'Why temperature matters for butter',
            'Temperature controls the ratio of solid to liquid fat in each globule. If cream is too cold, fat is too solid and globules do not stick, so churning takes a long time. If it is too warm, fat is too liquid, butter becomes greasy, and more fat is lost in the buttermilk. At about 13 °C, partly crystallized globules clump efficiently. Milk fat mass equals the mass of butter collected, compared with the supervisor’s value.',
          ],
        ],
        [
          ['Saturated fat', 'Fatty acids with only single C–C bonds.'],
          ['Unsaturated fat', 'Fatty acids with one or more C=C double bonds.'],
          ['Esterification', 'Acid + alcohol → ester + water.'],
          ['Hydrolysis', 'Breaking a bond by adding water.'],
          ['Emulsifier', 'Molecule that stabilizes droplets at an oil–water surface.'],
          ['Phase inversion', 'Change from oil-in-water to water-in-oil, as in butter.'],
        ],
        [
          'A team churns 150 mL of cream (mass 148 g) and collects 52 g of butter. If butter is about 80% fat, estimate the cream’s fat percentage.',
          [
            'Milk fat in butter ≈ 0.80 × 52 g ≈ 41.6 g.',
            'Fat percentage of cream ≈ 41.6 g ÷ 148 g ≈ 0.28.',
            'This is about 28% fat, a bit below typical heavy cream (about 36%).',
          ],
          'About 28% fat captured; some fat probably stayed in the buttermilk.',
        ],
        [
          [
            'Why are saturated fats usually solid at room temperature?',
            'Straight chains pack tightly together',
            ['They contain double bonds', 'They are water-soluble', 'They have fewer carbons'],
            'Without kinks, the chains pack closely, raising the melting point.',
          ],
          [
            'Forming one triglyceride releases how many water molecules?',
            'Three',
            ['One', 'Two', 'None'],
            'Each of the three ester bonds releases one water molecule.',
          ],
          [
            'Butter is an example of which kind of emulsion?',
            'Water-in-oil',
            ['Oil-in-water', 'Air-in-water', 'Not an emulsion'],
            'Churning inverts cream’s oil-in-water emulsion.',
          ],
        ],
        [
          [
            'Explain how an emulsifier stabilizes an emulsion.',
            'Its hydrophobic end dissolves in the fat droplet and its hydrophilic end faces the water, forming a coating that keeps droplets from merging.',
          ],
          [
            'Why must cream be near 13 °C for efficient churning?',
            'At that temperature, fat globules are partly solid and partly liquid, so they stick and clump well; too cold or too warm reduces efficiency.',
          ],
          [
            'What is an essential fatty acid?',
            'One the body cannot make, such as linoleic or alpha-linolenic acid, so it must come from food.',
          ],
          [
            'How does homogenization change milk?',
            'It breaks fat globules into much smaller ones, which stay dispersed instead of rising as a cream layer.',
          ],
        ],
        [
          ['Agitate', 'Churning damages fat globule membranes.'],
          ['Clump', 'Exposed fat sticks together into grains.'],
          ['Separate', 'Butter is removed; buttermilk drains.'],
        ],
        [
          ['Saturated fat', 'Straight chains; solid', 'Raises LDL cholesterol in excess.'],
          ['Unsaturated fat', 'Kinked chains; liquid', 'Can oxidize and turn rancid.'],
          ['Emulsifier', 'Stabilizes droplets', 'Too little lets phases separate.'],
        ],
        'Predict how cream temperature changes butter yield, then check the evidence.',
        'Butter forms when fat globules lose their coating and stick together.',
      ),
      investigation: evidence(
        [
          ['Trial 1', 'Cream at 4 °C: no butter after 15 minutes of shaking.'],
          ['Trial 2', 'Cream at 13 °C: butter formed in 8 minutes.'],
          ['Trial 3', 'Cream at 25 °C: soft, greasy butter; cloudy buttermilk.'],
        ],
        'What best explains the results?',
        [
          'Temperature has no effect',
          'Partly solid fat at 13 °C clumps best',
          'Colder cream always churns faster',
          'Warm cream gives the most butter',
        ],
        1,
        'At 4 °C the fat is too solid; at 25 °C it is too liquid and fat is lost to buttermilk. Near 13 °C, partly solid globules clump efficiently.',
      ),
    },
    {
      ...c(
        'Proteins and curds',
        [
          'Explain how acid makes casein form curds.',
          'Calculate percent curd from lab data.',
          'Identify variables that change curd yield.',
        ],
        [
          [
            'Casein micelles',
            'Casein micelles are clusters of thousands of casein proteins held together partly by calcium phosphate. Their surfaces carry a negative charge and a hairy layer of κ-casein, which keeps micelles apart in fresh milk. Because the micelles repel each other, milk stays smooth. Anything that removes their charge or hairy layer, such as acid or the enzyme rennet used in cheesemaking, lets them stick together.',
          ],
          [
            'Acid coagulation',
            'Adding vinegar (acetic acid) or lemon juice (citric acid) lowers milk’s pH from about 6.7. As hydrogen ions accumulate, they neutralize the micelles’ negative charges and dissolve the calcium phosphate holding them together. Near pH 4.6, the isoelectric point of casein, the micelles have no net charge, stop repelling each other, and clump into a soft solid called curd. The remaining liquid is whey.',
          ],
          [
            'The curd lab procedure',
            'The rules’ procedure measures 120 mL of milk, weighs it, and keeps it near room temperature. Drops of vinegar or lemon juice are added with gentle swirling for 30 seconds, then the milk sits about 5 minutes. The mixture is drained through cheesecloth for 15 minutes, and the curds are weighed. Teams aim to match the supervisor’s percentage, so consistent technique matters more than maximum yield.',
          ],
          [
            'Calculating percent curd',
            'Percent curd equals curd mass divided by milk mass, times 100. If 124 g of milk gives 18.6 g of curd, the percentage is 18.6 ÷ 124 × 100 = 15%. Record masses to the balance’s precision, subtract the mass of any container (tare), and use the same drain time each trial. Curd still holds water, so its mass is more than the casein alone.',
          ],
          [
            'Variables that change yield',
            'Many variables affect curd mass. Milk type matters: whole milk traps fat in the curd and gives more mass than skim. Temperature matters: warmer milk curdles faster and firmer. The amount and type of acid change pH; too little acid leaves casein in solution. Stirring too hard breaks curds into fine pieces that pass through the cloth. Drain time and how much the curd is squeezed change how much water remains.',
          ],
          [
            'Heat and proteins',
            'Heat denatures proteins by breaking the weak bonds that hold their folded shape. Whey proteins denature above about 70 °C and can then join the curd, increasing yield, as in ricotta made from heated whey. Heating milk also forms a skin of denatured protein and fat on the surface. Casein is heat-stable at normal pH, which is why milk can be boiled without curdling unless it has become acidic.',
          ],
        ],
        [
          ['Micelle', 'Cluster of casein proteins held by calcium phosphate.'],
          ['Coagulation', 'Clumping of proteins into a solid curd.'],
          ['Curd', 'Solid formed from clumped casein, fat, and trapped water.'],
          ['Whey', 'Liquid left after curd forms.'],
          ['Denaturation', 'Loss of a protein’s folded shape.'],
          ['Tare', 'Zeroing a balance to remove container mass.'],
        ],
        [
          'Milk in a beaker has mass 245.0 g; the empty beaker is 120.8 g. After curdling and draining, the curds on a 3.2 g cheesecloth weigh 22.0 g together. Find percent curd.',
          [
            'Milk mass = 245.0 − 120.8 = 124.2 g.',
            'Curd mass = 22.0 − 3.2 = 18.8 g.',
            'Percent curd = 18.8 ÷ 124.2 × 100 ≈ 15.1%.',
          ],
          'The curd yield is about 15.1% of the milk’s mass.',
        ],
        [
          [
            'Casein clumps most at about which pH?',
            '4.6',
            ['6.7', '7.4', '9.0'],
            'This is casein’s isoelectric point.',
          ],
          [
            'Which milk would likely give the greatest curd mass?',
            'Whole milk',
            ['Skim milk', 'Lactose-free skim milk', 'Water'],
            'Fat trapped in the curd adds mass.',
          ],
          [
            'Why can boiling fresh milk not cause curdling by itself?',
            'Casein is heat-stable at normal pH',
            [
              'Whey proteins cannot denature',
              'Boiling raises pH to 10',
              'Lactose prevents clumping',
            ],
            'Casein curdles from acid or rennet, not heat alone at pH 6.7.',
          ],
        ],
        [
          [
            'Explain how acid causes casein micelles to clump.',
            'Hydrogen ions neutralize negative charges and dissolve calcium phosphate. Near pH 4.6 micelles lose their repulsion and stick together.',
          ],
          [
            'Why should drain time be the same in every trial?',
            'Curds keep losing water as they drain, so different drain times change the measured mass and make trials incomparable.',
          ],
          [
            'Identify one independent variable you could test in the curd task.',
            'Volume of vinegar added, with milk type, temperature, and drain time held constant.',
          ],
          [
            'Why might squeezing the cheesecloth lower percent curd?',
            'Squeezing removes extra trapped water, lowering curd mass.',
          ],
        ],
        [
          ['Acidify', 'Vinegar or lemon juice lowers pH.'],
          ['Coagulate', 'Casein clumps near pH 4.6.'],
          ['Drain', 'Whey passes through cloth; curd is weighed.'],
        ],
        [
          ['Acid coagulation', 'Low pH clumps casein', 'Gives soft, crumbly curds.'],
          ['Rennet coagulation', 'Enzyme cuts κ-casein', 'Used for most cheeses, not this lab.'],
          ['Heat denaturation', 'Unfolds whey proteins', 'Requires high temperature.'],
        ],
        'Compute percent curd from the masses, then decide which variable changed.',
        'Percent curd compares curd to milk mass; control drain time and acid amount.',
      ),
      investigation: evidence(
        [
          ['Trial A', 'Whole milk, 2 mL vinegar: 15% curd.'],
          ['Trial B', 'Skim milk, 2 mL vinegar: 11% curd.'],
          ['Trial C', 'Whole milk, 0.2 mL vinegar: 3% curd, cloudy whey.'],
        ],
        'Which conclusion is supported?',
        [
          'Fat and enough acid both raise curd mass',
          'Acid amount has no effect',
          'Skim milk always gives more curd',
          'Vinegar removes fat',
        ],
        0,
        'Whole milk beats skim at the same acid (fat adds mass), and too little acid leaves casein dissolved, so whey stays cloudy and yield falls.',
      ),
    },
    {
      ...c(
        'Freezing point depression and ice cream',
        [
          'Explain freezing point depression and why salt is added to ice.',
          'Calculate freezing point changes with ΔT = i·Kf·m.',
          'Describe the structure of ice cream and what makes it stand.',
        ],
        [
          [
            'Freezing point depression',
            'Dissolving particles in a liquid lowers its freezing point. Solute particles interfere with water molecules joining the ice crystal, so a lower temperature is needed to freeze. The effect depends on the number of dissolved particles, not their type, which makes it a colligative property. ΔTf = i × Kf × m, where Kf for water is 1.86 °C·kg/mol, m is molality (moles of solute per kilogram of water), and i is the number of particles each formula unit makes.',
          ],
          [
            'Salt and ice',
            'Ice alone in a bag sits near 0 °C. Adding salt dissolves into the thin layer of meltwater, lowering its freezing point, so more ice melts. Melting absorbs heat (latent heat of fusion) from the surroundings, so the mixture cools well below 0 °C, as low as about −10 to −20 °C. NaCl dissociates into Na⁺ and Cl⁻, so i ≈ 2 and each mole of salt is twice as effective as a mole of sugar.',
          ],
          [
            'The ice cream lab',
            'In the rules’ procedure, up to 125 mL of milk, cream, or half-and-half is mixed with up to 15 mL of sugar and up to 1.2 mL of vanilla in a pint bag. A gallon bag is half-filled with ice and up to 90 mL of salt and shaken, then the small bag is placed inside and shaken vigorously for 5–10 minutes. The finished ice cream is shaped by hand and must stand on its own for 5 seconds before its height is measured.',
          ],
          [
            'What ice cream is made of',
            'Ice cream is a complex mixture: ice crystals, fat globules, air bubbles, and a concentrated sugar solution that stays unfrozen. Sugar in the mix lowers its freezing point, which keeps ice cream scoopable but means it needs a very cold bath. Fat globules partly cluster around air bubbles and stabilize them, much as in whipped cream. The volume added by air is called overrun.',
          ],
          [
            'Getting a tall, firm scoop',
            'Height depends on stiffness. More fat, such as cream instead of milk, gives a firmer structure that holds its shape. Less sugar raises the freezing point of the mix, so more water freezes and the product is firmer, though harder. Colder baths, with more salt, freeze faster, forming smaller ice crystals and a smoother texture. Vigorous shaking incorporates air and keeps crystals small. Each change is a possible variable for notebook experiments.',
          ],
          [
            'Ice crystals and texture',
            'Fast freezing produces many small ice crystals, giving smooth ice cream. Slow freezing, or melting and refreezing, lets large crystals grow, giving an icy, grainy texture. That is why ice cream stored at changing temperatures becomes icy. Stabilizers such as gums and proteins limit crystal growth. In the lab, keep the bag in contact with the salted ice and shake continuously for the fastest freezing.',
          ],
        ],
        [
          [
            'Colligative property',
            'Depends on the number of solute particles, not their identity.',
          ],
          ['Molality', 'Moles of solute per kilogram of solvent.'],
          ['Van ’t Hoff factor (i)', 'Number of particles each formula unit forms in solution.'],
          ['Latent heat of fusion', 'Heat absorbed when a solid melts.'],
          ['Overrun', 'Increase in volume from air whipped into ice cream.'],
          ['Stabilizer', 'Ingredient that limits ice crystal growth.'],
        ],
        [
          'Estimate the freezing point of meltwater in which 2.0 mol of NaCl dissolves per kilogram of water.',
          [
            'NaCl gives Na⁺ and Cl⁻, so i = 2.',
            'ΔTf = i × Kf × m = 2 × 1.86 × 2.0 = 7.44 °C.',
            'New freezing point ≈ 0 − 7.44 = −7.4 °C.',
          ],
          'About −7.4 °C, cold enough to freeze the sugary ice cream mix.',
        ],
        [
          [
            'Why does adding salt make an ice bath colder?',
            'Salt lowers the freezing point, so more ice melts and absorbs heat',
            [
              'Salt releases cold energy',
              'Salt reacts with ice to form a cold gas',
              'Salt raises the melting point',
            ],
            'Melting absorbs latent heat from the surroundings.',
          ],
          [
            'Which solute lowers freezing point more per mole?',
            'NaCl',
            ['Sugar (sucrose)', 'They are equal', 'Neither'],
            'NaCl gives two particles per formula unit; sucrose gives one.',
          ],
          [
            'Faster freezing of ice cream gives:',
            'Smaller ice crystals and a smoother texture',
            ['Larger ice crystals', 'No ice crystals', 'More lactose crystals only'],
            'Fast freezing forms many small crystals.',
          ],
        ],
        [
          [
            'Explain why freezing point depression is called a colligative property.',
            'It depends only on the number of dissolved particles, not on what the particles are.',
          ],
          [
            'Give two ways to make ice cream stand taller in the lab.',
            'Use cream with more fat for a firmer structure, and freeze faster in a colder salt–ice bath with vigorous shaking.',
          ],
          [
            'Why does ice cream become icy after melting and refreezing?',
            'Small crystals melt and the water refreezes onto larger crystals, which grow and make the texture grainy.',
          ],
          [
            'Calculate the freezing point depression from 1.0 mol of sucrose in 1 kg of water.',
            'i = 1, so ΔTf = 1 × 1.86 × 1.0 = 1.86 °C; the freezing point is about −1.9 °C.',
          ],
        ],
        [
          ['Dissolve', 'Salt dissolves in meltwater.'],
          ['Melt', 'Lower freezing point lets more ice melt, absorbing heat.'],
          ['Freeze', 'The colder bath freezes the sugary mix.'],
        ],
        [
          [
            'Salt in ice',
            'Lowers freezing point; bath gets colder',
            'Too little salt freezes slowly.',
          ],
          ['Sugar in mix', 'Keeps ice cream soft', 'Too much prevents firm freezing.'],
          ['Cream vs. milk', 'More fat, firmer structure', 'Richer and harder to shake.'],
        ],
        'Predict how salt and fat change ice cream height before checking the trials.',
        'More dissolved particles lower the freezing point; fast freezing and fat give a taller, smoother scoop.',
      ),
      investigation: evidence(
        [
          ['Trial 1', 'Milk, 30 mL salt: soft slush, 2 cm tall.'],
          ['Trial 2', 'Milk, 90 mL salt: firmer, 4 cm tall.'],
          ['Trial 3', 'Cream, 90 mL salt: firm and smooth, 7 cm tall.'],
        ],
        'Which conclusion is best supported?',
        [
          'Salt only matters',
          'More salt and more fat both increase height',
          'Fat lowers height',
          'Neither variable matters',
        ],
        1,
        'Trials 1→2 show more salt freezes better. Trials 2→3 change only milk to cream, and the taller result shows fat adds firmness.',
      ),
    },
    {
      ...c(
        'Processing, cooking, and preservation',
        [
          'Explain pasteurization, homogenization, and drying.',
          'Describe how cooking changes dairy foods chemically.',
          'Explain fermentation, probiotics, and organic dairy.',
        ],
        [
          [
            'Pasteurization',
            'Pasteurization heats milk enough to kill disease-causing microbes and reduce spoilage organisms, without sterilizing it. High-temperature, short-time (HTST) pasteurization holds milk at 72 °C for 15 seconds, the most common method. Vat pasteurization uses 63 °C for 30 minutes. Ultra-high-temperature (UHT) processing heats to about 135–150 °C for a few seconds; packaged aseptically, UHT milk can be stored unrefrigerated for months until opened.',
          ],
          [
            'Homogenization and standardization',
            'Raw milk separates as cream rises because fat globules are lighter than water. Homogenization forces milk through tiny openings at high pressure, breaking globules into much smaller ones that stay suspended. Standardization adjusts fat content by separating cream and adding it back to reach whole (about 3.25%), reduced-fat (2%), low-fat (1%), or fat-free milk. Homogenization does not affect safety; pasteurization does.',
          ],
          [
            'Preservation methods',
            'Dairy foods are preserved by slowing microbes and enzymes. Refrigeration slows growth. Drying makes powdered milk, removing the water microbes need. Concentration makes evaporated and sweetened condensed milk, where high sugar ties up water. Fermentation lowers pH so harmful microbes cannot grow. Salting and aging preserve cheeses. Packaging that blocks light protects riboflavin and prevents off-flavors.',
          ],
          [
            'How cooking changes dairy',
            'Heat changes dairy chemically. Whey proteins denature and, with fat, form a skin on heated milk. The Maillard reaction between sugars like lactose and amino acids creates brown color and toasty flavors, as in dulce de leche or a browned cheese crust. Caramelization breaks down sugars at higher temperatures. Heat can cause curdling in acidic mixtures. Overheating cheese makes fat separate and proteins tighten into a rubbery mass.',
          ],
          [
            'Fermentation and probiotics',
            'Fermented dairy uses bacteria to convert lactose to lactic acid. In yogurt, Lactobacillus bulgaricus and Streptococcus thermophilus lower the pH, so casein gels into a thick product. Cheese uses bacteria and often rennet. Probiotics are live microbes that, eaten in adequate amounts, may benefit health, such as by supporting gut bacteria. Fermentation also reduces lactose, so many lactose-intolerant people tolerate yogurt and aged cheeses.',
          ],
          [
            'Organic dairy',
            'In the United States, USDA organic dairy must come from cows that graze on pasture for at least 120 days per year, eat organic feed grown without most synthetic pesticides, and are not given synthetic growth hormones or antibiotics. Organic milk is pasteurized like conventional milk and is often UHT-processed for a longer shelf life. Its basic nutrient content is similar to conventional milk, though some studies report more omega-3 fats from grass feeding.',
          ],
        ],
        [
          ['Pasteurization', 'Heat treatment that kills harmful microbes.'],
          ['UHT', 'Ultra-high-temperature processing for long shelf life.'],
          ['Homogenization', 'Breaking fat globules so cream does not rise.'],
          ['Maillard reaction', 'Browning reaction between sugars and amino acids.'],
          ['Fermentation', 'Microbial conversion of sugars to acids or other products.'],
          ['Probiotic', 'Live microbe that may benefit health when eaten.'],
        ],
        [
          'A dairy heats milk to 72 °C for 15 seconds, homogenizes it, and stores it at 4 °C. Another heats to 140 °C for 3 seconds and packages it in sterile cartons. Compare the products.',
          [
            'The first is HTST pasteurized milk, which must be refrigerated.',
            'The second is UHT milk with aseptic packaging.',
            'UHT milk can be stored unopened at room temperature for months but may taste slightly cooked.',
          ],
          'Both are safe; UHT milk keeps much longer unopened but has more heat-related flavor changes.',
        ],
        [
          [
            'HTST pasteurization uses:',
            '72 °C for 15 seconds',
            ['63 °C for 15 seconds', '100 °C for 1 hour', '140 °C for 30 minutes'],
            'High temperature, short time.',
          ],
          [
            'Which reaction gives browned, toasty flavors in heated dairy?',
            'The Maillard reaction',
            ['Esterification', 'Hydrolysis of lactose', 'Freezing point depression'],
            'Sugars and amino acids react when heated.',
          ],
          [
            'Why does yogurt thicken?',
            'Lactic acid lowers pH and casein gels',
            ['Fat crystallizes', 'Sugar is added', 'Water evaporates'],
            'Acid from bacteria causes casein to coagulate into a gel.',
          ],
        ],
        [
          [
            'Explain the difference between pasteurization and homogenization.',
            'Pasteurization uses heat to kill microbes for safety. Homogenization breaks fat globules so cream stays mixed; it does not affect safety.',
          ],
          [
            'Why can many lactose-intolerant people eat yogurt?',
            'Bacteria convert much of the lactose to lactic acid during fermentation, and live cultures may help digest the rest.',
          ],
          [
            'How does drying preserve milk?',
            'Removing water stops microbes from growing, since they need water for their activity.',
          ],
          [
            'Name two requirements for USDA organic dairy.',
            'Cows must graze pasture at least 120 days per year and receive no synthetic growth hormones or antibiotics, with organic feed.',
          ],
        ],
        [
          ['Heat', 'Pasteurize to kill harmful microbes.'],
          ['Process', 'Homogenize and standardize fat.'],
          ['Preserve', 'Chill, dry, ferment, or package.'],
        ],
        [
          ['HTST', '72 °C, 15 s', 'Requires refrigeration.'],
          ['UHT', '135–150 °C, seconds', 'Slight cooked flavor.'],
          ['Fermentation', 'Lactic acid preserves', 'Changes texture and taste.'],
        ],
        'Match each processing step to the problem it solves.',
        'Each process targets microbes, fat separation, or water; know which one does what.',
      ),
      investigation: evidence(
        [
          ['Sample X', 'Raw milk left at room temperature for 2 days: sour smell, clumps.'],
          ['Sample Y', 'HTST milk, refrigerated 2 days: fresh.'],
          ['Sample Z', 'Unopened UHT carton at room temperature, 2 months: fresh.'],
        ],
        'Which explanation fits?',
        [
          'Heat treatment and storage control microbial growth',
          'All milk spoils at the same rate',
          'UHT milk contains preservatives only',
          'Refrigeration kills all microbes',
        ],
        0,
        'Raw milk soured as bacteria made lactic acid. Pasteurization plus chilling slowed spoilage, and UHT with sterile packaging kept milk fresh without refrigeration.',
      ),
    },
    {
      ...c(
        'Nutrition and food labels',
        [
          'Identify key vitamins and minerals in dairy and deficiency effects.',
          'Read a Nutrition Facts label and percent Daily Value.',
          'Explain labeling rules for fat content and allergens.',
        ],
        [
          [
            'Calcium and vitamin D',
            'Calcium builds bones and teeth and is needed for muscle contraction, nerve signals, and blood clotting. Vitamin D helps the intestine absorb calcium. Too little over time causes rickets in children, with soft, bent bones, and osteomalacia or osteoporosis in adults, where bones become weak and break easily. Teens need about 1,300 mg of calcium daily, more than adults, because bones are growing fastest.',
          ],
          [
            'Other nutrients in dairy',
            'Milk supplies riboflavin (vitamin B₂), important for energy metabolism; deficiency causes cracked lips and sore throat. Vitamin B₁₂ is needed for red blood cells and nerves; deficiency causes anemia. Vitamin A supports vision; deficiency causes night blindness. Phosphorus works with calcium in bones, and potassium helps regulate blood pressure. Dairy protein provides all essential amino acids, making it a complete protein.',
          ],
          [
            'RDA and Daily Values',
            'The Recommended Dietary Allowance (RDA) is the daily intake that meets the needs of nearly all healthy people in an age and sex group. Labels use a single Daily Value (DV) for each nutrient. Percent DV shows how much one serving contributes to a 2,000-calorie diet: 5% DV or less is low, and 20% DV or more is high. A cup of milk provides about 20–25% DV for calcium.',
          ],
          [
            'Reading the label',
            'The Nutrition Facts label lists serving size first; all numbers are per serving. It then lists calories, total fat with saturated and trans fat, cholesterol, sodium, total carbohydrate with dietary fiber, total sugars, and added sugars, then protein. Required nutrients include vitamin D, calcium, iron, and potassium. Plain milk lists sugars from lactose but zero added sugars, while chocolate milk lists added sugars.',
          ],
          [
            'Fat-content claims',
            'U.S. labeling rules define milk names. Whole milk contains at least 3.25% milk fat. Reduced-fat milk (2%) has at least 25% less fat than whole milk. Low-fat milk is 1% fat. Fat-free, skim, or nonfat milk has less than 0.5 grams of fat per serving. All types have similar protein, calcium, and lactose; they differ mainly in fat and calories, and lower-fat milks are fortified with vitamins A and D.',
          ],
          [
            'Allergen labeling',
            'Milk is one of the major food allergens that U.S. law requires to be declared on packaged food labels, either in the ingredient list or in a “Contains: Milk” statement. Ingredients such as casein, whey, and lactose come from milk and must be identified. Labels like “may contain milk” are voluntary advisory statements about possible cross-contact. Reading the full label is essential for people with milk allergy.',
          ],
        ],
        [
          ['RDA', 'Daily nutrient intake meeting nearly all healthy people’s needs.'],
          ['Daily Value (%DV)', 'Share of a reference daily amount in one serving.'],
          ['Fortification', 'Adding nutrients not originally present, like vitamin D.'],
          ['Rickets', 'Bone softening in children from vitamin D or calcium deficiency.'],
          ['Complete protein', 'A protein supplying all essential amino acids.'],
          ['Major allergen', 'Food that must be declared on labels, including milk.'],
        ],
        [
          'A label lists 300 mg of calcium per serving and a Daily Value of 1,300 mg. A student drinks 3 servings. What percent DV is that, and is one serving “high”?',
          [
            'One serving: 300 ÷ 1,300 × 100 ≈ 23% DV.',
            'Three servings: about 69% DV, or 900 mg.',
            '20% DV or more counts as high.',
          ],
          'Each serving is high in calcium (about 23% DV), and three servings provide about 69% DV.',
        ],
        [
          [
            'Which vitamin helps the body absorb calcium?',
            'Vitamin D',
            ['Vitamin C', 'Vitamin K only', 'Riboflavin'],
            'Vitamin D increases calcium absorption.',
          ],
          [
            'On a label, 25% DV of a nutrient is considered:',
            'High',
            ['Low', 'Moderate only', 'Not meaningful'],
            '20% DV or more is high.',
          ],
          [
            'Fat-free milk has less than how much fat per serving?',
            '0.5 g',
            ['5 g', '1 g', '3.25 g'],
            'This is the U.S. definition for fat-free claims.',
          ],
        ],
        [
          [
            'Explain why reduced-fat milks are fortified with vitamin A.',
            'Vitamin A is fat-soluble, so it is removed along with the fat and added back to restore the nutrient.',
          ],
          [
            'Describe one consequence of long-term calcium deficiency.',
            'Weak, brittle bones (osteoporosis in adults), raising fracture risk.',
          ],
          [
            'How does plain milk show sugar on its label?',
            'It lists total sugars from naturally present lactose, but zero grams of added sugars.',
          ],
          [
            'Why must ingredients like whey and casein be identified on labels?',
            'They come from milk, a major allergen, and can cause reactions in people with milk allergy.',
          ],
        ],
        [
          ['Serving', 'All label values are per serving.'],
          ['Percent DV', 'Compare each nutrient to 5% (low) and 20% (high).'],
          ['Claims', 'Fat and allergen statements follow legal definitions.'],
        ],
        [
          ['Whole milk', '≥3.25% fat', 'Most calories.'],
          ['Low-fat (1%)', '1% fat', 'Similar calcium and protein.'],
          ['Fat-free', '<0.5 g fat/serving', 'Fortified with vitamins A and D.'],
        ],
        'Use the label numbers to judge which milk meets each goal.',
        'Read serving size first; compare nutrients with percent Daily Value.',
      ),
      investigation: evidence(
        [
          ['Milk A', '8 g fat, 12 g total sugars, 0 g added sugars, 25% DV calcium.'],
          ['Milk B', '0 g fat, 12 g total sugars, 0 g added sugars, 25% DV calcium.'],
          ['Milk C', '5 g fat, 24 g total sugars, 12 g added sugars, 25% DV calcium.'],
        ],
        'Which is fat-free, plain milk?',
        ['Milk A', 'Milk B', 'Milk C', 'None'],
        1,
        'Milk B has 0 g fat and only natural lactose (no added sugars). Milk A is whole milk; milk C has added sugar, like chocolate milk.',
      ),
    },
    {
      ...c(
        'Lactose intolerance, allergies, alternatives, and the notebook',
        [
          'Distinguish lactose intolerance from milk allergy.',
          'Compare lactose-free and non-dairy “milk” products.',
          'Design notebook experiments with one independent variable.',
        ],
        [
          [
            'Lactose intolerance',
            'Digesting lactose requires the enzyme lactase, made by cells lining the small intestine, which splits lactose into glucose and galactose. Many people make less lactase after childhood. Undigested lactose reaches the large intestine, where bacteria ferment it into gases and acids, causing bloating, cramps, and diarrhea. Lactose intolerance is a digestive problem, not an immune reaction, and many people tolerate small amounts.',
          ],
          [
            'Milk allergy',
            'A milk allergy is an immune system reaction to milk proteins, usually casein or whey proteins such as β-lactoglobulin. Symptoms can include hives, vomiting, wheezing, and, in severe cases, anaphylaxis, a life-threatening reaction. It is most common in young children, many of whom outgrow it. Unlike intolerance, even tiny amounts can trigger a reaction, so lactose-free milk is not safe for people with milk allergy, since it still contains milk proteins.',
          ],
          [
            'Lactose-free milk',
            'Lactose-free milk is regular milk with lactase enzyme added, which breaks lactose into glucose and galactose before you drink it. It has the same protein, calcium, and fat as regular milk. It tastes slightly sweeter, because glucose and galactose together taste sweeter than lactose, even though no sugar is added. Ultra-filtration can also remove some lactose and concentrate protein.',
          ],
          [
            'Non-dairy “milk” products',
            'Plant-based drinks are made from soy, almonds, oats, rice, coconut, or peas. Soy milk has protein close to cow’s milk; almond and rice milks are much lower in protein. Most are fortified with calcium and vitamins D and B₁₂ to resemble dairy, but nutrients vary by brand. They contain no lactose or milk proteins, so they suit people with intolerance or allergy, although soy and tree nuts are allergens too.',
          ],
          [
            'Health benefits of dairy',
            'Dairy foods supply high-quality protein, calcium, vitamin D, and potassium, nutrients many people do not get enough of. Studies link dairy intake to better bone health in children and teens. Fermented dairy provides probiotics. Dietary guidelines recommend choosing low-fat or fat-free options to limit saturated fat. People who avoid dairy can meet needs with fortified alternatives and other foods such as leafy greens and canned fish with bones.',
          ],
          [
            'Designing notebook experiments',
            'Before the tournament, teams must do at least three experiments for each of the three lab tasks, recorded on the official experiment form, each with only one independent variable. Choose a variable you can control, such as amount of vinegar, cream temperature, or salt volume, and keep everything else constant. Run repeated trials, record data in tables with units, graph results, and state a conclusion supported by your data, including sources of error.',
          ],
        ],
        [
          ['Lactase', 'Enzyme that splits lactose into glucose and galactose.'],
          ['Lactose intolerance', 'Digestive discomfort from undigested lactose.'],
          ['Milk allergy', 'Immune reaction to milk proteins.'],
          ['Anaphylaxis', 'Severe, life-threatening allergic reaction.'],
          ['Independent variable', 'The one factor deliberately changed in an experiment.'],
          ['Controlled variable', 'A factor kept the same in every trial.'],
        ],
        [
          'A student plans to test how vinegar volume affects curd mass. Design one notebook experiment.',
          [
            'Independent variable: vinegar volume (1, 2, 3, and 4 mL).',
            'Controlled variables: 120 mL of the same milk, room temperature, 30 s swirling, 5 min rest, 15 min drain.',
            'Dependent variable: curd mass, converted to percent curd, with three trials per level.',
          ],
          'Plot percent curd against vinegar volume and conclude whether more acid increases yield, noting sources of error.',
        ],
        [
          [
            'Which product is safe for someone with lactose intolerance but NOT for someone with milk allergy?',
            'Lactose-free cow’s milk',
            ['Oat milk', 'Water', 'Rice milk'],
            'It still contains milk proteins, which trigger allergies.',
          ],
          [
            'Why does lactose-free milk taste sweeter?',
            'Lactose has been split into glucose and galactose',
            ['Sugar is added', 'Fat is removed', 'Protein is concentrated'],
            'The two monosaccharides taste sweeter than lactose.',
          ],
          [
            'Each notebook experiment must have:',
            'Only one independent variable',
            ['At least three independent variables', 'No controlled variables', 'Only one trial'],
            'The rules require a single independent variable per experiment.',
          ],
        ],
        [
          [
            'Explain the difference between lactose intolerance and a milk allergy.',
            'Intolerance is a digestive problem caused by too little lactase; allergy is an immune reaction to milk proteins that can be life-threatening.',
          ],
          [
            'Why might soy milk be a better substitute for cow’s milk than almond milk?',
            'Soy milk has protein content close to cow’s milk, while almond milk has very little protein.',
          ],
          [
            'What causes the symptoms of lactose intolerance?',
            'Undigested lactose is fermented by bacteria in the large intestine, producing gas and acids that cause bloating, cramps, and diarrhea.',
          ],
          [
            'Why should each experiment have repeated trials?',
            'Repeats show variation, reduce the effect of random error, and make the conclusion more reliable.',
          ],
        ],
        [
          ['Ask', 'Pick one variable to change for a lab task.'],
          ['Control', 'Hold all other conditions constant and repeat trials.'],
          ['Conclude', 'Graph data and support the conclusion with evidence.'],
        ],
        [
          [
            'Lactose intolerance',
            'Low lactase; digestive symptoms',
            'Small amounts often tolerated.',
          ],
          ['Milk allergy', 'Immune reaction to proteins', 'Tiny amounts can be dangerous.'],
          ['Plant “milk”', 'No lactose or milk protein', 'Nutrients vary; often fortified.'],
        ],
        'Decide which product suits each person, then check your design against the rules.',
        'Intolerance is about lactose; allergy is about protein. Experiments change one variable at a time.',
      ),
      investigation: evidence(
        [
          ['Person 1', 'Bloating after milk; fine with yogurt and lactose-free milk.'],
          ['Person 2', 'Hives within minutes of a tiny amount of cheese.'],
          ['Test', 'Person 2 has antibodies to casein.'],
        ],
        'Which conclusion fits?',
        [
          'Both are lactose intolerant',
          'Person 1: intolerance; person 2: milk allergy',
          'Both have milk allergy',
          'Person 1: allergy; person 2: intolerance',
        ],
        1,
        'Person 1’s digestive symptoms improve with less lactose, so it is intolerance. Person 2’s rapid hives and casein antibodies show an immune milk allergy.',
      ),
    },
  ],
});
