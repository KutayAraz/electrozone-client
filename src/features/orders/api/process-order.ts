import { baseApi } from "@/lib/api/base-api";

export interface ProcessOrderRequest {
  checkoutSnapshot: string;
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
        { type: "SessionCart", id: "LIST" },
        { type: "BuyNowCart", id: "LIST" },
        { type: "Order", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useProcessOrderMutation } = processOrderApi;
