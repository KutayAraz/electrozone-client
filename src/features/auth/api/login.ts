import { baseApi } from "@/lib/api/base-api";

import { SignInFormInputs } from "../types/form-inputs";
import { AuthResponse } from "../types/responses";

export const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, SignInFormInputs>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = loginApi;
