import { Draft, produce } from 'immer';

/**
 * Immutable state update helper using Immer.
 * @example
 *   const next = mutate(prev, draft => {
 *     draft.count += 1;
 *   });
 */
export function mutate<T>(base: T, recipe: (draft: Draft<T>) => void): T {
  return produce(base, recipe);
}
