import { baseApi } from "@/lib/api/base-api";

const clearBuyNowCartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    clearBuyNowCart: builder.mutation<void, void>({
      query: () => ({
        url: "/cart/buy-now",
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "BuyNowCart", id: "LIST" }],
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useClearBuyNowCartMutation } = clearBuyNowCartApi;
