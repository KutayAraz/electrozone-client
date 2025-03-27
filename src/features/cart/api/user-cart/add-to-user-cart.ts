import { baseApi } from "@/lib/api/base-api";

import { AddToCartPayload, CartOperationResponse } from "../../types/response";

const addToUserCartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToUserCart: builder.mutation<CartOperationResponse, AddToCartPayload>({
      query: (cartItem) => ({
        url: "/cart/user/item",
        method: "POST",
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

export const { useAddToUserCartMutation } = addToUserCartApi;
