# rich-text-editing

For this project you will write a program that accepts an input document and a desired edit in order to produce the correct resulting document.
We have provided 11 test cases to demonstrate the desired strategy.

Each of these test cases builds upon the complexity of the last one.
It is recommended to attempt to solve them in order.

A visual version of each test case is available [here](https://docs.google.com/document/d/1goSsMCTUqRvtYkqmsNXPWPSzp-EsLNmnrb3lw5wyErk/edit?usp=sharing).

## Requirements

Your solution should be able to read in one test case (or all of them) through any means, parse the input document and edits, and output (to the command line or a file) the resulting document.
You can use any language and any standard frameworks/libraries in your solution.

Your solution will be graded based on:

- algorithm design
- number of working test cases
  - discussion of a plan for the remaining test cases
- code quality (readability, organization, etc)

## Legend

### Input Format

#### `before.json`

The starting document of shape:

```ts
/**
 * A document with multiple text nodes
 */
interface Document {
  content: Text[];
}

/**
 * A text node of a certain color
 */
interface Text {
  color: string;
  text: string;
}
```

e.g.

```json
{
  "content": [
    {
      "text": "Basic Starting Document",
      "color": "black"
    }
  ]
}
```

#### `edit.json`

```ts
/**
 * Replace the text within the selection with new text
 */
interface Edit {
  selection: Selection;
  replacement: string;
}

/**
 * The part of the document a user wishes to edit
 */
interface Selection {
  /**
   * The index of the first character to include within the edit
   */
  startIndex: number;
  /**
   * The number of characters to be included in the editor
   */
  length: number;
}
```

e.g.

```json
{
  "selection": {
    "startIndex": 6,
    "length": 0
  },
  "replacement": "Inserted "
}
```

### Output

#### `result.json`

The same format as `before.json` above e.g.

```json
{
  "content": [
    {
      "text": "Basic Inserted Starting Document",
      "color": "black"
    }
  ]
}
```
