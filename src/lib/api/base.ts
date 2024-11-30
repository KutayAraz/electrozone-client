import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { clearCredentials } from "@/stores/slices";

// Base query instance
const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include", // Important for cookies
});

// Custom error type to help with typing
interface CustomError {
  data: {
    message: string;
  };
  status: number;
}

// Enhanced base query with refresh token logic
const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Type guard to check if we have a FetchBaseQueryError
  if (result.error && "status" in result.error) {
    const error = result.error as FetchBaseQueryError;

    // Check if error is 401 Unauthorized
    if (error.status === 401) {
      try {
        // Try to refresh the token
        const refreshResult = await baseQuery(
          { url: "auth/refresh", method: "POST" },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          // Token refreshed successfully, retry original request
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Refresh failed - dispatch logout
          api.dispatch(clearCredentials());
        }
      } catch (refreshError) {
        // Critical error - force logout
        api.dispatch(clearCredentials());
        return {
          error: {
            status: "FETCH_ERROR",
            error: "Authentication failed",
          },
        };
      }
    }
  }

  return result;
};

// Create the base API
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Product", "Cart"], // Add your cache tags here
  endpoints: () => ({}), // We'll extend this with other APIs
});
