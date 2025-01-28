import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem, BuyNowCartState } from "./models";

const initialState: BuyNowCartState = {
  productId: null,
  quantity: 0,
};

export const buyNowCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoBuyNowCart(state, action: PayloadAction<CartItem>) {
      const newProduct = action.payload;
      state.productId = newProduct.id;
      state.quantity = newProduct.quantity;
    },

    clearbuyNowCart(state) {
      state.productId = null;
      state.quantity = 0;
    },
  },
});

export const { addtoBuyNowCart, clearbuyNowCart } = buyNowCartSlice.actions;
