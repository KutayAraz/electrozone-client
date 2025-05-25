import { baseApi } from "@/lib/api/base-api";

export const subcategoryPriceRangeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubcategoryPriceRange: builder.query<
      { min: number; max: number },
      { subcategoryName: string; brand?: string }
    >({
      query: ({ subcategoryName, brand }) => {
        const params = new URLSearchParams();
        if (brand) {
          params.append("brand", brand);
        }

        return {
          url: `/subcategory/${encodeURIComponent(subcategoryName)}/price-range${
            params.toString() ? `?${params.toString()}` : ""
          }`,
          method: "GET",
        };
      },
      providesTags: (_result, _error, { subcategoryName, brand }) => [
        {
          type: "Subcategory",
          id: `${subcategoryName}-price-range${brand ? `-${brand}` : ""}`,
        },
      ],
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useGetSubcategoryPriceRangeQuery } = subcategoryPriceRangeApi;
