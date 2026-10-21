export type SheetLevel = 'regional' | 'state' | 'national';
export type SheetUpload = { name: string; mime: string; data: string };
export type SheetDivision = 'B' | 'C';
export type SheetInput = {
  eventId: string;
  division: SheetDivision;
  title: string;
  level: SheetLevel;
  notes: string;
  exclusions: string;
  uploads: SheetUpload[];
};
export type SheetDiagram = {
  title: string;
  nodes: { label: string; x: number; y: number }[];
  edges: { from: number; to: number; label: string }[];
};
export type SheetSection = {
  heading: string;
  facts: string[];
  table: { headers: string[]; rows: string[][] };
  diagrams: SheetDiagram[];
  // Ids from the reviewed figure catalog. Absent on sheets generated before figures existed.
  figures?: string[];
};
export type SheetContent = { sections: SheetSection[] };
export type SheetCard = {
  id: string;
  eventId: string;
  title: string;
  level: SheetLevel;
  createdAt: string;
  schoolName: string;
  hasExclusions: boolean;
  imageCount: number;
};
export type CheatSheet = SheetCard & {
  content: SheetContent;
  images: SheetUpload[];
  exclusions: string;
  published: boolean;
};
