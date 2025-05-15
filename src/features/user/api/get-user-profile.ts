import { baseApi } from "@/lib/api/base-api";

import { User } from "../types";

export const getUserProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<User, void>({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: [{ type: "User" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserProfileQuery } = getUserProfileApi;
