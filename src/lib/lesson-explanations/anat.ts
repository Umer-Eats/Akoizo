// Checkpoint explanations for Anatomy and Physiology, keyed by question id.
export const anat: Record<string, string> = {
  'anat-u1-l1-q1':
    'Anterior means toward the front of the body, and the sternum lies in front of the heart. Proximal means closer to where a limb attaches to the trunk, and the elbow is closer to the shoulder than the wrist is. "Posterior; distal" reverses both terms.',
  'anat-u1-l1-q2':
    'Concentric layers (mucosa, submucosa, muscularis, serosa) appear as rings only when the cut is perpendicular to the tube’s own long axis. Midsagittal and frontal are body planes, so whether they cross a loop of bowel at a right angle depends on how that loop happens to lie.',
  'anat-u1-l1-q3':
    'Retroperitoneal organs lie behind the parietal peritoneum, against the posterior body wall, instead of hanging inside the peritoneal cavity on a mesentery. The kidneys, most of the pancreas and much of the duodenum are classic examples. A full answer names an organ and states that relationship.',
  'anat-u1-l1-q4':
    'The conducting airways (trachea and bronchi) are lined by pseudostratified ciliated columnar epithelium with goblet cells, which together form the mucociliary escalator. Alveoli use thin simple squamous cells for diffusion, the esophagus uses stratified squamous for abrasion, and the bladder uses transitional epithelium to stretch.',
  'anat-u1-l1-q5':
    'The heart lies in the pericardial cavity within the mediastinum. The parietal pericardium lines the fibrous sac, the visceral pericardium (epicardium) covers the heart, and a thin film of serous fluid between them lets the heart beat with little friction.',
  'anat-u1-l1-q6':
    'A transverse plane is defined by the body, not by the organ. If a loop of bowel runs obliquely through that plane, the slice crosses it at an angle, and a tube cut at an angle looks like an ellipse instead of a circle.',
  'anat-u1-l1-q7':
    'Structure matches function. Alveoli need the shortest possible diffusion distance, so a single thin layer helps gas exchange. The esophagus faces friction from swallowed food, so many protective cell layers that can be shed and replaced are an advantage.',
  'anat-u1-l2-q1':
    'In positive feedback the response amplifies the original stimulus. Stretch of the cervix triggers oxytocin release, oxytocin strengthens contractions, and stronger contractions cause more stretch, until delivery ends the loop. Negative feedback would instead reduce the stimulus.',
  'anat-u1-l2-q2':
    'High blood calcium stimulates thyroid C cells to release calcitonin, which lowers calcium, and suppresses parathyroid hormone, which would raise it. ADH and aldosterone regulate water and sodium, not calcium.',
  'anat-u1-l2-q3':
    'Isotonic saline has the same effective solute concentration as plasma, so it expands extracellular volume without moving water into cells. Pure water is hypotonic: water would enter red cells and other cells by osmosis, making them swell and possibly burst (hemolysis).',
  'anat-u1-l2-q4':
    'Carotid sinus baroreceptors send signals through the glossopharyngeal nerve to the cardiovascular center in the medulla. When pressure falls, the medulla raises sympathetic output and lowers parasympathetic output, increasing heart rate and vessel constriction within seconds.',
  'anat-u1-l2-q5':
    'The hypothalamus is the body’s thermostat. Its posterior region drives heat conservation and production in the cold: cutaneous vasoconstriction keeps heat in the core and shivering generates heat.',
  'anat-u1-l2-q6':
    'Each step removes half of whatever error is left, so the error is multiplied by 0.5 three times: 8 → 4 → 2 → 1. That is 8 × 0.5³ = 1 unit. Subtracting 50% of the original 8 each time would wrongly reach zero after two steps.',
  'anat-u1-l2-q7':
    'If detection and signaling work but the variable does not recover, the failure lies downstream: the effector may not be responding, or the disturbance may be larger than the effector can correct. The sensor and control center have already done their jobs.',
  'anat-u2-l1-q1':
    'The right main bronchus is wider, shorter and more vertical than the left, so it continues almost straight down from the trachea. Inhaled objects follow that path. The left bronchus angles away more sharply because the heart lies to the left.',
  'anat-u2-l1-q2':
    'Goblet cells and glands secrete mucus that traps particles. Ciliated pseudostratified columnar cells beat in a coordinated way to move that mucus up toward the pharynx, where it is swallowed or coughed out. Both parts are needed: mucus without cilia stays put, and cilia without mucus trap nothing.',
  'anat-u2-l1-q3':
    'Albuterol is a beta-2 adrenergic agonist. Beta-2 activation raises cAMP in bronchial smooth muscle, which relaxes it and widens the airway. Muscarinic activation does the opposite (bronchoconstriction), and alpha-1 receptors mainly constrict blood vessels.',
  'anat-u2-l1-q4':
    'The sternal angle (angle of Louis) lines up with the T4–T5 intervertebral disc, the usual level of the tracheal bifurcation (carina). The exact level shifts a little with posture and breathing, but this landmark is the standard reference.',
  'anat-u2-l1-q5':
    'Resistance to flow varies with 1/r⁴, so small decreases in radius cause large rises in resistance. In asthma, smooth-muscle constriction, swelling of the mucosa and mucus plugs all narrow the airway at once. Halving the radius raises resistance sixteenfold.',
  'anat-u2-l1-q6':
    'Flow is proportional to pressure × r⁴. Halving the radius multiplies flow by (1/2)⁴ = 1/16, and doubling the pressure multiplies it by 2. Together: 2/16 = 0.125, or 12.5% of baseline flow.',
  'anat-u2-l1-q7':
    'Diffusion is fastest across the thinnest barrier, so a thick ciliated lining with a mucus layer would slow gas exchange. Alveolar macrophages clear particles that reach the alveoli without adding thickness to the exchange surface.',
  'anat-u2-l2-q1':
    'Type II pneumocytes secrete surfactant, a phospholipid mixture that lowers surface tension in the alveoli so they do not collapse at the end of expiration. Goblet cells make mucus, parietal cells make HCl, and plasma cells make antibodies.',
  'anat-u2-l2-q2':
    'The lungs tend to recoil inward and the chest wall tends to spring outward. Those opposing pulls make pleural pressure slightly below atmospheric, about −4 mmHg at rest, which keeps the lungs expanded. If pleural pressure became atmospheric, the lung would collapse.',
  'anat-u2-l2-q3':
    'In a tension pneumothorax, a one-way leak lets air enter the pleural space with each breath but not leave. Pressure builds, pushing the mediastinum and trachea toward the opposite side. That compresses the other lung and kinks the great veins, reducing venous return.',
  'anat-u2-l2-q4':
    'Quiet inspiration is active. The diaphragm contracts and flattens, and the external intercostals lift the ribs, enlarging the thorax. Quiet expiration is mostly passive recoil. Abdominal muscles and internal intercostals are used for forced expiration.',
  'anat-u2-l2-q5':
    'An X-ray border is visible only where air meets soft tissue. The right middle lobe touches the right heart border, so when it fills with fluid (consolidation) both have the same density and the border disappears. This is the silhouette sign, and it localizes the disease to the middle lobe.',
  'anat-u2-l2-q6':
    'Transpulmonary pressure = alveolar pressure − pleural pressure = 0 − (−5) = +5 cm H₂O. This positive distending pressure holds the lung open even when no air is flowing.',
  'anat-u2-l2-q7':
    'Emphysema destroys elastic alveolar walls, so the lung inflates easily (high compliance). But the same loss reduces the elastic recoil that drives expiration and the tethering that holds small airways open. Airways collapse during exhalation and air is trapped.',
  'anat-u3-l1-q1':
    'Vital capacity is the most air you can exhale after a maximal breath in: inspiratory reserve volume + tidal volume + expiratory reserve volume. Residual volume is excluded because it can never be exhaled. Adding RV gives total lung capacity.',
  'anat-u3-l1-q2':
    'A low FEV1/FVC ratio (below about 0.70) means air cannot be pushed out quickly relative to the total exhaled, the signature of obstruction such as asthma or COPD. In restriction both values fall together, so the ratio stays normal or rises.',
  'anat-u3-l1-q3':
    'Only the part of each breath beyond the dead space reaches the alveoli: 600 − 150 = 450 mL per breath. Multiply by the rate: 450 × 10 = 4,500 mL/min (4.5 L/min). Dead space is removed per breath, before multiplying by the rate.',
  'anat-u3-l1-q4':
    'A clot blocks blood flow to alveoli that are still ventilated. Ventilation without perfusion is alveolar dead space, because that air does no gas exchange. Shunt is the opposite: perfusion without ventilation.',
  'anat-u3-l1-q5':
    'In low V/Q units some air still reaches the alveoli, so breathing extra oxygen raises their PO₂ and improves the blood leaving them. In a true shunt the blood passes alveoli that get no ventilation at all, so the added oxygen never reaches it.',
  'anat-u3-l1-q6':
    'Each breath delivers 300 − 150 = 150 mL to the alveoli. At 20 breaths/min: 150 × 20 = 3,000 mL/min = 3.0 L/min. Minute ventilation is 6.0 L/min, but half of it only fills dead space, which is why rapid shallow breathing is inefficient.',
  'anat-u3-l1-q7':
    'Restriction means a reduced total lung capacity. A low FVC alone could come from air trapping or poor effort. Measuring TLC directly (by body plethysmography or gas dilution) and comparing it with reference values confirms restriction.',
  'anat-u3-l2-q1':
    'Active muscle produces CO₂, acid and heat, which shift the oxyhemoglobin curve to the right (the Bohr effect). A right shift lowers hemoglobin’s affinity for O₂, so more O₂ is released exactly where demand is high. Alkalosis and low 2,3-BPG shift the curve left, holding O₂ more tightly.',
  'anat-u3-l2-q2':
    'About 70% of CO₂ is carried as bicarbonate. In red cells, carbonic anhydrase converts CO₂ and water to carbonic acid, which splits into H⁺ and HCO₃⁻, and the HCO₃⁻ moves into plasma. Roughly 20% rides on hemoglobin as carbamino compounds and about 10% is dissolved.',
  'anat-u3-l2-q3':
    'Breathing too fast blows off CO₂. Less CO₂ means less carbonic acid and fewer H⁺ ions, so pH rises. That is respiratory alkalosis: the cause is ventilation (respiratory) and the result is high pH (alkalosis).',
  'anat-u3-l2-q4':
    'Fetal hemoglobin uses gamma chains instead of beta chains, and they bind 2,3-BPG weakly. Since 2,3-BPG normally lowers affinity, HbF holds O₂ more tightly than adult hemoglobin. That lets fetal blood pull O₂ from maternal blood across the placenta.',
  'anat-u3-l2-q5':
    'When CO₂ enters a red cell, carbonic anhydrase makes HCO₃⁻, which leaves the cell through a band 3 exchanger. Each HCO₃⁻ that leaves is swapped for a Cl⁻ that enters, keeping the cell electrically neutral. That swap is the chloride shift.',
  'anat-u3-l2-q6':
    'Saturation is the percentage of available hemoglobin sites holding O₂. Oxygen content also depends on how much hemoglobin there is. In anemia there is less hemoglobin, so even 98% saturation of fewer sites carries less O₂ per liter of blood.',
  'anat-u3-l2-q7':
    'By Fick’s law, flux ∝ area × gradient ÷ thickness. Halving the area multiplies flux by 0.5, and doubling the thickness multiplies it by 1/2: 0.5 × 0.5 = 0.25, or 25% of baseline. Effects multiply; do not add the two 50% changes.',
  'anat-u4-l1-q1':
    'Asthma is airway obstruction that reverses, spontaneously or with a bronchodilator, and is often allergic with eosinophilic inflammation. Emphysema causes fixed obstruction from destroyed alveoli, fibrosis is restrictive, and pneumothorax is air in the pleural space.',
  'anat-u4-l1-q2':
    'DLCO measures how well gas crosses from alveoli into blood, which depends on the alveolar surface area. Emphysema destroys alveolar walls and forms bullae (large air spaces), so the exchange surface and DLCO both fall. In asthma and chronic bronchitis DLCO is usually normal.',
  'anat-u4-l1-q3':
    'Early in an asthma attack, patients breathe fast and PaCO₂ is low. If PaCO₂ climbs back to "normal" while the patient still struggles, the breathing muscles are tiring and ventilation is failing. That pseudo-normal value warns of impending respiratory failure, not improvement.',
  'anat-u4-l1-q4':
    'Relaxing bronchial smooth muscle widens the airway lumen, increasing its caliber and lowering resistance. It does not rebuild alveolar walls, make hemoglobin or remove mucus; those need other processes.',
  'anat-u4-l1-q5':
    'Emphysema in a young nonsmoker, especially at the lung bases (panacinar), points to alpha-1 antitrypsin deficiency. Without this protease inhibitor, neutrophil elastase digests alveolar walls. Smoking-related emphysema usually starts in the upper lobes and later in life.',
  'anat-u4-l1-q6':
    'A bronchodilator relaxes airway smooth muscle, so it can widen airways. Emphysema’s gas-exchange problem comes from alveolar walls that have been destroyed, and no drug that changes muscle tone can rebuild that lost surface.',
  'anat-u4-l1-q7':
    'Both asthma and COPD lower the FEV1/FVC ratio, and their responses to bronchodilators overlap: some COPD partly reverses and long-standing asthma can become fixed. Telling them apart needs history, symptom pattern, test quality and other measures such as DLCO, not one ratio.',
  'anat-u4-l2-q1':
    'Tuberculosis favors the oxygen-rich lung apices and forms caseating ("cheese-like") granulomas that can break down into cavities. The other choices do not produce granulomas.',
  'anat-u4-l2-q2':
    'Idiopathic pulmonary fibrosis (usual interstitial pneumonia pattern) scars the lower, outer lungs into a honeycomb pattern. Stiff alveoli popping open make fine "Velcro" crackles. It is restrictive, unlike COPD and asthma, and it is not an effusion.',
  'anat-u4-l2-q3':
    'In pneumonia the alveoli fill with pus and fluid, so air cannot reach them, but blood still flows past. Perfusion without ventilation is shunt. Dead space is the reverse: ventilated alveoli with no blood flow.',
  'anat-u4-l2-q4':
    'Restriction is defined by reduced lung volume, best shown by a low total lung capacity. A fast breathing rate, one low saturation or a cough can occur in many conditions and do not measure lung volume.',
  'anat-u4-l2-q5':
    'Aspirated material falls by gravity into the most dependent parts of the lung. Upright, that means the lower lobes, especially on the right, because the right main bronchus is wider and more vertical. When lying down, the posterior segments are most dependent.',
  'anat-u4-l2-q6':
    'Normally bronchi and alveoli both contain air, so bronchial walls are hard to see. When the surrounding alveoli fill with fluid but the bronchi stay open, the air-filled bronchi stand out as dark branching lines against white consolidation. That is an air bronchogram.',
  'anat-u4-l2-q7':
    'In a true shunt, blood flows past alveoli that receive no ventilation, so no gas exchange happens at all. In diffusion limitation the alveoli are ventilated, but gas crosses a thickened or damaged barrier too slowly. Extra O₂ helps diffusion limitation much more than shunt.',
  'anat-u5-l1-q1':
    'Chief cells secrete inactive pepsinogen. The low pH from parietal-cell HCl cleaves it into active pepsin, which then activates more pepsinogen. Bile and bicarbonate are released into the duodenum and would raise pH, not activate pepsin.',
  'anat-u5-l1-q2':
    'Parietal cells secrete both HCl and intrinsic factor. Intrinsic factor binds vitamin B12 and carries it to the terminal ileum for absorption. Losing parietal cells (autoimmune gastritis) causes B12 deficiency, known as pernicious anemia.',
  'anat-u5-l1-q3':
    'NSAIDs block cyclooxygenase, so less prostaglandin is made. Prostaglandins maintain the stomach’s mucus, bicarbonate secretion and blood flow, so without them the mucosal defense weakens while acid secretion continues, allowing ulcers.',
  'anat-u5-l1-q4':
    'A narrowing such as a stricture or ring physically blocks large solid boluses first; liquids still pass. Motility disorders like achalasia or diffuse spasm typically affect solids and liquids from the start.',
  'anat-u5-l1-q5':
    'Repeated acid exposure can make the lower esophagus replace its stratified squamous lining with acid-resistant intestinal-type columnar cells with goblet cells. This metaplasia, called Barrett esophagus, raises the risk of esophageal adenocarcinoma.',
  'anat-u5-l1-q6':
    'Chemical digestion breaks chemical bonds, here hydrolysis of triglyceride ester bonds by an enzyme. Mechanical digestion, like chewing or churning, only makes particles smaller or mixes them without changing the molecules. Where it happens (the mouth) does not decide the category.',
  'anat-u5-l1-q7':
    'The gastric lining protects itself actively. A mucus layer traps bicarbonate to keep a near-neutral zone at the cell surface, tight junctions stop acid leaking between cells, blood flow removes any acid that gets in, and damaged cells are quickly replaced.',
  'anat-u5-l2-q1':
    'The intrinsic factor–B12 complex is absorbed by receptors in the terminal ileum. Removing or inflaming that segment (for example in Crohn disease) can cause B12 deficiency. Iron is absorbed mainly in the duodenum and most other nutrients in the jejunum.',
  'anat-u5-l2-q2':
    'In celiac disease, gluten triggers an autoimmune response against tissue transglutaminase. That produces anti-tTG antibodies and flattens the villi (villous atrophy), shrinking the absorptive surface. Normal villi or absent antibodies argue against it.',
  'anat-u5-l2-q3':
    'Bile salts are detergents, not enzymes. They break large fat droplets into small ones (emulsification) and form micelles that carry digested lipids to the gut wall. Pancreatic lipase is the enzyme that actually breaks triglycerides into fatty acids and monoglycerides. Bile increases the surface area lipase can work on.',
  'anat-u5-l2-q4':
    'Inside the enterocyte, long-chain fatty acids are rebuilt into triglycerides and packed into chylomicrons. Chylomicrons are too large to enter capillaries, so they enter lacteals (lymph vessels) and reach the blood through the thoracic duct. Sugars and amino acids instead enter capillaries leading to the portal vein.',
  'anat-u5-l2-q5':
    'Vitamins A, D, E and K are fat-soluble, so they are absorbed with fat in bile-dependent micelles. In cholestasis bile does not reach the gut, so these vitamins are poorly absorbed. Deficiencies show as night blindness (A), weak bones (D), nerve problems (E) and bleeding (K).',
  'anat-u5-l2-q6':
    'Bile salts physically emulsify fat and form micelles to transport digestion products; they break no bonds. Pancreatic lipase catalyzes hydrolysis of triglycerides into fatty acids and monoglycerides. One is a physical helper and the other is the enzyme.',
  'anat-u5-l2-q7':
    'Absorbed fatty acids and monoglycerides are rebuilt into triglycerides in the enterocyte, packaged into chylomicrons, released into lacteals, carried through lymph vessels to the thoracic duct, and emptied into the left subclavian vein. Sugars and amino acids go to the liver by the portal vein instead.',
  'anat-u6-l1-q1':
    'With a duodenal ulcer, food in the stomach closes the pylorus and buffers acid, and the pancreas releases bicarbonate, so pain often eases after eating and returns a few hours later. Gastric ulcer pain is classically worse with food.',
  'anat-u6-l1-q2':
    'After treatment you need proof that live bacteria are gone. The urea breath test and stool antigen test detect current infection. Serum IgG stays positive long after the bacteria are cleared, and symptoms alone are not reliable.',
  'anat-u6-l1-q3':
    'The left colon is narrower and its stool is formed, so a tumor there tends to obstruct, causing a change in stool caliber or bowel habit. The right colon is wide and its contents are liquid, so tumors there grow large and bleed slowly and silently, often presenting as iron-deficiency anemia.',
  'anat-u6-l1-q4':
    'Dysplasia is abnormal growth that stays within the epithelium. Malignancy becomes invasive when cells break through the basement membrane into the tissue beneath. Size or color alone does not show that boundary has been crossed.',
  'anat-u6-l1-q5':
    'Sudden severe pain with a rigid, board-like abdomen in someone with an ulcer suggests the ulcer has perforated, spilling gastric contents into the peritoneal cavity and causing peritonitis. An upright X-ray can show free air under the diaphragm. It is a surgical emergency.',
  'anat-u6-l1-q6':
    'Blood from the stomach or duodenum is usually digested and turns black (melena). A very fast upper bleed can rush through the gut before it is altered and appear bright red. Color depends on the speed and transit time as well as the source.',
  'anat-u6-l1-q7':
    'Invasion means tumor cells cross tissue boundaries such as the basement membrane and infiltrate surrounding structures, which also lets them spread. A benign tumor can grow large but stays contained and pushes tissue aside. Size alone never proves malignancy.',
  'anat-u6-l2-q1':
    'Lactase, an enzyme on the brush border of the small intestine, splits lactose into glucose and galactose for absorption. When lactase falls, undigested lactose reaches the colon, where bacteria ferment it, causing gas, bloating and diarrhea.',
  'anat-u6-l2-q2':
    'Unabsorbed lactose is fermented by colonic bacteria, which release hydrogen gas. Some is absorbed into the blood and breathed out, so a rise in breath hydrogen after a lactose dose shows malabsorption. Anti-tTG tests for celiac disease and lipase for the pancreas.',
  'anat-u6-l2-q3':
    'A milk allergy is an immune reaction to milk proteins and can cause hives, wheezing or anaphylaxis, so the food must be avoided. Lactose intolerance is a lack of the enzyme lactase, causing bloating and diarrhea that depend on the dose, and it can be managed by limiting lactose or taking lactase.',
  'anat-u6-l2-q4':
    'Cystic fibrosis is caused by inherited CFTR gene mutations, so obesity does not raise its risk. Obesity does raise the risk of gallstones, reflux (GERD) and fatty liver disease (NAFLD).',
  'anat-u6-l2-q5':
    'A concentrated gel taken without water makes the gut contents very hypertonic, so water moves into the intestine by osmosis. During hard running, blood is also diverted away from the gut. The extra fluid and faster transit cause diarrhea; diluting gels and spacing them out helps.',
  'anat-u6-l2-q6':
    'Lactose-free milk only removes the sugar lactose. A milk allergy is an immune reaction to milk proteins such as casein and whey, which are still present. The product helps intolerance, not allergy.',
  'anat-u6-l2-q7':
    'Mass balance only predicts how much lactose stays undigested. Symptoms also depend on how fast it moves through the gut, how much the gut bacteria ferment it and how sensitive the person is, none of which the model includes. Three times the lactose need not mean exactly three times the symptoms.',
  'anat-u7-l1-q1':
    'Both lymphocyte types are made in the bone marrow. B cells also finish maturing there, while T cells travel to the thymus to mature and learn self-tolerance (the B in B cell can be remembered as bone marrow). The spleen and lymph nodes are secondary organs where mature cells meet antigen.',
  'anat-u7-l1-q2':
    'The spleen filters blood and makes antibodies that coat polysaccharide capsules so phagocytes can clear them. Without a spleen, encapsulated bacteria such as Streptococcus pneumoniae, Haemophilus influenzae type b and Neisseria meningitidis cause severe infections, so these vaccines are given.',
  'anat-u7-l1-q3':
    'Lymph from the lower body, including both legs, drains into the thoracic duct, which also collects the left side of the upper body and empties at the junction of the left subclavian and left internal jugular veins. Only the right upper body drains through the right lymphatic duct.',
  'anat-u7-l1-q4':
    'Howell-Jolly bodies are small nuclear remnants inside red cells. A working spleen removes them, so seeing them on a blood smear means the spleen is absent or not working (asplenia).',
  'anat-u7-l1-q5':
    'The thymus deletes T cells that react strongly against self (central tolerance). A thymoma can disrupt that selection, so self-reactive T cells escape and help B cells make antibodies against acetylcholine receptors at the neuromuscular junction, causing myasthenia gravis.',
  'anat-u7-l1-q6':
    'Lymph nodes sample lymph draining from tissues, while the spleen’s white pulp samples blood flowing through it. That makes the spleen the main place where immune responses start against pathogens already in the bloodstream.',
  'anat-u7-l1-q7':
    'An immature T cell is still developing in the thymus and has not finished selection. A mature naive T cell has passed positive and negative selection and left the thymus, but has not met its specific antigen. "Naive" describes activation history; "mature" describes development.',
  'anat-u7-l2-q1':
    'Lymph nodes enlarged by infection are usually soft, tender and movable. A hard, fixed, painless node, especially above the collarbone (Virchow node on the left), suggests cancer spread or lymphoma and needs further investigation.',
  'anat-u7-l2-q2':
    'Infectious mononucleosis often enlarges the spleen, pushing it below the protection of the ribs, where its swollen capsule can rupture with a blow. Contact sports are avoided for several weeks, until the spleen returns to normal size.',
  'anat-u7-l2-q3':
    'Without a spleen, encapsulated bacteria in the blood are not filtered or well opsonized. Overwhelming post-splenectomy infection can progress from fever to septic shock within hours, so any fever needs urgent evaluation and antibiotics.',
  'anat-u7-l2-q4':
    'Eosinophils fight multicellular parasites (helminths) and drive allergic inflammation, so a high eosinophil count points toward allergy, asthma or parasites. Acute bacterial infections typically raise neutrophils, and viral infections often raise lymphocytes.',
  'anat-u7-l2-q5':
    'Secretory IgA is moved across mucosal epithelium into secretions such as saliva, tears and gut fluid. It binds microbes and toxins and blocks them from attaching to cells (neutralization) without strongly activating complement or inflammation. This is called immune exclusion.',
  'anat-u7-l2-q6':
    'Inflammation (redness, heat, swelling, pain) is a general response to tissue injury. Trauma, burns, autoimmune disease, crystals and viruses can all trigger the same signs. Proving a bacterial cause needs evidence of the organism itself, such as a culture.',
  'anat-u7-l2-q7':
    'The intestine’s job is to absorb nutrients, water and electrolytes, so a completely sealed barrier would starve the body. Instead tight junctions, mucus and immune defenses keep microbes out while selective transporters let nutrients in.',
  'anat-u8-l1-q1':
    'The membrane attack complex forms when C5b binds C6, C7, C8 and several C9 molecules. Together they insert a pore into a microbe’s membrane, causing lysis. C3b coats targets (opsonization), and histamine and IgE belong to allergy pathways.',
  'anat-u8-l1-q2':
    'C3b binds to microbial surfaces and is recognized by complement receptors on phagocytes. This coating (opsonization) greatly speeds phagocytosis. C3b also helps build the C5 convertase that leads to the membrane attack complex.',
  'anat-u8-l1-q3':
    'Neisseria species are thin-walled gram-negative diplococci that are killed mainly by the membrane attack complex. People missing C5–C9 can still opsonize but cannot form the lytic pore, so they get recurrent Neisseria infections such as meningococcal disease.',
  'anat-u8-l1-q4':
    'NK cells kill cells that are missing self MHC class I, which viruses and tumors often reduce. Normal self MHC I engages inhibitory receptors on the NK cell and blocks killing. This is the "missing self" model.',
  'anat-u8-l1-q5':
    'TLR4, with its partners CD14 and MD-2, recognizes lipopolysaccharide (endotoxin) in the outer membrane of gram-negative bacteria. Its signaling releases cytokines such as TNF and IL-1, which can drive septic shock.',
  'anat-u8-l1-q6':
    'Opsonization coats a target with antibody or complement so phagocytes recognize and engulf it more easily. Neutralization blocks a toxin or virus from binding to its receptor, preventing harm directly without needing phagocytes.',
  'anat-u8-l1-q7':
    'Antibodies take days to rise after a first exposure. Before then, skin and mucosal barriers, phagocytes, complement and NK cells defend the body. A graph of antibody alone shows only one part of the immune response.',
  'anat-u8-l2-q1':
    'CD8 T cells recognize peptides presented on MHC class I, which almost all nucleated cells display. That lets CD8 cells kill virus-infected or cancerous cells. MHC II, found on antigen-presenting cells, presents to CD4 helper T cells.',
  'anat-u8-l2-q2':
    'IgG is the only antibody class actively transported across the placenta (through FcRn receptors), giving the newborn passive protection for several months. IgM is too large to cross, and IgA reaches the baby through breast milk instead.',
  'anat-u8-l2-q3':
    'Epinephrine is the first treatment for anaphylaxis. It constricts blood vessels (alpha-1), relaxes airway muscle (beta-2) and strengthens the heart (beta-1), and is given intramuscularly in the mid-outer thigh, where it is absorbed fastest. Antihistamines and steroids are only add-ons.',
  'anat-u8-l2-q4':
    'Contact dermatitis (for example from poison ivy or nickel) is type IV, delayed hypersensitivity. Sensitized T cells, not antibodies, cause the reaction, which peaks 48–72 hours after exposure. Types I–III are antibody-mediated.',
  'anat-u8-l2-q5':
    'Live vaccines contain weakened organisms that can still replicate. People with severe combined immunodeficiency lack working T and B cells, so they cannot control even weakened microbes, which can spread and cause serious disease.',
  'anat-u8-l2-q6':
    'In class switching, a B cell changes the constant region of its heavy chain (for example from IgM to IgG or IgA), which changes what the antibody does. The variable region, and therefore which antigen it binds, stays the same. Affinity maturation is a separate process that tunes binding strength.',
  'anat-u8-l2-q7':
    'Memory cells respond faster only to the same antigen they first met. Comparing a first response to one antigen with a second response to a different antigen does not test memory, because no memory cells exist for the new one. The antigen must be held constant.',
  'anat-u9-l1-q1':
    'HIV infection is classified as AIDS when the CD4 count falls below 200 cells/µL or an AIDS-defining opportunistic illness appears. At that level the risk of infections such as Pneumocystis pneumonia rises sharply.',
  'anat-u9-l1-q2':
    'Helper (CD4) T cells release cytokines that activate B cells, cytotoxic T cells and macrophages. A defect in this central coordinator weakens antibody production and cell-mediated responses together. T cells are not antibodies, and immune cells have different jobs.',
  'anat-u9-l1-q3':
    'TRECs (T-cell receptor excision circles) are DNA loops left over when new T cells rearrange their receptor genes in the thymus. Newborn screening counts TRECs from a dried blood spot. Very low or absent TRECs mean few new T cells are being made, a sign of SCID.',
  'anat-u9-l1-q4':
    'In common variable immunodeficiency, B cells fail to mature into antibody-secreting plasma cells. IgG is low, IgA and/or IgM are low, and vaccine responses are poor, leading to recurrent bacterial infections.',
  'anat-u9-l1-q5':
    'HIV’s gp120 binds CD4 on the host cell and then a coreceptor, usually CCR5 (common early in infection) or CXCR4. Coreceptor binding triggers gp41 to fuse the viral and cell membranes. People missing working CCR5 are highly resistant to CCR5-using strains.',
  'anat-u9-l1-q6':
    'A B-cell count only shows that the cells exist. To defend the body they must also be activated, become plasma cells, class switch and secrete working antibody. A defect at any of those steps, as in CVID, impairs antibody defense even when the count is normal.',
  'anat-u9-l1-q7':
    'Viral load measures how much HIV RNA is in the blood, showing how actively the virus is replicating and how well treatment works. CD4 count measures how many helper T cells remain, showing how much immune damage has occurred. They answer different questions.',
  'anat-u9-l2-q1':
    'Internuclear ophthalmoplegia comes from a demyelinated medial longitudinal fasciculus in the brainstem, and heat-triggered worsening (Uhthoff phenomenon) is typical of demyelinated nerves. Both point to multiple sclerosis, a disease of the central nervous system.',
  'anat-u9-l2-q2':
    'Anti-cyclic citrullinated peptide (anti-CCP) antibodies are highly specific for rheumatoid arthritis and can appear before symptoms. ANA is sensitive for lupus but not specific, ASO indicates a recent strep infection, and anti-tTG indicates celiac disease.',
  'anat-u9-l2-q3':
    'Anaphylaxis with low blood pressure is life-threatening, and intramuscular epinephrine in the mid-outer thigh is the first action, given immediately. It reverses vasodilation, leaky vessels and bronchospasm. Antihistamines and steroids are slower add-ons.',
  'anat-u9-l2-q4':
    'Rheumatoid arthritis is inflammatory, so stiffness lasts more than an hour in the morning and affects small joints of the hands and feet symmetrically. Osteoarthritis is wear-related: stiffness is brief, usually under 30 minutes, and it mainly affects weight-bearing joints.',
  'anat-u9-l2-q5':
    'In systemic allergy, mast cells release histamine and other mediators that widen blood vessels and make them leaky. Fluid leaves the circulation and blood pressure falls, which explains the shock. The other options do not change circulating volume.',
  'anat-u9-l2-q6':
    'Myelin insulates axons and lets signals jump between nodes (saltatory conduction). When central myelin is damaged, conduction slows or fails along that pathway. The deficit matches the location: optic nerve lesions blur vision and spinal cord lesions cause weakness or numbness.',
  'anat-u9-l2-q7':
    'Autoimmunity is the immune system attacking the body’s own tissues, as in MS or RA. Immunodeficiency is an immune system too weak to protect against infection, as in SCID or AIDS. One is misdirected activity and the other is missing protection, and a person can have both.',
  'anat-u10-l1-q1':
    'pH 7.30 is acidic (normal 7.35–7.45). PaCO₂ 55 mmHg is high (normal 35–45), and CO₂ forms acid, so retained CO₂ explains the low pH. Low pH plus high CO₂ is respiratory acidosis, usually from hypoventilation.',
  'anat-u10-l1-q2':
    'Air bronchograms appear when air-filled bronchi are surrounded by alveoli filled with fluid, pus or cells, which is consolidation, as in pneumonia. In pneumothorax and pleural effusion the problem is outside the lung tissue.',
  'anat-u10-l1-q3':
    'Capnography graphs exhaled CO₂. With bronchospasm, air empties slowly and unevenly, so CO₂ rises gradually instead of plateauing sharply, giving a sloped "shark fin" shape. It signals obstruction to exhalation, as in asthma or COPD.',
  'anat-u10-l1-q4':
    'Air should not be in the peritoneal cavity. Free air under the diaphragm on an upright X-ray means a hollow organ such as the stomach or bowel has perforated, which is a surgical emergency until proven otherwise.',
  'anat-u10-l1-q5':
    'A pulse oximeter needs a good pulsatile signal. Cold hands, poor perfusion or movement can give a falsely low reading. A clean, regular waveform shows the reading is trustworthy; a flat or noisy one means the probe should be fixed while the patient is assessed.',
  'anat-u10-l1-q6':
    'pH depends on the ratio of bicarbonate to CO₂. If both rise or fall together, as when one disturbance is compensated or two disturbances oppose each other, the ratio and pH can look nearly normal even though both values are very abnormal. Always read the whole blood gas.',
  'anat-u10-l1-q7':
    'Describe first, then interpret. The observation is what is visible: a localized area of increased density (opacity). The interpretation is what may cause it: less air or more material such as fluid or pus in that region, narrowed down by location and clinical context.',
  'anat-u10-l2-q1':
    'Skimming first shows where the easy points are. Answering confident questions banks those points quickly, and flagging hard ones means you return with whatever time remains instead of getting stuck early.',
  'anat-u10-l2-q2':
    'MHC class I is on nearly all nucleated cells and presents to CD8 cytotoxic T cells. MHC class II is on antigen-presenting cells and presents to CD4 helper T cells. A memory trick: 1 × 8 = 8 and 2 × 4 = 8.',
  'anat-u10-l2-q3':
    'High PaCO₂ means CO₂ is not being breathed off fast enough, which is hypoventilation. The retained CO₂ forms carbonic acid and lowers pH, causing respiratory acidosis. Hyperventilation would lower CO₂ and raise pH.',
  'anat-u10-l2-q4':
    'The right main bronchus is wider, shorter and more vertical than the left, so it continues almost straight from the trachea. Aspirated objects and fluid therefore usually enter the right lung.',
  'anat-u10-l2-q5':
    'Shunt: blood flows past alveoli that get no air (perfusion without ventilation), as in pneumonia. Dead space: air reaches alveoli that get no blood (ventilation without perfusion), as with a pulmonary embolus.',
  'anat-u10-l2-q6':
    'A lucky guess gives the right answer without the understanding behind it. Logging it lets you check the reasoning, so you can answer a similar question correctly when the wording or numbers change.',
  'anat-u10-l2-q7':
    'Dead space is subtracted from each breath, not once from the whole minute. Alveolar ventilation = (tidal volume − dead space) × rate = (500 − 150) × 12 = 4,200 mL/min. The faulty formula subtracts 150 mL once and overestimates.',
};
