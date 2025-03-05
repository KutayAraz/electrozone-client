import { baseApi } from "@/lib/api/base-api";

const subcategoryBrandsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubcategoryBrands: builder.query<string[], string>({
      query: (subcategoryName) => ({
        url: `/subcategory/${encodeURIComponent(subcategoryName)}/brands`,
        method: "GET",
      }),
      providesTags: (result, error, subcategoryName) => [
        { type: "Subcategory", id: `${subcategoryName}-brands` },
      ],
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useGetSubcategoryBrandsQuery } = subcategoryBrandsApi;
