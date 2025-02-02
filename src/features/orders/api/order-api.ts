import { createApi } from "@reduxjs/toolkit/dist/query";

import { baseQueryWithReauth } from "@/lib/api/base";

import { DetailedOrder, Order } from "../types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], { skip: number; take: number }>({
      query: ({ skip = 0, take = 10 }) => ({
        url: "/order",
        method: "GET",
        params: { skip, take },
      }),
    }),
    getOrder: builder.query<DetailedOrder, number>({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
    }),
  }),
});
