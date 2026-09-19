import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { paths } from "@/config/paths";
import { setRedirectPath } from "@/stores/slices/redirect-slice";
import { RootState } from "@/stores/store";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();

  const requestedPath = location.pathname + location.search;

  // Store the protected route they were trying to access.
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setRedirectPath({ path: requestedPath, source: "protected-route" }));
    }
  }, [isAuthenticated, requestedPath, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to={paths.auth.login.getHref()} replace />;
  }

  return <Outlet />;
};
