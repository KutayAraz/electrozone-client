import { baseApi } from "@/lib/api/base-api";

export const userWishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userWishlist: builder.query<any, void>({
      query: () => ({
        url: "/wishlist",
        method: "GET",
      }),
      providesTags: ["Wishlist"],
    }),
  }),
  overrideExisting: false,
});

export const { useUserWishlistQuery } = userWishlistApi;
