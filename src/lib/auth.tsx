import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { setRedirectPath } from "@/stores/slices/redirect-slice";
import { RootState } from "@/stores/store";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    dispatch(
      setRedirectPath({
        path: location.pathname,
        source: location.pathname.includes("/checkout") ? "checkout" : "protected",
      }),
    );
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};
