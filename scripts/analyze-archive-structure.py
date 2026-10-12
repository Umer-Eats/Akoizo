"""Compare source question/key structure without making any model requests."""
import json
import re
import sys
from pathlib import Path
from runpy import run_path
from pypdf import PdfReader

helpers = run_path('scripts/offline-practice-conversion.py')
clean, numbered, options = (helpers[name] for name in ['clean', 'numbered', 'options'])
ROOT = Path('output/practice-research/division-c')
HEADING = re.compile(r'(?im)^\s*(?:Section|Part)\s+([1-9]\d*|[IVX]+|[A-D])(?:\b|:)\s*[^\n]*')


def read_pages(path):
    pdf = Path(path)
    cache = pdf.with_suffix('.layout.txt')
    if not cache.exists():
        cache.write_text('\f'.join(p.extract_text(extraction_mode='layout') or '' for p in PdfReader(pdf).pages), encoding='utf-8')
    text = cache.read_text(encoding='utf-8')
    if len(text.strip()) < 200 and pdf.with_suffix('.ocr.txt').exists():
        text = pdf.with_suffix('.ocr.txt').read_text(encoding='utf-8')
    return text.split('\f')


def sections(page_list):
    text = '\n\f\n'.join(page_list)
    matches = list(HEADING.finditer(text))
    result = {}
    for i, match in enumerate(matches):
        body = text[match.end():matches[i+1].start() if i+1<len(matches) else len(text)]
        blocks = numbered(body.split('\f'))
        if not blocks:
            continue
        label = match[1].upper()
        for block in blocks.values():
            block['page'] += text[:match.start()].count('\f')
        if label not in result or len(result[label])<len(blocks):
            result[label]=blocks
    if len(result)<2:
        return {'1':numbered(page_list)}
    return result


def annotated_points(text):
    marks = re.findall(r'[\[(]\s*(\d+(?:\.\d+)?)\s*(?:points?|pts?)\s*[\])]',text,re.I)
    if marks:
        return float(marks[0])
    marks = re.findall(r'\[(\d+(?:\.\d+)?)\]',text)
    return float(marks[0]) if marks else None


def main():
    sources=json.loads((ROOT/'authenticated-manifest.json').read_text(encoding='utf-8'))
    reports=[]
    for source in sources:
        qp=read_pages(source['paperPath'])
        kp=read_pages(source['keyPath']) if source.get('keyPath') else []
        qs,ks=sections(qp),sections(kp)
        rows=[]
        for label,items in qs.items():
            for n,question in items.items():
                answer=ks.get(label,{}).get(n,{}).get('text')
                parsed=options(question['text'])
                rows.append({'id':f'{label}-{n}','section':label,'number':n,'page':question['page'],
                             'prompt':question['text'],'options':parsed[1] if parsed else None,
                             'answer':answer,'points':annotated_points(question['text']),
                             'plainMCQ':bool(answer and re.fullmatch('[A-H]',answer) and parsed)})
        report={'id':source['id'],'source':source,'fields':rows,
                'qSections':{k:len(v) for k,v in qs.items()},'keySections':{k:len(v) for k,v in ks.items()},
                'missingKeys':[r['id'] for r in rows if not r['answer']],
                'cover':clean(qp[0])[:1500]}
        reports.append(report)
    (ROOT/'archive-structure.json').write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding='utf-8')
    for r in reports:
        print(r['id'],len(r['fields']),'Q',r['qSections'],'K',r['keySections'],'missing',len(r['missingKeys']))


if __name__ == "__main__":
    main()
