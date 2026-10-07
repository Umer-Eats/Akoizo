"""Rebuild event PDF sections from the checked-in 2027 manuals (requires pypdf)."""

import json
from pathlib import Path

from pypdf import PdfReader, PdfWriter


ROOT = Path(__file__).resolve().parents[1]
RULES = ROOT / "public/rules/2027"
PAGE_RANGES = json.loads((ROOT / "src/lib/event-rule-pages.json").read_text())


def main():
    count = 0
    for division, events in PAGE_RANGES.items():
        source = PdfReader(RULES / f"division-{division.lower()}.pdf")
        output_dir = RULES / division.lower()
        output_dir.mkdir(exist_ok=True)
        for event_id, (first, last) in events.items():
            if not 1 <= first <= last <= len(source.pages):
                raise ValueError(f"Invalid page range: {division}/{event_id}")
            writer = PdfWriter()
            for page in source.pages[first - 1:last]:
                writer.add_page(page)
            writer.add_metadata({
                "/Title": f"{event_id.replace('-', ' ').title()} - Division {division} - 2027 Rules",
                "/Author": "Florida Science Olympiad" if division == "A" else "Science Olympiad, Inc.",
                "/Subject": f"Original rulebook PDF pages {first}-{last}; original page content and numbering retained.",
            })
            path = output_dir / f"{event_id}.pdf"
            writer.write(path)
            result = PdfReader(path)
            assert len(result.pages) == last - first + 1, path
            for offset, page in enumerate(result.pages):
                original = source.pages[first - 1 + offset]
                assert page.extract_text() == original.extract_text(), path
                assert page.mediabox == original.mediabox, path
            count += 1
        print(f"Division {division}: extracted and verified {len(events)} event sections.")
    print(f"Verified all {count} PDFs against their source pages.")


if __name__ == "__main__":
    main()
