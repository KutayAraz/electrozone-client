import { baseApi } from "@/lib/api/base-api";
import { ProfileSchema } from "../schemas/profile-schema";

interface UpdateUserResponse {
  email: string;
  address: string;
  city: string;
}

const updateUserProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation<UpdateUserResponse, Partial<ProfileSchema>>({
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
