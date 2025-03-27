import { baseApi } from "@/lib/api/base-api";

import { CartResponse } from "../../types/response";

const mergeCartsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    mergeCarts: builder.mutation<CartResponse, void>({
      query: () => ({
        url: "/cart/session/merge",
        method: "PATCH",
      }),
      // Invalidate both cart types since the session cart will be cleared
      // and the user cart will be updated
      invalidatesTags: [
        { type: "UserCart", id: "LIST" },
        { type: "SessionCart", id: "LIST" },
        { type: "UserCartCount", id: "LIST" },
        { type: "SessionCartCount", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useMergeCartsMutation } = mergeCartsApi;
