import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

import { clearCredentials } from "@/stores/slices/user-slice";

// Create a mutex to prevent multiple refresh token requests
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include", // Important for sending/receiving cookies
});

export const withAuthRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: any, api, extraOptions: any) => {
  if (extraOptions?.skipAuth) {
    return baseQuery(args, api, extraOptions);
  }
  // Wait if there's a refresh token request in progress
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Check if there's already a mutex lock
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          { url: "/auth/refresh", method: "POST" },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          // Retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          // If refresh token is invalid, clear credentials
          api.dispatch(clearCredentials());
          // api.dispatch(showAlert({}));
        }
      } catch (error) {
        // Handle any errors during refresh
        api.dispatch(clearCredentials());
      } finally {
        // Release mutex
        release();
      }
    } else {
      // Wait for the existing refresh call to complete and retry the request
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
