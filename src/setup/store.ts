import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/ui-slice";
import cartSlice from "./slices/cart-slice";
import userSlice from "./slices/user-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
