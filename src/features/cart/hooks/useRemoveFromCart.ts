import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
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
    try {
      if (isAuthenticated) {
        await removeUserCartItem(productId).unwrap();
      } else {
        await removeSessionCartItem(productId).unwrap();
      }
    } catch {
      return false;
    }

    dispatch(
      displayNotification({
        type: NotificationType.SUCCESS,
        message: "Product has been removed from your cart",
      }),
    );

    return true;
  };

  return { removeFromCart, isLoading };
};
