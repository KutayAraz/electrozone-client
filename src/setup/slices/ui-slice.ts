import { createSlice } from "@reduxjs/toolkit";
import { UIState } from "./models";

const initialState: UIState = {
  isSideNavOpen: false,
  isTVSectionOpen: false,
  isPCsSectionOpen: false,
  isPrintersSectionOpen: false,
  isPhonesSectionOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSections(state, action) {
      const section = action.payload;
      switch (section) {
        case "TVSection":
          state.isTVSectionOpen = !state.isTVSectionOpen;
          break;
        case "PCsSection":
          state.isPCsSectionOpen = !state.isPCsSectionOpen;
          break;
        case "PrintersSection":
          state.isPrintersSectionOpen = !state.isPrintersSectionOpen;
          break;
        case "PhonesSection":
          state.isPhonesSectionOpen = !state.isPhonesSectionOpen;
          break;
        default:
          break;
      }
    },
    toggleSideNav(state) {
      state.isSideNavOpen = !state.isSideNavOpen;
      if (!state.isSideNavOpen) {
        state.isTVSectionOpen = false;
        state.isPCsSectionOpen = false;
        state.isPrintersSectionOpen = false;
      }
    },
    closeSideNav(state){
      state.isSideNavOpen = false;
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
