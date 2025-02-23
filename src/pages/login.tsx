import { useDispatch } from "react-redux";

import { useLoginMutation } from "@/features/auth/api/login";
import { LoginForm } from "@/features/auth/components/login-form";
import { RedirectAuthenticated } from "@/features/auth/components/redirect-authenticated";
import { useFormError } from "@/features/auth/hooks/use-form-error";
import { LoginSchema } from "@/features/auth/schemas/login-schema";
import { setCredentials } from "@/stores/slices/user-slice";
import { HttpStatus, isApiError } from "@/types/api";

export const LoginPage = () => {
  const dispatch = useDispatch<any>();

  const { serverError, setServerError, clearServerError } = useFormError();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const handleLoginSubmit = async (data: LoginSchema) => {
    try {
      const response = await login(data).unwrap();

      // Update user state with response data
      dispatch(
        setCredentials({
          firstName: response.firstName,
          city: response.city,
          email: response.email,
          cartItemCount: response.cartItemCount || 0,
        }),
      );
    } catch (error) {
      if (isApiError(error)) {
        // Handle specific error cases based on backend error types
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

  return (
    <RedirectAuthenticated>
      <div className="container mx-auto px-4 py-8">
        <LoginForm
          isLoading={isLoginLoading}
          onSubmit={handleLoginSubmit}
          serverError={serverError}
          onFieldChange={clearServerError}
        />
      </div>
    </RedirectAuthenticated>
  );
};
