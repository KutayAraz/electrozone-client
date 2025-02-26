import { baseApi } from "@/lib/api/base-api";

import { CartResponse } from "../../types/response";

interface UpdateQuantityPayload {
  productId: string;
  quantity: number;
}

const updateUserCartItemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserCartItem: builder.mutation<CartResponse, UpdateQuantityPayload>({
      query: (cartItem) => ({
        url: "/cart/user/item",
        method: "PATCH",
        body: cartItem,
      }),
      // Invalidate the user cart cache to reflect the updated cart
      invalidatesTags: [{ type: "UserCart", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateUserCartItemMutation } = updateUserCartItemApi;
