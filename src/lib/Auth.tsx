import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { paths } from "@/config/paths";
import { setRedirectPath } from "@/stores/slices/redirect-slice";
import { RootState } from "@/stores/store";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    // Store the protected route they were trying to access
    dispatch(
      setRedirectPath({
        path: location.pathname + location.search,
        source: "protected-route",
      }),
    );

    return <Navigate to={paths.auth.login.getHref()} replace />;
  }

  return <Outlet />;
};
