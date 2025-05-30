import { baseApi } from "@/lib/api/base-api";

interface CreateReviewDto {
  rating: number;
  comment?: string;
}

const createReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<string, { productId: number; review: CreateReviewDto }>({
      query: ({ productId, review }) => ({
        url: `/review/${productId}`,
        method: "POST",
        body: review,
      }),
      // Invalidate relevant caches after creating a review
      invalidatesTags: (_result, _error, { productId }) => [
        // Invalidate review list for this product
        { type: "Review", id: `product-${productId}` },
        // Invalidate eligibility check (user can no longer review this product)
        { type: "Review", id: `eligibility-${productId}` },
        // Invalidate product details (average rating will change)
        { type: "Product", id: productId },
        // Invalidate top-rated products (this product might now be in the list)
        { type: "Product", id: "best-rated" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useCreateReviewMutation } = createReviewApi;
