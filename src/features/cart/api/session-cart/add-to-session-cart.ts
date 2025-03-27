import { baseApi } from "@/lib/api/base-api";

import { AddToCartPayload, CartOperationResponse } from "../../types/response";

const addToSessionCartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToSessionCart: builder.mutation<CartOperationResponse, AddToCartPayload>({
      query: (cartItem) => ({
        url: "/cart/session",
        method: "POST",
        body: cartItem,
      }),
      // Invalidate the session cart cache to reflect the updated cart
      invalidatesTags: [
        { type: "SessionCart", id: "LIST" },
        { type: "SessionCartCount", id: "LIST" },
      ],
      // This endpoint doesn't require authentication
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useAddToSessionCartMutation } = addToSessionCartApi;
