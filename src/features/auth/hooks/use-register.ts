import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { paths } from "@/config/paths";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { isStandardApiError } from "@/utils/error-guard";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../api/register";
import { RegisterSchema } from "../schemas/register-schema";
import { useFormError } from "./use-form-error";

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { serverError, setServerError, clearServerError } = useFormError();

  const submitRegister = async (data: RegisterSchema) => {
    try {
      await register(data).unwrap();

      dispatch(
        displayNotification({
          type: NotificationType.SUCCESS,
          message: "You have registered successfully. You can now login!",
          autoHide: true,
          duration: 5000,
        }),
      );
      navigate(paths.auth.login.getHref());
    } catch (error) {
      // Using type guard to ensure type safety
      if (isStandardApiError(error)) {
        if (error.status === 409) {
          setServerError({
            field: "email",
            message: "This email is already taken",
          });
        }

        dispatch(
          displayNotification({
            type: NotificationType.ERROR,
            message: error.data.message,
            autoHide: true,
            duration: 5000,
          }),
        );
      }
    }
  };

  return { submitRegister, isLoading, serverError, clearServerError };
};
