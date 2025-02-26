import { baseApi } from "@/lib/api/base-api";

import { CartResponse } from "../../types/response";

const getUserCartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserCart: builder.query<CartResponse, void>({
      query: () => ({
        url: "/cart/user",
        method: "GET",
      }),
      providesTags: [{ type: "UserCart", id: "LIST" }],
      // Keep unused data for a short time only since cart info is dynamic
      keepUnusedDataFor: 60, // 1 minute
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserCartQuery } = getUserCartApi;
