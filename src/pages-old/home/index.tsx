import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import { Carousel } from "@/components/ui/carousel/carousel";
import { CarouselCardProps } from "@/components/ui/carousel/carousel-card";
import loaderFetch from "@/utils/loader-fetch";

import { Categories } from "./components/categories";

export const HomePage = () => {
  const { bestRatedProducts, mostWishlistedProducts, bestSellingProducts }: any = useLoaderData();

  return (
    <div className="bg-gray-100">
      <div className="page-spacing">
        <div className="max-w-screen-xl text-center xl:mx-auto">
          <Categories />
          <h2 className="mb-3 mt-6 text-xl font-semibold text-gray-700">Best Selling Products</h2>
          <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={bestSellingProducts}>
              {(products: CarouselCardProps[]) => <Carousel products={products} />}
            </Await>
          </Suspense>

          <h2 className="my-3 text-xl font-semibold text-gray-700">Most Wishlisted Products</h2>
          <Suspense fallback={<p>Loading..</p>}>
            <Await resolve={mostWishlistedProducts}>
              {(products: CarouselCardProps[]) => <Carousel products={products} />}
            </Await>
          </Suspense>

          <h2 className="my-3 text-xl font-semibold text-gray-700">Best Rated Products</h2>
          <Suspense fallback={<p>Loading..</p>}>
            <Await resolve={bestRatedProducts}>
              {(products: CarouselCardProps[]) => <Carousel products={products} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

const fetchProducts = async (url: string) => {
  const result = await loaderFetch(`${import.meta.env.VITE_API_URL}/product/${url}`, "GET");
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
