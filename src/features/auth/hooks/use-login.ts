// use-login.ts
import { useNavigate } from "react-router-dom";

import { paths } from "@/config/paths";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { clearRedirectPath } from "@/stores/slices/redirect-slice";
import { setCredentials } from "@/stores/slices/user-slice";
import { RootState } from "@/stores/store";
import { HttpStatus } from "@/types/api-error";
import { isStandardApiError } from "@/utils/error-guard";

import { useLoginMutation } from "../api/login";
import { LoginSchema } from "../schemas/login-schema";

import { useFormError } from "./use-form-error";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const redirectInfo = useAppSelector((state: RootState) => state.redirect);

  const [login, { isLoading }] = useLoginMutation();
  const { serverError, setServerError, clearServerError } = useFormError();

  const submitLogin = async (data: LoginSchema) => {
    try {
      const response = await login(data).unwrap();

      // Update user state with response data
      dispatch(
        setCredentials({
          firstName: response.firstName,
          city: response.city,
          email: response.email,
        }),
      );

      // Handle redirect based on source
      if (redirectInfo.source === "protected-route" && redirectInfo.path) {
        // User was trying to access a protected route
        navigate(redirectInfo.path, { replace: true });
      } else if (redirectInfo.source === "voluntary-login" && redirectInfo.previousPath) {
        // User voluntarily clicked login, go back to where they were
        navigate(redirectInfo.previousPath, { replace: true });
      } else {
        // Default: go to home page
        navigate(paths.home.getHref(), { replace: true });
      }

      // Clear redirect info after navigation
      dispatch(clearRedirectPath());
    } catch (error: any) {
      if (isStandardApiError(error)) {
        switch (error.status) {
          case HttpStatus.NOT_FOUND:
            setServerError({
              field: "email",
              message: "No account found with this email",
            });
            break;
          case HttpStatus.UNAUTHORIZED:
            setServerError({
              field: "password",
              message: "Invalid password",
            });
            break;
          default:
            return;
        }
      }
    }
  };

  return { submitLogin, isLoading, serverError, clearServerError };
};
