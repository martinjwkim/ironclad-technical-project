import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { defineJsonTestCases } from './testUtils';
import { parseJson } from './utils';

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ironclad-json-test-'));
const casesFile = path.join(dir, 'cases.json');

fs.writeFileSync(
  casesFile,
  JSON.stringify(
    [
      { name: 'valid number', input: '123', expected: 123 },
      { name: 'valid object', input: '{"a":1}', expected: { a: 1 } },
      { name: 'invalid json', input: '{oops}', expected: null },
    ],
    null,
    2,
  ),
  'utf8',
);

defineJsonTestCases<string, unknown>(casesFile, (input) => parseJson(input));
