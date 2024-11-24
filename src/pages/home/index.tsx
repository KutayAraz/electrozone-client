import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import loaderFetch from "@/utils/loader-fetch";
import Categories from "./components/Categories";
import { Carousel, CarouselCardProps } from "@/components/ui/carousel";

export const HomePage = () => {
  const {
    bestRatedProducts,
    mostWishlistedProducts,
    bestSellingProducts,
  }: any = useLoaderData();

  return (
    <div className="bg-gray-100">
      <div className="page-spacing">
        <div className="max-w-screen-xl xl:mx-auto text-center">
          <Categories />
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-700">
            Best Selling Products
          </h2>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={bestSellingProducts}
              children={(products: CarouselCardProps[]) => (
                <Carousel products={products} />
              )}
            />
          </Suspense>

          <h2 className="text-xl font-semibold my-3 text-gray-700">
            Most Wishlisted Products
          </h2>
          <Suspense fallback={<p>Loading..</p>}>
            <Await
              resolve={mostWishlistedProducts}
              children={(products: CarouselCardProps[]) => (
                <Carousel products={products} />
              )}
            />
          </Suspense>

          <h2 className="text-xl font-semibold my-3 text-gray-700">
            Best Rated Products
          </h2>
          <Suspense fallback={<p>Loading..</p>}>
            <Await
              resolve={bestRatedProducts}
              children={(products: CarouselCardProps[]) => (
                <Carousel products={products} />
              )}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

const fetchProducts = async (url: string) => {
  const result = await loaderFetch(
    `${import.meta.env.VITE_API_URL}/product/${url}`,
    "GET"
  );
  return result.data;
};

const loadBestRatedProducts = () => fetchProducts("best-rated");
const loadMostWishlistedProducts = () => fetchProducts("most-wishlisted");
const loadMostSoldProducts = () => fetchProducts("best-sellers");

export const loader = async () => {
  return defer({
    bestRatedProducts: loadBestRatedProducts(),
    mostWishlistedProducts: loadMostWishlistedProducts(),
    bestSellingProducts: loadMostSoldProducts(),
  });
};
