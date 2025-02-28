import { baseApi } from "@/lib/api/base-api";

type RefreshTokenResponse = {
  success: boolean;
};

export const refreshTokenApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    refreshToken: builder.query<RefreshTokenResponse, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
        credentials: "include",
      }),
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useRefreshTokenQuery } = refreshTokenApi;
