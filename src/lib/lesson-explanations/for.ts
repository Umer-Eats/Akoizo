// Checkpoint explanations for Forensics, keyed by question id.
export const forensics: Record<string, string> = {
  'for-u1-l1-q1':
    'Locard’s principle says that when two things touch, material moves between them, so every contact leaves a trace. It is the basis for collecting trace evidence and for avoiding contamination. "Fingerprints are unique" is a separate claim about one evidence type.',
  'for-u1-l1-q2':
    'A recycling code identifies a polymer family made in huge quantities, so many unrelated items share it. That makes PETE class evidence: it can include or exclude a source group but cannot point to one specific item without unique features such as a matching fracture edge.',
  'for-u1-l1-q3':
    'Luminol reacts with anything that catalyzes its oxidation, including bleach, some metals and plant peroxidases, as well as hemoglobin. A glow is therefore only presumptive. A confirmatory test is needed before calling the stain blood.',
  'for-u1-l1-q4':
    'Each handoff must record who released the item and who received it (with signatures), the date and time, a description of the item and the condition of its seal. Any gap or missing name lets the defense argue the evidence could have been swapped or altered.',
  'for-u1-l1-q5':
    'A grid search sweeps the area in parallel lanes and then again at right angles, so every spot is covered twice. A spiral works for small areas around a focal point, and point-to-point searching follows objects and easily misses ground between them.',
  'for-u1-l1-q6':
    'Source level asks whose material this is; activity level asks how and when it got there. DNA can come from a person through secondary transfer or an earlier visit, so a source match alone does not show they performed the act in question.',
  'for-u1-l1-q7':
    'A negative result excludes something only if the test could have detected it. If the positive control failed, the sample was too small or degraded, or the method is not sensitive enough, a negative is inconclusive.',
  'for-u1-l2-q1':
    'Benedict reagent is already blue. A blank of distilled water heated the same way shows what "no reaction" looks like, so a pale blue sample is not misread as a faint green positive, and it checks that heating alone causes no color change.',
  'for-u1-l2-q2':
    'Using a clean tool for each vial and opening one vial at a time stops traces of one powder from getting into another. Sharing a spatula, returning excess to stock or fanning dust all spread powder between samples.',
  'for-u1-l2-q3':
    'Flood the skin with running water for several minutes and tell the supervisor. Neutralizing with an acid releases heat and can deepen the burn, and wiping and continuing leaves the base working on the skin.',
  'for-u1-l2-q4':
    'A useful note records amounts, reagents and concentrations, exactly what was seen and the timing, for example "0.1 g + 2 mL 1 M HCl: vigorous fizzing, fully dissolved in 30 s". "Reacted" is vague: another person cannot judge or repeat it.',
  'for-u1-l2-q5':
    'Running a known next to the unknown proves the reagents are working and gives a color to compare under the same lighting and timing. If the known fails, any result for the unknown cannot be trusted.',
  'for-u1-l2-q6':
    'A blank shows the reagent does not react by itself (no false positive). A positive control shows the reagent can detect the target under today’s conditions (no false negative). A clean blank says nothing about whether the reagent still works.',
  'for-u1-l2-q7':
    'Observations ("fizzed, brick-red flame") are facts that anyone can re-examine. An interpretation ("CaCO₃") is a judgment that could be wrong. Keeping them separate lets a reviewer check the reasoning, or reach a different conclusion from the same record.',
  'for-u2-l1-q1':
    'Carbonates react with acid to release CO₂ (fizzing), and a carbonate dissolved in water hydrolyzes to give a basic solution. A chloride salt does not fizz with HCl, and sugars and starch neither fizz nor raise pH.',
  'for-u2-l1-q2':
    'Al³⁺ forms a white Al(OH)₃ precipitate with a little NaOH, and in excess the hydroxide dissolves as aluminate, [Al(OH)₄]⁻. That amphoteric behavior separates it from Mg(OH)₂, which stays put in excess base. Zn²⁺ behaves similarly.',
  'for-u2-l1-q3':
    'Ag⁺ plus Cl⁻ forms white, curdy silver chloride. Light reduces AgCl to metallic silver, so the precipitate turns gray or purple-black. CaCO₃ would dissolve in HCl, and NaCl is soluble, so neither forms a precipitate here.',
  'for-u2-l1-q4':
    'Adding more solid than the water can dissolve leaves leftover powder even for a soluble salt, so it looks insoluble. The saturated solution can also push pH and color tests outside their useful range. Use a small pinch.',
  'for-u2-l1-q5':
    'CaCO₃ fizzes with HCl (CO₂) and barely dissolves in water; NaCl does not fizz and dissolves readily. A brick-red versus yellow flame test is another option. Two independent tests make the identification stronger than one.',
  'for-u2-l1-q6':
    'The fizz comes from the carbonate ion reacting with acid: CO₃²⁻ + 2H⁺ → CO₂ + H₂O. Calcium, sodium and magnesium carbonates all do this, so a separate cation test, such as a flame test, is needed to say which metal is present.',
  'for-u2-l1-q7':
    'Each reagent can change the sample by altering pH, using it up or adding new ions. Testing the same portion again then measures what the previous step left behind, not the original powder. Fresh portions keep each test independent.',
  'for-u2-l2-q1':
    'Sodium gives an intense yellow flame from tiny traces, and the blank shows it is on the wire itself. Until the loop is cleaned and gives a clean blank, a yellow flame from any unknown cannot be interpreted.',
  'for-u2-l2-q2':
    'Benedict detects reducing sugars, which have a free aldehyde or ketone group that reduces blue Cu²⁺ to red Cu₂O. In sucrose the glucose and fructose are joined through those groups, so it cannot reduce copper until acid hydrolysis splits it.',
  'for-u2-l2-q3':
    'Calcium gives a brick-red (orange-red) flame, and fizzing with acid shows carbonate, so together they point to CaCO₃. KCl would give a lilac flame and no fizz, and sugars and starch char rather than color the flame.',
  'for-u2-l2-q4':
    'The color Benedict gives depends on how much sugar is present, how long and how hot the tube is heated, and the reagent’s condition. Comparing an unknown with standards is only fair if all were run the same way.',
  'for-u2-l2-q5':
    'Iodine slides into the helical coils of amylose in starch, forming a blue-black complex. Glucose, salts and carbonates have no such helix, so iodine stays yellow-brown with them.',
  'for-u2-l2-q6':
    'The tests detect different properties. Iodine needs the helical structure of starch, while Benedict needs a free reducing sugar group. Glucose is reducing but not a helix, so it is Benedict-positive and iodine-negative.',
  'for-u2-l2-q7':
    'A yellow flame from a blank means sodium contamination on the loop or in the cleaning acid. Any later yellow might come from the tool, not the sample. Clean the loop until the blank burns clear.',
  'for-u3-l1-q1':
    'PET forms when a diacid and a diol link through ester bonds and give off water each time, which is condensation. HDPE, PP and PS form by addition polymerization of C=C monomers with no by-product.',
  'for-u3-l1-q2':
    'Floating in water only shows density below 1.00 g/mL, which fits PP, LDPE and HDPE. To separate them, use a liquid with a density between theirs (such as an alcohol–water mix) or another test such as melting behavior.',
  'for-u3-l1-q3':
    'Foam contains trapped gas, so the whole object is far less dense than the plastic itself. Solid polystyrene is about 1.05 g/mL and sinks in water. Test a solid chip or press out the air to measure the material.',
  'for-u3-l1-q4':
    'Code 1 is PETE (polyethylene terephthalate), used for clear, rigid drink bottles. PVC is code 3, LDPE code 4 and PP code 5, and those are rarely used for clear soda bottles.',
  'for-u3-l1-q5':
    'Thermoplastics have separate chains that slide past each other when hot, so they soften and can be remelted. Thermosets have cross-links between chains, so they cannot flow and they char or decompose instead of melting.',
  'for-u3-l1-q6':
    'The same polymer can be more or less crystalline, and it may contain fillers, plasticizers, pigments or tiny voids. Each changes mass per volume, so two "PE" samples can have different densities.',
  'for-u3-l1-q7':
    'Floating shows only that the object’s density is less than the liquid’s, and the fraction submerged equals sample density ÷ liquid density. It sets a limit; it does not name a material or a source.',
  'for-u3-l2-q1':
    'In the Beilstein test, chlorine in the sample forms copper chloride on a hot copper wire, which gives a green flame. Among the common recycled plastics, only PVC contains chlorine. Sodium gives yellow, and sugars give no color.',
  'for-u3-l2-q2':
    'Floating in water leaves the polyolefins: PP (5), LDPE (4) and HDPE (2). Plastics that sink are PS, PET and PVC. A salt solution of about 1.20 g/mL floats PS (about 1.05) while PET and PVC (about 1.38) still sink.',
  'for-u3-l2-q3':
    'How a plastic burns or melts depends on additives, chip size and how it is heated, and several polymers behave similarly. One observation can narrow the options, but identification needs comparison with known references and another kind of test.',
  'for-u3-l2-q4':
    'Acetone dissolves polystyrene quickly, making it soft and sticky. Polyethylene, polypropylene and PET resist acetone at room temperature, so they would stay hard.',
  'for-u3-l2-q5':
    'An air bubble stuck to a chip adds volume with almost no mass, lowering the combined density so a chip that should sink can float. Pressing out bubbles, or adding a drop of detergent, measures the plastic alone.',
  'for-u3-l2-q6':
    'Sinking in 1.00 g/mL means the density is above 1.00; floating in 1.10 g/mL means it is below 1.10. Together: 1.00 < density < 1.10 g/mL. Each liquid gives one inequality.',
  'for-u3-l2-q7':
    'A bubble adds a lot of volume but almost no mass, so the chip plus bubble has a lower average density than the plastic. The test then measures the chip and bubble together, and the chip may float when the plastic alone would sink.',
  'for-u4-l1-q1':
    'Cotton is cellulose. Under the microscope it looks like a flat, twisted ribbon, and it burns like paper, leaving soft gray ash. Wool smells like burning hair, and nylon and polyester melt into hard beads.',
  'for-u4-l1-q2':
    'Synthetic fibers are extruded through a spinneret, so their diameter is very even. Dark specks are titanium dioxide added to reduce shine (a delusterant). Natural fibers like cotton and wool vary in width and show natural features such as twists or scales.',
  'for-u4-l1-q3':
    'Wool is the protein keratin, so it smells like burning hair, leaves a black bead that crushes easily and shows overlapping scales under magnification. Synthetic fibers melt into hard beads, and cotton smells like burning paper.',
  'for-u4-l1-q4':
    'Warm dilute NaOH hydrolyzes protein, so animal fibers like wool and silk dissolve, while cellulose fibers like cotton survive. This sorts animal from plant fibers; it does not identify the exact fiber.',
  'for-u4-l1-q5':
    'Fibers are manufactured in huge batches, so many garments share the same type, dye and cross-section. A match shows the fiber could have come from a garment, along with every other garment made the same way.',
  'for-u4-l1-q6':
    '"Manufactured" describes how the fiber was made, not its chemistry. Rayon and acetate are manufactured by dissolving and reshaping natural cellulose, so they are manufactured but not synthetic polymers like nylon or polyester.',
  'for-u4-l1-q7':
    'A blended fabric contains several fiber types, and transfer picks up only a few strands. A recovered fiber may represent just one component, so absence of the other components in a small sample does not rule out the garment.',
  'for-u4-l2-q1':
    'Medullary index = medulla width ÷ shaft width = 40 ÷ 60 ≈ 0.67. Human hair usually has an index below about 1/3, while animal hair is usually 0.5 or more, so this hair is more consistent with an animal.',
  'for-u4-l2-q2':
    'Nuclear DNA for STR typing comes mostly from the root tissue. A shed hair without a follicle usually has little nuclear DNA, but the shaft still contains many copies of mitochondrial DNA, which is inherited maternally and is less discriminating.',
  'for-u4-l2-q3':
    'Color, diameter, medulla and scale pattern are shared by many people and vary along a single hair, so microscopy can only show a hair is consistent with a person or exclude them. Individualizing a hair requires DNA.',
  'for-u4-l2-q4':
    'Scale and medulla patterns are compared together with color, diameter, pigment and other features against several reference hairs. No single feature is unique, and appearance cannot date a hair or replace DNA.',
  'for-u4-l2-q5':
    'Pick hairs up with clean forceps and fold them into paper (a druggist fold). Paper does not build static the way plastic does and lets the sample breathe. Leaving hairs on tape or in a mixed pile risks damage and loss.',
  'for-u4-l2-q6':
    'Medullary index = medulla width ÷ shaft width = 30 μm ÷ 100 μm = 0.30. The units cancel, so the index has none. A value below about 1/3 fits human hair.',
  'for-u4-l2-q7':
    'Hairs from one head vary in color, diameter and medulla depending on location and treatment such as dye. Without a range of known hairs, a difference might reflect normal variation rather than a different person.',
  'for-u5-l1-q1':
    'Rf = distance moved by the spot ÷ distance moved by the solvent front, both measured from the origin: 4.2 ÷ 7.0 = 0.60. It has no units and must be between 0 and 1.',
  'for-u5-l1-q2':
    'Rf values shift with the solvent, paper, temperature and how saturated the chamber is. Running both inks on the same strip at the same time exposes them to identical conditions, so any difference comes from the inks.',
  'for-u5-l1-q3':
    'The pen produces a component at Rf 0.80 that is missing from the note. Unless low concentration or poor sampling explains its absence, that difference argues against this pen as the source. Matching bands must all agree.',
  'for-u5-l1-q4':
    'Overloading produces streaks and smears. Apply a small spot (under about 3 mm), let it dry and re-apply to concentrate it. Larger spots, solvent above the origin or touching the plate all make results worse.',
  'for-u5-l1-q5':
    'Silica is polar and holds polar molecules strongly. Hexane is nonpolar, so it cannot pull a polar dye off the silica, and the dye stays near the origin. Adding a more polar solvent would move it further.',
  'for-u5-l1-q6':
    'Rf = 3.6 cm ÷ 6.0 cm = 0.60. Both distances are measured from the same starting line (the origin) to the center of the spot and to the solvent front. The units cancel.',
  'for-u5-l1-q7':
    'How far a component moves, and whether it is visible, depends on the solvent, the paper or plate, temperature and how much was spotted. Different conditions could create or hide a difference that has nothing to do with the inks.',
  'for-u5-l2-q1':
    'The tallest peak in a mass spectrum is the base peak, and it is set to 100% relative abundance. The molecular ion (M⁺) is the intact ionized molecule, which may be small or even absent.',
  'for-u5-l2-q2':
    'Bromine’s two isotopes, ⁷⁹Br and ⁸¹Br, occur in nearly equal amounts, so a bromine-containing ion appears as two peaks 2 mass units apart with about equal height. Chlorine gives a roughly 3:1 pair instead.',
  'for-u5-l2-q3':
    'M⁺ = 92 gives the molar mass. Loss of one hydrogen gives the very stable tropylium ion at m/z 91, which can lose acetylene (C₂H₂, 26) to give 65. That pattern fits an alkylbenzene such as toluene, C₇H₈.',
  'for-u5-l2-q4':
    'A very broad absorption from about 2500 to 3300 cm⁻¹ comes from a hydrogen-bonded O–H, and a strong peak near 1710 cm⁻¹ is a C=O. Together they indicate a carboxylic acid. Alkanes, amines and ethers lack that combination.',
  'for-u5-l2-q5':
    'Isomers have the same molecular mass and can break into similar fragments, so mass spectrometry alone may not tell them apart. IR, retention time or a reference standard adds independent evidence.',
  'for-u5-l2-q6':
    'The base peak is the most intense peak, set to 100%. The molecular-ion peak represents the whole molecule with one electron removed. They can be the same peak, but often the molecular ion breaks apart and a fragment is tallest.',
  'for-u5-l2-q7':
    'IR shows which bonds and functional groups are present through their vibrations. Mass spectrometry shows the molecular mass and how the molecule breaks apart. Each rules out candidates the other cannot.',
  'for-u6-l1-q1':
    'A loop has one delta, the triangular point where ridges diverge. A whorl has at least two, and a plain arch has none. Counting deltas is the quickest way to classify a print.',
  'for-u6-l1-q2':
    'A ridge count is the number of ridges crossed by a line from the core to the delta, not counting the core and delta themselves. It helps subclassify loops for filing, but it is a class feature and cannot identify a person alone.',
  'for-u6-l1-q3':
    'Too much pressure, smearing or movement can make two ridges appear joined or one ridge appear broken. Before calling a feature an ending or a bifurcation, check its clarity, direction and the neighboring ridges.',
  'for-u6-l1-q4':
    'A latent print is invisible until developed with powder or chemicals. A patent print is visible because it was made in a colored material like blood or ink. A plastic print is pressed into a soft material such as wax.',
  'for-u6-l1-q5':
    'AFIS only searches a database and ranks possible matches. A trained examiner must then compare the prints using ACE-V (analysis, comparison, evaluation, verification) before any identification is reported.',
  'for-u6-l1-q6':
    'Loops make up about 60–65% of all fingerprints, so sharing that pattern says little. The arrangement of minutiae (ridge endings, bifurcations and dots) is far more specific and is what supports an identification.',
  'for-u6-l1-q7':
    'In a heavily smudged area, apparent differences may be distortion rather than real disagreement. If that region is not clear enough to compare reliably, treat it as unusable and base the conclusion only on clear areas.',
  'for-u6-l2-q1':
    'Paper is porous, so sweat residues soak into it. Methods like ninhydrin or DFO, which react with amino acids in paper, work well there. The best sequence also depends on what other testing (DNA, ink) the item needs.',
  'for-u6-l2-q2':
    'Iodine fuming stains oils in a print yellow-brown, but the iodine evaporates and the print fades within minutes to hours. Photograph it right away, with a scale, before the detail is lost.',
  'for-u6-l2-q3':
    'In super glue fuming, cyanoacrylate vapor polymerizes on moisture and residues in a print, forming a hard white deposit. It works best on nonporous surfaces like plastic, glass and metal, where residue stays on the surface.',
  'for-u6-l2-q4':
    'Ninhydrin reacts with amino acids in sweat residue to form a purple compound called Ruhemann’s purple. Amino acids soak into and stay in paper, so ninhydrin is a standard method for porous surfaces.',
  'for-u6-l2-q5':
    'Pressing hard or using too much powder packs it into the furrows between ridges and smears the ridges themselves. That wipes out fine details like ridge endings and bifurcations needed for comparison.',
  'for-u6-l2-q6':
    'Surfaces differ: porous paper, nonporous plastic, wet or dusty items and items that also need DNA testing each call for different methods in a different order. A sequence must fit the specific item and follow a validated procedure.',
  'for-u6-l2-q7':
    'Lifting with tape can tear, stretch or remove parts of a print, and a failed lift cannot be undone. A scaled photograph first preserves the print exactly as found, including its position and orientation.',
  'for-u7-l1-q1':
    'A heterozygote inherited two different repeat numbers at that STR locus, one from each parent. The two alleles have different lengths, so they separate into two peaks. A homozygote shows one taller peak.',
  'for-u7-l1-q2':
    'Agreement at every locus means the person cannot be excluded and is consistent as a source. How strong that is depends on a statistic, such as a random-match probability or likelihood ratio, calculated for that specific profile. It says nothing about guilt.',
  'for-u7-l1-q3':
    'Each person carries at most two alleles per locus. Three or more peaks at several loci therefore means DNA from at least two people. One odd peak at a single locus could be an artifact, but repeated extra peaks indicate a mixture.',
  'for-u7-l1-q4':
    'Each cell holds hundreds to thousands of copies of mitochondrial DNA versus two of nuclear DNA, so mtDNA is more likely to survive in a rootless or degraded hair shaft. It is maternally inherited and less discriminating than STRs.',
  'for-u7-l1-q5':
    'A reagent blank should contain no DNA. Peaks there mean contamination, which could also be present in the real samples. The run is invalid until the source is found and the samples are retested.',
  'for-u7-l1-q6':
    'Two people can share alleles, so a mixture can show only two peaks at some loci, and a small contributor’s alleles may fall below detection. Contributor numbers must be judged across all loci, along with peak heights.',
  'for-u7-l1-q7':
    'A random-match probability answers: if a random unrelated person were tested, how likely is this profile? It does not consider transfer, innocent explanations or other evidence, so it is not the probability that the suspect is guilty.',
  'for-u7-l2-q1':
    'AO gives an A or O allele, and BO gives a B or O allele. The four combinations are AB (AB), AO (type A), BO (type B) and OO (type O), each with probability 1/4, so all four blood types are possible.',
  'for-u7-l2-q2':
    'Impact angle = arcsin(width ÷ length) = arcsin(4 ÷ 8) = arcsin(0.5) = 30°. Measure the main body of the stain, not the tail. A rounder stain means a steeper (closer to 90°) impact.',
  'for-u7-l2-q3':
    'The Kastle-Meyer test turns pink because hemoglobin catalyzes oxidation of phenolphthalin. Some plant peroxidases and oxidizers do the same, so pink is presumptive for blood. It does not show the blood is human or yield DNA.',
  'for-u7-l2-q4':
    'Bubbles show the blood was mixed with air, and pale strands suggest mucus or saliva, which fits blood breathed or coughed out of the airway (expirated). Impact spatter from a blow lacks bubbles and diluted color.',
  'for-u7-l2-q5':
    'Type A is common (around 30–40% of many populations), so a match only shows the stain could have come from the reference person or anyone else with type A. It is class evidence, not identification.',
  'for-u7-l2-q6':
    'Impact angle = arcsin(width ÷ length) = arcsin(8 ÷ 16) = arcsin(0.5) = 30°. Only the ratio matters, so a stain twice as large with the same shape gives the same angle.',
  'for-u7-l2-q7':
    'If the stain’s ABO type differs from the person’s, they did not leave that stain. They could still have been at the scene, and the stain could belong to someone else or have been left at another time.',
  'for-u8-l1-q1':
    'The 3R rule: radial cracks form a right angle on the reverse side from where the force was applied. Checking the stress lines on a radial crack’s edge shows which side the impact came from.',
  'for-u8-l1-q2':
    'When the objective is moved away from the specimen (focus raised), the bright Becke line moves into the material with the higher refractive index. Here it moves into the fragment, so the glass has a higher RI than the oil.',
  'for-u8-l1-q3':
    'Land and groove number, width and twist direction are set by the barrel’s design and are shared by every gun of that model, so they are class traits. Fine striations come from tool wear unique to one barrel, and comparing them takes trained examination.',
  'for-u8-l1-q4':
    'Stippling (powder tattooing) happens when unburned powder grains strike skin, which only occurs within a limited distance, often a few feet or less. Soot also suggests close range. A contact shot leaves a seared wound, and a distant shot leaves no residue.',
  'for-u8-l1-q5':
    'The refractive index of immersion oil falls as temperature rises, much more than glass does. The match point is recorded with temperature to compare glass RI accurately with known samples.',
  'for-u8-l1-q6':
    'Some microscopes move the stage and others move the objective, so "focus up" can mean different things. Stating "increasing the objective-to-specimen distance" fixes the meaning, so the rule about which medium has the higher index is applied correctly.',
  'for-u8-l1-q7':
    'A new crack stops when it runs into an existing crack, so the crack that ends must have formed later. That gives the order of impacts, but not their timing or who caused them.',
  'for-u8-l2-q1':
    'Accumulated degree hours = (temperature − base temperature) × hours = (22 − 6) × 24 = 16 × 24 = 384 degree-hours. Only heat above the base counts toward insect development.',
  'for-u8-l2-q2':
    'Fresh eggs show that a fly laid them recently. Flies may not reach a body right away, for example at night or if it was wrapped or indoors, so eggs set a minimum time since colonization, not an exact time of death.',
  'for-u8-l2-q3':
    'Different fly species develop at different rates at the same temperature and have different base temperatures. Using the wrong species’ development data would give a wrong age for the larvae and a wrong postmortem interval.',
  'for-u8-l2-q4':
    'Soil varies across short distances, and shoes can pick up soil from several places. Before excluding a site, check the range of soil at that site, whether the sample is a mixture and whether the differences are measured reliably.',
  'for-u8-l2-q5':
    'Possible confounders include delayed egg-laying (night, rain, a wrapped or indoor body), heat from a mass of maggots, drugs in the tissue that change growth, and inaccurate temperature records. Each changes the estimate and widens the range.',
  'for-u8-l2-q6':
    'ADH = (temperature − threshold) × hours = (20 − 6) × 10 = 14 × 10 = 140 degree-hours. Use the temperature above the developmental threshold, not the full 20 °C.',
  'for-u8-l2-q7':
    'Eggs date when flies laid them, not when the person died. If insects could not reach the body until later, the eggs only show a minimum time since colonization.',
  'for-u9-l1-q1':
    'Claim: the powder is consistent with CaCO₃. Evidence: fizzing with HCl, a brick-red flame, basic pH and a negative Benedict test. Reasoning: carbonate releases CO₂ with acid, calcium gives brick red, and the negative Benedict rules out reducing sugars.',
  'for-u9-l1-q2':
    'Sodium on the wire adds yellow to every flame, a one-direction bias, so it is a systematic error. Averaging more trials cannot remove it. Clean the wire and confirm with a blank before testing again.',
  'for-u9-l1-q3':
    'You can report the mean, (0.58 + 0.60 + 0.62) ÷ 3 = 0.60, and the observed range, 0.58–0.62. A full uncertainty statement also needs method details, such as measurement precision and how the runs were done.',
  'for-u9-l1-q4':
    'A negative Benedict result rules out reducing sugars like glucose, narrowing the list of possible powders. Recording negatives shows the reasoning used to eliminate candidates, not just the final answer.',
  'for-u9-l1-q5':
    'Fibers are class evidence, so the correct wording is that the fiber is consistent with the suspect’s garment, as it would be with any garment of the same type. "Identical" or "proves presence" claims more than the evidence supports.',
  'for-u9-l1-q6':
    'A systematic error pushes every measurement the same way, such as a miscalibrated scale. Repeating gives consistent but still wrong values, and averaging them does not move them closer to the truth. Calibration or a correction fixes it.',
  'for-u9-l1-q7':
    'For the smallest Rf, use the smallest spot distance over the largest front: 2.9 ÷ 6.1 ≈ 0.48. For the largest, use 3.1 ÷ 5.9 ≈ 0.53. So Rf is about 0.48–0.53.',
  'for-u9-l2-q1':
    'Class matches are expected by chance because many people share the trait. A reliable exclusion, such as a different blood type, directly contradicts single-source origin. One solid contradiction outweighs several common agreements.',
  'for-u9-l2-q2':
    'A short survey plans the work, about 30 minutes of testing with partners splitting tasks gathers evidence, and about 15 minutes is protected for writing. Much of the score depends on the written analysis, so leaving only 5 minutes loses easy points.',
  'for-u9-l2-q3':
    'Touch DNA can be transferred indirectly, and common cotton fibers are found everywhere. Neither ties the person to the crime itself. Evidence specific to the act, such as spatter on their clothing, is needed before claiming they were present during the crime.',
  'for-u9-l2-q4':
    'A complete conclusion states the limits of each test, possible errors and which confirmatory tests should come next. A name alone hides how certain the evidence is and what could change the result.',
  'for-u9-l2-q5':
    'A full STR profile combines many independent loci, so with valid statistics the chance of a random match can be very small. A common fiber type is shared by many garments. Even so, DNA can be transferred, so relevance to the event still matters.',
  'for-u9-l2-q6':
    'Items of evidence differ in reliability, specificity and relevance, and some overlap. Five fibers from one sweater are one association, not five. A raw count can make weak or dependent evidence look stronger than it is.',
  'for-u9-l2-q7':
    'Report the conflicting result, reconsider the explanation and list other possibilities or tests that could resolve it. Leaving it out would hide evidence and make the conclusion less trustworthy.',
  'for-u6-l3-q1':
    'The epidermis has no blood vessels; it gets nutrients by diffusion from capillaries in the dermis below. That is why a shallow scrape of the epidermis does not bleed, while a cut into the dermis does.',
  'for-u6-l3-q2':
    'Palms have sweat glands but no oil glands. People constantly touch their face and hair, picking up sebum, and handle oily food and cosmetics. That transferred oil ends up in fingerprint residue.',
  'for-u6-l3-q3':
    'Eccrine sweat glands are densest on palms and soles. Their watery secretion, containing salts and amino acids, makes up much of a fingerprint’s residue. Sebaceous glands are absent on palms.',
  'for-u6-l3-q4':
    'The ridge pattern is anchored in the dermal papillae beneath the epidermis. Surface cells are shed and replaced from below, but the pattern underneath stays the same, so ridges regrow identically unless the dermis is scarred.',
  'for-u6-l3-q5':
    'A sliding finger smears and stretches the ridges as the print is made. The finger’s pattern did not change, so the smear is a recording problem, not evidence of a different person.',
  'for-u6-l3-q6':
    'A patent print is visible because the finger carried a colored substance like blood, paint or ink. A plastic print is a three-dimensional impression pressed into something soft like wax, putty or wet paint.',
  'for-u6-l3-q7':
    'Low quality can hide or distort real features, so a missing or odd feature may be an artifact. A print is excluded only if a clear, reliable area shows a real difference.',
  'for-u8-l3-q1':
    'Palynology is the study of pollen and spores. Their shapes identify plant groups, and the mix of types in a sample can indicate the environment, season or place it came from.',
  'for-u8-l3-q2':
    'Wind-dispersed pollen is produced in huge amounts and can travel long distances, so it occurs across wide areas. Finding it says little about a specific location; rare or insect-carried types are more informative.',
  'for-u8-l3-q3':
    'A tread design is made for every shoe of that model and size, so it is a class characteristic. Only accidental wear features like cuts and nicks can point to one specific shoe.',
  'for-u8-l3-q4':
    'A small sample captures only some of the types present. A type that is rare in the reference may simply not have been picked up, so its absence does not prove the sample came from elsewhere.',
  'for-u8-l3-q5':
    'Spermology is the study of seeds: their shape, size and surface features. Seeds can travel on clothing and shoes and help connect a person or object to a particular environment.',
  'for-u8-l3-q6':
    'Pollen and seeds can stay on clothing for days or weeks and can transfer from one item to another. Finding them shows contact with that environment at some point, not when it happened.',
  'for-u8-l3-q7':
    'A shared tread pattern is a class feature that many shoes have. With too little detail to show unique wear marks, the defensible statement is that the shoe could have made the print, not that it did.',
};
