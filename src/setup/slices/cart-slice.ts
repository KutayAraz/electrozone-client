import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "./models";

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(
      state,
      action: PayloadAction<{ totalQuantity: number; items: CartItem[] }>
    ) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalQuantity += newItem.quantity;
      state.changed = true;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          thumbnail: newItem.thumbnail,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price,
          name: newItem.name,
        });
      } else {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = existingItem.totalPrice + (newItem.price * newItem.quantity);
      }
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    changeItemQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        state.totalQuantity = state.totalQuantity - item.quantity + quantity;
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
        state.changed = true;
        const priceChange = action.payload.quantity - item.quantity;
        state.totalPrice += priceChange * item.price;
      }
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;

      state.totalQuantity -= state.items.find(
        (item) => item.id === id
      )!.quantity;

      state.items = state.items.filter((item) => item.id !== id);

      state.changed = true;
    },
  },
});

export const { replaceCart, addItemToCart, removeItemFromCart } =
  cartSlice.actions;

export default cartSlice;
