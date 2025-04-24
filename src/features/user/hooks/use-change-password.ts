import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useChangePasswordMutation } from "../api/change-password";
import { PasswordSchema } from "../schemas/change-password-schema";

export const useChangePassword = () => {
  const dispatch = useAppDispatch();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const submitPassword = async (data: PasswordSchema) => {
    await changePassword(data).unwrap();

    dispatch(
      displayNotification({
        type: NotificationType.SUCCESS,
        message: "Your password has changed successfully",
      }),
    );
  };
  return { submitPassword, isLoading };
};
