import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  accessToken: string | null;
  expirationTime: number | null; // expiration time in milliseconds
}

const initialState: InitialState = {
  accessToken: null,
  expirationTime: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload.accessToken;

      const now = new Date().getTime();
      const fifteenMinutes = 15 * 60 * 1000;
      state.expirationTime = new Date().getTime() + 15 * 60 * 1000;

      setTimeout(() => {
        state.accessToken = null;
        state.expirationTime = null;
      }, fifteenMinutes);
    },
    clearAccessToken(state) {
      state.accessToken = null;
      state.expirationTime = null;
    },
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;

export default authSlice;

export const selectAccessToken = (state: any) => {
  // Check if token is expired
  const now = new Date().getTime();
  if (state.auth.expirationTime && now > state.auth.expirationTime) {
    return null;
  }
  return state.auth.accessToken;
};
