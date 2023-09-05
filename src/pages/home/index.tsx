import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import ProductCard from "./components/ProductCard";

const HomePage = () => {
  const {
    bestRatedProducts,
    mostWishlistedProducts,
    bestSellingProducts,
  }: any = useLoaderData();

  return (
    <>
      <div className="flex flex-col max-w-screen-lg mx-auto text-center">
        <h2>Best Selling Products</h2>
        <Suspense fallback={<p>Loading..</p>}>
          <div className="flex">
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
        <h2>Most Wishlisted Products</h2>
        <Suspense fallback={<p>Loading..</p>}>
          <div className="flex">
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
        <h2>Best Rated Products</h2>
        <Suspense fallback={<p>Loading..</p>}>
          <div className="flex">
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
    </>
  );
};

export default HomePage;
const fetchProducts = async (url: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${url}`);
  if (response.status === 200) {
    return response.json();
  }
  throw new Error(`Failed to fetch ${url} data`);
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
