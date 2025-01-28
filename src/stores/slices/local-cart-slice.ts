import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem, LocalCartState } from "./models";

const initialState: LocalCartState = {
  items: [],
  totalQuantity: 0,
};

export const localCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity += newItem.quantity;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          quantity: newItem.quantity,
        });
      } else {
        existingItem.quantity += newItem.quantity;
      }
    },
    changeItemQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        state.totalQuantity = state.totalQuantity - item.quantity + quantity;
        item.quantity = quantity;
      }
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      const id = action.payload;

      state.totalQuantity -= state.items.find((item) => item.id === id)!.quantity;

      state.items = state.items.filter((item) => item.id !== id);
    },
    clearLocalcart(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addItemToCart, changeItemQuantity, removeItemFromCart, clearLocalcart } =
  localCartSlice.actions;
