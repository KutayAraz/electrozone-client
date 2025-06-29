import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";

import { setCredentials } from "@/stores/slices/user-slice";
import { setWishlist } from "@/stores/slices/wishlist-slice";

import { wishlistApi } from "../api/get-wishlist";

export const wishlistSyncListenerMiddleware = createListenerMiddleware();

// Listen for successful login (when credentials are set)
wishlistSyncListenerMiddleware.startListening({
  matcher: isAnyOf(setCredentials),
  effect: async (action, listenerApi) => {
    try {
      const wishlistResult = await listenerApi.dispatch(
        wishlistApi.endpoints.getUserWishlist.initiate(),
      );

      if (wishlistResult.data) {
        const productIds = wishlistResult.data.map((item) => item.id);

        // Update the wishlist slice with the server data
        listenerApi.dispatch(setWishlist(productIds));
      }
    } catch (error) {
      console.error("Failed to sync wishlist after login:", error);
    }
  },
});
