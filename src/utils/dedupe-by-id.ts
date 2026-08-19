/**
 * Collapse a list of records to the first occurrence of each id.
 *
 * Offset pagination (`skip`/`limit`) only yields disjoint pages when the
 * server orders by something unique. When the sort column has ties, a row can
 * land in two windows - which turns into duplicate React keys, and React
 * leaves orphaned nodes behind when the list is later replaced. Deduping here
 * keeps a server-side ordering bug from becoming a rendering bug.
 */
export const dedupeById = <T extends { id: number | string }>(items: T[]): T[] => {
  const seen = new Set<T["id"]>();

  return items.filter((item) => {
    if (seen.has(item.id)) return false;

    seen.add(item.id);
    return true;
  });
};
