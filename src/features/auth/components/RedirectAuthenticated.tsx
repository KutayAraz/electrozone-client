import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { paths } from "@/config/paths";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuthenticated } from "@/stores/slices/user-slice";
import { RootState } from "@/stores/store";

export const RedirectAuthenticated = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const redirectInfo = useAppSelector((state: RootState) => state.redirect);

  // Only guard against arriving here already signed in. Signing in on this page also
  // flips `isAuthenticated`, but useLogin navigates to the right place itself - a
  // second redirect from here would race it and send the user home instead.
  const [wasAuthenticatedOnArrival] = useState(isAuthenticated);

  if (wasAuthenticatedOnArrival) {
    // If have a previous path from voluntary login, go back there
    if (redirectInfo.source === "voluntary-login" && redirectInfo.previousPath) {
      return <Navigate to={redirectInfo.previousPath} replace />;
    }

    // Otherwise, go home
    return <Navigate to={paths.home.getHref()} replace />;
  }

  return <Outlet />;
};
