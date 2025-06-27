import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type RedirectSource = "protected-route" | "voluntary-login" | "checkout";

interface RedirectState {
  path: string | null;
  source: RedirectSource | null;
  previousPath: string | null;
}

const initialState: RedirectState = {
  path: null,
  source: null,
  previousPath: null,
};

export const redirectSlice = createSlice({
  name: "redirect",
  initialState,
  reducers: {
    setRedirectPath: (
      state,
      action: PayloadAction<{
        path: string;
        source: RedirectSource;
        previousPath?: string;
      }>,
    ) => {
      state.path = action.payload.path;
      state.source = action.payload.source;
      state.previousPath = action.payload.previousPath || null;
    },
    clearRedirectPath: (state) => {
      state.path = null;
      state.source = null;
      state.previousPath = null;
    },
  },
});

export const { setRedirectPath, clearRedirectPath } = redirectSlice.actions;
