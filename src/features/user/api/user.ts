import { createApi } from "@reduxjs/toolkit/dist/query";

import { baseQueryWithReauth } from "@/lib/api/base";

import { UpdateUser, User } from "../types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<User, UpdateUser>({
      query: (data) => ({
        url: "/user",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
