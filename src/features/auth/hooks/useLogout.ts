import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { clearCredentials } from "@/stores/slices/user-slice";

import { useLogoutMutation } from "../api/logout";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const [logout, { isLoading }] = useLogoutMutation();

  const submitLogout = async () => {
    try {
      await logout();

      // Also resets the checkout intent to NORMAL. The end-session listener clears
      // the wishlist and the cached API data.
      dispatch(clearCredentials());
      dispatch(
        displayNotification({
          type: NotificationType.SUCCESS,
          message: "You have successfully logged out",
        }),
      );
    } catch {
      dispatch(
        displayNotification({
          type: NotificationType.ERROR,
          message: "There was an error trying to logout.",
        }),
      );
    }
  };

  return { submitLogout, isLoading };
};
