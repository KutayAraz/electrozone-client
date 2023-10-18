import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import loaderFetch from "@/utils/loader-fetch";

const HomePage = () => {
  const {
    bestRatedProducts,
    mostWishlistedProducts,
    bestSellingProducts,
  }: any = useLoaderData();

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col max-w-screen-lg mx-auto text-center ml-[1%]">
        <h2 className="text-xl font-semibold my-2">Best Selling Products</h2>
        <Suspense fallback={<p>Loading..</p>}>
          <div className="flex space-x-2 overflow-x-auto noScrollbar scroll-smooth">
            <Await
              resolve={bestSellingProducts}
              children={(product: any) =>
                product.map((product: any) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    productName={product.productName}
                    thumbnail={product.thumbnail}
                    subcategory={product.subcategory}
                    category={product.category}
                  />
                ))
              }
            />
          </div>
        </Suspense>

        <h2 className="text-xl font-semibold my-2">Most Wishlisted Products</h2>
        <Suspense fallback={<p>Loading..</p>}>
          <div className="flex space-x-2 overflow-x-auto noScrollbar scroll-smooth">
            <Await
              resolve={bestRatedProducts}
              children={(product: any) =>
                product.map((product: any) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    productName={product.productName}
                    thumbnail={product.thumbnail}
                    subcategory={product.subcategory}
                    category={product.category}
                  />
                ))
              }
            />
          </div>
        </Suspense>

        <h2 className="text-xl font-semibold my-2">Best Rated Products</h2>
        <Suspense fallback={<p>Loading..</p>}>
          <div className="flex space-x-2 overflow-x-auto noScrollbar scroll-smooth mb-2">
            <Await
              resolve={mostWishlistedProducts}
              children={(product: any) =>
                product.map((product: any) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    productName={product.productName}
                    thumbnail={product.thumbnail}
                    subcategory={product.subcategory}
                    category={product.category}
                  />
                ))
              }
            />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
const fetchProducts = async (url: string) => {
  const result = await loaderFetch(
    `${import.meta.env.VITE_API_URL}/products/${url}`,
    "GET"
  );
  return result.data;
};

const loadBestRatedProducts = () => fetchProducts("best-rated");
const loadMostWishlistedProducts = () => fetchProducts("most-wishlisted");
const loadMostSoldProducts = () => fetchProducts("most-sold");

export const loader = async () => {
  return defer({
    bestRatedProducts: loadBestRatedProducts(),
    mostWishlistedProducts: loadMostWishlistedProducts(),
    bestSellingProducts: loadMostSoldProducts(),
  });
};
