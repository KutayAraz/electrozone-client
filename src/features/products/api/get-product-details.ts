import { baseApi } from "@/lib/api/base-api";

interface ProductImage {
  id: number;
  productImage: string;
}

export interface ProductDetails {
  id: number;
  productName: string;
  brand: string;
  thumbnail: string;
  description: string;
  productImages: ProductImage[];
  averageRating: string;
  price: string;
  stock: number;
  subcategory: string;
  category: string;
}

const productDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductDetails: builder.query<ProductDetails, number>({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: "GET",
      }),
      providesTags: (result, error, productId) => [{ type: "Product", id: productId }],
      // Keep data for 2 minutes after component unmounts
      keepUnusedDataFor: 120,
      // This endpoint doesn't require authentication
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductDetailsQuery } = productDetailsApi;
