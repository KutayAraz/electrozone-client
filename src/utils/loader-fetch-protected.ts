import { setRedirectPath } from "@/stores/slices/redirect-slice";
import loaderFetch from "./loader-fetch";
import { store } from "@/stores/store";

export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export const loaderFetchProtected = async (
  url: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  request: any,
  body?: any,
  withCredentials = false,
): Promise<any> => {
  const result = await loaderFetch(url, method, body, true, withCredentials);

  if (result.error && "status" in result.error && result.error.status === 401) {
    const urlObj = new URL(request.url);
    const pathname = urlObj.pathname;
    store.dispatch(setRedirectPath(pathname));
    throw new UnauthorizedError();
  }

  return result.data;
};
