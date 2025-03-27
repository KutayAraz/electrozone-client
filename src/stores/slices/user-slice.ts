import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../store";

import { CheckoutIntent } from "./models";

interface User {
  firstName: string | null;
  city: string | null;
  isAuthenticated: boolean;
  userIntent: CheckoutIntent;
}

const initialState: User = {
  firstName: null,
  city: null,
  isAuthenticated: false,
  userIntent: CheckoutIntent.NORMAL,
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
      state.userIntent = action.payload;
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
