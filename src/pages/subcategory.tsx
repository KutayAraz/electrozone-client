import { useState } from "react";
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router";

import { PageHelmet } from "@/components/seo/PageHelmet";
import { CenteredSpinner, Spinner } from "@/components/ui/spinner";
import { useAddToCart } from "@/features/cart/hooks/useAddToCart";
import { subcategoryBrandsApi } from "@/features/product-listing/api/get-subcategory-brands";
import { subcategoryPriceRangeApi } from "@/features/product-listing/api/get-subcategory-price-range";
import { useGetSubcategoryProductsInfiniteQuery } from "@/features/product-listing/api/get-subcategory-products";
import { FilterDrawer } from "@/features/product-listing/components/filters/FilterDrawer";
import { FilterPanel } from "@/features/product-listing/components/filters/FilterPanel";
import { MobileFilterSortButtons } from "@/features/product-listing/components/MobileFilterSortButtons";
import { ProductList } from "@/features/product-listing/components/ProductListing";
import { SortingDrawer } from "@/features/product-listing/components/sorting/SortingDrawer";
import { SortingPanel } from "@/features/product-listing/components/sorting/SortingPanel";
import { useFilters } from "@/features/product-listing/hooks/useFilters";
import { useSorting } from "@/features/product-listing/hooks/useSorting";
import { useToggleWishlist } from "@/features/wishlist/hooks/useToggleWishlist";
import { useInfiniteScrollRef } from "@/hooks/useInfiniteScrollRef";
import { loadQuery } from "@/lib/api/load-query";
import { store } from "@/stores/store";
import { dedupeById } from "@/utils/dedupe-by-id";
import { formatString } from "@/utils/format-casing";
import { createCategoryDescription, createCategoryTitle } from "@/utils/seo";

export const subcategoryPageLoader = async (request: LoaderFunctionArgs) => {
  const subcategory = request?.params?.subcategory;

  if (!subcategory) {
    throw new Error("No subcategory found!");
  }

  const [brands, priceRange] = await Promise.all([
    loadQuery(
      store.dispatch(subcategoryBrandsApi.endpoints.getSubcategoryBrands.initiate(subcategory)),
    ),
    loadQuery(
      store.dispatch(
        subcategoryPriceRangeApi.endpoints.getSubcategoryPriceRange.initiate({
          subcategoryName: subcategory,
        }),
      ),
    ),
  ]);

  return { brands, priceRange };
};

export const SubcategoryPage = () => {
  const { brands, priceRange } = useLoaderData();
  const { subcategory, category } = useParams();

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
    subcategory: subcategory || "",
    sort: currentSortMethod,
    stockStatus: filterParams.stockStatus,
    min_price: filterParams.min_price,
    max_price: filterParams.max_price,
    brandString: filterParams.brandString,
  };

  // Pass filter params to the query
  const { data, error, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useGetSubcategoryProductsInfiniteQuery(queryArgs, {
      refetchOnMountOrArgChange: true,
      skip: !subcategory,
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

  const allProducts = dedupeById(data?.pages?.flatMap((page) => page.products) || []);
  const totalProductCount = data?.pages?.[0]?.productQuantity || 0;

  return (
    <>
      <PageHelmet
        title={createCategoryTitle(category || "", subcategory)}
        description={createCategoryDescription(category || "", subcategory)}
      />

      {/* Mobile Filter/Sort Drawers */}
      <FilterDrawer
        priceRangeData={priceRange}
        brandsData={brands}
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
            <h3 className="text-lg font-bold">
              {subcategory ? subcategory.toUpperCase().replace(/-/g, " ") : "Products"}
            </h3>

            <div className="flex flex-col overflow-x-hidden">
              <FilterPanel priceRangeData={priceRange} brandsData={brands} />
            </div>
          </div>

          {isLoading ? (
            <div>
              Loading Products... <Spinner size={20} />
            </div>
          ) : error ? (
            <p>There was an error</p>
          ) : allProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <>
              {/* Product Content Area */}
              <div className="flex grow flex-wrap sm:mt-4">
                <div className="mb-4 w-full px-2 sm:flex sm:justify-between">
                  <h5 className="self-end text-lg">
                    Listing {totalProductCount} products for {formatString(subcategory || "", "-")}
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
                {isFetching && !isLoading && <CenteredSpinner className="py-4" />}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
