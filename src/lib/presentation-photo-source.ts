// The shape of a presentation figure and links to where it was found. Shared by
// presentation-photos.ts and the per-event presentation-photos-<event>.ts files.

export type Photo = {
  file: string;
  width: number;
  height: number;
  alt: string;
  /** What students are looking at, shown under the image. */
  caption: string;
  credit: string;
  source: string;
};

export const commons = (name: string) => `https://commons.wikimedia.org/wiki/File:${name}`;
export const nasa = (id: string) => `https://images.nasa.gov/details/${id}`;
export const enwiki = (name: string) => `https://en.wikipedia.org/wiki/File:${name}`;
