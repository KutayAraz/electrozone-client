import { baseApi } from "@/lib/api/base-api";

import { RegisterSchema } from "../schemas/register-schema";

export const registerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterSchema>({
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
