import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./models";

const initialState: UserState = {
  isSignedIn: false,
  userId: null,
  email: null,
  firstName: "hahahah",
  lastName: null,
  address: null,
  city: null,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserFirstName(state, action){
      state.firstName = action.payload.firstName;
    },
    setUserInfo(state, action) {
      state.isSignedIn = true;
      state.userId = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.address = action.payload.address;
      state.city = action.payload.city;
    },
    updateUserInfo(state, action) {
      state.email = action.payload.email || state.email;
      state.address = action.payload.address || state.address;
      state.city = action.payload.city || state.city;
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
