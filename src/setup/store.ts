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
import lastVisitedURLSlice from "./slices/lastVisited-slice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);
const persistedLocalCartReducer = persistReducer(
  persistConfig,
  localCartSlice.reducer
);
const persistedBuyNowCartReducer = persistReducer(
  persistConfig,
  buyNowCartSlice.reducer
);

const persistedLastVisitedURLReducer = persistReducer(
  persistConfig,
  lastVisitedURLSlice.reducer
);

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    hydration: hydrationSlice.reducer,
    user: persistedUserReducer,
    localCart: persistedLocalCartReducer,
    buyNowCart: persistedBuyNowCartReducer,
    lastVisitedURL: persistedLastVisitedURLReducer,
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
