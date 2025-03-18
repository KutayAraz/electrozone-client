import { baseApi } from "@/lib/api/base-api";

export interface ProductInfo {
  id: number;
  productName: string;
  brand: string;
  thumbnail: string;
  averageRating: number;
  price: number;
  stock: number;
  subcategory: string;
  category: string;
}

export interface ProductQueryResult {
  products: ProductInfo[];
  productQuantity: number;
}

export interface CategoryInfo {
  subcategory: string;
  topSelling: ProductQueryResult;
  topWishlisted: ProductQueryResult;
}

const categoryInfoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryInfo: builder.query<CategoryInfo[], string>({
      query: (categoryName) => ({
        url: `/category/${encodeURIComponent(categoryName)}`,
        method: "GET",
      }),
      providesTags: (_result, _error, categoryName) => [{ type: "Category", id: categoryName }],
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useGetCategoryInfoQuery } = categoryInfoApi;
