import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { selectIsAuthenticated } from "@/stores/slices/user-slice";

import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useAddToSessionCartMutation } from "../api/session-cart/add-to-session-cart";
import { useAddToUserCartMutation } from "../api/user-cart/add-to-user-cart";
import { ErrorType } from "../types/response";

export const useAddToCart = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [addToUserCart, { isLoading: isUserCartLoading }] = useAddToUserCartMutation();
  const [addToSessionCart, { isLoading: isSessionCartLoading }] = useAddToSessionCartMutation();

  const isLoading = isUserCartLoading || isSessionCartLoading;

  const addToCart = async (productId: string, quantity: number) => {
    let response;
    if (isAuthenticated) {
      response = await addToUserCart({ productId, quantity }).unwrap();
    } else {
      response = await addToSessionCart({ productId, quantity }).unwrap();
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
