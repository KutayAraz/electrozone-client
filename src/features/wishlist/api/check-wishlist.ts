import { baseApi } from "@/lib/api/base-api";

const checkWishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkWishlist: builder.query<boolean, number>({
      query: (productId) => ({
        url: `/wishlist/${productId}/check`,
        method: "GET",
      }),
      providesTags: (_result, _error, productId) => [{ type: "Wishlist", id: productId }],
      keepUnusedDataFor: 60,
    }),
  }),
  overrideExisting: false,
});

export const { useCheckWishlistQuery } = checkWishlistApi;
