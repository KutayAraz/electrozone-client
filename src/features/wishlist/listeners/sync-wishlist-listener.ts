import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";

import { loadQuery } from "@/lib/api/load-query";
import { setCredentials } from "@/stores/slices/user-slice";
import { setWishlist } from "@/stores/slices/wishlist-slice";

import { wishlistApi } from "../api/get-wishlist";

export const wishlistSyncListenerMiddleware = createListenerMiddleware();

// Listen for successful login (when credentials are set)
wishlistSyncListenerMiddleware.startListening({
  matcher: isAnyOf(setCredentials),
  effect: async (action, listenerApi) => {
    try {
      const wishlist = await loadQuery(
        listenerApi.dispatch(
          wishlistApi.endpoints.getUserWishlist.initiate(undefined, { forceRefetch: true }),
        ),
      );

      // Update the wishlist slice with the server data
      listenerApi.dispatch(setWishlist(wishlist.map((item) => item.id)));
    } catch (error) {
      console.error("Failed to sync wishlist after login:", error);
    }
  },
});
