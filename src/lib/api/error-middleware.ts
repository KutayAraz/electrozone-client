import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";

import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";

export const errorMiddleware: Middleware =
  ({ dispatch }: any) =>
  (next) =>
  (action) => {
    // Check if this is a rejected RTK Query action
    if (isRejectedWithValue(action)) {
      // Skip if error was already handled by a feature hook
      if (action.meta?.handled) return next(action);

      const error = action.payload;

      // Handle different error scenarios
      if (error.status === 500) {
        dispatch(
          displayNotification({
            type: NotificationType.ERROR,
            message: "An unexpected server error occurred",
            autoHide: true,
            duration: 3000,
          }),
        );
      } else if (error.data?.message) {
        dispatch(
          displayNotification({
            type: NotificationType.ERROR,
            message: error.data.message,
            autoHide: true,
            duration: 3000,
          }),
        );
      }
    }

    return next(action);
  };
