import { eventsForDivision } from './events.ts';
import { eventToolIds } from './event-rules.ts';

export type BuildDivision = 'B' | 'C';
// Labels include units; strings also support supervisor-specific instructions and “not applicable”.
export const buildFields: Record<string, string[]> = {
  'electric-vehicle': [
    'Target time (s)',
    'Target distance (m)',
    'Water bottle position (m from start)',
    'Bottle line distance (m beyond target)',
    'Cups (yes/no)',
    'Cup positions and gap (cm)',
    'Track width and surface',
  ],
  scrambler: [
    'Target distance (m)',
    'Target time (s, if applicable)',
    'Barrier position',
    'Bonus attempt (yes/no)',
    'Inside/outside can positions and gap (cm)',
    'Track width and surface',
  ],
  hovercraft: [
    'Target time (s)',
    'Travel distance (m)',
    'Track width (cm)',
    'Surface',
    'Mass load / pennies',
  ],
  boomilever: [
    'Loading position / wall geometry (cm)',
    'Maximum load (kg)',
    'Test wall and clearance',
    'Loading apparatus',
  ],
  'elastic-launched-gliders': [
    'Ceiling height (m)',
    'Flying area dimensions (m)',
    'Launch area',
    'Obstructions',
  ],
  'wright-stuff': [
    'Ceiling height (m)',
    'Flying area dimensions (m)',
    'Launch area',
    'Obstructions',
  ],
  'ping-pong-parachute': [
    'Ceiling height (m)',
    'Launch area dimensions (m)',
    'Launch conditions',
    'Obstructions',
  ],
  'roller-coaster': [
    'Target time (s)',
    'Available footprint (cm)',
    'Maximum height (cm)',
    'Required gaps / track conditions',
  ],
  'mission-possible': [
    'Target time (s)',
    'Device area dimensions (cm)',
    'Start and final actions',
    'Planned action sequence',
  ],
  thermodynamics: [
    'Starting water temperature (°C)',
    'Water volume (mL)',
    'Cooling interval (min)',
    'Room temperature (°C)',
    'Testing station / device conditions',
  ],
  'water-quality': [
    'Salinometer test solution / sample',
    'Salinity range (ppt)',
    'Sample volume (mL)',
    'Testing station conditions',
  ],
  'protein-modeling': [
    'Protein / structure identifier',
    'Residue range',
    'Model scale',
    'Required structural features',
    'Modeling station conditions',
  ],
};
export type CourseNode = { label: string; x: number; y: number };
export type BuildCourse = {
  version: 1;
  season: 2027;
  division: BuildDivision;
  eventId: string;
  title: string;
  level: 'regional' | 'state' | 'national';
  parameters: Record<string, string>;
  notes: string;
  setup: string[];
  ruleReferences: string[];
  diagram: {
    view: string;
    nodes: CourseNode[];
    edges: { from: number; to: number; label: string }[];
  };
};
export type BuildGrade = {
  summary: string;
  score: number | null;
  scoreLabel: string;
  direction: string;
  formula: string;
  calculation: string;
  tier: string;
  criteria: {
    name: string;
    rule: string;
    evidence: string;
    timestamp: string;
    value: string;
    status: 'observed' | 'student-reported' | 'unverifiable';
  }[];
  penalties: string[];
  missing: string[];
  improvements: string[];
};
export const VIDEO_MIMES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/mpeg'];
export const MAX_VIDEO_BYTES = 100 * 1024 * 1024;

export function buildEvent(division: BuildDivision, eventId: string) {
  const event = eventsForDivision(division).find((e) => e.id === eventId);
  if (!event || !buildFields[eventId] || !eventToolIds(division, event).includes('video-grader'))
    throw new Error('Choose a build event available in your division.');
  return event;
}
export function blankCourse(division: BuildDivision, eventId: string): BuildCourse {
  const event = buildEvent(division, eventId);
  return {
    version: 1,
    season: 2027,
    division,
    eventId,
    title: `${event.name} practice setup`,
    level: 'regional',
    parameters: Object.fromEntries(buildFields[eventId].map((label) => [label, ''])),
    notes: '',
    setup: [],
    ruleReferences: [],
    diagram: { view: 'Setup schematic — not to scale', nodes: [], edges: [] },
  };
}
const record = (x: unknown): x is Record<string, unknown> =>
  !!x && typeof x === 'object' && !Array.isArray(x);
