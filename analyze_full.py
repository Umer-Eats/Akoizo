import json

with open(r'C:\Users\umerq\Downloads\Akoizo\scioly_all_tests_full.json', encoding='utf-8-sig') as f:
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

# Organize by division and event
organized = {'B': {}, 'C': {}, 'BC': {}}
for t in tests:
    div = t['division']
    event = t['event']
    if event not in organized[div]:
        organized[div][event] = {
            'topics': set(),
            'competition_levels': set(),
            'tests': []
        }
    if t['topic']:
        organized[div][event]['topics'].add(t['topic'])
    
    tourney = t['tournament'].lower()
    if 'regional' in tourney or 'region' in tourney:
        level = 'Regional'
    elif 'state' in tourney:
        level = 'State'
    elif 'national' in tourney:
        level = 'National'
    elif 'invitational' in tourney or 'invit' in tourney:
        level = 'Invitational'
    elif t['tournament'] == 'Unknown':
        level = 'Unknown'
    else:
        level = 'Other'
    organized[div][event]['competition_levels'].add(level)
    organized[div][event]['tests'].append({
        'year': t['year'],
        'topic': t['topic'],
        'tournament': t['tournament'],
        'level': level,
        'uploader': t['uploader'],
        'rating': t['rating'],
        'url': t['url']
    })

# Convert sets to lists for JSON serialization
for div in organized:
    for event in organized[div]:
        organized[div][event]['topics'] = sorted(list(organized[div][event]['topics']))
        organized[div][event]['competition_levels'] = sorted(list(organized[div][event]['competition_levels']))

# Save organized data
output = {
    'summary': {
        'total_tests': len(tests),
        'divisions': divisions,
        'competition_levels': levels,
        'year_range': f"{min(years)}-{max(years)}",
        'unique_events': len(events),
        'events_with_topics': {k: sorted(list(v)) for k, v in events_with_topics.items()}
    },
    'by_division_and_event': organized,
    'all_tests': tests
}

with open(r'C:\Users\umerq\Downloads\Akoizo\scioly_final_organized.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print("\nSaved final organized data to scioly_final_organized.json")