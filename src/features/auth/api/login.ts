import { baseApi } from "@/lib/api/base-api";

import { LoginSchema } from "../schemas/login-schema";

type AuthResponse = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  cartItemCount: number;
};

const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginSchema>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User", "BuyNowCart", "UserCart"],
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = loginApi;
