import { baseApi } from "@/lib/api/base-api";

import { AddToCartPayload, QuantityChange } from "../../types/response";

const addToUserCartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToUserCart: builder.mutation<QuantityChange, AddToCartPayload>({
      query: (cartItem) => ({
        url: "/cart/user/item",
        method: "POST",
        body: cartItem,
      }),
      // Invalidate the user cart cache to reflect the updated cart
      invalidatesTags: [{ type: "UserCart", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useAddToUserCartMutation } = addToUserCartApi;
