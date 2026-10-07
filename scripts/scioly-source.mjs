// Public archive metadata only. Login-gated file access is never bypassed.
export function readPageData(html) {
  const stream = [...html.matchAll(/self\.__next_f\.push\((\[.*?\])\)<\/script>/gs)]
    .map((match) => {
      try {
        return JSON.parse(match[1])[1] ?? '';
      } catch {
        return '';
      }
    })
    .join('');
  const metadataMarker = '"metadata":';
  const filesMarker = '"files":';

  function parseJsonAt(text, start) {
    const opening = text[start];
    const closing = opening === '{' ? '}' : ']';
    let depth = 0;
    let inString = false;
    let escaped = false;
    for (let index = start; index < text.length; index += 1) {
      const character = text[index];
      if (inString) {
        if (escaped) escaped = false;
        else if (character === '\\') escaped = true;
        else if (character === '"') inString = false;
        continue;
      }
      if (character === '"') inString = true;
      else if (character === opening) depth += 1;
      else if (character === closing && --depth === 0)
        return JSON.parse(text.slice(start, index + 1));
    }
    throw new Error('Unterminated archive JSON value');
  }

  const metadataIndex = stream.indexOf(metadataMarker);
  const filesIndex = stream.indexOf(filesMarker, metadataIndex);
  if (metadataIndex < 0 || filesIndex < 0) throw new Error('Archive file metadata unavailable');
  const metadata = parseJsonAt(stream, stream.indexOf('{', metadataIndex));
  const files = parseJsonAt(stream, stream.indexOf('[', filesIndex));
  const downloadMarker = '"canDownloadFiles":';
  const downloadIndex = stream.indexOf(downloadMarker, filesIndex);
  const canDownloadFiles =
    downloadIndex < 0
      ? undefined
      : stream
          .slice(downloadIndex + downloadMarker.length)
          .trimStart()
          .startsWith('true');
  return { metadata, files, canDownloadFiles };
}

export function reportedCompetitionLevel(tournament) {
  // Invitational names, including State University and National Invitational, do not establish a rules tier.
  if (/\binvit(?:ational|e)?\b/i.test(tournament)) return null;
  if (/\b(?:regional(?:s)?|regions?|region\s*\d+)\b/i.test(tournament)) return 'Regionals';
  if (/\b(?:national(?:s)?|national championship(?:s)?)\b/i.test(tournament)) return 'Nationals';
  if (
    /\bstate(?:s)?\b/i.test(tournament) &&
    !/\bstate\s+(?:university|college)\b/i.test(tournament)
  )
    return 'States';
  return null;
}

export function normalizeSource(test) {
  const sourceId = test.url_id ?? test.url?.split('/').pop();
  if (!/^[\w-]{11}$/.test(sourceId) || !/^(?:B|C|BC)$/.test(test.division)) return null;
  const competition = test.tournament?.trim() || 'Competition not reported';
  const level = reportedCompetitionLevel(competition);
  const topicValue = test.topics ?? test.topic ?? '';
  return {
    sourceId,
    sourceUrl: `https://scioly.org/tests/${sourceId}`,
    event: test.event,
    divisions: [...test.division],
    year: Number(test.season ?? test.year),
    competition,
    level,
    levelEvidence: level
      ? {
          sourceUrl: `https://scioly.org/tests/${sourceId}`,
          text: competition,
          basis: 'Reported tournament level',
        }
      : null,
    topics: (Array.isArray(topicValue) ? topicValue : String(topicValue).split(','))
      .map((t) => t.trim())
      .filter(Boolean),
    files: [],
    status: 'metadata-only',
  };
}
