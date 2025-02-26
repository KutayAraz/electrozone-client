import { baseApi } from "@/lib/api/base-api";

import { AddToCartPayload, QuantityChange } from "../../types/response";

const addToSessionCartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToSessionCart: builder.mutation<QuantityChange, AddToCartPayload>({
      query: (cartItem) => ({
        url: "/cart/session",
        method: "POST",
        body: cartItem,
      }),
      // Invalidate the session cart cache to reflect the updated cart
      invalidatesTags: [{ type: "SessionCart", id: "LIST" }],
      // This endpoint doesn't require authentication
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useAddToSessionCartMutation } = addToSessionCartApi;
