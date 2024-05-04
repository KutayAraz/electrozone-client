import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    filterDrawer: false,
    sortingDrawer: false,
  },
  reducers: {
    toggleFilterDrawer: (state, action) => {
      state.filterDrawer = action.payload;
    },
    toggleSortingDrawer: (state, action) => {
      state.sortingDrawer = action.payload;
    },
  },
});

export const { toggleFilterDrawer, toggleSortingDrawer } = uiSlice.actions;

export default uiSlice.reducer;
