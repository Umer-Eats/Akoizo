import type { SheetUpload, SheetLevel } from './cheatsheet-types.ts';

export type BinderInput = {
  eventId: string;
  title: string;
  level: SheetLevel;
  pageCount: number;
  notes: string;
  uploads: SheetUpload[];
};
// `pages` is the section's share of the binder; topics fill in over several planning calls.
export type BinderSection = { title: string; focus: string; pages: number; topics: string[] };
export type BinderPlan = { sections: BinderSection[] };
export type BinderDiagramKind = 'flow' | 'cycle' | 'layers' | 'compare' | 'scale' | 'plot';
export type BinderDiagram = {
  kind: BinderDiagramKind;
  title: string;
  caption: string;
  items: { label: string; detail: string }[];
  xLabel: string;
  yLabel: string;
  series: { name: string; points: { x: number; y: number }[] }[];
};
// An unmodified Wikimedia Commons file, credited beside every use.
export type BinderPhoto = {
  src: string;
  source: string;
  title: string;
  author: string;
  license: string;
};
export type BinderPage = {
  heading: string;
  paragraphs: string[];
  takeaways: string[];
  table: { headers: string[]; rows: string[][] };
  diagram: BinderDiagram;
  imageIndex: number;
  imageCaption: string;
  photoQuery: string;
  photo: BinderPhoto | null;
  sources: string[];
};
export type BinderCard = {
  id: string;
  eventId: string;
  title: string;
  level: SheetLevel;
  pageCount: number;
  completedPages: number;
  status: 'generating' | 'ready' | 'published' | 'cancelled';
  schoolName: string;
  createdAt: string;
  generatedAt: string | null;
  // Only present on a job that is still outlining its topics.
  plannedPages?: number;
};
export type Binder = BinderCard & { plan: BinderPlan; pages: BinderPage[]; images: SheetUpload[] };
export type BinderLibrary = {
  binders: BinderCard[];
  jobs: BinderCard[];
  nextCursor: string | null;
};
