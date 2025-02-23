import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { selectIsAuthenticated } from "@/stores/slices/user-slice";

interface RedirectAuthenticatedProps {
  children: React.ReactNode;
}

export const RedirectAuthenticated = ({ children }: RedirectAuthenticatedProps) => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    // If user has history, go back; otherwise go home
    return location.key !== "default" ? (
      <Navigate to=".." relative="path" replace />
    ) : (
      <Navigate to="/" replace />
    );
  }

  return <>{children}</>;
};
