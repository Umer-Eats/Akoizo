"""Offline transcription helpers. No network, credentials, or model calls.

Scan downloaded originals conservatively; publication requires an explicit reviewed profile.
The original PDFs remain authoritative for diagrams, tables, and source wording.
"""
import argparse
import copy
import json
import re
from pathlib import Path

ROOT = Path('output/practice-research/division-c')
DRAFTS = Path('output/practice-research/converted')
NUMBER = re.compile(r'(?m)^[ _\t]*(\d{1,3})[.)]\s+')


def clean(text):
    return re.sub(r'[ \t]+', ' ', text.replace('\u200b', '').replace('\xad', '-').replace('\xa0', ' ')).strip()


def pages(path):
    text = Path(path).with_suffix('.txt')
    if text.exists():
        result = text.read_text(encoding='utf-8').split('\f')
        return result[:-1] if not result[-1].strip() else result
    from pypdf import PdfReader
    return [page.extract_text() or '' for page in PdfReader(path).pages]


def strip_furniture(page_list):
    # Only exact repeated marginal text is removed. Body lines are never deduplicated.
    margins = {}
    for page in page_list:
        lines = [line.strip() for line in page.splitlines() if line.strip()]
        for line in set(lines[:2] + lines[-2:]):
            margins[line] = margins.get(line, 0) + 1
    repeat = {line for line, count in margins.items() if count > 1 and
              not re.match(r'^\d{1,3}[.)]', line) and not re.search(r'points?|pts?', line, re.I)}
    return ['\n'.join(line for line in page.splitlines() if line.strip() not in repeat and
                     not re.fullmatch(r'\s*\d{1,3}\s*', line)) for page in page_list]


def numbered(page_list):
    text = '\n\f\n'.join(strip_furniture(page_list))
    hits = list(NUMBER.finditer(text))
    # Instructions may have their own 1..N list. Keep the longest later complete run.
    runs = []
    for start, first in enumerate(hits):
        if int(first[1]) != 1:
            continue
        run = [first]
        for hit in hits[start + 1:]:
            n = int(hit[1])
            if n == int(run[-1][1]) + 1:
                run.append(hit)
            elif n == 1:
                break
        runs.append(run)
    if not runs:
        return {}
    # An unfilled answer sheet can repeat every number at the end of the paper.
    # Prefer the first complete run, which contains the actual questions.
    run = max(runs, key=len)
    return {int(hit[1]): {
        'text': clean(text[hit.end():run[i + 1].start() if i + 1 < len(run) else len(text)]),
        'page': text[:hit.start()].count('\f') + 1,
    } for i, hit in enumerate(run)}


def options(block):
    # Uppercase and lowercase source option letters are retained as uppercase IDs.
    first = re.search(r'(?m)^\s*[Aa][.)]\s+', block)
    if not first:
        return None
    offset = first.start()
    body = block[offset:]
    matches = list(re.finditer(r'(?m)(?:^|\s)([A-Ha-h])[.)]\s+', body))
    if len(matches) < 2:
        return None
    letters = [m[1].upper() for m in matches]
    if sorted(letters) != list('ABCDEFGH'[:len(letters)]):
        return None
    result = [{'id': m[1].upper(), 'text': clean(body[m.end():matches[i + 1].start()
                if i + 1 < len(matches) else len(body)])} for i, m in enumerate(matches)]
    if any(not item['text'] for item in result):
        return None
    return clean(block[:offset + matches[0].start()]), sorted(result, key=lambda o: o['id'])


def explicit_points(prompt, answer):
    # A total immediately following the number has precedence over subpart weights.
    expressions = [r'^\s*[\[(]\s*(\d+(?:\.\d+)?)\s*(?:points?|pts?)\s*[\])]',
                   r'^\s*(\d+(?:\.\d+)?)\s*(?:points?|pts?)\b']
    for text in (prompt, answer):
        for expression in expressions:
            match = re.search(expression, text, re.I)
            if match:
                return float(match[1])
    marks = re.findall(r'[\[(]\s*(\d+(?:\.\d+)?)\s*(?:points?|pts?)\s*[\])]', prompt, re.I)
    return sum(map(float, marks)) if marks else None


