import { describe, expect, it } from "vitest";

import {
  addToWishlist,
  clearWishlist,
  removeFromWishlist,
  setWishlist,
  wishlistSlice,
} from "./wishlist-slice";

// A reducer is a plain function: (state, action) => new state. No store or
// rendering is needed to test it.
const reducer = wishlistSlice.reducer;

describe("wishlistSlice", () => {
  it("starts with an empty wishlist", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({ items: [] });
  });

  describe("addToWishlist", () => {
    it("adds a product id", () => {
      const state = reducer({ items: [1] }, addToWishlist(2));

      expect(state.items).toEqual([1, 2]);
    });

    it("ignores a product that is already in the wishlist", () => {
      const state = reducer({ items: [1, 2] }, addToWishlist(2));

      expect(state.items).toEqual([1, 2]);
    });
  });

  describe("removeFromWishlist", () => {
    it("removes the product id", () => {
      const state = reducer({ items: [1, 2, 3] }, removeFromWishlist(2));

      expect(state.items).toEqual([1, 3]);
    });

    it("does nothing when the product is not in the wishlist", () => {
      const state = reducer({ items: [1, 3] }, removeFromWishlist(2));

      expect(state.items).toEqual([1, 3]);
    });
  });

  it("setWishlist replaces all items", () => {
    const state = reducer({ items: [1, 2] }, setWishlist([7, 8, 9]));

    expect(state.items).toEqual([7, 8, 9]);
  });

  it("clearWishlist empties the wishlist", () => {
    const state = reducer({ items: [1, 2, 3] }, clearWishlist());

    expect(state.items).toEqual([]);
  });
});
