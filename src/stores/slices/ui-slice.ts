import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    menuDrawer: false,
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
    toggleMenuDrawer: (state, action) => {
      state.menuDrawer = action.payload;
    },
  },
});

export const { toggleMenuDrawer, toggleFilterDrawer, toggleSortingDrawer, setActiveTab } =
  uiSlice.actions;
