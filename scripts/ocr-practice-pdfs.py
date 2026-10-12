"""Local OCR for scanned archive papers. Preserves page boxes and confidence for review."""
import json
import sys
from pathlib import Path

ROOT = Path('output/practice-research/division-c')
sys.path.insert(0, 'output/practice-research/python-packages')
import numpy as np
import pymupdf
from rapidocr_onnxruntime import RapidOCR

engine = RapidOCR(intra_op_num_threads=2, inter_op_num_threads=2)
sources = json.loads((ROOT / 'authenticated-manifest.json').read_text(encoding='utf-8'))
paths = list(dict.fromkeys(s[key] for s in sources for key in ['paperPath', 'keyPath'] if s.get(key)))
for path in paths:
    pdf = Path(path)
    text_path = pdf.with_suffix('.txt')
    text = text_path.read_text(encoding='utf-8') if text_path.exists() else ''
    if len(text.strip()) > 200 or pdf.with_suffix('.ocr.json').exists():
        continue
    document = pymupdf.open(pdf)
    records = []
    page_texts = []
    for number, page in enumerate(document):
        pix = page.get_pixmap(matrix=pymupdf.Matrix(2, 2), alpha=False)
        array = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
        result, elapsed = engine(array)
        rows = sorted(result or [], key=lambda row: (round(sum(p[1] for p in row[0])/4/12), row[0][0][0]))
        records.append({'page': number + 1, 'width': pix.width, 'height': pix.height,
                        'items': [{'box': box, 'text': text, 'confidence': float(confidence)} for box, text, confidence in rows]})
        page_texts.append('\n'.join(row[1] for row in rows))
        print(pdf.stem[:12], number + 1, '/', len(document), 'lines', len(rows), flush=True)
    pdf.with_suffix('.ocr.json').write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding='utf-8')
    pdf.with_suffix('.ocr.txt').write_text('\f'.join(page_texts), encoding='utf-8')
