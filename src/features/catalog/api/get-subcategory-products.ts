import { baseApi } from "@/lib/api/base-api";

export interface Product {
  id: number;
  productName: string;
  brand: string;
  thumbnail: string;
  averageRating: number;
  price: string;
  stock: number;
  subcategory: string;
  category: string;
}

export type ProductQueryResult = {
  products: Product[];
  productQuantity: number;
};

export type GetProductsPageParam = {
  skip: number;
  limit: number;
};

export type GetProductsQueryArg = {
  subcategory: string;
  sort_by?: string;
  stockStatus?: string;
  minPriceQuery?: string;
  maxPriceQuery?: string;
  brandString?: string;
};

export const getSubcategoryProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubcategoryProducts: builder.infiniteQuery<
      ProductQueryResult,
      GetProductsQueryArg,
      GetProductsPageParam
    >({
      infiniteQueryOptions: {
        initialPageParam: {
          skip: 0,
          limit: 6,
        },
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          if (lastPage.products.length < lastPageParam.limit) {
            return undefined;
          }

          const nextSkip = lastPageParam.skip + lastPageParam.limit;
          return {
            ...lastPageParam,
            skip: nextSkip,
          };
        },
      },
      query({ ...params }) {
        const queryParams = new URLSearchParams();

        // Add pagination params
        if (params.pageParam.skip !== undefined)
          queryParams.append("skip", params.pageParam.skip.toString());
        if (params.pageParam.limit !== undefined)
          queryParams.append("limit", params.pageParam.limit.toString());

        // Add sorting param
        if (params.queryArg.sort_by) queryParams.append("sort_by", params.queryArg.sort_by);

        // Add filtering params
        if (params.queryArg.stockStatus) {
          queryParams.append("stock_status", params.queryArg.stockStatus);
        }
        if (params.queryArg.minPriceQuery)
          queryParams.append("min_price", params.queryArg.minPriceQuery);
        if (params.queryArg.maxPriceQuery)
          queryParams.append("max_price", params.queryArg.maxPriceQuery);
        if (params.queryArg.brandString) queryParams.append("brands", params.queryArg.brandString);

        return `/subcategory/${encodeURIComponent(
          params.queryArg.subcategory,
        )}?${queryParams.toString()}`;
      },
      keepUnusedDataFor: 5 * 60, // Keep data for 5 minutes after component unmounts
      providesTags: (result, error, arg) => {
        // Base tags for the product list
        const baseTags: Array<{ type: "ProductList"; id: string }> = [
          { type: "ProductList", id: "LIST" },
          { type: "ProductList", id: arg.subcategory },
        ];

        // Don't mix different tag types - keep it simple for now
        // If you need individual product invalidation, create a separate endpoint
        return baseTags;
      },

      // FIXED: Create cache keys that separate different filter combinations
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { subcategory, sort_by, stockStatus, minPriceQuery, maxPriceQuery, brandString } =
          queryArgs;
        return `${endpointName}-${subcategory}-${sort_by || "featured"}-${stockStatus || ""}-${
          minPriceQuery || ""
        }-${maxPriceQuery || ""}-${brandString || ""}`;
      },
      extraOptions: { skipAuth: true },
    }),
  }),
});

export const { useGetSubcategoryProductsInfiniteQuery } = getSubcategoryProductsApi;
