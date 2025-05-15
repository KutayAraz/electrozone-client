import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectIsAuthenticated } from "@/stores/slices/user-slice";

import { useRemoveSessionCartItemMutation } from "../api/session-cart/remove-session-cart-item";
import { useRemoveUserCartItemMutation } from "../api/user-cart/remove-user-cart-item";

export const useRemoveFromCart = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [removeUserCartItem, { isLoading: isUserCartLoading }] = useRemoveUserCartItemMutation();
  const [removeSessionCartItem, { isLoading: isSessionCartLoading }] =
    useRemoveSessionCartItemMutation();

  const isLoading = isUserCartLoading || isSessionCartLoading;

  const removeFromCart = async (productId: number) => {
    if (isAuthenticated) {
      await removeUserCartItem(productId).unwrap();
    } else {
      await removeSessionCartItem(productId).unwrap();
    }

    dispatch(
      displayNotification({
        type: NotificationType.SUCCESS,
        message: "Product has been removed from your cart",
      }),
    );
  };

  return { removeFromCart, isLoading };
};
