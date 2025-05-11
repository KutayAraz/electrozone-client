import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CheckoutType } from "@/types/checkout";

import type { RootState } from "../store";

interface User {
  firstName: string | null;
  city: string | null;
  isAuthenticated: boolean;
  checkoutIntent: CheckoutType;
}

const initialState: User = {
  firstName: null,
  city: null,
  isAuthenticated: false,
  checkoutIntent: CheckoutType.NORMAL,
};

interface Credentials {
  firstName: string;
  city: string;
  email: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<Credentials>) {
      const { firstName, city } = action.payload;
      state.firstName = firstName;
      state.city = city;
      state.isAuthenticated = true;
    },
    clearCredentials: () => initialState,
    updateUserInfo(state, action: PayloadAction<{ city: string }>) {
      state.city = action.payload.city;
    },
    setUserIntent(state, action) {
      state.checkoutIntent = action.payload;
    },
    setGuestLocation(state, action) {
      state.city = action.payload.city;
    },
  },
});

export const { setCredentials, clearCredentials, updateUserInfo, setUserIntent } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectUserLocation = (state: RootState) => state.user.city;
export const selectCheckoutIntent = (state: RootState) => state.user.checkoutIntent;
