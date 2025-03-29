import { useSelector } from "react-redux";

import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { selectIsAuthenticated } from "@/stores/slices/user-slice";

import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAddToSessionCartMutation } from "../api/session-cart/add-to-session-cart";
import { useAddToUserCartMutation } from "../api/user-cart/add-to-user-cart";

export const useAddToCart = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [addToUserCart] = useAddToUserCartMutation();
  const [addToSessionCart] = useAddToSessionCartMutation();

  const addToCart = async (productId: string, quantity: number) => {
    try {
      if (isAuthenticated) {
        await addToUserCart({ productId, quantity }).unwrap();
      } else {
        await addToSessionCart({ productId, quantity }).unwrap();
      }

      dispatch(
        displayNotification({
          type: NotificationType.SUCCESS,
          message: "Product has been added to your cart",
        }),
      );
    } catch (error: any) {
      dispatch(displayNotification({ type: NotificationType.ERROR, message: error.message }));
    }
  };

  return { addToCart };
};
