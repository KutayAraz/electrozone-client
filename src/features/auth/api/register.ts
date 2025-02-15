import { baseApi } from "@/lib/api/base-api";

import { SignUpFormInputs } from "../types/form-inputs";

export const registerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<void, SignUpFormInputs>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation } = registerApi;
