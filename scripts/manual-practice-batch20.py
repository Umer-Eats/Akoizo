"""Reviewed transcription of public counterparts of existing unconverted listings.
Original PDF pages are preserved; this script only creates answer-sheet drafts.
"""
import copy, json, re
from pathlib import Path
from pypdf import PdfReader

ROOT = Path('output/practice-research/bulk')
DRAFTS = Path('output/practice-research/converted')
SOURCES = json.loads((ROOT / 'batch20-manifest.json').read_text())
SOURCES += json.loads((ROOT / 'batch20-backups.json').read_text())
SOURCES = {s['id']: s for s in SOURCES}

def clean(text):
    return re.sub(r'[ \t]+', ' ', text.replace('\u200b','').replace('\xa0',' ').replace('\xad','-')).strip()

def chunks(text, pattern=r'(?m)^\s*(\d{1,3})[.)]\s*'):
    hits=list(re.finditer(pattern,text))
    result={}
    for i,m in enumerate(hits):
        # Repeated numbers in a nested diagram or unkeyed tiebreaker must not
        # replace the main paper's question with a different prompt.
        result.setdefault(m[1],clean(text[m.end():hits[i+1].start() if i+1<len(hits) else len(text)]))
    return result

class Paper:
    def __init__(self,id,difficulty,reason,topics,match,alignment):
        self.source=SOURCES[id]
        self.pages=[clean(p.extract_text() or '') for p in PdfReader(self.source['paperPath']).pages]
        self.text='\n'.join(self.pages)
        self.blocks=chunks(self.text)
        self.test={k:self.source[k] for k in ['id','sourceId','sourceUrl','division','eventId','competition','year','level','paperUrl','keyUrl']}
        self.test.update(season=2027,reviewedOn='2026-10-09',levelEvidence=None,minutes=50,
            gradingMode='published-key',difficulty=difficulty,difficultyReason=reason,topics=topics,
            topicMatch=match,alignment=alignment,instructions='Answer the written questions using the complete original PDF. For diagrams and tables, inspect the referenced paper page. Type a description or sequence for drawing questions.',
            scoringBasis='Published item weights; original key text is retained.',
            rulesUrl=f"/rules/2027/{self.source['division'].lower()}/{self.source['eventId']}.pdf",questions=[],keys={})
    def page(self,n,default=1):
        pattern=rf'(?<!\d){re.escape(str(n))}[.)](?!\d)'
        return next((i+1 for i,p in enumerate(self.pages) if re.search(pattern,p)),default)
    def prompt(self,n):
        value=self.blocks.get(str(n),'')
        value=re.split(r'(?m)^\s*[a-zA-Z][.)]\s+',value)[0]
        value=re.split(r'(?m)^\s*(?:Instructions:|By:|Part [ABC]:)',value)[0]
        return clean(value) or f'Answer question {n} on the original paper.'
    def frq(self,id,answer,points=1,page=None,prompt=None,accepted=None,context=''):
        id=str(id);q={'id':id,'label':id,'type':'frq','page':page or self.page(id.split('.')[0]),'points':points,'prompt':prompt or self.prompt(id),'context':context}
        if accepted is None:
            accepted=[answer] if len(answer)<55 and not re.search(r'[;,\n]|\b(?:because|and|or|explain)\b',answer,re.I) else []
        self.test['questions'].append(q)
        c={'id':'answer','points':points,'answer':answer,'accepted':accepted}
        if re.fullmatch(r'\d+(?:\.\d+)?%?',answer):
            c['numeric']={'value':float(answer.rstrip('%')),'tolerance':0,'units':['%'] if '%' in answer else [],'unitRequired':False}
        self.test['keys'][id]={'criteria':[c]}
        return q
    def mcq(self,id,correct,points=1,page=None,prompt=None,letters='ABCD',texts=None):
        id=str(id);q={'id':id,'label':id,'type':'mcq','multiple':False,'page':page or self.page(id.split('.')[0]),'points':points,'prompt':prompt or self.prompt(id),'options':[{'id':c,'text':(texts or {}).get(c,c)} for c in letters]}
        assert correct in letters,(id,correct,letters)
        self.test['questions'].append(q);self.test['keys'][id]={'correctOption':correct}
    def finish(self):
        self.test['questionCount']=len(self.test['questions']);self.test['maxScore']=sum(q['points'] for q in self.test['questions'])
        assert len(self.test['keys'])==self.test['questionCount']
        (DRAFTS/(self.test['id']+'.json')).write_text(json.dumps(self.test,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
        print(self.test['id'],self.test['questionCount'],self.test['maxScore'])

WQ_ALIGNMENT='Historical rotation. Estuary ecology, chemistry and monitoring overlap the 2027 marine/estuary rules, but the identification section uses freshwater organisms instead of the required coral-reef flora and fauna.'
WQ_TOPICS=['Freshwater organisms','Estuaries','Water treatment','Water monitoring']
def water(id,difficulty='Medium',reason='The paper combines aquatic ecology, organism identification and interpretation of water monitoring data.'):
    return Paper(id,difficulty,reason,WQ_TOPICS,'different',WQ_ALIGNMENT)

# Same public paper serves both archive divisions. Transcription and keys are identical;
# the B difficulty is separately assessed relative to the B slate.
src='scioly-xv62ffcma0a-c';target='scioly-xv62ffcma0a-b'
t=json.loads((DRAFTS/(src+'.json')).read_text(encoding='utf-8'))
t.update(id=target,division='B',sourceId=SOURCES[target]['sourceId'],rulesUrl='/rules/2027/b/water-quality.pdf')
t['difficultyReason']='For Division B, interpreting the lake/water-cycle diagrams and explaining turnover adds application to basic water quality recall.'
(DRAFTS/(target+'.json')).write_text(json.dumps(t,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

# Adit Ghosh / Trackest: the cover identifies 2013, not the archive's 2014 index season.
for division in ['b','c']:
    p=water('scioly-s8u4tyqcfgc-'+division)
    p.test.update(year=2013,competition='Scioly Study Summer Session — Adit Ghosh')
    key=clean(Path(p.source['keyPath']+'.txt').read_text(encoding='utf-8'))
    key=re.sub(r'(?ms)^\s*6\.\s*\n.*?(?=^\s*7\.)','',key)
    key=re.sub(r'(?ms)^\s*14\.\s*\n.*?(?=^\s*15\.)','',key)
    answers=chunks(key)
    answers={k:clean(re.sub(r'By: Adit Ghosh|Part [ABC]:','',v)) for k,v in answers.items()}
    # The source key transposes 97/98; answers are moved to their matching source prompts.
    answers['97'],answers['98']='2 to 3','Tannins'
    mc={4:'B',5:'D',7:'D',8:'C',9:'A',10:'B',15:'D',16:'B',17:'B',18:'A',**dict(zip(range(71,81),'CCDABBCDBD'))}
    labels=['Storage in ice and snow','Precipitation','Snowmelt runoff to streams','Infiltration','Groundwater discharge','Groundwater storage','Water storage in oceans','Evaporation','Condensation','Water storage in the atmosphere','Evapotranspiration','Surface runoff','Streamflow','Springs','Freshwater storage','Sublimation']
    for n in range(1,134):
        if n==6:
            for letter,answer in zip('ABCDEFGHIJKLMNOP',labels):p.frq('6.'+letter,answer,page=3,prompt=f'Label {letter} in the water cycle diagram.')
        elif n==14:
            bank=dict(zip('ABCDEF',['Advanced Treatment','Disinfection','Preliminary Treatment','Secondary Treatment','Primary Treatment','Solids Handling']))
            for i,c in enumerate('CEDABF',1):p.mcq('14.'+str(i),c,page=5,prompt=f'Match treatment diagram location {i}.',letters='ABCDEF',texts=bank)
        elif n in mc:p.mcq(n,mc[n],letters='ABCD',page=p.page(n))
        elif 64<=n<=70:
            answer=answers[str(n)];name,klass=answer.split(';')
            p.frq(str(n)+'.name',name.strip(),page=p.page(n),prompt=f'Identify organism {n}, including its life stage, in the original diagram.')
            p.frq(str(n)+'.class',klass.strip(),page=p.page(n),prompt=f'Give the pollution tolerance class of organism {n}.')
        elif 81<=n<=85:
            truth={81:'T',82:'F',83:'T',84:'F',85:'F'}[n]
            p.mcq(n,truth,letters='TF',texts={'T':'True','F':'False'})
            if truth=='F':p.frq(str(n)+'.correction',{82:'Replace Mosquito with Cranefly.',84:'Replace Flatworm with Aquatic Sowbug.',85:'Replace Male with Female.'}[n],page=p.page(n),prompt='Replace the incorrect term to make this statement true. Inserting "not" is not allowed.',accepted=[])
        else:
            assert str(n) in answers,('Trackest missing key',n)
            p.frq(n,answers[str(n)])
    p.test['scoringBasis']='Practice weighting: one point per independent answer; original item weights are not specified. Diagram 6 has 16 fields, matching 14 has six, organism 64–70 name/class answers are separate, and false statements require a separate correction. Key entries 97 and 98 are transposed in the source and have been placed against their corresponding prompts (Secchi depth multiplier, tannins). The cover dates the test 2013; the archive indexes it under 2014. Other historical reference wording is preserved.'
    p.finish()

# 2013 three-section paper: retain section weights, excluding the physical salinometer.
for division in ['b','c']:
    p=water('scioly-hskzkf6pfpy-'+division,'Medium' if division=='b' else 'Easy','Mostly direct recall, true/false statements and diagram identification, with estuary classifications and simple pH comparison.')
    p.test['competition']='Unreported competition'
    text=clean(Path(p.source['keyPath']+'.txt').read_text(encoding='utf-8'))
    k1=text.split('Section 1')[1].split('ANSWER KEY FOR WQ TEST')[0]
    k2=text.split('MACROINVERTEBRATES AND INVASIVE SPECIES')[1].split('ANSWER KEY FOR WQ TEST')[0]
    k3=text.split('WATER ANALYSIS')[1]
    a1=chunks(k1);a2=chunks(k2);a3=chunks(k3)
    a1['36']='Any one: landlocked; do not meet the open sea; little or no production; no mixing of fresh and salt water.'
    a1['37']=a1['38']='Any two distinct phenomena across 37 and 38: tidal flushing/tides, water stratification, or weather/seasonal changes.'
    a1['40']='Sanibel Island, FL'
    # Shared open-ended pair stays one field so repeating the same phenomenon cannot earn twice.
    for n in range(1,41):
        if n==38:continue
        if n<=4:p.mcq('S1.'+str(n),'T' if a1[str(n)].lower()=='true' else 'F',page=1,prompt=p.prompt(n),letters='TF',texts={'T':'True','F':'False'})
        else:
            answer=a1[str(n)].split('IF NEEDED')[0].strip()
            p.frq('S1.'+str(n),answer,points=2 if n==37 else 1,page=1 if n<=18 else 2 if n<=34 else 3,prompt=(f'Water ecology: answer question {n} on the paper.' if n!=37 else 'Name two different phenomena that control physical and chemical parameters in estuaries (37–38).'),accepted=[] if n in [36,37,39] else None)
    for n in range(1,16):
        if n==15:p.mcq('S2.15','B',points=2,page=4,prompt='Which macroinvertebrate assemblage indicates poor water quality?',letters='ABC')
        else:p.frq('S2.'+str(n),a2[str(n)],points=2,page=4,prompt=f'Identify organism {n}, including life stage where applicable.' if n<=12 else 'What do images 1, 3, 4 and 6 have in common?' if n==13 else 'What type of life cycle does the stonefly diagram show?',accepted=[] if n in [1,6] else None)
    for n in range(1,25):
        points=1
        if 3<=n<=14:p.mcq('S3.'+str(n),'T' if a3[str(n)].lower()=='true' else 'F',points=points,page=5,prompt=f'Water analysis: true or false for statement {n} on the paper.',letters='TF',texts={'T':'True','F':'False'})
        elif n in list(range(15,23))+[24]:p.mcq('S3.'+str(n),a3[str(n)].upper(),points=points,page=5 if n<=17 else 6,prompt=f'Water analysis: choose the answer to question {n}.')
        else:p.frq('S3.'+str(n),a3[str(n)],page=5 if n<3 else 6,prompt='Give the neutral pH.' if n==1 else 'Which pH is more acidic: 4 or 12?' if n==2 else 'What does NOAA stand for?')
    p.test['scoringBasis']='94 practice points. Section 1: one point per answer (40); Section 2: equal two-point weighting per item (30); Section 3: one point per written item (24). Per-item weights are not printed, so these practice allocations do not reproduce the printed 100-point total. The five-point physical salinometer question S3.25 is excluded. Questions S1.37–38 share one two-point field requiring two distinct phenomena. The source key uses outdated classifications and contains apparent errors (including S1.7 and S3.10); its reference answers are preserved.'
    p.finish()

# Ladera Vista: the PDF contains fractional answers that text extraction drops.
p=Paper('scioly-qelfgcs87uy-b','Hard','Hardy–Weinberg calculations, dihybrid crosses, pedigrees, karyotypes and molecular/cancer genetics demand more than direct recall.',['Inheritance','Population genetics','Cell division','Molecular genetics'],'current','Inheritance, genetics, cell division and molecular biology overlap the local 2027 Heredity B scope.')
answers=chunks(clean(Path(p.source['keyPath']+'.txt').read_text(encoding='utf-8')))
for n in [23,24,25,26]:answers[str(n)]='1/4 (25%)'
for n in range(1,103):
    if n==51:continue
    assert str(n) in answers,('Ladera key missing',n)
    prompt=p.prompt(n);weight=re.search(r'\((\d+) points?\)',prompt,re.I);points=int(weight[1]) if weight else 1
    p.frq(n,answers[str(n)],points=points,accepted=[] if n in [5,8,22] else None)
    if n in [5,8,22]:p.test['questions'][-1]['context']='Type the Punnett-square cells row by row; a text description replaces the drawing.'
p.test['scoringBasis']='Published item weights (one point unless otherwise stated). Question 51 and the separately numbered tiebreakers are excluded because the published key has no entries. Fractions 23–26 were transcribed from rendered key pages; each is 1/4. Punnett squares and stage diagrams accept their complete textual descriptions. Historical key terminology and scientific statements are retained; these are source rubric references.'
p.finish()

# Frankenmuth: handwriting was checked against rendered pages, correcting OCR's
# I/T, E/F and matching-column mistakes. Ambiguous source key/bank entries are unscored.
p=water('scioly-rzshay9v4d8-c','Medium','Requires watershed reasoning, ecology and water monitoring table interpretation in addition to direct organism recall.')
p.frq('A1a','X',page=1,prompt='Which lettered river location is affected when the trees at Z are cleared?')
p.frq('A1b','More erosion, higher temperatures and less food.',points=4,page=1,prompt='Explain how the affected river location would change.',accepted=[])
p.frq('A1c','Higher',page=1,prompt='How does the watershed boundary elevation compare with the rivers?')
p.frq('A1d','Cullen River',page=1,prompt='Which river is affected by pollution dumped at B?')
p.frq('A2','Fallen leaves from trees',page=1,prompt='What is the main producer in the river food web?')
p.frq('A3','Insects',page=1,prompt='What eats that producer?')
p.frq('A4','Any three: provide food; shade/cooler temperature; increase dissolved oxygen; reduce pollution; reduce erosion.',points=3,page=1,prompt='Name three things trees do to help rivers.',accepted=[])
for n,c in enumerate('ADAADBCCADBDCBC',5):p.mcq('A'+str(n),c,page=1 if n==5 else 2 if n<=13 else 3,prompt=f'Part A: choose the answer to question {n}.')
for n,c in enumerate('TFTFTTFTTFF',20):p.mcq('A'+str(n),c,points=2,page=3 if n<=25 else 4,prompt=f'Part A: true or false for statement {n}.',letters='TF',texts={'T':'True','F':'False'})
for n,c in enumerate('AHLGIFAJMKE',31):
    if n in [35,37]:p.frq('A'+str(n),f'Not scored: the published key gives {c}, which conflicts with the term bank for this definition.',points=0,page=4,prompt=f'Part A: match definition {n} using the original term bank.',accepted=[])
    else:p.mcq('A'+str(n),c,page=4,prompt=f'Part A: match definition {n} using the original term bank.',letters='ABCDEFGHIJKLM')
names=['Mayfly','Air breathing snail','Dragonfly','Deerfly','Waterscorpion','Blood midge','Dobsonfly','Spiny waterflea','Tubifex','Scud','Water Hyacinth','Flatworm','Blackfly','Cranefly','Water penny','Water boatman','Predacious diving beetle','Purple loosestrife','Asian tiger mosquito','Water mites','Riffle beetle','Whirligig beetle','Giant water bug']
classes=['1','4','2','4','1','4','1','invasive','4','2','invasive','3','3','2','1','5','5','invasive','invasive','3','1','5','5']
for n,(name,klass) in enumerate(zip(names,classes),1):
    page=5+(n-1)//6
    p.frq('B'+str(n)+'.name',name,page=page,prompt=f'Identify Part B organism {n}.')
    p.frq('B'+str(n)+'.class',klass,page=page,prompt=f'Give its tolerance class or invasive status (organism {n}).')
p.frq('B24','Egg → larva → pupa → adult, returning to egg.',points=8,page=9,prompt='Describe the complete caddisfly life cycle in place of the drawing.',accepted=[])
p.frq('B25','Infiltrate river systems; do not occupy the Great Lakes. The concern is Asian carp entering/infiltrating the river/lake ecosystem.',points=8,page=9,prompt='Explain the main concern with Asian carp entering the Great Lakes ecosystem.',accepted=[])
foods=['Algae/diatoms/mosses or other macroinvertebrate larvae','Organic litter','Organic litter/algae','Larvae: organic litter/algae','Carnivores: flesh/fluids of animals','Predators: aquatic larvae and bloodworms','Filter feeders: plankton','Predator: zooplankton (daphnia/crustaceans)']
for letter,organism,answer in zip('abcdefgh',['Stonefly','Aquatic sowbug','Scuds','Midge','Leech','Back swimmer','Zebra mussel','Spiny water flea'],foods):p.frq('B26'+letter,answer,page=9,prompt=f'Name the main food sources of {organism}.',accepted=[])
p.frq('C1','Collect two samples without bubbles; perform and record the first dissolved oxygen test; store the other sample in darkness for five days; test its DO and record; subtract day-five DO from day-one DO.',points=6,page=9,prompt='Explain the steps of a Biological Oxygen Demand test.',accepted=[])
p.frq('C2a','Any two: less turbulence/aeration; less shade; hotter temperatures.',points=4,page=9,prompt='Name two things that decrease dissolved oxygen.',accepted=[])
p.frq('C2b','To avoid temperature changes and mixing/stirring the sample.',points=2,page=9,prompt='Why must the DO test be performed at the lake or pond?',accepted=[])
for letter,answer in zip('abcdefghi',['Dissolved oxygen','Fecal coliform','Phosphates and nitrates','pH','Turbidity','Total solids','BOD','Salinity','Temperature']):p.frq('C3'+letter,answer,points=2 if letter=='c' else 1,page=10,prompt=f'Name the water test(s) for Part C question 3{letter}.')
c={
 '4a':(1,'Scary Creek'), '4b':(4,'Shade keeps the water cooler; rapids aerate the water.'), '4c':(3,'Scary Creek: rocks provide insect habitat.'),
 '5a':(2,'C and D'), '5b':(4,'Any two: fertilizer runoff, feces, soaps.'), '5c':(2,'Dilution or being used up.'),
 '6a':(1,'Medium / fair'), '6b':(3,'Small numbers of class 1/2 organisms and larger numbers of classes 3/4/5.'),
 '7a':(2,'Common sunfish and black bullhead'), '7b':(2,'Lower metabolism in cold winter water.'), '7c':(1,'Cold'), '7d':(4,'DO is the amount of oxygen in the water. Percent saturation compares it with the amount water could hold at its temperature.'),
 '8a':(2,'All species except mosquito larvae cannot survive.'), '8b':(2,'A general overall health assessment: quick, easy and cheap.'), '9':(5,'Water is too cloudy for photosynthetic organisms to function, so the food web can collapse.')}
for n,(weight,answer) in c.items():p.frq('C'+n,answer,points=weight,page=10 if n[0] in '456' else 11 if n[0]=='7' or n=='8a' else 12,prompt=f'Answer Part C question {n} using the original data table or prompt.',accepted=[])
p.test['scoringBasis']='188 available written points from the 200-point paper. The ten-point physical salinometer station is excluded. Matching A35 and A37 have source-key/term-bank conflicts and remain visible as zero-point questions. All other printed weights are retained, including two points per Part A true/false item. Name/class pairs have separate one-point fields. Drawing B24 is answered as a textual life-cycle sequence. The handwritten key uses legacy classifications and terse reference explanations; those source references are preserved.'
p.finish()

# Kraemer tectonics paper: point-by-point letter and prose references.
p=Paper('scioly-uhagh2cy2g0-b','Hard','The Wilson cycle explanation, seismic discontinuities and mantle-plume reasoning require detailed tectonic synthesis.',['Plate tectonics','Wilson cycle','Earth structure'],'different','Historical tectonics rotation; the 2027 Dynamic Planet B paper focuses on freshwater hydrology.')
for n,c in enumerate('DDADCACEBBDAECCEC DCD'.replace(' ',''),1):p.mcq(n,c,letters='ABCDE')
for n,c in enumerate('HLIDJKGBMNPFAOCE',21):p.mcq(n,c,letters='ABCDEFGHIJKLMNOP',prompt=f'Match definition {n} to the term bank on the original paper.')
for i,c in enumerate('EDF ACB'.replace(' ',''),1):p.frq('37.'+str(i),c,page=p.page(37),prompt=f'Place the diagram at position {i} in the requested chronological order.')
for n,c in enumerate('FCDEABEDCAF',38):p.frq(n,c,prompt=f'Label diagram location {n} using the letter bank on the paper.')
for n,answer in enumerate(['Panthalassic Ocean','Paleo-Tethys Ocean','Tethys Ocean','Pangea','Gondwana'],49):p.frq(n,answer)
key=clean(Path(p.source['keyPath']+'.txt').read_text(encoding='utf-8'));a=chunks(key)
for n,points in [(54,9),(55,4),(56,3),(57,2)]:p.frq(n,a[str(n)],points=points,accepted=[])
p.test['scoringBasis']='76 available points from the published item weights; the printed 77-point total is one point higher. Question 37 has six one-point positions. Question 54 retains the printed nine-point item weight despite a more detailed subdivision in the key. Source prose references are retained verbatim.'
p.finish()

# Kraemer Solar System: each published subpart gets its own field.
p=Paper('scioly-h1c51pwvpm8-b','Hard','Binary-star masses and Kepler calculations combine with detailed planetary geology and formation explanations.',['Orbital mechanics','Terrestrial planets','Planetary geology','Moons','Asteroids'],'different','Historical terrestrial-planet/geology paper. The 2027 Solar System B rules focus on habitability of named Solar System objects and extrasolar systems; only some orbital mechanics and planetary geology overlap.')
key=clean(Path(p.source['keyPath']+'.txt').read_text(encoding='utf-8'))
sections=chunks(key,r'(?m)^\s*(\d+)\.\s*(?=[A-Z])')
weights={1:[2,2,1,2],2:[2,2,2,1,1,2],3:[1,1,1,1,1,1,2,1],4:[1,2,1,1,4,3,1],5:[2,2,2],6:[1,2,1,1,1,2,1,1,1,1],7:[1,1,2,1,1,1,6,1,1,1,1,1,1],8:[1,1,1,1],9:[1,1,1],10:[1,2,1,2,1]}
for n,values in weights.items():
    subs=chunks(sections[str(n)],r'(?m)^\s*([a-z])\.\s*')
    for letter,points in zip('abcdefghijklmnopqrstuvwxyz',values):
        answer=clean(subs[letter].replace('Answer Key to Solar System Test',''))
        p.frq(str(n)+letter,answer,points=points,page=p.page(n),prompt=f'Answer Solar System question {n}{letter} using the original paper and image sheet.',accepted=[])
p.test['scoringBasis']='90 points, retaining every published subpart weight. The image sheet supplies the referenced planetary features; drawings can be described in text. Subparts with several required facts are evaluated against the complete published rubric. The archive/wikipedia source dates this scrimmage to the 2018 season; the undated paper itself does not confirm a calendar year.'
p.finish()

# Albany / Capital District: one scanned page of answers, checked visually.
p=water('scioly-7zo0gqqt8fe-c','Easy','Mostly introductory ecology, treatment steps and organism identification, without demanding calculations.')
p.test['competition']='Albany Invitational (Capital District)'
answers=chunks((ROOT/'key-ocr-1.txt').read_text());paper=(ROOT/'paper-ocr-1.txt').read_text();blocks=chunks(paper)
mc={1:'D',4:'C',10:'A',14:'C',15:'B',31:'D',33:'B'}
for n in range(1,36):
    page=1 if n<=9 else 2 if n<=16 else 3 if n<=21 else 4 if n<=27 else 5
    prompt=blocks.get(str(n),f'Answer question {n} on the original paper.')
    if n in [2,3]:prompt=f'Fill nitrogen cycle chart box {n}.'
    if 5<=n<=9:prompt=f'Potable water treatment step {n-4}.'
    if 11<=n<=13:prompt=f'Drinking water standards step {n-10}.'
    if n in mc:p.mcq(n,mc[n],page=page,prompt=prompt)
    else:p.frq(n,answers[str(n)],page=page,prompt=prompt)
p.test['scoringBasis']='Practice weighting: one point per written response (35 points); original per-item weights are not stated. The key includes an extra salinometer answer 36, which has no question in the uploaded test and is excluded. Key entry 34 contains a handwritten alternative “or Turbidity”; the printed answer Total solids is used for this definition.'
p.test['keys']['34']['criteria'][0].update(answer='Total solids',accepted=['Total solids'])
p.finish()

# Phoenix: highlighted choice keys were visually transcribed, not inferred.
p=water('scioly-ptotyqnngbw-c','Easy','Routine ecology recall, one-step table interpretation and common freshwater organism identification.')
for n,c in enumerate('BDDABDACDCACDCBBDCAB',1):
    p.mcq(n,c,letters='ABCDE' if n in [2,3,12] else 'ABCD')
for n,answer in [(21,'non-point'),(22,'How quickly ground water moves.'),(23,'Water dissolves most substances.'),(24,'7.0–9.0'),(25,'calcium and magnesium')]:p.frq(n,answer)
for n,name,klass in zip(range(26,36),['Stonefly','Water Penny','Gilled Snail','Dragonfly','Mayfly','Riffle Beetle','Caddisfly','Leech','Damselfly','Crane Fly'],[4,4,4,3,4,4,4,2,3,3]):
    page=5 if n<=31 else 6
    p.frq(str(n)+'.name',name,page=page,prompt=f'Identify organism {n} in the original photograph.')
    p.frq(str(n)+'.index',str(klass),page=6,prompt=f'Give the pollution tolerance index value for organism {n}.')
p.frq('index-work','Show the weighted sum using the source class values. The printed key uses (4 × 6) + (3 × 3) + (2 × 2) + (1 × 0) = 37; the listed ten organism values actually sum to 35. Either consistent calculation is accepted.',page=6,prompt='Show your cumulative pollution tolerance index calculation.',accepted=[])
p.frq('index-total','37 (published total) or 35 (sum of the listed ten values)',page=6,prompt='Give the cumulative pollution tolerance index.',accepted=['37','35'])
p.test['scoringBasis']='Practice weighting: one point per independent written response (47 points); original per-item weights are unspecified. Names, tolerance values, calculation work and total have separate fields. The physical salinometer is excluded. The published key totals 37 but its listed ten index values sum to 35; either total is accepted with corresponding work.'
p.finish()
