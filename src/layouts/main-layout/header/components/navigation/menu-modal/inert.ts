/**
 * The menu keeps every view mounted so it can slide between them, which leaves
 * the off-screen ones clickable, tabbable and visible to screen readers.
 * `inert` takes a subtree out of all three at once.
 *
 * Spread rather than passed as a prop: React 18 renders `inert={false}` as
 * `inert="false"`, which is still inert. Presence is what counts.
 */
export const inert = (isInert: boolean): Record<string, string> => (isInert ? { inert: "" } : {});
