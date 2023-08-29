import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastVisitedURL: "/",
};

const lastVisitedURLSlice = createSlice({
  name: "lastVisited",
  initialState,
  reducers: {
    setLastVisitedURL(state, action) {
      state.lastVisitedURL = action.payload;
    },
  },
});

export const { setLastVisitedURL } = lastVisitedURLSlice.actions;

export default lastVisitedURLSlice;
