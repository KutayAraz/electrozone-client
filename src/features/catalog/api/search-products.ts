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

export type SearchResult = {
  products: Product[];
  productQuantity: number;
};

export type SearchPageParam = {
  skip: number;
  limit: number;
};

export type SearchQueryArg = {
  query: string;
  sort?: string;
  stockStatus?: string;
  minPrice?: string;
  maxPrice?: string;
  brandString?: string;
  subcategoriesString?: string;
};

export const searchProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchProducts: builder.infiniteQuery<SearchResult, SearchQueryArg, SearchPageParam>({
      infiniteQueryOptions: {
        initialPageParam: {
          skip: 0,
          limit: 10,
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
      query(params) {
        const queryParams = new URLSearchParams();

        queryParams.append("query", encodeURIComponent(params.queryArg.query));

        if (params.pageParam.skip !== undefined)
          queryParams.append("skip", params.pageParam.skip.toString());
        if (params.pageParam.limit !== undefined)
          queryParams.append("limit", params.pageParam.limit.toString());

        if (params.queryArg.sort) {
          queryParams.append("sort", params.queryArg.sort);
        }
        if (params.queryArg.stockStatus) {
          queryParams.append("stock_status", params.queryArg.stockStatus);
        }
        if (params.queryArg.minPrice) {
          queryParams.append("min_price", params.queryArg.minPrice);
        }
        if (params.queryArg.maxPrice) {
          queryParams.append("max_price", params.queryArg.maxPrice);
        }
        if (params.queryArg.brandString) {
          queryParams.append("brands", params.queryArg.brandString);
        }
        if (params.queryArg.subcategoriesString) {
          queryParams.append("subcategories", params.queryArg.subcategoriesString);
        }

        return `/search?${queryParams.toString()}`;
      },
      keepUnusedDataFor: 0,
      extraOptions: { skipAuth: true },
    }),
  }),
});

export const { useSearchProductsInfiniteQuery } = searchProductsApi;
