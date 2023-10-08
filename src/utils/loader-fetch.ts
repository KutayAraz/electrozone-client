import { store } from "@/setup/store";
import fetchNewAccessToken from "./renew-token";

const loaderFetch: any = async (
  url: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  body?: any,
  withAuth: boolean = false,
  retry: boolean = true
) => {
  const accessToken = store.getState().auth.accessToken;
  const headers: any = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (withAuth) {
    if (!accessToken) {
      retry = false;
    }
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401 && retry) {
      try {
        await fetchNewAccessToken();
        return loaderFetch(url, method, body, withAuth, false);
      } catch (refreshError) {
        return { data: null, error: refreshError };
      }
    }

    if (!response.ok) {
      const data = await response.json();
      switch (response.status) {
        case 400:
          throw new Error("Bad request.");
        case 402:
          throw new Error("Payment required.");
        case 500:
          throw new Error("Internal server error.");
        default:
          throw new Error(data.message || "Network error");
      }
    }

    return { data: await response.json(), error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export default loaderFetch;
