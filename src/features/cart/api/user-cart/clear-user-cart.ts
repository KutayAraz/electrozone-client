import { baseApi } from "@/lib/api/base-api";

import { CartOperationResponse } from "../../types/response";

const clearUserCartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    clearUserCart: builder.mutation<CartOperationResponse, void>({
      query: () => ({
        url: "/cart/user/clear",
        method: "DELETE",
      }),
      // Invalidate the user cart cache to reflect the cleared cart
      invalidatesTags: [
        { type: "UserCart", id: "LIST" },
        { type: "UserCartCount", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useClearUserCartMutation } = clearUserCartApi;