def inspect(source):
    pp = pages(source['paperPath'])
    kp = pages(source['keyPath']) if source.get('keyPath') else []
    qs, ks = numbered(pp), numbered(kp)
    issues = []
    if not ks:
        issues.append('Key needs a separate transcription or no key is available.')
    if set(qs) != set(ks):
        issues.append(f'Question/key numbering differs ({len(qs)} versus {len(ks)}).')
    if len(qs) < 10:
        issues.append('Section/subpart numbering needs manual mapping.')
    fields = []
    for n, q in qs.items():
        answer = ks.get(n, {}).get('text', '')
        opt = options(q['text'])
        letter = re.fullmatch(r'([A-H])\s*[.)]?', answer)
        kind = 'mcq' if letter and opt and letter[1] in [o['id'] for o in opt[1]] else 'frq'
        if answer.startswith(q['text'][:min(60, len(q['text']))]) and len(q['text']) > 30:
            issues.append(f'Question {n}: key repeats test text; inspect answer formatting.')
        if not answer or re.fullmatch(r'(?:various answers|answers (?:may )?vary|\(see picture\))\.?', answer, re.I):
            issues.append(f'Question {n}: reference answer missing or unspecified.')
        fields.append({'id': str(n), 'page': q['page'], 'prompt': opt[0] if kind == 'mcq' else q['text'],
                       'options': opt[1] if kind == 'mcq' else [], 'type': kind, 'answer': answer,
                       'points': explicit_points(q['text'], answer)})
    return {'id': source['id'], 'fields': fields, 'issues': issues, 'pages': len(pp),
            'cover': clean(pp[0])[:1200]}


def write_reviewed(source, profile, inspected):
    test = {k: source[k] for k in ['id', 'sourceUrl', 'division', 'eventId', 'competition', 'year', 'level', 'paperUrl', 'keyUrl']}
    if source.get('sourceId'):
        test['sourceId'] = source['sourceId']
    test.update(season=2027, reviewedOn='2026-10-11', levelEvidence=None, minutes=50,
                gradingMode='published-key', rulesUrl=f"/rules/2027/c/{source['eventId']}.pdf",
                instructions='Use the complete original paper and any linked image sheet for diagrams and tables. Answer all labeled parts of each written question in its text box. Written explanations are checked only after you click Auto Grade.',
                questions=[], keys={})
    test.update({k: v for k, v in profile.items() if k not in ['overrides', 'omit', 'defaultPoints']})
    if test['level']:
        test['levelEvidence'] = {'sourceUrl': source['sourceUrl'], 'text': profile.get('levelText', source.get('levelText', source['competition'])), 'basis': 'Competition level reported by the source cover or listing'}
    test.pop('levelText', None)
    pp = pages(source['paperPath'])
    fields = copy.deepcopy(inspected['fields'])
    for field in fields:
        n = field['id']
        if n in profile.get('omit', []):
            continue
        field.update(profile.get('overrides', {}).get(n, {}))
        points = field['points'] if field['points'] is not None else profile.get('defaultPoints', 1)
        answer = field['answer']
        assert answer and not re.fullmatch(r'various answers|answers (?:may )?vary', answer, re.I), n
        question = {k: field[k] for k in ['id', 'page', 'prompt', 'type']}
        question.update(label=f'Question {n}', points=points,
                        context=clean('\n'.join(pp[max(0, field['page'] - 2):field['page'] + 1]))[:24000])
        if field['type'] == 'mcq':
            question['options'] = field['options']
            question['multiple'] = False
            assert answer in [option['id'] for option in question['options']], n
            test['keys'][n] = {'correctOption': answer}
        else:
            # Complex explanations and compound responses never receive keyword credit.
            accepted = field.get('accepted', [answer] if len(answer) < 65 and not re.search(r'\b(?:because|explain|various|sample|credit)\b|[;\n]', answer, re.I) else [])
            criterion = {'id': 'answer', 'points': points, 'answer': answer, 'accepted': accepted}
            if field.get('numeric'):
                criterion['numeric'] = field['numeric']
            test['keys'][n] = {'criteria': field.get('criteria', [criterion])}
        test['questions'].append(question)
    test['questionCount'] = len(test['questions'])
    test['maxScore'] = sum(q['points'] for q in test['questions'])
    DRAFTS.mkdir(parents=True, exist_ok=True)
    (DRAFTS / (test['id'] + '.json')).write_text(json.dumps(test, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    return test


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--reviewed', help='Explicitly reviewed profiles, keyed by source ID')
    args = parser.parse_args()
    sources = json.loads((ROOT / 'conversion-manifest.json').read_text())
    profiles = json.loads(Path(args.reviewed).read_text(encoding='utf-8')) if args.reviewed else {}
    reports = []
    for source in sources:
        if args.reviewed and source['id'] not in profiles:
            continue
        inspected = inspect(source)
        reports.append(inspected)
        if source['id'] in profiles:
            test = write_reviewed(source, profiles[source['id']], inspected)
            print(test['id'], test['questionCount'], test['maxScore'])
    (ROOT / 'offline-drafts-audit.json').write_text(json.dumps(reports, ensure_ascii=False, indent=2), encoding='utf-8')
    print('Inspected', len(reports), 'papers without AI.')
