import { Await, useLoaderData } from "react-router";

import { Carousel } from "@/components/ui/carousel";
import { CarouselCardProps } from "@/components/ui/carousel/carousel-card";
import { Spinner } from "@/components/ui/spinner";
import { Categories } from "@/features/catalog/components/categories";
import { topProductsApi } from "@/features/products/api/get-top-products";
import { store } from "@/stores/store";
import { Suspense } from "react";

export const homePageLoader = async () => {
  const bestRatedResult = store.dispatch(topProductsApi.endpoints.getBestRated.initiate());
  const mostWishlistedResult = store.dispatch(
    topProductsApi.endpoints.getMostWishlisted.initiate(),
  );
  const bestSellersResult = store.dispatch(topProductsApi.endpoints.getBestSellers.initiate());

  return {
    bestRated: bestRatedResult,
    mostWishlisted: mostWishlistedResult,
    bestSellers: bestSellersResult,
  };
};

export const HomePage = () => {
  const { bestRated, mostWishlisted, bestSellers } = useLoaderData();

  const handleWishlistClick = () => {};
  return (
    <div className="page-spacing">
      <div className="max-w-screen-xl text-center xl:mx-auto">
        <Categories />
        <h2 className="mb-3 mt-6 text-xl font-semibold text-gray-700">Best Selling Products</h2>
        <Suspense fallback={<Spinner />}>
          <Await resolve={bestSellers}>
            {(products: { data: CarouselCardProps[] }) => (
              <Carousel products={products.data} onWishlistToggle={handleWishlistClick} />
            )}
          </Await>
        </Suspense>
        <h2 className="my-3 text-xl font-semibold text-gray-700">Most Wishlisted Products</h2>
        <Suspense fallback={<Spinner />}>
          <Await resolve={mostWishlisted}>
            {(products: { data: CarouselCardProps[] }) => (
              <Carousel products={products.data} onWishlistToggle={handleWishlistClick} />
            )}
          </Await>
        </Suspense>

        <h2 className="my-3 text-xl font-semibold text-gray-700">Best Rated Products</h2>
        <Suspense fallback={<Spinner />}>
          <Await resolve={bestRated}>
            {(products: { data: CarouselCardProps[] }) => (
              <Carousel products={products.data} onWishlistToggle={handleWishlistClick} />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};
