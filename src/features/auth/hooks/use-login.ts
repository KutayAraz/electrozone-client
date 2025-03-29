import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { setCredentials } from "@/stores/slices/user-slice";
import { HttpStatus, isApiError } from "@/types/api";
import { useLoginMutation } from "../api/login";
import { LoginSchema } from "../schemas/login-schema";
import { useFormError } from "./use-form-error";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();
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
      } else {
        dispatch(
          displayNotification({
            type: NotificationType.ERROR,
            message: error.message,
          }),
        );
      }
    }
  };

  return { submitLogin, serverError, clearServerError };
};
