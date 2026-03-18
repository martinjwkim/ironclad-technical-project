export type AddInput = { a: number; b: number };

/**
 * Small helper used by JSON-driven test cases in `src/testCases/`.
 */
export function add(input: AddInput): number {
  return input.a + input.b;
}

