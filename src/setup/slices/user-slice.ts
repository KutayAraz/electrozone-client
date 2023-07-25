import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./models";

const initialState: UserState = {
  user: {
    userId: null,
    email: null,
    firstName: null,
    lastName: null,
    address: null,
    city: null,
  },
  isSignedIn: false,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      const userInfo = action.payload;
      state.isSignedIn = true;
      state.user = { ...state.user, ...userInfo };
    },
    updateUserInfo(state, action) {
      const userInfo = action.payload;
      state.user = { ...state.user, ...userInfo };
    },
    signOut(state) {
      Object.assign(state, initialState);
    },
    handleAccessToken(state, action) {
      state.accessToken = action.payload.accessToken;
    },
    handleRefreshToken(state, action) {
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
