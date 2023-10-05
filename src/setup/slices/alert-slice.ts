import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface DisplayAlertPayload {
  type: AlertType;
  message: string;
  autoHide?: boolean; // autoHide is optional and defaults to false
}

// Async thunk for showing the alert and potentially hiding it
export const displayAlert = createAsyncThunk(
  "alert/display",
  async (payload: DisplayAlertPayload, { dispatch }) => {
    // Show the alert
    dispatch(showAlert(payload));

    // If autoHide is true, hide the alert after 3 seconds
    if (payload.autoHide) {
      setTimeout(() => {
        dispatch(hideAlert());
      }, 3000);
    }
  }
);

type AlertType = "error" | "info" | "success" | "warning" | undefined;

interface AlertState {
  type: AlertType;
  message: string;
  isOpen: boolean;
}

const initialState: AlertState = {
  type: undefined,
  message: "",
  isOpen: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.isOpen = true;
    },
    hideAlert: (state) => {
      state.isOpen = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
