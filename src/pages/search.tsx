import { useState } from "react";
import { LoaderFunctionArgs, useLoaderData, useSearchParams } from "react-router-dom";

import { PageHelmet } from "@/components/seo/page-helmet";
import { Spinner } from "@/components/ui/spinner";
import { useAddToCart } from "@/features/cart/hooks/use-add-to-cart";
import {
  searchProductsApi,
  useSearchProductsInfiniteQuery,
} from "@/features/product-listing/api/search-products";
import { FilterDrawer } from "@/features/product-listing/components/filters/filter-drawer";
import { FilterPanel } from "@/features/product-listing/components/filters/filter-panel";
import { MobileFilterSortButtons } from "@/features/product-listing/components/mobile-filter-sort-buttons";
import { ProductList } from "@/features/product-listing/components/product-listing";
import { SortingDrawer } from "@/features/product-listing/components/sorting/sorting-drawer";
import { SortingPanel } from "@/features/product-listing/components/sorting/sorting-panel";
import { useFilters } from "@/features/product-listing/hooks/use-filters";
import { useSorting } from "@/features/product-listing/hooks/use-sorting";
import { useToggleWishlist } from "@/features/wishlist/hooks/use-toggle-wishlist";
import { useInfiniteScrollRef } from "@/hooks/use-infinite-scroll-ref";
import { store } from "@/stores/store";
import { createSearchDescription, createSearchTitle } from "@/utils/seo";

export const searchPageLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  // Default values for when there's no query
  const defaultData = {
    priceRange: { min: "0", max: "10000" },
    brands: [],
    subcategories: [],
  };

  if (!query) return defaultData;

  // Fetch initial data without filters
  const response = await store.dispatch(
    searchProductsApi.endpoints.searchProducts.initiate({ query }),
  );

  return {
    priceRange: response.data?.pages[0].priceRange,
    brands: response.data?.pages[0].brands,
    subcategories: response.data?.pages[0].subcategories,
  };
};

export const SearchPage = () => {
  const { brands, priceRange, subcategories } = useLoaderData();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  // Cart and wishlist functionality
  const [togglingWishlistId, setTogglingWishlistId] = useState<number | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<number | null>(null);

  const { handleToggleWishlist } = useToggleWishlist();
  const { addToCart } = useAddToCart();

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortingDrawerOpen, setSortingDrawerOpen] = useState(false);

  // Use custom hooks for filters and sorting
  const { getFilterParams } = useFilters({
    priceRangeData: priceRange,
  });

  const { currentSortMethod } = useSorting();

  // Get filter params from hook
  const filterParams = getFilterParams();

  // Build query args with filters
  const queryArgs = {
    query: searchQuery,
    sort: currentSortMethod,
    stockStatus: filterParams.stockStatus,
    min_price: filterParams.min_price,
    max_price: filterParams.max_price,
    brandString: filterParams.brandString,
    subcategoriesString: filterParams.subcategoriesString,
  };

  // Pass filter params to the query
  const { data, error, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useSearchProductsInfiniteQuery(queryArgs, {
      refetchOnMountOrArgChange: true,
      skip: !searchQuery,
    });

  const lastProductRef = useInfiniteScrollRef({
    fetchNextPage,
    hasNextPage,
    isFetching,
  });

  // Cart and wishlist handlers
  const handleWishlistToggle = async (productId: number) => {
    setTogglingWishlistId(productId);
    try {
      await handleToggleWishlist(productId);
    } finally {
      setTogglingWishlistId(null);
    }
  };

  const handleAddToCart = async (productId: number) => {
    setAddingToCartId(productId);
    try {
      await addToCart(productId);
    } finally {
      setAddingToCartId(null);
    }
  };

  const isProductTogglingWishlist = (productId: number) => togglingWishlistId === productId;
  const isProductAddingToCart = (productId: number) => addingToCartId === productId;

  const allProducts = data?.pages?.flatMap((page) => page.products) || [];
  const totalProductCount = data?.pages?.[0]?.productQuantity || 0;
  const hasResults = allProducts.length > 0;

  if (!searchQuery) {
    return (
      <>
        <PageHelmet
          title="Search | Electrozone"
          description="Search for electronics, gadgets, and more at Electrozone."
        />
        <div className="page-spacing">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-500">Please enter a search query</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHelmet
        title={createSearchTitle(searchQuery, hasResults)}
        description={createSearchDescription(searchQuery, totalProductCount, hasResults)}
      />

      {/* Mobile Filter/Sort Drawers */}
      <FilterDrawer
        priceRangeData={priceRange}
        brandsData={brands}
        subcategoriesData={subcategories}
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
      />
      <SortingDrawer isOpen={sortingDrawerOpen} onClose={() => setSortingDrawerOpen(false)} />
      {/* Mobile Filter/Sort Buttons */}
      <MobileFilterSortButtons
        onFilterClick={() => setFilterDrawerOpen(true)}
        onSortClick={() => setSortingDrawerOpen(true)}
      />

      <div className="page-spacing">
        <div className="flex flex-row items-start sm:space-x-2">
          {/* Desktop Filter Panel */}
          <div className="flex-col sticky hidden h-[calc(100vh-135px)] w-48 shrink-0 overflow-y-auto sm:top-30 sm:flex md:top-20 md:w-60">
            <h3 className="mb-2 text-lg font-bold">Search Results</h3>
            <div className="flex flex-col overflow-y-auto overflow-x-hidden">
              <FilterPanel
                priceRangeData={priceRange}
                brandsData={brands}
                subcategoriesData={subcategories}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex-1 flex justify-center items-center h-64">
              <div className="text-center">
                <Spinner />
                <p className="mt-2">Searching for &quot;{searchQuery}&quot;...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex-1 flex justify-center items-center h-64">
              <p className="text-red-500">An error occurred while searching. Please try again.</p>
            </div>
          ) : allProducts.length === 0 ? (
            <div className="flex-1 flex justify-center items-center h-64">
              <div className="text-center">
                <p className="text-lg">No products found for &quot;{searchQuery}&quot;</p>
                <p className="text-sm text-gray-500 mt-2">
                  Try adjusting your search terms or filters
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Product Content Area */}
              <div className="flex grow flex-wrap sm:mt-4">
                <div className="w-full px-2 sm:mb-4 sm:flex sm:justify-between">
                  <h5 className="self-end">
                    {totalProductCount} results for &quot;{searchQuery}&quot;
                  </h5>
                  <div className="hidden sm:block">
                    <SortingPanel />
                  </div>
                </div>

                {/* Product Grid with Infinite Scroll */}
                <ProductList
                  products={allProducts}
                  loading={isLoading}
                  ref={lastProductRef}
                  onAddToCart={handleAddToCart}
                  onWishlistToggle={handleWishlistToggle}
                  isAddingToCart={isProductAddingToCart}
                  isTogglingWishlist={isProductTogglingWishlist}
                />

                {isFetching && !isLoading && (
                  <div className="flex w-full justify-center py-4">
                    <Spinner />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
