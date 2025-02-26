import { baseApi } from "@/lib/api/base-api";

import { CartResponse } from "../../types/response";

const clearUserCartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    clearUserCart: builder.mutation<CartResponse, void>({
      query: () => ({
        url: "/cart/user/clear",
        method: "DELETE",
      }),
      // Invalidate the user cart cache to reflect the cleared cart
      invalidatesTags: [{ type: "UserCart", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useClearUserCartMutation } = clearUserCartApi;
