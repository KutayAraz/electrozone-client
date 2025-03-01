import { baseApi } from "@/lib/api/base-api";

interface TopProduct {
  id: number;
  productName: string;
  brand: string;
  thumbnail: string;
  averageRating: string;
  price: string;
  stock: number;
  subcategory: string;
  category: string;
  sold?: number;
  wishlisted?: number;
}

const topProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBestSellers: builder.query<TopProduct[], void>({
      query: () => ({
        url: "/product/best-sellers",
        method: "GET",
      }),
      providesTags: [{ type: "Product", id: "best-sellers" }],
      keepUnusedDataFor: 600, // 10 minutes
      extraOptions: { skipAuth: true },
    }),

    getMostWishlisted: builder.query<TopProduct[], void>({
      query: () => ({
        url: "/product/most-wishlisted",
        method: "GET",
      }),
      providesTags: [{ type: "Product", id: "most-wishlisted" }],
      keepUnusedDataFor: 600, // 10 minutes
      extraOptions: { skipAuth: true },
    }),

    getBestRated: builder.query<TopProduct[], void>({
      query: () => ({
        url: "/product/best-rated",
        method: "GET",
      }),
      providesTags: [{ type: "Product", id: "best-rated" }],
      keepUnusedDataFor: 600, // 10 minutes
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useGetBestSellersQuery, useGetMostWishlistedQuery, useGetBestRatedQuery } =
  topProductsApi;
