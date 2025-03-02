import { baseApi } from "@/lib/api/base-api";

interface WishlistItem {
  id: number;
  productName: string;
  brand: string;
  averageRating: number;
  thumbnail: string;
  price: number;
  stock: number;
  subcategory: string;
  category: string;
}

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserWishlist: builder.query<WishlistItem[], void>({
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
