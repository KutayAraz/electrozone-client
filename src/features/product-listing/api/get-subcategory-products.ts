import { baseApi } from "@/lib/api/base-api";
import { Product } from "@/types/product";

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
  sort?: string;
  stockStatus?: string;
  min_price?: string;
  max_price?: string;
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
        if (params.queryArg.sort) queryParams.append("sort", params.queryArg.sort);

        // Add filtering params
        if (params.queryArg.stockStatus) {
          queryParams.append("stock_status", params.queryArg.stockStatus);
        }
        if (params.queryArg.min_price) queryParams.append("min_price", params.queryArg.min_price);
        if (params.queryArg.max_price) {
          queryParams.append("max_price", params.queryArg.max_price);
        }
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

      // No custom serializeQueryArgs on purpose: the default hashes the whole
      // arg object, so any arg that reaches the URL also reaches the cache key.
      // A hand-written key can silently drift from the URL - that is how a
      // `sort_by`/`sort` typo made sorting a no-op and kept it out of the key.
      extraOptions: { skipAuth: true },
    }),
  }),
});

export const { useGetSubcategoryProductsInfiniteQuery } = getSubcategoryProductsApi;
