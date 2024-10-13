import { createSlice } from "@reduxjs/toolkit";
import { CheckoutIntent, User } from "./models";

const initialState: User = {
  firstName: null,
  city: null,
  isSignedIn: false,
  userIntent: CheckoutIntent.NORMAL,
  cartItemCount: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.firstName = action.payload.firstName;
      state.city = action.payload.city;
      state.isSignedIn = true;
      state.cartItemCount = action.payload.cartItemCount;
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
    setGuestLocation(state, action) {
      state.city = action.payload.city;
    },
    updateCartItemCount(state, action) {
      state.cartItemCount = action.payload.cartItemCount;
    },
  },
});

export const {
  setCredentials,
  clearCredentials,
  updateUserInfo,
  setUserIntent,
  updateCartItemCount,
} = userSlice.actions;

export default userSlice;
