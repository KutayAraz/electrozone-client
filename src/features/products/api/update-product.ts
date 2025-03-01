import { baseApi } from "@/lib/api/base-api";

import { ProductDetails } from "./get-product-details";

interface ProductUpdate {
  productId: number;
  updates: {
    newPrice?: string;
    newStock?: number;
  };
}

const updateProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProduct: builder.mutation<ProductDetails, ProductUpdate>({
      query: ({ productId, updates }) => ({
        url: `/product`,
        method: "POST",
        body: {
          productId,
          updates,
        },
      }),
      // Invalidate both the specific product and relevant product lists
      invalidatesTags: (_result, _error, { productId }) => [
        { type: "Product", id: productId },
        { type: "Product", id: "best-sellers" },
        { type: "Product", id: "most-wishlisted" },
        { type: "Product", id: "best-rated" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateProductMutation } = updateProductApi;
