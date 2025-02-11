import { baseApi } from "@/lib/api/base-api";

export const toggleWishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleWishlist: builder.mutation<any, void>({
      query: (productId) => ({
        url: `wishlist/${productId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
  overrideExisting: false,
});

export const { useToggleWishlistMutation } = toggleWishlistApi;
