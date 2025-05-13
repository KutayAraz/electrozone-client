import { baseApi } from "@/lib/api/base-api";

const getSessionCartCountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSessionCartCount: builder.query<{ count: number }, void>({
      query: () => ({
        url: "cart/session/count",
        method: "GET",
      }),
      providesTags: [{ type: "SessionCartCount", id: "List" }],
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useGetSessionCartCountQuery } = getSessionCartCountApi;
