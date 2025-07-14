import { InfiniteData } from "@reduxjs/toolkit/query/react";

import { baseApi } from "@/lib/api/base-api";

export interface GetOrdersParams {
  skip: number;
  limit: number;
}

export interface OrderItemSummary {
  productId: number;
  productName: string;
  thumbnail: string;
  subcategory: string;
  category: string;
}

export interface OrderSummary {
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

export const getOrdersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.infiniteQuery<OrderSummary[], void, GetOrdersParams>({
      infiniteQueryOptions: {
        initialPageParam: {
          skip: 0,
          limit: 6,
        },
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          // If we got fewer items than requested, we've reached the end
          const nextSkip = lastPageParam.skip + lastPageParam.limit;

          if (Array.isArray(lastPage) && lastPage.length < lastPageParam.limit) {
            return undefined;
          }

          return {
            ...lastPageParam,
            skip: nextSkip,
          };
        },
      },
      query({ pageParam: { skip, limit } }) {
        return `/order?skip=${skip}&limit=${limit}`;
      },
      providesTags: (result: InfiniteData<OrderSummary[], GetOrdersParams> | undefined) => {
        // Check if result exists and has pages with data
        if (result?.pages) {
          // Flatten all pages into a single array of orders
          const allOrders: OrderSummary[] = [];
          result.pages.forEach((page) => {
            if (Array.isArray(page)) {
              allOrders.push(...page);
            }
          });

          if (allOrders.length > 0) {
            return [
              ...allOrders.map((order) => ({ type: "Order" as const, id: order.orderId })),
              { type: "Order" as const, id: "LIST" },
            ];
          }
        }
        // Default case with just the LIST tag
        return [{ type: "Order" as const, id: "LIST" }];
      },
    }),
  }),
});

export const { useGetOrdersInfiniteQuery } = getOrdersApi;
