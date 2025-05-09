import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { setCredentials } from "@/stores/slices/user-slice";
import { HttpStatus } from "@/types/api-error";
import { isStandardApiError } from "@/utils/error-guard";
import { useLoginMutation } from "../api/login";
import { LoginSchema } from "../schemas/login-schema";
import { useFormError } from "./use-form-error";

export const useLogin = () => {
  const dispatch = useAppDispatch();

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
    } catch (error: any) {
      if (isStandardApiError(error)) {
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

  return { submitLogin, isLoading, serverError, clearServerError };
};
