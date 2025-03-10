import { baseApi } from "@/lib/api/base-api";

const deleteUserProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteUserProfile: builder.mutation<void, void>({
      query: () => ({
        url: "/user/profile",
        method: "DELETE",
      }),
      // Invalidate all user data after deletion
      invalidatesTags: [
        { type: "User" },
        { type: "Order", id: "LIST" },
        { type: "Wishlist", id: "LIST" },
        { type: "UserCart", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useDeleteUserProfileMutation } = deleteUserProfileApi;
