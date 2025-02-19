import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

import { CheckoutIntent } from "./models";

interface User {
  firstName: string | null;
  city: string | null;
  isAuthenticated: boolean;
  userIntent: CheckoutIntent;
  cartItemCount: number;
}

const initialState: User = {
  firstName: null,
  city: null,
  isAuthenticated: false,
  userIntent: CheckoutIntent.NORMAL,
  cartItemCount: 0,
};

interface Credentials {
  firstName: string;
  city: string;
  email: string;
  cartItemCount: number;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<Credentials>) {
      const { firstName, city, cartItemCount } = action.payload;
      state.firstName = firstName;
      state.city = city;
      state.isAuthenticated = true;
      state.cartItemCount = cartItemCount;
    },
    clearCredentials: () => initialState,
    updateUserInfo(state, action: PayloadAction<{ city: string }>) {
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

export const selectUser = (state: RootState) => state.user;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectUserLocation = (state: RootState) => state.user.city;
