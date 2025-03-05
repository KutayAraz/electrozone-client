import { baseApi } from "@/lib/api/base-api";

export interface Category {
  id: number;
  category: string;
}

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: [{ type: "Category", id: "LIST" }],
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useGetCategoriesQuery } = categoriesApi;
