import { createSlice } from "@reduxjs/toolkit";
import { User } from "./models";

const initialState: User = {
  firstName: null,
  city: null,
  isSignedIn: false,
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
  },
});

export const { setCredentials, clearCredentials, updateUserInfo } = userSlice.actions;

export default userSlice;
