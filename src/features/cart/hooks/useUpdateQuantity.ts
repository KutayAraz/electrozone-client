import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuthenticated } from "@/stores/slices/user-slice";
import { ErrorType } from "@/types/api-error";

import { useUpdateSessionCartItemMutation } from "../api/session-cart/update-session-cart-item";
import { useUpdateUserCartItemMutation } from "../api/user-cart/update-user-cart-item";

export const useUpdateQuantity = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [updateUserCartItem, { isLoading: isUserCartLoading }] = useUpdateUserCartItemMutation();
  const [updateSessionCartItem, { isLoading: isSessionCartLoading }] =
    useUpdateSessionCartItemMutation();

  const isLoading = isSessionCartLoading || isUserCartLoading;

  const updateQuantity = async (productId: number, quantity: number) => {
    let response;
    try {
      if (isAuthenticated) {
        response = await updateUserCartItem({ productId, quantity }).unwrap();
      } else {
        response = await updateSessionCartItem({ productId, quantity }).unwrap();
      }
    } catch {
      return false;
    }

    const quantityChange = response.quantityChanges?.[0];

    if (quantityChange) {
      // Case: Quantity was adjusted (either due to limits or availability)
      dispatch(
        displayNotification({
          type: NotificationType.WARNING,
          message: `Quantity adjusted to ${quantityChange.newQuantity}`,
          details: `${quantityChange.productName} quantity changed from ${
            quantityChange.oldQuantity
          } to ${quantityChange.newQuantity} due to ${
            quantityChange.reason === ErrorType.QUANTITY_LIMIT_EXCEEDED
              ? "quantity limits"
              : "stock availability"
          }.`,
        }),
      );
    } else {
      // Case: Simple successful quantity update, no adjustments
      dispatch(
        displayNotification({
          type: NotificationType.SUCCESS,
          message: "Quantity updated successfully",
        }),
      );
    }

    return true;
  };

  return { updateQuantity, isLoading };
};
