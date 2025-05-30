import { baseApi } from "@/lib/api/base-api";

export interface ReviewType {
  id: number;

  reviewDate: string;

  rating: string;

  comment: string;

  user: {
    firstName: string;

    lastName: string;
  };
}

export interface RatingDistribution {
  review_rating: number;
  count: string;
}

interface ProductReviewsResponse {
  reviews: ReviewType[];
  ratingsDistribution: RatingDistribution[];
  totalCount: number;
  skip: number;
  limit: number;
}

const productReviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductReviews: builder.query<ProductReviewsResponse, number>({
      query: (productId) => ({
        url: `/review/${productId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, productId) => [
        { type: "Review", id: `product-${productId}` },
      ],
      keepUnusedDataFor: 300, // 5 minutes
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductReviewsQuery } = productReviewsApi;
