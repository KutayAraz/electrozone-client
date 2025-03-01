import { baseApi } from "@/lib/api/base-api";

interface SuggestedProduct {
  id: number;
  productName: string;
  brand: string;
  thumbnail: string;
  averageRating: string;
  price: string;
  stock: number;
  subcategory: string;
  category: string;
}

interface SuggestedProducts {
  suggestionType: string;
  products: SuggestedProduct[];
}

const suggestedProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSuggestedProducts: builder.query<SuggestedProducts, number>({
      query: (productId) => ({
        url: `/product/${productId}/suggested-products`,
        method: "GET",
      }),
      providesTags: (result, error, productId) => [
        { type: "Product", id: `${productId}-suggested` },
      ],
      keepUnusedDataFor: 300, // 5 minutes
      // This endpoint doesn't require authentication
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useGetSuggestedProductsQuery } = suggestedProductsApi;
