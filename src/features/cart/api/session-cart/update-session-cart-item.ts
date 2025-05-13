import { baseApi } from "@/lib/api/base-api";

import { CartResponse } from "../../types/response";

interface UpdateQuantityPayload {
  productId: number;
  quantity: number;
}

const updateSessionCartItemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateSessionCartItem: builder.mutation<CartResponse, UpdateQuantityPayload>({
      query: (cartItem) => ({
        url: "/cart/session/item",
        method: "PATCH",
        body: cartItem,
      }),
      // Invalidate the session cart cache to reflect the updated cart
      invalidatesTags: [
        { type: "SessionCart", id: "LIST" },
        { type: "SessionCartCount", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateSessionCartItemMutation } = updateSessionCartItemApi;
