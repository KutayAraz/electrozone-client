import { baseApi } from "@/lib/api/base-api";

export const getUserCartCountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserCartCount: builder.query<{ count: number }, void>({
      query: () => ({
        url: "cart/user/count",
        method: "GET",
      }),
      providesTags: [{ type: "UserCartCount", id: "LIST" }],
      keepUnusedDataFor: 300,
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserCartCountQuery } = getUserCartCountApi;
