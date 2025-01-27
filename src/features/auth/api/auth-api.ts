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
    signIn: builder.mutation<AuthResponse, SignInFormInputs>({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: builder.query<RefreshTokenResponse, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),
    signUp: builder.mutation<void, SignUpFormInputs>({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
    getWishlist: builder.query<number[], void>({
      query: () => ({
        url: "/user/wishlist",
        method: "GET",
      }),
      transformResponse: (response: any[]) => response.map((product) => product.id),
    }),
    mergeCarts: builder.mutation<void, { productId: number; quantity: number }[]>({
      query: (products) => ({
        url: "/carts/merge-carts",
        method: "PATCH",
        body: products,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useGetWishlistQuery, useMergeCartsMutation } =
  authApi;
