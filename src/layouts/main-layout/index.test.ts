import type { LoaderFunctionArgs } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { mergeCartsApi } from "@/features/cart/api/user-cart/merge-carts";
import { setUserIntent } from "@/stores/slices/user-slice";
import { CheckoutType } from "@/types/checkout";

import { mainLayoutLoader } from "./index";

// The loader reads and updates the app's store directly, so the test gives it a
// fake one: getState returns whatever user the test sets up, and dispatch only
// records what was dispatched.
const store = vi.hoisted(() => ({ getState: vi.fn(), dispatch: vi.fn() }));
vi.mock("@/stores/store", () => ({ store }));

const mergeCarts = vi.spyOn(mergeCartsApi.endpoints.mergeCarts, "initiate");

const visit = (
  pathname: string,
  user: { checkoutIntent: CheckoutType; isAuthenticated: boolean },
) => {
  store.getState.mockReturnValue({ user });

  return mainLayoutLoader({
    request: new Request(`http://localhost${pathname}`),
    params: {},
  } as LoaderFunctionArgs);
};

describe("mainLayoutLoader guest cart merge", () => {
  beforeEach(() => {
    store.dispatch.mockClear();
    mergeCarts.mockClear();
  });

  it("merges the guest cart when a signed-in user leaves the checkout", async () => {
    await visit("/", { checkoutIntent: CheckoutType.SESSION, isAuthenticated: true });

    expect(mergeCarts).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(setUserIntent(CheckoutType.NORMAL));
  });

  it("keeps a guest's cart as it is when they abandon the login step", async () => {
    await visit("/", { checkoutIntent: CheckoutType.SESSION, isAuthenticated: false });

    expect(mergeCarts).not.toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(setUserIntent(CheckoutType.NORMAL));
  });

  it("never merges after a buy-now checkout", async () => {
    await visit("/", { checkoutIntent: CheckoutType.BUY_NOW, isAuthenticated: true });

    expect(mergeCarts).not.toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(setUserIntent(CheckoutType.NORMAL));
  });

  it("does nothing on a plain visit without a checkout intent", async () => {
    await visit("/", { checkoutIntent: CheckoutType.NORMAL, isAuthenticated: true });

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it("does nothing while the user is still on the checkout or login page", async () => {
    await visit("/checkout", { checkoutIntent: CheckoutType.SESSION, isAuthenticated: true });
    await visit("/auth/login", { checkoutIntent: CheckoutType.SESSION, isAuthenticated: false });

    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
