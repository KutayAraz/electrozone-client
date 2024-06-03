import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    filterDrawer: false,
    sortingDrawer: false,
    activeTab: 0, // Default active tab index
  },
  reducers: {
    toggleFilterDrawer: (state, action) => {
      state.filterDrawer = action.payload;
    },
    toggleSortingDrawer: (state, action) => {
      state.sortingDrawer = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { toggleFilterDrawer, toggleSortingDrawer, setActiveTab } = uiSlice.actions;

export default uiSlice.reducer;
