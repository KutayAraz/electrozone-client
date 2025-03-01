import { baseApi } from "@/lib/api/base-api";

import { ProductDetails } from "./get-product-details";

interface SearchParams {
  query: string;
  skip?: number;
  limit?: number;
  sort?: string;
  stockStatus?: string;
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
  subcategories?: string[];
}

interface SearchResult {
  products: ProductDetails[];
  productQuantity: number;
  availableBrands: string[];
  availableSubcategories: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

const searchProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchProducts: builder.query<SearchResult, SearchParams>({
      query: ({
        query,
        skip = 0,
        limit = 10,
        sort = "relevance",
        stockStatus,
        minPrice = 0,
        maxPrice,
        brands,
        subcategories,
      }) => {
        const params = new URLSearchParams();
        params.append("query", encodeURIComponent(query));
        params.append("skip", skip.toString());
        params.append("limit", limit.toString());
        params.append("sort", sort);

        if (stockStatus) {
          params.append("stock_status", stockStatus);
        }

        params.append("min_price", minPrice.toString());

        if (maxPrice) {
          params.append("max_price", maxPrice.toString());
        }

        if (brands && brands.length > 0) {
          params.append("brands", brands.map((b) => encodeURIComponent(b)).join(" "));
        }

        if (subcategories && subcategories.length > 0) {
          params.append("subcategories", subcategories.map((s) => encodeURIComponent(s)).join(" "));
        }

        return {
          url: `/product?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: (result, error, params) => {
        // Create a unique cache key based on the search parameters
        // This ensures different searches have different cache entries
        const searchKey = `search-${params.query}-${params.sort}-${params.skip}-${params.limit}`;
        return [{ type: "Product", id: searchKey }];
      },
      // Short cache duration for search results
      keepUnusedDataFor: 180, // 3 minutes
      extraOptions: { skipAuth: true },
    }),
  }),
  overrideExisting: false,
});

export const { useSearchProductsQuery } = searchProductsApi;
