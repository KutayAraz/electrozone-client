import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  sideNavOpen: boolean;
}

const initialState: UIState = {
  sideNavOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggle(state) {
      state.sideNavOpen = !state.sideNavOpen;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
