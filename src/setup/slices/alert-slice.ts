import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Notification {
  id: number;
  type: AlertType;
  message: string;
}

interface DisplayAlertPayload {
  type: AlertType;
  message: string;
  autoHide?: boolean; // autoHide is optional and defaults to false
}

// Generate unique IDs for notifications
let nextNotificationId = 0;

// Async thunk for showing the alert and potentially hiding it
export const displayAlert = createAsyncThunk(
  "alert/display",
  async (payload: DisplayAlertPayload, { dispatch }) => {
    const notification = {
      id: nextNotificationId++,
      type: payload.type,
      message: payload.message,
    };

    dispatch(showAlert(notification));

    // If autoHide is true, hide the alert after 3 seconds
    if (payload.autoHide) {
      setTimeout(() => {
        dispatch(hideAlert(notification.id));
      }, 3000);
    }
  }
);

type AlertType = "error" | "info" | "success" | "warning" | undefined;

interface AlertState {
  notifications: Notification[];
}

const initialState: AlertState = {
  notifications: [],
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.notifications.splice(0, 0, action.payload);
    },
    hideAlert: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearAlerts: (state) => {
      state.notifications = [];
    },
  },
});

export const { showAlert, hideAlert, clearAlerts } = alertSlice.actions;

export default alertSlice.reducer;
