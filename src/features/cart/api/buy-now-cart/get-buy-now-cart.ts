import { baseApi } from "@/lib/api/base-api";

import { CartResponse } from "../../types/response";

const getBuyNowCartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBuyNowCart: builder.query<CartResponse, void>({
      query: () => ({
        url: "/cart/buy-now",
        method: "GET",
      }),
      providesTags: [{ type: "BuyNowCart", id: "LIST" }],
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useGetBuyNowCartQuery } = getBuyNowCartApi;
