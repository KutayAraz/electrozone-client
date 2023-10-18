import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  accessToken: string | null;
}

const initialState: InitialState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload.accessToken;
    },
    clearAccessToken(state) {
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;

export default authSlice;

export const selectAccessToken = (state: any) => {
  return state.auth.accessToken;
};
