"""Reviewed Division C archive mappings. No AI conversion requests are made."""
import copy
import json
import re
import sys
from pathlib import Path
from runpy import run_path

helpers = run_path('scripts/offline-practice-conversion.py')
clean, numbered, options, pages = (helpers[name] for name in ['clean', 'numbered', 'options', 'pages'])

ROOT = Path('output/practice-research/division-c')
SOURCES = {s['sourceId']: s for s in json.loads((ROOT / 'authenticated-manifest.json').read_text(encoding='utf-8'))}
DRAFTS = Path('output/practice-research/converted')
DRAFTS.mkdir(parents=True, exist_ok=True)
reviewed = []


class Paper:
    def __init__(self, source_id, **metadata):
        self.source = SOURCES[source_id]
        self.pp = pages(self.source['paperPath'])
        self.test = {k: self.source[k] for k in ['id', 'sourceId', 'sourceUrl', 'division', 'eventId', 'competition', 'year', 'level', 'paperUrl', 'keyUrl']}
        self.test.update(season=2027, reviewedOn='2026-10-11', levelEvidence=None, minutes=50,
                         gradingMode='published-key', rulesUrl=f"/rules/2027/c/{self.source['eventId']}.pdf",
                         instructions='Read the complete original paper, including diagrams and tables. Answer every labeled part. Submit for free checks; click Auto Grade to check unresolved written explanations.',
                         scoringBasis='Published question weights.', questions=[], keys={})
        self.test.update(metadata)
        if self.test['level'] and not self.test.get('levelEvidence'):
            self.test['levelEvidence']={'sourceUrl':self.source['sourceUrl'], 'text':self.source.get('levelText',self.source['competition']), 'basis':'Competition reported by the Scioly archive; no inferred tournament tier.'}

    def mcq(self, id, prompt, choices, correct, points=1, page=1, accepted=None, option_points=None):
        selected = correct if isinstance(correct,list) else [correct]
        assert all(c in [o['id'] for o in choices] for c in selected), (id, choices, correct)
        self.test['questions'].append(dict(id=id, label=f'Question {id}', prompt=prompt, type='mcq', multiple=isinstance(correct,list), options=choices, points=points, page=page))
        self.test['keys'][id] = ({'correctOptions':correct} if isinstance(correct,list) else {'correctOption':correct})
        if option_points:
            self.test['keys'][id]['optionPoints']=option_points
        if accepted:
            self.test['keys'][id]['acceptedOptions']=accepted

    def frq(self, id, prompt, answer, points=1, page=1, numeric=None, accepted=None, criteria=None):
        self.test['questions'].append(dict(id=id, label=f'Question {id}', prompt=prompt, type='frq', points=points, page=page,
                                         context=clean('\n'.join(self.pp[max(0, page-2):page+1]))[:24000]))
        criterion = dict(id='answer', answer=answer, points=points, accepted=accepted or [])
        if numeric:
            criterion['numeric'] = numeric
        self.test['keys'][id] = {'criteria': criteria or [criterion]}

    def finish(self):
        self.test.update(questionCount=len(self.test['questions']), maxScore=sum(q['points'] for q in self.test['questions']))
        (DRAFTS / (self.test['id'] + '.json')).write_text(json.dumps(self.test, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        reviewed.append(self.source)
        print(self.test['id'], self.test['questionCount'], self.test['maxScore'])


def numeric(value, tolerance=0, units=None, required=False):
    return dict(value=value, tolerance=tolerance, units=units or [], unitRequired=required)


if '6p22EE45syM' in SOURCES:
    p = Paper('6p22EE45syM', competition='Captain’s Summer Exchange — Garnet Valley High School', year=2025,
              difficulty='Medium', difficultyReason='Rate-law applications, integrated rate equations, Arrhenius calculations, limiting reagents, and solubility mix recall with routine multi-step chemistry.',
              topics=['Kinetics', 'Stoichiometry', 'Solubility', 'Organic reactions'], topicMatch='different',
              alignment='Historical rotation: kinetics overlaps the 2027 rules, but stoichiometry, solubility and organic reactions replace the current gases focus.',
              scoringBasis='30 MCQs at one point each plus published FRQ weights (5, 4, 4, 4, 4, 3, 3), totaling 57, not the cover’s 60. Cover dates Summer 2025; archive indexes season 2026. Two appended solution pages are removed from the student PDF. For MCQ 27, C and D express identical units; both are accepted although the key marks D.')
    layout = Path(p.source['paperPath']).with_suffix('.layout.txt').read_text(encoding='utf-8').split('\f')
    # Remove only repeated page furniture; retain every line of the actual question.
    layout = ['\n'.join(line for line in page.splitlines() if not re.match(r'^\s*(?:CSE 2025|Page\s+\d+)', line)) for page in layout]
    text = '\f'.join(layout)
    mc_text, fr_text = text.split('Section B: FRQs [30 pts]')
    mc = numbered(mc_text.split('\f'))
    fr = numbered(fr_text.split('\f'))
    key = ''.join(pages(p.source['keyPath'])[1:2])
    key_pairs = {str(n): c.upper() for n, c in re.findall(r'(?<!\d)(\d{1,2})\.\s+([a-d])\b', key)}
    assert len(mc) == len(key_pairs) == 30 and len(fr) == 7
    for n, block in mc.items():
        value = block['text'].split('Section A:')[0]
        parsed = options(value)
        assert parsed and len(parsed[1]) == 4, n
        p.mcq(f'MC-{n}', parsed[0], parsed[1], key_pairs[str(n)], page=block['page'], accepted=['C','D'] if n == 27 else None)
    answers = [
        'Rate = k[A][B]^2 = 0.500 x 0.2 x (0.1)^2 = 0.0010 mol L^-1 s^-1.',
        'ln(0.40/0.80) = -k(300); k = 2.31 x 10^-3 s^-1.',
        'C3H8O + 4.5 O2 -> 3 CO2 + 4 H2O. The net ionic equation is the same molecular combustion equation. Molar mass is approximately 60.1 g/mol; 100/60.1 = 1.664 mol 2-propanol, requiring 7.49 mol O2.',
        'First order in Cl2 and second order in NO. The published key suggests an elementary rate-determining step involving two NO molecules and one Cl2 molecule (termolecular).',
        'Ag2CrO4 <-> 2Ag+ + CrO4^2-. Let solubility be x. Ksp = (2x)^2(0.2) = 0.8x^2 = 1.2 x 10^-12; x = 1.22 x 10^-6 M.',
        'k2/k1 = exp[(75000/8.314)(1/300 - 1/320)] = exp(1.878) = 6.54.',
        'Benzyl chloride is limiting. Reaction: C6H5CH2Cl + NaOH -> C6H5CH2OH + NaCl. The 1:1 ratio yields 0.0948 mol benzyl alcohol; at 108.1 g/mol the theoretical yield is approximately 10.24 g.',
    ]
    for n, block in fr.items():
        prompt = block['text'].split('KEY:')[0].strip()
        points = [5,4,4,4,4,3,3][n-1]
        # Questions requesting calculations retain method credit through rubric grading.
        p.frq(f'FR-{n}', prompt, answers[n-1], points=points, page=6 if n<=5 else 7)
    p.finish()


if 'UtChox7hyCM' in SOURCES:
    p = Paper('UtChox7hyCM', year=2017,
              difficulty='Medium', difficultyReason='Digestive, respiratory, and immune physiology combine recall with clinical cases and MHC/viral antigen interpretation.',
              topics=['Digestive system', 'Respiratory system', 'Immune system'], topicMatch='current',
              alignment='The digestive, respiratory and immune systems match the 2027 rotation. The cover dates December 2017; Scioly indexes the 2018 season.',
              scoringBasis='Published one-point items 1–49. Written items 50–53 are retained as zero-point tiebreakers, as directed by the test, rather than added to the percentage score. The appended answer section is removed from the student copy; diagram choices remain in the original paper.')
    qs = numbered(p.pp)
    kt = '\n'.join(pages(p.source['keyPath']))
    codes = {int(n):(answer,int(points)) for n,answer,points in re.findall(r'(\d+)\.\s*ANS:\s*([A-FT])\s+PTS:\s*(\d+)',kt)}
    assert len(qs) == 53 and len(codes) == 49, (len(qs), len(codes))
    for n in range(1,50):
        answer, points = codes[n]
        block = qs[n]
        if n <= 4:
            prompt = block['text']
            choices = [{'id':'T','text':'True'},{'id':'F','text':'False'}]
        else:
            parsed = options(block['text'])
            if n == 13:
                parsed = (block['text'].split('\na.')[0], [{'id':c,'text':f'Diagram {c} — see the original paper'} for c in 'ABC'])
            assert parsed, (n,block['text'])
            prompt, choices = parsed
            if n == 49:
                choices[-1]['text'] = choices[-1]['text'].split('TIE BREAKERS')[0].strip()
        p.mcq(str(n),prompt,choices,answer,points=points,page=block['page'])
    for n, answer in zip(range(50,54),[
        'Sudden involuntary contraction of the diaphragm against a closed glottis, with contraction of the larynx.',
        'Lubrication to allow effortless sliding of the visceral and parietal pleura.',
        'Thymus.',
        'The spleen mainly acts as a filter for purifying the blood, removing microbes and worn out or damaged red blood cells. It is also an important organ in the immune system, producing the white blood cells that fight infection and synthesize antibodies.',
    ]):
        p.frq(str(n),qs[n]['text'],answer,points=0,page=qs[n]['page'])
    p.finish()

if 'AgTfLowr5B8' in SOURCES:
    sys.path.insert(0, 'output/practice-research/python-packages')
    import pymupdf
    p = Paper('AgTfLowr5B8', competition='Captain’s Summer Exchange — Castro Valley High School',
              difficulty='Medium', difficultyReason='Combines DC circuits, Coulomb and magnetic forces, transformers and solenoids with explanations and multi-step calculations.',
              topics=['DC circuits', 'Electric fields', 'Magnetism', 'Transformers'], topicMatch='current',
              alignment='Electricity, circuits and magnetism overlap the 2027 Circuit Lab topics; this historical written paper does not replace the current hands-on tasks.',
              scoringBasis='Published MCQ weights and explicit +point rubric components. The item labels sum to 95 rather than the cover’s 96. Question 47 is labeled two points but its key allocates only one, so only that documented point is available. The resulting score is out of 94. The cover identifies the 2025–26 exchange season.')
    qs, ks = numbered(p.pp), numbered(pages(p.source['keyPath']))
    assert len(qs) == len(ks) == 50
    correct = {}
    current = None
    for pg in pymupdf.open(p.source['keyPath']):
        for block in pg.get_text('dict')['blocks']:
            for line in block.get('lines', []):
                spans = line['spans']
                text = clean(''.join(span['text'] for span in spans))
                num = re.match(r'^(\d{1,2})\.', text)
                if num:
                    current = int(num[1])
                letter = re.match(r'^([a-e])\.', text)
                if letter and any('Bold' in span['font'] for span in spans):
                    correct.setdefault(current, []).append(letter[1].upper())
    assert set(correct) == set(range(1,35)) and all(len(v)==1 for v in correct.values())
    for n in range(1,35):
        block = qs[n]
        parsed = options(block['text'])
        assert parsed, n
        marks = re.findall(r'\[(\d+)\]', parsed[0])
        assert len(marks) == 1, n
        p.mcq(str(n),parsed[0],parsed[1],correct[n][0],points=int(marks[0]),page=block['page'])
    for n in range(35,51):
        components = re.findall(r'\+(\d+)\s+for\s+(.*?)(?=\+\d+\s+for|$)',ks[n]['text'],re.S)
        assert components, n
        criteria = [dict(id=f'component-{i+1}',points=int(weight),answer=clean(answer),accepted=[]) for i,(weight,answer) in enumerate(components)]
        maximum = sum(c['points'] for c in criteria)
        if n == 35:
            criteria[0]['numeric'] = numeric(.25,.00001,['A','amp','amps','amperes'])
        p.frq(str(n),qs[n]['text'], '\n'.join(c['answer'] for c in criteria), points=maximum,page=qs[n]['page'],criteria=criteria)
    assert sum(q['points'] for q in p.test['questions']) == 94
    p.finish()


if 'kfn4WOUkuq4' in SOURCES:
    from pypdf import PdfReader
    p = Paper('kfn4WOUkuq4', competition='Captain’s Summer Exchange — Henry M. Gunn High School',year=2025,
              difficulty='Medium', difficultyReason='Astronomy recall is combined with dimensional analysis, parallax, inverse-square irradiance and a black-hole radius derivation.',
              topics=['Stellar evolution', 'Star formation', 'Exoplanets', 'Galaxies', 'Cosmology'],topicMatch='different',
              alignment='Historical star-formation and exoplanet emphasis; stellar evolution, galaxies and cosmology overlap the 2027 normal/starburst-galaxy focus, but this is not the same subject rotation.',
              scoringBasis='Published one-point items, three points for question 16, and four points each for 33–36: 50 points total. The cover says CSE 2025 while the archive lists season 2026. Written work and the published partial-credit instructions are retained.')
    qp = [pg.extract_text(extraction_mode='layout') or '' for pg in PdfReader(p.source['paperPath']).pages]
    kp = [pg.extract_text(extraction_mode='layout') or '' for pg in PdfReader(p.source['keyPath']).pages]
    qs, ks = numbered(qp), numbered(kp)
    assert len(qs)==len(ks)==36
    for n in range(1,37):
        block, answer = qs[n], ks[n]['text']
        if re.fullmatch('[A-E]',answer):
            parsed = options(block['text'])
            assert parsed, n
            p.mcq(str(n),parsed[0],parsed[1],answer,page=block['page'])
        else:
            points = 3 if n==16 else 4 if n>=33 else 1
            accepted = {'3':['Main Sequence','main-sequence'],'4':['Pauli Exclusion Principle'], '11':['Accretion']}.get(str(n),[])
            # Requested reasoning/calculation work remains rubric graded for partial credit.
            p.frq(str(n),block['text'],answer,points=points,page=block['page'],accepted=accepted)
    assert sum(q['points'] for q in p.test['questions'])==50
    p.finish()


if 'aT4qRN55nYs' in SOURCES:
    p = Paper('aT4qRN55nYs', difficulty='Easy',
              difficultyReason='One hundred multiple-choice items emphasize direct freshwater ecology, organism, monitoring and water-treatment knowledge.',
              topics=['Freshwater ecology', 'Freshwater organisms', 'Water monitoring', 'Water treatment'],topicMatch='different',
              alignment='Historical freshwater ecology and organisms differ from the 2027 marine/estuary and coral-reef organism rotation; monitoring and treatment concepts overlap.',
              scoringBasis='Practice weighting: one point per MCQ; no original item weights are specified. The Division C source has 100 questions and its own published key; it is distinct from the 50-question Division B paper.')
    qs = numbered(p.pp)
    kt = '\n'.join(pages(p.source['keyPath']))
    keys = {int(n):letter for n,letter in re.findall(r'(\d+)\.\s*([A-D])\b',kt)}
    assert re.search(r'\b1B\b',kt)
    keys[1]='B'
    assert len(qs)==len(keys)==100
    for n,block in qs.items():
        parsed = options(block['text'])
        assert parsed, n
        p.mcq(str(n),parsed[0],parsed[1],keys[n],page=block['page'])
    p.finish()


structure_helpers=run_path('scripts/analyze-archive-structure.py')


def font_answers(path, max_pages=None, stop_heading=None):
    import pymupdf
    answers={}
    section='1'
    number=None
    for pg in list(pymupdf.open(path))[:max_pages]:
        for block in pg.get_text('dict')['blocks']:
            for line in block.get('lines',[]):
                spans=line['spans']
                text=clean(''.join(span['text'] for span in spans))
                if stop_heading and text == stop_heading:
                    return answers
                match=re.match(r'^(?:Section|Part)\s+(\d+)',text,re.I)
                if match:
                    section=match[1]
                match=re.match(r'^(\d+)[.)]',text)
                if match:
                    number=int(match[1])
                match=re.match(r'^([a-h])[.)]',text)
                if match and any('Bold' in span['font'] for span in spans):
                    answers.setdefault((section,number),[]).append(match[1].upper())
    return answers


for source_id,metadata in {
    'lrnB7z692h0':dict(competition='Captain’s Summer Exchange — North Hollywood High School',year=2025,
        difficulty='Medium',difficultyReason='Ocean circulation, waves, tides, marine sediments and climate-change explanations combine interpretation with routine physical-oceanography calculations.',
        topics=['Oceanography','Plate tectonics','Waves and tides','Marine sediments','Climate change'],topicMatch='different',
        alignment='Historical oceanography rotation differs from the 2027 freshwater focus; hydrology and climate concepts overlap.',
        scoringBasis='Published per-question weights and written rubric components; practice weighting of one point for unmarked MCQ 2-4. These item weights total 89, while the cover says 90 and several section totals disagree with their items. MCQ 9-3 uses E–H on the student paper and A–D in the key; key D maps by identical option text to student H. Repeated question numbers are prefixed with their original section. Each written field includes all parts of that numbered problem.'),
    'wg1QUXfMdEc':dict(competition='Captain’s Summer Exchange — Novi High School',year=2025,
        difficulty='Hard',difficultyReason='Linkage, pedigrees, population genetics, molecular regulation and sequencing require probability calculations and detailed explanations.',
        topics=['Mendelian genetics','Cell division','Population genetics','Molecular genetics','Gene regulation','Biotechnology'],topicMatch='current',
        alignment='Core genetics, inheritance, population genetics, gene regulation and biotechnology overlap the 2027 Designer Genes rules.',
        scoringBasis='Published +point markings. Multiple-select questions 4-13 and 4-15 award one point per correct selection; the key specifies no incorrect-selection penalty. Section 3 question 9’s final 0.4 is corrected to 0.6, consistent with the key’s own p=1−0.4 calculation. The source image for question 1-4 is transcribed into the written reference.'),
}.items():
    if source_id not in SOURCES:
        continue
    p=Paper(source_id,**metadata)
    read_pages=structure_helpers['read_pages']
    split_sections=structure_helpers['sections']
    qs=split_sections(read_pages(p.source['paperPath']))
    ks=split_sections(read_pages(p.source['keyPath']))
    bold=font_answers(p.source['keyPath']) if source_id=='lrnB7z692h0' else {}
    assert {s:set(v) for s,v in qs.items()}=={s:set(v) for s,v in ks.items()}
    for section,items in qs.items():
        for n,block in items.items():
            id=f'{section}-{n}'
            key_text=ks[section][n]['text']
            parsed=options(block['text'])
            key_options=options(key_text)
            if source_id=='lrnB7z692h0' and id=='9-3':
                parsed=(block['text'].split('\n e.')[0], [{'id':letter.upper(),'text':answer.strip()} for letter,answer in re.findall(r'(?m)^\s*([e-h])\.\s*(.*)',block['text'])])
                assert len(parsed[1])==4
                bold[(section,n)]=['H']
            marked={o['id']:int(re.findall(r'\[\+(\d+)\]',o['text'])[0]) for o in key_options[1] if re.search(r'\[\+(\d+)\]',o['text'])} if key_options else {}
            if parsed and (marked or (section,n) in bold):
                correct=list(marked) if marked else bold[(section,n)]
                assert len(correct)==len(set(correct))
                if source_id=='lrnB7z692h0':
                    weights=re.findall(r'\((\d+)\)',parsed[0])
                    assert not weights or int(weights[-1])==1,id
                    points=1  # Unmarked 2-4 fits the section's published ten-point total.
                else:
                    points=sum(marked.values())
                p.mcq(id,parsed[0],parsed[1],correct if len(correct)>1 else correct[0],points=points,page=block['page'],option_points=marked if len(correct)>1 else None)
            else:
                if source_id=='lrnB7z692h0':
                    weights=re.findall(r'\((\d+)\)\s*(?:$|\n)',block['text'])
                    assert weights,id
                    points=int(weights[0])
                    assert points in [2,3,4],(id,points)
                else:
                    weights=re.findall(r'\[\+(\d+)\]',key_text)
                    assert weights,id
                    points=int(weights[0])
                normalized_question=re.sub(r'\s+',' ',block['text'])
                normalized_key=re.sub(r'\s+',' ',key_text)
                answer=normalized_key[len(normalized_question):].strip() if normalized_key.startswith(normalized_question) else key_text
                if source_id=='wg1QUXfMdEc' and id=='1-4':
                    answer += ' Both parents produce gametes RY, Ry, rY, ry. The Punnett grid rows in that order are: RRYY, RRYy, RrYY, RrYy; RRYy, RRyy, RrYy, Rryy; RrYY, RrYy, rrYY, rrYy; RrYy, Rryy, rrYy, rryy. Two points for the 4x4 grid with correct gamete headings and four points for correct crosses.'
                if source_id=='wg1QUXfMdEc' and id=='3-9':
                    answer=re.sub(r'Answer:\s*0\.4', 'Answer: 0.6',answer)
                p.frq(id,block['text'],answer,points=points,page=block['page'])
    assert p.test['questions']
    print('SECTION TOTALS',source_id,{section:sum(q['points'] for q in p.test['questions'] if q['id'].startswith(section+'-')) for section in qs})
    p.finish()


if 'gOlgkCArvYw' in SOURCES:
    p=Paper('gOlgkCArvYw', competition='Captain’s Summer Exchange — Evergreen Valley High School', year=2025,
        difficulty='Hard', difficultyReason='Detailed inheritance, population genetics, gene regulation and biotechnology questions require multi-step reasoning and explanations.',
        topics=['Mendelian genetics','Population genetics','Gene regulation','Molecular genetics','Biotechnology'], topicMatch='current',
        alignment='Core inheritance, molecular genetics, population genetics and biotechnology overlap the 2027 Designer Genes rules.',
        scoringBasis='Published rubric components total 87 before excluding ambiguous MCQ 1, so 86 points are available rather than the cover’s 96. Question 1 is retained for unscored written discussion: the mother’s genotype is unspecified and the two-child probability can be 0 or 1/16, which the choices do not cover. Question 2’s keyed A (zero) is corrected to E (one), since every son of an affected X-linked-recessive mother inherits the affected X. Section 2 question 7 uses the key’s four points rather than the paper’s three. Section 3 question 1 uses the key’s half-point blanks rather than the paper’s one point each; question 3 uses the key’s nine points rather than the paper’s eight. Operon diagram labels are transcribed from the key image. Alternative full-credit explanations in question 2-3 do not double its four-point maximum.')
    qs=structure_helpers['sections'](structure_helpers['read_pages'](p.source['paperPath']))
    ks=structure_helpers['sections'](structure_helpers['read_pages'](p.source['keyPath']))
    assert {s:len(v) for s,v in qs.items()}=={'1':24,'2':7,'3':7}
    assert {s:set(v) for s,v in qs.items()}=={s:set(v) for s,v in ks.items()}
    for n,b in qs['1'].items():
        prompt,choices=options(b['text'])
        if n==1:
            p.frq('1-1',prompt+' Explain the ambiguity in the original options. This question is unscored.',
                'If the mother is IA IA, no child can have type B, so the probability is 0. If she is IA i, each child has a 1/4 chance of type B, so both have probability 1/16. Her genotype is not specified; the published B (1/4) does not answer the probability for both children.',points=0,page=b['page'])
        else:
            answer=ks['1'][n]['text'].strip()
            assert re.fullmatch('[A-E]',answer),n
            p.mcq(f'1-{n}',prompt,choices,'E' if n==2 else answer,page=b['page'])
    for n,b in qs['2'].items():
        if n==6:
            for letter,answer in zip('ABCD',['Leading strand','Origin of replication','Lagging strand','RNA primer']):
                p.frq(f'2-6-{letter}',f'Label {letter} in the replication-bubble diagram on paper page {b["page"]}.',answer,page=b['page'],accepted=[answer])
        else:
            p.frq(f'2-{n}',b['text'],ks['2'][n]['text'],points=[4,3,4,4,5,4,4][n-1],page=b['page'])
    blanks=[
        ('First molecule in the central dogma','DNA',['DNA','deoxyribonucleic acid']),
        ('Second molecule in the central dogma','mRNA',['mRNA','messenger RNA']),
        ('Third product in the central dogma','Protein',['protein','polypeptide']),
        ('First process in the central dogma','Transcription',['transcription']),
        ('Enzyme that starts this process','RNA polymerase',['RNA polymerase']),
        ('Region where the enzyme binds','Promoter',['promoter']),
        ('Two bacterial promoter elements','-10 and -35',['-10 and -35','-35 and -10']),
        ('Important human promoter','TATA box',['TATA box']),
        ('Step when the enzyme moves along DNA','Elongation',['elongation']),
        ('Direction the enzyme reads the DNA template',"3′ to 5′",["3′ to 5′","3' to 5'",'3 to 5']),
        ('Direction of mRNA synthesis',"5′ to 3′",["5′ to 3′","5' to 3'",'5 to 3']),
        ('Name of the strand being read','Template strand',['template','template strand']),
        ('Name of the other strand','Non-template/coding strand',['non-template','non-template strand','coding','coding strand']),
        ('All three human mRNA processing steps','Polyadenylation, addition of a 5′ GTP cap, and mRNA splicing',[]),
        ('Final step of transcription','Termination',['termination']),
        ('Sequence triggering this final step','Terminator',['terminator']),
        ('First bacterial termination strategy','Rho-dependent',['rho-dependent','rho dependent']),
        ('Second bacterial termination strategy','Rho-independent',['rho-independent','rho independent']),
        ('Next central-dogma process','Translation',['translation']),
        ('Structures that read mRNA in bacteria','Ribosomes',['ribosomes','ribosome']),
    ]
    for i,(prompt,answer,accepted) in enumerate(blanks,1):
        p.frq(f'3-1-{i}',f'Fill blank {i} in the paragraph on paper page 12: {prompt}.',answer,points=0.5,page=12,accepted=accepted)
    for n,b in qs['3'].items():
        if n==1:
            continue
        answer=ks['3'][n]['text']
        if n==2:
            answer+=' Diagram order left to right: Promoter, Regulatory Gene, Promoter, Operator, Structural Gene.'
        p.frq(f'3-{n}',b['text'],answer,points={2:5,3:9,4:3,5:4,6:2,7:2}[n],page=b['page'])
    assert len(p.test['questions'])==60 and sum(q['points'] for q in p.test['questions'])==86
    p.finish()


if '9IDZuOZwmxM' in SOURCES:
    p=Paper('9IDZuOZwmxM', difficulty='Medium', difficultyReason='Foodborne-outbreak investigation combines epidemiology vocabulary, epidemic curves, case definitions, contingency tables and odds ratios.',
        topics=['Epidemiology','Foodborne illness','Outbreak investigation','Study design','Odds ratios'], topicMatch='current',
        alignment='Epidemiology, outbreak investigation and quantitative study design overlap the 2027 Disease Detectives core.',
        scoringBasis='Published one-point MCQs and labeled written weights; 55 scored points. MCQ 4 is retained as an unscored written correction because the false-negative rate is 7/(3+7)=70%, absent from the choices; the key’s C (0.07%) divides by the entire tested population instead. Three original tiebreakers are retained at zero points and excluded from the percentage. Their published tie weights are identified in the prompts. Tiebreaker diagnosis references use RT-PCR for this RNA virus rather than the key’s generic DNA-PCR wording.')
    qs=numbered(structure_helpers['read_pages'](p.source['paperPath']))
    ks=numbered(structure_helpers['read_pages'](p.source['keyPath']))
    assert len(qs)==len(ks)==26
    for n,b in qs.items():
        prompt=b['text'].split('Questions ')[0].split(' Tiebreaker')[0].strip()
        answer=ks[n]['text'].split(' Tiebreaker')[0].strip()
        if n<14:
            matches=list(re.finditer(r'(?m)^\s*([a-e])\.\s+',prompt))
            assert len(matches)==5,n
            parsed=(prompt[:matches[0].start()].strip(),[{'id':m[1].upper(),'text':prompt[m.end():matches[i+1].start() if i+1<len(matches) else len(prompt)].strip()} for i,m in enumerate(matches)])
            code=re.match('[a-e]',answer).group().upper()
            if n==4:
                p.frq('4',parsed[0]+' Calculate the actual false-negative rate; the printed choices do not contain it. Unscored correction.',
                    'False negatives / all infected patients = 7/(3+7) = 0.70 = 70%. The printed C (0.07%) uses all tested patients as denominator, which is not the false-negative rate.',points=0,page=b['page'])
            else:
                p.mcq(str(n),parsed[0],parsed[1],code,page=b['page'])
        else:
            weight=3 if n<=19 else {20:2,21:3,22:8,23:3,24:2,25:5,26:2}[n]
            p.frq(str(n),prompt,answer,points=weight,page=b['page'])
    p.frq('TB-1','Original 2-point tiebreaker: Give the complete scientific name of the pathogen primarily responsible for listeriosis infections. Unscored for percentage.',
        'Listeria monocytogenes (2 tie points only if the entire name is correct). L. ivanovii or L. grayi earns one tie point.',points=0,page=6)
    p.frq('TB-2','Original 3-point tiebreaker: Describe a test for specific diagnosis of norovirus, including its process. Unscored for percentage.',
        'One process described in detail. RT-PCR first reverse-transcribes viral RNA to cDNA, then amplifies a specific sequence using primers, nucleotides and polymerase through thermal cycles. The source also accepts a detailed antibody test or culture description; retain instructor discretion for alternatives.',points=0,page=7)
    for n,name,code in zip(range(1,7),['Listeria','Norovirus','Shigellosis','Botulism','Salmonella','E. coli'],'CADFEB'):
        choices=[{'id':c,'text':t} for c,t in zip('ABCDEF',[
            'Viral infection with 24–48 hour incubation period','Bacterial infection tested by stool sample','Possibly fatal to fetuses',
            'Sometimes called bacillary dysentery','“Four-inch law” passed to regulate outbreaks','Toxin poisoning caused by improper canning'])]
        p.mcq(f'TB-3-{n}',f'Unscored original matching tiebreaker: {name}',choices,code,points=0,page=8)
    assert len(p.test['questions'])==34 and sum(q['points'] for q in p.test['questions'])==55
    p.finish()


if 'K0d3cUjlmuw' in SOURCES:
    p=Paper('K0d3cUjlmuw', difficulty='Hard', difficultyReason='Latent heat, radiation, entropy of mixing and a complete Carnot cycle require calculations and detailed thermodynamic explanations.',
        topics=['Temperature scales','Calorimetry','Heat transfer','Entropy','Thermodynamic cycles'], topicMatch='current',
        alignment='The written thermodynamics core overlaps the 2027 rules; this historical written paper does not replace construction or device testing.',
        scoringBasis='Published section and question weights total 120. Part 2 question 4 is split into its two ten-point parts; the second retains the original cogency/completion rubric. Part 1 question 3 corrects the key’s reversed constant relation to kB=R/NA. Part 1 question 4 asks SI base units and has an inconsistent numerical constant, so grade the requested dimensional expression. Part 2 question 5 corrects the reversed speed ranking to most probable < mean < RMS. Part 3 question 2 corrects the key’s signs and stage label: 2→3 is −400 J and 4→1 is +400 J. Diagram question accepts a complete verbal description in the text response; the source figure and allocation are transcribed into its rubric.')
    qs=structure_helpers['sections'](structure_helpers['read_pages'](p.source['paperPath']))
    ks=structure_helpers['sections'](structure_helpers['read_pages'](p.source['keyPath']))
    assert {s:len(v) for s,v in qs.items()}=={'1':5,'2':5,'3':5,'4':5}
    fixes={
        '1-3':'Using the question’s B for Boltzmann’s constant and K for the molar gas constant: B=K/NA, equivalently K=NA B. Standard notation R=NA kB. The printed key reverses this relationship.',
        '1-4':'SI base units: kg m^2 s^-2 mol^-1 K^-1. Equivalent derived units are J/(mol K), but the question specifically requests base units. The question prints 0.0082 atm L/(mol K), inconsistent with the key’s 8.314 value; a numerical value is not required for the units question.',
        '2-5':'Most probable speed < mean speed < root mean square speed. These are sqrt(2kT/m), sqrt(8kT/(pi m)), sqrt(3kT/m), respectively. The printed key lists the reverse order.',
        '3-1':'A clockwise Carnot loop with pressure P on the vertical axis and volume V on the horizontal axis. State 1 is at the upper left on the hot isotherm, followed by isothermal expansion rightward/downward to 2; steeper adiabatic expansion to 3 on the cold isotherm; isothermal compression leftward/upward to 4; adiabatic compression back to 1. Five points for shape/processes, three for labeled axes and two for labeled stages. Accept a complete verbal description in this text interface.',
        '3-2':'Delta U = n Cv Delta T. During 2→3, temperature drops from 432 K to 400 K: Delta U = 1×12.5×(−32) = −400 J (5 points). During 4→1, temperature rises from 400 K to 432 K: Delta U = +400 J (5 points). The printed key reverses signs and mislabels the final stage.',
    }
    for section,items in qs.items():
        for n,b in items.items():
            id=f'{section}-{n}'
            parsed=options(b['text'])
            answer='A' if id=='4-5' else ks[section][n]['text']
            if id=='4-1':
                answer='Gibbs'
            weight=3 if section in ['1','4'] else (10 if section=='3' else {1:7,2:3,3:7,4:20,5:3}[n])
            if id in ['1-5','2-2','4-5']:
                assert parsed,id
                code=re.match('[A-E]',answer).group()
                p.mcq(id,parsed[0],parsed[1],code,points=weight,page=b['page'])
            elif id=='4-4':
                p.mcq(id,b['text'],[{'id':'T','text':'True'},{'id':'F','text':'False'}],'T',points=3,page=b['page'])
            elif id=='2-4':
                body=b['text'].split('a)')[0]
                parts=re.split(r'(?m)^\s*[ab]\)\s*',b['text'])
                assert len(parts)==3
                p.frq(id+'-a',body+'\n(a) '+parts[1],'Total entropy change = 4R ln 2 ≈ 23.04 J/K, since each of the two distinguishable gases contributes 2R ln 2.',points=10,page=b['page'])
                p.frq(id+'-b',body+'\n(b) '+parts[2],
                    'Grade for completion and cogency rather than accuracy. Full credit for a coherent discussion indicating that the physical entropy change for identical gases is zero and/or that blindly applying the distinguishable-gas calculation is false. Allow broad reasoning, as directed by the published rubric.',points=10,page=b['page']+1)
            else:
                accepted={'1-1':['-40','-40 C','-40 F'], '1-2':['-5 F','-5°F','February'], '4-1':['Gibbs','Josiah Willard Gibbs','J. Willard Gibbs'], '4-2':['Rankine','William Rankine'], '4-3':['Clausius','Rudolf Clausius']}.get(id,[])
                prompt=b['text']+(' Describe the diagram in words, including axes, states and each process.' if id=='3-1' else '')
                p.frq(id,prompt,fixes.get(id,answer),points=weight,page=b['page'],accepted=accepted)
    assert len(p.test['questions'])==21 and sum(q['points'] for q in p.test['questions'])==120
    p.finish()


if 'G5jCu2kGkTg' in SOURCES:
    p=Paper('G5jCu2kGkTg',competition='Raisbeck Invitational',year=2017,minutes=25,
        difficulty='Medium',difficultyReason='Temperature conversions, specific heat, spontaneity and thermodynamic processes combine routine calculations with conceptual recall.',
        topics=['Temperature scales','Specific heat','Entropy','Thermodynamic processes','History of thermodynamics'],topicMatch='current',
        alignment='The written thermodynamics core overlaps the 2027 rules; the original device run is not scored in this online paper.',
        scoringBasis='Published section weights: temperature 13, thermal calculations 14, laws/processes 10 and history matching 8, totaling 45 written points. History repeats question numbers 15–17; these eight items receive H-prefixed identifiers. The cover dates December 2, 2017; the archive indexes 2018. Laws question 15 is corrected from the key’s incomplete B (“Only when energy is”) to the complete C (work or other organized energy input). Physical water-run scoring is excluded.')
    source='\n\f\n'.join(structure_helpers['read_pages'](p.source['paperPath']))
    main,history=re.split(r'(?im)^\s*iv\.\s*History',source,maxsplit=1)
    qs=numbered(main.split('\f'))
    assert len(qs)==17
    codes={1:'A',6:'A',7:'C',8:'A',9:'E',13:'D',14:'C',15:'C',16:'A',17:'C'}
    for n,b in qs.items():
        prompt=re.sub(r'^_+\s*','',b['text']).split('Convert the following temperatures:')[0].split('Predict whether condition')[0].strip()
        weight=({1:1,2:2,3:2,4:4,5:4}.get(n,2))
        if n in codes:
            parsed=options(prompt)
            assert parsed,n
            # Instructions for the next section are not part of the final option.
            if n==9:
                parsed[1][-1]['text']=parsed[1][-1]['text'].split('Predict whether')[0].strip()
            p.mcq(str(n),parsed[0],parsed[1],codes[n],points=weight,page=b['page'])
        elif n in [10,11,12]:
            text=re.split(r'\s+SPONTANEOUS',prompt)[0].strip()
            p.mcq(str(n),text,[{'id':'S','text':'Spontaneous'},{'id':'N','text':'Not spontaneous'}], 'S' if n==11 else 'N',points=2,page=b['page'])
        else:
            answer={2:'(41.2−32)×5/9 = 5.11 °C.',3:'36.60×9/5+32 = 97.88 °F.',4:'26 °F = −3.33 °C; adding 273.15 gives approximately 269.82 K (the key rounds to 269.9 K).',5:'The linear relation is N=2C−100; at −273.15 °C, absolute zero is −646.3 °N.'}[n]
            p.frq(str(n),prompt,answer,points=weight,page=b['page'])
    contributions=['Invented the first commercial steam engine','Introduced latent heat and specific heat','Recognized the importance of blackbody radiation',
        'Combined Charles’s, Boyle’s and Gay-Lussac’s gas laws','Connected electrochemical cell voltage to thermodynamics',
        'Gas volume is inversely proportional to pressure in a closed system at constant temperature','Considered the father of thermodynamics','Used thermodynamics to predict black-hole behavior']
    choices=[{'id':c,'text':t} for c,t in zip('ABCDEFGH',contributions)]
    for n,name,code in zip(range(15,23),['Sir John Leslie','Robert Boyle','Thomas Savery','Joseph Black','Emile Clapeyron','Walter Nernst','Stephen Hawking','Nicolas Sadi Carnot'],'CFABDEHG'):
        p.mcq(f'H-{n}',f'Match {name} to a thermodynamic contribution.',choices,code,page=4)
    assert len(p.test['questions'])==25 and sum(q['points'] for q in p.test['questions'])==45
    p.finish()


if 'NAJKGgC-OeM' in SOURCES:
    p=Paper('NAJKGgC-OeM',competition='Captain’s Summer Exchange — Union County Vocational Technical Schools',year=2025,
        difficulty='Medium',difficultyReason='Oceanography recall is followed by written explanations of ENSO, sediments, currents, Ekman balance and continental-margin diagrams.',
        topics=['Oceanography','ENSO','Waves','Ocean currents','Marine sediments','Plate tectonics'],topicMatch='different',
        alignment='Historical oceanography rotation differs from the 2027 freshwater focus; water circulation and hydrology concepts overlap.',
        scoringBasis='Thirty one-point MCQs and seven written problems with published subpart weights would total 94. MCQ 5 incorrectly asks about rapid pressure change while keying the density-defined pycnocline; it is retained as an unscored correction, leaving 93 points. Written question 7’s six diagram labels are transcribed from the published key image. The cover dates CSE 2025 while the archive indexes 2026.')
    qt='\n\f\n'.join(structure_helpers['read_pages'](p.source['paperPath']))
    kt='\n\f\n'.join(structure_helpers['read_pages'](p.source['keyPath']))
    qm,qf=re.split(r'Open\s+Ended\s+Section',qt,maxsplit=1)
    km,kf=re.split(r'Open\s+Ended\s+Question\s+Answer\s+Key:',kt,maxsplit=1)
    mc,fr=numbered(qm.split('\f')),numbered(qf.split('\f'))
    mk,fk=numbered(km.split('\f')),numbered(kf.split('\f'))
    assert len(mc)==len(mk)==30 and len(fr)==len(fk)==7
    for n,b in mc.items():
        prompt,choices=options(b['text'])
        if n==5:
            p.frq('MC-5',prompt+' Explain the terminology error. Unscored correction.',
                'The published key selects pycnocline, which means a layer of rapid density change, not rapid pressure change. Thermocline describes rapid temperature change. Pressure generally increases with depth rather than defining the pycnocline.',points=0,page=b['page'])
        else:
            code=mk[n]['text'].strip()
            assert re.fullmatch('[A-D]',code),n
            p.mcq(f'MC-{n}',prompt,choices,code,page=b['page'])
    offset=qm.count('\f')
    for n,b in fr.items():
        answer=fk[n]['text']
        if n==7:
            answer+=' Diagram labels by location: continental shelf (shallow nearshore platform); continental slope (steep drop); continental rise (base of slope); abyssal plain (flat deep floor); continental crust (beneath shelf/slope); oceanic crust (beneath deep ocean floor). One point per diagram label, plus one for continental shelf as the diverse marine habitat.'
        p.frq(f'FR-{n}',b['text'],answer,points=10 if n<=5 else 7,page=b['page']+offset)
    assert len(p.test['questions'])==37 and sum(q['points'] for q in p.test['questions'])==93
    p.finish()


if '2DVBw1Ll-v0' in SOURCES:
    p=Paper('2DVBw1Ll-v0',difficulty='Hard',difficultyReason='Multi-step calorimetry, Gibbs energy, equilibrium, Hess’s law and material-property explanations require sustained mathematical reasoning.',
        topics=['Thermodynamics','Calorimetry','Chemical equilibrium','Physical properties','Periodic trends'],topicMatch='different',
        alignment='Historical thermodynamics and physical-properties rotation differs from the 2027 kinetics and gases focus; gas work and energy concepts overlap.',
        scoringBasis='Published item weights sum to 112 rather than the cover’s 110. Part II question 5 incorrectly asserts that sugar is insoluble and nonpolar; retain it as an unscored correction, leaving 108 points. Part I questions 10 and 11 correct the key’s van’t Hoff sign and inconsistent-temperature Gibbs calculation. Part II question 7 uses the student paper’s diameter and correct SI forces, retaining its seven rubric steps and final length. Periodic-table marking accepts named elements or a verbal location in the text interface, with the highest electron affinity identified as chlorine rather than the key’s overly broad top-right location.')
    qs=structure_helpers['sections'](structure_helpers['read_pages'](p.source['paperPath']))
    ks=structure_helpers['sections'](structure_helpers['read_pages'](p.source['keyPath']))
    assert {s:len(v) for s,v in qs.items()}=={'I':13,'II':9}
    fixes={
        'I-10':'The equilibrium constant increases with temperature, so the forward reaction is endothermic. ln(525/375)=−Delta H/R × (1/298−1/273), yielding Delta H≈+9.10 kJ/mol (3 points). Delta G at 273 K = −RT ln375≈−13.45 kJ/mol, so Delta S=(Delta H−Delta G)/273≈+82.6 J/(mol K) (3 points). Accept rounding consistent with the given constants. The printed key has the wrong sign for Delta H and consequently the wrong Delta S.',
        'I-11':'At equilibrium Q=K. Removing half of B for A⇌2B reduces Q to K/4 (2 points for establishing equilibrium K, 2 for Q=K/4). Delta G=RT ln(Q/K)=−RT ln4 = −8.3145×400.0×ln4≈−4610.6 J/mol, or −4.61 kJ/mol (3 points). The printed key reuses Delta G° from a different temperature and gives an inconsistent result.',
        'II-5':'The premise is incorrect: both table salt and sugar dissolve in water. Salt dissociates into ions stabilized by ion–dipole interactions. Sugar has polar hydroxyl groups that hydrogen-bond with water. This correction is unscored; the published assertion that sugar is nonpolar and insoluble is not used for grading.',
        'II-7':'Use the student paper’s 3 cm diameter: radius 0.015 m and area pi(0.015)^2≈7.07×10^-4 m² (1 point). Initial force 0.400×9.8=3.92 N and stress≈5546 Pa (1). Initial strain=0.01/10=0.001 (1). Young’s modulus≈5.55×10^6 Pa (1). New force=0.600×9.8=5.88 N and stress≈8318 Pa (1). New extension is 0.015 m, also obtained directly by scaling the force by 1.5 (1). Final length=10.015 m (1). The key mistakenly uses circumference and inconsistent forces; the final length agrees because the area cancels.',
        'II-8':'Two points per trend: largest atomic radius toward the bottom left (francium in the simplified school trend); highest ionization energy is helium at the top right; highest electron affinity is chlorine among the halogens, not the noble gases; largest molar mass toward the bottom right of the supplied periodic table. Accept verbal locations where appropriate instead of marking the PDF.',
        'II-9':'Four points per explanation: atomic radius increases down groups as shells are added and generally decreases across a period as effective nuclear charge rises; ionization energy generally rises across a period and upward as electrons are more tightly held, with helium highest; electron affinity reflects the energetics of adding an electron, generally strongest for halogens, with chlorine exceeding fluorine because of fluorine’s compact-shell repulsion and noble gases being unfavorable; molar mass generally increases with increasing proton and neutron count down and across the table, with exceptions. Do not require the source key’s incorrect implication that noble gases have the highest electron affinity.',
    }
    for section,items in qs.items():
        for n,b in items.items():
            id=f'{section}-{n}'
            marks=re.findall(r'\((\d+)\s*pt\)',b['text'])
            assert len(marks)==1,id
            weight=0 if id=='II-5' else int(marks[0])
            answer=ks[section][n]['text']
            if id in fixes:
                answer=fixes[id]
            accepted=['endothermic'] if id=='I-4' else []
            prompt=b['text']+(' This original premise is incorrect; explain why. Unscored correction.' if id=='II-5' else '')
            p.frq(id,prompt,answer,points=weight,page=b['page'],accepted=accepted)
    assert len(p.test['questions'])==22 and sum(q['points'] for q in p.test['questions'])==108
    p.finish()


if 'XgxmJpveiBo' in SOURCES:
    p=Paper('XgxmJpveiBo',difficulty='Hard',difficultyReason='Stellar evolution, supernova spectra, distance indicators and orbital calculations require detailed physical explanations and multi-step calculations.',
        topics=['Stellar evolution','Supernovae','Variable stars','Distance measurements','Spectroscopy'],topicMatch='different',
        alignment='Historical stellar-evolution and supernova focus differs from the 2027 normal and starburst galaxy rotation; distance and spectral-analysis skills overlap.',
        scoringBasis='All 32 original questions and published point weights are retained, including the scored tiebreakers. MCQs 11 and 19 preserve explicit half credit for the individually correct choices. Question 19 repeats H/I/J option labels; the second occurrences use H2/I2/J2 while retaining their original combination text. The complete separate image sheet is included. The question 22 key’s negative recession velocity is corrected to positive for the redshift; its positive distance and rubric allocation are retained. Luminosity references use solar luminosities; the source’s “solar lumens” is not a distinct unit.')
    qp=structure_helpers['read_pages'](p.source['paperPath'])
    kp=structure_helpers['read_pages'](p.source['keyPath'])
    qs,ks=numbered(qp),numbered(kp)
    assert len(qs)==len(ks)==32
    weights=[4,2,6,2,2,2,2,2,6,8,4,2,2,2,6,6,6,4,4,2,2,8,2,6,6,2,6,2,2,2,4,4]
    for n,b in qs.items():
        prompt=b['text'].split('ANSWER SHEET')[0].strip()
        answer=ks[n]['text']
        if n in [11,19]:
            pattern=r'\b([A-M])[:.]\s+'
            hits=list(re.finditer(pattern,prompt))
            assert len(hits)==(8 if n==11 else 16)
            seen={}
            choices=[]
            for i,m in enumerate(hits):
                seen[m[1]]=seen.get(m[1],0)+1
                choice_id=m[1]+(str(seen[m[1]]) if seen[m[1]]>1 else '')
                choices.append({'id':choice_id,'text':prompt[m.end():hits[i+1].start() if i+1<len(hits) else len(prompt)].strip()})
            p.mcq(str(n),prompt[:hits[0].start()].strip(),choices,'E' if n==11 else 'F',points=4,page=b['page'],option_points={'E':4,'A':2,'C':2} if n==11 else {'F':4,'A':2,'B':2})
        else:
            if n==22:
                answer=answer.replace('v=-3*10^3','v=+3*10^3')
                answer+=' This is a redshift: the recession velocity is positive, approximately +3000 km/s; the key’s negative sign is a typo. Distance ≈42.8 Mpc = 4.28×10^7 pc, using the source Hubble constant.'
            if n in [4,25]:
                answer+=' Here the source means solar luminosities (L_sun), not photometric lumens.'
            accepted={2:['B A F K M','B, A, F, K, M'],6:['S Doradus variables','S Doradus variable'],12:['Red supergiants','Red supergiant'],28:['Luminous blue variables','LBVs','S Doradus variables']}.get(n,[])
            p.frq(str(n),prompt,answer,points=weights[n-1],page=b['page'],accepted=accepted)
    assert sum(q['points'] for q in p.test['questions'])==120
    p.finish()


if 'uSVyOP3Nitg' in SOURCES:
    p=Paper('uSVyOP3Nitg',competition='SSSS — AddRidge',year=2021,
        difficulty='Hard',difficultyReason='Aristocrats, patristocrats, a xenocrypt, affine/Hill/Vigenere ciphers, Morse-based ciphers, Baconian and modular inversion span advanced cipher families.',
        topics=['Substitution ciphers','Affine ciphers','Hill ciphers','Vigenere','Morbit','Pollux','Baconian','RSA'],topicMatch='unverified',
        alignment='Historical cipher practice includes overlapping families and older formats; the full combination is not certified to the 2027 competition format.',
        scoringBasis='All 23 numbered puzzles plus the 200-point timed puzzle retain their printed base weights. Published scoring allows two incorrect character positions, then deducts 100 points per additional error, capped at zero; numeric question 23 requires the exact value. No Gemini request is needed. The original timed bonus requires a proctor-verified solve time and is excluded from this online percentage. The cover dates June 24, 2021 while the archive indexes 2022. The deliberately misspelled plaintext in question 6 is retained. Question 23 is graded as inversion modulo the supplied phi, not certification that its inconsistent displayed values form a valid RSA key.')
    qp=structure_helpers['read_pages'](p.source['paperPath'])
    qs=numbered(qp)
    assert len(qs)==23
    solutions=[
        "EVERYBODY WANTED TO KNOW WHAT I WOULD DO IF I DIDN'T WIN. I GUESS WE'LL NEVER KNOW.",
        "IF THE WORLD WAS ENDING, I THINK I WOULD GRAB SOME CINNAMON TOAST CRUNCH, SOME WATER, AND I'D PROBABLY GO CRAZY.",
        'OUR VIRTUES AND OUR FAILINGS ARE INSEPARABLE, LIKE FORCE AND MATTER. WHEN THEY SEPARATE, MAN IS NO MORE.',
        'INTERESTINGLY, A PENDULUM CONSISTING OF TWO RODS IS CONSIDERED A DYNAMIC SYSTEM WITH CHAOTIC SOLUTIONS.',
        'BEFORE YOU CRITICIZE SOMEONE, YOU SHOULD WALK A MILE IN THEIR SHOES. THAT WAY WHEN YOU CRITICIZE THEM, YOU ARE A MILE AWAY FROM THEM AND YOU HAVE THEIR SHOES.',
        'ENVEE OF OTHER PEEPUL SHOWS HOW THEY ARE UNHAPPEE. THEIR CONTINUAL ATTENSHUN TO OTHURS BEHAVIOR SHOS HOW THEY ARE BOWRING.',
        'I THINK THE INSTITUTIONS OF OUR DEMOCRACY ARE WONDERFUL THINGS THAT RIGHT NOW ARE POPULATED BY SOME TERRIBLE PEOPLE.',
        "EVERYBODY HAS TO BE ABLE TO PARTICIPATE IN A FUTURE THAT THEY WANT TO LIVE FOR. THAT'S WHAT TECHNOLOGY CAN DO.",
        'SOME OF MY MOST IMPORTANT MUSICAL EXPERIENCES WERE FROM A BURNT CD WITH SONGS MY FRIEND DOWNLOADED FOR ME AT A TERRIBLE DIGITAL QUALITY.',
        'APRENDIMOS HACE MUCHOS AÑOS QUE LOS RICOS PUEDEN TENER DINERO, PERO LOS POBRES TIENEN TIEMPO.',
        "IF I COULD REMEMBER THE NAMES OF ALL THESE PARTICLES, I'D BE A BOTANIST.",
        'HAVING CAESAR SALAD WITHOUT CROUTONS IS LIKE HAVING MAC AND CHEESE WITHOUT THE CHEESE.',
        "YCJTCHFFXUT XR U'G HWJVG ZIHG DJV BUJZ; XG'R HWJVG ZIHG DJV LHU EXT VCP JVG",
        "I'VE ALWAYS LIKED HOME-COOKED MEALS.",
        'LTSDZBWRVPZIQNAJLM',
        'AVALANCHES',
        "IVE BEEN INVOLVED IN A NUMBER OF CULTS BOTH A LEADER AND A FOLLOWER YOU HAVE MORE FUN AS A FOLLOWER BUT YOU MAKE MORE MONEY AS A LEADER",
        'LEARN FROM YESTERDAY LIVE FOR TODAY HOPE FOR TOMORROW THE IMPORTANT THING IS NOT TO STOP QUESTIONING',
        'NUMEROUS ALGORITHMS CAN BE USED TO SOLVE THE TRAVELING SALESMAN PROBLEM',
        'I WOULD IMAGINE THAT IF YOU COULD UNDERSTAND MORSE CODE A TAP DANCER WOULD DRIVE YOU CRAZY',
        'I DONT HAVE A THERAPIST SO I USE ME AS MY OWN THERAPIST WHEN IM MAKING THE MUSIC',
        'SIX SLEEK SWANS SWAM SWIFTLY SOUTHWARDS',
        '263119',
    ]
    def cipher_field(id,prompt,solution,points,page):
        p.frq(id,prompt,solution,points=points,page=page,criteria=[{'id':'answer','answer':solution,'points':points,'cipher':{'solution':solution,'freeErrors':2,'penaltyPerError':100}}])
    timed_page=next(i+1 for i,page in enumerate(qp) if 'Timed Question [200 points]' in page)
    timed_prompt=qp[timed_page-1]
    cipher_field('T',clean(timed_prompt), 'DO COLLEGES CARE MORE ABOUT HOW ACCURATELY YOU CAN ANSWER QUESTIONS ABOUT RANDOM PASSAGES, OR WHAT YOU CAN TRULY DO?',200,timed_page)
    for n,b in qs.items():
        weight=int(re.match(r'\[(\d+) points\]',b['text'])[1])
        if n==23:
            p.frq(str(n),b['text'],solutions[n-1],points=weight,page=b['page'],numeric=numeric(263119))
        else:
            cipher_field(str(n),b['text'],solutions[n-1],weight,b['page'])
    assert len(p.test['questions'])==24
    p.finish()


if '8oUYzUzDJ8o' in SOURCES:
    p=Paper('8oUYzUzDJ8o',competition='Captain’s Summer Exchange — Fairfax Science Olympiad',year=2025,
        difficulty='Hard',difficultyReason='Stellar evolution, telescope optics and variable stars lead into gravitational, luminosity, parallax and escape-velocity calculations.',
        topics=['Stellar evolution','Variable stars','Telescope optics','Distance measurements','Binary stars','Black holes'],topicMatch='different',
        alignment='Historical stellar-evolution focus differs from the 2027 normal and starburst galaxy rotation; spectroscopy and astronomical calculations overlap.',
        scoringBasis='All 25 MCQs and 16 FRQs retain the published question weights, totaling the cover’s 116 points. Correct MCQ choices are recovered from the published key’s bold type, including both B and D for multi-select question 15; the key does not specify per-choice partial credit. Repeated FRQ numbers are prefixed separately. FRQ 12 accepts approximately white stellar color as well as the key’s white-blue description for its roughly 6040 K blackbody. The cover dates CSE 2025, while the archive indexes 2026.')
    qt='\n\f\n'.join(structure_helpers['read_pages'](p.source['paperPath']))
    kt='\n\f\n'.join(structure_helpers['read_pages'](p.source['keyPath']))
    qm,qf=re.split(r'(?m)^\s*FRQ\s*$',qt,maxsplit=1)
    km,kf=re.split(r'(?m)^\s*FRQ\s*$',kt,maxsplit=1)
    mc,fr=numbered(qm.split('\f')),numbered(qf.split('\f'))
    fk=numbered(kf.split('\f'))
    bold=font_answers(p.source['keyPath'],stop_heading='FRQ')
    assert len(mc)==25 and len(fr)==len(fk)==16
    for n,b in mc.items():
        prompt,choices=options(b['text'])
        codes=bold[('1',n)]
        assert len(codes)==(2 if n==15 else 1),(n,codes)
        weight=int(re.search(r'\((\d+)pt\)',prompt)[1])
        p.mcq(f'MC-{n}',prompt,choices,codes if n==15 else codes[0],points=weight,page=b['page'])
    for n,b in fr.items():
        weight=int(re.search(r'\((\d+)pt\)',b['text'])[1])
        answer=fk[n]['text']
        if n==12:
            answer+=' Accept approximately white as a stellar color at roughly 6040 K, as well as the published white-blue description; a blackbody emits a broad spectrum rather than only its peak wavelength.'
        p.frq(f'FR-{n}',b['text'],answer,points=weight,page=b['page']+qm.count('\f'))
    assert len(p.test['questions'])==41 and sum(q['points'] for q in p.test['questions'])==116
    p.finish()


if 'n2jyiWT4yYA' in SOURCES:
    p=Paper('n2jyiWT4yYA',competition='Brookwood High School Invitational',year=2017,reviewedOn='2026-10-12',
        difficulty='Medium',difficultyReason='A broad plate-tectonics paper combines historical recall, tectonic settings, geological definitions and interpretation of cross-sections and maps.',
        topics=['Plate tectonics','Earth structure','Volcanism','Earthquakes','Geological history'],topicMatch='different',
        alignment='Historical plate-tectonics rotation differs from the 2027 freshwater focus.',
        scoringBasis='The complete January 14, 2017 paper contains 75 MCQs, including the final three starred items. No item weights or separate tie-breaker weighting are specified, so all 75 receive one practice point each. All answers are transcribed from the published 75-item key. Original diagrams and maps remain available in the complete student paper; irregular spacing in question 47 and stars on questions 73–75 are normalized only for question extraction.')
    text=Path(p.source['paperPath']).with_suffix('.layout.txt').read_text(encoding='utf-8').replace('\u00a0',' ')
    text=re.sub(r'(?m)^\s*\*?(\d+)\s*\.',r'\1.',text)
    text='\f'.join('\n'.join(line for line in page.splitlines() if not ('Invitational' in line and 'Tectonics' in line) and not re.fullmatch(r'\s*\d+\s*',line)) for page in text.split('\f'))
    qs=numbered(text.split('\f'))
    key=Path(p.source['keyPath']).with_suffix('.layout.txt').read_text(encoding='utf-8')
    answers={int(n):a for n,a in re.findall(r'\b(\d+)\.\s*([A-D])\b',key)}
    assert set(qs)==set(answers)==set(range(1,76))
    for n,b in qs.items():
        prompt,choices=options(b['text'].replace('\ufffd','-'))
        assert len(choices)==4,n
        p.mcq(str(n),prompt,choices,answers[n],page=b['page'])
    p.finish()

if 'CVYp5_ionrM' in SOURCES:
    p=Paper('CVYp5_ionrM',competition='Captain’s Summer Exchange — Alabama School of Fine Arts',year=2025,reviewedOn='2026-10-12',
        difficulty='Hard',difficultyReason='Stoichiometric redox calculations, integrated rate laws, Arrhenius analysis and steady-state mechanism derivation require multi-step reasoning.',
        topics=['Stoichiometry','Kinetics','Reaction mechanisms','Redox reactions'],topicMatch='different',
        alignment='Kinetics overlaps 2027; this older stoichiometry rotation differs from the current gases focus.',
        scoringBasis='All 26 numbered problems are retained. Published weights total 55, but MCQs 16, 18 and 19 are unscored written practice fields because their choices omit the rigorous rate law, omit the calculated oxygen volume, or leave the product-water phase unspecified. The available score is 52. MCQ answers were visually transcribed from highlighted choices in the published key. Question 23’s reference to 18 is a source typo: its chromate/ethanol calculation uses the compound from 21; its rubric now includes the requested acetic-acid mass instead of stopping at moles. Question 24b retains its printed three-point maximum despite four bracketed points in the key. Cover dates July 19, 2025; archive season is 2026.')
    qs=structure_helpers['sections'](structure_helpers['read_pages'](p.source['paperPath']))['1']
    assert len(qs)==26
    answers=['C','B','D','D','C','A','A','C','D','A','A','A','B','C','D','B','B','C','B','B']
    corrections={
        16:'Under the stated fast equilibrium, K=[NO2F][F]/([NO2][F2]), so rate=k2[NO2][F]=k2 K [NO2]^2[F2]/[NO2F]. The denominator is absent from every offered choice; the highlighted B is incomplete. Unscored practice.',
        18:'25.0/122.55 mol KClO3 x 3/2 x 0.800 x 22.4 L/mol = approximately 5.48 L O2 at conventional STP. None of the choices matches; key C says 6.00 L. Unscored practice.',
        19:'C3H8 + 5 O2 -> 3 CO2 + 4 H2O. With liquid water only CO2 is gaseous: approximately 0.0818 mol (key B). With vapor, total gaseous products are approximately 0.191 mol, absent from the choices. The source does not specify the product-water phase. Unscored practice.'}
    for n in range(1,21):
        b=qs[n]
        if n in corrections:
            p.frq(str(n),b['text'],corrections[n],points=0,page=b['page'])
        else:
            prompt,choices=options(b['text'])
            assert len(choices)==4,n
            p.mcq(str(n),prompt,choices,answers[n-1],page=b['page'])
    rubrics={
        21:(2,'Oxygen mass = 5.82 - 2.339 - 1.551 = 1.93 g. Moles K=0.0598, Cr=0.0298, O=0.1206 (1 point). Divide by 0.0298 to obtain 2:1:4; formula K2CrO4, potassium chromate (1 point).'),
        22:(3,'Oxidation half-reaction: C2H5OH + H2O -> CH3COOH + 4 H+ + 4 e- (1). Reduction: CrO4^2- + 8 H+ + 3 e- -> Cr^3+ + 4 H2O (1). Overall: 4 CrO4^2- + 3 C2H5OH + 20 H+ -> 4 Cr^3+ + 3 CH3COOH + 13 H2O (1).'),
        23:(3,'Interpret the source’s mistaken reference to question 18 as potassium chromate from question 21. K2CrO4 is limiting: 2.00/194.20 = 0.0103 mol versus 1.00/46.07 = 0.0217 mol ethanol; ratio chromate:ethanol=4:3 (1). Acetic acid yield=0.0103 x 3/4 = 0.00772 mol, corresponding to 0.464 g CH3COOH (1). Ethanol remaining=1.00 - (2.00/194.20 x 3/4 x 46.07)=0.644 g (1).'),
        24:(7,'Part a, 2 points: table of time and ln[N2O5] (1); equal ln-concentration decreases per 100 seconds indicate first order (1). Part b, 3 points maximum: use ln[A]=ln[A]0-kt and obtain k approximately 0.00345 s^-1; distribute method/value/unit credit within the printed three-point maximum. Part c, 2 points: apply first-order law (1); [N2O5](750)=0.800 exp(-0.00345 x 750)=approximately 0.0602 M, accepting the key’s 0.0606 M and reasonable rounding (1). Carry-forward error from b allowed if remaining calculation is correct.'),
        25:(9,'Part a, 2: cancel intermediates and give N2O5 -> NO2 + O2 + NO. Part b, 2: fast equilibrium gives [NO2][NO3]=K[N2O5] (1); slow rate=k[NO2][NO3]=kK[N2O5], consistent with the observed first-order rate law (1). Part c, 2: N/A, since consistent. Part d, 3: Arrhenius ratio equation (1); substitute k2/k1=20000, T1=318 K, T2=636 K, R=8.314 J/mol K (1); Ea approximately 52.4 kJ/mol (1).'),
        26:(11,'Part a, 2: step 2 (1) because it is slow (1). Part b, 4: steady state d[I]/dt=k1[A][B]-k-1[I]-k2[I][A] approximately zero (2); [I]=k1[A][B]/(k-1+k2[A]) (2). Part c, 3: v=k2[I][A] (1); substitute to obtain k1 k2[A]^2[B]/(k-1+k2[A]) (1); when k-1 >> k2[A], v approximately (k1 k2/k-1)[A]^2[B] (1). Part d, 2: overall k=k1 k2/k-1 (1)=K k2 (1).')}
    for n,(weight,answer) in rubrics.items():
        p.frq(str(n),qs[n]['text'],answer,points=weight,page=qs[n]['page'])
    assert sum(q['points'] for q in p.test['questions'])==52
    p.finish()

if 'o2ycCDuTsSw' in SOURCES:
    p=Paper('o2ycCDuTsSw',competition='Clements Invitational',reviewedOn='2026-10-12',
        difficulty='Hard',difficultyReason='Fourteen puzzles include Vigenère, affine, monoalphabetic, dancing-men and matrix-based Hill encryption and decryption.',
        topics=['Vigenère','Affine','Monoalphabetic substitution','Hill cipher','Dancing men'],topicMatch='unverified',
        alignment='Historical cipher families overlap general Codebusters practice; the complete 2027 cipher roster and tournament format are not certified for this older paper.',
        scoringBasis='All 14 puzzles are retained with published weights. No error allowance or partial-credit formula is supplied, so scored puzzles require the complete solution, ignoring spaces, punctuation and case. Puzzle 8 is unscored: the published Hill ciphertext disagrees with direct column-vector multiplication using the printed matrix, and padding is unspecified. Its original answer and the independently calculated X-padded result are both disclosed. Available score is 56,000 of the original 60,000 points. Archive season 2018 is retained because the cover has no date. No timed bonus is invented.')
    qs=numbered(structure_helpers['read_pages'](p.source['paperPath']))
    assert len(qs)==14
    solutions=[
        'I COME TO BURY CAESAR, NOT TO PRAISE HIM.',
        'DIPCHUGGETSINSPRITE',
        'RATTLE THE STARS IF YOU DARE',
        'IS YOU READY TO COMMIT TREASON?',
        'THE PEN IS MIGHTIER THAN THE SWORD.',
        'LOST IN THOUGHTS ALL ALONE.',
        'NOT THAT I LOVED CAESAR LESS, BUT THAT I LOVED ROME MORE.',
        None,
        'WHAT IS A MAN, IF HIS CHIEF GOOD AND MARKET OF HIS TIME BE BUT TO SLEEP AND FEED? A BEAST, NO MORE.',
        'EQMDA XH L KJTIG FLTHDMFV',
        'DONT COUNT THE DAYS, MAKE THE DAYS COUNT.',
        'AN OX AND A RED CAT.',
        'TO BE OR NOT TO BE, THAT IS THE QUESTION.',
        'ITS A HOLLY JOLLY CHRISTMAS!']
    for n,b in qs.items():
        weight=int(re.search(r'\((\d+)\s*pts\)',b['text'])[1])
        if n==8:
            p.frq(str(n),b['text'],'Unscored source discrepancy. Published key: ORL FYZZ WPM GFUHHNYCY WABTWYN JTYOHSJAV. Using A=0, column vectors, the printed matrix [[1,20,19],[22,7,24],[19,7,14]] and an X padding character gives ORLFYZZWPMGFUHHNYCYWATNMYNJTYOHSJALC. The source does not specify padding; discuss the convention used.',points=0,page=b['page'])
        else:
            answer=solutions[n-1]
            criterion=dict(id='answer',answer=answer,points=weight,accepted=[],cipher=dict(solution=answer,freeErrors=0,penaltyPerError=weight))
            p.frq(str(n),b['text'],answer,points=weight,page=b['page'],criteria=[criterion])
    assert sum(q['points'] for q in p.test['questions'])==56000
    p.finish()


if 'KGVD6o10HOU' in SOURCES:
    from pypdf import PdfWriter
    source=SOURCES['KGVD6o10HOU']
    root=ROOT
    written=root/'a83681763e54a98d8f66a9fe4af18964a042b8316026fa48aaa7501318cac323.pdf'
    written_key=root/'15e0369a91225eabdeef4fcbd3664761b256c6e67055aec97763e965577ac1c9.pdf'
    hands=root/'0f1352d3201e996777db2b3fd05a60426beee6378f5249782664d54a90952fbf.pdf'
    hands_key=root/'ac6954757241565130432af0fd4f7b83830e969071030bad73088ce01b7146cd.pdf'
    for dest,parts in [('greenbrier-circuit-student.pdf',[written,hands]),('greenbrier-circuit-key.pdf',[written_key,hands_key])]:
        writer=PdfWriter()
        for part in parts: writer.append(str(part))
        writer.write(str(root/dest))
    source['originalPaperPath']=str(written).replace('\\','/')
    source['paperPath']=str(root/'greenbrier-circuit-student.pdf').replace('\\','/')
    source['keyPath']=str(root/'greenbrier-circuit-key.pdf').replace('\\','/')
    source.pop('attachmentPaths',None)
    p=Paper('KGVD6o10HOU',reviewedOn='2026-10-12',
        difficulty='Hard',difficultyReason='Electrical recall and circuit calculations lead to a resistor-cube derivation, field concepts and a traffic-light timing circuit design.',
        topics=['DC circuits','Capacitors','Electromagnetism','Circuit design'],topicMatch='current',
        alignment='The source explicitly serves B/C. Written electrical concepts and the hands-on design overlap the 2027 Circuit Lab topics; this is practice rather than certification of the original tournament format.',
        scoringBasis='All 25 written questions and the hands-on traffic-light design are retained, with both complete student packets combined. Written question 25 uses the printed six-point maximum rather than the key’s eight; its method credit is consolidated. Questions 1 and 6 are unscored because the shell’s initial charge and flux/flux-linkage assumptions are unspecified. The available practice score is 67 raw points: 56 written plus the original 11-point hands-on rubric. This practice percentage is a raw-point percentage, not the competition’s 75% written/25% lab weighting. A text circuit design replaces physical construction. The key’s 555 values give about 1.46 s rather than 2.5 s; a corrected component example is supplied. Question 12’s missing minus sign is disclosed in its prompt.')
    pp=structure_helpers['read_pages'](written)
    # Source uses two columns: extract each column separately to preserve ordering.
    import pymupdf
    doc=pymupdf.open(written)
    ordered=[doc[0].get_text()]
    for page in list(doc)[1:3]:
        mid=page.rect.width/2
        ordered.append(page.get_text(clip=pymupdf.Rect(0,0,mid,page.rect.height))+'\n'+page.get_text(clip=pymupdf.Rect(mid,0,page.rect.width,page.rect.height)))
    ordered.append(doc[3].get_text())
    ordered=['\n'.join(line for line in page.splitlines() if not re.fullmatch(r'\s*(?:GREENBRIER INVITATIONAL|CIRCUIT LAB(?: B/C TEST)?|B/C TEST|[234] of 4|Multiple Choice \[36 pts\]|Free Response \[24 pts\])\s*',line)) for page in ordered]
    text='\n\f\n'.join(ordered)
    marks=list(re.finditer(r'(?m)^\s*(\d+)\.\s*\n\s*(\d+)\s*\n',text))
    assert [int(m[1]) for m in marks]==list(range(1,26))
    qs={int(m[1]):dict(text=clean(text[m.end():marks[i+1].start() if i+1<len(marks) else len(text)]),page=text[:m.start()].count('\f')+1,weight=int(m[2])) for i,m in enumerate(marks)}
    answers=['A','B','D','D','A','C','B','B','B','A','C','A','D','C','C','C','C','B']
    for n in range(1,19):
        b=qs[n]
        if n in [1,6]:
            answer=('The published key gives A (outer surface +q). An initially neutral isolated conducting shell has inner surface -q and outer +q, hence net shell surface charge zero; the prompt does not specify initial shell charge or distinguish outer from total surface charge. Unscored practice.' if n==1 else 'The published key gives C. For an assumed LC resonance, L=1/(omega^2 C), I=epsilon pi r^2/(rho length), giving flux linkage L I=epsilon pi r^2/(rho length omega^2 C). Actual magnetic flux also requires a specified inductive geometry/number of turns; these assumptions are omitted. Unscored practice.')
            p.frq(str(n),b['text'],answer,points=0,page=b['page'])
        else:
            prompt,choices=options(b['text'])
            if n==12: prompt+='\nSource correction: Maxwell–Faraday law is curl E = -dB/dt; the printed equation omits the minus sign.'
            assert len(choices)==4,(n,choices)
            p.mcq(str(n),prompt,choices,answers[n-1],points=2,page=b['page'])
    rubrics={
        19:(2,'Full-wave rectification replaces each missing negative half-cycle by its positive reflection: positive humps also on t=1–2 and t=3–4 (1); the original humps, peak 1, zeros at integer times and doubled ripple frequency are retained (1). A precise written waveform description is acceptable instead of drawing.'),
        20:(2,'Electron current is electron flow from negative to positive terminal (1). Drift is slow, typically about 10^-4 to 10^-3 m/s in the key, depending on conductor/current density (1); do not confuse drift speed with field propagation.'),
        21:(5,'Energy flux is energy transfer per unit area per unit time (1); electromagnetic fields carry it around the conductor (1) into the resistive load where work is done (1); units W/m^2 (1); Poynting vector S=E cross H (1).'),
        22:(3,'Thermal energy (1), mechanical/kinetic energy (1), and sound/acoustic energy (1).'),
        23:(2,'The real component of impedance equals resistance: Re(Z)=28.3 ohms. Award two points for the correct value with units. The key labels the question two points but only marks one beside its value.'),
        24:(4,'Use VC/Vmax=1-exp(-t/tau) (1), substitute 0.47 so exp(-t/tau)=0.53 (1), take logs t/tau=-ln(0.53) (1), approximately 0.634 time constants (1).'),
        25:(6,'By symmetry VD=VE=VB (1) and VG=VC=VF (1). Reduce the network to three series groups: three 1-ohm edges in parallel, six 1-ohm edges in parallel, three 1-ohm edges in parallel (3 total for the three groups, including equivalent reasoning). R_AG=1/3+1/6+1/3=5/6 ohm, approximately 0.833 ohm (1). The source question maximum is six; the key’s eight-point method is consolidated to six.')}
    for n,(weight,answer) in rubrics.items():
        b=qs[n];kwargs={}
        if n==23: kwargs['numeric']=numeric(28.3,0.05,['ohm','ohms','Ω'],True)
        p.frq(str(n),b['text'],answer,points=weight,page=b['page'],**kwargs)
    prompt=clean('\n'.join(pages(hands)))+'\nFor online practice, describe every connection, component value, sequence and timing calculation in text. Physical construction is replaced by your circuit design.'
    p.frq('Lab',prompt,'LED arrangement: independently driven parallel branches, each with current limiting (1 point). Working sequence/design (10 points): a valid arrangement yielding Green -> Yellow -> Red -> Green, with 2–3 s per stage and labeled components. One valid design is a 555 astable clock feeding a decade counter, Q0/Q1/Q2 driving individually current-limited green/yellow/red LEDs and Q3 resetting the counter. Explain power/ground and pin connections, reset/enable and clock wiring, LED branches and timing. T=0.693(R1+2R2)C; for example R1=47 kΩ, R2=100 kΩ, C=15 µF gives approximately 2.57 s. The key’s R1=10 kΩ,R2=100 kΩ,C=10 µF gives 1.46 s and does not meet the requested timing. Other demonstrably working circuits receive full credit. The original key explicitly accepts a switch-clocked counter if the operator waits 2–3 s per press; explain that timing procedure. Merely copying a named solution without workable connections/timing is insufficient.',points=11,page=5)
    assert len(p.test['questions'])==26 and sum(q['points'] for q in p.test['questions'])==67
    p.finish()

manifest = Path('documents/practice-import-sources.json')
existing = json.loads(manifest.read_text(encoding='utf-8'))
for source in reviewed:
    existing = [s for s in existing if s['id'] != source['id']]
    existing.append(source)
manifest.write_text(json.dumps(existing,indent=2) + '\n',encoding='utf-8')
(ROOT / 'reviewed-archive-ids.json').write_text(json.dumps([s['id'] for s in reviewed],indent=2),encoding='utf-8')

