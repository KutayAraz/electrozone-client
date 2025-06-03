import { Alert, Slide } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import CloseButton from "@assets/svgs/close-button.svg?react";

import {
  dismissNotification,
  Notification,
  NotificationType,
  selectNotifications,
} from "./notification-slice";

export const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);

  const getSeverity = (type: NotificationType) => {
    switch (type) {
      case NotificationType.SUCCESS:
        return "success";
      case NotificationType.ERROR:
        return "error";
      case NotificationType.WARNING:
        return "warning";
      case NotificationType.INFO:
      default:
        return "info";
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-2 z-50 flex flex-col items-center gap-2 px-4">
      {notifications.map((notification: Notification) => (
        <Slide
          key={notification.id}
          direction="down"
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={300}
        >
          <div className="w-full max-w-lg">
            <Alert
              severity={getSeverity(notification.type)}
              className="relative w-full shadow-lg shadow-black/5"
              action={
                <button
                  onClick={() => dispatch(dismissNotification(notification.id))}
                  className="rounded-full p-1 hover:bg-black/10"
                  aria-label="Dismiss notification"
                >
                  <CloseButton className="size-6 stroke-gray-500" />
                </button>
              }
            >
              <div className="flex flex-col gap-1">
                <div className="font-medium">{notification.message}</div>
                {notification.details && (
                  <div className="text-sm opacity-85">{notification.details}</div>
                )}
              </div>
            </Alert>
          </div>
        </Slide>
      ))}
    </div>
  );
};
