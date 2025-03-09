import { baseApi } from "@/lib/api/base-api";

interface OrderItemDetail {
  id: number;
  quantity: number;
  price: string;
  productName: string;
  brand: string;
  thumbnail: string;
  category: string;
  subcategory: string;
}

export interface OrderDetailResponse {
  id: number;
  user: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
  };
  orderTotal: string;
  orderDate: string;
  orderItems: OrderItemDetail[];
  isCancellable: boolean;
}

const getOrderByIdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderById: builder.query<OrderDetailResponse, number>({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "GET",
      }),
      providesTags: (_, __, orderId) => [{ type: "Order", id: orderId }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetOrderByIdQuery } = getOrderByIdApi;
