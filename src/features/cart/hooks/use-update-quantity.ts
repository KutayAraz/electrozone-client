
import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { selectIsAuthenticated } from "@/stores/slices/user-slice";

import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useUpdateSessionCartItemMutation } from "../api/session-cart/update-session-cart-item";
import { useUpdateUserCartItemMutation } from "../api/user-cart/update-user-cart-item";
import { ErrorType } from "../types/response";

export const useUpdateQuantity = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [updateUserCartItem, { isLoading: isUserCartLoading }] = useUpdateUserCartItemMutation();
  const [updateSessionCartItem, { isLoading: isSessionCartLoading }] =
    useUpdateSessionCartItemMutation();

  const isLoading = isSessionCartLoading || isUserCartLoading;

  const addToCart = async (productId: string, quantity: number) => {
    let response;
    if (isAuthenticated) {
      response = await updateUserCartItem({ productId, quantity }).unwrap();
    } else {
      response = await updateSessionCartItem({ productId, quantity }).unwrap();
    }

    const quantityChange = response.quantityChanges?.[0];

    dispatch(
      displayNotification({
        type: quantityChange ? NotificationType.WARNING : NotificationType.SUCCESS,
        message: quantityChange
          ? `Quantity adjusted to ${quantityChange.newQuantity}`
          : "Product has been added to your cart",
        details: quantityChange
          ? `${quantityChange.productName} quantity changed from ${quantityChange.oldQuantity} to ${
              quantityChange.newQuantity
            } due to ${
              quantityChange.reason === ErrorType.QUANTITY_LIMIT_EXCEEDED
                ? "quantity limits"
                : "stock availability"
            }.`
          : undefined,
      }),
    );
  };

  return { addToCart, isLoading };
};
