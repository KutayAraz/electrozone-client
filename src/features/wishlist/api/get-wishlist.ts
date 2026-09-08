import { baseApi } from "@/lib/api/base-api";
import { Product } from "@/types/product";

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserWishlist: builder.query<Product[], void>({
      query: () => ({
        url: "/wishlist",
        method: "GET",
      }),
      providesTags: [{ type: "Wishlist", id: "LIST" }],
      keepUnusedDataFor: 300,
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserWishlistQuery } = wishlistApi;
