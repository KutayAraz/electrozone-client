import { v4 as uuidv4 } from "uuid";

import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ErrorType } from "@/types/api-error";
import { isStandardApiError } from "@/utils/error-guard";

import { useProcessOrderMutation } from "../api/process-order";

export const useProcessOrder = () => {
  const dispatch = useAppDispatch();
  const [processOrder, { isLoading }] = useProcessOrderMutation();

  const placeOrder = async (
    checkoutSnapshotId: string,
    refetchCartFunction: () => Promise<null | void>,
  ) => {
    try {
      const result = await processOrder({ checkoutSnapshotId, idempotencyKey: uuidv4() }).unwrap();

      return result.orderId;
    } catch (error: unknown) {
      // processOrder is excluded from the error middleware, so every path below has
      // to tell the user something - otherwise the button just stops spinning.
      if (isStandardApiError(error)) {
        const errorType = error.data.type;

        if (
          (error.status === 400 || error.status === 409) &&
          (errorType === ErrorType.STOCK_LIMIT_EXCEEDED ||
            errorType === ErrorType.QUANTITY_LIMIT_EXCEEDED ||
            errorType === ErrorType.PRODUCT_PRICE_CHANGED)
        ) {
          dispatch(
            displayNotification({
              type: NotificationType.ERROR,
              message:
                "There has been a change in your cart while processing your order. Please review the changes and proceed to checkout again",
              duration: 5000,
            }),
          );

          // Refresh checkout to get updated cart information
          return refetchCartFunction();
        }

        // Any other API error: show what the server said
        dispatch(
          displayNotification({
            type: NotificationType.ERROR,
            message: error.data.message,
            details: error.data.details,
          }),
        );
      } else {
        // Generic error handling for other errors
        dispatch(
          displayNotification({
            type: NotificationType.ERROR,
            message: "An error occurred while placing your order. Please try again.",
          }),
        );
      }
    }
  };

  return { placeOrder, isLoading };
};