const short = (x: unknown, limit = 2000): x is string => typeof x === 'string' && x.length <= limit;
const strings = (x: unknown, max = 30): x is string[] =>
  Array.isArray(x) && x.length <= max && x.every((v) => short(v));

/** The same strict boundary is used for imported files, local drafts and model output. */
export function parseCourse(value: unknown, division: BuildDivision, eventId: string): BuildCourse {
  buildEvent(division, eventId);
  const c = value as BuildCourse;
  if (
    !record(c) ||
    c.version !== 1 ||
    c.season !== 2027 ||
    c.division !== division ||
    c.eventId !== eventId ||
    !short(c.title, 120) ||
    !c.title.trim() ||
    !['regional', 'state', 'national'].includes(c.level) ||
    !short(c.notes, 6000) ||
    !record(c.parameters) ||
    Object.keys(c.parameters).length !== buildFields[eventId].length ||
    buildFields[eventId].some((k) => !short(c.parameters[k], 1000)) ||
    !strings(c.setup) ||
    !strings(c.ruleReferences) ||
    !record(c.diagram) ||
    !short(c.diagram.view, 120) ||
    !Array.isArray(c.diagram.nodes) ||
    c.diagram.nodes.length > 20 ||
    c.diagram.nodes.some(
      (n) =>
        !record(n) ||
        !short(n.label, 90) ||
        !Number.isFinite(n.x) ||
        !Number.isFinite(n.y) ||
        n.x < 0 ||
        n.x > 100 ||
        n.y < 0 ||
        n.y > 100,
    ) ||
    !Array.isArray(c.diagram.edges) ||
    c.diagram.edges.length > 30 ||
    c.diagram.edges.some(
      (e) =>
        !record(e) ||
        !short(e.label, 90) ||
        !Number.isInteger(e.from) ||
        !Number.isInteger(e.to) ||
        e.from < 0 ||
        e.to < 0 ||
        e.from >= c.diagram.nodes.length ||
        e.to >= c.diagram.nodes.length,
    )
  )
    throw new Error('This course is invalid or belongs to a different event, division, or season.');
  // Reconstruct rather than preserve arbitrary imported properties.
  return {
    version: 1,
    season: 2027,
    division,
    eventId,
    title: c.title,
    level: c.level,
    parameters: Object.fromEntries(buildFields[eventId].map((k) => [k, c.parameters[k]])),
    notes: c.notes,
    setup: [...c.setup],
    ruleReferences: [...c.ruleReferences],
    diagram: {
      view: c.diagram.view,
      nodes: c.diagram.nodes.map(({ label, x, y }) => ({ label, x, y })),
      edges: c.diagram.edges.map(({ from, to, label }) => ({ from, to, label })),
    },
  };
}
export function parseGrade(value: unknown): BuildGrade {
  const g = value as BuildGrade;
  if (
    !record(g) ||
    !short(g.summary, 4000) ||
    !g.summary.trim() ||
    !(g.score === null || (typeof g.score === 'number' && Number.isFinite(g.score))) ||
    !['scoreLabel', 'direction', 'formula', 'calculation', 'tier'].every((k) =>
      short(g[k as keyof BuildGrade], 4000),
    ) ||
    !Array.isArray(g.criteria) ||
    g.criteria.length === 0 ||
    g.criteria.length > 40 ||
    g.criteria.some(
      (c) =>
        !record(c) ||
        !['name', 'rule', 'evidence', 'timestamp', 'value'].every((k) =>
          short(c[k as keyof typeof c]),
        ) ||
        !['observed', 'student-reported', 'unverifiable'].includes(c.status),
    ) ||
    !strings(g.penalties) ||
    !strings(g.missing) ||
    !strings(g.improvements) ||
    (g.missing.length > 0 && g.score !== null)
  )
    throw new Error('The grading response was incomplete. Please try again.');
  return g;
}

