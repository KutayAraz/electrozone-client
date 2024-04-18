import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./slices/alert-slice";
import userSlice from "./slices/user-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import authSlice from "./slices/auth-slice";
import localCartSlice from "./slices/localCart-slice";
import buyNowCartSlice from "./slices/buyNowCart-slice";
import hydrationSlice, { hydrationCompleted } from "./slices/hydration-slice";
import sessionStorage from "redux-persist/es/storage/session";
import redirectSlice from "./slices/redirect-slice";
import wishlistSlice from "./slices/wishlist-slice";

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

const persistedUserReducer = persistReducer(
  userPersistConfig,
  userSlice.reducer
);

const persistedLocalCartReducer = persistReducer(
  localCartPersistConfig,
  localCartSlice.reducer
);

const persistedBuyNowCartReducer = persistReducer(
  buyNowCartPersistConfig,
  buyNowCartSlice.reducer
);

const persistedRedirectReducer = persistReducer(
  redirectPersistConfig,
  redirectSlice.reducer
);

const persistedWishlistReducer = persistReducer(
  wishlistPersistConfig,
  wishlistSlice.reducer
);


export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authSlice.reducer,
    hydration: hydrationSlice.reducer,
    user: persistedUserReducer,
    localCart: persistedLocalCartReducer,
    buyNowCart: persistedBuyNowCartReducer,
    redirect: persistedRedirectReducer,
    wishlist: persistedWishlistReducer
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
