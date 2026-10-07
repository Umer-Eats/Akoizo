import json

with open(r'C:\Users\umerq\Downloads\Akoizo\scioly_all_tests.json', encoding='utf-8-sig') as f:
    tests = json.load(f)

print(f"Total tests: {len(tests)}")

# Analyze divisions
divisions = {}
for t in tests:
    d = t['division']
    divisions[d] = divisions.get(d, 0) + 1
print(f"\nDivisions: {divisions}")

# Analyze competition levels from tournament names
levels = {'Regional': 0, 'State': 0, 'National': 0, 'Invitational': 0, 'Unknown': 0, 'Other': 0}
for t in tests:
    tourney = t['tournament'].lower()
    if 'regional' in tourney or 'region' in tourney:
        levels['Regional'] += 1
    elif 'state' in tourney:
        levels['State'] += 1
    elif 'national' in tourney:
        levels['National'] += 1
    elif 'invitational' in tourney or 'invit' in tourney:
        levels['Invitational'] += 1
    elif t['tournament'] == 'Unknown':
        levels['Unknown'] += 1
    else:
        levels['Other'] += 1
print(f"\nCompetition levels: {levels}")

# Events with topics
events_with_topics = {}
for t in tests:
    if t['topic']:
        key = f"{t['event']} ({t['division']})"
        if key not in events_with_topics:
            events_with_topics[key] = set()
        events_with_topics[key].add(t['topic'])

print(f"\nEvents with topics ({len(events_with_topics)}):")
for event, topics in sorted(events_with_topics.items()):
    print(f"  {event}: {', '.join(sorted(topics))}")

# Year range
years = [int(t['year']) for t in tests if t['year'].isdigit()]
print(f"\nYear range: {min(years)} - {max(years)}")

# Unique events
events = set()
for t in tests:
    events.add(f"{t['event']} ({t['division']})")
print(f"\nUnique events: {len(events)}")

# Save organized data
organized = {
    'tests': tests,
    'summary': {
        'total': len(tests),
        'divisions': divisions,
        'competition_levels': levels,
        'year_range': f"{min(years)}-{max(years)}",
        'unique_events': len(events),
        'events_with_topics': {k: list(v) for k, v in events_with_topics.items()}
    }
}

with open(r'C:\Users\umerq\Downloads\Akoizo\scioly_organized.json', 'w', encoding='utf-8') as f:
    json.dump(organized, f, indent=2, ensure_ascii=False)

print("\nSaved organized data to scioly_organized.json")