import { baseApi } from "@/lib/api/base-api";

const cancelOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    cancelOrder: builder.mutation<void, number>({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, orderId) => [
        { type: "Order", id: orderId },
        { type: "Order", id: "LIST" },
        { type: "Review", id: "eligibility" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useCancelOrderMutation } = cancelOrderApi;
