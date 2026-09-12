import { useNavigate } from "react-router-dom";

import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { paths } from "@/config/paths";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ErrorType, HttpStatus } from "@/types/api-error";
import { isStandardApiError } from "@/utils/error-guard";

import { useRegisterMutation } from "../api/register";
import { RegisterSchema } from "../schemas/register-schema";

import { useFormError } from "./useFormError";

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
      // The error middleware already shows the server message as a notification,
      // so this only attaches it to the field it belongs to.
      if (isStandardApiError(error)) {
        if (error.status === HttpStatus.CONFLICT) {
          setServerError({
            field: "email",
            message: "This email is already taken",
          });
        } else if (error.data.type === ErrorType.INVALID_NEW_PASSWORD) {
          setServerError({
            field: "password",
            message: error.data.message,
          });
        } else if (error.data.type === ErrorType.PASSWORD_MISMATCH) {
          setServerError({
            field: "retypedPassword",
            message: error.data.message,
          });
        }
      }
    }
  };

  return { submitRegister, isLoading, serverError, clearServerError };
};
