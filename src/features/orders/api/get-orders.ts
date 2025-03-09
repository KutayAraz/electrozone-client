import { baseApi } from "@/lib/api/base-api";

export interface GetOrdersParams {
  skip?: number;
  limit?: number;
}

interface OrderItemSummary {
  productId: number;
  productName: string;
  thumbnail: string;
  subcategory: string;
  category: string;
}

export interface OrderListResponse {
  orderId: number;
  orderTotal: string;
  orderDate: string;
  orderQuantity: number;
  user: {
    firstName: string;
    lastName: string;
  };
  orderItems: OrderItemSummary[];
}

const getOrdersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrderListResponse[], GetOrdersParams>({
      query: ({ skip = 0, limit = 10 }) => ({
        url: `/order?skip=${skip}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ orderId }) => ({ type: "Order" as const, id: orderId })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetOrdersQuery } = getOrdersApi;
