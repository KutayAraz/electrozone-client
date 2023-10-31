import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { ReactComponent as Arrow } from "@assets/svg/navigation.svg";
import { ReactComponent as PrevArrow } from "@assets/svg/pre.svg";
import ProductCard from "./components/ProductCard";
import loaderFetch from "@/utils/loader-fetch";
import Categories from "./components/Categories";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const HomePage = () => {
  const {
    bestRatedProducts,
    mostWishlistedProducts,
    bestSellingProducts,
  }: any = useLoaderData();

  var settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col mx-auto text-center ml-[1%]">
        <Categories />
        <h2 className="text-xl font-semibold my-2 text-gray-700">
          Best Selling Products
        </h2>
        <Suspense fallback={<p>Loading..</p>}>
          <div className="max-w-screen-lg mx-auto">
            <Await
              resolve={bestSellingProducts}
              children={(products: any) =>
                // return (
                //   <Slider {...settings} className="hidden sm:block mx-4">
                products.map((product: any) => (
                  <ProductCard
                    id={product.id}
                    productName={product.productName}
                    thumbnail={product.thumbnail}
                    subcategory={product.subcategory}
                    category={product.category}
                  />
                ))
              }
              // </Slider>
              // );
            />
          </div>
        </Suspense>

        <h2 className="text-xl font-semibold my-2 text-gray-700">
          Most Wishlisted Products
        </h2>
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

        <h2 className="text-xl font-semibold my-2 text-gray-700">
          Best Rated Products
        </h2>
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

const loadBestRatedProducts = () => fetchProducts("top-rated");
const loadMostWishlistedProducts = () => fetchProducts("most-wishlisted");
const loadMostSoldProducts = () => fetchProducts("best-sellers");

export const loader = async () => {
  return defer({
    bestRatedProducts: loadBestRatedProducts(),
    mostWishlistedProducts: loadMostWishlistedProducts(),
    bestSellingProducts: loadMostSoldProducts(),
  });
};
