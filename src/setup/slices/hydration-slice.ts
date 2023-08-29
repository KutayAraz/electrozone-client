import { createSlice } from "@reduxjs/toolkit";

const hydrationSlice = createSlice({
    name: 'hydration',
    initialState: {
      completed: false
    },
    reducers: {
      hydrationCompleted: (state) => {
        state.completed = true;
      }
    }
  });
  
  export const { hydrationCompleted } = hydrationSlice.actions;
  export default hydrationSlice;
  