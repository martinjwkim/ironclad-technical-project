// Types from READHME.md

export type Text = { text: string; color: string };
export type Document = { content: Text[] };
export type Selection = { startIndex: number; length: number };
export type Edit = {
  selection: Selection;
  replacement: string;
};
