import { baseApi } from "@/lib/api/base-api";

export interface ProcessOrderRequest {
  checkoutSnapshotId: string;
  idempotencyKey: string;
}

export interface OrderIdResponse {
  orderId: number;
}

const processOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    processOrder: builder.mutation<OrderIdResponse, ProcessOrderRequest>({
      query: (body) => ({
        url: "/order/process-order",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "UserCart", id: "LIST" },
        { type: "UserCartCount", id: "LIST" },
        { type: "SessionCart", id: "LIST" },
        { type: "SessionCartCount", id: "LIST" },
        { type: "BuyNowCart", id: "LIST" },
        { type: "Order", id: "LIST" },
        { type: "Review", id: "eligibility" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useProcessOrderMutation } = processOrderApi;
