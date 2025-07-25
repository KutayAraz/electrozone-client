import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { CheckoutIntent } from "@/stores/slices/models";
import { clearCredentials, setUserIntent } from "@/stores/slices/user-slice";
import { clearWishlist } from "@/stores/slices/wishlist-slice";

import { useLogoutMutation } from "../api/logout";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const [logout, { isLoading }] = useLogoutMutation();

  const submitLogout = async () => {
    try {
      await logout();
      dispatch(clearCredentials());
      dispatch(clearWishlist());
      dispatch(setUserIntent(CheckoutIntent.SESSION));
      dispatch(
        displayNotification({
          type: NotificationType.SUCCESS,
          message: "You have successfully logged out",
        }),
      );
    } catch (error) {
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
