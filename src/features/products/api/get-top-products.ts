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

export enum ProductTrend {
  BEST_SELLERS = "best-sellers",
  MOST_WISHLISTED = "most-wishlisted",
  BEST_RATED = "best-rated",
}

export const getTopProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopProducts: builder.query<TopProduct[], ProductTrend>({
      query: (trend: ProductTrend) => ({
        url: `/product/${trend}`,
        method: "GET",
      }),
      providesTags: (result, error, trend) => [{ type: "Product", id: trend }],
      keepUnusedDataFor: 600, // 10 minutes
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useGetTopProductsQuery } = getTopProductsApi;
