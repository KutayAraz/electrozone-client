import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/ui-slice";
import cartSlice from "./slices/cart-slice";
import userSlice from "./slices/user-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);
const persistedCartReducer = persistReducer(persistConfig, cartSlice.reducer);

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: persistedCartReducer,
    user: persistedUserReducer,
  },
  middleware: [thunk]
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
