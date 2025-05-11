import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";

import { useMergeCartsMutation } from "../api/user-cart/merge-carts";

export const useMergeCarts = () => {
  const dispatch = useAppDispatch();
  const [mergeCarts, { isLoading }] = useMergeCartsMutation();

  const submitMergeCarts = async () => {
    const result = await mergeCarts().unwrap();

    let message = "Products in your cart before logging in, are added to your cart.";

    if (result.priceChanges || result.quantityChanges || result.removedCartItems) {
      message +=
        "There are also some changes made to your cart. Please review them before proceeding";
    }

    dispatch(
      displayNotification({
        type: NotificationType.WARNING,
        message,
        duration: 5000,
      }),
    );
  };

  return { submitMergeCarts, isLoading };
};
