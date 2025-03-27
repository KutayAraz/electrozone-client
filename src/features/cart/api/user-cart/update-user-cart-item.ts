import { baseApi } from "@/lib/api/base-api";

import { CartOperationResponse } from "../../types/response";

interface UpdateQuantityPayload {
  productId: string;
  quantity: number;
}

const updateUserCartItemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserCartItem: builder.mutation<CartOperationResponse, UpdateQuantityPayload>({
      query: (cartItem) => ({
        url: "/cart/user/item",
        method: "PATCH",
        body: cartItem,
      }),
      // Invalidate the user cart cache to reflect the updated cart
      invalidatesTags: [
        { type: "UserCart", id: "LIST" },
        { type: "UserCartCount", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateUserCartItemMutation } = updateUserCartItemApi;
