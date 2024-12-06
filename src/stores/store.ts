import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";

import { alertSlice } from "./slices/alert-slice";
import { authSlice } from "./slices/auth-slice";
import { buyNowCartSlice } from "./slices/buynow-cart-slice";
import { hydrationSlice, hydrationCompleted } from "./slices/hydration-slice";
import { localCartSlice } from "./slices/local-cart-slice";
import { redirectSlice } from "./slices/redirect-slice";
import { uiSlice } from "./slices/ui-slice";
import { userSlice } from "./slices/user-slice";
import { wishlistSlice } from "./slices/wishlist-slice";

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
  storage: sessionStorage,
  whitelist: ["path"],
};

const persistedUserReducer = persistReducer(userPersistConfig, userSlice.reducer);
const persistedLocalCartReducer = persistReducer(localCartPersistConfig, localCartSlice.reducer);
const persistedBuyNowCartReducer = persistReducer(buyNowCartPersistConfig, buyNowCartSlice.reducer);
const persistedRedirectReducer = persistReducer(redirectPersistConfig, redirectSlice.reducer);
const persistedWishlistReducer = persistReducer(wishlistPersistConfig, wishlistSlice.reducer);

const rootReducer = combineReducers({
  alert: alertSlice.reducer,
  ui: uiSlice.reducer,
  auth: authSlice.reducer,
  hydration: hydrationSlice.reducer,
  user: persistedUserReducer,
  localCart: persistedLocalCartReducer,
  buyNowCart: persistedBuyNowCartReducer,
  redirect: persistedRedirectReducer,
  wishlist: persistedWishlistReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store, null, () => {
  store.dispatch(hydrationCompleted());
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
