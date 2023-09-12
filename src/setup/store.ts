import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/ui-slice";
import userSlice from "./slices/user-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import authSlice from "./slices/auth-slice";
import localCartSlice from "./slices/localCart-slice";
import buyNowCartSlice from "./slices/buyNowCart-slice";
import hydrationSlice, { hydrationCompleted } from "./slices/hydration-slice";

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

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    hydration: hydrationSlice.reducer,
    user: persistedUserReducer,
    localCart: persistedLocalCartReducer,
    buyNowCart: persistedBuyNowCartReducer,
  },
  middleware: [thunk],
  devTools: true,
});

export const persistor = persistStore(store, null, () => {
  store.dispatch(hydrationCompleted());
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
