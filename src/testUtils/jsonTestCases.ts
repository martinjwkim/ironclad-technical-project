import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

export type JsonTestCase<I, O> = {
  name?: string;
  input: I;
  expected: O;
};

type JsonTestCasesFile<I, O> =
  | JsonTestCase<I, O>[]
  | { cases: JsonTestCase<I, O>[] }
  | { tests: JsonTestCase<I, O>[] };

function normalizeCases<I, O>(raw: JsonTestCasesFile<I, O>): JsonTestCase<I, O>[] {
  if (Array.isArray(raw)) return raw;
  if ('cases' in raw) return raw.cases;
  if ('tests' in raw) return raw.tests;
  return [];
}

export function loadJsonTestCases<I, O>(filePath: string): JsonTestCase<I, O>[] {
  const resolved = path.resolve(filePath);
  const text = fs.readFileSync(resolved, 'utf8');
  const raw = JSON.parse(text) as JsonTestCasesFile<I, O>;
  return normalizeCases(raw);
}

/**
 * Jest helper:
 * - JSON file format can be either:
 *   - an array: [{ "name": "case 1", "input": ..., "expected": ... }]
 *   - or an object: { "cases": [...] } / { "tests": [...] }
 */
export function defineJsonTestCases<I, O>(
  filePath: string,
  fnUnderTest: (input: I) => O,
  suiteName = path.basename(filePath),
): void {
  const cases = loadJsonTestCases<I, O>(filePath);

  // These globals exist in Jest test environments.
  describe(suiteName, () => {
    cases.forEach((c, idx) => {
      const testName = c.name ?? `case ${idx + 1}`;
      test(testName, () => {
        const actual = fnUnderTest(c.input);
        assert.deepStrictEqual(actual, c.expected);
      });
    });
  });
}
