interface QuerySubscription<T> {
  unwrap: () => Promise<T>;
  unsubscribe: () => void;
}

/**
 * Resolves an RTK Query request started from a route loader, e.g.
 * `loadQuery(store.dispatch(api.endpoints.getThing.initiate(id)))`.
 *
 * - Throws on API errors, so a failed request reaches the route's error boundary
 *   instead of handing the page `undefined` data.
 * - Releases the cache subscription. A loader reads the result once, and a
 *   subscription left open keeps the entry alive forever: `keepUnusedDataFor` never
 *   runs, so the page keeps getting the first response it ever saw.
 */
export const loadQuery = async <T>(query: QuerySubscription<T>): Promise<T> => {
  try {
    return await query.unwrap();
  } finally {
    query.unsubscribe();
  }
};
