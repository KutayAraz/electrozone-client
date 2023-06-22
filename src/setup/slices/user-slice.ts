import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  isSignedIn: boolean;
  userName: string | null;
}

const initialState: UserState = {
  isSignedIn: false,
  userName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggle(state) {
      state.isSignedIn = !state.isSignedIn;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
