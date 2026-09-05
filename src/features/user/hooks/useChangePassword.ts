import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

import { useChangePasswordMutation } from "../api/change-password";
import { PasswordSchema } from "../schemas/change-password-schema";

export const useChangePassword = () => {
  const dispatch = useAppDispatch();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const submitPassword = async (data: PasswordSchema) => {
    try {
      await changePassword(data).unwrap();
    } catch {
      return false;
    }

    dispatch(
      displayNotification({
        type: NotificationType.SUCCESS,
        message: "Your password has changed successfully",
      }),
    );

    return true;
  };
  return { submitPassword, isLoading };
};
