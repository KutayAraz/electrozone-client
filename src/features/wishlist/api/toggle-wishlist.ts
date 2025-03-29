import { baseApi } from "@/lib/api/base-api";

interface WishlistToggleResult {
  action: "added" | "removed";
  productId: number;
}

export const toggleWishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleWishlist: builder.mutation<WishlistToggleResult, number>({
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
