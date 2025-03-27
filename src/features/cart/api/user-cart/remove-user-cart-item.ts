import { baseApi } from "@/lib/api/base-api";

import { CartOperationResponse } from "../../types/response";

const removeUserCartItemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    removeUserCartItem: builder.mutation<CartOperationResponse, number>({
      query: (productId) => ({
        url: `/cart/user/item/${productId}`,
        method: "DELETE",
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

export const { useRemoveUserCartItemMutation } = removeUserCartItemApi;
