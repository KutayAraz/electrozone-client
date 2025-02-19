import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type RedirectSource = "checkout" | "protected" | "normal";

interface RedirectState {
  path: string | null;
  source?: RedirectSource;
}

const initialState: RedirectState = {
  path: null,
  source: undefined,
};

export const redirectSlice = createSlice({
  name: "redirect",
  initialState,
  reducers: {
    setRedirectPath: (
      state,
      action: PayloadAction<{
        path: string;
        source?: RedirectSource;
      }>,
    ) => {
      state.path = action.payload.path;
      state.source = action.payload.source;
    },
    clearRedirectPath: (state) => {
      state.path = null;
      state.source = undefined;
    },
  },
});

export const { setRedirectPath, clearRedirectPath } = redirectSlice.actions;
