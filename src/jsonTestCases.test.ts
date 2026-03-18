import fs from 'node:fs';
import path from 'node:path';
import { Document, Edit } from './types';
import { richTextEditing } from './utils';

const casesDir = path.join(__dirname, 'testCases');

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
}

const caseDirs = fs
  .readdirSync(casesDir, { withFileTypes: true })
  .filter((ent) => ent.isDirectory())
  .map((ent) => ent.name)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

if (caseDirs.length === 0) {
  throw new Error(`No test case folders found in ${casesDir}`);
}

caseDirs.forEach((caseDirName) => {
  const caseDir = path.join(casesDir, caseDirName);

  const before = readJsonFile<Document>(path.join(caseDir, 'before.json'));
  const edit = readJsonFile<Edit>(path.join(caseDir, 'edit.json'));
  const expected = readJsonFile<Document>(path.join(caseDir, 'result.json'));

  test(caseDirName, () => {
    const actual = richTextEditing(before, edit);
    expect(actual).toEqual(expected);
  });
});
