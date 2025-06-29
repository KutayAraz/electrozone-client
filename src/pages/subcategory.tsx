import { useCallback, useRef, useState } from "react";
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router";

import { Spinner } from "@/components/ui/spinner";
import { useAddToCart } from "@/features/cart/hooks/use-add-to-cart";
import { subcategoryBrandsApi } from "@/features/product-listing/api/get-subcategory-brands";
import { subcategoryPriceRangeApi } from "@/features/product-listing/api/get-subcategory-price-range";
import { useGetSubcategoryProductsInfiniteQuery } from "@/features/product-listing/api/get-subcategory-products";
import { FilterDrawer } from "@/features/product-listing/components/filters/filter-drawer";
import { FilterPanel } from "@/features/product-listing/components/filters/filter-panel";
import { MobileFilterSortButtons } from "@/features/product-listing/components/filters/mobile-filter-sort-buttons";
import { ProductList } from "@/features/product-listing/components/product-listing";
import { SortingDrawer } from "@/features/product-listing/components/sorting/sorting-drawer";
import { SortingPanel } from "@/features/product-listing/components/sorting/sorting-panel";
import { useFilters } from "@/features/product-listing/hooks/use-filters";
import { useSorting } from "@/features/product-listing/hooks/use-sorting";
import { useToggleWishlist } from "@/features/wishlist/hooks/use-toggle-wishlist";
import { store } from "@/stores/store";
import { formatString } from "@/utils/format-casing";

export const subcategoryPageLoader = async (request: LoaderFunctionArgs) => {
  const subcategory = request?.params?.subcategory;

  if (!subcategory) {
    throw new Error("No subcategory found!");
  }
  return {
    brands: await store.dispatch(
      subcategoryBrandsApi.endpoints.getSubcategoryBrands.initiate(subcategory),
    ),
    priceRange: await store.dispatch(
      subcategoryPriceRangeApi.endpoints.getSubcategoryPriceRange.initiate({
        subcategoryName: subcategory,
      }),
    ),
  };
};

export const SubcategoryPage = () => {
  const { brands, priceRange } = useLoaderData();
  const { subcategory } = useParams();

  // Cart and wishlist functionality
  const [togglingWishlistId, setTogglingWishlistId] = useState<number | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<number | null>(null);

  const { handleToggleWishlist } = useToggleWishlist();
  const { addToCart } = useAddToCart();

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortingDrawerOpen, setSortingDrawerOpen] = useState(false);

  // Use custom hooks for filters and sorting
  const { getFilterParams } = useFilters({
    priceRangeData: priceRange.data,
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
    subcategoriesString: filterParams.subcategoriesString,
  };

  // Pass filter params to the query
  const { data, error, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useGetSubcategoryProductsInfiniteQuery(queryArgs, {
      refetchOnMountOrArgChange: true,
      skip: !subcategory,
    });
  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      // Skip if we're already fetching or the node is null
      if (isFetching || !node) return;

      // Disconnect previous observer if it exists
      if (observer.current) {
        observer.current.disconnect();
      }

      // Create new observer
      observer.current = new IntersectionObserver(
        (entries) => {
          // If the target is visible and we have more pages
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 0.1 },
      );

      // Start observing the new node
      observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching],
  );

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

  return (
    <>
      {/* Mobile Filter/Sort Drawers */}
      <FilterDrawer
        priceRangeData={priceRange.data}
        brandsData={brands.data}
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
      />
      <SortingDrawer isOpen={sortingDrawerOpen} onClose={() => setSortingDrawerOpen(false)} />

      <div className="page-spacing">
        <div className="flex flex-row items-start sm:space-x-2">
          {/* Desktop Filter Panel */}
          <div className="sticky hidden h-[calc(100vh-135px)] w-48 shrink-0 flex-col overflow-y-auto sm:top-[150px] sm:flex md:top-28 md:w-60">
            <h3 className="pl-4 mb-2 text-lg font-bold">
              {subcategory ? subcategory.toUpperCase().replace(/-/g, " ") : "Products"}
            </h3>
            <div className="flex flex-col overflow-y-auto overflow-x-hidden">
              <FilterPanel priceRangeData={priceRange.data} brandsData={brands.data} />
            </div>
          </div>

          {isLoading ? (
            <div>
              Loading Products... <Spinner />
            </div>
          ) : error ? (
            <p>There was an error</p>
          ) : allProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <>
              {/* Product Content Area */}
              <div className="flex grow flex-wrap sm:mt-4">
                {/* Mobile View: Category Title */}
                <h5 className="self-end px-2 text-lg sm:hidden">
                  Listing {totalProductCount} products for {formatString(subcategory || "", "-")}
                </h5>

                {/* Desktop View: Header & Sorting */}
                <div className="mb-4 hidden w-full justify-between px-2 sm:flex">
                  <h5 className="self-end text-lg">
                    Listing {totalProductCount} products for {formatString(subcategory || "", "-")}
                  </h5>
                  <SortingPanel />
                </div>

                {/* Mobile Filter/Sort Buttons */}
                <MobileFilterSortButtons
                  onFilterClick={() => setFilterDrawerOpen(true)}
                  onSortClick={() => setSortingDrawerOpen(true)}
                />

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
                  <div className="flex justify-center py-4">
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
