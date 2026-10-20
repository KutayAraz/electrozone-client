import type { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { clearCredentials } from "@/stores/slices/user-slice";

import { refreshAuth } from "./refresh-auth";

// refreshAuth sends its requests through fetchBaseQuery. Swapping that for a fake
// lets each test decide what the "server" answers, without any real network.
const fakeServer = vi.hoisted(() => vi.fn());

vi.mock("@reduxjs/toolkit/query/react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@reduxjs/toolkit/query/react")>()),
  fetchBaseQuery: () => fakeServer,
}));

const getUrl = (args: string | FetchArgs) => (typeof args === "string" ? args : args.url);
const refreshCalls = () =>
  fakeServer.mock.calls.filter(([args]) => getUrl(args) === "/auth/refresh").length;

const createApi = () => ({ dispatch: vi.fn() }) as unknown as BaseQueryApi;

describe("refreshAuth", () => {
  beforeEach(() => {
    fakeServer.mockReset();
  });

  it("refreshes the session and retries the request after a 401", async () => {
    let hasValidToken = false;
    fakeServer.mockImplementation((args: string | FetchArgs) => {
      if (getUrl(args) === "/auth/refresh") {
        hasValidToken = true;
        return { data: {} };
      }
      return hasValidToken ? { data: "my orders" } : { error: { status: 401 } };
    });
    const api = createApi();

    const result = await refreshAuth("/orders", api, {});

    expect(result).toEqual({ data: "my orders" });
    expect(refreshCalls()).toBe(1);
    expect(api.dispatch).not.toHaveBeenCalled();
  });

  it("logs the user out when the refresh fails", async () => {
    fakeServer.mockReturnValue({ error: { status: 401 } });
    const api = createApi();

    const result = await refreshAuth("/orders", api, {});

    expect(result).toEqual({ error: { status: 401 } });
    expect(api.dispatch).toHaveBeenCalledWith(clearCredentials());
  });

  it("refreshes only once when several requests fail at the same time", async () => {
    let hasValidToken = false;
    fakeServer.mockImplementation((args: string | FetchArgs) => {
      if (getUrl(args) === "/auth/refresh") {
        hasValidToken = true;
        return { data: {} };
      }
      return hasValidToken ? { data: getUrl(args) } : { error: { status: 401 } };
    });
    const api = createApi();

    const results = await Promise.all([
      refreshAuth("/orders", api, {}),
      refreshAuth("/wishlist", api, {}),
      refreshAuth("/cart", api, {}),
    ]);

    expect(results).toEqual([{ data: "/orders" }, { data: "/wishlist" }, { data: "/cart" }]);
    expect(refreshCalls()).toBe(1);
  });
});
