/**
 * Parse JSON safely (returns `null` on invalid JSON by default).
 */
export function parseJson<T = unknown>(text: string): T | null;
export function parseJson<T = unknown>(text: string, fallback: T): T;
export function parseJson<T = unknown>(text: string, fallback?: T): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {
    return fallback !== undefined ? fallback : null;
  }
}
