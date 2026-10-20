import { redirect } from "react-router-dom";

import { paths } from "@/config/paths";
import { setRedirectPath } from "@/stores/slices/redirect-slice";
import { store } from "@/stores/store";

/**
 * Guard for the loaders of signed-in-only pages. React Router runs loaders before it
 * renders <ProtectedRoute>, so without this a guest's API calls fail with a 401 and the
 * error page shows instead of the login page.
 *
 * Returns a redirect to the login page for a guest, after remembering the requested
 * page so the login can bring them back to it. Returns null for a signed-in user.
 */
export const redirectGuestToLogin = (request: Request) => {
  if (store.getState().user.isAuthenticated) return null;

  const { pathname, search } = new URL(request.url);
  store.dispatch(setRedirectPath({ path: pathname + search, source: "protected-route" }));

  return redirect(paths.auth.login.getHref());
};
