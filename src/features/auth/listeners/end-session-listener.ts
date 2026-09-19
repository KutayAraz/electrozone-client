import { createListenerMiddleware } from "@reduxjs/toolkit";

import { baseApi } from "@/lib/api/base-api";
import { clearCredentials } from "@/stores/slices/user-slice";
import { clearWishlist } from "@/stores/slices/wishlist-slice";
import type { RootState } from "@/stores/store";

export const endSessionListenerMiddleware = createListenerMiddleware();

// Credentials are cleared both by a logout and by a failed token refresh. Either way,
// drop everything that belonged to the signed-in user so none of it is shown to a
// guest, or to the next user who signs in on this browser.
endSessionListenerMiddleware.startListening({
  actionCreator: clearCredentials,
  effect: (_action, listenerApi) => {
    const { user } = listenerApi.getOriginalState() as RootState;

    if (!user.isAuthenticated) return;

    listenerApi.dispatch(clearWishlist());
    listenerApi.dispatch(baseApi.util.resetApiState());
  },
});
