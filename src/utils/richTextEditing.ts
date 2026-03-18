import { Document, Edit } from '../types';
type Character = { ch: string; color: string };

// Flatten document into shallow array of characters with colors attached to each character
function documentToCharacters(document: Document): Character[] {
  return document.content.reduce((acc, each) => {
    const { text, color } = each;
    for (const ch of text) acc.push({ ch, color });
    return acc;
  }, [] as Character[]);
}

// Turn shallow array of characters into a document by grouping characters with the same color into one element
function charactersToDocument(characters: Character[]): Document {
  return characters.reduce(
    (acc, each) => {
      const { ch, color } = each;

      // last text element in document
      const text = acc.content[acc.content.length - 1];

      // checks to see if text color matches the current color
      // yes: add new element
      // no: concat character to text
      if (!acc.content.length || text.color !== color) acc.content.push({ text: ch, color });
      else text.text += ch;

      return acc;
    },
    { content: [] } as Document,
  );
}

/**
    Replaces the Document with the selection of new text from Edit
    - the replacement text takes the color of the character before the starting index
*/
export function richTextEditing(document: Document, edit: Edit): Document {
  const characters = documentToCharacters(document);

  const { selection, replacement } = edit;
  const { startIndex, length } = selection;
  const endIndex = startIndex + length;

  const replacementColor = characters[Math.max(0, startIndex - 1)].color;
  const replacementCharacters: Character[] = [];
  for (const ch of replacement) replacementCharacters.push({ ch, color: replacementColor });

  return charactersToDocument([
    ...characters.slice(0, startIndex),
    ...replacementCharacters,
    ...characters.slice(endIndex),
  ]);
}
