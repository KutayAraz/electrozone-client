import { describe, expect, it } from "vitest";

import { CheckoutType } from "@/types/checkout";

import { shouldMergeGuestCartOnLogin } from "./should-merge-guest-cart";

describe("shouldMergeGuestCartOnLogin", () => {
  it("merges after a normal login", () => {
    expect(shouldMergeGuestCartOnLogin(2, CheckoutType.NORMAL)).toBe(true);
  });

  it("merges after a login for buy now, which checks out a separate cart", () => {
    expect(shouldMergeGuestCartOnLogin(2, CheckoutType.BUY_NOW)).toBe(true);
  });

  it("keeps the guest cart separate for a guest on their way to checkout", () => {
    expect(shouldMergeGuestCartOnLogin(2, CheckoutType.SESSION)).toBe(false);
  });

  it("skips the merge when the guest cart is empty", () => {
    expect(shouldMergeGuestCartOnLogin(0, CheckoutType.NORMAL)).toBe(false);
    expect(shouldMergeGuestCartOnLogin(undefined, CheckoutType.NORMAL)).toBe(false);
  });
});
