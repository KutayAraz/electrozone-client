import { baseApi } from "@/lib/api/base-api";

import { CartResponse } from "../../types/response";

const removeSessionCartItemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    removeSessionCartItem: builder.mutation<CartResponse, number>({
      query: (productId) => ({
        url: `/cart/session/item/${productId}`,
        method: "DELETE",
      }),
      // Invalidate the session cart cache to reflect the updated cart
      invalidatesTags: [{ type: "SessionCart", id: "LIST" }],
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useRemoveSessionCartItemMutation } = removeSessionCartItemApi;
