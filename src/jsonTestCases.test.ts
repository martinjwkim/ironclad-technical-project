import fs from 'node:fs';
import path from 'node:path';
import { defineJsonTestCases } from './testUtils';
import { add, parseJson } from './utils';

const casesDir = path.join(__dirname, 'testCases');

function collectJsonFiles(dirPath: string): string[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  return entries.flatMap((ent) => {
    const fullPath = path.join(dirPath, ent.name);
    if (ent.isDirectory()) return collectJsonFiles(fullPath);
    if (ent.isFile() && ent.name.endsWith('.json')) return [fullPath];
    return [];
  });
}

const jsonFilePaths = collectJsonFiles(casesDir).sort((a, b) => a.localeCompare(b));

if (jsonFilePaths.length === 0) {
  throw new Error(`No JSON files found in ${casesDir}`);
}

function getFnForCaseFile(filePath: string): (input: unknown) => unknown {
  const suiteName = path.basename(filePath, '.json');
  switch (suiteName) {
    case 'add':
      return (input) => add(input as { a: number; b: number });
    case 'parseJson':
      return (input) => parseJson(input as string);
    default:
      throw new Error(
        `No test target function mapped for JSON file ${path.basename(filePath)}.`,
      );
  }
}

jsonFilePaths.forEach((filePath) => {
  const suiteName = path.basename(filePath, '.json');
  const fnUnderTest = getFnForCaseFile(filePath);
  defineJsonTestCases<any, any>(filePath, fnUnderTest, suiteName);
});
