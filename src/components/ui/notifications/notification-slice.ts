import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Alert types as a const enum for better type safety and autocomplete
export const enum NotificationType {
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}

// Constants
const AUTO_HIDE_DURATION = 3500;
const MAX_NOTIFICATIONS = 5; // Prevent too many notifications from stacking

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  details?: string; // Optional details for extended error information
  timestamp: number;
  autoHide: boolean;
}

export interface AddNotificationPayload {
  type: NotificationType;
  message: string;
  details?: string;
  autoHide?: boolean;
  duration?: number;
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

// Utility function to generate IDs
let nextNotificationId = 0;
const getNextId = () => nextNotificationId++;

export const displayNotification = createAsyncThunk<void, AddNotificationPayload>(
  "notification/display",
  async (payload, { dispatch }) => {
    const notification: Notification = {
      id: getNextId(),
      type: payload.type,
      message: payload.message,
      details: payload.details,
      timestamp: Date.now(),
      autoHide: payload.autoHide !== false, // Default to true if not specified
    };

    dispatch(addNotification(notification));

    if (notification.autoHide) {
      const duration = payload.duration || AUTO_HIDE_DURATION;
      setTimeout(() => {
        dispatch(dismissNotification(notification.id));
      }, duration);
    }
  },
);

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      // Limit the number of notifications
      if (state.notifications.length >= MAX_NOTIFICATIONS) {
        state.notifications.pop(); // Remove the oldest notification
      }
      state.notifications.unshift(action.payload);
    },
    dismissNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload,
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    // New action to remove old notifications
    removeOldNotifications: (state, action: PayloadAction<number>) => {
      const cutoffTime = Date.now() - action.payload;
      state.notifications = state.notifications.filter(
        (notification) => notification.timestamp >= cutoffTime,
      );
    },
  },
});

export const { addNotification, dismissNotification, clearNotifications, removeOldNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;
