import { beforeEach, describe, expect, it, vi } from "vitest";

import { setRedirectPath } from "@/stores/slices/redirect-slice";

import { redirectGuestToLogin } from "./redirect-guest-to-login";

const store = vi.hoisted(() => ({ getState: vi.fn(), dispatch: vi.fn() }));
vi.mock("@/stores/store", () => ({ store }));

const requestFor = (path: string) => new Request(`http://localhost${path}`);

describe("redirectGuestToLogin", () => {
  beforeEach(() => {
    store.dispatch.mockClear();
  });

  it("sends a guest to the login page and remembers where they were going", () => {
    store.getState.mockReturnValue({ user: { isAuthenticated: false } });

    const response = redirectGuestToLogin(requestFor("/checkout?step=1"));

    expect(response?.status).toBe(302);
    expect(response?.headers.get("Location")).toBe("/auth/login");
    expect(store.dispatch).toHaveBeenCalledWith(
      setRedirectPath({ path: "/checkout?step=1", source: "protected-route" }),
    );
  });

  it("lets a signed-in user through", () => {
    store.getState.mockReturnValue({ user: { isAuthenticated: true } });

    expect(redirectGuestToLogin(requestFor("/checkout"))).toBeNull();
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
