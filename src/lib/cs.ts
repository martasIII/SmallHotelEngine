/**
 * České skloňování podle počtu: 1 pokoj, 2–4 pokoje, 5+ pokojů (a 0 pokojů).
 */
export function plural(count: number, one: string, few: string, many: string): string {
  if (count === 1) return one;
  if (count >= 2 && count <= 4) return few;
  return many;
}
