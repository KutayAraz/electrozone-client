import { baseApi } from "@/lib/api/base-api";

import { BuyNowCartPayload } from "../../types/response";

const createBuyNowCartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBuyNowCart: builder.mutation<void, BuyNowCartPayload>({
      query: (buyNowDto) => ({
        url: "/cart/buy-now",
        method: "POST",
        body: buyNowDto,
      }),
      // Invalidate the buy-now cart cache
      invalidatesTags: [{ type: "BuyNowCart", id: "LIST" }],
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useCreateBuyNowCartMutation } = createBuyNowCartApi;
