import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";
import { SwiperSlide } from "swiper/react";

import { Carousel } from "@/components/ui/carousel";
import { CarouselCard } from "@/components/ui/carousel/carousel-card";
import { Spinner } from "@/components/ui/spinner";
import { Product } from "@/features/orders/types";
import { Categories } from "@/features/product-listing/components/categories";
import { getTopProductsApi, ProductTrend } from "@/features/products/api/get-top-products";
import { useToggleWishlist } from "@/features/wishlist/hooks/use-toggle-wishlist";
import { store } from "@/stores/store";

export const homePageLoader = async () => {
  const bestRatedResult = store.dispatch(
    getTopProductsApi.endpoints.getTopProducts.initiate(ProductTrend.BEST_RATED),
  );
  const mostWishlistedResult = store.dispatch(
    getTopProductsApi.endpoints.getTopProducts.initiate(ProductTrend.MOST_WISHLISTED),
  );
  const bestSellersResult = store.dispatch(
    getTopProductsApi.endpoints.getTopProducts.initiate(ProductTrend.BEST_SELLERS),
  );

  return {
    bestRated: bestRatedResult,
    mostWishlisted: mostWishlistedResult,
    bestSellers: bestSellersResult,
  };
};

const ProductsShowcase = ({ products }: { products: Product[] }) => {
  const { handleToggleWishlist, isLoading } = useToggleWishlist();
  return (
    <Carousel>
      {products.map((product: any) => (
        <SwiperSlide key={product.productId}>
          <CarouselCard
            key={product.id}
            productId={product.id}
            productName={product.productName}
            brand={product.brand}
            thumbnail={product.thumbnail}
            price={product.price}
            subcategory={product.subcategory}
            category={product.category}
            onWishlistToggle={() => handleToggleWishlist(product.id)}
            isTogglingWishlist={isLoading}
          />
        </SwiperSlide>
      ))}
    </Carousel>
  );
};

export const HomePage = () => {
  const { bestRated, mostWishlisted, bestSellers } = useLoaderData();

  return (
    <div className="page-spacing">
      <div className="max-w-screen-xl text-center xl:mx-auto">
        <Categories />
        <h2 className="mb-3 mt-6 text-xl font-semibold text-gray-700">Best Selling Products</h2>
        <Suspense fallback={<Spinner />}>
          <Await resolve={bestSellers}>
            {(products: { data: any[] }) => <ProductsShowcase products={products.data} />}
          </Await>
        </Suspense>
        <h2 className="my-3 text-xl font-semibold text-gray-700">Most Wishlisted Products</h2>
        <Suspense fallback={<Spinner />}>
          <Await resolve={mostWishlisted}>
            {(products: { data: any[] }) => <ProductsShowcase products={products.data} />}
          </Await>
        </Suspense>

        <h2 className="my-3 text-xl font-semibold text-gray-700">Best Rated Products</h2>
        <Suspense fallback={<Spinner />}>
          <Await resolve={bestRated}>
            {(products: { data: any[] }) => <ProductsShowcase products={products.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};
