import { store } from "@/setup/store";
import fetchNewAccessToken from "./renew-token";

export type FetchResponse<T = any> = {
  data: T | null;
  error:
  | Error
  | {
    status: number;
    reason: string;
    originalError?: any;
  }
  | null;
};

const loaderFetch = async <T = any>(
  url: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  body?: any,
  withAuth: boolean = false,
  retry: boolean = true,
  withCredentials: boolean = false,
): Promise<FetchResponse<T>> => {
  const accessToken = store.getState().auth.accessToken;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (withAuth) {
    if (!accessToken) {
      await fetchNewAccessToken();
      retry = false; // Make sure we don't retry after fetching a new token
    }
    headers["Authorization"] = `Bearer ${store.getState().auth.accessToken}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: withCredentials ? "include" : "same-origin",
    });

    if (response.status === 401 && retry) {
      await fetchNewAccessToken();
      return loaderFetch(url, method, body, withAuth, false); // Recursive call with retry set to false
    }

    if (!response.ok) {
      const data = await response.json();
      const errorData = {
        status: response.status,
        reason: data.message || "",
        originalError: new Error(data.message || "Network error"),
      };

      switch (response.status) {
        case 400:
          errorData.reason = "Bad request.";
          break;
        case 402:
          errorData.reason = "Payment required.";
          break;
        case 500:
          errorData.reason = "Internal server error.";
          break;
      }

      return { data: null, error: errorData };
    }

    return { data: await response.json(), error: null };
  } catch (error: any) {
    return {
      data: null,
      error: { status: -1, reason: error.message, originalError: error },
    }; // -1 indicates a non-HTTP related error
  }
};

export default loaderFetch;
