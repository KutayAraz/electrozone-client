export type ModalPlacement = "left" | "right" | "bottom" | "center";

/**
 * Alignment for the positioning layer, which is a grid covering the viewport.
 * Keeping alignment on the layer leaves the panel's own `transform` free for
 * the enter/exit animation.
 *
 * A call site can override this per breakpoint from its own `className` with
 * the grid item utilities, e.g. `self-end sm:self-center`.
 */
export const layerAlignment: Record<ModalPlacement, string> = {
  left: "items-stretch justify-items-start",
  right: "items-stretch justify-items-end",
  bottom: "items-end justify-items-center",
  center: "items-center justify-items-center",
};
