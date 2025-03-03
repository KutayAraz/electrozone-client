import { baseApi } from "@/lib/api/base-api";

const reviewEligibilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkReviewEligibility: builder.query<boolean, number>({
      query: (productId) => ({
        url: `/review/${productId}/eligibility`,
        method: "GET",
      }),
      providesTags: (_result, _error, productId) => [
        { type: "Review", id: `eligibility-${productId}` },
      ],
      // Keep this data fresh since eligibility can change when a user places new orders
      keepUnusedDataFor: 60,
    }),
  }),
  overrideExisting: false,
});

export const { useCheckReviewEligibilityQuery } = reviewEligibilityApi;
