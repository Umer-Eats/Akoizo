// Shared shapes for the notebook: notebooks hold sections, sections hold pages.
export const notebookColors = [
  'blue',
  'purple',
  'pink',
  'yellow',
  'green',
  'orange',
  'unassigned',
] as const;
export type NotebookColor = (typeof notebookColors)[number];

export const noteSourceKinds = ['event', 'unit', 'lesson', 'practice', 'lab', 'tool'] as const;
export type NoteSourceKind = (typeof noteSourceKinds)[number];

/** Where a page came from: a lesson, a practice test or another event tool. */
export type NoteSource = {
  eventId: string;
  eventName: string;
  kind: NoteSourceKind;
  refId: string;
  label: string;
  href: string;
};

export type Notebook = {
  id: string;
  title: string;
  eventId: string | null;
  division: 'A' | 'B' | 'C' | null;
  color: NotebookColor;
  sections: string[];
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type NoteSummary = {
  id: string;
  notebookId: string;
  section: string;
  title: string;
  tags: string[];
  links: string[];
  pinned: boolean;
  source: NoteSource | null;
  words: number;
  excerpt: string;
  position: number;
  createdAt: string;
  updatedAt: string;
  trashedAt: string | null;
};

export type Note = NoteSummary & { html: string };

export type NotesIndex = {
  notebooks: Notebook[];
  notes: NoteSummary[];
  /** Events in the student's division that have lessons to build notes from. */
  lessonEvents: { id: string; name: string }[];
};

export type NoteContext = {
  note: Note;
  notebook: Notebook;
  pages: NoteSummary[];
};

export type NoteSearchHit = { id: string; snippet: string };

export const noteLimits = {
  notebooks: 80,
  notes: 3000,
  sections: 60,
  html: 600_000,
  title: 120,
  section: 120,
  images: 600,
  imageData: 1_500_000,
} as const;
