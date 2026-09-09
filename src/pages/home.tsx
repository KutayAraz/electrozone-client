import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router";

import { PageHelmet } from "@/components/seo/PageHelmet";
import { Carousel, CarouselError, CarouselSkeleton } from "@/components/ui/carousel";
import { Categories } from "@/features/product-listing/components/Categories";
import { getTopProductsApi, ProductTrend } from "@/features/products/api/get-top-products";
import { useToggleWishlist } from "@/features/wishlist/hooks/useToggleWishlist";
import { loadQuery } from "@/lib/api/load-query";
import { store } from "@/stores/store";
import { CarouselProduct } from "@/types/product";

const loadTopProducts = (trend: ProductTrend) =>
  loadQuery(store.dispatch(getTopProductsApi.endpoints.getTopProducts.initiate(trend)));

export const homePageLoader = () => ({
  bestRated: loadTopProducts(ProductTrend.BEST_RATED),
  mostWishlisted: loadTopProducts(ProductTrend.MOST_WISHLISTED),
  bestSellers: loadTopProducts(ProductTrend.BEST_SELLERS),
});

const ProductsShowcase = ({ products }: { products: CarouselProduct[] }) => {
  const { handleToggleWishlist } = useToggleWishlist();

  const [togglingProductId, setTogglingProductId] = useState<number | null>(null);

  const handleWishlistToggle = async (id: number) => {
    setTogglingProductId(id);

    try {
      await handleToggleWishlist(id);
    } finally {
      setTogglingProductId(null);
    }
  };

  const isProductToggling = (id: number) => togglingProductId === id;

  return (
    <Carousel
      products={products}
      onWishlistToggle={handleWishlistToggle}
      isTogglingWishlist={isProductToggling}
    />
  );
};

export const HomePage = () => {
  const { bestRated, mostWishlisted, bestSellers } = useLoaderData<typeof homePageLoader>();

  return (
    <>
      <PageHelmet
        title="Electrozone | Everything Electronics"
        description="Explore a wide variety of electronics from TVs to printers. Discover great deals and the latest technology at Electrozone."
      />

      <div className="page-spacing">
        <div className="max-w-screen-xl text-center xl:mx-auto">
          <Categories />

          <h2 className="mb-3 mt-6 text-xl font-semibold">Best Selling Products</h2>

          <Suspense fallback={<CarouselSkeleton />}>
            <Await resolve={bestSellers} errorElement={<CarouselError />}>
              {(products: CarouselProduct[]) => <ProductsShowcase products={products} />}
            </Await>
          </Suspense>

          <h2 className="my-3 text-xl font-semibold">Most Wishlisted Products</h2>

          <Suspense fallback={<CarouselSkeleton />}>
            <Await resolve={mostWishlisted} errorElement={<CarouselError />}>
              {(products: CarouselProduct[]) => <ProductsShowcase products={products} />}
            </Await>
          </Suspense>

          <h2 className="my-3 text-xl font-semibold">Best Rated Products</h2>

          <Suspense fallback={<CarouselSkeleton />}>
            <Await resolve={bestRated} errorElement={<CarouselError />}>
              {(products: CarouselProduct[]) => <ProductsShowcase products={products} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
};
