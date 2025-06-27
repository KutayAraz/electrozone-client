import { useLocation, useNavigate } from "react-router-dom";

import { paths } from "@/config/paths";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { setRedirectPath } from "@/stores/slices/redirect-slice";

interface LoginLinkProps {
  children: React.ReactNode;
  className?: string;
}

export const LoginLink = ({ children, className }: LoginLinkProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Store where the user currently is (if not already on auth pages)
    if (!location.pathname.startsWith("/auth")) {
      dispatch(
        setRedirectPath({
          path: paths.auth.login.getHref(),
          source: "voluntary-login",
          previousPath: location.pathname + location.search,
        }),
      );
    }

    navigate(paths.auth.login.getHref());
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
};
