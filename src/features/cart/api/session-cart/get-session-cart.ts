import { baseApi } from "@/lib/api/base-api";

import { CartResponse } from "../../types/response";

const getSessionCartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSessionCart: builder.query<CartResponse, void>({
      query: () => ({
        url: "/cart/session",
        method: "GET",
      }),
      providesTags: [{ type: "SessionCart", id: "LIST" }],
      keepUnusedDataFor: 60,
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useGetSessionCartQuery } = getSessionCartApi;
