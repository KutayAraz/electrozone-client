import { baseApi } from "@/lib/api/base-api";

export const logoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useLogoutMutation } = logoutApi;
