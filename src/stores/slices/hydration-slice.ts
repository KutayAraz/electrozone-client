import { createSlice } from "@reduxjs/toolkit";

export const hydrationSlice = createSlice({
  name: "hydration",
  initialState: {
    completed: false,
  },
  reducers: {
    hydrationCompleted: (state) => {
      state.completed = true;
    },
  },
});

export const { hydrationCompleted } = hydrationSlice.actions;