const xml = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]!,
  );
/** Text is escaped, so uploaded/generated labels can never become executable SVG. */
export function courseSvg(c: BuildCourse) {
  const wrap = (value: string, width: number) =>
    value
      .replace(/\s+/g, ' ')
      .match(new RegExp(`.{1,${width}}(?:\\s|$)|.{1,${width}}`, 'g'))
      ?.map((s) => s.trim()) || [''];
  const lines = (
    value: string,
    x: number,
    y: number,
    width: number,
    size: number,
    center = false,
  ) =>
    `<text x="${x}" y="${y}" font-size="${size}"${center ? ' text-anchor="middle"' : ''}>${wrap(
      value,
      width,
    )
      .map((line, i) => `<tspan x="${x}" dy="${i ? size + 5 : 0}">${xml(line)}</tspan>`)
      .join('')}</text>`;
  const titleLines = wrap(c.title, 64).length;
  const mapTop = 100 + (titleLines - 1) * 27;
  const pos = (n: CourseNode) => ({ x: 125 + n.x * 6.5, y: mapTop + 35 + n.y * 3 });
  let nextY = mapTop + 460;
  const params = Object.entries(c.parameters)
    .map(([k, v]) => {
      const value = `${k}: ${v || 'Not supplied'}`;
      const result = lines(value, 30, nextY, 105, 14);
      nextY += wrap(value, 105).length * 19 + 12;
      return result;
    })
    .join('');
  const height = nextY + 20;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 ${height}" role="img" aria-label="Course diagram and parameters">
  <rect width="900" height="${height}" fill="#f8fafc" rx="16"/><g font-family="Arial, sans-serif" fill="#15253a">
  ${lines(c.title, 30, 38, 64, 22)}<text x="30" y="${mapTop - 20}" font-size="14">Division ${c.division} · 2027 · ${c.level} · Schematic — not to scale</text>
  <rect x="30" y="${mapTop}" width="840" height="420" fill="#eef3fb" stroke="#c5d2e4" rx="12"/>
  ${c.diagram.edges
    .map((e, i) => {
      const a = pos(c.diagram.nodes[e.from]),
        b = pos(c.diagram.nodes[e.to]);
      return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#5378bc" stroke-width="3"/>${lines(e.label, (a.x + b.x) / 2, (a.y + b.y) / 2 - 16 - (i % 3) * 22, 28, 12, true)}`;
    })
    .join('')}
  ${c.diagram.nodes
    .map((n) => {
      const p = pos(n);
      const label = n.label.toLowerCase();
      const symbol = /bottle|cup|can\b/.test(label)
        ? `<rect x="${p.x - 8}" y="${p.y - 16}" width="16" height="30" rx="4" fill="#d6e6ff" stroke="#3b69af" stroke-width="3"/>`
        : /barrier|wall/.test(label)
          ? `<line x1="${p.x}" y1="${p.y - 28}" x2="${p.x}" y2="${p.y + 18}" stroke="#15253a" stroke-width="7"/>`
          : /start|launch/.test(label)
            ? `<line x1="${p.x}" y1="${p.y - 22}" x2="${p.x}" y2="${p.y + 14}" stroke="#287a61" stroke-width="5"/>`
            : /target|finish/.test(label)
              ? `<circle cx="${p.x}" cy="${p.y}" r="12" fill="#fff" stroke="#b95949" stroke-width="3"/><circle cx="${p.x}" cy="${p.y}" r="4" fill="#b95949"/>`
              : `<circle cx="${p.x}" cy="${p.y}" r="9" fill="#3b69af"/>`;
      return `${symbol}${lines(n.label, p.x, p.y + 35, 24, 12, true)}`;
    })
    .join('')}
  ${params}
  </g></svg>`;
}
