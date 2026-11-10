// Picks the motion for a route change so the page moves the way the user did:
// deeper pages rise in, going back settles out, sideways moves slide in nav order,
// and crossing between the public site and the workspace zooms through.

export type NavKind = 'forward' | 'back' | 'next' | 'prev' | 'zone-in' | 'zone-out' | 'swap';

const workspaceOrder = ['dashboard', 'notes', 'community', 'attendance', 'students', 'settings'];
const homeOrder = [
  '',
  'study-tools',
  'rankings',
  'mission',
  'support',
  'donate',
  'contact',
  'login',
];

function segments(path: string) {
  return path.split(/[?#]/)[0].split('/').filter(Boolean);
}

export function isWorkspacePath(path: string) {
  return workspaceOrder.includes(segments(path)[0] ?? '');
}

export function navKind(from: string, to: string): NavKind {
  const fromWorkspace = isWorkspacePath(from);
  const toWorkspace = isWorkspacePath(to);
  if (fromWorkspace !== toWorkspace) return toWorkspace ? 'zone-in' : 'zone-out';

  const a = segments(from);
  const b = segments(to);
  const order = toWorkspace ? workspaceOrder : homeOrder;
  const sectionA = a[0] ?? '';
  const sectionB = b[0] ?? '';

  // Moving between sections reads like the nav bar: left to right.
  if (sectionA !== sectionB) {
    const ia = order.indexOf(sectionA);
    const ib = order.indexOf(sectionB);
    if (ia === -1 || ib === -1 || ia === ib) return 'swap';
    return ib > ia ? 'next' : 'prev';
  }
  if (b.length > a.length) return 'forward';
  if (b.length < a.length) return 'back';
  return 'swap';
}
