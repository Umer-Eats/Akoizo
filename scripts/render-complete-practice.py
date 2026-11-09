"""Publish printable student/key assets; derive answer-field pages from the actual layout."""
import hashlib
import json
import re
import sys
from pathlib import Path
from xml.sax.saxutils import escape

# Use the existing converter's PDF renderer alongside the bundled ReportLab runtime.
sys.path.append(str(Path.home() / 'Downloads/Science Olympiad Text Exchange Batch Converter/.venv/Lib/site-packages'))
import pymupdf as fitz
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether, Image

ROOT = Path(__file__).resolve().parents[1]
pdfmetrics.registerFont(TTFont('Practice', 'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('PracticeBold', 'C:/Windows/Fonts/arialbd.ttf'))
STYLES = {
    'title': ParagraphStyle('title',fontName='PracticeBold',fontSize=20,leading=25,spaceAfter=16,textColor=colors.HexColor('#143849')),
    'sub': ParagraphStyle('sub',fontName='PracticeBold',fontSize=11,leading=15,spaceAfter=9),
    'body': ParagraphStyle('body',fontName='Practice',fontSize=10,leading=14,spaceAfter=8),
    'context': ParagraphStyle('context',fontName='Practice',fontSize=9,leading=12,spaceAfter=8,textColor=colors.HexColor('#354956')),
    'question': ParagraphStyle('question',fontName='PracticeBold',fontSize=10,leading=14,spaceAfter=7),
}


def text(value):
    value=str(value)
    value=value.replace('\u200b','').replace('\u00ad','').replace('\u00a0',' ')
    for a,b in [('→',' -> '),('↔',' <-> '),('−','-'),('–','-'),('—','-'),('×',' x '),('√','sqrt '),('≈','about '),('≤','<='),('≥','>='),('∆','delta '),('Δ','delta '),('⊕','Earth'),('⋅',' * ')]:value=value.replace(a,b)
    supers='⁰¹²³⁴⁵⁶⁷⁸⁹';subs='₀₁₂₃₄₅₆₇₈₉'
    value=re.sub('['+supers+']+',lambda m:'^'+''.join(str(supers.index(c)) for c in m[0]),value)
    value=re.sub('['+subs+']+',lambda m:'_'+''.join(str(subs.index(c)) for c in m[0]),value)
    return escape(value).replace('\n','<br/>')


def para(s,style='body'):
    return Paragraph(text(s),STYLES[style])


class PaperDoc(SimpleDocTemplate):
    def __init__(self,*args,**kwargs):
        self.field_pages={}
        super().__init__(*args,**kwargs)

    def afterFlowable(self,flowable):
        if hasattr(flowable,'question_id'):
            self.field_pages[flowable.question_id]=self.page


def footer(canvas,doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor('#ccd8df'))
    canvas.line(42,39,570,39)
    canvas.setFont('Practice',8)
    canvas.setFillColor(colors.HexColor('#354956'))
    canvas.drawString(42,26,'Akoizo | Authored practice material | 2027 preparation')
    canvas.drawRightString(570,26,f'Page {doc.page}')
    canvas.restoreState()


def render(path,test,questions,key=False,repair=False,asset_root=None):
    doc=PaperDoc(str(path),pagesize=(612,792),rightMargin=42,leftMargin=42,topMargin=43,bottomMargin=52,
                 title=test['competition'],author='Akoizo',pageCompression=1)
    story=[para(test['competition']+(' - Answer key' if key else ''),'title'),
           para(f'Division {test["division"]} | {test["eventId"].replace("-"," ").title()} | '+('Repair appendix' if repair else '50-minute written practice'),'sub'),
           para('This appendix contains authored replacements and supplied written alternatives. It does not reconstruct unpublished historical material. For the listed item IDs, use this appendix instead of the archived wording and key.' if repair else 'Original Akoizo curriculum practice. This is not a historical tournament paper. Written build, CAD, lab and communication exercises supplement real practical preparation.'),
           para('ANSWER KEY - Review only after submitting.' if key else 'Name: ____________________________    Date: _______________','sub')]
    seen_figures=set()
    for q in questions:
        heading=para(f'{q["label"]}. ({q["points"]:g} points) {q["prompt"]}','question')
        heading.question_id=q['id']
        block=[heading]
        if q.get('figure'):
            figure=q['figure']
            if figure['url'] not in seen_figures:
                block.append(Image(str((asset_root or ROOT) / ('public'+figure['url'])),width=500,height=500*400/720))
                block.append(para(figure['caption'],'context'))
                seen_figures.add(figure['url'])
            else:
                block.append(para('Refer to '+figure['caption']+' shown with the first question in this figure group.','context'))
        if q.get('context'):block.append(para(q['context'],'context'))
        if q['type']=='mcq':
            block += [para(f'{o["id"]}. {o["text"]}') for o in q['options']]
        if key:
            rubric=test['keys'][q['id']]
            if q['type']=='mcq':
                choices=rubric.get('correctOptions') or rubric.get('acceptedOptions') or [rubric['correctOption']]
                block.append(para('Correct: '+', '.join(choices),'sub'))
            else:
                for c in rubric['criteria']:
                    block.append(para(f'{c["id"]}: {c["answer"]} ({c["points"]:g} points).'))
                    if c.get('numeric'):
                        n=c['numeric'];block.append(para(f'Numerical target {n["value"]:.8g}; absolute tolerance {n["tolerance"]:.8g}. Accepted units: '+', '.join(n['units'])+'.'))
        else:
            block.append(para('Answer: '+('_'*67 if q['type']=='mcq' else '\n'.join(['_'*78]*3)),'context'))
        block.append(Spacer(1,12))
        story.append(KeepTogether(block))
    doc.build(story,onFirstPage=footer,onLaterPages=footer)
    return doc.field_pages


def main():
    paths=['src/data/original-practice-tests.json','src/data/repaired-practice-tests.json']
    audit=json.loads((ROOT/'documents/practice-completion-audit.json').read_text(encoding='utf-8'))
    evidence={a['id']:a for a in audit}
    report=[]
    for catalog_path in paths:
        tests=json.loads((ROOT/catalog_path).read_text(encoding='utf-8'))
        for t in tests:
            dest=ROOT/'public/practice'/t['id'];dest.mkdir(parents=True,exist_ok=True)
            info=evidence[t['id']];repair=t['origin']=='adapted'
            qs=[q for q in t['questions'] if not repair or q['id'] in info['appendixQuestionIds']]
            if repair:
                student_appendix=dest/'student-appendix.pdf';key_appendix=dest/'key-appendix.pdf'
                page_map=render(student_appendix,t,qs,repair=True)
                render(key_appendix,t,qs,key=True,repair=True)
                for role,source,appendix in [('test',info['sourcePaper'],student_appendix),('key',info['sourceKey'],key_appendix)]:
                    with fitz.open(ROOT/('public'+source)) as original,fitz.open(appendix) as extra:
                        offset=len(original)
                        if role=='test':
                            for q in qs:q['page']=offset+page_map[q['id']]
                        original.insert_pdf(extra)
                        original.save(dest/(role+'.pdf'),garbage=3,deflate=True)
            else:
                page_map=render(dest/'test.pdf',t,qs)
                for q in qs:q['page']=page_map[q['id']]
                render(dest/'key.pdf',t,qs,key=True)
            assets=[]
            for role in ['test','key']:
                p=dest/(role+'.pdf');data=p.read_bytes()
                with fitz.open(p) as doc:
                    # Scanned/blank archived pages are preserved, not rejected as new output.
                    if not repair:assert all(page.get_text().strip() for page in doc),p
                    if role=='test':assert all(1<=q['page']<=len(doc) for q in t['questions']),p
                    # Render every final PDF page to catch layout/render failures.
                    for page in doc:page.get_pixmap(matrix=fitz.Matrix(.25,.25))
                    assets.append(dict(role=role,sha256=hashlib.sha256(data).hexdigest(),pages=len(doc),bytes=len(data)))
            report.append(dict(id=t['id'],assets=assets))
        (ROOT/catalog_path).write_text(json.dumps(tests,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (ROOT/'documents/practice-completion-assets.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
    print(f'Generated and rendered {len(report)*2} final PDF assets. All field page references verified.')


if __name__=='__main__':main()
