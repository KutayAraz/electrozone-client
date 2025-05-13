import { isRejectedWithValue, ThunkMiddleware } from "@reduxjs/toolkit";

import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { isNetworkError, isServerDownError, isStandardApiError } from "@/utils/error-guard";

const skipErrorEndpoints = ["getSessionCartCount", "logout", "processOrder"];

export const errorMiddleware: ThunkMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action: any) => {
    // Check if this is a rejected RTK Query action
    if (isRejectedWithValue(action)) {
      const { payload, meta } = action;

      const { endpointName } = meta.arg;

      if (endpointName && skipErrorEndpoints.includes(endpointName)) {
        return next(action);
      }

      // Handle different error types
      if (isStandardApiError(payload)) {
        const { message, details } = payload.data;

        // Show notification with the message and details if present
        dispatch(
          displayNotification({
            type: NotificationType.ERROR,
            message,
            details: details ? details : undefined,
          }),
        );
      } else if (isNetworkError(payload)) {
        dispatch(
          displayNotification({
            type: NotificationType.ERROR,
            message: "Network error. Please check your internet connection.",
          }),
        );
      } else if (isServerDownError(payload)) {
        dispatch(
          displayNotification({
            type: NotificationType.ERROR,
            message: "Server is currently unavailable. Please try again later.",
          }),
        );
      } else {
        dispatch(
          displayNotification({
            type: NotificationType.ERROR,
            message: "An unexpected error occurred.",
          }),
        );
      }
    }

    return next(action);
  };
