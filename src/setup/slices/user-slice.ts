import { createSlice } from "@reduxjs/toolkit";
import { CheckoutIntent, User } from "./models";

const initialState: User = {
  firstName: null,
  city: null,
  isSignedIn: false,
  userIntent: CheckoutIntent.Normal,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.firstName = action.payload.firstName;
      state.city = action.payload.city;
      state.isSignedIn = true;
    },
    clearCredentials(state) {
      Object.assign(state, initialState);
    },
    updateUserInfo(state, action) {
      state.city = action.payload.city;
    },
    setUserIntent(state, action) {
      state.userIntent = action.payload;
    },
  },
});

export const {
  setCredentials,
  clearCredentials,
  updateUserInfo,
  setUserIntent,
} = userSlice.actions;

export default userSlice;
