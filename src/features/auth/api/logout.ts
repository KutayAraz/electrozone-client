import { baseApi } from "@/lib/api/base-api";

const logoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User", "BuyNowCart", "UserCart"],
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useLogoutMutation } = logoutApi;
