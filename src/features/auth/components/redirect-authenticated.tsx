import { Navigate, Outlet } from "react-router-dom";

import { paths } from "@/config/paths";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectIsAuthenticated } from "@/stores/slices/user-slice";
import { RootState } from "@/stores/store";

export const RedirectAuthenticated = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const redirectInfo = useAppSelector((state: RootState) => state.redirect);

  if (isAuthenticated) {
    // If have a previous path from voluntary login, go back there
    if (redirectInfo.source === "voluntary-login" && redirectInfo.previousPath) {
      return <Navigate to={redirectInfo.previousPath} replace />;
    }

    // Otherwise, go home
    return <Navigate to={paths.home.getHref()} replace />;
  }

  return <Outlet />;
};
