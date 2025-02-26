import { baseApi } from "@/lib/api/base-api";

import { CartResponse } from "../../types/response";

const clearSessionCartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    clearSessionCart: builder.mutation<CartResponse, void>({
      query: () => ({
        url: "/cart/session/clear",
        method: "DELETE",
      }),
      // Invalidate the session cart cache to reflect the cleared cart
      invalidatesTags: [{ type: "SessionCart", id: "LIST" }],
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useClearSessionCartMutation } = clearSessionCartApi;
