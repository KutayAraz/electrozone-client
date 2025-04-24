import { baseApi } from "@/lib/api/base-api";
import { PasswordSchema } from "../schemas/change-password-schema";

const changePasswordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation<{ isSuccess: Boolean }, PasswordSchema>({
      query: (passwordData) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: passwordData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useChangePasswordMutation } = changePasswordApi;
