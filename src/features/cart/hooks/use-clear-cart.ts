import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectIsAuthenticated } from "@/stores/slices/user-slice";
import { useClearSessionCartMutation } from "../api/session-cart/clear-session-cart";
import { useClearUserCartMutation } from "../api/user-cart/clear-user-cart";

export const useClearCart = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [clearUserCart, { isLoading: isUserCartLoading }] = useClearUserCartMutation();
  const [clearSessionCart, { isLoading: isSessionCartLoading }] = useClearSessionCartMutation();

  const isLoading = isUserCartLoading || isSessionCartLoading;

  const clearCart = async () => {
    if (isAuthenticated) {
      await clearUserCart();
    } else {
      await clearSessionCart();
    }

    dispatch(
      displayNotification({
        type: NotificationType.SUCCESS,
        message: "Your cart has been cleared",
      }),
    );
  };

  return { clearCart, isLoading };
};
