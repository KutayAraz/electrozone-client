import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { SignInFormInputs, SignUpFormInputs } from "../types/form-inputs";
import { AuthResponse, RefreshTokenResponse } from "../types/responses";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, SignInFormInputs>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    register: builder.mutation<void, SignUpFormInputs>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    refreshToken: builder.query<RefreshTokenResponse, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useRefreshTokenQuery } =
  authApi;
