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
  brands: string[];
  subcategories: string[];
  priceRange: { min: string; max: string };
};

export type SearchPageParam = {
  skip: number;
  limit: number;
};

export type SearchQueryArg = {
  query: string;
  sort?: string;
  stockStatus?: string;
  min_price?: string;
  max_price?: string;
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
        if (params.queryArg.min_price) {
          queryParams.append("min_price", params.queryArg.min_price);
        }
        if (params.queryArg.max_price) {
          queryParams.append("max_price", params.queryArg.max_price);
        }
        if (params.queryArg.brandString) {
          queryParams.append("brands", params.queryArg.brandString);
        }
        if (params.queryArg.subcategoriesString) {
          queryParams.append("subcategories", params.queryArg.subcategoriesString);
        }

        return `product?${queryParams.toString()}`;
      },
      keepUnusedDataFor: 0,
      extraOptions: { skipAuth: true },
    }),
  }),
});

export const { useSearchProductsInfiniteQuery } = searchProductsApi;
