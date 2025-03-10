import { baseApi } from "@/lib/api/base-api";

interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  password?: string;
}

interface UpdateUserResponse {
  email: string;
  address: string;
  city: string;
}

const updateUserProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation<UpdateUserResponse, UpdateUserInput>({
      query: (userData) => ({
        url: "/user/profile",
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateUserProfileMutation } = updateUserProfileApi;
