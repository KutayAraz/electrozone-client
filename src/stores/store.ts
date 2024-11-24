import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import {
  alertSlice,
  authSlice,
  buyNowCartSlice,
  hydrationCompleted,
  hydrationSlice,
  localCartSlice,
  redirectSlice,
  uiSlice,
  userSlice,
  wishlistSlice,
} from "./slices";

const userPersistConfig = {
  key: "user",
  storage,
};

const localCartPersistConfig = {
  key: "localCart",
  storage,
};

const buyNowCartPersistConfig = {
  key: "buyNowCart",
  storage,
};

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
};

const redirectPersistConfig = {
  key: "redirect",
  storage: sessionStorage, // Store in session storage
  whitelist: ["path"], // Only persist the 'path' key
};

const persistedUserReducer = persistReducer(userPersistConfig, userSlice.reducer);

const persistedLocalCartReducer = persistReducer(localCartPersistConfig, localCartSlice.reducer);

const persistedBuyNowCartReducer = persistReducer(buyNowCartPersistConfig, buyNowCartSlice.reducer);

const persistedRedirectReducer = persistReducer(redirectPersistConfig, redirectSlice.reducer);

const persistedWishlistReducer = persistReducer(wishlistPersistConfig, wishlistSlice.reducer);

export const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    hydration: hydrationSlice.reducer,
    user: persistedUserReducer,
    localCart: persistedLocalCartReducer,
    buyNowCart: persistedBuyNowCartReducer,
    redirect: persistedRedirectReducer,
    wishlist: persistedWishlistReducer,
  },
  middleware: [thunk],
  devTools: true,
});

export const persistor = persistStore(store, null, () => {
  store.dispatch(hydrationCompleted());
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
